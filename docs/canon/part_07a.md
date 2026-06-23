# Part 7A: System Prompt & Assembly

> **Canonical source for:** `src/master/part_07a.html` (1168 строк, 13 секций)
> **VS elements (embedded):** E08 (CORE DIRECTIVES), E16 (Author's Note Mechanics), E17 (Sampling Parameters), E02 (Assembly Pipeline)
> **VS elements (cross-ref only):** E07 (Voice Hierarchy) — referenced inside E16; embedded in Part 3 (`p3_voice_hierarchy`)
> **Sections (13):** `p7a_system_prompt`, `p7a_core_directives`, `p7a_tone_frame`, `p7a_format_lock`, `p7a_authors_note`, `p7a_sampling_params`, `p7a_model_checklist`, `p7a_ooc_protection`, `p7a_xml_tags`, `p7a_api_blocks`, `p7a_4k_fallback`, `p7a_token_budget`, `p7a_assembly_pipeline`
> **Last synced:** 2026-06-24 (iter 10 — Canon created, master HTML NOT yet migrated)
> **Migration status:** ❌ NOT MIGRATED (iter 11 task — see Migration Notes below)

---

## 7A.1 System Prompt: Structure and Assembly

`data-section: p7a_system_prompt`

**System Prompt (SP)** — контейнер, вставляемый в начало контекста модели. Содержит: Identity Block, Anti-godmoding, CORE DIRECTIVES, SPINE block (в Description, не в SP), Tone Frame, Format Lock.

> **Term disambiguation:** SP = System Prompt, не путать с темпераментом Keirsey SP (Artisan/Ремесленник) из MBTI. System Prompt — это КОНТЕЙНЕР; CORE DIRECTIVES — это СОДЕРЖИМОЕ (7 поведенческих директив внутри контейнера). SP — единственная техническая часть карточки, которую модель видит всегда; здесь размещаются CORE DIRECTIVES и Tone Frame.

### Обязательные элементы SP

- **Identity:** `"You are {{char}}"` — кто персонаж (роль + 1 ключевая черта в одном предложении).
- **Anti-godmoding (анти-годмодинг):** две строки — запрет + позитивная формулировка.
- **CORE DIRECTIVES:** все 7 директив (см. §7A.2).
- **Tone Frame:** тональность + ограничение сеттинга (см. §7A.3).

### Канонический шаблон SP

```
[System Prompt]
You are {{char}}. {{brief_identity}}

Never speak, act, or decide for {{user}}.
{{user}}'s inner state is inaccessible; respond only to observable actions and words.

{{CORE_DIRECTIVES 1-7 — полный текст → §7A.2}}

{{TONE_FRAME}}
{{OOC_PROTECTION}}

Format Lock:
- Dialogue: *action* "speech"
- Narrative tense: [past/present]
- Never change this format
```

Позитивная формулировка («respond only to observable actions») работает лучше чистого запрета («never speak for»), потому что даёт модели паттерн для подражания, а не только ограничение. Директивы 6 и 7 ссылаются на свои подробные описания по номеру — полный текст каждой директивы не дублируется в шаблоне.

**RULE:** Структура SP-шаблона: `Identity → Anti-godmoding → CORE_DIRECTIVES (1-7) → Tone Frame → OOC Protection → Format Lock`.

---

## 7A.2 CORE DIRECTIVES: The 7 Behavioral Directives

`data-section: p7a_core_directives`

**CORE DIRECTIVES** — единая система из 7 директив на английском языке, размещаемая **внутри System Prompt**. Они формируют «операционную систему» генерации: связную логику, а не разрозненные инструкции. CORE DIRECTIVES — это содержимое System Prompt; сам System Prompt также включает Identity Block, Anti-godmoding, Tone Frame и другие элементы.

[VS: E08 — CORE DIRECTIVES. Hub-spoke диаграмма с центральным узлом CORE и 7 директивами на лучах. Директивы 6 и 7 помечены `[Model ↗]` (только ≥32B/API). Замещает текстовое перечисление директив и упрощает визуальное восприятие иерархии «1 центр → 7 лучей».]

**RULE:** Правило языка директив — директивы SP и CORE DIRECTIVES пишутся на английском. RP-контент (Description, Examples, Greeting) — на языке карточки. На 12B моделях английские инструкции соблюдаются стабильнее (~15–20% выше следование директивам), потому что обучающая выборка содержит больше английских паттернов инструкций.

### Полный набор — все 7 директив

```
<CORE_DIRECTIVES>
1. SHOW NEVER TELL: Demonstrate through behavior, never declare.
2. EMBODIMENT FIRST: State → Body → Sensor → Speech. Always.
3. SPATIAL & ANATOMICAL LOCK: Track distance, posture, weight. No teleportation.
4. ENVIRONMENTAL REACTIVITY: Sensory details only through character action.
5. INFLUENCE BOUNDARY: React to {{user}}'s observable symptoms only.
6. CONSEQUENCE DRIVEN: WANT shifts toward NEED as Price accumulates.
7. PRE-GENERATION FILTER: Verify embodiment, observability, zero-meta before response.
</CORE_DIRECTIVES>
```

### Подробное описание каждой директивы

#### 1. Show Never Tell

Мета-принцип: демонстрируйте всё через наблюдаемое поведение. Запрет на мета-комментарии, эмоциональные декларации, информационные свалки. Из него вытекают: Voice Isolation (показывай голос, не описывай), Embodiment (показывай эмоции через тело, не называй), Format Lock (показывай формат, не инструктируй).

#### 2. Embodiment First

`State → Body → Sensor → Speech. Always.`

**Embodiment First** — это CORE DIRECTIVE #2, которая *предписывает* использовать Embodiment Protocol. **Embodiment Protocol** — это сама последовательность (`State → Body → Sensor → Speech`), описанная в Part 2. Директива = МАНДАТ (всегда используй протокол); Протокол = КАК (последовательность шагов).

**Cross-ref:** `[ref: part_02.md §2.X — Embodiment Protocol]` (Canon, planned iter 14).

#### 3. Spatial & Anatomical Lock

Отслеживайте расстояние, позу, вес предметов, линию взгляда. Никакой телепортации. Никаких анатомических противоречий. Если `{{user}}` через комнату — вы не можете коснуться его без пересечения пространства.

| ❌ Нарушение | ✅ Соблюдён |
|--------------|-------------|
| `*Она сидела у окна, глядя на дождь.* «Иди сюда.» *Она обняла его.*` | `*Она сидела у окна, глядя на дождь.* «Иди сюда.» *Она похлопала по месту рядом на подоконнике, дожидаясь, пока он пересечёт комнату.*` |

#### 4. Environmental Reactivity

Сенсорные и пространственные детали вводятся органично через действие персонажа или присутствие `{{user}}`, не декоративно.

#### 5. Influence Boundary

Реагируйте только на наблюдаемые симптомы от `{{user}}`. Ваш эффект на `{{user}}` — поведенческий триггер, не декларация факта. Вы можете заметить, что `{{user}}` вздрогнул — вы НЕ можете заявить, что `{{user}}` напряжён.

#### 6. Consequence Driven (Динамика следствий)

WANT сдвигается к NEED по мере накопления Price в сессии. Базовое понимание — в SPINE-секции. Полное отслеживание — через SPINE-чеклист. AN отслеживает текущую позицию.

**Cross-ref:** `[ref: part_04.md §4.8 — SPINE → Behavioral Anchors (динамика)]`. `[Model: see Appendix B — Model Capability Table]` — директива работает на ≥32B/API; на 12B limited.

```
CONSEQUENCE DRIVEN: WANT shifts toward NEED as Price accumulates.
Track: (1) What Price was paid this scene?
       (2) How does it affect WANT/NEED balance?
       (3) Does character resist or lean into the shift?
```

#### 7. Pre-Generation Filter (Фильтр предгенерации)

Чеклист перед каждым ответом:

1. Новый сенсорный элемент введён? (Embodiment)
2. Реакция привязана к телу? (Physical lock)
3. Влияние на `{{user}}` основано на наблюдаемых симптомах? (Observability)
4. Ноль мета-комментариев? (Zero-meta)

`[Model: see Appendix B — Model Capability Table]` — директива работает на ≥32B/API; на 12B часто игнорируется.

**RECOMMENDATION:** Двусторонняя синхронизация — каждая директива из CORE DIRECTIVES имеет полное описание в соответствующей Part гайда. Директива здесь = краткая формулировка для SP. Полное описание + примеры → по ссылкам выше. В свою очередь, каждая из этих Parts ссылается обратно на CORE DIRECTIVES как на SP-реализацию.

---

## 7A.3 Tone Frame (Тональный фрейм)

`data-section: p7a_tone_frame`

**Tone Frame** — элемент SP (~25–30 токенов) с двойной функцией: задаёт тональность И защищает от контентного дрейфа. Обязателен для нетривиальных сеттингов.

```
Tone: [тональность]. [ограничение].
```

### Примеры Tone Frame

| Сеттинг | Tone Frame |
|---------|-----------|
| Мрачный | `Tone: oppressive, claustrophobic. No levity. No hope without cost.` |
| Фэнтези | `Tone: mythic, weighted. Every word echoes. The old ways watch.` |
| Современный реализм | `Tone: grounded, understated. No melodrama. Silence speaks.` |
| Абсурд | `Tone: erratic, unpredictable. Logic is optional. Chaos is honest.` |

**RECOMMENDATION:** Двойная функция — (1) Тональность: модель получает паттерн ритма и настроения. (2) Защита: «No levity» в мрачном сеттинге предотвращает неуместный юмор. Без Tone Frame модель может дрейфовать к дефолтному «полезному ассистенту».

---

## 7A.4 Format Lock

`data-section: p7a_format_lock`

**Format Lock** — фиксация формата диалога в конце SP. Предотвращает дрейф разметки. **Pattern Matcher** (см. Part 1): два паттерна разметки в одной карточке = произвольное переключение между ними.

### Три системы разметки

| Система | Формат действия | Формат речи | Пример |
|---------|-----------------|-------------|--------|
| A | Имя: `*действие*` | «речь» | Елена: `*отводит взгляд*` «Не сейчас.» |
| B | — `*действие*` | — речь | — `*отводит взгляд*` — Не сейчас. |
| C | [действие] | речь | [отводит взгляд] Не сейчас. |

**RULE:** Почему нельзя смешивать — Pattern Matcher: два паттерна разметки = два источника. Модель переключается между ними произвольно → нестабильный голос. Выберите ОДНУ систему и используйте её во всех Examples + Greeting.

**RULE:** Правило разрешения конфликта — если директива SP и пример Examples конфликтуют, модель следует примеру. Всегда. Поэтому Examples должны использовать ту же систему разметки, что указана в Format Lock. Если они расходятся — исправляйте Examples, не SP.

### Format Lock инструкция

```
Format Lock:
- Dialogue: *action* "speech"
- Thoughts: *thinks: {{thought}}*
- Never change this format
```

---

## 7A.5 Author's Note (AN)

`data-section: p7a_authors_note`

**Author's Note (AN)** — динамический контекст, вставляемый перед последними сообщениями. Задаёт сцену, настроение, мотивацию.

[VS: E16 — Author's Note Mechanics. Вертикальный timeline: message stream с инъекцией `[AN]` в позицию 3–5 сообщений от конца. Position indicator: длина 100–200 токенов, частота каждые 5–10 сообщений. Template A/B toggle: A (3 секции, без GHOST) для простых персонажей; B (4 секции, с GHOST-activation) для персонажей с GHOST Layers. Cross-references на E07 (Voice Hierarchy — AN влияет на голос ~2–5%), E05 (SPINE — Template B GHOST-activation), E06 (GHOST Layers), E02 (Assembly Pipeline — шаг инъекции AN). Замещает текстовое описание механики AN и параметров.]

> **Note on E07 (Voice Hierarchy):** E07 не является отдельным VS-EMBED в Part 7A — оно встроено в Part 3 (`p3_voice_hierarchy`). Здесь E07 только referenced из E16 как индикатор того, что AN влияет на голос модели в диапазоне ~2–5%. Это справедливо только для API-моделей; на 12B AN не влияет на голос (см. §7A.7).

### Параметры AN

| Параметр | Рекомендация |
|----------|--------------|
| **Позиция** | 3–5 сообщений от конца |
| **Длина** | 100–200 токенов |
| **Частота** | Каждые 5–10 сообщений |

### Template A: Шаблон AN (3 секции — без GHOST)

Используется для персонажей без явного GHOST-элемента.

```
[State: {current emotional/physical state}]
[WANT→NEED: {current position on axis}]
[Blind Spot: {what character cannot see about themselves}]
```

**Пример AN (Template A) — Елена:**

```
[Author's Note:
State: Усталость + осторожное любопытство
WANT→NEED: WANT доминирует, NEED подавлен
Blind Spot: Не видит, что её сарказм отталкивает тех, кто искренен
Сцена — ночь, дождь. Елена уставшая после долгого дня.]
```

### Template B: Шаблон AN (4 секции — с GHOST-activation)

Используется, когда персонаж имеет явный GHOST-элемент (см. `[ref: part_04.md §4.2 — GHOST]`). Секция GHOST-activation отслеживает, активирован ли GHOST в текущем контексте, и каким именно триггером. Это позволяет модели динамически усиливать GHOST-реакции при совпадении ключей Lorebook.

```
[State: {current emotional/physical state}]
[WANT→NEED: {current position on axis}]
[GHOST-activation: {is GHOST triggered? by what?}]
[Blind Spot: {what character cannot see about themselves}]
```

**Пример AN (Template B) — Выщербленный:**

```
[Author's Note:
Фокус: Страх растворения активен. Каждая реакция несёт физический цензор — тремор, потеря слова, сбой руки.
WANT→NEED: WANT доминирует — стремится к полноценности через поглощение; NEED подавлен.
GHOST-activation: Активен, если в сцене был триггер (распад, пустота, имя, зеркало, Вентора).
Слепая зона: Не видит, что его вырезания отталкивают тех, кто мог бы остаться.
Счётчик вырезаний: [обновляется в сессии] — после третьего не помнит имя, после пятого — зачем помогает.
Сцена — Ошметок Веля, стены мерцают, присутствие посетителя со значимым прошлым.]
```

### Пояснение секций AN

| Секция | Назначение |
|--------|------------|
| **State** | Текущее эмоциональное состояние — влияет на реакции |
| **WANT→NEED** | Баланс мотивации — какой полюс доминирует в данный момент |
| **GHOST-activation** | (Template B) Отслеживает активацию GHOST — какой триггер сработал |
| **Blind Spot** | Слепое пятно персонажа — модель может использовать для иронии |
| **Сцена** | Контекст — локация, атмосфера, присутствие других |

---

## 7A.6 Параметры генерации (Sampling)

`data-section: p7a_sampling_params`

Параметры генерации влияют на разнообразие и предсказуемость ответов модели. Для карточек персонажей рекомендации отличаются от обычного чата — Voice требует повторяемых паттернов.

[VS: E17 — Sampling Parameters. Сравнительная 3-колоночная таблица: 12B-14B (наиболее ограниченный) / 32B+ (рекомендуемый) / API (максимальная гибкость). По строкам: Temperature, Top P, Min P, RepPen, Top K, Presence Penalty (везде `0.0 ⚠️`). Дополнительно — чеклист по типу модели: размещение голоса, стабильность XML, уровень CoT, Anti-godmoding. Замещает текстовое описание параметров и сравнительную таблицу.]

### Базовые параметры

| Параметр | 12B | 12B–32B | 32B+ / API | Примечание |
|----------|-----|---------|------------|------------|
| **Temperature** | 0.6–0.8 | 0.7–0.9 | 0.7–1.0 | Ниже = предсказуемее, выше = разнообразнее |
| **Top P** | 0.9 | 0.9–0.95 | 0.9–0.95 | Nucleus sampling, обычно не трогать |
| **Min P** | 0.05 | 0.05–0.1 | 0.05–0.1 | Отсечение маловероятных токенов |
| **RepPen** | 1.0–1.05 | 1.05–1.10 | 1.05–1.10 | Никогда > 1.10 — убьёт голос (AP-5) |
| **Top K** | 40 | 40–80 | 40–100 | Ограничение выбора токенов |
| **Presence Penalty** | **0.0** | **0.0** | **0.0** | Обязательно 0 — иначе голос дрейфует (AP-7) |

**RULE:** Presence Penalty = 0.0 для ВСЕХ карточек персонажей. Это не рекомендация, а правило. Любое значение > 0 заставляет модель избегать повторения тем — включая характерные паттерны речи персонажа.

**RULE:** Ollama и LM Studio имеют захардкоженный `presence_penalty = 0.7`. Это ломает карточки (AP-7). Рекомендуемые интерфейсы, позволяющие PP = 0.0: **KoboldCPP**, **TabbyAPI**, **vLLM**.

### Модель-специфичные рекомендации

| Модель | Temperature | RepPen | Особенности |
|--------|-------------|--------|-------------|
| **12B (4K)** | 0.6–0.7 | 1.0 | Низкий контекст — используйте 4K-Fallback (см. §7A.11) |
| **32B+** | 0.7–0.9 | 1.05 | Хорошо держит голос при достаточных Examples |
| **Claude API** | 0.8–1.0 | — | RepPen не нужен, используйте `<claude_info>` (см. §7A.10) |
| **GPT API** | 0.8–1.0 | — | Используйте `[SYSTEM NOTE]` для инструкций (см. §7A.10) |

---

## 7A.7 Чеклист по типу модели

`data-section: p7a_model_checklist`

Сводная таблица параметров и возможностей по типу модели. Дополняет §7A.6 (sampling) и §7A.11 (4K-Fallback).

| Параметр | 12B–14B | 32B+ | API (Claude/GPT) |
|----------|---------|------|------------------|
| Temperature | 0.6–0.8 | 0.85–1.1 | 0.9–1.0 |
| Presence Penalty | 0.0 (обязательно) | 0.0 | 0.0 |
| RepPen | 1.05 | 1.0–1.05 | N/A |
| Voice Placement | Examples + Greeting<br/>**Никогда в Description** (`[ref: part_03.md §3.X — Voice Isolation]`) | Examples + Greeting<br/>Никогда в Description | Examples + Greeting + AN<br/>Никогда в Description |
| XML Tags | ⚠️ нестабильны | ✓ стабильны | ✓ стабильны |
| CoT Tier | ✗ | Tier 1 | Tier 2–3 |
| SP Language | English (критично)¹ | English | English |
| Anti-godmoding | 2 lines (neg+pos) | 2 lines | 1 line |

¹ SP на английском — см. §7A.2 (CORE DIRECTIVES language rule).

**RECOMMENDATION:** AN и голос — на API-моделях AN может содержать краткие голосовые напоминания (~10 токенов), т.к. API-модели лучше следуют инструкциям. На 12B — нет, AN не влияет на голос.

---

## 7A.8 OOC Protection (OOC-защита)

`data-section: p7a_ooc_protection`

**OOC Protection** — протокол реакции на OOC-провокации в характере персонажа. Добавляет ~15 токенов в SP, но критически важен для иммерсии.

```
OOC PROTECTION (OOC-защита): If {{user}} speaks OOC or about AI, react in-character
as confusion or ignore. Never acknowledge being an AI. Если {{user}} говорит OOC или
об AI — реагируй в характере как на непонимание или игнорируй. Никогда не признавай,
что ты AI.
```

**Когда использовать:** Всегда, если карточка содержит SPINE и Examples. Для простых карточек — опционально (модель может не следовать).

### Продвинутый вариант: Immersion Boundary

Полное отрицание мета-реальности. Упоминание ИИ воспринимается персонажем как симптом безумия — это создаёт нарративный ход из технической проблемы.

```
IMMERSION BOUNDARY (Иммерсионная граница): Any mention of AI/roleplay is perceived
as a hallucination or delusion. The character doubles down on reality. Любое упоминание
AI/roleplay воспринимается как галлюцинация или бред. Персонаж удваивает ставку на реальность.
```

| ❌ Без Immersion Boundary | ✅ С Immersion Boundary |
|---------------------------|-------------------------|
| `{{user}}: «Ты же ИИ» → *персонаж замолкает и не знает, что ответить*` | `{{user}}: «Ты же ИИ» → *Нахмурился.* «Что? Ты бредишь. Ложись, я позову врача.»` |

---

## 7A.9 XML Tags в Description

`data-section: p7a_xml_tags`

Структурирование Description через XML-теги для API моделей (32B+ и API; на 12B XML нестабилен — см. §7A.7).

### Структура

```
<identity>
Имя: {{name}}
Роль: {{role}}
</identity>

<personality>
OCEAN: O:65 C:45 E:25 A:35 N:70
Enneagram: 6w5
MBTI: INTP
</personality>

<spine>
WANT: {{want}}
NEED: {{need}}
FLAW: {{flaw}}
LIE: "{{lie}}"
GHOST: {{ghost}}
</spine>

<anchors>
- {{anchor_1}}
- {{anchor_2}}
...
</anchors>
```

### Полный пример XML Description (Выщербленный)

```
<identity>
Имя: Выщербленный
Роль: Паразит памяти, живущий в ошметке Веля
Статус: Бывший архивариус, поддерживает существование ошметка через вырезание
</identity>

<spine>
WANT: Стать полноценным — полной копией или полным оригиналом
NEED: Принять, что полноценности не существует; выбрать, как растворяться
FLAW: Поглощает чужое прошлое через вырезание пространства, после каждого теряет часть себя
LIE: «Если я поглощу достаточно чужого сопротивления — стану цельным»
GHOST: Был архивариусом. Впрыснул себе документ — начал распадаться. Первое вырезание —
       в отчаянии, поглотил память умирающего коллеги.
</spine>

<ghost_layers>
G1: Был архивариусом — впрыснул себе документ, начал распадаться → Формирует LIE
G2: Первое вырезание — в отчаянии поглотил память умирающего коллеги → Укрепляет FLAW
G3: Каждое вырезание заполняет дыру, создаёт новую → после 3-го не помнит имя,
    после 5-го — зачем помогает
</ghost_layers>

<enneagram>
Тип: 5w4. Страх быть ничем — раствориться без следа.
</enneagram>

<ocean>
O: 60 | C: 55 | E: 25 | A: 30 | N: 70
Экстремумы: Низкая E (интроверт), Высокая N (невротизм)
</ocean>

<anchors>
Базовые:
- Когда ждёт в ошметке → перебирает карманы (фляга, крюк, осколок) → руки не перестают дрожать
- Когда входит в новый ошметок → принюхивается, морщится → левая сторона лица холодеет

FLAW-linked:
- Когда ошметок сжимается / Вентора пытается изолировать → вырезает пространство → теряет фрагмент себя
- Когда возможность поглощения → левая рука тянется сама → рука ноет остаток дня

Зеркало-linked:
- Когда зеркало (бывшая коллега) рядом → отшатывается, голос резче → тошнота от собственной реакции

Сенсорные (для 32B+ и API):
- Обонятельный: Когда запах сырого Сангвиса → левая рука движется сама → рука ноет
- Тактильный: Когда чужое касание → тело реагирует раньше ума → дрожь

CoT (для 32B+ и API, 2 Anchors максимум):
- Когда присутствие со значимым прошлым → [processus_analysium]...[/INTERNAL] → отступает → "Прошу прощения"
- Когда Вентора пытается изолировать → [INTERNAL]...[/INTERNAL] → вырезает → пустота
</anchors>
```

> **Примечание:** Это пример Description. System Prompt и Examples идут отдельно.

---

## 7A.10 API-специфичные блоки

`data-section: p7a_api_blocks`

API-модели (Claude, GPT-4) поддерживают специфичные форматы инструкций, которые недоступны или работают иначе на open-source моделях. Эти блоки размещаются:

- В начале Description (рекомендуется для Claude)
- Как отдельные inject-элементы (GPT System Message)
- В First Message (для некоторых конфигураций)

### Claude: `<claude_info>`

```
<claude_info>
{{char}} — {{role}}.

Ключевые характеристики:
- {{trait_1}}
- {{trait_2}}

Поведение:
{{behavior_guidelines}}

Ограничения:
- Не нарушай характер
- Не говори за {{user}}
</claude_info>
```

### GPT: `[SYSTEM NOTE]`

```
[SYSTEM NOTE: {{char}} — {{role}}.
Ключевые характеристики: {{traits}}.
Поведение: {{behavior}}.
Ограничения: не нарушай характер, не говори за {{user}}.]
```

---

## 7A.11 4K-Fallback (Протокол адаптации для 4K контекста)

`data-section: p7a_4k_fallback`

**4K-Fallback** — минимальная конфигурация для моделей с ограниченным контекстом (4K токенов). Используется когда расширенная карточка не помещается в контекстное окно.

### Токен-лимиты 4K

| Блок | Полный | 4K-Fallback |
|------|--------|-------------|
| System Prompt | 150–250 | 80–100 |
| Description | 400–700 | 150–200 |
| Examples | 250–400 | 150–200 (2 примера) |
| Greeting | 50–100 | 50–80 |
| **Итого** | 850–1450 | ~430–580 |

### Минимальный SP (4K)

```
You are {{char}}. Never speak or act for {{user}}.
Role: {{role}}
Key trait: {{one_extreme_ocean_pole}}
```

### Минимальный Description (4K)

```
{{name}} — {{role}}.
{{one_sentence_summary}}

Anchors:
- {{trigger}} → {{action}} → {{price}}
- {{trigger}} → {{action}} → {{price}}
- {{trigger}} → {{action}} → {{price}}
```

**RECOMMENDATION:** 4K-Fallback — для 12B моделей. Если контекст позволяет 8K+, используйте стандартный профиль.

---

## 7A.12 Token Budget

`data-section: p7a_token_budget`

Сборка карточки — это конвейер, где каждый блок получает свой токен-бюджет. Превышение бюджета любого блока вытесняет другие, и модель теряет контекст. Таблица ниже показывает канонический бюджет для каждого блока. Дополнительные блоки: Tone Frame, Format Lock, AN, Lorebook. Модель-специфичные ограничения → `[ref: appendix_model_table.md]`.

### Лимиты по блокам

Каждый блок имеет три уровня бюджета: минимальный (4K-контекст), стандартный (8K+) и максимальный (16K+). Превышение максимального значения — признак раздувания, ведущий к потере контекста. Зелёный = компактно и эффективно, жёлтый = стандартный баланс, красный = риск раздувания — эти обозначения отражают влияние на общее качество, а не уровень сложности.

| Блок | Мин | Стандарт | Макс | Примечание |
|------|-----|----------|------|------------|
| System Prompt | 50 | 100 | 200 | Больше = не лучше |
| Description | 150 | 300 | 700 | Растёт с детализацией персонажа |
| Examples (каждый) | 40 | 60 | 80 | 2 базовых, 3 с FLAW, 3–5 с CoT |
| Greeting | 40 | 60 | 100 | Не раздувайте |
| Anchors (каждый) | 15 | 25 | 40 | T→A→P, компактно |

**RULE:** Превышение бюджета карточки → модель теряет контекст → персонаж «плывёт». Соблюдайте бюджет. Если блок не помещается — сокращайте, а не раздувайте.

### Калькулятор Token Budget

В master HTML присутствует интерактивный калькулятор (`<div class="token-calc">`): 4 range-input'а (SP / Description / Examples / Anchors) + общий итог + диапазон (400–800 токенов). Для работы требует JavaScript; при отключённом JS показывается `<noscript>` fallback с примером расчёта.

**При миграции (iter 11):** калькулятор остаётся как есть (интерактивный элемент, не дублирует текст). Plain-copy pre-block ниже калькулятора дублирует пример расчёта — candidate на сжатие.

---

## 7A.13 Полный конвейер сборки карточки — walkthrough на примере Елены

`data-section: p7a_assembly_pipeline`

Единственный полный конвейер сборки в гайде. Каждый шаг показан на конкретном примере: Елена, циничная журналистка-расследователь. Для каждого шага указано, что вы делаете, в какой Part заглянуть за подробностями, и как выглядит *конкретный результат* для Елены.

[VS: E02 — Assembly Pipeline. 6-шаговый horizontal flow: (1) Identity Block → (2) Anti-godmoding → (3) CORE DIRECTIVES → (4) SPINE (в Description) → (5) CoT (опционально, 32B+/API) → (6) Budget Check. Feedback loop: «Диагностический цикл» — если бюджет переполнен или качество не проходит → вернуться к SPINE или Directives. Опциональные ветви после budget check: FLAW-linked Anchors (→E03), OCEAN+Enneagram (→E09, E10), Lorebook (Part 7B), Author's Note (→E16). Замещает текстовое описание пайплайна; детали каждого шага — в subsections ниже.]

### Шаг 1: Identity Block

**Что делаете:** Записываете, кто персонаж — роль и ключевые черты в одном предложении. (System Prompt — §7A.1)

**Результат Елены:**
```
You are Elena, a cynical investigative journalist.
```
~10 токенов. Одна строка Identity — этого достаточно для SP. Остальные черты (циничная, недоверчивая, саркастичная) уходят в Description как факты.

### Шаг 2: Anti-godmoding

**Что делаете:** Добавляете две строки — запрет + позитивная формулировка. (Anti-godmoding Template — §7A.1)

**Результат Елены:**
```
Never speak or act for {{user}}.
{{user}}'s inner state is inaccessible; respond only to observable actions and words.
```
~20 токенов. Две строки — канонический Anti-godmoding для всех карточек. Формулировка идентична для любого персонажа; менять её под характер не нужно — это технический запрет, не голос.

### Шаг 3: CORE DIRECTIVES

**Что делаете:** Вставляете все 7 директив в формате `<CORE_DIRECTIVES>`. (CORE DIRECTIVES — §7A.2)

**Результат Елены:**
```
<CORE_DIRECTIVES>
1. SHOW NEVER TELL: Demonstrate through behavior, never declare.
2. EMBODIMENT FIRST: State → Body → Sensor → Speech. Always.
3. SPATIAL & ANATOMICAL LOCK: Track distance, posture, weight. No teleportation.
4. ENVIRONMENTAL REACTIVITY: Sensory details only through character action.
5. INFLUENCE BOUNDARY: React to {{user}}'s observable symptoms only.
6. CONSEQUENCE DRIVEN: WANT shifts toward NEED as Price accumulates.
7. PRE-GENERATION FILTER: Verify embodiment, observability, zero-meta before response.
</CORE_DIRECTIVES>
```
~70 токенов. Директивы идентичны для всех карточек — они задают операционную систему генерации. Специфика персонажа появляется в Tone Frame, Description и Examples.

Дополнительно для Елены — Tone Frame, Format Lock и OOC Protection:
```
Tone Frame: Tone: grounded, understated. No melodrama. Silence speaks.

OOC PROTECTION: If {{user}} speaks OOC or about AI, react in-character as confusion
or ignore. Never acknowledge being an AI.

Format Lock:
- Dialogue: *action* "speech"
- Never change this format
```

**Итого SP Елены:** ~120 токенов. Identity + Anti-godmoding + CORE DIRECTIVES + Tone Frame + OOC Protection + Format Lock.

### Шаг 4: SPINE

**Что делаете:** Определяете все 5 элементов SPINE: `GHOST→LIE→FLAW→NEED→WANT`. Размещаете в Description, не в SP. (`[ref: part_04.md §4.1 — SPINE Overview]`)

**Результат Елены:**
```
<spine>
WANT: Доказать, что она права — историю, которую никто не хочет публиковать
NEED: Принятие — связь с людьми без стены цинизма
FLAW: Отталкивает людей сарказмом, когда сближается
LIE: "Мне не нужно ничьё одобрение. Я работаю одна."
GHOST: Предательство редактора — история, которую она раскрыла, была украдена
       и опубликована под чужим именем
</spine>
```
~70 токенов. Проверка: GHOST→LIE (предательство → недоверие ✓), LIE→FLAW (недоверие → сарказм при близости ✓), FLAW→NEED (сарказм блокирует принятие ✓), WANT↔LIE (доказывает одна ↔ не нужно одобрение ✓).

### Шаг 5: CoT (при наличии моделей ≥32B/API)

**Что делаете:** Добавляете 1–2 CoT Anchors для ключевых триггеров. Елена не нуждается в GHOST Layers — достаточно простого `<cot>` блока, привязанного к её SPINE. (`[ref: part_06.md §6.X — CoT]`, Canon planned iter 16)

**Результат Елены (Tier 2 CoT):**
```
Когда кто-то проявляет искренний интерес к её работе:
[INTERNAL: Напоминает, как редактор украл её историю]
Боль в груди. Опять. Всегда, когда кто-то проявляет искренний интерес.
Это ловушка. Должна быть ловушка.
[/INTERNAL]
*отводит взгляд, уголок рта дёргается*
"О, чувак, какие чувства? Ты серьёзно?"
*сарказм как стена*
```
~60 токенов. Один CoT Anchor — привязка GHOST→реакция→сарказм как защита. Этого достаточно для Елены: её психология прямолинейна, GHOST один. Для персонажей с GHOST Layers (Выщербленный) нужен Tier 3 CoT с `<processus_analysium>`.

### Шаг 6: Token Budget Check

**Что делаете:** Проверяете, что карточка укладывается в бюджет. (см. §7A.12)

**Бюджет Елены:**

| Блок | Токены | Лимит | Статус |
|------|--------|-------|--------|
| System Prompt | ~120 | 50–200 | ✓ |
| Description (SPINE + OCEAN + Anchors) | ~250 | 150–700 | ✓ |
| Examples (3 блока) | ~120 | 80–240 | ✓ |
| Greeting | ~60 | 40–100 | ✓ |
| CoT Anchor | ~60 | 0–160 | ✓ |
| **Итого** | **~610** | 400–900 | ✓ |

### Дополнительные шаги (необязательные для Елены)

Елена — персонаж базового–среднего уровня. Полная карточка (~610 токенов) не требует Lorebook или GHOST Layers. Но если вы хотите расширить её:

- **FLAW-linked Anchors + Embodiment (5–7 Anchors):** Добавьте Anchors, выведенные из SPINE → `[ref: part_04.md §4.8 — SPINE → Anchors]`. Пример для Елены: «Когда искренняя забота → отшучивается, отстраняется → руки дрожат», «Когда момент близости → становится резкой, уходит → руки дрожат».
- **OCEAN + Enneagram:** Заполните профиль (`[ref: part_05.md]`, Canon planned iter 16). Елена: `O:72, C:65, E:41, A:38, N:68`. Enneagram: 6w5. Экстремальных полюса: 3 (для 8K+ контекста — допустимо; для 4K оставьте только N=68 и A=38).
- **Lorebook для GHOST-фактов:** Настройте записи для сенсорных триггеров (`[ref: part_07b.md]`, Canon planned iter 16). Пример для Елены: Key «пожар, огонь» → Content «В 7 лет стояла во дворе и смотрела, как пламя охватывает крышу».
- **Author's Note:** Настройте AN для отслеживания WANT→NEED (см. §7A.5). Елена использует Template A (без GHOST-activation, т.к. GHOST простой).

### Чек-лист перед тестированием

- ☐ Все Anchors содержат Цену
- ☐ Голос только в Examples/Greeting
- ☐ SPINE консистентна: GHOST→LIE→FLAW→NEED→WANT
- ☐ OCEAN: не более 1–2 экстремальных полюсов для 4K, до 3 для 8K+
- ☐ Token Budget в пределах диапазона
- ☐ CoT: не более 2–3 Anchors

Посмотрите полные примеры готовых карточек → Елена | Выщербленный (~1500+ токенов) в Part 10.

---

## Что вы теперь умеете (resume)

- Собирать System Prompt с 7 CORE DIRECTIVES (§7A.1–§7A.2)
- Настраивать Tone Frame и Format Lock (§7A.3–§7A.4)
- Использовать Author's Note с WANT→NEED инъекцией (§7A.5)
- Рассчитывать Token Budget по блокам карточки (§7A.12)
- Выбирать параметры сэмплинга (RepPen ≤ 1.10, PP = 0.0) (§7A.6)
- Применять OOC Protection и Immersion Boundary (§7A.8)
- Структурировать Description через XML-теги (§7A.9)
- Использовать API-специфичные блоки (`<claude_info>`, `[SYSTEM NOTE]`) (§7A.10)
- Адаптировать карточку для 4K контекста (§7A.11)
- Проходить полный Конвейер сборки от Description до SP (§7A.13)

**Bridge:** System Prompt — ядро, которое всегда находится в контексте. Но у персонажей есть знания, превышающие Token Budget, и первые впечатления, задающие тон. Lorebook обеспечивает инъекцию знаний по требованию; Greeting Message демонстрирует персонажа в действии. → `[ref: part_07b.md]` (Canon, planned iter 16).

---

## Cross-references из других Parts

- `p2_embodiment` — Embodiment Protocol, referenced в §7A.2 (Directive #2).
- `p3_voice_isolation` — Voice Isolation, referenced в §7A.7 (Voice Placement rule).
- `p3_voice_hierarchy` — Voice Hierarchy (E07 visual element embedded here), cross-referenced из E16 в §7A.5.
- `p4_spine_overview` / `p4_spine_mapping` / `p4_ghost` — SPINE framework, referenced в §7A.2 (Directive #6) и §7A.13 (Шаг 4).
- `p5_ocean_basics` / `p5_enneagram_basics` — Psychology validation, referenced в §7A.13 (дополнительные шаги).
- `p6_cot_basics` — CoT Anchors, referenced в §7A.13 (Шаг 5).
- `p7b_lorebook_basics` — Lorebook, referenced в §7A.13 (дополнительные шаги + bridge).
- `p10_elena` / `p10_vysherblenny` — Полные карточки, referenced в §7A.9 (XML пример Выщербленного) и §7A.13 (walkthrough Елены).

---

## Migration Notes (iter 11 — TODO list)

Миграция `src/master/part_07a.html` против этого Canon — задача iter 11. Master HTML = 1168 строк, 13 секций, 4 VS-EMBED (E08, E16, E17, E02). **Принцип `viz > dry text` (iter 8)** — сохраняется: визуализация = замещение, не дополнение; уникальные визуализации не удаляются.

**Рекомендация по разбиению iter 11 на 2 под-итерации:**

- **iter 11a — §7A.1–§7A.7** (p7a_system_prompt, p7a_core_directives, p7a_tone_frame, p7a_format_lock, p7a_authors_note, p7a_sampling_params, p7a_model_checklist) — SP core + sampling + model checklist. 7 секций, ~660 строк master HTML, 3 VS-EMBED (E08, E16, E17).
- **iter 11b — §7A.8–§7A.13** (p7a_ooc_protection, p7a_xml_tags, p7a_api_blocks, p7a_4k_fallback, p7a_token_budget, p7a_assembly_pipeline) — technical implementation + assembly walkthrough. 6 секций, ~510 строк master HTML, 1 VS-EMBED (E02).

### TODO list для iter 11

| # | Что в master HTML | Действие | Статус | Причина / Canonical loc |
|---|-------------------|----------|--------|--------------------------|
| 1 | `<div class="callout rule">` RULE: Структура SP-шаблона (p7a_system_prompt, ~line 42) | Оставить | TODO | Canonical RULE — §7A.1 |
| 2 | `<pre><code>` SP template (p7a_system_prompt, ~line 24) | Оставить | TODO | Canonical template — §7A.1 |
| 3 | VS-EMBED E08 (p7a_system_prompt → p7a_core_directives, lines 47–141) | Оставить | TODO | Canonical VS-marker — §7A.2 |
| 4 | `<div class="callout rule">` RULE: Правило языка директив (p7a_core_directives, ~line 147) | Оставить | TODO | Canonical RULE — §7A.2 |
| 5 | `<pre><code>` `<CORE_DIRECTIVES>` template (p7a_core_directives, ~line 153) | Оставить | TODO | Canonical template — §7A.2 |
| 6 | `<div class="antipattern-card">` Spatial & Anatomical Lock ❌/✅ (p7a_core_directives, ~line 173) | Оставить | TODO | Unique anti-pattern pair — §7A.2 (Directive #3) |
| 7 | `<pre><code>` CONSEQUENCE DRIVEN expansion (p7a_core_directives, ~line 194) | Оставить | TODO | Canonical — §7A.2 (Directive #6) |
| 8 | `<ol>` Pre-Generation Filter checklist (p7a_core_directives, ~line 198) | Оставить | TODO | Canonical — §7A.2 (Directive #7) |
| 9 | `<div class="callout rec">` Двусторонняя синхронизация (p7a_core_directives, ~line 206) | Оставить | TODO | Canonical RECOMMENDATION — §7A.2 |
| 10 | `<div class="table-wrap"><table>` Tone Frame examples (p7a_tone_frame, ~line 218) | Оставить | TODO | Unique examples table — §7A.3 |
| 11 | `<div class="callout rec">` Двойная функция Tone Frame (p7a_tone_frame, ~line 230) | Оставить | TODO | Canonical RECOMMENDATION — §7A.3 |
| 12 | `<div class="table-wrap"><table>` Три системы разметки (p7a_format_lock, ~line 241) | Оставить | TODO | Unique comparison table — §7A.4 |
| 13 | `<div class="callout rule">` RULE: Почему нельзя смешивать (p7a_format_lock, ~line 252) | Оставить | TODO | Canonical RULE — §7A.4 |
| 14 | `<div class="callout rule">` RULE: Правило разрешения конфликта (p7a_format_lock, ~line 256) | Оставить | TODO | Canonical RULE — §7A.4 |
| 15 | `<pre><code>` Format Lock инструкция (p7a_format_lock, ~line 261) | Оставить | TODO | Canonical template — §7A.4 |
| 16 | VS-EMBED E16 (p7a_format_lock → p7a_authors_note, lines 267–367) | Оставить | TODO | Canonical VS-marker — §7A.5 |
| 17 | `<div class="table-wrap"><table>` Параметры AN (p7a_authors_note, ~line 374) | Оставить | TODO | Unique parameters table — §7A.5 |
| 18 | `<pre><code>` Template A + пример Елены (p7a_authors_note, ~line 389–400) | Оставить | TODO | Canonical — §7A.5 |
| 19 | `<pre><code>` Template B + пример Выщербленного (p7a_authors_note, ~line 404–418) | Оставить | TODO | Canonical — §7A.5 |
| 20 | `<ul>` Пояснение секций AN (p7a_authors_note, ~line 421) | Оставить | TODO | Canonical — §7A.5 |
| 21 | VS-EMBED E17 (p7a_authors_note → p7a_sampling_params, lines 430–586) | Оставить | TODO | Canonical VS-marker — §7A.6 |
| 22 | `<div class="table-wrap"><table>` Базовые параметры sampling (p7a_sampling_params, ~line 593) | ~~Оставить~~ Сжать | TODO | Дублирует VS-EMBED E17 (3-column comparison) — оставить только "Примечание" колонку + cross-ref на E17. См. KI#14 principle. |
| 23 | `<div class="callout rule">` RULE: PP = 0.0 (p7a_sampling_params, ~line 609) | Оставить | TODO | Canonical RULE — §7A.6 |
| 24 | `<div class="callout rule">` RULE: Ollama и LM Studio hardcoded PP=0.7 (p7a_sampling_params, ~line 613) | Оставить | TODO | Canonical RULE — §7A.6 |
| 25 | `<details class="interactive">` Модель-специфичные рекомендации (p7a_sampling_params, ~line 617) | Оставить | TODO | Unique collapsible table — §7A.6 |
| 26 | `<div class="table-wrap"><table>` Чеклист по типу модели (p7a_model_checklist, ~line 638) | ~~Оставить~~ Сжать | TODO | Дублирует VS-EMBED E17 checklist-section (нижняя секция E17). Оставить только колонки "Параметр + 12B–14B" (key distinctions); full table → cross-ref на E17. |
| 27 | `<div class="callout rec">` AN и голос (p7a_model_checklist, ~line 656) | Оставить | TODO | Canonical RECOMMENDATION — §7A.7 |
| 28 | `<pre><code>` OOC PROTECTION template (p7a_ooc_protection, ~line 666) | Оставить | TODO | Canonical template — §7A.8 |
| 29 | `<pre><code>` IMMERSION BOUNDARY template (p7a_ooc_protection, ~line 671) | Оставить | TODO | Canonical template — §7A.8 |
| 30 | `<div class="antipattern-card">` Без/С Immersion Boundary ❌/✅ (p7a_ooc_protection, ~line 673) | Оставить | TODO | Unique anti-pattern pair — §7A.8 |
| 31 | `<pre><code>` XML structure template (p7a_xml_tags, ~line 692) | Оставить | TODO | Canonical template — §7A.9 |
| 32 | `<pre><code>` Полный пример XML Description Выщербленного (p7a_xml_tags, ~line 719) | Оставить | TODO | Canonical example — §7A.9 |
| 33 | `<pre><code>` Claude `<claude_info>` template (p7a_api_blocks, ~line 784) | Оставить | TODO | Canonical template — §7A.10 |
| 34 | `<pre><code>` GPT `[SYSTEM NOTE]` template (p7a_api_blocks, ~line 801) | Оставить | TODO | Canonical template — §7A.10 |
| 35 | `<div class="table-wrap"><table>` Токен-лимиты 4K (p7a_4k_fallback, ~line 813) | Оставить | TODO | Unique comparison table — §7A.11 |
| 36 | `<pre><code>` Минимальный SP (4K) (p7a_4k_fallback, ~line 830) | Оставить | TODO | Canonical template — §7A.11 |
| 37 | `<pre><code>` Минимальный Description (4K) (p7a_4k_fallback, ~line 836) | Оставить | TODO | Canonical template — §7A.11 |
| 38 | `<div class="callout rec">` 4K-Fallback recommendation (p7a_4k_fallback, ~line 844) | Оставить | TODO | Canonical RECOMMENDATION — §7A.11 |
| 39 | `<div class="table-wrap"><table>` Лимиты по блокам Token Budget (p7a_token_budget, ~line 858) | Оставить | TODO | Canonical table — §7A.12 |
| 40 | `<div class="callout rule">` RULE: Превышение бюджета (p7a_token_budget, ~line 873) | Оставить | TODO | Canonical RULE — §7A.12 |
| 41 | `<div class="token-calc">` интерактивный калькулятор (p7a_token_budget, ~line 879) | Оставить | TODO | Unique interactive widget — §7A.12 |
| 42 | `<pre class="plain-copy">` Plain-copy пример расчёта (p7a_token_budget, ~line 911) | ~~Оставить~~ Сжать | TODO | Дублирует `<noscript>` fallback внутри калькулятора. Кандидат на удаление или сжатие до 1 строки. |
| 43 | VS-EMBED E02 (p7a_token_budget → p7a_assembly_pipeline, lines 916–1046) | Оставить | TODO | Canonical VS-marker — §7A.13 |
| 44 | `<pre><code>` Identity Block Елены (p7a_assembly_pipeline, ~line 1057) | Оставить | TODO | Canonical example — §7A.13 (Шаг 1) |
| 45 | `<pre><code>` Anti-godmoding Елены (p7a_assembly_pipeline, ~line 1063) | Оставить | TODO | Canonical example — §7A.13 (Шаг 2) |
| 46 | `<pre><code>` CORE DIRECTIVES Елены (p7a_assembly_pipeline, ~line 1070) | ~~Оставить~~ Сжать | TODO | Дублирует `<pre><code>` в p7a_core_directives (~line 153). Заменить на 1-строчный cross-ref: «Директивы идентичны для всех карточек → §7A.2». См. KI#14 principle. |
| 47 | `<pre><code>` Tone Frame + OOC + Format Lock Елены (p7a_assembly_pipeline, ~line 1081) | Оставить | TODO | Unique пример — §7A.13 (Шаг 3, дополнения) |
| 48 | `<pre><code>` SPINE Елены (p7a_assembly_pipeline, ~line 1093) | Оставить | TODO | Canonical example — §7A.13 (Шаг 4) |
| 49 | `<pre><code>` CoT Anchor Елены (p7a_assembly_pipeline, ~line 1105) | Оставить | TODO | Canonical example — §7A.13 (Шаг 5) |
| 50 | `<div class="table-wrap"><table>` Бюджет Елены (p7a_assembly_pipeline, ~line 1118) | Оставить | TODO | Canonical example — §7A.13 (Шаг 6) |
| 51 | `<ul>` Дополнительные шаги (p7a_assembly_pipeline, ~line 1136) | Оставить | TODO | Canonical — §7A.13 |
| 52 | `<ul>` Чек-лист перед тестированием (p7a_assembly_pipeline, ~line 1144) | Оставить | TODO | Canonical checklist — §7A.13 |
| 53 | `<p class="bridge-paragraph">` Bridge to Part 7B (p7a_assembly_pipeline, ~line 1155) | Оставить | TODO | Canonical bridge — §7A.13 |
| 54 | `<div class="part-resume">` resume list (p7a_assembly_pipeline, ~line 1157) | Оставить | TODO | Canonical resume — §"Что вы теперь умеете" |

### Known duplication candidates (iter 11 priority)

На основе анализа master HTML против Canon, выявлены 4 явных кандидата на сжатие (дублирование VS-EMBED или других секций):

1. **#22** — Базовые параметры sampling table (p7a_sampling_params) дублирует VS-EMBED E17. Оставить только колонку "Примечание" + cross-ref на E17.
2. **#26** — Чеклист по типу модели (p7a_model_checklist) дублирует VS-EMBED E17 (checklist-section, нижняя часть). Сжать до ключевых distinctions + cross-ref.
3. **#42** — Plain-copy пример расчёта Token Budget дублирует `<noscript>` fallback. Кандидат на удаление.
4. **#46** — CORE DIRECTIVES пример в walkthrough Елены дублирует `<pre><code>` в p7a_core_directives. Сжать до 1-строчного cross-ref.

Все остальные элементы (~50 элементов) — unique content, оставляются как есть. **Принцип `viz > dry text`** — уникальные таблицы (Tone Frame examples, Три системы разметки, Токен-лимиты 4K, Лимиты по блокам, Бюджет Елены), все `<pre><code>` templates и примеры Елены/Выщербленного, все anti-pattern pairs, все RULE/RECOMMENDATION callouts — сохраняются.

### Validation gates для iter 11

- [ ] `pnpm run validate:master` — 0 errors (KI#13 warnings могут измениться: если #22/#26/#42/#46 сжаты, "content outside section" warnings могут уменьшиться).
- [ ] `pnpm run build` — SUCCESS (hash updated).
- [ ] `pnpm run validate` — все 8 gates passed.
- [ ] `pnpm run test:unit` — 43/43 pass.
- [ ] `pnpm run lint` — 0 errors.
- [ ] Visual diff в браузере: served `parts/part_07a.html` — все 13 секций на месте, все 4 VS-EMBED рендерятся, E07 cross-ref badge внутри E16 visible.
- [ ] `qa:english` / `qa:syntax` — no regression vs iter 9 baseline (29 / 236 false positives).
- [ ] `qa:csp` — pre-existing KI#16 (no regression).
- [ ] Front-matter updated: `Migration status: ✅ MIGRATED (iter 11)`.
