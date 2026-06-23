# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + docs restructure iter 4
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 4 (LOW-priority cleanup + QA wiring): 4 planned tasks done, 1 closed KI#10, 2 new active KI#11/KI#12.**

iter 4 закрыл все 4 LOW-priority задач из iter 3 roadmap: (A) trim character_bible.md, (B) merge cross_reference_sync.md в AGENT_NAVIGATION §9, (C) wire orphan QA scripts в package.json, (D) audit visual-system/PLAN.md Phase 4. При выполнении task C обнаружены 2 новых KI: KI#11 (`contrast_checker.mjs` требует несуществующий `tokens.json`) и KI#12 (visual-system integration introduce 10 `<script>` + 123 inline `style=` violations, `validate:master` не в precommit — silent ship). Оба KI задокументированы и deferred в iter 5+ (нужен architecture decision).

### Что сделано в iter 4

**Task A — `docs/character_bible.md` trim** → DONE. Удалены дублирующие секции Elena (1) и Выщербленный (8) — они каноничны в per-character bibles. Секции заменены на pointer stubs с описанием где в guide используется персонаж. Header обновлён: deprecated notice → "Supporting Characters Registry" clarification. Экономия: 125 строк (770 → 645). Per-character bibles (`elena_character_bible.md`, `vyshcherblenny_character_bible.md`) — без изменений (canonical Source of Truth).

**Task B — `docs/cross_reference_sync.md` merge** → DONE. Compact файл (62 строки, 14 bidirectional cross-ref pairs) слит в `AGENT_NAVIGATION.md` новый §9 "Cross-Reference Pairs". Source file удалён. §7 Documentation Map обновлён (удалена строка `cross_reference_sync.md`). §7 "Удалено в iter 1+2+3" → "Удалено в iter 1+2+3+4" с новой строкой.

**Task C — Wire orphan QA scripts в `package.json`** → DONE. Добавлены 9 новых scripts: `qa:csp`, `qa:bundle`, `qa:contrast`, `qa:english`, `qa:english:docs`, `qa:syntax`, `qa:doc-versions`, `qa:interactive`, aggregate `qa`. НЕ в `precommit` / CI — ручной запуск. `qa:contrast` gracefully SKIPs (KI#11).

**Task D — Audit `visual-system/PLAN.md` Phase 4** → DONE. Добавлен новый §4.0 "Integration Status" с таблицей состояния: markers ✅ 17/17, component-extracts ✅ 17/17, INTEGRATION-MAP ✅, actual content replacement ❌ (master sections still contain original textual content after each marker). Conclusion: Phase 4 partially complete — marker scaffolding + artifacts in place, actual text→SVG replacement not executed.

**KI#10 (NEW, найден в iter 4) — closed в iter 4.** `check_english.py` lines 325-334 + `check_syntax_mix.py` line 169 содержали stale v7 paths (`src/parts-l1/l2/l3/`, removed в v8) + stale "v6" comment. Пофикшено: оба скрипта теперь сканируют только `src/master/` (v8+ canonical).

**KI#11 (NEW, найден в iter 4) — ACTIVE, defer to iter 5+.** `contrast_checker.mjs` ожидает `tokens.json`, которого нет в repo. Script gracefully SKIPs при запуске `qa:contrast`. Fix options (a/b/c) описаны в STATUS.md.

**KI#12 (NEW, найден в iter 4) — ACTIVE, defer to iter 5+.** Visual-system integration introduced 10 prohibited `<script>` blocks + 123 inline `style=` attributes + 23 "content outside section" violations в master HTML. `pnpm run validate:master` не в `precommit`, поэтому 10 errors ship silently. Fix plan (4 steps) описан в STATUS.md. iter 5+ должен решить architecture question (update §3 rule OR migrate to widget JS).

### Изменённые файлы в iter 4

| File | Action | Reason |
|------|--------|--------|
| `STATUS.md` | Updated | This file — iter 4 status + KI#10 (closed) + KI#11/KI#12 (active) |
| `worklog.md` | Updated | Appended iter 4 Task ID section, iter 3 → one-liner |
| `AGENT_NAVIGATION.md` | Updated | Header iter 4, §1 scripts classification (orphan → wired), §7 deletion list iter 4, §8 OP-1 progress, §9 NEW Cross-Reference Pairs (merged from cross_reference_sync.md), §10 hint iter 5 |
| `CHANGELOG.md` | Updated | Added [9.1.4] (iter 4) section |
| `PLAN.md` | Updated | §5 iter 4 status + iter 5+ remaining |
| `docs/character_bible.md` | Trimmed | Removed Elena + Выщербленный duplicates (125 строк), updated header to "Supporting Characters Registry" |
| `docs/cross_reference_sync.md` | **Deleted** | Merged into AGENT_NAVIGATION.md §9 |
| `visual-system/PLAN.md` | Updated | Added §4.0 "Integration Status" с actual state audit |
| `package.json` | Updated | Added 9 `qa:*` scripts (csp/bundle/contrast/english/english:docs/syntax/doc-versions/interactive/aggregate) |
| `scripts/check_english.py` | Fixed (KI#10) | Removed stale v7 paths `src/parts-l1/l2/l3/`, updated "v6" → "v8+" comment |
| `scripts/check_syntax_mix.py` | Fixed (KI#10) | Updated argparse default to `['src/master/']`, removed v7 paths |

---

## Known Issues

**KI#11 (NEW, найден в iter 4) — `scripts/contrast_checker.mjs` ожидает `tokens.json`, которого нет в repo** → ACTIVE (defer to iter 5+).

`contrast_checker.mjs` строка 3 + 38-48: открывает JSON-файл по пути из `process.argv[2]`, парсит как `tokens.primitives.color.semantic` + `tokens.primitives.color.gray['900']`, считает WCAG contrast ratio. **Проблема:** файла `tokens.json` нет нигде в repo (grep по всем `*.mjs/js/md/py/json` — единственные упоминания внутри самого `contrast_checker.mjs`). В repo есть только `visual-system/DESIGN-TOKENS.css` — CSS custom properties (`:root { --bg-deep: #08090d; ... }`), не JSON.

**Impact:** `qa:contrast` (wired в iter 4) печатает "SKIP: No tokens.json path provided" и завершается без ошибок, но фактически не валидирует контраст. Pitfall #25 (WCAG contrast) остаётся непокрытым автоматической проверкой.

**Fix options (iter 5+):**
- (a) Создать `visual-system/tokens.json` (JSON-экстракт из `DESIGN-TOKENS.css` с `primitives.color` структурой) — minimal change, скрипт работает как есть.
- (b) Переписать `contrast_checker.mjs` для парсинга CSS custom properties напрямую из `DESIGN-TOKENS.css` — better long-term (single source of truth), но требует CSS-парсер (`node-html-parser` уже в devDependencies).
- (c) Удалить `contrast_checker.mjs` как orphan с broken contract — aggressive, теряем WCAG-чекер.

**Решение defer в iter 5+:** нужен infrastructure decision (a/b/c). На iter 4 script оставлен в repo, `qa:contrast` НЕ wired в `qa` aggregate (только как standalone `pnpm run qa:contrast`, который gracefully SKIPs).

---

**KI#12 (NEW, найден в iter 4 через `qa:syntax` + `qa:csp` + `pnpm run validate:master`) — visual-system integration introduced 10 `<script>` blocks + 123 inline `style=` attributes в master HTML, нарушает §3 rule** → ACTIVE (defer to iter 5+).

`pnpm run validate:master` (впервые запущен в iter 4 после wiring `qa:*` scripts) сообщает:
- **10 ERRORS** — "Prohibited element found: `<script>`" в каждом из 10 `src/master/part_*.html` файлов. Все inline `<script type="module">` блоки пришли из visual-system integration (см. `visual-system/integration/component-extracts/E##-script.js`). Например `src/master/part_10.html` строки 117-150 — inline E15 Annotated Blueprint script с комментарием `// VS Element E15 - inline script (from component-extracts)`.
- **123 WARNINGS** — `style="..."` inline attributes (не `<style>` блоки), преимущественно visual-system elements (`top:10px; right:20px;` для callout positioning, `color:var(--accent-violet);` для accent colors).
- **23 WARNINGS** — "Content found outside `<section data-section>` blocks" — visual-system SVG/HTML elements расположены между `</section>` и следующим `<section>`, нарушает §3 "Контент вне `<section data-section>`" rule.

**Impact:** CRITICAL. AGENT_NAVIGATION §3 явно запрещает `<script>` блоки в master файлах. pitfall #1 говорит "inline styles удалялись в FIX-23 + FIX-26" — но visual-system integration вернула их. **`pnpm run validate:master` НЕ в `precommit` hook** (только `pnpm run validate` = `validate-artifact.mjs`), поэтому 10 errors ship silently в каждый commit.

**Root cause:** Visual-system Phase 4 integration (см. `visual-system/PLAN.md` §4.4 Widget Integration) планировала port JS logic to shell widget modules (`ocean-insight.js`, `enneagram-builder.js`, `diagnostic-tree.js`, `blueprint-viewer.js`, `author-note-viewer.js`). Вместо этого inline scripts были скопированы напрямую из `component-extracts/E##-script.js` в master HTML. Phase 4 §4.0 Integration Status (added iter 4) отмечает "Actual content replacement ❌ Not started" — но markers были добавлены, и inline scripts тоже.

**Fix plan (iter 5+):**
1. Architecture decision: либо (a) обновить §3 rule чтобы разрешить visual-system inline scripts (with explicit comment marker `// VS Element EXX - inline script`), либо (b) migrate все 10 inline scripts в `src/shell/widgets/*.js` per Phase 4 §4.4 plan.
2. Для inline `style=` attributes: migrate в `src/shell/styles.css` или `src/assets/vs-styles.css` per pitfall #16.
3. Wire `pnpm run validate:master` в `precommit` hook (сейчас только `pnpm run build && pnpm run validate`).
4. Для 23 "content outside section" warnings: wrap visual-system SVG/HTML в `<section data-section="...">` или переместить внутрь существующих секций.

**Решение defer в iter 5+:** iter 4 не делает правок master HTML / shell / widget JS (per task scope: "docs + wiring only"). iter 5+ должен решить architecture question (a vs b) и выполнить миграцию.

**История KI (все CLOSED):**
- KI#1..KI#6 (iter 1) — закрыты в iter 2.
- KI#7 (iter 2) — закрыт в iter 2.
- KI#8 (iter 2, deferred to iter 3) — закрыт в iter 3 (option a: delete orphan trio).
- KI#9 (iter 3) — закрыт в iter 3.
- KI#10 (iter 4) — закрыт в iter 4: orphan QA scripts `check_english.py` + `check_syntax_mix.py` содержали stale v7 paths (`src/parts-l1/l2/l3/`, removed в v8) + stale "v6" comment. Пофикшено: оба скрипта теперь сканируют только `src/master/` (v8+ canonical).

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
| **Python 3.10+** | Для CI-wired скриптов (`check_duplicates.py`, `validate_terms.py`) и orphan QA tools (`check_english.py`, `check_syntax_mix.py`). |
| **GitHub Pages deploy** | Через GitHub Actions на push в main. Деплой из `dist/`. |
| **Orphan QA scripts wired as `qa:*` (iter 4)** | `csp_check.mjs`, `bundle_check.mjs`, `check_english.py`, `check_syntax_mix.py`, `check-doc-versions.mjs`, `test-interactive.mjs` — wired в `package.json` как `pnpm run qa:csp`, `qa:bundle`, `qa:english`, `qa:english:docs`, `qa:syntax`, `qa:doc-versions`, `qa:interactive`. Aggregate: `pnpm run qa`. НЕ в `precommit` / CI — ручной запуск. `contrast_checker.mjs` wired как `qa:contrast`, но gracefully SKIPs (KI#11 — нет `tokens.json`). |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
