# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-15
> **Iteration:** 115

---

## Current State

**iter 115 — Dead CSS cleanup in `src/shell/styles.css` (V-pattern blocks + M3 dead subset).**

Removed 248 lines (~5.3 KB, ~3.4% reduction) of dead CSS from `src/shell/styles.css`. Symmetric to iter-114 (which targeted `src/assets/vs-styles.css`); separate file per iter-112 clean-diff convention. Closes out the "dead CSS" debt — both CSS files now trimmed to in-use rules only. All removals verified via 4-axis grep: 0 usages in `src/master/` + `parts/` (class attributes), 0 descendant selector references in CSS, 0 dynamic `className`/`classList` injections in `src/shell/widgets/*.js`.

- **V-pattern blocks removed (3 blocks, 240 lines):** V-02 `inf-pipeline-vertical` (31 lines), V-06 `spine-stack` (28 lines), V-15 `spine-validator` (181 lines, whole family including `.spine-input*`, `.spine-validate-btn`, `.spine-clear-btn`, `.spine-result-*`). All zero usages.
- **M3 dead subset removed (8 lines):** iter-114 worklog claimed "M3 widget CSS" was dead — iter-115 4-axis grep DISPROVED this. Most M3 CSS is alive (used by `ocean-insight.js`, `enneagram-builder.js`, `mbti-composer.js` via `className =` injection). Only 6 specific rules were truly dead: `body.theme-light .ocean-comfort-tooltip` (orphaned override), `.ocean-conflict-marker-marker-orange` (variant never injected), `.ocean-conflict-marker-marker-red` (same), `.ocean-comfort-tooltip` (never created by JS), `.ocean-slider-track-wrapper:hover .ocean-comfort-tooltip` (orphaned), `.ocean-highlight-notification.fadeout` (JS uses `removeChild`, not `.fadeout` class).
- **Preserved (verified live):** `.ocean-slider-track-wrapper`, `.ocean-comfort-zone`, `.ocean-conflict-marker`, `.ocean-comment-row`/`-input`, `.ocean-highlight-notification`, `@keyframes ocean-notification-fadein`, `.enneagram-conflict-warnings`, `.conflict-warning`/`.warning-icon`/`.warning-question`, `.enneagram-mbti-live*`/`-compat`, `.mbti-match-highlight`, `.mbti-enneagram-*`, `.mbti-ocean-compat*`, `.compat-trait-letter`/`-arrow`, `.mbti-export-section`/`-btn`.
- **Files edited (1 source + 4 docs + 2 auto-regenerated):** EDITED `src/shell/styles.css` (7273 → 7025 lines) + `STATUS.md` + `worklog.md` + `AGENT_NAVIGATION.md` (§8 roadmap + top header iter 114 → 115) + `CHANGELOG.md` (iter-115 entry, iter-112 collapsed to one-liner per "latest 2–3 in detail" rule). Auto-regenerated via `pnpm run build`: `assets/shell-styles.css` (root fallback — matches canonical, 7025 lines) + `index.html` (root — only "Generated:" timestamp comment changed, hash unchanged).
- **Validation:** `pnpm run build` SUCCESS (hash 2ab607d6 UNCHANGED — expected per AGENT_NAVIGATION §2 invariant: hash computed only from `src/shell/index.html`; `src/shell/styles.css` changes don't enter the hash). `validate` 5/5 + SHELL-STYLES PASS. `validate:master` 12/12 PASS (pre-existing warnings unchanged). `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `audit_canon_master_drift.py` informational exit 0. `audit_vs_embeds.py` no regressions. `audit_component_extracts.py` exit 0. `qa:csp` PASS. `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — no `src/master/` edits). `qa:syntax` 247 baseline (pre-existing, no regression). `qa:doc-versions` PASS. CSS brace integrity verified (1352/1352 balanced, delta -24 matches removed block count).
- **Scope:** 1 source file edited = within 3–5 soft limit. Coherent single-purpose iteration (dead CSS removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via 4-axis grep + build + 64 tests + 5 QA gates + 4 canon audits + brace integrity check.

---

## Invariants

- **Version sync:** Canonical = 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` (4 places — `mermaid-init.js` JSDoc 5th point removed iter-113; sync back to canonical).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** REMOVED iter-113. CDN dependency dropped, `mermaid-init.js` deleted, `.mermaid` CSS removed. Content diagrams = VS-EMBEDs only (since iter 14).
- **vs-styles.css (iter 114):** 3242 lines (was 3649). SECTION 3 (Patterns P1–P6) fully removed. SECTION 4 trimmed to in-use utilities only.
- **shell/styles.css (iter 115):** 7025 lines (was 7273). V-pattern blocks V-02/V-06/V-15 removed (dead). M3 widget CSS preserved (live — used by `ocean-insight.js`, `enneagram-builder.js`, `mbti-composer.js`); only 6 specific orphaned/unused M3 rules removed.
- **Canon → master sync:** 97/97 PASS.
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).
- **CORE_DIRECTIVES numbering:** #6 = Consequence Driven, #7 = Pre-Generation Filter.
- **SP Language rule (iter 110):** Layered — 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language (§7A.2 RULE).
- **Identity name-language (iter 110):** Canonical form preserved across all card blocks — transliteration forbidden (§7A.1 RULE).
- **Script Tax (iter 110):** Non-Latin scripts cost ~1.5–2× tokens on 32K vocab; ≥128K → negligible (§7A.12 RULE).
- **Widget count (iter 113):** 12 widgets in `src/shell/widgets/`. iter-112 removed 4 dead widgets; iter-113 removed `mermaid-init.js` (Mermaid infra, not user-facing widget).

Full invariants list: see `AGENT_NAVIGATION.md` §5 and §6.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| _(none — all KIs resolved)_ | — | — | — |

> **KI lifecycle:** No open KIs. iter-115 was a clean dead-CSS removal — no new bugs found.

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 115** | Dead CSS cleanup in `src/shell/styles.css` — V-02/V-06/V-15 V-pattern blocks (240 lines) + 6 specific dead M3 rules (8 lines) removed. 248 lines total, ~5.3 KB. Hash unchanged (shell/styles.css not in hash input). M3 widget CSS confirmed LIVE (iter-114 deferred-task description was wrong — most M3 classes are used by widgets via `className =` injection). | ✅ COMPLETE |
| iter 114 | Dead CSS cleanup in `src/assets/vs-styles.css` — SECTION 3 (Patterns P1–P6) + 12 dead SECTION 4 utility blocks removed. 407 lines total, ~10.2 KB. | ✅ COMPLETE |
| iter 113 | Mermaid infrastructure removal — `mermaid-init.js` deleted + CDN script + lazy-loader init/render + `reRenderMermaid()` + `.mermaid` CSS. CSP tightened (script-src + worker-src). | ✅ COMPLETE |
| iter 112 | Dead code cleanup — 4 dead widgets removed + .fi26 CSS utilities removed (601 lines total) | ✅ COMPLETE |
| iter 111 | Fork D (part 1/3) — Voice Influence Hierarchy interactive widget + naming drift fix | ✅ COMPLETE |
| iter 110 | Multilingual forks A+B+C — layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size + Token Budget Script Tax RULE | ✅ COMPLETE |
| iter 108 | Multilingual actualization (safe text-only pass) — removed ~15-20% empirical claims + KI#65 CLOSED | ✅ COMPLETE |
| iter 107 | Category B/C extended translation — cautious zone + Embodiment Protocol quad + KI#64 CLOSED | ✅ COMPLETE |
| deferred | Fork D (part 2/3) — sampling widget (slider configurator for `p7a_sampling_params`, MEDIUM risk) | — |
| deferred | Fork D (part 3/3) — persona widget (meaning TBD: new 3rd widget or extend persona-synthesis) | — |
| deferred | Self-admitted dupes cleanup — §7A.12 plain-copy pre-block + §9.11 quick-check table (content decisions requiring visual diff) | — |
