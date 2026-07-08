#!/usr/bin/env python3
"""
Audit canon → master HTML sync (iter 44+45 regression guard).

Purpose:
    Verify that iter 44 + iter 45 canon→master HTML sync fixes are present
    in `src/master/*.html`. This is a focused regression test — it does NOT
    attempt a general-purpose semantic drift detector (planned for iter 46+).

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
    (
        "P0-11",
        "part_09.html",
        "Оценивать качество карточки по 4-зонной шкале (Критический / Слабый / Хороший / Отличный)",
        "part_09 resume: 3-level scale → 4-zone scale (iter 35 P0-11 fix)",
    ),
    # ----- P0-12 (A10): part_09 Vysh Quick Check rename -----
    (
        "P0-12",
        "part_09.html",
        "<h5>Структурная проверка Выщербленного (5 items — отлична от universal Quick Check выше)</h5>",
        "part_09 Vysh Quick Check heading renamed + clarifier paragraph (iter 35 P0-12 fix)",
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
    (
        "P1-6",
        "part_06.html",
        "<tr><td><strong>Tier 0</strong></td><td>12B+, базовый/стандартный</td>",
        "part_06 §6.3: Tier 0 «12B» → «12B+» (iter 36 P1-6 fix)",
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
]


def main() -> int:
    print("=" * 70)
    print("audit_canon_master_sync.py — iter 44+45 regression guard")
    print("Verifies that iter 44 + iter 45 canon→master HTML sync fixes are in place.")
    print("=" * 70)
    print()

    failures = []
    pass_count = 0

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

    print()
    print("=" * 70)
    if failures:
        print(f"FAILED: {len(failures)} check(s) failed, {pass_count} passed")
        print()
        print("Regression detected — iter 44+45 fixes are NOT all in place.")
        print("Investigate src/master/*.html and re-apply missing fixes.")
        return 1
    else:
        print(f"PASS: all {pass_count} checks passed")
        print()
        print("iter 44+45 canon→master HTML sync fixes are in place.")
        print()
        print("NOTE: This is a focused regression test for iter 44+45 fixes.")
        print("      A general-purpose canon↔master drift detector is planned")
        print("      for iter 46+ (see STATUS.md iter 46+ roadmap).")
        return 0


if __name__ == "__main__":
    sys.exit(main())
