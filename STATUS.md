# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.1
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 79 — P1.5 — Voice Isolation уточнение (лингвистический паттерн vs физическая характеристика).** Выполнено:

Противоречие C9 разрешено: правило Voice Isolation явно различает два уровня голоса. **Лингвистический голос** (слова, синтаксис, лексика, ритм фразы, парадоксы, речевые маркеры) — только в Examples и Greeting, никогда в Description. **Физическая характеристика голоса** (тембр, хрип, механический гул, синтезированный резонанс, сиплость) — это часть Embodiment, допустима в Description (сенсорный слой «Звук» Embodiment Protocol). Это формализует практику из iter 75 (fix Омнис-Зета «Голос:» → «Звук:» в Embodiment-блоке).

| Локация | Изменение |
|---------|-----------|
| `src/master/part_03.html` (§3.1 Voice Isolation) | Definition переформулировано: «Лингвистический голос задаётся ТОЛЬКО в Examples». Добавлен RULE callout с явным разделением двух уровней + тест (лингвистический vs физический примеры). |
| `src/master/part_03.html` (§3.2 Influence Hierarchy) | RULE уточнён: «0% влияния на лингвистический голос». EXAMPLE переписан: WRONG = лингвистический в Description; CORRECT = лингвистический в Examples + физическая характеристика (хрипловатый тембр) в Description как Embodiment. |
| `src/master/part_01.html` (§1.4 принцип #2) | «Description = логика поведения, Examples = паттерны голоса» → явное разделение: лингвистический = только Examples; физическая характеристика (тембр, хрип, механический гул) = Description как часть Embodiment. |
| `src/master/appendix_glossary.html` | Voice entry + Voice Isolation entry: добавлено разделение на два уровня. |
| `docs/canon/part_03.md` | Sync с master: §3.1 RULE + §3.2 RULE/EXAMPLE. |
| `docs/canon/part_01.md` | Sync с master: §1.4 принцип #2. |
| `docs/canon/appendix_glossary.md` | Sync: Voice + Voice Isolation entries. |
| `docs/research/guide_analysis_consolidated.md` | C9 → FIXED iter 79. P1.5 → iter 79 ✅ COMPLETED. |
| `docs/research/research_plan.md` | iter 79 marked ✅ COMPLETED. |

**No open KI.** Decision items V8/V9 требуют обсуждения с автором.

---

## Decision items (требуют обсуждения с автором)

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline. По spirit правила корректно, но граница тонкая.
- **V9:** OCEAN×Enneagram Matrix — нужен disclaimer (авторская модель, не научная).

---

## Invariants

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID.
- **No-repeat principle:** Гайд — единый последовательный документ. `[ref:]` только для навигации.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` — 96/96 секций покрыты.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/`.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **Anchors placement:** Anchors = отдельный структурный блок внутри Examples-зоны. В большинстве фронтендов — `<anchors>`-тег в Description; концептуально Anchors = behavioural patterns, Examples = voice patterns.
- **Voice Isolation (лингвистический vs физический):** Лингвистический голос (слова, синтаксис) — только Examples/Greeting. Физическая характеристика голоса (тембр, хрип, механический гул) — часть Embodiment, допустима в Description (сенсорный слой «Звук»).

---

## iter 80+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 80** | P1.2 — OCEAN×Enneagram Matrix disclaimer (Decision item V9) | MEDIUM |
| **iter 81+** | Decision item V8 (GHOST перцептивный фильтр) — после обсуждения | MEDIUM |
| **iter 83–90** | P2 — улучшение структуры | HIGH |
| **iter 91+** | P3 — опциональные улучшения | LOW–MEDIUM |

**Рекомендация для следующего чата:** начать с iter 80 — P1.2 (OCEAN×Enneagram Matrix disclaimer, Decision item V9). Decision item V8 — после обсуждения с автором.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build (CI на push) |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |
