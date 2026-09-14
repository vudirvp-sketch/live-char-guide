# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 130
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 130 — ed-4-family editorial batch + KI#78 fold (PLAN row `dupes-2` fourth batch, non-gated under DEC-15; owner chat directive «продолжай работу последней итерации, что там дальше следует логично»).** Executed matrix candidate **#6 (R06)** — Part 3 §3.2 L82 «Пояснение» re-explainer **deleted** (canon + master mirror `src/master/part_03.html`): the third re-explanation of the §3.1 Тест classification; the example is self-demonstrating (inline WRONG/CORRECT labels) and the RULE L65 + §3.1 canonical owner cover the load — R06 family consolidated, ed-4 residual framing none-evidenced (§3.1→§3.8 sequence already forms the hierarchy, no text invented). **KI#78 CLOSED** (fold per Next-step row 5): master `part_07b.html` §7B.5 fatigue-emulation RULE — «GHOST якоря (Anchors)» → «якоря призрака (GHOST-якоря)» + «поведенческие якоря (поведенческие якоря)» dupe paren dropped, wording aligned to canon L257 and the iter-129 checklist family. **KI#79 opened** (infra, informational): drift-tool `P_TAG_RE <p[^>]*>` also matches `<pre>` — deleting the last `<p>` before `</div>` after `<pre>` blocks shifts the blob-absorption boundary; actionable drift 159→160 with **zero content drift** (spurious +1, verified byte-identical transition). **Verification (executed):** build SUCCESS hash `2ab607d6` unchanged · canon sync **97/97 PASS** · validate + validate:master ✓ · version:check sync · tests **64/64** · qa:csp/bundle/contrast/doc-versions PASS (1 warning = pre-existing obs-3) · qa:english **18** / qa:syntax **247** (baselines exact) · `git diff --check` clean · root fallbacks `parts/part_03|07b.html` regenerated + index.html timestamp churn kept (real build — iter-121/127 precedent).

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

1. **Owner's choice (see `PLAN.md` for scope/acceptance/verification):** dupes-1 — COMPLETE iter 125; ed-matrix Phase B — COMPLETE iter 126; ed-8/R18 Phase B ref-repair batch — COMPLETE iter 127 (33 refs + 6 parens + KI#77-a–d); ed-8/R18 Phase A remainder + R17 strips #14/#15/#17/#18 — COMPLETE iter 128 (16 refs + 1 paren + 4 strips); ed-7-family (R05 #4, R03 #5, R29 ×4) + R17 [B] remainder — COMPLETE iter 129; **ed-4-family (#6 R06) + KI#78 fold — COMPLETE iter 130**. Remaining owner choice narrows to **Fork D 2/3** (sampling widget; executes with infrastructure approval) or a new row.
2. **ki-70 (owner-gated) — decide appendix runtime loading:** wire `manifest.appendices` into `loadContent()` (KI#70) or drop appendices from the manifest/TOC. 1-line change either way, but it activates never-exercised `mbti-composer`+appendix paths → needs its own verification iteration (runtime suite exists from iter 119). Two editorial candidates (glossary CORE DIRECTIVES compression #19, appendix_mbti container note) still ride this decision.
3. Fork D part 3/3 (persona widget) needs owner definition of intent before planning.
4. **ki-72 (small canon fix, MEDIUM — value decision):** reconcile §7A.6 ↔ §7A.7 sampling values — matrix recommends §7A.6 = canonical, §7A.7 param rows → defer/ref (candidate #7; AP-5/AP-7 stay valid under either outcome — verified iter 126). Executes under the Editorial Policy (DEC-15).
5. **Non-gated, ready under the Editorial Policy (matrix output): remaining 8 open candidates (#8, #10, #11, #13, #16, #19, #20 + the R04 pair).** Small batches: R01 #8 (§7A.11 fold), R21 #16 (§4.7 fold), R15 #11 (ed-3 fold), #13 (§9.7 compress); KI#77-e (character_map budget ranges — needs the ed-5 framing decision). **KI#78 CLOSED iter 130. KI#79** (drift-tool regex, informational — infra, own iteration). Sequence by owner choice or as dupes-N-style batches.
6. obs-4 — stale version headers in remaining docs (`components.md`, `terminology_dictionary.md` — each needs its own content-verification pass). obs-3 — `CONTENT_RESTRUCTURE_PLAN.md` header/status. obs-6 — «Выщебленного» misspelling ×3 (fold into ed-3/ed-8 or any Part 9/10 canon touch).
7. **vs follow-ups (iter 124 remainder, non-gated; see `PLAN.md`):** vs-audit — bounded E01–E18 systemic audit (research doc in `docs/research/`); vs-e09-hex — E09 master literal-hex strokes (KI#41/42 class, small fix); owner question — provenance of the supplied runtime-state embeds.

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start. iter-130 (ed-4-family + KI#78 fold) is complete and verified; the owner-gated rows above are unchanged.
