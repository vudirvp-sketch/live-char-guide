# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#13 ✅ CLOSED (iter 24) + Phase 4 SVG: E18 ✅ INTEGRATED (iter 25) + DGA Phase 1 (iter 26, KI#18-A ✅) + DGA Phase 2 (iter 28, KI#18-B ✅ + KI#18-C ✅; iter 29, KI#18-I ✅ + KI#18-F ✅ partial; iter 30, KI#18-D ✅ + KI#18-E ✅ + KI#19 ✅ incidental)
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 30 — DGA Phase 2 continued (3 fixes applied).** Применены 3 fix: 2 из 4 pending sub-items KI#18 (D + E) + 1 incidental KI#19 (encoding bug, найден при анализе KI#18-E):

- **KI#18-D FIXED** — `src/master/part_04.html` p4_spine_overview intro: trimmed partial re-explanation «фреймворк из 5 элементов» (5 hexagons уже показаны в E05 viz) → «SPINE связывает прошлое персонажа с его поведением (структура показана в VS-EMBED E05 выше).» part_04: 670 → 670 (0 net). Панель «Причинно-следственная цепь» внутри VS-EMBED НЕ редактировалась — часть canonical E05 viz, добавляет unique контент (русские переводы + causality verbs + dynamics insight).
- **KI#18-E FIXED** — `src/master/part_05.html` p5_elena_profile: semantic bug fixed. Cross-viz/text inconsistency: E09 viz говорит «1 экстремум» (только O=72, strict rule <30 или >70), но text говорил «3 экстремальных полюса (O=72, A=38, N=68)» (broad rule <40 или >60). Aligned к strict rule (most prevalent: E09 viz L122+L138, p5_ocean_basics L153+L160, canon L23+L27). L272: «Экстремальный полюс» → «Cautious zone (30–40) — на границе с экстремальной зоной (<30), напрямую связана с FLAW». L273: аналогично для N=68 (cautious 60–70). L279: «3 экстремальных полюса» → «1 экстремальный полюс (O=72 > 70) + 2 значения в cautious zone (A=38, N=68)». part_05: 615 → 615 (0 net). Canon part_05.md L59+L60+L62 синхронизированы.
- **KI#19 FIXED (incidental)** — `src/master/part_05.html` L269: китайские иероглифы «线索» (xiànsuǒ = clue) заменены на русское «зацепками» per canon L56. Master HTML был corrupted при past edit — canon уже имел корректный текст.

### Что сделано в iter 30 (DGA Phase 2 continued)

| # | Задача | Результат |
|---|--------|-----------|
| a | KI#18-D fix (Part 4) | `src/master/part_04.html` p4_spine_overview intro: trimmed partial re-explanation «фреймворк из 5 элементов» → «SPINE связывает прошлое персонажа с его поведением (структура показана в VS-EMBED E05 выше).» part_04: 670 → 670 (0 net — single-line edit). |
| b | KI#18-E fix (Part 5, semantic bug) | `src/master/part_05.html` p5_elena_profile: aligned OCEAN extreme-pole rule к strict (<30 или >70). L272: «Экстремальный полюс» → «Cautious zone (30–40) — на границе с экстремальной зоной (<30)». L273: аналогично для N=68 (cautious 60–70). L279: «3 экстремальных полюса» → «1 экстремальный полюс + 2 cautious zone values». part_05: 615 → 615 (0 net). |
| c | KI#19 fix (incidental) | `src/master/part_05.html` L269: Chinese chars «线索» → русское «зацепками» per canon. Master HTML был corrupted — canon уже корректен. |
| d | Canon updates | `docs/canon/part_04.md` + `docs/canon/part_05.md`: front-matter (Last synced → iter 30, Migration status + iter 30 DGA fix), DGA Phase 2 fix sections + validation gates iter 30 added. part_05.md также отмечает KI#19 incidental fix. |
| e | Validation gates PASS | `validate:master` ✅ (0 errors, 23 baseline warnings, no part_04/part_05 new warnings), `build` ✅ (hash `fd3d96d3` unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings baseline), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |
| f | Root fallbacks verified | `parts/part_04.html` + `parts/part_05.html` regenerated with fixes. `index.html` timestamp-only change (hash unchanged). |

### Изменённые файлы в iter 30

| File | Action | Reason |
|------|--------|--------|
| `src/master/part_04.html` | Edited | KI#18-D: trim partial re-explanation в p4_spine_overview intro. 670 → 670 (0 net). |
| `src/master/part_05.html` | Edited | KI#18-E: align OCEAN rule к strict (<30 или >70), fix «3 экстремальных полюса» semantic bug. KI#19: replace Chinese chars «线索» → «зацепками». 615 → 615 (0 net). |
| `docs/canon/part_04.md` | Edited | KI#18-D: front-matter + DGA Phase 2 fix section + validation gates. |
| `docs/canon/part_05.md` | Edited | KI#18-E + KI#19: front-matter + L59+L60+L62 (rule alignment) + DGA Phase 2 fix section + validation gates. |
| `parts/part_04.html` | Regenerated | Root fallback (build artifact, fix propagated). |
| `parts/part_05.html` | Regenerated | Root fallback (build artifact, fix propagated). |
| `index.html` | Regenerated | Root fallback (timestamp only, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | iter 30 record + KI#18-D/E closed + KI#19 closed. |
---

## Known Issues

**KI#18 ACTIVE.** Deployed Guide Duplication Audit (DGA) — Phase 1 audit complete (iter 26), Phase 2 in progress (iter 28-29). 9 sub-items identified (A–I), 5 fixed (A iter 26, B + C iter 28, I + F iter 29), 4 pending (D, E, G, H).

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#18 (Deployed Guide Duplication Audit)** | MEDIUM | **🟡 ACTIVE — 7/9 fixed (A, B, C, D, E, I, F), 2 pending (G, H)** | found iter 26, A iter 26, B+C iter 28, I+F iter 29, D+E iter 30 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED | iter 20–24 (123/123 = 100%) |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 (Canon migration complete) |
| KI#16 (qa:csp FAIL — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#19 (Chinese chars in master HTML part_05 L269) | LOW | ✅ CLOSED | found + fixed iter 30 (incidental during KI#18-E) |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1–7 |

### KI#18 — Deployed Guide Duplication Audit (DGA) — Detailed

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
| **G** | Part 8 | E12 Antipatterns viz (15 AP cards with Симптом/Причина/Исправление) ↔ per-AP sections repeat same structure. Design pattern (catalog vs detail) — partially intentional. | LOW (by design) | ⏳ pending iter 30+ (likely keep, document rationale) |
| **H** | Part 10 | E15 Annotated Blueprint callouts (token budgets) duplicate E01 in Part 1. Cross-Part duplication, but integrated into annotation layer (contextually relevant). | LOW (intentional annotation) | ⏳ pending iter 30+ (likely keep, document rationale) |
| **I** | Part 2 | E04 Embodiment Protocol viz (funnel-stack 4 layers: State→Body→Sensor→Speech with depth-labels + examples) ↔ p2_embodiment table. «Описание» col duplicates E04 `depth-label`. Same pattern as KI#18-C. | LOW-MEDIUM | ✅ FIXED iter 29 |

**iter 31+ roadmap (DGA Phase 2 final):** Only 2 pending sub-items remain — both likely keep-by-design with documented rationale. **KI#18-G** (Part 8 per-AP sections — by design catalog vs detail; document rationale). **KI#18-H** (Part 10 E15 callouts — intentional annotation, document rationale). После G + H — KI#18 ✅ CLOSED. Принцип `viz > dry text` сохраняется. Новые баги — сначала документировать в `STATUS.md` как KI#N, потом фиксить.

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
| **Deployed Guide Audit (iter 26+) — ONGOING** | KI#18 ACTIVE. Phase 1 audit done (iter 26, 8 sub-items A–H + I). Phase 2 in progress (iter 28-30, 7/9 fixed: A+B+C+D+E+I+F, 2 pending: G+H likely keep-by-design). KI#19 (Chinese chars) CLOSED iter 30. Принцип: `viz > dry text` — текст не должен пере-объяснять то, что уже показано в VS-EMBED. См. §«Known Issues» KI#18 above. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
