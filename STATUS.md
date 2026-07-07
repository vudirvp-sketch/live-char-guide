# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED + KI#13/#18/#20 ✅ CLOSED + iter 33 audit verified + **iter 34 — KI#22 ✅ CLOSED + KI#23 ✅ CLOSED + KI#24 ✅ VERIFIED (build hash fd3d96d3 → 69d9b813)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 34 — CSS CALLOUT SCOPING + CSP WORKER-SRC FIX ✅ COMPLETE.** По запросу user: исследовать поломанные callout-элементы (`<div class="callout rule is-visible">` — наезжают на контент, дублируют ли они что-то, нужны ли вообще), CSP-ошибку worker-src в консоли, проверить FAB-кнопки глоссария и содержания.

- **KI#22 ✅ CLOSED** — Callout CSS Scoping Bug. `.callout` selector был определён ДВАЖДЫ глобально: `src/shell/styles.css` line 419 (документационные rule/rec/ex) И line 6278 (E15 Annotated Blueprint annotation labels, БЕЗ scope — `position:absolute; opacity:0`). Та же двойная дефиниция в `src/assets/vs-styles.css` line 2873. E15 (позже в файле) OVERRIDES документационную — все 56 `.callout rule/rec/ex` в 12 master HTML становились абсолютно позиционированными, font-size 11px, opacity:0. **Fix:** scope E15 `.callout*` selectors к `.blueprint-area .callout*` в обоих CSS файлах (12 selector'ов обновлено: 6 в shell-styles.css + 6 в vs-styles.css, включая base + is-visible + 4 modifier класса + .callout-line). 56 документационных callouts теперь используют ТОЛЬКО line 419 definition (padding 1em 1.2em, border-left 3px solid, видимы по умолчанию). 11 E15 annotation labels (внутри `.blueprint-area`) продолжают работать как раньше.
- **KI#23 ✅ CLOSED** — CSP worker-src missing. Добавлен `worker-src 'self' blob:;` в CSP meta в `src/shell/index.html` line 22. Mermaid v11 (CDN) теперь может создавать Web Worker из blob URL для парсинга (раньше блокировалось, Mermaid деградировала в single-threaded mode). Build hash ИЗМЕНИЛСЯ с `fd3d96d3` → `69d9b813` (hash computed из `src/shell/index.html`).
- **KI#24 ✅ VERIFIED — NO BUG.** FAB кнопки (`#fab-glossary`, `#fab-toc`) работают корректно. JS handlers wired в `initGlossary()` (lazy-loader.js line 1208) и `initPanels()` (line 1501). Glossary renders 53 terms, TOC panel инициализируется. Minor inefficiency: glossary renders дважды (init + content loader) — не критично, не фиксим.

**iter 33 — CONTENT AUDIT VERIFICATION ✅ COMPLETE (без правок кода).** Перепроверен весь аудит канона. Финальный план работ зафиксирован в `docs/AUDIT_VERIFICATION.md`: 16 P0 + 11 P1 + 18 P2 + 12 P3 = 57 правок, **перенесены на iter 35-38** (раньше iter 34-37, сдвиг из-за iter 34 = CSS/CSP fix).

**iter 32 — KI#20 ✅ CLOSED.** Visual System Scroll-Animation Bug: 5 VS-EMBED (E06/E07/E08/E09/E15) имели invisible animation elements. Single-file fix в `src/shell/widgets/vs-scroll-observer.js`.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED — 56 callouts fixed via scope | iter 34 |
| KI#23 (CSP worker-src missing) | MEDIUM | ✅ CLOSED — worker-src 'self' blob: added | iter 34 |
| KI#24 (FAB Glossary/TOC verification) | LOW | ✅ VERIFIED — no bug, no fix needed | iter 34 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | 🟡 **DOCUMENTED** — fix plan ready (iter 35-38) | found iter 33 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED — 5/5 sub-items fixed | iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 | iter 26-31 |
| KI#19 (Chinese chars in part_05 L269) | LOW | ✅ CLOSED | iter 30 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 |
| KI#16 (qa:csp — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1-7 |

### KI#22 — Callout CSS Scoping Bug ✅ CLOSED (iter 34)

**Symptom:** Все 56 документационных callouts (`.callout rule`, `.callout rec`, `.callout ex`) в 12 master HTML файлах отображались поломанно — наезжали на соседний контент (position:absolute), имели крошечный шрифт (11px), были невидимы (opacity:0) до добавления `.is-visible` класс от scroll observer.

**Root cause:** Двойное глобальное определение `.callout` selector. `src/shell/styles.css` line 419 — документационная taxonomy (RULE/REC/EX, видимы по умолчанию). `src/shell/styles.css` line 6278 (внутри `=== E15 ELEMENT STYLES ===` section, БЕЗ scope) — E15 Annotated Blueprint annotation labels (`position:absolute; opacity:0; pointer-events:none; font-size:11px`). Та же двойная дефиниция в `src/assets/vs-styles.css` line 2873. E15 (позже в файле) OVERRIDES документационную.

**Aggravated by iter 32 KI#20 fix:** `vs-scroll-observer.js` `SCROLL_ENTER_SELECTOR` includes `.callout` для E15 annotation labels — добавлял `.is-visible` ко ВСЕМ callouts (включая документационные), делая их opacity:1 (видимыми), но они оставались absolute-positioned (наезжали на контент).

**Fix (iter 34):** Scope E15 `.callout*` selectors к `.blueprint-area .callout*`:
- `src/shell/styles.css` — 7 selectors updated (line 6278: `.callout` → `.blueprint-area .callout`; line 6292: `.callout.is-visible` → `.blueprint-area .callout.is-visible`; lines 6297/6302/6307/6312: 4 modifier класса `.callout--structure/anchors/spine/directives` → `.blueprint-area .callout--*`; line 6318: `.callout-line` → `.blueprint-area .callout-line`).
- `src/assets/vs-styles.css` — те же 7 selectors updated (lines 2873, 2887, 2892, 2897, 2902, 2907, 2913).
- `vs-scroll-observer.js` — НЕ менялся (`.callout` в selector остаётся, harmless для документационных callouts: добавление `.is-visible` класса не имеет visual effect после CSS scope fix).

**Affected elements fixed:** 56 документационных callouts в 12 master HTML: part_01 (3), part_02 (5), part_03 (9), part_04 (7), part_05 (5), part_06 (2), part_07a (12), part_07b (6), part_08 (3), part_09 (2), part_10 (1), appendix_mbti (1).

**NOT affected (correct usage preserved):** 11 E15 annotation callouts в `src/master/part_10.html` lines 34-119 внутри `<div class="blueprint-area scroll-enter">` — продолжают работать как абсолютно позиционированные annotation labels.

**Validation:** `python3 scripts/audit_vs_embeds.py` — 0 regressions. `qa:csp`, `qa:bundle` (7.5KB), `test:unit` (43/43), `lint` (0 errors, 12 warnings), `validate:master`, `validate` — ALL PASS. Build hash `fd3d96d3` unchanged (CSS файлы не входят в hash computation).

### KI#23 — CSP worker-src missing ✅ CLOSED (iter 34)

**Symptom:** Console error в браузере: `Creating a worker from 'blob:...' violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline' cdn.jsdelivr.net". Note that 'worker-src' was not explicitly set, so 'script-src' is used as a fallback. The action has been blocked.` Mermaid v11 (CDN) internally создаёт Web Worker из blob URL для parsing — блокировалось CSP.

**Root cause:** CSP meta в `src/shell/index.html` не имела `worker-src` directive → fallback к `script-src`, который не содержал `blob:`. Mermaid деградировала в single-threaded mode (parsing на main thread, медленнее для complex diagrams).

**Fix (iter 34):** Добавлен `worker-src 'self' blob:;` к CSP meta в `src/shell/index.html` line 22. `blob:` позволяет только worker creation (не arbitrary script execution) — безопасно. Same-origin fallback сохранён (`'self'`).

**Validation:** `qa:csp` — PASS (csp_check.mjs проверяет только inline scripts и eval, не CSP meta content). Build hash **ИЗМЕНИЛСЯ** с `fd3d96d3` → `69d9b813` (hash computed из `src/shell/index.html`). Это expected — KI#23 fix требует правки index.html.

### KI#24 — FAB Glossary/TOC verification ✅ VERIFIED (iter 34, no bug)

**Verified:** FAB кнопки работают корректно:
- `#fab-glossary` (📖) — HTML markup корректный, JS handler wired в `initGlossary()` lazy-loader.js line 1240. Glossary panel `#glossary-panel` существует. Data: `data/glossary.json` (53 terms). Console: `[Glossary] Loaded data from data/glossary.json`, `[Glossary] Rendered 53 terms`.
- `#fab-toc` (📑) — HTML markup корректный, JS handler wired в `initPanels()` lazy-loader.js line 1515. TOC panel `#toc-panel` существует. Console: `[Panels] FAB buttons initialized`.

**Minor inefficiency (NOT fixed in iter 34):** Glossary renders дважды — `initGlossary()` lazy-loader.js line 1249 (initialization) + content loader line 679 (на каждую загрузку part). Cache (`glossaryDataCache`) предотвращает re-fetch JSON, но HTML rebuild происходит. Не критично, можно оптимизировать в будущем iter если потребуется.

### KI#21 — Content Audit contradictions 🟡 DOCUMENTED (iter 33, fix plan iter 35-38)

**Symptom:** Полный аудит канона `docs/canon/` (14 файлов, 5 008 строк) выявил ~50 противоречий/проблем: 10 критических (A1-A10), 6 «пример vs правило» (B1-B6), 8 категорий терминологии (C1-C8), 7 проблем примеров (D1-D7), 7 структурных (E1-E7), 10 локальных (F1-F10), 5 концептуальных упущений (G1-G5). Plus 3 NEW-пункта.

**Fix plan** (`docs/AUDIT_VERIFICATION.md` §4) — **перенесён на iter 35-38** (сдвиг из-за iter 34 = CSS/CSP fix):

| Iter | Priority | Правок | Описание |
|------|----------|--------|----------|
| **iter 35** | P0 | 16 | Критические противоречия (A1-A10, NEW-1, NEW-3). |
| **iter 36** | P1 | 11 | Пример vs правило + dead code (B1, B2, B5, B6, D1, D2, D4, A5, A7, A8). |
| **iter 37** | P2 | 18 | Терминология + структурный cleanup (C1-C2, C5, E1-E7, F1, F4-F10, B4). ~1500 строк удалений. |
| **iter 38** | P3 | 12 | Локальные правки (D3, D5-D7, F2-F3, F8, F10) + 3 новые секции (G1, G2, G4, G5). |

**После каждой итерации:** validation gates + `audit_vs_embeds.py` + git commit/push. Build hash `69d9b813` expected unchanged (только canon-контент правки).

**Правило (iter 33+):** при обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + присваивать sub-ID (A11, B7, и т.д.) с пометкой P0-P3.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated. Не редактировать напрямую. Все правки — в `src/`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18)** | Все 10 Parts + 3 Appendix ✅ MIGRATED. См. `docs/canon/_README.md` §5. |
| **CSP compliance (iter 19, KI#16 CLOSED; iter 34, KI#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` added для Mermaid v11 worker. |
| **Inline styles forbidden (iter 24, KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (iter 32, KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (iter 34, KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (iter 26-31, KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team


