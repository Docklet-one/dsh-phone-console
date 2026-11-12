/**
 * 后台提醒策略（纯函数，可单测）
 *
 * turn    —— 一轮结束（running true→false）提醒，电脑端执行失败时文案不同
 * message —— 每条助手消息都提醒（relay 的 lastAssistantSeq 变化）
 */
export function buildWatchPolicy({ appId, base, token, notify, mode = 'turn' }) {
  const common = {
    id: appId,
    endpoint: String(base || '') + '/health',
    token: token || '',
    intervalMs: 2500,
    enabled: notify !== false,
    openApp: appId,
    suppressApp: appId,
    title: 'DSH控制台',
  }
  if (mode === 'message') {
    return {
      ...common,
      mode: 'change',
      field: 'lastAssistantSeq',
      doneText: '收到新消息',
      failText: '收到新消息',
    }
  }
  return {
    ...common,
    field: 'running',
    from: true,
    to: false,
    failField: 'lastTurnError',
    doneText: '指令已完成',
    failText: '指令执行失败',
  }
}
