# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 132
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 132 — mig-glossary-evidence (v2 migration, doc-only).** Owner decisions on the first bounded area recorded as **DEC-17**: (a) canonical term-set = merged-with-review, Russian-first heads (DEC-16 applied: `lie → ложь` immediately, `token → токен`; EN only as technical identifiers); (b) source-of-truth chain = canonical term record → generated `glossary.json` → runtime panel / no-JS glossary; (c) glossary stays the v2 Reference-layer representation of the unified registry (KI#70 wire/drop stays deferred). **Registry C seeded with the glossary slice** (map §5.1): 26 matrix rows → C-1…C-26 with back-pointers in `editorial_matrix.md`; per-term merged-with-review evidence complete — 55 JSON terms dispositioned (T-01…T-55: 35 MERGED / 20 MOVED with verified canonical homes), 25 canon entries MERGED, **45 unified registry entries**, 6 head-forms flagged ⚑ (identifier-vs-prose boundary — owner review), dead `core_rules` → `REMOVED_WITH_REASON`. New finding: `glossary.json` RepPen «1.00–1.10» = 5th KI#72-family value location (map §4 row 2). Term-set partition re-derived by script (25/55/21/34/4 — matches foundation). No v1 content touched (frozen). Verification (executed): partition script + coverage/back-pointer cross-checks 26+55, `git diff --check` clean; no build run (no production files touched).

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

1. **Owner call — open the v2 build phase (mig-1 execution) + ratify `migration_map_v2.md` §5.1 per-term dispositions** (PROPOSED: 35 MERGED / 20 MOVED / 45 unified entries; 6 ⚑ head-forms — Author's Note, Description, Examples, Format Lock, System Prompt, Tone Frame). mig-1 remaining work: v2 target location design (where the canonical term registry lives) → registry build (RU-first heads per DEC-16/17a) → generator (registry → `glossary.json`) → re-point runtime panel / no-JS page → parity audit vs the 3 v1 term sets. Note: iters 131–132 are doc-only (Phase-1 evidence — the migration track's nature); per the documentation-loop alarm the v2 build phase opens on the owner's explicit go.
2. Remaining owner decision points (map §6, in recommended order): visual-markup ownership (§6.1: master embed canonical vs visual-system re-sync — evidence: 93% identity + drift), E13 diagnostic mappings (§6.2: canonicalize in §9.6 vs visual-canonical), hero prototype disposition (§6.4), rule-strength convention (§6.5 — RULE/GUIDELINE/OBSERVATION/EXPERIMENTAL/UNKNOWN markup for v2).
3. Second/third bounded areas (queued, evidence in Registry B): CORE DIRECTIVES cluster (mig-2; ed-2 evidence reused, executes the DEC-08 shorthand pattern in v2), diagnostics cluster (mig-3, Debug mode; blocked on the E13 decision).
4. **Superseded (per owner directive — do not auto-resume):** `Fork D 2/3` (sampling widget), `ki-70` (standalone), `Fork D 3/3`, `ki-72` (as content decision — the KI#72 *value* decision resurfaces inside the migration's sampling-cluster disposition), `dupes-2` and equivalent sequential cleanup batches. `ki-79`, `cache-bust-1`, `vs-e09-hex`, obs-3/4/5/6: deferred unless a migration slice requires them (e.g. vs-e09-hex pattern knowledge feeds the visual-markup ownership decision).

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start. iter-132 (glossary evidence) is complete and doc-verified; v1 is frozen as migration source — do not edit `docs/canon/`, `src/master/`, `data/` content without an explicit migration-slice scope.
