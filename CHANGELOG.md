# Changelog

## [9.2.69] - 2026-07-25

### iter 69 — KI#45 fix (version bump 9.1.0 → 9.2.0)

- **KI#45 ✅ CLOSED:** Version drift устранён — bump 9.1.0 → 9.2.0 в 10 source files: `package.json`, `src/VERSION`, `data/character_schema.json`, `data/test_scenarios.json`, `src/shell/index.html` (meta + comment), `src/shell/lazy-loader.js` (CONFIG.VERSION), `src/shell/widgets/js-flag.js`, `src/shell/widgets/mermaid-init.js`, `scripts/build-unified.mjs`, `src/scripts/build-shell-unified.mjs`.
- **Build manifest verification:** `pnpm run build` → SUCCESS. `version-sync.mjs` → ✅ all 9.2.0 in sync. Build hash changed `69d9b813` → `4074bac5` (expected — shell version string changed). Root fallbacks regenerated (index.html, assets/, widgets/, parts/, data/, build.hash).
- **Remaining stale docs (deferred):** 5 docs still say 9.1.0 (`docs/content_map.md`, `docs/character_bible.md`, `docs/architecture.md`, `docs/components.md`, `docs/canon/iter60_analysis_plan.md`). Non-functional reference docs, deferred to iter 70+.
- **Validation:** version-sync ✅, 96/96 sync ✅, 24 English leaks (baseline) ✅, terms ✅, duplicates ✅, audit_vs_embeds ✅, build hash `4074bac5`.

---

## [9.2.68] - 2026-07-25

### iter 68 — Recon + KI#44 fix + cleanup

- **Recon:** запущены все validation gates (96/96 sync ✅, 24 English leaks ✅, terms ✅, duplicates ✅, audit_vs_embeds ✅, build hash `69d9b813` unchanged). Audit-скрипты проверены.
- **KI#44 ✅ CLOSED:** `scripts/audit_vs_embeds.py` — path bug (`parents[2]` вместо `parents[1]` + hardcoded fallback `/home/z/my-project/work/live-char-guide`). Скрипт падал без symlink workaround. Fix: `parents[1]` + удаление fallback. Cleanup того же pattern в `audit_component_extracts.py` и `audit_component_extracts_css.py` (primary path `parents[1]` уже работал, fallback удалён для consistency).
- **KI#45 OPEN (LOW, deferred to iter 69):** Version drift — docs = 9.2.0, code (package.json/src/VERSION/character_schema.json) = 9.1.0. Bump кодовой версии отложен — требует координированного обновления 4 файлов + build manifest verification.
- **Cleanup:** удалён stale `_DELETED_FILES.txt` (iter 67 leftover — все перечисленные файлы уже удалены).
- **Validation:** 96/96 sync ✅, 24 English leaks (baseline) ✅, terms ✅, duplicates ✅, audit_vs_embeds ✅ (no symlink), build hash `69d9b813` unchanged.

---

## [9.2.67] - 2026-07-25

### iter 67 — P2-remaining (R1 cleanup) + Cat B prose inversion + cleanup

- **P2-remaining R1 cleanup:** §4.10 (canon + master) — убрано повторение «OCEAN и Enneagram валидируют SPINE, не генерируют его» (canonical home — §4.1, §5.1).
- **Cat B prose inversion:** 6 mentions «Behavioral Anchors (поведенческие якоря)» → «поведенческие якоря (Behavioral Anchors)» в `src/master/part_02/03/04/07a/07b/09.html`.
- **A59-4 + A59-6:** SKIP — не описаны в репозитории.
- **Cleanup:** удалены `ITER51_README.md`, `_ITER51_DELETE_STALE.txt`, `AUDIT_VERIFICATION.md` (root), `docs/AUDIT_VERIFICATION.md`, `docs/AUDIT_REVIEW_ITER54.md`, `docs/cross_reference_sync.md.DELETED`.
- **Validation:** 96/96 sync ✅, 24 English leaks (baseline) ✅, terms ✅, duplicates ✅, build hash `69d9b813` unchanged.

---

## [9.2.66] - 2026-07-25

### iter 66 — KI#42 + KI#43 fixed

- **KI#42:** E09 VS-EMBED в `src/master/part_05.html` + `parts/part_05.html` — 9 hardcoded dark-theme colors + 3 font-family → CSS variables (90 replacements). Scoped fix — static fallback region не затронут.
- **KI#43:** `pnpm run build` → все `parts/*.html` + root fallbacks regenerated. 17 files changed.

---

## [9.2.65] - 2026-07-25

### iter 65 — KI#41 fixed

- **KI#41:** E10 VS-EMBED hardcoded dark-theme colors → CSS variables (scoped fix в src/master + parts, 90 replacements). E09 region не затронут (deferred as KI#42).

---

## [9.2.64] - 2026-07-25

### iter 64 — A59-2 + drift v1.3

- **A59-2:** Trigger→Stress→FLAW chain formalized в §5.1 (canonical example: Елена anxious-reactive).
- **Drift v1.3:** 170 paragraph drifts / 131 actionable (recon confirmed no false positives).

---

## [9.2.63] - 2026-07-25

### iter 63 — A59-1 + A59-3

- **A59-1:** Neuroticism → stress type taxonomy (4 типа: anxious-reactive, explosive-hostile, avoidant-withdrawn, stable-resilient) в §5.1.
- **A59-3:** Personality sub-budget в `data/character_schema.json` + §7A.3.

---

## [9.2.62] - 2026-07-25

### iter 62 — R1 repetitions cleanup + §5.5 MBTI stub merge

- §2.2: T→A→P restatement removed (already defined in §2.1).
- §5.1→§5.6: redundant preamble и closing RULE из §5.6 removed (verbatim repeat of §5.1 RULE).
- §5.5 MBTI stub merged as `<h4>` subsection в §5.6 (now §5.5). Sections renumbered.
- manifest.json: 97→96 sections.

---

## [9.2.61] - 2026-07-25

### iter 61 — KI#40 closed + heading unification

- KI#40 (canon→master sync) ✅ CLOSED.
- 11 Cat B headings unified to «Русский (English Canonical)» format.

---

## [9.2.60] - 2026-07-25

### iter 60 — language policy revision + canon dedup

- terminology_dictionary.md: Cat A/B split, RU primary in headings.
- Canon dedup: §0.2 (3 правила), §1.5+§1.6 (stub merge), §4.9 (Elena chain removed), §4.10 (compressed).
- glossary.json updated.

---

## Previous iterations (compressed)

> Полная история — в `worklog.md` + git log.

- **iter 58:** P2+P3 metadata enrichment — glossary consolidation (7 CD→1), progressive disclosure (102 difficulty labels), canonical markers (60 sections).
- **iter 57:** Annotation blocks §10.2-10.4 + scenario labels §9.5/9.6/9.7/9.11.
- **iter 55-56:** KI#37/38/39 CLOSED + Decision tree + recap-spoilers.
- **iter 54:** audit review (research) — 3 LOW bugs found.
- **iter 53:** drift categorization v1.2 (5 categories, 88 drifts).
- **iter 52:** paragraph-level Jaccard drift detection v1.1.
- **iter 50-51:** KI#34/35/36 CLOSED (anchor nav fix, +98 id attrs).
- **iter 44-47:** KI#33 CLOSED — canon→master sync (57/57).
- **iter 35-43:** Canon audit P0-P3 + OCEAN/MBTI labeling.
- **iter 25-34:** VS elements E01-E18 + DGA + CSS scoping.
- **iter 1-24:** Docs restructure + KI cleanup + canon scaffold + migration + inline styles → CSS.

---

## Versioning

- MAJOR — архитектурные изменения.
- MINOR — новые фичи/секции.
- PATCH — багфиксы.

Версии синхронизированы в `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest.
