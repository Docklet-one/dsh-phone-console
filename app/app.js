const Uo = '.chat-app,.chat-app *{box-sizing:border-box}.chat-app{--chat-bg: #eef2f6;--chat-text: #2a3038;--chat-muted: #6d7681;--chat-faint: #a8afb8;--chat-primary: #5b7f96;--chat-primary-deep: #4a6b80;--chat-danger: #b05d51;--chat-danger-soft: rgba(176, 93, 81, .13);--chat-line: rgba(40, 50, 60, .08);--chat-glass: rgba(255, 255, 255, .86);--chat-shadow: 0 8px 24px -18px rgba(30, 50, 60, .55);--chat-top: 0px;--chat-bottom: 0px;--chat-ime: 0px;--drawer-w: min(84vw, 340px);--drawer-top: 0px;position:relative;display:flex;flex-direction:column;height:100%;overflow:hidden;font-family:-apple-system,PingFang SC,Noto Sans SC,Microsoft YaHei,system-ui,sans-serif;color:var(--chat-text);background-color:var(--chat-bg);background-image:radial-gradient(120% 55% at 0% 0%,rgba(191,214,228,.55),transparent 62%),radial-gradient(100% 45% at 100% 0%,rgba(228,220,240,.42),transparent 58%),linear-gradient(180deg,#f7f9fb,#e9eef3);-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}.chat-top{position:relative;z-index:45;display:flex;flex:none;gap:10px;align-items:center;padding:calc(var(--chat-top) + 8px) 12px 8px 14px;background:#ffffffe6;border-bottom:1px solid var(--chat-line);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}.chat-heading{display:flex;flex:1;flex-direction:column;gap:2px;min-width:0}.chat-heading h1{margin:0;overflow:hidden;font-size:17px;font-weight:800;line-height:1.25;text-overflow:ellipsis;white-space:nowrap}.chat-model{align-self:flex-start;max-width:100%;padding:2px 8px;overflow:hidden;font:inherit;font-size:11px;line-height:1.4;color:var(--chat-muted);text-overflow:ellipsis;white-space:nowrap;cursor:pointer;background:#28323c0d;border:0;border-radius:8px}.chat-model[hidden]{display:none}.chat-head-sub{display:flex;gap:8px;align-items:center;min-width:0}.chat-status{display:inline-block;flex:none;width:10px;height:10px;background:var(--chat-faint);border-radius:50%}.chat-status[data-status=ok]{background:#3fae6a;box-shadow:0 0 0 3px #3fae6a2e}.chat-status[data-status=bad]{background:var(--chat-danger);box-shadow:0 0 0 3px #c8505029}.chat-status[data-status=checking]{background:#d0a352;box-shadow:0 0 0 3px #d0a35229}.chat-actions{display:flex;flex:none;gap:6px}.chat-icon{display:grid;width:34px;height:34px;padding:0;font:inherit;font-size:16px;line-height:1;color:var(--chat-muted);cursor:pointer;background:#28323c0b;border:0;border-radius:10px;place-items:center}.chat-icon:active{background:#28323c1a}.chat-icon svg{display:block;width:18px;height:18px}.chat-main{position:relative;display:flex;flex:1;flex-direction:column;min-height:0;overflow:hidden;padding-bottom:var(--chat-ime);transition:padding-bottom .16s ease-out}.chat-list{display:flex;flex:1;flex-direction:column;gap:12px;min-height:0;padding:12px 12px 6px;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.chat-load-spinner{position:absolute;top:calc(var(--chat-header-h, 64px) + 6px);left:50%;z-index:20;display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:1px solid var(--chat-line, #dfe4e9);border-radius:50%;background:#fffffff0;box-shadow:0 2px 8px -4px #00000059;transform:translate(-50%);pointer-events:none}.chat-load-spinner[hidden]{display:none}.chat-load-spinner span{width:12px;height:12px;border:2px solid #d5dbe1;border-top-color:#6d7681;border-radius:50%;animation:chat-spin .7s linear infinite}@keyframes chat-spin{to{transform:rotate(360deg)}}.chat-stuck{padding:12px 14px;border-color:#e7d8c8;background:#fffaf4}.chat-local-notice{margin:10px 0;padding:12px 14px;border:1px solid #e7d8c8;border-radius:14px;background:#fffaf4}.chat-local-notice.is-offline{border-color:#efd3bf;background:#fff7f1}.chat-local-notice-head{display:flex;align-items:center;gap:7px;color:#8a5a2b;font-size:13px}.chat-local-notice-head b{font-weight:600}.chat-local-notice p{margin:5px 0 0;color:#8a745d;font-size:12px;line-height:1.55}.chat-stuck-title{margin:0;color:#8a5a2b;font-size:13px;font-weight:600}.chat-stuck-text{margin:4px 0 10px;color:#8a745d;font-size:12px;line-height:1.5}.chat-stuck-btn{width:100%;padding:8px 12px;border:0;border-radius:8px;background:#9a6a3a;color:#fff;font:inherit;font-size:13px;cursor:pointer}.chat-stuck-actions{display:flex;gap:8px}.chat-stuck-actions .chat-stuck-btn{flex:1;width:auto}.chat-stuck-btn.is-danger{background:#b05d51}.chat-skeleton{display:flex;flex-direction:column;gap:10px;padding:6px 0}.chat-skeleton-meta,.chat-skeleton-bubble,.chat-skeleton-footer{background:linear-gradient(90deg,#28323c0f,#28323c1f,#28323c0f);background-size:200% 100%;border-radius:10px;animation:chat-skeleton-shimmer 1.4s ease-in-out infinite}.chat-skeleton-meta{width:84px;height:12px}.chat-skeleton-meta.is-right{align-self:flex-end}.chat-skeleton-bubble{width:100%;height:74px}.chat-skeleton-bubble.is-short{width:72%}.chat-skeleton-bubble.is-me{width:58%;height:38px;align-self:flex-end}.chat-skeleton-footer{width:100%;height:40px;border-radius:0 0 14px 14px}@keyframes chat-skeleton-shimmer{0%{background-position:100% 0}to{background-position:-100% 0}}.chat-history-limit{padding:10px 12px;margin:0 0 8px;border-radius:10px;background:#28323c0a;color:#8b7f70;font-size:12px;line-height:1.5;text-align:center}.chat-block{display:flex;flex-direction:column;min-width:0}.chat-turn{display:flex;flex-direction:column;gap:4px;width:100%}.chat-turn.is-me{align-items:flex-end}.chat-turn.is-ai{align-items:flex-start}.chat-meta{display:flex;gap:8px;align-items:center;font-size:10px;line-height:1.2;color:var(--chat-faint)}.chat-turn.is-me .chat-meta{flex-direction:row-reverse}.chat-avatar{display:grid;flex:none;width:36px;height:36px;font-size:19px;background:#ffffffeb;border-radius:11px;box-shadow:var(--chat-shadow);place-items:center}.chat-stamp{white-space:nowrap}.chat-bubble{position:relative;width:100%;max-width:100%;padding:9px 12px;font-size:15px;line-height:1.6;word-break:break-word;white-space:pre-wrap;border-radius:14px;user-select:text;-webkit-user-select:text;-webkit-touch-callout:default}.chat-bubble.is-me{width:fit-content;max-width:86%;color:#fff;background:var(--chat-primary);border-radius:14px;box-shadow:0 8px 18px -14px #2d5064e6}.chat-bubble.is-ai{width:100%;max-width:100%;color:var(--chat-text);background:var(--chat-glass);border-radius:14px;box-shadow:var(--chat-shadow);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.chat-bubble.is-me.has-images{width:86%}.chat-bubble.is-ai.has-images{width:100%}.chat-bubble.is-typing,.chat-bubble.is-streaming{width:100%;max-width:100%}.chat-bubble.is-typing{display:flex;flex-direction:column;justify-content:center;min-height:74px}.chat-bubble.is-typing:not(.is-streaming){box-sizing:border-box;width:100%;height:74px;min-height:74px;overflow:hidden}.chat-bubble.is-typing.is-thinking{box-sizing:border-box;height:74px;min-height:74px;overflow:hidden;align-items:stretch;justify-content:flex-start}.chat-bubble.is-thinking .chat-typing-head{width:100%;justify-content:flex-start}.chat-typing-head{display:flex;align-items:center;width:100%;min-width:0;height:20px;flex:none}.chat-typing-text{display:inline-block;overflow:hidden;font-size:13px;font-weight:600;line-height:20px;color:var(--chat-muted);text-overflow:ellipsis;white-space:nowrap}.chat-typing-detail{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;width:100%;height:34px;margin-top:2px;overflow:hidden;font-size:12px;line-height:17px;opacity:.72;word-break:break-all;flex:none}.chat-math-board{display:flex;flex:none;flex-direction:column;justify-content:space-between;width:100%;height:34px;margin-top:2px;overflow:hidden}.chat-math-row{position:relative;width:100%;height:17px}.chat-math-item{position:absolute;top:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;line-height:17px;letter-spacing:.03em;color:var(--chat-muted);opacity:.82;white-space:nowrap;font-variant-numeric:tabular-nums}.chat-typing-dot{display:inline-block;width:9px;height:9px;margin-left:8px;vertical-align:middle;flex:none;background:var(--chat-primary);border-radius:50%;box-shadow:0 0 #5b7f9659;animation:chat-breathe 1.8s ease-in-out infinite}.chat-bubble.is-stale .chat-typing-dot{background:var(--chat-faint);box-shadow:none;animation:none}@keyframes chat-breathe{0%,to{opacity:.5;transform:scale(.78);box-shadow:0 0 #5b7f9659}50%{opacity:1;transform:scale(1.18);box-shadow:0 0 0 7px #5b7f9600}}.chat-bubble.is-error{color:var(--chat-danger);background:var(--chat-danger-soft);border-radius:14px}.chat-retry{padding:5px 12px;font:inherit;font-size:12px;font-weight:700;color:var(--chat-danger);cursor:pointer;background:transparent;border:1px solid rgba(176,93,81,.36);border-radius:999px}.chat-sys{align-self:center;max-width:90%;padding:6px 10px;font-size:12.5px;line-height:1.5;color:var(--chat-muted);text-align:center;background:#ffffff8c;border-radius:10px}.chat-link{color:inherit;text-decoration:underline;text-underline-offset:2px;word-break:break-all}.chat-image{display:block;width:160px;height:120px;margin-bottom:6px;object-fit:cover;background:#28323c0f;border-radius:10px}.chat-image-fallback{display:flex;width:160px;height:120px;margin-bottom:6px;padding:0 10px;font:inherit;font-size:12px;line-height:1.4;color:var(--chat-muted);text-align:center;cursor:pointer;background:#28323c0d;border:1px dashed rgba(40,50,60,.16);border-radius:10px;align-items:center;justify-content:center}.chat-file{display:flex;gap:9px;align-items:center;width:100%;max-width:230px;padding:9px 10px;margin-bottom:6px;color:inherit;text-decoration:none;background:#28323c0f;border-radius:10px}.chat-bubble.is-me .chat-file{background:#ffffff2e}.chat-file-icon{display:grid;flex:none;width:30px;height:30px;font-size:15px;background:#ffffffc7;border-radius:8px;place-items:center}.chat-file-main{display:flex;flex:1;flex-direction:column;gap:1px;min-width:0}.chat-file-name{overflow:hidden;font-size:13px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}.chat-file-size{font-size:11px;color:var(--chat-muted)}.chat-bubble.is-me .chat-file-size{color:#ffffffbf}.chat-composer{display:flex;flex:none;flex-direction:column;gap:8px;align-items:stretch;padding:8px 12px calc(var(--chat-bottom) + 6px);background:#ffffffd6;border-top:1px solid var(--chat-line);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transition:padding-bottom .16s ease-out}.chat-input-row{display:flex;gap:8px;align-items:flex-end}.chat-plus{display:grid;flex:none;width:42px;height:42px;padding:0;font:inherit;font-size:24px;font-weight:500;line-height:1;color:var(--chat-muted);cursor:pointer;background:#28323c0f;border:0;border-radius:50%;place-items:center}.chat-plus:active{background:#28323c1f}.chat-attach{display:flex;gap:8px;padding:2px 2px 0;overflow-x:auto}.chat-attach[hidden]{display:none}.chat-chip{position:relative;display:grid;flex:none;width:60px;height:60px;overflow:hidden;background:#28323c0f;border-radius:12px;place-items:center}.chat-chip-thumb{width:100%;height:100%;object-fit:cover}.chat-chip-icon{font-size:24px}.chat-chip-x{position:absolute;top:3px;right:3px;width:20px;height:20px;padding:0;font:inherit;font-size:13px;line-height:20px;color:#fff;cursor:pointer;background:#0000008c;border:0;border-radius:50%}.chat-chip-state{position:absolute;right:0;bottom:0;left:0;padding:2px 0;font-size:10px;color:#fff;text-align:center;background:#0000008c}.chat-chip-state.is-bad{background:var(--chat-danger)}.chat-input{flex:1;min-height:42px;max-height:120px;padding:10px 14px;overflow-y:auto;font:inherit;font-size:15px;line-height:1.5;color:var(--chat-text);resize:none;background:#28323c0d;border:0;border-radius:18px;outline:0;user-select:text;-webkit-user-select:text}.chat-input::placeholder{color:var(--chat-faint)}.chat-send{display:grid;flex:none;width:44px;height:44px;padding:0;font:inherit;font-size:17px;font-weight:700;line-height:1;color:#fff;cursor:pointer;background:var(--chat-primary);border:0;border-radius:50%;place-items:center}.chat-send:active{background:var(--chat-primary-deep)}.chat-send.is-stop{background:var(--chat-danger)}.chat-chipgroup{display:flex;flex-wrap:wrap;gap:6px}.chat-opt{padding:6px 10px;font:inherit;font-size:12.5px;color:var(--chat-text);cursor:pointer;background:#28323c0f;border:0;border-radius:10px}.chat-opt[data-on="1"]{color:#fff;background:var(--chat-primary)}.chat-opt:active{opacity:.82}.chat-opt-desc{margin:0;font-size:12px;line-height:1.5;color:var(--chat-muted)}.chat-form{display:flex;flex-direction:column;gap:14px}.chat-form-block{display:flex;flex-direction:column;gap:7px}.chat-form .chat-sheet-sub,.chat-form .chat-opt-desc{margin:0}.chat-scrim.is-center{align-items:center;padding:0 24px calc(var(--chat-bottom) + var(--chat-ime))}.chat-dialog{width:100%;max-width:320px;padding:20px 16px 14px;background:#fff;border-radius:20px;box-shadow:0 18px 48px -20px #141e288c}.chat-dialog-title{margin:0;font-size:16px;font-weight:800;text-align:center}.chat-dialog-text{margin:8px 0 18px;font-size:13px;line-height:1.6;color:var(--chat-muted);text-align:center}.chat-dialog-actions{display:flex;gap:8px}.chat-dialog-actions .chat-btn{flex:1;height:44px}.chat-btn.is-danger{color:#fff;background:var(--chat-danger)}.chat-acc{overflow:hidden;background:var(--chat-glass);border-radius:16px;box-shadow:var(--chat-shadow)}.chat-acc-head{display:flex;gap:10px;align-items:center;width:100%;padding:15px 16px;font:inherit;color:var(--chat-text);text-align:left;cursor:pointer;background:none;border:0}.chat-acc-title{flex:none;font-size:14px;font-weight:700}.chat-acc-sum{flex:1;overflow:hidden;font-size:12px;color:var(--chat-muted);text-align:right;text-overflow:ellipsis;white-space:nowrap}.chat-acc-chevron{flex:none;font-size:16px;color:var(--chat-faint);transition:transform .15s ease}.chat-acc[data-open="1"] .chat-acc-chevron{transform:rotate(90deg)}.chat-acc-body{display:flex;flex-direction:column;gap:12px;padding:0 16px 16px}.chat-acc-body[hidden]{display:none}.chat-toggle{display:flex;gap:12px;align-items:center;justify-content:space-between;font-size:14px;color:var(--chat-text)}.chat-toggle input{position:relative;flex:none;width:46px;height:26px;cursor:pointer;background:#28323c29;border:0;border-radius:13px;outline:0;transition:background .15s ease;appearance:none;-webkit-appearance:none}.chat-toggle input:after{position:absolute;top:3px;left:3px;width:20px;height:20px;content:"";background:#fff;border-radius:50%;box-shadow:0 1px 3px #00000040;transition:transform .15s ease}.chat-toggle input:checked{background:var(--chat-primary)}.chat-toggle input:checked:after{transform:translate(20px)}.chat-page{position:absolute;top:var(--chat-header-h, 64px);right:0;bottom:0;left:0;z-index:15;display:flex;flex-direction:column;gap:14px;padding:10px 14px calc(var(--chat-bottom) + var(--chat-ime) + 18px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;background-color:var(--chat-bg);background-image:radial-gradient(120% 55% at 0% 0%,rgba(191,214,228,.55),transparent 62%),linear-gradient(180deg,#f7f9fb,#e9eef3)}.chat-page[hidden]{display:none}.chat-page>*{flex:none}.chat-back{display:inline-flex;gap:4px;align-items:center;align-self:flex-start;padding:4px 0;font:inherit;font-size:13px;font-weight:600;color:var(--chat-primary-deep);cursor:pointer;background:none;border:0}.chat-back-arrow{font-size:22px;font-weight:400;line-height:1}.chat-page h1{margin:0;font-size:24px;font-weight:800}.chat-sub{margin:-8px 0 0;font-size:13px;line-height:1.55;color:var(--chat-muted)}.chat-card{display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--chat-glass);border-radius:16px;box-shadow:var(--chat-shadow)}.chat-field{display:flex;flex-direction:column;gap:6px}.chat-field>span{font-size:13px;font-weight:600;color:var(--chat-muted)}.chat-field input{height:46px;padding:0 14px;font:inherit;font-size:15px;color:var(--chat-text);background:#28323c0d;border:0;border-radius:12px;outline:0;user-select:text;-webkit-user-select:text}.chat-acc[data-acc=server] .chat-acc-body{gap:10px;padding:0 14px 14px}.chat-acc[data-acc=server] .chat-field>span{font-size:12px}.chat-acc[data-acc=server] .chat-field input{height:40px;padding:0 12px;font-size:13.5px;border-radius:10px}.chat-acc[data-acc=server] .chat-field-state{font-size:11px}.chat-acc[data-acc=server] .chat-field-note{font-size:10px}.chat-acc[data-acc=server] .chat-sheet-sub{font-size:12px;font-weight:600;color:var(--chat-muted)}.chat-acc[data-acc=server] .chat-opt{padding:7px 11px;font-size:12.5px}.chat-acc[data-acc=server] .chat-chipgroup,.chat-acc[data-acc=relay] .chat-chipgroup{gap:10px}.chat-hint{margin:0;font-size:12px;line-height:1.5;color:var(--chat-faint)}.chat-btn{height:46px;padding:0 16px;font:inherit;font-size:14px;font-weight:700;color:var(--chat-text);cursor:pointer;background:#28323c12;border:0;border-radius:12px}.chat-btn.is-primary{color:#fff;background:var(--chat-primary)}.chat-btn.is-block{width:100%}.chat-test{margin:0;font-size:12.5px;line-height:1.5;color:var(--chat-muted)}.chat-test[data-tone=ok]{color:#4f9d7a}.chat-test[data-tone=bad]{color:var(--chat-danger)}.chat-selectable{word-break:break-all;user-select:text;-webkit-user-select:text}.chat-version{margin:4px 0 0;font-size:11px;color:var(--chat-faint);text-align:center}.chat-field-state{margin-left:6px;font-size:13px;font-style:normal;font-weight:700;color:var(--chat-faint)}.chat-net{display:flex;gap:8px;align-items:center;margin:0 0 6px;padding:6px 10px;font-size:12px;line-height:1.4;color:#7a5a12;background:#d98b1c24;border-radius:10px}.chat-net[hidden]{display:none}.chat-net[data-tone=bad]{color:#9a3a30;background:#c640371f}.chat-net-dot{flex:none;width:8px;height:8px;background:currentColor;border-radius:50%;animation:chat-net-pulse 1s ease-in-out infinite}.chat-net-text{flex:1 1 auto;min-width:0}.chat-net-note{flex:none;font-size:12px;opacity:.75}@keyframes chat-net-pulse{0%,to{opacity:1}50%{opacity:.3}}.chat-field-note{margin-left:6px;font-size:10.5px;font-style:normal;font-weight:400;color:var(--chat-faint)}.chat-field-state[data-tone=busy]{color:#d9821a;animation:chat-state-pulse 1.05s ease-in-out infinite}.chat-field-state[data-tone=ok]{color:#1f8a4c}.chat-field-state[data-tone=bad]{color:#c33d31}@keyframes chat-state-pulse{0%,to{opacity:1}50%{opacity:.3}}.chat-opt.is-test{border-style:dashed}.chat-opt.is-test[data-busy="1"]{color:var(--chat-primary-deep);background:#5b7f962e;border-color:var(--chat-primary);border-style:solid}.chat-btn.is-sticky{position:sticky;bottom:calc(6px + env(safe-area-inset-bottom,0px));z-index:4;margin-top:16px;box-shadow:0 -10px 14px -6px #e9e6e0f2}.chat-scrim[data-role=help] .chat-sheet{max-height:86vh;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));overflow:hidden}.chat-help{flex:1 1 auto;min-height:0;padding-right:2px;overflow-y:auto}.chat-help .chat-sheet-sub{margin:12px 0 4px}.chat-help .chat-sheet-sub:first-child{margin-top:0}.chat-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:40;display:flex;align-items:flex-end;justify-content:center;padding:0 10px calc(var(--chat-bottom) + var(--chat-ime) + 10px);background:#161c185c;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}.chat-scrim[hidden]{display:none}.chat-drawer-scrim{top:var(--drawer-top);align-items:stretch;justify-content:flex-start;padding:0;background:transparent}.chat-drawer{display:flex;flex-direction:column;width:var(--drawer-w);height:100%;overflow:hidden;background:#fff;box-shadow:18px 0 40px -30px #14283c99;transform:translate(-102%);transition:transform .24s cubic-bezier(.22,.8,.3,1)}.chat-app.is-drawer-open .chat-drawer{transform:none}.chat-app.is-drawer-open .chat-list,.chat-app.is-drawer-open .chat-composer,.chat-app.is-drawer-open .chat-jump{transform:translate(var(--drawer-w))}.chat-app.is-drawer-open [data-action=close-app]{visibility:hidden;pointer-events:none}.chat-list,.chat-composer,.chat-jump{transition:transform .24s cubic-bezier(.22,.8,.3,1)}.chat-drawer-pane{display:flex;flex:1;flex-direction:column;min-height:0}.chat-drawer-pane[hidden]{display:none}.chat-drawer-head{display:flex;flex:none;gap:8px;align-items:center;padding:16px 14px 8px}.chat-drawer-head .chat-sheet-title{flex:1;margin:0}.chat-drawer-pane>.chat-new{margin:0 14px 10px}.chat-drawer-tools{display:flex;flex:none;gap:8px;padding:14px 14px 10px}.chat-drawer-tool{display:inline-flex;flex:1;gap:4px;align-items:center;justify-content:center;min-width:0;padding:8px 4px;border:0;border-radius:10px;background:#5b7f9614;color:var(--chat-primary-deep);font:inherit;font-size:12.5px;white-space:nowrap}.chat-drawer-tool-icon{font-size:16px;line-height:1}.chat-drawer-tool-icon.is-search{font-size:20px}.chat-drawer .chat-drawer-search{flex:none;width:calc(100% - 40px);margin:0 20px 12px}.chat-drawer-pane [data-role=sheet-body]{flex:1;min-height:0;padding:0 14px;overflow-y:auto}.chat-drawer-pane .chat-sheet-list{max-height:none}.chat-drawer-foot,.chat-drawer-actions{flex:none;padding:10px 14px calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--chat-line)}.chat-drawer-pane .chat-form{flex:1;min-height:0;padding:0 14px;overflow-y:auto}@keyframes chat-drawer-in{0%{transform:translate(-100%)}to{transform:none}}.chat-sheet{display:flex;flex-direction:column;gap:8px;width:100%;max-width:420px;max-height:68vh;padding:14px;overflow-y:auto;background:#fff;border-radius:20px;box-shadow:0 -16px 48px -24px #141e2899}.chat-sheet-title{margin:0 0 2px;font-size:15px;font-weight:800;text-align:center}.chat-scrim[data-role=new-scrim] .chat-sheet{max-height:86vh;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));overflow:hidden}.chat-scrim[data-role=new-scrim] .chat-form{flex:1 1 auto;min-height:0;padding-right:2px;overflow-y:auto}.chat-new{display:flex;flex:none;align-items:center;justify-content:center;width:100%;height:44px;padding:0 14px;font:inherit;font-size:14px;font-weight:700;color:var(--chat-primary-deep);cursor:pointer;background:#5b7f9624;border:0;border-radius:12px}.chat-new:active{background:#5b7f963d}.chat-session{display:flex;gap:10px;align-items:center;width:100%;padding:11px 12px;font:inherit;font-size:14px;color:var(--chat-text);text-align:left;cursor:pointer;background:transparent;border:0;border-radius:12px}.chat-session[data-current="1"]{background:transparent}.chat-session[data-current="1"] .chat-session-label{font-weight:700;color:#3d5c6f}.chat-session-row{display:flex;align-items:stretch;gap:6px}.chat-session-row .chat-session{flex:1;min-width:0}.chat-session-more{flex:none;width:32px;border:0;border-radius:10px;background:transparent;color:var(--chat-muted);font:inherit;font-size:16px}.chat-archived-toggle{width:100%;margin:10px 0 4px;padding:8px;border:1px dashed var(--chat-line);border-radius:10px;background:transparent;color:var(--chat-muted);font:inherit;font-size:12px}.chat-session-row.is-archived .chat-session{opacity:.72}.chat-session-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.chat-session-time{flex:none;font-size:11px;color:var(--chat-faint)}.chat-sheet-tip{padding:10px 4px;font-size:13px;color:var(--chat-muted);text-align:center}.chat-viewer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:50;display:flex;padding:16px;background:#000000e6;align-items:center;justify-content:center}.chat-viewer[hidden]{display:none}.chat-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px}.chat-to-top{position:absolute;right:6px;bottom:6px;z-index:2;width:30px;height:30px;padding:0;font:inherit;font-size:14px;line-height:1;color:var(--chat-muted);cursor:pointer;background:#ffffffdb;border:0;border-radius:50%;box-shadow:0 4px 12px -6px #141e2859}.chat-toast{position:absolute;bottom:calc(var(--chat-ime) + 84px);left:50%;z-index:30;max-width:82%;padding:8px 14px;overflow:hidden;font-size:13px;color:#fff;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;background:#1e2830e0;border-radius:999px;opacity:0;transform:translate(-50%) translateY(6px);transition:opacity .18s ease,transform .18s ease}.chat-toast.is-on{opacity:1;transform:translate(-50%) translateY(0)}.chat-tool{flex:0 0 auto;align-self:stretch;margin:0;border:1px solid var(--chat-line);border-radius:10px;background:#ffffffa8;overflow:hidden}.chat-tool-head{display:flex;align-items:center;gap:6px;width:100%;padding:6px 9px;border:0;background:none;color:var(--chat-text);font:inherit;text-align:left}.chat-tool-group{flex:0 0 auto;align-self:stretch;border:1px solid var(--chat-line);border-radius:10px;background:#ffffffa8;overflow:hidden}.chat-tool-footer-block{margin-top:-12px}.chat-tool-footer-block .chat-tool-group,.chat-tool-footer-block .chat-tool-group.is-empty{margin-top:0;border:0;border-radius:0 0 14px 14px;background:var(--chat-glass);box-shadow:none;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.chat-block:has(+.chat-tool-footer-block) .chat-bubble.is-ai{border-bottom-left-radius:0;border-bottom-right-radius:0}.chat-tool-footer-block .chat-tool-group-head,.chat-tool-footer-block .chat-tool-group.is-empty .chat-tool-group-head{padding:6px 12px 8px;border-top:1px solid var(--chat-line)}.chat-tool-footer-block .chat-tool-group-title{font-weight:500}.chat-tool-footer-block .chat-tool-group-badge{padding:0;background:none;color:var(--chat-muted);font-size:11px}.chat-tool-footer-block .chat-tool-group-badge.is-failed{color:var(--chat-danger)}.chat-tool-footer-block .chat-tool-group.is-empty .chat-tool-group-head{color:var(--chat-faint);cursor:default}.chat-tool-group-head.is-static{cursor:default}.chat-tool-group-head{display:flex;align-items:center;gap:7px;width:100%;padding:7px 9px;border:0;background:none;color:var(--chat-text);font:inherit;font-size:12px;text-align:left}.chat-tool-group-icon{flex:none;font-size:13px}.chat-tool-group-title{flex:1;min-width:0;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chat-tool-group-badge{flex:none;padding:1px 6px;font-size:10.5px;color:var(--chat-muted);background:#28323c0f;border-radius:999px}.chat-tool-group-badge.is-failed{color:var(--chat-danger);background:var(--chat-danger-soft)}.chat-tool-group.is-open .chat-tool-chevron{transform:rotate(90deg)}.chat-tool-group-body{display:flex;flex-direction:column;gap:6px;padding:0 8px 8px}.chat-tool-group.is-open .chat-tool-group-body{max-height:300px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--chat-faint) transparent}.chat-tool-group-body::-webkit-scrollbar{width:4px}.chat-tool-group-body::-webkit-scrollbar-track{background:transparent}.chat-tool-group-body::-webkit-scrollbar-thumb{background:var(--chat-faint);border-radius:999px}.chat-tool-group-body[hidden]{display:none}.chat-tool-group-collapse{display:flex;width:100%;padding:8px;align-items:center;justify-content:center;border:0;border-top:1px solid var(--chat-line);background:#28323c08;color:var(--chat-muted);font:inherit;font-size:11.5px}.chat-tool-group-body .chat-tool{background:#ffffff80}.chat-tool-dot{width:7px;height:7px;flex:none;border-radius:50%;background:var(--chat-faint)}.chat-tool-index{flex:none;min-width:14px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;line-height:1;text-align:center;color:var(--chat-muted)}.chat-tool-index.is-ok{color:#4f9d7a}.chat-tool-index.is-failed{color:var(--chat-danger)}.chat-tool-index.is-running{color:var(--chat-primary)}.chat-tool.is-running .chat-tool-dot{background:var(--chat-primary);animation:chat-card-pulse 1.1s ease-in-out infinite}.chat-tool.is-ok .chat-tool-dot{background:#5f9a72}.chat-tool.is-failed .chat-tool-dot{background:var(--chat-danger)}.chat-tool-name{flex:none;font-size:12px;font-weight:600}.chat-tool-sum{flex:1;min-width:0;font-size:11.5px;color:var(--chat-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chat-tool-chevron{flex:none;color:var(--chat-faint);transition:transform .15s ease}.chat-tool.is-open .chat-tool-chevron{transform:rotate(90deg)}.chat-tool-group-body .chat-tool.is-open{border-color:#5b7f968c;background:#5b7f9614}.chat-tool.is-active,.chat-tool-group-body .chat-tool.is-active{position:relative;border-color:var(--chat-primary);background:#5b7f9624}.chat-tool.is-active:before,.chat-tool-group-body .chat-tool.is-active:before{position:absolute;top:0;bottom:0;left:0;width:3px;content:"";background:var(--chat-primary)}.chat-tool.is-active .chat-tool-name,.chat-tool-group-body .chat-tool.is-active .chat-tool-name{color:var(--chat-primary-deep);font-weight:700}.chat-tool-sheet{width:100%;max-width:520px;height:min(82vh,720px);max-height:82vh;gap:0;padding:0;overflow:hidden}.chat-tool-sheet-head{display:flex;flex:none;gap:8px;align-items:center;padding:12px 14px;border-bottom:1px solid var(--chat-line)}.chat-tool-sheet-head .chat-sheet-title{flex:1;margin:0;text-align:left}.chat-tool-sheet-body{flex:1;min-height:0;padding:12px 14px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--chat-faint) transparent}.chat-tool-sheet-body::-webkit-scrollbar{width:4px}.chat-tool-sheet-body::-webkit-scrollbar-thumb{background:var(--chat-faint);border-radius:999px}.chat-tool-sheet>.chat-btn{flex:none;margin:10px 14px calc(14px + env(safe-area-inset-bottom,0px))}.chat-tool-detail-head{display:flex;gap:7px;align-items:center;padding-bottom:10px;border-bottom:1px solid var(--chat-line)}.chat-tool-detail-head .chat-tool-name{font-size:13px}.chat-tool-detail .chat-tool-pre{max-height:none;overflow:visible;white-space:pre-wrap;word-break:break-word}.chat-tool-detail .chat-tool-preview{max-height:none;margin:0;padding:8px;overflow:visible;background:#28323c0a;border-radius:8px;white-space:pre-wrap;word-break:break-word}.chat-tool-code-head{display:flex;gap:8px;align-items:center;justify-content:space-between;margin:10px 0 6px;color:var(--chat-muted);font-size:11px}.chat-tool-copy{padding:2px 7px;border:1px solid var(--chat-line);border-radius:6px;background:transparent;color:var(--chat-muted);font:inherit;font-size:10.5px}.chat-tool-copy:active{color:var(--chat-text);background:#28323c0f}.chat-tool-body{padding:0 10px 10px;border-top:1px solid var(--chat-line)}.chat-tool-label{margin:8px 0 4px;font-size:10.5px;letter-spacing:.04em;color:var(--chat-muted)}.chat-tool-pre{margin:0;padding:8px;border-radius:8px;background:#28323c0b;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;max-height:180px;overflow:auto}.chat-tool-preview{margin:0;font-size:12px;line-height:1.55}.chat-tool-error{margin:6px 0 0;font-size:11.5px;color:var(--chat-danger)}.chat-card{align-self:stretch;margin:2px 0;padding:12px;border:1px solid var(--chat-line);border-radius:12px;background:var(--chat-glass);box-shadow:var(--chat-shadow)}.chat-approval.is-pending{border-color:#b05d5159}.chat-card-head{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600}.chat-card-icon{flex:none;font-size:13px}.chat-card-title{flex:1;min-width:0}.chat-card-badge{flex:none;padding:2px 7px;border-radius:999px;background:#28323c0f;font-size:10.5px;font-weight:600;color:var(--chat-muted)}.chat-deliverable-list{display:flex;flex-direction:column;gap:6px;margin-top:8px}.chat-deliverable .chat-file{max-width:none;margin:0}.chat-deliverable-media{display:flex;gap:10px;align-items:center}.chat-deliverable-media .chat-file{flex:1;min-width:0}.chat-deliverable-thumb{flex:none;width:76px;height:76px;margin:0;object-fit:cover;border-radius:8px}.chat-deliverable-download{flex:none;margin-left:auto;font-size:11px;color:var(--chat-primary-deep)}.chat-todo-list{display:flex;flex-direction:column;gap:6px;margin:8px 0 0;padding:0;list-style:none}.chat-todo-item{display:flex;gap:8px;align-items:flex-start;color:var(--chat-muted);font-size:12.5px;line-height:1.5}.chat-todo-mark{flex:none;width:14px;height:14px;margin-top:1px;border:1.5px solid var(--chat-line);border-radius:5px}.chat-todo-item.is-done{color:var(--chat-faint);text-decoration:line-through}.chat-todo-item.is-done .chat-todo-mark{border-color:#5f9a72;background:#5f9a72}.chat-todo-item.is-active{color:var(--chat-text)}.chat-todo-item.is-active .chat-todo-mark{border-color:var(--chat-primary);box-shadow:inset 0 0 0 3px #5b7f9638}.chat-plan-chip{align-self:flex-start;margin:4px 0;padding:4px 10px;border-radius:999px;background:#5b7f961f;color:var(--chat-primary-deep);font-size:11.5px}.chat-thinking{margin:0 0 6px;padding:6px 8px;border-radius:8px;background:#28323c0a;color:var(--chat-muted);font-size:11.5px}.chat-thinking summary{color:var(--chat-faint);font-size:11px;cursor:pointer}.chat-thinking-text{max-height:180px;margin-top:4px;overflow-y:auto;white-space:pre-wrap;word-break:break-word}.chat-card-badge.is-pending{background:var(--chat-danger-soft);color:var(--chat-danger)}.chat-card-badge.is-ok{background:#5f9a7229;color:#4d7f5d}.chat-card-badge.is-failed{background:var(--chat-danger-soft);color:var(--chat-danger)}.chat-card-time{flex:none;font-size:10.5px;color:var(--chat-faint)}.chat-card-sub{margin:6px 0 0;font-size:11.5px;color:var(--chat-muted)}.chat-card-text{margin:8px 0 0;font-size:12.5px;line-height:1.6}.chat-card-actions{display:flex;gap:8px;margin-top:12px}.chat-card-actions .chat-btn{flex:1}.chat-q+.chat-q{margin-top:12px;padding-top:12px;border-top:1px dashed var(--chat-line)}.chat-q-header{margin:0 0 4px;font-size:10.5px;letter-spacing:.04em;color:var(--chat-faint)}.chat-q-text{margin:0;font-size:13px;line-height:1.55}.chat-q-sub{margin:4px 0 0;font-size:11.5px;color:var(--chat-muted)}.chat-q-opts{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.chat-q-opt{display:flex;flex-direction:column;gap:2px;padding:7px 10px;border:1px solid var(--chat-line);border-radius:9px;background:#fff;color:var(--chat-text);font:inherit;font-size:12px;text-align:left}.chat-q-opt.is-on{border-color:var(--chat-primary);background:#5b7f961a}.chat-q-opt:disabled{opacity:.75}.chat-q-opt-desc{font-size:10.5px;color:var(--chat-muted)}.chat-q-custom{width:100%;margin-top:8px;padding:8px 10px;border:1px solid var(--chat-line);border-radius:9px;background:#fff;color:var(--chat-text);font:inherit;font-size:12px}.chat-q-custom-text{margin:8px 0 0;font-size:12px}.chat-jump{position:absolute;right:14px;bottom:calc(var(--chat-bottom) + var(--chat-ime) + 92px);z-index:3;width:34px;height:34px;border:1px solid var(--chat-line);border-radius:50%;background:var(--chat-glass);color:var(--chat-muted);box-shadow:var(--chat-shadow);font-size:15px}@keyframes chat-card-pulse{0%,to{opacity:1}50%{opacity:.35}}.chat-stream-text{white-space:pre-wrap;word-break:break-word}.chat-bubble.is-streaming .chat-typing-dot{display:inline-block;margin-left:5px;vertical-align:middle}.chat-sheet-search{width:100%;margin:4px 0 10px;padding:10px 12px;border:0;border-radius:10px;background:#28323c0d;color:var(--chat-text);font:inherit;font-size:13px;outline:none}.chat-sheet-search:focus,.chat-sheet-search:focus-visible{outline:none;box-shadow:none}.chat-sheet-list{max-height:46vh;overflow-y:auto;overscroll-behavior:contain}.chat-search-body{display:flex;flex-direction:column;gap:6px;max-height:44vh;overflow-y:auto;overscroll-behavior:contain}.chat-search-hit{display:flex;flex-direction:column;gap:3px;width:100%;padding:9px 10px;border:1px solid var(--chat-line);border-radius:10px;background:#fff;color:var(--chat-text);font:inherit;text-align:left}.chat-search-hit-head{font-size:10.5px;color:var(--chat-faint)}.chat-search-hit-text{font-size:12.5px;line-height:1.5;word-break:break-word}.chat-viewer{overflow:hidden;touch-action:none}.chat-viewer img{transition:transform .15s ease-out;will-change:transform}.chat-viewer-nav{position:absolute;top:50%;width:40px;height:40px;border:0;border-radius:50%;background:#ffffff24;color:#fff;font-size:24px;line-height:1;transform:translateY(-50%)}.chat-viewer-nav.is-prev{left:14px}.chat-viewer-nav.is-next{right:14px}.chat-viewer-count{position:absolute;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));padding:3px 10px;border-radius:999px;background:#00000059;color:#fff;font-size:11.5px;transform:translate(-50%)}.chat-bubble p{margin:0 0 8px}.chat-bubble p:last-child{margin-bottom:0}.chat-bubble h1,.chat-bubble h2,.chat-bubble h3,.chat-bubble h4{margin:4px 0 6px;font-size:14px;line-height:1.4}.chat-bubble ul,.chat-bubble ol{margin:0 0 8px;padding-left:20px}.chat-bubble li{margin:2px 0}.chat-bubble blockquote{margin:6px 0;padding:2px 10px;border-left:3px solid var(--chat-line);color:var(--chat-muted)}.chat-bubble hr{margin:10px 0;border:0;border-top:1px solid var(--chat-line)}.chat-inline-code{padding:1px 4px;border-radius:5px;background:#1e283012;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px}.chat-code{margin:6px 0;overflow:hidden;border:1px solid var(--chat-line);border-radius:10px;background:#fff}.chat-code-head{display:flex;align-items:center;justify-content:space-between;padding:3px 8px;background:#1e28300b;color:var(--chat-faint);font-size:10.5px}.chat-code-lang{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.chat-code-copy{padding:3px 6px;border:0;border-radius:6px;background:transparent;color:var(--chat-muted);font:inherit}.chat-code-copy:active{background:#1e28301a}.chat-code pre{margin:0;padding:10px;overflow-x:auto}.chat-code code{color:#24292f;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;line-height:1.55;white-space:pre}.tk-k{color:#8250df}.tk-s{color:#0a7d32}.tk-c{color:#8b949e}.tk-n{color:#0550ae}.chat-table-wrap{margin:6px 0;overflow-x:auto}.chat-bubble table{border-collapse:collapse;font-size:12px}.chat-bubble th,.chat-bubble td{padding:4px 8px;border:1px solid var(--chat-line);text-align:left}.chat-bubble th{background:#1e28300a}.chat-copy{margin-left:6px;padding:2px 4px;border:0;background:transparent;color:var(--chat-faint);font-size:10.5px}.chat-copy:active{color:var(--chat-text)}.chat-md-image{display:block;max-width:100%;max-height:420px;margin:6px 0;border-radius:10px;background:#00000008;object-fit:contain}.chat-md-gallery{display:grid;gap:6px;margin:6px 0}.chat-md-gallery .chat-md-image{width:100%;max-width:none;max-height:none;height:auto;margin:0;border-radius:10px;object-fit:cover}.chat-md-gallery.is-one{grid-template-columns:1fr}.chat-md-gallery.is-one .chat-md-image{width:auto;max-width:100%;max-height:360px;object-fit:contain}.chat-md-gallery.is-two{grid-template-columns:repeat(2,minmax(0,1fr))}.chat-md-gallery.is-two .chat-md-image{height:150px}.chat-md-gallery.is-few{grid-template-columns:repeat(2,minmax(0,1fr))}.chat-md-gallery.is-few .chat-md-image{height:120px}.chat-md-gallery.is-many{grid-template-columns:repeat(3,minmax(0,1fr))}.chat-md-gallery.is-many .chat-md-image{height:96px}', ft = "http://192.168.2.6:8788";
const Ve = "prefs.v1", Xa = "history.v1";
const Ut = {
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
function Oo(i) {
  return new Promise((c) => setTimeout(c, i));
}
function N(i) {
  return String(i ?? "").replace(/[&<>"]/g, (c) => c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;");
}
function I(i) {
  return N(i).replace(/'/g, "&#39;");
}
function ue(i) {
  return String(i ?? "").replace(/```[\s\S]*?```/g, (c) => c.replace(/```[a-z]*\n?/gi, "")).replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/__([^_]+)__/g, "$1").replace(/^#{1,6}\s+/gm, "").replace(/^\s*[-*]\s+/gm, "• ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
function Fo(i) {
  return i.replace(/(https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+)/gu, (c) => {
    const t = c.replace(/[).,;:!?'"”’）】》]+$/gu, ""), k = c.slice(t.length);
    return `<a class="chat-link" href="${I(t)}" data-href="${I(t)}" target="_blank" rel="noreferrer noopener">${t}</a>${k}`;
  });
}
function tn(i) {
  const c = Number(i) || 0;
  return c >= 1024 * 1024 ? (c / 1024 / 1024).toFixed(1) + " MB" : c >= 1024 ? Math.round(c / 1024) + " KB" : c + " B";
}
function Et(i) {
  const c = new Date(Number(i) || Date.now()), t = /* @__PURE__ */ new Date(), k = (v) => String(v).padStart(2, "0"), p = k(c.getHours()) + ":" + k(c.getMinutes());
  return c.toDateString() === t.toDateString() ? p : k(c.getMonth() + 1) + "-" + k(c.getDate()) + " " + p;
}
function vt(i) {
  return String(i || "").replace(/：/g, ":").replace(/[\u3000\s]+/g, "").replace(/\/+$/, "");
}
function Wo(i) {
  return String(i || "").replace(/\/+$/, "");
}
function Ko({ base: i, token: c }) {
  const t = () => Wo(i()) || ft, k = () => String(c() || "").trim();
  function p(T) {
    const b = Object.assign({}, T || {}), f = k();
    return f && (b.Authorization = "Bearer " + f), b;
  }
  function v() {
    return p({ "Content-Type": "application/json" });
  }
  function L(T) {
    const b = String(T || "");
    return /^https?:\/\//.test(b) ? b : t() + b;
  }
  async function A(T, b, f) {
    const h = new AbortController(), m = setTimeout(() => h.abort(), f || 8e3);
    try {
      return await fetch(L(T), Object.assign({}, b, { signal: h.signal }));
    } finally {
      clearTimeout(m);
    }
  }
  async function B(T, b, f) {
    const h = await A(T, b, f);
    if (!h.ok) {
      const m = await h.json().catch(() => ({})), x = new Error(m && m.error || "HTTP " + h.status);
      throw x.status = h.status, x.code = m && m.code || "", x;
    }
    return h.json();
  }
  function w(T, b, f) {
    return B(T, { method: "POST", headers: v(), body: JSON.stringify(b || {}) }, f);
  }
  function j(T, b, f) {
    const h = String(b ?? "").replace(/^file:/, ""), m = t() + "/" + T + "/" + encodeURIComponent(h), x = [], g = k();
    return g && x.push("token=" + encodeURIComponent(g)), f && x.push("name=" + encodeURIComponent(f)), x.length ? m + "?" + x.join("&") : m;
  }
  function H(T, b) {
    const f = [];
    Number.isFinite(Number(T)) && Number(T) > 0 && f.push("after=" + encodeURIComponent(T)), b && f.push("session=" + encodeURIComponent(b));
    const h = k();
    return h && f.push("token=" + encodeURIComponent(h)), t() + "/events" + (f.length ? "?" + f.join("&") : "");
  }
  return {
    baseUrl: t,
    authHeaders: p,
    authJson: v,
    fetchWithTimeout: A,
    fetchJson: B,
    assetUrl: j,
    eventsUrl: H,
    health: () => B("/health", { headers: p() }, 5e3),
    messages: ({ since: T = 0, recent: b = 5 } = {}) => B(T > 0 ? "/messages?since=" + T : "/messages?recent=" + b, { headers: p() }, 9e3),
    send: (T) => w("/send", T, 3e4),
    sessions: () => B("/sessions", { headers: p() }, 1e4),
    options: () => B("/options", { headers: p() }, 8e3),
    target: (T) => w("/target", { id: T }, 2e4),
    createSession: (T) => w("/new", T, 2e4),
    selectModel: (T) => w("/model", T, 1e4),
    setPermission: (T) => w("/permission", { preset: T }, 8e3),
    renameSession: (T, b) => w("/rename", { id: T, title: b }, 8e3),
    forkSession: (T, b) => w("/fork", b ? { id: T, atSeq: b } : { id: T }, 15e3),
    archiveSession: (T, b) => w("/session/archive", b ? { id: T, stopActivity: !0 } : { id: T }, 1e4),
    unarchiveSession: (T) => w("/session/unarchive", { id: T }, 8e3),
    presentedFileUrl: (T, b, f, h) => {
      const m = new URLSearchParams({ seq: String(T), index: String(b) });
      h && m.set("session", String(h));
      const x = k();
      return x && m.set("token", x), f && m.set("name", String(f)), t() + "/presented/file?" + m.toString();
    },
    stop: () => w("/stop", {}, 8e3),
    approvalDecision: (T, b) => w("/approvals", { id: T, decision: b ? "allow" : "deny" }, 5e3),
    respond: (T, b, f) => w("/respond", { id: T, answers: b, session: f }, 8e3),
    presence: (T, b) => w("/presence", b === void 0 ? { phone: !!T } : { phone: !!T, input: !!b }, 3e3),
    uploadImage: (T) => w("/upload-image", T, 6e4),
    uploadFile: (T) => w("/upload-file", T, 6e4),
    snapshot: (T, { turns: b = 0, before: f = 0 } = {}) => {
      const h = new URLSearchParams();
      T && h.set("session", T), b > 0 && h.set("turns", String(b)), f > 0 && h.set("before", String(f));
      const m = h.toString();
      return B("/snapshot" + (m ? "?" + m : ""), { headers: p() }, 9e3);
    }
  };
}
function Go(i) {
  const c = i || {}, t = c.code ? "（" + c.code + (c.status ? " " + c.status : "") + "）" : "", k = c.message ? "：" + c.message : "";
  return (c.hint || "执行失败") + t + k;
}
function Vo(i) {
  if (!i || !i.type) return null;
  const c = i.payload || {}, t = Number(i.seq), p = {
    who: "ai",
    text: "",
    at: Number(i.at) || Date.now(),
    images: [],
    files: [],
    reasoning: ""
  };
  if (Number.isFinite(t) && (p.seq = t), i.id && (p.eventId = String(i.id)), i.type === "message.user")
    p.who = "me", p.text = String(c.text || ""), p.images = Array.isArray(c.images) ? c.images : [], p.files = Array.isArray(c.files) ? c.files : [];
  else if (i.type === "message.assistant")
    p.text = String(c.text || ""), p.reasoning = String(c.reasoning || ""), p.images = Array.isArray(c.images) ? c.images : [], p.files = Array.isArray(c.files) ? c.files : [];
  else if (i.type === "message.error")
    p.who = "error", p.text = Go(c);
  else
    return null;
  return !p.text && p.images.length === 0 && p.files.length === 0 ? null : p;
}
function Yo() {
  const i = [], c = /* @__PURE__ */ new Map();
  let t = 0, k = -1;
  function p() {
    i.length = 0, c.clear(), t = 0, k = -1;
  }
  function v(b) {
    if (!b || !b.type) return !1;
    const f = b.payload || {}, h = Number(b.seq), m = (g) => g ? g.seq : Number.isFinite(h) ? h : 0, x = Number(b.at) || Date.now();
    if (b.type === "tool.update") {
      const g = String(f.callId || "");
      if (!g) return !1;
      const E = "tool-" + g, s = c.get(E);
      return c.set(E, {
        kind: "tool",
        id: E,
        callId: g,
        name: String(f.name || (s ? s.name : "")),
        summary: String(f.summary || (s ? s.summary : "")),
        args: String(f.args || (s ? s.args : "")),
        status: s && s.status !== "running" ? s.status : "running",
        preview: s ? s.preview : "",
        error: s ? s.error : null,
        images: s && Array.isArray(s.images) ? s.images : [],
        seq: s && s.provisional !== !0 ? s.seq : Number.MAX_SAFE_INTEGER,
        provisional: !0,
        at: s ? s.at : x
      }), !0;
    }
    if (b.type === "tool.start") {
      const g = String(f.callId || ""), E = "tool-" + (g || b.id), s = c.get(E);
      return c.set(E, {
        kind: "tool",
        id: E,
        callId: g,
        name: String(f.name || (s ? s.name : "")),
        summary: String(f.summary || (s ? s.summary : "")),
        args: String(f.args || (s ? s.args : "")),
        status: "running",
        preview: s ? s.preview : "",
        error: s ? s.error : null,
        images: s && Array.isArray(s.images) ? s.images : [],
        seq: s && s.provisional !== !0 ? s.seq : Number.isFinite(h) ? h : s ? s.seq : 0,
        provisional: !1,
        at: s ? s.at : x
      }), A(h), !0;
    }
    if (b.type === "tool.end") {
      const g = String(f.callId || ""), E = "tool-" + (g || b.id), s = c.get(E);
      return c.set(E, {
        kind: "tool",
        id: E,
        callId: g,
        name: s ? s.name : "",
        summary: s ? s.summary : "",
        args: s ? s.args : "",
        status: f.ok === !1 ? "failed" : "ok",
        preview: String(f.preview || (s ? s.preview : "")),
        error: f.error || (s ? s.error : null),
        images: Array.isArray(f.images) ? f.images : s && Array.isArray(s.images) ? s.images : [],
        seq: m(s),
        provisional: !1,
        at: s ? s.at : x
      }), A(h), !0;
    }
    if (b.type === "deliverable.present") {
      const g = String(f.callId || ""), E = (Array.isArray(f.files) ? f.files : []).filter(
        (D) => D && typeof D.path == "string" && D.path.trim()
      );
      if (E.length === 0) return !1;
      const s = "deliverable-" + (g || b.id || h), n = c.get(s);
      return c.set(s, {
        kind: "deliverable",
        id: s,
        callId: g,
        turn: Number(f.turn) || 0,
        files: E,
        seq: n && n.provisional !== !0 ? n.seq : Number.isFinite(h) ? h : n ? n.seq : 0,
        at: n ? n.at : x
      }), A(h), !0;
    }
    if (b.type === "approval.request") {
      const g = String(f.approvalId || "");
      if (!g) return !1;
      const E = "approval-" + g, s = c.get(E);
      return c.set(E, {
        kind: "approval",
        id: E,
        approvalId: g,
        title: String(f.title || (s ? s.title : "")),
        tool: String(f.tool || (s ? s.tool : "")),
        reason: String(f.reason || ""),
        callId: String(f.callId || ""),
        decision: "",
        outcome: "",
        seq: m(s),
        at: s ? s.at : x
      }), A(h), !0;
    }
    if (b.type === "approval.result") {
      const g = String(f.approvalId || "");
      if (!g) return !1;
      const E = "approval-" + g, s = c.get(E);
      return c.set(E, {
        kind: "approval",
        id: E,
        approvalId: g,
        title: s ? s.title : "",
        tool: String(f.tool || (s ? s.tool : "")),
        reason: String(f.reason || (s ? s.reason : "")),
        callId: s ? s.callId : "",
        decision: f.decision === "deny" ? "deny" : "allow",
        outcome: String(f.outcome || ""),
        seq: m(s),
        at: s ? s.at : x
      }), A(h), !0;
    }
    if (b.type === "input.request" || b.type === "input.result") {
      const g = String(f.callId || "");
      if (!g) return !1;
      const E = "input-" + g, s = c.get(E), n = Array.isArray(f.questions) ? f.questions : s ? s.questions : [];
      return b.type === "input.request" ? c.set(E, {
        kind: "input",
        id: E,
        callId: g,
        questions: n,
        state: String(f.state || (s ? s.state : "open")),
        answers: s ? s.answers : null,
        seq: m(s),
        at: s ? s.at : x
      }) : c.set(E, {
        kind: "input",
        id: E,
        callId: g,
        questions: n,
        state: "answered",
        answers: Array.isArray(f.answers) ? f.answers : [],
        seq: m(s),
        at: s ? s.at : x
      }), A(h), !0;
    }
    return !1;
  }
  function L() {
    t = i.reduce((b, f) => Math.max(b, Number(f && f.id) || 0), 0);
  }
  function A(b) {
    const f = Number(b);
    Number.isFinite(f) && f > k && (k = f);
  }
  function B(b) {
    const f = i.filter((h) => h.local);
    i.length = 0;
    for (const h of b) i.push(h);
    for (const h of f) i.push(h);
    L();
    for (const h of i) A(h.seq);
  }
  function w(b) {
    if (!b) return !1;
    if (b.id) {
      if (b.who === "me") {
        const f = i.find((h) => h.local && h.text === b.text && !h.id);
        if (f)
          return f.id = b.id, f.at = b.at || f.at, Number.isFinite(Number(b.seq)) && (f.seq = b.seq), f.local = !1, f.images = b.images || [], f.files = b.files || [], A(f.seq), L(), !0;
      }
      if (i.some((f) => f.id === b.id)) return !1;
    }
    return i.push(b), A(b.seq), L(), !0;
  }
  function j(b) {
    const f = v(b), h = Vo(b);
    if (!h)
      return A(b && b.seq), f;
    if (h.eventId && i.some((m) => m.eventId === h.eventId) || h.seq !== void 0 && i.some(
      (m) => m.seq === h.seq && m.who === h.who && m.text === h.text
    ))
      return A(h.seq), f;
    if (h.who === "me") {
      const m = i.find((x) => x.local && x.text === h.text);
      if (m)
        return m.eventId = h.eventId, m.at = h.at || m.at, m.seq = h.seq, m.local = !1, m.images = h.images, m.files = h.files, A(h.seq), !0;
    }
    return h.seq !== void 0 && h.who === "error" && i.some((m) => m.seq === h.seq && m.who === "error") ? (A(h.seq), f) : (i.push(h), A(h.seq), !0);
  }
  function H(b) {
    const f = i.filter((m) => m.local);
    i.length = 0, c.clear(), k = -1;
    for (const m of f) i.push(m);
    let h = f.length > 0;
    for (const m of [...b || []].sort((x, g) => Number(x.seq) - Number(g.seq)))
      j(m) && (h = !0);
    return h;
  }
  function T() {
    const b = [];
    for (const f of i)
      b.push({ kind: "message", message: f, seq: Number(f.seq) });
    for (const f of c.values()) b.push(f);
    return b.sort((f, h) => {
      const m = Number.isFinite(Number(f.seq)) ? Number(f.seq) : Number.MAX_SAFE_INTEGER, x = Number.isFinite(Number(h.seq)) ? Number(h.seq) : Number.MAX_SAFE_INTEGER;
      return m - x;
    }), b;
  }
  return {
    messages: i,
    cards: c,
    timeline: T,
    get cursor() {
      return t;
    },
    set cursor(b) {
      t = Number(b) || 0;
    },
    get lastSeq() {
      return k;
    },
    get size() {
      return i.length;
    },
    clear: p,
    replaceMessages: B,
    upsertMessage: w,
    upsertEvent: j,
    replaceEvents: H
  };
}
const en = "docklet-chat-cache", Mt = "events", pe = "meta", an = "schema", Qo = 2, Ye = 1, Xo = 600, he = 3;
function Jo() {
  try {
    return typeof indexedDB < "u" && indexedDB !== null;
  } catch {
    return !1;
  }
}
function Zo({ limit: i = Xo } = {}) {
  let c = null, t = 0;
  function k(h) {
    return new Promise((m, x) => {
      const g = h.transaction([pe, Mt], "readwrite"), E = g.objectStore(pe), s = E.get(an);
      s.onsuccess = () => {
        const n = s.result ? Number(s.result.value) : 0;
        n !== Ye && (n && n !== Ye && g.objectStore(Mt).clear(), E.put({ key: an, value: Ye }));
      }, g.oncomplete = () => m(), g.onerror = () => x(g.error || new Error("indexedDB schema failed"));
    });
  }
  function p() {
    return Jo() ? c || (c = new Promise((h, m) => {
      const x = indexedDB.open(en, Qo);
      x.onupgradeneeded = () => {
        const g = x.result;
        g.objectStoreNames.contains(Mt) || g.createObjectStore(Mt, { keyPath: "key" }).createIndex("session", "session", { unique: !1 }), g.objectStoreNames.contains(pe) || g.createObjectStore(pe, { keyPath: "key" });
      }, x.onsuccess = () => {
        const g = x.result;
        k(g).then(() => h(g)).catch(() => h(g));
      }, x.onerror = () => m(x.error || new Error("indexedDB open failed")), x.onblocked = () => m(new Error("indexedDB blocked"));
    }), c) : Promise.reject(new Error("no indexedDB"));
  }
  function v(h, m) {
    return p().then(
      (x) => new Promise((g, E) => {
        const s = x.transaction(Mt, h), n = s.objectStore(Mt);
        let D;
        try {
          D = m(n);
        } catch (W) {
          E(W);
          return;
        }
        s.oncomplete = () => g(D), s.onerror = () => E(s.error || new Error("indexedDB transaction failed")), s.onabort = () => E(s.error || new Error("indexedDB transaction aborted"));
      })
    );
  }
  function L(h) {
    return !!(h && (h.name === "QuotaExceededError" || h.code === 22 || /quota|storage/i.test(String(h.message || ""))));
  }
  function A(h) {
    return v("readwrite", (m) => {
      const x = m.index("session");
      return new Promise((g, E) => {
        const s = x.getAll(h);
        s.onsuccess = () => {
          const n = (s.result || []).sort((W, Y) => Number(W.seq) - Number(Y.seq)), D = n.slice(0, Math.max(1, Math.ceil(n.length / 2)));
          for (const W of D) m.delete(W.key);
          g(D.length);
        }, s.onerror = () => E(s.error);
      });
    });
  }
  function B(h, m) {
    const x = String(h || ""), g = (Array.isArray(m) ? m : []).filter((n) => n && n.id && Number.isFinite(Number(n.seq)));
    if (!x || g.length === 0) return Promise.resolve(0);
    const E = () => v("readwrite", (n) => {
      for (const D of g)
        n.put({ key: x + ":" + D.id, session: x, seq: Number(D.seq), event: D });
      return g.length;
    }), s = () => (t += g.length, t < 40 ? 0 : (t = 0, w(x)));
    return E().then(s).catch((n) => {
      if (!L(n)) throw n;
      return A(x).then(E).then(s).catch(() => 0);
    });
  }
  function w(h) {
    return v("readwrite", (m) => {
      const x = m.index("session");
      return new Promise((g, E) => {
        const s = x.getAll(h);
        s.onsuccess = () => {
          const n = (s.result || []).sort((_, K) => Number(_.seq) - Number(K.seq)), D = (() => {
            const _ = n.filter((K) => K.event && K.event.type === "turn.start").map((K) => Number(K.seq));
            return _.length ? _ : n.filter((K) => K.event && K.event.type === "message.user").map((K) => Number(K.seq));
          })(), W = D.length > he ? D[D.length - he] : 0;
          let Y = W > 0 ? n.filter((_) => Number(_.seq) >= W) : n;
          Y.length > i && (Y = Y.slice(Y.length - i));
          const U = new Set(Y.map((_) => _.key)), V = n.filter((_) => !U.has(_.key));
          for (const _ of V) m.delete(_.key);
          g(V.length);
        }, s.onerror = () => E(s.error);
      });
    });
  }
  function j(h) {
    const m = String(h || "");
    return m ? v("readwrite", (x) => {
      const g = x.index("session");
      return new Promise((E, s) => {
        const n = g.openCursor();
        let D = 0;
        n.onsuccess = () => {
          const W = n.result;
          if (!W) {
            E(D);
            return;
          }
          W.value && W.value.session !== m && (W.delete(), D += 1), W.continue();
        }, n.onerror = () => s(n.error);
      });
    }) : Promise.resolve(0);
  }
  function H(h) {
    const m = String(h || "");
    return m ? v("readonly", (x) => {
      const g = x.index("session");
      return new Promise((E, s) => {
        const n = g.getAll(m);
        n.onsuccess = () => {
          const D = (n.result || []).sort((V, _) => Number(V.seq) - Number(_.seq)), W = (() => {
            const V = D.filter((_) => _.event && _.event.type === "turn.start").map((_) => Number(_.seq));
            return V.length ? V : D.filter((_) => _.event && _.event.type === "message.user").map((_) => Number(_.seq));
          })(), Y = W.length > he ? W[W.length - he] : 0;
          let U = Y > 0 ? D.filter((V) => Number(V.seq) >= Y) : D;
          U.length > i && (U = U.slice(U.length - i)), E(U.map((V) => V.event).filter(Boolean));
        }, n.onerror = () => s(n.error);
      });
    }) : Promise.resolve([]);
  }
  function T(h) {
    const m = String(h || "");
    return v("readwrite", (x) => {
      const g = x.index("session");
      return new Promise((E, s) => {
        const n = g.getAllKeys(m);
        n.onsuccess = () => {
          for (const D of n.result || []) x.delete(D);
          E(!0);
        }, n.onerror = () => s(n.error);
      });
    });
  }
  function b() {
    return v("readwrite", (h) => (h.clear(), !0));
  }
  function f() {
    return (async () => {
      if (c) {
        try {
          const m = await c;
          m && typeof m.close == "function" && m.close();
        } catch {
        }
        c = null;
      }
    })().then(
      () => new Promise((m) => {
        try {
          const x = indexedDB.deleteDatabase(en);
          x.onsuccess = x.onerror = x.onblocked = () => m(!0);
        } catch {
          m(!1);
        }
      })
    );
  }
  return { put: B, get: H, clear: T, clearAll: b, clearOthers: j, destroy: f };
}
function tr({ appId: i, base: c, token: t, notify: k, mode: p = "turn" }) {
  const v = {
    id: i,
    endpoint: String(c) + "/health",
    token: t || "",
    intervalMs: 2500,
    enabled: k !== !1,
    openApp: i,
    suppressApp: i,
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
function cn(i, c) {
  return /^https?:\/\//i.test(c) ? /^https:/i.test(c) ? `<img class="chat-image chat-md-image" src="${I(c)}" alt="${I(i)}" loading="lazy" referrerpolicy="no-referrer" />` : `<img class="chat-image chat-md-image" data-remote="${I(c)}" alt="${I(i)}" />` : N(i);
}
function wt(i) {
  const c = String(i ?? "");
  let t = "", k = 0;
  const p = /!\[([^\]]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)|`([^`\n]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|~~([^~]+)~~|\[([^\]]+)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)|(https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+)/gu;
  let v;
  for (; v = p.exec(c); ) {
    if (t += N(c.slice(k, v.index)), k = v.index + v[0].length, v[1] !== void 0) {
      t += cn(v[1], v[2]);
      continue;
    }
    if (v[3] !== void 0) {
      t += `<code class="chat-inline-code">${N(v[3])}</code>`;
      continue;
    }
    if (v[4] !== void 0) {
      t += `<strong>${N(v[4])}</strong>`;
      continue;
    }
    if (v[5] !== void 0) {
      t += `<strong>${N(v[5])}</strong>`;
      continue;
    }
    if (v[6] !== void 0) {
      t += `<em>${N(v[6])}</em>`;
      continue;
    }
    if (v[7] !== void 0) {
      t += `<del>${N(v[7])}</del>`;
      continue;
    }
    if (v[8] !== void 0) {
      const w = v[8], j = v[9];
      t += er.test(j) ? `<a class="chat-link" href="${I(j)}" data-href="${I(j)}" target="_blank" rel="noreferrer noopener">${N(w)}</a>` : N(w);
      continue;
    }
    const L = v[10], A = L.replace(/[).,;:!?'"”’）】》]+$/gu, ""), B = L.slice(A.length);
    t += `<a class="chat-link" href="${I(A)}" data-href="${I(A)}" target="_blank" rel="noreferrer noopener">${N(A)}</a>${N(B)}`;
  }
  return t += N(c.slice(k)), t;
}
function nr(i, c) {
  const t = ar[String(c || "").toLowerCase()] || "", k = String(i ?? "");
  if (t === "json" || !nn[t])
    return { html: N(k), lang: t || String(c || "").toLowerCase() };
  const p = t === "js" || t === "ts" ? String.raw`(\/\*[\s\S]*?\*\/|\/\/[^\n]*)` : String.raw`(#[^\n]*)`, v = new RegExp(
    p + String.raw`|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|` + "`(?:\\\\[\\s\\S]|[^`\\\\])*`)",
    "g"
  ), L = [];
  let A = k.replace(v, (w) => (L.push(w), `\0${"z".repeat(L.length)}\0`));
  A = N(A);
  const B = nn[t].split(/\s+/);
  return A = A.replace(
    /\b([A-Za-z_$][\w$]*)\b/g,
    (w) => B.includes(w) ? `<span class="tk-k">${w}</span>` : w
  ), A = A.replace(/\b\d+(?:\.\d+)?\b/g, (w) => `<span class="tk-n">${w}</span>`), A = A.replace(/\u0000(z+)\u0000/g, (w, j) => {
    const H = L[j.length - 1] || "";
    return `<span class="${H.startsWith("/") || H.startsWith("#") ? "tk-c" : "tk-s"}">${N(H)}</span>`;
  }), { html: A, lang: t };
}
function or(i, c) {
  const t = nr(i, c), k = t.lang || "code";
  return `<div class="chat-code"><div class="chat-code-head"><span class="chat-code-lang">${N(k)}</span><button type="button" class="chat-code-copy" data-action="copy-code" data-code="${I(encodeURIComponent(i))}">复制</button></div><pre><code>${t.html}</code></pre></div>`;
}
function ln(i, c) {
  if (c + 1 >= i.length || !/^\s*\|.*\|\s*$/.test(i[c])) return !1;
  const t = i[c + 1];
  return /^\s*\|?[\s:|-]+\|?\s*$/.test(t) && t.includes("-");
}
function on(i) {
  return i.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((t) => t.trim());
}
function rr(i, c) {
  const t = i[c];
  return /^\s*```/.test(t) || /^(#{1,6})\s+/.test(t) || /^\s*>\s?/.test(t) || /^\s*[-*+]\s+/.test(t) || /^\s*\d+[.)]\s+/.test(t) || /^\s*([-*_])(?:\s*\1){2,}\s*$/.test(t) || ln(i, c);
}
function rn(i, c, t) {
  const k = [], p = t ? /^\s*\d+[.)]\s+(.*)$/ : /^\s*[-*+]\s+(.*)$/;
  let v = c;
  for (; v < i.length; ) {
    const L = p.exec(i[v]);
    if (!L) {
      if (k.length > 0 && /^\s{2,}\S/.test(i[v])) {
        k[k.length - 1] += " " + i[v].trim(), v += 1;
        continue;
      }
      break;
    }
    k.push(L[1]), v += 1;
  }
  return { items: k, next: v };
}
const Qe = /^\s*!\[([^\]]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)\s*$/;
function sr(i) {
  const c = i.length;
  return `<div class="chat-md-gallery ${c === 1 ? "is-one" : c === 2 ? "is-two" : c >= 5 ? "is-many" : "is-few"}" data-count="${c}">${i.map((k) => cn(k.alt, k.src)).join("")}</div>`;
}
function dn(i) {
  const t = String(i ?? "").replace(/\r\n?/g, `
`).split(`
`), k = [];
  let p = 0;
  for (; p < t.length; ) {
    const v = t[p];
    if (!v.trim()) {
      p += 1;
      continue;
    }
    const L = /^\s*```(.*)$/.exec(v);
    if (L) {
      const w = L[1].trim().split(/\s+/)[0] || "", j = [];
      for (p += 1; p < t.length && !/^\s*```\s*$/.test(t[p]); )
        j.push(t[p]), p += 1;
      p < t.length && (p += 1), k.push(or(j.join(`
`), w));
      continue;
    }
    const A = /^(#{1,6})\s+(.+?)\s*$/.exec(v);
    if (A) {
      const w = A[1].length;
      k.push(`<h${w}>${wt(A[2])}</h${w}>`), p += 1;
      continue;
    }
    if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(v)) {
      k.push("<hr />"), p += 1;
      continue;
    }
    if (/^\s*>\s?/.test(v)) {
      const w = [];
      for (; p < t.length && /^\s*>\s?/.test(t[p]); )
        w.push(t[p].replace(/^\s*>\s?/, "")), p += 1;
      k.push(`<blockquote>${w.map(wt).join("<br />")}</blockquote>`);
      continue;
    }
    if (/^\s*[-*+]\s+/.test(v)) {
      const w = rn(t, p, !1);
      k.push(`<ul>${w.items.map((j) => `<li>${wt(j)}</li>`).join("")}</ul>`), p = w.next;
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(v)) {
      const w = rn(t, p, !0);
      k.push(`<ol>${w.items.map((j) => `<li>${wt(j)}</li>`).join("")}</ol>`), p = w.next;
      continue;
    }
    if (ln(t, p)) {
      const w = on(t[p]);
      p += 2;
      const j = [];
      for (; p < t.length && /^\s*\|.*\|\s*$/.test(t[p]); )
        j.push(on(t[p])), p += 1;
      k.push(
        `<div class="chat-table-wrap"><table><thead><tr>${w.map((H) => `<th>${wt(H)}</th>`).join("")}</tr></thead><tbody>${j.map((H) => `<tr>${H.map((T) => `<td>${wt(T)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
      );
      continue;
    }
    if (Qe.test(v)) {
      const w = [];
      for (; p < t.length; ) {
        const j = Qe.exec(t[p]);
        if (j) {
          w.push({ alt: j[1], src: j[2] }), p += 1;
          continue;
        }
        if (!t[p].trim()) {
          let H = p;
          for (; H < t.length && !t[H].trim(); ) H += 1;
          if (H < t.length && Qe.test(t[H])) {
            p = H;
            continue;
          }
        }
        break;
      }
      if (w.length > 0) {
        k.push(sr(w));
        continue;
      }
    }
    const B = [];
    for (; p < t.length && t[p].trim() && !rr(t, p); )
      B.push(t[p]), p += 1;
    B.length === 0 && (B.push(t[p]), p += 1), k.push(`<p>${B.map(wt).join("<br />")}</p>`);
  }
  return k.join("");
}
function ir(i) {
  return i ? i.eventId ? String(i.eventId) : i.id ? "id" + i.id : Number.isFinite(Number(i.seq)) ? "s" + i.seq : "" : "";
}
function sn(i, c) {
  const t = ir(i), k = t ? ` data-mid="${I(t)}"` : "";
  if (i.who === "sys")
    return `<div class="chat-sys">${Fo(N(ue(i.text)))}</div>`;
  if (i.who === "error") {
    const m = i.retryText ? `<button type="button" class="chat-retry" data-retry="${I(encodeURIComponent(i.retryText))}">点按重试</button>` : "";
    return `<div class="chat-turn is-ai"${k}>${m}<div class="chat-bubble is-error" data-copy="${I(encodeURIComponent(ue(i.text)))}">${N(ue(i.text))}</div></div>`;
  }
  const p = i.who === "me", v = Array.isArray(i.images) ? i.images : [], L = Array.isArray(i.files) ? i.files : [], A = v.length ? `<div class="chat-md-gallery ${v.length === 1 ? "is-one" : v.length === 2 ? "is-two" : v.length >= 5 ? "is-many" : "is-few"}" data-count="${v.length}">${v.map((m) => {
    const x = String(m.id || "").startsWith("local:") ? String(m.src || "") : "";
    if (x) return `<img class="chat-image chat-md-image" src="${I(x)}" alt="图片" />`;
    const g = c("image", m.id);
    return `<img class="chat-image chat-md-image" data-src="${I(g)}" alt="图片" />`;
  }).join("")}</div>` : "", B = L.map((m) => {
    const x = m.name || "文件";
    if (String(m.id || "").startsWith("local:"))
      return `<div class="chat-file"><span class="chat-file-icon">📦</span><span class="chat-file-main"><span class="chat-file-name">${N(x)}</span><span class="chat-file-size">${tn(m.size)} · 发送中</span></span></div>`;
    const g = c("file", m.id, x);
    return `<a class="chat-file" href="${I(g)}" data-file-url="${I(g)}" data-file-name="${I(x)}" download="${I(x)}">
          <span class="chat-file-icon">📦</span>
          <span class="chat-file-main">
            <span class="chat-file-name">${N(x)}</span>
            <span class="chat-file-size">${tn(m.size)} · 点按下载</span>
          </span>
        </a>`;
  }).join(""), w = i.text ? dn(i.text) : "", j = i.reasoning ? `<details class="chat-thinking"><summary>思考过程</summary><div class="chat-thinking-text">${N(i.reasoning)}</div></details>` : "", H = i.pending ? " is-typing" : "", T = `<div class="chat-bubble ${p ? "is-me" : "is-ai"}${H}${v.length ? " has-images" : ""}" data-copy="${I(encodeURIComponent(ue(i.text || "")))}">${A}${B}${j}${w}</div>`, b = !i.pending && i.text ? '<button type="button" class="chat-copy" data-action="copy-message" aria-label="复制这条消息">复制</button>' : "", f = p && !i.pending && i.text ? '<button type="button" class="chat-copy chat-resend" data-action="resend-message" aria-label="放进输入框重发">重发</button>' : "", h = `<div class="chat-meta"><span class="chat-avatar">${p ? "🙂" : "🤖"}</span><span class="chat-stamp">${Et(i.at)}</span>${b}${f}</div>`;
  return `<div class="chat-turn ${p ? "is-me" : "is-ai"}"${k}>${h}${T}</div>`;
}
function cr(i, c) {
  const t = I(i.id || ""), k = i.title || (i.blank ? "新对话" : "未命名对话"), p = N(k), v = i.id === c ? "✓ " : "", L = i.running ? "运行中" : i.online ? "在线" : "", A = Et(i.at);
  return `<div class="chat-session-row">
            <button type="button" class="chat-session" data-session="${t}" data-current="${i.id === c ? "1" : "0"}">
              <span class="chat-session-label">${v}${p}</span>
              <span class="chat-session-time">${L ? N(L) + " · " : ""}${A}</span>
            </button>
            <button type="button" class="chat-session-more" data-action="session-menu" data-session="${t}" data-title="${I(k)}" aria-label="会话操作">⋯</button>
          </div>`;
}
function Xe(i) {
  return i ? `<span class="chat-card-time">${Et(i)}</span>` : "";
}
function lr(i, c, t = null, k = 0, p = !1) {
  const v = i.status === "failed" ? "is-failed" : i.status === "ok" ? "is-ok" : "is-running", L = i.name || "工具", A = i.summary || "", B = Number(k) || 0, w = B ? `<span class="chat-tool-index ${v}">${B}</span>` : '<span class="chat-tool-dot" aria-hidden="true"></span>';
  return `<div class="chat-tool ${v}${p ? " is-active" : ""}" data-tool="${I(i.id)}">
    <button type="button" class="chat-tool-head" data-action="tool-open" data-tool="${I(i.id)}">
      ${w}
      <span class="chat-tool-name">${N(L)}</span>
      ${A ? `<span class="chat-tool-sum">${N(A)}</span>` : ""}
      <span class="chat-tool-chevron" aria-hidden="true">›</span>
    </button>
  </div>`;
}
function dr(i, c = null) {
  const t = i.status === "failed" ? "is-failed" : i.status === "ok" ? "is-ok" : "is-running", k = i.name || "工具", p = i.summary || "", v = !!(i.preview || i.error), L = (w) => `<button type="button" class="chat-tool-copy" data-action="tool-copy" data-tool="${I(i.id)}" data-copy="${w}">复制</button>`, A = [
    i.preview ? `<div class="chat-tool-code-head"><span>结果</span>${L("preview")}</div><pre class="chat-tool-preview">${N(i.preview)}</pre>` : "",
    i.error ? `<p class="chat-tool-label">错误</p><p class="chat-tool-error">${N([i.error.name, i.error.code, i.error.reason].filter(Boolean).join(" · "))}</p>` : "",
    v ? "" : '<p class="chat-tool-preview">没有输出</p>'
  ].join(""), B = i.args ? `<div class="chat-tool-code-head"><span>参数</span>${L("args")}</div><pre class="chat-tool-pre">${N(i.args)}</pre>` : "";
  return `<div class="chat-tool-detail ${t}">
    <div class="chat-tool-detail-head">
      <span class="chat-tool-dot" aria-hidden="true"></span>
      <span class="chat-tool-name">${N(k)}</span>
      ${p ? `<span class="chat-tool-sum">${N(p)}</span>` : ""}
    </div>
    ${A}
    ${B}
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
function pr(i, c, t, k = null, p = {}) {
  const v = Number.isFinite(Number(p.total)) ? Number(p.total) : i.length, L = i.filter((b) => b.status === "failed").length, A = Number(p.running) || 0, B = L > 0 ? `${L} 次失败` : A > 0 ? "执行中" : "已完成", w = "group-" + (i[0] ? i[0].id : "current"), j = i.map((b, f) => lr(b, !1, k, f + 1, b.id === p.activeId)).join(""), H = c && v > 3 ? `<button type="button" class="chat-tool-group-collapse" data-action="tool-group-toggle" data-group="${I(w)}">收起工具列表</button>` : "", T = i.length ? `<button type="button" class="chat-tool-group-head" data-action="tool-group-toggle" data-group="${I(w)}" aria-expanded="${c ? "true" : "false"}">
        <span class="chat-tool-group-icon" aria-hidden="true">🧰</span>
        <span class="chat-tool-group-title">本轮 ${v} 次工具调用</span>
        <span class="chat-tool-group-badge${L > 0 ? " is-failed" : ""}">${B}</span>
        <span class="chat-tool-chevron" aria-hidden="true">›</span>
      </button>` : `<div class="chat-tool-group-head is-static">
        <span class="chat-tool-group-icon" aria-hidden="true">🧰</span>
        <span class="chat-tool-group-title">本轮 ${v} 次工具调用</span>
        <span class="chat-tool-group-badge${L > 0 ? " is-failed" : ""}">${B}</span>
      </div>`;
  return `<div class="chat-tool-group${c ? " is-open" : ""}" data-group="${I(w)}">
    ${T}
    <div class="chat-tool-group-body"${c && j ? "" : " hidden"}>${j}</div>
    ${H}
  </div>`;
}
function hr(i, c) {
  const t = Array.isArray(i.files) ? i.files : [], k = t.map((p, v) => {
    const L = String(p.path || "").split(/[\\/]/).pop() || "文件", A = typeof c == "function" ? c(i.seq, v, L) : "", B = /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(L), w = `<a class="chat-file chat-deliverable-file" href="${I(A)}" data-file-url="${I(A)}" data-file-name="${I(L)}" download="${I(L)}">
        <span class="chat-file-icon">${B ? "🖼" : "📄"}</span>
        <span class="chat-file-main">
          <span class="chat-file-name">${N(L)}</span>
          <span class="chat-file-size">${N(p.description || (B ? "点图预览 · 点此下载" : "点按下载"))}</span>
        </span>
        ${B ? '<span class="chat-deliverable-download">下载</span>' : ""}
      </a>`;
    return B ? `<div class="chat-deliverable-media">
        <img class="chat-image chat-deliverable-thumb" data-src="${I(A)}" alt="${I(L)}" />
        ${w}
      </div>` : w;
  }).join("");
  return `<div class="chat-card chat-deliverable" data-deliverable="${I(i.id)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">📦</span>
      <span class="chat-card-title">交付文件</span>
      <span class="chat-card-badge">${t.length} 个</span>
      ${Xe(i.at)}
    </div>
    <div class="chat-deliverable-list">${k}</div>
  </div>`;
}
function fr(i) {
  const c = !i.decision, t = i.decision === "allow", k = i.title || "等待你授权", p = i.reason || "需要你确认后才能继续。", v = c ? `<div class="chat-card-actions">
        <button type="button" class="chat-btn is-danger" data-action="approval-deny" data-approval="${I(i.id)}">拒绝</button>
        <button type="button" class="chat-btn is-primary" data-action="approval-allow" data-approval="${I(i.id)}">允许</button>
      </div>` : "", L = c ? '<span class="chat-card-badge is-pending">待授权</span>' : `<span class="chat-card-badge ${t ? "is-ok" : "is-failed"}">${t ? "已允许" : "已拒绝"}</span>`;
  return `<div class="chat-card chat-approval${c ? " is-pending" : ""}" data-approval="${I(i.id)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">🛡</span>
      <span class="chat-card-title">${N(k)}</span>
      ${L}
      ${Xe(i.at)}
    </div>
    ${i.tool ? `<p class="chat-card-sub">${N(i.tool)}</p>` : ""}
    <p class="chat-card-text">${N(p)}</p>
    ${v}
  </div>`;
}
function gr(i, c) {
  const t = c && c.selected || {}, k = c && c.custom || {}, p = [];
  for (const v of i.questions || []) {
    const L = Array.isArray(t[v.id]) ? t[v.id] : [], A = String(k[v.id] || "").trim();
    if (L.length === 0 && !A) return null;
    const B = { id: v.id, selected: L };
    A && (B.custom = A), p.push(B);
  }
  return p.length ? p : null;
}
function mr(i, c, t) {
  const k = i.state !== "answered" && !t, p = i.state === "answered", v = c && c.selected || {}, L = c && c.custom || {}, A = (i.questions || []).map((w) => {
    const j = Array.isArray(v[w.id]) ? v[w.id] : [], H = Array.isArray(w.options) ? w.options : [], T = p && Array.isArray(i.answers) ? i.answers.find((m) => m.id === w.id) : null, b = H.length ? `<div class="chat-q-opts">${H.map((m) => {
      const x = j.includes(m.label), g = T && Array.isArray(T.selected) && T.selected.includes(m.label);
      return `<button type="button" class="chat-q-opt${x || g ? " is-on" : ""}" data-action="q-pick" data-input="${I(i.callId)}" data-q="${I(w.id)}" data-value="${I(m.label)}" ${w.multiSelect ? 'data-multi="1"' : ""} ${k ? "" : "disabled"}>
                <span class="chat-q-opt-label">${N(m.label)}</span>
                ${m.description ? `<small class="chat-q-opt-desc">${N(m.description)}</small>` : ""}
              </button>`;
    }).join("")}</div>` : "", f = p && T && T.custom ? T.custom : String(L[w.id] || ""), h = k ? `<input class="chat-q-custom" data-role="q-custom" data-input="${I(i.callId)}" data-q="${I(w.id)}" value="${I(f)}" placeholder="或者自己输入" autocomplete="off" />` : f ? `<p class="chat-q-custom-text">${N(f)}</p>` : "";
    return `<div class="chat-q">
        ${w.header ? `<p class="chat-q-header">${N(w.header)}</p>` : ""}
        <p class="chat-q-text">${N(w.question || "")}</p>
        ${w.detail ? `<p class="chat-q-sub">${N(w.detail)}</p>` : ""}
        ${b}
        ${h}
      </div>`;
  }).join(""), B = k ? `<div class="chat-card-actions"><button type="button" class="chat-btn is-primary" data-action="q-submit" data-input="${I(i.callId)}">${t ? "已提交" : "提交"}</button></div>` : "";
  return `<div class="chat-card chat-input-card${k ? " is-pending" : ""}${p ? " is-answered" : ""}" data-input="${I(i.callId)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">❓</span>
      <span class="chat-card-title">${p ? "已回答" : t ? "已提交，等待继续" : "需要你选择"}</span>
      ${Xe(i.at)}
    </div>
    ${A}
    ${B}
  </div>`;
}
function br(i, c) {
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
  }, k = String(c.manifest && c.manifest.version || ""), p = typeof window < "u" && !!window.__verifyWatchdog && /^(127\.0\.0\.1|localhost)$/.test(location.hostname), v = p ? 120 : 5 * 60 * 1e3, L = 6e3, A = p ? 450 : 15 * 60 * 1e3, B = p ? 80 : 1e4, w = 3, j = 5, H = 30, T = [
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
  ], b = 1e3, f = "我这边在手机上处理不了刚才的确认，已经中断当前回合。请改用不需要电脑端弹窗的方式继续；如果必须用电脑操作，请先告诉我需要做什么。", h = 180, m = String(c.manifest && c.manifest.id || "dsh-console"), x = Ko({ base: () => t.url, token: () => t.token }), g = Yo(), E = Zo();
  t.messages = g.messages;
  let s = null, n = {}, D = null, W = 0, Y = !1, U = !1, V = 0, _ = 0, K = [], gt = null, Je = 0, fe = null, ge = null, me = null, It = null, O = { list: [], index: 0, scale: 1, x: 0, y: 0 }, at = null, tt = /* @__PURE__ */ new Map(), mt = null, et = !1, bt = 0, ct = 0, J = "unknown", _t = null, Ze = 0;
  const Ot = /* @__PURE__ */ new Set(), Ft = /* @__PURE__ */ new Map(), Wt = /* @__PURE__ */ new Set();
  function un() {
    let e = "", a = "", o = !0, r = "turn", l = "", d = "", y = !0, q = "lan";
    try {
      const C = c.storage.get(Ve);
      if (C) {
        const u = JSON.parse(C);
        e = u && typeof u.url == "string" ? u.url : "", a = u && typeof u.token == "string" ? u.token : "", u && u.notify !== void 0 && (o = u.notify !== !1), u && u.notifyMode === "message" && (r = "message"), u && typeof u.lanUrl == "string" && (l = u.lanUrl), u && typeof u.wanUrl == "string" && (d = u.wanUrl), u && u.autoPick !== void 0 && (y = u.autoPick !== !1), u && u.pick === "wan" && (q = "wan");
      }
    } catch {
    }
    if (!l && !d && e) {
      const C = vt(e);
      C && C !== ft ? d = C : l = C;
    }
    t.lanUrl = vt(l) || ft, t.wanUrl = d ? vt(d) : "", t.autoPick = y !== !1, t.pick = q, t.mode = t.autoPick ? "auto" : t.pick === "wan" ? "wan" : "lan", t.token = String(a || "").trim(), t.notify = o !== !1, t.notifyMode = r, t.url = t.autoPick ? t.lanUrl : t.pick === "wan" && t.wanUrl ? t.wanUrl : t.lanUrl;
  }
  function Kt() {
    c.storage.set(Ve, JSON.stringify({
      lanUrl: t.lanUrl,
      wanUrl: t.wanUrl,
      autoPick: t.autoPick !== !1,
      pick: t.pick,
      token: t.token,
      notify: t.notify !== !1,
      notifyMode: t.notifyMode === "message" ? "message" : "turn"
    }));
  }
  const be = "ui.v1";
  function pn() {
    try {
      const e = c.storage.get(be);
      if (!e) return;
      const a = JSON.parse(e);
      if (!a) return;
      a.title && (t.sessionTitle = String(a.title)), a.meta && (t.meta = a.meta), a.chip && (t.uiChip = String(a.chip)), a.session && (t.currentSession = String(a.session)), a.status && (t.status = String(a.status), t.statusText = String(a.statusText || ""));
    } catch {
    }
  }
  function xe() {
    try {
      c.storage.set(
        be,
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
  function ta() {
    try {
      c.storage.remove(Xa);
    } catch {
    }
  }
  async function hn() {
    rt();
    try {
      await E.clearAll();
    } catch {
    }
    try {
      if (typeof caches < "u")
        for (const e of await caches.keys()) await caches.delete(e);
    } catch {
    }
    ta(), g.clear(), t.toolDetailId = "", t.toolActiveId = "", R(!0), P("缓存已清理");
    try {
      await xt();
    } catch {
    }
  }
  async function fn() {
    rt();
    try {
      await E.destroy();
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
    c.storage.remove(Ve), c.storage.remove(be), c.storage.remove(Xa), g.clear(), R(!0), P("正在恢复初始化…"), window.setTimeout(() => {
      c.shell && typeof c.shell.exit == "function" ? c.shell.exit() : location.reload();
    }, 400);
  }
  let Gt = [], kt = "", Nt = 0;
  function rt() {
    if (Nt && (window.clearTimeout(Nt), Nt = 0), !Gt.length || !kt) return;
    const e = kt, a = Gt;
    Gt = [], kt = "", E.put(e, a).catch(() => {
    });
  }
  function gn(e, a) {
    !e || !a || !a.id || (kt && kt !== e && rt(), kt = e, Gt.push(a), !Nt && (Nt = window.setTimeout(rt, 180)));
  }
  async function ye(e) {
    if (t.url)
      try {
        await x.presence(e, !0);
      } catch {
      }
  }
  async function mn(e, a) {
    if (!e) {
      P("这条审批已经失效", "error");
      return;
    }
    t.lastProgressAt = Date.now();
    try {
      await x.approvalDecision(e, a), P(a ? "已允许" : "已拒绝");
    } catch (o) {
      P("提交失败：" + (o && o.message || "网络错误"), "error");
    }
  }
  const Vt = (e, a, o) => x.assetUrl(e, a, o), ea = (e, a, o) => x.fetchWithTimeout(e, a, o);
  async function bn() {
    if (!t.url) {
      Q("unset", "未配置");
      return;
    }
    Q("checking", "连接中…");
    try {
      const e = await x.health();
      Q("ok", e && e.hasKey === !1 ? "连上了，但电脑缺 key" : "已连接");
    } catch {
      Q("bad", "连不上");
    }
  }
  function Q(e, a) {
    t.status = e, t.statusText = a, za(), xe();
  }
  function ve(e) {
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
  async function Pt(e) {
    if (!t.url)
      return Q("unset", "未配置"), !1;
    if (t.waiting) return !1;
    try {
      const a = await x.messages({ recent: j }), o = Array.isArray(a.messages) ? a.messages : [];
      return g.replaceMessages(
        o.map(ve).filter((r) => r.text || r.images.length || r.files.length)
      ), t.hydrated = !0, t.booting = !1, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.running = !!(a && a.running), t.lastEventAge = Number(a && a.lastEventAgeMs) || 0, a && a.instance && (t.instance = String(a.instance)), a && a.meta && (t.meta = a.meta, St()), t.staleShown = !1, a.current && (t.currentSession = String(a.current)), a.title && pt(a.title), R(!0), !0;
    } catch {
      return t.hydrated = !1, !1;
    }
  }
  function xn(e) {
    const a = ve(e);
    if (!a.id) return !1;
    const o = g.upsertMessage(a);
    return o && a.who !== "me" && (t.lastReplyAt = Date.now(), window.setTimeout(() => {
      U || R();
    }, 2200)), o;
  }
  async function aa() {
    if (!(U || Y) && !(!t.url || t.view !== "chat" || document.hidden) && J !== "sse") {
      Y = !0;
      try {
        const e = t.hydrated ? t.cursor : 0, a = await x.messages({ since: e, recent: j }), o = Array.isArray(a.messages) ? a.messages : [];
        t.status !== "ok" && Q("ok", "已连接"), a.current && (t.currentSession = String(a.current)), a.title && pt(a.title), a.meta && (t.meta = a.meta, St());
        const r = String(a.instance || ""), l = Number(a.last) || 0;
        if (!!(r && t.instance && r !== t.instance || e > 0 && l > 0 && l < e)) {
          t.instance = r || t.instance, g.clear(), t.hydrated = !1, t.running = !1, t.waiting = !1, t.waitingSince = 0, await Pt(!0);
          return;
        }
        r && (t.instance = r);
        const y = t.running, q = t.staleShown, C = typeof a.running == "boolean";
        C && (t.running = !!a.running, a.running && (t.awaitingReply = !0), !t.running && t.waitingSince && Date.now() - t.waitingSince > 2500 && (t.waiting = !1, t.busy = !1, t.waitingSince = 0));
        const u = t.currentTool, $ = u ? String(u.name) + "|" + String(u.detail || "") + "|" + String(!!u.done) : "";
        t.currentTool = a.tool && a.tool.name ? {
          name: String(a.tool.name),
          detail: String(a.tool.detail || ""),
          done: !!a.tool.done
        } : null, t.currentTool && (t.lastTool = { name: t.currentTool.name, detail: t.currentTool.detail, done: !0 }, t.lastToolAt = Date.now());
        const S = t.currentTool ? String(t.currentTool.name) + "|" + String(t.currentTool.detail || "") + "|" + String(t.currentTool.done) : "", z = $ !== S;
        t.lastEventAge = Number(a.lastEventAgeMs) || 0;
        const F = t.running && t.lastEventAge > 3e5;
        t.staleShown = F;
        const G = C && (y !== t.running || q !== F);
        if (!t.hydrated) {
          g.replaceMessages(
            o.map(ve).filter((M) => M.text || M.images.length || M.files.length)
          ), t.hydrated = !0, t.booting = !1, !t.waiting && !t.running && (t.busy = !1), R(!0);
          return;
        }
        if (o.length === 0) {
          (G || z) && R();
          return;
        }
        let ht = !1;
        for (const M of o)
          g.cursor = Math.max(g.cursor, Number(M.id) || 0), xn(M) && (ht = !0);
        !C && t.waiting && (t.waiting = !1, t.busy = !1, ht = !0), (ht || G || z) && R();
      } catch (e) {
        const a = String(e && e.message || "");
        if (/401|令牌|unauthor/i.test(a)) {
          Q("bad", "令牌不正确");
          return;
        }
        ae || (t.wanFirst = !0, dt());
      } finally {
        Y = !1;
      }
    }
  }
  function Lt() {
    W || (W = window.setInterval(aa, 800));
  }
  function we() {
    W && (window.clearInterval(W), W = 0);
  }
  function yn(e) {
    const a = e && e.session || {}, o = e && Array.isArray(e.events) ? e.events : [];
    g.replaceEvents(o), t.projections = e && e.projections && typeof e.projections == "object" ? e.projections : {}, t.stream = null, t.hydrated = !0, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.running = !!a.running, a.running && !Ea(g.timeline()) && (t.awaitingReply = !0, t.runActive = !0), t.lastEventAt = Date.now(), t.currentTool = null, t.lastTool = null, t.lastToolAt = 0, t.running && a.tool && a.tool.name && (t.currentTool = {
      name: String(a.tool.name),
      detail: String(a.tool.detail || ""),
      done: !!a.tool.done
    }), t.running || oa(!0), t.turnHasMore = !!(e && e.hasMore), t.historyLimitReached = !1, t.stopped = !1, t.oldestSeq = Number(e && e.oldestSeq) || o[0] && o[0].seq || 0, t.loadingOlder = !1, t.stuckPrompt = !1, t.lastProgressAt = Date.now(), t.lastEventAge = 0, t.staleShown = !1, e && e.instance && (t.instance = String(e.instance)), a.id && (t.currentSession = String(a.id)), a.title && pt(a.title), (a.model || a.preset || a.permission) && (t.meta = {
      preset: a.preset || "",
      permission: a.permission || "",
      model: a.model || null
    }, St()), R(!0), window.setTimeout(() => {
      U || ia();
    }, 80), t.status !== "ok" && Q("ok", "已连接"), t.currentSession && o.length > 0 && (rt(), E.put(t.currentSession, o).catch(() => {
    }));
  }
  function na() {
    return g.timeline().filter((e) => e.kind === "message" && e.message && e.message.who === "me").length;
  }
  function ke(e) {
    let a = -1;
    for (const o of e)
      if (o.kind === "message" && o.message && o.message.who === "me") {
        const r = Number(o.message.seq);
        Number.isFinite(r) && (a = Math.max(a, r));
      }
    return a;
  }
  function oa(e = !1) {
    const a = e ? -1 : ke(g.timeline());
    let o = !1;
    for (const r of g.cards.values()) {
      if (r.kind !== "tool" || r.status !== "running") continue;
      const l = Number(r.seq);
      !e && Number.isFinite(l) && l <= a || (r.status = "ok", o = !0);
    }
    return o;
  }
  function Se(e = !1, a = !1) {
    const o = t.running || t.waiting || t.busy || !!t.currentTool || !!t.lastTool;
    t.running = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.currentTool = null, t.lastTool = null, t.lastToolAt = 0, t.stream = null, t.stuckPrompt = !1, a || (t.runActive = !1);
    const r = oa(e);
    return o || r;
  }
  function vn(e) {
    if (!e || typeof e != "object" || !e.type) return;
    if (t.lastEventAt = Date.now(), t.lastProgressAt = Date.now(), t.notRunningSince = 0, t.stuckPrompt && (t.stuckPrompt = !1), e.type === "projection") {
      const r = e.payload && e.payload.values;
      t.projections = r && typeof r == "object" ? r : {}, ce();
      return;
    }
    if (e.type === "message.assistant.delta") {
      const r = e.payload || {};
      r.ended ? t.stream = null : t.stream = {
        text: String(r.text || ""),
        reasoning: String(r.reasoning || ""),
        turn: r.turn,
        step: r.step
      }, ce();
      return;
    }
    if (e.type === "session.meta") {
      const r = e.payload && e.payload.session || {};
      if (r.running !== void 0 && (t.running = !!r.running, r.running && !Ea(g.timeline()) && (t.awaitingReply = !0, t.runActive = !0)), e.payload && e.payload.instance) {
        const l = String(e.payload.instance);
        if (t.instance && l !== t.instance) {
          t.instance = l, xt();
          return;
        }
        t.instance = l;
      }
      r.title && pt(r.title), ce();
      return;
    }
    (e.type === "message.assistant" || e.type === "message.error" || e.type === "turn.end") && (t.stream = null);
    let a = g.upsertEvent(e);
    if (e.type === "turn.start" || e.type === "message.user")
      e.type === "turn.start" && (t.running = !0), t.awaitingReply = !0, t.runActive = !0, t.stopped = !1, a = !0;
    else if (e.type === "turn.end")
      Se(), a = !0;
    else if (e.type === "message.assistant")
      t.lastReplyAt = Date.now(), t.runActive = !1, t.waiting = !1, t.busy = !1;
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
    t.currentSession && e.id && gn(t.currentSession, e), ce(o);
  }
  function lt() {
    if (_t) {
      try {
        _t.close();
      } catch {
      }
      _t = null;
    }
    window.clearTimeout(Ze), t.stream = null;
  }
  function ra() {
    if (lt(), typeof EventSource != "function" || !t.url) {
      Te();
      return;
    }
    const e = new EventSource(x.eventsUrl(g.lastSeq, t.currentSession));
    _t = e;
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
          Te();
          return;
        }
        lt(), Ze = window.setTimeout(() => {
          !U && J === "sse" && ra();
        }, 1500);
      }
    };
  }
  function Te() {
    if (lt(), J === "legacy") {
      Lt();
      return;
    }
    J = "legacy", Lt(), Pt();
  }
  async function xt() {
    if (!(U || !t.url) && J !== "legacy")
      try {
        const e = await x.snapshot(t.currentSession || "", { turns: w });
        if (U) return;
        J = "sse", we(), yn(e), ra();
      } catch {
        Te();
      }
  }
  async function wn() {
    if (U || !t.url || !t.currentSession || t.loadingOlder || !t.turnHasMore || !t.oldestSeq) return;
    const e = H - na();
    if (e <= 0) {
      t.turnHasMore = !1, t.historyLimitReached = !0, R();
      return;
    }
    const a = n.list, o = a ? a.scrollTop : 0, r = a ? a.scrollHeight : 0;
    t.loadingOlder = !0, sa();
    try {
      const l = await x.snapshot(t.currentSession, {
        turns: Math.min(j, e),
        before: t.oldestSeq
      }), d = Array.isArray(l && l.events) ? l.events : [];
      for (const q of d) g.upsertEvent(q);
      t.oldestSeq = Number(l && l.oldestSeq) || t.oldestSeq;
      const y = na() >= H;
      t.turnHasMore = !!(l && l.hasMore) && !y, t.historyLimitReached = y && !!(l && l.hasMore), R(), a && (a.scrollTop = o + Math.max(0, a.scrollHeight - r));
    } catch (l) {
      P("加载更早失败：" + (l && l.message || "网络错误"), "error");
    } finally {
      t.loadingOlder = !1, sa();
    }
  }
  function sa() {
    n.loadSpinner && (n.loadSpinner.hidden = !(t.loadingOlder && t.turnHasMore));
  }
  function ia() {
    !t.turnHasMore || t.loadingOlder || !n.list || n.list.scrollTop > h || wn();
  }
  function kn() {
    const e = g.timeline(), a = ke(e);
    for (const o of e) {
      const r = Number(o.seq);
      if (!(Number.isFinite(r) && r <= a) && (o.kind === "approval" && !o.decision || o.kind === "input" && o.state === "open"))
        return !0;
    }
    return !1;
  }
  function $e() {
    const e = ke(g.timeline());
    for (const a of g.cards.values()) {
      if (a.kind !== "tool" || a.status !== "running") continue;
      const o = Number(a.seq);
      if (!Number.isFinite(o) || o > e) return !0;
    }
    return !1;
  }
  async function ca(e) {
    if (t.stuckBusy) return;
    t.stuckBusy = !0, t.stuckPrompt = !1, R();
    let a = !1;
    try {
      await x.stop(), a = !0;
    } catch (o) {
      t.stuckBusy = !1, t.lastProgressAt = Date.now(), R(), P("中断失败：" + (o && o.message || "网络错误"), "error");
      return;
    }
    if (a) {
      t.stopped = !0, t.awaitingReply = !0;
      try {
        await x.send({ text: f, images: [], files: [] }), P(e ? "长时间无响应，已中断并说明" : "已中断，已让 agent 换方式");
      } catch {
        t.awaitingReply = !1, P("已中断，但说明没发出去");
      }
    }
    t.stuckBusy = !1, t.lastProgressAt = Date.now(), R();
  }
  async function Sn() {
    if (!(U || !t.url || document.hidden) && !(Date.now() - (Number(t.lastProgressAt) || 0) < 2e3))
      try {
        const e = await x.health();
        if (typeof e.running != "boolean") return;
        if (!e.running) {
          t.running = !1, t.awaitingReply && (t.notRunningSince || (t.notRunningSince = Date.now()), !t.currentTool && !$e() && Date.now() - t.notRunningSince >= L ? Se(!0) : R());
          return;
        }
        t.notRunningSince = 0, e.tool && e.tool.name && t.currentTool && e.tool.done && t.currentTool.name === String(e.tool.name) && !t.currentTool.done && (t.currentTool = { ...t.currentTool, done: !0 }, R()), t.awaitingReply || (t.awaitingReply = !0, R());
      } catch {
      }
  }
  function Tn() {
    if (U || t.stuckBusy) return;
    if (!t.running) {
      t.stuckPrompt && (t.stuckPrompt = !1, R());
      return;
    }
    if (kn()) {
      t.stuckPrompt && (t.stuckPrompt = !1, R());
      return;
    }
    const e = Date.now() - (Number(t.lastProgressAt) || Date.now()), a = $e() ? 1 / 0 : A;
    if (e >= a) {
      ca(!0);
      return;
    }
    e >= v && !t.stuckPrompt && (t.stuckPrompt = !0, R());
  }
  async function Ae(e, a) {
    const o = String(e || "").trim(), r = t.pending || [];
    if (!a && r.some((S) => S.status === "uploading")) {
      P("图片/文件还在上传，稍等一下", "error");
      return;
    }
    if (!a && r.some((S) => S.status === "error")) {
      P("有附件上传失败，先移除再发", "error");
      return;
    }
    if (!o && r.length === 0) return;
    if (!t.url) {
      P("先在 ⚙ 里填电脑地址", "error"), Tt();
      return;
    }
    if (t.waiting && !a) return;
    t.lastProgressAt = Date.now(), t.stopped = !1, t.stuckPrompt = !1;
    const l = r.filter((S) => S.kind === "image" && S.ref).map((S) => S.ref), d = r.filter((S) => S.kind === "file" && S.ref).map((S) => S.ref), y = t.messages.reduce((S, z) => {
      const F = z && z.seq;
      return Number.isFinite(Number(F)) ? Math.max(S, Number(F)) : S;
    }, -1), q = {
      who: "me",
      text: o,
      at: Date.now(),
      // 真实 seq 还没回来之前，先排在已有消息之后、下一条回复之前
      seq: y + 0.5,
      local: !0,
      images: r.filter((S) => S.kind === "image").map((S) => ({
        id: "local:" + S.key,
        src: S.preview
      })),
      files: r.filter((S) => S.kind === "file").map((S) => ({
        id: "local:" + S.key,
        name: S.name,
        size: S.size
      }))
    };
    g.messages.push(q), t.draft = "", n.input && (n.input.value = ""), He(), t.waiting = !0, t.waitingSince = Date.now(), t.busy = !0, t.awaitingReply = !0, t.runActive = !0, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, R(!0), J !== "sse" && Lt();
    const C = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : "local-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    let u = null;
    for (let S = 0; S < 3; S += 1)
      try {
        await x.send({ text: o, images: l, files: d, clientMessageId: C }), u = null, t.pending = [], st(), J !== "sse" ? window.setTimeout(aa, 260) : window.setTimeout(async () => {
          if (!U)
            try {
              const z = await x.health();
              z && z.title && pt(z.title);
            } catch {
            }
        }, 700), Q("ok", "已连接");
        return;
      } catch (z) {
        u = z, S < 2 && await Oo(700 * (S + 1));
      }
    t.waiting = !1, t.busy = !1, t.awaitingReply = !1, t.runActive = !1;
    const $ = g.messages.indexOf(q);
    $ >= 0 && g.messages.splice($, 1), g.messages.push({
      who: "error",
      text: "发送失败：" + (u && u.message || "未知错误"),
      at: Date.now(),
      retryText: o
    }), Q("bad", "发送失败"), R(!0);
  }
  function st() {
    const e = t.pending || [];
    n.attach && (n.attach.hidden = e.length === 0, n.attach.innerHTML = e.map((a) => {
      const o = a.kind === "image" && a.preview ? `<img class="chat-chip-thumb" src="${I(a.preview)}" alt="" />` : '<span class="chat-chip-icon">📎</span>', r = a.status === "uploading" ? '<span class="chat-chip-state">上传中</span>' : a.status === "error" ? '<span class="chat-chip-state is-bad">失败</span>' : "";
      return `<div class="chat-chip" data-key="${I(a.key)}"><button type="button" class="chat-chip-x" data-action="remove-attach" data-key="${I(a.key)}" aria-label="移除">×</button>${o}${r}</div>`;
    }).join(""));
  }
  function $n(e) {
    t.pending = (t.pending || []).filter((a) => a.key !== e), st();
  }
  function An(e) {
    return new Promise((a, o) => {
      const r = new FileReader();
      r.onload = () => {
        const l = String(r.result || ""), d = l.indexOf(",");
        a(d >= 0 ? l.slice(d + 1) : l);
      }, r.onerror = () => o(r.error || new Error("读不到文件")), r.readAsDataURL(e);
    });
  }
  async function qn(e) {
    try {
      const a = e.kind === "image" ? { data: e.data, mediaType: e.mediaType, name: e.name } : { data: e.data, name: e.name }, o = e.kind === "image" ? await x.uploadImage(a) : await x.uploadFile(a);
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
        P("先在 ⚙ 里填电脑地址", "error"), Tt();
        return;
      }
      for (const o of a) {
        const r = String(o.type || "").startsWith("image/");
        if ((t.pending || []).filter((y) => y.kind === (r ? "image" : "file")).length >= 4) {
          P(r ? "一条消息最多 4 张图" : "一条消息最多 4 个文件", "error");
          continue;
        }
        if (o.size > 30 * 1024 * 1024) {
          P((o.name || "文件") + " 超过 30MB", "error");
          continue;
        }
        const d = {
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
        t.pending.push(d), st();
        try {
          d.data = await An(o);
        } catch {
          d.status = "error", d.error = "读不到这个文件", st();
          continue;
        }
        r && (d.preview = "data:" + d.mediaType + ";base64," + d.data), st(), qn(d);
      }
    }
  }
  function la(e) {
    const a = e.target;
    if (a === n.relayToggle && a instanceof HTMLInputElement) {
      const r = !!a.checked;
      if (!c.watch || typeof c.watch.start != "function") {
        a.checked = !r, P("当前壳不支持这个开关", "error");
        return;
      }
      t.notify = r, Kt(), Rt(), Sa();
      return;
    }
    if (!(a instanceof HTMLInputElement) || a !== n.pick) return;
    const o = a.files ? Array.from(a.files) : [];
    a.value = "", Mn(o);
  }
  async function En() {
    const e = t.url;
    if (t.waiting = !1, t.busy = !1, R(), !!e)
      try {
        await x.stop(), t.stopped = !0, Se(!0), R(), P("已停止执行");
      } catch (a) {
        P("停止失败：" + (a && a.message || "网络错误"), "error");
      }
  }
  async function Yt() {
    if (!t.url) {
      Tt();
      return;
    }
    t.sessionsOpen = !0, t.sessionQuery = "", nt && (window.clearTimeout(nt), nt = 0), Xt("list"), n.sheetBody.innerHTML = '<div class="chat-sheet-tip">正在读取历史对话…</div>', n.scrim.hidden = !1, Ee(!0);
    try {
      const e = await x.sessions(), a = Array.isArray(e.sessions) ? e.sessions : [], o = e.current || t.currentSession || "";
      o && (t.currentSession = String(o)), t.archivedList = Array.isArray(e.archived) ? e.archived : [], t.showArchived = !1, t.sessionsList = a.filter((r) => !r.blank || r.id === o), n.sessionSearch && (n.sessionSearch.value = "", n.sessionSearch.hidden = !0), n.sheetBody.innerHTML = '<div data-role="session-list"></div>', Qt();
    } catch (e) {
      t.sessionsList = [], n.sheetBody.innerHTML = `<div class="chat-sheet-tip">读取失败：${N(e && e.message || "未知错误")}</div>`;
    }
  }
  function Qt() {
    const e = n.sheetBody && n.sheetBody.querySelector('[data-role="session-list"]');
    if (!e) return;
    const a = String(t.sessionQuery || "").trim().toLowerCase(), o = (t.sessionsList || []).filter((u) => a ? String(u.title || "").toLowerCase().includes(a) || String(u.id || "").toLowerCase().includes(a) : !0), r = t.currentSession || "", l = o.slice(0, 80).map((u) => cr(u, r)).join(""), d = `<div class="chat-sheet-tip">${a ? "没有匹配的对话" : "还没有历史对话"}</div>`, y = (t.archivedList || []).filter((u) => a ? String(u.title || "").toLowerCase().includes(a) || String(u.id || "").toLowerCase().includes(a) : !0), q = `<button type="button" class="chat-archived-toggle" data-action="toggle-archived">${t.showArchived ? "收起已归档" : "已归档 " + y.length}</button>`;
    let C = "";
    t.showArchived && (C = y.length ? y.slice(0, 80).map(
      (u) => `<div class="chat-session-row is-archived"><button type="button" class="chat-session" data-action="restore-session" data-session="${I(u.id || "")}">
                <span class="chat-session-label">${N(u.title || "未命名对话")}</span>
                <span class="chat-session-time">已归档 · 点按恢复</span>
              </button></div>`
    ).join("") : '<div class="chat-sheet-tip">没有已归档的对话</div>'), e.innerHTML = (o.length ? l : d) + q + C;
  }
  function In(e) {
    return e ? e.eventId ? String(e.eventId) : e.id ? "id" + e.id : Number.isFinite(Number(e.seq)) ? "s" + e.seq : "" : "";
  }
  function Nn() {
    t.searchQuery = "", n.searchScrim && (n.searchScrim.hidden = !1), n.searchInput && (n.searchInput.value = "", n.searchInput.focus()), da();
  }
  function qe() {
    n.searchScrim && (n.searchScrim.hidden = !0);
  }
  function da() {
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
      const d = Math.max(0, l - 16), y = l + e.length + 26, q = (d > 0 ? "…" : "") + r.slice(d, y).replace(/\s+/g, " ") + (y < r.length ? "…" : "");
      if (a.push({ key: In(o), who: o.who, snippet: q, at: o.at }), a.length >= 80) break;
    }
    if (a.length === 0) {
      n.searchBody.innerHTML = '<div class="chat-sheet-tip">没有找到包含该关键词的消息</div>';
      return;
    }
    n.searchBody.innerHTML = a.map(
      (o) => `<button type="button" class="chat-search-hit" data-action="search-jump" data-key="${I(o.key)}">
          <span class="chat-search-hit-head">${o.who === "me" ? "我" : o.who === "error" ? "错误" : "助手"} · ${Et(o.at)}</span>
          <span class="chat-search-hit-text">${N(o.snippet)}</span>
        </button>`
    ).join("");
  }
  function Pn(e) {
    if (qe(), !e || !n.list) return;
    const a = n.list.querySelector('[data-mid="' + e.replace(/["\\]/g, "\\$&") + '"]');
    if (!a) {
      P("这条消息不在当前窗口里", "error");
      return;
    }
    a.scrollIntoView({ block: "center", behavior: "smooth" });
  }
  function Ln(e, a) {
    t.sessionMenuId = String(e || ""), t.sessionMenuTitle = String(a || ""), n.sessionMenu && (n.sessionMenu.hidden = !1);
  }
  function zt() {
    n.sessionMenu && (n.sessionMenu.hidden = !0);
  }
  function zn() {
    t.renameId = t.sessionMenuId, zt(), n.renameInput && (n.renameInput.value = t.sessionMenuTitle || "", n.renameInput.focus()), n.renameScrim && (n.renameScrim.hidden = !1);
  }
  function Me() {
    n.renameScrim && (n.renameScrim.hidden = !0);
  }
  async function Cn() {
    const e = t.renameId, a = String(n.renameInput && n.renameInput.value || "").trim();
    if (!e || !a) {
      P("标题不能为空", "error");
      return;
    }
    try {
      const o = await x.renameSession(e, a);
      e === t.currentSession && o && o.title && pt(o.title), Me(), P("已重命名"), t.sessionsOpen && await Yt();
    } catch (o) {
      P("重命名失败：" + (o && o.message || "未知错误"), "error");
    }
  }
  async function Bn() {
    const e = t.sessionMenuId;
    if (zt(), !!e) {
      P("正在分支…");
      try {
        const a = await x.forkSession(e);
        a && a.sessionId ? await ua(a.sessionId) : P("分支失败", "error");
      } catch (a) {
        P("分支失败：" + (a && a.message || "未知错误"), "error");
      }
    }
  }
  let nt = 0;
  function Ee(e) {
    if (s) {
      if (e) {
        const a = n.top ? n.top.getBoundingClientRect().height : 0;
        s.style.setProperty("--drawer-top", Math.round(a) + "px");
      }
      s.classList.toggle("is-drawer-open", !!e), n.switchBtn && (n.switchBtn.textContent = e ? "✕" : "☰", n.switchBtn.setAttribute("aria-label", e ? "关闭会话菜单" : "打开会话菜单"));
    }
  }
  function Xt(e) {
    t.drawerMode = e === "create" ? "create" : "list", n.drawerList && (n.drawerList.hidden = t.drawerMode !== "list"), n.drawerCreate && (n.drawerCreate.hidden = t.drawerMode !== "create");
  }
  function Rn(e, a) {
    t.archiveId = String(e || ""), t.archiveStop = !1, zt(), n.archiveText && (n.archiveText.textContent = `「${a || "这个会话"}」将从列表移除，可在「已归档」里恢复。`), n.archiveScrim && (n.archiveScrim.hidden = !1);
  }
  function Jt() {
    n.archiveScrim && (n.archiveScrim.hidden = !0), t.archiveId = "", t.archiveStop = !1;
  }
  async function jn() {
    const e = t.archiveId;
    if (e)
      try {
        await x.archiveSession(e, t.archiveStop), Jt(), P("已归档"), t.sessionsOpen && await Yt();
      } catch (a) {
        if (a && a.code === "workspace/session-active" && !t.archiveStop) {
          t.archiveStop = !0, n.archiveText && (n.archiveText.textContent = "这个会话还在执行，停止并归档？");
          return;
        }
        P("归档失败：" + (a && a.message || "未知错误"), "error");
      }
  }
  async function Dn(e) {
    if (e)
      try {
        await x.unarchiveSession(e), P("已恢复"), t.sessionsOpen && await Yt();
      } catch (a) {
        P("恢复失败：" + (a && a.message || "未知错误"), "error");
      }
  }
  function yt() {
    t.sessionsOpen = !1, Ee(!1), nt && window.clearTimeout(nt), nt = window.setTimeout(() => {
      nt = 0, !t.sessionsOpen && n.scrim && (n.scrim.hidden = !0);
    }, 260);
  }
  async function ua(e) {
    if (yt(), !!e) {
      P("正在打开对话…");
      try {
        const a = await x.target(e);
        rt(), lt(), g.clear(), t.booting = !0, t.historyLimitReached = !1, t.stopped = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, t.lastListTop = 0, t.projections = {}, t.hydrated = !1, t.waiting = !1, t.busy = !1, t.pending = [], t.running = !1, t.lastEventAge = 0, t.waitingSince = 0, t.staleShown = !1, st(), a && a.current && (t.currentSession = String(a.current)), t.currentSession && E.clearOthers(t.currentSession).catch(() => {
        }), pt(a && a.title || ""), t.view = "chat", n.page && (n.page.hidden = !0), R(!0), J === "sse" ? xt() : await Pt(!0), P("已切换对话");
      } catch (a) {
        P("切换失败：" + (a && a.message || "未知错误"), "error");
      }
    }
  }
  function Hn() {
    const e = t.options && Array.isArray(t.options.presets) ? t.options.presets : [];
    return e.length ? e.map((a) => {
      const o = String(a.id), r = Ut[o];
      return {
        value: o,
        // 去掉「模式」后缀，只留「标准 / 创造 / 极简 / 编排」
        name: String(r && r.name || a.name || o).replace(/模式$/, ""),
        description: r && r.description || a.description || ""
      };
    }) : [
      { value: "standard", name: "标准", description: Ut.standard.description },
      { value: "ptc", name: "创造", description: Ut.ptc.description },
      { value: "minimal", name: "极简", description: Ut.minimal.description },
      { value: "cordis", name: "编排", description: Ut.cordis.description }
    ];
  }
  function Ie() {
    const e = t.options && Array.isArray(t.options.presets) ? t.options.presets : [];
    if (e.some((o) => o && String(o.id) === "standard")) return "standard";
    const a = e.find((o) => o && o.isDefault);
    return a && a.id ? String(a.id) : "standard";
  }
  function Ne() {
    const e = t.options, a = e && Array.isArray(e.permissions) ? e.permissions : [], o = (l) => a.some((d) => d && String(d.value) === l);
    if (o("workspace-write")) return "workspace-write";
    if (o("read-only")) return "read-only";
    const r = e && e.defaultPermission ? String(e.defaultPermission) : "";
    return r && r !== "danger-full-access" ? r : "workspace-write";
  }
  async function pa(e) {
    if (t.options) return t.options;
    try {
      const a = await x.options();
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
  function ha(e, a, o, r) {
    return e.map((l) => `<button type="button" class="chat-opt" data-action="${r}" data-scope="${o}" data-value="${I(l.value)}" data-on="${l.value === a ? "1" : "0"}">${N(l.name)}</button>`).join("");
  }
  function fa(e) {
    const a = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [];
    if (a.length === 0) return "";
    const o = t.formModel || "", r = t.formEffort || "", l = a.map(($) => {
      const S = ($.models || []).map((z) => `<button type="button" class="chat-opt" data-action="pick-model" data-scope="${e}" data-provider="${I($.id)}" data-value="${I(z.id)}" data-on="${z.id === o ? "1" : "0"}">${N(z.name || z.id)}</button>`).join("");
      return e === "new" ? `<div class="chat-chipgroup">${S}</div>` : `<div class="chat-form-block"><p class="chat-sheet-sub">${N($.name || $.id)}</p><div class="chat-chipgroup">${S}</div></div>`;
    }).join(""), d = e === "new" ? `<div class="chat-form-block"><p class="chat-sheet-sub">模型</p>${l}</div>` : l, y = Bt(t.formProvider, o), q = y && y.model && y.model.reasoning && Array.isArray(y.model.reasoning.efforts) ? y.model.reasoning.efforts : [], C = q.length ? `<div class="chat-form-block"><p class="chat-sheet-sub">推理等级</p><div class="chat-chipgroup">${q.map(($) => `<button type="button" class="chat-opt" data-action="pick-effort" data-scope="${e}" data-value="${I($.id)}" data-on="${$.id === r ? "1" : "0"}">${N($.name || $.id)}</button>`).join("")}</div></div>` : "";
    let u = "";
    if (e === "model") {
      const $ = (t.options && Array.isArray(t.options.permissions) ? t.options.permissions : []).map((S) => ({
        value: String(S.value),
        name: Za[String(S.value)] || S.name || String(S.value)
      }));
      if ($.length > 0) {
        const S = t.sessionPermission || t.meta && t.meta.permission || "";
        u = `<div class="chat-form-block"><p class="chat-sheet-sub">权限</p><div class="chat-chipgroup">${$.map((z) => `<button type="button" class="chat-opt" data-action="pick-permission-current" data-value="${I(z.value)}" data-on="${z.value === S ? "1" : "0"}">${N(z.name)}</button>`).join("")}</div><p class="chat-opt-desc">切换后从下一次操作开始生效；完全权限不再询问。</p></div>`;
      }
    }
    return d + C + u;
  }
  function ga() {
    const e = t.options && t.options.models ? t.options.models.default : null, a = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [], o = a[0] && Array.isArray(a[0].models) ? a[0].models[0] : null, r = e && e.provider ? String(e.provider) : a[0] ? String(a[0].id) : "", l = e && e.model ? String(e.model) : o ? String(o.id) : "", d = Bt(r, l), y = e && e.reasoningEffort ? String(e.reasoningEffort) : d && d.model && d.model.reasoning ? String(d.model.reasoning.defaultEffort || "") : "";
    t.formProvider = r, t.formModel = l, t.formEffort = y;
  }
  function Ct() {
    if (!n.newBody) return;
    const e = Hn(), a = e.find((y) => y.value === t.formPreset) || e.find((y) => y.value === Ie()), o = (t.options && Array.isArray(t.options.permissions) ? t.options.permissions : []).map((y) => ({
      value: String(y.value),
      name: Za[String(y.value)] || y.name || String(y.value),
      description: _o[String(y.value)] || y.description || ""
    })), r = t.formPermission || Ne(), l = o.find((y) => y.value === r), d = l && l.description ? l.description : r === "danger-full-access" ? "完全权限：不再询问，直接执行。" : "非完全权限时，需要授权的操作会先弹到手机确认。";
    n.newBody.innerHTML = `
      <div class="chat-form-block">
        <p class="chat-sheet-sub">标题</p>
        <input class="chat-sheet-search" data-role="new-title" value="${I(t.formTitle || "")}" placeholder="可不填，自动取第一句" autocomplete="off" spellcheck="false" />
      </div>
      <div class="chat-form-block">
        <p class="chat-sheet-sub">模式</p>
        <div class="chat-chipgroup">${ha(e, a ? a.value : t.formPreset, "new", "pick-preset")}</div>
        <p class="chat-opt-desc">${N(a && a.description || "")}</p>
      </div>
      ${o.length > 0 ? `
      <div class="chat-form-block">
        <p class="chat-sheet-sub">权限</p>
        <div class="chat-chipgroup">${ha(o, r, "new", "pick-permission")}</div>
        <p class="chat-opt-desc">${N(d)}</p>
      </div>` : ""}
      ${fa("new")}
      <button type="button" class="chat-btn is-primary is-block" data-action="create-session">开始对话</button>
    `;
  }
  function Bt(e, a) {
    const o = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [];
    for (const r of o)
      if (!(e && r.id !== e)) {
        for (const l of r.models || [])
          if (l.id === a) return { provider: r.id, name: r.name || r.id, model: l };
      }
    return null;
  }
  function Un(e, a) {
    const o = Bt(e, a);
    return o && o.model && o.model.name ? String(o.model.name) : String(a || "");
  }
  function _n(e, a, o) {
    const r = Bt(e, a), d = (r && r.model && r.model.reasoning && Array.isArray(r.model.reasoning.efforts) ? r.model.reasoning.efforts : []).find((y) => y && y.id === o);
    return d && d.name ? String(d.name) : String(o || "");
  }
  function St() {
    if (!n.modelChip) return;
    const e = t.meta && t.meta.model;
    if (!e || !e.model) {
      n.modelChip.hidden = !0, n.modelChip.textContent = "";
      return;
    }
    const a = [Un(e.provider, e.model)];
    e.reasoningEffort && a.push(_n(e.provider, e.model, e.reasoningEffort)), n.modelChip.hidden = !1, n.modelChip.textContent = a.join(" · "), xe();
  }
  function Zt() {
    if (!n.modelBody) return;
    if ((t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : []).length === 0) {
      n.modelBody.innerHTML = '<div class="chat-sheet-tip">读不到模型列表</div>';
      return;
    }
    n.modelBody.innerHTML = fa("model");
  }
  async function On() {
    if (!t.url) return;
    const e = t.meta && t.meta.model ? t.meta.model : null;
    t.formProvider = e ? e.provider : "", t.formModel = e ? e.model : "", t.formEffort = e ? e.reasoningEffort : "", t.sessionPermission = t.meta && t.meta.permission || t.options && t.options.defaultPermission || "", n.modelScrim && (n.modelScrim.hidden = !1), t.options ? Zt() : (n.modelBody && (n.modelBody.innerHTML = '<div class="chat-sheet-tip">正在读取模型…</div>'), pa().then(() => Zt()));
  }
  function te() {
    n.modelScrim && (n.modelScrim.hidden = !0);
  }
  function Fn(e, a, o, r) {
    if (e === "model") {
      t.formProvider = o || t.formProvider, t.formModel = a;
      const l = Bt(t.formProvider, a), d = l && l.model && l.model.reasoning && Array.isArray(l.model.reasoning.efforts) ? l.model.reasoning.efforts : [], y = l && l.model && l.model.reasoning && l.model.reasoning.defaultEffort || "";
      t.formEffort = d.some((q) => q.id === t.formEffort) ? t.formEffort : y || (d[0] ? d[0].id : "");
    } else
      t.formEffort = a;
    r === "new" ? Ct() : Zt();
  }
  async function Wn() {
    if (!t.url || !t.formProvider || !t.formModel) return;
    const e = { provider: t.formProvider, model: t.formModel };
    t.formEffort && (e.reasoningEffort = t.formEffort);
    try {
      const a = String(t.sessionPermission || "");
      if (a && (!t.meta || a !== t.meta.permission)) {
        const r = await x.setPermission(a);
        r && r.meta && (t.meta = r.meta);
      }
      const o = await x.selectModel(e);
      o && o.meta && (t.meta = o.meta), St(), te(), P("已应用");
    } catch (a) {
      P("应用失败：" + (a && a.message || "未知错误"), "error");
    }
  }
  function Kn() {
    if (!t.url) {
      Tt();
      return;
    }
    t.sessionsOpen = !0, nt && (window.clearTimeout(nt), nt = 0), n.scrim && (n.scrim.hidden = !1), Ee(!0), Xt("create"), t.formPreset = Ie(), t.formPermission = Ne(), t.options ? (ga(), Ct()) : (n.newBody && (n.newBody.innerHTML = '<div class="chat-sheet-tip">正在读取可选项…</div>'), pa().then(() => {
      ga(), Ct();
    }));
  }
  function Pe() {
    Xt("list");
  }
  function Gn(e, a, o) {
    a === "new" && (t.formPreset = o, Ct());
  }
  function Vn() {
    n.confirmScrim && (n.confirmScrim.hidden = !1);
  }
  function ee() {
    n.confirmScrim && (n.confirmScrim.hidden = !0);
  }
  function Yn() {
    (async () => {
      try {
        await ye(!1);
      } catch {
      }
      try {
        c.watch && typeof c.watch.stop == "function" && c.watch.stop(m);
      } catch {
      }
      try {
        c.shell && typeof c.shell.exit == "function" && c.shell.exit();
      } catch {
      }
    })();
  }
  async function Qn() {
    if (!t.url) {
      Tt();
      return;
    }
    const e = t.formPreset || Ie(), a = t.formPermission || Ne(), o = String(t.formTitle || "").trim();
    P("正在新建对话…");
    try {
      const r = await x.createSession({
        preset: e,
        permission: a,
        ...o ? { title: o } : {}
      }), l = r && r.current ? String(r.current) : "";
      if (l && t.formProvider && t.formModel)
        try {
          const d = await x.selectModel({
            sessionId: l,
            provider: t.formProvider,
            model: t.formModel,
            ...t.formEffort ? { reasoningEffort: t.formEffort } : {}
          });
          d && d.meta && (t.meta = d.meta);
        } catch {
        }
      rt(), lt(), g.clear(), t.booting = !0, t.historyLimitReached = !1, t.stopped = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, t.lastListTop = 0, t.projections = {}, t.hydrated = !1, t.waiting = !1, t.busy = !1, t.pending = [], t.running = !1, t.lastEventAge = 0, t.waitingSince = 0, t.staleShown = !1, st(), r && r.current && (t.currentSession = String(r.current)), t.currentSession && E.clearOthers(t.currentSession).catch(() => {
      }), r && r.meta && (t.meta = r.meta, St()), pt(r && r.title || "新对话"), t.view = "chat", n.page && (n.page.hidden = !0), R(!0), J === "sse" && xt(), n.input && n.input.focus(), yt(), t.formTitle = "", P(r && r.created === !1 ? "已经是新对话" : "新对话已就绪");
    } catch (r) {
      P("新建失败：" + (r && r.message || "未知错误"), "error");
    }
  }
  function ma() {
    const e = s && s.querySelector('[data-role="mode-group"]');
    if (e)
      for (const a of e.querySelectorAll('[data-action="pick-mode"]'))
        a.dataset.on = a.dataset.value === t.mode ? "1" : "0";
  }
  function ba() {
    if (!n.notifyMode) return;
    const e = t.notifyMode === "message" ? "message" : "turn";
    for (const a of n.notifyMode.querySelectorAll('[data-action="pick-notify-mode"]'))
      a.dataset.on = a.dataset.value === e ? "1" : "0";
  }
  function Tt() {
    yt(), t.view = "settings", t.testResult = null, t.openAcc = "", Ue(), n.page.hidden = !1, n.inputUrl.value = t.lanUrl || ft, n.inputWan && (n.inputWan.value = t.wanUrl || ""), ma(), n.inputToken.value = t.token || "", n.lanState && (n.lanState.textContent = "", n.lanState.dataset.tone = ""), n.wanState && (n.wanState.textContent = "", n.wanState.dataset.tone = ""), n.version.textContent = k ? "v" + k + " · 由 DSH 插件托管" : "由 DSH 插件托管", ba(), Ta(""), ne(), Sa();
  }
  function xa() {
    t.view = "chat", n.page.hidden = !0, R();
  }
  async function Xn() {
    const e = vt(n.inputUrl.value), a = n.inputWan ? vt(n.inputWan.value) : "", o = n.inputToken.value.trim(), r = o ? { Authorization: "Bearer " + o } : {}, l = (u, $, S) => {
      u && (u.textContent = $, u.dataset.tone = S || "");
    };
    l(n.lanState, e ? "· 网络测试中" : "· 未填", e ? "busy" : ""), l(n.wanState, a ? "· 网络测试中" : "· 未填", a ? "busy" : "");
    const d = s && s.querySelector('[data-action="test"]');
    d && (d.dataset.busy = "1");
    const y = async (u, $) => {
      if (!u) return { text: "未填", tone: "" };
      const S = Date.now();
      try {
        const z = await ea(u + "/health", { headers: r }, $);
        if (!z.ok) throw new Error("HTTP " + z.status);
        const F = await z.json().catch(() => ({})), G = Date.now() - S;
        return {
          text: (F && F.hasKey === !1 ? "可连接（未配 Key）" : "可连接") + " · " + G + "ms",
          tone: "ok"
        };
      } catch {
        return { text: "连不上", tone: "bad" };
      }
    }, [q, C] = await Promise.all([y(e, 4e3), y(a, 6e3)]);
    l(n.lanState, "· " + q.text, q.tone), l(n.wanState, "· " + C.text, C.tone), d && delete d.dataset.busy;
  }
  function Jn() {
    return tr({
      appId: m,
      base: t.url || ft,
      token: t.token || "",
      notify: t.notify !== !1,
      mode: t.notifyMode === "message" ? "message" : "turn"
    });
  }
  function Rt() {
    if (!(!c.watch || typeof c.watch.start != "function")) {
      if (t.notify === !1) {
        c.watch.stop(m).catch(() => {
        });
        return;
      }
      c.watch.start(Jn()).catch(() => {
      });
    }
  }
  let ae = !1, Le = 0, ze = 0, ya = 0, va = 0, wa = 0, ka = 0;
  async function Zn(e, a) {
    if (!e) return !1;
    try {
      return (await ea(e + "/health", {}, a || 1200)).ok;
    } catch {
      return !1;
    }
  }
  async function dt(e) {
    if (ae) return !1;
    ae = !0;
    const a = ++Le;
    window.clearTimeout(ze);
    try {
      const o = t.mode || (t.autoPick ? "auto" : t.pick === "wan" ? "wan" : "lan"), l = (o === "auto" ? t.wanFirst ? [t.wanUrl, t.lanUrl] : [t.lanUrl, t.wanUrl] : [o === "wan" ? t.wanUrl : t.lanUrl]).filter(Boolean);
      if (l.length === 0)
        return Q("bad", o === "wan" ? "外部地址未填" : "家里地址未填"), !1;
      const d = t.status === "ok";
      let y = 0;
      d || (y = window.setTimeout(() => {
        t.status !== "ok" && Q("busy", "网络连接中…");
      }, 1e3));
      const q = (G) => G === t.lanUrl ? 1600 : 5e3, C = await Promise.all(l.map((G) => Zn(G, q(G))));
      if (window.clearTimeout(y), a !== Le) return !1;
      const u = C.findIndex(Boolean), $ = u >= 0 ? l[u] : "";
      if (!$) {
        const G = l.length > 1 ? "家里和外部都连不上" : o === "wan" ? "外部连不上" : "家里连不上";
        return Q("bad", G), t.wanFirst = !0, ze = window.setTimeout(() => {
          U || dt();
        }, 2e3), !1;
      }
      const S = t.url;
      t.wanFirst = !1;
      const z = $ !== t.url;
      t.url = $;
      const F = $ === t.lanUrl ? "家里" : "外部";
      return Q("ok", "已连接 · " + F), z && S && P("已切换到" + F), (z || e) && (t.hydrated = !1, g.cursor = 0, Kt(), Rt(), lt(), J === "sse" ? xt() : Pt(!0)), ne(), !0;
    } finally {
      a === Le && (ae = !1);
    }
  }
  async function Sa() {
    if (!n.relay) return;
    const e = t.notify !== !1;
    if (n.relayToggle && (n.relayToggle.checked = e), n.relaySum && (n.relaySum.textContent = e ? "已开启 · 横幅" : "已关闭"), !e) {
      n.relay.textContent = "后台提醒：已关闭", n.relay.dataset.tone = "bad";
      return;
    }
    if (!c.watch || typeof c.watch.status != "function") {
      n.relay.textContent = "后台提醒：当前壳不支持", n.relay.dataset.tone = "bad";
      return;
    }
    try {
      const a = await c.watch.status(m);
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
  function Ta(e) {
    const a = t.openAcc === e ? "" : e;
    if (t.openAcc = a, n.serverBody && (n.serverBody.hidden = a !== "server"), n.relayBody && (n.relayBody.hidden = a !== "relay"), n.cacheBody && (n.cacheBody.hidden = a !== "cache"), n.resetBody && (n.resetBody.hidden = a !== "reset"), s)
      for (const o of s.querySelectorAll(".chat-acc"))
        o.dataset.open = o.dataset.acc === a ? "1" : "0";
  }
  function ne() {
    if (!n.serverSum) return;
    const e = t.url || ft, a = t.mode || "auto", o = a === "wan" ? "手动外部" : a === "lan" ? "手动家里" : e === t.lanUrl ? "自动·家里" : "自动·外部";
    n.serverSum.textContent = e + " · " + o;
  }
  async function to() {
    if (!c.watch || typeof c.watch.test != "function") {
      P("当前壳不支持测试提醒", "error");
      return;
    }
    try {
      if (typeof c.watch.ensurePermission == "function" && !await c.watch.ensurePermission()) {
        P("通知权限没开：去系统设置里允许「像素盒子」发通知后再试", "error");
        return;
      }
      await c.watch.test(), P("已发送测试提醒");
    } catch (e) {
      P("发送失败：" + (e && e.message || "未知错误"), "error");
    }
  }
  function eo() {
    if (!n.inputToken.value.trim()) {
      P("访问令牌不能为空，电脑端「设置 → 手机中转」里可以看到", "error");
      return;
    }
    t.lanUrl = vt(n.inputUrl.value) || ft, t.wanUrl = n.inputWan ? vt(n.inputWan.value) : "", t.autoPick = t.mode === "auto", t.pick = t.mode === "wan" ? "wan" : "lan", t.url = t.mode === "wan" && t.wanUrl || t.lanUrl, t.token = n.inputToken.value.trim(), Kt(), Rt(), t.hydrated = !1, g.cursor = 0, t.openAcc = "", n.serverBody && (n.serverBody.hidden = !0);
    const e = s && s.querySelector('[data-acc="server"]');
    e && (e.dataset.open = "0"), ne(), P("已保存"), dt(!0);
  }
  async function $a(e) {
    try {
      if (c.clipboard && typeof c.clipboard.write == "function")
        return await c.clipboard.write(e), !0;
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
      if (c.openExternal && typeof c.openExternal == "function") {
        c.openExternal(e).catch(() => P("打不开链接", "error"));
        return;
      }
      window.open(e, "_blank", "noopener,noreferrer");
    }
  }
  async function no(e, a) {
    try {
      if (c.download && typeof c.download == "function")
        await c.download(e, a);
      else {
        const o = document.createElement("a");
        o.href = e, o.download = a || "", o.rel = "noopener", document.body.appendChild(o), o.click(), o.remove();
      }
      P("已开始下载" + (a ? "：" + a : ""));
    } catch (o) {
      P("下载失败：" + (o && o.message || "未知错误"), "error");
    }
  }
  function Aa(e) {
    return e ? String(e.currentSrc || e.src || e.getAttribute("data-src") || e.getAttribute("data-remote") || "") : "";
  }
  function $t() {
    const e = O, a = e.list[e.index] || "";
    a && (n.viewerImg.src = a), n.viewerImg.style.transform = "translate(" + e.x + "px," + e.y + "px) scale(" + e.scale + ")", n.viewer.classList.toggle("is-zoomed", e.scale > 1);
    const o = e.list.length > 1;
    n.viewerCount && (n.viewerCount.hidden = !o, n.viewerCount.textContent = e.index + 1 + " / " + e.list.length), n.viewerPrev && (n.viewerPrev.hidden = !o), n.viewerNext && (n.viewerNext.hidden = !o);
  }
  function oo(e, a) {
    if (!e) return;
    const o = a && a.closest(".chat-turn") || a && a.closest(".chat-tool") || a && a.closest(".chat-card") || n.list, r = o ? Array.from(o.querySelectorAll("img.chat-image")) : [], l = [];
    for (const y of r) {
      const q = Aa(y);
      q && !l.includes(q) && l.push(q);
    }
    l.length === 0 && l.push(e);
    const d = Math.max(0, l.indexOf(e));
    O = { list: l, index: d >= 0 ? d : 0, scale: 1, x: 0, y: 0 }, et = !1, n.viewer.hidden = !1, $t();
  }
  function oe() {
    n.viewer.hidden = !0, n.viewerImg.removeAttribute("src"), n.viewerImg.style.transform = "", O = { list: [], index: 0, scale: 1, x: 0, y: 0 }, et = !1, tt.clear(), mt = null, bt = 0, window.clearTimeout(ct), ct = 0, n.viewer && n.viewer.classList.remove("is-zoomed");
  }
  function Ce(e) {
    const a = O.list.length;
    a < 2 || (O.index = (O.index + e + a) % a, O.scale = 1, O.x = 0, O.y = 0, $t());
  }
  function ro() {
    O.scale > 1 ? (O.scale = 1, O.x = 0, O.y = 0) : O.scale = 2, $t();
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
      const [r, l] = [...tt.values()], d = Math.hypot(r.x - l.x, r.y - l.y) || 1;
      O.scale = Math.min(4, Math.max(1, mt.scale * d / mt.distance)), $t(), et = !0;
      return;
    }
    if (!at) return;
    const a = e.clientX - at.x, o = e.clientY - at.y;
    Math.abs(a) + Math.abs(o) > 4 && (at.moved = !0), O.scale > 1 && (O.x = at.panX + a, O.y = at.panY + o, $t(), et = !0);
  }
  function qa(e) {
    if (tt.has(e.pointerId) && tt.delete(e.pointerId), mt && tt.size < 2) {
      mt = null, O.scale < 1.05 && (O.scale = 1, O.x = 0, O.y = 0), $t(), et = !0, at = null;
      return;
    }
    const a = at;
    if (at = null, !a) return;
    const o = e.clientX - a.x, r = e.clientY - a.y;
    if (a.moved) {
      if (O.scale <= 1 && Math.abs(o) > 48 && Math.abs(o) > Math.abs(r)) {
        Ce(o < 0 ? 1 : -1), et = !0, bt = 0;
        return;
      }
      if (O.scale <= 1 && r > 80 && Math.abs(r) > Math.abs(o)) {
        oe(), et = !0, bt = 0;
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
      ct = 0, oe();
    }, 300);
  }
  function P(e, a) {
    n.toast && (n.toast.textContent = e, n.toast.style.background = a === "error" ? "rgba(150, 62, 50, 0.92)" : "rgba(30, 40, 48, 0.88)", n.toast.classList.add("is-on"), window.clearTimeout(V), V = window.setTimeout(() => {
      n.toast.classList.remove("is-on");
    }, 2200));
  }
  const re = /* @__PURE__ */ new Map();
  function co(e, a, o) {
    const r = document.createElement("button");
    r.type = "button", r.className = "chat-image-fallback", r.dataset.src = a, r.textContent = o, e.replaceWith(r);
  }
  function se() {
    n.list && (n.list.querySelectorAll("img.chat-image[data-src]").forEach((e) => {
      if (e.dataset.bound) return;
      e.dataset.bound = "1";
      const a = e.getAttribute("data-src");
      if (!a) return;
      const o = re.get(a);
      if (o) {
        e.src = o;
        return;
      }
      fetch(a).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.blob();
      }).then((r) => {
        const l = URL.createObjectURL(r);
        re.set(a, l), e.src = l;
      }).catch((r) => {
        if (!e.dataset.retried) {
          e.dataset.retried = "1", e.dataset.bound = "", setTimeout(se, 900);
          return;
        }
        if (!e.dataset.directTry) {
          e.dataset.directTry = "1", e.dataset.bound = "", e.src = a;
          return;
        }
        const l = document.createElement("button");
        l.type = "button", l.className = "chat-image-fallback", l.dataset.src = a;
        const d = String(a || "").split("/").pop();
        l.textContent = "图片打不开 · " + d + " · " + String(r && r.message || r || "未知").slice(0, 24), e.replaceWith(l);
      });
    }), n.list.querySelectorAll("img.chat-image[data-remote]").forEach((e) => {
      if (e.dataset.bound) return;
      e.dataset.bound = "1";
      const a = e.getAttribute("data-remote");
      if (!a) return;
      const o = re.get(a);
      if (o) {
        e.src = o;
        return;
      }
      fetch(a, { credentials: "omit", referrerPolicy: "no-referrer" }).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.blob();
      }).then((r) => {
        const l = URL.createObjectURL(r);
        re.set(a, l), e.src = l;
      }).catch(() => {
        if (!e.dataset.retried) {
          e.dataset.retried = "1", e.dataset.bound = "", setTimeout(se, 900);
          return;
        }
        co(e, a, "外链图片打不开 · 点按重试");
      });
    }));
  }
  function Be() {
    if (!n.list) return !0;
    const e = n.list;
    return e.scrollHeight - e.scrollTop - e.clientHeight < 72;
  }
  function Re() {
    if (!n.jump || !n.list) return;
    const e = n.list.scrollTop, a = Be(), o = e < t.lastListTop - 2;
    t.lastListTop = e;
    const r = Date.now() - t.lastUserScroll < 800;
    o && r ? (t.reading = !0, t.holdAnswer = !1) : a && (t.reading = !1, t.holdAnswer = !1), n.jump.hidden = a, a && !t.reading && t.pendingPaint && (t.pendingPaint = !1, R(!0));
  }
  function Ma(e) {
    return e.kind === "deliverable" ? hr(
      e,
      (a, o, r) => x.presentedFileUrl(a, o, r, t.currentSession)
    ) : e.kind === "approval" ? fr(e) : e.kind === "input" ? mr(e, Ft.get(String(e.callId)) || {}, Wt.has(String(e.callId))) : "";
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
  function Ea(e) {
    let a = -1;
    for (let o = 0; o < e.length; o += 1) {
      const r = e[o];
      r.kind === "message" && r.message && r.message.who === "me" && (a = o);
    }
    if (a < 0) return !1;
    for (let o = a + 1; o < e.length; o += 1) {
      const r = e[o];
      if (r.kind === "message" && r.message && r.message.who === "ai") return !0;
    }
    return !1;
  }
  function uo(e) {
    let a = -1;
    for (let d = 0; d < e.length; d += 1) {
      const y = e[d];
      y.kind === "message" && y.message && y.message.who === "me" && (a = d);
    }
    if (a < 0) return null;
    let o = !1, r = !1, l = !1;
    for (let d = a + 1; d < e.length; d += 1) {
      const y = e[d];
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
    let r = [], l = [], d = [];
    const y = (M, Z, ot, X) => {
      ot && M.push({ key: Z, html: ot, ...X || {} });
    };
    let q = !1, C = !1, u = 0, $ = -1;
    for (let M = 0; M < e.length; M += 1)
      e[M].kind === "message" && e[M].message && e[M].message.who === "me" && ($ = M);
    const S = Math.max(1, e.filter((M) => M.kind === "message" && M.message && M.message.who === "me").length);
    let z = 0, F = 0;
    const G = () => {
      if (r.length === 0 && z === 0) return;
      const M = u >= S - 2 && !(t.stopped && C), Z = r[0] ? "group-" + r[0].id : "group-turn-" + u;
      M && y(
        d,
        "g:" + u,
        pr(r, Ot.has(Z), null, Vt, {
          total: z,
          running: F,
          activeId: t.toolActiveId
        }),
        { className: "chat-tool-footer-block" }
      ), r = [], z = 0, F = 0;
    }, ht = () => {
      G();
      let M = d.find((X) => X.key === "g:" + u);
      const Z = [...l].reverse().find((X) => X.assistant || X.key === "x:streaming" || X.key === "x:typing"), ot = q || !!l.some((X) => X.key === "x:streaming" || X.key === "x:typing");
      C && !t.stopped && t.awaitingReply && ot && Z && (M ? M.className = "chat-tool-footer-block" : (M = {
        key: "g:" + u,
        html: ur(),
        className: "chat-tool-footer-block"
      }, d.push(M))), M && (d = d.filter((X) => X !== M), d.unshift(M)), o.push(...l, ...d), l = [], d = [], q = !1, C = !1, u += 1;
    };
    return e.forEach((M, Z) => {
      if (M.kind === "message" && M.message.who === "me") {
        ht(), C = Z === $;
        const ot = M.message.id || M.message.eventId || M.message.seq || `at-${M.message.at}-${Z}`;
        y(o, "m:" + ot, sn(M.message, Vt));
        return;
      }
      if (M.kind === "tool") {
        if (z += 1, (M.status === "running" || !M.status && M.done !== !0) && (F += 1), M.status === "ok" || M.status === "failed") {
          r.push(M);
          return;
        }
        return;
      }
      if (M.kind === "deliverable") {
        y(d, M.kind + ":" + (M.id || Z), Ma(M));
        return;
      }
      if (M.kind === "message") {
        const ot = M.message.id || M.message.eventId || M.message.seq || `at-${M.message.at}-${Z}`;
        M.message.who === "ai" && (q = !0), y(l, "m:" + ot, sn(M.message, Vt), {
          assistant: M.message.who === "ai"
        });
      } else
        y(l, M.kind + ":" + (M.id || Z), Ma(M));
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
      html: `<div class="chat-history-limit">只显示最近 ${H} 轮，更早记录请在电脑端查看</div>`
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
    if (!s) return;
    const e = s.querySelector('[data-role="tool-sheet"]'), a = s.querySelector('[data-role="tool-sheet-body"]');
    if (!e || !a) return;
    const o = t.toolDetailId ? g.cards.get(t.toolDetailId) : null;
    if (!o) {
      ie();
      return;
    }
    a.innerHTML = dr(o, Vt), e.hidden = !1, se();
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
  function ie() {
    if (t.toolDetailId = "", !s) return;
    const e = s.querySelector('[data-role="tool-sheet"]');
    e && (e.hidden = !0);
  }
  function mo(e) {
    const a = n.list, o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const d of Array.from(a.children))
      d.dataset && d.dataset.block ? o.set(d.dataset.block, d) : d.remove();
    let l = a.firstChild;
    for (const d of e) {
      const y = "chat-block" + (d.className ? " " + d.className : "");
      let q = o.get(d.key);
      if (!q)
        q = document.createElement("div"), q.className = y, q.dataset.block = d.key, q.innerHTML = d.html, q.__html = d.html;
      else if (q.className !== y && (q.className = y), q.__html !== d.html) {
        const C = q.querySelector(".chat-tool-group-body"), u = C ? {
          top: C.scrollTop,
          atBottom: C.scrollHeight - C.scrollTop - C.clientHeight < 24
        } : null;
        if (q.innerHTML = d.html, q.__html = d.html, u) {
          const $ = q.querySelector(".chat-tool-group-body");
          if ($) {
            const S = () => {
              $.scrollTop = u.atBottom ? $.scrollHeight : u.top;
            };
            S(), window.requestAnimationFrame(S);
          }
        }
      }
      r.set(d.key, q), q === l ? l = l.nextSibling : a.insertBefore(q, l);
    }
    for (; l; ) {
      const d = l.nextSibling;
      l.remove(), l = d;
    }
    return r;
  }
  function bo() {
    const e = t.projections || {}, a = [], o = Array.isArray(e.todos) ? e.todos : null;
    if (o && o.length > 0) {
      const d = o.filter((q) => q.status === "completed").length, y = o.map((q) => `<li class="chat-todo-item ${q.status === "completed" ? "is-done" : q.status === "in_progress" ? "is-active" : ""}"><span class="chat-todo-mark" aria-hidden="true"></span><span>${N(q.content || "")}</span></li>`).join("");
      a.push(
        `<div class="chat-card chat-todo"><div class="chat-card-head"><span class="chat-card-icon" aria-hidden="true">☑</span><span class="chat-card-title">待办</span><span class="chat-card-badge">${d}/${o.length}</span></div><ul class="chat-todo-list">${y}</ul></div>`
      );
    }
    const r = e.goal;
    if (r && r.goal && r.goal.objective) {
      const d = String(r.goal.phase || "active"), y = d === "complete" ? "已完成" : d === "paused" ? "已暂停" : d === "blocked" ? "受阻" : "进行中";
      a.push(
        `<div class="chat-card chat-goal"><div class="chat-card-head"><span class="chat-card-icon" aria-hidden="true">◎</span><span class="chat-card-title">目标</span><span class="chat-card-badge">${N(y)}</span></div><p class="chat-card-text">${N(r.goal.objective)}</p><p class="chat-card-sub">第 ${Number(r.roundsStarted) || 0} / ${Number(r.goal.maxGoalRounds) || 0} 轮</p></div>`
      );
    }
    const l = e.plan;
    return l && l.active && a.push(`<div class="chat-plan-chip">🧭 计划模式${l.pending ? " · 等待批准" : ""}</div>`), a.join("");
  }
  let jt = 0, ut = [];
  function je() {
    const e = [...T];
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
        (o) => `<span class="chat-math-item" style="left:${o.left}px">${N(o.text)}</span>`
      ).join("")}</div>`
    ).join("");
  }
  function Pa() {
    return ut.length || (ut = je()), `<div class="chat-math-board">${Na()}</div>`;
  }
  function xo() {
    if (!n.list) return;
    const e = n.list.querySelector(".chat-math-board");
    e && (ut = je(), e.innerHTML = Na());
  }
  function yo() {
    ut.length || (ut = je()), !jt && (jt = window.setInterval(xo, b));
  }
  function La() {
    jt && (window.clearInterval(jt), jt = 0, ut = []);
  }
  function ce(e = !1) {
    if (t.reading && !e) {
      t.pendingPaint = !0;
      return;
    }
    if (e) {
      R(!0);
      return;
    }
    _ || (_ = window.requestAnimationFrame(() => {
      _ = 0, U || R();
    }));
  }
  function R(e) {
    if (!n.list) return;
    const a = n.list ? n.list.scrollTop : 0, o = n.list ? n.list.scrollHeight : 0, r = Be(), l = !e && !t.reading && !t.holdAnswer && r, d = g.timeline(), y = [...d].reverse().find((it) => it.kind === "tool" && it.status === "running"), q = t.lastEventAt ? Date.now() - t.lastEventAt : Number(t.lastEventAge) || 0, C = (t.awaitingReply || t.running || y) && q > 3e5;
    t.staleShown = C;
    const u = t.awaitingReply || t.waiting || t.running || !!(t.currentTool && !t.currentTool.done) || !!y, $ = !t.currentTool && t.lastTool && Date.now() - (t.lastToolAt || 0) < 1e4 ? { ...t.lastTool, done: !0 } : null, S = u ? y || t.currentTool || $ : null, z = S && S.name ? String(S.name) : "", F = u && !z && !C, G = S && (S.summary || S.detail) ? String(S.summary || S.detail) : "", ht = !!(S && S.status !== "running" && S.done), M = C ? "可能已断开" : z ? ht ? "执行完成…" : "执行中…" : "思考中…", Z = C ? "" : z ? z + (G ? "：" + G : "") : "", ot = F ? Pa() : "", X = C ? "" : F ? ot : `<span class="chat-typing-detail">${N(Z)}</span>`, qt = t.stream && t.stream.text ? String(t.stream.text) : "", Fe = t.stream && t.stream.reasoning ? String(t.stream.reasoning) : "", We = !!(Fe && !qt && !C), Po = We ? `<span class="chat-typing-head"><span class="chat-typing-text">思考中…</span><span class="chat-typing-dot"></span></span>${Pa()}` : "", Lo = qt || Fe ? `<div class="chat-turn is-ai"><div class="chat-meta"><span class="chat-avatar">🤖</span><span class="chat-stamp">${Et(Date.now())}</span></div><div class="chat-bubble is-ai is-typing is-streaming${We ? " is-thinking" : ""}">${Po}${qt ? `<div class="chat-stream-text">${dn(qt)}</div>` : ""}${qt ? '<span class="chat-typing-dot"></span>' : ""}</div></div>` : "", zo = u && !qt && !Fe ? `<div class="chat-turn is-ai"><div class="chat-meta"><span class="chat-avatar">🤖</span><span class="chat-stamp">${Et(Date.now())}</span></div><div class="chat-bubble is-ai is-typing${F ? " is-thinking" : ""}${C ? " is-stale" : ""}"><span class="chat-typing-head"><span class="chat-typing-text">${M}</span><span class="chat-typing-dot"></span></span>${X}</div></div>` : "", Va = u && t.runActive && !t.stopped ? Lo || zo : "";
    F || We ? yo() : La();
    const Ya = bo(), Co = uo(d), Bo = !!t.url, Ro = d.length === 0 && !Va && !Ya ? `<div class="chat-sys">${Bo ? "说点什么吧，电脑端的回复会同步过来" : "先在 ⚙ 里填电脑地址，例如 http://192.168.2.6:8788"}</div>` : "", Qa = po(d, {
      tip: Ro,
      projections: Ya,
      execution: Va,
      localNotice: Co
    }), jo = mo(Qa);
    let Ke = !1;
    if (t.focusLastAssistant) {
      if (!t.reading && r) {
        const it = [...Qa].reverse().find((Ge) => Ge.assistant), de = it ? jo.get(it.key) : null;
        if (de) {
          for (const Ho of K) window.clearTimeout(Ho);
          K = [];
          const Ge = n.list.getBoundingClientRect(), Do = de.getBoundingClientRect();
          n.list.scrollTop = Math.max(0, n.list.scrollTop + Do.top - Ge.top - 8), t.lastListTop = n.list.scrollTop, t.holdAnswer = !Be(), Ke = !0;
        }
      }
      t.focusLastAssistant = !1;
    }
    if (!Ke && !r && (n.list.scrollTop = a + Math.max(0, n.list.scrollHeight - o)), (l || e) && !Ke) {
      for (const de of K) window.clearTimeout(de);
      K = [], Dt();
      const it = () => {
        !t.reading && !t.holdAnswer && Dt();
      };
      requestAnimationFrame(it), K.push(window.setTimeout(it, 260)), K.push(window.setTimeout(it, 900));
    }
    se(), wo(), t.toolDetailId && Ia(), Ba(), Re();
  }
  function za() {
    if (!n.status) return;
    n.status.dataset.status = t.status;
    const e = t.statusText || "连接状态";
    n.status.title = e, n.status.setAttribute("aria-label", e), ne(), vo();
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
    n.title.textContent = e, n.title.title = e, xe();
  }
  function Ba() {
    if (!n.send) return;
    const e = $e() || t.runActive && (t.waiting || t.running || t.awaitingReply);
    n.send.textContent = e ? "■" : "↑", n.send.classList.toggle("is-stop", e), n.send.setAttribute("aria-label", e ? "停止等待" : "发送"), n.send.dataset.action = e ? "stop" : "send";
  }
  function Dt() {
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
        const d = n.list, y = a.getBoundingClientRect().top - d.getBoundingClientRect().top + d.scrollTop;
        d.scrollTo({ top: Math.max(0, y - 8), behavior: "smooth" });
      }), a.appendChild(r);
    }
  }
  let Ht = [];
  function De() {
    for (const e of Ht) window.clearTimeout(e);
    Ht = [], Dt();
    for (const e of [80, 180, 320, 480])
      Ht.push(window.setTimeout(Dt, e));
  }
  function He() {
    n.input && (n.input.style.height = "auto", n.input.style.height = Math.min(120, n.input.scrollHeight) + "px");
  }
  function Ue() {
    !s || !n.top || s.style.setProperty("--chat-header-h", Math.round(n.top.getBoundingClientRect().height) + "px");
  }
  function Ra(e) {
    if (!e || !s) return;
    const a = t.insets;
    t.insets = e, s.style.setProperty("--chat-top", Math.max(0, Number(e.top) || 0) + "px"), s.style.setProperty("--chat-bottom", Math.max(0, Number(e.bottom) || 0) + "px"), s.style.setProperty("--chat-ime", Math.max(0, Number(e.ime) || 0) + "px"), Ue(), (e.ime || 0) !== (a.ime || 0) && window.setTimeout(() => {
      e.ime > 0 && t.view === "settings" && It ? It.scrollIntoView({ block: "center", behavior: "smooth" }) : De();
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
    document.getElementById(Ja) || (D = document.createElement("style"), D.id = Ja, D.textContent = Uo, document.head.appendChild(D));
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
      title: s.querySelector('[data-role="title"]'),
      status: s.querySelector('[data-role="status"]'),
      net: s.querySelector('[data-role="net"]'),
      netText: s.querySelector('[data-role="net-text"]'),
      netNote: s.querySelector(".chat-net-note"),
      list: s.querySelector('[data-role="list"]'),
      loadSpinner: s.querySelector('[data-role="load-spinner"]'),
      top: s.querySelector(".chat-top"),
      jump: s.querySelector('[data-role="jump"]'),
      input: s.querySelector('[data-role="draft"]'),
      attach: s.querySelector('[data-role="attach"]'),
      pick: s.querySelector('[data-role="pick"]'),
      send: s.querySelector(".chat-send"),
      toast: s.querySelector('[data-role="toast"]'),
      page: s.querySelector('[data-role="page"]'),
      inputUrl: s.querySelector('[data-role="url"]'),
      inputWan: s.querySelector('[data-role="wan"]'),
      inputAuto: s.querySelector('[data-role="auto"]'),
      modeGroup: s.querySelector('[data-role="mode-group"]'),
      inputToken: s.querySelector('[data-role="token"]'),
      drawer: s.querySelector('[data-role="drawer"]'),
      drawerList: s.querySelector('[data-role="drawer-list"]'),
      drawerCreate: s.querySelector('[data-role="drawer-create"]'),
      sessionSearch: s.querySelector('[data-role="session-search"]'),
      switchBtn: s.querySelector('[data-action="switch"]'),
      newBody: s.querySelector('[data-role="new-body"]'),
      searchScrim: s.querySelector('[data-role="search-scrim"]'),
      searchInput: s.querySelector('[data-role="message-search"]'),
      searchBody: s.querySelector('[data-role="search-body"]'),
      sessionMenu: s.querySelector('[data-role="session-menu"]'),
      renameScrim: s.querySelector('[data-role="rename-scrim"]'),
      renameInput: s.querySelector('[data-role="rename-input"]'),
      archiveScrim: s.querySelector('[data-role="archive-scrim"]'),
      archiveText: s.querySelector('[data-role="archive-text"]'),
      modelChip: s.querySelector('[data-role="model-chip"]'),
      modelScrim: s.querySelector('[data-role="model-scrim"]'),
      modelBody: s.querySelector('[data-role="model-body"]'),
      confirmScrim: s.querySelector('[data-role="confirm"]'),
      test: s.querySelector('[data-role="test"]'),
      lanState: s.querySelector('[data-role="lan-state"]'),
      wanState: s.querySelector('[data-role="wan-state"]'),
      relay: s.querySelector('[data-role="relay"]'),
      relaySum: s.querySelector('[data-role="relay-sum"]'),
      relayToggle: s.querySelector('[data-role="relay-toggle"]'),
      relayBody: s.querySelector('[data-role="relay-body"]'),
      cacheBody: s.querySelector('[data-role="cache-body"]'),
      resetBody: s.querySelector('[data-role="reset-body"]'),
      notifyMode: s.querySelector('[data-role="notify-mode"]'),
      serverSum: s.querySelector('[data-role="server-sum"]'),
      serverBody: s.querySelector('[data-role="server-body"]'),
      version: s.querySelector('[data-role="version"]'),
      helpScrim: s.querySelector('[data-role="help"]'),
      scrim: s.querySelector('[data-role="scrim"]'),
      sheetBody: s.querySelector('[data-role="sheet-body"]'),
      viewer: s.querySelector('[data-role="viewer"]'),
      viewerImg: s.querySelector('[data-role="viewer-img"]'),
      viewerCount: s.querySelector('[data-role="viewer-count"]'),
      viewerPrev: s.querySelector('[data-action="viewer-prev"]'),
      viewerNext: s.querySelector('[data-action="viewer-next"]')
    }, n.input && n.input.addEventListener("focus", () => {
      s.style.setProperty("--chat-bottom", "0px");
    }), n.viewer && (n.viewer.addEventListener("pointerdown", so), n.viewer.addEventListener("pointermove", io), n.viewer.addEventListener("pointerup", qa), n.viewer.addEventListener("pointercancel", qa)), n.list) {
      n.list.addEventListener("scroll", Re, { passive: !0 }), n.list.addEventListener("scroll", ia, { passive: !0 });
      const e = () => {
        t.lastUserScroll = Date.now();
      };
      n.list.addEventListener("touchmove", e, { passive: !0 }), n.list.addEventListener("wheel", e, { passive: !0 }), n.list.addEventListener("pointerdown", e, { passive: !0 });
    }
    Ue();
  }
  function ja(e) {
    let a = Ft.get(e);
    return a || (a = { selected: {}, custom: {} }, Ft.set(e, a)), a;
  }
  function Ao(e) {
    const a = String(e.dataset.input || ""), o = String(e.dataset.q || ""), r = String(e.dataset.value || "");
    if (!a || !o) return;
    const l = ja(a), d = Array.isArray(l.selected[o]) ? l.selected[o] : [];
    e.dataset.multi === "1" ? l.selected[o] = d.includes(r) ? d.filter((y) => y !== r) : [...d, r] : l.selected[o] = [r], R();
  }
  async function qo(e) {
    if (!e || Wt.has(e)) return;
    const a = g.cards.get("input-" + e);
    if (!a) return;
    const o = gr(a, Ft.get(e) || {});
    if (!o) {
      P("先把每个问题都答一下", "error");
      return;
    }
    Wt.add(e), t.lastProgressAt = Date.now(), R();
    try {
      await x.respond(e, o, t.currentSession || ""), P("已回答");
    } catch (r) {
      Wt.delete(e), R(), P("提交失败：" + (r && r.message || "网络错误"), "error");
    }
  }
  function Mo(e, a) {
    if (e)
      if (e === "send")
        Ae(t.draft);
      else if (e === "stuck-skip")
        ca(!1);
      else if (e === "stuck-wait")
        t.stuckPrompt = !1, t.lastProgressAt = Date.now(), R();
      else if (e === "attach")
        n.pick && n.pick.click();
      else if (e === "stop")
        En();
      else if (e === "settings")
        Tt();
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
      } else e === "back" ? xa() : e === "switch" ? t.sessionsOpen ? yt() : Yt() : e === "close-app" ? Vn() : e === "confirm-cancel" ? ee() : e === "confirm-ok" ? (ee(), Yn()) : e === "test" ? Xn() : e === "test-relay" ? to() : e === "save" ? eo() : e === "close-sheet" ? yt() : e === "new-session" ? Kn() : e === "close-new" ? Pe() : e === "open-help" ? n.helpScrim && (n.helpScrim.hidden = !1) : e === "close-help" ? n.helpScrim && (n.helpScrim.hidden = !0) : e === "create-session" ? Qn() : e === "open-models" ? On() : e === "close-models" ? te() : e === "apply-model" && Wn();
  }
  function Da(e) {
    const a = e.target;
    if (!(a instanceof Element)) return;
    if (a.matches('[data-role="tool-sheet"]')) {
      ie();
      return;
    }
    const o = a.closest("[data-action]");
    if (o) {
      const u = o.dataset.action;
      if (u === "remove-attach") {
        $n(o.dataset.key || "");
        return;
      }
      if (u === "tool-copy") {
        const $ = String(o.dataset.tool || ""), S = String(o.dataset.copy || ""), z = $ ? g.cards.get($) : null, F = S === "args" ? z && z.args : z && z.preview;
        F && c.clipboard && typeof c.clipboard.write == "function" && c.clipboard.write(String(F)).then(() => P("已复制")).catch(() => P("复制失败", "error"));
        return;
      }
      if (u === "tool-open") {
        const $ = String(o.dataset.tool || "");
        $ && go($);
        return;
      }
      if (u === "close-tool-sheet") {
        ie();
        return;
      }
      if (u === "tool-group-toggle") {
        const $ = String(o.dataset.group || "");
        if (!$) return;
        Ot.has($) ? Ot.delete($) : Ot.add($), R();
        return;
      }
      if (u === "approval-allow" || u === "approval-deny") {
        const $ = String(o.dataset.approval || ""), S = $.startsWith("approval-") ? $.slice(9) : $;
        mn(S, u === "approval-allow");
        return;
      }
      if (u === "q-pick") {
        Ao(o);
        return;
      }
      if (u === "q-submit") {
        qo(String(o.dataset.input || ""));
        return;
      }
      if (u === "jump-bottom") {
        Dt(), Re();
        return;
      }
      if (u === "search-messages") {
        Nn();
        return;
      }
      if (u === "close-search") {
        qe();
        return;
      }
      if (u === "search-jump") {
        Pn(String(o.dataset.key || ""));
        return;
      }
      if (u === "viewer-prev") {
        Ce(-1);
        return;
      }
      if (u === "viewer-next") {
        Ce(1);
        return;
      }
      if (u === "copy-message") {
        const $ = o.closest(".chat-turn"), S = $ ? $.querySelector(".chat-bubble") : null, z = S ? decodeURIComponent(S.dataset.copy || "") : "";
        z && $a(z).then((F) => P(F ? "已复制这条消息" : "复制失败", F ? "" : "error"));
        return;
      }
      if (u === "copy-code") {
        const $ = decodeURIComponent(o.dataset.code || "");
        $ && $a($).then((S) => {
          if (!S) {
            P("复制失败", "error");
            return;
          }
          o.textContent = "已复制", window.setTimeout(() => {
            o.textContent = "复制";
          }, 1200);
        });
        return;
      }
      if (u === "resend-message") {
        const $ = o.closest(".chat-turn"), S = $ ? $.querySelector(".chat-bubble") : null, z = S ? decodeURIComponent(S.dataset.copy || "") : "";
        z && n.input && (t.draft = z, n.input.value = z, He(), n.input.focus(), P("已放进输入框，可改完再发"));
        return;
      }
      if (u === "toggle-acc") {
        Ta(o.dataset.acc || "");
        return;
      }
      if (u === "pick-preset") {
        Gn("preset", o.dataset.scope || "settings", o.dataset.value || "");
        return;
      }
      if (u === "pick-permission") {
        t.formPermission = o.dataset.value || "", Ct();
        return;
      }
      if (u === "pick-mode") {
        t.mode = o.dataset.value || "auto", ma();
        return;
      }
      if (u === "pick-notify-mode") {
        t.notifyMode = o.dataset.value === "message" ? "message" : "turn", Kt(), Rt(), ba();
        return;
      }
      if (u === "pick-model" || u === "pick-effort") {
        Fn(u === "pick-model" ? "model" : "effort", o.dataset.value || "", o.dataset.provider || "", o.dataset.scope || "model");
        return;
      }
      if (u === "pick-permission-current") {
        t.sessionPermission = String(o.dataset.value || ""), Zt();
        return;
      }
      if (u === "session-menu") {
        Ln(o.dataset.session || "", o.dataset.title || "");
        return;
      }
      if (u === "toggle-session-search") {
        if (!n.sessionSearch) return;
        const $ = n.sessionSearch.hidden;
        n.sessionSearch.hidden = !$, $ ? n.sessionSearch.focus() : (n.sessionSearch.value = "", t.sessionQuery = "", Qt());
        return;
      }
      if (u === "session-rename") {
        zn();
        return;
      }
      if (u === "session-fork") {
        Bn();
        return;
      }
      if (u === "confirm-rename") {
        Cn();
        return;
      }
      if (u === "close-session-menu") {
        zt();
        return;
      }
      if (u === "close-rename") {
        Me();
        return;
      }
      if (u === "archive-session") {
        Rn(t.sessionMenuId, t.sessionMenuTitle);
        return;
      }
      if (u === "confirm-archive") {
        jn();
        return;
      }
      if (u === "close-archive") {
        Jt();
        return;
      }
      if (u === "toggle-archived") {
        t.showArchived = !t.showArchived, Qt();
        return;
      }
      if (u === "restore-session") {
        Dn(String(o.dataset.session || ""));
        return;
      }
      Mo(u, o);
      return;
    }
    const r = a.closest(".chat-link");
    if (r) {
      e.preventDefault(), ao(r.dataset.href || r.getAttribute("href") || "");
      return;
    }
    const l = a.closest(".chat-file");
    if (l) {
      if (e.preventDefault(), Date.now() - Je < 500) return;
      no(l.dataset.fileUrl || "", l.dataset.fileName || "");
      return;
    }
    const d = a.closest(".chat-image");
    if (d) {
      if (Date.now() - Je < 500) return;
      oo(Aa(d), d);
      return;
    }
    const y = a.closest(".chat-image-fallback");
    if (y) {
      Eo(y);
      return;
    }
    const q = a.closest("[data-retry]");
    if (q) {
      e.preventDefault();
      const u = decodeURIComponent(q.dataset.retry || ""), $ = q.parentElement ? q.parentElement.querySelector(".chat-bubble.is-error") : null;
      $ && $.parentElement ? $.parentElement.remove() : q.remove(), Ae(u, !0);
      return;
    }
    const C = a.closest("[data-session]");
    if (C) {
      e.preventDefault(), ua(C.dataset.session || "");
      return;
    }
    if (a === n.scrim) {
      yt();
      return;
    }
    if (a === n.newScrim) {
      Pe();
      return;
    }
    if (a === n.modelScrim) {
      te();
      return;
    }
    if (a === n.confirmScrim) {
      ee();
      return;
    }
    if (a === n.archiveScrim) {
      Jt();
      return;
    }
    if (n.viewer && !n.viewer.hidden) {
      if (et) {
        et = !1;
        return;
      }
      if (ct) return;
      oe();
    }
  }
  function Ha(e) {
    const a = e.target;
    if (a instanceof HTMLInputElement && a.dataset.role === "q-custom") {
      const o = String(a.dataset.input || ""), r = String(a.dataset.q || "");
      o && r && (ja(o).custom[r] = a.value);
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "session-search") {
      t.sessionQuery = a.value, Qt();
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "new-title") {
      t.formTitle = a.value;
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "message-search") {
      t.searchQuery = a.value, da();
      return;
    }
    a instanceof HTMLTextAreaElement && (t.draft = a.value, He());
  }
  function Ua(e) {
    e.target instanceof HTMLTextAreaElement && (e.isComposing || e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Ae(t.draft)));
  }
  function _a(e) {
    const a = e.target;
    a instanceof HTMLElement && (a === n.input ? (De(), It = null) : n.page && n.page.contains(a) && (It = a));
  }
  function Oa() {
    It = null;
  }
  function At() {
    gt && gt.timer && window.clearTimeout(gt.timer), gt = null;
  }
  function Fa(e) {
  }
  function Wa(e) {
    gt && (Math.abs(e.clientX - gt.x) > 8 || Math.abs(e.clientY - gt.y) > 8) && At();
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
    rt(), we(), lt();
  }
  function No() {
    t.view === "chat" && (J === "legacy" && Lt(), ye(!0), dt().then((e) => {
      !e || U || (J === "legacy" ? Pt() : xt(), bn());
    }));
  }
  So(), un(), ta(), pn(), c.watch && typeof c.watch.ensurePermission == "function" && c.watch.ensurePermission().catch(() => {
  }), Rt(), s = To(), i.appendChild(s), $o(), s.addEventListener("click", Da), s.addEventListener("input", Ha), s.addEventListener("change", la), s.addEventListener("keydown", Ua), s.addEventListener("focusin", _a), s.addEventListener("focusout", Oa), s.addEventListener("pointerdown", Fa), s.addEventListener("pointermove", Wa), s.addEventListener("pointerup", At), s.addEventListener("pointercancel", At), s.addEventListener("error", Ka, !0), c.ui && typeof c.ui.onInsetsChange == "function" ? fe = c.ui.onInsetsChange(Ra) : Ra(ko()), typeof c.on == "function" && (ge = c.on("pause", Io), me = c.on("resume", No)), R(!0), st(), za(), Ca(), St();
  const _e = t.currentSession;
  _e ? E.clearOthers(_e).catch(() => {
  }).then(() => E.get(_e)).then((e) => {
    U || g.size > 0 || e.length && (g.replaceEvents(e), t.booting = !1, t.hydrated = !1, R(!0));
  }).catch(() => {
  }) : (t.booting = !1, R(!0)), window.setTimeout(() => {
    U || !t.booting || (t.booting = !1, R(!0));
  }, 2500), t.uiChip && n.modelChip && (n.modelChip.textContent = t.uiChip, n.modelChip.hidden = !1);
  function Oe(e) {
    const a = s ? s.querySelector('[data-role="tool-sheet"]') : null;
    if (a && !a.hidden) {
      ie(), e.detail.handled = !0;
      return;
    }
    if (n.confirmScrim && !n.confirmScrim.hidden) {
      ee(), e.detail.handled = !0;
      return;
    }
    if (n.modelScrim && !n.modelScrim.hidden) {
      te(), e.detail.handled = !0;
      return;
    }
    if (n.newScrim && !n.newScrim.hidden) {
      Pe(), e.detail.handled = !0;
      return;
    }
    if (n.helpScrim && !n.helpScrim.hidden) {
      n.helpScrim.hidden = !0, e.detail.handled = !0;
      return;
    }
    if (n.archiveScrim && !n.archiveScrim.hidden) {
      Jt(), e.detail.handled = !0;
      return;
    }
    if (n.searchScrim && !n.searchScrim.hidden) {
      qe(), e.detail.handled = !0;
      return;
    }
    if (n.renameScrim && !n.renameScrim.hidden) {
      Me(), e.detail.handled = !0;
      return;
    }
    if (n.sessionMenu && !n.sessionMenu.hidden) {
      zt(), e.detail.handled = !0;
      return;
    }
    if (n.scrim && !n.scrim.hidden) {
      t.drawerMode === "create" ? Xt("list") : yt(), e.detail.handled = !0;
      return;
    }
    if (n.viewer && !n.viewer.hidden) {
      oe(), e.detail.handled = !0;
      return;
    }
    n.page && !n.page.hidden && (xa(), e.detail.handled = !0);
  }
  function Ga(e) {
    if (!e || e.source !== window.parent) return;
    const a = e.data;
    if (!a || a.type !== "docklet:back") return;
    const o = { handled: !1 };
    if (Oe({ detail: o }), !!o.handled)
      try {
        window.parent.postMessage({ type: "docklet:back-handled" }, "*");
      } catch {
      }
  }
  window.addEventListener("message", Ga), window.addEventListener("docklet:back", Oe), Ba(), dt(!0).then((e) => {
    if (!e || U) {
      Lt();
      return;
    }
    ye(!0), xt();
  }), ya = window.setInterval(() => {
    !document.hidden && t.status !== "ok" && dt();
  }, 1e4), wa = window.setInterval(Tn, B), ka = window.setInterval(Sn, 8e3), va = window.setInterval(() => {
    !document.hidden && t.status === "ok" && dt();
  }, 6e4);
  const le = () => {
    U || dt(!0);
  };
  return window.addEventListener("online", le), window.addEventListener("offline", le), function() {
    U = !0, rt(), we(), lt(), window.removeEventListener("online", le), window.removeEventListener("offline", le), window.clearInterval(ya), window.clearInterval(va), window.clearInterval(wa), window.clearInterval(ka), La(), window.clearTimeout(ze), At();
    for (const a of Ht) window.clearTimeout(a);
    Ht = [], window.clearTimeout(V), typeof fe == "function" && fe(), typeof ge == "function" && ge(), typeof me == "function" && me(), s.removeEventListener("click", Da), s.removeEventListener("input", Ha), s.removeEventListener("change", la), s.removeEventListener("keydown", Ua), s.removeEventListener("focusin", _a), s.removeEventListener("focusout", Oa), s.removeEventListener("pointerdown", Fa), s.removeEventListener("pointermove", Wa), s.removeEventListener("pointerup", At), s.removeEventListener("pointercancel", At), s.removeEventListener("error", Ka, !0), window.removeEventListener("message", Ga), window.removeEventListener("docklet:back", Oe), s.remove(), D && D.remove(), D = null, s = null, n = {};
  };
}
export {
  br as default
};
