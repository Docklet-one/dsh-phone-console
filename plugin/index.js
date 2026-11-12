/**
 * DSH手机控制台（phone-relay）
 *
 * 约定：没有明确指示或事先约定，不主动修改本插件。改前先说明并确认。
 *
 *   手机 POST /send  → 作为用户消息投进当前会话（和你在电脑上打字一样）
 *   会话里的 assistant 文字 → 追加到 /messages，手机轮询取走
 *
 * 打开会话时再从日志抄最后 5 条用户 + 5 条助手；插件不保存更早的消息。
 */
import { createServer } from 'node:http'
import { randomBytes } from 'node:crypto'
import { appendFileSync, closeSync, copyFileSync, createReadStream, existsSync, mkdirSync, openSync, readFileSync, readSync, statSync, writeFileSync } from 'node:fs'
import { homedir, networkInterfaces } from 'node:os'
import { basename, dirname, isAbsolute, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// 插件装在工作区，依赖要从 DSH 安装目录里取
const RESOURCES = process.resourcesPath || 'C:\\Users\\95891\\AppData\\Local\\Programs\\DeepSeek Harness\\resources'
const PKG_ROOT = join(RESOURCES, 'app.asar', 'dsh', 'node_modules')
const importDsh = (sub) => import(pathToFileURL(join(PKG_ROOT, sub)).href)

const { default: z } = await importDsh('@deepseek-ai/schemastery/lib/index.mjs')
const { createUserMessage } = await importDsh('@deepseek-ai/dsh-llm/lib/index.js')

// 事件层（纯逻辑，有单测）：DSH 会话事件 → 手机端事件、有序事件环、SSE 广播
import {
  EventLog,
  EventStreams,
  QUESTION_TOOL,
  REPLAY_LIMIT,
  SNAPSHOT_LIMIT,
  SSE_PING_MS,
  describeFailure as describeFailureInfo,
  filesOf,
  imagesOf,
  mapSessionEvents,
  normalizeAnswers,
  normalizeQuestions,
  questionsFromArgs,
  sseComment,
  sseData,
  summarizeToolArgs,
  textOfContent,
  textOfMessage,
  toNumber,
} from './events.js'
import { createQuestionBridge } from './interaction-bridge.js'

export const name = 'phone-relay'
export const inject = ['agents', 'attachments']

export const Config = z.object({
  enabled: z.boolean().default(true).description('启用 DSH手机控制台'),
  bindHost: z.string().default('0.0.0.0').description('监听地址，默认所有网卡；只想给虚拟网用可填具体地址'),
  tunnelUrl: z.string().default('').description('手动指定虚拟网/外网地址，留空自动识别；填了面板优先显示它'),
  port: z.natural().min(1024).max(65535).default(8788).description('监听端口'),
  token: z.string().default('').description('访问令牌，留空表示不校验（同网段任何人都能操作 DSH，建议设置）'),
  sessionId: z.string().default('').description('固定转发到某个会话；留空则跟随最近说话的会话'),
  forwardAll: z.boolean().default(true).description('把会话里所有助手文字都发到手机'),
  historyLimit: z.natural().min(10).max(1000).default(100).description('当前窗口最多在内存里保留多少条消息'),
})

/** 本机所有可用的 IPv4 地址（给手机填），按网卡类型标成局域网/虚拟网 */
function lanAddresses(port) {
  const list = []
  try {
    const nets = networkInterfaces()
    for (const name of Object.keys(nets)) {
      const lower = name.toLowerCase()
      const virtual =
        /^(et_|tun|tap|wg|tailscale|utun|zt)/.test(lower) ||
        /zerotier|wireguard|openvpn|tap-|pgy|oray/.test(lower)
      for (const net of nets[name] || []) {
        if (net.family === 'IPv4' && !net.internal) {
          list.push({
            label: virtual ? '虚拟网' : '局域网',
            iface: name,
            url: `http://${net.address}:${port}`,
          })
        }
      }
    }
  } catch {
    /* 取不到就空着 */
  }
  return list
}

function lanUrls(port) {
  return lanAddresses(port).map((one) => one.url)
}

/** 把配置补丁写回插件配置；失败也不影响本次运行 */
async function persistConfig(ctx, patch) {
  try {
    const editor = ctx.get('configEditor')
    if (!editor || typeof editor.entries !== 'function') return
    const entry = editor.entries().find(
      (item) =>
        String(item.name || '').includes('phone-relay') ||
        String(item.id || '').includes('phone-relay'),
    )
    if (!entry) {
      console.warn('[phone-relay] 没找到插件配置项，改动不会写回设置页')
      return
    }
    await editor.edit(entry, (current) => ({ ...current, ...patch }))
    console.log('[phone-relay] 已写入插件配置：' + Object.keys(patch).join(', '))
  } catch (error) {
    console.warn('[phone-relay] 写回插件配置失败：' + ((error && error.message) || error))
  }
}

export function apply(ctx, config) {
  const DATA_DIR = process.env.DSH_PROFILE_DIR
    ? join(process.env.DSH_PROFILE_DIR, 'phone-relay')
    : join(process.env.TEMP || '/tmp', 'docklet-phone-relay')

  // 访问令牌：配置里没填就自动生成一次，存到 ~/.dsh/phone-relay/token，尽量写回配置
  const TOKEN_DIR = join(homedir(), '.dsh', 'phone-relay')
  let effectiveToken = String(config.token || '').trim()
  let tunnelUrl = String(config.tunnelUrl || '').trim()
  // 手机端连接/输入能力：只影响手机侧展示，不接管官方审批
  let phoneMode = false
  let phoneInput = false
  const pendingApprovals = new Map()
  if (!effectiveToken) {
    try {
      effectiveToken = readFileSync(join(TOKEN_DIR, 'token'), 'utf8').trim()
    } catch {
      /* 还没有生成过 */
    }
  }
  if (!effectiveToken) {
    effectiveToken = randomBytes(16).toString('hex')
    try {
      mkdirSync(TOKEN_DIR, { recursive: true })
      writeFileSync(join(TOKEN_DIR, 'token'), effectiveToken, { mode: 0o600 })
    } catch {
      /* 写不了就只在本次运行使用 */
    }
    void persistConfig(ctx, { token: effectiveToken })
  }
  const IMAGES_DIR = join(DATA_DIR, 'images')
  const FILES_DIR = join(DATA_DIR, 'files')
  // 电脑端发的图片在会话里是 sha256 附件；DSH 按内容寻址存在这里
  const ATTACHMENTS_ROOT = join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'attachments', 'v1', 'objects')
  const fileNames = new Map()
  const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url))
  const APK_PATH = config.apkPath || join(PLUGIN_DIR, '..', '..', 'docklet-debug.apk')
  let history = []
  const sessions = new Map()
  let pendingImages = []
  let pendingFiles = []
  let pendingTimer = null
  let nextId = 1
  let target = config.sessionId || ''
  let lastPoll = 0
  // 每次插件启动换一个 id：手机据此判断电脑端是否重启过（消息 id 会从头来）
  const INSTANCE_ID = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
  // 当前一轮抄送到的最后一个会话事件 seq；之后的只拉增量
  let lastEventSeq = -1
  // target 会话是否正在执行（turn/start 到 turn/end 之间）
  let targetRunning = false
  let targetLastEventAt = 0
  // 最近一次 turn/end 是不是失败：给手机的后台提醒区分「完成/失败」
  let targetLastTurnError = false
  // 最近一条助手消息的 seq：手机选「每条消息提醒」时用它做变化检测
  let targetLastAssistantSeq = -1
  // 当前正在执行的工具：手机上的「呼吸条」用它显示细节
  let targetTool = null

  // ---- 事件层（P1 协议） ----
  const EVENT_DIR = join(DATA_DIR, 'events')
  // 每个会话一个事件环；首次用到时从磁盘恢复
  const eventLogs = new Map()
  // 映射时的配对状态：提问 callId → questions、审批 id → payload
  const eventContexts = new Map()
  const eventFlushTimers = new Map()
  const streams = new EventStreams()
  // 手机正在等的「开放提问」：callId → entry（waterfall 已被插件接住）
  const pendingQuestions = new Map()
  let questionBridge = null
  let approvalBridge = null
  let gatewaySupported = false
  // 审批：插件自己的 id 和 DSH 的 approval/asked id 都能查
  const pendingByApprovalId = new Map()
  // 提问没人回答时，兜底还给电脑端（工具的 timed 超时通常更早）
  const QUESTION_WAIT_MS = 15 * 60 * 1000

  function summarizeTool(name, rawArgs) {
    return summarizeToolArgs(rawArgs)
  }

  /** sha256 附件 id → DSH 附件库里的对象文件 */
  function attachmentObjectPath(id) {
    const value = String(id || '').trim()
    if (!/^sha256:[0-9a-f]{64}$/i.test(value)) return ''
    const hex = value.slice(7).toLowerCase()
    return join(ATTACHMENTS_ROOT, hex.slice(0, 2), hex)
  }

  function imageExtension(ref) {
    const type = String((ref && ref.mediaType) || '').toLowerCase()
    if (type.includes('jpeg') || type.includes('jpg')) return 'jpg'
    if (type.includes('webp')) return 'webp'
    if (type.includes('gif')) return 'gif'
    return 'png'
  }

  /** 把会话附件复制到 images/，手机上只认文件名形式（file:xxx.png） */
  function materializeImage(ref) {
    if (!ref || !ref.attachmentId) return null
    const source = attachmentObjectPath(ref.attachmentId)
    if (!source || !existsSync(source)) return null
    const hex = String(ref.attachmentId).slice(7).toLowerCase()
    const name = 'att-' + hex.slice(0, 24) + '.' + imageExtension(ref)
    const dest = join(IMAGES_DIR, name)
    try {
      if (!existsSync(dest)) {
        mkdirSync(IMAGES_DIR, { recursive: true })
        copyFileSync(source, dest)
      }
      return { id: 'file:' + name, width: ref.width, height: ref.height }
    } catch {
      return null
    }
  }

  function sniffImageType(file) {
    try {
      const head = Buffer.alloc(12)
      const fd = openSync(file, 'r')
      try {
        readSync(fd, head, 0, 12, 0)
      } finally {
        closeSync(fd)
      }
      if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) return 'image/png'
      if (head[0] === 0xff && head[1] === 0xd8) return 'image/jpeg'
      if (head.slice(0, 4).toString('latin1') === 'GIF8') return 'image/gif'
      if (head.slice(0, 4).toString('latin1') === 'RIFF' && head.slice(8, 12).toString('latin1') === 'WEBP') return 'image/webp'
    } catch {
      /* 退回扩展名 */
    }
    const ext = String(file).toLowerCase().split('.').pop()
    return ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'webp' ? 'image/webp' : ext === 'gif' ? 'image/gif' : 'image/png'
  }

  /** 会话日志的 seq 是唯一可靠的先后顺序 */
  function normalizeSeq(value) {
    if (value === null || value === undefined || value === '') return null
    const number = Number(value)
    return Number.isFinite(number) ? number : null
  }

  function seqOf(entry) {
    return normalizeSeq(entry && entry.seq)
  }

  function orderedHistory() {
    return [...history].sort((left, right) => {
      const leftSeq = seqOf(left)
      const rightSeq = seqOf(right)
      const leftOrder = leftSeq === null ? Number.MAX_SAFE_INTEGER : leftSeq
      const rightOrder = rightSeq === null ? Number.MAX_SAFE_INTEGER : rightSeq
      if (leftOrder !== rightOrder) return leftOrder - rightOrder
      const byTime = (Number(left.at) || 0) - (Number(right.at) || 0)
      if (byTime !== 0) return byTime
      return (Number(left.id) || 0) - (Number(right.id) || 0)
    })
  }

  /** 把一条会话事件转成手机能显示的消息（只认用户自己的消息和助手文字/图片） */
  function messageFromEvent(event) {
    const seq = normalizeSeq(event && event.seq)
    if (seq === null) return null
    let who = ''
    let source = null
    if (event.type === 'user/message') {
      if (event.data?.source?.kind !== 'user') return null
      who = 'me'
      source = event.data
    } else if (event.type === 'assistant/message') {
      who = 'ai'
      source = event.data?.message
    } else {
      return null
    }
    const text = textOfMessage(source)
    const refs = imagesOf(source).map((ref) => {
      const local = materializeImage(ref)
      return local || { id: ref.attachmentId, width: ref.width, height: ref.height }
    })
    const fileRefs = filesOf(source).map((ref) => ({
      id: ref.attachmentId,
      name: ref.name || '文件',
      size: Number(ref.bytes) || 0,
    }))
    if (!text && refs.length === 0 && fileRefs.length === 0) return null
    return {
      who,
      text,
      at: Number(event.time) || Date.now(),
      seq,
      images: refs.length ? refs : undefined,
      files: fileRefs.length ? fileRefs : undefined,
    }
  }

  /** 失败轮：turn/end 带 reason.kind = 'error'，手机上显示成红气泡 */
  function describeFailure(error) {
    const info = describeFailureInfo(error)
    const suffix = info.code ? '（' + info.code + (info.status ? ' ' + info.status : '') + '）' : ''
    const detail = info.message ? '：' + info.message : ''
    return info.hint + suffix + detail
  }

  function errorFromEvent(event) {
    if (!event || event.type !== 'turn/end') return null
    const seq = normalizeSeq(event.seq)
    if (seq === null) return null
    const reason = event.data?.reason
    if (!reason || reason.kind !== 'error') return null
    return {
      who: 'error',
      text: describeFailure(reason.error),
      at: Number(event.time) || Date.now(),
      seq,
    }
  }

  /** 只跟踪当前 target 的轮次状态；其它会话的事件不参与 */
  function noteTurnEvent(event) {
    const time = Number(event.time) || 0
    if (time > targetLastEventAt) targetLastEventAt = time
    if (event.type === 'turn/start') targetRunning = true
    else if (event.type === 'turn/end') {
      targetRunning = false
      targetTool = null
      const reason = event.data?.reason
      targetLastTurnError = Boolean(reason && reason.kind === 'error')
    } else if (event.type === 'assistant/message') {
      const seq = normalizeSeq(event.seq)
      if (seq !== null && seq > targetLastAssistantSeq) targetLastAssistantSeq = seq
    } else if (event.type === 'tool/call') {
      targetTool = {
        name: String(event.data?.name || ''),
        detail: summarizeTool(event.data?.name, event.data?.arguments),
        done: false,
      }
    } else if (event.type === 'tool/result') {
      if (targetTool) targetTool = { ...targetTool, done: true }
    }
  }

  /** 打开会话时只抄最后 N 条用户消息 + 最后 N 条助手消息（默认 5），不保留更早的 */
  function buildRecentWindow(agent, count = 5) {
    const size = Math.min(20, Math.max(1, Math.round(Number(count) || 5)))
    const session = agent && agent.session
    let events = []
    if (session && typeof session.snapshotEvents === 'function') {
      try {
        events = session.snapshotEvents()
      } catch {
        events = []
      }
    }
    const messages = []
    const errors = []
    let running = false
    let lastAt = 0
    let lastTurnError = false
    let lastAssistantSeq = -1
    for (const event of events) {
      const time = Number(event.time) || 0
      if (time > lastAt) lastAt = time
      if (event.type === 'turn/start') running = true
      else if (event.type === 'turn/end') {
        running = false
        const reason = event.data?.reason
        lastTurnError = Boolean(reason && reason.kind === 'error')
      } else if (event.type === 'assistant/message') {
        const seq = normalizeSeq(event.seq)
        if (seq !== null && seq > lastAssistantSeq) lastAssistantSeq = seq
      }
      const message = messageFromEvent(event)
      if (message) messages.push(message)
      const failure = errorFromEvent(event)
      if (failure) errors.push(failure)
    }
    targetRunning = running
    targetLastEventAt = lastAt
    targetLastTurnError = lastTurnError
    if (lastAssistantSeq > targetLastAssistantSeq) targetLastAssistantSeq = lastAssistantSeq
    const users = messages.filter((message) => message.who === 'me').slice(-size)
    const floor = users.length ? Number(users[0].seq) : -Infinity
    const assistants = messages.filter(
      (message) => message.who === 'ai' && Number(message.seq) >= floor,
    )
    const unique = new Map()
    for (const message of [...users, ...assistants]) unique.set(message.seq, message)
    const window = [...unique.values()].sort((left, right) => left.seq - right.seq)
    const floorSeq = window.length ? window[0].seq : -Infinity
    const recentErrors = errors.filter((item) => item.seq >= floorSeq).slice(-3)
    const merged = [...window, ...recentErrors].sort((left, right) => left.seq - right.seq)
    history = merged.map((message) => ({ id: nextId++, ...message }))
    lastEventSeq = events.reduce((max, event) => Math.max(max, normalizeSeq(event.seq) ?? -1), -1)
  }

  function trimHistory() {
    if (history.length > config.historyLimit) history = orderedHistory().slice(-config.historyLimit)
  }

  function push(who, text, images, files, seq) {
    const cleaned = String(text || '').trim()
    if (!cleaned && !(images && images.length) && !(files && files.length)) return
    const refs = (images || []).map((ref) => {
      if (ref && ref.id) return { id: ref.id, width: ref.width, height: ref.height }
      const local = materializeImage(ref)
      return local || { id: ref.attachmentId, width: ref.width, height: ref.height }
    })
    const fileRefs = (files || []).map((file) => {
      fileNames.set(file.id, file.name)
      return { id: file.id, name: file.name, size: file.size }
    })
    history.push({
      id: nextId++,
      who,
      text: cleaned,
      at: Date.now(),
      seq: normalizeSeq(seq),
      images: refs.length ? refs : undefined,
      files: fileRefs.length ? fileRefs : undefined,
    })
    trimHistory()
  }

  ctx.on('session/event', (session, event) => {
    // P1 事件层：所有普通会话都进事件环，订阅了 SSE 的手机实时收到
    const streamSessionId = String((session && session.id) || '')
    if (streamSessionId.startsWith('session-')) ingestSessionEvent(session, event)
    const meta = sessions.get(session.id) || { id: session.id, at: 0, snippet: '' }
    meta.at = Date.now()
    if (event.type === 'assistant/message') {
      const blocks = event.data?.message?.content || []
      const text = blocks.filter((block) => block.type === 'text').map((block) => block.text).join(' ').trim()
      if (text) meta.snippet = text.slice(0, 28)
    }
    sessions.set(session.id, meta)
    if (target === session.id) {
      noteTurnEvent(event)
      if (event.type === 'turn/end') {
        const failure = errorFromEvent(event)
        if (failure && !history.some((entry) => entry.seq === failure.seq)) {
          history.push({ id: nextId++, ...failure })
          trimHistory()
        }
      }
    }
    if (!config.forwardAll) return
    if (event.type !== 'assistant/message') return
    if (target !== session.id) return
    const message = messageFromEvent(event)
    if (!message) return
    if (pendingImages.length > 0 || pendingFiles.length > 0) {
      message.images = [...pendingImages, ...(message.images || [])]
      message.files = [...pendingFiles]
      pendingImages = []
      pendingFiles = []
      if (pendingTimer) {
        clearTimeout(pendingTimer)
        pendingTimer = null
      }
    }
    if (history.some((entry) => entry.seq === message.seq)) return
    history.push({ id: nextId++, ...message })
    trimHistory()
  })

  /** 只拉 target 之后的新事件；不记录/不补更早的历史 */
  function syncFromSession() {
    const agent = resolveAgent()
    const session = agent && agent.session
    if (!session || typeof session.snapshotEvents !== 'function') return
    const sessionId = String(session.id || agent.id || '')
    if (target && sessionId && sessionId !== target) return
    if (!target && sessionId) target = sessionId
    let events = []
    try {
      events = session.snapshotEvents(Math.max(0, lastEventSeq + 1))
    } catch {
      return
    }
    let changed = false
    for (const event of events) {
      const seq = normalizeSeq(event.seq)
      if (seq !== null && seq <= lastEventSeq) continue
      noteTurnEvent(event)
      const message = messageFromEvent(event)
      if (message) {
        const existing = history.find(
          (entry) =>
            entry.who === message.who &&
            entry.text === message.text &&
            Math.abs((Number(entry.at) || 0) - message.at) < 3000,
        )
        if (existing) {
          if (existing.seq !== message.seq) {
            existing.seq = message.seq
            changed = true
          }
          if (existing.at !== message.at) {
            existing.at = message.at
            changed = true
          }
        } else {
          history.push({ id: nextId++, ...message })
          changed = true
        }
      }
      const failure = errorFromEvent(event)
      if (failure && !history.some((entry) => entry.seq === failure.seq)) {
        history.push({ id: nextId++, ...failure })
        changed = true
      }
      if (seq !== null) lastEventSeq = Math.max(lastEventSeq, seq)
    }
    if (changed) trimHistory()
  }

  function authorized(req) {
    if (!effectiveToken) return true
    const header = req.headers.authorization || ''
    if (header === 'Bearer ' + effectiveToken) return true
    const url = new URL(req.url, 'http://localhost')
    return url.searchParams.get('token') === effectiveToken
  }

  function json(res, code, body) {
    res.writeHead(code, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    })
    res.end(JSON.stringify(body))
  }

  function resolveAgent() {
    if (target) {
      const exact = ctx.agents.get(target)
      if (exact) return exact
    }
    const all = ctx.agents.list()
    const roots = all.filter((agent) => String(agent.id).startsWith('session-'))
    return roots[roots.length - 1] || all[all.length - 1]
  }

  /** 插件重启后 target 为空：自动选最近在线会话，避免手机端一直离线 */
  async function ensureAutoTarget() {
    if (target && ctx.agents.get(target)) return target
    const picked = await pickDefaultTarget(getController())
    if (picked) {
      target = picked
      return target
    }
    const agent = resolveAgent()
    const id = agent ? String(agent.id || (agent.session && agent.session.id) || '') : ''
    if (id) target = id
    return target || ''
  }

  /** 只列真正在线的会话（和 /target、/send 用同一套 ctx.agents 判断） */
  function onlineSessions() {
    const list = []
    for (const agent of ctx.agents.list()) {
      const id = String(agent.id || '')
      if (!id.startsWith('session-')) continue
      const meta = sessions.get(id)
      list.push({
        id,
        at: meta ? meta.at : 0,
        snippet: meta ? meta.snippet : titleOfSession(agent.session),
      })
    }
    return list.sort((a, b) => b.at - a.at)
  }

  /** 宿主的会话控制器：列全部历史会话、恢复冷会话、新建会话都靠它 */
  function getController() {
    try {
      return ctx.get('sessionController')
    } catch {
      return undefined
    }
  }

  function getService(name) {
    try {
      return ctx.get(name)
    } catch {
      return undefined
    }
  }

  /** 会话当前的模式/权限/模型，给手机头部展示 */
  function sessionMeta(agent) {
    const session = agent && agent.session
    const result = { preset: '', permission: '', model: null }
    if (!session) return result
    try {
      result.preset = String(session.header?.agentPreset || '')
    } catch {
      /* 忽略 */
    }
    try {
      const pool = getService('permissionPresets')
      if (pool && typeof pool.current === 'function') result.permission = String(pool.current(session) || '')
    } catch {
      /* 忽略 */
    }
    try {
      const header = typeof session.requestHeader === 'function' ? session.requestHeader() : null
      const config = header && header.config
      if (config) {
        result.model = {
          provider: String(config.provider || ''),
          model: String(config.model || ''),
          reasoningEffort: config.reasoningEffort ? String(config.reasoningEffort) : '',
        }
      }
    } catch {
      /* 忽略 */
    }
    return result
  }

  // 会话投影：待办 / 目标 / 计划模式（HSM 已算好，手机直接展示）
  const PROJECTION_KEYS = ['todos', 'goal', 'plan']
  let lastProjectionJSON = ''

  function readProjections(session) {
    const values = {}
    const pool = getService('sessionProjections')
    if (!pool || typeof pool.stateOf !== 'function' || !session) return values
    for (const key of PROJECTION_KEYS) {
      try {
        const value = pool.stateOf(session, key)
        if (value !== undefined) values[key] = value
      } catch {
        /* 该 DSH 没有这个投影 */
      }
    }
    return values
  }

  function pushProjections(session, sessionId) {
    if (!session || !sessionId) return
    if (target && sessionId !== target) return
    const values = readProjections(session)
    const text = JSON.stringify(values)
    if (text === lastProjectionJSON) return
    lastProjectionJSON = text
    streams.publish(sessionId, {
      id: 'projection',
      seq: 0,
      type: 'projection',
      at: Date.now(),
      payload: { values },
    })
  }

  async function optionList() {
    const controller = getController()
    const presets = []
    try {
      const registry = getService('agentPresets')
      const list = registry && typeof registry.list === 'function' ? await registry.list() : []
      for (const preset of list) {
        if (!preset || !preset.id) continue
        presets.push({
          id: String(preset.id),
          name: preset.name ? String(preset.name) : String(preset.id),
          description: preset.description ? String(preset.description) : '',
          isDefault: Boolean(preset.isDefault),
          broken: preset.broken ? String(preset.broken) : '',
        })
      }
    } catch {
      /* 没有预设服务就不给 */
    }
    const permissions = []
    let defaultPermission = ''
    try {
      const pool = getService('permissionPresets')
      const catalog = pool && typeof pool.catalog === 'function' ? pool.catalog() : null
      if (catalog) {
        for (const option of catalog.options || []) {
          if (!option || !option.value) continue
          permissions.push({
            value: String(option.value),
            name: option.name ? String(option.name) : String(option.value),
            description: option.description ? String(option.description) : '',
          })
        }
        defaultPermission = String(catalog.defaultPreset || '')
      }
    } catch {
      /* 忽略 */
    }
    let models = { groups: [], default: null }
    try {
      const catalog = controller && typeof controller.modelCatalog === 'function' ? await controller.modelCatalog() : null
      if (catalog) {
        models = {
          groups: Array.isArray(catalog.groups) ? catalog.groups : [],
          default: catalog.default || null,
        }
      }
    } catch {
      /* 忽略 */
    }
    return { presets, permissions, defaultPermission, models }
  }

  function applyPermission(sessionId, name) {
    if (!name) return
    const pool = getService('permissionPresets')
    if (!pool || typeof pool.set !== 'function') return
    const agent = ctx.agents.get(sessionId)
    if (!agent || !agent.session) return
    try {
      pool.set(agent.session, String(name))
    } catch {
      /* 设置失败不阻塞新建 */
    }
  }

  /** 空白会话只有模式一致才能复用 */
  function samePreset(sessionId, preset) {
    if (!preset) return true
    const agent = ctx.agents.get(sessionId)
    const current = agent && agent.session ? String(agent.session.header?.agentPreset || '') : ''
    return current === preset
  }

  function titleOfSession(session) {
    if (!session) return ''
    try {
      const titles = ctx.get('sessionTitle')
      if (!titles || typeof titles.get !== 'function') return ''
      const snapshot = titles.get(session)
      return snapshot && typeof snapshot.title === 'string' ? snapshot.title : ''
    } catch {
      return ''
    }
  }

  function currentTitle() {
    const agent = target ? ctx.agents.get(target) : undefined
    return titleOfSession(agent && agent.session)
  }

  let lastResumeTry = 0
  let keepBlankTarget = false

  function sessionIsBlank(session) {
    if (!session) return false
    try {
      const projections = ctx.get('sessionProjections')
      const state = projections && typeof projections.stateOf === 'function'
        ? projections.stateOf(session, 'sessionListMetadata')
        : undefined
      if (state && typeof state.blank === 'boolean') return state.blank
    } catch {
      /* 没有投影就看 seq */
    }
    return Number(session.seq) === 0
  }

  /** 目标还在但 Agent 被回收时，像电脑端点开一样把它恢复起来 */
  async function ensureTargetAgent(force) {
    if (!target) return null
    const live = ctx.agents.get(target)
    if (live) return live
    const controller = getController()
    if (!controller || typeof controller.resolveAgent !== 'function') return null
    const now = Date.now()
    if (!force && now - lastResumeTry < 5000) return null
    lastResumeTry = now
    try {
      const result = await controller.resolveAgent(target)
      return result && result.agent ? result.agent : null
    } catch {
      return null
    }
  }

  /** 全部历史会话（持久化 + 在线），带标题；拿不到控制器时退回在线列表 */
  async function historySessions() {
    const controller = getController()
    if (controller && typeof controller.list === 'function') {
      try {
        const result = await controller.list({})
        const items = Array.isArray(result && result.items) ? result.items : []
        let archived = []
        try {
          const registry = ctx.get('workspaceRegistry')
          archived = registry && Array.isArray(registry.archivedSessionIds) ? registry.archivedSessionIds : []
        } catch {
          archived = []
        }
        return items
          .filter((item) => item && item.sessionId && !item.parentSessionId && !archived.includes(item.sessionId))
          .map((item) => {
            const title =
              item.projections && item.projections.values && typeof item.projections.values.title === 'string'
                ? item.projections.values.title
                : ''
            const cwd = item.cwd || ''
            const folder = cwd ? String(cwd).split(/[\\/]/).filter(Boolean).pop() : ''
            const blank = Boolean(item.blank)
            // 电脑端侧栏不显示空白会话；手机也只保留“当前正在用的那条空白”，
            // 否则历史上点过几次“新对话”留下的空壳会全冒出来。
            if (blank && !title && item.sessionId !== target) return null
            const label = title || (blank ? '新对话' : folder || '未命名对话')
            return {
              id: String(item.sessionId),
              at: Number(item.updatedAt) || 0,
              title: label,
              snippet: label,
              online: Boolean(item.agentAvailable),
              running: Boolean(item.running),
              blank,
              cwd,
            }
          })
          .filter(Boolean)
          .sort((a, b) => b.at - a.at)
      } catch {
        /* 退回在线列表 */
      }
    }
    return onlineSessions().map((item) => ({
      ...item,
      title: item.snippet,
      online: true,
      running: false,
      blank: false,
    }))
  }

  async function preferredCwd(controller) {
    const live = target ? ctx.agents.get(target) : null
    if (live && live.session && live.session.header && live.session.header.cwd) return live.session.header.cwd
    try {
      const result = await controller.list({})
      const items = Array.isArray(result && result.items) ? result.items : []
      const withCwd = items.find((item) => item && item.cwd)
      return withCwd ? withCwd.cwd : undefined
    } catch {
      return undefined
    }
  }

  /** 没有明确 target 时，选最近更新的“真对话”，不要落到空白会话/最后一个 Agent */
  async function pickDefaultTarget(controller) {
    if (!controller || typeof controller.list !== 'function') return ''
    try {
      const result = await controller.list({})
      const items = Array.isArray(result && result.items) ? result.items : []
      let archived = []
      try {
        const registry = ctx.get('workspaceRegistry')
        archived = registry && Array.isArray(registry.archivedSessionIds) ? registry.archivedSessionIds : []
      } catch {
        archived = []
      }
      const candidates = items
        .filter((item) => item && item.sessionId && !item.parentSessionId && !item.blank && !archived.includes(item.sessionId))
        .sort((a, b) => (Number(b.updatedAt) || 0) - (Number(a.updatedAt) || 0))
      const first = candidates[0]
      if (!first) return ''
      if (ctx.agents.get(first.sessionId)) return String(first.sessionId)
      if (typeof controller.resolveAgent !== 'function') return ''
      const resumed = await controller.resolveAgent(first.sessionId)
      return resumed && resumed.agent ? String(first.sessionId) : ''
    } catch {
      return ''
    }
  }

  async function archivedSessions() {
    const controller = getController()
    if (!controller || typeof controller.list !== 'function') return []
    try {
      const registry = ctx.get('workspaceRegistry')
      const archived = registry && Array.isArray(registry.archivedSessionIds) ? registry.archivedSessionIds : []
      if (archived.length === 0) return []
      const result = await controller.list({})
      const items = Array.isArray(result && result.items) ? result.items : []
      return items
        .filter((item) => item && item.sessionId && !item.parentSessionId && archived.includes(item.sessionId))
        .map((item) => ({
          id: String(item.sessionId),
          title:
            item.projections && item.projections.values && typeof item.projections.values.title === 'string'
              ? item.projections.values.title
              : '未命名对话',
          at: Number(item.updatedAt) || 0,
          archived: true,
        }))
        .sort((a, b) => b.at - a.at)
    } catch {
      return []
    }
  }

  function workspaceForCwd(cwd) {
    if (!cwd) return null
    try {
      const registry = ctx.get('workspaceRegistry')
      const list = registry && typeof registry.list === 'function' ? registry.list() : []
      return (list || []).find((workspace) => workspace && workspace.path === cwd) || null
    } catch {
      return null
    }
  }

  // ---- 事件层：缓存、映射、快照、SSE ----

  function eventFileName(sessionId) {
    const safe = String(sessionId || 'none').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
    return safe || 'none'
  }

  /** 每个会话一个事件环，第一次用的时候从磁盘恢复最近 N 条 */
  function eventLogFor(sessionId) {
    const key = String(sessionId || '')
    const existing = eventLogs.get(key)
    if (existing) return existing
    const log = new EventLog()
    try {
      log.hydrate(readFileSync(join(EVENT_DIR, eventFileName(key) + '.jsonl'), 'utf8'))
    } catch {
      /* 还没写过 */
    }
    eventLogs.set(key, log)
    return log
  }

  function flushEventLog(sessionId, immediate) {
    const key = String(sessionId || '')
    const log = eventLogs.get(key)
    if (!log) return
    const write = () => {
      eventFlushTimers.delete(key)
      try {
        mkdirSync(EVENT_DIR, { recursive: true })
        writeFileSync(join(EVENT_DIR, eventFileName(key) + '.jsonl'), log.serialize() + '\n')
      } catch {
        /* 写不了就只留在内存里 */
      }
    }
    if (immediate) {
      const timer = eventFlushTimers.get(key)
      if (timer) clearTimeout(timer)
      eventFlushTimers.delete(key)
      write()
      return
    }
    if (eventFlushTimers.has(key)) return
    eventFlushTimers.set(key, setTimeout(write, 400))
  }

  /** 映射时的配对状态：提问 callId → questions、审批 id → payload */
  function eventContextFor(sessionId) {
    const key = String(sessionId || '')
    let context = eventContexts.get(key)
    if (!context) {
      context = { questions: new Map(), approvals: new Map(), materializeImage }
      eventContexts.set(key, context)
    }
    return context
  }

  function recordEvent(sessionId, event, options = {}) {
    const key = String(sessionId || '')
    if (!key || !event) return
    eventLogFor(key).upsert(event)
    flushEventLog(key, false)
    if (options.publish !== false) streams.publish(key, event)
  }

  /** 一条 DSH 会话事件 → 手机事件；写缓存并推给在线的 SSE */
  function ingestSessionEvent(session, event, options = {}) {
    const sessionId = String((session && session.id) || '')
    if (!sessionId) return []
    let events = []
    try {
      events = mapSessionEvents(event, eventContextFor(sessionId))
    } catch {
      events = []
    }
    for (const one of events) recordEvent(sessionId, one, options)
    if (
      event.type === 'todo/write' ||
      event.type === 'plan/mode' ||
      event.type === 'goal/changed' ||
      event.type === 'turn/start'
    ) {
      pushProjections(session, sessionId)
    }
    return events
  }

  function currentCursor(session) {
    try {
      const total = Math.max(0, Number(session && session.seq) || 0)
      const tail = session.snapshotEvents(Math.max(0, total - 8))
      return tail.reduce((max, event) => Math.max(max, toNumber(event && event.seq) ?? -1), -1)
    } catch {
      return -1
    }
  }

  /** 会话尾部的轮次/工具状态（不改 target 的全局状态） */
  function sessionStateOf(session) {
    const state = { running: false, tool: null, lastEventAt: 0, lastTurnError: false }
    if (!session || typeof session.snapshotEvents !== 'function') return state
    try {
      const total = Math.max(0, Number(session.seq) || 0)
      const tail = session.snapshotEvents(Math.max(0, total - 60))
      for (const event of tail) {
        const time = toNumber(event && event.time) || 0
        if (time > state.lastEventAt) state.lastEventAt = time
        if (!event) continue
        if (event.type === 'turn/start') {
          state.running = true
          state.tool = null
        } else if (event.type === 'turn/end') {
          state.running = false
          state.tool = null
          const reason = event.data && event.data.reason
          state.lastTurnError = Boolean(reason && reason.kind === 'error')
        } else if (event.type === 'tool/call') {
          state.tool = {
            name: String((event.data && event.data.name) || ''),
            detail: summarizeTool(event.data && event.data.name, event.data && event.data.arguments),
            done: false,
          }
        } else if (event.type === 'tool/result' && state.tool) {
          state.tool = { ...state.tool, done: true }
        }
      }
    } catch {
      /* 读不到就用默认值 */
    }
    return state
  }

  function sessionView(agent, session) {
    const meta = sessionMeta(agent)
    const state = sessionStateOf(session)
    return {
      id: String((session && session.id) || (agent && agent.id) || ''),
      title: titleOfSession(session),
      cwd: String((session && session.header && session.header.cwd) || ''),
      online: Boolean(agent),
      running: state.running,
      lastEventAt: state.lastEventAt,
      lastTurnError: state.lastTurnError,
      tool: state.tool,
      model: meta.model,
      preset: meta.preset,
      permission: meta.permission,
    }
  }

  /** /snapshot、/events、/respond 用：按 id 找会话（空白 id 表示当前 target） */
  async function resolveSessionTarget(requested) {
    const wanted = String(requested || '').trim()
    if (wanted) {
      const live = ctx.agents.get(wanted)
      if (live) return { agent: live, session: live.session }
      const controller = getController()
      if (!controller || typeof controller.resolveAgent !== 'function') return null
      try {
        const result = await controller.resolveAgent(wanted)
        return result && result.agent ? { agent: result.agent, session: result.agent.session } : null
      } catch {
        return null
      }
    }
    if (!target) {
      const picked = await pickDefaultTarget(getController())
      if (picked) target = picked
    }
    if (!target) return null
    const agent = await ensureTargetAgent(true)
    return agent ? { agent, session: agent.session } : null
  }

  /** 快照窗口：优先读会话日志（权威），读不到退回磁盘事件缓存 */
  function snapshotFor(session, options = {}) {
    const log = eventLogFor(String((session && session.id) || ''))
    if (!session || typeof session.snapshotEvents !== 'function') {
      return { events: log.all(), cursor: log.cursor, source: 'cache', truncated: false, hasMore: false, oldestSeq: 0 }
    }
    const turns = Math.max(0, Math.round(Number(options.turns) || 0))
    const before = Math.max(0, Number(options.before) || 0)
    const legacyWindow = turns === 0 && before === 0
    const total = Math.max(0, Number(session.seq) || 0)
    const groupRaw = (list) => {
      const out = []
      let current = null
      const begin = (seq) => {
        if (current) out.push(current)
        current = { startSeq: seq, endSeq: seq, raw: [] }
      }
      for (const event of list) {
        const seq = normalizeSeq(event && event.seq) ?? 0
        if ((event && event.type === 'turn/start') || (!current && event && event.type === 'message/user')) {
          begin(seq)
        }
        if (!current) continue
        current.endSeq = seq
        current.raw.push(event)
        if (event && event.type === 'turn/end') {
          out.push(current)
          current = null
        }
      }
      if (current) out.push(current)
      return out
    }
    let raw = []
    let groups = []
    let fetchedFrom = 0
    if (legacyWindow) {
      try {
        raw = session.snapshotEvents(Math.max(0, total - SNAPSHOT_LIMIT))
      } catch {
        raw = []
      }
    } else {
      // 从尾部按块回溯，够 turns 轮就停；不再从 0 取整段会话
      const CHUNK = 1200
      const end = before > 0 ? before : total + 1
      let from = Math.max(0, end - CHUNK)
      fetchedFrom = from
      for (let attempt = 0; attempt < 24; attempt += 1) {
        try {
          raw = session.snapshotEvents(from)
        } catch {
          raw = []
        }
        raw = raw
          .filter((event) => (normalizeSeq(event && event.seq) ?? 0) < end)
          .sort((left, right) => (normalizeSeq(left && left.seq) ?? 0) - (normalizeSeq(right && right.seq) ?? 0))
        groups = groupRaw(raw)
        const want = turns > 0 ? turns : 1
        if (groups.length >= want || from === 0) break
        from = Math.max(0, from - CHUNK)
        fetchedFrom = from
      }
    }
    if (!raw.length && log.size > 0) {
      return { events: log.all(), cursor: log.cursor, source: 'cache', truncated: false, hasMore: false, oldestSeq: 0 }
    }
    if (legacyWindow) {
      const legacyContext = eventContextFor(String(session.id))
      const events = []
      for (const event of raw) {
        try {
          events.push(...mapSessionEvents(event, legacyContext))
        } catch {
          /* 单条坏事件不影响整体 */
        }
      }
      for (const event of events) log.upsert(event)
      flushEventLog(String(session.id), false)
      return {
        events: events.sort((left, right) => left.seq - right.seq),
        cursor: currentCursor(session),
        source: 'log',
        truncated: total > SNAPSHOT_LIMIT,
        hasMore: total > SNAPSHOT_LIMIT,
        oldestSeq: events[0] ? events[0].seq : 0,
      }
    }
    if (!groups.length) {
      return {
        events: log.all(),
        cursor: currentCursor(session),
        source: log.size > 0 ? 'cache' : 'log',
        truncated: false,
        hasMore: false,
        oldestSeq: 0,
      }
    }
    const eligible = before > 0 ? groups.filter((group) => group.startSeq < before) : groups
    const take = turns > 0 ? turns : eligible.length
    const start = Math.max(0, eligible.length - take)
    const selected = eligible.slice(start)
    const selectedHasMore = groups.indexOf(selected[0]) > 0
    // 选中区间之前只补问题上下文，保证跨轮回答的 input.result 还能配对
    const firstSeq = selected.length ? selected[0].startSeq : Infinity
    const priorQuestions = new Map()
    for (const event of raw) {
      const seq = normalizeSeq(event && event.seq) ?? 0
      if (seq >= firstSeq) break
      const data = event && event.data ? event.data : {}
      if (event && event.type === 'tool/call' && String(data.name || '') === QUESTION_TOOL) {
        try {
          const list = questionsFromArgs(data.arguments)
          if (list) priorQuestions.set(String(data.callId || ''), list)
        } catch {
          /* 忽略坏参数 */
        }
      } else if (event && event.type === 'tool/result') {
        const callId = String(data.callId || (data.message && data.message.toolCallId) || '')
        if (!priorQuestions.has(callId)) continue
        let parsed = null
        try {
          parsed = JSON.parse(String(textOfContent(data.message && data.message.content) || '').trim())
        } catch {
          parsed = null
        }
        if (!parsed || parsed.pending !== true) priorQuestions.delete(callId)
      }
    }
    // 只映射选中的 turn，避免每翻一页都把整段会话映射一遍
    const base = eventContextFor(String(session.id))
    const context = { ...base, questions: priorQuestions, approvals: new Map() }
    const mapped = selected.map((group) => ({ ...group, events: [] }))
    for (const group of mapped) {
      for (const event of group.raw) {
        try {
          group.events.push(...mapSessionEvents(event, context))
        } catch {
          /* 单条坏事件不影响整体 */
        }
      }
    }
    const visible = mapped.filter((group) => group.events.length > 0)
    if (!visible.length) {
      return {
        events: log.all(),
        cursor: currentCursor(session),
        source: log.size > 0 ? 'cache' : 'log',
        truncated: false,
        hasMore: false,
        oldestSeq: 0,
      }
    }
    // 一页最多 600 条事件；按完整 turn 裁剪，单个超大 turn 仍然保留
    const MAX_PAGE_EVENTS = 600
    let kept = visible
    let eventTotal = kept.reduce((sum, group) => sum + group.events.length, 0)
    while (kept.length > 1 && eventTotal > MAX_PAGE_EVENTS) {
      eventTotal -= kept[0].events.length
      kept = kept.slice(1)
    }
    const events = kept.flatMap((group) => group.events).sort((left, right) => left.seq - right.seq)
    for (const event of events) log.upsert(event)
    flushEventLog(String(session.id), false)
    let hasOlder = selectedHasMore
    if (!hasOlder && fetchedFrom > 0 && selected.length) {
      try {
        const probeFrom = Math.max(0, fetchedFrom - 1200)
        const probe = session
          .snapshotEvents(probeFrom)
          .filter((event) => (normalizeSeq(event && event.seq) ?? 0) < selected[0].startSeq)
        hasOlder = groupRaw(probe).length > 0
      } catch {
        hasOlder = true
      }
    }
    const hasMore = hasOlder || kept.length < selected.length
    return {
      events,
      cursor: currentCursor(session),
      source: 'log',
      truncated: hasMore,
      hasMore,
      oldestSeq: kept[0].startSeq,
      snapshotMode: 'tail-chunk',
    }
  }

  function pendingApprovalsList(sessionId) {
    const wanted = String(sessionId || '')
    return [...pendingApprovals.values()]
      .filter((item) => !wanted || !item.session || item.session === wanted)
      .map((item) => ({
        id: item.id,
        approvalId: item.approvalId || '',
        session: item.session || '',
        title: item.title || '',
        tool: item.tool,
        reason: item.reason || '',
        callId: item.callId || '',
        at: item.at,
      }))
  }

  function pendingInputsFor(agent, session) {
    const sessionId = String((session && session.id) || (agent && agent.id) || '')
    const list = []
    const push = (item) => {
      if (!item || !item.callId) return
      if (list.some((one) => one.callId === item.callId)) return
      list.push(item)
    }
    try {
      const projections = getService('sessionProjections')
      const state = projections && typeof projections.stateOf === 'function' ? projections.stateOf(session, 'userQuestions') : null
      for (const item of (state && state.questions && state.questions.active) || []) {
        push({
          id: String(item.callId),
          callId: String(item.callId),
          session: sessionId,
          state: String(item.state || 'open'),
          questions: normalizeQuestions(item.questions),
          at: 0,
        })
      }
    } catch {
      /* 没有投影服务就只看拦截表 */
    }
    for (const entry of pendingQuestions.values()) {
      if (sessionId && entry.session && entry.session !== sessionId) continue
      push({
        id: entry.callId,
        callId: entry.callId,
        session: entry.session,
        state: entry.state || 'open',
        questions: entry.questions,
        at: entry.at,
      })
    }
    return list
  }

  /** 问答事件推给手机（幂等 id，同一 callId 不会长出两张卡） */
  function publishPhoneInput(sessionId, type, callId, payload, status) {
    try {
      const session = ctx.agents.get(sessionId)?.session
      const cursor = session ? currentCursor(session) : -1
      recordEvent(sessionId, {
        id: 'input-' + callId,
        seq: Math.max(0, cursor) + 0.5,
        type,
        at: Date.now(),
        status,
        payload,
      })
    } catch {
      /* 事件推不出去不影响回答 */
    }
  }

  function questionCallIdFor(sessionId, questions) {
    try {
      const context = eventContextFor(sessionId)
      const signature = JSON.stringify(questions)
      for (const [callId, list] of context.questions) {
        if (JSON.stringify(normalizeQuestions(list)) === signature) return String(callId)
      }
    } catch {
      /* 没有工具上下文就退回 Gateway 自带 id */
    }
    return ''
  }

  async function receiveGatewayQuestion(frame) {
    if (!phoneMode || !phoneInput) return
    const eventId = String(frame.eventId || '')
    const agentId = String(frame.agentId || '')
    if (!eventId || !agentId) return
    const request = frame.request && typeof frame.request === 'object' ? frame.request : {}
    const questions = normalizeQuestions(request.questions)
    if (!questions.length) return
    const toolCallId = questionCallIdFor(agentId, questions)
    const callId = String(toolCallId || (request.wait && request.wait.callId) || request.callId || eventId)
    const existing = pendingQuestions.get(callId)
    if (existing && existing.eventId === eventId) return
    pendingQuestions.set(callId, {
      id: callId,
      callId,
      eventId,
      session: agentId,
      questions,
      at: Date.now(),
      state: 'open',
    })
    // 工具调用已经映射过同一张卡时不再重复推；只有没卡时才补一张
    if (!toolCallId) {
      publishPhoneInput(agentId, 'input.request', callId, { callId, questions, state: 'open' }, 'pending')
    }
  }

  function receiveGatewayCancel(eventId) {
    for (const [callId, entry] of pendingQuestions) {
      if (entry.eventId !== eventId) continue
      pendingQuestions.delete(callId)
      publishPhoneInput(entry.session, 'input.result', callId, { callId, answers: [], state: 'closed' }, 'ok')
      break
    }
  }

  async function receiveGatewayApproval(frame) {
    if (!phoneMode) return
    const eventId = String(frame.eventId || '')
    const agentId = String(frame.agentId || '')
    if (!eventId || !agentId) return
    if ([...pendingApprovals.values()].some((item) => item.eventId === eventId)) return
    const request = frame.request && typeof frame.request === 'object' ? frame.request : {}
    const agent = ctx.agents.get(agentId)
    const approvalId = findApprovalId(agent, request)
    const id = 'a-gw-' + eventId.replace(/[^a-zA-Z0-9_-]/g, '').slice(-24)
    const entry = {
      id,
      eventId,
      approvalId,
      session: agentId,
      title: titleOfSession(agent && agent.session),
      tool: String(request.toolName || ''),
      reason: String(request.reason || ''),
      callId: String(request.callId || ''),
      at: Date.now(),
      state: 'open',
    }
    pendingApprovals.set(id, entry)
    if (approvalId) pendingByApprovalId.set(approvalId, entry)
  }

  function receiveGatewayApprovalCancel(eventId) {
    for (const [id, entry] of pendingApprovals) {
      if (entry.eventId !== eventId) continue
      pendingApprovals.delete(id)
      if (entry.approvalId) pendingByApprovalId.delete(entry.approvalId)
      break
    }
  }

  function detachQuestionFallback() {
    for (const off of questionListeners.values()) {
      try {
        off()
      } catch {
        /* 忽略 */
      }
    }
    questionListeners.clear()
  }

  /** 打开一条 SSE：先补 seq > after，再持续推；15 秒一次心跳 */
  const openStreams = new Set()
  function openEventStream(req, res, agent, session, after) {
    const sessionId = String((session && session.id) || '')
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
    })
    res.write('retry: 3000\n\n')
    openStreams.add(res)

    let closed = false
    let ping = null
    let unsubscribe = null
    const close = () => {
      if (closed) return
      closed = true
      openStreams.delete(res)
      if (ping) clearInterval(ping)
      if (unsubscribe) unsubscribe()
      try {
        res.end()
      } catch {
        /* 已经断了 */
      }
    }
    const writeEvent = (event) => {
      if (closed) return
      try {
        res.write(sseData(event))
      } catch {
        close()
      }
    }

    // 1) 补拉断线期间漏掉的事件
    let truncated = false
    if (after !== null) {
      let raw = []
      try {
        raw = session.snapshotEvents(Math.max(0, after + 1))
      } catch {
        raw = []
      }
      const context = eventContextFor(sessionId)
      const mapped = []
      for (const event of raw) {
        try {
          mapped.push(...mapSessionEvents(event, context))
        } catch {
          /* 跳过坏事件 */
        }
      }
      let list = mapped.filter((event) => event.seq > after).sort((left, right) => left.seq - right.seq)
      if (list.length > REPLAY_LIMIT) {
        truncated = true
        list = list.slice(-REPLAY_LIMIT)
      }
      for (const event of list) writeEvent(event)
    }

    // 2) 元信息帧：客户端据此知道服务端是否重启、cursor 在哪
    const cursor = currentCursor(session)
    try {
      res.write(
        sseData({
          id: `meta-${INSTANCE_ID}-${Date.now().toString(36)}`,
          seq: cursor,
          type: 'session.meta',
          at: Date.now(),
          payload: { instance: INSTANCE_ID, cursor, truncated, session: sessionView(agent, session) },
        }),
      )
    } catch {
      close()
      return
    }

    // 3) 实时推送
    unsubscribe = streams.subscribe(sessionId, writeEvent)
    ping = setInterval(() => {
      if (closed) return
      try {
        res.write(sseComment('ping'))
      } catch {
        close()
      }
    }, SSE_PING_MS)
    req.on('close', close)
    req.on('error', close)
    res.on('close', close)
    res.on('error', close)
  }

  function closeEventStreams() {
    streams.closeAll()
    for (const res of [...openStreams]) {
      try {
        res.end()
      } catch {
        /* 忽略 */
      }
    }
    openStreams.clear()
    for (const timer of eventFlushTimers.values()) clearTimeout(timer)
    eventFlushTimers.clear()
    for (const sessionId of [...eventLogs.keys()]) flushEventLog(sessionId, true)
  }

  async function readJson(req) {
    let raw = ''
    for await (const chunk of req) {
      raw += chunk
      if (raw.length > 2 * 1024 * 1024) throw new Error('请求体太大')
    }
    return JSON.parse(raw || '{}')
  }

  /** 在会话日志尾部找这次审批对应的 approval/asked id（手机按它回传） */
  function findApprovalId(agent, req) {
    try {
      const session = agent && agent.session
      if (!session || typeof session.snapshotEvents !== 'function') return ''
      const total = Math.max(0, Number(session.seq) || 0)
      const tail = session.snapshotEvents(Math.max(0, total - 30))
      const decided = new Set()
      for (const event of tail) {
        if (event && event.type === 'approval/decided' && event.data && event.data.id) decided.add(String(event.data.id))
      }
      for (let index = tail.length - 1; index >= 0; index -= 1) {
        const event = tail[index]
        if (!event || event.type !== 'approval/asked' || !event.data) continue
        const id = String(event.data.id || '')
        if (!id || decided.has(id)) continue
        if (req.callId && event.data.callId && String(event.data.callId) !== String(req.callId)) continue
        if (!req.callId && event.data.toolName !== req.toolName) continue
        return id
      }
    } catch {
      /* 读不到就用插件自己的 id */
    }
    return ''
  }

  /** 手机回答提问：Gateway 树里走官方 $events/result，旧环境才回退 waterfall */
  async function answerQuestion(callId, answers, sessionHint) {
    const entry = pendingQuestions.get(callId)
    if (entry && entry.eventId && gatewaySupported) {
      if (!questionBridge || !questionBridge.available()) {
        return { error: '问答通道暂不可用，请稍后重试', status: 503, code: 'UNAVAILABLE' }
      }
      if (entry.answering) {
        return { error: '这个问题正在提交', status: 409, code: 'ANSWERING' }
      }
      entry.answering = true
      try {
        await questionBridge.reply(entry.eventId, { kind: 'result', value: { answers } })
        pendingQuestions.delete(callId)
        publishPhoneInput(
          entry.session,
          'input.result',
          callId,
          { callId, answers, state: 'resolved' },
          'ok',
        )
        return { mode: 'gateway', accepted: true }
      } catch (error) {
        entry.answering = false
        if (!pendingQuestions.has(callId)) {
          return { error: '这个问题已在其他客户端处理', status: 409, code: 'ALREADY_ANSWERED' }
        }
        return {
          error: 'DSH 未接收回答，请稍后重试',
          code: 'RESPOND_FAILED',
          status: 409,
        }
      }
    }
    if (entry && typeof entry.resolve === 'function') {
      entry.resolve(answers)
      return { mode: 'open', accepted: true }
    }
    let agent = sessionHint ? ctx.agents.get(String(sessionHint)) : resolveAgent()
    if (!agent) agent = await ensureTargetAgent(true)
    if (!agent) return { error: '没有可用的会话', status: 409 }
    const service = getService('userQuestions')
    if (!service || typeof service.answer !== 'function') {
      return { error: '这个版本的 DSH 不能回答提问', status: 503 }
    }
    try {
      const accepted = service.answer(agent, callId, { answers })
      return { mode: 'continued', accepted: Boolean(accepted) }
    } catch (error) {
      return {
        error: (error && error.message) || '回答失败',
        code: (error && error.code) || 'RESPOND_FAILED',
        status: 409,
      }
    }
  }

  /** 手机审批：走官方 Gateway 的 $events/result */
  async function answerApproval(entry, decision) {
    if (entry && entry.eventId && gatewaySupported) {
      if (!approvalBridge || !approvalBridge.available()) {
        return { error: '审批通道暂不可用，请稍后重试', status: 503, code: 'UNAVAILABLE' }
      }
      if (entry.answering) return { error: '这个审批正在提交', status: 409, code: 'ANSWERING' }
      entry.answering = true
      try {
        await approvalBridge.reply(entry.eventId, {
          kind: 'result',
          value: decision === 'deny' ? 'rejected' : 'allowed-once',
        })
        pendingApprovals.delete(entry.id)
        if (entry.approvalId) pendingByApprovalId.delete(entry.approvalId)
        return { ok: true }
      } catch {
        entry.answering = false
        if (!pendingApprovals.has(entry.id)) {
          return { error: '这个审批已在其他客户端处理', status: 409, code: 'ALREADY_ANSWERED' }
        }
        return { error: 'DSH 未接收审批结果，请稍后重试', status: 409, code: 'RESPOND_FAILED' }
      }
    }
    return { error: '这个审批已处理或已失效', status: 409, code: 'NOT_PENDING' }
  }
  // 帧是瞬时的，不进事件环/磁盘；只推给当前订阅了 SSE 的手机。
  const streamStates = new Map()
  const DELTA_FLUSH_MS = 120
  const TOOL_FLUSH_MS = 180

  function cleanupStream(sessionId) {
    const state = streamStates.get(sessionId)
    if (!state) return
    if (state.textTimer) clearTimeout(state.textTimer)
    if (state.toolTimer) clearTimeout(state.toolTimer)
    streamStates.delete(sessionId)
  }

  function publishDelta(sessionId, state) {
    if (!state) return
    streams.publish(sessionId, {
      id: 'delta-' + String(state.attemptId || ''),
      seq: 0,
      type: 'message.assistant.delta',
      at: Date.now(),
      payload: {
        text: state.text,
        reasoning: state.reasoning || '',
        turn: state.turn,
        step: state.step,
      },
    })
  }

  function flushTools(sessionId) {
    const state = streamStates.get(sessionId)
    if (!state) return
    state.toolTimer = 0
    for (const [callId, tool] of state.tools) {
      streams.publish(sessionId, {
        id: 'tool-' + callId,
        seq: 0,
        type: 'tool.update',
        at: Date.now(),
        payload: { callId, name: tool.name, args: tool.args, summary: summarizeToolArgs(tool.args) },
      })
    }
  }

  function handleAssistantStream(payload) {
    try {
      const agent = payload && payload.agent
      const sessionId = String((agent && agent.id) || '')
      // 没有手机在听就不做任何拼装
      if (!sessionId || streams.count(sessionId) === 0) return
      const frame = (payload && payload.frame) || {}
      if (frame.type === 'start') {
        cleanupStream(sessionId)
        streamStates.set(sessionId, {
          attemptId: String(frame.attemptId || ''),
          turn: Number(frame.turn) || 0,
          step: Number(frame.step) || 0,
          text: '',
          reasoning: '',
          tools: new Map(),
          textTimer: 0,
          toolTimer: 0,
        })
        return
      }
      const state = streamStates.get(sessionId)
      if (!state) return
      if (frame.type === 'chunk') {
        const chunk = frame.chunk || {}
        if (chunk.type === 'text-delta' && chunk.text) {
          state.text += String(chunk.text)
          if (!state.textTimer) {
            state.textTimer = setTimeout(() => {
              const current = streamStates.get(sessionId)
              if (!current) return
              current.textTimer = 0
              publishDelta(sessionId, current)
            }, DELTA_FLUSH_MS)
          }
        } else if (chunk.type === 'reasoning-delta' && chunk.text) {
          state.reasoning += String(chunk.text)
          if (!state.textTimer) {
            state.textTimer = setTimeout(() => {
              const current = streamStates.get(sessionId)
              if (!current) return
              current.textTimer = 0
              publishDelta(sessionId, current)
            }, DELTA_FLUSH_MS)
          }
        } else if (chunk.type === 'tool-call-delta') {
          const callId = String(chunk.id || '')
          if (!callId) return
          const tool = state.tools.get(callId) || { name: '', args: '' }
          if (chunk.name) tool.name = String(chunk.name)
          if (chunk.argumentsDelta) tool.args += String(chunk.argumentsDelta)
          state.tools.set(callId, tool)
          if (!state.toolTimer) state.toolTimer = setTimeout(() => flushTools(sessionId), TOOL_FLUSH_MS)
        }
        return
      }
      if (frame.type === 'end') {
        if (state.textTimer) {
          clearTimeout(state.textTimer)
          state.textTimer = 0
        }
        if (state.toolTimer) {
          clearTimeout(state.toolTimer)
          state.toolTimer = 0
        }
        flushTools(sessionId)
        publishDelta(sessionId, state)
        streams.publish(sessionId, {
          id: 'delta-' + String(state.attemptId || ''),
          seq: 0,
          type: 'message.assistant.delta',
          at: Date.now(),
          payload: { ended: true },
        })
        cleanupStream(sessionId)
      }
    } catch {
      /* 流式失败不影响主流程 */
    }
  }

  const server = createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      json(res, 204, {})
      return
    }
    const publicPath = new URL(req.url, 'http://localhost').pathname
    const isPublic = publicPath === '/health' || publicPath === '/apk'
    if (!authorized(req) && !(req.method === 'GET' && isPublic)) {
      json(res, 401, { error: '令牌不正确' })
      return
    }
    const url = new URL(req.url, 'http://localhost')
    attachFallbackListeners()

    if (req.method === 'GET' && url.pathname === '/health') {
      await ensureAutoTarget()
      const remote = String((req.socket && req.socket.remoteAddress) || '')
      const loopback = remote.startsWith('127.') || remote === '::1' || remote.startsWith('::ffff:127.')
      json(res, 200, {
        ok: true,
        relay: 'phone',
        session: target,
        targetOnline: target ? Boolean(ctx.agents.get(target)) : false,
        running: targetRunning,
        tool: targetTool,
        lastEventAt: targetLastEventAt,
        lastEventAgeMs: targetLastEventAt ? Math.max(0, Date.now() - targetLastEventAt) : 0,
        lastTurnError: targetLastTurnError,
        lastAssistantSeq: targetLastAssistantSeq,
        instance: INSTANCE_ID,
        title: currentTitle(),
        history: history.length,
        lastPoll,
        now: Date.now(),
        port: config.port,
        bindHost: config.bindHost,
        urls: lanUrls(config.port),
        tokenSet: Boolean(effectiveToken),
        approvalBuild: 4,
        // P1 协议：事件游标、待审批/待回答数量、SSE 订阅数
        seq: lastEventSeq,
        eventCursor: currentCursor(ctx.agents.get(target)?.session),
        pendingApprovals: pendingApprovals.size,
        pendingInputs: pendingInputsFor(ctx.agents.get(target), ctx.agents.get(target)?.session).length,
        phoneInput,
        questionStream: gatewaySupported
          ? (questionBridge && questionBridge.available() ? 'gateway' : 'connecting')
          : 'legacy',
        approvalStream: gatewaySupported
          ? (approvalBridge && approvalBridge.available() ? 'gateway' : 'connecting')
          : 'legacy',
        events: streams.count(target),
      })
      return
    }

    if (req.method === 'POST' && url.pathname === '/presence') {
      let body = ''
      for await (const chunk of req) body += chunk
      try {
        const parsed = JSON.parse(body || '{}')
        if (parsed.phone !== undefined) phoneMode = Boolean(parsed.phone)
        if (parsed.input !== undefined) phoneInput = Boolean(parsed.input)
      } catch {
        /* 忽略坏 body */
      }
      json(res, 200, { ok: true, phone: phoneMode, input: phoneInput })
      return
    }

    // 手机回传审批：Gateway 可用时走官方 $events/result
    if (req.method === 'POST' && url.pathname === '/approvals') {
      let parsed = null
      try {
        parsed = await readJson(req)
      } catch {
        json(res, 400, { ok: false, error: '请求格式不对' })
        return
      }
      const key = String((parsed && parsed.id) || '')
      const entry = pendingApprovals.get(key) || pendingByApprovalId.get(key)
      if (!entry) {
        json(res, 200, { ok: true, handled: false })
        return
      }
      let decision = 'allow'
      if (parsed.decision !== undefined) {
        const value = String(parsed.decision)
        decision = value === 'deny' || value === 'reject' || value === 'rejected' ? 'deny' : 'allow'
      } else if (parsed.allow !== undefined) {
        decision = parsed.allow ? 'allow' : 'deny'
      }
      const result = await answerApproval(entry, decision)
      if (result.error) {
        json(res, result.status || 409, { ok: false, error: result.error, code: result.code || '' })
        return
      }
      json(res, 200, { ok: true, id: entry.id, approvalId: entry.approvalId || '', decision })
      return
    }

    // P1：待回答的提问（开放中 + 超时后还能补答的）
    if (req.method === 'GET' && url.pathname === '/inputs') {
      const requested = String(url.searchParams.get('session') || '')
      const resolved = await resolveSessionTarget(requested)
      if (!resolved) {
        json(res, 409, { ok: false, error: '这个会话打不开' })
        return
      }
      json(res, 200, {
        ok: true,
        session: String(resolved.session.id || ''),
        inputs: pendingInputsFor(resolved.agent, resolved.session),
      })
      return
    }

    // P1：回答提问 { id | callId, answers: [{ id, selected, custom? }] }
    if (req.method === 'POST' && url.pathname === '/respond') {
      let parsed = null
      try {
        parsed = await readJson(req)
      } catch {
        json(res, 400, { ok: false, error: '请求格式不对' })
        return
      }
      const rawId = String((parsed && (parsed.id || parsed.callId)) || '')
      const callId = rawId.startsWith('input-') ? rawId.slice('input-'.length) : rawId
      const answers = normalizeAnswers(parsed && parsed.answers)
      if (!callId || !answers.length) {
        json(res, 400, { ok: false, error: '缺少提问 id 或答案' })
        return
      }
      const result = await answerQuestion(callId, answers, parsed && parsed.session)
      if (result.error) {
        json(res, result.status || 409, { ok: false, error: result.error, code: result.code || '' })
        return
      }
      json(res, 200, { ok: true, callId, mode: result.mode, accepted: result.accepted })
      return
    }

    if (req.method === 'GET' && url.pathname === '/options') {
      json(res, 200, await optionList())
      return
    }

    if (req.method === 'GET' && url.pathname === '/messages') {
      lastPoll = Date.now()
      // 重启后 target 还在、Agent 被回收：像电脑端点开一样恢复它
      if (target && !ctx.agents.get(target)) await ensureTargetAgent(false)
      // 保存下来的 target 如果是空白会话（以前点过“新对话”留下的），
      // 自动切到最近有内容的会话；刚由 /new 建好的空白会话除外。
      if (target && !keepBlankTarget && sessionIsBlank(ctx.agents.get(target)?.session)) {
        const picked = await pickDefaultTarget(getController())
        if (picked) {
          target = picked
          keepBlankTarget = false
          history = []
          lastEventSeq = -1
        }
      }
      if (!target) {
        const picked = await pickDefaultTarget(getController())
        if (picked) target = picked
      }
      const recent = Number(url.searchParams.get('recent') || 0)
      const since = Number(url.searchParams.get('since') || 0)
      const agent = target ? ctx.agents.get(target) : null
      if (recent > 0) {
        // 打开/刷新会话：从日志抄最后 N 条用户 + N 条助手（默认 5+5），不保留更早的
        buildRecentWindow(agent, recent)
      } else {
        if (history.length === 0) buildRecentWindow(agent)
        syncFromSession()
      }
      const messages = recent > 0 || since <= 0
        ? orderedHistory()
        : orderedHistory().filter((entry) => entry.id > since)
      json(res, 200, {
        messages,
        last: nextId - 1,
        current: target,
        online: target ? Boolean(ctx.agents.get(target)) : false,
        running: targetRunning,
        tool: targetTool,
        lastEventAt: targetLastEventAt,
        lastEventAgeMs: targetLastEventAt ? Math.max(0, Date.now() - targetLastEventAt) : 0,
        lastTurnError: targetLastTurnError,
        lastAssistantSeq: targetLastAssistantSeq,
        instance: INSTANCE_ID,
        title: currentTitle(),
        meta: sessionMeta(ctx.agents.get(target)),
      })
      return
    }

    // P1：会话快照（打开/切换会话时只拉一次）
    if (req.method === 'GET' && url.pathname === '/snapshot') {
      lastPoll = Date.now()
      const requested = String(url.searchParams.get('session') || '')
      const resolved = await resolveSessionTarget(requested)
      if (!resolved) {
        // 会话打不开（被回收 / DSH 刚重启）：退回磁盘事件缓存，手机至少还能看到内容
        const cached = eventLogFor(requested || target)
        if (cached.size > 0) {
          json(res, 200, {
            ok: true,
            session: {
              id: requested || target,
              title: '',
              cwd: '',
              online: false,
              running: false,
              lastEventAt: 0,
              lastTurnError: false,
              tool: null,
              model: null,
              preset: '',
              permission: '',
            },
            events: cached.all(),
            cursor: cached.cursor,
            truncated: false,
            source: 'cache',
            pending: { approvals: pendingApprovalsList(requested), inputs: [] },
            instance: INSTANCE_ID,
            now: Date.now(),
          })
          return
        }
        json(res, 409, { ok: false, error: '这个会话打不开' })
        return
      }
      const view = sessionView(resolved.agent, resolved.session)
      const snapshot = snapshotFor(resolved.session, {
        turns: Number(url.searchParams.get('turns') || 0),
        before: Number(url.searchParams.get('before') || 0),
      })
      json(res, 200, {
        ok: true,
        session: view,
        events: snapshot.events,
        cursor: snapshot.cursor,
        truncated: snapshot.truncated,
        hasMore: Boolean(snapshot.hasMore),
        oldestSeq: snapshot.oldestSeq || 0,
        source: snapshot.source,
        snapshotMode: snapshot.snapshotMode,
        pending: {
          approvals: pendingApprovalsList(view.id),
          inputs: pendingInputsFor(resolved.agent, resolved.session),
        },
        projections: readProjections(resolved.session),
        instance: INSTANCE_ID,
        now: Date.now(),
      })
      return
    }

    // P1：实时事件流（SSE）。after 是上一次收到的最大 seq，断线重连时补拉
    if (req.method === 'GET' && url.pathname === '/events') {
      const requested = String(url.searchParams.get('session') || '')
      const resolved = await resolveSessionTarget(requested)
      if (!resolved) {
        json(res, 409, { ok: false, error: '这个会话打不开' })
        return
      }
      const rawAfter = url.searchParams.get('after')
      const after = rawAfter === null || rawAfter === '' ? null : toNumber(rawAfter)
      openEventStream(req, res, resolved.agent, resolved.session, after)
      return
    }

    if (req.method === 'GET' && url.pathname.startsWith('/image/')) {
      const requested = decodeURIComponent(url.pathname.slice('/image/'.length)).replace(/^file:/, '')
      const name = basename(requested)
      let file = name ? join(IMAGES_DIR, name) : ''
      // 旧缓存里可能还是 sha256: 附件 id，直接回源到 DSH 的附件库
      if (!file || !existsSync(file)) file = attachmentObjectPath(requested)
      if (!file || !existsSync(file)) {
        json(res, 404, { error: '没有这张图' })
        return
      }
      res.writeHead(200, {
        'Content-Type': sniffImageType(file),
        'Content-Length': String(statSync(file).size),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      })
      createReadStream(file).pipe(res)
      return
    }

    if (req.method === 'GET' && url.pathname === '/sessions') {
      const list = await historySessions()
      json(res, 200, {
        current: target,
        sessions: list.map((item) => {
          const agent = ctx.agents.get(item.id)
          return {
            ...item,
            lastMessageAt: Number(item.at) || 0,
            lastSeq: agent && agent.session ? currentCursor(agent.session) : null,
          }
        }),
        archived: await archivedSessions(),
      })
      return
    }

    if (req.method === 'POST' && (url.pathname === '/session/archive' || url.pathname === '/session/unarchive')) {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const id = String(body.id || '')
      if (!id) {
        json(res, 400, { error: '缺少会话' })
        return
      }
      const controller = ctx.get('workspaceController')
      const registry = ctx.get('workspaceRegistry')
      const archiving = url.pathname.endsWith('/archive')
      try {
        if (archiving) {
          if (id === target) {
            json(res, 409, { error: '当前会话不能归档，先切到别的会话', code: 'current-session' })
            return
          }
          if (controller && typeof controller.archiveSession === 'function') {
            await controller.archiveSession({
              sessionId: id,
              ...(body.stopActivity === true ? { stopActivity: true } : {}),
            })
          } else if (registry && typeof registry.archiveSession === 'function') {
            await registry.archiveSession(id, body.stopActivity === true ? { stopActivity: true } : {})
          } else {
            json(res, 503, { error: '这个版本的 DSH 不能归档会话' })
            return
          }
        } else if (controller && typeof controller.unarchiveSession === 'function') {
          await controller.unarchiveSession({ sessionId: id })
        } else if (registry && typeof registry.unarchiveSession === 'function') {
          await registry.unarchiveSession(id)
        } else {
          json(res, 503, { error: '这个版本的 DSH 不能恢复会话' })
          return
        }
        json(res, 200, { ok: true })
      } catch (error) {
        const code = error && error.code
        json(res, code === 'workspace/session-active' ? 409 : 400, {
          error: (error && error.message) || '操作失败',
          code: code || '',
        })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/new') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        body = {}
      }
      const controller = getController()
      if (!controller || typeof controller.create !== 'function') {
        json(res, 503, { error: '这个版本的 DSH 不能从手机新建对话' })
        return
      }
      try {
        const previous = target
        const live = target ? ctx.agents.get(target) : null
        const blank = sessionIsBlank(live && live.session)
        const cwd = live && live.session.header.cwd
          ? live.session.header.cwd
          : await preferredCwd(controller)
        const request = {}
        if (cwd) {
          // 能对上工作区就挂进去，电脑端侧栏里也能看到这条新对话
          const workspace = workspaceForCwd(cwd)
          if (workspace) request.workspaceId = workspace.id
          else request.cwd = cwd
        }
        if (body && typeof body.cwd === 'string' && body.cwd) {
          request.cwd = body.cwd
          delete request.workspaceId
        }
        if (body && typeof body.preset === 'string' && body.preset) {
          request.agentPreset = body.preset
        }
        // 当前就是一个没说过话的会话时，直接复用它，别堆一串空白会话；
        // 但模式不同就不能复用（模式建完改不了）
        if (blank && target && samePreset(target, request.agentPreset)) request.sessionId = target
        const created = await controller.create(request)
        const id = String(created && created.sessionId ? created.sessionId : '')
        if (!id) throw new Error('没有拿到新会话 id')
        target = id
        keepBlankTarget = true
        history = []
        lastEventSeq = -1
        if (pendingTimer) {
          clearTimeout(pendingTimer)
          pendingTimer = null
        }
        pendingImages = []
        pendingFiles = []
        // 权限只在新建时设一次；没有对应服务就交给环境默认
        const permission = body && typeof body.permission === 'string' ? body.permission : ''
        if (permission) {
          if (!ctx.agents.get(id) && typeof controller.resolveAgent === 'function') {
            try {
              await controller.resolveAgent(id)
            } catch {
              /* 忽略：恢复失败就等发第一条消息时再说 */
            }
          }
          applyPermission(id, permission)
        }
        const model = body && body.model && typeof body.model === 'object' ? body.model : null
        if (model && typeof controller.selectModel === 'function') {
          if (!ctx.agents.get(id) && typeof controller.resolveAgent === 'function') {
            try {
              await controller.resolveAgent(id)
            } catch {
              /* 忽略 */
            }
          }
          try {
            await controller.selectModel({
              sessionId: id,
              provider: String(model.provider || ''),
              model: String(model.model || ''),
              ...(model.reasoningEffort ? { reasoningEffort: String(model.reasoningEffort) } : {}),
            })
          } catch {
            /* 换模型失败不阻塞新建，保持环境默认 */
          }
        }
        const title = body && typeof body.title === 'string' ? body.title.trim() : ''
        if (title && typeof controller.rename === 'function') {
          try {
            await controller.rename({ sessionId: id, title })
          } catch {
            /* 标题设置失败不阻塞新建 */
          }
        }
        buildRecentWindow(ctx.agents.get(target))
        json(res, 200, {
          ok: true,
          current: target,
          created: id !== previous,
          title: currentTitle(),
          history: history.length,
          meta: sessionMeta(ctx.agents.get(target)),
        })
      } catch (error) {
        json(res, 500, { error: '新建对话失败：' + (error && error.message ? error.message : String(error)) })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/target') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const id = String(body.id || '')
      if (!id) {
        json(res, 409, { error: '缺少会话 id' })
        return
      }
      let agent = ctx.agents.get(id)
      if (!agent) {
        const controller = getController()
        if (controller && typeof controller.resolveAgent === 'function') {
          try {
            const result = await controller.resolveAgent(id)
            if (result && result.agent) agent = result.agent
            else if (result && result.error) {
              json(res, 409, { error: result.error.message || '这个会话打不开' })
              return
            }
          } catch (error) {
            json(res, 409, { error: '打开会话失败：' + (error && error.message ? error.message : String(error)) })
            return
          }
        }
      }
      if (!agent) {
        json(res, 409, { error: '这个会话打不开' })
        return
      }
      target = id
      keepBlankTarget = sessionIsBlank(agent.session)
      // 打开会话只抄最后 5 条用户 + 5 条助手，不保留更早的历史
      history = []
      lastEventSeq = -1
      if (pendingTimer) {
        clearTimeout(pendingTimer)
        pendingTimer = null
      }
      pendingImages = []
      pendingFiles = []
      buildRecentWindow(agent)
      json(res, 200, { ok: true, current: target, history: history.length, title: currentTitle() })
      return
    }

    if (req.method === 'POST' && url.pathname === '/push-file') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const filePath = String(body.path || '')
      if (!filePath || !existsSync(filePath)) {
        json(res, 400, { error: '找不到文件：' + filePath })
        return
      }
      try {
        mkdirSync(FILES_DIR, { recursive: true })
        const original = filePath.split(/[\\/]/).pop()
        const name = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6) + '-' + original
        writeFileSync(join(FILES_DIR, name), readFileSync(filePath))
        const id = 'file:' + name
        const entry = { id, name: original, size: statSync(filePath).size }
        fileNames.set(id, original)
        pendingFiles.push(entry)
        if (pendingTimer) clearTimeout(pendingTimer)
        pendingTimer = setTimeout(() => {
          pendingTimer = null
          if (pendingImages.length === 0 && pendingFiles.length === 0) return
          const queuedImages = pendingImages
          const queuedFiles = pendingFiles
          pendingImages = []
          pendingFiles = []
          push('ai', '', queuedImages, queuedFiles)
        }, 60000)
        json(res, 200, { ok: true, queued: id, name: original, size: entry.size })
      } catch (error) {
        json(res, 500, { error: '登记文件失败：' + error.message })
      }
      return
    }

    // 交付文件：只允许取 session 日志里 deliverables/presented 声明过的路径
    if (req.method === 'GET' && url.pathname === '/presented/file') {
      const sessionId = String(url.searchParams.get('session') || '')
      const seq = Number(url.searchParams.get('seq'))
      const index = Number(url.searchParams.get('index'))
      if (!Number.isSafeInteger(seq) || !Number.isSafeInteger(index) || index < 0) {
        json(res, 400, { error: '缺少文件坐标' })
        return
      }
      const agent = (sessionId && ctx.agents.get(sessionId)) || resolveAgent()
      const session = agent && agent.session
      if (!session) {
        json(res, 404, { error: '没有这个会话' })
        return
      }
      let declared = null
      try {
        const events = typeof session.snapshotEvents === 'function' ? session.snapshotEvents(seq) : []
        const event = events.find(
          (item) => Number(item.seq) === seq && item.type === 'deliverables/presented',
        )
        const file = event && Array.isArray(event.data?.files) ? event.data.files[index] : null
        if (file && typeof file.path === 'string' && file.path.trim()) declared = file
      } catch {
        declared = null
      }
      if (!declared) {
        json(res, 404, { error: '没有这个交付文件' })
        return
      }
      const cwd = String((session.header && session.header.cwd) || (agent && agent.cwd) || process.cwd())
      const filePath = isAbsolute(declared.path) ? declared.path : join(cwd, declared.path)
      try {
        if (!existsSync(filePath) || !statSync(filePath).isFile()) {
          json(res, 404, { error: '文件不存在' })
          return
        }
        const size = statSync(filePath).size
        if (size > 25 * 1024 * 1024) {
          json(res, 413, { error: '文件太大（上限 25MB）' })
          return
        }
        const ext = filePath.toLowerCase().slice(filePath.lastIndexOf('.'))
        const type =
          {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.webp': 'image/webp',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            '.txt': 'text/plain; charset=utf-8',
            '.md': 'text/markdown; charset=utf-8',
            '.json': 'application/json; charset=utf-8',
            '.zip': 'application/zip',
            '.apk': 'application/vnd.android.package-archive',
          }[ext] || 'application/octet-stream'
        const downloadName = String(url.searchParams.get('name') || basename(filePath) || 'file')
        res.writeHead(200, {
          'Content-Type': type,
          'Content-Length': String(size),
          'Content-Disposition': 'attachment; filename="' + encodeURIComponent(downloadName) + '"',
          'Access-Control-Allow-Origin': '*',
        })
        createReadStream(filePath).pipe(res)
      } catch (error) {
        json(res, 500, { error: '读取文件失败：' + (error && error.message) })
      }
      return
    }

    if (req.method === 'GET' && url.pathname.startsWith('/file/')) {
      const requested = decodeURIComponent(url.pathname.slice('/file/'.length)).replace(/^file:/, '')
      const name = basename(requested)
      let file = name ? join(FILES_DIR, name) : ''
      // 会话里的附件文件（sha256）直接回源到 DSH 附件库
      if (!file || !existsSync(file)) file = attachmentObjectPath(requested)
      if (!file || !existsSync(file)) {
        json(res, 404, { error: '没有这个文件' })
        return
      }
      const downloadName = fileNames.get('file:' + name) || String(url.searchParams.get('name') || name || 'file')
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Length': String(statSync(file).size),
        'Content-Disposition': 'attachment; filename="' + encodeURIComponent(downloadName) + '"',
        'Access-Control-Allow-Origin': '*',
      })
      createReadStream(file).pipe(res)
      return
    }

    if (req.method === 'GET' && url.pathname === '/apk') {
      if (!existsSync(APK_PATH)) {
        json(res, 404, { error: '没有找到安装包：' + APK_PATH })
        return
      }
      res.writeHead(200, {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Length': String(statSync(APK_PATH).size),
        'Content-Disposition': 'attachment; filename="docklet-debug.apk"',
        'Access-Control-Allow-Origin': '*',
      })
      createReadStream(APK_PATH).pipe(res)
      return
    }

    if (req.method === 'POST' && url.pathname === '/push-image') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const filePath = String(body.path || '')
      if (!filePath || !existsSync(filePath)) {
        json(res, 400, { error: '找不到文件：' + filePath })
        return
      }
      const ext = filePath.toLowerCase().split('.').pop()
      const allowed = ['png', 'jpg', 'jpeg', 'webp', 'gif']
      if (!allowed.includes(ext)) {
        json(res, 400, { error: '只支持 png/jpg/webp/gif' })
        return
      }
      try {
        mkdirSync(IMAGES_DIR, { recursive: true })
        const name = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6) + '.' + ext
        writeFileSync(join(IMAGES_DIR, name), readFileSync(filePath))
        const entry = { id: 'file:' + name }
        pendingImages.push(entry)
        if (pendingTimer) clearTimeout(pendingTimer)
        pendingTimer = setTimeout(() => {
          pendingTimer = null
          if (pendingImages.length === 0) return
          const queued = pendingImages
          pendingImages = []
          push('ai', '', queued)
        }, 60000)
        json(res, 200, { ok: true, queued: entry.id })
      } catch (error) {
        json(res, 500, { error: '存图失败：' + error.message })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/upload-image') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const attachments = ctx.attachments
      if (!attachments || typeof attachments.saveImages !== 'function') {
        json(res, 503, { error: '这个版本的 DSH 不能存附件' })
        return
      }
      const mediaType = String(body.mediaType || '')
      const data = String(body.data || '')
      if (!data || !mediaType.startsWith('image/')) {
        json(res, 400, { error: '缺少图片数据' })
        return
      }
      try {
        const refs = await attachments.saveImages([
          {
            data: Buffer.from(data, 'base64'),
            mediaType,
            ...(body.name ? { name: String(body.name) } : {}),
          },
        ])
        json(res, 200, { attachment: refs[0] })
      } catch (error) {
        json(res, 400, { error: (error && error.message) || '存图失败' })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/upload-file') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const attachments = ctx.attachments
      if (!attachments) {
        json(res, 503, { error: '这个版本的 DSH 不能存附件' })
        return
      }
      const data = String(body.data || '')
      const name = body.name ? String(body.name) : undefined
      if (!data) {
        json(res, 400, { error: '缺少文件数据' })
        return
      }
      try {
        const ref = typeof attachments.admitEncodedFile === 'function'
          ? await attachments.admitEncodedFile({ data, ...(name ? { name } : {}) })
          : await attachments.saveFile({ data: Buffer.from(data, 'base64'), ...(name ? { name } : {}) })
        json(res, 200, { attachment: ref })
      } catch (error) {
        json(res, 400, { error: (error && error.message) || '存文件失败' })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/model') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const controller = getController()
      if (!controller || typeof controller.selectModel !== 'function') {
        json(res, 503, { error: '这个版本的 DSH 不能从手机换模型' })
        return
      }
      const sessionId = String(body.sessionId || target || '')
      const provider = String(body.provider || '')
      const model = String(body.model || '')
      if (!sessionId || !provider || !model) {
        json(res, 400, { error: '缺少会话或模型' })
        return
      }
      try {
        const value = await controller.selectModel({
          sessionId,
          provider,
          model,
          ...(body.reasoningEffort ? { reasoningEffort: String(body.reasoningEffort) } : {}),
        })
        json(res, 200, {
          ok: true,
          selected: (value && value.selected) || null,
          meta: sessionMeta(ctx.agents.get(sessionId)),
        })
      } catch (error) {
        json(res, 400, { error: (error && error.message) || '换模型失败' })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/rename') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const id = String(body.id || target || '')
      const title = String(body.title || '').trim()
      if (!id || !title) {
        json(res, 400, { error: '缺少会话或标题' })
        return
      }
      const controller = getController()
      if (!controller || typeof controller.rename !== 'function') {
        json(res, 503, { error: '这个版本的 DSH 不能重命名会话' })
        return
      }
      try {
        const result = await controller.rename({ sessionId: id, title })
        json(res, 200, { ok: true, title: (result && result.title) || title, seq: result && result.seq })
      } catch (error) {
        json(res, 400, { error: (error && error.message) || '重命名失败' })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/fork') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const id = String(body.id || target || '')
      if (!id) {
        json(res, 400, { error: '缺少会话' })
        return
      }
      const controller = getController()
      if (!controller || typeof controller.fork !== 'function') {
        json(res, 503, { error: '这个版本的 DSH 不能分支会话' })
        return
      }
      try {
        const atSeq = Number(body.atSeq)
        const result = await controller.fork({
          sessionId: id,
          ...(Number.isSafeInteger(atSeq) ? { atSeq } : {}),
        })
        const sessionId = String((result && result.sessionId) || '')
        json(res, 200, { ok: true, sessionId })
      } catch (error) {
        json(res, 400, { error: (error && error.message) || '分支失败' })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/permission') {
      let body = {}
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const preset = String(body.preset || body.permission || '').trim()
      if (!preset) {
        json(res, 400, { error: '缺少权限' })
        return
      }
      const agent = resolveAgent()
      if (!agent || !agent.session) {
        json(res, 409, { ok: false, error: '没有打开中的会话' })
        return
      }
      const pool = getService('permissionPresets')
      if (!pool || typeof pool.set !== 'function') {
        json(res, 409, { ok: false, error: '当前 DSH 不支持切换权限' })
        return
      }
      try {
        pool.set(agent.session, preset)
        json(res, 200, { ok: true, meta: sessionMeta(agent) })
      } catch (error) {
        json(res, 500, { ok: false, error: (error && error.message) || '切换权限失败' })
      }
      return
    }

    if (req.method === 'POST' && (url.pathname === '/stop' || url.pathname === '/interrupt')) {
      const agent = resolveAgent()
      if (!agent) {
        json(res, 409, { ok: false, error: '没有正在运行的会话' })
        return
      }
      try {
        agent.cancel({ kind: 'user' })
        json(res, 200, { ok: true })
      } catch (error) {
        json(res, 500, { ok: false, error: (error && error.message) || '停止失败' })
      }
      return
    }

    if (req.method === 'POST' && url.pathname === '/send') {
      let raw = ''
      for await (const chunk of req) raw += chunk
      let body = {}
      try {
        body = JSON.parse(raw || '{}')
      } catch {
        json(res, 400, { error: 'bad json' })
        return
      }
      const text = String(body.text || '').trim()
      const validRef = (ref) => ref && /^sha256:[0-9a-f]{64}$/i.test(String(ref.attachmentId || ''))
      const images = (Array.isArray(body.images) ? body.images : []).filter(validRef)
      const files = (Array.isArray(body.files) ? body.files : []).filter(validRef)
      if (!text && images.length === 0 && files.length === 0) {
        json(res, 400, { error: '空消息' })
        return
      }
      // 切到哪个会话就只发到哪个会话；没有 target 时选最近的真实会话
      if (!target) {
        const picked = await pickDefaultTarget(getController())
        if (picked) target = picked
      }
      const agent = target ? await ensureTargetAgent(true) : resolveAgent()
      if (!agent) {
        json(res, 409, {
          error: target
            ? '目标会话不在线，请重新切换对话'
            : '没有可用的会话：插件看不到活跃的 Agent',
        })
        return
      }
      if (!target) target = String(agent.id)
      const content = []
      if (text) content.push({ type: 'text', text })
      for (const ref of images) content.push({ type: 'image', attachment: ref })
      for (const ref of files) content.push({ type: 'file', attachment: ref })
      agent.followup(createUserMessage({ content, source: { kind: 'user' } }))
      json(res, 200, { ok: true, current: target })
      return
    }

    json(res, 404, { error: 'not found' })
  })

  // 同源接口：网页里的设置页读写它，避免跨端口被 CSP 拦
  // 用 inject 等 webServer 就绪：插件比 web 早加载时也能注册上
  ctx.inject(['webServer'], (scope) => {
    scope.effect(() => scope.webServer.register({
      kind: 'exact',
      path: '/phone-relay/health',
      handler: (req, res) => {
        const remote = String((req.socket && req.socket.remoteAddress) || '')
        const loopback = remote.startsWith('127.') || remote === '::1' || remote.startsWith('::ffff:127.')
        if (req.method === 'POST') {
          if (!loopback) {
            res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify({ ok: false, error: '只允许本机修改' }))
            return
          }
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
            if (body.length > 4096) req.destroy()
          })
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body || '{}')
              let token = null
              if (parsed.token !== undefined) {
                token = String(parsed.token || '').trim()
                if (token.length < 4 || token.length > 64) {
                  res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
                  res.end(JSON.stringify({ ok: false, error: '令牌长度 4–64' }))
                  return
                }
                effectiveToken = token
                try {
                  mkdirSync(TOKEN_DIR, { recursive: true })
                  writeFileSync(join(TOKEN_DIR, 'token'), token, { mode: 0o600 })
                } catch {
                  /* 写不了就只在本次运行使用 */
                }
                void persistConfig(ctx, { token })
              }
              if (parsed.tunnelUrl !== undefined) {
                const next = String(parsed.tunnelUrl || '').trim()
                if (next && !/^https?:\/\//.test(next)) {
                  res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
                  res.end(JSON.stringify({ ok: false, error: '地址要以 http:// 或 https:// 开头' }))
                  return
                }
                tunnelUrl = next.replace(/\/+$/, '')
                void persistConfig(ctx, { tunnelUrl })
              }
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
              res.end(JSON.stringify({ ok: true, saved: true, token: effectiveToken, tunnelUrl }))
            } catch (error) {
              res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
              res.end(JSON.stringify({ ok: false, error: '请求格式不对' }))
            }
          })
          return
        }
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
        })
        res.end(
          JSON.stringify({
            ok: true,
            port: config.port,
            bindHost: config.bindHost,
            urls: lanUrls(config.port),
            addresses: lanAddresses(config.port),
            tunnelUrl,
            tokenSet: Boolean(effectiveToken),
            token: loopback ? effectiveToken : undefined,
          }),
        )
      },
    }), 'phone-relay.web')

  })

  /**
   * 提问（user-questions/request，agent 作用域 waterfall）。
   * 手机开着对话时接住，等 /respond 回填答案；手机不在时直接让给电脑端的提问卡片。
   * 15 分钟没人答也还给电脑端，避免把工具卡死。
   */
  function handleQuestion(req, next) {
    const callId = String((req && req.wait && req.wait.callId) || '')
    // 手机没开、或这版应用还没有输入卡片：让给电脑端
    if (!phoneMode || !phoneInput || !callId) return next()
    const questions = normalizeQuestions(req && req.questions)
    return new Promise((resolve) => {
      let settled = false
      let timer = null
      const sessionId = String((req.agent && req.agent.id) || '')
      const entry = {
        id: callId,
        callId,
        session: sessionId,
        questions,
        at: Date.now(),
        resolve: null,
      }
      const finish = (value) => {
        if (settled) return
        settled = true
        if (timer) clearTimeout(timer)
        if (req.signal && typeof req.signal.removeEventListener === 'function') {
          req.signal.removeEventListener('abort', onAbort)
        }
        pendingQuestions.delete(callId)
        resolve(value)
      }
      let delegated = false
      const delegate = () => {
        if (delegated || settled) return
        delegated = true
        Promise.resolve()
          .then(() => next())
          .then(
            (value) => finish(value),
            () => finish({ answers: [] }),
          )
      }
      const onAbort = () => delegate()
      timer = setTimeout(delegate, QUESTION_WAIT_MS)
      entry.resolve = (answers) => finish({ answers })
      pendingQuestions.set(callId, entry)
      if (req.signal && typeof req.signal.addEventListener === 'function') {
        if (req.signal.aborted) {
          delegate()
          return
        }
        req.signal.addEventListener('abort', onAbort, { once: true })
      }
    })
  }

  // 提问 fallback：仅老版本 DSH / harness 没有 Gateway 时使用
  const questionListeners = new Map()
  // P3：assistant 流式帧（emit 事件，不需要 prepend）
  const streamListeners = new Map()
  function attachFallbackListeners() {
    let list = []
    try {
      list = ctx.agents.list()
    } catch {
      return
    }
    const ids = new Set()
    for (const agent of list) {
      const id = String((agent && agent.id) || '')
      if (!id) continue
      ids.add(id)
      const agentCtx = agent.ctx
      if (!agentCtx) continue
      if (!questionListeners.has(id) && !gatewaySupported) {
        try {
          questionListeners.set(id, agentCtx.on('user-questions/request', handleQuestion, true))
        } catch {
          /* 下一轮再试 */
        }
      }
      if (!streamListeners.has(id)) {
        try {
          streamListeners.set(id, agentCtx.on('agent/assistant-stream', handleAssistantStream))
        } catch {
          /* 下一轮再试 */
        }
      }
    }
    if (gatewaySupported && questionListeners.size) detachQuestionFallback()
    for (const map of [questionListeners, streamListeners]) {
      for (const [id, dispose] of map) {
        if (ids.has(id)) continue
        map.delete(id)
        try {
          dispose()
        } catch {
          /* 忽略 */
        }
      }
    }
  }

  // 官方 Gateway 的问答事件流：被动接收，不替换官方回答者
  try {
    ctx.inject(['typertGateway', 'connection'], (ready) => {
      gatewaySupported = true
      questionBridge = createQuestionBridge({
        gateway: ready.typertGateway,
        connection: ready.connection,
        onQuestion: (frame) => receiveGatewayQuestion(frame),
        onCancel: (eventId) => receiveGatewayCancel(eventId),
        onReady: () => {
          detachQuestionFallback()
        },
        onError: (error) => {
          console.warn('[phone-relay] 问答事件流不可用：' + ((error && error.message) || error))
        },
      })
      approvalBridge = createQuestionBridge({
        gateway: ready.typertGateway,
        connection: ready.connection,
        eventName: 'approval/request',
        onQuestion: (frame) => receiveGatewayApproval(frame),
        onCancel: (eventId) => receiveGatewayApprovalCancel(eventId),
        onError: (error) => {
          console.warn('[phone-relay] 审批事件流不可用：' + ((error && error.message) || error))
        },
      })
      detachQuestionFallback()
      try {
        if (typeof ready.effect === 'function') {
          ready.effect(() => {
            questionBridge.start()
            approvalBridge.start()
            return () => {
              questionBridge.stop()
              approvalBridge.stop()
            }
          }, 'phone-relay.question-stream')
        } else {
          questionBridge.start()
          approvalBridge.start()
        }
      } catch (error) {
        questionBridge.start()
        approvalBridge.start()
        console.warn('[phone-relay] 问答事件流启动异常：' + ((error && error.message) || error))
      }
    })
  } catch (error) {
    console.warn('[phone-relay] 问答事件流初始化失败：' + ((error && error.message) || error))
  }

  // 插件启用后就固定接管：启动时先挂一遍，之后每秒补挂新会话
  ctx.effect(() => {
    if (!config.enabled) return () => {}
    attachFallbackListeners()
    const timer = setInterval(attachFallbackListeners, 1000)
    return () => clearInterval(timer)
  }, 'phone-relay.attach()')

  ctx.effect(() => {
    if (!config.enabled) return () => {}
    server.once('error', (error) => {
      if (error && error.code === 'EADDRINUSE') {
        console.error(`[phone-relay] 端口 ${config.port} 已被占用，DSH手机控制台没有启动；请在插件设置里换一个端口`)
      } else {
        console.error('[phone-relay] 启动失败：' + ((error && error.message) || error))
      }
    })
    server.listen(config.port, config.bindHost, () => {
      const urls = lanUrls(config.port)
      console.log(
        `[phone-relay] 已监听 ${config.bindHost}:${config.port}` +
          (urls.length ? `；手机可填 ${urls.join(' 或 ')}` : ''),
      )
    })
    return () => {
      // 插件被关掉：未决提问交回原生流程，别让任务卡死
      for (const entry of [...pendingQuestions.values()]) {
        try {
          entry.resolve([])
        } catch {
          /* 忽略 */
        }
      }
      pendingQuestions.clear()
      closeEventStreams()
      server.close()
    }
  }, 'phone-relay.listen()')
}
