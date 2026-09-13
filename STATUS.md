# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-13
> **Iteration:** 117
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 117 — Documentation hygiene (obs-1/obs-2 closure, doc-only).**

Closed PLAN.md observations obs-1/obs-2 (stale doc headers): `docs/content_map.md` — header 9.2.0/2026-06-24 → 9.2.6/2026-09-13; added missing `p1_prebuild_checklist` row + conceptual Part 0 (2 §) + Appendix D (1 §); fixed 10 shifted Canon § in Part 7A (Token Budget = §7A.12, not §7A.3); Summary counts 97→96 master sections with explicit 96/97 counting convention. `docs/architecture.md` — header refreshed; pre-commit section rewritten to reality (lint + build + validate, `SKIP_ARTIFACT_BUILD=1` for doc-only); directory tree rebuilt from the actual repo (removed nonexistent `cross_reference_sync.md`/`user_journeys.md`/`validate-migration.mjs`); version-history table → CHANGELOG pointer (information ownership); section-markup example now carries `id`; `p7_core_directives` → `p7a_core_directives`. `AGENT_NAVIGATION.md` §5: CORE DIRECTIVE #7 corrected to **Pre-Generation Filter** (was wrongly "Format Lock"; verified vs canon §7A.2 + master) + §7 row for `docs/CONTENT_RESTRUCTURE_PLAN.md` (historical, referenced by canon `_README`). **KI#67 opened:** `qa:doc-versions` gate is blind — regex misses `**Last Updated:**` bold format, so every docs/*.md is skipped; both fixed files now use the gate-visible plain format. No product/content/build code touched — hash `2ab607d6` unchanged.

Baseline re-verified BEFORE edits at `BASE_COMMIT 01a4f9d1`: build PASS · tests 64/64 · version:check PASS · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · qa:english 19 (baseline) · qa:syntax 247 (baseline) · qa:doc-versions "PASS" (but blind — KI#67).

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

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note (historical):** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification proved the filters intact; the "corruption" was a terminal display artifact (pitfall #27).

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

1. **Owner's choice between (see `PLAN.md` for scope/acceptance/verification per row):** Fork D part 2/3 — sampling widget · dupes-1 — self-admitted dupes cleanup (§7A.12 + §9.11).
2. Fork D part 3/3 (persona widget) needs owner definition of intent before planning.
3. ki-67 — fix the `qa:doc-versions` gate (script regex vs header normalization; see KI#67 in this file).
4. obs-4 — stale version headers in remaining docs (`components.md`, `terminology_dictionary.md` — each needs its own content-verification pass before refresh).

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start.
