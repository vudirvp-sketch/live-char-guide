# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-114-dead-css-vs-styles-cleanup
Agent: main
Task: Remove dead CSS from `src/assets/vs-styles.css`. iter-113 deferred the work (separate file from `src/shell/styles.css`, clean-diff convention per iter-112). Scope: SECTION 3 (VS Shared Patterns P1–P6) entirely + 12 dead utility blocks in SECTION 4. Visual-system prototype HTML uses its OWN copy via `visual-system/shared/*.css` `<link>` tags (not the deployed `vs-styles.css`) — not affected.

Work Log:
- 1: Wrote `/home/z/my-project/scripts/iter114_remove_dead_css.py` — Python script that defines exact text blocks to remove, verifies each occurs EXACTLY once in source before replacing, then collapses 4+ blank lines to 3. Persisted script per Rule 9 (script persistence). All 12 removal blocks confirmed single-occurrence: SECTION 3 (entire 196-line block) + 11 SECTION 4 dead utility blocks (`glow-*`, `panel--raised`, `accent-strip--*`, `label-mono`/`label-micro`, `badge--danger`/`badge--success`, `scroll-enter--right`/`scroll-enter--scale`, `element-number`/`element-title`/`element-subtitle`/`element-links`+descendants, bare `mini-map*`, `mono-block`, `border-dashed`, `token-annotation`, `hover-lift`).
- 2: Audit BEFORE removal — 4-axis grep verification: (a) `class="...<class>"` in `src/master/` + `parts/` → 0; (b) `.<class>` descendant selector refs in `vs-styles.css` + `src/shell/styles.css` → 0; (c) `className`/`classList`/`class=` injection in `src/shell/` JS → 0 (only `vs-mini-map*` matches found, those use `vs-` prefix); (d) verified `vs-mini-map.js` widget uses `vs-mini-map*` class names (not bare `mini-map*`), and `.vs-mini-map*` CSS lives in `src/shell/styles.css` L7021+ — so bare `.mini-map*` rules in vs-styles.css SECTION 4 are dead.
- 3: Confirmed `src/assets/vs-styles.css` is canonical (build script `build-shell-unified.mjs` step 5 just `copyFile`s it to `dist/assets/`; no consolidation from `visual-system/shared/*.css`). Edits will NOT be overwritten on next build.
- 4: Executed script. Result: `src/assets/vs-styles.css` 3649 → 3242 lines (407 lines, ~10.2 KB / 8194 bytes removed). SECTION headers now go 1, 2, 4, 5, 6 (SECTION 3 gone). Brace integrity verified (572/572 balanced). Boundary between SECTION 2 and SECTION 4 is clean (2 blank lines).
- 5: Updated `STATUS.md` (iter 113 → 114, current state replaced, invariants updated with vs-styles.css iter-114 entry, roadmap iter-113 → iter-114 row + deferred iter-115 for `src/shell/styles.css` V-pattern cleanup). Updated `AGENT_NAVIGATION.md` — top header (iter 113 → 114, 3649 → 3242 lines note for vs-styles.css), §8 roadmap (iter-114 added, deferred iter-115 renamed). Updated `CHANGELOG.md` (added iter-114 entry under Keep a Changelog format).
- 6: Validation: `pnpm run build` SUCCESS (hash 2ab607d6 UNCHANGED — expected per AGENT_NAVIGATION §2 invariant: hash computed only from `src/shell/index.html`; vs-styles.css changes don't enter the hash). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS (warnings pre-existing, no new ones). `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `audit_canon_master_drift.py` informational exit 0. `audit_vs_embeds.py` no regressions (all animation-classed elements observed). `qa:csp` PASS. `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — no `src/master/` edits). `qa:syntax` 247 baseline (pre-existing, no regression). `qa:doc-versions` PASS.

Stage Summary:
- **iter 114 COMPLETE — Dead CSS removed from `src/assets/vs-styles.css`.** 407 lines / ~10.2 KB removed (~11% reduction).
- **1 source file edited + 3 docs + 2 auto-regenerated:** EDITED `src/assets/vs-styles.css` + `STATUS.md` + `worklog.md` + `AGENT_NAVIGATION.md` + `CHANGELOG.md`. Auto-regenerated via `pnpm run build`: `assets/vs-styles.css` (root fallback, matches canonical) + `index.html` (root — only timestamp comment changed).
- **Scope:** 1 source file = within 3–5 soft limit. Coherent single-purpose iteration (dead CSS removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via 4-axis grep + build + 64 tests + 5 QA gates + 3 canon audits + brace integrity check.
- **Next iteration candidates:** (a) iter-115 cleanup — dead V-pattern CSS (`inf-pipeline-vertical`, `spine-stack`, `spine-validator`) + M3 dead CSS in `src/shell/styles.css` (different file, separate iteration per iter-112 clean-diff convention); (b) Fork D (part 2/3) sampling widget (MEDIUM risk); (c) Self-admitted dupes cleanup (§7A.12 plain-copy pre-block, §9.11 quick-check table). Pending user decision.

---

Task ID: iter-113-mermaid-removal (one-line summary)
- iter 113 — Mermaid infrastructure removal: `mermaid-init.js` deleted (141 lines) + CDN script + lazy-loader init/render block + `reRenderMermaid()` + `.mermaid` CSS. CSP tightened (script-src dropped CDN, worker-src directive dropped). 3 source + 1 deleted + 4 docs + 6 auto-regen. Canon sync 97/97. Build hash c5c429e2 → 2ab607d6. 0 new English leaks.

---

Task ID: iter-112-dead-code-cleanup (one-line summary)
- iter 112 — Dead code cleanup: removed 4 dead widgets (`diagnostic-tree`, `blueprint-viewer`, `author-note-viewer`, `vs-e15-blueprint`, 339 lines JS) + 4 script tags + 3 initAll() calls + `.fi26-*` CSS utilities (262 lines). 601 lines total. 3 source + 4 deleted + 3 docs + 6 auto-regen. Canon sync 97/97. Build hash f70870c0 → c5c429e2. 0 new English leaks.

---

Task ID: iter-111-voice-hierarchy-widget (one-line summary)
- iter 111 — Fork D (part 1/3): `persona-voice-hierarchy` interactive widget (16th) for §3.2 — model-tier toggle + hover-sync + MD export. Combined design in ~290 lines JS. Canon-embedded data (6×3 from §3.2 table) — exception to data/*.json rule. Fixed naming drift in `part_07a.md` (p3_voice_hierarchy → p3_influence_hierarchy). 7 source + 6 auto-regen. Canon sync 97/97. Build hash 8499b4e3 → f70870c0. 0 new English leaks.

---

Task ID: iter-110-multilingual-forks-abc (one-line summary)
- iter 110 — Multilingual forks A+B+C: layered SP language rule (12B<64K→EN, ≥128K 12B-14B→either, 32B+/API→card lang) + Identity name-language rule (canonical form preserved) + Script Tax/Vocabulary Size as new Model Table concepts + Token Budget Script Tax RULE. Fork D deferred. 9 source + 6 auto-regenerated. Canon sync 97/97. Build hash 8499b4e3 unchanged. 0 new English leaks.
