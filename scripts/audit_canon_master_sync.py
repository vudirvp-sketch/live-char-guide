#!/usr/bin/env python3
"""
Audit canon → master HTML sync (iter 44+45+46+47+50+51 regression guard).

Purpose:
    Verify that iter 44 + iter 45 + iter 46 + iter 47 + iter 50 canon→master
    HTML sync fixes are present in `src/master/*.html`. This is a focused
    regression test — it does NOT attempt a general-purpose semantic drift
    detector (added in iter 48 as `audit_canon_master_drift.py`).

    Each check compares a specific canon snippet (the source of truth in
    `docs/canon/*.md`) against the corresponding master HTML snippet,
    accounting for HTML entity escaping (`<` → `&lt;`, `>` → `&gt;`).

Scope:
    iter 44 (9 fixes — Phase 1, KI#33 PARTIAL):
      - P0-2/P0-3/P0-4/P0-5/P1-2 (KI#21-A2/A3/A7): part_04, part_07a (5 fixes)
      - KI#29/30/31 (iter 40/41 canon): part_07a, part_10 (4 fixes)

    iter 45 (24 fixes — Phase 2, KI#33 PARTIAL → closer to COMPLETE):
      - P0-1 (A1): appendix_glossary — T→A→P Pattern → Price (retired iter 177
        with Appendix C — F-19/DEC-31; the glossary is the registry/panel chain)
      - P0-7/P0-8/P0-9 (A4): part_04 — Выщербленный NEED text + variant row delete
      - P0-10 (A6): part_08 — AP-15 immediate Price
      - P0-11 (A9): part_09 — 3-level → 4-zone scale
      - P0-12 (A10): part_09 — Vysh Quick Check rename
      - P0-13/P0-14 (B1): part_10 — Omnis GHOST + FLAW rewrites
      - P0-16 (NEW-3): part_05 — §5.1 RULE expansion
      - P1-1 (A5): part_08 — AP-9 broken SPINE criterion
      - P1-3 (A8): part_08 — OCEAN Overload orphan row delete + footnote
      - P1-4 (B2): part_10 — Walter GHOST rewrite
      - P1-5 (B5): part_04 — Anchor type definitions
      - P1-6 (B6): part_06 — Tier 0 → Tier 0+
      - P1-7 (D1): part_04 — secondary GHOST row delete + note
      - P1-10 (D4+NEW-2): part_07a — Lorebook example пожар → предательство
      - P1-11 (D4): part_07b — Пример 1 added + Пример 2/3/4 renamed
      - P3-1 (D3): part_07b + part_10 — Greeting scene notes (×2)
      - P3-3 (D6): part_03 — Йоуёма context paragraph
      - P3-5 (F2): part_02 — Price table 4th column «Пример (конкретный)»
      - P3-6 (F3): part_03 — Voice Isolation methodology note

    iter 46 (8 fixes — Phase 3, KI#33 PARTIAL → closer to COMPLETE):
      - P2-1 (C1): part_01 — Ключевые термины block + bold Pattern Matcher
      - P2-9 (E6): part_07a — Pattern Matcher refs ×2 (Format Lock + RULE)
      - P2-12 (B4): part_03 — Tier 1/2/3 → Quality Grade A/B/C + disambiguation
      - P2-13 (F4): part_04 — «Запрещённые слова» → «Запрещённые формулировки»
      - P2-14 (F5): part_05 — Cautious zone definition after RULE
      - P2-16 (F7): part_07a — Keirsey SP Artisan → Sensing-Perceiving
      - P2-17 (F9): part_09 — 1-word symptoms for AP-refs (×5 in Decision Tree)
      - P3-4 (D7): part_01 + part_04 + part_09 — Уолтер cross-refs (×3)
      - P1-8/P1-9 (D1/D2): SKIP — secondary/variant LIE rows already absent
        in master HTML (never present; canon-only fix)

    iter 47 (16 fixes — Phase 4, KI#33 PARTIAL → COMPLETE):
      - P2-3 (C5): bridge-paragraph cleanup — 7 deletes in part_01/02/03/04/05/07a/08
        + 2 keeps in part_06 (CSS class added) + part_09
      - P2-7 (E4): part-resume removal — 11 deletes in part_01-10 + part_07b
        + 4 Synthesis paragraphs added in part_01/04/07a/08
      - P2-18 (F10): part_10 §10.1 Elena — 4 inline ↑ annotations deleted
        + Annotation callout with 6 items added after card
      - P3-2 (D5): part_10 — 4 Demonstrates: callouts added before Elena/Walter/
        Omnis-Zeta/Vyshcherblenny cards

    Also detects A3 collateral drift:
      - src/master/part_10.html L611 — «Счётчик вырезаний» in §10.4 AN

    Probe maintenance (in-step re-points, disclosed per the iter-148/155 precedent):
      - iter 157 (KI#84 canonical-audit reconciliation, owner-called): P3-4c moved
        CHECKS -> ABSENT_CHECKS as "P3-4c-del" — the master §9.6 Walter OCEAN
        cross-ref line deleted (carried Elena's values since iter 38; §9.7 = the
        sole Part-9 Walter reference). Total count unchanged: 73 positive + 24
        negative = 97.

Exit codes:
    0 — all checks PASS
    1 — one or more checks FAILED (regression detected)

Run:
    python3 scripts/audit_canon_master_sync.py
"""
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
MASTER_DIR = REPO / "src" / "master"

# Each check: (id, file, expected_substring, description)
# Substrings are chosen to be unique and stable across future content edits.
# HTML-escaped variants are used where canon uses raw < or >.
CHECKS = [
    # P0-2 moved to ABSENT_CHECKS as P0-2-del — iter 189 (v4-8) retired the §7A.13 extra-steps
    # bullet that carried it (a duplicate of §5.2/§10.1); the labels live in Part 10 §10.1.
    # ----- P0-3 / KI#21-A3: G3 row «после 7-го» addition in part_04 -----
    (
        "P0-3",
        "part_04.html",
        'после 3-го не помнит имя, после 5-го — зачем помогает, после 7-го — что такое "помощь"',
        "part_04 G3 row: «после 7-го» addition (iter 35 P0-3 fix)",
    ),
    # ----- P0-4 / KI#21-A3: «Счётчик вырезаний» line in §7A.5 AN -----
    (
        "P0-4",
        "part_07a.html",
        'после третьего не помнит имя, после пятого — зачем помогает, после седьмого — что такое "помощь".',
        "part_07a §7A.5 AN «Счётчик вырезаний»: «после седьмого» addition (iter 35 P0-4 fix)",
    ),
    # ----- P0-5 / KI#21-A3: G3 line in §7A.9 XML template -----
    (
        "P0-5",
        "part_07a.html",
        'после 3-го не помнит имя, после 5-го — зачем помогает, после 7-го — что такое "помощь"',
        "part_07a §7A.9 XML template G3: «после 7-го» addition (iter 35 P0-5 fix)",
    ),
    # ----- P1-2 / KI#21-A7: AN sections table new row -----
    (
        "P1-2",
        "part_07a.html",
        "<strong>Счётчик вырезаний:</strong> (Template B+, опционально) Счётчик событий для персонажей с прогрессивной деградацией",
        "part_07a AN sections table: «Счётчик вырезаний» row added (iter 36 P1-2/A7 fix)",
    ),
    # ----- KI#29 (iter 40): Выщербленный §10.4 OCEAN labels -----
    (
        "KI#29",
        "part_10.html",
        "Cautious zone: N=70 (граница 60–70, невротизм — на границе с экстремальной зоной",
        "part_10 §10.4 Выщербленный OCEAN: N=70 labeled as cautious zone (iter 40 KI#29 fix)",
    ),
    # ----- KI#30 (iter 41): Выщербленный §7A.9 OCEAN labels -----
    (
        "KI#30-7a",
        "part_07a.html",
        "Cautious zone: N=70 (граница 60–70; экстремум — строго ниже 30 или выше 70)",
        "part_07a §7A.9 Выщербленный OCEAN: N=70 labeled as cautious zone (iter 41 KI#30 fix; re-pointed iter 201 — §-pointer removed from the card note, same threshold semantics)",
    ),
    # ----- KI#30 (iter 41): Елена §10.1 OCEAN labels -----
    (
        "KI#30-10",
        "part_10.html",
        "Cautious zone: A=38 (граница 30–40, конфликтность), N=68 (граница 60–70, тревожность)",
        "part_10 §10.1 Елена OCEAN: A=38/N=68 labeled as cautious zone (iter 41 KI#30 fix)",
    ),
    # ----- KI#31 (iter 41): Cross-ref Notes (2 locations) -----
    # REMOVED iter 172 (v3 stage 2, F-05): both Notes carried a repository path
    # (`docs/vyshcherblenny_character_bible.md`) inside a copy-paste template.
    # The templates no longer contain the note; the 16K+ canonical OCEAN values
    # they carried now live in a Russian note OUTSIDE the template (§7A.9 and
    # §10.4). The probe count drops 97 → 95 (disclosed in the iter-172 worklog).
    # ----- A3 collateral: «Счётчик вырезаний» in §10.4 AN -----
    (
        "A3-10",
        "part_10.html",
        'Счётчик вырезаний: [обновляется в сессии] — после третьего не помнит имя, после пятого — зачем помогает, после седьмого — что такое "помощь".',
        "part_10 §10.4 AN «Счётчик вырезаний»: «после седьмого» addition (A3 collateral fix)",
    ),
    # ================================================================
    # iter 45 — Phase 2 canon→master HTML sync (24 fixes)
    # ================================================================
    # ----- P0-1 (A1): Glossary heading T→A→P Pattern → Price — RETIRED iter 177
    # (Appendix C deleted per F-19/DEC-31; the probe target no longer exists) -----
    # ----- P0-7 (A4): part_04 Выщербленный NEED text update -----
    (
        "P0-7",
        "part_04.html",
        "<tr><td>Выщербленный</td><td>Стать цельным — заполнить пустоты внутри</td><td>Принять, что полноценности не существует. Выбрать, как растворяться — в функции или в диссонансе.</td>",
        "part_04 NEED table: Выщербленный canonical NEED updated (iter 35 P0-7 fix)",
    ),
    # ----- P0-8 (A4): part_04 full chain NEED text update -----
    (
        "P0-8",
        "part_04.html",
        "NEED: Принять, что полноценности не существует. Выбрать, как растворяться — в функции или в диссонансе.",
        "part_04 full chain: NEED text updated (iter 35 P0-8 fix)",
    ),
    # ----- P0-9 (A4): part_04 Выщербленный variant row deleted -----
    (
        "P0-9",
        "part_04.html",
        "<tr><td>Елена (variant — показывает, что WANT может маскировать NEED)</td><td>Избегать привязанностей</td>",
        "part_04 NEED table: variant rows now labeled + Выщербленный variant deleted (iter 35 P0-9 fix; needle re-pointed iter 181 — audit-181 variant-row purpose labels)",
    ),
    # ----- P0-10 (A6): part_08 AP-15 immediate Price -----
    (
        "P0-10",
        "part_08.html",
        'хлопает дверью → кричит: «Вон!»',
        "part_08 AP-15 ❌ example: immediate Price «кричит: Вон!» (iter 35 P0-10 fix)",
    ),
    # ----- P0-11 (A9): part_09 4-зонная шкала -----
    # iter 47 update: original P0-11 fix was applied to resume section text
    # in iter 44, but iter 47 P2-7 deleted the entire resume section.
    # The fix's intent (4-zone, not 3-level) is now verified via the
    # "4 зоны качества" phrasing in §9.11 main text (was "4 уровня" before
    # iter 47 sync completion).
    # iter 102 update: "показаны выше" → "показаны ниже" — E14 VS-EMBED moved
    # from before the intro <p> to after it (iter 102 VS-EMBED reorder fix).
    (
        "P0-11",
        "part_09.html",
        "4 зоны качества показаны ниже (VS-EMBED E14: Критический 0–25% / Слабый 25–50% / Хороший 50–85% / Отличный 85–100%)",
        "part_09 §9.11: 3-level → 4-zone scale (iter 35 P0-11 fix, iter 47 sync completion — «4 уровня» → «4 зоны»; iter 102 — «выше» → «ниже» after E14 reorder)",
    ),
    # ----- P0-12 (A10): part_09 Vysh Quick Check — retired by the v3 S3 merge -----
    # iter 173 (v3 Stage 3): the separate Vysh «Структурная проверка / Полная проверка»
    # pair was merged into the ONE checklist — the iter-35 Quick Check rename
    # no longer has a standalone heading to protect. The probe now guards the merge.
    # iter 190 (v4-9 chapter 9): the ONE checklist grew 14 → 18 items (RepPen,
    # Temperature, block budget, Embodiment) — the needle moved with the heading.
    (
        "P0-12",
        "part_09.html",
        "<h3>Единый чек-лист (18 пунктов)</h3>",
        "part_09 §9.5: ONE deploy checklist (18 numbered items; the Vysh example merged "
        "into it, iter 173; +4 pre-deploy checks iter 190 — supersedes the iter-35/51/105 "
        "Quick Check rename)",
    ),
    # ----- P0-13 (B1 GHOST): part_10 Omnis GHOST rewrite -----
    (
        "P0-13",
        "part_10.html",
        "GHOST: Первая аугментация заменила левый глаз на линзу переменного фокуса. В тот день перестал различать оттенки боли — чужой и собственной. (См. слои призрака, Tier 1/2, ниже для полной хронологии.)",
        "part_10 Omnis GHOST: concrete event replacing abstract fear (iter 35 P0-13 fix)",
    ),
    # ----- P0-14 (B1 FLAW): part_10 Omnis FLAW rewrite -----
    (
        "P0-14",
        "part_10.html",
        'FLAW: Анализирует эмоции органиков как «сбои химической регуляции», предлагает «калибровку» вместо утешения',
        "part_10 Omnis FLAW: concrete behavior replacing abstract adjective (iter 35 P0-14 fix)",
    ),
    # ----- P0-16 (NEW-3): part_05 §5.1 RULE expansion -----
    # iter 195 (ch.2 Part 5 rewrite): the rule was re-worded together with the section
    # (5 → 4 sections; two RULEs merged into one scale owner). The needle is re-pointed
    # to the NEW canonical sentence, intent preserved: one owner, context ceilings,
    # SPINE-bridge requirement, 4+ = critical. Same numbers, same single home.
    (
        "P0-16",
        "part_05.html",
        "<p><strong>ПРАВИЛО:</strong> 1–2 экстремальных полюса OCEAN (значение ниже 30 или выше 70) — рекомендация; жёсткий потолок задаёт бюджет контекста: 4K — 2, 8K — 3, 16K+ — 4, 32K+ — 5. Каждая крайность сверх двух допустима только со SPINE-связкой (GHOST/LIE/FLAW/NEED/WANT) — без неё модель не разрешает конфликт последовательно. Четыре и больше крайностей без обоснования — критический перегруз: в чек-листе перед деплоем карточка получает уровень «Критический».</p>",
        "part_05 §5.1 RULE: the SINGLE OCEAN pole-limit scale (F-01 closed iter 174: one owner, context ceilings, SPINE-bridge requirement; re-pointed iter 195 after the §5.1 rewrite)",
    ),
    # ----- P1-1 (A5): part_08 AP-9 broken SPINE criterion -----
    (
        "P1-1",
        "part_08.html",
        "<strong>Критерий сломанной SPINE (broken SPINE)</strong> (сохраняется как диагностика): «желание совместимо с потребностью — нет конфликта» + дефект не объяснён через ложь/призрак",
        "part_08 AP-9: Критерий broken SPINE clarification paragraph added (iter 36 P1-1 fix)",
    ),
    # ----- P1-3 (A8): part_08 OCEAN Overload orphan row deleted + footnote -----
    # iter 190 (v4-9 chapter 9): the footnote itself retired — it was pure guide-meta
    # («ранее был AP-15, перенесён в Part 5») inside the anti-pattern reference, and
    # chapter 9 carries no routing. Moved to ABSENT_CHECKS as P1-3-del; count 87 kept.
    # ----- P1-4 (B2): part_10 Walter GHOST rewrite -----
    (
        "P1-4",
        "part_10.html",
        "GHOST: Gray Matter — продал свою долю за $5000. Партнёры стали миллиардерами. Сам работаю учителем химии в подержанном Pontiac Aztek.",
        "part_10 Walter GHOST: concrete observation replacing label «Унижение» (iter 36 P1-4 fix)",
    ),
    # ----- P1-5 (B5): part_04 Anchor type definitions -----
    (
        "P1-5",
        "part_04.html",
        "<h3>Определения типов якорей</h3>",
        "part_04 §4.8: Anchor type definitions section added (iter 36 P1-5 fix)",
    ),
    # ----- P1-6 (B6): part_06 Tier 0 → Tier 0+ -----
    # iter 76 update: substring relaxed — exact label changed from
    # «12B+, базовый/стандартный» to «12B+, только Embodiment» (P1.7 — Tier 0 clarification).
    # Invariant preserved: «12B+» (not «12B»).
    (
        "P1-6",
        "part_06.html",
        "<tr><td><strong>Tier 0</strong></td><td>12B+, только Embodiment</td>",
        "part_06 §6.3: Tier 0 «12B» → «12B+» (iter 36 P1-6 fix; iter 76 P1.7 label update)",
    ),
    # ----- P1-7 (D1): part_04 secondary GHOST row deleted + note -----
    (
        "P1-7",
        "part_04.html",
        "<p><strong>НАБЛЮДЕНИЕ:</strong> В учебном гайде каждый персонаж имеет ОДИН канонический призрак (GHOST). У Елены — предательство редактора. Множественная травма (слои призрака, GHOST Layers) — см. Выщербленный, «Слои призрака» ниже.</p>",
        "part_04 §4.2: secondary GHOST row deleted + Примечание added (iter 36 P1-7 fix)",
    ),
    # ----- P1-10 (D4+NEW-2): part_07a Lorebook example пожар → предательство -----
    (
        "P1-10",
        "part_07b.html",
        "<td>предательство, редактор, Марина, украденная история</td>",
        "part_07b §7B.2 Lorebook example: primary GHOST «предательство» — moved from the retired §7A.13 extra-steps bullet (iter 36 P1-10 fix; re-pointed iter 189 v4-8)",
    ),
    # ----- P1-11 (D4): part_07b Пример 1 (предательство) added + Пример 2/3/4 renamed -----
    (
        "P1-11",
        "part_07b.html",
        "📝 Пример 1: GHOST-факт Елены (предательство, primary)",
        "part_07b §7B.3: Пример 1 (предательство, primary) added + existing examples renumbered (iter 36 P1-11 fix)",
    ),
    # ----- P3-1 (D3): part_07b Greeting note added -----
    (
        "P3-1-7b",
        "part_07b.html",
        "<p><strong>НАБЛЮДЕНИЕ:</strong> Greeting Елены здесь — учебный пример для разбора 4-шагового алгоритма (бар, ночь).",
        "part_07b §7B.2: Greeting scene clarification note (iter 38 P3-1 fix)",
    ),
    # ----- P3-1 (D3): part_10 Greeting note added -----
    (
        "P3-1-10",
        "part_10.html",
        "<p><strong>НАБЛЮДЕНИЕ:</strong> Greeting Елены здесь (кабинет редакции, 2 часа ночи) — canonical для production-карточки.",
        "part_10 §10.1: Greeting scene clarification note (iter 38 P3-1 fix)",
    ),
    # ----- P3-3 (D6): part_03 Йоуёма context added -----
    (
        "P3-3",
        "part_03.html",
        "<p><strong>Сквозные персонажи:</strong> Выщербленный — паразит памяти из сеттинга «Ошметок Веля»",
        "part_03 §3.8: Йоуёма character context paragraph added (iter 38 P3-3 fix)",
    ),
    # ----- P3-5 (F2): part_02 Price table column added -----
    (
        "P3-5",
        "part_02.html",
        "<th scope=\"col\">Тип</th><th scope=\"col\">Механика</th><th scope=\"col\">Категории реакций</th><th scope=\"col\">Пример (конкретный)</th>",
        "part_02 §2.2 Price table: 4th column «Пример (конкретный)» added (iter 38 P3-5 fix)",
    ),
    # ----- P3-6 (F3): part_03 Voice Isolation methodology note added -----
    (
        "P3-6",
        "part_03.html",
        "<p><strong>Методология:</strong> проценты — качественные ориентиры, не точные измерения. Замеры сделаны на 12B–32B моделях ранних поколений",
        "part_03 §3.1: Voice Isolation % methodology note (iter 38 P3-6 fix; compressed to §1.1 pointer iter 129 — R05/ed-7; de-linked iter 187 — v4-6 chapter 4, the caveat stands in place)",
    ),
    # ================================================================
    # iter 46 — Phase 3 canon→master HTML sync (8 fixes, P1-8/9 SKIP)
    # ================================================================
    # ----- P2-1 (C1): part_01 §1.4 Ключевые термины block -----
    # iter 183 (v4-2 chapter 0): the terms list was retired by design — each term is defined
    # where it is used (glossary panel is the single term surface). P2-1a/P2-1b moved to
    # ABSENT_CHECKS as P2-1a-del / P2-1b-del (the block must not come back). Count unchanged.
    (
        "P2-1c",
        "part_01.html",
        "LLM = <strong>сопоставитель паттернов (Pattern Matcher)</strong>, не исполнитель правил",
        "part_01 §1.4: bold **Pattern Matcher** in RULE (iter 37 P2-1 fix)",
    ),
    # ----- P2-9 (E6): part_07a Pattern Matcher refs ×2 -----
    (
        "P2-9a",
        "part_07a.html",
        "Модель — сопоставитель паттернов (Pattern Matcher): два паттерна разметки в одной карточке дают два источника",
        "part_07a Format Lock: Pattern Matcher principle stated locally (no cross-part link) — v4 pilot ch.1 (iter 182; iter 37 P2-9 intent preserved)",
    ),
    (
        "P2-9b",
        "part_07a.html",
        "Выберите ОДНУ систему разметки и используйте её во всех Examples + Greeting. Смешение двух систем",
        "part_07a Format Lock RULE: one-markup rule stated locally (no cross-part link) — v4 pilot ch.1 (iter 182; iter 37 P2-9 intent preserved)",
    ),
    # ----- P2-12 (B4): part_03 §3.4 Tier 1/2/3 → Quality Grade A/B/C -----
    # iter 105: Grade A/B/C tier labels → класс A/B/C (Category C translation pass); Quality Grade compound kept as proper noun
    (
        "P2-12a",
        "part_03.html",
        "<strong>Quality Grade</strong> (класс A / B / C) (не путать с CoT Tier 0–3)",
        "part_03 §3.4: Quality Grade A/B/C disambiguation block added (iter 37 P2-12 fix; iter 105 Grade A/B/C → класс A/B/C)",
    ),
    (
        "P2-12b",
        "part_03.html",
        "<tr><th scope=\"col\">Критерий</th><th scope=\"col\">класс A (✓)</th><th scope=\"col\">класс B (⚠)</th><th scope=\"col\">класс C (✗)</th><th scope=\"col\">Относится к</th></tr>",
        "part_03 §3.4: quality table headers Tier 1/2/3 → Grade A/B/C (iter 37 P2-12 fix; iter 105 Grade A/B/C → класс A/B/C)",
    ),
    (
        "P2-12c",
        "part_03.html",
        "<h3>До/После: класс A vs класс C</h3>",
        "part_03 §3.4: «До/После» heading Tier 1 vs Tier 3 → Grade A vs Grade C (iter 37 P2-12 fix); Grade A/C → класс A/C (iter 104 translation pass)",
    ),
    (
        "P2-12d",
        "part_03.html",
        "<div class=\"diff-label\">класс C (плохо)</div>",
        "part_03 §3.4: diff-view label Tier 3 → Grade C (iter 37 P2-12 fix; iter 105 Grade C → класс C)",
    ),
    (
        "P2-12e",
        "part_03.html",
        "<div class=\"diff-label\">класс A (хорошо)</div>",
        "part_03 §3.4: diff-view label Tier 1 → Grade A (iter 37 P2-12 fix; iter 105 Grade A → класс A)",
    ),
    # ----- P2-13 (F4): part_04 §4.2 «Запрещённые слова» → «Запрещённые формулировки» -----
    (
        "P2-13",
        "part_04.html",
        "<p><strong>ПРАВИЛО:</strong> Запрещённые формулировки — это выводы-ярлыки, не события. Примеры запрещённых: «травма», «пережил», «столкнулся с», «пострадал», «испытал». Призрак (GHOST) = ЧТО произошло, не вывод. Вместо них — конкретное событие: «в 7 лет видел, как дом сгорел, а пожарные не приехали вовремя».</p>",
        "part_04 §4.2: «Запрещённые слова» → «Запрещённые формулировки» with examples (iter 37 P2-13 fix)",
    ),
    # ----- P2-14 (F5): part_05 §5.1 Cautious zone definition -----
    # iter 107: cautious zone → осторожная зона (English gloss kept in parens on first mention); body fully Russian
    # iter 195 (ch.2 Part 5 rewrite): the paragraph kept its meaning and its English first-mention
    # gloss, and lost the second half-sentence that repeated the example. Needle re-pointed to the
    # NEW wording — same invariants: term + both bounds + the SPINE-link claim + both Elena values.
    (
        "P2-14",
        "part_05.html",
        "<p><strong>Осторожная зона (cautious zone, 30–40 / 60–70)</strong> — пограничная зона, не экстремальная, но уже влияющая на SPINE-связи (FLAW, GHOST-реактивность). Например, у Елены <code>A=38</code> держит FLAW (отталкивает людей сарказмом), а <code>N=68</code> — GHOST-реактивность (предательство редактора → недоверие).</p>",
        "part_05 §5.1: Cautious zone definition after the profile rule (iter 37 P2-14 fix; iter 107 cautious zone → осторожная зона; re-pointed iter 195 after the §5.1 rewrite)",
    ),
    # ----- P2-16 (F7): part_07a §7A.1 Keirsey SP Artisan → Sensing-Perceiving -----
    (
        "P2-16",
        "part_07a.html",
        "Keirsey SP (Sensing-Perceiving)",
        "part_07a §7A.1: Keirsey SP Artisan/Ремесленник → Sensing-Perceiving (iter 37 P2-16 fix; v4 pilot ch.1 dropped the Appendix-A link, iter 182)",
    ),
    # ----- P2-17 (F9): part_09 §9.3 E13 mapping AP labels -----
    # iter 173 (v3 Stage 3): the 5-group shorthand tree table was retired (its two
    # unique rows moved into §9.2); the 1-word AP shorthand labels died with it.
    # The full AP labels in the E13 mapping table are the surviving form.
    (
        "P2-17",
        "part_09.html",
        "<strong>Утечка голоса в Description/SP</strong> — AP-3 (голос в Description)",
        "part_09 §9.3: E13 mapping keeps the full AP labels (the 1-word shorthand tree "
        "table retired, iter 173)",
    ),
    # ----- P3-4 (D7): Уолтер cross-refs (3 locations) -----
    # iter 183 (v4-2 chapter 0): the §1.4 Walter cross-ref was retired with the term list
    # (chapter 0 carries no cross-chapter links). P3-4a moved to ABSENT_CHECKS as P3-4a-del.
    # iter 184 (v4-3 chapter 2): P3-4b retired with the same rule (chapter 2 carries no
    # cross-chapter links) — moved to ABSENT_CHECKS as P3-4b-del. Count unchanged (87).

    # ============================================================
    # iter 47 — Phase 4: P2-3 (C5) Bridge paragraphs cleanup
    # 7 deletes in part_01/02/03/04/05/07a/08; 2 keeps in part_06/09
    # ============================================================
    # Negative checks: ensure deleted bridge text is ABSENT.
    # Python helper below uses ABSENT_CHECKS list for these.
    # Positive checks: confirm 2 kept bridges still present with proper CSS class.
    (
        "P2-3-keep-06",
        "part_06.html",
        '<p class="bridge-paragraph">Все компоненты спроектированы. Теперь их нужно собрать в единый System Prompt',
        "part_06 §6-end: Bridge to Part 7A KEPT with bridge-paragraph CSS class (iter 47 P2-3 fix)",
    ),
    (
        "P2-3-keep-09",
        "part_09.html",
        '<p class="bridge-paragraph">Вся теория и диагностика позади. Следующий раздел содержит полные карточки-шаблоны',
        "part_09 §9-end: Bridge to Part 10 KEPT with bridge-paragraph CSS class (iter 47 P2-3 fix)",
    ),

    # ============================================================
    # iter 47 — Phase 4: P2-7 (E4) Resume sections removal
    # 11 deletes in part_01-10 + part_07b; 4 Synthesis added in part_01/04/07a/08
    # ============================================================
    (
        "P2-7-syn-01",
        "part_01.html",
        "<p>Если в карточке есть SP, Description, Examples, Greeting — она уже работает: это и есть минимальная рабочая карточка, минимум — четыре блока. Три правила (якорь = T→A→P, голос только в Examples, психология только в Description) — единственное, что нельзя нарушать.</p>",
        "part_01 §1-end: Synthesis paragraph added (iter 47 P2-7 fix, replaces removed resume section)",
    ),
    (
        "P2-7-syn-04",
        "part_04.html",
        "<p>SPINE — это причинная цепочка GHOST → LIE → FLAW → NEED → WANT. Она объясняет, ПОЧЕМУ персонаж действует так, а не иначе. Без SPINE якоря — набор случайных правил.</p>",
        "part_04 §4-end: Synthesis paragraph added (iter 47 P2-7 fix; needle re-pointed iter 181 — audit-181 inverted-echo fix)",
    ),
    # P2-7-syn-07a moved to ABSENT_CHECKS as P2-7-syn-07a-del — iter 189 (v4-8): the §7A.13
    # closing transition was a duplicate of §7A.1's "SP is a container" framing.
    (
        "P2-7-syn-08",
        "part_08.html",
        "<p>15 анти-паттернов покрывают самые частые ошибки сборки. Симптом → причина → исправление. Наиболее частые: AP-3 (голос в Description), AP-9 (сломанная SPINE), AP-15 (вложенные якоря).</p>",
        "part_08 §8-end: Synthesis paragraph added (iter 47 P2-7 fix, replaces removed resume section)",
    ),

    # ============================================================
    # iter 97 — Annotation callout blocks REMOVED from all 4 Part 10 cards
    # (Elena, Walter, Omnis-Zeta, Vyshcherblenny) + Cross-ref line removed.
    # Previous iter 47 P2-18 positive checks converted to absent checks.
    # ============================================================

    # ============================================================
    # iter 47 — Phase 4: P3-2 (D5) HTML comments → visible Demonstrates callouts
    # 4 Demonstrates: callouts added before Elena/Walter/Omnis-Zeta/Vyshcherblenny cards
    # ============================================================
    (
        "P3-2-elena",
        "part_10.html",
        "<p>Карточка демонстрирует: EMBODIMENT FIRST, ENVIRONMENTAL REACTIVITY, SHOW NEVER TELL, SPINE CAUSALITY, SPATIAL & ANATOMICAL LOCK — см. Examples и Greeting ниже.</p>",
        "part_10 §10.1 Elena: Demonstrates callout before card (iter 47 P3-2 fix)",
    ),
    (
        "P3-2-walter",
        "part_10.html",
        "<p>Карточка демонстрирует: EMBODIMENT FIRST, SHOW NEVER TELL, INFLUENCE BOUNDARY, CONSEQUENCE DRIVEN, SPATIAL & ANATOMICAL LOCK, ENVIRONMENTAL REACTIVITY — см. Examples и Greeting ниже.</p>",
        "part_10 §10.2 Walter: Demonstrates callout before card (iter 47 P3-2 fix)",
    ),
    (
        "P3-2-omnis",
        "part_10.html",
        "<p>Карточка демонстрирует: EMBODIMENT FIRST, ENVIRONMENTAL REACTIVITY, SHOW NEVER TELL, SPATIAL & ANATOMICAL LOCK, SPINE CAUSALITY, ANCHOR TRIGGER, INFLUENCE BOUNDARY, CONSEQUENCE DRIVEN, CoT LOGIC — см. Examples, CoT и Greeting ниже.</p>",
        "part_10 §10.3 Omnis-Zeta: Demonstrates callout before card (iter 47 P3-2 fix)",
    ),
    (
        "P3-2-vysh",
        "part_10.html",
        "<p>Карточка демонстрирует: SPATIAL & ANATOMICAL LOCK, EMBODIMENT FIRST, ENVIRONMENTAL REACTIVITY, SHOW NEVER TELL, SPINE CAUSALITY, ANCHOR TRIGGER, CONSEQUENCE DRIVEN, CoT LOGIC — см. Examples, CoT и Greeting ниже.</p>",
        "part_10 §10.4 Vyshcherblenny: Demonstrates callout before card (iter 47 P3-2 fix)",
    ),

    # ================================================================
    # iter 50 — KI#34 fix: §1.6 Pre-build checklist section added to master HTML
    # ================================================================
    # Canon `docs/canon/part_01.md` L128-145 declares `data-section: p1_prebuild_checklist`
    # but master HTML was missing the section (7 sections vs canon 8).
    # iter 50 fix: added `<section data-section="p1_prebuild_checklist" data-toc-nav>`
    # block at end of `src/master/part_01.html` with 6-row table + RECOMMENDATION
    # callout + Cross-ref. Drift detector confirms section now exists.
    (
        "KI#34-section",
        "part_01.html",
        'data-section="p1_prebuild_checklist"',
        "part_01 §1.6 Pre-build checklist: section block added (iter 50 KI#34 fix; iter 51 KI#36: id attr added, substring relaxed)",
    ),
    (
        "KI#34-table",
        "part_01.html",
        "<th scope=\"col\">#</th><th scope=\"col\">Вопрос</th><th scope=\"col\">Варианты</th><th scope=\"col\">Что это определяет</th>",
        "part_01 §1.6 Pre-build checklist: 6-row table header (iter 50 KI#34 fix)",
    ),
    (
        "KI#34-callout",
        "part_01.html",
        "<p><strong>РЕКОМЕНДАЦИЯ:</strong> Если вы впервые собираете карточку — выбирайте «12B / 8K / Простая / 1 GHOST / без CoT / без Lorebook».",
        "part_01 §1.6 Pre-build checklist: RECOMMENDATION callout (iter 50 KI#34 fix)",
    ),
    # ----- KI#36 (iter 51): id attributes on <section> elements -----
    # All <section data-section="X"> must now have id="X" too, so that
    # anchor links like <a href="#X"> work natively in browsers.
    # These 4 checks cover representative sections across parts/appendices.
    (
        "KI#36-id-p1",
        "part_01.html",
        'data-section="p1_card_overview" id="p1_card_overview"',
        "part_01: id attribute on p1_card_overview section (iter 51 KI#36 fix — anchor nav)",
    ),
    (
        "KI#36-id-p4",
        "part_04.html",
        'data-section="p4_spine_overview" id="p4_spine_overview"',
        "part_04: id attribute on p4_spine_overview section (iter 51 KI#36 fix — anchor nav)",
    ),
    (
        "KI#36-id-p7a",
        "part_07a.html",
        'data-section="p7a_system_prompt" id="p7a_system_prompt"',
        "part_07a: id attribute on p7a_system_prompt section (iter 51 KI#36 fix — anchor nav)",
    ),
    # KI#36-id-appendix-glossary retired iter 177 (Appendix C deleted, F-19/DEC-31).
]

# Negative checks: substrings that MUST NOT appear in master HTML.
# Used to verify that iter 47 deletes (bridge-paragraph cleanup, part-resume
# removal, Elena inline ↑ annotations) actually took effect.
ABSENT_CHECKS = [
    # ----- iter 190 (v4-9 chapter 9): retired-by-design sites (guards, not deletes) -----
    (
        "P1-3-del",
        "part_08.html",
        "OCEAN Overload ранее был AP-15",
        "part_08 §8.1: the OCEAN-Overload footnote retired — pure guide-meta routing inside "
        "the anti-pattern reference (iter 190 v4-9 chapter 9; former P1-3)",
    ),
    # ----- iter 189 (v4-8 chapters 7-8): retired-by-design sites (guards, not deletes) -----
    (
        "P0-2-del",
        "part_07a.html",
        "Экстремальных полюса: 1 (O=72 &gt; 70). A=38 и N=68 — осторожная зона (cautious zone, 30–40 / 60–70), напрямую связаны с дефектом (FLAW) и призраком (GHOST)",
        "part_07a §7A.13: Elena OCEAN bullet retired with the extra-steps list — the labels live in §5.2/§10.1 (iter 189 v4-8; former P0-2)",
    ),
    (
        "P2-7-syn-07a-del",
        "part_07a.html",
        "<p>Системный промпт — контейнер, который модель видит всегда. Identity + Anti-godmoding + CORE DIRECTIVES + Tone Frame + Format Lock. Всё остальное (SPINE, OCEAN, Examples) живёт в Description и Examples.</p>",
        "part_07a §7A.13: closing transition retired — §7A.1 already states the container framing (iter 189 v4-8; former P2-7-syn-07a)",
    ),
    # ----- iter 183 (v4-2 chapter 0): three retired-by-design sites (guards, not deletes) -----
    (
        "P2-1a-del",
        "part_01.html",
        "Ключевые термины (используются далее без перевыполнения)",
        "part_01 §1.4: terms list retired by design — each term is defined where used; glossary is the single term surface (iter 183 v4-2; former P2-1a)",
    ),
    (
        "P2-1b-del",
        "part_01.html",
        "<li><strong>SPINE</strong> — психологический каркас из 5 элементов (GHOST/LIE/FLAW/NEED/WANT), см. Part 4.</li>",
        "part_01 §1.4: SPINE term-list row retired with the block (iter 183 v4-2; former P2-1b)",
    ),
    (
        "P3-4a-del",
        "part_01.html",
        "<a href=\"#p10_walter\">§10.2</a>.</p>",
        "part_01 §1.4: Walter cross-ref retired with the term list — chapter 0 carries no cross-chapter links (iter 183 v4-2; former P3-4a)",
    ),
    (
        "P3-4b-del",
        "part_04.html",
        "Пример простой карточки без слоёв призрака (один GHOST, упрощённая SPINE) — Уолтер Уайт",
        "part_04 §4.2: Walter cross-ref retired — chapter 2 carries no cross-chapter links (iter 184 v4-3; former P3-4b)",
    ),
    # ----- P2-3 (C5): 7 deleted bridge-paragraphs -----
    (
        "P2-3-del-01",
        "part_01.html",
        "Базовые блоки определяют, ЧТО ваш персонаж из себя представляет",
        "part_01: deleted bridge-paragraph to Part 2 (iter 47 P2-3 fix)",
    ),
    (
        "P2-3-del-02",
        "part_02.html",
        "Anchors управляют тем, КОГДА персонаж действует. Voice (голос) управляет тем, КАК он звучит",
        "part_02: deleted bridge-paragraph to Part 3 (iter 47 P2-3 fix)",
    ),
    (
        "P2-3-del-03",
        "part_03.html",
        "Якоря и Voice (голос) управляют поверхностным поведением",
        "part_03: deleted bridge-paragraph to Part 4 (iter 47 P2-3 fix)",
    ),
    (
        "P2-3-del-04",
        "part_04.html",
        "SPINE-профиль построен и проверен на консистентность",
        "part_04: deleted bridge-paragraph to Part 5 (iter 47 P2-3 fix)",
    ),
    (
        "P2-3-del-05",
        "part_05.html",
        "Психологически обоснованный профиль персонажа готов",
        "part_05: deleted bridge-paragraph to Part 6 (iter 47 P2-3 fix)",
    ),
    (
        "P2-3-del-07a",
        "part_07a.html",
        "System Prompt — ядро, которое всегда находится в контексте. Но у персонажей есть знания",
        "part_07a: deleted bridge-paragraph to Part 7B (iter 47 P2-3 fix)",
    ),
    (
        "P2-3-del-08",
        "part_08.html",
        "Анти-паттерны указывают, чего избегать. Диагностика показывает",
        "part_08: deleted bridge-paragraph to Part 9 (iter 47 P2-3 fix)",
    ),

    # ----- P3-4c (D7/KI#84): part_09 §9.6 Walter OCEAN cross-ref line DELETED -----
    # iter 157 (KI#84 canonical-audit reconciliation, owner-called): the line carried
    # Elena's OCEAN values (A=38, N=68, cautious zones, O=72) attributed to Walter
    # since iter 38 (Walter §10.2 actual: O:65 C:85 E:30 A:25 N:60); §9.7 keeps the
    # sole Part-9 reference to Walter's OCEAN example (C=85, A=25, E=30). The probe
    # moved CHECKS -> ABSENT_CHECKS in step with the deletion — both tool anchors
    # (this probe + audit_diagnostics_parity.py WALTER_ANCHOR) moved together.
    (
        "P3-4c-del",
        "part_09.html",
        "Пример тестирования карточки с OCEAN-профилем (A=38, N=68",
        "part_09 §9.6: Walter OCEAN cross-ref line DELETED (iter 157 KI#84 reconciliation — Elena's values had been attributed to Walter; §9.7 = the sole Part-9 Walter reference)",
    ),

    # ----- P2-7 (E4): 11 deleted part-resume sections -----
    # We check for the «<h3>Что вы теперь умеете</h3>» heading appearing
    # inside a <div class="part-resume"> wrapper — these must all be gone
    # from Parts (appendices are out of scope for KI#21).
    (
        "P2-7-del-02",
        "part_02.html",
        '<div class="part-resume">',
        "part_02: deleted part-resume section (iter 47 P2-7 fix)",
    ),
    (
        "P2-7-del-03",
        "part_03.html",
        '<div class="part-resume">',
        "part_03: deleted part-resume section (iter 47 P2-7 fix)",
    ),
    (
        "P2-7-del-05",
        "part_05.html",
        '<div class="part-resume">',
        "part_05: deleted part-resume section (iter 47 P2-7 fix)",
    ),
    (
        "P2-7-del-06",
        "part_06.html",
        '<div class="part-resume">',
        "part_06: deleted part-resume section (iter 47 P2-7 fix)",
    ),
    (
        "P2-7-del-07b",
        "part_07b.html",
        '<div class="part-resume">',
        "part_07b: deleted part-resume section (iter 47 P2-7 fix)",
    ),
    (
        "P2-7-del-09",
        "part_09.html",
        '<div class="part-resume">',
        "part_09: deleted part-resume section (iter 47 P2-7 fix)",
    ),
    (
        "P2-7-del-10",
        "part_10.html",
        '<div class="part-resume">',
        "part_10: deleted part-resume section (iter 47 P2-7 fix)",
    ),

    # ----- P2-18 (F10): 4 deleted inline ↑ annotations in Elena card -----
    (
        "P2-18-del-1",
        "part_10.html",
        "&lt;!-- ↑ Этот блок добавляет SPINE framework",
        "part_10 §10.1: deleted inline ↑ annotation for SPINE (iter 47 P2-18 fix)",
    ),
    (
        "P2-18-del-2",
        "part_10.html",
        "&lt;!-- ↑ Этот блок добавляет OCEAN профиль",
        "part_10 §10.1: deleted inline ↑ annotation for OCEAN (iter 47 P2-18 fix)",
    ),
    (
        "P2-18-del-3",
        "part_10.html",
        "&lt;!-- ↑ Этот пример добавляет FLAW-linked поведение",
        "part_10 §10.1: deleted inline ↑ annotation for FLAW-linked Example (iter 47 P2-18 fix)",
    ),
    (
        "P2-18-del-4",
        "part_10.html",
        "&lt;!-- ↑ Эти Anchors добавляет SPINE framework",
        "part_10 §10.1: deleted inline ↑ annotation for FLAW-linked Anchors (iter 47 P2-18 fix)",
    ),

    # ============================================================
    # iter 97 — Annotation callout blocks REMOVED from all 4 Part 10 cards
    # Verifies no Annotation: Карточка ... демонстрирует: blocks remain.
    # ============================================================
    (
        "iter97-no-elena-annotation",
        "part_10.html",
        "<p><strong>Annotation:</strong> Карточка Елены демонстрирует:</p>",
        "part_10 §10.1: Annotation callout block removed (iter 97)",
    ),
    (
        "iter97-no-walter-annotation",
        "part_10.html",
        "<p><strong>Annotation:</strong> Карточка Уолтера демонстрирует:</p>",
        "part_10 §10.2: Annotation callout block removed (iter 97)",
    ),
    (
        "iter97-no-omnis-annotation",
        "part_10.html",
        "<p><strong>Annotation:</strong> Карточка Омнис-Зета демонстрирует:</p>",
        "part_10 §10.3: Annotation callout block removed (iter 97)",
    ),
    (
        "iter97-no-vysherblenny-annotation",
        "part_10.html",
        "<p><strong>Annotation:</strong> Карточка Выщербленного демонстрирует:</p>",
        "part_10 §10.4: Annotation callout block removed (iter 97)",
    ),
    (
        "iter97-no-crossref",
        "part_10.html",
        "Подробно о Lorebook → Part 7B",
        "part_10 §10.4: Cross-ref line removed (iter 97)",
    ),
]


def main() -> int:
    print("=" * 70)
    print("audit_canon_master_sync.py — iter 44–97 regression guard")
    print("Verifies that iter 44–51 + iter 97 canon→master HTML sync fixes are in place.")
    print("=" * 70)
    print()

    failures = []
    pass_count = 0

    # Positive checks: substrings that MUST be present.
    for check_id, filename, expected, description in CHECKS:
        filepath = MASTER_DIR / filename
        if not filepath.exists():
            failures.append((check_id, filename, "FILE NOT FOUND", description))
            print(f"  FAIL [{check_id}] {filename}: file not found")
            continue

        content = filepath.read_text(encoding="utf-8")
        if expected in content:
            print(f"  PASS [{check_id}] {filename}: {description}")
            pass_count += 1
        else:
            failures.append((check_id, filename, "substring not found", description))
            print(f"  FAIL [{check_id}] {filename}: substring not found")
            print(f"         Expected: {expected[:80]}...")
            print(f"         Description: {description}")

    # Negative checks: substrings that MUST NOT be present (verifies deletes).
    print()
    print("-" * 70)
    print("Negative checks (verifies iter 47 deletes):")
    print("-" * 70)
    for check_id, filename, forbidden, description in ABSENT_CHECKS:
        filepath = MASTER_DIR / filename
        if not filepath.exists():
            failures.append((check_id, filename, "FILE NOT FOUND", description))
            print(f"  FAIL [{check_id}] {filename}: file not found")
            continue

        content = filepath.read_text(encoding="utf-8")
        if forbidden not in content:
            print(f"  PASS [{check_id}] {filename}: {description}")
            pass_count += 1
        else:
            failures.append((check_id, filename, "forbidden substring still present", description))
            print(f"  FAIL [{check_id}] {filename}: forbidden substring still present")
            print(f"         Forbidden: {forbidden[:80]}...")
            print(f"         Description: {description}")

    print()
    print("=" * 70)
    if failures:
        print(f"FAILED: {len(failures)} check(s) failed, {pass_count} passed")
        print()
        print("Regression detected — iter 44–97 fixes are NOT all in place.")
        print("Investigate src/master/*.html and re-apply missing fixes.")
        return 1
    else:
        print(f"PASS: all {pass_count} checks passed")
        print()
        print("iter 44–97 canon→master HTML sync fixes are in place.")
        print()
        print("NOTE: This is a focused regression test for iter 44–97 fixes.")
        print("      A general-purpose canon↔master drift detector is available")
        print("      as `scripts/audit_canon_master_drift.py` (added iter 48).")
        return 0


if __name__ == "__main__":
    sys.exit(main())
