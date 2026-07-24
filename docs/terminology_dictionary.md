# Терминологический словарь Live Character Guide

**Версия:** 9.2.0
**Дата:** 2026-07-25 (iter 60 — языковая политика revision)
**Источник правды:** `docs/canon/*.md` (определения) + этот файл (canonical forms + language policy)

---

## 1. Канонические формы терминов

Каноническая форма — единственная допустимая в `data-section` ID, XML-тегах, SP-содержимом и кодоподобных контекстах. В заголовках секций и беглом тексте русский эквивалент допустим как первичный (см. §6).

### Категория A: English mandatory (функциональная причина — входит в SP/card output)

Эти термины попадают в System Prompt карточки или являются кодоподобными идентификаторами. English canonical — единственная допустимая форма в `data-section` ID, XML-тегах, SP-содержимом. Заголовки секций для Category A — тоже English (SP-содержимое).

| Канонический термин | Аббр. | ❌ Forbidden in code/ID/SP | Категория |
|---------------------|-------|---------------------------|-----------|
| **CORE DIRECTIVES** | CD | ядерные директивы, Core Directives | directive |
| **System Prompt** | SP | системный промпт, System Prompt block, SP block | parameter |
| **Anti-godmoding** | — | анти-годмодинг, anti-godmode, godmoding protection | directive |
| **Format Lock** | — | (без перевода) | technique |
| **Tone Frame** | — | (без перевода) | technique |
| **Show Never Tell** | — | показывай не рассказывай, show don't tell | directive |
| **Embodiment First** | — | воплощение прежде всего | directive |
| **Spatial & Anatomical Lock** | — | анатомический лок, spatial lock | directive |
| **Environmental Reactivity** | — | экологическая реактивность, реактивность окружения | directive |
| **Influence Boundary** | — | граница влияния, boundary of influence | directive |
| **Consequence Driven** | — | управляемый последствиями, consequences matter | directive |
| **Pre-Generation Filter** | — | предгенерационный фильтр, pregen filter | directive |
| **SPINE** | — | Spine, spine chain, SPINE chain, SPINE-цепочка | framework |
| **GHOST** | — | призрак (в техн. контексте), ghost layer (ед. ч.) | framework |
| **GHOST Layers** | — | ghost layers, призрачные слои, 3-tier GHOST | framework |
| **WANT** | — | Хочет (как глоссарийный термин) | framework |
| **NEED** | — | Нуждается, Нужда | framework |
| **FLAW** | — | Изъян (как глоссарийный термин) | framework |
| **LIE** | — | ложная установка (в техн. контексте) | framework |
| **OCEAN** | — | Big Five, big five, Большая пятёрка | framework |
| **Enneagram** | — | эннеаграмма (в заголовках/ID/метках) | framework |
| **MBTI** | — | Myers-Briggs (без перевода) | framework |
| **CoT** | CoT | цепочка рассуждений (в техн. конт.), Chain of Thought | technique |
| **Lorebook** | LB | лорбук, World Info, world info | parameter |
| **Author's Note** | AN | Авторские заметки, Авторка | parameter |
| **Token Budget** | — | бюджет токенов (в заголовках/метках), token budget allocation | parameter |
| **Repetition Penalty** | RepPen | штраф за повторы | parameter |
| **Presence Penalty** | — | штраф за присутствие | parameter |
| **Top P / Min P / Top K** | — | (без перевода) | parameter |
| **OOC** | OOC | out of character | diagnostic |
| **4K-Fallback** | — | (без перевода) | technique |

### Категория B: Russian primary in headings/prose (нет функциональной причины для English-only)

Эти термины НЕ попадают в SP или card output. English canonical нужна только в `data-section` ID и XML-тегах. Заголовки секций: русский первичный + English canonical в скобках.

| Канонический термин | Русский эквивалент | ⚠️ Restricted: English mandatory in code/ID only | Категория |
|---------------------|--------------------|------------------------------------------------|-----------|
| **Behavioral Anchor** | поведенческий якорь | якорь (без контекста), behavioural anchor, behavior trigger | structure |
| **Voice** | голос | голос персонажа, voice profile | framework |
| **Voice Isolation** | изоляция голоса | voice separation | technique |
| **Voice Bleed** | утечка голоса | voice leak (при cross-character bleed) | diagnostic |
| **Embodiment Protocol** | протокол телесности | протокол воплощения, embodiment sequence | technique |
| **Identity Block** | блок идентичности | identity section | structure |
| **Greeting Message** | приветствие | первое сообщение | structure |
| **Structured Inject** | структурированная инъекция | (без русского альтернативного) | technique |
| **Persona Synthesis** | синтез личности | (не указан ранее) | framework |
| **Sensory Anchors** | сенсорные якоря | (не указан ранее) | structure |

---

## 2. Структура T→A→P (Behavioral Anchor)

| Элемент | EN | RU | Описание |
|---------|----|----|----------|
| Trigger | Trigger | Триггер | Внешний стимул |
| Action | Action | Действие | Наблюдаемая реакция |
| Price | Price | Цена | Физическая реакция в той же сцене |

---

## 3. OCEAN: 5 измерений

| Буква | EN | RU | Низкий полюс (<30) | Высокий полюс (>70) |
|-------|----|----|---------------------|---------------------|
| **O** | Openness | Открытость | Практичный, предпочитает знакомое | Любопытный, творческий |
| **C** | Conscientiousness | Добросовестность | Спонтанный, гибкий | Организованный, дисциплинированный |
| **E** | Extraversion | Экстраверсия | Интроверт | Экстраверт, общительный |
| **A** | Agreeableness | Доброжелательность | Конкурентный, критичный | Доверчивый, альтруистичный |
| **N** | Neuroticism | Нейротизм | Эмоционально стабильный | Тревожный, реактивный |

**Запрещённые переводы:** N = «Нервозность» (✅ Нейротизм), A = «Уживчивость / Согласие» (✅ Доброжелательность).

---

## 4. MBTI: 4 оси + 4 темперамента Keirsey

### 4 оси MBTI

| Ось | Полюс A | Полюс B |
|-----|---------|---------|
| **E/I** | Extraversion | Introversion |
| **S/N** | Sensing | Intuition |
| **T/F** | Thinking | Feeling |
| **J/P** | Judging | Perceiving |

### Темпераменты Keirsey

| Аббр. | Основное название | Альтернатива | Типы |
|-------|-------------------|--------------|------|
| **NT** | Аналитики | Рационалы | INTJ, INTP, ENTJ, ENTP |
| **NF** | Дипломаты | Идеалисты | INFJ, INFP, ENFJ, ENFP |
| **SJ** | Стражи | — | ISTJ, ISFJ, ESTJ, ESFJ |
| **S·P** | Исследователи | Ремесленники | ISTP, ISFP, ESTP, ESFP |

**⚠️ Disambiguation:** `S·P` = темперамент Keirsey **S**ensing-**P**erceiving, не **SP** (System Prompt). В виджетах и таблицах используется `S·P` (с точкой) для устранения коллизии.

---

## 5. Enneagram: 9 типов

| Тип | Основное | Альтернатива | Страх → Желание |
|-----|----------|--------------|-----------------|
| **E1** | Перфекционист | Реформатор | Быть плохим → Быть хорошим |
| **E2** | Помощник | Даритель | Быть ненужным → Быть любимым |
| **E3** | Достигатель | Деятель | Быть никчёмным → Быть ценным |
| **E4** | Индивидуалист | Романтик | Быть обычным → Быть уникальным |
| **E5** | Исследователь | Наблюдатель | Быть некомпетентным → Знать |
| **E6** | Лоялист | Скептик | Быть без поддержки → Безопасность |
| **E7** | Энтузиаст | Эпикуреец | Быть ограниченным → Свободу |
| **E8** | Челленджер | Босс | Быть слабым → Быть сильным |
| **E9** | Миротворец | Медиатор | Конфликт → Мир |

**Wing** — смежный тип (напр. `1w2` = Перфекционист с крылом Помощника). **Stress Direction** — дезинтеграция в стрессе. **Growth Direction** — интеграция в росте.

---

## 6. Языковая политика (iter 60 revision)

### Основные правила

1. **Русский — основной язык прозы и заголовков секций.** Все описательные тексты и заголовки на русском.
2. **English canonical — только в кодоподобных контекстах:** `data-section` ID, XML-теги в card output, SP-содержимое, акронимы (SPINE, OCEAN, SP, CoT).
3. **Первое упоминание в Part:** русский текст + English canonical в скобках. Пример: «поведенческий якорь (Behavioral Anchor) определяется форматом T→A→P»
4. **Последующие упоминания в Part:** русский термин или акроним без English. Пример: «каждый якорь задаёт поведение» или «SPINE определяет каркас»
5. **Заголовки секций:** русский первичный + English canonical в скобках для Category B/C терминов. Category A заголовки — English only (SP-содержимое). `data-section` ID — всегда English.
6. **Гайд — единый последовательный документ, не википедия.** Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять и не добавлять кросс-референс. Просто использовать концепцию.

### Контекстные правила

| Контекст | Category A (SP-содержимое) | Category B (не SP-содержимое) |
|----------|---------------------------|------------------------------|
| Заголовок секции | English only: `## CORE DIRECTIVES` | Русский первичный: `## Поведенческие якоря (Behavioral Anchors)` |
| `data-section` ID | English: `p7a_core_directives` | English: `p2_basic_anchors` |
| Беглый текст | English canonical + RU при первом упоминании | Русский + English canonical при первом упоминании |
| RULE/RECOMMENDATION label | English (parsing anchor) | English (parsing anchor) |
| Таблицы заголовки | Русские | Русские |
| Глоссарий | English canonical + русский перевод | English canonical + русский перевод |

### Примеры

| Контекст | ✅ Правильно | ❌ Неправильно |
|----------|--------------|----------------|
| Заголовок (Cat A) | `## CORE DIRECTIVES` | `## Ядерные директивы` |
| Заголовок (Cat B) | `## Поведенческие якоря (Behavioral Anchors)` | `## Behavioral Anchors` (English only) |
| `data-section` ID | `data-section="identity-block"` | `data-section="блок-идентичности"` |
| Первое упоминание (Cat B) | «поведенческий якорь (Behavioral Anchor) задаёт...» | «Behavioral Anchor задаёт...» |
| Последующее | «каждый якорь задаёт поведение» | «каждый Behavioral Anchor задаёт поведение» |
| Беглый текст | «...эннеаграмма типа 4...» | — (допустимо) |

### Аббревиатуры (после первого упоминания)

- System Prompt → **SP**
- Author's Note → **AN**
- Lorebook → **LB**
- CoT → (уже аббр.; не раскрывать как «Chain of Thought»)
- Repetition Penalty → **RepPen**
- CORE DIRECTIVES → **CD**
- Tone Frame → **TF**
- Greeting Message → допустима краткая форма «приветствие» в беглом тексте

---

## 7. Заголовки таблиц (RU)

Все заголовки таблиц в гайде — на русском:

| EN | RU |
|----|-----|
| Tier | Уровень |
| Tokens | Токены |
| Context | Контекст |
| Poles | Полюса |
| Scenario | Сценарий |
| Result | Результат |
| Type | Тип |
| Fear | Страх |
| Desire | Желание |
| Pole | Полюс |
| Low / High | Низкий / Высокий |
| Anchor | Якорь |
| Wing | Крыло |
| Stress / Growth | Стресс / Рост |
| Core Fear / Core Desire | Ключевой страх / Ключевое желание |
| Temperament | Темперамент |
| Cognitive Functions | Когнитивные функции |
| Token count | Количество токенов |
| Voice uniqueness | Уникальность голоса |
| Body first | Тело первым |
| FLAW visibility | Видимость FLAW |
| Dialogue style | Стиль диалога |
| Lie Template | Шаблон ложной установки |
| Flaw Pattern | Паттерн дефекта |
| OCEAN correlation | Корреляция OCEAN |
| OCEAN defaults | Профиль OCEAN по умолчанию |
| MBTI Suggestions | Рекомендуемые MBTI-типы |
| Enneagram Suggestions | Рекомендуемые типы Эннеаграммы |
| SPINE Pattern | Паттерн SPINE |
| Token Budget | Бюджет токенов |
| Identity Block | Блок идентичности |
| Greeting Message | Приветствие |
| Behavioral Anchor | Поведенческий якорь |
| Embodiment Protocol | Протокол телесности |

---

## 8. Глоссарий (определения)

Полные определения всех терминов — в `docs/canon/appendix_glossary.md` (24 entries, алфавитный указатель). Этот файл задаёт **canonical forms + language policy**; Appendix C Canon задаёт **deep definitions**.

---

*Источник правды: `docs/canon/*.md`. Updated 2026-07-25 iter 60 — language policy revision: split Category A/B, invert first-mention rule (RU primary + EN canonical), add §6 rule 6 (sequential reader principle), add Category B table with ⚠️ Restricted notation.*
