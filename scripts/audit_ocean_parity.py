#!/usr/bin/env python3
"""
audit_ocean_parity.py — OCEAN single-owner parity audit (KI#92, iter 200).

Why this exists:
    Part 5 §5.1 is a declared value owner (F-01): the 30/70 extremum thresholds and
    the per-context ceilings (4K/8K/16K+/32K+). The same numbers also live in
    `data/ocean.json` (hand-maintained) and in the `ocean-insight` widget, so a drift
    would have been silent — every other single-owner cluster (enneagram / token
    budget / voice / sampling / diagnostics / core directives / glossary) already
    has an `audit_*_parity.py`; OCEAN did not.

The chain verified here:
    docs/canon/part_05.md §5.1  (canonical: rule + ceilings table + pole table)
        ↕  src/master/part_05.html                (the rendered owner)
        ↕  data/ocean.json                        (machine layer: thresholds + traits)
        ↕  src/shell/widgets/ocean-insight.js     (runtime literals + data read)

Checks:
  1. Thresholds: canon rule == master rule == pole-table headers == 30/70 default.
  2. Ceilings: the rule's inline ladder == the ceilings table (canon and master).
  3. Cross-reference: §5.1's own НАБЛЮДЕНИЕ («потолок — N экстремума») == the 8K ceiling.
  4. Machine layer: `extremum_thresholds` and all five per-trait thresholds agree.
  5. Machine layer triggers: the "(extreme)" numbers in the forecast triggers agree.
  6. Widget: the fallback literals and the state/label comparisons agree, and the
     widget actually reads `extremum_thresholds` from the data layer (so a hardcoded
     literal cannot silently become the authority).

Exit codes: 0 — PASS; 1 — FAIL.
Run: python3 scripts/audit_ocean_parity.py
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CANON = REPO / "docs" / "canon" / "part_05.md"
MASTER = REPO / "src" / "master" / "part_05.html"
OCEAN = REPO / "data" / "ocean.json"
WIDGET = REPO / "src" / "shell" / "widgets" / "ocean-insight.js"

CEILING_CONTEXTS = ["4K", "8K", "16K+", "32K+"]

errors = []


def err(msg):
    errors.append(msg)


def read(p):
    if not p.exists():
        err(f"missing file: {p.relative_to(REPO)}")
        return ""
    return p.read_text(encoding="utf-8")


def one(pattern, text, what):
    m = re.search(pattern, text)
    if not m:
        err(f"{what}: pattern not found")
        return None
    return m


def main():
    canon = read(CANON)
    master = read(MASTER)
    widget = read(WIDGET)
    ocean = json.loads(read(OCEAN) or "{}")

    # ---------- 1. thresholds ----------
    c_rule = one(r"значение ниже (\d+) или выше (\d+)", canon, "canon §5.1 rule thresholds")
    m_rule = one(r"значение ниже (\d+) или выше (\d+)", master, "master §5.1 rule thresholds")
    c_poles = one(r"Низкий полюс \(ниже (\d+)\)", canon, "canon pole table (low)")
    c_poles_hi = one(r"Высокий полюс \(выше (\d+)\)", canon, "canon pole table (high)")
    m_poles = one(r"Низкий полюс \(ниже (\d+)\)", master, "master pole table (low)")
    m_poles_hi = one(r"Высокий полюс \(выше (\d+)\)", master, "master pole table (high)")

    if not (c_rule and m_rule):
        print_fail()
        return

    low, high = int(c_rule.group(1)), int(c_rule.group(2))
    if (int(m_rule.group(1)), int(m_rule.group(2))) != (low, high):
        err(f"thresholds: master rule {m_rule.group(1)}/{m_rule.group(2)} != canon {low}/{high}")
    for m, label in ((c_poles, "canon low"), (c_poles_hi, "canon high"), (m_poles, "master low"), (m_poles_hi, "master high")):
        if not m:
            continue
        value = int(m.group(1))
        if value != low and value != high:
            err(f"thresholds: {label} = {value}, expected {low} or {high}")
    if c_poles and int(c_poles.group(1)) != low:
        err(f"thresholds: pole table low {c_poles.group(1)} != rule low {low}")
    if c_poles_hi and int(c_poles_hi.group(1)) != high:
        err(f"thresholds: pole table high {c_poles_hi.group(1)} != rule high {high}")

    # ---------- 2. ceilings: inline ladder == table ----------
    ladder_re = re.compile(r"4K — (\d+), 8K — (\d+), 16K\+ — (\d+), 32K\+ — (\d+)")
    c_ladder = one(ladder_re.pattern, canon, "canon inline ceiling ladder")
    m_ladder = one(ladder_re.pattern, master, "master inline ceiling ladder")
    if c_ladder and m_ladder and c_ladder.groups() != m_ladder.groups():
        err(f"ceilings: master ladder {m_ladder.groups()} != canon {c_ladder.groups()}")

    canon_ladder = [int(x) for x in c_ladder.groups()] if c_ladder else None

    canon_rows = {}
    for ctx, value in re.findall(r"\|\s*\*\*([0-9]+K\+?)\*\*\s*\|\s*(\d+)\s*\|", canon):
        canon_rows[ctx] = int(value)
    master_rows = {}
    for ctx, value in re.findall(r"<td><strong>([0-9]+K\+?)</strong></td><td>(\d+)</td>", master):
        master_rows[ctx] = int(value)

    for ctx in CEILING_CONTEXTS:
        if ctx not in canon_rows:
            err(f"ceilings: canon table misses {ctx}")
        if ctx not in master_rows:
            err(f"ceilings: master table misses {ctx}")
    if canon_rows and master_rows and canon_rows != master_rows:
        diff = {k: (canon_rows.get(k), master_rows.get(k)) for k in set(canon_rows) | set(master_rows) if canon_rows.get(k) != master_rows.get(k)}
        err(f"ceilings: master table != canon table: {diff}")
    if canon_ladder and canon_rows:
        expected = [canon_rows.get(ctx) for ctx in CEILING_CONTEXTS]
        if canon_ladder != expected:
            err(f"ceilings: inline ladder {canon_ladder} != table {expected}")

    # ---------- 3. the section's own cross-reference ----------
    m_obs = one(r"потолок — (\d+) экстремум", master, "master §5.1 НАБЛЮДЕНИЕ ceiling")
    if m_obs and canon_rows:
        if int(m_obs.group(1)) != canon_rows.get("8K"):
            err(f"cross-ref: НАБЛЮДЕНИЕ says потолок — {m_obs.group(1)}, 8K ceiling is {canon_rows.get('8K')}")

    # ---------- 4. machine layer thresholds ----------
    thresholds = ocean.get("extremum_thresholds", {})
    if (thresholds.get("low"), thresholds.get("high")) != (low, high):
        err(f"data/ocean.json: extremum_thresholds {thresholds.get('low')}/{thresholds.get('high')} != {low}/{high}")
    traits = ocean.get("traits", [])
    if len(traits) != 5:
        err(f"data/ocean.json: expected 5 traits, got {len(traits)}")
    for t in traits:
        lo = (t.get("low") or {}).get("threshold")
        hi = (t.get("high") or {}).get("threshold")
        if (lo, hi) != (low, high):
            err(f"data/ocean.json: trait {t.get('id')} thresholds {lo}/{hi} != {low}/{high}")
        if not t.get("enneagram_correlation"):
            err(f"data/ocean.json: trait {t.get('id')} lacks enneagram_correlation")

    # ---------- 5. machine-layer triggers agree on the extremum numbers ----------
    triggers = re.findall(r'"trigger":\s*"([^"]+)"', read(OCEAN))
    if not triggers:
        err("data/ocean.json: no forecast triggers found")
    for tr in triggers:
        for num in re.findall(r">\s*(\d+)\s*\(extreme\)", tr):
            if int(num) != high:
                err(f"data/ocean.json trigger «{tr}»: {num} != high threshold {high}")
        for num in re.findall(r"<\s*(\d+)\s*\(extreme", tr):
            if int(num) != low:
                err(f"data/ocean.json trigger «{tr}»: {num} != low threshold {low}")

    # ---------- 6. widget literals + where the widget gets the numbers ----------
    if "extremum_thresholds" not in widget:
        err("widget: does not read `extremum_thresholds` from data/ocean.json")
    for m in re.finditer(r"\|\|\s*\{\s*low:\s*(\d+),\s*high:\s*(\d+)\s*\}", widget):
        if (int(m.group(1)), int(m.group(2))) != (low, high):
            err(f"widget: fallback literal {m.group(1)}/{m.group(2)} != {low}/{high}")
    for m in re.finditer(r"value <= (\d+)\)\s*return (?:STATE_LOW|TRAIT_LABELS_LOW)", widget):
        if int(m.group(1)) != low:
            err(f"widget: low comparison {m.group(1)} != {low}")
    for m in re.finditer(r"value >= (\d+)\)\s*return (?:STATE_HIGH|TRAIT_LABELS_HIGH)", widget):
        if int(m.group(1)) != high:
            err(f"widget: high comparison {m.group(1)} != {high}")

    if errors:
        print_fail()
        return

    print(f"Registry checks passed.")
    print(
        "PASS — OCEAN single-owner intact: §5.1 canonical "
        f"({low}/{high} thresholds, ceilings "
        + "/".join(str(canon_rows.get(c)) for c in CEILING_CONTEXTS)
        + "), data/ocean.json extremum_thresholds + "
        f"{len(traits)} traits + {len(triggers)} triggers agree, ocean-insight widget "
        "literals agree and read the data layer, §5.1 НАБЛЮДЕНИЕ matches the 8K ceiling."
    )
    sys.exit(0)


def print_fail():
    print(f"\nFAIL — {len(errors)} error(s):")
    for e in errors:
        print(f"  ✗ {e}")
    sys.exit(1)


if __name__ == "__main__":
    main()
