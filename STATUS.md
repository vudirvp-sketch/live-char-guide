# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-13
> **Iteration:** 101

---

## Current State

**iter 101 — Agent infrastructure English rewrite + actualization.**

All agent-facing documentation rewritten in English for consistent LLM consumption
(per the repo's own rule: "12B models follow English instructions ~15–20% more reliably").
Structure optimized for agent parsing: short paragraphs, imperative rules, lookup tables,
explicit cross-references.

- **New file:** `AGENTS.md` — short LLM entry point (de-facto standard filename for coding agents).
- **Rewritten in English:** `AGENT_NAVIGATION.md`, `STATUS.md`, `worklog.md`, `PLAN.md`.
- **Updated:** `CHANGELOG.md` (iter 101 entry), `README.md` (version sync + AGENTS.md pointer).
- **Version drift detected and documented as KI#64** (see Known Issues below).
- Scope: 7 files. Exceeds the 3–5 soft limit — justified by the user's explicit request
  to update "all agent infrastructure" in one pass.

---

## Invariants

- **Version sync:** Canonical = 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json`. ⚠️ `mermaid-init.js` JSDoc shows 9.3.0 — see KI#64.
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** Dynamic theme switching — diagrams re-render on toggle between dark and light.
- **Canon → master sync:** 97/97 PASS.
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).

Full invariants list: see `AGENT_NAVIGATION.md` §5 and §6.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| KI#64 | Version drift: `src/shell/widgets/mermaid-init.js` JSDoc bumped to `9.3.0` alone in iter 100; canonical sources (`package.json`, `src/VERSION`, `data/character_schema.json`) remain at `9.2.6`. Same pattern as KI#63. Resolution requires either (a) rollback `mermaid-init.js` JSDoc → `9.2.6`, or (b) 4-place bump to `9.3.0` (needs user confirmation per §2 — touching `package.json` version field). | OPEN | 2026-08-13 |

> **KI lifecycle:** open KIs are listed above. Closed KIs older than 2 iterations are deleted at the start of the next iteration touching `STATUS.md` (per `AGENTS.md` Bug → doc → fix rule).

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 101** | Agent infrastructure English rewrite + actualization | ✅ COMPLETE |
| iter 102 (proposed) | Resolve KI#64 — version sync reconciliation | pending user decision |
| deferred | V8/V9 Decision items — pending author discussion | — |
