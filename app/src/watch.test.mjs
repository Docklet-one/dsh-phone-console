import { describe, expect, it } from 'vitest'
import { buildWatchPolicy } from './watch.js'

const base = { appId: 'dsh-console', base: 'http://192.168.2.6:8788/', token: 't', notify: true }

describe('buildWatchPolicy', () => {
  it('watches the turn edge by default', () => {
    const policy = buildWatchPolicy(base)
    expect(policy).toMatchObject({
      id: 'dsh-console',
      endpoint: 'http://192.168.2.6:8788//health',
      field: 'running',
      from: true,
      to: false,
      failField: 'lastTurnError',
      doneText: '指令已完成',
      openApp: 'dsh-console',
      suppressApp: 'dsh-console',
      enabled: true,
    })
    expect(policy.mode).toBeUndefined()
  })

  it('switches to change detection for per-message reminders', () => {
    const policy = buildWatchPolicy({ ...base, mode: 'message' })
    expect(policy).toMatchObject({
      mode: 'change',
      field: 'lastAssistantSeq',
      doneText: '收到新消息',
      enabled: true,
    })
    expect(policy.from).toBeUndefined()
  })

  it('keeps the disabled flag', () => {
    expect(buildWatchPolicy({ ...base, notify: false }).enabled).toBe(false)
  })

  it('trims nothing from the endpoint (caller passes a normalized base)', () => {
    expect(buildWatchPolicy({ base: 'http://a:1', appId: 'x' }).endpoint).toBe('http://a:1/health')
  })
})
