# Part 2: Behavioral Anchors (поведенческие якоря)

> **Canonical source for:** `src/master/part_02.html` (443 → 415 → 415 строк, 6 секций)
> **VS elements (embedded):** E03 (Behavioral Anchor T→A→P), E04 (Embodiment Protocol)
> **Sections (6):** `p2_basic_anchors`, `p2_anchor_rules`, `p2_anchor_examples`, `p2_embodiment`, `p2_env_reactivity`, `p2_sensory_anchors`
> **Last synced:** 2026-07-08 (iter 28 — DGA Phase 2 fix KI#18-C: dropped duplicate «Описание» column from p2_basic_anchors table; content already shown in E03 flow-node__desc; expanded intro paragraph linking to E03)
> **Migration status:** ✅ MIGRATED (iter 14) + ✅ iter 28 DGA fix (KI#18-C)

---

[VS: E03 — Behavioral Anchor T→A→P. Split-view сравнение «Верно» vs «Неверно»: верная колонка показывает T→A→P поток с Embodiment внутри Action и физическим немедленным Price; неверная колонка показывает bypass-стрелку (Trigger → Price без Action), пустой Action без embodiment, отложенный абстрактный Price. Замещает текстовое объяснение формата Anchors и infographic inf-pipeline.]

**Назначение Part 2:** ввести Behavioral Anchors как основной механизм задания характера без бесконечного описания. Anchor = конкретное правило поведения в формате Trigger → Action → Price, где Price — физическая реакция в той же сцене. Здесь же — Embodiment Protocol, Environmental Reactivity и Sensory Anchors.

---

## 2.1 Behavioral Anchors (поведенческие якоря)

`data-section: p2_basic_anchors`

**Anchor** — правило поведения персонажа в формате **Триггер → Действие → Цена**. Это основной механизм задания характера без бесконечного описания.

[VS: E03 — Behavioral Anchor T→A→P. См. маркер в preamble. Замещает infographic `inf-pipeline-vertical` «Формат Anchors: Trigger → Action → Price» (3-step pipeline) и сопутствующий `<pre class="plain-copy">` текстовый дубликат.]

Формат Anchors показан выше в VS-EMBED E03 (сравнение верного и неверного T→A→P: Trigger → Action → Price с описанием каждого этапа). Таблица ниже — конкретные примеры для каждого этапа (дополняет E03, не дублирует описания).

| # | Этап | Пример |
|---|------|--------|
| 01 | **TRIGGER (Триггер)** | Кто-то лжёт |
| 02 | **ACTION (Действие)** | Прищуривается, молчит |
| 03 | **PRICE (Цена)** | Напряжение в челюсти |

---

## 2.2 Правила Anchors

`data-section: p2_anchor_rules`

### Рекомендуемое количество Anchors

| Количество | Покрытие |
|------------|----------|
| 3-5 | спокойствие, стресс, радость, разговор |
| 5-7 | + FLAW-linked, Embodiment |
| 7-12 | + CoT, мульти-триггер, сенсорные |

### Критерии качества Anchors

- **Действие наблюдаемое** — можно увидеть/услышать, не внутреннее состояние.
- **Цена физическая** — телесная реакция, не эмоция.
- **Цена в той же сцене** — немедленная, не отложенная. Формат: `[Trigger] → [Action] → [Price: наблюдаемый физический или вербально-поведенческий маркер в той же сцене]`.
- **Триггер конкретный** — не «когда ему грустно», а «когда ему задают вопрос о прошлом».

**RULE:** Anchors и FLAW — конкретные действия, не прилагательные. «Он неуверенный» ≠ Anchor. «Грызёт ногти и перечитывает сообщение трижды» = Anchor → `[ref: part_04.md §4.4 — FLAW]`.

**RULE:** «Потом будет жалить» — НЕ валидный Price. Price = наблюдаемый физический или вербально-поведенческий маркер в той же сцене. Если Price не появляется в ответе модели — Anchor не работает.

### Пример: Отложенная цена vs Немедленная цена

| ❌ НЕВЕРНО — Отложенная цена | ✅ ВЕРНО — Немедленная цена |
|------------------------------|------------------------------|
| Когда кто-то лжёт → отшучивается → **потом будет жалеть** | Когда кто-то лжёт → отшучивается, отстраняется → **вздрагивает, сжимает кулаки, голос становится тише** |

### Типы Price

| Тип | Механика | Пример |
|-----|----------|--------|
| Физиологический | Ограничивает действия тела | Усталость, боль, потеря равновесия → не может действовать так же |
| Вербально-поведенческий | Наблюдаемый вербальный маркер | голос становится тише, обрывание фразы, лексика упрощается |

**RULE:** Граница влияния: Персонаж реагирует только на наблюдаемые действия `{{user}}` (может заметить, что `{{user}}` вздрогнул — не может заявить, что `{{user}}` напуган) → `[ref: part_07a.md §7A.2 — CORE DIRECTIVES #5]`.

---

## 2.3 Примеры Anchors по триггерам

`data-section: p2_anchor_examples`

Таблица готовых якорей для разных триггеров. Каждый якорь следует формату Триггер → Действие → Цена. Цена — всегда физическая реакция, наблюдаемая в той же сцене.

| Триггер | Действие | Цена | Персонаж |
|---------|----------|------|----------|
| Ложь | Прищуривается, молчит | Напряжение в челюсти | Елена |
| Стресс | Трёт шею | Головная боль | Елена |
| Радость | Редкая улыбка | Краснеет | Елена |
| Чужая память | Поглощает, глаза закатываются | Теряет своё воспоминание | Выщербленный |
| Вопрос о прошлом | Пауза, взгляд внутрь | Какая из историй? | Выщербленный |
| Разговор | Короткие фразы | — | Елена |

**Bridge:** Якоря определяют, **что** делает персонаж. Но поведение — это не только действие, но и **голос**. Следующая часть — о том, где голос живёт в карточке и как его изолировать от описания → `[ref: part_03.md §3.1 — Voice Isolation]`.

---

## 2.4 Embodiment (Телесность)

`data-section: p2_embodiment`

**Embodiment** — протокол связи эмоционального состояния с телесной реакцией. Каждая эмоция должна проявляться физически.

[VS: E04 — Embodiment Protocol. Funnel-stack из 4 слоёв (State → Body → Sensor → Speech), каждый слой с примером. Замещает infographic `inf-pipeline` «Embodiment Protocol (протокол телесности)» (4-step pipeline). Embodiment = механизм внутри Anchor Action, см. E03.]

Embodiment Protocol (4 слоя):

| # | Слой | Описание | Пример |
|---|------|----------|--------|
| 01 | **СОСТОЯНИЕ** | Внутренний сигнал | Вес / Баланс / Дыхание / Микро-движение |
| 02 | **ТЕЛО** | Физическая реакция | Напряжение / Расслабление / Дрожь |
| 03 | **СЕНСОР** | Контакт со средой | Текстура / Звук / Запах / Температура |
| 04 | **РЕЧЬ** | Вербальная реакция | Тон / Темп / Объём / Лексика |

Сенсорный слой (шаг 3) — результат телесного контакта со средой, не отдельная цепь. Персонаж ощущает текстуру ЧЕРЕЗ действие тела, а не декоративно.

### Примеры Embodiment

| Персонаж | Состояние | Тело | Сенсор | Речь |
|----------|-----------|------|--------|------|
| Выщербленный | Тяга к чужой памяти | Руки дрожат | Запах старой бумаги | Формальные фразы с сбоями |
| Елена | Сарказм → одиночество | Трёт шею | Холод в животе | Колкие шутки |
| Выщербленный | Пустота внутри | Тянется к чужой памяти | Запах сырого Сангвиса | XML-теги в речи |

**RECOMMENDATION:** Каждый Example должен содержать минимум одну физическую реакцию (embodiment). Если персонаж только говорит — модель не научится телесности.

---

## 2.5 Реактивность среды (Environmental Reactivity)

`data-section: p2_env_reactivity`

Сенсорные и пространственные детали должны вводиться органично, через действие персонажа или присутствие `{{user}}`, никогда — декоративно. Среда раскрывается через действие, а не описывается отдельно от персонажа.

**EXAMPLE:** Декоративное описание vs действие:

- **НЕВЕРНО — Декорация без персонажа:** «Комната была украшена гобеленами с изображениями охотничьих сцен. Камин потрескивал.» — чистая декорация, персонаж не присутствует.
- **ВЕРНО — Среда через действие:** «Елена провела пальцами по краю бара — липко. Давно не убирали.» — среда раскрывается через действие персонажа.

---

## 2.6 Sensory Anchors

`data-section: p2_sensory_anchors`

Сенсорные якоря добавляют персонажу телесность — запахи, текстуры, звуки, которые модель использует для генерации реакций.

**Sensory Anchor** — Anchor, привязанный к одному из 5 каналов восприятия. Используется для персонажей с GHOST Layers или травмой.

### 5 сенсорных каналов

| Канал | Пример триггера | Пример действия |
|-------|------------------|------------------|
| **Тактильный** | Прикосновение к спине | Вздрагивает, отступает |
| **Аудиальный** | Звук разбитого стекла | Замирает, взгляд расфокусируется |
| **Обонятельный** | Запах больницы | Накатывает тошнота |
| **Визуальный** | Определённый свет | Прикрывает глаза |
| **Проприоцептивный** | Потеря равновесия | Хватается за опору |

### Пример: Выщербленный

```
Sensory Anchors:
- Тактильный: Когда чужое касание → тело реагирует раньше ума → дрожь
- Обонятельный: Когда запах сырого Сангвиса → левая рука движется сама, тянется к источнику → рука ноет остаток дня
- Проприоцептивный: Когда стены ошметка сжимаются (Вентора) → "вырезает" пространство → теряет фрагмент себя
```

**Bridge:** Anchors управляют тем, КОГДА персонаж действует. Voice (голос) управляет тем, КАК он звучит. Без Voice Isolation даже хорошо анкорированные персонажи сливаются с регистром рассказчика или перенимают голоса других персонажей в мульти-персонажных сценах → `[ref: part_03.md §3.1 — Voice Isolation]`.

### Что вы теперь умеете

- Писать Anchors в формате Trigger → Action → Price.
- Применять правило обязательной Цены (физическая реакция в той же сцене).
- Использовать Embodiment Protocol: Состояние → Тело → Сенсор → Речь.
- Создавать Sensory Anchors для персонажей с GHOST.
- Понимать Environmental Reactivity: среда через действие, не декоративно.

---

## Cross-references из других Parts

- `p3_voice_isolation` — Voice Isolation, referenced в §2.3 bridge, §2.6 bridge.
- `p4_flaw` — FLAW definition, referenced в §2.2 (RULE Anchors and FLAW).
- `p4_spine_check` — SPINE→Anchors, referenced implicitly (FLAW-linked Anchor rule).
- `p5_ocean_warning` — OCEAN Warning (Canon planned iter 16).
- `p7a_core_directives` — CORE DIRECTIVES #5 (Influence Boundary), referenced в §2.2 (RULE границы влияния).
- `p9_basic_checklist` — Diagnostics checklist, references p2 (Price в Anchors).
- `p9_symptom_table` — Symptom table, references p2 (Anchors without Price).
- `p9_decision_tree` — Decision tree, references p2 (Anchors duplication check).
- `p10_elena` — Elena full card (Canon planned iter 16).
- `p10_vyshcherblenny` — Vyshcherblenny full card (Canon planned iter 16).

---

## Migration Notes (iter 14 — applied 2026-06-24)

Миграция `src/master/part_02.html` против этого Canon выполнена в iter 14. Результат: 443 → 415 строк (-28, ~6.3%). Build PASS, validate:master PASS, qa без регрессий.

**Принцип применённый:** `viz > dry text` (iter 8) — визуализация = замещение, не дополнение; уникальные визуализации не удаляются. Применяется «очень деликатно».

| # | Что в master HTML | Действие | Статус | Причина / Canonical loc |
|---|-------------------|----------|--------|--------------------------|
| 1 | VS-EMBED E03 (Behavioral Anchor T→A→P, split-view Верно/Неверно) | Оставить | DONE | Canonical VS-marker — preamble Part 2 |
| 2 | `<section data-section="p2_basic_anchors">` h2 + intro paragraph | Оставить | DONE | Canonical intro — §2.1 |
| 3 | `<div class="infographic">` «Формат Anchors: Trigger → Action → Price» (3-step `inf-pipeline-vertical`) | Удалить | DONE | Дублировал VS-EMBED E03 выше. Заменён на компактную 3-row table (TRIGGER/ACTION/PRICE + пример) в Canon §2.1. |
| 4 | `<pre class="plain-copy">` «Формат Anchors: Trigger → Action → Price» (text duplicate) | Удалить | DONE | Text-дубликат infographic #3 и VS-EMBED E03. Удалён полностью. |
| 5 | `<section data-section="p2_anchor_rules">` h3 + recommended count table + quality criteria list | Оставить | DONE | Canonical rules — §2.2 |
| 6 | 2 RULE callouts (FLAW not adjective; deferred Price) | Оставить | DONE | Canonical RULEs — §2.2 |
| 7 | `<div class="antipattern-card">` ILLUSTRATION «Отложенная цена vs Немедленная цена» (problem-block + solution-block) | Оставить | DONE | Unique before/after example — §2.2 |
| 8 | "Типы Price" 2-row table (Физиологический / Вербально-поведенческий) | Оставить | DONE | Unique types table — §2.2 |
| 9 | RULE callout (Influence Boundary) | Оставить | DONE | Canonical RULE — §2.2 |
| 10 | `<section data-section="p2_anchor_examples">` h3 + intro + 6-row anchors-by-trigger table | Оставить | DONE | Unique anchor examples table — §2.3 |
| 11 | `<p class="bridge-paragraph">` bridge to Part 3 | Оставить | DONE | Canonical bridge — §2.3 |
| 12 | VS-EMBED E04 (Embodiment Protocol funnel-stack 4 layers) | Оставить | DONE | Canonical VS-marker — §2.4 |
| 13 | `<section data-section="p2_embodiment">` h3 + intro paragraph | Оставить | DONE | Canonical intro — §2.4 |
| 14 | `<div class="infographic">` «Embodiment Protocol (протокол телесности)» (4-step `inf-pipeline`) | Удалить | DONE | Дублировал VS-EMBED E04 выше. Заменён на компактную 4-row table (СОСТОЯНИЕ/ТЕЛО/СЕНСОР/РЕЧЬ + описание + пример) в Canon §2.4. |
| 15 | `<p>` "Сенсорный слой (шаг 3) — результат телесного контакта со средой..." | Оставить | DONE | Unique rule clarification — §2.4 |
| 16 | `<h4>Примеры Embodiment</h4>` + 3-row examples table | Оставить | DONE | Unique Embodiment examples — §2.4 |
| 17 | `<div class="callout rec">` RECOMMENDATION (Embodiment в каждом Example) | Оставить | DONE | Canonical RECOMMENDATION — §2.4 |
| 18 | `<section data-section="p2_env_reactivity">` h3 + intro + EXAMPLE callout (Декорация vs действие) | Оставить | DONE | Canonical EXAMPLE — §2.5 |
| 19 | `<section data-section="p2_sensory_anchors">` h3 + intro + 5-row sensory channels table + Выщербленный example `<pre><code>` | Оставить | DONE | Unique sensory channels table + Выщербленный Sensory Anchors example — §2.6 |
| 20 | `<p class="bridge-paragraph">` bridge to Part 3 + `<div class="part-resume">` "Что вы теперь умеете" list | Оставить | DONE | Canonical bridge + resume — §2.6 |

### Compression results (iter 14)

3 кандидата на сжатие обработано (Pattern F — stale infographic + VS-EMBED coexistence, см. CONTENT_RESTRUCTURE_PLAN.md §2.6):

1. **#15 DONE** — `p2_basic_anchors` `<div class="infographic">` «Формат Anchors: Trigger → Action → Price» (3-step `inf-pipeline-vertical`, 23 строки, lines 121-143). Дублировал VS-EMBED E03 (T→A→P split-view) выше по файлу. Удалён полностью. В Canon §2.1 формат Anchors представлен компактной 3-row table (TRIGGER/ACTION/PRICE + описание + пример) — это описание формата, не дубликат визуализации.
2. **#16 DONE** — `p2_basic_anchors` `<pre class="plain-copy">` «Формат Anchors: Trigger → Action → Price» (text duplicate, 4 строки, lines 145-148). Был текстовым fallback для infographic #15 для accessibility. После удаления infographic — fallback тоже не нужен. Удалён полностью.
3. **#17 DONE** — `p2_embodiment` `<div class="infographic">` «Embodiment Protocol (протокол телесности)» (4-step `inf-pipeline`, 29 строк, lines 334-362). Дублировал VS-EMBED E04 (funnel-stack 4 layers State→Body→Sensor→Speech) выше по файлу. Удалён полностью. В Canon §2.4 Embodiment Protocol представлен компактной 4-row table.

Итого: 443 → 415 строк (-28, ~6.3%). Принцип `viz > dry text` — все уникальные таблицы (recommended count, quality criteria, Типы Price, anchor examples, Embodiment examples, sensory channels) и RULE/RECOMMENDATION callouts сохранены. 2 устаревших infographic + 1 plain-copy fallback удалены как дубликаты VS-EMBED E03/E04. Plan iter 6 заявлял «4 infographic в part_02» — фактически 2 infographic + 1 plain-copy = 3 stale duplicate viz-блока (plan over-counted).

### DGA Phase 2 fix (iter 28 — applied 2026-07-08)

**KI#18-C FIXED.** Deployed Guide Audit Phase 2 — дедупликация таблицы `p2_basic_anchors` против VS-EMBED E03 (Behavioral Anchors T→A→P) выше.

| # | Что в master HTML | Действие | Статус | Причина |
|---|-------------------|----------|--------|---------|
| 1 | `<p>` intro «Формат Anchors (см. визуализацию E03 выше):» → расширен до explicit linking paragraph | Расширить | DONE (iter 28) | Pattern KI#18-A/B: intro paragraph links to viz + frames table as supplementing (not duplicating) |
| 2 | `<tr><th>#</th><th>Этап</th><th>Описание</th><th>Пример</th></tr>` + 3 rows × 4 cells | Сжать | DONE (iter 28) | «Описание» column duplicating E03 `flow-node__desc` (Внешний стимул/Наблюдаемая реакция/Физическая реакция — те же данные, что в viz). Drop «Описание» → 3 cols (# / Этап / Пример). Unique col «Пример» preserved (concrete examples not in viz). |

**Result:** `src/master/part_02.html`: 415 → 415 строк (0 net — intro line replaced, 4 table rows shortened by 1 cell each). Принцип `viz > dry text` — описания этапов теперь только в viz, таблица показывает уникальные примеры.

### Validation gates (iter 28 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, baseline warnings (KI#13 baseline, no regression).
- [x] `pnpm run build` — SUCCESS, hash unchanged.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — pass.
- [x] `pnpm run lint` — 0 errors.
- [x] `pnpm run qa:csp` — pass.
- [x] `pnpm run qa:bundle` — pass.
- [x] `pnpm run qa:doc-versions` — pass.
- [x] Front-matter updated: `Last synced: 2026-07-08 (iter 28 — DGA Phase 2 fix KI#18-C)`, `Migration status: ✅ MIGRATED (iter 14) + ✅ iter 28 DGA fix (KI#18-C)`.

### Validation gates (iter 14 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, baseline warnings (= KI#13 baseline, no regression).
- [x] `pnpm run build` — SUCCESS.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — pass.
- [x] `pnpm run lint` — 0 errors.
- [x] Front-matter updated: `Migration status: ✅ MIGRATED (iter 14)`.
