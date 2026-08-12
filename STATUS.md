# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-13
> **Iteration:** 107

---

## Current State

**iter 107 — Category B/C extended translation pass + KI#64 CLOSED (mermaid-init.js rollback).**

User approved with "категорию A я бы не трогал, а вот B и С можно и перевести. насчет mermaid-init.js === делай как лучше." Translated additional Category B/C items previously marked KEEP in iter-105/106. Fixed KI#64 via Variant A (minimal intervention — rollback JSDoc to canonical 9.2.6).

- **KI#64 CLOSED (Variant A — rollback):** `src/shell/widgets/mermaid-init.js` JSDoc `@version 9.3.0` → `9.2.6`. Restored 4-place version sync without touching `package.json` / `src/VERSION` / `character_schema.json`. No 4-place bump required. Build hash unchanged (8499b4e3).
- **Translations applied (Category C revisited — previously KEEP, now TRANSLATED):**
  - `part_05.html` / `part_05.md`: `cautious zone` → `осторожная зона` (8 occurrences — heading, RULE body, RECOMMENDATION, table cells, Elena OCEAN breakdown). English gloss `cautious zone` kept in parens on first mention (heading) per bilingual convention.
  - `part_02.html` / `part_02.md`: Embodiment Protocol quad `State → Body → Sensor → Speech` → `Состояние → Тело → Сенсор → Речь` — VS-EMBED E04 funnel-bar labels (4 `funnel-bar__name` divs) + canonical comment + prose reference + flow-node desc. English quad kept in parens on first mention for backward-compat with existing references.
- **Audit script update:** `scripts/audit_canon_master_sync.py` P2-14 check substring updated (cautious zone → осторожная зона, English gloss in parens). 97/97 PASS maintained.
- **Build + validate + tests:** `pnpm run build` SUCCESS (hash 8499b4e3). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. CSP/bundle/doc-versions/VS-embeds all PASS.
- **English leak baseline:** 17 → 17 (no change — `cautious zone` + `State/Body/Sensor/Speech` were not 3+ word leaks per `check_english.py`, they were single tokens below the detector threshold). Translation improves consistency, not leak count.
- **Category A untouched** per user directive. CORE DIRECTIVES, callout labels, XML tag names, SillyTavern field names, sampler params, acronyms — all remain English by design.
- **No KI opened.** KI#64 CLOSED iter-107.

---

## Invariants

- **Version sync:** Canonical = 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` + `mermaid-init.js` JSDoc (KI#64 CLOSED iter-107).
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
| _(none — all KIs resolved)_ | — | — | — |

> **KI lifecycle:** KI#64 (mermaid-init.js version drift, opened iter-101) CLOSED iter-107 via Variant A rollback (JSDoc 9.3.0 → 9.2.6). No open KIs remain.

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 107** | Category B/C extended translation pass — cautious zone → осторожная зона + Embodiment Protocol quad (State/Body/Sensor/Speech) → Состояние/Тело/Сенсор/Речь + KI#64 CLOSED (mermaid-init.js rollback) | ✅ COMPLETE |
| iter 106 | Category B final polish — 3 heading translations (Model Capability Table, Token Budget Check, Tier 3 CoT API only) + survey script categorization fix + translation backlog CLOSED | ✅ COMPLETE |
| iter 105 | Category C borderline translation pass — Quick/Full Check + Grade A/B/C tier labels translated + canon sync + audit script update | ✅ COMPLETE |
| deferred | V8/V9 Decision items — pending author discussion | — |
