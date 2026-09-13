# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-13
> **Iteration:** 116
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 116 — Agent operating-system rework (meta-iteration, doc-only).**

Reworked the agent-facing operational layer after a canonsim-principles analysis (authority order, preflight, anti-loop, scope discipline, DoD, reproducible delivery). Changes: `AGENTS.md` rewritten as operating law (authority order · preflight · anti-loop · scope discipline · task-type reading gradient · Definition of Done · delivery vs BASE_COMMIT · doc caps); `AGENT_NAVIGATION.md` stripped of history/roadmap → current-state map + new §10 information ownership; this file restructured (state snapshot + authoritative Next step); `PLAN.md` repurposed from a completed 2026 docs-restructure plan (stale: claimed KI#64 OPEN) into the live backlog; `DECISIONS.md` created (append-only "why" home); `README.md` stale "iter 101" status line fixed. No product/content/build code touched — hash `2ab607d6` unchanged. Detail: `worklog.md` iter-116.

Baseline re-verified BEFORE the rework at `BASE_COMMIT c212a024`: build PASS · tests 64/64 (after build) · version:check PASS · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast/doc-versions PASS · qa:english 19 (baseline) · qa:syntax 247 (baseline). Workflow branch filters byte-verified as `[main]` (intact) — an initially suspected CI corruption turned out to be a terminal display artifact (see `worklog.md` iter-116, pitfall #27).

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
| _(none — all KIs resolved)_ | — | — | — |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note:** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification (`str.count('[main]')`) proved the filters intact; the "corruption" was a terminal display artifact eating the `[m` sequence. Lesson recorded as pitfall #27. No KI remains open.

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

1. **Owner's choice between (see `PLAN.md` for scope/acceptance/verification per row):** Fork D part 2/3 — sampling widget · dupes-1 — self-admitted dupes cleanup (§7A.12 + §9.11).
2. Fork D part 3/3 (persona widget) needs owner definition of intent before planning.
3. Observations obs-1/obs-2 (stale version headers in `docs/content_map.md` + `docs/architecture.md`) — low priority, record-only until scheduled.

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start.
