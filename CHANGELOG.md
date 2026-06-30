# Changelog

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

## [9.1.21] - 2026-06-24

### Added (iter 21 — KI#13 Part 3+4: inline styles → CSS classes)
- **`src/assets/vs-styles.css` SECTION 6 extended** — +49 строк (18 новых селекторов с `vs-ki13-*` prefix). Groups: (a) E07 Voice Hierarchy inset (1 селектор: `.vs-ki13-inset-text strong` — descendant selector для 2 `<strong>` elements), (b) E05 SPINE causal chain panel (4 селектора: spine-chain-panel, spine-chain-heading, spine-chain-text, spine-chain-text strong), (c) E06 GHOST Layers ring animation delays (10 селекторов: ring-delay-{0,200,400,500,600,650,700,750,800,850}), (d) E06 GHOST Layers ring label titles (3 селектора: ring-title--g3/g2/g1).
- **Phase 4 SVG integration analysis completed** — Canon migration (iter 7–18) already removed all major textual duplicates of VS-EMBEDs. 3 retained infographics (2 part_04 + 1 part_07b) — unique, intentional retention (iter 8 principle «viz > dry text»). Part 7B (0 VS-EMBED) identified as candidate for new VS element (E18+) in iter 23+, low priority, requires visual-system/elements/ prototyping first.

### Changed (iter 21 — KI#13 inline style migration)
- **`src/master/part_03.html` edited** — 2 inline `style=` attributes → CSS classes (0 remaining). E07 VS-EMBED Storage vs Influence inset: `<div class="inset-box__text">` → `<div class="inset-box__text vs-ki13-inset-text">`. 2 `<strong style="color:var(--text-primary);">` → `<strong>` (covered by descendant selector `.vs-ki13-inset-text strong`).
- **`src/master/part_04.html` edited** — 21 inline `style=` attributes → CSS classes (0 remaining). (i) E05 SPINE causal chain panel: 8 inline styles → 4 selectors (panel + heading + text + 5 strongs covered by descendant selector). (ii) E06 GHOST Layers SVG: 10 `transition-delay` inline styles → 10 `vs-ki13-ring-delay-*` classes (4 circles + 6 text elements, staggered animation choreography preserved). (iii) E06 GHOST Layers HTML ring labels: 3 color inline styles → 3 `vs-ki13-ring-title--g3/g2/g1` classes.

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 43 inline styles remaining в Part 5-10).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged — shell not modified, vs-styles.css propagated to dist/assets/ + root assets/).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone
**KI#13 progress:** 80/123 inline styles fixed (65%). Part 1+2+3+4 ✅ DONE. 43 remaining в Part 5-10. iter 22+: KI#13 Part 5+6 (6 inline styles).

---

## [9.1.20] - 2026-06-24

### Added (iter 20 — KI#13 Part 1+2: inline styles → CSS classes)
- **`src/assets/vs-styles.css` SECTION 6 added** — +137 строк «KI#13 Inline Style → CSS Class Migration». 28 новых CSS классов с `vs-ki13-*` prefix. Groups: (a) E01 Anchors subpanel (3 класса: anchor-header, anchor-title, anchor-desc), (b) E01 Token Budget Summary (12 классов: token-panel, token-heading, token-table, token-thead, token-th-left/right/source, token-tbody, token-row, token-td, token-td-right, token-td-source), (c) E03 flow-node accent borders (3 класса: flow-node--violet/cyan/amber), (d) E03 comparison (2 класса: compare-column--relative, arrow-dim), (e) E04 explanation panel (4 класса: funnel-panel, funnel-panel-heading, funnel-panel-text, funnel-panel-text strong).
- **SVG extracts audit completed** — All 17 elements (E01-E17) embedded in master HTML. All 17 extract styles consolidated in vs-styles.css. Scripts consolidated: vs-scroll-observer.js + 4 widget JS (vs-e10/e13/e15/e16). 0 orphans found.

### Changed (iter 20 — KI#13 inline style migration)
- **`src/master/part_01.html` edited** — 48 inline `style=` attributes → CSS classes (0 remaining). E01 VS-EMBED Anchors subpanel (3) + Token Budget Summary table (45 inline styles converted to 12 CSS classes with semantic markup).
- **`src/master/part_02.html` edited** — 9 inline `style=` attributes → CSS classes (0 remaining). E03 VS-EMBED flow-node accent borders (5) + E04 VS-EMBED explanation panel (4).

### Closed
- **KI#17 CLOSED** — Documentation drift (E07 vs E02 in Part 7A VS-EMBED list). Fixed in iter 10. LOW severity. Closed iter 20.

### Validation
- `pnpm run validate:master` ✅ PASSED (0 errors, 66 inline styles remaining в Part 3-10).
- `pnpm run build` ✅ SUCCESS (hash fd3d96d3, unchanged — shell not modified).
- `pnpm run validate` ✅ All 8 gates passed.
- `pnpm run test:unit` ✅ 43/43 pass.
- `pnpm run lint` ✅ 0 errors (13 warnings pre-existing).
- `pnpm run qa:csp` ✅ PASS (0 inline scripts).
- `pnpm run qa:bundle` ✅ PASS (7.2KB, max 500KB).
- `pnpm run qa:doc-versions` ✅ PASS.

### Milestone
**KI#13 progress:** 57/123 inline styles fixed (46%). Part 1+2 ✅ DONE. 66 remaining в Part 3-10. **KI#17 CLOSED.** Active KI: KI#13 (MEDIUM). iter 21+: KI#13 Part 3+4 + Phase 4 SVG integration.

---

## Previous iterations (compressed)

> Полная история — в `worklog.md` one-liners и git log. Ниже — краткая сводка для контекста.

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
