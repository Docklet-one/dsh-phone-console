/**
 * 会话抽屉的一行（dsh-console P2）
 *
 * 纯字符串渲染；当前会话带 ✓，状态按运行中 / 在线 / 历史。
 */
import { escapeAttr, escapeHtml, fmtClock } from '../util.js'

export function sessionRowHtml(session, current) {
  const id = escapeAttr(session.id || '')
  const rawTitle = session.title || (session.blank ? '新对话' : '未命名对话')
  const title = escapeHtml(rawTitle)
  const mark = session.id === current ? '✓ ' : ''
  const stateText = session.running ? '运行中' : session.online ? '在线' : ''
  const time = fmtClock(session.at)
  return `<div class="chat-session-row">
            <button type="button" class="chat-session" data-session="${id}" data-current="${session.id === current ? '1' : '0'}">
              <span class="chat-session-label">${mark}${title}</span>
              <span class="chat-session-time">${stateText ? escapeHtml(stateText) + ' · ' : ''}${time}</span>
            </button>
            <button type="button" class="chat-session-more" data-action="session-menu" data-session="${id}" data-title="${escapeAttr(rawTitle)}" aria-label="会话操作">⋯</button>
          </div>`
}
