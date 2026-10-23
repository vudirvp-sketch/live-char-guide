#!/usr/bin/env python3
"""
audit_sampling_parity.py — sampling-cluster acceptance audit (iter 145,
DEC-22 / Registry B row 2 — the last bounded area of semantic extraction,
now executed; KI#72 CLOSED).

Verifies the sampling values single-canonical-owner architecture across every
presentation layer of the verified inventory (owner_gates_iter144.md §2;
migration foundation §5.2):

    §7A.6 (canon + master)   = THE canonical value owner (S-a): the
                               «Базовые параметры» table (3 tiers) +
                               «Модель-специфичные рекомендации» (point recs)
                               + PP = 0.0 rules; AP-5 boundary ≤ 1.10
                               unchanged (Phase B verified)
    §7A.7 (canon + master)   = capability checklist only (S-b): param rows
                               dropped, defer line to §7A.6 added — canon
                               catches up to the deployed master shape
    E17 master embed         = the one visual presentation (S-c,
                               SHARED_REFERENCE): 32B+ column re-pointed to
                               the canonical «32B+ / API» values (Temperature
                               0.7–1.0, RepPen 1.05–1.10); no dual-side
                               «базовая | чеклист» split, no orphan asterisk;
                               12B–32B middle tier = declared omission
    E12 master embed         = AP-5 fix card re-framed (S-d): model-qualified
                               defer («в диапазоне своей модели — §7A.6;
                               никогда > 1.10»)
    §9.3 / §9.4 / §9.10      = hint re-frames (S-d): 12B-qualified or
                               deferred to §7A.6 (canon + master mirrors)
    Appendix B               = first OBSERVATION-strength application
                               (DEC-20): «НАБЛЮДЕНИЕ» callout on the
                               model-capability percentages (base .callout —
                               registered component, fence #7 clean)
    glossary                 = defers (registry → generated JSON,
                               DEC-17/18 chain; 5th location eliminated
                               iter 133 stays eliminated)
    E17/E12 prototype+extract= REMOVED_WITH_REASON (DEC-19 disposal at slice
                               time; archive = git history)

Checks:
 1. Canonical record (canon §7A.6): full [VS: E17] marker (SHARED_REFERENCE +
    declared 12B–32B omission + audit name); «Базовые параметры» table (6
    params × 3 tiers, exact values); PP = 0.0 ПРАВИЛО ×2; «Модель-специфичные»
    table (4 rows).
 2. Canon §7A.7 (S-b): no param table rows (Temperature / Presence Penalty /
    RepPen); five capability rows; defer line to §7A.6; header «Возможность».
 3. Master §7A.6 mirror: E17 pointer; qualitative RepPen note (никогда > 1.10);
    PP ПРАВИЛО callouts; «Модель-специфичные» details (4 rows).
 4. Master §7A.7 mirror: capability defer intro + link; РЕКОМЕНДАЦИЯ (AN ~2% —
    voice-slice audit anchor) intact; no param table.
 5. E17 embed: re-point comment (iter 145 / DEC-22 / SHARED_REFERENCE /
    declared omission / audit name); 32B+ column block = canonical values,
    no sub-range, no asterisk, no «базовая»/«чеклист»/«с осторожностью»;
    12B column values + its sanctioned sub-range; API column; PP 0.0 ×3.
 6. E12 embed: re-point comment; AP-5 card re-framed (defer + AP-5 boundary);
    old unqualified fix text gone.
 7. Hint re-frames (canon + master): §9.3 12B-qualified; §9.4 model-range
    defer; §9.10 12B-qualified + §7A.6 ref; every «1.0–1.05» line in Part 9
    is 12B-qualified (no unqualified hint anywhere).
 8. Appendix E OBSERVATION: canon + master + root fallback; no new component
    class (base .callout).
 9. Glossary defers: registry RepPen entry + generated data/glossary.json.
10. No competing ranges anywhere in the content layers (canon + master +
    parts fallbacks + widgets + data): «0.85–1.1», «0.7–1.1», «1.0–1.10»,
    «1.00–1.10» = zero occurrences.
11. Root fallbacks current: parts/part_07a.html + part_08.html +
    part_09.html + appendix_model_table.html carry the slice.
12. Map/matrix/registries parity: §5.7 SP-1..SP-12; Registry A E17 + E12;
    Registry B sampling row → DECIDED (DEC-22) / executed iter 145; §6
    preamble; §7 iteration log; matrix back-pointers; STATUS KI#72 CLOSED
    iter-145 (or, from iter 148+, its recorded lifecycle deletion — the row
    is deleted after 2+ closed iterations per the AGENTS.md KI lifecycle;
    git history = the archive); disposal complete; AGENTS.md canon-audits
    carries the gate.

Deferred layers (reported as notes, never failures):
  - visual-system/PLAN.md table copy (frozen design doc, DEC-19 — archive =
    git history);
  - canon front-matter `vs_embedded` staleness (repo-wide, rides the v2
    canon format);
  - drift-tool [ref:]↔<a> normalization asymmetry (informational;
    audit_canon_master_drift.py exit 0 by design).

Exit codes: 0 — PASS; 1 — FAIL (messages above).
Run: python3 scripts/audit_sampling_parity.py
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CANON_7A = REPO / "docs" / "canon" / "part_07a.md"
CANON_8 = REPO / "docs" / "canon" / "part_08.md"
CANON_9 = REPO / "docs" / "canon" / "part_09.md"
CANON_APPE = REPO / "docs" / "canon" / "appendix_model_params.md"
MASTER_7A = REPO / "src" / "master" / "part_07a.html"
MASTER_8 = REPO / "src" / "master" / "part_08.html"
MASTER_9 = REPO / "src" / "master" / "part_09.html"
MASTER_APPE = REPO / "src" / "master" / "appendix_model_params.html"
GLOSSARY_REGISTRY = REPO / "docs" / "canon" / "glossary_registry.md"
GLOSSARY_JSON = REPO / "data" / "glossary.json"
FALLBACK_7A = REPO / "parts" / "part_07a.html"
FALLBACK_8 = REPO / "parts" / "part_08.html"
FALLBACK_9 = REPO / "parts" / "part_09.html"
FALLBACK_APPE = REPO / "parts" / "appendix_model_params.html"
MAP = REPO / "docs" / "research" / "migration_map_v2.md"
MATRIX = REPO / "docs" / "research" / "editorial_matrix.md"
STATUS = REPO / "STATUS.md"
AGENTS = REPO / "AGENTS.md"
CANON_DIR = REPO / "docs" / "canon"
MASTER_DIR = REPO / "src" / "master"
PARTS_DIR = REPO / "parts"
WIDGETS_DIR = REPO / "src" / "shell" / "widgets"
DATA_DIR = REPO / "data"

# ---------- Canonical sampling table (§7A.6 «Базовые параметры» — S-a owner) ----------

# (param, [12B, 12B–32B, 32B+/API])
CANON_TABLE = [
    ("Temperature", ["0.6–0.8", "0.7–0.9", "0.7–1.0"]),
    ("Top P", ["0.9", "0.9–0.95", "0.9–0.95"]),
    ("Min P", ["0.05", "0.05–0.1", "0.05–0.1"]),
    ("RepPen", ["1.0–1.05", "1.05–1.10", "1.05–1.10"]),
    ("Top K", ["40", "40–80", "40–100"]),
    ("Presence Penalty", ["0.0", "0.0", "0.0"]),
]

# «Модель-специфичные рекомендации» (point recs — stay inside the envelopes)
MODEL_SPECIFIC = [
    ("12B (4K)", "0.6–0.7", "1.0"),
    ("32B+", "0.7–0.9", "1.05"),
    ("Claude API", "0.8–1.0", "—"),
    ("GPT API", "0.8–1.0", "—"),
]

# §7A.7 capability rows that survive S-b
CAPABILITY_ROWS = [
    "Размещение голоса",
    "XML-теги",
    "Уровень CoT",
    "Язык SP",
    "Anti-godmoding",
]

# E17 re-point comment tokens (S-c)
E17_COMMENT_TOKENS = [
    "sampling-cluster (iter 145)",
    "SHARED_REFERENCE",
    "DEC-22",
    "declared omission",
    "audit_sampling_parity.py",
]

# E12 AP-5 card (S-d) — old vs new
E12_OLD_FIX = "Держите RepPen 1.0–1.05. Используйте MinP вместо этого."
E12_NEW_FIX_ANCHORS = [
    "Держите RepPen в диапазоне своей модели — §7A.6",
    "никогда &gt; 1.10",
    "Используйте MinP вместо повышения RepPen",
]

# Global forbidden strings (content layers only): the §7A.7 / merged-envelope
# sides of the contradiction must be gone everywhere readers can reach.
GLOBAL_FORBIDDEN = ["0.85–1.1", "0.7–1.1", "1.0–1.10", "1.00–1.10"]

DISPOSED_FILES = [
    REPO / "visual-system" / "elements" / "E17-sampling-params.html",
    REPO / "visual-system" / "integration" / "component-extracts" / "E17-script.js",
    REPO / "visual-system" / "integration" / "component-extracts" / "E17-styles.css",
    REPO / "visual-system" / "integration" / "component-extracts" / "E17-visual.html",
    REPO / "visual-system" / "elements" / "E12-antipattern-catalog.html",
    REPO / "visual-system" / "integration" / "component-extracts" / "E12-script.js",
    REPO / "visual-system" / "integration" / "component-extracts" / "E12-styles.css",
    REPO / "visual-system" / "integration" / "component-extracts" / "E12-visual.html",
]

OBSERVATION_ANCHORS = [
    "**НАБЛЮДЕНИЕ:**",
    "эмпирические наблюдения, а не нормативные пороги",
]

errors = []
notes = []


def err(msg):
    errors.append(msg)


def read(path):
    return path.read_text(encoding="utf-8")


def md_section(text, start_re, end_re):
    lines = text.split("\n")
    start_idx = end_idx = None
    for i, line in enumerate(lines):
        if start_idx is None and re.match(start_re, line):
            start_idx = i
        elif start_idx is not None and re.match(end_re, line):
            end_idx = i
            break
    if start_idx is None:
        return None
    return "\n".join(lines[start_idx: end_idx if end_idx is not None else len(lines)])


def html_section(html, section_id):
    m = re.search(
        rf'<section[^>]*data-section="{section_id}".*?</section>', html, re.DOTALL
    )
    return m.group(0) if m else None


def parse_canon_table(section_text, n_cols):
    """Parse markdown table data rows -> [[cell, ...], ...]."""
    rows = []
    for line in section_text.split("\n"):
        if not line.startswith("|") or set(line.replace("|", "").strip()) <= set("-: "):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) == n_cols and not all(c.startswith(":-") for c in cells):
            rows.append(cells)
    return rows


def e17_column_block(master_html, tier_marker, next_marker):
    """Extract an E17 embed column block between two column markers."""
    m = re.search(
        rf'{re.escape(tier_marker)}(.*?)(?={re.escape(next_marker)})',
        master_html, re.DOTALL,
    )
    return m.group(1) if m else None


def main():
    canon7a = read(CANON_7A)
    canon8 = read(CANON_8)
    canon9 = read(CANON_9)
    canon_appe = read(CANON_APPE)
    master7a = read(MASTER_7A)
    master8 = read(MASTER_8)
    master9 = read(MASTER_9)
    master_appe = read(MASTER_APPE)

    # ---------- 1. Canonical record (Appendix E, SW-1 since iter 172) ----------
    sec76 = md_section(canon7a, r"^## 7A\.6 ", r"^## 7A\.7 ")
    if sec76 is None:
        err("canon §7A.6 section not found")
        return finish()
    # §7A.6 is a pointer now: the two hard constraints stay inline, the tables
    # live in Appendix E (v3 stage 2, iter 172 — the sampling ownership move).
    if "[ref: appendix_model_params.md — параметры генерации]" not in sec76:
        err("canon §7A.6: pointer to Appendix E missing")
    if "Presence Penalty = 0.0" not in sec76:
        err("canon §7A.6: PP = 0.0 hard constraint missing")
    if "RepPen ≤ 1.10" not in sec76:
        err("canon §7A.6: RepPen ≤ 1.10 hard constraint missing")
    if parse_canon_table(sec76, 5):
        err("canon §7A.6: value table must not live here (Appendix E owns it)")

    secE_sample = md_section(canon_appe, r"^### Параметры генерации", r"^### Налог")
    if secE_sample is None:
        err("canon Appendix E: «Параметры генерации» subsection not found")
    else:
        marker = re.search(r"^\[VS: E17 — .+\]$", secE_sample, re.MULTILINE)
        if not marker:
            err("canon Appendix E: [VS: E17] marker (full format) missing")
        else:
            m_text = marker.group(0)
            for token in ("SHARED_REFERENCE", "12B–32B", "audit_sampling_parity.py"):
                if token not in m_text:
                    err(f"canon Appendix E [VS: E17] marker: token missing: {token}")
        base_rows = parse_canon_table(secE_sample, 5)
        got = [
            (r[0].replace("**", ""), [c.replace("**", "") for c in r[1:4]])
            for r in base_rows
            if r[0].replace("**", "") in dict(CANON_TABLE)
        ]
        if got != CANON_TABLE:
            err(f"canon Appendix E: «Базовые параметры» table mismatch — expected "
                f"{CANON_TABLE}, got {got}")
        if secE_sample.count("**ПРАВИЛО:**") != 2:
            err("canon Appendix E: PP = 0.0 / Ollama ПРАВИЛО callouts != 2")
        if "Ollama и LM Studio" not in secE_sample:
            err("canon Appendix E: Ollama/LM Studio PP rule missing")
        for model, temp, reppen in MODEL_SPECIFIC:
            row = next((r for r in parse_canon_table(secE_sample, 4)
                        if r and r[0] == f"**{model}**"), None)
            if row is None or temp not in row[1] or reppen not in row[2]:
                err(f"canon Appendix E: «Модель-специфичные» row wrong/missing: {model}")
        if "Никогда > 1.10" not in secE_sample:
            err("canon Appendix E: AP-5 boundary note (Никогда > 1.10) missing")
    notes.append("canonical record Appendix E: 6×3 table (S-a values exact) + full "
                 "[VS: E17] marker + PP rules ×2 + model-specific point recs ×4; "
                 "§7A.6 keeps the two hard constraints + a pointer")

    # ---------- 2. Canon §7A.7 (S-b) pointer + Appendix E capability rows ----------
    sec77 = md_section(canon7a, r"^## 7A\.7 ", r"^## 7A\.8 ")
    if sec77 is None:
        err("canon §7A.7 section not found")
    else:
        for param in ("Temperature", "Presence Penalty", "RepPen"):
            if re.search(rf"^\| {re.escape(param)} \|", sec77, re.MULTILINE):
                err(f"canon §7A.7: param row still present: {param}")
        if parse_canon_table(sec77, 4):
            err("canon §7A.7: capability table must live in Appendix E now")
        if "[ref: appendix_model_params.md — возможности моделей]" not in sec77:
            err("canon §7A.7: pointer to Appendix E missing")

    cap_rows = parse_canon_table(canon_appe, 4)

    def cap_row(name):
        return next((r for r in cap_rows if r and r[0] == name), None)

    # G1 (iter 166) values stay locked, now in the Appendix E merged table:
    # CoT working level §6.2-aligned (v3 S4a: bridge merged into basics; tiers = §6.2) (Tier 0 / Tier 1–2 / Tier 2–3), AG 2/2/1.
    cot_row = cap_row("Рабочий уровень CoT")
    if cot_row is None:
        err("canon Appendix E: CoT capability row missing/unparseable")
    else:
        for cell, needle in zip(cot_row[1:4],
                                ("Tier 0", "Tier 1–2", "Tier 2–3")):
            if needle not in cell:
                err(f"canon Appendix E: CoT cell must carry {needle!r} — got {cell!r}")
        if "part_06.md §6.2" not in cot_row[1]:
            err("canon Appendix E: CoT row §6.2 tier-owner ref missing")
    eff_row = cap_row("Эффективность CoT")
    if eff_row is None:
        err("canon Appendix E: CoT capability-envelope row missing")
    else:
        for cell, needle in zip(eff_row[1:4], ("Tier 0–1", "Tier 0–3", "Tier 0–3")):
            if needle not in cell:
                err(f"canon Appendix E: CoT envelope cell must carry {needle!r}")
    ag_row = cap_row("Anti-godmoding")
    if ag_row is None:
        err("canon Appendix E: Anti-godmoding row missing/unparseable")
    else:
        for cell, needle in zip(ag_row[1:4], ("2 строки", "2 строки", "1 строка")):
            if needle not in cell:
                err(f"canon Appendix E: Anti-godmoding cell must carry "
                    f"{needle!r} — got {cell!r}")
    voice_row = cap_row("Размещение голоса")
    if voice_row is None:
        err("canon Appendix E: voice-placement row missing")
    else:
        for cell in voice_row[1:4]:
            if "никогда в Description" not in cell:
                err("canon Appendix E: voice-placement cell lost «никогда в Description»")
    lang_row = cap_row("Язык SP")
    if lang_row is None or "64K" not in lang_row[1] or "128K" not in lang_row[1]:
        err("canon Appendix E: SP-language thresholds row missing/limp")
    for row in CAPABILITY_ROWS:
        if row not in ("Уровень CoT",) and cap_row(row) is None:
            err(f"canon Appendix E: capability row missing: {row}")
    notes.append("canon §7A.7: params + capability table moved to Appendix E (pointer "
                 "only); G1 iter 166 values stay locked in the Appendix E merged "
                 "table (CoT Tier 0 / Tier 1–2 / Tier 2–3, AG 2/2/1, voice, SP language)")

    # ---------- 3. Master §7A.6 pointer mirror ----------
    m76 = html_section(master7a, "p7a_sampling_params")
    if m76 is None:
        err("master: p7a_sampling_params section not found")
    else:
        if 'href="#appendix_model_params"' not in m76:
            err("master §7A.6: Appendix E pointer link missing")
        if "Presence Penalty = 0.0" not in m76:
            err("master §7A.6: PP = 0.0 hard constraint missing")
        if "RepPen ≤ 1.10" not in m76:
            err("master §7A.6: RepPen ≤ 1.10 hard constraint missing")
        if m76.count("ПРАВИЛО:") != 2:
            err("master §7A.6: ПРАВИЛО callouts != 2")
        if "<th>12B</th>" in m76 or "Модель-специфичные рекомендации" in m76:
            err("master §7A.6: value/model tables must live in Appendix E now")
    notes.append("master §7A.6 mirror: two hard constraints + Appendix E pointer; "
                 "no value table")

    # ---------- 4. Master §7A.7 pointer mirror ----------
    m77 = html_section(master7a, "p7a_model_checklist")
    if m77 is None:
        err("master: p7a_model_checklist section not found")
    else:
        if 'href="#appendix_model_params"' not in m77:
            err("master §7A.7: Appendix E pointer link missing")
        if "<th>Параметр</th>" in m77 or "<th>Temperature</th>" in m77 \
                or "<th>Возможность</th>" in m77:
            err("master §7A.7: param/capability table must not reappear")
        if "CoT Tier 0" in m77:
            err("master §7A.7: capability bullets must be gone (Appendix E owns them)")
    notes.append("master §7A.7 mirror: pointer only (capability table lives in "
                 "Appendix E)")

    # ---------- 5. E17 embed (S-c) ----------
    e17 = re.search(
        r'<div class="vs-embed" data-vs-element="E17">.*?'
        r"<!-- REPLACED BY VISUAL SYSTEM: E17 -->",
        master_appe, re.DOTALL,
    )
    if not e17:
        err("master Appendix E: E17 embed not found")
    else:
        e17_text = e17.group(0)
        for token in E17_COMMENT_TOKENS:
            if token not in e17_text:
                err(f"E17 embed: re-point comment token missing: {token}")
        col32 = e17_column_block(
            e17_text, "param-column--32b", "param-column--api")
        if col32 is None:
            err("E17 embed: 32B+ column block not found")
        else:
            for needle in (">Temperature</span>", ">0.7–1.0</span>",
                           ">RepPen</span>", ">1.05–1.10</span>",
                           ">Top P</span>", ">0.9–0.95</span>",
                           ">Min P</span>", ">0.05–0.1</span>",
                           ">Top K</span>", ">40–100</span>", ">0.0"):
                if needle not in col32:
                    err(f"E17 32B+ column: canonical value missing: {needle}")
            for banned in ("sub-range", "0.7–1.1", "0.85–1.1", "1.0–1.10",
                           "1.1*", "базовая", "чеклист", "с осторожностью"):
                if banned in col32:
                    err(f"E17 32B+ column: banned dual-side token present: {banned}")
        col12 = e17_column_block(
            e17_text, "param-column--12b", "param-column--32b")
        if col12 is None:
            err("E17 embed: 12B column block not found")
        else:
            for needle in (">0.6–0.8</span>", ">1.0–1.05</span>", ">0.9</span>",
                           ">0.05</span>", ">40</span>", ">0.0"):
                if needle not in col12:
                    err(f"E17 12B column: canonical value missing: {needle}")
        colapi = e17_column_block(
            e17_text, "param-column--api", "Model Type Checklist")
        if colapi is None:
            err("E17 embed: API column block not found")
        else:
            for needle in (">0.8–1.0</span>", "N/A", ">40–100</span>", ">0.0"):
                if needle not in colapi:
                    err(f"E17 API column: value missing: {needle}")
        if e17_text.count('param-row__value">0.0 <span class="danger-marker"') != 3:
            err("E17 embed: PP = 0.0 must appear in all three columns")
        if "Чеклист по типу модели" not in e17_text:
            err("E17 embed: model-type checklist section missing")
        # G1 (iter 166): the E17 capability checklist re-pointed to the §7A.7
        # canon values (SHARED_REFERENCE — the DEC-22 re-point pattern)
        for needle in (">Tier 0</span>", ">Tier 1–2</span>",
                       ">Tier 2–3</span>"):
            if needle not in e17_text:
                err(f"E17 checklist: CoT cell missing canon value: {needle!r}")
        for banned in (">0–1</span>", ">1–2</span>", ">3</span>"):
            if banned in e17_text:
                err(f"E17 checklist: stale CoT cell remains: {banned!r}")
        if e17_text.count(">2 строки</span>") != 2 \
                or ">1 строка</span>" not in e17_text:
            err("E17 checklist: Anti-godmoding row must be 2/2/1 (canon §7A.7)")
    notes.append("E17 embed: re-pointed to §7A.6 (32B+ column = canonical "
                 "0.7–1.0 / 1.05–1.10; no dual-side split, no orphan asterisk; "
                 "12B–32B middle tier = declared omission); G1 iter 166: the "
                 "capability checklist carries the §7A.7 canon values "
                 "(CoT Tier 0 / Tier 1–2 / Tier 2–3; AG 2/2/1)")

    # ---------- 6. E12 embed (S-d) ----------
    e12 = re.search(
        r'<div class="vs-embed" data-vs-element="E12">.*?'
        r"<!-- REPLACED BY VISUAL SYSTEM",
        master8, re.DOTALL,
    )
    if not e12:
        err("master: E12 embed not found")
    else:
        e12_text = e12.group(0)
        if "sampling-cluster (iter 145)" not in e12_text \
                or "audit_sampling_parity.py" not in e12_text:
            err("E12 embed: re-point comment (iter 145) missing")
        if E12_OLD_FIX in e12_text:
            err("E12 embed: old unqualified AP-5 fix text remains")
        for anchor in E12_NEW_FIX_ANCHORS:
            if anchor not in e12_text:
                err(f"E12 embed: AP-5 re-frame anchor missing: {anchor}")
        if e12_text.count("1.0–1.05"):
            err("E12 embed: unqualified «1.0–1.05» still present")
    notes.append("E12 embed: AP-5 fix card re-framed (model-qualified defer + "
                 "AP-5 boundary), re-point comment present")

    # ---------- 7. Hint re-frames (§9.1 / §9.2 / §9.7, canon + master) ----------
    # iter 173 (v3 Stage 3): Part 9 renumbered 9.1–9.7 — the per-block scan is §9.1,
    # the symptom table §9.2 (absorbs the retired §9.4 pointer-only section),
    # the 12B delta §9.7. The old §9.4 block is gone; its #4/#5 fold pointer guard
    # moved into the §9.2 check below.
    c93 = md_section(canon9, r"^## 9\.1 ", r"^## 9\.2 ")
    if c93 is None:
        err("canon §9.1 section not found")
    else:
        if "(1.0–1.05 для 12B" not in c93:
            err("canon §9.1: RepPen check not 12B-qualified")
        if "(рекомендация 1.0–1.05)" in c93:
            err("canon §9.1: stale unqualified parenthetical remains")
    c95 = md_section(canon9, r"^## 9\.2 ", r"^## 9\.3 ")
    if c95 is None:
        err("canon §9.2 section not found")
    else:
        if "| #4: Повторяющиеся фразы |" not in c95:
            err("canon §9.2: #4 row label missing (iter 156 fold, kept iter 173)")
        if "| #5: Модель игнорирует характер |" not in c95:
            err("canon §9.2: #5 row label missing (iter 156 fold, kept iter 173)")
        # the retired §9.4 pointer section's living form: the #4/#5 fold note
        if "строки #4/#5" not in c95:
            err("canon §9.2: #4/#5 fold pointer missing (absorbed §9.4, iter 173)")
    c910 = md_section(canon9, r"^## 9\.7 ", r"(?!)")
    if c910 is None:
        err("canon §9.7 section not found")
    else:
        if "RepPen 1.02–1.05 (12B-диапазон —" not in c910 \
                or "`[ref: part_07a.md §7A.6]`" not in c910:
            err("canon §9.7: «Повторы фраз» row not 12B-qualified with §7A.6 ref")
        if "RepPen 1.02-1.05," in c910:
            err("canon §9.7: stale unqualified row remains")
    for line in canon9.split("\n"):
        if "1.0–1.05" in line and "12B" not in line:
            err(f"canon part_09.md: unqualified «1.0–1.05» line: {line.strip()[:80]}")
    for line in master9.split("\n"):
        if "1.0–1.05" in line and "12B" not in line:
            err(f"master part_09.html: unqualified «1.0–1.05» line: "
                f"{line.strip()[:80]}")
    m93 = html_section(master9, "p9_basic_checklist")
    if m93 and "(1.0–1.05 для 12B" not in m93:
        err("master §9.1: RepPen check not 12B-qualified")
    m95 = html_section(master9, "p9_symptom_table")
    if m95 and ("#4: Повторяющиеся фразы" not in m95
                or "#5: Модель игнорирует характер" not in m95):
        err("master §9.2: #4/#5 row labels missing (iter 156 fold)")
    if m95 and "строки #4/#5" not in m95:
        err("master §9.2: #4/#5 fold pointer missing (absorbed §9.4, iter 173)")
    m910 = html_section(master9, "p9_12b_issues")
    if m910 and "(12B-диапазон — <a href=\"#p7a_sampling_params\">§7A.6</a>)" not in m910:
        err("master §9.10: «Повторы фраз» row mirror not qualified")
    notes.append("hint re-frames: §9.1 / §9.7 model-qualified (canon + master) "
                 "+ the #4/#5 fold pointer (iter 156) now lives in §9.2 "
                 "(§9.4 absorbed, iter 173); "
                 "every Part 9 «1.0–1.05» line carries a 12B qualifier")

    # ---------- 8. Appendix E OBSERVATION (DEC-20 first application) ----------
    for anchor in OBSERVATION_ANCHORS:
        if anchor not in canon_appe:
            err(f"canon Appendix E: OBSERVATION anchor missing: {anchor}")
    obs = re.search(
        r'<div class="callout">\s*<p><strong>НАБЛЮДЕНИЕ:</strong>.*?</div>',
        master_appe, re.DOTALL,
    )
    if not obs:
        err("master Appendix E: НАБЛЮДЕНИЕ callout missing (base .callout)")
    notes.append("Appendix E: first OBSERVATION-strength application preserved "
                 "(«НАБЛЮДЕНИЕ» + base .callout — registered component)")

    # ---------- 9. Glossary defers ----------
    registry = read(GLOSSARY_REGISTRY)
    if "Канонический диапазон — таблица Приложения E" not in registry:
        err("glossary_registry: RepPen entry no longer defers to Appendix E")
    if GLOSSARY_JSON.exists():
        if "таблица Приложения E" not in read(GLOSSARY_JSON):
            err("data/glossary.json: RepPen defer missing (regenerate: "
                "pnpm run build:glossary)")
    else:
        err("data/glossary.json not found")
    notes.append("glossary defers: registry + generated JSON point at Appendix E "
                 "(5th location stays eliminated)")

    # ---------- 10. No competing ranges anywhere (content layers) ----------
    content_files = sorted(CANON_DIR.glob("*.md")) + sorted(MASTER_DIR.glob("*.html")) \
        + sorted(PARTS_DIR.glob("*.html")) + sorted(WIDGETS_DIR.glob("*.js")) \
        + sorted(DATA_DIR.glob("*.json"))
    for path in content_files:
        text = read(path)
        for needle in GLOBAL_FORBIDDEN:
            count = text.count(needle)
            if count:
                err(f"{path.relative_to(REPO)}: competing range «{needle}» "
                    f"×{count}")
    notes.append("no competing sources: «0.85–1.1» / «0.7–1.1» / «1.0–1.10» / "
                 "«1.00–1.10» = zero across canon + master + parts + widgets + data")

    # ---------- 11. Root fallbacks current ----------
    for path, needles in (
        (FALLBACK_7A, ["Presence Penalty = 0.0", "RepPen ≤ 1.10",
                       'href="#appendix_model_params"']),
        (FALLBACK_8, ["Держите RepPen в диапазоне своей модели — §7A.6"]),
        (FALLBACK_9, ["(1.0–1.05 для 12B", "(12B-диапазон — "
                      "<a href=\"#p7a_sampling_params\">§7A.6</a>)"]),
        (FALLBACK_APPE, [">0.7–1.0</span>", ">1.05–1.10</span>",
                         "sampling-cluster (iter 145)",
                         ">Tier 0</span>", ">1 строка</span>", "НАБЛЮДЕНИЕ:"]),
    ):
        if not path.exists():
            err(f"{path.relative_to(REPO)} not found — rebuild required "
                f"(pnpm run build)")
        else:
            text = read(path)
            for needle in needles:
                if needle not in text:
                    err(f"{path.relative_to(REPO)}: stale — «{needle}» missing "
                        f"(rebuild required: pnpm run build)")
            for needle in GLOBAL_FORBIDDEN:
                if needle in text:
                    err(f"{path.relative_to(REPO)}: stale — «{needle}» present")
    notes.append("root fallbacks current: part_07a / part_08 / part_09 / "
                 "appendix_model_params carry the slice")

    # ---------- 12. Map / matrix / registries / state parity ----------
    map_text = read(MAP)
    if "### 5.7 Sampling values slice" not in map_text:
        err("migration_map_v2.md: §5.7 sampling slice missing")
    else:
        slice_57 = md_section(map_text, r"^### 5\.7 ", r"^## 6\. ")
        sp_rows = re.findall(r"^\| SP-(\d+) \|", slice_57 or "", re.MULTILINE)
        if sorted(int(n) for n in sp_rows) != list(range(1, 13)):
            err(f"migration_map_v2.md §5.7: expected SP-1..SP-12 rows, got "
                f"{sp_rows}")
        if slice_57 and "executed iter 145" not in slice_57:
            err("migration_map_v2.md §5.7: execution status (iter 145) missing")
    e17_row = next((ln for ln in map_text.split("\n")
                    if ln.startswith("| E17 |")), None)
    if e17_row is None or "iter 145" not in e17_row:
        err("migration_map_v2.md: Registry A E17 row does not record the "
            "iter-145 execution")
    e12_row = next((ln for ln in map_text.split("\n")
                    if ln.startswith("| E12 |")), None)
    if e12_row is None or "iter 145" not in e12_row:
        err("migration_map_v2.md: Registry A E12 row does not record the "
            "iter-145 execution")
    row_b2 = next((ln for ln in map_text.split("\n")
                   if ln.startswith("| Sampling values")), None)
    if row_b2 is None or "executed iter 145" not in row_b2.lower():
        err("migration_map_v2.md: Registry B sampling row does not record the "
            "iter-145 execution")
    if "DECIDED (DEC-22" not in map_text:
        err("migration_map_v2.md: DEC-22 not recorded")
    if not re.search(r"\*\*iter 145 \(", map_text):
        err("migration_map_v2.md: §7 iteration log entry for iter 145 missing")

    matrix = read(MATRIX)
    for row_id in ("p7a_sampling_params::02", "p7a_sampling_params::03",
                   "p7a_model_checklist::01", "p7a_model_checklist::02",
                   "p8_ap5_reppen_high::01", "p9_basic_checklist::03",
                   "p9_12b_issues::03"):
        row = next((ln for ln in matrix.split("\n") if f"| {row_id} |" in ln), None)
        if row is None:
            err(f"editorial_matrix.md: row {row_id} not found")
        elif "migration_map_v2 SP-" not in row:
            err(f"editorial_matrix.md: row {row_id} missing back-pointer "
                f"→ migration_map_v2 SP-<n>")
    r12 = next((ln for ln in matrix.split("\n") if ln.startswith("| R12 |")), None)
    if r12 is None or "iter 145" not in r12:
        err("editorial_matrix.md: R12 row does not record the iter-145 execution")

    status = read(STATUS)
    ki72 = next((ln for ln in status.split("\n") if ln.startswith("| KI#72 |")), None)
    if ki72 is not None:
        # Pre-deletion state (iters 145-147): the live row carries the fix.
        if "CLOSED iter-145" not in ki72:
            err("STATUS.md: KI#72 not marked CLOSED iter-145")
    elif "KI#72 (CLOSED iter-145) row deleted per lifecycle" not in status:
        # Lifecycle-deleted state (iter 148+): AGENTS.md KI lifecycle deletes
        # the row after 2+ closed iterations; the durable record = the
        # lifecycle note here + git history (iter-145 commit 0ed3d787).
        err("STATUS.md: KI#72 neither a CLOSED iter-145 row nor a recorded "
            "lifecycle deletion")

    if "audit_sampling_parity.py" not in read(AGENTS):
        err("AGENTS.md: canon-audits block does not carry audit_sampling_parity.py")

    for path in DISPOSED_FILES:
        if path.exists():
            err(f"{path.relative_to(REPO)} still exists (DEC-19 disposal "
                f"incomplete)")

    # ---------- Deferred layers (reported, never failed) ----------
    plan = REPO / "visual-system" / "PLAN.md"
    notes.append(f"{plan.relative_to(REPO)}: frozen design doc (DEC-19) — the "
                 "E17/E12 table copies resolve to git history")
    notes.append("canon front-matter vs_embedded staleness rides the v2 canon "
                "format (pre-existing, repo-wide)")
    notes.append("drift tool: canon [ref:] ↔ master <a> normalization asymmetry "
                "is informational (audit_canon_master_drift.py exit 0)")

    return finish()


def finish():
    print("Sampling values parity audit (sampling-cluster, iter 145, DEC-22)")
    for n in notes:
        print(f"  - {n}")
    if errors:
        print(f"\nFAIL — {len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — single canonical owner intact: Appendix E «Параметры "
          "генерации» canonical (6×3 table + model-specific recs + full "
          "[VS: E17] marker), §7A.6 = the two hard constraints + pointer, "
          "§7A.7 = pointer, E17 the one visual presentation (re-pointed to "
          "«32B+ / API» values, declared 12B–32B omission), E12/§9.x hints "
          "model-qualified, Appendix E OBSERVATION applied, glossary defers, "
          "no competing ranges, root fallbacks current, KI#72 CLOSED.")


if __name__ == "__main__":
    main()
