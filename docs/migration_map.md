# Migration Map — Live Character Guide v5.12 → v6

> **Version:** 1.0
> **Last Updated:** 2026-04-19
> **Status:** Tracking Document

---

## Purpose

This document tracks where each v5.12 section migrates to v6. The **Zero Degradation Principle** (§0.4) requires 100% content coverage. Every section must have a destination.

---

## Migration Status

| v5.12 File | v6 Part | Status | Notes |
|------------|---------|--------|-------|
| `parts-l1/01_intro.html` | Part 1 | ✅ Ready | Basic intro |
| `parts-l1/02_quickstart.html` | Part 1 | ✅ Ready | L1 Quickstart |
| `parts-l1/03_core_blocks.html` | Part 2 | ✅ Ready | Anchors basics |
| `parts-l1/04_troubleshooting.html` | Part 9 | ✅ Ready | Basic troubleshooting |
| `parts-l1/05_glossary.html` | Glossary | ✅ Ready | Generated from JSON |
| `parts-l1/06_appendix.html` | Part 10 | ✅ Ready | Example cards |
| `parts-l2/01_intro.html` | Part 1 | ✅ Ready | Extended intro |
| `parts-l2/02_quickstart.html` | Part 1 | ✅ Ready | L2 Quickstart |
| `parts-l2/03_core_blocks.html` | Part 2 + Part 3 | ✅ Ready | Anchors + Voice |
| `parts-l2/04_spine.html` | Part 4 | ✅ Ready | SPINE framework |
| `parts-l2/05_technical.html` | Part 7 | ✅ Ready | Technical settings |
| `parts-l2/06_antipatterns.html` | Part 8 | ✅ Ready | Antipatterns |
| `parts-l2/07_testing.html` | Part 9 | ✅ Ready | Testing scenarios |
| `parts-l2/08_glossary.html` | Glossary | ✅ Ready | Extended glossary |
| `parts-l2/09_appendix.html` | Part 10 | ✅ Ready | Extended examples |
| `parts-l3/01_intro.html` | Part 1 | ✅ Ready | L3 intro |
| `parts-l3/02_quickstart.html` | Part 1 | ✅ Ready | L3 Quickstart |
| `parts-l3/03_core_blocks.html` | Part 2 + Part 3 | ✅ Ready | Advanced anchors |
| `parts-l3/04_spine.html` | Part 4 | ✅ Ready | Advanced SPINE |
| `parts-l3/05_ghost_layers.html` | Part 4 | ✅ Ready | GHOST Layers |
| `parts-l3/06_cot_tiers.html` | Part 6 | ✅ Ready | CoT tiers |
| `parts-l3/07_technical_advanced.html` | Part 7 | ✅ Ready | Advanced technical |
| `parts-l3/08_antipatterns_advanced.html` | Part 8 | ✅ Ready | Advanced antipatterns |
| `parts-l3/09_debugging_12b.html` | Part 9 | ✅ Ready | 12B debugging |
| `parts-l3/10_glossary.html` | Glossary | ✅ Ready | Full glossary |
| `parts-l3/11_appendix.html` | Part 10 | ✅ Ready | Full examples |

---

## Anchor Mapping (v5.12 → v6)

### Part 1: Basic Blocks

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `intro` | `p1_card_overview` | l1 | Definition of card |
| `what-is-card` | `p1_card_overview` | l1 | Merged into overview |
| `when-to-use` | `p1_card_overview` | l1 | Merged into overview |
| `quickstart` | `p1_quickstart` | l1 | L1 Quickstart template |
| `5-minute-template` | `p1_minimal_card` | l1 | Minimal template |
| `core_rules` | `p1_core_rules` | l1 | Moved from glossary to Part 1 |

### Part 2: Anchors

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `anchors` | `p2_basic_anchors` | l1 | Anchor definition |
| `anchor-format` | `p2_anchor_format` | l1 | T→A→P format |
| `trigger` | `p2_trigger` | l1 | Trigger definition |
| `action` | `p2_action` | l1 | Action definition |
| `price` | `p2_price` | l2 | Price definition |
| `embodiment` | `p2_embodiment` | l2 | Embodiment protocol |
| `flaw-anchors` | `p2_flaw_anchors` | l2 | FLAW-linked anchors |
| `sensory-anchors` | `p2_sensory_anchors` | l3 | Sensory anchors for GHOST |

### Part 3: Voice

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `voice-isolation` | `p3_voice_isolation` | l1 | Voice rule |
| `examples` | `p3_examples` | l1 | Examples definition |
| `greeting` | `p3_greeting` | l1 | Greeting structure |
| `voice-leak` | `p3_voice_leak` | l2 | Voice Leak antipattern |
| `tier-quality` | `p3_tier_quality` | l2 | Tier 1/2/3 criteria |
| `dialogue-markup` | `p3_dialogue_markup` | l2 | Systems A/B/C |
| `multi-char` | `p3_multi_char` | l2 | Walter+Jesse pair |
| `joker-case` | `p3_joker_case` | l2 | Extreme voice isolation |

### Part 4: SPINE

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `spine` | `p4_spine_overview` | l2 | SPINE framework |
| `want` | `p4_want` | l2 | WANT definition |
| `need` | `p4_need` | l2 | NEED definition |
| `flaw` | `p4_flaw` | l2 | FLAW definition |
| `lie` | `p4_lie` | l2 | LIE definition |
| `ghost` | `p4_ghost` | l2 | GHOST definition |
| `ghost-layers` | `p4_ghost_layers` | l3 | 3-tier GHOST |
| `spine-mapping` | `p4_spine_mapping` | l2 | SPINE → Anchors protocol |

### Part 5: Psychology Toolkit

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `ocean` | `p5_ocean_basics` | l2 | OCEAN tool |
| `ocean-poles` | `p5_ocean_poles` | l2 | Pole guidelines |
| `ocean-validator` | `p5_ocean_validator` | l2 | Interactive validator |
| `enneagram` | `p5_enneagram_basics` | l2 | Enneagram widget |
| `enneagram-types` | `p5_enneagram_types` | l2 | Types table |
| `enneagram-wings` | `p5_enneagram_wings` | l3 | Wing selection |
| `mbti` | `p5_mbti_basics` | l2 | MBTI filter grid |
| `cross-matrix` | `p5_cross_matrix` | l3 | OCEAN×Enneagram matrix |

### Part 6: CoT Tiers

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `cot-tiers` | `p6_cot_basics` | l2 | CoT overview |
| `cot-tier1` | `p6_cot_tier1` | l2 | Basic SP line |
| `cot-tier2` | `p6_cot_tier2` | l3 | Structured internal |
| `cot-tier3` | `p6_cot_tier3` | l3 | Full XML blocks |
| `cot-anchors` | `p6_cot_anchors` | l3 | Internal process anchors |

### Part 7: Technical

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `technical` | `p7_system_prompt` | l2 | Technical overview |
| `system-prompt` | `p7_system_prompt` | l2 | SP template |
| `authors-note` | `p7_authors_note` | l2 | AN template |
| `lorebook` | `p7_lorebook` | l2 | Lorebook rules |
| `format-lock` | `p7_format_lock` | l2 | Format Lock rule |
| `structured-inject` | `p7_structured_inject` | l2 | [NEW] XML-tag technique |
| `xml-tags` | `p7_xml_tags` | l3 | XML syntax |
| `api-blocks` | `p7_api_blocks` | l3 | Claude/GPT specifics |
| `4k-fallback` | `p7_4k_fallback` | l3 | [NEW] 4K context protocol |

### Part 8: Antipatterns

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `antipatterns` | `p8_antipatterns_overview` | l2 | Overview |
| `ap-token-bloat` | `p8_antipattern_bloat` | l2 | Token bloat |
| `ap-missing-price` | `p8_antipattern_price` | l2 | Missing price |
| `ap-voice-description` | `p8_antipattern_voice` | l2 | Voice in description |
| `ap-ghost-sp` | `p8_antipattern_ghost` | l2 | GHOST in SP |
| `ap-reppen-overdose` | `p8_antipattern_reppen` | l2 | RepPen issues |
| `ap-ocean-overload` | `p8_antipattern_ocean` | l2 | OCEAN 3+ poles |

### Part 9: Diagnostics

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `troubleshooting` | `p9_troubleshooting` | l1 | Top-3 issues |
| `decision-tree` | `p9_decision_tree` | l3 | Decision tree |
| `12b-issues` | `p9_12b_issues` | l3 | 12B-specific |
| `token-budget` | `p9_token_budget` | l2 | Token calculator |
| `layer-comparison` | `p9_layer_comparison` | l1 | L1 vs L2 vs L3 |

### Part 10: Examples

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `example-card` | `p10_elena_l1` | l1 | Elena minimal |
| `elena-full` | `p10_elena_l2` | l2 | Elena deep |
| `elena-expert` | `p10_elena_l3` | l3 | Elena expert |
| `geralt-card` | `p10_geralt_l2` | l2 | Geralt SPINE demo |
| `chipped-card` | `p10_vysherblenny_l3` | l3 | Выщербленный expert |

---

## Character Migration Notes

### Replacements (§0.7.2)

| v5.12 Character | v6 Replacement | Migration Action |
|-----------------|----------------|------------------|
| Paul Atreides | Edward Elric | REWRITE (Greeting → Geralt) |
| Shinji Ikari | Elliot Alderson | REWRITE (different GHOST structure) |
| "Макс" | Walter White + Jesse Pinkman | WRITE NEW (multi-char pair) |

---

## CSS Class Migrations

| v5.12 Class | v6 Class | Notes |
|-------------|----------|-------|
| `.callout.info` | `.callout.important` | BUG-4 fix |
| `.tag.warn` | `.tag.risk` | BUG-6 fix |

---

## data-layer-switch Format Updates

v5.12 format: `data-layer-switch="2"`
v6 format: `data-layer-switch="2#section-id"`

All existing `data-layer-switch` attributes must be updated to include the target section ID.

---

## English Text Fixes

| v5.12 Location | Issue | Fix |
|----------------|-------|-----|
| L2 anchors table | "Deception/Concealment" | → Russian |
| L3/08 | "Deception" header | → Russian |

---

## Bug Fix Tracking

| Bug ID | Fix Location | Status |
|--------|--------------|--------|
| BUG-1 | lazy-loader.js | ⏳ Stage 1.5 |
| BUG-2 | lazy-loader.js | ⏳ Stage 1.5 |
| BUG-3 | styles.css | ✅ Fixed in Stage 0a |
| BUG-4 | HTML migration | ⏳ During Part writing |
| BUG-5 | styles.css | ✅ Fixed in Stage 0a |
| BUG-6 | HTML migration | ⏳ During Part writing |
| BUG-7 | layer-config.json + UI | ✅ Fixed in Stage 0a |
| BUG-8 | workflow YAML | ✅ Already correct |
| BUG-9 | styles.css | ✅ Verified - no stray brace |
| BUG-10 | styles.css | ✅ Verified - correct |
| BUG-11 | enneagram.json | ✅ "Достигатель" canonical |

---

## Validation Checklist

After Stage 1 (all Parts written):

- [ ] Every v5.12 section mapped to a v6 Part
- [ ] No orphan sections (IMP-28)
- [ ] No duplicate content (IMP-5)
- [ ] All character examples match Character Bible
- [ ] All CSS class migrations applied
- [ ] All `data-layer-switch` format updated
- [ ] All English text in guide content fixed

---

*Document prepared for Live Character Guide v6 rebuild project*
