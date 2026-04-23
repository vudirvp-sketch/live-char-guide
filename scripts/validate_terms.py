#!/usr/bin/env python3
"""
CI Script: Validate terminology against canonical glossary.

ID: F2
Purpose: Check all HTML parts against glossary for prohibited term variants.
Exit: 0 if all terms valid, 1 if prohibited variants found.

Updated for v6: works with src/master/ and src/parts-l{1,2,3}/
"""

import os
import re
import sys
import json
from pathlib import Path
from typing import Dict, List, Tuple

def load_glossary(glossary_path: Path) -> Dict:
    """Load glossary from JSON file."""
    if not glossary_path.exists():
        # Return default glossary if file not found
        return {
            "canonical_terms": [
                {
                    "term": "Author's Notes",
                    "abbreviation": "AN",
                    "prohibited": ["Авторские заметки", "Авторка", "Авторка Заметки", "Author's Note"]
                },
                {
                    "term": "System Prompt",
                    "abbreviation": "SP",
                    "prohibited": ["Системный промпт", "Системка", "Системник", "System Prompts"]
                },
                {
                    "term": "Lorebook",
                    "abbreviation": "LB",
                    "prohibited": ["Лорбук", "World Info", "WI"]
                },
                {
                    "term": "Description",
                    "abbreviation": None,
                    "prohibited": ["Описание персонажа", "Character Description"]
                },
                {
                    "term": "Examples",
                    "abbreviation": None,
                    "prohibited": ["Примерные сообщения", "Примеры", "Dialogue Examples"]
                },
                {
                    "term": "Greeting",
                    "abbreviation": None,
                    "prohibited": ["Первое сообщение", "First Message", "Приветствие"]
                }
            ]
        }
    
    return json.loads(glossary_path.read_text(encoding='utf-8'))

def _strip_code_blocks(content: str) -> str:
    """Remove <pre><code>...</code></pre> blocks from content for validation."""
    return re.sub(r'<pre><code>.*?</code></pre>', '', content, flags=re.DOTALL)


def _overlaps_canonical(match, canonical_matches) -> bool:
    """Check if a prohibited match overlaps with any canonical match."""
    for cm in canonical_matches:
        # Overlap if match start is within canonical span or vice versa
        if match.start() >= cm.start() and match.start() < cm.end():
            return True
        if match.end() > cm.start() and match.end() <= cm.end():
            return True
    return False


def _is_whole_word(content: str, start: int, end: int) -> bool:
    """Check if the match at [start, end) is a whole word (not a substring of a longer word)."""
    import unicodedata
    def is_letter(ch):
        return unicodedata.category(ch).startswith('L')
    
    if start > 0 and is_letter(content[start - 1]):
        return False
    if end < len(content) and is_letter(content[end]):
        return False
    return True


def validate_file(file_path: Path, glossary: Dict) -> List[Dict]:
    """Validate a single file against glossary."""
    raw_content = file_path.read_text(encoding='utf-8')
    content = _strip_code_blocks(raw_content)
    
    issues = []
    
    for term_def in glossary.get('canonical_terms', []):
        canonical = term_def['term']
        abbreviation = term_def.get('abbreviation')
        prohibited = term_def.get('prohibited', [])
        
        # Find all occurrences of canonical term
        canonical_pattern = re.compile(re.escape(canonical), re.IGNORECASE)
        canonical_matches = list(canonical_pattern.finditer(content))
        
        for prohibited_term in prohibited:
            pattern = re.compile(re.escape(prohibited_term), re.IGNORECASE)
            matches = list(pattern.finditer(content))
            
            for match in matches:
                # Skip if this prohibited match is part of a canonical term (overlap)
                if _overlaps_canonical(match, canonical_matches):
                    continue
                
                # Skip if this is a substring of a longer word (not a whole-word match)
                if not _is_whole_word(content, match.start(), match.end()):
                    continue
                
                # Check if this is after the first canonical occurrence
                if canonical_matches:
                    first_canonical_pos = canonical_matches[0].start()
                    if match.start() > first_canonical_pos:
                        issues.append({
                            'file': file_path.name,
                            'prohibited': prohibited_term,
                            'canonical': canonical,
                            'position': match.start(),
                            'suggestion': f"Use '{abbreviation or canonical}' instead"
                        })
                else:
                    # No canonical form found
                    context_start = max(0, match.start() - 30)
                    context_end = min(len(content), match.end() + 30)
                    context = content[context_start:context_end]
                    
                    if abbreviation and f"{canonical} ({abbreviation})" not in context:
                        issues.append({
                            'file': file_path.name,
                            'prohibited': prohibited_term,
                            'canonical': canonical,
                            'position': match.start(),
                            'suggestion': f"First occurrence should be '{canonical} ({abbreviation})', then use '{abbreviation}'"
                        })
    
    return issues

def main():
    import argparse
    
    # Derive repo root from script location
    repo_root = Path(__file__).parent.parent
    default_glossary = str(repo_root / 'data' / 'glossary.json')
    
    # Default: check all layer directories
    default_parts_dirs = [
        repo_root / 'src' / 'master',
        repo_root / 'src' / 'parts-l1',
        repo_root / 'src' / 'parts-l2',
        repo_root / 'src' / 'parts-l3',
    ]
    
    parser = argparse.ArgumentParser(description='Validate terminology against glossary')
    parser.add_argument('--glossary', type=str, default=default_glossary, help='Glossary JSON file')
    parser.add_argument('--parts-dir', type=str, help='Single directory containing HTML parts (for backward compat)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    # Support both old single-dir and new multi-dir modes
    if args.parts_dir:
        parts_dirs = [Path(args.parts_dir)]
    else:
        parts_dirs = default_parts_dirs
    
    glossary_path = Path(args.glossary)
    
    # Verify at least one directory exists
    existing_dirs = [d for d in parts_dirs if d.exists()]
    if not existing_dirs:
        print(f"Error: No parts directories found")
        sys.exit(1)
    
    print(f"Validating terminology...")
    for d in existing_dirs:
        print(f"  Parts: {d}")
    print(f"  Glossary: {glossary_path}")
    
    glossary = load_glossary(glossary_path)
    
    all_issues = []
    
    for parts_dir in existing_dirs:
        for file_path in sorted(parts_dir.glob('*.html')):
            issues = validate_file(file_path, glossary)
            all_issues.extend(issues)
    
    if all_issues:
        print(f"\n❌ Found {len(all_issues)} terminology issue(s):\n")
        
        for issue in all_issues:
            print(f"File: {issue['file']}")
            print(f"  Prohibited: '{issue['prohibited']}'")
            print(f"  Canonical: '{issue['canonical']}'")
            print(f"  Suggestion: {issue['suggestion']}")
            print()
        
        print("ACTION REQUIRED: Replace prohibited variants with canonical forms.")
        print("Rule: First occurrence = 'Canonical Term (Abbreviation)', subsequent = 'Abbreviation'")
        
        sys.exit(1)
    else:
        print("✅ All terminology valid")
        sys.exit(0)

if __name__ == '__main__':
    main()
