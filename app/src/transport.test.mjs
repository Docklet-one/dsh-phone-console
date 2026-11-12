import { afterEach, describe, expect, it, vi } from 'vitest'
import { createTransport, normalizeBase } from './transport.js'

function make(base = 'http://192.168.2.7:8788/', token = 'secret') {
  const state = { base, token }
  return {
    state,
    transport: createTransport({ base: () => state.base, token: () => state.token }),
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('normalizeBase', () => {
  it('trims trailing slashes', () => {
    expect(normalizeBase('http://a:1//')).toBe('http://a:1')
    expect(normalizeBase('')).toBe('')
  })
})

describe('createTransport', () => {
  it('builds asset urls with token and name', () => {
    const { transport } = make()
    expect(transport.assetUrl('image', 'file:a b.png')).toBe(
      'http://192.168.2.7:8788/image/a%20b.png?token=secret',
    )
    expect(transport.assetUrl('file', 'file:x.txt', '聊天 记录.txt')).toBe(
      'http://192.168.2.7:8788/file/x.txt?token=secret&name=%E8%81%8A%E5%A4%A9%20%E8%AE%B0%E5%BD%95.txt',
    )
  })

  it('builds the SSE url with after/session/token', () => {
    const { transport } = make()
    expect(transport.eventsUrl(0, '')).toBe('http://192.168.2.7:8788/events?token=secret')
    expect(transport.eventsUrl(12, 'session-aaa')).toBe(
      'http://192.168.2.7:8788/events?after=12&session=session-aaa&token=secret',
    )
  })

  it('keeps the base empty when no address is configured', () => {
    const { transport } = make('', '')
    expect(transport.baseUrl()).toBe('')
    expect(transport.eventsUrl(0, '')).toBe('/events')
  })

  it('uses /messages?recent when there is no cursor and ?since when there is', async () => {
    const calls = []
    vi.stubGlobal('fetch', async (url, init) => {
      calls.push({ url: String(url), init })
      return new Response(JSON.stringify({ ok: true, messages: [] }), { status: 200 })
    })
    const { transport } = make()
    await transport.messages({ recent: 5 })
    await transport.messages({ since: 42 })
    expect(calls[0].url).toBe('http://192.168.2.7:8788/messages?recent=5')
    expect(calls[1].url).toBe('http://192.168.2.7:8788/messages?since=42')
    expect(calls[0].init.headers.Authorization).toBe('Bearer secret')
  })

  it('sends snapshots and posts with JSON headers', async () => {
    const calls = []
    vi.stubGlobal('fetch', async (url, init) => {
      calls.push({ url: String(url), init })
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    })
    const { transport } = make()
    await transport.snapshot('session-aaa')
    await transport.presence(true)
    await transport.respond('input-1', [{ id: 'q1', selected: ['A'] }], 'session-aaa')
    expect(calls[0].url).toBe('http://192.168.2.7:8788/snapshot?session=session-aaa')
    expect(calls[1].url).toBe('http://192.168.2.7:8788/presence')
    expect(calls[1].init.method).toBe('POST')
    expect(calls[1].init.headers['Content-Type']).toBe('application/json')
    expect(JSON.parse(calls[1].init.body)).toEqual({ phone: true })
    expect(calls[2].url).toBe('http://192.168.2.7:8788/respond')
    expect(JSON.parse(calls[2].init.body)).toEqual({
      id: 'input-1',
      answers: [{ id: 'q1', selected: ['A'] }],
      session: 'session-aaa',
    })
  })

  it('throws with status and code from the relay error body', async () => {
    vi.stubGlobal('fetch', async () =>
      new Response(JSON.stringify({ ok: false, error: '这个会话打不开', code: 'NO_SESSION' }), { status: 409 }),
    )
    const { transport } = make()
    await expect(transport.snapshot()).rejects.toMatchObject({
      message: '这个会话打不开',
      status: 409,
      code: 'NO_SESSION',
    })
  })

  it('passes absolute URLs through unchanged', async () => {
    const calls = []
    vi.stubGlobal('fetch', async (url) => {
      calls.push(String(url))
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    })
    const { transport } = make()
    await transport.fetchJson('http://10.0.0.1:8788/health', {})
    expect(calls[0]).toBe('http://10.0.0.1:8788/health')
  })

  it('posts approval decisions to the P1 endpoint', async () => {
    const calls = []
    vi.stubGlobal('fetch', async (url, init) => {
      calls.push({ url: String(url), body: JSON.parse(init.body) })
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    })
    const { transport } = make()
    await transport.approvalDecision('ap-1', true)
    await transport.approvalDecision('ap-2', false)
    expect(calls[0].url).toBe('http://192.168.2.7:8788/approvals')
    expect(calls[0].body).toEqual({ id: 'ap-1', decision: 'allow' })
    expect(calls[1].body).toEqual({ id: 'ap-2', decision: 'deny' })
  })
})
