#!/usr/bin/env python3
"""
check_english.py - Search for 3+ English words outside allowed contexts

This script validates that guide content is in Russian, with English only
in allowed contexts (code blocks, specific terms, etc.).

IMP-41: Part of pre-commit validation suite.

RP-12: Fixed code block detection using state-machine approach instead of
       windowed lookbehind. Long SP blocks (2000+ chars) now correctly
       recognized as code blocks.

RP-14: Added --scan-docs mode for WH40k term checking in docs/ directory.
"""

import re
import sys
import argparse
from pathlib import Path

# Allowed English contexts
ALLOWED_CONTEXTS = [
    'code',           # <code> blocks
    'pre',            # <pre> blocks
    'kbd',            # <kbd> elements
    'data-en',        # data attributes
    'data-term',      # terminology data
    'data-trait',     # OCEAN traits
    'data-type',      # Enneagram types
    'data-layer',     # Layer attributes
    'href',           # URLs in href
    'src',            # URLs in src
    'alt',            # Alt text
    'title',          # Title attributes
    'id=',            # ID attributes
    'class=',         # Class names
    'style=',         # Style attributes
    '<!',             # Comments
    '<?',             # Processing instructions
]

# Terms that are allowed in English (keep-English from terminology_dictionary)
KEEP_ENGLISH_TERMS = [
    'SPINE', 'GHOST', 'WANT', 'NEED', 'FLAW', 'LIE',
    'OCEAN', 'MBTI', 'CoT', 'OOC',
    "Author's Note", 'AN', 'LB', 'Lorebook',
    'Format Lock', '4K-Fallback',
    'Top P', 'Min P', 'Top K',
    '{{user}}', '{{char}}',
    'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP',
    'Tier 1', 'Tier 2', 'Tier 3',
    # CORE DIRECTIVES (English in SP by design)
    'CORE DIRECTIVES', 'SHOW NEVER TELL', 'EMBODIMENT FIRST',
    'SPATIAL LOCK', 'ENVIRONMENTAL REACTIVITY', 'INFLUENCE BOUNDARY',
    'CONSEQUENCE DRIVEN', 'PRE-GENERATION FILTER',
    'Immersion Boundary', 'Tone Frame',
    'Repetition Penalty', 'Presence Penalty', 'RepPen',
    # Additional allowed English terms
    'Description', 'Greeting', 'Examples', 'Character Card',
    'Voice Isolation', 'Embodiment', 'Nested Anchors',
    'Structured Inject', 'Chain of Thought',
    'System Prompt', 'Big Five', 'Myers-Briggs',
    'Lorebook Entry',
    # SP directive examples (English by design in SP)
    'Never speak or act for',
    'respond only to observable actions',
    'never speak for',
    'Only describe',
    # SP template phrases (English by design)
    'You are',
    'a cynical journalist',
    # Movie/book titles referenced as examples
    'The Dark Knight',
]

# WH40k terms that should be in Russian in docs/ (RP-14)
WH40K_ENGLISH_TERMS = {
    "Adeptus Mechanicus": "Адептус Механикус",
    "Omnissiah": "Омниссия",
    "Forge World": "Кузница-Мир",
    "Mechanicum": "Механикум",
    "Tech-Priest": "Тех-Жрец",
    "Binary Cant": "Бинарный кант",
    "Noosphere": "Ноосфера",
    "Electro-priest": "Электро-жрец",
    "Skitarii": "Скитарии",
    "Servitor": "Сервитор",
    "Enginseer": "Инженер-жрец",
    "Machine Spirit": "Машинный Дух",
    "Land Raider": "Лэнд Рейдер",
    "Xenotech": "Ксенотех",
    "Augmentation": "Аугментация",
}

# Pattern for 3+ consecutive English words
ENGLISH_WORD_PATTERN = re.compile(r'\b[A-Za-z][a-z]*(?:\s+[A-Za-z][a-z]*){2,}\b')


def build_code_intervals(content: str) -> list:
    """Build list of (start, end) intervals for <pre>...</pre> and <code>...</code> blocks.
    
    RP-12: Uses state-machine approach instead of windowed lookbehind.
    Correctly handles SP blocks of any length (2000+ chars).
    Also includes <td> cells (example/SP template table content).
    """
    intervals = []
    
    # Find all <pre>...</pre> blocks
    for match in re.finditer(r'<pre[^>]*>[\s\S]*?</pre>', content, re.IGNORECASE):
        intervals.append((match.start(), match.end()))
    
    # Find standalone <code>...</code> blocks (not inside <pre>)
    for match in re.finditer(r'<code[^>]*>[\s\S]*?</code>', content, re.IGNORECASE):
        # Check if this code block is already inside a pre interval
        inside_pre = any(pre_start <= match.start() <= pre_end for pre_start, pre_end in intervals)
        if not inside_pre:
            intervals.append((match.start(), match.end()))
    
    # RP-12: Also treat <td> cells as allowed context — they contain example content
    # (SP directives, Tone Frame examples, character catchphrases) that is English by design
    for match in re.finditer(r'<td[^>]*>[\s\S]*?</td>', content, re.IGNORECASE):
        intervals.append((match.start(), match.end()))
    
    return intervals


def is_in_code_block(match_start: int, match_end: int, code_intervals: list) -> bool:
    """Check if a match position falls within a code block interval.
    
    RP-12: Replaces the old windowed lookbehind approach.
    """
    for start, end in code_intervals:
        if start <= match_start and match_end <= end:
            return True
    return False


def is_in_allowed_context(content: str, match_start: int, match_end: int, code_intervals: list) -> bool:
    """Check if match is within an allowed context.
    
    RP-12: Now uses code_intervals for accurate code block detection,
    plus attribute/URL checks.
    """
    # Check code blocks using pre-built intervals (RP-12)
    if is_in_code_block(match_start, match_end, code_intervals):
        return True
    
    # Get surrounding context for attribute/URL checks
    before = content[max(0, match_start - 200):match_start]
    after = content[match_end:min(len(content), match_end + 200)]
    
    # Check for attributes
    if re.search(r'(id|class|style|data-\w+)=[\'"][^\'"]*$', before):
        return True
    
    # Check for URLs
    if 'href=' in before[-50:] or 'src=' in before[-50:]:
        return True
    
    # Check for HTML tag attributes context
    if re.search(r'<[a-zA-Z][^>]*$', before):
        return True
    
    return False


def is_keep_english_term(text: str) -> bool:
    """Check if text is a keep-English term."""
    text_lower = text.lower()
    for term in KEEP_ENGLISH_TERMS:
        if term.lower() in text_lower:
            return True
    return False


def check_file(filepath: Path, verbose: bool = False) -> list:
    """Check a single HTML file for English leaks.
    
    RP-12: Uses build_code_intervals() for accurate code block detection.
    """
    issues = []
    
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        return [{'file': str(filepath), 'error': f'Failed to read: {e}'}]
    
    # Remove comments first
    content_no_comments = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    # Build code block intervals (RP-12)
    code_intervals = build_code_intervals(content_no_comments)
    
    if verbose:
        print(f"  {filepath.name}: found {len(code_intervals)} code block(s)")
    
    # Find all matches
    for match in ENGLISH_WORD_PATTERN.finditer(content_no_comments):
        text = match.group()
        
        # Skip if it's a keep-English term
        if is_keep_english_term(text):
            continue
        
        # Skip if in allowed context (now using code_intervals)
        if is_in_allowed_context(content_no_comments, match.start(), match.end(), code_intervals):
            continue
        
        # Find line number
        line_num = content_no_comments[:match.start()].count('\n') + 1
        
        # Get context for verbose output
        context_before = content_no_comments[max(0, match.start() - 30):match.start()]
        context_after = content_no_comments[match.end():min(len(content_no_comments), match.end() + 30)]
        
        issues.append({
            'file': str(filepath),
            'line': line_num,
            'text': text,
            'context': f'{context_before}{text}{context_after}'
        })
    
    return issues


def check_docs_wh40k(repo_root: Path, verbose: bool = False) -> list:
    """Check docs/ directory for WH40k terms in English (RP-14).
    
    In --scan-docs mode, checks ONLY for WH40k English terms,
    not full English check — docs contain technical English by design.
    Bilingual parentheticals (e.g., "Адептус Механикус (Adeptus Mechanicus)") are allowed.
    """
    issues = []
    docs_dir = repo_root / 'docs'
    
    if not docs_dir.exists():
        print(f"Docs directory not found: {docs_dir}")
        return issues
    
    md_files = list(docs_dir.glob('**/*.md'))
    
    if verbose:
        print(f"Scanning {len(md_files)} docs file(s) for WH40k English terms...")
    
    for filepath in md_files:
        try:
            content = filepath.read_text(encoding='utf-8')
        except Exception as e:
            issues.append({'file': str(filepath), 'error': f'Failed to read: {e}'})
            continue
        
        # Remove code blocks (``` ... ```)
        content_no_code = re.sub(r'```[\s\S]*?```', '', content)
        # Remove inline code
        content_no_code = re.sub(r'`[^`]+`', '', content_no_code)
        
        for en_term, ru_term in WH40K_ENGLISH_TERMS.items():
            # Find all occurrences of the English term
            for match in re.finditer(re.escape(en_term), content_no_code, re.IGNORECASE):
                # Check if Russian equivalent precedes the English term within 50 chars
                # (bilingual pattern: "Русский (English)")
                # Use stem matching: check if the base of the Russian term appears
                context_before = content_no_code[max(0, match.start() - 50):match.start()]
                
                # Allow if the Russian term (or its stem) appears just before the English
                ru_stem = ru_term[:-2].lower() if len(ru_term) > 3 else ru_term.lower()
                if ru_term.lower() in context_before.lower() or ru_stem in context_before.lower():
                    continue
                
                # Allow if it's inside parentheses right after the Russian term
                # Pattern: "Русский (English)" or inflected "Русского (English)"
                full_context = content_no_code[max(0, match.start() - len(ru_term) - 10):match.end() + 5]
                if f'({en_term})' in full_context and ru_stem in full_context.lower():
                    continue
                if f'{ru_term} ({en_term})' in full_context or f'{ru_term}({en_term})' in full_context:
                    continue
                
                line_num = content_no_code[:match.start()].count('\n') + 1
                
                issues.append({
                    'file': str(filepath),
                    'line': line_num,
                    'text': en_term,
                    'context': f'WH40k: Use "{ru_term}" or "{ru_term} ({en_term})" instead of standalone "{en_term}"'
                })
    
    return issues


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description='Check for English leaks in HTML/MD files')
    parser.add_argument('--scan-docs', action='store_true',
                        help='Scan docs/ for WH40k English terms instead of HTML check')
    parser.add_argument('--verbose', '-v', action='store_true',
                        help='Verbose output with context for each match')
    args = parser.parse_args()
    
    repo_root = Path(__file__).parent.parent
    
    # RP-14: --scan-docs mode
    if args.scan_docs:
        print('Scanning docs/ for WH40k English terms...\n')
        issues = check_docs_wh40k(repo_root, verbose=args.verbose)
        
        if issues:
            print(f'\n❌ Found {len(issues)} WH40k English term(s) in docs/:\n')
            for issue in issues:
                if 'error' in issue:
                    print(f"  {issue['file']}: {issue['error']}")
                else:
                    print(f"  {issue['file']}:{issue['line']}")
                    print(f"    {issue['context']}")
                    print()
            return 1
        
        print('✅ No standalone WH40k English terms found in docs/')
        return 0
    
    # Default mode: check HTML files
    html_files = []
    
    # Check src/master/ (v6)
    master_dir = repo_root / 'src' / 'master'
    if master_dir.exists():
        html_files.extend(master_dir.glob('**/*.html'))
    
    # Check parts directories (v5.12, for migration)
    for parts_dir in ['src/parts-l1', 'src/parts-l2', 'src/parts-l3']:
        parts_path = repo_root / parts_dir
        if parts_path.exists():
            html_files.extend(parts_path.glob('**/*.html'))
    
    if not html_files:
        print('No HTML files found to check')
        return 0
    
    if args.verbose:
        print(f'Checking {len(html_files)} HTML file(s) for English leaks...\n')
    
    all_issues = []
    for filepath in html_files:
        issues = check_file(filepath, verbose=args.verbose)
        all_issues.extend(issues)
    
    if all_issues:
        print(f'\n❌ Found {len(all_issues)} English leak(s):\n')
        for issue in all_issues:
            if 'error' in issue:
                print(f"  {issue['file']}: {issue['error']}")
            else:
                print(f"  {issue['file']}:{issue['line']}")
                print(f"    Text: \"{issue['text']}\"")
                if args.verbose:
                    print(f"    Context: ...{issue['context']}...")
                print()
        return 1
    
    print(f'✅ No English leaks found in {len(html_files)} file(s)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
