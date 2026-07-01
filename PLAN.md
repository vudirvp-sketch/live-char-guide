# Live Character Guide — План перенятия навигации и документации из poe2-regex-ru

> **Версия плана:** 1.0
> **Дата:** 2026-06-23
> **Автор:** main agent (iter 1 docs restructure)
> **Источник паттерна:** https://github.com/vudirvp-sketch/poe2-regex-ru

---

## 1. Анализ — как устроена навигация и документация в poe2-regex-ru

### 1.1 Точки входа (top-level)

| Файл | Роль | Аудитория |
|------|------|-----------|
| `AGENT_NAVIGATION.md` | **Entry document для AI-агентов.** Где что лежит, path aliases, dependency rules, 33 pitfall-паттерна, regex-dialect spec, doc map. | AI-агенты |
| `STATUS.md` | Текущая итерация (iter N), Known Issues, Open Proposals, подтверждённые ограничения. | AI-агенты + maintainers |
| `worklog.md` | Только последняя итерация подробно. Остальные — одной строкой. Полная история — в git. | AI-агенты (контекст прошлой итерации) |
| `README.md` | User-facing: что это, возможности, технологии, локальный запуск, deploy. | Конечные пользователи / разработчики |
| `docs/*.md` | Детальные технические документы (ARCHITECTURE, ETL_GUIDE, DATA_CONTRACTS, IN_GAME_TESTS, SEO_PLAN, AFFIXES_GROUPING_ANALYSIS, AFFIX_ORDERING_PLAN, UI_AUDIT). | Глубокое погружение по необходимости |

### 1.2 Принципы организации

1. **Entry document first** — `AGENT_NAVIGATION.md` это первая точка входа для AI-агента. Содержит critical-mass контекст: structure map, aliases, dependency rules, pitfalls, dialect spec, doc map. Без него агент вынужден читать `README.md` + `docs/architecture.md` = ~30K токенов на каждый старт сессии.

2. **Iter-based status** — `STATUS.md` хранит текущий итератор (iter N) и Known Issues без длинной истории. Агент за 30 секунд понимает текущее состояние проекта.

3. **Compact worklog** — `worklog.md` хранит только последнюю итерацию подробно (Task ID, Work Log, Stage Summary), остальные сжаты в "Previous iterations" секцию одной строкой на iter. Это позволяет сохранить traceability без разрастания файла.

4. **Documentation Map** — отдельная секция в `AGENT_NAVIGATION.md` с таблицей "когда обновлять какой файл". Исключает забывчивость при структурных изменениях.

5. **Pitfall-паттерны (FAQ-style)** — каждый pitfall пронумерован (Pitfall 1..N), описан с симптомом и фиксом. Помогает избежать повторения одних и тех же багов в разных итерациях. Накапливает коллективный опыт.

6. **Open Proposals** — секция в `AGENT_NAVIGATION.md` с архитектурными предложениями "на будущее". Хранит контекст, который иначе теряется между итерациями.

7. **Cleanup-конвенция `DELETIONS-iterXXX.txt`** — инструкции по удалению файлов передаются между итерациями. Пользователь/агент при применении архива видит явный список "что удалить". Привязано к iter-based workflow.

### 1.3 Dependency rules & path aliases

`AGENT_NAVIGATION.md` явно фиксирует:
- Иерархию зависимостей слоёв (`shared <- core <- strategies <- store <- data <- ui`).
- Path aliases (`@core`, `@ui`, `@store`, `@data`, `@shared`, `@strategies`, `@etl`).
- Правило "Types live in `src/shared/types.ts` ONLY".
- Правило "UI never imports from `scripts/`".

Это исключает неоднозначности при добавлении нового кода.

---

## 2. Анализ текущего состояния live-char-guide

### 2.1 Что есть сейчас

| Файл | Версия | Содержание | Состояние |
|------|--------|-----------|-----------|
| `README.md` | 9.1.0 | User-facing + структура проекта + workflow | Актуален, но дублирует часть `docs/architecture.md` |
| `CONTRIBUTING.md` | — | Workflow контрибьюторов | Актуален, но ссылается на устаревшие `src/parts/` (этой папки нет — есть `src/master/`) |
| `CHANGELOG.md` | 9.0.0 | Release notes v9.0.0 | **Устарел**: последняя запись от 2026-05-15, нет v9.1.0 записей, нет последних FIX-N коммитов |
| `docs/architecture.md` | 9.1.0 | Техническая архитектура | Актуален, но содержит v7→v8 migration секцию при удалённом transition_guide |
| `docs/content_map.md` | 9.1.0 | Canonical concept → section ID mapping | Актуален |
| `docs/components.md` | 9.1.0 | CSS class registry | Актуален |
| `docs/terminology_dictionary.md` | — | Термины проекта | Актуален |
| `docs/cross_reference_sync.md` | 9.1.0 | Bidirectional cross-ref registry (14 пар) | Актуален, но компактный — можно слить в AGENT_NAVIGATION |
| `docs/user_journeys.md` | 8.0.0 | Draft reader path | **Draft status** — не финальный, создаёт неоднозначность |
| `docs/migration_map.md` | 3.4 (v5.12→v6) | Migration v5.12 → v6 | **Устарел**: текущая v9.1.0, миграция 4 major версий назад |
| `docs/transition_guide.md` | 8.0.0 (v7→v8) | User guide v7 → v8 | **Устарел**: текущая v9.1.0, миграция 1 major+ назад |
| `docs/ap_reference_inventory.md` | 9.0.0 (Phase 0) | Inventory для renumbering Phase 2.3 | **Одноразовый документ**: Phase 0 завершена, задача выполнена |
| `docs/character_bible.md` | — | Общий bible | Актуален |
| `docs/elena_character_bible.md` | — | Elena bible | Актуален, но дублирует часть character_bible.md |
| `docs/vyshcherblenny_character_bible.md` | — | Vysherblenny bible | Актуален, но дублирует часть character_bible.md |
| `docs/anchor-redirects.json` | — | Redirects для старых section IDs | **REMOVED iter 7 (KI#15):** stale duplicate of `data/anchor-redirects.json`. Runtime использует `data/` версию. |
| `visual-system/PLAN.md` | 1.4 | Visual system implementation plan | Актуален, ongoing |

### 2.2 Чего нет

1. **Entry document для AI-агентов** — нет аналога `AGENT_NAVIGATION.md`. Агент сейчас читает `README.md` + `docs/architecture.md` = ~10K токенов на каждый старт сессии.
2. **STATUS.md** — нет единого "current state" файла. Known Issues сейчас разбросаны по GitHub Issues + устаревшим transition docs + коммитам.
3. **worklog.md** — нет истории итераций в едином компактном формате. `CHANGELOG.md` описывает release-level изменения (v9.0.0), но не итерационные фиксы (последние commits FIX-20..FIX-31 не описаны).
4. **Pitfall-паттерны** — нет накопленного FAQ "что НЕ делать и почему". Pitfalls разбросаны по FIX-N коммитам в git history, что делает их труднодоступными.

### 2.3 Анализ мусора

3 файла в `docs/` являются устаревшими или одноразовыми:
- `migration_map.md` (v5.12→v6) — 586 строк устаревшей миграционной информации.
- `transition_guide.md` (v7→v8) — 179 строк устаревшей user migration guide.
- `ap_reference_inventory.md` (Phase 0) — 179 строк одноразового inventory.

Суммарно ~944 строки мусора в `docs/`, который загружается в контекст AI-агента при exploration.

---

## 3. План перенятия с обоснованием ЗАЧЕМ

### 3.1 Перенять (Iter 1 — этот запуск)

| # | Что | Зачем | Приоритет |
|---|-----|-------|-----------|
| 1 | **Создать `AGENT_NAVIGATION.md`** | AI-агенты сейчас читают README + architecture = ~10K токенов на старте. Entry doc сокращает до ~2-3K с essential pitfalls. Экономия ~7K токенов на каждой сессии. | HIGH |
| 2 | **Создать `STATUS.md`** | Нет единого "current state". Known Issues разбросаны. STATUS.md = 30 секунд на понимание текущей версии + открытых вопросов. | HIGH |
| 3 | **Создать `worklog.md`** | `CHANGELOG.md` = release notes, не итерации. Последние FIX-20..FIX-31 коммиты не описаны. Worklog = traceability между итерациями без раздувания. | HIGH |
| 4 | **Удалить `docs/migration_map.md`** | v5.12→v6 при текущей v9.1.0 = 4 major версии назад. 586 строк мусора в контексте агента. Git history сохранит при необходимости. | HIGH |
| 5 | **Удалить `docs/transition_guide.md`** | v7→v8 при текущей v9.1.0. 179 строк устаревшей user migration guide. Если кому-то нужно — git history. | HIGH |
| 6 | **Удалить `docs/ap_reference_inventory.md`** | Phase 0 одноразовый документ для renumbering. Задача выполнена в Phase 2.3. 179 строк устаревшего inventory. | HIGH |
| 7 | **Обновить `README.md`** | Добавить ссылки на новые AGENT_NAVIGATION/STATUS/worklog. Убрать ссылки на удалённые transition_guide/migration_map. | MEDIUM |
| 8 | **Обновить `CHANGELOG.md`** | Добавить запись v9.1.1 (docs restructure iter 1). | MEDIUM |
| 9 | **Обновить `docs/architecture.md`** | Удалить или отметить как archived секцию "v7 → v8 Migration" (после удаления transition_guide.md ссылка станет битой). | MEDIUM |

### 3.2 Перенять (Iter 2+ — следующий запуск)

| # | Что | Зачем | Приоритет |
|---|-----|-------|-----------|
| 10 | **Финализировать или удалить `docs/user_journeys.md`** | Draft status с 2026-05-14 (v8.0.0) → либо финализировать до v9.1.0, либо удалить. Draft-документ создаёт неоднозначность для агента. | MEDIUM |
| 11 | **Объединить `docs/character_bible.md` + персональные bible'ы** | Три bible-файла дублируют данные. Лучше один `character_bible.md` с Elena и Vysherblenny как секциями. Экономия ~300 строк. | LOW |
| 12 | **Слить `docs/cross_reference_sync.md` в `AGENT_NAVIGATION.md`** | 14 пар кросс-референсов = ~50 строк данных, файл = 62 строки. Оверхед ~20% на шапку/версию. Compact в AGENT_NAVIGATION. | LOW |
| 13 | **Audit `CONTRIBUTING.md`** | Ссылается на устаревший `src/parts/` (реально `src/master/`). + описание lint-staged/hooks может устареть. | MEDIUM |
| 14 | **Перенести pitfalls из git FIX-N коммитов в `AGENT_NAVIGATION.md`** | Сейчас pitfalls (inline styles → CSS, blueprint-viewer destroy, CSP script-src cleanup и т.д.) захоронены в git log. Compact-таблица в AGENT_NAVIGATION накопит опыт. | MEDIUM |
| 15 | **Review `docs/content_map.md` и `docs/terminology_dictionary.md`** | Проверить актуальность после v9.1 restructure. Возможны устаревшие строки. | LOW |

### 3.3 НЕ переносить из poe2-regex-ru

| Что | Почему |
|-----|--------|
| `регис/` папка | User-provided test data, специфичная для PoE2 regex engine. У live-char-guide нет аналога. |
| `DELETIONS-iterXXX.txt` cleanup-конвенция | Привязана к iter-based workflow. Live-char-guide использует semver. Достаточно worklog.md с пометкой "deleted files: X, Y, Z". |
| `docs/IN_GAME_TESTS.md` | PoE2-domain-specific (тесты regex-диалекта в реальной игре). |
| `docs/ETL_GUIDE.md` | PoE2-domain-specific (ETL пайплайн fetch poe2db). |
| `docs/DATA_CONTRACTS.md` | PoE2-domain-specific (Zod-схемы для generated JSON). У live-char-guide валидация через `validate-artifact.mjs`. |
| `docs/SEO_PLAN.md` | PoE2-domain-specific (sitemaps, meta-теги). У live-char-guide нет отдельного SEO-плана (он в README). |
| `docs/AFFIXES_GROUPING_ANALYSIS.md` / `AFFIX_ORDERING_PLAN.md` / `UI_AUDIT.md` | PoE2-domain-specific. |

---

## 4. Структура новых файлов

### 4.1 `AGENT_NAVIGATION.md`

```markdown
# Live Character Guide — Agent Navigation

> Entry document. Read this first.

## 1. Where Things Are (directory map + ownership + rules)
## 2. Build Pipeline (master → unified → shell → dist)
## 3. Section Model (data-section, naming convention)
## 4. Widget Architecture (markup in HTML, data in JSON, behavior in JS)
## 5. Core Rules (3 principles, 7 CORE DIRECTIVES)
## 6. Frequent Pitfalls (numbered list with symptom + fix)
## 7. Documentation Map (when to update what)
## 8. Open Proposals (this iter 1 plan + iter 2+ roadmap)
```

### 4.2 `STATUS.md`

```markdown
# Live Character Guide — Статус проекта

> Текущая версия: 9.1.0 + docs restructure iter 1

## Текущее состояние
(iter 1: docs restructure — что сделано, что не сделано)

## Known Issues
(перечень активных проблем)

## Подтверждённые ограничения
(технические/архитектурные constraints)
```

### 4.3 `worklog.md`

```markdown
# Worklog

> Только последняя итерация подробно. Старые — одной строкой.

---
Task ID: 1
Agent: main
Task: iter 1 — docs restructure...

Work Log:
- шаги

Stage Summary:
- результаты

---
## Предыдущие итерации (кратко)
- v9.1.0: ...
- v9.0.0: Restructured (split Part 7, moved MBTI, etc.)
```

---

## 5. Точка остановки

**Iter 1–19 (compressed — см. CHANGELOG [9.1.1]..[9.1.19], worklog.md one-liners, git history):** iter 1 — AGENT_NAVIGATION/STATUS/worklog/PLAN created. iter 2-3 — KI#1..#9 closed, stale docs/orphan scripts removed. iter 4-5 — KI#10..#12 (qa:* wiring, tokens.json, inline scripts → widget JS), KI#13 NEW (123 inline styles). iter 6 — CONTENT_RESTRUCTURE_PLAN.md (Canon strategy), KI#14 NEW. iter 7 — Canon scaffold + Part 4 pilot, KI#15 CLOSED. iter 8 — Part 4 migration (-13%). iter 9 — Part 4 validation, KI#16 NEW. iter 10 — Canon Part 7A, KI#17 NEW. iter 11 — Part 7A migration (-2.7%). iter 12 — Canon Part 8 + migrate. iter 13 — Canon Part 9 + migrate. iter 14 — Canon Part 1+2+3 + migrate. iter 16 — Canon Part 5+6+7B+10 + migrate (**Canon migration COMPLETE**). iter 18 — final cleanup (3 Appendix Canon files + content_map/terminology cleanup). iter 19 — KI#16 fix (qa:csp PASS).

**Iter 24 ✅ DONE (KI#13 CLOSED):** KI#13 Part 9+10 (18/123 inline styles → 19 новых CSS селекторов с `vs-ki13-p9-*` и `vs-ki13-p10-*` sub-namespaces, semantic grouping). part_09: 6→0 (E14 Quality Scale — thermometer indicator + 4 zone-title color modifiers + quick-checks panel). part_10: 12→0 (E15 Annotated Blueprint — 11 callouts positional via shared base `.vs-ki13-p10-callout-pos` + 11 per-instance top modifiers, DRY pattern eliminating `right:20px` duplication, + 1 card-block-accent). Total KI#13: **123/123 fixed (100%) — CLOSED.** `src/assets/vs-styles.css` +52 строки (SECTION 6, total 60 селекторов). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. Build hash fd3d96d3 unchanged.

**Iter 25+ — что осталось:**
1. **iter 25 (optional, low priority)** — Phase 4 SVG integration: Part 7B Greeting algorithm infographic → new VS element E18 (requires `visual-system/elements/` prototyping first).
2. **Все Known Issues (KI#1..KI#17) ✅ CLOSED.** Активных KI нет.

**Полная дорожная карта:** `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2. **Canon migration status:** `docs/canon/_README.md` §5 (все 10 Parts + 3 Appendix ✅ MIGRATED, Canon COMPLETE).

**Все Known Issues закрыты.** KI#1..KI#17 ✅ CLOSED. KI#13 ✅ CLOSED iter 24 (123/123 inline styles → CSS classes). Активных KI нет.
