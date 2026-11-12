/**
 * 订阅官方 Typert Gateway 的交互事件，作为普通消费者接收问答 waterfall。
 * 不替换官方回答者；回答通过官方 $events/result 提交，由 Gateway 仲裁先到者。
 */
import { randomUUID } from 'node:crypto'

const RETRY_MS = 500

function peerOf(connection) {
  return connection.browserPeer || connection.operator || null
}

function frameOf(value) {
  return value && typeof value === 'object' ? value : null
}

export function createQuestionBridge({
  gateway,
  connection,
  eventName = 'user-questions/request',
  onQuestion,
  onCancel,
  onReady,
  onError,
}) {
  let clientId = ''
  let abort = null
  let disposed = false
  let running = null

  function available() {
    return Boolean(clientId)
  }

  async function openEvents(signal) {
    const wire = gateway && gateway.wireStream
    if (!wire || typeof wire.open !== 'function') throw new Error('NO_GATEWAY')
    const peer = peerOf(connection)
    const args = ['$events', { args: {} }]
    if (wire.open.length === 5) {
      if (!peer) throw new Error('NO_PEER')
      args.push((async function* () {})(), peer, signal)
    } else if (wire.open.length === 3) {
      args.push(signal)
    } else {
      throw new Error('UNSUPPORTED_GATEWAY')
    }
    return Reflect.apply(wire.open, wire, args)
  }

  async function loop() {
    while (!disposed) {
      try {
        const stream = await openEvents(abort.signal)
        for await (const value of stream) {
          if (disposed) break
          const frame = frameOf(value)
          if (!frame) continue
          if (frame.type === 'ready') {
            if (typeof frame.clientId === 'string') {
              clientId = frame.clientId
              onReady?.()
            }
            continue
          }
          if (frame.type === 'cancel' && typeof frame.eventId === 'string') {
            onCancel?.(frame.eventId)
            continue
          }
          if (frame.type === 'waterfall' && frame.event === eventName) {
            await onQuestion?.(frame)
          }
        }
      } catch (error) {
        if (!disposed) onError?.(error)
      } finally {
        clientId = ''
      }
      if (disposed) break
      await new Promise((resolve) => setTimeout(resolve, RETRY_MS))
    }
  }

  function start() {
    if (running || disposed) return
    abort = new AbortController()
    running = loop()
  }

  async function stop() {
    disposed = true
    if (abort) abort.abort()
    try {
      await running
    } catch {
      /* 已停止 */
    }
    running = null
    clientId = ''
  }

  async function reply(eventId, outcome) {
    const id = String(clientId || '')
    if (!id) throw new Error('UNAVAILABLE')
    const peer = peerOf(connection)
    if (!peer) throw new Error('NO_PEER')
    const handler = connection.createSharedFetchHandler('/api')
    const rpcId = randomUUID()
    const request = new Request('http://127.0.0.1/api/$events/result', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        type: 'client-request',
        rpcId,
        method: '$events/result',
        payload: { args: { clientId: id, eventId, outcome } },
      }),
    })
    const response = await Reflect.apply(handler.fetch, handler, [request, peer])
    const envelope = frameOf(await response.json())
    const ok =
      response.ok &&
      envelope &&
      envelope.type === 'server-response' &&
      envelope.rpcId === rpcId &&
      frameOf(envelope.result)?.ok === true
    if (!ok) throw new Error('REJECTED')
  }

  return { available, start, stop, reply }
}
