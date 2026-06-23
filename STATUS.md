# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + docs restructure iter 1
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 1 (docs restructure): перенята навигация и документация из `poe2-regex-ru`.**

Полный анализ и обоснование — в `PLAN.md`. Кратко: созданы 4 новых docs-файла (entry document + status + worklog + plan), удалены 3 устаревших docs (~944 строки мусора), обновлены README/CHANGELOG/architecture.

### Что сделано в iter 1

**Создано (4 файла):**
- `AGENT_NAVIGATION.md` — entry document для AI-агентов (structure map, build pipeline, section model, widget arch, core rules, 18 pitfalls, doc map, open proposals).
- `STATUS.md` — этот файл (current state + Known Issues + Open Proposals).
- `worklog.md` — iter log (последняя итерация подробно, остальные одной строкой).
- `PLAN.md` — полный анализ poe2-regex-ru + roadmap с обоснованием ЗАЧЕМ.

**Удалено (3 файла, ~944 строки устаревшего контента):**
- `docs/migration_map.md` (v5.12→v6, 586 строк) — устарел: текущая v9.1.0, миграция 4 major версии назад.
- `docs/transition_guide.md` (v7→v8, 179 строк) — устарел: текущая v9.1.0.
- `docs/ap_reference_inventory.md` (Phase 0, 179 строк) — одноразовый документ для renumbering Phase 2.3, задача выполнена.

**Обновлено (3 файла):**
- `README.md` — добавлены ссылки на AGENT_NAVIGATION/STATUS/worklog/PLAN, убраны ссылки на удалённые transition_guide/migration_map.
- `CHANGELOG.md` — добавлена запись v9.1.1 (docs restructure iter 1).
- `docs/architecture.md` — секция "v7 → v8 Migration" отмечена как archived (transition_guide удалён).

### НЕ сделано в iter 1 (перенос в iter 2+)

1. **Финализировать или удалить `docs/user_journeys.md`** — Draft status с 2026-05-14 (v8.0.0). Либо актуализировать до v9.1.0, либо удалить.
2. **Audit `CONTRIBUTING.md`** — ссылается на устаревший `src/parts/` (реально `src/master/`). + описание lint-staged/hooks может устареть.
3. **Перенести pitfalls из FIX-N коммитов в `AGENT_NAVIGATION.md` §6** — сейчас 18 pitfalls описаны кратко, нужно расширить на основе git history (FIX-01..FIX-31).
4. **Review `docs/content_map.md` / `docs/terminology_dictionary.md`** — проверить актуальность после v9.1 restructure. Возможны устаревшие строки.
5. **Объединить `docs/character_bible.md` + персональные bible'ы** — три bible-файла дублируют данные. Экономия ~300 строк.
6. **Слить `docs/cross_reference_sync.md` в `AGENT_NAVIGATION.md`** — 14 пар = ~50 строк данных, файл = 62 строки. Оверхед ~20%.
7. **Audit `visual-system/PLAN.md`** — integration phase status, v1.4 от 2026-05-16.
8. **Решить KI#1** (parts/ в repo) и **KI#2** (дублирующие widgets/assets папки) — см. ниже.

---

## Known Issues

### KI#1 — `parts/` папка в repo (generated artifacts не gitignored)

**Симптом:** В корне repo лежит `parts/` с 15 HTML-файлами (`part_01..10.html`, `appendix_*.html`, `manifest.json`, `glossary.html`, `footer.html`). Это сгенерированные artifacts билда `build-unified.mjs`, должны быть gitignored.

**Риск:** Конфликты при merge, stale data в repo, дублирование с `build/parts/` (gitignored).

**План:** Проверить `.gitignore`, добавить `parts/` если нет. Удалить `parts/` из git tracking через `git rm -r --cached parts/`. Зафиксировать в iter 2.

### KI#2 — Дублирующие папки widgets/ и assets/

**Симптом:** В repo есть дубликаты:
- `widgets/` (top-level) и `src/shell/widgets/` — 10 файлов .js идентичного назначения.
- `assets/` (top-level) и `src/shell/assets/` — vs-styles.css, lazy-loader.js, preview-card.png, favicon.svg, fonts/NotoSans-Variable.woff2, NotoSans-Italic-Variable.woff2.
- `event-bus.js` (top-level) и `src/shell/event-bus.js`.

**Риск:** Неясно, какая папка реально используется в билде (`build-shell-unified.mjs`). Правки в одной папке не применяются в другой — silent bugs.

**План:** В iter 2 прочитать `src/scripts/build-shell-unified.mjs`, определить canonical paths. Удалить дубликаты. Зафиксировать в worklog.md.

### KI#3 — `CHANGELOG.md` не отражает последние FIX-N коммиты

**Симптом:** Последняя запись в `CHANGELOG.md` — v9.0.0 от 2026-05-15. В git history после этой даты: FIX-01..FIX-31 (визуальные фиксы, CSP, blueprint-viewer destroy, persona-cross infinite loop и т.д.). Ни один из этих фиксов не описан в CHANGELOG.

**Риск:** Traceability потеряна. Пользователь не понимает, что изменилось между v9.0.0 и v9.1.0.

**План:** В iter 2 добавить раздел `[Unreleased]` или `v9.1.0` с кратким перечнем FIX-N коммитов (1-2 строки на каждый). Не дублировать worklog.md — там детали, в CHANGELOG — user-facing summary.

### KI#4 — `docs/user_journeys.md` Draft status

**Симптом:** Файл `docs/user_journeys.md` (462 строки) имеет шапку `Status: Draft`, версия 8.0.0 от 2026-05-14. Не обновлялся с v8.0.0 → v9.1.0 (2 major версии).

**Риск:** Draft-документ в `docs/` создаёт неоднозначность — агент не понимает, можно ли на него полагаться.

**План:** В iter 2 — либо финализировать (актуализировать до v9.1.0 + убрать Draft), либо удалить (если контент дублирует `docs/architecture.md` Section Model).

### KI#5 — `CONTRIBUTING.md` ссылается на устаревший `src/parts/`

**Симптом:** В секции "Make Changes" написано "Edit files in `src/parts/` for content changes". Реально контент живёт в `src/master/part_*.html`. Папки `src/parts/` не существует.

**Риск:** Новый контрибьютор не найдёт, где редактировать контент.

**План:** В iter 2 заменить `src/parts/` → `src/master/` в `CONTRIBUTING.md`. Проверить остальные упоминания.

### KI#6 — `docs/architecture.md` содержит устаревшую секцию "v7 → v8 Migration"

**Симптом:** После удаления `docs/transition_guide.md` (iter 1) в `docs/architecture.md` осталась секция "v7 → v8 Migration" со ссылкой на удалённый файл.

**Риск:** Битая ссылка.

**План:** В iter 1 (этот запуск) — пометить секцию как archived, убрать ссылку на transition_guide. Полное удаление секции — iter 2+ (после подтверждения, что v7→v8 миграция больше не актуальна).

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Каждый читатель видит все секции. |
| **Model capability через `[MODEL_NOTE: text]`** | Не через layer separation, а inline-метки. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Bracket format для примеров** | `[SYSTEM]/[DESCRIPTION]/[EXAMPLES]/[ANCHORS]`. XML-теги только внутри Description. |
| **English technical terms в Russian prose** | SP, Description, Examples, Greeting, Lorebook, SPINE, GHOST, OCEAN, Enneagram, LIE, FLAW, NEED, WANT, T→A→P, CoT, Embodiment, CORE DIRECTIVES, Sampling params, 12B/32B/API, Part N, AP-N. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Python 3.10+** | Для скриптов валидации (`check_duplicates.py`, `validate_terms.py`, `check_english.py`, `check_syntax_mix.py`). |
| **GitHub Pages deploy** | Через GitHub Actions на push в main. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
