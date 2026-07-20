#!/usr/bin/env python3
"""
General-purpose canon ↔ master HTML drift detector (iter 48+ tool,
paragraph-level Jaccard similarity added iter 52).

Purpose:
    Informational detector that compares `docs/canon/*.md` (source of truth)
    against `src/master/*.html` (production HTML) at the structural level.

    Complements `scripts/audit_canon_master_sync.py` (which is a focused
    regression test for iter 44+45+46+47 fixes). This script is GENERAL —
    it does not know about specific fixes, it just compares structure.

What it checks (per canon/master file pair):
    1. Section presence drift:
       - Section IDs declared in canon (`data-section: <id>`) but missing
         from master HTML (`<section data-section="<id>">`).
       - Section IDs present in master HTML but not declared in canon.
    2. Heading text drift:
       - For matching section IDs, compare H2 heading text.
    3. Content hash drift (informational):
       - For matching section IDs, compute MD5 of normalized text content.
       - Hash differences are EXPECTED (master has VS-EMBEDs, callouts,
         expanded tables; canon has `[ref: ...]` markers, markdown).
       - Reported as informational signal, not a failure.
    4. Paragraph-level semantic drift (iter 52+):
       - For each canon paragraph, find best matching master paragraph using
         Jaccard similarity on word tokens.
       - Paragraphs with similarity below PARAGRAPH_DRIFT_THRESHOLD are
         reported as drift.
       - Helps find paragraphs that were rewritten, deleted, or replaced
         with VS-EMBEDs without leaving a textual trace.
       - Informational only — many drifts are expected (canon has [ref: ...]
         markers, master has VS-EMBEDs instead of text).

Scope:
    Covers all 16 canon files: part_00, part_01..part_10, part_07a, part_07b,
    appendix_glossary, appendix_mbti, appendix_model_table, appendix_character_map.
    Two canon files (part_00, appendix_character_map) have no master HTML
    counterpart — reported as INFO (canon-only files, by design).

Exit codes:
    0 — always (informational script, never fails the build)

Run:
    python3 scripts/audit_canon_master_drift.py
    python3 scripts/audit_canon_master_drift.py --json build/drift-report.json
    python3 scripts/audit_canon_master_drift.py --no-paragraphs  # skip paragraph drift
"""
import argparse
import hashlib
import html
import json
import re
import sys
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Optional

# Paragraph drift configuration (iter 52+)
PARAGRAPH_DRIFT_THRESHOLD = 0.3  # Jaccard similarity below this = drift
MIN_PARAGRAPH_LENGTH = 30  # chars (normalized); skip shorter paragraphs (labels, headings)
MAX_PARAGRAPH_DISPLAY = 5  # max paragraph drifts to show per file in console output

REPO = Path(__file__).resolve().parents[1]
CANON_DIR = REPO / "docs" / "canon"
MASTER_DIR = REPO / "src" / "master"

# Module-level flag for paragraph drift (toggled by --no-paragraphs CLI flag).
ENABLE_PARAGRAPH_DRIFT = True

# Canon → master file mapping (most have 1:1 mapping; part_00 and
# appendix_character_map are canon-only by design — no master HTML).
CANON_FILES = [
    "part_00",
    "part_01",
    "part_02",
    "part_03",
    "part_04",
    "part_05",
    "part_06",
    "part_07a",
    "part_07b",
    "part_08",
    "part_09",
    "part_10",
    "appendix_glossary",
    "appendix_mbti",
    "appendix_model_table",
    "appendix_character_map",
]

# Canon-only files (no master HTML counterpart, by design).
CANON_ONLY_FILES = {"part_00", "appendix_character_map"}


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class CanonSection:
    """A section extracted from a canon markdown file."""
    heading: str
    data_section_id: Optional[str]  # None if heading has no `data-section:` line
    body: str  # raw text between this heading and next `## ` heading
    source_file: str
    heading_line: int


@dataclass
class CanonDeclaredId:
    """A `data-section: <id>` declaration found anywhere in canon (including
    under ### subheadings). Used to detect IDs that exist in canon but not
    as their own H2 section."""
    data_section_id: str
    source_file: str
    line: int
    context_heading: Optional[str] = None  # nearest preceding ## or ### heading


@dataclass
class MasterSection:
    """A section extracted from a master HTML file."""
    data_section_id: str
    heading: str
    body: str  # raw HTML between <section ...> and matching </section>
    source_file: str


@dataclass
class ParagraphDrift:
    """A canon paragraph with no good match in master HTML (iter 52+)."""
    section_id: str
    canon_text_preview: str  # first 80 chars of normalized canon paragraph
    best_master_text_preview: str  # first 80 chars of best master paragraph match
    best_similarity: float  # Jaccard similarity [0.0, 1.0]
    canon_length: int
    master_length: int


@dataclass
class FileDrift:
    """Drift report for a single canon/master file pair."""
    file: str
    canon_only_sections: list = field(default_factory=list)  # list of dict {id, source_file, line, context_heading}
    master_only_sections: list = field(default_factory=list)  # list of dict {id, heading}
    heading_mismatches: list = field(default_factory=list)  # list of {id, canon_heading, master_heading}
    content_hash_diffs: list = field(default_factory=list)  # list of {id, canon_hash, master_hash}
    content_hash_matches: int = 0  # count of sections with matching content hash
    paragraph_drifts: list = field(default_factory=list)  # list of ParagraphDrift (iter 52+)
    canon_sections_count: int = 0  # count of declared data-section IDs in canon
    master_sections_count: int = 0
    canon_file_exists: bool = True
    master_file_exists: bool = True


# ---------------------------------------------------------------------------
# Canon markdown parsing
# ---------------------------------------------------------------------------

YAML_FRONT_MATTER_RE = re.compile(r"\A---\s*\n.*?\n---\s*\n", re.DOTALL)
DATA_SECTION_DECL_RE = re.compile(r"`data-section:\s*([\w_]+)`")
H2_HEADING_RE = re.compile(r"^##\s+(.+?)\s*$", re.MULTILINE)


def strip_yaml_front_matter(text: str) -> str:
    """Remove YAML front-matter from start of canon file."""
    return YAML_FRONT_MATTER_RE.sub("", text, count=1)


def parse_canon_file(path: Path) -> tuple[list[CanonSection], list[CanonDeclaredId]]:
    """
    Parse canon markdown into:
      - list of CanonSection objects (one per H2 heading)
      - list of CanonDeclaredId objects (every `data-section: <id>` declaration,
        including those under H3 subheadings — used to detect IDs that exist
        in canon but not as their own H2 section)
    """
    if not path.exists():
        return [], []

    text = path.read_text(encoding="utf-8")
    text = strip_yaml_front_matter(text)

    # Collect ALL `data-section: <id>` declarations in the file.
    declared_ids: list[CanonDeclaredId] = []
    for m in DATA_SECTION_DECL_RE.finditer(text):
        id_str = m.group(1)
        line_no = text[:m.start()].count("\n") + 1
        # Find nearest preceding ## or ### heading.
        prefix = text[:m.start()]
        heading_matches = list(re.finditer(r"^(#{2,3})\s+(.+?)\s*$", prefix, re.MULTILINE))
        context_heading = heading_matches[-1].group(2).strip() if heading_matches else None
        declared_ids.append(CanonDeclaredId(
            data_section_id=id_str,
            source_file=path.name,
            line=line_no,
            context_heading=context_heading,
        ))

    # Find all H2 headings with their positions.
    headings = list(H2_HEADING_RE.finditer(text))
    if not headings:
        return [], declared_ids

    sections: list[CanonSection] = []
    for i, m in enumerate(headings):
        heading_text = m.group(1).strip()
        heading_line = text[:m.start()].count("\n") + 1
        body_start = m.end()
        body_end = headings[i + 1].start() if i + 1 < len(headings) else len(text)
        body = text[body_start:body_end]

        # Look for `data-section: <id>` within first 5 non-empty lines of body.
        data_section_id: Optional[str] = None
        non_empty_lines = 0
        for line in body.split("\n"):
            stripped = line.strip()
            if not stripped:
                continue
            non_empty_lines += 1
            if non_empty_lines > 5:
                break
            id_match = DATA_SECTION_DECL_RE.search(stripped)
            if id_match:
                data_section_id = id_match.group(1)
                break

        sections.append(CanonSection(
            heading=heading_text,
            data_section_id=data_section_id,
            body=body,
            source_file=path.name,
            heading_line=heading_line,
        ))

    return sections, declared_ids


# ---------------------------------------------------------------------------
# Master HTML parsing
# ---------------------------------------------------------------------------

SECTION_OPEN_RE = re.compile(
    r'<section\b[^>]*\bdata-section\s*=\s*"([\w_]+)"[^>]*>',
    re.IGNORECASE,
)
H2_IN_HTML_RE = re.compile(r"<h2[^>]*>(.*?)</h2>", re.IGNORECASE | re.DOTALL)
VS_EMBED_BLOCK_RE = re.compile(
    r'<div\b[^>]*class="[^"]*vs-embed[^"]*"[^>]*>.*?</div>',
    re.IGNORECASE | re.DOTALL,
)
HTML_COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)
TAG_RE = re.compile(r"<[^>]+>")


def _find_matching_close_section(html_text: str, open_pos: int) -> int:
    """
    Given html_text and position of '<section' opening tag (start of '<'),
    return the index immediately after the matching '</section>' close tag.

    Handles nested <section> elements. Returns -1 if no match found.
    """
    # We assume the opening tag itself has been matched; advance past it.
    # Find the '>' that closes the opening tag.
    gt = html_text.find(">", open_pos)
    if gt == -1:
        return -1
    pos = gt + 1
    depth = 1
    # We search for <section and </section> from current pos.
    while depth > 0:
        next_open = html_text.find("<section", pos)
        next_close = html_text.find("</section>", pos)
        if next_close == -1:
            return -1
        if next_open != -1 and next_open < next_close:
            # Check it's actually an opening tag (not </section).
            depth += 1
            # Advance past this opening tag's '>' (skip attributes).
            inner_gt = html_text.find(">", next_open)
            if inner_gt == -1:
                return -1
            pos = inner_gt + 1
        else:
            depth -= 1
            pos = next_close + len("</section>")
    return pos


def parse_master_file(path: Path) -> list[MasterSection]:
    """Parse master HTML into a list of MasterSection objects."""
    if not path.exists():
        return []

    text = path.read_text(encoding="utf-8")
    sections: list[MasterSection] = []

    for m in SECTION_OPEN_RE.finditer(text):
        section_id = m.group(1)
        open_start = m.start()
        body_end_pos = _find_matching_close_section(text, open_start)
        if body_end_pos == -1:
            # Malformed HTML — skip this section.
            continue
        # body_start = position right after the opening tag's '>'
        body_start = m.end()
        raw_body = text[body_start:body_end_pos - len("</section>")]

        # Extract first <h2>...</h2> as heading (if any).
        h2_match = H2_IN_HTML_RE.search(raw_body)
        heading = ""
        if h2_match:
            heading = strip_html(h2_match.group(1)).strip()

        sections.append(MasterSection(
            data_section_id=section_id,
            heading=heading,
            body=raw_body,
            source_file=path.name,
        ))

    return sections


# ---------------------------------------------------------------------------
# Text normalization
# ---------------------------------------------------------------------------

# Canon markdown patterns to strip / normalize for content hash.
MD_CODE_FENCE_RE = re.compile(r"```+.*?```+", re.DOTALL)
MD_INLINE_CODE_RE = re.compile(r"`([^`]*)`")
MD_REF_NOTATION_RE = re.compile(r"\[ref:\s*[^\]]+\]")
MD_LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]*\)")
MD_BOLD_RE = re.compile(r"\*\*([^*]+)\*\*")
MD_ITALIC_RE = re.compile(r"(?<!\*)\*([^*]+)\*(?!\*)")
MD_HEADING_HASH_RE = re.compile(r"^#{1,6}\s+", re.MULTILINE)
MD_TABLE_SEP_RE = re.compile(r"^\s*\|?[\s\-:|]+\|?\s*$", re.MULTILINE)
MD_TABLE_PIPE_RE = re.compile(r"\|")
MD_BLOCKQUOTE_RE = re.compile(r"^\s*>\s?", re.MULTILINE)
MD_DATA_SECTION_DECL_LINE_RE = re.compile(r"^\s*`data-section:[^`]+`\s*$", re.MULTILINE)
MD_HR_RE = re.compile(r"^\s*---+\s*$", re.MULTILINE)
MD_LIST_MARKER_RE = re.compile(r"^\s*[-*+]\s+", re.MULTILINE)
MD_ORDERED_LIST_RE = re.compile(r"^\s*\d+\.\s+", re.MULTILINE)


def normalize_canon_text(text: str) -> str:
    """Normalize canon markdown to comparable plain text."""
    # Remove code fences (they are not in master HTML).
    text = MD_CODE_FENCE_RE.sub("", text)
    # Replace inline code with its content.
    text = MD_INLINE_CODE_RE.sub(r"\1", text)
    # Remove [ref: ...] notations.
    text = MD_REF_NOTATION_RE.sub("", text)
    # Replace [text](url) with text.
    text = MD_LINK_RE.sub(r"\1", text)
    # Strip bold/italic markers.
    text = MD_BOLD_RE.sub(r"\1", text)
    text = MD_ITALIC_RE.sub(r"\1", text)
    # Strip heading hashes.
    text = MD_HEADING_HASH_RE.sub("", text)
    # Remove `data-section:` declaration lines.
    text = MD_DATA_SECTION_DECL_LINE_RE.sub("", text)
    # Remove horizontal rules.
    text = MD_HR_RE.sub("", text)
    # Remove blockquote markers.
    text = MD_BLOCKQUOTE_RE.sub("", text)
    # Remove list markers.
    text = MD_LIST_MARKER_RE.sub("", text)
    text = MD_ORDERED_LIST_RE.sub("", text)
    # Remove table separator rows.
    text = MD_TABLE_SEP_RE.sub("", text)
    # Replace table pipes with spaces.
    text = MD_TABLE_PIPE_RE.sub(" ", text)

    return _final_normalize(text)


def strip_html(text: str) -> str:
    """Strip HTML tags and decode entities."""
    # Remove comments first (before tag stripping, since comments contain tags).
    text = HTML_COMMENT_RE.sub("", text)
    # Remove VS-EMBED blocks entirely (they are not in canon).
    text = VS_EMBED_BLOCK_RE.sub("", text)
    # Remove all HTML tags.
    text = TAG_RE.sub("", text)
    # Decode HTML entities.
    text = html.unescape(text)
    return text


def normalize_master_text(html_body: str) -> str:
    """Normalize master HTML body to comparable plain text."""
    text = strip_html(html_body)
    return _final_normalize(text)


def _final_normalize(text: str) -> str:
    """Common final normalization for both canon and master text."""
    # Collapse all whitespace to single spaces.
    text = re.sub(r"\s+", " ", text)
    # Strip leading/trailing whitespace.
    text = text.strip()
    # Lowercase for case-insensitive comparison.
    text = text.lower()
    return text


def content_hash(text: str) -> str:
    """Compute MD5 hash of normalized text (first 12 hex chars)."""
    return hashlib.md5(text.encode("utf-8")).hexdigest()[:12]


# ---------------------------------------------------------------------------
# Paragraph-level drift detection (iter 52+)
# ---------------------------------------------------------------------------

# Patterns for splitting canon markdown body into paragraphs.
CANON_H3_HEADING_RE = re.compile(r"^###\s+.+?$", re.MULTILINE)
CANON_HORIZONTAL_RULE_RE = re.compile(r"^---+\s*$", re.MULTILINE)

# Patterns for extracting paragraphs from master HTML.
P_TAG_RE = re.compile(r"<p[^>]*>(.*?)</p>", re.IGNORECASE | re.DOTALL)
LI_TAG_RE = re.compile(r"<li[^>]*>(.*?)</li>", re.IGNORECASE | re.DOTALL)
TD_TAG_RE = re.compile(r"<t[dh][^>]*>(.*?)</t[dh]>", re.IGNORECASE | re.DOTALL)

# Token pattern: words of 3+ word characters (Unicode-aware — includes Cyrillic).
# In Python 3, \w matches Unicode word chars (letters, digits, underscore) by default.
TOKEN_RE = re.compile(r"\w{3,}", re.UNICODE)

# Russian stopwords (small set — only the most common filler words).
# Keep the set small so we don't over-prune meaningful tokens.
STOPWORDS_RU = frozenset({
    "и", "в", "во", "не", "что", "он", "на", "я", "с", "со", "как",
    "а", "то", "все", "она", "так", "его", "но", "да", "ты", "к",
    "у", "же", "вы", "за", "бы", "по", "только", "ее", "мне", "было",
    "вот", "от", "меня", "о", "из", "ему", "теперь", "когда", "даже",
    "ну", "вдруг", "ли", "если", "уже", "или", "ни", "быть", "был",
    "него", "до", "вас", "нибудь", "опять", "уж", "вам", "ведь", "там",
    "потом", "себя", "ничего", "ей", "может", "они", "тут", "где", "есть",
    "надо", "ней", "для", "мы", "тебя", "их", "чем", "была", "сам", "чтоб",
    "без", "будто", "чего", "раз", "тоже", "себе", "под", "будет", "ж",
    "тогда", "кто", "этот", "того", "потому", "этого", "какой", "совсем",
    "ним", "здесь", "этом", "один", "почти", "мой", "тем", "чтобы", "нее",
    "сейчас", "были", "куда", "зачем", "всех", "никогда", "можно", "при",
    "наконец", "два", "об", "другой", "хоть", "после", "над", "больше",
    "тот", "через", "эти", "нас", "про", "всего", "них", "какая", "много",
    "разве", "три", "эту", "моя", "впрочем", "хорошо", "свою", "этой", "перед",
    "иногда", "лучше", "чуть", "том", "нельзя", "такой", "им", "более",
    "всегда", "конечно", "всю", "между",
})
STOPWORDS_EN = frozenset({
    "the", "and", "for", "are", "but", "not", "you", "all", "any", "can",
    "her", "was", "one", "our", "out", "has", "have", "had", "his", "him",
    "she", "they", "them", "this", "that", "with", "from", "into", "over",
    "than", "then", "when", "what", "which", "will", "your", "their", "there",
})
STOPWORDS = STOPWORDS_RU | STOPWORDS_EN


def split_canon_paragraphs(body: str) -> list[str]:
    """Split canon markdown body into paragraphs.

    Splits on horizontal rules (---) and blank lines, then filters out
    headings, code blocks, tables, [ref:...] markers, and short fragments.
    Returns list of normalized paragraph strings.
    """
    text = body
    # Remove horizontal rules first (they are paragraph separators).
    text = CANON_HORIZONTAL_RULE_RE.sub("\n\n", text)
    # Remove H3 headings (their text is a subheading, not a paragraph).
    text = CANON_H3_HEADING_RE.sub("", text)
    # Remove `data-section:` declaration lines.
    text = MD_DATA_SECTION_DECL_LINE_RE.sub("", text)
    # Remove code fences entirely.
    text = MD_CODE_FENCE_RE.sub("", text)
    # Remove [ref: ...] markers.
    text = MD_REF_NOTATION_RE.sub("", text)

    # Split on blank lines (2+ newlines).
    raw_paragraphs = re.split(r"\n\s*\n", text)

    paragraphs: list[str] = []
    for raw in raw_paragraphs:
        # Strip markdown formatting.
        norm = normalize_canon_text(raw)
        # Skip short fragments (likely labels, table rows, list items).
        if len(norm) < MIN_PARAGRAPH_LENGTH:
            continue
        # Skip pure table rows (contain pipe | with cell separators).
        if raw.strip().startswith("|") and "|" in raw.strip()[-3:]:
            continue
        # Skip list-only items (start with - or *).
        stripped_raw = raw.strip()
        if stripped_raw.startswith(("- ", "* ", "+ ")) and "\n" not in stripped_raw:
            continue
        paragraphs.append(norm)

    return paragraphs


def split_master_paragraphs(html_body: str) -> list[str]:
    """Extract paragraphs from master HTML body.

    Extracts text from <p>, <li>, and <td>/<th> elements, then normalizes.
    Returns list of normalized paragraph strings.
    """
    paragraphs: list[str] = []

    # Extract from <p> tags.
    for m in P_TAG_RE.finditer(html_body):
        text = strip_html(m.group(1))
        norm = _final_normalize(text)
        if len(norm) >= MIN_PARAGRAPH_LENGTH:
            paragraphs.append(norm)

    # Extract from <li> tags (list items often contain real content).
    for m in LI_TAG_RE.finditer(html_body):
        text = strip_html(m.group(1))
        norm = _final_normalize(text)
        if len(norm) >= MIN_PARAGRAPH_LENGTH:
            paragraphs.append(norm)

    # Extract from <td>/<th> tags (table cells).
    for m in TD_TAG_RE.finditer(html_body):
        text = strip_html(m.group(1))
        norm = _final_normalize(text)
        if len(norm) >= MIN_PARAGRAPH_LENGTH:
            paragraphs.append(norm)

    return paragraphs


def tokenize(text: str) -> set[str]:
    """Tokenize text into a set of meaningful word tokens (lowercase, 3+ chars).

    Filters out stopwords and short tokens (numbers, abbreviations).
    """
    tokens = set()
    for m in TOKEN_RE.finditer(text):
        token = m.group(0).lower()
        if token in STOPWORDS:
            continue
        tokens.add(token)
    return tokens


def jaccard_similarity(set_a: frozenset, set_b: frozenset) -> float:
    """Compute Jaccard similarity between two token sets.

    Jaccard = |A ∩ B| / |A ∪ B|
    Returns 0.0 if both sets are empty (no meaningful content to compare).
    """
    if not set_a and not set_b:
        return 0.0
    union = set_a | set_b
    if not union:
        return 0.0
    intersection = set_a & set_b
    return len(intersection) / len(union)


def compute_paragraph_drift(
    section_id: str,
    canon_paragraphs: list[str],
    master_paragraphs: list[str],
) -> list[ParagraphDrift]:
    """For each canon paragraph, find best matching master paragraph.

    Returns list of ParagraphDrift for canon paragraphs whose best match
    has Jaccard similarity below PARAGRAPH_DRIFT_THRESHOLD.
    """
    if not canon_paragraphs or not master_paragraphs:
        return []

    # Pre-tokenize master paragraphs (frozen sets for fast intersection).
    master_tokens: list[tuple[str, frozenset]] = []
    for mp in master_paragraphs:
        tokens = frozenset(tokenize(mp))
        if tokens:  # skip empty token sets (e.g. pure numbers)
            master_tokens.append((mp, tokens))

    if not master_tokens:
        return []

    drifts: list[ParagraphDrift] = []
    for cp in canon_paragraphs:
        cp_tokens = frozenset(tokenize(cp))
        if not cp_tokens:
            continue

        best_sim = 0.0
        best_master_text = ""
        best_master_len = 0
        for mp_text, mp_tokens in master_tokens:
            sim = jaccard_similarity(cp_tokens, mp_tokens)
            if sim > best_sim:
                best_sim = sim
                best_master_text = mp_text
                best_master_len = len(mp_text)
                if sim >= 1.0:
                    break  # perfect match, no need to search further

        if best_sim < PARAGRAPH_DRIFT_THRESHOLD:
            drifts.append(ParagraphDrift(
                section_id=section_id,
                canon_text_preview=cp[:80],
                best_master_text_preview=best_master_text[:80],
                best_similarity=round(best_sim, 3),
                canon_length=len(cp),
                master_length=best_master_len,
            ))

    return drifts


# ---------------------------------------------------------------------------
# Drift detection
# ---------------------------------------------------------------------------

def compute_file_drift(canon_name: str) -> FileDrift:
    """Compute drift between canon <name>.md and master <name>.html."""
    result = FileDrift(file=canon_name)
    canon_path = CANON_DIR / f"{canon_name}.md"
    master_path = MASTER_DIR / f"{canon_name}.html"

    result.canon_file_exists = canon_path.exists()
    result.master_file_exists = master_path.exists()

    canon_sections, canon_declared_ids = (
        parse_canon_file(canon_path) if result.canon_file_exists else ([], [])
    )
    master_sections = parse_master_file(master_path) if result.master_file_exists else []

    # Build canon data-section ID map from ALL declarations (h2 + h3 + ...).
    # If multiple declarations exist for the same ID, keep the first.
    canon_id_to_decl: dict[str, CanonDeclaredId] = {}
    for d in canon_declared_ids:
        if d.data_section_id not in canon_id_to_decl:
            canon_id_to_decl[d.data_section_id] = d
    # Also: H2 sections may have data_section_id; their body is what we hash.
    canon_id_to_section: dict[str, CanonSection] = {}
    for s in canon_sections:
        if s.data_section_id and s.data_section_id not in canon_id_to_section:
            canon_id_to_section[s.data_section_id] = s

    master_by_id: dict[str, MasterSection] = {}
    for s in master_sections:
        if s.data_section_id not in master_by_id:  # first wins
            master_by_id[s.data_section_id] = s

    canon_ids = set(canon_id_to_decl.keys())
    master_ids = set(master_by_id.keys())

    result.canon_sections_count = len(canon_ids)
    result.master_sections_count = len(master_ids)

    # Sections in canon but missing from master.
    for section_id in sorted(canon_ids - master_ids):
        decl = canon_id_to_decl[section_id]
        result.canon_only_sections.append({
            "id": section_id,
            "source_file": decl.source_file,
            "line": decl.line,
            "context_heading": decl.context_heading,
        })

    # Sections in master but not declared in canon.
    for section_id in sorted(master_ids - canon_ids):
        m = master_by_id[section_id]
        result.master_only_sections.append({
            "id": section_id,
            "heading": m.heading,
            "source_file": m.source_file,
        })

    # For matching IDs: check heading text + content hash.
    # Heading comparison only works if the canon ID maps to an H2 section
    # (we only have explicit headings for H2 sections in canon_sections).
    for section_id in sorted(canon_ids & master_ids):
        m = master_by_id[section_id]
        c_section = canon_id_to_section.get(section_id)

        # Heading comparison (normalized) — only if we have an H2 canon section.
        if c_section is not None:
            c_heading_norm = _final_normalize(c_section.heading)
            m_heading_norm = _final_normalize(m.heading)
            if c_heading_norm and m_heading_norm and c_heading_norm != m_heading_norm:
                result.heading_mismatches.append({
                    "id": section_id,
                    "canon_heading": c_section.heading,
                    "master_heading": m.heading,
                    "canon_source": f"{c_section.source_file}:L{c_section.heading_line}",
                })

        # Content hash comparison — only if we have an H2 canon section body.
        if c_section is not None:
            c_norm = normalize_canon_text(c_section.body)
            m_norm = normalize_master_text(m.body)
            c_hash = content_hash(c_norm)
            m_hash = content_hash(m_norm)
            if c_hash != m_hash:
                result.content_hash_diffs.append({
                    "id": section_id,
                    "canon_hash": c_hash,
                    "master_hash": m_hash,
                    "canon_length": len(c_norm),
                    "master_length": len(m_norm),
                })
            else:
                result.content_hash_matches += 1

        # Paragraph-level drift detection (iter 52+) — only if canon H2 section body exists.
        # Skip if user disabled via --no-paragraphs (handled in main, but guard anyway).
        if c_section is not None and ENABLE_PARAGRAPH_DRIFT:
            canon_paragraphs = split_canon_paragraphs(c_section.body)
            master_paragraphs = split_master_paragraphs(m.body)
            p_drifts = compute_paragraph_drift(section_id, canon_paragraphs, master_paragraphs)
            result.paragraph_drifts.extend(p_drifts)

    return result


# ---------------------------------------------------------------------------
# Reporting
# ---------------------------------------------------------------------------

def print_console_report(drifts: list[FileDrift]) -> None:
    """Print human-readable drift report to console."""
    print("=" * 78)
    print("audit_canon_master_drift.py — general-purpose canon ↔ master drift detector")
    print("Informational report (iter 48+ tool). Exit 0 always.")
    print("=" * 78)
    print()

    total_canon_only = 0
    total_master_only = 0
    total_heading_mismatch = 0
    total_content_hash_diff = 0
    total_content_hash_match = 0
    total_paragraph_drift = 0

    for d in drifts:
        # Skip silently if no drift at all and both files exist with sections.
        has_any_drift = (
            d.canon_only_sections
            or d.master_only_sections
            or d.heading_mismatches
            or (d.canon_file_exists and d.master_file_exists and d.content_hash_diffs)
            or d.paragraph_drifts
        )
        if not has_any_drift and d.canon_file_exists and d.master_file_exists:
            # Quietly skip files with zero drift.
            total_content_hash_match += d.content_hash_matches
            continue

        print(f"--- {d.file} ---")
        if not d.canon_file_exists:
            print(f"  [INFO] canon file missing (skipped)")
        if not d.master_file_exists:
            if d.file in CANON_ONLY_FILES:
                print(f"  [INFO] canon-only file (no master HTML by design)")
            else:
                print(f"  [DRIFT] master HTML file missing")

        if d.canon_only_sections:
            print(f"  [DRIFT] {len(d.canon_only_sections)} section(s) in canon but missing from master:")
            for s in d.canon_only_sections:
                ctx = f" (under heading: {s['context_heading']!r})" if s.get("context_heading") else ""
                print(f"    - id={s['id']!r} {s['source_file']}:L{s['line']}{ctx}")
            total_canon_only += len(d.canon_only_sections)

        if d.master_only_sections:
            print(f"  [DRIFT] {len(d.master_only_sections)} section(s) in master but not declared in canon:")
            for s in d.master_only_sections:
                print(f"    - id={s['id']!r} heading={s['heading']!r} ({s['source_file']})")
            total_master_only += len(d.master_only_sections)

        if d.heading_mismatches:
            print(f"  [WARN] {len(d.heading_mismatches)} heading mismatch(es):")
            for hm in d.heading_mismatches:
                print(f"    - id={hm['id']!r}")
                print(f"        canon:   {hm['canon_heading']!r}")
                print(f"        master:  {hm['master_heading']!r}")
                print(f"        source:  {hm['canon_source']}")
            total_heading_mismatch += len(d.heading_mismatches)

        if d.canon_file_exists and d.master_file_exists and d.content_hash_diffs:
            print(f"  [INFO] {len(d.content_hash_diffs)} section(s) with content hash diff (informational, expected):")
            for ch in d.content_hash_diffs[:5]:  # show first 5
                print(f"    - id={ch['id']!r} canon_hash={ch['canon_hash']} master_hash={ch['master_hash']} "
                      f"(canon_len={ch['canon_length']} master_len={ch['master_length']})")
            if len(d.content_hash_diffs) > 5:
                print(f"    ... and {len(d.content_hash_diffs) - 5} more")
            total_content_hash_diff += len(d.content_hash_diffs)

        if d.content_hash_matches:
            print(f"  [OK] {d.content_hash_matches} section(s) with matching content hash")

        if d.paragraph_drifts:
            print(f"  [INFO] {len(d.paragraph_drifts)} paragraph drift(s) below Jaccard {PARAGRAPH_DRIFT_THRESHOLD} (iter 52+, informational):")
            for pd in d.paragraph_drifts[:MAX_PARAGRAPH_DISPLAY]:
                print(f"    - id={pd.section_id!r} sim={pd.best_similarity}")
                print(f"        canon:   {pd.canon_text_preview!r} (len={pd.canon_length})")
                if pd.best_master_text_preview:
                    print(f"        master:  {pd.best_master_text_preview!r} (len={pd.master_length})")
                else:
                    print(f"        master:  <no candidate paragraph found>")
            if len(d.paragraph_drifts) > MAX_PARAGRAPH_DISPLAY:
                print(f"    ... and {len(d.paragraph_drifts) - MAX_PARAGRAPH_DISPLAY} more")
            total_paragraph_drift += len(d.paragraph_drifts)

        total_content_hash_match += d.content_hash_matches
        print()

    print("=" * 78)
    print("SUMMARY")
    print("=" * 78)
    print(f"  Files scanned:                    {len(drifts)}")
    print(f"  Canon-only sections (missing master):  {total_canon_only}")
    print(f"  Master-only sections (missing canon):  {total_master_only}")
    print(f"  Heading mismatches:               {total_heading_mismatch}")
    print(f"  Content hash diffs (informational): {total_content_hash_diff}")
    print(f"  Content hash matches (perfect sync): {total_content_hash_match}")
    print(f"  Paragraph drifts (iter 52+, informational): {total_paragraph_drift}")
    print()
    print("NOTE: This is an informational tool. Content hash diffs and paragraph")
    print("      drifts are EXPECTED (master has VS-EMBEDs, expanded HTML; canon has")
    print("      [ref:...] markers, markdown). Canon-only and master-only sections")
    print("      are the actionable signals.")
    print("      See STATUS.md for documentation of known drift findings.")


def build_json_report(drifts: list[FileDrift]) -> dict:
    """Build a JSON-serializable report."""
    return {
        "tool": "audit_canon_master_drift.py",
        "version": "1.1",  # iter 52: paragraph drift added
        "iter": "48+ (paragraph drift: iter 52+)",
        "paragraph_drift_threshold": PARAGRAPH_DRIFT_THRESHOLD,
        "min_paragraph_length": MIN_PARAGRAPH_LENGTH,
        "files_scanned": len(drifts),
        "drifts": [asdict(d) for d in drifts],
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    global ENABLE_PARAGRAPH_DRIFT, PARAGRAPH_DRIFT_THRESHOLD
    parser = argparse.ArgumentParser(
        description="General-purpose canon ↔ master HTML drift detector (iter 48+ tool, paragraph drift iter 52+)."
    )
    parser.add_argument(
        "--json",
        metavar="PATH",
        help="Also write JSON report to PATH (in addition to console output).",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Suppress console output (useful when only --json is wanted).",
    )
    parser.add_argument(
        "--no-paragraphs",
        action="store_true",
        help="Skip paragraph-level Jaccard drift detection (iter 52+ feature).",
    )
    parser.add_argument(
        "--paragraph-threshold",
        type=float,
        default=PARAGRAPH_DRIFT_THRESHOLD,
        help=f"Jaccard similarity threshold for paragraph drift (default: {PARAGRAPH_DRIFT_THRESHOLD}).",
    )
    args = parser.parse_args()

    if args.no_paragraphs:
        ENABLE_PARAGRAPH_DRIFT = False
    else:
        # Allow CLI override of threshold.
        PARAGRAPH_DRIFT_THRESHOLD = args.paragraph_threshold

    drifts = [compute_file_drift(name) for name in CANON_FILES]

    if not args.quiet:
        print_console_report(drifts)

    if args.json:
        out_path = Path(args.json)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(
            json.dumps(build_json_report(drifts), ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        if not args.quiet:
            print()
            print(f"JSON report written to: {out_path}")

    return 0  # Always exit 0 — informational tool.


if __name__ == "__main__":
    sys.exit(main())
