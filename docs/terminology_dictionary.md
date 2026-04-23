# Терминологический словарь Live Character Guide

**Версия:** 2.0  
**Дата:** 2026-04-20  

---

## Структура документа

| Термин (EN) | Термин (RU) | Аббревиатура | Категория | Примечание |
|-------------|-------------|--------------|-----------|------------|
| **System Prompt** | Системный промпт | SP | parameter | Использовать SP как аббревиатуру |
| **Description** | Описание | — | structure | Не "Описание персонажа" |
| **Examples** | Примеры | — | structure | Примеры сообщений |
| **Greeting** | Приветствие | — | structure | Первое сообщение |
| **Character Card** | Карточка персонажа | — | structure | Не просто "Персонаж" |
| **Anchors** | Якоря | — | structure | Поведенческие якоря |
| **Trigger** | Триггер | — | structure | Внешний стимул |
| **Action** | Действие | — | structure | Наблюдаемая реакция |
| **Price** | Цена | — | structure | Физическая реакция |
| **SPINE** | SPINE | — | framework | Оставить без перевода |
| **WANT** | Желание | — | framework | Элемент SPINE |
| **NEED** | Потребность | — | framework | Элемент SPINE |
| **FLAW** | Дефект | — | framework | Элемент SPINE |
| **LIE** | Ложная установка | — | framework | Элемент SPINE (L3-only после реструктуризации) |
| **GHOST** | Призрак | — | framework | Элемент SPINE (L3-only после реструктуризации), можно оставить GHOST |
| **OCEAN** | OCEAN | — | framework | Большая пятёрка, без перевода |
| **Enneagram** | Эннеаграмма | — | framework | Типология личности |
| **MBTI** | MBTI | — | framework | Myers-Briggs, без перевода |
| **Author's Note** | Author's Note | AN | parameter | НЕ "Авторские заметки" |
| **Lorebook** | Lorebook | LB | parameter | НЕ "Лорбук" |
| **Chain of Thought** | Цепочка рассуждений | CoT | technique | CoT — аббревиатура (L3-only после реструктуризации) |
| **Voice Isolation** | Изоляция голоса | — | technique | — |
| **Embodiment** | Телесность | — | technique | — |
| **Format Lock** | Format Lock | — | technique | Без перевода |
| **Structured Inject** | Структурированная инъекция | — | technique | — |
| **4K-Fallback** | 4K-Fallback | — | technique | Без перевода |
| **Temperature** | Температура | — | parameter | Параметр генерации |
| **Repetition Penalty** | Штраф за повторы | RepPen | parameter | НЕ выше 1.10 |
| **Presence Penalty** | Штраф за присутствие | — | parameter | Должен быть 0.0 |
| **Top P** | Top P | — | parameter | Без перевода |
| **Min P** | Min P | — | parameter | Без перевода |
| **Top K** | Top K | — | parameter | Без перевода |
| **Token** | Токен | — | parameter | Единица текста |
| **годмодинг** | годмодинг | — | diagnostic | Без перевода |
| **OOC** | OOC | — | diagnostic | Out of Character |
| **Tier** | Уровень | — | classification | Классификация качества |
| **Context** | Контекст | — | technical | Контекстное окно |
| **Poles** | Полюса | — | technical | Полюса OCEAN |
| **Rationale** | Обоснование | — | technical | — |
| **CORE DIRECTIVES** | Основные директивы | CD | technique | Unified directive system in SP. 7 items. English in SP |
| **Tone Frame** | Тональный фрейм | TF | technique | Dual-function SP element (~25-30 tokens). English in SP |
| **SPATIAL LOCK** | Пространственная блокировка | — | directive | Prevent teleportation/anatomical errors. English in SP |
| **PRE-GENERATION FILTER** | Фильтр предгенерации | — | directive | 4-item self-check before response. English in SP |
| **ENVIRONMENTAL REACTIVITY** | Реактивность среды | — | directive | Sensory details only through action. English in SP |
| **INFLUENCE BOUNDARY** | Граница влияния | — | directive | React to observable symptoms only. English in SP |
| **CONSEQUENCE DRIVEN** | Последовательность следствий | — | directive | WANT→NEED shift as Price accumulates. English in SP |
| **SHOW NEVER TELL** | Показывай, не рассказывай | — | directive | Meta-principle: demonstrate through behavior. English in SP |
| **EMBODIMENT FIRST** | Телесность прежде всего | — | directive | State→Body→Sensor→Speech. English in SP |
| **Immersion Boundary** | Иммерсионная граница | — | technique | Advanced OOC: deny meta-reality. L3-only |
| **Voice Contamination** | Заражение голоса | — | diagnostic | Copying foreign `<START>` examples breaks voice on 12B |
| **Narrator Bleed** | Утечка рассказчика | — | diagnostic | Mixing narrator voice with character voice in Examples |
| **One Change Rule** | Правило одного изменения | — | diagnostic | Never change >1 parameter at a time when debugging |
| **Nested Anchors** | Вложенные якоря | — | diagnostic | Anchor chains with nested conditions → unpredictability |
| **Lorebook Entry** | Запись Lorebook | LE | technique | A single entry in the Lorebook with Key/Content/Position/Depth/Probability/Cooldown |

---

## Правила использования

### 1. Полный перевод
Переводятся полностью:
- Description → Описание
- Examples → Примеры
- Greeting → Приветствие
- Trigger → Триггер
- Action → Действие
- Price → Цена

### 2. Оставить без перевода
Не переводятся (технические термины):
- SPINE, GHOST, WANT (Желание), NEED (Потребность), FLAW (Дефект), LIE
- OCEAN, Enneagram (частично), MBTI
- Author's Note (AN), Lorebook (LB)
- CoT, OOC, годмодинг
- Format Lock, 4K-Fallback
- Top P, Min P, Top K
- {{user}}, {{char}}
- CORE DIRECTIVES, Tone Frame, SPATIAL LOCK, PRE-GENERATION FILTER
- ENVIRONMENTAL REACTIVITY, INFLUENCE BOUNDARY, CONSEQUENCE DRIVEN
- SHOW NEVER TELL, EMBODIMENT FIRST, Immersion Boundary

### 3. Аббревиатуры
Использовать аббревиатуры после первого упоминания:
- System Prompt → SP
- Author's Note → AN
- Lorebook → LB
- Chain of Thought → CoT
- Repetition Penalty → RepPen
- CORE DIRECTIVES → CD
- Tone Frame → TF

### 4. Первое упоминание
При первом упоминании термина в разделе:
- Добавить пояснение в скобках
- Пример: "CoT (цепочка рассуждений) — техника..."
- Пример: "AN (Author's Note) — короткая инструкция..."

---

## Запрещённые переводы

| Термин | ❌ Неправильно | ✅ Правильно |
|--------|----------------|--------------|
| Author's Note | Авторские заметки, Авторка | Author's Note (AN) |
| Lorebook | Лорбук | Lorebook (LB) |
| Description | Описание персонажа | Описание |
| Character Card | Персонаж | Карточка персонажа |
| GHOST | GHOST-Слой | GHOST или Призрак |

---

## Заголовки таблиц

Все заголовки таблиц должны быть на русском языке:

| EN | RU |
|----|-----|
| Tier | Уровень |
| Tokens | Токены |
| Context | Контекст |
| Poles | Полюса |
| Rationale | Обоснование |
| Scenario | Сценарий |
| Result | Результат |
| Type | Тип |
| Fear | Страх |
| Desire | Желание |
| Pole | Полюс |
| Low | Низкий |
| High | Высокий |
| Anchor | Якорь |
| Wing Pair | Пара крыльев |
| Stress Behavior | Поведение в стрессе |
| Growth Behavior | Поведение в росте |
| Common Enneagram | Типичная Эннеаграмма |
| Why | Почему |
| Criterion | Критерий |
| Token count | Количество токенов |
| Voice uniqueness | Уникальность голоса |
| Body first | Тело первым |
| FLAW visibility | Видимость FLAW |
| Dialogue style | Стиль диалога |

---

*Документ подготовлен для проекта Live Character Guide*
