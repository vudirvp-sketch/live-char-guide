# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-15
> **Iteration:** 112

---

## Current State

**iter 112 — Dead code cleanup (4 dead widgets + .fi26 CSS utilities).**

Removed verified-dead runtime code identified in iter-1-research audit. No functional change — all 4 widgets had 0 container usages in master HTML, .fi26-* classes had 0 HTML/JS references. Browser was downloading + parsing + executing 4 widget JS files (339 lines) on every page load with zero effect; same for 262 lines of unused CSS utilities.

- **4 dead widget JS files removed (339 lines):** `diagnostic-tree.js` (79), `blueprint-viewer.js` (63), `author-note-viewer.js` (93), `vs-e15-blueprint.js` (104). Verified: 0 occurrences of `.vs-diagnostic-tree`, `.vs-blueprint-viewer`, `.vs-author-note-viewer`, `.layer-toggle[data-layer]` in `src/master/`. Tests in `tests/` do not reference any of these widgets.
- **Script tags removed:** 4 `<script src="widgets/...">` entries deleted from `src/shell/index.html` (lines 127-131 in pre-iter-112 version).
- **Init calls removed:** 3 `initAll()` invocations removed from `src/shell/lazy-loader.js` (VsDiagnosticTree, VsBlueprintViewer, VsAuthorNoteViewer at L1090-1098 pre-iter-112). `vs-e15-blueprint` had no init call in lazy-loader (it self-initialized via MutationObserver — now removed with the file).
- **`.fi26-*` CSS utilities removed (262 lines):** Block at `src/shell/styles.css` lines 7296-7557 (FIX-26 utilities: `.fi26-cell-*`, `.fi26-c-*` colors, `.fi26-container-*`, `.fi26-delay-*` animation delays). Verified: 63 CSS class definitions, 0 usages in `src/master/` + `src/shell/lazy-loader.js` + `src/shell/widgets/*.js`.
- **Files edited (3 source + 4 deleted + 3 docs + 6 auto-regenerated):** DELETED 4 widget JS files + EDITED `src/shell/index.html` (4 script tags removed) + `src/shell/lazy-loader.js` (3 init blocks removed) + `src/shell/styles.css` (262 lines removed, 7557 → 7295 lines) + `AGENT_NAVIGATION.md` (widget count 16 → 12, list updated, pitfall #11 updated) + `STATUS.md` (this entry) + `worklog.md` (iter-112 entry). Auto-regenerated via `pnpm run build`: `index.html` (root) + `widgets/` (root mirror, 18 → 14 files) + `build.hash` + `assets/` (root) + `event-bus.js` (root) + `data/` (root mirror).
- **Validation:** `pnpm run build` SUCCESS (hash f70870c0 → c5c429e2 — second hash change since iter 96). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` PASS (no inline scripts). `qa:bundle` PASS (7.4 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — baseline preserved). `qa:syntax` baseline (pre-existing, no regression). `qa:doc-versions` PASS.
- **Scope:** 3 source files edited + 4 deleted (over 3–5 soft limit) — justified by coherent single-purpose iteration (dead code removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via grep + build + 64 tests + 5 QA gates.

---

## Invariants

- **Version sync:** Canonical = 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` + `mermaid-init.js` JSDoc.
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** Dynamic theme switching — diagrams re-render on toggle between dark and light.
- **Canon → master sync:** 97/97 PASS.
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).
- **CORE_DIRECTIVES numbering:** #6 = Consequence Driven, #7 = Pre-Generation Filter.
- **SP Language rule (iter 110):** Layered — 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language (§7A.2 RULE).
- **Identity name-language (iter 110):** Canonical form preserved across all card blocks — transliteration forbidden (§7A.1 RULE).
- **Script Tax (iter 110):** Non-Latin scripts cost ~1.5–2× tokens on 32K vocab; ≥128K → negligible (§7A.12 RULE).
- **Widget count (iter 112):** 12 widgets in `src/shell/widgets/` (was 16). 4 dead widgets removed: `diagnostic-tree`, `blueprint-viewer`, `author-note-viewer`, `vs-e15-blueprint` — all had 0 container usages in master HTML.

Full invariants list: see `AGENT_NAVIGATION.md` §5 and §6.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| _(none — all KIs resolved)_ | — | — | — |

> **KI lifecycle:** No open KIs. Last implicit: naming drift in `part_07a.md` (found + fixed same iteration iter-111 per §3 rule, no KI# assigned).

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 112** | Dead code cleanup — 4 dead widgets removed + .fi26 CSS utilities removed (601 lines total) | ✅ COMPLETE |
| iter 111 | Fork D (part 1/3) — Voice Influence Hierarchy interactive widget + naming drift fix | ✅ COMPLETE |
| iter 110 | Multilingual forks A+B+C — layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size + Token Budget Script Tax RULE | ✅ COMPLETE |
| iter 108 | Multilingual actualization (safe text-only pass) — removed ~15-20% empirical claims + KI#65 CLOSED | ✅ COMPLETE |
| iter 107 | Category B/C extended translation — cautious zone + Embodiment Protocol quad + KI#64 CLOSED | ✅ COMPLETE |
| deferred | iter-113 cleanup — Mermaid removal + dead V-pattern CSS (inf-pipeline-vertical, spine-stack, spine-validator) + M3 dead CSS + vs-styles.css SECTION 3/4 utilities | — |
| deferred | Fork D (part 2/3) — sampling widget (slider configurator for `p7a_sampling_params`, MEDIUM risk) | — |
| deferred | Fork D (part 3/3) — persona widget (meaning TBD: new 3rd widget or extend persona-synthesis) | — |
