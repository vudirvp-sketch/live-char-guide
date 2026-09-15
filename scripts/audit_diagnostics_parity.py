#!/usr/bin/env python3
"""
audit_diagnostics_parity.py — mig-3 acceptance audit (iter 139, DEC-20 / Registry B row 4).

Verifies the Diagnostics cluster (Debug mode) single-canonical-owner architecture
across every presentation layer of the v1 inventory (migration foundation §4.4,
owner_gates_iter137.md §3.2):

    §9.6 (canon + master)   = THE canonical home of the E13 symptom→check→branch→
                               AP/E mapping (TEXTUAL_CANONICAL, DEC-20) — new
                               sub-table + upgraded [VS: E13] marker
    E13 master embed         = the visual presentation / decision aid of that
                               mapping — re-pointed, values parity-locked by
                               this audit
    §9.5 / §9.3 / §9.11      = stay flat lookup / checklists — no E13 mappings
                               there (no competing diagnostic sources)
    §9.2 (canon + master)    = Debug reader-path wiring: one-change rule ↔ tree
                               back-link (IMP-48 pair)
    prototype E13            = frozen design artifact (DEC-19; archive = git
                               history) — no action, reported as a note

Checks:
 1. Canonical record (canon §9.6 E13 block): sub-heading + intro paragraph
    (E13 relationship declared, TEXTUAL_CANONICAL; refs to §9.2 and §9.7 for
    the Debug chain); 6-row table: 3 symptom titles, 6 check questions, 9
    diagnosis names, AP set (2/8/9/11/3/5/6), E-target set (16/1/7/17/2/4/8/3);
    full [VS: E13] marker in the _README §3.3 format.
 2. Master §9.6 mirror: same sub-heading + intro (links to #p9_one_change_rule
    and #p9_test_scenarios); same table payload; the KI#84-deleted Walter OCEAN
    cross-ref paragraph ABSENT (deleted iter 157 — the canonical-audit
    reconciliation, owner-called: the line had carried Elena's OCEAN values
    attributed to Walter since iter 38; both tool anchors — the sync probe P3-4c
    (now "P3-4c-del", a negative check) and this audit — moved together with the
    deletion); §9.7 keeps the sole Part-9 Walter reference (checked in 2b);
    existing 5-group table intact (P2-17 one-word symptoms).
 2b. §9.7 sole-reference guarantee (KI#84): canon §9.7 and master §9.7 both
    carry the Walter OCEAN example line with Walter's actual extremes
    (C=85, A=25, E=30); no other Part-9 location references Walter's OCEAN
    example.
 3. E13 embed (visual presentation / decision aid): comment declares §9.6
    canonical ownership (mig-3 re-point); 3 tree-root symptoms == canon symptom
    titles; 9 diagnosis-node names == canon diagnoses; 6 check questions ==
    canon checks; badge inventory == the canonical AP/E set; 6 «Нет →» +
    6 «Да →» branch labels.
 4. §9.2 back-link (Debug chain): canon Применение carries [ref: §9.6];
    master Применение carries the #p9_decision_tree link.
 5. No competing diagnostic sources: each of the 3 E13 symptom titles appears
    exactly once in docs/canon/ (part_09.md §9.6) and exactly twice in
    src/master/ (part_09.html §9.6 table + E13 embed); §9.5 canon and master
    slices carry none; no other master file carries them.
 6. Root fallback: parts/part_09.html carries the sub-heading + a symptom +
    a diagnosis (build output current with master).
 7. Map parity: migration_map_v2.md §5.5 slice present (DT-1..DT-8);
    Registry B row 4 + Registry A E13 row record the iter-139 execution;
    editorial_matrix rows p9_decision_tree::03/::04/::05 +
    p9_one_change_rule::02 carry → migration_map_v2 DT-<n> back-pointers.

Deferred layers (reported as notes, never failures):
  - visual-system/elements/E13-diagnostic-tree.html (frozen design artifact,
    DEC-19; P/I 40/40 identical to the embed — owner_gates §3.2; archive =
    git history);
  - canon↔master [ref:]↔<a> normalization asymmetry in the drift tool
    (informational; audit_canon_master_drift.py exit 0 by design).

Exit codes: 0 — PASS; 1 — FAIL (messages above).
Run: python3 scripts/audit_diagnostics_parity.py
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CANON_9 = REPO / "docs" / "canon" / "part_09.md"
MASTER_9 = REPO / "src" / "master" / "part_09.html"
CANON_DIR = REPO / "docs" / "canon"
MASTER_DIR = REPO / "src" / "master"
FALLBACK_9 = REPO / "parts" / "part_09.html"
MAP = REPO / "docs" / "research" / "migration_map_v2.md"
MATRIX = REPO / "docs" / "research" / "editorial_matrix.md"

# ---------- E13 inventory (extracted from the master embed, verified iter 137) ----------

SYMPTOMS = [
    "Персонаж дрейфует после 5–10 сообщений",
    "Голос звучит типично / неразличимо",
    "Персонаж игнорирует действия пользователя",
]

CHECKS = [
    "У персонажа есть рабочие Anchors?",
    "SPINE причинно согласован?",
    "Голос записан только в Examples?",
    "Достаточно ли диалоговых примеров (3+)?",
    "Anti-godmoding присутствует в SP?",
    "Персонаж использует протокол Embodiment?",
]

DIAGNOSES = [
    "Отсутствует структура Anchors",
    "Нарушенная цепь SPINE",
    "Дрейф голоса (доминирование недавнего чата)",
    "Утечка голоса в Description/SP",
    "Недостаточно образцов голоса",
    "Проблема параметров сэмплирования",
    "Отсутствует Anti-godmoding",
    "Embodiment отсутствует",
    "Нарушение границы влияния",
]

AP_SET = {"AP-2", "AP-8", "AP-9", "AP-11", "AP-3", "AP-5", "AP-6"}
E_SET = {"E16", "E01", "E07", "E17", "E02", "E04", "E08", "E03"}

SUBHEADING_CANON = "### Три базовых симптома: полный маппинг (канонический источник дерева E13)"
SUBHEADING_MASTER = "<h4>Три базовых симптома: полный маппинг</h4>"

# KI#84 canonical-audit reconciliation (iter 157, owner-called): the §9.6 Walter
# cross-ref paragraph ("Пример тестирования карточки с OCEAN-профилем (A=38, N=68 —
# осторожная зона, без экстремальных полюсов кроме O=72) — Уолтер Уайт, §10.2") was
# DELETED from master §9.6 — it had carried Elena's OCEAN values attributed to
# Walter since iter 38. This constant now guards the DELETION (must stay absent).
WALTER_DELETED = "Пример тестирования карточки с OCEAN-профилем (A=38, N=68"
# §9.7 = the sole Part-9 reference to Walter's OCEAN example (canon + master
# identical wording; Walter's actual extremes per §10.2: O:65 C:85 E:30 A:25 N:60).
WALTER_97_ANCHOR = (
    "Пример тестирования карточки с OCEAN-полюсами — Уолтер Уайт "
    "(C=85, A=25, E=30 — выраженные экстремумы)"
)
# P2-17 one-word symptom kept in the existing (5-group) §9.6 table.
P217_ANCHOR = "Удалить голос из Description (AP-3 Voice-in-Desc)"

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


def main():
    canon = read(CANON_9)
    master = read(MASTER_9)

    # ---------- 1. Canonical record (canon §9.6 E13 block) ----------
    sec96 = md_section(canon, r"^## 9\.6 ", r"^## 9\.7 ")
    if sec96 is None:
        err("canon §9.6 section not found")
        return finish()
    if SUBHEADING_CANON not in sec96:
        err("canon §9.6: E13 sub-heading missing")
    for s in SYMPTOMS:
        if s not in sec96:
            err(f"canon §9.6: symptom missing: {s}")
    for c in CHECKS:
        if c not in sec96:
            err(f"canon §9.6: check question missing: {c}")
    for d in DIAGNOSES:
        if d not in sec96:
            err(f"canon §9.6: diagnosis missing: {d}")
    for ap in sorted(AP_SET):
        if ap not in sec96:
            err(f"canon §9.6: AP reference missing: {ap}")
    for e in sorted(E_SET):
        if not re.search(rf"\b{e}\b", sec96):
            err(f"canon §9.6: E-target reference missing: {e}")
    marker = re.search(r"^\[VS: E13 — .+\]$", sec96, re.MULTILINE)
    if not marker:
        err("canon §9.6: [VS: E13] marker (full format) missing")
    else:
        m_text = marker.group(0)
        for token in ("TEXTUAL_CANONICAL", "audit_diagnostics_parity.py"):
            if token not in m_text:
                err(f"canon §9.6 [VS: E13] marker: token missing: {token}")
    # Debug reader-path wiring: §9.2 + §9.7 refs in the E13 intro paragraph.
    intro = re.search(r"^Ниже — полный маппинг трёх базовых симптомов.*?\n\n", sec96, re.DOTALL | re.MULTILINE)
    if intro is None or "[ref: §9.2 — Правило одного изменения]" not in intro.group(0):
        err("canon §9.6: E13 intro paragraph missing the §9.2 one-change ref")
    if intro is None or "[ref: §9.7 — Тестовые сценарии]" not in intro.group(0):
        err("canon §9.6: E13 intro paragraph missing the §9.7 test-scenarios ref")
    notes.append(f"canonical record §9.6: {len(SYMPTOMS)} symptoms, "
                 f"{len(CHECKS)} checks, {len(DIAGNOSES)} diagnoses, "
                 f"AP set {sorted(AP_SET)}, E set {sorted(E_SET)}, "
                 "full [VS: E13] marker")

    # ---------- 2. Master §9.6 mirror ----------
    m96 = html_section(master, "p9_decision_tree")
    if m96 is None:
        err("master: p9_decision_tree section not found")
        return finish()
    if SUBHEADING_MASTER not in m96:
        err("master §9.6: E13 sub-heading (h4) missing")
    for s in SYMPTOMS:
        if s not in m96:
            err(f"master §9.6: symptom missing: {s}")
    for d in DIAGNOSES:
        if d not in m96:
            err(f"master §9.6: diagnosis missing: {d}")
    for c in CHECKS:
        if c not in m96:
            err(f"master §9.6: check question missing: {c}")
    for ap in sorted(AP_SET):
        if ap not in m96:
            err(f"master §9.6: AP reference missing: {ap}")
    if 'href="#p9_one_change_rule"' not in m96:
        err("master §9.6: intro link to #p9_one_change_rule (§9.2) missing")
    if 'href="#p9_test_scenarios"' not in m96:
        err("master §9.6: intro link to #p9_test_scenarios (§9.7) missing")
    if WALTER_DELETED in m96:
        err("master §9.6: the KI#84-deleted Walter OCEAN cross-ref line is present "
            "(deleted iter 157 — Elena's values had been attributed to Walter; "
            "§9.7 is the sole Part-9 Walter reference)")
    if P217_ANCHOR not in m96:
        err("master §9.6: existing 5-group table altered (P2-17 anchor missing)")
    notes.append("master §9.6 mirror: sub-table + intro + chain links present; "
                 "the KI#84-deleted Walter line absent (deleted iter 157); "
                 "P2-17 anchor intact")

    # ---------- 2b. §9.7 sole-reference guarantee (KI#84) ----------
    sec97_canon = md_section(canon, r"^## 9\.7 ", r"^## 9\.8 ")
    m97 = html_section(master, "p9_test_scenarios")
    for label, blob in (("canon §9.7", sec97_canon), ("master §9.7", m97)):
        if blob is None:
            err(f"{label}: section not found (KI#84 sole-reference check)")
        elif WALTER_97_ANCHOR not in blob:
            err(f"{label}: the §9.7 Walter OCEAN reference (C=85, A=25, E=30) "
                "missing — must stay the sole Part-9 Walter reference (KI#84)")
    notes.append("§9.7 sole-reference (KI#84): the Walter OCEAN example line "
                 "present canon + master (C=85, A=25, E=30 — actual §10.2 extremes)")

    # ---------- 3. E13 embed (visual presentation / decision aid) ----------
    e13 = re.search(
        r'<div class="vs-embed" data-vs-element="E13">.*?'
        r"<!-- REPLACED BY VISUAL SYSTEM: E13 -->",
        master, re.DOTALL,
    )
    if not e13:
        err("master: E13 embed not found")
    else:
        e13_text = e13.group(0)
        if "TEXTUAL_CANONICAL (DEC-20)" not in e13_text:
            err("E13 embed: mig-3 re-point comment (§9.6 canonical ownership, "
                "DEC-20) missing")
        embed_symptoms = re.findall(
            r'class="tree-root__symptom"[^>]*>\s*«([^»]+)»', e13_text
        )
        if embed_symptoms != SYMPTOMS:
            err(f"E13 embed: tree-root symptoms {embed_symptoms} != canonical "
                f"{SYMPTOMS}")
        embed_diagnoses = re.findall(
            r'class="diagnosis-node__name">([^<]+)</div>', e13_text
        )
        if sorted(embed_diagnoses) != sorted(DIAGNOSES):
            err(f"E13 embed: diagnosis nodes {sorted(embed_diagnoses)} != "
                f"canonical {sorted(DIAGNOSES)}")
        embed_checks = re.findall(
            r'class="decision-node__question">([^<]+)</div>', e13_text
        )
        if sorted(embed_checks) != sorted(CHECKS):
            err(f"E13 embed: check questions {sorted(embed_checks)} != "
                f"canonical {sorted(CHECKS)}")
        badges = set(re.findall(r'class="badge badge--cyan">→ (AP-\d+|E\d+)',
                                e13_text))
        if badges != AP_SET | E_SET:
            missing = (AP_SET | E_SET) - badges
            extra = badges - (AP_SET | E_SET)
            err(f"E13 embed: badge inventory mismatch (missing={sorted(missing)}, "
                f"extra={sorted(extra)})")
        if e13_text.count('branch__label--no') != 6:
            err("E13 embed: expected 6 «Нет →» branch labels")
        if e13_text.count('branch__label--yes') != 6:
            err("E13 embed: expected 6 «Да →» branch labels")
        notes.append("E13 embed: 3 roots == canon symptoms, 9 diagnoses + "
                     "6 checks == canon, badge inventory == canonical AP/E set, "
                     "re-point comment present")

    # ---------- 4. §9.2 back-link (Debug chain) ----------
    sec92 = md_section(canon, r"^## 9\.2 ", r"^## 9\.3 ")
    if sec92 is None:
        err("canon §9.2 section not found")
    elif "[ref: §9.6 — Дерево решений]" not in sec92:
        err("canon §9.2: Применение back-link to §9.6 missing")
    m92 = html_section(master, "p9_one_change_rule")
    if m92 is None:
        err("master: p9_one_change_rule section not found")
    elif 'href="#p9_decision_tree"' not in m92:
        err("master §9.2: Применение back-link to #p9_decision_tree missing")
    elif "<strong>Применение:</strong>" not in m92:
        err("master §9.2: Применение paragraph missing (mirror required for "
            "the Debug reader path)")
    notes.append("§9.2 back-link: canon [ref: §9.6] + master #p9_decision_tree "
                 "(IMP-48 pair §9.2↔§9.6)")

    # ---------- 5. No competing diagnostic sources ----------
    for path in sorted(CANON_DIR.glob("part_*.md")):
        text = read(path)
        for s in SYMPTOMS:
            count = text.count(s)
            allowed = 1 if path.name == "part_09.md" else 0
            if count != allowed:
                err(f"{path.name}: symptom count {count} != {allowed}: {s}")
    for path in sorted(MASTER_DIR.glob("*.html")):
        text = read(path)
        for s in SYMPTOMS:
            count = text.count(s)
            allowed = 2 if path.name == "part_09.html" else 0  # §9.6 table + E13 embed
            if count != allowed:
                err(f"src/master/{path.name}: symptom count {count} != "
                    f"{allowed}: {s}")
    sec95_canon = md_section(canon, r"^## 9\.5 ", r"^## 9\.6 ")
    sec95_master = html_section(master, "p9_symptom_table")
    for label, blob in (("canon §9.5", sec95_canon), ("master §9.5", sec95_master)):
        if blob is None:
            err(f"{label}: section not found")
            continue
        for s in SYMPTOMS:
            if s in blob:
                err(f"{label}: E13 symptom present in the flat lookup — "
                    f"competing diagnostic source: {s}")
    notes.append("no competing sources: symptoms only in §9.6 canon (1×) / "
                 "master table + E13 embed (2×); §9.5 clean")

    # ---------- 6. Root fallback ----------
    if FALLBACK_9.exists():
        fallback = read(FALLBACK_9)
        if SUBHEADING_MASTER not in fallback:
            err("parts/part_09.html (root fallback): E13 sub-heading missing — "
                "rebuild required (pnpm run build)")
        if SYMPTOMS[0] not in fallback or DIAGNOSES[0] not in fallback:
            err("parts/part_09.html (root fallback): E13 mapping table missing — "
                "rebuild required (pnpm run build)")
    else:
        err("parts/part_09.html (root fallback) not found — rebuild required")

    # ---------- 7. Map + matrix parity ----------
    map_text = read(MAP)
    if "### 5.5 Diagnostics slice" not in map_text:
        err("migration_map_v2.md: §5.5 Diagnostics slice missing")
    else:
        slice_55 = md_section(map_text, r"^### 5\.5 ", r"^## 6\. ")
        dt_rows = re.findall(r"^\| DT-(\d) \|", slice_55 or "", re.MULTILINE)
        if sorted(dt_rows) != [str(i) for i in range(1, 9)]:
            err(f"migration_map_v2.md §5.5: expected DT-1..DT-8 rows, got {dt_rows}")
        if slice_55 and "executed iter 139" not in slice_55:
            err("migration_map_v2.md §5.5: execution status (iter 139) missing")
    row_b4 = next((ln for ln in map_text.split("\n")
                   if ln.startswith("| Diagnostics (symptom→fix) |")), None)
    if row_b4 is None:
        err("migration_map_v2.md: Registry B Diagnostics row not found")
    elif "executed iter 139" not in row_b4.lower():
        err("migration_map_v2.md: Registry B row 4 does not record the iter-139 "
            "execution")
    e13_row = next((ln for ln in map_text.split("\n")
                    if ln.startswith("| E13 |")), None)
    if e13_row is None or "iter 139" not in e13_row:
        err("migration_map_v2.md: Registry A E13 row does not record the iter-139 "
            "execution (TEXTUAL_CANONICAL locked)")

    matrix = read(MATRIX)
    matrix_checks = [
        ("p9_decision_tree::03", "migration_map_v2 DT-1"),
        ("p9_decision_tree::04", "migration_map_v2 DT-3"),
        ("p9_decision_tree::05", "migration_map_v2 DT-2"),
        ("p9_one_change_rule::02", "migration_map_v2 DT-6"),
    ]
    for row_id, pointer in matrix_checks:
        row = next((ln for ln in matrix.split("\n") if f"| {row_id} |" in ln), None)
        if row is None:
            err(f"editorial_matrix.md: row {row_id} not found")
        elif pointer not in row:
            err(f"editorial_matrix.md: row {row_id} missing back-pointer "
                f"→ {pointer}")

    # ---------- Deferred layers (reported, never failed) ----------
    proto = REPO / "visual-system" / "elements" / "E13-diagnostic-tree.html"
    notes.append(f"{proto.relative_to(REPO)}: "
                 f"{'present' if proto.exists() else 'MISSING'} "
                 "(frozen design artifact, DEC-19 — archive = git history)")
    notes.append("drift tool: canon [ref:] ↔ master <a> normalization asymmetry "
                 "is informational (audit_canon_master_drift.py exit 0)")

    return finish()


def finish():
    print("Diagnostics parity audit (mig-3, iter 139)")
    for n in notes:
        print(f"  - {n}")
    if errors:
        print(f"\nFAIL — {len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — single canonical owner intact: §9.6 canonical (E13 mapping "
          "sub-table + [VS: E13] marker), E13 the one visual presentation "
          "(re-pointed), §9.2↔§9.6 Debug chain wired, no competing sources, "
          "root fallback current.")


if __name__ == "__main__":
    main()
