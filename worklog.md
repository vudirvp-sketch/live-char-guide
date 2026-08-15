# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-113-mermaid-removal
Agent: main
Task: Remove Mermaid.js CDN dependency and all supporting infrastructure. Content diagrams were already replaced by VS-EMBEDs in iter 14 — only the CDN script + init widget + lazy-loader logic + CSS remained as dead code. Verified: 0 `.mermaid` usages in `src/master/` + `parts/`.

Work Log:
- 1: Deleted `src/shell/widgets/mermaid-init.js` (141 lines). File contained theme configs (DARK_CONFIG/LIGHT_CONFIG), `mermaid.initialize()` initial init, and `window.reRenderMermaid(theme)` dynamic re-render function. All dead — no `.mermaid` containers in DOM.
- 2: Edited `src/shell/index.html` (130 → 121 lines). Removed Mermaid CDN `<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js">` + `<script src="widgets/mermaid-init.js">` + 5 comment lines (FIX-26 + KI#23 fix). CSP tightened: `script-src 'self' 'unsafe-inline' cdn.jsdelivr.net` → `script-src 'self' 'unsafe-inline'` (Mermaid was only CDN script consumer); `worker-src 'self' blob:;` directive dropped entirely (was Mermaid v11 Web Worker only — verified no other Worker blob: usages in src/; existing `URL.createObjectURL(blob)` calls in `persona-synthesis.js` L490 + `lazy-loader.js` L548 are download/export blobs, not Worker blobs). `cdn.jsdelivr.net` retained in `style-src` + `font-src` for Geist font CSS.
- 3: Edited `src/shell/lazy-loader.js` (1666 → 1613 lines). Removed Mermaid init/render block at L682–726 (45 lines: `requestAnimationFrame` wrapper + `document.querySelectorAll('.mermaid')` source save + `mermaid.initialize()` fallback init + `mermaid.run()`/`mermaid.init()` render with API fallback). Removed `reRenderMermaid()` call in `applyTheme()` at L1165–1170 (6 lines).
- 4: Edited `src/shell/styles.css` (7295 → 7273 lines). Removed `.mermaid` + `.mermaid svg` + `body.theme-light .mermaid` blocks (22 lines). PRESERVED `body.theme-light .concept-diagram` + `.concept-diagram` + `.concept-diagram pre` + `.concept-diagram svg` (separate class, may still be referenced — out of iter-113 scope).
- 5: Updated `AGENT_NAVIGATION.md` — top header (iter 111 → 113, widget count 16 → 12). §1 widget list note: added iter-113 mermaid-init.js removal + `js-flag.js` infra note. §4 widget architecture: 16 → 12 widgets. §6 pitfall #8 (versions in 4 places): removed mermaid-init.js JSDoc 5th tracking point; added iter-113 note. §6 pitfall #9 (Mermaid CDN): rewritten as "REMOVED iter-113". §8 roadmap: iter-113 added, deferred iter-114 (vs-styles.css cleanup) added, iter-100 marked "(removed iter-113 — was dead code)". Updated `STATUS.md` (iter 112 → 113, current state replaced, invariants updated, roadmap updated). Updated `CHANGELOG.md` (added iter-113 entry under Keep a Changelog format at top).
- 6: Validation: `pnpm run build` SUCCESS (hash c5c429e2 → 2ab607d6 — third hash change since iter 96). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` PASS. `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression). `qa:syntax` baseline (pre-existing, no regression). `qa:doc-versions` PASS.

Stage Summary:
- **iter 113 COMPLETE — Mermaid infrastructure removed.** ~225 lines removed (141 deleted JS + 84 trimmed across 3 source files).
- **3 source files edited + 1 deleted + 4 docs:** DELETED `src/shell/widgets/mermaid-init.js` + EDITED `src/shell/index.html` + `src/shell/lazy-loader.js` + `src/shell/styles.css` + `AGENT_NAVIGATION.md` + `STATUS.md` + `worklog.md` + `CHANGELOG.md`. Plus 6 auto-regenerated root fallbacks via `pnpm run build` (index.html + widgets/ 14→13 files + build.hash + assets/ + event-bus.js + data/).
- **Scope:** 3 source files + 1 deletion = within 3–5 soft limit. Coherent single-purpose iteration (Mermaid removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via grep (0 `.mermaid` usages) + build + 64 tests + 5 QA gates. CSP tightened (script-src dropped CDN, worker-src directive dropped entirely).
- **Next iteration candidates:** (a) iter-114 cleanup — dead V-pattern CSS (inf-pipeline-vertical, spine-stack, spine-validator) + M3 dead CSS + vs-styles.css SECTION 3/4 utilities; (b) Fork D (part 2/3) sampling widget; (c) iter-3 self-admitted dupes cleanup (§7A.12 plain-copy pre-block, §9.11 quick-check table). Pending user decision.

---

Task ID: iter-112-dead-code-cleanup (one-line summary)
- iter 112 — Dead code cleanup: removed 4 dead widgets (`diagnostic-tree`, `blueprint-viewer`, `author-note-viewer`, `vs-e15-blueprint`, 339 lines JS) + 4 script tags + 3 initAll() calls + `.fi26-*` CSS utilities (262 lines). 601 lines total. 3 source + 4 deleted + 3 docs + 6 auto-regen. Canon sync 97/97. Build hash f70870c0 → c5c429e2. 0 new English leaks.

---

Task ID: iter-111-voice-hierarchy-widget (one-line summary)
- iter 111 — Fork D (part 1/3): `persona-voice-hierarchy` interactive widget (16th) for §3.2 — model-tier toggle + hover-sync + MD export. Combined design in ~290 lines JS. Canon-embedded data (6×3 from §3.2 table) — exception to data/*.json rule. Fixed naming drift in `part_07a.md` (p3_voice_hierarchy → p3_influence_hierarchy). 7 source + 6 auto-regen. Canon sync 97/97. Build hash 8499b4e3 → f70870c0. 0 new English leaks.

---

Task ID: iter-110-multilingual-forks-abc (one-line summary)
- iter 110 — Multilingual forks A+B+C: layered SP language rule (12B<64K→EN, ≥128K 12B-14B→either, 32B+/API→card lang) + Identity name-language rule (canonical form preserved) + Script Tax/Vocabulary Size as new Model Table concepts + Token Budget Script Tax RULE. Fork D deferred. 9 source + 6 auto-regenerated. Canon sync 97/97. Build hash 8499b4e3 unchanged. 0 new English leaks.
