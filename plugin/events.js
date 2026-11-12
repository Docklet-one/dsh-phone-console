/**
 * 手机中转的事件层（dsh-console P1 协议）
 *
 * 这个文件只做纯逻辑，不 import DSH / cordis，方便单独单测（events.test.mjs）：
 *
 *   mapSessionEvents(event, hooks)  把 DSH 会话事件映射成手机端统一事件
 *   EventLog                        每个会话一个有序事件环（upsert + seq 排序 + 上限）
 *   EventStreams                    SSE 订阅/广播
 *   sseData / sseComment            SSE 帧
 *
 * 事件模型（见 docs/apps/dsh-console/protocol.md）：
 *   { id, seq, type, at, status?, payload }
 *   - seq 是唯一顺序依据（DSH 会话日志序号）
 *   - 同一 id 后到的覆盖先到的（approval.request → approval.result、input.request → input.result）
 */

/** 每个会话在内存 / 磁盘里保留的事件条数 */
export const EVENT_LIMIT = 200
/** /snapshot 返回的事件窗口 */
export const SNAPSHOT_LIMIT = 200
/** /events 一次补发的上限，超出时只补最近的，并标记 truncated */
export const REPLAY_LIMIT = 400
/** SSE 心跳间隔 */
export const SSE_PING_MS = 15000
/** 提问工具的清单名 */
export const QUESTION_TOOL = 'ask_user_question'

const TOOL_ARG_KEYS = ['command', 'cmd', 'path', 'file_path', 'pattern', 'query', 'url', 'target', 'description']

export function toNumber(value) {
  if (value === null || value === undefined || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export function truncate(text, max) {
  const value = String(text || '')
  return value.length > max ? value.slice(0, max - 1) + '…' : value
}

/** 工具调用的单行摘要（给手机上的折叠条 / 审批卡片看） */
export function summarizeToolArgs(rawArgs) {
  const text = String(rawArgs || '')
  let args = null
  try {
    args = JSON.parse(text)
  } catch {
    args = null
  }
  if (!args || typeof args !== 'object') return ''
  for (const key of TOOL_ARG_KEYS) {
    const value = args[key]
    if (typeof value === 'string' && value.trim()) {
      const oneLine = value.replace(/\s+/g, ' ').trim()
      return oneLine.length > 80 ? oneLine.slice(0, 80) + '…' : oneLine
    }
  }
  return ''
}

export function textOfMessage(message) {
  const blocks = message?.content || []
  return blocks
    .filter((block) => block && block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim()
}

export function imagesOf(message) {
  const blocks = message?.content || []
  return blocks.filter((block) => block && block.type === 'image' && block.attachment).map((block) => block.attachment)
}

export function filesOf(message) {
  const blocks = message?.content || []
  return blocks.filter((block) => block && block.type === 'file' && block.attachment).map((block) => block.attachment)
}

export function reasoningOf(message) {
  const blocks = message?.content || []
  return blocks
    .filter((block) => block && block.type === 'reasoning' && typeof block.text === 'string')
    .map((block) => block.text)
    .join('\n')
    .trim()
}

export function textOfContent(content) {
  const blocks = Array.isArray(content) ? content : []
  for (const block of blocks) {
    if (block && block.type === 'text' && typeof block.text === 'string') return block.text
  }
  return ''
}

function parseJsonText(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

/** 提问（ask_user_question）的规范化字段，工具参数和投影两种形状都收 */
export function normalizeQuestions(list) {
  const source = Array.isArray(list) ? list : []
  const result = []
  for (const item of source) {
    if (!item || typeof item !== 'object') continue
    const id = String(item.id || '')
    if (!id) continue
    const question = {
      id,
      question: String(item.question || ''),
    }
    if (item.detail) question.detail = String(item.detail)
    if (item.header) question.header = String(item.header)
    if (Array.isArray(item.options)) {
      question.options = item.options
        .filter((option) => option && typeof option === 'object')
        .map((option) => {
          const one = { label: String(option.label || '') }
          if (option.description) one.description = String(option.description)
          return one
        })
    }
    if (item.multiSelect === true || item.multi_select === true) question.multiSelect = true
    result.push(question)
  }
  return result
}

/** 从 tool/call 的原始 arguments 里读提问；读不到返回 null */
export function questionsFromArgs(rawArgs) {
  const parsed = parseJsonText(String(rawArgs || ''))
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.questions)) return null
  const questions = normalizeQuestions(parsed.questions)
  return questions.length ? questions : null
}

/** 答案批：统一成 [{ id, selected: string[], custom? }] */
export function normalizeAnswers(list) {
  const source = Array.isArray(list) ? list : []
  const result = []
  for (const item of source) {
    if (!item || typeof item !== 'object') continue
    const id = String(item.id || '')
    if (!id) continue
    const answer = { id, selected: Array.isArray(item.selected) ? item.selected.map((one) => String(one)) : [] }
    if (item.custom !== undefined && item.custom !== null && String(item.custom) !== '') answer.custom = String(item.custom)
    result.push(answer)
  }
  return result
}

/** turn/end 的失败原因 → 手机上能看懂的短句（和旧 /messages 的红气泡同一套文案） */
export function describeFailure(error) {
  const failure = error || {}
  const code = String(failure.code || '')
  const status = Number(failure.status) || 0
  const raw = String(failure.message || '').replace(/\s+/g, ' ').trim()
  let hint = '执行失败'
  if (code === 'ACCOUNT_QUOTA' || status === 402) hint = '额度用完了，充值后再试'
  else if (code === 'MALFORMED_RESPONSE') hint = '模型返回格式异常，重发一次通常就好'
  else if (status === 401) hint = '密钥无效或过期'
  else if (status === 429) hint = '请求太频繁，被限流了'
  else if (status === 500 || status === 502 || status === 503) hint = '模型服务暂时不可用'
  else if (/timeout|timed out/i.test(raw)) hint = '请求超时'
  return {
    code,
    status,
    hint,
    retryable: code !== 'ACCOUNT_QUOTA' && status !== 401,
    message: truncate(raw, 120),
  }
}

export function normalizeUsage(raw) {
  if (!raw || typeof raw !== 'object') return null
  const read = (value) => {
    const number = Number(value)
    return Number.isFinite(number) && number >= 0 ? number : 0
  }
  const usage = {
    inputTokens: read(raw.inputTokens),
    outputTokens: read(raw.outputTokens),
  }
  const total = read(raw.totalTokens) || usage.inputTokens + usage.outputTokens
  if (total > 0) usage.totalTokens = total
  for (const key of ['cacheReadTokens', 'cacheWriteTokens', 'reasoningTokens']) {
    if (raw[key] !== undefined) usage[key] = read(raw[key])
  }
  return usage.totalTokens || usage.inputTokens || usage.outputTokens ? usage : null
}

/** 从 assistant/message 的 stream 里找最后一次 usage（assistant/attempt 同理） */
export function usageOfStream(stream) {
  if (!Array.isArray(stream)) return null
  let usage = null
  for (const record of stream) {
    if (!record || typeof record !== 'object') continue
    const chunk = record.type === 'usage' ? record : record.chunk
    if (chunk && chunk.type === 'usage') {
      usage = normalizeUsage(chunk.usage || chunk) || usage
    }
  }
  return usage
}

function messagePayload(message, hooks) {
  const text = textOfMessage(message)
  const refs = imagesOf(message).map((ref) => {
    const local = typeof hooks.materializeImage === 'function' ? hooks.materializeImage(ref) : null
    return local || { id: ref.attachmentId, width: ref.width, height: ref.height }
  })
  const fileRefs = filesOf(message).map((ref) => ({
    id: ref.attachmentId,
    name: ref.name || '文件',
    size: Number(ref.bytes) || 0,
  }))
  if (!text && refs.length === 0 && fileRefs.length === 0) return null
  const reasoning = reasoningOf(message)
  const payload = { text }
  if (reasoning) payload.reasoning = reasoning
  if (refs.length) payload.images = refs
  if (fileRefs.length) payload.files = fileRefs
  return payload
}

function baseEvent(id, seq, type, at, payload, status) {
  const event = { id, seq, type, at, payload }
  if (status) event.status = status
  return event
}

/**
 * 一条 DSH 会话事件 → 手机端事件数组（0–2 条）。
 *
 * hooks:
 *   materializeImage(ref) → { id, width, height } | null   把附件复制成可下载的文件名
 *   questions: Map<callId, questions>                       提问请求/结果配对用
 *   approvals: Map<approvalId, payload>                     审批请求/结果配对用
 */
export function mapSessionEvents(event, hooks = {}) {
  const seq = toNumber(event && event.seq)
  if (seq === null) return []
  const at = toNumber(event.time) || Date.now()
  const type = String((event && event.type) || '')
  const data = (event && event.data) || {}
  const recordId = (suffix = '') => `s${seq}${suffix}`
  const questions = hooks.questions instanceof Map ? hooks.questions : null
  const approvals = hooks.approvals instanceof Map ? hooks.approvals : null

  switch (type) {
    case 'user/message': {
      const source = data.source || {}
      // 手机回答提问后，DSH 会把答案作为一条 user 消息塞回来
      if (source.kind === 'user-question-reply') {
        const callId = String(source.callId || '')
        const parsed = parseJsonText(textOfContent(data.content))
        if (!callId || !parsed || !Array.isArray(parsed.answers)) return []
        const known = questions ? questions.get(callId) : null
        if (questions) questions.delete(callId)
        const payload = { callId, answers: normalizeAnswers(parsed.answers) }
        if (known) payload.questions = known
        return [baseEvent(`input-${callId}`, seq, 'input.result', at, payload, 'ok')]
      }
      // 只认「人」自己发的消息；系统提示、子 agent 消息不上手机
      if (source.kind !== 'user') return []
      const payload = messagePayload(data, hooks)
      if (!payload) return []
      return [baseEvent(recordId(), seq, 'message.user', at, payload, 'ok')]
    }

    case 'assistant/message': {
      const payload = messagePayload(data.message, hooks)
      if (!payload) return []
      if (typeof hooks.rewriteImages === 'function') {
        payload.text = hooks.rewriteImages(payload.text)
      }
      const usage = normalizeUsage(data.usage) || usageOfStream(data.stream)
      if (usage) payload.usage = usage
      if (data.interrupted === true) payload.interrupted = true
      return [baseEvent(recordId(), seq, 'message.assistant', at, payload, 'ok')]
    }

    case 'turn/start':
      return [baseEvent(recordId(), seq, 'turn.start', at, { turn: toNumber(data.turn) || 0 }, 'ok')]

    case 'turn/end': {
      const reason = data.reason || {}
      const kind = String(reason.kind || 'completed')
      const list = [
        baseEvent(recordId(), seq, 'turn.end', at, { turn: toNumber(data.turn) || 0, reason: { kind } }, kind === 'error' ? 'failed' : 'ok'),
      ]
      if (kind === 'error') {
        list.push(baseEvent(recordId(':error'), seq, 'message.error', at, describeFailure(reason.error), 'failed'))
      }
      return list
    }

    case 'tool/call': {
      const callId = String(data.callId || '')
      const name = String(data.name || '')
      // 提问工具不显示成工具卡片，改成输入卡片
      if (name === QUESTION_TOOL) {
        const list = questionsFromArgs(data.arguments)
        if (list) {
          if (questions) questions.set(callId, list)
          return [baseEvent(`input-${callId}`, seq, 'input.request', at, { callId, questions: list, state: 'open' }, 'pending')]
        }
      }
      return [
        baseEvent(
          recordId(),
          seq,
          'tool.start',
          at,
          {
            callId,
            name,
            summary: summarizeToolArgs(data.arguments),
            args: truncate(String(data.arguments || ''), 2000),
          },
          'ok',
        ),
      ]
    }

    case 'tool/result': {
      const callId = String(data.callId || (data.message && data.message.toolCallId) || '')
      const parsed = parseJsonText(textOfContent(data.message && data.message.content))
      if (callId && questions && questions.has(callId)) {
        const known = questions.get(callId)
        // 超时后工具先返回 pending，提问仍然可以被回答（continued）
        if (parsed && parsed.pending === true) {
          return [
            baseEvent(`input-${callId}`, seq, 'input.request', at, { callId, questions: known, state: 'continued', pending: true }, 'pending'),
          ]
        }
        if (parsed && Array.isArray(parsed.answers)) {
          questions.delete(callId)
          return [baseEvent(`input-${callId}`, seq, 'input.result', at, { callId, answers: normalizeAnswers(parsed.answers), questions: known }, 'ok')]
        }
        questions.delete(callId)
        return []
      }
      const payload = { callId, ok: !data.error }
      if (data.error) {
        payload.error = {
          name: String(data.error.name || ''),
          code: String(data.error.code || ''),
          reason: String(data.error.reason || ''),
        }
      }
      const preview = truncate(String(textOfContent(data.message && data.message.content)).replace(/\s+/g, ' ').trim(), 300)
      if (preview) payload.preview = preview
      const images = imagesOf(data.message)
      if (images.length > 0) payload.images = images
      return [baseEvent(recordId(), seq, 'tool.end', at, payload, data.error ? 'failed' : 'ok')]
    }

    case 'approval/asked': {
      const approvalId = String(data.id || '')
      if (!approvalId) return []
      const payload = {
        approvalId,
        title: `允许执行 ${String(data.toolName || '工具')}？`,
        tool: String(data.toolName || ''),
        reason: String(data.reason || ''),
        callId: String(data.callId || ''),
      }
      if (approvals) approvals.set(approvalId, payload)
      return [baseEvent(`approval-${approvalId}`, seq, 'approval.request', at, payload, 'pending')]
    }

    case 'approval/decided': {
      const approvalId = String(data.id || '')
      if (!approvalId) return []
      const known = approvals ? approvals.get(approvalId) : null
      if (approvals) approvals.delete(approvalId)
      const outcome = String(data.outcome || '')
      const payload = {
        approvalId,
        decision: outcome === 'allowed-once' ? 'allow' : 'deny',
        outcome,
      }
      if (known && known.tool) payload.tool = known.tool
      if (known && known.reason) payload.reason = known.reason
      return [
        baseEvent(`approval-${approvalId}`, seq, 'approval.result', at, payload, outcome === 'allowed-once' ? 'ok' : 'failed'),
      ]
    }

    case 'deliverables/presented': {
      const files = (Array.isArray(data.files) ? data.files : [])
        .filter((file) => file && typeof file.path === 'string' && file.path.trim())
        .map((file) => ({
          path: file.path,
          description: typeof file.description === 'string' ? file.description : '',
        }))
      if (files.length === 0) return []
      return [
        baseEvent(
          recordId(),
          seq,
          'deliverable.present',
          at,
          { turn: toNumber(data.turn) || 0, callId: String(data.callId || ''), files },
          'ok',
        ),
      ]
    }

    case 'session/title': {
      const title = typeof data.title === 'string' ? data.title : ''
      if (!title) return []
      return [baseEvent(recordId(), seq, 'session.meta', at, { title }, 'ok')]
    }

    case 'model/selection': {
      return [
        baseEvent(
          recordId(),
          seq,
          'session.meta',
          at,
          {
            model: {
              provider: String(data.provider || ''),
              model: String(data.model || ''),
              reasoningEffort: data.reasoningEffort ? String(data.reasoningEffort) : '',
            },
          },
          'ok',
        ),
      ]
    }

    case 'permission/preset': {
      return [baseEvent(recordId(), seq, 'session.meta', at, { permission: String(data.preset || data.permission || '') }, 'ok')]
    }

    default:
      return []
  }
}

/**
 * 一个会话的有序事件环。
 * - upsert：同 id 覆盖（保持原位置，不因晚到插队）
 * - 按 seq 排序；超上限从最旧的删
 */
export class EventLog {
  constructor(limit = EVENT_LIMIT) {
    this.limit = Math.max(1, Math.round(Number(limit) || EVENT_LIMIT))
    this.items = []
    this.index = new Map()
    this.firstSeq = -1
    this.cursor = -1
  }

  get size() {
    return this.items.length
  }

  reindex() {
    this.index.clear()
    this.items.forEach((event, position) => this.index.set(event.id, position))
    this.firstSeq = this.items.length ? toNumber(this.items[0].seq) ?? -1 : -1
    this.cursor = this.items.reduce((max, event) => Math.max(max, toNumber(event.seq) ?? -1), -1)
  }

  /** @returns {boolean} 是否发生变化 */
  upsert(event) {
    if (!event || typeof event.id !== 'string' || !event.id) return false
    const seq = toNumber(event.seq)
    if (seq === null) return false
    const position = this.index.get(event.id)
    if (position !== undefined) {
      this.items[position] = event
      this.cursor = Math.max(this.cursor, seq)
      return true
    }
    // 新事件排在 seq 有序的位置；seq 相同则按到达顺序排在后面
    let at = this.items.length
    while (at > 0 && (toNumber(this.items[at - 1].seq) ?? -1) > seq) at -= 1
    this.items.splice(at, 0, event)
    this.reindex()
    while (this.items.length > this.limit) {
      const removed = this.items.shift()
      this.index.delete(removed.id)
    }
    this.reindex()
    return true
  }

  hydrate(text) {
    const lines = String(text || '').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      try {
        this.upsert(JSON.parse(trimmed))
      } catch {
        /* 坏行跳过 */
      }
    }
    return this
  }

  serialize() {
    return this.items.map((event) => JSON.stringify(event)).join('\n')
  }

  all() {
    return this.items.slice()
  }

  after(seq) {
    const floor = toNumber(seq)
    if (floor === null) return this.all()
    return this.items.filter((event) => (toNumber(event.seq) ?? -1) > floor)
  }

  clear() {
    this.items = []
    this.index.clear()
    this.firstSeq = -1
    this.cursor = -1
  }
}

/** SSE 订阅表：sessionId → Set<(event) => void> */
export class EventStreams {
  constructor() {
    this.listeners = new Map()
  }

  subscribe(sessionId, listener) {
    const key = String(sessionId || '')
    if (!this.listeners.has(key)) this.listeners.set(key, new Set())
    this.listeners.get(key).add(listener)
    return () => {
      const set = this.listeners.get(key)
      if (!set) return
      set.delete(listener)
      if (set.size === 0) this.listeners.delete(key)
    }
  }

  publish(sessionId, event) {
    const set = this.listeners.get(String(sessionId || ''))
    if (!set) return 0
    let count = 0
    for (const listener of [...set]) {
      try {
        listener(event)
        count += 1
      } catch {
        set.delete(listener)
      }
    }
    return count
  }

  count(sessionId) {
    const set = this.listeners.get(String(sessionId || ''))
    return set ? set.size : 0
  }

  closeAll() {
    this.listeners.clear()
  }
}

export function sseData(event) {
  return 'data: ' + JSON.stringify(event) + '\n\n'
}

export function sseComment(text) {
  return ': ' + String(text || '').replace(/\n/g, ' ') + '\n\n'
}
