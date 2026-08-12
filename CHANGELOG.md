# Changelog

> Only the latest iterations in detail. Older iterations = one-line summaries.
> Full history is in `git log`.
> Format: [Keep a Changelog](https://keepachangelog.com/).

## [9.2.6] — 2026-08-13

### iter 105 — Category C borderline translation pass: Quick/Full Check + Grade A/B/C tier labels translated

- **Translations applied** (2 master HTML files, 2 canon MD files, 1 audit script — all in sync):
  - `part_03.html` / `part_03.md`: `Grade A/B/C (✓/⚠/✗)` tier labels → `класс A/B/C (✓/⚠/✗)` — in list items, table headers, diff-view labels (`Grade C (плохо)` → `класс C (плохо)`, `Grade A (хорошо)` → `класс A (хорошо)`), and `<pre>` plain-copy block. `Quality Grade` compound kept as proper noun; intro line restructured: `Quality Grade A / B / C` → `Quality Grade (класс A / B / C)` to separate system name from tier labels.
  - `part_09.html` / `part_09.md`: `Quick Check` → `Быстрая проверка` (nominative) / `Быструю проверку` (accusative per Russian grammar context); `Full Check` → `Полная проверка`. Applied to `<h4>`/`<h5>` headings, `<summary>` labels, prose references (`Елена проходит Быструю проверку`, `см. Быструю проверку выше`, `отлична от универсальной Быстрой проверки`), and HTML comment canonical tag.
- **Translation policy decisions (documented for iter-106+):**
  - Q1 `Trigger → Action → Price` → KEEP English (all occurrences are format-notation, not pedagogical prose).
  - Q2 `Embodiment Protocol` quad (`State`/`Body`/`Sensor`/`Speech`) → KEEP English 4-tuple (matches protocol notation).
  - Q3 `SP` → KEEP Latin (glossary establishes `SP (системный промпт)`; `СП` would break convention).
  - Q4 `AP-N` → KEEP (matches section IDs, no drift risk).
  - Q5 `Quick Check` / `Full Check` → TRANSLATED.
  - Q6 `cautious zone` → KEEP as OCEAN jargon (already explained in prose).
  - Q9 `Grade A/B/C` tier labels → TRANSLATED to `класс A/B/C`; `Quality Grade` compound → KEEP as proper noun.
  - Q10 baseline leaks → LEAVE (by-design: Part 10 example card + Part 06 stair-step).
- **Audit script update:** `scripts/audit_canon_master_sync.py` — 6 check substrings updated (P0-12 part_09 Vysh heading, P2-12a/b/d/e part_03 Quality Grade + table headers + diff-labels). Descriptions amended with iter-105 notes. 97/97 PASS maintained.
- **Validation:** `pnpm run build` SUCCESS (hash 8499b4e3). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. CSP/bundle/doc-versions/VS-embeds all PASS.
- **English leak baseline:** 18 → 17 (-1). Cumulative iter-104+105: 21 → 17 (-4). Remaining 17 are by-design (Part 10 Elena example card content + Part 06 stair-step format).
- **Scope:** 5 source files (2 master HTML + 2 canon MD + 1 audit script) + 4 auto-regenerated root fallbacks via `pnpm run build`. Within 3–5 file soft limit.
- **KI#65 DELETED** from STATUS.md (closed iter-102, now 2 iterations old — mandatory deletion per AGENTS.md §3 KI lifecycle rule). KI#64 still OPEN (untouched).

### iter 104 — Category B translation pass: 4 clear English heading leaks translated

- **Translations applied** (4 master HTML files, 4 canon MD files, 1 audit script — all in sync):
  - `appendix_model_table.html` / `.md`: `<h2>Model Capability Table</h2>` → `<h2>Таблица возможностей моделей</h2>` (bilingual gloss already existed in HTML comment).
  - `part_03.html` / `.md`: `<h4>До/После: Grade A vs Grade C</h4>` → `<h4>До/После: класс A vs класс C</h4>` (`Grade` is a common noun here, not part of a proper name).
  - `part_06.html` / `.md`: `<h3>Tier 3 CoT (API only)</h3>` → `<h3>Tier 3 CoT (только API)</h3>` (parenthetical function-word leak).
  - `part_07a.html` / `.md`: `<h4>Шаг 6: Token Budget Check</h4>` → `<h4>Шаг 6: Проверка бюджета токенов</h4>` (`Check` here is a verb, not the noun `Token Budget`).
- **Section IDs preserved:** `appendix_model_table`, `p3_quality_grade`, `p6_cot_tier3`, `p7a_token_budget` — all unchanged. No inbound anchor breakage.
- **Audit script update:** `scripts/audit_canon_master_sync.py` P2-12c check substring updated — was hardcoded to the old English heading as an iter-37 regression marker; now checks for the translated Russian heading. 97/97 PASS maintained.
- **English leak baseline:** 21 → 18 (-3). The 3 removed leaks were the translated headings.
- **No KI opened or closed.** KI#64 still OPEN (untouched).

### iter 103 — English terms audit + categorization (doc-only)

- Surveyed all 14 master HTML files (~6,600 lines, 3 238 Latin-token instances). New script `scripts/survey_english_terms.py`. Categorized into A (KEEP ENGLISH ~1 440), B (TRANSLATE ~470), C (BORDERLINE ~640), D (HTML ARTIFACTS ~120). 3 new artifacts: audit report + companion JSON + re-runnable survey script. 3-iteration translation plan proposed. No source HTML changes.

### iter 102 — VS-EMBED placement audit + reorder (6 misplaced visual elements fixed)

- 6 misplaced VS-EMBEDs (E14, E06, E09, E08, E16, E02) moved inside their sections after intro `<p>`. 4 master HTML + 1 audit script + 3 doc files. KI#65 CLOSED. 97/97 PASS. Build PASS. 64/64 tests PASS.

### iter 101 — Agent infrastructure English rewrite + actualization

- New `AGENTS.md` (short LLM-friendly entry point). `AGENT_NAVIGATION.md`, `STATUS.md`, `worklog.md`, `PLAN.md` rewritten in English. `README.md` updated with `AGENTS.md` reference. KI#64 documented (mermaid-init.js version drift).

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
