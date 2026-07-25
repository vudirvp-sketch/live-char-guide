# Changelog

## [9.2.70] - 2026-07-25

### iter 70 — Docs version bump + Recon (KI#46, KI#47)

- **Recon:** найдены 2 пропущенных в iter 69 source-side 9.1.0 references.
- **KI#46 ✅ CLOSED:** `src/master/VERSION` orphan file — был 9.1.0 (out of sync с `src/VERSION=9.2.0`). Файл не используется build-скриптами (orphan), но создавал drift. Fix: обновлён до 9.2.0. Deletion deferred (separate iter decision).
- **KI#47 ✅ CLOSED:** `src/shell/styles.css` header comment `v9.1.0` → `v9.2.0`. Был пропущен в iter 69 (тогда обновили `src/shell/index.html` meta + comment, но не CSS header). Root fallback `assets/shell-styles.css` regenerated via `pnpm run build`.
- **Docs version bump (LOW):** 9.1.0 → 9.2.0 в 5 stale docs:
  - `docs/content_map.md` (Version: 9.1.0 + title v9.1)
  - `docs/character_bible.md` (Version: 9.1.0 + title v9.1)
  - `docs/architecture.md` (Version: 9.1.0 + Status + footer)
  - `docs/components.md` (Version: 9.1.0 + title v9.1 + footer; stale changelog entry removed)
  - `docs/canon/iter60_analysis_plan.md` (репо v9.1.0)
- **Validation:** version-sync ✅, 96/96 sync ✅, 24 English leaks (baseline) ✅, terms ✅, duplicates ✅, audit_vs_embeds ✅, build hash `4074bac5` (unchanged — hash computed from `index.html`, CSS comment edit doesn't affect hash).

---

## [9.2.69] - 2026-07-25

### iter 69 — KI#45 fix (version bump 9.1.0 → 9.2.0)

- **KI#45 ✅ CLOSED:** Version drift устранён — bump 9.1.0 → 9.2.0 в 10 source files: `package.json`, `src/VERSION`, `data/character_schema.json`, `data/test_scenarios.json`, `src/shell/index.html` (meta + comment), `src/shell/lazy-loader.js` (CONFIG.VERSION), `src/shell/widgets/js-flag.js`, `src/shell/widgets/mermaid-init.js`, `scripts/build-unified.mjs`, `src/scripts/build-shell-unified.mjs`.
- **Build manifest verification:** `pnpm run build` → SUCCESS. Build hash changed `69d9b813` → `4074bac5`.
- **2 missed source-side references:** `src/master/VERSION` (orphan) + `src/shell/styles.css` header — fixed in iter 70 (KI#46, KI#47).

---

## [9.2.68] - 2026-07-25

### iter 68 — Recon + KI#44 fix + cleanup

- **KI#44 ✅ CLOSED:** `scripts/audit_vs_embeds.py` path bug (`parents[2]` вместо `parents[1]` + hardcoded fallback `/home/z/my-project/work/live-char-guide`). Fix: `parents[1]` + удаление fallback.
- **Cleanup:** удалён stale `_DELETED_FILES.txt` (iter 67 leftover).

---

## [9.2.67] - 2026-07-25

### iter 67 — P2-remaining R1 cleanup + Cat B prose inversion

- §4.10 (canon + master): убрано повторение OCEAN/Enneagram-валидация-SPINE.
- Cat B prose inversion: 6 mentions «Behavioral Anchors (поведенческие якоря)» → «поведенческие якоря (Behavioral Anchors)» в `src/master/part_02/03/04/07a/07b/09.html`.
- Cleanup: удалены `ITER51_README.md`, `_ITER51_DELETE_STALE.txt`, `AUDIT_VERIFICATION.md` (root + docs/), `docs/AUDIT_REVIEW_ITER54.md`, `docs/cross_reference_sync.md.DELETED`.

---

## [9.2.66] - 2026-07-25

### iter 66 — KI#42 + KI#43 fixed

- **KI#42:** E09 VS-EMBED в `src/master/part_05.html` + `parts/part_05.html` — 9 hardcoded dark-theme colors + 3 font-family → CSS variables (90 replacements).
- **KI#43:** `pnpm run build` → все `parts/*.html` + root fallbacks regenerated.

---

## [9.2.65] - 2026-07-25

### iter 65 — KI#41 fixed

- **KI#41:** E10 VS-EMBED hardcoded dark-theme colors → CSS variables (scoped fix в src/master + parts, 90 replacements).

---

## [9.2.64] - 2026-07-25

### iter 64 — A59-2 + drift v1.3

- **A59-2:** Trigger→Stress→FLAW chain formalized в §5.1 (canonical example: Елена anxious-reactive).
- **Drift v1.3:** 170 paragraph drifts / 131 actionable (recon confirmed no false positives).

---

## [9.2.63] - 2026-07-25

### iter 63 — A59-1 + A59-3

- **A59-1:** Neuroticism → stress type taxonomy (4 типа) в §5.1.
- **A59-3:** Personality sub-budget в `data/character_schema.json` + §7A.3.

---

## [9.2.62] - 2026-07-25

### iter 62 — R1 repetitions cleanup + §5.5 MBTI stub merge

- §2.2: T→A→P restatement removed. §5.1→§5.6: redundant preamble removed.
- §5.5 MBTI stub merged as `<h4>` subsection в §5.6. manifest.json: 97→96 sections.

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

---

## Previous iterations (compressed)

> Полная история — в git log.

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

Версии синхронизированы в `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest. Docs versions synced в iter 70.
