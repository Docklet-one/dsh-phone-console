/**
 * 事件缓存（IndexedDB，dsh-console P2）
 *
 * 存最近的事件（P1 协议），用于冷启动时先出内容、以及 P3 的审批/工具卡片回看。
 * 没有 IndexedDB（隐私模式、老 WebView）时全部静默失败，应用照常用 localStorage 缓存。
 */
const DB_NAME = 'docklet-chat-cache'
const STORE = 'events'
const META_STORE = 'meta'
const META_KEY = 'schema'
// DB 版本管 object store/index；SCHEMA_VERSION 管事件记录格式。
// 记录格式变化时只加 SCHEMA_VERSION，启动会清空可丢弃的缓存。
const VERSION = 2
const SCHEMA_VERSION = 1
const LIMIT = 600
const TURN_LIMIT = 3

function available() {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null
  } catch {
    return false
  }
}

export function createEventCache({ limit = LIMIT } = {}) {
  let opening = null
  let putsSinceTrim = 0

  function ensureSchema(db) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction([META_STORE, STORE], 'readwrite')
      const meta = tx.objectStore(META_STORE)
      const request = meta.get(META_KEY)
      request.onsuccess = () => {
        const stored = request.result ? Number(request.result.value) : 0
        if (stored === SCHEMA_VERSION) return
        // 首次升级没有 meta：保留现有事件；格式真变了才清空
        if (stored && stored !== SCHEMA_VERSION) tx.objectStore(STORE).clear()
        meta.put({ key: META_KEY, value: SCHEMA_VERSION })
      }
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error || new Error('indexedDB schema failed'))
    })
  }

  function open() {
    if (!available()) return Promise.reject(new Error('no indexedDB'))
    if (opening) return opening
    opening = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, VERSION)
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'key' })
          store.createIndex('session', 'session', { unique: false })
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: 'key' })
        }
      }
      request.onsuccess = () => {
        const db = request.result
        ensureSchema(db)
          .then(() => resolve(db))
          .catch(() => resolve(db))
      }
      request.onerror = () => reject(request.error || new Error('indexedDB open failed'))
      request.onblocked = () => reject(new Error('indexedDB blocked'))
    })
    return opening
  }

  function run(mode, work) {
    return open().then(
      (db) =>
        new Promise((resolve, reject) => {
          const tx = db.transaction(STORE, mode)
          const store = tx.objectStore(STORE)
          let result
          try {
            result = work(store)
          } catch (error) {
            reject(error)
            return
          }
          tx.oncomplete = () => resolve(result)
          tx.onerror = () => reject(tx.error || new Error('indexedDB transaction failed'))
          tx.onabort = () => reject(tx.error || new Error('indexedDB transaction aborted'))
        }),
    )
  }

  function isQuotaError(error) {
    return Boolean(
      error &&
        (error.name === 'QuotaExceededError' ||
          error.code === 22 ||
          /quota|storage/i.test(String(error.message || ''))),
    )
  }

  /** 配额不足时先删当前会话最旧的一半记录，再重试写入 */
  function dropOldest(session) {
    return run('readwrite', (store) => {
      const index = store.index('session')
      return new Promise((resolve, reject) => {
        const request = index.getAll(session)
        request.onsuccess = () => {
          const records = (request.result || []).sort((left, right) => Number(left.seq) - Number(right.seq))
          const remove = records.slice(0, Math.max(1, Math.ceil(records.length / 2)))
          for (const record of remove) store.delete(record.key)
          resolve(remove.length)
        }
        request.onerror = () => reject(request.error)
      })
    })
  }

  function put(sessionId, events) {
    const session = String(sessionId || '')
    const list = (Array.isArray(events) ? events : []).filter((event) => event && event.id && Number.isFinite(Number(event.seq)))
    if (!session || list.length === 0) return Promise.resolve(0)
    const writeBatch = () =>
      run('readwrite', (store) => {
        for (const event of list) {
          // 同一 seq 可能有多条事件（turn.end + error），key 用 id 才不互相覆盖
          store.put({ key: session + ':' + event.id, session, seq: Number(event.seq), event })
        }
        return list.length
      })
    const afterWrite = () => {
      // 每写几十条再整理一次，避免每条事件都扫一遍记录
      putsSinceTrim += list.length
      if (putsSinceTrim < 40) return 0
      putsSinceTrim = 0
      return trim(session)
    }
    return writeBatch()
      .then(afterWrite)
      .catch((error) => {
        if (!isQuotaError(error)) throw error
        return dropOldest(session)
          .then(writeBatch)
          .then(afterWrite)
          .catch(() => 0)
      })
  }

  /** 只保留这个会话最近 3 轮，且最多 limit 条 */
  function trim(session) {
    return run('readwrite', (store) => {
      const index = store.index('session')
      return new Promise((resolve, reject) => {
        const request = index.getAll(session)
        request.onsuccess = () => {
          const records = (request.result || []).sort((left, right) => Number(left.seq) - Number(right.seq))
          const starts = (() => {
            const turnStarts = records
              .filter((record) => record.event && record.event.type === 'turn.start')
              .map((record) => Number(record.seq))
            if (turnStarts.length) return turnStarts
            return records
              .filter((record) => record.event && record.event.type === 'message.user')
              .map((record) => Number(record.seq))
          })()
          const cutoff = starts.length > TURN_LIMIT ? starts[starts.length - TURN_LIMIT] : 0
          let kept = cutoff > 0 ? records.filter((record) => Number(record.seq) >= cutoff) : records
          if (kept.length > limit) kept = kept.slice(kept.length - limit)
          const keep = new Set(kept.map((record) => record.key))
          const extra = records.filter((record) => !keep.has(record.key))
          for (const record of extra) store.delete(record.key)
          resolve(extra.length)
        }
        request.onerror = () => reject(request.error)
      })
    })
  }

  function clearOthers(sessionId) {
    const session = String(sessionId || '')
    if (!session) return Promise.resolve(0)
    return run('readwrite', (store) => {
      const index = store.index('session')
      return new Promise((resolve, reject) => {
        const request = index.openCursor()
        let removed = 0
        request.onsuccess = () => {
          const cursor = request.result
          if (!cursor) {
            resolve(removed)
            return
          }
          if (cursor.value && cursor.value.session !== session) {
            cursor.delete()
            removed += 1
          }
          cursor.continue()
        }
        request.onerror = () => reject(request.error)
      })
    })
  }

  function get(sessionId) {
    const session = String(sessionId || '')
    if (!session) return Promise.resolve([])
    return run('readonly', (store) => {
      const index = store.index('session')
      return new Promise((resolve, reject) => {
        const request = index.getAll(session)
        request.onsuccess = () => {
          const records = (request.result || []).sort((left, right) => Number(left.seq) - Number(right.seq))
          const starts = (() => {
            const turnStarts = records
              .filter((record) => record.event && record.event.type === 'turn.start')
              .map((record) => Number(record.seq))
            if (turnStarts.length) return turnStarts
            return records
              .filter((record) => record.event && record.event.type === 'message.user')
              .map((record) => Number(record.seq))
          })()
          const cutoff = starts.length > TURN_LIMIT ? starts[starts.length - TURN_LIMIT] : 0
          let kept = cutoff > 0 ? records.filter((record) => Number(record.seq) >= cutoff) : records
          if (kept.length > limit) kept = kept.slice(kept.length - limit)
          resolve(kept.map((record) => record.event).filter(Boolean))
        }
        request.onerror = () => reject(request.error)
      })
    })
  }

  function clear(sessionId) {
    const session = String(sessionId || '')
    return run('readwrite', (store) => {
      const index = store.index('session')
      return new Promise((resolve, reject) => {
        const request = index.getAllKeys(session)
        request.onsuccess = () => {
          for (const key of request.result || []) store.delete(key)
          resolve(true)
        }
        request.onerror = () => reject(request.error)
      })
    })
  }

  function clearAll() {
    return run('readwrite', (store) => {
      store.clear()
      return true
    })
  }

  /** 恢复初始化：关闭连接后彻底删除当前应用的缓存库 */
  function destroy() {
    const close = async () => {
      if (!opening) return
      try {
        const db = await opening
        if (db && typeof db.close === 'function') db.close()
      } catch {
        /* 打开失败也可继续删库 */
      }
      opening = null
    }
    return close().then(
      () =>
        new Promise((resolve) => {
          try {
            const request = indexedDB.deleteDatabase(DB_NAME)
            request.onsuccess = request.onerror = request.onblocked = () => resolve(true)
          } catch {
            resolve(false)
          }
        }),
    )
  }

  return { put, get, clear, clearAll, clearOthers, destroy }
}
