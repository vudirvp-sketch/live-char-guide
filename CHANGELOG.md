# Changelog

## [9.1.25] - 2026-07-01

### Added (iter 25 — Phase 4 SVG integration: E18 Greeting Algorithm)
- **`visual-system/elements/E18-greeting-algorithm.html` created** (new VS element, ~280 строк) — E02-pattern 4-step pipeline (Sensory Anchor → Тело FLAW → Реплика → Крючок) with SVG arrows, scroll animations, mini-map nav with E18 active in «Продвинутые» group. Step 2 (Тело FLAW) uses `.pipeline-node__box--spine` (violet — SPINE connection). Each node has 3 content lines: `pipeline-node__label` (bold) + `pipeline-node__sublabel` (muted caption) + `pipeline-node__code` (NEW — concrete technique sequence in mono font on dark bg, same pattern as E11 `.stair-step__format`). Footer badges: E05 (SPINE), E04 (Embodiment), E03 (Behavioral Anchor).
- **`visual-system/integration/component-extracts/E18-{visual.html,styles.css,script.js}` created** (3 new files) — visual.html (pipeline-container + 4 nodes + 3 arrows), styles.css (only `.pipeline-node__code` + 4-node stagger delays — rest reuses E02 classes), script.js (IntersectionObserver, same as E02-script.js, mini-map keyboard nav removed per extract convention).
- **`src/assets/vs-styles.css` SECTION 5 extended** — header "Component Extracts E01–E17" → "E01–E18", +12 строк (E18 comment block + `.pipeline-node__code` style: font-family mono, font-size 11px, color text-secondary, line-height 1.5, background bg-deep, border-radius radius-sm, padding gap-sm gap-md, margin-top gap-xs, word-break break-word).
- **`visual-system/integration/INTEGRATION-MAP.md` updated** — +E18 row в mapping table (`E18 | E18-greeting-algorithm.html | part_07b.html | before <section id="p7b_greeting"> | CSS pipeline + SVG arrows (iter 25)`) + E18 extracts listed в structure tree.

### Changed (iter 25 — Master HTML Part 7B integration + Canon update)
- **`src/master/part_07b.html` edited** — textual `infographic inf-pipeline` block (lines 33–61 pre-iter-25) → VS-EMBED E18 (lines 28–110 iter 25). Migration principle «viz > dry text» applied — VS-EMBED = canonical visualization, textual infographic = simpler predecessor. Intro `<p>` updated: added reference to VS-EMBED E18. Sensory Anchor paragraph + Elena example `<details>` + rules h4+ul — retained (unique content). part_07b: 371 → 424 строк (+53).
- **`docs/canon/part_07b.md` edited** — front-matter (VS elements embedded: E18, Last synced: 2026-07-01 iter 25, Migration status + ✅ E18 integrated iter 25, line count 371 → 424). §7B.2 row 2 retention note updated (VS-EMBED E18 replaced textual infographic, iter 25). +iter 25 update section (E18 description) + validation gates (iter 25 — PASSED).
- **`assets/vs-styles.css`, `parts/part_07b.html`, `index.html` regenerated** — root fallbacks (build artifact — timestamp updated, hash unchanged).

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 0 inline styles, expected content-outside-section warnings — same as E02 in part_07a).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged — shell index.html not modified, part_07b changes propagated to dist/parts/ + root parts/).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone — Phase 4 SVG integration COMPLETE
**Phase 4 SVG integration — DONE.** Все 3 Phase 4 candidates analyzed (iter 21): Part 4 SPINE→Anchors + Part 4 Navigation pipeline — retained (unique, iter 8/18 retention confirmed). Part 7B Greeting algorithm — ✅ replaced с E18 (iter 25). Canon migration (iter 7–18) handled bulk of textual→VS-EMBED replacement. **VS elements registry: 18 (E01–E18).** Все planned work (Canon migration iter 7–18, KI#13 fix iter 20–24, Phase 4 SVG iter 25) — DONE. iter 26+ roadmap — empty. Все Known Issues (KI#1..KI#17) ✅ CLOSED. Active KI нет.

---

## [9.1.24] - 2026-07-01

### Added (iter 24 — KI#13 Part 9+10: inline styles → CSS classes, semantic grouping)
- **`src/assets/vs-styles.css` SECTION 6 extended** — +52 строки (19 новых селекторов с `vs-ki13-p9-*` и `vs-ki13-p10-*` sub-namespaces, consistent with iter 23 `vs-ki13-p7a-*`). Groups: (a) Part 9 E14 Quality Scale (6 селекторов): 1 indicator position `.vs-ki13-p9-indicator-mid` (bottom:50%, default mid-thermometer between "good" 50–85% and "excellent" 85–100% zones) + 4 zone-title color modifiers `.vs-ki13-p9-zone-title--{excellent/good/poor/critical}` (mirror parent `.zone-detail--{tier}` border-left-color: violet/cyan/amber/danger) + 1 quick-checks panel `.vs-ki13-p9-quick-checks` (max-width:700px + centered margin — overrides base which only has margin-top:lg); (b) Part 10 E15 Annotated Blueprint (13 селекторов): 1 shared base `.vs-ki13-p10-callout-pos` (right:20px, DRY pattern eliminating `right:20px` duplication across 11 callouts) + 11 per-instance top modifiers `.vs-ki13-p10-callout-pos--top-{10/20/100/120/130/250/260/280/290/380/390}` (position:absolute comes from base `.callout`, each modifier pins callout to y-coordinate matching its card block) + 1 card-block-accent `.vs-ki13-p10-card-block-accent` (border-left:2px solid violet + padding-left:gap-md — additive accent for Examples+Anchors combined block).

### Changed (iter 24 — KI#13 inline style migration)
- **`src/master/part_09.html` edited** — 6 inline `style=` attributes → 6 CSS classes (0 remaining). E14 Quality Scale: (i) thermometer indicator default `bottom:50%` → `.vs-ki13-p9-indicator-mid`, (ii) 4 zone-detail__title color overrides (violet/cyan/amber/danger for Отличный/Хороший/Слабый/Критический) → 4 zone-title color modifier classes, (iii) quick-checks panel `max-width:700px; margin:auto+xl` → `.vs-ki13-p9-quick-checks`.
- **`src/master/part_10.html` edited** — 12 inline `style=` attributes → 13 CSS classes (0 remaining). E15 Annotated Blueprint: (i) 11 callouts (4 structure + 2 anchors + 2 spine + 3 directives) `top:Npx; right:20px;` → shared `.vs-ki13-p10-callout-pos` base + per-instance `.vs-ki13-p10-callout-pos--top-N` modifier (DRY pattern), (ii) Examples+Anchors card-block `border-left:2px solid violet; padding-left:gap-md` → `.vs-ki13-p10-card-block-accent`.

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, **0 inline styles** — was 18).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged — shell not modified, vs-styles.css propagated to dist/assets/ + root assets/).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone — KI#13 CLOSED
**KI#13 progress:** 123/123 inline styles fixed (**100%**). Все 10 Parts ✅ DONE (Part 1-2 iter 20, Part 3-4 iter 21, Part 5-6 iter 22, Part 7A iter 23, Part 9-10 iter 24). **Все master HTML — 0 inline styles.** SECTION 6 vs-styles.css total: 60 селекторов (28+18+5+9+19). **KI#13 ✅ CLOSED.** Все Known Issues (KI#1..KI#17) ✅ CLOSED. Active KI нет. iter 25 (optional, low priority): Phase 4 SVG integration — Part 7B Greeting algorithm → new VS element E18 (requires `visual-system/elements/` prototyping first).

---

## [9.1.23] - 2026-06-30

### Added (iter 23 — KI#13 Part 7A: inline styles → CSS classes, semantic grouping)
- **`src/assets/vs-styles.css` SECTION 6 extended** — +33 строки (9 новых селекторов с `vs-ki13-p7a-*` sub-namespace). Groups: (a) 4 semantic color overrides `.vs-ki13-p7a-text-{violet/muted/danger/success}` — 10 применений across E16/E17/E02 (cells, labels, values), (b) 3 badge sizing/spacing `.vs-ki13-p7a-badge-meta` (font-size:10px) + `.vs-ki13-p7a-badge-indent` (margin-left:4px) + `.vs-ki13-p7a-badge-indent-top` (margin-top:4px) — 7 применений, (c) 1 state `.vs-ki13-p7a-template-hidden` (display:none — template-b initial state, JS toggle compatible via inline style assignment override), (d) 1 border `.vs-ki13-p7a-border-cyan` (pipeline-node__box accent).

### Changed (iter 23 — KI#13 inline style migration)
- **`src/master/part_07a.html` edited** — 19 inline `style=` attributes → 9 CSS classes (0 remaining). E16 Author's Note: 4→0 (badge font-size, template-b display:none, GHOST-activation label color, E06 badge font-size). E17 Sampling Parameters: 8→0 (param-row N/A muted, 4 checklist cell colors: danger/muted×2/violet/success×3). E02 Assembly Pipeline: 7→0 (SPINE label violet, badge margin-top, pipeline-node__box border-cyan, 4 cross-ref badges margin-left).

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 18 inline styles remaining в Part 9+10).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged — shell not modified, vs-styles.css propagated to dist/assets/ + root assets/).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone
**KI#13 progress:** 105/123 inline styles fixed (85%). Part 1-7A ✅ DONE. 18 remaining в Part 9+10 (Part 9: 6, Part 10: 12). Active KI: KI#13 (MEDIUM). iter 24: KI#13 Part 9 (6) + Part 10 (12) = 18 inline styles. Part 10 имеет 11 positional `top:Npx; right:20px;` styles — кандидат на generic class + per-instance modifier.

---

## Previous iterations (compressed)

> Полная история — в `worklog.md` one-liners и git log. Ниже — краткая сводка для контекста.

- **[9.1.22] (iter 22, 2026-06-30):** KI#13 Part 5+6 (6/123 inline styles → 5 CSS селекторов `vs-ki13-*` в vs-styles.css SECTION 6, +30 строк). part_05: 1→0 (`.vs-ki13-context-limits-note`), part_06: 5→0 (4 селектора для E11 CoT progression panel: `vs-ki13-cot-panel/heading/text/strong`). Total KI#13: 86/123 (70%). Build hash fd3d96d3 unchanged.
- **[9.1.21] (iter 21, 2026-06-24):** KI#13 Part 3+4 (23/123 inline styles → 18 CSS селекторов `vs-ki13-*` в vs-styles.css SECTION 6, +49 строк). part_03: 2→0, part_04: 21→0. Phase 4 SVG integration analysis complete (Canon migration уже удалил major duplicates; 3 retained infographics intentional; Part 7B candidate для iter 23+ optional). Build hash fd3d96d3 unchanged.

- **[9.1.20] (iter 20, 2026-06-24):** KI#13 Part 1+2 baseline (57/123 inline styles → 28 CSS classes `vs-ki13-*` в vs-styles.css SECTION 6). part_01: 48→0, part_02: 9→0. **KI#17 CLOSED.** SVG extracts audit (0 orphans, все 17 elements embedded). Build hash fd3d96d3.
- **[9.1.19] (iter 19, 2026-06-24):** KI#16 fix — `qa:csp` PASS. 2 inline `<script>` в `src/shell/index.html` → external widget JS (`js-flag.js` + `mermaid-init.js`). Build hash `df283246` → `fd3d96d3`. **KI#16 CLOSED.**
- **[9.1.18] (iter 18, 2026-06-24):** Final cleanup — Canon migration COMPLETE. 3 Appendix Canon files (`appendix_mbti.md` + `appendix_model_table.md` + `appendix_glossary.md`) created. `content_map.md` cleanup (277→256, -8%). `terminology_dictionary.md` cleanup (338→206, -39%). Все 10 Parts + 3 Appendix ✅ MIGRATED.
- **[9.1.16] (iter 16, 2026-06-24):** Canon Part 5+6+7B+10 created + 4 master HTML мигрированы. **Все 10 Parts мигрированы — Canon migration complete.**
- **[9.1.14] (iter 14, 2026-06-24):** Canon Part 1+2+3 created + 3 master HTML мигрированы (Part 1: -6.4%, Part 2: -6.3%, Part 3: 0%).
- **[9.1.13] (iter 13, 2026-06-24):** Canon Part 9 created + master HTML мигрирован (596→582, -2.3%).
- **[9.1.12] (iter 12, 2026-06-24):** Canon Part 8 created + master HTML мигрирован (521→507, -2.7%).
- **[9.1.11] (iter 11, 2026-06-24):** Part 7A master HTML migrated (1168→1137, -2.7%, 4 compression candidates).
- **[9.1.10] (iter 10, 2026-06-24):** Canon Part 7A created (802 строки, 13 H2 секций, 4 VS-маркера E08/E16/E17/E02). **KI#17 NEW** (documentation drift — fixed).
- **[9.1.9] (iter 9, 2026-06-24):** Validation pass Part 4. Все validation gates PASS. **KI#16 NEW** (qa:csp FAIL pre-existing с iter 5).
- **[9.1.8] (iter 8, 2026-06-23):** Pilot migration Part 4 (777→676, -13%, 4 dup viz удалены + 1 orphan paragraph, 2 unique infographic сохранены).
- **[9.1.7] (iter 7, 2026-06-23):** Canon scaffold + part_04.md pilot + KI#15 CLOSED (`docs/anchor-redirects.json` удалён).
- **[9.1.6] (iter 6, 2026-06-23):** `docs/CONTENT_RESTRUCTURE_PLAN.md` created (7 dup patterns + Canon strategy + iter 7..19 roadmap). **KI#14 NEW** (content duplication). **KI#15 NEW** (anchor-redirects stale dup).
- **[9.1.5] (iter 5, 2026-06-23):** KI#11 CLOSED (tokens.json). KI#12 partial (17 inline scripts → 5 widget JS modules). **KI#13 NEW** (123 inline styles + 23 outside).
- **[9.1.4] (iter 4, 2026-06-23):** KI#10 CLOSED. KI#11+#12 found (qa:* scripts wired). `docs/cross_reference_sync.md` merged into `AGENT_NAVIGATION.md` §9.
- **[9.1.3] (iter 3, 2026-06-23):** Orphan scripts cleanup + pitfalls expansion (KI#8+#9 closed).
- **[9.1.2] (iter 2, 2026-06-23):** KI#1..#6 closed, stale docs removed (`transition_guide.md` + `ap_reference_inventory.md` + `user_journeys.md`).
- **[9.1.1] (iter 1, 2026-06-23):** AGENT_NAVIGATION/STATUS/worklog/PLAN created. 6 KI identified.
- **[9.1.0] (2026-05-16):** v9.1.0 release. FIX-01..FIX-31. Restructured (split Part 7, moved MBTI, etc.). См. git log.
- **[9.0.0] (2026-05-15):** v9.0.0 release. Initial restructure.
