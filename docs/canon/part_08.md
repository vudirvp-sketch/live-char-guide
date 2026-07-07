# Part 8: Anti-patterns (Анти-паттерны)

> **Canonical source for:** `src/master/part_08.html` (521 → 507 строк, 16 секций)
> **VS elements (embedded):** E12 (Antipattern Catalog)
> **Sections (16):** `p8_antipatterns_overview`, `p8_ap1_token_bloat`, `p8_ap2_missing_price`, `p8_ap3_voice_in_description`, `p8_ap4_ghost_in_sp`, `p8_ap5_reppen_high`, `p8_ap6_no_anti_godmoding`, `p8_ap7_presence_penalty`, `p8_ap8_ghost_no_anchors`, `p8_ap9_spine_broken`, `p8_ap10_cot_overload`, `p8_ap11_voice_bleed`, `p8_ap12_xml_malformed`, `p8_ap13_lorebook_conflict`, `p8_ap14_context_violation`, `p8_ap15_nested_anchors`
> **Last synced:** 2026-07-08 (iter 31 — DGA Phase 2 final KI#18-G: documented keep-by-design rationale for per-AP sections vs E12 catalog viz; no master HTML edit needed)
> **Migration status:** ✅ MIGRATED (iter 12) + ✅ iter 31 DGA keep-by-design rationale (KI#18-G)

---

## 8.1 Обзор анти-паттернов

`data-section: p8_antipatterns_overview`

**Анти-паттерн** — распространённая ошибка в создании карточек, приводящая к нестабильному поведению модели. Каждый анти-паттерн имеет симптом (что наблюдается), причину (почему возникает) и решение (как исправить).

[VS: E12 — Antipattern Catalog. Сетка 5×3 с 15 AP-картами. Каждая карта: AP-ID, severity dot (high/medium), симптом, причина, fix. Замещает текстовое перечисление 15 AP в обзорной секции и даёт визуальный каталог для быстрого сканирования.]

**RULE:** Проверяйте карточку по этому списку перед тестом. Каждый анти-паттерн — частая ошибка, выявляемая на этапе валидации.

### Сводная таблица анти-паттернов

| AP | Название | Критичность | Быстрый фикс |
|----|----------|-------------|--------------|
| AP-1 | Token Bloat | Высокая | Удалить повторы из Description |
| AP-2 | Missing Price | Высокая | Добавить физическую цену к Behavioral Anchor |
| AP-3 | Voice in Description | Высокая | Перенести голос в Examples |
| AP-4 | GHOST в SP | Высокая | Перенести SPINE в Description |
| AP-5 | RepPen > 1.10 | Средняя | Установить RepPen ≤ 1.10 |
| AP-6 | No Anti-godmoding | Высокая | Добавить "Never speak for {{user}}" |
| AP-7 | Presence Penalty > 0 | Средняя | Установить Presence Penalty = 0 |
| AP-8 | GHOST без Anchors | Средняя | Добавить минимум 1 GHOST-Anchor |
| AP-9 | Broken SPINE | Высокая | Проверить цепочку G→L→F→N→W |
| AP-10 | CoT Overload | Средняя | Оставить 2–3 CoT Anchors |
| AP-11 | Voice Bleed | Высокая | Добавить Character Markers |
| AP-12 | XML Malformed | Средняя | Валидировать XML-теги |
| AP-13 | Lorebook Conflict | Средняя | Проверить консистентность записей |
| AP-14 | Context Violation | Высокая | Использовать 4K-Fallback Protocol |
| AP-15 | Nested Anchors | Средняя | Разбить на атомарные Anchors |

**Примечание:** OCEAN Overload ранее был AP-15, в v9 restructure перенесён в Part 5 §5.3 (`p5_ocean_warning`). В таблице не отображается — см. Part 5.

---

## 8.2 AP-1: Раздувание токенов (Token Bloat)

`data-section: p8_ap1_token_bloat`

**Симптом:** Description > 800 токенов.

**Причина:** Избыточное описание, дублирование, голос в Description.

**Решение:**
- Удалите дубликаты.
- Оставьте только факты и Anchors.
- Голос → Examples (`[ref: part_03.md §3.X — Voice Isolation]`, Canon planned iter 14).

**Пример:** Description 1200 токенов → модель игнорирует половину → персонаж inconsistent.

### До/После: Token Bloat — Елена

| ❌ Раздутый Description (600+ токенов) | ✅ Компактный Description (~250 токенов) |
|----------------------------------------|------------------------------------------|
| Елена — журналистка-расследователь. Она циничная и недоверчивая, но за её сарказмом скрывается уязвимость. Когда-то она доверяла людям, но предательство редактора сломало её веру в людей. Она говорит короткими фразами и использует сарказм как защиту. Её глаза сужаются, когда кто-то лжёт. Она трёт шею, когда нервничает. Она отталкивает людей, когда они становятся слишком близко... *(и так далее, повторяя Anchors, SPINE и голос в Description)* | `<identity>`Елена — журналистка-расследователь. Циничная, недоверчивая, саркастичная.`</identity>` `<spine>`WANT: Доказать правоту. NEED: Принятие. FLAW: Отталкивает сарказмом при близости. LIE: "Мне не нужно одобрение." GHOST: Предательство редактора.`</spine>` `<ocean>`O:72 C:65 E:41 A:38 N:68`</ocean>` Факты + Anchors + SPINE. Голос → Examples. |

**Cross-ref:** полная карточка Елены — Part 10 (`p10_elena`).

---

## 8.3 AP-2: Отсутствующая цена (Missing Price)

`data-section: p8_ap2_missing_price`

**Симптом:** Anchor без физической цены.

**Решение:** Anchor Format: Триггер → Действие → Цена. Каждый Anchor обязан иметь Цену — без неё модель не показывает уязвимость (см. `[ref: part_02.md §2.X — Behavioral Anchors]`, Canon planned iter 14).

---

## 8.4 AP-3: Голос в Description

`data-section: p8_ap3_voice_in_description`

**Симптом:** Стилистические директивы в Description.

**Решение:** Description = только факты. Голос → Examples/Greeting. Модель считывает характер из примеров диалога, а не из описания (см. `[ref: part_03.md §3.X — Voice Isolation]`, Canon planned iter 14).

### До/После: Voice in Description — Елена

| ❌ Голос в Description | ✅ Голос в Examples |
|------------------------|----------------------|
| Description: "Елена говорит с сарказмом, использует короткие фразы и слово 'чувак'. Она отшучивается, когда ей некомфортно." *Модель проигнорирует стилистические директивы — голос не появится в генерации.* | Description: "Елена — журналистка-расследователь. Циничная, недоверчивая." Example: `<START>` Она отложила чашку и посмотрела в окно. Дождь барабанил по стеклу. "Опять. Третий день подряд." *Сарказм, короткие фразы, конкретная деталь — голос демонстрируется, не описывается.* |

---

## 8.5 AP-4: Психология в SP (GHOST в SP)

`data-section: p8_ap4_ghost_in_sp`

**Симптом:** Психологический анализ (SPINE, GHOST) помещён в System Prompt.

**Причина:** Попытка "инструктировать" модель о характере.

**Решение:** SPINE (WANT/NEED/FLAW)/GHOST = только в Description. SP = только инструкции и запреты (см. `[ref: part_07a.md §7A.1 — System Prompt structure]`).

**RULE:** Модель не следует инструкциям о психологии. Психология должна быть в контексте (Description), не в инструкциях (SP).

---

## 8.6 AP-5: RepPen > 1.10

`data-section: p8_ap5_reppen_high`

**Симптом:** Repetition Penalty > 1.10.

**Решение:** RepPen ≤ 1.10 для character cards. Превышение 1.10 подавляет характерные паттерны речи персонажа, делая генерацию monotone (см. `[ref: part_07a.md §7A.6 — Sampling Parameters]`).

---

## 8.7 AP-6: No Anti-godmoding

`data-section: p8_ap6_no_anti_godmoding`

**Симптом:** Модель пишет за `{{user}}`.

**Причина:** Нет инструкции "Never speak or act for `{{user}}`" в SP.

**Решение:** Обязательно добавьте в SP:

```
Never speak or act for {{user}}.
```

### До/После

| ❌ Годмодинг | ✅ Anti-godmoding |
|--------------|-------------------|
| `{{user}} подошёл. *Она почувствовала, как сердце user забилось чаще.*` | `{{user}} подошёл. *Она отступила на шаг.* «Так... и что теперь?»` |

Позитивная формулировка ("respond only to observable actions") работает лучше чистого запрета. См. `[ref: part_07a.md §7A.1 — Anti-godmoding]`.

---

## 8.8 AP-7: Presence Penalty > 0

`data-section: p8_ap7_presence_penalty`

**Симптом:** Presence Penalty > 0.

**Решение:** Presence Penalty = 0.0 для всех character cards. PP > 0 нарушает согласованность персонажа — модель начинает вводить новые темы вместо удержания характерных паттернов (см. `[ref: part_07a.md §7A.6 — Sampling Parameters]`).

---

## 8.9 AP-8: GHOST без Anchors

`data-section: p8_ap8_ghost_no_anchors`

**Симптом:** GHOST описан, но нет Anchors, связанных с ним.

**Причина:** GHOST как описание, не как поведенческий драйвер.

**Решение:** Каждый GHOST = минимум 1 Anchor-trigger. GHOST — корень причинной цепочки SPINE, должен выражаться в поведении через Anchor.

**Пример:** Елена — GHOST "предательство редактора" → Anchor "Когда вопрос о лояльности → напрягается".

**Cross-ref:** `[ref: part_04.md §4.8 — SPINE → Anchors mapping]` (FLAW-linked Anchors обязательны).

---

## 8.10 AP-9: Сломанный SPINE (Broken SPINE)

`data-section: p8_ap9_spine_broken`

**Симптом:** SPINE-элементы не связаны логически — WANT совместим с NEED (нет конфликта), FLAW существует без объяснения.

**Причина:** WANT, NEED, FLAW, LIE, GHOST написаны независимо, без причинно-следственной связи.

**Решение:** Проверьте цепочку: GHOST → LIE → FLAW → NEED → WANT. Каждый элемент должен объясняться предыдущим. См. `[ref: part_04.md §4.7 — Полная цепочка SPINE]` и `[ref: part_04.md §4.9 — Проверка консистентности SPINE]` для canonical примеров (Елена, Выщербленный).

### ❌ Сломанный SPINE

```
GHOST: (отсутствует)  →  LIE: (отсутствует)  →  FLAW: Избегает близости
NEED: Нуждается в доверии  ←  WANT: Хочет быть любимым
```

WANT совместим с NEED — нет конфликта. FLAW блокирует BOTH — но откуда FLAW? Без объяснения через LIE/GHOST цепь разорвана.

**Критерий broken SPINE** (сохраняется как диагностика): «WANT совместим с NEED — нет конфликта» + FLAW не объяснён через LIE/GHOST. Это не то же самое, что «GHOST/LIE текстуально отсутствуют» — per Part 4 §4.1, GHOST/LIE могут быть **неявными** для простых персонажей. Diagnose broken SPINE по разрыву каузальной цепи (FLAW без корня в LIE/GHOST), а не по текстовому отсутствию элементов.

### ✅ Цельный SPINE

```
GHOST: Предательство близкого человека
  ↓
LIE: "Любовь = уязвимость = боль"
  ↓
FLAW: Отталкивает людей, когда сближается
  ↓
NEED: Доверие без стен (FLAW мешает)
  ↓
WANT: Быть любимым (совместимо с LIE — "хочу любви, но боюсь близости")
```

Цепь замкнута — каждый элемент объясняется предыдущим.

**Пример Елены — проверка SPINE:** см. `[ref: part_04.md §4.9 — Канонический пример: Елена (consistency check)]`. AP-9 не дублирует пример; canonical location = Part 4.

---

## 8.11 AP-10: Перегрузка CoT (CoT Overload)

`data-section: p8_ap10_cot_overload`

**Симптом:** > 3 CoT Anchors в карточке.

**Причина:** Попытка задать весь внутренний процесс.

**Решение:** 2–3 CoT Anchors максимум. Остальное — обычные Anchors.

**RULE:** Модель генерирует внутренние монологи вместо действий, персонаж "думает" больше чем "делает".

### ❌ CoT Overload

Карточка содержит 5 CoT Anchors. Модель тратит >50% ответа на внутренний процесс → внешний ответ обеднён.

### ✅ Максимум 2–3 CoT Anchors

Оставьте только ключевые триггеры (GHOST-связь, критический конфликт). Остальные Anchors — обычные T→A→P без CoT.

**Cross-ref:** `[ref: part_06.md §6.X — CoT Anchors]` (Canon planned iter 16).

---

## 8.12 AP-11: Voice Bleed (переплетение голосов)

`data-section: p8_ap11_voice_bleed`

**Симптом:** В мульти-персонажных сценах голоса смешиваются.

**Причина:** Недостаточное различение голосов персонажей.

**Решение:** Character Markers (Маркеры персонажа) — явные маркеры уникальности голоса. Примеры: специфичная лексика, синтаксические паттерны, телесные реакции, catchphrases. См. `[ref: part_03.md §3.X — Мульти-персонажные примеры]` (Canon planned iter 14).

---

## 8.13 AP-12: Невалидный XML (XML Malformed)

`data-section: p8_ap12_xml_malformed`

**Симптом:** Невалидные XML теги в Description.

**Причина:** Опечатки, незакрытые теги.

**Решение:** Валидация XML перед использованием. Используйте Format Lock (1 система разметки).

### ❌ Неправильно

```
<spine>
WANT: {{want}}
<spine>
```

### ✅ Правильно

```
<spine>
WANT: {{want}}
</spine>
```

**Cross-ref:** `[ref: part_07a.md §7A.9 — XML structure]` + `[ref: part_07a.md §7A.4 — Format Lock]`.

---

## 8.14 AP-13: Конфликт Lorebook (Lorebook Conflict)

`data-section: p8_ap13_lorebook_conflict`

**Симптом:** Lorebook (база знаний) записи противоречат друг другу или Description.

**Причина:** Независимое создание записей без проверки.

**Решение:** Проверяйте консистентность всех Lorebook записей с Description. См. `[ref: part_07b.md §7B.X — Lorebook]` (Canon planned iter 16).

---

## 8.15 AP-14: Нарушение контекстного окна (Context Violation)

`data-section: p8_ap14_context_violation`

**Симптом:** Карточка + контекст > контекстное окно модели.

**Причина:** Расширенная карточка для 4K модели.

**Решение:** Используйте 4K-Fallback Protocol или выберите модель с большим контекстом. См. `[ref: part_07a.md §7A.11 — 4K-Fallback]` + `[ref: part_07a.md §7A.12 — Token Budget]`.

---

## 8.16 AP-15: Nested Anchors (Вложенные Anchors)

`data-section: p8_ap15_nested_anchors`

**Симптом:** Anchor содержит вложенные условия: «Если X, а потом Y → делает Z».

**Причина:** Попытка задать сложную поведенческую логику в одном Anchor.

**Решение:** Разбить на атомарные Anchors: один Anchor = одна связь T→A→P. Принцип атомарности. Модель не может надёжно исполнить цепочку из 3+ вложенных условий на ≤14B. См. `[ref: part_02.md §2.X — Behavioral Anchors]` (Canon planned iter 14).

### ❌ Вложенный Anchor

```
"Когда лгут → если уже лгали раньше → хлопает дверью → кричит: «Вон!»"
```

### ✅ Атомарные Anchors

```
"Когда лгут → сжимает челюсти → голос становится тише"
+ "Когда обнаруживает ложь повторно → хлопает дверью → уходит в другую комнату"
```

---

## Что вы теперь умеете (resume)

- Распознавать все 15 анти-паттернов по симптомам (AP-1..AP-15).
- Применять исправления для каждого анти-паттерна.
- Проверять карточку на Token Bloat (AP-1) и Missing Price (AP-2).
- Обнаруживать Voice Bleed (AP-11) и XML Malformed (AP-12).
- Понимать, почему Nested Anchors (AP-15) создают непредсказуемость.

**Bridge:** Анти-паттерны указывают, чего избегать. Диагностика показывает, работает ли ваша карточка на самом деле. → `[ref: part_09.md]` (Canon, planned iter 13).

---

## Cross-references из других Parts

- `p2_anchor_rules` — Behavioral Anchors, referenced в §8.3 (AP-2), §8.16 (AP-15).
- `p3_voice_isolation` — Voice Isolation, referenced в §8.2 (AP-1), §8.4 (AP-3).
- `p3_multi_char` — Multi-character scenes, referenced в §8.12 (AP-11).
- `p4_spine_full_chain` — Full SPINE chain, referenced в §8.10 (AP-9).
- `p4_spine_check` — SPINE consistency check, referenced в §8.10 (AP-9, canonical Elena example).
- `p4_spine_mapping` — SPINE → Anchor mapping, referenced в §8.9 (AP-8, FLAW-linked Anchors).
- `p5_ocean_warning` — OCEAN Overload, referenced в §8.1 (summary table, former AP-15).
- `p6_cot_basics` — CoT Anchors, referenced в §8.11 (AP-10).
- `p7a_system_prompt` — System Prompt structure, referenced в §8.5 (AP-4), §8.7 (AP-6).
- `p7a_sampling_params` — Sampling parameters, referenced в §8.6 (AP-5), §8.8 (AP-7).
- `p7a_4k_fallback` — 4K-Fallback, referenced в §8.15 (AP-14).
- `p7a_xml_tags` — XML structure, referenced в §8.13 (AP-12).
- `p7b_lorebook_basics` — Lorebook, referenced в §8.14 (AP-13).
- `p10_elena` — Полная карточка Елены, referenced в §8.2 (AP-1).

---

## Migration Notes (iter 12 — applied 2026-06-24)

Миграция `src/master/part_08.html` против этого Canon выполнена в iter 12. Результат: 521 → 507 строк (-14, ~2.7%). Build PASS, validate:master PASS, qa без регрессий.

**Принцип применённый:** `viz > dry text` (iter 8) — визуализация = замещение, не дополнение; уникальные визуализации не удаляются. Применяется «очень деликатно».

| # | Что в master HTML | Действие | Статус | Причина / Canonical loc |
|---|-------------------|----------|--------|--------------------------|
| 1 | VS-EMBED E12 (ap-grid, 15 AP-cards) | Оставить | DONE | Canonical VS-marker — §8.1 |
| 2 | `<p>` "Анти-паттерны — конкретные ошибки..." (intro #1) | Оставить | DONE | Canonical intro — §8.1 |
| 3 | `<p>` "**Анти-паттерн** — распространённая ошибка..." (intro #2) | Сжать | DONE | Объединён с intro #1 — оба абзаца определяли одно и то же понятие. Сжаты до одного §8.1 intro параграфа в Canon. |
| 4 | `<div class="callout rule">` RULE: Проверяйте карточку | Оставить | DONE | Canonical RULE — §8.1 |
| 5 | `<h3>Сводная таблица анти-паттернов` + `<table>` (16 rows) | Оставить | DONE | Уникальная navigation table — §8.1. "Быстрый фикс" column ≠ E12 card fix (более краткая форма). OCEAN Overload row уникальна (redirect на Part 5, не AP section). |
| 6 | AP-1 `<div class="antipattern-card">` + symptom/cause/solution | Оставить | DONE | Canonical — §8.2 |
| 7 | AP-1 `<div class="example-block">` Пример: Description 1200 токенов | Оставить | DONE | Canonical example — §8.2 |
| 8 | AP-1 `<div class="diff-view">` До/После: Token Bloat — Елена | Оставить | DONE | Unique diff example — §8.2 (не дублирует Part 4 / Part 10) |
| 9 | AP-2 `<div class="antipattern-card">` symptom + solution + cross-ref | Оставить | DONE | Canonical — §8.3 |
| 10 | AP-3 `<div class="antipattern-card">` symptom + solution | Оставить | DONE | Canonical — §8.4 |
| 11 | AP-3 `<div class="diff-view">` До/После: Voice in Description — Елена | Оставить | DONE | Unique diff example — §8.4 |
| 12 | AP-4 `<div class="antipattern-card">` + RULE callout | Оставить | DONE | Canonical RULE — §8.5 |
| 13 | AP-5 `<div class="antipattern-card">` symptom + solution + cross-ref | Оставить | DONE | Canonical — §8.6 |
| 14 | AP-6 `<div class="antipattern-card">` + `<pre><code>` "Never speak..." | Оставить | DONE | Canonical template — §8.7 |
| 15 | AP-6 `<p>` До/После с year code inline | Оставить | DONE | Unique anti-pattern pair — §8.7 |
| 16 | AP-7 `<div class="antipattern-card">` symptom + solution + cross-ref | Оставить | DONE | Canonical — §8.8 |
| 17 | AP-8 `<div class="antipattern-card">` + example Елена GHOST-Anchor | Оставить | DONE | Canonical example — §8.9 |
| 18 | AP-9 `<div class="antipattern-card">` symptom + cause + solution | Оставить | DONE | Canonical — §8.10 |
| 19 | AP-9 `<div class="problem-block">` ❌ Сломанный SPINE | Оставить | DONE | Unique broken-SPINE example — §8.10 (не дублирует Part 4) |
| 20 | AP-9 `<div class="solution-block">` ✅ Цельный SPINE (generic) | Оставить | DONE | Unique generic full-SPINE example — §8.10 (не дублирует Part 4 Elena/Vysherblenny examples) |
| 21 | AP-9 `<p>` Пример: Елена — проверка SPINE + `<pre><code>` | Сжать | DONE | Удалён. Дублировал canonical Elena SPINE check в `[ref: part_04.md §4.9 — Канонический пример: Елена (consistency check)]`. Заменён на 1-строчный cross-ref. |
| 22 | AP-10 `<div class="antipattern-card">` + RULE callout | Оставить | DONE | Canonical RULE — §8.11 |
| 23 | AP-10 `<div class="problem-block">` + `<div class="solution-block">` ❌/✅ | Оставить | DONE | Unique anti-pattern pair — §8.11 |
| 24 | AP-11 `<div class="antipattern-card">` + cross-ref Part 3 | Оставить | DONE | Canonical — §8.12 |
| 25 | AP-12 `<div class="antipattern-card">` + `<pre><code>` ❌/✅ XML | Оставить | DONE | Unique XML example pair — §8.13 |
| 26 | AP-13 `<div class="antipattern-card">` + cross-ref Part 7B | Оставить | DONE | Canonical — §8.14 |
| 27 | AP-14 `<div class="antipattern-card">` + cross-ref Part 7A 4K-Fallback | Оставить | DONE | Canonical — §8.15 |
| 28 | AP-15 `<div class="problem-block">` + `<div class="solution-block">` + `<pre><code>` ❌/✅ Anchors | Оставить | DONE | Unique Anchor example pair — §8.16 |
| 29 | `<p class="bridge-paragraph">` Bridge to Part 9 | Оставить | DONE | Canonical bridge — §"Что вы теперь умеете" |
| 30 | `<div class="part-resume">` resume list | Оставить | DONE | Canonical resume |
| 31 | `<p>` bridge paragraphs between AP sections (lines 348, 413, 444, 467) | Оставить | DONE | Unique narrative transitions, не дубликаты |

### Compression results (iter 12)

2 кандидата на сжатие обработаны:

1. **#3 DONE** — Overview intro paragraph #2 ("**Анти-паттерн** — распространённая ошибка...") — объединён с intro #1 в один параграф. Дублировал определение "анти-паттерн".
2. **#21 DONE** — AP-9 "Пример: Елена — проверка SPINE" `<pre><code>` блок — удалён, заменён на 1-строчный cross-ref на Part 4 §4.9 (canonical location Elena SPINE check).

Итого: 521 → 507 строк (-14, ~2.7%). Принцип `viz > dry text` — все уникальные diff examples (AP-1, AP-3, AP-12, AP-15), RULE callouts, anti-pattern pairs сохранены.

### Validation gates (iter 12 — PASSED)

- [x] `pnpm run validate:master` — 0 errors, 123 warnings (= KI#13 baseline, no change).
- [x] `pnpm run build` — SUCCESS.
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — 43/43 pass.
- [x] `pnpm run lint` — 0 errors (10 pre-existing warnings).
- [x] Front-matter updated: `Migration status: ✅ MIGRATED (iter 12)`.

---

## DGA Phase 2 final (iter 31 — applied 2026-07-08)

**KI#18-G — KEEP-BY-DESIGN (no master HTML edit).** Deployed Guide Audit Phase 2 final — анализ дублирования между VS-EMBED E12 (Antipattern Catalog) и per-AP секциями (AP-1..AP-15). Принцип `viz > dry text` (iter 8+) — viz = замещение, не дополнение; но **catalog vs detail pattern** — intentional design, not duplication.

### Catalog vs Detail rationale

| Aspect | E12 viz (catalog) | Per-AP sections (detail) |
|--------|-------------------|--------------------------|
| **Purpose** | Visual checklist — quick scan all 15 APs on one screen | Deep-dive reference — learn each AP with examples |
| **Symptom** | 1-line generic phrase (e.g., «Раздувание токенов») | Concrete threshold (e.g., «Description > 800 токенов») |
| **Cause** | 1-line generic phrase | Expanded multi-factor explanation |
| **Fix** | 1-line action (e.g., «Сократите до стандартного бюджета. Перенесите детали в Lorebook.») | Multi-step list with cross-ref links to canonical Parts (Part 2, 3, 4, 5, 6, 7A, 7B) |
| **Examples** | None | Concrete diff-views (AP-1 Elena before/after, AP-3 Elena before/after, AP-12 XML malformed code blocks, AP-15 nested anchors code, AP-9 broken/full SPINE) |
| **Callouts** | None | RULE callouts (AP-4, AP-10), ILLUSTRATION labels |
| **Reader intent** | «Какие APs существуют?» (scan/lookup) | «Как применить fix к этому AP?» (deep-dive) |

### Decision

Per-AP секции добавляют **substantial unique content** beyond viz: concrete thresholds, multi-step solutions, cross-ref links, diff examples, RULE callouts. **Catalog (viz) vs Detail (per-AP sections)** — это intentional design pattern, не дублирование. Viz = scan/lookup tool (15 APs on one screen, visual severity dots, quick recognition). Per-AP sections = deep-dive reference with examples and cross-refs.

**Принцип `viz > dry text` применяется к pure re-explanation** (когда текст пере-объясняет концепцию, уже показанную в viz). Catalog vs Detail — это **different reader intents**, не pure re-explanation. Per iter 12 Migration Notes (item #5), сводная таблица `p8_antipatterns_overview` также оставлена как unique navigation table — «Быстрый фикс» column ≠ E12 card fix (более краткая форма). Это тот же catalog-vs-detail pattern на уровне table.

**Action:** No master HTML edit. Rationale documented here. KI#18-G ✅ CLOSED as keep-by-design.

### Validation gates (iter 31 — PASSED, no master HTML change)

- [x] `pnpm run validate:master` — 0 errors, 23 baseline warnings (no regression, no part_08 new warnings).
- [x] `pnpm run build` — SUCCESS, hash `fd3d96d3` unchanged (no source code change).
- [x] `pnpm run validate` — все 8 gates passed.
- [x] `pnpm run test:unit` — 43/43 pass.
- [x] `pnpm run lint` — 0 errors, baseline warnings.
- [x] `pnpm run qa:csp` — pass.
- [x] `pnpm run qa:bundle` — pass.
- [x] `pnpm run qa:doc-versions` — pass.
- [x] Front-matter updated: `Last synced: 2026-07-08 (iter 31 — DGA Phase 2 final KI#18-G)`, `Migration status: ✅ MIGRATED (iter 12) + ✅ iter 31 DGA keep-by-design rationale (KI#18-G)`.
