# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-08-15
> **Iteration:** 111

---

## Current State

**iter 111 — Fork D (part 1/3): Voice Influence Hierarchy interactive widget + naming drift fix.**

First new widget since iter 89. `persona-voice-hierarchy` (16th widget) adds interactivity to the previously static §3.2 percentage table: model-tier toggle (12B / 32B+ / API), hover-sync between widget rows and source table, and Markdown export of voice_sources block. Found+fixed a naming drift in `docs/canon/part_07a.md` (referenced non-existent `p3_voice_hierarchy` ID → corrected to canonical `p3_influence_hierarchy`).

- **Widget architecture:** Combined design (model toggle + hover-sync + MD export) in one file `src/shell/widgets/persona-voice-hierarchy.js` (~290 lines). Follows established pattern: IIFE + `window.PersonaVoiceHierarchy = { init, destroy, exportMarkdown, generateMarkdown, get activeModel, get sources }` + `EventBus.whenReady(autoInit)` with 500 ms fallback. Dispatches `persona-voice-hierarchy://model-change` + `persona-voice-hierarchy://export` CustomEvents.
- **Data policy exception:** Widget data (6 sources × 3 models = 18 percentage values) is canon-embedded in JS, NOT in `data/*.json`. Rationale: these are canonical prose values from §3.2 table, not user-editable widget data. Exception documented in AGENT_NAVIGATION §4 + widget header JSDoc.
- **Naming drift fix:** `docs/canon/part_07a.md` frontmatter line 4 + body line 225 referenced `p3_voice_hierarchy` — never existed in any artifact. Canonical ID is `p3_influence_hierarchy` (verified via `docs/canon/part_03.md` §3.2 + `scripts/build-unified.mjs` line 182 + `parts/manifest.json`). Fixed both occurrences in same iteration per §3 rule (bug → doc → fix).
- **Files edited (7 source + 6 auto-regenerated):** NEW `src/shell/widgets/persona-voice-hierarchy.js` + `src/master/part_03.html` (widget container in `p3_influence_hierarchy`) + `src/shell/index.html` (script tag) + `src/shell/lazy-loader.js` (re-init block) + `src/shell/styles.css` (CSS for `.persona-voice-hierarchy-embed` + `.vh-*` classes + source-table column highlight) + `docs/canon/part_03.md` (`[INTERACTIVE WIDGET: ...]` marker) + `docs/canon/part_07a.md` (drift fix) + `tests/visual-parity.mjs` (selector list extended) + `AGENT_NAVIGATION.md` (widget count 15 → 16, table row, exception note). Auto-regenerated via `pnpm run build`: `parts/part_03.html` + `index.html` + `build.hash` + 3 root fallbacks.
- **Validation:** `pnpm run build` SUCCESS (hash 8499b4e3 → f70870c0 — first hash change since iter 96). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` / `qa:bundle` / `qa:doc-versions` PASS. `qa:english` 19 → 19 (no regression). `qa:syntax` 247 patterns / 11 files — pre-existing baseline.
- **Ad-hoc widget smoke test (not committed):** 20/20 PASS via Puppeteer + local HTTP server — verified widget container populated, default model 12B, source table annotated (6/6 rows), toggle buttons switch active model + table column, export dispatches event + copies MD + shows feedback, public API all exposed.

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
- **Widget count (iter 111):** 16 widgets in `src/shell/widgets/` (was 15). `persona-voice-hierarchy` is the 16th.

Full invariants list: see `AGENT_NAVIGATION.md` §5 and §6.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| _(none — all KIs resolved)_ | — | — | — |

> **KI lifecycle:** No open KIs. Last implicit: naming drift in `part_07a.md` (found + fixed same iteration iter-111 per §3 rule, no KI# assigned).

---

## Roadmap

| Iteration | Task | Status |
|-----------|------|--------|
| **iter 111** | Fork D (part 1/3) — Voice Influence Hierarchy interactive widget + naming drift fix | ✅ COMPLETE |
| iter 110 | Multilingual forks A+B+C — layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size + Token Budget Script Tax RULE | ✅ COMPLETE |
| iter 108 | Multilingual actualization (safe text-only pass) — removed ~15-20% empirical claims + KI#65 CLOSED | ✅ COMPLETE |
| iter 107 | Category B/C extended translation — cautious zone + Embodiment Protocol quad + KI#64 CLOSED | ✅ COMPLETE |
| deferred | Fork D (part 2/3) — iter-112 sampling widget (slider configurator for `p7a_sampling_params`, MEDIUM risk) | — |
| deferred | Fork D (part 3/3) — iter-113 persona widget (meaning TBD: new 3rd widget or extend persona-synthesis) | — |
