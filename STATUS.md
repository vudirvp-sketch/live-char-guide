# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.7 + docs restructure iter 7 (Canon scaffold + Part 4 pilot + KI#15 fix)
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 7 COMPLETE.** Создан Canon scaffold: `docs/canon/_README.md` (правила Canon: что это, как писать, как мигрировать) + `docs/canon/part_04.md` (пилот, SPINE Framework, 11 секций, ~390 строк Markdown). KI#15 CLOSED — удалён `docs/anchor-redirects.json` (stale duplicate), остался только `data/anchor-redirects.json` (runtime). Никаких правок master HTML / visual-system — только docs (Canon creation + KI#15 cleanup).

### Что сделано в iter 7

**Canon scaffold + пилотный Canon + KI#15 fix.** Без правок кода/контента master HTML.

- Создан `docs/canon/` с двумя файлами: `_README.md` (244 строки, 9 секций: зачем Canon, структура, Markdown conventions, workflow, migration status, anti-patterns, validation checklist) и `part_04.md` (394 строки, 11 секций, покрывает все `data-section` из `src/master/part_04.html`).
- Canon Part 4 покрывает: SPINE Overview, GHOST, LIE, FLAW, NEED, WANT, полная цепочка (Выщербленный canonical), SPINE → Anchors mapping (Елена FLAW-linked canonical), consistency check (Елена canonical), navigation, GHOST Layers (Выщербленный canonical).
- Дедупликация: VS-маркеры `[VS: E05 — ...]` / `[VS: E06 — ...]` вместо 6 устаревших `infographic inf-pipeline` + 1 `mermaid`. Примеры персонажей — каждый в одном canonical location (Елена в §4.2–§4.6, Выщербленный в §4.7 / §4.11), в остальных местах cross-ref.
- Migration Notes секция в `part_04.md` — таблица из 10 строк: какие HTML-элементы удалить/заменить/оставить при миграции `part_04.html` в iter 8.
- **KI#15 fix:** удалён `docs/anchor-redirects.json` (108 строк, stale v8→v9 redirects). Остался только `data/anchor-redirects.json` (runtime, v8→v9.1, загружается `lazy-loader.js`). AGENT_NAVIGATION §7 — строка про docs/anchor-redirects.json удалена.

### Изменённые файлы в iter 7

| File | Action | Reason |
|------|--------|--------|
| `docs/canon/_README.md` | **Created** | Правила Canon: что это, структура, Markdown conventions, workflow, migration status, anti-patterns, validation checklist |
| `docs/canon/part_04.md` | **Created** | Пилотный Canon для Part 4 (SPINE). 11 секций, 394 строки, все `data-section` покрыты. Migration Notes для iter 8. |
| `docs/anchor-redirects.json` | **Deleted** | KI#15 fix — stale duplicate of `data/anchor-redirects.json`. Runtime использует только `data/` версию. |
| `STATUS.md` | Rewritten | iter 7 status + KI#15 CLOSED |
| `worklog.md` | Updated | iter 6b → one-liner, iter 7 record (Canon scaffold + Part 4 + KI#15) |
| `AGENT_NAVIGATION.md` | Updated | Header iter 7, §6 pitfall #33 → CLOSED, §7 убрана строка про `docs/anchor-redirects.json`, §8 iter 7 record + iter 8+ roadmap, §10 hint для iter 8 |
| `PLAN.md` | Updated | §2.1 docs/anchor-redirects.json → REMOVED iter 7. §5 iter 7 status + iter 8+ roadmap |
| `CHANGELOG.md` | Updated | Добавлена запись `[9.1.7]` — iter 7 (Canon scaffold + Part 4 pilot + KI#15 fix) |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §9.3.1 — добавлена пометка "FIXED iter 7 — файл удалён, KI#15 CLOSED" |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5) — 123 inline `style=` + 23 "content outside section" warnings в master HTML.** Defer до post-Canon миграции (см. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.3 — KI#13 делается после миграции каждого Part'а, в той же итерации).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6) — Content duplication VS-EMBED ↔ текст.** 17 VS-EMBED'ов сосуществуют с 12 устаревшими infographic + 2 mermaid = 31 визуализация параллельно с текстом. Концепции (GHOST, SPINE, FLAW и т.д.) пере-объясняются в каждой секции. Визуализации **дублируют** текст вместо **замещения**. Все 11 term counts + 4 visual counts verified в iter 6 validation pass.

**Fix plan (iter 8..18):** Canon creation iter 7 ✅ (Part 4). Migragion iter 8 (Part 4) → iter 10–17 (остальные Parts) → iter 18 (final cleanup). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5 Migration Status.

---

**История KI (все CLOSED):**

- KI#1..KI#6 (iter 1) — закрыты в iter 2.
- KI#7 (iter 2) — закрыт в iter 2.
- KI#8 (iter 2, deferred to iter 3) — закрыт в iter 3.
- KI#9 (iter 3) — закрыт в iter 3.
- KI#10 (iter 4) — закрыт в iter 4.
- KI#11 (iter 4) — закрыт в iter 5: `tokens.json` создан, `qa:contrast` работает.
- KI#12 (iter 4) — частично пофикшен в iter 5: 10 `<script>` errors → 0 (widget migration). Остаток → KI#13.
- KI#15 (iter 6) — закрыт в iter 7: `docs/anchor-redirects.json` удалён, остался только `data/` (single source of truth).

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` в корне repo — regenerated root fallbacks для GitHub Pages backward compat. Не редактировать напрямую. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. |
| **Model capability через `[MODEL_NOTE: text]`** | Не через layer separation, а inline-метки. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Python 3.10+** | Для CI-wired скриптов и QA tools. |
| **GitHub Pages deploy** | Через GitHub Actions на push в main. |
| **QA scripts wired as `qa:*` (iter 4)** | `qa:csp`, `qa:bundle`, `qa:contrast`, `qa:english`, `qa:syntax`, `qa:doc-versions`, `qa:interactive`. Aggregate: `pnpm run qa`. `validate:master` wired в `precommit` (iter 5). |
| **Canonical Guide Spec (iter 7 scaffold)** | `docs/canon/part_NN.md` — Markdown-источник правды для контента. Master HTML = генерируемый артефакт. Визуализации = замещение, не дополнение. Part 4 Canon создан (iter 7), master HTML миграция — iter 8. См. `docs/canon/_README.md` и `docs/CONTENT_RESTRUCTURE_PLAN.md`. |
| **Runtime data: `data/anchor-redirects.json` only** | Только `data/anchor-redirects.json` загружается lazy-loader.js. `docs/anchor-redirects.json` удалён в iter 7 (KI#15 fix). Single source of truth. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
