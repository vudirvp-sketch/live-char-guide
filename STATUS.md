# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-13
> **Iteration:** 105

---

## Current State

**iter 105 — Category C borderline translation pass: Quick/Full Check + Grade A/B/C tier labels translated.**

User approved with "пограничные случаи одобряю, переводи!" Translated the clearest Category C borderline cases across 2 master HTML files + 2 canon MD files. Kept compound proper nouns (`Quality Grade`, `SP`) and format-notation terms (`Trigger → Action → Price`) in English per established glossary convention.

- **Translations applied:**
  - `part_03.html` / `part_03.md`: `Grade A/B/C (✓/⚠/✗)` tier labels → `класс A/B/C (✓/⚠/✗)` — in list, table headers, diff-view labels, and `<pre>` block. `Quality Grade` compound kept as proper noun; separated from tier labels: `Quality Grade (класс A / B / C)`.
  - `part_09.html` / `part_09.md`: `Quick Check` → `Быстрая проверка` (nominative) / `Быструю проверку` (accusative per Russian grammar); `Full Check` → `Полная проверка`. Applied to headings, summary labels, prose references, and HTML comment canonical tag.
- **Audit script update:** `scripts/audit_canon_master_sync.py` — 6 check substrings updated (P0-12, P2-12a/b/d/e). 97/97 PASS maintained.
- **Translation policy decisions (documented for iter-106+):**
  - Q1 `Trigger → Action → Price` → KEEP English (all occurrences are format-notation).
  - Q2 `Embodiment Protocol` quad → KEEP English 4-tuple.
  - Q3 `SP` → KEEP Latin (glossary backs `SP (системный промпт)`).
  - Q4 `AP-N` → KEEP (matches section IDs).
  - Q5 `Quick Check` / `Full Check` → TRANSLATED.
  - Q6 `cautious zone` → KEEP as OCEAN jargon.
  - Q9 `Grade A/B/C` tier labels → TRANSLATED; `Quality Grade` compound → KEEP.
  - Q10 baseline leaks → LEAVE.
- **Build + validate + tests:** `pnpm run build` SUCCESS (hash 8499b4e3). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. CSP/bundle/doc-versions/VS-embeds all PASS.
- **English leak baseline:** 18 → 17 (-1). Cumulative iter-104+105: 21 → 17 (-4). Remaining 17 are by-design (Part 10 Elena example card + Part 06 stair-step format).
- **KI#65 DELETED** (closed iter-102, now 2 iterations old — mandatory deletion per AGENTS.md §3 KI lifecycle rule).
- **No KI opened or closed.** KI#64 still OPEN.

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

> **KI lifecycle:** open KIs are listed above. Closed KIs older than 2 iterations are deleted at the start of the next iteration touching `STATUS.md` (per `AGENTS.md` Bug → doc → fix rule). KI#65 (closed iter-102) deleted iter-105 per this rule.

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 105** | Category C borderline translation pass — Quick/Full Check + Grade A/B/C tier labels translated + canon sync + audit script update | ✅ COMPLETE |
| iter 106 (proposed) | Polish pass — re-run `survey_english_terms.py`, update `KEEP_ENGLISH_TERMS` whitelist if needed, final canon drift check | pending |
| iter 107 (proposed) | Resolve KI#64 — version sync reconciliation | pending user decision |
| deferred | V8/V9 Decision items — pending author discussion | — |
