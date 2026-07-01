# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#13 ✅ CLOSED (iter 24, 123/123 = 100%) + Phase 4 SVG integration: E18 Greeting Algorithm ✅ INTEGRATED (iter 25)
> **Дата:** 2026-07-01

---

## Текущее состояние

**iter 25 COMPLETE. Phase 4 SVG integration — E18 Greeting Algorithm.** Создан новый VS element E18 (4-step pipeline: Sensory Anchor → Тело FLAW → Реплика → Крючок). Тextual `infographic inf-pipeline` блок в `src/master/part_07b.html` (lines 33–61 pre-iter-25) заменён на VS-EMBED E18 (migration principle «viz > dry text»). Step 2 (Тело FLAW) использует `.pipeline-node__box--spine` (violet — SPINE connection). E18 reuses E02 `.pipeline-*` classes + new `.pipeline-node__code` for technique sequence. Standalone prototype: `visual-system/elements/E18-greeting-algorithm.html`. Component extracts: 3 новых файла в `visual-system/integration/component-extracts/`. E18 styles (+12 строк) appended to `src/assets/vs-styles.css` SECTION 5 (header E01–E17 → E01–E18). part_07b: 371 → 424 строк (+53, E18 markup). Build hash `fd3d96d3` unchanged. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS.

### Что сделано в iter 25

| # | Задача | Результат |
|---|--------|-----------|
| a | E18 standalone prototype | `visual-system/elements/E18-greeting-algorithm.html` (новый). E02-pattern pipeline: 4 nodes (Sensory Anchor → Тело FLAW → Реплика → Крючок) + 3 SVG arrows + scroll animations. Mini-map nav с E18 active в «Продвинутые» group. Footer badges: E05 (SPINE), E04 (Embodiment), E03 (Behavioral Anchor). |
| b | E18 component extracts | 3 новых файла в `visual-system/integration/component-extracts/`: `E18-visual.html` (main markup), `E18-styles.css` (`.pipeline-node__code` only — rest reused from E02), `E18-script.js` (IntersectionObserver, same as E02). |
| c | vs-styles.css SECTION 5 update | `src/assets/vs-styles.css`: header E01–E17 → E01–E18, +12 строк (`.pipeline-node__code` style, E18 comment block). E18 reuses E02 `.pipeline-container/main/node/box/label/sublabel/step/arrow` classes (already in SECTION 5). |
| d | Master HTML Part 7B integration | `src/master/part_07b.html`: textual `infographic inf-pipeline` (lines 33–61 pre-iter-25) → VS-EMBED E18 (lines 28–110 iter 25). Intro `<p>` обновлён: added reference to VS-EMBED E18. Sensory Anchor paragraph + Elena example `<details>` + rules h4+ul — retained (unique content). |
| e | INTEGRATION-MAP.md update | `visual-system/integration/INTEGRATION-MAP.md`: E18 row added в mapping table + E18 extracts listed в structure tree. |
| f | Canon part_07b.md update | `docs/canon/part_07b.md`: front-matter (VS elements embedded: E18, Last synced: 2026-07-01 iter 25, Migration status: ✅ MIGRATED iter 16 + ✅ E18 iter 25). §7B.2 row 2 retention note updated. +iter 25 update section + validation gates. Line count 371 → 424. |
| g | Validation gates PASS | `validate:master` ✅ (0 errors, 0 inline styles, expected content-outside-section warnings — same as E02 in part_07a), `build` ✅ (hash `fd3d96d3` unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings pre-existing), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |

### Изменённые файлы в iter 25

| File | Action | Reason |
|------|--------|--------|
| `visual-system/elements/E18-greeting-algorithm.html` | Created | New VS element E18 standalone prototype (E02-pattern, 4-step pipeline). |
| `visual-system/integration/component-extracts/E18-visual.html` | Created | E18 visual markup extract (pipeline-container + 4 nodes + 3 arrows). |
| `visual-system/integration/component-extracts/E18-styles.css` | Created | E18 styles extract (`.pipeline-node__code` + 4-node stagger delays). |
| `visual-system/integration/component-extracts/E18-script.js` | Created | E18 script extract (IntersectionObserver, same as E02). |
| `visual-system/integration/INTEGRATION-MAP.md` | Edited | +E18 row в mapping table + E18 extracts listed в structure tree. |
| `src/assets/vs-styles.css` | Edited | SECTION 5 header E01–E17 → E01–E18, +12 строк (`.pipeline-node__code` + E18 comment block). |
| `src/master/part_07b.html` | Edited | Textual `infographic inf-pipeline` (lines 33–61) → VS-EMBED E18 (lines 28–110). Intro `<p>` updated. part_07b: 371 → 424 строк (+53). |
| `docs/canon/part_07b.md` | Edited | Front-matter (VS elements: E18, Last synced iter 25, Migration status +E18). §7B.2 row 2 retention note. +iter 25 update section + validation gates. |
| `assets/vs-styles.css`, `parts/part_07b.html`, `index.html` | Regenerated | Root fallbacks (build artifact — timestamp updated, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md`, `docs/canon/_README.md` | Updated | iter 25 record. Cleanup: CHANGELOG compressed (iter 22 → one-liner), canon _README §9 compressed (iter 7–22 → one-liner). |

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
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. E18 (Greeting Algorithm) — iter 25, Part 7B. Все 18 embeded в master HTML, styles в `src/assets/vs-styles.css` SECTION 5, extracts в `visual-system/integration/component-extracts/`. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
