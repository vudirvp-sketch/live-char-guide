# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-13
> **Iteration:** 102

---

## Current State

**iter 102 — VS-EMBED placement audit + reorder (6 misplaced visual elements fixed).**

User reported that some visual/interactive elements (tables, VS-EMBEDs, callouts) appear
BEFORE the introductory/explanatory text that should logically precede them — the reader
sees a visual first, then below it the text explaining what it represents. Full survey of
all 14 master HTML files (~6,600 lines, 207 visual elements) identified 6 misplaced
VS-EMBEDs across 4 files. All 6 moved inside their sections, after the intro `<p>`.

- **Survey:** 4 parallel agents scanned part_01–10 + appendices. 1 HIGH + 5 MEDIUM
  confidence misplacements found; 7 LOW-confidence "preamble" patterns left as-is
  (deliberate design — intro text explicitly references "показан выше").
- **Fixes (6 VS-EMBED moves):** E14 (part_09), E06 (part_04), E09 (part_05),
  E08 + E16 + E02 (part_07a). Each moved from BEFORE its `<section>` to INSIDE,
  after the intro `<p>`. E14 intro text updated: "выше" → "ниже".
- **Audit script updated:** `audit_canon_master_sync.py` P0-11 substring updated
  ("показаны выше" → "показаны ниже") to match the reordered text.
- **Validation:** `validate:master` PASS (12/12). Canon sync 97/97 PASS.
  Build PASS. 64/64 tests PASS. QA: no new syntax/English leaks.
  "Content outside section" warnings reduced 22 → 17 (5 VS-EMBEDs moved inside).
- Scope: 4 master HTML + 1 audit script + 3 doc files = 8 files. Exceeds 3–5 soft
  limit — justified: the 6 VS-EMBED fixes are atomic (partial reorder would leave
  inconsistent placement). Doc updates are mandatory per iteration protocol.

---

## Invariants

- **Version sync:** Canonical = 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json`. ⚠️ `mermaid-init.js` JSDoc shows 9.3.0 — see KI#64.
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** Dynamic theme switching — diagrams re-render on toggle between dark and light.
- **Canon → master sync:** 97/97 PASS.
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).

Full invariants list: see `AGENT_NAVIGATION.md` §5 and §6.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| KI#64 | Version drift: `src/shell/widgets/mermaid-init.js` JSDoc bumped to `9.3.0` alone in iter 100; canonical sources (`package.json`, `src/VERSION`, `data/character_schema.json`) remain at `9.2.6`. Same pattern as KI#63. Resolution requires either (a) rollback `mermaid-init.js` JSDoc → `9.2.6`, or (b) 4-place bump to `9.3.0` (needs user confirmation per §2 — touching `package.json` version field). | OPEN | 2026-08-13 |
| KI#65 | Misplaced VS-EMBEDs: 6 visual elements (E14, E06, E09, E08, E16, E02) appeared BEFORE their introductory text, causing reader confusion. Found and fixed in same iteration. | CLOSED iter-102 | 2026-08-13 |

> **KI lifecycle:** open KIs are listed above. Closed KIs older than 2 iterations are deleted at the start of the next iteration touching `STATUS.md` (per `AGENTS.md` Bug → doc → fix rule).

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 102** | VS-EMBED placement audit + reorder (6 misplaced visuals fixed) | ✅ COMPLETE |
| iter 101 | Agent infrastructure English rewrite + actualization | ✅ COMPLETE |
| iter 103 (proposed) | Resolve KI#64 — version sync reconciliation | pending user decision |
| deferred | V8/V9 Decision items — pending author discussion | — |
