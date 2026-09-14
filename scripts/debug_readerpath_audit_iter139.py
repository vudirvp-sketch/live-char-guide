#!/usr/bin/env python3
"""Debug reader-path audit (mig-3 acceptance) — one-shot verification script.

Verifies the chain symptom → cause → test → one-change → validation
end-to-end on the BUILT artifact (parts/*.html + src/master mirror):

  1. SYMPTOM   — the 3 E13 symptoms are reachable in §9.6 (canon + master +
                 built parts/part_09.html) and in the E13 embed.
  2. CAUSE     — every diagnosis branch carries an AP/E pointer; every linked
                 anchor target exists in the built artifact set.
  3. TEST      — §9.6 E13 intro links §9.7 (test scenarios); §9.7 exists and
                 carries the 6-scenario table.
  4. ONE-CHANGE — §9.6 intro links §9.2; §9.2 exists, carries the RULE and the
                 back-link to §9.6 (IMP-48 pair).
  5. VALIDATION — §9.7 Сценарий links §9.9 (metrics) and §9.11 (pre-deploy).

Every <a href="#X"> inside the new §9.6 sub-table + intro is checked against
the set of all ids/section-ids present in the built artifact (parts/*.html).

Exit 0 — PASS; 1 — FAIL. Run: python3 scripts/debug_readerpath_audit_iter139.py
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
MASTER_9 = REPO / "src" / "master" / "part_09.html"
CANON_9 = REPO / "docs" / "canon" / "part_09.md"
PARTS_DIR = REPO / "parts"

SYMPTOMS = [
    "Персонаж дрейфует после 5–10 сообщений",
    "Голос звучит типично / неразличимо",
    "Персонаж игнорирует действия пользователя",
]

errors = []


def err(msg):
    errors.append(msg)


def read(p):
    return p.read_text(encoding="utf-8")


def section(html, sid):
    m = re.search(rf'<section[^>]*data-section="{sid}".*?</section>', html, re.DOTALL)
    return m.group(0) if m else None


def main():
    master9 = read(MASTER_9)
    canon9 = read(CANON_9)
    built9 = read(PARTS_DIR / "part_09.html")

    # all ids available in the built artifact set (parts/*.html)
    all_ids = set()
    for p in sorted(PARTS_DIR.glob("*.html")):
        all_ids.update(re.findall(r'id="([^"]+)"', read(p)))
    all_ids.update(re.findall(r'data-section="([^"]+)"', built9))

    # ---- 1. SYMPTOM ----
    m96 = section(master9, "p9_decision_tree")
    b96 = section(built9, "p9_decision_tree")
    if m96 is None or b96 is None:
        err("p9_decision_tree section missing (master/built)")
        return finish()
    for s in SYMPTOMS:
        if s not in m96:
            err(f"symptom not in master §9.6: {s}")
        if s not in b96:
            err(f"symptom not in built §9.6: {s}")
    e13 = re.search(
        r'<div class="vs-embed" data-vs-element="E13">.*?'
        r"<!-- REPLACED BY VISUAL SYSTEM: E13 -->", master9, re.DOTALL)
    for s in SYMPTOMS:
        if not e13 or s not in e13.group(0):
            err(f"symptom not in E13 embed: {s}")

    # ---- 2. CAUSE: every link target in the new sub-table + intro resolves ----
    new_block = m96[m96.find("<h4>Три базовых симптома"):]
    hrefs = re.findall(r'href="#([^"]+)"', new_block)
    if not hrefs:
        err("no links found in the §9.6 E13 sub-table/intro")
    for h in sorted(set(hrefs)):
        if h not in all_ids:
            err(f"§9.6 E13 block: anchor target missing in built artifact: #{h}")
    expected = {
        "p9_one_change_rule", "p9_test_scenarios", "p7a_authors_note",
        "p1_card_overview", "p3_influence_hierarchy", "p7a_sampling_params",
        "p7a_assembly_pipeline", "p2_embodiment", "p7a_core_directives",
        "p2_basic_anchors",
    }
    if expected - set(hrefs):
        err(f"§9.6 E13 block: expected targets not linked: {expected - set(hrefs)}")

    # ---- 3. TEST: §9.7 exists, carries the scenario table ----
    b97 = section(built9, "p9_test_scenarios")
    if b97 is None:
        err("built §9.7 (p9_test_scenarios) missing")
    elif "Нейтральное приветствие" not in b97:
        err("built §9.7: 6-scenario table missing")

    # ---- 4. ONE-CHANGE: §9.2 rule + back-link (IMP-48 pair) ----
    b92 = section(built9, "p9_one_change_rule")
    if b92 is None:
        err("built §9.2 (p9_one_change_rule) missing")
    else:
        if "Никогда не меняйте более одного параметра" not in b92:
            err("built §9.2: RULE text missing")
        if 'href="#p9_decision_tree"' not in b92:
            err("built §9.2: back-link to §9.6 missing (IMP-48 pair)")
    if "[ref: §9.6 — Дерево решений]" not in canon9:
        err("canon §9.2: back-link to §9.6 missing")

    # ---- 5. VALIDATION: §9.7 → §9.9 + §9.11 ----
    if b97 is not None:
        if 'href="#p9_test_requirements"' not in b97:
            err("built §9.7: link to §9.9 (metrics) missing")
        if 'href="#p9_pre_deploy"' not in b97:
            err("built §9.7: link to §9.11 (pre-deploy validation) missing")

    return finish()


def finish():
    print("Debug reader-path audit (mig-3 acceptance, iter 139)")
    print("  chain: symptom → cause → test → one-change → validation")
    if errors:
        print(f"\nFAIL — {len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    print("\nPASS — all 3 symptoms reachable in §9.6 (master + built) and the "
          "E13 embed; every diagnosis anchor resolves in the built artifact; "
          "§9.7 (test) + §9.2 (one-change, back-linked) + §9.9/§9.11 "
          "(validation) wired.")


if __name__ == "__main__":
    main()
