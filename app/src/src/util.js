/** 纯工具函数：转义、链接化、时间/大小格式化、消息清洗 */

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"]/g, (char) => {
    if (char === '&') return '&amp;'
    if (char === '<') return '&lt;'
    if (char === '>') return '&gt;'
    return '&quot;'
  })
}

export function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, '&#39;')
}

/** 把 markdown 的轻量标记去掉，只留能读的纯文字 */
export function plain(value) {
  return String(value == null ? '' : value)
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[a-z]*\n?/gi, ''))
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

export function linkify(escaped) {
  // 链接只吃到 ASCII/URL 字符为止：中文全角标点、汉字、空格都算正文，
  // 避免 http://…/apk（说明） 把整段中文吞进 href，跳转后还得手动删。
  return escaped.replace(/(https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+)/gu, (url) => {
    const clean = url.replace(/[).,;:!?'"”’）】》]+$/gu, '')
    const tail = url.slice(clean.length)
    return `<a class="chat-link" href="${escapeAttr(clean)}" data-href="${escapeAttr(clean)}" target="_blank" rel="noreferrer noopener">${clean}</a>${tail}`
  })
}

export function formatSize(bytes) {
  const value = Number(bytes) || 0
  if (value >= 1024 * 1024) return (value / 1024 / 1024).toFixed(1) + ' MB'
  if (value >= 1024) return Math.round(value / 1024) + ' KB'
  return value + ' B'
}

/** token 数：1234 → 1.2k，1234567 → 1.2M */
export function formatTokens(value) {
  const amount = Number(value) || 0
  if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'M'
  if (amount >= 1000) return (amount / 1000).toFixed(1) + 'k'
  return String(Math.round(amount))
}

/** 一轮的用量摘要；没有可用数字时返回空串 */
export function usageText(usage) {
  if (!usage) return ''
  const parts = []
  if (usage.inputTokens) parts.push('输入 ' + formatTokens(usage.inputTokens))
  if (usage.outputTokens) parts.push('输出 ' + formatTokens(usage.outputTokens))
  if (usage.cacheReadTokens) parts.push('缓存 ' + formatTokens(usage.cacheReadTokens))
  return parts.join(' · ')
}

export function fmtClock(ts) {
  const date = new Date(Number(ts) || Date.now())
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const clock = pad(date.getHours()) + ':' + pad(date.getMinutes())
  return date.toDateString() === now.toDateString()
    ? clock
    : pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + clock
}

export function normalizeUrl(value) {
  return String(value || '')
    .replace(/：/g, ':')
    .replace(/[\u3000\s]+/g, '')
    .replace(/\/+$/, '')
}

export function safeMessage(raw) {
  if (!raw || typeof raw !== 'object') return null
  const who = raw.who === 'me' ? 'me' : raw.who === 'sys' ? 'sys' : raw.who === 'error' ? 'error' : 'ai'
  const text = typeof raw.text === 'string' ? raw.text : ''
  const id = Number(raw.id)
  const seq = Number(raw.seq)
  return {
    who,
    text,
    reasoning: typeof raw.reasoning === 'string' ? raw.reasoning : '',
    at: Number(raw.at) || Date.now(),
    id: Number.isFinite(id) && id > 0 ? id : undefined,
    seq: Number.isFinite(seq) ? seq : undefined,
    images: Array.isArray(raw.images) ? raw.images.filter((item) => item && item.id) : [],
    files: Array.isArray(raw.files) ? raw.files.filter((item) => item && item.id) : [],
  }
}
