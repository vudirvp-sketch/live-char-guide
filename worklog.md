# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-112-dead-code-cleanup
Agent: main
Task: Remove verified-dead runtime code identified in iter-1-research audit — 4 dead widget JS files + .fi26 CSS utilities. No functional change, all targets verified 0 usages.

Work Log:
- 1: Deleted 4 dead widget JS files from `src/shell/widgets/`: `diagnostic-tree.js` (79 lines), `blueprint-viewer.js` (63), `author-note-viewer.js` (93), `vs-e15-blueprint.js` (104) — total 339 lines. Verified pre-deletion: 0 occurrences of `.vs-diagnostic-tree` / `.vs-blueprint-viewer` / `.vs-author-note-viewer` / `.layer-toggle[data-layer]` in `src/master/`. Tests in `tests/` do not reference any of these widgets.
- 2: Removed 4 `<script src="widgets/...">` entries from `src/shell/index.html` (vs-e15-blueprint, diagnostic-tree, blueprint-viewer, author-note-viewer). Browser no longer downloads/parses/executes these files on page load.
- 3: Removed 3 `initAll()` invocations from `src/shell/lazy-loader.js` L1090-1098 (VsDiagnosticTree, VsBlueprintViewer, VsAuthorNoteViewer). `vs-e15-blueprint` had no init call in lazy-loader (self-initialized via MutationObserver — removed with the file).
- 4: Removed `.fi26-*` CSS utilities block from `src/shell/styles.css` lines 7296-7557 (262 lines including header comment). Block contained 63 class definitions (`.fi26-cell-*`, `.fi26-c-*` colors, `.fi26-container-*`, `.fi26-delay-*` animation delays). Verified: 0 usages in `src/master/` + `src/shell/lazy-loader.js` + `src/shell/widgets/*.js`. styles.css line count: 7557 → 7295.
- 5: Updated `AGENT_NAVIGATION.md` §1 (widget count 16 → 12 in two table rows, widget list trimmed) + §6 pitfall #11 (removed `blueprint-viewer destroy()` from widget guards list) + §8 roadmap (added iter-112 entry, deferred iter-113 cleanup entry). Updated `STATUS.md` (iter 111 → 112, current state replaced, invariants widget count updated, roadmap updated).
- 6: Validation: `pnpm run build` SUCCESS (hash f70870c0 → c5c429e2 — second hash change since iter 96; expected since index.html was edited). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` PASS. `qa:bundle` PASS (7.4 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression). `qa:syntax` baseline (pre-existing, no regression). `qa:doc-versions` PASS.

Stage Summary:
- **iter 112 COMPLETE — Dead code cleanup.** 601 lines removed (339 JS + 262 CSS).
- **3 source files edited + 4 deleted + 3 docs:** DELETED 4 widget JS + EDITED `src/shell/index.html` + `src/shell/lazy-loader.js` + `src/shell/styles.css` + `AGENT_NAVIGATION.md` + `STATUS.md` + `worklog.md`. Plus 6 auto-regenerated root fallbacks via `pnpm run build` (index.html + widgets/ 18→14 files + build.hash + assets/ + event-bus.js + data/).
- **Scope:** 7 files touched (3 source + 4 deleted) — over 3–5 soft limit, justified by coherent single-purpose iteration (dead code only, no logic, no content, no schema, no version bump). All edits verified zero functional impact via grep + 64 tests + 5 QA gates.
- **Next iteration candidates:** (a) iter-113 cleanup — Mermaid removal + dead V-pattern CSS (inf-pipeline-vertical, spine-stack, spine-validator) + M3 dead CSS + vs-styles.css SECTION 3/4 utilities; (b) Fork D (part 2/3) sampling widget; (c) iter-3 self-admitted dupes cleanup (§7A.12 plain-copy pre-block, §9.11 quick-check table). Pending user decision.

---

Task ID: iter-111-voice-hierarchy-widget (one-line summary)
- iter 111 — Fork D (part 1/3): `persona-voice-hierarchy` interactive widget (16th) for §3.2 — model-tier toggle + hover-sync + MD export. Combined design in ~290 lines JS. Canon-embedded data (6×3 from §3.2 table) — exception to data/*.json rule. Fixed naming drift in `part_07a.md` (p3_voice_hierarchy → p3_influence_hierarchy). 7 source + 6 auto-regen. Canon sync 97/97. Build hash 8499b4e3 → f70870c0. 0 new English leaks.

---

Task ID: iter-110-multilingual-forks-abc (one-line summary)
- iter 110 — Multilingual forks A+B+C: layered SP language rule (12B<64K→EN, ≥128K 12B-14B→either, 32B+/API→card lang) + Identity name-language rule (canonical form preserved) + Script Tax/Vocabulary Size as new Model Table concepts + Token Budget Script Tax RULE. Fork D deferred. 9 source + 6 auto-regenerated. Canon sync 97/97. Build hash 8499b4e3 unchanged. 0 new English leaks.
