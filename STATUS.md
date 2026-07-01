# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#16 ✅ CLOSED (iter 19) + KI#17 ✅ CLOSED (iter 20) + KI#13 Part 1-7A ✅ DONE (iter 20-23)
> **Дата:** 2026-06-30

---

## Текущее состояние

**iter 23 COMPLETE.** KI#13 Part 7A: 19 inline `style=` → 9 external CSS classes (semantic grouping). `src/assets/vs-styles.css` +33 строки (SECTION 6 — 9 новых селекторов `vs-ki13-p7a-*`). `src/master/part_07a.html` 19→0 inline styles. Build hash `fd3d96d3` unchanged. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Canon migration (iter 7–18) unaffected.

### Что сделано в iter 23

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#13 Part 7A: 19 inline styles → 9 CSS classes | Semantic grouping: 4 color overrides (`vs-ki13-p7a-text-{violet/muted/danger/success}`, 10 применений), 3 badge sizing/spacing (`vs-ki13-p7a-badge-meta` + `badge-indent` + `badge-indent-top`, 7 применений), 1 state (`vs-ki13-p7a-template-hidden`, template-b initial display:none), 1 border (`vs-ki13-p7a-border-cyan`, pipeline-node__box accent). E16: 4→0, E17: 8→0, E02: 7→0. |
| b | JS toggle compatibility verified | `vs-e16-author-note.js` использует `element.style.display = 'block'/'none'` (inline assignment) — overrides class. `.vs-ki13-p7a-template-hidden` устанавливает только initial state, JS toggle не сломан. |
| c | Validation gates PASS | `validate:master` ✅ (0 errors, 18 inline styles remaining Part 9+10), `build` ✅ (hash fd3d96d3 unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings pre-existing), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |

### Изменённые файлы в iter 23

| File | Action | Reason |
|------|--------|--------|
| `src/assets/vs-styles.css` | Edited | +33 строки SECTION 6 (9 новых селекторов `vs-ki13-p7a-*`: 4 text-color + 3 badge sizing/spacing + 1 template-hidden + 1 border-cyan). |
| `src/master/part_07a.html` | Edited | 19 inline styles → CSS classes (0 remaining). E16 Author's Note: 4→0. E17 Sampling Parameters: 8→0. E02 Assembly Pipeline: 7→0. |
| `assets/vs-styles.css`, `parts/part_07a.html`, `index.html` | Regenerated | Root fallbacks (build artifact — timestamp updated, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md`, `docs/canon/_README.md` | Updated | iter 23 record. CHANGELOG compressed (iter 20 → one-liner, keep last 3 detailed: 21, 22, 23). |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 18 inline `style=` remaining (123 - 105 fixed: 57 в iter 20 + 23 в iter 21 + 6 в iter 22 + 19 в iter 23) в Part 9+10 master HTML. Part 1-7A ✅ DONE (iter 20-23). Продолжение: Part 9+10 в iter 24.

**KI#14 (CLOSED, iter 16)** — Content duplication VS-EMBED ↔ текст. Все 10 Parts ✅ MIGRATED.

**KI#16 (CLOSED, iter 19)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fixed: external widgets `js-flag.js` + `mermaid-init.js`. `qa:csp` PASS.

**KI#17 (CLOSED, iter 20)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity. Closed iter 20.

**Fix plan (iter 24+):** KI#13 (inline styles → external CSS classes, Part 9+10) — next 18 inline styles. Part 9: 6 styles (1 positional `bottom:50%`, 4 color overrides, 1 panel max-width). Part 10: 12 styles (11 positional `top:Npx; right:20px;` — кандидат на generic class + per-instance modifier, 1 border-left+violet). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

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
| **KI#13 inline styles → CSS (iter 20-23)** | 123 inline styles → 105 fixed (Part 1-7A). 18 remaining (Part 9: 6, Part 10: 12). Naming: `vs-ki13-*` prefix (Part 7A добавил `vs-ki13-p7a-*` sub-namespace для semantic grouping). |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
