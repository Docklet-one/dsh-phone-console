/** 对话应用的常量与文案（从 5.17.7 单文件拆出） */
export const DEFAULT_URL = 'http://192.168.2.6:8788'
export const POLL_MS = 800
export const PREFS_KEY = 'prefs.v1'
export const CACHE_KEY = 'history.v1'
export const SEND_ATTEMPTS = 3
export const RUNNING_STALE_MS = 5 * 60 * 1000

// 宿主只给 preset id，这里统一翻成中文；未知 id 会原样显示
export const PRESET_LABELS = {
  standard: { name: '标准模式', description: '处理代码、文件和数据，适合大多数任务。' },
  ptc: { name: '创造模式', description: '用对话产出界面或插件，工具会以卡片呈现。' },
  minimal: { name: '极简模式', description: '只带文件和终端，轻量、省 token。' },
  cordis: { name: '编排模式', description: '直接编辑 DSH 组合与插件，开发者用。' },
}

export const STYLE_ID = 'docklet-chat-style'

// 权限 id → 中文名
export const PERMISSION_LABELS = {
  'read-only': '仅可查看',
  'workspace-write': '工作区内修改',
  'danger-full-access': '完全权限',
}

export const PERMISSION_DESCRIPTIONS = {
  'read-only': '只能查看和检索，不能修改文件；需要写入时会请求授权。',
  'workspace-write': '可以在工作区内修改文件；工作区之外的操作会请求授权。',
  'danger-full-access': '不再询问，直接执行命令和文件操作。',
}
