# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#16 ✅ CLOSED (iter 19) + KI#17 ✅ CLOSED (iter 20)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 21 COMPLETE.** KI#13 Part 3+4: 23 inline `style=` → external CSS classes. `src/assets/vs-styles.css` +49 строк (SECTION 6 — 18 новых селекторов с `vs-ki13-*` prefix). `src/master/part_03.html` 2→0 inline styles. `src/master/part_04.html` 21→0 inline styles. Phase 4 SVG integration analysis: Canon migration (iter 7–18) уже удалил все major textual duplicates VS-EMBEDs; 3 retained infographics (2 part_04 + 1 part_07b) — unique, intentional retention (iter 8 principle «viz > dry text»); Phase 4 actual replacement work — low priority, deferred to iter 22+ как optional. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 (unchanged). Canon migration (iter 7–18) unaffected.

### Что сделано в iter 21

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#13 Part 3: 2 inline styles → CSS classes | `.vs-ki13-inset-text strong` (1 селектор, E07 Storage vs Influence inset, descendant selector для 2 `<strong>` элементов). part_03.html: 2→0 inline styles. |
| b | KI#13 Part 4: 21 inline styles → CSS classes | (i) E05 SPINE causal chain panel: 4 селектора (`vs-ki13-spine-chain-panel/heading/text/text strong`) для 8 inline styles (panel + heading + text + 5 strongs). (ii) E06 GHOST Layers ring animation delays: 10 селекторов (`vs-ki13-ring-delay-{0,200,400,500,600,650,700,750,800,850}`) для 10 SVG `transition-delay` inline styles (4 circles + 6 texts). (iii) E06 GHOST Layers ring label titles: 3 селектора (`vs-ki13-ring-title--g3/g2/g1`) для 3 HTML `<div>` color inline styles. part_04.html: 21→0 inline styles. |
| c | Phase 4 SVG integration analysis | Canon migration (iter 7–18) уже удалил все major textual duplicates VS-EMBEDs. 3 retained infographics (2 part_04 + 1 part_07b) — unique, intentional retention (iter 8 principle «viz > dry text»). Candidates для iter 22+ evaluation: Part 7B (0 VS-EMBED) — Greeting algorithm infographic (line 33) потенциальный кандидат на новый VS element (E18+, requires visual-system prototyping). Phase 4 actual replacement — low priority, deferred. |
| d | Validation gates PASS | `validate:master` ✅ (0 errors, 43 inline styles remaining в Part 5-10), `build` ✅ (hash fd3d96d3 unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings pre-existing), `qa:csp` ✅, `qa:bundle` ✅, `qa:doc-versions` ✅. |

### Изменённые файлы в iter 21

| File | Action | Reason |
|------|--------|--------|
| `src/assets/vs-styles.css` | Edited | +49 строк SECTION 6 (18 новых селекторов `vs-ki13-*`: 1 inset-text + 4 spine-chain + 10 ring-delay + 3 ring-title). |
| `src/master/part_03.html` | Edited | 2 inline styles → CSS classes (0 remaining). |
| `src/master/part_04.html` | Edited | 21 inline styles → CSS classes (0 remaining). |
| `STATUS.md` | Rewritten | iter 21 status. |
| `worklog.md` | Updated | iter 21 record (iter 20 → one-liner). |
| `AGENT_NAVIGATION.md` | Updated | §6 pitfall #36 KI#13 progress, §8 iter 21 record, header iter 20 → iter 21. |
| `CHANGELOG.md` | Updated | [9.1.21] entry. |
| `PLAN.md` | Updated | §5 iter 21 → ✅ DONE, iter 22+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 21 row → ✅ DONE. §8 iter 21 stop point + iter 22 priorities + Phase 4 analysis. |
| `docs/canon/_README.md` | Updated | §9 iter 21 entry (KI#13 Part 3+4, Phase 4 analysis). |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 43 inline `style=` remaining (123 - 80 fixed: 57 в iter 20 + 23 в iter 21) в Part 5-10 master HTML. Part 1+2+3+4 ✅ DONE (iter 20+21). Продолжение: Part 5+6 в iter 22, Part 7A в iter 23, Part 8-10 в iter 24.

**KI#14 (CLOSED, iter 16)** — Content duplication VS-EMBED ↔ текст. Все 10 Parts ✅ MIGRATED.

**KI#16 (CLOSED, iter 19)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fixed: external widgets `js-flag.js` + `mermaid-init.js`. `qa:csp` PASS.

**KI#17 (CLOSED, iter 20)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity. Closed iter 20.

**Fix plan (iter 22+):** KI#13 (inline styles → external CSS classes, Part 5+6) — next 6 inline styles (Part 5: 1, Part 6: 5). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

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
| **KI#13 inline styles → CSS (iter 20+21)** | 123 inline styles → 80 fixed (Part 1+2+3+4). 43 remaining (Part 5-10). Naming: `vs-ki13-*` prefix. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
