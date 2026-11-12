/**
 * 对话应用入口（dsh-console P2）
 *
 * 跑在壳的 iframe 里，自带样式与排版：
 * - 历史：P1 之前是 /messages?recent=N + 轮询；现在优先 /snapshot + /events（SSE），失败退回轮询
 * - 键盘：订阅 api.ui.onInsetsChange，输入条自己让位
 * - 链接/文件/图片：走 api.openExternal / api.download / 内置查看器
 * - 存储：prefs / 最后一次界面状态 / 消息缓存（api.storage）+ IndexedDB 事件缓存
 *
 * 电脑端是 DSH 的 phone-relay 插件（默认 8788），接口见 docs/plugin-phone-relay.md。
 */
import CSS from './styles.css?inline'
import { DEFAULT_URL, POLL_MS, PREFS_KEY, CACHE_KEY, SEND_ATTEMPTS, RUNNING_STALE_MS, PRESET_LABELS, STYLE_ID, PERMISSION_LABELS, PERMISSION_DESCRIPTIONS } from './constants.js'
import { delay, escapeHtml, escapeAttr, fmtClock, linkify, normalizeUrl } from './util.js'
import { createTransport } from './transport.js'
import { createStore } from './store.js'
import { createEventCache } from './db.js'
import { sortMessages as sortTimeline } from './timeline.js'
import { buildWatchPolicy } from './watch.js'
import { messageHtml as renderMessage } from './ui/message.js'
import { sessionRowHtml } from './ui/session-row.js'
import { approvalCardHtml, buildInputAnswers, deliverableCardHtml, inputCardHtml, toolDetailHtml, toolGroupEmptyHtml, toolGroupHtml } from './ui/cards.js'
import { renderMarkdown } from './ui/markdown.js'

export default function mount(root, api) {
  'use strict'

  const state = {
    url: '',
    token: '',
    messages: [],
    cursor: 0,
    hydrated: false,
    booting: true,
    busy: false,
    waiting: false,
    status: 'unset',
    statusText: '未配置',
    sessionTitle: '',
    currentSession: '',
    view: 'chat',
    testResult: null,
    sessionsOpen: false,
    sessionsList: [],
    sessionQuery: '',
    sessionMenuId: '',
    sessionMenuTitle: '',
    renameId: '',
    drawerMode: 'list',
    archivedList: [],
    showArchived: false,
    archiveId: '',
    archiveStop: false,
    searchQuery: '',
    insets: { top: 0, bottom: 0, ime: 0 },
    draft: '',
    pending: [],
    turnHasMore: false,
    historyLimitReached: false,
    stopped: false,
    awaitingReply: false,
    runActive: false,
    notRunningSince: 0,
    oldestSeq: 0,
    loadingOlder: false,
    stuckPrompt: false,
    stuckBusy: false,
    lastProgressAt: Date.now(),
    notify: true,
    notifyMode: 'turn',
    lanUrl: DEFAULT_URL,
    wanUrl: '',
    autoPick: true,
    pick: 'lan',
    mode: 'auto',
    wanFirst: false,
    running: false,
    currentTool: null,
    lastTool: null,
    lastToolAt: 0,
    lastEventAt: 0,
    lastEventAge: 0,
    lastReplyAt: 0,
    waitingSince: 0,
    staleShown: false,
    reading: false,
    pendingPaint: false,
    lastListTop: 0,
    focusLastAssistant: false,
    holdAnswer: false,
    lastUserScroll: 0,
    instance: '',
    // P3 流式：assistant 正在输出的临时文本（不进 messages）
    stream: null,
    toolDetailId: '',
    toolActiveId: '',
    options: null,
    formPreset: '',
    formPermission: '',
    formTitle: '',
    meta: { preset: '', permission: '', model: null },
    formProvider: '',
    formModel: '',
    formEffort: '',
    sessionPermission: '',
    projections: {},
    openAcc: '',
  }

  const version = String((api.manifest && api.manifest.version) || '')
  const VERIFY_WATCHDOG =
    typeof window !== 'undefined' &&
    Boolean(window.__verifyWatchdog) &&
    /^(127\.0\.0\.1|localhost)$/.test(location.hostname)
  const STUCK_PROMPT_MS = VERIFY_WATCHDOG ? 120 : 5 * 60 * 1000
  const NOT_RUNNING_GRACE_MS = 6000
  const STUCK_ABORT_MS = VERIFY_WATCHDOG ? 450 : 15 * 60 * 1000
  const STUCK_CHECK_MS = VERIFY_WATCHDOG ? 80 : 10000
  const INITIAL_TURNS = 3
  const PAGE_TURNS = 5
  const MAX_HISTORY_TURNS = 30
  const THINKING_MATH = [
    // 8 道错题：4 道带问号，4 道不带
    '6 × 3 = 19?',
    '9 + 6 = 14?',
    '12 − 5 = 6?',
    '8 × 4 = 31?',
    '7 + 5 = 13',
    '9 × 2 = 17',
    '15 − 6 = 8',
    '18 ÷ 3 = 5',
    // 4 道无结果值，只留表达式和问号
    '14 + 9 = ?',
    '7 × 6 = ?',
    '21 − 8 = ?',
    '36 ÷ 4 = ?',
    // 4 道正确带问号
    '1 + 2 = ?',
    '8 ÷ 2 = ?',
    '3 + 8 = ?',
    '10 ÷ 2 = ?',
    // 14 道正确带结果
    '7 − 4 = 3',
    '5 × 5 = 25',
    '4 × 6 = 24',
    '2 + 9 = 11',
    '13 − 7 = 6',
    '6 × 6 = 36',
    '20 ÷ 4 = 5',
    '8 + 7 = 15',
    '9 × 3 = 27',
    '16 − 9 = 7',
    '30 ÷ 5 = 6',
    '11 + 4 = 15',
    '7 × 7 = 49',
    '24 ÷ 6 = 4',
  ]
  const THINKING_MATH_MS = 1000
  const STUCK_EXPLAIN =
    '我这边在手机上处理不了刚才的确认，已经中断当前回合。请改用不需要电脑端弹窗的方式继续；如果必须用电脑操作，请先告诉我需要做什么。'
  const AUTO_LOAD_TOP = 180
  // 应用 id 由清单决定（dsh-console）；后台提醒的策略名和通知打开目标都用它
  const APP_ID = String((api.manifest && api.manifest.id) || 'dsh-console')
  const transport = createTransport({ base: () => state.url, token: () => state.token })
  const store = createStore()
  const eventCache = createEventCache()
  // 时间线一直读同一个数组引用；增删都走 store（P2 起 store 负责 id/seq 去重和排序）
  state.messages = store.messages
  let appEl = null
  let refs = {}
  let styleEl = null
  let pollTimer = 0
  let polling = false
  let disposed = false
  let toastTimer = 0
  let paintFrame = 0
  let bottomTimers = []
  let press = null
  let longPressedAt = 0
  let offInsets = null
  let offPause = null
  let offResume = null
  let focusedField = null
  // 图片查看器：当前图片列表 / 索引 / 缩放与平移
  let viewerState = { list: [], index: 0, scale: 1, x: 0, y: 0 }
  let viewerPress = null
  let viewerPointers = new Map()
  let viewerPinch = null
  let viewerSkipClick = false
  let lastViewerTapAt = 0
  let viewerTapTimer = 0
  // P1：'unknown' 还没试过 / 'sse' 用 /snapshot + /events / 'legacy' 退回 /messages 轮询
  let liveMode = 'unknown'
  let liveSource = null
  let liveRetry = 0
  // P3：展开的工具卡片、提问草稿、已提交的提问
  const expandedToolGroups = new Set()
  const inputDrafts = new Map()
  const inputSubmitted = new Set()

  /* ---------------- 存储 ---------------- */

  function loadPrefs() {
    let url = ''
    let token = ''
    let notify = true
    let notifyMode = 'turn'
    let lan = ''
    let wan = ''
    let autoPick = true
    let pick = 'lan'
    try {
      const raw = api.storage.get(PREFS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        url = parsed && typeof parsed.url === 'string' ? parsed.url : ''
        token = parsed && typeof parsed.token === 'string' ? parsed.token : ''
        if (parsed && parsed.notify !== undefined) notify = parsed.notify !== false
        if (parsed && parsed.notifyMode === 'message') notifyMode = 'message'
        if (parsed && typeof parsed.lanUrl === 'string') lan = parsed.lanUrl
        if (parsed && typeof parsed.wanUrl === 'string') wan = parsed.wanUrl
        if (parsed && parsed.autoPick !== undefined) autoPick = parsed.autoPick !== false
        if (parsed && parsed.pick === 'wan') pick = 'wan'
      }
    } catch {
      /* 忽略 */
    }
    // 老版本只有一个 url：和默认地址不同就当外网地址，否则当家里地址
    if (!lan && !wan && url) {
      const normalized = normalizeUrl(url)
      if (normalized && normalized !== DEFAULT_URL) wan = normalized
      else lan = normalized
    }
    state.lanUrl = normalizeUrl(lan) || DEFAULT_URL
    state.wanUrl = wan ? normalizeUrl(wan) : ''
    state.autoPick = autoPick !== false
    state.pick = pick
    state.mode = state.autoPick ? 'auto' : state.pick === 'wan' ? 'wan' : 'lan'
    state.token = String(token || '').trim()
    state.notify = notify !== false
    state.notifyMode = notifyMode
    state.url = state.autoPick
      ? state.lanUrl
      : state.pick === 'wan' && state.wanUrl
        ? state.wanUrl
        : state.lanUrl
  }

  function savePrefs() {
    api.storage.set(PREFS_KEY, JSON.stringify({
      lanUrl: state.lanUrl,
      wanUrl: state.wanUrl,
      autoPick: state.autoPick !== false,
      pick: state.pick,
      token: state.token,
      notify: state.notify !== false,
      notifyMode: state.notifyMode === 'message' ? 'message' : 'turn',
    }))
  }

  const UI_CACHE = 'ui.v1'

  // 顶部标题/绿点/模型徽标：先用上次的值渲染，避免返回重进时闪一下
  function loadUICache() {
    try {
      const raw = api.storage.get(UI_CACHE)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (!parsed) return
      if (parsed.title) state.sessionTitle = String(parsed.title)
      if (parsed.meta) state.meta = parsed.meta
      if (parsed.chip) state.uiChip = String(parsed.chip)
      if (parsed.session) state.currentSession = String(parsed.session)
      if (parsed.status) {
        state.status = String(parsed.status)
        state.statusText = String(parsed.statusText || '')
      }
    } catch {
      /* 忽略 */
    }
  }

  function saveUICache() {
    try {
      api.storage.set(
        UI_CACHE,
        JSON.stringify({
          title: state.sessionTitle || '',
          meta: state.meta || null,
          session: state.currentSession || '',
          chip: refs.modelChip ? refs.modelChip.textContent || '' : '',
          status: state.status || '',
          statusText: state.statusText || '',
        }),
      )
    } catch {
      /* 忽略 */
    }
  }

  /** 只清理旧 localStorage 历史；历史缓存现在由 IndexedDB 事件缓存负责 */
  function clearLegacyHistory() {
    try {
      api.storage.remove(CACHE_KEY)
    } catch {
      /* 旧缓存清不掉也不影响 */
    }
  }

  async function clearAppCache() {
    flushCacheBatch()
    try {
      await eventCache.clearAll()
    } catch {
      /* 缓存删不掉也不阻塞 */
    }
    try {
      if (typeof caches !== 'undefined') {
        for (const key of await caches.keys()) await caches.delete(key)
      }
    } catch {
      /* Cache Storage 不可用就算了 */
    }
    
    clearLegacyHistory()
    store.clear()
    state.toolDetailId = ''
    state.toolActiveId = ''
    paintMessages(true)
    toast('缓存已清理')
    try {
      await startLive()
    } catch {
      /* 网络恢复后还会重试 */
    }
  }

  async function resetAppData() {
    flushCacheBatch()
    try {
      await eventCache.destroy()
    } catch {
      /* 删不掉也继续清其他 */
    }
    
    try {
      if (typeof caches !== 'undefined') {
        for (const key of await caches.keys()) await caches.delete(key)
      }
    } catch {
      /* ignore */
    }
    try {
      const root = await navigator.storage.getDirectory()
      for await (const name of root.keys()) {
        await root.removeEntry(name, { recursive: true })
      }
    } catch {
      /* OPFS 不可用或没有数据 */
    }
    api.storage.remove(PREFS_KEY)
    api.storage.remove(UI_CACHE)
    api.storage.remove(CACHE_KEY)
    store.clear()
    paintMessages(true)
    toast('正在恢复初始化…')
    window.setTimeout(() => {
      if (api.shell && typeof api.shell.exit === 'function') api.shell.exit()
      else location.reload()
    }, 400)
  }

  let cacheBatch = []
  let cacheBatchSession = ''
  let cacheBatchTimer = 0

  function flushCacheBatch() {
    if (cacheBatchTimer) {
      window.clearTimeout(cacheBatchTimer)
      cacheBatchTimer = 0
    }
    if (!cacheBatch.length || !cacheBatchSession) return
    const session = cacheBatchSession
    const events = cacheBatch
    cacheBatch = []
    cacheBatchSession = ''
    void eventCache.put(session, events).catch(() => undefined)
  }

  function queueCacheEvent(session, event) {
    if (!session || !event || !event.id) return
    if (cacheBatchSession && cacheBatchSession !== session) flushCacheBatch()
    cacheBatchSession = session
    cacheBatch.push(event)
    if (cacheBatchTimer) return
    cacheBatchTimer = window.setTimeout(flushCacheBatch, 180)
  }

  /* ---------------- 审批 ---------------- */

  async function postPresence(phone) {
    if (!state.url) return
    try {
      // 声明有输入卡片，relay 才给手机显示提问
      await transport.presence(phone, true)
    } catch {
      /* 网络不通就算了，下次打开再报 */
    }
  }

  async function decideApproval(id, allow) {
    if (!id) {
      toast('这条审批已经失效', 'error')
      return
    }
    state.lastProgressAt = Date.now()
    try {
      await transport.approvalDecision(id, allow)
      toast(allow ? '已允许' : '已拒绝')
    } catch (error) {
      toast('提交失败：' + ((error && error.message) || '网络错误'), 'error')
    }
  }

  const assetUrl = (kind, id, name) => transport.assetUrl(kind, id, name)
  const fetchWithTimeout = (url, options, ms) => transport.fetchWithTimeout(url, options, ms)
  const fetchJson = (url, options, ms) => transport.fetchJson(url, options, ms)
  const authHeaders = (extra) => transport.authHeaders(extra)
  const authJson = () => transport.authJson()

  /* ---------------- 状态 ---------------- */

  async function checkHealth() {
    if (!state.url) {
      setStatus('unset', '未配置')
      return
    }
    setStatus('checking', '连接中…')
    try {
      const info = await transport.health()
      setStatus('ok', info && info.hasKey === false ? '连上了，但电脑缺 key' : '已连接')
    } catch {
      setStatus('bad', '连不上')
    }
  }

  function setStatus(status, text) {
    state.status = status
    state.statusText = text
    paintStatus()
    saveUICache()
  }

  /* ---------------- 历史 ---------------- */

  function fromServer(item) {
    const seq = Number(item && item.seq)
    return {
      who: item && item.who === 'me' ? 'me' : item && item.who === 'error' ? 'error' : 'ai',
      text: String((item && item.text) || ''),
      at: Number(item && item.at) || Date.now(),
      id: Number(item && item.id) || undefined,
      seq: Number.isFinite(seq) ? seq : undefined,
      images: Array.isArray(item && item.images) ? item.images.filter((img) => img && img.id) : [],
      files: Array.isArray(item && item.files) ? item.files.filter((file) => file && file.id) : [],
    }
  }

  async function hydrate(silent) {
    if (!state.url) {
      setStatus('unset', '未配置')
      return false
    }
    if (state.waiting) return false
    try {
      const info = await transport.messages({ recent: PAGE_TURNS })
      const list = Array.isArray(info.messages) ? info.messages : []
      store.replaceMessages(
        list.map(fromServer).filter((item) => item.text || item.images.length || item.files.length),
      )
      state.hydrated = true
      state.booting = false
      state.waiting = false
      state.busy = false
      state.waitingSince = 0
      state.running = Boolean(info && info.running)
      state.lastEventAge = Number(info && info.lastEventAgeMs) || 0
      if (info && info.instance) state.instance = String(info.instance)
      if (info && info.meta) {
        state.meta = info.meta
        paintMeta()
      }
      state.staleShown = false
      if (info.current) state.currentSession = String(info.current)
      if (info.title) setSessionTitle(info.title)
      paintMessages(true)
      return true
    } catch (error) {
      state.hydrated = false
      if (!silent) {
        const message = String((error && error.message) || '')
        setStatus('bad', /401|令牌|unauthor/i.test(message) ? '令牌不正确' : '连不上')
      }
      return false
    }
  }

  function upsertFromServer(item) {
    const incoming = fromServer(item)
    if (!incoming.id) return false
    const changed = store.upsertMessage(incoming)
    if (changed && incoming.who !== 'me') {
      // 回复已到：先收起「指令完成中」气泡，2 秒后还在跑再恢复
      state.lastReplyAt = Date.now()
      window.setTimeout(() => {
        if (!disposed) paintMessages()
      }, 2200)
    }
    return changed
  }

  async function poll() {
    if (disposed || polling) return
    if (!state.url || state.view !== 'chat' || document.hidden) return
    if (liveMode === 'sse') return
    polling = true
    try {
      const since = state.hydrated ? state.cursor : 0
      const info = await transport.messages({ since, recent: PAGE_TURNS })
      const list = Array.isArray(info.messages) ? info.messages : []
      if (state.status !== 'ok') setStatus('ok', '已连接')
      if (info.current) state.currentSession = String(info.current)
      if (info.title) setSessionTitle(info.title)
      if (info.meta) {
        state.meta = info.meta
        paintMeta()
      }

      // 电脑端重启后消息 id 会从 1 重来；旧游标会让手机永远等不到新消息
      const instance = String(info.instance || '')
      const lastId = Number(info.last) || 0
      const restarted = Boolean(
        (instance && state.instance && instance !== state.instance) ||
        (since > 0 && lastId > 0 && lastId < since),
      )
      if (restarted) {
        state.instance = instance || state.instance
        store.clear()
        state.hydrated = false
        state.running = false
        state.waiting = false
        state.waitingSince = 0
        await hydrate(true)
        return
      }
      if (instance) state.instance = instance

      const wasRunning = state.running
      const wasStale = state.staleShown
      const runningKnown = typeof info.running === 'boolean'
      if (runningKnown) {
        state.running = Boolean(info.running)
        if (info.running) state.awaitingReply = true
        if (!state.running && state.waitingSince && Date.now() - state.waitingSince > 2500) {
          state.waiting = false
          state.busy = false
          state.waitingSince = 0
        }
      }
      const prevTool = state.currentTool
      const prevToolKey = prevTool
        ? String(prevTool.name) + '|' + String(prevTool.detail || '') + '|' + String(Boolean(prevTool.done))
        : ''
      state.currentTool =
        info.tool && info.tool.name
          ? {
              name: String(info.tool.name),
              detail: String(info.tool.detail || ''),
              done: Boolean(info.tool.done),
            }
          : null
      if (state.currentTool) {
        state.lastTool = { name: state.currentTool.name, detail: state.currentTool.detail, done: true }
        state.lastToolAt = Date.now()
      }
      const nextToolKey = state.currentTool
        ? String(state.currentTool.name) + '|' + String(state.currentTool.detail || '') + '|' + String(state.currentTool.done)
        : ''
      const toolChanged = prevToolKey !== nextToolKey
      state.lastEventAge = Number(info.lastEventAgeMs) || 0
      const stale = state.running && state.lastEventAge > RUNNING_STALE_MS
      state.staleShown = stale
      const runningChanged = runningKnown && (wasRunning !== state.running || wasStale !== stale)

      if (!state.hydrated) {
        store.replaceMessages(
          list.map(fromServer).filter((item) => item.text || item.images.length || item.files.length),
        )
        state.hydrated = true
      state.booting = false
        if (!state.waiting && !state.running) state.busy = false
        paintMessages(true)
        return
      }

      if (list.length === 0) {
        if (runningChanged || toolChanged) paintMessages()
        return
      }
      let changed = false
      for (const item of list) {
        store.cursor = Math.max(store.cursor, Number(item.id) || 0)
        if (upsertFromServer(item)) changed = true
      }
      // 旧版插件不报 running 时才退回「收到消息就算结束」
      if (!runningKnown && state.waiting) {
        state.waiting = false
        state.busy = false
        changed = true
      }
      if (changed || runningChanged || toolChanged) paintMessages()
    } catch (error) {
      const message = String((error && error.message) || '')
      // 令牌错不是网络问题：不要触发换网络
      if (/401|令牌|unauthor/i.test(message)) {
        setStatus('bad', '令牌不正确')
        return
      }
      // 当前地址不通：先按「外部优先」重新选路
      if (!choosing) {
        state.wanFirst = true
        void chooseBase()
      }
    } finally {
      polling = false
    }
  }

  function startPolling() {
    if (pollTimer) return
    pollTimer = window.setInterval(poll, POLL_MS)
  }

  function stopPolling() {
    if (!pollTimer) return
    window.clearInterval(pollTimer)
    pollTimer = 0
  }

  /* ---------------- 实时事件（P1：/snapshot + /events） ---------------- */

  function applySnapshot(info) {
    const session = (info && info.session) || {}
    const events = info && Array.isArray(info.events) ? info.events : []
    store.replaceEvents(events)
    state.projections =
      info && info.projections && typeof info.projections === 'object' ? info.projections : {}
    state.stream = null
    state.hydrated = true
    state.waiting = false
    state.busy = false
    state.waitingSince = 0
    state.running = Boolean(session.running)
    if (session.running && !lastTurnHasAssistant(store.timeline())) {
      state.awaitingReply = true
      state.runActive = true
    }
    state.lastEventAt = Date.now()
    state.currentTool = null
    state.lastTool = null
    state.lastToolAt = 0
    if (state.running && session.tool && session.tool.name) {
      state.currentTool = {
        name: String(session.tool.name),
        detail: String(session.tool.detail || ''),
        done: Boolean(session.tool.done),
      }
    }
    if (!state.running) markRunningToolsDone(true)
    state.turnHasMore = Boolean(info && info.hasMore)
    state.historyLimitReached = false
    state.stopped = false
    state.oldestSeq = Number(info && info.oldestSeq) || (events[0] && events[0].seq) || 0
    state.loadingOlder = false
    state.stuckPrompt = false
    state.lastProgressAt = Date.now()
    state.lastEventAge = 0
    state.staleShown = false
    if (info && info.instance) state.instance = String(info.instance)
    if (session.id) state.currentSession = String(session.id)
    if (session.title) setSessionTitle(session.title)
    if (session.model || session.preset || session.permission) {
      state.meta = {
        preset: session.preset || '',
        permission: session.permission || '',
        model: session.model || null,
      }
      paintMeta()
    }
    paintMessages(true)
    window.setTimeout(() => {
      if (!disposed) maybeAutoLoad()
    }, 80)
    if (state.status !== 'ok') setStatus('ok', '已连接')
    if (state.currentSession && events.length > 0) {
      flushCacheBatch()
      void eventCache.put(state.currentSession, events).catch(() => undefined)
    }
  }

  function loadedTurnCount() {
    return store.timeline().filter((item) => item.kind === 'message' && item.message && item.message.who === 'me').length
  }

  function lastUserSeqOf(items) {    let last = -1
    for (const item of items) {
      if (item.kind === 'message' && item.message && item.message.who === 'me') {
        const seq = Number(item.message.seq)
        if (Number.isFinite(seq)) last = Math.max(last, seq)
      }
    }
    return last
  }

  function markRunningToolsDone(allTools = false) {
    const lastUser = allTools ? -1 : lastUserSeqOf(store.timeline())
    let changed = false
    for (const card of store.cards.values()) {
      if (card.kind !== 'tool' || card.status !== 'running') continue
      const seq = Number(card.seq)
      if (!allTools && Number.isFinite(seq) && seq <= lastUser) continue
      card.status = 'ok'
      changed = true
    }
    return changed
  }

  function clearRunState(allTools = false, keepBubble = false) {
    const had =
      state.running ||
      state.waiting ||
      state.busy ||
      Boolean(state.currentTool) ||
      Boolean(state.lastTool)
    state.running = false
    state.awaitingReply = false
    state.notRunningSince = 0
    state.waiting = false
    state.busy = false
    state.waitingSince = 0
    state.currentTool = null
    state.lastTool = null
    state.lastToolAt = 0
    state.stream = null
    state.stuckPrompt = false
    if (!keepBubble) state.runActive = false
    const tools = markRunningToolsDone(allTools)
    return had || tools
  }

  function handleLiveEvent(event) {
    if (!event || typeof event !== 'object' || !event.type) return
    state.lastEventAt = Date.now()
    state.lastProgressAt = Date.now()
    state.notRunningSince = 0
    if (state.stuckPrompt) {
      state.stuckPrompt = false
    }
    if (event.type === 'projection') {
      const values = event.payload && event.payload.values
      state.projections = values && typeof values === 'object' ? values : {}
      requestPaint()
      return
    }
    // P3 流式：只更新临时气泡，不进时间线/缓存
    if (event.type === 'message.assistant.delta') {
      const payload = event.payload || {}
      if (payload.ended) {
        state.stream = null
      } else {
        state.stream = {
          text: String(payload.text || ''),
          reasoning: String(payload.reasoning || ''),
          turn: payload.turn,
          step: payload.step,
        }
      }
      requestPaint()
      return
    }
    if (event.type === 'session.meta') {
      const session = (event.payload && event.payload.session) || {}
      if (session.running !== undefined) {
      state.running = Boolean(session.running)
      if (session.running && !lastTurnHasAssistant(store.timeline())) {
        state.awaitingReply = true
        state.runActive = true
      }
    }
      if (event.payload && event.payload.instance) {
        const next = String(event.payload.instance)
        // 电脑端重启过：seq 从头来，旧游标不可信，重新拉快照
        if (state.instance && next !== state.instance) {
          state.instance = next
          void startLive()
          return
        }
        state.instance = next
      }
      if (session.title) setSessionTitle(session.title)
      requestPaint()
      return
    }
    if (event.type === 'message.assistant' || event.type === 'message.error' || event.type === 'turn.end') {
      state.stream = null
    }
    let changed = store.upsertEvent(event)
    if (event.type === 'turn.start' || event.type === 'message.user') {
      if (event.type === 'turn.start') state.running = true
      state.awaitingReply = true
      state.runActive = true
      state.stopped = false
      changed = true
    } else if (event.type === 'turn.end') {
      clearRunState()
      changed = true
    } else if (event.type === 'message.assistant') {
      state.lastReplyAt = Date.now()
      // 最终回复已到：不再显示执行气泡，即使电脑端还有后台进程在跑
      state.runActive = false
      state.waiting = false
      state.busy = false
    } else if (event.type === 'message.error') {
      state.awaitingReply = false
      state.runActive = false
    } else if (event.type === 'input.result') {
      if (state.currentTool && state.currentTool.name === 'ask_user_question') {
        state.currentTool = null
        state.lastTool = null
        state.lastToolAt = 0
        changed = true
      }
    } else if (event.type === 'tool.start') {
      const tool = {
        name: String((event.payload && event.payload.name) || ''),
        detail: String((event.payload && event.payload.summary) || ''),
        done: false,
      }
      state.currentTool = tool
      state.lastTool = { ...tool, done: true }
      state.lastToolAt = Date.now()
      changed = true
    } else if (event.type === 'tool.end') {
      if (state.currentTool) state.currentTool = { ...state.currentTool, done: true }
      changed = true
    }
    if (!changed) return
    if (event.type === 'message.assistant' || event.type === 'message.error') {
      state.focusLastAssistant = true
    }
    const urgent =
      event.type === 'approval.request' ||
      event.type === 'approval.result' ||
      event.type === 'input.request'
    if (state.currentSession && event.id) {
      queueCacheEvent(state.currentSession, event)
    }
    requestPaint(urgent)
  }

  function closeLive() {
    if (liveSource) {
      try {
        liveSource.close()
      } catch {
        /* 已经关了 */
      }
      liveSource = null
    }
    window.clearTimeout(liveRetry)
    // 流式内容只在这条连接上有效，断了就别留着半截
    state.stream = null
  }

  function connectLive() {
    closeLive()
    if (typeof EventSource !== 'function' || !state.url) {
      fallbackLegacy()
      return
    }
    // after 语义：服务端补「seq > after」；after 就是我们最后收到的 seq
    const source = new EventSource(transport.eventsUrl(store.lastSeq, state.currentSession))
    liveSource = source
    let received = false
    source.onmessage = (message) => {
      if (disposed) return
      received = true
      try {
        handleLiveEvent(JSON.parse(message.data))
      } catch {
        /* 坏帧忽略 */
      }
    }
    source.onerror = () => {
      if (disposed) return
      // 一帧都没收到：说明这台 relay 没有 /events（或令牌不对），退回轮询
      if (!received) {
        fallbackLegacy()
        return
      }
      // 断线重连：带上最后收到的 seq，服务端补拉，store 用 eventId 去重
      closeLive()
      liveRetry = window.setTimeout(() => {
        if (!disposed && liveMode === 'sse') connectLive()
      }, 1500)
    }
  }

  function fallbackLegacy() {
    closeLive()
    if (liveMode === 'legacy') {
      startPolling()
      return
    }
    liveMode = 'legacy'
    startPolling()
    void hydrate(true)
  }

  async function startLive() {
    if (disposed || !state.url) return
    if (liveMode === 'legacy') return
    try {
      const info = await transport.snapshot(state.currentSession || '', { turns: INITIAL_TURNS })
      if (disposed) return
      liveMode = 'sse'
      stopPolling()
      applySnapshot(info)
      connectLive()
    } catch {
      fallbackLegacy()
    }
  }

  async function loadOlder() {
    if (disposed || !state.url || !state.currentSession) return
    if (state.loadingOlder || !state.turnHasMore || !state.oldestSeq) return
    const remaining = MAX_HISTORY_TURNS - loadedTurnCount()
    if (remaining <= 0) {
      state.turnHasMore = false
      state.historyLimitReached = true
      paintMessages()
      return
    }
    const list = refs.list
    const top = list ? list.scrollTop : 0
    const height = list ? list.scrollHeight : 0
    state.loadingOlder = true
    updateLoadSpinner()
    try {
      const info = await transport.snapshot(state.currentSession, {
        turns: Math.min(PAGE_TURNS, remaining),
        before: state.oldestSeq,
      })
      const older = Array.isArray(info && info.events) ? info.events : []
      for (const event of older) store.upsertEvent(event)
      state.oldestSeq = Number(info && info.oldestSeq) || state.oldestSeq
      const hitLimit = loadedTurnCount() >= MAX_HISTORY_TURNS
      state.turnHasMore = Boolean(info && info.hasMore) && !hitLimit
      state.historyLimitReached = hitLimit && Boolean(info && info.hasMore)
      paintMessages()
      if (list) list.scrollTop = top + Math.max(0, list.scrollHeight - height)
    } catch (error) {
      toast('加载更早失败：' + ((error && error.message) || '网络错误'), 'error')
    } finally {
      state.loadingOlder = false
      updateLoadSpinner()
    }
  }

  function updateLoadSpinner() {
    if (!refs.loadSpinner) return
    refs.loadSpinner.hidden = !(state.loadingOlder && state.turnHasMore)
  }

  function maybeAutoLoad() {
    if (!state.turnHasMore || state.loadingOlder || !refs.list) return
    if (refs.list.scrollTop > AUTO_LOAD_TOP) return
    void loadOlder()
  }

  function hasPendingInteraction() {
    const items = store.timeline()
    const lastUserSeq = lastUserSeqOf(items)
    for (const item of items) {
      const seq = Number(item.seq)
      if (Number.isFinite(seq) && seq <= lastUserSeq) continue
      if (item.kind === 'approval' && !item.decision) return true
      if (item.kind === 'input' && item.state === 'open') return true
    }
    return false
  }

  function hasRunningTool() {
    const lastUser = lastUserSeqOf(store.timeline())
    for (const card of store.cards.values()) {
      if (card.kind !== 'tool' || card.status !== 'running') continue
      const seq = Number(card.seq)
      if (!Number.isFinite(seq) || seq > lastUser) return true
    }
    return false
  }

  async function skipStuck(auto) {
    if (state.stuckBusy) return
    state.stuckBusy = true
    state.stuckPrompt = false
    paintMessages()
    let stopped = false
    try {
      await transport.stop()
      stopped = true
    } catch (error) {
      state.stuckBusy = false
      state.lastProgressAt = Date.now()
      paintMessages()
      toast('中断失败：' + ((error && error.message) || '网络错误'), 'error')
      return
    }
    if (stopped) {
      state.stopped = true
      state.awaitingReply = true
      try {
        await transport.send({ text: STUCK_EXPLAIN, images: [], files: [] })
        toast(auto ? '长时间无响应，已中断并说明' : '已中断，已让 agent 换方式')
      } catch {
        state.awaitingReply = false
        toast('已中断，但说明没发出去')
      }
    }
    state.stuckBusy = false
    state.lastProgressAt = Date.now()
    paintMessages()
  }

  async function reconcileStatus() {
    if (disposed || !state.url || document.hidden) return
    if (Date.now() - (Number(state.lastProgressAt) || 0) < 2000) return
    try {
      const info = await transport.health()
      if (typeof info.running !== 'boolean') return
      if (!info.running) {
        // 不用单次轮询结果结束本轮；连续确认一段时间后才收尾
        state.running = false
        if (state.awaitingReply) {
          if (!state.notRunningSince) state.notRunningSince = Date.now()
          const noRunningTool = !state.currentTool && !hasRunningTool()
          if (noRunningTool && Date.now() - state.notRunningSince >= NOT_RUNNING_GRACE_MS) {
            clearRunState(true)
          } else {
            paintMessages()
          }
        }
        return
      }
      state.notRunningSince = 0
      if (info.tool && info.tool.name && state.currentTool && info.tool.done) {
        if (state.currentTool.name === String(info.tool.name) && !state.currentTool.done) {
          state.currentTool = { ...state.currentTool, done: true }
          paintMessages()
        }
      }
      if (!state.awaitingReply) {
        state.awaitingReply = true
        paintMessages()
      }
    } catch {
      /* 外网抖动时等下一轮 */
    }
  }

  function checkStuck() {
    if (disposed || state.stuckBusy) return
    if (!state.running) {
      if (state.stuckPrompt) {
        state.stuckPrompt = false
        paintMessages()
      }
      return
    }
    if (hasPendingInteraction()) {
      if (state.stuckPrompt) {
        state.stuckPrompt = false
        paintMessages()
      }
      return
    }
    const idle = Date.now() - (Number(state.lastProgressAt) || Date.now())
    // 有工具在跑时不自动中断，避免误杀长时间静默的工具；由用户手动跳过
    const abortMs = hasRunningTool() ? Infinity : STUCK_ABORT_MS
    if (idle >= abortMs) {
      void skipStuck(true)
      return
    }
    if (idle >= STUCK_PROMPT_MS && !state.stuckPrompt) {
      state.stuckPrompt = true
      paintMessages()
    }
  }

  /* ---------------- 发送 ---------------- */

  async function sendText(text, isRetry) {
    const value = String(text || '').trim()
    const pending = state.pending || []
    if (!isRetry && pending.some((item) => item.status === 'uploading')) {
      toast('图片/文件还在上传，稍等一下', 'error')
      return
    }
    if (!isRetry && pending.some((item) => item.status === 'error')) {
      toast('有附件上传失败，先移除再发', 'error')
      return
    }
    if (!value && pending.length === 0) return
    if (!state.url) {
      toast('先在 ⚙ 里填电脑地址', 'error')
      openSettings()
      return
    }
    if (state.waiting && !isRetry) return
    state.lastProgressAt = Date.now()
    state.stopped = false
    state.stuckPrompt = false

    const images = pending.filter((item) => item.kind === 'image' && item.ref).map((item) => item.ref)
    const files = pending.filter((item) => item.kind === 'file' && item.ref).map((item) => item.ref)
    const maxSeq = state.messages.reduce((max, message) => {
      const value = message && message.seq
      return Number.isFinite(Number(value)) ? Math.max(max, Number(value)) : max
    }, -1)
    const local = {
      who: 'me',
      text: value,
      at: Date.now(),
      // 真实 seq 还没回来之前，先排在已有消息之后、下一条回复之前
      seq: maxSeq + 0.5,
      local: true,
      images: pending.filter((item) => item.kind === 'image').map((item) => ({
        id: 'local:' + item.key,
        src: item.preview,
      })),
      files: pending.filter((item) => item.kind === 'file').map((item) => ({
        id: 'local:' + item.key,
        name: item.name,
        size: item.size,
      })),
    }
    store.messages.push(local)
    state.draft = ''
    if (refs.input) refs.input.value = ''
    resizeInput()
    state.waiting = true
    state.waitingSince = Date.now()
    state.busy = true
    state.awaitingReply = true
    state.runActive = true
    state.notRunningSince = 0
    state.stream = null
    state.focusLastAssistant = false
    state.holdAnswer = false
    state.reading = false
    state.pendingPaint = false
    paintMessages(true)
    if (liveMode !== 'sse') startPolling()

    const clientMessageId =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10)
    let lastError = null
    for (let attempt = 0; attempt < SEND_ATTEMPTS; attempt += 1) {
      try {
        await transport.send({ text: value, images, files, clientMessageId })
        lastError = null
        state.pending = []
        paintPending()
        // 服务端已收下，等轮询/事件流把回复带回来
        if (liveMode !== 'sse') {
          window.setTimeout(poll, 260)
        } else {
          // 标题由电脑端在首条消息后生成；事件流不带标题，回来补一次 /health
          window.setTimeout(async () => {
            if (disposed) return
            try {
              const info = await transport.health()
              if (info && info.title) setSessionTitle(info.title)
            } catch {
              /* 忽略 */
            }
          }, 700)
        }
        setStatus('ok', '已连接')
        return
      } catch (error) {
        lastError = error
        if (attempt < SEND_ATTEMPTS - 1) await delay(700 * (attempt + 1))
      }
    }

    state.waiting = false
    state.busy = false
    state.awaitingReply = false
    state.runActive = false
    const index = store.messages.indexOf(local)
    if (index >= 0) store.messages.splice(index, 1)
    store.messages.push({
      who: 'error',
      text: '发送失败：' + ((lastError && lastError.message) || '未知错误'),
      at: Date.now(),
      retryText: value,
    })
    setStatus('bad', '发送失败')
    paintMessages(true)
  }

  function paintPending() {
    const list = state.pending || []
    if (!refs.attach) return
    refs.attach.hidden = list.length === 0
    refs.attach.innerHTML = list
      .map((item) => {
        const thumb = item.kind === 'image' && item.preview
          ? `<img class="chat-chip-thumb" src="${escapeAttr(item.preview)}" alt="" />`
          : '<span class="chat-chip-icon">📎</span>'
        const stateText = item.status === 'uploading'
          ? '<span class="chat-chip-state">上传中</span>'
          : item.status === 'error'
            ? '<span class="chat-chip-state is-bad">失败</span>'
            : ''
        return `<div class="chat-chip" data-key="${escapeAttr(item.key)}"><button type="button" class="chat-chip-x" data-action="remove-attach" data-key="${escapeAttr(item.key)}" aria-label="移除">×</button>${thumb}${stateText}</div>`
      })
      .join('')
  }

  function removePending(key) {
    state.pending = (state.pending || []).filter((item) => item.key !== key)
    paintPending()
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = String(reader.result || '')
        const comma = result.indexOf(',')
        resolve(comma >= 0 ? result.slice(comma + 1) : result)
      }
      reader.onerror = () => reject(reader.error || new Error('读不到文件'))
      reader.readAsDataURL(file)
    })
  }

  async function uploadPending(item) {
    try {
      const payload = item.kind === 'image'
        ? { data: item.data, mediaType: item.mediaType, name: item.name }
        : { data: item.data, name: item.name }
      const info = item.kind === 'image'
        ? await transport.uploadImage(payload)
        : await transport.uploadFile(payload)
      if (!info || !info.attachment) throw new Error('上传结果不对')
      item.ref = info.attachment
      item.status = 'ready'
    } catch (error) {
      item.status = 'error'
      item.error = (error && error.message) || '上传失败'
    }
    paintPending()
  }

  async function addFiles(fileList) {
    const files = Array.from(fileList || [])
    if (files.length === 0) return
    if (!state.url) {
      toast('先在 ⚙ 里填电脑地址', 'error')
      openSettings()
      return
    }
    for (const file of files) {
      const isImage = String(file.type || '').startsWith('image/')
      const sameKind = (state.pending || []).filter((item) => item.kind === (isImage ? 'image' : 'file'))
      if (sameKind.length >= 4) {
        toast(isImage ? '一条消息最多 4 张图' : '一条消息最多 4 个文件', 'error')
        continue
      }
      if (file.size > 30 * 1024 * 1024) {
        toast((file.name || '文件') + ' 超过 30MB', 'error')
        continue
      }
      const item = {
        key: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        kind: isImage ? 'image' : 'file',
        name: file.name || (isImage ? '图片' : '文件'),
        mediaType: file.type || (isImage ? 'image/jpeg' : 'application/octet-stream'),
        size: file.size,
        status: 'uploading',
        data: '',
        preview: '',
        ref: null,
      }
      state.pending.push(item)
      paintPending()
      try {
        item.data = await fileToBase64(file)
      } catch (error) {
        item.status = 'error'
        item.error = '读不到这个文件'
        paintPending()
        continue
      }
      if (isImage) item.preview = 'data:' + item.mediaType + ';base64,' + item.data
      paintPending()
      void uploadPending(item)
    }
  }

  function onPickChange(event) {
    const target = event.target
    if (target === refs.relayToggle && target instanceof HTMLInputElement) {
      const enabled = Boolean(target.checked)
      if (!api.watch || typeof api.watch.start !== 'function') {
        target.checked = !enabled
        toast('当前壳不支持这个开关', 'error')
        return
      }
      state.notify = enabled
      savePrefs()
      applyWatch()
      void refreshRelay()
      return
    }
    if (!(target instanceof HTMLInputElement) || target !== refs.pick) return
    const files = target.files ? Array.from(target.files) : []
    target.value = ''
    void addFiles(files)
  }

  async function stopWaiting() {
    const url = state.url
    state.waiting = false
    state.busy = false
    paintMessages()
    if (!url) return
    try {
      await transport.stop()
      state.stopped = true
      clearRunState(true)
      paintMessages()
      toast('已停止执行')
    } catch (error) {
      toast('停止失败：' + ((error && error.message) || '网络错误'), 'error')
    }
  }

  /* ---------------- 会话 ---------------- */

  async function openSessionSheet() {
    if (!state.url) {
      openSettings()
      return
    }
    state.sessionsOpen = true
    state.sessionQuery = ''
    if (drawerHideTimer) {
      window.clearTimeout(drawerHideTimer)
      drawerHideTimer = 0
    }
    showDrawerPane('list')
    refs.sheetBody.innerHTML = '<div class="chat-sheet-tip">正在读取历史对话…</div>'
    refs.scrim.hidden = false
    setDrawerOpen(true)
    try {
      const info = await transport.sessions()
      const all = Array.isArray(info.sessions) ? info.sessions : []
      const current = info.current || state.currentSession || ''
      if (current) state.currentSession = String(current)
      state.archivedList = Array.isArray(info.archived) ? info.archived : []
      state.showArchived = false
      // 电脑端侧栏不显示空白会话；手机上只保留当前正在用的那条空白，
      // 避免历史上点过的“新对话”空壳堆满列表。
      state.sessionsList = all.filter((session) => !session.blank || session.id === current)
      if (refs.sessionSearch) {
        refs.sessionSearch.value = ''
        refs.sessionSearch.hidden = true
      }
      refs.sheetBody.innerHTML = '<div data-role="session-list"></div>'
      paintSessionList()
    } catch (error) {
      state.sessionsList = []
      refs.sheetBody.innerHTML = `<div class="chat-sheet-tip">读取失败：${escapeHtml((error && error.message) || '未知错误')}</div>`
    }
  }

  /** 会话抽屉：按标题/id 过滤（搜索框在列表上方，只重画列表） */
  function paintSessionList() {
    const host = refs.sheetBody && refs.sheetBody.querySelector('[data-role="session-list"]')
    if (!host) return
    const query = String(state.sessionQuery || '').trim().toLowerCase()
    const list = (state.sessionsList || []).filter((session) => {
      if (!query) return true
      return (
        String(session.title || '').toLowerCase().includes(query) ||
        String(session.id || '').toLowerCase().includes(query)
      )
    })
    const current = state.currentSession || ''
    const rows = list.slice(0, 80).map((session) => sessionRowHtml(session, current)).join('')
    const empty = `<div class="chat-sheet-tip">${query ? '没有匹配的对话' : '还没有历史对话'}</div>`
    const archived = (state.archivedList || []).filter((session) => {
      if (!query) return true
      return (
        String(session.title || '').toLowerCase().includes(query) ||
        String(session.id || '').toLowerCase().includes(query)
      )
    })
    const toggle = `<button type="button" class="chat-archived-toggle" data-action="toggle-archived">${state.showArchived ? '收起已归档' : '已归档 ' + archived.length}</button>`
    let archivedHtml = ''
    if (state.showArchived) {
      archivedHtml = archived.length
        ? archived
            .slice(0, 80)
            .map(
              (session) => `<div class="chat-session-row is-archived"><button type="button" class="chat-session" data-action="restore-session" data-session="${escapeAttr(session.id || '')}">
                <span class="chat-session-label">${escapeHtml(session.title || '未命名对话')}</span>
                <span class="chat-session-time">已归档 · 点按恢复</span>
              </button></div>`,
            )
            .join('')
        : '<div class="chat-sheet-tip">没有已归档的对话</div>'
    }
    host.innerHTML = (list.length ? rows : empty) + toggle + archivedHtml
  }

  /** 消息搜索：当前会话内按文本过滤，点结果跳到那条消息 */
  function messageKey(message) {
    if (!message) return ''
    if (message.eventId) return String(message.eventId)
    if (message.id) return 'id' + message.id
    if (Number.isFinite(Number(message.seq))) return 's' + message.seq
    return ''
  }

  function openSearch() {
    state.searchQuery = ''
    if (refs.searchScrim) refs.searchScrim.hidden = false
    if (refs.searchInput) {
      refs.searchInput.value = ''
      refs.searchInput.focus()
    }
    paintSearchResults()
  }

  function closeSearch() {
    if (refs.searchScrim) refs.searchScrim.hidden = true
  }

  function paintSearchResults() {
    if (!refs.searchBody) return
    const query = String(state.searchQuery || '').trim().toLowerCase()
    if (!query) {
      refs.searchBody.innerHTML = '<div class="chat-sheet-tip">输入关键词搜索当前对话</div>'
      return
    }
    const results = []
    for (const message of state.messages) {
      const text = String(message.text || '')
      if (!text) continue
      const at = text.toLowerCase().indexOf(query)
      if (at < 0) continue
      const start = Math.max(0, at - 16)
      const end = at + query.length + 26
      const snippet =
        (start > 0 ? '…' : '') +
        text.slice(start, end).replace(/\s+/g, ' ') +
        (end < text.length ? '…' : '')
      results.push({ key: messageKey(message), who: message.who, snippet, at: message.at })
      if (results.length >= 80) break
    }
    if (results.length === 0) {
      refs.searchBody.innerHTML = '<div class="chat-sheet-tip">没有找到包含该关键词的消息</div>'
      return
    }
    refs.searchBody.innerHTML = results
      .map(
        (item) => `<button type="button" class="chat-search-hit" data-action="search-jump" data-key="${escapeAttr(item.key)}">
          <span class="chat-search-hit-head">${item.who === 'me' ? '我' : item.who === 'error' ? '错误' : '助手'} · ${fmtClock(item.at)}</span>
          <span class="chat-search-hit-text">${escapeHtml(item.snippet)}</span>
        </button>`,
      )
      .join('')
  }

  function jumpToMessage(key) {
    closeSearch()
    if (!key || !refs.list) return
    const target = refs.list.querySelector('[data-mid="' + key.replace(/["\\]/g, '\\$&') + '"]')
    if (!target) {
      toast('这条消息不在当前窗口里', 'error')
      return
    }
    target.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  function openSessionMenu(id, title) {
    state.sessionMenuId = String(id || '')
    state.sessionMenuTitle = String(title || '')
    if (refs.sessionMenu) refs.sessionMenu.hidden = false
  }

  function closeSessionMenu() {
    if (refs.sessionMenu) refs.sessionMenu.hidden = true
  }

  function openRename() {
    state.renameId = state.sessionMenuId
    closeSessionMenu()
    if (refs.renameInput) {
      refs.renameInput.value = state.sessionMenuTitle || ''
      refs.renameInput.focus()
    }
    if (refs.renameScrim) refs.renameScrim.hidden = false
  }

  function closeRename() {
    if (refs.renameScrim) refs.renameScrim.hidden = true
  }

  async function applyRename() {
    const id = state.renameId
    const title = String((refs.renameInput && refs.renameInput.value) || '').trim()
    if (!id || !title) {
      toast('标题不能为空', 'error')
      return
    }
    try {
      const result = await transport.renameSession(id, title)
      if (id === state.currentSession && result && result.title) setSessionTitle(result.title)
      closeRename()
      toast('已重命名')
      if (state.sessionsOpen) await openSessionSheet()
    } catch (error) {
      toast('重命名失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  async function applyFork() {
    const id = state.sessionMenuId
    closeSessionMenu()
    if (!id) return
    toast('正在分支…')
    try {
      const result = await transport.forkSession(id)
      if (result && result.sessionId) await switchSession(result.sessionId)
      else toast('分支失败', 'error')
    } catch (error) {
      toast('分支失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  let drawerHideTimer = 0

  function setDrawerOpen(open) {
    if (!appEl) return
    if (open) {
      const top = refs.top ? refs.top.getBoundingClientRect().height : 0
      appEl.style.setProperty('--drawer-top', Math.round(top) + 'px')
    }
    appEl.classList.toggle('is-drawer-open', Boolean(open))
    if (refs.switchBtn) {
      refs.switchBtn.textContent = open ? '✕' : '☰'
      refs.switchBtn.setAttribute('aria-label', open ? '关闭会话菜单' : '打开会话菜单')
    }
  }

  function showDrawerPane(mode) {
    state.drawerMode = mode === 'create' ? 'create' : 'list'
    if (refs.drawerList) refs.drawerList.hidden = state.drawerMode !== 'list'
    if (refs.drawerCreate) refs.drawerCreate.hidden = state.drawerMode !== 'create'
  }

  function openArchive(id, title) {
    state.archiveId = String(id || '')
    state.archiveStop = false
    closeSessionMenu()
    if (refs.archiveText) {
      refs.archiveText.textContent = `「${title || '这个会话'}」将从列表移除，可在「已归档」里恢复。`
    }
    if (refs.archiveScrim) refs.archiveScrim.hidden = false
  }

  function closeArchive() {
    if (refs.archiveScrim) refs.archiveScrim.hidden = true
    state.archiveId = ''
    state.archiveStop = false
  }

  async function confirmArchive() {
    const id = state.archiveId
    if (!id) return
    try {
      await transport.archiveSession(id, state.archiveStop)
      closeArchive()
      toast('已归档')
      if (state.sessionsOpen) await openSessionSheet()
    } catch (error) {
      if (error && error.code === 'workspace/session-active' && !state.archiveStop) {
        state.archiveStop = true
        if (refs.archiveText) refs.archiveText.textContent = '这个会话还在执行，停止并归档？'
        return
      }
      toast('归档失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  async function restoreSession(id) {
    if (!id) return
    try {
      await transport.unarchiveSession(id)
      toast('已恢复')
      if (state.sessionsOpen) await openSessionSheet()
    } catch (error) {
      toast('恢复失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  function closeSessionSheet() {
    state.sessionsOpen = false
    setDrawerOpen(false)
    if (drawerHideTimer) window.clearTimeout(drawerHideTimer)
    drawerHideTimer = window.setTimeout(() => {
      drawerHideTimer = 0
      if (!state.sessionsOpen && refs.scrim) refs.scrim.hidden = true
    }, 260)
  }

  async function switchSession(id) {
    closeSessionSheet()
    if (!id) return
    toast('正在打开对话…')
    try {
      const info = await transport.target(id)
      flushCacheBatch()
      closeLive()
      store.clear()
      state.booting = true
      state.historyLimitReached = false
      state.stopped = false
      state.awaitingReply = false
      state.notRunningSince = 0
      state.stream = null
        state.focusLastAssistant = false
      state.holdAnswer = false
      state.reading = false
      state.pendingPaint = false
      state.lastListTop = 0
      state.projections = {}
      state.hydrated = false
      state.waiting = false
      state.busy = false
      state.pending = []
      state.running = false
      state.lastEventAge = 0
      state.waitingSince = 0
      state.staleShown = false
      paintPending()
      if (info && info.current) state.currentSession = String(info.current)
      if (state.currentSession) void eventCache.clearOthers(state.currentSession).catch(() => undefined)
      setSessionTitle((info && info.title) || '')
      state.view = 'chat'
      if (refs.page) refs.page.hidden = true
      paintMessages(true)
      if (liveMode === 'sse') {
        // 切会话后用新会话重新订阅；失败会退回轮询
        void startLive()
      } else {
        await hydrate(true)
      }
      toast('已切换对话')
    } catch (error) {
      toast('切换失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  function presetItems() {
    const list = state.options && Array.isArray(state.options.presets) ? state.options.presets : []
    if (list.length) {
      return list.map((item) => {
        const id = String(item.id)
        const label = PRESET_LABELS[id]
        return {
          value: id,
          // 去掉「模式」后缀，只留「标准 / 创造 / 极简 / 编排」
          name: String((label && label.name) || item.name || id).replace(/模式$/, ''),
          description: (label && label.description) || item.description || '',
        }
      })
    }
    return [
      { value: 'standard', name: '标准', description: PRESET_LABELS.standard.description },
      { value: 'ptc', name: '创造', description: PRESET_LABELS.ptc.description },
      { value: 'minimal', name: '极简', description: PRESET_LABELS.minimal.description },
      { value: 'cordis', name: '编排', description: PRESET_LABELS.cordis.description },
    ]
  }

  function defaultPresetValue() {
    const list = state.options && Array.isArray(state.options.presets) ? state.options.presets : []
    if (list.some((item) => item && String(item.id) === 'standard')) return 'standard'
    const found = list.find((item) => item && item.isDefault)
    return found && found.id ? String(found.id) : 'standard'
  }

  /**
   * 新建会话的默认权限：手机现在能处理审批了，不再一上来就「完全权限」。
   * 优先 workspace-write（会触发审批），没有就退回服务端默认/只读。
   */
  function preferredPermission() {
    const options = state.options
    const list = options && Array.isArray(options.permissions) ? options.permissions : []
    const has = (value) => list.some((item) => item && String(item.value) === value)
    if (has('workspace-write')) return 'workspace-write'
    if (has('read-only')) return 'read-only'
    const fallback = options && options.defaultPermission ? String(options.defaultPermission) : ''
    if (fallback && fallback !== 'danger-full-access') return fallback
    return 'workspace-write'
  }

  async function ensureOptions(force) {
    if (state.options && !force) return state.options
    try {
      const info = await transport.options()
      state.options = {
        presets: Array.isArray(info.presets) ? info.presets : [],
        permissions: Array.isArray(info.permissions) ? info.permissions : [],
        defaultPermission: String(info.defaultPermission || ''),
        models: info.models || { groups: [], default: null },
      }
    } catch {
      state.options = { presets: [], permissions: [], defaultPermission: '', models: { groups: [], default: null }, failed: true }
    }
    return state.options
  }

  function chipsHtml(items, current, scope, action) {
    return items
      .map((item) => `<button type="button" class="chat-opt" data-action="${action}" data-scope="${scope}" data-value="${escapeAttr(item.value)}" data-on="${item.value === current ? '1' : '0'}">${escapeHtml(item.name)}</button>`)
      .join('')
  }

  function modelSectionHtml(scope) {
    const groups = state.options && state.options.models && Array.isArray(state.options.models.groups)
      ? state.options.models.groups
      : []
    if (groups.length === 0) return ''
    const modelId = state.formModel || ''
    const effort = state.formEffort || ''
    const blocks = groups
      .map((group) => {
        const chips = (group.models || [])
          .map((item) => `<button type="button" class="chat-opt" data-action="pick-model" data-scope="${scope}" data-provider="${escapeAttr(group.id)}" data-value="${escapeAttr(item.id)}" data-on="${item.id === modelId ? '1' : '0'}">${escapeHtml(item.name || item.id)}</button>`)
          .join('')
        if (scope === 'new') {
          return `<div class="chat-chipgroup">${chips}</div>`
        }
        return `<div class="chat-form-block"><p class="chat-sheet-sub">${escapeHtml(group.name || group.id)}</p><div class="chat-chipgroup">${chips}</div></div>`
      })
      .join('')
    const modelBlock = scope === 'new'
      ? `<div class="chat-form-block"><p class="chat-sheet-sub">模型</p>${blocks}</div>`
      : blocks
    const info = modelInfo(state.formProvider, modelId)
    const efforts = info && info.model && info.model.reasoning && Array.isArray(info.model.reasoning.efforts)
      ? info.model.reasoning.efforts
      : []
    const effortHtml = efforts.length
      ? `<div class="chat-form-block"><p class="chat-sheet-sub">推理等级</p><div class="chat-chipgroup">${efforts.map((item) => `<button type="button" class="chat-opt" data-action="pick-effort" data-scope="${scope}" data-value="${escapeAttr(item.id)}" data-on="${item.id === effort ? '1' : '0'}">${escapeHtml(item.name || item.id)}</button>`).join('')}</div></div>`
      : ''
    let permissionHtml = ''
    if (scope === 'model') {
      const permissions = (state.options && Array.isArray(state.options.permissions)
        ? state.options.permissions
        : []
      ).map((item) => ({
        value: String(item.value),
        name: PERMISSION_LABELS[String(item.value)] || item.name || String(item.value),
      }))
      if (permissions.length > 0) {
        const current = state.sessionPermission || (state.meta && state.meta.permission) || ''
        permissionHtml = `<div class="chat-form-block"><p class="chat-sheet-sub">权限</p><div class="chat-chipgroup">${permissions.map((item) => `<button type="button" class="chat-opt" data-action="pick-permission-current" data-value="${escapeAttr(item.value)}" data-on="${item.value === current ? '1' : '0'}">${escapeHtml(item.name)}</button>`).join('')}</div><p class="chat-opt-desc">切换后从下一次操作开始生效；完全权限不再询问。</p></div>`
      }
    }
    return modelBlock + effortHtml + permissionHtml
  }

  function applyModelDefaults() {
    const def = state.options && state.options.models ? state.options.models.default : null
    const groups = state.options && state.options.models && Array.isArray(state.options.models.groups) ? state.options.models.groups : []
    const first = groups[0] && Array.isArray(groups[0].models) ? groups[0].models[0] : null
    const provider = def && def.provider ? String(def.provider) : (groups[0] ? String(groups[0].id) : '')
    const model = def && def.model ? String(def.model) : (first ? String(first.id) : '')
    const info = modelInfo(provider, model)
    const effort = def && def.reasoningEffort
      ? String(def.reasoningEffort)
      : (info && info.model && info.model.reasoning ? String(info.model.reasoning.defaultEffort || '') : '')
    state.formProvider = provider
    state.formModel = model
    state.formEffort = effort
  }

  function paintNewSheet() {
    if (!refs.newBody) return
    const presets = presetItems()
    const selected = presets.find((item) => item.value === state.formPreset)
      || presets.find((item) => item.value === defaultPresetValue())
    const permissions = (state.options && Array.isArray(state.options.permissions)
      ? state.options.permissions
      : []
    ).map((item) => ({
      value: String(item.value),
      name: PERMISSION_LABELS[String(item.value)] || item.name || String(item.value),
      description: PERMISSION_DESCRIPTIONS[String(item.value)] || item.description || '',
    }))
    const currentPermission = state.formPermission
      || preferredPermission()
    const selectedPermission = permissions.find((item) => item.value === currentPermission)
    const permissionDesc = selectedPermission && selectedPermission.description
      ? selectedPermission.description
      : currentPermission === 'danger-full-access'
        ? '完全权限：不再询问，直接执行。'
        : '非完全权限时，需要授权的操作会先弹到手机确认。'
    refs.newBody.innerHTML = `
      <div class="chat-form-block">
        <p class="chat-sheet-sub">标题</p>
        <input class="chat-sheet-search" data-role="new-title" value="${escapeAttr(state.formTitle || '')}" placeholder="可不填，自动取第一句" autocomplete="off" spellcheck="false" />
      </div>
      <div class="chat-form-block">
        <p class="chat-sheet-sub">模式</p>
        <div class="chat-chipgroup">${chipsHtml(presets, selected ? selected.value : state.formPreset, 'new', 'pick-preset')}</div>
        <p class="chat-opt-desc">${escapeHtml((selected && selected.description) || '')}</p>
      </div>
      ${permissions.length > 0 ? `
      <div class="chat-form-block">
        <p class="chat-sheet-sub">权限</p>
        <div class="chat-chipgroup">${chipsHtml(permissions, currentPermission, 'new', 'pick-permission')}</div>
        <p class="chat-opt-desc">${escapeHtml(permissionDesc)}</p>
      </div>` : ''}
      ${modelSectionHtml('new')}
      <button type="button" class="chat-btn is-primary is-block" data-action="create-session">开始对话</button>
    `
  }

  function modelInfo(provider, modelId) {
    const groups = state.options && state.options.models && Array.isArray(state.options.models.groups)
      ? state.options.models.groups
      : []
    for (const group of groups) {
      if (provider && group.id !== provider) continue
      for (const model of group.models || []) {
        if (model.id === modelId) return { provider: group.id, name: group.name || group.id, model }
      }
    }
    return null
  }

  function modelLabel(provider, modelId) {
    const info = modelInfo(provider, modelId)
    return info && info.model && info.model.name ? String(info.model.name) : String(modelId || '')
  }

  function effortLabel(provider, modelId, effortId) {
    const info = modelInfo(provider, modelId)
    const efforts = info && info.model && info.model.reasoning && Array.isArray(info.model.reasoning.efforts)
      ? info.model.reasoning.efforts
      : []
    const found = efforts.find((item) => item && item.id === effortId)
    return found && found.name ? String(found.name) : String(effortId || '')
  }

  function paintMeta() {
    if (!refs.modelChip) return
    const model = state.meta && state.meta.model
    if (!model || !model.model) {
      refs.modelChip.hidden = true
      refs.modelChip.textContent = ''
      return
    }
    const parts = [modelLabel(model.provider, model.model)]
    if (model.reasoningEffort) parts.push(effortLabel(model.provider, model.model, model.reasoningEffort))
    refs.modelChip.hidden = false
    refs.modelChip.textContent = parts.join(' · ')
    saveUICache()
  }

  function paintModelSheet() {
    if (!refs.modelBody) return
    const groups = state.options && state.options.models && Array.isArray(state.options.models.groups)
      ? state.options.models.groups
      : []
    if (groups.length === 0) {
      refs.modelBody.innerHTML = '<div class="chat-sheet-tip">读不到模型列表</div>'
      return
    }
    refs.modelBody.innerHTML = modelSectionHtml('model')
  }

  async function openModelSheet() {
    if (!state.url) return
    const current = state.meta && state.meta.model ? state.meta.model : null
    state.formProvider = current ? current.provider : ''
    state.formModel = current ? current.model : ''
    state.formEffort = current ? current.reasoningEffort : ''
    state.sessionPermission =
      (state.meta && state.meta.permission) ||
      (state.options && state.options.defaultPermission) ||
      ''
    if (refs.modelScrim) refs.modelScrim.hidden = false
    if (state.options) {
      paintModelSheet()
    } else {
      if (refs.modelBody) refs.modelBody.innerHTML = '<div class="chat-sheet-tip">正在读取模型…</div>'
      void ensureOptions().then(() => paintModelSheet())
    }
  }

  function closeModelSheet() {
    if (refs.modelScrim) refs.modelScrim.hidden = true
  }

  function pickModelOption(kind, value, provider, scope) {
    if (kind === 'model') {
      state.formProvider = provider || state.formProvider
      state.formModel = value
      const info = modelInfo(state.formProvider, value)
      const efforts = info && info.model && info.model.reasoning && Array.isArray(info.model.reasoning.efforts)
        ? info.model.reasoning.efforts
        : []
      const fallback = info && info.model && info.model.reasoning ? info.model.reasoning.defaultEffort || '' : ''
      state.formEffort = efforts.some((item) => item.id === state.formEffort) ? state.formEffort : (fallback || (efforts[0] ? efforts[0].id : ''))
    } else {
      state.formEffort = value
    }
    if (scope === 'new') paintNewSheet()
    else paintModelSheet()
  }

  async function applyModel() {
    if (!state.url || !state.formProvider || !state.formModel) return
    const payload = { provider: state.formProvider, model: state.formModel }
    if (state.formEffort) payload.reasoningEffort = state.formEffort
    try {
      const wanted = String(state.sessionPermission || '')
      if (wanted && (!state.meta || wanted !== state.meta.permission)) {
        const result = await transport.setPermission(wanted)
        if (result && result.meta) state.meta = result.meta
      }
      const info = await transport.selectModel(payload)
      if (info && info.meta) state.meta = info.meta
      paintMeta()
      closeModelSheet()
      toast('已应用')
    } catch (error) {
      toast('应用失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  function openNewSheet() {
    if (!state.url) {
      openSettings()
      return
    }
    state.sessionsOpen = true
    if (drawerHideTimer) {
      window.clearTimeout(drawerHideTimer)
      drawerHideTimer = 0
    }
    if (refs.scrim) refs.scrim.hidden = false
    setDrawerOpen(true)
    showDrawerPane('create')
    state.formPreset = defaultPresetValue()
    state.formPermission = preferredPermission()
    if (state.options) {
      applyModelDefaults()
      paintNewSheet()
    } else {
      if (refs.newBody) refs.newBody.innerHTML = '<div class="chat-sheet-tip">正在读取可选项…</div>'
      void ensureOptions().then(() => {
        applyModelDefaults()
        paintNewSheet()
      })
    }
  }

  function closeNewSheet() {
    showDrawerPane('list')
  }

  function pickOption(kind, scope, value) {
    if (kind !== 'preset' || scope !== 'new') return
    state.formPreset = value
    paintNewSheet()
  }

  function showConfirm() {
    if (refs.confirmScrim) refs.confirmScrim.hidden = false
  }

  function closeConfirm() {
    if (refs.confirmScrim) refs.confirmScrim.hidden = true
  }

  /** 通过按钮退出：停掉壳的后台监听，再关掉对话应用 */
  function closeChatApp() {
    void (async () => {
      try {
        await postPresence(false)
      } catch {
        /* 忽略 */
      }
      try {
        if (api.watch && typeof api.watch.stop === 'function') void api.watch.stop(APP_ID)
      } catch {
        /* 旧壳没有这个能力 */
      }
      try {
        if (api.shell && typeof api.shell.exit === 'function') api.shell.exit()
      } catch {
        /* 忽略 */
      }
    })()
  }

  async function createNew() {
    if (!state.url) {
      openSettings()
      return
    }
    const preset = state.formPreset || defaultPresetValue()
    const permission = state.formPermission || preferredPermission()
    const title = String(state.formTitle || '').trim()
    toast('正在新建对话…')
    try {
      const info = await transport.createSession({
        preset,
        permission,
        ...(title ? { title } : {}),
      })
      const sessionId = info && info.current ? String(info.current) : ''
      // 新建时选的模型/推理，紧接着装到这条新会话上
      if (sessionId && state.formProvider && state.formModel) {
        try {
          const applied = await transport.selectModel({
            sessionId,
            provider: state.formProvider,
            model: state.formModel,
            ...(state.formEffort ? { reasoningEffort: state.formEffort } : {}),
          })
          if (applied && applied.meta) state.meta = applied.meta
        } catch {
          /* 装不上就继续用会话默认模型 */
        }
      }
      flushCacheBatch()
      closeLive()
      store.clear()
      state.booting = true
      state.historyLimitReached = false
      state.stopped = false
      state.awaitingReply = false
      state.notRunningSince = 0
      state.stream = null
        state.focusLastAssistant = false
      state.holdAnswer = false
      state.reading = false
      state.pendingPaint = false
      state.lastListTop = 0
      state.projections = {}
      state.hydrated = false
      state.waiting = false
      state.busy = false
      state.pending = []
      state.running = false
      state.lastEventAge = 0
      state.waitingSince = 0
      state.staleShown = false
      paintPending()
      if (info && info.current) state.currentSession = String(info.current)
      if (state.currentSession) void eventCache.clearOthers(state.currentSession).catch(() => undefined)
      if (info && info.meta) {
        state.meta = info.meta
        paintMeta()
      }
      setSessionTitle((info && info.title) || '新对话')
      state.view = 'chat'
      if (refs.page) refs.page.hidden = true
      paintMessages(true)
      if (liveMode === 'sse') void startLive()
      if (refs.input) refs.input.focus()
      closeSessionSheet()
      state.formTitle = ''
      toast(info && info.created === false ? '已经是新对话' : '新对话已就绪')
    } catch (error) {
      toast('新建失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  /* ---------------- 设置 ---------------- */

  function paintModeChips() {
    const group = appEl && appEl.querySelector('[data-role="mode-group"]')
    if (!group) return
    for (const btn of group.querySelectorAll('[data-action="pick-mode"]')) {
      btn.dataset.on = btn.dataset.value === state.mode ? '1' : '0'
    }
  }

  function paintNotifyMode() {
    if (!refs.notifyMode) return
    const mode = state.notifyMode === 'message' ? 'message' : 'turn'
    for (const btn of refs.notifyMode.querySelectorAll('[data-action="pick-notify-mode"]')) {
      btn.dataset.on = btn.dataset.value === mode ? '1' : '0'
    }
  }

  function openSettings() {
    closeSessionSheet()
    state.view = 'settings'
    state.testResult = null
    state.openAcc = ''
    measureHeader()
    refs.page.hidden = false
    refs.inputUrl.value = state.lanUrl || DEFAULT_URL
    if (refs.inputWan) refs.inputWan.value = state.wanUrl || ''
    paintModeChips()
    refs.inputToken.value = state.token || ''
    if (refs.lanState) {
      refs.lanState.textContent = ''
      refs.lanState.dataset.tone = ''
    }
    if (refs.wanState) {
      refs.wanState.textContent = ''
      refs.wanState.dataset.tone = ''
    }
    refs.version.textContent = version ? 'v' + version + ' · 由 DSH 插件托管' : '由 DSH 插件托管'
    paintNotifyMode()
    toggleAcc('')
    updateServerSum()
    void refreshRelay()
  }

  function backToChat() {
    state.view = 'chat'
    refs.page.hidden = true
    paintMessages()
  }

  async function testConnection() {
    const lan = normalizeUrl(refs.inputUrl.value)
    const wan = refs.inputWan ? normalizeUrl(refs.inputWan.value) : ''
    const token = refs.inputToken.value.trim()
    const headers = token ? { Authorization: 'Bearer ' + token } : {}
    const paint = (el, text, tone) => {
      if (!el) return
      el.textContent = text
      el.dataset.tone = tone || ''
    }
    paint(refs.lanState, lan ? '· 网络测试中' : '· 未填', lan ? 'busy' : '')
    paint(refs.wanState, wan ? '· 网络测试中' : '· 未填', wan ? 'busy' : '')
    const testBtn = appEl && appEl.querySelector('[data-action="test"]')
    if (testBtn) testBtn.dataset.busy = '1'
    const probe = async (base, ms) => {
      if (!base) return { text: '未填', tone: '' }
      const started = Date.now()
      try {
        const res = await fetchWithTimeout(base + '/health', { headers }, ms)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const info = await res.json().catch(() => ({}))
        const msValue = Date.now() - started
        return {
          text:
            (info && info.hasKey === false ? '可连接（未配 Key）' : '可连接') +
            ' · ' + msValue + 'ms',
          tone: 'ok',
        }
      } catch {
        return { text: '连不上', tone: 'bad' }
      }
    }
    const [lanResult, wanResult] = await Promise.all([probe(lan, 4000), probe(wan, 6000)])
    paint(refs.lanState, '· ' + lanResult.text, lanResult.tone)
    paint(refs.wanState, '· ' + wanResult.text, wanResult.tone)
    if (testBtn) delete testBtn.dataset.busy
  }

  function watchPolicy() {
    return buildWatchPolicy({
      appId: APP_ID,
      base: state.url || DEFAULT_URL,
      token: state.token || '',
      notify: state.notify !== false,
      mode: state.notifyMode === 'message' ? 'message' : 'turn',
    })
  }

  function applyWatch() {
    if (!api.watch || typeof api.watch.start !== 'function') return
    if (state.notify === false) {
      void api.watch.stop(APP_ID).catch(() => undefined)
      return
    }
    void api.watch.start(watchPolicy()).catch(() => undefined)
  }

  let choosing = false
  let baseGeneration = 0
  let baseRetry = 0
  let baseHeartbeat = 0
  let baseSlowCheck = 0
  let stuckTimer = 0
  let statusTimer = 0

  async function probeBase(base, ms) {
    if (!base) return false
    try {
      const res = await fetchWithTimeout(base + '/health', {}, ms || 1200)
      return res.ok
    } catch {
      return false
    }
  }

  /** 自动：家里优先、外网兜底；手动：只探选中的那个，探通才算连上 */
  async function chooseBase(force) {
    if (choosing) return false
    choosing = true
    const gen = ++baseGeneration
    window.clearTimeout(baseRetry)
    try {
      const mode = state.mode || (state.autoPick ? 'auto' : state.pick === 'wan' ? 'wan' : 'lan')
      // 上一步失败过就先试外部：Wi-Fi 刚断时家里肯定不通，别再等它超时
      const order =
        mode === 'auto'
          ? state.wanFirst
            ? [state.wanUrl, state.lanUrl]
            : [state.lanUrl, state.wanUrl]
          : [mode === 'wan' ? state.wanUrl : state.lanUrl]
      const candidates = order.filter(Boolean)
      if (candidates.length === 0) {
        setStatus('bad', mode === 'wan' ? '外部地址未填' : '家里地址未填')
        return false
      }
      // 外网多给时间：4G + 隧道首连会慢
      const wasOnline = state.status === 'ok'
      // 先静默探测；超过 1 秒还没结果才显示「网络连接中…」
      let busyTimer = 0
      if (!wasOnline) {
        busyTimer = window.setTimeout(() => {
          if (state.status !== 'ok') setStatus('busy', '网络连接中…')
        }, 1000)
      }
      const timeoutFor = (base) => (base === state.lanUrl ? 1600 : 5000)
      const results = await Promise.all(candidates.map((base) => probeBase(base, timeoutFor(base))))
      window.clearTimeout(busyTimer)
      if (gen !== baseGeneration) return false
      const index = results.findIndex(Boolean)
      const chosen = index >= 0 ? candidates[index] : ''
      if (!chosen) {
        const scope = candidates.length > 1 ? '家里和外部都连不上' : mode === 'wan' ? '外部连不上' : '家里连不上'
        setStatus('bad', scope)
        state.wanFirst = true
        baseRetry = window.setTimeout(() => {
          if (!disposed) void chooseBase()
        }, 2000)
        return false
      }
      const previousUrl = state.url
      state.wanFirst = false
      const changed = chosen !== state.url
      state.url = chosen
      const where = chosen === state.lanUrl ? '家里' : '外部'
      setStatus('ok', '已连接 · ' + where)
      // 只有真正发生地址切换时才提示；首次连接、重进页面不提示
      if (changed && previousUrl) toast('已切换到' + where)
      if (changed || force) {
        state.hydrated = false
        store.cursor = 0
        savePrefs()
        applyWatch()
        closeLive()
        if (liveMode === 'sse') void startLive()
        else void hydrate(true)
      }
      updateServerSum()
      return true
    } finally {
      if (gen === baseGeneration) choosing = false
    }
  }

  async function refreshRelay() {
    if (!refs.relay) return
    const enabled = state.notify !== false
    if (refs.relayToggle) refs.relayToggle.checked = enabled
    if (refs.relaySum) refs.relaySum.textContent = enabled ? '已开启 · 横幅' : '已关闭'
    if (!enabled) {
      refs.relay.textContent = '后台提醒：已关闭'
      refs.relay.dataset.tone = 'bad'
      return
    }
    if (!api.watch || typeof api.watch.status !== 'function') {
      refs.relay.textContent = '后台提醒：当前壳不支持'
      refs.relay.dataset.tone = 'bad'
      return
    }
    try {
      const status = await api.watch.status(APP_ID)
      if (!status) {
        refs.relay.textContent = '后台提醒：当前壳不支持'
        refs.relay.dataset.tone = 'bad'
        return
      }
      const parts = [status.running ? '运行中' : '未运行']
      if (status.granted === false) parts.push('通知权限未开')
      refs.relay.textContent = '后台提醒：' + parts.join(' · ')
      refs.relay.dataset.tone = status.running ? 'ok' : 'bad'
    } catch {
      refs.relay.textContent = '后台提醒：读取失败'
      refs.relay.dataset.tone = 'bad'
    }
  }

  function toggleAcc(name) {
    const next = state.openAcc === name ? '' : name
    state.openAcc = next
    if (refs.serverBody) refs.serverBody.hidden = next !== 'server'
    if (refs.relayBody) refs.relayBody.hidden = next !== 'relay'
    if (refs.cacheBody) refs.cacheBody.hidden = next !== 'cache'
    if (refs.resetBody) refs.resetBody.hidden = next !== 'reset'
    if (appEl) {
      for (const section of appEl.querySelectorAll('.chat-acc')) {
        section.dataset.open = section.dataset.acc === next ? '1' : '0'
      }
    }
  }

  function updateServerSum() {
    if (!refs.serverSum) return
    const url = state.url || DEFAULT_URL
    const mode = state.mode || 'auto'
    const where =
      mode === 'wan' ? '手动外部' : mode === 'lan' ? '手动家里' : url === state.lanUrl ? '自动·家里' : '自动·外部'
    refs.serverSum.textContent = url + ' · ' + where
  }

  async function testRelay() {
    if (!api.watch || typeof api.watch.test !== 'function') {
      toast('当前壳不支持测试提醒', 'error')
      return
    }
    try {
      if (typeof api.watch.ensurePermission === 'function') {
        const granted = await api.watch.ensurePermission()
        if (!granted) {
          toast('通知权限没开：去系统设置里允许「像素盒子」发通知后再试', 'error')
          return
        }
      }
      await api.watch.test()
      toast('已发送测试提醒')
    } catch (error) {
      toast('发送失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  function saveSettings() {
    if (!refs.inputToken.value.trim()) {
      toast('访问令牌不能为空，电脑端「设置 → 手机中转」里可以看到', 'error')
      return
    }
    state.lanUrl = normalizeUrl(refs.inputUrl.value) || DEFAULT_URL
    state.wanUrl = refs.inputWan ? normalizeUrl(refs.inputWan.value) : ''
    // 三种连接方式：自动 / 只用家里 / 只用外网
    state.autoPick = state.mode === 'auto'
    state.pick = state.mode === 'wan' ? 'wan' : 'lan'
    state.url =
      state.mode === 'wan' ? state.wanUrl || state.lanUrl : state.lanUrl
    state.token = refs.inputToken.value.trim()
    savePrefs()
    applyWatch()
    state.hydrated = false
    store.cursor = 0
    state.openAcc = ''
    if (refs.serverBody) refs.serverBody.hidden = true
    const server = appEl && appEl.querySelector('[data-acc="server"]')
    if (server) server.dataset.open = '0'
    updateServerSum()
    toast('已保存')
    void chooseBase(true)
  }

  async function copyText(text) {
    try {
      if (api.clipboard && typeof api.clipboard.write === 'function') {
        await api.clipboard.write(text)
        return true
      }
    } catch {
      /* 走浏览器接口 */
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {
      /* 失败 */
    }
    return false
  }

  /* ---------------- 打开外部 ---------------- */

  function openLink(url) {
    if (!url) return
    if (api.openExternal && typeof api.openExternal === 'function') {
      api.openExternal(url).catch(() => toast('打不开链接', 'error'))
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function downloadAttachment(url, name) {
    try {
      if (api.download && typeof api.download === 'function') {
        await api.download(url, name)
      } else {
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = name || ''
        anchor.rel = 'noopener'
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
      }
      toast('已开始下载' + (name ? '：' + name : ''))
    } catch (error) {
      toast('下载失败：' + ((error && error.message) || '未知错误'), 'error')
    }
  }

  /* ---------------- 图片查看器（缩放 / 左右切换） ---------------- */

  function imageSource(img) {
    if (!img) return ''
    return String(img.currentSrc || img.src || img.getAttribute('data-src') || img.getAttribute('data-remote') || '')
  }

  function renderViewer() {
    const state = viewerState
    const src = state.list[state.index] || ''
    if (src) refs.viewerImg.src = src
    refs.viewerImg.style.transform =
      'translate(' + state.x + 'px,' + state.y + 'px) scale(' + state.scale + ')'
    refs.viewer.classList.toggle('is-zoomed', state.scale > 1)
    const many = state.list.length > 1
    if (refs.viewerCount) {
      refs.viewerCount.hidden = !many
      refs.viewerCount.textContent = state.index + 1 + ' / ' + state.list.length
    }
    if (refs.viewerPrev) refs.viewerPrev.hidden = !many
    if (refs.viewerNext) refs.viewerNext.hidden = !many
  }

  function openViewer(src, image) {
    if (!src) return
    // 查看器按容器分组：气泡里只滑这条消息的图，工具卡里只滑这个工具的图
    const scope =
      (image && image.closest('.chat-turn')) ||
      (image && image.closest('.chat-tool')) ||
      (image && image.closest('.chat-card')) ||
      refs.list
    const nodes = scope ? Array.from(scope.querySelectorAll('img.chat-image')) : []
    const list = []
    for (const node of nodes) {
      const value = imageSource(node)
      if (value && !list.includes(value)) list.push(value)
    }
    if (list.length === 0) list.push(src)
    const index = Math.max(0, list.indexOf(src))
    viewerState = { list, index: index >= 0 ? index : 0, scale: 1, x: 0, y: 0 }
    viewerSkipClick = false
    refs.viewer.hidden = false
    renderViewer()
  }

  function closeViewer() {
    refs.viewer.hidden = true
    refs.viewerImg.removeAttribute('src')
    refs.viewerImg.style.transform = ''
    viewerState = { list: [], index: 0, scale: 1, x: 0, y: 0 }
    viewerSkipClick = false
    viewerPointers.clear()
    viewerPinch = null
    lastViewerTapAt = 0
    window.clearTimeout(viewerTapTimer)
    viewerTapTimer = 0
    if (refs.viewer) refs.viewer.classList.remove('is-zoomed')
  }

  function stepViewer(delta) {
    const length = viewerState.list.length
    if (length < 2) return
    viewerState.index = (viewerState.index + delta + length) % length
    viewerState.scale = 1
    viewerState.x = 0
    viewerState.y = 0
    renderViewer()
  }

  function toggleZoom() {
    if (viewerState.scale > 1) {
      viewerState.scale = 1
      viewerState.x = 0
      viewerState.y = 0
    } else {
      viewerState.scale = 2
    }
    renderViewer()
  }

  function onViewerPointerDown(event) {
    if (!refs.viewer || refs.viewer.hidden) return
    // 点在「上一张/下一张」这类按钮上不当作手势
    if (event.target instanceof Element && event.target.closest('[data-action]')) return
    viewerPointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (viewerPointers.size === 2) {
      const [a, b] = [...viewerPointers.values()]
      viewerPinch = {
        distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        scale: viewerState.scale,
      }
      return
    }
    viewerPress = {
      x: event.clientX,
      y: event.clientY,
      at: Date.now(),
      moved: false,
      panX: viewerState.x,
      panY: viewerState.y,
    }
    viewerSkipClick = false
  }

  function onViewerPointerMove(event) {
    if (!viewerPointers.has(event.pointerId)) return
    viewerPointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (viewerPinch && viewerPointers.size === 2) {
      const [a, b] = [...viewerPointers.values()]
      const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1
      viewerState.scale = Math.min(4, Math.max(1, (viewerPinch.scale * distance) / viewerPinch.distance))
      renderViewer()
      viewerSkipClick = true
      return
    }
    if (!viewerPress) return
    const dx = event.clientX - viewerPress.x
    const dy = event.clientY - viewerPress.y
    if (Math.abs(dx) + Math.abs(dy) > 4) viewerPress.moved = true
    if (viewerState.scale > 1) {
      viewerState.x = viewerPress.panX + dx
      viewerState.y = viewerPress.panY + dy
      renderViewer()
      viewerSkipClick = true
    }
  }

  function onViewerPointerUp(event) {
    if (viewerPointers.has(event.pointerId)) viewerPointers.delete(event.pointerId)
    if (viewerPinch && viewerPointers.size < 2) {
      viewerPinch = null
      if (viewerState.scale < 1.05) {
        viewerState.scale = 1
        viewerState.x = 0
        viewerState.y = 0
      }
      renderViewer()
      viewerSkipClick = true
      viewerPress = null
      return
    }
    const press = viewerPress
    viewerPress = null
    if (!press) return
    const dx = event.clientX - press.x
    const dy = event.clientY - press.y
    if (press.moved) {
      if (viewerState.scale <= 1 && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        stepViewer(dx < 0 ? 1 : -1)
        viewerSkipClick = true
        lastViewerTapAt = 0
        return
      }
      if (viewerState.scale <= 1 && dy > 80 && Math.abs(dy) > Math.abs(dx)) {
        closeViewer()
        viewerSkipClick = true
        lastViewerTapAt = 0
        return
      }
      lastViewerTapAt = 0
      return
    }
    // 没移动：第二下就是双击（放大/还原）；单点延迟关闭，给双击留时间
    const now = Date.now()
    if (now - lastViewerTapAt < 300) {
      lastViewerTapAt = 0
      window.clearTimeout(viewerTapTimer)
      viewerTapTimer = 0
      toggleZoom()
      viewerSkipClick = true
      return
    }
    lastViewerTapAt = now
    window.clearTimeout(viewerTapTimer)
    viewerTapTimer = window.setTimeout(() => {
      viewerTapTimer = 0
      closeViewer()
    }, 300)
  }

  /* ---------------- 提示 ---------------- */

  function toast(text, tone) {
    if (!refs.toast) return
    refs.toast.textContent = text
    refs.toast.style.background = tone === 'error' ? 'rgba(150, 62, 50, 0.92)' : 'rgba(30, 40, 48, 0.88)'
    refs.toast.classList.add('is-on')
    window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => {
      refs.toast.classList.remove('is-on')
    }, 2200)
  }

  /* ---------------- 渲染 ---------------- */

  const imageCache = new Map()

  function showImageFallback(image, src, label) {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'chat-image-fallback'
    button.dataset.src = src
    button.textContent = label || '图片打不开'
    image.replaceWith(button)
  }

  function loadChatImages() {
    if (!refs.list) return
    refs.list.querySelectorAll('img.chat-image[data-src]').forEach((image) => {
      if (image.dataset.bound) return
      image.dataset.bound = '1'
      const src = image.getAttribute('data-src')
      if (!src) return
      const cached = imageCache.get(src)
      if (cached) {
        image.src = cached
        return
      }
      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status)
          return res.blob()
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          imageCache.set(src, url)
          image.src = url
        })
        .catch((error) => {
          if (!image.dataset.retried) {
            image.dataset.retried = '1'
            image.dataset.bound = ''
            setTimeout(loadChatImages, 900)
            return
          }
          if (!image.dataset.directTry) {
            image.dataset.directTry = '1'
            image.dataset.bound = ''
            image.src = src
            return
          }
          const button = document.createElement('button')
          button.type = 'button'
          button.className = 'chat-image-fallback'
          button.dataset.src = src
          const tail = String(src || '').split('/').pop()
          button.textContent = '图片打不开 · ' + tail + ' · ' + String((error && error.message) || error || '未知').slice(0, 24)
          image.replaceWith(button)
        })
    })

    // Markdown 里的 http 外链图：CSP 不允许 img-src http，但 connect-src 允许 http，
    // 所以用 fetch 转 blob 再显示（需要对方允许 CORS）
    refs.list.querySelectorAll('img.chat-image[data-remote]').forEach((image) => {
      if (image.dataset.bound) return
      image.dataset.bound = '1'
      const src = image.getAttribute('data-remote')
      if (!src) return
      const cached = imageCache.get(src)
      if (cached) {
        image.src = cached
        return
      }
      fetch(src, { credentials: 'omit', referrerPolicy: 'no-referrer' })
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status)
          return res.blob()
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          imageCache.set(src, url)
          image.src = url
        })
        .catch(() => {
          if (!image.dataset.retried) {
            image.dataset.retried = '1'
            image.dataset.bound = ''
            setTimeout(loadChatImages, 900)
            return
          }
          showImageFallback(image, src, '外链图片打不开 · 点按重试')
        })
    })
  }

  function nearBottom() {
    if (!refs.list) return true
    const list = refs.list
    return list.scrollHeight - list.scrollTop - list.clientHeight < 72
  }

  /** 不在底部时显示「回到底部」 */
  function updateJump() {
    if (!refs.jump || !refs.list) return
    const top = refs.list.scrollTop
    const near = nearBottom()
    const upward = top < state.lastListTop - 2
    state.lastListTop = top
    const userRecent = Date.now() - state.lastUserScroll < 800
    // 只有用户手势后的向上滚才进入阅读；程序化定位/内容长高都不算
    if (upward && userRecent) {
      state.reading = true
      state.holdAnswer = false
    } else if (near) {
      state.reading = false
      state.holdAnswer = false
    }
    refs.jump.hidden = near
    if (near && !state.reading && state.pendingPaint) {
      state.pendingPaint = false
      paintMessages(true)
    }
  }

  /** 会话日志的 seq 才是对话顺序；刚发出、还没有 seq 的消息排在最后 */
  function sortMessages() {
    sortTimeline(state.messages)
  }

  function cardHtmlOf(item) {
    if (item.kind === 'deliverable') {
      return deliverableCardHtml(item, (seq, index, name) =>
        transport.presentedFileUrl(seq, index, name, state.currentSession),
      )
    }
    if (item.kind === 'approval') return approvalCardHtml(item)
    if (item.kind === 'input') {
      return inputCardHtml(item, inputDrafts.get(String(item.callId)) || {}, inputSubmitted.has(String(item.callId)))
    }
    return ''
  }

  function skeletonHtml() {
    return `<div class="chat-skeleton" aria-hidden="true">
      <div class="chat-skeleton-meta"></div>
      <div class="chat-skeleton-bubble is-short"></div>
      <div class="chat-skeleton-meta is-right"></div>
      <div class="chat-skeleton-bubble is-me"></div>
      <div class="chat-skeleton-meta"></div>
      <div class="chat-skeleton-bubble"></div>
      <div class="chat-skeleton-footer"></div>
    </div>`
  }

  /** 工具/交付排到本轮最后一条助手消息之后 */
  function lastTurnHasAssistant(items) {
    let lastUser = -1
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]
      if (item.kind === 'message' && item.message && item.message.who === 'me') lastUser = i
    }
    if (lastUser < 0) return false
    for (let i = lastUser + 1; i < items.length; i += 1) {
      const item = items[i]
      if (item.kind === 'message' && item.message && item.message.who === 'ai') return true
    }
    return false
  }

  function lastTurnNotice(items) {
    let lastUser = -1
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]
      if (item.kind === 'message' && item.message && item.message.who === 'me') lastUser = i
    }
    if (lastUser < 0) return null
    let hasTool = false
    let hasAssistant = false
    let hasError = false
    for (let i = lastUser + 1; i < items.length; i += 1) {
      const item = items[i]
      if (item.kind === 'tool') hasTool = true
      if (item.kind === 'message' && item.message) {
        if (item.message.who === 'ai') hasAssistant = true
        if (item.message.who === 'error') hasError = true
      }
    }
    if (!hasTool || hasAssistant || hasError || state.stopped) return null
    if (state.status === 'bad') {
      return {
        kind: 'offline',
        title: '连接中断',
        text: '电脑端暂时连不上，本轮可能仍在执行。恢复连接后会自动同步。',
      }
    }
    if (state.status === 'ok' && state.hydrated && !state.runActive && !state.running) {
      return {
        kind: 'incomplete',
        title: '本轮未完成',
        text: '电脑端没有返回最终内容，结果未知。',
      }
    }
    return null
  }

  function timelineBlocks(items, extras) {
    if (state.booting && items.length === 0 && !extras.streaming && !extras.typing) {
      return [{ key: 'x:skeleton', html: skeletonHtml() }]
    }
    const blocks = []
    let group = []
    let pre = []
    let post = []
    const push = (list, key, html, extra) => {
      if (html) list.push({ key, html, ...(extra || {}) })
    }
    let lastAssistantInTurn = false
    let turnIsLast = false
    let turnNo = 0
    let lastUserIndex = -1
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].kind === 'message' && items[i].message && items[i].message.who === 'me') lastUserIndex = i
    }
    const totalTurns = Math.max(1, items.filter((item) => item.kind === 'message' && item.message && item.message.who === 'me').length)
    let toolTotal = 0
    let toolRunning = 0
    const flushGroup = () => {
      if (group.length === 0 && toolTotal === 0) return
      const showGroup = turnNo >= totalTurns - 2 && !(state.stopped && turnIsLast)
      const gid = group[0] ? 'group-' + group[0].id : 'group-turn-' + turnNo
      if (showGroup) {
        push(
          post,
          'g:' + turnNo,
          toolGroupHtml(group, expandedToolGroups.has(gid), null, assetUrl, {
            total: toolTotal,
            running: toolRunning,
            activeId: state.toolActiveId,
          }),
          { className: 'chat-tool-footer-block' },
        )
      }
      group = []
      toolTotal = 0
      toolRunning = 0
    }
    const flushTurn = () => {
      flushGroup()
      let groupBlock = post.find((block) => block.key === 'g:' + turnNo)
      const lastBubble = [...pre]
        .reverse()
        .find((block) => block.assistant || block.key === 'x:streaming' || block.key === 'x:typing')
      const bubbleInTurn = lastAssistantInTurn || Boolean(
        pre.some((block) => block.key === 'x:streaming' || block.key === 'x:typing'),
      )
      if (turnIsLast && !state.stopped && state.awaitingReply && bubbleInTurn && lastBubble) {
        if (!groupBlock) {
          groupBlock = {
            key: 'g:' + turnNo,
            html: toolGroupEmptyHtml(),
            className: 'chat-tool-footer-block',
          }
          post.push(groupBlock)
        } else {
          groupBlock.className = 'chat-tool-footer-block'
        }
      }
      if (groupBlock) {
        post = post.filter((block) => block !== groupBlock)
        post.unshift(groupBlock)
      }
      blocks.push(...pre, ...post)
      pre = []
      post = []
      lastAssistantInTurn = false
      turnIsLast = false
      turnNo += 1
    }
    items.forEach((item, index) => {
      if (item.kind === 'message' && item.message.who === 'me') {
        flushTurn()
        turnIsLast = index === lastUserIndex
        const key = item.message.id || item.message.eventId || item.message.seq || `at-${item.message.at}-${index}`
        push(blocks, 'm:' + key, renderMessage(item.message, assetUrl))
        return
      }
      if (item.kind === 'tool') {
        toolTotal += 1
        if (item.status === 'running' || (!item.status && item.done !== true)) toolRunning += 1
        if (item.status === 'ok' || item.status === 'failed') {
          group.push(item)
          return
        }
        // 运行中的工具只由执行气泡显示；不要切断已完成工具的收纳组
        return
      }
      if (item.kind === 'deliverable') {
        push(post, item.kind + ':' + (item.id || index), cardHtmlOf(item))
        return
      }
      if (item.kind === 'message') {
        const key = item.message.id || item.message.eventId || item.message.seq || `at-${item.message.at}-${index}`
        if (item.message.who === 'ai') lastAssistantInTurn = true
        push(pre, 'm:' + key, renderMessage(item.message, assetUrl), {
          assistant: item.message.who === 'ai',
        })
      } else {
        push(pre, item.kind + ':' + (item.id || index), cardHtmlOf(item))
      }
    })
    // 正在输出的临时正文也属于本轮正文，排在工具/交付之前
    if (extras.execution) pre.push({ key: 'x:exec', html: extras.execution })
    flushTurn()
    push(blocks, 'x:tip', extras.tip)
    push(blocks, 'x:projections', extras.projections)
    if (state.stuckPrompt) {
      push(
        blocks,
        'x:stuck',
        `<div class="chat-card chat-stuck">
          <p class="chat-stuck-title">可能卡在电脑端确认</p>
          <p class="chat-stuck-text">超过 5 分钟没有新进展。电脑端可能有确认弹窗，手机看不到；也可能只是工具还在跑。</p>
          <div class="chat-stuck-actions">
            <button type="button" class="chat-stuck-btn" data-action="stuck-wait">继续等待</button>
            <button type="button" class="chat-stuck-btn is-danger" data-action="stuck-skip">处理不了，跳过</button>
          </div>
        </div>`,
      )
    }
    if (state.historyLimitReached) {
      blocks.unshift({
        key: 'x:history-limit',
        html: `<div class="chat-history-limit">只显示最近 ${MAX_HISTORY_TURNS} 轮，更早记录请在电脑端查看</div>`,
      })
    }
    if (extras.localNotice) {
      push(
        blocks,
        'x:local-notice',
        `<div class="chat-local-notice is-${extras.localNotice.kind}" role="status">
          <div class="chat-local-notice-head"><span aria-hidden="true">⚠</span><b>${extras.localNotice.title}</b></div>
          <p>${extras.localNotice.text}</p>
        </div>`,
      )
    }
    return blocks
  }

  function paintToolSheet() {
    if (!appEl) return
    const sheet = appEl.querySelector('[data-role="tool-sheet"]')
    const body = appEl.querySelector('[data-role="tool-sheet-body"]')
    if (!sheet || !body) return
    const card = state.toolDetailId ? store.cards.get(state.toolDetailId) : null
    if (!card) {
      closeToolSheet()
      return
    }
    body.innerHTML = toolDetailHtml(card, assetUrl)
    sheet.hidden = false
    loadChatImages()
  }

  function markActiveTool() {
    if (!refs.list) return
    for (const node of refs.list.querySelectorAll('.chat-tool.is-active')) node.classList.remove('is-active')
    if (!state.toolActiveId) return
    for (const node of refs.list.querySelectorAll('.chat-tool')) {
      if (node.dataset.tool === state.toolActiveId) {
        node.classList.add('is-active')
        break
      }
    }
  }

  function scrollToolRowIntoView() {
    if (!refs.list || !state.toolActiveId) return
    let row = null
    for (const node of refs.list.querySelectorAll('.chat-tool')) {
      if (node.dataset.tool === state.toolActiveId) {
        row = node
        break
      }
    }
    const body = row ? row.closest('.chat-tool-group-body') : null
    if (!row || !body || body.hidden) return
    const bodyRect = body.getBoundingClientRect()
    const rowRect = row.getBoundingClientRect()
    if (rowRect.top < bodyRect.top) body.scrollTop -= bodyRect.top - rowRect.top + 4
    else if (rowRect.bottom > bodyRect.bottom) body.scrollTop += rowRect.bottom - bodyRect.bottom + 4
  }

  function openToolSheet(id) {
    state.toolDetailId = String(id || '')
    state.toolActiveId = state.toolDetailId
    paintToolSheet()
    markActiveTool()
    scrollToolRowIntoView()
  }

  function closeToolSheet() {
    state.toolDetailId = ''
    if (!appEl) return
    const sheet = appEl.querySelector('[data-role="tool-sheet"]')
    if (sheet) sheet.hidden = true
  }

  /** 只更新变化的块；旧消息节点保持不动，滚动不会被整棵重建打断 */
  function reconcileBlocks(blocks) {
    const list = refs.list
    const existing = new Map()
    const nodes = new Map()
    for (const node of Array.from(list.children)) {
      if (node.dataset && node.dataset.block) existing.set(node.dataset.block, node)
      else node.remove()
    }
    let cursor = list.firstChild
    for (const block of blocks) {
      const className = 'chat-block' + (block.className ? ' ' + block.className : '')
      let node = existing.get(block.key)
      if (!node) {
        node = document.createElement('div')
        node.className = className
        node.dataset.block = block.key
        node.innerHTML = block.html
        node.__html = block.html
      } else {
        if (node.className !== className) node.className = className
        if (node.__html !== block.html) {
          const oldBody = node.querySelector('.chat-tool-group-body')
          const scroll = oldBody
            ? {
                top: oldBody.scrollTop,
                atBottom:
                  oldBody.scrollHeight - oldBody.scrollTop - oldBody.clientHeight < 24,
              }
            : null
          node.innerHTML = block.html
          node.__html = block.html
          if (scroll) {
            const nextBody = node.querySelector('.chat-tool-group-body')
            if (nextBody) {
              const applyScroll = () => {
                nextBody.scrollTop = scroll.atBottom ? nextBody.scrollHeight : scroll.top
              }
              applyScroll()
              window.requestAnimationFrame(applyScroll)
            }
          }
        }
      }
      nodes.set(block.key, node)
      if (node === cursor) {
        cursor = cursor.nextSibling
      } else {
        list.insertBefore(node, cursor)
      }
    }
    while (cursor) {
      const next = cursor.nextSibling
      cursor.remove()
      cursor = next
    }
    return nodes
  }

  function projectionHtml() {
    const values = state.projections || {}
    const parts = []
    const todos = Array.isArray(values.todos) ? values.todos : null
    if (todos && todos.length > 0) {
      const done = todos.filter((item) => item.status === 'completed').length
      const items = todos
        .map((item) => {
          const status =
            item.status === 'completed' ? 'is-done' : item.status === 'in_progress' ? 'is-active' : ''
          return `<li class="chat-todo-item ${status}"><span class="chat-todo-mark" aria-hidden="true"></span><span>${escapeHtml(item.content || '')}</span></li>`
        })
        .join('')
      parts.push(
        `<div class="chat-card chat-todo"><div class="chat-card-head"><span class="chat-card-icon" aria-hidden="true">☑</span><span class="chat-card-title">待办</span><span class="chat-card-badge">${done}/${todos.length}</span></div><ul class="chat-todo-list">${items}</ul></div>`,
      )
    }
    const goal = values.goal
    if (goal && goal.goal && goal.goal.objective) {
      const phase = String(goal.goal.phase || 'active')
      const label =
        phase === 'complete'
          ? '已完成'
          : phase === 'paused'
            ? '已暂停'
            : phase === 'blocked'
              ? '受阻'
              : '进行中'
      parts.push(
        `<div class="chat-card chat-goal"><div class="chat-card-head"><span class="chat-card-icon" aria-hidden="true">◎</span><span class="chat-card-title">目标</span><span class="chat-card-badge">${escapeHtml(label)}</span></div><p class="chat-card-text">${escapeHtml(goal.goal.objective)}</p><p class="chat-card-sub">第 ${Number(goal.roundsStarted) || 0} / ${Number(goal.goal.maxGoalRounds) || 0} 轮</p></div>`,
      )
    }
    const plan = values.plan
    if (plan && plan.active) {
      parts.push(`<div class="chat-plan-chip">🧭 计划模式${plan.pending ? ' · 等待批准' : ''}</div>`)
    }
    return parts.join('')
  }

  /** 读历史时冻结重绘；否则合并到下一帧，避免流式 delta 每来一条都重算整条时间线 */
  let mathTimer = 0
  let mathBoard = []
  function pickMathBoard() {
    const pool = [...THINKING_MATH]
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return [
      { text: pool.pop() || '1 + 1 = ?', left: 22 },
      { text: pool.pop() || '2 + 2 = ?', left: 22 },
    ]
  }
  function mathRowsHtml() {
    const rows = [mathBoard.slice(0, 1), mathBoard.slice(1, 2)]
    return rows
      .map(
        (row) =>
          `<div class="chat-math-row">${row
            .map(
              (item) =>
                `<span class="chat-math-item" style="left:${item.left}px">${escapeHtml(item.text)}</span>`,
            )
            .join('')}</div>`,
      )
      .join('')
  }
  function mathBoardHtml() {
    if (!mathBoard.length) mathBoard = pickMathBoard()
    return `<div class="chat-math-board">${mathRowsHtml()}</div>`
  }
  function updateThinkingMath() {
    if (!refs.list) return
    const board = refs.list.querySelector('.chat-math-board')
    if (!board) return
    mathBoard = pickMathBoard()
    board.innerHTML = mathRowsHtml()
  }
  function startThinkingMath() {
    if (!mathBoard.length) mathBoard = pickMathBoard()
    if (mathTimer) return
    mathTimer = window.setInterval(updateThinkingMath, THINKING_MATH_MS)
  }
  function stopThinkingMath() {
    if (!mathTimer) return
    window.clearInterval(mathTimer)
    mathTimer = 0
    mathBoard = []
  }

  function requestPaint(force = false) {
    if (state.reading && !force) {
      state.pendingPaint = true
      return
    }
    if (force) {
      paintMessages(true)
      return
    }
    if (paintFrame) return
    paintFrame = window.requestAnimationFrame(() => {
      paintFrame = 0
      if (!disposed) paintMessages()
    })
  }

  function paintMessages(forceScroll) {
    if (!refs.list) return
    const beforeTop = refs.list ? refs.list.scrollTop : 0
    const beforeHeight = refs.list ? refs.list.scrollHeight : 0
    const stick = nearBottom()
    const keep = !forceScroll && !state.reading && !state.holdAnswer && stick
    const items = store.timeline()
    const runningTool = [...items].reverse().find((item) => item.kind === 'tool' && item.status === 'running')
    const eventAge = state.lastEventAt
      ? Date.now() - state.lastEventAt
      : Number(state.lastEventAge) || 0
    const stale = (state.awaitingReply || state.running || runningTool) && eventAge > RUNNING_STALE_MS
    state.staleShown = stale
    // 工具之间有一小段空档：保留上一条 10 秒，避免跳回「思考中」
    const active =
      state.awaitingReply ||
      state.waiting ||
      state.running ||
      Boolean(state.currentTool && !state.currentTool.done) ||
      Boolean(runningTool)
    const recentTool =
      !state.currentTool && state.lastTool && Date.now() - (state.lastToolAt || 0) < 10000
        ? { ...state.lastTool, done: true }
        : null
    const tool = active ? runningTool || state.currentTool || recentTool : null
    const toolName = tool && tool.name ? String(tool.name) : ''
    const thinking = active && !toolName && !stale
    const toolDetail = tool && (tool.summary || tool.detail) ? String(tool.summary || tool.detail) : ''
    const toolDone = Boolean(tool && tool.status !== 'running' && tool.done)
    const typingLabel = stale
      ? '可能已断开'
      : toolName
        ? toolDone
          ? '执行完成…'
          : '执行中…'
        : '思考中…'
    const typingDetailText = stale
      ? ''
      : toolName
        ? toolName + (toolDetail ? '：' + toolDetail : '')
        : ''
    const mathLine = thinking ? mathBoardHtml() : ''
    const typingDetail = stale ? '' : thinking ? mathLine : `<span class="chat-typing-detail">${escapeHtml(typingDetailText)}</span>`
    // P3 流式：有临时文本就显示流式气泡（带光标），否则显示「思考中/执行中」
    const streamText = state.stream && state.stream.text ? String(state.stream.text) : ''
    const streamReasoning =
      state.stream && state.stream.reasoning ? String(state.stream.reasoning) : ''
    const streamThinkingOnly = Boolean(streamReasoning && !streamText && !stale)
    const streamThinking = streamThinkingOnly
      ? `<span class="chat-typing-head"><span class="chat-typing-text">思考中…</span><span class="chat-typing-dot"></span></span>${mathBoardHtml()}`
      : ''
    const streaming = streamText || streamReasoning
      ? `<div class="chat-turn is-ai"><div class="chat-meta"><span class="chat-avatar">🤖</span><span class="chat-stamp">${fmtClock(Date.now())}</span></div><div class="chat-bubble is-ai is-typing is-streaming${streamThinkingOnly ? ' is-thinking' : ''}">${streamThinking}${streamText ? `<div class="chat-stream-text">${renderMarkdown(streamText)}</div>` : ''}${streamText ? '<span class="chat-typing-dot"></span>' : ''}</div></div>`
      : ''
    const typing = active && !streamText && !streamReasoning
      ? `<div class="chat-turn is-ai"><div class="chat-meta"><span class="chat-avatar">🤖</span><span class="chat-stamp">${fmtClock(Date.now())}</span></div><div class="chat-bubble is-ai is-typing${thinking ? ' is-thinking' : ''}${stale ? ' is-stale' : ''}"><span class="chat-typing-head"><span class="chat-typing-text">${typingLabel}</span><span class="chat-typing-dot"></span></span>${typingDetail}</div></div>`
      : ''
    // 正在输出/执行，且仍允许本轮输出时才显示；最终回复后立即隐藏
    const execution = active && state.runActive && !state.stopped ? streaming || typing : ''
    if (thinking || streamThinkingOnly) startThinkingMath()
    else stopThinkingMath()
    const projections = projectionHtml()
    const localNotice = lastTurnNotice(items)
    const canSend = Boolean(state.url)
    const tip =
      items.length === 0 && !execution && !projections
        ? `<div class="chat-sys">${canSend ? '说点什么吧，电脑端的回复会同步过来' : '先在 ⚙ 里填电脑地址，例如 http://192.168.2.6:8788'}</div>`
        : ''
    const blocks = timelineBlocks(items, {
      tip,
      projections,
      execution,
      localNotice,
    })
    const nodeByKey = reconcileBlocks(blocks)
    let focusedAnswer = false
    if (state.focusLastAssistant) {
      if (!state.reading && stick) {
        const target = [...blocks].reverse().find((block) => block.assistant)
        const node = target ? nodeByKey.get(target.key) : null
        if (node) {
          for (const timer of bottomTimers) window.clearTimeout(timer)
          bottomTimers = []
          const listRect = refs.list.getBoundingClientRect()
          const nodeRect = node.getBoundingClientRect()
          refs.list.scrollTop = Math.max(0, refs.list.scrollTop + nodeRect.top - listRect.top - 8)
          state.lastListTop = refs.list.scrollTop
          state.holdAnswer = !nearBottom()
          focusedAnswer = true
        }
      }
      state.focusLastAssistant = false
    }
    if (!focusedAnswer && !stick) {
      // 最终消息替换流式气泡时补偿高度，保持当前阅读位置
      refs.list.scrollTop = beforeTop + Math.max(0, refs.list.scrollHeight - beforeHeight)
    }
    if ((keep || forceScroll) && !focusedAnswer) {
      for (const timer of bottomTimers) window.clearTimeout(timer)
      bottomTimers = []
      scrollToBottom()
      const pin = () => {
        if (!state.reading && !state.holdAnswer) scrollToBottom()
      }
      requestAnimationFrame(pin)
      bottomTimers.push(window.setTimeout(pin, 260))
      bottomTimers.push(window.setTimeout(pin, 900))
    }
    loadChatImages()
    decorateLongBubbles()
    if (state.toolDetailId) paintToolSheet()
    paintSend()
    updateJump()
  }

  function paintStatus() {
    if (!refs.status) return
    refs.status.dataset.status = state.status
    const label = state.statusText || '连接状态'
    refs.status.title = label
    refs.status.setAttribute('aria-label', label)
    updateServerSum()
    paintNetBar()
  }

  // 输入框上方的网络状态条：不属于对话内容
  function paintNetBar() {
    if (!refs.net) return
    // checking/unset 这类短暂状态不显示，避免一闪而过
    if (state.status !== 'busy' && state.status !== 'bad') {
      refs.net.hidden = true
      refs.net.dataset.tone = ''
      return
    }
    refs.net.hidden = false
    refs.net.dataset.tone = state.status === 'busy' ? 'busy' : 'bad'
    if (refs.netText) {
      refs.netText.textContent =
        state.status === 'busy' ? '网络连接中…' : state.statusText || '连不上，正在重试'
    }
    if (refs.netNote) {
      refs.netNote.hidden = state.status !== 'bad'
      refs.netNote.textContent = /令牌/.test(state.statusText || '')
        ? '请检查令牌配置'
        : '请检查网络、端口或防火墙'
    }
  }

  function setSessionTitle(title) {
    const next = String(title || '').trim()
    if (next === state.sessionTitle) return
    state.sessionTitle = next
    paintTitle()
  }

  function paintTitle() {
    if (!refs.title) return
    const title = state.sessionTitle || '对话'
    refs.title.textContent = title
    refs.title.title = title
    saveUICache()
  }

  function paintSend() {
    if (!refs.send) return
    const stop = hasRunningTool() || (state.runActive && (state.waiting || state.running || state.awaitingReply))
    refs.send.textContent = stop ? '■' : '↑'
    refs.send.classList.toggle('is-stop', stop)
    refs.send.setAttribute('aria-label', stop ? '停止等待' : '发送')
    refs.send.dataset.action = stop ? 'stop' : 'send'
  }

  function scrollToBottom() {
    if (!refs.list) return
    refs.list.scrollTop = refs.list.scrollHeight
  }

  /** 长消息右下角给个「回到本条顶部」按钮 */
  function decorateLongBubbles() {
    if (!refs.list) return
    const limit = Math.max(320, Math.round(window.innerHeight * 0.6))
    for (const bubble of refs.list.querySelectorAll('.chat-bubble')) {
      if (bubble.classList.contains('is-typing')) continue
      const existing = bubble.querySelector('.chat-to-top')
      if (bubble.offsetHeight < limit) {
        if (existing) existing.remove()
        continue
      }
      if (existing) continue
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'chat-to-top'
      button.setAttribute('aria-label', '回到这条消息顶部')
      button.textContent = '↖'
      button.addEventListener('click', (event) => {
        event.stopPropagation()
        const list = refs.list
        const top =
          bubble.getBoundingClientRect().top -
          list.getBoundingClientRect().top +
          list.scrollTop
        list.scrollTo({ top: Math.max(0, top - 8), behavior: 'smooth' })
      })
      bubble.appendChild(button)
    }
  }

  let pinTimers = []

  /** 键盘弹起/收起有动画，一次滚动不够；分几拍滚到底，最后一拍兜底 */
  function pinToBottom() {
    for (const timer of pinTimers) window.clearTimeout(timer)
    pinTimers = []
    scrollToBottom()
    for (const delay of [80, 180, 320, 480]) {
      pinTimers.push(window.setTimeout(scrollToBottom, delay))
    }
  }

  function resizeInput() {
    if (!refs.input) return
    refs.input.style.height = 'auto'
    refs.input.style.height = Math.min(120, refs.input.scrollHeight) + 'px'
  }

  /* ---------------- 键盘 / 安全区 ---------------- */

  function measureHeader() {
    if (!appEl || !refs.top) return
    appEl.style.setProperty('--chat-header-h', Math.round(refs.top.getBoundingClientRect().height) + 'px')
  }

  function applyInsets(insets) {
    if (!insets || !appEl) return
    const previous = state.insets
    state.insets = insets
    appEl.style.setProperty('--chat-top', Math.max(0, Number(insets.top) || 0) + 'px')
    appEl.style.setProperty('--chat-bottom', Math.max(0, Number(insets.bottom) || 0) + 'px')
    appEl.style.setProperty('--chat-ime', Math.max(0, Number(insets.ime) || 0) + 'px')
    measureHeader()
    if ((insets.ime || 0) !== (previous.ime || 0)) {
      window.setTimeout(() => {
        if (insets.ime > 0) {
          if (state.view === 'settings' && focusedField) {
            focusedField.scrollIntoView({ block: 'center', behavior: 'smooth' })
          } else {
            pinToBottom()
          }
        } else {
          pinToBottom()
        }
      }, 60)
    }
  }

  function readInsetsFallback() {
    const styles = getComputedStyle(document.documentElement)
    return {
      top: Number.parseFloat(styles.getPropertyValue('--safe-top')) || 0,
      bottom: Number.parseFloat(styles.getPropertyValue('--safe-bottom')) || 0,
      ime: 0,
    }
  }

  /* ---------------- DOM ---------------- */

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return
    styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    styleEl.textContent = CSS
    document.head.appendChild(styleEl)
  }

  function buildDom() {
    const wrapper = document.createElement('div')
    wrapper.className = 'chat-app'
    wrapper.innerHTML = `
      <div class="chat-main">
        <header class="chat-top">
          <div class="chat-heading">
            <h1 data-role="title">对话</h1>
            <div class="chat-head-sub">
              <span class="chat-status" data-status="unset" data-role="status" aria-label="连接状态"></span>
              <button type="button" class="chat-model" data-role="model-chip" data-action="open-models" hidden></button>
            </div>
          </div>
          <div class="chat-actions">
            <button type="button" class="chat-icon" data-action="close-app" aria-label="关闭应用">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7.5 6.5a7 7 0 1 0 9 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
            <button type="button" class="chat-icon" data-action="switch" aria-label="打开会话菜单">☰</button>
          </div>
        </header>
        <div class="chat-list" data-role="list"></div>
        <div class="chat-load-spinner" data-role="load-spinner" hidden><span></span></div>
        <button type="button" class="chat-jump" data-role="jump" data-action="jump-bottom" aria-label="回到底部" hidden>↓</button>
        <div class="chat-composer">
          <div class="chat-attach" data-role="attach" hidden></div>
          <div class="chat-net" data-role="net" hidden>
            <span class="chat-net-dot" aria-hidden="true"></span>
            <span class="chat-net-text" data-role="net-text"></span>
            <span class="chat-net-note">请检查网络、端口或防火墙</span>
          </div>
          <div class="chat-input-row">
            <button type="button" class="chat-plus" data-action="attach" aria-label="添加图片或文件">＋</button>
            <textarea class="chat-input" data-role="draft" rows="1" placeholder="说点什么…" enterkeyhint="send"></textarea>
            <button type="button" class="chat-send" data-action="send" aria-label="发送">↑</button>
          </div>
          <input class="chat-pick" type="file" data-role="pick" multiple hidden />
        </div>
        <div class="chat-toast" data-role="toast" role="status"></div>
      </div>

      <section class="chat-page" data-role="page" hidden>
        <button type="button" class="chat-back" data-action="back"><span class="chat-back-arrow">‹</span> 返回对话</button>

        <section class="chat-acc" data-acc="server" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="server">
            <span class="chat-acc-title">服务器</span>
            <span class="chat-acc-sum" data-role="server-sum">未配置</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="server-body" hidden>
            <label class="chat-field">
              <span>家里（Wi-Fi）<em class="chat-field-state" data-role="lan-state"></em></span>
              <input data-role="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="http://192.168.2.6:8788" />
            </label>
            <label class="chat-field">
              <span>外部（可选）<em class="chat-field-state" data-role="wan-state"></em></span>
              <input data-role="wan" inputmode="url" autocomplete="off" spellcheck="false" placeholder="http://10.126.126.1:8788" />
            </label>
            <p class="chat-sheet-sub">连接方式</p>
            <div class="chat-chipgroup" data-role="mode-group">
              <button type="button" class="chat-opt" data-action="pick-mode" data-value="auto" data-on="0">自动</button>
              <button type="button" class="chat-opt" data-action="pick-mode" data-value="lan" data-on="0">家里</button>
              <button type="button" class="chat-opt" data-action="pick-mode" data-value="wan" data-on="0">外部</button>
              <button type="button" class="chat-opt is-test" data-action="test" data-on="0">速度测试</button>
            </div>
            <label class="chat-field">
              <span>访问令牌</span>
              <input data-role="token" autocomplete="off" spellcheck="false" placeholder="和电脑端 TOKEN 一致" />
            </label>
            <p class="chat-hint">连接不上时，可能电脑防火墙未放行端口。请检查 Windows 防火墙是否允许 Node.js / DeepSeek Harness。</p>
            <button type="button" class="chat-btn is-primary is-block is-sticky" data-action="save">保存</button>
          </div>
        </section>

        <section class="chat-acc" data-acc="relay" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="relay">
            <span class="chat-acc-title">通知</span>
            <span class="chat-acc-sum" data-role="relay-sum">读取中…</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="relay-body" hidden>
            <label class="chat-toggle">
              <span>开启提醒</span>
              <input type="checkbox" data-role="relay-toggle" />
            </label>
            <div class="chat-chipgroup" data-role="notify-mode">
              <button type="button" class="chat-opt" data-action="pick-notify-mode" data-value="turn" data-on="0">回合结束</button>
              <button type="button" class="chat-opt" data-action="pick-notify-mode" data-value="message" data-on="0">每条消息</button>
            </div>
            <p class="chat-test" data-role="relay">读取中…</p>
            <button type="button" class="chat-btn" data-action="test-relay">发送测试提醒</button>
            <p class="chat-hint">手势返回不会关闭应用，提醒继续；「回合结束」一轮执行完弹一次，「每条消息」助手每说一段就弹。</p>
          </div>
        </section>

        <section class="chat-acc" data-acc="cache" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="cache">
            <span class="chat-acc-title">缓存</span>
            <span class="chat-acc-sum">本地消息缓存</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="cache-body" hidden>
            <p class="chat-hint">清理后消息会重新从电脑端加载；地址和访问令牌保留。</p>
            <button type="button" class="chat-btn is-danger" data-action="clear-cache">清理缓存</button>
          </div>
        </section>

        <section class="chat-acc" data-acc="reset" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="reset">
            <span class="chat-acc-title">恢复初始化</span>
            <span class="chat-acc-sum">删除全部本地数据</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="reset-body" hidden>
            <p class="chat-hint">会删除地址、访问令牌、通知设置和全部缓存，回到首次打开状态。不可恢复。</p>
            <button type="button" class="chat-btn is-danger" data-action="reset-app">恢复初始化</button>
          </div>
        </section>

        <button type="button" class="chat-btn" data-action="open-help">使用说明</button>

        <p class="chat-version" data-role="version"></p>
      </section>

      <div class="chat-scrim" data-role="help" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">使用说明</h2>
          <div class="chat-help">
            <p class="chat-sheet-sub">配对</p>
            <p class="chat-hint">电脑端打开 DSH → 插件 → 「手机中转」，确认端口（默认 8788）和访问令牌。手机在 ⚙ 里填地址：在家填家里地址，在外填外部地址，令牌与电脑一致，点「测试」确认可连接。</p>
            <p class="chat-sheet-sub">地址切换</p>
            <p class="chat-hint">连接方式可选：自动（家里优先、不通再走外部）、家里地址、外部地址。</p>
            <p class="chat-sheet-sub">审批与提问</p>
            <p class="chat-hint">手机上打开这个应用，审批就由手机接管：待审批会作为卡片出现在对话里，点「拒绝 / 允许」即可；电脑端提问也会变成卡片，选好（或自己输入）后点「提交」。手机点 ✕ 关闭应用后，这些交回电脑端；在电脑上也能直接处理。</p>
            <p class="chat-sheet-sub">后台提醒</p>
            <p class="chat-hint">在「通知」里打开后，离开对话也会在助手回复结束时弹通知。</p>
            <p class="chat-sheet-sub">注意事项</p>
            <p class="chat-hint">令牌相当于钥匙，不要外传；电脑的局域网地址变了（重启后可能变），要回来改「家里地址」；同一时间手机只连一个会话；插件重启的瞬间，正在等待的审批会暂时回到电脑原生弹窗。</p>
          </div>
          <button type="button" class="chat-btn" data-action="close-help">关闭</button>
        </div>
      </div>

      <div class="chat-scrim chat-drawer-scrim" data-role="scrim" hidden>
        <aside class="chat-drawer" data-role="drawer">
          <div class="chat-drawer-pane" data-role="drawer-list">
            <div class="chat-drawer-tools">
              <button type="button" class="chat-drawer-tool" data-action="new-session"><span class="chat-drawer-tool-icon">＋</span><span>新建</span></button>
              <button type="button" class="chat-drawer-tool" data-action="toggle-session-search"><span class="chat-drawer-tool-icon is-search">⌕</span><span>搜索</span></button>
              <button type="button" class="chat-drawer-tool" data-action="settings"><span class="chat-drawer-tool-icon">⚙</span><span>设置</span></button>
            </div>
            <input class="chat-sheet-search chat-drawer-search" data-role="session-search" value="" placeholder="搜索对话标题" autocomplete="off" spellcheck="false" hidden />
            <div data-role="sheet-body"></div>
          </div>
          <div class="chat-drawer-pane" data-role="drawer-create" hidden>
            <div class="chat-drawer-head">
              <button type="button" class="chat-icon" data-action="close-new" aria-label="返回">‹</button>
            </div>
            <div class="chat-form" data-role="new-body"></div>
          </div>
        </aside>
      </div>

      <div class="chat-scrim" data-role="session-menu" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">会话操作</h2>
          <button type="button" class="chat-btn" data-action="session-rename">重命名</button>
          <button type="button" class="chat-btn" data-action="session-fork">从这里分支</button>
          <button type="button" class="chat-btn is-danger" data-action="archive-session">归档会话</button>
          <button type="button" class="chat-btn" data-action="close-session-menu">取消</button>
        </div>
      </div>

      <div class="chat-scrim" data-role="rename-scrim" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">重命名对话</h2>
          <input class="chat-sheet-search" data-role="rename-input" placeholder="对话标题" autocomplete="off" spellcheck="false" />
          <button type="button" class="chat-btn is-primary" data-action="confirm-rename">保存</button>
          <button type="button" class="chat-btn" data-action="close-rename">取消</button>
        </div>
      </div>

      <div class="chat-scrim" data-role="archive-scrim" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">归档会话</h2>
          <p class="chat-hint" data-role="archive-text"></p>
          <button type="button" class="chat-btn is-danger" data-action="confirm-archive">归档</button>
          <button type="button" class="chat-btn" data-action="close-archive">取消</button>
        </div>
      </div>

      <div class="chat-scrim" data-role="search-scrim" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">搜索消息</h2>
          <input class="chat-sheet-search" data-role="message-search" placeholder="搜索当前对话" autocomplete="off" spellcheck="false" />
          <div class="chat-search-body" data-role="search-body"></div>
          <button type="button" class="chat-btn" data-action="close-search">关闭</button>
        </div>
      </div>

      <div class="chat-scrim" data-role="model-scrim" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">模型与推理</h2>
          <div class="chat-form" data-role="model-body"></div>
          <button type="button" class="chat-btn is-primary is-block" data-action="apply-model">应用</button>
          <button type="button" class="chat-btn" data-action="close-models">取消</button>
        </div>
      </div>

      <div class="chat-scrim is-center" data-role="confirm" hidden>
        <div class="chat-dialog">
          <h2 class="chat-dialog-title">关闭对话？</h2>
          <p class="chat-dialog-text">点「关闭」会彻底退出对话应用；用手势返回则只是离开页面，应用会继续在后台运行。</p>
          <div class="chat-dialog-actions">
            <button type="button" class="chat-btn" data-action="confirm-cancel">取消</button>
            <button type="button" class="chat-btn is-danger" data-action="confirm-ok">关闭</button>
          </div>
        </div>
      </div>

      <div class="chat-scrim chat-tool-scrim" data-role="tool-sheet" hidden>
        <section class="chat-sheet chat-tool-sheet">
          <div class="chat-tool-sheet-head">
            <h2 class="chat-sheet-title">工具详情</h2>
            <button type="button" class="chat-icon" data-action="close-tool-sheet" aria-label="关闭工具详情">✕</button>
          </div>
          <div class="chat-tool-sheet-body" data-role="tool-sheet-body"></div>
          <button type="button" class="chat-btn" data-action="close-tool-sheet">关闭</button>
        </section>
      </div>

      <div class="chat-viewer" data-role="viewer" hidden>
        <img data-role="viewer-img" alt="图片" />
        <button type="button" class="chat-viewer-nav is-prev" data-action="viewer-prev" aria-label="上一张" hidden>‹</button>
        <button type="button" class="chat-viewer-nav is-next" data-action="viewer-next" aria-label="下一张" hidden>›</button>
        <span class="chat-viewer-count" data-role="viewer-count" hidden></span>
      </div>
    `
    return wrapper
  }

  function cacheRefs() {
    refs = {
      title: appEl.querySelector('[data-role="title"]'),
      status: appEl.querySelector('[data-role="status"]'),
      net: appEl.querySelector('[data-role="net"]'),
      netText: appEl.querySelector('[data-role="net-text"]'),
      netNote: appEl.querySelector('.chat-net-note'),
      list: appEl.querySelector('[data-role="list"]'),
      loadSpinner: appEl.querySelector('[data-role="load-spinner"]'),
      top: appEl.querySelector('.chat-top'),
      jump: appEl.querySelector('[data-role="jump"]'),
      input: appEl.querySelector('[data-role="draft"]'),
      attach: appEl.querySelector('[data-role="attach"]'),
      pick: appEl.querySelector('[data-role="pick"]'),
      send: appEl.querySelector('.chat-send'),
      toast: appEl.querySelector('[data-role="toast"]'),
      page: appEl.querySelector('[data-role="page"]'),
      inputUrl: appEl.querySelector('[data-role="url"]'),
      inputWan: appEl.querySelector('[data-role="wan"]'),
      inputAuto: appEl.querySelector('[data-role="auto"]'),
      modeGroup: appEl.querySelector('[data-role="mode-group"]'),
      inputToken: appEl.querySelector('[data-role="token"]'),
      drawer: appEl.querySelector('[data-role="drawer"]'),
      drawerList: appEl.querySelector('[data-role="drawer-list"]'),
      drawerCreate: appEl.querySelector('[data-role="drawer-create"]'),
      sessionSearch: appEl.querySelector('[data-role="session-search"]'),
      switchBtn: appEl.querySelector('[data-action="switch"]'),
      newBody: appEl.querySelector('[data-role="new-body"]'),
      searchScrim: appEl.querySelector('[data-role="search-scrim"]'),
      searchInput: appEl.querySelector('[data-role="message-search"]'),
      searchBody: appEl.querySelector('[data-role="search-body"]'),
      sessionMenu: appEl.querySelector('[data-role="session-menu"]'),
      renameScrim: appEl.querySelector('[data-role="rename-scrim"]'),
      renameInput: appEl.querySelector('[data-role="rename-input"]'),
      archiveScrim: appEl.querySelector('[data-role="archive-scrim"]'),
      archiveText: appEl.querySelector('[data-role="archive-text"]'),
      modelChip: appEl.querySelector('[data-role="model-chip"]'),
      modelScrim: appEl.querySelector('[data-role="model-scrim"]'),
      modelBody: appEl.querySelector('[data-role="model-body"]'),
      confirmScrim: appEl.querySelector('[data-role="confirm"]'),
      test: appEl.querySelector('[data-role="test"]'),
      lanState: appEl.querySelector('[data-role="lan-state"]'),
      wanState: appEl.querySelector('[data-role="wan-state"]'),
      relay: appEl.querySelector('[data-role="relay"]'),
      relaySum: appEl.querySelector('[data-role="relay-sum"]'),
      relayToggle: appEl.querySelector('[data-role="relay-toggle"]'),
      relayBody: appEl.querySelector('[data-role="relay-body"]'),
    cacheBody: appEl.querySelector('[data-role="cache-body"]'),
    resetBody: appEl.querySelector('[data-role="reset-body"]'),
      notifyMode: appEl.querySelector('[data-role="notify-mode"]'),
      serverSum: appEl.querySelector('[data-role="server-sum"]'),
      serverBody: appEl.querySelector('[data-role="server-body"]'),
      version: appEl.querySelector('[data-role="version"]'),
      helpScrim: appEl.querySelector('[data-role="help"]'),
      scrim: appEl.querySelector('[data-role="scrim"]'),
      sheetBody: appEl.querySelector('[data-role="sheet-body"]'),
      viewer: appEl.querySelector('[data-role="viewer"]'),
      viewerImg: appEl.querySelector('[data-role="viewer-img"]'),
      viewerCount: appEl.querySelector('[data-role="viewer-count"]'),
      viewerPrev: appEl.querySelector('[data-action="viewer-prev"]'),
      viewerNext: appEl.querySelector('[data-action="viewer-next"]'),
    }
    if (refs.input) {
      refs.input.addEventListener('focus', () => {
        appEl.style.setProperty('--chat-bottom', '0px')
      })
    }
    if (refs.viewer) {
      refs.viewer.addEventListener('pointerdown', onViewerPointerDown)
      refs.viewer.addEventListener('pointermove', onViewerPointerMove)
      refs.viewer.addEventListener('pointerup', onViewerPointerUp)
      refs.viewer.addEventListener('pointercancel', onViewerPointerUp)
    }
    if (refs.list) {
      refs.list.addEventListener('scroll', updateJump, { passive: true })
      refs.list.addEventListener('scroll', maybeAutoLoad, { passive: true })
      const markUserScroll = () => {
        state.lastUserScroll = Date.now()
      }
      refs.list.addEventListener('touchmove', markUserScroll, { passive: true })
      refs.list.addEventListener('wheel', markUserScroll, { passive: true })
      refs.list.addEventListener('pointerdown', markUserScroll, { passive: true })
    }
    measureHeader()
  }

  /* ---------------- 事件 ---------------- */

  /* ---------------- 提问卡片（P3） ---------------- */

  function questionDraft(callId) {
    let draft = inputDrafts.get(callId)
    if (!draft) {
      draft = { selected: {}, custom: {} }
      inputDrafts.set(callId, draft)
    }
    return draft
  }

  function pickQuestionOption(button) {
    const callId = String(button.dataset.input || '')
    const qid = String(button.dataset.q || '')
    const value = String(button.dataset.value || '')
    if (!callId || !qid) return
    const draft = questionDraft(callId)
    const current = Array.isArray(draft.selected[qid]) ? draft.selected[qid] : []
    if (button.dataset.multi === '1') {
      draft.selected[qid] = current.includes(value)
        ? current.filter((one) => one !== value)
        : [...current, value]
    } else {
      draft.selected[qid] = [value]
    }
    paintMessages()
  }

  async function submitQuestion(callId) {
    if (!callId || inputSubmitted.has(callId)) return
    const card = store.cards.get('input-' + callId)
    if (!card) return
    const answers = buildInputAnswers(card, inputDrafts.get(callId) || {})
    if (!answers) {
      toast('先把每个问题都答一下', 'error')
      return
    }
    inputSubmitted.add(callId)
    state.lastProgressAt = Date.now()
    paintMessages()
    try {
      await transport.respond(callId, answers, state.currentSession || '')
      toast('已回答')
    } catch (error) {
      inputSubmitted.delete(callId)
      paintMessages()
      toast('提交失败：' + ((error && error.message) || '网络错误'), 'error')
    }
  }

  function handleAction(action, actionEl) {
    if (!action) return
    if (action === 'send') {
      void sendText(state.draft)
    } else if (action === 'stuck-skip') {
      void skipStuck(false)
    } else if (action === 'stuck-wait') {
      state.stuckPrompt = false
      state.lastProgressAt = Date.now()
      paintMessages()
    } else if (action === 'attach') {
      if (refs.pick) refs.pick.click()
    } else if (action === 'stop') {
      stopWaiting()
    } else if (action === 'settings') {
      openSettings()
    } else if (action === 'clear-cache') {
      if (actionEl.dataset.confirm !== '1') {
        actionEl.dataset.confirm = '1'
        actionEl.textContent = '再点一次确认清理'
        window.setTimeout(() => {
          actionEl.dataset.confirm = ''
          actionEl.textContent = '清理缓存'
        }, 3000)
        return
      }
      actionEl.dataset.confirm = ''
      actionEl.textContent = '清理缓存'
      void clearAppCache()
    } else if (action === 'reset-app') {
      if (actionEl.dataset.confirm !== '1') {
        actionEl.dataset.confirm = '1'
        actionEl.textContent = '再点一次确认恢复初始化'
        window.setTimeout(() => {
          actionEl.dataset.confirm = ''
          actionEl.textContent = '恢复初始化'
        }, 3000)
        return
      }
      actionEl.dataset.confirm = ''
      actionEl.textContent = '恢复初始化'
      void resetAppData()
    } else if (action === 'back') {
      backToChat()
    } else if (action === 'switch') {
      if (state.sessionsOpen) closeSessionSheet()
      else void openSessionSheet()
    } else if (action === 'close-app') {
      showConfirm()
    } else if (action === 'confirm-cancel') {
      closeConfirm()
    } else if (action === 'confirm-ok') {
      closeConfirm()
      closeChatApp()
    } else if (action === 'test') {
      void testConnection()
    } else if (action === 'test-relay') {
      void testRelay()
    } else if (action === 'save') {
      saveSettings()
    } else if (action === 'close-sheet') {
      closeSessionSheet()
    } else if (action === 'new-session') {
      void openNewSheet()
    } else if (action === 'close-new') {
      closeNewSheet()
    } else if (action === 'open-help') {
      if (refs.helpScrim) refs.helpScrim.hidden = false
    } else if (action === 'close-help') {
      if (refs.helpScrim) refs.helpScrim.hidden = true
    } else if (action === 'create-session') {
      void createNew()
    } else if (action === 'open-models') {
      void openModelSheet()
    } else if (action === 'close-models') {
      closeModelSheet()
    } else if (action === 'apply-model') {
      void applyModel()
    }
  }

  function onClick(event) {
    const target = event.target
    if (!(target instanceof Element)) return

    if (target.matches('[data-role="tool-sheet"]')) {
      closeToolSheet()
      return
    }

    const actionEl = target.closest('[data-action]')
    if (actionEl) {
      const action = actionEl.dataset.action
      if (action === 'remove-attach') {
        removePending(actionEl.dataset.key || '')
        return
      }
      if (action === 'tool-copy') {
        const id = String(actionEl.dataset.tool || '')
        const kind = String(actionEl.dataset.copy || '')
        const card = id ? store.cards.get(id) : null
        const text = kind === 'args' ? card && card.args : card && card.preview
        if (text && api.clipboard && typeof api.clipboard.write === 'function') {
          api.clipboard
            .write(String(text))
            .then(() => toast('已复制'))
            .catch(() => toast('复制失败', 'error'))
        }
        return
      }
      if (action === 'tool-open') {
        const id = String(actionEl.dataset.tool || '')
        if (id) openToolSheet(id)
        return
      }
      if (action === 'close-tool-sheet') {
        closeToolSheet()
        return
      }
      if (action === 'tool-group-toggle') {
        const gid = String(actionEl.dataset.group || '')
        if (!gid) return
        if (expandedToolGroups.has(gid)) expandedToolGroups.delete(gid)
        else expandedToolGroups.add(gid)
        paintMessages()
        return
      }
      if (action === 'approval-allow' || action === 'approval-deny') {
        const cardId = String(actionEl.dataset.approval || '')
        const id = cardId.startsWith('approval-') ? cardId.slice('approval-'.length) : cardId
        void decideApproval(id, action === 'approval-allow')
        return
      }
      if (action === 'q-pick') {
        pickQuestionOption(actionEl)
        return
      }
      if (action === 'q-submit') {
        void submitQuestion(String(actionEl.dataset.input || ''))
        return
      }
      if (action === 'jump-bottom') {
        scrollToBottom()
        updateJump()
        return
      }
      if (action === 'search-messages') {
        openSearch()
        return
      }
      if (action === 'close-search') {
        closeSearch()
        return
      }
      if (action === 'search-jump') {
        jumpToMessage(String(actionEl.dataset.key || ''))
        return
      }
      if (action === 'viewer-prev') {
        stepViewer(-1)
        return
      }
      if (action === 'viewer-next') {
        stepViewer(1)
        return
      }
      if (action === 'copy-message') {
        const turn = actionEl.closest('.chat-turn')
        const bubble = turn ? turn.querySelector('.chat-bubble') : null
        const text = bubble ? decodeURIComponent(bubble.dataset.copy || '') : ''
        if (text) void copyText(text).then((ok) => toast(ok ? '已复制这条消息' : '复制失败', ok ? '' : 'error'))
        return
      }
      if (action === 'copy-code') {
        const code = decodeURIComponent(actionEl.dataset.code || '')
        if (code) {
          void copyText(code).then((ok) => {
            if (!ok) {
              toast('复制失败', 'error')
              return
            }
            actionEl.textContent = '已复制'
            window.setTimeout(() => {
              actionEl.textContent = '复制'
            }, 1200)
          })
        }
        return
      }
      if (action === 'resend-message') {
        const turn = actionEl.closest('.chat-turn')
        const bubble = turn ? turn.querySelector('.chat-bubble') : null
        const text = bubble ? decodeURIComponent(bubble.dataset.copy || '') : ''
        if (text && refs.input) {
          state.draft = text
          refs.input.value = text
          resizeInput()
          refs.input.focus()
          toast('已放进输入框，可改完再发')
        }
        return
      }
      if (action === 'toggle-acc') {
        toggleAcc(actionEl.dataset.acc || '')
        return
      }
      if (action === 'pick-preset') {
        pickOption('preset', actionEl.dataset.scope || 'settings', actionEl.dataset.value || '')
        return
      }
      if (action === 'pick-permission') {
        state.formPermission = actionEl.dataset.value || ''
        paintNewSheet()
        return
      }
      if (action === 'pick-mode') {
        state.mode = actionEl.dataset.value || 'auto'
        paintModeChips()
        return
      }
      if (action === 'pick-notify-mode') {
        state.notifyMode = actionEl.dataset.value === 'message' ? 'message' : 'turn'
        savePrefs()
        applyWatch()
        paintNotifyMode()
        return
      }
      if (action === 'pick-model' || action === 'pick-effort') {
        pickModelOption(action === 'pick-model' ? 'model' : 'effort', actionEl.dataset.value || '', actionEl.dataset.provider || '', actionEl.dataset.scope || 'model')
        return
      }
      if (action === 'pick-permission-current') {
        state.sessionPermission = String(actionEl.dataset.value || '')
        paintModelSheet()
        return
      }
      if (action === 'session-menu') {
        openSessionMenu(actionEl.dataset.session || '', actionEl.dataset.title || '')
        return
      }
      if (action === 'toggle-session-search') {
        if (!refs.sessionSearch) return
        const show = refs.sessionSearch.hidden
        refs.sessionSearch.hidden = !show
        if (show) {
          refs.sessionSearch.focus()
        } else {
          refs.sessionSearch.value = ''
          state.sessionQuery = ''
          paintSessionList()
        }
        return
      }
      if (action === 'session-rename') {
        openRename()
        return
      }
      if (action === 'session-fork') {
        void applyFork()
        return
      }
      if (action === 'confirm-rename') {
        void applyRename()
        return
      }
      if (action === 'close-session-menu') {
        closeSessionMenu()
        return
      }
      if (action === 'close-rename') {
        closeRename()
        return
      }
      if (action === 'archive-session') {
        openArchive(state.sessionMenuId, state.sessionMenuTitle)
        return
      }
      if (action === 'confirm-archive') {
        void confirmArchive()
        return
      }
      if (action === 'close-archive') {
        closeArchive()
        return
      }
      if (action === 'toggle-archived') {
        state.showArchived = !state.showArchived
        paintSessionList()
        return
      }
      if (action === 'restore-session') {
        void restoreSession(String(actionEl.dataset.session || ''))
        return
      }
      handleAction(action, actionEl)
      return
    }

    const link = target.closest('.chat-link')
    if (link) {
      event.preventDefault()
      openLink(link.dataset.href || link.getAttribute('href') || '')
      return
    }

    const file = target.closest('.chat-file')
    if (file) {
      event.preventDefault()
      if (Date.now() - longPressedAt < 500) return
      void downloadAttachment(file.dataset.fileUrl || '', file.dataset.fileName || '')
      return
    }

    const image = target.closest('.chat-image')
    if (image) {
      if (Date.now() - longPressedAt < 500) return
      openViewer(imageSource(image), image)
      return
    }

    const fallback = target.closest('.chat-image-fallback')
    if (fallback) {
      retryImage(fallback)
      return
    }

    const retry = target.closest('[data-retry]')
    if (retry) {
      event.preventDefault()
      const text = decodeURIComponent(retry.dataset.retry || '')
      const bubble = retry.parentElement ? retry.parentElement.querySelector('.chat-bubble.is-error') : null
      if (bubble && bubble.parentElement) bubble.parentElement.remove()
      else retry.remove()
      void sendText(text, true)
      return
    }

    const session = target.closest('[data-session]')
    if (session) {
      event.preventDefault()
      void switchSession(session.dataset.session || '')
      return
    }

    if (target === refs.scrim) {
      closeSessionSheet()
      return
    }

    if (target === refs.newScrim) {
      closeNewSheet()
      return
    }

    if (target === refs.modelScrim) {
      closeModelSheet()
      return
    }

    if (target === refs.confirmScrim) {
      closeConfirm()
      return
    }

    if (target === refs.archiveScrim) {
      closeArchive()
      return
    }

    if (refs.viewer && !refs.viewer.hidden) {
      if (viewerSkipClick) {
        viewerSkipClick = false
        return
      }
      // 刚点过一下：等第二次点击判断双击，别立刻关
      if (viewerTapTimer) return
      closeViewer()
    }
  }

  function onInput(event) {
    const target = event.target
    // 提问卡片的「自己输入」：只更新草稿，不重绘（避免抢焦点）
    if (target instanceof HTMLInputElement && target.dataset.role === 'q-custom') {
      const callId = String(target.dataset.input || '')
      const qid = String(target.dataset.q || '')
      if (callId && qid) questionDraft(callId).custom[qid] = target.value
      return
    }
    if (target instanceof HTMLInputElement && target.dataset.role === 'session-search') {
      state.sessionQuery = target.value
      paintSessionList()
      return
    }
    if (target instanceof HTMLInputElement && target.dataset.role === 'new-title') {
      state.formTitle = target.value
      return
    }
    if (target instanceof HTMLInputElement && target.dataset.role === 'message-search') {
      state.searchQuery = target.value
      paintSearchResults()
      return
    }
    if (!(target instanceof HTMLTextAreaElement)) return
    state.draft = target.value
    resizeInput()
  }

  function onKeyDown(event) {
    if (!(event.target instanceof HTMLTextAreaElement)) return
    if (event.isComposing) return
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendText(state.draft)
    }
  }

  function onFocusIn(event) {
    const target = event.target
    if (!(target instanceof HTMLElement)) return
    if (target === refs.input) {
      pinToBottom()
      focusedField = null
    } else if (refs.page && refs.page.contains(target)) {
      focusedField = target
    }
  }

  function onFocusOut() {
    focusedField = null
  }

  function cancelPress() {
    if (press && press.timer) window.clearTimeout(press.timer)
    press = null
  }

  function onPointerDown(event) {
    // 交给系统处理长按选择文字；不再自动复制整条
    void event
  }

  function onPointerMove(event) {
    if (!press) return
    if (Math.abs(event.clientX - press.x) > 8 || Math.abs(event.clientY - press.y) > 8) cancelPress()
  }

  function onImageError(event) {
    const target = event.target
    if (!(target instanceof HTMLImageElement) || !target.classList.contains('chat-image')) return
    const src = target.getAttribute('src') || ''
    if (target.dataset.retried !== '1') {
      target.dataset.retried = '1'
      window.setTimeout(() => {
        try {
          const url = new URL(src)
          url.searchParams.set('_r', String(Date.now()))
          target.src = url.toString()
        } catch {
          target.src = src
        }
      }, 900)
      return
    }
    const fallback = document.createElement('button')
    fallback.type = 'button'
    fallback.className = 'chat-image-fallback'
    fallback.dataset.src = target.getAttribute('data-src') || src
    fallback.textContent = '图片打不开 · 点按重试'
    target.replaceWith(fallback)
  }

  function retryImage(fallback) {
    const src = fallback.dataset.src || ''
    const image = document.createElement('img')
    image.className = 'chat-image'
    image.alt = '图片'
    image.dataset.src = src
    try {
      const url = new URL(src)
      url.searchParams.set('_r', String(Date.now()))
      image.src = url.toString()
    } catch {
      image.src = src
    }
    fallback.replaceWith(image)
  }

  /* ---------------- 生命周期 ---------------- */

  function handlePause() {
    flushCacheBatch()
    stopPolling()
    closeLive()
  }

  function handleResume() {
    if (state.view !== 'chat') return
    if (liveMode === 'legacy') startPolling()
    void postPresence(true)
    void chooseBase().then((ok) => {
      if (!ok || disposed) return
      if (liveMode === 'legacy') void hydrate(true)
      else void startLive()
      void checkHealth()
    })
  }

  injectStyle()
  loadPrefs()
  clearLegacyHistory()
  
  loadUICache()
  if (api.watch && typeof api.watch.ensurePermission === 'function') {
    void api.watch.ensurePermission().catch(() => undefined)
  }
  applyWatch()

  appEl = buildDom()
  root.appendChild(appEl)
  cacheRefs()

  appEl.addEventListener('click', onClick)
  appEl.addEventListener('input', onInput)
  appEl.addEventListener('change', onPickChange)
  appEl.addEventListener('keydown', onKeyDown)
  appEl.addEventListener('focusin', onFocusIn)
  appEl.addEventListener('focusout', onFocusOut)
  appEl.addEventListener('pointerdown', onPointerDown)
  appEl.addEventListener('pointermove', onPointerMove)
  appEl.addEventListener('pointerup', cancelPress)
  appEl.addEventListener('pointercancel', cancelPress)
  appEl.addEventListener('error', onImageError, true)
  if (api.ui && typeof api.ui.onInsetsChange === 'function') {
    offInsets = api.ui.onInsetsChange(applyInsets)
  } else {
    applyInsets(readInsetsFallback())
  }
  if (typeof api.on === 'function') {
    offPause = api.on('pause', handlePause)
    offResume = api.on('resume', handleResume)
  }

  paintMessages(true)
  paintPending()
  paintStatus()
  paintTitle()
  paintMeta()

  const bootSession = state.currentSession
  if (bootSession) {
    void eventCache
      .clearOthers(bootSession)
      .catch(() => undefined)
      .then(() => eventCache.get(bootSession))
      .then((events) => {
        if (disposed || store.size > 0) return
        if (events.length) {
          store.replaceEvents(events)
          state.booting = false
          state.hydrated = false
          paintMessages(true)
        }
      })
      .catch(() => undefined)
  } else {
    state.booting = false
    paintMessages(true)
  }
  window.setTimeout(() => {
    if (disposed || !state.booting) return
    state.booting = false
    paintMessages(true)
  }, 2500)
  // 缓存里有模型徽标文字就先顶上，等模型列表加载后自然替换
  if (state.uiChip && refs.modelChip) {
    refs.modelChip.textContent = state.uiChip
    refs.modelChip.hidden = false
  }
  function onBackGesture(event) {
    const toolSheet = appEl ? appEl.querySelector('[data-role="tool-sheet"]') : null
    if (toolSheet && !toolSheet.hidden) {
      closeToolSheet()
      event.detail.handled = true
      return
    }
    if (refs.confirmScrim && !refs.confirmScrim.hidden) {
      closeConfirm()
      event.detail.handled = true
      return
    }
    if (refs.modelScrim && !refs.modelScrim.hidden) {
      closeModelSheet()
      event.detail.handled = true
      return
    }
    if (refs.newScrim && !refs.newScrim.hidden) {
      closeNewSheet()
      event.detail.handled = true
      return
    }
    if (refs.helpScrim && !refs.helpScrim.hidden) {
      refs.helpScrim.hidden = true
      event.detail.handled = true
      return
    }
    if (refs.archiveScrim && !refs.archiveScrim.hidden) {
      closeArchive()
      event.detail.handled = true
      return
    }
    if (refs.searchScrim && !refs.searchScrim.hidden) {
      closeSearch()
      event.detail.handled = true
      return
    }
    if (refs.renameScrim && !refs.renameScrim.hidden) {
      closeRename()
      event.detail.handled = true
      return
    }
    if (refs.sessionMenu && !refs.sessionMenu.hidden) {
      closeSessionMenu()
      event.detail.handled = true
      return
    }
    if (refs.scrim && !refs.scrim.hidden) {
      if (state.drawerMode === 'create') showDrawerPane('list')
      else closeSessionSheet()
      event.detail.handled = true
      return
    }
    if (refs.viewer && !refs.viewer.hidden) {
      closeViewer()
      event.detail.handled = true
      return
    }
    if (refs.page && !refs.page.hidden) {
      backToChat()
      event.detail.handled = true
    }
  }

  // 壳的返回：postMessage 进来，处理后要回 docklet:back-handled，否则壳会关掉应用
  function onShellMessage(event) {
    if (!event || event.source !== window.parent) return
    const data = event.data
    if (!data || data.type !== 'docklet:back') return
    const detail = { handled: false }
    onBackGesture({ detail })
    if (!detail.handled) return
    try {
      window.parent.postMessage({ type: 'docklet:back-handled' }, '*')
    } catch {
      /* 父窗口不可达就算了，壳会自己关 */
    }
  }

  window.addEventListener('message', onShellMessage)
  window.addEventListener('docklet:back', onBackGesture)

  paintSend()
  void chooseBase(true).then((ok) => {
    if (!ok || disposed) {
      // 连不上也先轮询：它会在恢复后自己重试选路
      startPolling()
      return
    }
    void postPresence(true)
    // 优先用 P1 事件流；relay 没有 /snapshot、/events 时 startLive 会退回轮询
    void startLive()
  })
  // 网络可能在不重启应用的情况下切换（Wi-Fi ↔ 流量），定期重新选一次地址
  baseHeartbeat = window.setInterval(() => {
    // 已连接就不打扰，只有异常时才高频重试
    if (!document.hidden && state.status !== 'ok') void chooseBase()
  }, 10000)
  stuckTimer = window.setInterval(checkStuck, STUCK_CHECK_MS)
  statusTimer = window.setInterval(reconcileStatus, 8000)
  // 已连接时低频复查，感知 Wi-Fi 断开
  baseSlowCheck = window.setInterval(() => {
    if (!document.hidden && state.status === 'ok') void chooseBase()
  }, 60000)
  // 系统网络状态变化时立刻重选，不等下一次轮询
  const onNetworkChange = () => {
    if (!disposed) void chooseBase(true)
  }
  window.addEventListener('online', onNetworkChange)
  window.addEventListener('offline', onNetworkChange)

  return function unmount() {
    disposed = true
    flushCacheBatch()
    stopPolling()
    closeLive()
    window.removeEventListener('online', onNetworkChange)
    window.removeEventListener('offline', onNetworkChange)
    window.clearInterval(baseHeartbeat)
    window.clearInterval(baseSlowCheck)
    window.clearInterval(stuckTimer)
    window.clearInterval(statusTimer)
    stopThinkingMath()
    window.clearTimeout(baseRetry)
    cancelPress()
    for (const timer of pinTimers) window.clearTimeout(timer)
    pinTimers = []
    window.clearTimeout(toastTimer)
    if (typeof offInsets === 'function') offInsets()
    if (typeof offPause === 'function') offPause()
    if (typeof offResume === 'function') offResume()
    appEl.removeEventListener('click', onClick)
    appEl.removeEventListener('input', onInput)
    appEl.removeEventListener('change', onPickChange)
    appEl.removeEventListener('keydown', onKeyDown)
    appEl.removeEventListener('focusin', onFocusIn)
    appEl.removeEventListener('focusout', onFocusOut)
    appEl.removeEventListener('pointerdown', onPointerDown)
    appEl.removeEventListener('pointermove', onPointerMove)
    appEl.removeEventListener('pointerup', cancelPress)
    appEl.removeEventListener('pointercancel', cancelPress)
    appEl.removeEventListener('error', onImageError, true)
    window.removeEventListener('message', onShellMessage)
    window.removeEventListener('docklet:back', onBackGesture)
    appEl.remove()
    if (styleEl) styleEl.remove()
    styleEl = null
    appEl = null
    refs = {}
  }
}
