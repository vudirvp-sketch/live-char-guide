# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#16 ✅ CLOSED (iter 19) + KI#17 ✅ CLOSED (iter 20)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 20 COMPLETE.** KI#13 Part 1+2 baseline: 57 inline `style=` → external CSS classes. `src/assets/vs-styles.css` +137 строк (SECTION 6 — KI#13 Inline Style → CSS Class Migration, 28 новых классов). `src/master/part_01.html` 48→0 inline styles. `src/master/part_02.html` 9→0 inline styles. KI#17 CLOSED (doc drift fixed iter 10, LOW severity). SVG extracts audit: все 17 elements embedded в master HTML, все styles в vs-styles.css, scripts консолидированы в vs-scroll-observer.js + 4 widget JS. 0 orphans. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Canon migration (iter 7–18) unaffected.

### Что сделано в iter 20

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#13 Part 1: 48 inline styles → CSS classes | `vs-ki13-anchor-header/title/desc` (3 класса, Anchors subpanel) + `vs-ki13-token-panel/heading/table/thead/th-*/tbody/row/td-*` (12 классов, Token Budget Summary) = 15 классов. part_01.html: 48→0 inline styles. |
| b | KI#13 Part 2: 9 inline styles → CSS classes | `vs-ki13-flow-node--violet/cyan/amber` (3 класса, E03 accent borders) + `vs-ki13-compare-column--relative` + `vs-ki13-arrow-dim` + `vs-ki13-funnel-panel/panel-heading/panel-text` (4 класса, E04 explanation) = 9 классов. part_02.html: 9→0 inline styles. |
| c | KI#17 CLOSED | Doc drift fixed iter 10, LOW severity. Closed. |
| d | SVG extracts audit | Все 17 elements (E01-E17) embedded в master HTML. Все 17 extract styles в vs-styles.css. Scripts консолидированы: vs-scroll-observer.js (scroll-enter/IntersectionObserver) + 4 widget JS (vs-e10/e13/e15/e16). 0 orphans. |
| e | Validation gates PASS | `validate:master` ✅ (0 errors, 66 inline styles remaining в Part 3-10), `build` ✅ (hash fd3d96d3 unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings pre-existing), `qa:csp` ✅, `qa:bundle` ✅, `qa:doc-versions` ✅. |

### Изменённые файлы в iter 20

| File | Action | Reason |
|------|--------|--------|
| `src/assets/vs-styles.css` | Edited | +137 строк SECTION 6 (KI#13 classes: 28 классов). |
| `src/master/part_01.html` | Edited | 48 inline styles → CSS classes (0 remaining). |
| `src/master/part_02.html` | Edited | 9 inline styles → CSS classes (0 remaining). |
| `STATUS.md` | Rewritten | iter 20 status, KI#17 CLOSED. |
| `worklog.md` | Updated | iter 20 record (iter 19 → one-liner). |
| `AGENT_NAVIGATION.md` | Updated | §6 pitfall #35 → KI#17 CLOSED, §8 iter 20 record, header iter 19 → iter 20. |
| `CHANGELOG.md` | Updated | [9.1.20] entry. |
| `PLAN.md` | Updated | §5 iter 20 → ✅ DONE, iter 21+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 20 row → ✅ DONE. §8 iter 20 stop point + iter 21 priorities. |
| `docs/canon/_README.md` | Updated | §9 iter 20 entry (KI#13 Part 1+2, KI#17 CLOSED, SVG audit). |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 66 inline `style=` remaining (123 - 57 fixed в iter 20) в Part 3-10 master HTML. Part 1+2 ✅ DONE (iter 20). Продолжение: Part 3+4 в iter 21, Part 5+6 в iter 22, и т.д.

**KI#14 (CLOSED, iter 16)** — Content duplication VS-EMBED ↔ текст. Все 10 Parts ✅ MIGRATED.

**KI#16 (CLOSED, iter 19)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fixed: external widgets `js-flag.js` + `mermaid-init.js`. `qa:csp` PASS.

**KI#17 (CLOSED, iter 20)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity. Closed iter 20.

**Fix plan (iter 21+):** KI#13 (inline styles → external CSS classes, Part 3+4) + Phase 4 actual SVG integration (заменить textual content на VS-EMBED где возможно). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated root fallbacks. Не редактировать напрямую. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canonical Guide Spec (iter 7–18) — COMPLETE** | Part 1 ✅ iter 14. Part 2 ✅ iter 14. Part 3 ✅ iter 14. Part 4 ✅ iter 7–9. Part 5 ✅ iter 16. Part 6 ✅ iter 16. Part 7A ✅ iter 10–11. Part 7B ✅ iter 16. Part 8 ✅ iter 12. Part 9 ✅ iter 13. Part 10 ✅ iter 16. Appendix A/B/C ✅ iter 18. |
| **CSP compliance (iter 19)** | `qa:csp` PASS. Все scripts в `index.html` — `<script src="...">` (external). Inline scripts forbidden. |
| **KI#13 inline styles → CSS (iter 20+)** | 123 inline styles → 57 fixed (Part 1+2, iter 20). 66 remaining (Part 3-10). Naming: `vs-ki13-*` prefix. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
