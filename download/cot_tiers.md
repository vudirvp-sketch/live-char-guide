# CoT Tiers Documentation
# ITEM-010: Chain of Thought Reasoning Levels

## Overview

CoT (Chain of Thought) — многоуровневая система рассуждений для генерации ответов персонажа.

## Tiers

### Tier 1: Observation (< 1000 tokens)

**Structure:** `<observation>` → `<response>`

**Use Case:** Lightweight models, quick exchanges

**Example:**
```
<START>
{{char}}: His hands were cold on the railing. He tightened his grip.
"It's going to rain."
```

### Tier 2: Interpretation (1000-2500 tokens)

**Structure:** `<observation>` → `<interpretation>` → `<response>`

**Use Case:** Standard models, multi-step processing

**Example:**
```
<START>
{{char}}: His hands were cold on the railing. He tightened his grip.
<interpretation>The cold didn't bother him. It was the waiting that ate at him.</interpretation>
"It's going to rain." He didn't look at her.
```

### Tier 3: Full Processing (2500+ tokens)

**Structure:** `<observation>` → `<interpretation>` → `<reaction>` → `<response>`

**Use Case:** Flagship models, deep roleplay

**Example:**
```
<START>
{{char}}: His hands were cold on the railing. He tightened his grip.
<interpretation>The cold didn't bother him. It was the waiting - every minute another scenario.</interpretation>
<reaction>His chest tightened. He pushed it down.</reaction>
"It's going to rain." He didn't look at her.
```

## Model Capability Mapping

| Tier | Context | Instructions | Use Case |
|------|---------|--------------|----------|
| Tier 3 | 100K+ | Complex nested | Flagship models (Claude, GPT-4) |
| Tier 2 | 32K-100K | Multi-step | Standard models |
| Tier 1 | 8K-32K | Simple | Lightweight models |

## Integration with Card Elements

| CoT Tier | Element Mapping |
|----------|----------------|
| T0: Context | Determined at generation time |
| T1: Reaction | OCEAN poles, Anchors |
| T2: Motivation | SPINE, Enneagram |
| T3: Conflict | FLAW, LIE, WANT/NEED |
| T4: Action | Anchors (Trigger → Action → Price) |
| T5: Voice | Example Messages, Speech Patterns |

## Important Note

CoT is NOT card content - it's a reasoning mechanism. Results go into Anchors, Examples, and Speech Patterns.
