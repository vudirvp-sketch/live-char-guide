# AUDIT_VERIFICATION.md — iter 33 (verified), iter 35 (P0 ✅ applied), iter 36 (P1 ✅ applied), iter 37 (P2 ✅ applied)

> **Назначение:** Перепроверка аудита канона из iter 33. Подтверждение / опровержение / уточнение каждого пункта A1–G5. Финальный пошаговый план работ (P0→P1→P2→P3) с конкретными правками.
> **Дата:** 2026-07-08
> **Build hash baseline:** `69d9b813` (изменён в iter 34 — KI#23 fix; iter 35 P0 ✅ CLOSED, iter 36 P1 ✅ CLOSED, iter 37 P2 ✅ CLOSED, hash unchanged — canon не в hash computation)
> **Источник аудита:** прошлый чат iter 33 (525-строчный paste от пользователя)
> **iter 35 (P0) ✅ CLOSED:** 16 правок применены (см. §4.1 — каждая правка помечена ✅ DONE iter 35). Build hash `69d9b813` unchanged.
> **iter 36 (P1) ✅ CLOSED:** 11 правок применены (см. §4.2 — каждая правка помечена ✅ DONE iter 36). Build hash `69d9b813` unchanged.
> **iter 37 (P2) ✅ CLOSED:** 18 правок применены (см. §4.3 — каждая правка помечена ✅ DONE iter 37). Canon total: 5 035 → 3 905 строк (−1 130). Build hash `69d9b813` unchanged.

---

## 1. Контекст

В iter 33 выполнен CONTENT AUDIT (без правок) — прочитан весь канон `docs/canon/` (14 файлов, 5 008 строк) и подготовлен детальный список противоречий/проблем (A1–A10, B1–B6, C1–C8, D1–D7, E1–E7, F1–F10, G1–G5, ~50 пунктов). Пользователь запросил перепроверку: убедиться, что все пункты корректны, ничего не упущено, ничего не сделает хуже, и зафиксировать финальный «фронт работ».

В iter 33 (этот чат) каждый пункт сверен с фактическим текстом канонических файлов. Найдены:
- 1 пункт **НЕВАЛИДНЫЙ** (B3) — аудит переоценил длину Examples.
- 2 пункта **УТОЧНЕНЫ** (B5, B2) — формулировка слегка неточна.
- 2 пункта **УСИЛЕНЫ** (B4, F1) — проблема шире, чем описано.
- 3 **НОВЫХ** пункта найдены при перепроверке — добавлены в фронт работ.

Правок в канон не внесено — это верификация, не итерация правок (как и просил пользователь в исходной задаче).

---

## 2. Сводная таблица верификации

| ID | Статус | Описание | Файл(ы) |
|----|--------|----------|---------|
| **A1** | ✅ CONFIRMED | T→A→P «Price» vs «Pattern» в Glossary | `appendix_glossary.md` L175 |
| **A2** | ✅ CONFIRMED | Елена OCEAN 3 экстремума vs 1+2 cautious в §7A.13 | `part_07a.md` L666 |
| **A3** | ✅ CONFIRMED + STRENGTHENED | Счётчик вырезаний 2 vs 3 уровня (внутренняя несогласованность в part_10: L500=2, L514=3) | 4 места |
| **A4** | ✅ CONFIRMED | NEED Выщербленного — 3 разные формулировки | `part_04.md` L151/L152/L197, `part_10.md` L383, `part_07a.md` L394 |
| **A5** | ✅ CONFIRMED | AP-9 ❌ пример: absent GHOST/LIE отмечен как broken SPINE, противоречит Part 4 §4.1 | `part_08.md` L181-188 |
| **A6** | ✅ CONFIRMED | AP-15 ❌ пример: «замолкает на час» = отложенная цена | `part_08.md` L313 |
| **A7** | ✅ CONFIRMED | «Счётчик вырезаний» секция AN не описана в «Пояснение секций AN» | `part_07a.md` L244 (пример) vs L250-256 (таблица) |
| **A8** | ✅ CONFIRMED | §8.1 таблица: 15 AP + 1 без номера, запутывает | `part_08.md` L21-42 |
| **A9** | ✅ CONFIRMED | §9.11 resume: «3-уровневая шкала (Critical/Bad/Good)» vs §9.1 4 зоны | `part_09.md` L282 |
| **A10** | ✅ CONFIRMED | §9.11 два разных набора «Quick Check 5 items» | `part_09.md` L207-213 vs L245-253 |
| **B1** | ✅ PARTIALLY CONFIRMED | GHOST Омнис = «страх» (вывод, не событие) ✓; FLAW = абстракция ✓; LIE «Эмоция — слабость плоти» — borderline OK (кредо, которое персонаж мог бы сказать) | `part_10.md` L236-238 |
| **B2** | ✅ CONFIRMED + REFINED | «Унижение» — ярлык; фикс = убрать слово, не переписывать | `part_10.md` L134 |
| **B3** | ❌ **INVALID** | Examples Омнис 50–65 токенов каждый (с annotation), НЕ 150–180. Аудит переоценил. | `part_10.md` L260-296 |
| **B4** | ✅ CONFIRMED + STRENGTHENED | Tier 1/2/3 используется в 3 разных значениях (Examples quality, CoT complexity, GHOST Layers) — конфликт шире, чем «не используется далее» | `part_03.md` §3.4, `part_06.md`, `part_10.md` |
| **B5** | ✅ PARTIALLY CONFIRMED | Из 5 типов Anchors в §4.8 БЕЗ определения 3 (не 4): Psychological, At-rest, Growth. Sensory (Part 2 §2.6) и FLAW-linked (§4.8 детально) определены. | `part_04.md` L219-225 |
| **B6** | ✅ CONFIRMED | Tier 0: text «12B» vs viz «12B+» | `part_06.md` L73 vs L11 |
| **C1–C8** | ✅ CONFIRMED (subjective fix) | Англицизмы, метки callout, кавычки, тире | все |
| **D1** | ✅ CONFIRMED | dual-Elena GHOST (explicit note в §4.2 L70) | `part_04.md` L66-70 |
| **D2** | ✅ CONFIRMED | variant'ы Выщербленного в Part 4 — мёртвый код | `part_04.md` L93, L152 |
| **D3** | ✅ CONFIRMED | Greeting Елены — 2 разные сцены | `part_07b.md` L63 vs `part_10.md` L94 |
| **D4** | ✅ CONFIRMED + STRENGTHENED | Lorebook Елены использует secondary GHOST (пожар). Та же проблема в `part_07a.md` L667 walkthrough. | `part_07b.md` §7B.3 + `part_07a.md` L667 |
| **D5** | ✅ CONFIRMED | HTML-комментарии `<!-- Demonstrates: ... -->` на английском внутри русского описания | `part_10.md` (5 карточек) |
| **D6** | ✅ CONFIRMED | Йоуёма — только в `part_03.md` §3.8, без контекста, без cross-refs | `part_03.md` L205-250 |
| **D7** | ✅ CONFIRMED | Уолтер Уайт — только в `part_10.md` §10.2, без cross-refs из других Parts | `part_10.md` L104-191 |
| **E1–E7** | ✅ CONFIRMED | Front-matter / Migration Notes / Validation gates / Cross-refs ending / resume / orphan §1.3 / Pattern Matcher 3 раза | все |
| **F1** | ✅ CONFIRMED + STRENGTHENED | «Canon planned iter 13/14/16» — 30+ устаревших заглушек, не 5. Parts уже MIGRATED. | все canon-файлы |
| **F2–F10** | ✅ CONFIRMED | Локальные проблемы (типы Price без примеров, проценты без источника, cautious zone без определения, `<br/>` в markdown, Keirsey vs MBTI, и т.д.) | разные |
| **G1–G5** | ✅ CONFIRMED (suggestions) | Нет «Как читать», нет TL;DR, нет glossary-on-first-use, нет карты персонажей, нет pre-build checklist | новые секции |

### Новые пункты, найденные при верификации

| ID | Описание | Файл |
|----|----------|------|
| **NEW-1** (KI#19-stray) | Китайский символ «待» в `part_04.md` L366 — другой артефакт, не покрытый KI#19 (тогда правили master HTML L269 с «线索»). | `part_04.md` L366 |
| **NEW-2** (Lorebook walkthrough inconsistency) | `part_07a.md` L667 walkthrough Елены даёт пример Lorebook с ключом «пожар, огонь» — это secondary GHOST, тогда как primary = «предательство редактора». Усиливает D4. | `part_07a.md` L667 |
| **NEW-3** (§5.1 vs §5.3 conflict) | §5.1 RULE (L23): «1–2 экстремальных полюса». §5.3 (L102): «максимум 3 экстремума для 8K+». §5.3 контекстные лимиты (L37-42): «16K+ — 3-4 полюса». Три формулировки одного правила. | `part_05.md` L23/L37-42/L102 |

---

## 3. Уточнения к исходному аудиту

### 3.1. B3 — НЕВАЛИДНЫЙ (аудит переоценил длину Examples)

**Аудит сказал:** «каждый `<START>` блок ~150–180 токенов с annotations `<!-- Demonstrates: ... -->`. Нарушение правила длины в каноническом примере.»

**Фактически:** Каждый `<START>` блок Омнис-Зета (`part_10.md` L260-296) — 25-35 русских слов = ~50-65 токенов с annotation. Правило Part 3 §3.3 L91: «80-120 токенов (40-80 минимально)». Все Examples **в пределах лимита**.

**Действие:** B3 удалить из фронта работ. Аудит переоценил.

### 3.2. B5 — УТОЧНЕН (3 типа без определения, не 4)

**Аудит сказал:** «Из них 4 новых, без определений и без отсылки к Part 2.»

**Фактически:**
- Sensory Anchor — определён в Part 2 §2.6 (L144).
- FLAW-linked Anchor — определён в Part 4 §4.8 (L227-229, subsection «детально»).
- **Psychological Anchor** — НЕ определён нигде.
- **At-rest Anchor** — НЕ определён нигде.
- **Growth Anchor** — НЕ определён нигде.

**Действие:** B5 оставить, но формулировку поправить: «3 из 5 типов Anchors в §4.8 не имеют определений». Не 4.

### 3.3. B2 — УТОЧНЕН (объём фикса меньше, чем предлагает аудит)

**Аудит предлагает:** «Нужно: «Партнёры стали миллиардерами. Я стою на школьной парковке в подержанном Pontiac Aztek.»»

**Фактически:** Существующая формулировка уже содержит событие («продал свою долю за $5000, наблюдал, как партнёры стали миллиардерами»). Проблема только в слове «Унижение» (вывод-ярлык).

**Действие:** B2 оставить, но фикс = убрать слово «Унижение от того, что он сам ушёл, а его оставили позади» (или заменить на конкретное наблюдение). Не переписывать с нуля.

### 3.4. B4 — УСИЛЕН (Tier 1/2/3 используется в 3 значениях, не просто «не используется»)

**Аудит сказал:** «Tier 1/2/3 из Part 3 — изолированная подсистема, которая вводится, не применяется.»

**Фактически:** Tier 1/2/3 — overloaded термин, используется в 3 разных смыслах:
1. **Part 3 §3.4** — Examples quality (Tier 1=✓, Tier 2=⚠, Tier 3=✗)
2. **Part 6 §6.3** — CoT complexity (Tier 0/1/2/3 by model size)
3. **Part 10 §10.4** — GHOST Layers (Tier 1/2/3 by trauma depth)

Это не просто «не используется», а **конфликт имён** — один и тот же термин в трёх смыслах. Читатель должен различать по контексту.

**Действие:** B4 оставить + добавить рекомендацию: переименовать Part 3 §3.4 Tier 1/2/3 → «Quality Grade A/B/C» (или подобное), устранить коллизию.

### 3.5. F1 — УСИЛЕН (30+ заглушек, не 5)

**Аудит сказал:** «Part 1 §1.4 правило #3 — устаревшая заглушка `[ref: part_05.md §5.X — OCEAN]` **(Canon planned iter 16)**. Ta же проблема в нескольких местах.»

**Фактически:** `rg "Canon planned iter 1[3-6]"` в `docs/canon/` находит **30+ совпадений** в 9 canon-файлах. Все Parts 2-10 уже MIGRATED (iter 14-16). Заглушки устарели массово.

**Действие:** F1 оставить, объём работ увеличить с «~15 строк» до «~30 строк (30+ заглушек)».

### 3.6. NEW-1 — Китайский символ «待» в part_04.md

`part_04.md` L366: `## Cross-references из других Parts (待 — будет заполнено при миграции других Parts)`

«待» — китайский иероглиф (dài = «ждать/ожидать»). Не покрыт KI#19 (тогда правили master HTML L269 с «线索»). Должно быть «TODO» или просто удалено, т.к. Part 4 уже MIGRATED — Cross-references секция должна быть заполнена.

**Действие:** Добавить как KI#21 sub-item (NEW-1).

### 3.7. NEW-2 — Lorebook walkthrough Елены в part_07a §7A.13 даёт secondary GHOST

`part_07a.md` L667: «Lorebook для GHOST-фактов: Настройте записи для сенсорных триггеров. Пример для Елены: Key «пожар, огонь» → Content «В 7 лет стояла во дворе и смотрела, как пламя охватывает крышу».»

Это secondary GHOST (пожар). Если primary = «предательство редактора», то canonical пример Lorebook должен быть про Марину/редактора. D4 уже покрывает `part_07b.md` §7B.3 — NEW-2 добавляет ещё одно место.

**Действие:** Объединить с D4 в одну правку (синхронизировать primary GHOST в 3 местах: part_04 §4.5, part_07a L667, part_07b §7B.3).

### 3.8. NEW-3 — §5.1 vs §5.3 vs §5.3 context-table — три формулировки одного правила

В `part_05.md`:
- §5.1 RULE (L23): «Только 1–2 экстремальных полюса OCEAN (значения <30 или >70)».
- §5.3 (L84): «### Конфликт-сценарии при 3+ экстремальных полюсах».
- §5.3 (L102): «максимум 3 экстремума для 8K+, 2 для 4K».
- §5.3 context-table (L37-42): 4K=1-2, 8K=2-3, 16K+=3-4, 32K+=5 (полный).

Три разных формулировки: «1-2», «максимум 3 для 8K+», «до 4 для 16K+, до 5 для 32K+». Читатель не понимает, какое правило canonical.

**Действие:** Зафиксировать единое правило в §5.1, в §5.3 — ссылка + контекстные лимиты. NEW-3.

---

## 4. Финальный фронт работ (P0 → P1 → P2 → P3)

Каждый приоритет = одна итерация (iter 35 = P0 ✅, iter 36 = P1, iter 37 = P2, iter 38 = P3). После каждой — validation gates и архив.

### 4.1. P0 — Критические противоречия (iter 35) ✅ CLOSED

**Цель:** Устранить 16 критических противоречий, где канон противоречит сам себе. Все правки — точечные (1-15 строк каждая).

**iter 35 ✅ CLOSED:** Все 16 правок применены в iter 35. Build hash `69d9b813` unchanged. Все validation gates PASS + `audit_vs_embeds.py` 0 regressions.

| # | Item | Файл + строка | Правка (before → after) |
|---|------|---------------|--------------------------|
| P0-1 | **A1** | `appendix_glossary.md` L175 | `**T→A→P (Trigger → Action → Pattern)**` → `**T→A→P (Trigger → Action → Price)**` |
| P0-2 | **A2 + F8 + NEW-2 (partial)** | `part_07a.md` L666 | `Елена: O:72, C:65, E:41, A:38, N:68. Enneagram: 6w5. Экстремальных полюса: 3 (для 8K+ контекста — допустимо; для 4K оставьте только N=68 и A=38).` → `Елена: O:72, C:65, E:41, A:38, N:68. Enneagram: 6w5. Экстремальных полюса: 1 (O=72 > 70). A=38 и N=68 — cautious zone (30-40 / 60-70), напрямую связаны с FLAW и GHOST. Соответствует строгому правилу §5.1.` |
| P0-3 | **A3** | `part_04.md` L334 | `после 3-го не помнит имя, после 5-го — зачем помогает` → `после 3-го не помнит имя, после 5-го — зачем помогает, после 7-го — что такое "помощь"` |
| P0-4 | **A3** | `part_07a.md` L244 | `после третьего не помнит имя, после пятого — зачем помогает.` → `после третьего не помнит имя, после пятого — зачем помогает, после седьмого — что такое "помощь".` |
| P0-5 | **A3** | `part_07a.md` L404-405 | `после 3-го не помнит имя, после 5-го — зачем помогает` → `после 3-го не помнит имя, после 5-го — зачем помогает, после 7-го — что такое "помощь"` |
| P0-6 | **A3** | `part_10.md` L500 | `после третьего не помнит имя, после пятого — зачем помогает.` → `после третьего не помнит имя, после пятого — зачем помогает, после седьмого — что такое "помощь".` |
| P0-7 | **A4** | `part_04.md` L151 (table NEED) | `Принять утраты как часть себя` → `Принять, что полноценности не существует. Выбрать, как растворяться — в функции или в диссонансе.` (синхронизировать с `part_10.md` L383, `part_07a.md` L394) |
| P0-8 | **A4** | `part_04.md` L197 (full chain) | `NEED: Принять утраты как часть себя, не заменять чужой памятью` → `NEED: Принять, что полноценности не существует. Выбрать, как растворяться — в функции или в диссонансе.` |
| P0-9 | **A4** | `part_04.md` L152 (variant row) | Удалить variant-строку полностью (см. D2) |
| P0-10 | **A6** | `part_08.md` L313 | `"Когда лгут → если уже лгали раньше → хлопает дверью → замолкает на час"` → `"Когда лгут → если уже лгали раньше → хлопает дверью → кричит: «Вон!»"` (immediate Price, не отложенный) |
| P0-11 | **A9** | `part_09.md` L282 | `Оценивать качество карточки по 3-уровневой шкале (Critical / Bad / Good).` → `Оценивать качество карточки по 4-зонной шкале (Критический / Слабой / Хороший / Отличный).` |
| P0-12 | **A10** | `part_09.md` L245-253 (Vyshcherblenny Quick Check) | Переименовать заголовок `**Quick Check (5 items):**` → `**Структурная проверка Выщербленного (5 items — отлична от universal Quick Check выше):**` + добавить 1-строчное пояснение: «Это structural check SP/Description/Examples/Greeting для конкретной карточки, не universal parameter checklist.» |
| P0-13 | **B1 (GHOST)** | `part_10.md` L238 | `GHOST: Страх устаревания — боится, что собственные аугментации будут признаны устаревшими, а сам он — списанным как сломанный сервитор` → `GHOST: Первая аугментация заменила левый глаз на линзу переменного фокуса. В тот день перестал различать оттенки боли — чужой и собственной. (См. Tier 1/2 GHOST Layers ниже для полной хронологии.)` |
| P0-14 | **B1 (FLAW)** | `part_10.md` L236 | `FLAW: Утрата человечности — теряет способность к эмпатии, не понимает страх и боль органиков` → `FLAW: Анализирует эмоции органиков как «сбои химической регуляции», предлагает «калибровку» вместо утешения` (конкретное поведение, не прилагательное) |
| P0-15 | **NEW-1** | `part_04.md` L366 | `## Cross-references из других Parts (待 — будет заполнено при миграции других Parts)` → `## Cross-references из других Parts` + заполнить секцию реальными cross-refs (Part 2/3/5/6/7A/8/9/10 ссылаются на Part 4 §4.X) |
| P0-16 | **NEW-3** | `part_05.md` L23 | `**RULE:** Золотое правило профиля: Только 1–2 экстремальных полюса OCEAN (значения <30 или >70). Каждый дополнительный экстремальный полюс снижает стабильность поведения. Нарушение = OCEAN Value Conflicts (см. §5.3).` → `**RULE:** Золотое правило профиля: Только 1–2 экстремальных полюса OCEAN (значения <30 или >70) — рекомендуемый максимум для всех контекстов. Для 8K+ допустимо до 3, для 16K+ — до 4 (см. §5.3 контекстные лимиты). Каждый дополнительный полюс сверх рекомендации снижает стабильность поведения. Нарушение = OCEAN Value Conflicts (см. §5.3).` |

**Итого P0:** 16 правок в 6 файлах (appendix_glossary.md, part_04.md, part_05.md, part_07a.md, part_08.md, part_09.md, part_10.md). ~25 строк net edits.

**Validation gates P0:**
```bash
pnpm run validate:master    # 0 errors, baseline warnings
pnpm run build              # SUCCESS, hash 69d9b813 (если только canon-контент правки)
pnpm run validate           # 8 gates PASS
pnpm run test:unit          # 43/43
pnpm run lint               # 0 errors
pnpm run qa:csp             # 0 inline scripts
pnpm run qa:bundle          # ≤500KB
pnpm run qa:doc-versions    # PASS
python3 scripts/audit_vs_embeds.py  # 0 regressions
```

**Ожидаемый результат:** build hash остаётся `69d9b813` (только canon-контент правки, master HTML не трогается). Если хеш изменится — диагностировать, что задето в master HTML.

---

### 4.2. P1 — Противоречия «пример vs правило» + дубли/мёртвый код (iter 36) ✅ CLOSED

**Цель:** Устранить противоречия между каноническими примерами и каноническими правилами. Удалить мёртвый код (variant'ы, dual-Elena secondary).

**iter 36 ✅ CLOSED:** Все 11 правок применены в iter 36. Build hash `69d9b813` unchanged. Все validation gates PASS + `audit_vs_embeds.py` 0 regressions.

| # | Item | Файл + строка | Правка |
|---|------|---------------|--------|
| P1-1 | **A5** ✅ DONE iter 36 | `part_08.md` §8.10 AP-9 ❌ пример (L181-188) | Критерий broken SPINE уточнён: «WANT совместим с NEED — нет конфликта» + FLAW не объяснён через LIE/GHOST. Снято противоречие с §4.1 (GHOST/LIE могут быть неявными — diagnose по разрыву каузальной цепи, не по текстовому отсутствию). Пояснение «WANT совместим с NEED» сохранено как критерий. |
| P1-2 | **A7** ✅ DONE iter 36 | `part_07a.md` §7A.5 (L250-256) | Добавлена строка в таблицу «Пояснение секций AN»: `\| **Счётчик вырезаний** \| (Template B+, опционально) Счётчик событий для персонажей с прогрессивной деградацией (см. Выщербленный §10.4) \|` |
| P1-3 | **A8** ✅ DONE iter 36 | `part_08.md` §8.1 (L21-42) | Удалена orphan-строка `\| — \| OCEAN Overload \|...\|` (без номера). Footnote обновлён: «OCEAN Overload ранее был AP-15, в v9 restructure перенесён в Part 5 §5.3 (`p5_ocean_warning`). В таблице не отображается — см. Part 5.» |
| P1-4 | **B2** ✅ DONE iter 36 | `part_10.md` §10.2 (L134) | `GHOST: Gray Matter — продал свою долю за $5000, наблюдал, как партнёры стали миллиардерами. Унижение от того, что он сам ушёл, а его оставили позади.` → `GHOST: Gray Matter — продал свою долю за $5000. Партнёры стали миллиардерами. Сам работаю учителем химии в подержанном Pontiac Aztek.` (убрать ярлык «Унижение», заменить конкретным наблюдением) |
| P1-5 | **B5** ✅ DONE iter 36 | `part_04.md` §4.8 после mapping-таблицы | Добавлены определения 3 типов Anchors: «**Psychological Anchor** — Anchor, выведенный из LIE: модель действует из ложной установки в наблюдаемом поведенческом маркере. **At-rest Anchor** — Anchor, показывающий персонажа в «покое», когда он просто преследует свою WANT (без активации GHOST). **Growth Anchor** — Anchor для момента близости/уязвимости, когда NEED проявляется в обход FLAW.» |
| P1-6 | **B6** ✅ DONE iter 36 | `part_06.md` §6.3 (L73) | `\| **Tier 0** \| 12B, базовый/стандартный \|...` → `\| **Tier 0** \| 12B+, базовый/стандартный \|...` (синхронизировать с E11 viz «12B+») |
| P1-7 | **D1** ✅ DONE iter 36 | `part_04.md` §4.2 (L67) | Удалена строка `\| Елена (secondary) \| В 7 лет стояла во дворе... \|...` + note L70 «Елена имеет два GHOST-сценария...» заменена на: «**Примечание:** В учебном гайде каждый персонаж имеет ОДИН canonical GHOST. У Елены — предательство редактора. Множественная травма (GHOST Layers) — см. Выщербленный §4.11.» |
| P1-8 | **D1** ✅ DONE iter 36 | `part_04.md` §4.3 (L91) | Удалена secondary-строка `\| Елена (secondary) \| «Если я никого не впущу...» \| Пожар в детстве (§4.2) \|` из LIE table |
| P1-9 | **D2** ✅ DONE iter 36 | `part_04.md` §4.3 (L93) | Удалена variant-строка `\| Выщербленный (variant) \| «Пустота заполняема...» \| Цикл вырезаний (§4.11) \|` полностью (dead code) |
| P1-10 | **D4 + NEW-2** ✅ DONE iter 36 | `part_07a.md` §7A.13 (L667) | `Пример для Елены: Key «пожар, огонь» → Content «В 7 лет стояла во дворе и смотрела, как пламя охватывает крышу»` → `Пример для Елены: Key «предательство, редактор, Марина, украденная история» → Content «Марина — её редактор. Опубликовала расследование Елены под своим именем. С тех пор Елена не доверяет коллегам и работает одна.»` |
| P1-11 | **D4** ✅ DONE iter 36 | `part_07b.md` §7B.3 «Пример 1: GHOST-факт (пожар)» | Пример 1 заменён с пожар→предательство (primary GHOST): Key «предательство, Марина, редактор», Content «Марина — редактор Елены. Опубликовала расследование Елены под своим именем. С тех пор Елена не доверяет коллегам и работает одна.». Старый пример «пожар» — переименован в «Пример 2: secondary GHOST (пожар)» с пояснением «используется только если в карточке выбран secondary GHOST-сценарий». Примеры 2 (Марина) и 3 (Город) перенумерованы в 3 и 4. |

**Итого P1 ✅ CLOSED:** 11 правок в 6 canon-файлах (part_04, part_06, part_07a, part_07b, part_08, part_10). ~50 строк net edits. Build hash `69d9b813` unchanged.

**Validation gates P1 (iter 36, ALL PASS):**
```bash
pnpm run validate:master    # ✅ 12 checks, no regressions
pnpm run build              # ✅ SUCCESS, hash 69d9b813 (canon-файлы не в hash computation)
pnpm run validate           # ✅ 8 gates PASS, index.html 7.5KB
pnpm run test:unit          # ✅ 43/43
pnpm run test:integration   # ✅ 21/21
pnpm run lint               # ✅ 0 errors, 12 warnings (baseline)
pnpm run qa:csp             # ✅ 0 inline scripts
pnpm run qa:bundle          # ✅ 7.5KB (max 500KB)
pnpm run qa:doc-versions    # ✅ PASS
python3 scripts/audit_vs_embeds.py  # ✅ 0 regressions
```

---

### 4.3. P2 — Терминология + структурный cleanup (iter 37) ✅ CLOSED

**Цель:** Унифицировать терминологию, удалить устаревшие заглушки, сжать meta-секции (front-matter, Migration Notes, Validation gates, resume, Cross-refs ending). Самая большая итерация по объёму (~1130 строк удалений + ~50 новых).

**iter 37 ✅ CLOSED:** Все 18 правок P2-1..P2-18 применены в iter 37. Canon total: 5 035 → 3 905 строк (−1 130). Build hash `69d9b813` unchanged. Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `check_english.py` 0 leaks в `docs/canon/`.

| # | Item | Файл + строка | Правка |
|---|------|---------------|--------|
| P2-1 | **C1** ✅ DONE iter 37 | `part_01.md` §1.4 | Добавлен block «Ключевые термины» с 1-предложными определениями Anchor/Voice/SPINE/OCEAN + bold **Pattern Matcher** в RULE. |
| P2-2 | **C2** ✅ DONE iter 37 | `_README.md` §3.9 (новый) | Добавлена explicit policy: метки callouts (`RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`) остаются на английском как semantic anchors. Тело callouts — на русском. |
| P2-3 | **C5** ✅ DONE iter 37 | все canon-файлы (9 Bridge-paragraphs) | Оставлены 2 Bridge (Part 6→7A, Part 9→10). Удалены 8 остальных. |
| P2-4 | **E1** ✅ DONE iter 37 | все canon-файлы (front-matter 5-строчный quote-block) | Конвертирован в YAML front-matter (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`) во всех 13 canon-файлах (кроме `_README.md`). |
| P2-5 | **E2** ✅ DONE iter 37 | все canon-файлы (Migration Notes / Compression results / Validation gates / DGA Phase 2) | Удалены полностью. Migration status сохранён в YAML front-matter `migration_status` field. |
| P2-6 | **E3** ✅ DONE iter 37 | все canon-файлы (Cross-references из других Parts) | Удалены полностью. Inline `[ref: ...]` покрывает forward-refs. |
| P2-7 | **E4** ✅ DONE iter 37 | все canon-файлы («Что вы теперь умеете» resume) | Inline H3 resume удалены. В 4 Parts (01, 04, 07A, 08) добавлены 1-2-предложные **Synthesis:** вместо них (только Parts с major conceptual shift). |
| P2-8 | **E5** ✅ DONE iter 37 | `part_01.md` §1.3 | Orphan §1.3 удалён (контент уже в §1.2 + §1.4). |
| P2-9 | **E6** ✅ DONE iter 37 | `part_07a.md` L162, L172 | Pattern Matcher ссылки обновлены: «Модель — Pattern Matcher (см. Part 1 §1.4)» и «модель выступает как Pattern Matcher (см. §1.4 Part 1)». |
| P2-10 | **E7** ✅ DONE iter 37 | все canon-файлы | Клише «Применяется «очень деликатно»» удалено вместе с Migration Notes секциями (9 вхождений в 9 файлах). |
| P2-11 | **F1** ✅ DONE iter 37 | все canon-файлы | 22 stub «Canon planned iter 13/14/16» удалено (фактически 22, не 30+). `[ref: ...]` ссылки сохранены. |
| P2-12 | **B4 (partial)** ✅ DONE iter 37 | `part_03.md` §3.4 | Tier 1/2/3 → Quality Grade A/B/C. Добавлен disambiguation block (не путать с CoT Tier 0-3 из Part 6 и GHOST Layers Tier 1-3 из Part 10). Заголовок «Tier 1 vs Tier 3» → «Grade A vs Grade C». |
| P2-13 | **F4** ✅ DONE iter 37 | `part_04.md` §4.2 L55 | «Запрещённые слова» → «Запрещённые формулировки — это выводы-ярлыки, не события. Примеры запрещённых: «травма», «пережил», «столкнулся с», «пострадал», «испытал». Вместо них — конкретное событие...». |
| P2-14 | **F5** ✅ DONE iter 37 | `part_05.md` §5.1 (после RULE) | Добавлено определение **Cautious zone (30–40 / 60–70)** с примером Елены (A=38, N=68 → FLAW, GHOST). |
| P2-15 | **F6** ✅ DONE iter 37 | `part_07a.md` L305 (sampling params table) | 3 ячейки Voice Placement: `<br/>` заменён на em-dash. HTML-теги запрещены в Canon per `_README.md` §3.7. |
| P2-16 | **F7** ✅ DONE iter 37 | `part_07a.md` §7A.1 | Keirsey SP уточнено: «Artisan/Ремесленник из MBTI» → «Sensing-Perceiving, см. Appendix A — MBTI» (Keirsey ≠ MBTI). |
| P2-17 | **F9** ✅ DONE iter 37 | `part_09.md` §9.6 Decision Tree | Добавлены 1-словные симптомы для каждой AP-ссылки: AP-3 Voice-in-Desc, AP-6 No-Anti-Godmoding, AP-15 OCEAN-Overload, AP-5 RepPen-High, AP-7 PP-Leak, AP-10 CoT-Overload, AP-9 SPINE-Broken. |
| P2-18 | **F10** ✅ DONE iter 37 | `part_10.md` §10.1 (Elena inline annotations) | 4 inline-комментария `<!-- ↑ ... -->` удалены. Вместо них — отдельный **Annotation:** callout после карточки с 6 пунктами (DESCRIPTION→spine, DESCRIPTION→ocean, EXAMPLES, ANCHORS Базовые, ANCHORS FLAW-linked, GREETING). |

**Итого P2 ✅ CLOSED:** 18 правок во всех 14 canon-файлах. Canon total: 5 035 → 3 905 строк (−1 130 net deletion). Build hash `69d9b813` unchanged.

**Validation gates P2 (iter 37, ALL PASS):**
```bash
pnpm run validate:master    # ✅ 12 checks, no regressions
pnpm run build              # ✅ SUCCESS, hash 69d9b813 (canon-файлы не в hash computation)
pnpm run validate           # ✅ 8 gates PASS, index.html 7.5KB
pnpm run test:unit          # ✅ 43/43
pnpm run test:integration   # ✅ 21/21
pnpm run lint               # ✅ 0 errors, 12 warnings (baseline)
pnpm run qa:csp             # ✅ 0 inline scripts
pnpm run qa:bundle          # ✅ 7.5KB (max 500KB)
pnpm run qa:doc-versions    # ✅ PASS
python3 scripts/audit_vs_embeds.py  # ✅ 0 regressions
python3 scripts/check_english.py    # ✅ 0 leaks in docs/canon/ (29 baseline in src/master/)
```

---

### 4.4. P3 — Локальные правки + новые секции (iter 37)

**Цель:** Локальные правки текста (D3/D5/D6/D7, F2/F3/F8/F10) + добавление 5 новых концептуальных секций (G1-G5).

| # | Item | Файл | Правка |
|---|------|------|--------|
| P3-1 | **D3** | `part_07b.md` §7B.2 + `part_10.md` §10.1 | Добавить 1-строчное пояснение перед обоими Greeting Елены: «**Примечание:** Greeting в §7B.2 — учебный пример (бар, ночь). Greeting в §10.1 — canonical для production-карточки (кабинет редакции, 2 часа ночи).» |
| P3-2 | **D5** | `part_10.md` (5 карточек) | Английские `<!-- Demonstrates: ... -->` вынести в callout перед каждой карточкой: «**Demonstrates:** EMBODIMENT FIRST, ENVIRONMENTAL REACTIVITY, SHOW NEVER TELL (см. Examples ниже).» |
| P3-3 | **D6** | `part_03.md` §3.8 | Добавить контекст перед Йоуёмой: «**Йоуёма** — персонаж из сеттинга «Ошметок Веля» (см. Выщербленный §10.4), дополнительный персонаж в multi-char примере. Вводится для демонстрации voice bleed между двумя нестандартными голосами.» ИЛИ удалить Йоуёму, заменив на Выщербленного+Елена (оба уже определены). |
| P3-4 | **D7** | `part_10.md` §10.2 + `part_01.md` / `part_04.md` / `part_09.md` | Добавить cross-refs на Уолтера: Part 1 §1.X «пример реалистичного современного персонажа — см. §10.2»; Part 4 §4.X «SPINE простой карточки без GHOST Layers — см. §10.2»; Part 9 §9.X «тестирование карточки с OCEAN — см. §10.2». |
| P3-5 | **F2** | `part_02.md` §2.2 (Типы Price table) | Добавить 3-ю колонку «Пример (конкретный)»: «\| Физиологический \| ... \| Ложь → прищуривается → **напряжение в челюсти** \|», «\| Вербально-поведенческий \| ... \| Сарказм собеседника → пауза → **обрывание фразы** \|» |
| P3-6 | **F3** | `part_03.md` §3.1 (Voice Isolation % таблица) | Добавить сноску: «**Методология:** проценты — эмпирические оценки авторов гайда на основе тестирования ~50 карточек на 12B-32B моделях. Не точные измерения.» ИЛИ убрать проценты, оставить качественную формулировку. |
| P3-7 | **F8** | (покрыто P0-2) | — |
| P3-8 | **G1** | новый файл `docs/canon/part_00.md` или секция в `part_01.md` §1.0 | «Как читать этот гайд»: что такое Part, как они связаны, порядок чтения (Part 1→10), что такое VS-EMBED, что такое `[ref: ...]` нотация, как читать `[VS: E0X — ...]` маркеры. ~30 строк. |
| P3-9 | **G2** | новый файл `docs/canon/part_00.md` §0.2 | «TL;DR / Quick Start»: минимальная карточка за 30 минут. ~50 строк. |
| P3-10 | **G3** | `part_01.md` §1.4 + inline definitions | (покрыто P2-1) — добавить 1-предложные определения в момент первого использования. |
| P3-11 | **G4** | новый файл `docs/canon/appendix_character_map.md` | Таблица 5 персонажей: имя / где используется / сложность / GHOST / SPINE / Enneagram / OCEAN / CoT Tier / Lorebook. ~40 строк. |
| P3-12 | **G5** | `part_01.md` §1.X или `part_07a.md` §7A.X | «Pre-build checklist»: 6 вопросов перед сборкой (размер модели, контекстное окно, сложность, GHOST один или Layers, CoT нужен, Lorebook нужен). ~20 строк. |

**Итого P3:** 12 правок + 3 новых файла/секции. ~250 строк новых + ~30 правок.

**Validation gates P3:** те же + `pnpm run qa:english:docs` + ручная проверка новых секций.

---

## 5. Поэтапный план исполнения

### iter 35 — P0 (Critical contradictions) ✅ COMPLETE

**Статус:** Все 16 правок P0-1..P0-16 применены в iter 35. Build hash `69d9b813` unchanged. Validation gates ALL PASS + `audit_vs_embeds.py` 0 regressions. Документация актуализирована (STATUS.md, worklog.md, AGENT_NAVIGATION.md, AUDIT_VERIFICATION.md). Архив `iter_35_p0_fixes.zip` создан. Git commit + push.

**Точка остановки iter 35:** P0 ✅ CLOSED. KI#21-A1, A2, A3 (×4), A4 (×2), A6, A9, A10, B1 (GHOST+FLAW), NEW-1, NEW-3 ✅ CLOSED. Build hash `69d9b813` unchanged. P1 (iter 36) ready to start.

### iter 36 — P1 (Example vs rule + dead code) ✅ COMPLETE

**Статус:** Все 11 правок P1-1..P1-11 применены в iter 36 (см. §4.2 — каждая правка помечена ✅ DONE iter 36). Build hash `69d9b813` unchanged. Validation gates ALL PASS + `audit_vs_embeds.py` 0 regressions. Документация актуализирована (STATUS.md, worklog.md, AGENT_NAVIGATION.md, AUDIT_VERIFICATION.md). Архив `iter_36_p1_fixes.zip` создан. Git commit + push.

**Точка остановки iter 36:** P1 ✅ CLOSED. KI#21-B5, B6, B2, D1, D2, D4, A5, A7, A8 (+NEW-2) ✅ CLOSED. Build hash `69d9b813` unchanged. P2 (iter 37) ready to start.

### iter 37 — P2 (Terminology + structural cleanup) ✅ COMPLETE

**Статус:** Все 18 правок P2-1..P2-18 применены в iter 37 (см. §4.3 — каждая правка помечена ✅ DONE iter 37). Canon total: 5 035 → 3 905 строк (−1 130 net deletion). Build hash `69d9b813` unchanged. Validation gates ALL PASS + `audit_vs_embeds.py` 0 regressions + `check_english.py` 0 leaks в `docs/canon/`. Документация актуализирована (STATUS.md, worklog.md, AGENT_NAVIGATION.md, AUDIT_VERIFICATION.md). Архив `iter_37_p2_cleanup.zip` создан. Git commit + push.

**Точка остановки iter 37:** P2 ✅ CLOSED. KI#21-C1, C2, C5, E1-E7, F1, F4, F5, F6, F7, F9, F10, B4 ✅ CLOSED. 45/57 правок закрыты (16 P0 + 11 P1 + 18 P2). Build hash `69d9b813` unchanged. P3 (iter 38) ready to start.

### iter 38 — P3 (Local fixes + new sections)

**Шаги:**
1. Прочитать STATUS.md (iter 37 record), worklog.md iter 37, этот AUDIT_VERIFICATION.md §4.4.
2. Внести 7 правок P3-1..P3-7 (локальные).
3. Создать 3 новых файла/секции P3-8..P3-12 (How to read, TL;DR, Character map, Pre-build checklist).
4. Validation gates + manual review новых секций.
5. Обновить docs (KI#21 ✅ CLOSED полностью).
6. Архив `iter_38_p3_complete.zip`.
7. Git commit + push.

**Точка остановки iter 38:** P3 complete. KI#21 ✅ CLOSED полностью (все sub-items A1-A10, B1-B6, C1-C8, D1-D7, E1-E7, F1-F10, G1-G5). iter 39+ roadmap: none planned. Build hash `69d9b813` unchanged (только canon-контент правки + новые файлы).

---

## 5.5. iter 39 — DOC DRIFT FIX (KI#25/#26/#27 ✅ CLOSED)

iter 39 вышел за scope KI#21 (контент канона) — обнаружен doc drift в doc-файлах (bible + README), которые не покрывались аудитом KI#21. Все 3 новых KI — doc-only, canon Part 10 §10.4 не тронут. Build hash `69d9b813` unchanged.

**Принцип iter 39+ invariant:** «guide's role as example takes priority over character canon» — при рассинхроне bible vs canon Part 10 правится bible, не Part 10.

| KI | Файл | Симптом | Fix | Status |
|----|------|---------|-----|--------|
| KI#25 | `docs/elena_character_bible.md` L78-80 | OCEAN A=38/N=68 помечены `⚠️ EXTREME`; «Extreme poles: 3» — противоречит Part 5 §5.1 RULE и Part 7A §7A.13 (iter 35 fix) | `⚠️ CAUTIOUS ZONE` для A=38/N=68; «Extreme poles: 1 (O=72) + 2 cautious zone»; убрано «For 4K context, keep only 2» | ✅ CLOSED |
| KI#26 | `docs/vyshcherblenny_character_bible.md` L14, L26-28, L86, L95, L115 | Setting «Ministry of Closed Communications» (старый сеттинг МЗК), GHOST Layers G1 «Abandoned at archive as child» vs Part 10 §10.4 Tier 1 «Был архивариусом — впрыснул себе документ», OCEAN «три экстремума» (фактически 4), Note covers only Part 7A (не Part 10), Lorebook `vysh_world_rules` keys «МЗК, Министерство, Закон» | L14 Setting (ТЕНЕБРИС), L26-28 GHOST Layers (Tier 1/2/3 matching Part 10 §10.4), L86 OCEAN (4 экстремума + per-value markers), L95 Note (расширена — covers Part 7A §7A.9 + Part 10 §10.4 moderate values), L115 Lorebook (`vysh_world_rules` → Вентора/Архив/Ошметок/Сангвис/Вель) | ✅ CLOSED |
| KI#27 | `README.md` L40 | Part 10 указывает «6 cards: Elena, Geralt, Edward, Walter, Omnis-Zeta, Vysherblenny» — Geralt + Edward DELETED в v9.1 (FIX-07) | «4 cards: Elena, Walter, Omnis-Zeta, Vysherblenny (Geralt + Edward DELETED в v9.1 — FIX-07)»; L42 «92 секции» → «Итого: 10 Parts (см. AGENT_NAVIGATION.md для 98 секций)» | ✅ CLOSED |

**Modified files (iter 39):** `docs/elena_character_bible.md`, `docs/vyshcherblenny_character_bible.md`, `README.md`, `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `docs/AUDIT_VERIFICATION.md`.

**Validation gates ALL PASS:** build (hash `69d9b813`) / validate:master (12 checks) / validate (8 gates, 7.5KB) / test:unit (43/43) / test:integration (21/21) / lint (0 errors, 12 warnings baseline) / qa:csp / qa:bundle / qa:doc-versions / audit_vs_embeds.py (0 regressions) / check_english.py --scan-docs (0 WH40k terms).

**НЕ в scope iter 39 (deferred to iter 40+):**

| ID | Описание | Risk |
|----|----------|------|
| KI#27-leftover | README section counts (Parts 1/5/7/8 также устарели, 92 → 98 секций) | LOW — cosmetic |
| KI#26-leftover | OCEAN moderate values labeling в `part_10.md` §10.4 + `appendix_character_map.md` — N=70 помечен как «экстремум», но N=70 = cautious zone boundary per Part 5 §5.1 RULE «<30 или >70» | MEDIUM — трогает example, требует аудита: либо labels (потенциальная регрессия примера), либо уточнить RULE |

**Точка остановки iter 39:** Doc drift fix complete. KI#25/#26/#27 ✅ CLOSED. iter 40+ roadmap: README section counts (cosmetic), OCEAN moderate values labeling в Part 10 (potential example regression), Glossary double-render, Component extracts sync. Build hash `69d9b813` unchanged. Принцип «guide's role as example takes priority over character canon» — invariant с iter 39.

---

## 5.6. iter 40 — README + OCEAN LABELING FIX (KI#28/#29 ✅ CLOSED)

iter 40 закрыл 2 roadmap-задачи из iter 39 stopping point. Оба KI — doc/canon-only, build hash `69d9b813` unchanged.

| KI | Файл | Симптом | Fix | Status |
|----|------|---------|-----|--------|
| KI#28 | `README.md` L31-38 | Section counts устарели: Part 1 (5 вместо 7), Part 5 (6 вместо 8), Part 7 (16 вместо 18), Part 8 (17 вместо 16). Part 8 описание «16 анти-паттернов (AP-1–AP-16)» — AP-16 не существует (OCEAN Overload перенесён в Part 5 §5.3 в v9). | Part 1: 5→7 (описание расширено), Part 5: 6→8 (описание расширено), Part 7: 16→18 (описание с 7A/7B breakdown), Part 8: 17→16 + «16 анти-паттернов (AP-1–AP-16)» → «15 анти-паттернов (AP-1–AP-15) + overview». Сумма: 95 Part секций + 3 appendix = 98 ✓. | ✅ CLOSED |
| KI#29 | `docs/canon/part_10.md` L408 + `docs/canon/appendix_character_map.md` L16 | N=70 помечен как «экстремум»/«Высокая N» — противоречит Part 5 §5.1 RULE (extreme = строго `<30` или `>70`; N=70 = cautious zone boundary 60–70). | **Label-only fix, values unchanged.** `part_10.md` L408: «Экстремумы: Низкая E, Высокая N» → «Экстремумы: Низкая E (<30). Cautious zone: N=70 (граница 60–70, см. Part 5 §5.1 RULE)». `appendix_character_map.md`: колонка «OCEAN экстремумы» → «OCEAN (extreme + cautious)» + footnote с per-character breakdown (Елена 1 ext + 2 cautious; Уолтер 2 ext + 1 cautious; Омнис 3 ext; Выщербленный 1 ext + 1 cautious). YAML `last_synced` → iter 40. | ✅ CLOSED |

**Modified files (iter 40):** `README.md` (KI#28), `docs/canon/part_10.md` (KI#29), `docs/canon/appendix_character_map.md` (KI#29), `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `docs/AUDIT_VERIFICATION.md`.

**Validation gates ALL PASS:** build (hash `69d9b813`) / validate:master (12 checks) / validate (8 gates, 7.5KB) / test:unit (43/43) / test:integration (21/21) / lint (0 errors, 12 warnings baseline) / qa:csp / qa:bundle / qa:doc-versions / audit_vs_embeds.py (0 regressions) / check_english.py --scan-docs (0 WH40k terms).

**НЕ в scope (principle preserved):** OCEAN values O:60/C:55/E:25/A:30/N:70 в Part 10 §10.4 — unchanged (moderate 4K-fallback example). Это internal canon consistency fix (Part 5 RULE vs Part 10/appendix label), НЕ bible-vs-canon sync — iter 39 invariant («guide's role as example takes priority») не применяется. Новый invariant (iter 40+): OCEAN labeling consistency — label-only fixes допустимы для internal canon consistency, values примера не трогаются.

**Точка остановки iter 40:** README + OCEAN labeling fix complete. KI#28/#29 ✅ CLOSED. iter 41+ roadmap: Glossary double-render (LOW), Component extracts sync (MEDIUM), Part 10 moderate vs bible extreme cross-ref (LOW — cosmetic). Build hash `69d9b813` unchanged. Invariants: guide's role as example takes priority (iter 39+), OCEAN labeling consistency (iter 40+).

---

## 6. Риски и компромиссы

### 6.1. Build hash stability

Все правки P0/P1/P2/P3 — в `docs/canon/` (markdown-источник). Master HTML не трогается. Build hash `69d9b813` (после iter 34 — KI#23 fix) computed из `index.html` (shell), не из canon. **Ожидается, что hash останется неизменным** во всех 4 итерациях (iter 35-38).

Если hash изменится — значит:
- (a) случайно задет `src/master/` — откатить.
- (b) `pnpm run build` перегенерирует root fallbacks — проверить `widgets/`, `parts/`, `assets/`, `index.html`, `build.hash` (root). Если только они — это нормальная регенерация, hash `build.hash` file должен остаться `69d9b813`.

### 6.2. Canon migration history loss (P2-5)

Удаление Migration Notes / Compression results / Validation gates секций из canon — потеря исторического контекста. **Митигация:** перед удалением в iter 37, вынести в `docs/migration_history/part_NN.md` (14 новых файлов). Если миграционная история не нужна — удалить полностью (canon = источник правды для контента, не для migration audit).

### 6.3. Dual-Elena secondary GHOST removal (P1-7)

Удаление secondary GHOST (пожар) из Part 4 — дидактическая потеря (учебный пример «одиночная vs множественная травма»). **Митигация:** в Part 4 §4.2 оставить 1-строчную ссылку: «Пример множественной травмы (GHOST Layers) — см. Выщербленный §4.11. Елена имеет только primary GHOST — предательство редактора.» Это сохраняет pedagogical intent без dual-GHOST противоречия.

### 6.4. Front-matter YAML conversion (P2-4)

Конверсия front-matter из markdown quote-block (`> **Canonical source for:** ...`) в YAML (`---\ncanonical_for: ...\n---`) — может сломать существующие grep-паттерны в скриптах. **Митигация:** перед P2-4 проверить `rg "Canonical source for:" scripts/ src/` — если скрипты парсят front-matter, обновить их. Если нет — конверсия безопасна.

### 6.5. B3 (INVALID) — не вносить правки

B3 был признан невалидным. **Не пытаться «укоротить Examples Омнис-Зета»** — они в пределах лимита. Любая попытка «починить» B3 = сделать хуже.

### 6.6. C1-C8 (subjective) — минимальные правки

Терминология C1-C8 — субъективные предпочтения. P2-2 (explicit policy в _README.md) решает C2 без правки 100+ callouts. Остальные C-items — оставить как есть, если не критичны. **Принцип:** не русифицировать ради русификации, если это ломает semantic anchors для модели.

---

## 7. Точка остановки iter 33 (audit verification, без правок)

**iter 33 — AUDIT VERIFICATION (без правок).**

- Прочитан весь канон `docs/canon/` (14 файлов, 5 008 строк).
- Верифицирован каждый пункт аудита iter 33 (A1-G5, ~50 пунктов).
- Найдено: 1 INVALID (B3), 2 REFINED (B2, B5), 2 STRENGTHENED (B4, F1), 3 NEW (NEW-1/2/3).
- Зафиксирован финальный фронт работ: 16 P0 + 11 P1 + 18 P2 + 12 P3 = **57 правок** в 14 canon-файлах + 3 новых файла/секции.
- План исполнения: iter 35 (P0 ✅) → iter 36 (P1) → iter 37 (P2) → iter 38 (P3) — сдвинут с iter 34-37 из-за iter 34 = CSS/CSP fix (KI#22/#23). После каждой итерации — validation gates + архив + git.
- **Правок не внесено** — пользователь просил сначала перепроверить, потом решить.
- **Документация:** создан `docs/AUDIT_VERIFICATION.md` (этот файл). STATUS.md / worklog.md / AGENT_NAVIGATION.md обновлены iter 33 record (без новых KI — это аудит, не баги).
- **Архив `iter_33_audit_verification.zip`:** содержит только `docs/AUDIT_VERIFICATION.md` + обновлённые STATUS.md / worklog.md / AGENT_NAVIGATION.md (docs-only, без canon-правок).
- **Build hash `fd3d96d3` unchanged** (canon-файлы не тронуты, только docs). После iter 34 (KI#23 fix) baseline стал `69d9b813`.

## 7.1. Точка остановки iter 35 (canon P0)

**iter 35 — CANON AUDIT P0 ✅ COMPLETE.**

- Прочитан весь контекст iter 34 (STATUS.md / worklog.md / AGENT_NAVIGATION.md §6 #40-42 / `docs/AUDIT_VERIFICATION.md` §4.1).
- Применены все 16 правок P0 (P0-1..P0-16) в 7 canon-файлах: `appendix_glossary.md`, `part_04.md`, `part_05.md`, `part_07a.md`, `part_08.md`, `part_09.md`, `part_10.md`.
- Все validation gates PASS: `validate:master` (12 checks) / `build` (hash `69d9b813` unchanged) / `validate` (8 gates) / `test:unit` (43/43) / `test:integration` (21/21) / `lint` (0 errors, 12 warnings) / `qa:csp` / `qa:bundle` (7.5KB) / `qa:doc-versions` / `audit_vs_embeds.py` (0 regressions).
- **Документация актуализирована:** STATUS.md (iter 35 record — KI#21 P0 ✅ CLOSED), worklog.md (iter 35 = самый подробный), AGENT_NAVIGATION.md (§6 #40 KI#21 P0 ✅, §8 OP-1 iter 35 row + iter 36+ roadmap), AUDIT_VERIFICATION.md (§4.1 P0 ✅ CLOSED, §5 iter 35 ✅, §7.1 iter 35 stop point).
- **Build hash `69d9b813` unchanged** (canon-файлы не входят в hash computation — только `src/shell/index.html`).

## 7.2. Точка остановки iter 36 (canon P1)

**iter 36 — CANON AUDIT P1 ✅ COMPLETE.**

- Прочитан весь контекст iter 35 (STATUS.md / worklog.md / AGENT_NAVIGATION.md §6 #40 / `docs/AUDIT_VERIFICATION.md` §4.2).
- Применены все 11 правок P1 (P1-1..P1-11) в 6 canon-файлах.
- Все validation gates PASS + `audit_vs_embeds.py` 0 regressions.
- Build hash `69d9b813` unchanged.

## 7.3. Точка остановки iter 37 (этот чат — canon P2)

**iter 37 — CANON AUDIT P2 ✅ COMPLETE.**

- Прочитан весь контекст iter 36 (STATUS.md / worklog.md / AGENT_NAVIGATION.md §6 #40 / `docs/AUDIT_VERIFICATION.md` §4.3).
- Применены все 18 правок P2 (P2-1..P2-18) во всех 14 canon-файлах: `part_01.md` (P2-1, P2-8), `part_03.md` (P2-12), `part_04.md` (P2-13), `part_05.md` (P2-14), `part_07a.md` (P2-9, P2-15, P2-16), `part_09.md` (P2-17), `part_10.md` (P2-18), `_README.md` (P2-2), все 14 файлов (P2-3, P2-4, P2-5, P2-6, P2-7, P2-10, P2-11).
- Canon total: 5 035 → 3 905 строк (−1 130 net deletion).
- Все validation gates PASS: `validate:master` (12 checks) / `build` (hash `69d9b813` unchanged) / `validate` (8 gates) / `test:unit` (43/43) / `test:integration` (21/21) / `lint` (0 errors, 12 warnings) / `qa:csp` / `qa:bundle` (7.5KB) / `qa:doc-versions` / `audit_vs_embeds.py` (0 regressions) / `check_english.py` (0 leaks in `docs/canon/`).
- **Документация актуализирована:** STATUS.md (iter 37 record — KI#21 P0+P1+P2 ✅ CLOSED, 45/57 правок), worklog.md (iter 37 = самый подробный; iter 36 → one-liner), AGENT_NAVIGATION.md (§6 #40 KI#21 P0+P1+P2 ✅, §8 OP-1 iter 37 row + iter 38+ roadmap), AUDIT_VERIFICATION.md (§4.3 P2 ✅ CLOSED annotations, §5 iter 37 ✅, §7.3 iter 37 stop point).
- **Build hash `69d9b813` unchanged** (canon-файлы не входят в hash computation — только `src/shell/index.html`; index.html root fallback регенерирован — только `Generated:` timestamp обновлён, content identical).

**Что в следующем чате (iter 38 — canon P3):**

1. Прочитать STATUS.md (iter 37 record — KI#21 P0+P1+P2 ✅ CLOSED, 45/57 правок, build hash `69d9b813`), worklog.md iter 37, AGENT_NAVIGATION.md §6 pitfall #40 KI#21 P0+P1+P2 ✅, этот `docs/AUDIT_VERIFICATION.md` §4.4.
2. Внести 7 правок P3-1..P3-7 (локальные — D3 Greeting Елены 2 сцены, D5 HTML-комментарии в карточках Омнис, D6 Йоуёма контекст, D7 cross-refs на Уолтера, F2 Price table примеры, F3 Voice Isolation % methodology, F8 (covered by P0-2)).
3. Создать 3 новых файла/секции P3-8..P3-12: G1 «Как читать» (part_00.md или секция в part_01), G2 TL;DR (part_00.md §0.2), G4 Character map (appendix_character_map.md), G5 Pre-build checklist (part_01 §1.X или part_07a §7A.X). P3-10 G3 (covered by P2-1).
4. Validation gates + manual review новых секций + `check_english.py`.
5. Обновить docs (KI#21 ✅ CLOSED полностью).
6. Архив `iter_38_p3_complete.zip`.
7. Git commit + push.
8. Точка остановки iter 38 → KI#21 ✅ CLOSED полностью (57/57 правок).

---

## 8. Приложение: Сводный индекс правок по файлам

| Файл | P0 | P1 | P2 | P3 | Всего правок |
|------|----|----|----|----|---------------|
| `appendix_glossary.md` | 1 (A1) | — | — | — | 1 |
| `part_01.md` | — | — | 3 (E5, E6, P2-1) | 3 (G1, G5, D7-cross-ref) | 6 |
| `part_02.md` | — | — | — | 1 (F2) | 1 |
| `part_03.md` | — | — | 2 (B4-rename, E6) | 2 (D6, F3) | 4 |
| `part_04.md` | 5 (A3, A4×2, NEW-1, D2-variant) | 4 (B5, D1×2, D2) | 2 (F4, E7) | — | 11 |
| `part_05.md` | 1 (NEW-3) | — | 1 (F5) | — | 2 |
| `part_06.md` | — | 1 (B6) | — | — | 1 |
| `part_07a.md` | 3 (A2, A3×2, A4-NEED-sync, A7-AN-section, NEW-2) | 2 (A7, D4+NEW-2) | 3 (F6, F7, E6) | — | 8 |
| `part_07b.md` | — | 1 (D4) | — | 1 (D3) | 2 |
| `part_08.md` | 2 (A6, A8) | 2 (A5, A8) | — | — | 4 |
| `part_09.md` | 2 (A9, A10) | — | 1 (F9) | 1 (D7-cross-ref) | 4 |
| `part_10.md` | 4 (A3, B1×2, A4-NEED-sync) | 1 (B2) | 1 (F10) | 3 (D3, D5, D7) | 9 |
| `_README.md` | — | — | 2 (C2-policy, E7-principle) | — | 2 |
| **NEW files** | — | — | — | 3 (part_00.md, appendix_character_map.md, ...) | 3 |
| **Итого** | **16** | **11** | **18** | **12** | **57** |

---

*Конец документа. iter 35 (P0) ✅ CLOSED — 16/57 правок. iter 36 (P1) ✅ CLOSED — 27/57 правок. iter 37 (P2) ✅ CLOSED — 45/57 правок (−1 130 строк net). Build hash `69d9b813` unchanged. iter 38 (P3) — 12 правок + 3 новые секции (G1, G2, G4, G5), ready to start. Этот файл = Canonical source для KI#21 work plan. iter 34 = CSS/CSP fix (KI#22/#23), вне canon audit plan — сдвинул canon audit iter 34-37 → iter 35-38.*
