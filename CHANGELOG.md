# Changelog

> Only the latest iterations in detail. Older iterations = one-line summaries.
> Full history is in `git log`.
> Format: [Keep a Changelog](https://keepachangelog.com/).

## [9.2.6] — 2026-08-13

### iter 102 — VS-EMBED placement audit + reorder (6 misplaced visual elements fixed)

- **Survey:** All 14 master HTML files (~6,600 lines, 207 visual elements) audited for misplaced visual/interactive elements — cases where a visual (table, VS-EMBED, callout, infographic) appears BEFORE the introductory/explanatory text that should logically precede it. 4 parallel agents scanned every section; 6 misplaced VS-EMBEDs identified (1 HIGH + 5 MEDIUM confidence). 7 LOW-confidence "preamble" patterns left as-is (deliberate design — intro text explicitly references "показан выше").
- **`src/master/part_09.html`:** E14 (Quality Scale thermometer) moved from before `<h3>Шкала качества карточки</h3>` to after the intro `<p>`. Intro text updated: "показаны выше" → "показаны ниже"; "Ниже — конкретные паттерны" → "Затем — конкретные паттерны" (avoid repetition).
- **`src/master/part_04.html`:** E06 (GHOST Layers concentric rings) moved from before `<section p4_ghost_layers>` to after the Cross-ref `<p>` inside the section. E06 has no built-in explanation panel (unlike E05), so the reader previously saw G1/G2/G3 rings before learning what GHOST Layers means.
- **`src/master/part_05.html`:** E09 (OCEAN Pentagon + Context Limits) moved from before `<section p5_ocean_basics>` to after the Cautious zone `<p>` (after both RULE callouts). E09 uses "экстремум" 4 times in its context-limits box — previously appeared before the concept of extreme poles was defined.
- **`src/master/part_07a.html`:** E08 (CORE DIRECTIVES hub-spoke), E16 (Author's Note Mechanics), E02 (Assembly Pipeline 6-step) — all 3 moved from before their respective `<section>` tags to after their intro `<p>`s. E02's intro said "Ниже" (below) while the visual was above — now consistent.
- **`scripts/audit_canon_master_sync.py`:** P0-11 check substring updated ("показаны выше" → "показаны ниже") to match the reordered E14 text. Added iter 102 note to comment.
- **Validation:** `validate:master` 12/12 PASS. Canon sync 97/97 PASS. Build PASS (hash 8499b4e3). 64/64 tests PASS. Version sync OK (9.2.6). QA: no new syntax/English leaks. "Content outside section" warnings reduced 22 → 17.
- **KI#65 CLOSED** (found + fixed in same iteration). KI#64 still OPEN.

### iter 101 — Agent infrastructure English rewrite + actualization

- **New file: `AGENTS.md`** — short LLM-friendly entry point at repo root. Standard filename recognized by coding agents (Cursor, Aider, Continue, etc.). Covers project overview, iteration protocol, reading gradient by task scale, directory map, common commands, critical rules, git safety, stop-and-confirm list, output format, and doc pointers.
- **`AGENT_NAVIGATION.md` rewritten in English** — was Russian prose mixed with English anchors. Same 10-section structure preserved, but with cleaner tables, imperative mood, and better cross-referencing. Updated roadmap (§8) to include iter 97–101. Added KI#64 to §6 pitfall #8 (alongside KI#63). Fixed duplicated pitfall numbering (was two #22 entries).
- **`STATUS.md` rewritten in English** — fixed version drift (was `9.3.0`, canonical is `9.2.6`). Added KI#64 to Known Issues. Replaced prose with table format for Known Issues + Roadmap.
- **`worklog.md` rewritten in English** — added iter-101 entry with full Work Log + Stage Summary. Previous-iterations list pruned to 5 entries (within cap of 10).
- **`PLAN.md` rewritten in English** — actualized stop-point (§5) to iter 101. Preserved historical context (§1–4) as record of docs-restructure plan.
- **`README.md` updated** — added `AGENTS.md` reference. Confirmed canonical version `9.2.6`. Added pointer to `AGENTS.md` as "read first for agents".
- **KI#64 OPEN (not fixed):** version drift detected — `src/shell/widgets/mermaid-init.js` JSDoc shows `9.3.0` (bumped alone in iter 100), but canonical sources (`package.json`, `src/VERSION`, `data/character_schema.json`) remain at `9.2.6`. Same pattern as KI#63. Resolution requires either (a) rollback `mermaid-init.js` JSDoc → `9.2.6`, or (b) 4-place bump to `9.3.0` (needs user confirmation per `AGENTS.md` §"Stop and confirm" — touching `package.json` version field).
- **Scope note:** 7 files modified. Exceeds the 3–5 soft limit per iteration. Justified by user's explicit request to update "all agent infrastructure" in one pass — splitting across multiple iterations would break coherence (English rewrite must be atomic to avoid mixed-language state).

### iter 100 — Mermaid dynamic theme re-render on toggle

- **`widgets/mermaid-init.js`:** Added `window.reRenderMermaid(theme)` — re-initializes mermaid with appropriate theme config (`dark` for OLED, `default` for Light), restores original diagram source from `data-original` attribute, removes `data-processed`, and calls `mermaid.run()` to re-render all diagrams.
- **Light theme config:** `theme: 'default'` with light-appropriate `themeVariables` (light bg/text colors).
- **Dark theme config:** `theme: 'dark'` with existing OLED brand colors (unchanged).
- **`assets/lazy-loader.js`:** `applyTheme()` now calls `reRenderMermaid(theme)` after CSS class toggle. Safe no-op if function unavailable.
- **`lazy-loader.js`:** Before initial `mermaid.run()`, saves diagram source text to `data-original` attribute (enables future re-render without losing source).
- **`assets/shell-styles.css`:** Added `body.theme-light .mermaid` and `body.theme-light .concept-diagram` overrides (light border/background).
- **Mirror files synced** (`assets/` ↔ `src/shell/`).
- ⚠️ Side effect (documented as KI#64 in iter 101): JSDoc `@version` in `mermaid-init.js` was bumped to `9.3.0` alone, breaking 4-place version sync.

### iter 99 — Theme chain simplified

- `body.theme-oled` removed. Default = OLED/dark (no class). Only `theme-light` is toggled. Simplifies theme logic across CSS and JS.

### iter 98 — Dark theme removed

- Dark theme removed. Only OLED + Light remain. Reduces theme matrix from 3 → 2.

### iter 97 — Annotation callout blocks removal

- **Annotation callout blocks removed:** All 4 "Annotation: Карточка ... демонстрирует:" blocks (Elena §10.1, Walter §10.2, Omnis-Zeta §10.3, Vyshcherblenny §10.4) removed from canon, master HTML, and parts fallback. Per author request — text nobody reads.
- **Cross-ref line removed:** "Подробно о Lorebook → Part 7B. CoT Anchors → Part 6. GHOST Layers → Part 4." removed from all 3 Part 10 sources.
- **Audit script updated:** P2-18 positive checks → negative checks. 97/97 PASS.
- **Build regeneration:** Root fallbacks regenerated. Version sync ✓.

### iter 96 — KI#63 version drift fix

- KI#63 closed. All 4 version sources synced at 9.2.6. Root fallbacks regenerated.

### iter 95 — E2/KI#58 Dead weight cleanup + Anchors parts/ sync

- **E2 — Dead weight cleanup:** 5 unused characters removed from `docs/character_bible.md` (Geralt, Joker, Jesse Pinkman, Edward Elric, Elliot Alderson — 0 mentions in any Part). Tyler Durden → 🟡 Marginal (1 mention in Part 5). Lorebook Entry 2 (пожар Елены) → ⚠️ NON-CANONICAL secondary GHOST.
- **KI#58 — Anchors parts/ sync:** Omnis-Zeta + Vyshcherblenny `[ANCHORS]` plain text in `parts/part_10.html` → `<anchors>` XML canonical + bodily/mechanical Prices from `src/master/part_10.html`. All 4 cards now use `<anchors>` XML in parts/.

### iter 94 — E1/KI#60/KI#61/KI#62 Voice leak + Walter sync + audit fix

- **E1/KI#60 — Elena Voice leak fixed:** "саркастичная" removed from `<identity>` across all 3 layers (master, parts, canon). §9.11 Quick Check Voice row: ✗ FAIL → ✓ PASS.
- **KI#61 — Walter parts/ sync:** Tone Frame expanded, OOC PROTECTION + Format Lock + `<identity>` wrapper + OCEAN compact format + `<anchors>` XML + Annotation bullets synced.
- **KI#62 — Audit script fix:** `audit_canon_master_sync.py` P2-18 check updated to current merged Anchors format. 96/96 PASS.

### iter 93 — D1–D4 Guide self-contradictions

- **D1:** §9.11 Elena Voice check false claim fixed (✗ FAIL instead of ✓ PASS).
- **D2:** OCEAN format unified to compact `O:72 C:65 E:41 A:38 N:68` (no pipes/commas) across 12 locations.
- **D3:** Anchors format convention documented — `<anchors>` XML canonical in src/master/, `[ANCHORS]` plain text in parts/ = KI#58 drift.
- **D4:** CORE_DIRECTIVES shorthand `{{CORE_DIRECTIVES — ...}}` accepted as convention.

---

## Older Iterations (iter 1–92)

Brief. Full history: `git log` and `docs/research/`.

- **iter 89–92:** C1–C4 Bible sync (Walter/Omnis/Vyshcherblenny/Elena) + Walter GHOST Anchor-trigger + OCEAN cautious zones + Vyshcherblenny Examples expand + V3 Anchor Prices bodily.
- **iter 86–88:** B1–B4 Examples enrichment — all 4 cards Examples expanded to 80–120 tok per `<START>` block.
- **iter 83–85:** A5–A8 — Omnis-Zeta 5/7 Anchor Prices bodily; Vyshcherblenny GHOST → concrete event; All cards `<anchors>` XML + Tone Frames expand.
- **iter 82:** A2–A4 — Walter SP Tone Frame + OOC + `<identity>` wrapper + LIE fix.
- **iter 81:** A1 — Elena SP Tone Frame + OOC Protection.
- **iter 80:** Exploratory audit of examples (research-only): 4 universal violations, 26 card-specific, 20 Bible-vs-card discrepancies, 4 self-contradictions.
- **iter 1–79:** Docs restructure + canon scaffold + migration + VS elements + CSS scoping. Key milestones: iter 79 (Voice Isolation refinement), iter 78 (Anchors placement P7A-R16), iter 77 (OCEAN cautious zones), iter 76 (CoT Tier 0), iter 75 (P1 Fixes), iter 70–74 (Recon V1–V9).
