/**
 * dsh-console 构建配置
 *
 * 源码在 apps/dsh-console/src，构建产物写回 apps/dsh-console/app.js
 * （应用的 entry，壳按 iframe + 打包页加载）。
 * 分发 zip 只带 app.js / app.json / docklet-sdk.js。
 */
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))
// Vite 不允许 outDir 等于 root；先构建到 .tmp，再由 scripts/copy-console-build.mjs 拷到 app.js
const outDir = fileURLToPath(new URL('../../.tmp/dsh-console-build', import.meta.url))

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    target: 'chrome83',
    minify: 'esbuild',
    sourcemap: false,
    lib: {
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      formats: ['es'],
      fileName: () => 'app.js',
    },
  },
})
