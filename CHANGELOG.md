# Changelog

## [9.1.13] - 2026-06-24

### Added (iter 13 — Canon Part 9 creation)
- **Canon Part 9 created** — `docs/canon/part_09.md` (351 строка). 11 H2 секций (по одной на каждый `data-section` из `src/master/part_09.html`): p9_quality_scale, p9_one_change_rule, p9_basic_checklist, p9_additional_problems, p9_symptom_table, p9_decision_tree, p9_test_scenarios, p9_element_scenario_map, p9_test_requirements, p9_12b_issues, p9_pre_deploy.
- **2 VS-маркера:** E13 (Diagnostic Decision Tree, в preamble перед §9.1) — 3 symptoms с binary branching → AP/E references; E14 (Quality Scale, §9.1) — thermometer с 4 зонами + Quick Check list.
- **Front-matter:** `Migration status: ✅ MIGRATED (iter 13)` (Canon created + master HTML migrated end-to-end за один iter).
- **Migration Notes таблица:** 21 элемент (20 «Оставить» + 1 «Сжать» кандидат #13). Все → DONE.

### Changed (iter 13 — Part 9 master HTML migration)
- **Part 9 master HTML migrated** против Canon §9 (`src/master/part_09.html`, 596 → 582 строк, -2.3%).
- **1 compression candidate applied:**
  - #13: `p9_test_requirements` Table 1 «Количество тестовых сценариев» (6 строк, 2-колонный формат: Сценарий / Что проверяет) → удалён. Дублировал §9.7 `p9_test_scenarios` таблицу (те же 6 сценариев в полной 4-колонной версии). Заменён на 1-строчный cross-ref в intro параграфе: «Полный список сценариев — см. Тестовые сценарии выше».
- **20 "Оставить" элементов** — без изменений. VS-EMBED E13 + E14, quality scale table (с уникальной Examples column), One Change Rule callout, basic_checklist (per-block, 15 checks), additional_problems (#4, #5), symptom_table (11 симптомов), decision_tree (5 групп с branching), test_scenarios (6 сценариев 4-col), element_scenario_map, success metrics (6 критериев), 12B symptoms table, Quick Check table (5 пунктов), Full Check table (14 пунктов), Elena Quick Check example, Vyshcherblenny Quick+Full Check example, bridge, part-resume.
- **Canon front-matter updated:** `Migration status: ✅ MIGRATED (iter 13)`, `Last synced: 2026-06-24 (iter 13)`.

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 123 warnings = KI#13 baseline, no regression).
- `pnpm run build` ✅ SUCCESS (hash df283246).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (10 pre-existing warnings).
- `pnpm run qa:bundle` ✅ PASS. `pnpm run qa:doc-versions` ✅ PASS.

### Notes
- iter 13 = Canon Part 9 creation + master HTML migration (end-to-end за один iter). 10 files updated.
- KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE.
- iter 14+ priorities: Canon creation + migrate для Part 1+2+3 (Foundations, Anchors, Voice; cleanup 4 устаревших infographic в Part 2).

---

## [9.1.12] - 2026-06-24

### Added (iter 12 — Canon Part 8 creation)
- **Canon Part 8 created** — `docs/canon/part_08.md` (411 строк). 16 H2 секций (по одной на каждый `data-section` из `src/master/part_08.html`): p8_antipatterns_overview, p8_ap1_token_bloat..p8_ap15_nested_anchors.
- **1 VS-маркер:** E12 (Antipattern Catalog, §8.1) — сетка 5×3 с 15 AP-картами.
- **Front-matter:** `Migration status: ✅ MIGRATED (iter 12)` (Canon created + master HTML migrated end-to-end за один iter).
- **Migration Notes таблица:** 31 элемент (29 «Оставить» + 2 «Сжать» кандидата #3, #21). Все → DONE.

### Changed (iter 12 — Part 8 master HTML migration)
- **Part 8 master HTML migrated** против Canon §8 (`src/master/part_08.html`, 521 → 507 строк, -2.7%).
- **2 compression candidates applied:**
  - #3: Overview intro paragraph #2 («**Анти-паттерн** — распространённая ошибка...») — объединён с intro #1 в один параграф. Дублировал определение «анти-паттерн».
  - #21: AP-9 «Пример: Елена — проверка SPINE» `<pre><code>` блок (13 строк) → удалён, заменён на 1-строчный cross-ref на Part 4 §4.9 (canonical location Elena SPINE check).
- **29 "Оставить" элементов** — без изменений. VS-EMBED E12, summary table (16 rows incl. OCEAN Overload redirect), все diff examples (AP-1/AP-3/AP-12/AP-15), все RULE callouts, все anti-pattern pairs, все cross-refs сохранены.
- **Canon front-matter updated:** `Migration status: ✅ MIGRATED (iter 12)`, `Last synced: 2026-06-24 (iter 12)`.

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 123 warnings = KI#13 baseline).
- `pnpm run build` ✅ SUCCESS (hash df283246).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (10 pre-existing warnings).
- `pnpm run qa:bundle` ✅ PASS. `pnpm run qa:doc-versions` ✅ PASS.

### Notes
- iter 12 = Canon Part 8 creation + master HTML migration (end-to-end за один iter). 9 files updated.
- KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE.
- iter 13+ priorities: Canon creation + migrate для Part 9 (diagnostics).

---

## [9.1.11] - 2026-06-24

### Changed (iter 11 — Part 7A master HTML migration)
- **Part 7A master HTML migrated** против Canon §7A (`src/master/part_07a.html`, 1168 → 1137 строк, -2.7%).
- **4 compression candidates applied:**
  - #22: Базовые параметры sampling table → заменён на notes-only `<ul>` список + cross-ref на E17.
  - #26: Чеклист по типу модели table → заменён на bullet-list ключевых distinctions + cross-ref на E17.
  - #42: Plain-copy `<pre class="plain-copy">` пример расчёта Token Budget → удалён (дублировал `<noscript>` fallback).
  - #46: CORE DIRECTIVES пример в walkthrough Елены → заменён на 1-строчный cross-ref `→ CORE DIRECTIVES (выше)`.
- **50 "Оставить" элементов** — без изменений. Все RULE/RECOMMENDATION callouts, templates, уникальные таблицы, anti-pattern pairs, примеры Елены/Выщербленного сохранены.
- **Canon front-matter updated:** `Migration status: ✅ MIGRATED (iter 11)`, `Last synced: 2026-06-24 (iter 11)`.
- **Migration Notes таблица:** все 54 элемента → DONE.

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 146 warnings = KI#13 baseline).
- `pnpm run build` ✅ SUCCESS (hash df283246).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (10 pre-existing warnings).

### Notes
- iter 11 = Part 7A master HTML migration. 9 files updated.
- KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE.
- iter 12+ priorities: Canon creation + migrate для остальных Parts (Part 8, 9, etc.).

---

## [9.1.10] - 2026-06-24

### Added (iter 10 — Canon Part 7A creation)
- **Canon Part 7A created** — `docs/canon/part_07a.md` (802 строки). 13 H2 секций (по одной на каждый `data-section` из `src/master/part_07a.html`): p7a_system_prompt, p7a_core_directives, p7a_tone_frame, p7a_format_lock, p7a_authors_note, p7a_sampling_params, p7a_model_checklist, p7a_ooc_protection, p7a_xml_tags, p7a_api_blocks, p7a_4k_fallback, p7a_token_budget, p7a_assembly_pipeline.
- **4 VS-маркера:** E08 (CORE DIRECTIVES, §7A.2), E16 (Author's Note Mechanics, §7A.5), E17 (Sampling Parameters, §7A.6), E02 (Assembly Pipeline, §7A.13). E07 (Voice Hierarchy) — cross-ref only внутри E16 (embedded в Part 3).
- **Front-matter:** `Migration status: ❌ NOT MIGRATED (iter 11 task)`.
- **Migration Notes таблица:** 54 TODO строки для iter 11 (50 "Оставить" + 4 "Сжать" кандидата: #22 sampling table, #26 model checklist, #42 plain-copy, #46 CORE DIRECTIVES пример в walkthrough Елены) + validation gates (8 чек-пунктов).
- **Decision для iter 11:** рекомендуется разбить на 2 под-итерации — iter 11a (§7A.1–§7A.7, ~660 строк master HTML, 3 VS-EMBED: E08+E16+E17) + iter 11b (§7A.8–§7A.13, ~510 строк, 1 VS-EMBED: E02).

### Fixed
- **KI#17 documentation drift:** AGENT_NAVIGATION.md §10 hint + worklog.md iter 9 record указывали 4 VS-EMBED в `src/master/part_07a.html` как «E07, E08, E16, E17». Фактически в файле — **E08, E16, E17, E02** (E02 = Assembly Pipeline, line 916; E07 = Voice Hierarchy — cross-ref внутри E16, embedded в Part 3). Fix applied: AGENT_NAVIGATION.md §10 hint + worklog.md iter 9 one-liner обновлены; Canon `part_07a.md` front-matter явно перечисляет embedded (E08/E16/E17/E02) vs cross-ref-only (E07).

### Validation
- `pnpm run validate:master` ✅ PASSED (all 12 checks). 0 errors. Warnings = pre-existing KI#13 baseline (123 inline `style=` + 22 "content outside section"). Canon-файлы не входят в build pipeline — валидация идентична iter 9.

### Notes
- iter 10 = Canon Part 7A creation. Никаких правок master HTML / visual-system / widget JS — только Canon + docs (8 files updated: 1 new + 7 modified).
- Master HTML `src/master/part_07a.html` не тронут — iter 11 задача.
- **KI#1..KI#12 + KI#15 закрыты.** KI#13 (123 inline + 22 outside) + KI#14 (content duplication, 26 viz параллельно) + KI#16 (qa:csp FAIL) + KI#17 (documentation drift, LOW, fixed) — ACTIVE.
- iter 11 priorities: Migrate `src/master/part_07a.html` против Canon §7A (рекомендуется 11a + 11b).

---

## [9.1.9] - 2026-06-24

### Changed (iter 9 — Part 4 validation pass)
- **Validation pass Part 4 master HTML** (мигрирован в iter 8 против Canon §4). Никаких правок кода — только проверки. Регрессий не найдено.
  - **Static HTML sanity check:** 11 секций (open/close balanced), 2 VS-EMBED divs (E05 + E06 well-formed), 3 infographic opens (2 retained + 1 inner), все 11 expected `data-section` IDs присутствуют. No orphan `<p>` между `</section>` и VS-EMBED E06 (iter 8 fix confirmed). No mermaid в part_04 (iter 8 removal confirmed). No broken internal hrefs.
  - **Served `parts/part_04.html` через локальный сервер** (Python http.server :3001): 40 825 байт / 676 строк. VS-EMBED E05 (line 8-9) + E06 (line 522-523) — present. Retained infographic p4_spine_mapping mnemonic (line 374) + p4_spine_navigation pipeline (line 495) — present. All 11 `data-section` IDs — present. Orphan `<p>` (iter7 line 599), orphan `<h4>Архитектура` (iter7 line 711), mermaid (iter7 line 147) — все 0 matches (iter 8 removals confirmed).
  - **`pnpm run validate:master`** ✅ PASSED (all 12 checks). Warnings = 123 inline `style=` + 22 "content outside section" (pre-existing KI#13, baseline iter 8).
  - **`pnpm run build`** ✅ SUCCESSFUL, hash `df283246` (same as iter 8, no drift).
  - **`pnpm run validate`** ✅ All 8 validation gates passed.
  - **`pnpm run test:unit`** ✅ 43/43 pass.
  - **`pnpm run lint`** ✅ 0 errors, 10 warnings (pre-existing).
  - **`pnpm run qa:bundle` / `qa:contrast` / `qa:doc-versions`** ✅ PASS.
  - **`pnpm run qa:english`** ❌ 29 issues (vs 29 в iter 7 — **no regression**). Все pre-existing false positives: `[Model: see Appendix B]` в `<span class="model-note">` (1 в part_04, 5 в part_07a) + BEM class names с `__` в part_07a.
  - **`pnpm run qa:syntax`** ❌ 236 markdown false positives (BEM class names с `__` — `ring-label--g3` и т.д.). Same count as iter 7 baseline. part_04 — 22 false positives (same as iter 8).
  - **`pnpm run qa:csp`** ❌ FAIL — `index.html has 2 inline script(s)`. **Pre-existing с iter 5** (`src/shell/index.html` имел 2 inline scripts с commit 60d7abd). **Зарегистрирован как KI#16** (NEW, ACTIVE).

### Known Issues (NEW, ACTIVE)
- **KI#16** `pnpm run qa:csp` FAIL: `index.html has 2 inline script(s)`. Pre-existing с iter 5: `src/shell/index.html` строки 24 (`document.documentElement.classList.add('js')`) + 108-126 (`mermaid.initialize({...})`). Build регенерирует `index.html` (root fallback) из `src/shell/index.html`. Не блокирует Canon миграцию (CSP не enforced на GitHub Pages), но нарушает §6 pitfall #1. Fix plan (iter 19+): вынести mermaid.initialize в `src/shell/widgets/mermaid-init.js` + CSP `unsafe-inline` exception для tiny js flag.

### Notes
- iter 9 = validation pass Part 4. Никаких правок master HTML / visual-system / widget JS — только docs (6 files updated).
- **KI#1..KI#12 + KI#15 закрыты.** KI#13 (123 inline + 22 outside) + KI#14 (content duplication, 26 viz параллельно) + KI#16 (qa:csp FAIL) — ACTIVE, continue iter 10+.
- iter 10 priorities: Canon Part 7A (`docs/canon/part_07a.md`) — 13 секций, 4 VS-EMBED (E07/E08/E16/E17), 1168 строк master HTML.

---

## [9.1.8] - 2026-06-23

### Changed (iter 8 — Part 4 pilot migration)
- **`src/master/part_04.html`** — мигрирован против Canon §4 (`docs/canon/part_04.md`). 777 → 676 строк (-13%). Применён Canon-first workflow iter 7 → iter 8.
  - **Удалены 4 дублирующих визуализации:**
    - `<div class="mermaid">` в p4_spine_overview — дублировал VS-EMBED E05 (chain GHOST→LIE→FLAW→NEED→WANT)
    - `<div class="infographic inf-pipeline">` в p4_spine_overview (5 steps G/L/F/N/W) — дублировал VS-EMBED E05
    - `<div class="infographic inf-pipeline">` в p4_spine_full_chain — дублировал VS-EMBED E05
    - `<div class="infographic inf-pipeline">` в p4_ghost_layers (G1/G2/G3 + periods) — дублировал VS-EMBED E06
  - **Сжаты re-explanation абзацы** в p4_spine_overview (строки 145, 162 оригинала) до 1 предложения + cross-ref на §4.2–§4.6. Цепочка GHOST→LIE→FLAW→NEED→WANT теперь показана только в VS-EMBED E05.
  - **Удалён orphan `<p>`** между `</section>` p4_spine_navigation и VS-EMBED E06 (строка 599 оригинала) — content outside `<section>` (1 из 23 KI#13 warnings), дублировала intro p4_ghost_layers.
  - **Удалена 4-я строка** (forward-ref "GHOST Layers: 3 уровня") из таблицы "Примеры GHOST" — структурно несогласована с таблицей примеров.
- **`docs/canon/part_04.md`** — front-matter обновлён → `Migration status: ✅ MIGRATED (iter 8 — see Migration Notes below for deviations)`. Migration Notes таблица переписана: каждая строка с пометкой DONE/DEVIATED/PARTIAL/BONUS. Принцип «viz > dry text» зафиксирован в intro.
- **`docs/canon/_README.md`** — §5 Migration Status: Part 4 → `✅ iter 7 | ✅ iter 8 | iter 7–8 (DONE)`. §9 история: iter 8 record.
- **`STATUS.md`** — rewritten iter 8 status. KI#13 → 122 inline + 22 outside (1 orphan удалён, было 123+23). KI#14 → 26 визуализаций параллельно (было 31, -4 dup + 1 orphan). Добавлено новое ограничение «Migration principle: viz > dry text (iter 8)».
- **`AGENT_NAVIGATION.md`** — header iter 7 → iter 8. §6 pitfall #32 KI#14 updated (counts + iter 8 principle). §8 iter 8 record + iter 9+ roadmap. §10 hint для iter 9.
- **`worklog.md`** — iter 7 → one-liner, iter 8 = новый record.
- **`PLAN.md`** — §5 iter 8 → ✅ DONE.
- **`docs/CONTENT_RESTRUCTURE_PLAN.md`** — §5.2 iter 8 row → ✅ DONE.

### Deviations от Canon Migration Notes (по предпочтению пользователя «viz > dry text»)
- **p4_spine_mapping infographic** (mnemonic GHOST→ТРИГГЕР, LIE→PSYCHOLOGICAL ANCHOR и т.д.) — KEPT (Canon said remove). Причина: мнемоническая визуализация комплементарна детальной таблице ниже, не дубликат.
- **p4_spine_navigation infographic** (4-step pipeline 1→5→6→7A/B→10) — KEPT (Canon said convert to `<ol>`). Причина: unique визуализация следующих Parts, не дубликат VS-EMBED.
- **LIE таблица** (4 строки) — KEPT 4 rows (Canon said reduce to 2). Причина: все 4 строки уникальны.
- **GHOST таблица** (4 строки) — KEPT 3 rows (Canon said 2; removed only structural forward-ref row).

### Validation
- `pnpm run validate:master` — ✅ PASSED (warnings = KI#13 inline styles + 2 content-outside-section для VS-EMBED markup — pre-existing pattern).
- `pnpm run build` — ✅ SUCCESSFUL, hash df283246.
- `pnpm run validate` — ✅ All validation gates passed.
- `qa:english` — 1 pre-existing false positive (line 441, `[Model: see Appendix B]` model-note span).
- `qa:syntax` — 22 false positives (BEM class names с `__`) — same count as baseline, different line numbers due to removed content.
- `qa:contrast` / `qa:bundle` / `qa:doc-versions` — ✅ PASS.

### Notes
- iter 8 = Part 4 pilot migration против Canon §4. **Migration principle (iter 8+):** при выборе «удалить текст или визуализацию» — viz сохраняется, dry-дублирующий текст удаляется. Unique визуализации не удаляются даже если Canon рекомендует. Unique text в таблицах не удаляется (даже если Canon рекомендует сократить). Применяется «очень деликатно».
- **KI#1..KI#12 + KI#15 закрыты.** KI#13 (122 inline styles + 22 outside section — было 123+23) + KI#14 (content duplication, 26 viz параллельно — было 31) — ACTIVE, continue iter 10+.
- iter 9 priorities: visual diff Part 4 в браузере (`pnpm run dev` → localhost:3000) + sanity-check что VS-EMBED E05+E06 рендерятся. iter 10 = Canon Part 7A.

---

## [9.1.7] - 2026-06-23

### Added (iter 7 — Canon scaffold + Part 4 pilot)
- **`docs/canon/_README.md`** (244 строки, 9 секций) — правила Canonical Guide Spec: зачем Canon, структура (`part_NN.md` + `appendix_*.md`), Markdown conventions (H1–H4 mapping, front-matter, VS-маркеры `[VS: E0X — ...]`, таблицы только с уникальными данными, примеры в одном canonical location, cross-refs `[ref: §X.Y]`), что запрещено (HTML/SVG/CSS/JS/inline styles), workflow Canon-first миграции (iter N = Canon, iter N+1 = HTML), Migration Status таблица (14 файлов: Part 4 created iter 7, остальные planned iter 8..18), anti-patterns (7 пунктов), validation checklist (12 пунктов).
- **`docs/canon/part_04.md`** (394 строки, 11 H2 секций) — пилотный Canon для Part 4 (SPINE Framework). Покрывает все `data-section` из `src/master/part_04.html` (p4_spine_overview, p4_ghost, p4_lie, p4_flaw, p4_need, p4_want, p4_spine_full_chain, p4_spine_mapping, p4_spine_check, p4_spine_navigation, p4_ghost_layers). VS-маркеры для E05 (SPINE chain) и E06 (GHOST Layers). Дедупликация: 6 устаревших `infographic inf-pipeline` + 1 `mermaid` заменены на VS-маркеры. Канонические примеры: Елена (§4.2–§4.6 + §4.9 consistency check), Выщербленный (§4.7 полная цепочка + §4.11 GHOST Layers). Migration Notes таблица внизу — TODO list для iter 8 (что удалить/заменить/оставить в master HTML).

### Fixed
- **KI#15** (CLOSED) `docs/anchor-redirects.json` stale duplicate of `data/anchor-redirects.json`. Удалён `docs/anchor-redirects.json` (108 строк, v8→v9 stale redirects). Single source of truth = `data/anchor-redirects.json` (runtime, v8→v9.1, загружается `lazy-loader.js`).

### Changed
- **`STATUS.md`** — iter 7 status + KI#15 CLOSED + Canon Guide Spec restriction added.
- **`AGENT_NAVIGATION.md`** — header iter 7. §6 pitfall #33 → CLOSED (iter 7 fix summary). §7 Documentation Map убрана строка про `docs/anchor-redirects.json`, добавлены строки для `docs/canon/_README.md` + `docs/canon/part_NN.md`. §8 iter 7 record + iter 8+ roadmap. §10 hint для iter 8 (migrate `part_04.html` против Canon §4).
- **`worklog.md`** — iter 6/6b → one-liners, iter 7 record (этот pass).
- **`PLAN.md`** — §2.1 `docs/anchor-redirects.json` → REMOVED iter 7 (KI#15). §5 iter 7 entry + iter 8+ roadmap.
- **`docs/CONTENT_RESTRUCTURE_PLAN.md`** — §9.3.1 added "FIXED iter 7" note (файл удалён, KI#15 CLOSED).

### Removed
- **`docs/anchor-redirects.json`** (108 строк) — KI#15 fix. Stale duplicate of `data/anchor-redirects.json` (v8→v9 redirects вместо актуальных v8→v9.1). Не загружался runtime, был только documentation reference, но не обновлялся с v9.1 restructure.

### Notes
- iter 7 = Canon scaffold + Part 4 pilot + KI#15 fix. Никаких правок master HTML / visual-system / widget JS — только docs (Canon creation + KI#15 cleanup).
- **KI#1..KI#12 + KI#15 закрыты.** KI#13 (123 inline styles + 23 outside section) + KI#14 (content duplication VS-EMBED ↔ текст) — ACTIVE, defer iter 8+.
- iter 8 priorities: migrate `src/master/part_04.html` против Canon §4 (TODO list — в `docs/canon/part_04.md` Migration Notes таблица).

---

## [9.1.6] - 2026-06-23

### Added (iter 6 — analytical + validation pass)
- **`docs/CONTENT_RESTRUCTURE_PLAN.md`** — канонический план переработки контента: анализ 7 паттернов дублирования (Pattern A..G) + стратегия Canonical Guide Spec (`docs/canon/part_NN.md`) + дорожная карта iter 7..19 + success metrics. §9 "Validation Pass" — verified 18 метрик, 3 исправлено, 5 новых находок.
- **Pattern H (NEW, found iter 6 validation)** — `docs/anchor-redirects.json` stale duplicate of `data/anchor-redirects.json`. v8→v9 redirects вместо актуальных v8→v9.1. Зарегистрирован как KI#15.

### Known Issues (NEW, ACTIVE)
- **KI#14** Content duplication VS-EMBED ↔ текст — 17 VS-EMBED'ов сосуществуют с 12 устаревшими infographic + 2 mermaid = 31 визуализация параллельно с текстом. GHOST упоминается 165 раз (~каждые 40 строк), SPINE — 160. Стратегия: Canonical Guide Spec + part-by-part миграция (iter 7..18). Все 11 term counts + 4 visual counts verified в validation pass.
- **KI#15** `docs/anchor-redirects.json` stale duplicate of `data/anchor-redirects.json`. Runtime использует `data/` версию. `docs/` версия не обновлялась с v9.1 restructure. Fix: удалить `docs/anchor-redirects.json` (iter 7+, 5 минут).

### Changed
- **`STATUS.md`** — iter 6 status + KI#14 + KI#15 + validation pass summary.
- **`AGENT_NAVIGATION.md`** — §1 section count 92→98 (verified), ~6000→~6 600 строк HTML. §6 pitfall #32 (KI#14 verified counts) + pitfall #33 (KI#15). §7 docs/anchor-redirects.json помечен STALE (KI#15). §8 iter 6 entry (analytical + validation). §10 hint для iter 7 (KI#15 + §9 ref).
- **`worklog.md`** — iter 6 → one-liner, iter 6b validation pass record (этот pass).
- **`PLAN.md`** — §5 iter 6 status updated (analytical + validation).

### Notes
- iter 6 = analytical + validation pass. Никаких правок master HTML / visual-system / widget JS — только docs.
- Все 18 ключевых метрик дублирования verified ✅ (GHOST 165, SPINE 160, FLAW 142, LIE 104, NEED 105, WANT 108, OCEAN 72, CoT 92, Enneagram 48, MBTI 25, CORE DIRECTIVES 36, AP-1..15 4-9, VS-EMBED 17, infographic 12, mermaid 2, inline style= 123, master HTML 6 576 строк, visual-system 17/6 369).
- 3 арифметические погрешности исправлены: section count 124→98 (CONTENT_RESTRUCTURE_PLAN §1.1, §1.2), AGENT_NAVIGATION §1 "92 секции, ~6000 строк" → "98 секций, ~6 600 строк".
- 5 новых находок: Pattern H (KI#15), Pattern E scope (3→12+ мест), CHANGELOG iter 6 gap (fixed), component-extracts/ unaudited (iter 19+), tables count 62+→76.
- KI#1..KI#12 закрыты. KI#13 + KI#14 + KI#15 — ACTIVE, defer iter 7+.

---

## [9.1.5] - 2026-06-23

### Fixed (iter 5 — KI#11 + KI#12 CRITICAL fixes)
- **KI#11** (CLOSED) `scripts/contrast_checker.mjs` ожидал `tokens.json`, которого не было в repo. Создан `visual-system/tokens.json` — JSON-экстракт из `DESIGN-TOKENS.css` с `primitives.color.semantic` (8 цветов) + `primitives.color.gray` (5 уровней). `qa:contrast` теперь работает: "All contrast ratios pass". Добавлен в aggregate `qa` script.
- **KI#12** (PARTIAL) 10 prohibited `<script>` blocks → 0 errors. Architecture decision (b): migrate inline scripts → widget JS modules. Созданы 5 widget scripts. Удалены 17 inline `<script type="module">` блоков из 10 master HTML файлов. `validate:master` wired в `precommit`. Остаток → KI#13 (123 inline styles + 23 content-outside-section warnings).

### Added
- **`visual-system/tokens.json`** — JSON design token extract for contrast_checker.mjs (8 semantic colors + 5 gray scale).
- **`src/shell/widgets/vs-scroll-observer.js`** — Global IntersectionObserver + MutationObserver for all `.scroll-enter`, `.enneagram-anim`, `.type-node` elements. Replaces duplicated pattern from 17 inline scripts.
- **`src/shell/widgets/vs-e10-enneagram.js`** — E10 enneagram hover/keyboard mini-card interaction with SVG→screen coordinate conversion.
- **`src/shell/widgets/vs-e13-diagnostic.js`** — E13 diagnostic tree expand/collapse with keyboard support.
- **`src/shell/widgets/vs-e15-blueprint.js`** — E15 annotated blueprint layer toggle with ARIA support.
- **`src/shell/widgets/vs-e16-author-note.js`** — E16 author's note template toggle with ARIA support.

### Changed
- **`src/master/part_01..10.html`** — removed 17 inline `<script type="module">` blocks (total -25,494 chars). All VS element JS logic now in `src/shell/widgets/vs-*.js`.
- **`src/shell/index.html`** — added 5 new widget script tags (vs-scroll-observer, vs-e10-enneagram, vs-e13-diagnostic, vs-e15-blueprint, vs-e16-author-note).
- **`package.json`** — `qa:contrast` now passes `visual-system/tokens.json` as argument. `qa:contrast` added to aggregate `qa`. `precommit` now includes `validate:master`.

### Known Issues (NEW, ACTIVE)
- **KI#13** 123 inline `style=` attributes + 23 "content outside section" warnings в master HTML. MEDIUM impact — not prohibited by §3 but pitfall #16 recommends CSS classes. Defer iter 6+.

### Notes
- iter 5 = KI#11/KI#12 CRITICAL fixes. validate:master: 0 errors (was 10), 146 warnings remain (KI#13).
- KI#1..KI#12 all closed or partially fixed. KI#13 — ACTIVE, defer iter 6+.

---

## [9.1.4] - 2026-06-23

### Fixed (iter 4 — LOW-priority cleanup + QA wiring)
- **KI#10** (NEW) `scripts/check_english.py` lines 325-334 + `scripts/check_syntax_mix.py` line 169 содержали stale v7 paths (`src/parts-l1/l2/l3/`, removed в v8) + stale "v6" comment. Пофикшено: оба скрипта теперь сканируют только `src/master/` (v8+ canonical).

### Added
- **`package.json` `qa:*` scripts** — 9 новых scripts для ad-hoc QA (manual run, НЕ в precommit/CI): `qa:csp`, `qa:bundle`, `qa:contrast`, `qa:english`, `qa:english:docs`, `qa:syntax`, `qa:doc-versions`, `qa:interactive`, aggregate `qa`. Orphan QA scripts (`csp_check.mjs`, `bundle_check.mjs`, `check_english.py`, `check_syntax_mix.py`, `check-doc-versions.mjs`, `test-interactive.mjs`, `contrast_checker.mjs`) теперь wired и discoverable через `pnpm run qa:*`.
- **`AGENT_NAVIGATION.md` §9 "Cross-Reference Pairs"** — новый раздел, merged из удалённого `docs/cross_reference_sync.md` (14 bidirectional cross-ref pairs + v9.1 restructure changes + validation checklist).
- **`visual-system/PLAN.md` §4.0 "Integration Status"** — новый подраздел в Phase 4 с actual state audit: markers ✅ 17/17, component-extracts ✅ 17/17, INTEGRATION-MAP ✅, actual content replacement ❌ (master sections still contain original textual content after each marker), widget JS porting ⚠️ partial, build pipeline updates ❌ not verified.

### Changed
- **`docs/character_bible.md`** trimmed (770 → 645 строк, -125). Removed duplicated Elena (section 1) и Выщербленный (section 8) — они каноничны в per-character bibles. Секции заменены на pointer stubs. Header обновлён: deprecated notice → "Supporting Characters Registry" clarification. Per-character bibles (`elena_character_bible.md`, `vyshcherblenny_character_bible.md`) — без изменений (canonical Source of Truth).

### Removed
- **`docs/cross_reference_sync.md`** (62 строки) — merged в `AGENT_NAVIGATION.md` §9. Compact файл с 14 cross-ref pairs + overhead на шапку/версию.

### Known Issues (NEW, ACTIVE)
- **KI#11** `scripts/contrast_checker.mjs` ожидает `tokens.json`, которого нет в repo. `qa:contrast` gracefully SKIPs. Fix options (a/b/c) — defer to iter 5+.
- **KI#12** Visual-system integration introduced 10 prohibited `<script>` blocks + 123 inline `style=` attributes + 23 "content outside section" violations в master HTML. `pnpm run validate:master` не в `precommit`, поэтому 10 errors ship silently. Fix plan (4 steps) — defer to iter 5+ (нужен architecture decision: update §3 rule OR migrate to widget JS).

### Notes
- iter 4 = LOW-priority cleanup (4 planned tasks) + QA wiring revealed 2 new KI. Без правок master HTML / shell / widget JS — только docs + package.json + 2 Python script fixes (KI#10).
- Подробности — в `worklog.md` (iter 4 record) и `STATUS.md` (KI#10 closed, KI#11/KI#12 active).
- Все 4 planned iter 4 tasks done. KI#1..KI#10 закрыты. KI#11/KI#12 — ACTIVE, defer to iter 5+.

---

## [9.1.3] - 2026-06-23

### Fixed (iter 3 — orphan scripts cleanup + pitfalls expansion)
- **KI#8** `scripts/validate-migration.mjs` (888 строк) + `scripts/gen-redirect-map.mjs` (257 строк) + `docs/migration_map.md` (586 строк) — orphan trio удалён. All про v5.12→v6 migration (4 major версии назад при v9.1.0). Neither в `package.json`, ни в CI workflows, ни в pre-commit hook. `data/anchor-redirects.json` (output `gen-redirect-map.mjs`) — KEEP: runtime data, загружается `src/shell/lazy-loader.js` строки 67-81. Hardcoded fallback в lazy-loader.js (строки 51-62) обеспечивает работу без JSON.
- **KI#9** (NEW) `DELETIONS-iter2.txt` — stale cleanup-instruction file. Iter 2 удалил `DELETIONS-iter1.txt` с пометкой "больше не нужен после iter 2", но при этом создал `DELETIONS-iter2.txt` — противоречие. Удалён в iter 3.
- `docs/terminology_dictionary.md` — stale reference `p7_core_directives` → `p7a_core_directives` (v9.0 Part 7 split). Header version 9.0.0 → 9.1.0.
- `visual-system/PLAN.md` Appendix E §2 + F §2 "Recommended Follow-up Actions" §2 — устаревшие рекомендации про "clean up root fallback files" помечены `[OBSOLETE per iter 2 KI#1/KI#2]` (root fallbacks — by design per `.gitignore` строки 22-30 + `build-shell-unified.mjs` строки 237-293).

### Added
- **AGENT_NAVIGATION.md §6 pitfalls** расширены с 18 до 30 пунктов. Пункты 19-30 добавлены из FIX-04..31 commit messages: dual assembly pipeline consolidation, token budget misplacement, CORE DIRECTIVES numbering conflict, content duplication 25-30%, dead SPINE-validator removal, SVG CSS variables, WCAG contrast, responsive/aria/E07 bars, Mermaid CDN dependency, code quality pass, final a11y pass, orphan scripts audit (meta-pitfall).
- **AGENT_NAVIGATION.md §1 scripts/ list** классифицирован: package.json-wired (5), CI-wired (2 Python), orphan QA tools (5+, KEEP), removed in iter 3 (2).

### Removed
- **scripts/validate-migration.mjs** (888 строк) — KI#8: orphan, validates v5.12→v6 migration (4 major версии назад).
- **scripts/gen-redirect-map.mjs** (257 строк) — KI#8: orphan, generator for already-committed `data/anchor-redirects.json`.
- **docs/migration_map.md** (586 строк) — KI#8: only depended on by 2 orphan scripts above.
- **DELETIONS-iter2.txt** (13 строк) — KI#9: stale cleanup-instruction file (poe2-regex-ru convention).

### Notes
- iter 3 = orphan scripts cleanup + pitfalls expansion. Без правок кода/UI/тестов/shell — только docs + удаление orphan-троицы.
- Подробности — в `worklog.md` (iter 3 record) и `STATUS.md` (KI#8/KI#9 resolution).
- Все 9 KI (KI#1..KI#9) закрыты. Активных Known Issues нет.

---

## [9.1.2] - 2026-06-23

### Fixed (iter 2 — Known Issues cleanup)
- **KI#1** `parts/` в repo — закрит как "won't fix — by design" после анализа `build-shell-unified.mjs`: root-level `parts/`, `widgets/`, `assets/`, `event-bus.js`, `data/`, `index.html`, `build.hash` — это **intentional root fallbacks** для GitHub Pages (regenerated на каждом билде, см. `.gitignore` строки 22-30). Не gitignored.
- **KI#2** Удалён `src/shell/assets/vs-styles.css` — stale duplicate, не читается `build-shell-unified.mjs` (ASSETS_SRC = `src/assets/`, не `src/shell/assets/`). Top-level `widgets/`, `assets/`, `event-bus.js` — НЕ дубликаты, а root fallbacks (см. KI#1).
- **KI#5** `CONTRIBUTING.md` — секция "Make Changes": `src/parts/` → `src/master/`, добавлены `src/shell/`, `src/assets/`, `data/`, пометка о root fallbacks.
- **KI#6** `docs/architecture.md` — секция "v7 → v8 Migration (Archived)" полностью удалена, заменена compact Version History таблицей. Также убраны stale-ссылки на `migration_map.md` / `transition_guide.md` в Directory Structure.
- **KI#7** (NEW) iter 1 commit `c6a58c8` в message заявлял удаление `migration_map.md`, `transition_guide.md`, `ap_reference_inventory.md`, но фактически не удалил. В iter 2 удалены `transition_guide.md` и `ap_reference_inventory.md` (нет кодовых зависимостей). `migration_map.md` оставлен — см. KI#8.
- **KI#8** (NEW, DEFERRED to iter 3) `scripts/validate-migration.mjs` зависит от `docs/migration_map.md` (orphan script, не в package.json). Решение iter 3: удалить оба orphan-скрипта + migration_map.md, либо wire в package.json.

### Removed
- **docs/user_journeys.md** (462 строки) — KI#4: Draft с 2026-05-14 (v8.0.0), содержал устаревшие CORE DIRECTIVES (pre-v8 naming: BEHAVIORAL ANCHORING, VOICE ISOLATION и т.д. вместо актуальных SHOW NEVER TELL, EMBODIMENT FIRST и т.д.) и Part 7 не разделённый на 7A/7B. Core linear-journey concept уже в `AGENT_NAVIGATION.md` §3 + `docs/architecture.md` Section Model.
- **docs/transition_guide.md** (179 строк) — KI#7: iter 1 commit message заявлял удаление, но фактически не удалил. Нет кодовых зависимостей.
- **docs/ap_reference_inventory.md** (179 строк) — KI#7: iter 1 commit message заявлял удаление, но фактически не удалил. Одноразовый документ Phase 0.
- **DELETIONS-iter1.txt** — stale iter 1 cleanup instruction file (poe2-regex-ru convention), больше не нужен после iter 2.
- **src/shell/assets/** — stale duplicate of `src/assets/`.

### Notes
- iter 2 = cleanup Known Issues из iter 1 + 2 новых KI (KI#7, KI#8) обнаружены и документированы. Без правок кода/UI/тестов/shell — только docs + удаление stale duplicates.
- Подробности — в `worklog.md` (iter 2 record) и `STATUS.md` (KI#1-8 resolution).

---

## [9.1.1] - 2026-06-23

### Added
- **AGENT_NAVIGATION.md** — entry document для AI-агентов (structure map, build pipeline, section model, widget arch, 18 pitfalls, doc map, open proposals). Перенят паттерн из `poe2-regex-ru`.
- **STATUS.md** — текущий статус проекта + 6 Known Issues + подтверждённые ограничения.
- **worklog.md** — iter log (последняя итерация подробно, предыдущие одной строкой).
- **PLAN.md** — полный анализ `poe2-regex-ru` навигации/документации + roadmap перенять в `live-char-guide` с обоснованием ЗАЧЕМ.

### Removed
- **docs/migration_map.md** (586 строк) — устарел: v5.12→v6 при текущей v9.1.0 (4 major версии назад). Git history сохранит при необходимости.
- **docs/transition_guide.md** (179 строк) — устарел: v7→v8 при текущей v9.1.0.
- **docs/ap_reference_inventory.md** (179 строк) — одноразовый документ Phase 0 для renumbering Phase 2.3, задача выполнена.

### Updated
- **README.md** — добавлены ссылки на новые AGENT_NAVIGATION/STATUS/worklog/PLAN. Убраны ссылки на удалённый transition_guide. Структура репозитория обновлена с 4 новыми файлами верхнего уровня.
- **docs/architecture.md** — секция "v7 → v8 Migration" помечена как **Archived** (transition_guide.md удалён в этой итерации).

### Notes
- iter 1 = docs restructure. Без правок кода, тестов, UI или shell.
- Полный анализ и обоснование — в `PLAN.md`.
- Known Issues после iter 1: 6 шт (KI#1 parts/ в repo, KI#2 дубли widgets/assets, KI#3 CHANGELOG не отражает FIX-N, KI#4 user_journeys.md Draft, KI#5 CONTRIBUTING.md устаревший src/parts/, KI#6 architecture.md archived секция). См. `STATUS.md`.

---

## [9.1.0] - 2026-05-16

> Bugfix pass: FIX-01 through FIX-31. См. git log `0816ff1`..`2f57e8b` для детальных коммитов. Ниже — user-facing summary по категориям.

### Phase 1 — Critical Runtime Fixes (FIX-01..FIX-03)
- **FIX-01** `executeInlineScripts` — module/return handling for inline scripts.
- **FIX-02** `persona-cross` widget — guard against infinite recursion loop.
- **FIX-03** Clipboard API — `navigator.clipboard` guard for insecure contexts.

### Phase 2 — Architectural Fixes (FIX-04..FIX-10, FIX-28..FIX-29)
- **FIX-04..FIX-07** Dual assembly pipeline consolidation, token budget misplacement, CORE DIRECTIVES numbering conflict, content duplication ~25-30%.
- **FIX-08..FIX-10** Version sync across 4 locations, dead SPINE-validator removal, SVG CSS variables fix.
- **FIX-28..FIX-29** Version sync follow-up, structural cleanup.

### Phase 3+4 — Visual & Accessibility Fixes (FIX-11..FIX-19)
- **FIX-11..FIX-19** Visual system elements repair, WCAG contrast, hero timing, responsive breakpoints, aria-label quotes, E07 invisible bars, E15 callouts, E17 opacity, hardcoded rgba → CSS variables, animation fixes.

### Phase 5+6 — Code Quality & Build (FIX-20..FIX-31)
- **FIX-20..FIX-21** Heading hierarchy (`<h1>` one per page, no skipped levels).
- **FIX-22** `blueprint-viewer` widget — proper `destroy()` lifecycle on unmount.
- **FIX-23 + FIX-26** Inline styles → CSS migration (moved to `src/shell/styles.css` / `assets/vs-styles.css`).
- **FIX-24** README update.
- **FIX-25** CSP `script-src` cleanup; added `cdn.jsdelivr.net` to `style-src` / `font-src` for Mermaid.js.
- **FIX-26** Mermaid diagrams rendering + library integration; broader regex for `executeInlineScripts` (don't narrow back — would miss invalid scripts).
- **FIX-27** Code quality pass.
- **FIX-30** `noscript` element in build artifact.
- **FIX-31** Final accessibility + code quality pass.

### Notes
- Все FIX-N коммиты помечены в git log. Подробности каждого фикса — в commit message.
- Pitfalls, выученные из этих фиксов, частично перенесены в `AGENT_NAVIGATION.md` §6. Полное расширение pitfalls до ~30 пунктов — iter 3+.

---

## [9.0.0] - 2026-05-15

### Restructured
- Split Part 7 into Part 7A (System Prompt & Assembly) and Part 7B (Lorebook, Greeting & Compatibility)
- Moved MBTI from Part 5 to Appendix A
- Moved AP-15 (OCEAN Overload) from Part 8 to Part 5 as a Warning callout
- Renumbered anti-patterns in Part 8 after AP-15 removal

### Deduplicated
- Established canonical locations for all major concepts (including all 7 CORE DIRECTIVES)
- Trimmed all non-canonical references to 1–2 sentence summaries with links
- Consolidated [MODEL_NOTE] tags into Appendix B (Model Capability Table)
- Re-checked new content from example overhaul for duplication

### Unified
- Standardized terminology (System Prompt vs CORE DIRECTIVES distinction; Embodiment Protocol vs Embodiment First distinction)
- Added all 7 CORE DIRECTIVES, Identity Block, Greeting Message, and Token Budget to terminology dictionary
- Replaced 4+ callout types with 3: RULE, RECOMMENDATION, EXAMPLE
- Removed emoji markers from callout blocks
- Removed layering artifacts (advanced/opt tags, navigation blocks, end-of-Part summaries)
- Established language policy: English technical terms + Russian prose

### Examples
- Designated Елена as primary thread-through character (Parts 1–9)
- Designated Выщербленный as secondary thread-through for advanced mechanics
- Designated Йоуёма as tertiary for Voice Bleed demonstration
- Moved all other characters to Part 10
- Added status labels: [ILLUSTRATION], [TEMPLATE], [STUB]
- Added stylistic neutrality disclaimer
- Annotated narrative passages with directive demonstrations (all Parts)
- Created Character Bibles for Елена and Выщербленный as single source of truth

### Navigation
- Reduced cross-reference count by ~50%
- Limited references to 3 types: Prerequisite, Canonical Definition, Diagnostic Link
- Unified reference format across all phases
- Added transitional bridges between all Parts
- Added concept relationship diagram at guide start
- Added Table of Contents

### Added
- Appendix A: MBTI Reference
- Appendix B: Model Capability Table
- Appendix C: Glossary
- Concept relationship diagram (Mermaid)
- Table of Contents
- CHANGELOG.md
- docs/elena_character_bible.md
- docs/vyshcherblenny_character_bible.md
- docs/ap_reference_inventory.md

### Fixed
- Removed orphan reference to Эллиот Алдерсон from content_map.md
- Updated data/glossary.json to match canonical terminology
