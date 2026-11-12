/**
 * 轻量 Markdown 渲染（聊天消息用，不引第三方依赖）
 *
 * 只生成安全的标签：输入全部转义，链接只放行 http(s)/mailto。
 * 支持：标题、段落/换行、粗体/斜体/删除线、行内代码、代码块（带语言和复制按钮）、
 * 链接、裸 URL、无序/有序列表、引用、分割线、管道表格。
 */
import { escapeAttr, escapeHtml } from '../util.js'

const SAFE_HREF = /^(https?:\/\/|mailto:)/i
const BARE_URL = /https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+/gu
const KEYWORDS = {
  js: 'const let var function return if else for while do break continue class new typeof instanceof in of this super import from export default async await try catch finally throw switch case extends static get set yield void delete',
  ts: 'const let var function return if else for while do break continue class new typeof instanceof in of this super import from export export default async await try catch finally throw switch case extends static get set yield void delete interface type enum implements private public protected readonly namespace declare abstract as satisfies keyof infer',
  py: 'def class return if elif else for while import from as pass break continue with try except finally raise lambda yield global nonlocal assert del in is not and or None True False async await print',
  bash: 'if then else elif fi for while do done case esac function in return exit export local echo cd ls grep sed awk cat test',
}
const ALIASES = {
  js: 'js', javascript: 'js', jsx: 'js', mjs: 'js', cjs: 'js',
  ts: 'ts', typescript: 'ts', tsx: 'ts',
  py: 'py', python: 'py',
  sh: 'bash', bash: 'bash', shell: 'bash', zsh: 'bash',
  json: 'json',
}

function markdownImageHtml(alt, src) {
  if (/^docklet-file:/i.test(src)) {
    const path = src.replace(/^docklet-file:/i, '')
    return `<img class="chat-image chat-md-image" data-workspace="${escapeAttr(path)}" alt="${escapeAttr(alt)}" />`
  }
  if (!/^https?:\/\//i.test(src)) return escapeHtml(alt)
  if (/^https:/i.test(src)) {
    return `<img class="chat-image chat-md-image" src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy" referrerpolicy="no-referrer" />`
  }
  return `<img class="chat-image chat-md-image" data-remote="${escapeAttr(src)}" alt="${escapeAttr(alt)}" />`
}

/** 行内：代码、粗体、斜体、删除线、Markdown 链接、裸 URL */
export function renderInline(text) {  const source = String(text == null ? '' : text)
  let out = ''
  let last = 0
  const re = /!\[([^\]]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)|`([^`\n]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|~~([^~]+)~~|\[([^\]]+)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)|(https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+)/gu
  let match
  while ((match = re.exec(source))) {
    out += escapeHtml(source.slice(last, match.index))
    last = match.index + match[0].length
    if (match[1] !== undefined) {
      out += markdownImageHtml(match[1], match[2])
      continue
    }
    if (match[3] !== undefined) {
      out += `<code class="chat-inline-code">${escapeHtml(match[3])}</code>`
      continue
    }
    if (match[4] !== undefined) {
      out += `<strong>${escapeHtml(match[4])}</strong>`
      continue
    }
    if (match[5] !== undefined) {
      out += `<strong>${escapeHtml(match[5])}</strong>`
      continue
    }
    if (match[6] !== undefined) {
      out += `<em>${escapeHtml(match[6])}</em>`
      continue
    }
    if (match[7] !== undefined) {
      out += `<del>${escapeHtml(match[7])}</del>`
      continue
    }
    if (match[8] !== undefined) {
      const label = match[8]
      const href = match[9]
      out += SAFE_HREF.test(href)
        ? `<a class="chat-link" href="${escapeAttr(href)}" data-href="${escapeAttr(href)}" target="_blank" rel="noreferrer noopener">${escapeHtml(label)}</a>`
        : escapeHtml(label)
      continue
    }
    // 裸 URL：和 util.linkify 一样，把结尾标点留在链接外
    const url = match[10]
    const clean = url.replace(/[).,;:!?'"”’）】》]+$/gu, '')
    const tail = url.slice(clean.length)
    out += `<a class="chat-link" href="${escapeAttr(clean)}" data-href="${escapeAttr(clean)}" target="_blank" rel="noreferrer noopener">${escapeHtml(clean)}</a>${escapeHtml(tail)}`
  }
  out += escapeHtml(source.slice(last))
  return out
}

/** 代码高亮：先抽出注释/字符串，再给关键字和数字上色（不追求完整语法） */
export function highlightCode(code, language) {
  const lang = ALIASES[String(language || '').toLowerCase()] || ''
  const source = String(code == null ? '' : code)
  if (lang === 'json' || !KEYWORDS[lang]) {
    return { html: escapeHtml(source), lang: lang || String(language || '').toLowerCase() }
  }
  const comment =
    lang === 'js' || lang === 'ts'
      ? String.raw`(\/\*[\s\S]*?\*\/|\/\/[^\n]*)`
      : String.raw`(#[^\n]*)`
  const tokenRe = new RegExp(
    comment +
      String.raw`|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|` +
      '`(?:\\\\[\\s\\S]|[^`\\\\])*`)',
    'g',
  )
  const stash = []
  // 先按原文抽出注释/字符串（此时引号还没被转义），再转义剩下的文本
  let out = source.replace(tokenRe, (match) => {
    stash.push(match)
    return `\u0000${'z'.repeat(stash.length)}\u0000`
  })
  out = escapeHtml(out)
  const keywords = KEYWORDS[lang].split(/\s+/)
  out = out.replace(/\b([A-Za-z_$][\w$]*)\b/g, (word) =>
    keywords.includes(word) ? `<span class="tk-k">${word}</span>` : word,
  )
  out = out.replace(/\b\d+(?:\.\d+)?\b/g, (number) => `<span class="tk-n">${number}</span>`)
  out = out.replace(/\u0000(z+)\u0000/g, (_, zs) => {
    const item = stash[zs.length - 1] || ''
    const kind = item.startsWith('/') || item.startsWith('#') ? 'tk-c' : 'tk-s'
    return `<span class="${kind}">${escapeHtml(item)}</span>`
  })
  return { html: out, lang }
}

function codeBlock(code, language) {
  const result = highlightCode(code, language)
  const label = result.lang || 'code'
  return (
    `<div class="chat-code">` +
    `<div class="chat-code-head">` +
    `<span class="chat-code-lang">${escapeHtml(label)}</span>` +
    `<button type="button" class="chat-code-copy" data-action="copy-code" data-code="${escapeAttr(encodeURIComponent(code))}">复制</button>` +
    `</div>` +
    `<pre><code>${result.html}</code></pre>` +
    `</div>`
  )
}

function isTableStart(lines, index) {
  if (index + 1 >= lines.length) return false
  if (!/^\s*\|.*\|\s*$/.test(lines[index])) return false
  const separator = lines[index + 1]
  return /^\s*\|?[\s:|-]+\|?\s*$/.test(separator) && separator.includes('-')
}

function cellsOf(line) {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  return trimmed.split('|').map((cell) => cell.trim())
}

function isBlockStart(lines, index) {
  const line = lines[index]
  return (
    /^\s*```/.test(line) ||
    /^(#{1,6})\s+/.test(line) ||
    /^\s*>\s?/.test(line) ||
    /^\s*[-*+]\s+/.test(line) ||
    /^\s*\d+[.)]\s+/.test(line) ||
    /^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line) ||
    isTableStart(lines, index)
  )
}

function collectList(lines, start, ordered) {
  const items = []
  const re = ordered ? /^\s*\d+[.)]\s+(.*)$/ : /^\s*[-*+]\s+(.*)$/
  let i = start
  while (i < lines.length) {
    const match = re.exec(lines[i])
    if (!match) {
      if (items.length > 0 && /^\s{2,}\S/.test(lines[i])) {
        items[items.length - 1] += ' ' + lines[i].trim()
        i += 1
        continue
      }
      break
    }
    items.push(match[1])
    i += 1
  }
  return { items, next: i }
}

const IMAGE_LINE = /^\s*!\[([^\]]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)\s*$/

/** 连续图片行合成一个网格：1 张大图、2 张两列、3–4 张两列小图、5+ 张三列更小 */
function galleryHtml(images) {
  const count = images.length
  const cls = count === 1 ? 'is-one' : count === 2 ? 'is-two' : count >= 5 ? 'is-many' : 'is-few'
  return `<div class="chat-md-gallery ${cls}" data-count="${count}">${images
    .map((image) => markdownImageHtml(image.alt, image.src))
    .join('')}</div>`
}

/** 块级 Markdown → HTML */
export function renderMarkdown(source) {
  const text = String(source == null ? '' : source).replace(/\r\n?/g, '\n')
  const lines = text.split('\n')
  const html = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }
    const fence = /^\s*```(.*)$/.exec(line)
    if (fence) {
      const info = fence[1].trim().split(/\s+/)[0] || ''
      const code = []
      i += 1
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) {
        code.push(lines[i])
        i += 1
      }
      if (i < lines.length) i += 1
      html.push(codeBlock(code.join('\n'), info))
      continue
    }
    const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(line)
    if (heading) {
      const level = heading[1].length
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`)
      i += 1
      continue
    }
    if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
      html.push('<hr />')
      i += 1
      continue
    }
    if (/^\s*>\s?/.test(line)) {
      const quote = []
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^\s*>\s?/, ''))
        i += 1
      }
      html.push(`<blockquote>${quote.map(renderInline).join('<br />')}</blockquote>`)
      continue
    }
    if (/^\s*[-*+]\s+/.test(line)) {
      const list = collectList(lines, i, false)
      html.push(`<ul>${list.items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`)
      i = list.next
      continue
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const list = collectList(lines, i, true)
      html.push(`<ol>${list.items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ol>`)
      i = list.next
      continue
    }
    if (isTableStart(lines, i)) {
      const head = cellsOf(lines[i])
      i += 2
      const rows = []
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
        rows.push(cellsOf(lines[i]))
        i += 1
      }
      html.push(
        `<div class="chat-table-wrap"><table><thead><tr>${head
          .map((cell) => `<th>${renderInline(cell)}</th>`)
          .join('')}</tr></thead><tbody>${rows
          .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`)
          .join('')}</tbody></table></div>`,
      )
      continue
    }
    if (IMAGE_LINE.test(line)) {
      const images = []
      while (i < lines.length) {
        const match = IMAGE_LINE.exec(lines[i])
        if (match) {
          images.push({ alt: match[1], src: match[2] })
          i += 1
          continue
        }
        if (!lines[i].trim()) {
          // 图片之间隔着空行也合成一组
          let next = i
          while (next < lines.length && !lines[next].trim()) next += 1
          if (next < lines.length && IMAGE_LINE.test(lines[next])) {
            i = next
            continue
          }
        }
        break
      }
      if (images.length > 0) {
        html.push(galleryHtml(images))
        continue
      }
    }
    const paragraph = []
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines, i)) {
      paragraph.push(lines[i])
      i += 1
    }
    if (paragraph.length === 0) {
      paragraph.push(lines[i])
      i += 1
    }
    html.push(`<p>${paragraph.map(renderInline).join('<br />')}</p>`)
  }
  return html.join('')
}
