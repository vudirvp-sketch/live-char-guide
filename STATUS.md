# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 120
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 120 — `qa:doc-versions` gate sighted (KI#67 fixed) + editorial matrix Phase A (ed-matrix).** `scripts/check-doc-versions.mjs` regex now accepts optional bold markers and the Russian `**Дата:**` header: the gate parses **8/8** docs (was 2/8 — 6 false skips, false PASS), `--strict` still exits 1 on warnings, PASS behavior preserved for current files. The now-sighted gate emits **1 genuine warning**: `CONTENT_RESTRUCTURE_PLAN.md` declared 2026-06-23 vs last commit 2026-07-08 — the obs-3 file (owner-gated fate). NEW `docs/research/editorial_matrix.md` (Phase A: Parts 1/3/7A/9 per backlog-audit §4; 38 sections, **210 block rows**, machine-checkable `<data-section>::<NN>` IDs, script-verified 210/210 unique): 190 KEEP / 10 COMPRESS / 4 CROSS-REFERENCE / 1 MOVE / 5 DELETE; **13 automatic compression candidates** + R04 pair; repeat registry R01–R20 (§24 classes); ed-1…ed-8 re-scoped from its output (ed-1 scope narrowed: Part 1 does not block-level re-teach Parts 2–7A). Two KIs opened by the matrix (read-only row — fixes deferred): **KI#71** (canon `part_07a.md` L30–31 byte-identical duplicate RULE line; master has one copy) and **KI#72** (sampling contradictions §7A.6 ↔ §7A.7). Full battery green, hash `2ab607d6` unchanged, baselines 19/247 unchanged.

Baseline re-verified BEFORE edits at `BASE_COMMIT bd2134f0`: gate-blindness reproduced (6 skips). After edits: build PASS (hash `2ab607d6` unchanged — `src/` untouched) · validate 5/5 + SHELL-* · validate:master 12/12 · version:check PASS (9.2.6) · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · qa:english 19 / qa:syntax 247 (baselines unchanged) · qa:doc-versions 8/8 parsed, exit 0 · lint 0 errors (1 pre-existing warning, untouched) · `git diff --check` clean · build timestamp churn in root `index.html` restored (no deliverables built).

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
| KI#69 | Silent per-part fetch failure in `loadContent()` (`src/shell/lazy-loader.js`): `.catch(() => '<!-- Failed to load ... -->')` replaced a failed part fetch with an HTML comment — no retry, no console signal, no user-visible indication; `Promise.all` still resolved, loading overlay hid, page "looked loaded" while all tables/VS-visuals/widget containers of the failed part vanished (matches the owner-reported "unstable tables/visualizations/widgets"). Fixed iter 119: `fetchPartHtml()` retry (2×, backoff 300/900 ms; network/5xx/429 retried, other 4xx fail fast) + in-place `role=alert` placeholders with one-click surgical re-fetch + `console.warn` diagnostics + manifest-error retry (incl. `content-hidden` invisibility fix). Runtime-verified headless (48/48). | CLOSED iter-119 | 2026-09-14 (iter 119) |
| KI#70 | Appendices never runtime-loaded: `parts/manifest.json` has an `appendices` array (appendix_mbti / appendix_model_table / appendix_glossary) that `src/shell/lazy-loader.js` never reads — it iterates only `manifest.parts`. Appendix A (MBTI Reference + `mbti-composer` container), B (Model Capability Table), C (Glossary appendix) never render; the auto-injected TOC's `#appendix_*` links (built `part_01.html:414+`) are dead. Pre-existing across lazy-loader history (git `-S` finds no "appendices" consumer ever). Systematic, same symptom family as KI#69. Deferred: 1-line wiring activates never-exercised widget/content paths → own iteration + verification (`PLAN.md` ki-70, owner-gated). | OPEN | 2026-09-14 (iter 119) |
| KI#71 | Canon `docs/canon/part_07a.md` L30–L31: the identity-name RULE («Имя персонажа сохраняет каноническую форму…») is duplicated byte-identical on two consecutive lines; `src/master/part_07a.html` carries the paragraph once. Found by the iter-120 editorial matrix (`p7a_system_prompt::05`). Fix = delete one canon line (fold into the next canon-touching iteration — dupes-1/ed-6 family; `PLAN.md` ki-71). | OPEN | 2026-09-14 (iter 120) |
| KI#72 | Sampling parameter contradictions inside Part 7A: §7A.7 (`p7a_model_checklist`) table says 32B+ Temperature **0.85–1.1** and 32B+ RepPen **1.0–1.05**, while canonical §7A.6 (`p7a_sampling_params`) says 32B+/API Temperature **0.7–1.0** and 32B+/API RepPen **1.05–1.10**. Reader-visible inconsistency; found by the iter-120 editorial matrix (R12). Fix requires a content decision on the canonical values + master mirror (`PLAN.md` ki-72). | OPEN | 2026-09-14 (iter 120) |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note (historical):** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification proved the filters intact; the "corruption" was a terminal display artifact (pitfall #27).

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

1. **Owner's choice between (see `PLAN.md` for scope/acceptance/verification per row):** Fork D part 2/3 — sampling widget · dupes-1 — self-admitted dupes cleanup (§7A.12 + §9.11; matrix R16 + stale-note evidence now in `editorial_matrix.md`) · **ed-policy — adopt the editorial rule set (research §27) as content-editing law (gates all editorial work)**.
2. **ki-70 (owner-gated) — decide appendix runtime loading:** wire `manifest.appendices` into `loadContent()` (KI#70) or drop appendices from the manifest/TOC. 1-line change either way, but it activates never-exercised `mbti-composer`+appendix paths → needs its own verification iteration (runtime suite exists from iter 119 and covers the wiring pattern).
3. Fork D part 3/3 (persona widget) needs owner definition of intent before planning.
4. **ed-matrix Phase B (non-gated, read-only):** extend `docs/research/editorial_matrix.md` to Part 0, 2, 4, 5, 6, 7B, 8, 10 + appendices using the same block-ID scheme (Phase A done iter 120; phasing recorded in `PLAN.md`).
5. **ed-6 (non-gated, canon-first):** strip repo-meta from reader prose — R17 registry now itemizes the Part 1 + Part 7A locations (2 of them stale); Part 8 confirmed by the backlog audit. Natural carrier for the KI#71 one-line fix and the stale §7A.12 canon note (dupes-1 second half).
6. **ki-71 / ki-72 (small canon fixes):** KI#71 = delete the duplicate RULE line in `part_07a.md`; KI#72 = reconcile §7A.6 ↔ §7A.7 sampling values (needs a value decision — see `editorial_matrix.md` R12).
7. obs-4 — stale version headers in remaining docs (`components.md`, `terminology_dictionary.md` — each needs its own content-verification pass before refresh). Note: after the ki-67 fix the gate parses their date headers (both currently drift 0d); obs-4 is about version staleness, not dates. obs-3 — `CONTENT_RESTRUCTURE_PLAN.md` header/status (now also the gate's 1 warning).

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start.
