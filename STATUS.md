# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 126
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 126 — ed-matrix Phase B: full-coverage editorial matrix (read-only research; PLAN row `ed-matrix`, non-gated continuation of the «Research & Guide Refactor» stream).** Extended `docs/research/editorial_matrix.md` to the remaining parts: Part 0, 2, 4, 5, 6, 7B, 8, 10 + 4 appendices — **61 sections, 290 block rows** with the same machine-checkable `<data-section>::<NN>` IDs (combined A+B: **99 canon-declared section IDs / 500 rows / 500 unique IDs, script-verified**). Repeat registry extended R01–R20 → **R01–R29** (Phase B families: R21 implicit-GHOST/LIE re-statement, R22/R23 protected example re-use, R24 formulation principle, R25 OCEAN pole-limits ×3 consistent, R26 MBTI-role ×4, R27 card-budget framing drift, R28 compliant Greeting dual-presentation, R29 reference-layer terminology drift). **7 new automatic compression candidates (#14–#20; 20 cumulative, 15 open):** Part 0 history strips ×2, §4.7 R21 fold, §6.3 iter-29 note, character_map iter-40 label, glossary CORE DIRECTIVES full annotated copy (R02 — **ed-2 input delivered: compress to definition + 7-name index + ref §7A.2, KI#70-ride**), glossary Behavioral Anchor placement ПРАВИЛО (R01 reference-layer). Phase B verdict: teaching layer clean at guide scale (283/290 = 97.6% KEEP); defect surface = navigation hygiene (R18: ~32 new canon-only vague refs — **master resolves all to proper anchors, verified**; part_08 ×6 unbalanced parens), reference-layer over-carry (2 glossary entries), repo-meta history labels (R17 non-rendering ×4 + part_08 «v9 restructure»), numeric framing drift (R11/R27: AP-1 «>800», glossary «4K ~430–580», character_map ranges vs Part 10 budgets). **KI#77 opened (canon-side wrong/stale refs: part_04 L281 §7A.6→§7A.2 — master link already correct; character_map stale usage refs ×3 + budget-range drift — non-rendering).** R17 registry fulfilled for the 3 promised non-rendering locations (part_00 L13/L45/L58, part_06 §6.3 L83, character_map L29). **Verification (executed):** matrix self-check script 500/500 unique IDs, per-part counts + column vocabularies PASS · canon sync 97/97 PASS (content untouched — read-only row) · `git diff --check` clean · no build (doc-only: `docs/research/` + state docs do not deploy; `src/`/`data/`/`parts/` byte-identical to BASE, `git status` confirms). Out-of-scope discovered: NAV «97 sections» phrasing vs 96-rendered/99-canon convention (doc-precision observation, matrix §18 — no action).

---

## Invariants

- **Version sync:** canonical 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` + build manifest (`pnpm run version:check`).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** absent by design (removed iter-113) — content diagrams = VS-EMBEDs only; no CDN script dependency.
- **CSS:** `src/assets/vs-styles.css` 3245 lines · `src/shell/styles.css` 7025 lines (both trimmed to in-use rules, iter 114/115).
- **Canon → master sync:** 97/97 PASS (`scripts/audit_canon_master_sync.py` MUST pass).
- **Voice Isolation:** linguistic voice = Examples/Greeting only; physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES:** shorthand `{{CORE_DIRECTIVES — ...}}` accepted; #6 = Consequence Driven, #7 = Pre-Generation Filter.
- **SP Language rule:** layered — 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language (§7A.2 RULE).
- **Identity name-language:** canonical form preserved across all card blocks — transliteration forbidden (§7A.1 RULE).
- **Script Tax:** non-Latin scripts ~1.5–2× tokens on 32K vocab; ≥128K → negligible (§7A.12 RULE).
- **Widgets:** 12 in `src/shell/widgets/`. `vs-e10-enneagram` consumes `data/enneagram.json` (fence #8, fixed iter 124).
- **VS-EMBED E06/E10 (iter 124):** E06 = two-column layout (`.ghost-rings-visual` + `.ghost-rings-annotations`), SVG geometry-only; E10 graph directions = `data/enneagram.json`, hexad complete, arrowheads encode direction (KI#73–76).
- **Editorial Policy (DEC-15, iter 122):** all `docs/canon/` + `src/master/` content edits — compress redundant presentation, never unique capability; 5-point functional-load check; UNCLEAR ≠ delete; success ≠ word count.
- **Language policy (DEC-16, iter 123):** two-layer — guide prose/labels/headings Russian (ordinary terminology translated); English only in executable prompt content (with adjacent Russian explanation), technical identifiers, proper names. `qa:english` baseline 18 (executable-content leaks by design; must not increase).

Full rules and fences: `AGENTS.md` → Hard fences. Content semantics: `docs/canon/`.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| KI#70 | Appendices never runtime-loaded: `parts/manifest.json` has an `appendices` array (appendix_mbti / appendix_model_table / appendix_glossary) that `src/shell/lazy-loader.js` never reads — it iterates only `manifest.parts`. Appendix A (MBTI Reference + `mbti-composer` container), B (Model Capability Table), C (Glossary appendix) never render; the auto-injected TOC's `#appendix_*` links (built `part_01.html:414+`) are dead. Pre-existing across lazy-loader history (git `-S` finds no "appendices" consumer ever). Systematic, same symptom family as KI#69. Deferred: 1-line wiring activates never-exercised widget/content paths → own iteration + verification (`PLAN.md` ki-70, owner-gated). | OPEN | 2026-09-14 (iter 119) |
| KI#72 | Sampling parameter contradictions inside Part 7A: §7A.7 (`p7a_model_checklist`) table says 32B+ Temperature **0.85–1.1** and 32B+ RepPen **1.0–1.05**, while canonical §7A.6 (`p7a_sampling_params`) says 32B+/API Temperature **0.7–1.0** and 32B+/API RepPen **1.05–1.10**. Reader-visible inconsistency; found by the iter-120 editorial matrix (R12). Fix requires a content decision on the canonical values + master mirror (`PLAN.md` ki-72). Phase B: AP-5 (RepPen ≤ 1.10) and AP-7 (PP = 0) stay valid under either reconciliation — no new constraint. | OPEN | 2026-09-14 (iter 120) |
| KI#77 | Canon-side wrong/stale cross-references (Phase B matrix findings; master resolves every affected link correctly — reader impact = canon navigability only): (a) `part_04.md` L281 `[ref: §7A.6 — Consequence Driven]` → directive #6 lives in §7A.2 (master link already points to `#p7a_core_directives`); (b)–(d) `appendix_character_map.md` L23–24 stale usage refs — Omnis «Part 5 §5.2» (no Омнис in part_05, byte-verified) + «Part 8 §8.X AP-15 OCEAN Overload» (stale — moved to Part 5 §5.3, AP-15 now Nested Anchors) + Выщербленный «Part 5 (эннеаграмма)» (5w4 lives in §10.4) + «Part 6 §6.X» vague; (e) character_map L37–38 budget ranges (~440–890 / ~1500–1800) vs Part 10 budgets (Walter ~1100, Omnis ~2150 outside) — R27 framing drift. Character_map is non-rendering. Fix = targeted canon ref repair, fold into ed-8 or any canon-touching iteration (evidence: `editorial_matrix.md` §18). | OPEN | 2026-09-14 (iter 126) |
| KI#73 | E06 desktop layout structurally invalid (vs-investigation-brief-v2, owner screenshots): `.ring-label` annotations absolutely positioned (`right:0`, tops 8/38/65% never tied to ring geometry) over a full-canvas SVG whose rings were shifted left (`cx=260` of 600) only to leave overlay room — no real annotation column on desktop (mobile ≤768px reflowed correctly). Fixed iter 124: two-column flex layout `.ghost-rings-visual` (SVG) + `.ghost-rings-annotations` (HTML labels) in `src/master/part_04.html` + `src/assets/vs-styles.css` SECTION 5 E06; rings re-centered `cx=300`; mobile stack preserved (flex-basis reset to auto). Runtime-verified: no overlap desktop, stack below SVG at 375px. | CLOSED iter-124 | 2026-09-14 (iter 124) |
| KI#74 | E06 dual label systems + master-only literal colors: SVG `<text>` labels (G3/G2/G1 titles + event quotes) byte-level duplicated the HTML `.ring-label` blocks (`viz > dry text` violation, NAV pitfall #12); master embed carried literal dark-theme hex text fills `#8b95a8/#6b7590/#e2e6ed` + hardcoded `'DM Sans'/'Inter'` fonts (KI#41/KI#42 Light-theme defect class — prototype used tokens) and a gradient outer stop `#08090d` (hardcoded dark bg). Fixed iter 124: SVG texts removed (HTML annotations = the readable layer, strictly more complete); outer stop → `rgba(8,9,13,0)`; dead `ring-text-anim` CSS + `vs-ki13-ring-delay-600…850` rules removed. Light-theme rendering runtime-verified. | CLOSED iter-124 | 2026-09-14 (iter 124) |
| KI#75 | E10 graph contradicted `data/enneagram.json` (canonical per fence #8/§4): hexad drawn **3 of 6** lines (8-5, 5-7, 7-1 missing despite the "1-4-2-8-5-7-1" comment); drawn stress **6→1** contradicted JSON (type 6 stress → 3); drawn growth **9→1** contradicted JSON (type 9 growth → 3); directionality not visually encoded (plain lines; comments called them "directional hints"); arrowheads initially hidden under node circles (endpoints at node centers). Fixed iter 124: hexad completed; direction lines corrected (6→3, 9→3), trimmed to node edges (r=22 + gap), arrowhead markers (12u), stroke 0.5→1.25, opacity 0.2→0.6, dash 3 3→5 3, shared 9-6 segment offset ±3.5u (stress 9→6 + growth 6→9 render as distinct parallel lines). VLM + runtime verified: arrowheads visible at nodes 3/6/9, red/green distinct. | CLOSED iter-124 | 2026-09-14 (iter 124) |
| KI#76 | `vs-e10-enneagram.js` hardcoded `enneagramData` (fence #8 violation; names/wording drifted from `data/enneagram.json` — «Реформатор/Достигатор/Вызывающий» vs canonical «Перфекционист/Достигатель/Челленджер»; `AGENT_NAVIGATION.md` §4 documented JSON consumption that never happened) + the production widget lacked the prototype's right-edge clamp (`E10-enneagram-spine.html:355+` clamps `left` to container width − 240; widget assigned raw coordinates) and ctm/hidden guards. Fixed iter 124: widget reads `data/enneagram.json` via `WidgetUtils.fetchJson` (map: name/core_fear/core_desire/lie_template/flaw_pattern), clamp + guards ported, aria-labels from canonical names; static mini-card defaults in `src/master/part_05.html` aligned to the JSON. Runtime-verified: hover type 1 → «Тип 1 — Перфекционист», card stays inside the container. | CLOSED iter-124 | 2026-09-14 (iter 124) |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note (historical):** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification proved the filters intact; the "corruption" was a terminal display artifact (pitfall #27).
> **iter-124 note:** KI#67 (CLOSED iter-120) and KI#71 (CLOSED iter-121) deleted per the 2+ iterations lifecycle rule.

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

1. **Owner's choice (see `PLAN.md` for scope/acceptance/verification):** dupes-1 — COMPLETE iter 125; **ed-matrix Phase B — COMPLETE iter 126** (full coverage: 99 canon section IDs / 500 rows / R01–R29 / 20 cumulative candidates, 15 open; KI#77 opened). Remaining owner choice narrows to **Fork D 2/3** (sampling widget; executes with infrastructure approval) or a new row.
2. **ki-70 (owner-gated) — decide appendix runtime loading:** wire `manifest.appendices` into `loadContent()` (KI#70) or drop appendices from the manifest/TOC. 1-line change either way, but it activates never-exercised `mbti-composer`+appendix paths → needs its own verification iteration (runtime suite exists from iter 119). Phase B note: two editorial candidates (glossary CORE DIRECTIVES compression #19, appendix_mbti container note) deliberately ride this decision.
3. Fork D part 3/3 (persona widget) needs owner definition of intent before planning.
4. **ki-72 (small canon fix, MEDIUM — value decision):** reconcile §7A.6 ↔ §7A.7 sampling values — matrix recommends §7A.6 = canonical, §7A.7 param rows → defer/ref (candidate #7; AP-5/AP-7 stay valid under either outcome — verified iter 126). Executes under the Editorial Policy (DEC-15).
5. **Non-gated, ready under the Editorial Policy (matrix output):** remaining 15 open candidates — the largest mechanical batch is **ed-8/R18 canon vague-ref repair (~32 Phase B refs + part_08 unbalanced parens + KI#77-a; master needs no link changes)**; small batches: ed-7-family (R05 #4, R03 #5, R29 terminology), ed-4-family (R06 #6), R01 #8 (§7A.11 fold), R21 #16 (§4.7 fold), R17 canon-side strips #14/#15/#17/#18. Sequence by owner choice or as dupes-N-style batches.
6. obs-4 — stale version headers in remaining docs (`components.md`, `terminology_dictionary.md` — each needs its own content-verification pass). obs-3 — `CONTENT_RESTRUCTURE_PLAN.md` header/status. obs-6 — «Выщебленного» misspelling ×3 (fold into ed-3/ed-8 or any Part 9/10 canon touch).
7. **vs follow-ups (iter 124 remainder, non-gated; see `PLAN.md`):** vs-audit — bounded E01–E18 systemic audit (research doc in `docs/research/`); vs-e09-hex — E09 master literal-hex strokes (KI#41/42 class, small fix); owner question — provenance of the supplied runtime-state embeds.

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start. iter-126 (ed-matrix Phase B) is complete and verified (read-only); the owner-gated rows above are unchanged.
