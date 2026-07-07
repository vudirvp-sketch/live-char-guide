# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#13 ✅ CLOSED (iter 24) + Phase 4 SVG: E18 ✅ INTEGRATED (iter 25) + DGA Phase 1 (iter 26, KI#18-A ✅) + DGA Phase 2 (iter 28, KI#18-B ✅ + KI#18-C ✅)
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 28 — DGA Phase 2 (2 fixes applied).** Применены 2 safe fix из 7 pending sub-items KI#18:

- **KI#18-B FIXED** — `src/master/part_01.html` p1_card_overview table: drop duplicate «Функция» column (повторял E01 `.block-content`), add intro paragraph linking to E01 viz. part_01: 365 → 367 (+1).
- **KI#18-C FIXED** — `src/master/part_02.html` p2_basic_anchors table: drop duplicate «Описание» column (повторял E03 `flow-node__desc`), expand intro paragraph linking to E03. part_02: 415 → 415 (0 net — intro replaced, table cells shortened).

**Найден новый баг (KI#18-I, iter 28):** Part 2 `p2_embodiment` table (line 324) — тот же паттерн: «Описание» column дублирует E04 viz (Embodiment funnel-stack 4 layers). Не зафиксён — только задокументирован для iter 29+.

**iter 26 COMPLETE (DGA Phase 1 — STARTED):** Полный аудит 14 master HTML файлов выявил 8 duplication/inconsistency кейсов (KI#18 A–H). 1 fix применён (KI#18-A: Part 9 Quality Scale — drop «Признаки» col, rename «Плохой» → «Слабый», add «Отличный» row).

### Что сделано в iter 28 (DGA Phase 2)

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#18-B fix (Part 1) | `src/master/part_01.html` p1_card_overview table: 4 cols (Блок/Функция/Влияние/Доля) → 3 cols (Блок/Влияние/Доля). Drop «Функция» (duplicate of E01 `.block-content`). Add intro paragraph linking to E01 viz (pattern KI#18-A). 365 → 367 (+1). |
| b | KI#18-C fix (Part 2) | `src/master/part_02.html` p2_basic_anchors table: 4 cols (#/Этап/Описание/Пример) → 3 cols (#/Этап/Пример). Drop «Описание» (duplicate of E03 `flow-node__desc`). Expand intro paragraph linking to E03. 415 → 415 (0 net). |
| c | Canon updates | `docs/canon/part_01.md` + `docs/canon/part_02.md`: front-matter (Last synced → iter 28, Migration status + iter 28 DGA fix), table rewritten, migration history row updated, DGA Phase 2 fix section + validation gates iter 28 added. |
| d | Validation gates PASS | `validate:master` ✅ (0 errors, baseline warnings, no part_01/part_02 warnings), `build` ✅ (hash `fd3d96d3` unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings baseline), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |
| e | Root fallbacks verified | `parts/part_01.html` + `parts/part_02.html` regenerated with fixes. `index.html` timestamp-only change (hash unchanged). |
| f | New bug documented | **KI#18-I NEW** — Part 2 `p2_embodiment` table (line 324): «Описание» column duplicates E04 viz (Embodiment funnel-stack). Documented for iter 29+. |

### Изменённые файлы в iter 28

| File | Action | Reason |
|------|--------|--------|
| `src/master/part_01.html` | Edited | KI#18-B: drop «Функция» column, add intro paragraph linking to E01. 365 → 367 (+1). |
| `src/master/part_02.html` | Edited | KI#18-C: drop «Описание» column, expand intro paragraph linking to E03. 415 → 415 (0 net). |
| `docs/canon/part_01.md` | Edited | KI#18-B: front-matter, table rewritten, migration history row 6, DGA Phase 2 fix section + validation gates. |
| `docs/canon/part_02.md` | Edited | KI#18-C: front-matter, table rewritten, migration history row 3, DGA Phase 2 fix section + validation gates. |
| `parts/part_01.html` | Regenerated | Root fallback (build artifact, fix propagated). |
| `parts/part_02.html` | Regenerated | Root fallback (build artifact, fix propagated). |
| `index.html` | Regenerated | Root fallback (timestamp only, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md` | Updated | iter 28 record + KI#18-B/C closed + KI#18-I documented. |

---

## Known Issues

**KI#18 ACTIVE.** Deployed Guide Duplication Audit (DGA) — Phase 1 audit complete (iter 26), Phase 2 in progress (iter 28). 8 sub-items identified (A–H), 3 fixed (A iter 26, B + C iter 28), 5 pending (D–H). 1 new sub-item found iter 28 (I).

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#18 (Deployed Guide Duplication Audit)** | MEDIUM | **🟡 ACTIVE — 3/9 fixed (A, B, C), 6 pending (D, E, F, G, H, I)** | found iter 26, A fixed iter 26, B+C fixed iter 28, I found iter 28 |
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
| **D** | Part 4 | E05 SPINE Framework viz (5 nodes with example text) + panel «Причинно-следственная цепь» ↔ p4_spine_overview intro paragraphs partially re-explain SPINE chain shown in viz. | LOW | ⏳ pending iter 29+ |
| **E** | Part 5 | E09 OCEAN viz inset «Context Limits» ↔ p5_ocean_basics table (same data). Cross-viz/text semantic inconsistency: viz «1 экстремум» (O=72) vs text «3 экстремальных полюса (O=72, A=38, N=68)». Rule definition unclear — strict <30/>70 vs broad <40/>60. | MEDIUM (semantic bug) | ⏳ pending iter 29+ (needs careful rule alignment, NOT trivial fix) |
| **F** | Part 6 | E11 CoT viz (4 tiers with format) ↔ p6_cot_tiers table. «Формат» + «Пример» cols largely duplicate E11 `stair-step__format`. | LOW-MEDIUM | ⏳ pending iter 29+ |
| **G** | Part 8 | E12 Antipatterns viz (15 AP cards with Симптом/Причина/Исправление) ↔ per-AP sections repeat same structure. Design pattern (catalog vs detail) — partially intentional. | LOW (by design) | ⏳ pending iter 29+ (likely keep, document rationale) |
| **H** | Part 10 | E15 Annotated Blueprint callouts (token budgets) duplicate E01 in Part 1. Cross-Part duplication, but integrated into annotation layer (contextually relevant). | LOW (intentional annotation) | ⏳ pending iter 29+ (likely keep, document rationale) |
| **I** | Part 2 | E04 Embodiment Protocol viz (funnel-stack 4 layers: State→Body→Sensor→Speech with examples) ↔ p2_embodiment table (4 rows: #/Слой/Описание/Пример). «Описание» col duplicates E04 layer desc. Same pattern as KI#18-C. | LOW-MEDIUM | ⏳ pending iter 29+ (NEW, found iter 28 during KI#18-C fix) |

**iter 29+ roadmap (DGA Phase 2 continued):** Next priority: **KI#18-I** (Part 2 p2_embodiment — same fix pattern as KI#18-C, low risk). Then **F** (Part 6 p6_cot_tiers — drop «Формат» col). **D** (Part 4 SPINE intro — careful, partial re-explanation). **E** (Part 5 OCEAN — needs careful rule alignment: strict <30/>70 vs broad <40/>60 definition). **G** + **H** likely keep-by-design with documented rationale.

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
| **Deployed Guide Audit (iter 26+) — ONGOING** | KI#18 ACTIVE. Phase 1 audit done (iter 26, 8 sub-items A–H). Phase 2 in progress (iter 28, 3/9 fixed: A+B+C, 6 pending: D+E+F+G+H+I). Принцип: `viz > dry text` — текст не должен пере-объяснять то, что уже показано в VS-EMBED. См. §«Known Issues» KI#18 above. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
