const Ho = '.chat-app,.chat-app *{box-sizing:border-box}.chat-app{--chat-bg: #eef2f6;--chat-text: #2a3038;--chat-muted: #6d7681;--chat-faint: #a8afb8;--chat-primary: #5b7f96;--chat-primary-deep: #4a6b80;--chat-danger: #b05d51;--chat-danger-soft: rgba(176, 93, 81, .13);--chat-line: rgba(40, 50, 60, .08);--chat-glass: rgba(255, 255, 255, .86);--chat-shadow: 0 8px 24px -18px rgba(30, 50, 60, .55);--chat-top: 0px;--chat-bottom: 0px;--chat-ime: 0px;--drawer-w: min(84vw, 340px);--drawer-top: 0px;position:relative;display:flex;flex-direction:column;height:100%;overflow:hidden;font-family:-apple-system,PingFang SC,Noto Sans SC,Microsoft YaHei,system-ui,sans-serif;color:var(--chat-text);background-color:var(--chat-bg);background-image:radial-gradient(120% 55% at 0% 0%,rgba(191,214,228,.55),transparent 62%),radial-gradient(100% 45% at 100% 0%,rgba(228,220,240,.42),transparent 58%),linear-gradient(180deg,#f7f9fb,#e9eef3);-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}.chat-top{position:relative;z-index:45;display:flex;flex:none;gap:10px;align-items:center;padding:calc(var(--chat-top) + 8px) 12px 8px 14px;background:#ffffffe6;border-bottom:1px solid var(--chat-line);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}.chat-heading{display:flex;flex:1;flex-direction:column;gap:2px;min-width:0}.chat-heading h1{margin:0;overflow:hidden;font-size:17px;font-weight:800;line-height:1.25;text-overflow:ellipsis;white-space:nowrap}.chat-model{align-self:flex-start;max-width:100%;padding:2px 8px;overflow:hidden;font:inherit;font-size:11px;line-height:1.4;color:var(--chat-muted);text-overflow:ellipsis;white-space:nowrap;cursor:pointer;background:#28323c0d;border:0;border-radius:8px}.chat-model[hidden]{display:none}.chat-head-sub{display:flex;gap:8px;align-items:center;min-width:0}.chat-status{display:inline-block;flex:none;width:10px;height:10px;background:var(--chat-faint);border-radius:50%}.chat-status[data-status=ok]{background:#3fae6a;box-shadow:0 0 0 3px #3fae6a2e}.chat-status[data-status=bad]{background:var(--chat-danger);box-shadow:0 0 0 3px #c8505029}.chat-status[data-status=checking]{background:#d0a352;box-shadow:0 0 0 3px #d0a35229}.chat-actions{display:flex;flex:none;gap:6px}.chat-icon{display:grid;width:34px;height:34px;padding:0;font:inherit;font-size:16px;line-height:1;color:var(--chat-muted);cursor:pointer;background:#28323c0b;border:0;border-radius:10px;place-items:center}.chat-icon:active{background:#28323c1a}.chat-icon svg{display:block;width:18px;height:18px}.chat-main{position:relative;display:flex;flex:1;flex-direction:column;min-height:0;overflow:hidden;padding-bottom:var(--chat-ime);transition:padding-bottom .16s ease-out}.chat-list{display:flex;flex:1;flex-direction:column;gap:12px;min-height:0;padding:12px 12px 6px;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.chat-load-spinner{position:absolute;top:calc(var(--chat-header-h, 64px) + 6px);left:50%;z-index:20;display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:1px solid var(--chat-line, #dfe4e9);border-radius:50%;background:#fffffff0;box-shadow:0 2px 8px -4px #00000059;transform:translate(-50%);pointer-events:none}.chat-load-spinner[hidden]{display:none}.chat-load-spinner span{width:12px;height:12px;border:2px solid #d5dbe1;border-top-color:#6d7681;border-radius:50%;animation:chat-spin .7s linear infinite}@keyframes chat-spin{to{transform:rotate(360deg)}}.chat-stuck{padding:12px 14px;border-color:#e7d8c8;background:#fffaf4}.chat-local-notice{margin:10px 0;padding:12px 14px;border:1px solid #e7d8c8;border-radius:14px;background:#fffaf4}.chat-local-notice.is-offline{border-color:#efd3bf;background:#fff7f1}.chat-local-notice-head{display:flex;align-items:center;gap:7px;color:#8a5a2b;font-size:13px}.chat-local-notice-head b{font-weight:600}.chat-local-notice p{margin:5px 0 0;color:#8a745d;font-size:12px;line-height:1.55}.chat-stuck-title{margin:0;color:#8a5a2b;font-size:13px;font-weight:600}.chat-stuck-text{margin:4px 0 10px;color:#8a745d;font-size:12px;line-height:1.5}.chat-stuck-btn{width:100%;padding:8px 12px;border:0;border-radius:8px;background:#9a6a3a;color:#fff;font:inherit;font-size:13px;cursor:pointer}.chat-stuck-actions{display:flex;gap:8px}.chat-stuck-actions .chat-stuck-btn{flex:1;width:auto}.chat-stuck-btn.is-danger{background:#b05d51}.chat-skeleton{display:flex;flex-direction:column;gap:10px;padding:6px 0}.chat-skeleton-meta,.chat-skeleton-bubble,.chat-skeleton-footer{background:linear-gradient(90deg,#28323c0f,#28323c1f,#28323c0f);background-size:200% 100%;border-radius:10px;animation:chat-skeleton-shimmer 1.4s ease-in-out infinite}.chat-skeleton-meta{width:84px;height:12px}.chat-skeleton-meta.is-right{align-self:flex-end}.chat-skeleton-bubble{width:100%;height:74px}.chat-skeleton-bubble.is-short{width:72%}.chat-skeleton-bubble.is-me{width:58%;height:38px;align-self:flex-end}.chat-skeleton-footer{width:100%;height:40px;border-radius:0 0 14px 14px}@keyframes chat-skeleton-shimmer{0%{background-position:100% 0}to{background-position:-100% 0}}.chat-history-limit{padding:10px 12px;margin:0 0 8px;border-radius:10px;background:#28323c0a;color:#8b7f70;font-size:12px;line-height:1.5;text-align:center}.chat-block{display:flex;flex-direction:column;min-width:0}.chat-turn{display:flex;flex-direction:column;gap:4px;width:100%}.chat-turn.is-me{align-items:flex-end}.chat-turn.is-ai{align-items:flex-start}.chat-meta{display:flex;gap:8px;align-items:center;font-size:10px;line-height:1.2;color:var(--chat-faint)}.chat-turn.is-me .chat-meta{flex-direction:row-reverse}.chat-avatar{display:grid;flex:none;width:36px;height:36px;font-size:19px;background:#ffffffeb;border-radius:11px;box-shadow:var(--chat-shadow);place-items:center}.chat-stamp{white-space:nowrap}.chat-bubble{position:relative;width:100%;max-width:100%;padding:9px 12px;font-size:15px;line-height:1.6;word-break:break-word;white-space:pre-wrap;border-radius:14px;user-select:text;-webkit-user-select:text;-webkit-touch-callout:default}.chat-bubble.is-me{width:fit-content;max-width:86%;color:#fff;background:var(--chat-primary);border-radius:14px;box-shadow:0 8px 18px -14px #2d5064e6}.chat-bubble.is-ai{width:100%;max-width:100%;color:var(--chat-text);background:var(--chat-glass);border-radius:14px;box-shadow:var(--chat-shadow);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.chat-bubble.is-me.has-images{width:86%}.chat-bubble.is-ai.has-images{width:100%}.chat-bubble.is-typing,.chat-bubble.is-streaming{width:100%;max-width:100%}.chat-bubble.is-typing{display:flex;flex-direction:column;justify-content:center;min-height:74px}.chat-bubble.is-typing:not(.is-streaming){box-sizing:border-box;width:100%;height:74px;min-height:74px;overflow:hidden}.chat-bubble.is-typing.is-thinking{box-sizing:border-box;height:74px;min-height:74px;overflow:hidden;align-items:stretch;justify-content:flex-start}.chat-bubble.is-thinking .chat-typing-head{width:100%;justify-content:flex-start}.chat-typing-head{display:flex;align-items:center;width:100%;min-width:0;height:20px;flex:none}.chat-typing-text{display:inline-block;overflow:hidden;font-size:13px;font-weight:600;line-height:20px;color:var(--chat-muted);text-overflow:ellipsis;white-space:nowrap}.chat-typing-detail{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;width:100%;height:34px;margin-top:2px;overflow:hidden;font-size:12px;line-height:17px;opacity:.72;word-break:break-all;flex:none}.chat-math-board{display:flex;flex:none;flex-direction:column;justify-content:space-between;width:100%;height:34px;margin-top:2px;overflow:hidden}.chat-math-row{position:relative;width:100%;height:17px}.chat-math-item{position:absolute;top:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;line-height:17px;letter-spacing:.03em;color:var(--chat-muted);opacity:.82;white-space:nowrap;font-variant-numeric:tabular-nums}.chat-typing-dot{display:inline-block;width:9px;height:9px;margin-left:8px;vertical-align:middle;flex:none;background:var(--chat-primary);border-radius:50%;box-shadow:0 0 #5b7f9659;animation:chat-breathe 1.8s ease-in-out infinite}.chat-bubble.is-stale .chat-typing-dot{background:var(--chat-faint);box-shadow:none;animation:none}@keyframes chat-breathe{0%,to{opacity:.5;transform:scale(.78);box-shadow:0 0 #5b7f9659}50%{opacity:1;transform:scale(1.18);box-shadow:0 0 0 7px #5b7f9600}}.chat-bubble.is-error{color:var(--chat-danger);background:var(--chat-danger-soft);border-radius:14px}.chat-retry{padding:5px 12px;font:inherit;font-size:12px;font-weight:700;color:var(--chat-danger);cursor:pointer;background:transparent;border:1px solid rgba(176,93,81,.36);border-radius:999px}.chat-sys{align-self:center;max-width:90%;padding:6px 10px;font-size:12.5px;line-height:1.5;color:var(--chat-muted);text-align:center;background:#ffffff8c;border-radius:10px}.chat-link{color:inherit;text-decoration:underline;text-underline-offset:2px;word-break:break-all}.chat-image{display:block;width:160px;height:120px;margin-bottom:6px;object-fit:cover;background:#28323c0f;border-radius:10px}.chat-image-fallback{display:flex;width:160px;height:120px;margin-bottom:6px;padding:0 10px;font:inherit;font-size:12px;line-height:1.4;color:var(--chat-muted);text-align:center;cursor:pointer;background:#28323c0d;border:1px dashed rgba(40,50,60,.16);border-radius:10px;align-items:center;justify-content:center}.chat-file{display:flex;gap:9px;align-items:center;width:100%;max-width:230px;padding:9px 10px;margin-bottom:6px;color:inherit;text-decoration:none;background:#28323c0f;border-radius:10px}.chat-bubble.is-me .chat-file{background:#ffffff2e}.chat-file-icon{display:grid;flex:none;width:30px;height:30px;font-size:15px;background:#ffffffc7;border-radius:8px;place-items:center}.chat-file-main{display:flex;flex:1;flex-direction:column;gap:1px;min-width:0}.chat-file-name{overflow:hidden;font-size:13px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}.chat-file-size{font-size:11px;color:var(--chat-muted)}.chat-bubble.is-me .chat-file-size{color:#ffffffbf}.chat-composer{display:flex;flex:none;flex-direction:column;gap:8px;align-items:stretch;padding:8px 12px calc(var(--chat-bottom) + 6px);background:#ffffffd6;border-top:1px solid var(--chat-line);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transition:padding-bottom .16s ease-out}.chat-input-row{display:flex;gap:8px;align-items:flex-end}.chat-plus{display:grid;flex:none;width:42px;height:42px;padding:0;font:inherit;font-size:24px;font-weight:500;line-height:1;color:var(--chat-muted);cursor:pointer;background:#28323c0f;border:0;border-radius:50%;place-items:center}.chat-plus:active{background:#28323c1f}.chat-attach{display:flex;gap:8px;padding:2px 2px 0;overflow-x:auto}.chat-attach[hidden]{display:none}.chat-chip{position:relative;display:grid;flex:none;width:60px;height:60px;overflow:hidden;background:#28323c0f;border-radius:12px;place-items:center}.chat-chip-thumb{width:100%;height:100%;object-fit:cover}.chat-chip-icon{font-size:24px}.chat-chip-x{position:absolute;top:3px;right:3px;width:20px;height:20px;padding:0;font:inherit;font-size:13px;line-height:20px;color:#fff;cursor:pointer;background:#0000008c;border:0;border-radius:50%}.chat-chip-state{position:absolute;right:0;bottom:0;left:0;padding:2px 0;font-size:10px;color:#fff;text-align:center;background:#0000008c}.chat-chip-state.is-bad{background:var(--chat-danger)}.chat-input{flex:1;min-height:42px;max-height:120px;padding:10px 14px;overflow-y:auto;font:inherit;font-size:15px;line-height:1.5;color:var(--chat-text);resize:none;background:#28323c0d;border:0;border-radius:18px;outline:0;user-select:text;-webkit-user-select:text}.chat-input::placeholder{color:var(--chat-faint)}.chat-send{display:grid;flex:none;width:44px;height:44px;padding:0;font:inherit;font-size:17px;font-weight:700;line-height:1;color:#fff;cursor:pointer;background:var(--chat-primary);border:0;border-radius:50%;place-items:center}.chat-send:active{background:var(--chat-primary-deep)}.chat-send.is-stop{background:var(--chat-danger)}.chat-chipgroup{display:flex;flex-wrap:wrap;gap:6px}.chat-opt{padding:6px 10px;font:inherit;font-size:12.5px;color:var(--chat-text);cursor:pointer;background:#28323c0f;border:0;border-radius:10px}.chat-opt[data-on="1"]{color:#fff;background:var(--chat-primary)}.chat-opt:active{opacity:.82}.chat-opt-desc{margin:0;font-size:12px;line-height:1.5;color:var(--chat-muted)}.chat-form{display:flex;flex-direction:column;gap:14px}.chat-form-block{display:flex;flex-direction:column;gap:7px}.chat-form .chat-sheet-sub,.chat-form .chat-opt-desc{margin:0}.chat-scrim.is-center{align-items:center;padding:0 24px calc(var(--chat-bottom) + var(--chat-ime))}.chat-dialog{width:100%;max-width:320px;padding:20px 16px 14px;background:#fff;border-radius:20px;box-shadow:0 18px 48px -20px #141e288c}.chat-dialog-title{margin:0;font-size:16px;font-weight:800;text-align:center}.chat-dialog-text{margin:8px 0 18px;font-size:13px;line-height:1.6;color:var(--chat-muted);text-align:center}.chat-dialog-actions{display:flex;gap:8px}.chat-dialog-actions .chat-btn{flex:1;height:44px}.chat-btn.is-danger{color:#fff;background:var(--chat-danger)}.chat-acc{overflow:hidden;background:var(--chat-glass);border-radius:16px;box-shadow:var(--chat-shadow)}.chat-acc-head{display:flex;gap:10px;align-items:center;width:100%;padding:15px 16px;font:inherit;color:var(--chat-text);text-align:left;cursor:pointer;background:none;border:0}.chat-acc-title{flex:none;font-size:14px;font-weight:700}.chat-acc-sum{flex:1;overflow:hidden;font-size:12px;color:var(--chat-muted);text-align:right;text-overflow:ellipsis;white-space:nowrap}.chat-acc-chevron{flex:none;font-size:16px;color:var(--chat-faint);transition:transform .15s ease}.chat-acc[data-open="1"] .chat-acc-chevron{transform:rotate(90deg)}.chat-acc-body{display:flex;flex-direction:column;gap:12px;padding:0 16px 16px}.chat-acc-body[hidden]{display:none}.chat-toggle{display:flex;gap:12px;align-items:center;justify-content:space-between;font-size:14px;color:var(--chat-text)}.chat-toggle input{position:relative;flex:none;width:46px;height:26px;cursor:pointer;background:#28323c29;border:0;border-radius:13px;outline:0;transition:background .15s ease;appearance:none;-webkit-appearance:none}.chat-toggle input:after{position:absolute;top:3px;left:3px;width:20px;height:20px;content:"";background:#fff;border-radius:50%;box-shadow:0 1px 3px #00000040;transition:transform .15s ease}.chat-toggle input:checked{background:var(--chat-primary)}.chat-toggle input:checked:after{transform:translate(20px)}.chat-page{position:absolute;top:var(--chat-header-h, 64px);right:0;bottom:0;left:0;z-index:15;display:flex;flex-direction:column;gap:14px;padding:10px 14px calc(var(--chat-bottom) + var(--chat-ime) + 18px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;background-color:var(--chat-bg);background-image:radial-gradient(120% 55% at 0% 0%,rgba(191,214,228,.55),transparent 62%),linear-gradient(180deg,#f7f9fb,#e9eef3)}.chat-page[hidden]{display:none}.chat-page>*{flex:none}.chat-back{display:inline-flex;gap:4px;align-items:center;align-self:flex-start;padding:4px 0;font:inherit;font-size:13px;font-weight:600;color:var(--chat-primary-deep);cursor:pointer;background:none;border:0}.chat-back-arrow{font-size:22px;font-weight:400;line-height:1}.chat-page h1{margin:0;font-size:24px;font-weight:800}.chat-sub{margin:-8px 0 0;font-size:13px;line-height:1.55;color:var(--chat-muted)}.chat-card{display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--chat-glass);border-radius:16px;box-shadow:var(--chat-shadow)}.chat-field{display:flex;flex-direction:column;gap:6px}.chat-field>span{font-size:13px;font-weight:600;color:var(--chat-muted)}.chat-field input{height:46px;padding:0 14px;font:inherit;font-size:15px;color:var(--chat-text);background:#28323c0d;border:0;border-radius:12px;outline:0;user-select:text;-webkit-user-select:text}.chat-acc[data-acc=server] .chat-acc-body{gap:10px;padding:0 14px 14px}.chat-acc[data-acc=server] .chat-field>span{font-size:12px}.chat-acc[data-acc=server] .chat-field input{height:40px;padding:0 12px;font-size:13.5px;border-radius:10px}.chat-acc[data-acc=server] .chat-field-state{font-size:11px}.chat-acc[data-acc=server] .chat-field-note{font-size:10px}.chat-acc[data-acc=server] .chat-sheet-sub{font-size:12px;font-weight:600;color:var(--chat-muted)}.chat-acc[data-acc=server] .chat-opt{padding:7px 11px;font-size:12.5px}.chat-acc[data-acc=server] .chat-chipgroup,.chat-acc[data-acc=relay] .chat-chipgroup{gap:10px}.chat-hint{margin:0;font-size:12px;line-height:1.5;color:var(--chat-faint)}.chat-btn{height:46px;padding:0 16px;font:inherit;font-size:14px;font-weight:700;color:var(--chat-text);cursor:pointer;background:#28323c12;border:0;border-radius:12px}.chat-btn.is-primary{color:#fff;background:var(--chat-primary)}.chat-btn.is-block{width:100%}.chat-test{margin:0;font-size:12.5px;line-height:1.5;color:var(--chat-muted)}.chat-test[data-tone=ok]{color:#4f9d7a}.chat-test[data-tone=bad]{color:var(--chat-danger)}.chat-selectable{word-break:break-all;user-select:text;-webkit-user-select:text}.chat-version{margin:4px 0 0;font-size:11px;color:var(--chat-faint);text-align:center}.chat-field-state{margin-left:6px;font-size:13px;font-style:normal;font-weight:700;color:var(--chat-faint)}.chat-net{display:flex;gap:8px;align-items:center;margin:0 0 6px;padding:6px 10px;font-size:12px;line-height:1.4;color:#7a5a12;background:#d98b1c24;border-radius:10px}.chat-net[hidden]{display:none}.chat-net[data-tone=bad]{color:#9a3a30;background:#c640371f}.chat-net-dot{flex:none;width:8px;height:8px;background:currentColor;border-radius:50%;animation:chat-net-pulse 1s ease-in-out infinite}.chat-net-text{flex:1 1 auto;min-width:0}.chat-net-note{flex:none;font-size:12px;opacity:.75}@keyframes chat-net-pulse{0%,to{opacity:1}50%{opacity:.3}}.chat-field-note{margin-left:6px;font-size:10.5px;font-style:normal;font-weight:400;color:var(--chat-faint)}.chat-field-state[data-tone=busy]{color:#d9821a;animation:chat-state-pulse 1.05s ease-in-out infinite}.chat-field-state[data-tone=ok]{color:#1f8a4c}.chat-field-state[data-tone=bad]{color:#c33d31}@keyframes chat-state-pulse{0%,to{opacity:1}50%{opacity:.3}}.chat-opt.is-test{border-style:dashed}.chat-opt.is-test[data-busy="1"]{color:var(--chat-primary-deep);background:#5b7f962e;border-color:var(--chat-primary);border-style:solid}.chat-btn.is-sticky{position:sticky;bottom:calc(6px + env(safe-area-inset-bottom,0px));z-index:4;margin-top:16px;box-shadow:0 -10px 14px -6px #e9e6e0f2}.chat-scrim[data-role=help] .chat-sheet{max-height:86vh;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));overflow:hidden}.chat-help{flex:1 1 auto;min-height:0;padding-right:2px;overflow-y:auto}.chat-help .chat-sheet-sub{margin:12px 0 4px}.chat-help .chat-sheet-sub:first-child{margin-top:0}.chat-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:40;display:flex;align-items:flex-end;justify-content:center;padding:0 10px calc(var(--chat-bottom) + var(--chat-ime) + 10px);background:#161c185c;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}.chat-scrim[hidden]{display:none}.chat-drawer-scrim{top:var(--drawer-top);align-items:stretch;justify-content:flex-start;padding:0;background:transparent}.chat-drawer{display:flex;flex-direction:column;width:var(--drawer-w);height:100%;overflow:hidden;background:#fff;box-shadow:18px 0 40px -30px #14283c99;transform:translate(-102%);transition:transform .24s cubic-bezier(.22,.8,.3,1)}.chat-app.is-drawer-open .chat-drawer{transform:none}.chat-app.is-drawer-open .chat-list,.chat-app.is-drawer-open .chat-composer,.chat-app.is-drawer-open .chat-jump{transform:translate(var(--drawer-w))}.chat-app.is-drawer-open [data-action=close-app]{visibility:hidden;pointer-events:none}.chat-list,.chat-composer,.chat-jump{transition:transform .24s cubic-bezier(.22,.8,.3,1)}.chat-drawer-pane{display:flex;flex:1;flex-direction:column;min-height:0}.chat-drawer-pane[hidden]{display:none}.chat-drawer-head{display:flex;flex:none;gap:8px;align-items:center;padding:16px 14px 8px}.chat-drawer-head .chat-sheet-title{flex:1;margin:0}.chat-drawer-pane>.chat-new{margin:0 14px 10px}.chat-drawer-tools{display:flex;flex:none;gap:8px;padding:14px 14px 10px}.chat-drawer-tool{display:inline-flex;flex:1;gap:4px;align-items:center;justify-content:center;min-width:0;padding:8px 4px;border:0;border-radius:10px;background:#5b7f9614;color:var(--chat-primary-deep);font:inherit;font-size:12.5px;white-space:nowrap}.chat-drawer-tool-icon{font-size:16px;line-height:1}.chat-drawer-tool-icon.is-search{font-size:20px}.chat-drawer .chat-drawer-search{flex:none;width:calc(100% - 40px);margin:0 20px 12px}.chat-drawer-pane [data-role=sheet-body]{flex:1;min-height:0;padding:0 14px;overflow-y:auto}.chat-drawer-pane .chat-sheet-list{max-height:none}.chat-drawer-foot,.chat-drawer-actions{flex:none;padding:10px 14px calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--chat-line)}.chat-drawer-pane .chat-form{flex:1;min-height:0;padding:0 14px;overflow-y:auto}@keyframes chat-drawer-in{0%{transform:translate(-100%)}to{transform:none}}.chat-sheet{display:flex;flex-direction:column;gap:8px;width:100%;max-width:420px;max-height:68vh;padding:14px;overflow-y:auto;background:#fff;border-radius:20px;box-shadow:0 -16px 48px -24px #141e2899}.chat-sheet-title{margin:0 0 2px;font-size:15px;font-weight:800;text-align:center}.chat-scrim[data-role=new-scrim] .chat-sheet{max-height:86vh;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));overflow:hidden}.chat-scrim[data-role=new-scrim] .chat-form{flex:1 1 auto;min-height:0;padding-right:2px;overflow-y:auto}.chat-new{display:flex;flex:none;align-items:center;justify-content:center;width:100%;height:44px;padding:0 14px;font:inherit;font-size:14px;font-weight:700;color:var(--chat-primary-deep);cursor:pointer;background:#5b7f9624;border:0;border-radius:12px}.chat-new:active{background:#5b7f963d}.chat-session{display:flex;gap:10px;align-items:center;width:100%;padding:11px 12px;font:inherit;font-size:14px;color:var(--chat-text);text-align:left;cursor:pointer;background:transparent;border:0;border-radius:12px}.chat-session[data-current="1"]{background:transparent}.chat-session[data-current="1"] .chat-session-label{font-weight:700;color:#3d5c6f}.chat-session-row{display:flex;align-items:stretch;gap:6px}.chat-session-row .chat-session{flex:1;min-width:0}.chat-session-more{flex:none;width:32px;border:0;border-radius:10px;background:transparent;color:var(--chat-muted);font:inherit;font-size:16px}.chat-archived-toggle{width:100%;margin:10px 0 4px;padding:8px;border:1px dashed var(--chat-line);border-radius:10px;background:transparent;color:var(--chat-muted);font:inherit;font-size:12px}.chat-session-row.is-archived .chat-session{opacity:.72}.chat-session-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.chat-session-time{flex:none;font-size:11px;color:var(--chat-faint)}.chat-sheet-tip{padding:10px 4px;font-size:13px;color:var(--chat-muted);text-align:center}.chat-viewer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:50;display:flex;padding:16px;background:#000000e6;align-items:center;justify-content:center}.chat-viewer[hidden]{display:none}.chat-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px}.chat-to-top{position:absolute;right:6px;bottom:6px;z-index:2;width:30px;height:30px;padding:0;font:inherit;font-size:14px;line-height:1;color:var(--chat-muted);cursor:pointer;background:#ffffffdb;border:0;border-radius:50%;box-shadow:0 4px 12px -6px #141e2859}.chat-toast{position:absolute;bottom:calc(var(--chat-ime) + 84px);left:50%;z-index:30;max-width:82%;padding:8px 14px;overflow:hidden;font-size:13px;color:#fff;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;background:#1e2830e0;border-radius:999px;opacity:0;transform:translate(-50%) translateY(6px);transition:opacity .18s ease,transform .18s ease}.chat-toast.is-on{opacity:1;transform:translate(-50%) translateY(0)}.chat-tool{flex:0 0 auto;align-self:stretch;margin:0;border:1px solid var(--chat-line);border-radius:10px;background:#ffffffa8;overflow:hidden}.chat-tool-head{display:flex;align-items:center;gap:6px;width:100%;padding:6px 9px;border:0;background:none;color:var(--chat-text);font:inherit;text-align:left}.chat-tool-group{flex:0 0 auto;align-self:stretch;border:1px solid var(--chat-line);border-radius:10px;background:#ffffffa8;overflow:hidden}.chat-tool-footer-block{margin-top:-12px}.chat-tool-footer-block .chat-tool-group,.chat-tool-footer-block .chat-tool-group.is-empty{margin-top:0;border:0;border-radius:0 0 14px 14px;background:var(--chat-glass);box-shadow:none;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.chat-block:has(+.chat-tool-footer-block) .chat-bubble.is-ai{border-bottom-left-radius:0;border-bottom-right-radius:0}.chat-tool-footer-block .chat-tool-group-head,.chat-tool-footer-block .chat-tool-group.is-empty .chat-tool-group-head{padding:6px 12px 8px;border-top:1px solid var(--chat-line)}.chat-tool-footer-block .chat-tool-group-title{font-weight:500}.chat-tool-footer-block .chat-tool-group-badge{padding:0;background:none;color:var(--chat-muted);font-size:11px}.chat-tool-footer-block .chat-tool-group-badge.is-failed{color:var(--chat-danger)}.chat-tool-footer-block .chat-tool-group.is-empty .chat-tool-group-head{color:var(--chat-faint);cursor:default}.chat-tool-group-head.is-static{cursor:default}.chat-tool-group-head{display:flex;align-items:center;gap:7px;width:100%;padding:7px 9px;border:0;background:none;color:var(--chat-text);font:inherit;font-size:12px;text-align:left}.chat-tool-group-icon{flex:none;font-size:13px}.chat-tool-group-title{flex:1;min-width:0;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chat-tool-group-badge{flex:none;padding:1px 6px;font-size:10.5px;color:var(--chat-muted);background:#28323c0f;border-radius:999px}.chat-tool-group-badge.is-failed{color:var(--chat-danger);background:var(--chat-danger-soft)}.chat-tool-group.is-open .chat-tool-chevron{transform:rotate(90deg)}.chat-tool-group-body{display:flex;flex-direction:column;gap:6px;padding:0 8px 8px}.chat-tool-group.is-open .chat-tool-group-body{max-height:300px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--chat-faint) transparent}.chat-tool-group-body::-webkit-scrollbar{width:4px}.chat-tool-group-body::-webkit-scrollbar-track{background:transparent}.chat-tool-group-body::-webkit-scrollbar-thumb{background:var(--chat-faint);border-radius:999px}.chat-tool-group-body[hidden]{display:none}.chat-tool-group-collapse{display:flex;width:100%;padding:8px;align-items:center;justify-content:center;border:0;border-top:1px solid var(--chat-line);background:#28323c08;color:var(--chat-muted);font:inherit;font-size:11.5px}.chat-tool-group-body .chat-tool{background:#ffffff80}.chat-tool-dot{width:7px;height:7px;flex:none;border-radius:50%;background:var(--chat-faint)}.chat-tool-index{flex:none;min-width:14px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;line-height:1;text-align:center;color:var(--chat-muted)}.chat-tool-index.is-ok{color:#4f9d7a}.chat-tool-index.is-failed{color:var(--chat-danger)}.chat-tool-index.is-running{color:var(--chat-primary)}.chat-tool.is-running .chat-tool-dot{background:var(--chat-primary);animation:chat-card-pulse 1.1s ease-in-out infinite}.chat-tool.is-ok .chat-tool-dot{background:#5f9a72}.chat-tool.is-failed .chat-tool-dot{background:var(--chat-danger)}.chat-tool-name{flex:none;font-size:12px;font-weight:600}.chat-tool-sum{flex:1;min-width:0;font-size:11.5px;color:var(--chat-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chat-tool-chevron{flex:none;color:var(--chat-faint);transition:transform .15s ease}.chat-tool.is-open .chat-tool-chevron{transform:rotate(90deg)}.chat-tool-group-body .chat-tool.is-open{border-color:#5b7f968c;background:#5b7f9614}.chat-tool.is-active,.chat-tool-group-body .chat-tool.is-active{position:relative;border-color:var(--chat-primary);background:#5b7f9624}.chat-tool.is-active:before,.chat-tool-group-body .chat-tool.is-active:before{position:absolute;top:0;bottom:0;left:0;width:3px;content:"";background:var(--chat-primary)}.chat-tool.is-active .chat-tool-name,.chat-tool-group-body .chat-tool.is-active .chat-tool-name{color:var(--chat-primary-deep);font-weight:700}.chat-tool-sheet{width:100%;max-width:520px;height:min(82vh,720px);max-height:82vh;gap:0;padding:0;overflow:hidden}.chat-tool-sheet-head{display:flex;flex:none;gap:8px;align-items:center;padding:12px 14px;border-bottom:1px solid var(--chat-line)}.chat-tool-sheet-head .chat-sheet-title{flex:1;margin:0;text-align:left}.chat-tool-sheet-body{flex:1;min-height:0;padding:12px 14px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--chat-faint) transparent}.chat-tool-sheet-body::-webkit-scrollbar{width:4px}.chat-tool-sheet-body::-webkit-scrollbar-thumb{background:var(--chat-faint);border-radius:999px}.chat-tool-sheet>.chat-btn{flex:none;margin:10px 14px calc(14px + env(safe-area-inset-bottom,0px))}.chat-tool-detail-head{display:flex;gap:7px;align-items:center;padding-bottom:10px;border-bottom:1px solid var(--chat-line)}.chat-tool-detail-head .chat-tool-name{font-size:13px}.chat-tool-detail .chat-tool-pre{max-height:none;overflow:visible;white-space:pre-wrap;word-break:break-word}.chat-tool-detail .chat-tool-preview{max-height:none;margin:0;padding:8px;overflow:visible;background:#28323c0a;border-radius:8px;white-space:pre-wrap;word-break:break-word}.chat-tool-code-head{display:flex;gap:8px;align-items:center;justify-content:space-between;margin:10px 0 6px;color:var(--chat-muted);font-size:11px}.chat-tool-copy{padding:2px 7px;border:1px solid var(--chat-line);border-radius:6px;background:transparent;color:var(--chat-muted);font:inherit;font-size:10.5px}.chat-tool-copy:active{color:var(--chat-text);background:#28323c0f}.chat-tool-body{padding:0 10px 10px;border-top:1px solid var(--chat-line)}.chat-tool-label{margin:8px 0 4px;font-size:10.5px;letter-spacing:.04em;color:var(--chat-muted)}.chat-tool-pre{margin:0;padding:8px;border-radius:8px;background:#28323c0b;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;max-height:180px;overflow:auto}.chat-tool-preview{margin:0;font-size:12px;line-height:1.55}.chat-tool-error{margin:6px 0 0;font-size:11.5px;color:var(--chat-danger)}.chat-card{align-self:stretch;margin:2px 0;padding:12px;border:1px solid var(--chat-line);border-radius:12px;background:var(--chat-glass);box-shadow:var(--chat-shadow)}.chat-approval.is-pending{border-color:#b05d5159}.chat-card-head{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600}.chat-card-icon{flex:none;font-size:13px}.chat-card-title{flex:1;min-width:0}.chat-card-badge{flex:none;padding:2px 7px;border-radius:999px;background:#28323c0f;font-size:10.5px;font-weight:600;color:var(--chat-muted)}.chat-deliverable-list{display:flex;flex-direction:column;gap:6px;margin-top:8px}.chat-deliverable .chat-file{max-width:none;margin:0}.chat-deliverable-media{display:flex;gap:10px;align-items:center}.chat-deliverable-media .chat-file{flex:1;min-width:0}.chat-deliverable-thumb{flex:none;width:76px;height:76px;margin:0;object-fit:cover;border-radius:8px}.chat-deliverable-download{flex:none;margin-left:auto;font-size:11px;color:var(--chat-primary-deep)}.chat-todo-list{display:flex;flex-direction:column;gap:6px;margin:8px 0 0;padding:0;list-style:none}.chat-todo-item{display:flex;gap:8px;align-items:flex-start;color:var(--chat-muted);font-size:12.5px;line-height:1.5}.chat-todo-mark{flex:none;width:14px;height:14px;margin-top:1px;border:1.5px solid var(--chat-line);border-radius:5px}.chat-todo-item.is-done{color:var(--chat-faint);text-decoration:line-through}.chat-todo-item.is-done .chat-todo-mark{border-color:#5f9a72;background:#5f9a72}.chat-todo-item.is-active{color:var(--chat-text)}.chat-todo-item.is-active .chat-todo-mark{border-color:var(--chat-primary);box-shadow:inset 0 0 0 3px #5b7f9638}.chat-plan-chip{align-self:flex-start;margin:4px 0;padding:4px 10px;border-radius:999px;background:#5b7f961f;color:var(--chat-primary-deep);font-size:11.5px}.chat-thinking{margin:0 0 6px;padding:6px 8px;border-radius:8px;background:#28323c0a;color:var(--chat-muted);font-size:11.5px}.chat-thinking summary{color:var(--chat-faint);font-size:11px;cursor:pointer}.chat-thinking-text{max-height:180px;margin-top:4px;overflow-y:auto;white-space:pre-wrap;word-break:break-word}.chat-card-badge.is-pending{background:var(--chat-danger-soft);color:var(--chat-danger)}.chat-card-badge.is-ok{background:#5f9a7229;color:#4d7f5d}.chat-card-badge.is-failed{background:var(--chat-danger-soft);color:var(--chat-danger)}.chat-card-time{flex:none;font-size:10.5px;color:var(--chat-faint)}.chat-card-sub{margin:6px 0 0;font-size:11.5px;color:var(--chat-muted)}.chat-card-text{margin:8px 0 0;font-size:12.5px;line-height:1.6}.chat-card-actions{display:flex;gap:8px;margin-top:12px}.chat-card-actions .chat-btn{flex:1}.chat-q+.chat-q{margin-top:12px;padding-top:12px;border-top:1px dashed var(--chat-line)}.chat-q-header{margin:0 0 4px;font-size:10.5px;letter-spacing:.04em;color:var(--chat-faint)}.chat-q-text{margin:0;font-size:13px;line-height:1.55}.chat-q-sub{margin:4px 0 0;font-size:11.5px;color:var(--chat-muted)}.chat-q-opts{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.chat-q-opt{display:flex;flex-direction:column;gap:2px;padding:7px 10px;border:1px solid var(--chat-line);border-radius:9px;background:#fff;color:var(--chat-text);font:inherit;font-size:12px;text-align:left}.chat-q-opt.is-on{border-color:var(--chat-primary);background:#5b7f961a}.chat-q-opt:disabled{opacity:.75}.chat-q-opt-desc{font-size:10.5px;color:var(--chat-muted)}.chat-q-custom{width:100%;margin-top:8px;padding:8px 10px;border:1px solid var(--chat-line);border-radius:9px;background:#fff;color:var(--chat-text);font:inherit;font-size:12px}.chat-q-custom-text{margin:8px 0 0;font-size:12px}.chat-jump{position:absolute;right:14px;bottom:calc(var(--chat-bottom) + var(--chat-ime) + 92px);z-index:3;width:34px;height:34px;border:1px solid var(--chat-line);border-radius:50%;background:var(--chat-glass);color:var(--chat-muted);box-shadow:var(--chat-shadow);font-size:15px}@keyframes chat-card-pulse{0%,to{opacity:1}50%{opacity:.35}}.chat-stream-text{white-space:pre-wrap;word-break:break-word}.chat-bubble.is-streaming .chat-typing-dot{display:inline-block;margin-left:5px;vertical-align:middle}.chat-sheet-search{width:100%;margin:4px 0 10px;padding:10px 12px;border:0;border-radius:10px;background:#28323c0d;color:var(--chat-text);font:inherit;font-size:13px;outline:none}.chat-sheet-search:focus,.chat-sheet-search:focus-visible{outline:none;box-shadow:none}.chat-sheet-list{max-height:46vh;overflow-y:auto;overscroll-behavior:contain}.chat-search-body{display:flex;flex-direction:column;gap:6px;max-height:44vh;overflow-y:auto;overscroll-behavior:contain}.chat-search-hit{display:flex;flex-direction:column;gap:3px;width:100%;padding:9px 10px;border:1px solid var(--chat-line);border-radius:10px;background:#fff;color:var(--chat-text);font:inherit;text-align:left}.chat-search-hit-head{font-size:10.5px;color:var(--chat-faint)}.chat-search-hit-text{font-size:12.5px;line-height:1.5;word-break:break-word}.chat-viewer{overflow:hidden;touch-action:none}.chat-viewer img{transition:transform .15s ease-out;will-change:transform}.chat-viewer-nav{position:absolute;top:50%;width:40px;height:40px;border:0;border-radius:50%;background:#ffffff24;color:#fff;font-size:24px;line-height:1;transform:translateY(-50%)}.chat-viewer-nav.is-prev{left:14px}.chat-viewer-nav.is-next{right:14px}.chat-viewer-count{position:absolute;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));padding:3px 10px;border-radius:999px;background:#00000059;color:#fff;font-size:11.5px;transform:translate(-50%)}.chat-bubble p{margin:0 0 8px}.chat-bubble p:last-child{margin-bottom:0}.chat-bubble h1,.chat-bubble h2,.chat-bubble h3,.chat-bubble h4{margin:4px 0 6px;font-size:14px;line-height:1.4}.chat-bubble ul,.chat-bubble ol{margin:0 0 8px;padding-left:20px}.chat-bubble li{margin:2px 0}.chat-bubble blockquote{margin:6px 0;padding:2px 10px;border-left:3px solid var(--chat-line);color:var(--chat-muted)}.chat-bubble hr{margin:10px 0;border:0;border-top:1px solid var(--chat-line)}.chat-inline-code{padding:1px 4px;border-radius:5px;background:#1e283012;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px}.chat-code{margin:6px 0;overflow:hidden;border:1px solid var(--chat-line);border-radius:10px;background:#fff}.chat-code-head{display:flex;align-items:center;justify-content:space-between;padding:3px 8px;background:#1e28300b;color:var(--chat-faint);font-size:10.5px}.chat-code-lang{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.chat-code-copy{padding:3px 6px;border:0;border-radius:6px;background:transparent;color:var(--chat-muted);font:inherit}.chat-code-copy:active{background:#1e28301a}.chat-code pre{margin:0;padding:10px;overflow-x:auto}.chat-code code{color:#24292f;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;line-height:1.55;white-space:pre}.tk-k{color:#8250df}.tk-s{color:#0a7d32}.tk-c{color:#8b949e}.tk-n{color:#0550ae}.chat-table-wrap{margin:6px 0;overflow-x:auto}.chat-bubble table{border-collapse:collapse;font-size:12px}.chat-bubble th,.chat-bubble td{padding:4px 8px;border:1px solid var(--chat-line);text-align:left}.chat-bubble th{background:#1e28300a}.chat-copy{margin-left:6px;padding:2px 4px;border:0;background:transparent;color:var(--chat-faint);font-size:10.5px}.chat-copy:active{color:var(--chat-text)}.chat-md-image{display:block;max-width:100%;max-height:420px;margin:6px 0;border-radius:10px;background:#00000008;object-fit:contain}.chat-md-gallery{display:grid;gap:6px;margin:6px 0}.chat-md-gallery .chat-md-image{width:100%;max-width:none;max-height:none;height:auto;margin:0;border-radius:10px;object-fit:cover}.chat-md-gallery.is-one{grid-template-columns:1fr}.chat-md-gallery.is-one .chat-md-image{width:auto;max-width:100%;max-height:360px;object-fit:contain}.chat-md-gallery.is-two{grid-template-columns:repeat(2,minmax(0,1fr))}.chat-md-gallery.is-two .chat-md-image{height:150px}.chat-md-gallery.is-few{grid-template-columns:repeat(2,minmax(0,1fr))}.chat-md-gallery.is-few .chat-md-image{height:120px}.chat-md-gallery.is-many{grid-template-columns:repeat(3,minmax(0,1fr))}.chat-md-gallery.is-many .chat-md-image{height:96px}', ft = "http://192.168.2.6:8788";
const Ye = "prefs.v1", Xa = "history.v1";
const _t = {
  standard: { name: "标准模式", description: "处理代码、文件和数据，适合大多数任务。" },
  ptc: { name: "创造模式", description: "用对话产出界面或插件，工具会以卡片呈现。" },
  minimal: { name: "极简模式", description: "只带文件和终端，轻量、省 token。" },
  cordis: { name: "编排模式", description: "直接编辑 DSH 组合与插件，开发者用。" }
}, Ja = "docklet-chat-style", Za = {
  "read-only": "仅可查看",
  "workspace-write": "工作区内修改",
  "danger-full-access": "完全权限"
}, _o = {
  "read-only": "只能查看和检索，不能修改文件；需要写入时会请求授权。",
  "workspace-write": "可以在工作区内修改文件；工作区之外的操作会请求授权。",
  "danger-full-access": "不再询问，直接执行命令和文件操作。"
};
function Oo(s) {
  return new Promise((i) => setTimeout(i, s));
}
function P(s) {
  return String(s ?? "").replace(/[&<>"]/g, (i) => i === "&" ? "&amp;" : i === "<" ? "&lt;" : i === ">" ? "&gt;" : "&quot;");
}
function N(s) {
  return P(s).replace(/'/g, "&#39;");
}
function he(s) {
  return String(s ?? "").replace(/```[\s\S]*?```/g, (i) => i.replace(/```[a-z]*\n?/gi, "")).replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/__([^_]+)__/g, "$1").replace(/^#{1,6}\s+/gm, "").replace(/^\s*[-*]\s+/gm, "• ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
function Fo(s) {
  return s.replace(/(https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+)/gu, (i) => {
    const t = i.replace(/[).,;:!?'"”’）】》]+$/gu, ""), S = i.slice(t.length);
    return `<a class="chat-link" href="${N(t)}" data-href="${N(t)}" target="_blank" rel="noreferrer noopener">${t}</a>${S}`;
  });
}
function tn(s) {
  const i = Number(s) || 0;
  return i >= 1024 * 1024 ? (i / 1024 / 1024).toFixed(1) + " MB" : i >= 1024 ? Math.round(i / 1024) + " KB" : i + " B";
}
function It(s) {
  const i = new Date(Number(s) || Date.now()), t = /* @__PURE__ */ new Date(), S = (v) => String(v).padStart(2, "0"), p = S(i.getHours()) + ":" + S(i.getMinutes());
  return i.toDateString() === t.toDateString() ? p : S(i.getMonth() + 1) + "-" + S(i.getDate()) + " " + p;
}
function vt(s) {
  return String(s || "").replace(/：/g, ":").replace(/[\u3000\s]+/g, "").replace(/\/+$/, "");
}
function Wo(s) {
  return String(s || "").replace(/\/+$/, "");
}
function Ko({ base: s, token: i }) {
  const t = () => Wo(s()) || ft, S = () => String(i() || "").trim();
  function p($) {
    const m = Object.assign({}, $ || {}), f = S();
    return f && (m.Authorization = "Bearer " + f), m;
  }
  function v() {
    return p({ "Content-Type": "application/json" });
  }
  function z($) {
    const m = String($ || "");
    return /^https?:\/\//.test(m) ? m : t() + m;
  }
  async function E($, m, f) {
    const g = new AbortController(), x = setTimeout(() => g.abort(), f || 8e3);
    try {
      return await fetch(z($), Object.assign({}, m, { signal: g.signal }));
    } finally {
      clearTimeout(x);
    }
  }
  async function R($, m, f) {
    const g = await E($, m, f);
    if (!g.ok) {
      const x = await g.json().catch(() => ({})), A = new Error(x && x.error || "HTTP " + g.status);
      throw A.status = g.status, A.code = x && x.code || "", A;
    }
    return g.json();
  }
  function k($, m, f) {
    return R($, { method: "POST", headers: v(), body: JSON.stringify(m || {}) }, f);
  }
  function D($, m, f) {
    const g = String(m ?? "").replace(/^file:/, ""), x = t() + "/" + $ + "/" + encodeURIComponent(g), A = [], b = S();
    return b && A.push("token=" + encodeURIComponent(b)), f && A.push("name=" + encodeURIComponent(f)), A.length ? x + "?" + A.join("&") : x;
  }
  function H($, m) {
    const f = [];
    Number.isFinite(Number($)) && Number($) > 0 && f.push("after=" + encodeURIComponent($)), m && f.push("session=" + encodeURIComponent(m));
    const g = S();
    return g && f.push("token=" + encodeURIComponent(g)), t() + "/events" + (f.length ? "?" + f.join("&") : "");
  }
  return {
    baseUrl: t,
    authHeaders: p,
    authJson: v,
    fetchWithTimeout: E,
    fetchJson: R,
    assetUrl: D,
    eventsUrl: H,
    health: () => R("/health", { headers: p() }, 5e3),
    messages: ({ since: $ = 0, recent: m = 5 } = {}) => R($ > 0 ? "/messages?since=" + $ : "/messages?recent=" + m, { headers: p() }, 9e3),
    send: ($) => k("/send", $, 3e4),
    sessions: () => R("/sessions", { headers: p() }, 1e4),
    options: () => R("/options", { headers: p() }, 8e3),
    target: ($) => k("/target", { id: $ }, 2e4),
    createSession: ($) => k("/new", $, 2e4),
    selectModel: ($) => k("/model", $, 1e4),
    setPermission: ($) => k("/permission", { preset: $ }, 8e3),
    renameSession: ($, m) => k("/rename", { id: $, title: m }, 8e3),
    forkSession: ($, m) => k("/fork", m ? { id: $, atSeq: m } : { id: $ }, 15e3),
    archiveSession: ($, m) => k("/session/archive", m ? { id: $, stopActivity: !0 } : { id: $ }, 1e4),
    unarchiveSession: ($) => k("/session/unarchive", { id: $ }, 8e3),
    presentedFileUrl: ($, m, f, g) => {
      const x = new URLSearchParams({ seq: String($), index: String(m) });
      g && x.set("session", String(g));
      const A = S();
      return A && x.set("token", A), f && x.set("name", String(f)), t() + "/presented/file?" + x.toString();
    },
    stop: () => k("/stop", {}, 8e3),
    approvalDecision: ($, m) => k("/approvals", { id: $, decision: m ? "allow" : "deny" }, 5e3),
    respond: ($, m, f) => k("/respond", { id: $, answers: m, session: f }, 8e3),
    presence: ($, m) => k("/presence", m === void 0 ? { phone: !!$ } : { phone: !!$, input: !!m }, 3e3),
    uploadImage: ($) => k("/upload-image", $, 6e4),
    uploadFile: ($) => k("/upload-file", $, 6e4),
    snapshot: ($, { turns: m = 0, before: f = 0 } = {}) => {
      const g = new URLSearchParams();
      $ && g.set("session", $), m > 0 && g.set("turns", String(m)), f > 0 && g.set("before", String(f));
      const x = g.toString();
      return R("/snapshot" + (x ? "?" + x : ""), { headers: p() }, 9e3);
    }
  };
}
function Go(s) {
  const i = s || {}, t = i.code ? "（" + i.code + (i.status ? " " + i.status : "") + "）" : "", S = i.message ? "：" + i.message : "";
  return (i.hint || "执行失败") + t + S;
}
function Vo(s) {
  if (!s || !s.type) return null;
  const i = s.payload || {}, t = Number(s.seq), p = {
    who: "ai",
    text: "",
    at: Number(s.at) || Date.now(),
    images: [],
    files: [],
    reasoning: ""
  };
  if (Number.isFinite(t) && (p.seq = t), s.id && (p.eventId = String(s.id)), s.type === "message.user")
    p.who = "me", p.text = String(i.text || ""), p.images = Array.isArray(i.images) ? i.images : [], p.files = Array.isArray(i.files) ? i.files : [];
  else if (s.type === "message.assistant")
    p.text = String(i.text || ""), p.reasoning = String(i.reasoning || ""), p.images = Array.isArray(i.images) ? i.images : [], p.files = Array.isArray(i.files) ? i.files : [];
  else if (s.type === "message.error")
    p.who = "error", p.text = Go(i);
  else
    return null;
  return !p.text && p.images.length === 0 && p.files.length === 0 ? null : p;
}
function Yo() {
  const s = [], i = /* @__PURE__ */ new Map();
  let t = 0, S = -1;
  function p() {
    s.length = 0, i.clear(), t = 0, S = -1;
  }
  function v(m) {
    if (!m || !m.type) return !1;
    const f = m.payload || {}, g = Number(m.seq), x = (b) => b ? b.seq : Number.isFinite(g) ? g : 0, A = Number(m.at) || Date.now();
    if (m.type === "tool.update") {
      const b = String(f.callId || "");
      if (!b) return !1;
      const w = "tool-" + b, d = i.get(w);
      return i.set(w, {
        kind: "tool",
        id: w,
        callId: b,
        name: String(f.name || (d ? d.name : "")),
        summary: String(f.summary || (d ? d.summary : "")),
        args: String(f.args || (d ? d.args : "")),
        status: d && d.status !== "running" ? d.status : "running",
        preview: d ? d.preview : "",
        error: d ? d.error : null,
        images: d && Array.isArray(d.images) ? d.images : [],
        seq: d && d.provisional !== !0 ? d.seq : Number.MAX_SAFE_INTEGER,
        provisional: !0,
        at: d ? d.at : A
      }), !0;
    }
    if (m.type === "tool.start") {
      const b = String(f.callId || ""), w = "tool-" + (b || m.id), d = i.get(w);
      return i.set(w, {
        kind: "tool",
        id: w,
        callId: b,
        name: String(f.name || (d ? d.name : "")),
        summary: String(f.summary || (d ? d.summary : "")),
        args: String(f.args || (d ? d.args : "")),
        status: "running",
        preview: d ? d.preview : "",
        error: d ? d.error : null,
        images: d && Array.isArray(d.images) ? d.images : [],
        seq: d && d.provisional !== !0 ? d.seq : Number.isFinite(g) ? g : d ? d.seq : 0,
        provisional: !1,
        at: d ? d.at : A
      }), E(g), !0;
    }
    if (m.type === "tool.end") {
      const b = String(f.callId || ""), w = "tool-" + (b || m.id), d = i.get(w);
      return i.set(w, {
        kind: "tool",
        id: w,
        callId: b,
        name: d ? d.name : "",
        summary: d ? d.summary : "",
        args: d ? d.args : "",
        status: f.ok === !1 ? "failed" : "ok",
        preview: String(f.preview || (d ? d.preview : "")),
        error: f.error || (d ? d.error : null),
        images: Array.isArray(f.images) ? f.images : d && Array.isArray(d.images) ? d.images : [],
        seq: x(d),
        provisional: !1,
        at: d ? d.at : A
      }), E(g), !0;
    }
    if (m.type === "deliverable.present") {
      const b = String(f.callId || ""), w = (Array.isArray(f.files) ? f.files : []).filter(
        (n) => n && typeof n.path == "string" && n.path.trim()
      );
      if (w.length === 0) return !1;
      const d = "deliverable-" + (b || m.id || g), c = i.get(d);
      return i.set(d, {
        kind: "deliverable",
        id: d,
        callId: b,
        turn: Number(f.turn) || 0,
        files: w,
        seq: c && c.provisional !== !0 ? c.seq : Number.isFinite(g) ? g : c ? c.seq : 0,
        at: c ? c.at : A
      }), E(g), !0;
    }
    if (m.type === "approval.request") {
      const b = String(f.approvalId || "");
      if (!b) return !1;
      const w = "approval-" + b, d = i.get(w);
      return i.set(w, {
        kind: "approval",
        id: w,
        approvalId: b,
        title: String(f.title || (d ? d.title : "")),
        tool: String(f.tool || (d ? d.tool : "")),
        reason: String(f.reason || ""),
        callId: String(f.callId || ""),
        decision: "",
        outcome: "",
        seq: x(d),
        at: d ? d.at : A
      }), E(g), !0;
    }
    if (m.type === "approval.result") {
      const b = String(f.approvalId || "");
      if (!b) return !1;
      const w = "approval-" + b, d = i.get(w);
      return i.set(w, {
        kind: "approval",
        id: w,
        approvalId: b,
        title: d ? d.title : "",
        tool: String(f.tool || (d ? d.tool : "")),
        reason: String(f.reason || (d ? d.reason : "")),
        callId: d ? d.callId : "",
        decision: f.decision === "deny" ? "deny" : "allow",
        outcome: String(f.outcome || ""),
        seq: x(d),
        at: d ? d.at : A
      }), E(g), !0;
    }
    if (m.type === "input.request" || m.type === "input.result") {
      const b = String(f.callId || "");
      if (!b) return !1;
      const w = "input-" + b, d = i.get(w), c = Array.isArray(f.questions) ? f.questions : d ? d.questions : [];
      return m.type === "input.request" ? i.set(w, {
        kind: "input",
        id: w,
        callId: b,
        questions: c,
        state: String(f.state || (d ? d.state : "open")),
        answers: d ? d.answers : null,
        seq: x(d),
        at: d ? d.at : A
      }) : i.set(w, {
        kind: "input",
        id: w,
        callId: b,
        questions: c,
        state: "answered",
        answers: Array.isArray(f.answers) ? f.answers : [],
        seq: x(d),
        at: d ? d.at : A
      }), E(g), !0;
    }
    return !1;
  }
  function z() {
    t = s.reduce((m, f) => Math.max(m, Number(f && f.id) || 0), 0);
  }
  function E(m) {
    const f = Number(m);
    Number.isFinite(f) && f > S && (S = f);
  }
  function R(m) {
    const f = s.filter((g) => g.local);
    s.length = 0;
    for (const g of m) s.push(g);
    for (const g of f) s.push(g);
    z();
    for (const g of s) E(g.seq);
  }
  function k(m) {
    if (!m) return !1;
    if (m.id) {
      if (m.who === "me") {
        const f = s.find((g) => g.local && g.text === m.text && !g.id);
        if (f)
          return f.id = m.id, f.at = m.at || f.at, Number.isFinite(Number(m.seq)) && (f.seq = m.seq), f.local = !1, f.images = m.images || [], f.files = m.files || [], E(f.seq), z(), !0;
      }
      if (s.some((f) => f.id === m.id)) return !1;
    }
    return s.push(m), E(m.seq), z(), !0;
  }
  function D(m) {
    const f = v(m), g = Vo(m);
    if (!g)
      return E(m && m.seq), f;
    if (g.eventId && s.some((x) => x.eventId === g.eventId))
      return E(g.seq), f;
    if (g.who === "me") {
      const x = s.find((A) => A.local && A.text === g.text);
      if (x)
        return x.eventId = g.eventId, x.at = g.at || x.at, x.seq = g.seq, x.local = !1, x.images = g.images, x.files = g.files, E(g.seq), !0;
    }
    return g.seq !== void 0 && g.who === "error" && s.some((x) => x.seq === g.seq && x.who === "error") ? (E(g.seq), f) : (s.push(g), E(g.seq), !0);
  }
  function H(m) {
    const f = s.filter((x) => x.local);
    s.length = 0, i.clear(), S = -1;
    for (const x of f) s.push(x);
    let g = f.length > 0;
    for (const x of [...m || []].sort((A, b) => Number(A.seq) - Number(b.seq)))
      D(x) && (g = !0);
    return g;
  }
  function $() {
    const m = [];
    for (const f of s)
      m.push({ kind: "message", message: f, seq: Number(f.seq) });
    for (const f of i.values()) m.push(f);
    return m.sort((f, g) => {
      const x = Number.isFinite(Number(f.seq)) ? Number(f.seq) : Number.MAX_SAFE_INTEGER, A = Number.isFinite(Number(g.seq)) ? Number(g.seq) : Number.MAX_SAFE_INTEGER;
      return x - A;
    }), m;
  }
  return {
    messages: s,
    cards: i,
    timeline: $,
    get cursor() {
      return t;
    },
    set cursor(m) {
      t = Number(m) || 0;
    },
    get lastSeq() {
      return S;
    },
    get size() {
      return s.length;
    },
    clear: p,
    replaceMessages: R,
    upsertMessage: k,
    upsertEvent: D,
    replaceEvents: H
  };
}
const en = "docklet-chat-cache", Et = "events", fe = "meta", an = "schema", Qo = 2, Qe = 1, Xo = 600, ge = 3;
function Jo() {
  try {
    return typeof indexedDB < "u" && indexedDB !== null;
  } catch {
    return !1;
  }
}
function Zo({ limit: s = Xo } = {}) {
  let i = null, t = 0;
  function S(g) {
    return new Promise((x, A) => {
      const b = g.transaction([fe, Et], "readwrite"), w = b.objectStore(fe), d = w.get(an);
      d.onsuccess = () => {
        const c = d.result ? Number(d.result.value) : 0;
        c !== Qe && (c && c !== Qe && b.objectStore(Et).clear(), w.put({ key: an, value: Qe }));
      }, b.oncomplete = () => x(), b.onerror = () => A(b.error || new Error("indexedDB schema failed"));
    });
  }
  function p() {
    return Jo() ? i || (i = new Promise((g, x) => {
      const A = indexedDB.open(en, Qo);
      A.onupgradeneeded = () => {
        const b = A.result;
        b.objectStoreNames.contains(Et) || b.createObjectStore(Et, { keyPath: "key" }).createIndex("session", "session", { unique: !1 }), b.objectStoreNames.contains(fe) || b.createObjectStore(fe, { keyPath: "key" });
      }, A.onsuccess = () => {
        const b = A.result;
        S(b).then(() => g(b)).catch(() => g(b));
      }, A.onerror = () => x(A.error || new Error("indexedDB open failed")), A.onblocked = () => x(new Error("indexedDB blocked"));
    }), i) : Promise.reject(new Error("no indexedDB"));
  }
  function v(g, x) {
    return p().then(
      (A) => new Promise((b, w) => {
        const d = A.transaction(Et, g), c = d.objectStore(Et);
        let n;
        try {
          n = x(c);
        } catch (F) {
          w(F);
          return;
        }
        d.oncomplete = () => b(n), d.onerror = () => w(d.error || new Error("indexedDB transaction failed")), d.onabort = () => w(d.error || new Error("indexedDB transaction aborted"));
      })
    );
  }
  function z(g) {
    return !!(g && (g.name === "QuotaExceededError" || g.code === 22 || /quota|storage/i.test(String(g.message || ""))));
  }
  function E(g) {
    return v("readwrite", (x) => {
      const A = x.index("session");
      return new Promise((b, w) => {
        const d = A.getAll(g);
        d.onsuccess = () => {
          const c = (d.result || []).sort((F, K) => Number(F.seq) - Number(K.seq)), n = c.slice(0, Math.max(1, Math.ceil(c.length / 2)));
          for (const F of n) x.delete(F.key);
          b(n.length);
        }, d.onerror = () => w(d.error);
      });
    });
  }
  function R(g, x) {
    const A = String(g || ""), b = (Array.isArray(x) ? x : []).filter((c) => c && c.id && Number.isFinite(Number(c.seq)));
    if (!A || b.length === 0) return Promise.resolve(0);
    const w = () => v("readwrite", (c) => {
      for (const n of b)
        c.put({ key: A + ":" + n.id, session: A, seq: Number(n.seq), event: n });
      return b.length;
    }), d = () => (t += b.length, t < 40 ? 0 : (t = 0, k(A)));
    return w().then(d).catch((c) => {
      if (!z(c)) throw c;
      return E(A).then(w).then(d).catch(() => 0);
    });
  }
  function k(g) {
    return v("readwrite", (x) => {
      const A = x.index("session");
      return new Promise((b, w) => {
        const d = A.getAll(g);
        d.onsuccess = () => {
          const c = (d.result || []).sort((_, V) => Number(_.seq) - Number(V.seq)), n = (() => {
            const _ = c.filter((V) => V.event && V.event.type === "turn.start").map((V) => Number(V.seq));
            return _.length ? _ : c.filter((V) => V.event && V.event.type === "message.user").map((V) => Number(V.seq));
          })(), F = n.length > ge ? n[n.length - ge] : 0;
          let K = F > 0 ? c.filter((_) => Number(_.seq) >= F) : c;
          K.length > s && (K = K.slice(K.length - s));
          const Z = new Set(K.map((_) => _.key)), U = c.filter((_) => !Z.has(_.key));
          for (const _ of U) x.delete(_.key);
          b(U.length);
        }, d.onerror = () => w(d.error);
      });
    });
  }
  function D(g) {
    const x = String(g || "");
    return x ? v("readwrite", (A) => {
      const b = A.index("session");
      return new Promise((w, d) => {
        const c = b.openCursor();
        let n = 0;
        c.onsuccess = () => {
          const F = c.result;
          if (!F) {
            w(n);
            return;
          }
          F.value && F.value.session !== x && (F.delete(), n += 1), F.continue();
        }, c.onerror = () => d(c.error);
      });
    }) : Promise.resolve(0);
  }
  function H(g) {
    const x = String(g || "");
    return x ? v("readonly", (A) => {
      const b = A.index("session");
      return new Promise((w, d) => {
        const c = b.getAll(x);
        c.onsuccess = () => {
          const n = (c.result || []).sort((U, _) => Number(U.seq) - Number(_.seq)), F = (() => {
            const U = n.filter((_) => _.event && _.event.type === "turn.start").map((_) => Number(_.seq));
            return U.length ? U : n.filter((_) => _.event && _.event.type === "message.user").map((_) => Number(_.seq));
          })(), K = F.length > ge ? F[F.length - ge] : 0;
          let Z = K > 0 ? n.filter((U) => Number(U.seq) >= K) : n;
          Z.length > s && (Z = Z.slice(Z.length - s)), w(Z.map((U) => U.event).filter(Boolean));
        }, c.onerror = () => d(c.error);
      });
    }) : Promise.resolve([]);
  }
  function $(g) {
    const x = String(g || "");
    return v("readwrite", (A) => {
      const b = A.index("session");
      return new Promise((w, d) => {
        const c = b.getAllKeys(x);
        c.onsuccess = () => {
          for (const n of c.result || []) A.delete(n);
          w(!0);
        }, c.onerror = () => d(c.error);
      });
    });
  }
  function m() {
    return v("readwrite", (g) => (g.clear(), !0));
  }
  function f() {
    return (async () => {
      if (i) {
        try {
          const x = await i;
          x && typeof x.close == "function" && x.close();
        } catch {
        }
        i = null;
      }
    })().then(
      () => new Promise((x) => {
        try {
          const A = indexedDB.deleteDatabase(en);
          A.onsuccess = A.onerror = A.onblocked = () => x(!0);
        } catch {
          x(!1);
        }
      })
    );
  }
  return { put: R, get: H, clear: $, clearAll: m, clearOthers: D, destroy: f };
}
function tr({ appId: s, base: i, token: t, notify: S, mode: p = "turn" }) {
  const v = {
    id: s,
    endpoint: String(i) + "/health",
    token: t || "",
    intervalMs: 2500,
    enabled: S !== !1,
    openApp: s,
    suppressApp: s,
    title: "DSH控制台"
  };
  return p === "message" ? {
    ...v,
    mode: "change",
    field: "lastAssistantSeq",
    doneText: "收到新消息",
    failText: "收到新消息"
  } : {
    ...v,
    field: "running",
    from: !0,
    to: !1,
    failField: "lastTurnError",
    doneText: "指令已完成",
    failText: "指令执行失败"
  };
}
const er = /^(https?:\/\/|mailto:)/i, nn = {
  js: "const let var function return if else for while do break continue class new typeof instanceof in of this super import from export default async await try catch finally throw switch case extends static get set yield void delete",
  ts: "const let var function return if else for while do break continue class new typeof instanceof in of this super import from export export default async await try catch finally throw switch case extends static get set yield void delete interface type enum implements private public protected readonly namespace declare abstract as satisfies keyof infer",
  py: "def class return if elif else for while import from as pass break continue with try except finally raise lambda yield global nonlocal assert del in is not and or None True False async await print",
  bash: "if then else elif fi for while do done case esac function in return exit export local echo cd ls grep sed awk cat test"
}, ar = {
  js: "js",
  javascript: "js",
  jsx: "js",
  mjs: "js",
  cjs: "js",
  ts: "ts",
  typescript: "ts",
  tsx: "ts",
  py: "py",
  python: "py",
  sh: "bash",
  bash: "bash",
  shell: "bash",
  zsh: "bash",
  json: "json"
};
function cn(s, i) {
  return /^https?:\/\//i.test(i) ? /^https:/i.test(i) ? `<img class="chat-image chat-md-image" src="${N(i)}" alt="${N(s)}" loading="lazy" referrerpolicy="no-referrer" />` : `<img class="chat-image chat-md-image" data-remote="${N(i)}" alt="${N(s)}" />` : P(s);
}
function wt(s) {
  const i = String(s ?? "");
  let t = "", S = 0;
  const p = /!\[([^\]]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)|`([^`\n]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|~~([^~]+)~~|\[([^\]]+)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)|(https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+)/gu;
  let v;
  for (; v = p.exec(i); ) {
    if (t += P(i.slice(S, v.index)), S = v.index + v[0].length, v[1] !== void 0) {
      t += cn(v[1], v[2]);
      continue;
    }
    if (v[3] !== void 0) {
      t += `<code class="chat-inline-code">${P(v[3])}</code>`;
      continue;
    }
    if (v[4] !== void 0) {
      t += `<strong>${P(v[4])}</strong>`;
      continue;
    }
    if (v[5] !== void 0) {
      t += `<strong>${P(v[5])}</strong>`;
      continue;
    }
    if (v[6] !== void 0) {
      t += `<em>${P(v[6])}</em>`;
      continue;
    }
    if (v[7] !== void 0) {
      t += `<del>${P(v[7])}</del>`;
      continue;
    }
    if (v[8] !== void 0) {
      const k = v[8], D = v[9];
      t += er.test(D) ? `<a class="chat-link" href="${N(D)}" data-href="${N(D)}" target="_blank" rel="noreferrer noopener">${P(k)}</a>` : P(k);
      continue;
    }
    const z = v[10], E = z.replace(/[).,;:!?'"”’）】》]+$/gu, ""), R = z.slice(E.length);
    t += `<a class="chat-link" href="${N(E)}" data-href="${N(E)}" target="_blank" rel="noreferrer noopener">${P(E)}</a>${P(R)}`;
  }
  return t += P(i.slice(S)), t;
}
function nr(s, i) {
  const t = ar[String(i || "").toLowerCase()] || "", S = String(s ?? "");
  if (t === "json" || !nn[t])
    return { html: P(S), lang: t || String(i || "").toLowerCase() };
  const p = t === "js" || t === "ts" ? String.raw`(\/\*[\s\S]*?\*\/|\/\/[^\n]*)` : String.raw`(#[^\n]*)`, v = new RegExp(
    p + String.raw`|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|` + "`(?:\\\\[\\s\\S]|[^`\\\\])*`)",
    "g"
  ), z = [];
  let E = S.replace(v, (k) => (z.push(k), `\0${"z".repeat(z.length)}\0`));
  E = P(E);
  const R = nn[t].split(/\s+/);
  return E = E.replace(
    /\b([A-Za-z_$][\w$]*)\b/g,
    (k) => R.includes(k) ? `<span class="tk-k">${k}</span>` : k
  ), E = E.replace(/\b\d+(?:\.\d+)?\b/g, (k) => `<span class="tk-n">${k}</span>`), E = E.replace(/\u0000(z+)\u0000/g, (k, D) => {
    const H = z[D.length - 1] || "";
    return `<span class="${H.startsWith("/") || H.startsWith("#") ? "tk-c" : "tk-s"}">${P(H)}</span>`;
  }), { html: E, lang: t };
}
function or(s, i) {
  const t = nr(s, i), S = t.lang || "code";
  return `<div class="chat-code"><div class="chat-code-head"><span class="chat-code-lang">${P(S)}</span><button type="button" class="chat-code-copy" data-action="copy-code" data-code="${N(encodeURIComponent(s))}">复制</button></div><pre><code>${t.html}</code></pre></div>`;
}
function ln(s, i) {
  if (i + 1 >= s.length || !/^\s*\|.*\|\s*$/.test(s[i])) return !1;
  const t = s[i + 1];
  return /^\s*\|?[\s:|-]+\|?\s*$/.test(t) && t.includes("-");
}
function on(s) {
  return s.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((t) => t.trim());
}
function rr(s, i) {
  const t = s[i];
  return /^\s*```/.test(t) || /^(#{1,6})\s+/.test(t) || /^\s*>\s?/.test(t) || /^\s*[-*+]\s+/.test(t) || /^\s*\d+[.)]\s+/.test(t) || /^\s*([-*_])(?:\s*\1){2,}\s*$/.test(t) || ln(s, i);
}
function rn(s, i, t) {
  const S = [], p = t ? /^\s*\d+[.)]\s+(.*)$/ : /^\s*[-*+]\s+(.*)$/;
  let v = i;
  for (; v < s.length; ) {
    const z = p.exec(s[v]);
    if (!z) {
      if (S.length > 0 && /^\s{2,}\S/.test(s[v])) {
        S[S.length - 1] += " " + s[v].trim(), v += 1;
        continue;
      }
      break;
    }
    S.push(z[1]), v += 1;
  }
  return { items: S, next: v };
}
const Xe = /^\s*!\[([^\]]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)\s*$/;
function sr(s) {
  const i = s.length;
  return `<div class="chat-md-gallery ${i === 1 ? "is-one" : i === 2 ? "is-two" : i >= 5 ? "is-many" : "is-few"}" data-count="${i}">${s.map((S) => cn(S.alt, S.src)).join("")}</div>`;
}
function dn(s) {
  const t = String(s ?? "").replace(/\r\n?/g, `
`).split(`
`), S = [];
  let p = 0;
  for (; p < t.length; ) {
    const v = t[p];
    if (!v.trim()) {
      p += 1;
      continue;
    }
    const z = /^\s*```(.*)$/.exec(v);
    if (z) {
      const k = z[1].trim().split(/\s+/)[0] || "", D = [];
      for (p += 1; p < t.length && !/^\s*```\s*$/.test(t[p]); )
        D.push(t[p]), p += 1;
      p < t.length && (p += 1), S.push(or(D.join(`
`), k));
      continue;
    }
    const E = /^(#{1,6})\s+(.+?)\s*$/.exec(v);
    if (E) {
      const k = E[1].length;
      S.push(`<h${k}>${wt(E[2])}</h${k}>`), p += 1;
      continue;
    }
    if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(v)) {
      S.push("<hr />"), p += 1;
      continue;
    }
    if (/^\s*>\s?/.test(v)) {
      const k = [];
      for (; p < t.length && /^\s*>\s?/.test(t[p]); )
        k.push(t[p].replace(/^\s*>\s?/, "")), p += 1;
      S.push(`<blockquote>${k.map(wt).join("<br />")}</blockquote>`);
      continue;
    }
    if (/^\s*[-*+]\s+/.test(v)) {
      const k = rn(t, p, !1);
      S.push(`<ul>${k.items.map((D) => `<li>${wt(D)}</li>`).join("")}</ul>`), p = k.next;
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(v)) {
      const k = rn(t, p, !0);
      S.push(`<ol>${k.items.map((D) => `<li>${wt(D)}</li>`).join("")}</ol>`), p = k.next;
      continue;
    }
    if (ln(t, p)) {
      const k = on(t[p]);
      p += 2;
      const D = [];
      for (; p < t.length && /^\s*\|.*\|\s*$/.test(t[p]); )
        D.push(on(t[p])), p += 1;
      S.push(
        `<div class="chat-table-wrap"><table><thead><tr>${k.map((H) => `<th>${wt(H)}</th>`).join("")}</tr></thead><tbody>${D.map((H) => `<tr>${H.map(($) => `<td>${wt($)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
      );
      continue;
    }
    if (Xe.test(v)) {
      const k = [];
      for (; p < t.length; ) {
        const D = Xe.exec(t[p]);
        if (D) {
          k.push({ alt: D[1], src: D[2] }), p += 1;
          continue;
        }
        if (!t[p].trim()) {
          let H = p;
          for (; H < t.length && !t[H].trim(); ) H += 1;
          if (H < t.length && Xe.test(t[H])) {
            p = H;
            continue;
          }
        }
        break;
      }
      if (k.length > 0) {
        S.push(sr(k));
        continue;
      }
    }
    const R = [];
    for (; p < t.length && t[p].trim() && !rr(t, p); )
      R.push(t[p]), p += 1;
    R.length === 0 && (R.push(t[p]), p += 1), S.push(`<p>${R.map(wt).join("<br />")}</p>`);
  }
  return S.join("");
}
function ir(s) {
  return s ? s.eventId ? String(s.eventId) : s.id ? "id" + s.id : Number.isFinite(Number(s.seq)) ? "s" + s.seq : "" : "";
}
function sn(s, i) {
  const t = ir(s), S = t ? ` data-mid="${N(t)}"` : "";
  if (s.who === "sys")
    return `<div class="chat-sys">${Fo(P(he(s.text)))}</div>`;
  if (s.who === "error") {
    const x = s.retryText ? `<button type="button" class="chat-retry" data-retry="${N(encodeURIComponent(s.retryText))}">点按重试</button>` : "";
    return `<div class="chat-turn is-ai"${S}>${x}<div class="chat-bubble is-error" data-copy="${N(encodeURIComponent(he(s.text)))}">${P(he(s.text))}</div></div>`;
  }
  const p = s.who === "me", v = Array.isArray(s.images) ? s.images : [], z = Array.isArray(s.files) ? s.files : [], E = v.length ? `<div class="chat-md-gallery ${v.length === 1 ? "is-one" : v.length === 2 ? "is-two" : v.length >= 5 ? "is-many" : "is-few"}" data-count="${v.length}">${v.map((x) => {
    const A = String(x.id || "").startsWith("local:") ? String(x.src || "") : "";
    if (A) return `<img class="chat-image chat-md-image" src="${N(A)}" alt="图片" />`;
    const b = i("image", x.id);
    return `<img class="chat-image chat-md-image" data-src="${N(b)}" alt="图片" />`;
  }).join("")}</div>` : "", R = z.map((x) => {
    const A = x.name || "文件";
    if (String(x.id || "").startsWith("local:"))
      return `<div class="chat-file"><span class="chat-file-icon">📦</span><span class="chat-file-main"><span class="chat-file-name">${P(A)}</span><span class="chat-file-size">${tn(x.size)} · 发送中</span></span></div>`;
    const b = i("file", x.id, A);
    return `<a class="chat-file" href="${N(b)}" data-file-url="${N(b)}" data-file-name="${N(A)}" download="${N(A)}">
          <span class="chat-file-icon">📦</span>
          <span class="chat-file-main">
            <span class="chat-file-name">${P(A)}</span>
            <span class="chat-file-size">${tn(x.size)} · 点按下载</span>
          </span>
        </a>`;
  }).join(""), k = s.text ? dn(s.text) : "", D = s.reasoning ? `<details class="chat-thinking"><summary>思考过程</summary><div class="chat-thinking-text">${P(s.reasoning)}</div></details>` : "", H = s.pending ? " is-typing" : "", $ = `<div class="chat-bubble ${p ? "is-me" : "is-ai"}${H}${v.length ? " has-images" : ""}" data-copy="${N(encodeURIComponent(he(s.text || "")))}">${E}${R}${D}${k}</div>`, m = !s.pending && s.text ? '<button type="button" class="chat-copy" data-action="copy-message" aria-label="复制这条消息">复制</button>' : "", f = p && !s.pending && s.text ? '<button type="button" class="chat-copy chat-resend" data-action="resend-message" aria-label="放进输入框重发">重发</button>' : "", g = `<div class="chat-meta"><span class="chat-avatar">${p ? "🙂" : "🤖"}</span><span class="chat-stamp">${It(s.at)}</span>${m}${f}</div>`;
  return `<div class="chat-turn ${p ? "is-me" : "is-ai"}"${S}>${g}${$}</div>`;
}
function cr(s, i) {
  const t = N(s.id || ""), S = s.title || (s.blank ? "新对话" : "未命名对话"), p = P(S), v = s.id === i ? "✓ " : "", z = s.running ? "运行中" : s.online ? "在线" : "", E = It(s.at);
  return `<div class="chat-session-row">
            <button type="button" class="chat-session" data-session="${t}" data-current="${s.id === i ? "1" : "0"}">
              <span class="chat-session-label">${v}${p}</span>
              <span class="chat-session-time">${z ? P(z) + " · " : ""}${E}</span>
            </button>
            <button type="button" class="chat-session-more" data-action="session-menu" data-session="${t}" data-title="${N(S)}" aria-label="会话操作">⋯</button>
          </div>`;
}
function Je(s) {
  return s ? `<span class="chat-card-time">${It(s)}</span>` : "";
}
function lr(s, i, t = null, S = 0, p = !1) {
  const v = s.status === "failed" ? "is-failed" : s.status === "ok" ? "is-ok" : "is-running", z = s.name || "工具", E = s.summary || "", R = Number(S) || 0, k = R ? `<span class="chat-tool-index ${v}">${R}</span>` : '<span class="chat-tool-dot" aria-hidden="true"></span>';
  return `<div class="chat-tool ${v}${p ? " is-active" : ""}" data-tool="${N(s.id)}">
    <button type="button" class="chat-tool-head" data-action="tool-open" data-tool="${N(s.id)}">
      ${k}
      <span class="chat-tool-name">${P(z)}</span>
      ${E ? `<span class="chat-tool-sum">${P(E)}</span>` : ""}
      <span class="chat-tool-chevron" aria-hidden="true">›</span>
    </button>
  </div>`;
}
function dr(s, i = null) {
  const t = s.status === "failed" ? "is-failed" : s.status === "ok" ? "is-ok" : "is-running", S = s.name || "工具", p = s.summary || "", v = !!(s.preview || s.error), z = (k) => `<button type="button" class="chat-tool-copy" data-action="tool-copy" data-tool="${N(s.id)}" data-copy="${k}">复制</button>`, E = [
    s.preview ? `<div class="chat-tool-code-head"><span>结果</span>${z("preview")}</div><pre class="chat-tool-preview">${P(s.preview)}</pre>` : "",
    s.error ? `<p class="chat-tool-label">错误</p><p class="chat-tool-error">${P([s.error.name, s.error.code, s.error.reason].filter(Boolean).join(" · "))}</p>` : "",
    v ? "" : '<p class="chat-tool-preview">没有输出</p>'
  ].join(""), R = s.args ? `<div class="chat-tool-code-head"><span>参数</span>${z("args")}</div><pre class="chat-tool-pre">${P(s.args)}</pre>` : "";
  return `<div class="chat-tool-detail ${t}">
    <div class="chat-tool-detail-head">
      <span class="chat-tool-dot" aria-hidden="true"></span>
      <span class="chat-tool-name">${P(S)}</span>
      ${p ? `<span class="chat-tool-sum">${P(p)}</span>` : ""}
    </div>
    ${E}
    ${R}
  </div>`;
}
function ur() {
  return `<div class="chat-tool-group is-empty">
    <div class="chat-tool-group-head">
      <span class="chat-tool-group-icon" aria-hidden="true">🧰</span>
      <span class="chat-tool-group-title">本轮 0 次工具调用</span>
    </div>
  </div>`;
}
function pr(s, i, t, S = null, p = {}) {
  const v = Number.isFinite(Number(p.total)) ? Number(p.total) : s.length, z = s.filter((m) => m.status === "failed").length, E = Number(p.running) || 0, R = z > 0 ? `${z} 次失败` : E > 0 ? "执行中" : "已完成", k = "group-" + (s[0] ? s[0].id : "current"), D = s.map((m, f) => lr(m, !1, S, f + 1, m.id === p.activeId)).join(""), H = i && v > 3 ? `<button type="button" class="chat-tool-group-collapse" data-action="tool-group-toggle" data-group="${N(k)}">收起工具列表</button>` : "", $ = s.length ? `<button type="button" class="chat-tool-group-head" data-action="tool-group-toggle" data-group="${N(k)}" aria-expanded="${i ? "true" : "false"}">
        <span class="chat-tool-group-icon" aria-hidden="true">🧰</span>
        <span class="chat-tool-group-title">本轮 ${v} 次工具调用</span>
        <span class="chat-tool-group-badge${z > 0 ? " is-failed" : ""}">${R}</span>
        <span class="chat-tool-chevron" aria-hidden="true">›</span>
      </button>` : `<div class="chat-tool-group-head is-static">
        <span class="chat-tool-group-icon" aria-hidden="true">🧰</span>
        <span class="chat-tool-group-title">本轮 ${v} 次工具调用</span>
        <span class="chat-tool-group-badge${z > 0 ? " is-failed" : ""}">${R}</span>
      </div>`;
  return `<div class="chat-tool-group${i ? " is-open" : ""}" data-group="${N(k)}">
    ${$}
    <div class="chat-tool-group-body"${i && D ? "" : " hidden"}>${D}</div>
    ${H}
  </div>`;
}
function hr(s, i) {
  const t = Array.isArray(s.files) ? s.files : [], S = t.map((p, v) => {
    const z = String(p.path || "").split(/[\\/]/).pop() || "文件", E = typeof i == "function" ? i(s.seq, v, z) : "", R = /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(z), k = `<a class="chat-file chat-deliverable-file" href="${N(E)}" data-file-url="${N(E)}" data-file-name="${N(z)}" download="${N(z)}">
        <span class="chat-file-icon">${R ? "🖼" : "📄"}</span>
        <span class="chat-file-main">
          <span class="chat-file-name">${P(z)}</span>
          <span class="chat-file-size">${P(p.description || (R ? "点图预览 · 点此下载" : "点按下载"))}</span>
        </span>
        ${R ? '<span class="chat-deliverable-download">下载</span>' : ""}
      </a>`;
    return R ? `<div class="chat-deliverable-media">
        <img class="chat-image chat-deliverable-thumb" data-src="${N(E)}" alt="${N(z)}" />
        ${k}
      </div>` : k;
  }).join("");
  return `<div class="chat-card chat-deliverable" data-deliverable="${N(s.id)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">📦</span>
      <span class="chat-card-title">交付文件</span>
      <span class="chat-card-badge">${t.length} 个</span>
      ${Je(s.at)}
    </div>
    <div class="chat-deliverable-list">${S}</div>
  </div>`;
}
function fr(s) {
  const i = !s.decision, t = s.decision === "allow", S = s.title || "等待你授权", p = s.reason || "需要你确认后才能继续。", v = i ? `<div class="chat-card-actions">
        <button type="button" class="chat-btn is-danger" data-action="approval-deny" data-approval="${N(s.id)}">拒绝</button>
        <button type="button" class="chat-btn is-primary" data-action="approval-allow" data-approval="${N(s.id)}">允许</button>
      </div>` : "", z = i ? '<span class="chat-card-badge is-pending">待授权</span>' : `<span class="chat-card-badge ${t ? "is-ok" : "is-failed"}">${t ? "已允许" : "已拒绝"}</span>`;
  return `<div class="chat-card chat-approval${i ? " is-pending" : ""}" data-approval="${N(s.id)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">🛡</span>
      <span class="chat-card-title">${P(S)}</span>
      ${z}
      ${Je(s.at)}
    </div>
    ${s.tool ? `<p class="chat-card-sub">${P(s.tool)}</p>` : ""}
    <p class="chat-card-text">${P(p)}</p>
    ${v}
  </div>`;
}
function gr(s, i) {
  const t = i && i.selected || {}, S = i && i.custom || {}, p = [];
  for (const v of s.questions || []) {
    const z = Array.isArray(t[v.id]) ? t[v.id] : [], E = String(S[v.id] || "").trim();
    if (z.length === 0 && !E) return null;
    const R = { id: v.id, selected: z };
    E && (R.custom = E), p.push(R);
  }
  return p.length ? p : null;
}
function mr(s, i, t) {
  const S = s.state !== "answered" && !t, p = s.state === "answered", v = i && i.selected || {}, z = i && i.custom || {}, E = (s.questions || []).map((k) => {
    const D = Array.isArray(v[k.id]) ? v[k.id] : [], H = Array.isArray(k.options) ? k.options : [], $ = p && Array.isArray(s.answers) ? s.answers.find((x) => x.id === k.id) : null, m = H.length ? `<div class="chat-q-opts">${H.map((x) => {
      const A = D.includes(x.label), b = $ && Array.isArray($.selected) && $.selected.includes(x.label);
      return `<button type="button" class="chat-q-opt${A || b ? " is-on" : ""}" data-action="q-pick" data-input="${N(s.callId)}" data-q="${N(k.id)}" data-value="${N(x.label)}" ${k.multiSelect ? 'data-multi="1"' : ""} ${S ? "" : "disabled"}>
                <span class="chat-q-opt-label">${P(x.label)}</span>
                ${x.description ? `<small class="chat-q-opt-desc">${P(x.description)}</small>` : ""}
              </button>`;
    }).join("")}</div>` : "", f = p && $ && $.custom ? $.custom : String(z[k.id] || ""), g = S ? `<input class="chat-q-custom" data-role="q-custom" data-input="${N(s.callId)}" data-q="${N(k.id)}" value="${N(f)}" placeholder="或者自己输入" autocomplete="off" />` : f ? `<p class="chat-q-custom-text">${P(f)}</p>` : "";
    return `<div class="chat-q">
        ${k.header ? `<p class="chat-q-header">${P(k.header)}</p>` : ""}
        <p class="chat-q-text">${P(k.question || "")}</p>
        ${k.detail ? `<p class="chat-q-sub">${P(k.detail)}</p>` : ""}
        ${m}
        ${g}
      </div>`;
  }).join(""), R = S ? `<div class="chat-card-actions"><button type="button" class="chat-btn is-primary" data-action="q-submit" data-input="${N(s.callId)}">${t ? "已提交" : "提交"}</button></div>` : "";
  return `<div class="chat-card chat-input-card${S ? " is-pending" : ""}${p ? " is-answered" : ""}" data-input="${N(s.callId)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">❓</span>
      <span class="chat-card-title">${p ? "已回答" : t ? "已提交，等待继续" : "需要你选择"}</span>
      ${Je(s.at)}
    </div>
    ${E}
    ${R}
  </div>`;
}
function br(s, i) {
  const t = {
    url: "",
    token: "",
    messages: [],
    cursor: 0,
    hydrated: !1,
    booting: !0,
    busy: !1,
    waiting: !1,
    status: "unset",
    statusText: "未配置",
    sessionTitle: "",
    currentSession: "",
    view: "chat",
    testResult: null,
    sessionsOpen: !1,
    sessionsList: [],
    sessionQuery: "",
    sessionMenuId: "",
    sessionMenuTitle: "",
    renameId: "",
    drawerMode: "list",
    archivedList: [],
    showArchived: !1,
    archiveId: "",
    archiveStop: !1,
    searchQuery: "",
    insets: { top: 0, bottom: 0, ime: 0 },
    draft: "",
    pending: [],
    turnHasMore: !1,
    historyLimitReached: !1,
    stopped: !1,
    awaitingReply: !1,
    runActive: !1,
    notRunningSince: 0,
    oldestSeq: 0,
    loadingOlder: !1,
    stuckPrompt: !1,
    stuckBusy: !1,
    lastProgressAt: Date.now(),
    notify: !0,
    notifyMode: "turn",
    lanUrl: ft,
    wanUrl: "",
    autoPick: !0,
    pick: "lan",
    mode: "auto",
    wanFirst: !1,
    running: !1,
    currentTool: null,
    lastTool: null,
    lastToolAt: 0,
    lastEventAt: 0,
    lastEventAge: 0,
    lastReplyAt: 0,
    waitingSince: 0,
    staleShown: !1,
    reading: !1,
    pendingPaint: !1,
    lastListTop: 0,
    focusLastAssistant: !1,
    holdAnswer: !1,
    lastUserScroll: 0,
    instance: "",
    // P3 流式：assistant 正在输出的临时文本（不进 messages）
    stream: null,
    toolDetailId: "",
    toolActiveId: "",
    options: null,
    formPreset: "",
    formPermission: "",
    formTitle: "",
    meta: { preset: "", permission: "", model: null },
    formProvider: "",
    formModel: "",
    formEffort: "",
    sessionPermission: "",
    projections: {},
    openAcc: ""
  }, S = String(i.manifest && i.manifest.version || ""), p = typeof window < "u" && !!window.__verifyWatchdog && /^(127\.0\.0\.1|localhost)$/.test(location.hostname), v = p ? 120 : 5 * 60 * 1e3, z = 6e3, E = 60 * 1e3, R = p ? 450 : 15 * 60 * 1e3, k = p ? 80 : 1e4, D = 3, H = 5, $ = 30, m = [
    // 8 道错题：4 道带问号，4 道不带
    "6 × 3 = 19?",
    "9 + 6 = 14?",
    "12 − 5 = 6?",
    "8 × 4 = 31?",
    "7 + 5 = 13",
    "9 × 2 = 17",
    "15 − 6 = 8",
    "18 ÷ 3 = 5",
    // 4 道无结果值，只留表达式和问号
    "14 + 9 = ?",
    "7 × 6 = ?",
    "21 − 8 = ?",
    "36 ÷ 4 = ?",
    // 4 道正确带问号
    "1 + 2 = ?",
    "8 ÷ 2 = ?",
    "3 + 8 = ?",
    "10 ÷ 2 = ?",
    // 14 道正确带结果
    "7 − 4 = 3",
    "5 × 5 = 25",
    "4 × 6 = 24",
    "2 + 9 = 11",
    "13 − 7 = 6",
    "6 × 6 = 36",
    "20 ÷ 4 = 5",
    "8 + 7 = 15",
    "9 × 3 = 27",
    "16 − 9 = 7",
    "30 ÷ 5 = 6",
    "11 + 4 = 15",
    "7 × 7 = 49",
    "24 ÷ 6 = 4"
  ], f = 1e3, g = "我这边在手机上处理不了刚才的确认，已经中断当前回合。请改用不需要电脑端弹窗的方式继续；如果必须用电脑操作，请先告诉我需要做什么。", x = 180, A = String(i.manifest && i.manifest.id || "dsh-console"), b = Ko({ base: () => t.url, token: () => t.token }), w = Yo(), d = Zo();
  t.messages = w.messages;
  let c = null, n = {}, F = null, K = 0, Z = !1, U = !1, _ = 0, V = 0, kt = [], gt = null, Ze = 0, me = null, be = null, xe = null, Nt = null, O = { list: [], index: 0, scale: 1, x: 0, y: 0 }, at = null, tt = /* @__PURE__ */ new Map(), mt = null, et = !1, bt = 0, ct = 0, X = "unknown", Ot = null, ta = 0;
  const Ft = /* @__PURE__ */ new Set(), Wt = /* @__PURE__ */ new Map(), Kt = /* @__PURE__ */ new Set();
  function un() {
    let e = "", a = "", o = !0, r = "turn", l = "", u = "", y = !0, M = "lan";
    try {
      const B = i.storage.get(Ye);
      if (B) {
        const h = JSON.parse(B);
        e = h && typeof h.url == "string" ? h.url : "", a = h && typeof h.token == "string" ? h.token : "", h && h.notify !== void 0 && (o = h.notify !== !1), h && h.notifyMode === "message" && (r = "message"), h && typeof h.lanUrl == "string" && (l = h.lanUrl), h && typeof h.wanUrl == "string" && (u = h.wanUrl), h && h.autoPick !== void 0 && (y = h.autoPick !== !1), h && h.pick === "wan" && (M = "wan");
      }
    } catch {
    }
    if (!l && !u && e) {
      const B = vt(e);
      B && B !== ft ? u = B : l = B;
    }
    t.lanUrl = vt(l) || ft, t.wanUrl = u ? vt(u) : "", t.autoPick = y !== !1, t.pick = M, t.mode = t.autoPick ? "auto" : t.pick === "wan" ? "wan" : "lan", t.token = String(a || "").trim(), t.notify = o !== !1, t.notifyMode = r, t.url = t.autoPick ? t.lanUrl : t.pick === "wan" && t.wanUrl ? t.wanUrl : t.lanUrl;
  }
  function Gt() {
    i.storage.set(Ye, JSON.stringify({
      lanUrl: t.lanUrl,
      wanUrl: t.wanUrl,
      autoPick: t.autoPick !== !1,
      pick: t.pick,
      token: t.token,
      notify: t.notify !== !1,
      notifyMode: t.notifyMode === "message" ? "message" : "turn"
    }));
  }
  const ye = "ui.v1";
  function pn() {
    try {
      const e = i.storage.get(ye);
      if (!e) return;
      const a = JSON.parse(e);
      if (!a) return;
      a.title && (t.sessionTitle = String(a.title)), a.meta && (t.meta = a.meta), a.chip && (t.uiChip = String(a.chip)), a.session && (t.currentSession = String(a.session)), a.status && (t.status = String(a.status), t.statusText = String(a.statusText || ""));
    } catch {
    }
  }
  function ve() {
    try {
      i.storage.set(
        ye,
        JSON.stringify({
          title: t.sessionTitle || "",
          meta: t.meta || null,
          session: t.currentSession || "",
          chip: n.modelChip && n.modelChip.textContent || "",
          status: t.status || "",
          statusText: t.statusText || ""
        })
      );
    } catch {
    }
  }
  function ea() {
    try {
      i.storage.remove(Xa);
    } catch {
    }
  }
  async function hn() {
    rt();
    try {
      await d.clearAll();
    } catch {
    }
    try {
      if (typeof caches < "u")
        for (const e of await caches.keys()) await caches.delete(e);
    } catch {
    }
    ea(), w.clear(), t.toolDetailId = "", t.toolActiveId = "", j(!0), L("缓存已清理");
    try {
      await xt();
    } catch {
    }
  }
  async function fn() {
    rt();
    try {
      await d.destroy();
    } catch {
    }
    try {
      if (typeof caches < "u")
        for (const e of await caches.keys()) await caches.delete(e);
    } catch {
    }
    try {
      const e = await navigator.storage.getDirectory();
      for await (const a of e.keys())
        await e.removeEntry(a, { recursive: !0 });
    } catch {
    }
    i.storage.remove(Ye), i.storage.remove(ye), i.storage.remove(Xa), w.clear(), j(!0), L("正在恢复初始化…"), window.setTimeout(() => {
      i.shell && typeof i.shell.exit == "function" ? i.shell.exit() : location.reload();
    }, 400);
  }
  let Vt = [], St = "", Pt = 0;
  function rt() {
    if (Pt && (window.clearTimeout(Pt), Pt = 0), !Vt.length || !St) return;
    const e = St, a = Vt;
    Vt = [], St = "", d.put(e, a).catch(() => {
    });
  }
  function gn(e, a) {
    !e || !a || !a.id || (St && St !== e && rt(), St = e, Vt.push(a), !Pt && (Pt = window.setTimeout(rt, 180)));
  }
  async function we(e) {
    if (t.url)
      try {
        await b.presence(e, !0);
      } catch {
      }
  }
  async function mn(e, a) {
    if (!e) {
      L("这条审批已经失效", "error");
      return;
    }
    t.lastProgressAt = Date.now();
    try {
      await b.approvalDecision(e, a), L(a ? "已允许" : "已拒绝");
    } catch (o) {
      L("提交失败：" + (o && o.message || "网络错误"), "error");
    }
  }
  const Yt = (e, a, o) => b.assetUrl(e, a, o), aa = (e, a, o) => b.fetchWithTimeout(e, a, o);
  async function bn() {
    if (!t.url) {
      Y("unset", "未配置");
      return;
    }
    Y("checking", "连接中…");
    try {
      const e = await b.health();
      Y("ok", e && e.hasKey === !1 ? "连上了，但电脑缺 key" : "已连接");
    } catch {
      Y("bad", "连不上");
    }
  }
  function Y(e, a) {
    t.status = e, t.statusText = a, za(), ve();
  }
  function ke(e) {
    const a = Number(e && e.seq);
    return {
      who: e && e.who === "me" ? "me" : e && e.who === "error" ? "error" : "ai",
      text: String(e && e.text || ""),
      at: Number(e && e.at) || Date.now(),
      id: Number(e && e.id) || void 0,
      seq: Number.isFinite(a) ? a : void 0,
      images: Array.isArray(e && e.images) ? e.images.filter((o) => o && o.id) : [],
      files: Array.isArray(e && e.files) ? e.files.filter((o) => o && o.id) : []
    };
  }
  async function Lt(e) {
    if (!t.url)
      return Y("unset", "未配置"), !1;
    if (t.waiting) return !1;
    try {
      const a = await b.messages({ recent: H }), o = Array.isArray(a.messages) ? a.messages : [];
      return w.replaceMessages(
        o.map(ke).filter((r) => r.text || r.images.length || r.files.length)
      ), t.hydrated = !0, t.booting = !1, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.running = !!(a && a.running), t.lastEventAge = Number(a && a.lastEventAgeMs) || 0, a && a.instance && (t.instance = String(a.instance)), a && a.meta && (t.meta = a.meta, Tt()), t.staleShown = !1, a.current && (t.currentSession = String(a.current)), a.title && pt(a.title), j(!0), !0;
    } catch {
      return t.hydrated = !1, !1;
    }
  }
  function xn(e) {
    const a = ke(e);
    if (!a.id) return !1;
    const o = w.upsertMessage(a);
    return o && a.who !== "me" && (t.lastReplyAt = Date.now(), window.setTimeout(() => {
      U || j();
    }, 2200)), o;
  }
  async function na() {
    if (!(U || Z) && !(!t.url || t.view !== "chat" || document.hidden) && X !== "sse") {
      Z = !0;
      try {
        const e = t.hydrated ? t.cursor : 0, a = await b.messages({ since: e, recent: H }), o = Array.isArray(a.messages) ? a.messages : [];
        t.status !== "ok" && Y("ok", "已连接"), a.current && (t.currentSession = String(a.current)), a.title && pt(a.title), a.meta && (t.meta = a.meta, Tt());
        const r = String(a.instance || ""), l = Number(a.last) || 0;
        if (!!(r && t.instance && r !== t.instance || e > 0 && l > 0 && l < e)) {
          t.instance = r || t.instance, w.clear(), t.hydrated = !1, t.running = !1, t.waiting = !1, t.waitingSince = 0, await Lt(!0);
          return;
        }
        r && (t.instance = r);
        const y = t.running, M = t.staleShown, B = typeof a.running == "boolean";
        B && (t.running = !!a.running, a.running && (t.awaitingReply = !0), !t.running && t.waitingSince && Date.now() - t.waitingSince > 2500 && (t.waiting = !1, t.busy = !1, t.waitingSince = 0));
        const h = t.currentTool, q = h ? String(h.name) + "|" + String(h.detail || "") + "|" + String(!!h.done) : "";
        t.currentTool = a.tool && a.tool.name ? {
          name: String(a.tool.name),
          detail: String(a.tool.detail || ""),
          done: !!a.tool.done
        } : null, t.currentTool && (t.lastTool = { name: t.currentTool.name, detail: t.currentTool.detail, done: !0 }, t.lastToolAt = Date.now());
        const T = t.currentTool ? String(t.currentTool.name) + "|" + String(t.currentTool.detail || "") + "|" + String(t.currentTool.done) : "", C = q !== T;
        t.lastEventAge = Number(a.lastEventAgeMs) || 0;
        const W = t.running && t.lastEventAge > 3e5;
        t.staleShown = W;
        const G = B && (y !== t.running || M !== W);
        if (!t.hydrated) {
          w.replaceMessages(
            o.map(ke).filter((I) => I.text || I.images.length || I.files.length)
          ), t.hydrated = !0, t.booting = !1, !t.waiting && !t.running && (t.busy = !1), j(!0);
          return;
        }
        if (o.length === 0) {
          (G || C) && j();
          return;
        }
        let ht = !1;
        for (const I of o)
          w.cursor = Math.max(w.cursor, Number(I.id) || 0), xn(I) && (ht = !0);
        !B && t.waiting && (t.waiting = !1, t.busy = !1, ht = !0), (ht || G || C) && j();
      } catch (e) {
        const a = String(e && e.message || "");
        if (/401|令牌|unauthor/i.test(a)) {
          Y("bad", "令牌不正确");
          return;
        }
        oe || (t.wanFirst = !0, dt());
      } finally {
        Z = !1;
      }
    }
  }
  function zt() {
    K || (K = window.setInterval(na, 800));
  }
  function Se() {
    K && (window.clearInterval(K), K = 0);
  }
  function yn(e) {
    const a = e && e.session || {}, o = e && Array.isArray(e.events) ? e.events : [];
    w.replaceEvents(o), t.projections = e && e.projections && typeof e.projections == "object" ? e.projections : {}, t.stream = null, t.hydrated = !0, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.running = !!a.running, a.running && (t.awaitingReply = !0, t.runActive = !0), t.lastEventAt = Date.now(), t.currentTool = null, t.lastTool = null, t.lastToolAt = 0, t.running && a.tool && a.tool.name && (t.currentTool = {
      name: String(a.tool.name),
      detail: String(a.tool.detail || ""),
      done: !!a.tool.done
    }), t.running || ra(!0), t.turnHasMore = !!(e && e.hasMore), t.historyLimitReached = !1, t.stopped = !1, t.oldestSeq = Number(e && e.oldestSeq) || o[0] && o[0].seq || 0, t.loadingOlder = !1, t.stuckPrompt = !1, t.lastProgressAt = Date.now(), t.lastEventAge = 0, t.staleShown = !1, e && e.instance && (t.instance = String(e.instance)), a.id && (t.currentSession = String(a.id)), a.title && pt(a.title), (a.model || a.preset || a.permission) && (t.meta = {
      preset: a.preset || "",
      permission: a.permission || "",
      model: a.model || null
    }, Tt()), j(!0), window.setTimeout(() => {
      U || ca();
    }, 80), t.status !== "ok" && Y("ok", "已连接"), t.currentSession && o.length > 0 && (rt(), d.put(t.currentSession, o).catch(() => {
    }));
  }
  function oa() {
    return w.timeline().filter((e) => e.kind === "message" && e.message && e.message.who === "me").length;
  }
  function Te(e) {
    let a = -1;
    for (const o of e)
      if (o.kind === "message" && o.message && o.message.who === "me") {
        const r = Number(o.message.seq);
        Number.isFinite(r) && (a = Math.max(a, r));
      }
    return a;
  }
  function ra(e = !1) {
    const a = e ? -1 : Te(w.timeline());
    let o = !1;
    for (const r of w.cards.values()) {
      if (r.kind !== "tool" || r.status !== "running") continue;
      const l = Number(r.seq);
      !e && Number.isFinite(l) && l <= a || (r.status = "ok", o = !0);
    }
    return o;
  }
  function Qt(e = !1, a = !1) {
    const o = t.running || t.waiting || t.busy || !!t.currentTool || !!t.lastTool;
    t.running = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.currentTool = null, t.lastTool = null, t.lastToolAt = 0, t.stream = null, t.stuckPrompt = !1, a || (t.runActive = !1);
    const r = ra(e);
    return o || r;
  }
  function vn(e) {
    if (!e || typeof e != "object" || !e.type) return;
    if (t.lastEventAt = Date.now(), t.lastProgressAt = Date.now(), t.notRunningSince = 0, t.stuckPrompt && (t.stuckPrompt = !1), e.type === "projection") {
      const r = e.payload && e.payload.values;
      t.projections = r && typeof r == "object" ? r : {}, de();
      return;
    }
    if (e.type === "message.assistant.delta") {
      const r = e.payload || {};
      r.ended ? t.stream = null : t.stream = {
        text: String(r.text || ""),
        reasoning: String(r.reasoning || ""),
        turn: r.turn,
        step: r.step
      }, de();
      return;
    }
    if (e.type === "session.meta") {
      const r = e.payload && e.payload.session || {};
      if (r.running !== void 0 && (t.running = !!r.running, r.running && (t.awaitingReply = !0, t.runActive = !0)), e.payload && e.payload.instance) {
        const l = String(e.payload.instance);
        if (t.instance && l !== t.instance) {
          t.instance = l, xt();
          return;
        }
        t.instance = l;
      }
      r.title && pt(r.title), de();
      return;
    }
    (e.type === "message.assistant" || e.type === "message.error" || e.type === "turn.end") && (t.stream = null);
    let a = w.upsertEvent(e);
    if (e.type === "turn.start" || e.type === "message.user")
      e.type === "turn.start" && (t.running = !0), t.awaitingReply = !0, t.runActive = !0, t.stopped = !1, a = !0;
    else if (e.type === "turn.end")
      Qt(), a = !0;
    else if (e.type === "message.assistant")
      t.lastReplyAt = Date.now(), t.waiting = !1, t.busy = !1;
    else if (e.type === "message.error")
      t.awaitingReply = !1, t.runActive = !1;
    else if (e.type === "input.result")
      t.currentTool && t.currentTool.name === "ask_user_question" && (t.currentTool = null, t.lastTool = null, t.lastToolAt = 0, a = !0);
    else if (e.type === "tool.start") {
      const r = {
        name: String(e.payload && e.payload.name || ""),
        detail: String(e.payload && e.payload.summary || ""),
        done: !1
      };
      t.currentTool = r, t.lastTool = { ...r, done: !0 }, t.lastToolAt = Date.now(), a = !0;
    } else e.type === "tool.end" && (t.currentTool && (t.currentTool = { ...t.currentTool, done: !0 }), a = !0);
    if (!a) return;
    (e.type === "message.assistant" || e.type === "message.error") && (t.focusLastAssistant = !0);
    const o = e.type === "approval.request" || e.type === "approval.result" || e.type === "input.request";
    t.currentSession && e.id && gn(t.currentSession, e), de(o);
  }
  function lt() {
    if (Ot) {
      try {
        Ot.close();
      } catch {
      }
      Ot = null;
    }
    window.clearTimeout(ta), t.stream = null;
  }
  function sa() {
    if (lt(), typeof EventSource != "function" || !t.url) {
      $e();
      return;
    }
    const e = new EventSource(b.eventsUrl(w.lastSeq, t.currentSession));
    Ot = e;
    let a = !1;
    e.onmessage = (o) => {
      if (!U) {
        a = !0;
        try {
          vn(JSON.parse(o.data));
        } catch {
        }
      }
    }, e.onerror = () => {
      if (!U) {
        if (!a) {
          $e();
          return;
        }
        lt(), ta = window.setTimeout(() => {
          !U && X === "sse" && sa();
        }, 1500);
      }
    };
  }
  function $e() {
    if (lt(), X === "legacy") {
      zt();
      return;
    }
    X = "legacy", zt(), Lt();
  }
  async function xt() {
    if (!(U || !t.url) && X !== "legacy")
      try {
        const e = await b.snapshot(t.currentSession || "", { turns: D });
        if (U) return;
        X = "sse", Se(), yn(e), sa();
      } catch {
        $e();
      }
  }
  async function wn() {
    if (U || !t.url || !t.currentSession || t.loadingOlder || !t.turnHasMore || !t.oldestSeq) return;
    const e = $ - oa();
    if (e <= 0) {
      t.turnHasMore = !1, t.historyLimitReached = !0, j();
      return;
    }
    const a = n.list, o = a ? a.scrollTop : 0, r = a ? a.scrollHeight : 0;
    t.loadingOlder = !0, ia();
    try {
      const l = await b.snapshot(t.currentSession, {
        turns: Math.min(H, e),
        before: t.oldestSeq
      }), u = Array.isArray(l && l.events) ? l.events : [];
      for (const M of u) w.upsertEvent(M);
      t.oldestSeq = Number(l && l.oldestSeq) || t.oldestSeq;
      const y = oa() >= $;
      t.turnHasMore = !!(l && l.hasMore) && !y, t.historyLimitReached = y && !!(l && l.hasMore), j(), a && (a.scrollTop = o + Math.max(0, a.scrollHeight - r));
    } catch (l) {
      L("加载更早失败：" + (l && l.message || "网络错误"), "error");
    } finally {
      t.loadingOlder = !1, ia();
    }
  }
  function ia() {
    n.loadSpinner && (n.loadSpinner.hidden = !(t.loadingOlder && t.turnHasMore));
  }
  function ca() {
    !t.turnHasMore || t.loadingOlder || !n.list || n.list.scrollTop > x || wn();
  }
  function kn() {
    const e = w.timeline(), a = Te(e);
    for (const o of e) {
      const r = Number(o.seq);
      if (!(Number.isFinite(r) && r <= a) && (o.kind === "approval" && !o.decision || o.kind === "input" && o.state === "open"))
        return !0;
    }
    return !1;
  }
  function Ae() {
    const e = Te(w.timeline());
    for (const a of w.cards.values()) {
      if (a.kind !== "tool" || a.status !== "running") continue;
      const o = Number(a.seq);
      if (!Number.isFinite(o) || o > e) return !0;
    }
    return !1;
  }
  async function la(e) {
    if (t.stuckBusy) return;
    t.stuckBusy = !0, t.stuckPrompt = !1, j();
    let a = !1;
    try {
      await b.stop(), a = !0;
    } catch (o) {
      t.stuckBusy = !1, t.lastProgressAt = Date.now(), j(), L("中断失败：" + (o && o.message || "网络错误"), "error");
      return;
    }
    if (a) {
      t.stopped = !0, t.awaitingReply = !0;
      try {
        await b.send({ text: g, images: [], files: [] }), L(e ? "长时间无响应，已中断并说明" : "已中断，已让 agent 换方式");
      } catch {
        t.awaitingReply = !1, L("已中断，但说明没发出去");
      }
    }
    t.stuckBusy = !1, t.lastProgressAt = Date.now(), j();
  }
  async function Sn() {
    if (!(U || !t.url || document.hidden) && !(Date.now() - (Number(t.lastProgressAt) || 0) < 2e3))
      try {
        const e = await b.health();
        if (typeof e.running != "boolean") return;
        if (!e.running) {
          if (t.running = !1, t.runActive) {
            t.notRunningSince || (t.notRunningSince = Date.now());
            const a = t.notRunningSince, o = Date.now() - a;
            !t.currentTool && !Ae() && o >= z && (o >= E ? Qt(!0, !1) : (Qt(!0, !0), t.notRunningSince = a)), j();
          }
          return;
        }
        t.notRunningSince = 0, e.tool && e.tool.name && t.currentTool && e.tool.done && t.currentTool.name === String(e.tool.name) && !t.currentTool.done && (t.currentTool = { ...t.currentTool, done: !0 }, j()), t.awaitingReply || (t.awaitingReply = !0, j());
      } catch {
      }
  }
  function Tn() {
    if (U || t.stuckBusy) return;
    if (!t.running) {
      t.stuckPrompt && (t.stuckPrompt = !1, j());
      return;
    }
    if (kn()) {
      t.stuckPrompt && (t.stuckPrompt = !1, j());
      return;
    }
    const e = Date.now() - (Number(t.lastProgressAt) || Date.now()), a = Ae() ? 1 / 0 : R;
    if (e >= a) {
      la(!0);
      return;
    }
    e >= v && !t.stuckPrompt && (t.stuckPrompt = !0, j());
  }
  async function qe(e, a) {
    const o = String(e || "").trim(), r = t.pending || [];
    if (!a && r.some((T) => T.status === "uploading")) {
      L("图片/文件还在上传，稍等一下", "error");
      return;
    }
    if (!a && r.some((T) => T.status === "error")) {
      L("有附件上传失败，先移除再发", "error");
      return;
    }
    if (!o && r.length === 0) return;
    if (!t.url) {
      L("先在 ⚙ 里填电脑地址", "error"), $t();
      return;
    }
    if (t.waiting && !a) return;
    t.lastProgressAt = Date.now(), t.stopped = !1, t.stuckPrompt = !1;
    const l = r.filter((T) => T.kind === "image" && T.ref).map((T) => T.ref), u = r.filter((T) => T.kind === "file" && T.ref).map((T) => T.ref), y = t.messages.reduce((T, C) => {
      const W = C && C.seq;
      return Number.isFinite(Number(W)) ? Math.max(T, Number(W)) : T;
    }, -1), M = {
      who: "me",
      text: o,
      at: Date.now(),
      // 真实 seq 还没回来之前，先排在已有消息之后、下一条回复之前
      seq: y + 0.5,
      local: !0,
      images: r.filter((T) => T.kind === "image").map((T) => ({
        id: "local:" + T.key,
        src: T.preview
      })),
      files: r.filter((T) => T.kind === "file").map((T) => ({
        id: "local:" + T.key,
        name: T.name,
        size: T.size
      }))
    };
    w.messages.push(M), t.draft = "", n.input && (n.input.value = ""), He(), t.waiting = !0, t.waitingSince = Date.now(), t.busy = !0, t.awaitingReply = !0, t.runActive = !0, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, j(!0), X !== "sse" && zt();
    const B = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : "local-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    let h = null;
    for (let T = 0; T < 3; T += 1)
      try {
        await b.send({ text: o, images: l, files: u, clientMessageId: B }), h = null, t.pending = [], st(), X !== "sse" ? window.setTimeout(na, 260) : window.setTimeout(async () => {
          if (!U)
            try {
              const C = await b.health();
              C && C.title && pt(C.title);
            } catch {
            }
        }, 700), Y("ok", "已连接");
        return;
      } catch (C) {
        h = C, T < 2 && await Oo(700 * (T + 1));
      }
    t.waiting = !1, t.busy = !1, t.awaitingReply = !1, t.runActive = !1;
    const q = w.messages.indexOf(M);
    q >= 0 && w.messages.splice(q, 1), w.messages.push({
      who: "error",
      text: "发送失败：" + (h && h.message || "未知错误"),
      at: Date.now(),
      retryText: o
    }), Y("bad", "发送失败"), j(!0);
  }
  function st() {
    const e = t.pending || [];
    n.attach && (n.attach.hidden = e.length === 0, n.attach.innerHTML = e.map((a) => {
      const o = a.kind === "image" && a.preview ? `<img class="chat-chip-thumb" src="${N(a.preview)}" alt="" />` : '<span class="chat-chip-icon">📎</span>', r = a.status === "uploading" ? '<span class="chat-chip-state">上传中</span>' : a.status === "error" ? '<span class="chat-chip-state is-bad">失败</span>' : "";
      return `<div class="chat-chip" data-key="${N(a.key)}"><button type="button" class="chat-chip-x" data-action="remove-attach" data-key="${N(a.key)}" aria-label="移除">×</button>${o}${r}</div>`;
    }).join(""));
  }
  function $n(e) {
    t.pending = (t.pending || []).filter((a) => a.key !== e), st();
  }
  function An(e) {
    return new Promise((a, o) => {
      const r = new FileReader();
      r.onload = () => {
        const l = String(r.result || ""), u = l.indexOf(",");
        a(u >= 0 ? l.slice(u + 1) : l);
      }, r.onerror = () => o(r.error || new Error("读不到文件")), r.readAsDataURL(e);
    });
  }
  async function qn(e) {
    try {
      const a = e.kind === "image" ? { data: e.data, mediaType: e.mediaType, name: e.name } : { data: e.data, name: e.name }, o = e.kind === "image" ? await b.uploadImage(a) : await b.uploadFile(a);
      if (!o || !o.attachment) throw new Error("上传结果不对");
      e.ref = o.attachment, e.status = "ready";
    } catch (a) {
      e.status = "error", e.error = a && a.message || "上传失败";
    }
    st();
  }
  async function Mn(e) {
    const a = Array.from(e || []);
    if (a.length !== 0) {
      if (!t.url) {
        L("先在 ⚙ 里填电脑地址", "error"), $t();
        return;
      }
      for (const o of a) {
        const r = String(o.type || "").startsWith("image/");
        if ((t.pending || []).filter((y) => y.kind === (r ? "image" : "file")).length >= 4) {
          L(r ? "一条消息最多 4 张图" : "一条消息最多 4 个文件", "error");
          continue;
        }
        if (o.size > 30 * 1024 * 1024) {
          L((o.name || "文件") + " 超过 30MB", "error");
          continue;
        }
        const u = {
          key: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          kind: r ? "image" : "file",
          name: o.name || (r ? "图片" : "文件"),
          mediaType: o.type || (r ? "image/jpeg" : "application/octet-stream"),
          size: o.size,
          status: "uploading",
          data: "",
          preview: "",
          ref: null
        };
        t.pending.push(u), st();
        try {
          u.data = await An(o);
        } catch {
          u.status = "error", u.error = "读不到这个文件", st();
          continue;
        }
        r && (u.preview = "data:" + u.mediaType + ";base64," + u.data), st(), qn(u);
      }
    }
  }
  function da(e) {
    const a = e.target;
    if (a === n.relayToggle && a instanceof HTMLInputElement) {
      const r = !!a.checked;
      if (!i.watch || typeof i.watch.start != "function") {
        a.checked = !r, L("当前壳不支持这个开关", "error");
        return;
      }
      t.notify = r, Gt(), jt(), Ta();
      return;
    }
    if (!(a instanceof HTMLInputElement) || a !== n.pick) return;
    const o = a.files ? Array.from(a.files) : [];
    a.value = "", Mn(o);
  }
  async function En() {
    const e = t.url;
    if (t.waiting = !1, t.busy = !1, j(), !!e)
      try {
        await b.stop(), t.stopped = !0, Qt(!0), j(), L("已停止执行");
      } catch (a) {
        L("停止失败：" + (a && a.message || "网络错误"), "error");
      }
  }
  async function Xt() {
    if (!t.url) {
      $t();
      return;
    }
    t.sessionsOpen = !0, t.sessionQuery = "", nt && (window.clearTimeout(nt), nt = 0), Zt("list"), n.sheetBody.innerHTML = '<div class="chat-sheet-tip">正在读取历史对话…</div>', n.scrim.hidden = !1, Ie(!0);
    try {
      const e = await b.sessions(), a = Array.isArray(e.sessions) ? e.sessions : [], o = e.current || t.currentSession || "";
      o && (t.currentSession = String(o)), t.archivedList = Array.isArray(e.archived) ? e.archived : [], t.showArchived = !1, t.sessionsList = a.filter((r) => !r.blank || r.id === o), n.sessionSearch && (n.sessionSearch.value = "", n.sessionSearch.hidden = !0), n.sheetBody.innerHTML = '<div data-role="session-list"></div>', Jt();
    } catch (e) {
      t.sessionsList = [], n.sheetBody.innerHTML = `<div class="chat-sheet-tip">读取失败：${P(e && e.message || "未知错误")}</div>`;
    }
  }
  function Jt() {
    const e = n.sheetBody && n.sheetBody.querySelector('[data-role="session-list"]');
    if (!e) return;
    const a = String(t.sessionQuery || "").trim().toLowerCase(), o = (t.sessionsList || []).filter((h) => a ? String(h.title || "").toLowerCase().includes(a) || String(h.id || "").toLowerCase().includes(a) : !0), r = t.currentSession || "", l = o.slice(0, 80).map((h) => cr(h, r)).join(""), u = `<div class="chat-sheet-tip">${a ? "没有匹配的对话" : "还没有历史对话"}</div>`, y = (t.archivedList || []).filter((h) => a ? String(h.title || "").toLowerCase().includes(a) || String(h.id || "").toLowerCase().includes(a) : !0), M = `<button type="button" class="chat-archived-toggle" data-action="toggle-archived">${t.showArchived ? "收起已归档" : "已归档 " + y.length}</button>`;
    let B = "";
    t.showArchived && (B = y.length ? y.slice(0, 80).map(
      (h) => `<div class="chat-session-row is-archived"><button type="button" class="chat-session" data-action="restore-session" data-session="${N(h.id || "")}">
                <span class="chat-session-label">${P(h.title || "未命名对话")}</span>
                <span class="chat-session-time">已归档 · 点按恢复</span>
              </button></div>`
    ).join("") : '<div class="chat-sheet-tip">没有已归档的对话</div>'), e.innerHTML = (o.length ? l : u) + M + B;
  }
  function In(e) {
    return e ? e.eventId ? String(e.eventId) : e.id ? "id" + e.id : Number.isFinite(Number(e.seq)) ? "s" + e.seq : "" : "";
  }
  function Nn() {
    t.searchQuery = "", n.searchScrim && (n.searchScrim.hidden = !1), n.searchInput && (n.searchInput.value = "", n.searchInput.focus()), ua();
  }
  function Me() {
    n.searchScrim && (n.searchScrim.hidden = !0);
  }
  function ua() {
    if (!n.searchBody) return;
    const e = String(t.searchQuery || "").trim().toLowerCase();
    if (!e) {
      n.searchBody.innerHTML = '<div class="chat-sheet-tip">输入关键词搜索当前对话</div>';
      return;
    }
    const a = [];
    for (const o of t.messages) {
      const r = String(o.text || "");
      if (!r) continue;
      const l = r.toLowerCase().indexOf(e);
      if (l < 0) continue;
      const u = Math.max(0, l - 16), y = l + e.length + 26, M = (u > 0 ? "…" : "") + r.slice(u, y).replace(/\s+/g, " ") + (y < r.length ? "…" : "");
      if (a.push({ key: In(o), who: o.who, snippet: M, at: o.at }), a.length >= 80) break;
    }
    if (a.length === 0) {
      n.searchBody.innerHTML = '<div class="chat-sheet-tip">没有找到包含该关键词的消息</div>';
      return;
    }
    n.searchBody.innerHTML = a.map(
      (o) => `<button type="button" class="chat-search-hit" data-action="search-jump" data-key="${N(o.key)}">
          <span class="chat-search-hit-head">${o.who === "me" ? "我" : o.who === "error" ? "错误" : "助手"} · ${It(o.at)}</span>
          <span class="chat-search-hit-text">${P(o.snippet)}</span>
        </button>`
    ).join("");
  }
  function Pn(e) {
    if (Me(), !e || !n.list) return;
    const a = n.list.querySelector('[data-mid="' + e.replace(/["\\]/g, "\\$&") + '"]');
    if (!a) {
      L("这条消息不在当前窗口里", "error");
      return;
    }
    a.scrollIntoView({ block: "center", behavior: "smooth" });
  }
  function Ln(e, a) {
    t.sessionMenuId = String(e || ""), t.sessionMenuTitle = String(a || ""), n.sessionMenu && (n.sessionMenu.hidden = !1);
  }
  function Ct() {
    n.sessionMenu && (n.sessionMenu.hidden = !0);
  }
  function zn() {
    t.renameId = t.sessionMenuId, Ct(), n.renameInput && (n.renameInput.value = t.sessionMenuTitle || "", n.renameInput.focus()), n.renameScrim && (n.renameScrim.hidden = !1);
  }
  function Ee() {
    n.renameScrim && (n.renameScrim.hidden = !0);
  }
  async function Cn() {
    const e = t.renameId, a = String(n.renameInput && n.renameInput.value || "").trim();
    if (!e || !a) {
      L("标题不能为空", "error");
      return;
    }
    try {
      const o = await b.renameSession(e, a);
      e === t.currentSession && o && o.title && pt(o.title), Ee(), L("已重命名"), t.sessionsOpen && await Xt();
    } catch (o) {
      L("重命名失败：" + (o && o.message || "未知错误"), "error");
    }
  }
  async function Bn() {
    const e = t.sessionMenuId;
    if (Ct(), !!e) {
      L("正在分支…");
      try {
        const a = await b.forkSession(e);
        a && a.sessionId ? await pa(a.sessionId) : L("分支失败", "error");
      } catch (a) {
        L("分支失败：" + (a && a.message || "未知错误"), "error");
      }
    }
  }
  let nt = 0;
  function Ie(e) {
    if (c) {
      if (e) {
        const a = n.top ? n.top.getBoundingClientRect().height : 0;
        c.style.setProperty("--drawer-top", Math.round(a) + "px");
      }
      c.classList.toggle("is-drawer-open", !!e), n.switchBtn && (n.switchBtn.textContent = e ? "✕" : "☰", n.switchBtn.setAttribute("aria-label", e ? "关闭会话菜单" : "打开会话菜单"));
    }
  }
  function Zt(e) {
    t.drawerMode = e === "create" ? "create" : "list", n.drawerList && (n.drawerList.hidden = t.drawerMode !== "list"), n.drawerCreate && (n.drawerCreate.hidden = t.drawerMode !== "create");
  }
  function Rn(e, a) {
    t.archiveId = String(e || ""), t.archiveStop = !1, Ct(), n.archiveText && (n.archiveText.textContent = `「${a || "这个会话"}」将从列表移除，可在「已归档」里恢复。`), n.archiveScrim && (n.archiveScrim.hidden = !1);
  }
  function te() {
    n.archiveScrim && (n.archiveScrim.hidden = !0), t.archiveId = "", t.archiveStop = !1;
  }
  async function jn() {
    const e = t.archiveId;
    if (e)
      try {
        await b.archiveSession(e, t.archiveStop), te(), L("已归档"), t.sessionsOpen && await Xt();
      } catch (a) {
        if (a && a.code === "workspace/session-active" && !t.archiveStop) {
          t.archiveStop = !0, n.archiveText && (n.archiveText.textContent = "这个会话还在执行，停止并归档？");
          return;
        }
        L("归档失败：" + (a && a.message || "未知错误"), "error");
      }
  }
  async function Dn(e) {
    if (e)
      try {
        await b.unarchiveSession(e), L("已恢复"), t.sessionsOpen && await Xt();
      } catch (a) {
        L("恢复失败：" + (a && a.message || "未知错误"), "error");
      }
  }
  function yt() {
    t.sessionsOpen = !1, Ie(!1), nt && window.clearTimeout(nt), nt = window.setTimeout(() => {
      nt = 0, !t.sessionsOpen && n.scrim && (n.scrim.hidden = !0);
    }, 260);
  }
  async function pa(e) {
    if (yt(), !!e) {
      L("正在打开对话…");
      try {
        const a = await b.target(e);
        rt(), lt(), w.clear(), t.booting = !0, t.historyLimitReached = !1, t.stopped = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, t.lastListTop = 0, t.projections = {}, t.hydrated = !1, t.waiting = !1, t.busy = !1, t.pending = [], t.running = !1, t.lastEventAge = 0, t.waitingSince = 0, t.staleShown = !1, st(), a && a.current && (t.currentSession = String(a.current)), t.currentSession && d.clearOthers(t.currentSession).catch(() => {
        }), pt(a && a.title || ""), t.view = "chat", n.page && (n.page.hidden = !0), j(!0), X === "sse" ? xt() : await Lt(!0), L("已切换对话");
      } catch (a) {
        L("切换失败：" + (a && a.message || "未知错误"), "error");
      }
    }
  }
  function Un() {
    const e = t.options && Array.isArray(t.options.presets) ? t.options.presets : [];
    return e.length ? e.map((a) => {
      const o = String(a.id), r = _t[o];
      return {
        value: o,
        // 去掉「模式」后缀，只留「标准 / 创造 / 极简 / 编排」
        name: String(r && r.name || a.name || o).replace(/模式$/, ""),
        description: r && r.description || a.description || ""
      };
    }) : [
      { value: "standard", name: "标准", description: _t.standard.description },
      { value: "ptc", name: "创造", description: _t.ptc.description },
      { value: "minimal", name: "极简", description: _t.minimal.description },
      { value: "cordis", name: "编排", description: _t.cordis.description }
    ];
  }
  function Ne() {
    const e = t.options && Array.isArray(t.options.presets) ? t.options.presets : [];
    if (e.some((o) => o && String(o.id) === "standard")) return "standard";
    const a = e.find((o) => o && o.isDefault);
    return a && a.id ? String(a.id) : "standard";
  }
  function Pe() {
    const e = t.options, a = e && Array.isArray(e.permissions) ? e.permissions : [], o = (l) => a.some((u) => u && String(u.value) === l);
    if (o("workspace-write")) return "workspace-write";
    if (o("read-only")) return "read-only";
    const r = e && e.defaultPermission ? String(e.defaultPermission) : "";
    return r && r !== "danger-full-access" ? r : "workspace-write";
  }
  async function ha(e) {
    if (t.options) return t.options;
    try {
      const a = await b.options();
      t.options = {
        presets: Array.isArray(a.presets) ? a.presets : [],
        permissions: Array.isArray(a.permissions) ? a.permissions : [],
        defaultPermission: String(a.defaultPermission || ""),
        models: a.models || { groups: [], default: null }
      };
    } catch {
      t.options = { presets: [], permissions: [], defaultPermission: "", models: { groups: [], default: null }, failed: !0 };
    }
    return t.options;
  }
  function fa(e, a, o, r) {
    return e.map((l) => `<button type="button" class="chat-opt" data-action="${r}" data-scope="${o}" data-value="${N(l.value)}" data-on="${l.value === a ? "1" : "0"}">${P(l.name)}</button>`).join("");
  }
  function ga(e) {
    const a = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [];
    if (a.length === 0) return "";
    const o = t.formModel || "", r = t.formEffort || "", l = a.map((q) => {
      const T = (q.models || []).map((C) => `<button type="button" class="chat-opt" data-action="pick-model" data-scope="${e}" data-provider="${N(q.id)}" data-value="${N(C.id)}" data-on="${C.id === o ? "1" : "0"}">${P(C.name || C.id)}</button>`).join("");
      return e === "new" ? `<div class="chat-chipgroup">${T}</div>` : `<div class="chat-form-block"><p class="chat-sheet-sub">${P(q.name || q.id)}</p><div class="chat-chipgroup">${T}</div></div>`;
    }).join(""), u = e === "new" ? `<div class="chat-form-block"><p class="chat-sheet-sub">模型</p>${l}</div>` : l, y = Rt(t.formProvider, o), M = y && y.model && y.model.reasoning && Array.isArray(y.model.reasoning.efforts) ? y.model.reasoning.efforts : [], B = M.length ? `<div class="chat-form-block"><p class="chat-sheet-sub">推理等级</p><div class="chat-chipgroup">${M.map((q) => `<button type="button" class="chat-opt" data-action="pick-effort" data-scope="${e}" data-value="${N(q.id)}" data-on="${q.id === r ? "1" : "0"}">${P(q.name || q.id)}</button>`).join("")}</div></div>` : "";
    let h = "";
    if (e === "model") {
      const q = (t.options && Array.isArray(t.options.permissions) ? t.options.permissions : []).map((T) => ({
        value: String(T.value),
        name: Za[String(T.value)] || T.name || String(T.value)
      }));
      if (q.length > 0) {
        const T = t.sessionPermission || t.meta && t.meta.permission || "";
        h = `<div class="chat-form-block"><p class="chat-sheet-sub">权限</p><div class="chat-chipgroup">${q.map((C) => `<button type="button" class="chat-opt" data-action="pick-permission-current" data-value="${N(C.value)}" data-on="${C.value === T ? "1" : "0"}">${P(C.name)}</button>`).join("")}</div><p class="chat-opt-desc">切换后从下一次操作开始生效；完全权限不再询问。</p></div>`;
      }
    }
    return u + B + h;
  }
  function ma() {
    const e = t.options && t.options.models ? t.options.models.default : null, a = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [], o = a[0] && Array.isArray(a[0].models) ? a[0].models[0] : null, r = e && e.provider ? String(e.provider) : a[0] ? String(a[0].id) : "", l = e && e.model ? String(e.model) : o ? String(o.id) : "", u = Rt(r, l), y = e && e.reasoningEffort ? String(e.reasoningEffort) : u && u.model && u.model.reasoning ? String(u.model.reasoning.defaultEffort || "") : "";
    t.formProvider = r, t.formModel = l, t.formEffort = y;
  }
  function Bt() {
    if (!n.newBody) return;
    const e = Un(), a = e.find((y) => y.value === t.formPreset) || e.find((y) => y.value === Ne()), o = (t.options && Array.isArray(t.options.permissions) ? t.options.permissions : []).map((y) => ({
      value: String(y.value),
      name: Za[String(y.value)] || y.name || String(y.value),
      description: _o[String(y.value)] || y.description || ""
    })), r = t.formPermission || Pe(), l = o.find((y) => y.value === r), u = l && l.description ? l.description : r === "danger-full-access" ? "完全权限：不再询问，直接执行。" : "非完全权限时，需要授权的操作会先弹到手机确认。";
    n.newBody.innerHTML = `
      <div class="chat-form-block">
        <p class="chat-sheet-sub">标题</p>
        <input class="chat-sheet-search" data-role="new-title" value="${N(t.formTitle || "")}" placeholder="可不填，自动取第一句" autocomplete="off" spellcheck="false" />
      </div>
      <div class="chat-form-block">
        <p class="chat-sheet-sub">模式</p>
        <div class="chat-chipgroup">${fa(e, a ? a.value : t.formPreset, "new", "pick-preset")}</div>
        <p class="chat-opt-desc">${P(a && a.description || "")}</p>
      </div>
      ${o.length > 0 ? `
      <div class="chat-form-block">
        <p class="chat-sheet-sub">权限</p>
        <div class="chat-chipgroup">${fa(o, r, "new", "pick-permission")}</div>
        <p class="chat-opt-desc">${P(u)}</p>
      </div>` : ""}
      ${ga("new")}
      <button type="button" class="chat-btn is-primary is-block" data-action="create-session">开始对话</button>
    `;
  }
  function Rt(e, a) {
    const o = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [];
    for (const r of o)
      if (!(e && r.id !== e)) {
        for (const l of r.models || [])
          if (l.id === a) return { provider: r.id, name: r.name || r.id, model: l };
      }
    return null;
  }
  function Hn(e, a) {
    const o = Rt(e, a);
    return o && o.model && o.model.name ? String(o.model.name) : String(a || "");
  }
  function _n(e, a, o) {
    const r = Rt(e, a), u = (r && r.model && r.model.reasoning && Array.isArray(r.model.reasoning.efforts) ? r.model.reasoning.efforts : []).find((y) => y && y.id === o);
    return u && u.name ? String(u.name) : String(o || "");
  }
  function Tt() {
    if (!n.modelChip) return;
    const e = t.meta && t.meta.model;
    if (!e || !e.model) {
      n.modelChip.hidden = !0, n.modelChip.textContent = "";
      return;
    }
    const a = [Hn(e.provider, e.model)];
    e.reasoningEffort && a.push(_n(e.provider, e.model, e.reasoningEffort)), n.modelChip.hidden = !1, n.modelChip.textContent = a.join(" · "), ve();
  }
  function ee() {
    if (!n.modelBody) return;
    if ((t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : []).length === 0) {
      n.modelBody.innerHTML = '<div class="chat-sheet-tip">读不到模型列表</div>';
      return;
    }
    n.modelBody.innerHTML = ga("model");
  }
  async function On() {
    if (!t.url) return;
    const e = t.meta && t.meta.model ? t.meta.model : null;
    t.formProvider = e ? e.provider : "", t.formModel = e ? e.model : "", t.formEffort = e ? e.reasoningEffort : "", t.sessionPermission = t.meta && t.meta.permission || t.options && t.options.defaultPermission || "", n.modelScrim && (n.modelScrim.hidden = !1), t.options ? ee() : (n.modelBody && (n.modelBody.innerHTML = '<div class="chat-sheet-tip">正在读取模型…</div>'), ha().then(() => ee()));
  }
  function ae() {
    n.modelScrim && (n.modelScrim.hidden = !0);
  }
  function Fn(e, a, o, r) {
    if (e === "model") {
      t.formProvider = o || t.formProvider, t.formModel = a;
      const l = Rt(t.formProvider, a), u = l && l.model && l.model.reasoning && Array.isArray(l.model.reasoning.efforts) ? l.model.reasoning.efforts : [], y = l && l.model && l.model.reasoning && l.model.reasoning.defaultEffort || "";
      t.formEffort = u.some((M) => M.id === t.formEffort) ? t.formEffort : y || (u[0] ? u[0].id : "");
    } else
      t.formEffort = a;
    r === "new" ? Bt() : ee();
  }
  async function Wn() {
    if (!t.url || !t.formProvider || !t.formModel) return;
    const e = { provider: t.formProvider, model: t.formModel };
    t.formEffort && (e.reasoningEffort = t.formEffort);
    try {
      const a = String(t.sessionPermission || "");
      if (a && (!t.meta || a !== t.meta.permission)) {
        const r = await b.setPermission(a);
        r && r.meta && (t.meta = r.meta);
      }
      const o = await b.selectModel(e);
      o && o.meta && (t.meta = o.meta), Tt(), ae(), L("已应用");
    } catch (a) {
      L("应用失败：" + (a && a.message || "未知错误"), "error");
    }
  }
  function Kn() {
    if (!t.url) {
      $t();
      return;
    }
    t.sessionsOpen = !0, nt && (window.clearTimeout(nt), nt = 0), n.scrim && (n.scrim.hidden = !1), Ie(!0), Zt("create"), t.formPreset = Ne(), t.formPermission = Pe(), t.options ? (ma(), Bt()) : (n.newBody && (n.newBody.innerHTML = '<div class="chat-sheet-tip">正在读取可选项…</div>'), ha().then(() => {
      ma(), Bt();
    }));
  }
  function Le() {
    Zt("list");
  }
  function Gn(e, a, o) {
    a === "new" && (t.formPreset = o, Bt());
  }
  function Vn() {
    n.confirmScrim && (n.confirmScrim.hidden = !1);
  }
  function ne() {
    n.confirmScrim && (n.confirmScrim.hidden = !0);
  }
  function Yn() {
    (async () => {
      try {
        await we(!1);
      } catch {
      }
      try {
        i.watch && typeof i.watch.stop == "function" && i.watch.stop(A);
      } catch {
      }
      try {
        i.shell && typeof i.shell.exit == "function" && i.shell.exit();
      } catch {
      }
    })();
  }
  async function Qn() {
    if (!t.url) {
      $t();
      return;
    }
    const e = t.formPreset || Ne(), a = t.formPermission || Pe(), o = String(t.formTitle || "").trim();
    L("正在新建对话…");
    try {
      const r = await b.createSession({
        preset: e,
        permission: a,
        ...o ? { title: o } : {}
      }), l = r && r.current ? String(r.current) : "";
      if (l && t.formProvider && t.formModel)
        try {
          const u = await b.selectModel({
            sessionId: l,
            provider: t.formProvider,
            model: t.formModel,
            ...t.formEffort ? { reasoningEffort: t.formEffort } : {}
          });
          u && u.meta && (t.meta = u.meta);
        } catch {
        }
      rt(), lt(), w.clear(), t.booting = !0, t.historyLimitReached = !1, t.stopped = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, t.lastListTop = 0, t.projections = {}, t.hydrated = !1, t.waiting = !1, t.busy = !1, t.pending = [], t.running = !1, t.lastEventAge = 0, t.waitingSince = 0, t.staleShown = !1, st(), r && r.current && (t.currentSession = String(r.current)), t.currentSession && d.clearOthers(t.currentSession).catch(() => {
      }), r && r.meta && (t.meta = r.meta, Tt()), pt(r && r.title || "新对话"), t.view = "chat", n.page && (n.page.hidden = !0), j(!0), X === "sse" && xt(), n.input && n.input.focus(), yt(), t.formTitle = "", L(r && r.created === !1 ? "已经是新对话" : "新对话已就绪");
    } catch (r) {
      L("新建失败：" + (r && r.message || "未知错误"), "error");
    }
  }
  function ba() {
    const e = c && c.querySelector('[data-role="mode-group"]');
    if (e)
      for (const a of e.querySelectorAll('[data-action="pick-mode"]'))
        a.dataset.on = a.dataset.value === t.mode ? "1" : "0";
  }
  function xa() {
    if (!n.notifyMode) return;
    const e = t.notifyMode === "message" ? "message" : "turn";
    for (const a of n.notifyMode.querySelectorAll('[data-action="pick-notify-mode"]'))
      a.dataset.on = a.dataset.value === e ? "1" : "0";
  }
  function $t() {
    yt(), t.view = "settings", t.testResult = null, t.openAcc = "", _e(), n.page.hidden = !1, n.inputUrl.value = t.lanUrl || ft, n.inputWan && (n.inputWan.value = t.wanUrl || ""), ba(), n.inputToken.value = t.token || "", n.lanState && (n.lanState.textContent = "", n.lanState.dataset.tone = ""), n.wanState && (n.wanState.textContent = "", n.wanState.dataset.tone = ""), n.version.textContent = S ? "v" + S + " · 由 DSH 插件托管" : "由 DSH 插件托管", xa(), $a(""), re(), Ta();
  }
  function ya() {
    t.view = "chat", n.page.hidden = !0, j();
  }
  async function Xn() {
    const e = vt(n.inputUrl.value), a = n.inputWan ? vt(n.inputWan.value) : "", o = n.inputToken.value.trim(), r = o ? { Authorization: "Bearer " + o } : {}, l = (h, q, T) => {
      h && (h.textContent = q, h.dataset.tone = T || "");
    };
    l(n.lanState, e ? "· 网络测试中" : "· 未填", e ? "busy" : ""), l(n.wanState, a ? "· 网络测试中" : "· 未填", a ? "busy" : "");
    const u = c && c.querySelector('[data-action="test"]');
    u && (u.dataset.busy = "1");
    const y = async (h, q) => {
      if (!h) return { text: "未填", tone: "" };
      const T = Date.now();
      try {
        const C = await aa(h + "/health", { headers: r }, q);
        if (!C.ok) throw new Error("HTTP " + C.status);
        const W = await C.json().catch(() => ({})), G = Date.now() - T;
        return {
          text: (W && W.hasKey === !1 ? "可连接（未配 Key）" : "可连接") + " · " + G + "ms",
          tone: "ok"
        };
      } catch {
        return { text: "连不上", tone: "bad" };
      }
    }, [M, B] = await Promise.all([y(e, 4e3), y(a, 6e3)]);
    l(n.lanState, "· " + M.text, M.tone), l(n.wanState, "· " + B.text, B.tone), u && delete u.dataset.busy;
  }
  function Jn() {
    return tr({
      appId: A,
      base: t.url || ft,
      token: t.token || "",
      notify: t.notify !== !1,
      mode: t.notifyMode === "message" ? "message" : "turn"
    });
  }
  function jt() {
    if (!(!i.watch || typeof i.watch.start != "function")) {
      if (t.notify === !1) {
        i.watch.stop(A).catch(() => {
        });
        return;
      }
      i.watch.start(Jn()).catch(() => {
      });
    }
  }
  let oe = !1, ze = 0, Ce = 0, va = 0, wa = 0, ka = 0, Sa = 0;
  async function Zn(e, a) {
    if (!e) return !1;
    try {
      return (await aa(e + "/health", {}, a || 1200)).ok;
    } catch {
      return !1;
    }
  }
  async function dt(e) {
    if (oe) return !1;
    oe = !0;
    const a = ++ze;
    window.clearTimeout(Ce);
    try {
      const o = t.mode || (t.autoPick ? "auto" : t.pick === "wan" ? "wan" : "lan"), l = (o === "auto" ? t.wanFirst ? [t.wanUrl, t.lanUrl] : [t.lanUrl, t.wanUrl] : [o === "wan" ? t.wanUrl : t.lanUrl]).filter(Boolean);
      if (l.length === 0)
        return Y("bad", o === "wan" ? "外部地址未填" : "家里地址未填"), !1;
      const u = t.status === "ok";
      let y = 0;
      u || (y = window.setTimeout(() => {
        t.status !== "ok" && Y("busy", "网络连接中…");
      }, 1e3));
      const M = (G) => G === t.lanUrl ? 1600 : 5e3, B = await Promise.all(l.map((G) => Zn(G, M(G))));
      if (window.clearTimeout(y), a !== ze) return !1;
      const h = B.findIndex(Boolean), q = h >= 0 ? l[h] : "";
      if (!q) {
        const G = l.length > 1 ? "家里和外部都连不上" : o === "wan" ? "外部连不上" : "家里连不上";
        return Y("bad", G), t.wanFirst = !0, Ce = window.setTimeout(() => {
          U || dt();
        }, 2e3), !1;
      }
      const T = t.url;
      t.wanFirst = !1;
      const C = q !== t.url;
      t.url = q;
      const W = q === t.lanUrl ? "家里" : "外部";
      return Y("ok", "已连接 · " + W), C && T && L("已切换到" + W), (C || e) && (t.hydrated = !1, w.cursor = 0, Gt(), jt(), lt(), X === "sse" ? xt() : Lt(!0)), re(), !0;
    } finally {
      a === ze && (oe = !1);
    }
  }
  async function Ta() {
    if (!n.relay) return;
    const e = t.notify !== !1;
    if (n.relayToggle && (n.relayToggle.checked = e), n.relaySum && (n.relaySum.textContent = e ? "已开启 · 横幅" : "已关闭"), !e) {
      n.relay.textContent = "后台提醒：已关闭", n.relay.dataset.tone = "bad";
      return;
    }
    if (!i.watch || typeof i.watch.status != "function") {
      n.relay.textContent = "后台提醒：当前壳不支持", n.relay.dataset.tone = "bad";
      return;
    }
    try {
      const a = await i.watch.status(A);
      if (!a) {
        n.relay.textContent = "后台提醒：当前壳不支持", n.relay.dataset.tone = "bad";
        return;
      }
      const o = [a.running ? "运行中" : "未运行"];
      a.granted === !1 && o.push("通知权限未开"), n.relay.textContent = "后台提醒：" + o.join(" · "), n.relay.dataset.tone = a.running ? "ok" : "bad";
    } catch {
      n.relay.textContent = "后台提醒：读取失败", n.relay.dataset.tone = "bad";
    }
  }
  function $a(e) {
    const a = t.openAcc === e ? "" : e;
    if (t.openAcc = a, n.serverBody && (n.serverBody.hidden = a !== "server"), n.relayBody && (n.relayBody.hidden = a !== "relay"), n.cacheBody && (n.cacheBody.hidden = a !== "cache"), n.resetBody && (n.resetBody.hidden = a !== "reset"), c)
      for (const o of c.querySelectorAll(".chat-acc"))
        o.dataset.open = o.dataset.acc === a ? "1" : "0";
  }
  function re() {
    if (!n.serverSum) return;
    const e = t.url || ft, a = t.mode || "auto", o = a === "wan" ? "手动外部" : a === "lan" ? "手动家里" : e === t.lanUrl ? "自动·家里" : "自动·外部";
    n.serverSum.textContent = e + " · " + o;
  }
  async function to() {
    if (!i.watch || typeof i.watch.test != "function") {
      L("当前壳不支持测试提醒", "error");
      return;
    }
    try {
      if (typeof i.watch.ensurePermission == "function" && !await i.watch.ensurePermission()) {
        L("通知权限没开：去系统设置里允许「像素盒子」发通知后再试", "error");
        return;
      }
      await i.watch.test(), L("已发送测试提醒");
    } catch (e) {
      L("发送失败：" + (e && e.message || "未知错误"), "error");
    }
  }
  function eo() {
    if (!n.inputToken.value.trim()) {
      L("访问令牌不能为空，电脑端「设置 → 手机中转」里可以看到", "error");
      return;
    }
    t.lanUrl = vt(n.inputUrl.value) || ft, t.wanUrl = n.inputWan ? vt(n.inputWan.value) : "", t.autoPick = t.mode === "auto", t.pick = t.mode === "wan" ? "wan" : "lan", t.url = t.mode === "wan" && t.wanUrl || t.lanUrl, t.token = n.inputToken.value.trim(), Gt(), jt(), t.hydrated = !1, w.cursor = 0, t.openAcc = "", n.serverBody && (n.serverBody.hidden = !0);
    const e = c && c.querySelector('[data-acc="server"]');
    e && (e.dataset.open = "0"), re(), L("已保存"), dt(!0);
  }
  async function Aa(e) {
    try {
      if (i.clipboard && typeof i.clipboard.write == "function")
        return await i.clipboard.write(e), !0;
    } catch {
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText)
        return await navigator.clipboard.writeText(e), !0;
    } catch {
    }
    return !1;
  }
  function ao(e) {
    if (e) {
      if (i.openExternal && typeof i.openExternal == "function") {
        i.openExternal(e).catch(() => L("打不开链接", "error"));
        return;
      }
      window.open(e, "_blank", "noopener,noreferrer");
    }
  }
  async function no(e, a) {
    try {
      if (i.download && typeof i.download == "function")
        await i.download(e, a);
      else {
        const o = document.createElement("a");
        o.href = e, o.download = a || "", o.rel = "noopener", document.body.appendChild(o), o.click(), o.remove();
      }
      L("已开始下载" + (a ? "：" + a : ""));
    } catch (o) {
      L("下载失败：" + (o && o.message || "未知错误"), "error");
    }
  }
  function qa(e) {
    return e ? String(e.currentSrc || e.src || e.getAttribute("data-src") || e.getAttribute("data-remote") || "") : "";
  }
  function At() {
    const e = O, a = e.list[e.index] || "";
    a && (n.viewerImg.src = a), n.viewerImg.style.transform = "translate(" + e.x + "px," + e.y + "px) scale(" + e.scale + ")", n.viewer.classList.toggle("is-zoomed", e.scale > 1);
    const o = e.list.length > 1;
    n.viewerCount && (n.viewerCount.hidden = !o, n.viewerCount.textContent = e.index + 1 + " / " + e.list.length), n.viewerPrev && (n.viewerPrev.hidden = !o), n.viewerNext && (n.viewerNext.hidden = !o);
  }
  function oo(e, a) {
    if (!e) return;
    const o = a && a.closest(".chat-turn") || a && a.closest(".chat-tool") || a && a.closest(".chat-card") || n.list, r = o ? Array.from(o.querySelectorAll("img.chat-image")) : [], l = [];
    for (const y of r) {
      const M = qa(y);
      M && !l.includes(M) && l.push(M);
    }
    l.length === 0 && l.push(e);
    const u = Math.max(0, l.indexOf(e));
    O = { list: l, index: u >= 0 ? u : 0, scale: 1, x: 0, y: 0 }, et = !1, n.viewer.hidden = !1, At();
  }
  function se() {
    n.viewer.hidden = !0, n.viewerImg.removeAttribute("src"), n.viewerImg.style.transform = "", O = { list: [], index: 0, scale: 1, x: 0, y: 0 }, et = !1, tt.clear(), mt = null, bt = 0, window.clearTimeout(ct), ct = 0, n.viewer && n.viewer.classList.remove("is-zoomed");
  }
  function Be(e) {
    const a = O.list.length;
    a < 2 || (O.index = (O.index + e + a) % a, O.scale = 1, O.x = 0, O.y = 0, At());
  }
  function ro() {
    O.scale > 1 ? (O.scale = 1, O.x = 0, O.y = 0) : O.scale = 2, At();
  }
  function so(e) {
    if (!(!n.viewer || n.viewer.hidden) && !(e.target instanceof Element && e.target.closest("[data-action]"))) {
      if (tt.set(e.pointerId, { x: e.clientX, y: e.clientY }), tt.size === 2) {
        const [a, o] = [...tt.values()];
        mt = {
          distance: Math.hypot(a.x - o.x, a.y - o.y) || 1,
          scale: O.scale
        };
        return;
      }
      at = {
        x: e.clientX,
        y: e.clientY,
        at: Date.now(),
        moved: !1,
        panX: O.x,
        panY: O.y
      }, et = !1;
    }
  }
  function io(e) {
    if (!tt.has(e.pointerId)) return;
    if (tt.set(e.pointerId, { x: e.clientX, y: e.clientY }), mt && tt.size === 2) {
      const [r, l] = [...tt.values()], u = Math.hypot(r.x - l.x, r.y - l.y) || 1;
      O.scale = Math.min(4, Math.max(1, mt.scale * u / mt.distance)), At(), et = !0;
      return;
    }
    if (!at) return;
    const a = e.clientX - at.x, o = e.clientY - at.y;
    Math.abs(a) + Math.abs(o) > 4 && (at.moved = !0), O.scale > 1 && (O.x = at.panX + a, O.y = at.panY + o, At(), et = !0);
  }
  function Ma(e) {
    if (tt.has(e.pointerId) && tt.delete(e.pointerId), mt && tt.size < 2) {
      mt = null, O.scale < 1.05 && (O.scale = 1, O.x = 0, O.y = 0), At(), et = !0, at = null;
      return;
    }
    const a = at;
    if (at = null, !a) return;
    const o = e.clientX - a.x, r = e.clientY - a.y;
    if (a.moved) {
      if (O.scale <= 1 && Math.abs(o) > 48 && Math.abs(o) > Math.abs(r)) {
        Be(o < 0 ? 1 : -1), et = !0, bt = 0;
        return;
      }
      if (O.scale <= 1 && r > 80 && Math.abs(r) > Math.abs(o)) {
        se(), et = !0, bt = 0;
        return;
      }
      bt = 0;
      return;
    }
    const l = Date.now();
    if (l - bt < 300) {
      bt = 0, window.clearTimeout(ct), ct = 0, ro(), et = !0;
      return;
    }
    bt = l, window.clearTimeout(ct), ct = window.setTimeout(() => {
      ct = 0, se();
    }, 300);
  }
  function L(e, a) {
    n.toast && (n.toast.textContent = e, n.toast.style.background = a === "error" ? "rgba(150, 62, 50, 0.92)" : "rgba(30, 40, 48, 0.88)", n.toast.classList.add("is-on"), window.clearTimeout(_), _ = window.setTimeout(() => {
      n.toast.classList.remove("is-on");
    }, 2200));
  }
  const ie = /* @__PURE__ */ new Map();
  function co(e, a, o) {
    const r = document.createElement("button");
    r.type = "button", r.className = "chat-image-fallback", r.dataset.src = a, r.textContent = o, e.replaceWith(r);
  }
  function ce() {
    n.list && (n.list.querySelectorAll("img.chat-image[data-src]").forEach((e) => {
      if (e.dataset.bound) return;
      e.dataset.bound = "1";
      const a = e.getAttribute("data-src");
      if (!a) return;
      const o = ie.get(a);
      if (o) {
        e.src = o;
        return;
      }
      fetch(a).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.blob();
      }).then((r) => {
        const l = URL.createObjectURL(r);
        ie.set(a, l), e.src = l;
      }).catch((r) => {
        if (!e.dataset.retried) {
          e.dataset.retried = "1", e.dataset.bound = "", setTimeout(ce, 900);
          return;
        }
        if (!e.dataset.directTry) {
          e.dataset.directTry = "1", e.dataset.bound = "", e.src = a;
          return;
        }
        const l = document.createElement("button");
        l.type = "button", l.className = "chat-image-fallback", l.dataset.src = a;
        const u = String(a || "").split("/").pop();
        l.textContent = "图片打不开 · " + u + " · " + String(r && r.message || r || "未知").slice(0, 24), e.replaceWith(l);
      });
    }), n.list.querySelectorAll("img.chat-image[data-remote]").forEach((e) => {
      if (e.dataset.bound) return;
      e.dataset.bound = "1";
      const a = e.getAttribute("data-remote");
      if (!a) return;
      const o = ie.get(a);
      if (o) {
        e.src = o;
        return;
      }
      fetch(a, { credentials: "omit", referrerPolicy: "no-referrer" }).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.blob();
      }).then((r) => {
        const l = URL.createObjectURL(r);
        ie.set(a, l), e.src = l;
      }).catch(() => {
        if (!e.dataset.retried) {
          e.dataset.retried = "1", e.dataset.bound = "", setTimeout(ce, 900);
          return;
        }
        co(e, a, "外链图片打不开 · 点按重试");
      });
    }));
  }
  function Re() {
    if (!n.list) return !0;
    const e = n.list;
    return e.scrollHeight - e.scrollTop - e.clientHeight < 72;
  }
  function je() {
    if (!n.jump || !n.list) return;
    const e = n.list.scrollTop, a = Re(), o = e < t.lastListTop - 2;
    t.lastListTop = e;
    const r = Date.now() - t.lastUserScroll < 800;
    o && r ? (t.reading = !0, t.holdAnswer = !1) : a && (t.reading = !1, t.holdAnswer = !1), n.jump.hidden = a, a && !t.reading && t.pendingPaint && (t.pendingPaint = !1, j(!0));
  }
  function Ea(e) {
    return e.kind === "deliverable" ? hr(
      e,
      (a, o, r) => b.presentedFileUrl(a, o, r, t.currentSession)
    ) : e.kind === "approval" ? fr(e) : e.kind === "input" ? mr(e, Wt.get(String(e.callId)) || {}, Kt.has(String(e.callId))) : "";
  }
  function lo() {
    return `<div class="chat-skeleton" aria-hidden="true">
      <div class="chat-skeleton-meta"></div>
      <div class="chat-skeleton-bubble is-short"></div>
      <div class="chat-skeleton-meta is-right"></div>
      <div class="chat-skeleton-bubble is-me"></div>
      <div class="chat-skeleton-meta"></div>
      <div class="chat-skeleton-bubble"></div>
      <div class="chat-skeleton-footer"></div>
    </div>`;
  }
  function uo(e) {
    let a = -1;
    for (let u = 0; u < e.length; u += 1) {
      const y = e[u];
      y.kind === "message" && y.message && y.message.who === "me" && (a = u);
    }
    if (a < 0) return null;
    let o = !1, r = !1, l = !1;
    for (let u = a + 1; u < e.length; u += 1) {
      const y = e[u];
      y.kind === "tool" && (o = !0), y.kind === "message" && y.message && (y.message.who === "ai" && (r = !0), y.message.who === "error" && (l = !0));
    }
    return !o || r || l || t.stopped ? null : t.status === "bad" ? {
      kind: "offline",
      title: "连接中断",
      text: "电脑端暂时连不上，本轮可能仍在执行。恢复连接后会自动同步。"
    } : t.status === "ok" && t.hydrated && !t.runActive && !t.running ? {
      kind: "incomplete",
      title: "本轮未完成",
      text: "电脑端没有返回最终内容，结果未知。"
    } : null;
  }
  function po(e, a) {
    if (t.booting && e.length === 0 && !a.streaming && !a.typing)
      return [{ key: "x:skeleton", html: lo() }];
    const o = [];
    let r = [], l = [], u = [];
    const y = (I, J, ot, Q) => {
      ot && I.push({ key: J, html: ot, ...Q || {} });
    };
    let M = !1, B = !1, h = 0, q = -1;
    for (let I = 0; I < e.length; I += 1)
      e[I].kind === "message" && e[I].message && e[I].message.who === "me" && (q = I);
    const T = Math.max(1, e.filter((I) => I.kind === "message" && I.message && I.message.who === "me").length);
    let C = 0, W = 0;
    const G = () => {
      if (r.length === 0 && C === 0) return;
      const I = h >= T - 2 && !(t.stopped && B), J = r[0] ? "group-" + r[0].id : "group-turn-" + h;
      I && y(
        u,
        "g:" + h,
        pr(r, Ft.has(J), null, Yt, {
          total: C,
          running: W,
          activeId: t.toolActiveId
        }),
        { className: "chat-tool-footer-block" }
      ), r = [], C = 0, W = 0;
    }, ht = () => {
      G();
      let I = u.find((Q) => Q.key === "g:" + h);
      const J = [...l].reverse().find((Q) => Q.assistant || Q.key === "x:streaming" || Q.key === "x:typing"), ot = M || !!l.some((Q) => Q.key === "x:streaming" || Q.key === "x:typing");
      B && !t.stopped && t.awaitingReply && ot && J && (I ? I.className = "chat-tool-footer-block" : (I = {
        key: "g:" + h,
        html: ur(),
        className: "chat-tool-footer-block"
      }, u.push(I))), I && (u = u.filter((Q) => Q !== I), u.unshift(I)), o.push(...l, ...u), l = [], u = [], M = !1, B = !1, h += 1;
    };
    return e.forEach((I, J) => {
      if (I.kind === "message" && I.message.who === "me") {
        ht(), B = J === q;
        const ot = I.message.id || I.message.eventId || I.message.seq || `at-${I.message.at}-${J}`;
        y(o, "m:" + ot, sn(I.message, Yt));
        return;
      }
      if (I.kind === "tool") {
        if (C += 1, (I.status === "running" || !I.status && I.done !== !0) && (W += 1), I.status === "ok" || I.status === "failed") {
          r.push(I);
          return;
        }
        return;
      }
      if (I.kind === "deliverable") {
        y(u, I.kind + ":" + (I.id || J), Ea(I));
        return;
      }
      if (I.kind === "message") {
        const ot = I.message.id || I.message.eventId || I.message.seq || `at-${I.message.at}-${J}`;
        I.message.who === "ai" && (M = !0), y(l, "m:" + ot, sn(I.message, Yt), {
          assistant: I.message.who === "ai"
        });
      } else
        y(l, I.kind + ":" + (I.id || J), Ea(I));
    }), a.execution && l.push({ key: "x:exec", html: a.execution }), ht(), y(o, "x:tip", a.tip), y(o, "x:projections", a.projections), t.stuckPrompt && y(
      o,
      "x:stuck",
      `<div class="chat-card chat-stuck">
          <p class="chat-stuck-title">可能卡在电脑端确认</p>
          <p class="chat-stuck-text">超过 5 分钟没有新进展。电脑端可能有确认弹窗，手机看不到；也可能只是工具还在跑。</p>
          <div class="chat-stuck-actions">
            <button type="button" class="chat-stuck-btn" data-action="stuck-wait">继续等待</button>
            <button type="button" class="chat-stuck-btn is-danger" data-action="stuck-skip">处理不了，跳过</button>
          </div>
        </div>`
    ), t.historyLimitReached && o.unshift({
      key: "x:history-limit",
      html: `<div class="chat-history-limit">只显示最近 ${$} 轮，更早记录请在电脑端查看</div>`
    }), a.localNotice && y(
      o,
      "x:local-notice",
      `<div class="chat-local-notice is-${a.localNotice.kind}" role="status">
          <div class="chat-local-notice-head"><span aria-hidden="true">⚠</span><b>${a.localNotice.title}</b></div>
          <p>${a.localNotice.text}</p>
        </div>`
    ), o;
  }
  function Ia() {
    if (!c) return;
    const e = c.querySelector('[data-role="tool-sheet"]'), a = c.querySelector('[data-role="tool-sheet-body"]');
    if (!e || !a) return;
    const o = t.toolDetailId ? w.cards.get(t.toolDetailId) : null;
    if (!o) {
      le();
      return;
    }
    a.innerHTML = dr(o, Yt), e.hidden = !1, ce();
  }
  function ho() {
    if (n.list) {
      for (const e of n.list.querySelectorAll(".chat-tool.is-active")) e.classList.remove("is-active");
      if (t.toolActiveId) {
        for (const e of n.list.querySelectorAll(".chat-tool"))
          if (e.dataset.tool === t.toolActiveId) {
            e.classList.add("is-active");
            break;
          }
      }
    }
  }
  function fo() {
    if (!n.list || !t.toolActiveId) return;
    let e = null;
    for (const l of n.list.querySelectorAll(".chat-tool"))
      if (l.dataset.tool === t.toolActiveId) {
        e = l;
        break;
      }
    const a = e ? e.closest(".chat-tool-group-body") : null;
    if (!e || !a || a.hidden) return;
    const o = a.getBoundingClientRect(), r = e.getBoundingClientRect();
    r.top < o.top ? a.scrollTop -= o.top - r.top + 4 : r.bottom > o.bottom && (a.scrollTop += r.bottom - o.bottom + 4);
  }
  function go(e) {
    t.toolDetailId = String(e || ""), t.toolActiveId = t.toolDetailId, Ia(), ho(), fo();
  }
  function le() {
    if (t.toolDetailId = "", !c) return;
    const e = c.querySelector('[data-role="tool-sheet"]');
    e && (e.hidden = !0);
  }
  function mo(e) {
    const a = n.list, o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const u of Array.from(a.children))
      u.dataset && u.dataset.block ? o.set(u.dataset.block, u) : u.remove();
    let l = a.firstChild;
    for (const u of e) {
      const y = "chat-block" + (u.className ? " " + u.className : "");
      let M = o.get(u.key);
      if (!M)
        M = document.createElement("div"), M.className = y, M.dataset.block = u.key, M.innerHTML = u.html, M.__html = u.html;
      else if (M.className !== y && (M.className = y), M.__html !== u.html) {
        const B = M.querySelector(".chat-tool-group-body"), h = B ? {
          top: B.scrollTop,
          atBottom: B.scrollHeight - B.scrollTop - B.clientHeight < 24
        } : null;
        if (M.innerHTML = u.html, M.__html = u.html, h) {
          const q = M.querySelector(".chat-tool-group-body");
          if (q) {
            const T = () => {
              q.scrollTop = h.atBottom ? q.scrollHeight : h.top;
            };
            T(), window.requestAnimationFrame(T);
          }
        }
      }
      r.set(u.key, M), M === l ? l = l.nextSibling : a.insertBefore(M, l);
    }
    for (; l; ) {
      const u = l.nextSibling;
      l.remove(), l = u;
    }
    return r;
  }
  function bo() {
    const e = t.projections || {}, a = [], o = Array.isArray(e.todos) ? e.todos : null;
    if (o && o.length > 0) {
      const u = o.filter((M) => M.status === "completed").length, y = o.map((M) => `<li class="chat-todo-item ${M.status === "completed" ? "is-done" : M.status === "in_progress" ? "is-active" : ""}"><span class="chat-todo-mark" aria-hidden="true"></span><span>${P(M.content || "")}</span></li>`).join("");
      a.push(
        `<div class="chat-card chat-todo"><div class="chat-card-head"><span class="chat-card-icon" aria-hidden="true">☑</span><span class="chat-card-title">待办</span><span class="chat-card-badge">${u}/${o.length}</span></div><ul class="chat-todo-list">${y}</ul></div>`
      );
    }
    const r = e.goal;
    if (r && r.goal && r.goal.objective) {
      const u = String(r.goal.phase || "active"), y = u === "complete" ? "已完成" : u === "paused" ? "已暂停" : u === "blocked" ? "受阻" : "进行中";
      a.push(
        `<div class="chat-card chat-goal"><div class="chat-card-head"><span class="chat-card-icon" aria-hidden="true">◎</span><span class="chat-card-title">目标</span><span class="chat-card-badge">${P(y)}</span></div><p class="chat-card-text">${P(r.goal.objective)}</p><p class="chat-card-sub">第 ${Number(r.roundsStarted) || 0} / ${Number(r.goal.maxGoalRounds) || 0} 轮</p></div>`
      );
    }
    const l = e.plan;
    return l && l.active && a.push(`<div class="chat-plan-chip">🧭 计划模式${l.pending ? " · 等待批准" : ""}</div>`), a.join("");
  }
  let Dt = 0, ut = [];
  function De() {
    const e = [...m];
    for (let a = e.length - 1; a > 0; a -= 1) {
      const o = Math.floor(Math.random() * (a + 1));
      [e[a], e[o]] = [e[o], e[a]];
    }
    return [
      { text: e.pop() || "1 + 1 = ?", left: 22 },
      { text: e.pop() || "2 + 2 = ?", left: 22 }
    ];
  }
  function Na() {
    return [ut.slice(0, 1), ut.slice(1, 2)].map(
      (a) => `<div class="chat-math-row">${a.map(
        (o) => `<span class="chat-math-item" style="left:${o.left}px">${P(o.text)}</span>`
      ).join("")}</div>`
    ).join("");
  }
  function Pa() {
    return ut.length || (ut = De()), `<div class="chat-math-board">${Na()}</div>`;
  }
  function xo() {
    if (!n.list) return;
    const e = n.list.querySelector(".chat-math-board");
    e && (ut = De(), e.innerHTML = Na());
  }
  function yo() {
    ut.length || (ut = De()), !Dt && (Dt = window.setInterval(xo, f));
  }
  function La() {
    Dt && (window.clearInterval(Dt), Dt = 0, ut = []);
  }
  function de(e = !1) {
    if (t.reading && !e) {
      t.pendingPaint = !0;
      return;
    }
    if (e) {
      j(!0);
      return;
    }
    V || (V = window.requestAnimationFrame(() => {
      V = 0, U || j();
    }));
  }
  function j(e) {
    if (!n.list) return;
    const a = n.list ? n.list.scrollTop : 0, o = n.list ? n.list.scrollHeight : 0, r = Re(), l = !e && !t.reading && !t.holdAnswer && r, u = w.timeline(), y = [...u].reverse().find((it) => it.kind === "tool" && it.status === "running"), M = t.lastEventAt ? Date.now() - t.lastEventAt : Number(t.lastEventAge) || 0, B = (t.runActive || t.awaitingReply || t.running || y) && (M > 3e5 || !!t.notRunningSince);
    t.staleShown = B;
    const h = t.runActive || t.awaitingReply || t.waiting || t.running || !!(t.currentTool && !t.currentTool.done) || !!y, q = !t.currentTool && t.lastTool && Date.now() - (t.lastToolAt || 0) < 1e4 ? { ...t.lastTool, done: !0 } : null, T = h ? y || t.currentTool || q : null, C = T && T.name ? String(T.name) : "", W = h && !C && !B, G = T && (T.summary || T.detail) ? String(T.summary || T.detail) : "", ht = !!(T && T.status !== "running" && T.done), I = B ? "可能已断开" : C ? ht ? "执行完成…" : "执行中…" : "思考中…", J = B ? "" : C ? C + (G ? "：" + G : "") : "", ot = W ? Pa() : "", Q = B ? "" : W ? ot : `<span class="chat-typing-detail">${P(J)}</span>`, Mt = t.stream && t.stream.text ? String(t.stream.text) : "", We = t.stream && t.stream.reasoning ? String(t.stream.reasoning) : "", Ke = !!(We && !Mt && !B), Po = Ke ? `<span class="chat-typing-head"><span class="chat-typing-text">思考中…</span><span class="chat-typing-dot"></span></span>${Pa()}` : "", Lo = Mt || We ? `<div class="chat-turn is-ai"><div class="chat-meta"><span class="chat-avatar">🤖</span><span class="chat-stamp">${It(Date.now())}</span></div><div class="chat-bubble is-ai is-typing is-streaming${Ke ? " is-thinking" : ""}">${Po}${Mt ? `<div class="chat-stream-text">${dn(Mt)}</div>` : ""}${Mt ? '<span class="chat-typing-dot"></span>' : ""}</div></div>` : "", zo = h && !Mt && !We ? `<div class="chat-turn is-ai"><div class="chat-meta"><span class="chat-avatar">🤖</span><span class="chat-stamp">${It(Date.now())}</span></div><div class="chat-bubble is-ai is-typing${W ? " is-thinking" : ""}${B ? " is-stale" : ""}"><span class="chat-typing-head"><span class="chat-typing-text">${I}</span><span class="chat-typing-dot"></span></span>${Q}</div></div>` : "", Va = t.runActive && !t.stopped ? Lo || zo : "";
    W || Ke ? yo() : La();
    const Ya = bo(), Co = uo(u), Bo = !!t.url, Ro = u.length === 0 && !Va && !Ya ? `<div class="chat-sys">${Bo ? "说点什么吧，电脑端的回复会同步过来" : "先在 ⚙ 里填电脑地址，例如 http://192.168.2.6:8788"}</div>` : "", Qa = po(u, {
      tip: Ro,
      projections: Ya,
      execution: Va,
      localNotice: Co
    }), jo = mo(Qa);
    let Ge = !1;
    if (t.focusLastAssistant) {
      if (!t.reading && r) {
        const it = [...Qa].reverse().find((Ve) => Ve.assistant), pe = it ? jo.get(it.key) : null;
        if (pe) {
          for (const Uo of kt) window.clearTimeout(Uo);
          kt = [];
          const Ve = n.list.getBoundingClientRect(), Do = pe.getBoundingClientRect();
          n.list.scrollTop = Math.max(0, n.list.scrollTop + Do.top - Ve.top - 8), t.lastListTop = n.list.scrollTop, t.holdAnswer = !Re(), Ge = !0;
        }
      }
      t.focusLastAssistant = !1;
    }
    if (!Ge && !r && (n.list.scrollTop = a + Math.max(0, n.list.scrollHeight - o)), (l || e) && !Ge) {
      for (const pe of kt) window.clearTimeout(pe);
      kt = [], Ut();
      const it = () => {
        !t.reading && !t.holdAnswer && Ut();
      };
      requestAnimationFrame(it), kt.push(window.setTimeout(it, 260)), kt.push(window.setTimeout(it, 900));
    }
    ce(), wo(), t.toolDetailId && Ia(), Ba(), je();
  }
  function za() {
    if (!n.status) return;
    n.status.dataset.status = t.status;
    const e = t.statusText || "连接状态";
    n.status.title = e, n.status.setAttribute("aria-label", e), re(), vo();
  }
  function vo() {
    if (n.net) {
      if (t.status !== "busy" && t.status !== "bad") {
        n.net.hidden = !0, n.net.dataset.tone = "";
        return;
      }
      n.net.hidden = !1, n.net.dataset.tone = t.status === "busy" ? "busy" : "bad", n.netText && (n.netText.textContent = t.status === "busy" ? "网络连接中…" : t.statusText || "连不上，正在重试"), n.netNote && (n.netNote.hidden = t.status !== "bad", n.netNote.textContent = /令牌/.test(t.statusText || "") ? "请检查令牌配置" : "请检查网络、端口或防火墙");
    }
  }
  function pt(e) {
    const a = String(e || "").trim();
    a !== t.sessionTitle && (t.sessionTitle = a, Ca());
  }
  function Ca() {
    if (!n.title) return;
    const e = t.sessionTitle || "对话";
    n.title.textContent = e, n.title.title = e, ve();
  }
  function Ba() {
    if (!n.send) return;
    const e = t.waiting || t.running || t.awaitingReply || t.runActive || Ae();
    n.send.textContent = e ? "■" : "↑", n.send.classList.toggle("is-stop", e), n.send.setAttribute("aria-label", e ? "停止等待" : "发送"), n.send.dataset.action = e ? "stop" : "send";
  }
  function Ut() {
    n.list && (n.list.scrollTop = n.list.scrollHeight);
  }
  function wo() {
    if (!n.list) return;
    const e = Math.max(320, Math.round(window.innerHeight * 0.6));
    for (const a of n.list.querySelectorAll(".chat-bubble")) {
      if (a.classList.contains("is-typing")) continue;
      const o = a.querySelector(".chat-to-top");
      if (a.offsetHeight < e) {
        o && o.remove();
        continue;
      }
      if (o) continue;
      const r = document.createElement("button");
      r.type = "button", r.className = "chat-to-top", r.setAttribute("aria-label", "回到这条消息顶部"), r.textContent = "↖", r.addEventListener("click", (l) => {
        l.stopPropagation();
        const u = n.list, y = a.getBoundingClientRect().top - u.getBoundingClientRect().top + u.scrollTop;
        u.scrollTo({ top: Math.max(0, y - 8), behavior: "smooth" });
      }), a.appendChild(r);
    }
  }
  let Ht = [];
  function Ue() {
    for (const e of Ht) window.clearTimeout(e);
    Ht = [], Ut();
    for (const e of [80, 180, 320, 480])
      Ht.push(window.setTimeout(Ut, e));
  }
  function He() {
    n.input && (n.input.style.height = "auto", n.input.style.height = Math.min(120, n.input.scrollHeight) + "px");
  }
  function _e() {
    !c || !n.top || c.style.setProperty("--chat-header-h", Math.round(n.top.getBoundingClientRect().height) + "px");
  }
  function Ra(e) {
    if (!e || !c) return;
    const a = t.insets;
    t.insets = e, c.style.setProperty("--chat-top", Math.max(0, Number(e.top) || 0) + "px"), c.style.setProperty("--chat-bottom", Math.max(0, Number(e.bottom) || 0) + "px"), c.style.setProperty("--chat-ime", Math.max(0, Number(e.ime) || 0) + "px"), _e(), (e.ime || 0) !== (a.ime || 0) && window.setTimeout(() => {
      e.ime > 0 && t.view === "settings" && Nt ? Nt.scrollIntoView({ block: "center", behavior: "smooth" }) : Ue();
    }, 60);
  }
  function ko() {
    const e = getComputedStyle(document.documentElement);
    return {
      top: Number.parseFloat(e.getPropertyValue("--safe-top")) || 0,
      bottom: Number.parseFloat(e.getPropertyValue("--safe-bottom")) || 0,
      ime: 0
    };
  }
  function So() {
    document.getElementById(Ja) || (F = document.createElement("style"), F.id = Ja, F.textContent = Ho, document.head.appendChild(F));
  }
  function To() {
    const e = document.createElement("div");
    return e.className = "chat-app", e.innerHTML = `
      <div class="chat-main">
        <header class="chat-top">
          <div class="chat-heading">
            <h1 data-role="title">对话</h1>
            <div class="chat-head-sub">
              <span class="chat-status" data-status="unset" data-role="status" aria-label="连接状态"></span>
              <button type="button" class="chat-model" data-role="model-chip" data-action="open-models" hidden></button>
            </div>
          </div>
          <div class="chat-actions">
            <button type="button" class="chat-icon" data-action="close-app" aria-label="关闭应用">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7.5 6.5a7 7 0 1 0 9 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
            <button type="button" class="chat-icon" data-action="switch" aria-label="打开会话菜单">☰</button>
          </div>
        </header>
        <div class="chat-list" data-role="list"></div>
        <div class="chat-load-spinner" data-role="load-spinner" hidden><span></span></div>
        <button type="button" class="chat-jump" data-role="jump" data-action="jump-bottom" aria-label="回到底部" hidden>↓</button>
        <div class="chat-composer">
          <div class="chat-attach" data-role="attach" hidden></div>
          <div class="chat-net" data-role="net" hidden>
            <span class="chat-net-dot" aria-hidden="true"></span>
            <span class="chat-net-text" data-role="net-text"></span>
            <span class="chat-net-note">请检查网络、端口或防火墙</span>
          </div>
          <div class="chat-input-row">
            <button type="button" class="chat-plus" data-action="attach" aria-label="添加图片或文件">＋</button>
            <textarea class="chat-input" data-role="draft" rows="1" placeholder="说点什么…" enterkeyhint="send"></textarea>
            <button type="button" class="chat-send" data-action="send" aria-label="发送">↑</button>
          </div>
          <input class="chat-pick" type="file" data-role="pick" multiple hidden />
        </div>
        <div class="chat-toast" data-role="toast" role="status"></div>
      </div>

      <section class="chat-page" data-role="page" hidden>
        <button type="button" class="chat-back" data-action="back"><span class="chat-back-arrow">‹</span> 返回对话</button>

        <section class="chat-acc" data-acc="server" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="server">
            <span class="chat-acc-title">服务器</span>
            <span class="chat-acc-sum" data-role="server-sum">未配置</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="server-body" hidden>
            <label class="chat-field">
              <span>家里（Wi-Fi）<em class="chat-field-state" data-role="lan-state"></em></span>
              <input data-role="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="http://192.168.2.6:8788" />
            </label>
            <label class="chat-field">
              <span>外部（可选）<em class="chat-field-state" data-role="wan-state"></em></span>
              <input data-role="wan" inputmode="url" autocomplete="off" spellcheck="false" placeholder="http://10.126.126.1:8788" />
            </label>
            <p class="chat-sheet-sub">连接方式</p>
            <div class="chat-chipgroup" data-role="mode-group">
              <button type="button" class="chat-opt" data-action="pick-mode" data-value="auto" data-on="0">自动</button>
              <button type="button" class="chat-opt" data-action="pick-mode" data-value="lan" data-on="0">家里</button>
              <button type="button" class="chat-opt" data-action="pick-mode" data-value="wan" data-on="0">外部</button>
              <button type="button" class="chat-opt is-test" data-action="test" data-on="0">速度测试</button>
            </div>
            <label class="chat-field">
              <span>访问令牌</span>
              <input data-role="token" autocomplete="off" spellcheck="false" placeholder="和电脑端 TOKEN 一致" />
            </label>
            <p class="chat-hint">连接不上时，可能电脑防火墙未放行端口。请检查 Windows 防火墙是否允许 Node.js / DeepSeek Harness。</p>
            <button type="button" class="chat-btn is-primary is-block is-sticky" data-action="save">保存</button>
          </div>
        </section>

        <section class="chat-acc" data-acc="relay" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="relay">
            <span class="chat-acc-title">通知</span>
            <span class="chat-acc-sum" data-role="relay-sum">读取中…</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="relay-body" hidden>
            <label class="chat-toggle">
              <span>开启提醒</span>
              <input type="checkbox" data-role="relay-toggle" />
            </label>
            <div class="chat-chipgroup" data-role="notify-mode">
              <button type="button" class="chat-opt" data-action="pick-notify-mode" data-value="turn" data-on="0">回合结束</button>
              <button type="button" class="chat-opt" data-action="pick-notify-mode" data-value="message" data-on="0">每条消息</button>
            </div>
            <p class="chat-test" data-role="relay">读取中…</p>
            <button type="button" class="chat-btn" data-action="test-relay">发送测试提醒</button>
            <p class="chat-hint">手势返回不会关闭应用，提醒继续；「回合结束」一轮执行完弹一次，「每条消息」助手每说一段就弹。</p>
          </div>
        </section>

        <section class="chat-acc" data-acc="cache" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="cache">
            <span class="chat-acc-title">缓存</span>
            <span class="chat-acc-sum">本地消息缓存</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="cache-body" hidden>
            <p class="chat-hint">清理后消息会重新从电脑端加载；地址和访问令牌保留。</p>
            <button type="button" class="chat-btn is-danger" data-action="clear-cache">清理缓存</button>
          </div>
        </section>

        <section class="chat-acc" data-acc="reset" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="reset">
            <span class="chat-acc-title">恢复初始化</span>
            <span class="chat-acc-sum">删除全部本地数据</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="reset-body" hidden>
            <p class="chat-hint">会删除地址、访问令牌、通知设置和全部缓存，回到首次打开状态。不可恢复。</p>
            <button type="button" class="chat-btn is-danger" data-action="reset-app">恢复初始化</button>
          </div>
        </section>

        <button type="button" class="chat-btn" data-action="open-help">使用说明</button>

        <p class="chat-version" data-role="version"></p>
      </section>

      <div class="chat-scrim" data-role="help" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">使用说明</h2>
          <div class="chat-help">
            <p class="chat-sheet-sub">配对</p>
            <p class="chat-hint">电脑端打开 DSH → 插件 → 「手机中转」，确认端口（默认 8788）和访问令牌。手机在 ⚙ 里填地址：在家填家里地址，在外填外部地址，令牌与电脑一致，点「测试」确认可连接。</p>
            <p class="chat-sheet-sub">地址切换</p>
            <p class="chat-hint">连接方式可选：自动（家里优先、不通再走外部）、家里地址、外部地址。</p>
            <p class="chat-sheet-sub">审批与提问</p>
            <p class="chat-hint">手机上打开这个应用，审批就由手机接管：待审批会作为卡片出现在对话里，点「拒绝 / 允许」即可；电脑端提问也会变成卡片，选好（或自己输入）后点「提交」。手机点 ✕ 关闭应用后，这些交回电脑端；在电脑上也能直接处理。</p>
            <p class="chat-sheet-sub">后台提醒</p>
            <p class="chat-hint">在「通知」里打开后，离开对话也会在助手回复结束时弹通知。</p>
            <p class="chat-sheet-sub">注意事项</p>
            <p class="chat-hint">令牌相当于钥匙，不要外传；电脑的局域网地址变了（重启后可能变），要回来改「家里地址」；同一时间手机只连一个会话；插件重启的瞬间，正在等待的审批会暂时回到电脑原生弹窗。</p>
          </div>
          <button type="button" class="chat-btn" data-action="close-help">关闭</button>
        </div>
      </div>

      <div class="chat-scrim chat-drawer-scrim" data-role="scrim" hidden>
        <aside class="chat-drawer" data-role="drawer">
          <div class="chat-drawer-pane" data-role="drawer-list">
            <div class="chat-drawer-tools">
              <button type="button" class="chat-drawer-tool" data-action="new-session"><span class="chat-drawer-tool-icon">＋</span><span>新建</span></button>
              <button type="button" class="chat-drawer-tool" data-action="toggle-session-search"><span class="chat-drawer-tool-icon is-search">⌕</span><span>搜索</span></button>
              <button type="button" class="chat-drawer-tool" data-action="settings"><span class="chat-drawer-tool-icon">⚙</span><span>设置</span></button>
            </div>
            <input class="chat-sheet-search chat-drawer-search" data-role="session-search" value="" placeholder="搜索对话标题" autocomplete="off" spellcheck="false" hidden />
            <div data-role="sheet-body"></div>
          </div>
          <div class="chat-drawer-pane" data-role="drawer-create" hidden>
            <div class="chat-drawer-head">
              <button type="button" class="chat-icon" data-action="close-new" aria-label="返回">‹</button>
            </div>
            <div class="chat-form" data-role="new-body"></div>
          </div>
        </aside>
      </div>

      <div class="chat-scrim" data-role="session-menu" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">会话操作</h2>
          <button type="button" class="chat-btn" data-action="session-rename">重命名</button>
          <button type="button" class="chat-btn" data-action="session-fork">从这里分支</button>
          <button type="button" class="chat-btn is-danger" data-action="archive-session">归档会话</button>
          <button type="button" class="chat-btn" data-action="close-session-menu">取消</button>
        </div>
      </div>

      <div class="chat-scrim" data-role="rename-scrim" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">重命名对话</h2>
          <input class="chat-sheet-search" data-role="rename-input" placeholder="对话标题" autocomplete="off" spellcheck="false" />
          <button type="button" class="chat-btn is-primary" data-action="confirm-rename">保存</button>
          <button type="button" class="chat-btn" data-action="close-rename">取消</button>
        </div>
      </div>

      <div class="chat-scrim" data-role="archive-scrim" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">归档会话</h2>
          <p class="chat-hint" data-role="archive-text"></p>
          <button type="button" class="chat-btn is-danger" data-action="confirm-archive">归档</button>
          <button type="button" class="chat-btn" data-action="close-archive">取消</button>
        </div>
      </div>

      <div class="chat-scrim" data-role="search-scrim" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">搜索消息</h2>
          <input class="chat-sheet-search" data-role="message-search" placeholder="搜索当前对话" autocomplete="off" spellcheck="false" />
          <div class="chat-search-body" data-role="search-body"></div>
          <button type="button" class="chat-btn" data-action="close-search">关闭</button>
        </div>
      </div>

      <div class="chat-scrim" data-role="model-scrim" hidden>
        <div class="chat-sheet">
          <h2 class="chat-sheet-title">模型与推理</h2>
          <div class="chat-form" data-role="model-body"></div>
          <button type="button" class="chat-btn is-primary is-block" data-action="apply-model">应用</button>
          <button type="button" class="chat-btn" data-action="close-models">取消</button>
        </div>
      </div>

      <div class="chat-scrim is-center" data-role="confirm" hidden>
        <div class="chat-dialog">
          <h2 class="chat-dialog-title">关闭对话？</h2>
          <p class="chat-dialog-text">点「关闭」会彻底退出对话应用；用手势返回则只是离开页面，应用会继续在后台运行。</p>
          <div class="chat-dialog-actions">
            <button type="button" class="chat-btn" data-action="confirm-cancel">取消</button>
            <button type="button" class="chat-btn is-danger" data-action="confirm-ok">关闭</button>
          </div>
        </div>
      </div>

      <div class="chat-scrim chat-tool-scrim" data-role="tool-sheet" hidden>
        <section class="chat-sheet chat-tool-sheet">
          <div class="chat-tool-sheet-head">
            <h2 class="chat-sheet-title">工具详情</h2>
            <button type="button" class="chat-icon" data-action="close-tool-sheet" aria-label="关闭工具详情">✕</button>
          </div>
          <div class="chat-tool-sheet-body" data-role="tool-sheet-body"></div>
          <button type="button" class="chat-btn" data-action="close-tool-sheet">关闭</button>
        </section>
      </div>

      <div class="chat-viewer" data-role="viewer" hidden>
        <img data-role="viewer-img" alt="图片" />
        <button type="button" class="chat-viewer-nav is-prev" data-action="viewer-prev" aria-label="上一张" hidden>‹</button>
        <button type="button" class="chat-viewer-nav is-next" data-action="viewer-next" aria-label="下一张" hidden>›</button>
        <span class="chat-viewer-count" data-role="viewer-count" hidden></span>
      </div>
    `, e;
  }
  function $o() {
    if (n = {
      title: c.querySelector('[data-role="title"]'),
      status: c.querySelector('[data-role="status"]'),
      net: c.querySelector('[data-role="net"]'),
      netText: c.querySelector('[data-role="net-text"]'),
      netNote: c.querySelector(".chat-net-note"),
      list: c.querySelector('[data-role="list"]'),
      loadSpinner: c.querySelector('[data-role="load-spinner"]'),
      top: c.querySelector(".chat-top"),
      jump: c.querySelector('[data-role="jump"]'),
      input: c.querySelector('[data-role="draft"]'),
      attach: c.querySelector('[data-role="attach"]'),
      pick: c.querySelector('[data-role="pick"]'),
      send: c.querySelector(".chat-send"),
      toast: c.querySelector('[data-role="toast"]'),
      page: c.querySelector('[data-role="page"]'),
      inputUrl: c.querySelector('[data-role="url"]'),
      inputWan: c.querySelector('[data-role="wan"]'),
      inputAuto: c.querySelector('[data-role="auto"]'),
      modeGroup: c.querySelector('[data-role="mode-group"]'),
      inputToken: c.querySelector('[data-role="token"]'),
      drawer: c.querySelector('[data-role="drawer"]'),
      drawerList: c.querySelector('[data-role="drawer-list"]'),
      drawerCreate: c.querySelector('[data-role="drawer-create"]'),
      sessionSearch: c.querySelector('[data-role="session-search"]'),
      switchBtn: c.querySelector('[data-action="switch"]'),
      newBody: c.querySelector('[data-role="new-body"]'),
      searchScrim: c.querySelector('[data-role="search-scrim"]'),
      searchInput: c.querySelector('[data-role="message-search"]'),
      searchBody: c.querySelector('[data-role="search-body"]'),
      sessionMenu: c.querySelector('[data-role="session-menu"]'),
      renameScrim: c.querySelector('[data-role="rename-scrim"]'),
      renameInput: c.querySelector('[data-role="rename-input"]'),
      archiveScrim: c.querySelector('[data-role="archive-scrim"]'),
      archiveText: c.querySelector('[data-role="archive-text"]'),
      modelChip: c.querySelector('[data-role="model-chip"]'),
      modelScrim: c.querySelector('[data-role="model-scrim"]'),
      modelBody: c.querySelector('[data-role="model-body"]'),
      confirmScrim: c.querySelector('[data-role="confirm"]'),
      test: c.querySelector('[data-role="test"]'),
      lanState: c.querySelector('[data-role="lan-state"]'),
      wanState: c.querySelector('[data-role="wan-state"]'),
      relay: c.querySelector('[data-role="relay"]'),
      relaySum: c.querySelector('[data-role="relay-sum"]'),
      relayToggle: c.querySelector('[data-role="relay-toggle"]'),
      relayBody: c.querySelector('[data-role="relay-body"]'),
      cacheBody: c.querySelector('[data-role="cache-body"]'),
      resetBody: c.querySelector('[data-role="reset-body"]'),
      notifyMode: c.querySelector('[data-role="notify-mode"]'),
      serverSum: c.querySelector('[data-role="server-sum"]'),
      serverBody: c.querySelector('[data-role="server-body"]'),
      version: c.querySelector('[data-role="version"]'),
      helpScrim: c.querySelector('[data-role="help"]'),
      scrim: c.querySelector('[data-role="scrim"]'),
      sheetBody: c.querySelector('[data-role="sheet-body"]'),
      viewer: c.querySelector('[data-role="viewer"]'),
      viewerImg: c.querySelector('[data-role="viewer-img"]'),
      viewerCount: c.querySelector('[data-role="viewer-count"]'),
      viewerPrev: c.querySelector('[data-action="viewer-prev"]'),
      viewerNext: c.querySelector('[data-action="viewer-next"]')
    }, n.input && n.input.addEventListener("focus", () => {
      c.style.setProperty("--chat-bottom", "0px");
    }), n.viewer && (n.viewer.addEventListener("pointerdown", so), n.viewer.addEventListener("pointermove", io), n.viewer.addEventListener("pointerup", Ma), n.viewer.addEventListener("pointercancel", Ma)), n.list) {
      n.list.addEventListener("scroll", je, { passive: !0 }), n.list.addEventListener("scroll", ca, { passive: !0 });
      const e = () => {
        t.lastUserScroll = Date.now();
      };
      n.list.addEventListener("touchmove", e, { passive: !0 }), n.list.addEventListener("wheel", e, { passive: !0 }), n.list.addEventListener("pointerdown", e, { passive: !0 });
    }
    _e();
  }
  function ja(e) {
    let a = Wt.get(e);
    return a || (a = { selected: {}, custom: {} }, Wt.set(e, a)), a;
  }
  function Ao(e) {
    const a = String(e.dataset.input || ""), o = String(e.dataset.q || ""), r = String(e.dataset.value || "");
    if (!a || !o) return;
    const l = ja(a), u = Array.isArray(l.selected[o]) ? l.selected[o] : [];
    e.dataset.multi === "1" ? l.selected[o] = u.includes(r) ? u.filter((y) => y !== r) : [...u, r] : l.selected[o] = [r], j();
  }
  async function qo(e) {
    if (!e || Kt.has(e)) return;
    const a = w.cards.get("input-" + e);
    if (!a) return;
    const o = gr(a, Wt.get(e) || {});
    if (!o) {
      L("先把每个问题都答一下", "error");
      return;
    }
    Kt.add(e), t.lastProgressAt = Date.now(), j();
    try {
      await b.respond(e, o, t.currentSession || ""), L("已回答");
    } catch (r) {
      Kt.delete(e), j(), L("提交失败：" + (r && r.message || "网络错误"), "error");
    }
  }
  function Mo(e, a) {
    if (e)
      if (e === "send")
        qe(t.draft);
      else if (e === "stuck-skip")
        la(!1);
      else if (e === "stuck-wait")
        t.stuckPrompt = !1, t.lastProgressAt = Date.now(), j();
      else if (e === "attach")
        n.pick && n.pick.click();
      else if (e === "stop")
        En();
      else if (e === "settings")
        $t();
      else if (e === "clear-cache") {
        if (a.dataset.confirm !== "1") {
          a.dataset.confirm = "1", a.textContent = "再点一次确认清理", window.setTimeout(() => {
            a.dataset.confirm = "", a.textContent = "清理缓存";
          }, 3e3);
          return;
        }
        a.dataset.confirm = "", a.textContent = "清理缓存", hn();
      } else if (e === "reset-app") {
        if (a.dataset.confirm !== "1") {
          a.dataset.confirm = "1", a.textContent = "再点一次确认恢复初始化", window.setTimeout(() => {
            a.dataset.confirm = "", a.textContent = "恢复初始化";
          }, 3e3);
          return;
        }
        a.dataset.confirm = "", a.textContent = "恢复初始化", fn();
      } else e === "back" ? ya() : e === "switch" ? t.sessionsOpen ? yt() : Xt() : e === "close-app" ? Vn() : e === "confirm-cancel" ? ne() : e === "confirm-ok" ? (ne(), Yn()) : e === "test" ? Xn() : e === "test-relay" ? to() : e === "save" ? eo() : e === "close-sheet" ? yt() : e === "new-session" ? Kn() : e === "close-new" ? Le() : e === "open-help" ? n.helpScrim && (n.helpScrim.hidden = !1) : e === "close-help" ? n.helpScrim && (n.helpScrim.hidden = !0) : e === "create-session" ? Qn() : e === "open-models" ? On() : e === "close-models" ? ae() : e === "apply-model" && Wn();
  }
  function Da(e) {
    const a = e.target;
    if (!(a instanceof Element)) return;
    if (a.matches('[data-role="tool-sheet"]')) {
      le();
      return;
    }
    const o = a.closest("[data-action]");
    if (o) {
      const h = o.dataset.action;
      if (h === "remove-attach") {
        $n(o.dataset.key || "");
        return;
      }
      if (h === "tool-copy") {
        const q = String(o.dataset.tool || ""), T = String(o.dataset.copy || ""), C = q ? w.cards.get(q) : null, W = T === "args" ? C && C.args : C && C.preview;
        W && i.clipboard && typeof i.clipboard.write == "function" && i.clipboard.write(String(W)).then(() => L("已复制")).catch(() => L("复制失败", "error"));
        return;
      }
      if (h === "tool-open") {
        const q = String(o.dataset.tool || "");
        q && go(q);
        return;
      }
      if (h === "close-tool-sheet") {
        le();
        return;
      }
      if (h === "tool-group-toggle") {
        const q = String(o.dataset.group || "");
        if (!q) return;
        Ft.has(q) ? Ft.delete(q) : Ft.add(q), j();
        return;
      }
      if (h === "approval-allow" || h === "approval-deny") {
        const q = String(o.dataset.approval || ""), T = q.startsWith("approval-") ? q.slice(9) : q;
        mn(T, h === "approval-allow");
        return;
      }
      if (h === "q-pick") {
        Ao(o);
        return;
      }
      if (h === "q-submit") {
        qo(String(o.dataset.input || ""));
        return;
      }
      if (h === "jump-bottom") {
        Ut(), je();
        return;
      }
      if (h === "search-messages") {
        Nn();
        return;
      }
      if (h === "close-search") {
        Me();
        return;
      }
      if (h === "search-jump") {
        Pn(String(o.dataset.key || ""));
        return;
      }
      if (h === "viewer-prev") {
        Be(-1);
        return;
      }
      if (h === "viewer-next") {
        Be(1);
        return;
      }
      if (h === "copy-message") {
        const q = o.closest(".chat-turn"), T = q ? q.querySelector(".chat-bubble") : null, C = T ? decodeURIComponent(T.dataset.copy || "") : "";
        C && Aa(C).then((W) => L(W ? "已复制这条消息" : "复制失败", W ? "" : "error"));
        return;
      }
      if (h === "copy-code") {
        const q = decodeURIComponent(o.dataset.code || "");
        q && Aa(q).then((T) => {
          if (!T) {
            L("复制失败", "error");
            return;
          }
          o.textContent = "已复制", window.setTimeout(() => {
            o.textContent = "复制";
          }, 1200);
        });
        return;
      }
      if (h === "resend-message") {
        const q = o.closest(".chat-turn"), T = q ? q.querySelector(".chat-bubble") : null, C = T ? decodeURIComponent(T.dataset.copy || "") : "";
        C && n.input && (t.draft = C, n.input.value = C, He(), n.input.focus(), L("已放进输入框，可改完再发"));
        return;
      }
      if (h === "toggle-acc") {
        $a(o.dataset.acc || "");
        return;
      }
      if (h === "pick-preset") {
        Gn("preset", o.dataset.scope || "settings", o.dataset.value || "");
        return;
      }
      if (h === "pick-permission") {
        t.formPermission = o.dataset.value || "", Bt();
        return;
      }
      if (h === "pick-mode") {
        t.mode = o.dataset.value || "auto", ba();
        return;
      }
      if (h === "pick-notify-mode") {
        t.notifyMode = o.dataset.value === "message" ? "message" : "turn", Gt(), jt(), xa();
        return;
      }
      if (h === "pick-model" || h === "pick-effort") {
        Fn(h === "pick-model" ? "model" : "effort", o.dataset.value || "", o.dataset.provider || "", o.dataset.scope || "model");
        return;
      }
      if (h === "pick-permission-current") {
        t.sessionPermission = String(o.dataset.value || ""), ee();
        return;
      }
      if (h === "session-menu") {
        Ln(o.dataset.session || "", o.dataset.title || "");
        return;
      }
      if (h === "toggle-session-search") {
        if (!n.sessionSearch) return;
        const q = n.sessionSearch.hidden;
        n.sessionSearch.hidden = !q, q ? n.sessionSearch.focus() : (n.sessionSearch.value = "", t.sessionQuery = "", Jt());
        return;
      }
      if (h === "session-rename") {
        zn();
        return;
      }
      if (h === "session-fork") {
        Bn();
        return;
      }
      if (h === "confirm-rename") {
        Cn();
        return;
      }
      if (h === "close-session-menu") {
        Ct();
        return;
      }
      if (h === "close-rename") {
        Ee();
        return;
      }
      if (h === "archive-session") {
        Rn(t.sessionMenuId, t.sessionMenuTitle);
        return;
      }
      if (h === "confirm-archive") {
        jn();
        return;
      }
      if (h === "close-archive") {
        te();
        return;
      }
      if (h === "toggle-archived") {
        t.showArchived = !t.showArchived, Jt();
        return;
      }
      if (h === "restore-session") {
        Dn(String(o.dataset.session || ""));
        return;
      }
      Mo(h, o);
      return;
    }
    const r = a.closest(".chat-link");
    if (r) {
      e.preventDefault(), ao(r.dataset.href || r.getAttribute("href") || "");
      return;
    }
    const l = a.closest(".chat-file");
    if (l) {
      if (e.preventDefault(), Date.now() - Ze < 500) return;
      no(l.dataset.fileUrl || "", l.dataset.fileName || "");
      return;
    }
    const u = a.closest(".chat-image");
    if (u) {
      if (Date.now() - Ze < 500) return;
      oo(qa(u), u);
      return;
    }
    const y = a.closest(".chat-image-fallback");
    if (y) {
      Eo(y);
      return;
    }
    const M = a.closest("[data-retry]");
    if (M) {
      e.preventDefault();
      const h = decodeURIComponent(M.dataset.retry || ""), q = M.parentElement ? M.parentElement.querySelector(".chat-bubble.is-error") : null;
      q && q.parentElement ? q.parentElement.remove() : M.remove(), qe(h, !0);
      return;
    }
    const B = a.closest("[data-session]");
    if (B) {
      e.preventDefault(), pa(B.dataset.session || "");
      return;
    }
    if (a === n.scrim) {
      yt();
      return;
    }
    if (a === n.newScrim) {
      Le();
      return;
    }
    if (a === n.modelScrim) {
      ae();
      return;
    }
    if (a === n.confirmScrim) {
      ne();
      return;
    }
    if (a === n.archiveScrim) {
      te();
      return;
    }
    if (n.viewer && !n.viewer.hidden) {
      if (et) {
        et = !1;
        return;
      }
      if (ct) return;
      se();
    }
  }
  function Ua(e) {
    const a = e.target;
    if (a instanceof HTMLInputElement && a.dataset.role === "q-custom") {
      const o = String(a.dataset.input || ""), r = String(a.dataset.q || "");
      o && r && (ja(o).custom[r] = a.value);
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "session-search") {
      t.sessionQuery = a.value, Jt();
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "new-title") {
      t.formTitle = a.value;
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "message-search") {
      t.searchQuery = a.value, ua();
      return;
    }
    a instanceof HTMLTextAreaElement && (t.draft = a.value, He());
  }
  function Ha(e) {
    e.target instanceof HTMLTextAreaElement && (e.isComposing || e.key === "Enter" && !e.shiftKey && (e.preventDefault(), qe(t.draft)));
  }
  function _a(e) {
    const a = e.target;
    a instanceof HTMLElement && (a === n.input ? (Ue(), Nt = null) : n.page && n.page.contains(a) && (Nt = a));
  }
  function Oa() {
    Nt = null;
  }
  function qt() {
    gt && gt.timer && window.clearTimeout(gt.timer), gt = null;
  }
  function Fa(e) {
  }
  function Wa(e) {
    gt && (Math.abs(e.clientX - gt.x) > 8 || Math.abs(e.clientY - gt.y) > 8) && qt();
  }
  function Ka(e) {
    const a = e.target;
    if (!(a instanceof HTMLImageElement) || !a.classList.contains("chat-image")) return;
    const o = a.getAttribute("src") || "";
    if (a.dataset.retried !== "1") {
      a.dataset.retried = "1", window.setTimeout(() => {
        try {
          const l = new URL(o);
          l.searchParams.set("_r", String(Date.now())), a.src = l.toString();
        } catch {
          a.src = o;
        }
      }, 900);
      return;
    }
    const r = document.createElement("button");
    r.type = "button", r.className = "chat-image-fallback", r.dataset.src = a.getAttribute("data-src") || o, r.textContent = "图片打不开 · 点按重试", a.replaceWith(r);
  }
  function Eo(e) {
    const a = e.dataset.src || "", o = document.createElement("img");
    o.className = "chat-image", o.alt = "图片", o.dataset.src = a;
    try {
      const r = new URL(a);
      r.searchParams.set("_r", String(Date.now())), o.src = r.toString();
    } catch {
      o.src = a;
    }
    e.replaceWith(o);
  }
  function Io() {
    rt(), Se(), lt();
  }
  function No() {
    t.view === "chat" && (X === "legacy" && zt(), we(!0), dt().then((e) => {
      !e || U || (X === "legacy" ? Lt() : xt(), bn());
    }));
  }
  So(), un(), ea(), pn(), i.watch && typeof i.watch.ensurePermission == "function" && i.watch.ensurePermission().catch(() => {
  }), jt(), c = To(), s.appendChild(c), $o(), c.addEventListener("click", Da), c.addEventListener("input", Ua), c.addEventListener("change", da), c.addEventListener("keydown", Ha), c.addEventListener("focusin", _a), c.addEventListener("focusout", Oa), c.addEventListener("pointerdown", Fa), c.addEventListener("pointermove", Wa), c.addEventListener("pointerup", qt), c.addEventListener("pointercancel", qt), c.addEventListener("error", Ka, !0), i.ui && typeof i.ui.onInsetsChange == "function" ? me = i.ui.onInsetsChange(Ra) : Ra(ko()), typeof i.on == "function" && (be = i.on("pause", Io), xe = i.on("resume", No)), j(!0), st(), za(), Ca(), Tt();
  const Oe = t.currentSession;
  Oe ? d.clearOthers(Oe).catch(() => {
  }).then(() => d.get(Oe)).then((e) => {
    U || w.size > 0 || e.length && (w.replaceEvents(e), t.booting = !1, t.hydrated = !1, j(!0));
  }).catch(() => {
  }) : (t.booting = !1, j(!0)), window.setTimeout(() => {
    U || !t.booting || (t.booting = !1, j(!0));
  }, 2500), t.uiChip && n.modelChip && (n.modelChip.textContent = t.uiChip, n.modelChip.hidden = !1);
  function Fe(e) {
    const a = c ? c.querySelector('[data-role="tool-sheet"]') : null;
    if (a && !a.hidden) {
      le(), e.detail.handled = !0;
      return;
    }
    if (n.confirmScrim && !n.confirmScrim.hidden) {
      ne(), e.detail.handled = !0;
      return;
    }
    if (n.modelScrim && !n.modelScrim.hidden) {
      ae(), e.detail.handled = !0;
      return;
    }
    if (n.newScrim && !n.newScrim.hidden) {
      Le(), e.detail.handled = !0;
      return;
    }
    if (n.helpScrim && !n.helpScrim.hidden) {
      n.helpScrim.hidden = !0, e.detail.handled = !0;
      return;
    }
    if (n.archiveScrim && !n.archiveScrim.hidden) {
      te(), e.detail.handled = !0;
      return;
    }
    if (n.searchScrim && !n.searchScrim.hidden) {
      Me(), e.detail.handled = !0;
      return;
    }
    if (n.renameScrim && !n.renameScrim.hidden) {
      Ee(), e.detail.handled = !0;
      return;
    }
    if (n.sessionMenu && !n.sessionMenu.hidden) {
      Ct(), e.detail.handled = !0;
      return;
    }
    if (n.scrim && !n.scrim.hidden) {
      t.drawerMode === "create" ? Zt("list") : yt(), e.detail.handled = !0;
      return;
    }
    if (n.viewer && !n.viewer.hidden) {
      se(), e.detail.handled = !0;
      return;
    }
    n.page && !n.page.hidden && (ya(), e.detail.handled = !0);
  }
  function Ga(e) {
    if (!e || e.source !== window.parent) return;
    const a = e.data;
    if (!a || a.type !== "docklet:back") return;
    const o = { handled: !1 };
    if (Fe({ detail: o }), !!o.handled)
      try {
        window.parent.postMessage({ type: "docklet:back-handled" }, "*");
      } catch {
      }
  }
  window.addEventListener("message", Ga), window.addEventListener("docklet:back", Fe), Ba(), dt(!0).then((e) => {
    if (!e || U) {
      zt();
      return;
    }
    we(!0), xt();
  }), va = window.setInterval(() => {
    !document.hidden && t.status !== "ok" && dt();
  }, 1e4), ka = window.setInterval(Tn, k), Sa = window.setInterval(Sn, 8e3), wa = window.setInterval(() => {
    !document.hidden && t.status === "ok" && dt();
  }, 6e4);
  const ue = () => {
    U || dt(!0);
  };
  return window.addEventListener("online", ue), window.addEventListener("offline", ue), function() {
    U = !0, rt(), Se(), lt(), window.removeEventListener("online", ue), window.removeEventListener("offline", ue), window.clearInterval(va), window.clearInterval(wa), window.clearInterval(ka), window.clearInterval(Sa), La(), window.clearTimeout(Ce), qt();
    for (const a of Ht) window.clearTimeout(a);
    Ht = [], window.clearTimeout(_), typeof me == "function" && me(), typeof be == "function" && be(), typeof xe == "function" && xe(), c.removeEventListener("click", Da), c.removeEventListener("input", Ua), c.removeEventListener("change", da), c.removeEventListener("keydown", Ha), c.removeEventListener("focusin", _a), c.removeEventListener("focusout", Oa), c.removeEventListener("pointerdown", Fa), c.removeEventListener("pointermove", Wa), c.removeEventListener("pointerup", qt), c.removeEventListener("pointercancel", qt), c.removeEventListener("error", Ka, !0), window.removeEventListener("message", Ga), window.removeEventListener("docklet:back", Fe), c.remove(), F && F.remove(), F = null, c = null, n = {};
  };
}
export {
  br as default
};
