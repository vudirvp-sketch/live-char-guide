# Changelog

## [9.1.2] - 2026-06-23

### Fixed (iter 2 — Known Issues cleanup)
- **KI#1** `parts/` в repo — закрит как "won't fix — by design" после анализа `build-shell-unified.mjs`: root-level `parts/`, `widgets/`, `assets/`, `event-bus.js`, `data/`, `index.html`, `build.hash` — это **intentional root fallbacks** для GitHub Pages (regenerated на каждом билде, см. `.gitignore` строки 22-30). Не gitignored.
- **KI#2** Удалён `src/shell/assets/vs-styles.css` — stale duplicate, не читается `build-shell-unified.mjs` (ASSETS_SRC = `src/assets/`, не `src/shell/assets/`). Top-level `widgets/`, `assets/`, `event-bus.js` — НЕ дубликаты, а root fallbacks (см. KI#1).
- **KI#5** `CONTRIBUTING.md` — секция "Make Changes": `src/parts/` → `src/master/`, добавлены `src/shell/`, `src/assets/`, `data/`, пометка о root fallbacks.
- **KI#6** `docs/architecture.md` — секция "v7 → v8 Migration (Archived)" полностью удалена, заменена compact Version History таблицей. Также убраны stale-ссылки на `migration_map.md` / `transition_guide.md` в Directory Structure.
- **KI#7** (NEW) iter 1 commit `c6a58c8` в message заявлял удаление `migration_map.md`, `transition_guide.md`, `ap_reference_inventory.md`, но фактически не удалил. В iter 2 удалены `transition_guide.md` и `ap_reference_inventory.md` (нет кодовых зависимостей). `migration_map.md` оставлен — см. KI#8.
- **KI#8** (NEW, DEFERRED to iter 3) `scripts/validate-migration.mjs` зависит от `docs/migration_map.md` (orphan script, не в package.json). Решение iter 3: удалить оба orphan-скрипта + migration_map.md, либо wire в package.json.

### Removed
- **docs/user_journeys.md** (462 строки) — KI#4: Draft с 2026-05-14 (v8.0.0), содержал устаревшие CORE DIRECTIVES (pre-v8 naming: BEHAVIORAL ANCHORING, VOICE ISOLATION и т.д. вместо актуальных SHOW NEVER TELL, EMBODIMENT FIRST и т.д.) и Part 7 не разделённый на 7A/7B. Core linear-journey concept уже в `AGENT_NAVIGATION.md` §3 + `docs/architecture.md` Section Model.
- **docs/transition_guide.md** (179 строк) — KI#7: iter 1 commit message заявлял удаление, но фактически не удалил. Нет кодовых зависимостей.
- **docs/ap_reference_inventory.md** (179 строк) — KI#7: iter 1 commit message заявлял удаление, но фактически не удалил. Одноразовый документ Phase 0.
- **DELETIONS-iter1.txt** — stale iter 1 cleanup instruction file (poe2-regex-ru convention), больше не нужен после iter 2.
- **src/shell/assets/** — stale duplicate of `src/assets/`.

### Notes
- iter 2 = cleanup Known Issues из iter 1 + 2 новых KI (KI#7, KI#8) обнаружены и документированы. Без правок кода/UI/тестов/shell — только docs + удаление stale duplicates.
- Подробности — в `worklog.md` (iter 2 record) и `STATUS.md` (KI#1-8 resolution).

---

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

## [9.1.0] - 2026-05-16

> Bugfix pass: FIX-01 through FIX-31. См. git log `0816ff1`..`2f57e8b` для детальных коммитов. Ниже — user-facing summary по категориям.

### Phase 1 — Critical Runtime Fixes (FIX-01..FIX-03)
- **FIX-01** `executeInlineScripts` — module/return handling for inline scripts.
- **FIX-02** `persona-cross` widget — guard against infinite recursion loop.
- **FIX-03** Clipboard API — `navigator.clipboard` guard for insecure contexts.

### Phase 2 — Architectural Fixes (FIX-04..FIX-10, FIX-28..FIX-29)
- **FIX-04..FIX-07** Dual assembly pipeline consolidation, token budget misplacement, CORE DIRECTIVES numbering conflict, content duplication ~25-30%.
- **FIX-08..FIX-10** Version sync across 4 locations, dead SPINE-validator removal, SVG CSS variables fix.
- **FIX-28..FIX-29** Version sync follow-up, structural cleanup.

### Phase 3+4 — Visual & Accessibility Fixes (FIX-11..FIX-19)
- **FIX-11..FIX-19** Visual system elements repair, WCAG contrast, hero timing, responsive breakpoints, aria-label quotes, E07 invisible bars, E15 callouts, E17 opacity, hardcoded rgba → CSS variables, animation fixes.

### Phase 5+6 — Code Quality & Build (FIX-20..FIX-31)
- **FIX-20..FIX-21** Heading hierarchy (`<h1>` one per page, no skipped levels).
- **FIX-22** `blueprint-viewer` widget — proper `destroy()` lifecycle on unmount.
- **FIX-23 + FIX-26** Inline styles → CSS migration (moved to `src/shell/styles.css` / `assets/vs-styles.css`).
- **FIX-24** README update.
- **FIX-25** CSP `script-src` cleanup; added `cdn.jsdelivr.net` to `style-src` / `font-src` for Mermaid.js.
- **FIX-26** Mermaid diagrams rendering + library integration; broader regex for `executeInlineScripts` (don't narrow back — would miss invalid scripts).
- **FIX-27** Code quality pass.
- **FIX-30** `noscript` element in build artifact.
- **FIX-31** Final accessibility + code quality pass.

### Notes
- Все FIX-N коммиты помечены в git log. Подробности каждого фикса — в commit message.
- Pitfalls, выученные из этих фиксов, частично перенесены в `AGENT_NAVIGATION.md` §6. Полное расширение pitfalls до ~30 пунктов — iter 3+.

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
