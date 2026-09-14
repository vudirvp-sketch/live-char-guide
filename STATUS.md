# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 138
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 138 — owner-gates-ratified + §6.1 disposal (doc + disposals).** Owner chat 2026-09-14 «начинать работу по планам» = the go-ahead on the iter-137 recommended package — all four map-§6 gates recorded: §6.1+§6.4 → **DEC-19** (master embed = canonical visual markup; L4/L5 frozen design artifacts; hero remove/archive), §6.2+§6.5 → **DEC-20** (E13 `TEXTUAL_CANONICAL` → §9.6; RULE/GUIDELINE/OBSERVATION/EXPERIMENTAL ratified, incremental application). §6.1 disposal slice executed: **16 files REMOVED_WITH_REASON** (`visual-system/elements/` E01/E08/E10/E15 prototypes + `integration/component-extracts/` ×12 — stale second copies of parity-locked embeds; archive = git history); map §2/§6/Registries A/B + §7 log updated; three family parity audits' deferred-layer notes updated (E08 / E01+E15 / E10); NAV §1 + architecture.md visual-system rows → frozen. Doc+disposal-only: no `src/` or `data/` file touched (v1 frozen); Python audit battery green (sync 97/97, four cluster parities PASS, drift actionable 160 unchanged, extracts audits degrade gracefully to MISSING); no node battery (no build input touched — iter-131 doc-only precedent). KI#81 stays OPEN — cleanup rides the pending §6.4 hero disposal slice. mig-3 unblocked = next.

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
- **CORE DIRECTIVES single presentation (DEC-08/mig-2, iter 134):** §7A.2 = the only full definition; E08 = the one visual presentation (SHARED_REFERENCE); every other layer (§7A.1 template, §7A.13, Part 10) = `{{CORE_DIRECTIVES — …}}` shorthand; glossary entry = 1-sentence + link. `scripts/audit_core_directives_parity.py` MUST PASS.
- **Token budget single value owner (mig-4, iter 135):** §7A.12 = the only canonical budget table (SP 50/100/200 · Description 150/300/700 · Examples 40/60/80 per · Greeting 40/60/100 · Anchors 15/25/40 per); E01/E15 embeds = SHARED_REFERENCE presentations (Examples totals derived: per-example × count — derivation declared); E01 Lorebook row = declared estimate («Est.»). `scripts/audit_token_budget_parity.py` MUST PASS.
- **Enneagram single value owner (mig-5, iter 136):** §5.4 = the only canonical 9-type record (name/name_alt/fear/desire/LIE/flaw per type); `data/enneagram.json` = **GENERATED** (`scripts/generate_enneagram.mjs`, second stage of `pnpm run build` — never hand-edit; canonical value changes → `docs/canon/part_05.md` §5.4, machine-layer supplement changes → the generator); LIE lives once (`types[].lie_template`); E10 mini-cards = SHARED_REFERENCE. `scripts/audit_enneagram_parity.py` MUST PASS.
- **Visual-markup ownership (DEC-19, iter 138):** master embed (L2) = the canonical visual markup; `visual-system/` L4/L5 = frozen design artifacts (archive = git history; E01/E08/E10/E15 prototype+extract copies REMOVED_WITH_REASON iter 138; remaining families ride the freeze at their slice time; hero disposal slice pending). Production `Source: elements/E##-*.html` provenance comments resolve to git history.
- **Rule-strength convention (DEC-20, iter 138):** RULE / GUIDELINE / OBSERVATION / EXPERIMENTAL ratified + UNKNOWN = temporary uncertainty marker only; applied incrementally per slice — no mass annotation; ПРАВИЛО (`.callout.rule`) ↔ RULE, РЕКОМЕНДАЦИЯ (`.callout.rec`) ↔ GUIDELINE; OBSERVATION/EXPERIMENTAL markup = first consuming slice (fence #7). The sampling cluster additionally waits on the KI#72 value decision.

Full rules and fences: `AGENTS.md` → Hard fences. Content semantics: `docs/canon/`.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| KI#70 | Appendices never runtime-loaded: `parts/manifest.json` has an `appendices` array (appendix_mbti / appendix_model_table / appendix_glossary) that `src/shell/lazy-loader.js` never reads — it iterates only `manifest.parts`. Appendix A (MBTI Reference + `mbti-composer` container), B (Model Capability Table), C (Glossary appendix) never render; the auto-injected TOC's `#appendix_*` links (built `part_01.html:414+`) are dead. Pre-existing across lazy-loader history (git `-S` finds no "appendices" consumer ever). Systematic, same symptom family as KI#69. Deferred: 1-line wiring activates never-exercised widget/content paths → own iteration + verification (`PLAN.md` ki-70, owner-gated). | OPEN | 2026-09-14 (iter 119) |
| KI#72 | Sampling parameter contradictions inside Part 7A: §7A.7 (`p7a_model_checklist`) table says 32B+ Temperature **0.85–1.1** and 32B+ RepPen **1.0–1.05**, while canonical §7A.6 (`p7a_sampling_params`) says 32B+/API Temperature **0.7–1.0** and 32B+/API RepPen **1.05–1.10**. Reader-visible inconsistency; found by the iter-120 editorial matrix (R12). Fix requires a content decision on the canonical values + master mirror (`PLAN.md` ki-72). Phase B: AP-5 (RepPen ≤ 1.10) and AP-7 (PP = 0) stay valid under either reconciliation — no new constraint. **iter 133:** the 5th value location (`glossary.json` RepPen «1.00–1.10», found iter 132) is eliminated — the generated registry defers values to §7A.6; 4 live locations remain (§7A.6 / §7A.7 / E17 / E12). | OPEN | 2026-09-14 (iter 120) |
| KI#77 | Canon-side wrong/stale cross-references (Phase B matrix findings; master resolves every affected link correctly — reader impact = canon navigability only). **(a)–(d) FIXED iter 127 (ed-8/R18):** (a) `part_04.md` L281 §7A.6 → §7A.2 (Consequence Driven home); (b)–(d) `appendix_character_map.md` — Omnis stale refs («Part 5 §5.2» false + «Part 8 §8.X AP-15» stale) → «Part 5 §5.1/§5.3 (концепты полюсов и перегрузки OCEAN)»; Выщербленный «Part 5 (эннеаграмма)» dropped (5w4 lives in §10.4, already listed); «Part 6 §6.X» → §6.5–§6.6. **(e) REMAINS OPEN:** character_map L37–38 budget ranges (~440–890 / ~1500–1800) vs Part 10 budgets (Walter ~1100, Omnis ~2150 outside) — R27 framing drift, needs the ed-5 re-frame decision (owner value decision). Evidence: `editorial_matrix.md` §18. | OPEN (e only) | 2026-09-14 (iter 126) |
| KI#79 | `scripts/audit_canon_master_drift.py` `P_TAG_RE = <p[^>]*>(.*?)</p>` also matches `<pre>` (and `<path>`/`<picture>` — any `p`-prefixed tag): a `<p>`-match can open on `<pre>` and run to the next literal `</p>`, absorbing code blocks + following paragraphs into one blob "paragraph". Surfaced iter 130: deleting the §3.2 Пояснение (last `<p>` before `</div>` after two `<pre>` blocks) shifted the absorption boundary — the master transition `<p>` was swallowed into the 499-char blob; informational actionable drift rose 159→160 with zero content drift (transition byte-identical canon↔master, sync 97/97 PASS). Informational-only tool (exit 0 always) — no reader impact; fix = regex tighten + actionable re-baseline (`PLAN.md` ki-79). | OPEN | 2026-09-14 (iter 130) |
| KI#81 | Dead hero CSS residue in production shell styles: `.vs-hero-placeholder` rules (`src/shell/styles.css` L557/L7006/L7015/L7027/L7043 — 5 occurrences incl. theme-light; regenerated root fallback `assets/shell-styles.css` mirrors them) have **zero consumers** across `src/`, `parts/`, `widgets/` — introduced by the never-executed Phase-4 hero integration (commit `0addf38d`), found iter 137 during the §6.4 evidence check. No reader impact (unused selectors). Cleanup rides the §6.4 hero disposal slice (DEC-19 recorded iter 138; PLAN row hero-disposal — remove/archive → the rules go with it). Evidence: `docs/research/owner_gates_iter137.md` §3.4. | OPEN | 2026-09-14 (iter 137) |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note (historical):** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification proved the filters intact; the "corruption" was a terminal display artifact (pitfall #27).
> **iter-124/127/129/130/134/138 notes:** KI#67 (CLOSED iter-120) + KI#71 (CLOSED iter-121) deleted iter 124; KI#73–76 (all CLOSED iter-124) deleted iter 127; KI#78 (CLOSED iter 130) deleted iter 134 (closed >2 iterations); KI#79 opened iter 130 (drift-tool regex, informational); KI#80 (CLOSED iter 134, typo fold) deleted iter 138 (closed >2 iterations).

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

**Active track since iter 131: v1 → v2 architecture migration** (owner directive, chat 2026-09-14). Migration order: `v1 (frozen) → semantic extraction → v2 architecture → v2 build → parity audit → canonical audit → reader-path audit → switch`. Reader modes: **Learn → Build → Debug → Reference**. Old incremental-cleanup rows below are **superseded** (not auto-candidates); reuse as input only where a direct migration dependency exists.

1. **mig-3 — Diagnostics cluster (Debug mode): UNBLOCKED (DEC-20, iter 138).** The E13 gate is cleared (`TEXTUAL_CANONICAL` — mappings → §9.6; E13 = visual presentation / decision aid). Execute on the established slice pattern (map §5 precedents; PLAN row mig-3): canon §9.6 mappings (E13 symptom→check→branch→AP/E rows; Editorial Policy 5-point check — E13 keeps its visual function) → master mirror → E13 re-pointed to the canonical mapping → new `scripts/audit_diagnostics_parity.py` + Debug reader-path audit (symptom → cause → test → one-change → validation).
2. **§6.4 hero disposal slice (DEC-19 recorded; ready mechanical candidate — gates nothing):** remove/archive `visual-system/hero/` + KI#81 `.vs-hero-placeholder` CSS cleanup (`src/shell/styles.css` L557/L7006/L7015/L7027/L7043 + regenerated root fallback) — own iteration (production CSS touched → full battery + rebuild).
3. **§6.5 rule-strength (DEC-20 ratified):** applied incrementally by consuming slices — no standalone slice; Part 7A/8 v2 slices wait on it AND on the separate **KI#72 value decision** (owner call on canonical sampling values; matrix recommends §7A.6).
4. **Superseded (per owner directive — do not auto-resume):** `Fork D 2/3` (sampling widget), `ki-70` (standalone; v1 wire/drop superseded by the v2 Reference design — the glossary slice already serves the Reference mode via panel/no-JS), `Fork D 3/3`, `ki-72` (as content decision — the KI#72 *value* decision resurfaces inside the migration's sampling-cluster disposition; 4 live locations after iter 133), `dupes-2` and equivalent sequential cleanup batches. `ki-79`, `cache-bust-1`, `vs-e09-hex`, obs-3/4/5/6: deferred unless a migration slice requires them.

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start. iter-138 (owner-gates-ratified + §6.1 disposal) is complete and verified — all four map-§6 gates DECIDED (DEC-19/DEC-20), visual-markup ownership locked (master embed canonical; `visual-system/` frozen; 16 stale prototype/extract files REMOVED_WITH_REASON). Four cluster audits MUST PASS: `python3 scripts/audit_glossary_parity.py`, `python3 scripts/audit_core_directives_parity.py`, `python3 scripts/audit_token_budget_parity.py`, `python3 scripts/audit_enneagram_parity.py` (all wired into `AGENTS.md` canon-audits). `data/glossary.json` is **generated** (`pnpm run build:glossary`) and `data/enneagram.json` is **generated** (`pnpm run build:enneagram` / inside `pnpm run build`) — never hand-edit; term changes go through `docs/canon/glossary_registry.md`, enneagram canonical values through `docs/canon/part_05.md` §5.4, the enneagram machine-layer supplement through `scripts/generate_enneagram.mjs`. v1 remains frozen as migration source — do not edit `docs/canon/part_*.md`/`appendix_*.md` or `src/master/` content without an explicit migration-slice scope.
