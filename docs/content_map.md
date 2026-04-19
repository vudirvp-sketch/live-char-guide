# Content Ownership Map — Live Character Guide v6

> **Version:** 1.0
> **Last Updated:** 2026-04-19
> **Status:** Canonical Reference

---

## Purpose

This document is the **single source of truth** for "where does concept X live." Without it, models must infer ownership from multiple Part specs — error-prone and the root cause of duplication in previous iterations.

**Rules:**
- Every concept mentioned in any Part MUST have exactly one row in this table
- If a concept has no row → it's an orphan → IMP-28 violation
- If a concept has two rows → it's duplicated → IMP-5 violation
- Read this BEFORE writing any Part
- Updated after each phase by appending new rows

---

## Content Ownership Table

### Part 1: Basic Blocks (Базовые блоки)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Карточка персонажа | Part 1 | p1_card_overview | l1 | Definition | 4 блока карточки: SP, Description, Examples, Greeting |
| Core Rules (5 правил) | Part 1 | p1_core_rules | l1 | Rules | Перенесено из glossary.json → Part 1 |
| Минимальная карточка | Part 1 | p1_minimal_card | l1 | Template | L1 Quickstart template |
| Version notation | Part 1 | p1_version | l1 | Reference | Как указывать версию карточки |

### Part 2: Anchors (Якоря)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Якорь (Anchor) | Part 2 | p2_basic_anchors | l1 | Definition+Rules | Формат: T→A→P |
| Формат якоря | Part 2 | p2_anchor_format | l1 | Reference | Триггер → Действие → Цена |
| Триггер | Part 2 | p2_trigger | l1 | Definition | Внешний стимул |
| Действие | Part 2 | p2_action | l1 | Definition | Наблюдаемая реакция |
| Цена (Price) | Part 2 | p2_price | l2 | Definition | Физическая манифестация |
| Embodiment (Телесность) | Part 2 | p2_embodiment | l2 | Full treatment | Протокол: Состояние→Тело→Сенсор→Речь |
| FLAW-linked anchors | Part 2 | p2_flaw_anchors | l2 | Rules+Examples | Как выводить якоря из FLAW |
| Sensory anchors | Part 2 | p2_sensory_anchors | l3 | Full treatment | Сенсорные якоря для GHOST |
| Anchor validation | Part 2 | p2_anchor_validation | l2 | Checklist | Критерии качества якоря |

### Part 3: Voice (Голос)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Voice Isolation | Part 3 | p3_voice_isolation | l1 | Rule+Hierarchy | Иерархия влияния на голос |
| Examples | Part 3 | p3_examples | l1 | Definition+Rules | Демонстрация голоса |
| Greeting | Part 3 | p3_greeting | l1 | Definition+Structure | Сцена→Действие→Реплика |
| Voice Leak | Part 3 | p3_voice_leak | l2 | Anti-pattern | "Красноречивый Джесси" — пример ошибки |
| Tier quality | Part 3 | p3_tier_quality | l2 | Classification | Tier 1/2/3 для Examples |
| Dialogue markup | Part 3 | p3_dialogue_markup | l2 | Comparison | Системы A/B/C |
| Multi-char interaction | Part 3 | p3_multi_char | l2 | Rules | Walter+Jesse pair |
| Joker case | Part 3 | p3_joker_case | l2 | Extreme example | Голос невозможно описать |

### Part 4: SPINE Framework

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| SPINE (overview) | Part 4 | p4_spine_overview | l2 | Full framework | WANT/NEED/FLAW/LIE/GHOST |
| WANT | Part 4 | p4_want | l2 | Definition+Examples | Осознанное желание |
| NEED | Part 4 | p4_need | l2 | Definition+Examples | Истинная потребность |
| FLAW | Part 4 | p4_flaw | l2 | Definition+Examples | Конкретное поведение |
| LIE | Part 4 | p4_lie | l2 | Definition+Examples | Ложная установка |
| GHOST | Part 4 | p4_ghost | l2 | Definition+Examples | Событие прошлого |
| GHOST Layers | Part 4 | p4_ghost_layers | l3 | Full treatment | 3-tier структура GHOST |
| SPINE → Anchors mapping | Part 4 | p4_spine_mapping | l2 | Protocol | Как выводить якоря из SPINE |
| SPINE consistency check | Part 4 | p4_spine_check | l3 | Diagnostic | Внутренняя консистентность |

### Part 5: Psychology Toolkit

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| OCEAN (Big Five) | Part 5 | p5_ocean_basics | l2 | Tool+Interactive | Pentagon widget + validator |
| OCEAN poles | Part 5 | p5_ocean_poles | l2 | Rules | 1-2 экстремальных полюса |
| OCEAN validator | Part 5 | p5_ocean_validator | l2 | Interactive | Слайдеры + polygon + suggestions |
| Enneagram | Part 5 | p5_enneagram_basics | l2 | Tool+Interactive | 9 типов, SVG widget |
| Enneagram types table | Part 5 | p5_enneagram_types | l2 | Reference | Страх/Желание/Стресс/Рост |
| Enneagram wings | Part 5 | p5_enneagram_wings | l3 | Full treatment | Выбор крыла |
| MBTI | Part 5 | p5_mbti_basics | l2 | Tool+Interactive | 16 типов, filter grid |
| OCEAN×Enneagram matrix | Part 5 | p5_cross_matrix | l3 | Interactive | Корреляция 5×9 |
| Enneagram stress/growth | Part 5 | p5_enneagram_directions | l2 | Reference | Пути интеграции/дезинтеграции |

### Part 6: CoT Tiers

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| CoT (Chain of Thought) | Part 6 | p6_cot_basics | l2 | Definition | Для 12B vs 32B+ |
| CoT Tier 1 | Part 6 | p6_cot_tier1 | l2 | Template | Базовая строка в SP |
| CoT Tier 2 | Part 6 | p6_cot_tier2 | l3 | Template | Structured internal |
| CoT Tier 3 | Part 6 | p6_cot_tier3 | l3 | Template | Full XML blocks |
| CoT anchors | Part 6 | p6_cot_anchors | l3 | Rules | Внутренний процесс как якорь |

### Part 7: Technical Implementation

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| System Prompt (SP) | Part 7 | p7_system_prompt | l2 | Template+Rules | Базовые запреты |
| Author's Note (AN) | Part 7 | p7_authors_note | l2 | Template+Rules | Динамический контекст |
| Lorebook (LB) | Part 7 | p7_lorebook | l2 | Template+Rules | Триггеры для GHOST |
| Format Lock | Part 7 | p7_format_lock | l2 | Rule | Фиксация формата диалога |
| Structured Inject | Part 7 | p7_structured_inject | l2 | Technique | XML-теги для мотивации |
| XML tags | Part 7 | p7_xml_tags | l3 | Full treatment | Синтаксис и применение |
| API blocks | Part 7 | p7_api_blocks | l3 | Template | Claude/GPT specifics |
| 4K-Fallback | Part 7 | p7_4k_fallback | l3 | Protocol | Адаптация для ≤4K контекста |

### Part 8: Anti-patterns

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Anti-pattern overview | Part 8 | p8_antipatterns_overview | l2 | Catalog | Классификация анти-паттернов |
| годмодинг | Part 8 | p8_antipattern_godmoding | l2 | Anti-pattern | Определение + исправление |
| OOC | Part 8 | p8_antipattern_ooc | l2 | Anti-pattern | Out of Character |
| Voice contamination | Part 8 | p8_antipattern_voice | l2 | Anti-pattern | Утечка голоса |
| OCEAN overload | Part 8 | p8_antipattern_ocean | l2 | Anti-pattern | 3+ экстремальных полюса |
| Anchor false positives | Part 8 | p8_antipattern_anchors | l3 | Diagnostic | Слишком широкие триггеры |
| SPINE inconsistency | Part 8 | p8_antipattern_spine | l3 | Diagnostic | Конфликтующие элементы |

### Part 9: Diagnostics

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Troubleshooting overview | Part 9 | p9_troubleshooting | l1 | Catalog | Топ-3 проблемы |
| Diagnostic decision tree | Part 9 | p9_decision_tree | l3 | Flowchart | Симптом → Диагноз → Решение |
| 12B-specific issues | Part 9 | p9_12b_issues | l3 | Special | Диагностика для 12B моделей |
| Token budget calculator | Part 9 | p9_token_budget | l2 | Tool | Расчёт токенов |
| Layer comparison table | Part 9 | p9_layer_comparison | l1 | Reference | L1 vs L2 vs L3 |

### Part 10: Examples (Complete Cards)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Elena card (L1) | Part 10 | p10_elena_l1 | l1 | Complete card | Минимальная карточка |
| Elena card (L2) | Part 10 | p10_elena_l2 | l2 | Complete card | Глубокая карточка |
| Elena card (L3) | Part 10 | p10_elena_l3 | l3 | Complete card | Экспертная карточка |
| Geralt card (L2) | Part 10 | p10_geralt_l2 | l2 | Complete card | SPINE demo |
| Edward Elric card (L2) | Part 10 | p10_edward_l2 | l2 | Complete card | Crystal-clear SPINE |
| Выщербленный card (L3) | Part 10 | p10_vysherblenny_l3 | l3 | Complete card | GHOST Layers + CoT |

---

## Cross-Reference Rules

### DAG Direction

Links flow **unidirectionally from complex to simple**:

```
Part 4 (SPINE) ──can reference──▶ Part 2 (Anchors)
Part 5 (OCEAN) ──can reference──▶ Part 4 (SPINE)
Part 6 (CoT) ──can reference──▶ Part 2 (Anchors), Part 4 (SPINE)
Part 7 (Technical) ──can reference──▶ Part 2 (Anchors), Part 4 (SPINE)
Part 8 (Anti-patterns) ──can reference──▶ Parts 2, 3, 4, 5
Part 9 (Diagnostics) ──can reference──▶ Parts 7, 8
Part 10 (Examples) ──can reference──▶ All Parts

Part 2 (Anchors) ──CANNOT reference──▶ Part 4 (SPINE)
Part 3 (Voice) ──CANNOT reference──▶ Part 4 (SPINE)
```

### Reference Format

When referencing another concept:
- **One sentence max** explaining the connection
- **Explicit forward link** to the canonical location
- **No duplication** of content

**Example (correct):**
```
FLAW-linked anchors (как выводить якоря из FLAW) описаны в Part 2, 
section p2_flaw_anchors. Здесь мы рассматриваем их связь с SPINE.
```

**Example (wrong — duplication):**
```
FLAW-linked anchors — это якоря, которые выводятся из FLAW. 
Чтобы создать FLAW-linked anchor, нужно... [полное объяснение]
```

---

## Validation Checklist

Before finalizing any Part, verify:

- [ ] All concepts in the Part have entries in this table
- [ ] No concept appears in two rows (duplication)
- [ ] All cross-references follow DAG direction
- [ ] All `data-section` IDs match this table
- [ ] New concepts were added to this table (not forgotten)

---

*Document prepared for Live Character Guide v6 rebuild project*
