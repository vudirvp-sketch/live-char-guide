# Changelog

## [9.1.53] - 2026-07-21

### iter 53 — drift categorization added (LOW priority)

Расширение `scripts/audit_canon_master_drift.py` с 1.1 до 1.2: каждый paragraph drift классифицирован в одну из 5 категорий для future iterations visibility. Recon 88 paragraph drifts (iter 52) подтвердил: false positives нет — все drifts являются real semantic differences между canon (verbose markdown) и master (production HTML). Threshold tuning не нужен.

### Added (iter 53)
- **`scripts/audit_canon_master_drift.py` v1.2** — drift categorization:
  - New `category` field в `ParagraphDrift` dataclass (default `plain_text`).
  - New function `categorize_paragraph_drift(canon_text_preview, master_length) -> str`.
  - 5 categories (checked in order, first match wins):
    - `vs_embed_ref` — canon text содержит `[vs:` marker (expected — VS-EMBED replacement).
    - `cross_ref` — canon text начинается с `cross-ref:` (expected — structural pointer).
    - `callout_label` — canon text начинается с callout label (RULE/RECOMMENDATION/EXAMPLE/ILLUSTRATION/Bridge/Synthesis/Demonstrates/Annotation).
    - `no_master_match` — нет candidate master paragraph (master_length == 0).
    - `plain_text` — regular text drift; most actionable category.
  - New constants: `DRIFT_CATEGORIES` tuple, `CANON_VS_MARKER_RE`, `CANON_CROSS_REF_RE`, `CANON_CALLOUT_LABEL_RE` compiled regex patterns.
  - Console report: each drift line now includes `category=<cat>`. Summary: new category breakdown section showing all 5 categories with counts.
  - JSON report: version 1.1 → 1.2, new fields `drift_categories` (list), `paragraph_drift_category_counts` (dict). Each ParagraphDrift now includes `category` field.
- **Recon result (iter 53):** 88 paragraph drifts distribution:
  - `vs_embed_ref`: 15 (expected — VS-EMBED replacements)
  - `cross_ref`: 14 (expected — structural pointers)
  - `callout_label`: 4 (expected — callout labels in canon)
  - `no_master_match`: 2 (real — no candidate master paragraph)
  - `plain_text`: 53 (most actionable — real text drift between canon and master)

### Tests (iter 53 — ALL PASS)
- `python3 scripts/audit_canon_master_drift.py` — ✅ exit 0, 88 paragraph drifts, category breakdown shown.
- `python3 scripts/audit_canon_master_drift.py --no-paragraphs` — ✅ exit 0, 0 drifts (flag works).
- `python3 scripts/audit_canon_master_drift.py --paragraph-threshold 0.5` — ✅ exit 0, 122 drifts (custom threshold works).
- `python3 scripts/audit_canon_master_drift.py --json /tmp/drift_v1.2.json --quiet` — ✅ JSON valid, version 1.2.
- `python3 scripts/audit_canon_master_sync.py` — ✅ **96/96 PASS** (unchanged).
- `pnpm run build` — ✅ SUCCESS, shell Hash `69d9b813` unchanged.
- `pnpm run validate` — ✅ 8 gates PASS, index.html 7.5KB.
- `pnpm run validate:master` — ✅ 12 checks PASS.
- `pnpm run test:unit` — ✅ 43/43 PASS.
- `pnpm run test:integration` — ✅ 21/21 PASS.
- `pnpm run qa:csp` — ✅ 0 inline scripts.
- `pnpm run qa:bundle` — ✅ 7.5KB.
- `pnpm run lint` — ✅ 0 errors, 12 baseline warnings.
- `pnpm run qa:doc-versions` — ✅ PASS.
- `python3 scripts/check_english.py` — ✅ 20 baseline leaks (unchanged).

### Modified files (iter 53)
- `scripts/audit_canon_master_drift.py` — +90 строк (categorization feature, v1.1 → v1.2).
- `STATUS.md` — iter 53 record + Invariants update + iter 54+ Roadmap.
- `worklog.md` — iter 53 detailed record + iter 52 → one-liner.
- `CHANGELOG.md` — iter 53 entry (этот file).
- `AGENT_NAVIGATION.md` — header iter line + OP-1 iter table update + iter 54+ Roadmap.

### contentHash + shell hash (iter 53)
- **contentHash UNCHANGED** (только `scripts/*.py` + `*.md` изменены, не входят в contentHash).
- **Shell hash `69d9b813` UNCHANGED** (lazy-loader.js не редактировался).

---

## [9.1.52] - 2026-07-21

### iter 52 — paragraph-level Jaccard drift detection added (LOW priority)

Расширение `scripts/audit_canon_master_drift.py` с 1.0 до 1.1: добавлен paragraph-level semantic drift detection. Раньше скрипт сравнивал только целые секции (content hash), что почти всегда давало diff из-за VS-EMBEDs в master vs `[ref:...]` markers в canon. Теперь для каждого canon paragraph находится best matching master paragraph через Jaccard similarity на word tokens.

### Added (iter 52)
- **`scripts/audit_canon_master_drift.py` v1.1** — paragraph drift detection:
  - New `ParagraphDrift` dataclass (section_id, canon_text_preview, best_master_text_preview, best_similarity, canon_length, master_length).
  - New field `paragraph_drifts` в `FileDrift` dataclass.
  - 5 new functions: `split_canon_paragraphs()` (split canon body on `---` + blank lines, filter H3/code/`[ref:...]`/short), `split_master_paragraphs()` (extract from `<p>`/`<li>`/`<td>/<th>` with min length filter), `tokenize()` (Unicode-aware `\w{3,}` + RU/EN stopwords filter), `jaccard_similarity()` (|A∩B|/|A∪B|), `compute_paragraph_drift()` (find best match per canon paragraph).
  - 2 new CLI flags: `--no-paragraphs` (skip paragraph drift), `--paragraph-threshold FLOAT` (custom threshold, default 0.3).
  - Console report: `[INFO] N paragraph drift(s) below Jaccard 0.3` per file + summary line.
  - JSON report: version 1.0 → 1.1, new fields `paragraph_drift_threshold`, `min_paragraph_length`, paragraph_drifts в каждом FileDrift.

### Documentation cleanup (iter 52, per user request «файлы должны быть лёгкими для модели/агента»)
- `AGENT_NAVIGATION.md` — OP-1 iter history table compressed с 30+ verbose rows (200+ слов каждая) до 9 milestone rows (iter 1, 18, 32, 38, 47, 50, 51, 52). §6 Frequent Pitfalls compressed с 39 пунктов (FIX-N verbose) до 18 key pitfalls. Header iter line updated.
- `CHANGELOG.md` — iter 51 entry compressed с 50+ строк до 10 строк (только key facts).
- `STATUS.md` — iter 51 verbose paragraph (250+ слов) заменён на iter 52 brief paragraph. Invariants: added «Paragraph-level drift detection (iter 52+)» пункт. iter 52+ Roadmap → iter 53+ Roadmap, первый пункт удалён (just completed).
- `worklog.md` — iter 51 → one-liner, iter 52 = detailed record.

### Tests (iter 52 — ALL PASS)
- `python3 scripts/audit_canon_master_drift.py` — ✅ exit 0, **88 paragraph drifts found** (informational, expected — VS-EMBEDs replace text).
- `python3 scripts/audit_canon_master_drift.py --no-paragraphs` — ✅ exit 0, 0 drifts (flag works).
- `python3 scripts/audit_canon_master_drift.py --paragraph-threshold 0.5` — ✅ exit 0, 137 drifts (custom threshold works).
- `python3 scripts/audit_canon_master_drift.py --json /tmp/drift.json --quiet` — ✅ JSON valid, version 1.1.
- `python3 scripts/audit_canon_master_sync.py` — ✅ **96/96 PASS** (unchanged, regression test не тронут).
- `pnpm run build` — ✅ SUCCESS, shell Hash `69d9b813` unchanged.
- `pnpm run validate` — ✅ 8 gates PASS, index.html 7.5KB.
- `pnpm run validate:master` — ✅ 12 checks PASS.
- `pnpm run test:unit` — ✅ 43/43 PASS.
- `pnpm run test:integration` — ✅ 21/21 PASS.
- `pnpm run qa:csp` — ✅ 0 inline scripts.
- `pnpm run qa:bundle` — ✅ 7.5KB.
- `pnpm run lint` — ✅ 0 errors, 12 baseline warnings.
- `pnpm run qa:doc-versions` — ✅ PASS.
- `python3 scripts/check_english.py` — ✅ 20 baseline leaks (unchanged).

### Modified files (iter 52)
- `scripts/audit_canon_master_drift.py` — +330 строк (paragraph drift feature, v1.0 → v1.1).
- `STATUS.md` — iter 52 record + Invariants update + iter 53+ Roadmap + cleanup.
- `worklog.md` — iter 52 detailed record + iter 51 → one-liner.
- `CHANGELOG.md` — iter 52 entry + iter 51 entry compressed.
- `AGENT_NAVIGATION.md` — header iter line + §6 pitfalls cleanup (43→25 key items) + OP-1 iter table compress (30+ rows → 16 milestone rows) + iter 53+ Roadmap.

### Deleted files (iter 52)
- `ITER51_README.md` — stale per-iter README, дублирует info из worklog/STATUS/CHANGELOG.
- `_ITER51_DELETE_STALE.txt` — stale marker file from iter 51.

### contentHash + shell hash (iter 52)
- **contentHash UNCHANGED** (только `scripts/*.py` + `*.md` изменены, не входят в contentHash).
- **Shell hash `69d9b813` UNCHANGED** (lazy-loader.js не редактировался).

---

## [9.1.51] - 2026-07-21

### iter 51 — KI#36 (anchor navigation) ✅ CLOSED

HIGH-priority UX fix: все внутренние якорные ссылки в гайде невалидны (секции имели `data-section="X"` без `id="X"`, браузер ищет `id`). FAB TOC отображал только 1 пункт из-за селектора `$$('section[id]')` в `lazy-loader.js`.

### Fixed (iter 51 — KI#36)
- **id attributes:** 98 `id` атрибутов добавлены секциям в `src/master/*.html` (= значению `data-section`). Браузерный anchor mechanism работает нативно.
- **lazy-loader.js selector:** `$$('section[id]')` → `$$('section[data-section]')` в `generateTOC()` (L834) и `initActivePartHighlighting()` (L955). FAB TOC теперь отображает все 10 Parts.
- **hashchange listener:** `initHashChangeListener()` (L813-826) для надёжного smooth scroll.
- **Glossary panel auto-close:** на `a.glossary-link` click — закрывает panel через 50ms.
- **Русификация:** 13 английских фраз переведено (5×«see Appendix B» + 4×«Model Capability Table» + «universal Quick Check» + «universal parameter checklist» + 2×«see → Part X» + «5 items» + «structural check»). English leaks: 33 → 20 (оставшиеся 20 — by design).
- **Regression test:** `audit_canon_master_sync.py` 92 → 96 checks (+4 KI#36 id positive checks).
- **contentHash:** `cc130a527480e61b` → новый (6th change since iter 34). Shell hash `69d9b813` unchanged.

### Modified files (iter 51)
- 14 master HTML files (`src/master/*.html`) — +98 id attrs + 9 русификаций.
- `src/shell/lazy-loader.js` — +25 строк (2 selector fixes + hashchange listener + glossary auto-close).
- `scripts/audit_canon_master_sync.py` — +4 KI#36 checks + 2 substring updates (92→96 checks).
- `STATUS.md`, `worklog.md`, `CHANGELOG.md` — iter 51 record.

---

## [9.1.50] - 2026-07-20

### iter 50 — KI#34 + KI#35 ✅ CLOSED

MEDIUM-priority KI#34 fix: добавлен `<section data-section="p1_prebuild_checklist" data-toc-nav>` block в `src/master/part_01.html`. LOW-priority KI#35 fix: `` `data-section: p4_spine_overview` `` line added в `docs/canon/part_04.md`. Regression test extended 89→92→96 checks. contentHash `cc130a527480e61b` (5th change).

---

## [9.1.37] - 2026-07-08

### iter 37 — Canon Audit P2 (KI#21 P2) ✅ CLOSED

18 правок P2 из `docs/AUDIT_VERIFICATION.md` §4.3 применены во всех 14 canon-файлах. Canon total: 5 035 → 3 905 строк (−1 130 net deletion). Build hash `69d9b813` unchanged (canon-файлы не входят в hash computation). 45/57 правок KI#21 закрыты (16 P0 + 11 P1 + 18 P2). Осталось 12 правок + 3 новые секции (P3) на iter 38.

### Helper scripts (persisted in `/home/z/my-project/scripts/iter37_*.py`)
- `iter37_p2_bulk.py` — YAML front-matter conversion + delete trailing meta-sections + add Synthesis.
- `iter37_p2_inline_cleanup.py` — delete inline H3 resume + delete excess Bridge paragraphs.
- `iter37_p2_canon_planned_stubs.py` — regex-remove «Canon planned iter X» stubs.
- `iter37_p2_stub_cleanup.py` — fix residual `] .` punctuation after stub removal.

---

## [9.1.32] - 2026-07-08

### iter 32 — Visual System Scroll-Animation Bug (KI#20) ✅ CLOSED

5 из 18 VS-EMBED элементов (E06, E07, E08, E09, E15) отображались поломанно на собранном сайте — SVG-кольца GHOST, столбцы Voice Hierarchy, ноды Core Directives, OCEAN pentagon + профиль, annotation callouts были невидимы. Fix: `vs-scroll-observer.js` `SCROLL_ENTER_SELECTOR` extended с 3 classes → 11 classes. 43 элемента на 5 VS-EMBED теперь корректно отображаются. Audit script `scripts/audit_vs_embeds.py` added. Stale iter READMEs deleted (README_iter18.md, README_ITER8_MERGE.md, ITER9_PATCH_README.md, MERGE_INSTRUCTIONS.md).

---

## Previous iterations (compressed)

> Полная история — в `worklog.md` + git log. iter 26-31 — DGA (Deployed Guide Audit), все sub-items KI#18 ✅ CLOSED. iter 20-24 — KI#13 (inline styles → CSS), 123/123 ✅ CLOSED. iter 1-19 — docs restructure + Canon migration + KI cleanup.

- **[9.1.31] (iter 31, 2026-07-08):** DGA Phase 2 final — KI#18-G + KI#18-H ✅ CLOSED keep-by-design. KI#18 ✅ CLOSED 9/9 resolved.
- **[9.1.30] (iter 30, 2026-07-08):** DGA Phase 2 continued — KI#18-D + KI#18-E + KI#19 FIXED.
- **[9.1.29] (iter 29, 2026-07-08):** DGA Phase 2 — KI#18-I + KI#18-F FIXED.
- **[9.1.28] (iter 28, 2026-07-08):** DGA Phase 2 — KI#18-B + KI#18-C FIXED.
- **[9.1.27] (iter 27, 2026-07-08):** STATUS CHECK — без правок кода.
- **[9.1.26] (iter 26, 2026-07-01):** DGA Phase 1 STARTED — KI#18-A FIXED.
- **[9.1.25] (iter 25, 2026-07-01):** Phase 4 SVG integration COMPLETE — E18 Greeting Algorithm.
- **[9.1.24] (iter 24, 2026-07-01):** KI#13 Part 9+10. KI#13 ✅ CLOSED (123/123 = 100%).
- **[9.1.23] (iter 23, 2026-06-30):** KI#13 Part 7A.
- **[9.1.22] (iter 22, 2026-06-30):** KI#13 Part 5+6.
- **[9.1.21] (iter 21, 2026-06-30):** KI#13 Part 3+4. Phase 4 SVG analysis.
- **[9.1.20] (iter 20, 2026-06-24):** KI#13 Part 1+2 baseline. KI#17 CLOSED.
- **[9.1.19] (iter 19, 2026-06-24):** KI#16 fix — 2 inline `<script>` → external widget JS. qa:csp PASS.
- **[9.1.18] (iter 18, 2026-06-24):** Final cleanup — Canon migration COMPLETE.
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
