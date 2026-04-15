#!/usr/bin/env python3
"""
CI Script: Validate terminology against canonical glossary.

ID: F2
Purpose: Check all HTML parts against glossary for prohibited term variants.
Exit: 0 if all terms valid, 1 if prohibited variants found.
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

def find_prohibited_terms(content: str, glossary: Dict) -> List[Tuple[str, str, int]]:
    """Find prohibited term variants in content."""
    issues = []
    
    for term_def in glossary.get('canonical_terms', []):
        canonical = term_def['term']
        prohibited = term_def.get('prohibited', [])
        
        for prohibited_term in prohibited:
            # Case-insensitive search
            pattern = re.compile(re.escape(prohibited_term), re.IGNORECASE)
            
            for match in pattern.finditer(content):
                # Check if it's the first occurrence (allowed)
                # First occurrence should be: "Canonical Term (Abbreviation)"
                pos = match.start()
                context = content[max(0, pos-50):min(len(content), pos+50)]
                
                issues.append({
                    'prohibited': prohibited_term,
                    'canonical': canonical,
                    'position': pos,
                    'context': context.strip()
                })
    
    return issues

def validate_file(file_path: Path, glossary: Dict) -> List[Dict]:
    """Validate a single file against glossary."""
    content = file_path.read_text(encoding='utf-8')
    
    # Skip first occurrence check (first occurrence is allowed with full form)
    # We only check for prohibited variants that appear multiple times
    
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
                # Check if this is after the first canonical occurrence
                # (first occurrence with full form is allowed)
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
                    # No canonical form found, this might be the first occurrence
                    # Check if it's in the correct format "Canonical (Abbreviation)"
                    context_start = max(0, match.start() - 30)
                    context_end = min(len(content), match.end() + 30)
                    context = content[context_start:context_end]
                    
                    # If not in proper first-occurrence format, flag it
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
    default_parts_dir = str(repo_root / 'src' / 'parts')
    default_glossary = str(repo_root / 'src' / 'data' / 'glossary.json')
    
    parser = argparse.ArgumentParser(description='Validate terminology against glossary')
    parser.add_argument('--glossary', type=str, default=default_glossary, help='Glossary JSON file')
    parser.add_argument('--parts-dir', type=str, default=default_parts_dir, help='Directory containing HTML parts')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    parts_dir = Path(args.parts_dir)
    glossary_path = Path(args.glossary)
    
    if not parts_dir.exists():
        print(f"Error: Parts directory not found: {parts_dir}")
        sys.exit(1)
    
    print(f"Validating terminology...")
    print(f"  Parts: {parts_dir}")
    print(f"  Glossary: {glossary_path}")
    
    glossary = load_glossary(glossary_path)
    
    all_issues = []
    
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
