# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 78 — P1.9 — Anchors placement уточнение.** Выполнено:

Противоречие C10 разрешено: Anchors = отдельный структурный блок внутри Examples-зоны карточки, не часть диалоговых примеров. В большинстве фронтендов Anchors размещаются в Description как `<anchors>`-тег (отдельное поле Anchors отсутствует); концептуально Anchors = behavioural patterns, Examples = voice patterns.

| Локация | Изменение |
|---------|-----------|
| `src/master/part_01.html` (E01 Card Anatomy) | Блок label: «Examples + Anchors» → «Examples». Anchors sub-panel: добавлен badge «отдельный блок», описание: Anchors — отдельный структурный блок, не часть диалоговых примеров, в большинстве фронтендов `<anchors>` в Description. desc-callout: «струкно вложены в Examples» → «структурно живут как отдельный блок в Examples-зоне». |
| `src/master/part_01.html` (§1.2 table) | Добавлена строка Anchors (в Examples-зоне) с описанием «Ключевое — поведенческие триггеры, отдельный `<anchors>`-тег». |
| `src/master/part_01.html` (§1.4) | Добавлен RULE callout: Anchors — отдельный структурный блок внутри Examples-зоны, Anchors = behavioural patterns, Examples = voice patterns. |
| `docs/canon/part_01.md` | Sync с master: §1.2 table + Anchors строка, §1.4 RULE, текст о Card Anatomy (Anchors визуально вложены, структурно отдельный блок). |
| `src/master/part_07a.html` (§7A.1) | Добавлен RULE callout: Anchors placement — отдельный блок в Examples-зоне, не часть SP и не часть Examples dialogs. |
| `src/master/part_07a.html` (§7A.9) | XML Tags описание: добавлено пояснение `<anchors>` в Description для совместимости с фронтендами, концептуально Anchors — отдельный блок в Examples-зоне. |
| `src/master/part_07a.html` (§7A.11 4K-fallback) | Добавлен RULE: Anchors в 4K-fallback в Description (фронтенд без отдельного поля), концептуально отдельный блок в Examples-зоне. |
| `src/master/part_07a.html` (§7A.13 Elena budget) | «Description (SPINE + OCEAN + Anchors)» → «Description (SPINE + OCEAN + Anchors)*» + footnote: Anchors концептуально в Examples-зоне, структурно в Description. |
| `docs/canon/part_07a.md` | Sync с master: §7A.1 RULE, §7A.9 XML описание, §7A.11 4K-fallback RULE, §7A.13 Elena footnote. |
| `src/master/appendix_glossary.html` | Behavioral Anchor entry: добавлен RULE о Anchors placement. |
| `docs/canon/appendix_glossary.md` | Behavioral Anchor entry: sync — RULE о Anchors placement. |
| `visual-system/elements/E01-card-anatomy.html` | Same E01 changes as master: label, sub-panel, desc-callout. |
| `visual-system/integration/component-extracts/E01-visual.html` | Same E01 changes. |
| `docs/research/guide_analysis_consolidated.md` | C10 → FIXED iter 78. P1.9 → iter 78 ✅ COMPLETED. P1.6/P1.8 → ✅ COMPLETED. |

**No open KI.** Decision items V8/V9 требуют обсуждения с автором.

---

## Decision items (требуют обсуждения с автором)

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline. По spirit правила корректно, но граница тонкая.
- **V9:** OCEAN×Enneagram Matrix — нужен disclaimer (авторская модель, не научная).

---

## Invariants (iter 61+)

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID.
- **No-repeat principle:** Гайд — единый последовательный документ. `[ref:]` только для навигации.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` — 96/96 секций покрыты.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/`.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **Anchors placement:** Anchors = отдельный структурный блок внутри Examples-зоны. В большинстве фронтендов — `<anchors>`-тег в Description; концептуально Anchors = behavioural patterns, Examples = voice patterns.

---

## iter 79+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 79** | P1.5 — Уточнение Voice Isolation (лингвистический паттерн vs физическая характеристика) | LOW |
| **iter 80** | P1.2 — OCEAN×Enneagram Matrix disclaimer (Decision item V9) | MEDIUM |
| **iter 81+** | Decision item V8 (GHOST перцептивный фильтр) — после обсуждения | MEDIUM |
| **iter 83–90** | P2 — улучшение структуры | HIGH |
| **iter 91+** | P3 — опциональные улучшения | LOW–MEDIUM |

**Рекомендация для следующего чата:** начать с iter 79 — P1.5 (Voice Isolation). Потом P1.2 (iter 80). Decision items V8/V9 — после обсуждения с автором.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build (CI на push) |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |
