# DSH手机控制台

手机端 DSH控制台 + 电脑端 DSH手机控制台插件。

## 目录

```text
app/      手机端目录应用
plugin/   电脑端 DSH 插件
```

## 手机端

```text
app/app.json        应用清单
app/app.js          构建产物
app/docklet-sdk.js  壳 SDK
app/src/            源码
```

构建（在 Docklet 壳仓库执行）：

```powershell
npm run build:console
```

输出 `apps/dsh-console/app.js`，再同步到本仓库 `app/app.js`。

应用 zip 只带：

```text
app.js
app.json
docklet-sdk.js
```

## 电脑端插件

```text
plugin/index.js       插件入口
plugin/client.js      DSH 设置页
plugin/locale/        文案
plugin/events.js      事件映射
```

插件是 DSH 的 `@local/phone-relay` 包，启用后监听 8788，把手机消息接入当前会话。

## 版本

App 和插件独立版本：

```text
app-v1.0.118
plugin-v1.1.0
```

## 注意

- 不要提交 `node_modules`
- 不要提交 `.tmp`、`backups`
- 不要提交 token、签名文件、APK
- 插件改完需要重启 DSH
