---
canonical_for: `src/master/part_08.html` (521 → 507 строк, 16 секций)
vs_embedded: E12 (Antipattern Catalog)
vs_cross_ref: none
sections: `p8_antipatterns_overview`, `p8_ap1_token_bloat`, `p8_ap2_missing_price`, `p8_ap3_voice_in_description`, `p8_ap4_ghost_in_sp`, `p8_ap5_reppen_high`, `p8_ap6_no_anti_godmoding`, `p8_ap7_presence_penalty`, `p8_ap8_ghost_no_anchors`, `p8_ap9_spine_broken`, `p8_ap10_cot_overload`, `p8_ap11_voice_bleed`, `p8_ap12_xml_malformed`, `p8_ap13_lorebook_conflict`, `p8_ap14_context_violation`, `p8_ap15_nested_anchors`
last_synced: 2026-07-08 (iter 31 — DGA Phase 2 final KI#18-G: documented keep-by-design rationale for per-AP sections vs E12 catalog viz; no master HTML edit needed)
migration_status: ✅ MIGRATED (iter 12) + ✅ iter 31 DGA keep-by-design rationale (KI#18-G)
---

# Part 8: Anti-patterns (Анти-паттерны)

## 8.1 Обзор анти-паттернов

`data-section: p8_antipatterns_overview`

<!-- difficulty: INTERMEDIATE -->
<!-- canonical: Anti-pattern overview (15 APs) -->

**Анти-паттерн** — распространённая ошибка в создании карточек, приводящая к нестабильному поведению модели. Каждый анти-паттерн имеет симптом (что наблюдается), причину (почему возникает) и решение (как исправить).

[VS: E12 — Antipattern Catalog. Сетка 5×3 с 15 AP-картами. Каждая карта: AP-ID, severity dot (high/medium), симптом, причина, fix. Замещает текстовое перечисление 15 AP в обзорной секции и даёт визуальный каталог для быстрого сканирования. **Canonical location** для сводного обзора анти-паттернов.]

**RULE:** Проверяйте карточку по этому списку перед тестом. Каждый анти-паттерн — частая ошибка, выявляемая на этапе валидации.

Полный каталог 15 анти-паттернов (AP-1 … AP-15) с симптомом, причиной и быстрым фиксом — в визуализации E12 выше. Подробный разбор каждого AP (симптом → причина → решение → before/after) — в подсекциях §8.2–§8.16 ниже. Текстовая сводная таблица убрана в iter 55 как дублирующая VS-EMBED E12 (KI#38 ✅ CLOSED).

**Cross-ref:** OCEAN Overload ранее был AP-15, в v9 restructure перенесён в Part 5 §5.3 (`p5_ocean_warning`). В каталоге E12 не отображается — см. Part 5.

---

## 8.2 AP-1: Раздувание токенов (Token Bloat)

`data-section: p8_ap1_token_bloat`

<!-- difficulty: BASIC -->

**Симптом:** Description > 800 токенов.

**Причина:** Избыточное описание, дублирование, голос в Description.

**Решение:**
- Удалите дубликаты.
- Оставьте только факты и Anchors.
- Голос → Examples (`[ref: part_03.md §3.X — Voice Isolation]`.

**Пример:** Description 1200 токенов → модель игнорирует половину → персонаж inconsistent.

### До/После: Token Bloat — Елена

| ❌ Раздутый Description (600+ токенов) | ✅ Компактный Description (~250 токенов) |
|----------------------------------------|------------------------------------------|
| Елена — журналистка-расследователь. Она циничная и недоверчивая, но за её сарказмом скрывается уязвимость. Когда-то она доверяла людям, но предательство редактора сломало её веру в людей. Она говорит короткими фразами и использует сарказм как защиту. Её глаза сужаются, когда кто-то лжёт. Она трёт шею, когда нервничает. Она отталкивает людей, когда они становятся слишком близко... *(и так далее, повторяя Anchors, SPINE и голос в Description)* | `<identity>`Елена — журналистка-расследователь. Циничная, недоверчивая, саркастичная.`</identity>` `<spine>`WANT: Доказать правоту. NEED: Принятие. FLAW: Отталкивает сарказмом при близости. LIE: "Мне не нужно одобрение." GHOST: Предательство редактора.`</spine>` `<ocean>`O:72 C:65 E:41 A:38 N:68`</ocean>` Факты + Anchors + SPINE. Голос → Examples. |

**Cross-ref:** полная карточка Елены — Part 10 (`p10_elena`).

---

## 8.3 AP-2: Отсутствующая цена (Missing Price)

`data-section: p8_ap2_missing_price`

<!-- difficulty: BASIC -->

**Симптом:** Anchor без физической цены.

**Решение:** Anchor Format: Триггер → Действие → Цена. Каждый Anchor обязан иметь Цену — без неё модель не показывает уязвимость (см. `[ref: part_02.md §2.X — Behavioral Anchors]`.

---

## 8.4 AP-3: Голос в Description

`data-section: p8_ap3_voice_in_description`

<!-- difficulty: INTERMEDIATE -->

**Симптом:** Стилистические директивы в Description.

**Решение:** Description = только факты. Голос → Examples/Greeting. Модель считывает характер из примеров диалога, а не из описания (см. `[ref: part_03.md §3.X — Voice Isolation]`.

### До/После: Voice in Description — Елена

| ❌ Голос в Description | ✅ Голос в Examples |
|------------------------|----------------------|
| Description: "Елена говорит с сарказмом, использует короткие фразы и слово 'чувак'. Она отшучивается, когда ей некомфортно." *Модель проигнорирует стилистические директивы — голос не появится в генерации.* | Description: "Елена — журналистка-расследователь. Циничная, недоверчивая." Example: `<START>` Она отложила чашку и посмотрела в окно. Дождь барабанил по стеклу. "Опять. Третий день подряд." *Сарказм, короткие фразы, конкретная деталь — голос демонстрируется, не описывается.* |

---

## 8.5 AP-4: Психология в SP (GHOST в SP)

`data-section: p8_ap4_ghost_in_sp`

<!-- difficulty: BASIC -->

**Симптом:** Психологический анализ (SPINE, GHOST) помещён в System Prompt.

**Причина:** Попытка "инструктировать" модель о характере.

**Решение:** SPINE (WANT/NEED/FLAW)/GHOST = только в Description. SP = только инструкции и запреты (см. `[ref: part_07a.md §7A.1 — System Prompt structure]`.

**RULE:** Модель не следует инструкциям о психологии. Психология должна быть в контексте (Description) — как структурированные теги (`<spine>`, `<ocean>`, `<enneagram>`), не нарративом — не в инструкциях (SP).

---

## 8.6 AP-5: RepPen > 1.10

`data-section: p8_ap5_reppen_high`

<!-- difficulty: INTERMEDIATE -->

**Симптом:** Repetition Penalty > 1.10.

**Решение:** RepPen ≤ 1.10 для character cards. Превышение 1.10 подавляет характерные паттерны речи персонажа, делая генерацию monotone (см. `[ref: part_07a.md §7A.6 — Sampling Parameters]`.

---

## 8.7 AP-6: No Anti-godmoding

`data-section: p8_ap6_no_anti_godmoding`

<!-- difficulty: BASIC -->

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

<!-- difficulty: INTERMEDIATE -->

**Симптом:** Presence Penalty > 0.

**Решение:** Presence Penalty = 0.0 для всех character cards. PP > 0 нарушает согласованность персонажа — модель начинает вводить новые темы вместо удержания характерных паттернов (см. `[ref: part_07a.md §7A.6 — Sampling Parameters]`.

---

## 8.9 AP-8: GHOST без Anchors

`data-section: p8_ap8_ghost_no_anchors`

<!-- difficulty: INTERMEDIATE -->

**Симптом:** GHOST описан, но нет Anchors, связанных с ним.

**Причина:** GHOST как описание, не как поведенческий драйвер.

**Решение:** Каждый GHOST = минимум 1 Anchor-trigger. GHOST — корень причинной цепочки SPINE, должен выражаться в поведении через Anchor.

**Пример:** Елена — GHOST "предательство редактора" → Anchor "Когда вопрос о лояльности → напрягается".

**Cross-ref:** `[ref: part_04.md §4.8 — SPINE → Anchors mapping]` (FLAW-linked Anchors обязательны).

---

## 8.10 AP-9: Сломанный SPINE (Broken SPINE)

`data-section: p8_ap9_spine_broken`

<!-- difficulty: EXPERT -->

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

<!-- difficulty: INTERMEDIATE -->

**Симптом:** > 3 CoT Anchors в карточке.

**Причина:** Попытка задать весь внутренний процесс.

**Решение:** 2–3 CoT Anchors максимум. Остальное — обычные Anchors.

**RULE:** Модель генерирует внутренние монологи вместо действий, персонаж "думает" больше чем "делает".

### ❌ CoT Overload

Карточка содержит 5 CoT Anchors. Модель тратит >50% ответа на внутренний процесс → внешний ответ обеднён.

### ✅ Максимум 2–3 CoT Anchors

Оставьте только ключевые триггеры (GHOST-связь, критический конфликт). Остальные Anchors — обычные T→A→P без CoT.

**Cross-ref:** `[ref: part_06.md §6.X — CoT Anchors]`.

---

## 8.12 AP-11: Переплетение голосов (Voice Bleed)

`data-section: p8_ap11_voice_bleed`

<!-- difficulty: EXPERT -->

**Симптом:** В мульти-персонажных сценах голоса смешиваются.

**Причина:** Недостаточное различение голосов персонажей.

**Решение:** Character Markers (Маркеры персонажа) — явные маркеры уникальности голоса. Примеры: специфичная лексика, синтаксические паттерны, телесные реакции, catchphrases. См. `[ref: part_03.md §3.X — Мульти-персонажные примеры]`.

---

## 8.13 AP-12: Невалидный XML (XML Malformed)

`data-section: p8_ap12_xml_malformed`

<!-- difficulty: EXPERT -->

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

<!-- difficulty: INTERMEDIATE -->

**Симптом:** Lorebook (база знаний) записи противоречат друг другу или Description.

**Причина:** Независимое создание записей без проверки.

**Решение:** Проверяйте консистентность всех Lorebook записей с Description. См. `[ref: part_07b.md §7B.X — Lorebook]`.

---

## 8.15 AP-14: Нарушение контекстного окна (Context Violation)

`data-section: p8_ap14_context_violation`

<!-- difficulty: INTERMEDIATE -->

**Симптом:** Карточка + контекст > контекстное окно модели.

**Причина:** Расширенная карточка для 4K модели.

**Решение:** Используйте 4K-Fallback Protocol или выберите модель с большим контекстом. См. `[ref: part_07a.md §7A.11 — 4K-Fallback]` + `[ref: part_07a.md §7A.12 — Token Budget]`.

---

## 8.16 AP-15: Nested Anchors (Вложенные Anchors)

`data-section: p8_ap15_nested_anchors`

<!-- difficulty: EXPERT -->

**Симптом:** Anchor содержит вложенные условия: «Если X, а потом Y → делает Z».

**Причина:** Попытка задать сложную поведенческую логику в одном Anchor.

**Решение:** Разбить на атомарные Anchors: один Anchor = одна связь T→A→P. Принцип атомарности. Модель не может надёжно исполнить цепочку из 3+ вложенных условий на ≤14B. См. `[ref: part_02.md §2.X — Behavioral Anchors]`.

### ❌ Вложенный Anchor

```
"Когда лгут → если уже лгали раньше → хлопает дверью → кричит: «Вон!»"
```

### ✅ Атомарные Anchors

```
"Когда лгут → сжимает челюсти → голос становится тише"
+ "Когда обнаруживает ложь повторно → хлопает дверью → уходит в другую комнату"
```

**Synthesis:** 15 анти-паттернов покрывают ~90% ошибок сборки. Симптом → причина → исправление. Наиболее частые: AP-3 (голос в Description), AP-9 (broken SPINE), AP-15 (nested Anchors).

