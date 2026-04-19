#!/usr/bin/env python3
"""
CI Script: Check for duplicate content across HTML parts.

ID: F1
Purpose: Detect text blocks >100 chars appearing in multiple files.
Exit: 0 if no duplicates, 1 if duplicates found.

Updated for v6: works with src/master/ and src/parts-l{1,2,3}/
"""

import os
import re
import sys
from pathlib import Path
from difflib import SequenceMatcher

def normalize_text(text: str) -> str:
    """Normalize text for comparison."""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Normalize whitespace
    text = ' '.join(text.split())
    # Lowercase
    text = text.lower()
    return text

def extract_text_blocks(content: str, min_length: int = 100) -> list:
    """Extract text blocks longer than min_length."""
    # Split by paragraph-like structures
    blocks = re.split(r'\n\s*\n|\r\n\s*\r\n', content)
    
    result = []
    for block in blocks:
        normalized = normalize_text(block)
        if len(normalized) >= min_length:
            result.append({
                'original': block.strip(),
                'normalized': normalized,
                'length': len(normalized)
            })
    
    return result

def similarity_ratio(a: str, b: str) -> float:
    """Calculate similarity ratio between two strings."""
    return SequenceMatcher(None, a, b).ratio()

def find_duplicates(parts_dirs: list, min_length: int = 100, threshold: float = 0.9) -> list:
    """Find duplicate text blocks across files in multiple directories."""
    # Store all blocks with their source files
    all_blocks = []
    
    for parts_dir in parts_dirs:
        if not parts_dir.exists():
            continue
            
        files = list(parts_dir.glob('*.html'))
        
        for file_path in files:
            content = file_path.read_text(encoding='utf-8')
            blocks = extract_text_blocks(content, min_length)
            
            for block in blocks:
                block['file'] = f"{parts_dir.name}/{file_path.name}"
                all_blocks.append(block)
    
    # Find duplicates
    duplicates = []
    checked = set()
    
    for i, block1 in enumerate(all_blocks):
        for j, block2 in enumerate(all_blocks):
            if i >= j:
                continue
            
            pair_key = (block1['file'], block2['file'], block1['normalized'][:50], block2['normalized'][:50])
            if pair_key in checked:
                continue
            checked.add(pair_key)
            
            # Skip if same file
            if block1['file'] == block2['file']:
                continue
            
            # Check similarity
            sim = similarity_ratio(block1['normalized'], block2['normalized'])
            
            if sim >= threshold:
                duplicates.append({
                    'file1': block1['file'],
                    'file2': block2['file'],
                    'similarity': sim,
                    'text1_preview': block1['original'][:100] + '...',
                    'text2_preview': block2['original'][:100] + '...',
                    'length': block1['length']
                })
    
    return duplicates

def main():
    import argparse
    
    # Derive repo root from script location
    repo_root = Path(__file__).parent.parent
    
    # Default: check all layer directories
    default_parts_dirs = [
        repo_root / 'src' / 'master',
        repo_root / 'src' / 'parts-l1',
        repo_root / 'src' / 'parts-l2',
        repo_root / 'src' / 'parts-l3',
    ]
    
    parser = argparse.ArgumentParser(description='Check for duplicate content in HTML parts')
    parser.add_argument('--min-length', type=int, default=100, help='Minimum text length to check')
    parser.add_argument('--threshold', type=float, default=0.9, help='Similarity threshold (0-1)')
    parser.add_argument('--parts-dir', type=str, help='Single directory containing HTML parts (for backward compat)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    # Support both old single-dir and new multi-dir modes
    if args.parts_dir:
        parts_dirs = [Path(args.parts_dir)]
    else:
        parts_dirs = default_parts_dirs
    
    # Verify at least one directory exists
    existing_dirs = [d for d in parts_dirs if d.exists()]
    if not existing_dirs:
        print(f"Error: No parts directories found")
        sys.exit(1)
    
    print(f"Checking for duplicates...")
    for d in existing_dirs:
        print(f"  Directory: {d}")
    print(f"  Min length: {args.min_length} chars")
    print(f"  Threshold: {args.threshold}")
    
    duplicates = find_duplicates(existing_dirs, args.min_length, args.threshold)
    
    if duplicates:
        print(f"\n❌ Found {len(duplicates)} duplicate(s):\n")
        
        for dup in duplicates:
            print(f"Similarity: {dup['similarity']:.1%}")
            print(f"  File 1: {dup['file1']}")
            print(f"  File 2: {dup['file2']}")
            if args.verbose:
                print(f"  Text 1: {dup['text1_preview']}")
                print(f"  Text 2: {dup['text2_preview']}")
            print()
        
        print("ACTION REQUIRED: Extract duplicate content to a shared file")
        print("and replace with reference: <span class=\"core-ref\">→ See <a href=\"#shared-section\">Shared Section</a></span>")
        
        sys.exit(1)
    else:
        print("✅ No duplicates found")
        sys.exit(0)

if __name__ == '__main__':
    main()
