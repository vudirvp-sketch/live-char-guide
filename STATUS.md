# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 124
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 124 — vs-fix: VS-EMBED E06/E10 confirmed-defect fixes (owner-commissioned from the uploaded `vs-investigation-brief-v2.md`; NOT the pinned Next-step row — run as its own iteration per the brief's protocol alignment).** Evidence from the brief re-verified in-repo before editing; fixes under the Bug→doc→fix lifecycle (KI#73–76 recorded & CLOSED same iteration). **E06 (part_04):** desktop layout restructured from absolute overlays over a full-canvas SVG (label tops 8/38/65% never tied to ring geometry) to a real two-column flex layout — `.ghost-rings-visual` (geometry-only SVG, rings re-centered cx 260→300) + `.ghost-rings-annotations` (HTML label column); duplicated SVG `<text>` labels removed (byte-level copies of the HTML annotations — `viz > dry text`), which also removes the master-only literal hex text fills (`#8b95a8/#6b7590/#e2e6ed`, hardcoded `'DM Sans'/'Inter'`, KI#41/KI#42 class) and the dark-only gradient stop (`#08090d`→transparent); mobile reflow preserved (column stack, auto height — flex-basis reset). **E10 (part_05):** hexad completed 3→6 lines (8-5, 5-7, 7-1); stress 6→1 and growth 9→1 corrected to `data/enneagram.json`-canonical 6→3 / 9→3; direction visually encoded — arrowhead markers, node-edge-trimmed endpoints (arrowheads previously hidden under node circles), stroke 1.25/opacity 0.6/dash 5 3, shared 9-6 segment split ±3.5u; static mini-card defaults aligned to the JSON. **Widget `vs-e10-enneagram.js`:** hardcoded `enneagramData` removed → `WidgetUtils.fetchJson('data/enneagram.json')` (fence #8; NAV §4 now truthful); prototype-parity right-edge clamp + ctm/hidden guards; aria-labels from canonical names. **Verification (executed):** build PASS (hash `2ab607d6` unchanged) · validate 5/5 · validate:master 12/12 (17 pre-existing warnings = BASE) · version:check 9.2.6 · tests 64/64 · canon sync 97/97 · `audit_vs_embeds.py` no regressions · qa:csp/bundle/contrast PASS · qa:english 18 / qa:syntax 247 (both unchanged) · lint 0 errors 0 warnings (pre-existing warning in the rewritten widget eliminated) · `git diff --check` clean · headless-Chrome runtime suite **30/30** (E06 two-column/no-overlap/mobile-stack, E10 graph/vars/hover-fetch/clamp, dark+light themes) · VLM screenshot review (E06 two-column confirmed in both themes; E10 arrowheads confirmed at nodes 3/6/9, red/green distinct). Root fallbacks rebuilt & staged together with `src/` (DEC-11 restore not applicable — `src/` touched). Deferred to PLAN: vs-e09-hex (E09 literal-hex strokes, KI#41/42 class), vs-audit (E01–E18 systemic audit), obs-5 (pre-existing page-wide mobile overflow 616px@375px viewport — identical at BASE).

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
| KI#72 | Sampling parameter contradictions inside Part 7A: §7A.7 (`p7a_model_checklist`) table says 32B+ Temperature **0.85–1.1** and 32B+ RepPen **1.0–1.05**, while canonical §7A.6 (`p7a_sampling_params`) says 32B+/API Temperature **0.7–1.0** and 32B+/API RepPen **1.05–1.10**. Reader-visible inconsistency; found by the iter-120 editorial matrix (R12). Fix requires a content decision on the canonical values + master mirror (`PLAN.md` ki-72). | OPEN | 2026-09-14 (iter 120) |
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

1. **Owner's choice between (see `PLAN.md` for scope/acceptance/verification per row):** Fork D part 2/3 — sampling widget · dupes-1 — self-admitted dupes cleanup (reduced scope after iter 121: §9.11 `<details>` dupe R16 + R01 §7A.1 full-copy compress + dangling-ref repair; the KI#71 line + §7A.12 stale-note halves are CLOSED iter-121). Both rows now execute under the **Editorial Policy** (adopted iter 122 — `AGENTS.md` → Editorial Policy, DEC-15).
2. **ki-70 (owner-gated) — decide appendix runtime loading:** wire `manifest.appendices` into `loadContent()` (KI#70) or drop appendices from the manifest/TOC. 1-line change either way, but it activates never-exercised `mbti-composer`+appendix paths → needs its own verification iteration (runtime suite exists from iter 119 and covers the wiring pattern).
3. Fork D part 3/3 (persona widget) needs owner definition of intent before planning.
4. **ed-matrix Phase B (non-gated, read-only):** extend `docs/research/editorial_matrix.md` to Part 0, 2, 4, 5, 6, 7B, 8, 10 + appendices using the same block-ID scheme (Phase A done iter 120; phasing recorded in `PLAN.md`). Now also carries the iter-121 discovered repo-meta locations (part_06 §6.3 L83, part_00 L13, appendix_character_map L29 — non-rendering, pending Phase B rows).
5. **ki-72 (small canon fix, MEDIUM — value decision):** reconcile §7A.6 ↔ §7A.7 sampling values (32B+ Temperature 0.7–1.0 vs 0.85–1.1; RepPen 1.05–1.10 vs 1.0–1.05) — matrix recommends §7A.6 = canonical, §7A.7 param rows → defer/ref (see `editorial_matrix.md` R12 + `p7a_model_checklist::02`). Executes under the Editorial Policy (DEC-15).
6. obs-4 — stale version headers in remaining docs (`components.md`, `terminology_dictionary.md` — each needs its own content-verification pass before refresh). Note: after the ki-67 fix the gate parses their date headers (both currently drift 0d); obs-4 is about version staleness, not dates. obs-3 — `CONTENT_RESTRUCTURE_PLAN.md` header/status (now also the gate's 1 warning).
7. **vs follow-ups (iter 124 remainder, non-gated; see `PLAN.md`):** vs-audit — bounded E01–E18 systemic audit (research doc in `docs/research/`, per the uploaded investigation brief's P2); vs-e09-hex — E09 master literal-hex strokes (KI#41/42 class, small fix); owner question — provenance of the supplied runtime-state embeds (`is-visible`, inline mini-card coordinates): repo-side confirmed no serializer exists, nothing depends on such snapshots — confirm capture method and that no process relies on runtime state.

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start. iter-124 (vs-fix) is complete and verified; the owner-gated rows above are unchanged.
