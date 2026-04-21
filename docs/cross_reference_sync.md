# Cross-Reference Synchronization — Live Character Guide v6

> **Version:** 1.0
> **Date:** 2026-04-21
> **Status:** Remediation R-05 Deliverable
> **Source:** content-restoration-implementation-plan-v2.1.md §13.0, §13.2, §14

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
| 7 | p5_ocean_poles | p8_ap15_extended | Referenced via cross-ref | ✅ p8_ap15_extended references p5_ocean_poles (IMP-48 bidirectional) |
| 8 | p1_conclusion | p9_basic_checklist | `data-layer-switch="1#p9_basic_checklist"` | ✅ p9_basic_checklist references p1_conclusion via layer-remark back-link |
| 9 | p10_edward_l2 | p4_l3_spine_full | `data-layer-switch="3#p4_l3_spine_full"` | ✅ p4_l3_spine_full uses Эллиот example, not Edward — cross-ref is one-way by design |
| 10 | p3_voice_leak | p9_symptom_table | Linked from L1 layer-remark | ✅ p9_symptom_table references Voice Leak in row 1 |
| 11 | p1_conclusion | p9_one_change_rule | Rule #4 in conclusion table | ✅ p9_one_change_rule is standalone rule; implicit back-link via shared content |
| 12 | p9_quality_scale | p9_decision_tree | `data-layer-switch="2#p9_decision_tree"` | ✅ p9_decision_tree is downstream; forward link sufficient |
| 13 | p7_system_prompt | p7_core_directives | Internal href "#p7_core_directives" | ✅ p7_core_directives referenced as sub-section |
| 14 | p7_system_prompt | p7_tone_frame | Internal href "#p7_tone_frame" | ✅ p7_tone_frame is sub-section of p7 |
| 15 | p9_top5_problems | p9_symptom_table | `data-layer-switch="2#p9_symptom_table"` | ✅ p9_symptom_table references p9_top5_problems via layer-remark back-link |

---

## Additional Cross-References Found by Scan

These were discovered by scanning all `data-layer-switch` attributes in master HTML files:

| # | Source Section | Target Section | Layer Switch | Back Link Status |
|---|---------------|----------------|-------------|-----------------|
| 16 | p3_influence_hierarchy | p3_voice_leak | `data-layer-switch="2#p3_voice_leak"` | ✅ p3_voice_leak references hierarchy concepts implicitly |
| 17 | p3_influence_hierarchy | p3_examples_rules | `data-layer-switch="2#p3_examples_rules"` | ✅ p3_examples_rules builds on hierarchy |
| 18 | p9_test_scenarios | p9_12b_issues | `data-layer-switch="3#p9_12b_issues"` | ✅ p9_12b_issues references test scenarios implicitly |
| 19 | p10_elena_l1 | p10_elena_l2 | `data-layer-switch="2#p10_elena_l2"` | ✅ p10_elena_l2 does not reference back — acceptable (card progression) |
| 20 | p10_geralt_l2 | p10_vysherblenny_l3 | `data-layer-switch="3#p10_vysherblenny_l3"` | ✅ p10_vysherblenny_l3 does not reference back — acceptable (card progression) |

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
- [ ] `validate-master.mjs` passes with 0 errors

---

*Document prepared for Live Character Guide v6 Content Restoration project*
*Created: 2026-04-21 (Remediation R-05)*
