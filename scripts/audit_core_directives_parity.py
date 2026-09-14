#!/usr/bin/env python3
"""
audit_core_directives_parity.py — mig-2 acceptance audit (iter 134, DEC-08 / ed-2 / matrix R02).

Verifies the CORE DIRECTIVES single-canonical-presentation architecture across every
presentation layer of the v1 inventory (migration_foundation_iter131.md §5.1):

    §7A.2 (canon + master)   = THE single canonical definition (prose + template +
                               per-directive explanations) — unchanged
    E08 master embed          = the ONE visual presentation — SHARED_REFERENCE
                               (§7A.2 owns; parity-locked by this audit)
    §7A.1 / §7A.13 / Part 10 = DEC-08 shorthand references only
    glossary (registry C-5)  = 1-sentence definition + 7-name index + §7A.2 link
    prototype/extract E08    = stale derived copies — REMOVED_WITH_REASON deferred
                               on map §6.1 (visual-markup ownership, owner decision)

Checks:
 1. Canonical record (canon §7A.2): exactly one <CORE_DIRECTIVES> block; exactly 7
    directives; sequential numbering 1–7; #6 = CONSEQUENCE DRIVEN and
    #7 = PRE-GENERATION FILTER (acceptance invariant); 7 per-directive h4 headings
    (RU title + EN name); template EN names == h4 EN names per number.
 2. Master §7A.2 mirror: same canonical block + same 7 h4 headings.
 3. §7A.13 re-point (R02 executed): canon Шаг 3 carries the DEC-08 shorthand
    {{CORE_DIRECTIVES — канонический шаблон → §7A.2}}; master p7a_assembly_pipeline
    mirrors it (shorthand + link to #p7a_core_directives); no full expansion
    remains in the assembly section (canon + master).
 4. §7A.1 canonical SP template: shorthand form only (canon + master).
 5. Part 10 manifestations: every CORE_DIRECTIVES occurrence is the DEC-08
    shorthand (canon + master, 4 each); no full expansion.
 6. E08 embed (SHARED_REFERENCE): exactly 7 directive nodes; node RU titles equal
    the canonical h4 RU titles (multi-line node titles joined); numbers 1–7;
    [Model ↗] badges on directives 6 and 7 only; canonical value carriers present
    (node 2 "State → Body → Sensor → Speech"; node 6 WANT/NEED/Price terms).
 7. Glossary entry (C-5, executed iter 133): registry entry = 1-sentence definition
    + 7-name index + §7A.2 ref; generated data/glossary.json mirrors it.
 8. No competing full definitions in the guide layer: numbered-template directive
    lines exist ONLY in canon part_07a.md (7, §7A.2) and master part_07a.html
    (7, §7A.2). Any other file or excess count = FAIL.
 9. Root fallback: parts/part_07a.html carries the §7A.13 shorthand and no second
    full expansion (build output current with master).
10. Map parity: migration_map_v2.md §5.2 slice present (D-1..D-8); D-2 executed
    iter 134; Registry B row 1 carries the executed status; affected matrix rows
    in editorial_matrix.md carry → migration_map_v2 D-<n> back-pointers.

Deferred layers (reported as notes, never failures):
  - visual-system/elements/E08-core-directives.html + component-extracts/E08-*
    (disposition REMOVED_WITH_REASON, blocked on map §6.1 owner decision);
  - docs/canon/appendix_glossary.md + src/master/appendix_glossary.html (frozen
    v1 migration source; full annotated copy superseded by registry C-5 —
    disposed at the v2 switch, DEC-18);
  - agent-doc condensed references (AGENT_NAVIGATION.md §5, docs/architecture.md
    CORE DIRECTIVES table) — REFERENCE_ONLY, not guide presentations.

Exit codes: 0 — PASS; 1 — FAIL (messages above).
Run: python3 scripts/audit_core_directives_parity.py
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CANON_7A = REPO / "docs" / "canon" / "part_07a.md"
CANON_10 = REPO / "docs" / "canon" / "part_10.md"
MASTER_7A = REPO / "src" / "master" / "part_07a.html"
MASTER_10 = REPO / "src" / "master" / "part_10.html"
CANON_DIR = REPO / "docs" / "canon"
MASTER_DIR = REPO / "src" / "master"
FALLBACK_7A = REPO / "parts" / "part_07a.html"
REGISTRY = REPO / "docs" / "canon" / "glossary_registry.md"
GLOSSARY_JSON = REPO / "data" / "glossary.json"
MAP = REPO / "docs" / "research" / "migration_map_v2.md"
MATRIX = REPO / "docs" / "research" / "editorial_matrix.md"

# Acceptance invariants (PLAN mig-2 / STATUS Invariants).
INVARIANT_COUNT = 7
INVARIANT_6 = "CONSEQUENCE DRIVEN"
INVARIANT_7 = "PRE-GENERATION FILTER"

# Canonical shorthand forms (DEC-08).
SHORTHAND_ASSEMBLY = "{{CORE_DIRECTIVES — канонический шаблон → §7A.2}}"
SHORTHAND_MASTER_LINK = (
    '{{CORE_DIRECTIVES — канонический шаблон → '
    '<a href="#p7a_core_directives">§7A.2</a>}}'
)

# A numbered-template directive line, e.g. "3. SPATIAL & ANATOMICAL LOCK: Track ...".
DIRECTIVE_LINE_RE = re.compile(
    r"^\d\. (SHOW NEVER TELL|EMBODIMENT FIRST|SPATIAL & ANATOMICAL LOCK|"
    r"ENVIRONMENTAL REACTIVITY|INFLUENCE BOUNDARY|CONSEQUENCE DRIVEN|"
    r"PRE-GENERATION FILTER): "
)

errors = []
notes = []


def err(msg):
    errors.append(msg)


def read(path):
    return path.read_text(encoding="utf-8")


def section(text, start_re, end_re):
    """Slice text from the first line matching start_re to the line before the
    first subsequent line matching end_re (or EOF)."""
    lines = text.split("\n")
    start_idx = end_idx = None
    for i, line in enumerate(lines):
        if start_idx is None and re.match(start_re, line):
            start_idx = i
        elif start_idx is not None and re.match(end_re, line):
            end_idx = i
            break
    if start_idx is None:
        return None
    return "\n".join(lines[start_idx : end_idx if end_idx is not None else len(lines)])


def parse_canonical_block(region):
    """Parse the <CORE_DIRECTIVES> template block: {n: (NAME, one-liner)}."""
    m = re.search(r"<CORE_DIRECTIVES>\n(.*?)</CORE_DIRECTIVES>", region, re.DOTALL)
    if not m:
        return None
    directives = {}
    for line in m.group(1).split("\n"):
        dm = re.match(r"^(\d)\. ([A-Z][A-Z &'-]+): (.+)$", line)
        if dm:
            directives[int(dm.group(1))] = (dm.group(2), dm.group(3))
    return directives


def parse_h4_headings(region, html=False):
    """Parse per-directive headings: {n: (RU title, EN name)}.

    Canon:  '#### 1. Показывай, не говори (Show Never Tell)'
    Master: '<h4>1. Показывай, не говори (Show Never Tell)</h4>'
    """
    if html:
        pat = re.compile(r"<h4>(\d)\. (.+?) \((.+?)\)</h4>")
        found = pat.findall(region)
    else:
        pat = re.compile(r"^#### (\d)\. (.+) \((.+)\)$", re.MULTILINE)
        found = pat.findall(region)
    return {int(n): (ru, en) for n, ru, en in found}


def main():
    # ---------- 1. Canonical record (canon §7A.2) ----------
    canon = read(CANON_7A)
    sec72 = section(canon, r"^## 7A\.2 ", r"^## 7A\.3 ")
    if sec72 is None:
        err("canon §7A.2 section not found")
        return finish()
    blocks = re.findall(r"<CORE_DIRECTIVES>", sec72)
    if len(blocks) != 1:
        err(f"canon §7A.2: expected exactly 1 <CORE_DIRECTIVES> block, found {len(blocks)}")
    canon_dirs = parse_canonical_block(sec72)
    if canon_dirs is None:
        err("canon §7A.2: <CORE_DIRECTIVES> block not parseable")
        canon_dirs = {}
    if len(canon_dirs) != INVARIANT_COUNT:
        err(f"canon §7A.2: expected {INVARIANT_COUNT} directives, found {len(canon_dirs)}")
    if sorted(canon_dirs) != list(range(1, INVARIANT_COUNT + 1)):
        err(f"canon §7A.2: numbering not sequential 1..7 (got {sorted(canon_dirs)})")
    if canon_dirs.get(6, ("", ""))[0] != INVARIANT_6:
        err(f"canon §7A.2: directive #6 must be {INVARIANT_6} "
            f"(got {canon_dirs.get(6, ('—',))[0]})")
    if canon_dirs.get(7, ("", ""))[0] != INVARIANT_7:
        err(f"canon §7A.2: directive #7 must be {INVARIANT_7} "
            f"(got {canon_dirs.get(7, ('—',))[0]})")
    canon_h4 = parse_h4_headings(sec72, html=False)
    if len(canon_h4) != INVARIANT_COUNT:
        err(f"canon §7A.2: expected {INVARIANT_COUNT} per-directive h4 headings, "
            f"found {len(canon_h4)}")
    for n, (ru, en) in canon_h4.items():
        if n in canon_dirs and canon_dirs[n][0].upper() != en.upper():
            err(f"canon §7A.2: h4 #{n} EN name '{en}' != template name "
                f"'{canon_dirs[n][0]}'")
    notes.append(f"canonical record §7A.2: {len(canon_dirs)} directives, "
                 f"#6={INVARIANT_6}, #7={INVARIANT_7}")

    # ---------- 2. Master §7A.2 mirror ----------
    master = read(MASTER_7A)
    m72 = re.search(
        r'<section[^>]*data-section="p7a_core_directives".*?</section>',
        master, re.DOTALL,
    )
    if not m72:
        err("master: p7a_core_directives section not found")
        return finish()
    m72_text = m72.group(0)
    m_blocks = re.findall(r"&lt;CORE_DIRECTIVES&gt;", m72_text)
    if len(m_blocks) != 1:
        err(f"master §7A.2: expected exactly 1 escaped <CORE_DIRECTIVES> block, "
            f"found {len(m_blocks)}")
    unescaped = (
        m72_text.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&")
    )
    master_dirs = parse_canonical_block(unescaped)
    if master_dirs != canon_dirs:
        err("master §7A.2: canonical block diverges from canon §7A.2")
    master_h4 = parse_h4_headings(m72_text, html=True)
    if master_h4 != canon_h4:
        err("master §7A.2: per-directive h4 headings diverge from canon")
    notes.append(f"master §7A.2 mirror: {len(master_dirs)} directives, "
                 f"h4 headings match canon")

    # ---------- 3. §7A.13 re-point (R02 executed) ----------
    canon_713 = section(canon, r"^## 7A\.13 ", r"^## 7A\.14 ")
    if canon_713 is None:
        err("canon §7A.13 section not found")
    else:
        if SHORTHAND_ASSEMBLY not in canon_713:
            err("canon §7A.13: DEC-08 shorthand not found in the assembly section")
        if re.search(r"<CORE_DIRECTIVES>\n\d\.", canon_713):
            err("canon §7A.13: full <CORE_DIRECTIVES> expansion still present")
    m713 = re.search(
        r'<section[^>]*data-section="p7a_assembly_pipeline".*?</section>',
        master, re.DOTALL,
    )
    if not m713:
        err("master: p7a_assembly_pipeline section not found")
    else:
        m713_text = m713.group(0)
        if SHORTHAND_MASTER_LINK not in m713_text:
            err("master §7A.13: DEC-08 shorthand (master link form) not found "
                "in the assembly section")
        if '<a href="#p7a_core_directives">§7A.2</a>' not in m713_text:
            err("master §7A.13: shorthand link to #p7a_core_directives missing")
        if "&lt;CORE_DIRECTIVES&gt;\n1. SHOW NEVER TELL" in m713_text:
            err("master §7A.13: full <CORE_DIRECTIVES> expansion still present")
    notes.append("§7A.13 re-point: shorthand in place (canon + master), "
                 "no full expansion")

    # ---------- 4. §7A.1 canonical SP template ----------
    canon_71 = section(canon, r"^## 7A\.1 ", r"^## 7A\.2 ")
    if canon_71 is None:
        err("canon §7A.1 section not found")
    elif "{{CORE_DIRECTIVES" not in canon_71:
        err("canon §7A.1: SP template shorthand not found")
    m71 = re.search(
        r'<section[^>]*data-section="p7a_system_prompt".*?</section>',
        master, re.DOTALL,
    )
    if not m71:
        err("master: p7a_system_prompt section not found")
    elif "{{CORE_DIRECTIVES" not in m71.group(0):
        err("master §7A.1: SP template shorthand not found")
    notes.append("§7A.1 SP template: shorthand form only (canon + master)")

    # ---------- 5. Part 10 manifestations ----------
    p10_canon = read(CANON_10)
    p10_master = read(MASTER_10)
    canon_occurrences = re.findall(r"\{\{CORE_DIRECTIVES[^}]*\}\}", p10_canon)
    master_occurrences = re.findall(r"\{\{CORE_DIRECTIVES[^}]*\}\}", p10_master)
    if len(canon_occurrences) != 4 or len(master_occurrences) != 4:
        err(f"Part 10: expected 4 shorthand occurrences each in canon/master, "
            f"got {len(canon_occurrences)}/{len(master_occurrences)}")
    for occ in canon_occurrences:
        if occ != "{{CORE_DIRECTIVES — канонический шаблон → Part 7A}}":
            err(f"Part 10 canon: non-canonical shorthand form: {occ}")
    for text, label in ((p10_canon, "canon"), (p10_master, "master")):
        for line in text.split("\n"):
            if DIRECTIVE_LINE_RE.match(line):
                err(f"Part 10 {label}: full-expansion line present: {line[:60]}…")
    notes.append(f"Part 10: {len(canon_occurrences)}/{len(master_occurrences)} "
                 f"shorthand occurrences, no full expansion")

    # ---------- 6. E08 embed (SHARED_REFERENCE) ----------
    e08 = re.search(
        r'<div class="vs-embed" data-vs-element="E08">.*?'
        r"<!-- REPLACED BY VISUAL SYSTEM: E08 -->",
        master, re.DOTALL,
    )
    if not e08:
        err("master: E08 embed not found")
    else:
        e08_text = e08.group(0)
        nodes = re.findall(
            r'<g class="anim-group directive-node">(.*?)</g>', e08_text, re.DOTALL
        )
        if len(nodes) != INVARIANT_COUNT:
            err(f"E08 embed: expected {INVARIANT_COUNT} directive nodes, "
                f"found {len(nodes)}")
        for i, node in enumerate(nodes, start=1):
            number = re.findall(r'fill="#3cc8ff"[^>]*>(\d)</text>', node)
            titles = re.findall(r'fill="#e2e6ed"[^>]*>([^<]+)</text>', node)
            oneliner = re.findall(r'fill="#6b7590"[^>]*>([^<]+)</text>', node)
            if number != [str(i)]:
                err(f"E08 node {i}: number text {number} != ['{i}']")
            if not titles:
                err(f"E08 node {i}: title texts missing")
            if not oneliner:
                err(f"E08 node {i}: one-liner text missing")
            joined_title = " ".join(t.strip() for t in titles)
            expected = canon_h4.get(i, ("—", ""))[0]
            if joined_title != expected:
                err(f"E08 node {i}: title '{joined_title}' != canonical "
                    f"h4 title '{expected}'")
        badges = re.findall(r'class="model-badge"', e08_text)
        if len(badges) != 2:
            err(f"E08 embed: expected exactly 2 [Model ↗] badges (directives 6+7), "
                f"found {len(badges)}")
        if "State → Body → Sensor → Speech" not in e08_text:
            err("E08 embed: node 2 canonical sequence 'State → Body → Sensor → "
                "Speech' missing")
        node6 = nodes[5] if len(nodes) == INVARIANT_COUNT else e08_text
        for term in ("WANT", "NEED", "Price"):
            if term not in node6:
                err(f"E08 node 6: canonical term '{term}' missing from the "
                    f"one-liner")
        notes.append("E08 embed: 7 nodes, titles == canonical h4 titles, "
                     "numbers 1–7, [Model ↗] on 6+7 only, value carriers present")

    # ---------- 7. Glossary entry (C-5) ----------
    registry = read(REGISTRY)
    entry = re.search(
        r"### Основные директивы \(CORE DIRECTIVES\)\n\n"
        r"\*\*Основные директивы \(CORE DIRECTIVES\)\*\* — (.+)\n\n"
        r"→ `\[ref: part_07a\.md §7A\.2[^\]]*\]`\n"
        r"→ `\[meta: ([^\]]+)\]`",
        registry,
    )
    if not entry:
        err("glossary registry: CORE DIRECTIVES entry (C-5 pattern) not found "
            "or malformed")
    else:
        definition, meta = entry.group(1), entry.group(2)
        for n, (name, _) in sorted(canon_dirs.items()):
            if name.lower() not in definition.lower():
                err(f"glossary C-5 definition: directive #{n} name '{name}' "
                    f"missing from the 7-name index")
        if "home=p7a_core_directives" not in meta:
            err("glossary C-5 meta: home=p7a_core_directives missing")
    glossary = json.loads(read(GLOSSARY_JSON))
    term = next(
        (t for t in glossary.get("canonical_terms", [])
         if t.get("term") == "Основные директивы (CORE DIRECTIVES)"),
        None,
    )
    if term is None:
        err("data/glossary.json: CORE DIRECTIVES entry missing")
    else:
        if term.get("anchor_id") != "p7a_core_directives":
            err("data/glossary.json: CORE DIRECTIVES anchor_id != p7a_core_directives")
        for n, (name, _) in sorted(canon_dirs.items()):
            if name.lower() not in term.get("definition", "").lower():
                err(f"data/glossary.json: directive #{n} name '{name}' missing "
                    f"from the entry definition")
    notes.append("glossary C-5: 1-sentence + 7-name index + §7A.2 ref "
                 "(registry + generated JSON)")

    # ---------- 8. No competing full definitions (guide layer) ----------
    for path in sorted(CANON_DIR.glob("part_*.md")):
        count = sum(1 for line in read(path).split("\n")
                    if DIRECTIVE_LINE_RE.match(line))
        allowed = 7 if path.name == "part_07a.md" else 0
        if count != allowed:
            err(f"{path.name}: {count} numbered-template directive lines "
                f"(expected {allowed})")
    for path in sorted(MASTER_DIR.glob("*.html")):
        count = sum(1 for line in read(path).split("\n")
                    if DIRECTIVE_LINE_RE.match(line))
        allowed = 7 if path.name == "part_07a.html" else 0
        if count != allowed:
            err(f"src/master/{path.name}: {count} numbered-template directive lines "
                f"(expected {allowed})")
    notes.append("guide layer: numbered-template blocks only in §7A.2 "
                 "(canon 7 + master 7)")

    # ---------- 9. Root fallback ----------
    if FALLBACK_7A.exists():
        fallback = read(FALLBACK_7A)
        if SHORTHAND_MASTER_LINK not in fallback:
            err("parts/part_07a.html (root fallback): §7A.13 shorthand missing — "
                "rebuild required (pnpm run build)")
        fb_count = sum(1 for line in fallback.split("\n")
                       if DIRECTIVE_LINE_RE.match(line))
        if fb_count != 7:
            err(f"parts/part_07a.html: {fb_count} numbered-template directive lines "
                f"(expected 7 — §7A.2 only)")
    else:
        err("parts/part_07a.html (root fallback) not found — rebuild required")

    # ---------- 10. Map + matrix parity ----------
    map_text = read(MAP)
    if "### 5.2 CORE DIRECTIVES slice" not in map_text:
        err("migration_map_v2.md: §5.2 CORE DIRECTIVES slice missing")
    else:
        slice_52 = section(map_text, r"^### 5\.2 ", r"^## 6\. ")
        d_rows = re.findall(r"^\| D-(\d) \|", slice_52 or "", re.MULTILINE)
        if sorted(d_rows) != [str(i) for i in range(1, 9)]:
            err(f"migration_map_v2.md §5.2: expected D-1..D-8 rows, got {d_rows}")
        if slice_52 and "executed iter 134" not in slice_52:
            err("migration_map_v2.md §5.2: D-2 execution status (iter 134) missing")
    row_b1 = next((ln for ln in map_text.split("\n")
                   if ln.startswith("| CORE DIRECTIVES (7) |")), None)
    if row_b1 is None:
        err("migration_map_v2.md: Registry B CORE DIRECTIVES row not found")
    elif "executed iter 134" not in row_b1.lower():
        err("migration_map_v2.md: Registry B row 1 does not record the iter-134 "
            "execution")
    e08_row = next((ln for ln in map_text.split("\n")
                    if ln.startswith("| E08 |")), None)
    if e08_row is None or "iter 134" not in e08_row:
        err("migration_map_v2.md: Registry A E08 row does not record the iter-134 "
            "execution (SHARED_REFERENCE locked)")

    matrix = read(MATRIX)
    matrix_checks = [
        ("p7a_assembly_pipeline::05", "migration_map_v2 D-2"),
        ("p7a_core_directives::05", "migration_map_v2 D-1"),
        ("p7a_system_prompt::08", "migration_map_v2 D-3"),
        ("p10_elena::04", "migration_map_v2 D-4"),
        ("appendix_glossary::05", "migration_map_v2 D-5"),
    ]
    for row_id, pointer in matrix_checks:
        row = next((ln for ln in matrix.split("\n") if f"| {row_id} |" in ln), None)
        if row is None:
            err(f"editorial_matrix.md: row {row_id} not found")
        elif pointer not in row:
            err(f"editorial_matrix.md: row {row_id} missing back-pointer "
                f"→ {pointer}")

    # ---------- Deferred layers (reported, never failed) ----------
    deferred = []
    for p in (
        REPO / "visual-system" / "elements" / "E08-core-directives.html",
        REPO / "visual-system" / "integration" / "component-extracts" / "E08-visual.html",
    ):
        deferred.append(f"{p.relative_to(REPO)}: "
                        f"{'present' if p.exists() else 'MISSING'} "
                        f"(REMOVED_WITH_REASON deferred — map §6.1)")
    for p in (CANON_DIR / "appendix_glossary.md",
              MASTER_DIR / "appendix_glossary.html"):
        deferred.append(f"{p.relative_to(REPO)}: "
                        f"{'present' if p.exists() else 'MISSING'} "
                        f"(frozen v1 — disposed at the v2 switch, DEC-18)")
    notes.extend(deferred)

    return finish()


def finish():
    print("CORE DIRECTIVES parity audit (mig-2, iter 134)")
    for n in notes:
        print(f"  - {n}")
    if errors:
        print(f"\nFAIL — {len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — single canonical presentation intact: §7A.2 canonical, "
          "E08 the one visual (SHARED_REFERENCE), shorthand elsewhere, "
          "glossary 1-sentence entry, no competing full definitions.")


if __name__ == "__main__":
    main()
