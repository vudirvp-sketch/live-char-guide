# Migration Map — Live Character Guide v5.12 → v6

> **Version:** 2.0
> **Last Updated:** 2026-04-20
> **Status:** Tracking Document (updated for actual v6 section IDs)

---

## Purpose

This document tracks where each v5.12 section migrates to v6. The **Zero Degradation Principle** (§0.4) requires 100% content coverage. Every section must have a destination.

---

## Migration Status

| v5.12 File | v6 Part | Status | Notes |
|------------|---------|--------|-------|
| `parts-l1/01_intro.html` | Part 1 | ✅ Migrated | Basic intro |
| `parts-l1/02_quickstart.html` | Part 1 | ✅ Migrated | L1 Quickstart |
| `parts-l1/03_core_blocks.html` | Part 2 | ✅ Migrated | Anchors basics |
| `parts-l1/04_troubleshooting.html` | Part 9 | ✅ Migrated | Basic troubleshooting |
| `parts-l1/05_glossary.html` | Glossary | ✅ Migrated | Generated from JSON |
| `parts-l1/06_appendix.html` | Part 10 | ✅ Migrated | Example cards |
| `parts-l2/01_intro.html` | Part 1 | ✅ Migrated | Extended intro |
| `parts-l2/02_quickstart.html` | Part 1 | ✅ Migrated | L2 Quickstart |
| `parts-l2/03_core_blocks.html` | Part 2 + Part 3 | ✅ Migrated | Anchors + Voice |
| `parts-l2/04_spine.html` | Part 4 | ✅ Migrated | SPINE framework |
| `parts-l2/05_technical.html` | Part 7 | ✅ Migrated | Technical settings |
| `parts-l2/06_antipatterns.html` | Part 8 | ✅ Migrated | Antipatterns |
| `parts-l2/07_testing.html` | Part 9 | ✅ Migrated | Testing scenarios |
| `parts-l2/08_glossary.html` | Glossary | ✅ Migrated | Extended glossary |
| `parts-l2/09_appendix.html` | Part 10 | ✅ Migrated | Extended examples |
| `parts-l3/01_intro.html` | Part 1 | ✅ Migrated | L3 intro |
| `parts-l3/02_quickstart.html` | Part 1 | ✅ Migrated | L3 Quickstart |
| `parts-l3/03_core_blocks.html` | Part 2 + Part 3 | ✅ Migrated | Advanced anchors |
| `parts-l3/04_spine.html` | Part 4 | ✅ Migrated | Advanced SPINE |
| `parts-l3/05_ghost_layers.html` | Part 4 | ✅ Migrated | GHOST Layers |
| `parts-l3/06_cot_tiers.html` | Part 6 | ✅ Migrated | CoT tiers |
| `parts-l3/07_technical_advanced.html` | Part 7 | ✅ Migrated | Advanced technical |
| `parts-l3/08_antipatterns_advanced.html` | Part 8 | ✅ Migrated | Advanced antipatterns |
| `parts-l3/09_debugging_12b.html` | Part 9 | ✅ Migrated | 12B debugging |
| `parts-l3/10_glossary.html` | Glossary | ✅ Migrated | Full glossary |
| `parts-l3/11_appendix.html` | Part 10 | ✅ Migrated | Full examples |

---

## Anchor Mapping (v5.12 → v6)

### Part 1: Basic Blocks

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `intro` | `p1_card_overview` | l1 | Definition of card |
| `what-is-card` | `p1_card_overview` | l1 | Merged into overview |
| `when-to-use` | `p1_card_overview` | l1 | Merged into overview |
| `quickstart` | `p1_l1_quickstart` | l1 | L1 Quickstart template |
| `5-minute-template` | `p1_elena_minimal` | l1 | Minimal Elena card template |
| `core_rules` | `p1_core_rules` | l1 | Moved from glossary to Part 1 |
| — | `p1_layer_comparison` | l1 | Layer comparison table (from Part 9 layer-comparison) |
| — | `p1_top3_problems` | l1 | Top-3 L1 problems (quick fixes) |

### Part 2: Behavioral Anchors

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `anchors` | `p2_basic_anchors` | l1 | Anchor definition + format (T→A→P) |
| `anchor-format` | `p2_anchor_rules` | l1 | T→A→P format merged into anchor rules |
| `trigger` | `p2_basic_anchors` | l1 | Trigger definition merged into basic anchors |
| `action` | `p2_basic_anchors` | l1 | Action definition merged into basic anchors |
| `price` | `p2_anchor_rules` | l1 | Price definition merged into anchor rules |
| — | `p2_anchor_examples` | l1 | Anchor examples table by triggers |
| `embodiment` | `p2_embodiment` | l2 | Embodiment protocol (full treatment) |
| `flaw-anchors` | `p2_flaw_anchors` | l2 | FLAW-linked anchors |
| `sensory-anchors` | `p2_sensory_anchors` | l3 | Sensory anchors for GHOST |
| — | `p2_cot_anchors` | l3 | CoT anchors (advanced format) |

### Part 3: Voice and Isolation

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `voice-isolation` | `p3_voice_isolation` | l1 | Voice rule |
| — | `p3_influence_hierarchy` | l1 | Voice influence hierarchy (split from voice isolation) |
| `examples` | `p3_examples_rules` | l2 | Examples rules + writing rules |
| `greeting` | `p3_greeting` | l2 | Greeting structure (Scene→Action→Line) |
| `voice-leak` | `p3_voice_leak` | l2 | Voice Leak antipattern |
| `tier-quality` | `p3_tier_quality` | l2 | Tier 1/2/3 criteria |
| `joker-case` | `p3_joker_case` | l2 | Extreme voice isolation |
| `dialogue-markup` | `p7_format_lock` | l2 | Dialogue markup systems A/B/C moved to Part 7 Format Lock section |
| `multi-char` | `p8_ap11_voice_bleed` | l2 | Multi-char voice bleed handled as AP-11 in Part 8 |

### Part 4: SPINE Framework

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `spine` | `p4_spine_overview` | l2 | SPINE framework overview |
| `want` | `p4_want` | l2 | WANT definition |
| `need` | `p4_need` | l2 | NEED definition |
| `flaw` | `p4_flaw` | l2 | FLAW definition |
| `lie` | `p4_lie` | l2 | LIE definition |
| `ghost` | `p4_ghost` | l2 | GHOST definition |
| `ghost-layers` | `p4_ghost_layers` | l3 | 3-tier GHOST |
| `spine-mapping` | `p4_spine_mapping` | l2 | SPINE → Anchors protocol |
| — | `p4_spine_check` | l3 | SPINE chain validation (GHOST→LIE→FLAW→NEED→WANT) |

### Part 5: Psychological Toolkit

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `ocean` | `p5_ocean_basics` | l2 | OCEAN tool |
| `ocean-poles` | `p5_ocean_poles` | l2 | Pole guidelines |
| `ocean-validator` | `p5_ocean_validator` | l2 | Interactive validator |
| `enneagram` | `p5_enneagram_basics` | l2 | Enneagram widget + types table (merged) |
| `enneagram-types` | `p5_enneagram_basics` | l2 | Types table merged into enneagram basics |
| — | `p5_enneagram_widget` | l2 | Enneagram interactive SVG (split from basics) |
| — | `p5_enneagram_to_spine` | l2 | 7-step algorithm: Enneagram → OCEAN → Anchors |
| `enneagram-wings` | `p5_enneagram_wings` | l3 | Wing selection algorithm [NEW] |
| `mbti` | `p5_mbti_basics` | l2 | MBTI filter grid |
| `cross-matrix` | `p5_cross_matrix` | l3 | OCEAN×Enneagram matrix (deduplicated from L3/03+L3/08) |

### Part 6: CoT and Internal Process

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `cot-tiers` | `p6_cot_basics` | l2 | CoT overview + Tier 0/1 (merged) |
| `cot-tier1` | `p6_cot_tiers` | l2 | Tier definitions (0/1/2/3) |
| `cot-tier2` | `p6_cot_tier2` | l3 | Structured internal process |
| `cot-tier3` | `p6_cot_tier3` | l3 | Full XML blocks |
| `cot-anchors` | `p6_cot_anchors` | l3 | Internal process anchors |

### Part 7: Technical Parameters

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `technical` | `p7_system_prompt` | l2 | Technical overview + SP template |
| `system-prompt` | `p7_system_prompt` | l2 | SP template (merged into overview) |
| `authors-note` | `p7_authors_note` | l2 | AN template |
| `lorebook` | `p7_lorebook` | l2 | Lorebook rules |
| `format-lock` | `p7_format_lock` | l2 | Format Lock rule + dialogue markup systems A/B/C |
| `structured-inject` | `p7_structured_inject` | l2 | [NEW] XML-tag technique in AN |
| `xml-tags` | `p7_xml_tags` | l3 | XML syntax for Description |
| `api-blocks` | `p7_api_blocks` | l3 | Claude/GPT specifics |
| `4k-fallback` | `p7_4k_fallback` | l3 | [NEW] 4K context protocol (expanded from 4-line stub) |

### Part 8: Anti-patterns

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `antipatterns` | `p8_antipatterns_overview` | l2 | Overview |
| `ap-token-bloat` | `p8_ap1_token_bloat` | l2 | Token bloat (AP-1) |
| `ap-missing-price` | `p8_ap2_missing_price` | l2 | Missing price (AP-2) |
| `ap-voice-description` | `p8_ap3_voice_in_description` | l2 | Voice in description (AP-3) |
| `ap-ghost-sp` | `p8_ap4_ghost_in_sp` | l2 | GHOST in SP (AP-4) |
| `ap-reppen-overdose` | `p8_ap5_reppen_high` | l2 | RepPen issues (AP-5) |
| — | `p8_ap6_no_anti_godmoding` | l2 | No anti-godmoding (AP-6) |
| — | `p8_ap7_presence_penalty` | l2 | Presence Penalty > 0 (AP-7) |
| — | `p8_ap8_ghost_no_anchors` | l3 | GHOST without anchors (AP-8) |
| — | `p8_ap9_spine_broken` | l3 | Broken SPINE (AP-9) |
| — | `p8_ap10_cot_overload` | l3 | CoT overload (AP-10) |
| — | `p8_ap11_voice_bleed` | l3 | Multi-char voice bleed (AP-11, Walter+Jesse) — L3 per master HTML |
| — | `p8_ap12_xml_malformed` | l3 | XML malformed (AP-12) |
| — | `p8_ap13_lorebook_conflict` | l3 | Lorebook conflict (AP-13) |
| — | `p8_ap14_context_violation` | l3 | Context window violation (AP-14) |
| `ap-ocean-overload` | `p8_ap15_basic` | l2 | OCEAN overload basic (AP-15, L2 section) |
| — | _(not yet created)_ | l3 | AP-15 extended treatment planned per §0.19 but not yet separate section |

### Part 9: Diagnostics and Debugging

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `troubleshooting` | `p9_troubleshooting` | l1 | Top-3 issues |
| — | `p9_basic_checklist` | l1 | Basic checklist (SP→Description→Examples→Greeting→Parameters) |
| — | `p9_top5_problems` | l1 | Top-5 L1 problems |
| `token-budget` | `p9_symptom_table` | l2 | Symptom table (10 rows, includes token budget issues) |
| — | `p9_test_scenarios` | l2 | 6 test scenarios from test_scenarios.json |
| `decision-tree` | `p9_12b_issues` | l3 | 12B-14B specifics + decision logic |
| `layer-comparison` | `p1_layer_comparison` | l1 | Moved to Part 1 (layer comparison table is entry-point content) |
| — | `p9_layer_transition` | l3 | Layer transition criteria ("you're ready for L2 when…") |

### Part 10: Full Card Examples

| v5.12 Anchor | v6 data-section | Layer | Migration Notes |
|--------------|-----------------|-------|-----------------|
| `example-card` | `p10_elena_l1` | l1 | Elena minimal card (~580 tokens) |
| `elena-full` | `p10_elena_l2` | l2 | Elena deep card (~950 tokens) |
| `geralt-card` | `p10_geralt_l2` | l2 | Geralt SPINE demo |
| `chipped-card` | `p10_vysherblenny_l3` | l3 | Выщербленный expert card (~1500+ tokens) |
| `elena-expert` | _(no separate section)_ | — | No separate L3 Elena card; Part 10 uses partial card examples per plan §3.10 |

---

## Character Migration Notes

### Replacements (§0.7.2)

| v5.12 Character | v6 Replacement | Migration Action |
|-----------------|----------------|------------------|
| Paul Atreides | Edward Elric | REWRITE (Greeting → Geralt, SPINE walkthrough → Edward) |
| Shinji Ikari | Elliot Alderson | REWRITE (different GHOST structure, CoT-ideal character) |
| "Макс" | Walter White + Jesse Pinkman | WRITE NEW (multi-char pair, AP-11 voice bleed) |

---

## CSS Class Migrations

| v5.12 Class | v6 Class | Status | Notes |
|-------------|----------|--------|-------|
| `.callout.info` | `.callout.important` | ✅ Applied | BUG-4 fix — no .callout.info found in master HTML |
| `.tag.warn` | `.tag.risk` | ✅ Applied | BUG-6 fix — no .tag.warn found in master HTML |

---

## data-layer-switch Format Updates

v5.12 format: `data-layer-switch="2"`
v6 format: `data-layer-switch="2#section-id"`

All `data-layer-switch` attributes now use v6 format with target section ID.
Status: ✅ Complete — validate-migration.mjs confirms all 7 references use v6 format.

---

## English Text Fixes

| v5.12 Location | Issue | Fix | Status |
|----------------|-------|-----|--------|
| L2 anchors table | "Deception/Concealment" | → Russian | ✅ Fixed |
| L3/08 | "Deception" header | → Russian | ✅ Fixed |

---

## Bug Fix Tracking

| Bug ID | Fix Location | Status |
|--------|--------------|--------|
| BUG-1 | lazy-loader.js | ⏳ Stage 1.5 (initLayerSwitch implementation) |
| BUG-2 | lazy-loader.js | ⏳ Stage 1.5 (colors[maxIdx] fix) |
| BUG-3 | styles.css | ✅ Fixed in Stage 0a |
| BUG-4 | HTML migration | ✅ Verified — no .callout.info in master HTML |
| BUG-5 | styles.css | ✅ Fixed in Stage 0a |
| BUG-6 | HTML migration | ✅ Verified — no .tag.warn in master HTML |
| BUG-7 | layer-config.json + UI | ✅ Fixed in Stage 0a |
| BUG-8 | workflow YAML | ✅ Already correct |
| BUG-9 | styles.css | ✅ Verified — no stray brace |
| BUG-10 | styles.css | ✅ Verified — correct selector |
| BUG-11 | enneagram.json | ✅ "Достигатель" canonical |

---

## Validation Checklist

After Stage 4 (Layer Validation):

- [x] Every v5.12 section mapped to a v6 Part
- [x] All data-section IDs in migration_map match actual master HTML
- [x] No orphan sections (IMP-28 — checked by validate-master.mjs)
- [x] No duplicate content (IMP-5 — checked by validate-layers.mjs)
- [x] All character examples match Character Bible
- [x] All CSS class migrations applied (no .callout.info, no .tag.warn)
- [x] All `data-layer-switch` format updated to v6 format
- [x] All English text in guide content fixed
- [x] Bug fix tracking updated (BUG-4, BUG-6 verified)

---

*Document prepared for Live Character Guide v6 rebuild project*
*Updated 2026-04-20: synchronized with actual master HTML data-section IDs*
