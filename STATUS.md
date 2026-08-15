# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-15
> **Iteration:** 113

---

## Current State

**iter 113 — Mermaid infrastructure removal (dead code since iter 14).**

Removed Mermaid.js CDN dependency and all supporting infrastructure. Mermaid content diagrams were replaced by VS-EMBEDs in iter 14 (`docs/canon/part_01.md` line 51: "Mermaid удалён в iter 14 (дублировал TOC)"); only the CDN script + init widget + lazy-loader init/render logic + `.mermaid` CSS block remained as dead infrastructure. Verified: 0 occurrences of `class="mermaid"` or `.mermaid` selector in `src/master/` and `parts/` — content was already clean.

- **`src/shell/widgets/mermaid-init.js` DELETED (141 lines):** Theme configs + `mermaid.initialize()` init + `window.reRenderMermaid(theme)` dynamic re-render function. All dead code (no `.mermaid` containers in DOM to initialize or re-render).
- **`src/shell/index.html` (130 → 121 lines):** Removed Mermaid CDN `<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js">` (line 110) + `<script src="widgets/mermaid-init.js">` (line 112) + 5 comment lines (FIX-26 + KI#23 fix). CSP tightened: `script-src 'self' 'unsafe-inline' cdn.jsdelivr.net` → `script-src 'self' 'unsafe-inline'` (Mermaid was only CDN script consumer); `worker-src 'self' blob:;` directive dropped entirely (was Mermaid v11 Web Worker only). `cdn.jsdelivr.net` retained in `style-src` + `font-src` for Geist font CSS.
- **`src/shell/lazy-loader.js` (1666 → 1613 lines):** Removed Mermaid init/render block at lines 682–726 (45 lines: `requestAnimationFrame` wrapper + `document.querySelectorAll('.mermaid')` source save + `mermaid.initialize()` fallback init + `mermaid.run()`/`mermaid.init()` render with API fallback). Removed `reRenderMermaid()` call in `applyTheme()` at lines 1165–1170 (6 lines).
- **`src/shell/styles.css` (7295 → 7273 lines):** Removed `.mermaid` + `.mermaid svg` + `body.theme-light .mermaid` blocks (22 lines). PRESERVED `body.theme-light .concept-diagram` + `.concept-diagram` + `.concept-diagram pre` + `.concept-diagram svg` (separate class, may still be referenced).
- **Files edited (3 source + 1 deleted + 4 docs + 6 auto-regenerated):** DELETED `mermaid-init.js` + EDITED `src/shell/index.html` + `src/shell/lazy-loader.js` + `src/shell/styles.css` + `AGENT_NAVIGATION.md` (§1 widget count note + §6 pitfall #8/#9 + §8 roadmap + top header iter 111→113) + `STATUS.md` (this entry) + `worklog.md` (iter-113 entry, iter-108 deleted per one-in-one-out) + `CHANGELOG.md` (iter-113 entry). Auto-regenerated via `pnpm run build`: `index.html` (root) + `widgets/` (root mirror, 14 → 13 files — `mermaid-init.js` deleted) + `build.hash` + `assets/` (root — `shell-styles.css` + `lazy-loader.js` regenerated) + `event-bus.js` (root) + `data/` (root mirror).
- **Validation:** `pnpm run build` SUCCESS (hash c5c429e2 → 2ab607d6 — third hash change since iter 96). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync (no version bump — version sync back to canonical 4 places; `mermaid-init.js` JSDoc 5th tracking point is gone). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` PASS (no inline scripts). `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — baseline preserved). `qa:syntax` baseline (pre-existing, no regression). `qa:doc-versions` PASS.
- **Scope:** 3 source files edited + 1 deleted (within 3–5 soft limit accounting for the deletion). Coherent single-purpose iteration (Mermaid removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via grep (0 `.mermaid` usages in content) + build + 64 tests + 5 QA gates.

---

## Invariants

- **Version sync:** Canonical = 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` (4 places — `mermaid-init.js` JSDoc 5th point removed iter-113; sync back to canonical).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** REMOVED iter-113. CDN dependency dropped, `mermaid-init.js` deleted, `.mermaid` CSS removed. Content diagrams = VS-EMBEDs only (since iter 14).
- **Canon → master sync:** 97/97 PASS.
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).
- **CORE_DIRECTIVES numbering:** #6 = Consequence Driven, #7 = Pre-Generation Filter.
- **SP Language rule (iter 110):** Layered — 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language (§7A.2 RULE).
- **Identity name-language (iter 110):** Canonical form preserved across all card blocks — transliteration forbidden (§7A.1 RULE).
- **Script Tax (iter 110):** Non-Latin scripts cost ~1.5–2× tokens on 32K vocab; ≥128K → negligible (§7A.12 RULE).
- **Widget count (iter 113):** 12 widgets in `src/shell/widgets/` (was 16 pre-iter-112, 14 pre-iter-113 counting `mermaid-init.js` + `js-flag.js` infra). iter-112 removed 4 dead widgets (`diagnostic-tree`, `blueprint-viewer`, `author-note-viewer`, `vs-e15-blueprint`); iter-113 removed `mermaid-init.js` (Mermaid infra, not user-facing widget).

Full invariants list: see `AGENT_NAVIGATION.md` §5 and §6.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| _(none — all KIs resolved)_ | — | — | — |

> **KI lifecycle:** No open KIs. Last implicit: none (iter-113 was clean removal, no new bugs found).

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 113** | Mermaid infrastructure removal — `mermaid-init.js` deleted + CDN script + lazy-loader init/render + `reRenderMermaid()` + `.mermaid` CSS. CSP tightened (script-src + worker-src). | ✅ COMPLETE |
| iter 112 | Dead code cleanup — 4 dead widgets removed + .fi26 CSS utilities removed (601 lines total) | ✅ COMPLETE |
| iter 111 | Fork D (part 1/3) — Voice Influence Hierarchy interactive widget + naming drift fix | ✅ COMPLETE |
| iter 110 | Multilingual forks A+B+C — layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size + Token Budget Script Tax RULE | ✅ COMPLETE |
| iter 108 | Multilingual actualization (safe text-only pass) — removed ~15-20% empirical claims + KI#65 CLOSED | ✅ COMPLETE |
| iter 107 | Category B/C extended translation — cautious zone + Embodiment Protocol quad + KI#64 CLOSED | ✅ COMPLETE |
| deferred | iter-114 cleanup — dead V-pattern CSS (inf-pipeline-vertical, spine-stack, spine-validator) + M3 dead CSS + vs-styles.css SECTION 3/4 utilities | — |
| deferred | Fork D (part 2/3) — sampling widget (slider configurator for `p7a_sampling_params`, MEDIUM risk) | — |
| deferred | Fork D (part 3/3) — persona widget (meaning TBD: new 3rd widget or extend persona-synthesis) | — |
