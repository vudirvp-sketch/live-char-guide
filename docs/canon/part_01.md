# Part 1: Basic Card Blocks (Базовые блоки карточки)

> **Canonical source for:** `src/master/part_01.html` (390 → 365 → 367 строк, 7 секций)
> **VS elements (embedded):** E01 (Card Anatomy)
> **Sections (7):** `p1_value_proposition`, `p1_card_overview`, `p1_structure_overview`, `p1_core_rules`, `p1_token_budget_ref`, `p1_pipeline_ref`, `p1_top3_problems`
> **Last synced:** 2026-07-08 (iter 28 — DGA Phase 2 fix KI#18-B: dropped duplicate «Функция» column from p1_card_overview table; content already shown in E01 viz; added intro paragraph linking to E01)
> **Migration status:** ✅ MIGRATED (iter 14) + ✅ iter 28 DGA fix (KI#18-B)

---

[VS: E01 — Card Anatomy. Стек из 5 блоков карточки (SP / Description / Examples+Anchors / Greeting / Lorebook) с token-аннотациями (мин/стд/макс) на каждом блоке + token budget summary table внизу. Замещает текстовое перечисление блоков и их функций.]

**Назначение Part 1:** ввести базовую архитектуру карточки как поведенческого движка. Карточка ≠ описание; каждый её блок производит наблюдаемое действие модели. Здесь же — 3 ключевых принципа (правила сборки) и Top-3 критичных ошибок.

---

## 1.1 Зачем системный подход?

`data-section: p1_value_proposition`

Классический подход — интуитивное заполнение Description. Системный подход — причинно-следственная архитектура, где каждый элемент производит наблюдаемое действие. Разница измерима.

| Параметр | Классический подход | Системный подход (SPINE) |
|----------|---------------------|---------------------------|
| Дрейф голоса (20+ сообщений) | ~40% отклонение от исходного тона | ~10% отклонение при том же токен-бюджете |
| Консистентность поведения | Модель заполняет пробелы дефолтами | Anchors задают конкретные триггеры → модель следует паттернам |
| Токен-эффективность | Description = 500+ токенов общих характеристик | OCEAN: `N:68` = 5 токенов вместо 30 текста |
| Динамика персонажа | Статичное поведение | WANT→NEED сдвиг через Price — персонаж развивается в сессии |

Гайд учит строить карточку как поведенческий движок.

---

## 1.2 Базовые блоки карточки

`data-section: p1_card_overview`

**Карточка персонажа** — документ, задающий поведение ИИ-модели при ролевой игре. Думать о ней нужно как о **поведенческом движке**: каждый элемент производит наблюдаемое действие, а не украшает описание. Карточка состоит из четырёх блоков, каждый выполняет свою функцию.

**Сквозной пример:** На протяжении всего гайда строим карточку Елены — от базовых блоков до полной карточки со всеми инструментами. Это позволяет увидеть, как каждый инструмент добавляет глубину персонажу.

**RULE:** О примерах и стиле. Этот гайд учит механике, не эстетике. Все примеры намеренно сухие — они иллюстрируют структурные принципы (причинность SPINE, триггеры Behavioral Anchors, маркеры Voice, логику CoT), а не качество письма. Когда пример содержит нарративный язык («Дождь барабанил по стеклу»), он существует для демонстрации конкретной директивы (в данном случае Environmental Reactivity) и помечен соответствующим образом. Стиль вашего персонажа — качество прозы, глубина лора, сенсорная насыщенность — ваша domain. Гайд гарантирует, что модель его уважает.

### Структура гайда

`data-section: p1_structure_overview`

Концептуальный поток гайда: какие концепции зависят от каких и в каком порядке изучать материал. Полная блок-схема зависимостей (OCEAN/Enneagram → SPINE → Anchors / Voice / CoT → System Prompt Assembly → Lorebook → Diagnostics → Examples; Anti-Patterns как параллельный fix-layer) ранее дублировалась Mermaid-диаграммой и auto-TOC. Mermaid удалён в iter 14 (дублировал TOC, не давая новой информации); auto-TOC остаётся единственным навигационным артефактом.

**Cross-ref:** Полное оглавление сгенерировано build-скриптом (placeholder `AUTO_TOC_PLACEHOLDER` в master HTML) — открывается в браузере при рендере.

Порядок чтения: ① Базовые Anchors (Part 2) → ② Голос и изоляция (Part 3) → ③ SPINE (Part 4) → ④ OCEAN/Enneagram (Part 5) → ⑤ CoT (Part 6). Полный конвейер сборки → `[ref: part_07a.md §7A.X — Assembly Pipeline]`.

Структура и содержимое блоков показаны выше в VS-EMBED E01 (Card Anatomy) — стек из 5 блоков с token-аннотациями (мин/стд/макс) и описаниями. Таблица ниже — структурные свойства, не видные в viz: влияние на модель и качественная доля бюджета.

| Блок | Влияние на модель | Доля бюджета |
|------|-------------------|--------------|
| **System Prompt** | Высокое — задаёт рамки | Компактный |
| **Description** | Среднее — контекст | Основной объём |
| **Examples** | Ключевое — паттерны речи | Средний |
| **Greeting** | Поддерживающее — тон | Минимальный |

**RULE:** Правило голоса → 3 ключевых принципа (см. §1.4 ниже).

---

## 1.3 Базовые принципы (введены в §1.2, развернуты в §1.4)

`data-section: p1_structure_overview` (продолжение)

Базовые блоки определяют, ЧТО ваш персонаж из себя представляет. Но персонаж, у которого есть только Identity и Description, будет вести себя типово — модель заполняет пробелы значениями по умолчанию. Behavioral Anchors решают эту проблему: они указывают, КОГДА и КАК ваш персонаж активирует конкретные паттерны поведения → `[ref: part_02.md §2.1 — Behavioral Anchors]`.

---

## 1.4 Три ключевых принципа

`data-section: p1_core_rules`

Эти принципы обязательны для всех карточек. Нарушение любого из них приводит к ухудшению качества генерации.

**RULE:** Фундаментальный принцип: LLM = Pattern Matcher, не Исполнитель правил. Директива в SP без паттерна в Examples нестабильна на моделях ≤14B (~40–60% следование директивам). Поэтому Examples — главный инструмент, а Description — логика поведения.

1. **Anchor = Trigger → Action → Price** — поведение задаётся Anchors, и у каждого Anchors обязательна Цена — физическая реакция в той же сцене. Без Цены Anchor = инструкция без паттерна → `[ref: part_02.md §2.1 — Behavioral Anchors]`.
2. **Голос — только в Examples и Greeting** — модель считывает характер персонажа из примеров диалога, а не из описания. Description = логика поведения, Examples = паттерны голоса → `[ref: part_03.md §3.1 — Voice Isolation]`.
3. **Психология — только в Description** — SPINE, OCEAN и другие психологические элементы размещаются исключительно в блоке Description, никогда в System Prompt → `[ref: part_04.md §4.1 — SPINE Overview]`, `[ref: part_05.md §5.X — OCEAN]` (Canon planned iter 16).

---

## 1.5 Token Budget

`data-section: p1_token_budget_ref`

Каждый блок карточки имеет токен-бюджет. Полная таблица лимитов и интерактивный калькулятор → `[ref: part_07a.md §7A.X — Token Budget]`.

---

## 1.6 Конвейер сборки

`data-section: p1_pipeline_ref`

Пошаговый конвейер сборки карточки → `[ref: part_07a.md §7A.X — Assembly Pipeline]`. Там же — Token Budget по блокам и walkthrough на примере Елены.

---

## 1.7 Топ-3 критичные ошибки

`data-section: p1_top3_problems`

Три самые частые ошибки начинающих, которые сильнее всего ломают качество карточки. Каждая разбирается подробно: симптом → причина → пошаговое исправление → пример до/после. Дополнительные проблемы → `[ref: part_09.md §9.4 — Additional Problems]`.

### Ошибка 1: Персонаж пишет за {{user}}

- **Симптом:** Модель описывает действия, мысли и реплики `{{user}}`. Диалог превращается в монолог от двух лиц.
- **Причина:** В System Prompt нет Anti-godmoding.
- **Исправление:** Добавьте в SP строку «Never speak or act for {{user}}.» → `[ref: part_08.md §8.7 — AP-6]`.

### Ошибка 2: Голос не соответствует описанию

- **Симптом:** Вы описали персонажа как «лаконичного и холодного», но модель отвечает многословно и эмоционально.
- **Причина:** Голос помещён в Description вместо Examples (правило #3 из §1.4). Модель — Pattern Matcher: она копирует паттерны из Examples, но почти не следует стилистическим директивам в Description.
- **Исправление:** Полный разбор Voice Isolation → `[ref: part_03.md §3.1 — Voice Isolation]`.

### Ошибка 3: Персонаж «слишком идеальный»

- **Симптом:** Персонаж не проявляет уязвимость, не ошибается, реагирует «правильно» на все стимулы.
- **Причина:** Anchors не имеют цены (Price). Без физической реакции Anchor = инструкция без паттерна.
- **Исправление:** Критерии качества Anchors → `[ref: part_02.md §2.2 — Anchor Rules]`.

**Bridge:** Базовые блоки определяют, ЧТО ваш персонаж из себя представляет. Behavioral Anchors указывают, КОГДА и КАК персонаж активирует конкретные паттерны поведения → Part 2.

### Что вы теперь умеете

- Понимать структуру карточки (System Prompt, Description, Examples, Greeting Message).
- Знать 3 ключевых принципа: Anchor = T→A→P, Голос только в Examples, Психология только в Description.
- Различать классический и системный подход к созданию карточек.
- Распознавать 3 критичные ошибки и знать, как их исправить.
- Знать, где найти Token Budget и Конвейер сборки.

---

## Cross-references из других Parts

- `p2_basic_anchors` — Behavioral Anchors, referenced в §1.4 (правило #1), §1.7 (ошибка #3).
- `p3_voice_isolation` — Voice Isolation, referenced в §1.4 (правило #2), §1.7 (ошибка #2).
- `p4_spine_overview` — SPINE, referenced в §1.4 (правило #3).
- `p5_ocean_basics` — OCEAN, referenced в §1.4 (правило #3, Canon planned iter 16).
- `p7a_token_budget` — Token Budget, referenced в §1.5.
- `p7a_assembly_pipeline` — Assembly Pipeline, referenced в §1.3, §1.6.
- `p8_ap6_no_anti_godmoding` — AP-6 Anti-godmoding, referenced в §1.7 (ошибка #1).
- `p9_additional_problems` — Additional Problems, referenced в §1.7.

---

## Migration Notes (iter 14 — applied 2026-06-24)

Миграция `src/master/part_01.html` против этого Canon выполнена в iter 14. Результат: 390 → 365 строк (-25, ~6.4%). Build PASS, validate:master PASS, qa без регрессий.

**Принцип применённый:** `viz > dry text` (iter 8) — визуализация = замещение, не дополнение; уникальные визуализации не удаляются. Применяется «очень деликатно».

| # | Что в master HTML | Действие | Статус | Причина / Canonical loc |
|---|-------------------|----------|--------|--------------------------|
| 1 | `<section data-section="p1_value_proposition">` h2 + intro + 4-row comparison table (Classic vs SPINE) | Оставить | DONE | Unique table — §1.1 |
| 2 | `<p>` "Этот гайд учит строить карточку как поведенческий движок..." | Оставить | DONE | Canonical intro — §1.1 |
| 3 | VS-EMBED E01 (Card Anatomy stack + token-anno на каждом блоке + token budget summary table) | Оставить | DONE | Canonical VS-marker — preamble Part 1 |
| 4 | `<section data-section="p1_card_overview">` h2 "Базовые блоки карточки" + intro paragraphs + RULE callout | Оставить | DONE | Canonical section — §1.2 |
| 5 | `<section data-section="p1_structure_overview">` h3 "Структура гайда" + `<div class="mermaid">` graph TD dependency diagram + `<h4>Содержание</h4>` + AUTO_TOC_PLACEHOLDER | Сжать | DONE | Mermaid-диаграмма дублировала auto-TOC (оба показывали порядок Parts и их связи). Mermaid удалён (33 строки), оставлен только auto-TOC. Canonical §1.2 (Structure Overview). |
| 6 | `<p>` "Этот раздел — краткий обзор базовых блоков. Порядок чтения..." + `<p>` intro linking to E01 + 4-row table (Блок / Влияние / Доля бюджета) + RULE callout | Оставить | DONE (iter 28) | iter 28 (KI#18-B): drop duplicate «Функция» column (E01 viz already shows block-content/functions), add intro paragraph linking to E01. Unique «Влияние на модель» + «Доля бюджета» columns preserved — §1.2 |
| 7 | `<section data-section="p1_core_rules">` h3 "Три ключевых принципа" + RULE callout (LLM = Pattern Matcher) + `<ol>` 3 principles | Оставить | DONE | Canonical 3 principles — §1.4 |
| 8 | `<section data-section="p1_token_budget_ref">` h3 + cross-ref paragraph | Оставить | DONE | Canonical cross-ref — §1.5 |
| 9 | `<section data-section="p1_pipeline_ref">` h3 + cross-ref paragraph | Оставить | DONE | Canonical cross-ref — §1.6 |
| 10 | `<section data-section="p1_top3_problems">` h3 + intro + 3× (h4 symptom + 3 paragraphs) + bridge paragraph + part-resume list | Оставить | DONE | Canonical Top-3 errors — §1.7 |

### Compression results (iter 14)

1 кандидат на сжатие обработан:

1. **#14 DONE** — `p1_structure_overview` `<div class="mermaid">` dependency graph (25 строк + intro paragraph «Диаграмма ниже показывает…»). Дублировал auto-TOC (placeholder `AUTO_TOC_PLACEHOLDER` ниже по файлу): оба показывали Parts и их связи. Mermaid + intro paragraph удалены (-25 строк); auto-TOC остаётся единственным навигационным артефактом. Снижает «2 mermaid blocks» из плана iter 6 до «1 mermaid block» (оставшийся в part_04, запланирован к удалению в iter 16+).

Итого: 390 → 365 строк (-25, ~6.4%). Принцип `viz > dry text` — все уникальные таблицы (comparison Classic vs SPINE, Блок/Функция/Влияние) и RULE callouts сохранены. Mermaid удалён как дубликат auto-TOC.

### DGA Phase 2 fix (iter 28 — applied 2026-07-08)

**KI#18-B FIXED.** Deployed Guide Audit Phase 2 — дедупликация таблицы `p1_card_overview` против VS-EMBED E01 (Card Anatomy) выше.

| # | Что в master HTML | Действие | Статус | Причина |
|---|-------------------|----------|--------|---------|
| 1 | `<p>` intro (новый) — ссылка на E01 viz + framing таблицы как «structural properties, not in viz» | Добавить | DONE (iter 28) | Pattern KI#18-A (Part 9): intro paragraph linking to viz before table |
| 2 | `<tr><th>Блок</th><th>Функция</th><th>Влияние на модель</th><th>Доля бюджета</th></tr>` + 4 rows × 4 cells | Сжать | DONE (iter 28) | «Функция» column duplicating E01 `.block-content` (Инструкции/Факты/Демонстрация/Первое сообщение — те же данные, что в viz). Drop «Функция» → 3 cols (Блок / Влияние на модель / Доля бюджета). Unique cols «Влияние на модель» + «Доля бюджета» preserved. |

**Result:** `src/master/part_01.html`: 365 → 367 строк (+1 — добавлен intro paragraph, 4 строки стали короче на 1 ячейку каждая). Принцип `viz > dry text` — функция блоков теперь только в viz, таблица показывает уникальные свойства.

### Validation gates (iter 28 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, baseline warnings (KI#13 baseline, no regression).
- [x] `pnpm run build` — SUCCESS.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — pass.
- [x] `pnpm run lint` — 0 errors.
- [x] `pnpm run qa:csp` — pass.
- [x] `pnpm run qa:bundle` — pass.
- [x] `pnpm run qa:doc-versions` — pass.
- [x] Front-matter updated: `Last synced: 2026-07-08 (iter 28 — DGA Phase 2 fix KI#18-B)`, `Migration status: ✅ MIGRATED (iter 14) + ✅ iter 28 DGA fix (KI#18-B)`.

### Validation gates (iter 14 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, baseline warnings (= KI#13 baseline, no regression).
- [x] `pnpm run build` — SUCCESS.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — pass.
- [x] `pnpm run lint` — 0 errors.
- [x] Front-matter updated: `Migration status: ✅ MIGRATED (iter 14)`.
