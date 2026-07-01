# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#13 ✅ **CLOSED** (iter 24, 123/123 = 100%) + KI#14/#16/#17 ✅ CLOSED
> **Дата:** 2026-07-01

---

## Текущее состояние

**iter 24 COMPLETE. KI#13 CLOSED — все 123 inline `style=` → external CSS classes (100%).** Part 9 (6) + Part 10 (12) = 18 inline styles → 19 новых селекторов с `vs-ki13-p9-*` и `vs-ki13-p10-*` sub-namespaces (semantic grouping: 1 indicator position + 4 zone-title color modifiers + 1 quick-checks panel + 1 shared callout-pos base + 11 per-instance top modifiers + 1 card-block-accent). `src/assets/vs-styles.css` +52 строки (SECTION 6). `src/master/part_09.html` 6→0 inline styles. `src/master/part_10.html` 12→0 inline styles. Build hash `fd3d96d3` unchanged. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. **Все master HTML — 0 inline styles.**

### Что сделано в iter 24

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#13 Part 9: 6 inline styles → 6 CSS classes | E14 Quality Scale. 1 positional `bottom:50%` → `.vs-ki13-p9-indicator-mid` (default mid-thermometer). 4 zone-title color overrides → `.vs-ki13-p9-zone-title--{excellent/good/poor/critical}` (mirror parent `.zone-detail--{tier}` border-left-color: violet/cyan/amber/danger). 1 panel max-width → `.vs-ki13-p9-quick-checks` (700px centered). |
| b | KI#13 Part 10: 12 inline styles → 13 CSS classes | E15 Annotated Blueprint. 11 positional `top:Npx; right:20px;` callouts → 1 shared base `.vs-ki13-p10-callout-pos { right: 20px; }` + 11 per-instance top modifiers `.vs-ki13-p10-callout-pos--top-{10/20/100/120/130/250/260/280/290/380/390}` (DRY pattern, position:absolute comes from base `.callout`). 1 border-left+violet on Examples+Anchors card-block → `.vs-ki13-p10-card-block-accent`. |
| c | Validation gates PASS | `validate:master` ✅ (0 errors, **0 inline styles** — was 18), `build` ✅ (hash `fd3d96d3` unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings pre-existing), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |

### Изменённые файлы в iter 24

| File | Action | Reason |
|------|--------|--------|
| `src/assets/vs-styles.css` | Edited | +52 строки SECTION 6 (19 новых селекторов: 6 `vs-ki13-p9-*` + 13 `vs-ki13-p10-*`). |
| `src/master/part_09.html` | Edited | 6 inline styles → CSS classes (0 remaining). E14 Quality Scale: thermometer indicator + 4 zone titles + quick-checks panel. |
| `src/master/part_10.html` | Edited | 12 inline styles → CSS classes (0 remaining). E15 Annotated Blueprint: 11 callouts positional + 1 card-block accent. |
| `assets/vs-styles.css`, `parts/part_09.html`, `parts/part_10.html`, `index.html` | Regenerated | Root fallbacks (build artifact — timestamp updated, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md`, `docs/canon/_README.md` | Updated | iter 24 record. CHANGELOG compressed (iter 21 → one-liner, keep last 3 detailed: 22, 23, 24). |

---

## Known Issues

**Все Known Issues (KI#1..KI#17) ✅ CLOSED.** Активных KI нет.

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED | found iter 5, fixed iter 20-24 (123/123 = 100%) |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 (Canon migration complete) |
| KI#16 (qa:csp FAIL — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1-7 |

**Текущих активных багов нет.** Новые баги — сначала документировать в `STATUS.md` как Known Issue (KI#N), потом фиксить.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated root fallbacks. Не редактировать напрямую. Все правки — в `src/`. После `pnpm run build` fallbacks регенерируются. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canonical Guide Spec (iter 7–18) — COMPLETE** | Все 10 Parts + 3 Appendix ✅ MIGRATED. См. `docs/canon/_README.md` §5. |
| **CSP compliance (iter 19)** | `qa:csp` PASS. Все scripts в `index.html` — `<script src="...">` (external). Inline scripts forbidden. |
| **Inline styles forbidden (iter 24, KI#13 CLOSED)** | Все 123 inline `style=` → external CSS classes с `vs-ki13-*` prefix (60 селекторов: 28 Part 1+2 + 18 Part 3+4 + 5 Part 5+6 + 9 Part 7A + 6 Part 9 + 13 Part 10). Sub-namespaces `vs-ki13-p7a-*`, `vs-ki13-p9-*`, `vs-ki13-p10-*` для semantic grouping. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
