# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 121
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 121 — ed-6 reader/repo-metadata separation (content iteration, canon-first) + KI#71.** Rendered guide prose now carries **zero repo-internal references** — acceptance sweep `KI#|iter NN` over `src/master/` + `parts/` + `dist/` returns a single hit inside the E18 VS-EMBED provenance **HTML comment** (byte-verified non-rendering). Stripped: Part 1 §1.2 Mermaid/iter-14 history + `AUTO_TOC_PLACEHOLDER` build internals (canon-only, master was already clean); Part 7A §7A.1 stale `[ANCHORS]`-drift/KI#58 note → 1-sentence reader-useful canonical-format note (substance kept), §7A.2 `(D4, iter 93)` marker, §7A.12 stale iter-11 migration note deleted (described plain-copy block no longer exists; canon-only); Part 8 §8.1 `iter 55 / KI#38` history sentence. **KI#71 CLOSED:** byte-identical duplicate identity-name RULE line deleted from canon `part_07a.md` (master already carried it once — untouched by that fix). Non-rendering repo-meta left as-is per scope discipline, recorded for Phase B: `part_06.md` L83, `part_00.md` L13, `appendix_character_map.md` L29 (+ canon system docs `_README.md` / `iter60_analysis_plan.md`, native repo docs). Full battery green, hash `2ab607d6` unchanged, baselines 19/247 unchanged, deliverables built (`parts/part_07a.html` + `parts/part_08.html` regenerated).

Baselines re-verified BEFORE edits at `BASE_COMMIT 6fe532b6` (worktree clean, iter 120): drift actionable 134 / canon-only sections 3 / sync 97/97. After edits: build PASS (hash `2ab607d6` unchanged — `src/shell/` untouched) · validate 5/5 + SHELL-* · validate:master 12/12 · version:check PASS (9.2.6) · tests 64/64 · canon sync 97/97 · drift exit 0 (actionable 134→**133** — repo-meta removal reduces drift; canon-only sections 3 unchanged) · qa:csp/bundle/contrast PASS · qa:english 19 / qa:syntax 247 (baselines unchanged) · qa:doc-versions 8/8 parsed, 1 pre-existing warning (obs-3), exit 0 · lint 0 errors (1 pre-existing warning, untouched) · `git diff --check` clean · `index.html` timestamp churn kept (real deliverable build this iteration).

---

## Invariants

- **Version sync:** canonical 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` + build manifest (`pnpm run version:check`).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** absent by design (removed iter-113) — content diagrams = VS-EMBEDs only; no CDN script dependency.
- **CSS:** `src/assets/vs-styles.css` 3242 lines · `src/shell/styles.css` 7025 lines (both trimmed to in-use rules, iter 114/115).
- **Canon → master sync:** 97/97 PASS (`scripts/audit_canon_master_sync.py` MUST pass).
- **Voice Isolation:** linguistic voice = Examples/Greeting only; physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES:** shorthand `{{CORE_DIRECTIVES — ...}}` accepted; #6 = Consequence Driven, #7 = Pre-Generation Filter.
- **SP Language rule:** layered — 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language (§7A.2 RULE).
- **Identity name-language:** canonical form preserved across all card blocks — transliteration forbidden (§7A.1 RULE).
- **Script Tax:** non-Latin scripts ~1.5–2× tokens on 32K vocab; ≥128K → negligible (§7A.12 RULE).
- **Widgets:** 12 in `src/shell/widgets/`.

Full rules and fences: `AGENTS.md` → Hard fences. Content semantics: `docs/canon/`.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| KI#67 | `qa:doc-versions` gate blind: `check-doc-versions.mjs` regex `(?:Last Updated\|Date):\s*YYYY-MM-DD` did not match the bold-markdown header format `**Last Updated:** YYYY-MM-DD` (or the Russian `**Дата:**`) used by 6 of 8 `docs/*.md` — every such file skipped, gate always "passed" without checking. Fixed iter 120: regex `\*{0,2}(?:Last Updated\|Date\|Дата):\*{0,2}\s*(\d{4}-\d{2}-\d{2})` + unit-check 7/7 + gate output verified before (6 skips, false PASS) and after (8/8 parsed, 0 skips, 1 genuine warning surfaced, `--strict` exit 1 works). | CLOSED iter-120 | 2026-09-13 (iter 117) |
| KI#70 | Appendices never runtime-loaded: `parts/manifest.json` has an `appendices` array (appendix_mbti / appendix_model_table / appendix_glossary) that `src/shell/lazy-loader.js` never reads — it iterates only `manifest.parts`. Appendix A (MBTI Reference + `mbti-composer` container), B (Model Capability Table), C (Glossary appendix) never render; the auto-injected TOC's `#appendix_*` links (built `part_01.html:414+`) are dead. Pre-existing across lazy-loader history (git `-S` finds no "appendices" consumer ever). Systematic, same symptom family as KI#69. Deferred: 1-line wiring activates never-exercised widget/content paths → own iteration + verification (`PLAN.md` ki-70, owner-gated). | OPEN | 2026-09-14 (iter 119) |
| KI#71 | Canon `docs/canon/part_07a.md` L30–L31: the identity-name RULE («Имя персонажа сохраняет каноническую форму…») was duplicated byte-identical on two consecutive lines; `src/master/part_07a.html` carried the paragraph once. Found by the iter-120 editorial matrix (`p7a_system_prompt::05`). Fixed iter 121 (ed-6 carrier): one canon line deleted, master untouched by the fix, canon sync 97/97 re-verified. | CLOSED iter-121 | 2026-09-14 (iter 120) |
| KI#72 | Sampling parameter contradictions inside Part 7A: §7A.7 (`p7a_model_checklist`) table says 32B+ Temperature **0.85–1.1** and 32B+ RepPen **1.0–1.05**, while canonical §7A.6 (`p7a_sampling_params`) says 32B+/API Temperature **0.7–1.0** and 32B+/API RepPen **1.05–1.10**. Reader-visible inconsistency; found by the iter-120 editorial matrix (R12). Fix requires a content decision on the canonical values + master mirror (`PLAN.md` ki-72). | OPEN | 2026-09-14 (iter 120) |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note (historical):** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification proved the filters intact; the "corruption" was a terminal display artifact (pitfall #27).

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

1. **Owner's choice between (see `PLAN.md` for scope/acceptance/verification per row):** Fork D part 2/3 — sampling widget · dupes-1 — self-admitted dupes cleanup (reduced scope after iter 121: §9.11 `<details>` dupe R16 + R01 §7A.1 full-copy compress + dangling-ref repair; the KI#71 line + §7A.12 stale-note halves are CLOSED iter-121) · **ed-policy — adopt the editorial rule set (research §27) as content-editing law (gates all editorial work)**.
2. **ki-70 (owner-gated) — decide appendix runtime loading:** wire `manifest.appendices` into `loadContent()` (KI#70) or drop appendices from the manifest/TOC. 1-line change either way, but it activates never-exercised `mbti-composer`+appendix paths → needs its own verification iteration (runtime suite exists from iter 119 and covers the wiring pattern).
3. Fork D part 3/3 (persona widget) needs owner definition of intent before planning.
4. **ed-matrix Phase B (non-gated, read-only):** extend `docs/research/editorial_matrix.md` to Part 0, 2, 4, 5, 6, 7B, 8, 10 + appendices using the same block-ID scheme (Phase A done iter 120; phasing recorded in `PLAN.md`). Now also carries the iter-121 discovered repo-meta locations (part_06 §6.3 L83, part_00 L13, appendix_character_map L29 — non-rendering, pending Phase B rows).
5. **ki-72 (small canon fix, MEDIUM — value decision):** reconcile §7A.6 ↔ §7A.7 sampling values (32B+ Temperature 0.7–1.0 vs 0.85–1.1; RepPen 1.05–1.10 vs 1.0–1.05) — matrix recommends §7A.6 = canonical, §7A.7 param rows → defer/ref (see `editorial_matrix.md` R12 + `p7a_model_checklist::02`).
6. obs-4 — stale version headers in remaining docs (`components.md`, `terminology_dictionary.md` — each needs its own content-verification pass before refresh). Note: after the ki-67 fix the gate parses their date headers (both currently drift 0d); obs-4 is about version staleness, not dates. obs-3 — `CONTENT_RESTRUCTURE_PLAN.md` header/status (now also the gate's 1 warning).

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start.
