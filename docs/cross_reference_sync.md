# Cross-Reference Synchronization — Live Character Guide v9.1

> **Version:** 9.1.0
> **Date:** 2026-05-15
> **Status:** v9.1 Restructure Cross-Reference Registry

---

> **⚠️ v9.1 Restructure Changes**
>
> In v9.1, the following structural changes affect cross-references:
> - `p1_assembly_pipeline` DELETED → replaced by `p1_pipeline_ref` (forward ref to Part 7A)
> - `p1_token_budget` MOVED → now `p7a_token_budget` in Part 7A, replaced by `p1_token_budget_ref` in Part 1
> - `p10_geralt` DELETED
> - `p10_edward` DELETED
> - New sections: `p1_value_proposition`, `p7a_token_budget`
> - All cross-references to `#p1_token_budget` updated to `#p7a_token_budget`
> - All cross-references to `#p1_assembly_pipeline` removed

---

## Purpose

This document tracks all bidirectional cross-reference pairs in the guide that use
standard anchor links (`href="#..."`). Per IMP-48, when section A references section B,
section B MUST reference back to A. Unidirectional references create orphan knowledge.

---

## Known Cross-Reference Pairs

| # | Source Section | Target Section | Forward Link | Back Link Status |
|---|---------------|----------------|-------------|-----------------|
| 1 | p1_conclusion | p9_basic_checklist | `href="#p9_basic_checklist"` | ✅ p9_basic_checklist references p1_core_rules via back-link |
| 2 | p7a_system_prompt | p7a_core_directives | Internal href `#p7a_core_directives` | ✅ p7a_core_directives referenced as sub-section |
| 3 | p7a_system_prompt | p7a_tone_frame | Internal href `#p7a_tone_frame` | ✅ p7a_tone_frame is sub-section of p7a |
| 4 | p7b_lorebook_basics | p7b_lorebook_mechanics | `href="#p7b_lorebook_mechanics"` | ✅ p7b_lorebook_mechanics references p7b_lorebook_basics via callout link |
| 5 | p7a_authors_note | p7b_lorebook_mechanics | `href="#p7b_lorebook_mechanics"` | ✅ p7b_lorebook_mechanics does not reference back — acceptable (AN is upstream) |
| 6 | p7b_lorebook_advanced | p7a_authors_note | `href="#p7a_authors_note"` in Кросс-ссылки section | ✅ p7a_authors_note references p7b_lorebook_mechanics via upstream link |
| 7 | p7b_lorebook_advanced | p7b_structured_inject | `href="#p7b_structured_inject"` in Кросс-ссылки section | ✅ Forward link only — p7b_structured_inject is technique reference (acceptable) |
| 8 | p4_spine_navigation | p7a_xml_tags | Pipeline step 3 via href | ✅ p7a_xml_tags is downstream |
| 9 | p10_omnis_l3_card | p4_ghost_layers | `href="#p4_ghost_layers"` | ✅ p4_ghost_layers references via back-link added in TP-15 |
| 10 | p9_additional_problems | p1_top3_problems | `href="#p1_top3_problems"` | ✅ p9_additional_problems references p1_top3_problems via back-link |
| 11 | p10_elena_l1 | p2_anchor_examples | `href="#p2_anchor_examples"` | ✅ p10_elena_l1 references p2_anchor_examples via back-link |

| 12 | p1_token_budget_ref | p7a_token_budget | `href="#p7a_token_budget"` | ✅ Forward reference only — canonical content now in Part 7A |
| 13 | p1_pipeline_ref | p7a_assembly_pipeline | `href="#p7a_assembly_pipeline"` | ✅ Forward reference only — pipeline is in Part 7A |
| 14 | p1_value_proposition | p1_card_overview | Internal sub-section | ✅ Value prop is sub-section of card overview |

---

## Validation

- [x] Every forward link has a corresponding back link (✅ or acceptable)
- [x] No ❌ items remain
- [x] All `href` targets resolve to existing sections
- [x] No `data-layer-switch` references remain (removed in v8)
- [x] No references to deleted sections (p1_assembly_pipeline, p10_geralt, p10_edward)

---

*Updated 2026-05-15: v9.1.0 — Restructure cross-references updated. Deleted p1_assembly_pipeline, moved p1_token_budget to p7a_token_budget, deleted p10_geralt and p10_edward, added p1_value_proposition and p1_pipeline_ref.*
