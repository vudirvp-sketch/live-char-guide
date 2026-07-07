# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#13 ✅ CLOSED (iter 24) + Phase 4 SVG: E18 ✅ INTEGRATED (iter 25) + DGA Phase 1 (iter 26, KI#18-A ✅) + DGA Phase 2 (iter 28, KI#18-B ✅ + KI#18-C ✅; iter 29, KI#18-I ✅ + KI#18-F ✅ partial; iter 30, KI#18-D ✅ + KI#18-E ✅ + KI#19 ✅ incidental; iter 31, KI#18-G ✅ + KI#18-H ✅ keep-by-design → **KI#18 ✅ CLOSED**)
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 31 — DGA Phase 2 final (KI#18 ✅ CLOSED).** Документированы rationale для последних 2 pending sub-items KI#18 (G + H). Оба sub-item'а — keep-by-design с documented rationale, без master HTML edit:

- **KI#18-G ✅ CLOSED (keep-by-design)** — `docs/canon/part_08.md`: documented catalog-vs-detail rationale для per-AP sections (AP-1..AP-15) vs E12 Antipattern Catalog viz. Viz = quick scan (15 APs на one screen, severity dots, 1-line Симптом/Причина/Исправление). Per-AP sections = deep-dive reference (concrete thresholds, multi-step solutions, cross-ref links, diff examples, RULE callouts). Different reader intents — не pure re-explanation. No master HTML edit.
- **KI#18-H ✅ CLOSED (keep-by-design)** — `docs/canon/part_10.md`: documented annotation-layer rationale для E15 Annotated Blueprint callouts (Part 10) vs E01 Card Anatomy viz (Part 1). E01 = pure block anatomy (vertical stack). E15 = central card template (Elena) с 4 ANNOTATION LAYERS (structure/anchors/spine/directives) — different visualization pattern. Token budget ranges в E15 callouts ≠ pure budget tables — каждый callout = annotation label, комбинирующий budget range с annotation context. No master HTML edit.

### Что сделано в iter 31 (DGA Phase 2 final)

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#18-G rationale documented | `docs/canon/part_08.md`: front-matter (Last synced → iter 31, Migration status + iter 31 DGA keep-by-design rationale KI#18-G). Added «DGA Phase 2 final (iter 31)» section: catalog-vs-detail rationale table (7 dimensions: Purpose/Symptom/Cause/Fix/Examples/Callouts/Reader intent) + Decision + Validation gates iter 31 PASSED. No master HTML edit. |
| b | KI#18-H rationale documented | `docs/canon/part_10.md`: front-matter (Last synced → iter 31, Migration status + iter 31 DGA keep-by-design rationale KI#18-H). Added «DGA Phase 2 final (iter 31)» section: annotation-layer rationale table (6 dimensions: Purpose/Visualization/Annotation layers/Token budget display/Reader intent/Position in flow) + Decision + Validation gates iter 31 PASSED. No master HTML edit. |
| c | Validation gates PASS | `validate:master` ✅ (0 errors, 23 baseline warnings, no new warnings), `build` ✅ (hash `fd3d96d3` unchanged — no source code change), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings baseline), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |
| d | Root fallbacks | `index.html` timestamp-only change (hash unchanged, no content change). No parts/ files changed (no source code edit). |

### Изменённые файлы в iter 31

| File | Action | Reason |
|------|--------|--------|
| `docs/canon/part_08.md` | Edited | KI#18-G: front-matter + DGA Phase 2 final section (catalog-vs-detail rationale + Decision + Validation gates). No master HTML edit. |
| `docs/canon/part_10.md` | Edited | KI#18-H: front-matter + DGA Phase 2 final section (annotation-layer rationale + Decision + Validation gates). No master HTML edit. |
| `index.html` | Regenerated | Build artifact (timestamp only, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | iter 31 record + KI#18 ✅ CLOSED (G + H keep-by-design). |

---

## Known Issues

**KI#18 ✅ CLOSED.** Deployed Guide Duplication Audit (DGA) — Phase 1 audit complete (iter 26), Phase 2 complete (iter 28-31). All 9 sub-items (A–I) resolved: 7 fixed (A iter 26, B + C iter 28, I + F iter 29, D + E iter 30), 2 keep-by-design (G + H iter 31).

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#18 (Deployed Guide Duplication Audit)** | MEDIUM | ✅ **CLOSED** — 9/9 resolved (7 fixed A+B+C+D+E+I+F, 2 keep-by-design G+H) | found iter 26, A iter 26, B+C iter 28, I+F iter 29, D+E iter 30, G+H iter 31 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED | iter 20–24 (123/123 = 100%) |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 (Canon migration complete) |
| KI#16 (qa:csp FAIL — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#19 (Chinese chars in master HTML part_05 L269) | LOW | ✅ CLOSED | found + fixed iter 30 (incidental during KI#18-E) |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1–7 |

### KI#18 — Deployed Guide Duplication Audit (DGA) — ✅ CLOSED (iter 31)

**Принцип (iter 8+):** `viz > dry text` — визуализация = замещение, не дополнение. Если VS-EMBED показывает концепцию — текст не должен её пере-объяснять. Unique контент не удаляется.

**Audit scope:** 14 master HTML файлов (Part 1–10 + 3 Appendix). Inventory: 16 VS-EMBED elements embedded across 11 Parts.

| Sub | Part | Описание дублирования / inconsistency | Severity | Status |
|-----|------|---------------------------------------|----------|--------|
| **A** | Part 9 | E14 Quality Scale viz (4 zones: Критический/Слабый/Хороший/Отличный) ↔ p9_quality_scale table. «Признаки» col duplicating E14 criteria. Naming «Плохой» vs viz «Слабый». Missing tier «Отличный». | MEDIUM | ✅ FIXED iter 26 |
| **B** | Part 1 | E01 Card Anatomy viz (5 blocks with descriptions) ↔ p1_card_overview table. «Функция» col duplicates E01 `.block-content`. | LOW-MEDIUM | ✅ FIXED iter 28 |
| **C** | Part 2 | E03 Behavioral Anchors viz (T→A→P with descriptions) ↔ p2_basic_anchors table. «Описание» col duplicates E03 `flow-node__desc`. | LOW-MEDIUM | ✅ FIXED iter 28 |
| **D** | Part 4 | E05 SPINE Framework viz (5 nodes with example text) + panel «Причинно-следственная цепь» ↔ p4_spine_overview intro paragraphs partially re-explain SPINE chain shown in viz. | LOW | ✅ FIXED iter 30 (intro trimmed — «фреймворк из 5 элементов» removed; panel inside VS-EMBED kept as canonical E05 source) |
| **E** | Part 5 | E09 OCEAN viz inset «Context Limits» ↔ p5_ocean_basics table (same data). Cross-viz/text semantic inconsistency: viz «1 экстремум» (O=72) vs text «3 экстремальных полюса (O=72, A=38, N=68)». Rule definition unclear — strict <30/>70 vs broad <40/>60. | MEDIUM (semantic bug) | ✅ FIXED iter 30 (aligned к strict rule <30 или >70 — most prevalent; L272+L273+L279 rewritten; «3 экстремальных полюса» → «1 экстремальный + 2 cautious zone») |
| **F** | Part 6 | E11 CoT viz (4 tiers with name + model-pill + format) ↔ p6_cot_tiers table. «Формат» col duplicating E11 `stair-step__name`. «Для моделей» + «Пример» cols partial duplication (model-pill + stair-step__format Russian versions). | LOW-MEDIUM | ✅ FIXED iter 29 (partial — «Формат» dropped; «Для моделей» + «Пример» DEFERRED) |
| **G** | Part 8 | E12 Antipatterns viz (15 AP cards with Симптом/Причина/Исправление) ↔ per-AP sections repeat same structure. Design pattern (catalog vs detail) — partially intentional. | LOW (by design) | ✅ CLOSED iter 31 (keep-by-design — catalog vs detail rationale documented in `docs/canon/part_08.md`) |
| **H** | Part 10 | E15 Annotated Blueprint callouts (token budgets) duplicate E01 in Part 1. Cross-Part duplication, but integrated into annotation layer (contextually relevant). | LOW (intentional annotation) | ✅ CLOSED iter 31 (keep-by-design — annotation layer rationale documented in `docs/canon/part_10.md`) |
| **I** | Part 2 | E04 Embodiment Protocol viz (funnel-stack 4 layers: State→Body→Sensor→Speech with depth-labels + examples) ↔ p2_embodiment table. «Описание» col duplicates E04 `depth-label`. Same pattern as KI#18-C. | LOW-MEDIUM | ✅ FIXED iter 29 |

**Conclusion:** DGA Phase 1 (audit) COMPLETE iter 26. Phase 2 COMPLETE iter 28-31. All 9 sub-items resolved: 7 fixed (A+B+C+D+E+I+F), 2 keep-by-design (G+H with documented rationale). KI#18 ✅ CLOSED iter 31. Принцип `viz > dry text` сохраняется. Unique контент не удаляется даже при дублировании. Новые баги — сначала документировать в `STATUS.md` как KI#N, потом фиксить.

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
| **Inline styles forbidden (iter 24, KI#13 CLOSED)** | Все 123 inline `style=` → external CSS classes с `vs-ki13-*` prefix (60 селекторов). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. E18 (Greeting Algorithm) — iter 25, Part 7B. Все 18 embeded в master HTML, styles в `src/assets/vs-styles.css` SECTION 5, extracts в `visual-system/integration/component-extracts/`. |
| **Deployed Guide Audit (iter 26-31) — COMPLETE** | KI#18 ✅ CLOSED iter 31. Phase 1 audit done iter 26 (8 sub-items A–H + I). Phase 2 complete iter 28-31: 7 fixed (A+B+C+D+E+I+F), 2 keep-by-design (G+H with documented rationale). KI#19 (Chinese chars) CLOSED iter 30. Принцип: `viz > dry text` — текст не должен пере-объяснять то, что уже показано в VS-EMBED. См. §«Known Issues» KI#18 above. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
