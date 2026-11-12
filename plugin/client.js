window.__ModuleLoader__.load({
  id: '@local/phone-relay',
  // 约定：没有明确指示或事先约定，不主动修改本插件
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const PORT = 8788

    function useHealth() {
      const cached = (() => {
        try {
          const raw = window.localStorage.getItem('phone-relay.panel')
          return raw ? JSON.parse(raw) : null
        } catch {
          return null
        }
      })()
      const [state, setState] = React.useState({ loading: true, error: '', data: cached })
      React.useEffect(() => {
        let stopped = false
        const load = async () => {
          try {
            const res = await fetch('/phone-relay/health', { cache: 'no-store' })
            if (!res.ok) throw new Error('HTTP ' + res.status)
            const data = await res.json()
            try {
              window.localStorage.setItem('phone-relay.panel', JSON.stringify(data))
            } catch {
              /* 忽略 */
            }
            if (!stopped) setState({ loading: false, error: '', data })
          } catch (error) {
            if (!stopped) {
              setState((prev) => ({
                loading: false,
                error: String((error && error.message) || error),
                data: prev.data,
              }))
            }
          }
        }
        void load()
        const timer = window.setInterval(load, 5000)
        return () => {
          stopped = true
          window.clearInterval(timer)
        }
      }, [])
      return state
    }

    function CopyButton({ text }) {
      const [done, setDone] = React.useState(false)
      return h(
        'button',
        {
          type: 'button',
          onClick: async () => {
            try {
              await navigator.clipboard.writeText(text)
              setDone(true)
              window.setTimeout(() => setDone(false), 1200)
            } catch {
              /* 忽略 */
            }
          },
          style: {
            marginLeft: 8,
            padding: '2px 8px',
            fontSize: 12,
            color: 'inherit',
            cursor: 'pointer',
            background: 'transparent',
            border: '1px solid currentColor',
            borderRadius: 6,
            opacity: 0.7,
          },
        },
        done ? '已复制' : '复制',
      )
    }

    function Row({ label, children }) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            gap: 12,
            alignItems: 'baseline',
            padding: '8px 0',
            borderBottom: '1px solid rgba(127,127,127,0.18)',
          },
        },
        h('span', { style: { flex: 'none', minWidth: 88, opacity: 0.65, fontSize: 13 } }, label),
        h('span', { style: { flex: 1, fontSize: 13, wordBreak: 'break-all' } }, children),
      )
    }

    function TokenEditor({ current }) {
      const [value, setValue] = React.useState(current || '')
      const [note, setNote] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      React.useEffect(() => {
        if (current) setValue(current)
      }, [current])
      const save = async () => {
        setBusy(true)
        setNote('')
        try {
          const res = await fetch('/phone-relay/health', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: value }),
          })
          const data = await res.json()
          if (!res.ok || !data.ok) throw new Error(data.error || 'HTTP ' + res.status)
          if (!data.saved) throw new Error('插件还没加载新版本，重启 DSH 后再试')
          setNote('已保存，手机端填同一个令牌')
        } catch (error) {
          setNote('保存失败：' + ((error && error.message) || error))
        } finally {
          setBusy(false)
        }
      }
      return h(
        'span',
        { style: { display: 'inline-flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
        h('input', {
          value,
          onChange: (event) => setValue(event.target.value),
          maxLength: 64,
          spellCheck: false,
          style: {
            width: 220,
            padding: '4px 8px',
            fontSize: 13,
            color: 'inherit',
            background: 'transparent',
            border: '1px solid rgba(127,127,127,0.45)',
            borderRadius: 6,
          },
        }),
        h(
          'button',
          {
            type: 'button',
            disabled: busy,
            onClick: save,
            style: {
              padding: '4px 10px',
              fontSize: 12,
              color: 'inherit',
              cursor: 'pointer',
              background: 'transparent',
              border: '1px solid currentColor',
              borderRadius: 6,
            },
          },
          busy ? '保存中…' : '保存',
        ),
        note ? h('span', { style: { fontSize: 12, opacity: 0.7 } }, note) : null,
      )
    }

    function TunnelEditor({ current, detected }) {
      const [value, setValue] = React.useState(current || detected || '')
      const [note, setNote] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      React.useEffect(() => {
        setValue(current || detected || '')
      }, [current, detected])
      const save = async () => {
        setBusy(true)
        setNote('')
        try {
          const next = value.trim()
          const store = detected && next === detected ? '' : next
          const res = await fetch('/phone-relay/health', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tunnelUrl: store }),
          })
          const data = await res.json()
          if (!res.ok || !data.ok) throw new Error(data.error || 'HTTP ' + res.status)
          if (!data.saved) throw new Error('插件还没加载新版本，重启 DSH 后再试')
          setNote(store ? '已保存' : '已恢复自动识别')
        } catch (error) {
          setNote('保存失败：' + ((error && error.message) || error))
        } finally {
          setBusy(false)
        }
      }
      return h(
        'span',
        { style: { display: 'inline-flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
        h('input', {
          value,
          placeholder: detected ? '留空自动识别' : '无法自动识别，请手动输入',
          onChange: (event) => setValue(event.target.value),
          spellCheck: false,
          style: {
            width: 280,
            padding: '4px 8px',
            fontSize: 13,
            color: 'inherit',
            background: 'transparent',
            border: '1px solid rgba(127,127,127,0.45)',
            borderRadius: 6,
          },
        }),
        h(
          'button',
          {
            type: 'button',
            disabled: busy,
            onClick: save,
            style: {
              padding: '4px 10px',
              fontSize: 12,
              color: 'inherit',
              cursor: 'pointer',
              background: 'transparent',
              border: '1px solid currentColor',
              borderRadius: 6,
            },
          },
          busy ? '保存中…' : '保存',
        ),
        note ? h('span', { style: { fontSize: 12, opacity: 0.7 } }, note) : null,
      )
    }

    function Panel() {
      const { loading, error, data } = useHealth()
      const info = data || { port: PORT, bindHost: '0.0.0.0', urls: [], addresses: [], token: '' }
      const addresses =
        Array.isArray(info.addresses) && info.addresses.length > 0
          ? info.addresses
          : (info.urls || []).map((url) => ({ label: '地址', url }))
      const pick = (label) => addresses.filter((one) => one.label === label)
      const renderUrls = (list) =>
        list.length === 0
          ? h('span', { style: { opacity: 0.55 } }, '未获取到')
          : h(
              'span',
              null,
              list.map((one) =>
                h(
                  'span',
                  { key: one.url, style: { display: 'inline-block', marginRight: 10 } },
                  one.url,
                  one.iface ? h('span', { style: { opacity: 0.5, fontSize: 11 } }, ' ' + one.iface) : null,
                  h(CopyButton, { text: one.url }),
                ),
              ),
            )
      const tunnelList = info.tunnelUrl
        ? [{ url: info.tunnelUrl, iface: '手动' }]
        : pick('虚拟网')
      const detected = (pick('虚拟网')[0] || {}).url || ''
      return h(
        'div',
        { style: { maxWidth: 720, padding: '4px 2px' } },
        h('h2', { style: { margin: '0 0 6px', fontSize: 18 } }, 'DSH手机控制台'),
        h(
          'p',
          { style: { margin: '0 0 14px', fontSize: 13, opacity: 0.7 } },
          '手机端「对话」应用填这里的地址和令牌；参数在插件设置里改。',
        ),
        h(
          'div',
          null,
          h(Row, { label: '状态' }, error ? '未运行 / 读取失败' : loading && !data ? '读取中…' : '运行中'),
          h(Row, { label: '端口' }, String(info.port)),
          h(Row, { label: '绑定' }, info.bindHost || '—'),
          h(Row, { label: '局域网' }, renderUrls(pick('局域网'))),
          h(Row, { label: '虚拟网地址' }, h(TunnelEditor, { current: info.tunnelUrl || '', detected })),
          h(Row, { label: '令牌' }, h(TokenEditor, { current: info.token || '' })),
        ),
        error
          ? h(
              'p',
              { style: { marginTop: 12, fontSize: 13, color: '#c0504d' } },
              '连不上 DSH手机控制台（' + error + '）：确认插件已启用、端口 ' + PORT + ' 没被占用；上面的参数仍可照抄。',
            )
          : null,
        h(
          'p',
          { style: { marginTop: 14, fontSize: 12, opacity: 0.55 } },
          '提示：在家用局域网，在外用虚拟网，手机端会自动切换。',
        ),
        h(
          'p',
          { style: { marginTop: 6, fontSize: 12, opacity: 0.55 } },
          '官网：',
          h(
            'a',
            {
              href: 'https://docklet.cn',
              target: '_blank',
              rel: 'noreferrer',
              style: { color: 'inherit', textDecoration: 'underline' },
            },
            'https://docklet.cn',
          ),
        ),
      )
    }

    // 手机状态：常驻在输入框工具行，由 slot 渲染，不做 DOM 插入
    const status = { phone: false, pending: false, elsewhere: false, subs: new Set(), poke: null }
    function setStatus(next) {
      Object.assign(status, next)
      for (const fn of status.subs) {
        try {
          fn()
        } catch {
          /* 忽略单个订阅者 */
        }
      }
    }

    function snapshot() {
      return {
        phone: status.phone,
        pending: status.pending,
        elsewhere: status.elsewhere,
        pendingId: status.pendingId || '',
        pendingTool: status.pendingTool || '',
        pendingTitle: status.pendingTitle || '',
        pendingReason: status.pendingReason || '',
        pendingOther: Boolean(status.pendingOther),
        // 只有「审批所在的那个会话」自动展开；其它会话点「详情」才展开
        expanded: Boolean(status.pendingId) && (!status.pendingOther || Boolean(status.manual)),
      }
    }

    function useStatus() {
      const [snap, setSnap] = React.useState(snapshot)
      React.useEffect(() => {
        const update = () => setSnap(snapshot())
        status.subs.add(update)
        update()
        return () => status.subs.delete(update)
      }, [])
      return snap
    }

    function StatusPill() {
      const snap = useStatus()

      let text = '📵 手机离线'
      let tone = {
        color: '#8a8378',
        background: 'rgba(120,110,90,.12)',
        borderColor: 'rgba(120,110,90,.25)',
      }
      const desktopPending = Boolean(snap.pendingId)
      if (desktopPending) {
        const name = snap.pendingTool ? '：' + snap.pendingTool : ''
        text = (snap.pendingOther ? '⏳ 其它会话待审批' : '⏳ 待审批') + name
        tone = {
          color: '#7a5a12',
          background: 'rgba(245,180,60,.16)',
          borderColor: 'rgba(217,159,48,.42)',
        }
      } else if (snap.elsewhere) {
        text = '📱 另有会话等待审批'
        tone = {
          color: '#8a5a12',
          background: 'rgba(214,160,60,.14)',
          borderColor: 'rgba(200,150,60,.35)',
        }
      } else if (snap.phone) {
        text = '📱 手机在线'
        tone = {
          color: '#3f7a4a',
          background: 'rgba(80,150,90,.14)',
          borderColor: 'rgba(80,150,90,.3)',
        }
      }

      const decide = (allow) => {
        if (!snap.pendingId) return
        void fetch('/phone-relay/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: snap.pendingId, allow }),
        }).catch(() => undefined)
      }
      const btn = (label, allow, primary) =>
        h(
          'button',
          {
            type: 'button',
            onClick: () => decide(allow),
            style: {
              marginLeft: 6,
              padding: '1px 8px',
              borderRadius: 999,
              fontSize: 11,
              lineHeight: 1.6,
              cursor: 'pointer',
              border: '1px solid ' + (primary ? 'rgba(217,139,28,.6)' : 'rgba(150,90,80,.45)'),
              background: primary ? 'rgba(245,166,35,.35)' : 'rgba(190,90,80,.12)',
              color: primary ? '#7a4a06' : '#8a4a42',
            },
          },
          label,
        )

      const toggleExpanded = () => {
        status.manual = !status.manual
        for (const fn of status.subs) fn()
      }
      const detailBtn = () =>
        h(
          'button',
          {
            type: 'button',
            onClick: toggleExpanded,
            style: {
              marginLeft: 8,
              padding: '1px 8px',
              borderRadius: 999,
              fontSize: 11,
              lineHeight: 1.6,
              cursor: 'pointer',
              color: '#6b5a3a',
              border: '1px solid rgba(120,100,70,.3)',
              background: 'rgba(255,255,255,.65)',
            },
          },
          '详情',
        )

      if (desktopPending) {
        return h(
          'span',
          {
            'data-phone-relay-pill': '1',
            style: Object.assign(
              {
                display: 'inline-flex',
                alignItems: 'center',
                margin: '0 6px',
                padding: '1px 8px',
                borderRadius: 999,
                fontSize: 11,
                lineHeight: 1.7,
                whiteSpace: 'nowrap',
                border: '1px solid transparent',
              },
              tone,
            ),
          },
          h('span', null, text),
          detailBtn(),
          btn('拒绝', false, false),
          btn('允许', true, true),
        )
      }

      return h(
        'button',
        {
          'data-phone-relay-pill': '1',
          type: 'button',
          title: snap.pendingOther ? '点一下展开这条审批' : 'DSH手机控制台状态',
          onClick: () => {
            if (!snap.pendingOther) return
            status.manual = !status.manual
            for (const fn of status.subs) fn()
          },
          style: Object.assign(
            {
              display: 'inline-flex',
              alignItems: 'center',
              margin: '0 6px',
              padding: '2px 8px',
              borderRadius: 999,
              fontSize: 11,
              lineHeight: 1.6,
              whiteSpace: 'nowrap',
              border: '1px solid transparent',
              background: 'transparent',
              cursor: snap.pendingOther ? 'pointer' : 'default',
              pointerEvents: snap.pendingOther ? 'auto' : 'none',
            },
            tone,
          ),
        },
        text,
      )
    }

    // 审批详情：本会话自动展开；其它会话点「详情」展开
    function ApprovalDetail() {
      const snap = useStatus()
      if (!snap.pendingId || !snap.expanded) return null
      const decide = (allow) =>
        fetch('/phone-relay/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: snap.pendingId, allow }),
        }).catch(() => undefined)
      return h(
        'div',
        {
          'data-phone-relay-card': '1',
          style: {
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: 'var(--dsh-chat-content-width, 760px)',
            margin: '4px auto 8px',
            padding: '10px 14px',
            borderRadius: 12,
            background: '#fffdf7',
            border: '1px solid rgba(217,159,48,.45)',
            boxShadow: '0 2px 8px rgba(120,85,20,.08)',
            fontSize: 12,
            lineHeight: 1.6,
            color: '#6b4a12',
          },
        },
        h('div', { style: { fontWeight: 600 } }, '来自「' + (snap.pendingTitle || '会话') + '」的授权请求 · ' + (snap.pendingTool || '未知操作')),
        snap.pendingReason ? h('div', { style: { marginTop: 2 } }, snap.pendingReason) : null,
        h(
          'div',
          { style: { marginTop: 6, display: 'flex', gap: 8 } },
          h(
            'button',
            {
              type: 'button',
              onClick: () => decide(false),
              style: {
                padding: '2px 12px',
                borderRadius: 999,
                fontSize: 12,
                cursor: 'pointer',
                border: '1px solid rgba(150,90,80,.45)',
                background: 'rgba(190,90,80,.12)',
                color: '#8a4a42',
              },
            },
            '拒绝',
          ),
          h(
            'button',
            {
              type: 'button',
              onClick: () => decide(true),
              style: {
                padding: '2px 12px',
                borderRadius: 999,
                fontSize: 12,
                cursor: 'pointer',
                border: '1px solid rgba(217,139,28,.6)',
                background: 'rgba(245,166,35,.35)',
                color: '#7a4a06',
              },
            },
            '允许',
          ),
        ),
      )
    }

    // 输入锁定：直接禁用编辑器并换占位文案，不做浮层
    const locks = new WeakMap()
    const lockedButtons = new WeakSet()
    const LOCK_TEXT =
      '有审批等待处理：可点上方状态条里的「允许 / 拒绝」，或到手机上确认；不想用手机审批就在手机上关闭对话应用。'

    function composerScope() {
      const anchor = document.querySelector('[data-phone-relay-pill]')
      if (!anchor) return null
      let node = anchor
      for (let i = 0; i < 10 && node; i += 1) {
        if (node.querySelector && node.querySelector('textarea, [contenteditable="true"]')) return node
        node = node.parentElement
      }
      return null
    }

    function sendButtons(scope) {
      const out = []
      const root = scope || document
      for (const el of root.querySelectorAll('button, [role="button"]')) {
        const label = ((el.getAttribute('aria-label') || '') + ' ' + (el.textContent || '')).trim()
        if (/发送|送出|Send|Submit/i.test(label)) out.push(el)
      }
      return out
    }

    function lockEditors(locked) {
      const scope = composerScope()
      const nodes = []
      for (const el of document.querySelectorAll(
        'textarea, input[type="text"], input:not([type]), [contenteditable]',
      )) {
        if (locks.has(el)) {
          nodes.push(el)
          continue
        }
        const hint = (
          (el.getAttribute('placeholder') || '') +
          ' ' +
          (el.getAttribute('aria-label') || '')
        ).trim()
        if (/搜索|Search/i.test(hint)) continue
        const inScope = scope ? scope.contains(el) : false
        const likelyComposer = /发消息|调用指令|描述你想要|创建任务/.test(hint)
        if (inScope || likelyComposer) nodes.push(el)
      }
      for (const el of nodes) {
        if (locked) {
          if (!locks.has(el)) {
            locks.set(el, {
              placeholder: el.getAttribute('placeholder'),
              readOnly: el.readOnly === true,
              editable: el.getAttribute('contenteditable'),
              outline: el.style.outline,
              outlineOffset: el.style.outlineOffset,
              opacity: el.style.opacity,
              title: el.getAttribute('title'),
            })
          }
          if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
            el.readOnly = true
            try {
              el.setAttribute('placeholder', LOCK_TEXT)
            } catch {
              /* 忽略 */
            }
          } else {
            el.setAttribute('contenteditable', 'false')
            el.setAttribute('data-phone-relay-placeholder', LOCK_TEXT)
          }
          el.style.opacity = '0.72'
          el.style.outline = '2px solid rgba(198, 64, 55, 0.55)'
          el.style.outlineOffset = '2px'
          el.setAttribute('title', LOCK_TEXT)
        } else if (locks.has(el)) {
          const saved = locks.get(el)
          locks.delete(el)
          if (saved.readOnly === false) el.readOnly = false
          if (saved.editable === null) el.removeAttribute('contenteditable')
          else el.setAttribute('contenteditable', saved.editable)
          if (saved.placeholder === null) el.removeAttribute('placeholder')
          else el.setAttribute('placeholder', saved.placeholder)
          el.removeAttribute('data-phone-relay-placeholder')
          el.style.opacity = saved.opacity || ''
          el.style.outline = saved.outline || ''
          el.style.outlineOffset = saved.outlineOffset || ''
          if (saved.title === null) el.removeAttribute('title')
          else el.setAttribute('title', saved.title)
        }
      }
      for (const btn of sendButtons(scope)) {
        if (locked) {
          if (!lockedButtons.has(btn)) {
            lockedButtons.add(btn)
            btn.dataset.phoneRelayDisabled = '1'
            btn.disabled = true
            btn.setAttribute('aria-disabled', 'true')
          }
        } else if (lockedButtons.has(btn)) {
          lockedButtons.delete(btn)
          btn.disabled = false
          btn.removeAttribute('aria-disabled')
          delete btn.dataset.phoneRelayDisabled
        }
      }
    }

    function mountApprovalWatch(ctx, getSession) {
      if (typeof document === 'undefined') return
      let pending = false
      let disposed = false
      let timer = 0

      const blockKeys = (event) => {
        if (!pending) return
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'F5')) return
        event.preventDefault()
        event.stopPropagation()
      }

      const load = async () => {
        if (disposed) return
        try {
          const res = await fetch('/phone-relay/approvals', { cache: 'no-store' })
          if (!res.ok) throw new Error('HTTP ' + res.status)
          const data = await res.json()
          const list = Array.isArray(data.pending) ? data.pending : []
          const session = String(getSession() || '')
          const mine = session ? list.find((item) => item.session === session) : null
          // 点击其它地方会收起详情，这里不需要缓存
          const any = mine || list[0] || null
          pending = Boolean(mine)
          // 切换会话时收起手动展开的详情
          if (session !== status.uiSession) {
            status.uiSession = session
            status.manual = false
          }
          if (!any) status.manual = false
          setStatus({
            phone: Boolean(data.phone),
            pending,
            elsewhere: list.length > 0 && !pending,
            pendingId: any ? any.id : '',
            pendingTool: any ? any.tool || '' : '',
            pendingTitle: any ? any.title || '' : '',
            pendingReason: any ? any.reason || '' : '',
            pendingOther: Boolean(any && any.session !== session),          })
          if (pending) {
            const active = document.activeElement
            if (active && typeof active.blur === 'function') active.blur()
          }
          // 每轮都套一次，防止 React 重渲染把属性冲掉
          lockEditors(pending)
        } catch {
          /* 忽略 */
        }
      }

      // 点其它地方就收起手动展开的详情
      const onDocPointerDown = (event) => {
        if (!status.manual) return
        const target = event.target
        if (
          target instanceof Element &&
          (target.closest('[data-phone-relay-card]') || target.closest('[data-phone-relay-pill]'))
        ) {
          return
        }
        status.manual = false
        for (const fn of status.subs) fn()
      }

      timer = window.setInterval(load, 1000)
      status.poke = load
      document.addEventListener('pointerdown', onDocPointerDown, true)
      window.addEventListener('keydown', blockKeys, true)
      window.addEventListener('keypress', blockKeys, true)
      window.addEventListener('beforeinput', blockKeys, true)
      void load()

      ctx.effect(() => () => {
        disposed = true
        if (status.poke === load) status.poke = null
        window.clearInterval(timer)
        document.removeEventListener('pointerdown', onDocPointerDown, true)
        window.removeEventListener('keydown', blockKeys, true)
        window.removeEventListener('keypress', blockKeys, true)
        window.removeEventListener('beforeinput', blockKeys, true)
        lockEditors(false)
      })
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            { name: 'settings.section', id: 'phone-relay', order: 60, label: 'DSH手机控制台' },
            Panel,
          ),
        )
        const seat = { id: '' }
        mountApprovalWatch(ctx, () => seat.id)
        ctx.slots.inject('conversation.input.overlay', () =>
          ctx.slots.register(
            { name: 'conversation.input.overlay', id: 'phone-relay-seat', order: 5 },
            (props) => {
              React.useEffect(() => {
                const next = String(props.sessionId || '')
                if (next !== seat.id) {
                  seat.id = next
                  if (typeof status.poke === 'function') status.poke()
                }
              }, [props.sessionId])
              return null
            },
          ),
        )
        ctx.slots.inject('conversation.input.left', () =>
          ctx.slots.register(
            { name: 'conversation.input.left', id: 'phone-relay-status', order: 90 },
            StatusPill,
          ),
        )
        ctx.slots.inject('conversation.input.dock', () =>
          ctx.slots.register(
            { name: 'conversation.input.dock', id: 'phone-relay-detail', order: 5 },
            ApprovalDetail,
          ),
        )
      },
    }
  },
})
