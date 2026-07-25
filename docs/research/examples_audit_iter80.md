# Аудит примеров карточек персонажей — iter 80

> **Тип:** Исследовательская итерация (разведка, подготовка к правкам)
> **Дата:** 2026-07-26
> **Область:** Part 10 (4 полных карточки) + inline-примеры Parts 1-9 + character bibles vs card data

---

## 1. Методология

Аудит проведён по ~90 правилам гайда (Parts 1–9), cross-referenced с 4 полными карточками Part 10, 12 персонажами из character_bible.md, и ~73 inline-примерами + ~19 шаблонами в Parts 1–9.

---

## 2. Универсальные нарушения (ALL 4 cards)

| # | Проблема | Правило | Текущее | Требуемое | Серьёзность |
|---|----------|---------|---------|-----------|-------------|
| U1 | **Tone Frame недомер** | P7A-R7 (~25–30 tokens) | Elena: 0 tok, Walter: ~6 tok, Omnis: ~8 tok, Vyshcher: ~8 tok | ~25–30 tok | HIGH |
| U2 | **CORE_DIRECTIVES не inline** | P7A-R1/P7A-R4 | `{{CORE_DIRECTIVES — канонический шаблон → Part 7A}}` | 7 directives enumerated OR documented convention | DECISION |
| U3 | **Examples недомер** | P3-R7 (80–120 tok per block) | Most blocks 25–70 tok | 80–120 tok | HIGH |
| U4 | **Anchors без `<anchors>` XML** | P7A-R16, P1-R6 | `[ANCHORS]` plain text | `<anchors>` XML wrapper | MEDIUM |

---

## 3. Карточка Елены (BASIC) — нарушения

| # | Проблема | Правило | Серьёзность | Деталь |
|---|----------|---------|-------------|--------|
| E1 | **Voice leak в Description** | P1-R3/P3-R1 | HIGH | `«саркастичная»` в `<identity>` — лингвистический голосовой descriptor, должен быть только в Examples |
| E2 | **Tone Frame отсутствует** | P7A-R1/P7A-R7 | HIGH | Нет Tone Frame в SP — обязательный для нетривиальных сеттингов |
| E3 | **OOC Protection отсутствует** | P7A-R1/P7A-R15 | HIGH | Нет OOC в SP |
| E4 | **SP structure order нарушен** | P7A-R2 | HIGH | Пропущены Tone Frame и OOC между CORE_DIRECTIVES и Format Lock |
| E5 | **Examples недомер** | P3-R7 | HIGH | Все 3 Examples ниже 80 tok (25–50 tok) |
| E6 | **Example 1 без Embodiment** | P2-R9 | MEDIUM | `*пауза*` — tempo marker, не embodied emotional reaction |
| E7 | **SPATIAL & ANATOMICAL LOCK не демострируется** | Claims | MEDIUM | Claims «Demonstrates» S&AL, но Examples/Greeting не показывают spatial tracking |
| E8 | **§9.11 Quick Check self-contradiction** | P9-R4 item 2 | HIGH | Guide claims Elena passes Voice check — но «саркастичная» в Description = voice leak = FAIL |
| E9 | **OCEAN format mismatch** | P1-R5 | LOW | Pipes `O: 72 | C: 65` vs canonical compact `O:72 C:65` |

### Bible vs Card расхождения (Елена)

| # | Поле | Bible | Card | Серьёзность |
|---|------|-------|------|-------------|
| BE1 | Anchor Price «Искренняя забота» | «укол вины» (1 abstract) | «вздрагивает, голос тише, сжимает кулаки» (3 physical, 2 borrowed from other anchors) | HIGH |
| BE2 | 3 Anchors absent | Разговор, Тело в стрессе, Доверие | Not present | MEDIUM |
| BE3 | GHOST truncation | «Она доверяла, а её использовали» | Sentence dropped | MEDIUM |

---

## 4. Карточка Уолтера (BASIC) — нарушения

| # | Проблема | Правило | Серьёзность | Деталь |
|---|----------|---------|-------------|--------|
| W1 | **Missing `<identity>` tag** | P7A-R16 | HIGH | Description starts with prose, no `<identity>` XML |
| W2 | **LIE = quote + explanatory clause** | P4-R4 | HIGH | `"Я делаю это ради семьи" — но правда в том, что ему нужно чувствовать контроль` — truth embedded in LIE field violates SPINE architecture |
| W3 | **Format Lock отсутствует в SP** | P7A-R1/P7A-R8 | HIGH | No Format Lock in System Prompt |
| W4 | **OOC Protection отсутствует** | P7A-R1/P7A-R15 | HIGH | No OOC Protection |
| W5 | **Tone Frame недомер** | P7A-R7 | HIGH | ~6 tokens, needs ~25–30 |
| W6 | **GHOST without Anchor-trigger** | AP-8/P4-R10 | HIGH | Gray Matter GHOST has no GHOST-linked Anchor |
| W7 | **1 Anchor Price non-physical** | P2-R3 | MEDIUM | «Семья упоминается → секунда тишины дольше, чем нужно» — temporal, not bodily |
| W8 | **OCEAN cautious zones not linked** | P5-R3 | MEDIUM | O:65, E:30, N:60 not annotated or linked to SPINE |
| W9 | **Prose psychology between tags** | P1-R4 | MEDIUM | «Гордость — его двигатель и его клетка» between `<spine>` and prose |

### Bible vs Card расхождения (Уолтер)

| # | Поле | Bible | Card | Серьёзность |
|---|------|-------|------|-------------|
| BW1 | NEED | «Принять свою истинную природу (Хайзенберг)» | «чувствовать контроль и признание» | HIGH |
| BW2 | WANT | «Обеспечить семью, оставить наследство» | «обеспечить финансовую безопасность семьи до смерти» | HIGH |
| BW3 | FLAW | «Гордость — не может принять помощь» | «отказывается принимать помощь, скрывает диагноз» | HIGH |
| BW4 | LIE | «Я делаю это для семьи» (clean) | «Я делаю это ради семьи — но правда...» (embedded truth) | HIGH |
| BW5 | Anchor #3 Price | «—» (no Price, paradox anchor) | «пальцы сжимаются под столом, дыхание рвётся» | HIGH |
| BW6 | Anchor #5 Price | «—» (WANT-aligned, no cost) | «секунда тишины дольше» | MEDIUM |
| BW7 | Bible lacks OCEAN | — | O:65 C:85 E:30 A:25 N:60 | MEDIUM |

---

## 5. Карточка Омнис-Зета (EXPERT) — нарушения

| # | Проблема | Правило | Серьёзность | Деталь |
|---|----------|---------|-------------|--------|
| O1 | **5/7 Anchor Prices non-physical** | P2-R1/P2-R3 | HIGH | «теряет situational awareness», «нарушает субординацию», «отчуждает», «эскалирует», «упускает модернизацию», «раскрывает уязвимость», «рассеивание внимания» — all relational/cognitive, not bodily |
| O2 | **Tone Frame недомер** | P7A-R7 | HIGH | ~8 tokens, needs ~25–30 |
| O3 | **OCEAN cautious zones not linked** | P5-R3 | MEDIUM | A:25, N:65 not annotated with SPINE links |
| O4 | **NEED/WANT tension weak** | P4-R6 | MEDIUM | WANT (Слияние с Омниссией) and NEED (Понимание) are aligned, not contradictory |
| O5 | **GHOST Tier 1 lacks Anchor-trigger** | P4-R10 | MEDIUM | «оставлен на кузне-мониторium» has no specific trigger in Anchors |
| O6 | **Greeting не показывает FLAW** | P7B-R1 | MEDIUM | Greeting scene = ritual; no organic expressing emotion → FLAW not triggered |
| O7 | **SP structure order** | P7A-R2 | LOW | Character-specific rules inserted between CD and Tone Frame |

### Bible vs Card расхождения (Омнис-Зета)

| # | Поле | Bible | Card | Серьёзность |
|---|------|-------|------|-------------|
| BO1 | GHOST | «Страх устаревания» (Tier 3, abstract) | «Первая аугментация заменила левый глаз» (Tier 2, concrete event) | HIGH |
| BO2 | WANT truncated | «...стать проводником божественной воли Марсианского божества» | Sentence dropped | MEDIUM |
| BO3 | NEED truncated | «...найти логику в хаосе чужой технологии» | Sentence dropped | MEDIUM |
| BO4 | FLAW reframed | «Утрата человечности — с каждой аугментацией...» | «Анализирует эмоции как сбой регуляции» | HIGH |
| BO5 | `<ghost_layers>` NEW in card | Bible has only single GHOST line | Full 3-tier block | MEDIUM (backfill needed) |

---

## 6. Карточка Выщербленного (EXPERT) — нарушения

| # | Проблема | Правило | Серьёзность | Деталь |
|---|----------|---------|-------------|--------|
| V1 | **GHOST in `<spine>` over-length** | P4-R2/P4-R3 | HIGH | Narrative + cycle description (5 sentences, cycle pattern) instead of concrete event |
| V2 | **Tone Frame недомер** | P7A-R7 | HIGH | ~8 tokens, needs ~25–30 |
| V3 | **Anchor Prices partially non-physical** | P2-R3 | MEDIUM | «не помнит, зачем делал, теряет фрагмент себя», «несколько дней не может спать» — cognitive/temporal, not bodily |
| V4 | **OCEAN cautious zones not linked** | P5-R3 | MEDIUM | E:25, N:70 not explicitly linked to SPINE |
| V5 | **Examples partially under-length** | P3-R7 | MEDIUM | 2 of 4 Examples below 80 tok |

### Bible vs Card расхождения (Выщербленный)

| # | Поле | Bible | Card | Серьёзность |
|---|------|-------|------|-------------|
| BV1 | LIE expanded | «Если я поглощу достаточно — стану цельным» | «Если я поглощу достаточно чужого сопротивления — стану цельным. Есть точка, после которой выщерблины заполнятся.» | HIGH |
| BV2 | NEED fundamentally changed | «Принять утраты как часть себя, не заменять чужой памятью» | «Принять, что полноценности не существует. Выбрать, как растворяться» | HIGH |
| BV3 | WANT changed | «Стать цельным — заполнить пустоты внутри» | «Стать полноценным — полной копией или полным оригиналом. Найти способ заполнить выщерблины.» | HIGH |
| BV4 | GHOST expanded | 2 sentences | 5 sentences + cycle pattern + 3 new canonical details | HIGH |
| BV5 | FLAW expanded | «Поглощает чужое прошлое, после каждого теряет часть себя» | Added: «через вырезание пространства» + progressive consequences | HIGH |
| BV6 | Entire anchor set replaced | Abstract/archival-themed anchors | World-specific anchors (Ошметок, Вентора, Сангвис, Зеркало) | HIGH |
| BV7 | «Зеркало» NEW in card | Not in Bible | Full anchor + Lorebook entry | HIGH (backfill needed) |

---

## 7. Inline-примеры Parts 1–9 — ключевые наблюдения

| # | Наблюдение | Серьёзность |
|---|------------|-------------|
| I1 | **7 из 9 supporting characters (Geralt, Joker, Jesse, Edward, Elliot, Nameless One) не используются** в Parts 1–9 inline — только Walter White и Tyler Durden (1 ref) активно | MEDIUM (dead weight in Bible) |
| I2 | **Part 7B Lorebook Entry 2 (пожар Елены)** explicitly marked «non-canonical» — но зачем non-canonical GHOST-факт в гайде? | MEDIUM |
| I3 | **OCEAN format inconsistency across guide:** §1.4/§5.1 RULE = compact `O:72 C:65`; §5.2 Elena profile + Part 10 cards = pipes `O: 72 | C: 65` | LOW |
| I4 | **Anchors placement inconsistency:** §7A.9 template = `<anchors>` XML; Part 10 cards + inline examples = `[ANCHORS]` plain text | MEDIUM |

---

## 8. Template vs Card mismatches

| # | Template (guide rule) | Card (Part 10) | Gap |
|---|----------------------|----------------|-----|
| T1 | SP structure: Identity → Anti-godmoding → CD → Tone Frame → OOC → Format Lock | Elena/Walter: skip Tone Frame + OOC | HIGH |
| T2 | LIE = quoted phrase only (P4-R4) | Walter: LIE + explanatory clause | HIGH |
| T3 | Anchors = `<anchors>` XML (P7A-R16) | All cards: `[ANCHORS]` plain text | MEDIUM |
| T4 | OCEAN = compact numeric `O:72 C:65` (P1-R5) | Cards: `O: 72 | C: 65` with pipes | LOW |

---

## 9. Систематический паттерн: FLAW reframing

**3 из 4 characters** демонстрируют один паттерн: Bible называет conceptual trait (Гордость, Утрата человечности, abstract pattern) → Card опускает trait name и показывает только specific behavioral instance.

Это может быть intentional card-compression, но **противоречит роли Bible как source of truth**. Если intentional — нужно документировать как convention. Если нет — нужно восстановить trait names.

---

## 10. План правок (для следующих итераций)

### Phase A — Критические structural fixes (HIGH)

| # | Задача | Итерация | Усилие |
|---|--------|----------|--------|
| A1 | Elena SP: добавить Tone Frame (~25 tok) + OOC Protection | iter 81 | LOW |
| A2 | Walter SP: добавить `<identity>` + Format Lock + OOC + Tone Frame (~25 tok) | iter 82 | MEDIUM |
| A3 | Walter Description: prose → `<identity>` XML wrapper | iter 82 | LOW |
| A4 | Walter LIE: убрать explanatory clause | iter 82 | LOW |
| A5 | Omnis-Zeta Anchors: заменить 5 non-physical Prices на bodily/mechanical equivalents | iter 83 | MEDIUM |
| A6 | Vyshcherblenny GHOST: сократить до concrete event, cycle → `<ghost_layers>` | iter 84 | LOW |
| A7 | All 4 cards: Anchors `[ANCHORS]` → `<anchors>` XML wrapper | iter 85 | LOW |
| A8 | All 4 cards Tone Frames: расширить до ~25–30 tok | iter 85 | MEDIUM |

### Phase B — Examples enrichment (HIGH)

| # | Задача | Итерация | Усилие |
|---|--------|----------|--------|
| B1 | Elena Examples: расширить до 80–120 tok each + add embodiment to Example 1 | iter 86 | MEDIUM |
| B2 | Walter Examples: расширить до 80–120 tok each | iter 87 | LOW |
| B3 | Omnis-Zeta Examples: расширить shorter blocks до 80 tok | iter 88 | LOW |
| B4 | Vyshcherblenny Examples: расширить 2 shorter blocks | iter 88 | LOW |

### Phase C — Bible sync (HIGH)

| # | Задача | Итерация | Усилие |
|---|--------|----------|--------|
| C1 | Walter Bible: backfill OCEAN + align NEED/WANT/FLAW/LIE with card | iter 89 | MEDIUM |
| C2 | Omnis-Zeta Bible: backfill `<ghost_layers>` + align GHOST + WANT/NEED truncation | iter 89 | MEDIUM |
| C3 | Vyshcherblenny Bible: backfill GHOST details + Зеркало character + align LIE/NEED/WANT/Anchors | iter 90 | HIGH |
| C4 | Elena Bible: align Anchor Prices + decide «саркастичная» in identity | iter 90 | LOW |

### Phase D — Guide self-contradictions (MEDIUM)

| # | Задача | Итерация | Усилие |
|---|--------|----------|--------|
| D1 | §9.11 Quick Check: fix Elena Voice check claim (currently false) | iter 91 | LOW |
| D2 | OCEAN format: unify across guide (pipes vs compact) | iter 91 | LOW |
| D3 | Anchors placement: unify `<anchors>` XML vs `[ANCHORS]` convention | iter 91 | LOW |
| D4 | CORE_DIRECTIVES convention: document shorthand as accepted or enumerate inline | iter 91 | DECISION |

### Phase E — Dead weight cleanup (LOW)

| # | Задача | Итерация | Усилие |
|---|--------|----------|--------|
| E1 | Character Bible: decide fate of 7 unused supporting characters | iter 92+ | LOW |
| E2 | Part 7B Lorebook Entry 2: decide canonical vs non-canonical GHOST fact | iter 92+ | LOW |
