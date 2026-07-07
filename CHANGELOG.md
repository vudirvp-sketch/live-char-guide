# Changelog

## [9.1.31] - 2026-07-08

### iter 31 — DGA Phase 2 final (KI#18-G + KI#18-H ✅ keep-by-design → KI#18 ✅ CLOSED)

Документированы rationale для последних 2 pending sub-items KI#18 (G + H). Оба sub-item'а — keep-by-design с documented rationale, без master HTML edit. Принцип `viz > dry text` (iter 8+) — применяется к pure re-explanation, не к different reader intents / different visualization patterns.

### Changed (iter 31 — KI#18-G rationale documented: Part 8 per-AP sections vs E12 Antipattern Catalog viz)
- **`docs/canon/part_08.md` edited** — front-matter Last synced → 2026-07-08 (iter 31 — DGA Phase 2 final KI#18-G), Migration status + ✅ iter 31 DGA keep-by-design rationale (KI#18-G). Added «DGA Phase 2 final (iter 31 — applied 2026-07-08)» section: KI#18-G KEEP-BY-DESIGN intro (no master HTML edit) + Catalog vs Detail rationale table (7 dimensions: Purpose / Symptom / Cause / Fix / Examples / Callouts / Reader intent) comparing E12 viz (catalog/quick-scan) vs per-AP sections (detailed reference) + Decision paragraph (substantial unique content beyond viz, different reader intents — scan/lookup vs deep-dive, same pattern as iter 12 item #5 navigation table) + Action (No master HTML edit, KI#18-G ✅ CLOSED as keep-by-design) + Validation gates iter 31 PASSED (8 gates, no source code change, hash `fd3d96d3` unchanged). No master HTML edit — only rationale documentation.
- **`src/master/part_08.html` NOT edited** — keep-by-design: per-AP sections add concrete thresholds (e.g., «Description > 800 токенов»), multi-step solutions with cross-ref links to canonical Parts, diff examples (AP-1/AP-3 Elena before/after, AP-9 broken/full SPINE, AP-12 XML malformed code, AP-15 nested anchors code), RULE callouts (AP-4, AP-10) — substantial unique content beyond viz.

### Changed (iter 31 — KI#18-H rationale documented: Part 10 E15 Annotated Blueprint callouts vs E01 Card Anatomy)
- **`docs/canon/part_10.md` edited** — front-matter Last synced → 2026-07-08 (iter 31 — DGA Phase 2 final KI#18-H), Migration status + ✅ iter 31 DGA keep-by-design rationale (KI#18-H). Added «DGA Phase 2 final (iter 31 — applied 2026-07-08)» section: KI#18-H KEEP-BY-DESIGN intro (no master HTML edit) + Annotation layer rationale table (6 dimensions: Purpose / Visualization / Annotation layers / Token budget display / Reader intent / Position in flow) comparing E01 viz (Part 1, pure block anatomy vertical card-stack) vs E15 viz (Part 10, central card template Elena с 4 ANNOTATION LAYERS structure/anchors/spine/directives) + Decision paragraph (E15 callouts ≠ pure budget tables — annotation labels combining budget range с annotation context; removing callouts = strips E15 of core function 4-layer annotation approach; E15 ≠ E01 different visualization patterns; cross-Part reference intentional — Part 10 открывается annotated blueprint как learning tool; Token Budget subsections ≠ E15 callouts — concrete total per card vs generic per-block ranges) + Action (No master HTML edit, KI#18-H ✅ CLOSED as keep-by-design) + Validation gates iter 31 PASSED. No master HTML edit — only rationale documentation.
- **`src/master/part_10.html` NOT edited** — keep-by-design: E15 Annotated Blueprint ≠ E01 Card Anatomy. E01 = pure block anatomy (vertical card-stack 4 blocks, token-anno widget мин/стд/макс, no annotation layers). E15 = central card template (Elena) с 4 ANNOTATION LAYERS positioned on top (structure/anchors/spine/directives) — different visualization pattern.

### Validation gates (iter 31 — ALL PASSED, no source code change)
- `validate:master` ✅ (0 errors, 23 baseline warnings — no regression, no part_08/part_10 new warnings).
- `build` ✅ (hash `fd3d96d3` unchanged — no source code change).
- `validate` ✅ (8 gates: GATE-1..5 + SHELL-PARTS + SHELL-LOADER + SHELL-STYLES).
- `test:unit` ✅ (43/43 pass).
- `lint` ✅ (0 errors, 13 warnings baseline).
- `qa:csp` ✅.
- `qa:bundle` ✅ (index.html 7.2KB).
- `qa:doc-versions` ✅.

### KI#18 ✅ CLOSED (iter 31)
- **KI#18 ✅ CLOSED — 9/9 resolved** (7 fixed: A iter 26, B+C iter 28, I+F iter 29, D+E iter 30; 2 keep-by-design: G+H iter 31). DGA Phase 1 (audit) COMPLETE iter 26. Phase 2 COMPLETE iter 28-31. Все previous KI (KI#1..KI#17 + KI#19) ✅ CLOSED.

### Changed (iter 31 — docs)
- **`STATUS.md`** — header iter line updated (DGA Phase 2 iter 28-31, KI#18 ✅ CLOSED), iter 31 section (2 keep-by-design rationale documented), KI#18 sub-items table (9/9 resolved), iter 32+ roadmap — none, DGA COMPLETE.
- **`worklog.md`** — iter 31 record (KI#18-G + KI#18-H rationale documented), iter 30 → one-liner.
- **`AGENT_NAVIGATION.md`** — header iter line updated (DGA COMPLETE KI#18 ✅ CLOSED), §6 pitfall #37 KI#18 status updated to ✅ CLOSED 9/9, §8 iter 31 record + iter 32+ roadmap — none.
- **`PLAN.md`** — §5 iter 31 line, DGA COMPLETE.
- **`docs/CONTENT_RESTRUCTURE_PLAN.md`** — §5.2 iter 31 row, §8 iter 31 stop point (DGA COMPLETE), KI#18 sub-items table updated with G+H ✅ CLOSED keep-by-design.
- **`index.html`** — regenerated (timestamp only, hash `fd3d96d3` unchanged).

---

## [9.1.30] - 2026-07-08

### iter 30 — DGA Phase 2 continued (KI#18-D + KI#18-E FIXED, KI#19 incidental FIXED)

Применены 3 fix: 2 из 4 pending sub-items KI#18 (D + E) + 1 incidental KI#19 (encoding bug, найден при анализе KI#18-E). Принцип `viz > dry text` — текст не должен пере-объяснять то, что уже показано в VS-EMBED.

### Changed (iter 30 — KI#18-D fix: Part 4 p4_spine_overview intro trimmed)
- **`src/master/part_04.html` edited** (L143) — p4_spine_overview intro paragraph trimmed: removed partial re-explanation «фреймворк из 5 элементов, связывающих прошлое персонажа с его поведением» (5 hexagons уже показаны в E05 viz L18-119) → «SPINE связывает прошлое персонажа с его поведением (структура показана в VS-EMBED E05 выше).» Single-line edit. part_04: 670 → 670 (0 net). Панель «Причинно-следственная цепь» внутри VS-EMBED L122-136 НЕ редактировалась — часть canonical E05 viz source (visual-system/elements/E05-spine-framework.html L364-377 + component-extracts/E05-visual.html L113-127). Panel добавляет UNIQUE контент: русские переводы (глубокая травма, ложное убеждение etc.) + causality verbs (порождает/создаёт/двигает/маскируемое) + dynamics insight «WANT сходится к NEED». По принципу «better to underdo than to break» — panel оставлена.
- **`docs/canon/part_04.md` edited** — front-matter Last synced → 2026-07-08 (iter 30 — DGA Phase 2 fix KI#18-D), Migration status + ✅ iter 30 DGA fix (KI#18-D). DGA Phase 2 fix section (iter 30) + validation gates iter 30 PASSED + Note про panel inside VS-EMBED оставлена.
- **`parts/part_04.html` regenerated** — root fallback (build artifact, fix propagated, hash unchanged).

### Changed (iter 30 — KI#18-E fix: Part 5 p5_elena_profile semantic bug fixed)
- **`src/master/part_05.html` edited** (L272, L273, L279) — p5_elena_profile semantic bug fixed: aligned OCEAN extreme-pole rule к strict (<30 или >70 — most prevalent across codebase). Cross-viz/text inconsistency resolved: E09 viz L122+L138 says «1 экстремум» (only O=72, strict rule), но text L272-273, L279 говорил «3 экстремальных полюса» (broad rule <40 или >60). L272: «Экстремальный полюс.» → «Cautious zone (30–40) — на границе с экстремальной зоной (<30), напрямую связана с FLAW.» L273: аналогично для N=68 (cautious 60–70). L279: «3 экстремальных полюса» → «1 экстремальный полюс (O=72 > 70) + 2 значения в cautious zone (A=38, N=68)». part_05: 615 → 615 (0 net — single-token + paragraph rewrite).
- **`docs/canon/part_05.md` edited** — front-matter Last synced → 2026-07-08 (iter 30 — DGA Phase 2 fix KI#18-E + KI#19), Migration status + ✅ iter 30 DGA fix (KI#18-E) + master HTML encoding fix (KI#19). L59 (A=38 row) + L60 (N=68 row) + L62 (RULE callout) синхронизированы. DGA Phase 2 fix section (iter 30) with 2 subsections (KI#18-E + KI#19) + validation gates iter 30 PASSED.
- **`parts/part_05.html` regenerated** — root fallback (build artifact, fix propagated, hash unchanged).

### Changed (iter 30 — KI#19 incidental fix: Chinese chars in master HTML)
- **`src/master/part_05.html` edited** (L269) — encoding bug fixed: Chinese chars «线索» (xiànsuǒ = clue) заменены на русское «зацепками» per canon part_05.md L56. Master HTML был corrupted при past edit: «следует за**线索**ми, которые другие игнорируют» → «следует за **зацепками**, которые другие игнорируют». Canon уже имел корректный текст. Single-token replacement.

### Rule alignment decision (iter 30 — KI#18-E)
- **Strict rule (<30 или >70)** выбрана как canonical для OCEAN extreme-pole definition, потому что: (a) E09 viz L122 threshold indicator использует <30 и >70; (b) E09 viz L138 note говорит «1 экстремум»; (c) p5_ocean_basics L153 RULE callout уже формулирует strict rule; (d) p5_ocean_basics L160 table header использует (<30) и (>70); (e) canon part_05.md L23 + L27 — strict. Broad rule (<40 или >60) была только implicit в Elena profile section L272-273, L279. Aligning к strict = минимальные изменения, maximum consistency.

### Validation gates (iter 30 — ALL PASSED)
- `validate:master` ✅ (0 errors, 23 baseline warnings — KI#13/VS-EMBED baseline, no regression, no part_04/part_05 new warnings).
- `build` ✅ (hash `fd3d96d3` unchanged).
- `validate` ✅ (8 gates).
- `test:unit` ✅ (43/43 pass).
- `lint` ✅ (0 errors, 13 warnings baseline).
- `qa:csp` ✅.
- `qa:bundle` ✅ (7.2KB).
- `qa:doc-versions` ✅.

### KI#18 status update (iter 30)
- **KI#18 🟡 ACTIVE — 7/9 fixed (A iter 26, B+C iter 28, I+F iter 29, D+E iter 30), 2 pending (G, H — likely keep-by-design с documented rationale).** После G + H — KI#18 ✅ CLOSED.

---

## [9.1.29] - 2026-07-08

### iter 29 — DGA Phase 2 continued (KI#18-I + KI#18-F FIXED)

Применены 2 safe fix из 6 pending sub-items KI#18 (Deployed Guide Audit). Принцип `viz > dry text` — текст не должен пере-объяснять то, что уже показано в VS-EMBED.

### Changed (iter 29 — KI#18-I fix: Part 2 p2_embodiment table deduplicated)
- **`src/master/part_02.html` edited** (lines 319-333) — p2_embodiment table deduplicated against E04 viz: (i) «Описание» column REMOVED (was duplicating E04 `depth-label` content — Внутренний сигнал/Физическая реакция/Контакт со средой/Вербальная реакция ↔ viz depth-labels Внутренний/Физический/Перцептивный/Вывод); (ii) intro paragraph EXPANDED linking to E04 viz above (was one-liner «Embodiment Protocol (протокол телесности, см. визуализацию E04 выше):» → explicit framing: viz shows funnel-stack 4 layers with depth-labels + in-character examples, table adds typological category examples). Table: 4 cols → 3 cols (# / Слой / Пример — examples unique). part_02: 415 → 415 строк (0 net — intro line expanded, 4 rows shortened by 1 cell each). Same pattern as KI#18-C (applied iter 28).
- **`docs/canon/part_02.md` edited** — §2.4 table rewritten (3 cols, drop «Описание»). Front-matter Last synced → 2026-07-08 (iter 29), Migration status + ✅ iter 29 DGA fix (KI#18-I). DGA Phase 2 fix section (iter 29) + validation gates iter 29 PASSED added.
- **`parts/part_02.html` regenerated** — root fallback (build artifact, fix propagated, hash unchanged).

### Changed (iter 29 — KI#18-F fix partial: Part 6 p6_cot_tiers table deduplicated)
- **`src/master/part_06.html` edited** (lines 131-145) — p6_cot_tiers table deduplicated against E11 viz: (i) «Формат» column REMOVED (was duplicating E11 `stair-step__name` — Без CoT/Эмоциональная метка/GHOST-link/Полный XML ↔ table «Формат» col Без CoT/[Эмоция] → Реакция/[GHOST-связь] → Реакция/Полный XML-процесс); (ii) intro paragraph ADDED linking to E11 viz (was single intro `<p>` → added 2nd `<p>`: viz shows staircase 4 tiers with name+model-pill+format example, table adds model support + Russian examples). Table: 4 cols → 3 cols (Tier / Для моделей / Пример). part_06: 259 → 261 строк (+2 — intro paragraph added, 4 rows shortened by 1 cell each).
- **`docs/canon/part_06.md` edited** — §6.3 table rewritten (3 cols, drop «Формат»). Front-matter Last synced → 2026-07-08 (iter 29), Migration status + ✅ iter 29 DGA fix (KI#18-F). DGA Phase 2 fix section (iter 29, partial — «Для моделей» + «Пример» cols DEFERRED for accessibility) + validation gates iter 29 PASSED added.
- **`parts/part_06.html` regenerated** — root fallback (build artifact, fix propagated, hash unchanged).

### Deferred (iter 29 — KI#18-F partial)
- **«Для моделей» + «Пример» cols partial duplication DEFERRED** — «Для моделей» ≈ viz `model-pill` (12B+/32B/API), «Пример» ≈ viz `stair-step__format` (Russian translations of English examples). Kept for accessibility (русские переводы не в viz). Полное устранение дублирования потребует решения по рус/англ перекрытию — отложено до future iter.

### Changed (iter 29 — docs)
- **`STATUS.md`** — header iter line updated (DGA Phase 2 iter 28-29, KI#18-B/C/I/F ✅), +iter 29 section (2 fixes applied), KI#18 sub-items table (5/9 fixed), iter 30+ roadmap.
- **`worklog.md`** — iter 28 → one-liner (KEEP last 3 detailed: 27, 28, 29), iter 29 = новый record (DGA Phase 2 continued).
- **`CHANGELOG.md`** — [9.1.29] entry (этот). iter 28 entry compressed to one-liner.
- **`PLAN.md`** — §5 +iter 29 line (DGA Phase 2 — 2 fixes), iter 30+ roadmap.
- **`AGENT_NAVIGATION.md`** — header iter line updated (iter 29 DGA Phase 2), §6 pitfall #37 KI#18 status (5/9 fixed), §8 +iter 29 entry, §8 iter 30+ roadmap.
- **`docs/CONTENT_RESTRUCTURE_PLAN.md`** — §5.2 +iter 29 row, §8 iter 29 stop point, KI#18 sub-items table (I+F ✅).

### Validation (iter 29)
- `pnpm run validate:master` ✅ PASSED (0 errors, baseline content-outside-section warnings, no part_02/part_06 warnings).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged — pure content fix, no JS/CSS/structure changes).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing baseline).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone — DGA Phase 2 in progress
**KI#18 🟡 ACTIVE — 5/9 fixed (A iter 26, B+C iter 28, I+F iter 29), 4 pending (D, E, G, H).** Все previous KI (KI#1..KI#17) ✅ CLOSED. Build hash fd3d96d3 unchanged. **Точка остановки:** iter 30+ — priority **D** (Part 4 SPINE intro — careful, partial re-explanation). Then **E** (Part 5 OCEAN — needs careful rule alignment: strict <30/>70 vs broad <40/>60 definition; viz «1 экстремум» vs text «3 экстремальных полюса» — semantic bug). **G** (Part 8 per-AP sections — by design, document rationale) + **H** (Part 10 E15 callouts — intentional annotation, document rationale) likely keep-by-design.

---

## [9.1.28] - 2026-07-08

> iter 28 — DGA Phase 2: KI#18-B (Part 1 p1_card_overview drop «Функция» col, duplicates E01) + KI#18-C (Part 2 p2_basic_anchors drop «Описание» col, duplicates E03) FIXED. KI#18-I NEW documented (Part 2 p2_embodiment — same pattern as C, E04 depth-label duplication). All validation gates PASS. Build hash fd3d96d3 unchanged.

---

## [9.1.27] - 2026-07-08

> iter 27 — STATUS CHECK (без правок кода). Документация актуализирована. Build hash fd3d96d3 unchanged.

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
