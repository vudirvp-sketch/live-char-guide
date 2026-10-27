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
               (§7A.6/§7A.7/§7A.12 + the copyable template blocks), completion (the
               §7A.13 final checklist + budget table + blueprint
               annotations).
  REFERENCE  — entry (the runtime glossary panel chain + the no-JS
               glossary.html page), the lookup hop (every glossary
               anchor_id/cross_ref resolves in the built artifact), the
               appendix layer (A/E wired per APPENDIX_GUIDE_ORDER, the TOC
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

# iter 169 (G4-LEARN (a)): Part 0 wired — corpus 96 -> 98; iter 173 (v3 S3): 98 -> 81
# (Part 8 16->2, Part 9 11->7, Part 10 4->5); iter 174 (v3 S4a): 81 -> 69
# (Part 2 6->5, Part 3 8->5, Part 4 11->6, Part 5 7->5, Part 6 6->5) — the Learn entry = Part 0 -> Part 1
# iter 177 (v3 S4b, F-19/DEC-31): 69 -> 68 (Appendix C deleted; the glossary is
# the registry -> generated JSON -> panel/no-JS page chain)
# iter 188 (v4-7, chapters 5-6): 68 -> 66 (p7b_structured_inject absorbed into
# p7a_authors_note; p7b_lorebook_advanced merged into p7b_lorebook_mechanics —
# both ids are legacy-anchor redirects now, per the owner call of iter 188)
GUIDE_ORDER = [
    "part_00.html", "part_01.html", "part_02.html", "part_03.html", "part_04.html",
    "part_05.html", "part_06.html", "part_07a.html", "part_07b.html",
    "part_08.html", "part_09.html", "part_10.html",
]
# DEC-24 Q7 / the KI#70 WIRE (iter 158): runtime appendix order. v3 stage 2
# (iter 172): B was absorbed into E -> A -> C -> E (D stays canon-only);
# iter 177 (F-19/DEC-31): C deleted -> A -> E.
APPENDIX_ORDER = [
    "appendix_mbti.html", "appendix_model_params.html",
]
PART_10_BLUEPRINTS = [
    "p10_index", "p10_elena", "p10_walter", "p10_omnis", "p10_vysherblenny",
]
PART_10_CARDS = [sid for sid in PART_10_BLUEPRINTS if sid != "p10_index"]
# iter 188 (v4-7): the chapter-0 Build profile (`p1_prebuild_checklist`) was de-linked by design
# in v4-2 (iter 183) — the six questions state the budget/tool options in place, so the entry
# surface no longer routes to §7A.13 / §7A.12 / Part 10 / the appendix. The former link-set
# expectation became a NEGATIVE gate (these routing targets must not come back), and the
# functional coverage (the three decision axes) is asserted as text — the ABSENT_CHECKS
# precedent used for retired sync needles.
BUILD_PREBUILD_RETIRED_LINKS = {
    "p7a_assembly_pipeline", "p7a_token_budget", "appendix_model_params",
    "p10_elena", "p10_walter", "p10_omnis", "p10_vysherblenny",
    "p4_ghost", "p6_cot_basics", "p7b_lorebook_basics",
}
BUILD_PREBUILD_AXES = ("Размер модели", "Контекстное окно", "Сложность персонажа")
# iter 189 (v4-8): chapters 7-8 close the Build chapter as a self-contained place — the
# assembly chapter prints its six steps + the one per-card budget and links to no other
# chapter (v4: «one place, on time»). The former positive link-set became a NEGATIVE gate;
# the functional coverage is asserted as content (six step rows, the per-card total, the
# canonical range), and the ONE master checklist moved to §9.5.
BUILD_PIPELINE_RETIRED_LINKS = {
    "p7a_token_budget", "p10_elena", "p7a_core_directives",
    "p4_spine_overview", "p6_cot_basics", "p4_spine_full_chain",
    "p2_anchor_rules", "p3_voice_isolation",
    "p5_ocean_basics",
}
BUILD_PIPELINE_CONTENT = ("1. Блок идентичности", "2. Анти-годмодинг", "3. Директивы и обвязка",
                          "4. SPINE", "5. CoT", "6. Проверка бюджета", "~610", "400–900")
BUILD_BUDGET_CONTENT = ("System Prompt", "Description", "Examples", "Greeting", "Anchors",
                        "Что помещается в 4K", "4K-Fallback", "400–900")

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
    if not manifest["parts"] or manifest["parts"][0]["file"] != "part_00.html":
        err("LEARN L1: manifest does not start at part_00.html (the Learn entry)")
    elif manifest["parts"][0]["anchors"][0] != "p0_how_to_read":
        err("LEARN L1: Part 0 first anchor is not p0_how_to_read")

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
    if total != 62:
        err(f"LEARN L2: rendering section count {total} != 62 "
            "(v3 stage 3: Part 8 16->2, Part 9 11->7, Part 10 4->5; stage 4a: "
            "Parts 2/3/4/5/6 de-duplicated; stage 4b/F-19: Appendix C deleted; "
            "v4-7: Part 7B 5->3; v4-8: §7A.11 4K-Fallback absorbed into §7A.12; "
            "v4-9: Part 9 7->5 — p9_symptom_table into p9_basic_checklist, "
            "p9_one_change_rule into p9_test_scenarios — and p1_top3_problems "
            "absorbed into Part 9)")

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
    if {e["file"] for e in manifest.get("appendices", [])} != set(APPENDIX_ORDER):
        err("LEARN L4: manifest appendices set unexpected")

    # LEARN-1 — RESOLVED iter 169 (G4-LEARN (a), the owner-called switch package):
    # Part 0 wired into the runtime corpus — the guard verifies the resolved state
    part0 = (REPO / "docs" / "canon" / "part_00.md").exists()
    part0_master = (MASTER / "part_00.html").exists()
    part0_manifest = any(e["file"].startswith("part_00") for e in manifest["parts"])
    cmap = read(REPO / "docs" / "content_map.md")
    if not (part0 and part0_master and part0_manifest
            and manifest["parts"][0]["file"] == "part_00.html"
            and "wired 169" in cmap):
        err(f"LEARN-1 resolved-state check failed: canon={part0} "
            f"master={part0_master} manifest={part0_manifest}")

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
    if prebuild is not None:
        leaked = BUILD_PREBUILD_RETIRED_LINKS & hrefs(prebuild)
        if leaked:
            err(f"BUILD B2: prebuild profile must stay self-contained (v4 chapter 0), "
                f"retired routing links returned: {sorted(leaked)}")
        for axis in BUILD_PREBUILD_AXES:
            if axis not in prebuild:
                err(f"BUILD B2: prebuild profile lost the «{axis}» decision axis")
    if pipeline is not None:
        leaked = BUILD_PIPELINE_RETIRED_LINKS & hrefs(pipeline)
        if leaked:
            err(f"BUILD B2: §7A.13 assembly must stay self-contained (v4 chapter 8), "
                f"retired chapter links returned: {sorted(leaked)}")
        for token in BUILD_PIPELINE_CONTENT:
            if token not in pipeline:
                err(f"BUILD B2: §7A.13 lost «{token}» (six-step table / per-card total)")
    if budget is not None:
        if hrefs(budget):
            err(f"BUILD B2: §7A.12 budget chapter must stay self-contained (v4 chapter 7), "
                f"found links: {sorted(hrefs(budget))}")
        for token in BUILD_BUDGET_CONTENT:
            if token not in budget:
                err(f"BUILD B2: §7A.12 lost «{token}» (budget table / 4K profile / calculator range)")

    # B3 — default visibility: value tables + capability checklist + templates
    for sid in ("p7a_sampling_params", "p7a_model_checklist"):
        if section(m07a, sid) is None or section(b07a, sid) is None:
            err(f"BUILD B3: §7A value/checklist surface {sid} missing")
    # F-20 (iter 178): the ШАБЛОН chip is retired — the copyable template surface is the
    # <pre><code> block itself (the 4-label vocabulary has no template label).
    pre_blocks = read(MASTER / "part_07a.html").count("<pre><code>") + \
        read(MASTER / "part_07b.html").count("<pre><code>")
    if pre_blocks < 1:
        err("BUILD B3: no copyable template block (<pre><code>) in 7A/7B")
    if pipeline and "Итого" not in pipeline:
        err("BUILD B3: §7A.13 budget table has no totals (Итого) row")

    # B4 — completion: the ONE master checklist (iter 189/v4-8: it lives in §9.5,
    # `p9_pre_deploy`; §7A.13 ends with the per-card budget table and must not re-grow a copy)
    if pipeline and pipeline.count("☐"):
        err(f"BUILD B4: §7A.13 re-grew a checklist ({pipeline.count('☐')} items) — "
            "the one master checklist is §9.5")
    deploy = section(read(MASTER / "part_09.html"), "p9_pre_deploy")
    if deploy is None or deploy.count("☐") < 5:
        err("BUILD B4: §9.5 master checklist missing or has < 5 items")
    m10 = read(MASTER / "part_10.html")
    dem = m10.count("Карточка демонстрирует:")
    if dem != len(PART_10_CARDS):
        err(f"BUILD B4: Part 10 «Карточка демонстрирует:» annotations {dem} != {len(PART_10_CARDS)}")

    # ================= REFERENCE =================
    # R1 — entry: runtime panel + no-JS page + the generated data layer
    # iter-193 (DEC-33): the glossary side tab is retired; the dock's 📖
    # button (id="fab-glossary") is the single entry point to the same panel.
    for marker in ("id=\"fab-glossary\"", "id=\"glossary-panel\"", "id=\"glossary-content\""):
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

    # R3 — the appendix layer: A/E wired, B absorbed into E, C retired (F-19),
    # D canon-only, zero broken links
    app_files = {e["file"] for e in manifest.get("appendices", [])}
    if app_files != set(APPENDIX_ORDER):
        err(f"REFERENCE R3: manifest appendices {sorted(app_files)} != A/E set")
    order_re = re.search(r"APPENDIX_GUIDE_ORDER\s*=\s*\[(.*?)\]", loader, re.DOTALL)
    if not order_re:
        err("REFERENCE R3: APPENDIX_GUIDE_ORDER not found in lazy-loader")
    else:
        declared = re.findall(r"'([^']+\.html)'", order_re.group(1))
        if declared != APPENDIX_ORDER:
            err(f"REFERENCE R3: APPENDIX_GUIDE_ORDER {declared} != A/E guide order")
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

    # REFERENCE-1 — RESOLVED iter 169 (G4-REF (a), the owner-called switch
    # package): the shell <noscript> block links the no-JS glossary page
    linked = "parts/glossary" in shell_index
    if not linked:
        err("REFERENCE-1 resolved-state check failed: the shell noscript "
            "glossary link (iter 169) is missing")

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
          "built corpus: Learn (TOC/Part-0 entry, 12-part linear order == "
          "manifest == render order, 65/65 difficulty metadata (incl. Part 0), F6 disclosure, "
          "Part 10 completion); Build (§1.6 profile -> §7A.13/§7A.12 + Part 10 "
          "blueprints, all wiring targets resolve, value/checklist/template "
          "surfaces present, assembly checklist + Итого + 4 annotations); "
          "Reference (runtime panel + no-JS page + 45-term chain, every "
          "anchor_id/cross_ref resolves, appendices A/E wired A->E with "
          "Appendix D canon-only and zero broken links).")


if __name__ == "__main__":
    main()
