# Changelog

## [9.2.79] - 2026-07-26

### iter 79 — P1.5 — Voice Isolation уточнение (лингвистический vs физический)

- **Противоречие C9 разрешено:** правило Voice Isolation явно различает два уровня голоса.
  - **Лингвистический голос** (слова, синтаксис, лексика, ритм фразы, парадоксы, речевые маркеры) — только Examples и Greeting, никогда в Description.
  - **Физическая характеристика голоса** (тембр, хрип, механический гул, синтезированный резонанс, сиплость) — часть Embodiment, допустима в Description (сенсорный слой «Звук» Embodiment Protocol).
- **Локации правок:** §3.1 (Definition + RULE callout с тестом), §3.2 (RULE + EXAMPLE переписан), §1.4 принцип #2, Glossary (Voice + Voice Isolation entries). Sync: canon part_01/part_03/appendix_glossary.
- **Формализует практику iter 75:** fix Омнис-Зета Embodiment «Голос:» → «Звук:» в физическом смысле.
- **No open KI.** Decision items V8/V9 требуют обсуждения с автором.

---

## [9.2.78] - 2026-07-26

### iter 78 — P1.9 — Anchors placement уточнение

- **Противоречие C10 разрешено:** Anchors = отдельный структурный блок внутри Examples-зоны карточки, не часть диалоговых примеров. В большинстве фронтендов Anchors размещаются в Description как `<anchors>`-тег; концептуально Anchors = behavioural patterns, Examples = voice patterns.
- **Локации правок:** E01 Card Anatomy, §1.2 table, §1.4 RULE, §7A.1/§7A.9/§7A.11/§7A.13, Glossary (Behavioral Anchor entry). Sync: canon.
- **No open KI.**

---

## [9.2.77] - 2026-07-26

### iter 77 — P1.8 — OCEAN-in-Description уточнение

- Принцип #3 §1.4 переформулирован: «Психология — в Description компактно, в тегах, не нарративом». Добавлен callout ex с верным/неверным форматом OCEAN. RULE в §5.1 о `<ocean>`-тегах.
- Sync: canon part_01/part_05/part_08/part_09/appendix_glossary.

---

## [9.2.76] - 2026-07-26

### iter 76 — P1.7 — CoT Tier 0 уточнение

- «Tier 0 = нет отдельного CoT-блока, Embodiment Protocol действует всегда. CoT — дополнительный внутренний монолог сверх Embodiment».
- Локации: §6.3 + E11 visual + §1.8 Pre-build checklist + Glossary (CoT entry).

---

## [9.2.75] - 2026-07-26

### iter 75 — P1 Fixes: KI#54, KI#55, KI#51, KI#52

- **KI#54 ✅ CLOSED:** Мёртвые ссылки на `docs/canon/` → `<a href>` ссылки на существующие секции гайда.
- **KI#55 ✅ CLOSED:** N>70 дважды → заголовки разделены: «N > 70 / тревожный тип» и «N > 70 / агрессивный тип».
- **KI#51 ✅ CLOSED:** Voice в Description Омнис-Зета → Embodiment «Голос:» заменён на «Звук:» (физические звуки машины), голос перенесён в Examples.
- **KI#52 ✅ CLOSED:** Price «Какая из историй?» → «Дрожь в руках, взгляд теряет фокус» (физический Price). Sync: canon + character_bible.

---

## [9.2.74] - 2026-07-26

### iter 74 — Recon & Verification V1–V9

- 9 утверждений проверены на репозитории. Результаты: 4 CONFIRMED (KI#51, KI#52, KI#54, KI#55), 3 FALSE (V1, V4, V6), 2 Decision items (V8, V9).

---

## [9.2.73] - 2026-07-26

### iter 73 — Research: консолидация guide_analysis

- 7 анализов (1774 строк) → `docs/research/guide_analysis_consolidated.md` (12 разделов, C1–C15, D1–D20, V1–V9).
- План: `docs/research/research_plan.md` (Фазы 1–5).

---

## [9.2.70–72] - 2026-07-25/26

### iter 70–72 — Version bump + KI#46–49 + Scenario labels

- **iter 72:** KI#49 (section count 97→96 fix) + Scenario labels §9.9/§9.10.
- **iter 71:** KI#48 (stale v9.1 comments → v9.2) + Progressive disclosure 96/96.
- **iter 70:** KI#46 (`src/master/VERSION` orphan) + KI#47 (`src/shell/styles.css` header) + docs version bump.

---

## [9.2.69] - 2026-07-25

### iter 69 — KI#45: version bump 9.1.0 → 9.2.0

- Version drift устранён — bump в 10 source files.

---

## [9.2.61–68] - 2026-07-25

### iter 61–68 — Canon migration COMPLETE + VS CSS scoping + Cat B inversion

- **iter 68:** KI#44 (`audit_vs_embeds.py` path bug) + cleanup.
- **iter 67:** §4.10 R1 cleanup + Cat B prose inversion.
- **iter 66:** KI#42 (E09 CSS vars) + KI#43 (parts/ rebuild).
- **iter 65:** KI#41 (E10 CSS vars).
- **iter 63–64:** A59-1/A59-2 (Neuroticism→stress taxonomy, Trigger→Stress→FLAW chain).
- **iter 62:** R1 repetitions cleanup + §5.5 MBTI stub merge (97→96 sections).
- **iter 61:** KI#40 (canon→master sync) + 11 Cat B headings.

---

## [9.2.1–60] - 2026-07-XX

### iter 1–60 — Docs restructure + KI cleanup + VS elements + OCEAN labeling

- Docs restructure по образцу poe2-regex-ru.
- KI#1..KI#39: cleanup closed.
- Visual System: 18 VS elements + integration component-extracts.
- OCEAN labeling: extreme/cautious zone markers.
- Полная история — в git log.

---

## Versioning

- MAJOR — архитектурные изменения.
- MINOR — новые фичи/секции.
- PATCH — багфиксы.

Версии синхронизированы в `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest.
