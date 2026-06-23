# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + docs restructure iter 2
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 2 (Known Issues cleanup): закрыты все 6 KI из iter 1.**

iter 1 создал docs-инфраструктуру (AGENT_NAVIGATION / STATUS / worklog / PLAN) и идентифицировал 6 Known Issues. iter 2 разобрал каждый KI, в двух случаях (KI#1, KI#2) пересмотрел первоначальный диагноз после анализа `build-shell-unified.mjs` — оказалось, что root-level `parts/`, `widgets/`, `assets/`, `event-bus.js`, `data/` это **intentional root fallbacks** для GitHub Pages, а не дубликаты.

### Что сделано в iter 2

**KI#1 — `parts/` в repo** → CLOSED "won't fix — by design".
Анализ `src/scripts/build-shell-unified.mjs` (строки 237-293) показал, что root-level `parts/`, `widgets/`, `assets/`, `event-bus.js`, `data/`, `index.html`, `build.hash` — это **regenerated root fallbacks** для GitHub Pages backward compat. `.gitignore` (строки 22-30) EXPLICITLY говорит "DO NOT gitignore" их. CI/CD деплоит из `dist/`, но root fallbacks обеспечивают работу без CI/CD.

**KI#2 — Дублирующие widgets/assets** → CLOSED.
Реальный stale duplicate был только `src/shell/assets/vs-styles.css` (не читается `build-shell-unified.mjs` — `ASSETS_SRC = src/assets/`, не `src/shell/assets/`). Удалён. Top-level `widgets/`, `assets/`, `event-bus.js` — НЕ дубликаты, а root fallbacks (см. KI#1). Все три копии `vs-styles.css` были IDENTICAL — drift отсутствовал.

**KI#3 — CHANGELOG не отражал FIX-N** → CLOSED.
Добавлены секции:
- `[9.1.0]` — полный перечень FIX-01..FIX-31 по фазам (Phase 1-6).
- `[9.1.2]` — iter 2 changelog (KI resolution).

**KI#4 — `docs/user_journeys.md` Draft** → CLOSED (deleted).
462-строчный Draft с 2026-05-14 (v8.0.0). Содержал устаревшие CORE DIRECTIVES (pre-v8 naming: BEHAVIORAL ANCHORING, VOICE ISOLATION и т.д. — не соответствует актуальным SHOW NEVER TELL, EMBODIMENT FIRST и т.д.) и Part 7 не разделённый на 7A/7B. Полная актуализация = большой объём работы; core linear-journey concept уже в `AGENT_NAVIGATION.md` §3 + `docs/architecture.md` Section Model. Решено удалить. Git history сохранит.

**KI#5 — `CONTRIBUTING.md` устаревший `src/parts/`** → CLOSED.
Секция "Make Changes": `src/parts/` → `src/master/`. Добавлены `src/shell/`, `src/assets/`, `data/`. Пометка о root fallbacks (не редактировать напрямую).

**KI#6 — `docs/architecture.md` archived v7→v8 секция** → CLOSED.
Полностью удалена секция "v7 → v8 Migration (Archived)". Заменена compact Version History таблицей (v9.1.x / v9.0.0 / v8.0.0 / v7 / v6 / v5.12). Также убраны stale-ссылки на `migration_map.md` / `transition_guide.md` в Directory Structure.

**KI#7 (NEW, найден в iter 2) — iter 1 commit не выполнил заявленные удаления** → CLOSED в iter 2.
Iter 1 commit `c6a58c8` в message CLAIMED: "Removed (~944 строки устаревшего контента): docs/migration_map.md, docs/transition_guide.md, docs/ap_reference_inventory.md". Фактически git show --stat показывает, что эти файлы НЕ были удалены. В iter 2:
- Удалены `docs/transition_guide.md` (179 строк) и `docs/ap_reference_inventory.md` (179 строк) — нет кодовых зависимостей.
- `docs/migration_map.md` оставлен (см. KI#8).
- Удалён `DELETIONS-iter1.txt` (stale cleanup-конвенция файл из poe2-regex-ru, больше не нужен после iter 2).

**KI#8 (NEW, найден в iter 2) — `scripts/validate-migration.mjs` зависит от `docs/migration_map.md`** → DEFERRED to iter 3.
`scripts/validate-migration.mjs` парсит `docs/migration_map.md` (строка 36: `MIGRATION_MAP_PATH`). Без файла скрипт падает (строка 773-774: `console.error('❌ migration_map.md not found. Cannot validate migration.')`). `scripts/gen-redirect-map.mjs` тоже читает migration_map.md, но имеет fallback. Оба скрипта **orphan** — не вызываются из package.json / pre-commit hook / CI workflows. Решение iter 3: либо (a) удалить оба скрипта + migration_map.md, либо (b) wire `validate-migration.mjs` в package.json и обновить под v9 (миграция v5.12→v6 при текущей v9.1.0 — скрипт валидирует миграцию 4 major версий назад).

### Изменённые файлы в iter 2

| File | Action | Reason |
|------|--------|--------|
| `CONTRIBUTING.md` | Updated | KI#5: `src/parts/` → `src/master/` + root fallbacks note |
| `CHANGELOG.md` | Updated | KI#3: added `[9.1.0]` (FIX-01..31) + `[9.1.2]` (iter 2) sections |
| `docs/architecture.md` | Updated | KI#6: removed v7→v8 archived section, fixed stale refs in dir structure |
| `docs/user_journeys.md` | **Deleted** | KI#4: Draft with outdated v8 content (pre-v8 CORE DIRECTIVES, Part 7 not split) |
| `docs/transition_guide.md` | **Deleted** | KI#7: iter 1 claimed deletion but didn't perform; no code deps |
| `docs/ap_reference_inventory.md` | **Deleted** | KI#7: iter 1 claimed deletion but didn't perform; no code deps |
| `DELETIONS-iter1.txt` | **Deleted** | Stale iter 1 cleanup instruction file (poe2-regex-ru convention), no longer needed |
| `src/shell/assets/` | **Deleted** | KI#2: stale duplicate (only `vs-styles.css`), not read by build script |
| `STATUS.md` | Updated | This file — iter 2 status + KI resolution (KI#1-8) |
| `worklog.md` | Updated | Appended iter 2 Task ID section |
| `AGENT_NAVIGATION.md` | Updated | Clarified root fallback design (§1, §6, §7, §8) |
| `PLAN.md` | Updated | Marked iter 2 progress, iter 3+ remaining |

---

## Known Issues

KI#1..KI#6 (из iter 1) — все закрыты в iter 2.

**Активные Known Issues:**

### KI#8 — `scripts/validate-migration.mjs` + `docs/migration_map.md` (orphan)

**Симптом:** `scripts/validate-migration.mjs` парсит `docs/migration_map.md` (v5.12→v6 migration guide, 586 строк). При текущей v9.1.0 скрипт валидирует миграцию 4 major версий назад. Оба скрипта (`validate-migration.mjs`, `gen-redirect-map.mjs`) **orphan** — не вызываются из package.json / pre-commit hook / CI workflows. AGENT_NAVIGATION.md §1 упоминает их в списке scripts/, но фактически `pnpm run <script>` для них не определён.

**Риск:** Удаление `migration_map.md` сломает `validate-migration.mjs` (если кто-то запустит вручную). Оставление создаёт stale 586-строчный файл в контексте агента.

**План (iter 3):** Решить — (a) удалить оба orphan-скрипта + `migration_map.md` (предпочтительно, т.к. миграция v5.12→v6 уже не актуальна), либо (b) wire `validate-migration.mjs` в package.json и актуализировать под v9.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` в корне repo — это regenerated root fallbacks для GitHub Pages backward compat. Не gitignored (см. `.gitignore` строки 22-30). CI/CD деплоит из `dist/`, но fallbacks обеспечивают работу без CI/CD. **Не редактировать напрямую** — regenerated на каждом `pnpm run build`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Каждый читатель видит все секции. |
| **Model capability через `[MODEL_NOTE: text]`** | Не через layer separation, а inline-метки. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Bracket format для примеров** | `[SYSTEM]/[DESCRIPTION]/[EXAMPLES]/[ANCHORS]`. XML-теги только внутри Description. |
| **English technical terms в Russian prose** | SP, Description, Examples, Greeting, Lorebook, SPINE, GHOST, OCEAN, Enneagram, LIE, FLAW, NEED, WANT, T→A→P, CoT, Embodiment, CORE DIRECTIVES, Sampling params, 12B/32B/API, Part N, AP-N. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Python 3.10+** | Для скриптов валидации (`check_duplicates.py`, `validate_terms.py`, `check_english.py`, `check_syntax_mix.py`). |
| **GitHub Pages deploy** | Через GitHub Actions на push в main. Деплой из `dist/`. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
