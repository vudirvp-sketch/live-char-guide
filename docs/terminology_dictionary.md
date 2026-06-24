# Терминологический словарь Live Character Guide

**Версия:** 9.1.0
**Дата:** 2026-06-24 (iter 18 — cleanup)
**Источник правды:** `docs/canon/*.md` (определения) + этот файл (canonical forms + language policy)

---

## 1. Канонические формы терминов

Каноническая форма — единственная допустимая в заголовках, метках, `data-section` ID и кодоподобных контекстах. В беглом тексте допускается русский эквивалент при первом упоминании в рамках Part.

| Канонический термин | Аббр. | ❌ Запрещённые формы | Категория |
|---------------------|-------|---------------------|-----------|
| **System Prompt** | SP | системный промпт, System Prompt block, SP block | parameter |
| **CORE DIRECTIVES** | CD | Core Directives, ядерные директивы | directive |
| **Environmental Reactivity** | — | Environmental reactivity, экологическая реактивность, реактивность окружения | directive |
| **Embodiment First** | — | Embodiment first, воплощение прежде всего | directive |
| **Influence Boundary** | — | Influence boundary, граница влияния, boundary of influence | directive |
| **Consequence Driven** | — | Consequence driven, управляемый последствиями, consequences matter | directive |
| **Pre-Generation Filter** | — | Pre-generation filter, предгенерационный фильтр, pregen filter | directive |
| **Show Never Tell** | — | Show never tell, показывай не рассказывай, show don't tell | directive |
| **Spatial & Anatomical Lock** | — | spatial lock, анатомический лок, spatial and anatomical lock | directive |
| **SPINE** | — | Spine, spine chain, SPINE chain, SPINE-цепочка | framework |
| **GHOST** | — | призрак (в техн. контексте), ghost layer (ед. ч.) | framework |
| **GHOST Layers** | — | ghost layers, призрачные слои, 3-tier GHOST | framework |
| **WANT** | — | Хочет (как глоссарийный термин) | framework |
| **NEED** | — | Нуждается, Нужда | framework |
| **FLAW** | — | Изъян (как глоссарийный термин) | framework |
| **LIE** | — | ложная установка (в техн. контексте) | framework |
| **Behavioral Anchor** | — | якорь (в техн. конт.), behavioural anchor, behavior trigger | structure |
| **Voice** | — | голос персонажа, voice profile | framework |
| **Voice Isolation** | — | изоляция голоса (в техн. конт.), voice separation | technique |
| **Voice Bleed** | — | voice leak, утечка голоса (при cross-character bleed) | diagnostic |
| **OCEAN** | — | Big Five, big five, Большая пятёрка | framework |
| **Enneagram** | — | эннеаграмма (в заголовках/ID/метках) | framework |
| **MBTI** | — | Myers-Briggs (без перевода) | framework |
| **CoT** | CoT | цепочка рассуждений (в техн. конт.), Chain of Thought | technique |
| **Lorebook** | LB | лорбук, World Info, world info | parameter |
| **Author's Note** | AN | Авторские заметки, Авторка | parameter |
| **Token Budget** | — | бюджет токенов, token budget allocation | parameter |
| **Anti-godmoding** | — | анти-годмодинг, anti-godmode, godmoding protection | directive |
| **Embodiment Protocol** | — | протокол воплощения, embodiment sequence | technique |
| **Identity Block** | — | блок идентичности, identity section | structure |
| **Greeting Message** | — | приветствие (в заголовках/метках), первое сообщение | structure |
| **Format Lock** | — | (без перевода) | technique |
| **Structured Inject** | — | структурированная инъекция | technique |
| **4K-Fallback** | — | (без перевода) | technique |
| **Repetition Penalty** | RepPen | штраф за повторы | parameter |
| **Presence Penalty** | — | штраф за присутствие | parameter |
| **Top P / Min P / Top K** | — | (без перевода) | parameter |
| **OOC** | OOC | out of character | diagnostic |

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

## 6. Языковая политика

### Основные правила

1. **Русский — основной язык прозы.** Все описательные тексты на русском.
2. **Технические термины — канонический английский.** Из таблицы §1 — только английская каноническая форма.
3. **Первое упоминание в Part:** добавить русский перевод в скобках. Пример: «Voice (голос) персонажа определяется...»
4. **Последующие упоминания в Part:** только английский термин без перевода.
5. **Заголовки, метки, `data-section` ID, код:** всегда английский канонический термин. Без исключений.
6. **Русские термины** сохраняются только в естественном беглом тексте, где замена сделала бы фразу неестественной.

### Примеры

| Контекст | ✅ Правильно | ❌ Неправильно |
|----------|--------------|----------------|
| Заголовок | `## CORE DIRECTIVES` | `## Ядерные директивы` |
| `data-section` ID | `data-section="identity-block"` | `data-section="блок-идентичности"` |
| Первое упоминание | «CORE DIRECTIVES (основные директивы) управляют...» | «Core Directives управляют...» |
| Последующее | «...в рамках CORE DIRECTIVES...» | «...в рамках ядерных директив...» |
| Беглый текст | «...эннеаграмма типа 4...» | — (допустимо) |
| Заголовок/метка | `Enneagram Type 4` | `Эннеаграмма типа 4` |

### Аббревиатуры (после первого упоминания)

- System Prompt → **SP**
- Author's Note → **AN**
- Lorebook → **LB**
- CoT → (уже аббр.; не раскрывать как «Chain of Thought»)
- Repetition Penalty → **RepPen**
- CORE DIRECTIVES → **CD**
- Tone Frame → **TF**
- Greeting Message → допустима краткая форма «Greeting» только в беглом тексте

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
| Embodiment Protocol | Протокол воплощения |

---

## 8. Глоссарий (определения)

Полные определения всех терминов — в `docs/canon/appendix_glossary.md` (27 entries, алфавитный указатель). Этот файл задаёт **canonical forms + language policy**; Appendix C Canon задаёт **deep definitions + cross-refs**.

---

*Источник правды: `docs/canon/*.md`. Updated 2026-06-24 iter 18 — cleanup: deduplicated tables, removed stale v9.0 history, merged «Запрещённые переводы» into §1 canonical forms, consolidated MBTI/Enneagram/OCEAN references.*
