#!/usr/bin/env python3
"""
check_english.py - Search for 3+ English words outside allowed contexts

This script validates that guide content is in Russian, with English only
in allowed contexts (code blocks, specific terms, etc.).

IMP-41: Part of pre-commit validation suite.
"""

import re
import sys
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
]

# Pattern for 3+ consecutive English words
ENGLISH_WORD_PATTERN = re.compile(r'\b[A-Za-z][a-z]*(?:\s+[A-Za-z][a-z]*){2,}\b')

def is_in_allowed_context(content: str, match_start: int, match_end: int) -> bool:
    """Check if match is within an allowed context."""
    # Get surrounding context
    before = content[max(0, match_start - 200):match_start]
    after = content[match_end:min(len(content), match_end + 200)]
    surrounding = before + content[match_start:match_end] + after
    
    # Check for code blocks
    if '<code>' in before[-50:] or '</code>' in after[:50]:
        return True
    if '<pre>' in before[-200:] and '</pre>' in after[:200]:
        return True
    
    # Check for attributes
    if re.search(r'(id|class|style|data-\w+)=[\'"][^\'"]*$', before):
        return True
    
    # Check for URLs
    if 'href=' in before[-50:] or 'src=' in before[-50:]:
        return True
    
    return False

def is_keep_english_term(text: str) -> bool:
    """Check if text is a keep-English term."""
    text_lower = text.lower()
    for term in KEEP_ENGLISH_TERMS:
        if term.lower() in text_lower:
            return True
    return False

def check_file(filepath: Path) -> list[dict]:
    """Check a single HTML file for English leaks."""
    issues = []
    
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        return [{'file': str(filepath), 'error': f'Failed to read: {e}'}]
    
    # Remove comments first
    content_no_comments = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    # Find all matches
    for match in ENGLISH_WORD_PATTERN.finditer(content_no_comments):
        text = match.group()
        
        # Skip if it's a keep-English term
        if is_keep_english_term(text):
            continue
        
        # Skip if in allowed context
        if is_in_allowed_context(content_no_comments, match.start(), match.end()):
            continue
        
        # Find line number
        line_num = content_no_comments[:match.start()].count('\n') + 1
        
        issues.append({
            'file': str(filepath),
            'line': line_num,
            'text': text,
            'context': content_no_comments[max(0, match.start() - 30):match.end() + 30]
        })
    
    return issues

def main():
    """Main entry point."""
    # Find all HTML files in src/master/ or parts directories
    repo_root = Path(__file__).parent.parent
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
    
    all_issues = []
    for filepath in html_files:
        issues = check_file(filepath)
        all_issues.extend(issues)
    
    if all_issues:
        print(f'\n❌ Found {len(all_issues)} English leak(s):\n')
        for issue in all_issues:
            print(f"  {issue['file']}:{issue['line']}")
            print(f"    Text: \"{issue['text']}\"")
            print(f"    Context: ...{issue['context']}...")
            print()
        return 1
    
    print(f'✅ No English leaks found in {len(html_files)} file(s)')
    return 0

if __name__ == '__main__':
    sys.exit(main())
