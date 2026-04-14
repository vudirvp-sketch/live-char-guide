#!/usr/bin/env python3
"""
PHASE 1.4: Validate Downward Track Links
=========================================
Validates that no downward track references exist in the Live Character Guide.

A "downward link" is a link from a lower track (A) to a higher track (B/C)
section that would be invisible to users on the lower track.

Run as part of CI pipeline or pre-commit hook.

Usage:
    python scripts/validate_downward_links.py [--verbose]

Exit codes:
    0 - Validation passed (no downward links)
    1 - Validation failed (downward links detected)
"""

import re
import os
import argparse
from pathlib import Path
from typing import Dict, List, Tuple, Optional

# Track hierarchy: A < B < C
TRACK_HIERARCHY = {'A': 1, 'B': 2, 'C': 3}

def extract_track_requirement(element: str) -> int:
    """
    Extract the minimum track level required for an element.
    Returns the minimum track level (1=A, 2=B, 3=C).
    Defaults to 1 (Track A) if no requirement found.
    """
    match = re.search(r'data-requires-track="([^"]*)"', element)
    if match:
        tracks = match.group(1).split()
        return min(TRACK_HIERARCHY.get(t, 3) for t in tracks)
    return 1  # Default to Track A


def get_element_track_level(element: str) -> int:
    """Get track level for an element considering all tracks it's visible on."""
    match = re.search(r'data-requires-track="([^"]*)"', element)
    if match:
        tracks = match.group(1).split()
        # Return the minimum track level (most accessible)
        return min(TRACK_HIERARCHY.get(t, 1) for t in tracks)
    return 1


def validate_file(filepath: Path, verbose: bool = False) -> List[Tuple[str, str, int, int]]:
    """
    Validate a single HTML file for downward links.
    
    Returns a list of tuples: (link_text, href, source_track, target_track)
    """
    content = filepath.read_text(encoding='utf-8')
    errors = []
    
    # Find all internal anchor links
    # Pattern matches: <a href="#section-id">text</a>
    links = re.findall(r'<a[^>]*href="#([^"]+)"[^>]*>([^<]*)</a>', content)
    
    for href, text in links:
        # Find target section by ID
        # Match various ID patterns: id="...", id='...', id=...
        target_patterns = [
            rf'<[^>]*id=["\']?{re.escape(href)}["\']?[^>]*>',
            rf'<[^>]*id=["\']?{re.escape(href)}["\']?\s*[^>]*>',
        ]
        
        target_match = None
        for pattern in target_patterns:
            target_match = re.search(pattern, content, re.IGNORECASE)
            if target_match:
                break
        
        if target_match:
            target_element = target_match.group()
            target_track = extract_track_requirement(target_element)
            
            # Find the context (parent section) of the link
            # Look backwards from link position to find containing section
            link_pos = content.find(f'href="#{href}"')
            if link_pos == -1:
                link_pos = content.find(f"href='#{href}'")
            
            if link_pos != -1:
                # Get the content before the link
                content_before = content[:link_pos]
                
                # Find the nearest parent with data-requires-track
                parent_matches = list(re.finditer(r'data-requires-track="([^"]*)"', content_before))
                
                if parent_matches:
                    last_parent = parent_matches[-1]
                    parent_tracks = last_parent.group(1).split()
                    source_track = min(TRACK_HIERARCHY.get(t, 1) for t in parent_tracks)
                else:
                    source_track = 1  # Default to Track A
                
                # Check for downward link
                if target_track > source_track:
                    errors.append((
                        text.strip() or f"#{href}",
                        href,
                        source_track,
                        target_track
                    ))
                    if verbose:
                        print(f"  [DEBUG] Link '{text}' in Track {source_track} -> #{href} in Track {target_track}")
    
    return errors


def validate_downward_links(base_path: Path, verbose: bool = False) -> Tuple[bool, List[str]]:
    """
    Validate all HTML files in the project for downward links.
    
    Returns:
        (success, error_messages)
    """
    # Find all HTML files
    html_files = list(base_path.glob('**/*.html'))
    
    # Filter out node_modules and other non-source directories
    html_files = [f for f in html_files if 'node_modules' not in str(f)]
    
    all_errors = []
    
    for html_file in html_files:
        if verbose:
            print(f"\nChecking: {html_file.relative_to(base_path)}")
        
        errors = validate_file(html_file, verbose)
        
        for link_text, href, source_track, target_track in errors:
            track_names = {1: 'A', 2: 'B', 3: 'C'}
            error_msg = (
                f"{html_file.relative_to(base_path)}: "
                f"Downward link '{link_text}' -> #{href} "
                f"(Track {track_names[source_track]} -> Track {track_names[target_track]})"
            )
            all_errors.append(error_msg)
    
    return len(all_errors) == 0, all_errors


def main():
    parser = argparse.ArgumentParser(
        description='Validate downward track links in Live Character Guide'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Print detailed debug information'
    )
    parser.add_argument(
        '--path', '-p',
        type=str,
        default='.',
        help='Base path to search for HTML files (default: current directory)'
    )
    
    args = parser.parse_args()
    base_path = Path(args.path)
    
    print("=" * 60)
    print("PHASE 1.4: Downward Link Validation")
    print("=" * 60)
    
    success, errors = validate_downward_links(base_path, args.verbose)
    
    if success:
        print("\n[SUCCESS] VALIDATION PASSED - No downward links detected")
        print("=" * 60)
        exit(0)
    else:
        print("\n[FAILED] VALIDATION FAILED - Downward links detected:")
        print("-" * 60)
        for error in errors:
            print(f"  - {error}")
        print("=" * 60)
        print("\nFix: Replace downward links with inline summaries or track badges.")
        print("Example: 'For advanced features: <span class=\"badge-track-b\">Track B+</span>'")
        exit(1)


if __name__ == '__main__':
    main()
