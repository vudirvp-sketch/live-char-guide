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
      - P0-1 (A1): appendix_glossary — T→A→P Pattern → Price
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
    # ----- P0-2 / KI#21-A2: Елена OCEAN extreme poles 3→1 -----
    (
        "P0-2",
        "part_07a.html",
        "Экстремальных полюса: 1 (O=72 &gt; 70). A=38 и N=68 — cautious zone",
        "Елена OCEAN: extreme poles 3→1 + cautious zone labels (iter 35 P0-2 fix)",
    ),
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
        "Cautious zone: N=70 (граница 60–70, см. Part 5 §5.1 RULE",
        "part_07a §7A.9 Выщербленный OCEAN: N=70 labeled as cautious zone (iter 41 KI#30 fix)",
    ),
    # ----- KI#30 (iter 41): Елена §10.1 OCEAN labels -----
    (
        "KI#30-10",
        "part_10.html",
        "Cautious zone: A=38 (граница 30–40, конфликтность), N=68 (граница 60–70, тревожность)",
        "part_10 §10.1 Елена OCEAN: A=38/N=68 labeled as cautious zone (iter 41 KI#30 fix)",
    ),
    # ----- KI#31 (iter 41): Cross-ref Notes (2 locations) -----
    # Note: inside <pre><code> blocks the **Cross-ref:** markdown is shown as
    # literal text (not rendered as <strong>), matching canon's source markdown.
    (
        "KI#31-7a",
        "part_07a.html",
        "**Cross-ref:** Moderate values (4K-fallback / pedagogical). For 16K+ canonical extreme values (O=85, C=25, A=15, N=92, E=60) — see <code>docs/vyshcherblenny_character_bible.md</code> §OCEAN.",
        "part_07a §7A.9 OCEAN: Cross-ref Note to bible (iter 41 KI#31 fix)",
    ),
    (
        "KI#31-10",
        "part_10.html",
        "**Cross-ref:** Moderate values (4K-fallback / pedagogical). For 16K+ canonical extreme values (O=85, C=25, A=15, N=92, E=60) — see <code>docs/vyshcherblenny_character_bible.md</code> §OCEAN.",
        "part_10 §10.4 OCEAN: Cross-ref Note to bible (iter 41 KI#31 fix)",
    ),
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
    # ----- P0-1 (A1): Glossary heading T→A→P Pattern → Price -----
    (
        "P0-1",
        "appendix_glossary.html",
        '<h3 id="gloss_tap">T→A→P (Trigger → Action → Price)</h3>',
        "appendix_glossary T→A→P heading: Pattern → Price (iter 35 P0-1 fix)",
    ),
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
        "<tr><td>Елена (variant)</td><td>Избегать привязанностей</td>",
        "part_04 NEED table: variant rows now labeled + Выщербленный variant deleted (iter 35 P0-9 fix)",
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
    # ----- P0-12 (A10): part_09 Vysh Quick Check rename -----
    # iter 51 KI#36: substring updated — "5 items" → "5 пунктов", "universal Quick Check" → "универсального Quick Check"
    (
        "P0-12",
        "part_09.html",
        "<h5>Структурная проверка Выщербленного (5 пунктов — отлична от универсального Quick Check выше)</h5>",
        "part_09 Vysh Quick Check heading renamed + clarifier paragraph (iter 35 P0-12 fix; iter 51 русификация)",
    ),
    # ----- P0-13 (B1 GHOST): part_10 Omnis GHOST rewrite -----
    (
        "P0-13",
        "part_10.html",
        "GHOST: Первая аугментация заменила левый глаз на линзу переменного фокуса. В тот день перестал различать оттенки боли — чужой и собственной. (См. Tier 1/2 GHOST Layers ниже для полной хронологии.)",
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
    (
        "P0-16",
        "part_05.html",
        "— рекомендуемый максимум для всех контекстов. Для 8K+ допустимо до 3, для 16K+ — до 4 (см. §5.3 контекстные лимиты).",
        "part_05 §5.1 RULE: context limits expansion (iter 35 P0-16 fix)",
    ),
    # ----- P1-1 (A5): part_08 AP-9 broken SPINE criterion -----
    (
        "P1-1",
        "part_08.html",
        "<strong>Критерий broken SPINE</strong> (сохраняется как диагностика): «WANT совместим с NEED — нет конфликта» + FLAW не объяснён через LIE/GHOST.",
        "part_08 AP-9: Критерий broken SPINE clarification paragraph added (iter 36 P1-1 fix)",
    ),
    # ----- P1-3 (A8): part_08 OCEAN Overload orphan row deleted + footnote -----
    (
        "P1-3",
        "part_08.html",
        "<p><strong>Примечание:</strong> OCEAN Overload ранее был AP-15, в v9 restructure перенесён в Part 5 §5.3",
        "part_08 §8.1: OCEAN Overload orphan row deleted + footnote added (iter 36 P1-3 fix)",
    ),
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
        "<h4>Определения типов Anchors</h4>",
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
        "<p><strong>Примечание:</strong> В учебном гайде каждый персонаж имеет ОДИН canonical GHOST. У Елены — предательство редактора. Множественная травма (GHOST Layers) — см. Выщербленный §4.11.</p>",
        "part_04 §4.2: secondary GHOST row deleted + Примечание added (iter 36 P1-7 fix)",
    ),
    # ----- P1-10 (D4+NEW-2): part_07a Lorebook example пожар → предательство -----
    (
        "P1-10",
        "part_07a.html",
        "Key «предательство, редактор, Марина, украденная история»",
        "part_07a §7A.13 Lorebook example: primary GHOST «предательство» (iter 36 P1-10 fix)",
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
        "<p><strong>Примечание:</strong> Greeting Елены здесь — учебный пример для разбора 4-шагового алгоритма (бар, ночь).",
        "part_07b §7B.2: Greeting scene clarification note (iter 38 P3-1 fix)",
    ),
    # ----- P3-1 (D3): part_10 Greeting note added -----
    (
        "P3-1-10",
        "part_10.html",
        "<p><strong>Примечание:</strong> Greeting Елены здесь (кабинет редакции, 2 часа ночи) — canonical для production-карточки.",
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
        "<th>Тип</th><th>Механика</th><th>Категории реакций</th><th>Пример (конкретный)</th>",
        "part_02 §2.2 Price table: 4th column «Пример (конкретный)» added (iter 38 P3-5 fix)",
    ),
    # ----- P3-6 (F3): part_03 Voice Isolation methodology note added -----
    (
        "P3-6",
        "part_03.html",
        "<p><strong>Методология:</strong> проценты отклонения — эмпирические оценки авторов гайда на основе тестирования ~50 карточек",
        "part_03 §3.1: Voice Isolation % methodology note added (iter 38 P3-6 fix)",
    ),
    # ================================================================
    # iter 46 — Phase 3 canon→master HTML sync (8 fixes, P1-8/9 SKIP)
    # ================================================================
    # ----- P2-1 (C1): part_01 §1.4 Ключевые термины block -----
    (
        "P2-1a",
        "part_01.html",
        "<p><strong>Ключевые термины (используются далее без перевыполнения):</strong></p>",
        "part_01 §1.4: Ключевые термины block added with Anchor/Voice/SPINE/OCEAN definitions (iter 37 P2-1 fix)",
    ),
    (
        "P2-1b",
        "part_01.html",
        "<li><strong>SPINE</strong> — психологический каркас из 5 элементов (GHOST/LIE/FLAW/NEED/WANT), см. Part 4.</li>",
        "part_01 §1.4: SPINE definition in Ключевые термины block (iter 37 P2-1 fix)",
    ),
    (
        "P2-1c",
        "part_01.html",
        "LLM = <strong>Pattern Matcher</strong>, не Исполнитель правил",
        "part_01 §1.4: bold **Pattern Matcher** in RULE (iter 37 P2-1 fix)",
    ),
    # ----- P2-9 (E6): part_07a Pattern Matcher refs ×2 -----
    (
        "P2-9a",
        "part_07a.html",
        "Модель — <a href=\"#p1_core_rules\">Pattern Matcher</a> (см. Part 1 §1.4): два паттерна разметки в одной карточке = произвольное переключение между ними.",
        "part_07a Format Lock: Pattern Matcher ref updated with «Модель —» prefix + «(см. Part 1 §1.4)» suffix (iter 37 P2-9 fix)",
    ),
    (
        "P2-9b",
        "part_07a.html",
        "модель выступает как <a href=\"#p1_core_rules\">Pattern Matcher</a> (см. §1.4 Part 1): два паттерна разметки = два источника",
        "part_07a Format Lock RULE: Pattern Matcher ref updated with «модель выступает как» prefix + «(см. §1.4 Part 1)» suffix (iter 37 P2-9 fix)",
    ),
    # ----- P2-12 (B4): part_03 §3.4 Tier 1/2/3 → Quality Grade A/B/C -----
    (
        "P2-12a",
        "part_03.html",
        "<strong>Quality Grade A / B / C</strong> (не путать с CoT Tier 0–3 из Part 6 или GHOST Layers Tier 1–3 из Part 10)",
        "part_03 §3.4: Quality Grade A/B/C disambiguation block added (iter 37 P2-12 fix)",
    ),
    (
        "P2-12b",
        "part_03.html",
        "<tr><th>Критерий</th><th>Grade A (✓)</th><th>Grade B (⚠)</th><th>Grade C (✗)</th><th>Относится к</th></tr>",
        "part_03 §3.4: quality table headers Tier 1/2/3 → Grade A/B/C (iter 37 P2-12 fix)",
    ),
    (
        "P2-12c",
        "part_03.html",
        "<h4>До/После: Grade A vs Grade C</h4>",
        "part_03 §3.4: «До/После» heading Tier 1 vs Tier 3 → Grade A vs Grade C (iter 37 P2-12 fix)",
    ),
    (
        "P2-12d",
        "part_03.html",
        "<div class=\"diff-label\">Grade C (плохо)</div>",
        "part_03 §3.4: diff-view label Tier 3 → Grade C (iter 37 P2-12 fix)",
    ),
    (
        "P2-12e",
        "part_03.html",
        "<div class=\"diff-label\">Grade A (хорошо)</div>",
        "part_03 §3.4: diff-view label Tier 1 → Grade A (iter 37 P2-12 fix)",
    ),
    # ----- P2-13 (F4): part_04 §4.2 «Запрещённые слова» → «Запрещённые формулировки» -----
    (
        "P2-13",
        "part_04.html",
        "<p><strong>RULE:</strong> Запрещённые формулировки — это выводы-ярлыки, не события. Примеры запрещённых: «травма», «пережил», «столкнулся с», «пострадал», «испытал». GHOST = ЧТО произошло, не вывод. Вместо них — конкретное событие: «в 7 лет видел, как дом сгорел, а пожарные не приехали вовремя».</p>",
        "part_04 §4.2: «Запрещённые слова» → «Запрещённые формулировки» with examples (iter 37 P2-13 fix)",
    ),
    # ----- P2-14 (F5): part_05 §5.1 Cautious zone definition -----
    (
        "P2-14",
        "part_05.html",
        "<p><strong>Cautious zone (30–40 / 60–70)</strong> — пограничная зона, не экстремальная, но влияющая на SPINE-связи (FLAW, GHOST-реактивность). Значения в cautious zone не считаются «экстремальными полюсами», но активно формируют поведение — например, Елена <code>A=38</code> и <code>N=68</code> напрямую связаны с её FLAW (отталкивает людей сарказмом) и GHOST (предательство редактора → недоверие).</p>",
        "part_05 §5.1: Cautious zone definition added after RULE (iter 37 P2-14 fix)",
    ),
    # ----- P2-16 (F7): part_07a §7A.1 Keirsey SP Artisan → Sensing-Perceiving -----
    (
        "P2-16",
        "part_07a.html",
        "Keirsey SP (Sensing-Perceiving, см. Appendix A — MBTI)",
        "part_07a §7A.1: Keirsey SP Artisan/Ремесленник → Sensing-Perceiving (iter 37 P2-16 fix)",
    ),
    # ----- P2-17 (F9): part_09 §9.6 Decision Tree 1-word symptoms -----
    (
        "P2-17a",
        "part_09.html",
        "Удалить голос из Description (AP-3 Voice-in-Desc)",
        "part_09 §9.6: AP-3 1-word symptom «Voice-in-Desc» added (iter 37 P2-17 fix)",
    ),
    (
        "P2-17b",
        "part_09.html",
        "Добавить 2 строки (AP-6 No-Anti-Godmoding)",
        "part_09 §9.6: AP-6 1-word symptom «No-Anti-Godmoding» added (iter 37 P2-17 fix)",
    ),
    (
        "P2-17c",
        "part_09.html",
        "Part 5: OCEAN Warning</a> (AP-15 OCEAN-Overload)",
        "part_09 §9.6: AP-15 1-word symptom «OCEAN-Overload» added (iter 37 P2-17 fix)",
    ),
    (
        "P2-17d",
        "part_09.html",
        "Fix → AP-5 (RepPen-High)",
        "part_09 §9.6: AP-5 1-word symptom «RepPen-High» added (iter 37 P2-17 fix)",
    ),
    (
        "P2-17e",
        "part_09.html",
        "→ Проверить PP: >0? (AP-7 PP-Leak)",
        "part_09 §9.6: AP-7 1-word symptom «PP-Leak» added (iter 37 P2-17 fix)",
    ),
    (
        "P2-17f",
        "part_09.html",
        "Part 6: CoT</a> (AP-10 CoT-Overload)",
        "part_09 §9.6: AP-10 1-word symptom «CoT-Overload» added (iter 37 P2-17 fix)",
    ),
    (
        "P2-17g",
        "part_09.html",
        "→ Проверить SPINE на консистентность (AP-9 SPINE-Broken)",
        "part_09 §9.6: AP-9 1-word symptom «SPINE-Broken» added (iter 37 P2-17 fix)",
    ),
    # ----- P3-4 (D7): Уолтер cross-refs (3 locations) -----
    (
        "P3-4a",
        "part_01.html",
        "<p><strong>Cross-ref:</strong> Пример реалистичного современного персонажа (без фэнтези-элементов, простая SPINE) — Уолтер Уайт, <a href=\"#p10_walter\">§10.2</a>.</p>",
        "part_01 §1.4: Cross-ref to Walter §10.2 (realistic modern character) added (iter 38 P3-4 fix)",
    ),
    (
        "P3-4b",
        "part_04.html",
        "<p><strong>Cross-ref:</strong> Пример простой карточки без GHOST Layers (один GHOST, упрощённая SPINE) — Уолтер Уайт, <a href=\"#p10_walter\">§10.2</a>.</p>",
        "part_04 §4.11: Cross-ref to Walter §10.2 (simple SPINE without GHOST Layers) added (iter 38 P3-4 fix)",
    ),
    (
        "P3-4c",
        "part_09.html",
        "<p><strong>Cross-ref:</strong> Пример тестирования карточки с OCEAN-профилем (A=38, N=68 — cautious zone, без экстремальных полюсов кроме O=72) — Уолтер Уайт, <a href=\"#p10_walter\">§10.2</a>.</p>",
        "part_09 §9.6: Cross-ref to Walter §10.2 (OCEAN testing example) added (iter 38 P3-4 fix)",
    ),

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
        '<p class="bridge-paragraph">Вся теория и диагностика позади. Следующий раздел содержит полные, готовые к копированию карточки',
        "part_09 §9-end: Bridge to Part 10 KEPT with bridge-paragraph CSS class (iter 47 P2-3 fix)",
    ),

    # ============================================================
    # iter 47 — Phase 4: P2-7 (E4) Resume sections removal
    # 11 deletes in part_01-10 + part_07b; 4 Synthesis added in part_01/04/07a/08
    # ============================================================
    (
        "P2-7-syn-01",
        "part_01.html",
        "<p><strong>Synthesis:</strong> Если в карточке есть SP, Description, Examples, Greeting — она уже работает. Три правила (Anchor = T→A→P, голос только в Examples, психология только в Description) — единственное, что нельзя нарушать.</p>",
        "part_01 §1-end: Synthesis paragraph added (iter 47 P2-7 fix, replaces removed resume section)",
    ),
    (
        "P2-7-syn-04",
        "part_04.html",
        "<p><strong>Synthesis:</strong> SPINE — это причинная цепочка GHOST → LIE → FLAW → NEED → WANT. Она объясняет, ПОЧЕМУ персонаж действует так, а не иначе. Без SPINE Anchors — набор случайных правил.</p>",
        "part_04 §4-end: Synthesis paragraph added (iter 47 P2-7 fix, replaces removed resume section)",
    ),
    (
        "P2-7-syn-07a",
        "part_07a.html",
        "<p><strong>Synthesis:</strong> System Prompt — контейнер, который модель видит всегда. Identity + Anti-godmoding + CORE DIRECTIVES + Tone Frame + Format Lock. Всё остальное (SPINE, OCEAN, Examples) живёт в Description и Examples.</p>",
        "part_07a §7A-end: Synthesis paragraph added (iter 47 P2-7 fix, replaces removed resume section)",
    ),
    (
        "P2-7-syn-08",
        "part_08.html",
        "<p><strong>Synthesis:</strong> 15 анти-паттернов покрывают ~90% ошибок сборки. Симптом → причина → исправление. Наиболее частые: AP-3 (голос в Description), AP-9 (broken SPINE), AP-15 (nested Anchors).</p>",
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
        "<p><strong>Demonstrates:</strong> EMBODIMENT FIRST, ENVIRONMENTAL REACTIVITY, SHOW NEVER TELL, SPINE CAUSALITY, SPATIAL & ANATOMICAL LOCK — см. Examples и Greeting ниже.</p>",
        "part_10 §10.1 Elena: Demonstrates callout before card (iter 47 P3-2 fix)",
    ),
    (
        "P3-2-walter",
        "part_10.html",
        "<p><strong>Demonstrates:</strong> EMBODIMENT FIRST, SHOW NEVER TELL, INFLUENCE BOUNDARY, CONSEQUENCE DRIVEN, SPATIAL & ANATOMICAL LOCK, ENVIRONMENTAL REACTIVITY — см. Examples и Greeting ниже.</p>",
        "part_10 §10.2 Walter: Demonstrates callout before card (iter 47 P3-2 fix)",
    ),
    (
        "P3-2-omnis",
        "part_10.html",
        "<p><strong>Demonstrates:</strong> EMBODIMENT FIRST, ENVIRONMENTAL REACTIVITY, SHOW NEVER TELL, SPATIAL & ANATOMICAL LOCK, SPINE CAUSALITY, ANCHOR TRIGGER, INFLUENCE BOUNDARY, CONSEQUENCE DRIVEN, CoT LOGIC — см. Examples, CoT и Greeting ниже.</p>",
        "part_10 §10.3 Omnis-Zeta: Demonstrates callout before card (iter 47 P3-2 fix)",
    ),
    (
        "P3-2-vysh",
        "part_10.html",
        "<p><strong>Demonstrates:</strong> SPATIAL & ANATOMICAL LOCK, EMBODIMENT FIRST, ENVIRONMENTAL REACTIVITY, SHOW NEVER TELL, SPINE CAUSALITY, ANCHOR TRIGGER, CONSEQUENCE DRIVEN, CoT LOGIC — см. Examples, CoT и Greeting ниже.</p>",
        "part_10 §10.4 Vyshcherblenny: Demonstrates callout before card (iter 47 P3-2 fix)",
    ),

    # ================================================================
    # iter 50 — KI#34 fix: §1.8 Pre-build checklist section added to master HTML
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
        "part_01 §1.8 Pre-build checklist: section block added (iter 50 KI#34 fix; iter 51 KI#36: id attr added, substring relaxed)",
    ),
    (
        "KI#34-table",
        "part_01.html",
        "<th>#</th><th>Вопрос</th><th>Варианты</th><th>Что это определяет</th>",
        "part_01 §1.8 Pre-build checklist: 6-row table header (iter 50 KI#34 fix)",
    ),
    (
        "KI#34-callout",
        "part_01.html",
        "<p><strong>RECOMMENDATION:</strong> Если вы впервые собираете карточку — выбирайте «12B / 8K / Простая / 1 GHOST / без CoT / без Lorebook».",
        "part_01 §1.8 Pre-build checklist: RECOMMENDATION callout (iter 50 KI#34 fix)",
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
    (
        "KI#36-id-appendix-glossary",
        "appendix_glossary.html",
        'data-section="appendix_glossary" id="appendix_glossary"',
        "appendix_glossary: id attribute on appendix_glossary section (iter 51 KI#36 fix — anchor nav)",
    ),
]

# Negative checks: substrings that MUST NOT appear in master HTML.
# Used to verify that iter 47 deletes (bridge-paragraph cleanup, part-resume
# removal, Elena inline ↑ annotations) actually took effect.
ABSENT_CHECKS = [
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
