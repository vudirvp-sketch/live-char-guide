# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + Part 4 master HTML migrated + validated (iter 9)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 9 COMPLETE.** Pilot Part 4 migration (iter 8) — визуально и статически валидирована. Регрессий не найдено. Build PASS, validate:master PASS, 43/43 unit tests PASS. KI#13 + KI#14 + KI#16 — ACTIVE.

### Что сделано в iter 9

**Validation pass Part 4 master HTML против Canon §4.** Никаких правок кода — только проверки.

- **Static HTML sanity check:** 11 секций (open/close balanced), 2 VS-EMBED divs (E05 + E06 well-formed), 3 infographic opens (2 retained + 1 inner), все 11 expected `data-section` IDs присутствуют. No orphan `<p>` между `</section>` и VS-EMBED E06 (iter 8 fix confirmed). No mermaid в part_04 (iter 8 removal confirmed). No broken internal hrefs.
- **Served `parts/part_04.html` через локальный сервер** (Python http.server :3001, build artifacts): 40 825 байт / 676 строк. VS-EMBED E05 (line 8-9) + E06 (line 522-523) присутствуют. Retained infographic p4_spine_mapping mnemonic (line 374) + p4_spine_navigation pipeline (line 495) — рендерятся. All 11 `data-section` IDs присутствуют. Orphan `<p>` (был line 599 iter 7) — 0 matches. Orphan `<h4>Архитектура` (был line 711 iter 7) — 0 matches. Mermaid (был line 147 iter 7) — 0 matches.
- **`pnpm run validate:master`** ✅ PASSED (all 12 checks). Warnings = 123 inline `style=` + 22 "content outside section" (pre-existing KI#13, baseline iter 8).
- **`pnpm run build`** ✅ SUCCESSFUL, hash `df283246` (same as iter 8, no drift).
- **`pnpm run validate`** ✅ All 8 validation gates passed.
- **`pnpm run test:unit`** ✅ 43/43 pass.
- **`pnpm run lint`** ✅ 0 errors, 10 warnings (pre-existing).
- **`pnpm run qa:bundle` / `qa:contrast` / `qa:doc-versions`** ✅ PASS.
- **`pnpm run qa:english`** ❌ 29 issues (vs 29 в iter 7 — no regression). Все pre-existing false positives: `[Model: see Appendix B]` в `<span class="model-note">` (1 в part_04, 5 в part_07a) + BEM class names с `__` в part_07a. qa:english script не распознаёт model-note span pattern.
- **`pnpm run qa:syntax`** ❌ 236 markdown false positives (BEM class names с `__` — `ring-label--g3` и т.д.). Same count as iter 7 baseline. part_04 — 22 false positives (same as iter 8).
- **`pnpm run qa:csp`** ❌ FAIL — `index.html has 2 inline script(s)`. **Pre-existing с iter 5** (`src/shell/index.html` имел 2 inline scripts с commit 60d7abd: `document.documentElement.classList.add('js')` + `mermaid.initialize({...})`). iter 8 worklog заявлял "qa без новых critical" но не упоминал qa:csp — был silent failing. **Зарегистрирован как KI#16** (NEW, ACTIVE).

### Изменённые файлы в iter 9

| File | Action | Reason |
|------|--------|--------|
| `STATUS.md` | Rewritten | iter 9 status, KI#16 NEW ACTIVE. iter 8 details → опущены (см. CHANGELOG [9.1.8]). |
| `worklog.md` | Updated | iter 8 → one-liner, iter 9 = этот record. |
| `AGENT_NAVIGATION.md` | Updated | Header iter 8 → iter 9. §8 iter 8 compressed, iter 9 record + iter 10+ roadmap. §6 pitfall #34 (KI#16). §10 hint для iter 10 (Canon Part 7A). |
| `CHANGELOG.md` | Updated | [9.1.9] entry — iter 9 validation pass. |
| `PLAN.md` | Updated | §5 iter 9 → ✅ DONE, iter 10+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 9 row → ✅ DONE. §8 iter 9 stop point + iter 10 priorities. |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 123 inline `style=` + 22 "content outside section" warnings в master HTML (iter 8 удалил 1 orphan, было 123 + 23; iter 9 verify — то же 123 + 22). Defer до post-Canon миграции (см. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.3).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6)** — Content duplication VS-EMBED ↔ текст. 17 VS-EMBED'ов сосуществуют с 8 устаревшими infographic + 1 mermaid = 26 визуализаций параллельно с текстом (iter 8 убрал 4 дубликата + 1 orphan из 31). Part 4 мигрирован (iter 8) + валидирован (iter 9). Остальные Parts в очереди (iter 10..17).

**KI#16 (NEW, ACTIVE, MEDIUM, found iter 9)** — `pnpm run qa:csp` FAIL: `index.html has 2 inline script(s)`. Pre-existing с iter 5 (`src/shell/index.html` строки 24 + 108: `document.documentElement.classList.add('js')` + `mermaid.initialize({...})`). Build pipeline регенерирует `index.html` (root fallback) из `src/shell/index.html` на каждом `pnpm run build`. Не блокирует Canon миграцию (CSP policy не enforced на GitHub Pages), но нарушает §6 pitfall #1 (no inline scripts). **Fix plan (iter 10+):** (a) вынести mermaid.initialize в `src/shell/widgets/mermaid-init.js` + загружать через `<script src="...">`; (b) оставить `document.documentElement.classList.add('js')` как essential inline (add CSP `unsafe-inline` exception) или вынести в external tiny script. Рекомендуется (a) + tiny inline exception.

**Fix plan (iter 10..18):** Canon creation iter 7 ✅ (Part 4) + migration iter 8 ✅ (Part 4) + validation iter 9 ✅ (Part 4). Дальше: iter 10–11 (Canon Part 7A + migrate) → iter 12–17 (остальные Parts) → iter 18 (final cleanup) → iter 19+ (KI#13 + KI#16 + Phase 4 SVG integration). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5 Migration Status.

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
| **Canonical Guide Spec (iter 7+8)** | `docs/canon/part_NN.md` — Markdown-источник правды для контента. Master HTML = генерируемый артефакт. Визуализации = замещение, не дополнение. Part 4 Canon создан (iter 7) + master HTML мигрирован (iter 8) + валидирован (iter 9). См. `docs/canon/_README.md` и `docs/CONTENT_RESTRUCTURE_PLAN.md`. |
| **Migration principle: viz > dry text (iter 8)** | При выборе «удалить текст или визуализацию» — визуализация сохраняется, dry-дублирующий текст удаляется. Unique визуализации не удаляются (даже если Canon рекомендует). Unique text в таблицах не удаляется (даже если Canon рекомендует сократить). Применяется «очень деликатно». |
| **Runtime data: `data/anchor-redirects.json` only** | Только `data/anchor-redirects.json` загружается lazy-loader.js. `docs/anchor-redirects.json` удалён в iter 7 (KI#15 fix). Single source of truth. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
