# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 76 — P1.7 — CoT Tier 0 уточнение.** Выполнено:

Tier 0 переписан как «без отдельного CoT-блока, Embodiment Protocol действует всегда». CoT (Tier 1+) — дополнительный внутренний монолог сверх Embodiment, не замена.

| Локация | Изменение |
|---------|-----------|
| `src/master/part_06.html` | E11 staircase label: «Без CoT» → «Только Embodiment». Panel: добавлено «Tier 0 ≠ "модель не думает" — Embodiment Protocol всегда действует». §6.3 canonical paragraph переформулирован. Table Tier 0 row: «12B+, базовый/стандартный» → «12B+, только Embodiment», example дополнен «(без `[INTERNAL]`-блока)». |
| `docs/canon/part_06.md` | §6.3 canonical text + Tier 0 table row — sync с master. |
| `visual-system/elements/E11-cot-tiers.html` | Staircase label + panel text — sync с master. |
| `visual-system/integration/component-extracts/E11-visual.html` | Staircase label + panel text — sync с master. |
| `src/master/part_01.html` | Pre-build checklist стр. 5: «Нет (Tier 0)» → «Нет (Tier 0 — Embodiment only)», объяснение переформулировано: Embodiment Protocol достаточен как микро-цепочка рассуждений. |
| `docs/canon/part_01.md` | Pre-build checklist стр. 5 — sync с master. |
| `src/master/appendix_glossary.html` | CoT glossary entry: «Tier 0 (basic Anchor)» → «Tier 0 (без отдельного `[INTERNAL]`-блока — Embodiment Protocol действует всегда как микро-цепочка рассуждений, baseline)» + явное «CoT = дополнительный внутренний монолог сверх Embodiment». |
| `scripts/audit_canon_master_sync.py` | P1-6 check substring updated: «12B+, базовый/стандартный» → «12B+, только Embodiment» (iter 76 P1.7 label update). |

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

---

## iter 77+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 77** | P1.8 — Уточнение OCEAN-in-Description (переформулировать принцип #3) | LOW |
| **iter 78** | P1.9 — Уточнение Anchors placement (Anchors = отдельный блок внутри Examples-зоны) | LOW |
| **iter 79** | P1.5 — Уточнение Voice Isolation (лингвистический паттерн vs физическая характеристика) | LOW |
| **iter 80** | P1.2 — OCEAN×Enneagram Matrix disclaimer (Decision item V9) | MEDIUM |
| **iter 81+** | Decision item V8 (GHOST перцептивный фильтр) — после обсуждения | MEDIUM |
| **iter 83–90** | P2 — улучшение структуры | HIGH |
| **iter 91+** | P3 — опциональные улучшения | LOW–MEDIUM |

**Рекомендация для следующего чата:** начать с iter 77 — P1.8 (OCEAN-in-Description). Потом P1.9, P1.5. Decision items V8/V9 — после обсуждения с автором.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build (CI на push) |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
