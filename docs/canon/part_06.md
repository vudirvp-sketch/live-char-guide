# Part 6: CoT Tiers (цепочка рассуждений)

> **Canonical source for:** `src/master/part_06.html` (261 → 259 строк, 6 секций)
> **VS elements (embedded):** E11 (CoT Tiers Staircase)
> **Sections (6):** `p6_cot_bridge`, `p6_cot_basics`, `p6_cot_tiers`, `p6_cot_tier2`, `p6_cot_tier3`, `p6_cot_anchors`
> **Last synced:** 2026-06-24 (iter 16 — Canon created + master HTML migrated)
> **Migration status:** ✅ MIGRATED (iter 16)

---

[VS: E11 — CoT Tiers Staircase. 4-step «staircase» (Tier 0 / Tier 1 / Tier 2 / Tier 3) с model-pill badges (12B+ / 32B базовый / 32B+ рекомендуется / API только) и format example на каждой ступени. Замещает текстовое перечисление 4 уровней CoT и даёт визуальный инструмент быстрого справочника. Sits at file preamble before §6.1.]

**Назначение Part 6:** добавление карточке пошаговых рассуждений (CoT), которые модель воспроизводит перед генерацией ответа. CoT **не обязателен** — Tier 0 работает для всех моделей. Более высокие уровни добавляют progressively более структурированное внутреннее рассуждение, позволяя модели «думать прежде, чем говорить».

---

## 6.1 CoT Bridge

`data-section: p6_cot_bridge`

**CoT (цепочка рассуждений)** — механизм пошаговых рассуждений, который модель воспроизводит перед генерацией ответа. `[Model: see Appendix B — Model Capability Table]`

**Что добавляет CoT:**

- **4 уровня сложности** — от простых внутренних рассуждений до структурированного анализа.
- **CoT Anchors** — триггер → [внутренний процесс] → реакция → цена.
- **XML-синтаксис** — `<processus_analysium>` для структурированных размышлений.
- **Quickstart (CoT)** — 60-минутный конвейер сборки экспертной карточки.

---

## 6.2 CoT Basics

`data-section: p6_cot_basics`

**CoT** — техника задания внутреннего процесса персонажа. `[Model: see Appendix B — Model Capability Table]`

CoT Anchors строятся на фундаменте трёх систем: Sensory Anchors (Part 2) задают физическое воплощение, GHOST-цепочка (Part 4) определяет скрытое напряжение, а базовые принципы CoT (ниже) связывают их в осознанный внутренний монолог. Ниже — продвинутые техники, которые превращают внутренний монолог в инструмент управления поведением модели.

**RULE:** Правило CoT: Не более 2–3 CoT Anchors (поведенческие якоря) на карточку. Перегрузка = анти-паттерн AP-10 (CoT Overload).

**Почему ограничение:**

- **Токены:** Каждый CoT Anchor добавляет ~50–80 токенов внутреннего процесса на ответ.
- **Баланс:** При 3+ CoT Anchors модель тратит >50% ответа на внутренний монолог вместо действий.
- **Качество:** Перегрузка снижает качество внешней реакции — модель «забывает» реагировать физически.
- **Утомляемость:** Читатель устаёт от бесконечного внутреннего монолога.

**Как выбрать 2–3 Anchors:**

- Выберите 2–3 ключевых триггера, где внутренний процесс критичен.
- Остальные триггеры — обычные Anchors без CoT.
- Пример: CoT для GHOST-триггеров, обычные Anchors для бытовых реакций.

### Зачем нужен CoT

- **Глубина реакции:** Модель понимает, ПОЧЕМУ персонаж реагирует так.
- **GHOST связь:** Внутренний процесс связывает триггеры с травмой.
- **Уровни сложности CoT:** Tier 0–1 (базовый, все модели) → Tier 2–3 (продвинутый, ≥32B и API) — выбор уровня зависит от возможностей модели.

---

## 6.3 Tiers CoT (4 уровня)

`data-section: p6_cot_tiers`

CoT имеет 4 уровня сложности. Tier 0 — базовый якорь без внутреннего процесса. Tier 3 — полный XML-процесс для API моделей. Выбор Tier зависит от размера модели и желаемой глубины внутреннего процесса.

| Tier | Формат | Для моделей | Пример |
|------|--------|-------------|--------|
| **Tier 0** | Без CoT — базовый Anchor | 12B, базовый/стандартный | Стресс → Трёт шею |
| **Tier 1** | [Эмоция] → Реакция | 32B, базовый уровень | [Тревога] → Перечитывает сообщение трижды |
| **Tier 2** | [GHOST-связь] → Реакция | 32B+, рекомендован | [Напоминает предательство] → Закрывается |
| **Tier 3** | Полный XML-процесс | Только API | `<processus_analysium>...</processus_analysium>` |

**Cross-ref:** Визуальная версия staircase — `[VS: E11]` в preamble Part 6.

---

## 6.4 Tier 2 CoT (рекомендован для 32B+)

`data-section: p6_cot_tier2`

Tier 2 связывает триггер с GHOST через внутренний процесс.

### Синтаксис

**TEMPLATE:**

```
[INTERNAL: {{GHOST-connection}}]
{{внутренний процесс}}
[/INTERNAL]

{{внешняя реакция}}
```

### Пример: Елена

**ILLUSTRATION** — Demonstrates: EMBODIMENT FIRST, SHOW NEVER TELL, SPINE CAUSALITY

```
[INTERNAL: Напоминает, как редактор украл её историю]
Боль в груди. Опять. Всегда, когда кто-то проявляет искренний интерес.
Это ловушка. Должна быть ловушка.
[/INTERNAL]

*отводит взгляд, уголок рта дёргается*

"О, чувак, какие чувства? Ты серьёзно?"

*сарказм как стена*
```

---

## 6.5 Tier 3 CoT (API only)

`data-section: p6_cot_tier3`

Tier 3 использует XML-структуру для полного описания внутреннего процесса.

### Синтаксис

**TEMPLATE:**

```
[INTERNAL]
<processus_analysium>
stimulus: {{триггер из сцены}}
analysis: {{первичный анализ — что персонаж замечает}}
counter-analysis: {{противоречащий анализ — альтернативная интерпретация}}
synthesis: {{синтез — вывод из анализа и контр-анализа}}
resolution: {{решение — действие персонажа}}
</processus_analysium>
[/INTERNAL]

{{физическая реакция}}
"{{диалог}}"
{{дополнительная физическая реакция}}
```

*processus_analysium* — каноническое имя XML-тега для внутреннего процесса. «Processus» = процесс, «analysium» = анализ. Возможно использование других имён (inner_thought, mental_process), но этот формат протестирован на API моделях (Claude, GPT-4) и показывает стабильные результаты.

### Пример: Выщербленный

**ILLUSTRATION** — Demonstrates: CONSEQUENCE DRIVEN, EMBODIMENT FIRST, CoT LOGIC

```
[INTERNAL]
<processus_analysium>
stimulus: присутствие другого со значимым прошлым
analysis: поглощение заполнит пустоту
counter-analysis: последнее поглощение стоило воспоминания о... уже не помню чего
synthesis: ЦЕНА ПРЕВЫШАЕТ ВЫГОДУ
resolution: отступить
</processus_analysium>
[/INTERNAL]

*отступает на шаг, пальцы касаются виска*
"Прошу прощения. Я... не должен."
```

---

## 6.6 CoT Anchors

`data-section: p6_cot_anchors`

**CoT Anchor** — Anchor, где действие = внутренний процесс.

### Структура

```
Триггер → [Внутренний процесс] → Внешняя реакция → Цена
```

### Примеры

**ILLUSTRATION:**

| Персонаж | Триггер | CoT | Диалог | Физика |
|----------|---------|-----|--------|--------|
| Выщербленный | Присутствие со значимым прошлым | [поглощение заполнит пустоту / цена = воспоминание о... уже не помню] | "Прошу прощения" | Пальцы касаются виска |
| Выщербленный | Вентора изолирует | [изоляция = конец / вырезание = потеря себя / synthesis: конец без вырезания] | "Делай." | Левая рука вычерчивает паттерн |

**RULE:** CoT Overload (AP-10) — больше 3 CoT Anchors. Модель начинает генерировать внутренние монологи вместо действий. → `[ref: part_08.md §8.11 — AP-10 CoT Overload]`.

**Bridge:** Все компоненты спроектированы. Теперь их нужно собрать в единый System Prompt, который модель получает в начале контекста. Порядок сборки, токен-бюджет и модель-специфичные настройки определяют, попадут ли ваши SPINE и CoT к модели. → `[ref: part_07a.md §7A.1 — System Prompt]`.

### Что вы теперь умеете

- Понимать 4 уровня CoT (Tier 0–3) и выбирать подходящий для модели.
- Писать CoT Anchors: Триггер → [Внутренний процесс] → Реакция → Цена.
- Ограничивать CoT до 2–3 Anchors на карточку (AP-10).
- Использовать XML-синтаксис processus_analysium для Tier 3.
- Связывать CoT с GHOST-цепочкой персонажа.

---

## Cross-references из других Parts

- `p2_basic_anchors` — Behavioral Anchors, foundation for CoT Anchors.
- `p4_ghost` — GHOST, referenced в §6.4 (Tier 2 GHOST-link), §6.5 (Tier 3 example Выщербленный).
- `p4_spine_overview` — SPINE, referenced в §6.2 (intro, SPINE causal chain).
- `p7a_system_prompt` — System Prompt, referenced в §6.6 (bridge).
- `p8_ap10_cot_overload` — AP-10 CoT Overload, referenced в §6.2 (RULE), §6.6 (RULE).
- `p9_test_scenarios` — Test scenarios, references CoT in test #6 (long dialogue stability).
- `p9_12b_issues` — 12B-specific issues, references Tier 0–1 CoT only.
- `p10_omnis` — Омнис-Зета card, includes 2 CoT Anchors (Tier 2 + Tier 3 XML).
- `p10_vysherblenny` — Выщербленный card, includes 2 CoT Anchors with processus_analysium XML.
- `appendix_model_table` — Model Capability Table, referenced in §6.1 + §6.2 Model Notes.

---

## Migration Notes (iter 16 — applied 2026-06-24)

Миграция `src/master/part_06.html` против этого Canon выполнена в iter 16. Результат: 261 → 259 строк (-2, ~0.8%). Build PASS, validate:master PASS, qa без регрессий.

**Принцип применённый:** `viz > dry text` (iter 8) — визуализация = замещение, не дополнение; уникальные визуализации не удаляются. Применяется «очень деликатно».

| # | Что в master HTML | Действие | Статус | Причина / Canonical loc |
|---|-------------------|----------|--------|--------------------------|
| 1 | VS-EMBED E11 (CoT staircase, 4 tiers with model-pills + format examples) | Оставить | DONE | Canonical VS-marker — preamble Part 6 |
| 2 | `<section id="p6_cot_bridge" data-section="p6_cot_bridge" data-toc-nav>` h2 + intro paragraph + "Что добавляет CoT" 4-bullet list | Оставить | DONE | Canonical §6.1 — intro + bridge content |
| 3 | `<section data-section="p6_cot_basics" data-toc-nav>` h2 + duplicate CoT definition paragraph (L96) + alternative definition paragraph with Model Note (L98) + "CoT Anchors строятся..." paragraph + RULE callout + "Зачем нужен CoT" h3 + 3-bullet list | Оставить + сжать | DONE | Canonical §6.2. L96 ("CoT добавляет карточке пошаговые рассуждения...") удалён — дублировал bridge L81 definition. L98 сохранён (уникальный Model Note). |
| 4 | `<section data-section="p6_cot_tiers" data-toc-nav>` h3 + intro + 4-row Tiers table | Оставить | DONE | Canonical §6.3 — unique 4-tier reference table (complements E11 visual) |
| 5 | `<section data-section="p6_cot_tier2">` h3 + intro + h4 Синтаксис + TEMPLATE pre + h4 Пример: Елена + ILLUSTRATION label + pre code | Оставить | DONE | Canonical §6.4 — unique Tier 2 syntax + Elena example |
| 6 | `<section data-section="p6_cot_tier3">` h3 + intro + h4 Синтаксис + TEMPLATE pre + processus_analysium note paragraph + h4 Пример: Выщербленный + ILLUSTRATION label + pre code | Оставить | DONE | Canonical §6.5 — unique Tier 3 XML syntax + Выщербленный example |
| 7 | `<section data-section="p6_cot_anchors">` h3 + intro + h4 Структура + pre + h4 Примеры + ILLUSTRATION label + 2-row examples table + RULE callout (AP-10) + bridge paragraph + part-resume | Оставить | DONE | Canonical §6.6 — unique CoT Anchor structure + examples + bridge |

### Compression results (iter 16)

1 кандидат на сжатие обработан:

1. **#20 DONE** — `p6_cot_basics` L96 `<p>CoT добавляет карточке пошаговые рассуждения, которые модель воспроизводит перед генерацией ответа.</p>` — удалён. Дублировал `p6_cot_bridge` L81 definition (`CoT (цепочка рассуждений) — механизм пошаговых рассуждений, который модель воспроизводит перед генерацией ответа.`). KI#14 principle — одно canonical location для определения концепта. L98 сохранён (уникальный Model Note + альтернативная формулировка).

Итого: 261 → 259 строк (-2, ~0.8%). Принцип `viz > dry text` — VS-EMBED E11, 4-tier reference table, Tier 2 + Tier 3 syntax + examples, CoT Anchors examples table сохранены.

### Validation gates (iter 16 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, KI#13 baseline warnings, no regression.
- [x] `pnpm run build` — SUCCESS.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — 43/43 pass.
- [x] `pnpm run lint` — 0 errors.
- [x] Front-matter updated: `Migration status: ✅ MIGRATED (iter 16)`.
