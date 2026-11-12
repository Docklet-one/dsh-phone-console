import { describe, expect, it } from 'vitest'
import { approvalCardHtml, buildInputAnswers, deliverableCardHtml, inputCardHtml, toolCardHtml, toolDetailHtml } from './cards.js'

const tool = {
  kind: 'tool',
  id: 'tool-c1',
  callId: 'c1',
  name: 'bash',
  summary: 'npm test',
  args: '{"command":"npm test"}',
  status: 'running',
  preview: '',
  error: null,
  at: 1790000000000,
}

describe('deliverableCardHtml', () => {
  it('renders one download row per declared file', () => {
    const html = deliverableCardHtml(
      {
        id: 'deliverable-c9',
        seq: 9,
        at: 0,
        files: [{ path: 'C:/work/out.txt', description: '结果' }, { path: 'notes.md' }],
      },
      (seq, index, name) => `/presented/${seq}/${index}/${name}`,
    )
    expect(html).toContain('交付文件')
    expect(html).toContain('out.txt')
    expect(html).toContain('结果')
    expect(html).toContain('notes.md')
    expect(html).toContain('data-file-url="/presented/9/0/out.txt"')
    expect(html).toContain('data-file-url="/presented/9/1/notes.md"')
  })
})

describe('toolCardHtml', () => {  it('does not render tool result images as a visual grid', () => {
    const html = toolDetailHtml(
      { ...tool, status: 'ok', images: [{ id: 'file:shot.png', mime: 'image/png' }] },
      (kind, id) => '/image/' + id,
    )
    expect(html).not.toContain('chat-tool-images')
    expect(html).not.toContain('chat-tool-image')
  })

  it('renders a collapsed row with the summary', () => {
    const html = toolCardHtml(tool, false)
    expect(html).toContain('chat-tool is-running')
    expect(html).toContain('npm test')
    expect(html).not.toContain('chat-tool-body')
  })

  it('renders an expanded body and escapes content', () => {
    const html = toolDetailHtml({ ...tool, status: 'ok', args: '{"a":"<b>"}', preview: 'ok <done>' })
    expect(html).toContain('chat-tool-detail')
    expect(html).toContain('&lt;b&gt;')
    expect(html).toContain('ok &lt;done&gt;')
  })

  it('shows failures', () => {
    const html = toolDetailHtml({ ...tool, status: 'failed', error: { name: 'ToolError', code: 'E1' } })
    expect(html).toContain('chat-tool-detail is-failed')
    expect(html).toContain('ToolError · E1')
  })
})

describe('approvalCardHtml', () => {
  const card = {
    kind: 'approval',
    id: 'approval-ap-1',
    approvalId: 'ap-1',
    title: '允许执行 bash？',
    tool: 'bash',
    reason: '跑测试',
    decision: '',
    at: 1790000000000,
  }

  it('renders allow/deny buttons while pending', () => {
    const html = approvalCardHtml(card)
    expect(html).toContain('is-pending')
    expect(html).toContain('data-action="approval-allow"')
    expect(html).toContain('data-action="approval-deny"')
    expect(html).toContain('跑测试')
  })

  it('renders a settled badge without buttons', () => {
    const html = approvalCardHtml({ ...card, decision: 'allow', outcome: 'allowed-once' })
    expect(html).toContain('已允许')
    expect(html).not.toContain('approval-allow')
  })
})

describe('inputCardHtml', () => {
  const card = {
    kind: 'input',
    id: 'input-c9',
    callId: 'c9',
    state: 'open',
    questions: [
      { id: 'q1', question: '选哪个？', options: [{ label: 'A' }, { label: 'B', description: '第二个' }] },
      { id: 'q2', question: '补充', multiSelect: true, options: [{ label: 'X' }, { label: 'Y' }] },
    ],
    answers: null,
    at: 1790000000000,
  }

  it('renders options, selected state and custom inputs', () => {
    const html = inputCardHtml(card, { selected: { q1: ['A'], q2: ['X', 'Y'] }, custom: { q2: '自己写' } }, false)
    expect(html).toContain('选哪个？')
    expect(html).toContain('data-action="q-pick"')
    expect(html).toContain('is-on')
    expect(html).toContain('data-multi="1"')
    expect(html).toContain('value="自己写"')
    expect(html).toContain('data-action="q-submit"')
  })

  it('requires every question to be answered', () => {
    expect(buildInputAnswers(card, { selected: { q1: ['A'] }, custom: {} })).toBeNull()
    expect(
      buildInputAnswers(card, { selected: { q1: ['A'], q2: ['X'] }, custom: { q2: '补充说明' } }),
    ).toEqual([
      { id: 'q1', selected: ['A'] },
      { id: 'q2', selected: ['X'], custom: '补充说明' },
    ])
  })

  it('renders the answered state without a submit button', () => {
    const html = inputCardHtml(
      { ...card, state: 'answered', answers: [{ id: 'q1', selected: ['B'] }, { id: 'q2', selected: [], custom: '嗯' }] },
      {},
      false,
    )
    expect(html).toContain('已回答')
    expect(html).not.toContain('q-submit')
    expect(html).toContain('嗯')
  })

  it('shows submitted while waiting for the result', () => {
    const html = inputCardHtml(card, { selected: { q1: ['A'] }, custom: {} }, true)
    expect(html).toContain('已提交，等待继续')
  })
})
