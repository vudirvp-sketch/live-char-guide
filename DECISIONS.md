# DECISIONS.md — Standing Decisions

> Append-only. Each entry: decision → why → consequence. Supersede with a new entry,
> never delete. Cap ~20 rows — over cap, merge related rows into compound IDs (citations
> must keep resolving). This is the long-term home of **why**; `worklog.md` records **what**.
> IDs here are `DEC-NN`. (Content-duplicate IDs `D1–D20` in `docs/research/` are a
> different namespace — do not collide.)

| ID | Date | Decision | Why | Consequence |
|----|------|----------|-----|-------------|
| DEC-01 | 2026-08-13 | Repo language law: agent-facing docs/commits in English; guide content bilingual per content rules; owner chat in Russian | consistent LLM consumption (iter-101 rewrite); content language is a product property | new agent docs written in English; never translate the guide itself via agent initiative |
| DEC-02 | 2026-06-23 | Canon (`docs/canon/part_NN.md`) = single source of truth; `src/master/*.html` derived | duplicated semantics drifted 3–5× per concept (KI#14 era) | on drift, canon wins; master reconciles; `audit_canon_master_sync.py` MUST pass |
| DEC-03 | iter 14 | `viz > dry text`: visualization = replacement, not addition | parallel text+visual duplication bloats tokens and drifts | if a VS-EMBED shows a concept, text must not re-explain it; unique visualizations are not deleted |
| DEC-04 | v8 | Root fallbacks (`parts/`, `widgets/`, `assets/`, `event-bus.js`, `index.html`, `build.hash`) are committed but regenerated | GitHub Pages backward-compat without CI on every push | NEVER hand-edit root fallbacks; edits go to `src/` + `data/`, then `pnpm run build` |
| DEC-05 | 2026-09-13 | `build.hash` = first 8 hex of `sha256(src/shell/index.html)` — cache-busting value only | verified in `src/scripts/build-shell-unified.mjs`; content/CSS/data changes must not false-positive the hash | hash unchanged ≠ nothing changed; diff vs BASE_COMMIT is the real delivery check (AGENTS.md delivery discipline) |
| DEC-06 | 2026-08-14 | Mermaid removed entirely; VS-EMBEDs own all diagrams; CSP carries no CDN script-src | content had zero `.mermaid` usages since iter 14; CDN = unused attack surface | no diagram libraries; new diagrams = VS-EMBED elements per `docs/components.md` |
| DEC-07 | 2026-08-13 | Theme model: OLED/dark default (no class) + Light (`body.theme-light`) only | dark class was dead complexity (iter 98/99) | no third theme; theme CSS changes must check both modes |
| DEC-08 | iter 93 | `{{CORE_DIRECTIVES — ...}}` shorthand is the accepted navigational convention (D4) | one definition — one place | shorthand references Part 7A; never expand the directive list inline |
| DEC-09 | iter 111 | Widget data lives in `data/*.json`, never hardcoded in JS; single exception: `persona-voice-hierarchy` embeds canon-constant prose values | data/JSON keeps widgets data-driven and auditable; §3.2 table values are canonical prose, not widget data | new widgets default to `data/*.json`; exceptions must cite canon provenance in the widget header |
| DEC-10 | 2026-09-13 | Agent-doc split of concerns: `AGENTS.md`=law · `AGENT_NAVIGATION.md`=current-state map · `STATUS.md`=state+Next step · `PLAN.md`=backlog · `DECISIONS.md`=why · `worklog.md`=history | state fragmentation and duplicated roadmap/iteration numbers caused drift (README stuck at iter 101; PLAN stale; NAV carried history) | one fact — one owner (NAV §10); iteration number lives ONLY in `STATUS.md`; navigation never carries history |
| DEC-11 | 2026-08-13 | Doc-only commits may skip artifact build: `SKIP_ARTIFACT_BUILD=1` (lint still runs) | builds churn root `index.html` timestamp for zero functional change | only for commits not touching `src/` or `data/`; exploratory builds' timestamp noise gets restored, not committed |
| DEC-12 | 2026-08-13 | KI lifecycle: record → fix-if-in-scope → close → delete after 2 iterations | unrecorded bugs recur (KI#63/64 same version-drift pattern) | discovering a problem never grants permission to fix it (scope discipline, AGENTS.md) |
| DEC-13 | 2026-09-13 | QA gates judged individually with fixed baselines: english=19 by design, syntax=247 pre-existing | aggregate `pnpm run qa` exits 1 by design — the exit code is not the signal | counts must not increase; PASS/FAIL only for csp/bundle/contrast/doc-versions; new leaks = regression |
| DEC-14 | 2026-09-14 | Part-fetch resilience pattern (KI#69): per-part fetch gets retry (2×, backoff 300/900 ms; network/5xx/429 only, 4xx fail fast) + in-place `role=alert` placeholder + surgical single-part re-fetch re-running the standard init sequence; runtime-UI classes (`.load-error`, `.load-retry-btn`) live in shell CSS, outside the `docs/components.md` content registry | transient network failures self-heal, persistent ones become visible at the exact gap with one-click recovery; alternatives (log-only / retry-only / banner-only) each leave a failure class untreated; architectural bundling rejected as out of research scope | new fetch-into-DOM flows (e.g. manifest-driven content) must reuse `fetchPartHtml()` + placeholder machinery instead of bare `fetch().catch()`; content-facing error markup stays Russian, code/comments English |

Append rule: a new standing decision gets the next `DEC-NN` ID and a one-line worklog
mention; never edit existing rows in place — supersede.
