/**
 * relay 客户端（dsh-console P2）
 *
 * 所有和电脑端 phone-relay 的请求都从这里走：URL/令牌由外部 getter 提供，
 * 这样设置页改了地址或令牌不用重建 transport。
 *
 * 两套历史接口：
 *   - P1：GET /snapshot + GET /events（SSE）——优先
 *   - 旧：GET /messages?recent=N / ?since=<id>——relay 没有 P1 接口时退回
 */
import { DEFAULT_URL } from './constants.js'

export function normalizeBase(value) {
  return String(value || '').replace(/\/+$/, '')
}

export function createTransport({ base, token }) {
  const baseUrl = () => normalizeBase(base()) || DEFAULT_URL
  const currentToken = () => String(token() || '').trim()

  function authHeaders(extra) {
    const headers = Object.assign({}, extra || {})
    const value = currentToken()
    if (value) headers.Authorization = 'Bearer ' + value
    return headers
  }

  function authJson() {
    return authHeaders({ 'Content-Type': 'application/json' })
  }

  function resolve(target) {
    const value = String(target || '')
    return /^https?:\/\//.test(value) ? value : baseUrl() + value
  }

  async function fetchWithTimeout(target, options, ms) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), ms || 8000)
    try {
      return await fetch(resolve(target), Object.assign({}, options, { signal: controller.signal }))
    } finally {
      clearTimeout(timer)
    }
  }

  async function fetchJson(target, options, ms) {
    const res = await fetchWithTimeout(target, options, ms)
    if (!res.ok) {
      const info = await res.json().catch(() => ({}))
      const error = new Error((info && info.error) || 'HTTP ' + res.status)
      error.status = res.status
      error.code = (info && info.code) || ''
      throw error
    }
    return res.json()
  }

  function postJson(target, body, ms) {
    return fetchJson(target, { method: 'POST', headers: authJson(), body: JSON.stringify(body || {}) }, ms)
  }

  function assetUrl(kind, id, name) {
    const value = String(id == null ? '' : id).replace(/^file:/, '')
    const path = baseUrl() + '/' + kind + '/' + encodeURIComponent(value)
    const query = []
    const bearer = currentToken()
    if (bearer) query.push('token=' + encodeURIComponent(bearer))
    if (name) query.push('name=' + encodeURIComponent(name))
    return query.length ? path + '?' + query.join('&') : path
  }

  /** P1 事件流地址；EventSource 不能带请求头，令牌只能走 query */
  function eventsUrl(after, session) {
    const params = []
    if (Number.isFinite(Number(after)) && Number(after) > 0) params.push('after=' + encodeURIComponent(after))
    if (session) params.push('session=' + encodeURIComponent(session))
    const bearer = currentToken()
    if (bearer) params.push('token=' + encodeURIComponent(bearer))
    return baseUrl() + '/events' + (params.length ? '?' + params.join('&') : '')
  }

  return {
    baseUrl,
    authHeaders,
    authJson,
    fetchWithTimeout,
    fetchJson,
    assetUrl,
    eventsUrl,

    health: () => fetchJson('/health', { headers: authHeaders() }, 5000),
    messages: ({ since = 0, recent = 5 } = {}) =>
      fetchJson(since > 0 ? '/messages?since=' + since : '/messages?recent=' + recent, { headers: authHeaders() }, 9000),
    send: (body) => postJson('/send', body, 30000),
    sessions: () => fetchJson('/sessions', { headers: authHeaders() }, 10000),
    options: () => fetchJson('/options', { headers: authHeaders() }, 8000),
    target: (id) => postJson('/target', { id }, 20000),
    createSession: (body) => postJson('/new', body, 20000),
    selectModel: (body) => postJson('/model', body, 10000),
    setPermission: (preset) => postJson('/permission', { preset }, 8000),
    renameSession: (id, title) => postJson('/rename', { id, title }, 8000),
    forkSession: (id, atSeq) => postJson('/fork', atSeq ? { id, atSeq } : { id }, 15000),
    archiveSession: (id, stopActivity) =>
      postJson('/session/archive', stopActivity ? { id, stopActivity: true } : { id }, 10000),
    unarchiveSession: (id) => postJson('/session/unarchive', { id }, 8000),
    presentedFileUrl: (seq, index, name, session) => {
      const params = new URLSearchParams({ seq: String(seq), index: String(index) })
      if (session) params.set('session', String(session))
      const bearer = currentToken()
      if (bearer) params.set('token', bearer)
      if (name) params.set('name', String(name))
      return baseUrl() + '/presented/file?' + params.toString()
    },
    workspaceUrl: (path, session) => {
      const params = new URLSearchParams({ path: String(path || '') })
      if (session) params.set('session', String(session))
      const bearer = currentToken()
      if (bearer) params.set('token', bearer)
      return baseUrl() + '/workspace/file?' + params.toString()
    },
    stop: () => postJson('/stop', {}, 8000),
    approvalDecision: (id, allow) => postJson('/approvals', { id, decision: allow ? 'allow' : 'deny' }, 5000),
    respond: (id, answers, session) => postJson('/respond', { id, answers, session }, 8000),
    presence: (phone, input) =>
      postJson('/presence', input === undefined ? { phone: Boolean(phone) } : { phone: Boolean(phone), input: Boolean(input) }, 3000),
    uploadImage: (body) => postJson('/upload-image', body, 60000),
    uploadFile: (body) => postJson('/upload-file', body, 60000),
    snapshot: (session, { turns = 0, before = 0 } = {}) => {
      const params = new URLSearchParams()
      if (session) params.set('session', session)
      if (turns > 0) params.set('turns', String(turns))
      if (before > 0) params.set('before', String(before))
      const query = params.toString()
      return fetchJson('/snapshot' + (query ? '?' + query : ''), { headers: authHeaders() }, 9000)
    },
  }
}
