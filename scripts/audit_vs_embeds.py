#!/usr/bin/env python3
"""
Audit VS-EMBED elements in master HTML files for scroll-animation regressions.

Logic:
1. Parse `src/assets/vs-styles.css` to find all CSS classes that have an
   `is-visible`-dependent rule (initial state opacity:0 / transform:scale(0)).
2. Read `src/shell/widgets/vs-scroll-observer.js` to get the actual
   `SCROLL_ENTER_SELECTOR` — the set of classes the IntersectionObserver
   watches.
3. For each VS-EMBED element in `src/master/*.html`:
   - If an element has an animation class:
     - OK if the class is in the JS selector (observed by vs-scroll-observer)
     - OK if the element ALSO has `scroll-enter` class (observed by both)
     - FAIL if neither — the element will stay invisible.

Kills:
- KI#20 (iter 32): vs-scroll-observer.js selector was missing 8 animation
  classes (.ring-anim, .ring-text-anim, .bar-rect, .anim-group, .center-pulse,
  .pentagon-anim, .profile-anim, .callout). Fixed by extending selector.

Run:
    python3 scripts/audit_vs_embeds.py
"""
import re
import sys
from pathlib import Path
from html.parser import HTMLParser

REPO = Path(__file__).resolve().parents[1]
MASTER_DIR = REPO / "src" / "master"
VS_STYLES = REPO / "src" / "assets" / "vs-styles.css"
SCROLL_OBSERVER = REPO / "src" / "shell" / "widgets" / "vs-scroll-observer.js"


def parse_animation_classes_from_css(css_path: Path):
    """Find all CSS classes that have a `.CLASS.is-visible` rule."""
    css = css_path.read_text(encoding="utf-8")
    # Find all `.classname.is-visible` patterns.
    # Skip pseudo-elements like `:hover::after`.
    pattern = re.compile(r'\.([a-zA-Z][\w-]+)\.is-visible\b')
    classes = set()
    for m in pattern.finditer(css):
        classes.add(m.group(1))
    # `scroll-enter` itself is also an animation class (has .scroll-enter.is-visible rule)
    classes.add("scroll-enter")
    return classes


def parse_observed_classes_from_js(js_path: Path):
    """Read vs-scroll-observer.js and extract classes from SCROLL_ENTER_SELECTOR."""
    js = js_path.read_text(encoding="utf-8")
    # Find: var SCROLL_ENTER_SELECTOR = '...' + '...' + ... ;
    m = re.search(r'var\s+SCROLL_ENTER_SELECTOR\s*=\s*([^;]+);', js)
    if not m:
        return set()
    expr = m.group(1)
    # Extract class names from all string literals in the expression.
    classes = set()
    for str_match in re.finditer(r"'([^']+)'|\"([^\"]+)\"", expr):
        s = str_match.group(1) or str_match.group(2)
        # Split on commas, trim, drop leading dot
        for part in s.split(','):
            part = part.strip()
            if part.startswith('.'):
                # Skip pseudo-class selectors like :hover, keep just class name
                cls = part[1:].split(':')[0].split(' ')[0]
                if cls and re.match(r'^[a-zA-Z][\w-]*$', cls):
                    classes.add(cls)
    return classes


# A minimal HTML parser that records tag, classes, line number
class ClassCollector(HTMLParser):
    def __init__(self, base_line=1):
        super().__init__(convert_charrefs=True)
        self.base_line = base_line
        self.elements = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        cls = attr_dict.get("class", "")
        line, _col = self.getpos()
        abs_line = self.base_line + line - 1
        self.elements.append((tag, cls, abs_line, attr_dict))


def find_vs_embeds(html: str):
    """Yield (element_id, embed_html, start_line, end_line) for each <div class="vs-embed" ...>... block."""
    pattern = re.compile(r'<div\s+class="vs-embed"\s+data-vs-element="([^"]+)">', re.MULTILINE)
    for m in pattern.finditer(html):
        eid = m.group(1)
        start = m.start()
        depth = 0
        i = start
        while i < len(html):
            m_open = html.find("<div", i)
            m_close = html.find("</div", i)
            if m_close == -1:
                break
            if m_open != -1 and m_open < m_close:
                depth += 1
                i = m_open + 4
            else:
                depth -= 1
                i = m_close + 6
                if depth == 0:
                    embed_html = html[start:i]
                    line_start = html.count("\n", 0, start) + 1
                    line_end = html.count("\n", 0, i) + 1
                    yield (eid, embed_html, line_start, line_end)
                    break


def audit_file(path: Path, animation_classes, observed_classes):
    html = path.read_text(encoding="utf-8")
    results = []
    for eid, embed_html, ls, le in find_vs_embeds(html):
        parser = ClassCollector(base_line=ls)
        try:
            parser.feed(embed_html)
        except Exception:
            continue

        for tag, cls, line, attrs in parser.elements:
            classes = cls.split()
            # Find animation classes on this element
            anim_on_elem = [c for c in classes if c in animation_classes]
            if not anim_on_elem:
                continue
            has_scroll_enter = "scroll-enter" in classes
            # Element is OK if:
            #   - it has scroll-enter (observed by both lazy-loader AND vs-scroll-observer), OR
            #   - any of its animation classes is in the JS observed set
            observed_on_elem = any(c in observed_classes for c in anim_on_elem)
            if has_scroll_enter or observed_on_elem:
                continue
            # Flag: this element has an animation class that is NOT observed
            results.append({
                "element_id": eid,
                "file": path.name,
                "line": line,
                "tag": tag,
                "classes": cls,
                "anim_classes": anim_on_elem,
            })
    return results


def main():
    if not VS_STYLES.exists() or not SCROLL_OBSERVER.exists():
        print(f"ERROR: required files not found:\n  {VS_STYLES}\n  {SCROLL_OBSERVER}", file=sys.stderr)
        return 2

    animation_classes = parse_animation_classes_from_css(VS_STYLES)
    observed_classes = parse_observed_classes_from_js(SCROLL_OBSERVER)

    # Interactive-only classes — opacity:0 by design, shown on user interaction
    # (hover/focus) by element-specific widgets, NOT by scroll observer.
    # Listed here so the audit does not flag them as regressions.
    interactive_only_classes = {
        "mini-card",  # E10: shown on .type-node hover/focus by vs-e10-enneagram.js
    }

    print(f"CSS animation classes (have .is-visible rule): {len(animation_classes)}")
    print(f"JS observed classes (in SCROLL_ENTER_SELECTOR): {len(observed_classes)}")
    print(f"Interactive-only classes (shown on hover/focus, not scroll): {len(interactive_only_classes)}")

    unobserved_anim_classes = (
        animation_classes - observed_classes - interactive_only_classes - {"scroll-enter"}
    )
    if unobserved_anim_classes:
        print(f"\n⚠ Animation classes NOT in JS observer (must rely on `scroll-enter` on each element):")
        for c in sorted(unobserved_anim_classes):
            print(f"    .{c}")

    # Treat interactive-only classes as "observed" so they don't get flagged.
    effective_observed = observed_classes | interactive_only_classes

    all_results = []
    for path in sorted(MASTER_DIR.glob("*.html")):
        all_results.extend(audit_file(path, animation_classes, effective_observed))

    print()
    if not all_results:
        print("✓ No regressions: all animation-classed elements are observed either by")
        print("  vs-scroll-observer.js selector OR by having `scroll-enter` class on the element.")
        return 0

    by_eid = {}
    for r in all_results:
        by_eid.setdefault(r["element_id"], []).append(r)
    print(f"❌ Found {len(all_results)} regressed animation elements across {len(by_eid)} VS-embeds:\n")
    for eid in sorted(by_eid.keys(), key=lambda x: int(x[1:]) if x[1:].isdigit() else 999):
        rs = by_eid[eid]
        print(f"=== E{eid} ({len(rs)} elements) ===")
        by_anim = {}
        for r in rs:
            for ac in r["anim_classes"]:
                by_anim.setdefault(ac, []).append(r)
        for ac, items in by_anim.items():
            print(f"  anim-class: .{ac}  ({len(items)} occurrences)")
            for i in items[:5]:
                print(f"    - {i['file']}:{i['line']}  <{i['tag']} class=\"{i['classes']}\">")
            if len(items) > 5:
                print(f"    ... and {len(items)-5} more")
        print()
    return 1


if __name__ == "__main__":
    sys.exit(main())
