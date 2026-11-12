/**
 * 时间线排序（dsh-console P2）
 *
 * 会话日志的 seq 才是对话顺序：seq 小的在前，没有 seq 的（刚发出、还没拿到
 * 真实序号）排在最后；同一 seq 再按时间、id 排。
 * P3 的分组/折叠/工具卡片会在这里继续加。
 */

export function messageOrder(message) {
  const value = message && message.seq
  if (value === null || value === undefined || value === '') return Number.MAX_SAFE_INTEGER
  const number = Number(value)
  return Number.isFinite(number) ? number : Number.MAX_SAFE_INTEGER
}

export function compareMessages(left, right) {
  const leftOrder = messageOrder(left)
  const rightOrder = messageOrder(right)
  if (leftOrder !== rightOrder) return leftOrder - rightOrder
  const byTime = (Number(left.at) || 0) - (Number(right.at) || 0)
  if (byTime !== 0) return byTime
  return (Number(left.id) || 0) - (Number(right.id) || 0)
}

export function sortMessages(list) {
  list.sort(compareMessages)
  return list
}
