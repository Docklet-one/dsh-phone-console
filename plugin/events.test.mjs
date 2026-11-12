import { describe, expect, it } from 'vitest'
import {
  EventLog,
  EventStreams,
  mapSessionEvents,
  normalizeAnswers,
  normalizeQuestions,
  normalizeUsage,
  questionsFromArgs,
  sseComment,
  sseData,
  summarizeToolArgs,
  usageOfStream,
} from './events.js'

const at = 1790000000000

function sessionEvent(type, seq, data, time = at) {
  return { type, seq, time, data }
}

function userMessage(text) {
  return { source: { kind: 'user' }, content: [{ type: 'text', text }] }
}

function assistantMessage(text, extra = []) {
  return { message: { content: [{ type: 'text', text }, ...extra] } }
}

describe('mapSessionEvents', () => {
  it('maps a user message and trims it into one event', () => {
    const [event] = mapSessionEvents(sessionEvent('user/message', 3, userMessage('你好')))
    expect(event).toMatchObject({
      id: 's3',
      seq: 3,
      type: 'message.user',
      at,
      status: 'ok',
      payload: { text: '你好' },
    })
  })

  it('drops system-sourced user messages', () => {
    const event = sessionEvent('user/message', 4, { source: { kind: 'system-prompt' }, content: [{ type: 'text', text: 'x' }] })
    expect(mapSessionEvents(event)).toEqual([])
  })

  it('materializes images and keeps files', () => {
    const message = {
      source: { kind: 'user' },
      content: [
        { type: 'text', text: '看图' },
        { type: 'image', attachment: { attachmentId: 'sha256:' + 'a'.repeat(64), width: 4, height: 5 } },
        { type: 'file', attachment: { attachmentId: 'sha256:' + 'b'.repeat(64), name: 'a.zip', bytes: 12 } },
      ],
    }
    const [event] = mapSessionEvents(sessionEvent('user/message', 5, message), {
      materializeImage: () => ({ id: 'file:att-aa.png', width: 4, height: 5 }),
    })
    expect(event.payload.images).toEqual([{ id: 'file:att-aa.png', width: 4, height: 5 }])
    expect(event.payload.files).toEqual([{ id: 'sha256:' + 'b'.repeat(64), name: 'a.zip', size: 12 }])
  })

  it('maps turns and reports failures as two events', () => {
    const start = mapSessionEvents(sessionEvent('turn/start', 10, { turn: 1 }))
    expect(start[0]).toMatchObject({ type: 'turn.start', payload: { turn: 1 } })

    const end = mapSessionEvents(sessionEvent('turn/end', 12, { turn: 1, reason: { kind: 'completed' } }))
    expect(end).toHaveLength(1)
    expect(end[0]).toMatchObject({ type: 'turn.end', status: 'ok', payload: { turn: 1, reason: { kind: 'completed' } } })

    const failed = mapSessionEvents(
      sessionEvent('turn/end', 20, {
        turn: 2,
        reason: { kind: 'error', error: { code: 'ACCOUNT_QUOTA', status: 402, message: 'no money' } },
      }),
    )
    expect(failed.map((event) => event.type)).toEqual(['turn.end', 'message.error'])
    expect(failed[1].payload).toMatchObject({ code: 'ACCOUNT_QUOTA', status: 402, hint: '额度用完了，充值后再试' })
    expect(failed[0].id).not.toBe(failed[1].id)
  })

  it('maps tool calls and results', () => {
    const [start] = mapSessionEvents(
      sessionEvent('tool/call', 30, { callId: 'c1', name: 'bash', arguments: '{"command":"npm test"}' }),
    )
    expect(start.type).toBe('tool.start')
    expect(start.payload).toMatchObject({ callId: 'c1', name: 'bash', summary: 'npm test' })

    const [end] = mapSessionEvents(
      sessionEvent('tool/result', 31, {
        message: { toolCallId: 'c1', content: [{ type: 'text', text: 'ok' }] },
      }),
    )
    expect(end.type).toBe('tool.end')
    expect(end.payload).toMatchObject({ callId: 'c1', ok: true, preview: 'ok' })

    const [failed] = mapSessionEvents(
      sessionEvent('tool/result', 32, {
        error: { name: 'ToolError', code: 'E_FAIL' },
        message: { toolCallId: 'c1', content: [{ type: 'text', text: 'boom' }] },
      }),
    )
    expect(failed.status).toBe('failed')
    expect(failed.payload.error).toEqual({ name: 'ToolError', code: 'E_FAIL', reason: '' })
  })

  it('maps reasoning blocks into the assistant payload', () => {
    const events = mapSessionEvents(
      sessionEvent('assistant/message', 60, {
        turn: 1,
        step: 1,
        stream: [],
        message: {
          role: 'assistant',
          content: [
            { type: 'reasoning', text: '先想一下' },
            { type: 'text', text: '答案' },
          ],
        },
      }),
    )
    expect(events[0].payload.text).toBe('答案')
    expect(events[0].payload.reasoning).toBe('先想一下')
  })

  it('maps deliverables/presented into a deliverable event', () => {
    const events = mapSessionEvents(
      sessionEvent('deliverables/presented', 50, {
        turn: 2,
        callId: 'c9',
        files: [
          { path: 'C:\\work\\a\\out.txt', description: '结果' },
          { path: '' },
          { path: 'notes.md' },
        ],
      }),
    )
    expect(events).toHaveLength(1)
    expect(events[0].type).toBe('deliverable.present')
    expect(events[0].payload.turn).toBe(2)
    expect(events[0].payload.files).toEqual([
      { path: 'C:\\work\\a\\out.txt', description: '结果' },
      { path: 'notes.md', description: '' },
    ])
  })

  it('maps images from a tool result into tool.end', () => {    const [end] = mapSessionEvents(
      sessionEvent('tool/result', 33, {
        message: {
          toolCallId: 'c1',
          content: [
            { type: 'text', text: '截图完成' },
            { type: 'image', attachment: { id: 'file:shot.png', mime: 'image/png' } },
          ],
        },
      }),
    )
    expect(end.type).toBe('tool.end')
    expect(end.payload.preview).toBe('截图完成')
    expect(end.payload.images).toEqual([{ id: 'file:shot.png', mime: 'image/png' }])
  })

  it('turns ask_user_question into input cards', () => {
    const questions = new Map()
    const args = JSON.stringify({
      questions: [
        { id: 'q1', question: '选哪个？', header: '选择', options: [{ label: 'A' }, { label: 'B', description: '第二个' }] },
        { id: 'q2', question: '多选', multi_select: true },
      ],
    })
    const [request] = mapSessionEvents(sessionEvent('tool/call', 40, { callId: 'c1', name: 'ask_user_question', arguments: args }), {
      questions,
    })
    expect(request).toMatchObject({
      id: 'input-c1',
      type: 'input.request',
      status: 'pending',
      payload: { callId: 'c1', state: 'open' },
    })
    expect(request.payload.questions).toHaveLength(2)
    expect(request.payload.questions[0].options[1]).toEqual({ label: 'B', description: '第二个' })
    expect(request.payload.questions[1].multiSelect).toBe(true)
    expect(questions.get('c1')).toHaveLength(2)

    const pending = mapSessionEvents(
      sessionEvent('tool/result', 41, {
        message: { toolCallId: 'c1', content: [{ type: 'text', text: '{"pending":true,"callId":"c1"}' }] },
      }),
      { questions },
    )
    expect(pending[0]).toMatchObject({ id: 'input-c1', type: 'input.request', payload: { state: 'continued', pending: true } })
    expect(pending[0].payload.questions).toHaveLength(2)

    const answered = mapSessionEvents(
      sessionEvent('tool/result', 42, {
        message: {
          toolCallId: 'c1',
          content: [{ type: 'text', text: '{"answers":[{"id":"q1","selected":["A"]}]}' }],
        },
      }),
      { questions },
    )
    expect(answered[0]).toMatchObject({
      id: 'input-c1',
      type: 'input.result',
      payload: { callId: 'c1', answers: [{ id: 'q1', selected: ['A'] }] },
    })
    expect(questions.has('c1')).toBe(false)
  })

  it('maps a late question reply as input.result', () => {
    const questions = new Map([['c9', [{ id: 'q1', question: '?' }]]])
    const [event] = mapSessionEvents(
      sessionEvent('user/message', 50, {
        source: { kind: 'user-question-reply', callId: 'c9', outcome: 'answered' },
        content: [
          {
            type: 'text',
            text: JSON.stringify({ kind: 'answer_to_pending_question', tool: 'ask_user_question', callId: 'c9', answers: [{ id: 'q1', selected: ['B'] }] }),
          },
        ],
      }),
      { questions },
    )
    expect(event.type).toBe('input.result')
    expect(event.payload.answers).toEqual([{ id: 'q1', selected: ['B'] }])
    expect(event.payload.questions).toHaveLength(1)
    expect(questions.size).toBe(0)
  })

  it('maps durable approval events into one upserted card', () => {
    const approvals = new Map()
    const [asked] = mapSessionEvents(
      sessionEvent('approval/asked', 60, { id: 'ap-1', toolName: 'bash', reason: '需要执行命令', callId: 'c1' }),
      { approvals },
    )
    expect(asked).toMatchObject({
      id: 'approval-ap-1',
      type: 'approval.request',
      status: 'pending',
      payload: { approvalId: 'ap-1', tool: 'bash', reason: '需要执行命令', callId: 'c1' },
    })
    expect(asked.payload.title).toContain('bash')

    const [decided] = mapSessionEvents(sessionEvent('approval/decided', 61, { id: 'ap-1', outcome: 'allowed-once' }), {
      approvals,
    })
    expect(decided).toMatchObject({
      id: 'approval-ap-1',
      type: 'approval.result',
      status: 'ok',
      payload: { approvalId: 'ap-1', decision: 'allow', outcome: 'allowed-once', tool: 'bash' },
    })
    expect(approvals.size).toBe(0)
  })

  it('maps denials and title events', () => {
    const [denied] = mapSessionEvents(sessionEvent('approval/decided', 70, { id: 'ap-2', outcome: 'rejected' }))
    expect(denied.payload.decision).toBe('deny')
    expect(denied.status).toBe('failed')

    const [title] = mapSessionEvents(sessionEvent('session/title', 71, { title: '写文档' }))
    expect(title).toMatchObject({ type: 'session.meta', payload: { title: '写文档' } })
  })

  it('ignores unknown or malformed events', () => {
    expect(mapSessionEvents(null)).toEqual([])
    expect(mapSessionEvents({ type: 'user/message', seq: null })).toEqual([])
    expect(mapSessionEvents(sessionEvent('goal/change', 80, {}))).toEqual([])
  })
})

describe('EventLog', () => {
  function event(id, seq, text = '') {
    return { id, seq, type: 'message.user', at, payload: { text } }
  }

  it('keeps seq order regardless of arrival order', () => {
    const log = new EventLog(10)
    log.upsert(event('s3', 3, 'c'))
    log.upsert(event('s1', 1, 'a'))
    log.upsert(event('s2', 2, 'b'))
    expect(log.all().map((one) => one.id)).toEqual(['s1', 's2', 's3'])
    expect(log.cursor).toBe(3)
  })

  it('upserts by id without moving the event', () => {
    const log = new EventLog(10)
    log.upsert(event('approval-1', 5, 'pending'))
    log.upsert(event('s6', 6))
    log.upsert({ ...event('approval-1', 7), type: 'approval.result', payload: { decision: 'allow' } })
    expect(log.all().map((one) => one.id)).toEqual(['approval-1', 's6'])
    expect(log.all()[0].payload).toEqual({ decision: 'allow' })
  })

  it('trims to the limit from the oldest side', () => {
    const log = new EventLog(3)
    for (let index = 1; index <= 5; index += 1) log.upsert(event('s' + index, index))
    expect(log.all().map((one) => one.id)).toEqual(['s3', 's4', 's5'])
    expect(log.after(3).map((one) => one.id)).toEqual(['s4', 's5'])
  })

  it('round-trips through serialize/hydrate', () => {
    const log = new EventLog(10)
    log.upsert(event('s1', 1, 'a'))
    log.upsert(event('s2', 2, 'b'))
    log.upsert({ ...event('s2', 2), payload: { text: 'b2' } })
    const restored = new EventLog(10).hydrate(log.serialize() + '\nbroken-line\n' + JSON.stringify(event('s3', 3, 'c')) + '\n')
    expect(restored.all().map((one) => one.text || one.payload.text)).toEqual(['a', 'b2', 'c'])
    expect(restored.cursor).toBe(3)
  })
})

describe('EventStreams', () => {
  it('publishes only to the matching session subscribers', () => {
    const streams = new EventStreams()
    const seenA = []
    const seenB = []
    const offA = streams.subscribe('a', (event) => seenA.push(event.seq))
    const offB = streams.subscribe('b', (event) => seenB.push(event.seq))
    expect(streams.publish('a', { seq: 1 })).toBe(1)
    expect(streams.publish('a', { seq: 2 })).toBe(1)
    expect(seenA).toEqual([1, 2])
    expect(seenB).toEqual([])
    expect(streams.count('a')).toBe(1)
    offA()
    offB()
    expect(streams.count('a')).toBe(0)
  })

  it('drops a throwing subscriber instead of failing the publish', () => {
    const streams = new EventStreams()
    const seen = []
    streams.subscribe('a', () => {
      throw new Error('broken')
    })
    streams.subscribe('a', (event) => seen.push(event.seq))
    streams.publish('a', { seq: 9 })
    expect(seen).toEqual([9])
    expect(streams.count('a')).toBe(1)
    expect(streams.publish('a', { seq: 10 })).toBe(1)
  })
})

describe('helpers', () => {
  it('formats SSE frames', () => {
    expect(sseData({ id: 's1' })).toBe('data: {"id":"s1"}\n\n')
    expect(sseComment('ping')).toBe(': ping\n\n')
  })

  it('summarizes tool arguments in one line', () => {
    expect(summarizeToolArgs('{"command":"npm  test"}')).toBe('npm test')
    expect(summarizeToolArgs('{"path":"' + 'a'.repeat(100) + '"}')).toHaveLength(81)
    expect(summarizeToolArgs('not json')).toBe('')
  })

  it('normalizes questions and answers', () => {
    expect(normalizeQuestions([{ id: 'q', question: '?', multiSelect: true, options: [{ label: 'A' }] }])).toEqual([
      { id: 'q', question: '?', options: [{ label: 'A' }], multiSelect: true },
    ])
    expect(normalizeAnswers([{ id: 'q', selected: ['A'], custom: '' }, { selected: ['x'] }])).toEqual([
      { id: 'q', selected: ['A'] },
    ])
    expect(questionsFromArgs('{"questions":[{"id":"q","question":"?"}]}')).toEqual([{ id: 'q', question: '?' }])
    expect(questionsFromArgs('{"questions":[]}')).toBeNull()
  })
})

describe('token usage', () => {
  it('finds the last usage chunk in an assistant stream', () => {
    const stream = [
      { type: 'chunk', chunk: { type: 'text-delta', text: 'hi' } },
      { type: 'usage', usage: { inputTokens: '12', outputTokens: 3, cacheReadTokens: 9 } },
    ]
    expect(usageOfStream(stream)).toEqual({
      inputTokens: 12,
      outputTokens: 3,
      totalTokens: 15,
      cacheReadTokens: 9,
    })
  })

  it('attaches usage to message.assistant when the event or stream has it', () => {
    const events = mapSessionEvents(
      sessionEvent('assistant/message', 3, {
        turn: 1,
        step: 1,
        stream: [{ type: 'chunk', chunk: { type: 'usage', usage: { inputTokens: 10, outputTokens: 4 } } }],
        message: { role: 'assistant', content: [{ type: 'text', text: '答' }] },
      }),
    )
    expect(events[0].payload.usage).toEqual({ inputTokens: 10, outputTokens: 4, totalTokens: 14 })
  })

  it('drops malformed usage', () => {
    expect(normalizeUsage(null)).toBeNull()
    expect(normalizeUsage({ inputTokens: 'x' })).toBeNull()
    expect(normalizeUsage({ inputTokens: 5 })).toEqual({ inputTokens: 5, outputTokens: 0, totalTokens: 5 })
  })
})
