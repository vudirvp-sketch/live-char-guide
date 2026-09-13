# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 119
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 119 — Lazy-loader per-part fetch resilience (KI#69 fixed, KI#70 opened).** Root cause of the owner-reported "unstable tables/visualizations/widgets" confirmed in code and fixed: `loadContent()` fetched each part with a silent `.catch()` (failed part → HTML comment; no retry, no signal; loading overlay hid normally — page "looked loaded"; all tables/VS-visuals/widget containers of that part vanished together). Fix in `src/shell/lazy-loader.js` + `src/shell/styles.css`: `fetchPartHtml()` retry (2 retries, backoff 300/900 ms; network errors/5xx/429 retried, other 4xx fail fast) + visible in-place error placeholders (`role=alert`, Russian, retry button performing a surgical single-part re-fetch that preserves scroll and re-runs the standard init sequence) + `console.warn` diagnostics + manifest-error retry button (also lifts the pre-existing `content-hidden` invisibility of the manifest error). Verified by a headless-Chrome fault-injection runtime suite (48/48: clean / persistent 503 / transient auto-recovery / connection drop / 404 fail-fast / manual retry recovery / manifest retry; BASE control reproduces the silent failure) + full battery green, hash `2ab607d6` unchanged.

**KI#70 opened (NOT fixed — owner-gated):** `parts/manifest.json` carries an `appendices` array that `lazy-loader.js` never reads (git history: never loaded) → Appendix A (MBTI Reference + `mbti-composer` widget container), B (Model Capability Table), C (Glossary appendix) never render at runtime; the auto-injected TOC's `#appendix_*` links are dead. Systematic (not intermittent), same symptom family. Deferred per scope discipline — the 1-line wiring fix activates never-exercised content+widget paths and needs its own verification iteration (`PLAN.md` ki-70).

Baseline re-verified BEFORE edits at `BASE_COMMIT 3a28a5dc`: build PASS (hash `2ab607d6`) · validate 5/5 + SHELL-* PASS · validate:master 12/12 · version:check PASS (9.2.6) · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · qa:english 19 (baseline) · qa:syntax 247 (baseline) · qa:doc-versions "PASS" (blind — KI#67). After edits: same battery + runtime suite re-run, all green (see `worklog.md`).

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
| KI#67 | `qa:doc-versions` gate blind: `check-doc-versions.mjs` regex `(?:Last Updated\|Date):\s*YYYY-MM-DD` does not match the bold-markdown header format `**Last Updated:** YYYY-MM-DD` used by docs/*.md — every file is skipped, gate always "passes" without checking. Fix options: update the script regex (accept optional `**`) or normalize doc headers to plain format. `docs/content_map.md` + `docs/architecture.md` already switched to the gate-visible plain format (iter 117). | OPEN | 2026-09-13 (iter 117) |
| KI#68 | Card-block counting inconsistency in §1.2 `p1_card_overview` (confirmed from external editorial research §3): intro sentence said "состоит из четырёх блоков" while the same section's E01 viz ("стек из 5 блоков"), 5-row block table (SP/Description/Examples/Anchors/Greeting) and the Anchors RULE ("отдельный структурный блок") establish 5 blocks. Fixed iter 118: canon `part_01.md` + master `part_01.html` "четырёх" → "пяти" (2 files, 2 lines). Canon sync 97/97, build, tests, qa gates green after fix. | CLOSED iter-118 | 2026-09-13 (iter 118) |
| KI#69 | Silent per-part fetch failure in `loadContent()` (`src/shell/lazy-loader.js`): `.catch(() => '<!-- Failed to load ... -->')` replaced a failed part fetch with an HTML comment — no retry, no console signal, no user-visible indication; `Promise.all` still resolved, loading overlay hid, page "looked loaded" while all tables/VS-visuals/widget containers of the failed part vanished (matches the owner-reported "unstable tables/visualizations/widgets"). Fixed iter 119: `fetchPartHtml()` retry (2×, backoff 300/900 ms; network/5xx/429 retried, other 4xx fail fast) + in-place `role=alert` placeholders with one-click surgical re-fetch + `console.warn` diagnostics + manifest-error retry (incl. `content-hidden` invisibility fix). Runtime-verified headless (48/48). | CLOSED iter-119 | 2026-09-14 (iter 119) |
| KI#70 | Appendices never runtime-loaded: `parts/manifest.json` has an `appendices` array (appendix_mbti / appendix_model_table / appendix_glossary) that `src/shell/lazy-loader.js` never reads — it iterates only `manifest.parts`. Appendix A (MBTI Reference + `mbti-composer` container), B (Model Capability Table), C (Glossary appendix) never render; the auto-injected TOC's `#appendix_*` links (built `part_01.html:414+`) are dead. Pre-existing across lazy-loader history (git `-S` finds no "appendices" consumer ever). Systematic, same symptom family as KI#69. Deferred: 1-line wiring activates never-exercised widget/content paths → own iteration + verification (`PLAN.md` ki-70, owner-gated). | OPEN | 2026-09-14 (iter 119) |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note (historical):** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification proved the filters intact; the "corruption" was a terminal display artifact (pitfall #27).

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

1. **Owner's choice between (see `PLAN.md` for scope/acceptance/verification per row):** Fork D part 2/3 — sampling widget · dupes-1 — self-admitted dupes cleanup (§7A.12 + §9.11) · **ed-policy — adopt the editorial rule set (research §27) as content-editing law (gates all editorial work)**.
2. **ki-70 (NEW, owner-gated) — decide appendix runtime loading:** wire `manifest.appendices` into `loadContent()` (KI#70) or drop appendices from the manifest/TOC. 1-line change either way, but it activates never-exercised `mbti-composer`+appendix paths → needs its own verification iteration (runtime suite exists from iter 119 and covers the wiring pattern).
3. Fork D part 3/3 (persona widget) needs owner definition of intent before planning.
4. **ed-matrix — build the Parts 1–10 editorial matrix** (research §32): read-only audit, prerequisite for ed-1/ed-2/ed-3/ed-7 — can run without ed-policy decision (policy gates edits, not analysis).
5. ki-67 — fix the `qa:doc-versions` gate (script regex vs header normalization; see KI#67 in this file).
6. obs-4 — stale version headers in remaining docs (`components.md`, `terminology_dictionary.md` — each needs its own content-verification pass before refresh).

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start.
