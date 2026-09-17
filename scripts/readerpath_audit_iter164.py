#!/usr/bin/env python3
"""Reader-path audit (spec §8 stage 4, iter 164) — one-shot verification script.

Verifies, per reader mode (spec §3: Learn/Build/Debug/Reference — structural
overlays on the same canonical content), that a reader can travel
entry point -> backbone -> task completion without leaving the mode's
backbone, on the BUILT artifact (parts/*.html + src/master mirror +
parts/manifest.json + data/glossary.json + the shell):

  LEARN      — entry (the TOC + the Part 1 auto-load), the linear guide order
               (manifest == guide order; every part's anchors render in the
               manifest order), difficulty metadata, F6 disclosure,
               completion at Part 10.
  BUILD      — entry (the §1.6 pre-build checklist -> §7A.13 assembly
               pipeline + §7A.12 budgets + the Part 10 blueprints), the
               assembly wiring (every entry/backbone link target resolves in
               the built artifact), the default-visibility surfaces
               (§7A.6/§7A.7/§7A.12 + ШАБЛОН templates), completion (the
               §7A.13 final checklist + budget table + blueprint
               annotations).
  REFERENCE  — entry (the runtime glossary panel chain + the no-JS
               glossary.html page), the lookup hop (every glossary
               anchor_id/cross_ref resolves in the built artifact), the
               appendix layer (A/B/C wired per APPENDIX_GUIDE_ORDER, the TOC
               «Приложения» group, Appendix D canon-only with zero runtime
               links).

The DEBUG mode rides the executed iter-139 precedent
(debug_readerpath_audit_iter139.py) — re-run by the stage separately.

Recorded findings (gaps with dispositions, per the PLAN row: fixed only when
in scope — structural/navigation wiring, not content semantics) print as
FINDING lines and do not fail the run; every hard check does.

Exit 0 — PASS; 1 — FAIL. Run: python3 scripts/readerpath_audit_iter164.py
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
MASTER = REPO / "src" / "master"
PARTS = REPO / "parts"
SHELL = REPO / "src" / "shell"

GUIDE_ORDER = [
    "part_01.html", "part_02.html", "part_03.html", "part_04.html",
    "part_05.html", "part_06.html", "part_07a.html", "part_07b.html",
    "part_08.html", "part_09.html", "part_10.html",
]
# DEC-24 Q7 / the KI#70 WIRE (iter 158): runtime appendix order A -> B -> C
APPENDIX_ORDER = [
    "appendix_mbti.html", "appendix_model_table.html", "appendix_glossary.html",
]
PART_10_BLUEPRINTS = [
    "p10_elena", "p10_walter", "p10_omnis", "p10_vysherblenny",
]
BUILD_PREBUILD_EXPECTED = {
    "p7a_assembly_pipeline", "p7a_token_budget", "appendix_model_table",
    "p10_elena", "p10_walter", "p10_omnis", "p10_vysherblenny",
    "p4_ghost_layers", "p6_cot_basics", "p7b_lorebook_basics",
}
BUILD_PIPELINE_EXPECTED = {
    "p7a_token_budget", "p10_elena", "p7a_core_directives",
    "p4_spine_overview", "p6_cot_basics", "p4_spine_mapping",
    "p2_anchor_rules", "p3_voice_isolation", "p4_spine_check",
    "p5_ocean_basics",
}

errors = []
findings = []


def err(msg):
    errors.append(msg)


def finding(tag, msg, disposition):
    findings.append((tag, msg, disposition))


def read(p):
    return p.read_text(encoding="utf-8")


def section(html, sid):
    m = re.search(rf'<section[^>]*data-section="{sid}".*?</section>', html, re.DOTALL)
    return m.group(0) if m else None


def hrefs(block):
    return set(re.findall(r'href="#([^"]+)"', block))


def main():
    manifest = json.loads(read(PARTS / "manifest.json"))
    shell_index = read(SHELL / "index.html")
    loader = read(SHELL / "lazy-loader.js")

    # the full id set of the built artifact (parts/*.html incl. appendices)
    all_ids = set()
    for p in sorted(PARTS.glob("*.html")):
        all_ids.update(re.findall(r'id="([^"]+)"', read(p)))

    # ================= LEARN =================
    # L1 — entry: the shell TOC + the Part 1 auto-load (first content section)
    if "id=\"toc-panel\"" not in shell_index or "id=\"fab-toc\"" not in shell_index:
        err("LEARN L1: shell TOC panel / TOC FAB missing")
    if "manifest.json" not in loader or "manifest.parts" not in loader:
        err("LEARN L1: lazy-loader manifest auto-load missing")
    if not manifest["parts"] or manifest["parts"][0]["file"] != "part_01.html":
        err("LEARN L1: manifest does not start at part_01.html")
    elif manifest["parts"][0]["anchors"][0] != "p1_value_proposition":
        err("LEARN L1: Part 1 first anchor is not p1_value_proposition")

    # L2 — the linear backbone: manifest == guide order; per-part render order
    files = [e["file"] for e in manifest["parts"]]
    if files != GUIDE_ORDER:
        err(f"LEARN L2: manifest parts order != guide order: {files}")
    for entry in manifest["parts"]:
        t = read(PARTS / entry["file"])
        built = re.findall(r'data-section="([^"]+)"', t)
        if built != entry["anchors"]:
            err(f"LEARN L2: {entry['file']} renders {built} != manifest {entry['anchors']}")
    total = sum(len(e["anchors"]) for e in manifest["parts"] + manifest["appendices"])
    if total != 96:
        err(f"LEARN L2: rendering section count {total} != 96")

    # L3 — difficulty metadata + F6 disclosure (the Learn visibility model)
    diff = sum(len(re.findall(r"<!--\s*difficulty:\s*(?:BASIC|INTERMEDIATE|EXPERT)\s*-->", t))
               for t in (read(MASTER / f) for f in GUIDE_ORDER))
    master_secs = sum(len(re.findall(r'data-section="([^"]+)"', read(MASTER / f)))
                      for f in GUIDE_ORDER)
    if diff != master_secs:
        err(f"LEARN L3: difficulty comments {diff} != master sections {master_secs}")
    details = sum(read(MASTER / f).count('<details class="interactive"')
                  for f in GUIDE_ORDER)
    if details < 1:
        err("LEARN L3: F6 <details class=\"interactive\"> absent from master")

    # L4 — completion: the linear pass ends at Part 10 (worked examples)
    if not manifest["parts"] or manifest["parts"][-1]["file"] != "part_10.html":
        err("LEARN L4: manifest does not end at part_10.html")
    elif manifest["parts"][-1]["anchors"] != PART_10_BLUEPRINTS:
        err("LEARN L4: Part 10 blueprints missing from the manifest tail")
    if [e["file"] for e in manifest.get("appendices", [])] != [
        "appendix_glossary.html", "appendix_mbti.html", "appendix_model_table.html",
    ] and {e["file"] for e in manifest.get("appendices", [])} != set(APPENDIX_ORDER):
        err("LEARN L4: manifest appendices set unexpected")

    # LEARN-1 — recorded finding: the spec's Part 0 entry is canon-only
    part0 = (REPO / "docs" / "canon" / "part_00.md").exists()
    part0_master = (MASTER / "part_00.html").exists()
    part0_manifest = any(e["file"].startswith("part_00") for e in manifest["parts"])
    cmap = read(REPO / "docs" / "content_map.md")
    if part0 and not part0_master and not part0_manifest and "CANON-ONLY" in cmap:
        finding(
            "LEARN-1",
            "the spec §3 Learn entry names Part 0 (how to read) — Part 0 is "
            "canon-only since iter 38 (no master file, no manifest entry, never "
            "rendered; content_map records CANON-ONLY); the runtime Learn entry "
            "= the TOC + the Part 1 auto-load",
            "OWNER-GATE (structural decision: wire Part 0 into the runtime corpus "
            "or re-spec the §3 entry — both change the ratified spec/corpus state)",
        )
    else:
        err(f"LEARN-1 state check failed: canon={part0} master={part0_master} "
            f"manifest={part0_manifest}")

    # ================= BUILD =================
    m01 = read(MASTER / "part_01.html")
    m07a = read(MASTER / "part_07a.html")
    b01 = read(PARTS / "part_01.html")
    b07a = read(PARTS / "part_07a.html")

    # B1 — entry sections exist (master + built)
    for sid in ("p1_prebuild_checklist", "p7a_assembly_pipeline", "p7a_token_budget"):
        if section(m01 if sid.startswith("p1_") else m07a, sid) is None:
            err(f"BUILD B1: master section {sid} missing")
        if section(b01 if sid.startswith("p1_") else b07a, sid) is None:
            err(f"BUILD B1: built section {sid} missing")
    for sid in PART_10_BLUEPRINTS:
        if section(read(MASTER / "part_10.html"), sid) is None:
            err(f"BUILD B1: master blueprint {sid} missing")

    # B2 — the assembly wiring: every entry/backbone link resolves
    prebuild = section(b01, "p1_prebuild_checklist")
    pipeline = section(b07a, "p7a_assembly_pipeline")
    budget = section(b07a, "p7a_token_budget")
    for name, block in (("prebuild", prebuild), ("pipeline", pipeline), ("budget", budget)):
        if block is None:
            continue
        missing = hrefs(block) - all_ids
        if missing:
            err(f"BUILD B2: {name} links do not resolve in the built artifact: {sorted(missing)}")
    if prebuild and not BUILD_PREBUILD_EXPECTED <= hrefs(prebuild):
        err(f"BUILD B2: prebuild expected targets not linked: "
            f"{sorted(BUILD_PREBUILD_EXPECTED - hrefs(prebuild))}")
    if pipeline and not BUILD_PIPELINE_EXPECTED <= hrefs(pipeline):
        err(f"BUILD B2: pipeline expected targets not linked: "
            f"{sorted(BUILD_PIPELINE_EXPECTED - hrefs(pipeline))}")
    if budget and "appendix_model_table" not in hrefs(budget):
        err("BUILD B2: §7A.12 does not link the model capability table")

    # B3 — default visibility: value tables + capability checklist + templates
    for sid in ("p7a_sampling_params", "p7a_model_checklist"):
        if section(m07a, sid) is None or section(b07a, sid) is None:
            err(f"BUILD B3: §7A value/checklist surface {sid} missing")
    shablon = read(MASTER / "part_07a.html").count("ШАБЛОН") + \
        read(MASTER / "part_07b.html").count("ШАБЛОН")
    if shablon < 1:
        err("BUILD B3: no ШАБЛОН template callouts in 7A/7B")
    if pipeline and "Итого" not in pipeline:
        err("BUILD B3: §7A.13 budget table has no totals (Итого) row")

    # B4 — completion: the §7A.13 final checklist + blueprint annotations
    if pipeline:
        checks = pipeline.count("☐")
        if checks < 5:
            err(f"BUILD B4: §7A.13 final checklist has only {checks} items")
    m10 = read(MASTER / "part_10.html")
    dem = m10.count("Демонстрирует")
    if dem != len(PART_10_BLUEPRINTS):
        err(f"BUILD B4: Part 10 «Демонстрирует» annotations {dem} != {len(PART_10_BLUEPRINTS)}")

    # ================= REFERENCE =================
    # R1 — entry: runtime panel + no-JS page + the generated data layer
    for marker in ("id=\"glossary-tab\"", "id=\"glossary-panel\"", "id=\"glossary-content\""):
        if marker not in shell_index:
            err(f"REFERENCE R1: shell glossary surface missing: {marker}")
    for fn in ("loadGlossaryContent", "glossary-link"):
        if fn not in loader:
            err(f"REFERENCE R1: lazy-loader glossary mechanism missing: {fn}")
    nojs = PARTS / "glossary.html"
    if not nojs.exists():
        err("REFERENCE R1: no-JS glossary page (parts/glossary.html) missing")
    else:
        t = read(nojs)
        if "no-js-only" not in t:
            err("REFERENCE R1: no-JS glossary page lacks the no-js-only class")
        bad = hrefs(t) - all_ids
        if bad:
            err(f"REFERENCE R1: no-JS glossary page links do not resolve: {sorted(bad)}")
    gloss = json.loads(read(REPO / "data" / "glossary.json"))
    terms = gloss.get("canonical_terms") or gloss.get("terms") or []
    if len(terms) != 45:
        err(f"REFERENCE R1: glossary.json carries {len(terms)} terms != 45")

    # R2 — the lookup hop: every registry entry links a rendering section
    targets = set()
    for e in terms:
        if e.get("anchor_id"):
            targets.add(e["anchor_id"])
        for c in e.get("cross_refs", []):
            targets.add(c.lstrip("#"))
    missing = sorted(t for t in targets if t not in all_ids)
    if missing:
        err(f"REFERENCE R2: glossary anchor targets missing in the built artifact: {missing}")

    # R3 — the appendix layer: A/B/C wired, D canon-only, zero broken links
    app_files = {e["file"] for e in manifest.get("appendices", [])}
    if app_files != set(APPENDIX_ORDER):
        err(f"REFERENCE R3: manifest appendices {sorted(app_files)} != A/B/C set")
    order_re = re.search(r"APPENDIX_GUIDE_ORDER\s*=\s*\[(.*?)\]", loader, re.DOTALL)
    if not order_re:
        err("REFERENCE R3: APPENDIX_GUIDE_ORDER not found in lazy-loader")
    else:
        declared = re.findall(r"'([^']+\.html)'", order_re.group(1))
        if declared != APPENDIX_ORDER:
            err(f"REFERENCE R3: APPENDIX_GUIDE_ORDER {declared} != A/B/C guide order")
    if "Приложения" not in loader:
        err("REFERENCE R3: TOC «Приложения» group missing in lazy-loader")
    for f in APPENDIX_ORDER:
        t = read(PARTS / f)
        if not re.search(r'data-section="(appendix_[a-z_]+)"', t):
            err(f"REFERENCE R3: appendix {f} carries no rendering section")
    appd_master = (MASTER / "appendix_character_map.html").exists()
    appd_links = sum(read(PARTS / f).count('href="#appendix_character_map"')
                     for f in GUIDE_ORDER + APPENDIX_ORDER + ["glossary.html"])
    if appd_master or appd_links:
        err(f"REFERENCE R3: Appendix D leaked into the runtime layer "
            f"(master={appd_master}, links={appd_links})")
    if "appendix_character_map" not in cmap:
        err("REFERENCE R3: content_map does not carry the Appendix D canon-only record")

    # REFERENCE-1 — recorded finding: the no-JS entry is not navigable
    linked = ("parts/glossary" in shell_index) or any(
        "parts/glossary" in read(PARTS / f) for f in GUIDE_ORDER + APPENDIX_ORDER)
    if not linked:
        finding(
            "REFERENCE-1",
            "the no-JS Reference entry (parts/glossary.html, spec §3 / DEC-17/18) "
            "is not navigable from the site root — the shell <noscript> block "
            "carries an enable-JS notice with no link, and no built page links "
            "parts/glossary; the page is reachable only by direct URL",
            "OWNER-GATE (shell-infrastructure change — spec §7 excludes shell/"
            "CSP changes from the build scope without an owner call)",
        )
    else:
        err("REFERENCE-1 state check failed: an unexpected parts/glossary link "
            "exists — re-audit the no-JS entry wiring")

    return finish()


def finish():
    print("Reader-path audit (spec §8 stage 4, iter 164)")
    print("  modes: LEARN (entry/order/metadata/disclosure/completion) · "
          "BUILD (profile/assembly/budgets/completion) · "
          "REFERENCE (glossary chain/appendix layer)")
    print("  DEBUG rides the iter-139 precedent (re-run by the stage)")
    if findings:
        print(f"\nRECORDED FINDINGS — {len(findings)} (gap + disposition, per the PLAN row):")
        for tag, msg, disp in findings:
            print(f"  ! {tag}: {msg}")
            print(f"    -> {disp}")
    if errors:
        print(f"\nFAIL — {len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — every mode travels entry -> backbone -> completion on the "
          "built corpus: Learn (TOC/Part-1 entry, 11-part linear order == "
          "manifest == render order, 96/96 difficulty metadata, F6 disclosure, "
          "Part 10 completion); Build (§1.6 profile -> §7A.13/§7A.12 + Part 10 "
          "blueprints, all wiring targets resolve, value/checklist/template "
          "surfaces present, assembly checklist + Итого + 4 annotations); "
          "Reference (runtime panel + no-JS page + 45-term chain, every "
          "anchor_id/cross_ref resolves, appendices A/B/C wired A->B->C with "
          "Appendix D canon-only and zero broken links).")


if __name__ == "__main__":
    main()
