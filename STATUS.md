# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-15
> **Iteration:** 114

---

## Current State

**iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css` (SECTION 3 + dead SECTION 4 utilities).**

Removed 407 lines (~10.2 KB, ~11% reduction) of dead CSS from `src/assets/vs-styles.css`. Single-purpose iteration; separate file from `src/shell/styles.css` (V-pattern + M3 cleanup deferred to a future iter per iter-112 clean-diff convention). All removals verified via 4-axis grep: 0 usages in `src/master/` + `parts/` (class attributes), 0 descendant selector references in `vs-styles.css` + `src/shell/styles.css`, 0 dynamic class injections in `src/shell/` JS, and confirmed `vs-mini-map.js` uses `vs-mini-map*` (with prefix) — bare `.mini-map*` rules are dead.

- **SECTION 3 (entire, 196 lines) — VS Shared Patterns P1–P6 removed:** `.p-stack*`, `.p-flow*`, `.p-tree*`, `.p-radial*`, `.p-compare*`, `.p-blueprint*` + adaptive `@media (max-width: 768px)` block. Zero production usages. Visual-system prototype HTML keeps its own copy via `visual-system/shared/patterns.css` `<link>` tag — not deployed, not affected.
- **SECTION 4 dead utilities (211 lines) removed:** `.glow-cyan/violet/danger/amber`, `.panel--raised`, `.accent-strip--cyan/violet/amber/danger`, `.label-mono`, `.label-micro`, `.badge--danger`, `.badge--success`, `.scroll-enter--right`, `.scroll-enter--scale`, `.element-number`, `.element-title`, `.element-subtitle`, `.element-links` (+ descendant `.badge` rules), `.mini-map*` (bare — `vs-mini-map*` with prefix is the live class), `.mono-block`, `.border-dashed`, `.token-annotation`, `.hover-lift` (+ `:hover`). Zero production usages, zero descendant selectors.
- **Preserved (used in production):** `.panel` (14×), `.label` (202×), `.badge` + `.badge--cyan/violet/amber/muted` (72×+44+14+2+2), `.severity-dot` + `--high/--medium` (30+16+14), `.scroll-enter` + `--left` + `.is-visible` (212+10 — required by `vs-scroll-observer.js` SCROLL_ENTER_SELECTOR per §6 pitfall #13).
- **Files edited (1 source + 4 docs + 2 auto-regenerated):** EDITED `src/assets/vs-styles.css` + `STATUS.md` + `worklog.md` + `AGENT_NAVIGATION.md` (§8 roadmap + top header iter 113 → 114) + `CHANGELOG.md` (iter-114 entry). Auto-regenerated via `pnpm run build`: `assets/vs-styles.css` (root fallback — matches canonical, 3242 lines) + `index.html` (root — only "Generated:" timestamp comment changed, hash unchanged).
- **Validation:** `pnpm run build` SUCCESS (hash 2ab607d6 UNCHANGED — expected per AGENT_NAVIGATION §2 invariant: hash computed only from `src/shell/index.html`; vs-styles.css changes don't enter the hash). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `audit_canon_master_drift.py` informational exit 0. `audit_vs_embeds.py` no regressions. `qa:csp` PASS. `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — no `src/master/` edits). `qa:syntax` 247 baseline (pre-existing, no regression). `qa:doc-versions` PASS. CSS brace integrity verified (572/572 balanced).
- **Scope:** 1 source file edited = within 3–5 soft limit. Coherent single-purpose iteration (dead CSS removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via 4-axis grep + build + 64 tests + 5 QA gates + 3 canon audits + brace integrity check.

---

## Invariants

- **Version sync:** Canonical = 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` (4 places — `mermaid-init.js` JSDoc 5th point removed iter-113; sync back to canonical).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** REMOVED iter-113. CDN dependency dropped, `mermaid-init.js` deleted, `.mermaid` CSS removed. Content diagrams = VS-EMBEDs only (since iter 14).
- **vs-styles.css (iter 114):** 3242 lines (was 3649). SECTION 3 (Patterns P1–P6) fully removed. SECTION 4 trimmed to in-use utilities only (`.panel`/`.label`/`.badge`+`--cyan/violet/amber/muted`/`.severity-dot`+`--high/--medium`/`.scroll-enter`+`--left`/`.is-visible`).
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

> **KI lifecycle:** No open KIs. iter-114 was a clean dead-CSS removal — no new bugs found.

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 114** | Dead CSS cleanup in `src/assets/vs-styles.css` — SECTION 3 (Patterns P1–P6, 196 lines) + 12 dead SECTION 4 utility blocks (211 lines) removed. 407 lines total, ~10.2 KB. Hash unchanged (vs-styles.css not in hash input). | ✅ COMPLETE |
| iter 113 | Mermaid infrastructure removal — `mermaid-init.js` deleted + CDN script + lazy-loader init/render + `reRenderMermaid()` + `.mermaid` CSS. CSP tightened (script-src + worker-src). | ✅ COMPLETE |
| iter 112 | Dead code cleanup — 4 dead widgets removed + .fi26 CSS utilities removed (601 lines total) | ✅ COMPLETE |
| iter 111 | Fork D (part 1/3) — Voice Influence Hierarchy interactive widget + naming drift fix | ✅ COMPLETE |
| iter 110 | Multilingual forks A+B+C — layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size + Token Budget Script Tax RULE | ✅ COMPLETE |
| iter 108 | Multilingual actualization (safe text-only pass) — removed ~15-20% empirical claims + KI#65 CLOSED | ✅ COMPLETE |
| iter 107 | Category B/C extended translation — cautious zone + Embodiment Protocol quad + KI#64 CLOSED | ✅ COMPLETE |
| deferred | iter-115 cleanup — dead V-pattern CSS (`inf-pipeline-vertical`, `spine-stack`, `spine-validator`) + M3 dead CSS in `src/shell/styles.css` (separate file, clean diff) | — |
| deferred | Fork D (part 2/3) — sampling widget (slider configurator for `p7a_sampling_params`, MEDIUM risk) | — |
| deferred | Fork D (part 3/3) — persona widget (meaning TBD: new 3rd widget or extend persona-synthesis) | — |
