# Content Ownership Map — Live Character Guide v9.2

> Version: 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> Last Updated: 2026-10-25 (iter 190 — v4-9 chapter 9: Parts 8/9 link-free, 62 rendering sections)
> Status: Canonical Reference (Canon mirror)

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

### Part 0: Orientation — `docs/canon/part_00.md`

> Created iter 38 (canon-only); **wired to runtime iter 169 (G4-LEARN (a), the owner-called switch package)**: `src/master/part_00.html` renders before Part 1 (the spec §3 Learn entry; corpus 96 -> 98).

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Как читать этот гайд | `p0_how_to_read` | §0.1 | Orientation | Что читатель получит, три маршрута чтения, карта модулей, скелет карточки Елены как цель, легенда меток (iter 171: rewritten as the reader on-ramp — contributor conventions removed) |
| TL;DR / Quick Start | `p0_tldr_quick_start` | §0.2 | Quick start | Минимальный quick-start для нового читателя; карточка = 5 блоков (4 обязательных + Lorebook) |

### Part 1: Basic Blocks (Базовые блоки) — `docs/canon/part_01.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Зачем системный подход? | `p1_value_proposition` | §1.1 | Value Prop | Comparison table: Classic vs Systematic approach |
| Карточка персонажа | `p1_card_overview` | §1.2 | Definition | 5 блоков карточки: System Prompt / Description / Examples + Anchors / Greeting / Lorebook (E01) + subsections «Структура гайда» и «Бюджет токенов и конвейер сборки» (refs → §7A.12/§7A.13) |
| Структурные свойства блоков | `p1_structure_overview` | §1.3 | Reference | Влияние блоков на модель + доля бюджета; ссылки на §7A.12/§7A.13 (iter 171: был «Структура гайда» с inline-TOC — дублирующая навигация удалена, маршрут чтения переехал в Part 0 §0.1) |
| Core Rules | `p1_core_rules` | §1.4 | Rules | 3 foundational rules of character creation + the closing synthesis (iter 190: the retired §1.5 synthesis paragraph landed here) |
| ~~Топ-3 критичные ошибки~~ | → `p9_basic_checklist` | — | absorbed | iter 190 (v4-9 chapter 9): the three worst errors merged into Part 9 «Пять самых частых ошибок» (with the ex-§9.2 #4/#5 rows); the id is a legacy redirect |
| Pre-build checklist | `p1_prebuild_checklist` | §1.6 | Checklist | 6 вопросов перед сборкой: модель, контекст, сложность, GHOST (1/Layers), CoT, Lorebook |

### Part 2: Behavioral Anchors (Якоря) — `docs/canon/part_02.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Якорь (Anchor) | `p2_basic_anchors` | §2.1 | Definition+Rules | T→A→P format |
| Правила якорей + примеры | `p2_anchor_rules` | §2.2 | Rules+Examples | Цена обязательна, T→A→P; таблица примеров + wrong/correct (absorbed `p2_anchor_examples`, v3 S4a iter 174; F-21 fixed) |
| Embodiment (Телесность) | `p2_embodiment` | §2.3 | Full treatment | State→Body→Sensor→Speech |
| ENVIRONMENTAL REACTIVITY | `p2_env_reactivity` | §2.4 | Directive | Sensory through character action |
| Сенсорные якоря | `p2_sensory_anchors` | §2.5 | Full treatment | Сенсорные якоря для GHOST |

### Part 3: Voice and Isolation (Голос) — `docs/canon/part_03.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Voice Isolation | `p3_voice_isolation` | §3.1 | Rule+Hierarchy | Core principle |
| Иерархия влияния | `p3_influence_hierarchy` | §3.2 | Reference | Недавний чат ≫ Examples > Greeting > AN > Description > SP (SP слабейший, ~0–2%); канонический владелец значений + проза «Хранилище ≠ Влияние». Одна числовая поверхность — таблица (E07 = визуализация, виджет = панель управления: переключение модели + экспорт; iter 180) |
| Правила Examples + качество | `p3_examples_rules` | §3.3 | Rules+Classification | Как писать Examples + quality tiers и демонстрация A-vs-C (absorbed `p3_examples_quality`, v3 S4a iter 174) |
| Greeting (ссылка) | `p3_greeting_ref` | §3.4 | Reference | Forward reference → Part 7B |
| Voice Leak + крайние случаи | `p3_voice_leak` | §3.5 | Anti-pattern+Examples | Выщербленный — пример ошибки; joker case (absorbed `p3_joker_case`) + мульти-персонаж/Voice Bleed (absorbed `p3_multi_char`) |

### Part 4: SPINE Framework (СПИН) — `docs/canon/part_04.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| SPINE (обзор) | `p4_spine_overview` | §4.1 | Framework | GHOST→LIE→FLAW→NEED→WANT overview + the Part-exit route (absorbed `p4_spine_navigation`, v3 S4a iter 174; F-14) |
| GHOST (Событие прошлого) + слои | `p4_ghost` | §4.2 | Definition+Examples | Defining traumatic past event; 3-tier GHOST layers (absorbed `p4_ghost_layers`) |
| LIE (Ложная установка) | `p4_lie` | §4.3 | Definition+Examples | False belief from GHOST |
| FLAW | `p4_flaw` | §4.4 | Definition+Examples | Observable flaw born from LIE |
| NEED + WANT | `p4_need` | §4.5 | Definition+Examples | True need + conscious desire subsection + the NEED↔WANT tension table (absorbed `p4_want`) |
| Цепочка + карта якорей + проверка | `p4_spine_full_chain` | §4.6 | Chain+Protocol+Diagnostic | Full chain walkthrough, SPINE→anchor map (absorbed `p4_spine_mapping`), 7-item consistency check (absorbed `p4_spine_check`) |

### Part 5: Psychology Toolkit (Психологический инструментарий) — `docs/canon/part_05.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| OCEAN + перегрузка | `p5_ocean_basics` | §5.1 | Tool+Interactive | Pentagon widget + золотое правило + stress types + the SINGLE pole-limit scale + OCEAN Overload (absorbed §5.3 `p5_ocean_warning`, v3 S4a iter 174; F-01/F-12 closed) |
| Елена OCEAN/Enneagram profile | `p5_elena_profile` | §5.2 | Example | OCEAN + Enneagram 6w5 mapping to SPINE + stress type (iter 63) |
| Enneagram basics + wings | `p5_enneagram_basics` | §5.3 | Tool+Interactive | 9 типов, E10 SVG widget, крылья (absorbed §5.6 `p5_enneagram_wings`, v3 S4a iter 174) |
| Связь инструментов + MBTI (merged) | `p5_cross_instrument_map` | §5.4 | Protocol+Reference | iter 62: MBTI stub merged as subsection; R1 repetitions removed |
| OCEAN×Enneagram matrix | `p5_cross_matrix` | §5.5 | Reference | Статическая 5×9 корреляция (9 строк, |r| ≥ 0.5 жирным) + 4-шаговая сверка трёх систем (iter 176: интерактивные persona-cross/synthesis удалены, F-18) |

### Part 6: CoT — Chain of Thought (Цепочка рассуждений) — `docs/canon/part_06.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| CoT basics (+ bridge) | `p6_cot_basics` | §6.1 | Definition | Основы CoT для 12B vs 32B+; bridge absorbed (v3 S4a iter 174; F-10 dead Quickstart promise deleted) |
| CoT Tier definitions | `p6_cot_tiers` | §6.2 | Reference | Tier 0/1/2/3 определения |
| CoT Tier 2 | `p6_cot_tier2` | §6.3 | Template | Structured internal process |
| CoT Tier 3 | `p6_cot_tier3` | §6.4 | Template | Full XML blocks (Выщербленный) |
| CoT anchors | `p6_cot_anchors` | §6.5 | Rules | Внутренний процесс как якорь |

### Part 7A: System Prompt & Assembly — `docs/canon/part_07a.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| System Prompt (SP) | `p7a_system_prompt` | §7A.1 | Template+Rules | Container with all blocks |
| CORE DIRECTIVES | `p7a_core_directives` | §7A.2 | System | 7 директив, English in SP |
| Token Budget | `p7a_token_budget` | §7A.12 | Reference | THE budget owner: per-block limits + calculator + personality sub-budget (iter 63: A59-3); Script Tax detail → Appendix E (iter 172) |
| Tone Frame | `p7a_tone_frame` | §7A.3 | Technique | Dual-function SP element |
| Format Lock | `p7a_format_lock` | §7A.4 | Rule | Output formatting rules |
| Author's Note (AN) | `p7a_authors_note` | §7A.5 | Template+Rules | Short instruction after SP |
| Sampling parameters | `p7a_sampling_params` | §7A.6 | Pointer | Two hard constraints stay inline (PP = 0.0, RepPen ≤ 1.10); tables, per-model recs, interfaces → Appendix E (iter 172) |
| Model Type Checklist | `p7a_model_checklist` | §7A.7 | Pointer | Capability rows live in Appendix E (merged with the old Appendix B table, iter 172) |
| OOC Protection | `p7a_ooc_protection` | §7A.8 | Technique | Anti-OOC mechanisms |
| XML tags | `p7a_xml_tags` | §7A.9 | Full treatment | `<identity>`, `<appearance>`, etc. |
| API blocks | `p7a_api_blocks` | §7A.10 | Pointer (collapsed) | «Если вы на API» disclosure; templates → Appendix E (iter 172) |
| 4K-Fallback | → `p7a_token_budget` | §7A.12 | absorbed | iter 189: one paragraph «Что помещается в 4K» inside the budget section; the id is a legacy redirect |
| Assembly Pipeline | `p7a_assembly_pipeline` | §7A.13 | Pipeline | Order of assembly operations |

### Part 7B: Lorebook, Greeting & Compatibility — `docs/canon/part_07b.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Greeting Message | `p7b_greeting` | §7B.1 | Structure+Rules | Sensory Anchor → тело FLAW → реплика → крючок; the E18 embed |
| Lorebook (LB): структура записи | `p7b_lorebook_basics` | §7B.2 | Template+Rules | Key/Content/Position/Depth; EVENT support is stated in place (v4-7, iter 188) |
| Lorebook: механики и бюджет | `p7b_lorebook_mechanics` | §7B.3 | Full treatment | 3 mechanics + 3 advanced mechanics + context budgets + integration checklist (iter 188: `p7b_lorebook_advanced` merged here) |
| ~~Structured Inject~~ | → `p7a_authors_note` | §7A.5 | absorbed | iter 188: the technique lives inside the AN section; the id is a legacy redirect |
| ~~Lorebook Advanced~~ | → `p7b_lorebook_mechanics` | — | absorbed | iter 188: merged into the mechanics section; the id is a legacy redirect |

### Part 8: Anti-patterns (Анти-паттерны) — `docs/canon/part_08.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Anti-pattern catalog | `p8_antipatterns_overview` | §8.1 | Catalog | All 15 anti-patterns in one place — the E12 grid (inside the section) + the corrected card payloads (iter 190: the OCEAN-Overload footnote and every owner/§ pointer removed — the reference carries no routing) |
| Anti-pattern worked examples | `p8_worked_examples` | §8.2 | Catalog | 15 `<details>` bodies carrying ONLY the unique payload (check / distinguishing signal / before-after) — iter 190 removed the symptom-cause-fix triple that repeated the cards above and all 22 owner links (`p8_ap*` ids stay redirects) |

### Part 9: Diagnostics and Debugging (Диагностика) — `docs/canon/part_09.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Диагностика: с чего начать | `p9_basic_checklist` | §9.1 | Checklist | The ONE entry (4-step route) + the five most common errors (iter 190: absorbed `p1_top3_problems` and the ex-§9.2 symptom table) + per-block localization scan + the flat symptom→check→fix lookup |
| ~~Symptom table~~ | → `p9_basic_checklist` | — | absorbed | iter 190 (v4-9): merged into §9.1 as the flat lookup (its #4/#5 rows became part of the 1–5 most-common list); the id is a legacy redirect |
| Decision Tree | `p9_decision_tree` | §9.3 | Diagnostic | E13 mapping sub-table «Три базовых симптома» + the E13 embed INSIDE the section (canonical home of the E13 payload, DEC-20; parity `scripts/audit_diagnostics_parity.py`); link-free since iter 190 |
| Чек-лист перед деплоем | `p9_pre_deploy` | §9.5 | Checklist | ONE checklist 1–18 (5 quick + 13 full — iter 190 added RepPen, Temperature, block budget, Embodiment) + E14 quality scale + Elena/Vysh worked examples |
| Testing / edit loop | `p9_test_scenarios` | §9.6 | Protocol | The one-change RULE (iter 190: absorbed `p9_one_change_rule`) + 6 scenarios + element→scenario map + min-6 + 6 success metrics |
| 12B-specific issues | `p9_12b_issues` | §9.7 | Special | 12B model delta over §9.1/§9.3; the chapter's only outbound link is the Part 10 bridge here |

### Part 10: Full Card Examples (Примеры карточек) — `docs/canon/part_10.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Какую карточку взять | `p10_index` | §10.0 | Index | Which card to take: difficulty, what it shows, model/context, what to copy / not copy; cards stay collapsed |
| Елена | `p10_elena` | §10.1 | Complete card | Basic target; budget → §7A.13 шаг 6 |
| Уолтер Уайт | `p10_walter` | §10.2 | Complete card | Realistic modern, full SPINE; budget → §7A.13 шаг 6 |
| Омнис-Зета 7-Квин | `p10_omnis` | §10.3 | Complete card | Тех-Жрец; budget → §7A.13 шаг 6 |
| Выщербленный | `p10_vysherblenny` | §10.4 | Complete card | GHOST Layers + CoT + XML; budget → §7A.13 шаг 6 |

---

### Appendix A: MBTI Reference — `docs/canon/appendix_mbti.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| MBTI | `appendix_mbti` | §A.1 | Tool+Interactive | 4 оси + 16 типов + Keirsey темпераменты |

### Appendix E: Model, Context & Generation Parameters — `docs/canon/appendix_model_params.md`

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Model, context & parameters | `appendix_model_params` | §E.1 | Reference | Merged capability table (13 rows: 12B–14B / 32B+ / API) + НАБЛЮДЕНИЕ + «Ключевые следствия» + 4K-Fallback profile + sampling tables (E17 embed) + Script Tax + SP language + API wrappers + EVENT frontend compatibility. Created iter 172 (v3 stage 2); absorbs the deleted Appendix B. |

### Appendix D: Character Map (conceptual — canon-only, no master HTML) — `docs/canon/appendix_character_map.md`

> Created iter 38. Conceptual reference (5-character comparison table): **no master HTML artifact by design**. Content lives at H1 level in the canon file (no H2).

| Concept | data-section ID | Canon § | Content Type | Notes |
|---------|-----------------|---------|--------------|-------|
| Карта персонажей | `appendix_character_map` | H1-level | Reference | 5 канонических персонажей: сравнение инструментов (GHOST/SPINE/Enneagram/OCEAN/CoT/Lorebook) |

---

## Summary Table

| Part | Canon file | Sections | Iter | Status |
|------|-----------|----------|------|--------|
| Part 0 | `part_00.md` | 2 | iter 38, wired 169 | ✅ MIGRATED (wired iter 169, G4-LEARN (a)) |
| Part 1 | `part_01.md` | 5 | iter 14 | ✅ MIGRATED (v4-9 iter 190: §1.5 → Part 9) |
| Part 2 | `part_02.md` | 5 | iter 14 | ✅ MIGRATED |
| Part 3 | `part_03.md` | 5 | iter 14 | ✅ MIGRATED |
| Part 4 | `part_04.md` | 6 | iter 7–9 | ✅ MIGRATED |
| Part 5 | `part_05.md` | 5 | iter 16 | ✅ MIGRATED |
| Part 6 | `part_06.md` | 5 | iter 16 | ✅ MIGRATED |
| Part 7A | `part_07a.md` | 13 | iter 10–11 | ✅ MIGRATED |
| Part 7B | `part_07b.md` | 5 | iter 16 | ✅ MIGRATED |
| Part 8 | `part_08.md` | 2 | iter 12 | ✅ MIGRATED |
| Part 9 | `part_09.md` | 5 | iter 13 | ✅ MIGRATED (v4-9 iter 190: 7 → 5) |
| Part 10 | `part_10.md` | 5 | iter 16 | ✅ MIGRATED |
| Appendix A (MBTI) | `appendix_mbti.md` | 1 | iter 18 | ✅ MIGRATED |
| Appendix E (Model, Context & Params) | `appendix_model_params.md` | 1 | iter 172 | ✅ CREATED (v3 stage 2; absorbs Appendix B) |
| Appendix D (Character Map, conceptual) | `appendix_character_map.md` | 0 master / 1 canon § | iter 38 | ✅ CANON-ONLY (no master artifact) |
| **Total** | | **62 master sections** (65 − v4-9's three absorbed ids; 69 − Appendix C, deleted iter 177) | | **Canon COMPLETE** |

> **Counting convention (verified iter 117; re-verified iter 190):** "Sections" = `data-section` elements rendered in `src/master/*.html` — **62** after v3 (S3 built Parts 8/9/10 down; S4a de-duplicated Parts 2/3/4/5/6; S4b/F-19 deleted Appendix C) and v4 (chapters 0–9: 65 → 62, the retired ids are legacy redirects). Canon declares **63** IDs: the 62 rendering ones + the canon-only `appendix_character_map` (H1-level, no master HTML by design). The term layer is `glossary_registry.md` → generated `data/glossary.json` → runtime panel + no-JS page (Appendix C deleted iter 177, F-19/DEC-31). Canon→master sync audit: `python3 scripts/audit_canon_master_sync.py`.

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
Part 8 (Anti-patterns) ──can reference──▶ (none — the reference layer carries no routing; v4-9 iter 190)
Part 9 (Diagnostics) ──can reference──▶ Part 10 only (the chapter-end bridge; v4-9 iter 190)
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

*Document mirror of Canon. Source of truth: `docs/canon/*.md` + `docs/canon/_README.md`. Updated 2026-09-16, iter 163.*
