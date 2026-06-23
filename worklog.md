# Worklog

> Только последняя итерация подробно. Старые — одной строкой. Полная история — в git.

---

Task ID: 1
Agent: main
Task: iter 1 — docs restructure по образцу `poe2-regex-ru`. Проанализировать навигацию/документацию в `poe2-regex-ru` и перенять в `live-char-guide` с обоснованием ЗАЧЕМ. Создать entry document (AGENT_NAVIGATION), STATUS, worklog, PLAN. Удалить устаревшие docs. Обновить README/CHANGELOG/architecture.

Work Log:
- 1: Контекст загружен из README/CHANGELOG/CONTRIBUTING/docs/architecture.md live-char-guide (v9.1.0). Репозитории `poe2-regex-ru` (iter 124) и `live-char-guide` клонированы с GitHub.
- 2: Анализ `poe2-regex-ru` — структура навигации и документации:
  - `AGENT_NAVIGATION.md` (entry doc, 347 строк) — directory map, path aliases, dependency rules, 33 pitfall-паттерна, regex dialect spec, doc map, open proposals.
  - `STATUS.md` (116 строк) — current iter, Known Issues, подтверждённые ограничения.
  - `worklog.md` (78 строк) — последняя iter подробно, остальные одной строкой.
  - `README.md` (151 строка) — user-facing.
  - `docs/*.md` — детальные технические документы (ARCHITECTURE, ETL_GUIDE, DATA_CONTRACTS, IN_GAME_TESTS, SEO_PLAN, AFFIXES_GROUPING_ANALYSIS, AFFIX_ORDERING_PLAN, UI_AUDIT).
  - `DELETIONS-iterXXX.txt` — cleanup-конвенция для iter-based workflow.
  - Принципы: entry-first, iter-based status, compact worklog, doc map, pitfall FAQ, open proposals.
- 3: Анализ `live-char-guide` — текущее состояние:
  - Версия 9.1.0 (v8 = unified single-pass restructure, v9.1 = FIX-01..31).
  - Документация: README (290 строк), CONTRIBUTING (306), CHANGELOG (56 — последняя v9.0.0 от 2026-05-15, нет v9.1.0 записей), docs/ (12 .md + 1 .json файлов, ~4386 строк).
  - Чего нет: entry doc для AI-агентов, STATUS.md, worklog.md, pitfall FAQ.
  - Мусор: `docs/migration_map.md` (v5.12→v6, 586 строк), `docs/transition_guide.md` (v7→v8, 179), `docs/ap_reference_inventory.md` (Phase 0, 179) — суммарно ~944 строки устаревшего контента.
  - Прочие проблемы: `docs/user_journeys.md` Draft с 2026-05-14, `CONTRIBUTING.md` ссылается на устаревший `src/parts/`, дублирующие папки `widgets/`+`src/shell/widgets/` и `assets/`+`src/shell/assets/`, `parts/` в repo (должны быть gitignored).
- 4: Создан `PLAN.md` (полный анализ + roadmap с обоснованием ЗАЧЕМ для каждого пункта):
  - §1 Анализ poe2-regex-ru (точки входа, принципы организации, dependency rules).
  - §2 Анализ live-char-guide (что есть, чего нет, анализ мусора).
  - §3 План перенять (iter 1 — 9 пунктов, iter 2+ — 6 пунктов) + что НЕ переносить (domain-specific файлы).
  - §4 Структура новых файлов.
  - §5 Точка остановки.
- 5: Создан `AGENT_NAVIGATION.md` (entry doc, ~250 строк):
  - §1 Where Things Is (directory map с 16 строками — purpose + rules для каждой папки).
  - §2 Build Pipeline (схема master → unified → shell → dist + команды + deploy).
  - §3 Section Model (unified single-pass, markup, naming convention, prohibitions).
  - §4 Widget Architecture (markup/data/behavior split, widget data files, lifecycle).
  - §5 Core Rules (3 принципа, SPINE, 7 CORE DIRECTIVES, version control).
  - §6 Frequent Pitfalls (18 пунктов с симптомом и фиксом — собраны из git FIX-N коммитов + общие правила).
  - §7 Documentation Map (когда обновлять какой файл + список удалённых в iter 1).
  - §8 Open Proposals (OP-1 docs restructure, OP-2 дубли widgets/assets, OP-3 parts/ в repo).
  - §9 Полезные ссылки.
- 6: Создан `STATUS.md` (current state + Known Issues + Open Proposals):
  - Текущее состояние: iter 1 docs restructure — что сделано, что НЕ сделано (перенос в iter 2+).
  - 6 Known Issues: KI#1 parts/ в repo, KI#2 дубли widgets/assets, KI#3 CHANGELOG не отражает FIX-N, KI#4 user_journeys.md Draft, KI#5 CONTRIBUTING.md устаревший src/parts/, KI#6 architecture.md устаревшая migration секция.
  - Подтверждённые ограничения (8 пунктов: linear single-pass, model notes, English directives, bracket format, Eng terms в Rus prose, Node/pnpm/Python versions, GitHub Pages).
- 7: Удалены 3 устаревших docs-файла:
  - `docs/migration_map.md` — v5.12→v6 при текущей v9.1.0 (4 major версии назад), 586 строк.
  - `docs/transition_guide.md` — v7→v8 при текущей v9.1.0, 179 строк.
  - `docs/ap_reference_inventory.md` — Phase 0 одноразовый документ для renumbering Phase 2.3, задача выполнена, 179 строк.
  - Суммарно удалено ~944 строки устаревшего контента из `docs/`.
- 8: Обновлён `README.md`:
  - В секции "Документация" добавлены 4 новых файла: AGENT_NAVIGATION.md, STATUS.md, worklog.md, PLAN.md.
  - Убраны ссылки на удалённые `docs/transition_guide.md` и упоминания миграций.
  - В секции "Ссылки" убрана строка "Transition Guide (v7→v8)".
- 9: Обновлён `CHANGELOG.md`:
  - Добавлена запись `## [9.1.1] - 2026-06-23` с категориями Added / Removed / Updated.
  - Added: AGENT_NAVIGATION.md, STATUS.md, worklog.md, PLAN.md.
  - Removed: docs/migration_map.md, docs/transition_guide.md, docs/ap_reference_inventory.md.
  - Updated: README.md, docs/architecture.md.
- 10: Обновлён `docs/architecture.md`:
  - Секция "v7 → v8 Migration" помечена как **Archived** (transition_guide.md удалён в iter 1).
  - Убрана ссылка `See docs/transition_guide.md for a detailed migration guide for v7 users.` → заменена на `Archived: transition_guide.md was removed in iter 1 (v9.1.1). v7 users — see git history.`.
- 11: Верификация — визуальная проверка структуры новых файлов:
  - `AGENT_NAVIGATION.md` — 9 секций, корректные cross-refs на STATUS/PLAN/worklog.
  - `STATUS.md` — 3 главные секции (текущее состояние, KI#1-6, ограничения).
  - `worklog.md` — iter 1 подробно, "Предыдущие итерации" секция готова для iter 0 (v9.1.0) и исторических.
  - `PLAN.md` — 5 секций анализа + roadmap.
  - README.md / CHANGELOG.md / docs/architecture.md — обновлены без потери контента.
- 12: Упаковка — изменённые файлы подготовлены для архива.

Stage Summary:
- **iter 1 COMPLETE.** Docs restructure по образцу `poe2-regex-ru` — созданы 4 новых файла (AGENT_NAVIGATION, STATUS, worklog, PLAN), удалены 3 устаревших docs (~944 строки мусора), обновлены README/CHANGELOG/architecture.
- **Изменённые файлы (7):**
  - `AGENT_NAVIGATION.md`, `STATUS.md`, `worklog.md`, `PLAN.md` — созданы.
  - `README.md`, `CHANGELOG.md`, `docs/architecture.md` — обновлены.
- **Удалённые файлы (3):**
  - `docs/migration_map.md`, `docs/transition_guide.md`, `docs/ap_reference_inventory.md`.
- **НЕ сделано (перенос в iter 2+):**
  1. Финализировать или удалить `docs/user_journeys.md` (Draft с 2026-05-14).
  2. Audit `CONTRIBUTING.md` — ссылка на устаревший `src/parts/`.
  3. Перенести pitfalls из FIX-N коммитов в `AGENT_NAVIGATION.md` §6 (расширить с 18 до ~30 пунктов).
  4. Review `docs/content_map.md` / `docs/terminology_dictionary.md` на устаревшие строки.
  5. Объединить `docs/character_bible.md` + персональные bible'ы.
  6. Слить `docs/cross_reference_sync.md` в `AGENT_NAVIGATION.md`.
  7. Audit `visual-system/PLAN.md` (integration phase status).
  8. Решить KI#1 (parts/ в repo — проверить .gitignore, `git rm -r --cached parts/`).
  9. Решить KI#2 (дубли widgets/assets — прочитать `build-shell-unified.mjs`, определить canonical paths, удалить дубликаты).
  10. Решить KI#3 (CHANGELOG — добавить [Unreleased] или v9.1.0 с кратким перечнем FIX-01..31).
  11. Решить KI#4 (user_journeys.md Draft — финализировать или удалить).
  12. Решить KI#5 (CONTRIBUTING.md — заменить `src/parts/` → `src/master/`).
  13. Решить KI#6 (architecture.md — полное удаление archived v7→v8 секции).
- **Точка остановки:** iter 1 done. Docs restructure завершён: 4 новых файла созданы, 3 устаревших удалены, 3 обновлены. В iter 2 можно:
  1. Закрыть KI#1, KI#2, KI#5 (быстрые cleanup-задачи — gitignore, дубликаты папок, CONTRIBUTING).
  2. Закрыть KI#3 (CHANGELOG — добавить [Unreleased] с FIX-N summary).
  3. Закрыть KI#4 (user_journeys.md — решение: финализировать или удалить).
- **Подсказка следующему агенту:** iter 1 = docs restructure (без правок кода/тестов/UI). Перед стартом iter 2 прочитай STATUS.md (актуальный статус + 6 Known Issues), worklog.md (этот раздел iter 1), AGENT_NAVIGATION.md (entry doc), PLAN.md (roadmap с обоснованием). Изменённые файлы в iter 1: только документация. Удалённые файлы: 3 устаревших docs. Код/тесты/UI/shell — без изменений. Если найден новый баг — сначала документируй в STATUS.md как Known Issue, потом фиксий.

---

## Предыдущие итерации (кратко)

- **v9.1.0 (2026-05-16)**: FIX-01..FIX-31 — executeInlineScripts module/return, persona-cross infinite loop, Clipboard API guard, dual assembly pipeline, token budget misplacement, CORE DIRECTIVES numbering conflict, content duplication ~25-30%, visual system elements repair, Mermaid.js integration, TOC translation, dead SPINE-validator removal, SVG CSS variables fix, inline styles → CSS migration, blueprint-viewer destroy(), CSP script-src cleanup, noscript in build artifact, heading hierarchy, code quality, destroy(), accessibility fixes. См. git log `0816ff1`..`2f57e8b`.
- **v9.0.0 (2026-05-15)**: Restructured (split Part 7 → 7A/7B, moved MBTI to Appendix A, moved AP-15 to Part 5 as Warning, renumbered AP-16 → AP-15). Deduplicated (canonical locations, trimmed non-canonical refs, consolidated MODEL_NOTE tags). Unified (terminology standardization, all 7 CORE DIRECTIVES, 3 callout types: RULE/RECOMMENDATION/EXAMPLE). Examples (Elena primary, Vysherblenny secondary, Йоуёма tertiary; Character Bibles). Navigation (cross-refs reduced ~50%, 3 ref types, transitional bridges, concept relationship diagram, TOC). Added Appendix A/B/C, CHANGELOG.md, character bibles, ap_reference_inventory. Fixed orphan references, glossary sync.
- **v8.0.0 (2026-05-14)**: Unified single-pass architecture — eliminated L1/L2/L3 layer system. All content visible to all readers. Section IDs without `_l2`/`_l3` suffixes. Widget activation always visible (no `data-layer` gating). SPINE unified (GHOST→LIE→FLAW→NEED→WANT). CORE DIRECTIVES unified (all 7). AP-15 merged. Quickstart deleted. Cross-refs backward-only. "Основы/Дополнительно" tables deleted.
- **v7 (pre-2026-05-14)**: Layered system (L1/L2/L3) with `data-layer` attributes. Layer extraction via `build-layers.mjs`. Section IDs with `_l2`/`_l3` suffixes. Widget visibility gated by `data-layer` on `<body>`.
- **v6 (pre-2026-04-27)**: Migration from v5.12. See git history (migration_map.md was deleted in iter 1).
- **v5.12 (pre-v6)**: Initial layered structure. See git history.
