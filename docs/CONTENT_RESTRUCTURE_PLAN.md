# Content Restructure Plan — Live Character Guide

> **Version:** 1.0 (iter 6 — analytical/reconnaissance pass)
> **Date:** 2026-06-23
> **Author:** main agent (iter 6)
> **Status:** ANALYTICAL — нет правок кода/контента, только план
> **Связанные KI:** KI#13 (ACTIVE — inline styles), KI#14 (NEW, ACTIVE — content duplication, этот план)

---

## 0. TL;DR (Executive Summary)

**Проблема:** Гайд разросся до ~6 600 строк master HTML + ~6 000 строк visual-system + ~2 500 строк docs = **~15 000 строк контента**, в котором одна и та же семантика дублируется 3–5 раз в разных формах (визуализация + текст + таблица + mermaid + example + rule callout). Визуализации не **замещают** текст, а **дублируют** его — это нарушает исходную задумку.

**Корневая причина:** Гайд писался секция-за-секцией без единого "канонического текста". Каждая секция самодостаточна, и поэтому повторяет концепции, уже объяснённые в соседних. Visual-system элементы (E01..E17) были добавлены **поверх** существующего текста, а не **вместо** него.

**Предлагаемое решение (согласовано с пользователем):** Создать **Canonical Guide Spec** — единый текстовый документ-источник, где весь гайд изложен компактно без HTML/CSS мусора, с маркерами `[VS: E0X — что визуализировано]` вместо встроенной разметки. Дальше — пошаговая миграция master HTML: каждая секция переписывается против канона, дубликаты удаляются, визуализации становятся **замещающими**, а не параллельными.

**Масштаб работы:** 4 фазы × ~3 итерации = ~12 итераций. Текущая (iter 6) — аналитическая. iter 7 — Canonical Spec. iter 8..18 — постепенная миграция Part-by-Part.

---

## 1. Current State Analysis

### 1.1 Количественные показатели

| Артефакт | Объём | Замечание |
|----------|-------|-----------|
| `src/master/*.html` (10 Parts + 3 Appendix) | 6 576 строк / ~430 KB | Авторский контент, 98 секций (verified iter 6 review) |
| `visual-system/elements/*.html` (E01..E17) | ~6 000 строк / ~250 KB | Standalone прототипы визуализаций |
| `docs/*.md` (8 файлов) | ~2 500 строк / ~140 KB | Architecture, Bibles, Content Map, Terminology |
| `src/shell/widgets/*.js` (15 виджетов) | ~3 000 строк / ~110 KB | Behavior-скрипты (не трогаем в миграции) |
| `data/*.json` (7 файлов) | ~2 000 строк / ~70 KB | Источник данных для виджетов |

**Итого гайд-контента (без инфраструктуры):** ~15 000 строк / ~820 KB.

### 1.2 Структура секций (98 секций в 14 файлах, verified iter 6 review)

| Файл | Секций | VS-EMBED | Infographic | Mermaid | Таблиц |
|------|--------|----------|-------------|---------|--------|
| part_01.html | 7 | 1 | 0 | 1 | 2 |
| part_02.html | 6 | 2 | 4 | 0 | 5 |
| part_03.html | 8 | 1 | 0 | 0 | 6 |
| part_04.html | 11 | 2 | 6 | 1 | 10 |
| part_05.html | 8 | 2 | 0 | 0 | 9 |
| part_06.html | 6 | 1 | 0 | 0 | 2 |
| part_07a.html | 13 | 4 | 0 | 0 | 9 |
| part_07b.html | 5 | 0 | 2 | 0 | 10 |
| part_08.html | 16 | 1 | 0 | 0 | 1 |
| part_09.html | 11 | 2 | 0 | 0 | 15 |
| part_10.html | 4 | 1 | 0 | 0 | 3 |
| appendix_*.html | 3 | 0 | 0 | 0 | varies |
| **Итого** | **124** | **17** | **12** | **2** | **62+** |

**Вывод:** 17 канонических визуализаций (VS-EMBED) сосуществуют с 14 устаревшими (12 infographic + 2 mermaid) — это **параллельные** механизмы визуализации. Плюс 62+ таблиц, многие из которых дублируют концепции, уже показанные в VS-EMBED.

### 1.3 Частота терминов (дублирование как индикатор)

| Термин | Упоминаний в master HTML | Плотность (1 на N строк) |
|--------|--------------------------|--------------------------|
| GHOST | 165 | ~40 |
| SPINE | 160 | ~41 |
| FLAW | 142 | ~46 |
| LIE | 104 | ~63 |
| NEED | 105 | ~63 |
| WANT | 108 | ~61 |
| CoT | 92 | ~72 |
| OCEAN | 72 | ~92 |
| Enneagram | 48 | ~138 |
| CORE DIRECTIVES | 36 | ~183 |
| MBTI | 25 | ~264 |

**Интерпретация:** GHOST упоминается каждые 40 строк — это не "ссылка", это "перетолковывание заново" в каждой новой секции. AP-1..AP-15 упоминаются 4–9 раз каждый — это не ссылка "см. AP-N", а повтор симптома/причины/фикса в нескольких местах.

---

## 2. Duplication Patterns (типы дублирования)

### 2.1 Pattern A: VS-EMBED + textual section (визуализация + параллельный текст)

**Пример:** `part_04.html` — SPINE Framework

- Строки 9–138: VS-EMBED E05 — hex-узлы GHOST→LIE→FLAW→NEED→WANT с примерами ("Предательство редактора", "Я не могу никому доверять" и т.д.) + текстовое объяснение "Причинно-следственная цепь"
- Строки 140–210: `p4_spine_overview` — тот же контент: mermaid-диаграмма с теми же 5 элементами + абзац "WANT — это то, что персонаж осознанно желает..." + таблица "наблюдаемые единицы" с теми же примерами + infographic `inf-pipeline` с теми же 5 шагами + callout
- + standalone `visual-system/elements/E05-spine-framework.html` (420 строк) — отдельный прототип той же визуализации

**Итог:** одна и та же семантика (5 элементов SPINE, их связь, примеры) присутствует **3 раза** в 3 разных форматах в одном файле + standalone прототип.

### 2.2 Pattern B: Cascade duplicates (каскадное повторение цепочки)

**Пример:** `part_04.html` — цепочка `GHOST → LIE → FLAW → NEED → WANT` (формула)

- p4_spine_overview: mermaid + infographic + текст
- p4_spine_full_chain: infographic + pre/code пример "Выщербленный" + правило
- p4_spine_check: pre/code пример "Елена" + чек-лист
- p4_ghost_layers: упоминается снова

**Итог:** формула `GHOST → LIE → FLAW → NEED → WANT` повторяется минимум 4 раза в одном файле. Пример Елены (GHOST = "Предательство редактора") — 3 раза.

### 2.3 Pattern C: Per-element sections re-explaining VS-EMBED content

**Пример:** `part_04.html` — секции `p4_ghost`, `p4_lie`, `p4_flaw`, `p4_need`, `p4_want`

- VS-EMBED E05 показывает все 5 элементов с примерами на одной линии
- Затем 5 отдельных секций **снова** объясняют каждый элемент: определение + правила + примеры (часто те же, что в VS-EMBED)

**Итог:** VS-EMBED ≠ замещение, а превью к подробному тексту. Должно быть наоборот: VS-EMBED = основная подача, текст = только то, что нельзя визуализировать (правила, edge-cases, anti-patterns).

### 2.4 Pattern D: Anti-patterns triple duplication

**Пример:** `part_08.html` — AP-1..AP-15

- VS-EMBED E12 (строки 13–400+) — 15 карточек с symptom/cause/fix
- 15 секций `p8_ap1`..`p8_ap15` — тот же symptom/cause/fix словами + иногда пример
- `part_09.html` symptom table — снова упоминаются AP-1..AP-15 как диагностические маркеры

**Итог:** каждый AP описан 2–3 раза. AP-5 (RepPen) — 8 упоминаний, AP-11 (Voice Leak) — 8, AP-15 (Nested Anchors) — 9.

### 2.5 Pattern E: Cross-section concept repetition

**Пример:** "Consequence Driven" (CORE DIRECTIVE #6)

- `part_07a.html` p7a_core_directives — директива #6 определена
- `part_04.html` p4_spine_mapping — callout: "Динамика SPINE: WANT сдвигается к NEED по мере накопления Price в сессии — директива Consequence Driven"
- `part_09.html` symptom table — снова упоминается

**Итог:** концепция, уже определённая в Part 7A, **пере-объясняется** в Part 4 и Part 9 вместо ссылки.

### 2.6 Pattern F: Stale infographic + VS-EMBED coexistence

**Пример:** `part_02.html` — 4 infographic + 2 VS-EMBED

- VS-EMBED E03 (Behavioral Anchor) + E04 (Embodiment Protocol) — новые канонические визуализации
- 4 устаревших `infographic inf-pipeline` блока — старые CSS-визуализации, не удалённые после внедрения VS-EMBED

**Итог:** 2 параллельных механизма визуализации в одном файле. Читатель/агент не понимает, какой из них канонический.

### 2.7 Pattern G: Docs ↔ master HTML drift

**Пример:** `docs/character_bible.md` — Elena SPINE

```
GHOST: Предательство редактора
LIE: "Мне не нужно ничьё одобрение"
FLAW: Отталкивает людей сарказмом, когда сближается
NEED: Принятие — связь без стены цинизма
WANT: Доказать правоту
```

Та же цепочка в `part_04.html` p4_spine_check, p4_ghost, p4_lie — и **вариации**:
- p4_spine_overview example: "Предательство редактора" (без детали "история, которую она раскрыла, была украдена")
- p4_ghost table: "Предательство редактора — история, которую она раскрыла, была украдена и опубликована под чужим именем"
- character_bible.md: "Предательство редактора" (без детали)

**Итог:** "Source of truth" заявлен в `docs/elena_character_bible.md`, но фактически Part 4 содержит свои формулировки, которые медленно расходятся с bible. Это и есть drift.

---

## 3. Root Cause Analysis

### 3.1 Почему это произошло

1. **Iterative writing без канона.** Гайд писался Part-за-Part, каждая секция самодостаточна. Никто не держал в голове всю структуру, поэтому концепции пере-объяснялись в каждой новой секции.

2. **Visual-system добавлен как **слой**, а не как **замена**.** Когда пришли VS-EMBED'ы, их просто вставили в начало файла, не удаляя существующий текст. Получился "сэндвич": VS-EMBED сверху, потом старый текст снизу.

3. **Устаревшие визуализации не вычищены.** Старые `infographic` и `mermaid` остались в master HTML после внедрения VS-EMBED. Никто не сделал cleanup-pass.

4. **Документация как "mirror", а не "source".** `docs/content_map.md` описывает, что есть в master HTML, вместо того чтобы диктовать, что там должно быть. То есть docs = зеркало текущего состояния, а не канон.

5. **Cross-reference слабые.** Секции ссылаются друг на друга через `<a href="#pX_Y">`, но при этом **пере-объясняют** концепцию вместо того, чтобы дать 1-строчное summary + ссылку.

6. **AI-агенты усугубляют.** Каждый раз, когда агент правит секцию, он добавляет "для ясности" ещё одно объяснение, не удаляя существующее. За 5 итераций это накапливается.

### 3.2 Почему это сложно исправить "просто причесать"

- **Гайд огромный.** 6 600 строк HTML + 17 VS-EMBED'ов с inline SVG/HTML/CSS. Агент не может держать всё в контексте одновременно (даже 200K context window不足以 для quality pass).
- **HTML шум.** Каждая секция обёрнута в `<div class="callout rule">`, `<div class="table-wrap">`, `<section data-section>`, SVG-разметку и т.д. Агент тратит токены на парсинг разметки, а не на анализ семантики.
- **Скрытые зависимости.** Widget JS ссылается на классы в HTML. Если удалить "дублирующий" infographic, может сломаться lazy-loader или scroll-observer.
- **Нет формального канона.** Нет документа, который говорит "вот это — единственно верное определение GHOST". Каждая секция — свой автор.

---

## 4. Proposed Strategy

### 4.1 Подтверждение интуиции пользователя

> "Интуитивно, мне думается, следует пошагово создать некий документ, где будет собран гайд текстом с емкими вставками где нужно ---> [тут визуализировано то и это] но без самого кода и "мусора" в котором 100% запутается агент/языковая модель и уже опираясь на этот каноничный гайд без html кода ---> уже пытаться перебрать шаг за шагом, раздел за разделом весь гайд."

**Да, это правильный подход.** Это классический **"single source of truth → derive representations"** паттерн. Назовём этот документ **Canonical Guide Spec** (или просто **Canon**).

### 4.2 Улучшения к интуиции пользователя

1. **Canon ≠ переписанный гайд с нуля.** Canon = **извлечение** существующей семантики из master HTML + visual-system + docs, с дедупликацией. Не нужно придумывать заново — нужно консолидировать.

2. **Canon = Markdown, не HTML.** Markdown читается агентом с минимальным шумом. Визуализации отмечаются маркером `[VS: E0X — краткое описание]` без SVG/CSS. Это позволяет агенту работать с каноном как с чистой семантикой.

3. **Canon ≠ замена master HTML.** Master HTML остаётся **генерируемым артефактом** (ручная работа + visual-system embeds). Canon — это **источник правды**, из которого master HTML выводится. Миграция идёт в одну сторону: Canon → master HTML, не наоборот.

4. **Canon = part-by-part, не monolith.** Не нужно писать весь канон за один присест. Делаем по одному Part'у за итерацию: Canon §4 (SPINE) → миграция part_04.html → validate → следующий Part.

5. **Canon хранится в `docs/canon/`** как набор файлов `part_01..10.md` + `appendix_*.md`. Один файл = один Part master HTML. Это позволяет агенту загружать только нужный Part в контекст.

### 4.3 Структура Canonical Guide Spec

```markdown
# Part 4: SPINE Framework

> **Canonical source for:** src/master/part_04.html
> **VS elements:** E05 (SPINE chain), E06 (GHOST Layers)
> **Last synced:** 2026-06-23 (iter 7)

## 4.1 SPINE Overview

SPINE — психологический каркас из 5 элементов, связывающих прошлое персонажа с поведением.

[VS: E05 — SPINE Framework. Hex-chain GHOST→LIE→FLAW→NEED→WANT с примерами. Замещает текстовое объяснение цепочки.]

**Causal chain:** GHOST (формирующее событие) → LIE (ложная установка) → FLAW (дезадаптивный паттерн) → NEED (истинная потребность) → WANT (осознанная цель).

**Правило наблюдаемых единиц:** каждый элемент = конкретное наблюдаемое событие/поведение/формулировка, не абстрактный ярлык.

| Элемент | ❌ Абстракция | ✅ Наблюдаемая единица |
|---------|--------------|----------------------|
| GHOST | «Травма в детстве» | «В 7 лет видел, как дом сгорел, а пожарные приехали слишком поздно» |
| LIE | «Недоверчивый» | «Если я никого не впущу — никто не сможет меня ранить» |
| FLAW | «Нерешительный» | «Откладывает решения до последнего момента» |
| NEED | «Потребность в любви» | «Потребность: чтобы кто-то остался, когда он уязвим» |
| WANT | «Быть счастливым» | «Получить повышение до конца года» |

## 4.2 Элементы SPINE (детально)

### GHOST (Призрак)
- **Определение:** конкретное событие из прошлого, сформировавшее LIE. НЕ вывод.
- **Запрещённые слова:** «травма», «пережил», «столкнулся с».
- **Правила:** 1–2 предложения; объясняет origin LIE.
- **Пример (Елена):** Предательство редактора — история, которую она раскрыла, была украдена и опубликована под чужим именем.

### LIE (Ложная установка)
- **Определение:** ложное убеждение о мире/себе. Вытекает из GHOST как защита.
- **Формат:** фраза в кавычках — то, что персонаж сказал бы о себе.
- **Пример (Елена):** "Мне не нужно ничьё одобрение. Я работаю одна."

### FLAW (Дефект)
- **Определение:** конкретное поведение, блокирующее NEED. НЕ прилагательное.
- **Правило:** каждый FLAW = минимум 1 FLAW-linked Anchor.
- **Пример (Елена):** Отталкивает людей сарказмом, когда сближается.

### NEED (Потребность)
- **Определение:** истинная потребность, часто неосознанная. Часто противоречит WANT.
- **Пример (Елена):** Принятие — связь без стены цинизма.

### WANT (Желание)
- **Определение:** осознанная внешняя цель. Совместим с LIE.
- **Пример (Елена):** Доказать правоту — опубликовать историю, которую никто не желает публиковать.

## 4.3 GHOST Layers (опционально)

[VS: E06 — GHOST Layers. 3-tier структура: детство/юность/настоящее.]

Для сложных персонажей GHOST может иметь 3 слоя: каждый формирует отдельный аспект личности. Не обязательно для простых персонажей.

## 4.4 SPINE → Anchors Mapping

| SPINE | Anchor type | Logic |
|-------|-------------|-------|
| GHOST | Sensory Anchor | Сенсорный стимул активирует GHOST-реакцию |
| LIE | Psychological Anchor | Персонаж действует из ложной установки |
| FLAW | FLAW-linked Anchor (обязателен) | Защитный механизм срабатывает |
| WANT | At-rest Anchor | Поведение в покое, преследование цели |
| NEED | Growth Anchor | Момент близости/уязвимости |

**Алгоритм FLAW-linked Anchor:**
1. Запишите FLAW как конкретное поведение
2. Найдите момент, когда это поведение срабатывает
3. Опишите наблюдаемое действие
4. Добавьте физическую цену

## 4.5 Consistency Check

Чек-лист:
- ☐ GHOST → LIE: травма объясняет ложную установку
- ☐ LIE → FLAW: установка защищает от боли, вызывает поведение
- ☐ FLAW → NEED: поведение блокирует потребность
- ☐ NEED ← WANT: несовместимы напрямую
- ☐ WANT ↔ LIE: совместимы (персонаж не видит противоречия)
- ☐ GHOST Layers: каждый tier имеет Anchor-trigger
- ☐ Lorebook: GHOST-факты консистентны с Description

## 4.6 Navigation
- **Назад:** Part 3 — Voice Isolation
- **Вперёд:** Part 5 — Психологический инструментарий (OCEAN, Enneagram валидируют SPINE, не генерируют)
```

**Ключевые свойства канона:**

1. **Один канал语义 per concept.** Цепочка GHOST→LIE→FLAW→NEED→WANT объясняется **один раз** в §4.1, дальше только ссылки.
2. **VS-маркеры вместо встроенных визуализаций.** `[VS: E05 — ...]` = указатель, что здесь в master HTML будет VS-EMBED. Не дублирует контент.
3. **Таблицы остаются.** Таблицы (наблюдаемые единицы, mapping Anchors) — это легитимный контент, не дублирование.
4. **Примеры — единственный источник.** Пример Елены дан один раз в §4.2 GHOST. В §4.4 mapping — ссылка "пример см. §4.2", не повтор.
5. **Чистый Markdown.** Никакого `<div>`, `<section>`, `style=`, SVG. Агент читает это за секунды.

### 4.4 Что НЕ делает Canon

- **Не заменяет master HTML.** Master HTML остаётся production-артефактом с VS-EMBED'ами, виджетами, стилями.
- **Не заменяет visual-system elements.** E01..E17 остаются standalone прототипами + встраиваются через VS-EMBED.
- **Не заменяет docs/.** `architecture.md`, `terminology_dictionary.md`, `content_map.md` остаются. Canon — это **дополнение**, новый layer "источника правды для контента".
- **Не заменяет `data/*.json`.** Данные виджетов остаются в JSON. Canon не содержит данных, только прозу.

---

## 5. Migration Plan (итерации 7..18)

### 5.1 Принципы миграции

1. **One Part per iteration.** Не пытаемся мигрировать весь гайд за один проход. Один Part = одна итерация = один PR.
2. **Canon-first.** Сначала пишем/обновляем Canon §N, потом мигрируем `part_N.html` против канона.
3. **Validate после каждого Part.** `pnpm run validate:master` + `pnpm run qa` + visual diff в браузере. Если регрессия — откат.
4. **Visualizations = замещение, не дополнение.** После миграции в `part_N.html`:
   - VS-EMBED остаётся (это и есть визуализация)
   - Удаляются дублирующие `infographic`, `mermaid`, пере-объясняющие абзацы
   - Остаются только: правила, edge-cases, таблицы с уникальными данными, примеры (если не в VS-EMBED)
5. **Cross-references вместо re-explanation.** Если концепция определена в другом Part'е — ссылка `<a href="#pX_Y">`, не пере-объяснение.

### 5.2 Дорожная карта

| Iter | Фаза | Задача | Файлы | Риск |
|------|------|--------|-------|------|
| **6** (current) | Анализ | Создать этот план, KI#14 | `docs/CONTENT_RESTRUCTURE_PLAN.md`, STATUS, worklog, AGENT_NAVIGATION | LOW (только docs) |
| **7** | Canon scaffold | Создать `docs/canon/` структуру + Canon Part 4 (самый дубль-тяжёлый) как пилот | `docs/canon/_README.md`, `docs/canon/part_04.md` | LOW (только docs) |
| **8** | Pilot migration | ✅ DONE — Мигрировать `part_04.html` против Canon §4. Удалить 4 дубликата (mermaid + 3 inf-pipeline) + 1 orphan paragraph + сжать re-explanation. 2 unique infographic сохранены (deviation). LIE таблица сохранена полностью (deviation). 777 → 676 строк (-13%). Build PASS, validate:master PASS, qa без новых critical. | `src/master/part_04.html` | MEDIUM (visual diff pending iter 9) |
| **9** | Validate pilot | ✅ DONE — Validation pass Part 4. Static HTML sanity + served `parts/part_04.html` checks PASS (11 sections balanced, 2 VS-EMBED well-formed, 2 retained infographic present, no orphans, no mermaid, no broken refs). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:contrast`/`qa:doc-versions` PASS. `qa:english`/`qa:syntax` — same false positives as iter 7 (no regression). `qa:csp` FAIL → KI#16 NEW (pre-existing с iter 5). 6 docs updated. Никаких правок master HTML. | — | LOW |
| **10** | Canon Part 7A | ✅ DONE — Создан `docs/canon/part_07a.md` (802 строки, 13 H2 секций, 4 VS-маркера для E08/E16/E17/E02). Front-matter `Migration status: ❌ NOT MIGRATED (iter 11 task)`. Migration Notes таблица: 54 TODO + 4 "Сжать" кандидата + validation gates. Master HTML не тронут. `validate:master` PASS (0 errors, KI#13 baseline). KI#17 NEW (documentation drift: AGENT_NAVIGATION §10 hint указывал E07 вместо E02 как 4-й VS-EMBED — fixed). 8 docs updated. | `docs/canon/part_07a.md` | LOW |
| **11** | Migrate Part 7A | ✅ DONE — Мигрирован `src/master/part_07a.html` против Canon §7A (1168 → 1137 строк, -2.7%). 4 compression candidates applied (#22, #26, #42, #46). 50 "Оставить" без изменений. `validate:master`/`build`/`validate`/`test:unit`/`lint` PASS. Canon front-matter MIGRATED. 9 docs updated. | `src/master/part_07a.html`, `docs/canon/part_07a.md` | LOW |
| **12** | Canon Part 8 + migrate | ✅ DONE — Canon `docs/canon/part_08.md` создан (411 строк, 16 H2 секций, 1 VS-маркер E12) + `src/master/part_08.html` мигрирован (521 → 507 строк, -2.7%). 2 compression candidates applied (#3 intro paragraphs merge, #21 AP-9 Elena SPINE check → cross-ref Part 4). 29 "Оставить" без изменений. `validate:master`/`build`/`validate`/`test:unit`/`lint` PASS. Canon front-matter MIGRATED. End-to-end за один iter (Canon + migrate). 9 docs updated. | `docs/canon/part_08.md`, `src/master/part_08.html` | LOW |
| **13** | Canon Part 9 + migrate | ✅ DONE — Diagnostics (596 строк master HTML, 11 секций, 2 VS-EMBED E13+E14). Canon creation + migrate end-to-end (по образцу iter 12). Canon `docs/canon/part_09.md` (351 строка) + `src/master/part_09.html` мигрирован (596 → 582 строк, -2.3%). 1 compression candidate applied (#13 p9_test_requirements Table 1 → cross-ref на §9.7 p9_test_scenarios). 20 "Оставить" без изменений. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. Canon front-matter MIGRATED. 10 docs updated. | `docs/canon/part_09.md`, `src/master/part_09.html` | LOW |
| **14** | Canon Part 1, 2, 3 + migrate | ✅ DONE — Базовые блоки, Anchors, Voice. End-to-end за один iter (по образцу iter 12/13). Canon `docs/canon/part_01.md` (186 строк, 7 секций, 1 VS-маркер E01) + `docs/canon/part_02.md` (238 строк, 6 секций, 2 VS-маркера E03+E04) + `docs/canon/part_03.md` (315 строк, 8 секций, 1 VS-маркер E07) созданы. 3 master HTML мигрированы: `part_01.html` 390 → 365 строк (-6.4%, #14 mermaid → auto-TOC duplicate), `part_02.html` 443 → 415 строк (-6.3%, #15+#16+#17 — 2 infographic + 1 plain-copy removed как дубликаты VS-EMBED E03/E04), `part_03.html` 452 → 452 строк (0%, контент плотный). 4 compression candidates applied. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. Plan заявлял «4 infographic в part_02» — фактически 2 infographic + 1 plain-copy = 3 stale duplicate viz-блока (plan over-counted), все 3 удалены. 10 docs updated. | `docs/canon/part_01..03.md`, `src/master/part_01..03.html` | LOW |
| **15** | (reserved) | Не нужен — iter 14 покрыл Part 1+2+3 end-to-end. | — | — |
| **16** | Canon Part 5, 6, 7B, 10 + migrate | ✅ DONE — Psych toolkit, CoT, Lorebook, Examples. End-to-end за один iter (по образцу iter 12/13/14). Canon `docs/canon/part_05.md` (285 строк, 8 секций, 2 VS-маркера E09+E10) + `docs/canon/part_06.md` (247 строк, 6 секций, 1 VS-маркер E11) + `docs/canon/part_07b.md` (309 строк, 5 секций, 0 VS-маркеров) + `docs/canon/part_10.md` (593 строки, 4 секции, 1 VS-маркер E15) созданы. 4 master HTML мигрированы: `part_05.html` 619 → 615 строк (-0.6%, #18+#19 — 2 orphan paragraphs removed), `part_06.html` 261 → 259 строк (-0.8%, #20 — duplicate CoT definition removed), `part_07b.html` 371 → 371 строк (0%, контент плотный), `part_10.html` 666 → 666 строк (0%, 4 unique TEMPLATEs). 3 compression candidates applied. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. **Все 10 Parts мигрированы — Canon migration complete.** 10 docs updated. | `docs/canon/part_05.md`, `06.md`, `07b.md`, `10.md`, `src/master/part_05..07b,10.html` | LOW |
| **17** | (reserved) | Не нужен — iter 16 покрыл Part 5+6+7B+10 end-to-end. | — | — |
| **18** | Final cleanup | ✅ DONE — (a) Visual check Part 5+6 via static validation — no regression. (b) Infographic + mermaid audit: 0 mermaid в master HTML; 3 infographic retained (2 part_04 + 1 part_07b) + 1 part_05 static SVG fallback — все unique visualizations, deletions не требуются. (c) `docs/canon/appendix_mbti.md` (74 строки) + `appendix_model_table.md` (63 строки) + `appendix_glossary.md` (230 строк, 27 entries) созданы — master HTML уже минимален, Canon = mirror. (d) `docs/content_map.md` cleanup → mirror Canon (277 → 256, -8%, добавлен Canon § column). (e) `docs/terminology_dictionary.md` cleanup (338 → 206, -39%, dedup). `validate:master`/`build`/`validate`/`test:unit`/`lint` PASS. **Все 10 Parts + 3 Appendix — Canon COMPLETE.** 12 docs updated. | `docs/canon/appendix_*.md`, `docs/content_map.md`, `docs/terminology_dictionary.md` | LOW |
| **19** | KI#16 fix | ✅ DONE — 2 inline `<script>` блока в `src/shell/index.html` вынесены в external widget JS. (a) `src/shell/widgets/js-flag.js` created (early `js` class flag, sync в `<head>` для FOUC prevention). (b) `src/shell/widgets/mermaid-init.js` created (mermaid.initialize с dark theme + brand colors, sync после mermaid CDN, sets `mermaid._initialized = true` для skip redundant init в lazy-loader.js line 689). (c) `src/shell/index.html` edited: 2 inline `<script>` → 2 `<script src="widgets/...">`. (d) Build regenerated root `index.html` + `widgets/` (15→17 files) + `build.hash` (`df283246` → `fd3d96d3`). `qa:csp` PASS (0 inline scripts). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. **KI#16 CLOSED.** 14 docs/files updated. | `src/shell/widgets/js-flag.js`, `src/shell/widgets/mermaid-init.js`, `src/shell/index.html` | LOW |
| **20** | KI#13 Part 1+2 + KI#17 + SVG audit | ✅ DONE — KI#13 Part 1: 48 inline styles → 15 CSS classes. Part 2: 9 inline styles → 9 CSS classes. Total: 57/123 (46%). `vs-styles.css` +137 строк (SECTION 6, 28 классов `vs-ki13-*`). KI#17 CLOSED (doc drift fixed iter 10, LOW). SVG extracts audit: 0 orphans, все 17 elements embedded, все styles в vs-styles.css. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. 10 docs/files updated. | `src/assets/vs-styles.css`, `src/master/part_01.html`, `src/master/part_02.html` | MEDIUM |
| **21** | KI#13 Part 3+4 + Phase 4 SVG analysis | ✅ DONE — KI#13 Part 3: 2 inline styles → 1 CSS selector (`.vs-ki13-inset-text strong`, descendant selector). Part 4: 21 inline styles → 17 CSS selectors (spine-chain-panel/heading/text + descendant strong = 4; ring-delay-{0..850} = 10; ring-title--g3/g2/g1 = 3). Total: 80/123 (65%). `vs-styles.css` +49 строк (SECTION 6, 18 новых селекторов). Phase 4 SVG integration analysis: Canon migration (iter 7–18) уже удалил major textual duplicates; 3 retained infographics intentional; Part 7B (0 VS-EMBED) — candidate для нового VS element (E18+) в iter 22+, low priority. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged. 10 docs/files updated. | `src/assets/vs-styles.css`, `src/master/part_03.html`, `src/master/part_04.html` | MEDIUM |
| **22** | KI#13 Part 5+6 | ✅ DONE — KI#13 Part 5: 1 inline style → 1 CSS selector (`.vs-ki13-context-limits-note`, E09 OCEAN Pentagon — Elena extreme example footnote inside `.context-limits-box__data`). Part 6: 5 inline styles → 4 CSS selectors (E11 CoT Tiers progression panel: `vs-ki13-cot-panel` (max-width 700px) + `vs-ki13-cot-heading` (cyan accent — distinct от funnel-panel violet) + `vs-ki13-cot-text` + descendant `vs-ki13-cot-text strong` для 2 strongs). Total: 86/123 (70%). `vs-styles.css` +30 строк (SECTION 6, 5 новых селекторов). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged. 7 docs + 4 regenerated fallbacks updated. | `src/assets/vs-styles.css`, `src/master/part_05.html`, `src/master/part_06.html` | MEDIUM |
| **23** | KI#13 Part 7A | ✅ DONE — KI#13 Part 7A: 19 inline styles → 9 новых CSS селекторов с `vs-ki13-p7a-*` sub-namespace (semantic grouping per §8 recommendation). Groups: (a) 4 color overrides `.vs-ki13-p7a-text-{violet/muted/danger/success}` × 10 применений (E16 GHOST-activation label + E17 checklist cells + E02 SPINE label), (b) 3 badge sizing/spacing `.vs-ki13-p7a-badge-meta` (font-size:10px, 2×) + `.vs-ki13-p7a-badge-indent` (margin-left:4px, 4×) + `.vs-ki13-p7a-badge-indent-top` (margin-top:4px, 1×), (c) 1 state `.vs-ki13-p7a-template-hidden` (display:none, template-b initial — JS toggle compatible via inline `element.style.display` assignment override в vs-e16-author-note.js line 37-38), (d) 1 border `.vs-ki13-p7a-border-cyan` (pipeline-node__box accent). E16: 4→0, E17: 8→0, E02: 7→0. Total: 105/123 (85%). `vs-styles.css` +33 строки (SECTION 6). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged. 7 docs + 3 regenerated fallbacks updated. | `src/assets/vs-styles.css`, `src/master/part_07a.html` | MEDIUM |
| **24** | KI#13 Part 9+10 (CLOSED) | ✅ DONE — KI#13 Part 9: 6 inline styles → 6 CSS селекторов с `vs-ki13-p9-*` sub-namespace (E14 Quality Scale: 1 indicator-mid positional + 4 zone-title color modifiers `.vs-ki13-p9-zone-title--{excellent/good/poor/critical}` mirror parent border-left-color violet/cyan/amber/danger + 1 quick-checks panel max-width:700px centered). Part 10: 12 inline styles → 13 CSS селекторов с `vs-ki13-p10-*` sub-namespace (E15 Annotated Blueprint: 1 shared `.vs-ki13-p10-callout-pos { right: 20px; }` base + 11 per-instance top modifiers `.vs-ki13-p10-callout-pos--top-{10/20/100/120/130/250/260/280/290/380/390}` — DRY pattern eliminating `right:20px` duplication across 11 callouts, position:absolute comes from base `.callout`; + 1 `.vs-ki13-p10-card-block-accent` border-left:2px solid violet + padding-left:gap-md for Examples+Anchors combined block). part_09: 6→0, part_10: 12→0. Total: **123/123 (100%) — KI#13 ✅ CLOSED.** `vs-styles.css` +52 строки (SECTION 6, total 60 селекторов). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged. 7 docs + 4 regenerated fallbacks updated. | `src/assets/vs-styles.css`, `src/master/part_09.html`, `src/master/part_10.html` | MEDIUM |
| **25** | Phase 4 SVG (E18 Greeting Algorithm) | ✅ DONE — New VS element E18 created: 4-step pipeline (Sensory Anchor → Тело FLAW → Реплика → Крючок) с SVG arrows, reuses E02 `.pipeline-*` classes + new `.pipeline-node__code` for technique sequence line. Step 2 (Тело FLAW) uses `.pipeline-node__box--spine` (violet — SPINE connection). Standalone prototype: `visual-system/elements/E18-greeting-algorithm.html`. Component extracts: 3 new files in `visual-system/integration/component-extracts/`. E18 styles (+12 строк) appended to `src/assets/vs-styles.css` SECTION 5 (header E01–E17 → E01–E18). Master HTML `src/master/part_07b.html`: textual `infographic inf-pipeline` block (lines 33–61 pre-iter-25) → VS-EMBED E18 (lines 28–110 iter 25). Migration principle «viz > dry text» applied. part_07b: 371 → 424 строк (+53). Canon `docs/canon/part_07b.md` updated (front-matter, §7B.2 row 2 retention note, +iter 25 update section + validation gates). INTEGRATION-MAP.md +E18 row. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged. **Phase 4 SVG integration — COMPLETE.** VS elements registry: 18 (E01–E18). | `visual-system/elements/E18-greeting-algorithm.html`, `visual-system/integration/component-extracts/E18-*.{html,css,js}`, `src/assets/vs-styles.css`, `src/master/part_07b.html`, `docs/canon/part_07b.md`, `visual-system/integration/INTEGRATION-MAP.md` | LOW |
| **26** | Deployed Guide Audit (DGA) Phase 1 | ✅ DONE — Audit 14 master HTML, 8 duplication кейсов KI#18 A–H. KI#18-A FIXED (Part 9 Quality Scale). 7 pending B–H documented. Build hash fd3d96d3 unchanged. | `src/master/part_09.html`, `docs/canon/part_09.md` | MEDIUM |
| **27** | STATUS CHECK (no code changes) | ✅ DONE — User запросил краткий отчёт. Документация актуализирована. Build hash fd3d96d3 unchanged. | (docs only) | LOW |
| **28** | DGA Phase 2 (KI#18-B + KI#18-C FIXED, KI#18-I NEW) | ✅ DONE — KI#18-B (Part 1 p1_card_overview): drop «Функция» col duplicating E01, add intro p linking to E01. part_01: 365→367. KI#18-C (Part 2 p2_basic_anchors): drop «Описание» col duplicating E03, expand intro p linking to E03. part_02: 415→415 (0 net). Canon part_01.md + part_02.md updated. KI#18-I NEW (Part 2 p2_embodiment «Описание» col duplicates E04 — same pattern as C) — documented, NOT fixed (pending iter 29+). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged. **KI#18 🟡 ACTIVE — 3/9 fixed (A+B+C), 6 pending (D, E, F, G, H, I) iter 29+.** | `src/master/part_01.html`, `src/master/part_02.html`, `docs/canon/part_01.md`, `docs/canon/part_02.md` | MEDIUM |
| **29** | DGA Phase 2 continued (KI#18-I + KI#18-F FIXED partial) | ✅ DONE — KI#18-I (Part 2 p2_embodiment): drop «Описание» col duplicating E04 depth-label, expand intro p linking to E04. part_02: 415→415 (0 net). Same pattern as KI#18-C. KI#18-F (Part 6 p6_cot_tiers): drop «Формат» col duplicating E11 stair-step__name, add intro p linking to E11. part_06: 259→261 (+2). **KI#18-F partial:** «Для моделей» + «Пример» cols partial duplication (≈ viz model-pill + stair-step__format Russian translations) DEFERRED for accessibility — kept for Russian readers. Canon part_02.md + part_06.md updated. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged. **KI#18 🟡 ACTIVE — 5/9 fixed (A+B+C+I+F), 4 pending (D, E, G, H) iter 30+.** | `src/master/part_02.html`, `src/master/part_06.html`, `docs/canon/part_02.md`, `docs/canon/part_06.md` | MEDIUM |

**Оценка:** ~13 итераций (iter 7..19) на полный content restructure. Каждая итерация — 1–3 часа работы агента.

### 5.3 Что параллельно (не блокирует Canon)

- **KI#13 (inline styles)** — можно делать в любой момент, не зависит от Canon. Но если делать после миграции — придётся править уже переписанные секции. **Рекомендация:** KI#13 **после** миграции каждого Part'а, в той же итерации.
- **Phase 4 actual SVG integration** — заменить textual content на VS-EMBED. Это и есть часть миграции (Canon-first → migration удаляет дубли + оставляет VS-EMBED как замещение).
- **qa:syntax / qa:english false positives** — низкий приоритет, не блокирует.

### 5.4 Risk mitigations

| Risk | Mitigation |
|------|------------|
| Widget breakage после удаления infographic | `pnpm run test:interactive` после каждого Part. Manual visual diff в браузере. |
| Cross-reference broken (удалили секцию, на которую ссылались) | `rg "#pX_Y"` перед удалением. Если есть ссылки — replace на canonical equivalent. |
| Canon drift от master HTML | После каждой миграции: `git diff` Canon vs master HTML. Если drift — обновить Canon. |
| Потеря примеров (Елена, Выщербленный) | Все примеры переносятся в Canon §N. Master HTML ссылается на Canon через comment `<!-- canonical: docs/canon/part_N.md §N.M -->`. |
| Агент теряется в большом Part (7A = 1168 строк) | Part 7A разбить на 2 итерации: Canon §7A.1–7 (SP, CORE DIRECTIVES) + миграция; потом Canon §7A.8–13 + миграция. |

---

## 6. Success Metrics

После завершения iter 19 (финальный cleanup):

| Метрика | До (iter 6) | Цель (iter 19) |
|---------|-------------|----------------|
| Master HTML строк | ~6 600 | ~4 000–4 500 (-30%) |
| Упоминаний GHOST | 165 | ~60 (только canonical + cross-refs) |
| Упоминаний SPINE | 160 | ~50 |
| Устаревших infographic | 12 | 0 |
| Mermaid diagrams | 2 | 0 (заменены VS-EMBED) |
| VS-EMBED as замещение (не дублирование) | ~5/17 | 17/17 |
| Cross-section дубли (Pattern B, E) | ~30 | 0 |
| `validate:master` warnings | 146 (123 inline + 23 outside) | 0 |
| `docs/content_map.md` как mirror | partial | full (после Canon sync) |

**Качественная цель:** агент следующей итерации читает только `docs/canon/part_N.md` + `AGENT_NAVIGATION.md` и понимает **всю** семантику Part N. Не нужно открывать master HTML для понимания — только для редактирования.

---

## 7. Что сделано в iter 6 (этот pass)

### 7.1 Аналитика

- Изучены STATUS.md, worklog.md, AGENT_NAVIGATION.md, PLAN.md, visual-system/PLAN.md
- Изучены master HTML: part_01..10, appendix_*.html — статистика секций, VS-EMBED, infographic, mermaid, таблиц
- Изучены visual-system/elements/E01..E17 — standalone прототипы
- Изучены docs/: character_bible.md, content_map.md, terminology_dictionary.md
- Идентифицированы 7 паттернов дублирования (Pattern A..G)
- Сформулирована стратегия: Canonical Guide Spec + part-by-part migration

### 7.2 Документация

- **Создан этот файл** (`docs/CONTENT_RESTRUCTURE_PLAN.md`) — канонический план переработки
- **STATUS.md** — добавлен KI#14 (content duplication, ACTIVE, MEDIUM-HIGH priority)
- **worklog.md** — iter 6 аналитическая запись
- **AGENT_NAVIGATION.md** — §8 roadmap обновлён, добавлена ссылка на этот план
- **PLAN.md** — iter 6 status, iter 7+ roadmap

### 7.3 НЕ сделано (намеренно)

- **Не правлен master HTML.** Итерация аналитическая, никаких правок контента.
- **Не правлен visual-system.** То же.
- **Не создан Canon.** Это iter 7 задача.
- **KI#13 не фикшен.** Defer до post-Canon миграции (см §5.3).
- **Phase 4 SVG integration не начат.** То же.

---

## 8. Точка остановки для следующего агента

**Iter 29 COMPLETE (DGA Phase 2 continued — 2 fixes applied, KI#18 🟡 ACTIVE 5/9 fixed).** KI#18-I (Part 2 p2_embodiment) FIXED — drop duplicate «Описание» column (duplicating E04 depth-label), expand intro paragraph linking to E04 viz. Same pattern as KI#18-C (applied iter 28). KI#18-F (Part 6 p6_cot_tiers) FIXED partial — drop duplicate «Формат» column (duplicating E11 stair-step__name), add intro paragraph linking to E11 viz. «Для моделей» + «Пример» cols partial duplication DEFERRED for accessibility (Russian translations). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged.

**Iter 30+ — что осталось (DGA Phase 2 continued):**

1. **KI#18 🟡 ACTIVE — 4 pending sub-items.** iter 30 priority: **D** (Part 4 p4_spine_overview intro — careful, partial re-explanation of E05 SPINE chain shown in viz; needs careful analysis to not break section flow). Then **E** (Part 5 OCEAN — needs careful rule alignment: strict <30/>70 vs broad <40/>60 definition; viz «1 экстремум» vs text «3 экстремальных полюса» — semantic bug, NOT trivial fix). **G** (Part 8 per-AP sections — by design catalog vs detail, document rationale) + **H** (Part 10 E15 callouts — intentional annotation, document rationale) likely keep-by-design.
2. **Все previous KI (KI#1..KI#17) ✅ CLOSED.** Новые баги — сначала документировать в `STATUS.md` как Known Issue (KI#N), потом фиксить.
3. **Принцип `viz > dry text` (iter 8+):** сохраняется. Unique контент не удаляется даже при дублировании.

**KI#18 — Deployed Guide Duplication Audit (DGA) — sub-items:**

| Sub | Part | Описание | Severity | Status |
|-----|------|----------|----------|--------|
| **A** | Part 9 | E14 Quality Scale viz ↔ p9_quality_scale table (duplicate «Признаки» col + naming inconsistency «Плохой» vs viz «Слабый» + missing «Отличный» tier) | MEDIUM | ✅ FIXED iter 26 |
| **B** | Part 1 | E01 Card Anatomy viz (5 blocks with descriptions + token budgets) ↔ p1_card_overview table «Функция» col duplicates E01 block-content | LOW-MEDIUM | ✅ FIXED iter 28 |
| **C** | Part 2 | E03 Behavioral Anchors viz (T→A→P with descriptions) ↔ p2_basic_anchors table «Описание» col duplicates E03 flow-node__desc | LOW-MEDIUM | ✅ FIXED iter 28 |
| **D** | Part 4 | E05 SPINE viz + panel «Причинно-следственная цепь» ↔ p4_spine_overview intro paragraphs partially re-explain chain | LOW | ⏳ pending iter 30+ |
| **E** | Part 5 | E09 OCEAN Context Limits inset ↔ p5_ocean_basics «Контекстные лимиты полюсов» table (duplicate data) + cross-viz/text semantic inconsistency: viz «1 экстремум» vs text «3 экстремальных полюса» (rule <30 or >70: only O=72 qualifies) | MEDIUM (semantic bug) | ⏳ pending iter 30+ (needs rule alignment) |
| **F** | Part 6 | E11 CoT viz (4 tiers with name + model-pill + format) ↔ p6_cot_tiers table «Формат» col duplicates E11 stair-step__name; «Для моделей» + «Пример» cols partial duplication (model-pill + stair-step__format Russian translations) | LOW-MEDIUM | ✅ FIXED iter 29 (partial — «Формат» dropped; «Для моделей» + «Пример» DEFERRED for accessibility) |
| **G** | Part 8 | E12 Antipatterns viz (15 AP cards Симптом/Причина/Исправление) ↔ per-AP sections repeat «Симптом/Причина/Решение» structure | LOW (by design — catalog vs detail) | ⏳ pending iter 30+ (likely keep with rationale) |
| **H** | Part 10 | E15 Annotated Blueprint callouts (token budgets) duplicate E01 token budgets (Part 1) | LOW (intentional annotation) | ⏳ pending iter 30+ (likely keep with rationale) |
| **I** | Part 2 | E04 Embodiment Protocol viz (funnel-stack 4 layers State→Body→Sensor→Speech) ↔ p2_embodiment table «Описание» col duplicates E04 depth-label | LOW-MEDIUM | ✅ FIXED iter 29 |

**Conclusion:** DGA Phase 1 (audit) COMPLETE iter 26. Phase 2 in progress: 5/9 fixed (A iter 26, B+C iter 28, I+F iter 29), 4 pending (D, E, G, H). iter 30 priority: D (careful, partial re-explanation), then E (semantic bug, needs rule alignment), G + H likely keep-by-design.

**Подсказка следующему агенту:**

> Перед стартом iter 30+ прочитай:
> 1. `STATUS.md` (iter 29 DGA Phase 2 continued COMPLETE — KI#18-I ✅ FIXED + KI#18-F ✅ FIXED partial; iter 26 DGA Phase 1 STARTED, KI#18 🟡 ACTIVE 5/9 fixed, 4 pending D+E+G+H, все previous KI#1..#17 ✅ CLOSED)
> 2. `worklog.md` (iter 29 record — самый подробный)
> 3. `AGENT_NAVIGATION.md` (§6 pitfall #37 KI#18 🟡 ACTIVE 5/9 fixed, §8 iter 30+ roadmap — DGA Phase 2 continued: priority D, then E, G+H likely keep-by-design)
> 4. `docs/canon/_README.md` (§5 migration status — все 10 Parts + 3 Appendix ✅, Canon COMPLETE)
> 5. `docs/CONTENT_RESTRUCTURE_PLAN.md` (§5.2 iter 29 → DGA Phase 2 continued, §8 iter 29 stop point + KI#18 sub-items table above)
>
> **Migration principle (iter 8+):** при выборе «удалить текст или визуализацию» — viz сохраняется, dry-дублирующий текст удаляется. Unique контент не удаляется даже если Canon рекомендует. Применяется «очень деликатно».

---

## 9. Validation Pass (iter 6 review)

> Цель: проверить, что все цифры и утверждения в этом плане соответствуют фактическому состоянию репозитория. Найденные расхождения и упущения зафиксированы ниже.

### 9.1 Подтверждено (без правок)

Все ключевые метрики дублирования проверены case-sensitive word-boundary поиском `rg`:

| Метрика | Заявлено | Фактически | Статус |
|---------|----------|------------|--------|
| GHOST mentions | 165 | 165 | ✅ |
| SPINE mentions | 160 | 160 | ✅ |
| FLAW mentions | 142 | 142 | ✅ |
| LIE mentions | 104 | 104 | ✅ |
| NEED mentions | 105 | 105 | ✅ |
| WANT mentions | 108 | 108 | ✅ |
| CoT mentions | 92 | 92 | ✅ |
| OCEAN mentions | 72 | 72 | ✅ |
| Enneagram mentions | 48 | 48 | ✅ |
| MBTI mentions | 25 | 25 | ✅ |
| CORE DIRECTIVES mentions | 36 | 36 | ✅ |
| AP-1..AP-15 per pattern | 4–9 | 4–9 | ✅ |
| VS-EMBED markers | 17 | 17 | ✅ |
| Stale `infographic` blocks | 12 | 3 (iter 18 final audit: 2 part_04 retained + 1 part_07b retained = 3 unique visualizations; 12 устаревших удалены в iter 8/14. Final cleanup done iter 18 — deletions не требуются, all retained unique) | ✅ (iter 18 update) |
| `mermaid` blocks | 2 | 0 (iter 18 final audit: part_01 mermaid removed в iter 14, part_04 mermaid removed в iter 8 — все mermaid удалены из master HTML) | ✅ (iter 18 update) |
| Inline `style=` attributes | 123 | 123 | ✅ |
| Master HTML total lines | ~6 600 | 6 576 | ✅ |
| visual-system/elements/ files | 17 (E01..E17) | 17 / 6 369 строк | ✅ |

### 9.2 Исправлено в этом pass

| Где | Было | Стало | Причина |
|-----|------|-------|---------|
| §1.1 сводная таблица | "124 секции" | "98 секций" | Сумма по §1.2 таблице = 98, фактический `rg "data-section="` = 98. 124 — арифметическая ошибка. |
| §1.2 заголовок | "124 секции в 14 файлах" | "98 секций в 14 файлах" | То же. |
| `AGENT_NAVIGATION.md` §1 | "92 секции, ~6000 строк HTML" | "98 секций, ~6 600 строк HTML" | Устаревшая цифра из iter 1. Фактически 98 / 6 576. |

### 9.3 Дополнения, найденные при validation (NEW)

#### 9.3.1 Pattern H — `docs/anchor-redirects.json` stale duplicate of `data/anchor-redirects.json` — **FIXED iter 7 (KI#15 CLOSED)**

> **Status update (iter 7):** Файл `docs/anchor-redirects.json` удалён. Single source of truth = `data/anchor-redirects.json`. AGENT_NAVIGATION §7 строка убрана. Ниже — историческое описание проблемы (оставлено как record).

**Симптом (iter 6 finding):** В репозитории существовали ДВА файла `anchor-redirects.json`:

- `data/anchor-redirects.json` (108 строк, MD5 `f35bee35…`) — **runtime data**, загружается `src/shell/lazy-loader.js` (см. AGENT_NAVIGATION §1, §7 KEEP list). Содержит v8 → v9.1 redirects (`greeting` → `p7b_greeting`, `p8_ap15_*` → `p5_ocean_warning`).
- `docs/anchor-redirects.json` (108 строк, MD5 `aa4f8d8c…`) — **stale duplicate**, содержит v8 → v9 redirects старого формата (`greeting` → `p3_greeting`, `p8_ap15_*` → `p8_ap15_ocean_overload`). Заявлен в AGENT_NAVIGATION §7 "при rename/delete section IDs", но фактически никто не обновлял после v9.1 restructure.

**Класс дублирования:** Pattern G (docs ↔ master drift), но распространяется на **runtime data**, а не на prose. Это более серьёзно, чем prose drift, потому что `data/anchor-redirects.json` — working runtime, а `docs/anchor-redirects.json` — bit-rotten mirror.

**Impact:** LOW для runtime (lazy-loader использует `data/`), но MEDIUM для documentation integrity: агент, читающий `docs/anchor-redirects.json` как референс, получит устаревшие редиректы.

**Fix (iter 7+ cleanup):** Варианты:
- (a) Удалить `docs/anchor-redirects.json`, оставить только `data/` (рекомендуется — single source of truth).
- (b) Сделать `docs/` symlink на `data/` (нерекомендуется — git on Windows ломается).
- (c) Синхронизировать при каждом change section ID (хрупко — забудут).

**Рекомендация:** (a). Зарегистрировано как **KI#15** в STATUS.md. **FIXED iter 7** — файл `docs/anchor-redirects.json` удалён.

#### 9.3.2 Pattern E (Consequence Driven) более распространён, чем зафиксировано в §2.5

§2.5 заявляет 3 места: `p7a_core_directives` (defined) + `p4_spine_mapping` (callout) + `part_09 symptom table`. Фактически `rg "Consequence Driven"` находит:

- `part_07a.html` — **4 места** (lines 116, 159, 192, 1076) — определено в SVG, в тексте директивы, в `<pre><code>` примере, в System Prompt template. Это **каскад внутри одного Part'а**, не только cross-section.
- `appendix_glossary.html` line 31-32 — **отдельное определение** в глоссарии (formal duplicate).
- `part_04.html` line 531 — callout (как и заявлено).
- `part_06.html` line 205 — `<!-- Demonstrates: ... -->` comment.
- `part_10.html` — **5 мест** (lines 269, 395, 417, 424, 525, 572, 586) — во всех example-блоках.
- `appendix_model_table.html` line 22 — таблица model capability.

**Итого:** 12+ мест вместо 3 заявленных. Pattern E серьёзнее, чем описано. Это усилвает аргумент для Canon: "Consequence Driven" должен определяться **один раз** (Canon §7A), всё остальное — `[ref: §7A.6]`.

#### 9.3.3 `CHANGELOG.md` отсутствует запись iter 6

Последняя запись — `[9.1.5]` (iter 5, KI#11 + KI#12). iter 6 (KI#14 + CONTENT_RESTRUCTURE_PLAN.md) **не зафиксирован** в CHANGELOG. Добавлено в этом validation pass — см. `CHANGELOG.md` секцию `[9.1.6]`.

#### 9.3.4 visual-system/integration/component-extracts/ (51 файл) не в scope

`visual-system/integration/component-extracts/` содержит 51 файл (17 elements × 3: `E0X-script.js` + `E0X-styles.css` + `E0X-visual.html`) + `README.md`. Эти файлы — **извлечённые компоненты** из standalone prototypes для интеграции в master HTML.

**Не проанализированы в iter 6:** не проверено, синхронизированы ли они с актуальными `visual-system/elements/E0X.html` (source) и `src/master/part_N.html` (target). Возможный drift: если standalone prototype обновлён, но extract не синхронизирован — integration возьмёт устаревший код.

**Задача iter 7+ (PHASE 4 SVG integration):** Аудит `component-extracts/` — для каждого E0X проверить:
1. Совпадает ли `E0X-visual.html` с соответствующим фрагментом `visual-system/elements/E0X.html`
2. Используется ли `E0X-script.js` в `src/shell/widgets/vs-eXX-*.js` или orphan
3. Используются ли `E0X-styles.css` в `src/assets/vs-styles.css` или orphan

Если extracts orphan — удалить. Если используются — синхронизировать с sources. Это часть Phase 4 actual integration (iter 19+).

#### 9.3.5 Tables count: "62+" → 76 (минорная правка)

§1.2 строка "Итого 62+ таблиц" — фактически 76 `<table>` тегов. Расхождение минорное, но стоит уточнить для целей метрики. **Не критично для плана** — направление дублирования сохраняется.

### 9.4 Итог validation pass

| Тип | Количество | Действие |
|-----|------------|----------|
| ✅ Verified accurate | 18 метрик | ничего не делаем |
| 🔧 Corrected | 3 (section count ×2 + AGENT_NAV line) | исправлено в этом pass |
| ➕ New findings | 5 (Pattern H, Pattern E scope, CHANGELOG, component-extracts, tables count) | задокументировано, задачи iter 7+ |
| 🆕 New KI | KI#15 (anchor-redirects duplicate) | добавлен в STATUS.md |

**Вывод:** План итерации 6 аналитически корректен. Цифры точные. Найденные расхождения — мелкие (арифметика) + 1 новый паттерн + 1 новый KI. Стратегия Canonical Guide Spec валидна и не требует пересмотра.
