---
canonical_for: data/glossary.json (generated machine layer)
vs_embedded: none
vs_cross_ref: none
sections: —
last_synced: —
migration_status: v2 canonical term record (iter 133)
---

# Glossary Registry — канонический реестр терминов (v2)

> **Canonical source for:** `data/glossary.json` — генерируется скриптом `scripts/generate_glossary.mjs` (первая стадия `pnpm run build`); сгенерированный файл никогда не правится руками.
> **Runtime-поверхности:** панель глоссария (`src/shell/lazy-loader.js`) · no-JS страница (`scripts/build-unified.mjs` → `parts/glossary.html`).
> **Замещает (миграция):** `docs/canon/appendix_glossary.md` (замороженный v1-источник, 25 статей) и правившийся руками `data/glossary.json` (55 терминов) — диспозиции: `docs/research/migration_map_v2.md` §5.1 (DEC-17/DEC-18).
> **Создан:** iter 133 (2026-09-14). **Статей:** 45 (25 объединённых канонических + 20 продвинутых терминов машинного слоя).

## Registry pattern (релокация entry-паттерна v1-приложения — migration_map_v2 C-1)

Каждая статья реестра следует единому шаблону:

```
### Head (глава статьи)

**Head** — определение (один абзац).

→ `[ref: part_NN.md §X.Y — Title]`
→ `[meta: sources=…; lang=ru|en; home=<section id>; xrefs=…; abbr=…; aliases=…; deprecated=…; prohibited=…]`
```

- **Head-форма (DEC-16 / DEC-17a, ратифицировано DEC-18):** русская голова там, где существует естественный прямой перевод («Ложь (LIE)», «Бюджет токенов (Token Budget)»); английский остаётся только как технический идентификатор — имена SP-элементов, card fields, XML/API/параметры, протоколы, акронимы фреймворков («System Prompt / SP (системный промпт)», «Format Lock (фиксация формата)»). Класс головы кодируется полем `lang` (`ru` — русская глава, `en` — идентификатор).
- **Sources:** миграционная provenance (C-n / T-nn из `migration_map_v2.md` §5.1) — контроль полноты покрывает `scripts/audit_glossary_parity.py` (26 C-строк + 55 T-строк = 45 статей).
- **Определение** — русский проза-текст; английские фрагменты внутри — только идентификаторы и предписанный промпт-контент (в кавычках «…»).
- **Порядок статей:** латинский блок, затем кириллический (сортировка по голове).

→ `[meta: sources=C-1]`

---

### 4K-Fallback (протокол адаптации для 4K)

**4K-Fallback (протокол адаптации для 4K)** — протокол адаптации карточки для моделей с ограничением контекста ~4096 токенов.

→ `[ref: part_07a.md §7A.11 — 4K-Fallback (Протокол адаптации для 4K контекста)]`
→ `[meta: sources=T-01; lang=en; home=p7a_4k_fallback; aliases=4K-Fallback, 4K Fallback, 4096 fallback, Протокол адаптации]`

### Author's Note (AN)

**Author's Note (AN)** — заметка автора: динамический слой контекста для длинных сессий; обновляется каждые 3–5 сообщений. Используется для полного отслеживания WANT→NEED (директива #6) и живого контекста сцены.

→ `[ref: part_07a.md §7A.5 — Заметка автора (Author's Note, AN)]`
→ `[meta: sources=T-04; lang=en; home=p7a_authors_note; xrefs=p7b_structured_inject; aliases=AN, Author Note, Authors Notes, Author's Note, Динамический контекст; deprecated=Авторские заметки, Авторка, Авторка Заметки; prohibited=Авторские заметки, Авторка, Авторка Заметки]`

### CoT (цепочка рассуждений)

**CoT (цепочка рассуждений)** — система рассуждений внутри карточки, направляющая модель через SPINE-осознанные решения: пошаговый внутренний процесс, который модель воспроизводит перед генерацией ответа. Четыре уровня сложности: Tier 0 (без отдельного CoT-блока) — Tier 3 (полный XML-процесс для API). Не более 2–3 CoT-якорей на карточку.

→ `[ref: part_06.md §6.2 — Основы CoT]`
→ `[meta: sources=C-4+T-09; lang=en; home=p6_cot_basics; xrefs=p6_cot_tiers; aliases=CoT, Chain of Thought, Цепочка рассуждений, цепочка рассуждений; deprecated=цепочка рассуждений, Chain of Thought]`

### Description (блок описания)

**Description (блок описания)** — блок карточки с фактами, SPINE, якорями и OCEAN; не содержит голосовых директив — лингвистический голос задаётся только в Examples/Greeting (Voice Isolation), физическая характеристика голоса допустима как часть Embodiment.

→ `[ref: part_01.md §1.2 — Базовые блоки карточки]`
→ `[meta: sources=T-10; lang=en; home=p1_card_overview; xrefs=p4_spine_overview; aliases=Description, Character Description, Описание, Описание персонажа; deprecated=Описание персонажа; prohibited=Описание персонажа]`

### Examples (примеры диалогов)

**Examples (примеры диалогов)** — примеры диалогов, задающие Voice через демонстрацию. Единственное место для лингвистических голосовых паттернов (вместе с Greeting Message) — иерархия влияния §3.2; правила написания — §3.3.

→ `[ref: part_03.md §3.2 — Иерархия влияния на голос]`
→ `[meta: sources=T-15; lang=en; home=p3_influence_hierarchy; xrefs=p1_card_overview, p3_examples_rules; aliases=Examples, Dialogue Examples, Примеры, Примеры диалогов; prohibited=Примерные сообщения]`

### Format Lock (фиксация формата)

**Format Lock (фиксация формата)** — фиксация формата диалога в конце SP; предотвращает дрейф разметки. Все Examples и Greeting Message должны использовать одну систему разметки.

→ `[ref: part_07a.md §7A.4 — Фиксация формата (Format Lock)]`
→ `[meta: sources=T-17; lang=en; home=p7a_format_lock; xrefs=p7a_system_prompt; aliases=Format Lock, Фиксация формата]`

### MBTI (типология Майерс-Бриггс)

**MBTI (типология Майерс-Бриггс)** — типология из 16 типов на основе 4 осей (E/I, S/N, T/F, J/P). Для создания карточки рекомендуется OCEAN (полюса → якоря) и Enneagram (тип → SPINE); MBTI дополняет понимание, но не имеет прямого маппинга на SPINE. Доступна как справочный инструмент в Appendix A.

→ `[ref: appendix_mbti.md §A.1 — MBTI: 4 оси и 16 типов]`
→ `[meta: sources=C-15+T-27; lang=en; home=appendix_mbti; aliases=MBTI, Myers-Briggs, 16 типов, Типология Майерс-Бриггс]`

### OCEAN (Большая пятёрка)

**OCEAN (Большая пятёрка)** — модель личности: Openness (Открытость), Conscientiousness (Добросовестность), Extraversion (Экстраверсия), Agreeableness (Доброжелательность), Neuroticism (Нейротизм). Используется для проверки внутренней консистентности персонажа и дополнения SPINE. Золотое правило: только 1–2 экстремальных полюса (значения <30 или >70). В карточке размещается в Description как тег `<ocean>` с числовыми значениями, не нарративным описанием черт (принцип #3, §1.4).

→ `[ref: part_05.md §5.1 — OCEAN: 5 измерений личности]`
→ `[meta: sources=C-17+T-31; lang=en; home=p5_ocean_basics; aliases=OCEAN, Ocean; deprecated=Big Five, big five]`

### OOC (вне образа)

**OOC (вне образа)** — Out of Character: выход персонажа из образа (модель отвечает как ассистент, ломает тон, признаёт «игру»). Базовая защита — OOC Protection (§7A.8); диагностика — Part 9.

→ `[ref: part_07a.md §7A.8 — OOC-защита (OOC Protection)]`
→ `[meta: sources=T-33; lang=en; home=p7a_ooc_protection; xrefs=p9_basic_checklist; aliases=OOC, Out of Character, Вне образа]`

### Presence Penalty (PP)

**Presence Penalty (PP)** — параметр генерации, штрафующий повторение тем. Для карточек персонажей — обязательно 0.0 (анти-паттерн AP-7): ненулевой PP вызывает дрейф голоса.

→ `[ref: part_07a.md §7A.6 — Параметры генерации (сэмплирование)]`
→ `[meta: sources=T-36; lang=en; home=p7a_sampling_params; aliases=Presence Penalty, PP, Штраф за присутствие]`

### RepPen (Repetition Penalty)

**RepPen (Repetition Penalty)** — параметр сэмплирования, штрафующий повторение токенов. Канонический диапазон — таблица §7A.6; превышение 1.10 — анти-паттерн AP-5 (потеря фирменных речевых оборотов).

→ `[ref: part_07a.md §7A.6 — Параметры генерации (сэмплирование)]`
→ `[meta: sources=T-39; lang=en; home=p7a_sampling_params; xrefs=p8_ap5_reppen_high; aliases=RepPen, Repetition Penalty, Штраф за повторы]`

### SPINE (позвоночник)

**SPINE (позвоночник)** — 5-элементная причинно-следственная цепочка: GHOST → LIE → FLAW → NEED → WANT. SPINE даёт якорям причину существовать, а не быть набором случайных правил; каждый элемент = наблюдаемая единица, не абстрактный ярлык. Для простых персонажей GHOST и LIE могут быть неявными, но при использовании полной цепочки она должна быть логически связана.

→ `[ref: part_04.md §4.1 — Обзор SPINE]`
→ `[meta: sources=C-18+T-44; lang=en; home=p4_spine_overview; xrefs=p4_spine_mapping; aliases=SPINE, Мотивационное ядро; deprecated=Spine, spine chain, SPINE chain, SPINE-цепочка]`

### S·P (MBTI-темперамент)

**S·P (MBTI-темперамент)** — Sensing-Perceiving: темперамент Keirsey (ISTP, ISFP, ESTP, ESFP). Не путать с System Prompt (SP); в гайде обозначается S·P для различения.

→ `[ref: appendix_mbti.md §A.1 — MBTI: 4 оси и 16 типов]`
→ `[meta: sources=T-42; lang=en; home=appendix_mbti; xrefs=p1_core_rules; aliases=SP (MBTI), Sensing-Perceiving, S·P, Исследователи (MBTI), Ремесленники]`

### System Prompt / SP (системный промпт)

**System Prompt / SP (системный промпт)** — контейнер, вставляемый в начало контекста. Содержит: Identity Block, Anti-godmoding, CORE DIRECTIVES, блок SPINE, Tone Frame, Format Lock, OOC Protection. System Prompt — это КОНТЕЙНЕР; CORE DIRECTIVES — это СОДЕРЖИМОЕ (7 поведенческих директив внутри контейнера). SP — единственная техническая часть карточки, которую модель видит всегда.

→ `[ref: part_07a.md §7A.1 — Системный промпт (System Prompt): структура и сборка]`
→ `[meta: sources=C-19+T-46; lang=en; home=p7a_system_prompt; xrefs=p7a_format_lock; aliases=SP, System Prompt, System Prompts, Системный промпт, системный промпт, System Prompt block, SP block; deprecated=системный промпт, Системный промпт, System Prompt block, SP block; prohibited=Системка, Системник]`

### T→A→P (Триггер → Действие → Цена)

**T→A→P (Триггер → Действие → Цена)** — формат поведенческого якоря: Триггер (внешний стимул, активирующий якорь) → Действие (наблюдаемая реакция персонажа) → Цена (немедленная физическая реакция в той же сцене — манифестация последствия). Базовая единица задания поведения в карточке; каждый якорь обязан содержать все три элемента, иначе якорь = инструкция без паттерна, и модель его проигнорирует.

→ `[ref: part_02.md §2.1 — Поведенческие якоря (Behavioral Anchors)]`
→ `[meta: sources=C-20+T-02+T-37+T-49; lang=en; home=p2_basic_anchors; xrefs=p2_anchor_rules; aliases=Action, Действие, Anchor Action, Price, Цена, Trigger, Триггер, Anchor Trigger]`

### Tone Frame (тональный фрейм)

**Tone Frame (тональный фрейм)** — тональный фрейм: двойной SP-элемент (~25–30 токенов), задаёт тон и фиксирует формат; пишется на английском в SP (правило языка — §7A.2).

→ `[ref: part_07a.md §7A.3 — Тональный фрейм (Tone Frame)]`
→ `[meta: sources=T-48; lang=en; home=p7a_tone_frame; xrefs=p7a_system_prompt; abbr=TF; aliases=TF, Tone Frame, Тональный фрейм]`

### processus_analysium

**processus_analysium** — каноническое имя XML-тега для внутреннего процесса персонажа (CoT Tier 3, внутри [INTERNAL]): processus = процесс, analysium = анализ. Протестировано на API-моделях (Claude, GPT-4).

→ `[ref: part_06.md §6.5 — Tier 3 CoT (API only)]`
→ `[meta: sources=T-38; lang=en; home=p6_cot_tier3; aliases=processus_analysium, внутренний процесс XML]`

### Анти-годмодинг (Anti-godmoding)

**Анти-годмодинг (Anti-godmoding)** — директива в System Prompt, запрещающая модели писать за пользователя (действия, мысли, чувства `{{user}}`). Оформляется двумя строками: запрет («Never speak or act for {{user}}») и позитивная формулировка («respond only to observable actions and words»); позитивная формулировка работает лучше чистого запрета — она даёт модели паттерн для подражания. Диагностический термин «годмодинг» обозначает сам факт нарушения (см. отдельную статью).

→ `[ref: part_07a.md §7A.1 — Системный промпт (System Prompt): структура и сборка]`
→ `[meta: sources=C-2+T-03; lang=ru; home=p7a_system_prompt; xrefs=p1_core_rules; aliases=Anti-godmoding, анти-годмодинг, anti-godmode, godmoding protection; deprecated=anti-godmode, godmoding protection]`

### База знаний (Lorebook)

**База знаний (Lorebook)** — система инъекции ключ-значение, вставляющая знания персонажа в контекст по требованию. Каждая запись (Lorebook Entry) содержит: Key (триггер-слово), Content (факт для вставки), Position (куда вставлять), Depth (глубина поиска), Probability, Cooldown. Особенно полезна для GHOST-связанных фактов и сенсорных активаций.

→ `[ref: part_07b.md §7B.3 — Lorebook (база знаний): основы]`
→ `[meta: sources=C-14+T-25+T-26; lang=ru; home=p7b_lorebook_basics; xrefs=p7b_lorebook_mechanics, p7b_lorebook_advanced; abbr=LB; aliases=Lorebook, LB, Lore Book, World Info, WI, База знаний, Запись Lorebook, LB Entry; deprecated=лорбук, World Info, world info; prohibited=Лорбук]`

### Блок идентичности (Identity Block)

**Блок идентичности (Identity Block)** — раздел System Prompt, определяющий, кто персонаж: имя, роль, ключевые черты. Оформляется одной строкой: «You are {{char}}. {{brief_identity}}». Занимает ~10 токенов; остальные черты уходят в Description как факты, не как голос. Имя сохраняет каноническую форму (кириллица/латиница/CJK) во всех блоках карточки — транслитерация запрещена; модель обрабатывает имя как токен-якорь, не как инструкцию.

→ `[ref: part_07a.md §7A.1 — Системный промпт (System Prompt): структура и сборка]`
→ `[meta: sources=C-12+T-21; lang=ru; home=p7a_system_prompt; aliases=Identity Block, Блок идентичности, блок идентичности, identity section; deprecated=identity section]`

### Бюджет токенов (Token Budget)

**Бюджет токенов (Token Budget)** — распределение токенов контекстного окна между компонентами карточки — определяет, какие элементы попадут к модели. Бюджет зависит от размера окна (4K / 8K / 16K+ / API); канонические значения по блокам — таблица §7A.12.

→ `[ref: part_07a.md §7A.12 — Бюджет токенов (Token Budget)]`
→ `[meta: sources=C-21+T-47; lang=ru; home=p7a_token_budget; xrefs=p7a_system_prompt; aliases=Token Budget, Бюджет токенов, бюджет токенов; deprecated=бюджет токенов, token budget allocation]`

### Вложенные якоря (Nested Anchors)

**Вложенные якоря (Nested Anchors)** — якоря с условным ветвлением: один триггер → несколько действий в зависимости от контекста. Риск перегрузки — анти-паттерн AP-15.

→ `[ref: part_08.md §8.16 — AP-15: Вложенные якоря (Nested Anchors)]`
→ `[meta: sources=T-30; lang=ru; home=p8_ap15_nested_anchors; aliases=Nested Anchors, Вложенные якоря, Nested Anchor]`

### Голос (Voice)

**Голос (Voice)** — лингвистический отпечаток персонажа: словарь, синтаксис, ритм, регистр. Голос = ритм + лексика + синтаксис + парадоксы; ни один из этих компонентов не описывается прилагательными — только демонстрируется через Examples (модель — копировщик паттернов, не исполнитель инструкций). Два уровня: лингвистический голос (слова, синтаксис) — только Examples и Greeting; физическая характеристика голоса (тембр, хрип, механический гул) — часть Embodiment, допустима в Description.

→ `[ref: part_03.md §3.1 — Изоляция голоса (Voice Isolation)]`
→ `[meta: sources=C-22+T-50; lang=ru; home=p3_voice_isolation; xrefs=p3_examples_rules, p7b_greeting; aliases=Voice, голос персонажа, голос; deprecated=voice profile]`

### Годмодинг

**Годмодинг** — диагностический термин: модель пишет за пользователя (действия, мысли, чувства `{{user}}`) — сам факт нарушения. Директива Anti-godmoding (§7A.1) предотвращает годмодинг; отсутствие директивы — анти-паттерн AP-6.

→ `[ref: part_08.md §8.7 — AP-6: Отсутствие анти-годмодинга (No Anti-godmoding)]`
→ `[meta: sources=T-55; lang=ru; home=p8_ap6_no_anti_godmoding; xrefs=p7a_system_prompt; aliases=годмодинг, godmoding, god mode, Godmoding]`

### Дефект (FLAW)

**Дефект (FLAW)** — конкретное поведение персонажа, мешающее ему получить NEED. Рождается из LIE: ложная установка заставляет персонажа действовать саморазрушительно. FLAW — всегда наблюдаемое поведение, не прилагательное («отталкивает людей сарказмом» ≠ «циничный»). Каждый FLAW требует минимум один FLAW-linked якорь.

→ `[ref: part_04.md §4.4 — Дефект (FLAW)]`
→ `[meta: sources=C-8+T-16; lang=ru; home=p4_flaw; aliases=FLAW, Flaw, Дефект, Изъян; deprecated=Изъян]`

### Желание (WANT)

**Желание (WANT)** — осознанное желание персонажа — то, что он думает, что ему нужно. Внешняя цель, которую персонаж может сформулировать. WANT совместим с LIE: персонаж не видит противоречия между своим желанием и своей ложной установкой. Часто противоречит NEED, создавая нарративное напряжение.

→ `[ref: part_04.md §4.6 — Желание (WANT)]`
→ `[meta: sources=C-26+T-54; lang=ru; home=p4_want; aliases=WANT, Want, Желание; deprecated=Хочет, ХОЧУ; prohibited=ХОЧУ, Хочет]`

### Заражение голоса (Voice Contamination)

**Заражение голоса (Voice Contamination)** — нарушение Voice на 12B, вызванное копированием чужих `<START>`-примеров: чужой ритм и разметка ломают голос. Правило: каждый `<START>`-блок пишется с нуля под вашего персонажа.

→ `[ref: part_03.md §3.3 — Правила написания Examples]`
→ `[meta: sources=T-52; lang=ru; home=p3_examples_rules; aliases=Voice Contamination, Заражение голоса]`

### Изоляция голоса (Voice Isolation)

**Изоляция голоса (Voice Isolation)** — техника отделения Voice персонажа от Voice рассказчика и голосов других персонажей. Лингвистический голос (слова, синтаксис, лексика, ритм фразы) задаётся ТОЛЬКО в Examples и Greeting, никогда в Description; для 12B моделей Description = 0% влияния на лингвистический голос — стилистические директивы в Description являются ошибкой сборки. Физическая характеристика голоса (тембр, хрип, механический гул) — часть Embodiment, допустима в Description (сенсорный слой «Звук»).

→ `[ref: part_03.md §3.1 — Изоляция голоса (Voice Isolation)]`
→ `[meta: sources=C-25+T-53; lang=ru; home=p3_voice_isolation; xrefs=p3_examples_rules; aliases=Voice Isolation, Изоляция голоса, изоляция голоса; deprecated=voice separation]`

### Иммерсионная граница (Immersion Boundary)

**Иммерсионная граница (Immersion Boundary)** — продвинутая OOC-защита: отрицание мета-реальности — персонаж не признаёт существования «игры» или «роли». Для базовой защиты используется OOC Protection.

→ `[ref: part_07a.md §7A.8 — OOC-защита (OOC Protection)]`
→ `[meta: sources=T-22; lang=ru; home=p7a_ooc_protection; aliases=Immersion Boundary, Иммерсионная граница]`

### Карточка персонажа (Character Card)

**Карточка персонажа (Character Card)** — полный пакет поведенческого движка персонажа — все блоки карточки (Description, System Prompt, Examples, якоря, Greeting Message; состав — §1.2).

→ `[ref: part_01.md §1.2 — Базовые блоки карточки]`
→ `[meta: sources=T-06; lang=ru; home=p1_card_overview; aliases=Character Card, Card, Карточка, Карточка персонажа; deprecated=Персонаж]`

### Ложь (LIE)

**Ложь (LIE)** — ложная установка, в которую верит персонаж, часто мешая получить NEED. Вытекает из GHOST как защитный механизм от боли. Оформляется как фраза в кавычках — то, что персонаж сказал бы о себе. LIE объясняет, почему существует FLAW: ложная установка заставляет действовать саморазрушительно.

→ `[ref: part_04.md §4.3 — Ложь (LIE)]`
→ `[meta: sources=C-13+T-24; lang=ru; home=p4_lie; aliases=LIE, Lie, Ложь, Ложная установка]`

### Основные директивы (CORE DIRECTIVES)

**Основные директивы (CORE DIRECTIVES)** — набор из 7 поведенческих директив внутри System Prompt — «операционная система» генерации: связная логика, не разрозненные инструкции. Состав: (1) Show Never Tell; (2) Embodiment First; (3) Spatial & Anatomical Lock; (4) Environmental Reactivity; (5) Influence Boundary; (6) Consequence Driven; (7) Pre-Generation Filter. Определение каждой директивы и многоуровневое правило языка (по модели) — §7A.2.

→ `[ref: part_07a.md §7A.2 — Основные директивы (CORE DIRECTIVES)]`
→ `[meta: sources=C-5+T-07+T-08+T-11+T-14+T-23+T-35+T-41+T-43; lang=ru; home=p7a_core_directives; xrefs=p7a_system_prompt; abbr=CD; aliases=CORE DIRECTIVES, CD, Core Directives, Основные директивы, ядерные директивы, Show Never Tell, Embodiment First, Spatial & Anatomical Lock, Environmental Reactivity, Influence Boundary, Consequence Driven, Pre-Generation Filter; deprecated=Core Directives, core directives, ядерные директивы]`

### Переплетение голосов (Voice Bleed, между персонажами)

**Переплетение голосов (Voice Bleed, между персонажами)** — режим отказа, при котором голос одного персонажа просачивается в речь другого: в мульти-персонажных сценах модель генерирует реплики одного персонажа в стиле другого. Диагностический термин; отличается от деградации голоса одного персонажа (см. «Утечка голоса»). Предотвращается через минимум 3 голосовых маркера на каждого персонажа и явное различение голосов в Examples.

→ `[ref: part_03.md §3.8 — Мульти-персонажные примеры]`
→ `[meta: sources=C-23+T-51; lang=ru; home=p3_multi_char; xrefs=p8_ap11_voice_bleed; aliases=Voice Bleed, Утечка голоса между персонажами, voice leak, утечка голоса; deprecated=voice leak]`

### Поведенческий якорь (Behavioral Anchor)

**Поведенческий якорь (Behavioral Anchor)** — триггер-действие-паттерн (T→A→P), активирующий конкретное поведение; основной механизм задания характера без бесконечного описания. Anchor Format: Триггер (внешний стимул) → Действие (наблюдаемая реакция) → Цена (физическая реакция в той же сцене); каждый FLAW требует минимум один FLAW-linked якорь. Якоря — отдельный структурный блок внутри Examples-зоны карточки, не часть диалоговых примеров (правило размещения — §1.4); в большинстве фронтендов размещаются как `<anchors>`-тег в Description; концептуально якоря задают поведенческие паттерны, Examples — голосовые.

→ `[ref: part_02.md §2.1 — Поведенческие якоря (Behavioral Anchors)]`
→ `[meta: sources=C-3+T-05; lang=ru; home=p2_basic_anchors; xrefs=p1_core_rules, p2_anchor_examples; aliases=Behavioral Anchor, Anchors, Anchor, Якоря, Поведенческий якорь, Поведенческие якоря, якорь; deprecated=behavioural anchor, behavior trigger]`

### Потребность (NEED)

**Потребность (NEED)** — истинная потребность персонажа — то, что ему на самом деле нужно для роста. Часто противоречит WANT. FLAW блокирует NEED: именно поэтому персонаж не может получить то, в чём действительно нуждается. Обычно связано с людьми и связями; персонаж может не осознавать свою NEED.

→ `[ref: part_04.md §4.5 — Потребность (NEED)]`
→ `[meta: sources=C-16+T-29; lang=ru; home=p4_need; aliases=NEED, Need, Потребность; deprecated=Нуждается, Нужда; prohibited=НУЖДА]`

### Правило одного изменения

**Правило одного изменения** — принцип диагностики: изменение только одного параметра за итерацию — для достоверной оценки результата.

→ `[ref: part_09.md §9.2 — Правило одного изменения]`
→ `[meta: sources=T-32; lang=ru; home=p9_one_change_rule; aliases=One Change Rule, Правило одного изменения]`

### Приветственное сообщение (Greeting Message)

**Приветственное сообщение (Greeting Message)** — первое сообщение персонажа в разговоре, демонстрирующее Voice, SPINE и Anchors в действии. Строится по алгоритму: Sensory Anchor → тело FLAW → реплика → крючок. Длина: 50–100 токенов. Задаёт место, время и тон, но не сюжет.

→ `[ref: part_07b.md §7B.2 — Приветствие — первое сообщение (Greeting Message)]`
→ `[meta: sources=C-11+T-20; lang=ru; home=p7b_greeting; aliases=Greeting Message, Greeting, First Message, Приветствие, Первое сообщение, приветствие]`

### Призрак (GHOST)

**Призрак (GHOST)** — формирующая травма или опыт прошлого, лежащий в основе цепочки SPINE. Призрак — конкретное событие, не психологический вывод; корень причинной цепочки: призрак порождает ложь (LIE) как защитный механизм от боли. Запрещённые слова в описании призрака: «травма», «пережил», «столкнулся с».

→ `[ref: part_04.md §4.2 — Призрак (GHOST)]`
→ `[meta: sources=C-9+T-18; lang=ru; home=p4_ghost; xrefs=p4_ghost_layers; aliases=GHOST, Ghost, Призрак, призрак; deprecated=призрак, ghost layer; prohibited=GHOST-Слой, Слой призрака]`

### Протокол телесности (Embodiment Protocol)

**Протокол телесности (Embodiment Protocol)** — поведенческая последовательность: Состояние → Тело → Сенсор → Речь. Каждый эмоциональный сигнал проявляется физически: внутренний вес/баланс → напряжение/дрожь → контакт со средой (текстура, звук, запах) → тон/темп/лексика. Отличается от директивы «Embodiment First»: Протокол описывает КАК (последовательность), Директива — ОБЯЗАТЕЛЬСТВО (всегда использовать).

→ `[ref: part_02.md §2.4 — Телесность (Embodiment)]`
→ `[meta: sources=C-6+T-12; lang=ru; home=p2_embodiment; xrefs=p7a_core_directives; aliases=Embodiment Protocol, Протокол телесности, протокол телесности, протокол воплощения, embodiment sequence; deprecated=embodiment sequence]`

### Сенсорные якоря (Sensory Anchors)

**Сенсорные якоря (Sensory Anchors)** — якорь, привязанный к одному из 5 каналов восприятия; используется для персонажей с GHOST Layers или травмой.

→ `[ref: part_02.md §2.6 — Сенсорные якоря (Sensory Anchors)]`
→ `[meta: sources=T-40; lang=ru; home=p2_sensory_anchors; xrefs=p4_ghost_layers; aliases=Sensory Anchors, сенсорные якоря]`

### Синтез личности (Persona Synthesis)

**Синтез личности (Persona Synthesis)** — процесс интеграции SPINE + OCEAN + Enneagram в единый профиль персонажа.

→ `[ref: part_05.md §5.7 — OCEAN×Enneagram Matrix + Синтез личности (Persona Synthesis)]`
→ `[meta: sources=T-34; lang=ru; home=p5_cross_matrix; aliases=Persona Synthesis, синтез личности]`

### Слои призрака (GHOST Layers)

**Слои призрака (GHOST Layers)** — 3-уровневая архитектура (G1=Детство, G2=Юность, G3=Настоящее) для сложной травмы. G1 формирует ложь (LIE), G2 укрепляет дефект (FLAW), G3 определяет текущие триггеры. Не всем персонажам нужны 3 слоя — если предыстория простая, достаточно одного призрака (GHOST).

→ `[ref: part_04.md §4.11 — Слои призрака (GHOST Layers, 3-tier)]`
→ `[meta: sources=C-10+T-19; lang=ru; home=p4_ghost_layers; xrefs=p4_spine_overview; aliases=GHOST Layers, Призрачные слои; deprecated=ghost layers, призрачные слои, 3-tier GHOST]`

### Структурированная инъекция (Structured Inject)

**Структурированная инъекция (Structured Inject)** — механизм динамического обновления мотивации через AN или LB с XML-тегами.

→ `[ref: part_07b.md §7B.1 — Структурированная инъекция (Structured Inject)]`
→ `[meta: sources=T-45; lang=ru; home=p7b_structured_inject; aliases=Structured Inject, Структурированная инъекция, структурированная инъекция]`

### Утечка голоса (Voice Bleed, деградация)

**Утечка голоса (Voice Bleed, деградация)** — деградация голоса одного персонажа: модель генерирует неверный голос — голос рассказчика (Narrator Bleed) или ассистента просачивается в речь персонажа. Возникает, когда стилистические директивы помещены в Description вместо Examples: модель не следует голосовым инструкциям, а копирует паттерны из примеров диалога. Предотвращается через Voice Isolation — голос задаётся только в Examples и Greeting, никогда в Description.

→ `[ref: part_03.md §3.6 — Утечка голоса (Voice Leak)]`
→ `[meta: sources=C-24+T-28; lang=ru; home=p3_voice_leak; xrefs=p3_voice_isolation, p8_ap11_voice_bleed; aliases=Narrator Bleed, Утечка рассказчика, Voice Bleed degradation]`

### Эннеаграмма (Enneagram)

**Эннеаграмма (Enneagram)** — 9-типная модель личности, сопоставляемая с элементами SPINE. Каждый тип имеет ключевой страх, ключевое желание, направление стресса и направление роста — что позволяет вывести LIE, WANT, FLAW и NEED из типа. OCEAN описывает «сколько» черты, Enneagram отвечает на «почему» персонаж действует именно так.

→ `[ref: part_05.md §5.4 — Enneagram: 9 типов личности]`
→ `[meta: sources=C-7+T-13; lang=ru; home=p5_enneagram_basics; xrefs=p5_enneagram_wings; aliases=Enneagram, Эннеаграмма, эннеаграмма, Эннеа; deprecated=Эннеа]`
