# DSH手机控制台（phone-relay）

DSH 插件：把对话暴露给手机（HTTP 8788），并接管审批。

## 约定

**没有明确指示或事先约定，不主动修改本插件。**

包括 `index.js`、`client.js`、路由、配置项、`cordis.patch.yml`。
要改先说明原因和影响，得到确认再动。

## 组成

- `index.js`：Host 半，HTTP 服务、消息中转、审批/提问接管、`approvals.jsonl` 日志；
- `events.js`：P1 事件层（DSH 会话事件 → 手机事件、有序事件环、SSE 广播），纯逻辑、有单测
  `events.test.mjs`；
- `client.js`：Client 半，设置页「DSH手机控制台」、输入框上沿的手机状态/审批按钮、输入框上方的审批详情卡；
- 同源接口：`/phone-relay/health`、`/phone-relay/approvals`、`/phone-relay/approve`。
- 手机端接口：`/messages`、`/send`、`/approvals`、`/approve`、`/presence`、`/snapshot`、`/events`、
  `/inputs`、`/respond`、`/interrupt`。

## 状态文件

- `~/.dsh/phone-relay/token`
- `~/.dsh/phone-relay/approvals.jsonl`
- `~/.dsh/phone-relay/approvals-debug.log`
- `<profile>/phone-relay/events/<session>.jsonl`（P1 事件缓存，可删）

## 已知限制

- **插件重启窗口**：插件被关闭到重新启用之间的几百毫秒里，代码已卸载，没有接管者；此时正在等待的审批会被交回原生弹窗（这是刻意的兜底，避免任务卡死）。重启完成后，后续审批固定由插件接管。
- 事件监听器挂在每个会话的 `agent.ctx` 上（`approval/request` / `user-questions/request` 都是会话作用域），插件启动时挂一遍、之后每秒补挂新会话。
- 改完插件必须重启 DSH（HMR 会报 `HMR transactions cannot be nested`）。

