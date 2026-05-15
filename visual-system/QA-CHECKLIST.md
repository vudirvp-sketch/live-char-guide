# Visual System QA Checklist

**Version:** 1.2  
**Last updated:** 2026-05-16

## Per-Element Checks

For each element (E01–E17 + Hero), verify:

- [ ] All CSS variables reference `DESIGN-TOKENS.css` (no hardcoded colors)
- [ ] Font usage follows spec: Display for titles, Heading for labels, Body for descriptions, Mono for data
- [ ] Pattern class from `patterns.css` is used correctly
- [ ] Dark theme: backgrounds, borders, glows render correctly
- [ ] Scroll animations fire on IntersectionObserver enter, not on load
- [ ] `prefers-reduced-motion` disables animations, shows static final state
- [ ] Cross-reference links are present and correctly labeled
- [ ] Mini-map shows correct current element (including E16/E17)
- [ ] Responsive: element is usable at 768px and 1200px+
- [ ] All SVG text has `role="img"` and `<title>` for accessibility
- [ ] Interactive elements have ARIA labels and keyboard navigation
- [ ] Focus indicators visible (`:focus-visible` with `--accent-cyan`)
- [ ] Color contrast passes WCAG AA for all essential text (`--text-muted` on `--bg-deep` FAILS — do not use for essential info)
- [ ] No content overflows container
- [ ] Contradiction resolutions are visually clear
- [ ] Data in visualizations matches guide source material exactly (no fabricated numbers)
- [ ] SVG file size < 50 KB per element (100 KB max)
- [ ] Performance: 60fps on desktop, 30fps on mobile for all animations

## Element Status

| Element | File | Status | Notes |
|---------|------|--------|-------|
| Phase 0 | DESIGN-TOKENS.css, shared/*.css | ✅ Done | Foundation complete |
| Hero | hero/architecture-skeleton.html | ⬜ Pending | Phase 1 |
| E01 | E01-card-anatomy.html | ⬜ Pending | Phase 2A |
| E02 | E02-assembly-pipeline.html | ⬜ Pending | Phase 2A |
| E03 | E03-behavioral-anchor.html | ⬜ Pending | Phase 2A |
| E04 | E04-embodiment-protocol.html | ⬜ Pending | Phase 2A |
| E05 | E05-spine-framework.html | ⬜ Pending | Phase 2A |
| E06 | E06-ghost-layers.html | ⬜ Pending | Phase 2B |
| E07 | E07-voice-hierarchy.html | ⬜ Pending | Phase 2B |
| E08 | E08-core-directives.html | ⬜ Pending | Phase 2B |
| E09 | E09-ocean-pentagon.html | ⬜ Pending | Phase 2B |
| E10 | E10-enneagram-spine.html | ⬜ Pending | Phase 2B |
| E11 | E11-cot-tiers.html | ⬜ Pending | Phase 2C |
| E12 | E12-antipattern-catalog.html | ⬜ Pending | Phase 2C |
| E13 | E13-diagnostic-tree.html | ⬜ Pending | Phase 2C |
| E14 | E14-quality-scale.html | ⬜ Pending | Phase 2C |
| E15 | E15-annotated-blueprint.html | ⬜ Pending | Phase 2C |
| E16 | E16-author-note.html | ⬜ Pending | Phase 2D |
| E17 | E17-sampling-params.html | ⬜ Pending | Phase 2D |
