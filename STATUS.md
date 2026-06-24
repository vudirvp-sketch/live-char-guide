# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#16 ✅ CLOSED (iter 19)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 19 COMPLETE.** KI#16 fix: 2 inline `<script>` блока в `src/shell/index.html` вынесены в external widget JS. Созданы `src/shell/widgets/js-flag.js` (early `js` class flag, sync в `<head>` для FOUC prevention) + `src/shell/widgets/mermaid-init.js` (mermaid.initialize с dark theme + brand colors, sync после mermaid CDN, устанавливает `mermaid._initialized = true` для skip redundant init в lazy-loader.js). `src/shell/index.html` updated: 2 inline `<script>` → 2 `<script src="widgets/...">`. Build regenerated root `index.html` + `widgets/` (17 files, +2). Build hash: `df283246` → `fd3d96d3`. `qa:csp` PASS (0 inline scripts). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. Canon migration (iter 7–18) unaffected.

### Что сделано в iter 19

| # | Задача | Результат |
|---|--------|-----------|
| a | `src/shell/widgets/js-flag.js` created | Tiny external script (~50 bytes body): `document.documentElement.classList.add('js')`. Загружается sync в `<head>` — FOUC prevention сохранён. |
| b | `src/shell/widgets/mermaid-init.js` created | External mermaid.initialize (dark theme + themeVariables + flowchart config). Safety guard: `if (typeof mermaid !== 'undefined' && typeof mermaid.initialize === 'function')`. Sets `mermaid._initialized = true` — lazy-loader.js пропускает redundant init. |
| c | `src/shell/index.html` edited | 2 inline `<script>` → 2 `<script src="widgets/...">` с KI#16 fix comment. Build comments + KI#16 fix markers. |
| d | Build regenerated | `pnpm run build` SUCCESS. Root `index.html`, `widgets/` (15→17 files), `build.hash` (df283246→fd3d96d3) перегенерированы. `dist/` артефакт обновлён. |
| e | Validation gates PASS | `qa:csp` ✅ (0 inline scripts), `validate:master` ✅ (KI#13 baseline, no regression), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings — 10 pre-existing + 3 new из mermaid-init.js, expected `no-undef` для mermaid global, matches lazy-loader.js pattern), `qa:bundle` ✅, `qa:doc-versions` ✅. |

### Изменённые файлы в iter 19

| File | Action | Reason |
|------|--------|--------|
| `src/shell/widgets/js-flag.js` | Created | External early `js` class flag (KI#16 fix). |
| `src/shell/widgets/mermaid-init.js` | Created | External mermaid.initialize (KI#16 fix). |
| `src/shell/index.html` | Edited | 2 inline `<script>` → 2 `<script src="widgets/...">`. |
| `index.html` | Regenerated | Root fallback (build artifact). |
| `widgets/js-flag.js` | Regenerated | Root fallback (build artifact). |
| `widgets/mermaid-init.js` | Regenerated | Root fallback (build artifact). |
| `build.hash` | Regenerated | `df283246` → `fd3d96d3`. |
| `STATUS.md` | Rewritten | iter 19 status, KI#16 CLOSED. |
| `worklog.md` | Updated | iter 19 record (iter 18 → one-liner). |
| `AGENT_NAVIGATION.md` | Updated | §6 pitfall #34 → CLOSED, §8 iter 19 record, header iter 18 → iter 19. |
| `CHANGELOG.md` | Updated | [9.1.19] entry. |
| `PLAN.md` | Updated | §5 iter 19 → ✅ DONE, iter 20+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 19 row → ✅ DONE. §8 iter 19 stop point + iter 20 priorities. |
| `docs/canon/_README.md` | Updated | §9 iter 19 entry (KI#16 fix, no Canon changes). |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 123 inline `style=` + 1 "content outside section" warning в master HTML. Defer до iter 20+.

**KI#14 (CLOSED, iter 16)** — Content duplication VS-EMBED ↔ текст. Все 10 Parts ✅ MIGRATED.

**KI#16 (CLOSED, iter 19)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fixed: external widgets `js-flag.js` + `mermaid-init.js`. `qa:csp` PASS.

**KI#17 (ACTIVE, LOW, found iter 10)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity.

**Fix plan (iter 20+):** KI#13 (inline styles → external CSS classes) + Phase 4 actual SVG integration (заменить textual content на VS-EMBED где возможно). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

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
| **Migration principle: viz > dry text (iter 8)** | Визуализация = замещение, dry-дублирующий текст удаляется. Применяется «очень деликатно». |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
