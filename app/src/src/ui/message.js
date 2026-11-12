/**
 * 时间线里的单条消息（dsh-console P2）
 *
 * 纯字符串渲染，不碰 DOM：输入一条消息（store 的标准 shape），输出 chat-turn 结构。
 * assetUrl 由调用方传入（transport 拥有地址/令牌）。
 */
import { escapeAttr, escapeHtml, formatSize, fmtClock, linkify, plain } from '../util.js'
import { renderMarkdown } from './markdown.js'

/** 搜索跳转用的稳定 key，和 main.js 里的 messageKey 保持一致 */
function messageKey(message) {
  if (!message) return ''
  if (message.eventId) return String(message.eventId)
  if (message.id) return 'id' + message.id
  if (Number.isFinite(Number(message.seq))) return 's' + message.seq
  return ''
}

export function messageHtml(message, assetUrl) {
  const key = messageKey(message)
  const mid = key ? ` data-mid="${escapeAttr(key)}"` : ''
  if (message.who === 'sys') {
    return `<div class="chat-sys">${linkify(escapeHtml(plain(message.text)))}</div>`
  }
  if (message.who === 'error') {
    const retry = message.retryText
      ? `<button type="button" class="chat-retry" data-retry="${escapeAttr(encodeURIComponent(message.retryText))}">点按重试</button>`
      : ''
    return `<div class="chat-turn is-ai"${mid}>${retry}<div class="chat-bubble is-error" data-copy="${escapeAttr(encodeURIComponent(plain(message.text)))}">${escapeHtml(plain(message.text))}</div></div>`
  }

  const mine = message.who === 'me'
  const images = Array.isArray(message.images) ? message.images : []
  const files = Array.isArray(message.files) ? message.files : []

  const imagesHtml = images.length
    ? `<div class="chat-md-gallery ${images.length === 1 ? 'is-one' : images.length === 2 ? 'is-two' : images.length >= 5 ? 'is-many' : 'is-few'}" data-count="${images.length}">${images
        .map((image) => {
          const localSrc = String(image.id || '').startsWith('local:') ? String(image.src || '') : ''
          if (localSrc) return `<img class="chat-image chat-md-image" src="${escapeAttr(localSrc)}" alt="图片" />`
          const src = assetUrl('image', image.id)
          return `<img class="chat-image chat-md-image" data-src="${escapeAttr(src)}" alt="图片" />`
        })
        .join('')}</div>`
    : ''

  const filesHtml = files
    .map((file) => {
      const name = file.name || '文件'
      if (String(file.id || '').startsWith('local:')) {
        return `<div class="chat-file"><span class="chat-file-icon">📦</span><span class="chat-file-main"><span class="chat-file-name">${escapeHtml(name)}</span><span class="chat-file-size">${formatSize(file.size)} · 发送中</span></span></div>`
      }
      const url = assetUrl('file', file.id, name)
      return `<a class="chat-file" href="${escapeAttr(url)}" data-file-url="${escapeAttr(url)}" data-file-name="${escapeAttr(name)}" download="${escapeAttr(name)}">
          <span class="chat-file-icon">📦</span>
          <span class="chat-file-main">
            <span class="chat-file-name">${escapeHtml(name)}</span>
            <span class="chat-file-size">${formatSize(file.size)} · 点按下载</span>
          </span>
        </a>`
    })
    .join('')

  const text = message.text ? renderMarkdown(message.text) : ''
  const reasoning = message.reasoning
    ? `<details class="chat-thinking"><summary>思考过程</summary><div class="chat-thinking-text">${escapeHtml(message.reasoning)}</div></details>`
    : ''
  const typing = message.pending ? ' is-typing' : ''
  const bubble = `<div class="chat-bubble ${mine ? 'is-me' : 'is-ai'}${typing}${images.length ? ' has-images' : ''}" data-copy="${escapeAttr(encodeURIComponent(plain(message.text || '')))}">${imagesHtml}${filesHtml}${reasoning}${text}</div>`
  const copy =
    !message.pending && message.text
      ? `<button type="button" class="chat-copy" data-action="copy-message" aria-label="复制这条消息">复制</button>`
      : ''
  const resend =
    mine && !message.pending && message.text
      ? `<button type="button" class="chat-copy chat-resend" data-action="resend-message" aria-label="放进输入框重发">重发</button>`
      : ''
  const meta = `<div class="chat-meta"><span class="chat-avatar">${mine ? '🙂' : '🤖'}</span><span class="chat-stamp">${fmtClock(message.at)}</span>${copy}${resend}</div>`
  return `<div class="chat-turn ${mine ? 'is-me' : 'is-ai'}"${mid}>${meta}${bubble}</div>`
}
