# Live Character Guide — Visual System Implementation Plan

**Version:** 1.3 (errata-corrigenda + язык контента)
**Date:** 2026-05-16
**Changelog v1.2:** Fixed Assembly Pipeline to match actual Part 7A 6-step structure (E02), fixed AP-5 severity to Medium (E12), fixed Elena GHOST example from "mentor" to "editor" (E05), fixed E03 Incorrect-side Price label from "(immed)" to "(deferred)", fixed E07 ASCII chart removing Lorebook row, fixed E08 model-tier badges to match actual guide notation, fixed E17 sampling parameters to reflect actual multi-table structure, fixed E01 to note Part 1 defines 4 main blocks (not 5), added E16/E17 to directory structure and mini-map, fixed Phase 3 dependency to include 2D.
**Changelog v1.1:** Fixed G-level ordering (E06), voice hierarchy data (E07), Quick Checks (E14), AP severities (E12), token budgets (E01), Price terminology (E03), Geist font source (Phase 0), Assembly Pipeline steps (E02), Directive 7 badge (E08), token migration principle (Phase 4). Added Author's Note (E16), Sampling Parameters (E17), performance budget, a11y spec, integration dedup rules.  
**Repository:** https://github.com/vudirvp-sketch/live-char-guide  
**Strategy:** Isolated-first development → standalone HTML prototypes → integration into guide build

### Правило языка контента

**Все видимые тексты в элементах визуальной системы пишутся на русском языке.** Исключение — устоявшиеся и общепринятые технические термины, которые остаются на английском:

- Названия блоков карточки: SP (System Prompt), Description, Examples, Greeting, Lorebook
- Фреймворки и модели: SPINE, GHOST, OCEAN, Enneagram, LIE, FLAW, NEED, WANT
- Форматы и протоколы: T→A→P, CoT, Embodiment, CORE DIRECTIVES
- Параметры сэмплирования: Temperature, Top P, Min P, RepPen, Top K, PP (Presence Penalty)
- Уровни моделей: 12B, 32B, 32B+, API
- Ссылки на части руководства: Part 1, Part 7A, Part 7B и т.д.
- Идентификаторы антипаттернов: AP-1 через AP-15
- Технические обозначения: Token Budget, Format Lock, Anti-godmoding, Author's Note, Anchors

Все HTML-файлы должны иметь `lang="ru"`. Комментарии в CSS и JS также пишутся на русском. Данный план остаётся на английском как технический документ, но реализуемый контент — на русском.

---

## Strategy Overview

### Why Isolated-First?

Building each visual element as a standalone HTML file before integrating into the guide offers critical advantages:

1. **No build-system coupling.** Each element is self-contained with its own CSS tokens and JS logic. The LLM agent can focus on one element at a time without navigating the existing build pipeline (`build-unified.mjs`, shell architecture, widget system).
2. **Full spec compliance.** Standalone files have no token budget pressure from the existing codebase. Every annotation, callout, interaction, and animation described in the spec can be implemented without compromise.
3. **Quality isolation.** Each element gets a dedicated review pass. Bugs in E7 don't block E12.
4. **Incremental integration.** Once all 15 standalone prototypes pass visual QA, integration becomes a mechanical task: extract CSS tokens → shared stylesheet, extract SVG → inline components, extract JS → widget modules. Low risk, high predictability.
5. **Parallel execution.** Multiple agents can work on different elements simultaneously without merge conflicts.

### Directory Structure

```
live-char-guide/
├── visual-system/                    ← NEW: all prototype work lives here
│   ├── PLAN.md                       ← this file
│   ├── DESIGN-TOKENS.css             ← shared CSS custom properties
│   ├── shared/
│   │   ├── fonts.css                 ← @font-face declarations
│   │   ├── base.css                  ← reset, body, typography rules
│   │   ├── patterns.css              ← 6 base pattern layouts (P1–P6)
│   │   └── utilities.css             ← spacing, glow, animation helpers
│   ├── elements/
│   │   ├── E01-card-anatomy.html
│   │   ├── E02-assembly-pipeline.html
│   │   ├── E03-behavioral-anchor.html
│   │   ├── E04-embodiment-protocol.html
│   │   ├── E05-spine-framework.html
│   │   ├── E06-ghost-layers.html
│   │   ├── E07-voice-hierarchy.html
│   │   ├── E08-core-directives.html
│   │   ├── E09-ocean-pentagon.html
│   │   ├── E10-enneagram-spine.html
│   │   ├── E11-cot-tiers.html
│   │   ├── E12-antipattern-catalog.html
│   │   ├── E13-diagnostic-tree.html
│   │   ├── E14-quality-scale.html
│   │   ├── E15-annotated-blueprint.html
│   │   ├── E16-author-note.html
│   │   └── E17-sampling-params.html
│   ├── hero/
│   │   └── architecture-skeleton.html  ← Three.js/R3F intro scene
│   ├── integration/
│   │   ├── INTEGRATION-MAP.md         ← mapping from standalone → guide parts
│   │   ├── token-migration.css         ← final merged tokens
│   │   └── component-extracts/         ← finalized SVG/JS modules
│   └── QA-CHECKLIST.md
├── src/                              ← existing repo (untouched until Phase 4)
└── ...
```

### Execution Phases

| Phase | What | Output | Dependency |
|-------|------|--------|------------|
| **0** | Design tokens, shared CSS, font setup | `DESIGN-TOKENS.css`, `shared/*.css` | None |
| **1** | Hero 3D scene (intro) | `hero/architecture-skeleton.html` | Phase 0 |
| **2A** | Elements E01–E05 (Foundation + Core Mechanics start) | 5 standalone HTML files | Phase 0 |
| **2B** | Elements E06–E10 (Core Mechanics end + Personality) | 5 standalone HTML files | Phase 0 |
| **2C** | Elements E11–E15 (Advanced + Master Blueprint) | 5 standalone HTML files | Phase 0 |
| **2D** | Elements E16–E17 (Authors Note + Sampling) | 2 standalone HTML files | Phase 0 |
| **3** | Cross-element links, mini-map nav, QA | `QA-CHECKLIST.md` pass | Phase 2A+2B+2C+2D |
| **4** | Integration into guide build | Updated `src/master/*.html` + new shell components | Phase 3 |

Phases 2A, 2B, 2C, 2D can run **in parallel** if multiple agents are available.

---

## Phase 0 — Design System Foundation

### 0.1 — Create `DESIGN-TOKENS.css`

File: `visual-system/DESIGN-TOKENS.css`

All custom properties from the spec, with the following **modifications** from the original spec:

```css
:root {
  /* === COLORS === */
  --bg-deep:       #08090d;
  --bg-panel:      #0e1117;
  --bg-raised:     #161a22;
  --border:        #1e2430;
  --border-active: #2a3344;
  --text-primary:  #e2e6ed;
  --text-secondary:#8b95a8;
  --text-muted:    #535c6e;
  --accent-cyan:   #3cc8ff;
  --accent-violet: #8b5cf6;
  --accent-amber:  #f0a040;
  --danger:        #d9455a;
  --success:       #3fb68b;

  /* === GLOWS === */
  --glow-cyan:   0 0 12px rgba(60,200,255,0.25);
  --glow-violet: 0 0 12px rgba(139,92,246,0.25);
  --glow-danger: 0 0 10px rgba(217,69,90,0.30);
  --glow-amber:  0 0 10px rgba(240,160,64,0.25);

  /* === TYPOGRAPHY === */
  /* MODIFICATION: Replaced Inter body with Geist for character.
     Inter is overused as "AI default" and kills individuality.
     Geist is equally readable but has distinctive personality. */
  --font-display: 'Bricolage Grotesque', sans-serif;
  --font-heading: 'DM Sans', sans-serif;
  --font-body:    'Geist', sans-serif;          /* was Inter */
  --font-mono:    'JetBrains Mono', monospace;
  --font-micro:   'Inter', sans-serif;           /* Inter only for footnotes */

  /* === SPACING === */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  14px;
  --radius-xl:  20px;
  --line-width: 1px;
  --line-bold:  2px;
  --gap-xs: 4px;
  --gap-sm: 8px;
  --gap-md: 16px;
  --gap-lg: 28px;
  --gap-xl: 48px;

  /* === ANIMATION === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-base: 400ms;
  --duration-slow: 600ms;
}
```

**Why Geist over Inter:** The frontend-design skill explicitly warns against generic AI fonts. Geist (by Vercel) has the same geometric clarity as Inter but a noticeably different x-height and letter spacing that gives it a more technical, engineered feel — perfect for the "spacecraft manual" aesthetic.

### 0.2 — Create `shared/fonts.css`

Load all required fonts (for prototype phase; production will use self-hosted):

```
Bricolage Grotesque 700    <- Google Fonts
DM Sans 500, 600           <- Google Fonts
Geist 400, 500             <- NOT on Google Fonts! Use Vercel CDN:
                              https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-sans/style.css
                              OR download .woff2 from github.com/vercel/geist-font and self-host
JetBrains Mono 450         <- Google Fonts
Inter 400 (micro only)     <- Google Fonts
```

**Important:** Geist is NOT available on Google Fonts. The prototype phase must use the Vercel CDN link above. For production, download the .woff2 files and self-host alongside the existing NotoSans fonts in `src/assets/fonts/`.

### 0.3 — Create `shared/base.css`

- CSS reset (modern minimal)
- Body: `background: var(--bg-deep); color: var(--text-primary); font-family: var(--font-body)`
- Scrollbar styling (thin, dark)
- Selection color (cyan tint)
- `@media (prefers-reduced-motion: reduce)` — disable all animations

### 0.4 — Create `shared/patterns.css`

Define layout primitives for the 6 base patterns. These are **reusable CSS classes** that every element file consumes:

| Class | Pattern | What it provides |
|-------|---------|------------------|
| `.p-stack` | P1 — Stack/Layers | Flex column, gap, stacked children with dividers |
| `.p-flow` | P2 — Flow/Pipeline | Flex row with arrow connectors via pseudo-elements |
| `.p-tree` | P3 — Tree/Branching | CSS grid with indent levels, connector lines |
| `.p-radial` | P4 — Radial/Hub | Centered container with absolute-positioned spokes |
| `.p-compare` | P5 — Comparison/Bars | Two-column or multi-column comparison layout |
| `.p-blueprint` | P6 — Blueprint | Card template with callout line positioning system |

Each pattern class handles **layout only**. Colors, content, and specific geometry are set per-element.

### 0.5 — Create `shared/utilities.css`

Helper classes:
- `.glow-cyan`, `.glow-violet`, `.glow-danger`, `.glow-amber`
- `.panel` (the standard card/panel with border, inset shadow)
- `.accent-strip--cyan`, `.accent-strip--violet` (left-border accent)
- `.label`, `.label-mono`, `.label-micro`
- `.scroll-enter` (animation trigger class, added via IntersectionObserver)

### 0.6 — Verification

Open `DESIGN-TOKENS.css` in a blank HTML test page. Verify:
- [ ] All CSS variables resolve correctly
- [ ] Fonts load (check Network tab)
- [ ] Dark background renders without seams
- [ ] Glow effects render on Chrome, Firefox, Safari

---

## Phase 1 — Hero 3D Scene (Architecture Skeleton)

### File: `visual-system/hero/architecture-skeleton.html`

**Purpose:** A Three.js/React Three Fiber intro animation that literally "builds" the card skeleton from scattered pieces. This is the "wow moment" before the user scrolls into the 2D guide elements.

**Tech stack:** Plain Three.js (not R3F — standalone HTML, no React build step needed).

**Scene specification:**

| Element | Geometry | Color | Behavior |
|---------|----------|-------|----------|
| Background | — | `#08090d` | Static, deep black |
| Grid floor | `GridHelper` | `#111122` at 15% opacity | Static, gives depth |
| SP Frame | `EdgesGeometry(BoxGeometry)` — wireframe only, NO fill | `#3cc8ff` at 60% | First to appear. Flies in from left. Represents container, not content |
| Description plane | `PlaneGeometry` semi-transparent + `EdgesGeometry` wireframe | Fill: `#3cc8ff` at 12%, Edge: `#3cc8ff` at 50% | Flies in from below. Tallest plane = largest token budget |
| Examples plane | Same | Same | Flies in from right. Medium height |
| Anchors inset | Smaller plane, slightly forward (z-offset) | Fill: `#8b5cf6` at 15%, Edge: `#8b5cf6` at 50% | Nests inside Examples plane. Violet accent = "nested but critical" |
| Greeting plane | Same | Fill: `#f0a040` at 12%, Edge: `#f0a040` at 50% | Flies in from top. Shortest plane |
| SPINE axis | `CylinderGeometry` thin rod | `#ffffff` at 80% with emissive | Central vertical axis. Pulses (emissive intensity oscillates 0.3→0.8→0.3 over 3s) |
| Connection lines | `Line` from SPINE axis to each plane | `#3cc8ff` at 25% | Draw after planes land. Magnetic snap effect |
| Node spheres | `SphereGeometry` small (r=0.06) | `#3cc8ff` at 90% emissive | At each junction point. Pulse in sync with SPINE axis |
| Bloom post-processing | `UnrealBloomPass` | — | Subtle glow on all emissive elements |

**Animation sequence (timeline in seconds):**

```
0.0  — Scene empty. Grid visible.
0.5  — SPINE axis fades in at center (opacity 0→1, 600ms)
1.2  — SP frame wireframe flies in from left (position -8→0, 800ms, ease-out-expo)
2.0  — Description plane rises from below (position -4→0, 700ms)
2.8  — Examples plane slides from right (position 6→0, 700ms)
3.4  — Anchors inset pops forward inside Examples (scale 0→1, 400ms, overshoot)
3.9  — Greeting plane drops from above (position 3→0, 600ms)
4.5  — Connection lines draw from SPINE to each plane (dashoffset animation, 500ms each)
5.5  — Node spheres appear at junctions (scale 0→1, 200ms each, staggered)
6.5  — Entire assembly begins slow rotation (0.08 rad/s on Y axis)
7.0+ — Steady state: slow rotation, SPINE pulse, node pulse
```

**After assembly complete:**
- Whole structure rotates slowly (0.08 rad/s on Y axis)
- SPINE axis pulses (emissive 0.3→0.8→0.3, 3s cycle)
- Node spheres pulse in sync
- Subtle camera sway (sinusoidal, ±0.3 on X, 8s period)

**Labels:** Small HTML overlays (CSS-positioned, not 3D text) for each plane: "SP", "Description", "Examples", "Anchors", "Greeting". Use `var(--font-heading)` DM Sans 600, `var(--text-secondary)` color. Labels fade in after their respective plane lands.

**Responsive:**
- Desktop: full scene as described
- Mobile: camera closer, slower rotation, labels smaller

**Implementation notes:**
- Use `importmap` or ES module CDN for Three.js
- All geometry parameters as constants at top of script for easy tuning
- Use `EffectComposer` + `RenderPass` + `UnrealBloomPass` for bloom
- `requestAnimationFrame` loop with delta time
- IntersectionObserver NOT needed (this is an always-visible hero, not scroll-triggered)

---

## Phase 2A — Elements E01–E05

### E01 — Card Anatomy

**File:** `visual-system/elements/E01-card-anatomy.html`  
**Pattern:** P1 — Stack / Layers  
**Source material:** Part 1 (Basic Card Blocks), Part 7A (SP template)

**Layout:**

4 main panels + 1 optional panel stacked vertically, top to bottom:

> **Note on block count:** Part 1 explicitly defines **4 basic card blocks** (SP, Description, Examples, Greeting). Lorebook is covered separately in Part 7B and is optional. The visualization shows all 5 for completeness, with Lorebook visually distinguished as optional.

```
┌─────────────────────────────────────────────┐
│ SP (System Prompt)                          │ ← thinnest, BORDER-ONLY frame (no fill)
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │ ← dashed inner border = "container"
├─────────────────────────────────────────────┤
│ Description                                 │ ← widest panel
│   • Facts, Anchors, SPINE, OCEAN           │
│   ┌─ Anchors ──────────────────────────┐    │ ← optional callout, not nested here
│   └────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│ Examples + Anchors                          │ ← medium panel
│   ┌─ Anchors ──────────────────────────┐    │ ← NESTED sub-panel, violet accent
│   │  T→A→P format                      │    │
│   └────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│ Greeting                                    │ ← narrow panel
├─────────────────────────────────────────────┤
│ Lorebook (optional)                         │ ← dashed border = "optional"
└─────────────────────────────────────────────┘
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| SP rendered as **border-only frame** with dashed inner line | MODIFICATION: SP is a container, not a content block. Fill = 0. Border only communicates "I hold things, I am not a thing." This resolves contradiction #6 visually |
| Panel height proportional to token budget | SP = 40px, Description = 120px, Examples = 90px, Greeting = 50px, Lorebook = 40px |
| Anchors as violet-accented sub-panel inside Examples only | Resolves contradiction #3: Anchors live in Examples. Description mentions them in a callout, but they're structurally nested in Examples |
| Right-side annotations in mono | Token counts: min/standard/max per block. Uses `--font-mono` JetBrains Mono |

**Annotations (right-side callouts):**

> **Note:** Token budgets below are TOTAL per block. For Examples, the per-example budget is 40/60/80 tokens (Part 7A); total depends on example count (2-5). Lorebook is not in the main budget table of Part 7A but is estimated from Part 7B context budgets.

| Block | Min | Standard | Max | Source |
|-------|-----|----------|-----|--------|
| SP | ~50 | ~100 | ~200 | Part 7A |
| Description | ~150 | ~300 | ~700 | Part 7A |
| Examples (total, 2-5) | ~80 | ~180 | ~400 | Part 7A — per-example: 40/60/80 x 2-5 examples |
| Greeting | ~40 | ~60 | ~100 | Part 7A |
| Anchors (each) | ~15 | ~25 | ~40 | Part 7A |
| Lorebook | ~0 | ~100 | ~300 | Estimated from Part 7B |

**Scroll animation:** Panels slide in from left with stagger (80ms delay each). SP frame draws its border (dashoffset animation).

**Cross-reference:** Small badge at bottom: "→ Full blueprint: E15"

---

### E02 — Assembly Pipeline

**File:** `visual-system/elements/E02-assembly-pipeline.html`  
**Pattern:** P2 — Flow / Pipeline  
**Source material:** Part 7A (Assembly Pipeline walkthrough)

**Layout:** Horizontal flow, left to right, 6 main nodes + 4 optional nodes (matching the actual Assembly Pipeline structure in Part 7A).

```
MAIN FLOW:
Identity → Anti-godmoding → CORE DIRECTIVES → SPINE (in Description) → CoT → Budget Check
                                                                              ↓
                                                                 [Diagnostic Loop] ← amber dotted arc
                                                                              ↓
                                                                 back to SPINE or Directives

OPTIONAL STEPS (branching after Budget Check):
  ├─ FLAW-linked Anchors
  ├─ OCEAN + Enneagram
  ├─ Lorebook
  └─ Author's Note
```

> **CORRECTION v1.2:** The actual Assembly Pipeline in Part 7A has **6 main steps**, not 9 as previously claimed. The pipeline describes the SP assembly walkthrough for Елена: (1) Identity Block ("You are {{char}}"), (2) Anti-godmoding (2 lines), (3) CORE DIRECTIVES (all 7), (4) SPINE written in Description, (5) CoT (optional for 32B+/API), (6) Token Budget Check. After these 6, there are 4 additional optional steps: FLAW-linked Anchors, OCEAN+Enneagram, Lorebook, Author's Note. The previous version of this plan fabricated a 9-step "Idea → Deploy" pipeline that does not exist in the guide. This has been corrected to match the actual Part 7A content.

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| Pipeline restructured to match actual guide | CORRECTION v1.2: The actual Part 7A pipeline is an SP-assembly walkthrough, not a card-design lifecycle. 6 main + 4 optional nodes reflect the real structure |
| Identity as first node | Part 7A Step 1: Identity Block = "You are {{char}}". The foundation of SP |
| Anti-godmoding as Step 2 | Part 7A Step 2: Two lines (negative + positive). Mandatory for all cards |
| CORE DIRECTIVES as Step 3 | Part 7A Step 3: All 7 directives inserted into SP |
| SPINE as Step 4 ("in Description") | Part 7A Step 4: GHOST→LIE→FLAW→NEED→WANT written inside Description. Sub-label in violet |
| CoT as optional node (dashed border) | Part 7A Step 5: Only for models ≥32B/API. Dashed border + "Optional" badge |
| Budget Check as final mandatory node | Part 7A Step 6: Verify token compliance before deploy |
| Optional steps branch below main flow | 4 optional items (Anchors, OCEAN, Lorebook, AN) branch from Budget Check with dashed connectors |
| Feedback loop rendered as arc beneath main flow | Amber dotted arc from Budget Check → Diagnostic → back to SPINE or Directives. Visually distinct from forward flow |

**Node design:**
- Rounded rectangles (`--radius-md: 8px`)
- Background: `--bg-panel`
- Border: `--border` (1px)
- Label: DM Sans 600, 14px
- Forward arrows: solid cyan, 2px
- Feedback arrow: dashed amber, 1.5px, arc path below

**Active state:** When a node is hovered, it gets `--border-active` and a left-edge cyan glow. The feedback loop highlights if "Budget Check" is hovered.

**Scroll animation:** Nodes appear sequentially left-to-right (stagger 80ms). Feedback arc draws after all nodes land (dashoffset).

---

### E03 — Behavioral Anchor: T→A→P

**File:** `visual-system/elements/E03-behavioral-anchor.html`  
**Pattern:** P5 — Comparison (split-view)  
**Source material:** Part 2 (Behavioral Anchors)

**Layout:** Two columns side by side.

```
┌─── Correct ───────────┐    ┌─── Incorrect ──────────┐
│                        │    │                        │
│  ┌──────────┐          │    │  ┌──────────┐          │
│  │ Trigger  │          │    │  │ Trigger  │──── ──── │─→ Price (bypass!)
│  └────┬─────┘          │    │  └────┬─────┘    │     │
│       ↓                │    │       ↓          ↓     │
│  ┌──────────┐          │    │  ┌──────────┐ ┌──────┐ │
│  │ Action   │  ← [E4] │    │  │ Action   │ │Price │ │
│  │ +Embodiment badge   │    │  │ (empty)  │ │(deferred)│ │
│  └────┬─────┘          │    │  └────┬─────┘ └──────┘ │
│       ↓                │    │       ↓                │
│  ┌──────────┐          │    │  ┌──────────┐          │
│  │ Price    │          │    │  │ (skipped)│          │
│  │ (physical,│         │    │  │          │          │
│  │  immediate)│        │    │  │          │          │
│  └──────────┘          │    │  └──────────┘          │
│                        │    │                        │
│  ✅ Smooth flow        │    │  ❌ Bypass arrow       │
│  ✅ Physical price     │    │  ❌ No embodiment      │
│  ✅ Embodiment inside  │    │  ❌ Deferred price     │
└────────────────────────┘    └────────────────────────┘
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **No inset Embodiment detail** inside Action node | MODIFICATION: E3 is a comparison diagram. Nesting E4's full 4-layer stack inside one node creates visual noise. Instead: Action node on "Correct" side has a small badge `[↳ E4]` linking to the full Embodiment element |
| **Bypass arrow** from Trigger directly to Price on Incorrect side | This is the single most important visual in the element. A dashed red arrow jumping from Trigger to Price, labeled "bypass", immediately communicates the core error |
| **Price on Incorrect side = "abstract/deferred"** | CORRECTION v1.1: Show Price as "abstract/deferred" (the wrong kind: "will regret later", non-physical) vs "physical, immediate, in-scene" (the right kind). The original plan erroneously called the wrong Price "immediate" which is actually the correct type per Part 2 |

**Color coding:**
- Correct column: cyan left border (`--accent-cyan`), subtle cyan glow
- Incorrect column: amber left border (`--accent-amber`), subtle amber glow
- Bypass arrow: `--danger` dashed line
- `[↳ E4]` badge: violet pill, links conceptually to E04

**Scroll animation:** Both columns slide in from their respective sides. Bypass arrow draws last with a 200ms delay.

---

### E04 — Embodiment Protocol

**File:** `visual-system/elements/E04-embodiment-protocol.html`  
**Pattern:** P1 — Stack / Layers (compact)  
**Source material:** Part 2 (Embodiment Protocol: State→Body→Sensor→Speech)

**Layout:** 4 horizontal bars, stacked vertically, decreasing width.

```
┌─────────────────────────────────────────┐
│ State        "Heart pounding, palms damp"│  ← widest
├─────────────────────────────────────┤
│ Body          "Shoulders tense, jaw tight"│  ← slightly narrower
├─────────────────────────────────┤
│ Sensor   "Smell of antiseptic, cold metal"│  ← narrower still
├───────────────────────────┤
│ Speech  "I... I can't do this."          │  ← narrowest
└───────────────────────────┘
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| Decreasing width = filtration metaphor | Each layer narrows: internal state is broad, speech is refined/filtered output. This physically shows "funneling" |
| Example text on right side in `--font-mono` | Technical, data-like presentation fits the blueprint aesthetic |
| Link-back annotation: "Embodiment = mechanism inside Anchor Action" | Small violet callout at top, referencing E03 |

**Bar design:**
- Background: `--bg-panel`
- Left accent strip: `--accent-violet`, 2px
- Layer name: DM Sans 600, left-aligned
- Example: JetBrains Mono 450, right-aligned, `--text-secondary`
- Downward arrows between layers: `--accent-violet`, 1.5px

**Scroll animation:** Bars slide down from above, staggered 100ms, with a subtle "settle" bounce.

---

### E05 — SPINE Framework

**File:** `visual-system/elements/E05-spine-framework.html`  
**Pattern:** P2 — Flow (horizontal cascade with vertical offset)  
**Source material:** Part 4 (SPINE Framework)

**Layout:** 5 nodes in a horizontal cascade, each offset slightly downward.

```
GHOST ──→ LIE ──→ FLAW ──→ NEED ──→ WANT
  │        │        │        │        │
  +        ▼        ▼        ▼        ▼
(expand)  example  example  example  example
  │
  └──→ [E6 GHOST Layers]
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Horizontal cascade with offset** (not 45° diagonal) | MODIFICATION: 45° diagonal breaks on narrow screens. Horizontal with ~20px vertical offset per node preserves the "domino/cascade" feel while staying readable at all widths |
| Hexagonal/chamfered nodes | Psychological content ≠ mechanical pipeline. Sharper corners distinguish SPINE from the rounded Assembly Pipeline (E02) |
| GHOST node has expand icon (`+`) | Links to E06. On click, could show a brief tooltip or expand inline |
| Violet arrows between nodes | SPINE is the psyche layer. Violet = personality/psychology semantic |

**Node content:**
- Icon (small SVG per element: ghost, mask, crack, heart, star)
- Name: DM Sans 600
- One-line example event: `--text-secondary`, `--font-body`, 12px
  - GHOST: "Betrayal by editor"
  - LIE: "I can't trust anyone"
  - FLAW: "Pushes people away"
  - NEED: "Genuine connection"
  - WANT: "Control over relationships"

**Arrows:** Solid violet, 1.5px, with arrowhead. Direction: left-to-right, causal flow.

**GHOST expand:** Small `+` icon on GHOST node. On hover, tooltip: "3 internal layers → See E06". On click, could expand inline (stretch goal for prototype phase).

**Scroll animation:** Nodes appear left-to-right, staggered 120ms. Arrows draw between them (dashoffset, 300ms each).

---

## Phase 2B — Elements E06–E10

### E06 — GHOST Layers

**File:** `visual-system/elements/E06-ghost-layers.html`  
**Pattern:** P4 — Concentric rings  
**Source material:** Part 4 (GHOST Layers: 3-tier trauma depth)

**Layout:** 3 concentric rings around a central core wound label.

```
         ┌─────────────────────────────┐
         │     G1 — Surface            │
         │   "Avoids commitment"       │
         │  ┌───────────────────────┐  │
         │  │   G2 — Secondary      │  │
         │  │  "Abandoned at 16"    │  │
         │  │  ┌─────────────────┐  │  │
         │  │  │  G3 — Core      │  │  │
         │  │  │ "Father left    │  │  │
         │  │  │  when I was 5"  │  │  │
         │  │  └─────────────────┘  │  │
         │  └───────────────────────┘  │
         └─────────────────────────────┘
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Timeline labels** on each ring | CORRECTION v1.1: G1 = "Childhood (0–12): origin → forms LIE", G2 = "Youth (13–25): reinforced → strengthens FLAW", G3 = "Present: triggers now". The original plan had G1 and G3 swapped, contradicting Part 4 where G1 is the deepest layer (origin) and G3 is the surface (present triggers). Rings without temporal context are decorative. With timelines, they become a diagnostic tool |
| Depth gradient: light violet (outer) → deep violet (inner) | Violet at 20%/40%/65% opacity. Core glows `--glow-violet`. Outer ring = G3 (present, surface), Inner ring = G1 (origin, core) |
| Each ring has: timeline label + example event + causal note | "G1 → formed LIE", "G2 → reinforced FLAW", "G3 → current trigger" |
| Link-back: "GHOST = Layer 1 of SPINE (E05)" | Small dotted connector with arrow pointing toward E05's position |

**Implementation:**
- SVG circles with decreasing radii
- Text labels positioned on the right side of each ring
- Radial gradient background (violet center fading to `--bg-deep`)
- Subtle inner glow on core circle

**Scroll animation:** Rings expand outward from center (scale 0→1, staggered 200ms, ease-out-expo). Core appears first.

---

### E07 — Voice Influence Hierarchy

**File:** `visual-system/elements/E07-voice-hierarchy.html`  
**Pattern:** P5 — Grouped bar chart  
**Source material:** Part 3 (Voice & Isolation), Part 7A (Token Budget)

**Layout:** Horizontal grouped bar chart.

```
                    12B    32B+   API
SP              ▓░░░░   ▓░░░░░  ▓░░░░░░   ← low influence
Description     ▓→0%    ▓░░░░░  ▓░░░░░░   ← 12B = 0% (RED MARKER)
Examples        ▓░░░░░░░░░░░░░░░░░░░░░░   ← highest influence
Greeting        ▓░░░░░  ▓░░░░░  ▓░░░░░░
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Red × marker** for 12B Description = 0% | This is the visual anchor point. It must be the most eye-catching element in the chart |
| **Inset box:** "Storage vs Influence" | Resolves contradiction #1: "Storage" (where voice patterns are written) ≠ "Influence" (what shapes model behavior). Recent Chat is the top influencer, not SP. Voice lives in Examples only |
| All bars: `--accent-cyan` at 100% | Single color for all bars keeps focus on magnitude differences, not category coding |
| Zero-influence bar: thin `--danger` line at 0 + `×` marker | The only red element in the chart — pops immediately |
| Grouped by block (Y-axis), three bars per group (12B/32B+/API) | Natural reading: "for each block, how much does it influence voice at each model tier?" |

**Approximate data (from Part 3 Voice Influence table):**

| Source | 12B | 32B+ | API | Note |
|--------|-----|------|-----|------|
| Recent Chat | ~85% | ~80% | ~75% | Largest influence — explains voice drift over time |
| Examples | ~10% | ~12% | ~15% | Primary card-level voice source |
| Greeting | ~3% | ~5% | ~5% | First impression, tone setter |
| Author's Note | ~2% | ~3% | ~5% | Periodic reinforcement (→ E16) |
| Description | **0%** | ~3% | ~5% | 12B = FORBIDDEN for voice. RED MARKER |
| System Prompt | 0% | ~1% | ~2% | Near-zero voice influence |

> **CORRECTION v1.1:** The original plan had fabricated data that significantly inflated percentages (SP ~8% vs real ~2%, Examples ~25% vs real ~15%) and omitted the two largest influence sources (Recent Chat and Author's Note). "Lorebook" was included but does not appear in the Voice Influence table of Part 3. The correct data above is taken directly from Part 3.

> **Chart design note:** Recent Chat dominates so heavily (~75-85%) that a linear scale would make card-level sources invisible. Consider a **logarithmic scale** or a **split axis**: top section shows Recent Chat on a compressed scale, bottom section shows card sources on a zoomed scale. The "Storage vs Influence" inset box remains valid and important.

**Implementation:** D3.js or hand-crafted SVG bars. Grid lines at 5% intervals in `--border` at 20% opacity.

**Scroll animation:** Bars grow from 0 to their value, staggered by row (80ms), 600ms ease-out.

---

### E08 — CORE DIRECTIVES

**File:** `visual-system/elements/E08-core-directives.html`  
**Pattern:** P4 — Hub-and-spoke  
**Source material:** Part 7A (7 CORE DIRECTIVES)

**Layout:** Central hub + 7 radiating nodes in a heptagon.

```
              [4: Env Reactivity]
                    |
  [3: Spatial Lock] | [5: Influence Boundary]
         \          |          /
          \         |         /
           \        |        /
  [2: Embodiment]--[CORE]--[6: Consequence Driven]
           /        |        \
          /         |         \
         /          |          \
  [1: Show Never Tell]  [7: Pre-Gen Filter]
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Model capability notes** on directives 6 and 7 | CORRECTION v1.2: Part 7A uses `[Model: see Appendix B — Model Capability Table]` notes on Directives 6 and 7, not formal tier badges. The visualization should display this as a small `[Model ↗]` link badge in `--accent-cyan` that references the Model Capability Table (Appendix B). Do NOT invent tier badges ("32B+", "API-only") that don't exist in the guide text |
| No custom icons initially | Icons are nice-to-have. Version 1 uses directive number + short name. Icons can be added in a polish pass |
| Center node: "CORE" in Display font | `--font-display` Bricolage Grotesque 700. Cyan filled circle with `--glow-cyan` |
| Spokes: thin cyan lines, 1px | Minimal, not overwhelming. Hovered spoke thickens to 2px |

**Node content per directive:**

| # | Name | Summary | Badge |
|---|------|---------|-------|
| 1 | Show Never Tell | Demonstrate through behavior, never declare | — |
| 2 | Embodiment First | State → Body → Sensor → Speech. Always | — |
| 3 | Spatial & Anatomical Lock | Track distance, posture, weight | — |
| 4 | Environmental Reactivity | Sensory details only through character action | — |
| 5 | Influence Boundary | React to observable symptoms only | — |
| 6 | Consequence Driven | WANT shifts toward NEED as Price accumulates | `[Model ↗]` |
| 7 | Pre-Generation Filter | 4-item self-check before response | `[Model ↗]` |

**Scroll animation:** Center node pulses once. Spokes draw outward sequentially (100ms each). Outer nodes fade in after their spoke completes.

---

### E09 — OCEAN Pentagon

**File:** `visual-system/elements/E09-ocean-pentagon.html`  
**Pattern:** P4 — Radar / Spider chart (pentagon)  
**Source material:** Part 5 (OCEAN Model), `data/ocean.json`

**Layout:** 5-axis radar on a pentagon grid.

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Threshold zones:** <30 = `--danger` tint, >70 = `--accent-amber` tint, 40–60 = `--success` tint | Immediately shows "danger zones" and "safe ranges" |
| **Context Limits annotation** | MODIFICATION: Critical information from the guide that was missing from the spec. Inset box: "Context Limits: 4K→1–2 extremes | 8K→2–3 | 16K+→3–4 | 32K+→5" |
| **Character profile overlay** | Semi-transparent filled pentagon in `--accent-cyan` at 30% with data points at each axis |
| Cross-reference badge: "Validates SPINE output (E05)" | Resolves contradiction #2: OCEAN is a validation tool, not a generator |

**Approximate data for Elena (from Part 10):**

| Trait | Value |
|-------|-------|
| Openness | 72 ← extreme (>70) |
| Conscientiousness | 65 |
| Extraversion | 41 |
| Agreeableness | 38 |
| Neuroticism | 68 |

**Implementation:** D3.js radar chart or hand-crafted SVG. 5 concentric pentagon gridlines (0/25/50/75/100 scale).

**Scroll animation:** Pentagon grid draws with "trace" effect (stroke-dashoffset). Character overlay fades in 300ms after grid completes.

---

### E10 — Enneagram × SPINE Mapping

**File:** `visual-system/elements/E10-enneagram-spine.html`  
**Pattern:** P4 — Radial (circle + connections)  
**Source material:** Part 5 (Enneagram), `data/enneagram.json`

**Layout:** Classic enneagram circle (9 points) with internal triangle (3-6-9) and 4 external SPINE callout boxes.

```
        [Fear → LIE] ───────── 9
       /                     / | \
      /                     /  |  \
     1                   8    |    3
     |                   |  6─┘    |
     |                   | / \     |
     4─────────────────5/     \2───/
     \                   \    /
      \                   \  /
       [Stress → FLAW]     [Desire → WANT]
                              [Growth → NEED]
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Interactive mini-cards on hover** | MODIFICATION: 4 static callout boxes is too reductive. Each of the 9 types, when hovered, shows a mini-card with: core Fear, core Desire, LIE template, FLAW pattern. This makes the circle a functional tool, not just a diagram |
| Stress arrows in `--danger` thin arrows | Direction: toward stress point |
| Growth arrows in `--success` thin arrows | Direction: toward growth point |
| Internal triangle (3-6-9) in `--accent-violet` dashed | Primary triad |
| Cross-reference: "Cross-validate with OCEAN (E09)" | Small badge linking to E09 |

**SPINE callout boxes (4, always visible):**

| Callout | Position | Content |
|---------|----------|---------|
| Fear → LIE | Top-right | "Core fear generates the LIE belief" |
| Desire → WANT | Bottom-right | "Conscious desire maps to WANT" |
| Stress → FLAW | Top-left | "Stress direction reveals FLAW pattern" |
| Growth → NEED | Bottom-left | "Growth direction points toward NEED" |

**Implementation:** SVG circle with positioned points. Hover mini-cards via CSS or lightweight JS. Enneagram data from `data/enneagram.json`.

**Scroll animation:** Circle draws (stroke-dashoffset). Points appear in sequence (1→9). Callout boxes fade in last.

---

## Phase 2C — Elements E11–E15

### E11 — CoT Tiers

**File:** `visual-system/elements/E11-cot-tiers.html`  
**Pattern:** P1 — Stack (staircase variant)  
**Source material:** Part 6 (CoT: Chain of Thought)

**Layout:** 4 ascending steps, bottom-left to top-right.

```
                              ┌─────────────────────┐
                              │ Tier 3: Full XML     │
                              │ <processus_analysium>│
                              │ [API] badge          │
                        ┌─────┴─────────────────┐
                        │ Tier 2: GHOST-link     │
                        │ [INTERNAL: GHOST]...   │
                        │ [32B+] badge           │
                  ┌─────┴───────────────────┐
                  │ Tier 1: Emotion tag      │
                  │ [Anxiety] → Reaction     │
                  │ [32B] badge              │
            ┌─────┴───────────────────────┐
            │ Tier 0: No CoT              │
            │ Stress → Rubs neck          │
            │ [12B+] badge                │
            └─────────────────────────────┘
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Format code-snippets on each step** | MODIFICATION: Abstract "higher = harder" is useless. Each step must show the ACTUAL FORMAT in `--font-mono`. This transforms the staircase from decorative to functional — a quick-reference tool |
| Tier 0: `--text-muted` color = baseline | No CoT = default, nothing special |
| Tiers 1–3: progressive cyan intensity | 40% → 70% → 100% + glow. Visual progression matches cognitive complexity |
| Model badges as colored pills | 12B = gray, 32B = cyan, API = violet. Instant scannability |
| Tier 0 labeled "Optional: start here" | Resolves contradiction #4: CoT is not mandatory |

**Step content:**

| Tier | Format example | Model |
|------|---------------|-------|
| 0 | `Stress → Rubs neck` | 12B+ (all) |
| 1 | `[Anxiety] → Re-reads message 3x` | 32B basic |
| 2 | `[Reminds of betrayal] → Closes off` + `[INTERNAL: GHOST]...[/INTERNAL]` | 32B+ recommended |
| 3 | `<processus_analysium>stimulus→analysis→synthesis→resolution</processus_analysium>` | API only |

**Scroll animation:** Steps slide in from bottom-left, staggered 150ms, with a subtle "stack" effect.

---

### E12 — Antipattern Catalog

**File:** `visual-system/elements/E12-antipattern-catalog.html`  
**Pattern:** P5 — Grid / Matrix  
**Source material:** Part 8 (Anti-patterns: AP-1 through AP-15)

**Layout:** Grid of compact cards.

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **15 cards in a 5×3 grid** (not 4×4) | MODIFICATION: Repository has AP-1 through AP-15 (15 items). 5×3 = 15 exactly. No empty cell |
| Two severity levels only: High (red) / Medium (amber) | Repository uses only High/Medium. No Low severity. Two dot colors = clean. CORRECTION v1.1: AP-4 (GHOST in SP) is High, AP-7 (Presence Penalty > 0) is Medium — these were swapped in v1.0 |
| Card content: AP number + severity dot + one-line symptom + cause→fix | Compact but scannable |
| Hover: card scales 1.02, reveals full "Fix" text | Progressive disclosure |

**Card layout:**

```
┌─────────────────────────────┐
│ AP-3                   ●    │  ← severity dot (top-right)
│ Voice in Description         │  ← symptom (DM Sans 600)
│ Cause: Voice leak from       │  ← cause (truncated)
│ Fix: Move to Examples        │  ← fix (hidden until hover)
└─────────────────────────────┘
```

**All 15 antipatterns (from Part 8):**

| AP | Symptom | Severity |
|----|---------|----------|
| 1 | Token Bloat | High |
| 2 | Missing Price | High |
| 3 | Voice in Description | High |
| 4 | GHOST in SP | High |
| 5 | RepPen > 1.10 | Medium |
| 6 | No Anti-godmoding | High |
| 7 | Presence Penalty > 0 | Medium |
| 8 | GHOST Without Anchors | Medium |
| 9 | Broken SPINE | High |
| 10 | CoT Overload | Medium |
| 11 | Voice Bleed | High |
| 12 | XML Malformed | Medium |
| 13 | Lorebook Conflict | Medium |
| 14 | Context Violation | High |
| 15 | Nested Anchors | Medium |

**Scroll animation:** Cards fade in with stagger (40ms), row by row.

---

### E13 — Diagnostic Decision Tree

**File:** `visual-system/elements/E13-diagnostic-tree.html`  
**Pattern:** P3 — Tree / Branching  
**Source material:** Part 9 (Diagnostics & Testing)

**Layout:** Top-down binary tree, 3–4 levels deep.

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Top 3 symptoms as entry points** (not full symptom table) | MODIFICATION: The full tree is too wide/deep for one viewport. Show top-3 most common symptoms as roots. Each expands into a sub-tree. Collapsible branches |
| Diamond shapes for Yes/No decision points | Standard flowchart convention |
| Terminal nodes = diagnoses with AP reference chips | Links to E12. E.g., "Voice Leak → See AP-3, AP-11" |
| Collapsible sub-trees | Click a decision diamond to expand/collapse its branch. Default: only first 2 levels visible |

**Top 3 entry symptoms (from Part 9):**

1. "Character drifts after 5–10 messages" → leads to SPINE/Anchor diagnostics
2. "Voice sounds generic" → leads to Voice Isolation diagnostics
3. "Character ignores actions" → leads to Embodiment/Directive diagnostics

**Node shapes & colors:**
- Decision diamonds: `--accent-cyan` stroke, `--bg-panel` fill
- Yes paths: `--success` thin arrows
- No paths: `--text-muted` thin arrows
- Terminal diagnoses: `--bg-panel` fill, `--border-active` stroke, with AP chip(s) in cyan

**Scroll animation:** Nodes appear breadth-first (level by level). Terminal nodes last.

---

### E14 — Quality Scale

**File:** `visual-system/elements/E14-quality-scale.html`  
**Pattern:** P1 — Stack (thermometer variant)  
**Source material:** Part 9 (Quality Scale, Pre-Deploy Validation)

**Layout:** Vertical continuous bar with marked zones + 5 quick checks.

```
    ┌──────┐
    │██████│ Excellent (85–100%)
    │██████│ ← Pass all 14 Pre-Deploy checks
    │▓▓▓▓▓▓│
    │▓▓▓▓▓▓│ Good (50–85%)
    │▓▓▓▓▓▓│ ← Stable 10+ msgs, recognizable voice
    │░░░░░░│
    │░░░░░░│ Poor (25–50%)
    │░░░░░░│ ← Follows rules but drifts
    │      │
    │      │ Critical (0–25%)
    │      │ ← Violates ≥2 basic rules
    └──────┘

    Quick Checks:           ┌─────────────────────┐
    ☐ PP = 0.0              │ ← links to Good zone │
    ☐ Voice only in Examples│                     │
    ☐ Price in every Anchor │                     │
    ☐ Format Lock (1 system)│                     │
    ☐ Anti-godmoding (2 ln) │                     │
    └─────────────────────┘
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **4 zones** (Critical / Poor / Good / Excellent) instead of 3 | MODIFICATION: Guide has Critical/Bad/Good. Adding "Excellent" with criteria from the 14-item Pre-Deploy Full Checklist (Part 9) gives users an aspirational target. Annotated: "Excellent = pass all 14 Pre-Deploy checks" |
| 5 Quick Checks as checkboxes alongside the bar | CORRECTION v1.1: Replaced abstract items (Voice isolation, Anchor quality, etc.) with the actual 5 Quick Pre-Deploy Checks from Part 9: (1) PP=0.0, (2) Voice only in Examples, (3) Price in every Anchor, (4) Format Lock, (5) Anti-godmoding. Each is concrete and checkable, not abstract |
| Continuous gradient fills at 25% opacity | Red→Amber→Cyan→Violet. Gradient = continuum, not discrete steps |
| Horizontal indicator line | Shows "current level" with triangular marker. Can be interactive (drag to set) |

**Zone criteria:**

| Zone | Range | Criteria |
|------|-------|----------|
| Critical | 0–25% | Violates ≥2 basic rules: no Price, voice in Description, PP>0 |
| Poor | 25–50% | Follows rules but character drifts after 5–10 messages |
| Good | 50–85% | Stable 10+ messages, recognizable voice, Price appears consistently |
| Excellent | 85–100% | Passes all 14 Pre-Deploy checks: Voice isolation, Anchor quality, Token budget, SPINE consistency, Embodiment completeness, No antipatterns, Format Lock valid, Sampling correct, etc. |

**Scroll animation:** Bar fills from bottom to top (800ms). Quick check items fade in staggered (60ms).

---

### E15 — Final Walkthrough: Annotated Blueprint

**File:** `visual-system/elements/E15-annotated-blueprint.html`  
**Pattern:** P6 — Blueprint / Annotated Card  
**Source material:** Part 10 (Full Card Examples — Елена)

**Layout:** Central card template (Елена) surrounded by toggleable callout layers.

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Real card (Елена)** not abstract template | Elena is the simplest complete example from Part 10. Using a real card makes annotations concrete |
| **Toggleable annotation layers** (4 layers) | MODIFICATION: 12 simultaneous callout boxes = visual chaos. Instead, 4 toggle layers the user switches between. Each layer shows only relevant annotations |
| Blueprint grid background at 3% opacity | Gives "technical drawing" feel |
| Monospace content in the card | Real-looking filler text but structurally accurate. `--font-mono` |

**4 annotation layers:**

| Layer | Color | Shows |
|-------|-------|-------|
| Structure | Cyan | Block boundaries, token budgets (→ E01) |
| Anchors | Violet | T→A→P annotations, Embodiment callouts (→ E03, E04) |
| SPINE | Violet | SPINE element markers, GHOST references (→ E05, E06) |
| Directives | Cyan | Which CORE DIRECTIVES apply to each block (→ E08) |

**Toggle UI:** 4 pill buttons at top: `[Structure] [Anchors] [SPINE] [Directives]`. Active layer highlighted, others dimmed.

**Callout lines:** Thin lines (1px) from annotation boxes to specific points in the card. Lines have a small dot at the card connection point. Color matches the active layer.

**Card styling:** `--bg-raised` with `--border-active`. Elevated above the grid.

**Scroll animation:** Card fades in first. Then the default layer (Structure) callouts draw outward from card edges, boxes fade in after lines.

---

---

### E16 — Author's Note Mechanics

**File:** `visual-system/elements/E16-author-note.html`  
**Pattern:** P2 — Flow / Pipeline (vertical timeline variant)  
**Source material:** Part 7A (Author's Note parameters, Template A & B), Part 3 (Voice Influence)

**Why this element was missing:** Author's Note (AN) is the 4th largest voice influence source (~2-5% depending on model tier, per Part 3) and the primary mechanism for long-session voice stabilization. The original plan omitted it entirely, leaving a gap in both the voice influence story (E07) and the assembly pipeline (E02).

**Layout:** Vertical timeline showing AN injection cycle, with Template A/B toggle.

```
Message stream:  ...msg8  msg9  [AN]  msg10  msg11  ...
                                │
                    ┌─────────────────────┐
                    │ Author's Note         │
                    │ Position: 3-5 from end │
                    │ Length: 100-200 tokens │
                    │ Frequency: every 5-10  │
                    ├─────────────────────┤
                    │ Template A (3-section)  │
                    │   State | WANT→NEED  │
                    │   | Blind Spot         │
                    ├─────────────────────┤
                    │ Template B (4-section)  │
                    │   State | WANT→NEED  │
                    │   | GHOST-activation    │
                    │   | Blind Spot         │
                    └─────────────────────┘
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **Template A/B toggle** | Part 7A defines two templates: A (3-section, no GHOST) for basic cards and B (4-section, with GHOST-activation) for SPINE cards. Toggle shows both |
| **Position indicator on message stream** | Visualizes "3-5 messages from end" — the most misunderstood AN parameter |
| **Cross-reference: E07** | AN is ~2-5% voice influence. Badge linking to E07 data |
| **Cross-reference: E05** | Template B references GHOST-activation. Badge linking to E05 |

**Scroll animation:** Message stream scrolls horizontally. AN card slides in at the correct position. Template sections expand sequentially.

---

### E17 — Sampling Parameters by Model Tier

**File:** `visual-system/elements/E17-sampling-params.html`  
**Pattern:** P5 — Comparison (grouped columns)  
**Source material:** Part 7A (Sampling Parameters table, Model Type Checklist)

**Why this element was missing:** Sampling parameters are the most frequently misconfigured aspect of character cards (AP-5: RepPen > 1.10, AP-7: Presence Penalty > 0). A quick-reference visualization prevents these errors. The original plan had no way to visualize parameter constraints.

**Layout:** Three-column comparison (12B-14B / 32B+ / API), each showing parameter cards.

> **Note on parameter sources:** Part 7A contains multiple parameter tables with slightly different values. The main "Base parameters" table provides ranges by context tier (12B / 12B-32B / 32B+ API). A separate "Model Type Checklist" table provides ranges by model tier (12B-14B / 32B+ / API). The values below are taken from the Model Type Checklist table, which is the most commonly referenced. Where the tables disagree, both ranges are shown in the visualization as a sub-label.

```
┌─── 12B-14B ────┐  ┌─── 32B+ ────┐  ┌─── API ────┐
│ Temp:  0.6-0.8  │  │ Temp:  0.7-0.9* │  │ Temp:  0.8-1.0  │
│ TopP:  0.9      │  │ TopP:  0.9-0.95 │  │ TopP:  0.9-0.95 │
│ MinP:  0.05     │  │ MinP:  0.05-0.1  │  │ MinP:  0.05-0.1  │
│ RepPen: 1.0-1.05│  │ RepPen: 1.0-1.05 │  │ RepPen: N/A      │
│ TopK:  40       │  │ TopK:  40-80     │  │ TopK:  40-100    │
│ PP:    0.0  ⛔   │  │ PP:    0.0  ⛔   │  │ PP:    0.0  ⛔   │
└────────────────┘  └───────────────┘  └───────────────┘
  * Checklist table says 0.85-1.1; base table says 0.7-0.9.
    Show range 0.7-1.1 with both sub-ranges annotated.
```

**Key decisions:**

| Decision | Rationale |
|----------|-----------|
| **PP = 0.0 always, with danger marker** | Presence Penalty > 0 is AP-7. This must be the most visually prominent row — red `\u26d4` marker on all three columns |
| **RepPen range with amber warning above 1.10** | RepPen > 1.10 is AP-5. Show the threshold with a marker |
| **12B column uses muted colors** | 12B models have the most constrained parameters. Visual hierarchy: API (bright) > 32B+ (normal) > 12B (muted) |
| **Additional checklist row** | Below the table, show the Model Type Checklist from Part 7A: Voice placement, XML stability, CoT tier, Anti-godmoding lines |
| **RepPen for 32B+: show both ranges** | Base table: 1.05-1.10; Checklist table: 1.0-1.05. Visualization should show the overlap range 1.0-1.05 as recommended (green) and 1.05-1.10 as acceptable-with-caution (amber) |

**Cross-reference:** Small badge: "Related antipatterns: AP-5, AP-7 → E12"

**Scroll animation:** Three columns slide in from bottom, staggered 150ms. Danger markers (PP, RepPen threshold) pulse once after landing.

## Phase 3 — Cross-Element Links, Navigation, QA

### 3.1 — Cross-Element Visual Links

Implement the 5 cross-reference links defined in the spec:

| Link | Implementation |
|------|---------------|
| E03 → E04 | Small violet dotted line from "Action" node in E03 to a reference card saying "→ E04: Embodiment Protocol". In standalone files, this is a visual link (styled text + icon). In integrated version, it becomes a scroll-to link |
| E05 → E06 | Small violet line from GHOST node in E05 to a reference saying "→ E06: GHOST Layers". GHOST expand icon links visually |
| E09 ↔ E10 | Thin dashed cyan line reference in both files: E09 has "Cross-validate with Enneagram (E10)", E10 has "Cross-validate with OCEAN (E09)" |
| E12 → E13 | In E13, terminal diagnosis nodes include AP reference chips like "→ AP-3" in cyan pill badges |
| E01 → E15 | E01 has a badge at bottom: "→ E15: Full Blueprint". E15's Structure layer uses same proportions as E01 |
| E07 → E16 | E07 shows Author's Note as a voice influence source. Badge: "→ E16: AN Mechanics" |
| E17 → E12 | E17 shows RepPen > 1.10 threshold and PP > 0 danger. Badge: "→ AP-5, AP-7 in E12" |
| E02 → E16 | E02 pipeline includes AN injection step. Dashed link to E16 detail |

### 3.2 — Mini-Map Navigation Component

Create a reusable mini-map component that appears at the top of each element file:

```
┌────────────────────────────────────────────────────────────────────────────┐
│ FOUNDATION        CORE MECHANICS        PERSONALITY        ADVANCED       │
│ E01 E02      E03 E04 E07 E08      E05 E06 E09 E10    E11 E12 E13 E14 E16 E17 │
│               ●                            ●                              │
│          (you are here)               (you are here)                       │
└────────────────────────────────────────────────────────────────────────────┘
```

- Current element highlighted with `--accent-cyan` dot
- Section labels in `--text-muted`
- Element numbers in `--text-secondary`
- Compact, single line, no wrapping

### 3.3 — QA Checklist

File: `visual-system/QA-CHECKLIST.md`

For each element, verify:

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

---

## Phase 4 — Integration into Guide Build

### 4.1 — Integration Map

File: `visual-system/integration/INTEGRATION-MAP.md`

| Element | Target in Guide | How | Text to Remove/Shorten | Dedup Risk |
|---------|-----------------|-----|------------------------|------------|
| Hero (3D) | Landing page / Part 1 intro | Replace or supplement existing Mermaid concept diagram. Embed as `<iframe>` or port to static shell widget. **Make optional** — bandwidth-constrained users get static fallback | Remove Mermaid diagram if replaced | Low — hero is additive |
| E01 | Part 1, Section 1.1 | Replace text-based card anatomy. Inline SVG with CSS variable bindings to `shell-styles.css` | Shorten Part 1 block descriptions to 1-2 sentences + "See visualization above". Remove token budget table (now in E01 annotations) | Medium — Part 1 describes blocks textually |
| E02 | Part 7A, Assembly Pipeline section | Replace step-by-step pipeline text with SVG pipeline visualization | CORRECTION v1.2: The actual pipeline has 6 main steps + 4 optional. Remove the fabricated 9-step walkthrough; keep rationale and rules for each step | High — plan previously had wrong pipeline |
| E03 | Part 2, Section 2.1 | Replace text-based T→A→P explanation. Side-by-side SVG comparison | Shorten correct/incorrect examples to 1 line each; visual carries the comparison | Low — visual replaces text comparison |
| E04 | Part 2, Section 2.2 | Replace `.inf-pipeline` Embodiment diagram. Stack SVG | Remove the textual State→Body→Sensor→Speech walkthrough; keep the rule ("always apply Embodiment") | Low |
| E05 | Part 4, Section 4.1 | Replace Mermaid SPINE diagram. SVG cascade with expand interaction | Shorten SPINE element descriptions to 1 sentence + tooltip in SVG | Medium — Part 4 has detailed element descriptions |
| E06 | Part 4, Section 4.3 (GHOST Layers) | New visualization. Concentric SVG rings | Remove textual G1/G2/G3 descriptions; timeline labels in SVG carry this | Low |
| E07 | Part 3, Section 3.1 | New visualization. Bar chart SVG with D3.js | Replace voice influence table with SVG chart + caption | Medium — table and chart show same data |
| E08 | Part 7A, Section 7.2 | New visualization. Hub-spoke SVG | Keep full directive descriptions as expandable sections under each hub node. Remove the overview paragraph that lists all 7 | High — both show same 7 directives |
| E09 | Part 5, Section 5.1 | Upgrade existing `ocean-insight.js` widget or replace with SVG radar | Remove OCEAN trait descriptions (low/high); SVG threshold zones show this visually | Medium |
| E10 | Part 5, Section 5.3 | Upgrade existing `enneagram-builder.js` widget or supplement with static SVG | Remove enneagram type descriptions from text; hover mini-cards carry this | Medium |
| E11 | Part 6, Section 6.1 | New visualization. Staircase SVG | Remove tier-by-tier text descriptions; format code snippets in SVG carry this | Medium |
| E12 | Part 8 | **Replace** existing `.antipattern-card` components (do not coexist — visual inconsistency risk). Delete old CSS class | Remove AP symptom/fix text blocks; compact cards in SVG carry this. Keep "How to fix" expanded prose as linked sections | High — duplicate card components |
| E13 | Part 9, Section 9.4 | New visualization. Decision tree SVG | Remove textual diagnostic flowcharts; interactive tree replaces them | Low — new addition |
| E14 | Part 9, Section 9.1 | New visualization. Thermometer SVG | Remove Quality Scale text description; Quick Checks list in SVG replaces text list. **Critical:** use correct Quick Checks from Part 9, not abstract ones | Medium — both describe same scale |
| E15 | Part 10 intro | New master reference. Full-page annotated blueprint | Remove Elena card anatomy walkthrough; annotated SVG replaces it. Keep the full card text as reference | Low |
| E16 | Part 7A, AN section | New visualization. Timeline + template toggle | Remove AN parameter list and template text; SVG carries both. Keep rationale prose | Medium |
| E17 | Part 7A, Sampling section | New visualization. Three-column comparison | Remove sampling parameter table; SVG carries it. Keep the "why" explanations for each parameter | High — table and chart show same data |

### Integration Dedup Rules

When a visualization replaces text content, follow these rules to prevent semantic duplication:

1. **Visual replaces structural description.** If the text says "the card has 5 blocks stacked vertically" and the SVG shows exactly that, remove the text description. Keep only a brief caption ("The card structure is shown above") and any rationale/rules not visible in the SVG.
2. **Keep rules, remove examples that the SVG demonstrates.** If the SVG shows a correct vs incorrect Anchor, the textual example can be removed but the rule ("Price must be physical and in-scene") must remain as a callout or caption.
3. **Never duplicate data in both text and SVG.** If the SVG shows token budgets, do not also have a text table with the same numbers. One or the other.
4. **Interactive elements must have text fallbacks.** If a hover reveals content (E10 mini-cards), the same content must exist in an accessible text form for screen readers and no-JS environments.
5. **Mark replaced sections with HTML comments.** In the master HTML files, wrap removed text in `<!-- REPLACED BY VISUAL SYSTEM: EXX -->` comments so the change is reversible.

### 4.2 — Token Migration

Extract all `DESIGN-TOKENS.css` custom properties and merge with existing `assets/shell-styles.css` variables. Key principle: **our tokens extend, never override**, the existing shell variables. If a conflict is detected, it must be resolved manually and documented in `INTEGRATION-MAP.md` with a rationale for which token wins. Automatic override is forbidden — the existing shell styles serve parts of the guide that may depend on specific values.

### 4.3 — SVG Extraction

Each standalone HTML file contains an inline SVG. Extract:
1. The `<svg>` element and its children
2. Inline styles → convert to `class` attributes referencing shared CSS
3. JavaScript interactions → extract to shell widget modules

### 4.4 — Widget Integration

Interactive elements (E09 OCEAN, E10 Enneagram, E13 Decision Tree, E15 Blueprint layers) need their JS logic ported to the shell widget system:

- E09 → integrate with or replace `ocean-insight.js`
- E10 → integrate with or replace `enneagram-builder.js`
- E13 → new widget: `diagnostic-tree.js`
- E15 → new widget: `blueprint-viewer.js`
- E16 → new widget: `author-note-viewer.js`
- E17 → static SVG (no widget needed, no interactivity beyond tooltips)

### 4.5 — Build Pipeline Updates

Update `build-unified.mjs` to:
- Include new SVG assets in the build
- Bundle new widget JS files
- Ensure no `<style>` or `<script>` in master HTML files (existing validation rule)

---

## Performance Budget

### Constraints

| Metric | Target | Maximum | Rationale |
|--------|--------|---------|-----------|
| Per-element SVG size | < 50 KB | 100 KB | 15 elements = max 1.5 MB total SVG |
| Three.js hero scene | < 300 KB | 500 KB | One-time load, cached |
| D3.js usage | E07, E09 only | — | Other elements use hand-crafted SVG or HTML |
| Total CSS (shared + per-element) | < 30 KB | 50 KB | Includes DESIGN-TOKENS + shared + element-specific |
| Total JS (shared + per-element) | < 40 KB | 60 KB | IntersectionObserver + interactions + D3 |
| Animated DOM nodes per element | < 30 | 50 | More = jank on mobile |
| Target FPS (desktop) | 60 | — | All animations must hit 60fps |
| Target FPS (mobile) | 30 | — | Reduced complexity is acceptable |

### Lazy Loading Strategy

1. **IntersectionObserver for all elements** — no animation starts until element enters viewport
2. **Three.js hero** — load via dynamic `import()` only when hero section is near viewport
3. **D3.js** — load library only for E07 and E09; other elements use inline SVG
4. **Font loading** — `font-display: swap` for all @font-face declarations
5. **`prefers-reduced-motion`** — skip all animations, show static final state immediately

### Build Integration Budget

When integrating into the guide build (Phase 4):
- Total added weight to final build must not exceed 500 KB (gzipped)
- SVGs must be inlined (no external file requests)
- D3.js must be tree-shaken or replaced with hand-crafted SVG during integration
- Three.js hero becomes optional (behind "Load 3D scene" button) for bandwidth-constrained users

---

## Accessibility (a11y) Specification

### Minimum Requirements (Phase 2 — Prototypes)

| Requirement | Implementation | Element(s) |
|-------------|---------------|------------|
| SVG `role="img"` + `<title>` | Every SVG has `role="img"` and a descriptive `<title>` | All |
| ARIA labels on interactive elements | `aria-label` on all clickable/hoverable targets | E10, E13, E15 |
| Keyboard navigation | Tab order follows visual order. Enter/Space activates toggles | E10, E13, E15, E16 |
| Focus indicators | Visible focus ring using `:focus-visible` with `--accent-cyan` outline | All interactive |
| Screen reader announcements | `aria-live="polite"` for dynamic content changes (layer toggles, tree expand) | E13, E15 |
| Color contrast | Verify all text meets WCAG AA (4.5:1 for normal text, 3:1 for large text). `--text-secondary: #8b95a8` on `--bg-panel: #0e1117` = 5.2:1 (passes). `--text-muted: #535c6e` on `--bg-deep: #08090d` = 3.1:1 (fails for normal text — use only for decorative/non-essential labels) | All |
| `prefers-reduced-motion` | Disable all animations. Show static final state of each element | All |
| `prefers-color-scheme` | Not applicable — guide is dark-theme only | — |

### Enhanced Requirements (Phase 4 — Integration)

| Requirement | Implementation |
|-------------|---------------|
| Skip-to-content link | Add "Skip to visualization" link before each embedded element |
| Long description for complex SVGs | `aria-describedby` linking to a hidden text description of the chart/diagram content |
| Table fallback for charts | E07, E09 must have a hidden `<table>` alternative accessible to screen readers |
| Motion preference persistence | Store `prefers-reduced-motion` choice in localStorage and apply consistently |

---

## Appendix A — File-by-File Implementation Template

Each element HTML file should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EXX — Element Name | Live Character Guide Visual System</title>
  <link rel="stylesheet" href="../DESIGN-TOKENS.css">
  <link rel="stylesheet" href="../shared/fonts.css">
  <link rel="stylesheet" href="../shared/base.css">
  <link rel="stylesheet" href="../shared/patterns.css">
  <link rel="stylesheet" href="../shared/utilities.css">
  <style>
    /* Element-specific styles only.
       All tokens, fonts, and patterns come from shared CSS. */
  </style>
</head>
<body>
  <!-- Mini-map navigation -->
  <nav class="mini-map">...</nav>

  <!-- Element title -->
  <header>
    <span class="element-number">EXX</span>
    <h1 class="element-title" style="font-family: var(--font-display)">Element Name</h1>
    <p class="element-subtitle">Pattern: PX — Pattern Name</p>
  </header>

  <!-- Main visualization -->
  <main class="element-content p-{pattern}">
    <!-- SVG or HTML-based visualization -->
  </main>

  <!-- Cross-references -->
  <footer class="element-links">
    <!-- Links to related elements -->
  </footer>

  <script>
    // Scroll-triggered animations via IntersectionObserver
    // Element-specific interactions
    // Reduced-motion check
  </script>
</body>
</html>
```

---

## Appendix B — Contradiction Resolution Quick Reference

| # | Contradiction | Visual Resolution | Element(s) |
|---|--------------|-------------------|------------|
| 1 | Voice: storage vs influence | Inset box "Storage vs Influence" in E07. CORRECTION: Recent Chat is the top influence source, not SP | E07 |
| 2 | OCEAN standalone vs integrated | OCEAN (E09) standalone + cross-reference badge; Enneagram (E10) same; dashed link between them | E09, E10 |
| 3 | 4 vs 5 blocks | 4 main blocks + Anchors as nested sub-panel inside Examples (violet accent) | E01 |
| 4 | CoT mandatory vs optional | Tier 0 = baseline. Tiers 1–3 have "Optional" badges | E11 |
| 5 | Anchor vs Embodiment primacy | E03 Action has `[↳ E4]` badge. E04 is standalone full detail. Link between them | E03, E04 |
| 6 | SP as container vs source | SP = border-only frame (no fill) in E01 | E01 |
| 7 | GHOST layers vs linear | E05 GHOST node has expand icon → E06 concentric detail | E05, E06 |
| 8 | Tree vs symptom table | E13 root nodes labeled "From Symptom Table" + AP chips | E12, E13 |
| 9 | Token budget variants | E01 annotation table with per-block budgets + E17 sampling params by model tier | E01, E17 |
| 10 | Pipeline endpoint | E02: Budget Check = last mandatory node, optional steps branch after it, feedback loop arcs back | E02 |
| 11 | Anchor 3 vs 4 components | E03: 3 nodes (T→A→P), Action expandable via `[↳ E4]` | E03, E04 |
| 12 | AN: voice source vs assembly step | E16 shows AN as both a voice influence source (E07 data) and an assembly pipeline step (E02). Cross-references link both views | E02, E07, E16 |
| 13 | Sampling: universal rules vs model-specific values | E17 three-column comparison shows same rule (PP=0.0) across all models but different ranges (e.g. Temp) per tier | E17 |

---

## Appendix C — Execution Order for LLM Agents

### Recommended agent assignment:

| Agent | Tasks | Dependencies |
|-------|-------|--------------|
| Agent A | Phase 0 (tokens + shared CSS) | None — starts first |
| Agent B | Phase 1 (Hero 3D scene) | Waits for Phase 0 |
| Agent C | Phase 2A: E01, E02, E03, E04, E05 | Waits for Phase 0 |
| Agent D | Phase 2B: E06, E07, E08, E09, E10 | Waits for Phase 0 |
| Agent E | Phase 2C: E11, E12, E13, E14, E15 | Waits for Phase 0 |
| Agent H | Phase 2D: E16, E17 | Waits for Phase 0 |
| Agent F | Phase 3 (links, mini-map, QA) | Waits for all Phase 2 |
| Agent G | Phase 4 (integration) | Waits for Phase 3 |

### Critical path:
```
Agent A → Agent B (parallel with C/D/E/H) → Agent F → Agent G
        → Agent C (parallel with B/D/E/H) ↗
        → Agent D (parallel with B/C/E/H) ↗
        → Agent E (parallel with B/C/D/H) ↗
        → Agent H (parallel with B/C/D/E) ↗
```

### Per-element implementation checklist (for each agent):

1. Read this PLAN.md section for your assigned element(s)
2. Read the relevant Part(s) from the repository (`src/master/part_*.html`)
3. Read relevant data files (`data/*.json`) if applicable
4. Create the HTML file following the template in Appendix A
5. Implement the visualization (SVG-first, D3.js only where needed)
6. Implement scroll animations (IntersectionObserver)
7. Implement `prefers-reduced-motion` fallback
8. Add cross-reference links
9. Add mini-map navigation
10. Test in browser: Chrome + Firefox
11. Test responsive: 768px and 1200px+
12. Verify against QA checklist (Section 3.3)

---

## Appendix D — Key Repository References

When implementing, the LLM agent should reference:

| Element | Primary source file | Data file |
|---------|-------------------|-----------|
| E01 | `src/master/part_01.html` | — |
| E02 | `src/master/part_07a.html` (Assembly Pipeline — 6 main steps + 4 optional) | — |
| E03 | `src/master/part_02.html` | — |
| E04 | `src/master/part_02.html` (Embodiment Protocol) | — |
| E05 | `src/master/part_04.html` | — |
| E06 | `src/master/part_04.html` (GHOST Layers section) | — |
| E07 | `src/master/part_03.html` | — |
| E08 | `src/master/part_07a.html` (CORE DIRECTIVES) | — |
| E09 | `src/master/part_05.html` | `data/ocean.json` |
| E10 | `src/master/part_05.html` (Enneagram section) | `data/enneagram.json` |
| E11 | `src/master/part_06.html` | — |
| E12 | `src/master/part_08.html` | — |
| E13 | `src/master/part_09.html` | — |
| E14 | `src/master/part_09.html` (Quality Scale + Pre-Deploy) | — |
| E15 | `src/master/part_10.html` (Елена example) | `data/character_schema.json` |
| E16 | `src/master/part_07a.html` (Author's Note section) | — |
| E17 | `src/master/part_07a.html` (Sampling Parameters table) | — |

Existing CSS components to study for integration:
- `docs/components.md` — all existing CSS classes
- `assets/shell-styles.css` — current style system
- `src/shell/widgets/` — existing interactive widgets (ocean-insight.js, enneagram-builder.js)

---

*End of implementation plan. This document is the single source of truth for executing the visual system build.*

---

## Appendix E — Repository Health Notes

The following issues were identified during cross-referencing and should be addressed separately:

1. **Version mismatch:** `package.json` says v9.1.0, but `src/VERSION` says v9.0.0 and `data/character_schema.json` / `data/glossary.json` say v9.0.0. The version sync script should catch this.

2. **Content duplication:** `parts/` at root level mirrors `src/master/` exactly; `widgets/` at root mirrors `src/shell/widgets/`; `assets/` mirrors `src/assets/`. These appear to be build artifacts that were checked in and should be cleaned up.

3. **E02 pipeline spec ambiguity:** The Assembly Pipeline in Part 7A describes an SP-assembly walkthrough for Елена (6 steps + 4 optional). It is NOT a card-design lifecycle. Any future spec work should clarify whether a higher-level "card design pipeline" is needed as a separate concept.

4. **Multiple parameter tables:** Part 7A contains at least 3 different parameter tables (base parameters by context tier, model-specific sub-table, and model type checklist) with slightly different values. This can confuse users. Consider unifying into a single authoritative table.
