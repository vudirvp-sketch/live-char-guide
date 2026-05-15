# Cross-Reference Synchronization — Live Character Guide v8

> **Version:** 8.0.0
> **Date:** 2026-05-14
> **Status:** v8 Anchor-Only Cross-Reference Registry
> **Source:** content-restoration-implementation-plan-v2.1.md §13.0, §13.2, §14

---

> **⚠️ v8 Breaking Change — `data-layer-switch` Pairs Removed**
>
> In v8, the multi-layer system (`data-layer-switch` / `data-layer` attributes) has been
> removed entirely. All cross-reference pairs that relied on `data-layer-switch` for
> navigation have been deleted from this registry. Only anchor-based cross-references
> (`href="#..."`) are tracked going forward. Approximately 40 `data-layer-switch` pairs
> were removed; see git history for the v6/v7 version of this document if needed.

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

---

## Validation

- [x] Every forward link has a corresponding back link (✅ or acceptable)
- [x] No ❌ items remain
- [x] All `href` targets resolve to existing sections
- [x] No `data-layer-switch` references remain (removed in v8)

---

*Document prepared for Live Character Guide v8*
*Created: 2026-04-21 (Remediation R-05)*
*Updated: 2026-04-23 (Lorebook Enhancement — added pairs 16-21, fixed checklist and cross-refs)*
*Updated: 2026-04-24 (Terminology dedup: verified p5↔p8 cross-refs, added pairs 25-26)*
*Updated: 2026-04-27 (v6.2.3: actually implemented pairs #33-35 in master HTML, fixed validation errors)*
*Updated: 2026-05-14 (v8.0.0: removed all data-layer-switch pairs, applied section ID renames, anchor-only registry)*
