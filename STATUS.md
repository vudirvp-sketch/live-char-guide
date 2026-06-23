# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + Part 4 ✅ migrated+validated + Part 7A Canon created (iter 10)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 10 COMPLETE.** Canon Part 7A создан (`docs/canon/part_07a.md`, 802 строки, 13 H2 секций, 4 VS-маркера для E08/E16/E17/E02). Master HTML не тронут (iter 11 задача). `pnpm run validate:master` ✅ PASS (0 errors, KI#13 baseline). KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE.

### Что сделано в iter 10

**Canon creation Part 7A — `docs/canon/part_07a.md`.** Никаких правок master HTML.

- **Структура:** 13 H2 секций (по одной на каждый `data-section` из `src/master/part_07a.html`): `p7a_system_prompt`, `p7a_core_directives`, `p7a_tone_frame`, `p7a_format_lock`, `p7a_authors_note`, `p7a_sampling_params`, `p7a_model_checklist`, `p7a_ooc_protection`, `p7a_xml_tags`, `p7a_api_blocks`, `p7a_4k_fallback`, `p7a_token_budget`, `p7a_assembly_pipeline`.
- **4 VS-маркера:** E08 (CORE DIRECTIVES, §7A.2), E16 (Author's Note Mechanics, §7A.5), E17 (Sampling Parameters, §7A.6), E02 (Assembly Pipeline, §7A.13). E07 (Voice Hierarchy) отмечен как cross-reference внутри E16 (не отдельный VS-EMBED в Part 7A — embedded в Part 3).
- **Front-matter:** `Migration status: ❌ NOT MIGRATED (iter 11 task)`.
- **Migration Notes:** TODO-таблица с 54 элементами для iter 11 (50 "Оставить" + 4 "Сжать" кандидата). Validation gates прописаны.
- **Decision:** iter 11 (master HTML migration) — рекомендуется разбить на 2 под-итерации: iter 11a (§7A.1–§7A.7, ~660 строк, 3 VS-EMBED) + iter 11b (§7A.8–§7A.13, ~510 строк, 1 VS-EMBED).
- **`pnpm run validate:master`** ✅ PASSED (all 12 checks). 0 errors. Warnings = pre-existing KI#13 baseline (123 inline `style=` + 22 "content outside section"). Canon-файлы не входят в build pipeline — валидация идентична iter 9.

### KI#17 — NEW (документация drift)

При анализе `src/master/part_07a.html` обнаружено: фактические 4 VS-EMBED в файле — **E08, E16, E17, E02** (lines 47, 267, 430, 916). Но AGENT_NAVIGATION.md §10 hint и worklog.md iter 9 record указывали **«E07, E08, E16, E17»** — некорректно. E07 (Voice Hierarchy) существует как visual-system element, но в Part 7A только cross-referenced внутри E16 (lines 310, 358 — badge «Влияние на голос: E07 (~2–5%)»), не embedded.

**Fix applied in iter 10:** AGENT_NAVIGATION.md §10 hint + worklog.md iter 9 one-liner исправлены (E07 → E02 как 4-й VS-EMBED). Canon `part_07a.md` front-matter явно перечисляет E08/E16/E17/E02 как embedded + E07 как cross-ref only. KI#17 — LOW (документация), не влияет на build/runtime.

### Изменённые файлы в iter 10

| File | Action | Reason |
|------|--------|--------|
| `docs/canon/part_07a.md` | **NEW** | Canon Part 7A — 802 строки, 13 H2 секций, 4 VS-маркера (E08/E16/E17/E02), Migration Notes таблица для iter 11. |
| `STATUS.md` | Rewritten | iter 10 status, KI#17 NEW ACTIVE. iter 9 details → опущены (см. CHANGELOG [9.1.9]). |
| `worklog.md` | Updated | iter 9 → one-liner, iter 10 = этот record. |
| `AGENT_NAVIGATION.md` | Updated | Header iter 9 → iter 10. §8 iter 9 compressed, iter 10 record + iter 11+ roadmap. §6 pitfall #35 (KI#17). §10 hint для iter 11 (fix E07→E02 drift + 2-sub-iter recommendation). |
| `CHANGELOG.md` | Updated | [9.1.10] entry — iter 10 Canon Part 7A created. |
| `PLAN.md` | Updated | §5 iter 10 → ✅ DONE, iter 11+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 10 row → ✅ DONE. §8 iter 10 stop point + iter 11 priorities. |
| `docs/canon/_README.md` | Updated | §5 Part 7A row → ✅ iter 10 (Canon created). §9 iter 10 entry. |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 123 inline `style=` + 22 "content outside section" warnings в master HTML (iter 8 удалил 1 orphan, было 123 + 23; iter 9 verify — то же 123 + 22; iter 10 verify — то же 123 + 22). Defer до post-Canon миграции (см. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.3).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6)** — Content duplication VS-EMBED ↔ текст. 17 VS-EMBED'ов сосуществуют с 8 устаревшими infographic + 1 mermaid = 26 визуализаций параллельно с текстом. Part 4 мигрирован (iter 8) + валидирован (iter 9). Part 7A Canon создан (iter 10) — миграция в iter 11. Остальные Parts в очереди (iter 12..17).

**KI#16 (ACTIVE, MEDIUM, found iter 9)** — `pnpm run qa:csp` FAIL: `index.html has 2 inline script(s)`. Pre-existing с iter 5 (`src/shell/index.html` строки 24 + 108: `document.documentElement.classList.add('js')` + `mermaid.initialize({...})`). Build pipeline регенерирует `index.html` (root fallback) из `src/shell/index.html` на каждом `pnpm run build`. Не блокирует Canon миграцию (CSP policy не enforced на GitHub Pages), но нарушает §6 pitfall #1 (no inline scripts). **Fix plan (iter 19+):** (a) вынести mermaid.initialize в `src/shell/widgets/mermaid-init.js` + загружать через `<script src="...">`; (b) оставить `document.documentElement.classList.add('js')` как essential inline (add CSP `unsafe-inline` exception) или вынести в external tiny script. Рекомендуется (a) + tiny inline exception.

**KI#17 (NEW, ACTIVE, LOW, found iter 10)** — Documentation drift: AGENT_NAVIGATION.md §10 hint + worklog.md iter 9 record указывали 4 VS-EMBED в `src/master/part_07a.html` как «E07, E08, E16, E17». Фактически в файле — **E08, E16, E17, E02** (E02 = Assembly Pipeline, E07 = Voice Hierarchy — embedded в Part 3, в Part 7A только cross-ref внутри E16). **Fixed in iter 10:** AGENT_NAVIGATION.md §10 hint + worklog.md iter 9 one-liner обновлены. Canon `part_07a.md` front-matter корректно перечисляет embedded (E08/E16/E17/E02) vs cross-ref-only (E07). LOW severity — не влияет на build/runtime, только на agent navigation.

**Fix plan (iter 11..18):** Canon creation iter 7 ✅ (Part 4) + migration iter 8 ✅ (Part 4) + validation iter 9 ✅ (Part 4) + Canon creation iter 10 ✅ (Part 7A). Дальше: iter 11 (migrate Part 7A, рекомендуется 2 под-итерации 11a + 11b) → iter 12–17 (остальные Parts) → iter 18 (final cleanup) → iter 19+ (KI#13 + KI#16 + Phase 4 SVG integration). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5 Migration Status.

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
| **Canonical Guide Spec (iter 7+8+10)** | `docs/canon/part_NN.md` — Markdown-источник правды для контента. Master HTML = генерируемый артефакт. Визуализации = замещение, не дополнение. Part 4 Canon создан (iter 7) + master HTML мигрирован (iter 8) + валидирован (iter 9). Part 7A Canon создан (iter 10) — миграция в iter 11. См. `docs/canon/_README.md` и `docs/CONTENT_RESTRUCTURE_PLAN.md`. |
| **Migration principle: viz > dry text (iter 8)** | При выборе «удалить текст или визуализацию» — визуализация сохраняется, dry-дублирующий текст удаляется. Unique визуализации не удаляются (даже если Canon рекомендует). Unique text в таблицах не удаляется (даже если Canon рекомендует сократить). Применяется «очень деликатно». |
| **Runtime data: `data/anchor-redirects.json` only** | Только `data/anchor-redirects.json` загружается lazy-loader.js. `docs/anchor-redirects.json` удалён в iter 7 (KI#15 fix). Single source of truth. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
