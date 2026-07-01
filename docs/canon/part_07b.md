# Part 7B: Lorebook, Greeting & Compatibility

> **Canonical source for:** `src/master/part_07b.html` (424 строки, 5 секций; iter 25: 371 → 424, +53 — E18 VS-EMBED markup)
> **VS elements (embedded):** E18 — Greeting Algorithm (iter 25, replaced textual `infographic inf-pipeline` block in `p7b_greeting`). Source: `visual-system/elements/E18-greeting-algorithm.html`.
> **Sections (5):** `p7b_structured_inject`, `p7b_greeting`, `p7b_lorebook_basics`, `p7b_lorebook_mechanics`, `p7b_lorebook_advanced`
> **Last synced:** 2026-07-01 (iter 25 — E18 VS-EMBED integrated, textual infographic replaced)
> **Migration status:** ✅ MIGRATED (iter 16) + ✅ E18 integrated (iter 25)

---

**Назначение Part 7B:** технические элементы карточки — Structured Inject (XML-теги в Author's Note), Greeting Message (первое сообщение), Lorebook (база знаний с триггерами). Part 7A покрывает System Prompt и сборку; Part 7B покрывает рантайм-инъекции контекста.

---

## 7B.1 Structured Inject

`data-section: p7b_structured_inject`

**Structured Inject** — техника использования XML-тегов в AN для динамической мотивации.

### Правила Structured Inject

- Не дублируйте SP — добавляйте контекст.
- Не конфликтуйте с Description.
- Задавайте мотивацию, не инструкции.

### Пример Structured Inject

**ILLUSTRATION:**

```
[Author's Note:
<scene_context>Ночь, библиотека закрыта, только они двое</scene_context>
<emotional_state>Усталость + осторожное любопытство</emotional_state>
<hidden_agenda>Елена хочет узнать, зачем {{user}} пришёл</hidden_agenda>
]
```

---

## 7B.2 Greeting Message (первое сообщение)

`data-section: p7b_greeting`

**Greeting Message** — начальное сообщение персонажа. Задаёт место, время и тон.

### Алгоритм Greeting (4 шага)

| # | Шаг | Описание | Детали |
|---|-----|----------|--------|
| 01 | **SENSORY ANCHOR** | Пред-настройка восприятия персонажа | Запах → Звук → Ощущение |
| 02 | **ТЕЛО FLAW** | Физическое проявление через FLAW | Поза → Напряжение → Привычка |
| 03 | **РЕПЛИКА** | Первая фраза персонажа | Голос → Тон → Лексика |
| 04 | **КРЮЧОК** | Вовлечение `{{user}}` в сцену | Открытый вопрос → Действие → Провокация |

**Sensory Anchor** — приём пред-настройки восприятия: персонаж уже в состоянии до первого слова. Пример: Елена за барной стойкой слышит звон бокалов и чувствует запах виски — прежде чем произнести реплику.

### Разобранный пример: Greeting Елены

**ILLUSTRATION** — Demonstrates: EMBODIMENT FIRST, ENVIRONMENTAL REACTIVITY, SHOW NEVER TELL:

```
[ШАГ 1: SENSORY ANCHOR] *Звон бокалов. Запах виски и усталости.*
[ШАГ 2: ТЕЛО FLAW] *Она сидит за стойкой, пальцы машинально крутят салфетку — привычка, выдающая напряжение.*
[ШАГ 3: РЕПЛИКА] «Заказывай или уходи. Я не в настроении.»
[ШАГ 4: КРЮЧОК] *Пауза. Взгляд скользит по твоему лицу.* «Хотя... ты не похож на остальных.»
```

### Правила Greeting

- Длина: **50–100 токенов**.
- Тот же стиль разметки, что в Examples.
- Не начинайте с вопроса о том, что хочет пользователь.
- Задайте место, но не сюжет.

---

## 7B.3 Lorebook (база знаний): основы

`data-section: p7b_lorebook_basics`

**Lorebook** — база знаний с триггерами. Используется для GHOST-связанных фактов.

### Структура записи Lorebook

| Поле | Описание | Пример |
|------|----------|--------|
| **Key** | Триггер-слово | "предательство", "редактор" |
| **Content** | Факт для вставки | "История о коррупции была украдена редактором..." |
| **Position** | Куда вставлять | Author's Note (char) |
| **Depth** | Как давно искать | 5 сообщений |

### Рекомендованные параметры Lorebook

| Параметр | Контекстные факты / GHOST-факты | Мировые записи | Обоснование |
|----------|----------------------------------|----------------|-------------|
| Depth | 2–4 | 0–1 | Контекстные/GHOST-факты нужны в недавнем контексте для активации |
| Probability | 80–100% | 30–50% | Контекстные/GHOST-факты критичны; мировые — атмосферны |
| Cooldown | 5–10 сообщений | 15–20 сообщений | Предотвращает спам реакций |

**RECOMMENDATION:** Lorebook используется для сенсорных активаций и контекстных фактов. Активация через GHOST-события описана в `[ref: §7B.4 — Lorebook механики]`.

### Правила Lorebook

- Контекстные факты / GHOST-факты = кандидаты для Lorebook.
- Не дублируйте Description.
- Триггеры = конкретные слова, не абстракции.

### Примеры записей Lorebook для Елены

**Пример 1: GHOST-факт (пожар)** — ILLUSTRATION (LOREBOOK, GHOST):

| Поле | Значение |
|------|----------|
| Key | пожар, огонь, горел, сгорел |
| Content | Елена помнит запах горящего дерева. В семь лет она стояла во дворе и смотрела, как пламя охватывает крышу. Пожарные приехали слишком поздно. |
| Position | Before char |
| Depth | 3 |
| Probability | 90% |
| Cooldown | 7 |

**Пример 2: Контакт Елены** — ILLUSTRATION (LOREBOOK):

| Поле | Значение |
|------|----------|
| Key | Марина, редактор, бывшая коллега |
| Content | Марина — единственный человек, которому Елена почти доверяла. После истории с редактором Марина перестала отвечать на звонки. Елена не винит её, но не звонит первой. |
| Position | Before char |
| Depth | 4 |
| Probability | 85% |
| Cooldown | 10 |

**Пример 3: Город Елены** — ILLUSTRATION (LOREBOOK, ENVIRONMENTAL REACTIVITY):

| Поле | Значение |
|------|----------|
| Key | порт, набережная, доки, город |
| Content | Город-порт. Запах соли и ржавчины. Набережная — единственное место, где Елена чувствует себя спокойно. Доки — её территория расследований. |
| Position | Before char |
| Depth | 5 |
| Probability | 70% |
| Cooldown | 15 |

### Совместимость EVENT: по фронтендам

Синтаксис `EVENT:` для range-триггеров поддерживается не всеми фронтендами:

| Фронтенд | Поддержка | Примечание |
|----------|-----------|------------|
| SillyTavern | Полная | EVENT:, SECONDARY_KEYS, selective activation |
| Soul of Waifu | Есть аналоги | Расширенные возможности |
| KoboldAI | Частичная | Использовать conditionals в entry content, KEYWORD без EVENT: |
| Oobabooga | Нет | Использовать Lorebook (World Info) или встройте триггеры в Description/AN |
| Faraday.dev / Agnai | Ограниченная | Проверяйте документацию конкретного фронтенда |

**Cross-ref:** Поведенческие механики Lorebook (каскад по диапазону, комбинированный триггер, контекстный фильтр) → `[ref: §7B.4 — Lorebook механики]`.

---

## 7B.4 Lorebook: поведенческие механики

`data-section: p7b_lorebook_mechanics`

Каждая запись Lorebook — это поведенческий триггер, а не хранилище лора. Рекомендуемый бюджет активации: 2–3 механики на сессию. Остальные отключить через `probability: 0` или удалить.

**RECOMMENDATION (Область применения):** Параметры механик работают вместе с базовой структурой записи. Сначала изучите `[ref: §7B.3 — Структуру Lorebook]`.

**RULE (Ограничение):** Никогда не вставляйте действия или мысли `{{user}}` в поле `content`. Это не техническое ограничение, а принцип Anti-godmoding (анти-годмодинга).

### Таблица механик

| Механика | Параметры | Применение | Почему работает для LLM |
|----------|-----------|------------|--------------------------|
| **Каскад по диапазону** (Range-Cascade) | `trigger_type: range` `min_msg/max_msg`: 1–10 → 11–40 → 50+ | Автоматическая прогрессия: завязка → нагнетание → кульминация → развязка. Заменяет ручное обновление AN. | Индекс сообщения выступает временной меткой. Каскад автоматически смещает фокус с WANT на NEED без вмешательства автора. |
| **Комбинированный триггер** (Combo-Trigger) | `trigger_type: keyword` `sticky: 3–5` `cooldown: 20–30` | Срабатывание ключевого слова → персонаж переходит в изменённый режим поведения на N реплик → возвращается к базовому состоянию. | `sticky` закрепляет переходное состояние; `cooldown` предотвращает зацикливание. Создаёт иллюзию смены режима без дрейфа личности. |
| **Контекстный фильтр** (Context Filter) | `depth: 3–5` `exclude_key: ["aside", "joke", "not_"]` `probability: 80%` | Реагирует только на целевой ввод в последних сообщениях; отсекает фоновый шум и ложные срабатывания. | Связка `depth` и `exclude_key` блокирует случайные триггеры. Модель получает чёткий сигнал → снижается риск выхода из образа. |

### Практика — быстрая таблица

| Задача | Тип | Ключевые параметры |
|--------|-----|---------------------|
| Лор мира / NPC | `keyword` | `sticky: 0` — подтягивается только при упоминании |
| Временное состояние (ранен, держит предмет) | `keyword` | `sticky: 3–5` — не теряет контекст несколько реплик |
| Сюжетный поворот | `range` | `min_msg / max_msg` — срабатывает в нужный момент |
| Пасхалка / точечное событие | `range` | `min_msg == max_msg` — ровно на одном сообщении |
| Редкий глюк / экзистенциальный момент | `keyword` | `probability: 10–20%`, `cooldown: 20` — не спамит |
| Блокировка нежелательного лора | `keyword` | `exclude_key: ["стоп", "отмена"]` |

### Пример: Структурированная инъекция в поле content

Чёткое разделение системных инструкций и реплик персонажа внутри поля `content`. **ILLUSTRATION:**

```
[SYSTEM]
<motivation>{{char}} помнит предыдущую ссору и боится повторения.</motivation>
[CONDITION] Если {{user}} повышает голос
[OUTPUT] {{char}} отступает на полшага, сжимает кисти и говорит тише обычного.
```

Альтернатива через XML-теги:

```
<instruction>
  <trigger>{{user}} задаёт личный вопрос</trigger>
  <response>{{char}} уходит от ответа — меняет тему.</response>
  <cost>Пауза, нервный тик — дёрнул плечом.</cost>
</instruction>
```

**Cross-ref:** Продвинутые механики (эмуляция усталости, мета-лор, ложная память) → `[ref: §7B.5 — Продвинутые механики Lorebook]`.

**RECOMMENDATION:** Механики Lorebook особенно полезны для GHOST-связанных триггеров. GHOST-факты (события прошлого) могут активироваться через комбинированный триггер и каскад по диапазону, создавая динамическое поведение.

---

## 7B.5 Lorebook: продвинутые механики

`data-section: p7b_lorebook_advanced`

Продвинуто. Опционально.

### Таблица продвинутых механик

| Механика | Параметры | Применение | Почему работает для LLM |
|----------|-----------|------------|--------------------------|
| **Эмуляция усталости** (Fatigue Emulation) | `trigger_type: range` `min_msg: 100+` `sticky: 1` `content: [SYSTEM: CONTEXT_FATIGUE]` | После 100+ сообщений: персонаж начинает забывать детали, путать имена, речь становится фрагментированной. | Превращает техническую деградацию контекстного окна в нарративную особенность. |
| **Мета-лор** (Meta-Lore) | `keyword: ["config", "log", "bug", "prompt"]` `probability: 10–15%` `cooldown: 25+` | Персонаж интерпретирует технические термины как внутриигровые артефакты, магию или психические симптомы. | Низкая вероятность + высокий `cooldown` обеспечивают редкость события. Модель переосмысляет технический язык через призму сеттинга. |
| **Ложная память** (False Memory) | `range: 42` или `keyword: "you remember"` `content`: псевдо-цитата из «прошлого» | Персонаж ссылается на событие, которого не было. Создаёт психологическое напряжение и элемент непредсказуемости. | Модель способна правдоподобно конфабулировать — механика применяется строго дозированно. |

**RULE (Эмуляция усталости — критическое предупреждение):** При использовании этой механики GHOST Anchors (`[ref: part_04.md §4.2 — GHOST]`) **обязательно** должны быть явно пересказаны внутри `content` этой записи. Без этого Behavioral Anchors (поведенческие якоря) деградируют вместе с поверхностными поведениями.

**RULE (Ложная память — только для экспертов):** Риск Одиночное использование. Требует предварительного согласия пользователя. Злоупотребление разрушает достоверность лора. Конфликтует с принципом психологического ядра при повторном использовании.

### Контекстные бюджеты

| Контекстное окно | Допустимые механики |
|------------------|----------------------|
| **4K** | Только `keyword` + `sticky`. Отключить `range` и `probability`. |
| **8K** | Каскад по диапазону (2–3 стадии) + keyword-фильтры. Обновлять AN каждые 3–5 сообщений. |
| **16K+ / API** | Все механики активны. Lorebook + AN работают как парная система. |

### Чеклист интеграции Lorebook

- [ ] depth/exclude_key/probability фильтры активны.
- [ ] content структурирован (XML или [SYSTEM]-префикс для сложных записей).
- [ ] Нет дублирования между SPINE / AN / записями Lorebook.
- [ ] Эмуляция усталости: GHOST Anchors явно пересказаны в content.
- [ ] Ложная память: отмечена как одноразовая, с согласия пользователя.
- [ ] Действия/мысли `{{user}}` отсутствуют во всех content-полях.

**Bridge:** Карточка собрана. Перед тестированием научитесь распознавать наиболее частые ошибки — паттерны, которые выглядят корректно, но незаметно ломают консистентность персонажа. Каждый анти-паттерн содержит диагностику и ссылку на каноническое исправление. → `[ref: part_08.md]`.

### Что вы теперь умеете

- Настраивать Lorebook: триггеры, глубина, вероятность, позиция вставки.
- Писать Greeting Message по алгоритму: Sensory Anchor → тело FLAW → реплика → крючок.
- Использовать Structured Inject для XML-тегов в Author's Note.
- Избегать конфликтов Lorebook-записей (AP-13).
- Понимать механику Lorebook: постоянный контекст vs. триггерный.

---

## Cross-references из других Parts

- `p2_basic_anchors` — Behavioral Anchors, referenced в §7B.4 (Anti-godmoding rule for content).
- `p4_ghost` — GHOST, referenced в §7B.3 (GHOST-факты candidates), §7B.4 (RECOMMENDATION GHOST-связанные триггеры), §7B.5 (Fatigue Emulation RULE).
- `p7a_authors_note` — Author's Note, referenced в §7B.1 (Structured Inject technique).
- `p7a_system_prompt` — System Prompt, referenced в §7B.1 (Structured Inject rules — не дублируйте SP).
- `p8_ap13_lorebook_conflict` — AP-13 Lorebook Conflict, referenced в §"Что вы теперь умеете" (AP-13 avoid).
- `p9_basic_checklist` — Diagnostic checklist, references Greeting checks (§7B.2 rules).
- `p10_omnis` — Омнис-Зета card, includes 5 Lorebook records (binary_cant, machine_spirit, ghost_child, ghost_first_aug, ghost_obsolescence).
- `p10_vysherblenny` — Выщербленный card, includes 5 Lorebook records (Сангвис, имя, Зеркало, Вентора, Счётчик вырезаний).

---

## Migration Notes (iter 16 — applied 2026-06-24)

Миграция `src/master/part_07b.html` против этого Canon выполнена в iter 16. Результат: 371 → 371 строк (0%, no compression needed). Build PASS, validate:master PASS, qa без регрессий.

**Принцип применённый:** `viz > dry text` (iter 8) — визуализация = замещение, не дополнение; уникальные визуализации не удаляются. Применяется «очень деликатно».

| # | Что в master HTML | Действие | Статус | Причина / Canonical loc |
|---|-------------------|----------|--------|--------------------------|
| 1 | `<section data-section="p7b_structured_inject">` h3 + intro + h4 Правила + 3-bullet list + h4 Пример + ILLUSTRATION label + pre code | Оставить | DONE | Canonical §7B.1 — unique Structured Inject technique |
| 2 | `<section data-section="p7b_greeting" data-toc-nav>` h3 + intro + VS-EMBED E18 (4-step pipeline: Sensory Anchor → Тело FLAW → Реплика → Крючок) + Sensory Anchor paragraph + `<details>` "Разобранный пример: Greeting Елены" + h4 Правила Greeting + 4-bullet list | Оставить + E18 (iter 25) | DONE | Canonical §7B.2 — VS-EMBED E18 replaced textual `infographic inf-pipeline` (iter 25, migration principle "viz > dry text" — VS-EMBED canonical visualization). Sensory Anchor paragraph + Elena example + rules list — unique content, retained. |
| 3 | `<section data-section="p7b_lorebook_basics" data-toc-nav>` h3 + intro + h4 Структура записи + 4-row table + h4 Рекомендованные параметры + 3-row params table + RECOMMENDATION callout + h4 Правила Lorebook + 3-bullet list + 3 `<details>` examples (пожар, Марина, город) + `<details>` EVENT compatibility 5-row table + bridge paragraph | Оставить | DONE | Canonical §7B.3 — unique Lorebook basics + 3 Elena examples + EVENT compatibility table |
| 4 | `<section data-section="p7b_lorebook_mechanics">` h3 + intro + RECOMMENDATION callout + RULE callout + h4 Таблица механик + 3-row mechanics table + h4 Практика + 6-row practice table + `<details>` Structured Inject в content + 2 pre code blocks + bridge paragraph + RECOMMENDATION callout | Оставить | DONE | Canonical §7B.4 — unique mechanics tables + Structured Inject in content example |
| 5 | `<section data-section="p7b_lorebook_advanced">` h3 + intro + h4 Таблица продвинутых механик + 3-row advanced mechanics table + RULE callout (Fatigue) + RULE callout (False Memory) + h4 Контекстные бюджеты + 3-row context budget table + `<details>` Чеклист интеграции + bridge paragraph + part-resume | Оставить | DONE | Canonical §7B.5 — unique advanced mechanics + 2 critical RULE callouts + integration checklist |

### Compression results (iter 16)

0 кандидатов на сжатие обработано. Контент плотный, все секции содержат уникальный контент:

- §7B.1 — Structured Inject technique (unique XML-in-AN pattern).
- §7B.2 — Greeting algorithm + 4 rules + Elena example (infographic = abstract algorithm, example = concrete application — complement, не duplicate).
- §7B.3 — Lorebook basics + 3 Elena examples (пожар/Марина/город — все уникальные данные) + EVENT compatibility (5-row table, unique cross-frontend reference).
- §7B.4 — 3 mechanics (Range-Cascade / Combo-Trigger / Context Filter) + 6-row practice table + Structured Inject in content example.
- §7B.5 — 3 advanced mechanics (Fatigue / Meta-Lore / False Memory) + 2 critical RULE callouts + 3-row context budget + integration checklist.

Итого: 371 → 424 строк (+53, E18 VS-EMBED markup). Принцип `viz > dry text` — textual infographic заменена на VS-EMBED E18 (iter 25, canonical visualization). Sensory Anchor paragraph + Elena example + rules list — retained (unique content).

### iter 25 update — E18 VS-EMBED integration

В iter 25 textual `infographic inf-pipeline` block (lines 33–61 в pre-iter-25 `src/master/part_07b.html`) заменён на VS-EMBED E18 (Greeting Algorithm). E18 — new VS element: 4-step pipeline (Sensory Anchor → Тело FLAW → Реплика → Крючок) с SVG arrows, reuse E02 `.pipeline-*` classes + new `.pipeline-node__code` for technique sequence line. Step 2 (Тело FLAW) uses `.pipeline-node__box--spine` (violet — SPINE connection). Standalone prototype: `visual-system/elements/E18-greeting-algorithm.html`. Component extracts: `visual-system/integration/component-extracts/E18-{visual.html,styles.css,script.js}`. E18 styles appended to `src/assets/vs-styles.css` SECTION 5 (header updated E01–E17 → E01–E18).

### Validation gates (iter 25 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, 0 inline styles, expected content-outside-section warnings (same as E02 in part_07a).
- [x] `pnpm run build` — SUCCESS. Hash `fd3d96d3` unchanged (shell index.html not modified).
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — 43/43 pass.
- [x] `pnpm run lint` — 0 errors (13 warnings pre-existing).
- [x] `pnpm run qa:csp` — PASS (0 inline scripts).
- [x] `pnpm run qa:bundle` — PASS (7.2KB).
- [x] `pnpm run qa:doc-versions` — PASS.
- [x] Front-matter updated: `Last synced: 2026-07-01 (iter 25)`, `Migration status: ✅ MIGRATED (iter 16) + ✅ E18 integrated (iter 25)`.
