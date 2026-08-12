# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-13
> **Iteration:** 103

---

## Current State

**iter 103 — English terms audit + categorization (no source HTML changes).**

User requested a comprehensive survey of all English words/terms in the guide that have
direct Russian equivalents, with feasibility assessment for translation. Survey covered
all 14 master HTML files (~6,600 lines, 3 238 Latin-token instances). Each token was
categorized into one of 4 buckets: A (KEEP ENGLISH — intentional anchors, ~1 440),
B (TRANSLATE — clear leaks, ~470), C (BORDERLINE — case-by-case, ~640), D (HTML
artifacts — false positives, ~120).

- **New artifacts:** `docs/research/english_terms_audit_iter103.md` (32KB analysis
  report, 10 sections) + `docs/research/english_terms_audit_iter103.json` (749KB
  companion data, all token instances with line numbers + context).
- **New script:** `scripts/survey_english_terms.py` — superset of `check_english.py`.
  Detects single English words (not just 3+ consecutive), categorizes, aggregates.
  Re-runnable for future iterations.
- **3-iteration plan proposed:** iter-104 (Category B clear leaks, 4 files, ~10 edits),
  iter-105 (Category C borderline standardization, 5–6 files, ~30 edits), iter-106
  (polish + canon sync). Total estimated effort: ~2 hours.
- **10 open questions for author** in audit report §9 — decisions on
  `Trigger → Action → Price` vs `триггер → действие → цена`, `Embodiment Protocol`
  quad translation, `SP` vs `СП`, `AP-1`...`AP-15` prose labels, `Quick Check`/
  `Full Check` labels, `cautious zone`, `Model Capability Table` heading,
  `Token Budget Check` heading, `Quality Grade A/B/C` label, baseline leak policy.
- **No KI opened or closed.** Doc-only iteration — no `pnpm run build`, no version
  bump, no source HTML touched.
- **Existing baseline confirmed:** `check_english.py` reports 21 leaks (was
  documented as 24 — 3-leak discrepancy is pre-existing, noted in iter 102 worklog).
  All 21 are by design (Tone Frame SP, Part 10 Elena card, Model Capability Table
  heading, Token Budget Check heading, Quality Grade label).

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
| KI#65 | Misplaced VS-EMBEDs: 6 visual elements (E14, E06, E09, E08, E16, E02) appeared BEFORE their introductory text, causing reader confusion. Found and fixed in same iteration. | CLOSED iter-102 | 2026-08-13 |

> **KI lifecycle:** open KIs are listed above. Closed KIs older than 2 iterations are deleted at the start of the next iteration touching `STATUS.md` (per `AGENTS.md` Bug → doc → fix rule).

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 103** | English terms audit + categorization (doc-only) | ✅ COMPLETE |
| iter 104 (proposed) | Category B translation pass — clear English leaks (4 files, ~10 edits) | pending author approval + answers to 10 open questions in audit §9 |
| iter 105 (proposed) | Category C borderline pass — bilingual-gloss standardization (5–6 files, ~30 edits) | pending iter 104 completion |
| iter 106 (proposed) | Polish pass — re-run audits, sync canon, update `KEEP_ENGLISH_TERMS` if needed | pending iter 105 completion |
| iter 107 (proposed) | Resolve KI#64 — version sync reconciliation | pending user decision |
| deferred | V8/V9 Decision items — pending author discussion | — |
