# User Journeys — Live Character Guide v6

> **Version:** 2.2
> **Last Updated:** 2026-04-27
> **Status:** Draft (synced with Content Restoration Phases 0–13)

---

## Purpose

This document describes what a reader **DOES** at each layer — not what content exists, but the reader's PATH through that content. It validates:

1. Quickstart is a real entry point
2. Cross-layer bridges (IMP-27) actually lead somewhere useful
3. No "dead ends" exist where a reader finishes a section and doesn't know where to go next

---

## L1 Journey (15 minutes)

### Profile
- **Target reader**: New to character cards, needs quick result
- **Time budget**: ~15 minutes
- **Token target**: 400-800 tokens/card

### Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│  ENTRY POINT                                                     │
│  ↓                                                               │
│  [1] Landing → Layer selector modal                             │
│      • Picks L1 (Минимальный)                                   │
│      • Or clicks "Не уверены?" → redirected to L2               │
│                                                                  │
│  [2] Part 1 intro → Understand what a card is                   │
│      • See 4 blocks table                                        │
│      • Read Core Rules (5 rules)                                │
│                                                                  │
│  [3] Part 2 L1 sections → Understand anchors                    │
│      • Format: Trigger → Action → Price                         │
│      • 3-5 anchors minimum                                       │
│                                                                  │
│  [4] Part 3 L1 sections → Voice Isolation                       │
│      • Voice ONLY in Examples                                    │
│      • Write 2 examples: neutral + stress                       │
│                                                                  │
│  [5] L1 Quickstart → Fill 5-minute template                     │
│      • Minimal Elena card                                        │
│      • Test with one scenario                                   │
│                                                                  │
│  [6] Problem? → Part 9 Top-3 troubleshooting                    │
│      • One Change Rule: change only 1 parameter at a time        │
│      • If fixed → done                                          │
│      • If deeper issue → data-layer-switch → L2                 │
│                                                                  │
│  [7] Bridge sections in Parts 4–8 → Know SPINE/OCEAN/CoT/      │
│      Technical/Anti-patterns exist → Can switch to L2/L3        │
│                                                                  │
│  EXIT: Working minimal card (~500 tokens)                       │
│  NEXT: See OCEAN/SPINE mentions → know they exist in L2         │
└─────────────────────────────────────────────────────────────────┘
```

### Validation Points

| Step | Check | Pass Criteria |
|------|-------|---------------|
| 1 | Modal shows L1 option | ✅ L1 visible with description |
| 2 | Core Rules accessible | ✅ 5 rules visible in Part 1 |
| 3 | Anchor format clear | ✅ T→A→P format explained |
| 4 | Voice Isolation rule | ✅ Rule stated clearly |
| 5 | Quickstart exists | ✅ Template available |
| 6 | Troubleshooting accessible | ✅ Part 9 link works |
| 7 | Bridge sections visible | ✅ All 10 Parts have L1 content, bridges to L2/L3 |

### Expected Outcome
- Reader produces a **minimal working card** (~500 tokens)
- Understands the 4 blocks structure
- Knows core rules (OCEAN poles, Voice Isolation, etc.)
- Knows L2 exists for deeper content (SPINE, OCEAN, FLAW-linked anchors)
- Knows L3 exists for advanced content (LIE, GHOST, CoT, XML, API) via bridge sections

---

## L2 Journey (30 minutes)

### Profile
- **Target reader**: Has basic card, wants depth
- **Time budget**: ~30 minutes
- **Token target**: 800-1500 tokens/card

### Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│  ENTRY POINT                                                     │
│  ↓                                                               │
│  [1] Switch to L2 → See "What's New" table                      │
│      • Knows what was added vs L1                               │
│                                                                  │
│  [2] Part 4 (SPINE) → Fill SPINE for character                  │
│      • WANT/NEED/FLAW (3 elements on L2)                         │
│      • Derive anchors from psychology                           │
│      • If you want LIE/GHOST → bridge to L3                    │
│                                                                  │
│  [3] Part 2 L2 sections → Expand anchors                        │
│      • FLAW-linked anchors                                      │
│      • Embodiment protocol                                      │
│      • 5-7 anchors with Price                                   │
│      • ENVIRONMENTAL REACTIVITY directive                       │
│      • INFLUENCE BOUNDARY: react only to observable symptoms    │
│                                                                  │
│  [4] Part 3 L2 sections → Write 3 Examples                      │
│      • Neutral + Stress + Trust                                 │
│      • Apply Tier quality criteria                              │
│      • Voice Contamination check: never copy foreign <START>    │
│                                                                  │
│  [5] Part 5 (Psych Toolkit) → OCEAN Interactive Tool            │
│      • Validate 1-2 extreme poles                               │
│      • See Enneagram suggestion                                 │
│      • Add notation to card                                     │
│                                                                  │
│  [6] L2 Quickstart → 30-minute pipeline                         │
│      • Card ~950 tokens                                         │
│                                                                  │
│  [7] Part 7 L2 → CORE DIRECTIVES in System Prompt               │
│      • Add CORE_DIRECTIVES block to SP (5 directives)            │
│      • Add Tone Frame for atmosphere (~25-30 tokens)             │
│      • Verify Model Type Checklist for your model size           │
│                                                                  │
│  [8] Test with 6 scenarios → Part 9 diagnostics                 │
│      • Decision Tree for structured debugging                    │
│      • If model-specific issue → data-layer-switch → L3         │
│                                                                  │
│  EXIT: Working deep card (~950 tokens)                          │
│  NEXT: Knows L3 exists for CoT, GHOST Layers, API blocks        │
└─────────────────────────────────────────────────────────────────┘
```

### Validation Points

| Step | Check | Pass Criteria |
|------|-------|---------------|
| 1 | "What's New" visible | ✅ Table shows L2 additions |
| 2 | SPINE sections exist | ✅ WANT/NEED/FLAW explained (LIE/GHOST on L3) |
| 3 | FLAW-linked anchors | ✅ Protocol documented |
| 4 | Tier quality criteria | ✅ Tier 1/2/3 defined |
| 5 | OCEAN tool works | ✅ Pentagon + sliders functional |
| 6 | L2 Quickstart exists | ✅ 30-min template available |
| 7 | Cross-layer bridges | ✅ Links to L3 work |

### Expected Outcome
- Reader produces a **deep card** (~950 tokens)
- Has complete SPINE (WANT/NEED/FLAW). LIE/GHOST available on L3 via bridge
- Has 5-7 anchors with Price
- Has OCEAN + Enneagram notation
- Understands FLAW-linked anchors

---

## L3 Journey (60 minutes)

### Profile
- **Target reader**: Power user, complex scenarios
- **Time budget**: ~60 minutes
- **Token target**: 1500+ tokens/card

### Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│  ENTRY POINT                                                     │
│  ↓                                                               │
│  [1] Switch to L3 → See "What's New" table                      │
│      • Knows what was added vs L2                               │
│                                                                  │
│  [2] Part 4 L3 sections → Add LIE and GHOST to SPINE           │
│      • LIE (ложная установка) → see p4_lie                      │
│      • GHOST (событие прошлого) → see p4_ghost                  │
│      • 3-tier GHOST Layers → link each to anchors               │
│      • Validate full SPINE chain via p4_l3_spine_full           │
│                                                                  │
│  [3] Part 6 (CoT Tiers) → Add 2-3 CoT anchors                   │
│      • CoT basics + Tier definitions now on L3                  │
│      • Tier 2 recommended for most                              │
│      • Internal process anchors                                 │
│                                                                  │
│  [4] Part 7 L3 sections → Configure advanced blocks             │
│      • API blocks (Claude/GPT)                                  │
│      • XML tags for structured Description                      │
│      • Advanced Lorebook triggers                               │
│      • CORE DIRECTIVES 6–7 (CONSEQUENCE DRIVEN, PRE-GEN FILTER) │
│      • OOC Protection + Immersion Boundary                      │
│      • L3 SP Template + L3 AN Template with GHOST-activation    │
│                                                                  │
│  [5] Part 5 L3 sections → OCEAN×Enneagram Matrix                │
│      • Validate cross-correlations                              │
│      • Fine-tune personality profile                            │
│                                                                  │
│  [6] L3 Quickstart → 60-minute pipeline                         │
│      • Card ~1500+ tokens                                       │
│                                                                  │
│  [7] If 12B model → Part 9 diagnostics                          │
│      • 4K-Fallback protocol if needed                           │
│                                                                  │
│  [8] Pre-Deploy Validation → Part 9 L3                          │
│      • Quick Check (5 items: PP=0.0, voice only in Examples,    │
│        Price in every anchor, Format Lock, anti-godmoding)       │
│      • Full Check (14 items) if Quick Check passes              │
│                                                                  │
│  EXIT: Working expert card (~1500+ tokens)                      │
│  NEXT: Can return to L1/L2 for simpler cards                    │
└─────────────────────────────────────────────────────────────────┘
```

### Validation Points

| Step | Check | Pass Criteria |
|------|-------|---------------|
| 1 | "What's New" visible | ✅ Table shows L3 additions |
| 2 | LIE + GHOST + GHOST Layers | ✅ LIE/GHOST sections on L3, full chain in p4_l3_spine_full |
| 3 | CoT tiers documented | ✅ CoT basics + tiers now on L3, Tier 1/2/3 templates available |
| 4 | API blocks documented | ✅ Claude/GPT specifics |
| 5 | Cross-matrix works | ✅ 5×9 interactive table |
| 6 | L3 Quickstart exists | ✅ 60-min template available |
| 7 | 4K-Fallback accessible | ✅ Protocol in Part 7/9 |

### Expected Outcome
- Reader produces an **expert card** (~1500+ tokens)
- Has GHOST Layers
- Has CoT anchors
- Has API blocks / XML tags
- Has all 7 CORE DIRECTIVES in SP
- Has OOC Protection and/or Immersion Boundary
- Has passed Pre-Deploy Validation checklist
- Can diagnose 12B-specific issues

### IMP-47 Note: Repositioned Content

Если вы читали гайд до реструктуризации: GHOST и LIE теперь на Экспертном слое (L3). CoT basics и tiers также перемещены на L3. Это не новое содержание — оно перемещено для создания качественного различия между слоями. L2 SPINE теперь содержит только WANT/NEED/FLAW.

---

## Cross-Layer Bridge Validation

### IMP-27 Requirement
Every L2 section must have an L1 mention or `data-layer-switch`. Every L3 section must have an L2 mention.

### Bridge Inventory

| From | To | Type | Purpose |
|------|-----|------|---------|
| L1 Part 1 (p1_next_steps) | L2 Part 4 (SPINE) | data-layer-switch | "Want anchors from psychology? → L2" |
| L1 Part 1 (p1_next_steps) | L2 Part 5 (OCEAN) | data-layer-switch | "OCEAN/Enneagram tools → L2" |
| L1 Part 1 (p1_next_steps) | L3 Part 6 (CoT) | data-layer-switch | "CoT internal process → L3" |
| L1 Part 1 (p1_next_steps) | L2 Part 7 (Technical) | data-layer-switch | "SP/Format Lock/AN/Lorebook → L2" |
| L1 Part 1 (p1_next_steps) | L2 Part 8 (Anti-patterns) | data-layer-switch | "AP-1–AP-15 catalog → L2" |
| L1 Part 3 (voice) | L2 Part 3 (embodiment) | data-layer-switch | "Want body-first protocol? → L2" |
| L1 Part 9 | L2 Part 4 | data-layer-switch | "Deeper diagnostics → L2" |
| L2 Part 2 (anchors) | L3 Part 6 (CoT) | data-layer-switch | "Internal process anchors → L3" |
| L2 Part 4 (SPINE) | L3 Part 4 (LIE+GHOST) | data-layer-switch | "LIE/GHOST/GHOST Layers → L3" |
| L2 Part 4 (SPINE) | L3 Part 4 (full chain) | data-layer-switch | "Полный СПИН из 5 элементов → L3" |
| L2 Part 5 (OCEAN) | L3 Part 5 (cross-matrix) | data-layer-switch | "OCEAN×Enneagram correlation → L3" |
| L2 Part 7 (technical) | L3 Part 7 (4K-Fallback) | data-layer-switch | "Low-context adaptation → L3" |
| L2 Part 2 (anchors) | L2 Part 7 (CORE DIRECTIVES) | data-layer-switch | "INFLUENCE BOUNDARY directive → Part 7" |
| L2 Part 2 (env reactivity) | L2 Part 7 (CORE DIRECTIVES) | data-layer-switch | "ENVIRONMENTAL REACTIVITY directive → Part 7" |
| L2 Part 4 (SPINE mapping) | L2 Part 7 (CORE DIRECTIVES) | data-layer-switch | "CONSEQUENCE DRIVEN → Part 7" |
| L2 Part 4 (SPINE mapping) | L2 Part 7 (AN) | data-layer-switch | "WANT→NEED in AN → Part 7" |
| L2 Part 7 (CORE DIRECTIVES) | L3 Part 7 (CD L3) | data-layer-switch | "Directives 6–7 (L3 extension) → L3" |
| L1 Part 9 (troubleshooting) | L1 Part 9 (One Change Rule) | href | "Debugging principle → p9_one_change_rule" |
| L3 Part 7 (OOC Protection) | L3 Part 7 (Immersion Boundary) | data-layer-switch | "Advanced OOC → L3" |
| L2 Part 8 (AP-11 voice bleed) | L3 Part 3 (multi-char) | data-layer-switch | "Multi-char examples → L3" |
| L2 Part 8 (AP-15 basic) | L2 Part 5 (OCEAN poles) | data-layer-switch | "Golden rule OCEAN → Part 5" |

### Dead End Check

After Stage 1, walk each journey on the assembled site:

- [ ] L1 journey: no dead ends
- [ ] L2 journey: no dead ends
- [ ] L3 journey: no dead ends
- [ ] All cross-layer bridges work
- [ ] Reader always knows where to go next

---

## User Journey Test Protocol

### Manual Testing Steps

1. **Fresh browser session** (no localStorage)
2. **Select L1** from modal
3. **Follow L1 journey** step by step
4. **Verify each checkpoint**
5. **Repeat for L2**
6. **Repeat for L3**
7. **Test all cross-layer switches**

### Automated Testing (Puppeteer)

```javascript
// Test: L1 journey completes without dead ends
describe('L1 Journey', () => {
  it('should guide user from landing to working card', async () => {
    await page.goto(BASE_URL);
    await page.click('[data-layer="1"]');
    await page.waitForSelector('#part-01');
    // ... continue through journey
  });
});
```

---

*Document prepared for Live Character Guide v6 rebuild project*
