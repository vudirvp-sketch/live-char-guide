# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-15
> **Iteration:** 110

---

## Current State

**iter 110 — Multilingual forks A+B+C: layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size as new Model Table concepts.**

User approved with "делай как наиболее эффективно и качественно на выходе, мне не нужны костыли или мусор в тексте гайда" — entrusted fork decisions to author judgment. All 4 forks resolved: A+B+C implemented as text-only coherent iteration; D deferred.

- **Fork A — SP language rule softened (layered, not wishy-washy):** §7A.2 RULE was universal "директивы SP и CORE DIRECTIVES пишутся на английском". Now 3-tier: 12B <64K → English; ≥128K 12B–14B → English or card language; 32B+/API → card language preferred. Threshold rule: ≥128K vocab + native card-language support → use card language for entire SP. Mirrored to §7A.7 model checklist + footnote ¹, §9.10 12B guidance, §9.11 Quick Check item #8 (renamed "Директивы на английском" → "Язык SP"), glossary CORE DIRECTIVES entry, AGENT_NAVIGATION §5 + §6 pitfall #4.
- **Fork B — Identity Block name-language rule formalized:** §7A.1 new RULE — character name preserves canonical form (Cyrillic/Latin/CJK) across all card blocks (Identity Block, `<identity>` Description XML, Greeting, Examples). Transliteration forbidden — model processes name as token-anchor, not instruction. Latin variant allowed only if documented as canonical (e.g., `Omnis-Zeta`). Mirrored to glossary Identity Block entry.
- **Fork C — Script Tax + Vocabulary Size integrated into Model Table:** added 2 new rows to Appendix B Model Capability Table — `Vocabulary Size` (32K/128K/100K+ by model class) and `Script Tax (non-Latin)` (high on 32K vocab, low on ≥128K/API). Added new RULE in §7A.12 Token Budget — Script Tax note: Cyrillic ~1.5–2× Latin on 12B 32K vocab, ~1× on ≥128K; threshold ≥128K → Script Tax negligible. NOT a separate "Multilingual scenarios" section (avoids scope creep / redundancy).
- **Fork D — DEFERRED:** iter-113 (voice hierarchy + sampling + persona widget) touches JS infrastructure. Risk > reward vs text-based forks. Documented in roadmap as deferred.
- **Files edited (9 source + 8 auto-regenerated):** 4 canon MD (`part_07a.md`, `part_09.md`, `appendix_model_table.md`, `appendix_glossary.md`) + 4 master HTML (same 4 names) + `AGENT_NAVIGATION.md`. Auto-regenerated via `pnpm run build`: 4 `parts/*.html` + `index.html` + `build.hash`.
- **Validation:** `pnpm run build` SUCCESS (hash 8499b4e3 unchanged — no shell/widget changes). `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` / `qa:bundle` / `qa:contrast` / `qa:doc-versions` PASS.
- **English leak baseline:** 19 → 19 (no regression). Verified via `git stash` + re-run on baseline. All new prose in Russian; only established tech terms kept (12B, 32B+, API, SP, SPINE, Latin, Cyrillic, CJK, Llama, Qwen, Mistral, Gemma, Claude, GPT, Gemini).
- **qa:syntax pre-existing FAIL:** 247 patterns in 11 files — pre-existing baseline (verified via `git stash` + re-run). NOT caused by iter-110.

---

## Invariants

- **Version sync:** Canonical = 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` + `mermaid-init.js` JSDoc.
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** Dynamic theme switching — diagrams re-render on toggle between dark and light.
- **Canon → master sync:** 97/97 PASS.
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).
- **CORE_DIRECTIVES numbering:** #6 = Consequence Driven, #7 = Pre-Generation Filter.
- **SP Language rule (iter 110):** Layered — 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language (§7A.2 RULE).
- **Identity name-language (iter 110):** Canonical form preserved across all card blocks — transliteration forbidden (§7A.1 RULE).
- **Script Tax (iter 110):** Non-Latin scripts cost ~1.5–2× tokens on 32K vocab; ≥128K → negligible (§7A.12 RULE).

Full invariants list: see `AGENT_NAVIGATION.md` §5 and §6.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| _(none — all KIs resolved)_ | — | — | — |

> **KI lifecycle:** No open KIs. Last closed: KI#65 (iter-108 — canon→master directive drift).

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 110** | Multilingual forks A+B+C — layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size + Token Budget Script Tax RULE | ✅ COMPLETE |
| iter 108 | Multilingual actualization (safe text-only pass) — removed ~15-20% empirical claims + KI#65 CLOSED | ✅ COMPLETE |
| iter 107 | Category B/C extended translation — cautious zone + Embodiment Protocol quad + KI#64 CLOSED | ✅ COMPLETE |
| deferred | Fork D (iter-113) — voice hierarchy + sampling + persona widget (JS infrastructure) | — |
