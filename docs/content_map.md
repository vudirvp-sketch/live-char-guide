# Content Ownership Map — Live Character Guide v6

> **Version:** 2.3
> **Last Updated:** 2026-04-23
> **Status:** Canonical Reference (post-layer-restructure, post-remediation, post-lorebook-enhancement, post-TP-11-20)

---

## Purpose

This document is the **single source of truth** for "where does concept X live." Without it, models must infer ownership from multiple Part specs — error-prone and the root cause of duplication in previous iterations.

**Rules:**
- Every concept mentioned in any Part MUST have exactly one row in this table
- If a concept has no row → it's an orphan → IMP-28 violation
- If a concept has two rows → it's duplicated → IMP-5 violation
- Read this BEFORE writing any Part
- Updated after each phase by appending new rows

**Post-restructure note (Phase 5):** This version was completely rewritten after the layer restructure (Phases 1–4 of `layer-restructure-plan-v3.md`). All phantom IDs removed, all missing IDs added, all layer values updated to match post-restructure state.

**Post-remediation note (Phase 6):** Statistics corrected after L1 Remediation Plan v3 execution and Content Restoration phases. L1 section count updated from 17 → 18 (Part 1 has 8 L1 sections, not 7). Total section count aligned with build output (102 sections from build-layers.mjs, including p10_walter_l2).

---

## Content Ownership Table

### Part 1: Basic Blocks (Базовые блоки)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Карточка персонажа | Part 1 | p1_card_overview | l1 | Definition | 4 блока карточки: SP, Description, Examples, Greeting |
| Core Rules (5 правил) | Part 1 | p1_core_rules | l1 | Rules | GHOST inline definition + layer-remark bridge. Перенесено из glossary.json → Part 1 |
| Сравнение слоёв | Part 1 | p1_layer_comparison | l1 | Reference | L1 vs L2 vs L3 comparison table. SPINE row: L2 = WANT/NEED/FLAW, L3 = +LIE/GHOST |
| L1 Quickstart | Part 1 | p1_l1_quickstart | l1 | Template | 5-minute template → minimal card. Ссылка на p10_elena_l1 вместо отдельной секции p1_elena_minimal. Чек-лист минимальный (3 пункта) |
| Топ-3 критичные ошибки | Part 1 | p1_top3_problems | l1 | Detailed problems | Подробный разбор 3 ошибок: симптом→причина→исправление→до/после. Не дублирует p9_top5_problems |
| Следующие шаги | Part 1 | p1_next_layers | l1 | Bridge (consolidated) | Консолидация 7 bridge секций (p1_l2_bridge, p1_l3_bridge, p4-p8_l1_bridge). 2 subsections: L2 и L3 |
| Токен-бюджет | Part 1 | p1_token_budget | l1 | Reference | Мерж p1_token_pipeline + p1_block_budget. 2 subsections: конвейер сборки + лимиты по блокам. Только L1 блоки. Без подтаблицы AN/Lorebook/CoT |
| Заключение | Part 1 | p1_conclusion | l1 | Summary | Резюме L1 + ссылка на p1_core_rules (без дублирования правил) + ссылка на p1_next_layers. Без L2/L3 capabilities |

### Part 2: Behavioral Anchors (Якоря)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Якорь (Anchor) | Part 2 | p2_basic_anchors | l1 | Definition+Rules | Формат: T→A→P |
| Правила якорей | Part 2 | p2_anchor_rules | l1 | Rules | Цена обязательна, формат T→A→P |
| Примеры якорей | Part 2 | p2_anchor_examples | l1 | Examples | Таблица примеров + wrong/correct пример перед таблицей |
| FLAW-linked якоря | Part 2 | p2_flaw_anchors | l2 | Rules+Examples | Как выводить якоря из FLAW |
| Embodiment (Телесность) | Part 2 | p2_embodiment | l2 | Full treatment | Протокол: Состояние→Тело→Сенсор→Речь |
| Сенсорные якоря | Part 2 | p2_sensory_anchors | l3 | Full treatment | Сенсорные якоря для GHOST. Ссылка на CoT-якоря → Part 6 |
| ENVIRONMENTAL REACTIVITY | Part 2 | p2_env_reactivity | l2 | Directive | Sensory details only through character action. NEW |

### Part 3: Voice and Isolation (Голос)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Voice Isolation | Part 3 | p3_voice_isolation | l1 | Rule+Hierarchy | Иерархия влияния на голос |
| Иерархия влияния | Part 3 | p3_influence_hierarchy | l1 | Reference | Порядок: SP > Description > Examples > Greeting |
| Правила Examples | Part 3 | p3_examples_rules | l2 | Rules | Как писать Examples |
| Качество Tier | Part 3 | p3_tier_quality | l2 | Classification | Tier 1/2/3 для Examples |
| Greeting | Part 3 | p3_greeting | l2 | Structure | Сцена→Действие→Реплика |
| Voice Leak (утечка голоса) | Part 3 | p3_voice_leak | l2 | Anti-pattern | «Красноречивый Джесси» — пример ошибки |
| Крайний случай: Джокер | Part 3 | p3_joker_case | l2 | Extreme example | Голос невозможно описать — только воспроизвести |
| Мульти-персонажные примеры | Part 3 | p3_multi_char | l3 | Rules+Examples | Уолтер Уайт + Джесси Пинкман. Voice Bleed, Character Markers |

### Part 4: SPINE Framework (СПИН)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| SPINE (обзор) | Part 4 | p4_spine_overview | l2 | Framework | WANT/NEED/FLAW (L2). LIE/GHOST — bridge → L3 |
| WANT | Part 4 | p4_want | l2 | Definition+Examples | Осознанное желание |
| NEED | Part 4 | p4_need | l2 | Definition+Examples | Истинная потребность |
| FLAW | Part 4 | p4_flaw | l2 | Definition+Examples | Конкретное поведение |
| SPINE → Anchors mapping | Part 4 | p4_spine_mapping | l2 | Protocol | WANT/NEED/FLAW → якоря. GHOST/LIE отмечены как L3-only |
| *(moved)* L2 Quickstart | Part 4 | p4_l2_quickstart | l2 | Note | ⚠ Moved to Part 5 as p5_l2_quickstart. See navigational link below |
| LIE (Ложная установка) | Part 4 | p4_lie | l3 | Definition+Examples | Перемещено из L2 → L3 при реструктуризации |
| GHOST (Событие прошлого) | Part 4 | p4_ghost | l3 | Definition+Examples | Перемещено из L2 → L3 при реструктуризации |
| GHOST Layers | Part 4 | p4_ghost_layers | l3 | Full treatment | 3-tier структура GHOST |
| L3 Learning Path | Part 4 | p4_l3_learning_path | l3 | Navigation | Навигационная карта L3 (from GHOST to full card) |
| SPINE consistency check | Part 4 | p4_spine_check | l3 | Diagnostic | Внутренняя консистентность |
| Полный СПИН (5 элементов) | Part 4 | p4_l3_spine_full | l3 | Chain-connection | GHOST→LIE→FLAW→NEED→WANT + Эллиот Алдерсон. НЕ переопределяет LIE/GHOST |

### Part 5: Psychology Toolkit (Психологический инструментарий)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| OCEAN (Big Five) | Part 5 | p5_ocean_basics | l2 | Tool+Interactive | Pentagon widget + золотое правило `.callout.important` («Только 1–2 экстремальных полюса»). План указывал p5_ocean_poles, но реализация помещает правило в p5_ocean_basics для лучшего педагогического потока |
| OCEAN poles | Part 5 | p5_ocean_poles | l2 | Rules | Контекстно-зависимое количество полюсов + 5 шагов OCEAN→карточка |
| OCEAN validator | Part 5 | p5_ocean_validator | l2 | Interactive | Слайдеры + polygon + suggestions |
| Enneagram basics | Part 5 | p5_enneagram_basics | l2 | Tool+Interactive | 9 типов, SVG widget |
| Enneagram interactive | Part 5 | p5_enneagram_widget | l2 | Interactive | SVG diagram + detail panel |
| Enneagram → SPINE | Part 5 | p5_enneagram_to_spine | l2 | Protocol | Страх→LIE (L3 ref), Желание→WANT, Стресс→FLAW, Рост→NEED |
| MBTI | Part 5 | p5_mbti_basics | l2 | Tool+Interactive | 16 типов, filter grid |
| L2 Quickstart | Part 5 | p5_l2_quickstart | l2 | Checklist | L2 Quickstart (moved from Part 4, now after OCEAN/Enneagram) |
| Enneagram wings | Part 5 | p5_enneagram_wings | l3 | Full treatment | Выбор крыла |
| OCEAN×Enneagram matrix | Part 5 | p5_cross_matrix | l3 | Interactive | Корреляция 5×9 |

### Part 6: CoT — Chain of Thought (Цепочка рассуждений)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| CoT basics | Part 6 | p6_cot_basics | l3 | Definition | Перемещено из L2 → L3. Для 12B vs 32B+ |
| CoT Tier definitions | Part 6 | p6_cot_tiers | l3 | Reference | Tier 0/1/2/3 определения. Перемещено из L2 → L3 |
| CoT Tier 2 | Part 6 | p6_cot_tier2 | l3 | Template | Structured internal process |
| CoT Tier 3 | Part 6 | p6_cot_tier3 | l3 | Template | Full XML blocks. Пример: Эллиот Алдерсон |
| CoT anchors | Part 6 | p6_cot_anchors | l3 | Rules | Внутренний процесс как якорь |
| L3 Quickstart (CoT) | Part 6 | p6_l3_quickstart | l3 | Checklist | 60-минутный pipeline |

### Part 7: Technical Implementation (Техническая реализация)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| System Prompt (SP) | Part 7 | p7_system_prompt | l2 | Template+Rules | Базовые запреты |
| Sampling parameters | Part 7 | p7_sampling_params | l2 | Reference | Temperature, RepPen, Top P, etc. |
| Format Lock | Part 7 | p7_format_lock | l2 | Rule | Фиксация формата диалога + системы A/B/C |
| Author's Note (AN) | Part 7 | p7_authors_note | l2 | Template+Rules | Динамический контекст |
| Structured Inject | Part 7 | p7_structured_inject | l2 | Technique | XML-теги для мотивации в AN |
| Lorebook (LB) | Part 7 | p7_lorebook | l2 | Template+Rules | Триггеры для GHOST + таблица совместимости фронтендов |
| Lorebook Mechanics | Part 7 | p7_lorebook_mechanics | l2 | Full treatment | Каскад по диапазону, комбинированный триггер, контекстный фильтр. NEW |
| Lorebook Advanced | Part 7 | p7_lorebook_advanced | l3 | Full treatment | Эмуляция усталости, мета-лор, ложная память. NEW |
| XML tags | Part 7 | p7_xml_tags | l3 | Full treatment | Синтаксис и применение XML для Description |
| API blocks | Part 7 | p7_api_blocks | l3 | Template | Claude/GPT specifics |
| 4K-Fallback | Part 7 | p7_4k_fallback | l3 | Protocol | Адаптация для ≤4K контекста |
| CORE DIRECTIVES | Part 7 | p7_core_directives | l2 | System | Unified 7-directive system in English. L2 = directives 1–5, L3 = all 7. NEW |
| Tone Frame | Part 7 | p7_tone_frame | l2 | Technique | Dual-function SP element (~25-30 tokens). NEW |
| OOC Protection | Part 7 | p7_ooc_protection | l3 | Technique | SP block for OOC reaction (~15 tokens). NEW |
| Immersion Boundary | Part 7 | p7_immersion_boundary | l3 | Technique | Advanced OOC protection: deny meta-reality. NEW |
| L3 CORE DIRECTIVES Extension | Part 7 | p7_core_directives_l3 | l3 | System | Directives 6–7 (CONSEQUENCE DRIVEN, PRE-GENERATION FILTER). Cross-ref to p7_core_directives for 1–5. NEW |
| Model Type Checklist | Part 7 | p7_model_checklist | l2 | Reference | Summary table by model type (12B/32B+/API). NEW |
| L3 SP Template | Part 7 | p7_sp_template_l3 | l3 | Template | Full L3 System Prompt template with all 7 directives. NEW |
| L3 AN Template | Part 7 | p7_authors_note_l3 | l3 | Template | 4-section AN with GHOST-activation. NEW |

### Part 8: Anti-patterns (Анти-паттерны)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Anti-pattern overview | Part 8 | p8_antipatterns_overview | l2 | Catalog | Классификация анти-паттернов |
| AP-1: Token bloat | Part 8 | p8_ap1_token_bloat | l2 | Anti-pattern | Раздувание токенов |
| AP-2: Missing price | Part 8 | p8_ap2_missing_price | l2 | Anti-pattern | Отсутствие цены у якоря |
| AP-3: Voice in Description | Part 8 | p8_ap3_voice_in_description | l2 | Anti-pattern | Голос в Description вместо Examples |
| AP-4: GHOST in SP | Part 8 | p8_ap4_ghost_in_sp | l2 | Anti-pattern | Психология в System Prompt |
| AP-5: RepPen high | Part 8 | p8_ap5_reppen_high | l2 | Anti-pattern | RepPen > 1.10 |
| AP-6: No anti-godmoding | Part 8 | p8_ap6_no_anti_godmoding | l2 | Anti-pattern | Отсутствие анти-годмодинга |
| AP-7: Presence Penalty | Part 8 | p8_ap7_presence_penalty | l2 | Anti-pattern | Presence Penalty > 0 |
| AP-8: GHOST no anchors | Part 8 | p8_ap8_ghost_no_anchors | l3 | Anti-pattern | GHOST без якорей |
| AP-9: Broken SPINE | Part 8 | p8_ap9_spine_broken | l3 | Diagnostic | Конфликтующие элементы СПИН |
| AP-10: CoT overload | Part 8 | p8_ap10_cot_overload | l3 | Anti-pattern | Перегрузка CoT-якорями |
| AP-11: Voice Bleed | Part 8 | p8_ap11_voice_bleed | l3 | Anti-pattern | Переплетение голосов. Уолтер Уайт + Джесси Пинкман |
| AP-12: XML malformed | Part 8 | p8_ap12_xml_malformed | l3 | Anti-pattern | Некорректные XML-теги |
| AP-13: Lorebook conflict | Part 8 | p8_ap13_lorebook_conflict | l3 | Anti-pattern | Конфликт Lorebook-записей |
| AP-14: Context violation | Part 8 | p8_ap14_context_violation | l3 | Anti-pattern | Нарушение контекстного окна |
| AP-15: OCEAN overload (basic) | Part 8 | p8_ap15_basic | l2 | Anti-pattern | Базовое правило: не больше 1–2 экстремальных полюсов |
| AP-15: OCEAN overload (extended) | Part 8 | p8_ap15_extended | l3 | Extended treatment | 3 сценария конфликта полюсов + OCEAN×Enneagram ссылка |
| AP-16: Nested Anchors | Part 8 | p8_ap16_nested_anchors | l2 | Anti-pattern | Anchor chains → unpredictability. NEW |

### Part 9: Diagnostics and Debugging (Диагностика)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Диагностика и чек-лист | Part 9 | p9_basic_checklist | l1 | Checklist | Мерж p9_troubleshooting + p9_basic_checklist. Чек-лист с cross-references на p1_core_rules |
| Топ-5 проблем | Part 9 | p9_top5_problems | l1 | Quick reference | Краткий справочник: 5 строк, 1 колонка решения. Ссылки на p1_top3_problems для первых 3 |
| Symptom table | Part 9 | p9_symptom_table | l2 | Diagnostic | 10 строк симптом→диагноз→решение |
| Test scenarios | Part 9 | p9_test_scenarios | l2 | Protocol | 6 тестовых сценариев |
| 12B-specific issues | Part 9 | p9_12b_issues | l3 | Special | Диагностика для 12B моделей |
| Layer transition | Part 9 | p9_layer_transition | l3 | Criteria | Критерии перехода L1→L2, L2→L3. Добавлены LIE/GHOST и CoT |
| One Change Rule | Part 9 | p9_one_change_rule | l1 | Rule | Never change >1 parameter at a time. NEW |
| Decision Tree | Part 9 | p9_decision_tree | l2 | Diagnostic | Branching symptom→check→fix logic. NEW |
| Element→Scenario Mapping | Part 9 | p9_element_scenario_map | l2 | Reference | Dynamic element → test scenario + verification. NEW |
| Test Requirements by Layer | Part 9 | p9_test_requirements | l2 | Reference | Min scenarios per layer + 6 success metrics. NEW |
| Pre-Deploy Validation | Part 9 | p9_pre_deploy | l3 | Checklist | Quick Check (5 items) + Full Check (14 items). NEW |
| Шкала качества карточки | Part 9 | p9_quality_scale | l1 | Reference | 3-level quality table (Critical / Bad / Good). NEW |

### Part 10: Full Card Examples (Примеры карточек)

| Concept | Canonical Part | data-section ID | Layer | Content Type | Notes |
|---------|---------------|-----------------|-------|--------------|-------|
| Елена (L1) | Part 10 | p10_elena_l1 | l1 | Complete card | Минимальная карточка (~580 токенов). Каноническое расположение |
| Елена (L2) | Part 10 | p10_elena_l2 | l2 | Complete card | WANT/NEED/FLAW только (LIE/GHOST удалены при реструктуризации) |
| Геральт (L2) | Part 10 | p10_geralt_l2 | l2 | Complete card | WANT/NEED/FLAW только (LIE/GHOST удалены при реструктуризации) |
| Эдвард Элрик (L2) | Part 10 | p10_edward_l2 | l2 | Complete card | Кристально ясный СПИН. WANT/NEED/FLAW только. Новый раздел |
| Выщербленный (L3) | Part 10 | p10_vysherblenny_l3 | l3 | Complete card | GHOST Layers + CoT + XML (~1500+ токенов) |
| Уолтер Уайт (L2) | Part 10 | p10_walter_l2 | l2 | Complete card | Realistic modern character, WANT/NEED/FLAW. NEW |
| Voice Warning (L2) | Part 10 | p10_l2_voice_warning | l2 | Rule | Общее предупреждение о голосе для L2 примеров |
| Омнис-Зета 7-Квин (L1) | Part 10 | p10_omnis_l1_card | l1 | Complete card | L1 карточка Омнис-Зета 7-Квин (Tech-Priest, Adeptus Mechanicus) |
| Омнис-Зета 7-Квин (L2) | Part 10 | p10_omnis_l2_card | l2 | Complete card | L2 карточка Омнис-Зета 7-Квин (SPINE + OCEAN + FLAW-linked anchors) |
| Омнис-Зета 7-Квин (L3) | Part 10 | p10_omnis_l3_card | l3 | Complete card | L3 карточка Омнис-Зета 7-Квин (GHOST Layers + CoT + XML) |

---

## Statistics

| Part | L1 | L2 | L3 | Total |
|------|----|----|-----|-------|
| Part 1 (Basic Blocks) | 8 | 0 | 0 | 8 |
| Part 2 (Anchors) | 3 | 3 | 1 | 7 |
| Part 3 (Voice) | 2 | 5 | 1 | 8 |
| Part 4 (SPINE) | 0 | 6 | 6 | 12 |
| Part 5 (Psych Toolkit) | 0 | 8 | 2 | 10 |
| Part 6 (CoT) | 0 | 0 | 6 | 6 |
| Part 7 (Technical) | 0 | 10 | 9 | 19 |
| Part 8 (Anti-patterns) | 0 | 10 | 8 | 18 |
| Part 9 (Diagnostics) | 4 | 5 | 3 | 12 |
| Part 10 (Examples) | 2 | 6 | 2 | 10 |
| **Total** | **20** | **54** | **38** | **112** |

**Cumulative (as reader sees it):**
- **L1 sees: 20 sections** (down from 27 — 9 sections removed/merged by L1 Remediation Plan v3)
- **L2 sees: 74 sections** (+54 to L1)
- **L3 sees: 112 sections** (+38 to L2)

**Note:** Part 7 counts updated in v2.2: L2 = 10, L3 = 9. Added p7_lorebook_mechanics (L2) and p7_lorebook_advanced (L3) per Lorebook Enhancement Plan v1.1.

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
*Updated 2026-04-23: TP-11–20 changes — added p4_l3_learning_path, p5_l2_quickstart, p10_l2_voice_warning, p10_omnis_l1/l2/l3_card; moved p4_l2_quickstart to Part 5 (v2.3)*
*Updated 2026-04-23: added p7_lorebook_mechanics and p7_lorebook_advanced (v2.2)*
*Updated 2026-04-22: statistics corrected to match build output (v2.1)*
*Updated 2026-04-20: complete rewrite post-layer-restructure (Phases 1–4)*
