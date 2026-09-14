#!/usr/bin/env python3
"""
audit_glossary_parity.py — mig-1 acceptance audit (iter 133, DEC-17/DEC-18).

Verifies that the 45-entry unified glossary registry, the generated machine layer,
and the ratified migration-map dispositions are mutually consistent, and that the
DEC-17 chain is actually implemented:

    docs/canon/glossary_registry.md  →  data/glossary.json (generated)  →  runtime/no-JS

Checks:
  1. Registry parses to exactly 45 entries (+ the standalone pattern source C-1).
  2. Migration-map coverage: every C-1..C-26 and every T-01..T-55 appears exactly
     once in the registry provenance (sources) — 26 + 55 = 81 references.
  3. Disposition fidelity (map §5.1a/§5.1b → registry):
       - MERGED T-rows land in the registry entry carrying their map target C-n;
       - MOVED T-rows are standalone entries;
       - every registry head equals the map's proposed (ratified) head.
  4. Ratified ⚑ head-forms (owner chat 2026-09-14, DEC-18): the 6 identifier-boundary
     heads are present verbatim; their map rows carry ⚑.
  5. Head-form policy (DEC-16/DEC-17a): lang=ru heads start with a Cyrillic letter,
     lang=en heads start with a Latin letter/digit (identifier class).
  6. "English only as technical identifier" (owner's ratification control check):
     no run of 3+ English words outside «...» prescribed-prompt quotes unless every
     word belongs to the identifier vocabulary (heads/aliases/abbreviations).
  7. Anchors: every home/xref resolves to a live master section id
     (data-section/id inventory of src/master/*.html).
  8. Machine layer: data/glossary.json equals the registry projection — same 45
     terms, same definitions (first-letter capitalization aside), same anchors;
     version == src/VERSION == package.json; no core_rules; no unified_definition.
  9. Term findability (mirrors validate-master): every entry has at least one form
     (head component or alias) present in the master HTML content.
 10. Ref files: every [ref: part_NN.md ...] names an existing canon file.

Exit codes: 0 — PASS; 1 — FAIL (messages above).
Run: python3 scripts/audit_glossary_parity.py
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
REGISTRY = REPO / "docs" / "canon" / "glossary_registry.md"
MAP = REPO / "docs" / "research" / "migration_map_v2.md"
CANON_DIR = REPO / "docs" / "canon"
MASTER_DIR = REPO / "src" / "master"
JSON_PATH = REPO / "data" / "glossary.json"
VERSION_PATH = REPO / "src" / "VERSION"
PACKAGE = REPO / "package.json"

RATIFIED_FLAG_HEADS = [
    "System Prompt / SP (системный промпт)",
    "Author's Note (AN)",
    "Description (блок описания)",
    "Examples (примеры диалогов)",
    "Format Lock (фиксация формата)",
    "Tone Frame (тональный фрейм)",
]

errors = []
notes = []


def err(msg):
    errors.append(msg)


def parse_registry(text):
    """Parse registry entries + the standalone pattern meta sources."""
    entries = []
    standalone = []
    current = None
    in_fence = False
    for raw in text.split("\n"):
        line = raw.rstrip()
        if line.startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if line.startswith("### "):
            current = {"head": line[4:].strip()}
            entries.append(current)
            continue
        if current is None:
            m = re.match(r"^→ `\[meta: (.+)\]`$", line)
            if m:
                standalone.append(m.group(1))
            continue
        m = re.match(r"^\*\*(.+?)\*\* — (.*)$", line)
        if m and "definition" not in current:
            if m.group(1) != current["head"]:
                err(f'registry: bold head "{m.group(1)}" != heading "{current["head"]}"')
            current["definition"] = m.group(2).strip()
            continue
        m = re.match(r"^→ `\[ref: (.+)\]`$", line)
        if m:
            current["ref"] = m.group(1)
            continue
        m = re.match(r"^→ `\[meta: (.+)\]`$", line)
        if m:
            fields = {}
            for part in m.group(1).split("; "):
                if "=" in part:
                    k, v = part.split("=", 1)
                    fields[k] = v
            current["meta"] = fields
            continue
    return entries, standalone


def parse_map(map_text):
    """Parse map §5.1a (C-rows) and §5.1b (T-rows)."""
    c_rows = {}  # C-n -> {"new_head": str|None, "status": str}
    t_rows = {}  # T-nn -> {"term": str, "status": str, "target": str}
    section = None
    for line in map_text.split("\n"):
        if line.startswith("### 5.1a") or "**5.1a" in line:
            section = "a"
        elif line.startswith("### 5.1b") or "**5.1b" in line:
            section = "b"
        elif line.startswith("## 6."):
            section = None
        if not line.startswith("| C-") and not line.startswith("| T-"):
            continue
        cells = [c.strip() for c in line.split("|")]
        if line.startswith("| C-") and section == "a" and len(cells) > 5:
            cid = cells[1]
            new_cell = cells[4]
            m = re.search(r"«([^»]+)»", new_cell)
            c_rows[cid] = {"new_head": m.group(1) if m else None, "status": cells[5]}
        if line.startswith("| T-") and section == "b" and len(cells) > 4:
            tid = cells[1]
            t_rows[tid] = {"term": cells[2], "status": cells[3], "target": cells[4]}
    return c_rows, t_rows


def master_inventory():
    ids = set()
    content = ""
    for f in sorted(MASTER_DIR.glob("*.html")):
        html = f.read_text(encoding="utf-8")
        content += html
        ids.update(re.findall(r'data-section="([^"]+)"', html))
        ids.update(re.findall(r'<section[^>]*\bid="([^"]+)"', html))
    return ids, content.lower()


def parse_list(value):
    if not value or not value.strip():
        return []
    return [s.strip() for s in value.split(",") if s.strip()]


def main():
    # ---------- 1. registry ----------
    registry_text = REGISTRY.read_text(encoding="utf-8")
    entries, standalone = parse_registry(registry_text)
    if len(entries) != 45:
        err(f"registry: expected 45 entries, parsed {len(entries)}")
    for e in entries:
        if "definition" not in e or "ref" not in e or "meta" not in e:
            err(f'registry: incomplete entry "{e.get("head")}"')
        else:
            for req in ("sources", "lang", "home"):
                if not e["meta"].get(req):
                    err(f'registry: entry "{e["head"]}" misses meta "{req}"')

    heads = [e["head"] for e in entries]
    if len(set(heads)) != len(heads):
        err("registry: duplicate heads")

    # collect provenance
    all_sources = []
    entry_sources = {}
    for e in entries:
        srcs = [s for s in e["meta"].get("sources", "").split("+") if s.strip()]
        entry_sources[e["head"]] = srcs
        all_sources.extend(srcs)
    for meta in standalone:
        all_sources.extend(s for s in re.search(r"sources=([^;]+)", meta).group(1).split("+") if s.strip())

    dup = sorted({s for s in all_sources if all_sources.count(s) > 1})
    if dup:
        err(f"registry: duplicated provenance refs: {dup}")

    # ---------- 2. map coverage ----------
    map_text = MAP.read_text(encoding="utf-8")
    c_rows, t_rows = parse_map(map_text)
    if len(c_rows) != 26:
        err(f"map §5.1a: expected 26 C-rows, parsed {len(c_rows)}")
    if len(t_rows) != 55:
        err(f"map §5.1b: expected 55 T-rows, parsed {len(t_rows)}")

    expected_c = {f"C-{i}" for i in range(1, 27)}
    expected_t = {f"T-{i:02d}" for i in range(1, 56)}
    if set(c_rows) != expected_c:
        err(f"map §5.1a: C-row set mismatch: {sorted(set(c_rows) ^ expected_c)}")
    if set(t_rows) != expected_t:
        err(f"map §5.1b: T-row set mismatch: {sorted(set(t_rows) ^ expected_t)}")

    missing = (expected_c | expected_t) - set(all_sources)
    extra = set(all_sources) - (expected_c | expected_t)
    if missing:
        err(f"registry provenance: missing map rows: {sorted(missing)}")
    if extra:
        err(f"registry provenance: unknown refs: {sorted(extra)}")

    # ---------- 3. disposition fidelity ----------
    by_c_entry = {}  # C-n -> registry entry head carrying it
    for e in entries:
        for s in entry_sources[e["head"]]:
            if s.startswith("C-"):
                if s in by_c_entry:
                    err(f"registry: {s} claimed by two entries")
                by_c_entry[s] = e["head"]

    for tid, row in sorted(t_rows.items()):
        status, target = row["status"], row["target"]
        if status == "MERGED":
            m = re.match(r"(C-\d+)$", target.strip())
            if not m:
                err(f"map {tid}: MERGED target is not a C-row: {target}")
                continue
            c = m.group(1)
            owner = by_c_entry.get(c)
            if not owner:
                err(f"map {tid}: MERGED target {c} has no registry entry")
            elif tid not in entry_sources[owner]:
                err(f"map {tid}: MERGED into {c} ({owner}) but provenance missing")
        elif status == "MOVED":
            m = re.search(r"«([^»]+)»", target)
            if not m:
                err(f"map {tid}: MOVED target has no proposed head: {target}")
                continue
            head = m.group(1)
            if head not in entry_sources:
                err(f"map {tid}: MOVED head «{head}» is not a registry entry")
            elif tid not in entry_sources[head]:
                err(f"map {tid}: MOVED entry «{head}» provenance missing")
            elif len(entry_sources[head]) != 1:
                err(f"map {tid}: MOVED entry «{head}» should be standalone (sources={entry_sources[head]})")
        else:
            err(f"map {tid}: unexpected status {status}")

    # head fidelity vs map proposals
    for cid, row in c_rows.items():
        if cid == "C-1" or not row["new_head"]:
            continue
        owner = by_c_entry.get(cid)
        if owner and owner != row["new_head"]:
            err(f"map {cid}: proposed head «{row['new_head']}» != registry head «{owner}»")
        if owner is None and row["new_head"] in heads:
            err(f"map {cid}: head exists but does not carry {cid} in provenance")

    # ---------- 4. ratified ⚑ head-forms ----------
    for h in RATIFIED_FLAG_HEADS:
        if h not in heads:
            err(f"⚑ head missing verbatim: {h}")
    flagged_cells = re.findall(r"«([^»]+)» ⚑", map_text)
    for h in RATIFIED_FLAG_HEADS:
        if h not in flagged_cells:
            err(f"⚑ head «{h}» not flagged ⚑ in the map")

    # ---------- 5. head-form policy ----------
    for e in entries:
        lang = e["meta"].get("lang")
        first = e["head"][:1]
        if lang == "ru" and not ("А" <= first <= "Я" or "а" <= first <= "я"):
            err(f"head-form: lang=ru but head starts non-Cyrillic: {e['head']}")
        if lang == "en" and not (first.isascii() and (first.isalpha() or first.isdigit())):
            err(f"head-form: lang=en but head starts non-Latin: {e['head']}")

    # ---------- 6. English-only-as-identifier (owner's control check) ----------
    vocab = set()
    for e in entries:
        for chunk in [e["head"]] + parse_list(e["meta"].get("aliases", "")) + parse_list(e["meta"].get("abbr", "")):
            vocab.update(w.lower() for w in re.findall(r"[A-Za-z][A-Za-z'&\-]*", chunk))
    vocab.update(
        w.lower()
        for w in [
            "Show", "Never", "Tell", "Embodiment", "First", "Spatial", "Anatomical",
            "Lock", "Environmental", "Reactivity", "Influence", "Boundary",
            "Consequence", "Driven", "Pre-Generation", "Filter", "Tier", "Tier 0",
            "Tier 1", "Tier 2", "Tier 3", "CoT", "OOC", "XML", "API", "MBTI",
        ]
    )
    for e in entries:
        text = re.sub(r"«[^»]*»", "", e["definition"])  # prescribed prompt content
        for run in re.findall(r"[A-Za-z][A-Za-z'&\-]*(?:\s+[A-Za-z][A-Za-z'&\-]*){2,}", text):
            words = run.split()
            if not all(w.lower() in vocab for w in words):
                err(f"english-rule: entry «{e['head']}»: 3+ EN words outside identifier vocab: «{run}»")
        cyr_words = re.findall(r"[А-Яа-яёЁ]{3,}", e["definition"])
        if len(cyr_words) < 4:
            err(f"english-rule: entry «{e['head']}»: definition lacks Russian prose "
                f"({len(cyr_words)} Cyrillic words ≥3 chars)")

    # ---------- 7. anchors ----------
    ids, master_lower = master_inventory()
    for e in entries:
        home = e["meta"].get("home", "")
        if home and home not in ids:
            err(f"anchor: entry «{e['head']}»: home {home} is not a master section id")
        for x in parse_list(e["meta"].get("xrefs", "")):
            if x not in ids:
                err(f"anchor: entry «{e['head']}»: xref {x} is not a master section id")

    # ---------- 8. machine layer ----------
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    if list(data.keys()) != ["version", "canonical_terms"]:
        err(f"json: top-level keys {list(data.keys())} (expected version + canonical_terms only — no core_rules)")
    version = VERSION_PATH.read_text(encoding="utf-8").strip()
    pkg = json.loads(PACKAGE.read_text(encoding="utf-8"))["version"]
    if data.get("version") != version:
        err(f"json: version {data.get('version')} != src/VERSION {version}")
    if version != pkg:
        err(f"json: src/VERSION {version} != package.json {pkg}")
    terms = data.get("canonical_terms", [])
    if len(terms) != 45:
        err(f"json: expected 45 terms, got {len(terms)}")
    reg_by_head = {e["head"]: e for e in entries}
    for t in terms:
        e = reg_by_head.get(t["term"])
        if not e:
            err(f"json: term «{t['term']}» is not a registry head")
            continue
        if "unified_definition" in t:
            err(f"json: term «{t['term']}» carries unified_definition (stale v1 layer)")
        exp_def = e["definition"][0].upper() + e["definition"][1:]
        if t["definition"] != exp_def:
            err(f"json: definition mismatch for «{t['term']}»")
        if t["anchor_id"] != e["meta"]["home"]:
            err(f"json: anchor mismatch for «{t['term']}»")
        if t.get("language_category") != e["meta"]["lang"]:
            err(f"json: language_category mismatch for «{t['term']}»")
        exp_aliases = parse_list(e["meta"].get("aliases", ""))
        if t.get("aliases") != exp_aliases:
            err(f"json: aliases mismatch for «{t['term']}»")
    if {t["term"] for t in terms} != set(heads):
        err("json: term set != registry head set")

    # ---------- 9. findability ----------
    for e in entries:
        forms = [e["head"]] + parse_list(e["meta"].get("aliases", ""))
        # head components: the Latin identifier and the Cyrillic part of the head
        for part in re.findall(r"[A-Za-z][A-Za-z'&·\-]*[\w]*", e["head"]):
            if len(part) >= 3:
                forms.append(part)
        m = re.search(r"«?([А-Яа-яёЁ][\w\- ]+)", e["head"])
        if m and len(m.group(1)) >= 3:
            forms.append(m.group(1).strip())
        if not any(f.lower() in master_lower for f in forms if f and len(f) >= 3):
            err(f"findability: entry «{e['head']}» — no form found in master HTML")

    # ---------- 10. ref files ----------
    for e in entries:
        m = re.match(r"([\w.]+\.md)", e.get("ref", ""))
        if not m:
            err(f"ref: entry «{e['head']}» ref line unparsable")
        elif not (CANON_DIR / m.group(1)).exists():
            err(f"ref: entry «{e['head']}» names missing canon file {m.group(1)}")

    # ---------- report ----------
    print(f"Registry entries: {len(entries)} (ru/en: "
          f"{sum(1 for e in entries if e['meta'].get('lang') == 'ru')}/"
          f"{sum(1 for e in entries if e['meta'].get('lang') == 'en')})")
    print(f"Map rows parsed: {len(c_rows)} C-rows, {len(t_rows)} T-rows")
    print(f"Provenance refs: {len(all_sources)} (expected 81 = 26 C + 55 T)")
    print(f"Master section ids: {len(ids)}; JSON terms: {len(terms)}; JSON version: {data.get('version')}")
    for n in notes:
        print(f"  note: {n}")
    if errors:
        print(f"\nFAIL — {len(errors)} problem(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — registry / map / machine layer consistent; DEC-17 chain intact.")


if __name__ == "__main__":
    main()
