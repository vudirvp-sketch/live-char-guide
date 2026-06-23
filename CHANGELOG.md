# Changelog

## [9.1.1] - 2026-06-23

### Added
- **AGENT_NAVIGATION.md** — entry document для AI-агентов (structure map, build pipeline, section model, widget arch, 18 pitfalls, doc map, open proposals). Перенят паттерн из `poe2-regex-ru`.
- **STATUS.md** — текущий статус проекта + 6 Known Issues + подтверждённые ограничения.
- **worklog.md** — iter log (последняя итерация подробно, предыдущие одной строкой).
- **PLAN.md** — полный анализ `poe2-regex-ru` навигации/документации + roadmap перенять в `live-char-guide` с обоснованием ЗАЧЕМ.

### Removed
- **docs/migration_map.md** (586 строк) — устарел: v5.12→v6 при текущей v9.1.0 (4 major версии назад). Git history сохранит при необходимости.
- **docs/transition_guide.md** (179 строк) — устарел: v7→v8 при текущей v9.1.0.
- **docs/ap_reference_inventory.md** (179 строк) — одноразовый документ Phase 0 для renumbering Phase 2.3, задача выполнена.

### Updated
- **README.md** — добавлены ссылки на новые AGENT_NAVIGATION/STATUS/worklog/PLAN. Убраны ссылки на удалённый transition_guide. Структура репозитория обновлена с 4 новыми файлами верхнего уровня.
- **docs/architecture.md** — секция "v7 → v8 Migration" помечена как **Archived** (transition_guide.md удалён в этой итерации).

### Notes
- iter 1 = docs restructure. Без правок кода, тестов, UI или shell.
- Полный анализ и обоснование — в `PLAN.md`.
- Known Issues после iter 1: 6 шт (KI#1 parts/ в repo, KI#2 дубли widgets/assets, KI#3 CHANGELOG не отражает FIX-N, KI#4 user_journeys.md Draft, KI#5 CONTRIBUTING.md устаревший src/parts/, KI#6 architecture.md archived секция). См. `STATUS.md`.

---

## [9.0.0] - 2026-05-15

### Restructured
- Split Part 7 into Part 7A (System Prompt & Assembly) and Part 7B (Lorebook, Greeting & Compatibility)
- Moved MBTI from Part 5 to Appendix A
- Moved AP-15 (OCEAN Overload) from Part 8 to Part 5 as a Warning callout
- Renumbered anti-patterns in Part 8 after AP-15 removal

### Deduplicated
- Established canonical locations for all major concepts (including all 7 CORE DIRECTIVES)
- Trimmed all non-canonical references to 1–2 sentence summaries with links
- Consolidated [MODEL_NOTE] tags into Appendix B (Model Capability Table)
- Re-checked new content from example overhaul for duplication

### Unified
- Standardized terminology (System Prompt vs CORE DIRECTIVES distinction; Embodiment Protocol vs Embodiment First distinction)
- Added all 7 CORE DIRECTIVES, Identity Block, Greeting Message, and Token Budget to terminology dictionary
- Replaced 4+ callout types with 3: RULE, RECOMMENDATION, EXAMPLE
- Removed emoji markers from callout blocks
- Removed layering artifacts (advanced/opt tags, navigation blocks, end-of-Part summaries)
- Established language policy: English technical terms + Russian prose

### Examples
- Designated Елена as primary thread-through character (Parts 1–9)
- Designated Выщербленный as secondary thread-through for advanced mechanics
- Designated Йоуёма as tertiary for Voice Bleed demonstration
- Moved all other characters to Part 10
- Added status labels: [ILLUSTRATION], [TEMPLATE], [STUB]
- Added stylistic neutrality disclaimer
- Annotated narrative passages with directive demonstrations (all Parts)
- Created Character Bibles for Елена and Выщербленный as single source of truth

### Navigation
- Reduced cross-reference count by ~50%
- Limited references to 3 types: Prerequisite, Canonical Definition, Diagnostic Link
- Unified reference format across all phases
- Added transitional bridges between all Parts
- Added concept relationship diagram at guide start
- Added Table of Contents

### Added
- Appendix A: MBTI Reference
- Appendix B: Model Capability Table
- Appendix C: Glossary
- Concept relationship diagram (Mermaid)
- Table of Contents
- CHANGELOG.md
- docs/elena_character_bible.md
- docs/vyshcherblenny_character_bible.md
- docs/ap_reference_inventory.md

### Fixed
- Removed orphan reference to Эллиот Алдерсон from content_map.md
- Updated data/glossary.json to match canonical terminology
