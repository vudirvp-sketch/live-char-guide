# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + docs restructure iter 6 (analytical)
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 6 (analytical pass): KI#14 NEW (content duplication, ACTIVE).** Создан `docs/CONTENT_RESTRUCTURE_PLAN.md` — полный анализ дублирования + стратегия Canonical Guide Spec + дорожная карта iter 7..19. Никаких правок master HTML / visual-system.

### Что сделано в iter 6

**Аналитическая итерация.** Без правок кода/контента. Только docs.

- Изучены master HTML (10 Parts + 3 Appendix, 124 секции, ~6 600 строк), visual-system/elements (17 файлов, ~6 000 строк), docs/ (8 файлов, ~2 500 строк).
- Идентифицированы 7 паттернов дублирования (Pattern A..G): VS-EMBED + textual section, cascade duplicates, per-element re-explanation, anti-patterns triple duplication, cross-section concept repetition, stale infographic + VS-EMBED coexistence, docs ↔ master HTML drift.
- Подсчитаны метрики: GHOST упоминается 165 раз в master HTML (~каждые 40 строк), SPINE — 160, FLAW — 142. 17 VS-EMBED + 12 устаревших infographic + 2 mermaid = 31 визуализация параллельно с текстом.
- Сформулирована стратегия: **Canonical Guide Spec** — единый Markdown-документ-источник (`docs/canon/part_NN.md`), из которого master HTML выводится. Визуализация = замещение, не дополнение.
- Дорожная карта: iter 7 (Canon scaffold + Part 4 pilot) → iter 8 (migrate part_04.html) → iter 9 (validate) → iter 10–17 (остальные Parts) → iter 18 (final cleanup) → iter 19+ (KI#13 + Phase 4).

### Изменённые файлы в iter 6

| File | Action | Reason |
|------|--------|--------|
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | **Created** | Канонический план переработки (8 секций: TL;DR, Current State, Duplication Patterns, Root Cause, Strategy, Migration Plan, Success Metrics, Stopping Point) |
| `STATUS.md` | Rewritten | iter 6 status + KI#14 NEW |
| `worklog.md` | Updated | Appended iter 6 record, iter 5 → one-liner |
| `AGENT_NAVIGATION.md` | Updated | Header iter 6, §6 pitfall #32 (KI#14), §7 CONTENT_RESTRUCTURE_PLAN + docs/canon/ в Documentation Map, §8 iter 6 record + iter 7+ roadmap, §10 hint для iter 7 |
| `PLAN.md` | Updated | §5 iter 6 status + iter 7+ roadmap |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5) — 123 inline `style=` + 23 "content outside section" warnings в master HTML.** Defer до post-Canon миграции (см. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.3 — KI#13 делается после миграции каждого Part'а, в той же итерации).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6) — Content duplication VS-EMBED ↔ текст.** 17 VS-EMBED'ов сосуществуют с 12 устаревшими infographic + 2 mermaid = 31 визуализация параллельно с текстом. Концепции (GHOST, SPINE, FLAW и т.д.) пере-объясняются в каждой секции. Визуализации **дублируют** текст вместо **замещения**. 

**Fix plan (iter 7..18):** См. `docs/CONTENT_RESTRUCTURE_PLAN.md` — полный план с дорожной картой.

**Impact:** MEDIUM-HIGH. Не нарушает технические правила (§3), но делает гайд избыточным и трудным для переработки. Агенты и LLM путаются в дублированном контенте, что приводит к drift между docs и master HTML.

---

**История KI (все CLOSED):**

- KI#1..KI#6 (iter 1) — закрыты в iter 2.
- KI#7 (iter 2) — закрыт в iter 2.
- KI#8 (iter 2, deferred to iter 3) — закрыт в iter 3.
- KI#9 (iter 3) — закрыт в iter 3.
- KI#10 (iter 4) — закрыт в iter 4.
- KI#11 (iter 4) — закрыт в iter 5: `tokens.json` создан, `qa:contrast` работает.
- KI#12 (iter 4) — частично пофикшен в iter 5: 10 `<script>` errors → 0 (widget migration). Остаток → KI#13.

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
| **Canonical Guide Spec (planned iter 7)** | `docs/canon/part_NN.md` — Markdown-источник правды для контента. Master HTML = генерируемый артефакт. Визуализации = замещение, не дополнение. См. `docs/CONTENT_RESTRUCTURE_PLAN.md`. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
