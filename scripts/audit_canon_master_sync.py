#!/usr/bin/env python3
"""
Audit canon → master HTML sync (iter 44+ regression guard).

Purpose:
    Verify that iter 44 canon→master HTML sync fixes are present in
    `src/master/*.html`. This is a focused regression test — it does NOT
    attempt a general-purpose semantic drift detector (planned for iter 45+).

    Each check compares a specific canon snippet (the source of truth in
    `docs/canon/*.md`) against the corresponding master HTML snippet,
    accounting for HTML entity escaping (`<` → `&lt;`, `>` → `&gt;`).

Scope (iter 44, 9 fixes):
    - P0-2 / KI#21-A2: src/master/part_07a.html L1107 — Елена OCEAN extreme poles 3→1
    - P0-3 / KI#21-A3: src/master/part_04.html L633 — G3 row «после 7-го» addition
    - P0-4 / KI#21-A3: src/master/part_07a.html L417 — «Счётчик вырезаний» line in §7A.5 AN
    - P0-5 / KI#21-A3: src/master/part_07a.html L719 — G3 line in §7A.9 XML template
    - P1-2 / KI#21-A7: src/master/part_07a.html L426 — AN sections table row
    - KI#29 (iter 40): src/master/part_10.html L511 — Выщербленный §10.4 OCEAN labels
    - KI#30 (iter 41): src/master/part_07a.html L729 — Выщербленный §7A.9 OCEAN labels
    - KI#30 (iter 41): src/master/part_10.html L160 — Елена §10.1 OCEAN labels
    - KI#31 (iter 41): src/master/part_07a.html L730 + part_10.html L512 — Cross-ref Notes

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
]


def main() -> int:
    print("=" * 70)
    print("audit_canon_master_sync.py — iter 44+ regression guard")
    print("Verifies that iter 44 canon→master HTML sync fixes are in place.")
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
        print("Regression detected — iter 44 fixes are NOT all in place.")
        print("Investigate src/master/*.html and re-apply missing fixes.")
        return 1
    else:
        print(f"PASS: all {pass_count} checks passed")
        print()
        print("iter 44 canon→master HTML sync fixes are in place.")
        print()
        print("NOTE: This is a focused regression test for iter 44 fixes only.")
        print("      A general-purpose canon↔master drift detector is planned")
        print("      for iter 45+ (see STATUS.md iter 45+ roadmap).")
        return 0


if __name__ == "__main__":
    sys.exit(main())
