# Appendix B: Model Capability Table (Таблица возможностей моделей)

> **Canonical source for:** `src/master/appendix_model_table.html` (38 строк, 1 секция)
> **VS elements (embedded):** none
> **Sections (1):** `appendix_model_table`
> **Last synced:** 2026-06-24 (iter 18 — Canon created; master HTML уже минимален, миграция не требуется)
> **Migration status:** ✅ MIGRATED (iter 18 — master HTML уже canonical, no compression needed)

---

**Назначение Appendix B:** консолидированная таблица зависимости методов от размера модели. Ссылки на эту таблицу заменяют отдельные `MODEL_NOTE`-заметки в тексте гайда. Создана в Phase 3.3 из консолидированных `MODEL_NOTE`-тегов Parts 4, 6, 7A.

**Cross-ref:** Где используются эти данные — `[ref: part_04.md §4.X — GHOST Layers]`, `[ref: part_06.md §6.X — CoT Tiers]`, `[ref: part_07a.md §7A.X — CORE DIRECTIVES]`.

---

## B.1 Model Capability Table

`data-section: appendix_model_table`

Эта таблица объединяет всю информацию о зависимости методов от размера модели. Ссылки на эту таблицу заменяют отдельные `MODEL_NOTE`-заметки в тексте гайда.

| Feature | 12B Models | 32B+ Models | API Models |
|---------|------------|-------------|------------|
| CoT Effectiveness | Basic (Tier 0–1 only) | Full (Tier 0–3) | Full (Tier 0–3) |
| SPINE Adherence | Moderate | High | High |
| CORE DIRECTIVES Compliance | ~60–80% | ~85–95% | ~90–98% |
| Consequence Driven (Directive #6) | Limited effect — insufficient reasoning capacity | Significant effect | Full effect |
| Pre-Generation Filter (Directive #7) | ~40–60% compliance — often ignored | ~85–95% compliance | ~90–98% compliance |
| Structured Inject (XML) | Limited | Good | Good |
| English Instruction Adherence | ~15–20% higher than native-language instructions | Stable in both languages | Stable in both languages |

### Ключевые следствия для сборки карточки

- **12B модели:** Tier 0–1 CoT only, упрощённая SPINE, ожидать ~60–80% compliance с CORE DIRECTIVES. Английские инструкции в SP дают +15–20% к соблюдению директив.
- **32B+ модели:** полный Tier 0–3 CoT, высокая SPINE adherence, ~85–95% compliance с директивами. Pre-Generation Filter работает надёжно.
- **API модели:** максимальная стабильность, ~90–98% compliance. Structured Inject (XML) рекомендуется для сложных персонажей.

---

## Cross-references

- `p4_ghost_layers` — GHOST Layers рекомендуется для 32B+ и API (12B — опционально).
- `p6_cot_tiers` — Tier 0–1 для 12B, Tier 0–3 для 32B+ и API.
- `p7a_core_directives` — Compliance rates по моделям.
- `p9_12b_issues` — Part 9, диагностика 12B-специфичных проблем.

---

## Migration Notes (iter 18 — applied 2026-06-24)

Master HTML `src/master/appendix_model_table.html` уже минимален (38 строк, 1 секция, 0 VS-EMBED, 0 infographic/mermaid, 1 уникальная 7-row capability table). Контент плотный, дубликатов нет — миграция не требовалась, Canon создан как mirror текущего master HTML с добавлением «Ключевых следствий» (summary блока, который в HTML представлен только таблицей).

| # | Что в master HTML | Действие | Статус | Причина |
|---|-------------------|----------|--------|---------|
| 1 | `<section data-section="appendix_model_table">` h2 + intro p + 7-row capability table + part-resume | Оставить | DONE | Все элементы уникальны, дубликатов нет |

### Validation gates (iter 18 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, baseline warnings.
- [x] `pnpm run build` — SUCCESS.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] Front-matter updated: `Migration status: ✅ MIGRATED (iter 18)`.
