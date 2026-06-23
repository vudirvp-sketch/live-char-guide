# Терминологический словарь Live Character Guide

**Версия:** 9.1.0  
**Дата:** 2026-06-23 (обновлено в iter 3 docs restructure)  
**Фаза:** Phase 1.1 — Canonical Terminology Mapping (актуализировано под v9.1)

---

## Канонические терминологические отображения (Phase 1)

Ниже приведена таблица всех канонических терминов проекта и устаревших форм, которые подлежат замене. Каноническая форма — единственная допустимая в заголовках, метках, идентификаторах data-section и кодоподобных контекстах. В беглом тексте допускается русский эквивалент при первом упоминании в рамках Part (см. «Языковая политика»).

| # | Канонический термин | Устаревшие / запрещённые формы | Категория |
|---|---------------------|-------------------------------|-----------|
| 1 | **System Prompt** | системный промпт, System Prompt block, SP block | parameter |
| 2 | **CORE DIRECTIVES** | Core Directives, core directives, ядерные директивы | directive |
| 3 | **Environmental Reactivity** | Environmental reactivity, экологическая реактивность, реактивность окружения | directive |
| 4 | **Embodiment First** | Embodiment first, воплощение прежде всего | directive |
| 5 | **Influence Boundary** | Influence boundary, граница влияния, boundary of influence | directive |
| 6 | **Consequence Driven** | Consequence driven, управляемый последствиями, consequences matter | directive |
| 7 | **Pre-Generation Filter** | Pre-generation filter, предгенерационный фильтр, pregen filter | directive |
| 8 | **Show Never Tell** | Show never tell, показывай не рассказывай, show don't tell | directive |
| 9 | **Spatial & Anatomical Lock** | Spatial & anatomical lock, spatial lock, анатомический лок, spatial and anatomical lock | directive |
| 10 | **SPINE** | Spine, spine chain, SPINE chain, SPINE-цепочка | framework |
| 11 | **Behavioral Anchor** | якорь (в технических контекстах), behavioural anchor, behavior trigger | structure |
| 12 | **Voice** | голос персонажа, voice profile | framework |
| 13 | **Voice Isolation** | изоляция голоса, voice separation | technique |
| 14 | **Voice Bleed** | voice leak, утечка голоса (при значении cross-character bleed) | diagnostic |
| 15 | **GHOST** | призрак (в технических контекстах), ghost layer (в ед. числе) | framework |
| 16 | **GHOST Layers** | ghost layers, призрачные слои, 3-tier GHOST | framework |
| 17 | **OCEAN** | Big Five, big five, Большая пятёрка | framework |
| 18 | **Enneagram** | (в заголовках/ID/метках/коде — всегда Enneagram; «эннеаграмма» допустима только в беглом тексте) | framework |
| 19 | **CoT** | цепочка рассуждений (в технических контекстах), Chain of Thought | technique |
| 20 | **Lorebook** | лорбук, World Info, world info | parameter |
| 21 | **Anti-godmoding** | анти-годмодинг, anti-godmode, godmoding protection | directive |
| 22 | **Embodiment Protocol** | протокол воплощения, embodiment sequence | technique |
| 23 | **Identity Block** | блок идентичности, identity section | structure |
| 24 | **Greeting Message** | приветствие (в заголовках/метках), greeting, greeting message, первое сообщение | structure |
| 25 | **Token Budget** | бюджет токенов, token budget allocation | parameter |

---

## Структура документа

| Термин (EN) | Термин (RU) | Аббревиатура | Категория | Примечание |
|-------------|-------------|--------------|-----------|------------|
| **System Prompt** | Системный промпт | SP | parameter | Использовать SP как аббревиатуру. НЕ «системный промпт» / «SP block» / «System Prompt block» |
| **Description** | Описание | — | structure | Не "Описание персонажа" |
| **Examples** | Примеры | — | structure | Примеры сообщений |
| **Greeting Message** | Приветствие | — | structure | В заголовках/метках — всегда «Greeting Message». В беглом тексте допустима краткая форма «Greeting». НЕ «приветствие» / «первое сообщение» в заголовках |
| **Character Card** | Карточка персонажа | — | structure | Не просто "Персонаж" |
| **Identity Block** | Блок идентичности | — | structure | Секция System Prompt, определяющая кто персонаж. НЕ «блок идентичности» / «identity section» |
| **Behavioral Anchor** | Поведенческий якорь | — | structure | T→A→P triple (Trigger→Action→Price). Отличать от общего «якорь». НЕ «behavioural anchor» / «behavior trigger» |
| **Trigger** | Триггер | — | structure | Внешний стимул |
| **Action** | Действие | — | structure | Наблюдаемая реакция |
| **Price** | Цена | — | structure | Физическая реакция |
| **SPINE** | SPINE | — | framework | Без перевода. НЕ «Spine» / «spine chain» / «SPINE chain» / «SPINE-цепочка» |
| **WANT** | Желание | — | framework | Элемент SPINE |
| **NEED** | Потребность | — | framework | Элемент SPINE |
| **FLAW** | Дефект | — | framework | Элемент SPINE |
| **LIE** | Ложная установка | — | framework | Элемент SPINE |
| **GHOST** | Призрак | — | framework | В технических контекстах — всегда GHOST. НЕ «призрак» в заголовках/ID / «ghost layer» (ед. ч.) |
| **GHOST Layers** | Призрачные слои | — | framework | Трёхуровневая система GHOST. НЕ «ghost layers» / «призрачные слои» / «3-tier GHOST» |
| **Voice** | Голос | — | framework | Канонический термин для голоса персонажа. НЕ «голос персонажа» / «voice profile» |
| **Voice Isolation** | Изоляция голоса | — | technique | НЕ «изоляция голоса» (как русский термин в техническом контексте) / «voice separation» |
| **Voice Bleed** | Утечка голоса | — | diagnostic | Проникновение голоса другого персонажа. НЕ «voice leak» / «утечка голоса» (при значении cross-character bleed) |
| **OCEAN** | OCEAN | — | framework | НЕ «Big Five» / «big five» / «Большая пятёрка». Измерения: O/C/E/A/N |
| **O — Openness** | Открытость | O | trait | OCEAN-измерение: креативность, любопытство |
| **C — Conscientiousness** | Добросовестность | C | trait | OCEAN-измерение: организованность, дисциплина |
| **E — Extraversion** | Экстраверсия | E | trait | OCEAN-измерение: общительность, энергия |
| **A — Agreeableness** | Доброжелательность | A | trait | OCEAN-измерение: кооперативность, эмпатия |
| **N — Neuroticism** | Нейротизм | N | trait | OCEAN-измерение: эмоциональная нестабильность |
| **OCEAN Poles** | Полюса OCEAN | — | framework | Экстремальные значения (High/Low) каждого измерения OCEAN |
| **Enneagram** | Эннеаграмма | — | framework | В заголовках/ID/метках/коде — всегда «Enneagram». «эннеаграмма» — только в беглом тексте |
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
| **Lorebook** | Lorebook | LB | parameter | НЕ «лорбук» / «World Info» / «world info» |
| **CoT** | Цепочка рассуждений | CoT | technique | В технических контекстах — всегда CoT. НЕ «цепочка рассуждений» (в техн. конт.) / «Chain of Thought» |
| **Anti-godmoding** | Анти-годмодинг | — | directive | НЕ «анти-годмодинг» / «anti-godmode» / «godmoding protection» |
| **Embodiment Protocol** | Протокол воплощения | — | technique | State→Body→Sensor→Speech. Отличать от Embodiment First (директива). НЕ «протокол воплощения» / «embodiment sequence» |
| **Voice Isolation** | Изоляция голоса | — | technique | НЕ «voice separation» |
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
| **Token Budget** | Бюджет токенов | — | parameter | Распределение токенов контекстного окна по компонентам System Prompt. НЕ «бюджет токенов» / «token budget allocation» |
| **годмодинг** | годмодинг | — | diagnostic | Без перевода |
| **OOC** | OOC | — | diagnostic | Out of Character |
| **Tier** | Уровень | — | classification | Классификация качества |
| **Context** | Контекст | — | technical | Контекстное окно |
| **Poles** | Полюса | — | technical | Полюса OCEAN |
| **Rationale** | Обоснование | — | technical | — |
| **CORE DIRECTIVES** | Основные директивы | CD | directive | Всегда UPPERCASE. Unified directive system in SP. 7 items. English in SP. НЕ «Core Directives» / «core directives» / «ядерные директивы». See `p7a_core_directives` (Part 7A, split в v9.0) |
| **Tone Frame** | Тональный фрейм | TF | technique | Dual-function SP element (~25-30 tokens). English in SP |
| **Spatial & Anatomical Lock** | Пространственная блокировка | — | directive | Prevent teleportation/anatomical errors. English in SP. НЕ «spatial lock» / «анатомический лок» / «spatial and anatomical lock» |
| **Pre-Generation Filter** | Фильтр предгенерации | — | directive | 4-item self-check before response. English in SP. НЕ «Pre-generation filter» / «предгенерационный фильтр» / «pregen filter» |
| **Environmental Reactivity** | Реактивность среды | — | directive | Sensory details only through action. English in SP. НЕ «Environmental reactivity» / «экологическая реактивность» / «реактивность окружения» |
| **Influence Boundary** | Граница влияния | — | directive | React to observable symptoms only. English in SP. НЕ «Influence boundary» / «граница влияния» / «boundary of influence» |
| **Consequence Driven** | Последовательность следствий | — | directive | WANT→NEED shift as Price accumulates. English in SP. НЕ «Consequence driven» / «управляемый последствиями» / «consequences matter» |
| **Show Never Tell** | Показывай, не рассказывай | — | directive | Meta-principle: demonstrate through behavior. English in SP. НЕ «Show never tell» / «показывай не рассказывай» / «show don't tell» |
| **Embodiment First** | Телесность прежде всего | — | directive | State→Body→Sensor→Speech. English in SP. НЕ «Embodiment first» / «воплощение прежде всего» |
| **Immersion Boundary** | Иммерсионная граница | — | technique | Advanced OOC: deny meta-reality |
| **Voice Contamination** | Заражение голоса | — | diagnostic | Copying foreign `<START>` examples breaks voice on 12B |
| **Narrator Bleed** | Утечка рассказчика | — | diagnostic | Mixing narrator voice with character voice in Examples |
| **One Change Rule** | Правило одного изменения | — | diagnostic | Never change >1 parameter at a time when debugging |
| **Nested Anchors** | Вложенные якоря | — | diagnostic | Anchor chains with nested conditions → unpredictability |
| **Lorebook Entry** | Запись Lorebook | LE | technique | A single entry in the Lorebook with Key/Content/Position/Depth/Probability/Cooldown |

---

## Языковая политика (v9.0)

### Основные правила

1. **Русский — основной язык прозы.** Все описательные тексты, рассуждения и пояснения пишутся на русском.
2. **Технические термины — канонический английский.** Все термины из таблицы «Канонические терминологические отображения» используются исключительно в английской канонической форме.
3. **Первое упоминание в рамках Part:** при первом появлении канонического термина внутри Part добавляется русский перевод в скобках.  
   Пример: «Voice (голос) персонажа определяется...»
4. **Последующие упоминания в рамках Part:** используется только английский термин без перевода.  
   Пример: «Voice зависит от выбранных SPINE-элементов...»
5. **Заголовки, метки, data-section ID, кодоподобные контексты:** всегда английский канонический термин. Без исключений.
6. **Русские термины сохраняются** только в естественном беглом тексте, где замена сделала бы фразу неестественной.

### Примеры корректного использования

| Контекст | Правильно | Неправильно |
|----------|-----------|-------------|
| Заголовок раздела | `## CORE DIRECTIVES` | `## Ядерные директивы` |
| Data-section ID | `data-section="identity-block"` | `data-section="блок-идентичности"` |
| Первое упоминание в Part | «CORE DIRECTIVES (основные директивы) управляют...» | «Core Directives управляют...» |
| Последующее упоминание | «...в рамках CORE DIRECTIVES...» | «...в рамках ядерных директив...» |
| Беглый текст (допустимо) | «...эннеаграмма типа 4...» | — (допустимо в беглом тексте) |
| Заголовок / метка | `Enneagram Type 4` | `Эннеаграмма типа 4` |

---

## Правила использования

### 1. Полный перевод
Переводятся полностью:
- Description → Описание
- Examples → Примеры
- Greeting Message → Приветствие (в беглом тексте; в заголовках/метках — Greeting Message)
- Trigger → Триггер
- Action → Действие
- Price → Цена

### 2. Оставить без перевода
Не переводятся (технические термины — всегда каноническая английская форма):
- SPINE, GHOST, GHOST Layers, WANT (Желание), NEED (Потребность), FLAW (Дефект), LIE
- OCEAN, Enneagram, MBTI
- Author's Note (AN), Lorebook (LB)
- CoT, OOC, годмодинг
- Format Lock, 4K-Fallback
- Top P, Min P, Top K
- {{user}}, {{char}}
- CORE DIRECTIVES, Tone Frame, Spatial & Anatomical Lock, Pre-Generation Filter
- Environmental Reactivity, Influence Boundary, Consequence Driven
- Show Never Tell, Embodiment First, Immersion Boundary
- Anti-godmoding, Embodiment Protocol, Identity Block, Token Budget
- Voice, Voice Isolation, Voice Bleed, Behavioral Anchor

### 3. Аббревиатуры
Использовать аббревиатуры после первого упоминания:
- System Prompt → SP
- Author's Note → AN
- Lorebook → LB
- CoT → (уже аббревиатура; не раскрывать как «Chain of Thought»)
- Repetition Penalty → RepPen
- CORE DIRECTIVES → CD
- Tone Frame → TF
- Greeting Message → допустима краткая форма «Greeting» только в беглом тексте

### 4. Первое упоминание
При первом упоминании термина в разделе (Part):
- Добавить русский перевод в скобках
- Пример: «CoT (цепочка рассуждений) — техника...»
- Пример: «AN (Author's Note) — короткая инструкция...»
- Пример: «Voice (голос) персонажа определяется...»
- Последующие упоминания — только английский термин

---

## Запрещённые переводы и устаревшие формы

| Канонический термин | ❌ Неправильно / устаревшее | ✅ Правильно |
|---------------------|----------------------------|--------------|
| System Prompt | системный промпт, System Prompt block, SP block | System Prompt (SP) |
| CORE DIRECTIVES | Core Directives, core directives, ядерные директивы | CORE DIRECTIVES (CD) |
| Environmental Reactivity | Environmental reactivity, экологическая реактивность, реактивность окружения | Environmental Reactivity |
| Embodiment First | Embodiment first, воплощение прежде всего | Embodiment First |
| Influence Boundary | Influence boundary, граница влияния, boundary of influence | Influence Boundary |
| Consequence Driven | Consequence driven, управляемый последствиями, consequences matter | Consequence Driven |
| Pre-Generation Filter | Pre-generation filter, предгенерационный фильтр, pregen filter | Pre-Generation Filter |
| Show Never Tell | Show never tell, показывай не рассказывай, show don't tell | Show Never Tell |
| Spatial & Anatomical Lock | spatial lock, анатомический лок, spatial and anatomical lock | Spatial & Anatomical Lock |
| SPINE | Spine, spine chain, SPINE chain, SPINE-цепочка | SPINE |
| Behavioral Anchor | якорь (в техн. контексте), behavioural anchor, behavior trigger | Behavioral Anchor |
| Voice | голос персонажа, voice profile | Voice |
| Voice Isolation | изоляция голоса (в техн. контексте), voice separation | Voice Isolation |
| Voice Bleed | voice leak, утечка голоса (при cross-character bleed) | Voice Bleed |
| GHOST | призрак (в техн. контексте), ghost layer (ед. ч.) | GHOST |
| GHOST Layers | ghost layers, призрачные слои, 3-tier GHOST | GHOST Layers |
| OCEAN | Big Five, big five, Большая пятёрка | OCEAN |
| Enneagram | (в заголовках/ID) эннеаграмма | Enneagram |
| CoT | цепочка рассуждений (в техн. контексте), Chain of Thought | CoT |
| Lorebook | лорбук, World Info, world info | Lorebook (LB) |
| Anti-godmoding | анти-годмодинг, anti-godmode, godmoding protection | Anti-godmoding |
| Embodiment Protocol | протокол воплощения, embodiment sequence | Embodiment Protocol |
| Identity Block | блок идентичности, identity section | Identity Block |
| Greeting Message | приветствие (в заголовках), greeting, greeting message, первое сообщение | Greeting Message (в заголовках/метках); Greeting (в беглом тексте) |
| Token Budget | бюджет токенов, token budget allocation | Token Budget |
| Author's Note | Авторские заметки, Авторка | Author's Note (AN) |
| Description | Описание персонажа | Описание |
| Character Card | Персонаж | Карточка персонажа |
| WANT | Хочет | Желание |
| NEED | Нуждается, Нужда | Потребность |
| FLAW | Изъян | Дефект |
| Greeting (краткая форма) | Первое сообщение (без Greeting) | Greeting (Приветствие) |
| SP-темперамент | SP-темперамент (без пояснения) | SP (Исследователи) — с пометкой «темперамент Keirsey, не System Prompt» |
| NT | Рационалы (как основное) | Аналитики (основное), Рационалы (альтернатива) |
| NF | Идеалисты (как основное) | Дипломаты (основное), Идеалисты (альтернатива) |
| SP (темперамент) | Ремесленники (как основное) | Исследователи (основное), Ремесленники (альтернатива) |
| Enneagram Type 5 | Наблюдатель (как основное) | Исследователь (основное), Наблюдатель (альтернатива) |
| OCEAN N | Нервозность | Нейротизм |
| OCEAN A | Уживчивость, Согласие | Доброжелательность |

---

## Новые термины (Phase 1)

### Behavioral Anchor: T→A→P Triple
**Behavioral Anchor** — канонический термин для поведенческого якоря. Структура: **Trigger → Action → Price**.  
Отличать от общего русского слова «якорь», которое может использоваться в нетехническом контексте (например, «якорь внимания»). В технических контекстах (заголовки, метки, описания структуры карточки) — всегда **Behavioral Anchor**.

### Embodiment Protocol: State→Body→Sensor→Speech
**Embodiment Protocol** — канонический термин для протокола воплощения. Последовательность: **State → Body → Sensor → Speech**.  
Отличать от **Embodiment First** (это директива CORE DIRECTIVES, а Embodiment Protocol — техника реализации).

### Identity Block
**Identity Block** — секция System Prompt, определяющая, кто персонаж. Включает имя, внешность, предысторию, тип личности и т. д.  
НЕ «блок идентичности» / «identity section».

### Greeting Message
**Greeting Message** — первое сообщение, демонстрирующее Voice, SPINE, Behavioral Anchors в действии.  
В заголовках и метках — всегда **Greeting Message**. В беглом тексте допустима краткая форма **Greeting**.  
НЕ «приветствие» / «первое сообщение» в заголовках/метках.

### Token Budget
**Token Budget** — распределение токенов контекстного окна между компонентами System Prompt (Identity Block, CORE DIRECTIVES, SPINE, Anchors, Examples и т. д.).  
НЕ «бюджет токенов» / «token budget allocation».

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
| Token Budget | Бюджет токенов |
| Identity Block | Блок идентичности |
| Greeting Message | Приветствие |
| Behavioral Anchor | Поведенческий якорь |
| Embodiment Protocol | Протокол воплощения |

---

*Документ подготовлен для проекта Live Character Guide. Версия 9.0.0 — Phase 1.1: Canonical Terminology Mapping. Обновлено 2026-06-23 в iter 3 docs restructure: stale reference `p7_core_directives` → `p7a_core_directives` (v9.0 Part 7 split).*
