/* Docklet 应用运行时：把壳能力包装成 module 应用的 api 参数。 */
(function () {
  const requests = new Map()
  let seq = 0

  function call(method, params) {
    return new Promise((resolve, reject) => {
      const requestId = 'r' + ++seq + '-' + Math.random().toString(36).slice(2)
      const timer = setTimeout(() => {
        requests.delete(requestId)
        reject(new Error('timeout'))
      }, 5000)
      requests.set(requestId, { resolve, reject, timer })
      window.parent.postMessage({ type: 'docklet:request', requestId, method, params }, '*')
    })
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || data.type !== 'docklet:response') return
    const pending = requests.get(data.requestId)
    if (!pending) return
    clearTimeout(pending.timer)
    requests.delete(data.requestId)
    if (data.ok) pending.resolve(data.data)
    else pending.reject(new Error(data.error))
  })

  const textEncoder = new TextEncoder()
  const textDecoder = new TextDecoder()

  function toBase64(bytes) {
    let binary = ''
    for (const byte of bytes) binary += String.fromCharCode(byte)
    return btoa(binary)
  }

  function fromBase64(text) {
    const binary = atob(text)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
    return bytes
  }

  async function loadKv() {
    try {
      const data = await call('fs.read', { path: 'kv.json' })
      return JSON.parse(textDecoder.decode(fromBase64(data))) || {}
    } catch {
      return {}
    }
  }

  let kv = {}
  let saveTimer = 0

  function scheduleSave() {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      const bytes = textEncoder.encode(JSON.stringify(kv))
      call('fs.write', { path: 'kv.json', data: toBase64(bytes) }).catch(() => {})
    }, 250)
  }

  const insetsListeners = new Set()
  let currentInsets = { top: 0, bottom: 0, ime: 0 }

  function computeInsets() {
    return currentInsets
  }

  function emitInsets() {
    for (const fn of insetsListeners) {
      try {
        fn(computeInsets())
      } catch {
        /* 忽略 */
      }
    }
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || data.type !== 'docklet:insets') return
    const detail = data.detail || {}
    currentInsets = {
      top: Number(detail.top) || 0,
      bottom: Number(detail.bottom) || 0,
      ime: Number(detail.ime) || 0,
    }
    emitInsets()
  })

  function createApi(manifest) {
    return {
      version: 2,
      manifest,
      storage: {
        get(key) {
          return Object.prototype.hasOwnProperty.call(kv, key) ? kv[key] : null
        },
        set(key, value) {
          kv[key] = value
          scheduleSave()
        },
        remove(key) {
          delete kv[key]
          scheduleSave()
        },
      },
      score: {
        get: () => 0,
        add: (value) => value,
        best: () => 0,
        finish: () => {},
        reset: () => {},
      },
      audio: {
        tone: () => {},
        noise: () => {},
        setMuted: () => {},
      },
      shell: {
        exit() {
          window.parent.postMessage({ type: 'docklet:request', requestId: 'exit-' + Date.now(), method: 'shell.exit', params: {} }, '*')
        },
        restart() {
          location.reload()
        },
      },
      openExternal(url) {
        return call('openExternal', { url })
      },
      download(url, name) {
        return call('download', { url, name: name || '' })
      },
      clipboard: {
        write(text) {
          return call('clipboard.write', { text })
        },
      },
      ui: {
        insets: computeInsets,
        onInsetsChange(fn) {
          insetsListeners.add(fn)
          fn(computeInsets())
          return () => insetsListeners.delete(fn)
        },
      },
      on(event, fn) {
        const handler = () => fn()
        if (event === 'pause' || event === 'resume') {
          document.addEventListener('visibilitychange', handler)
          return () => document.removeEventListener('visibilitychange', handler)
        }
        return () => {}
      },
      watch: {
        async start(policy) {
          await call('watch.start', { policy: policy || {} })
          return { id: (policy && policy.id) || '', running: true }
        },
        async stop(id) {
          await call('watch.stop', { id: id || '' })
        },
        async status(id) {
          try {
            return await call('watch.status', { id: id || '' })
          } catch {
            return null
          }
        },
        async ensurePermission() {
          try {
            return Boolean(await call('watch.ensurePermission'))
          } catch {
            return false
          }
        },
        async test() {
          await call('watch.test')
        },
      },
    }
  }

  window.__dockletApiReady = (async () => {
    let manifest = {}
    try {
      const response = await fetch('./app.json')
      manifest = await response.json()
    } catch {
      /* 清单读不到时用空对象 */
    }
    kv = await loadKv()
    return createApi(manifest)
  })()
})()
