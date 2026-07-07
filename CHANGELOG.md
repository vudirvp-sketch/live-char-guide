# Changelog

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
