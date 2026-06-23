# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.8 + Part 4 master HTML migrated против Canon (iter 8)
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 8 COMPLETE.** Мигрирован `src/master/part_04.html` против Canon §4 (пилот). 777 → 676 строк (-13%). Build PASS, validate:master PASS, qa без новых critical. KI#13 + KI#14 — ACTIVE.

### Что сделано в iter 8

**Pilot migration: Part 4 master HTML → Canon §4.** Применён Canon-first workflow iter 7 → iter 8.

- Удалены 4 дублирующих визуализации: 1 mermaid (p4_spine_overview, дубликат E05) + 3 `infographic inf-pipeline` (p4_spine_overview, p4_spine_full_chain, p4_ghost_layers — все дубликаты VS-EMBED E05/E06).
- Сжаты 2 re-explanation абзаца в p4_spine_overview (строки 145, 162 оригинала) до 1 предложения + cross-ref на §4.2–§4.6. Цепочка GHOST→LIE→FLAW→NEED→WANT теперь показана только в VS-EMBED E05, текст не пере-объясняет.
- Удалён orphan `<p>` между `</section>` p4_spine_navigation и VS-EMBED E06 — content outside `<section>` (1 из 23 KI#13 warnings), дублировала intro p4_ghost_layers.
- Удалена 4-я строка (forward-ref "GHOST Layers: 3 уровня") из таблицы "Примеры GHOST" — структурно несогласована с таблицей примеров, дублирует §4.11.
- **Сохранены 2 unique infographic** (deviation от Canon Migration Notes, по предпочтению пользователя «viz > dry text»): p4_spine_mapping mnemonic (GHOST→ТРИГГЕР, LIE→PSYCHOLOGICAL ANCHOR и т.д. — комплементарна детальной таблице, не дубликат) + p4_spine_navigation pipeline (1→5→6→7A/B→10 — unique визуализация следующих Parts, не дубликат VS-EMBED).
- **LIE таблица сохранена полностью** (4 строки, deviation от Canon "сократить до 2") — все 4 строки уникальны (variant Выщербленного "Пустота заполняема" не повторяется elsewhere).
- Сохранены как canonical: pre/code пример Выщербленного (p4_spine_full_chain), pre/code пример Елены (p4_spine_check), таблица FLAW ❌/✅ comparison, VS-EMBED E05 + E06 как primary визуализации.
- Canon `docs/canon/part_04.md` front-matter обновлён → `Migration status: ✅ MIGRATED (iter 8)`. Migration Notes таблица переписана с пометками DONE/DEVIATED/PARTIAL/BONUS для каждой строки.

### Изменённые файлы в iter 8

| File | Action | Reason |
|------|--------|--------|
| `src/master/part_04.html` | **Migrated** | Pilot migration против Canon §4. 777 → 676 строк (-13%). 4 dup визуализации удалены, 1 orphan удалён, re-explanation сжато, 2 unique infographic сохранены. |
| `docs/canon/part_04.md` | Updated | Front-matter → ✅ MIGRATED (iter 8). Migration Notes переписана: каждая строка с пометкой DONE/DEVIATED/PARTIAL/BONUS. Принцип «viz > dry text» зафиксирован. |
| `docs/canon/_README.md` | Updated | §5 Migration Status: Part 4 → ✅ iter 8 (DONE). §9 история: iter 8 record. |
| `STATUS.md` | Rewritten | iter 8 status, KI#13/KI#14 ACTIVE. |
| `worklog.md` | Updated | iter 7 → one-liner, iter 8 = этот record. |
| `AGENT_NAVIGATION.md` | Updated | Header iter 8. §8 iter 8 record + iter 9+ roadmap. §10 hint для iter 9. |
| `CHANGELOG.md` | Updated | Добавлена запись `[9.1.8]` — iter 8 (Part 4 migration). |
| `PLAN.md` | Updated | §5 iter 8 status (DONE) + iter 9+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 8 row → ✅ DONE. |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5) — 122 inline `style=` + 22 "content outside section" warnings в master HTML (1 orphan удалён в iter 8, было 123 + 23).** Defer до post-Canon миграции (см. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.3 — KI#13 делается после миграции каждого Part'а, в той же итерации; в iter 8 удалён 1 orphan как побочный эффект миграции Part 4).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6) — Content duplication VS-EMBED ↔ текст.** 17 VS-EMBED'ов сосуществуют с 8 устаревшими infographic + 1 mermaid = 26 визуализаций параллельно с текстом (было 31 — Part 4 миграция iter 8 убрала 4 дубликата + 1 orphan). Концепции (GHOST, SPINE, FLAW и т.д.) пере-объясняются в каждой секции. Визуализации **дублируют** текст вместо **замещения**. Part 4 мигрирован (iter 8) — остальные Parts в очереди.

**Fix plan (iter 9..18):** Canon creation iter 7 ✅ (Part 4) + migration iter 8 ✅ (Part 4). Дальше: iter 10–17 (остальные Parts) → iter 18 (final cleanup). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5 Migration Status.

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
| **Canonical Guide Spec (iter 7+8)** | `docs/canon/part_NN.md` — Markdown-источник правды для контента. Master HTML = генерируемый артефакт. Визуализации = замещение, не дополнение. Part 4 Canon создан (iter 7) + master HTML мигрирован (iter 8). См. `docs/canon/_README.md` и `docs/CONTENT_RESTRUCTURE_PLAN.md`. |
| **Migration principle: viz > dry text (iter 8)** | При выборе «удалить текст или визуализацию» — визуализация сохраняется, dry-дублирующий текст удаляется. Unique визуализации не удаляются (даже если Canon рекомендует). Unique text в таблицах не удаляется (даже если Canon рекомендует сократить). Применяется «очень деликатно». |
| **Runtime data: `data/anchor-redirects.json` only** | Только `data/anchor-redirects.json` загружается lazy-loader.js. `docs/anchor-redirects.json` удалён в iter 7 (KI#15 fix). Single source of truth. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
