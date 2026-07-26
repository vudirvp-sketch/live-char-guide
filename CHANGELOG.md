# Changelog

## [9.2.3] - 2026-07-26

### iter 84 — A6 — Vyshcherblenny GHOST: concrete event, cycle → `<ghost_layers>`

- **A6 — Vyshcherblenny GHOST in `<spine>`:** Сокращён с 5 предложений + cycle pattern до 3 предложений concrete event. Удалены: narrative detail ("не получил диссонанс, а"), explanatory clause ("Это дало время, но забрало..."), cycle pattern ("Цикл: вырезание → краткое продление → потеря себя → страх → новое вырезание"). Cycle уже captured в `<ghost_layers>` Tier 2/3. Результат aligned с Bible и part_07a.
- **Локации правок:** src/master/part_10.html (Vyshcherblenny GHOST line 541), docs/canon/part_10.md (sync line 415), parts/part_10.html (build output mirror line 526).
- **Closed:** V1 (GHOST in `<spine>` over-length — P4-R2/P4-R3 compliance).

---

### iter 83 — A5 — Omnis-Zeta Anchor Prices bodily/mechanical

- **A5 — Omnis-Zeta Anchors:** 5 из 7 non-physical Anchor Prices заменены на bodily/mechanical equivalents (3 Базовых + 2 FLAW-linked). GHOST-linked Anchors (2) оставлены для iter 85.
  - Anchor 1 (Базовый): «теряет situational awareness» → «сервоприводы блокируются в позиции сканирования — 3–5 секунд полной сенсорной изоляции»
  - Anchor 2 (Базовый): «нарушает субординацию» → «манипуляторы выдвигаются без командного сигнала, термальные клапаны выбрасывают пар — корпус дрожит»
  - Anchor 3 (Базовый): «отчуждает собеседника» → «аудиовывод транслирует ноосферный белый шум — собеседник слышит механический гул, оптика погашена 4–6 секунд»
  - Anchor 4 (FLAW-linked): «не способен на эмпатию — эскалирует» → «манипуляторы рефлекторно выдвигаются для «диагностики», бинарный кант stuttering — собеседник отшатывается»
  - Anchor 5 (FLAW-linked): «упускает модернизацию, копит технический долг» → «левая рука-аугментация дрожит, теплообменник переходит в режим перегрузки, оптика мерцает»
- **Annotation updated:** «Базовые + FLAW-linked Anchors показывают bodily/mechanical Price».
- **Локации правок:** src/master/part_10.html (Omnis-Zeta [ANCHORS] + annotation), docs/canon/part_10.md (sync).
- **Closed:** O1 частично (5/7).
- **KI#57 OPEN:** 2 GHOST-linked Anchor Prices still non-physical («раскрывает уязвимость», «рассеивание внимания») — deferred iter 85.

---

### iter 82 — A2–A4 — Walter SP + Description + LIE

- **A2 — Walter SP:** Tone Frame расширен с ~10 tok до ~25 tok (`Tone: tense, calculating. Pride is a quiet weapon. Words measured, pauses heavy. Defensiveness surfaces as cold precision.`). Добавлены OOC PROTECTION (react in-character as irritation or ignore) и Format Lock (Dialogue: *action* "speech"). SP structure order теперь соответствует P7A-R2.
- **A3 — Walter Description:** Prose-параграфы перенесены в `<identity>` XML wrapper перед `<spine>`.
- **A4 — Walter LIE:** Убран explanatory clause (`— но правда в том, что ему нужно чувствовать контроль`). LIE теперь clean quote.
- **Локации правок:** src/master/part_10.html (Walter SP + Description + annotation + token budget), docs/canon/part_10.md (sync). Annotation list Walter: SYSTEM bullet расширен (Tone Frame + OOC + Format Lock), DESCRIPTION bullet (`<identity>` + `<spine>`).
- **Closed:** W1 (Missing `<identity>`), W2 (LIE = quote + clause), W3 (Format Lock), W4 (OOC), W5 (Tone Frame недомер), BW4 (Bible vs Card LIE alignment).
- **KI#56 ✅ CLOSED:** Version sync drift (STATUS.md=9.2.2 vs src/VERSION+package.json+data/character_schema.json=9.2.1) — все bumped to 9.2.3, AGENT_NAVIGATION.md тоже.
- **Still open for Walter:** W6, W7, W8, W9 (prose psychology частично смягчён).

---

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
