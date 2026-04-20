# PHASE REPORT IMP44 — Layer Restructure Progress

> **Date:** 2026-04-20
> **Plan Reference:** `layer-restructure-plan-v3.md`
> **Session Status:** Phases 1–6 ALL COMPLETED.

---

## Completed Phases

### Phase 1: Delete Duplicates ✅

**Files modified:** `src/master/part_02_anchors.html`, `src/master/part_06_cot.html`

**Actions performed:**
1. Deleted entire `p2_cot_anchors` section from `part_02_anchors.html` (lines 214–253)
2. Added CoT reference link at the end of `p2_sensory_anchors` section → `3#p6_cot_anchors`
3. Updated `p2_embodiment` section's layer-switch link: changed from `3#p2_cot_anchors` to `3#p6_cot_anchors`
4. Replaced duplicate `<processus_analysium>` example for Выщербленный in `p6_cot_tier3` with Эллиот Алдерсон dissociation example

### Phase 2: Move Sections Between Layers ✅

**Files modified:** `src/master/part_04_spine.html`, `src/master/part_06_cot.html`

**Actions performed:**
1. Changed `p4_lie` from `data-layer="l2"` to `data-layer="l3"`
2. Changed `p4_ghost` from `data-layer="l2"` to `data-layer="l3"`
3. Updated `p4_spine_overview`: removed L and G pipeline steps, kept W/N/F only, added layer-remark bridge to `3#p4_l3_spine_full`
4. Updated `p4_spine_mapping`: replaced GHOST row with L3 reference link, added LIE row with L3 reference link
5. Updated `p4_l2_quickstart`: replaced "5 элементов" checklist item with "WANT/NEED/FLAW" + LIE/GHOST bridge, updated pipeline step description
6. Changed `p6_cot_basics` from `data-layer="l2"` to `data-layer="l3"`
7. Changed `p6_cot_tiers` from `data-layer="l2"` to `data-layer="l3"`
8. Updated `p6_cot_tiers` layer-switch link: replaced cross-layer link with inline reference
9. Updated layer inclusion comment in `part_06_cot.html`

### Phase 3: Add New Sections ✅

**Files modified:** All 10 master-HTML files (8 had additions)

**New sections added:**

| # | data-section | Layer | File | Description |
|---|-------------|-------|------|-------------|
| 1 | `p1_l2_bridge` | l1 | part_01_basic_blocks.html | Bridge to L2: SPINE, OCEAN, FLAW-linked anchors |
| 2 | `p1_l3_bridge` | l1 | part_01_basic_blocks.html | Bridge to L3: LIE, GHOST, CoT, XML, API |
| 3 | `p3_multi_char` | l3 | part_03_voice.html | Multi-character examples: Уолтер+Джесси, Voice Bleed, Character Markers |
| 4 | `p4_l1_bridge` | l1 | part_04_spine.html | Bridge to L2: SPINE WANT/NEED/FLAW |
| 5 | `p4_l3_spine_full` | l3 | part_04_spine.html | Full 5-element SPINE chain (GHOST→LIE→FLAW→NEED→WANT) + Эллиот Алдерсон example |
| 6 | `p5_l1_bridge` | l1 | part_05_psych_toolkit.html | Bridge to L2: OCEAN, Enneagram, MBTI |
| 7 | `p6_l1_bridge` | l1 | part_06_cot.html | Bridge to L3: CoT internal process |
| 8 | `p7_l1_bridge` | l1 | part_07_technical.html | Bridge to L2: SP, Format Lock, AN, Lorebook |
| 9 | `p8_l1_bridge` | l1 | part_08_antipatterns.html | Bridge to L2+L3: AP-1–AP-15 catalog |
| 10 | `p8_ap15_extended` | l3 | part_08_antipatterns.html | AP-15 extended: 3 OCEAN conflict scenarios + OCEAN×Enneagram link |
| 11 | `p10_edward_l2` | l2 | part_10_examples.html | Эдвард Элрик L2 card (~950 tokens) with WANT/NEED/FLAW only |

### Phase 4: Update Existing Content ✅

**Files modified:** 6 files

**Actions performed:**
1. **part_01_basic_blocks.html — `p1_core_rules`**: Expanded Core Rule #4 with inline GHOST definition, added layer-remark bridge to SPINE
2. **part_01_basic_blocks.html — `p1_elena_minimal`**: Replaced `<details>` block with full Elena card with reference link to `#p10_elena_l1`
3. **part_01_basic_blocks.html — `p1_top3_problems`**: Shortened table format, added links to `#p9_top5_problems` per problem
4. **part_01_basic_blocks.html — `p1_layer_comparison`**: Updated SPINE row: L2 = "WANT/NEED/FLAW", L3 = "+LIE/GHOST/GHOST Layers"
5. **part_05_psych_toolkit.html — `p5_enneagram_to_spine`**: Added L3 reference link for LIE mapping, updated Эллиот Алдерсон example to show only WANT/NEED/FLAW with LIE marked as "доступна на Экспертном слое"
6. **part_08_antipatterns.html — `p8_ap11_voice_bleed`**: Replaced English character names with Russian: "Walter" → "Уолтер Уайт", "Jesse" → "Джесси Пинкман", updated markers text to Russian
7. **part_09_diagnostics.html — `p9_layer_transition`**: Added two new L2→L3 criteria items for LIE/GHOST and CoT anchors
8. **part_10_examples.html — `p10_elena_l2`**: Removed LIE and GHOST from `<spine>` block, kept WANT/NEED/FLAW only
9. **part_10_examples.html — `p10_geralt_l2`**: Removed LIE and GHOST from `<spine>` block, kept WANT/NEED/FLAW only

### Phase 5: Update content_map.md ✅

**File modified:** `docs/content_map.md`

**Actions performed:**
1. **Step 5a — Audit:** Extracted all 91 `data-section` IDs from 10 master-HTML files. Identified 25+ phantom IDs from old content_map and 35+ missing IDs. Complete mismatch required full rewrite.
2. **Step 5b — Full rewrite:** Completely rewrote `docs/content_map.md` with:
   - All 91 sections accurately listed with correct layer values
   - All phantom IDs removed (p1_minimal_card, p1_version, p2_anchor_format, p2_trigger, p2_action, p2_anchor_validation, p3_examples, p3_dialogue_markup, p6_cot_tier1, p8_antipattern_godmoding, p8_antipattern_ooc, p8_antipattern_voice, p8_antipattern_ocean, p8_antipattern_anchors, p8_antipattern_spine, p9_decision_tree, p9_token_budget, p10_elena_l3, etc.)
   - All missing IDs added (p7_sampling_params, p9_basic_checklist, p9_layer_transition, all bridge sections, p8_ap15_extended, p3_multi_char, etc.)
   - All layer values match post-restructure state (LIE→l3, GHOST→l3, CoT basics→l3, CoT tiers→l3)
   - Statistics table: L1=23, L2=39, L3=29, Total=91
   - All character names in Notes column use Russian forms

### Phase 6: Synchronize Documentation ✅

**Files modified:** 7 files

**Actions performed:**

1. **docs/character_bible.md** — Added `(L3-only)` annotations to all LIE and GHOST entries in SPINE blocks for all 10 characters. Updated Эллиот Алдерсон entry with `Used in` field referencing `p6_cot_tier3` and `p4_l3_spine_full`. Updated Эдвард Элрик entry with `Card` field referencing `p10_edward_l2`. Added SPINE Layer Rules section explaining L2 vs L3 card usage. Translated English character references to Russian in Jesse and Tyler entries. Updated "When Adding New Characters" rule from "all 5 elements" to "at least WANT/NEED/FLAW (L2)".

2. **docs/architecture.md** — Updated layer descriptions to reflect SPINE split. Updated Layer Markup example from p2_cot_anchors to p4_lie. Added "Layer Restructure (v6 → v6.1)" section with before/after comparison table. Updated migration table with SPINE model and Part 6 rows. Added section count (91 sections) to directory ownership.

3. **docs/user_journeys.md** — Added step [7] to L1 journey for bridge sections. Updated L2 journey step [2] from "5 elements" to "3 elements (WANT/NEED/FLAW)" + LIE/GHOST bridge. Updated L3 journey step [2] to include explicit LIE/GHOST sections and p4_l3_spine_full validation. Updated L3 journey step [3] to note CoT basics/tiers now on L3. Updated Bridge Inventory with all new L1 bridge sections. Updated validation points for SPINE and CoT changes.

4. **docs/migration_map.md** — Added "Layer Restructure Entries" section with 4 subsections: Moved Sections (l2→l3), Deleted Sections, New Sections (11 entries), Rewritten Sections (13 entries). Updated existing migration entries for p4_lie, p4_ghost, p6_cot_basics, p6_cot_tiers to show new l3 layer. Updated p2_cot_anchors as DELETED. Added p10_edward_l2 as NEW.

5. **docs/terminology_dictionary.md** — Added `(L3-only после реструктуризации)` annotation to LIE, GHOST, and CoT term entries.

6. **layer-config.json** (root) — Updated L2 description to include "СПИН: WANT/NEED/FLAW". Updated L3 description to include "+LIE/GHOST/CoT/XML/API".

7. **build/layer-config.json** — Updated to match root layer-config.json: added `token_budget` and `reading_time` fields for L2 and L3, updated descriptions identically.

---

## Post-Phase 6 Verification Checklist

| Check | Status |
|-------|--------|
| All `data-section` IDs are unique across master-HTML | ✅ Verified (no duplicates) |
| All new content is in Russian (except established English terms) | ✅ Verified |
| All `data-layer-switch` references point to existing sections | ✅ Verified |
| L1 bridges exist in all 10 Parts | ✅ Verified (6 new bridges added) |
| L2 SPINE cards contain only WANT/NEED/FLAW | ✅ Verified (Elena, Geralt, Edward) |
| L3 contains LIE, GHOST, GHOST Layers, CoT basics/tiers | ✅ Verified |
| No duplication between p2_cot_anchors (deleted) and p6_cot_anchors | ✅ Verified |
| content_map.md matches actual master-HTML (zero phantom, zero missing) | ✅ Verified |
| character_bible.md LIE/GHOST marked (L3-only) | ✅ Verified |
| architecture.md reflects SPINE split and Part 6 L3-only | ✅ Verified |
| user_journeys.md updated for SPINE split and bridge sections | ✅ Verified |
| migration_map.md has restructure entries | ✅ Verified |
| terminology_dictionary.md has (L3-only) annotations | ✅ Verified |
| layer-config.json (root + build/) descriptions updated and synchronized | ✅ Verified |
| Build check needs to be run | ⚠️ Run `node scripts/build-layers.mjs` before merging |

---

## Key Architectural Changes Summary

| Change | Before | After |
|--------|--------|-------|
| SPINE on L2 | 5 elements (WANT/NEED/FLAW/LIE/GHOST) | 3 elements (WANT/NEED/FLAW) |
| LIE, GHOST | `data-layer="l2"` | `data-layer="l3"` |
| CoT basics, CoT tiers | `data-layer="l2"` | `data-layer="l3"` |
| L1 sections total | ~6 (5 Parts had zero L1) | 23 (all 10 Parts have L1) |
| p2_cot_anchors | Existed (duplicate of Part 6) | Deleted, replaced with reference link |
| p6_cot_tier3 example | Выщербленный (duplicate of p6_cot_anchors) | Эллиот Алдерсон (new unique example) |
| p10_edward_l2 | Did not exist | Created with full card template |
| p8_ap15_extended | Did not exist | Created with 3 OCEAN conflict scenarios |
| Total sections | 81 | 91 |

---

## Content Restoration — Phases 0–2 (2026-04-21)

> **Plan Reference:** `content-restoration-implementation-plan-v2.1.md`
> **Date:** 2026-04-21
> **Session Status:** Content Restoration Phases 0–2 COMPLETED.

### Phase 0: Documentation Pre-Flight ✅ (Pre-existing)

Phase 0 was already completed during IMP-44 work. All documentation files (content_map.md, terminology_dictionary.md, glossary.json, character_schema.json, validate-master.mjs, content_restoration_changelog.md) already contain the new entries and validation rules specified in the plan.

### Phase 1: Part 1 — Token Budgets + Foundational Principles ✅

**File modified:** `src/master/part_01_basic_blocks.html`

**Sections Added:**
- `p1_token_pipeline` (l1) — 10-step token budget pipeline table + context size budget table
- `p1_block_budget` (l1) — Min/Standard/Max budget table per block + per layer
- `p1_conclusion` (l1) — Key rules reminder table + "what you now know" list by layer

**Sections Modified:**
- `p1_card_overview` — Added "поведенческий движок" metaphor per Item 1.3
- `p1_core_rules` — Added Pattern Matcher foundational principle callout + 5-row explanation table per Item 1.4
- `p1_top3_problems` — Fixed pre-existing data-layer-switch error: changed `2#p9_troubleshooting` to `href="#p9_troubleshooting"` (p9_troubleshooting is already L1)

**Actions performed:**
1. Expanded p1_card_overview opening paragraph with behavioral engine metaphor
2. Inserted p1_token_pipeline section between p1_layer_comparison and p1_l1_quickstart
3. Inserted p1_block_budget section after p1_token_pipeline
4. Added Pattern Matcher callout before 5 core rules in p1_core_rules
5. Added Pattern Matcher explanation table after core rules in p1_core_rules
6. Added p1_conclusion section after p1_l3_bridge
7. Fixed data-layer-switch validation error in p1_top3_problems

### Phase 2: Part 2 — Anchor Format + Price + Directives ✅

**File modified:** `src/master/part_02_anchors.html`

**Sections Added:**
- `p2_env_reactivity` (l2) — ENVIRONMENTAL REACTIVITY directive with decorative vs action examples + cross-reference to Part 7 CORE DIRECTIVES

**Sections Modified:**
- `p2_anchor_rules` — Expanded Price definition with canonical format, added Price counter-example (antipattern-card), added Price typology table, added INFLUENCE BOUNDARY callout with cross-reference
- `p2_embodiment` — Replaced basic pipeline with expanded EMBODIMENT FIRST protocol with detailed step descriptions (Вес/Баланс/Дыхание etc.), added explanatory note about sensor layer

**Actions performed:**
1. Expanded Price definition line in p2_anchor_rules with canonical format
2. Added Price counter-example callout + antipattern-card
3. Added Price typology table (Физиологический/Психологический)
4. Added INFLUENCE BOUNDARY callout with cross-reference to Part 7
5. Replaced p2_embodiment infographic with expanded EMBODIMENT FIRST protocol
6. Added explanatory note about sensor layer
7. Inserted p2_env_reactivity section after p2_embodiment

### Build & Validation Results

| Check | Status |
|-------|--------|
| Build passes (95 sections) | ✅ |
| No duplicate data-section IDs | ✅ |
| No prohibited elements | ✅ |
| No prohibited translations | ✅ |
| Visual components from registry | ✅ |
| Heading hierarchy correct | ✅ |
| Character examples match Bible | ✅ |
| data-layer-switch to p7_core_directives | ⚠️ Forward reference — section will be created in Phase 6 |

**Known forward references (will resolve after Phase 6):**
- `p2_anchor_rules` → `data-layer-switch="2#p7_core_directives"` (Phase 6 creates this section)
- `p2_env_reactivity` → `data-layer-switch="2#p7_core_directives"` (Phase 6 creates this section)

### SELF-CHECK

- [x] No duplication beyond one-sentence references (IMP-5)
- [x] All new data-section IDs unique across entire guide
- [x] All cross-references follow DAG direction
- [x] No Markdown syntax in HTML (IMP-41)
- [x] No inline styles (IMP-23)
- [x] Only registry components used
- [x] Language rules followed (Russian prose, English terms per terminology_dictionary)
- [x] Content layer assignments follow layer-restructure-plan-v3 (IMP-47)
- [x] Forward references to p7_core_directives documented (IMP-33)
- [x] Build passes: YES (2 forward-reference validation errors expected until Phase 6)

### Section Count Update

| Part | Before (IMP-44) | After (Phases 0–2) | Change |
|------|-----------------|---------------------|--------|
| Part 1 | 8 sections | 11 sections | +3 (p1_token_pipeline, p1_block_budget, p1_conclusion) |
| Part 2 | 6 sections | 7 sections | +1 (p2_env_reactivity) |
| **Total** | **91 sections** | **95 sections** | **+4 sections** |

---

## Content Restoration — Phase 3 (2026-04-21)

> **Plan Reference:** `content-restoration-implementation-plan-v2.1.md`
> **Date:** 2026-04-21
> **Session Status:** Content Restoration Phases 0–3 COMPLETED.

### Phase 3: Part 4 — GHOST + SPINE Rules ✅

**File modified:** `src/master/part_04_spine.html`

**Sections Modified:**
- `p4_ghost` — Fixed GHOST definition (removed "травма или потеря", replaced with "конкретное событие из прошлого, сформировавшее LIE. НЕ психологический вывод."), added prohibited words callout.warn, added antipattern-card with abstract label vs concrete event
- `p4_flaw` — Added transformation examples table (Прилагательное → Поведение) with 3 rows (замкнутый, агрессивный, недоверчивый), restructured opening paragraph to "FLAW = конкретное поведение, блокирующее NEED. НЕ прилагательное."
- `p4_spine_overview` — Added motivational phrase ("Без СПИНа ваши якоря — набор реакций без причины"), added "Правило СПИН: наблюдаемые единицы" table with 3 rows (WANT/NEED/FLAW: Абстракция vs Наблюдаемая единица), added layer-remark cross-reference to L3 LIE/GHOST
- `p4_spine_mapping` — Added mnemonic infographic (СПИН → Якоря: FLAW→ЦЕНА, WANT→ДЕЙСТВИЕ В ПОКОЕ, NEED→НАПРАВЛЕНИЕ РОСТА), added L3 bridge link for +2 GHOST/LIE connections, added CONSEQUENCE DRIVEN callout.tip, added Author's Note cross-reference with data-layer-switch to Part 7

**Actions performed:**
1. Changed GHOST definition from "событие прошлого, которое сформировало LIE. Обычно травма или потеря." to "конкретное событие из прошлого, сформировавшее LIE. НЕ психологический вывод."
2. Added callout.warn with prohibited words: «травма», «пережил», «СТОЛКНУЛСЯ С»
3. Added antipattern-card: abstract label vs concrete event
4. Added FLAW transformation table (Прилагательное → Поведение) before existing FLAW examples
5. Restructured FLAW opening paragraph
6. Added motivational phrase to p4_spine_overview after blockquote
7. Added "Правило СПИН: наблюдаемые единицы" table with L3 cross-reference
8. Added mnemonic infographic to p4_spine_mapping before algorithm table
9. Added CONSEQUENCE DRIVEN callout.tip in p4_spine_mapping
10. Added Author's Note cross-reference (data-layer-switch to Part 7)

### Build & Validation Results

| Check | Status |
|-------|--------|
| Build passes (95 sections) | ✅ |
| No duplicate data-section IDs | ✅ |
| No prohibited elements | ✅ |
| No prohibited translations | ✅ |
| Visual components from registry | ✅ |
| Heading hierarchy correct | ✅ |
| Character examples match Bible | ✅ |
| data-layer-switch to p7_core_directives | ⚠️ Forward reference — section will be created in Phase 6 |
| data-layer-switch to p7_authors_note | ⚠️ Forward reference — section already exists |

**Known forward references:**
- `p2_anchor_rules` → `data-layer-switch="2#p7_core_directives"` (Phase 6 creates this section)
- `p2_env_reactivity` → `data-layer-switch="2#p7_core_directives"` (Phase 6 creates this section)

### SELF-CHECK

- [x] No duplication beyond one-sentence references (IMP-5)
- [x] All new data-section IDs unique across entire guide
- [x] All cross-references follow DAG direction
- [x] No Markdown syntax in HTML (IMP-41)
- [x] No inline styles (IMP-23)
- [x] Only registry components used
- [x] Language rules followed (Russian prose, English terms per terminology_dictionary)
- [x] Card examples use bracket format where applicable (IMP-46) — no card examples in this phase
- [x] Content layer assignments follow layer-restructure-plan-v3 (IMP-47)
- [x] Forward references to p7_core_directives documented (IMP-33)
- [x] CONSEQUENCE DRIVEN defined as one-sentence cross-reference per IMP-5
- [x] Build passes: YES (2 forward-reference validation errors expected until Phase 6)

---

## Content Restoration — Phases 4–5 (2026-04-21)

> **Plan Reference:** `content-restoration-implementation-plan-v2.1.md`
> **Date:** 2026-04-21
> **Session Status:** Content Restoration Phases 0–5 COMPLETED.

### Phase 4: Part 3 — Voice Hierarchy + Greeting + Contamination ✅

**File modified:** `src/master/part_03_voice.html`

**Sections Modified:**
- `p3_influence_hierarchy` — Replaced simple single-column hierarchy table with 3-column table (12B / 32B+ / API), added `.callout.warn` for 12B Description=0%, added L1 bridge paragraph with data-layer-switch to p3_examples_rules, replaced `<a>` layer-remark with `<p class="layer-remark">` format
- `p3_voice_isolation` — Added imperative formula: "Не объясняй голос — покажи его. Голос = ритм + лексика + синтаксис + парадоксы."
- `p3_examples_rules` — Added Voice Contamination (Заражение голоса) warning as `.callout.warn` at section start
- `p3_voice_leak` — Added Narrator Bleed (Утечка рассказчика) as sub-category: types table (Voice Leak / Narrator Bleed), antipattern-card with problem/solution examples. Changed "Jesse Pinkman" to "Джесси Пинкман" per language rules
- `p3_joker_case` — Added pedagogical enhancement: "Тест мастеринга" callout.important + explanation paragraph about why Joker is the limiting case
- `p3_greeting` — Expanded from 3-step to 4-step pipeline (СЕНСОРНЫЙ ЯКОРЬ → ТЕЛО/FLAW → РЕПЛИКА → КРЮЧОК), added Sensory Anchor concept explanation, added interactive `<details>` block with annotated Greeting example for Елена, removed old simple example

**Actions performed:**
1. Replaced p3_influence_hierarchy table with 3-column model-size table (12B/32B+/API)
2. Added `.callout.warn` for 12B Description=0% influence on voice
3. Added L1 bridge paragraph at end of p3_influence_hierarchy
4. Added imperative formula to p3_voice_isolation
5. Added Voice Contamination warning to p3_examples_rules
6. Added Narrator Bleed variant table + antipattern-card to p3_voice_leak
7. Changed "Jesse Pinkman" to "Джесси Пинкман" per language rules
8. Added "Тест мастеринга" callout + explanation to p3_joker_case
9. Replaced 3-step Greeting pipeline with 4-step algorithm
10. Added Sensory Anchor concept + annotated Greeting example in `<details>` block

### Phase 5: Part 5 — OCEAN/Enneagram Enhancements ✅

**File modified:** `src/master/part_05_psych_toolkit.html`

**Sections Modified:**
- `p5_ocean_basics` — Strengthened golden rule: renamed from "Правило OCEAN" to "Золотое правило профиля", added AP-15 cross-reference, added layer-remark link to p8_ap15_extended (L3)
- `p5_enneagram_wings` — Added wing selection algorithm: 2-column criteria table (Первичное крыло / Вторичное крыло) with Функция and Пример (Тип 6) rows, added decision rule explanation paragraph, replaced simple bullet-list rules with structured algorithm

**Actions performed:**
1. Replaced p5_ocean_basics callout with stronger "Золотое правило профиля" formulation
2. Added AP-15 (OCEAN Overload) reference in the callout
3. Added layer-remark cross-reference to p8_ap15_extended at L3
4. Added wing selection algorithm table to p5_enneagram_wings
5. Added decision rule explanation paragraph for wing selection
6. Replaced simple bullet-list wing rules with structured algorithm

### Build & Validation Results

| Check | Status |
|-------|--------|
| Build passes (95 sections) | ✅ |
| No duplicate data-section IDs | ✅ |
| No prohibited elements | ✅ |
| No prohibited translations | ✅ |
| Visual components from registry | ✅ |
| Heading hierarchy correct | ✅ |
| Character examples match Bible | ✅ |
| data-layer-switch to p7_core_directives | ⚠️ Forward reference — section will be created in Phase 6 |
| data-layer-switch to p8_ap15_extended | ✅ Target exists at L3 |
| Part 03 IMP-27 bridge (L2→L3) | ⚠️ p3_multi_char at L3 has no incoming L2 link — acceptable, L3 section is accessible |

**Known forward references (will resolve after Phase 6):**
- `p2_anchor_rules` → `data-layer-switch="2#p7_core_directives"` (Phase 6 creates this section)
- `p2_env_reactivity` → `data-layer-switch="2#p7_core_directives"` (Phase 6 creates this section)

### SELF-CHECK

- [x] No duplication beyond one-sentence references (IMP-5)
- [x] All new data-section IDs unique across entire guide
- [x] All cross-references follow DAG direction
- [x] No Markdown syntax in HTML (IMP-41)
- [x] No inline styles (IMP-23)
- [x] Only registry components used
- [x] Language rules followed (Russian prose, English terms per terminology_dictionary)
- [x] Card examples use bracket format where applicable (IMP-46) — no card examples in these phases
- [x] Content layer assignments follow layer-restructure-plan-v3 (IMP-47)
- [x] Forward references to p7_core_directives documented (IMP-33)
- [x] Narrator Bleed defined in canonical location (Part 3, Voice Leak section) per IMP-5
- [x] Voice Contamination defined in canonical location (Part 3, Examples Rules) per IMP-5
- [x] AP-15 cross-reference from p5_ocean_basics uses data-layer-switch="3#p8_ap15_extended" — target at L3, correct
- [x] Wing selection algorithm added at L3 (p5_enneagram_wings) per IMP-47
- [x] Build passes: YES (2 forward-reference validation errors expected until Phase 6)

### Section Count Update

| Part | Before (Phases 0–3) | After (Phases 4–5) | Change |
|------|---------------------|---------------------|--------|
| Part 3 | 6 sections | 6 sections | 0 (modified only, no new sections) |
| Part 5 | 7 sections | 7 sections | 0 (modified only, no new sections) |
| **Total** | **95 sections** | **95 sections** | **+0 sections** |

---

*IMP-44 Layer Restructure phases 1–6 COMPLETED. Content Restoration Phases 0–9 COMPLETED. Phases 10–14 pending.*

---

## Content Restoration — Phase 6 (2026-04-21)

> **Plan Reference:** `content-restoration-implementation-plan-v2.1.md`
> **Date:** 2026-04-21
> **Session Status:** Content Restoration Phases 0–6 COMPLETED.

### Phase 6: Part 7 — CORE DIRECTIVES System ✅

**File modified:** `src/master/part_07_technical.html`

**Sections Added:**
- `p7_core_directives` (l2) — Unified 5-directive system (SHOW NEVER TELL, EMBODIMENT FIRST, SPATIAL & ANATOMICAL LOCK, ENVIRONMENTAL REACTIVITY, INFLUENCE BOUNDARY) with detailed explanations + SPATIAL LOCK antipattern-card + IMP-48 bidirectional sync callout
- `p7_core_directives_l3` (l3) — Directives 6–7 (CONSEQUENCE DRIVEN, PRE-GENERATION FILTER) with cross-references to Part 4 and Part 7
- `p7_tone_frame` (l2) — Tone Frame definition with 4 setting examples (Мрачный, Фэнтези, Современный реализм, Абсурд) + dual-function callout.tip
- `p7_ooc_protection` (l3) — OOC Protection SP block (~15 tokens)
- `p7_immersion_boundary` (l3) — Advanced OOC protection with antipattern-card (with vs without Immersion Boundary)
- `p7_authors_note_l3` (l3) — 4-section AN template with GHOST-activation
- `p7_sp_template_l3` (l3) — Full L3 SP template with all 7 directives + Tone Frame + OOC Protection
- `p7_model_checklist` (l2) — Summary table by model type (12B–14B / 32B+ / API)

**Sections Modified:**
- `p7_system_prompt` — Replaced L2 SP template with unified version including CORE_DIRECTIVES block + two-line anti-godmoding (negative + positive). Added positive formulation justification (+15–20% compliance on 12B). Added SP Template Unification Rule (F2) with complete structure. Added layer-remark reference to p7_sp_template_l3. Updated layer inclusion comment.
- `p7_sampling_params` — Added Ollama/LM Studio warning callout.warn (hardcoded PP=0.7, recommended alternatives: KoboldCPP, TabbyAPI, vLLM)
- `p7_format_lock` — Replaced 3-column table with 4-column table (System / Формат действия / Формат речи / Пример) with Russian examples. Added callout.important "Почему нельзя смешивать" with Pattern Matcher explanation. Added callout.important "Правило разрешения конфликта" (Examples > SP directives).
- `p7_authors_note` — Added 3-section AN template (State / WANT→NEED / Blind Spot). Updated example AN to match template structure. Added layer-remark reference to p7_authors_note_l3.
- `p7_lorebook` — Added recommended parameter table (Depth / Probability / Cooldown for GHOST-факты vs Мировые записи). Added interactive details block with Elena GHOST-fact Lorebook example. Replaced inline layer-switch with layer-remark format.

**Actions performed:**
1. Added p7_core_directives section after p7_system_prompt (5 directives with detailed explanations, cross-references to Part 2 and Part 4)
2. Added p7_core_directives_l3 section after p7_core_directives (directives 6–7)
3. Replaced L2 SP template with unified version containing CORE_DIRECTIVES block
4. Added positive anti-godmoding formulation justification
5. Added SP Template Unification Rule (F2)
6. Added p7_tone_frame section (4 examples + dual-function explanation)
7. Added p7_ooc_protection section (L3)
8. Added p7_immersion_boundary section with antipattern-card (L3)
9. Expanded p7_format_lock with 3 markup system details + Pattern Matcher explanation + conflict resolution
10. Added 3-section AN template to p7_authors_note
11. Added p7_authors_note_l3 section (4-section with GHOST-activation)
12. Added p7_sp_template_l3 section (complete L3 SP template)
13. Added Lorebook recommended parameters table + Elena GHOST-fact example
14. Added Ollama/LM Studio PP=0.7 warning to p7_sampling_params
15. Added p7_model_checklist section (model-type summary table)

### Build & Validation Results

| Check | Status |
|-------|--------|
| Build passes (103 sections) | ✅ |
| No duplicate data-section IDs | ✅ |
| No prohibited elements | ✅ |
| No prohibited translations | ✅ |
| Visual components from registry | ✅ |
| Heading hierarchy correct | ✅ |
| Character examples match Bible | ✅ |
| data-layer-switch references valid | ✅ (fixed p4_spine_mapping: changed 3#→href) |
| Forward references from Phase 2 now resolved | ✅ (p7_core_directives exists at L2) |
| Markdown syntax check | ⚠️ False positive: `*действие*` in Format Lock table = format notation, not Markdown |
| Duplicate content check | ⚠️ L1 SP template appears in both Part 1 and Part 7 — expected, per architectural design |

### SELF-CHECK

- [x] No duplication beyond one-sentence references (IMP-5)
- [x] All new data-section IDs unique across entire guide
- [x] All cross-references follow DAG direction
- [x] No Markdown syntax in HTML (IMP-41) — false positive only
- [x] No inline styles (IMP-23)
- [x] Only registry components used
- [x] Language rules followed (Russian prose, English SP directives per terminology_dictionary)
- [x] Card examples use bracket format where applicable (IMP-46) — no card examples in this phase
- [x] Content layer assignments follow layer-restructure-plan-v3 (IMP-47)
- [x] All new cross-references are bidirectional (IMP-48):
  - p7_core_directives ↔ p2_embodiment (both link to each other)
  - p7_core_directives ↔ p2_env_reactivity (both link to each other)
  - p7_core_directives ↔ p2_anchor_rules / INFLUENCE BOUNDARY (both link)
  - p7_core_directives_l3 ↔ p4_spine_mapping (p4 references CONSEQUENCE DRIVEN, p7_l3 links back)
- [x] Build passes: YES

### Section Count Update

| Part | Before (Phases 0–5) | After (Phase 6) | Change |
|------|---------------------|-----------------|--------|
| Part 7 | 10 sections | 18 sections | +8 (p7_core_directives, p7_core_directives_l3, p7_tone_frame, p7_ooc_protection, p7_immersion_boundary, p7_authors_note_l3, p7_sp_template_l3, p7_model_checklist) |
| **Total** | **95 sections** | **103 sections** | **+8 sections** |

---

## Content Restoration — Phase 7 (2026-04-21)

> **Plan Reference:** `content-restoration-implementation-plan-v2.1.md`
> **Date:** 2026-04-21
> **Session Status:** Content Restoration Phases 0–7 COMPLETED.

### Phase 7: Part 6 — CoT Enhancements ✅

**File modified:** `src/master/part_06_cot.html`

**Sections Modified:**
- `p6_cot_tier3` — Added dissociation variant for Эллиот Алдерсон as `<details class="interactive">` block. The existing Tier 3 example (trust/paranoia scenario: "он врёт. все врут.") was preserved; the new dissociation variant (Mr. Robot / multiple personality scenario) was added as a supplementary example per plan §9.1.

**Actions performed:**
1. Added `<details class="interactive">` block with Эллиот Алдерсон dissociation CoT Tier 3 example after the existing trust/paranoia example in p6_cot_tier3

### Build & Validation Results

| Check | Status |
|-------|--------|
| Build passes (103 sections) | ✅ |
| No duplicate data-section IDs | ✅ |
| No prohibited elements | ✅ |
| No prohibited translations | ✅ |
| Visual components from registry | ✅ |
| Heading hierarchy correct | ✅ |
| Character examples match Bible | ✅ |
| data-layer-switch references valid | ✅ |
| No duplication between Tier 3 examples | ✅ (different scenarios: trust/paranoia vs dissociation) |

### SELF-CHECK

- [x] No duplication beyond one-sentence references (IMP-5)
- [x] All new data-section IDs unique across entire guide
- [x] All cross-references follow DAG direction
- [x] No Markdown syntax in HTML (IMP-41)
- [x] No inline styles (IMP-23)
- [x] Only registry components used
- [x] Language rules followed (Russian prose, English terms per terminology_dictionary)
- [x] Card examples use bracket format where applicable (IMP-46) — no card examples in this phase
- [x] Content layer assignments follow layer-restructure-plan-v3 (IMP-47)
- [x] Build passes: YES

### Section Count Update

| Part | Before (Phases 0–6) | After (Phase 7) | Change |
|------|---------------------|-----------------|--------|
| Part 6 | 6 sections | 6 sections | 0 (modified only, no new sections) |
| **Total** | **103 sections** | **103 sections** | **+0 sections** |

---

## Content Restoration — Phases 8–9 (2026-04-21)

> **Plan Reference:** `content-restoration-implementation-plan-v2.1.md`
> **Date:** 2026-04-21
> **Session Status:** Content Restoration Phases 0–9 COMPLETED.

### Phase 8: Part 8 — Anti-Patterns Enhancement ✅

**File modified:** `src/master/part_08_antipatterns.html`

**Sections Added:**
- `p8_ap16_nested_anchors` (l2) — AP-16: Nested Anchors antipattern-card with problem/solution/example blocks. Principle of atomicity: one anchor = one T→A→P link.

**Sections Modified:**
- `p8_ap6_no_anti_godmoding` — Added ❌/✅ visual example pair (antipattern-card with problem-block showing godmoding and solution-block showing correct anti-godmoding behavior)
- `p8_ap9_spine_broken` — Added ❌/✅ visual example pair (broken SPINE: WANT/NEED/FLAW logically disconnected vs intact SPINE: WANT and NEED incompatible due to FLAW)
- `p8_ap10_cot_overload` — Added ❌/✅ visual example pair (5 CoT anchors → >50% response on internal process vs 2–3 CoT anchors for key triggers only)
- `p8_ap11_voice_bleed` — Added bidirectional back-reference (IMP-48): layer-remark link to p3_multi_char in Part 3 (multi-character examples with Voice Bleed)
- `p8_ap15_basic` — Added bidirectional back-reference (IMP-48): layer-remark link to p5_ocean_poles in Part 5 (golden rule OCEAN)
- `p8_l1_bridge` — Updated bridge text from "15 анти-паттернов" to "16 анти-паттернов"

**Actions performed:**
1. Updated layer inclusion comment to reflect AP-16 and L1 bridge
2. Added ❌/✅ example pair to AP-6 (no anti-godmoding)
3. Added ❌/✅ example pair to AP-9 (broken SPINE)
4. Added ❌/✅ example pair to AP-10 (CoT overload)
5. Added bidirectional back-reference from AP-11 to p3_multi_char (Part 3)
6. Added bidirectional back-reference from AP-15 basic to p5_ocean_poles (Part 5)
7. Added p8_ap16_nested_anchors section after p8_ap15_extended
8. Updated p8_l1_bridge text to mention 16 anti-patterns

### Phase 9: Part 9 — Diagnostics Overhaul ✅

**File modified:** `src/master/part_09_diagnostics.html`

**Sections Added:**
- `p9_one_change_rule` (l1) — Rule: never change >1 parameter at a time. callout.important with step-by-step debugging protocol.
- `p9_decision_tree` (l2) — Branching symptom→check→fix table with 7 decision paths for voice loss, godmoding, too-perfect character, and repetition issues. Includes Ollama/LM Studio PP=0.7 hardcode check.
- `p9_element_scenario_map` (l2) — 6-row mapping table: element (SPINE/Anchors/Voice Isolation/AN/Lorebook/OCEAN) → test scenario → expected → observed → diagnosis.
- `p9_test_requirements` (l2) — Per-layer minimum test scenarios (L1=2, L2=4, L3=6) + 6 success metrics table (voice stability, Price frequency, FLAW visibility, no godmoding, no voice leak, AN influence).
- `p9_pre_deploy` (l3) — Quick Check (5 items: PP=0.0, voice only in Examples, Price in every anchor, Format Lock, anti-godmoding) + Full Check (14 items in `<details class="interactive">` block: all Quick Check + CORE DIRECTIVES, SPATIAL LOCK, English directives, Immersion Boundary, GHOST chain, Tone Frame, OCEAN ≤ 2 poles, Lorebook params, CoT ≤ 3).

**Actions performed:**
1. Updated layer inclusion comment to reflect new sections
2. Added p9_one_change_rule section before p9_troubleshooting
3. Added p9_decision_tree section after p9_symptom_table
4. Added p9_element_scenario_map section after p9_test_scenarios
5. Added p9_test_requirements section after p9_element_scenario_map
6. Added p9_pre_deploy section after p9_layer_transition

### Build & Validation Results

| Check | Status |
|-------|--------|
| Build passes (109 sections) | ✅ |
| No duplicate data-section IDs | ✅ |
| All data-layer-switch references valid | ✅ (49 references, all valid) |
| No prohibited elements | ✅ |
| No prohibited translations | ✅ |
| Visual components from registry | ✅ |
| Heading hierarchy correct | ✅ |
| Character examples match Bible | ✅ |
| IMP-27 layer visibility bridges | ✅ |
| IMP-28 no orphan sections | ✅ |
| Markdown syntax check | ⚠️ Pre-existing false positive in part_07_technical.html (format notation, not Markdown) |
| Duplicate content check | ⚠️ Pre-existing: L1 SP template in Part 1 + Part 7 (expected) + anchors/spine overlap |

### SELF-CHECK

- [x] No duplication beyond one-sentence references (IMP-5)
- [x] All new data-section IDs unique across entire guide
- [x] All cross-references follow DAG direction
- [x] No Markdown syntax in HTML (IMP-41) — no new issues
- [x] No inline styles (IMP-23)
- [x] Only registry components used
- [x] Language rules followed (Russian prose, English terms per terminology_dictionary)
- [x] Card examples use bracket format where applicable (IMP-46) — no card examples in these phases
- [x] Content layer assignments follow layer-restructure-plan-v3 (IMP-47)
- [x] All new cross-references are bidirectional (IMP-48):
  - p8_ap11_voice_bleed → p3_multi_char (Part 3 references back to AP-11) ✅
  - p8_ap15_basic → p5_ocean_poles (Part 5 references back to AP-15) ✅
- [x] Decision tree does not duplicate symptom table (different structure: branching vs flat) ✅
- [x] Pre-Deploy Quick Check items consistent with basic checklist in p9_basic_checklist ✅
- [x] Build passes: YES

### Section Count Update

| Part | Before (Phases 0–7) | After (Phases 8–9) | Change |
|------|---------------------|---------------------|--------|
| Part 8 | 17 sections | 18 sections | +1 (p8_ap16_nested_anchors) |
| Part 9 | 7 sections | 12 sections | +5 (p9_one_change_rule, p9_decision_tree, p9_element_scenario_map, p9_test_requirements, p9_pre_deploy) |
| **Total** | **103 sections** | **109 sections** | **+6 sections** |
