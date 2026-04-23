# Терминологический словарь Live Character Guide

**Версия:** 2.1  
**Дата:** 2026-04-24  

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
| **OCEAN** | OCEAN | — | framework | Большая пятёрка, без перевода. Измерения: O/C/E/A/N |
| **O — Openness** | Открытость | O | trait | OCEAN-измерение: креативность, любопытство |
| **C — Conscientiousness** | Добросовестность | C | trait | OCEAN-измерение: организованность, дисциплина |
| **E — Extraversion** | Экстраверсия | E | trait | OCEAN-измерение: общительность, энергия |
| **A — Agreeableness** | Доброжелательность | A | trait | OCEAN-измерение: кооперативность, эмпатия |
| **N — Neuroticism** | Нейротизм | N | trait | OCEAN-измерение: эмоциональная нестабильность |
| **OCEAN Poles** | Полюса OCEAN | — | framework | Экстремальные значения (High/Low) каждого измерения OCEAN |
| **Enneagram** | Эннеаграмма | — | framework | Типология личности из 9 типов |
| **MBTI** | MBTI | — | framework | Myers-Briggs, без перевода |
| **NT (Аналитики)** | Аналитики | NT | temperament | MBTI-темперамент Keirsey. Альт: Рационалы. INTJ, INTP, ENTJ, ENTP |
| **NF (Дипломаты)** | Дипломаты | NF | temperament | MBTI-темперамент Keirsey. Альт: Идеалисты. INFJ, INFP, ENFJ, ENFP |
| **SJ (Стражи)** | Стражи | SJ | temperament | MBTI-темперамент Keirsey. ISTJ, ISFJ, ESTJ, ESFJ |
| **SP (Исследователи)** | Исследователи | SP | temperament | MBTI-темперамент Keirsey. Альт: Ремесленники. ISTP, ISFP, ESTP, ESFP. Внимание: SP ≠ System Prompt |
| **E/I axis** | Экстраверсия — Интроверсия | EI | mbti-axis | MBTI-ось: внешний мир vs. внутренний |
| **S/N axis** | Сенсорика — Интуиция | SN | mbti-axis | MBTI-ось: факты vs. паттерны |
| **T/F axis** | Мышление — Чувство | TF | mbti-axis | MBTI-ось: логика vs. ценности |
| **J/P axis** | Суждение — Восприятие | JP | mbti-axis | MBTI-ось: структура vs. гибкость |
| **Enneagram Type 1** | Перфекционист | E1 | enneagram | Альт: Реформатор. Страх быть плохим → Желание быть хорошим |
| **Enneagram Type 2** | Помощник | E2 | enneagram | Альт: Даритель. Страх быть ненужным → Желание быть любимым |
| **Enneagram Type 3** | Достигатель | E3 | enneagram | Альт: Деятель. Страх быть никчёмным → Желание быть ценным |
| **Enneagram Type 4** | Индивидуалист | E4 | enneagram | Альт: Романтик. Страх быть обычным → Желание быть уникальным |
| **Enneagram Type 5** | Исследователь | E5 | enneagram | Альт: Наблюдатель. Страх быть некомпетентным → Желание знать |
| **Enneagram Type 6** | Лоялист | E6 | enneagram | Альт: Скептик. Страх быть без поддержки → Желание безопасности |
| **Enneagram Type 7** | Энтузиаст | E7 | enneagram | Альт: Эпикуреец. Страх быть ограниченным → Желание свободы |
| **Enneagram Type 8** | Челленджер | E8 | enneagram | Альт: Босс. Страх быть слабым → Желание быть сильным |
| **Enneagram Type 9** | Миротворец | E9 | enneagram | Альт: Медиатор. Страх конфликта → Желание мира |
| **Wing** | Крыло | — | enneagram | Смежный тип Эннеаграммы (напр. 1w2 = Перфекционист с крылом Помощника) |
| **Stress Direction** | Направление стресса | — | enneagram | Дезинтеграция: тип в стрессе принимает негативные черты другого типа |
| **Growth Direction** | Направление роста | — | enneagram | Интеграция: тип в росте приобретает позитивные черты другого типа |
| **ocean_correlation** | Корреляция OCEAN | — | data-field | Статистические коэффициенты (0.0–1.0) между типом Enneagram и OCEAN-измерениями |
| **ocean_defaults** | Профиль OCEAN по умолчанию | — | data-field | Значения OCEAN-профиля (0–100) для предзаполнения виджета. ≈ ocean_correlation × 100 |
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
| WANT | Хочет | Желание |
| NEED | Нуждается, Нужда | Потребность |
| FLAW | Изъян | Дефект |
| Greeting | Первое сообщение (без Greeting) | Greeting (Приветствие) |
| SPINE | Спин | SPINE |
| SP-темперамент | SP-темперамент (без пояснения) | SP (Исследователи) — с пометкой «темперамент Keirsey, не System Prompt» |
| NT | Рационалы (как основное) | Аналитики (основное), Рационалы (альтернатива) |
| NF | Идеалисты (как основное) | Дипломаты (основное), Идеалисты (альтернатива) |
| SP (темперамент) | Ремесленники (как основное) | Исследователи (основное), Ремесленники (альтернатива) |
| Enneagram Type 5 | Наблюдатель (как основное) | Исследователь (основное), Наблюдатель (альтернатива) |
| OCEAN N | Нервозность | Нейротизм |
| OCEAN A | Уживчивость, Согласие | Доброжелательность |

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
| Temperament | Темперамент |
| Cognitive Functions | Когнитивные функции |
| Wing | Крыло |
| Stress | Стресс |
| Growth | Рост |
| Core Fear | Ключевой страх |
| Core Desire | Ключевое желание |
| Lie Template | Шаблон ложной установки |
| Flaw Pattern | Паттерн дефекта |
| OCEAN correlation | Корреляция OCEAN |
| OCEAN defaults | Профиль OCEAN по умолчанию |
| MBTI Suggestions | Рекомендуемые MBTI-типы |
| Enneagram Suggestions | Рекомендуемые типы Эннеаграммы |
| SPINE Pattern | Паттерн SPINE |

---

*Документ подготовлен для проекта Live Character Guide*
