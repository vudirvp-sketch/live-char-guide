#!/usr/bin/env python3
"""
Audit component-extracts/E##-visual.html vs VS-EMBED blocks in src/master/*.html.

Background (KI#32, iter 42):
  `visual-system/integration/component-extracts/` contains 54 snapshot files
  (18 elements x 3: visual.html + styles.css + script.js) extracted from
  standalone prototypes during Phase 4 integration (iter 7-25). These files
  are NOT used by the build pipeline (scripts/build-unified.mjs,
  src/scripts/build-shell-unified.mjs) and NOT used at runtime — they exist
  only as historical reference for how integration was done.

  Over time the live code in `src/master/*.html` has drifted from these
  snapshots due to:
    - KI#13 (iter 20-24): inline `style="..."` -> `vs-ki13-*` CSS classes
    - KI#22 (iter 34): callout CSS scoping for E15
    - structural changes (annotation-layer attributes, wrapper markers)

  This drift is EXPECTED and ACCEPTABLE. The script's purpose is to
  document the drift, not to enforce sync. If extracts are ever needed as
  a current reference, regenerate them from `src/master/` and use this
  script to verify.

For each E## element:
  1. Extract VS-EMBED block from src/master/<target>.html
  2. Strip the wrapper `<div class="vs-embed" ...>` and the leading HTML comment header
  3. Compare to visual-system/integration/component-extracts/E##-visual.html
     (also stripped of its leading comment header)
  4. Report drift (added/removed/modified lines)

Output: summary table + per-element drift report.
Exit code: 0 if no drift, 1 if drift found.

Run:
    python3 scripts/audit_component_extracts.py
"""

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
if not (REPO / "src" / "master").exists():
    # Fallback for sandboxed environment with symlinked work dir
    REPO = Path("/home/z/my-project/work/live-char-guide")
MASTER_DIR = REPO / "src" / "master"
EXTRACTS_DIR = REPO / "visual-system" / "integration" / "component-extracts"

# Map E## -> (master_file, embed_marker_substring)
ELEMENT_MAP = {
    "E01": ("part_01.html", "E01 — Card Anatomy"),
    "E02": ("part_07a.html", "E02 — Assembly Pipeline"),
    "E03": ("part_02.html", "E03 — Behavioral Anchors / T→A→P"),
    "E04": ("part_02.html", "E04 — Embodiment Protocol"),
    "E05": ("part_04.html", "E05 — SPINE Framework"),
    "E06": ("part_04.html", "E06 — GHOST Layers"),
    "E07": ("part_03.html", "E07 — Voice Isolation"),
    "E08": ("part_07a.html", "E08 — CORE DIRECTIVES"),
    "E09": ("part_05.html", "E09 — OCEAN"),
    "E10": ("part_05.html", "E10 — Enneagram"),
    "E11": ("part_06.html", "E11 — CoT"),
    "E12": ("part_08.html", "E12 — Antipatterns"),
    "E13": ("part_09.html", "E13 — Diagnostics"),
    "E14": ("part_09.html", "E14 — Quality Scale"),
    "E15": ("part_10.html", "E15 — Elena Card Walkthrough"),
    "E16": ("part_07a.html", "E16 — Author's Note"),
    "E17": ("part_07a.html", "E17 — Sampling Parameters"),
    "E18": ("part_07b.html", "E18 — Greeting Algorithm"),
}


def extract_embed_block(master_path: Path, marker: str):
    """
    Extract content of the VS-EMBED block: between the wrapper open tag
    and the matching `<!-- /VS-EMBED -->` close marker (or next VS-EMBED).
    Returns (header_comment, inner_content) or (None, None).
    """
    text = master_path.read_text(encoding="utf-8")
    start_pat = re.compile(
        r"<!--\s*VS-EMBED:\s*" + re.escape(marker) + r"\s*-->\s*\n"
        r"<div class=\"vs-embed\"[^>]*>",
        re.MULTILINE,
    )
    sm = start_pat.search(text)
    if not sm:
        return None, None
    rest = text[sm.end():]
    # End: explicit /VS-EMBED, or next VS-EMBED, or </section>
    end_pat = re.compile(r"<!--\s*/VS-EMBED\s*-->|<!--\s*VS-EMBED:|</section>",
                         re.MULTILINE)
    em = end_pat.search(rest)
    if not em:
        return None, None
    block = rest[: em.start()].rstrip()
    # Strip trailing </div> (the closing of vs-embed wrapper)
    block = re.sub(r"\s*</div>\s*$", "", block)
    hdr = re.match(r"^\s*<!--[\s\S]*?-->\s*\n", block)
    if hdr:
        return hdr.group(0), block[hdr.end():]
    return None, block


def strip_extract_header(extract_text: str):
    hdr = re.match(r"^\s*<!--[\s\S]*?-->\s*\n", extract_text)
    if hdr:
        return hdr.group(0), extract_text[hdr.end():]
    return None, extract_text


def normalize(text: str) -> list:
    lines = [ln.rstrip() for ln in text.splitlines()]
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return lines


def diff_lines(a: list, b: list) -> dict:
    import difflib
    sm = difflib.SequenceMatcher(a=a, b=b)
    added = removed = 0
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        if tag == "delete":
            removed += i2 - i1
        elif tag == "insert":
            added += j2 - j1
        elif tag == "replace":
            removed += i2 - i1
            added += j2 - j1
    return {"added": added, "removed": removed}


def main():
    print("=" * 78)
    print("AUDIT: component-extracts/E##-visual.html vs VS-EMBED in src/master/*.html")
    print("=" * 78)
    print(f"{'Elem':<5} {'Master file':<22} {'Embed?':<8} {'Extract?':<9} "
          f"{'Embed ln':<9} {'Extract ln':<10} {'Drift':<20}")
    print("-" * 78)

    drifters = []
    missing = []
    for elem, (master_file, marker) in ELEMENT_MAP.items():
        master_path = MASTER_DIR / master_file
        extract_path = EXTRACTS_DIR / f"{elem}-visual.html"

        if not extract_path.exists():
            missing.append((elem, "extract file not found"))
            print(f"{elem:<5} {master_file:<22} {'?':<8} {'MISSING':<9}")
            continue

        _, embed_content = extract_embed_block(master_path, marker)
        extract_text = extract_path.read_text(encoding="utf-8")
        _, extract_content = strip_extract_header(extract_text)

        if embed_content is None:
            missing.append((elem, f"VS-EMBED marker '{marker}' not found in {master_file}"))
            print(f"{elem:<5} {master_file:<22} {'MISSING':<8} {'OK':<9}")
            continue

        embed_lines = normalize(embed_content)
        extract_lines = normalize(extract_content)

        d = diff_lines(embed_lines, extract_lines)
        total_drift = d["added"] + d["removed"]
        status = "MATCH" if total_drift == 0 else f"+{d['added']}/-{d['removed']}"
        print(f"{elem:<5} {master_file:<22} {'OK':<8} {'OK':<9} "
              f"{len(embed_lines):<9} {len(extract_lines):<10} {status:<20}")

        if total_drift > 0:
            drifters.append({
                "elem": elem,
                "master_file": master_file,
                "marker": marker,
                "embed_lines": embed_lines,
                "extract_lines": extract_lines,
                "drift": d,
            })

    print("-" * 78)
    if missing:
        print(f"\nMISSING ({len(missing)}):")
        for e, why in missing:
            print(f"  - {e}: {why}")

    if drifters:
        print(f"\nDRIFT FOUND in {len(drifters)} element(s):")
        for d in drifters:
            print(f"  - {d['elem']} ({d['master_file']}): "
                  f"+{d['drift']['added']} added / -{d['drift']['removed']} removed")
        print("\n" + "=" * 78)
        print("DETAILED DRIFT REPORT")
        print("=" * 78)
        import difflib
        for d in drifters:
            print(f"\n--- {d['elem']} ({d['master_file']}, marker '{d['marker']}') ---")
            diff = difflib.unified_diff(
                d["extract_lines"], d["embed_lines"],
                fromfile=f"extracts/{d['elem']}-visual.html",
                tofile=f"master/{d['master_file']}#VS-EMBED-{d['elem']}",
                lineterm="",
                n=2,
            )
            for line in list(diff)[:100]:
                print(line)
        sys.exit(1)
    else:
        print("\n✓ No drift: all 18 component-extracts match their VS-EMBED counterparts in src/master/")
        sys.exit(0)


if __name__ == "__main__":
    main()
