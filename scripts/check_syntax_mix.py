#!/usr/bin/env python3
"""
check_syntax_mix.py — Detect Markdown patterns in HTML files (IMP-41)

Purpose:
  Live Character Guide uses HTML for content. Markdown syntax mixed into HTML
  causes rendering issues and violates the content model.

  This script scans HTML files for common Markdown patterns that should NOT
  appear in HTML content.

Usage:
  python scripts/check_syntax_mix.py [paths...]
  python scripts/check_syntax_mix.py src/master/
  python scripts/check_syntax_mix.py --verbose

Exit codes:
  0 — No Markdown patterns found
  1 — Markdown patterns detected (validation failure)
"""

import argparse
import re
import sys
from pathlib import Path
from typing import List, Tuple

# Patterns that indicate Markdown syntax in HTML
MARKDOWN_PATTERNS = [
    # Headers: # Header, ## Header, etc.
    (r'^\s{0,3}#{1,6}\s+\S', 'Markdown header (# Header)'),

    # Bold: **text** or __text__
    (r'\*\*[^*\s][^*]*[^*\s]\*\*', 'Markdown bold (**text**)'),
    (r'__[^_\s][^_]*[^_\s]__', 'Markdown bold (__text__)'),

    # Italic: *text* or _text_ (but not standalone underscores in IDs)
    (r'(?<![a-zA-Z0-9])\*[^*\s][^*]*[^*\s]\*(?![a-zA-Z0-9])', 'Markdown italic (*text*)'),

    # Links: [text](url)
    (r'\[[^\]]+\]\([^)]+\)', 'Markdown link ([text](url))'),

    # Images: ![alt](url)
    (r'!\[[^\]]*\]\([^)]+\)', 'Markdown image (![alt](url))'),

    # Code blocks: ``` or ~~~
    (r'^```\w*$', 'Markdown code fence (```)'),
    (r'^~~~$', 'Markdown code fence (~~~)'),

    # Inline code: `code` (but HTML may have legitimate backticks in examples)
    # This is context-dependent, so we check for patterns like `code` not inside <code>
    # Disabled by default as it produces many false positives
    # (r'`[^`]+`', 'Markdown inline code (`code`)'),

    # Lists: - item or * item at line start
    (r'^\s*[-*]\s+\S', 'Markdown list item (- item or * item)'),

    # Numbered lists: 1. item
    (r'^\s*\d+\.\s+\S', 'Markdown numbered list (1. item)'),

    # Blockquotes: > quote
    (r'^\s*>\s+\S', 'Markdown blockquote (> quote)'),

    # Horizontal rules: --- or ***
    (r'^\s*[-]{3,}\s*$', 'Markdown horizontal rule (---)'),
    (r'^\s*[*]{3,}\s*$', 'Markdown horizontal rule (***)'),

    # Strikethrough: ~~text~~
    (r'~~[^~]+~~', 'Markdown strikethrough (~~text~~)'),

    # Task lists: - [ ] or - [x]
    (r'^\s*[-*]\s+\[[ xX]\]', 'Markdown task list (- [ ] or - [x])'),

    # Tables: | header | row |
    (r'^\s*\|[^|]+\|[^|]+\|\s*$', 'Markdown table row (| col | col |)'),
]

# Contexts where Markdown-like patterns are allowed
ALLOWED_CONTEXTS = [
    # Inside <code> or <pre> blocks (examples showing Markdown syntax)
    r'<code[^>]*>.*?</code>',
    r'<pre[^>]*>.*?</pre>',
    # Inside <!-- comments -->
    r'<!--.*?-->',
    # Data attributes with markdown content
    r'data-[^=]*="[^"]*"',
]

# Files/directories to skip
SKIP_PATTERNS = [
    r'/node_modules/',
    r'/dist/',
    r'/build/',
    r'/\.git/',
    r'\.min\.',
]


def is_in_allowed_context(content: str, match_pos: int, match_end: int) -> bool:
    """Check if the match is inside an allowed context."""
    for pattern in ALLOWED_CONTEXTS:
        for m in re.finditer(pattern, content, re.DOTALL | re.IGNORECASE):
            if m.start() <= match_pos and match_end <= m.end():
                return True
    return False


def check_file(filepath: Path, verbose: bool = False) -> List[Tuple[int, str, str]]:
    """Check a single HTML file for Markdown patterns.

    Returns list of (line_number, pattern_name, matched_text) tuples.
    """
    violations = []

    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        if verbose:
            print(f"  ⚠️  Could not read {filepath}: {e}")
        return violations

    lines = content.split('\n')

    # Track position in content for context checking
    pos = 0
    line_positions = [0]
    for line in lines:
        pos += len(line) + 1  # +1 for newline
        line_positions.append(pos)

    for pattern, description in MARKDOWN_PATTERNS:
        for m in re.finditer(pattern, content, re.MULTILINE):
            # Check if in allowed context
            if is_in_allowed_context(content, m.start(), m.end()):
                continue

            # Find line number
            line_num = 1
            for i, lp in enumerate(line_positions):
                if lp > m.start():
                    line_num = i
                    break

            matched_text = m.group(0)
            if len(matched_text) > 50:
                matched_text = matched_text[:47] + '...'

            violations.append((line_num, description, matched_text))

    return violations


def should_skip(path: Path) -> bool:
    """Check if path should be skipped."""
    path_str = str(path)
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, path_str):
            return True
    return False


def main():
    parser = argparse.ArgumentParser(
        description='Check for Markdown syntax in HTML files (IMP-41)'
    )
    parser.add_argument(
        'paths',
        nargs='*',
        default=['src/master/', 'src/parts-l1/', 'src/parts-l2/', 'src/parts-l3/'],
        help='Paths to check (default: src/master/ and src/parts-l{1,2,3}/)'
    )
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='Show detailed output'
    )
    parser.add_argument(
        '--strict',
        action='store_true',
        help='Treat warnings as errors'
    )

    args = parser.parse_args()

    # Collect all HTML files
    html_files = []
    for path_str in args.paths:
        path = Path(path_str)
        if path.is_file() and path.suffix == '.html':
            html_files.append(path)
        elif path.is_dir():
            html_files.extend(path.rglob('*.html'))

    # Filter out skipped paths
    html_files = [f for f in html_files if not should_skip(f)]

    if not html_files:
        print("No HTML files found to check.")
        return 0

    print(f"=== IMP-41: Syntax Mix Check ===")
    print(f"Checking {len(html_files)} HTML files for Markdown patterns...\n")

    total_violations = 0
    files_with_violations = 0

    for filepath in html_files:
        violations = check_file(filepath, args.verbose)

        if violations:
            files_with_violations += 1
            total_violations += len(violations)

            rel_path = filepath
            try:
                rel_path = filepath.relative_to(Path.cwd())
            except ValueError:
                pass

            print(f"❌ {rel_path}")
            for line_num, description, matched in violations:
                print(f"   Line {line_num}: {description}")
                if args.verbose:
                    print(f"            Found: {matched}")
            print()

    # Summary
    print("=" * 50)
    if total_violations == 0:
        print("✓ No Markdown patterns found in HTML files.")
        return 0
    else:
        print(f"❌ Found {total_violations} Markdown pattern(s) in {files_with_violations} file(s).")
        print("\nHTML files should not contain Markdown syntax.")
        print("Use proper HTML elements instead:")
        print("  - Headers: <h1>, <h2>, etc.")
        print("  - Bold: <strong> or <b>")
        print("  - Italic: <em> or <i>")
        print("  - Links: <a href='...'>")
        print("  - Lists: <ul><li> or <ol><li>")
        print("  - Code: <code> or <pre>")
        return 1


if __name__ == '__main__':
    sys.exit(main())
