import { describe, expect, it } from 'vitest'
import { highlightCode, renderInline, renderMarkdown } from './markdown.js'

describe('renderInline', () => {
  it('renders bold, italic, inline code and strikethrough', () => {
    expect(renderInline('**粗** *斜* `code` ~~删~~')).toBe(
      '<strong>粗</strong> <em>斜</em> <code class="chat-inline-code">code</code> <del>删</del>',
    )
  })

  it('renders markdown links and rejects non-http schemes', () => {
    expect(renderInline('[点我](https://example.com/a)')).toContain('href="https://example.com/a"')
    expect(renderInline('[点我](javascript:alert(1))')).toBe('点我')
  })

  it('linkifies bare URLs and keeps trailing punctuation outside', () => {
    const html = renderInline('看 https://example.com/x（说明）')
    expect(html).toContain('href="https://example.com/x"')
    expect(html).toContain('（说明）')
  })

  it('escapes raw HTML', () => {
    expect(renderInline('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;')
  })

  it('renders https images directly and http images through data-remote', () => {
    const https = renderInline('![图](https://example.com/a.png)')
    expect(https).toContain('<img class="chat-image chat-md-image"')
    expect(https).toContain('src="https://example.com/a.png"')
    expect(https).toContain('referrerpolicy="no-referrer"')

    const http = renderInline('![图](http://example.com/a.png)')
    expect(http).toContain('data-remote="http://example.com/a.png"')
    expect(http).not.toContain(' src="')

    expect(renderInline('![x](javascript:alert(1))')).toBe('x')
  })
})

describe('highlightCode', () => {
  it('highlights keywords, strings, comments and numbers', () => {
    const { html, lang } = highlightCode('const n = 42 // hi\nconsole.log("x")', 'js')
    expect(lang).toBe('js')
    expect(html).toContain('<span class="tk-k">const</span>')
    expect(html).toContain('<span class="tk-n">42</span>')
    expect(html).toContain('<span class="tk-c">// hi</span>')
    expect(html).toContain('<span class="tk-s">&quot;x&quot;</span>')
  })
})

describe('renderMarkdown', () => {
  it('renders paragraphs with line breaks', () => {
    expect(renderMarkdown('第一行\n第二行')).toBe('<p>第一行<br />第二行</p>')
  })

  it('renders headings, lists, quotes, rules and tables', () => {
    expect(renderMarkdown('# 标题')).toContain('<h1>标题</h1>')
    expect(renderMarkdown('- a\n- b')).toBe('<ul><li>a</li><li>b</li></ul>')
    expect(renderMarkdown('1. a\n2. b')).toBe('<ol><li>a</li><li>b</li></ol>')
    expect(renderMarkdown('> 引用')).toBe('<blockquote>引用</blockquote>')
    expect(renderMarkdown('---')).toBe('<hr />')
    const table = renderMarkdown('| a | b |\n| --- | --- |\n| 1 | 2 |')
    expect(table).toContain('<th>a</th>')
    expect(table).toContain('<td>2</td>')
  })

  it('renders a fenced code block with a copy button', () => {
    const html = renderMarkdown('```js\nconst a = 1\n```')
    expect(html).toContain('class="chat-code"')
    expect(html).toContain('class="chat-code-lang">js')
    expect(html).toContain('data-action="copy-code"')
    expect(html).toContain('<span class="tk-k">const</span>')
  })

  it('keeps an unclosed fence (streaming) as code', () => {
    const html = renderMarkdown('```bash\necho hi')
    expect(html).toContain('class="chat-code"')
    expect(html).toContain('data-code="echo%20hi"')
    expect(html).toContain('<span class="tk-k">echo</span> hi')
  })

  it('groups consecutive image lines into a gallery', () => {
    const html = renderMarkdown(
      '![a](https://x/1.png)\n\n![b](https://x/2.png)\n\n![c](https://x/3.png)',
    )
    expect(html).toContain('chat-md-gallery is-few')
    expect(html).toContain('data-count="3"')
    expect((html.match(/chat-md-image/g) || []).length).toBe(3)
  })

  it('uses a single column for one image and three columns for five', () => {
    expect(renderMarkdown('![a](https://x/1.png)')).toContain('chat-md-gallery is-one')
    const five = Array.from({ length: 5 }, (_, index) => `![${index}](https://x/${index}.png)`).join('\n\n')
    expect(renderMarkdown(five)).toContain('chat-md-gallery is-many')
    expect(renderMarkdown(five)).toContain('data-count="5"')
  })

  it('does not execute HTML in code blocks', () => {
    const html = renderMarkdown('```html\n<script>alert(1)</script>\n```')
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
    expect(html).not.toContain('<script>')
  })
})
