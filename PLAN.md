# Live Character Guide — Docs-Restructure Plan

> **Plan version:** 1.2 (actualized iter 101)
> **Date:** 2026-08-13
> **Author:** main agent
> **Pattern source:** https://github.com/vudirvp-sketch/poe2-regex-ru
> **Status:** iter 1–101 COMPLETE. This document preserves the historical context of the docs-restructure plan (§1–4) and the current stop-point (§5). Full iter-by-iter history: `worklog.md` + `CHANGELOG.md` + `git log`.

---

## 1. Analysis of the poe2-regex-ru Pattern

AI-agent documentation organization pattern:

| File | Role |
|------|------|
| `AGENTS.md` | Short entry point. Stack, conventions, critical rules, common commands, pointers. |
| `AGENT_NAVIGATION.md` | Full entry document. Where things live, aliases, dependency rules, pitfalls, dialect spec, doc map. |
| `STATUS.md` | Current iteration (iter N), Known Issues, Open Proposals, constraints. |
| `worklog.md` | Only the latest iteration in detail. Others = one-line summaries. |
| `README.md` | User-facing: what this is, capabilities, technologies, run, deploy. |
| `docs/*.md` | Detailed technical documents. |

Principles: entry document first, iter-based status, compact worklog, documentation map, FAQ-style pitfalls, open proposals.

---

## 2. Plan iter 1 (historical, COMPLETE)

Create `AGENT_NAVIGATION.md` / `STATUS.md` / `worklog.md`, delete obsolete `docs/migration_map.md` / `transition_guide.md` / `ap_reference_inventory.md`, update `README.md` / `CHANGELOG.md` / `docs/architecture.md`.

✅ **DONE iter 1–4.** Details: `worklog.md` (Previous Iterations) + `git log`.

---

## 3. Plan iter 6+ — Canon migration (historical, COMPLETE)

Strategy: Canonical Guide Spec in `docs/canon/part_NN.md` as the source of truth for each Part's content. Master HTML is migrated against Canon.

✅ **DONE iter 7–18.** All 10 Parts + 3 Appendix ✅ MIGRATED. See `docs/canon/_README.md` §5.

---

## 4. File Templates (reference)

### `AGENTS.md`

```markdown
# AGENTS.md — Live Character Guide

> Read this first. Short entry point for any LLM agent working in this repo.
> For the full reference, see AGENT_NAVIGATION.md.

## What this project is
## Iteration protocol
## Where things live
## Common commands
## Critical rules (do not break)
## Git safety
## Stop and confirm before proceeding
## Bug → doc → fix
## Output format (every iteration)
## Pointers
```

### `AGENT_NAVIGATION.md`

```markdown
# Agent Navigation — Live Character Guide

> Entry document. Read this first (or read AGENTS.md for the short version).

## 1. Where Things Are (directory map + ownership + rules)
## 2. Build Pipeline (master → unified → shell → dist)
## 3. Section Model (data-section, naming convention)
## 4. Widget Architecture (markup in HTML, data in JSON, behavior in JS)
## 5. Core Rules (3 principles, 7 CORE DIRECTIVES)
## 6. Frequent Pitfalls (numbered list with symptom + fix)
## 7. Documentation Map (when to update what)
## 8. Roadmap (iter N+)
## 9. Cross-Reference Pairs (synced registry)
## 10. Useful Links
```

### `STATUS.md`

```markdown
# Live Character Guide — Project Status

> Version: <canonical version>
> Date: <YYYY-MM-DD>
> Iteration: <N>

## Current State (iter N — what was done)
## Invariants
## Known Issues (KI#<N> with status — table format, max 15 entries)
## Roadmap
```

### `worklog.md`

```markdown
# Worklog

> Only the latest iteration in detail. Older = one-line summaries.

---
Task ID: iter-<N>-<short-desc>
Agent: main
Task: <one-line task description>

Work Log:
- step 1
- step 2

Stage Summary:
- results

---
## Previous Iterations (brief)
- iter N-1: <one-line summary>
- iter N-2: <one-line summary>
```

---

## 5. Stop Point

**iter 101 ✅ COMPLETE — Agent infrastructure English rewrite + actualization.**

All agent-facing documentation rewritten in English for consistent LLM consumption:
- **New:** `AGENTS.md` (short LLM entry point, ~150 lines).
- **Rewritten in English:** `AGENT_NAVIGATION.md`, `STATUS.md`, `worklog.md`, `PLAN.md`.
- **Updated:** `CHANGELOG.md`, `README.md`.
- **Discovered:** version drift on `mermaid-init.js` (KI#64, OPEN — needs user decision: rollback vs 4-place bump).

**iter 102 roadmap (proposed):**
- Resolve KI#64 — version sync reconciliation. Either:
  - **Option A (smaller blast radius):** rollback `mermaid-init.js` JSDoc `@version` from `9.3.0` → `9.2.6`. Safe, doc-only.
  - **Option B (full bump):** 4-place sync to `9.3.0` — update `src/VERSION` + `package.json` + `data/character_schema.json` manually + `pnpm run build` to regenerate `parts/manifest.json`. Requires user confirmation per `AGENTS.md` §"Stop and confirm" (touches `package.json` version field).

**Deferred:** V8/V9 Decision items — pending author discussion.

**Principles preserved:**
- `viz > dry text` — viz = replacement, not addition. Catalog vs Detail / Annotation Layer patterns = keep-by-design.
- Inline scripts forbidden (CSP compliance). Inline styles forbidden.
- VS-EMBED animation classes — covered by `vs-scroll-observer.js` selector or `scroll-enter` class. Audit: `scripts/audit_vs_embeds.py`.
- **Version sync** — on bump, update ALL 4 places (`src/VERSION` + `package.json` + `data/character_schema.json` manually; `parts/manifest.json` regenerates on build). KI#63 pitfall. KI#64 is the same pattern recurring.
- **New bugs:** first document in `STATUS.md` as `KI#<N>`, then fix.
- **Doc cap enforcement:** `STATUS.md` Known Issues ≤ 15 entries; `worklog.md` ≤ 10 entries; `CHANGELOG.md` latest 2–3 iterations in detail, older collapsed to one-line. Housekeeping trims happen in the same edit, not deferred.
