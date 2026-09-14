#!/usr/bin/env python3
"""
audit_enneagram_parity.py — mig-5 acceptance audit (iter 136, Registry B row 6 / PLAN mig-5).

Verifies the Enneagram data cluster architecture across every layer of the slice
(migration_foundation_iter131.md §5.6 evidence; map Registry B row 6 / §5.4 slice):

    §5.4 (canon part_05.md)   = THE canonical record — 9-type table (7 columns:
                                Тип / Название / Альт-название / Ключевой страх /
                                Ключевое желание / Ложь (LIE) / Дефект из стресса)
    data/enneagram.json       = GENERATED machine layer (scripts/generate_enneagram.mjs,
                                wired into `pnpm run build`; NEVER hand-edit after the
                                switch) — canonical fields derive from §5.4 verbatim;
                                machine-layer supplement (WANT/NEED/GHOST, directions,
                                wings, ocean_correlation/defaults, flaw_anchors,
                                mbti_suggestions) lives in the generator
    LIE fold                  = ONE internal copy — types[].lie_template (§5.4 value);
                                spine_templates carries WANT/NEED/FLAW/GHOST only
                                (the v1 second copy spine_templates[].LIE is removed;
                                consumers re-pointed, iter 136)
    E10 master embed          = SHARED_REFERENCE — mini-card values (страх/желание/
                                LIE/дефект) = §5.4 via the generated data layer;
                                static defaults carry the §5.4 type-4 wording;
                                hexad graph = VISUAL_CANONICAL (directions data in
                                the generated layer, drawn statically per KI#75)
    canon [VS: E10] marker    = declares §5.4 ownership + SHARED_REFERENCE + the
                                generated data layer (map E10 disposition)
    prototype/extract E10     = stale derived copies — REMOVED_WITH_REASON
                                executed iter 138 (DEC-19: master embed =
                                canonical visual markup; files removed)

Checks:
 1. Canonical record (canon §5.4): 9 rows; every canonical field == the acceptance
    invariants below (name / name_alt / core_fear / core_desire / LIE / flaw).
 2. Generated layer currency: data/enneagram.json types[] canonical fields ==
    §5.4 parsed values; spine_templates keys exactly {WANT, NEED, FLAW, GHOST}
    (no LIE); spine FLAW == §5.4 flaw cell (single parsed source, emitted to both
    keys); spine NEED == types[].need_direction (single supplement source);
    version == 2.1.0; deterministic 2-space formatting.
 3. Single internal LIE copy: each of the 9 LIE values occurs exactly once in the
    serialized JSON (types[].lie_template only).
 4. Generator + wiring: scripts/generate_enneagram.mjs exists and declares the
    chain; package.json carries build:enneagram and chains it into build.
 5. E10 embed (SHARED_REFERENCE): static mini-card defaults (mc-type/mc-fear/
    mc-desire/mc-lie/mc-flaw) == §5.4 type-4 values; embed comment declares the
    mig-5 §5.4 derivation.
 6. Canon [VS: E10] marker: present; declares §5.4 ownership (SHARED_REFERENCE)
    and the generated data layer.
 7. Widget read-paths (data-shape verification, PLAN "widget works"):
    vs-e10-enneagram.js reads name/core_fear/core_desire/lie_template/flaw_pattern
    (shape preserved, file untouched by mig-5); enneagram-builder.js +
    persona-synthesis.js carry NO `template.LIE` reads and read lie_template from
    types[]; simulated read-path over the generated JSON fills every field every
    widget accesses (all 9 types).
 8. Root fallback: parts/part_05.html mini-card defaults current with master
    (§5.4 type-4 wording) — rebuild check.
 9. Map parity: migration_map_v2.md §5.4 slice present (EN-1..EN-8); Registry B
    row 6 + Registry A E10 record the iter-136 execution.
10. Matrix parity: affected editorial_matrix.md rows carry
    → migration_map_v2 EN-<n> back-pointers.
11. Cross-layer directions consistency: canon §5.2 Elena 6w5 table («Стресс (6→3)»,
    «Рост (6→9)») == generated type-6 directions.

Deferred layers (reported as notes, never failures):
  - visual-system prototype E10 + component extract (disposition
    REMOVED_WITH_REASON — «Я фундаментально ущербен» 3-way drift, foundation §4.3 —
    DECIDED DEC-19, executed iter 138: files removed);
  - E10 hexad graph geometry = VISUAL_CANONICAL (SVG static, directions data in
    the generated layer; KI#75 verified the drawing — not re-audited geometrically);
  - machine-layer fields without a direct runtime reader (wings, wing_pairs,
    need_direction (== spine NEED), stress_direction, growth_direction) — kept for
    data-shape compatibility; informational observation (map EN-8).

Exit codes: 0 — PASS; 1 — FAIL (messages above).
Run: python3 scripts/audit_enneagram_parity.py
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CANON_05 = REPO / "docs" / "canon" / "part_05.md"
MASTER_05 = REPO / "src" / "master" / "part_05.html"
FALLBACK_05 = REPO / "parts" / "part_05.html"
DATA_JSON = REPO / "data" / "enneagram.json"
GENERATOR = REPO / "scripts" / "generate_enneagram.mjs"
PACKAGE = REPO / "package.json"
WIDGET_E10 = REPO / "src" / "shell" / "widgets" / "vs-e10-enneagram.js"
WIDGET_BUILDER = REPO / "src" / "shell" / "widgets" / "enneagram-builder.js"
WIDGET_SYNTH = REPO / "src" / "shell" / "widgets" / "persona-synthesis.js"
MAP = REPO / "docs" / "research" / "migration_map_v2.md"
MATRIX = REPO / "docs" / "research" / "editorial_matrix.md"

SCHEMA_VERSION = "2.1.0"

# Acceptance invariants (PLAN mig-5 / §5.4 canonical table).
# (id, name, name_alt, core_fear, core_desire, lie, flaw)
CANONICAL_TYPES = [
    (1, "Перфекционист", "Реформатор", "Быть плохим, коррумпированным",
     "Быть хорошим, цельным", "Если я буду идеальным, меня будут любить",
     "Критика себя и других, негибкость"),
    (2, "Помощник", "Даритель", "Быть ненужным, нелюбимым",
     "Быть любимым, нужным", "Если я помогаю другим, они не бросят меня",
     "Манипуляция заботой"),
    (3, "Достигатель", "Деятель", "Быть никчёмным, неудачником",
     "Быть ценным, успешным", "Моя ценность = мои достижения",
     "Обман ради успеха"),
    (4, "Индивидуалист", "Романтик", "Быть обычным, незначимым",
     "Быть уникальным, аутентичным", "Что-то фундаментально отсутствует во мне",
     "Отстранённость"),
    (5, "Исследователь", "Наблюдатель", "Быть некомпетентным, истощённым",
     "Быть компетентным, знающим, независимым",
     "Если я знаю достаточно, я буду в безопасности", "Изоляция"),
    (6, "Лоялист", "Скептик", "Быть без поддержки, брошенным",
     "Быть в безопасности, поддержанным",
     "Мир опасен, мне нужен авторитет или система", "Тревожное ожидание"),
    (7, "Энтузиаст", "Эпикуреец", "Быть ограниченным, в депривации",
     "Быть удовлетворённым, свободным", "Свобода = отсутствие обязательств",
     "Избегание боли"),
    (8, "Челленджер", "Босс", "Быть слабым, уязвимым",
     "Быть сильным, защищённым, влиятельным",
     "Сила = защита, уязвимость = смерть", "Доминирование"),
    (9, "Миротворец", "Медиатор", "Быть в конфликте, потерять связь",
     "Быть в мире, цельном, соединённом",
     "Если я не вмешиваюсь, всё будет хорошо", "Пассивность"),
]

errors = []
notes = []


def err(msg):
    errors.append(msg)


def read(path):
    return path.read_text(encoding="utf-8")


def canon_section_54(text):
    m = re.search(r"^## 5\.4 .*?(?=^## 5\.5 )", text, re.DOTALL | re.MULTILINE)
    return m.group(0) if m else None


def parse_canon_types(section_text):
    """Parse the §5.4 9-type table → list of dicts (or None on structural failure)."""
    lines = section_text.split("\n")
    header_idx = next(
        (i for i, ln in enumerate(lines)
         if "Ключевой страх" in ln and "Ложь" in ln),
        None,
    )
    if header_idx is None:
        return None
    rows = []
    for line in lines[header_idx + 2:]:
        line = line.strip()
        if not line.startswith("|"):
            break
        cells = [c.strip() for c in line.split("|")[1:-1]]
        if len(cells) != 7:
            err(f"canon §5.4: table row has {len(cells)} cells (expected 7): {line}")
            return None
        m = re.match(r"^\*\*(\d)\*\*$", cells[0])
        if not m:
            err(f"canon §5.4: type cell '{cells[0]}' does not match **N**")
            return None
        rows.append({
            "id": int(m.group(1)), "name": cells[1], "name_alt": cells[2],
            "core_fear": cells[3], "core_desire": cells[4],
            "lie": cells[5], "flaw": cells[6],
        })
    return rows


def main():
    # ---------- 1. Canonical record (canon §5.4) ----------
    canon = read(CANON_05)
    sec54 = canon_section_54(canon)
    if sec54 is None:
        err("canon part_05.md: §5.4 section not found")
        return finish()
    canon_rows = parse_canon_types(sec54)
    if canon_rows is None:
        return finish()
    if len(canon_rows) != 9:
        err(f"canon §5.4: expected 9 type rows, got {len(canon_rows)}")
    for expected in CANONICAL_TYPES:
        row = next((r for r in canon_rows if r["id"] == expected[0]), None)
        if row is None:
            err(f"canon §5.4: type {expected[0]} row missing")
            continue
        for key, want in zip(
            ("name", "name_alt", "core_fear", "core_desire", "lie", "flaw"),
            expected[1:],
        ):
            if row[key] != want:
                err(f"canon §5.4 type {expected[0]}: {key} '{row[key]}' != "
                    f"acceptance invariant '{want}'")
    notes.append("canonical record §5.4: 9 rows × 6 canonical fields exact "
                 "(name/name_alt/fear/desire/LIE/flaw)")

    # ---------- 2. Generated layer currency + shape ----------
    raw_json = read(DATA_JSON)
    data = json.loads(raw_json)
    if data.get("version") != SCHEMA_VERSION:
        err(f"data/enneagram.json: version {data.get('version')!r} != "
            f"expected {SCHEMA_VERSION!r} (schema evolution: spine_templates.LIE folded)")
    types_by_id = {t["id"]: t for t in data.get("types", [])}
    if sorted(types_by_id) != list(range(1, 10)):
        err(f"data/enneagram.json: expected type ids 1–9, got {sorted(types_by_id)}")
    spine = data.get("spine_templates", {})
    for expected in CANONICAL_TYPES:
        tid = expected[0]
        t = types_by_id.get(tid)
        if t is None:
            continue
        for key, want in zip(
            ("name", "name_alt", "core_fear", "core_desire", "lie_template",
             "flaw_pattern"),
            expected[1:],
        ):
            if t.get(key) != want:
                err(f"data/enneagram.json type {tid}: {key} {t.get(key)!r} != "
                    f"§5.4 canonical {want!r}")
        s = spine.get(str(tid))
        if s is None:
            err(f"data/enneagram.json: spine_templates['{tid}'] missing")
            continue
        if set(s.keys()) != {"WANT", "NEED", "FLAW", "GHOST"}:
            err(f"data/enneagram.json: spine_templates['{tid}'] keys {sorted(s)} "
                "!= WANT/NEED/FLAW/GHOST (LIE must be folded away)")
        else:
            if s["FLAW"] != expected[6]:
                err(f"data/enneagram.json: spine_templates['{tid}'].FLAW "
                    f"{s['FLAW']!r} != §5.4 flaw {expected[6]!r}")
            if s["NEED"] != t.get("need_direction"):
                err(f"data/enneagram.json: spine_templates['{tid}'].NEED != "
                    f"types[].need_direction (single supplement source)")
            for field in ("WANT", "NEED", "FLAW", "GHOST"):
                if not s[field]:
                    err(f"data/enneagram.json: spine_templates['{tid}'].{field} empty")
    # Deterministic formatting: re-serialization must be byte-identical
    # (detects hand-edits that break the generator's canonical output form).
    if raw_json != json.dumps(data, ensure_ascii=False, indent=2) + "\n":
        err("data/enneagram.json: not in the generator's deterministic format "
            "(2-space indent + trailing newline) — regenerate (pnpm run build:enneagram)")
    notes.append("generated layer: canonical fields == §5.4 verbatim; "
                 "spine_templates = WANT/NEED/FLAW/GHOST (FLAW from the §5.4 cell, "
                 "NEED == need_direction); version 2.1.0; deterministic formatting")

    # ---------- 3. Single internal LIE copy ----------
    for expected in CANONICAL_TYPES:
        lie = expected[5]
        occurrences = raw_json.count(json.dumps(lie, ensure_ascii=False)[1:-1])
        if occurrences != 1:
            err(f"data/enneagram.json: LIE of type {expected[0]} occurs {occurrences}× "
                "(expected exactly 1 — types[].lie_template)")
    notes.append("LIE fold: each of the 9 LIE values occurs exactly once "
                 "(types[].lie_template; spine_templates.LIE removed)")

    # ---------- 4. Generator + wiring ----------
    if not GENERATOR.exists():
        err("scripts/generate_enneagram.mjs: not found")
    else:
        gen = read(GENERATOR)
        for token in ("part_05.md", "generate_enneagram.mjs", "data/enneagram.json",
                      "lie_template", "NEVER hand-edit"):
            if token not in gen:
                err(f"scripts/generate_enneagram.mjs: chain declaration token "
                    f"'{token}' missing")
    pkg_raw = read(PACKAGE)
    pkg = json.loads(pkg_raw)
    scripts = pkg.get("scripts", {})
    if scripts.get("build:enneagram") != "node scripts/generate_enneagram.mjs":
        err("package.json: build:enneagram script missing/incorrect")
    build_chain = scripts.get("build", "")
    for token in ("node scripts/generate_glossary.mjs",
                  "node scripts/generate_enneagram.mjs",
                  "node scripts/build-unified.mjs"):
        if token not in build_chain:
            err(f"package.json: build chain missing '{token}'")
    glossary_pos = build_chain.find("node scripts/generate_glossary.mjs")
    ennea_pos = build_chain.find("node scripts/generate_enneagram.mjs")
    if -1 < glossary_pos < ennea_pos and "&&" not in build_chain[glossary_pos:ennea_pos]:
        err("package.json: generate_enneagram not chained after generate_glossary")
    notes.append("generator + wiring: scripts/generate_enneagram.mjs present; "
                 "package.json build:enneagram + build chain (after glossary stage)")

    # ---------- 5. E10 embed (SHARED_REFERENCE) ----------
    master = read(MASTER_05)
    e10 = re.search(
        r'<div class="vs-embed" data-vs-element="E10">.*?'
        r"<!-- REPLACED BY VISUAL SYSTEM: E10 -->",
        master, re.DOTALL,
    )
    if e10 is None:
        err("master: E10 embed not found")
    else:
        embed = e10.group(0)
        type4 = CANONICAL_TYPES[3]
        expected_defaults = {
            "mc-type": f"Тип 4 — {type4[1]}",
            "mc-fear": type4[3],
            "mc-desire": type4[4],
            "mc-lie": type4[5],
            "mc-flaw": type4[6],
        }
        for el_id, want in expected_defaults.items():
            m = re.search(rf'id="{el_id}">([^<]*)</span>', embed) or \
                re.search(rf'id="{el_id}">([^<]*)</div>', embed)
            if not m:
                err(f"E10 embed: static default #{el_id} not parseable")
            elif m.group(1) != want:
                err(f"E10 embed: static default #{el_id} {m.group(1)!r} != "
                    f"§5.4 type-4 value {want!r}")
        if "§5.4" not in embed or "SHARED_REFERENCE" not in embed:
            err("E10 embed: mig-5 comment (§5.4 derivation + SHARED_REFERENCE "
                "declaration) missing")
        notes.append("E10 embed: mini-card static defaults == §5.4 type-4 values; "
                     "SHARED_REFERENCE derivation declared in-embed")

    # ---------- 6. Canon [VS: E10] marker ----------
    m = re.search(r"^\[VS: E10 — (.+?)\]$", canon, re.MULTILINE)
    if not m:
        err("canon part_05.md: [VS: E10] marker not found")
    else:
        body = m.group(1)
        for token in ("§5.4", "SHARED_REFERENCE", "data/enneagram.json",
                      "генерируется"):
            if token not in body:
                err(f"canon part_05.md [VS: E10] marker: '{token}' missing")
    notes.append("E10 canon marker: present — §5.4 ownership (SHARED_REFERENCE) "
                 "and the generated data layer declared")

    # ---------- 7. Widget read-paths (data-shape verification) ----------
    e10js = read(WIDGET_E10)
    for token in ("t.name", "t.core_fear", "t.core_desire", "t.lie_template",
                  "t.flaw_pattern", "data/enneagram.json"):
        if token not in e10js:
            err(f"vs-e10-enneagram.js: field read '{token}' missing "
                "(shape contract broken)")
    for widget_path, widget_name in ((WIDGET_BUILDER, "enneagram-builder.js"),
                                     (WIDGET_SYNTH, "persona-synthesis.js")):
        src = read(widget_path)
        if re.search(r"template\.LIE", src):
            err(f"{widget_name}: stale `template.LIE` read remains "
                "(spine_templates.LIE is folded — read types[].lie_template)")
        if "lie_template" not in src:
            err(f"{widget_name}: lie_template read missing (LIE re-point incomplete)")
        if "data/enneagram.json" not in src and "enneagram.json" not in src:
            err(f"{widget_name}: enneagram.json data source declaration missing")
    # Simulated read-path over the generated JSON: every field every widget
    # accesses must resolve non-empty for all 9 types.
    for t in data.get("types", []):
        tid = t["id"]
        for field in ("name", "name_alt", "core_fear", "core_desire",
                      "lie_template", "flaw_pattern", "need_direction"):
            if not t.get(field):
                err(f"widget read-path: types[{tid}].{field} empty")
        corr = t.get("ocean_correlation")
        if not isinstance(corr, list) or len(corr) != 5:
            err(f"widget read-path: types[{tid}].ocean_correlation malformed")
        s = spine.get(str(tid), {})
        for field in ("WANT", "NEED", "FLAW", "GHOST"):
            if not s.get(field):
                err(f"widget read-path: spine_templates[{tid}].{field} empty")
        od = data.get("ocean_defaults", {}).get(str(tid))
        if not od or sorted(od.keys()) != ["A", "C", "E", "N", "O"]:
            err(f"widget read-path: ocean_defaults[{tid}] malformed")
        fa = data.get("flaw_anchors", {}).get(str(tid))
        if not fa or not all(a.get("trigger") and a.get("action") and a.get("cost")
                             for a in fa):
            err(f"widget read-path: flaw_anchors[{tid}] malformed")
        ms = data.get("mbti_suggestions", {}).get(str(tid))
        if not ms:
            err(f"widget read-path: mbti_suggestions[{tid}] missing")
    notes.append("widget read-paths: vs-e10 field shape preserved (file untouched); "
                 "builder + synthesis re-pointed to types[].lie_template; simulated "
                 "read over the generated JSON fills every consumed field (9/9 types)")

    # ---------- 8. Root fallback ----------
    if FALLBACK_05.exists():
        fb = read(FALLBACK_05)
        if ">Отстранённость</span>" not in fb or ">Быть обычным, незначимым</span>" not in fb:
            err("parts/part_05.html (root fallback): E10 mini-card defaults stale — "
                "rebuild required (pnpm run build)")
    else:
        err("parts/part_05.html (root fallback) not found — rebuild required")
    notes.append("root fallback: parts/part_05.html E10 mini-card defaults current")

    # ---------- 9. Map parity ----------
    map_text = read(MAP)
    if "### 5.4 Enneagram data slice" not in map_text:
        err("migration_map_v2.md: §5.4 Enneagram data slice missing")
    else:
        slice_54 = re.search(
            r"^### 5\.4 .*?(?=^## 6\. )", map_text, re.DOTALL | re.MULTILINE,
        )
        en_rows = re.findall(r"^\| EN-(\d+) \|",
                             slice_54.group(0) if slice_54 else "", re.MULTILINE)
        if sorted(en_rows) != [str(i) for i in range(1, 9)]:
            err(f"migration_map_v2.md §5.4: expected EN-1..EN-8 rows, got {en_rows}")
        if slice_54 and "executed iter 136" not in slice_54.group(0):
            err("migration_map_v2.md §5.4: execution status (iter 136) missing")
    row_b6 = next((ln for ln in map_text.split("\n")
                   if ln.startswith("| Enneagram data |")), None)
    if row_b6 is None:
        err("migration_map_v2.md: Registry B row 6 (Enneagram data) not found")
    elif "executed iter 136" not in row_b6.lower():
        err("migration_map_v2.md: Registry B row 6 does not record the iter-136 execution")
    row_e10 = next((ln for ln in map_text.split("\n")
                    if ln.startswith("| E10 |")), None)
    if row_e10 is None or "iter 136" not in row_e10:
        err("migration_map_v2.md: Registry A E10 row does not record the iter-136 execution")

    # ---------- 10. Matrix parity ----------
    matrix = read(MATRIX)
    matrix_checks = [
        ("p5_enneagram_basics::02", "migration_map_v2 EN-2"),
        ("p5_enneagram_basics::04", "migration_map_v2 EN-1"),
        ("p5_elena_profile::04", "migration_map_v2 EN-8"),
    ]
    for row_id, pointer in matrix_checks:
        row = next((ln for ln in matrix.split("\n") if f"| {row_id} |" in ln), None)
        if row is None:
            err(f"editorial_matrix.md: row {row_id} not found")
        elif pointer not in row:
            err(f"editorial_matrix.md: row {row_id} missing back-pointer → {pointer}")

    # ---------- 11. Cross-layer directions consistency (§5.2 Elena 6w5) ----------
    sec52 = re.search(r"^## 5\.2 .*?(?=^## 5\.3 )", canon, re.DOTALL | re.MULTILINE)
    if sec52 is None:
        err("canon part_05.md: §5.2 section not found (6w5 directions check)")
    else:
        t6 = types_by_id.get(6, {})
        if ("Стресс (6→3)" not in sec52.group(0)
                or t6.get("stress_direction") != 3):
            err("directions: canon §5.2 «Стресс (6→3)» != generated type-6 "
                "stress_direction")
        if ("Рост (6→9)" not in sec52.group(0)
                or t6.get("growth_direction") != 9):
            err("directions: canon §5.2 «Рост (6→9)» != generated type-6 "
                "growth_direction")
    notes.append("cross-layer directions: canon §5.2 Elena 6w5 (6→3 stress, "
                 "6→9 growth) == generated type-6 directions")

    # ---------- Deferred / observed layers (reported, never failed) ----------
    proto = REPO / "visual-system" / "elements" / "E10-enneagram-spine.html"
    extract = (REPO / "visual-system" / "integration" / "component-extracts"
               / "E10-visual.html")
    notes.append(
        f"{proto.relative_to(REPO)}: {'present' if proto.exists() else 'MISSING'}; "
        f"{extract.relative_to(REPO)}: {'present' if extract.exists() else 'MISSING'} "
        "(E10 prototype/extract — REMOVED_WITH_REASON executed iter 138 (DEC-19): stale "
        "«Я фундаментально ущербен» 3-way drift, foundation §4.3)"
    )
    notes.append(
        "E10 hexad graph geometry = VISUAL_CANONICAL (static SVG per KI#75; "
        "direction data lives in the generated layer — not re-audited geometrically)"
    )
    notes.append(
        "machine-layer fields without a direct runtime reader (wings, wing_pairs, "
        "need_direction [== spine NEED], stress_direction, growth_direction) kept "
        "for data-shape compatibility — map EN-8 observation"
    )

    return finish()


def finish():
    print("Enneagram data parity audit (mig-5, iter 136)")
    for n in notes:
        print(f"  - {n}")
    if errors:
        print(f"\nFAIL — {len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — single canonical value owner intact: §5.4 canonical table → "
          "generated data/enneagram.json (LIE folded to one internal copy) → "
          "E10 SHARED_REFERENCE + re-pointed widgets; prototype/extract REMOVED_WITH_REASON "
          "executed iter 138 (DEC-19).")


if __name__ == "__main__":
    main()
