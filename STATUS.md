# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + docs restructure iter 5
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 5 (KI#11 + KI#12 CRITICAL fixes): KI#11 closed, KI#12 partially fixed (10 `<script>` errors → 0).**

iter 5 закрыл 2 ACTIVE Known Issues: KI#11 (`tokens.json` created, `qa:contrast` functional) и KI#12 (10 prohibited `<script>` blocks → extracted to 5 widget JS modules, `validate:master` wired in precommit). Остаток KI#12: 123 inline `style=` + 23 "content outside section" warnings — defer в iter 6.

### Что сделано в iter 5

**KI#11 fix — DONE (closed).** Создан `visual-system/tokens.json` — JSON-экстракт из `DESIGN-TOKENS.css` с `primitives.color.semantic` (8 цветов) + `primitives.color.gray` (5 уровней). `contrast_checker.mjs` работает: `pnpm run qa:contrast` → "All contrast ratios pass". `qa:contrast` добавлен в aggregate `qa` script.

**KI#12 fix — PARTIAL (10 errors → 0, 146 warnings remain).** Architecture decision: **(b) migrate inline scripts → widget JS**. Результат:
- Создан `vs-scroll-observer.js` — единый IntersectionObserver + MutationObserver для всех `.scroll-enter` / `.enneagram-anim` / `.type-node` элементов. Заменяет общий паттерн из всех 17 inline-скриптов.
- Созданы element-specific виджеты: `vs-e10-enneagram.js` (hover/keyboard mini-card), `vs-e13-diagnostic.js` (tree toggle), `vs-e15-blueprint.js` (layer toggle), `vs-e16-author-note.js` (template toggle).
- Удалены все 17 inline `<script type="module">` блоков из 10 master HTML файлов.
- Добавлены 5 новых widget scripts в `src/shell/index.html`.
- `validate:master` wired в `precommit` (build + validate + validate:master).

**`validate:master` результат после фикса:** 0 errors, 146 warnings (123 inline `style=` + 23 content-outside-section).

### Изменённые файлы в iter 5

| File | Action | Reason |
|------|--------|--------|
| `STATUS.md` | Rewritten | iter 5 status + KI#11 closed + KI#12 partial |
| `worklog.md` | Updated | Appended iter 5 record, iter 4 → one-liner |
| `AGENT_NAVIGATION.md` | Updated | Header iter 5, §1 vs-scroll-observer, §6 pitfall #31, §8 OP progress, §10 hint |
| `CHANGELOG.md` | Updated | Added [9.1.5] iter 5 section |
| `PLAN.md` | Updated | §5 iter 5 status + iter 6+ remaining |
| `visual-system/PLAN.md` | Updated | §4.0 updated: scripts ✅ migrated, content replacement ❌ still not started |
| `visual-system/tokens.json` | **Created** | JSON extract from DESIGN-TOKENS.css for contrast_checker.mjs |
| `src/shell/widgets/vs-scroll-observer.js` | **Created** | Global IntersectionObserver + MutationObserver |
| `src/shell/widgets/vs-e10-enneagram.js` | **Created** | E10 enneagram hover/keyboard interaction |
| `src/shell/widgets/vs-e13-diagnostic.js` | **Created** | E13 tree expand/collapse |
| `src/shell/widgets/vs-e15-blueprint.js` | **Created** | E15 annotation layer toggle |
| `src/shell/widgets/vs-e16-author-note.js` | **Created** | E16 template toggle |
| `src/shell/index.html` | Updated | Added 5 new widget script tags |
| `src/master/part_01..10.html` | Updated | Removed 17 inline `<script>` blocks |
| `package.json` | Updated | `qa:contrast` path + aggregate `qa` + `precommit` wired |

---

## Known Issues

**KI#13 (ACTIVE, found in iter 5) — 123 inline `style=` attributes + 23 "content outside section" warnings в master HTML** → defer iter 6+.

`pnpm run validate:master` теперь даёт 0 errors (после миграции `<script>` блоков в iter 5), но 146 warnings:
- **123 inline `style="..."` attributes** — преимущественно visual-system elements: `color:var(--accent-violet)`, `transition-delay:XXXms`, `top:10px; right:20px` (callout positioning), `font-size:10px`, `display:none`, etc.
- **23 "content outside `<section data-section>`" warnings** — visual-system SVG/HTML элементы расположены между `</section>` и следующим `<section>`.

**Impact:** MEDIUM. Не нарушает §3 rule (только `<script>` и `<style>` блоки запрещены, inline `style=` формально не запрещены но pitfall #16 говорит "inline styles → CSS"). AGENT_NAVIGATION §3 не запрещает inline `style=` явно, но pitfall #1 упоминает что они удалялись в FIX-23 + FIX-26.

**Fix plan (iter 6+):**
1. Migrate 123 inline `style=` → CSS classes в `src/shell/styles.css` или `src/assets/vs-styles.css`.
2. Wrap 23 "content outside section" visual-system elements в `<section data-section="...">` или переместить внутрь существующих секций.
3. После фикса: warnings → 0, `validate:master` → чистый PASS.

---

**История KI (все CLOSED):**
- KI#1..KI#6 (iter 1) — закрыты в iter 2.
- KI#7 (iter 2) — закрыт в iter 2.
- KI#8 (iter 2, deferred to iter 3) — закрыт в iter 3.
- KI#9 (iter 3) — закрыт в iter 3.
- KI#10 (iter 4) — закрыт в iter 4.
- KI#11 (iter 4) — **закрыт в iter 5:** `tokens.json` создан, `qa:contrast` работает.
- KI#12 (iter 4) — **частично пофикшен в iter 5:** 10 `<script>` errors → 0 (widget migration). Остаток → KI#13.

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
| **QA scripts wired as `qa:*` (iter 4)** | `qa:csp`, `qa:bundle`, `qa:contrast` (FIXED iter 5), `qa:english`, `qa:syntax`, `qa:doc-versions`, `qa:interactive`. Aggregate: `pnpm run qa`. `validate:master` wired в `precommit` (iter 5). |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
