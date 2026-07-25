# Changelog

## [9.2.75] - 2026-07-26

### iter 75 — P1 Fixes: KI#54, KI#55, KI#51, KI#52

- **KI#54 ✅ CLOSED:** Мёртвые ссылки на `docs/canon/` в reader-facing контенте (part_01.html стр. 398) → заменены на `<a href>` ссылки на существующие секции гайда (#p1_prebuild_checklist, #p10_elena, #p10_walter, #p10_omnis, #p10_vysherblenny).
- **KI#55 ✅ CLOSED:** N>70 дважды в таблице стресса (part_05.html стр. 184–185) → заголовки разделены на подтипы: «N > 70 / тревожный тип» и «N > 70 / агрессивный тип».
- **KI#51 ✅ CLOSED:** Voice в Description Омнис-Зета (part_10.html стр. 383) → Embodiment «Голос:» заменён на «Звук:» (физические звуки машины), голос перенесён в Examples по Voice Isolation rule. Annotation стр. 477 обновлена.
- **KI#52 ✅ CLOSED:** Price «Какая из историй?» (part_02.html стр. 220) → «Дрожь в руках, взгляд теряет фокус» (физический Price). Sync: canon + character_bible.
- **No open KI.** Decision items V8/V9 требуют обсуждения с автором.

---

## [9.2.74] - 2026-07-26

### iter 74 — Recon & Verification V1–V9

- 9 утверждений из консолидированного анализа проверены на живом репозитории. Результаты: 4 CONFIRMED (KI#51, KI#52, KI#54, KI#55), 3 FALSE (V1, V4, V6), 2 Decision items (V8, V9).
- Никаких правок контента гайда — чисто верификационная итерация.

---

## [9.2.73] - 2026-07-26

- **Задача:** пользователь прислал `guide_analysis.md` (1774 строк, 7 разнородных анализов) с задачей консолидировать информацию без потери, для последующей верификации и правок в будущих итерациях.
- **Дедупликация:** 7 анализов → 1 консолидированный документ `docs/research/guide_analysis_consolidated.md`. Дубликат секции (analysis #3) отсечён. Analysis #7 (анализ **другого** гайда) отсечён как нерелевантный.
- **Структура консолидированного документа:** 12 разделов — контекст, структура Parts, смыслы, противоречия (15 шт. C1–C15), дубли (20 шт. D1–D20), бесполезная информация (15 шт. U1–U15), чек-листы (14 шт.), приоритизированные предложения (P1/P2/P3), критические пробелы (G1–G3), методологический референс, итоговые оценки, что требует верификации (9 шт. V1–V9), резюме.
- **План следующих итераций:** `docs/research/research_plan.md` — Фаза 1 (Recon & Verification, 9 проверок), Фаза 2 (критичные исправления iter 75–82), Фаза 3 (улучшение структуры iter 83–90), Фаза 4 (опциональные iter 91+), Фаза 5 (спорные/отложенные).
- **STATUS.md:** добавлена секция §«Pending Verification» с 9 утверждениями V1–V9 для iter 74.
- **README.md:** статусная строка обновлена (iter 71 → iter 73), в секцию «Документация» добавлены ссылки на `docs/research/` файлы.
- **Никаких правок контента гайда** — чисто исследовательская, подготовительная итерация.
- **Validation:** все gates PASS (без изменений — iter 73 не трогал src/ или data/). Build hash `4074bac5` (unchanged).

---

## [9.2.72] - 2026-07-26

### iter 72 — Recon + KI#49 + Scenario labels §9.9/§9.10

- **Recon:** все validation gates PASS. Найден 1 новый баг — KI#49.
- **KI#49 ✅ CLOSED:** `AGENT_NAVIGATION.md:11` говорил "97 секций" — фактически 96 секций. Off-by-one после iter 62 MBTI stub merge. Fix: "97 секций" → "96 секций".
- **Scenario labels §9.9/§9.10:** iter 71 roadmap упоминал "P3: Annotation blocks §10.2-10.4 + Расширение scenario-меток" как pending. Recon показал что Annotation blocks уже сделаны в iter 57. iter 72 расширил паттерн до §9.9 (test_requirements) и §9.10 (12b_issues).

---

## [9.2.71] - 2026-07-26

### iter 71 — Recon + KI#48 + Progressive disclosure gap closure

- **KI#48 ✅ CLOSED:** 6 master HTML files имели stale `v9.1 Master HTML` в top-of-file comment. Fix: `v9.1` → `v9.2` в 6 файлах.
- **KI#48 — docs follow-up:** `docs/architecture.md:59` содержал stale "95 sections in v9.1" → "96 sections in v9.2".
- **Progressive disclosure gap closure:** `p6_cot_bridge` — единственная секция без `<!-- difficulty: ... -->` маркера. Добавлен `<!-- difficulty: BASIC -->`. Теперь 96/96 секций покрыты.

---

## [9.2.70] - 2026-07-25

### iter 70 — Docs version bump + Recon (KI#46, KI#47)

- **KI#46 ✅ CLOSED:** `src/master/VERSION` orphan file — обновлён до 9.2.0. Deletion deferred.
- **KI#47 ✅ CLOSED:** `src/shell/styles.css` header comment `v9.1.0` → `v9.2.0`.
- **Docs version bump (LOW):** 9.1.0 → 9.2.0 в 5 stale docs.

---

## [9.2.69] - 2026-07-25

### iter 69 — KI#45 fix (version bump 9.1.0 → 9.2.0)

- **KI#45 ✅ CLOSED:** Version drift устранён — bump 9.1.0 → 9.2.0 в 10 source files. Build hash changed `69d9b813` → `4074bac5`. 2 missed source-side refs fixed в iter 70 (KI#46, KI#47).

---

## [9.2.68] - 2026-07-25

### iter 68 — Recon + KI#44 fix + cleanup

- **KI#44 ✅ CLOSED:** `scripts/audit_vs_embeds.py` path bug (`parents[2]` вместо `parents[1]` + hardcoded fallback). Fix: `parents[1]` + удаление fallback.
- **Cleanup:** удалён stale `_DELETED_FILES.txt`.

---

## [9.2.67] - 2026-07-25

### iter 67 — P2-remaining R1 cleanup + Cat B prose inversion

- §4.10 (canon + master): убрано повторение OCEAN/Enneagram-валидация-SPINE.
- Cat B prose inversion: 6 mentions «Behavioral Anchors (поведенческие якоря)» → «поведенческие якоря (Behavioral Anchors)».
- Cleanup: удалены stale файлы.

---

## [9.2.66] - 2026-07-25

### iter 66 — KI#42 + KI#43 fixed

- **KI#42:** E09 VS-EMBED — 9 hardcoded dark-theme colors + 3 font-family → CSS variables.
- **KI#43:** `pnpm run build` → все `parts/*.html` + root fallbacks regenerated.

---

## [9.2.65] - 2026-07-25

### iter 65 — KI#41 fixed

- **KI#41:** E10 VS-EMBED hardcoded dark-theme colors → CSS variables.

---

## [9.2.64] - 2026-07-25

### iter 64 — A59-2 + drift v1.3

- **A59-2:** Trigger→Stress→FLAW chain formalized в §5.1.
- **Drift v1.3:** 170 paragraph drifts / 131 actionable.

---

## [9.2.63] - 2026-07-25

### iter 63 — A59-1 + A59-3

- **A59-1:** Neuroticism → stress type taxonomy (4 типа) в §5.1.
- **A59-3:** Personality sub-budget в `data/character_schema.json` + §7A.3.

---

## [9.2.62] - 2026-07-25

### iter 62 — R1 repetitions cleanup + §5.5 MBTI stub merge

- §2.2: T→A→P restatement removed. §5.1→§5.6: redundant preamble removed.
- §5.5 MBTI stub merged as `<h4>` subsection. manifest.json: 97→96 sections.

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

- **iter 58:** P2+P3 metadata enrichment — glossary consolidation, progressive disclosure, canonical markers.
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
