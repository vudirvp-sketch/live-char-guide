# Content Ownership Map — Live Character Guide v9

> **Version:** 9.0.0
> **Last Updated:** 2026-05-15
> **Status:** Canonical Reference (v9 restructure — Phases 2–3)

---

## Purpose

This document is the **single source of truth** for "where does concept X live." Without it, models must infer ownership from multiple Part specs — error-prone and the root cause of duplication in previous iterations.

**Rules:**
- Every concept mentioned in any Part MUST have exactly one row in this table
- If a concept has no row → it's an orphan → documentation violation
- If a concept has two rows → it's duplicated → documentation violation
- Read this BEFORE writing any Part
- Updated after each phase by appending new rows

**v9 restructure note:** Phase 2 split Part 7 into 7A (System Prompt & Assembly) and 7B (Lorebook, Greeting & Compatibility). MBTI moved from Part 5 to Appendix A. AP-15 (OCEAN Overload) moved from Part 8 to Part 5 as a Warning section; AP-16 renumbered to AP-15. Appendix B (Model Capability Table) created from consolidated MODEL_NOTE tags in Phase 3.3.

---

## Content Ownership Table

### Part 1: Basic Blocks (Базовые блоки)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| Карточка персонажа | Part 1 | p1_card_overview | Definition | 4 блока карточки: SP, Description, Examples, Greeting. Overview of card structure and block purposes |
| Core Rules (4 базовых правила) | Part 1 | p1_core_rules | Rules | 4 foundational rules of character creation. GHOST inline definition. Перенесено из glossary.json → Part 1 |
| Токен-бюджет | Part 1 | p1_token_budget | Reference | Token pipeline and per-block limits. 2 subsections: конвейер сборки + лимиты по блокам |
| Конвейер сборки карточки | Part 1 | p1_assembly_pipeline | Pipeline | Step-by-step card assembly pipeline with mini-example embedded at step 06 |
| Топ-3 критичные ошибки | Part 1 | p1_top3_problems | Detailed problems | Подробный разбор 3 ошибок: симптом→причина→исправление→до/после. Не дублирует p9_additional_problems |

### Part 2: Behavioral Anchors (Якоря)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| Якорь (Anchor) | Part 2 | p2_basic_anchors | Definition+Rules | Формат: T→A→P. Foundational anchor concept and notation |
| Правила якорей | Part 2 | p2_anchor_rules | Rules | Цена обязательна, формат T→A→P. Expanded anchor creation rules |
| Примеры якорей | Part 2 | p2_anchor_examples | Examples | Таблица примеров + wrong/correct пример перед таблицей |
| Embodiment (Телесность) | Part 2 | p2_embodiment | Full treatment | Протокол: Состояние→Тело→Сенсор→Речь. Physical grounding of character behavior. Includes FLAW-linked anchor derivation |
| ENVIRONMENTAL REACTIVITY | Part 2 | p2_env_reactivity | Directive | Sensory details only through character action. Environment responds through character perception |
| Сенсорные якоря | Part 2 | p2_sensory_anchors | Full treatment | Сенсорные якоря для GHOST. Ссылка на CoT-якоря → Part 6 |

### Part 3: Voice and Isolation (Голос)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| Voice Isolation | Part 3 | p3_voice_isolation | Rule+Hierarchy | Core principle of voice isolation and why it matters |
| Иерархия влияния | Part 3 | p3_influence_hierarchy | Reference | Порядок: SP > Description > Examples > Greeting. How different blocks affect voice |
| Правила Examples | Part 3 | p3_examples_rules | Rules | Как писать Examples. Structural rules and formatting |
| Качество Examples | Part 3 | p3_examples_quality | Classification | Quality tiers for Examples. What separates good examples from bad |
| Greeting | Part 3 | p3_greeting | Structure | Сцена→Действие→Реплика. Greeting as voice anchor |
| Voice Leak (утечка голоса) | Part 3 | p3_voice_leak | Anti-pattern | Выщербленный — пример ошибки. Detecting and fixing voice bleed. Updated in Phase 4 |
| Крайний случай: голос без описания | Part 3 | p3_joker_case | Extreme example | Голос невозможно описать — только воспроизвести. General principle (rewritten from Джокер in Phase 4) |
| Мульти-персонажные примеры | Part 3 | p3_multi_char | Rules+Examples | Выщербленный + Йоуёма. Voice Bleed, Character Markers in multi-character contexts. Updated in Phase 4 |

### Part 4: SPINE Framework (СПИН)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| SPINE (обзор) | Part 4 | p4_spine_overview | Framework | Overview of all 5 SPINE elements: GHOST→LIE→FLAW→NEED→WANT |
| GHOST (Событие прошлого) | Part 4 | p4_ghost | Definition+Examples | Defining traumatic past event that drives the character |
| LIE (Ложная установка) | Part 4 | p4_lie | Definition+Examples | False belief derived from GHOST. How LIE distorts character perception |
| FLAW | Part 4 | p4_flaw | Definition+Examples | Конкретное поведение. Observable flaw born from LIE |
| NEED | Part 4 | p4_need | Definition+Examples | Истинная потребность. What the character actually needs (vs wants) |
| WANT | Part 4 | p4_want | Definition+Examples | Осознанное желание. What the character thinks they want |
| GHOST Layers | Part 4 | p4_ghost_layers | Full treatment | 3-tier структура GHOST. Deep structure of traumatic events |
| Полный СПИН (5 элементов) | Part 4 | p4_spine_full_chain | Chain-connection | GHOST→LIE→FLAW→NEED→WANT full chain. Эллиот Алдерсон example |
| SPINE → Anchors mapping | Part 4 | p4_spine_mapping | Protocol | WANT/NEED/FLAW → якоря derivation protocol |
| SPINE consistency check | Part 4 | p4_spine_check | Diagnostic | Внутренняя консистентность. Verifying SPINE elements align logically |
| SPINE Navigation | Part 4 | p4_spine_navigation | Navigation | Navigational map from GHOST to full card. Learning path through SPINE elements |

### Part 5: Psychology Toolkit (Психологический инструментарий)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| OCEAN (Big Five) | Part 5 | p5_ocean_basics | Tool+Interactive | Pentagon widget + золотое правило («Только 1–2 экстремальных полюса»). Contextual limits + validator |
| Елена OCEAN/Enneagram profile | Part 5 | p5_elena_profile | Example | OCEAN (O:72, C:65, E:41, A:38, N:68) + Enneagram 6w5 mapping to SPINE. Added in Phase 4 |
| Enneagram basics | Part 5 | p5_enneagram_basics | Tool+Interactive | 9 типов, SVG widget with interactive selection |
| OCEAN Value Conflicts | Part 5 | p5_ocean_warning | Warning | Moved from Part 8 AP-15. 3 conflict scenarios + OCEAN×Enneagram reference |
| MBTI | Appendix A | appendix_mbti | Tool+Interactive | Moved from Part 5 in Phase 2.3. 16 типов, filter grid with composer |
| MBTI Reference | Part 5 | p5_mbti_ref | Reference | Brief note linking to Appendix A |
| Enneagram → SPINE | Part 5 | p5_cross_instrument_map | Protocol | Страх→LIE, Желание→WANT, Стресс→FLAW, Рост→NEED. Cross-instrument mapping protocol |
| Enneagram wings | Part 5 | p5_enneagram_wings | Full treatment | Выбор крыла. Wing selection and its effect on SPINE derivation |
| OCEAN×Enneagram matrix | Part 5 | p5_cross_matrix | Interactive | Корреляция 5×9. Cross-validation between OCEAN and Enneagram profiles |

### Part 6: CoT — Chain of Thought (Цепочка рассуждений)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| CoT bridge (обзор) | Part 6 | p6_cot_bridge | Bridge | Навигационный мостик к CoT контенту. When and why to use Chain of Thought |
| CoT basics | Part 6 | p6_cot_basics | Definition | Основы CoT для 12B vs 32B+ моделей. Core concepts and terminology |
| CoT Tier definitions | Part 6 | p6_cot_tiers | Reference | Tier 0/1/2/3 определения. What each tier provides and when to use it |
| CoT Tier 2 | Part 6 | p6_cot_tier2 | Template | Structured internal process. Template for mid-level CoT implementation |
| CoT Tier 3 | Part 6 | p6_cot_tier3 | Template | Full XML blocks. Пример: Эллиот Алдерсон. Advanced CoT with full reasoning |
| CoT anchors | Part 6 | p6_cot_anchors | Rules | Внутренний процесс как якорь. How CoT serves as behavioral anchor |

### Part 7A: System Prompt & Assembly (System Prompt и сборка)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| System Prompt (SP) | Part 7A | p7a_system_prompt | Template+Rules | Split from Part 7 in Phase 2.1 |
| CORE DIRECTIVES | Part 7A | p7a_core_directives | System | Split from Part 7 in Phase 2.1 |
| Tone Frame | Part 7A | p7a_tone_frame | Technique | Split from Part 7 in Phase 2.1 |
| Format Lock | Part 7A | p7a_format_lock | Rule | Split from Part 7 in Phase 2.1 |
| Author's Note (AN) | Part 7A | p7a_authors_note | Template+Rules | Split from Part 7 in Phase 2.1 |
| Sampling parameters | Part 7A | p7a_sampling_params | Reference | Split from Part 7 in Phase 2.1 |
| Model Type Checklist | Part 7A | p7a_model_checklist | Reference | Split from Part 7 in Phase 2.1 |
| OOC Protection | Part 7A | p7a_ooc_protection | Technique | Split from Part 7 in Phase 2.1 |
| XML tags | Part 7A | p7a_xml_tags | Full treatment | Split from Part 7 in Phase 2.1 |
| API blocks | Part 7A | p7a_api_blocks | Template | Split from Part 7 in Phase 2.1 |
| 4K-Fallback | Part 7A | p7a_4k_fallback | Protocol | Split from Part 7 in Phase 2.1 |
| Assembly Pipeline | Part 7A | p7a_assembly_pipeline | Pipeline | Split from Part 7 in Phase 2.1 |

### Part 7B: Lorebook, Greeting & Compatibility (Lorebook, приветствие и совместимость)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| Lorebook (LB) basics | Part 7B | p7b_lorebook_basics | Template+Rules | Split from Part 7 in Phase 2.1 |
| Lorebook Mechanics | Part 7B | p7b_lorebook_mechanics | Full treatment | Split from Part 7 in Phase 2.1 |
| Lorebook Advanced | Part 7B | p7b_lorebook_advanced | Full treatment | Split from Part 7 in Phase 2.1 |
| Structured Inject | Part 7B | p7b_structured_inject | Technique | Split from Part 7 in Phase 2.1 |

### Part 8: Anti-patterns (Анти-паттерны)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| Anti-pattern overview | Part 8 | p8_antipatterns_overview | Catalog | Классификация анти-паттернов. Index of all 15 anti-patterns with severity ratings |
| AP-1: Token bloat | Part 8 | p8_ap1_token_bloat | Anti-pattern | Раздувание токенов. Overloading card with unnecessary content |
| AP-2: Missing price | Part 8 | p8_ap2_missing_price | Anti-pattern | Отсутствие цены у якоря. Anchors without behavioral cost |
| AP-3: Voice in Description | Part 8 | p8_ap3_voice_in_description | Anti-pattern | Голос в Description вместо Examples. Voice belongs in Examples, not Description |
| AP-4: GHOST in SP | Part 8 | p8_ap4_ghost_in_sp | Anti-pattern | Психология в System Prompt. GHOST/LIE should not pollute SP |
| AP-5: RepPen high | Part 8 | p8_ap5_reppen_high | Anti-pattern | RepPen > 1.10. Over-penalizing repetition harms natural speech |
| AP-6: No anti-godmoding | Part 8 | p8_ap6_no_anti_godmoding | Anti-pattern | Отсутствие анти-годмодинга. Missing godmoding prevention |
| AP-7: Presence Penalty | Part 8 | p8_ap7_presence_penalty | Anti-pattern | Presence Penalty > 0. Should be zero for character cards |
| AP-8: GHOST no anchors | Part 8 | p8_ap8_ghost_no_anchors | Anti-pattern | GHOST без якорей. GHOST must be expressed through anchors |
| AP-9: Broken SPINE | Part 8 | p8_ap9_spine_broken | Diagnostic | Конфликтующие элементы СПИН. SPINE elements contradict each other |
| AP-10: CoT overload | Part 8 | p8_ap10_cot_overload | Anti-pattern | Перегрузка CoT-якорями. Too much CoT structure overwhelms model |
| AP-11: Voice Bleed | Part 8 | p8_ap11_voice_bleed | Anti-pattern | Переплетение голосов. Уолтер Уайт + Джесси Пинкман |
| AP-12: XML malformed | Part 8 | p8_ap12_xml_malformed | Anti-pattern | Некорректные XML-теги. Broken XML syntax breaks parsing |
| AP-13: Lorebook conflict | Part 8 | p8_ap13_lorebook_conflict | Anti-pattern | Конфликт Lorebook-записей. Contradictory entries in lorebook |
| AP-14: Context violation | Part 8 | p8_ap14_context_violation | Anti-pattern | Нарушение контекстного окна. Content exceeds available context |
| AP-15: Nested Anchors | Part 8 | p8_ap15_nested_anchors | Anti-pattern | Anchor chains → unpredictability. Nested anchor structures cause erratic behavior |

### Part 9: Diagnostics and Debugging (Диагностика)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| Шкала качества карточки | Part 9 | p9_quality_scale | Reference | 3-level quality table (Critical / Bad / Good). Overall card quality assessment |
| One Change Rule | Part 9 | p9_one_change_rule | Rule | Never change >1 parameter at a time. Isolating variables during debugging |
| Диагностика и чек-лист | Part 9 | p9_basic_checklist | Checklist | Чек-лист с cross-references на p1_core_rules. Basic diagnostic checklist |
| Дополнительные проблемы | Part 9 | p9_additional_problems | Quick reference | Additional common problems beyond the top-3. Quick reference with solutions |
| Symptom table | Part 9 | p9_symptom_table | Diagnostic | 10 строк симптом→диагноз→решение. Comprehensive symptom-to-fix mapping |
| Decision Tree | Part 9 | p9_decision_tree | Diagnostic | Branching symptom→check→fix logic. Decision flow for debugging |
| Test scenarios | Part 9 | p9_test_scenarios | Protocol | 6 тестовых сценариев. Standardized testing procedures |
| Element→Scenario Mapping | Part 9 | p9_element_scenario_map | Reference | Dynamic element → test scenario + verification. Mapping card elements to appropriate tests |
| Test Requirements | Part 9 | p9_test_requirements | Reference | Min scenarios per card complexity + 6 success metrics |
| 12B-specific issues | Part 9 | p9_12b_issues | Special | Диагностика для 12B моделей. Model-specific limitations and workarounds |
| Pre-Deploy Validation | Part 9 | p9_pre_deploy | Checklist | Quick Check (5 items) + Full Check (14 items). Final validation before deployment |

### Part 10: Full Card Examples (Примеры карточек)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| Елена | Part 10 | p10_elena | Complete card | Минимальная карточка → full card progression. От базовой карточки до SPINE. Includes Voice Warning callout |
| Геральт | Part 10 | p10_geralt | Complete card | WANT/NEED/FLAW. Witcher character with clear SPINE structure |
| Эдвард Элрик | Part 10 | p10_edward | Complete card | Кристально ясный СПИН. WANT/NEED/FLAW. Classic shonen protagonist |
| Уолтер Уайт | Part 10 | p10_walter | Complete card | Realistic modern character, WANT/NEED/FLAW. Multi-character voice isolation example |
| Омнис-Зета 7-Квин | Part 10 | p10_omnis | Complete card | Тех-Жрец, Адептус Механикус. Full progression: basic → SPINE + OCEAN + FLAW-linked anchors → GHOST Layers + CoT + XML |
| Выщербленный | Part 10 | p10_vysherblenny | Complete card | GHOST Layers + CoT + XML (~1500+ токенов). Most advanced example card |

---

### Appendix A: MBTI Reference (Справочник MBTI)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| MBTI | Appendix A | appendix_mbti | Tool+Interactive | Moved from Part 5 in Phase 2.3 |

### Appendix B: Model Capability Table (Таблица возможностей моделей)

| Concept | Canonical Part | data-section ID | Content Type | Notes |
|---------|---------------|-----------------|--------------|-------|
| Model Capability Table | Appendix B | appendix_model_table | Reference | Created in Phase 3.3 from consolidated MODEL_NOTE tags |

---

## Summary Table

| Part | Title | Sections |
|------|-------|----------|
| Part 1 | Basic Blocks | 5 |
| Part 2 | Behavioral Anchors | 6 |
| Part 3 | Voice and Isolation | 8 |
| Part 4 | SPINE Framework | 11 |
| Part 5 | Psychology Toolkit | 8 (added p5_elena_profile in Phase 4) |
| Part 6 | CoT | 6 |
| Part 7A | System Prompt & Assembly | 12 |
| Part 7B | Lorebook, Greeting & Compatibility | 4 |
| Part 8 | Anti-patterns | 15 (removed AP-15, renumbered AP-16→AP-15) |
| Part 9 | Diagnostics | 11 |
| Part 10 | Full Card Examples | 6 |
| Appendix A | MBTI Reference | 1 |
| Appendix B | Model Capability Table | 1 |
| **Total** | | **94** |

---

## Cross-Reference Rules

### DAG Direction

Links flow **unidirectionally from complex to simple**:

```
Part 4 (SPINE) ──can reference──▶ Part 2 (Anchors)
Part 5 (OCEAN) ──can reference──▶ Part 4 (SPINE)
Part 6 (CoT) ──can reference──▶ Part 2 (Anchors), Part 4 (SPINE)
Part 7A (System Prompt & Assembly) ──can reference──▶ Part 2 (Anchors), Part 4 (SPINE)
Part 7B (Lorebook & Greeting) ──can reference──▶ Part 2 (Anchors), Part 4 (SPINE)
Part 8 (Anti-patterns) ──can reference──▶ Parts 2, 3, 4, 5
Part 9 (Diagnostics) ──can reference──▶ Parts 7A, 7B, 8
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
section p2_embodiment. Здесь мы рассматриваем их связь с SPINE.
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

*Document prepared for Live Character Guide v9 rebuild project*
*Updated 2026-05-15: v9.0.0 — Phases 2–3 restructure. Part 7 split into 7A/7B, MBTI moved to Appendix A, AP-15 OCEAN Overload moved to Part 5, AP-16 renumbered to AP-15, Appendix B added for Model Capability Table. 93 sections across 10 parts + 2 appendices.*
