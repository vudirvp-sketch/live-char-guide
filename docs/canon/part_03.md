# Part 3: Voice and Isolation (Голос и изоляция)

> **Canonical source for:** `src/master/part_03.html` (452 → 452 строк, 8 секций)
> **VS elements (embedded):** E07 (Voice Influence Hierarchy)
> **Sections (8):** `p3_voice_isolation`, `p3_influence_hierarchy`, `p3_examples_rules`, `p3_examples_quality`, `p3_greeting_ref`, `p3_voice_leak`, `p3_joker_case`, `p3_multi_char`
> **Last synced:** 2026-06-24 (iter 14 — Canon created + master HTML migrated)
> **Migration status:** ✅ MIGRATED (iter 14)

---

[VS: E07 — Voice Influence Hierarchy. Сгруппированная столбчатая диаграмма влияния различных блоков карточки на голос персонажа для 3 классов моделей (12B / 32B+ / API). 6 строк (Недавний чат / Examples / Greeting / Author's Note / Description / System Prompt) с разделённой осью: верхняя часть — Недавний чат на сжатой шкале (~75–85% доминация), нижняя часть — источники карточки на увеличенной шкале. Description на 12B помечен ✕ 0% ЗАПРЕЩЕНО. Замещает текстовое объяснение иерархии влияния. Inset-box «Хранилище vs Влияние» объясняет разницу между тем, где голос записан, и тем, что формирует поведение модели.]

**Назначение Part 3:** ввести Voice Isolation — правило разделения Voice (голос) и описания. Voice задаётся ТОЛЬКО в Examples и Greeting, никогда в Description. Здесь же — иерархия влияния источников на голос, правила написания Examples, система уровней качества Examples, Voice Leak (утечка голоса), мульти-персонажные примеры.

---

## 3.1 Voice Isolation (изоляция голоса)

`data-section: p3_voice_isolation`

**Voice Isolation** — правило разделения Voice (голос) и описания. Voice задаётся ТОЛЬКО в Examples и Greeting, никогда в Description.

**Не объясняй голос — покажи его.** Голос = ритм + лексика + синтаксис + парадоксы. Ни один из этих компонентов не описывается прилагательными — только демонстрируется через Examples.

| Сообщения в сессии | Без Voice Isolation | С Voice Isolation |
|--------------------|---------------------|-------------------|
| 1–5 | Голос стабилен | Голос стабилен |
| 10–15 | Начинает дрейфовать к дефолту | Стабилен |
| 20–30 | ~40% отклонение от исходного тона | ~10% отклонение |
| 40+ | Голос заменён дефолтным ассистентом | Голос сохраняет ядро |

**RULE:** Модель — копировщик паттернов, не исполнитель инструкций. Если вы напишете в Description «говорит саркастично» — модель это проигнорирует. Но если в Examples персонаж говорит саркастично — модель скопирует стиль.

---

## 3.2 Иерархия влияния на голос

`data-section: p3_influence_hierarchy`

Не все части карточки влияют на голос одинаково. Иерархия зависит от размера модели:

[VS: E07 — Voice Influence Hierarchy. См. маркер в preamble. Замещает текстовое описание иерархии.]

| Источник | 12B | 32B+ | API |
|----------|-----|------|-----|
| Recent chat | ~85% | ~80% | ~75% |
| Examples | ~10% | ~12% | ~15% |
| Greeting | ~3% | ~5% | ~5% |
| Author's Note | ~2% | ~3% | ~5% |
| **Description** | **0% (ЗАПРЕЩЕНО)** | ~3% | ~5% |
| System Prompt | 0% | ~1% | ~2% |

**RULE:** Для 12B: Description = 0% влияния на голос. Правило голоса: стилистические директивы в Description — ошибка сборки. Токены, потраченные на голос в Description — потеряны или вредят.

**EXAMPLE:**

```
WRONG (Voice in Description):
Description: "Елена говорит с сарказмом, использует слово 'чувак', короткие фразы"

CORRECT (Voice in Examples):
Description: "Елена — журналист, циничный, недоверчивый."

Example:
<START>
Она закатила глаза. "О, чувак, ещё один гений."
```

Голос — только первый шаг. Далее — правила написания Examples и Greeting.

---

## 3.3 Правила написания Examples

`data-section: p3_examples_rules`

Правила Examples определяют, как модель считывает Voice из диалоговых примеров.

**RULE:** Заражение голоса (Voice Contamination): Никогда не копируйте Examples из чужих карточек. Чужой ритм и разметка ломают голос на 12B. Каждый `<START>`-блок пишите с нуля под вашего персонажа.

### Рекомендуемое количество примеров

| Количество | Типы |
|------------|------|
| 2 | Нейтральный, Стресс |
| 3 | + Доверие/рост |
| 3-5 | + Мульти-персонаж |

### Структура каждого Example

- **Длина:** 80-120 токенов (40-80 минимально), одна сцена, одно состояние.
- **Обязательно:** `<START>` в начале каждого блока.
- **Стиль:** Должен совпадать с Greeting.
- **Телесность:** Минимум одна физическая реакция на блок.

**RULE:** Тег `<START>` обязателен для каждого Example. Это маркер начала нового диалогового блока. Без него модель не распознаёт границы паттернов и может смешивать разные Examples — Voice дрейфует, а паттерны из одного Example «утекают» в другой.

### Формат Examples (TEMPLATE)

```
<START>
{{сцена}} — где мы, что происходит (1-2 предложения)
{{действие}} — что делает персонаж
{{реплика}} — что он говорит
```

---

## 3.4 Система уровней качества Examples

`data-section: p3_examples_quality`

Система оценки качества Examples по 6 критериям. Три критерия оценивают сами Examples, три — карточку в целом, но проявляются они через Examples.

| Критерий | Tier 1 (✓) | Tier 2 (⚠) | Tier 3 (✗) | Относится к |
|----------|-----------|-----------|-----------|-------------|
| **Голос** | Уникальный, узнаваемый | Узнаваем, но с чужими паттернами | Генерический, без характера | Examples |
| **Телесность** | Физическая реакция в каждом | Есть, но не всегда | Отсутствует | Карточка в целом |
| **Anchor Price** | Видимая, физическая | Абстрактная | Нет | Behavioral Anchors (Part 2) |
| **FLAW проявление** | Видно в поведении | Упомянуто, но не действует | Нет | SPINE (Part 4) |
| **Разнообразие** | Разные эмоции = разный голос | Монотонный | Клон | Examples |
| **Длина** | 2-4 абзаца, плотные | Слишком длинные/короткие | Неподходящие | Examples |

**RECOMMENDATION:** Критерии «Телесность», «Anchor Price» и «FLAW проявление» оценивают карточку в целом, но проявляются через Examples. Если Example не показывает Anchor Price — проблема может быть in the Anchor, а не в Example.

### До/После: Tier 1 vs Tier 3

| Tier 3 (плохо) | Tier 1 (хорошо) |
|----------------|------------------|
| «Она почувствовала грусть и сказала ему об этом.» *(Генерический голос, нет телесности, нет Anchor Price, нет FLAW-проявления.)* | *Она отложила чашку и посмотрела в окно. Дождь барабанил по стеклу.* «Опять. Третий день подряд.» *(Уникальный голос, физическая реакция, наблюдаемое действие, конкретная деталь.)* |

---

## 3.5 Greeting Message

`data-section: p3_greeting_ref`

**Greeting Message** — начальное сообщение персонажа. Задаёт место, время и тон. Полный алгоритм написания Greeting (Sensory Anchor → тело FLAW → реплика → крючок), пример Елены и правила длины → `[ref: part_07b.md §7B.X — Greeting Message]` (Canon planned iter 16).

---

## 3.6 Voice Leak (Утечка голоса)

`data-section: p3_voice_leak`

**Voice Leak** — ошибка, при которой модель генерирует голос, не соответствующий персонажу. Чаще всего — «красноречивый персонаж», который должен говорить просто.

### Варианты утечки голоса

| Тип | Описание | Пример |
|-----|----------|--------|
| Voice Leak | Описание голоса в Description вместо демонстрации в Examples | «Говорит тихо и задумчиво» в Description |
| Narrator Bleed | Голос рассказчика смешивается с голосом персонажа в Examples | «Комната была в беспорядке, что говорило о борьбе» |

### Пример: Narrator Bleed vs Voice

| ❌ НЕВЕРНО — Narrator Bleed | ✅ ВЕРНО — Voice (голос) |
|------------------------------|------------------------------|
| `*Комната была в беспорядке, что говорило о произошедшей борьбе. Кресло стояло опрокинутое.*` | `*Она переступила через опрокинутое кресло. Взгляд зацепился за осколки.* «…Пошли.»` |

### До/После: Voice Leak (Выщербленный)

| Утечка голоса (Voice Leak) | Исправлено (голос изолирован) |
|----------------------------|-------------------------------|
| «Я не могу... Я не могу это делать, yo. Просто... заткнись об этом, ладно?» *пинает половицу, отводит взгляд* *(Сленг, обрывистые фразы — модельный дефолтный голос, не Выщербленный. Формальная и архивная лексика утрачена.)* | «Прошу прощения. Я... не должен.» *отступает на шаг, пальцы касаются виска* *левая рука дрожит* *(Формальная лексика, процессный язык, «прошу прощения» — голос Выщербленного восстановлен.)* |

### Причины Voice Leak

- Недостаточно Examples с правильным голосом.
- Examples слишком короткие.
- Голос в Description, не в Examples.
- Модель слишком «умная» для персонажа (32B для простого характера).

**Cross-ref:** При мульти-персонажном взаимодействии возникает Voice Bleed — анти-паттерн AP-11, при котором голоса персонажей смешиваются → `[ref: part_08.md §8.12 — AP-11 Voice Bleed]`.

---

## 3.7 Крайний случай: голос, не поддающийся описанию

`data-section: p3_joker_case`

Некоторые персонажи сопротивляются описанию голоса. Это не слабость карточки — это свойство архетипа. Хаотичные, непредсказуемые персонажи, чей голос = ритм + парадокс + непредсказуемость, не описываются прилагательными — «нестабильный» описывает тысячу персонажей.

**RULE:** Если вы не можете описать Voice в 3-4 Voice-маркерах — не описывайте его. Демонстрируйте исключительно через Examples. Модель УЧИТСЯ паузам, цепочкам действие→речь, абсурдности — но только из примеров.

**Практический тест:** если после трёх попыток описать голос маркерами каждый маркер описывает ещё хотя бы 100 других персонажей — переходите к чистой демонстрации. Examples становятся единственным носителем голоса, а Description содержит только факты.

**Cross-ref:** Мульти-персонажное взаимодействие и продвинутые техники голоса → `[ref: §3.8 — Мульти-персонажные примеры]`.

---

## 3.8 Мульти-персонажные примеры

`data-section: p3_multi_char`

**Мульти-персонажность** — техника написания Examples для сцен с несколькими персонажами. Требует явного различения голосов через маркеры персонажа.

### Маркеры персонажа

Маркер персонажа — уникальная характеристика голоса, которая делает персонажа узнаваемым в мульти-персонажной сцене. Минимум 3 маркера на каждого персонажа.

| Персонаж | Маркер 1 | Маркер 2 | Маркер 3 |
|----------|----------|----------|----------|
| **Выщербленный** | Архивная терминология, XML-теги | Формальные паузы, «прошу прощения» | Обрыв при эмоциях |
| **Йоуёма** | Неологизмы, поэтические фрагменты | Поток сознания, эллипсы | Эмоциональные развороты |

### Voice Bleed — Переплетение голосов

Voice Bleed — ошибка, при которой голоса персонажей смешиваются в мульти-персонажной сцене. Модель начинает генерировать реплики одного персонажа в стиле другого.

**EXAMPLE (ОШИБКА):**

```
Выщербленный: "О, чувак, эта память такая... странная, да?"
*чешет затылок*

Йоуёма: "Прошу прощения, но данный фрагмент требует
архивной обработки категории 7Б."

(Выщербленный говорит как Йоуёма, а Йоуёма — как Выщербленный. Голоса перепутались.)
```

**EXAMPLE (ПРАВИЛЬНО):**

```
Выщербленный: "Данный фрагмент... требует анализа."
*пауза, пальцы касаются виска*
"Прошу прощения. Я... не должен."

Йоуёма: "А память-то течёт, как река наоборот, и я — я просто...
как это... ну, плыву? Нет. Тону? Тоже нет. Парю!"
*вздыхает, глаза блестят*

(Каждый персонаж говорит своим голосом. Маркеры сохранены.)
```

### Пример мульти-персонажной сцены

```
<START>
*Ошметок Веля. Стены мерцают. Выщербленный стоит у стены, пальцы перебирают осколки зеркала. Йоуёма сидит на выступе, болтая ногами в пустоту.*

Выщербленный: "Присутствие чужого прошлого обнаружено. Категория: значимое."
*он даже не поворачивается — взгляд прикован к осколкам*
"Рекомендую дистанцию."

Йоуёма: "Дистанция — это просто... пространство между двумя «сейчас», и если ты не здесь, то где? А если где, то... о, красиво!"
*она всё-таки спрыгивает с выступа, подбирается ближе*

Выщербленный: *резко оборачивается, голос падает до формального шёпота* "Йоуёма."
*пауза, в которой он забывает, что хотел сказать*
"Не приближайся. Это... не рекомендуется."
```

**Bridge:** Якоря и Voice (голос) управляют поверхностным поведением. Но поверхностное поведение без психологической глубины создаёт неконсистентных персонажей — добрых в одной сцене, жестоких в следующей, без внутренней логики. SPINE предоставляет эту логику: причинную цепочку от формирующей травмы к текущему желанию → `[ref: part_04.md §4.1 — SPINE Overview]`.

### Что вы теперь умеете

- Применять правило Voice Isolation: голос только в Examples и Greeting.
- Понимать иерархию влияния: SP > Description > Examples > Greeting.
- Писать Examples, демонстрирующие голос персонажа.
- Обнаруживать и исправлять Voice Leak и Narrator Bleed.
- Работать с мульти-персонажными Examples (Character Markers).

---

## Cross-references из других Parts

- `p2_basic_anchors` — Behavioral Anchors, referenced в §3.4 (Anchor Price критерий).
- `p4_spine_overview` — SPINE, referenced в §3.8 bridge.
- `p4_flaw` — FLAW, referenced в §3.4 (FLAW проявление критерий).
- `p7b_greeting` — Greeting Message, referenced в §3.5 (Canon planned iter 16).
- `p8_ap11_voice_bleed` — AP-11 Voice Bleed, referenced в §3.6 (Cross-ref).
- `p9_basic_checklist` — Diagnostics checklist, references p3 (Examples checks).
- `p9_symptom_table` — Symptom table, references p3 (Voice Isolation, Examples Rules).
- `p9_decision_tree` — Decision tree, references p3 (Voice Leak, Examples count).
- `p10_elena` — Elena full card (Canon planned iter 16).
- `p10_vyshcherblenny` — Vyshcherblenny full card (Canon planned iter 16).

---

## Migration Notes (iter 14 — applied 2026-06-24)

Миграция `src/master/part_03.html` против этого Canon выполнена в iter 14. Результат: 452 → 452 строк (0, ~0%). Build PASS, validate:master PASS, qa без регрессий.

**Принцип применённый:** `viz > dry text` (iter 8) — визуализация = замещение, не дополнение; уникальные визуализации не удаляются. Применяется «очень деликатно».

**Результат миграции:** Part 3 не имеет кандидатов на сжатие. Все секции содержат уникальный контент: 5 таблиц с уникальными данными (Voice Isolation drift, Influence Hierarchy, Examples count, Tier Quality 6 критериев, Voice Leak variants, Character Markers), 4 RULE callouts, 2 RECOMMENDATION/EXAMPLE callouts, 2 diff-view (Tier 1 vs Tier 3, Voice Leak до/после), 2 ILLUSTRATION `<pre><code>` blocks (multi-char scene + Voice Bleed examples), 1 TEMPLATE pre (Examples format). Контент плотный, дубликатов не найдено — `<pre class="plain-copy">` блоки (Tier Quality + Voice Leak до/после) являются accessibility-fallback для diff-view визуализаций (не для VS-EMBED), сохранены как part of existing pattern.

| # | Что в master HTML | Действие | Статус | Причина / Canonical loc |
|---|-------------------|----------|--------|--------------------------|
| 1 | VS-EMBED E07 (Voice Influence Hierarchy grouped bar chart + Storage vs Influence inset) | Оставить | DONE | Canonical VS-marker — preamble Part 3 |
| 2 | `<section data-section="p3_voice_isolation">` h2 + intro + 4-row drift table + RULE callout | Оставить | DONE | Canonical Voice Isolation — §3.1 |
| 3 | `<section data-section="p3_influence_hierarchy">` h3 + intro + 6-row Influence Hierarchy table + RULE callout + EXAMPLE callout (WRONG vs CORRECT Description) | Оставить | DONE | Canonical Influence Hierarchy — §3.2 |
| 4 | `<section data-section="p3_examples_rules">` h3 + intro + RULE callout (Voice Contamination) + 3-row count table + structure list + RULE callout (<START> requirement) + TEMPLATE pre | Оставить | DONE | Canonical Examples Rules — §3.3 |
| 5 | `<section data-section="p3_examples_quality">` h3 + intro + 6-row Tier Quality table + RECOMMENDATION callout + ILLUSTRATION diff-view (Tier 1 vs Tier 3) + plain-copy fallback | Оставить | DONE | Unique Tier Quality system — §3.4 |
| 6 | `<section data-section="p3_greeting_ref">` h3 + cross-ref paragraph | Оставить | DONE | Canonical cross-ref — §3.5 |
| 7 | `<section data-section="p3_voice_leak">` h3 + intro + 2-row variants table + antipattern-card (Narrator Bleed vs Voice) + ILLUSTRATION diff-view (Voice Leak до/после Выщербленный) + plain-copy fallback + 4-item causes list + Cross-ref to AP-11 | Оставить | DONE | Unique Voice Leak variants + before/after — §3.6 |
| 8 | `<section data-section="p3_joker_case">` h3 + 2 paragraphs + RULE callout + practical test paragraph + Cross-ref | Оставить | DONE | Unique Joker Case rule — §3.7 |
| 9 | `<section data-section="p3_multi_char">` h3 + intro + Character Markers paragraph + 2-row markers table + Voice Bleed paragraph + 2 EXAMPLE callouts (ОШИБКА + ПРАВИЛЬНО) + ILLUSTRATION `<pre><code>` multi-char scene + bridge paragraph + part-resume list | Оставить | DONE | Unique multi-char examples + Character Markers — §3.8 |

### Compression results (iter 14)

0 кандидатов на сжатие. Part 3 — плотный контент без дубликатов. Все 9 секций сохранены без изменений.

Итого: 452 → 452 строк (0, ~0%). Принцип `viz > dry text` — все уникальные таблицы, RULE/RECOMMENDATION/EXAMPLE callouts, diff-view blocks, multi-char examples сохранены. `<pre class="plain-copy">` блоки (2 шт.) — accessibility-fallback для diff-view визуализаций, не дубликаты VS-EMBED, сохранены как часть существующего паттерна.

### Validation gates (iter 14 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, baseline warnings (= KI#13 baseline, no regression).
- [x] `pnpm run build` — SUCCESS.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — pass.
- [x] `pnpm run lint` — 0 errors.
- [x] Front-matter updated: `Migration status: ✅ MIGRATED (iter 14)`.
