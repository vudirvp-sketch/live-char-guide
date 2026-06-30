# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#16 ✅ CLOSED (iter 19) + KI#17 ✅ CLOSED (iter 20) + KI#13 Part 1-6 ✅ DONE (iter 20-22)
> **Дата:** 2026-06-30

---

## Текущее состояние

**iter 22 COMPLETE.** KI#13 Part 5+6: 6 inline `style=` → external CSS classes. `src/assets/vs-styles.css` +30 строк (SECTION 6 — 5 новых селекторов `vs-ki13-*`). `src/master/part_05.html` 1→0 inline styles. `src/master/part_06.html` 5→0 inline styles. Build hash `fd3d96d3` unchanged. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Canon migration (iter 7–18) unaffected.

### Что сделано в iter 22

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#13 Part 5: 1 inline style → CSS class | `.vs-ki13-context-limits-note` (1 селектор, E09 OCEAN Pentagon — Elena extreme example footnote inside `.context-limits-box__data`). part_05.html: 1→0. |
| b | KI#13 Part 6: 5 inline styles → 4 CSS selectors | E11 CoT Tiers — Progression explanation panel: `.vs-ki13-cot-panel` (max-width 700px), `.vs-ki13-cot-heading` (cyan accent — distinct от funnel-panel violet), `.vs-ki13-cot-text`, `.vs-ki13-cot-text strong` (descendant selector для 2 `<strong>`). part_06.html: 5→0. |
| c | Validation gates PASS | `validate:master` ✅ (0 errors, 37 inline styles remaining в Part 7A+9+10), `build` ✅ (hash fd3d96d3 unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings pre-existing), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |

### Изменённые файлы в iter 22

| File | Action | Reason |
|------|--------|--------|
| `src/assets/vs-styles.css` | Edited | +30 строк SECTION 6 (5 новых селекторов `vs-ki13-*`: 1 context-limits-note + 4 cot-* panel/heading/text/strong). |
| `src/master/part_05.html` | Edited | 1 inline style → CSS class (0 remaining). |
| `src/master/part_06.html` | Edited | 5 inline styles → CSS classes (0 remaining). |
| `assets/vs-styles.css`, `parts/part_05.html`, `parts/part_06.html`, `index.html` | Regenerated | Root fallbacks (build artifact — timestamp updated, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md`, `docs/canon/_README.md` | Updated | iter 22 record. CHANGELOG compressed (iter 1-19 → brief summary). |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 37 inline `style=` remaining (123 - 86 fixed: 57 в iter 20 + 23 в iter 21 + 6 в iter 22) в Part 7A+9+10 master HTML. Part 1-6 ✅ DONE (iter 20-22). Продолжение: Part 7A в iter 23, Part 9+10 в iter 24.

**KI#14 (CLOSED, iter 16)** — Content duplication VS-EMBED ↔ текст. Все 10 Parts ✅ MIGRATED.

**KI#16 (CLOSED, iter 19)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fixed: external widgets `js-flag.js` + `mermaid-init.js`. `qa:csp` PASS.

**KI#17 (CLOSED, iter 20)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity. Closed iter 20.

**Fix plan (iter 23+):** KI#13 (inline styles → external CSS classes, Part 7A) — next 19 inline styles. См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated root fallbacks. Не редактировать напрямую. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canonical Guide Spec (iter 7–18) — COMPLETE** | Все 10 Parts + 3 Appendix ✅ MIGRATED. См. `docs/canon/_README.md` §5. |
| **CSP compliance (iter 19)** | `qa:csp` PASS. Все scripts в `index.html` — `<script src="...">` (external). Inline scripts forbidden. |
| **KI#13 inline styles → CSS (iter 20-22)** | 123 inline styles → 86 fixed (Part 1-6). 37 remaining (Part 7A: 19, Part 9: 6, Part 10: 12). Naming: `vs-ki13-*` prefix. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
