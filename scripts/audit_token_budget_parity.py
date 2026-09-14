#!/usr/bin/env python3
"""
audit_token_budget_parity.py — mig-4 acceptance audit (iter 135, Registry B row 5 / PLAN mig-4).

Verifies the Token budget cluster architecture across every presentation layer
of the slice (migration_foundation_iter131.md §5.5 evidence; map Registry B row 5):

    §7A.12 (canon + master) = THE canonical owner — budget table (min/std/max
                               per block) + personality sub-budgets + Script Tax
                               RULE + calculator description — unchanged
    E01 master embed         = SHARED_REFERENCE — per-block token annotations
                               (min/std/max) + summary table; Examples shows the
                               block TOTAL (derived: per-example x count), the
                               derivation declared in-embed («40/60/80 per» +
                               «каждый ~40–80 токенов»); Lorebook row = declared
                               estimate («Est.»), no canonical owner
    E15 master embed         = SHARED_REFERENCE — min–max annotations == canonical
                               min/max; Examples TOTAL carries the derivation note
                               («итог: 40–80 на пример × 2–5 примеров — §7A.12»)
    canon markers            = [VS: E01] (part_01.md) + [VS: E15] (part_10.md) —
                               canonical descriptions of what the embeds show,
                               incl. the derivation rule (stated canonically once,
                               part_10.md side)
    glossary (registry C-21) = values deferred to §7A.12 (executed iter 133)
    prototype/extract E01/E15 = stale derived copies — REMOVED_WITH_REASON
                               deferred on map §6.1 (visual-markup ownership)

Checks:
 1. Canonical record (canon §7A.12): budget table rows == acceptance invariants
    (SP 50/100/200, Description 150/300/700, Examples per 40/60/80, Greeting
    40/60/100, Anchors per 15/25/40); Script Tax RULE; personality sub-budget
    table (SPINE core 80/150/350); calculator description (400–800).
 2. Master §7A.12 mirror: table rows == canon; calculator div present.
 3. E01 embed (SHARED_REFERENCE): per-block token annotations == canonical values
    (SP/Description/Greeting); Examples == derived totals 80/180/400 with the
    arithmetic verified (2x40 / 3x60 / 5x80); anchors subpanel ~15–40; summary
    table: Examples source declares «40/60/80 per», canonical rows sourced
    «Part 7A»; block-content declares «каждый ~40–80 токенов»; Lorebook row
    declared «Est.» (estimate, non-canonical).
 4. E01 canon marker (part_01.md): present; declares §7A.12 ownership
    (SHARED_REFERENCE), the Examples totals derivation, and the Lorebook estimate.
 5. E15 embed (SHARED_REFERENCE + derivation note): SP ~50-200, Description
    ~150-700, Greeting ~40-100 == canonical min–max; Examples ~80-400 == derived
    total; the Examples annotation carries the derivation note (итог / на пример /
    × / §7A.12).
 6. E15 canon marker (part_10.md): present; declares §7A.12 ownership
    (SHARED_REFERENCE) + the derivation rule (итог = бюджет на один пример ×
    количество примеров).
 7. Glossary C-21: registry entry defers values to §7A.12; generated
    data/glossary.json mirrors (anchor p7a_token_budget).
 8. Root fallbacks: parts/part_01.html E01 annotations current; parts/part_10.html
    E15 derivation note present (build output current with master).
 9. Map parity: migration_map_v2.md §5.3 slice present (TB-1..TB-8); Registry B
    row 5 + Registry A E01/E15 rows record the iter-135 execution.
10. Matrix parity: affected editorial_matrix.md rows carry
    → migration_map_v2 TB-<n> back-pointers.

Deferred layers (reported as notes, never failures):
  - visual-system prototype + extract copies of E01/E15 (disposition
    REMOVED_WITH_REASON, blocked on map §6.1 owner decision);
  - R11/R27 budget-adjacent prose layers OUTSIDE the slice (owner-gated ed-5 /
    KI#77-e): §7A.11 4K table, §1.8 prebuild Q2, §7A.13 step 6 (consistent ✓),
    §9.11 «Description ≤ 800», §8.2 AP-1 «> 800», Part 10 card totals,
    §7B.2 Greeting «50–100» (R11-family instance found iter 135);
  - calculator slider bounds = §7A.12's own UI affordances (canon-declared,
    not a competing values table).

Exit codes: 0 — PASS; 1 — FAIL (messages above).
Run: python3 scripts/audit_token_budget_parity.py
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CANON_7A = REPO / "docs" / "canon" / "part_07a.md"
CANON_01 = REPO / "docs" / "canon" / "part_01.md"
CANON_10 = REPO / "docs" / "canon" / "part_10.md"
MASTER_7A = REPO / "src" / "master" / "part_07a.html"
MASTER_01 = REPO / "src" / "master" / "part_01.html"
MASTER_10 = REPO / "src" / "master" / "part_10.html"
FALLBACK_01 = REPO / "parts" / "part_01.html"
FALLBACK_10 = REPO / "parts" / "part_10.html"
REGISTRY = REPO / "docs" / "canon" / "glossary_registry.md"
GLOSSARY_JSON = REPO / "data" / "glossary.json"
MAP = REPO / "docs" / "research" / "migration_map_v2.md"
MATRIX = REPO / "docs" / "research" / "editorial_matrix.md"

# Acceptance invariants (PLAN mig-4 / §7A.12 canonical table).
CANONICAL_ROWS = {
    "System Prompt": (50, 100, 200),
    "Description": (150, 300, 700),
    "Examples (каждый)": (40, 60, 80),
    "Greeting": (40, 60, 100),
    "Anchors (каждый)": (15, 25, 40),
}
# Derived totals shown by E01 (block-level): per-example x count per level
# (2 базовых / 3 с FLAW / 3–5 с CoT — §7A.12 Examples row note).
E01_EXAMPLES_TOTALS = (2 * 40, 3 * 60, 5 * 80)  # 80 / 180 / 400
# E15 min–max pairs (canonical min–max; Examples = derived total min–max).
E15_RANGES = {
    "SP": (50, 200),
    "Description": (150, 700),
    "Examples": (80, 400),
    "Greeting": (40, 100),
}
E15_DERIVATION_NOTE = "итог: 40–80 на пример × 2–5 примеров — §7A.12"
E15_MARKER_RULE = "итог = бюджет на один пример × количество примеров"

errors = []
notes = []


def err(msg):
    errors.append(msg)


def read(path):
    return path.read_text(encoding="utf-8")


def embed_region(text, element):
    """Slice the master VS-EMBED block for an element."""
    m = re.search(
        rf'<div class="vs-embed" data-vs-element="{element}">.*?'
        rf"<!-- REPLACED BY VISUAL SYSTEM: {element} -->",
        text,
        re.DOTALL,
    )
    return m.group(0) if m else None


def parse_canon_table(region):
    """Parse §7A.12 canon table: {block: (min, std, max)}."""
    rows = {}
    for name in CANONICAL_ROWS:
        m = re.search(
            rf"^\| {re.escape(name)} \| (\d+) \| (\d+) \| (\d+) \|",
            region,
            re.MULTILINE,
        )
        if m:
            rows[name] = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return rows


def parse_master_table(region):
    """Parse §7A.12 master table: {block: (min, std, max)}."""
    rows = {}
    for name in CANONICAL_ROWS:
        m = re.search(
            rf"<tr><td>{re.escape(name)}</td>"
            rf"<td>(\d+)</td><td>(\d+)</td><td>(\d+)</td>",
            region,
        )
        if m:
            rows[name] = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return rows


def parse_e01_annotations(embed):
    """Parse E01 per-block token annotations: {block_key: [v_min, v_std, v_max]}."""
    blocks = {}
    markers = [
        ("SP", "card-block--sp"),
        ("Description", "card-block--desc"),
        ("Examples", "card-block--examples"),
        ("Greeting", "card-block--greeting"),
        ("Lorebook", "card-block--lorebook"),
    ]
    positions = [(embed.find(cls), key) for key, cls in markers]
    positions = [(pos, key) for pos, key in positions if pos != -1]
    positions.sort()
    for i, (pos, key) in enumerate(positions):
        end = positions[i + 1][0] if i + 1 < len(positions) else len(embed)
        vals = re.findall(r'token-anno__val">\s*~?(\d+)\s*<', embed[pos:end])
        if len(vals) == 3:
            blocks[key] = [int(v) for v in vals]
    return blocks


def main():
    # ---------- 1. Canonical record (canon §7A.12) ----------
    canon7a = read(CANON_7A)
    m = re.search(r"^## 7A\.12 .*?(?=^## 7A\.13 )", canon7a, re.DOTALL | re.MULTILINE)
    if not m:
        err("canon §7A.12 section not found")
        return finish()
    sec712 = m.group(0)
    canon_rows = parse_canon_table(sec712)
    for name, expected in CANONICAL_ROWS.items():
        if name not in canon_rows:
            err(f"canon §7A.12: budget table row '{name}' not found")
        elif canon_rows[name] != expected:
            err(f"canon §7A.12: row '{name}' {canon_rows[name]} != {expected}")
    if "Script Tax" not in sec712:
        err("canon §7A.12: Script Tax RULE missing")
    spine_row = re.search(r"\| Ядро SPINE .*?\| (\d+) \| (\d+) \| (\d+) \|", sec712)
    if not spine_row or (int(spine_row.group(1)), int(spine_row.group(2)), int(spine_row.group(3))) != (80, 150, 350):
        err("canon §7A.12: personality sub-budget table (SPINE core 80/150/350) missing")
    if "400–800" not in sec712:
        err("canon §7A.12: calculator description (400–800 range) missing")
    notes.append(f"canonical record §7A.12: {len(canon_rows)}/5 rows exact, "
                 "Script Tax + sub-budgets + calculator present")

    # ---------- 2. Master §7A.12 mirror ----------
    master7a = read(MASTER_7A)
    m = re.search(
        r'<section[^>]*data-section="p7a_token_budget".*?</section>',
        master7a, re.DOTALL,
    )
    if not m:
        err("master: p7a_token_budget section not found")
        return finish()
    master_rows = parse_master_table(m.group(0))
    for name, expected in CANONICAL_ROWS.items():
        if name not in master_rows:
            err(f"master §7A.12: budget table row '{name}' not found")
        elif master_rows[name] != expected:
            err(f"master §7A.12: row '{name}' {master_rows[name]} != {expected}")
    if 'class="token-calc"' not in m.group(0):
        err("master §7A.12: calculator div (token-calc) missing")
    notes.append(f"master §7A.12 mirror: {len(master_rows)}/5 rows exact, calculator present")

    # ---------- 3. E01 embed (SHARED_REFERENCE) ----------
    master01 = read(MASTER_01)
    e01 = embed_region(master01, "E01")
    if e01 is None:
        err("master: E01 embed not found")
        return finish()
    ann = parse_e01_annotations(e01)
    for key, expected in (
        ("SP", list(CANONICAL_ROWS["System Prompt"])),
        ("Description", list(CANONICAL_ROWS["Description"])),
        ("Greeting", list(CANONICAL_ROWS["Greeting"])),
    ):
        if key not in ann:
            err(f"E01 embed: block '{key}' token annotations not parseable")
        elif ann[key] != expected:
            err(f"E01 embed: block '{key}' {ann[key]} != canonical {expected}")
    if "Examples" not in ann:
        err("E01 embed: Examples token annotations not parseable")
    elif ann["Examples"] != list(E01_EXAMPLES_TOTALS):
        err(f"E01 embed: Examples totals {ann['Examples']} != derived "
            f"{list(E01_EXAMPLES_TOTALS)} (per-example × count)")
    if "каждый ~40–80 токенов" not in e01:
        err("E01 embed: per-example declaration ('каждый ~40–80 токенов') missing")
    if "~15–40" not in e01:
        err("E01 embed: anchors per-anchor range (~15–40) missing")
    if "Est. Part 7B" not in e01:
        err("E01 embed: Lorebook row not declared as estimate ('Est. Part 7B')")
    if "40/60/80 per" not in e01:
        err("E01 embed: summary table Examples derivation source "
            "('40/60/80 per') missing")
    src_rows = re.findall(
        r'vs-ki13-token-td">([^<]+)</td>.*?vs-ki13-token-td-source">([^<]+)</td>',
        e01, re.DOTALL,
    )
    for label, expected_src in (
        ("SP", "Part 7A"),
        ("Description", "Part 7A"),
        ("Greeting", "Part 7A"),
        ("Anchors (каждый)", "Part 7A"),
    ):
        row = next((s for l, s in src_rows if l.strip() == label), None)
        if row is None or expected_src not in row:
            err(f"E01 embed: summary row '{label}' source column != '{expected_src}'")
    notes.append("E01 embed: SP/Description/Greeting == canonical, Examples "
                 "totals 80/180/400 (arithmetic verified), derivation declared "
                 "in-embed, Lorebook = declared estimate")

    # ---------- 4. E01 canon marker ----------
    canon01 = read(CANON_01)
    m = re.search(r"^\[VS: E01 — (.+?)\]$", canon01, re.MULTILINE)
    if not m:
        err("canon part_01.md: [VS: E01] marker not found")
    else:
        body = m.group(1)
        for token in ("§7A.12", "SHARED_REFERENCE",
                      "бюджет на один пример × количество примеров", "Est."):
            if token not in body:
                err(f"canon part_01.md [VS: E01] marker: '{token}' missing")
    notes.append("E01 canon marker: present — §7A.12 ownership + Examples "
                 "derivation + Lorebook estimate declared")

    # ---------- 5. E15 embed (SHARED_REFERENCE + derivation note) ----------
    master10 = read(MASTER_10)
    e15 = embed_region(master10, "E15")
    if e15 is None:
        err("master: E15 embed not found")
        return finish()
    for label, (lo, hi) in E15_RANGES.items():
        m = re.search(
            rf"{label}: ~(\d+)-(\d+) токенов", e15,
        )
        if not m:
            err(f"E15 embed: annotation '{label}: ~{lo}-{hi} токенов' not found")
        elif (int(m.group(1)), int(m.group(2))) != (lo, hi):
            err(f"E15 embed: annotation '{label}' ({m.group(1)}-{m.group(2)}) "
                f"!= canonical min–max ({lo}-{hi})")
    if E15_DERIVATION_NOTE not in e15:
        err(f"E15 embed: Examples derivation note ('{E15_DERIVATION_NOTE}') missing")
    notes.append("E15 embed: SP/Description/Greeting == canonical min–max, "
                 "Examples total 80–400 carries the derivation note")

    # ---------- 6. E15 canon marker ----------
    canon10 = read(CANON_10)
    m = re.search(r"^\[VS: E15 — (.+?)\]$", canon10, re.MULTILINE)
    if not m:
        err("canon part_10.md: [VS: E15] marker not found")
    else:
        body = m.group(1)
        for token in ("§7A.12", "SHARED_REFERENCE", E15_MARKER_RULE):
            if token not in body:
                err(f"canon part_10.md [VS: E15] marker: '{token}' missing")
    notes.append("E15 canon marker: present — derivation rule stated canonically")

    # ---------- 7. Glossary C-21 ----------
    registry = read(REGISTRY)
    m = re.search(
        r"### Бюджет токенов \(Token Budget\)\n\n"
        r"\*\*Бюджет токенов \(Token Budget\)\*\* — (.+)\n\n"
        r"→ `\[ref: part_07a\.md §7A\.12[^\]]*\]`\n"
        r"→ `\[meta: ([^\]]+)\]`",
        registry,
    )
    if not m:
        err("glossary registry: Token Budget entry (C-21 pattern) not found "
            "or malformed")
    else:
        if "§7A.12" not in m.group(1):
            err("glossary C-21: definition does not defer values to §7A.12")
        if "home=p7a_token_budget" not in m.group(2):
            err("glossary C-21: meta home=p7a_token_budget missing")
    glossary = json.loads(read(GLOSSARY_JSON))
    term = next(
        (t for t in glossary.get("canonical_terms", [])
         if t.get("term") == "Бюджет токенов (Token Budget)"),
        None,
    )
    if term is None:
        err("data/glossary.json: Token Budget entry missing")
    else:
        if term.get("anchor_id") != "p7a_token_budget":
            err("data/glossary.json: Token Budget anchor_id != p7a_token_budget")
        if "§7A.12" not in term.get("definition", ""):
            err("data/glossary.json: Token Budget definition does not defer to §7A.12")
    notes.append("glossary C-21: values deferred to §7A.12 (registry + generated JSON)")

    # ---------- 8. Root fallbacks ----------
    if FALLBACK_10.exists():
        fb10 = read(FALLBACK_10)
        if E15_DERIVATION_NOTE not in fb10:
            err("parts/part_10.html (root fallback): E15 derivation note missing — "
                "rebuild required (pnpm run build)")
    else:
        err("parts/part_10.html (root fallback) not found — rebuild required")
    if FALLBACK_01.exists():
        fb01 = read(FALLBACK_01)
        fb_ann = parse_e01_annotations(embed_region(fb01, "E01") or "")
        if fb_ann.get("SP") != list(CANONICAL_ROWS["System Prompt"]):
            err("parts/part_01.html (root fallback): E01 SP annotations stale — "
                "rebuild required (pnpm run build)")
    else:
        err("parts/part_01.html (root fallback) not found — rebuild required")
    notes.append("root fallbacks: parts/part_01.html + parts/part_10.html current")

    # ---------- 9. Map parity ----------
    map_text = read(MAP)
    if "### 5.3 Token budget slice" not in map_text:
        err("migration_map_v2.md: §5.3 Token budget slice missing")
    else:
        slice_53 = re.search(
            r"^### 5\.3 .*?(?=^## 6\. )", map_text, re.DOTALL | re.MULTILINE,
        )
        tb_rows = re.findall(r"^\| TB-(\d+) \|", slice_53.group(0) if slice_53 else "", re.MULTILINE)
        if sorted(tb_rows) != [str(i) for i in range(1, 9)]:
            err(f"migration_map_v2.md §5.3: expected TB-1..TB-8 rows, got {tb_rows}")
        if slice_53 and "executed iter 135" not in slice_53.group(0):
            err("migration_map_v2.md §5.3: execution status (iter 135) missing")
    row_b5 = next((ln for ln in map_text.split("\n")
                   if ln.startswith("| Token budget |")), None)
    if row_b5 is None:
        err("migration_map_v2.md: Registry B row 5 (Token budget) not found")
    elif "executed iter 135" not in row_b5.lower():
        err("migration_map_v2.md: Registry B row 5 does not record the iter-135 execution")
    for el in ("E01", "E15"):
        row = next((ln for ln in map_text.split("\n")
                    if ln.startswith(f"| {el} |")), None)
        if row is None or "iter 135" not in row:
            err(f"migration_map_v2.md: Registry A {el} row does not record the "
                f"iter-135 execution")

    # ---------- 10. Matrix parity ----------
    matrix = read(MATRIX)
    matrix_checks = [
        ("p7a_token_budget::03", "migration_map_v2 TB-1"),
        ("p1_structure_overview::04", "migration_map_v2 TB-3"),
        ("p10_elena::01", "migration_map_v2 TB-4"),
        ("appendix_glossary::21", "migration_map_v2 TB-6"),
    ]
    for row_id, pointer in matrix_checks:
        row = next((ln for ln in matrix.split("\n") if f"| {row_id} |" in ln), None)
        if row is None:
            err(f"editorial_matrix.md: row {row_id} not found")
        elif pointer not in row:
            err(f"editorial_matrix.md: row {row_id} missing back-pointer → {pointer}")

    # ---------- Deferred / observed layers (reported, never failed) ----------
    deferred = []
    for el, proto in (
        ("E01", REPO / "visual-system" / "elements" / "E01-card-anatomy.html"),
        ("E15", REPO / "visual-system" / "elements" / "E15-annotated-blueprint.html"),
    ):
        extract = (REPO / "visual-system" / "integration" / "component-extracts"
                   / f"{el}-visual.html")
        deferred.append(
            f"{proto.relative_to(REPO)}: {'present' if proto.exists() else 'MISSING'}; "
            f"{extract.relative_to(REPO)}: {'present' if extract.exists() else 'MISSING'} "
            f"({el} prototype/extract — REMOVED_WITH_REASON deferred, map §6.1)")
    deferred.append(
        "out-of-slice budget-adjacent prose (owner-gated ed-5 / KI#77-e, R11/R27 "
        "family): §7A.11 4K table · §1.8 prebuild Q2 · §9.11 «≤800» · §8.2 AP-1 "
        "«>800» · Part 10 card totals · §7B.2 Greeting «50–100» (instance found "
        "iter 135) — untouched by mig-4")
    deferred.append(
        "calculator slider bounds = §7A.12's own UI affordances (canon-declared "
        "«400–800» result range) — part of the canonical section, not a competing table")
    notes.extend(deferred)

    return finish()


def finish():
    print("Token budget parity audit (mig-4, iter 135)")
    for n in notes:
        print(f"  - {n}")
    if errors:
        print(f"\nFAIL — {len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — single canonical value owner intact: §7A.12 canonical, "
          "E01/E15 SHARED_REFERENCE (E15 totals + derivation note), canon "
          "markers present, glossary defers values, root fallbacks current.")


if __name__ == "__main__":
    main()
