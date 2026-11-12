/**
 * 时间线卡片（dsh-console P3）
 *
 * 三种内联卡片：工具调用（可折叠）、审批（允许/拒绝）、提问（选项/自定义 + 提交）。
 * 纯字符串渲染；交互靠 data-action，由 main.js 统一代理。
 */
import { escapeAttr, escapeHtml, fmtClock } from '../util.js'

function timeLabel(at) {
  return at ? `<span class="chat-card-time">${fmtClock(at)}</span>` : ''
}

/** 工具结果里带的图片：当前只保留字段文本，不做视觉展示 */

/** 工具调用：列表行，点击打开详情抽屉 */
export function toolCardHtml(card, expanded, assetUrl = null, index = 0, active = false) {
  const status = card.status === 'failed' ? 'is-failed' : card.status === 'ok' ? 'is-ok' : 'is-running'
  const name = card.name || '工具'
  const summary = card.summary || ''
  const order = Number(index) || 0
  const marker = order
    ? `<span class="chat-tool-index ${status}">${order}</span>`
    : '<span class="chat-tool-dot" aria-hidden="true"></span>'
  return `<div class="chat-tool ${status}${active ? ' is-active' : ''}" data-tool="${escapeAttr(card.id)}">
    <button type="button" class="chat-tool-head" data-action="tool-open" data-tool="${escapeAttr(card.id)}">
      ${marker}
      <span class="chat-tool-name">${escapeHtml(name)}</span>
      ${summary ? `<span class="chat-tool-sum">${escapeHtml(summary)}</span>` : ''}
      <span class="chat-tool-chevron" aria-hidden="true">›</span>
    </button>
  </div>`
}

/** 工具详情抽屉内容：结果优先，参数默认折叠，代码区可复制 */
export function toolDetailHtml(card, assetUrl = null) {
  const status = card.status === 'failed' ? 'is-failed' : card.status === 'ok' ? 'is-ok' : 'is-running'
  const name = card.name || '工具'
  const summary = card.summary || ''
  const hasResult = Boolean(card.preview || card.error)
  const copy = (kind) =>
    `<button type="button" class="chat-tool-copy" data-action="tool-copy" data-tool="${escapeAttr(card.id)}" data-copy="${kind}">复制</button>`
  const result = [
    card.preview
      ? `<div class="chat-tool-code-head"><span>结果</span>${copy('preview')}</div><pre class="chat-tool-preview">${escapeHtml(card.preview)}</pre>`
      : '',
    card.error
      ? `<p class="chat-tool-label">错误</p><p class="chat-tool-error">${escapeHtml([card.error.name, card.error.code, card.error.reason].filter(Boolean).join(' · '))}</p>`
      : '',
    !hasResult ? '<p class="chat-tool-preview">没有输出</p>' : '',
  ].join('')
  const args = card.args
    ? `<div class="chat-tool-code-head"><span>参数</span>${copy('args')}</div><pre class="chat-tool-pre">${escapeHtml(card.args)}</pre>`
    : ''
  return `<div class="chat-tool-detail ${status}">
    <div class="chat-tool-detail-head">
      <span class="chat-tool-dot" aria-hidden="true"></span>
      <span class="chat-tool-name">${escapeHtml(name)}</span>
      ${summary ? `<span class="chat-tool-sum">${escapeHtml(summary)}</span>` : ''}
    </div>
    ${result}
    ${args}
  </div>`
}

/** 当前轮没有工具时也保留一条稳定高度的页脚 */
export function toolGroupEmptyHtml() {
  return `<div class="chat-tool-group is-empty">
    <div class="chat-tool-group-head">
      <span class="chat-tool-group-icon" aria-hidden="true">🧰</span>
      <span class="chat-tool-group-title">本轮 0 次工具调用</span>
    </div>
  </div>`
}

/** 一轮里连续完成的工具调用，合并成一张摘要卡 */
export function toolGroupHtml(cards, open, expandedTools, assetUrl = null, meta = {}) {
  const total = Number.isFinite(Number(meta.total)) ? Number(meta.total) : cards.length
  const failed = cards.filter((card) => card.status === 'failed').length
  const running = Number(meta.running) || 0
  const badge = failed > 0 ? `${failed} 次失败` : running > 0 ? '执行中' : '已完成'
  const groupId = 'group-' + (cards[0] ? cards[0].id : 'current')
  const body = cards
    .map((card, index) => toolCardHtml(card, false, assetUrl, index + 1, card.id === meta.activeId))
    .join('')
  const collapse =
    open && total > 3
      ? `<button type="button" class="chat-tool-group-collapse" data-action="tool-group-toggle" data-group="${escapeAttr(groupId)}">收起工具列表</button>`
      : ''
  const head = cards.length
    ? `<button type="button" class="chat-tool-group-head" data-action="tool-group-toggle" data-group="${escapeAttr(groupId)}" aria-expanded="${open ? 'true' : 'false'}">
        <span class="chat-tool-group-icon" aria-hidden="true">🧰</span>
        <span class="chat-tool-group-title">本轮 ${total} 次工具调用</span>
        <span class="chat-tool-group-badge${failed > 0 ? ' is-failed' : ''}">${badge}</span>
        <span class="chat-tool-chevron" aria-hidden="true">›</span>
      </button>`
    : `<div class="chat-tool-group-head is-static">
        <span class="chat-tool-group-icon" aria-hidden="true">🧰</span>
        <span class="chat-tool-group-title">本轮 ${total} 次工具调用</span>
        <span class="chat-tool-group-badge${failed > 0 ? ' is-failed' : ''}">${badge}</span>
      </div>`
  return `<div class="chat-tool-group${open ? ' is-open' : ''}" data-group="${escapeAttr(groupId)}">
    ${head}
    <div class="chat-tool-group-body"${open && body ? '' : ' hidden'}>${body}</div>
    ${collapse}
  </div>`
}

/** 交付文件：present 声明的文件，一行一个下载卡片 */
export function deliverableCardHtml(card, fileUrl) {
  const files = Array.isArray(card.files) ? card.files : []
  const rows = files
    .map((file, index) => {
      const name = String(file.path || '').split(/[\\/]/).pop() || '文件'
      const url = typeof fileUrl === 'function' ? fileUrl(card.seq, index, name) : ''
      const image = /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(name)
      const row = `<a class="chat-file chat-deliverable-file" href="${escapeAttr(url)}" data-file-url="${escapeAttr(url)}" data-file-name="${escapeAttr(name)}" download="${escapeAttr(name)}">
        <span class="chat-file-icon">${image ? '🖼' : '📄'}</span>
        <span class="chat-file-main">
          <span class="chat-file-name">${escapeHtml(name)}</span>
          <span class="chat-file-size">${escapeHtml(file.description || (image ? '点图预览 · 点此下载' : '点按下载'))}</span>
        </span>
        ${image ? '<span class="chat-deliverable-download">下载</span>' : ''}
      </a>`
      if (!image) return row
      return `<div class="chat-deliverable-media">
        <img class="chat-image chat-deliverable-thumb" data-src="${escapeAttr(url)}" alt="${escapeAttr(name)}" />
        ${row}
      </div>`
    })
    .join('')
  return `<div class="chat-card chat-deliverable" data-deliverable="${escapeAttr(card.id)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">📦</span>
      <span class="chat-card-title">交付文件</span>
      <span class="chat-card-badge">${files.length} 个</span>
      ${timeLabel(card.at)}
    </div>
    <div class="chat-deliverable-list">${rows}</div>
  </div>`
}

/** 审批：待定时给「拒绝 / 允许」，结果态显示已允许/已拒绝 */
export function approvalCardHtml(card) {
  const pending = !card.decision
  const allowed = card.decision === 'allow'
  const title = card.title || '等待你授权'
  const reason = card.reason || '需要你确认后才能继续。'
  const actions = pending
    ? `<div class="chat-card-actions">
        <button type="button" class="chat-btn is-danger" data-action="approval-deny" data-approval="${escapeAttr(card.id)}">拒绝</button>
        <button type="button" class="chat-btn is-primary" data-action="approval-allow" data-approval="${escapeAttr(card.id)}">允许</button>
      </div>`
    : ''
  const badge = pending
    ? '<span class="chat-card-badge is-pending">待授权</span>'
    : `<span class="chat-card-badge ${allowed ? 'is-ok' : 'is-failed'}">${allowed ? '已允许' : '已拒绝'}</span>`
  return `<div class="chat-card chat-approval${pending ? ' is-pending' : ''}" data-approval="${escapeAttr(card.id)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">🛡</span>
      <span class="chat-card-title">${escapeHtml(title)}</span>
      ${badge}
      ${timeLabel(card.at)}
    </div>
    ${card.tool ? `<p class="chat-card-sub">${escapeHtml(card.tool)}</p>` : ''}
    <p class="chat-card-text">${escapeHtml(reason)}</p>
    ${actions}
  </div>`
}

/** 从卡片 + 当前草稿拼出答案批；没答完返回 null */
export function buildInputAnswers(card, draft) {
  const selected = (draft && draft.selected) || {}
  const custom = (draft && draft.custom) || {}
  const answers = []
  for (const question of card.questions || []) {
    const picked = Array.isArray(selected[question.id]) ? selected[question.id] : []
    const typed = String(custom[question.id] || '').trim()
    if (picked.length === 0 && !typed) return null
    const answer = { id: question.id, selected: picked }
    if (typed) answer.custom = typed
    answers.push(answer)
  }
  return answers.length ? answers : null
}

/** 提问卡片：开放中可选/可输入，答完显示选择 */
export function inputCardHtml(card, draft, submitted) {
  const pending = card.state !== 'answered' && !submitted
  const answered = card.state === 'answered'
  const selected = (draft && draft.selected) || {}
  const custom = (draft && draft.custom) || {}
  const questions = (card.questions || [])
    .map((question) => {
      const picked = Array.isArray(selected[question.id]) ? selected[question.id] : []
      const options = Array.isArray(question.options) ? question.options : []
      const chosen = answered && Array.isArray(card.answers)
        ? card.answers.find((item) => item.id === question.id)
        : null
      const optionsHtml = options.length
        ? `<div class="chat-q-opts">${options
            .map((option) => {
              const on = picked.includes(option.label)
              const settled = chosen && Array.isArray(chosen.selected) && chosen.selected.includes(option.label)
              return `<button type="button" class="chat-q-opt${on || settled ? ' is-on' : ''}" data-action="q-pick" data-input="${escapeAttr(card.callId)}" data-q="${escapeAttr(question.id)}" data-value="${escapeAttr(option.label)}" ${question.multiSelect ? 'data-multi="1"' : ''} ${pending ? '' : 'disabled'}>
                <span class="chat-q-opt-label">${escapeHtml(option.label)}</span>
                ${option.description ? `<small class="chat-q-opt-desc">${escapeHtml(option.description)}</small>` : ''}
              </button>`
            })
            .join('')}</div>`
        : ''
      const customValue = answered && chosen && chosen.custom ? chosen.custom : String(custom[question.id] || '')
      const customHtml = pending
        ? `<input class="chat-q-custom" data-role="q-custom" data-input="${escapeAttr(card.callId)}" data-q="${escapeAttr(question.id)}" value="${escapeAttr(customValue)}" placeholder="或者自己输入" autocomplete="off" />`
        : customValue
          ? `<p class="chat-q-custom-text">${escapeHtml(customValue)}</p>`
          : ''
      return `<div class="chat-q">
        ${question.header ? `<p class="chat-q-header">${escapeHtml(question.header)}</p>` : ''}
        <p class="chat-q-text">${escapeHtml(question.question || '')}</p>
        ${question.detail ? `<p class="chat-q-sub">${escapeHtml(question.detail)}</p>` : ''}
        ${optionsHtml}
        ${customHtml}
      </div>`
    })
    .join('')

  const action = pending
    ? `<div class="chat-card-actions"><button type="button" class="chat-btn is-primary" data-action="q-submit" data-input="${escapeAttr(card.callId)}">${submitted ? '已提交' : '提交'}</button></div>`
    : ''
  return `<div class="chat-card chat-input-card${pending ? ' is-pending' : ''}${answered ? ' is-answered' : ''}" data-input="${escapeAttr(card.callId)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">❓</span>
      <span class="chat-card-title">${answered ? '已回答' : submitted ? '已提交，等待继续' : '需要你选择'}</span>
      ${timeLabel(card.at)}
    </div>
    ${questions}
    ${action}
  </div>`
}
