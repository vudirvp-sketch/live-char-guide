# Changelog

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

## [9.1.22] - 2026-06-30

### Added (iter 22 — KI#13 Part 5+6: inline styles → CSS classes)
- **`src/assets/vs-styles.css` SECTION 6 extended** — +30 строк (5 новых селекторов с `vs-ki13-*` prefix). Groups: (a) E09 OCEAN Pentagon context-limits footnote (1 селектор: `.vs-ki13-context-limits-note` — Elena extreme example note inside `.context-limits-box__data`), (b) E11 CoT Tiers progression explanation panel (4 селектора: `vs-ki13-cot-panel` + `vs-ki13-cot-heading` (cyan accent — distinct от funnel-panel violet) + `vs-ki13-cot-text` + descendant `vs-ki13-cot-text strong`).

### Changed (iter 22 — KI#13 inline style migration)
- **`src/master/part_05.html` edited** — 1 inline `style=` attribute → CSS class (0 remaining). E09 OCEAN Pentagon context-limits box: `<span style="color:var(--text-muted); font-size:10px; margin-top:4px; display:block;">` → `<span class="vs-ki13-context-limits-note">`.
- **`src/master/part_06.html` edited** — 5 inline `style=` attributes → CSS classes (0 remaining). E11 CoT Tiers progression panel: (i) `<div class="panel" style="max-width:700px;...">` → `<div class="panel vs-ki13-cot-panel">`; (ii) heading div (cyan accent) → `.vs-ki13-cot-heading`; (iii) `<p style="font-size:13px;...">` → `<p class="vs-ki13-cot-text">`; (iv) 2 `<strong style="color:var(--text-primary);">` → `<strong>` (covered by descendant selector `.vs-ki13-cot-text strong`).

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 37 inline styles remaining в Part 7A+9+10).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged — shell not modified, vs-styles.css propagated to dist/assets/ + root assets/).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone
**KI#13 progress:** 86/123 inline styles fixed (70%). Part 1-6 ✅ DONE. 37 remaining в Part 7A+9+10 (Part 7A: 19, Part 9: 6, Part 10: 12). Active KI: KI#13 (MEDIUM). iter 23+: KI#13 Part 7A (19 inline styles → external CSS classes) — largest remaining batch.

---

## Previous iterations (compressed)

> Полная история — в `worklog.md` one-liners и git log. Ниже — краткая сводка для контекста.

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
