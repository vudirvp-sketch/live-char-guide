# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.6 + docs restructure iter 6 (analytical + validation pass)
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 6 COMPLETE (analytical + validation pass).** Создан `docs/CONTENT_RESTRUCTURE_PLAN.md` — полный анализ дублирования (7 паттернов A..G + Pattern H найден в validation) + стратегия Canonical Guide Spec + дорожная карта iter 7..19. Validation pass подтвердил все 18 ключевых метрик, исправил 3 арифметические погрешности (section count 124 → 98), обнаружил 5 новых находок (Pattern H, Pattern E scope, CHANGELOG gap, component-extracts/ unaudited, tables count). KI#15 NEW (anchor-redirects.json stale duplicate). Никаких правок master HTML / visual-system.

### Что сделано в iter 6

**Аналитическая итерация + validation pass.** Без правок кода/контента. Только docs.

- Изучены master HTML (10 Parts + 3 Appendix, 98 секций, 6 576 строк), visual-system/elements (17 файлов, 6 369 строк), docs/ (8 файлов, 2 909 строк).
- Идентифицированы 7 паттернов дублирования (Pattern A..G): VS-EMBED + textual section, cascade duplicates, per-element re-explanation, anti-patterns triple duplication, cross-section concept repetition, stale infographic + VS-EMBED coexistence, docs ↔ master HTML drift.
- **Validation pass** добавил Pattern H: `docs/anchor-redirects.json` — stale duplicate of `data/anchor-redirects.json` (битые редиректы v8→v9 вместо актуальных v8→v9.1).
- Подсчитаны и **verified** метрики: GHOST 165 ✅, SPINE 160 ✅, FLAW 142 ✅, LIE 104 ✅, NEED 105 ✅, WANT 108 ✅, OCEAN 72 ✅, CoT 92 ✅, Enneagram 48 ✅, MBTI 25 ✅, CORE DIRECTIVES 36 ✅. VS-EMBED 17 ✅, infographic 12 ✅, mermaid 2 ✅, inline `style=` 123 ✅.
- Сформулирована стратегия: **Canonical Guide Spec** — единый Markdown-документ-источник (`docs/canon/part_NN.md`), из которого master HTML выводится. Визуализация = замещение, не дополнение.
- Дорожная карта: iter 7 (Canon scaffold + Part 4 pilot) → iter 8 (migrate part_04.html) → iter 9 (validate) → iter 10–17 (остальные Parts) → iter 18 (final cleanup) → iter 19+ (KI#13 + KI#15 + Phase 4).

### Изменённые файлы в iter 6

| File | Action | Reason |
|------|--------|--------|
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | **Created + §9 added** | Канонический план переработки + validation pass (§9: 18 verified, 3 corrected, 5 new findings) |
| `STATUS.md` | Rewritten | iter 6 status + KI#14 + KI#15 |
| `worklog.md` | Updated | Appended iter 6 record (analytical + validation pass) |
| `AGENT_NAVIGATION.md` | Updated | Header iter 6, §1 section count fix (92 → 98), §6 pitfall #32 (KI#14) + #33 (KI#15), §7 CONTENT_RESTRUCTURE_PLAN + docs/canon/ в Documentation Map, §8 iter 6 record + iter 7+ roadmap, §10 hint для iter 7 |
| `PLAN.md` | Updated | §5 iter 6 status (analytical + validation) + iter 7+ roadmap |
| `CHANGELOG.md` | Updated | Добавлена запись `[9.1.6]` — iter 6 (KI#14 + CONTENT_RESTRUCTURE_PLAN + validation pass) |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5) — 123 inline `style=` + 23 "content outside section" warnings в master HTML.** Defer до post-Canon миграции (см. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.3 — KI#13 делается после миграции каждого Part'а, в той же итерации).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6) — Content duplication VS-EMBED ↔ текст.** 17 VS-EMBED'ов сосуществуют с 12 устаревшими infographic + 2 mermaid = 31 визуализация параллельно с текстом. Концепции (GHOST, SPINE, FLAW и т.д.) пере-объясняются в каждой секции. Визуализации **дублируют** текст вместо **замещения**. Все 11 term counts + 4 visual counts verified в iter 6 validation pass.

**Fix plan (iter 7..18):** См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2.

**KI#15 (ACTIVE, LOW-MEDIUM, found iter 6 validation) — `docs/anchor-redirects.json` stale duplicate of `data/anchor-redirects.json`.** В репозитории 2 файла с одинаковым именем: `data/anchor-redirects.json` (runtime, загружается lazy-loader.js, v8→v9.1 redirects, актуальный) и `docs/anchor-redirects.json` (документация, v8→v9 redirects, **stale** — `greeting` → `p3_greeting` вместо `p7b_greeting`, `p8_ap15_*` → `p8_ap15_ocean_overload` вместо `p5_ocean_warning`). MD5 различаются. AGENT_NAVIGATION §7 ссылается на docs/ версию как "обновлять при rename/delete section IDs", но фактически она не обновлялась с v9.1 restructure.

**Fix plan (iter 7+, low priority):** Удалить `docs/anchor-redirects.json`, оставить только `data/anchor-redirects.json` как single source of truth. AGENT_NAVIGATION §7 обновить — убрать строку про `docs/anchor-redirects.json`. См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §9.3.1.

**Impact:** LOW для runtime (lazy-loader использует `data/`), MEDIUM для documentation integrity — агент, читающий docs/ версию как референс, получит устаревшие редиректы.

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
| **Runtime data: `data/anchor-redirects.json` (iter 6 validation)** | Только `data/anchor-redirects.json` загружается lazy-loader.js. `docs/anchor-redirects.json` — stale duplicate (KI#15), подлежит удалению. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
