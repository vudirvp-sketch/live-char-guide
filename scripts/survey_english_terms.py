#!/usr/bin/env python3
"""
survey_english_terms.py — Comprehensive survey of English terms in master HTML.

Unlike check_english.py (which only catches 3+ consecutive English words),
this script catches ALL Latin-script tokens that leak into Russian prose,
including single English words and 2-word phrases.

Output: JSON with categorization hints, plus a human-readable summary.
"""

import re
import json
import sys
from pathlib import Path
from collections import defaultdict, Counter

# Reuse KEEP_ENGLISH_TERMS from check_english.py (same directory)
sys.path.insert(0, str(Path(__file__).parent))
from check_english import KEEP_ENGLISH_TERMS, build_code_intervals, is_in_allowed_context

# Allowed single-word English terms (domain-specific, intentional)
ALLOWED_SINGLE_WORDS = {
    # SPINE framework
    'SPINE', 'GHOST', 'LIE', 'FLAW', 'NEED', 'WANT',
    # Psychology frameworks
    'OCEAN', 'MBTI', 'CoT', 'OOC',
    # Card fields (SillyTavern API)
    'Description', 'Greeting', 'Examples', 'Personality', 'Scenario', 'Settings',
    'System', 'Prompt', 'Character', 'Card',
    # Lorebook
    'Lorebook', 'Entry', 'Entries', 'Keys', 'Comment',
    # Author's Note
    "Author's", 'Note', 'AN', 'LB',
    # Sampler params
    'Top', 'Min', 'RepPen', 'Temperature', 'TopK', 'TopA',
    # CORE DIRECTIVES
    'SHOW', 'NEVER', 'TELL', 'EMBODIMENT', 'FIRST', 'SPATIAL',
    'ANATOMICAL', 'LOCK', 'ENVIRONMENTAL', 'REACTIVITY', 'INFLUENCE',
    'BOUNDARY', 'CONSEQUENCE', 'DRIVEN', 'FORMAT',
    # VS / E-elements
    'VS', 'EMBED', 'E01', 'E02', 'E03', 'E04', 'E05', 'E06', 'E07',
    'E08', 'E09', 'E10', 'E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17', 'E18',
    # Common RP terms (kept English by convention)
    'RP', 'NPC', 'PC', 'AI', 'LLM', 'API', 'CDN', 'CSP', 'HTML', 'CSS',
    'JS', 'DOM', 'UI', 'UX', 'WCAG', 'URL', 'URI', 'ID', 'IDs',
    'JSON', 'XML', 'YAML', 'SVG', 'PNG', 'JPG', 'GIF', 'WOFF', 'WOFF2',
    'TTFT', 'TLDR', 'TL;DR', 'WIP', 'TODO', 'FIXME', 'PR', 'CI', 'CD',
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
    # Tone Frame SP
    'Tone', 'Frame',
    # 4K-Fallback, Format Lock etc.
    'Format', '4K', 'Fallback', 'K-Fallback',
    # Tier
    'Tier',
    # {{user}} {{char}}
    'user', 'char',
    # Whitelist of single-letter or short tokens that are intentional
    'OOC',
    # Model names (kept as-is)
    'GPT', 'GPT-3', 'GPT-4', 'Claude', 'Opus', 'Sonnet', 'Haiku',
    'Llama', 'Mistral', 'Mixtral', 'Qwen', 'Yi', 'GLM',
    # Software / services
    'GitHub', 'Pages', 'Mermaid', 'Mermaid.js',
    # Numeric prefixes
    '12B', '32B', '8B', '70B',
    # Common short Latin words used as IDs/anchors
    'vs', 'etc',
}

# Common English words that leak into Russian prose (frequency-based translation candidates)
TRANSLATABLE_LEAKS = {
    # General prose words
    'the', 'a', 'an', 'and', 'or', 'but', 'if', 'then', 'else', 'when', 'while',
    'for', 'to', 'of', 'in', 'on', 'at', 'by', 'with', 'from', 'as', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'can', 'could', 'should', 'may', 'might', 'must', 'shall',
    # Domain-adjacent English
    'table', 'model', 'capability', 'budget', 'check', 'grade', 'quality',
    'offered', 'offer', 'token', 'tokens', 'input', 'output', 'context', 'window',
    'prompt', 'response', 'generation', 'generate', 'generated', 'generating',
    'sample', 'sampling', 'sampler',
    'temperature', 'top', 'p', 'k', 'penalty', 'repetition',
    'presence', 'frequency',
    # Section / part words
    'section', 'part', 'chapter', 'step', 'example', 'template', 'rule',
    'recommendation', 'illustration', 'bridge', 'synthesis', 'cross',
    'ref', 'demonstrates', 'annotation',
    # Action verbs
    'show', 'tell', 'react', 'respond', 'describe', 'narrate', 'speak', 'act',
    'push', 'close', 'open', 'change', 'trigger', 'action', 'price',
    # Common nouns in cards
    'voice', 'silence', 'betrayal', 'trust', 'help', 'alone', 'deadline',
    'office', 'pen', 'sound', 'scratch',
    # Adjectives
    'sharp', 'guarded', 'distrustful', 'investigative', 'dimly', 'lit',
    # Technical loanwords (sometimes acceptable in Russian, but prefer Russian)
    'embedding', 'chunk', 'chunking',
    'pipeline', 'deploy', 'deployment', 'commit', 'pull', 'merge',
    'branch', 'tag', 'release', 'version', 'build', 'cache', 'hash',
    # Less obvious but Russian-equivalent-exists
    'block', 'inline', 'markup', 'markdown', 'render', 'parser', 'lexer',
    # Other
    'father', 'editor', 'journalist', 'connection', 'genuine',
}


def categorize_token(token: str) -> str:
    """Categorize a token: ALLOWED / TRANSLATABLE / UNKNOWN."""
    if token in ALLOWED_SINGLE_WORDS:
        return 'ALLOWED'
    if token.lower() in TRANSLATABLE_LEAKS:
        return 'TRANSLATABLE'
    for term in KEEP_ENGLISH_TERMS:
        if token in term.split():
            return 'UNKNOWN'
    return 'UNKNOWN'


def scan_file(filepath: Path) -> dict:
    """Scan one HTML file for English tokens, return categorized results."""
    content = filepath.read_text(encoding='utf-8')
    
    # Strip comments
    content_no_comments = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    # Build code intervals (pre, code, td)
    code_intervals = build_code_intervals(content_no_comments)
    
    tokens_by_category = defaultdict(list)
    raw_tokens = []
    
    for match in re.finditer(r"\b[A-Za-z][A-Za-z'-]*\b", content_no_comments):
        token = match.group()
        start, end = match.start(), match.end()
        
        # Skip if inside code block / pre / td
        if is_in_allowed_context(content_no_comments, start, end, code_intervals):
            continue
        
        # Skip if inside HTML tag
        before = content_no_comments[:start]
        last_lt = before.rfind('<')
        last_gt = before.rfind('>')
        if last_lt > last_gt:
            continue
        
        cat = categorize_token(token)
        tokens_by_category[cat].append({
            'token': token,
            'line': content_no_comments[:start].count('\n') + 1,
            'context': content_no_comments[max(0, start - 40):min(len(content_no_comments), end + 40)].replace('\n', ' ').strip()
        })
        raw_tokens.append(token)
    
    return {
        'filepath': str(filepath),
        'counts': {cat: len(items) for cat, items in tokens_by_category.items()},
        'tokens': dict(tokens_by_category),
        'raw_counter': dict(Counter(raw_tokens)),
    }


def main():
    repo_root = Path(__file__).parent.parent
    master_dir = repo_root / 'src' / 'master'
    
    html_files = sorted(master_dir.glob('*.html'))
    print(f"Scanning {len(html_files)} master HTML files...")
    
    all_results = {}
    total_unknown = Counter()
    total_translatable = Counter()
    
    for filepath in html_files:
        result = scan_file(filepath)
        all_results[filepath.name] = result
        for token, count in result['raw_counter'].items():
            cat = categorize_token(token)
            if cat == 'UNKNOWN':
                total_unknown[token] += count
            elif cat == 'TRANSLATABLE':
                total_translatable[token] += count
    
    # Write JSON output
    output_dir = Path(__file__).parent / 'output'
    output_dir.mkdir(exist_ok=True)

    json_path = output_dir / 'english_terms_survey.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump({
            'files': all_results,
            'unknown_tokens_aggregate': dict(total_unknown.most_common()),
            'translatable_tokens_aggregate': dict(total_translatable.most_common()),
        }, f, ensure_ascii=False, indent=2)
    
    # Print summary
    print(f"\n=== Summary ===")
    print(f"Files scanned: {len(html_files)}")
    print(f"\nPer-file counts:")
    for fname, res in all_results.items():
        print(f"  {fname}: ALLOWED={res['counts'].get('ALLOWED', 0)}, "
              f"TRANSLATABLE={res['counts'].get('TRANSLATABLE', 0)}, "
              f"UNKNOWN={res['counts'].get('UNKNOWN', 0)}")
    
    print(f"\n=== Top 80 UNKNOWN tokens (need review) ===")
    for token, count in total_unknown.most_common(80):
        print(f"  {token}: {count}")
    
    print(f"\n=== Top 50 TRANSLATABLE tokens (leak candidates) ===")
    for token, count in total_translatable.most_common(50):
        print(f"  {token}: {count}")
    
    print(f"\nJSON written to: {json_path}")


if __name__ == '__main__':
    main()
