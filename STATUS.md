# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED + KI#13 ✅ CLOSED (iter 24) + E18 ✅ INTEGRATED (iter 25) + DGA ✅ COMPLETE (iter 26-31, KI#18 ✅ CLOSED 9/9) + **KI#20 ✅ CLOSED (iter 32 — Visual System Scroll-Animation Bug)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 32 — Visual System Scroll-Animation Bug (KI#20) ✅ CLOSED.** Найден и исправлен системный визуальный баг: 5 из 18 VS-EMBED элементов (E06, E07, E08, E09, E15) отображались частично/поломанно на собранном сайте из-за того, что их SVG/HTML animation-class элементы не имели `scroll-enter` класса и не наблюдались `IntersectionObserver`. Фикс — расширение селектора в `vs-scroll-observer.js`.

- **KI#20-A ✅ FIXED** — E06 (Part 4): 4 `.ring-anim` + 6 `.ring-text-anim` SVG circles/texts — кольца GHOST и текстовые метки невидимы.
- **KI#20-B ✅ FIXED** — E07 (Part 3): 3 `.bar-rect` SVG rects — столбцы Voice Hierarchy невидимы.
- **KI#20-C ✅ FIXED** — E08 (Part 7A): 8 `.anim-group` + 1 `.center-pulse` SVG groups/circles — ноды Core Directives невидимы.
- **KI#20-D ✅ FIXED** — E09 (Part 5): 4 `.pentagon-anim` + 6 `.profile-anim` SVG polygons/circles — OCEAN pentagon + профиль невидимы.
- **KI#20-E ✅ FIXED** — E15 (Part 10): 11 `.callout` divs — annotation callouts Annotated Blueprint невидимы.

**Root cause:** KI#16 (iter 19, CSP compliance) вырезал inline `<script>` из VS-EMBED элементов, в которых local `IntersectionObserver` наблюдал animation classes (`.ring-anim`, `.bar-rect` и т.д.). Замена `vs-scroll-observer.js` наблюдала только `.scroll-enter, .enneagram-anim, .type-node` — не покрывала остальные animation classes.

**Fix:** расширение `SCROLL_ENTER_SELECTOR` в `src/shell/widgets/vs-scroll-observer.js` (+ root fallback `widgets/vs-scroll-observer.js`) для наблюдения всех animation classes: `.ring-anim, .ring-text-anim, .bar-rect, .anim-group, .center-pulse, .pentagon-anim, .profile-anim, .callout`. Single-file edit, без master HTML изменений.

### Изменённые файлы в iter 32

| File | Action | Reason |
|------|--------|--------|
| `src/shell/widgets/vs-scroll-observer.js` | Edited | KI#20: extended `SCROLL_ENTER_SELECTOR` to include `.ring-anim, .ring-text-anim, .bar-rect, .anim-group, .center-pulse, .pentagon-anim, .profile-anim, .callout`. |
| `widgets/vs-scroll-observer.js` | Regenerated | Root fallback (копия `src/shell/widgets/`). |
| `README_iter18.md`, `README_ITER8_MERGE.md`, `ITER9_PATCH_README.md` | Deleted | Stale iter-specific READMEs, superseded by current STATUS/worklog/CHANGELOG. |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | iter 32 record + KI#20 ✅ CLOSED + cleanup. |

---

## Known Issues

Все Known Issues ✅ CLOSED. Новые баги — сначала документировать в `STATUS.md` как KI#N, потом фиксить.

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#20 (Visual System Scroll-Animation Bug)** | HIGH | ✅ **CLOSED** — 5/5 sub-items fixed (A-E) | found + fixed iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 (7 fixed + 2 keep-by-design) | iter 26-31 |
| KI#19 (Chinese chars in part_05 L269) | LOW | ✅ CLOSED | iter 30 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 |
| KI#16 (qa:csp — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1-7 |

### KI#20 — Visual System Scroll-Animation Bug ✅ CLOSED (iter 32)

**Symptom:** На собранном сайте 5 из 18 VS-EMBED элементов отображались поломанно — SVG-кольца GHOST (E06), столбцы Voice Hierarchy (E07), ноды Core Directives (E08), OCEAN pentagon + профиль (E09), annotation callouts Annotated Blueprint (E15) были невидимы или отображались частично, создавая эффект "наезжающих друг на друга" и "хаотичного неполного отображения".

**Root cause:** CSS правила для animation classes (`.ring-anim`, `.bar-rect`, `.anim-group`, `.pentagon-anim`, `.callout` и др.) задают initial state `opacity: 0` / `transform: scale(0)`, переход к visible state требует `.is-visible` class на том же элементе. Local `IntersectionObserver` в standalone element HTML файлах (`visual-system/elements/E0X-*.html`) наблюдал эти классы напрямую. Но при embedding в master HTML inline scripts вырезались (KI#16, CSP compliance, iter 19) — замена `vs-scroll-observer.js` наблюдала только `.scroll-enter, .enneagram-anim, .type-node`, не покрывая остальные animation classes. Элементы оставались в initial state навсегда.

**Fix:** Single-file edit — расширение `SCROLL_ENTER_SELECTOR` в `src/shell/widgets/vs-scroll-observer.js`:

```js
// BEFORE (iter 5/19):
var SCROLL_ENTER_SELECTOR = '.scroll-enter, .enneagram-anim, .type-node';

// AFTER (iter 32):
var SCROLL_ENTER_SELECTOR = '.scroll-enter, .enneagram-anim, .type-node, ' +
  '.ring-anim, .ring-text-anim, ' +     // E06
  '.bar-rect, ' +                       // E07
  '.anim-group, .center-pulse, ' +      // E08
  '.pentagon-anim, .profile-anim, ' +   // E09
  '.callout';                           // E15
```

После `pnpm run build` root fallback `widgets/vs-scroll-observer.js` регенерируется из `src/shell/widgets/`.

| Sub | Part | Element | Animation classes | Элементов | Status |
|-----|------|---------|-------------------|-----------|--------|
| A | Part 4 | E06 GHOST Layers | `.ring-anim`, `.ring-text-anim` | 10 | ✅ FIXED iter 32 |
| B | Part 3 | E07 Voice Hierarchy | `.bar-rect` | 3 | ✅ FIXED iter 32 |
| C | Part 7A | E08 Core Directives | `.anim-group`, `.center-pulse` | 9 | ✅ FIXED iter 32 |
| D | Part 5 | E09 OCEAN Pentagon | `.pentagon-anim`, `.profile-anim` | 10 | ✅ FIXED iter 32 |
| E | Part 10 | E15 Annotated Blueprint | `.callout` | 11 | ✅ FIXED iter 32 |

**Affected total:** 43 animation elements across 5 VS-EMBEDs (E01-E05, E10-E14, E16-E18 — не затронуты, их animation classes уже имели `scroll-enter` или наблюдались `vs-scroll-observer.js`).

**Правило (iter 32+):** при добавлении нового VS-EMBED с animation classes — проверить, что `vs-scroll-observer.js` `SCROLL_ENTER_SELECTOR` включает эти классы, ИЛИ что элементы имеют `scroll-enter` class. Иначе элементы останутся невидимыми на собранном сайте. Audit script: `scripts/audit_vs_embeds.py`.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated. Не редактировать напрямую. Все правки — в `src/`. После `pnpm run build` fallbacks регенерируются. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canonical Guide Spec (iter 7-18) — COMPLETE** | Все 10 Parts + 3 Appendix ✅ MIGRATED. См. `docs/canon/_README.md` §5. |
| **CSP compliance (iter 19)** | `qa:csp` PASS. Все scripts в `index.html` — `<script src="...">` (external). Inline scripts forbidden. |
| **Inline styles forbidden (iter 24, KI#13 CLOSED)** | Все 123 inline `style=` → external CSS classes с `vs-ki13-*` prefix (60 селекторов). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Все 18 embeded в master HTML, styles в `src/assets/vs-styles.css` SECTION 5, extracts в `visual-system/integration/component-extracts/`. |
| **VS scroll-animation observer (iter 32, KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает `.scroll-enter, .enneagram-anim, .type-node, .ring-anim, .ring-text-anim, .bar-rect, .anim-group, .center-pulse, .pentagon-anim, .profile-anim, .callout`. При добавлении нового animation class — добавить в selector. |
| **DGA COMPLETE (iter 26-31, KI#18 CLOSED)** | 9/9 sub-items resolved (7 fixed + 2 keep-by-design). Принцип `viz > dry text` — текст не должен пере-объяснять VS-EMBED. Catalog vs Detail / Annotation Layer patterns — keep-by-design с documented rationale. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
