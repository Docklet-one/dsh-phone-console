import { describe, expect, it } from 'vitest'
import { createStore, messageFromEvent } from './store.js'

function userEvent(seq, text, extra = {}) {
  return { id: 's' + seq, seq, type: 'message.user', at: seq * 1000, payload: { text, ...extra } }
}

function assistantEvent(seq, text, extra = {}) {
  return { id: 's' + seq, seq, type: 'message.assistant', at: seq * 1000, payload: { text, ...extra } }
}

function makeStore() {
  return { store: createStore() }
}

describe('messageFromEvent', () => {
  it('maps user and assistant events', () => {
    expect(messageFromEvent(userEvent(3, '你好'))).toMatchObject({
      who: 'me',
      text: '你好',
      seq: 3,
      eventId: 's3',
    })
    expect(messageFromEvent(assistantEvent(4, '收到', { images: [{ id: 'file:a.png' }] }))).toMatchObject({
      who: 'ai',
      seq: 4,
      images: [{ id: 'file:a.png' }],
    })
  })

  it('maps error events with code and hint', () => {
    const message = messageFromEvent({
      id: 's9:error',
      seq: 9,
      type: 'message.error',
      at: 1,
      payload: { hint: '额度用完了', code: 'ACCOUNT_QUOTA', status: 402, message: 'no money' },
    })
    expect(message.who).toBe('error')
    expect(message.text).toContain('额度用完了')
    expect(message.text).toContain('ACCOUNT_QUOTA 402')
  })

  it('ignores unknown types and empty messages', () => {
    expect(messageFromEvent({ id: 's1', seq: 1, type: 'tool.start', payload: {} })).toBeNull()
    expect(messageFromEvent(assistantEvent(2, '', {}))).toBeNull()
  })
})

describe('createStore', () => {
  it('replaces history from a snapshot and keeps seq order', () => {
    const { store } = makeStore()
    store.replaceEvents([assistantEvent(4, '四'), userEvent(3, '三'), assistantEvent(5, '五')])
    expect(store.messages.map((message) => message.text)).toEqual(['三', '四', '五'])
    expect(store.lastSeq).toBe(5)
  })

  it('dedupes the same event id', () => {
    const { store } = makeStore()
    store.replaceEvents([userEvent(3, '你好')])
    expect(store.upsertEvent(userEvent(3, '你好'))).toBe(false)
    expect(store.messages).toHaveLength(1)
  })

  it('lets a server event claim the local optimistic message', () => {
    const { store } = makeStore()
    store.replaceEvents([assistantEvent(2, '在的')])
    store.messages.push({ who: 'me', text: '自测消息', at: 3000, seq: 2.5, local: true, images: [], files: [] })
    expect(store.upsertEvent(userEvent(3, '自测消息'))).toBe(true)
    expect(store.messages.filter((message) => message.text === '自测消息')).toHaveLength(1)
    expect(store.messages.find((message) => message.text === '自测消息').local).toBe(false)
    expect(store.lastSeq).toBe(3)
  })

  it('keeps local pending messages when a snapshot replaces history', () => {
    const { store } = makeStore()
    store.messages.push({ who: 'me', text: '还没发完', at: 1, seq: 9.5, local: true, images: [], files: [] })
    store.replaceEvents([userEvent(1, '一'), assistantEvent(2, '二')])
    expect(store.messages.some((message) => message.local)).toBe(true)
    expect(store.lastSeq).toBe(2)
  })

  it('clears on demand', () => {
    const { store } = makeStore()
    store.replaceEvents([userEvent(1, '一')])
    store.clear()
    expect(store.messages).toHaveLength(0)
    expect(store.lastSeq).toBe(-1)
    expect(store.cursor).toBe(0)
  })

  it('builds tool cards from start/end events and keeps one card per call', () => {
    const { store } = makeStore()
    store.replaceEvents([
      { id: 's10', seq: 10, type: 'tool.start', at: 10, payload: { callId: 'c1', name: 'bash', summary: 'npm test', args: '{"command":"npm test"}' } },
      { id: 's11', seq: 11, type: 'tool.end', at: 11, payload: { callId: 'c1', ok: true, preview: 'passed' } },
    ])
    const tool = store.cards.get('tool-c1')
    expect(tool).toMatchObject({ kind: 'tool', name: 'bash', summary: 'npm test', status: 'ok', preview: 'passed', seq: 10 })
    expect(store.cards.size).toBe(1)
    expect(store.lastSeq).toBe(11)
  })

  it('marks a tool card failed on tool.end error', () => {
    const { store } = makeStore()
    store.upsertEvent({ id: 's1', seq: 1, type: 'tool.start', payload: { callId: 'c2', name: 'write' } })
    store.upsertEvent({ id: 's2', seq: 2, type: 'tool.end', payload: { callId: 'c2', ok: false, error: { name: 'E', code: 'FAIL' } } })
    expect(store.cards.get('tool-c2').status).toBe('failed')
    expect(store.cards.get('tool-c2').error).toEqual({ name: 'E', code: 'FAIL' })
  })

  it('keeps images from tool.end on the tool card', () => {
    const { store } = makeStore()
    store.upsertEvent({ id: 's1', seq: 1, type: 'tool.start', payload: { callId: 'c3', name: 'screenshot' } })
    store.upsertEvent({
      id: 's2',
      seq: 2,
      type: 'tool.end',
      payload: { callId: 'c3', ok: true, preview: '截图完成', images: [{ id: 'file:shot.png' }] },
    })
    expect(store.cards.get('tool-c3').images).toEqual([{ id: 'file:shot.png' }])
  })

  it('adds a deliverable card with its files', () => {
    const { store } = makeStore()
    store.upsertEvent({
      id: 'd1',
      seq: 30,
      at: 30,
      type: 'deliverable.present',
      payload: { turn: 2, callId: 'c9', files: [{ path: 'C:/work/out.txt', description: '结果' }] },
    })
    const card = store.cards.get('deliverable-c9')
    expect(card).toMatchObject({ kind: 'deliverable', turn: 2, seq: 30 })
    expect(card.files).toEqual([{ path: 'C:/work/out.txt', description: '结果' }])
  })

  it('upserts approval request into one card then marks the decision', () => {
    const { store } = makeStore()
    store.upsertEvent({
      id: 'approval-ap-1',
      seq: 20,
      type: 'approval.request',
      at: 20,
      payload: { approvalId: 'ap-1', title: '允许执行 bash？', tool: 'bash', reason: '跑测试' },
    })
    expect(store.cards.get('approval-ap-1')).toMatchObject({ decision: '', tool: 'bash' })
    store.upsertEvent({
      id: 'approval-ap-1',
      seq: 21,
      type: 'approval.result',
      at: 21,
      payload: { approvalId: 'ap-1', decision: 'allow', outcome: 'allowed-once', tool: 'bash' },
    })
    expect(store.cards.get('approval-ap-1')).toMatchObject({ decision: 'allow', outcome: 'allowed-once', seq: 20 })
    expect(store.cards.size).toBe(1)
  })

  it('tracks input request until the answer arrives', () => {
    const { store } = makeStore()
    store.upsertEvent({
      id: 'input-c9',
      seq: 30,
      type: 'input.request',
      at: 30,
      payload: { callId: 'c9', state: 'open', questions: [{ id: 'q1', question: '选哪个？' }] },
    })
    expect(store.cards.get('input-c9')).toMatchObject({ state: 'open', answers: null })
    store.upsertEvent({
      id: 'input-c9',
      seq: 31,
      type: 'input.result',
      at: 31,
      payload: { callId: 'c9', answers: [{ id: 'q1', selected: ['A'] }] },
    })
    expect(store.cards.get('input-c9')).toMatchObject({ state: 'answered', answers: [{ id: 'q1', selected: ['A'] }] })
    expect(store.cards.get('input-c9').questions).toHaveLength(1)
  })

  it('returns messages and cards in seq order', () => {
    const { store } = makeStore()
    store.replaceEvents([
      userEvent(1, '一问'),
      { id: 's2', seq: 2, type: 'tool.start', payload: { callId: 'c1', name: 'bash' } },
      assistantEvent(3, '答'),
      { id: 's4', seq: 4, type: 'approval.request', payload: { approvalId: 'ap', title: '批' } },
    ])
    const kinds = store.timeline().map((item) => (item.kind === 'message' ? item.message.text : item.kind))
    expect(kinds).toEqual(['一问', 'tool', '答', 'approval'])
  })

  it('lets a streamed tool.update become a provisional card, then adopt the real seq on tool.start', () => {
    const { store } = makeStore()
    store.replaceEvents([userEvent(1, '问')])
    store.upsertEvent({
      id: 'tool-c9',
      seq: 0,
      type: 'tool.update',
      payload: { callId: 'c9', name: 'bash', args: '{"command":"npm', summary: 'npm' },
    })
    const provisional = store.cards.get('tool-c9')
    expect(provisional).toMatchObject({ provisional: true, status: 'running', name: 'bash', summary: 'npm' })
    expect(provisional.seq).toBe(Number.MAX_SAFE_INTEGER)

    store.upsertEvent({
      id: 's2',
      seq: 2,
      type: 'tool.start',
      payload: { callId: 'c9', name: 'bash', args: '{"command":"npm test"}', summary: 'npm test' },
    })
    const adopted = store.cards.get('tool-c9')
    expect(adopted.provisional).toBe(false)
    expect(adopted.seq).toBe(2)
    expect(adopted.summary).toBe('npm test')
    expect(store.timeline().map((item) => item.kind)).toEqual(['message', 'tool'])
  })
})
