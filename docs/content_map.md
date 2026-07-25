# Content Ownership Map — Live Character Guide v9.1

> **Version:** 9.1.0
> **Last Updated:** 2026-06-24 (iter 18 — mirror Canon)
> **Status:** Canonical Reference (Canon mirror)

---

## Purpose

This document is the **single source of truth** for "where does concept X live." Without it, models must infer ownership from multiple Part specs — error-prone and the root cause of duplication in previous iterations.

**Rules:**
- Every concept mentioned in any Part MUST have exactly one row in this table
- If a concept has no row → it's an orphan → documentation violation
- If a concept has two rows → it's duplicated → documentation violation
- Read this BEFORE writing any Part
- **Canon is the source of truth for content.** This map mirrors Canon section IDs and points to the canonical file (`docs/canon/part_NN.md` / `appendix_*.md`)

---

## Content Ownership Table

### Part 1: Basic Blocks (Базовые блоки) — `docs/canon/part_01.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Зачем системный подход? | `p1_value_proposition` | §1.1 | Value Prop | Comparison table: Classic vs Systematic approach |
| Карточка персонажа | `p1_card_overview` | §1.2 | Definition | 4 блока карточки: SP, Description, Examples, Greeting. iter 61: §1.5+§1.6 merged as subsection «Token Budget и конвейер сборки» |
| Структура гайда (TOC) | `p1_structure_overview` | §1.3 | Navigation | Table of Contents (auto-generated) |
| Core Rules | `p1_core_rules` | §1.4 | Rules | 3 foundational rules of character creation |
| Топ-3 критичные ошибки | `p1_top3_problems` | §1.7 | Detailed problems | Подробный разбор 3 ошибок |

### Part 2: Behavioral Anchors (Якоря) — `docs/canon/part_02.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Якорь (Anchor) | `p2_basic_anchors` | §2.1 | Definition+Rules | T→A→P format |
| Правила якорей | `p2_anchor_rules` | §2.2 | Rules | Цена обязательна, T→A→P |
| Примеры якорей | `p2_anchor_examples` | §2.3 | Examples | Таблица + wrong/correct пример |
| Embodiment (Телесность) | `p2_embodiment` | §2.4 | Full treatment | State→Body→Sensor→Speech |
| ENVIRONMENTAL REACTIVITY | `p2_env_reactivity` | §2.5 | Directive | Sensory through character action |
| Сенсорные якоря | `p2_sensory_anchors` | §2.6 | Full treatment | Сенсорные якоря для GHOST |

### Part 3: Voice and Isolation (Голос) — `docs/canon/part_03.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Voice Isolation | `p3_voice_isolation` | §3.1 | Rule+Hierarchy | Core principle |
| Иерархия влияния | `p3_influence_hierarchy` | §3.2 | Reference | SP > Description > Examples > Greeting |
| Правила Examples | `p3_examples_rules` | §3.3 | Rules | Как писать Examples |
| Качество Examples | `p3_examples_quality` | §3.4 | Classification | Quality tiers |
| Greeting (ссылка) | `p3_greeting_ref` | §3.5 | Reference | Forward reference → Part 7B |
| Voice Leak (утечка голоса) | `p3_voice_leak` | §3.6 | Anti-pattern | Выщербленный — пример ошибки |
| Крайний случай: голос без описания | `p3_joker_case` | §3.7 | Extreme example | General principle |
| Мульти-персонажные примеры | `p3_multi_char` | §3.8 | Rules+Examples | Выщербленный + Йоуёма |

### Part 4: SPINE Framework (СПИН) — `docs/canon/part_04.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| SPINE (обзор) | `p4_spine_overview` | §4.1 | Framework | GHOST→LIE→FLAW→NEED→WANT overview |
| GHOST (Событие прошлого) | `p4_ghost` | §4.2 | Definition+Examples | Defining traumatic past event |
| LIE (Ложная установка) | `p4_lie` | §4.3 | Definition+Examples | False belief from GHOST |
| FLAW | `p4_flaw` | §4.4 | Definition+Examples | Observable flaw born from LIE |
| NEED | `p4_need` | §4.5 | Definition+Examples | True need (vs wants) |
| WANT | `p4_want` | §4.6 | Definition+Examples | Conscious desire |
| Полный СПИН (5 элементов) | `p4_spine_full_chain` | §4.7 | Chain-connection | GHOST→LIE→FLAW→NEED→WANT full chain |
| SPINE → Anchors mapping | `p4_spine_mapping` | §4.8 | Protocol | WANT/NEED/FLAW → якоря derivation |
| SPINE consistency check | `p4_spine_check` | §4.9 | Diagnostic | Внутренняя консистентность |
| SPINE Navigation | `p4_spine_navigation` | §4.10 | Navigation | Learning path through SPINE |
| GHOST Layers | `p4_ghost_layers` | §4.11 | Full treatment | 3-tier GHOST (G1/G2/G3) |

### Part 5: Psychology Toolkit (Психологический инструментарий) — `docs/canon/part_05.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| OCEAN | `p5_ocean_basics` | §5.1 | Tool+Interactive | Pentagon widget + золотое правило + stress types (iter 63: A59-1) |
| Елена OCEAN/Enneagram profile | `p5_elena_profile` | §5.2 | Example | OCEAN + Enneagram 6w5 mapping to SPINE + stress type (iter 63) |
| OCEAN Value Conflicts | `p5_ocean_warning` | §5.3 | Warning | Moved from Part 8 AP-15 (Phase 2.2) |
| Enneagram basics | `p5_enneagram_basics` | §5.4 | Tool+Interactive | 9 типов, SVG widget |
| Связь инструментов + MBTI (merged) | `p5_cross_instrument_map` | §5.5 | Protocol+Reference | iter 62: §5.5 MBTI stub merged as subsection + §5.6 merged into §5.5; R1 repetitions removed |
| Enneagram wings | `p5_enneagram_wings` | §5.6 | Full treatment | Wing selection (renumbered §5.7→§5.6 iter 62) |
| OCEAN×Enneagram matrix | `p5_cross_matrix` | §5.7 | Interactive | 5×9 корреляция (renumbered §5.8→§5.7 iter 62) |

### Part 6: CoT — Chain of Thought (Цепочка рассуждений) — `docs/canon/part_06.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| CoT bridge (обзор) | `p6_cot_bridge` | §6.1 | Bridge | Навигационный мостик |
| CoT basics | `p6_cot_basics` | §6.2 | Definition | Основы CoT для 12B vs 32B+ |
| CoT Tier definitions | `p6_cot_tiers` | §6.3 | Reference | Tier 0/1/2/3 определения |
| CoT Tier 2 | `p6_cot_tier2` | §6.4 | Template | Structured internal process |
| CoT Tier 3 | `p6_cot_tier3` | §6.5 | Template | Full XML blocks (Выщербленный) |
| CoT anchors | `p6_cot_anchors` | §6.6 | Rules | Внутренний процесс как якорь |

### Part 7A: System Prompt & Assembly — `docs/canon/part_07a.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| System Prompt (SP) | `p7a_system_prompt` | §7A.1 | Template+Rules | Container with all blocks |
| CORE DIRECTIVES | `p7a_core_directives` | §7A.2 | System | 7 директив, English in SP |
| Token Budget | `p7a_token_budget` | §7A.3 | Reference | Per-block limits + calculator + personality sub-budget (iter 63: A59-3) |
| Tone Frame | `p7a_tone_frame` | §7A.4 | Technique | Dual-function SP element |
| Format Lock | `p7a_format_lock` | §7A.5 | Rule | Output formatting rules |
| Author's Note (AN) | `p7a_authors_note` | §7A.6 | Template+Rules | Short instruction after SP |
| Sampling parameters | `p7a_sampling_params` | §7A.7 | Reference | Temperature, RepPen, etc. |
| Model Type Checklist | `p7a_model_checklist` | §7A.8 | Reference | 12B vs 32B+ vs API |
| OOC Protection | `p7a_ooc_protection` | §7A.9 | Technique | Anti-OOC mechanisms |
| XML tags | `p7a_xml_tags` | §7A.10 | Full treatment | `<identity>`, `<appearance>`, etc. |
| API blocks | `p7a_api_blocks` | §7A.11 | Template | API-only extensions |
| 4K-Fallback | `p7a_4k_fallback` | §7A.12 | Protocol | Compressed card for 4K context |
| Assembly Pipeline | `p7a_assembly_pipeline` | §7A.13 | Pipeline | Order of assembly operations |

### Part 7B: Lorebook, Greeting & Compatibility — `docs/canon/part_07b.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Structured Inject | `p7b_structured_inject` | §7B.1 | Technique | XML-based content injection |
| Greeting Message | `p7b_greeting` | §7B.2 | Structure+Rules | Sensory Anchor → тело FLAW → реплика → крючок |
| Lorebook (LB) basics | `p7b_lorebook_basics` | §7B.3 | Template+Rules | Key/Content/Position/Depth |
| Lorebook Mechanics | `p7b_lorebook_mechanics` | §7B.4 | Full treatment | EVENT compatibility, 3 mechanics |
| Lorebook Advanced | `p7b_lorebook_advanced` | §7B.5 | Full treatment | 3 advanced mechanics + integration |

### Part 8: Anti-patterns (Анти-паттерны) — `docs/canon/part_08.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Anti-pattern overview | `p8_antipatterns_overview` | §8.1 | Catalog | Index of all 15 anti-patterns |
| AP-1: Token bloat | `p8_ap1_token_bloat` | §8.2 | Anti-pattern | Раздувание токенов |
| AP-2: Missing price | `p8_ap2_missing_price` | §8.3 | Anti-pattern | Anchors without behavioral cost |
| AP-3: Voice in Description | `p8_ap3_voice_in_description` | §8.4 | Anti-pattern | Voice in Description вместо Examples |
| AP-4: GHOST in SP | `p8_ap4_ghost_in_sp` | §8.5 | Anti-pattern | Психология в System Prompt |
| AP-5: RepPen high | `p8_ap5_reppen_high` | §8.6 | Anti-pattern | RepPen > 1.10 |
| AP-6: No anti-godmoding | `p8_ap6_no_anti_godmoding` | §8.7 | Anti-pattern | Missing godmoding prevention |
| AP-7: Presence Penalty | `p8_ap7_presence_penalty` | §8.8 | Anti-pattern | Presence Penalty > 0 |
| AP-8: GHOST no anchors | `p8_ap8_ghost_no_anchors` | §8.9 | Anti-pattern | GHOST без якорей |
| AP-9: Broken SPINE | `p8_ap9_spine_broken` | §8.10 | Diagnostic | Конфликтующие SPINE elements |
| AP-10: CoT overload | `p8_ap10_cot_overload` | §8.11 | Anti-pattern | Перегрузка CoT-якорями |
| AP-11: Voice Bleed | `p8_ap11_voice_bleed` | §8.12 | Anti-pattern | Переплетение голосов |
| AP-12: XML malformed | `p8_ap12_xml_malformed` | §8.13 | Anti-pattern | Некорректные XML-теги |
| AP-13: Lorebook conflict | `p8_ap13_lorebook_conflict` | §8.14 | Anti-pattern | Конфликт Lorebook-записей |
| AP-14: Context violation | `p8_ap14_context_violation` | §8.15 | Anti-pattern | Нарушение контекстного окна |
| AP-15: Nested Anchors | `p8_ap15_nested_anchors` | §8.16 | Anti-pattern | Anchor chains → unpredictability |

### Part 9: Diagnostics and Debugging (Диагностика) — `docs/canon/part_09.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Шкала качества карточки | `p9_quality_scale` | §9.1 | Reference | 3-level quality table |
| One Change Rule | `p9_one_change_rule` | §9.2 | Rule | Never change >1 parameter at a time |
| Диагностика и чек-лист | `p9_basic_checklist` | §9.3 | Checklist | Cross-references на p1_core_rules |
| Дополнительные проблемы | `p9_additional_problems` | §9.4 | Quick reference | Beyond top-3 |
| Symptom table | `p9_symptom_table` | §9.5 | Diagnostic | 10 строк симптом→диагноз→решение |
| Decision Tree | `p9_decision_tree` | §9.6 | Diagnostic | Branching symptom→check→fix |
| Test scenarios | `p9_test_scenarios` | §9.7 | Protocol | 6 тестовых сценариев |
| Element→Scenario Mapping | `p9_element_scenario_map` | §9.8 | Reference | Element → test scenario |
| Test Requirements | `p9_test_requirements` | §9.9 | Reference | Min scenarios + 6 success metrics |
| 12B-specific issues | `p9_12b_issues` | §9.10 | Special | 12B model limitations |
| Pre-Deploy Validation | `p9_pre_deploy` | §9.11 | Checklist | Quick (5) + Full (14) checks |

### Part 10: Full Card Examples (Примеры карточек) — `docs/canon/part_10.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Елена | `p10_elena` | §10.1 | Complete card | ~440/900 tokens, full SPINE |
| Уолтер Уайт | `p10_walter` | §10.2 | Complete card | Realistic modern, full SPINE |
| Омнис-Зета 7-Квин | `p10_omnis` | §10.3 | Complete card | Тех-Жрец, ~1800 tokens |
| Выщербленный | `p10_vysherblenny` | §10.4 | Complete card | GHOST Layers + CoT + XML, ~1250+ tokens |

---

### Appendix A: MBTI Reference — `docs/canon/appendix_mbti.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| MBTI | `appendix_mbti` | §A.1 | Tool+Interactive | 4 оси + 16 типов + Keirsey темпераменты |

### Appendix B: Model Capability Table — `docs/canon/appendix_model_table.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Model Capability Table | `appendix_model_table` | §B.1 | Reference | 7-row table: 12B / 32B+ / API capabilities |

### Appendix C: Glossary — `docs/canon/appendix_glossary.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Глоссарий | `appendix_glossary` | §C.1 | Reference | 27 терминов, алфавитный указатель |

---

## Summary Table

| Part | Canon file | Sections | Iter | Status |
|------|-----------|----------|------|--------|
| Part 1 | `part_01.md` | 7 | iter 14 | ✅ MIGRATED |
| Part 2 | `part_02.md` | 6 | iter 14 | ✅ MIGRATED |
| Part 3 | `part_03.md` | 8 | iter 14 | ✅ MIGRATED |
| Part 4 | `part_04.md` | 11 | iter 7–9 | ✅ MIGRATED |
| Part 5 | `part_05.md` | 7 | iter 16 | ✅ MIGRATED |
| Part 6 | `part_06.md` | 6 | iter 16 | ✅ MIGRATED |
| Part 7A | `part_07a.md` | 13 | iter 10–11 | ✅ MIGRATED |
| Part 7B | `part_07b.md` | 5 | iter 16 | ✅ MIGRATED |
| Part 8 | `part_08.md` | 16 | iter 12 | ✅ MIGRATED |
| Part 9 | `part_09.md` | 11 | iter 13 | ✅ MIGRATED |
| Part 10 | `part_10.md` | 4 | iter 16 | ✅ MIGRATED |
| Appendix A (MBTI) | `appendix_mbti.md` | 1 | iter 18 | ✅ MIGRATED |
| Appendix B (Model Table) | `appendix_model_table.md` | 1 | iter 18 | ✅ MIGRATED |
| Appendix C (Glossary) | `appendix_glossary.md` | 1 | iter 18 | ✅ MIGRATED |
| **Total** | | **97** | | **Canon COMPLETE** |

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

When referencing another concept in Canon: `[ref: part_XX.md §X.Y — Title]`. One sentence max explaining the connection. No duplication of content.

---

## Validation Checklist

Before finalizing any Part, verify:

- [ ] All concepts in the Part have entries in this table
- [ ] No concept appears in two rows (duplication)
- [ ] All cross-references follow DAG direction
- [ ] All `data-section` IDs match this table AND Canon file
- [ ] Canon § column points to correct H2 section in `docs/canon/part_NN.md`

---

*Document mirror of Canon. Source of truth: `docs/canon/*.md` + `docs/canon/_README.md`. Updated 2026-06-24 iter 18.*
