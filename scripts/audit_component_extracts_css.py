#!/usr/bin/env python3
"""
Audit component-extracts/E##-styles.css vs corresponding block in
src/assets/vs-styles.css SECTION 5 (Component Extracts E01-E18).

Background (KI#32, iter 42):
  The 18 `E##-styles.css` files in `visual-system/integration/component-extracts/`
  were the ORIGINAL source for SECTION 5 of `src/assets/vs-styles.css`. After
  initial integration, both copies evolved independently:
    - SECTION 5 in vs-styles.css received KI#22 callout scoping fixes for E15
    - E18 styles were extended in iter 25 (post-creation changes)

  The other 16 E##-styles.css files remain 1:1 matches with their
  counterparts in vs-styles.css SECTION 5.

  This script documents the drift. The extracts are NOT used by the build
  pipeline — they exist as historical reference only.

Strategy: extract the E## block from vs-styles.css (between
`/* --- E## --- */` and the next `/* --- E## --- */` or `/* SECTION 6`),
strip the leading comment header, and diff against the extract file
(also stripped of its leading comment header).

Run:
    python3 scripts/audit_component_extracts_css.py
"""

import re
import sys
import difflib
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
EXTRACTS_DIR = REPO / "visual-system" / "integration" / "component-extracts"
VS_STYLES = REPO / "src" / "assets" / "vs-styles.css"

ELEMENTS = [f"E{i:02d}" for i in range(1, 19)]


def extract_block_from_vs_styles(text: str, elem: str):
    """Find `/* --- E## ... --- */` block and return content until next block."""
    pat = re.compile(
        r"/\*\s*---\s+" + re.escape(elem) + r"\b[^\n]*\n"
        r"([\s\S]*?)(?=/\*\s*---\s+E\d{2}\b|/\*\s*SECTION\s+6)",
    )
    m = pat.search(text)
    if not m:
        return None
    body = m.group(1)
    # Strip leading comment header (multi-line /* ... */)
    hdr = re.match(r"^\s*/\*[\s\S]*?\*/\s*\n", body)
    if hdr:
        return body[hdr.end():]
    return body


def strip_extract_header(text: str):
    hdr = re.match(r"^\s*/\*[\s\S]*?\*/\s*\n", text)
    if hdr:
        return text[hdr.end():]
    return text


def normalize(text: str):
    lines = [ln.rstrip() for ln in text.splitlines()]
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return lines


def main():
    vs_text = VS_STYLES.read_text(encoding="utf-8")
    print("=" * 78)
    print("AUDIT: component-extracts/E##-styles.css vs vs-styles.css SECTION 5")
    print("=" * 78)
    print(f"{'Elem':<6} {'Extract ln':<12} {'VS-styles ln':<14} {'Drift':<20}")
    print("-" * 78)

    drifters = []
    missing = []
    for elem in ELEMENTS:
        extract_path = EXTRACTS_DIR / f"{elem}-styles.css"
        if not extract_path.exists():
            missing.append((elem, "extract file not found"))
            print(f"{elem:<6} {'MISSING':<12}")
            continue
        extract_raw = strip_extract_header(extract_path.read_text(encoding="utf-8"))
        vs_block = extract_block_from_vs_styles(vs_text, elem)
        if vs_block is None:
            missing.append((elem, "block not found in vs-styles.css SECTION 5"))
            print(f"{elem:<6} {len(normalize(extract_raw)):<12} {'NOT FOUND':<14}")
            continue

        a = normalize(extract_raw)
        b = normalize(vs_block)
        sm = difflib.SequenceMatcher(a=a, b=b)
        added = removed = 0
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            if tag == "delete":
                removed += i2 - i1
            elif tag == "insert":
                added += j2 - j1
            elif tag == "replace":
                removed += i2 - i1
                added += j2 - j1
        status = "MATCH" if added + removed == 0 else f"+{added}/-{removed}"
        print(f"{elem:<6} {len(a):<12} {len(b):<14} {status:<20}")

        if added + removed > 0:
            drifters.append({
                "elem": elem,
                "extract_lines": a,
                "vs_lines": b,
                "added": added,
                "removed": removed,
            })

    print("-" * 78)
    if missing:
        print(f"\nMISSING ({len(missing)}):")
        for e, why in missing:
            print(f"  - {e}: {why}")

    if drifters:
        print(f"\nDRIFT in {len(drifters)} styles.css files:")
        for d in drifters:
            print(f"  - {d['elem']}: +{d['added']} / -{d['removed']}")
        print("\n" + "=" * 78)
        print("DETAILED DRIFT (first 60 lines per element)")
        print("=" * 78)
        for d in drifters:
            print(f"\n--- {d['elem']}-styles.css (extract) vs vs-styles.css SECTION 5 {d['elem']} block ---")
            diff = difflib.unified_diff(
                d["extract_lines"], d["vs_lines"],
                fromfile=f"extracts/{d['elem']}-styles.css",
                tofile=f"vs-styles.css#SECTION-5-{d['elem']}",
                lineterm="",
                n=1,
            )
            for line in list(diff)[:60]:
                print(line)
        sys.exit(1)
    else:
        print("\n✓ All 18 E##-styles.css extracts match vs-styles.css SECTION 5 blocks")
        sys.exit(0)


if __name__ == "__main__":
    main()
