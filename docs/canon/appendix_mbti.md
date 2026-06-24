# Appendix A: MBTI Reference (Справочник MBTI)

> **Canonical source for:** `src/master/appendix_mbti.html` (62 строки, 1 секция)
> **VS elements (embedded):** none (MBTI Composer widget, no VS-EMBED marker)
> **Sections (1):** `appendix_mbti`
> **Last synced:** 2026-06-24 (iter 18 — Canon created; master HTML уже минимален, миграция не требуется)
> **Migration status:** ✅ MIGRATED (iter 18 — master HTML уже canonical, no compression needed)

---

**Назначение Appendix A:** справочная модель MBTI из 16 типов на 4 осях. MBTI — необязательный инструмент: для создания карточки используйте OCEAN (полюса → Anchors) и Enneagram (тип → SPINE). MBTI дополняет понимание, но не имеет прямого маппинга на SPINE.

**Cross-ref:** OCEAN и Enneagram — `[ref: part_05.md §5.1 — OCEAN]` и `[ref: part_05.md §5.4 — Enneagram]`.

---

## A.1 MBTI: 4 оси и 16 типов

`data-section: appendix_mbti`

**MBTI** — модель из 16 типов на 4 осях. Менее научная, чем OCEAN, но популярная.

### 4 оси MBTI

| Ось | Полюс A | Полюс B |
|-----|---------|---------|
| **E/I** | Extraversion | Introversion |
| **S/N** | Sensing | Intuition |
| **T/F** | Thinking | Feeling |
| **J/P** | Judging | Perceiving |

### Темпераменты (Keirsey)

| Группа | Типы | Цвет (в виджете) |
|--------|------|------------------|
| **NT** (Аналитики) | INTJ, INTP, ENTJ, ENTP | Фиолетовый |
| **NF** (Дипломаты) | INFJ, INFP, ENFJ, ENFP | Розовый |
| **SJ** (Стражи) | ISTJ, ISFJ, ESTJ, ESFJ | Голубой |
| **S·P** (Исследователи) | ISTP, ISFP, ESTP, ESFP | Оранжевый |

**NOTE:** S·P = темперамент Keirsey **S**ensing-**P**erceiving, не **SP** (System Prompt). В виджете и таблицах используется `S·P` (с точкой) для устранения коллизии с аббревиатурой SP → `[ref: part_07a.md §7A.X — System Prompt]`.

### MBTI Composer (interactive)

`<div id="mbti-embed" class="mbti-embed">` — контейнер для MBTI Composer виджета (filter grid по 4 осям + 16 типов). Виджет инициализируется лениво через `lazy-loader.js`.

### RECOMMENDATION: MBTI — справочный инструмент

**RECOMMENDATION:** Для создания карточки используйте OCEAN (полюса → Anchors (поведенческие якоря)) и Enneagram (тип → SPINE). MBTI дополняет понимание, но не имеет прямого маппинга на SPINE.

---

## Cross-references

- `p5_mbti_ref` — Part 5, краткая ссылка на этот Appendix.
- `p5_ocean_basics` — OCEAN как основной инструмент валидации SPINE.
- `p5_enneagram_basics` — Enneagram как основной инструмент вывода SPINE.

---

## Migration Notes (iter 18 — applied 2026-06-24)

Master HTML `src/master/appendix_mbti.html` уже минимален (62 строки, 1 секция, 0 VS-EMBED, 0 infographic/mermaid). Контент плотный, дубликатов нет — миграция не требовалась, Canon создан как mirror текущего master HTML.

| # | Что в master HTML | Действие | Статус | Причина |
|---|-------------------|----------|--------|---------|
| 1 | `<section data-section="appendix_mbti">` h2 + intro p + h3 «4 оси MBTI» + 4-row table + h3 «Темпераменты» + 4-row table + S·P disambiguation note + mbti-embed widget div + RECOMMENDATION callout + next-sections cross-ref + part-resume | Оставить | DONE | Все элементы уникальны, дубликатов нет |

### Validation gates (iter 18 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, baseline warnings.
- [x] `pnpm run build` — SUCCESS.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] Front-matter updated: `Migration status: ✅ MIGRATED (iter 18)`.
