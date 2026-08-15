# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-115-dead-css-shell-styles-cleanup
Agent: main
Task: Remove dead V-pattern CSS (V-02 `inf-pipeline-vertical`, V-06 `spine-stack`, V-15 `spine-validator`) + M3 dead CSS subset from `src/shell/styles.css`. Symmetric to iter-114 (which targeted `src/assets/vs-styles.css`); separate file per iter-112 clean-diff convention. Closes out the "dead CSS" debt.

Work Log:
- 1: 4-axis grep BEFORE removal — V-pattern classes confirmed dead (0 usages in `src/master/` + `parts/` + 0 descendant selectors + 0 JS class injections). M3 region: DISCOVERY — iter-114 worklog claimed "M3 widget CSS" was dead, but 4-axis grep DISPROVED this. Most M3 classes ARE used by widgets via dynamic `className =` injection: `ocean-insight.js` uses `.ocean-slider-track-wrapper` (L775), `.ocean-comfort-zone` (L781), `.ocean-conflict-marker` (L788), `.ocean-comment-row`/`-input` (L795,798), `.ocean-highlight-notification` (L330); `enneagram-builder.js` uses `.enneagram-conflict-warnings` (L380), `.conflict-warning`/`.warning-icon`/`.warning-question` (L383-386), `.enneagram-mbti-live*` (L319-321), `.enneagram-mbti-compat` (L324), `.mbti-match-highlight` (L311); `mbti-composer.js` uses `.mbti-enneagram-*` (L225,238-267), `.mbti-ocean-compat*` (L287-311), `.compat-trait-letter`/`-arrow` (L309,311), `.mbti-export-section`/`-btn` (L357-358). Only 6 specific M3 rules truly dead (orphaned overrides + never-injected variants + unused `.fadeout` class).
- 2: Wrote `/home/z/my-project/scripts/iter115_remove_dead_css_shell.py` — Python script with exact-string removal for V-02/V-06 blocks + line-range cut for V-15 block (using start/end markers `=== SPINE VALIDATOR (V-15) ===` → `=== OCEAN INSIGHT WIDGET (§4.1 Persona Synthesis Framework) ===`) + 6 individual M3 rule removals. Each removal verified to occur EXACTLY once before deletion. Brace integrity check post-removal. Persisted script per Rule 9.
- 3: Executed script. Result: `src/shell/styles.css` 7273 → 7025 lines (248 lines, 5312 bytes / ~5.3 KB removed, ~3.4% reduction). V-15 block = 181 lines, V-02 = 31, V-06 = 28 (240 total V-pattern). M3 dead subset = 8 lines (6 rules + 1 comment + 1 trailing blank). Brace integrity verified (1376/1376 → 1352/1352, delta -24 matches removed `{` count). No blank-line collapse needed (boundaries were already clean).
- 4: Post-removal grep sanity check — dead classes (inf-pipeline-vertical, spine-stack, spine-validator, ocean-comfort-tooltip, marker-orange, marker-red, notification.fadeout) = 0 occurrences in src/shell/styles.css. Preserved classes (ocean-slider-track-wrapper, ocean-comfort-zone, ocean-conflict-marker, ocean-comment-input, ocean-highlight-notification, ocean-notification-fadein) all still present.
- 5: Updated `STATUS.md` (iter 114 → 115, current state replaced, invariants updated with shell/styles.css iter-115 entry, roadmap iter-114 → iter-115 row + deferred iter-115 REMOVED since it's now done + added "Self-admitted dupes cleanup" to deferred list). Updated `AGENT_NAVIGATION.md` — top header (iter 114 → 115), §8 roadmap (iter-115 added, deferred iter-115 entry removed, "Self-admitted dupes cleanup" deferred entry added). Updated `CHANGELOG.md` (iter-115 entry added at top of `## [9.2.6]` section, iter-112 entry collapsed to one-line summary per "latest 2–3 in detail" rule).
- 6: Validation: `pnpm run build` SUCCESS (hash 2ab607d6 UNCHANGED — expected per AGENT_NAVIGATION §2 invariant: hash computed only from `src/shell/index.html`; `src/shell/styles.css` changes don't enter the hash). `validate` 5/5 + SHELL-STYLES PASS. `validate:master` 12/12 PASS (pre-existing warnings unchanged). `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `audit_canon_master_drift.py` informational exit 0. `audit_vs_embeds.py` no regressions. `audit_component_extracts.py` exit 0. `qa:csp` PASS. `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — no `src/master/` edits). `qa:syntax` 247 baseline (pre-existing, no regression). `qa:doc-versions` PASS.

Stage Summary:
- **iter 115 COMPLETE — Dead CSS removed from `src/shell/styles.css`.** 248 lines / ~5.3 KB removed (~3.4% reduction).
- **1 source file edited + 3 docs + 2 auto-regenerated:** EDITED `src/shell/styles.css` (7273 → 7025 lines) + `STATUS.md` + `worklog.md` + `AGENT_NAVIGATION.md` + `CHANGELOG.md`. Auto-regenerated via `pnpm run build`: `assets/shell-styles.css` (root fallback, matches canonical) + `index.html` (root — only timestamp comment changed).
- **Discovery recorded:** iter-114 worklog's "M3 dead CSS" claim was wrong. Most M3 widget CSS is live (used by 3 widgets via `className =` injection). Only 6 specific orphaned/unused M3 rules were truly dead. Lesson for future agents: always run 4-axis grep before claiming a CSS region is dead; "M3" is a phase label, not a liveness indicator.
- **Scope:** 1 source file = within 3–5 soft limit. Coherent single-purpose iteration (dead CSS removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via 4-axis grep + build + 64 tests + 5 QA gates + 4 canon audits + brace integrity check.
- **Next iteration candidates:** (a) Fork D (part 2/3) sampling widget (slider configurator for `p7a_sampling_params`, MEDIUM risk); (b) Fork D (part 3/3) persona widget (TBD); (c) Self-admitted dupes cleanup (§7A.12 plain-copy pre-block, §9.11 quick-check table) — content decisions requiring visual diff. Pending user decision.

---

Task ID: iter-114-dead-css-vs-styles-cleanup (one-line summary)
- iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css`: SECTION 3 (VS Shared Patterns P1–P6, 196 lines) + 12 dead SECTION 4 utility blocks (211 lines) removed. 407 lines total, ~10.2 KB. 1 source + 3 docs + 2 auto-regen. Canon sync 97/97. Build hash 2ab607d6 unchanged. 0 new English leaks.

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
