#!/usr/bin/env python3
"""
Targeted fix for KI#41: E10 VS-EMBED hardcoded colors → CSS variables.

Replaces hardcoded dark-theme colors and font-family ONLY inside the E10
embed block (between `<!-- VS-EMBED: E10 -->` and `<!-- REPLACED BY VISUAL SYSTEM: E10 -->`)
in `src/master/part_05.html` and `parts/part_05.html`.

Why scoped: E09 has a similar drift (deferred as KI#42). We must NOT touch E09
in this iteration to keep the change minimal and reviewable.

Mapping (matches `visual-system/integration/component-extracts/E10-visual.html`):
    stroke="#1e2430"  →  stroke="var(--border)"
    stroke="#8b5cf6"  →  stroke="var(--accent-violet)"
    stroke="#d9455a"  →  stroke="var(--danger)"
    stroke="#3fb68b"  →  stroke="var(--success)"
    fill="#0e1117"    →  fill="var(--bg-panel)"
    fill="#e2e6ed"    →  fill="var(--text-primary)"
    font-family="'DM Sans', sans-serif"  →  font-family="var(--font-heading)"

Run from repo root:
    python3 /home/z/my-project/scripts/fix_e10_embed.py
"""
from pathlib import Path

REPO = Path("/home/z/my-project/live-char-guide")
TARGETS = [
    REPO / "src/master/part_05.html",
    REPO / "parts/part_05.html",
]

START_MARKER = "<!-- VS-EMBED: E10"
END_MARKER = "<!-- REPLACED BY VISUAL SYSTEM: E10"

REPLACEMENTS = [
    ('stroke="#1e2430"', 'stroke="var(--border)"'),
    ('stroke="#8b5cf6"', 'stroke="var(--accent-violet)"'),
    ('stroke="#d9455a"', 'stroke="var(--danger)"'),
    ('stroke="#3fb68b"', 'stroke="var(--success)"'),
    ('fill="#0e1117"',   'fill="var(--bg-panel)"'),
    ('fill="#e2e6ed"',   'fill="var(--text-primary)"'),
    ('font-family="\'DM Sans\', sans-serif"', 'font-family="var(--font-heading)"'),
]


def fix_block(text: str) -> tuple[str, int]:
    """Apply REPLACEMENTS to text. Returns (new_text, total_replacements)."""
    total = 0
    for old, new in REPLACEMENTS:
        count = text.count(old)
        total += count
        text = text.replace(old, new)
    return text, total


def process_file(path: Path) -> int:
    src = path.read_text(encoding="utf-8")
    lines = src.splitlines(keepends=True)

    # Find E10 embed boundaries
    start_idx = None
    end_idx = None
    for i, line in enumerate(lines):
        if start_idx is None and START_MARKER in line:
            start_idx = i
        elif start_idx is not None and END_MARKER in line:
            end_idx = i
            break

    if start_idx is None or end_idx is None:
        print(f"  ✗ {path}: E10 markers not found")
        return 0

    # Extract E10 block (inclusive of end marker line)
    block_lines = lines[start_idx:end_idx + 1]
    block_text = "".join(block_lines)

    new_block, total = fix_block(block_text)

    # Reassemble
    new_lines = lines[:start_idx] + new_block.splitlines(keepends=True) + lines[end_idx + 1:]
    new_src = "".join(new_lines)

    if new_src != src:
        path.write_text(new_src, encoding="utf-8")
        print(f"  ✓ {path.relative_to(REPO)}: {total} replacement(s) in E10 block (lines {start_idx + 1}-{end_idx + 1})")
    else:
        print(f"  • {path.relative_to(REPO)}: no changes (already fixed?)")
    return total


def main():
    print("KI#41 fix: E10 VS-EMBED hardcoded colors → CSS variables (scoped to E10 block only)")
    grand_total = 0
    for path in TARGETS:
        grand_total += process_file(path)
    print(f"\nTotal replacements: {grand_total}")


if __name__ == "__main__":
    main()
