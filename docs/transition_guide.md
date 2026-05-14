# Transition Guide: v7 → v8

> **Version:** 8.0.0
> **Last Updated:** 2026-05-14
> **Audience:** Users of Live Character Guide v7 who are upgrading to v8

---

## Overview

v8.0.0 is a major architectural restructuring that transforms the guide from a layered system (L1/L2/L3) into a unified, linear, single-pass guide. All content is still present — nothing was removed — but the way content is organized and accessed has fundamentally changed.

**Key principle:** In v8, ALL content is mandatory reading. There are no "basic" or "advanced" levels. Model capability differences are noted inline using `[MODEL_NOTE: text]` rather than through layer separation.

---

## What Changed and Why

### Why the change?

v7 "Unified" mechanically merged the L1/L2/L3 layers into single HTML files, but structural remnants remained throughout:
- Section IDs still had `_l2`/`_l3` suffixes
- Runtime JavaScript still read `data-layer` from `<body>` to gate widget visibility
- CSS rules used `body[data-layer="3"]` to show/hide elements
- "Основы/Дополнительно" tables told readers some content was "optional"
- Gatekeeping language ("достаточно и без CoT") discouraged readers from learning all tools

v8 eliminates ALL of these remnants. The result is a guide where every reader sees every section, and complexity is managed through natural learning gradient, not through layer gating.

---

## Section ID Mapping

### Renamed Sections

| Old ID (v7) | New ID (v8) | Notes |
|-------------|-------------|-------|
| `p3_tier_quality` | `p3_examples_quality` | "Tier" was confusing (looked like layer remnant) |
| `p4_l3_learning_path` | `p4_spine_navigation` | No longer "L3", just SPINE continuation |
| `p4_l3_spine_full` | `p4_spine_full_chain` | Full chain is for everyone, not just "L3" |
| `p7_core_directives_l3` | Merged into `p7_core_directives` | Directives 6-7 are now part of main section |
| `p7_authors_note_l3` | Merged into `p7_authors_note` | Both AN templates in one section |
| `p7_sp_template_l3` | Merged into `p7_system_prompt` | Single canonical SP template |
| `p10_elena_full` | `p10_elena` | No layer suffix |
| `p10_omnis_full` | `p10_omnis` | No layer suffix |
| `p10_geralt_l2` | `p10_geralt` | No layer suffix |
| `p10_edward_l2` | `p10_edward` | No layer suffix |
| `p10_walter_l2` | `p10_walter` | No layer suffix |
| `p10_vysherblenny_l3` | `p10_vysherblenny` | No layer suffix |
| `p9_top5_problems` | `p9_additional_problems` | Renamed for clarity (only problems 4-5) |

### Deleted Sections

| Old ID (v7) | Where Content Went |
|-------------|-------------------|
| `p1_quickstart` | Full Assembly Pipeline moved to `p7_assembly_pipeline` |
| `p2_flaw_anchors` | Moved to Part 4 as subsection under `p4_spine_mapping` |
| `p8_ap15_basic` | Merged into `p8_ap15_ocean_overload` |
| `p8_ap15_extended` | Merged into `p8_ap15_ocean_overload` |

### New Sections

| New ID (v8) | Description |
|-------------|-------------|
| `p7_assembly_pipeline` | Full assembly pipeline with step-by-step instructions |

---

## Changed Terminology

| v7 Term | v8 Term | Reason |
|---------|---------|--------|
| Layer 1 / L1 | (removed) | No layer system in v8 |
| Layer 2 / L2 | (removed) | No layer system in v8 |
| Layer 3 / L3 | (removed) | No layer system in v8 |
| Слой 1/2/3 | (removed) | No layer system in v8 |
| l1-карточка | карточка на ~X токенов | Describe by token count, not "layer" |
| l2-карточка | карточка на ~X токенов | Same |
| l3-карточка | карточка на ~X токенов | Same |
| "Основы" / "Дополнительно" | (removed) | No basic/advanced division |
| Tier (in CoT context) | Уровни сложности CoT | Not reader levels, but implementation complexity |
| "достаточно и без CoT" | (removed) | Gatekeeping language removed |
| `data-layer` attributes | (removed) | No runtime layer gating |
| `data-layer-switch` | (removed) | No layer switching |

---

## Structural Changes by Part

### Part 1: Foundations
- **4 Rules → 3 Key Principles**: The OCEAN rule was removed because it requires knowledge the reader doesn't have yet. Now: (1) Anchor = T→A→P, (2) Voice only in Examples, (3) Psychology only in Description.
- **Quickstart deleted**: Moved to end of Part 7 as full Assembly Pipeline.
- **Part Resume added**: Replaces "What's next?" with "Что вы теперь умеете".

### Part 2: Behavioral Anchors
- **FLAW-linked anchors removed**: `p2_flaw_anchors` moved to Part 4 (`p4_spine_mapping`).
- **Back-reference added**: Where FLAW-linked anchors were, now says "О том, как выводить якоря из SPINE-элементов — см. Part 4".

### Part 3: Voice and Isolation
- **`p3_tier_quality` → `p3_examples_quality`**: Renamed to avoid confusion with layer tiers.

### Part 4: SPINE Framework
- **All 5 elements unified**: WANT/NEED/FLAW + LIE/GHOST are now presented as a single framework, not as "base" vs "L3 extensions".
- **Causal order**: GHOST→LIE→FLAW→NEED→WANT (root cause to surface desire).
- **FLAW-linked anchors**: Now a subsection under `p4_spine_mapping`.
- **No "L3-only" markers**: LIE, GHOST, and GHOST Layers have no layer markers.

### Part 5: Psychology Toolkit
- **No structural changes**: Only layer text references removed.

### Part 6: Chain of Thought (CoT)
- **Bridge reframed**: No gatekeeping language. CoT is presented as a tool with `[MODEL_NOTE]` about model effectiveness.
- **No "достаточно и без CoT"**: Removed.

### Part 7: Technical Implementation
- **CORE DIRECTIVES unified**: All 7 directives in one section, with `[MODEL_NOTE]` for directives 6-7.
- **Author's Note unified**: Both templates (3-section and 4-section) presented as content-driven choices.
- **SP Template unified**: Single canonical template in `p7_system_prompt`.
- **Assembly Pipeline added**: Full step-by-step assembly at end of Part 7.

### Part 8: Anti-patterns
- **AP-15 merged**: `p8_ap15_basic` + `p8_ap15_extended` → `p8_ap15_ocean_overload`.
- **Sequential ordering**: APs are now numbered AP-1 through AP-15 in order.

### Part 9: Diagnostics
- **12B parameter table**: Removed from Part 9; links back to Part 7.
- **`p9_top5_problems` → `p9_additional_problems`**: Only problems 4-5 (problems 1-3 are in Part 1).

### Part 10: Card Examples
- **Layer suffixes removed**: All cards have simple IDs (`p10_elena`, not `p10_elena_full`).
- **Omnis-Zeta bug fixed**: Duplicate Lorebook and Token budget tables are now single instances.
- **Annotation tables deleted**: Inline comments only, no separate "Аннотация выбора" tables.

---

## Technical Changes

### HTML/CSS/JS
- `data-layer` attribute removed from `<body>` tags in `index.html` and `src/shell/index.html`
- `data-layer-switch` attributes removed from all content
- CSS rule `body[data-layer="3"] .persona-synthesis-widget { display: block; }` → `.persona-synthesis-widget { display: block; }`
- `.layer-remark` CSS class removed
- Widget JS no longer reads `data-layer` from body
- `MutationObserver` watching `data-layer` attribute changes removed from widgets

### Data Files
- `data/glossary.json`: Layer fields removed, `anchor_id` updated for renamed sections
- `data/character_schema.json`: `x-layer` annotations removed, `token_budgets` notes updated
- `data/anchor-redirects.json`: Added redirects for all renamed/deleted sections
- `data/test_scenarios.json`: Layer fields removed

### Build System
- `build-layers.mjs` removed (was from v6)
- `build-unified.mjs` processes all sections equally
- `layer-config.json` removed
- Test scripts updated to not require `data-layer`

---

## For Link/Bookmark Owners

If you have bookmarks or links pointing to v7 section IDs, the `data/anchor-redirects.json` file provides automatic redirection for all renamed and deleted sections. The `lazy-loader.js` `handleLegacyAnchor()` function uses this file.

Key redirects:
- `p7_core_directives_l3` → `p7_core_directives`
- `p7_authors_note_l3` → `p7_authors_note`
- `p7_sp_template_l3` → `p7_system_prompt`
- `p2_flaw_anchors` → `p4_spine_mapping`
- `p1_quickstart` → `p7_assembly_pipeline`
- `p8_ap15_basic` → `p8_ap15_ocean_overload`
- `p8_ap15_extended` → `p8_ap15_ocean_overload`
- `p3_tier_quality` → `p3_examples_quality`
- `p10_elena_full` → `p10_elena`
- `p10_omnis_full` → `p10_omnis`
- All `_l2`/`_l3` Part 10 IDs → their no-suffix equivalents

---

*Document prepared for Live Character Guide v8.0.0 transition*
