/**
 * 消息 / 事件存储（dsh-console P2）
 *
 * 两个来源合并进同一条时间线：
 *   - 旧接口 /messages：带数字 id 的「消息」，负责兼容老 relay
 *   - P1 事件：message.user / message.assistant / message.error，按 seq 排序
 *
 * 对外只暴露 `messages` 数组（就地修改，调用方可以长期持有同一个引用）。
 * 排序规则在 timeline.js；历史缓存由 db.js 的 IndexedDB 事件缓存负责。
 */

function textOfEventError(payload) {
  const info = payload || {}
  const code = info.code ? '（' + info.code + (info.status ? ' ' + info.status : '') + '）' : ''
  const detail = info.message ? '：' + info.message : ''
  return (info.hint || '执行失败') + code + detail
}

/** P1 事件 → 消息行；不认识的类型返回 null */
export function messageFromEvent(event) {
  if (!event || !event.type) return null
  const payload = event.payload || {}
  const seq = Number(event.seq)
  const at = Number(event.at) || Date.now()
  const base = {
    who: 'ai',
    text: '',
    at,
    images: [],
    files: [],
    reasoning: '',
  }
  if (Number.isFinite(seq)) base.seq = seq
  if (event.id) base.eventId = String(event.id)

  if (event.type === 'message.user') {
    base.who = 'me'
    base.text = String(payload.text || '')
    base.images = Array.isArray(payload.images) ? payload.images : []
    base.files = Array.isArray(payload.files) ? payload.files : []
  } else if (event.type === 'message.assistant') {
    base.text = String(payload.text || '')
    base.reasoning = String(payload.reasoning || '')
    base.images = Array.isArray(payload.images) ? payload.images : []
    base.files = Array.isArray(payload.files) ? payload.files : []
  } else if (event.type === 'message.error') {
    base.who = 'error'
    base.text = textOfEventError(payload)
  } else {
    return null
  }
  if (!base.text && base.images.length === 0 && base.files.length === 0) return null
  return base
}

export function createStore() {
  const messages = []
  // 时间线上的卡片（工具 / 审批 / 提问），按 id upsert
  const cards = new Map()
  let cursor = 0
  let lastSeq = -1

  function clear() {
    messages.length = 0
    cards.clear()
    cursor = 0
    lastSeq = -1
  }

  /** 工具 / 审批 / 提问事件 → 卡片；不是这几类返回 false */
  function applyCardEvent(event) {
    if (!event || !event.type) return false
    const payload = event.payload || {}
    const seq = Number(event.seq)
    const seqOr = (existing) => (existing ? existing.seq : Number.isFinite(seq) ? seq : 0)
    const at = Number(event.at) || Date.now()

    // 流式工具参数：先建一张临时卡片，等真正的 tool/call 到了再认领位置
    if (event.type === 'tool.update') {
      const callId = String(payload.callId || '')
      if (!callId) return false
      const id = 'tool-' + callId
      const existing = cards.get(id)
      cards.set(id, {
        kind: 'tool',
        id,
        callId,
        name: String(payload.name || (existing ? existing.name : '')),
        summary: String(payload.summary || (existing ? existing.summary : '')),
        args: String(payload.args || (existing ? existing.args : '')),
        status: existing && existing.status !== 'running' ? existing.status : 'running',
        preview: existing ? existing.preview : '',
        error: existing ? existing.error : null,
        images: existing && Array.isArray(existing.images) ? existing.images : [],
        seq:
          existing && existing.provisional !== true
            ? existing.seq
            : Number.MAX_SAFE_INTEGER,
        provisional: true,
        at: existing ? existing.at : at,
      })
      return true
    }

    if (event.type === 'tool.start') {
      const callId = String(payload.callId || '')
      const id = 'tool-' + (callId || event.id)
      const existing = cards.get(id)
      cards.set(id, {
        kind: 'tool',
        id,
        callId,
        name: String(payload.name || (existing ? existing.name : '')),
        summary: String(payload.summary || (existing ? existing.summary : '')),
        args: String(payload.args || (existing ? existing.args : '')),
        status: 'running',
        preview: existing ? existing.preview : '',
        error: existing ? existing.error : null,
        images: existing && Array.isArray(existing.images) ? existing.images : [],
        seq:
          existing && existing.provisional !== true
            ? existing.seq
            : Number.isFinite(seq)
              ? seq
              : existing
                ? existing.seq
                : 0,
        provisional: false,
        at: existing ? existing.at : at,
      })
      noteSeq(seq)
      return true
    }

    if (event.type === 'tool.end') {
      const callId = String(payload.callId || '')
      const id = 'tool-' + (callId || event.id)
      const existing = cards.get(id)
      cards.set(id, {
        kind: 'tool',
        id,
        callId,
        name: existing ? existing.name : '',
        summary: existing ? existing.summary : '',
        args: existing ? existing.args : '',
        status: payload.ok === false ? 'failed' : 'ok',
        preview: String(payload.preview || (existing ? existing.preview : '')),
        error: payload.error || (existing ? existing.error : null),
        images: Array.isArray(payload.images)
          ? payload.images
          : existing && Array.isArray(existing.images)
            ? existing.images
            : [],
        seq: seqOr(existing),
        provisional: false,
        at: existing ? existing.at : at,
      })
      noteSeq(seq)
      return true
    }

    if (event.type === 'deliverable.present') {
      const callId = String(payload.callId || '')
      const files = (Array.isArray(payload.files) ? payload.files : []).filter(
        (file) => file && typeof file.path === 'string' && file.path.trim(),
      )
      if (files.length === 0) return false
      const id = 'deliverable-' + (callId || event.id || seq)
      const existing = cards.get(id)
      cards.set(id, {
        kind: 'deliverable',
        id,
        callId,
        turn: Number(payload.turn) || 0,
        files,
        seq:
          existing && existing.provisional !== true
            ? existing.seq
            : Number.isFinite(seq)
              ? seq
              : existing
                ? existing.seq
                : 0,
        at: existing ? existing.at : at,
      })
      noteSeq(seq)
      return true
    }

    if (event.type === 'approval.request') {
      const approvalId = String(payload.approvalId || '')
      if (!approvalId) return false
      const id = 'approval-' + approvalId
      const existing = cards.get(id)
      cards.set(id, {
        kind: 'approval',
        id,
        approvalId,
        title: String(payload.title || (existing ? existing.title : '')),
        tool: String(payload.tool || (existing ? existing.tool : '')),
        reason: String(payload.reason || ''),
        callId: String(payload.callId || ''),
        decision: '',
        outcome: '',
        seq: seqOr(existing),
        at: existing ? existing.at : at,
      })
      noteSeq(seq)
      return true
    }

    if (event.type === 'approval.result') {
      const approvalId = String(payload.approvalId || '')
      if (!approvalId) return false
      const id = 'approval-' + approvalId
      const existing = cards.get(id)
      cards.set(id, {
        kind: 'approval',
        id,
        approvalId,
        title: existing ? existing.title : '',
        tool: String(payload.tool || (existing ? existing.tool : '')),
        reason: String(payload.reason || (existing ? existing.reason : '')),
        callId: existing ? existing.callId : '',
        decision: payload.decision === 'deny' ? 'deny' : 'allow',
        outcome: String(payload.outcome || ''),
        seq: seqOr(existing),
        at: existing ? existing.at : at,
      })
      noteSeq(seq)
      return true
    }

    if (event.type === 'input.request' || event.type === 'input.result') {
      const callId = String(payload.callId || '')
      if (!callId) return false
      const id = 'input-' + callId
      const existing = cards.get(id)
      const asked = Array.isArray(payload.questions) ? payload.questions : existing ? existing.questions : []
      if (event.type === 'input.request') {
        cards.set(id, {
          kind: 'input',
          id,
          callId,
          questions: asked,
          state: String(payload.state || (existing ? existing.state : 'open')),
          answers: existing ? existing.answers : null,
          seq: seqOr(existing),
          at: existing ? existing.at : at,
        })
      } else {
        cards.set(id, {
          kind: 'input',
          id,
          callId,
          questions: asked,
          state: 'answered',
          answers: Array.isArray(payload.answers) ? payload.answers : [],
          seq: seqOr(existing),
          at: existing ? existing.at : at,
        })
      }
      noteSeq(seq)
      return true
    }

    return false
  }

  function recomputeCursor() {
    cursor = messages.reduce((max, message) => Math.max(max, Number(message && message.id) || 0), 0)
  }

  function noteSeq(seq) {
    const value = Number(seq)
    if (Number.isFinite(value) && value > lastSeq) lastSeq = value
  }

  function replaceMessages(list) {
    const locals = messages.filter((message) => message.local)
    messages.length = 0
    for (const message of list) messages.push(message)
    for (const message of locals) messages.push(message)
    recomputeCursor()
    for (const message of messages) noteSeq(message.seq)
  }

  /** 老接口增量：按数字 id 去重；同一句本地乐观消息落地成服务端消息 */
  function upsertMessage(incoming) {
    if (!incoming) return false
    if (incoming.id) {
      if (incoming.who === 'me') {
        const local = messages.find((message) => message.local && message.text === incoming.text && !message.id)
        if (local) {
          local.id = incoming.id
          local.at = incoming.at || local.at
          if (Number.isFinite(Number(incoming.seq))) local.seq = incoming.seq
          local.local = false
          local.images = incoming.images || []
          local.files = incoming.files || []
          noteSeq(local.seq)
          recomputeCursor()
          return true
        }
      }
      if (messages.some((message) => message.id === incoming.id)) return false
    }
    messages.push(incoming)
    noteSeq(incoming.seq)
    recomputeCursor()
    return true
  }

  /** P1 事件增量：消息按 eventId 去重；工具/审批/提问进卡片；user 消息可以认领本地乐观消息 */
  function upsertEvent(event) {
    const cardChanged = applyCardEvent(event)
    const incoming = messageFromEvent(event)
    if (!incoming) {
      noteSeq(event && event.seq)
      return cardChanged
    }
    if (incoming.eventId && messages.some((message) => message.eventId === incoming.eventId)) {
      noteSeq(incoming.seq)
      return cardChanged
    }
    // 同一 seq + 同一角色 + 同一内容视为重复事件
    if (
      incoming.seq !== undefined &&
      messages.some(
        (message) =>
          message.seq === incoming.seq &&
          message.who === incoming.who &&
          message.text === incoming.text,
      )
    ) {
      noteSeq(incoming.seq)
      return cardChanged
    }
    if (incoming.who === 'me') {
      const local = messages.find((message) => message.local && message.text === incoming.text)
      if (local) {
        local.eventId = incoming.eventId
        local.at = incoming.at || local.at
        local.seq = incoming.seq
        local.local = false
        local.images = incoming.images
        local.files = incoming.files
        noteSeq(incoming.seq)
        return true
      }
    }
    // 同一 seq 的 user/assistant 不会被认成重复；同 seq 的 error 保留一次
    if (incoming.seq !== undefined && incoming.who === 'error') {
      if (messages.some((message) => message.seq === incoming.seq && message.who === 'error')) {
        noteSeq(incoming.seq)
        return cardChanged
      }
    }
    messages.push(incoming)
    noteSeq(incoming.seq)
    return true
  }

  /** 快照：用事件窗口整体替换（保留本地未确认消息） */
  function replaceEvents(events) {
    const locals = messages.filter((message) => message.local)
    messages.length = 0
    cards.clear()
    lastSeq = -1
    for (const message of locals) messages.push(message)
    let changed = locals.length > 0
    for (const event of [...(events || [])].sort((left, right) => Number(left.seq) - Number(right.seq))) {
      if (upsertEvent(event)) changed = true
    }
    return changed
  }

  /** 时间线：消息 + 卡片按 seq 排在一起 */
  function timeline() {
    const items = []
    for (const message of messages) {
      items.push({ kind: 'message', message, seq: Number(message.seq) })
    }
    for (const card of cards.values()) items.push(card)
    items.sort((left, right) => {
      const leftSeq = Number.isFinite(Number(left.seq)) ? Number(left.seq) : Number.MAX_SAFE_INTEGER
      const rightSeq = Number.isFinite(Number(right.seq)) ? Number(right.seq) : Number.MAX_SAFE_INTEGER
      return leftSeq - rightSeq
    })
    return items
  }

  return {
    messages,
    cards,
    timeline,
    get cursor() {
      return cursor
    },
    set cursor(value) {
      cursor = Number(value) || 0
    },
    get lastSeq() {
      return lastSeq
    },
    get size() {
      return messages.length
    },
    clear,
    replaceMessages,
    upsertMessage,
    upsertEvent,
    replaceEvents,
  }
}
