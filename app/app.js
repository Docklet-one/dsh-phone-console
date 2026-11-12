const tr = '.chat-app,.chat-app *{box-sizing:border-box}.chat-app{--chat-bg: #eef2f6;--chat-text: #2a3038;--chat-muted: #6d7681;--chat-faint: #a8afb8;--chat-primary: #5b7f96;--chat-primary-deep: #4a6b80;--chat-danger: #b05d51;--chat-danger-soft: rgba(176, 93, 81, .13);--chat-line: rgba(40, 50, 60, .08);--chat-glass: rgba(255, 255, 255, .86);--chat-shadow: 0 8px 24px -18px rgba(30, 50, 60, .55);--chat-top: 0px;--chat-bottom: 0px;--chat-ime: 0px;--drawer-w: min(84vw, 340px);--drawer-top: 0px;position:relative;display:flex;flex-direction:column;height:100%;overflow:hidden;font-family:-apple-system,PingFang SC,Noto Sans SC,Microsoft YaHei,system-ui,sans-serif;color:var(--chat-text);background-color:var(--chat-bg);background-image:radial-gradient(120% 55% at 0% 0%,rgba(191,214,228,.55),transparent 62%),radial-gradient(100% 45% at 100% 0%,rgba(228,220,240,.42),transparent 58%),linear-gradient(180deg,#f7f9fb,#e9eef3);-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}.chat-top{position:relative;z-index:45;display:flex;flex:none;gap:10px;align-items:center;padding:calc(var(--chat-top) + 8px) 12px 8px 14px;background:#ffffffe6;border-bottom:1px solid var(--chat-line);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}.chat-heading{display:flex;flex:1;flex-direction:column;gap:2px;min-width:0}.chat-heading h1{margin:0;overflow:hidden;font-size:17px;font-weight:800;line-height:1.25;text-overflow:ellipsis;white-space:nowrap}.chat-model{align-self:flex-start;max-width:100%;padding:2px 8px;overflow:hidden;font:inherit;font-size:11px;line-height:1.4;color:var(--chat-muted);text-overflow:ellipsis;white-space:nowrap;cursor:pointer;background:#28323c0d;border:0;border-radius:8px}.chat-model[hidden]{display:none}.chat-head-sub{display:flex;gap:8px;align-items:center;min-width:0}.chat-status{display:inline-block;flex:none;width:10px;height:10px;background:var(--chat-faint);border-radius:50%}.chat-status[data-status=ok]{background:#3fae6a;box-shadow:0 0 0 3px #3fae6a2e}.chat-status[data-status=bad]{background:var(--chat-danger);box-shadow:0 0 0 3px #c8505029}.chat-status[data-status=checking]{background:#d0a352;box-shadow:0 0 0 3px #d0a35229}.chat-actions{display:flex;flex:none;gap:6px}.chat-icon{display:grid;width:34px;height:34px;padding:0;font:inherit;font-size:16px;line-height:1;color:var(--chat-muted);cursor:pointer;background:#28323c0b;border:0;border-radius:10px;place-items:center}.chat-icon:active{background:#28323c1a}.chat-icon svg{display:block;width:18px;height:18px}.chat-main{position:relative;display:flex;flex:1;flex-direction:column;min-height:0;overflow:hidden;padding-bottom:var(--chat-ime);transition:padding-bottom .16s ease-out}.chat-list{display:flex;flex:1;flex-direction:column;gap:12px;min-height:0;padding:12px 12px 6px;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.chat-load-spinner{position:absolute;top:calc(var(--chat-header-h, 64px) + 6px);left:50%;z-index:20;display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:1px solid var(--chat-line, #dfe4e9);border-radius:50%;background:#fffffff0;box-shadow:0 2px 8px -4px #00000059;transform:translate(-50%);pointer-events:none}.chat-load-spinner[hidden]{display:none}.chat-load-spinner span{width:12px;height:12px;border:2px solid #d5dbe1;border-top-color:#6d7681;border-radius:50%;animation:chat-spin .7s linear infinite}@keyframes chat-spin{to{transform:rotate(360deg)}}.chat-stuck{padding:12px 14px;border-color:#e7d8c8;background:#fffaf4}.chat-local-notice{margin:10px 0;padding:12px 14px;border:1px solid #e7d8c8;border-radius:14px;background:#fffaf4}.chat-local-notice.is-offline{border-color:#efd3bf;background:#fff7f1}.chat-local-notice-head{display:flex;align-items:center;gap:7px;color:#8a5a2b;font-size:13px}.chat-local-notice-head b{font-weight:600}.chat-local-notice p{margin:5px 0 0;color:#8a745d;font-size:12px;line-height:1.55}.chat-stuck-title{margin:0;color:#8a5a2b;font-size:13px;font-weight:600}.chat-stuck-text{margin:4px 0 10px;color:#8a745d;font-size:12px;line-height:1.5}.chat-stuck-btn{width:100%;padding:8px 12px;border:0;border-radius:8px;background:#9a6a3a;color:#fff;font:inherit;font-size:13px;cursor:pointer}.chat-stuck-actions{display:flex;gap:8px}.chat-stuck-actions .chat-stuck-btn{flex:1;width:auto}.chat-stuck-btn.is-danger{background:#b05d51}.chat-skeleton{display:flex;flex-direction:column;gap:10px;padding:6px 0}.chat-skeleton-meta,.chat-skeleton-bubble,.chat-skeleton-footer{background:linear-gradient(90deg,#28323c0f,#28323c1f,#28323c0f);background-size:200% 100%;border-radius:10px;animation:chat-skeleton-shimmer 1.4s ease-in-out infinite}.chat-skeleton-meta{width:84px;height:12px}.chat-skeleton-meta.is-right{align-self:flex-end}.chat-skeleton-bubble{width:100%;height:74px}.chat-skeleton-bubble.is-short{width:72%}.chat-skeleton-bubble.is-me{width:58%;height:38px;align-self:flex-end}.chat-skeleton-footer{width:100%;height:40px;border-radius:0 0 14px 14px}@keyframes chat-skeleton-shimmer{0%{background-position:100% 0}to{background-position:-100% 0}}.chat-history-limit{padding:10px 12px;margin:0 0 8px;border-radius:10px;background:#28323c0a;color:#8b7f70;font-size:12px;line-height:1.5;text-align:center}.chat-block{display:flex;flex-direction:column;min-width:0}.chat-turn{display:flex;flex-direction:column;gap:4px;width:100%}.chat-turn.is-me{align-items:flex-end}.chat-turn.is-ai{align-items:flex-start}.chat-meta{display:flex;gap:8px;align-items:center;font-size:10px;line-height:1.2;color:var(--chat-faint)}.chat-turn.is-me .chat-meta{flex-direction:row-reverse}.chat-avatar{display:grid;flex:none;width:36px;height:36px;font-size:19px;background:#ffffffeb;border-radius:11px;box-shadow:var(--chat-shadow);place-items:center}.chat-avatar.has-image{overflow:hidden;background:#fff}.chat-avatar img{display:block;width:100%;height:100%;object-fit:cover}.chat-avatar-edit{display:flex;gap:10px}.chat-avatar-pick{display:flex;flex:1;align-items:center;gap:10px;min-width:0;padding:10px;text-align:left;color:var(--chat-text);background:var(--chat-card);border:1px solid var(--chat-line);border-radius:12px}.chat-avatar-preview{display:grid;flex:none;width:38px;height:38px;overflow:hidden;color:var(--chat-muted);font-size:20px;background:#fff;border-radius:10px;place-items:center}.chat-avatar-preview img{display:block;width:100%;height:100%;object-fit:cover}.chat-avatar-copy{display:flex;flex-direction:column;gap:2px;min-width:0}.chat-avatar-copy b{font-size:13px;font-weight:500}.chat-avatar-copy em{color:var(--chat-faint);font-size:11px;font-style:normal}.chat-stamp{white-space:nowrap}.chat-bubble{position:relative;width:100%;max-width:100%;padding:9px 12px;font-size:15px;line-height:1.6;word-break:break-word;white-space:pre-wrap;border-radius:14px;user-select:text;-webkit-user-select:text;-webkit-touch-callout:default}.chat-bubble.is-me{width:fit-content;max-width:86%;color:#fff;background:var(--chat-primary);border-radius:14px;box-shadow:0 8px 18px -14px #2d5064e6}.chat-bubble.is-ai{width:100%;max-width:100%;color:var(--chat-text);background:var(--chat-glass);border-radius:14px;box-shadow:var(--chat-shadow);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.chat-bubble.is-me.has-images{width:86%}.chat-bubble.is-ai.has-images{width:100%}.chat-bubble.is-typing,.chat-bubble.is-streaming{width:100%;max-width:100%}.chat-bubble.is-typing{display:flex;flex-direction:column;justify-content:center;min-height:74px}.chat-bubble.is-typing:not(.is-streaming){box-sizing:border-box;width:100%;height:74px;min-height:74px;overflow:hidden}.chat-bubble.is-typing.is-thinking{box-sizing:border-box;height:74px;min-height:74px;overflow:hidden;align-items:stretch;justify-content:flex-start}.chat-bubble.is-thinking .chat-typing-head{width:100%;justify-content:flex-start}.chat-typing-head{display:flex;align-items:center;width:100%;min-width:0;height:20px;flex:none}.chat-typing-text{display:inline-block;overflow:hidden;font-size:13px;font-weight:600;line-height:20px;color:var(--chat-muted);text-overflow:ellipsis;white-space:nowrap}.chat-typing-detail{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;width:100%;height:34px;margin-top:2px;overflow:hidden;font-size:12px;line-height:17px;opacity:.72;word-break:break-all;flex:none}.chat-math-board{display:flex;flex:none;flex-direction:column;justify-content:space-between;width:100%;height:34px;margin-top:2px;overflow:hidden}.chat-math-row{position:relative;width:100%;height:17px}.chat-math-item{position:absolute;top:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;line-height:17px;letter-spacing:.03em;color:var(--chat-muted);opacity:.82;white-space:nowrap;font-variant-numeric:tabular-nums}.chat-typing-dot{display:inline-block;width:9px;height:9px;margin-left:8px;vertical-align:middle;flex:none;background:var(--chat-primary);border-radius:50%;box-shadow:0 0 #5b7f9659;animation:chat-breathe 1.8s ease-in-out infinite}.chat-bubble.is-stale .chat-typing-dot{background:var(--chat-faint);box-shadow:none;animation:none}@keyframes chat-breathe{0%,to{opacity:.5;transform:scale(.78);box-shadow:0 0 #5b7f9659}50%{opacity:1;transform:scale(1.18);box-shadow:0 0 0 7px #5b7f9600}}.chat-bubble.is-error{color:var(--chat-danger);background:var(--chat-danger-soft);border-radius:14px}.chat-retry{padding:5px 12px;font:inherit;font-size:12px;font-weight:700;color:var(--chat-danger);cursor:pointer;background:transparent;border:1px solid rgba(176,93,81,.36);border-radius:999px}.chat-sys{align-self:center;max-width:90%;padding:6px 10px;font-size:12.5px;line-height:1.5;color:var(--chat-muted);text-align:center;background:#ffffff8c;border-radius:10px}.chat-link{color:inherit;text-decoration:underline;text-underline-offset:2px;word-break:break-all}.chat-image{display:block;width:160px;height:120px;margin-bottom:6px;object-fit:cover;background:#28323c0f;border-radius:10px}.chat-image-fallback{display:flex;width:160px;height:120px;margin-bottom:6px;padding:0 10px;font:inherit;font-size:12px;line-height:1.4;color:var(--chat-muted);text-align:center;cursor:pointer;background:#28323c0d;border:1px dashed rgba(40,50,60,.16);border-radius:10px;align-items:center;justify-content:center}.chat-file{display:flex;gap:9px;align-items:center;width:100%;max-width:230px;padding:9px 10px;margin-bottom:6px;color:inherit;text-decoration:none;background:#28323c0f;border-radius:10px}.chat-bubble.is-me .chat-file{background:#ffffff2e}.chat-file-icon{display:grid;flex:none;width:30px;height:30px;font-size:15px;background:#ffffffc7;border-radius:8px;place-items:center}.chat-file-main{display:flex;flex:1;flex-direction:column;gap:1px;min-width:0}.chat-file-name{overflow:hidden;font-size:13px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}.chat-file-size{font-size:11px;color:var(--chat-muted)}.chat-bubble.is-me .chat-file-size{color:#ffffffbf}.chat-composer{display:flex;flex:none;flex-direction:column;gap:8px;align-items:stretch;padding:8px 12px calc(var(--chat-bottom) + 6px);background:#ffffffd6;border-top:1px solid var(--chat-line);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transition:padding-bottom .16s ease-out}.chat-input-row{display:flex;gap:8px;align-items:flex-end}.chat-plus{display:grid;flex:none;width:42px;height:42px;padding:0;font:inherit;font-size:24px;font-weight:500;line-height:1;color:var(--chat-muted);cursor:pointer;background:#28323c0f;border:0;border-radius:50%;place-items:center}.chat-plus:active{background:#28323c1f}.chat-attach{display:flex;gap:8px;padding:2px 2px 0;overflow-x:auto}.chat-attach[hidden]{display:none}.chat-chip{position:relative;display:grid;flex:none;width:60px;height:60px;overflow:hidden;background:#28323c0f;border-radius:12px;place-items:center}.chat-chip-thumb{width:100%;height:100%;object-fit:cover}.chat-chip-icon{font-size:24px}.chat-chip-x{position:absolute;top:3px;right:3px;width:20px;height:20px;padding:0;font:inherit;font-size:13px;line-height:20px;color:#fff;cursor:pointer;background:#0000008c;border:0;border-radius:50%}.chat-chip-state{position:absolute;right:0;bottom:0;left:0;padding:2px 0;font-size:10px;color:#fff;text-align:center;background:#0000008c}.chat-chip-state.is-bad{background:var(--chat-danger)}.chat-input{flex:1;min-height:42px;max-height:120px;padding:10px 14px;overflow-y:auto;font:inherit;font-size:15px;line-height:1.5;color:var(--chat-text);resize:none;background:#28323c0d;border:0;border-radius:18px;outline:0;user-select:text;-webkit-user-select:text}.chat-input::placeholder{color:var(--chat-faint)}.chat-send{display:grid;flex:none;width:44px;height:44px;padding:0;font:inherit;font-size:17px;font-weight:700;line-height:1;color:#fff;cursor:pointer;background:var(--chat-primary);border:0;border-radius:50%;place-items:center}.chat-send:active{background:var(--chat-primary-deep)}.chat-send.is-stop{background:var(--chat-danger)}.chat-chipgroup{display:flex;flex-wrap:wrap;gap:6px}.chat-opt{padding:6px 10px;font:inherit;font-size:12.5px;color:var(--chat-text);cursor:pointer;background:#28323c0f;border:0;border-radius:10px}.chat-opt[data-on="1"]{color:#fff;background:var(--chat-primary)}.chat-opt:active{opacity:.82}.chat-opt-desc{margin:0;font-size:12px;line-height:1.5;color:var(--chat-muted)}.chat-form{display:flex;flex-direction:column;gap:14px}.chat-form-block{display:flex;flex-direction:column;gap:7px}.chat-form .chat-sheet-sub,.chat-form .chat-opt-desc{margin:0}.chat-scrim.is-center{align-items:center;padding:0 24px calc(var(--chat-bottom) + var(--chat-ime))}.chat-dialog{width:100%;max-width:320px;padding:20px 16px 14px;background:#fff;border-radius:20px;box-shadow:0 18px 48px -20px #141e288c}.chat-dialog-title{margin:0;font-size:16px;font-weight:800;text-align:center}.chat-dialog-text{margin:8px 0 18px;font-size:13px;line-height:1.6;color:var(--chat-muted);text-align:center}.chat-dialog-actions{display:flex;gap:8px}.chat-dialog-actions .chat-btn{flex:1;height:44px}.chat-btn.is-danger{color:#fff;background:var(--chat-danger)}.chat-acc{overflow:hidden;background:var(--chat-glass);border-radius:16px;box-shadow:var(--chat-shadow)}.chat-acc-head{display:flex;gap:10px;align-items:center;width:100%;padding:15px 16px;font:inherit;color:var(--chat-text);text-align:left;cursor:pointer;background:none;border:0}.chat-acc-title{flex:none;font-size:14px;font-weight:700}.chat-acc-sum{flex:1;overflow:hidden;font-size:12px;color:var(--chat-muted);text-align:right;text-overflow:ellipsis;white-space:nowrap}.chat-acc-chevron{flex:none;font-size:16px;color:var(--chat-faint);transition:transform .15s ease}.chat-acc[data-open="1"] .chat-acc-chevron{transform:rotate(90deg)}.chat-acc-body{display:flex;flex-direction:column;gap:12px;padding:0 16px 16px}.chat-acc-body[hidden]{display:none}.chat-toggle{display:flex;gap:12px;align-items:center;justify-content:space-between;font-size:14px;color:var(--chat-text)}.chat-toggle input{position:relative;flex:none;width:46px;height:26px;cursor:pointer;background:#28323c29;border:0;border-radius:13px;outline:0;transition:background .15s ease;appearance:none;-webkit-appearance:none}.chat-toggle input:after{position:absolute;top:3px;left:3px;width:20px;height:20px;content:"";background:#fff;border-radius:50%;box-shadow:0 1px 3px #00000040;transition:transform .15s ease}.chat-toggle input:checked{background:var(--chat-primary)}.chat-toggle input:checked:after{transform:translate(20px)}.chat-page{position:absolute;top:var(--chat-header-h, 64px);right:0;bottom:0;left:0;z-index:15;display:flex;flex-direction:column;gap:14px;padding:10px 14px calc(var(--chat-bottom) + var(--chat-ime) + 18px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;background-color:var(--chat-bg);background-image:radial-gradient(120% 55% at 0% 0%,rgba(191,214,228,.55),transparent 62%),linear-gradient(180deg,#f7f9fb,#e9eef3)}.chat-page[hidden]{display:none}.chat-page>*{flex:none}.chat-back{display:inline-flex;gap:4px;align-items:center;align-self:flex-start;padding:4px 0;font:inherit;font-size:13px;font-weight:600;color:var(--chat-primary-deep);cursor:pointer;background:none;border:0}.chat-back-arrow{font-size:22px;font-weight:400;line-height:1}.chat-page h1{margin:0;font-size:24px;font-weight:800}.chat-sub{margin:-8px 0 0;font-size:13px;line-height:1.55;color:var(--chat-muted)}.chat-card{display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--chat-glass);border-radius:16px;box-shadow:var(--chat-shadow)}.chat-field{display:flex;flex-direction:column;gap:6px}.chat-field>span{font-size:13px;font-weight:600;color:var(--chat-muted)}.chat-field input{height:46px;padding:0 14px;font:inherit;font-size:15px;color:var(--chat-text);background:#28323c0d;border:0;border-radius:12px;outline:0;user-select:text;-webkit-user-select:text}.chat-acc[data-acc=server] .chat-acc-body{gap:10px;padding:0 14px 14px}.chat-acc[data-acc=server] .chat-field>span{font-size:12px}.chat-acc[data-acc=server] .chat-field input{height:40px;padding:0 12px;font-size:13.5px;border-radius:10px}.chat-acc[data-acc=server] .chat-field-state{font-size:11px}.chat-acc[data-acc=server] .chat-field-note{font-size:10px}.chat-acc[data-acc=server] .chat-sheet-sub{font-size:12px;font-weight:600;color:var(--chat-muted)}.chat-acc[data-acc=server] .chat-opt{padding:7px 11px;font-size:12.5px}.chat-acc[data-acc=server] .chat-chipgroup,.chat-acc[data-acc=relay] .chat-chipgroup{gap:10px}.chat-hint{margin:0;font-size:12px;line-height:1.5;color:var(--chat-faint)}.chat-btn{height:46px;padding:0 16px;font:inherit;font-size:14px;font-weight:700;color:var(--chat-text);cursor:pointer;background:#28323c12;border:0;border-radius:12px}.chat-btn.is-primary{color:#fff;background:var(--chat-primary)}.chat-btn.is-block{width:100%}.chat-test{margin:0;font-size:12.5px;line-height:1.5;color:var(--chat-muted)}.chat-test[data-tone=ok]{color:#4f9d7a}.chat-test[data-tone=bad]{color:var(--chat-danger)}.chat-selectable{word-break:break-all;user-select:text;-webkit-user-select:text}.chat-version{margin:4px 0 0;font-size:11px;color:var(--chat-faint);text-align:center}.chat-field-state{margin-left:6px;font-size:13px;font-style:normal;font-weight:700;color:var(--chat-faint)}.chat-net{display:flex;gap:8px;align-items:center;margin:0 0 6px;padding:6px 10px;font-size:12px;line-height:1.4;color:#7a5a12;background:#d98b1c24;border-radius:10px}.chat-net[hidden]{display:none}.chat-net[data-tone=bad]{color:#9a3a30;background:#c640371f}.chat-net-dot{flex:none;width:8px;height:8px;background:currentColor;border-radius:50%;animation:chat-net-pulse 1s ease-in-out infinite}.chat-net-text{flex:1 1 auto;min-width:0}.chat-net-note{flex:none;font-size:12px;opacity:.75}@keyframes chat-net-pulse{0%,to{opacity:1}50%{opacity:.3}}.chat-field-note{margin-left:6px;font-size:10.5px;font-style:normal;font-weight:400;color:var(--chat-faint)}.chat-field-state[data-tone=busy]{color:#d9821a;animation:chat-state-pulse 1.05s ease-in-out infinite}.chat-field-state[data-tone=ok]{color:#1f8a4c}.chat-field-state[data-tone=bad]{color:#c33d31}@keyframes chat-state-pulse{0%,to{opacity:1}50%{opacity:.3}}.chat-opt.is-test{border-style:dashed}.chat-opt.is-test[data-busy="1"]{color:var(--chat-primary-deep);background:#5b7f962e;border-color:var(--chat-primary);border-style:solid}.chat-btn.is-sticky{position:sticky;bottom:calc(6px + env(safe-area-inset-bottom,0px));z-index:4;margin-top:16px;box-shadow:0 -10px 14px -6px #e9e6e0f2}.chat-scrim[data-role=help] .chat-sheet{max-height:86vh;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));overflow:hidden}.chat-help{flex:1 1 auto;min-height:0;padding-right:2px;overflow-y:auto}.chat-help .chat-sheet-sub{margin:12px 0 4px}.chat-help .chat-sheet-sub:first-child{margin-top:0}.chat-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:40;display:flex;align-items:flex-end;justify-content:center;padding:0 10px calc(var(--chat-bottom) + var(--chat-ime) + 10px);background:#161c185c;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}.chat-scrim[hidden]{display:none}.chat-drawer-scrim{top:var(--drawer-top);align-items:stretch;justify-content:flex-start;padding:0;background:transparent}.chat-drawer{display:flex;flex-direction:column;width:var(--drawer-w);height:100%;overflow:hidden;background:#fff;box-shadow:18px 0 40px -30px #14283c99;transform:translate(-102%);transition:transform .24s cubic-bezier(.22,.8,.3,1)}.chat-app.is-drawer-open .chat-drawer{transform:none}.chat-app.is-drawer-open .chat-list,.chat-app.is-drawer-open .chat-composer,.chat-app.is-drawer-open .chat-jump{transform:translate(var(--drawer-w))}.chat-app.is-drawer-open [data-action=close-app]{visibility:hidden;pointer-events:none}.chat-list,.chat-composer,.chat-jump{transition:transform .24s cubic-bezier(.22,.8,.3,1)}.chat-drawer-pane{display:flex;flex:1;flex-direction:column;min-height:0}.chat-drawer-pane[hidden]{display:none}.chat-drawer-head{display:flex;flex:none;gap:8px;align-items:center;padding:16px 14px 8px}.chat-drawer-head .chat-sheet-title{flex:1;margin:0}.chat-drawer-pane>.chat-new{margin:0 14px 10px}.chat-drawer-tools{display:flex;flex:none;gap:8px;padding:14px 14px 10px}.chat-drawer-tool{display:inline-flex;flex:1;gap:4px;align-items:center;justify-content:center;min-width:0;padding:8px 4px;border:0;border-radius:10px;background:#5b7f9614;color:var(--chat-primary-deep);font:inherit;font-size:12.5px;white-space:nowrap}.chat-drawer-tool-icon{font-size:16px;line-height:1}.chat-drawer-tool-icon.is-search{font-size:20px}.chat-drawer .chat-drawer-search{flex:none;width:calc(100% - 40px);margin:0 20px 12px}.chat-drawer-pane [data-role=sheet-body]{flex:1;min-height:0;padding:0 14px;overflow-y:auto}.chat-drawer-pane .chat-sheet-list{max-height:none}.chat-drawer-foot,.chat-drawer-actions{flex:none;padding:10px 14px calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--chat-line)}.chat-drawer-pane .chat-form{flex:1;min-height:0;padding:0 14px;overflow-y:auto}@keyframes chat-drawer-in{0%{transform:translate(-100%)}to{transform:none}}.chat-sheet{display:flex;flex-direction:column;gap:8px;width:100%;max-width:420px;max-height:68vh;padding:14px;overflow-y:auto;background:#fff;border-radius:20px;box-shadow:0 -16px 48px -24px #141e2899}.chat-sheet-title{margin:0 0 2px;font-size:15px;font-weight:800;text-align:center}.chat-scrim[data-role=new-scrim] .chat-sheet{max-height:86vh;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));overflow:hidden}.chat-scrim[data-role=new-scrim] .chat-form{flex:1 1 auto;min-height:0;padding-right:2px;overflow-y:auto}.chat-new{display:flex;flex:none;align-items:center;justify-content:center;width:100%;height:44px;padding:0 14px;font:inherit;font-size:14px;font-weight:700;color:var(--chat-primary-deep);cursor:pointer;background:#5b7f9624;border:0;border-radius:12px}.chat-new:active{background:#5b7f963d}.chat-session{display:flex;gap:10px;align-items:center;width:100%;padding:11px 12px;font:inherit;font-size:14px;color:var(--chat-text);text-align:left;cursor:pointer;background:transparent;border:0;border-radius:12px}.chat-session[data-current="1"]{background:transparent}.chat-session[data-current="1"] .chat-session-label{font-weight:700;color:#3d5c6f}.chat-session-row{display:flex;align-items:stretch;gap:6px}.chat-session-row .chat-session{flex:1;min-width:0}.chat-session-more{flex:none;width:32px;border:0;border-radius:10px;background:transparent;color:var(--chat-muted);font:inherit;font-size:16px}.chat-archived-toggle{width:100%;margin:10px 0 4px;padding:8px;border:1px dashed var(--chat-line);border-radius:10px;background:transparent;color:var(--chat-muted);font:inherit;font-size:12px}.chat-session-row.is-archived .chat-session{opacity:.72}.chat-session-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.chat-session-time{flex:none;font-size:11px;color:var(--chat-faint)}.chat-sheet-tip{padding:10px 4px;font-size:13px;color:var(--chat-muted);text-align:center}.chat-viewer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:50;display:flex;padding:16px;background:#000000e6;align-items:center;justify-content:center}.chat-viewer[hidden]{display:none}.chat-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px}.chat-to-top{position:absolute;right:6px;bottom:6px;z-index:2;width:30px;height:30px;padding:0;font:inherit;font-size:14px;line-height:1;color:var(--chat-muted);cursor:pointer;background:#ffffffdb;border:0;border-radius:50%;box-shadow:0 4px 12px -6px #141e2859}.chat-toast{position:absolute;bottom:calc(var(--chat-ime) + 84px);left:50%;z-index:30;max-width:82%;padding:8px 14px;overflow:hidden;font-size:13px;color:#fff;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;background:#1e2830e0;border-radius:999px;opacity:0;transform:translate(-50%) translateY(6px);transition:opacity .18s ease,transform .18s ease}.chat-toast.is-on{opacity:1;transform:translate(-50%) translateY(0)}.chat-tool{flex:0 0 auto;align-self:stretch;margin:0;border:1px solid var(--chat-line);border-radius:10px;background:#ffffffa8;overflow:hidden}.chat-tool-head{display:flex;align-items:center;gap:6px;width:100%;padding:6px 9px;border:0;background:none;color:var(--chat-text);font:inherit;text-align:left}.chat-tool-group{flex:0 0 auto;align-self:stretch;border:1px solid var(--chat-line);border-radius:10px;background:#ffffffa8;overflow:hidden}.chat-tool-footer-block{margin-top:-12px}.chat-tool-footer-block .chat-tool-group,.chat-tool-footer-block .chat-tool-group.is-empty{margin-top:0;border:0;border-radius:0 0 14px 14px;background:var(--chat-glass);box-shadow:none;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.chat-block:has(+.chat-tool-footer-block) .chat-bubble.is-ai{border-bottom-left-radius:0;border-bottom-right-radius:0}.chat-tool-footer-block .chat-tool-group-head,.chat-tool-footer-block .chat-tool-group.is-empty .chat-tool-group-head{padding:6px 12px 8px;border-top:1px solid var(--chat-line)}.chat-tool-footer-block .chat-tool-group-title{font-weight:500}.chat-tool-footer-block .chat-tool-group-badge{padding:0;background:none;color:var(--chat-muted);font-size:12px;font-weight:500}.chat-tool-footer-block .chat-tool-group-badge.is-failed{color:var(--chat-danger)}.chat-tool-footer-block .chat-tool-group.is-empty .chat-tool-group-head{color:var(--chat-faint);cursor:default}.chat-tool-group-head.is-static{cursor:default}.chat-tool-group-head{display:flex;align-items:center;gap:7px;width:100%;padding:7px 9px;border:0;background:none;color:var(--chat-text);font:inherit;font-size:12px;text-align:left}.chat-tool-group-icon{flex:none;position:relative;top:-1px;font-size:12px;line-height:1;font-weight:400;color:var(--chat-muted);font-family:Segoe UI Symbol,Apple Symbols,sans-serif}.chat-tool-group-title{flex:1;min-width:0;color:var(--chat-muted);font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chat-tool-group-badge{flex:none;padding:1px 6px;font-size:10.5px;color:var(--chat-muted);background:#28323c0f;border-radius:999px}.chat-tool-group-badge.is-failed{color:var(--chat-danger);background:var(--chat-danger-soft)}.chat-tool-group.is-open .chat-tool-chevron{transform:rotate(90deg)}.chat-tool-group-body{display:flex;flex-direction:column;gap:6px;padding:0 8px 8px}.chat-tool-group.is-open .chat-tool-group-body{max-height:300px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--chat-faint) transparent}.chat-tool-group-body::-webkit-scrollbar{width:4px}.chat-tool-group-body::-webkit-scrollbar-track{background:transparent}.chat-tool-group-body::-webkit-scrollbar-thumb{background:var(--chat-faint);border-radius:999px}.chat-tool-group-body[hidden]{display:none}.chat-tool-group-collapse{display:flex;width:100%;padding:8px;align-items:center;justify-content:center;border:0;border-top:1px solid var(--chat-line);background:#28323c08;color:var(--chat-muted);font:inherit;font-size:11.5px}.chat-tool-group-body .chat-tool{background:#ffffff80}.chat-tool-dot{width:7px;height:7px;flex:none;border-radius:50%;background:var(--chat-faint)}.chat-tool-index{flex:none;min-width:14px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;line-height:1;text-align:center;color:var(--chat-muted)}.chat-tool-index.is-ok{color:#4f9d7a}.chat-tool-index.is-failed{color:var(--chat-danger)}.chat-tool-index.is-running{color:var(--chat-primary)}.chat-tool.is-running .chat-tool-dot{background:var(--chat-primary);animation:chat-card-pulse 1.1s ease-in-out infinite}.chat-tool.is-ok .chat-tool-dot{background:#5f9a72}.chat-tool.is-failed .chat-tool-dot{background:var(--chat-danger)}.chat-tool-name{flex:none;font-size:12px;font-weight:600}.chat-tool-sum{flex:1;min-width:0;font-size:11.5px;color:var(--chat-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chat-tool-chevron{flex:none;color:var(--chat-faint);transition:transform .15s ease}.chat-tool.is-open .chat-tool-chevron{transform:rotate(90deg)}.chat-tool-group-body .chat-tool.is-open{border-color:#5b7f968c;background:#5b7f9614}.chat-tool.is-active,.chat-tool-group-body .chat-tool.is-active{position:relative;border-color:var(--chat-primary);background:#5b7f9624}.chat-tool.is-active .chat-tool-name,.chat-tool-group-body .chat-tool.is-active .chat-tool-name{color:var(--chat-primary-deep);font-weight:700}.chat-tool-sheet{width:100%;max-width:520px;height:min(82vh,720px);max-height:82vh;gap:0;padding:0;overflow:hidden}.chat-tool-sheet-head{display:flex;flex:none;gap:8px;align-items:center;padding:12px 14px;border-bottom:1px solid var(--chat-line)}.chat-tool-sheet-head .chat-sheet-title{flex:1;margin:0;text-align:left}.chat-tool-sheet-body{flex:1;min-height:0;padding:12px 14px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--chat-faint) transparent}.chat-tool-sheet-body::-webkit-scrollbar{width:4px}.chat-tool-sheet-body::-webkit-scrollbar-thumb{background:var(--chat-faint);border-radius:999px}.chat-tool-sheet>.chat-btn{flex:none;margin:10px 14px calc(14px + env(safe-area-inset-bottom,0px))}.chat-tool-detail-head{display:flex;gap:7px;align-items:center;padding-bottom:10px;border-bottom:1px solid var(--chat-line)}.chat-tool-detail-head .chat-tool-name{font-size:13px}.chat-tool-detail .chat-tool-pre{max-height:none;overflow:visible;white-space:pre-wrap;word-break:break-word}.chat-tool-detail .chat-tool-preview{max-height:none;margin:0;padding:8px;overflow:visible;background:#28323c0a;border-radius:8px;white-space:pre-wrap;word-break:break-word}.chat-tool-code-head{display:flex;gap:8px;align-items:center;justify-content:space-between;margin:10px 0 6px;color:var(--chat-muted);font-size:11px}.chat-tool-copy{padding:2px 7px;border:1px solid var(--chat-line);border-radius:6px;background:transparent;color:var(--chat-muted);font:inherit;font-size:10.5px}.chat-tool-copy:active{color:var(--chat-text);background:#28323c0f}.chat-tool-body{padding:0 10px 10px;border-top:1px solid var(--chat-line)}.chat-tool-label{margin:8px 0 4px;font-size:10.5px;letter-spacing:.04em;color:var(--chat-muted)}.chat-tool-pre{margin:0;padding:8px;border-radius:8px;background:#28323c0b;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;max-height:180px;overflow:auto}.chat-tool-preview{margin:0;font-size:12px;line-height:1.55}.chat-tool-error{margin:6px 0 0;font-size:11.5px;color:var(--chat-danger)}.chat-card{align-self:stretch;margin:2px 0;padding:12px;border:1px solid var(--chat-line);border-radius:12px;background:var(--chat-glass);box-shadow:var(--chat-shadow)}.chat-approval.is-pending{border-color:#b05d5159}.chat-card-head{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600}.chat-card-icon{flex:none;font-size:13px}.chat-card-title{flex:1;min-width:0}.chat-card-badge{flex:none;padding:2px 7px;border-radius:999px;background:#28323c0f;font-size:10.5px;font-weight:600;color:var(--chat-muted)}.chat-deliverable-list{display:flex;flex-direction:column;gap:6px;margin-top:8px}.chat-deliverable .chat-file{max-width:none;margin:0}.chat-deliverable-media{display:flex;gap:10px;align-items:center}.chat-deliverable-media .chat-file{flex:1;min-width:0}.chat-deliverable-thumb{flex:none;width:76px;height:76px;margin:0;object-fit:cover;border-radius:8px}.chat-deliverable-download{flex:none;margin-left:auto;font-size:11px;color:var(--chat-primary-deep)}.chat-todo-list{display:flex;flex-direction:column;gap:6px;margin:8px 0 0;padding:0;list-style:none}.chat-todo-item{display:flex;gap:8px;align-items:flex-start;color:var(--chat-muted);font-size:12.5px;line-height:1.5}.chat-todo-mark{flex:none;width:14px;height:14px;margin-top:1px;border:1.5px solid var(--chat-line);border-radius:5px}.chat-todo-item.is-done{color:var(--chat-faint);text-decoration:line-through}.chat-todo-item.is-done .chat-todo-mark{border-color:#5f9a72;background:#5f9a72}.chat-todo-item.is-active{color:var(--chat-text)}.chat-todo-item.is-active .chat-todo-mark{border-color:var(--chat-primary);box-shadow:inset 0 0 0 3px #5b7f9638}.chat-plan-chip{align-self:flex-start;margin:4px 0;padding:4px 10px;border-radius:999px;background:#5b7f961f;color:var(--chat-primary-deep);font-size:11.5px}.chat-thinking{margin:0 0 6px;padding:6px 8px;border-radius:8px;background:#28323c0a;color:var(--chat-muted);font-size:11.5px}.chat-thinking summary{color:var(--chat-faint);font-size:11px;cursor:pointer}.chat-thinking-text{max-height:180px;margin-top:4px;overflow-y:auto;white-space:pre-wrap;word-break:break-word}.chat-card-badge.is-pending{background:var(--chat-danger-soft);color:var(--chat-danger)}.chat-card-badge.is-ok{background:#5f9a7229;color:#4d7f5d}.chat-card-badge.is-failed{background:var(--chat-danger-soft);color:var(--chat-danger)}.chat-card-time{flex:none;font-size:10.5px;color:var(--chat-faint)}.chat-card-sub{margin:6px 0 0;font-size:11.5px;color:var(--chat-muted)}.chat-card-text{margin:8px 0 0;font-size:12.5px;line-height:1.6}.chat-card-actions{display:flex;gap:8px;margin-top:12px}.chat-card-actions .chat-btn{flex:1}.chat-q+.chat-q{margin-top:12px;padding-top:12px;border-top:1px dashed var(--chat-line)}.chat-q-header{margin:0 0 4px;font-size:10.5px;letter-spacing:.04em;color:var(--chat-faint)}.chat-q-text{margin:0;font-size:13px;line-height:1.55}.chat-q-sub{margin:4px 0 0;font-size:11.5px;color:var(--chat-muted)}.chat-q-opts{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.chat-q-opt{display:flex;flex-direction:column;gap:2px;padding:7px 10px;border:1px solid var(--chat-line);border-radius:9px;background:#fff;color:var(--chat-text);font:inherit;font-size:12px;text-align:left}.chat-q-opt.is-on{border-color:var(--chat-primary);background:#5b7f961a}.chat-q-opt:disabled{opacity:.75}.chat-q-opt-desc{font-size:10.5px;color:var(--chat-muted)}.chat-q-custom{width:100%;margin-top:8px;padding:8px 10px;border:1px solid var(--chat-line);border-radius:9px;background:#fff;color:var(--chat-text);font:inherit;font-size:12px}.chat-q-custom-text{margin:8px 0 0;font-size:12px}.chat-jump{position:absolute;right:14px;bottom:calc(var(--chat-bottom) + var(--chat-ime) + 92px);z-index:3;width:34px;height:34px;border:1px solid var(--chat-line);border-radius:50%;background:var(--chat-glass);color:var(--chat-muted);box-shadow:var(--chat-shadow);font-size:15px}@keyframes chat-card-pulse{0%,to{opacity:1}50%{opacity:.35}}.chat-stream-text{white-space:pre-wrap;word-break:break-word}.chat-bubble.is-streaming .chat-typing-dot{display:inline-block;margin-left:5px;vertical-align:middle}.chat-sheet-search{width:100%;margin:4px 0 10px;padding:10px 12px;border:0;border-radius:10px;background:#28323c0d;color:var(--chat-text);font:inherit;font-size:13px;outline:none}.chat-sheet-search:focus,.chat-sheet-search:focus-visible{outline:none;box-shadow:none}.chat-sheet-list{max-height:46vh;overflow-y:auto;overscroll-behavior:contain}.chat-search-body{display:flex;flex-direction:column;gap:6px;max-height:44vh;overflow-y:auto;overscroll-behavior:contain}.chat-search-hit{display:flex;flex-direction:column;gap:3px;width:100%;padding:9px 10px;border:1px solid var(--chat-line);border-radius:10px;background:#fff;color:var(--chat-text);font:inherit;text-align:left}.chat-search-hit-head{font-size:10.5px;color:var(--chat-faint)}.chat-search-hit-text{font-size:12.5px;line-height:1.5;word-break:break-word}.chat-viewer{overflow:hidden;touch-action:none}.chat-viewer img{transition:transform .15s ease-out;will-change:transform}.chat-viewer-nav{position:absolute;top:50%;width:40px;height:40px;border:0;border-radius:50%;background:#ffffff24;color:#fff;font-size:24px;line-height:1;transform:translateY(-50%)}.chat-viewer-nav.is-prev{left:14px}.chat-viewer-nav.is-next{right:14px}.chat-viewer-count{position:absolute;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));padding:3px 10px;border-radius:999px;background:#00000059;color:#fff;font-size:11.5px;transform:translate(-50%)}.chat-bubble p{margin:0 0 8px}.chat-bubble p:last-child{margin-bottom:0}.chat-bubble h1,.chat-bubble h2,.chat-bubble h3,.chat-bubble h4{margin:4px 0 6px;font-size:14px;line-height:1.4}.chat-bubble ul,.chat-bubble ol{margin:0 0 8px;padding-left:20px}.chat-bubble li{margin:2px 0}.chat-bubble blockquote{margin:6px 0;padding:2px 10px;border-left:3px solid var(--chat-line);color:var(--chat-muted)}.chat-bubble hr{margin:10px 0;border:0;border-top:1px solid var(--chat-line)}.chat-inline-code{padding:1px 4px;border-radius:5px;background:#1e283012;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px}.chat-code{margin:6px 0;overflow:hidden;border:1px solid var(--chat-line);border-radius:10px;background:#fff}.chat-code-head{display:flex;align-items:center;justify-content:space-between;padding:3px 8px;background:#1e28300b;color:var(--chat-faint);font-size:10.5px}.chat-code-lang{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.chat-code-copy{padding:3px 6px;border:0;border-radius:6px;background:transparent;color:var(--chat-muted);font:inherit}.chat-code-copy:active{background:#1e28301a}.chat-code pre{margin:0;padding:10px;overflow-x:auto}.chat-code code{color:#24292f;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;line-height:1.55;white-space:pre}.tk-k{color:#8250df}.tk-s{color:#0a7d32}.tk-c{color:#8b949e}.tk-n{color:#0550ae}.chat-table-wrap{margin:6px 0;overflow-x:auto}.chat-bubble table{border-collapse:collapse;font-size:12px}.chat-bubble th,.chat-bubble td{padding:4px 8px;border:1px solid var(--chat-line);text-align:left}.chat-bubble th{background:#1e28300a}.chat-copy{margin-left:6px;padding:2px 4px;border:0;background:transparent;color:var(--chat-faint);font-size:10.5px}.chat-copy:active{color:var(--chat-text)}.chat-md-image{display:block;max-width:100%;max-height:420px;margin:6px 0;border-radius:10px;background:#00000008;object-fit:contain}.chat-md-gallery{display:grid;gap:6px;margin:6px 0}.chat-md-gallery .chat-md-image{width:100%;max-width:none;max-height:none;height:auto;margin:0;border-radius:10px;object-fit:cover}.chat-md-gallery.is-one{grid-template-columns:1fr}.chat-md-gallery.is-one .chat-md-image{width:auto;max-width:100%;max-height:360px;object-fit:contain}.chat-md-gallery.is-two{grid-template-columns:repeat(2,minmax(0,1fr))}.chat-md-gallery.is-two .chat-md-image{height:150px}.chat-md-gallery.is-few{grid-template-columns:repeat(2,minmax(0,1fr))}.chat-md-gallery.is-few .chat-md-image{height:120px}.chat-md-gallery.is-many{grid-template-columns:repeat(3,minmax(0,1fr))}.chat-md-gallery.is-many .chat-md-image{height:96px}', mt = "http://192.168.2.6:8788";
const ea = "prefs.v1", ln = "history.v1";
const Gt = {
  standard: { name: "标准模式", description: "处理代码、文件和数据，适合大多数任务。" },
  ptc: { name: "创造模式", description: "用对话产出界面或插件，工具会以卡片呈现。" },
  minimal: { name: "极简模式", description: "只带文件和终端，轻量、省 token。" },
  cordis: { name: "编排模式", description: "直接编辑 DSH 组合与插件，开发者用。" }
}, dn = "docklet-chat-style", un = {
  "read-only": "仅可查看",
  "workspace-write": "工作区内修改",
  "danger-full-access": "完全权限"
}, er = {
  "read-only": "只能查看和检索，不能修改文件；需要写入时会请求授权。",
  "workspace-write": "可以在工作区内修改文件；工作区之外的操作会请求授权。",
  "danger-full-access": "不再询问，直接执行命令和文件操作。"
};
function ar(s) {
  return new Promise((i) => setTimeout(i, s));
}
function C(s) {
  return String(s ?? "").replace(/[&<>"]/g, (i) => i === "&" ? "&amp;" : i === "<" ? "&lt;" : i === ">" ? "&gt;" : "&quot;");
}
function N(s) {
  return C(s).replace(/'/g, "&#39;");
}
function me(s) {
  return String(s ?? "").replace(/```[\s\S]*?```/g, (i) => i.replace(/```[a-z]*\n?/gi, "")).replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/__([^_]+)__/g, "$1").replace(/^#{1,6}\s+/gm, "").replace(/^\s*[-*]\s+/gm, "• ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
function nr(s) {
  return s.replace(/(https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+)/gu, (i) => {
    const t = i.replace(/[).,;:!?'"”’）】》]+$/gu, ""), T = i.slice(t.length);
    return `<a class="chat-link" href="${N(t)}" data-href="${N(t)}" target="_blank" rel="noreferrer noopener">${t}</a>${T}`;
  });
}
function pn(s) {
  const i = Number(s) || 0;
  return i >= 1024 * 1024 ? (i / 1024 / 1024).toFixed(1) + " MB" : i >= 1024 ? Math.round(i / 1024) + " KB" : i + " B";
}
function Pt(s) {
  const i = new Date(Number(s) || Date.now()), t = /* @__PURE__ */ new Date(), T = (v) => String(v).padStart(2, "0"), f = T(i.getHours()) + ":" + T(i.getMinutes());
  return i.toDateString() === t.toDateString() ? f : T(i.getMonth() + 1) + "-" + T(i.getDate()) + " " + f;
}
function St(s) {
  return String(s || "").replace(/：/g, ":").replace(/[\u3000\s]+/g, "").replace(/\/+$/, "");
}
function or(s) {
  return String(s || "").replace(/\/+$/, "");
}
function rr({ base: s, token: i }) {
  const t = () => or(s()) || mt, T = () => String(i() || "").trim();
  function f($) {
    const m = Object.assign({}, $ || {}), g = T();
    return g && (m.Authorization = "Bearer " + g), m;
  }
  function v() {
    return f({ "Content-Type": "application/json" });
  }
  function z($) {
    const m = String($ || "");
    return /^https?:\/\//.test(m) ? m : t() + m;
  }
  async function I($, m, g) {
    const h = new AbortController(), A = setTimeout(() => h.abort(), g || 8e3);
    try {
      return await fetch(z($), Object.assign({}, m, { signal: h.signal }));
    } finally {
      clearTimeout(A);
    }
  }
  async function j($, m, g) {
    const h = await I($, m, g);
    if (!h.ok) {
      const A = await h.json().catch(() => ({})), x = new Error(A && A.error || "HTTP " + h.status);
      throw x.status = h.status, x.code = A && A.code || "", x;
    }
    return h.json();
  }
  function S($, m, g) {
    return j($, { method: "POST", headers: v(), body: JSON.stringify(m || {}) }, g);
  }
  function U($, m, g) {
    const h = String(m ?? "").replace(/^file:/, ""), A = t() + "/" + $ + "/" + encodeURIComponent(h), x = [], y = T();
    return y && x.push("token=" + encodeURIComponent(y)), g && x.push("name=" + encodeURIComponent(g)), x.length ? A + "?" + x.join("&") : A;
  }
  function _($, m) {
    const g = [];
    Number.isFinite(Number($)) && Number($) > 0 && g.push("after=" + encodeURIComponent($)), m && g.push("session=" + encodeURIComponent(m));
    const h = T();
    return h && g.push("token=" + encodeURIComponent(h)), t() + "/events" + (g.length ? "?" + g.join("&") : "");
  }
  return {
    baseUrl: t,
    authHeaders: f,
    authJson: v,
    fetchWithTimeout: I,
    fetchJson: j,
    assetUrl: U,
    eventsUrl: _,
    health: () => j("/health", { headers: f() }, 5e3),
    messages: ({ since: $ = 0, recent: m = 5 } = {}) => j($ > 0 ? "/messages?since=" + $ : "/messages?recent=" + m, { headers: f() }, 9e3),
    send: ($) => S("/send", $, 3e4),
    sessions: () => j("/sessions", { headers: f() }, 1e4),
    options: () => j("/options", { headers: f() }, 8e3),
    target: ($) => S("/target", { id: $ }, 2e4),
    createSession: ($) => S("/new", $, 2e4),
    selectModel: ($) => S("/model", $, 1e4),
    setPermission: ($) => S("/permission", { preset: $ }, 8e3),
    renameSession: ($, m) => S("/rename", { id: $, title: m }, 8e3),
    forkSession: ($, m) => S("/fork", m ? { id: $, atSeq: m } : { id: $ }, 15e3),
    archiveSession: ($, m) => S("/session/archive", m ? { id: $, stopActivity: !0 } : { id: $ }, 1e4),
    unarchiveSession: ($) => S("/session/unarchive", { id: $ }, 8e3),
    presentedFileUrl: ($, m, g, h) => {
      const A = new URLSearchParams({ seq: String($), index: String(m) });
      h && A.set("session", String(h));
      const x = T();
      return x && A.set("token", x), g && A.set("name", String(g)), t() + "/presented/file?" + A.toString();
    },
    stop: () => S("/stop", {}, 8e3),
    approvalDecision: ($, m) => S("/approvals", { id: $, decision: m ? "allow" : "deny" }, 5e3),
    respond: ($, m, g) => S("/respond", { id: $, answers: m, session: g }, 8e3),
    presence: ($, m) => S("/presence", m === void 0 ? { phone: !!$ } : { phone: !!$, input: !!m }, 3e3),
    uploadImage: ($) => S("/upload-image", $, 6e4),
    uploadFile: ($) => S("/upload-file", $, 6e4),
    snapshot: ($, { turns: m = 0, before: g = 0 } = {}) => {
      const h = new URLSearchParams();
      $ && h.set("session", $), m > 0 && h.set("turns", String(m)), g > 0 && h.set("before", String(g));
      const A = h.toString();
      return j("/snapshot" + (A ? "?" + A : ""), { headers: f() }, 9e3);
    }
  };
}
function sr(s) {
  const i = s || {}, t = i.code ? "（" + i.code + (i.status ? " " + i.status : "") + "）" : "", T = i.message ? "：" + i.message : "";
  return (i.hint || "执行失败") + t + T;
}
function ir(s) {
  if (!s || !s.type) return null;
  const i = s.payload || {}, t = Number(s.seq), f = {
    who: "ai",
    text: "",
    at: Number(s.at) || Date.now(),
    images: [],
    files: [],
    reasoning: ""
  };
  if (Number.isFinite(t) && (f.seq = t), s.id && (f.eventId = String(s.id)), s.type === "message.user")
    f.who = "me", f.text = String(i.text || ""), f.images = Array.isArray(i.images) ? i.images : [], f.files = Array.isArray(i.files) ? i.files : [];
  else if (s.type === "message.assistant")
    f.text = String(i.text || ""), f.reasoning = String(i.reasoning || ""), f.images = Array.isArray(i.images) ? i.images : [], f.files = Array.isArray(i.files) ? i.files : [];
  else if (s.type === "message.error")
    f.who = "error", f.text = sr(i);
  else
    return null;
  return !f.text && f.images.length === 0 && f.files.length === 0 ? null : f;
}
function cr() {
  const s = [], i = /* @__PURE__ */ new Map();
  let t = 0, T = -1;
  function f() {
    s.length = 0, i.clear(), t = 0, T = -1;
  }
  function v(m) {
    if (!m || !m.type) return !1;
    const g = m.payload || {}, h = Number(m.seq), A = (y) => y ? y.seq : Number.isFinite(h) ? h : 0, x = Number(m.at) || Date.now();
    if (m.type === "tool.update") {
      const y = String(g.callId || "");
      if (!y) return !1;
      const w = "tool-" + y, c = i.get(w);
      return i.set(w, {
        kind: "tool",
        id: w,
        callId: y,
        name: String(g.name || (c ? c.name : "")),
        summary: String(g.summary || (c ? c.summary : "")),
        args: String(g.args || (c ? c.args : "")),
        status: c && c.status !== "running" ? c.status : "running",
        preview: c ? c.preview : "",
        error: c ? c.error : null,
        images: c && Array.isArray(c.images) ? c.images : [],
        seq: c && c.provisional !== !0 ? c.seq : Number.MAX_SAFE_INTEGER,
        provisional: !0,
        at: c ? c.at : x
      }), !0;
    }
    if (m.type === "tool.start") {
      const y = String(g.callId || ""), w = "tool-" + (y || m.id), c = i.get(w);
      return i.set(w, {
        kind: "tool",
        id: w,
        callId: y,
        name: String(g.name || (c ? c.name : "")),
        summary: String(g.summary || (c ? c.summary : "")),
        args: String(g.args || (c ? c.args : "")),
        status: "running",
        preview: c ? c.preview : "",
        error: c ? c.error : null,
        images: c && Array.isArray(c.images) ? c.images : [],
        seq: c && c.provisional !== !0 ? c.seq : Number.isFinite(h) ? h : c ? c.seq : 0,
        provisional: !1,
        at: c ? c.at : x
      }), I(h), !0;
    }
    if (m.type === "tool.end") {
      const y = String(g.callId || ""), w = "tool-" + (y || m.id), c = i.get(w);
      return i.set(w, {
        kind: "tool",
        id: w,
        callId: y,
        name: c ? c.name : "",
        summary: c ? c.summary : "",
        args: c ? c.args : "",
        status: g.ok === !1 ? "failed" : "ok",
        preview: String(g.preview || (c ? c.preview : "")),
        error: g.error || (c ? c.error : null),
        images: Array.isArray(g.images) ? g.images : c && Array.isArray(c.images) ? c.images : [],
        seq: A(c),
        provisional: !1,
        at: c ? c.at : x
      }), I(h), !0;
    }
    if (m.type === "deliverable.present") {
      const y = String(g.callId || ""), w = (Array.isArray(g.files) ? g.files : []).filter(
        (d) => d && typeof d.path == "string" && d.path.trim()
      );
      if (w.length === 0) return !1;
      const c = "deliverable-" + (y || m.id || h), L = i.get(c);
      return i.set(c, {
        kind: "deliverable",
        id: c,
        callId: y,
        turn: Number(g.turn) || 0,
        files: w,
        seq: L && L.provisional !== !0 ? L.seq : Number.isFinite(h) ? h : L ? L.seq : 0,
        at: L ? L.at : x
      }), I(h), !0;
    }
    if (m.type === "approval.request") {
      const y = String(g.approvalId || "");
      if (!y) return !1;
      const w = "approval-" + y, c = i.get(w);
      return i.set(w, {
        kind: "approval",
        id: w,
        approvalId: y,
        title: String(g.title || (c ? c.title : "")),
        tool: String(g.tool || (c ? c.tool : "")),
        reason: String(g.reason || ""),
        callId: String(g.callId || ""),
        decision: "",
        outcome: "",
        seq: A(c),
        at: c ? c.at : x
      }), I(h), !0;
    }
    if (m.type === "approval.result") {
      const y = String(g.approvalId || "");
      if (!y) return !1;
      const w = "approval-" + y, c = i.get(w);
      return i.set(w, {
        kind: "approval",
        id: w,
        approvalId: y,
        title: c ? c.title : "",
        tool: String(g.tool || (c ? c.tool : "")),
        reason: String(g.reason || (c ? c.reason : "")),
        callId: c ? c.callId : "",
        decision: g.decision === "deny" ? "deny" : "allow",
        outcome: String(g.outcome || ""),
        seq: A(c),
        at: c ? c.at : x
      }), I(h), !0;
    }
    if (m.type === "input.request" || m.type === "input.result") {
      const y = String(g.callId || "");
      if (!y) return !1;
      const w = "input-" + y, c = i.get(w), L = Array.isArray(g.questions) ? g.questions : c ? c.questions : [];
      return m.type === "input.request" ? i.set(w, {
        kind: "input",
        id: w,
        callId: y,
        questions: L,
        state: String(g.state || (c ? c.state : "open")),
        answers: c ? c.answers : null,
        seq: A(c),
        at: c ? c.at : x
      }) : i.set(w, {
        kind: "input",
        id: w,
        callId: y,
        questions: L,
        state: "answered",
        answers: Array.isArray(g.answers) ? g.answers : [],
        seq: A(c),
        at: c ? c.at : x
      }), I(h), !0;
    }
    return !1;
  }
  function z() {
    t = s.reduce((m, g) => Math.max(m, Number(g && g.id) || 0), 0);
  }
  function I(m) {
    const g = Number(m);
    Number.isFinite(g) && g > T && (T = g);
  }
  function j(m) {
    const g = s.filter((h) => h.local);
    s.length = 0;
    for (const h of m) s.push(h);
    for (const h of g) s.push(h);
    z();
    for (const h of s) I(h.seq);
  }
  function S(m) {
    if (!m) return !1;
    if (m.id) {
      if (m.who === "me") {
        const g = s.find((h) => h.local && h.text === m.text && !h.id);
        if (g)
          return g.id = m.id, g.at = m.at || g.at, Number.isFinite(Number(m.seq)) && (g.seq = m.seq), g.local = !1, g.images = m.images || [], g.files = m.files || [], I(g.seq), z(), !0;
      }
      if (s.some((g) => g.id === m.id)) return !1;
    }
    return s.push(m), I(m.seq), z(), !0;
  }
  function U(m) {
    const g = v(m), h = ir(m);
    if (!h)
      return I(m && m.seq), g;
    if (h.eventId && s.some((x) => x.eventId === h.eventId) || h.seq !== void 0 && s.some(
      (x) => x.seq === h.seq && x.who === h.who && x.text === h.text
    ) || h.who === "ai" && s.some(
      (x) => x.who === "ai" && x.text === h.text && Math.abs(Number(x.at || 0) - Number(h.at || 0)) < 15e3
    ))
      return I(h.seq), g;
    const A = s[s.length - 1];
    if (A && A.who === "ai" && h.who === "ai" && A.text === h.text)
      return I(h.seq), g;
    if (h.who === "me") {
      const x = s.find((y) => y.local && y.text === h.text);
      if (x)
        return x.eventId = h.eventId, x.at = h.at || x.at, x.seq = h.seq, x.local = !1, x.images = h.images, x.files = h.files, I(h.seq), !0;
      if (s.some(
        (y) => y.who === "me" && y.text === h.text && Math.abs(Number(y.at || 0) - Number(h.at || 0)) < 15e3
      ))
        return I(h.seq), g;
    }
    return h.seq !== void 0 && h.who === "error" && s.some((x) => x.seq === h.seq && x.who === "error") ? (I(h.seq), g) : (s.push(h), I(h.seq), !0);
  }
  function _(m) {
    const g = s.filter((A) => A.local);
    s.length = 0, i.clear(), T = -1;
    for (const A of g) s.push(A);
    let h = g.length > 0;
    for (const A of [...m || []].sort((x, y) => Number(x.seq) - Number(y.seq)))
      U(A) && (h = !0);
    return h;
  }
  function $() {
    const m = [];
    for (const g of s)
      m.push({ kind: "message", message: g, seq: Number(g.seq) });
    for (const g of i.values()) m.push(g);
    return m.sort((g, h) => {
      const A = Number.isFinite(Number(g.seq)) ? Number(g.seq) : Number.MAX_SAFE_INTEGER, x = Number.isFinite(Number(h.seq)) ? Number(h.seq) : Number.MAX_SAFE_INTEGER;
      return A - x;
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
      return T;
    },
    get size() {
      return s.length;
    },
    clear: f,
    replaceMessages: j,
    upsertMessage: S,
    upsertEvent: U,
    replaceEvents: _
  };
}
const hn = "docklet-chat-cache", Lt = "events", be = "meta", fn = "schema", lr = 2, aa = 1, dr = 600, xe = 3;
function ur() {
  try {
    return typeof indexedDB < "u" && indexedDB !== null;
  } catch {
    return !1;
  }
}
function pr({ limit: s = dr } = {}) {
  let i = null, t = 0;
  function T(h) {
    return new Promise((A, x) => {
      const y = h.transaction([be, Lt], "readwrite"), w = y.objectStore(be), c = w.get(fn);
      c.onsuccess = () => {
        const L = c.result ? Number(c.result.value) : 0;
        L !== aa && (L && L !== aa && y.objectStore(Lt).clear(), w.put({ key: fn, value: aa }));
      }, y.oncomplete = () => A(), y.onerror = () => x(y.error || new Error("indexedDB schema failed"));
    });
  }
  function f() {
    return ur() ? i || (i = new Promise((h, A) => {
      const x = indexedDB.open(hn, lr);
      x.onupgradeneeded = () => {
        const y = x.result;
        y.objectStoreNames.contains(Lt) || y.createObjectStore(Lt, { keyPath: "key" }).createIndex("session", "session", { unique: !1 }), y.objectStoreNames.contains(be) || y.createObjectStore(be, { keyPath: "key" });
      }, x.onsuccess = () => {
        const y = x.result;
        T(y).then(() => h(y)).catch(() => h(y));
      }, x.onerror = () => A(x.error || new Error("indexedDB open failed")), x.onblocked = () => A(new Error("indexedDB blocked"));
    }), i) : Promise.reject(new Error("no indexedDB"));
  }
  function v(h, A) {
    return f().then(
      (x) => new Promise((y, w) => {
        const c = x.transaction(Lt, h), L = c.objectStore(Lt);
        let d;
        try {
          d = A(L);
        } catch (n) {
          w(n);
          return;
        }
        c.oncomplete = () => y(d), c.onerror = () => w(c.error || new Error("indexedDB transaction failed")), c.onabort = () => w(c.error || new Error("indexedDB transaction aborted"));
      })
    );
  }
  function z(h) {
    return !!(h && (h.name === "QuotaExceededError" || h.code === 22 || /quota|storage/i.test(String(h.message || ""))));
  }
  function I(h) {
    return v("readwrite", (A) => {
      const x = A.index("session");
      return new Promise((y, w) => {
        const c = x.getAll(h);
        c.onsuccess = () => {
          const L = (c.result || []).sort((n, K) => Number(n.seq) - Number(K.seq)), d = L.slice(0, Math.max(1, Math.ceil(L.length / 2)));
          for (const n of d) A.delete(n.key);
          y(d.length);
        }, c.onerror = () => w(c.error);
      });
    });
  }
  function j(h, A) {
    const x = String(h || ""), y = (Array.isArray(A) ? A : []).filter((L) => L && L.id && Number.isFinite(Number(L.seq)));
    if (!x || y.length === 0) return Promise.resolve(0);
    const w = () => v("readwrite", (L) => {
      for (const d of y)
        L.put({ key: x + ":" + d.id, session: x, seq: Number(d.seq), event: d });
      return y.length;
    }), c = () => (t += y.length, t < 40 ? 0 : (t = 0, S(x)));
    return w().then(c).catch((L) => {
      if (!z(L)) throw L;
      return I(x).then(w).then(c).catch(() => 0);
    });
  }
  function S(h) {
    return v("readwrite", (A) => {
      const x = A.index("session");
      return new Promise((y, w) => {
        const c = x.getAll(h);
        c.onsuccess = () => {
          const L = (c.result || []).sort((D, X) => Number(D.seq) - Number(X.seq)), d = (() => {
            const D = L.filter((X) => X.event && X.event.type === "turn.start").map((X) => Number(X.seq));
            return D.length ? D : L.filter((X) => X.event && X.event.type === "message.user").map((X) => Number(X.seq));
          })(), n = d.length > xe ? d[d.length - xe] : 0;
          let K = n > 0 ? L.filter((D) => Number(D.seq) >= n) : L;
          K.length > s && (K = K.slice(K.length - s));
          const et = new Set(K.map((D) => D.key)), Q = L.filter((D) => !et.has(D.key));
          for (const D of Q) A.delete(D.key);
          y(Q.length);
        }, c.onerror = () => w(c.error);
      });
    });
  }
  function U(h) {
    const A = String(h || "");
    return A ? v("readwrite", (x) => {
      const y = x.index("session");
      return new Promise((w, c) => {
        const L = y.openCursor();
        let d = 0;
        L.onsuccess = () => {
          const n = L.result;
          if (!n) {
            w(d);
            return;
          }
          n.value && n.value.session !== A && (n.delete(), d += 1), n.continue();
        }, L.onerror = () => c(L.error);
      });
    }) : Promise.resolve(0);
  }
  function _(h) {
    const A = String(h || "");
    return A ? v("readonly", (x) => {
      const y = x.index("session");
      return new Promise((w, c) => {
        const L = y.getAll(A);
        L.onsuccess = () => {
          const d = (L.result || []).sort((Q, D) => Number(Q.seq) - Number(D.seq)), n = (() => {
            const Q = d.filter((D) => D.event && D.event.type === "turn.start").map((D) => Number(D.seq));
            return Q.length ? Q : d.filter((D) => D.event && D.event.type === "message.user").map((D) => Number(D.seq));
          })(), K = n.length > xe ? n[n.length - xe] : 0;
          let et = K > 0 ? d.filter((Q) => Number(Q.seq) >= K) : d;
          et.length > s && (et = et.slice(et.length - s)), w(et.map((Q) => Q.event).filter(Boolean));
        }, L.onerror = () => c(L.error);
      });
    }) : Promise.resolve([]);
  }
  function $(h) {
    const A = String(h || "");
    return v("readwrite", (x) => {
      const y = x.index("session");
      return new Promise((w, c) => {
        const L = y.getAllKeys(A);
        L.onsuccess = () => {
          for (const d of L.result || []) x.delete(d);
          w(!0);
        }, L.onerror = () => c(L.error);
      });
    });
  }
  function m() {
    return v("readwrite", (h) => (h.clear(), !0));
  }
  function g() {
    return (async () => {
      if (i) {
        try {
          const A = await i;
          A && typeof A.close == "function" && A.close();
        } catch {
        }
        i = null;
      }
    })().then(
      () => new Promise((A) => {
        try {
          const x = indexedDB.deleteDatabase(hn);
          x.onsuccess = x.onerror = x.onblocked = () => A(!0);
        } catch {
          A(!1);
        }
      })
    );
  }
  return { put: j, get: _, clear: $, clearAll: m, clearOthers: U, destroy: g };
}
function hr({ appId: s, base: i, token: t, notify: T, mode: f = "turn" }) {
  const v = {
    id: s,
    endpoint: String(i) + "/health",
    token: t || "",
    intervalMs: 2500,
    enabled: T !== !1,
    openApp: s,
    suppressApp: s,
    title: "DSH控制台"
  };
  return f === "message" ? {
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
const fr = /^(https?:\/\/|mailto:)/i, gn = {
  js: "const let var function return if else for while do break continue class new typeof instanceof in of this super import from export default async await try catch finally throw switch case extends static get set yield void delete",
  ts: "const let var function return if else for while do break continue class new typeof instanceof in of this super import from export export default async await try catch finally throw switch case extends static get set yield void delete interface type enum implements private public protected readonly namespace declare abstract as satisfies keyof infer",
  py: "def class return if elif else for while import from as pass break continue with try except finally raise lambda yield global nonlocal assert del in is not and or None True False async await print",
  bash: "if then else elif fi for while do done case esac function in return exit export local echo cd ls grep sed awk cat test"
}, gr = {
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
function vn(s, i) {
  return /^https?:\/\//i.test(i) ? /^https:/i.test(i) ? `<img class="chat-image chat-md-image" src="${N(i)}" alt="${N(s)}" loading="lazy" referrerpolicy="no-referrer" />` : `<img class="chat-image chat-md-image" data-remote="${N(i)}" alt="${N(s)}" />` : C(s);
}
function Tt(s) {
  const i = String(s ?? "");
  let t = "", T = 0;
  const f = /!\[([^\]]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)|`([^`\n]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|~~([^~]+)~~|\[([^\]]+)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)|(https?:\/\/[^\s<>"'`\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+)/gu;
  let v;
  for (; v = f.exec(i); ) {
    if (t += C(i.slice(T, v.index)), T = v.index + v[0].length, v[1] !== void 0) {
      t += vn(v[1], v[2]);
      continue;
    }
    if (v[3] !== void 0) {
      t += `<code class="chat-inline-code">${C(v[3])}</code>`;
      continue;
    }
    if (v[4] !== void 0) {
      t += `<strong>${C(v[4])}</strong>`;
      continue;
    }
    if (v[5] !== void 0) {
      t += `<strong>${C(v[5])}</strong>`;
      continue;
    }
    if (v[6] !== void 0) {
      t += `<em>${C(v[6])}</em>`;
      continue;
    }
    if (v[7] !== void 0) {
      t += `<del>${C(v[7])}</del>`;
      continue;
    }
    if (v[8] !== void 0) {
      const S = v[8], U = v[9];
      t += fr.test(U) ? `<a class="chat-link" href="${N(U)}" data-href="${N(U)}" target="_blank" rel="noreferrer noopener">${C(S)}</a>` : C(S);
      continue;
    }
    const z = v[10], I = z.replace(/[).,;:!?'"”’）】》]+$/gu, ""), j = z.slice(I.length);
    t += `<a class="chat-link" href="${N(I)}" data-href="${N(I)}" target="_blank" rel="noreferrer noopener">${C(I)}</a>${C(j)}`;
  }
  return t += C(i.slice(T)), t;
}
function mr(s, i) {
  const t = gr[String(i || "").toLowerCase()] || "", T = String(s ?? "");
  if (t === "json" || !gn[t])
    return { html: C(T), lang: t || String(i || "").toLowerCase() };
  const f = t === "js" || t === "ts" ? String.raw`(\/\*[\s\S]*?\*\/|\/\/[^\n]*)` : String.raw`(#[^\n]*)`, v = new RegExp(
    f + String.raw`|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|` + "`(?:\\\\[\\s\\S]|[^`\\\\])*`)",
    "g"
  ), z = [];
  let I = T.replace(v, (S) => (z.push(S), `\0${"z".repeat(z.length)}\0`));
  I = C(I);
  const j = gn[t].split(/\s+/);
  return I = I.replace(
    /\b([A-Za-z_$][\w$]*)\b/g,
    (S) => j.includes(S) ? `<span class="tk-k">${S}</span>` : S
  ), I = I.replace(/\b\d+(?:\.\d+)?\b/g, (S) => `<span class="tk-n">${S}</span>`), I = I.replace(/\u0000(z+)\u0000/g, (S, U) => {
    const _ = z[U.length - 1] || "";
    return `<span class="${_.startsWith("/") || _.startsWith("#") ? "tk-c" : "tk-s"}">${C(_)}</span>`;
  }), { html: I, lang: t };
}
function br(s, i) {
  const t = mr(s, i), T = t.lang || "code";
  return `<div class="chat-code"><div class="chat-code-head"><span class="chat-code-lang">${C(T)}</span><button type="button" class="chat-code-copy" data-action="copy-code" data-code="${N(encodeURIComponent(s))}">复制</button></div><pre><code>${t.html}</code></pre></div>`;
}
function yn(s, i) {
  if (i + 1 >= s.length || !/^\s*\|.*\|\s*$/.test(s[i])) return !1;
  const t = s[i + 1];
  return /^\s*\|?[\s:|-]+\|?\s*$/.test(t) && t.includes("-");
}
function mn(s) {
  return s.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((t) => t.trim());
}
function xr(s, i) {
  const t = s[i];
  return /^\s*```/.test(t) || /^(#{1,6})\s+/.test(t) || /^\s*>\s?/.test(t) || /^\s*[-*+]\s+/.test(t) || /^\s*\d+[.)]\s+/.test(t) || /^\s*([-*_])(?:\s*\1){2,}\s*$/.test(t) || yn(s, i);
}
function bn(s, i, t) {
  const T = [], f = t ? /^\s*\d+[.)]\s+(.*)$/ : /^\s*[-*+]\s+(.*)$/;
  let v = i;
  for (; v < s.length; ) {
    const z = f.exec(s[v]);
    if (!z) {
      if (T.length > 0 && /^\s{2,}\S/.test(s[v])) {
        T[T.length - 1] += " " + s[v].trim(), v += 1;
        continue;
      }
      break;
    }
    T.push(z[1]), v += 1;
  }
  return { items: T, next: v };
}
const na = /^\s*!\[([^\]]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)\)\s*$/;
function vr(s) {
  const i = s.length;
  return `<div class="chat-md-gallery ${i === 1 ? "is-one" : i === 2 ? "is-two" : i >= 5 ? "is-many" : "is-few"}" data-count="${i}">${s.map((T) => vn(T.alt, T.src)).join("")}</div>`;
}
function wn(s) {
  const t = String(s ?? "").replace(/\r\n?/g, `
`).split(`
`), T = [];
  let f = 0;
  for (; f < t.length; ) {
    const v = t[f];
    if (!v.trim()) {
      f += 1;
      continue;
    }
    const z = /^\s*```(.*)$/.exec(v);
    if (z) {
      const S = z[1].trim().split(/\s+/)[0] || "", U = [];
      for (f += 1; f < t.length && !/^\s*```\s*$/.test(t[f]); )
        U.push(t[f]), f += 1;
      f < t.length && (f += 1), T.push(br(U.join(`
`), S));
      continue;
    }
    const I = /^(#{1,6})\s+(.+?)\s*$/.exec(v);
    if (I) {
      const S = I[1].length;
      T.push(`<h${S}>${Tt(I[2])}</h${S}>`), f += 1;
      continue;
    }
    if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(v)) {
      T.push("<hr />"), f += 1;
      continue;
    }
    if (/^\s*>\s?/.test(v)) {
      const S = [];
      for (; f < t.length && /^\s*>\s?/.test(t[f]); )
        S.push(t[f].replace(/^\s*>\s?/, "")), f += 1;
      T.push(`<blockquote>${S.map(Tt).join("<br />")}</blockquote>`);
      continue;
    }
    if (/^\s*[-*+]\s+/.test(v)) {
      const S = bn(t, f, !1);
      T.push(`<ul>${S.items.map((U) => `<li>${Tt(U)}</li>`).join("")}</ul>`), f = S.next;
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(v)) {
      const S = bn(t, f, !0);
      T.push(`<ol>${S.items.map((U) => `<li>${Tt(U)}</li>`).join("")}</ol>`), f = S.next;
      continue;
    }
    if (yn(t, f)) {
      const S = mn(t[f]);
      f += 2;
      const U = [];
      for (; f < t.length && /^\s*\|.*\|\s*$/.test(t[f]); )
        U.push(mn(t[f])), f += 1;
      T.push(
        `<div class="chat-table-wrap"><table><thead><tr>${S.map((_) => `<th>${Tt(_)}</th>`).join("")}</tr></thead><tbody>${U.map((_) => `<tr>${_.map(($) => `<td>${Tt($)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
      );
      continue;
    }
    if (na.test(v)) {
      const S = [];
      for (; f < t.length; ) {
        const U = na.exec(t[f]);
        if (U) {
          S.push({ alt: U[1], src: U[2] }), f += 1;
          continue;
        }
        if (!t[f].trim()) {
          let _ = f;
          for (; _ < t.length && !t[_].trim(); ) _ += 1;
          if (_ < t.length && na.test(t[_])) {
            f = _;
            continue;
          }
        }
        break;
      }
      if (S.length > 0) {
        T.push(vr(S));
        continue;
      }
    }
    const j = [];
    for (; f < t.length && t[f].trim() && !xr(t, f); )
      j.push(t[f]), f += 1;
    j.length === 0 && (j.push(t[f]), f += 1), T.push(`<p>${j.map(Tt).join("<br />")}</p>`);
  }
  return T.join("");
}
function yr(s) {
  return s ? s.eventId ? String(s.eventId) : s.id ? "id" + s.id : Number.isFinite(Number(s.seq)) ? "s" + s.seq : "" : "";
}
function oa(s, i) {
  const t = s ? i && i.me : i && i.ai;
  return t ? `<span class="chat-avatar has-image"><img src="${N(t)}" alt="" /></span>` : `<span class="chat-avatar">${s ? "🙂" : "🤖"}</span>`;
}
function xn(s, i, t) {
  const T = yr(s), f = T ? ` data-mid="${N(T)}"` : "";
  if (s.who === "sys")
    return `<div class="chat-sys">${nr(C(me(s.text)))}</div>`;
  if (s.who === "error") {
    const x = s.retryText ? `<button type="button" class="chat-retry" data-retry="${N(encodeURIComponent(s.retryText))}">点按重试</button>` : "";
    return `<div class="chat-turn is-ai"${f}>${x}<div class="chat-bubble is-error" data-copy="${N(encodeURIComponent(me(s.text)))}">${C(me(s.text))}</div></div>`;
  }
  const v = s.who === "me", z = Array.isArray(s.images) ? s.images : [], I = Array.isArray(s.files) ? s.files : [], j = z.length ? `<div class="chat-md-gallery ${z.length === 1 ? "is-one" : z.length === 2 ? "is-two" : z.length >= 5 ? "is-many" : "is-few"}" data-count="${z.length}">${z.map((x) => {
    const y = String(x.id || "").startsWith("local:") ? String(x.src || "") : "";
    if (y) return `<img class="chat-image chat-md-image" src="${N(y)}" alt="图片" />`;
    const w = i("image", x.id);
    return `<img class="chat-image chat-md-image" data-src="${N(w)}" alt="图片" />`;
  }).join("")}</div>` : "", S = I.map((x) => {
    const y = x.name || "文件";
    if (String(x.id || "").startsWith("local:"))
      return `<div class="chat-file"><span class="chat-file-icon">📦</span><span class="chat-file-main"><span class="chat-file-name">${C(y)}</span><span class="chat-file-size">${pn(x.size)} · 发送中</span></span></div>`;
    const w = i("file", x.id, y);
    return `<a class="chat-file" href="${N(w)}" data-file-url="${N(w)}" data-file-name="${N(y)}" download="${N(y)}">
          <span class="chat-file-icon">📦</span>
          <span class="chat-file-main">
            <span class="chat-file-name">${C(y)}</span>
            <span class="chat-file-size">${pn(x.size)} · 点按下载</span>
          </span>
        </a>`;
  }).join(""), U = s.text ? wn(s.text) : "", _ = s.reasoning ? `<details class="chat-thinking"><summary>思考过程</summary><div class="chat-thinking-text">${C(s.reasoning)}</div></details>` : "", $ = s.pending ? " is-typing" : "", m = `<div class="chat-bubble ${v ? "is-me" : "is-ai"}${$}${z.length ? " has-images" : ""}" data-copy="${N(encodeURIComponent(me(s.text || "")))}">${j}${S}${_}${U}</div>`, g = !s.pending && s.text ? '<button type="button" class="chat-copy" data-action="copy-message" aria-label="复制这条消息">复制</button>' : "", h = v && !s.pending && s.text ? '<button type="button" class="chat-copy chat-resend" data-action="resend-message" aria-label="放进输入框重发">重发</button>' : "", A = `<div class="chat-meta">${oa(v, t)}<span class="chat-stamp">${Pt(s.at)}</span>${g}${h}</div>`;
  return `<div class="chat-turn ${v ? "is-me" : "is-ai"}"${f}>${A}${m}</div>`;
}
function wr(s, i) {
  const t = N(s.id || ""), T = s.title || (s.blank ? "新对话" : "未命名对话"), f = C(T), v = s.id === i ? "✓ " : "", z = s.running ? "运行中" : s.online ? "在线" : "", I = Pt(s.at);
  return `<div class="chat-session-row">
            <button type="button" class="chat-session" data-session="${t}" data-current="${s.id === i ? "1" : "0"}">
              <span class="chat-session-label">${v}${f}</span>
              <span class="chat-session-time">${z ? C(z) + " · " : ""}${I}</span>
            </button>
            <button type="button" class="chat-session-more" data-action="session-menu" data-session="${t}" data-title="${N(T)}" aria-label="会话操作">⋯</button>
          </div>`;
}
function ra(s) {
  return s ? `<span class="chat-card-time">${Pt(s)}</span>` : "";
}
function kr(s, i, t = null, T = 0, f = !1) {
  const v = s.status === "failed" ? "is-failed" : s.status === "ok" ? "is-ok" : "is-running", z = s.name || "工具", I = s.summary || "", j = Number(T) || 0, S = j ? `<span class="chat-tool-index ${v}">${j}</span>` : '<span class="chat-tool-dot" aria-hidden="true"></span>';
  return `<div class="chat-tool ${v}${f ? " is-active" : ""}" data-tool="${N(s.id)}">
    <button type="button" class="chat-tool-head" data-action="tool-open" data-tool="${N(s.id)}">
      ${S}
      <span class="chat-tool-name">${C(z)}</span>
      ${I ? `<span class="chat-tool-sum">${C(I)}</span>` : ""}
      <span class="chat-tool-chevron" aria-hidden="true">›</span>
    </button>
  </div>`;
}
function Sr(s, i = null) {
  const t = s.status === "failed" ? "is-failed" : s.status === "ok" ? "is-ok" : "is-running", T = s.name || "工具", f = s.summary || "", v = !!(s.preview || s.error), z = (S) => `<button type="button" class="chat-tool-copy" data-action="tool-copy" data-tool="${N(s.id)}" data-copy="${S}">复制</button>`, I = [
    s.preview ? `<div class="chat-tool-code-head"><span>结果</span>${z("preview")}</div><pre class="chat-tool-preview">${C(s.preview)}</pre>` : "",
    s.error ? `<p class="chat-tool-label">错误</p><p class="chat-tool-error">${C([s.error.name, s.error.code, s.error.reason].filter(Boolean).join(" · "))}</p>` : "",
    v ? "" : '<p class="chat-tool-preview">没有输出</p>'
  ].join(""), j = s.args ? `<div class="chat-tool-code-head"><span>参数</span>${z("args")}</div><pre class="chat-tool-pre">${C(s.args)}</pre>` : "";
  return `<div class="chat-tool-detail ${t}">
    <div class="chat-tool-detail-head">
      <span class="chat-tool-dot" aria-hidden="true"></span>
      <span class="chat-tool-name">${C(T)}</span>
      ${f ? `<span class="chat-tool-sum">${C(f)}</span>` : ""}
    </div>
    ${I}
    ${j}
  </div>`;
}
function Tr() {
  return `<div class="chat-tool-group is-empty">
    <div class="chat-tool-group-head">
      <span class="chat-tool-group-icon" aria-hidden="true">&#9874;&#xFE0E;</span>
      <span class="chat-tool-group-title">本轮 0 次工具调用</span>
    </div>
  </div>`;
}
function Ar(s, i, t, T = null, f = {}) {
  const v = Number.isFinite(Number(f.total)) ? Number(f.total) : s.length, z = s.filter((m) => m.status === "failed").length, I = Number(f.running) || 0, j = z > 0 ? `${z} 次失败` : I > 0 ? "执行中" : "已完成", S = "group-" + (s[0] ? s[0].id : "current"), U = s.map((m, g) => kr(m, !1, T, g + 1, m.id === f.activeId)).join(""), _ = i && v > 3 ? `<button type="button" class="chat-tool-group-collapse" data-action="tool-group-toggle" data-group="${N(S)}">收起工具列表</button>` : "", $ = s.length ? `<button type="button" class="chat-tool-group-head" data-action="tool-group-toggle" data-group="${N(S)}" aria-expanded="${i ? "true" : "false"}">
        <span class="chat-tool-group-icon" aria-hidden="true">&#9874;&#xFE0E;</span>
        <span class="chat-tool-group-title">本轮 ${v} 次工具调用</span>
        <span class="chat-tool-group-badge${z > 0 ? " is-failed" : ""}">${j}</span>
        <span class="chat-tool-chevron" aria-hidden="true">›</span>
      </button>` : `<div class="chat-tool-group-head is-static">
        <span class="chat-tool-group-icon" aria-hidden="true">&#9874;&#xFE0E;</span>
        <span class="chat-tool-group-title">本轮 ${v} 次工具调用</span>
        <span class="chat-tool-group-badge${z > 0 ? " is-failed" : ""}">${j}</span>
      </div>`;
  return `<div class="chat-tool-group${i ? " is-open" : ""}" data-group="${N(S)}">
    ${$}
    <div class="chat-tool-group-body"${i && U ? "" : " hidden"}>${U}</div>
    ${_}
  </div>`;
}
function $r(s, i) {
  const t = Array.isArray(s.files) ? s.files : [], T = t.map((f, v) => {
    const z = String(f.path || "").split(/[\\/]/).pop() || "文件", I = typeof i == "function" ? i(s.seq, v, z) : "", j = /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(z), S = `<a class="chat-file chat-deliverable-file" href="${N(I)}" data-file-url="${N(I)}" data-file-name="${N(z)}" download="${N(z)}">
        <span class="chat-file-icon">${j ? "🖼" : "📄"}</span>
        <span class="chat-file-main">
          <span class="chat-file-name">${C(z)}</span>
          <span class="chat-file-size">${C(f.description || (j ? "点图预览 · 点此下载" : "点按下载"))}</span>
        </span>
        ${j ? '<span class="chat-deliverable-download">下载</span>' : ""}
      </a>`;
    return j ? `<div class="chat-deliverable-media">
        <img class="chat-image chat-deliverable-thumb" data-src="${N(I)}" alt="${N(z)}" />
        ${S}
      </div>` : S;
  }).join("");
  return `<div class="chat-card chat-deliverable" data-deliverable="${N(s.id)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">📦</span>
      <span class="chat-card-title">交付文件</span>
      <span class="chat-card-badge">${t.length} 个</span>
      ${ra(s.at)}
    </div>
    <div class="chat-deliverable-list">${T}</div>
  </div>`;
}
function qr(s) {
  const i = !s.decision, t = s.decision === "allow", T = s.title || "等待你授权", f = s.reason || "需要你确认后才能继续。", v = i ? `<div class="chat-card-actions">
        <button type="button" class="chat-btn is-danger" data-action="approval-deny" data-approval="${N(s.id)}">拒绝</button>
        <button type="button" class="chat-btn is-primary" data-action="approval-allow" data-approval="${N(s.id)}">允许</button>
      </div>` : "", z = i ? '<span class="chat-card-badge is-pending">待授权</span>' : `<span class="chat-card-badge ${t ? "is-ok" : "is-failed"}">${t ? "已允许" : "已拒绝"}</span>`;
  return `<div class="chat-card chat-approval${i ? " is-pending" : ""}" data-approval="${N(s.id)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">🛡</span>
      <span class="chat-card-title">${C(T)}</span>
      ${z}
      ${ra(s.at)}
    </div>
    ${s.tool ? `<p class="chat-card-sub">${C(s.tool)}</p>` : ""}
    <p class="chat-card-text">${C(f)}</p>
    ${v}
  </div>`;
}
function Mr(s, i) {
  const t = i && i.selected || {}, T = i && i.custom || {}, f = [];
  for (const v of s.questions || []) {
    const z = Array.isArray(t[v.id]) ? t[v.id] : [], I = String(T[v.id] || "").trim();
    if (z.length === 0 && !I) return null;
    const j = { id: v.id, selected: z };
    I && (j.custom = I), f.push(j);
  }
  return f.length ? f : null;
}
function Er(s, i, t) {
  const T = s.state !== "answered" && !t, f = s.state === "answered", v = i && i.selected || {}, z = i && i.custom || {}, I = (s.questions || []).map((S) => {
    const U = Array.isArray(v[S.id]) ? v[S.id] : [], _ = Array.isArray(S.options) ? S.options : [], $ = f && Array.isArray(s.answers) ? s.answers.find((A) => A.id === S.id) : null, m = _.length ? `<div class="chat-q-opts">${_.map((A) => {
      const x = U.includes(A.label), y = $ && Array.isArray($.selected) && $.selected.includes(A.label);
      return `<button type="button" class="chat-q-opt${x || y ? " is-on" : ""}" data-action="q-pick" data-input="${N(s.callId)}" data-q="${N(S.id)}" data-value="${N(A.label)}" ${S.multiSelect ? 'data-multi="1"' : ""} ${T ? "" : "disabled"}>
                <span class="chat-q-opt-label">${C(A.label)}</span>
                ${A.description ? `<small class="chat-q-opt-desc">${C(A.description)}</small>` : ""}
              </button>`;
    }).join("")}</div>` : "", g = f && $ && $.custom ? $.custom : String(z[S.id] || ""), h = T ? `<input class="chat-q-custom" data-role="q-custom" data-input="${N(s.callId)}" data-q="${N(S.id)}" value="${N(g)}" placeholder="或者自己输入" autocomplete="off" />` : g ? `<p class="chat-q-custom-text">${C(g)}</p>` : "";
    return `<div class="chat-q">
        ${S.header ? `<p class="chat-q-header">${C(S.header)}</p>` : ""}
        <p class="chat-q-text">${C(S.question || "")}</p>
        ${S.detail ? `<p class="chat-q-sub">${C(S.detail)}</p>` : ""}
        ${m}
        ${h}
      </div>`;
  }).join(""), j = T ? `<div class="chat-card-actions"><button type="button" class="chat-btn is-primary" data-action="q-submit" data-input="${N(s.callId)}">${t ? "已提交" : "提交"}</button></div>` : "";
  return `<div class="chat-card chat-input-card${T ? " is-pending" : ""}${f ? " is-answered" : ""}" data-input="${N(s.callId)}">
    <div class="chat-card-head">
      <span class="chat-card-icon" aria-hidden="true">❓</span>
      <span class="chat-card-title">${f ? "已回答" : t ? "已提交，等待继续" : "需要你选择"}</span>
      ${ra(s.at)}
    </div>
    ${I}
    ${j}
  </div>`;
}
function Ir(s, i) {
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
    avatarMe: "",
    avatarAi: "",
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
    lanUrl: mt,
    wanUrl: "",
    autoPick: !0,
    pick: "lan",
    mode: "auto",
    wanFirst: !1,
    running: !1,
    liveDown: !1,
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
  }, T = String(i.manifest && i.manifest.version || ""), f = typeof window < "u" && !!window.__verifyWatchdog && /^(127\.0\.0\.1|localhost)$/.test(location.hostname), v = f ? 120 : 5 * 60 * 1e3, z = 6e3, I = 45 * 1e3, j = 10 * 1e3, S = f ? 450 : 15 * 60 * 1e3, U = f ? 80 : 1e4, _ = 3, $ = 5, m = 30, g = [
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
  ], h = 1e3, A = "我这边在手机上处理不了刚才的确认，已经中断当前回合。请改用不需要电脑端弹窗的方式继续；如果必须用电脑操作，请先告诉我需要做什么。", x = 180, y = String(i.manifest && i.manifest.id || "dsh-console"), w = rr({ base: () => t.url, token: () => t.token }), c = cr(), L = pr();
  t.messages = c.messages;
  let d = null, n = {}, K = null, et = 0, Q = !1, D = !1, X = 0, ve = 0, lt = [], bt = null, sa = 0, ye = null, we = null, ke = null, zt = null, F = { list: [], index: 0, scale: 1, x: 0, y: 0 }, rt = null, nt = /* @__PURE__ */ new Map(), xt = null, ot = !1, vt = 0, dt = 0, at = "unknown", Ct = null, ia = 0, Se = 0, Bt = 0, ca = !1;
  const Vt = /* @__PURE__ */ new Set(), Yt = /* @__PURE__ */ new Map(), Qt = /* @__PURE__ */ new Set();
  function kn() {
    let e = "", a = "", o = !0, r = "turn", l = "", u = "", b = !0, E = "lan";
    try {
      const B = i.storage.get(ea);
      if (B) {
        const p = JSON.parse(B);
        e = p && typeof p.url == "string" ? p.url : "", a = p && typeof p.token == "string" ? p.token : "", p && p.notify !== void 0 && (o = p.notify !== !1), p && p.notifyMode === "message" && (r = "message"), p && typeof p.lanUrl == "string" && (l = p.lanUrl), p && typeof p.wanUrl == "string" && (u = p.wanUrl), p && p.autoPick !== void 0 && (b = p.autoPick !== !1), p && p.pick === "wan" && (E = "wan"), p && typeof p.avatarMe == "string" && (t.avatarMe = p.avatarMe), p && typeof p.avatarAi == "string" && (t.avatarAi = p.avatarAi);
      }
    } catch {
    }
    if (!l && !u && e) {
      const B = St(e);
      B && B !== mt ? u = B : l = B;
    }
    t.lanUrl = St(l) || mt, t.wanUrl = u ? St(u) : "", t.autoPick = b !== !1, t.pick = E, t.mode = t.autoPick ? "auto" : t.pick === "wan" ? "wan" : "lan", t.token = String(a || "").trim(), t.notify = o !== !1, t.notifyMode = r, t.url = t.autoPick ? t.lanUrl : t.pick === "wan" && t.wanUrl ? t.wanUrl : t.lanUrl;
  }
  function At() {
    i.storage.set(ea, JSON.stringify({
      lanUrl: t.lanUrl,
      wanUrl: t.wanUrl,
      autoPick: t.autoPick !== !1,
      pick: t.pick,
      token: t.token,
      notify: t.notify !== !1,
      notifyMode: t.notifyMode === "message" ? "message" : "turn",
      avatarMe: t.avatarMe || "",
      avatarAi: t.avatarAi || ""
    }));
  }
  const Te = "ui.v1";
  function Sn() {
    try {
      const e = i.storage.get(Te);
      if (!e) return;
      const a = JSON.parse(e);
      if (!a) return;
      a.title && (t.sessionTitle = String(a.title)), a.meta && (t.meta = a.meta), a.chip && (t.uiChip = String(a.chip)), a.session && (t.currentSession = String(a.session)), a.status && (t.status = String(a.status), t.statusText = String(a.statusText || ""));
    } catch {
    }
  }
  function Ae() {
    try {
      i.storage.set(
        Te,
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
  function la() {
    try {
      i.storage.remove(ln);
    } catch {
    }
  }
  async function Tn() {
    it();
    try {
      await L.clearAll();
    } catch {
    }
    try {
      if (typeof caches < "u")
        for (const e of await caches.keys()) await caches.delete(e);
    } catch {
    }
    la(), c.clear(), t.toolDetailId = "", t.toolActiveId = "", H(!0), P("缓存已清理");
    try {
      await yt();
    } catch {
    }
  }
  async function An() {
    it();
    try {
      await L.destroy();
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
    i.storage.remove(ea), i.storage.remove(Te), i.storage.remove(ln), c.clear(), H(!0), P("正在恢复初始化…"), window.setTimeout(() => {
      i.shell && typeof i.shell.exit == "function" ? i.shell.exit() : location.reload();
    }, 400);
  }
  let Xt = [], $t = "", Rt = 0;
  function it() {
    if (Rt && (window.clearTimeout(Rt), Rt = 0), !Xt.length || !$t) return;
    const e = $t, a = Xt;
    Xt = [], $t = "", L.put(e, a).catch(() => {
    });
  }
  function $n(e, a) {
    !e || !a || !a.id || ($t && $t !== e && it(), $t = e, Xt.push(a), !Rt && (Rt = window.setTimeout(it, 180)));
  }
  async function $e(e) {
    if (t.url)
      try {
        await w.presence(e, !0);
      } catch {
      }
  }
  async function qn(e, a) {
    if (!e) {
      P("这条审批已经失效", "error");
      return;
    }
    t.lastProgressAt = Date.now();
    try {
      await w.approvalDecision(e, a), P(a ? "已允许" : "已拒绝");
    } catch (o) {
      P("提交失败：" + (o && o.message || "网络错误"), "error");
    }
  }
  const Jt = (e, a, o) => w.assetUrl(e, a, o), da = (e, a, o) => w.fetchWithTimeout(e, a, o);
  async function Mn() {
    if (!t.url) {
      G("unset", "未配置");
      return;
    }
    G("checking", "连接中…");
    try {
      const e = await w.health();
      G("ok", e && e.hasKey === !1 ? "连上了，但电脑缺 key" : "已连接");
    } catch {
      G("bad", "连不上");
    }
  }
  function G(e, a) {
    t.status = e, t.statusText = a, Wa(), Ae();
  }
  function qe(e) {
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
  async function Dt(e) {
    if (!t.url)
      return G("unset", "未配置"), !1;
    if (t.waiting) return !1;
    try {
      const a = await w.messages({ recent: $ }), o = Array.isArray(a.messages) ? a.messages : [];
      return c.replaceMessages(
        o.map(qe).filter((r) => r.text || r.images.length || r.files.length)
      ), t.hydrated = !0, t.booting = !1, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.running = !!(a && a.running), t.lastEventAge = Number(a && a.lastEventAgeMs) || 0, a && a.instance && (t.instance = String(a.instance)), a && a.meta && (t.meta = a.meta, qt()), t.staleShown = !1, a.current && (t.currentSession = String(a.current)), a.title && ft(a.title), H(!0), !0;
    } catch {
      return t.hydrated = !1, !1;
    }
  }
  function En(e) {
    const a = qe(e);
    if (!a.id) return !1;
    const o = c.upsertMessage(a);
    return o && a.who !== "me" && (t.lastReplyAt = Date.now(), window.setTimeout(() => {
      D || H();
    }, 2200)), o;
  }
  async function ua() {
    if (!(D || Q) && !(!t.url || t.view !== "chat" || document.hidden) && at !== "sse") {
      Q = !0;
      try {
        const e = t.hydrated ? t.cursor : 0, a = await w.messages({ since: e, recent: $ }), o = Array.isArray(a.messages) ? a.messages : [];
        t.status !== "ok" && G("ok", "已连接"), a.current && (t.currentSession = String(a.current)), a.title && ft(a.title), a.meta && (t.meta = a.meta, qt());
        const r = String(a.instance || ""), l = Number(a.last) || 0;
        if (!!(r && t.instance && r !== t.instance || e > 0 && l > 0 && l < e)) {
          t.instance = r || t.instance, c.clear(), t.hydrated = !1, t.running = !1, t.waiting = !1, t.waitingSince = 0, await Dt(!0);
          return;
        }
        r && (t.instance = r);
        const b = t.running, E = t.staleShown, B = typeof a.running == "boolean";
        B && (t.running = !!a.running, a.running && (t.awaitingReply = !0), !t.running && t.waitingSince && Date.now() - t.waitingSince > 2500 && (t.waiting = !1, t.busy = !1, t.waitingSince = 0));
        const p = t.currentTool, q = p ? String(p.name) + "|" + String(p.detail || "") + "|" + String(!!p.done) : "";
        t.currentTool = a.tool && a.tool.name ? {
          name: String(a.tool.name),
          detail: String(a.tool.detail || ""),
          done: !!a.tool.done
        } : null, t.currentTool && (t.lastTool = { name: t.currentTool.name, detail: t.currentTool.detail, done: !0 }, t.lastToolAt = Date.now());
        const k = t.currentTool ? String(t.currentTool.name) + "|" + String(t.currentTool.detail || "") + "|" + String(t.currentTool.done) : "", R = q !== k;
        t.lastEventAge = Number(a.lastEventAgeMs) || 0;
        const O = t.running && t.lastEventAge > 3e5;
        t.staleShown = O;
        const W = B && (b !== t.running || E !== O);
        if (!t.hydrated) {
          c.replaceMessages(
            o.map(qe).filter((M) => M.text || M.images.length || M.files.length)
          ), t.hydrated = !0, t.booting = !1, !t.waiting && !t.running && (t.busy = !1), H(!0);
          return;
        }
        if (o.length === 0) {
          (W || R) && H();
          return;
        }
        let Z = !1;
        for (const M of o)
          c.cursor = Math.max(c.cursor, Number(M.id) || 0), En(M) && (Z = !0);
        !B && t.waiting && (t.waiting = !1, t.busy = !1, Z = !0), (Z || W || R) && H();
      } catch (e) {
        const a = String(e && e.message || "");
        if (/401|令牌|unauthor/i.test(a)) {
          G("bad", "令牌不正确");
          return;
        }
        se || (t.wanFirst = !0, pt());
      } finally {
        Q = !1;
      }
    }
  }
  function jt() {
    et || (et = window.setInterval(ua, 800));
  }
  function Me() {
    et && (window.clearInterval(et), et = 0);
  }
  function In(e) {
    const a = e && e.session || {}, o = e && Array.isArray(e.events) ? e.events : [];
    c.replaceEvents(o), t.projections = e && e.projections && typeof e.projections == "object" ? e.projections : {}, t.stream = null, t.hydrated = !0, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.running = !!a.running, a.running && (t.awaitingReply = !0), t.lastEventAt = Date.now(), t.currentTool = null, t.lastTool = null, t.lastToolAt = 0, t.running && a.tool && a.tool.name && (t.currentTool = {
      name: String(a.tool.name),
      detail: String(a.tool.detail || ""),
      done: !!a.tool.done
    }), t.running || ha(!0), t.turnHasMore = !!(e && e.hasMore), t.historyLimitReached = !1, t.stopped = !1, t.oldestSeq = Number(e && e.oldestSeq) || o[0] && o[0].seq || 0, t.loadingOlder = !1, t.stuckPrompt = !1, t.lastProgressAt = Date.now(), t.lastEventAge = 0, t.staleShown = !1, e && e.instance && (t.instance = String(e.instance)), a.id && (t.currentSession = String(a.id)), a.title && ft(a.title), (a.model || a.preset || a.permission) && (t.meta = {
      preset: a.preset || "",
      permission: a.permission || "",
      model: a.model || null
    }, qt()), H(!0), window.setTimeout(() => {
      D || ba();
    }, 80), t.status !== "ok" && G("ok", "已连接"), t.currentSession && o.length > 0 && (it(), L.put(t.currentSession, o).catch(() => {
    }));
  }
  function pa() {
    return c.timeline().filter((e) => e.kind === "message" && e.message && e.message.who === "me").length;
  }
  function Ee(e) {
    let a = -1;
    for (const o of e)
      if (o.kind === "message" && o.message && o.message.who === "me") {
        const r = Number(o.message.seq);
        Number.isFinite(r) && (a = Math.max(a, r));
      }
    return a;
  }
  function ha(e = !1) {
    const a = e ? -1 : Ee(c.timeline());
    let o = !1;
    for (const r of c.cards.values()) {
      if (r.kind !== "tool" || r.status !== "running") continue;
      const l = Number(r.seq);
      !e && Number.isFinite(l) && l <= a || (r.status = "ok", o = !0);
    }
    return o;
  }
  function Ie(e = !1, a = !1) {
    const o = t.running || t.waiting || t.busy || !!t.currentTool || !!t.lastTool;
    t.running = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.waiting = !1, t.busy = !1, t.waitingSince = 0, t.currentTool = null, t.lastTool = null, t.lastToolAt = 0, t.stream = null, t.stuckPrompt = !1, a || (t.runActive = !1);
    const r = ha(e);
    return o || r;
  }
  function Nn(e) {
    if (!e || typeof e != "object" || !e.type) return;
    if (t.lastEventAt = Date.now(), t.lastProgressAt = Date.now(), t.notRunningSince = 0, t.stuckPrompt && (t.stuckPrompt = !1), e.type === "projection") {
      const r = e.payload && e.payload.values;
      t.projections = r && typeof r == "object" ? r : {}, pe();
      return;
    }
    if (e.type === "message.assistant.delta") {
      const r = e.payload || {};
      r.ended ? t.stream = null : (t.runActive = !0, t.stream = {
        text: String(r.text || ""),
        reasoning: String(r.reasoning || ""),
        turn: r.turn,
        step: r.step
      }), pe();
      return;
    }
    if (e.type === "session.meta") {
      const r = e.payload && e.payload.session || {};
      if (r.running !== void 0 && (t.running = !!r.running, r.running && (t.awaitingReply = !0)), e.payload && e.payload.instance) {
        const l = String(e.payload.instance);
        if (t.instance && l !== t.instance) {
          t.instance = l, yt();
          return;
        }
        t.instance = l;
      }
      r.title && ft(r.title), pe();
      return;
    }
    (e.type === "message.assistant" || e.type === "message.error" || e.type === "turn.end") && (t.stream = null);
    let a = c.upsertEvent(e);
    if (e.type === "turn.start" || e.type === "message.user")
      e.type === "turn.start" && (t.running = !0), t.awaitingReply = !0, t.runActive = !0, t.stopped = !1, a = !0;
    else if (e.type === "turn.end")
      Ie(), a = !0;
    else if (e.type === "message.assistant")
      t.lastReplyAt = Date.now(), t.runActive = !1, t.waiting = !1, t.busy = !1;
    else if (e.type === "message.error")
      t.awaitingReply = !1, t.runActive = !1;
    else if (e.type === "input.result")
      t.currentTool && t.currentTool.name === "ask_user_question" && (t.currentTool = null, t.lastTool = null, t.lastToolAt = 0, a = !0);
    else if (e.type === "tool.start") {
      t.runActive = !0;
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
    t.currentSession && e.id && $n(t.currentSession, e), pe(o);
  }
  function ut() {
    if (Ct) {
      try {
        Ct.close();
      } catch {
      }
      Ct = null;
    }
    window.clearTimeout(ia), window.clearInterval(Se), Se = 0, Bt = 0, t.stream = null;
  }
  function fa() {
    D || (t.liveDown = !0, t.runActive = !1, G("bad", "连接中断，正在重连"), H(), ut(), ia = window.setTimeout(() => {
      !D && at === "sse" && ga();
    }, 1500));
  }
  function ga() {
    if (ut(), typeof EventSource != "function" || !t.url) {
      Ne();
      return;
    }
    const e = new EventSource(w.eventsUrl(c.lastSeq, t.currentSession));
    Ct = e, Bt = Date.now();
    let a = !1;
    Se = window.setInterval(() => {
      D || !Ct || document.hidden || !ca || Date.now() - Bt > I && fa();
    }, j), e.onopen = () => {
      if (D) return;
      Bt = Date.now();
      const o = t.liveDown;
      t.liveDown = !1, o && (G("ok", "已连接"), H());
    }, e.onmessage = (o) => {
      if (!D) {
        a = !0, Bt = Date.now(), t.liveDown = !1;
        try {
          const r = JSON.parse(o.data);
          r && r.type === "heartbeat" && (ca = !0), Nn(r);
        } catch {
        }
      }
    }, e.onerror = () => {
      if (!D) {
        if (!a) {
          Ne();
          return;
        }
        fa();
      }
    };
  }
  function Ne() {
    if (ut(), t.liveDown = !1, at === "legacy") {
      jt();
      return;
    }
    at = "legacy", jt(), Dt();
  }
  async function yt() {
    if (!(D || !t.url) && at !== "legacy")
      try {
        const e = await w.snapshot(t.currentSession || "", { turns: _ });
        if (D) return;
        at = "sse", Me(), In(e), ga();
      } catch {
        Ne();
      }
  }
  async function Ln() {
    if (D || !t.url || !t.currentSession || t.loadingOlder || !t.turnHasMore || !t.oldestSeq) return;
    const e = m - pa();
    if (e <= 0) {
      t.turnHasMore = !1, t.historyLimitReached = !0, H();
      return;
    }
    const a = n.list, o = a ? a.scrollTop : 0, r = a ? a.scrollHeight : 0;
    t.loadingOlder = !0, ma();
    try {
      const l = await w.snapshot(t.currentSession, {
        turns: Math.min($, e),
        before: t.oldestSeq
      }), u = Array.isArray(l && l.events) ? l.events : [];
      for (const E of u) c.upsertEvent(E);
      t.oldestSeq = Number(l && l.oldestSeq) || t.oldestSeq;
      const b = pa() >= m;
      t.turnHasMore = !!(l && l.hasMore) && !b, t.historyLimitReached = b && !!(l && l.hasMore), H(), a && (a.scrollTop = o + Math.max(0, a.scrollHeight - r));
    } catch (l) {
      P("加载更早失败：" + (l && l.message || "网络错误"), "error");
    } finally {
      t.loadingOlder = !1, ma();
    }
  }
  function ma() {
    n.loadSpinner && (n.loadSpinner.hidden = !(t.loadingOlder && t.turnHasMore));
  }
  function ba() {
    !t.turnHasMore || t.loadingOlder || !n.list || n.list.scrollTop > x || Ln();
  }
  function Pn() {
    const e = c.timeline(), a = Ee(e);
    for (const o of e) {
      const r = Number(o.seq);
      if (!(Number.isFinite(r) && r <= a) && (o.kind === "approval" && !o.decision || o.kind === "input" && o.state === "open"))
        return !0;
    }
    return !1;
  }
  function Le() {
    const e = Ee(c.timeline());
    for (const a of c.cards.values()) {
      if (a.kind !== "tool" || a.status !== "running") continue;
      const o = Number(a.seq);
      if (!Number.isFinite(o) || o > e) return !0;
    }
    return !1;
  }
  async function xa(e) {
    if (t.stuckBusy) return;
    t.stuckBusy = !0, t.stuckPrompt = !1, H();
    let a = !1;
    try {
      await w.stop(), a = !0;
    } catch (o) {
      t.stuckBusy = !1, t.lastProgressAt = Date.now(), H(), P("中断失败：" + (o && o.message || "网络错误"), "error");
      return;
    }
    if (a) {
      t.stopped = !0, t.awaitingReply = !0;
      try {
        await w.send({ text: A, images: [], files: [] }), P(e ? "长时间无响应，已中断并说明" : "已中断，已让 agent 换方式");
      } catch {
        t.awaitingReply = !1, P("已中断，但说明没发出去");
      }
    }
    t.stuckBusy = !1, t.lastProgressAt = Date.now(), H();
  }
  async function zn() {
    if (!(D || !t.url || document.hidden) && !(Date.now() - (Number(t.lastProgressAt) || 0) < 2e3))
      try {
        const e = await w.health();
        if (typeof e.running != "boolean") return;
        if (!e.running) {
          t.running = !1, t.awaitingReply && (t.notRunningSince || (t.notRunningSince = Date.now()), !t.currentTool && !Le() && Date.now() - t.notRunningSince >= z ? Ie(!0) : H());
          return;
        }
        t.notRunningSince = 0, e.tool && e.tool.name && t.currentTool && e.tool.done && t.currentTool.name === String(e.tool.name) && !t.currentTool.done && (t.currentTool = { ...t.currentTool, done: !0 }, H()), t.awaitingReply || (t.awaitingReply = !0, H());
      } catch {
      }
  }
  function Cn() {
    if (D || t.stuckBusy) return;
    if (!t.running) {
      t.stuckPrompt && (t.stuckPrompt = !1, H());
      return;
    }
    if (Pn()) {
      t.stuckPrompt && (t.stuckPrompt = !1, H());
      return;
    }
    const e = Date.now() - (Number(t.lastProgressAt) || Date.now()), a = Le() ? 1 / 0 : S;
    if (e >= a) {
      xa(!0);
      return;
    }
    e >= v && !t.stuckPrompt && (t.stuckPrompt = !0, H());
  }
  async function Pe(e, a) {
    const o = String(e || "").trim(), r = t.pending || [];
    if (!a && r.some((k) => k.status === "uploading")) {
      P("图片/文件还在上传，稍等一下", "error");
      return;
    }
    if (!a && r.some((k) => k.status === "error")) {
      P("有附件上传失败，先移除再发", "error");
      return;
    }
    if (!o && r.length === 0) return;
    if (!t.url) {
      P("先在 ⚙ 里填电脑地址", "error"), Mt();
      return;
    }
    if (t.waiting && !a) return;
    t.lastProgressAt = Date.now(), t.stopped = !1, t.stuckPrompt = !1;
    const l = r.filter((k) => k.kind === "image" && k.ref).map((k) => k.ref), u = r.filter((k) => k.kind === "file" && k.ref).map((k) => k.ref), b = t.messages.reduce((k, R) => {
      const O = R && R.seq;
      return Number.isFinite(Number(O)) ? Math.max(k, Number(O)) : k;
    }, -1), E = {
      who: "me",
      text: o,
      at: Date.now(),
      // 真实 seq 还没回来之前，先排在已有消息之后、下一条回复之前
      seq: b + 0.5,
      local: !0,
      images: r.filter((k) => k.kind === "image").map((k) => ({
        id: "local:" + k.key,
        src: k.preview
      })),
      files: r.filter((k) => k.kind === "file").map((k) => ({
        id: "local:" + k.key,
        name: k.name,
        size: k.size
      }))
    };
    c.messages.push(E), t.draft = "", n.input && (n.input.value = ""), Ve(), t.waiting = !0, t.waitingSince = Date.now(), t.busy = !0, t.awaitingReply = !0, t.runActive = !0, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, H(!0), at !== "sse" && jt();
    const B = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : "local-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    let p = null;
    for (let k = 0; k < 3; k += 1)
      try {
        await w.send({ text: o, images: l, files: u, clientMessageId: B }), p = null, t.pending = [], ct(), at !== "sse" ? window.setTimeout(ua, 260) : window.setTimeout(async () => {
          if (!D)
            try {
              const R = await w.health();
              R && R.title && ft(R.title);
            } catch {
            }
        }, 700), G("ok", "已连接");
        return;
      } catch (R) {
        p = R, k < 2 && await ar(700 * (k + 1));
      }
    t.waiting = !1, t.busy = !1, t.awaitingReply = !1, t.runActive = !1;
    const q = c.messages.indexOf(E);
    q >= 0 && c.messages.splice(q, 1), c.messages.push({
      who: "error",
      text: "发送失败：" + (p && p.message || "未知错误"),
      at: Date.now(),
      retryText: o
    }), G("bad", "发送失败"), H(!0);
  }
  function ct() {
    const e = t.pending || [];
    n.attach && (n.attach.hidden = e.length === 0, n.attach.innerHTML = e.map((a) => {
      const o = a.kind === "image" && a.preview ? `<img class="chat-chip-thumb" src="${N(a.preview)}" alt="" />` : '<span class="chat-chip-icon">📎</span>', r = a.status === "uploading" ? '<span class="chat-chip-state">上传中</span>' : a.status === "error" ? '<span class="chat-chip-state is-bad">失败</span>' : "";
      return `<div class="chat-chip" data-key="${N(a.key)}"><button type="button" class="chat-chip-x" data-action="remove-attach" data-key="${N(a.key)}" aria-label="移除">×</button>${o}${r}</div>`;
    }).join(""));
  }
  function Bn(e) {
    t.pending = (t.pending || []).filter((a) => a.key !== e), ct();
  }
  function Rn(e) {
    return new Promise((a, o) => {
      const r = new FileReader();
      r.onload = () => {
        const l = String(r.result || ""), u = l.indexOf(",");
        a(u >= 0 ? l.slice(u + 1) : l);
      }, r.onerror = () => o(r.error || new Error("读不到文件")), r.readAsDataURL(e);
    });
  }
  async function Dn(e) {
    try {
      const a = e.kind === "image" ? { data: e.data, mediaType: e.mediaType, name: e.name } : { data: e.data, name: e.name }, o = e.kind === "image" ? await w.uploadImage(a) : await w.uploadFile(a);
      if (!o || !o.attachment) throw new Error("上传结果不对");
      e.ref = o.attachment, e.status = "ready";
    } catch (a) {
      e.status = "error", e.error = a && a.message || "上传失败";
    }
    ct();
  }
  async function jn(e) {
    const a = Array.from(e || []);
    if (a.length !== 0) {
      if (!t.url) {
        P("先在 ⚙ 里填电脑地址", "error"), Mt();
        return;
      }
      for (const o of a) {
        const r = String(o.type || "").startsWith("image/");
        if ((t.pending || []).filter((b) => b.kind === (r ? "image" : "file")).length >= 4) {
          P(r ? "一条消息最多 4 张图" : "一条消息最多 4 个文件", "error");
          continue;
        }
        if (o.size > 30 * 1024 * 1024) {
          P((o.name || "文件") + " 超过 30MB", "error");
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
        t.pending.push(u), ct();
        try {
          u.data = await Rn(o);
        } catch {
          u.status = "error", u.error = "读不到这个文件", ct();
          continue;
        }
        r && (u.preview = "data:" + u.mediaType + ";base64," + u.data), ct(), Dn(u);
      }
    }
  }
  function va(e, a) {
    return e ? `<img src="${e}" alt="" />` : a;
  }
  function ze() {
    if (!d) return;
    const e = d.querySelector('[data-role="avatar-me-preview"]'), a = d.querySelector('[data-role="avatar-ai-preview"]');
    e && (e.innerHTML = va(t.avatarMe, "🙂")), a && (a.innerHTML = va(t.avatarAi, "🤖"));
  }
  function Hn(e) {
    return new Promise((a, o) => {
      if (!e || !String(e.type || "").startsWith("image/")) {
        o(new Error("请选择图片"));
        return;
      }
      if (e.size > 8 * 1024 * 1024) {
        o(new Error("图片不能超过 8MB"));
        return;
      }
      const r = new FileReader();
      r.onerror = () => o(new Error("读不到这张图片")), r.onload = () => {
        const l = new Image();
        l.onerror = () => o(new Error("图片格式不支持")), l.onload = () => {
          const b = document.createElement("canvas");
          b.width = 256, b.height = 256;
          const E = b.getContext("2d");
          if (!E) {
            o(new Error("图片处理失败"));
            return;
          }
          const B = Math.min(l.width || 256, l.height || 256), p = Math.max(0, ((l.width || B) - B) / 2), q = Math.max(0, ((l.height || B) - B) / 2);
          E.drawImage(l, p, q, B, B, 0, 0, 256, 256), a(b.toDataURL("image/jpeg", 0.86));
        }, l.src = String(r.result || "");
      }, r.readAsDataURL(e);
    });
  }
  async function ya(e, a) {
    try {
      const o = await Hn(a);
      e === "ai" ? t.avatarAi = o : t.avatarMe = o, At(), ze(), H(), P("头像已更新");
    } catch (o) {
      P(o && o.message || "头像更新失败", "error");
    }
  }
  function wa(e) {
    const a = e.target;
    if (a instanceof HTMLInputElement && a.dataset.role === "avatar-me") {
      const r = a.files && a.files[0];
      a.value = "", r && ya("me", r);
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "avatar-ai") {
      const r = a.files && a.files[0];
      a.value = "", r && ya("ai", r);
      return;
    }
    if (a === n.relayToggle && a instanceof HTMLInputElement) {
      const r = !!a.checked;
      if (!i.watch || typeof i.watch.start != "function") {
        a.checked = !r, P("当前壳不支持这个开关", "error");
        return;
      }
      t.notify = r, At(), Ot(), Ca();
      return;
    }
    if (!(a instanceof HTMLInputElement) || a !== n.pick) return;
    const o = a.files ? Array.from(a.files) : [];
    a.value = "", jn(o);
  }
  async function Un() {
    const e = t.url;
    if (t.waiting = !1, t.busy = !1, H(), !!e)
      try {
        await w.stop(), t.stopped = !0, Ie(!0), H(), P("已停止执行");
      } catch (a) {
        P("停止失败：" + (a && a.message || "网络错误"), "error");
      }
  }
  async function Zt() {
    if (!t.url) {
      Mt();
      return;
    }
    t.sessionsOpen = !0, t.sessionQuery = "", st && (window.clearTimeout(st), st = 0), ee("list"), n.sheetBody.innerHTML = '<div class="chat-sheet-tip">正在读取历史对话…</div>', n.scrim.hidden = !1, Re(!0);
    try {
      const e = await w.sessions(), a = Array.isArray(e.sessions) ? e.sessions : [], o = e.current || t.currentSession || "";
      o && (t.currentSession = String(o)), t.archivedList = Array.isArray(e.archived) ? e.archived : [], t.showArchived = !1, t.sessionsList = a.filter((r) => !r.blank || r.id === o), n.sessionSearch && (n.sessionSearch.value = "", n.sessionSearch.hidden = !0), n.sheetBody.innerHTML = '<div data-role="session-list"></div>', te();
    } catch (e) {
      t.sessionsList = [], n.sheetBody.innerHTML = `<div class="chat-sheet-tip">读取失败：${C(e && e.message || "未知错误")}</div>`;
    }
  }
  function te() {
    const e = n.sheetBody && n.sheetBody.querySelector('[data-role="session-list"]');
    if (!e) return;
    const a = String(t.sessionQuery || "").trim().toLowerCase(), o = (t.sessionsList || []).filter((p) => a ? String(p.title || "").toLowerCase().includes(a) || String(p.id || "").toLowerCase().includes(a) : !0), r = t.currentSession || "", l = o.slice(0, 80).map((p) => wr(p, r)).join(""), u = `<div class="chat-sheet-tip">${a ? "没有匹配的对话" : "还没有历史对话"}</div>`, b = (t.archivedList || []).filter((p) => a ? String(p.title || "").toLowerCase().includes(a) || String(p.id || "").toLowerCase().includes(a) : !0), E = `<button type="button" class="chat-archived-toggle" data-action="toggle-archived">${t.showArchived ? "收起已归档" : "已归档 " + b.length}</button>`;
    let B = "";
    t.showArchived && (B = b.length ? b.slice(0, 80).map(
      (p) => `<div class="chat-session-row is-archived"><button type="button" class="chat-session" data-action="restore-session" data-session="${N(p.id || "")}">
                <span class="chat-session-label">${C(p.title || "未命名对话")}</span>
                <span class="chat-session-time">已归档 · 点按恢复</span>
              </button></div>`
    ).join("") : '<div class="chat-sheet-tip">没有已归档的对话</div>'), e.innerHTML = (o.length ? l : u) + E + B;
  }
  function _n(e) {
    return e ? e.eventId ? String(e.eventId) : e.id ? "id" + e.id : Number.isFinite(Number(e.seq)) ? "s" + e.seq : "" : "";
  }
  function On() {
    t.searchQuery = "", n.searchScrim && (n.searchScrim.hidden = !1), n.searchInput && (n.searchInput.value = "", n.searchInput.focus()), ka();
  }
  function Ce() {
    n.searchScrim && (n.searchScrim.hidden = !0);
  }
  function ka() {
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
      const u = Math.max(0, l - 16), b = l + e.length + 26, E = (u > 0 ? "…" : "") + r.slice(u, b).replace(/\s+/g, " ") + (b < r.length ? "…" : "");
      if (a.push({ key: _n(o), who: o.who, snippet: E, at: o.at }), a.length >= 80) break;
    }
    if (a.length === 0) {
      n.searchBody.innerHTML = '<div class="chat-sheet-tip">没有找到包含该关键词的消息</div>';
      return;
    }
    n.searchBody.innerHTML = a.map(
      (o) => `<button type="button" class="chat-search-hit" data-action="search-jump" data-key="${N(o.key)}">
          <span class="chat-search-hit-head">${o.who === "me" ? "我" : o.who === "error" ? "错误" : "助手"} · ${Pt(o.at)}</span>
          <span class="chat-search-hit-text">${C(o.snippet)}</span>
        </button>`
    ).join("");
  }
  function Fn(e) {
    if (Ce(), !e || !n.list) return;
    const a = n.list.querySelector('[data-mid="' + e.replace(/["\\]/g, "\\$&") + '"]');
    if (!a) {
      P("这条消息不在当前窗口里", "error");
      return;
    }
    a.scrollIntoView({ block: "center", behavior: "smooth" });
  }
  function Wn(e, a) {
    t.sessionMenuId = String(e || ""), t.sessionMenuTitle = String(a || ""), n.sessionMenu && (n.sessionMenu.hidden = !1);
  }
  function Ht() {
    n.sessionMenu && (n.sessionMenu.hidden = !0);
  }
  function Kn() {
    t.renameId = t.sessionMenuId, Ht(), n.renameInput && (n.renameInput.value = t.sessionMenuTitle || "", n.renameInput.focus()), n.renameScrim && (n.renameScrim.hidden = !1);
  }
  function Be() {
    n.renameScrim && (n.renameScrim.hidden = !0);
  }
  async function Gn() {
    const e = t.renameId, a = String(n.renameInput && n.renameInput.value || "").trim();
    if (!e || !a) {
      P("标题不能为空", "error");
      return;
    }
    try {
      const o = await w.renameSession(e, a);
      e === t.currentSession && o && o.title && ft(o.title), Be(), P("已重命名"), t.sessionsOpen && await Zt();
    } catch (o) {
      P("重命名失败：" + (o && o.message || "未知错误"), "error");
    }
  }
  async function Vn() {
    const e = t.sessionMenuId;
    if (Ht(), !!e) {
      P("正在分支…");
      try {
        const a = await w.forkSession(e);
        a && a.sessionId ? await Sa(a.sessionId) : P("分支失败", "error");
      } catch (a) {
        P("分支失败：" + (a && a.message || "未知错误"), "error");
      }
    }
  }
  let st = 0;
  function Re(e) {
    if (d) {
      if (e) {
        const a = n.top ? n.top.getBoundingClientRect().height : 0;
        d.style.setProperty("--drawer-top", Math.round(a) + "px");
      }
      d.classList.toggle("is-drawer-open", !!e), n.switchBtn && (n.switchBtn.textContent = e ? "✕" : "☰", n.switchBtn.setAttribute("aria-label", e ? "关闭会话菜单" : "打开会话菜单"));
    }
  }
  function ee(e) {
    t.drawerMode = e === "create" ? "create" : "list", n.drawerList && (n.drawerList.hidden = t.drawerMode !== "list"), n.drawerCreate && (n.drawerCreate.hidden = t.drawerMode !== "create");
  }
  function Yn(e, a) {
    t.archiveId = String(e || ""), t.archiveStop = !1, Ht(), n.archiveText && (n.archiveText.textContent = `「${a || "这个会话"}」将从列表移除，可在「已归档」里恢复。`), n.archiveScrim && (n.archiveScrim.hidden = !1);
  }
  function ae() {
    n.archiveScrim && (n.archiveScrim.hidden = !0), t.archiveId = "", t.archiveStop = !1;
  }
  async function Qn() {
    const e = t.archiveId;
    if (e)
      try {
        await w.archiveSession(e, t.archiveStop), ae(), P("已归档"), t.sessionsOpen && await Zt();
      } catch (a) {
        if (a && a.code === "workspace/session-active" && !t.archiveStop) {
          t.archiveStop = !0, n.archiveText && (n.archiveText.textContent = "这个会话还在执行，停止并归档？");
          return;
        }
        P("归档失败：" + (a && a.message || "未知错误"), "error");
      }
  }
  async function Xn(e) {
    if (e)
      try {
        await w.unarchiveSession(e), P("已恢复"), t.sessionsOpen && await Zt();
      } catch (a) {
        P("恢复失败：" + (a && a.message || "未知错误"), "error");
      }
  }
  function wt() {
    t.sessionsOpen = !1, Re(!1), st && window.clearTimeout(st), st = window.setTimeout(() => {
      st = 0, !t.sessionsOpen && n.scrim && (n.scrim.hidden = !0);
    }, 260);
  }
  async function Sa(e) {
    if (wt(), !!e) {
      P("正在打开对话…");
      try {
        const a = await w.target(e);
        it(), ut(), c.clear(), t.booting = !0, t.historyLimitReached = !1, t.stopped = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, t.lastListTop = 0, t.projections = {}, t.hydrated = !1, t.waiting = !1, t.busy = !1, t.pending = [], t.running = !1, t.lastEventAge = 0, t.waitingSince = 0, t.staleShown = !1, ct(), a && a.current && (t.currentSession = String(a.current)), t.currentSession && L.clearOthers(t.currentSession).catch(() => {
        }), ft(a && a.title || ""), t.view = "chat", n.page && (n.page.hidden = !0), H(!0), at === "sse" ? yt() : await Dt(!0), P("已切换对话");
      } catch (a) {
        P("切换失败：" + (a && a.message || "未知错误"), "error");
      }
    }
  }
  function Jn() {
    const e = t.options && Array.isArray(t.options.presets) ? t.options.presets : [];
    return e.length ? e.map((a) => {
      const o = String(a.id), r = Gt[o];
      return {
        value: o,
        // 去掉「模式」后缀，只留「标准 / 创造 / 极简 / 编排」
        name: String(r && r.name || a.name || o).replace(/模式$/, ""),
        description: r && r.description || a.description || ""
      };
    }) : [
      { value: "standard", name: "标准", description: Gt.standard.description },
      { value: "ptc", name: "创造", description: Gt.ptc.description },
      { value: "minimal", name: "极简", description: Gt.minimal.description },
      { value: "cordis", name: "编排", description: Gt.cordis.description }
    ];
  }
  function De() {
    const e = t.options && Array.isArray(t.options.presets) ? t.options.presets : [];
    if (e.some((o) => o && String(o.id) === "standard")) return "standard";
    const a = e.find((o) => o && o.isDefault);
    return a && a.id ? String(a.id) : "standard";
  }
  function je() {
    const e = t.options, a = e && Array.isArray(e.permissions) ? e.permissions : [], o = (l) => a.some((u) => u && String(u.value) === l);
    if (o("workspace-write")) return "workspace-write";
    if (o("read-only")) return "read-only";
    const r = e && e.defaultPermission ? String(e.defaultPermission) : "";
    return r && r !== "danger-full-access" ? r : "workspace-write";
  }
  async function Ta(e) {
    if (t.options) return t.options;
    try {
      const a = await w.options();
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
  function Aa(e, a, o, r) {
    return e.map((l) => `<button type="button" class="chat-opt" data-action="${r}" data-scope="${o}" data-value="${N(l.value)}" data-on="${l.value === a ? "1" : "0"}">${C(l.name)}</button>`).join("");
  }
  function $a(e) {
    const a = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [];
    if (a.length === 0) return "";
    const o = t.formModel || "", r = t.formEffort || "", l = a.map((q) => {
      const k = (q.models || []).map((R) => `<button type="button" class="chat-opt" data-action="pick-model" data-scope="${e}" data-provider="${N(q.id)}" data-value="${N(R.id)}" data-on="${R.id === o ? "1" : "0"}">${C(R.name || R.id)}</button>`).join("");
      return e === "new" ? `<div class="chat-chipgroup">${k}</div>` : `<div class="chat-form-block"><p class="chat-sheet-sub">${C(q.name || q.id)}</p><div class="chat-chipgroup">${k}</div></div>`;
    }).join(""), u = e === "new" ? `<div class="chat-form-block"><p class="chat-sheet-sub">模型</p>${l}</div>` : l, b = _t(t.formProvider, o), E = b && b.model && b.model.reasoning && Array.isArray(b.model.reasoning.efforts) ? b.model.reasoning.efforts : [], B = E.length ? `<div class="chat-form-block"><p class="chat-sheet-sub">推理等级</p><div class="chat-chipgroup">${E.map((q) => `<button type="button" class="chat-opt" data-action="pick-effort" data-scope="${e}" data-value="${N(q.id)}" data-on="${q.id === r ? "1" : "0"}">${C(q.name || q.id)}</button>`).join("")}</div></div>` : "";
    let p = "";
    if (e === "model") {
      const q = (t.options && Array.isArray(t.options.permissions) ? t.options.permissions : []).map((k) => ({
        value: String(k.value),
        name: un[String(k.value)] || k.name || String(k.value)
      }));
      if (q.length > 0) {
        const k = t.sessionPermission || t.meta && t.meta.permission || "";
        p = `<div class="chat-form-block"><p class="chat-sheet-sub">权限</p><div class="chat-chipgroup">${q.map((R) => `<button type="button" class="chat-opt" data-action="pick-permission-current" data-value="${N(R.value)}" data-on="${R.value === k ? "1" : "0"}">${C(R.name)}</button>`).join("")}</div><p class="chat-opt-desc">切换后从下一次操作开始生效；完全权限不再询问。</p></div>`;
      }
    }
    return u + B + p;
  }
  function qa() {
    const e = t.options && t.options.models ? t.options.models.default : null, a = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [], o = a[0] && Array.isArray(a[0].models) ? a[0].models[0] : null, r = e && e.provider ? String(e.provider) : a[0] ? String(a[0].id) : "", l = e && e.model ? String(e.model) : o ? String(o.id) : "", u = _t(r, l), b = e && e.reasoningEffort ? String(e.reasoningEffort) : u && u.model && u.model.reasoning ? String(u.model.reasoning.defaultEffort || "") : "";
    t.formProvider = r, t.formModel = l, t.formEffort = b;
  }
  function Ut() {
    if (!n.newBody) return;
    const e = Jn(), a = e.find((b) => b.value === t.formPreset) || e.find((b) => b.value === De()), o = (t.options && Array.isArray(t.options.permissions) ? t.options.permissions : []).map((b) => ({
      value: String(b.value),
      name: un[String(b.value)] || b.name || String(b.value),
      description: er[String(b.value)] || b.description || ""
    })), r = t.formPermission || je(), l = o.find((b) => b.value === r), u = l && l.description ? l.description : r === "danger-full-access" ? "完全权限：不再询问，直接执行。" : "非完全权限时，需要授权的操作会先弹到手机确认。";
    n.newBody.innerHTML = `
      <div class="chat-form-block">
        <p class="chat-sheet-sub">标题</p>
        <input class="chat-sheet-search" data-role="new-title" value="${N(t.formTitle || "")}" placeholder="可不填，自动取第一句" autocomplete="off" spellcheck="false" />
      </div>
      <div class="chat-form-block">
        <p class="chat-sheet-sub">模式</p>
        <div class="chat-chipgroup">${Aa(e, a ? a.value : t.formPreset, "new", "pick-preset")}</div>
        <p class="chat-opt-desc">${C(a && a.description || "")}</p>
      </div>
      ${o.length > 0 ? `
      <div class="chat-form-block">
        <p class="chat-sheet-sub">权限</p>
        <div class="chat-chipgroup">${Aa(o, r, "new", "pick-permission")}</div>
        <p class="chat-opt-desc">${C(u)}</p>
      </div>` : ""}
      ${$a("new")}
      <button type="button" class="chat-btn is-primary is-block" data-action="create-session">开始对话</button>
    `;
  }
  function _t(e, a) {
    const o = t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : [];
    for (const r of o)
      if (!(e && r.id !== e)) {
        for (const l of r.models || [])
          if (l.id === a) return { provider: r.id, name: r.name || r.id, model: l };
      }
    return null;
  }
  function Zn(e, a) {
    const o = _t(e, a);
    return o && o.model && o.model.name ? String(o.model.name) : String(a || "");
  }
  function to(e, a, o) {
    const r = _t(e, a), u = (r && r.model && r.model.reasoning && Array.isArray(r.model.reasoning.efforts) ? r.model.reasoning.efforts : []).find((b) => b && b.id === o);
    return u && u.name ? String(u.name) : String(o || "");
  }
  function qt() {
    if (!n.modelChip) return;
    const e = t.meta && t.meta.model;
    if (!e || !e.model) {
      n.modelChip.hidden = !0, n.modelChip.textContent = "";
      return;
    }
    const a = [Zn(e.provider, e.model)];
    e.reasoningEffort && a.push(to(e.provider, e.model, e.reasoningEffort)), n.modelChip.hidden = !1, n.modelChip.textContent = a.join(" · "), Ae();
  }
  function ne() {
    if (!n.modelBody) return;
    if ((t.options && t.options.models && Array.isArray(t.options.models.groups) ? t.options.models.groups : []).length === 0) {
      n.modelBody.innerHTML = '<div class="chat-sheet-tip">读不到模型列表</div>';
      return;
    }
    n.modelBody.innerHTML = $a("model");
  }
  async function eo() {
    if (!t.url) return;
    const e = t.meta && t.meta.model ? t.meta.model : null;
    t.formProvider = e ? e.provider : "", t.formModel = e ? e.model : "", t.formEffort = e ? e.reasoningEffort : "", t.sessionPermission = t.meta && t.meta.permission || t.options && t.options.defaultPermission || "", n.modelScrim && (n.modelScrim.hidden = !1), t.options ? ne() : (n.modelBody && (n.modelBody.innerHTML = '<div class="chat-sheet-tip">正在读取模型…</div>'), Ta().then(() => ne()));
  }
  function oe() {
    n.modelScrim && (n.modelScrim.hidden = !0);
  }
  function ao(e, a, o, r) {
    if (e === "model") {
      t.formProvider = o || t.formProvider, t.formModel = a;
      const l = _t(t.formProvider, a), u = l && l.model && l.model.reasoning && Array.isArray(l.model.reasoning.efforts) ? l.model.reasoning.efforts : [], b = l && l.model && l.model.reasoning && l.model.reasoning.defaultEffort || "";
      t.formEffort = u.some((E) => E.id === t.formEffort) ? t.formEffort : b || (u[0] ? u[0].id : "");
    } else
      t.formEffort = a;
    r === "new" ? Ut() : ne();
  }
  async function no() {
    if (!t.url || !t.formProvider || !t.formModel) return;
    const e = { provider: t.formProvider, model: t.formModel };
    t.formEffort && (e.reasoningEffort = t.formEffort);
    try {
      const a = String(t.sessionPermission || "");
      if (a && (!t.meta || a !== t.meta.permission)) {
        const r = await w.setPermission(a);
        r && r.meta && (t.meta = r.meta);
      }
      const o = await w.selectModel(e);
      o && o.meta && (t.meta = o.meta), qt(), oe(), P("已应用");
    } catch (a) {
      P("应用失败：" + (a && a.message || "未知错误"), "error");
    }
  }
  function oo() {
    if (!t.url) {
      Mt();
      return;
    }
    t.sessionsOpen = !0, st && (window.clearTimeout(st), st = 0), n.scrim && (n.scrim.hidden = !1), Re(!0), ee("create"), t.formPreset = De(), t.formPermission = je(), t.options ? (qa(), Ut()) : (n.newBody && (n.newBody.innerHTML = '<div class="chat-sheet-tip">正在读取可选项…</div>'), Ta().then(() => {
      qa(), Ut();
    }));
  }
  function He() {
    ee("list");
  }
  function ro(e, a, o) {
    a === "new" && (t.formPreset = o, Ut());
  }
  function so() {
    n.confirmScrim && (n.confirmScrim.hidden = !1);
  }
  function re() {
    n.confirmScrim && (n.confirmScrim.hidden = !0);
  }
  function io() {
    (async () => {
      try {
        await $e(!1);
      } catch {
      }
      try {
        i.watch && typeof i.watch.stop == "function" && i.watch.stop(y);
      } catch {
      }
      try {
        i.shell && typeof i.shell.exit == "function" && i.shell.exit();
      } catch {
      }
    })();
  }
  async function co() {
    if (!t.url) {
      Mt();
      return;
    }
    const e = t.formPreset || De(), a = t.formPermission || je(), o = String(t.formTitle || "").trim();
    P("正在新建对话…");
    try {
      const r = await w.createSession({
        preset: e,
        permission: a,
        ...o ? { title: o } : {}
      }), l = r && r.current ? String(r.current) : "";
      if (l && t.formProvider && t.formModel)
        try {
          const u = await w.selectModel({
            sessionId: l,
            provider: t.formProvider,
            model: t.formModel,
            ...t.formEffort ? { reasoningEffort: t.formEffort } : {}
          });
          u && u.meta && (t.meta = u.meta);
        } catch {
        }
      it(), ut(), c.clear(), t.booting = !0, t.historyLimitReached = !1, t.stopped = !1, t.awaitingReply = !1, t.notRunningSince = 0, t.stream = null, t.focusLastAssistant = !1, t.holdAnswer = !1, t.reading = !1, t.pendingPaint = !1, t.lastListTop = 0, t.projections = {}, t.hydrated = !1, t.waiting = !1, t.busy = !1, t.pending = [], t.running = !1, t.lastEventAge = 0, t.waitingSince = 0, t.staleShown = !1, ct(), r && r.current && (t.currentSession = String(r.current)), t.currentSession && L.clearOthers(t.currentSession).catch(() => {
      }), r && r.meta && (t.meta = r.meta, qt()), ft(r && r.title || "新对话"), t.view = "chat", n.page && (n.page.hidden = !0), H(!0), at === "sse" && yt(), n.input && n.input.focus(), wt(), t.formTitle = "", P(r && r.created === !1 ? "已经是新对话" : "新对话已就绪");
    } catch (r) {
      P("新建失败：" + (r && r.message || "未知错误"), "error");
    }
  }
  function Ma() {
    const e = d && d.querySelector('[data-role="mode-group"]');
    if (e)
      for (const a of e.querySelectorAll('[data-action="pick-mode"]'))
        a.dataset.on = a.dataset.value === t.mode ? "1" : "0";
  }
  function Ea() {
    if (!n.notifyMode) return;
    const e = t.notifyMode === "message" ? "message" : "turn";
    for (const a of n.notifyMode.querySelectorAll('[data-action="pick-notify-mode"]'))
      a.dataset.on = a.dataset.value === e ? "1" : "0";
  }
  function Mt() {
    wt(), t.view = "settings", t.testResult = null, t.openAcc = "", Ye(), n.page.hidden = !1, n.inputUrl.value = t.lanUrl || mt, n.inputWan && (n.inputWan.value = t.wanUrl || ""), Ma(), n.inputToken.value = t.token || "", n.lanState && (n.lanState.textContent = "", n.lanState.dataset.tone = ""), n.wanState && (n.wanState.textContent = "", n.wanState.dataset.tone = ""), n.version.textContent = T ? "v" + T + " · 由 DSH 插件托管" : "由 DSH 插件托管", Ea(), ze(), Ba(""), ie(), Ca();
  }
  function Ia() {
    t.view = "chat", n.page.hidden = !0, H();
  }
  async function lo() {
    const e = St(n.inputUrl.value), a = n.inputWan ? St(n.inputWan.value) : "", o = n.inputToken.value.trim(), r = o ? { Authorization: "Bearer " + o } : {}, l = (p, q, k) => {
      p && (p.textContent = q, p.dataset.tone = k || "");
    };
    l(n.lanState, e ? "· 网络测试中" : "· 未填", e ? "busy" : ""), l(n.wanState, a ? "· 网络测试中" : "· 未填", a ? "busy" : "");
    const u = d && d.querySelector('[data-action="test"]');
    u && (u.dataset.busy = "1");
    const b = async (p, q) => {
      if (!p) return { text: "未填", tone: "" };
      const k = Date.now();
      try {
        const R = await da(p + "/health", { headers: r }, q);
        if (!R.ok) throw new Error("HTTP " + R.status);
        const O = await R.json().catch(() => ({})), W = Date.now() - k;
        return {
          text: (O && O.hasKey === !1 ? "可连接（未配 Key）" : "可连接") + " · " + W + "ms",
          tone: "ok"
        };
      } catch {
        return { text: "连不上", tone: "bad" };
      }
    }, [E, B] = await Promise.all([b(e, 4e3), b(a, 6e3)]);
    l(n.lanState, "· " + E.text, E.tone), l(n.wanState, "· " + B.text, B.tone), u && delete u.dataset.busy;
  }
  function uo() {
    return hr({
      appId: y,
      base: t.url || mt,
      token: t.token || "",
      notify: t.notify !== !1,
      mode: t.notifyMode === "message" ? "message" : "turn"
    });
  }
  function Ot() {
    if (!(!i.watch || typeof i.watch.start != "function")) {
      if (t.notify === !1) {
        i.watch.stop(y).catch(() => {
        });
        return;
      }
      i.watch.start(uo()).catch(() => {
      });
    }
  }
  let se = !1, Ue = 0, _e = 0, Na = 0, La = 0, Pa = 0, za = 0;
  async function po(e, a) {
    if (!e) return !1;
    try {
      return (await da(e + "/health", {}, a || 1200)).ok;
    } catch {
      return !1;
    }
  }
  async function pt(e) {
    if (se) return !1;
    se = !0;
    const a = ++Ue;
    window.clearTimeout(_e);
    try {
      const o = t.mode || (t.autoPick ? "auto" : t.pick === "wan" ? "wan" : "lan"), l = (o === "auto" ? t.wanFirst ? [t.wanUrl, t.lanUrl] : [t.lanUrl, t.wanUrl] : [o === "wan" ? t.wanUrl : t.lanUrl]).filter(Boolean);
      if (l.length === 0)
        return G("bad", o === "wan" ? "外部地址未填" : "家里地址未填"), !1;
      const u = t.status === "ok";
      let b = 0;
      u || (b = window.setTimeout(() => {
        t.status !== "ok" && G("busy", "网络连接中…");
      }, 1e3));
      const E = (W) => W === t.lanUrl ? 1600 : 5e3, B = await Promise.all(l.map((W) => po(W, E(W))));
      if (window.clearTimeout(b), a !== Ue) return !1;
      const p = B.findIndex(Boolean), q = p >= 0 ? l[p] : "";
      if (!q) {
        const W = l.length > 1 ? "家里和外部都连不上" : o === "wan" ? "外部连不上" : "家里连不上";
        return G("bad", W), t.wanFirst = !0, _e = window.setTimeout(() => {
          D || pt();
        }, 2e3), !1;
      }
      const k = t.url;
      t.wanFirst = !1;
      const R = q !== t.url;
      t.url = q;
      const O = q === t.lanUrl ? "家里" : "外部";
      return G("ok", "已连接 · " + O), R && k && P("已切换到" + O), (R || e) && (t.hydrated = !1, c.cursor = 0, At(), Ot(), ut(), at === "sse" ? yt() : Dt(!0)), ie(), !0;
    } finally {
      a === Ue && (se = !1);
    }
  }
  async function Ca() {
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
      const a = await i.watch.status(y);
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
  function Ba(e) {
    const a = t.openAcc === e ? "" : e;
    if (t.openAcc = a, n.serverBody && (n.serverBody.hidden = a !== "server"), n.avatarBody && (n.avatarBody.hidden = a !== "avatar"), n.relayBody && (n.relayBody.hidden = a !== "relay"), n.cacheBody && (n.cacheBody.hidden = a !== "cache"), n.resetBody && (n.resetBody.hidden = a !== "reset"), d)
      for (const o of d.querySelectorAll(".chat-acc"))
        o.dataset.open = o.dataset.acc === a ? "1" : "0";
  }
  function ie() {
    if (!n.serverSum) return;
    const e = t.url || mt, a = t.mode || "auto", o = a === "wan" ? "手动外部" : a === "lan" ? "手动家里" : e === t.lanUrl ? "自动·家里" : "自动·外部";
    n.serverSum.textContent = e + " · " + o;
  }
  async function ho() {
    if (!i.watch || typeof i.watch.test != "function") {
      P("当前壳不支持测试提醒", "error");
      return;
    }
    try {
      if (typeof i.watch.ensurePermission == "function" && !await i.watch.ensurePermission()) {
        P("通知权限没开：去系统设置里允许「像素盒子」发通知后再试", "error");
        return;
      }
      await i.watch.test(), P("已发送测试提醒");
    } catch (e) {
      P("发送失败：" + (e && e.message || "未知错误"), "error");
    }
  }
  function fo() {
    if (!n.inputToken.value.trim()) {
      P("访问令牌不能为空，电脑端「设置 → 手机中转」里可以看到", "error");
      return;
    }
    t.lanUrl = St(n.inputUrl.value) || mt, t.wanUrl = n.inputWan ? St(n.inputWan.value) : "", t.autoPick = t.mode === "auto", t.pick = t.mode === "wan" ? "wan" : "lan", t.url = t.mode === "wan" && t.wanUrl || t.lanUrl, t.token = n.inputToken.value.trim(), At(), Ot(), t.hydrated = !1, c.cursor = 0, t.openAcc = "", n.serverBody && (n.serverBody.hidden = !0);
    const e = d && d.querySelector('[data-acc="server"]');
    e && (e.dataset.open = "0"), ie(), P("已保存"), pt(!0);
  }
  async function Ra(e) {
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
  function go(e) {
    if (e) {
      if (i.openExternal && typeof i.openExternal == "function") {
        i.openExternal(e).catch(() => P("打不开链接", "error"));
        return;
      }
      window.open(e, "_blank", "noopener,noreferrer");
    }
  }
  async function mo(e, a) {
    try {
      if (i.download && typeof i.download == "function")
        await i.download(e, a);
      else {
        const o = document.createElement("a");
        o.href = e, o.download = a || "", o.rel = "noopener", document.body.appendChild(o), o.click(), o.remove();
      }
      P("已开始下载" + (a ? "：" + a : ""));
    } catch (o) {
      P("下载失败：" + (o && o.message || "未知错误"), "error");
    }
  }
  function Da(e) {
    return e ? String(e.currentSrc || e.src || e.getAttribute("data-src") || e.getAttribute("data-remote") || "") : "";
  }
  function Et() {
    const e = F, a = e.list[e.index] || "";
    a && (n.viewerImg.src = a), n.viewerImg.style.transform = "translate(" + e.x + "px," + e.y + "px) scale(" + e.scale + ")", n.viewer.classList.toggle("is-zoomed", e.scale > 1);
    const o = e.list.length > 1;
    n.viewerCount && (n.viewerCount.hidden = !o, n.viewerCount.textContent = e.index + 1 + " / " + e.list.length), n.viewerPrev && (n.viewerPrev.hidden = !o), n.viewerNext && (n.viewerNext.hidden = !o);
  }
  function bo(e, a) {
    if (!e) return;
    const o = a && a.closest(".chat-turn") || a && a.closest(".chat-tool") || a && a.closest(".chat-card") || n.list, r = o ? Array.from(o.querySelectorAll("img.chat-image")) : [], l = [];
    for (const b of r) {
      const E = Da(b);
      E && !l.includes(E) && l.push(E);
    }
    l.length === 0 && l.push(e);
    const u = Math.max(0, l.indexOf(e));
    F = { list: l, index: u >= 0 ? u : 0, scale: 1, x: 0, y: 0 }, ot = !1, n.viewer.hidden = !1, Et();
  }
  function ce() {
    n.viewer.hidden = !0, n.viewerImg.removeAttribute("src"), n.viewerImg.style.transform = "", F = { list: [], index: 0, scale: 1, x: 0, y: 0 }, ot = !1, nt.clear(), xt = null, vt = 0, window.clearTimeout(dt), dt = 0, n.viewer && n.viewer.classList.remove("is-zoomed");
  }
  function Oe(e) {
    const a = F.list.length;
    a < 2 || (F.index = (F.index + e + a) % a, F.scale = 1, F.x = 0, F.y = 0, Et());
  }
  function xo() {
    F.scale > 1 ? (F.scale = 1, F.x = 0, F.y = 0) : F.scale = 2, Et();
  }
  function vo(e) {
    if (!(!n.viewer || n.viewer.hidden) && !(e.target instanceof Element && e.target.closest("[data-action]"))) {
      if (nt.set(e.pointerId, { x: e.clientX, y: e.clientY }), nt.size === 2) {
        const [a, o] = [...nt.values()];
        xt = {
          distance: Math.hypot(a.x - o.x, a.y - o.y) || 1,
          scale: F.scale
        };
        return;
      }
      rt = {
        x: e.clientX,
        y: e.clientY,
        at: Date.now(),
        moved: !1,
        panX: F.x,
        panY: F.y
      }, ot = !1;
    }
  }
  function yo(e) {
    if (!nt.has(e.pointerId)) return;
    if (nt.set(e.pointerId, { x: e.clientX, y: e.clientY }), xt && nt.size === 2) {
      const [r, l] = [...nt.values()], u = Math.hypot(r.x - l.x, r.y - l.y) || 1;
      F.scale = Math.min(4, Math.max(1, xt.scale * u / xt.distance)), Et(), ot = !0;
      return;
    }
    if (!rt) return;
    const a = e.clientX - rt.x, o = e.clientY - rt.y;
    Math.abs(a) + Math.abs(o) > 4 && (rt.moved = !0), F.scale > 1 && (F.x = rt.panX + a, F.y = rt.panY + o, Et(), ot = !0);
  }
  function ja(e) {
    if (nt.has(e.pointerId) && nt.delete(e.pointerId), xt && nt.size < 2) {
      xt = null, F.scale < 1.05 && (F.scale = 1, F.x = 0, F.y = 0), Et(), ot = !0, rt = null;
      return;
    }
    const a = rt;
    if (rt = null, !a) return;
    const o = e.clientX - a.x, r = e.clientY - a.y;
    if (a.moved) {
      if (F.scale <= 1 && Math.abs(o) > 48 && Math.abs(o) > Math.abs(r)) {
        Oe(o < 0 ? 1 : -1), ot = !0, vt = 0;
        return;
      }
      if (F.scale <= 1 && r > 80 && Math.abs(r) > Math.abs(o)) {
        ce(), ot = !0, vt = 0;
        return;
      }
      vt = 0;
      return;
    }
    const l = Date.now();
    if (l - vt < 300) {
      vt = 0, window.clearTimeout(dt), dt = 0, xo(), ot = !0;
      return;
    }
    vt = l, window.clearTimeout(dt), dt = window.setTimeout(() => {
      dt = 0, ce();
    }, 300);
  }
  function P(e, a) {
    n.toast && (n.toast.textContent = e, n.toast.style.background = a === "error" ? "rgba(150, 62, 50, 0.92)" : "rgba(30, 40, 48, 0.88)", n.toast.classList.add("is-on"), window.clearTimeout(X), X = window.setTimeout(() => {
      n.toast.classList.remove("is-on");
    }, 2200));
  }
  const le = /* @__PURE__ */ new Map();
  function wo(e, a, o) {
    const r = document.createElement("button");
    r.type = "button", r.className = "chat-image-fallback", r.dataset.src = a, r.textContent = o, e.replaceWith(r);
  }
  function de() {
    n.list && (n.list.querySelectorAll("img.chat-image[data-src]").forEach((e) => {
      if (e.dataset.bound) return;
      e.dataset.bound = "1";
      const a = e.getAttribute("data-src");
      if (!a) return;
      const o = le.get(a);
      if (o) {
        e.src = o;
        return;
      }
      fetch(a).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.blob();
      }).then((r) => {
        const l = URL.createObjectURL(r);
        le.set(a, l), e.src = l;
      }).catch((r) => {
        if (!e.dataset.retried) {
          e.dataset.retried = "1", e.dataset.bound = "", setTimeout(de, 900);
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
      const o = le.get(a);
      if (o) {
        e.src = o;
        return;
      }
      fetch(a, { credentials: "omit", referrerPolicy: "no-referrer" }).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.blob();
      }).then((r) => {
        const l = URL.createObjectURL(r);
        le.set(a, l), e.src = l;
      }).catch(() => {
        if (!e.dataset.retried) {
          e.dataset.retried = "1", e.dataset.bound = "", setTimeout(de, 900);
          return;
        }
        wo(e, a, "外链图片打不开 · 点按重试");
      });
    }));
  }
  function Fe() {
    if (!n.list) return !0;
    const e = n.list;
    return e.scrollHeight - e.scrollTop - e.clientHeight < 72;
  }
  function We() {
    if (!n.jump || !n.list) return;
    const e = n.list.scrollTop, a = Fe(), o = e < t.lastListTop - 2;
    t.lastListTop = e;
    const r = Date.now() - t.lastUserScroll < 800;
    o && r ? (t.reading = !0, t.holdAnswer = !1) : a && (t.reading = !1, t.holdAnswer = !1), n.jump.hidden = a, a && !t.reading && t.pendingPaint && (t.pendingPaint = !1, H(!0));
  }
  function Ha(e) {
    return e.kind === "deliverable" ? $r(
      e,
      (a, o, r) => w.presentedFileUrl(a, o, r, t.currentSession)
    ) : e.kind === "approval" ? qr(e) : e.kind === "input" ? Er(e, Yt.get(String(e.callId)) || {}, Qt.has(String(e.callId))) : "";
  }
  function ko() {
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
  function So(e) {
    let a = -1;
    for (let u = 0; u < e.length; u += 1) {
      const b = e[u];
      b.kind === "message" && b.message && b.message.who === "me" && (a = u);
    }
    if (a < 0) return null;
    let o = !1, r = !1, l = !1;
    for (let u = a + 1; u < e.length; u += 1) {
      const b = e[u];
      b.kind === "tool" && (o = !0), b.kind === "message" && b.message && (b.message.who === "ai" && (r = !0), b.message.who === "error" && (l = !0));
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
  function To(e, a) {
    if (t.booting && e.length === 0 && !a.streaming && !a.typing)
      return [{ key: "x:skeleton", html: ko() }];
    const o = [];
    let r = [], l = [], u = [];
    const b = (M, V, J, Y) => {
      J && M.push({ key: V, html: J, ...Y || {} });
    };
    let E = !1, B = !1, p = 0, q = -1;
    for (let M = 0; M < e.length; M += 1)
      e[M].kind === "message" && e[M].message && e[M].message.who === "me" && (q = M);
    const k = Math.max(1, e.filter((M) => M.kind === "message" && M.message && M.message.who === "me").length);
    let R = 0, O = 0;
    const W = () => {
      if (r.length === 0 && R === 0) return;
      const M = t.runActive || t.awaitingReply || t.running || O > 0, V = B && !E, J = p >= k - 2 && !(t.stopped && B) && !(V && !M), Y = r[0] ? "group-" + r[0].id : "group-turn-" + p;
      J && b(
        u,
        "g:" + p,
        Ar(r, Vt.has(Y), null, Jt, {
          total: R,
          running: O,
          activeId: t.toolActiveId
        }),
        { className: "chat-tool-footer-block" }
      ), r = [], R = 0, O = 0;
    }, Z = () => {
      W();
      let M = u.find((Y) => Y.key === "g:" + p);
      const V = [...l].reverse().find((Y) => Y.assistant || Y.key === "x:streaming" || Y.key === "x:typing"), J = E || !!l.some((Y) => Y.key === "x:streaming" || Y.key === "x:typing");
      B && !t.stopped && t.awaitingReply && J && V && (M ? M.className = "chat-tool-footer-block" : (M = {
        key: "g:" + p,
        html: Tr(),
        className: "chat-tool-footer-block"
      }, u.push(M))), M && (u = u.filter((Y) => Y !== M), u.unshift(M)), o.push(...l, ...u), l = [], u = [], E = !1, B = !1, p += 1;
    };
    return e.forEach((M, V) => {
      if (M.kind === "message" && M.message.who === "me") {
        Z(), B = V === q;
        const J = M.message.id || M.message.eventId || M.message.seq || `at-${M.message.at}-${V}`;
        b(o, "m:" + J, xn(M.message, Jt, { me: t.avatarMe, ai: t.avatarAi }), {
          mine: !0,
          mineText: String(M.message.text || "")
        });
        return;
      }
      if (M.kind === "tool") {
        if (R += 1, (M.status === "running" || !M.status && M.done !== !0) && (O += 1), M.status === "ok" || M.status === "failed") {
          r.push(M);
          return;
        }
        return;
      }
      if (M.kind === "deliverable") {
        b(u, M.kind + ":" + (M.id || V), Ha(M));
        return;
      }
      if (M.kind === "message") {
        const J = M.message.id || M.message.eventId || M.message.seq || `at-${M.message.at}-${V}`;
        M.message.who === "ai" && (E = !0), b(l, "m:" + J, xn(M.message, Jt, { me: t.avatarMe, ai: t.avatarAi }), {
          assistant: M.message.who === "ai",
          assistantText: M.message.who === "ai" ? String(M.message.text || "") : ""
        });
      } else
        b(l, M.kind + ":" + (M.id || V), Ha(M));
    }), a.execution && l.push({ key: "x:exec", html: a.execution }), Z(), b(o, "x:tip", a.tip), b(o, "x:projections", a.projections), t.stuckPrompt && b(
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
      html: `<div class="chat-history-limit">只显示最近 ${m} 轮，更早记录请在电脑端查看</div>`
    }), a.localNotice && b(
      o,
      "x:local-notice",
      `<div class="chat-local-notice is-${a.localNotice.kind}" role="status">
          <div class="chat-local-notice-head"><span aria-hidden="true">⚠</span><b>${a.localNotice.title}</b></div>
          <p>${a.localNotice.text}</p>
        </div>`
    ), o;
  }
  function Ua() {
    if (!d) return;
    const e = d.querySelector('[data-role="tool-sheet"]'), a = d.querySelector('[data-role="tool-sheet-body"]');
    if (!e || !a) return;
    const o = t.toolDetailId ? c.cards.get(t.toolDetailId) : null;
    if (!o) {
      ue();
      return;
    }
    a.innerHTML = Sr(o, Jt), e.hidden = !1, de();
  }
  function Ao() {
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
  function $o() {
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
  function qo(e) {
    t.toolDetailId = String(e || ""), t.toolActiveId = t.toolDetailId, Ua(), Ao(), $o();
  }
  function ue() {
    if (t.toolDetailId = "", !d) return;
    const e = d.querySelector('[data-role="tool-sheet"]');
    e && (e.hidden = !0);
  }
  function Mo(e) {
    const a = n.list, o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const u of Array.from(a.children))
      u.dataset && u.dataset.block ? o.set(u.dataset.block, u) : u.remove();
    let l = a.firstChild;
    for (const u of e) {
      const b = "chat-block" + (u.className ? " " + u.className : "");
      let E = o.get(u.key);
      if (!E)
        E = document.createElement("div"), E.className = b, E.dataset.block = u.key, E.innerHTML = u.html, E.__html = u.html;
      else if (E.className !== b && (E.className = b), E.__html !== u.html) {
        const B = E.querySelector(".chat-tool-group-body"), p = B ? {
          top: B.scrollTop,
          atBottom: B.scrollHeight - B.scrollTop - B.clientHeight < 24
        } : null;
        if (E.innerHTML = u.html, E.__html = u.html, p) {
          const q = E.querySelector(".chat-tool-group-body");
          if (q) {
            const k = () => {
              q.scrollTop = p.atBottom ? q.scrollHeight : p.top;
            };
            k(), window.requestAnimationFrame(k);
          }
        }
      }
      r.set(u.key, E), E === l ? l = l.nextSibling : a.insertBefore(E, l);
    }
    for (; l; ) {
      const u = l.nextSibling;
      l.remove(), l = u;
    }
    return r;
  }
  function Eo() {
    const e = t.projections || {}, a = [], o = Array.isArray(e.todos) ? e.todos : null;
    if (o && o.length > 0) {
      const u = o.filter((E) => E.status === "completed").length, b = o.map((E) => `<li class="chat-todo-item ${E.status === "completed" ? "is-done" : E.status === "in_progress" ? "is-active" : ""}"><span class="chat-todo-mark" aria-hidden="true"></span><span>${C(E.content || "")}</span></li>`).join("");
      a.push(
        `<div class="chat-card chat-todo"><div class="chat-card-head"><span class="chat-card-icon" aria-hidden="true">☑</span><span class="chat-card-title">待办</span><span class="chat-card-badge">${u}/${o.length}</span></div><ul class="chat-todo-list">${b}</ul></div>`
      );
    }
    const r = e.goal;
    if (r && r.goal && r.goal.objective) {
      const u = String(r.goal.phase || "active"), b = u === "complete" ? "已完成" : u === "paused" ? "已暂停" : u === "blocked" ? "受阻" : "进行中";
      a.push(
        `<div class="chat-card chat-goal"><div class="chat-card-head"><span class="chat-card-icon" aria-hidden="true">◎</span><span class="chat-card-title">目标</span><span class="chat-card-badge">${C(b)}</span></div><p class="chat-card-text">${C(r.goal.objective)}</p><p class="chat-card-sub">第 ${Number(r.roundsStarted) || 0} / ${Number(r.goal.maxGoalRounds) || 0} 轮</p></div>`
      );
    }
    const l = e.plan;
    return l && l.active && a.push(`<div class="chat-plan-chip">🧭 计划模式${l.pending ? " · 等待批准" : ""}</div>`), a.join("");
  }
  let Ft = 0, ht = [];
  function Ke() {
    const e = [...g];
    for (let a = e.length - 1; a > 0; a -= 1) {
      const o = Math.floor(Math.random() * (a + 1));
      [e[a], e[o]] = [e[o], e[a]];
    }
    return [
      { text: e.pop() || "1 + 1 = ?", left: 22 },
      { text: e.pop() || "2 + 2 = ?", left: 22 }
    ];
  }
  function _a() {
    return [ht.slice(0, 1), ht.slice(1, 2)].map(
      (a) => `<div class="chat-math-row">${a.map(
        (o) => `<span class="chat-math-item" style="left:${o.left}px">${C(o.text)}</span>`
      ).join("")}</div>`
    ).join("");
  }
  function Oa() {
    return ht.length || (ht = Ke()), `<div class="chat-math-board">${_a()}</div>`;
  }
  function Io() {
    if (!n.list) return;
    const e = n.list.querySelector(".chat-math-board");
    e && (ht = Ke(), e.innerHTML = _a());
  }
  function No() {
    ht.length || (ht = Ke()), !Ft && (Ft = window.setInterval(Io, h));
  }
  function Fa() {
    Ft && (window.clearInterval(Ft), Ft = 0, ht = []);
  }
  function pe(e = !1) {
    if (t.reading && !e) {
      t.pendingPaint = !0;
      return;
    }
    if (e) {
      H(!0);
      return;
    }
    ve || (ve = window.requestAnimationFrame(() => {
      ve = 0, D || H();
    }));
  }
  function H(e) {
    if (!n.list) return;
    const a = n.list ? n.list.scrollTop : 0, o = n.list ? n.list.scrollHeight : 0, r = Fe(), l = !e && !t.reading && !t.holdAnswer && r, u = c.timeline(), b = [...u].reverse().find((tt) => tt.kind === "tool" && tt.status === "running"), E = t.lastEventAt ? Date.now() - t.lastEventAt : Number(t.lastEventAge) || 0, B = (t.awaitingReply || t.running || b) && E > 3e5;
    t.staleShown = B;
    const p = t.awaitingReply || t.waiting || t.running || !!(t.currentTool && !t.currentTool.done) || !!b, q = !t.currentTool && t.lastTool && Date.now() - (t.lastToolAt || 0) < 1e4 ? { ...t.lastTool, done: !0 } : null, k = p ? b || t.currentTool || q : null, R = k && k.name ? String(k.name) : "", O = p && !R && !B, W = k && (k.summary || k.detail) ? String(k.summary || k.detail) : "", Z = !!(k && k.status !== "running" && k.done), M = B ? "可能已断开" : R ? Z ? "执行完成…" : "执行中…" : "思考中…", V = B ? "" : R ? R + (W ? "：" + W : "") : "", J = O ? Oa() : "", Y = B ? "" : O ? J : `<span class="chat-typing-detail">${C(V)}</span>`, Nt = t.stream && t.stream.text ? String(t.stream.text) : "", Je = t.stream && t.stream.reasoning ? String(t.stream.reasoning) : "", Ze = !!(Je && !Nt && !B), Fo = Ze ? `<span class="chat-typing-head"><span class="chat-typing-text">思考中…</span><span class="chat-typing-dot"></span></span>${Oa()}` : "", Wo = Nt || Je ? `<div class="chat-turn is-ai"><div class="chat-meta">${oa(!1, { me: t.avatarMe, ai: t.avatarAi })}<span class="chat-stamp">${Pt(Date.now())}</span></div><div class="chat-bubble is-ai is-typing is-streaming${Ze ? " is-thinking" : ""}">${Fo}${Nt ? `<div class="chat-stream-text">${wn(Nt)}</div>` : ""}${Nt ? '<span class="chat-typing-dot"></span>' : ""}</div></div>` : "", Ko = p && !Nt && !Je ? `<div class="chat-turn is-ai"><div class="chat-meta">${oa(!1, { me: t.avatarMe, ai: t.avatarAi })}<span class="chat-stamp">${Pt(Date.now())}</span></div><div class="chat-bubble is-ai is-typing${O ? " is-thinking" : ""}${B ? " is-stale" : ""}"><span class="chat-typing-head"><span class="chat-typing-text">${M}</span><span class="chat-typing-dot"></span></span>${Y}</div></div>` : "", rn = p && t.runActive && !t.stopped && !t.liveDown ? Wo || Ko : "";
    O || Ze ? No() : Fa();
    const sn = Eo(), Go = So(u), Vo = !!t.url, Yo = u.length === 0 && !rn && !sn ? `<div class="chat-sys">${Vo ? "说点什么吧，电脑端的回复会同步过来" : "先在 ⚙ 里填电脑地址，例如 http://192.168.2.6:8788"}</div>` : "", cn = To(u, {
      tip: Yo,
      projections: sn,
      execution: rn,
      localNotice: Go
    });
    let fe = "", ge = "";
    const Qo = cn.filter((tt) => {
      if (tt.mine) {
        const kt = tt.mineText || "";
        return kt && kt === ge ? !1 : (ge = kt, fe = "", !0);
      }
      if (!tt.assistant)
        return fe = "", ge = "", !0;
      const gt = tt.assistantText || "";
      return gt && gt === fe ? !1 : (fe = gt, ge = "", !0);
    }), Xo = Mo(Qo);
    let ta = !1;
    if (t.focusLastAssistant) {
      if (!t.reading && r) {
        const tt = [...cn].reverse().find((kt) => kt.assistant), gt = tt ? Xo.get(tt.key) : null;
        if (gt) {
          for (const Zo of lt) window.clearTimeout(Zo);
          lt = [];
          const kt = n.list.getBoundingClientRect(), Jo = gt.getBoundingClientRect();
          n.list.scrollTop = Math.max(0, n.list.scrollTop + Jo.top - kt.top - 8), t.lastListTop = n.list.scrollTop, t.holdAnswer = !Fe(), ta = !0;
        }
      }
      t.focusLastAssistant = !1;
    }
    if (!ta && !r && (n.list.scrollTop = a + Math.max(0, n.list.scrollHeight - o)), (l || e) && !ta) {
      for (const gt of lt) window.clearTimeout(gt);
      lt = [], Wt();
      const tt = () => {
        !t.reading && !t.holdAnswer && Wt();
      };
      requestAnimationFrame(tt), lt.push(window.setTimeout(tt, 260)), lt.push(window.setTimeout(tt, 900));
    }
    de(), Po(), t.toolDetailId && Ua(), Ga(), We();
  }
  function Wa() {
    if (!n.status) return;
    n.status.dataset.status = t.status;
    const e = t.statusText || "连接状态";
    n.status.title = e, n.status.setAttribute("aria-label", e), ie(), Lo();
  }
  function Lo() {
    if (n.net) {
      if (t.status !== "busy" && t.status !== "bad") {
        n.net.hidden = !0, n.net.dataset.tone = "";
        return;
      }
      n.net.hidden = !1, n.net.dataset.tone = t.status === "busy" ? "busy" : "bad", n.netText && (n.netText.textContent = t.status === "busy" ? "网络连接中…" : t.statusText || "连不上，正在重试"), n.netNote && (n.netNote.hidden = t.status !== "bad", n.netNote.textContent = /令牌/.test(t.statusText || "") ? "请检查令牌配置" : "请检查网络、端口或防火墙");
    }
  }
  function ft(e) {
    const a = String(e || "").trim();
    a !== t.sessionTitle && (t.sessionTitle = a, Ka());
  }
  function Ka() {
    if (!n.title) return;
    const e = t.sessionTitle || "对话";
    n.title.textContent = e, n.title.title = e, Ae();
  }
  function Ga() {
    if (!n.send) return;
    const e = Le() || t.runActive && (t.waiting || t.running || t.awaitingReply);
    n.send.textContent = e ? "■" : "↑", n.send.classList.toggle("is-stop", e), n.send.setAttribute("aria-label", e ? "停止等待" : "发送"), n.send.dataset.action = e ? "stop" : "send";
  }
  function Wt() {
    n.list && (n.list.scrollTop = n.list.scrollHeight);
  }
  function Po() {
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
        const u = n.list, b = a.getBoundingClientRect().top - u.getBoundingClientRect().top + u.scrollTop;
        u.scrollTo({ top: Math.max(0, b - 8), behavior: "smooth" });
      }), a.appendChild(r);
    }
  }
  let Kt = [];
  function Ge() {
    for (const e of Kt) window.clearTimeout(e);
    Kt = [], Wt();
    for (const e of [80, 180, 320, 480])
      Kt.push(window.setTimeout(Wt, e));
  }
  function Ve() {
    n.input && (n.input.style.height = "auto", n.input.style.height = Math.min(120, n.input.scrollHeight) + "px");
  }
  function Ye() {
    !d || !n.top || d.style.setProperty("--chat-header-h", Math.round(n.top.getBoundingClientRect().height) + "px");
  }
  function Va(e) {
    if (!e || !d) return;
    const a = t.insets;
    t.insets = e, d.style.setProperty("--chat-top", Math.max(0, Number(e.top) || 0) + "px"), d.style.setProperty("--chat-bottom", Math.max(0, Number(e.bottom) || 0) + "px"), d.style.setProperty("--chat-ime", Math.max(0, Number(e.ime) || 0) + "px"), Ye(), (e.ime || 0) !== (a.ime || 0) && window.setTimeout(() => {
      e.ime > 0 && t.view === "settings" && zt ? zt.scrollIntoView({ block: "center", behavior: "smooth" }) : Ge();
    }, 60);
  }
  function zo() {
    const e = getComputedStyle(document.documentElement);
    return {
      top: Number.parseFloat(e.getPropertyValue("--safe-top")) || 0,
      bottom: Number.parseFloat(e.getPropertyValue("--safe-bottom")) || 0,
      ime: 0
    };
  }
  function Co() {
    document.getElementById(dn) || (K = document.createElement("style"), K.id = dn, K.textContent = tr, document.head.appendChild(K));
  }
  function Bo() {
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
              <input data-role="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="例如：http://192.168.1.1:8788" />
            </label>
            <label class="chat-field">
              <span>外部（可选）<em class="chat-field-state" data-role="wan-state"></em></span>
              <input data-role="wan" inputmode="url" autocomplete="off" spellcheck="false" placeholder="例如：http://10.126.126.1:8788" />
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

        <section class="chat-acc" data-acc="avatar" data-open="0">
          <button type="button" class="chat-acc-head" data-action="toggle-acc" data-acc="avatar">
            <span class="chat-acc-title">头像</span>
            <span class="chat-acc-sum">对话里的我和助手</span>
            <span class="chat-acc-chevron">›</span>
          </button>
          <div class="chat-acc-body" data-role="avatar-body" hidden>
            <div class="chat-avatar-edit">
              <button type="button" class="chat-avatar-pick" data-action="pick-avatar" data-who="me">
                <span class="chat-avatar-preview" data-role="avatar-me-preview">🙂</span>
                <span class="chat-avatar-copy"><b>我的头像</b><em>点按上传</em></span>
              </button>
              <button type="button" class="chat-avatar-pick" data-action="pick-avatar" data-who="ai">
                <span class="chat-avatar-preview" data-role="avatar-ai-preview">🤖</span>
                <span class="chat-avatar-copy"><b>助手头像</b><em>点按上传</em></span>
              </button>
            </div>
            <p class="chat-hint">只保存在这台手机，不上传电脑端。</p>
            <button type="button" class="chat-btn" data-action="reset-avatars">恢复默认头像</button>
            <input class="chat-pick" type="file" accept="image/*" data-role="avatar-me" hidden />
            <input class="chat-pick" type="file" accept="image/*" data-role="avatar-ai" hidden />
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
  function Ro() {
    if (n = {
      title: d.querySelector('[data-role="title"]'),
      status: d.querySelector('[data-role="status"]'),
      net: d.querySelector('[data-role="net"]'),
      netText: d.querySelector('[data-role="net-text"]'),
      netNote: d.querySelector(".chat-net-note"),
      list: d.querySelector('[data-role="list"]'),
      loadSpinner: d.querySelector('[data-role="load-spinner"]'),
      top: d.querySelector(".chat-top"),
      jump: d.querySelector('[data-role="jump"]'),
      input: d.querySelector('[data-role="draft"]'),
      attach: d.querySelector('[data-role="attach"]'),
      pick: d.querySelector('[data-role="pick"]'),
      send: d.querySelector(".chat-send"),
      toast: d.querySelector('[data-role="toast"]'),
      page: d.querySelector('[data-role="page"]'),
      inputUrl: d.querySelector('[data-role="url"]'),
      inputWan: d.querySelector('[data-role="wan"]'),
      inputAuto: d.querySelector('[data-role="auto"]'),
      modeGroup: d.querySelector('[data-role="mode-group"]'),
      inputToken: d.querySelector('[data-role="token"]'),
      drawer: d.querySelector('[data-role="drawer"]'),
      drawerList: d.querySelector('[data-role="drawer-list"]'),
      drawerCreate: d.querySelector('[data-role="drawer-create"]'),
      sessionSearch: d.querySelector('[data-role="session-search"]'),
      switchBtn: d.querySelector('[data-action="switch"]'),
      newBody: d.querySelector('[data-role="new-body"]'),
      searchScrim: d.querySelector('[data-role="search-scrim"]'),
      searchInput: d.querySelector('[data-role="message-search"]'),
      searchBody: d.querySelector('[data-role="search-body"]'),
      sessionMenu: d.querySelector('[data-role="session-menu"]'),
      renameScrim: d.querySelector('[data-role="rename-scrim"]'),
      renameInput: d.querySelector('[data-role="rename-input"]'),
      archiveScrim: d.querySelector('[data-role="archive-scrim"]'),
      archiveText: d.querySelector('[data-role="archive-text"]'),
      modelChip: d.querySelector('[data-role="model-chip"]'),
      modelScrim: d.querySelector('[data-role="model-scrim"]'),
      modelBody: d.querySelector('[data-role="model-body"]'),
      confirmScrim: d.querySelector('[data-role="confirm"]'),
      test: d.querySelector('[data-role="test"]'),
      lanState: d.querySelector('[data-role="lan-state"]'),
      wanState: d.querySelector('[data-role="wan-state"]'),
      relay: d.querySelector('[data-role="relay"]'),
      relaySum: d.querySelector('[data-role="relay-sum"]'),
      relayToggle: d.querySelector('[data-role="relay-toggle"]'),
      relayBody: d.querySelector('[data-role="relay-body"]'),
      avatarBody: d.querySelector('[data-role="avatar-body"]'),
      cacheBody: d.querySelector('[data-role="cache-body"]'),
      resetBody: d.querySelector('[data-role="reset-body"]'),
      notifyMode: d.querySelector('[data-role="notify-mode"]'),
      serverSum: d.querySelector('[data-role="server-sum"]'),
      serverBody: d.querySelector('[data-role="server-body"]'),
      version: d.querySelector('[data-role="version"]'),
      helpScrim: d.querySelector('[data-role="help"]'),
      scrim: d.querySelector('[data-role="scrim"]'),
      sheetBody: d.querySelector('[data-role="sheet-body"]'),
      viewer: d.querySelector('[data-role="viewer"]'),
      viewerImg: d.querySelector('[data-role="viewer-img"]'),
      viewerCount: d.querySelector('[data-role="viewer-count"]'),
      viewerPrev: d.querySelector('[data-action="viewer-prev"]'),
      viewerNext: d.querySelector('[data-action="viewer-next"]')
    }, n.input && n.input.addEventListener("focus", () => {
      d.style.setProperty("--chat-bottom", "0px");
    }), n.viewer && (n.viewer.addEventListener("pointerdown", vo), n.viewer.addEventListener("pointermove", yo), n.viewer.addEventListener("pointerup", ja), n.viewer.addEventListener("pointercancel", ja)), n.list) {
      n.list.addEventListener("scroll", We, { passive: !0 }), n.list.addEventListener("scroll", ba, { passive: !0 });
      const e = () => {
        t.lastUserScroll = Date.now();
      };
      n.list.addEventListener("touchmove", e, { passive: !0 }), n.list.addEventListener("wheel", e, { passive: !0 }), n.list.addEventListener("pointerdown", e, { passive: !0 });
    }
    Ye();
  }
  function Ya(e) {
    let a = Yt.get(e);
    return a || (a = { selected: {}, custom: {} }, Yt.set(e, a)), a;
  }
  function Do(e) {
    const a = String(e.dataset.input || ""), o = String(e.dataset.q || ""), r = String(e.dataset.value || "");
    if (!a || !o) return;
    const l = Ya(a), u = Array.isArray(l.selected[o]) ? l.selected[o] : [];
    e.dataset.multi === "1" ? l.selected[o] = u.includes(r) ? u.filter((b) => b !== r) : [...u, r] : l.selected[o] = [r], H();
  }
  async function jo(e) {
    if (!e || Qt.has(e)) return;
    const a = c.cards.get("input-" + e);
    if (!a) return;
    const o = Mr(a, Yt.get(e) || {});
    if (!o) {
      P("先把每个问题都答一下", "error");
      return;
    }
    Qt.add(e), t.lastProgressAt = Date.now(), H();
    try {
      await w.respond(e, o, t.currentSession || ""), P("已回答");
    } catch (r) {
      Qt.delete(e), H(), P("提交失败：" + (r && r.message || "网络错误"), "error");
    }
  }
  function Ho(e, a) {
    if (e)
      if (e === "send")
        Pe(t.draft);
      else if (e === "stuck-skip")
        xa(!1);
      else if (e === "stuck-wait")
        t.stuckPrompt = !1, t.lastProgressAt = Date.now(), H();
      else if (e === "attach")
        n.pick && n.pick.click();
      else if (e === "stop")
        Un();
      else if (e === "settings")
        Mt();
      else if (e === "clear-cache") {
        if (a.dataset.confirm !== "1") {
          a.dataset.confirm = "1", a.textContent = "再点一次确认清理", window.setTimeout(() => {
            a.dataset.confirm = "", a.textContent = "清理缓存";
          }, 3e3);
          return;
        }
        a.dataset.confirm = "", a.textContent = "清理缓存", Tn();
      } else if (e === "reset-app") {
        if (a.dataset.confirm !== "1") {
          a.dataset.confirm = "1", a.textContent = "再点一次确认恢复初始化", window.setTimeout(() => {
            a.dataset.confirm = "", a.textContent = "恢复初始化";
          }, 3e3);
          return;
        }
        a.dataset.confirm = "", a.textContent = "恢复初始化", An();
      } else e === "back" ? Ia() : e === "switch" ? t.sessionsOpen ? wt() : Zt() : e === "close-app" ? so() : e === "confirm-cancel" ? re() : e === "confirm-ok" ? (re(), io()) : e === "test" ? lo() : e === "test-relay" ? ho() : e === "save" ? fo() : e === "close-sheet" ? wt() : e === "new-session" ? oo() : e === "close-new" ? He() : e === "open-help" ? n.helpScrim && (n.helpScrim.hidden = !1) : e === "close-help" ? n.helpScrim && (n.helpScrim.hidden = !0) : e === "create-session" ? co() : e === "open-models" ? eo() : e === "close-models" ? oe() : e === "apply-model" && no();
  }
  function Qa(e) {
    const a = e.target;
    if (!(a instanceof Element)) return;
    if (a.matches('[data-role="tool-sheet"]')) {
      ue();
      return;
    }
    const o = a.closest("[data-action]");
    if (o) {
      const p = o.dataset.action;
      if (p === "remove-attach") {
        Bn(o.dataset.key || "");
        return;
      }
      if (p === "pick-avatar") {
        const q = o.dataset.who === "ai" ? "ai" : "me", k = d ? d.querySelector(`[data-role="avatar-${q}"]`) : null;
        k instanceof HTMLInputElement && k.click();
        return;
      }
      if (p === "reset-avatars") {
        t.avatarMe = "", t.avatarAi = "", At(), ze(), H(), P("已恢复默认头像");
        return;
      }
      if (p === "tool-copy") {
        const q = String(o.dataset.tool || ""), k = String(o.dataset.copy || ""), R = q ? c.cards.get(q) : null, O = k === "args" ? R && R.args : R && R.preview;
        O && i.clipboard && typeof i.clipboard.write == "function" && i.clipboard.write(String(O)).then(() => P("已复制")).catch(() => P("复制失败", "error"));
        return;
      }
      if (p === "tool-open") {
        const q = String(o.dataset.tool || "");
        q && qo(q);
        return;
      }
      if (p === "close-tool-sheet") {
        ue();
        return;
      }
      if (p === "tool-group-toggle") {
        const q = String(o.dataset.group || "");
        if (!q) return;
        const k = !Vt.has(q);
        k ? Vt.add(q) : Vt.delete(q);
        const R = o.getBoundingClientRect().top, O = n.list ? n.list.scrollTop : 0, W = !!t.holdAnswer;
        t.holdAnswer = !0;
        for (const Z of lt) window.clearTimeout(Z);
        lt = [], H(), window.requestAnimationFrame(() => {
          if (!n.list) {
            t.holdAnswer = W;
            return;
          }
          const Z = [...n.list.querySelectorAll(".chat-tool-group")].find(
            (M) => M.dataset.group === q
          );
          if (!k)
            n.list.scrollTop = O;
          else if (Z) {
            const M = Z.querySelector(".chat-tool-group-head");
            if (M) {
              const J = M.getBoundingClientRect().top - R;
              Math.abs(J) > 1 && (n.list.scrollTop += J);
            }
            const V = Z.querySelector(".chat-tool-group-body");
            V && (V.scrollTop = 0);
          }
          n.list.scrollTop = Math.max(
            0,
            Math.min(n.list.scrollTop, n.list.scrollHeight - n.list.clientHeight)
          ), t.holdAnswer = W;
        });
        return;
      }
      if (p === "approval-allow" || p === "approval-deny") {
        const q = String(o.dataset.approval || ""), k = q.startsWith("approval-") ? q.slice(9) : q;
        qn(k, p === "approval-allow");
        return;
      }
      if (p === "q-pick") {
        Do(o);
        return;
      }
      if (p === "q-submit") {
        jo(String(o.dataset.input || ""));
        return;
      }
      if (p === "jump-bottom") {
        Wt(), We();
        return;
      }
      if (p === "search-messages") {
        On();
        return;
      }
      if (p === "close-search") {
        Ce();
        return;
      }
      if (p === "search-jump") {
        Fn(String(o.dataset.key || ""));
        return;
      }
      if (p === "viewer-prev") {
        Oe(-1);
        return;
      }
      if (p === "viewer-next") {
        Oe(1);
        return;
      }
      if (p === "copy-message") {
        const q = o.closest(".chat-turn"), k = q ? q.querySelector(".chat-bubble") : null, R = k ? decodeURIComponent(k.dataset.copy || "") : "";
        R && Ra(R).then((O) => P(O ? "已复制这条消息" : "复制失败", O ? "" : "error"));
        return;
      }
      if (p === "copy-code") {
        const q = decodeURIComponent(o.dataset.code || "");
        q && Ra(q).then((k) => {
          if (!k) {
            P("复制失败", "error");
            return;
          }
          o.textContent = "已复制", window.setTimeout(() => {
            o.textContent = "复制";
          }, 1200);
        });
        return;
      }
      if (p === "resend-message") {
        const q = o.closest(".chat-turn"), k = q ? q.querySelector(".chat-bubble") : null, R = k ? decodeURIComponent(k.dataset.copy || "") : "";
        R && n.input && (t.draft = R, n.input.value = R, Ve(), n.input.focus(), P("已放进输入框，可改完再发"));
        return;
      }
      if (p === "toggle-acc") {
        Ba(o.dataset.acc || "");
        return;
      }
      if (p === "pick-preset") {
        ro("preset", o.dataset.scope || "settings", o.dataset.value || "");
        return;
      }
      if (p === "pick-permission") {
        t.formPermission = o.dataset.value || "", Ut();
        return;
      }
      if (p === "pick-mode") {
        t.mode = o.dataset.value || "auto", Ma();
        return;
      }
      if (p === "pick-notify-mode") {
        t.notifyMode = o.dataset.value === "message" ? "message" : "turn", At(), Ot(), Ea();
        return;
      }
      if (p === "pick-model" || p === "pick-effort") {
        ao(p === "pick-model" ? "model" : "effort", o.dataset.value || "", o.dataset.provider || "", o.dataset.scope || "model");
        return;
      }
      if (p === "pick-permission-current") {
        t.sessionPermission = String(o.dataset.value || ""), ne();
        return;
      }
      if (p === "session-menu") {
        Wn(o.dataset.session || "", o.dataset.title || "");
        return;
      }
      if (p === "toggle-session-search") {
        if (!n.sessionSearch) return;
        const q = n.sessionSearch.hidden;
        n.sessionSearch.hidden = !q, q ? n.sessionSearch.focus() : (n.sessionSearch.value = "", t.sessionQuery = "", te());
        return;
      }
      if (p === "session-rename") {
        Kn();
        return;
      }
      if (p === "session-fork") {
        Vn();
        return;
      }
      if (p === "confirm-rename") {
        Gn();
        return;
      }
      if (p === "close-session-menu") {
        Ht();
        return;
      }
      if (p === "close-rename") {
        Be();
        return;
      }
      if (p === "archive-session") {
        Yn(t.sessionMenuId, t.sessionMenuTitle);
        return;
      }
      if (p === "confirm-archive") {
        Qn();
        return;
      }
      if (p === "close-archive") {
        ae();
        return;
      }
      if (p === "toggle-archived") {
        t.showArchived = !t.showArchived, te();
        return;
      }
      if (p === "restore-session") {
        Xn(String(o.dataset.session || ""));
        return;
      }
      Ho(p, o);
      return;
    }
    const r = a.closest(".chat-link");
    if (r) {
      e.preventDefault(), go(r.dataset.href || r.getAttribute("href") || "");
      return;
    }
    const l = a.closest(".chat-file");
    if (l) {
      if (e.preventDefault(), Date.now() - sa < 500) return;
      mo(l.dataset.fileUrl || "", l.dataset.fileName || "");
      return;
    }
    const u = a.closest(".chat-image");
    if (u) {
      if (Date.now() - sa < 500) return;
      bo(Da(u), u);
      return;
    }
    const b = a.closest(".chat-image-fallback");
    if (b) {
      Uo(b);
      return;
    }
    const E = a.closest("[data-retry]");
    if (E) {
      e.preventDefault();
      const p = decodeURIComponent(E.dataset.retry || ""), q = E.parentElement ? E.parentElement.querySelector(".chat-bubble.is-error") : null;
      q && q.parentElement ? q.parentElement.remove() : E.remove(), Pe(p, !0);
      return;
    }
    const B = a.closest("[data-session]");
    if (B) {
      e.preventDefault(), Sa(B.dataset.session || "");
      return;
    }
    if (a === n.scrim) {
      wt();
      return;
    }
    if (a === n.newScrim) {
      He();
      return;
    }
    if (a === n.modelScrim) {
      oe();
      return;
    }
    if (a === n.confirmScrim) {
      re();
      return;
    }
    if (a === n.archiveScrim) {
      ae();
      return;
    }
    if (n.viewer && !n.viewer.hidden) {
      if (ot) {
        ot = !1;
        return;
      }
      if (dt) return;
      ce();
    }
  }
  function Xa(e) {
    const a = e.target;
    if (a instanceof HTMLInputElement && a.dataset.role === "q-custom") {
      const o = String(a.dataset.input || ""), r = String(a.dataset.q || "");
      o && r && (Ya(o).custom[r] = a.value);
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "session-search") {
      t.sessionQuery = a.value, te();
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "new-title") {
      t.formTitle = a.value;
      return;
    }
    if (a instanceof HTMLInputElement && a.dataset.role === "message-search") {
      t.searchQuery = a.value, ka();
      return;
    }
    a instanceof HTMLTextAreaElement && (t.draft = a.value, Ve());
  }
  function Ja(e) {
    e.target instanceof HTMLTextAreaElement && (e.isComposing || e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Pe(t.draft)));
  }
  function Za(e) {
    const a = e.target;
    a instanceof HTMLElement && (a === n.input ? (Ge(), zt = null) : n.page && n.page.contains(a) && (zt = a));
  }
  function tn() {
    zt = null;
  }
  function It() {
    bt && bt.timer && window.clearTimeout(bt.timer), bt = null;
  }
  function en(e) {
  }
  function an(e) {
    bt && (Math.abs(e.clientX - bt.x) > 8 || Math.abs(e.clientY - bt.y) > 8) && It();
  }
  function nn(e) {
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
  function Uo(e) {
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
  function _o() {
    it(), Me(), ut();
  }
  function Oo() {
    t.view === "chat" && (at === "legacy" && jt(), $e(!0), pt().then((e) => {
      !e || D || (at === "legacy" ? Dt() : yt(), Mn());
    }));
  }
  Co(), kn(), la(), Sn(), i.watch && typeof i.watch.ensurePermission == "function" && i.watch.ensurePermission().catch(() => {
  }), Ot(), d = Bo(), s.appendChild(d), Ro(), d.addEventListener("click", Qa), d.addEventListener("input", Xa), d.addEventListener("change", wa), d.addEventListener("keydown", Ja), d.addEventListener("focusin", Za), d.addEventListener("focusout", tn), d.addEventListener("pointerdown", en), d.addEventListener("pointermove", an), d.addEventListener("pointerup", It), d.addEventListener("pointercancel", It), d.addEventListener("error", nn, !0), i.ui && typeof i.ui.onInsetsChange == "function" ? ye = i.ui.onInsetsChange(Va) : Va(zo()), typeof i.on == "function" && (we = i.on("pause", _o), ke = i.on("resume", Oo)), H(!0), ct(), Wa(), Ka(), qt();
  const Qe = t.currentSession;
  Qe ? L.clearOthers(Qe).catch(() => {
  }).then(() => L.get(Qe)).then((e) => {
    D || c.size > 0 || e.length && (c.replaceEvents(e), t.booting = !1, t.hydrated = !1, H(!0));
  }).catch(() => {
  }) : (t.booting = !1, H(!0)), window.setTimeout(() => {
    D || !t.booting || (t.booting = !1, H(!0));
  }, 2500), t.uiChip && n.modelChip && (n.modelChip.textContent = t.uiChip, n.modelChip.hidden = !1);
  function Xe(e) {
    const a = d ? d.querySelector('[data-role="tool-sheet"]') : null;
    if (a && !a.hidden) {
      ue(), e.detail.handled = !0;
      return;
    }
    if (n.confirmScrim && !n.confirmScrim.hidden) {
      re(), e.detail.handled = !0;
      return;
    }
    if (n.modelScrim && !n.modelScrim.hidden) {
      oe(), e.detail.handled = !0;
      return;
    }
    if (n.newScrim && !n.newScrim.hidden) {
      He(), e.detail.handled = !0;
      return;
    }
    if (n.helpScrim && !n.helpScrim.hidden) {
      n.helpScrim.hidden = !0, e.detail.handled = !0;
      return;
    }
    if (n.archiveScrim && !n.archiveScrim.hidden) {
      ae(), e.detail.handled = !0;
      return;
    }
    if (n.searchScrim && !n.searchScrim.hidden) {
      Ce(), e.detail.handled = !0;
      return;
    }
    if (n.renameScrim && !n.renameScrim.hidden) {
      Be(), e.detail.handled = !0;
      return;
    }
    if (n.sessionMenu && !n.sessionMenu.hidden) {
      Ht(), e.detail.handled = !0;
      return;
    }
    if (n.scrim && !n.scrim.hidden) {
      t.drawerMode === "create" ? ee("list") : wt(), e.detail.handled = !0;
      return;
    }
    if (n.viewer && !n.viewer.hidden) {
      ce(), e.detail.handled = !0;
      return;
    }
    n.page && !n.page.hidden && (Ia(), e.detail.handled = !0);
  }
  function on(e) {
    if (!e || e.source !== window.parent) return;
    const a = e.data;
    if (!a || a.type !== "docklet:back") return;
    const o = { handled: !1 };
    if (Xe({ detail: o }), !!o.handled)
      try {
        window.parent.postMessage({ type: "docklet:back-handled" }, "*");
      } catch {
      }
  }
  window.addEventListener("message", on), window.addEventListener("docklet:back", Xe), Ga(), pt(!0).then((e) => {
    if (!e || D) {
      jt();
      return;
    }
    $e(!0), yt();
  }), Na = window.setInterval(() => {
    !document.hidden && t.status !== "ok" && pt();
  }, 1e4), Pa = window.setInterval(Cn, U), za = window.setInterval(zn, 8e3), La = window.setInterval(() => {
    !document.hidden && t.status === "ok" && pt();
  }, 6e4);
  const he = () => {
    D || pt(!0);
  };
  return window.addEventListener("online", he), window.addEventListener("offline", he), function() {
    D = !0, it(), Me(), ut(), window.removeEventListener("online", he), window.removeEventListener("offline", he), window.clearInterval(Na), window.clearInterval(La), window.clearInterval(Pa), window.clearInterval(za), Fa(), window.clearTimeout(_e), It();
    for (const a of Kt) window.clearTimeout(a);
    Kt = [], window.clearTimeout(X), typeof ye == "function" && ye(), typeof we == "function" && we(), typeof ke == "function" && ke(), d.removeEventListener("click", Qa), d.removeEventListener("input", Xa), d.removeEventListener("change", wa), d.removeEventListener("keydown", Ja), d.removeEventListener("focusin", Za), d.removeEventListener("focusout", tn), d.removeEventListener("pointerdown", en), d.removeEventListener("pointermove", an), d.removeEventListener("pointerup", It), d.removeEventListener("pointercancel", It), d.removeEventListener("error", nn, !0), window.removeEventListener("message", on), window.removeEventListener("docklet:back", Xe), d.remove(), K && K.remove(), K = null, d = null, n = {};
  };
}
export {
  Ir as default
};
