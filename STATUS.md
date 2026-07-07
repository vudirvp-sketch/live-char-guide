# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#13 ✅ CLOSED (iter 24) + Phase 4 SVG: E18 ✅ INTEGRATED (iter 25) + DGA Phase 1 (iter 26, KI#18-A ✅) + DGA Phase 2 (iter 28, KI#18-B ✅ + KI#18-C ✅; iter 29, KI#18-I ✅ + KI#18-F ✅ partial)
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 29 — DGA Phase 2 continued (2 fixes applied).** Применены 2 safe fix из 6 pending sub-items KI#18:

- **KI#18-I FIXED** — `src/master/part_02.html` p2_embodiment table: drop duplicate «Описание» column (повторял E04 `depth-label`), expand intro paragraph linking to E04 viz. 4 cols → 3 cols (# / Слой / Пример). part_02: 415 → 415 (0 net).
- **KI#18-F FIXED (partial)** — `src/master/part_06.html` p6_cot_tiers table: drop duplicate «Формат» column (повторял E11 `stair-step__name`), add intro paragraph linking to E11 viz. 4 cols → 3 cols (Tier / Для моделей / Пример). part_06: 259 → 261 (+2). «Для моделей» + «Пример» cols partial duplication оставлено (accessibility — русские переводы) — DEFERRED.

### Что сделано в iter 29 (DGA Phase 2 continued)

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#18-I fix (Part 2) | `src/master/part_02.html` p2_embodiment table: 4 cols (#/Слой/Описание/Пример) → 3 cols (#/Слой/Пример). Drop «Описание» (duplicate of E04 `depth-label`). Expand intro paragraph linking to E04. 415 → 415 (0 net). |
| b | KI#18-F fix (Part 6, partial) | `src/master/part_06.html` p6_cot_tiers table: 4 cols (Tier/Формат/Для моделей/Пример) → 3 cols (Tier/Для моделей/Пример). Drop «Формат» (duplicate of E11 `stair-step__name`). Add intro paragraph linking to E11. 259 → 261 (+2). «Для моделей» + «Пример» partial duplication DEFERRED. |
| c | Canon updates | `docs/canon/part_02.md` + `docs/canon/part_06.md`: front-matter (Last synced → iter 29, Migration status + iter 29 DGA fix), tables rewritten, migration history rows updated, DGA Phase 2 fix sections + validation gates iter 29 added. |
| d | Validation gates PASS | `validate:master` ✅ (0 errors, baseline warnings, no part_02/part_06 warnings), `build` ✅ (hash `fd3d96d3` unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings baseline), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |
| e | Root fallbacks verified | `parts/part_02.html` + `parts/part_06.html` regenerated with fixes. `index.html` timestamp-only change (hash unchanged). |

### Изменённые файлы в iter 29

| File | Action | Reason |
|------|--------|--------|
| `src/master/part_02.html` | Edited | KI#18-I: drop «Описание» column, expand intro paragraph linking to E04. 415 → 415 (0 net). |
| `src/master/part_06.html` | Edited | KI#18-F: drop «Формат» column, add intro paragraph linking to E11. 259 → 261 (+2). |
| `docs/canon/part_02.md` | Edited | KI#18-I: front-matter, table rewritten, migration history, DGA Phase 2 fix section + validation gates. |
| `docs/canon/part_06.md` | Edited | KI#18-F: front-matter, table rewritten, migration history, DGA Phase 2 fix section + validation gates. |
| `parts/part_02.html` | Regenerated | Root fallback (build artifact, fix propagated). |
| `parts/part_06.html` | Regenerated | Root fallback (build artifact, fix propagated). |
| `index.html` | Regenerated | Root fallback (timestamp only, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | iter 29 record + KI#18-I/F closed. |

---

## Known Issues

**KI#18 ACTIVE.** Deployed Guide Duplication Audit (DGA) — Phase 1 audit complete (iter 26), Phase 2 in progress (iter 28-29). 9 sub-items identified (A–I), 5 fixed (A iter 26, B + C iter 28, I + F iter 29), 4 pending (D, E, G, H).

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#18 (Deployed Guide Duplication Audit)** | MEDIUM | **🟡 ACTIVE — 5/9 fixed (A, B, C, I, F), 4 pending (D, E, G, H)** | found iter 26, A fixed iter 26, B+C fixed iter 28, I+F fixed iter 29 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED | iter 20–24 (123/123 = 100%) |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 (Canon migration complete) |
| KI#16 (qa:csp FAIL — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1–7 |

### KI#18 — Deployed Guide Duplication Audit (DGA) — Detailed

**Принцип (iter 8+):** `viz > dry text` — визуализация = замещение, не дополнение. Если VS-EMBED показывает концепцию — текст не должен её пере-объяснять. Unique контент не удаляется.

**Audit scope:** 14 master HTML файлов (Part 1–10 + 3 Appendix). Inventory: 16 VS-EMBED elements embedded across 11 Parts.

| Sub | Part | Описание дублирования / inconsistency | Severity | Status |
|-----|------|---------------------------------------|----------|--------|
| **A** | Part 9 | E14 Quality Scale viz (4 zones: Критический/Слабый/Хороший/Отличный) ↔ p9_quality_scale table. «Признаки» col duplicating E14 criteria. Naming «Плохой» vs viz «Слабый». Missing tier «Отличный». | MEDIUM | ✅ FIXED iter 26 |
| **B** | Part 1 | E01 Card Anatomy viz (5 blocks with descriptions) ↔ p1_card_overview table. «Функция» col duplicates E01 `.block-content`. | LOW-MEDIUM | ✅ FIXED iter 28 |
| **C** | Part 2 | E03 Behavioral Anchors viz (T→A→P with descriptions) ↔ p2_basic_anchors table. «Описание» col duplicates E03 `flow-node__desc`. | LOW-MEDIUM | ✅ FIXED iter 28 |
| **D** | Part 4 | E05 SPINE Framework viz (5 nodes with example text) + panel «Причинно-следственная цепь» ↔ p4_spine_overview intro paragraphs partially re-explain SPINE chain shown in viz. | LOW | ⏳ pending iter 30+ |
| **E** | Part 5 | E09 OCEAN viz inset «Context Limits» ↔ p5_ocean_basics table (same data). Cross-viz/text semantic inconsistency: viz «1 экстремум» (O=72) vs text «3 экстремальных полюса (O=72, A=38, N=68)». Rule definition unclear — strict <30/>70 vs broad <40/>60. | MEDIUM (semantic bug) | ⏳ pending iter 30+ (needs careful rule alignment, NOT trivial fix) |
| **F** | Part 6 | E11 CoT viz (4 tiers with name + model-pill + format) ↔ p6_cot_tiers table. «Формат» col duplicating E11 `stair-step__name`. «Для моделей» + «Пример» cols partial duplication (model-pill + stair-step__format Russian versions). | LOW-MEDIUM | ✅ FIXED iter 29 (partial — «Формат» dropped; «Для моделей» + «Пример» DEFERRED) |
| **G** | Part 8 | E12 Antipatterns viz (15 AP cards with Симптом/Причина/Исправление) ↔ per-AP sections repeat same structure. Design pattern (catalog vs detail) — partially intentional. | LOW (by design) | ⏳ pending iter 30+ (likely keep, document rationale) |
| **H** | Part 10 | E15 Annotated Blueprint callouts (token budgets) duplicate E01 in Part 1. Cross-Part duplication, but integrated into annotation layer (contextually relevant). | LOW (intentional annotation) | ⏳ pending iter 30+ (likely keep, document rationale) |
| **I** | Part 2 | E04 Embodiment Protocol viz (funnel-stack 4 layers: State→Body→Sensor→Speech with depth-labels + examples) ↔ p2_embodiment table. «Описание» col duplicates E04 `depth-label`. Same pattern as KI#18-C. | LOW-MEDIUM | ✅ FIXED iter 29 |

**iter 30+ roadmap (DGA Phase 2 continued):** Next priority: **KI#18-D** (Part 4 SPINE intro — careful, partial re-explanation; needs careful analysis to not break the section flow). Then **KI#18-E** (Part 5 OCEAN — needs careful rule alignment: strict <30/>70 vs broad <40/>60 definition; viz «1 экстремум» vs text «3 экстремальных полюса» — semantic bug). **KI#18-G** (Part 8 per-AP sections — by design, document rationale) + **KI#18-H** (Part 10 E15 callouts — intentional annotation, document rationale) likely keep-by-design with documented rationale.

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
| **Deployed Guide Audit (iter 26+) — ONGOING** | KI#18 ACTIVE. Phase 1 audit done (iter 26, 8 sub-items A–H). Phase 2 in progress (iter 28-29, 5/9 fixed: A+B+C+I+F, 4 pending: D+E+G+H). Принцип: `viz > dry text` — текст не должен пере-объяснять то, что уже показано в VS-EMBED. См. §«Known Issues» KI#18 above. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
