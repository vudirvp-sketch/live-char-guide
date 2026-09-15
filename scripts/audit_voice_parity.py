#!/usr/bin/env python3
"""
audit_voice_parity.py — voice-cluster acceptance audit (iter 142, DEC-21 /
Registry B row 7 — the last unexecuted bounded area, now executed).

Verifies the Voice influence % cluster single-canonical-owner architecture
across every presentation layer of the v1 inventory
(voice_cluster_iter141.md §2; migration foundation §5.7):

    §3.2 (canon + master)   = THE canonical value owner of the 6×3 table
                              (SHARED_REFERENCE) + the canonical home of the
                              E07 inset prose and the two widget quantitative
                              claims (TEXTUAL_CANONICAL, DEC-21 V-b/V-c) —
                              full [VS: E07] marker + prose block
    E07 master embed         = the visual presentation of both — re-pointed,
                              values + row-label set parity-locked by this
                              audit (V-a/V-e)
    persona-voice-hierarchy  = DEC-09 sanctioned constants — header declares
                              note deference to §3.2; values parity-locked;
                              AN-12B note re-framed per V-d Option A
    §7A.5 / §7A.7            = AN-12B framing re-framed (V-d Option A: table
                              wins — «пренебрежимо мало (~2%)», no numeric
                              change); E16 badge carries the derivation note
                              (диапазон = мин–макс строки AN — §3.2, E15
                              derivation-note pattern)
    glossary                 = defers (value restatement in the ratified
                              Voice Isolation entry; DEC-17/18 chain)
    E07 prototype + extracts = REMOVED_WITH_REASON (DEC-19 disposal at slice
                              time; archive = git history)

Checks:
 1. Canonical record (canon §3.2): full [VS: E07] marker (SHARED_REFERENCE +
    TEXTUAL_CANONICAL + audit name); 6×3 table (18 values); row-1 label
    «Недавний чат» (V-e); prose block «Хранилище ≠ Влияние» (misconception
    correction + ~10–20 messages + ~5 replies + ~75–85%); [INTERACTIVE
    WIDGET] marker extended with the notes disposition (V-c).
 2. Master §3.2 mirror: same table (18 values) + row-1 label + prose block
    <p> + widget container + the 12B RULE callout intact.
 3. E07 embed (visual presentation): re-point comment (DEC-21); declared
    row-label set (embed set — SP stays the compressed form, V-e);
    «0% ЗАПРЕЩЕНО» + «~0%» + «~75-85% (сжатая шкала)» markers; «Хранилище vs
    Влияние» inset present; no stale «Recent chat».
 4. Widget: VOICE_SOURCES 18 values == canon table 6/6 rows; label set ==
    canonical set; the two canonicalized claims present; AN-12B note =
    Option A wording; header note-deference declaration.
 5. V-d Option A re-frames: canon §7A.5 note + §7A.7 РЕКОМЕНДАЦИЯ; master
    §7A.7 mirror; E16 badge derivation note (master) + canon E16 marker
    derivation sentence; zero «AN не влияет» statements anywhere.
 6. Glossary defers: registry entry carries the value restatement + §3.1
    ref; generated data/glossary.json matches.
 7. No competing sources: prose-block anchors counted per layer.
 8. Root fallback current: parts/part_03.html + parts/part_07a.html +
    widgets/persona-voice-hierarchy.js carry the slice.
 9. Map/matrix/registries parity: §5.6 VC-1..VC-10; Registry A E07 +
    Registry B row 7 + §6 row 6 → DECIDED (DEC-21) / executed iter 142;
    matrix back-pointers; content_map §3.2 Notes fix (KI#82); disposal
    complete; AGENTS.md canon-audits carries the gate.

Deferred layers (reported as notes, never failures):
  - visual-system/PLAN.md L605 table copy (frozen design doc, DEC-19 —
    archive = git history);
  - E16 prototype/extract (frozen, DEC-19 — E16 family slice pending; the
    derivation note intentionally lives only in the embed);
  - canon front-matter `vs_embedded` staleness (repo-wide, rides the v2
    canon format);
  - drift-tool [ref:]↔<a> normalization asymmetry (informational;
    audit_canon_master_drift.py exit 0 by design).

Exit codes: 0 — PASS; 1 — FAIL (messages above).
Run: python3 scripts/audit_voice_parity.py
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CANON_3 = REPO / "docs" / "canon" / "part_03.md"
MASTER_3 = REPO / "src" / "master" / "part_03.html"
CANON_7A = REPO / "docs" / "canon" / "part_07a.md"
MASTER_7A = REPO / "src" / "master" / "part_07a.html"
WIDGET = REPO / "src" / "shell" / "widgets" / "persona-voice-hierarchy.js"
WIDGET_FALLBACK = REPO / "widgets" / "persona-voice-hierarchy.js"
GLOSSARY_REGISTRY = REPO / "docs" / "canon" / "glossary_registry.md"
GLOSSARY_JSON = REPO / "data" / "glossary.json"
FALLBACK_3 = REPO / "parts" / "part_03.html"
FALLBACK_7A = REPO / "parts" / "part_07a.html"
MAP = REPO / "docs" / "research" / "migration_map_v2.md"
MATRIX = REPO / "docs" / "research" / "editorial_matrix.md"
CONTENT_MAP = REPO / "docs" / "content_map.md"
AGENTS = REPO / "AGENTS.md"
CANON_DIR = REPO / "docs" / "canon"
MASTER_DIR = REPO / "src" / "master"

# ---------- Voice inventory (canonical 6×3 table — the value owner) ----------

# (row label, [12B, 32B+, API])
CANON_TABLE = [
    ("Недавний чат", [85, 80, 75]),
    ("Examples", [10, 12, 15]),
    ("Greeting", [3, 5, 5]),
    ("Author's Note", [2, 3, 5]),
    ("Description", [0, 3, 5]),
    ("System Prompt", [0, 1, 2]),
]

# The E07 embed row-label set (V-e: E07's existing labels stay as-is —
# row 6 uses the compressed «SP» form).
EMBED_LABELS = [
    "Недавний чат",
    "Examples",
    "Greeting",
    "Author's Note",
    "Description",
    "SP",
]

WIDGET_ROW_RE = re.compile(
    r"\{\s*id:\s*'(\w+)'\s*,\s*label:\s*(?:'([^']*)'|\"([^\"]*)\")\s*,\s*"
    r"models:\s*\{\s*'12B':\s*(\d+)\s*,\s*'32B\+':\s*(\d+)\s*,\s*'API':\s*(\d+)\s*\}"
)

PROSE_ANCHORS = [
    "**Хранилище ≠ Влияние.**",
    "Пользователи часто предполагают",
    "~10–20 сообщений",
    "~5 реплик",
    "~75–85% по моделям",
]

RE_FRAME = "влияние AN на голос пренебрежимо мало (~2%)"

DISPOSED_FILES = [
    REPO / "visual-system" / "elements" / "E07-voice-hierarchy.html",
    REPO / "visual-system" / "integration" / "component-extracts" / "E07-script.js",
    REPO / "visual-system" / "integration" / "component-extracts" / "E07-styles.css",
    REPO / "visual-system" / "integration" / "component-extracts" / "E07-visual.html",
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
    return "\n".join(lines[start_idx : end_idx if end_idx is not None else len(lines)])


def html_section(html, section_id):
    m = re.search(
        rf'<section[^>]*data-section="{section_id}".*?</section>', html, re.DOTALL
    )
    return m.group(0) if m else None


def parse_md_table_rows(section_text):
    """Parse markdown table data rows -> [(label, [v12, v32, vapi])]."""
    rows = []
    for line in section_text.split("\n"):
        if not line.startswith("|") or set(line.replace("|", "").strip()) <= set("-: "):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) != 4 or cells[0] == "Источник":
            continue
        label = cells[0].replace("**", "")
        values = []
        ok = True
        for cell in cells[1:]:
            m = re.search(r"(\d+)%", cell.replace("**", ""))
            if not m:
                ok = False
                break
            values.append(int(m.group(1)))
        if ok:
            rows.append((label, values))
    return rows


def parse_html_table_rows(table_html):
    """Parse HTML table data rows -> [(label, [v12, v32, vapi])]."""
    rows = []
    for m in re.finditer(r"<tr>(.*?)</tr>", table_html, re.DOTALL):
        cells = re.findall(r"<td[^>]*>(.*?)</td>", m.group(1))
        if len(cells) != 4:
            continue
        label = re.sub(r"<[^>]+>", "", cells[0]).strip()
        values = []
        ok = True
        for cell in cells[1:]:
            cm = re.search(r"(\d+)%", re.sub(r"<[^>]+>", "", cell))
            if not cm:
                ok = False
                break
            values.append(int(cm.group(1)))
        if ok:
            rows.append((label, values))
    return rows


def parse_widget_sources(js_text):
    rows = []
    for m in WIDGET_ROW_RE.finditer(js_text):
        label = m.group(2) if m.group(2) is not None else m.group(3)
        rows.append((label, [int(m.group(4)), int(m.group(5)), int(m.group(6))]))
    return rows


def main():
    canon3 = read(CANON_3)
    master3 = read(MASTER_3)
    canon7a = read(CANON_7A)
    master7a = read(MASTER_7A)
    widget = read(WIDGET)

    # ---------- 1. Canonical record (canon §3.2) ----------
    sec32 = md_section(canon3, r"^## 3\.2 ", r"^## 3\.3 ")
    if sec32 is None:
        err("canon §3.2 section not found")
        return finish()
    marker = re.search(r"^\[VS: E07 — .+\]$", sec32, re.MULTILINE)
    if not marker:
        err("canon §3.2: [VS: E07] marker (full format) missing")
    else:
        m_text = marker.group(0)
        for token in ("SHARED_REFERENCE", "TEXTUAL_CANONICAL",
                      "audit_voice_parity.py"):
            if token not in m_text:
                err(f"canon §3.2 [VS: E07] marker: token missing: {token}")
    canon_rows = parse_md_table_rows(sec32)
    if canon_rows != CANON_TABLE:
        err(f"canon §3.2: table mismatch — expected {CANON_TABLE}, got {canon_rows}")
    for anchor in PROSE_ANCHORS:
        if anchor not in sec32:
            err(f"canon §3.2: prose block anchor missing: {anchor}")
    widget_marker = re.search(r"^\[INTERACTIVE WIDGET: persona-voice-hierarchy[^\]]*\]",
                               sec32, re.MULTILINE)
    if not widget_marker:
        err("canon §3.2: [INTERACTIVE WIDGET] marker missing")
    else:
        w_text = widget_marker.group(0)
        if "канонизированы в прозе §3.2" not in w_text:
            err("canon §3.2 [INTERACTIVE WIDGET] marker: notes disposition "
                "(V-c) missing")
        for claim in ("~10–20 сообщений", "~5 реплик"):
            if claim not in w_text:
                err(f"canon §3.2 [INTERACTIVE WIDGET] marker: claim missing: "
                    f"{claim}")
    notes.append("canonical record §3.2: 6×3 table (18 values) + full "
                 "[VS: E07] marker + prose block + notes-disposed widget marker")

    # ---------- 2. Master §3.2 mirror ----------
    m32 = html_section(master3, "p3_influence_hierarchy")
    if m32 is None:
        err("master: p3_influence_hierarchy section not found")
        return finish()
    master_rows = parse_html_table_rows(m32)
    if master_rows != CANON_TABLE:
        err(f"master §3.2: table mismatch — expected {CANON_TABLE}, got "
            f"{master_rows}")
    for anchor in PROSE_ANCHORS:
        html_anchor = anchor.replace("**", "")
        if html_anchor not in m32:
            err(f"master §3.2: prose block mirror anchor missing: {html_anchor}")
    if 'id="persona-voice-hierarchy"' not in m32:
        err("master §3.2: widget container missing")
    if "Description = 0% влияния на лингвистический голос" not in m32:
        err("master §3.2: 12B RULE callout altered (audit anchor)")
    notes.append("master §3.2 mirror: table + prose block + widget container; "
                 "RULE anchor intact")

    # ---------- 3. E07 embed (visual presentation) ----------
    e07 = re.search(
        r'<div class="vs-embed" data-vs-element="E07">.*?'
        r"<!-- REPLACED BY VISUAL SYSTEM: E07 -->",
        master3, re.DOTALL,
    )
    if not e07:
        err("master: E07 embed not found")
    else:
        e07_text = e07.group(0)
        if "voice-cluster (iter 142)" not in e07_text:
            err("E07 embed: re-point comment (iter 142) missing")
        for token in ("SHARED_REFERENCE", "TEXTUAL_CANONICAL (DEC-21)",
                      "audit_voice_parity.py"):
            if token not in e07_text:
                err(f"E07 embed: re-point comment token missing: {token}")
        for label in EMBED_LABELS:
            if f">{label}</text>" not in e07_text:
                err(f"E07 embed: row label missing: {label}")
        for token in ("0% ЗАПРЕЩЕНО", "~0%", "~75-85% (сжатая шкала)",
                      "Хранилище vs Влияние"):
            if token not in e07_text:
                err(f"E07 embed: presentation marker missing: {token}")
        if "Recent chat" in e07_text:
            err("E07 embed: stale «Recent chat» label present")
    if "Recent chat" in sec32:
        err("canon §3.2: stale «Recent chat» label present")

    # ---------- 4. Widget (DEC-09 constants + note deference) ----------
    widget_rows = parse_widget_sources(widget)
    if widget_rows != CANON_TABLE:
        err(f"widget: VOICE_SOURCES mismatch — expected {CANON_TABLE}, got "
            f"{widget_rows}")
    if "voice-cluster (iter 142, DEC-21)" not in widget:
        err("widget: header note-deference declaration missing")
    for claim in ("~10–20 сообщений", "~5 реплик"):
        if claim not in widget:
            err(f"widget: canonicalized claim missing from notes: {claim}")
    if "пренебрежимо мало (~2%" not in widget:
        err("widget: AN-12B note not re-framed (V-d Option A wording missing)")

    # ---------- 5. V-d Option A re-frames + E16 derivation ----------
    sec75 = md_section(canon7a, r"^## 7A\.5 ", r"^## 7A\.6 ")
    if sec75 is None:
        err("canon §7A.5 section not found")
    else:
        if "пренебрежимо мало (~2%)" not in sec75:
            err("canon §7A.5: AN-12B note not re-framed (Option A)")
        if "мин–макс строки AN" not in sec75:
            err("canon §7A.5: E16 range derivation sentence missing")
    sec77 = md_section(canon7a, r"^## 7A\.7 ", r"^## 7A\.8 ")
    if sec77 is None:
        err("canon §7A.7 section not found")
    elif RE_FRAME not in sec77:
        err("canon §7A.7: РЕКОМЕНДАЦИЯ not re-framed (Option A wording missing)")
    if RE_FRAME not in master7a:
        err("master §7A.7: mirror of the re-framed РЕКОМЕНДАЦИЯ missing")
    e16 = re.search(
        r'<div class="vs-embed" data-vs-element="E16">.*?'
        r"<!-- REPLACED BY VISUAL SYSTEM: E16 -->",
        master7a, re.DOTALL,
    )
    if not e16:
        err("master: E16 embed not found")
    elif "диапазон = мин–макс строки AN — §3.2" not in e16.group(0):
        err("E16 embed: badge derivation note missing (E15 pattern)")
    if "диапазон = мин–макс строки AN по моделям" not in canon7a:
        err("canon §7A.5 E16 marker: derivation sentence missing")
    # No stale AN-12B statements anywhere.
    for path in sorted(CANON_DIR.glob("part_*.md")) + sorted(MASTER_DIR.glob("*.html")):
        count = read(path).count("AN не влияет")
        if count:
            err(f"{path.relative_to(REPO)}: {count} stale «AN не влияет» "
                f"statement(s) remain")
    if "AN не влияет" in widget:
        err("widget: stale «AN не влияет» note remains")
    notes.append("V-d Option A: §7A.5 + §7A.7 re-framed, master mirror current, "
                 "E16 derivation note in embed + canon marker; zero stale "
                 "«AN не влияет» statements")

    # ---------- 6. Glossary defers ----------
    registry = read(GLOSSARY_REGISTRY)
    if "Description = 0% влияния" not in registry:
        err("glossary_registry: Voice Isolation value restatement missing")
    elif "[ref: part_03.md §3.1" not in registry:
        err("glossary_registry: Voice Isolation entry ref missing")
    if GLOSSARY_JSON.exists():
        if "Description = 0% влияния" not in read(GLOSSARY_JSON):
            err("data/glossary.json: Voice Isolation restatement missing "
                "(regenerate: pnpm run build:glossary)")
    else:
        err("data/glossary.json not found")
    notes.append("glossary defers: registry + generated JSON carry the value "
                 "restatement with the §3.1 ref (chain owner: DEC-17/18)")

    # ---------- 7. No competing sources ----------
    # Allowed counts include declared pointers: the canon [VS: E07] marker and
    # the widget/embed header comments name the prose block and the claims by
    # reference (one-line summaries pointing at the canonical home — NAV §10
    # allows links, never a second full statement).
    checks = [
        ("Хранилище ≠ Влияние", {CANON_3: 2, MASTER_3: 2, WIDGET: 1}),
        ("Хранилище vs Влияние", {MASTER_3: 1}),  # E07 inset title (visual)
        ("~10–20 сообщений", {CANON_3: 2, MASTER_3: 1, WIDGET: 1}),
        ("после ~5 реплик", {CANON_3: 2, MASTER_3: 1, WIDGET: 1}),
    ]
    for needle, allowed_map in checks:
        for path in sorted(CANON_DIR.glob("*.md")) + sorted(MASTER_DIR.glob("*.html")) \
                + [WIDGET]:
            count = read(path).count(needle)
            allowed = allowed_map.get(path, 0)
            if count != allowed:
                err(f"{path.relative_to(REPO)}: «{needle}» count {count} != "
                    f"{allowed} (competing source)")
    notes.append("no competing sources: prose-block anchors counted per layer "
                 "(canon ×1 / master mirror ×1 / widget notes ×1)")

    # ---------- 8. Root fallback current ----------
    for path, needles in (
        (FALLBACK_3, ["Хранилище ≠ Влияние", "Недавний чат"]),
        (FALLBACK_7A, [RE_FRAME]),
        (WIDGET_FALLBACK, ["Недавний чат", "пренебрежимо мало"]),
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

    # ---------- 9. Map / matrix / registries parity ----------
    map_text = read(MAP)
    if "### 5.6 Voice influence % slice" not in map_text:
        err("migration_map_v2.md: §5.6 voice slice missing")
    else:
        slice_56 = md_section(map_text, r"^### 5\.6 ", r"^## 6\. ")
        vc_rows = re.findall(r"^\| VC-(\d+) \|", slice_56 or "", re.MULTILINE)
        if sorted(int(n) for n in vc_rows) != list(range(1, 11)):
            err(f"migration_map_v2.md §5.6: expected VC-1..VC-10 rows, got "
                f"{vc_rows}")
        if slice_56 and "executed iter 142" not in slice_56:
            err("migration_map_v2.md §5.6: execution status (iter 142) missing")
    e07_row = next((ln for ln in map_text.split("\n")
                    if ln.startswith("| E07 |")), None)
    if e07_row is None or "iter 142" not in e07_row:
        err("migration_map_v2.md: Registry A E07 row does not record the "
            "iter-142 execution")
    row_b7 = next((ln for ln in map_text.split("\n")
                   if ln.startswith("| Voice influence % |")), None)
    if row_b7 is None or "executed iter 142" not in row_b7.lower():
        err("migration_map_v2.md: Registry B row 7 does not record the "
            "iter-142 execution")
    row6 = md_section(map_text, r"^## 6\. ", r"^## 7\. ")
    if row6 is None or "DECIDED (DEC-21" not in row6:
        err("migration_map_v2.md: §6 row 6 does not record DEC-21")
    if not re.search(r"\*\*iter 142 \(", map_text):
        err("migration_map_v2.md: §7 iteration log entry for iter 142 missing")

    matrix = read(MATRIX)
    for row_id in ("p3_influence_hierarchy::01", "p3_influence_hierarchy::02",
                   "p3_influence_hierarchy::03", "p3_influence_hierarchy::04",
                   "p3_influence_hierarchy::05", "p3_influence_hierarchy::06",
                   "p3_influence_hierarchy::08", "p3_influence_hierarchy::09"):
        row = next((ln for ln in matrix.split("\n") if f"| {row_id} |" in ln), None)
        if row is None:
            err(f"editorial_matrix.md: row {row_id} not found")
        elif "migration_map_v2 VC-" not in row:
            err(f"editorial_matrix.md: row {row_id} missing back-pointer "
                f"→ migration_map_v2 VC-<n>")

    content_map = read(CONTENT_MAP)
    if "SP > Description > Examples > Greeting" in content_map:
        err("docs/content_map.md: KI#82 stale Notes still present")
    elif "Недавний чат ≫" not in content_map:
        err("docs/content_map.md: §3.2 corrected Notes missing (KI#82)")

    for path in DISPOSED_FILES:
        if path.exists():
            err(f"{path.relative_to(REPO)} still exists (DEC-19 disposal "
                f"incomplete)")

    if "audit_voice_parity.py" not in read(AGENTS):
        err("AGENTS.md: canon-audits block does not carry audit_voice_parity.py")

    # ---------- Deferred layers (reported, never failed) ----------
    plan = REPO / "visual-system" / "PLAN.md"
    notes.append(f"{plan.relative_to(REPO)}: frozen design doc (DEC-19) — the "
                 "L605 table copy resolves to git history")
    e16_proto = REPO / "visual-system" / "elements" / "E16-author-note.html"
    notes.append(f"{e16_proto.relative_to(REPO)}: "
                 f"{'present' if e16_proto.exists() else 'MISSING'} "
                 "(frozen, DEC-19 — E16 family slice pending; the derivation "
                 "note intentionally lives only in the embed)")
    notes.append("canon front-matter vs_embedded staleness rides the v2 canon "
                "format (pre-existing, repo-wide)")
    notes.append("drift tool: canon [ref:] ↔ master <a> normalization asymmetry "
                 "is informational (audit_canon_master_drift.py exit 0)")

    return finish()


def finish():
    print("Voice influence % parity audit (voice-cluster, iter 142)")
    for n in notes:
        print(f"  - {n}")
    if errors:
        print(f"\nFAIL — {len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — single canonical owner intact: §3.2 canonical (6×3 table + "
          "prose block + full [VS: E07] marker), E07 the one visual presentation "
          "(re-pointed, label set locked), widget constants parity-locked "
          "(DEC-09 + note deference), AN-12B re-framed per Option A, E16 "
          "derivation note present, glossary defers, no competing sources, "
          "root fallbacks current.")


if __name__ == "__main__":
    main()
