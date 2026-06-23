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

**Iter 1–7 (compressed — см. CHANGELOG [9.1.1]..[9.1.7], worklog.md one-liners, git history):** iter 1 — AGENT_NAVIGATION/STATUS/worklog/PLAN created, 6 KI identified. iter 2 — KI#1..#6 closed, stale docs removed. iter 3 — KI#8+#9 closed (orphan scripts), pitfalls 18→30. iter 4 — KI#10 closed, KI#11+#12 found (qa:* scripts wired). iter 5 — KI#11 closed (tokens.json), KI#12 partial (17 inline scripts → 5 widget JS modules), KI#13 NEW (123 inline styles + 23 outside). iter 6 — `docs/CONTENT_RESTRUCTURE_PLAN.md` created (7 dup patterns + Canon strategy + iter 7..19 roadmap), KI#14 NEW (content duplication), KI#15 NEW (anchor-redirects stale dup). iter 7 — `docs/canon/` scaffold created (`_README.md` + `part_04.md` pilot), KI#15 CLOSED.

**Iter 8 (Part 4 pilot migration, DONE 2026-06-23):** Мигрирован `src/master/part_04.html` против Canon §4. 777 → 676 строк (-13%). 4 dup viz удалены (mermaid + 3 inf-pipeline), 1 orphan paragraph удалён, 2 re-explanation абзаца сжаты. 2 unique infographic сохранены (deviation от Canon — по предпочтению «viz > dry text»). LIE таблица сохранена полностью (deviation, все 4 строки уникальны). Build PASS, validate:master PASS.

**Iter 9 (Part 4 validation pass, DONE 2026-06-24):** Validation pilot Part 4 migration (iter 8). Static HTML sanity check (11 sections balanced, 2 VS-EMBED well-formed, 2 retained infographic present, no orphans, no mermaid, no broken refs) + served `parts/part_04.html` через локальный сервер (40 825 bytes, all expected content present, all removed content absent) + `pnpm run validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:contrast`/`qa:doc-versions` PASS. `qa:english`/`qa:syntax` — same false positives as iter 7 (no regression). `qa:csp` FAIL → **KI#16 NEW** (pre-existing с iter 5, не задокументирован ранее). 6 docs updated. Никаких правок master HTML / visual-system / widget JS.

**Iter 10 (Canon Part 7A creation, DONE 2026-06-24):** Создан `docs/canon/part_07a.md` (802 строки, 13 H2 секций — по одной на каждый `data-section` из `src/master/part_07a.html`, 4 VS-маркера для E08/E16/E17/E02). Front-matter `Migration status: ❌ NOT MIGRATED (iter 11 task)`. Migration Notes таблица: 54 TODO строки + validation gates. Master HTML не тронут (iter 11 задача). `pnpm run validate:master` PASS (0 errors, KI#13 baseline). **KI#17 NEW** (documentation drift: AGENT_NAVIGATION §10 hint + worklog iter 9 record указывали 4 VS-EMBED как «E07, E08, E16, E17», но фактически в файле — E08, E16, E17, E02; fix applied). **Decision для iter 11:** рекомендуется разбить на 2 под-итерации (iter 11a: §7A.1–§7A.7 + iter 11b: §7A.8–§7A.13). 8 docs updated.

**Iter 11 (Part 7A migration, DONE 2026-06-24):** Мигрирован `src/master/part_07a.html` против Canon §7A. 1168 → 1137 строк (-2.7%). 4 compression candidates applied (#22 sampling table, #26 model checklist, #42 plain-copy, #46 CORE DIRECTIVES walkthrough). 50 "Оставить" без изменений. `validate:master`/`build`/`validate`/`test:unit`/`lint` PASS. Canon front-matter MIGRATED. 9 docs updated.

**Iter 12+ (пересмотрено в iter 11):**
1. **iter 12–13** — Canon Part 8+9 + migrate (anti-patterns + diagnostics, cross-refs).
2. **iter 14–15** — Canon Part 1+2+3 + migrate (cleanup 4 устаревших infographic в Part 2).
3. **iter 16–17** — Canon Part 5+6+7B+10 + migrate.
4. **iter 18** — Final cleanup (устаревшие infographic + mermaid → 0, content_map sync с Canon).
5. **iter 19+** — KI#13 (inline styles) + KI#16 (qa:csp inline scripts) + Phase 4 actual SVG integration — после content cleanup.

**Полная дорожная карта:** `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2. **Canon migration status:** `docs/canon/_README.md` §5.

**KI#1..KI#12 + KI#15 закрыты. KI#13 (123 inline + 22 outside) + KI#14 (content duplication) + KI#16 (qa:csp FAIL) + KI#17 (documentation drift, LOW, fixed) — ACTIVE, continue iter 12+.**
