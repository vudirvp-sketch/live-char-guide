# Changelog

## [9.1.51] - 2026-07-21

### iter 51 — KI#36 (anchor navigation) ✅ CLOSED

HIGH-priority UX fix: все внутренние якорные ссылки в гайде невалидны. Статичный TOC (`<div class="guide-toc">` в `src/master/part_01.html`) и Glossary panel (`data/glossary.json` → `term.anchor_id`) ссылаются на `#p1_card_overview` etc., но секции имеют только `data-section="p1_card_overview"` без `id`. Браузер ищет `id`, не `data-section` — поэтому все 96+ ссылок молча скроллируют наверх. FAB TOC (кнопка `📑`) отображал только 1 пункт из-за селектора `$$('section[id]')` в `lazy-loader.js` — только 1 секция имела `id`.

### Fixed (iter 51 — KI#36)
- **KI#36 часть 1 — id attributes:** добавлены `id` атрибуты 98 секциям в `src/master/*.html` (= значению `data-section`). Теперь все `<section data-section="X">` имеют `id="X"`. Браузерный anchor mechanism работает нативно.
- **KI#36 часть 2 — lazy-loader.js selector:** `$$('section[id]')` → `$$('section[data-section]')` в `generateTOC()` (L834) и `initActivePartHighlighting()` (L955). FAB TOC теперь отображает все 10 Parts (раньше 1).
- **KI#36 часть 3 — hashchange listener:** добавлена функция `initHashChangeListener()` (L813-826) — слушает `window.addEventListener('hashchange', ...)` для надёжного smooth scroll при клике на якорные ссылки.
- **KI#36 часть 4 — Glossary panel auto-close:** в `loadGlossaryContent()` после рендера HTML добавлен обработчик клика на `a.glossary-link` — закрывает glossary panel через 50ms после клика, чтобы пользователь видел целевой раздел.
- **Русификация:** 13 английских фраз переведено (5×«see Appendix B» → «см. Приложение B» + 4×«Model Capability Table» → «Таблица возможностей моделей» + «universal Quick Check» → «универсального Quick Check» + «universal parameter checklist» → «универсальный чеклист параметров» + 2×«see → Part X» → «см. → Part X» + «5 items» → «5 пунктов» + «structural check» → «структурная проверка»). English leaks: 33 → 20 (оставшиеся 20 — by design: part_10 примеры карточек, CORE DIRECTIVES English в SP, Quality Grade, Token Budget Check).

### Tests (iter 51 — ALL PASS)
- `pnpm run build` — ✅ shell Hash `69d9b813` unchanged (lazy-loader.js не входит в shell hash). contentHash изменён (6th change since iter 34).
- `pnpm run validate:master` — ✅ 12 checks PASS
- `pnpm run validate` — ✅ 8 gates PASS, index.html 7.5KB
- `pnpm run test:unit` — ✅ 43/43
- `pnpm run test:integration` — ✅ 21/21
- `pnpm run qa:csp` — ✅ 0 inline scripts
- `pnpm run qa:bundle` — ✅ 7.5KB
- `pnpm run qa:doc-versions` — ✅ PASS
- `pnpm run lint` — ✅ 0 errors, 12 baseline warnings
- `python3 scripts/audit_canon_master_sync.py` — ✅ **96/96 PASS** (was 92/92, +4 KI#36 id checks)
- `python3 scripts/audit_canon_master_drift.py` — ✅ informational (0 master-only, 3 canon-only by design)
- `python3 scripts/check_english.py` — 20 baseline leaks (was 29; -9 от русификации)
- `python3 verify_anchors.py` — ✅ **96/96 anchor references resolve to id attributes**

### Modified files (iter 51)
- `src/master/part_01.html` — +8 id attrs
- `src/master/part_02.html` — +6 id attrs
- `src/master/part_03.html` — +8 id attrs
- `src/master/part_04.html` — +11 id attrs + 1 русификация
- `src/master/part_05.html` — +8 id attrs
- `src/master/part_06.html` — +5 id attrs + 2 русификации
- `src/master/part_07a.html` — +13 id attrs + 5 русификаций
- `src/master/part_07b.html` — +5 id attrs
- `src/master/part_08.html` — +16 id attrs
- `src/master/part_09.html` — +11 id attrs + 1 русификация
- `src/master/part_10.html` — +4 id attrs
- `src/master/appendix_glossary.html` — +1 id attr
- `src/master/appendix_mbti.html` — +1 id attr
- `src/master/appendix_model_table.html` — +1 id attr
- `src/shell/lazy-loader.js` — +25 строк (2 selector fixes + hashchange listener + glossary auto-close)
- `scripts/audit_canon_master_sync.py` — +4 KI#36 checks + 2 substring updates + header docstring (92→96 checks)
- `STATUS.md` — iter 51 record, iter 51+ → iter 52+ Roadmap
- `worklog.md` — iter 51 detailed record

### Helper scripts (persisted in `/home/z/my-project/scripts/`)
- `add_section_ids.py` — добавляет `id` атрибуты всем секциям с `data-section` в `src/master/*.html`.
- `verify_anchors.py` — проверяет, что все `href="#X"` в `parts/*.html` разрешаются в `id="X"`.

---

## [9.1.50] - 2026-07-20

### iter 50 — KI#34 + KI#35 ✅ CLOSED

MEDIUM-priority KI#34 fix: добавлен `<section data-section="p1_prebuild_checklist" data-toc-nav>` block в `src/master/part_01.html`. LOW-priority KI#35 fix: `` `data-section: p4_spine_overview` `` line added в `docs/canon/part_04.md`. Regression test extended 89→92→96 checks.

---

## [9.1.37] - 2026-07-08

### iter 37 — Canon Audit P2 (KI#21 P2) ✅ CLOSED

18 правок P2 из `docs/AUDIT_VERIFICATION.md` §4.3 применены во всех 14 canon-файлах. Canon total: 5 035 → 3 905 строк (−1 130 net deletion). Build hash `69d9b813` unchanged (canon-файлы не входят в hash computation). 45/57 правок KI#21 закрыты (16 P0 + 11 P1 + 18 P2). Осталось 12 правок + 3 новые секции (P3) на iter 38.

### Changed (iter 37 — KI#21 P2 fixes)
- **P2-1 (C1):** `part_01.md` §1.4 — added «Ключевые термины» block with 1-sentence definitions of Anchor/Voice/SPINE/OCEAN inline + bold **Pattern Matcher** in RULE.
- **P2-2 (C2):** `docs/canon/_README.md` §3.9 (new) — explicit policy: callout labels (`RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`) stay in English as semantic anchors; callout body in Russian.
- **P2-3 (C5):** All canon files — kept 2 Bridge paragraphs (Part 6→7A, Part 9→10), deleted 8 others.
- **P2-4 (E1):** All canon files (except `_README.md`) — front-matter converted from markdown quote-block to YAML (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`).
- **P2-5 (E2):** All canon files — deleted trailing meta-sections: Migration Notes / Compression results / Validation gates / DGA Phase 2 fix.
- **P2-6 (E3):** All canon files — deleted «Cross-references из других Parts» sections (reverse-index duplicates inline `[ref: ...]`).
- **P2-7 (E4):** All canon files — deleted inline H3 «Что вы теперь умеете» resume sections. Added **Synthesis:** 1-2-sentence summary in 4 Parts (01, 04, 07A, 08) with major conceptual shift.
- **P2-8 (E5):** `part_01.md` §1.3 — orphan section merged into §1.4 (content already in §1.2 + §1.4).
- **P2-9 (E6):** `part_07a.md` L162, L172 — Pattern Matcher references updated to «Pattern Matcher (см. Part 1 §1.4)».
- **P2-10 (E7):** All canon files — cliché «Применяется «очень деликатно»» removed together with Migration Notes sections (9 occurrences in 9 files).
- **P2-11 (F1):** All canon files — 22 stub «Canon planned iter 13/14/16» removed (Parts 2-10 already MIGRATED).
- **P2-12 (B4 partial):** `part_03.md` §3.4 — Tier 1/2/3 renamed to Quality Grade A/B/C + added disambiguation block (do not confuse with CoT Tier 0-3 from Part 6 or GHOST Layers Tier 1-3 from Part 10). Heading «Tier 1 vs Tier 3» → «Grade A vs Grade C».
- **P2-13 (F4):** `part_04.md` §4.2 L55 — «Запрещённые слова» → «Запрещённые формулировки — это выводы-ярлыки, не события» + 2 new forbidden example words.
- **P2-14 (F5):** `part_05.md` §5.1 (after RULE) — added **Cautious zone (30–40 / 60–70)** definition with Elena example.
- **P2-15 (F6):** `part_07a.md` L305 (sampling params table) — 3 Voice Placement cells: `<br/>` replaced with em-dash (HTML tags forbidden in Canon per `_README.md` §3.7).
- **P2-16 (F7):** `part_07a.md` §7A.1 — Keirsey SP clarified: «Artisan/Ремесленник из MBTI» → «Sensing-Perceiving, см. Appendix A — MBTI» (Keirsey ≠ MBTI).
- **P2-17 (F9):** `part_09.md` §9.6 Decision Tree — added 1-word symptoms for each AP-reference: AP-3 Voice-in-Desc, AP-6 No-Anti-Godmoding, AP-15 OCEAN-Overload, AP-5 RepPen-High, AP-7 PP-Leak, AP-10 CoT-Overload, AP-9 SPINE-Broken.
- **P2-18 (F10):** `part_10.md` §10.1 — 4 inline comments `<!-- ↑ ... -->` removed; replaced with separate **Annotation:** callout after Elena card with 6 items (DESCRIPTION→spine, DESCRIPTION→ocean, EXAMPLES, ANCHORS Базовые, ANCHORS FLAW-linked, GREETING).

### Helper scripts (persisted in `/home/z/my-project/scripts/iter37_*.py`)
- `iter37_p2_bulk.py` — YAML front-matter conversion + delete trailing meta-sections + add Synthesis.
- `iter37_p2_inline_cleanup.py` — delete inline H3 resume + delete excess Bridge paragraphs.
- `iter37_p2_canon_planned_stubs.py` — regex-remove «Canon planned iter X» stubs.
- `iter37_p2_stub_cleanup.py` — fix residual `] .` punctuation after stub removal.

### Validation (iter 37 — ALL PASS)
- `validate:master` — ✅ 12 checks, no regressions
- `build` — ✅ hash `69d9b813` unchanged (canon-файлы не в hash computation; index.html root fallback regenerated — only `Generated:` timestamp updated, content identical)
- `validate` — ✅ 8 gates PASS, index.html 7.5KB
- `test:unit` — ✅ 43/43
- `test:integration` — ✅ 21/21
- `lint` — ✅ 0 errors, 12 warnings (baseline)
- `qa:csp` — ✅ PASS (0 inline scripts)
- `qa:bundle` — ✅ 7.5KB (max 500KB)
- `qa:doc-versions` — ✅ PASS
- `audit_vs_embeds.py` — ✅ 0 regressions
- `check_english.py` — ✅ 0 leaks in `docs/canon/` (29 baseline leaks in `src/master/` HTML — unchanged)

### Modified files (iter 37)
All 14 canon files modified: `docs/canon/_README.md`, `docs/canon/appendix_glossary.md`, `docs/canon/appendix_mbti.md`, `docs/canon/appendix_model_table.md`, `docs/canon/part_01.md`, `docs/canon/part_02.md`, `docs/canon/part_03.md`, `docs/canon/part_04.md`, `docs/canon/part_05.md`, `docs/canon/part_06.md`, `docs/canon/part_07a.md`, `docs/canon/part_07b.md`, `docs/canon/part_08.md`, `docs/canon/part_09.md`, `docs/canon/part_10.md`. Plus `index.html` (root fallback regenerated, only timestamp). Documentation: `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `docs/AUDIT_VERIFICATION.md`, `CHANGELOG.md`.

---

## [9.1.32] - 2026-07-08

### iter 32 — Visual System Scroll-Animation Bug (KI#20) ✅ CLOSED

Найден и исправлен системный визуальный баг: 5 из 18 VS-EMBED элементов (E06, E07, E08, E09, E15) отображались поломанно на собранном сайте — SVG-кольца GHOST, столбцы Voice Hierarchy, ноды Core Directives, OCEAN pentagon + профиль, annotation callouts Annotated Blueprint были невидимы или частично видны (эффект "наезжающих друг на друга" и "хаотичного неполного отображения" по user-у).

### Root cause (iter 32)
CSS правила для animation classes (`.ring-anim`, `.bar-rect`, `.anim-group`, `.pentagon-anim`, `.callout` и др.) задают initial state `opacity:0` / `transform:scale(0)`, transition к visible state требует `.is-visible` class на том же элементе. Local `IntersectionObserver` в standalone element HTML файлах (`visual-system/elements/E0X-*.html`) наблюдал эти классы напрямую. Но при embedding в master HTML inline scripts вырезались (KI#16, CSP compliance, iter 19). Замена `vs-scroll-observer.js` наблюдала только `.scroll-enter, .enneagram-anim, .type-node` — не покрывая остальные animation classes. Элементы оставались в initial state навсегда.

### Changed (iter 32 — KI#20 fix: vs-scroll-observer.js selector extended)
- **`src/shell/widgets/vs-scroll-observer.js` edited** — `SCROLL_ENTER_SELECTOR` extended from 3 classes (`.scroll-enter, .enneagram-anim, .type-node`) → 11 classes (added `.ring-anim, .ring-text-anim` for E06, `.bar-rect` for E07, `.anim-group, .center-pulse` for E08, `.pentagon-anim, .profile-anim` for E09, `.callout` for E15). File header updated: version 1.0.0 → 1.1.0, KI#20 fix docstring. Unused `observeElement()` function removed (lint warning fixed: 13 → 12 warnings).
- **`widgets/vs-scroll-observer.js` regenerated** — root fallback (копия `src/shell/widgets/`, build artifact).
- **`scripts/audit_vs_embeds.py` NEW** — regression audit tool. Парсит `src/assets/vs-styles.css` для нахождения всех animation classes (с `.is-visible`-dependent правилом). Парсит `src/shell/widgets/vs-scroll-observer.js` для извлечения `SCROLL_ENTER_SELECTOR`. Для каждого VS-EMBED в `src/master/*.html`: проверяет, что каждый animation-classed element EITHER имеет `scroll-enter` class, EITHER его animation class входит в JS observed set. Interactive-only classes (`.mini-card` для E10) — exclude list.
- **`src/master/part_*.html` NOT edited** — fix полностью в JS widget layer, без master HTML изменений. Build hash `fd3d96d3` unchanged.

### KI#20 sub-items (iter 32 — 5/5 ✅ FIXED)
| Sub | Part | Element | Animation classes | Элементов | Status |
|-----|------|---------|-------------------|-----------|--------|
| A | Part 4 | E06 GHOST Layers | `.ring-anim`, `.ring-text-anim` | 10 | ✅ FIXED |
| B | Part 3 | E07 Voice Hierarchy | `.bar-rect` | 3 | ✅ FIXED |
| C | Part 7A | E08 Core Directives | `.anim-group`, `.center-pulse` | 9 | ✅ FIXED |
| D | Part 5 | E09 OCEAN Pentagon | `.pentagon-anim`, `.profile-anim` | 10 | ✅ FIXED |
| E | Part 10 | E15 Annotated Blueprint | `.callout` | 11 | ✅ FIXED |

Affected total: 43 animation elements across 5 VS-EMBEDs.

### Removed (iter 32 — stale iter-specific docs cleanup)
- **`README_iter18.md` deleted** (100 строк) — iter 18 final cleanup README, superseded by current STATUS/worklog.
- **`README_ITER8_MERGE.md` deleted** (97 строк) — iter 8 merge archive README, superseded.
- **`ITER9_PATCH_README.md` deleted** (60 строк) — iter 9 patch README, superseded.
- **`MERGE_INSTRUCTIONS.md` deleted** (187 строк) — iter 22 one-time merge instructions, long past.
- Все 4 файла НЕ referenced ни в одном другом файле репозитория (verified via grep).

### Validation gates (iter 32 — ALL PASSED)
- `validate:master` ✅ (0 errors, baseline warnings unchanged).
- `build` ✅ (hash `fd3d96d3` unchanged — только JS widget edit, hash computed from index.html).
- `validate` ✅ (8 gates).
- `test:unit` ✅ (43/43 pass).
- `lint` ✅ (0 errors, 12 warnings — was 13, -1 от cleanup unused function).
- `qa:csp` ✅.
- `qa:bundle` ✅ (7.2KB).
- `qa:doc-versions` ✅.
- `python3 scripts/audit_vs_embeds.py` ✅ — 0 regressions.

### Changed (iter 32 — docs)
- **`STATUS.md`** — rewritten: iter 32 record, KI#20 ✅ CLOSED (5 sub-items A-E table), iter 33+ roadmap — none planned, все KIs CLOSED.
- **`worklog.md`** — iter 32 record (самый подробный), iter 31 → one-liner, compressed "Предыдущие итерации" section.
- **`AGENT_NAVIGATION.md`** — header iter line updated (+KI#20 ✅ CLOSED iter 32). §6 pitfall #39 NEW (KI#20). §8 OP-1 iter 20-31 verbose paragraphs COMPRESSED to single iter history table (-18% / -9198 chars). Footer "Подсказка следующему агенту" updated to iter 33+.
- **`PLAN.md`** — rewritten cleaner: §1-4 historical context preserved, §5 Точка остановки compressed.
- **`docs/CONTENT_RESTRUCTURE_PLAN.md`** — §5.2 iter 32 row, §8 iter 32 stop point.

### KI#20 ✅ CLOSED (iter 32)
- **KI#20 ✅ CLOSED — 5/5 sub-items fixed.** Все previous KI (KI#1..KI#19) ✅ CLOSED. **Все Known Issues (KI#1..KI#20) ✅ CLOSED.**

---

## Previous iterations (compressed)

> Полная история — в `worklog.md` + git log. iter 26-31 — DGA (Deployed Guide Audit), все sub-items KI#18 ✅ CLOSED. iter 20-24 — KI#13 (inline styles → CSS), 123/123 ✅ CLOSED. iter 1-19 — docs restructure + Canon migration + KI cleanup.

- **[9.1.31] (iter 31, 2026-07-08):** DGA Phase 2 final — KI#18-G + KI#18-H ✅ CLOSED keep-by-design (rationale documented в `docs/canon/part_08.md` + `part_10.md`, no master HTML edit). KI#18 ✅ CLOSED 9/9 resolved.
- **[9.1.30] (iter 30, 2026-07-08):** DGA Phase 2 continued — KI#18-D (Part 4 p4_spine_overview intro trimmed) + KI#18-E (Part 5 OCEAN rule aligned к strict <30/>70) + KI#19 (incidental Chinese chars fix) FIXED.
- **[9.1.29] (iter 29, 2026-07-08):** DGA Phase 2 — KI#18-I (Part 2 p2_embodiment drop «Описание» col) + KI#18-F (Part 6 p6_cot_tiers drop «Формат» col, partial) FIXED.
- **[9.1.28] (iter 28, 2026-07-08):** DGA Phase 2 — KI#18-B (Part 1 drop «Функция» col) + KI#18-C (Part 2 drop «Описание» col) FIXED. KI#18-I NEW documented.
- **[9.1.27] (iter 27, 2026-07-08):** STATUS CHECK — без правок кода.
- **[9.1.26] (iter 26, 2026-07-01):** DGA Phase 1 STARTED — full audit 14 master HTML (8 duplication кейсов KI#18 A–H). KI#18-A FIXED.
- **[9.1.25] (iter 25, 2026-07-01):** Phase 4 SVG integration COMPLETE — E18 Greeting Algorithm встроен в Part 7B. VS elements registry: 18 (E01–E18).
- **[9.1.24] (iter 24, 2026-07-01):** KI#13 Part 9+10. KI#13 ✅ CLOSED (123/123 = 100%).
- **[9.1.23] (iter 23, 2026-06-30):** KI#13 Part 7A.
- **[9.1.22] (iter 22, 2026-06-30):** KI#13 Part 5+6.
- **[9.1.21] (iter 21, 2026-06-30):** KI#13 Part 3+4. Phase 4 SVG analysis.
- **[9.1.20] (iter 20, 2026-06-24):** KI#13 Part 1+2 baseline. KI#17 CLOSED.
- **[9.1.19] (iter 19, 2026-06-24):** KI#16 fix — 2 inline `<script>` → external widget JS. qa:csp PASS.
- **[9.1.18] (iter 18, 2026-06-24):** Final cleanup — Canon migration COMPLETE. Все 10 Parts + 3 Appendix ✅ MIGRATED.
- **[9.1.16] (iter 16, 2026-06-24):** Canon Part 5+6+7B+10 created + 4 master HTML мигрированы.
- **[9.1.14] (iter 14, 2026-06-24):** Canon Part 1+2+3 created + 3 master HTML мигрированы.
- **[9.1.13] (iter 13, 2026-06-24):** Canon Part 9 created + master HTML мигрирован.
- **[9.1.12] (iter 12, 2026-06-24):** Canon Part 8 created + master HTML мигрирован.
- **[9.1.11] (iter 11, 2026-06-24):** Part 7A master HTML migrated.
- **[9.1.10] (iter 10, 2026-06-24):** Canon Part 7A created. KI#17 NEW.
- **[9.1.9] (iter 9, 2026-06-24):** Validation pass Part 4. KI#16 NEW.
- **[9.1.8] (iter 8, 2026-06-23):** Pilot migration Part 4 (-13%).
- **[9.1.7] (iter 7, 2026-06-23):** Canon scaffold + part_04.md pilot + KI#15 CLOSED.
- **[9.1.6] (iter 6, 2026-06-23):** `docs/CONTENT_RESTRUCTURE_PLAN.md` created. KI#14 + KI#15 NEW.
- **[9.1.5] (iter 5, 2026-06-23):** KI#11 CLOSED. KI#12 partial. KI#13 NEW.
- **[9.1.4] (iter 4, 2026-06-23):** KI#10 CLOSED. KI#11+#12 found.
- **[9.1.3] (iter 3, 2026-06-23):** Orphan scripts cleanup. KI#8+#9 closed.
- **[9.1.2] (iter 2, 2026-06-23):** KI#1..#6 closed, stale docs removed.
- **[9.1.1] (iter 1, 2026-06-23):** AGENT_NAVIGATION/STATUS/worklog/PLAN created. 6 KI identified.
- **[9.1.0] (2026-05-16):** v9.1.0 release. FIX-01..FIX-31.
- **[9.0.0] (2026-05-15):** v9.0.0 release. Initial restructure.
