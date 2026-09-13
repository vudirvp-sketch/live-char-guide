# Live Character Guide — Plan & Backlog

> **What is pending, and in what order.** Order authority: `STATUS.md` **Next step** (re-pinned
> every iteration) picks from this backlog; owner-gated rows are not auto-candidates.
> Scope/acceptance live HERE — one row = one future iteration (or a numbered part of one).
> History of completed work: `worklog.md` · `CHANGELOG.md` · git. This file carries no history.
>
> Every backlog row MUST carry: Task · Scope · Acceptance criteria · Required verification · Owner gate (if any).

---

## Owner-gated queue (decision needed before any agent work)

| ID | Task | Scope | Acceptance criteria | Required verification | Owner gate |
|----|------|-------|---------------------|----------------------|------------|
| fork-d-3-intent | Fork D (part 3/3) — persona widget: owner defines intent (new 3rd widget vs extend `persona-synthesis`) | TBD after decision | TBD | TBD | **YES — owner must define intent before planning** |

## Backlog (deferred work, ordered by readiness)

| ID | Task | Scope | Acceptance criteria | Required verification | Owner gate |
|----|------|-------|---------------------|----------------------|------------|
| ki-67 | Fix `qa:doc-versions` gate blindness — `scripts/check-doc-versions.mjs` regex does not match `**Last Updated:**` bold format (all docs skipped, gate always passes). Fix the regex to accept optional `**` (preferred — one place) and/or normalize remaining doc headers to plain format | `scripts/check-doc-versions.mjs` (+ optionally headers of `docs/components.md`, `docs/terminology_dictionary.md`, character bibles when their content passes happen — obs-4) | Gate actually parses every docs/*.md date header; no false skips; existing PASS behavior preserved for files with current dates; `--strict` still works | `pnpm run qa:doc-versions` before/after (output lists parsed files instead of "skipping"); unit-check the regex against both header formats | NONE — scripts/ change, but validate.yml CI path fires (`scripts/**`) |
| fork-d-2 | Fork D (part 2/3) — sampling widget: slider configurator for `p7a_sampling_params` | New widget JS in `src/shell/widgets/` + `<div data-widget>` markup in `src/master/part_07a.html` + `data/*.json` (if parameter data) + `lazy-loader.js` registration + `docs/components.md` classes | Widget renders in Part 7A; data-driven (no hardcoded data in JS); CSP-clean; follows markup/data/behavior split | build + validate + validate:master + version:check + tests + qa gates + canon sync + `audit_vs_embeds.py`; hash changes only if `src/shell/index.html` touched | MEDIUM risk — new widget = infrastructure approval |
| dupes-1 | Self-admitted dupes cleanup — §7A.12 plain-copy pre-block + §9.11 quick-check table | `docs/canon/part_07a.md` + `part_09.md` FIRST, then `src/master/part_07a.html` + `part_09.html`; content decisions require visual diff | Dupes removed per `viz > dry text` (replacement, not addition); cross-refs (IMP-48) stay valid | Canon sync 97/97 (or updated count) + drift informational + build + tests + qa:english no new leaks | Content semantics — canon-first edits |

## Low priority / observations (recorded, not scheduled)

| ID | Observation |
|----|-------------|
| obs-3 | `docs/CONTENT_RESTRUCTURE_PLAN.md` (iter 6 historical restructure strategy, referenced by `docs/canon/_README.md`) self-describes as "Status: ANALYTICAL" while the migration it planned is COMPLETE (iter 7–18). Candidate for an owner decision: mark header as historical/complete in place, or archive. Not deleted in iter 117 (live reference exists). |
| obs-4 | Stale version headers in remaining docs: `docs/components.md` (9.2.0 / 2026-07-25) · `docs/terminology_dictionary.md` (9.2.0 / 2026-07-25). Each refresh needs its own content-verification pass (components.md vs post-iter-114/115 CSS reality; terminology vs current canon terms) — header-only bump without the pass would be cosmetic. Character bibles track their own content version (provenance), not guide staleness. |

---

## Completed tracks (one-liners — detail in worklog/CHANGELOG/git)

- Docs-restructure plan (iter 1–101) — COMPLETE (agent docs in English since iter 101).
- Canon migration (iter 7–18) — COMPLETE: 10 Parts + 4 Appendices + Part 0 migrated, 97/97 sync.
- Phases A–E content work (iter 81–108) — COMPLETE.
- Multilingual forks A–C (iter 110), Fork D 1/3 voice-hierarchy widget (iter 111) — COMPLETE.
- Dead code/CSS debt (iter 112–115: dead widgets, Mermaid infra, both CSS files) — COMPLETE.
- Agent operating-system rework (iter 116) — COMPLETE (this iteration's predecessor context).
- Documentation hygiene (iter 117: content_map.md + architecture.md content pass, NAV §5 directive fix) — COMPLETE (obs-1/obs-2 closed; KI#67 + obs-3/obs-4 recorded).
