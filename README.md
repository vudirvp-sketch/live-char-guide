# Live Character Guide

> Engineering pipeline for RP character cards (SPINE → deploy, for 12B–32B+ models). Single linear guide.

- **Live site:** https://vudirvp-sketch.github.io/live-char-guide/
- **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
- **Status:** iter 101 COMPLETE — agent infrastructure English rewrite + actualization. See [`STATUS.md`](./STATUS.md).

---

## What this is

A guide for building character cards for AI role-playing (SillyTavern-compatible). It treats the card as a behavioral engine: SPINE (psychological skeleton) → Behavioral Anchors → Voice Isolation → System Prompt → finished card.

10 Parts + 4 Appendices + Part 0 (quick orientation) — a single sequential flow, not a wiki.

---

## Reading the repo

| If you are... | Start here |
|---------------|------------|
| An LLM agent (Cursor, Aider, Continue, etc.) | [`AGENTS.md`](./AGENTS.md) — short entry point |
| An agent needing the full reference | [`AGENT_NAVIGATION.md`](./AGENT_NAVIGATION.md) |
| A human contributor | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| Looking for current state | [`STATUS.md`](./STATUS.md) |
| Looking for the latest iteration | [`worklog.md`](./worklog.md) |

---

## Repository structure

| Directory | Purpose |
|-----------|---------|
| `src/master/` | Author content — 10 Parts + 3 appendix HTML. **Authors edit here.** |
| `src/shell/` | Infrastructure shell (`index.html`, `styles.css`, `lazy-loader.js`, `widgets/`). **Do NOT touch when writing Parts.** |
| `docs/canon/` | Canon markdown — source of truth for content (not in build). |
| `data/` | JSON widget data (glossary, ocean, enneagram, mbti, character_schema). |
| `scripts/` | Build + validation scripts. |
| `parts/`, `widgets/`, `assets/`, `index.html`, `event-bus.js`, `build.hash` | Root fallbacks — regenerated on every `pnpm run build`. **Do NOT edit directly.** |

---

## Commands

```bash
pnpm install              # Install dependencies (Node >= 20, pnpm 10.x)
pnpm run build            # Full build (unified + shell + root fallbacks)
pnpm run validate         # Validate build artifact
pnpm run validate:master  # Validate master files
pnpm run version:check    # 4-place version sync (MUST pass)
pnpm test                 # All tests
pnpm run qa               # Aggregate QA (csp + bundle + english + syntax + doc-versions)
pnpm run dev              # Build + serve on http://localhost:3000
```

---

## Build pipeline

```
src/master/*.html  (author content)
        ↓
scripts/build-unified.mjs   →   parts/*.html (unified) + manifest.json
        ↓
src/scripts/build-shell-unified.mjs   →   dist/  (deployed to GitHub Pages)
        ↓
root fallbacks (index.html, parts/, widgets/, assets/, data/)  — committed to git
```

Full diagram: [`AGENT_NAVIGATION.md`](./AGENT_NAVIGATION.md) §2.

---

## Documentation

- [`AGENTS.md`](./AGENTS.md) — short entry point for LLM agents. Read this first.
- [`AGENT_NAVIGATION.md`](./AGENT_NAVIGATION.md) — full reference for agents (directory map, build pipeline, section model, widget architecture, pitfalls, cross-references).
- [`STATUS.md`](./STATUS.md) — current status, Known Issues, Roadmap.
- [`worklog.md`](./worklog.md) — latest iteration in detail, previous iterations as one-line summaries.
- [`CHANGELOG.md`](./CHANGELOG.md) — version history.
- [`docs/canon/_README.md`](./docs/canon/_README.md) — Canon Spec (rules for canon files).
- [`docs/architecture.md`](./docs/architecture.md) — deep architecture (build stages, ownership, section model, validation).
- [`docs/components.md`](./docs/components.md) — CSS component registry (use ONLY classes defined here).
- [`docs/research/guide_analysis_consolidated.md`](./docs/research/guide_analysis_consolidated.md) — consolidated guide analysis from external sources.

---

## Contacts

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Author: TITAN FUSE Team
