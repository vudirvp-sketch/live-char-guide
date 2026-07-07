# Changelog

## [9.1.28] - 2026-07-08

### iter 28 — DGA Phase 2 (KI#18-B + KI#18-C FIXED, KI#18-I NEW)

Применены 2 safe fix из 7 pending sub-items KI#18 (Deployed Guide Audit). Принцип `viz > dry text` — текст не должен пере-объяснять то, что уже показано в VS-EMBED. Найден новый баг KI#18-I (Part 2 p2_embodiment) — задокументирован, не зафиксён.

### Changed (iter 28 — KI#18-B fix: Part 1 p1_card_overview table deduplicated)
- **`src/master/part_01.html` edited** (lines 285-299) — p1_card_overview table deduplicated against E01 viz: (i) «Функция» column REMOVED (was duplicating E01 `.block-content` text — Инструкции/Факты/Демонстрация/Первое сообщение ↔ viz block descriptions); (ii) intro paragraph ADDED linking to E01 viz above (pattern KI#18-A from Part 9). Table: 4 cols → 3 cols (Блок / Влияние на модель / Доля бюджета — both unique). part_01: 365 → 367 строк (+1).
- **`docs/canon/part_01.md` edited** — §1.2 table rewritten (3 cols, drop «Функция»). Front-matter Last synced → 2026-07-08 (iter 28), Migration status + ✅ iter 28 DGA fix (KI#18-B). Migration history row 6 updated. DGA Phase 2 fix section + validation gates iter 28 PASSED added.
- **`parts/part_01.html` regenerated** — root fallback (build artifact, fix propagated, hash unchanged).

### Changed (iter 28 — KI#18-C fix: Part 2 p2_basic_anchors table deduplicated)
- **`src/master/part_02.html` edited** (lines 121-134) — p2_basic_anchors table deduplicated against E03 viz: (i) «Описание» column REMOVED (was duplicating E03 `flow-node__desc` text — Внешний стимул/Наблюдаемая реакция/Физическая реакция ↔ viz flow-node descriptions); (ii) intro paragraph EXPANDED linking to E03 viz above (was one-liner «Формат Anchors (см. визуализацию E03 выше):» → explicit framing: viz shows T→A→P with descriptions, table adds concrete examples). Table: 4 cols → 3 cols (# / Этап / Пример — examples unique). part_02: 415 → 415 строк (0 net — intro line replaced, 3 rows shortened by 1 cell each).
- **`docs/canon/part_02.md` edited** — §2.1 table rewritten (3 cols, drop «Описание»). Front-matter Last synced → 2026-07-08 (iter 28), Migration status + ✅ iter 28 DGA fix (KI#18-C). Migration history row 3 updated. DGA Phase 2 fix section + validation gates iter 28 PASSED added.
- **`parts/part_02.html` regenerated** — root fallback (build artifact, fix propagated, hash unchanged).

### Added (iter 28 — KI#18-I NEW documented, NOT fixed)
- **KI#18-I NEW** — Part 2 `p2_embodiment` table (line 324, 4 cols: # / Слой / Описание / Пример). «Описание» col («Внутренний сигнал» / «Физическая реакция» / «Контакт со средой» / «Вербальная реакция») duplicates E04 viz (Embodiment funnel-stack 4 layers State→Body→Sensor→Speech). Same pattern as KI#18-C. Found during KI#18-C analysis. Documented in STATUS.md §Known Issues as KI#18-I (LOW-MEDIUM, pending iter 29+). NOT fixed in iter 28 — per user instruction «Если найден новый баг — сначала документируй в STATUS.md как Known Issue, потом фиксий».

### Changed (iter 28 — docs)
- **`STATUS.md`** — header iter line updated (DGA Phase 2 iter 28, KI#18-B/C ✅), +iter 28 section (2 fixes applied, 1 new bug documented), KI#18 sub-items table (3/9 fixed, +I NEW), iter 29+ roadmap.
- **`worklog.md`** — iter 27 → one-liner (KEEP last 3 detailed: 26, 27, 28), iter 28 = новый record (DGA Phase 2).
- **`CHANGELOG.md`** — [9.1.28] entry (этот).
- **`PLAN.md`** — §5 +iter 28 line (DGA Phase 2 — 2 fixes), iter 29+ roadmap.
- **`AGENT_NAVIGATION.md`** — header iter line updated (iter 28 DGA Phase 2), §6 pitfall #37 KI#18 status (3/9 fixed, +I NEW), §8 +iter 28 entry, §8 iter 29+ roadmap.

### Validation (iter 28)
- `pnpm run validate:master` ✅ PASSED (0 errors, baseline content-outside-section warnings, no part_01/part_02 warnings).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged — pure content fix, no JS/CSS/structure changes).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing baseline).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone — DGA Phase 2 in progress
**KI#18 🟡 ACTIVE — 3/9 fixed (A iter 26, B+C iter 28), 6 pending (D, E, F, G, H, I).** Все previous KI (KI#1..KI#17) ✅ CLOSED. Build hash fd3d96d3 unchanged. **Точка остановки:** iter 29+ — priority **I** (Part 2 p2_embodiment, same pattern as C, lowest risk) + **F** (Part 6 p6_cot_tiers — drop «Формат» col). Then **D** (Part 4 SPINE intro — careful, partial re-explanation) + **E** (Part 5 OCEAN — needs careful rule alignment: strict <30/>70 vs broad <40/>60 definition; viz «1 экстремум» vs text «3 экстремальных полюса»). **G** (Part 8 per-AP sections — by design) + **H** (Part 10 E15 callouts — intentional annotation) likely keep-by-design with documented rationale.

---

## [9.1.27] - 2026-07-08

### iter 27 — STATUS CHECK (без правок кода)

User запросил краткий отчёт о стадии работ. Никаких изменений в master HTML / canon / build artifacts / widgets / data. Только актуализация документации.

### Changed (iter 27 — docs only)
- **`STATUS.md`** — header дата → 2026-07-08, +iter 27 status check секция, все «iter 27+» → «iter 28+» в KI#18 sub-items (7 pending B–H) и roadmap.
- **`worklog.md`** — iter 26 → one-liner (KEEP last 3 detailed: 25, 26, 27), iter 27 = новый record (status check, no code changes).
- **`CHANGELOG.md`** — [9.1.27] entry (этот).
- **`PLAN.md`** — §5 +iter 27 line (status check), iter 27+ roadmap → iter 28+.
- **`AGENT_NAVIGATION.md`** — header iter line updated (iter 27 status check), §8 +iter 27 entry, §8 iter 27+ roadmap → iter 28+.

### Validation
- No code changes — validation gates не запускались. Build hash fd3d96d3 (от iter 26) confirmed unchanged.

### Milestone — iter 27 status check COMPLETE
**Текущее состояние:** iter 26 complete (DGA Phase 1 started, KI#18-A fixed). KI#18 🟡 ACTIVE (1/8 fixed, 7 pending B–H). Все previous KI (KI#1..KI#17) ✅ CLOSED. **Точка остановки:** DGA Phase 2 (iter 28+) — priority KI#18-B (Part 1) + KI#18-C (Part 2), then E (Part 5 semantic) + F (Part 6), G+H likely keep-by-design.

---

## [9.1.26] - 2026-07-01

### Added (iter 26 — Deployed Guide Audit Phase 1: KI#18 NEW)
- **KI#18 — Deployed Guide Duplication Audit (DGA)** 🟡 ACTIVE. Полный аудит 14 master HTML файлов (Part 1–10 + 3 Appendix) выявил 8 duplication/inconsistency кейсов между VS-EMBED viz и adjacent text. Принцип: `viz > dry text` (iter 8+) — текст не должен пере-объяснять то, что уже показано в VS-EMBED. Sub-items: **A** (Part 9 Quality Scale) ✅ FIXED iter 26. **B** (Part 1 p1_card_overview table «Функция» col) ⏳ pending. **C** (Part 2 p2_basic_anchors table «Описание» col) ⏳ pending. **D** (Part 4 p4_spine_overview intro) ⏳ pending. **E** (Part 5 OCEAN Context Limits table + semantic inconsistency) ⏳ pending — needs rule alignment. **F** (Part 6 p6_cot_tiers table) ⏳ pending. **G** (Part 8 per-AP sections — by design) ⏳ pending. **H** (Part 10 E15 callouts — intentional annotation) ⏳ pending.

### Changed (iter 26 — KI#18-A fix: Part 9 Quality Scale table deduplicated)
- **`src/master/part_09.html` edited** (lines 263–282) — Quality Scale table deduplicated against E14 viz: (i) «Признаки» column REMOVED (was duplicating E14 zone-detail__criteria text); (ii) «Плохой» RENAMED → «Слабый» (align with E14 viz tier label, naming inconsistency fix); (iii) «Отличный» row ADDED (was missing — 4th tier in E14 viz, absent from old 3-row table); (iv) intro paragraph ADDED linking to E14 viz above; (v) Recommendation callout updated (mentions Слабый + Отличный). part_09: 582 → 583 строк (+1).
- **`docs/canon/part_09.md` edited** — §9.1 table rewritten (4 rows + «Типичные паттерны ошибок» col). Front-matter Last synced → 2026-07-01 (iter 26), Migration status + ✅ iter 26 DGA fix. Migration history row 4 updated (3-row → 4-row, Плохой → Слабый, +Отличный, drop Признаки col).
- **`parts/part_09.html` regenerated** — root fallback (build artifact, timestamp updated, hash unchanged).

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 0 inline styles, expected content-outside-section warnings).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone — Deployed Guide Audit (DGA) Phase 1 STARTED
**Новый цикл работы по запросу user:** пошаговая проверка собранного при деплое гайда на дублирование смысловой и функциональной нагрузки между текстом и визуализациями. Принцип `viz > dry text` (iter 8+) — сохраняется. **KI#18 🟡 ACTIVE — 1/8 fixed (A), 7 pending (B–H).** Subsequent progress: iter 28 fixed B+C (3/9 total) and documented new I (pending iter 29+).

---

## [9.1.25] - 2026-07-01

> iter 25 — Phase 4 SVG integration COMPLETE. E18 Greeting Algorithm (4-step pipeline: Sensory Anchor → Тело FLAW → Реплика → Крючок) встроен в Part 7B, replaced textual `infographic inf-pipeline`. New VS element E18 created + 3 component extracts + E18 styles appended to vs-styles.css SECTION 5 (header E01–E17 → E01–E18). part_07b: 371 → 424 (+53). VS elements registry: 18 (E01–E18). Build hash fd3d96d3 unchanged.

---

## [9.1.24] - 2026-07-01

> iter 24 — KI#13 Part 9+10: 18 inline styles → 19 CSS селекторов `vs-ki13-p9-*` + `vs-ki13-p10-*` (semantic grouping: 1 indicator position + 4 zone-title color modifiers + 1 quick-checks panel + 1 shared callout-pos base + 11 per-instance top modifiers + 1 card-block-accent). KI#13 ✅ **CLOSED** (123/123 = 100%). Все master HTML — 0 inline styles. SECTION 6 vs-styles.css total: 60 селекторов. Build hash fd3d96d3 unchanged.

---

## [9.1.23] - 2026-06-30

> iter 23 — KI#13 Part 7A: 19 inline styles → 9 CSS селекторов `vs-ki13-p7a-*` (semantic grouping: 4 color overrides + 3 badge sizing/spacing + 1 template-hidden state + 1 border-cyan). part_07a: 19→0. Total KI#13: 105/123 (85%). Build hash fd3d96d3 unchanged.

---

## Previous iterations (compressed)

> Полная история — в `worklog.md` one-liners и git log. Ниже — краткая сводка для контекста.

- **[9.1.22] (iter 22, 2026-06-30):** KI#13 Part 5+6 (6/123 inline styles → 5 CSS селекторов `vs-ki13-*` в vs-styles.css SECTION 6, +30 строк). part_05: 1→0 (`.vs-ki13-context-limits-note`), part_06: 5→0 (4 селектора для E11 CoT progression panel: `vs-ki13-cot-panel/heading/text/strong`). Total KI#13: 86/123 (70%). Build hash fd3d96d3 unchanged.
- **[9.1.21] (iter 21, 2026-06-24):** KI#13 Part 3+4 (23/123 inline styles → 18 CSS селекторов `vs-ki13-*` в vs-styles.css SECTION 6, +49 строк). part_03: 2→0, part_04: 21→0. Phase 4 SVG integration analysis complete (Canon migration уже удалил major duplicates; 3 retained infographics intentional; Part 7B candidate для iter 23+ optional). Build hash fd3d96d3 unchanged.

- **[9.1.20] (iter 20, 2026-06-24):** KI#13 Part 1+2 baseline (57/123 inline styles → 28 CSS classes `vs-ki13-*` в vs-styles.css SECTION 6). part_01: 48→0, part_02: 9→0. **KI#17 CLOSED.** SVG extracts audit (0 orphans, все 17 elements embedded). Build hash fd3d96d3.
- **[9.1.19] (iter 19, 2026-06-24):** KI#16 fix — `qa:csp` PASS. 2 inline `<script>` в `src/shell/index.html` → external widget JS (`js-flag.js` + `mermaid-init.js`). Build hash `df283246` → `fd3d96d3`. **KI#16 CLOSED.**
- **[9.1.18] (iter 18, 2026-06-24):** Final cleanup — Canon migration COMPLETE. 3 Appendix Canon files (`appendix_mbti.md` + `appendix_model_table.md` + `appendix_glossary.md`) created. `content_map.md` cleanup (277→256, -8%). `terminology_dictionary.md` cleanup (338→206, -39%). Все 10 Parts + 3 Appendix ✅ MIGRATED.
- **[9.1.16] (iter 16, 2026-06-24):** Canon Part 5+6+7B+10 created + 4 master HTML мигрированы. **Все 10 Parts мигрированы — Canon migration complete.**
- **[9.1.14] (iter 14, 2026-06-24):** Canon Part 1+2+3 created + 3 master HTML мигрированы (Part 1: -6.4%, Part 2: -6.3%, Part 3: 0%).
- **[9.1.13] (iter 13, 2026-06-24):** Canon Part 9 created + master HTML мигрирован (596→582, -2.3%).
- **[9.1.12] (iter 12, 2026-06-24):** Canon Part 8 created + master HTML мигрирован (521→507, -2.7%).
- **[9.1.11] (iter 11, 2026-06-24):** Part 7A master HTML migrated (1168→1137, -2.7%, 4 compression candidates).
- **[9.1.10] (iter 10, 2026-06-24):** Canon Part 7A created (802 строки, 13 H2 секций, 4 VS-маркера E08/E16/E17/E02). **KI#17 NEW** (documentation drift — fixed).
- **[9.1.9] (iter 9, 2026-06-24):** Validation pass Part 4. Все validation gates PASS. **KI#16 NEW** (qa:csp FAIL pre-existing с iter 5).
- **[9.1.8] (iter 8, 2026-06-23):** Pilot migration Part 4 (777→676, -13%, 4 dup viz удалены + 1 orphan paragraph, 2 unique infographic сохранены).
- **[9.1.7] (iter 7, 2026-06-23):** Canon scaffold + part_04.md pilot + KI#15 CLOSED (`docs/anchor-redirects.json` удалён).
- **[9.1.6] (iter 6, 2026-06-23):** `docs/CONTENT_RESTRUCTURE_PLAN.md` created (7 dup patterns + Canon strategy + iter 7..19 roadmap). **KI#14 NEW** (content duplication). **KI#15 NEW** (anchor-redirects stale dup).
- **[9.1.5] (iter 5, 2026-06-23):** KI#11 CLOSED (tokens.json). KI#12 partial (17 inline scripts → 5 widget JS modules). **KI#13 NEW** (123 inline styles + 23 outside).
- **[9.1.4] (iter 4, 2026-06-23):** KI#10 CLOSED. KI#11+#12 found (qa:* scripts wired). `docs/cross_reference_sync.md` merged into `AGENT_NAVIGATION.md` §9.
- **[9.1.3] (iter 3, 2026-06-23):** Orphan scripts cleanup + pitfalls expansion (KI#8+#9 closed).
- **[9.1.2] (iter 2, 2026-06-23):** KI#1..#6 closed, stale docs removed (`transition_guide.md` + `ap_reference_inventory.md` + `user_journeys.md`).
- **[9.1.1] (iter 1, 2026-06-23):** AGENT_NAVIGATION/STATUS/worklog/PLAN created. 6 KI identified.
- **[9.1.0] (2026-05-16):** v9.1.0 release. FIX-01..FIX-31. Restructured (split Part 7, moved MBTI, etc.). См. git log.
- **[9.0.0] (2026-05-15):** v9.0.0 release. Initial restructure.
