# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 133
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 133 — mig-1-glossary-build (v2 build phase opened, DEC-18).** The DEC-17 chain is implemented end-to-end: canonical term registry `docs/canon/glossary_registry.md` (45 unified entries = 25 merged canon + 20 promoted machine-layer terms; RU-first heads, 6 ⚑ resolved as identifier heads; provenance C-1…C-26 + T-01…T-55) → generator `scripts/generate_glossary.mjs` (wired as the first `pnpm run build` stage, `build:glossary`) → generated `data/glossary.json` (version 9.2.6 from `src/VERSION`; dead `core_rules` + stale `unified_definition` → REMOVED_WITH_REASON) → runtime panel + no-JS `parts/glossary.html` — re-pointed via the data layer, zero shell code changes. Parity audit `scripts/audit_glossary_parity.py` PASS: 81 provenance refs = 26 C + 55 T exactly once; dispositions match map §5.1; heads = ratified forms verbatim; anchors + xrefs resolve against 96 master sections; english-rule check = the owner's ⚑ control check; JSON↔registry equality; findability 45/45. KI#72-family: the RepPen «1.00–1.10» 5th location eliminated from the machine layer (registry defers values to §7A.6; 4 live locations remain). v1 canon/master content untouched (frozen); map T-45 ref corrected (§7B.6 → §7B.1). Verification (executed): generator + parity audit + full build (hash `2ab607d6` unchanged — shell untouched) + validate + validate:master 12/12 (45 terms used) + version:check + tests 64/64 + qa gates (english 18 / syntax 247 — baselines exact; csp/bundle/contrast/doc-versions PASS) + canon sync 97/97 + `git diff --check` clean. pnpm absent in the sandbox — scripts invoked via `node`/`python3` directly (identical commands); the owner's pre-commit hook re-runs the battery.

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
- **Glossary chain (DEC-17/18, iter 133):** `docs/canon/glossary_registry.md` = canonical term record (45 entries) → `data/glossary.json` **generated** by `scripts/generate_glossary.mjs` (first `pnpm run build` stage) → runtime panel / no-JS page. `glossary.json` never hand-edited; term changes go through the registry. `scripts/audit_glossary_parity.py` MUST PASS.

Full rules and fences: `AGENTS.md` → Hard fences. Content semantics: `docs/canon/`.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| KI#70 | Appendices never runtime-loaded: `parts/manifest.json` has an `appendices` array (appendix_mbti / appendix_model_table / appendix_glossary) that `src/shell/lazy-loader.js` never reads — it iterates only `manifest.parts`. Appendix A (MBTI Reference + `mbti-composer` container), B (Model Capability Table), C (Glossary appendix) never render; the auto-injected TOC's `#appendix_*` links (built `part_01.html:414+`) are dead. Pre-existing across lazy-loader history (git `-S` finds no "appendices" consumer ever). Systematic, same symptom family as KI#69. Deferred: 1-line wiring activates never-exercised widget/content paths → own iteration + verification (`PLAN.md` ki-70, owner-gated). | OPEN | 2026-09-14 (iter 119) |
| KI#72 | Sampling parameter contradictions inside Part 7A: §7A.7 (`p7a_model_checklist`) table says 32B+ Temperature **0.85–1.1** and 32B+ RepPen **1.0–1.05**, while canonical §7A.6 (`p7a_sampling_params`) says 32B+/API Temperature **0.7–1.0** and 32B+/API RepPen **1.05–1.10**. Reader-visible inconsistency; found by the iter-120 editorial matrix (R12). Fix requires a content decision on the canonical values + master mirror (`PLAN.md` ki-72). Phase B: AP-5 (RepPen ≤ 1.10) and AP-7 (PP = 0) stay valid under either reconciliation — no new constraint. **iter 133:** the 5th value location (`glossary.json` RepPen «1.00–1.10», found iter 132) is eliminated — the generated registry defers values to §7A.6; 4 live locations remain (§7A.6 / §7A.7 / E17 / E12). | OPEN | 2026-09-14 (iter 120) |
| KI#77 | Canon-side wrong/stale cross-references (Phase B matrix findings; master resolves every affected link correctly — reader impact = canon navigability only). **(a)–(d) FIXED iter 127 (ed-8/R18):** (a) `part_04.md` L281 §7A.6 → §7A.2 (Consequence Driven home); (b)–(d) `appendix_character_map.md` — Omnis stale refs («Part 5 §5.2» false + «Part 8 §8.X AP-15» stale) → «Part 5 §5.1/§5.3 (концепты полюсов и перегрузки OCEAN)»; Выщербленный «Part 5 (эннеаграмма)» dropped (5w4 lives in §10.4, already listed); «Part 6 §6.X» → §6.5–§6.6. **(e) REMAINS OPEN:** character_map L37–38 budget ranges (~440–890 / ~1500–1800) vs Part 10 budgets (Walter ~1100, Omnis ~2150 outside) — R27 framing drift, needs the ed-5 re-frame decision (owner value decision). Evidence: `editorial_matrix.md` §18. | OPEN (e only) | 2026-09-14 (iter 126) |
| KI#78 | Master `part_07b.html` §7B.5 fatigue-emulation RULE (L407): «Без этого поведенческие якоря (поведенческие якоря) деградируют…» — the paren gloss duplicates the phrase itself (likely a failed «(Anchors)» gloss render); canon L257 carries no paren. Reader-visible duplication, pre-existing. Discovered iter 129 during the R29 checklist work (same RULE block), out of matrix scope → deferred (`PLAN.md` ki-78, fold into any master-touching iteration). | **CLOSED iter 130** — dupe paren dropped + gloss family aligned to canon L257 («якоря призрака (GHOST-якоря)»); root fallback rebuilt | 2026-09-14 (iter 129) |
| KI#79 | `scripts/audit_canon_master_drift.py` `P_TAG_RE = <p[^>]*>(.*?)</p>` also matches `<pre>` (and `<path>`/`<picture>` — any `p`-prefixed tag): a `<p>`-match can open on `<pre>` and run to the next literal `</p>`, absorbing code blocks + following paragraphs into one blob "paragraph". Surfaced iter 130: deleting the §3.2 Пояснение (last `<p>` before `</div>` after two `<pre>` blocks) shifted the absorption boundary — the master transition `<p>` was swallowed into the 499-char blob; informational actionable drift rose 159→160 with zero content drift (transition byte-identical canon↔master, sync 97/97 PASS). Informational-only tool (exit 0 always) — no reader impact; fix = regex tighten + actionable re-baseline (`PLAN.md` ki-79). | OPEN | 2026-09-14 (iter 130) |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note (historical):** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification proved the filters intact; the "corruption" was a terminal display artifact (pitfall #27).
> **iter-124/127/129/130 notes:** KI#67 (CLOSED iter-120) + KI#71 (CLOSED iter-121) deleted iter 124; KI#73–76 (all CLOSED iter-124) deleted iter 127; KI#78 CLOSED iter 130 (opened iter 129); KI#79 opened iter 130 (drift-tool regex, informational).

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

**Active track since iter 131: v1 → v2 architecture migration** (owner directive, chat 2026-09-14). Migration order: `v1 (frozen) → semantic extraction → v2 architecture → v2 build → parity audit → canonical audit → reader-path audit → switch`. Reader modes: **Learn → Build → Debug → Reference**. Old incremental-cleanup rows below are **superseded** (not auto-candidates); reuse as input only where a direct migration dependency exists.

1. **mig-2 — CORE DIRECTIVES cluster (second bounded area), ready to execute on the mig-1 pattern:** v2 build slice reusing ed-2 evidence (E08 = the one visual presentation; `{{CORE_DIRECTIVES — …}}` shorthand per DEC-08 executes in v2; glossary entry already = 1-sentence + link per R02). MEDIUM gate — content semantics inherited from the pre-approved ed-2 analysis; no fresh owner call required unless the slice surfaces a semantic conflict. Pattern to follow (established iter 133): canonical record → generator → generated layer → runtime re-point → parity audit.
2. **Owner decision points remaining (map §6, recommended order):** visual-markup ownership (§6.1 — gates mig-2's prototype/extract disposals), E13 diagnostic mappings (§6.2 — gates mig-3), hero prototype disposition (§6.4), rule-strength convention (§6.5 — needed before Part 7A/8 v2 slices).
3. **mig-3 — Diagnostics cluster (Debug mode):** blocked on the E13 decision (§6.2).
4. **Superseded (per owner directive — do not auto-resume):** `Fork D 2/3` (sampling widget), `ki-70` (standalone; v1 wire/drop superseded by the v2 Reference design — the glossary slice already serves the Reference mode via panel/no-JS), `Fork D 3/3`, `ki-72` (as content decision — the KI#72 *value* decision resurfaces inside the migration's sampling-cluster disposition; 4 live locations after iter 133), `dupes-2` and equivalent sequential cleanup batches. `ki-79`, `cache-bust-1`, `vs-e09-hex`, obs-3/4/5/6: deferred unless a migration slice requires them.

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start. iter-133 (mig-1 glossary build slice) is complete and verified — the v2 build phase is open (DEC-18). `data/glossary.json` is now **generated** (`pnpm run build:glossary` / inside `pnpm run build`) — never hand-edit; term changes go through `docs/canon/glossary_registry.md` only. v1 remains frozen as migration source — do not edit `docs/canon/part_*.md`/`appendix_*.md` or `src/master/` content without an explicit migration-slice scope.
