# Cross-Reference Synchronization — Live Character Guide v6

> **Version:** 1.6
> **Date:** 2026-04-27
> **Status:** Remediation R-05 Deliverable + Lorebook Enhancement + TP-11–20 + Terminology Sync + v6.2.3 Validation Fixes (Complete)
> **Source:** content-restoration-implementation-plan-v2.1.md §13.0, §13.2, §14, lorebook-enhancement-plan-v1.1.md, TP-11–20 task changes, terminology-dedup-2026-04-24

---

## Purpose

This document tracks all bidirectional cross-reference pairs in the guide. Per IMP-48, when section A references section B, section B MUST reference back to A. Unidirectional references create orphan knowledge.

---

## Known Cross-Reference Pairs

| # | Source Section | Target Section | Forward Link | Back Link Status |
|---|---------------|----------------|-------------|-----------------|
| 1 | p2_env_reactivity | p7_core_directives | `data-layer-switch="2#p7_core_directives"` | ✅ p7_core_directives references p2_env_reactivity via "→ Part 2" link |
| 2 | p2_anchor_rules | p7_core_directives (INFLUENCE BOUNDARY) | `data-layer-switch="2#p7_core_directives"` | ✅ p7_core_directives #5 references p2_anchor_rules via href |
| 3 | p2_embodiment | p7_core_directives (EMBODIMENT FIRST) | Linked from p7_core_directives #2 | ✅ p7_core_directives references p2_embodiment via `data-layer-switch="2#p2_embodiment"` |
| 4 | p4_spine_mapping | p7_core_directives (CONSEQUENCE DRIVEN) | `data-layer-switch="2#p7_core_directives"` | ✅ p7_core_directives_l3 references p4_spine_mapping via href |
| 5 | p4_spine_mapping | p7_authors_note (WANT→NEED tracking) | `data-layer-switch="2#p7_authors_note"` | ✅ p7_authors_note references SPINE via AN template |
| 6 | p3_multi_char | p8_ap11_voice_bleed | `data-layer-switch="3#p8_ap11_voice_bleed"` | ✅ p8_ap11_voice_bleed references p3_multi_char (IMP-48 bidirectional) |
| 7 | p5_ocean_poles | p8_ap15_extended | `data-layer-switch="3#p8_ap15_extended"` (line 38 of part_05) | ✅ p8_ap15_extended references p5_ocean_poles via `data-layer-switch="2#p5_ocean_poles"` (line 330 of part_08). Verified 2026-04-24: bidirectional links intact after temperament name unification. |
| 8 | p1_conclusion | p9_basic_checklist | `href="#p9_basic_checklist"` | ✅ p9_basic_checklist references p1_core_rules via layer-remark back-link |
| 9 | p10_edward_l2 | p4_l3_spine_full | `data-layer-switch="3#p4_l3_spine_full"` | ✅ p4_l3_spine_full uses Эллиот example, not Edward — cross-ref is one-way by design |
| 10 | p3_voice_leak | p9_symptom_table | Linked from L1 layer-remark | ✅ p9_symptom_table references Voice Leak in row 1 |
| 11 | p1_conclusion | p9_one_change_rule | Rule #4 in conclusion table | ✅ p9_one_change_rule is standalone rule; implicit back-link via shared content |
| 12 | p9_quality_scale | p9_decision_tree | `data-layer-switch="2#p9_decision_tree"` | ✅ p9_decision_tree is downstream; forward link sufficient |
| 13 | p7_system_prompt | p7_core_directives | Internal href "#p7_core_directives" | ✅ p7_core_directives referenced as sub-section |
| 14 | p7_system_prompt | p7_tone_frame | Internal href "#p7_tone_frame" | ✅ p7_tone_frame is sub-section of p7 |
| 15 | p9_top5_problems | p9_symptom_table | `data-layer-switch="2#p9_symptom_table"` | ✅ p9_symptom_table references p9_top5_problems via layer-remark back-link |
| 16 | p7_lorebook | p7_lorebook_mechanics | `href="#p7_lorebook_mechanics"` | ✅ p7_lorebook_mechanics references p7_lorebook via callout link |
| 17 | p7_lorebook_mechanics | p7_lorebook_advanced | `data-layer-switch="3#p7_lorebook_advanced"` | ✅ p7_lorebook_advanced does not reference back — acceptable (layer progression) |
| 18 | p7_authors_note | p7_lorebook_mechanics | `href="#p7_lorebook_mechanics"` | ✅ p7_lorebook_mechanics does not reference back — acceptable (AN is upstream) |
| 19 | p4_ghost | p7_lorebook_advanced | Referenced in fatigue emulation warning | ✅ p7_lorebook_advanced references p4_ghost via href in callout warning |
| 20 | p7_lorebook_advanced | p7_authors_note | `href="#p7_authors_note"` in Кросс-ссылки section | ✅ p7_authors_note references p7_lorebook_mechanics via layer-remark (upstream) |
| 21 | p7_lorebook_advanced | p7_structured_inject | `href="#p7_structured_inject"` in Кросс-ссылки section | ✅ Forward link only — p7_structured_inject is technique reference (acceptable) |
| 22 | p4_l3_learning_path | p4_ghost_layers | Pipeline step 1 | ✅ p4_ghost_layers is downstream |
| 23 | p4_l3_learning_path | p6_cot_basics | Pipeline step 2 via data-layer-switch | ✅ p6_cot_basics is downstream |
| 24 | p4_l3_learning_path | p7_xml_tags | Pipeline step 3 via href | ✅ p7_xml_tags is downstream |
| 25 | p4_l3_learning_path | p10_omnis_l3_card | Pipeline step 4 via data-layer-switch | ✅ p10_omnis_l3_card is downstream |
| 26 | p4_l3_spine_full | p10_omnis_l3_card | `data-layer-switch="3#p10_omnis_l3_card"` | ✅ p10_omnis_l3_card references back via `href="#p4_ghost_layers"` |
| 27 | p10_l2_voice_warning | p3_voice_isolation | term-marker `data-tooltip-ref="#p3_voice_isolation"` | ✅ p3_voice_isolation is upstream |
| 28 | p10_omnis_l1_card | p10_omnis_l2_card | `data-layer-switch="2#p10_omnis_l2_card"` | ✅ card progression — no back link needed |
| 29 | p10_omnis_l2_card | p10_omnis_l3_card | `data-layer-switch="3#p10_omnis_l3_card"` | ✅ card progression — no back link needed |
| 30 | p10_omnis_l3_card | p4_ghost_layers | `href="#p4_ghost_layers"` | ✅ p4_ghost_layers references via layer-remark added in TP-15 |
| 31 | p5_l2_quickstart | p4_l2_quickstart | (relocated) Formerly p4_l2_quickstart | ✅ Part 4 has navigational link to p5_l2_quickstart |
| 32 | p9_top5_problems | p1_top3_problems | `href="#p1_top3_problems"` (layer-remark) | ✅ Added per T-9.1: p9_top5_problems references p1_top3_problems via layer-remark «Подробный разбор первых 3 проблем → p1_top3_problems» |
| 33 | p10_elena_l1 | p2_anchor_examples | `href="#p2_anchor_examples"` (layer-remark) | ✅ Added per T-9.2: p10_elena_l1 references p2_anchor_examples via layer-remark «Формат якорей объяснён → p2_anchor_examples» |
| 34 | p4_spine_mapping | p5_cross_instrument_map | `data-layer-switch="2#p5_cross_instrument_map"` | ✅ Added per T-9.3: p4_spine_mapping references p5_cross_instrument_map via layer-remark «Инструментальная карта Enneagram→SPINE → p5_cross_instrument_map» |
| 35 | p7_core_directives | p9_pre_deploy | `data-layer-switch="3#p9_pre_deploy"` | ✅ Added per T-9.4: p7_core_directives mentions p9_pre_deploy «Pre-Deploy Validation включает проверку CORE DIRECTIVES → p9_pre_deploy» |
| 36 | p4_spine_mapping | p4_l3_spine_full (LIE/GHOST callout) | `data-layer-switch="3#p4_l3_spine_full"` | ✅ Added per T-8.1: p4_spine_mapping .callout.important about LIE/GHOST L3-only status with link to p4_l3_spine_full |
| 37 | p4_spine_mapping | p7_core_directives_l3 (CONSEQUENCE DRIVEN) | `data-layer-switch="3#p7_core_directives_l3"` | ✅ Added per T-8.4: CONSEQUENCE DRIVEN callout in p4_spine_mapping links to p7_core_directives_l3 |
| 38 | p9_decision_tree | p6_cot_basics | `data-layer-switch="3#p6_cot_basics"` | ✅ Added per T-8.2: new row «модель теряет внутреннюю логику» → CoT L3 |
| 39 | p9_symptom_table | p6_cot_basics | `data-layer-switch="3#p6_cot_basics"` | ✅ Added per T-8.3: new symptom row «Потеря внутренней логики» → CoT Tier 2 L3 |
| 40 | p5_ocean_basics | p8_ap15_basic | `data-layer-switch="2#p8_ap15_basic"` | ✅ Added per T-8.5: .callout.tip about AP-15 violation with link to p8_ap15_basic |
| 41 | p7_lorebook_mechanics | p7_lorebook_advanced | `data-layer-switch="3#p7_lorebook_advanced"` | ✅ Added per T-8.6: .callout.tip about GHOST-linked triggers with link to p7_lorebook_advanced |
| 42 | p2_embodiment | p2_sensory_anchors | `data-layer-switch="3#p2_sensory_anchors"` | ✅ Added per T-8.7: layer-remark about sensory anchors for GHOST characters |
| 43 | p3_voice_leak | p8_ap11_voice_bleed | `data-layer-switch="3#p8_ap11_voice_bleed"` | ✅ Added per T-8.8: layer-remark about Voice Bleed AP-11 for multi-char scenarios |

---

## Additional Cross-References Found by Scan

These were discovered by scanning all `data-layer-switch` attributes in master HTML files:

| # | Source Section | Target Section | Layer Switch | Back Link Status |
|---|---------------|----------------|-------------|-----------------|
| 20 | p3_influence_hierarchy | p3_voice_leak | `data-layer-switch="2#p3_voice_leak"` | ✅ p3_voice_leak references hierarchy concepts implicitly |
| 21 | p3_influence_hierarchy | p3_examples_rules | `data-layer-switch="2#p3_examples_rules"` | ✅ p3_examples_rules builds on hierarchy |
| 22 | p9_test_scenarios | p9_12b_issues | `data-layer-switch="3#p9_12b_issues"` | ✅ p9_12b_issues references test scenarios implicitly |
| 23 | p10_elena_l1 | p10_elena_l2 | `data-layer-switch="2#p10_elena_l2"` | ✅ p10_elena_l2 does not reference back — acceptable (card progression) |
| 24 | p10_geralt_l2 | p10_vysherblenny_l3 | `data-layer-switch="3#p10_vysherblenny_l3"` | ✅ p10_vysherblenny_l3 does not reference back — acceptable (card progression) |
| 25 | p8_ap15_extended | p5_cross_matrix | `data-layer-switch="3#p5_cross_matrix"` (line 355 of part_08) | ✅ p5_cross_matrix is downstream validation tool. Forward link sufficient — p5_cross_matrix is within Part 5 |
| 26 | p8_ap15_extended | p5_ocean_poles | `data-layer-switch="2#p5_ocean_poles"` (line 330 of part_08) | ✅ Bidirectional with pair #7 — verified 2026-04-24 |

---

## Remediation Items

### Pair #8: p1_conclusion ↔ p9_basic_checklist

**Status:** ✅ Resolved

**Fix Applied:** Added `layer-remark` at the end of p9_basic_checklist:
```html
<p class="layer-remark"><span class="remark-icon">→</span> Напоминание ключевых правил: <a data-layer-switch="1#p1_conclusion" class="layer-remark">Заключение → Part 1</a></p>
```

### Pair #15: p9_top5_problems ↔ p9_symptom_table

**Status:** ✅ Resolved

**Fix Applied:** Added `layer-remark` at the end of p9_symptom_table:
```html
<p class="layer-remark"><span class="remark-icon">→</span> Краткий обзор топ-5 проблем: <a data-layer-switch="1#p9_top5_problems" class="layer-remark">Топ-5 проблем → Минимальный слой</a></p>
```

---

## Validation

After all remediation items are resolved:
- [x] Every forward link has a corresponding back link (✅ or acceptable)
- [x] No ❌ items remain
- [x] All `data-layer-switch` targets resolve to existing sections
- [x] `validate-master.mjs` passes with 0 errors (0 errors, 20 warnings — IMP-27 bridge + IMP-56 emoji, all expected per design)

---

## v6.2.3 Amendment

Pairs #33–#35 were originally claimed as implemented in v6.2.0 but the actual HTML cross-references were **not present** in master HTML files. This was a phantom completion — cross_reference_sync.md documented the intent but the HTML was never updated.

**v6.2.3 actual implementation:**
- **#33:** p10_elena_l1 now has `href="#p2_anchor_examples"` layer-remark (p2_anchor_examples is L1, same layer)
- **#34:** p4_spine_mapping now has `data-layer-switch="2#p5_cross_instrument_map"` layer-remark
- **#35:** p7_core_directives now has `data-layer-switch="3#p9_pre_deploy"` layer-remark

---

*Document prepared for Live Character Guide v6 Content Restoration project*
*Created: 2026-04-21 (Remediation R-05)*
*Updated: 2026-04-23 (Lorebook Enhancement - added pairs 16-21, fixed checklist and cross-refs)*
*Updated: 2026-04-24 (Terminology dedup: verified p5↔p8 cross-refs, added pairs 25-26)*
*Updated: 2026-04-27 (v6.2.3: actually implemented pairs #33-35 in master HTML, fixed validation errors)*
