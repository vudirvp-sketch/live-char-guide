# Live Character Guide — Agent Navigation

> **Entry document.** Read this first. Текущая версия: **9.1.0** + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED/ADDED (iter 18 + iter 38) + KI#13/#18/#20/#21/#22/#23/#32 ✅ CLOSED + iter 34-43 + **iter 44 — KI#33 🔵 PARTIAL (canon→master HTML sync Phase 1: 9/57 fixes applied, contentHash `34c34a7d` first change since iter 34, regression test `scripts/audit_canon_master_sync.py` created)**. Live-char-guide — инженерный пайплайн для RP-карточек персонажей (от SPINE до деплоя, для моделей 12B–32B+). Единый линейный гайд без слоёв: весь контент читается последовательно Part 0 (concept) → Part 1 → Part 10. Актуальный статус — в `STATUS.md`, история итераций — в `worklog.md`, полный план docs-restructure — в `PLAN.md`, **план переработки контента (iter 6+) — в `docs/CONTENT_RESTRUCTURE_PLAN.md`**, **Canon (источник правды для контента, iter 7+) — в `docs/canon/` (см. `_README.md`)**, **аудит канона + fix plan (iter 33+) — в `docs/AUDIT_VERIFICATION.md` (P0+P1+P2+P3 ✅ CLOSED iter 35-38, KI#21 ✅ CLOSED canon; 9/57 master sync iter 44)**, техническая архитектура — в `docs/architecture.md`.

---

## 1. Where Things Are

| Directory | Purpose | Rules |
|-----------|---------|-------|
| `src/master/` | Author content — 10 Parts (`part_01..10.html`) + 3 appendix (`mbti/model_table/glossary`). 98 секций, ~6 600 строк HTML. | **АВТОРЫ редактируют тут.** Все секции в `<section data-section>`. Запрещены `<style>` / `<script>` / `<link>` / `<meta>`. |
| `src/shell/` | Infrastructure shell — `index.html` (auto-load), `styles.css`, `lazy-loader.js`, `event-bus.js`, `widgets/` (15 виджетов). | **НЕ ТРОГАТЬ при написании Parts.** Изменения — через request к infrastructure. |
| `src/shell/widgets/` | 15 виджетов: `ocean-insight`, `enneagram-builder`, `mbti-composer`, `persona-cross`, `persona-synthesis`, `blueprint-viewer`, `diagnostic-tree`, `vs-mini-map`, `author-note-viewer`, `widget-utils`, `vs-scroll-observer`, `vs-e10-enneagram`, `vs-e13-diagnostic`, `vs-e15-blueprint`, `vs-e16-author-note`. | Markup в HTML, data в `data/*.json`, behavior в `lazy-loader.js`. |
| `src/assets/` | Static assets — `favicon.svg`, `preview-card.png`, `vs-styles.css`, `fonts/`. | Читается `build-shell-unified.mjs` (ASSETS_SRC = `src/assets/`). |
| `src/scripts/` | Build-скрипт `build-shell-unified.mjs` (копирует shell + parts + data → `dist/`). | Запускается через `pnpm run build:shell`. |
| `src/VERSION` | Plain text файл с версией (9.1.0). | Синхронизирован с `package.json` + `data/character_schema.json` + build manifest. |
| `data/` | JSON-данные виджетов: `glossary.json`, `ocean.json`, `enneagram.json`, `mbti.json`, `character_schema.json`, `anchor-redirects.json`, `test_scenarios.json`. | Авторы — данные. Инфраструктура — схемы. **Не хардкодить widget data в JS.** |
| `scripts/` | Build + validation скрипты. **package.json-wired (5):** `build-unified.mjs`, `validate-artifact.mjs`, `validate-master.mjs`, `version-sync.mjs` (+ `src/scripts/build-shell-unified.mjs`). **CI-wired (2 Python, не в package.json):** `check_duplicates.py`, `validate_terms.py` — в `.github/workflows/{validate,build-artifact}.yml`. **QA scripts wired в iter 4 (7, ручной запуск через `pnpm run qa:*`):** `csp_check.mjs` (`qa:csp`), `bundle_check.mjs` (`qa:bundle`), `contrast_checker.mjs` (`qa:contrast`, FIXED iter 5 — requires `visual-system/tokens.json`), `check_english.py` (`qa:english` + `qa:english:docs`), `check_syntax_mix.py` (`qa:syntax`), `check-doc-versions.mjs` (`qa:doc-versions`), `test-interactive.mjs` (`qa:interactive`). Aggregate: `pnpm run qa`. `validate:master` wired в `precommit` (iter 5). **Removed in iter 3:** `validate-migration.mjs`, `gen-redirect-map.mjs` (orphan + depended on deleted `docs/migration_map.md`). | `pnpm run <script>` для wired. `pnpm run qa:*` для ad-hoc QA. Python 3.10+ для `*.py`. |
| `tests/` | Node test runner: `test-build.mjs`, `test-validate-artifact.mjs`, `test-version-sync.mjs`, `widget-smoke.mjs`, `visual-parity.mjs`, `tests/integration/test-full-build.mjs`. | `pnpm test` запускает все. |
| `docs/` | Техническая документация (не входит в билд). | Update при структурных изменениях. См. §7. |
| `visual-system/` | Visual system prototype work: `PLAN.md` (v1.4), `DESIGN-TOKENS.css`, `shared/` (fonts/base/patterns/utilities), `elements/` (E01-E17 prototypes), `integration/` (component-extracts + INTEGRATION-MAP). | Isolated-first development strategy. Integration phase — ongoing. |
| `parts/`, `widgets/`, `assets/`, `event-bus.js`, `data/`, `index.html`, `build.hash` | **Root fallbacks** — regenerated на каждом `pnpm run build` из `dist/` (см. `build-shell-unified.mjs` строки 237-293). Committed to git для GitHub Pages backward compat (`.gitignore` строки 22-30: "DO NOT gitignore"). CI/CD деплоит из `dist/`, fallbacks обеспечивают работу без CI/CD. | **НЕ РЕДАКТИРОВАТЬ напрямую.** Все правки — в `src/master/`, `src/shell/`, `src/assets/`, `data/`. После правок — `pnpm run build` регенерирует fallbacks. |
| `build/` | Generated artifacts (gitignored). | Авто-генерация. |
| `dist/` | Deployment output (gitignored). | Авто-генерация → GitHub Pages. |

---

## 2. Build Pipeline

```
src/master/part_*.html (авторский контент)
        │
        ▼
┌─────────────────────────────────────┐
│  scripts/build-unified.mjs          │
│  Парсит HTML → извлекает секции     │
│  → генерирует parts/ (unified)      │
│  → manifest + section-registry      │
└─────────────────────────────────────┘
        │
        ▼
parts/*.html + manifest.json + glossary.html + footer.html
        │
        ▼
┌─────────────────────────────────────┐
│  src/scripts/build-shell-unified.mjs│
│  Копирует shell + parts + data      │
│  → dist/ для GitHub Pages           │
└─────────────────────────────────────┘
        │
        ▼
dist/ (deployed to GitHub Pages)
```

### Команды

```bash
pnpm install              # Установка зависимостей (Node >= 20, pnpm 10.x)
pnpm run build            # Полный билд (unified + shell)
pnpm run build:unified    # Только unified (parts/)
pnpm run build:shell      # Только shell (dist/)
pnpm run build:watch      # Watch-режим (chokidar на src/master/**)
pnpm run validate         # Валидация билда (validate-artifact.mjs)
pnpm run validate:master  # Валидация мастер-файлов (validate-master.mjs)
pnpm run version:check    # Проверка синхронизации версий
pnpm test                 # Все тесты (node --test)
pnpm run test:unit        # Unit-тесты
pnpm run test:integration # Интеграционные тесты
pnpm run dev              # Билд + локальный сервер (port 3000)
pnpm run serve            # Только сервер
pnpm run lint             # ESLint
pnpm run qa               # Aggregate QA (csp + bundle + english + syntax + doc-versions)
pnpm run qa:csp           # CSP compliance check (index.html inline scripts)
pnpm run qa:bundle        # Bundle size budget check
pnpm run qa:contrast      # WCAG contrast check (SKIPs — KI#11, нет tokens.json)
pnpm run qa:english       # English leaks check in src/master/
pnpm run qa:english:docs  # English leaks check in docs/ (WH40k terms)
pnpm run qa:syntax        # Markdown patterns in HTML check
pnpm run qa:doc-versions  # Doc "Last Updated" vs git commit date drift
pnpm run qa:interactive   # Puppeteer smoke tests (requires running server)
```

### 2a. Deployment Pipeline (iter 43+)

> **Ответ на вопрос «Как изменения переходят в основной проект? На сайт?»**

**Полный flow от canon fixes до живого сайта:**

```
[1] AUTHORS EDIT (source of truth)
    ├─ docs/canon/*.md          ← Markdown, semantic content, NOT в build
    └─ src/master/*.html        ← Production HTML, IS в build

         ↓ manual sync (canon → master HTML)
         ↓   workflow: docs/canon/_README.md §4.2
         ↓   validate:master + visual diff per Part

[2] BUILD (pnpm run build)
    │
    ├─ scripts/build-unified.mjs
    │   Парсит src/master/*.html → извлекает <section data-section>
    │   → генерирует parts/*.html (unified) + manifest.json
    │
    └─ src/scripts/build-shell-unified.mjs
        Копирует shell + parts + data + assets → dist/
        Копирует dist/ → root fallbacks (index.html, assets/, widgets/, parts/, data/, event-bus.js, build.hash)
        Вычисляет build hash из: src/master/, src/shell/, src/assets/, data/, parts/ (root fallbacks)
        НЕ включает: docs/canon/, docs/*.md, *.md в root, visual-system/, scripts/

[3] COMMIT + PUSH to main
    │
    └─ Root fallbacks committed to git (NOT gitignored, см. .gitignore строки 22-30)
       Обеспечивают работу сайта даже без CI/CD rebuild

[4] GITHUB ACTIONS (auto-deploy)
    │
    └─ .github/workflows/{validate,build-artifact}.yml
       Builds dist/ и деплоит на GitHub Pages

[5] LIVE SITE
    └─ https://vudirvp-sketch.github.io/live-char-guide/
```

**Что входит в build hash (функционально деплоится):**
- `src/master/*.html` — author content (14 файлов, ~6 600 строк)
- `src/shell/` — infrastructure (index.html, styles.css, lazy-loader.js, event-bus.js, widgets/)
- `src/assets/` — static assets (vs-styles.css, fonts/, favicon.svg, preview-card.png)
- `data/*.json` — widget data (7 файлов)
- `parts/` (root fallbacks) — regenerated from dist/

**Что НЕ входит в build hash (doc-only, НЕ деплоится):**
- `docs/canon/*.md` — canon markdown (source of truth для контента, но в build не используется)
- `docs/*.md` — technical documentation
- `*.md` в root (README.md, STATUS.md, AGENT_NAVIGATION.md, worklog.md, PLAN.md, CHANGELOG.md, ITER*.md)
- `visual-system/` — prototype work + component-extracts/ (historical snapshots, NOT used in build/runtime)
- `scripts/` — build + validation + audit scripts
- `tests/` — test runner

**Критичный invariant (iter 43+):**
- **Hash unchanged ≠ canon fixes deployed.** Build hash `69d9b813` unchanged с iter 34 = master HTML не менялся. Canon audit фиксы iter 35-41 (57 правок KI#21 + KI#25-31) находятся только в `docs/canon/*.md` и НЕ синхронизированы с `src/master/*.html`. **Сайт НЕ отражает canon audit фиксы iter 35-41.** См. KI#33 в `STATUS.md`.
- При canon fixes, требующих sync в master HTML — применяется workflow `docs/canon/_README.md` §4.2 (manual sync per Part + `validate:master` + visual diff). Metadata fixes (YAML front-matter, callout labels) — skip, они canon-only.

**Команды для деплоя:**

```bash
# Локально — полный цикл правки + деплой:
pnpm run build              # Пересобрать dist/ + root fallbacks
pnpm run validate           # Валидация билда
pnpm run validate:master    # Валидация мастер-файлов
pnpm test                   # Все тесты
git add -A                  # Включая regenerated root fallbacks
git commit -m "iter N: <description>"
git push origin main        # Триггер GitHub Actions → GitHub Pages

# Онлайн через ~30-60 сек:
# https://vudirvp-sketch.github.io/live-char-guide/
```

---

## 3. Section Model

### Unified Single-Pass Architecture (v8+)

Весь контент — в одном линейном проходе Part 1 → Part 10. Нет слоёв, тиров, уровней глубины. Каждая секция видна каждому читателю.

```
Part 1 (Foundations) → Part 2 (Anchors) → Part 3 (Voice) → Part 4 (SPINE) →
Part 5 (Psychology) → Part 6 (CoT) → Part 7A/7B (Technical) →
Part 8 (Anti-patterns) → Part 9 (Diagnostics) → Part 10 (Examples)
```

### Section Markup в Master HTML

```html
<section data-section="p2_basic_anchors" data-toc-nav>
  <h2>Заголовок секции</h2>
  <!-- Контент виден всем читателям -->
</section>
```

| Атрибут | Обязателен | Формат | Пример |
|---------|------------|--------|--------|
| `data-section` | Да | `p{N}_{topic}` | `data-section="p4_spine_overview"` |
| `data-toc-nav` | Нет | boolean | `data-toc-nav` |

### Naming Convention

Pattern: `p{part_number}_{topic}` (например `p1_card_overview`, `p7a_core_directives`, `p8_ap15_ocean_overload`).

**Rule:** Каждый `data-section` ID должен быть уникален **во всём master guide**, не только внутри Part.

### Запрещено в мастер-файлах

- `<style>` блоки → все стили в `src/shell/styles.css`.
- `<script>` блоки → все скрипты в `src/shell/lazy-loader.js`.
- `<link>` элементы.
- `<meta>` элементы.
- Контент вне `<section data-section>`.
- `data-layer` атрибуты (удалены в v8).
- `data-layer-switch` атрибуты (удалены в v8).
- `class="layer-remark"` (удалены в v8).
- Markdown patterns в HTML (используй HTML-теги).

---

## 4. Widget Architecture

### Markup в HTML, Data в JSON, Behavior в JS

1. **SVG/HTML markup** остаётся в master HTML (`src/master/part_*.html`).
2. **Text data** живёт в `data/*.json` файлах.
3. **Behavior** в `src/shell/lazy-loader.js` + `src/shell/widgets/*.js`.

### Widget Data Files

| File | Purpose |
|------|---------|
| `data/ocean.json` | OCEAN pentagon: 5 trait descriptions, pole guidelines, anchor examples |
| `data/enneagram.json` | Enneagram: 9 types with core fear, desire, lie, flaw, wings, OCEAN correlation |
| `data/mbti.json` | MBTI: 16 types with temperament, hint, cognitive functions |
| `data/glossary.json` | Term definitions with cross-references |
| `data/character_schema.json` | JSON Schema for character cards |
| `data/anchor-redirects.json` | Redirects for renamed/deleted section IDs |
| `data/test_scenarios.json` | Test scenario definitions |

### Widget Lifecycle

Виджеты активируются, когда пользователь скроллит к соответствующему Part. Все виджеты всегда видны — нет layer gating. `lazy-loader.js` инициализирует интерактивные элементы на page load. Панели (TOC, Glossary, Notepad) переживают навигацию — они вне `#content`.

---

## 5. Core Rules

### 3 ключевых принципа

| # | Принцип | Почему важно |
|---|---------|--------------|
| 1 | **Якорь = Trigger → Action → Price** — поведение задаётся якорями | Каждый якорь обязан иметь Цена — без неё модель не показывает уязвимость |
| 2 | **Голос — только в Examples и Greeting** | Модель считывает характер из примеров диалога, а не из описания |
| 3 | **Психология — только в Description** | SPINE, OCEAN и другие элементы размещаются исключительно в блоке Description |

### SPINE Framework

5 элементов в причинно-следственной цепочке: `GHOST → LIE → FLAW → NEED → WANT`.

| Элемент | Описание |
|---------|----------|
| **GHOST** | Событие прошлого, сформировавшее LIE и FLAW |
| **LIE** | Ложная установка о себе/мире, возникшая из GHOST |
| **FLAW** | Поведенческий дефект, блокирующий NEED (возникает из LIE) |
| **NEED** | Истинная потребность (часто противоречит WANT) |
| **WANT** | Осознанное желание персонажа (маскирует NEED) |

Для простых персонажей GHOST и LIE могут быть неявными — цепочка работает и без них.

### CORE DIRECTIVES (7 шт, в System Prompt)

| # | Directive | Model Note |
|---|-----------|------------|
| 1 | SHOW NEVER TELL | All models |
| 2 | EMBODIMENT FIRST | All models |
| 3 | SPATIAL & ANATOMICAL LOCK | All models |
| 4 | ENVIRONMENTAL REACTIVITY | All models |
| 5 | INFLUENCE BOUNDARY | All models |
| 6 | CONSEQUENCE DRIVEN | ≥32B and API; 12B limited |
| 7 | PRE-GENERATION FILTER | ≥32B or API; 12B often ignores |

**Directive Language Rule:** Все directives в CORE_DIRECTIVES блоке пишутся на **English**. Guide prose — на **Russian**.

**Bracket Format:** Примеры карточек используют `[SYSTEM]/[DESCRIPTION]/[EXAMPLES]/[ANCHORS]`. XML-теги (`<spine>`, `<ghost_layers>`) — внутри Description для структурной разметки, но внешние блочные delimited — brackets.

### Version Control

Версия синхронизируется в 4 местах:
1. `package.json` — поле `version`.
2. `src/VERSION` — plain text.
3. `data/character_schema.json` — поле `version`.
4. Build output (`build/build-manifest.json`, `parts/manifest.json`).

Формат: `MAJOR.MINOR.PATCH` (semver). MAJOR — архитектурные изменения, MINOR — новые фичи/секции, PATCH — багфиксы.

---

## 6. Frequent Pitfalls

> Read before touching master HTML / shell / build scripts. Пункты 1-18 — из iter 1-2. Пункты 19-30 — добавлены в iter 3 из FIX-04..31 commit messages.

### Базовые (iter 1-2)

1. **`<style>` / `<script>` в мастер-файлах** — все стили в `src/shell/styles.css`, скрипты в `src/shell/lazy-loader.js`. Inline styles удалялись в FIX-23 + FIX-26 (см. git log `47b6f16`, `3058f02`).
2. **`data-layer` / `data-layer-switch` атрибуты** — удалены в v8. Проверяй их отсутствие на `<body>` вручную (`validate-migration.mjs` удалён в iter 3 — KI#8).
3. **Дублирование концепций между Parts** — каждый концепт имеет ОДНО canonical location. Cross-refs — 1 предложение + link. См. `docs/content_map.md` для canonical mapping.
4. **Forward references** — заменены на inline 1-sentence определения. Backward refs — 1 предложение + link.
5. **Английские термины в Russian prose** — 3+ слова English вне allowed contexts триггерят `check_english.py`. Allowed: SP, Description, Examples, Greeting, Lorebook, SPINE, GHOST, OCEAN, Enneagram, LIE, FLAW, NEED, WANT, T→A→P, CoT, Embodiment, CORE DIRECTIVES, Temperature, Top P, Min P, RepPen, Top K, PP, 12B, 32B, API, Part N, AP-N.
6. **CSS class creation без approval** — авторы используют только компоненты из `docs/components.md`. Новые классы — через infrastructure approval.
7. **Hardcoded widget data в JS** — все данные в `data/*.json`. JS только читает.
8. **Контент вне `<section data-section>`** — весь контент в master HTML должен быть внутри section с `data-section` атрибутом.
9. **Mermaid diagrams** — рендерятся через CDN `cdn.jsdelivr.net`. CSP `style-src` / `font-src` должен включать этот домен (FIX-25, см. git log `7a052da`).
10. **`executeInlineScripts` regex** — broader regex для inline script detection (FIX-26). Не сужать regex обратно — пропустит невалидные скрипты.
11. **`blueprint-viewer` destroy()** — виджет должен корректно уничтожаться при unmount (FIX-22). Не удалять `destroy()` метод.
12. **`persona-cross` infinite loop** — guard на рекурсивные вызовы (FIX-02, см. git log `0816ff1`). Не убирать guard.
13. **Clipboard API guard** — `navigator.clipboard` может быть undefined в insecure context (FIX-03). Всегда проверять `if (navigator.clipboard)`.
14. **Heading hierarchy** — `<h1>` один на страницу, `<h2>` для секций, `<h3>` для подсекций. Не прыгать через уровни (FIX-20..31, см. git log `17413f2`).
15. **`noscript` в build artifact** — должен присутствовать (FIX-30). Не удалять.
16. **Inline styles → CSS migration** — при добавлении нового визуального элемента сначала вынести стили в `src/shell/styles.css` или `assets/vs-styles.css`, потом уже в HTML.
17. **Версии в 4 местах** — `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest. `pnpm run version:check` проверяет sync.
18. **Root fallbacks vs canonical sources** — top-level `widgets/`, `assets/`, `parts/`, `event-bus.js`, `data/`, `index.html`, `build.hash` это **regenerated root fallbacks** (см. `build-shell-unified.mjs` строки 237-293), НЕ дубликаты. Canonical sources: `src/shell/widgets/`, `src/assets/`, `src/master/` → `build/parts/`, `src/shell/event-bus.js`, `data/`, `src/shell/index.html`. **Все правки — в canonical sources.** После `pnpm run build` fallbacks регенерируются. В iter 2 закрыт `src/shell/assets/` (был stale duplicate, не читался build script).

### Расширение из FIX-N коммитов (iter 3)

19. **Dual assembly pipeline consolidation (FIX-04)** — ранее было 2 параллельных pipeline (build-unified.mjs + альтернативный). Консолидировано в один `build-unified.mjs`. Не реанимировать второй pipeline.
20. **Token budget misplacement (FIX-05)** — Token Budget должен быть в Part 7A (`p7a_token_budget`), НЕ в Part 1. В Part 1 — только `p1_token_budget_ref` (forward reference, 2 предложения).
21. **CORE DIRECTIVES numbering conflict (FIX-06)** — 7 directives, нумерация 1-7. Не дублировать нумерацию в glossary. См. §5 этого файла для canonical numbering.
22. **Content duplication 25-30% (FIX-07)** — между Parts было 25-30% дублированного контента. Канонические локации зафиксированы в `docs/content_map.md`. Перед добавлением нового контента — проверить content_map.
23. **Dead SPINE-validator removal (FIX-09)** — standalone SPINE-validator скрипт удалён. Валидация SPINE — только через `validate-artifact.mjs` + `validate-master.mjs`.
24. **SVG CSS variables fix (FIX-10)** — SVG-элементы должны использовать CSS variables (`var(--accent-cyan)` и т.д.), НЕ hardcoded `rgba(...)`. Hardcoded colors ломают theme switch.
25. **WCAG contrast / hardcoded rgba → CSS variables (FIX-11..19)** — `--text-muted: #535c6e` на `--bg-deep: #08090d` = 3.1:1 (fails WCAG AA для normal text). Использовать только для decorative/non-essential labels. Все цвета — через CSS variables.
26. **Responsive breakpoints / aria-label quotes / E07 invisible bars (FIX-11..19)** — `aria-label` значения требуют двойных кавычек (single quotes ломают HTML parsing). E07 voice hierarchy bars — проверять `min-height` (иначе invisible на 0 value). Responsive — 768px и 1200px+ breakpoints.
27. **Mermaid CDN dependency (дополнение к #9, FIX-25 + FIX-26)** — Mermaid.js грузится с `cdn.jsdelivr.net`. Если CDN недоступен — diagram не рендерится, но остальной контент работает. Не заменять CDN на локальный bundle без одобрения (CSP implications).
28. **Code quality pass (FIX-27)** — ESLint проходит без errors. `pnpm run lint` проверяет `src/`. Не коммитить с lint errors.
29. **Final a11y pass (FIX-31)** — `pnpm run test:a11y` (axe, WCAG 2a/2aa). Не коммитить с a11y violations.
30. **Orphan scripts audit (meta-pitfall, iter 3 finding)** — перед добавлением нового скрипта в `scripts/`: (a) определить, wired он в `package.json` или CI workflows; (b) если orphan — задокументировать в `AGENT_NAVIGATION.md` §1 как `[orphan QA tool]`; (c) если зависит от другого файла (как `validate-migration.mjs` от `migration_map.md`) — обеспечить fallback или удалить связку. В iter 3 удалены: `validate-migration.mjs` + `gen-redirect-map.mjs` + `migration_map.md` (KI#8).
31. **Inline scripts в master HTML (KI#12, fixed iter 5)** — visual-system integration добавила 17 inline `<script type="module">` блоков в master HTML, нарушая §3 rule. Fix: migrate в `src/shell/widgets/vs-*.js` (5 файлов: scroll-observer + 4 element-specific). `vs-scroll-observer.js` использует MutationObserver для lazy-loaded content. **Правило:** все JS для visual-system elements → `src/shell/widgets/vs-eXX-*.js`, НЕ inline в master HTML.
32. **Content duplication VS-EMBED ↔ текст (KI#14, found iter 6, CLOSED iter 16)** — было 31 визуализация параллельно с текстом (17 VS-EMBED + 12 устаревших infographic + 2 mermaid). Part 4 мигрирован в iter 8 (4 dup viz удалены + 1 orphan paragraph) + валидирован в iter 9. Part 7A мигрирован в iter 11. Part 8 мигрирован в iter 12. Part 9 мигрирован в iter 13. Part 1+2+3 мигрированы в iter 14. Part 5+6+7B+10 мигрированы в iter 16. **Все 10 Parts ✅ MIGRATED — Canon migration complete (iter 16).** iter 18 audit: 0 mermaid в master HTML (все удалены в iter 8/14), 3 infographic retained (2 part_04 + 1 part_07b) + 1 part_05 static SVG fallback — все unique visualizations, deletions не требуются. См. `docs/CONTENT_RESTRUCTURE_PLAN.md`, `docs/canon/_README.md` §5. **Правило (iter 8+):** визуализация = **замещение**, не **дополнение**. Если VS-EMBED показывает концепцию — текст не должен её пере-объяснять. **При выборе «удалить текст или визуализацию» — viz сохраняется, dry-дублирующий текст удаляется (iter 8 principle).** Unique визуализации не удаляются даже если Canon рекомендует.
33. **`docs/anchor-redirects.json` stale duplicate (KI#15, found iter 6 validation, CLOSED iter 7)** — два файла `anchor-redirects.json` были в репозитории: `data/` (runtime, актуальный v8→v9.1) и `docs/` (документация, stale v8→v9). MD5 различались. `data/` загружается `lazy-loader.js` (runtime), `docs/` — был только референс для авторов, но не обновлялся с v9.1 restructure. **Fix (iter 7, DONE):** удалён `docs/anchor-redirects.json`, остался только `data/` как single source of truth. AGENT_NAVIGATION §7 строка убрана. См. CONTENT_RESTRUCTURE_PLAN §9.3.1 (FIXED iter 7 note).
34. **`qa:csp` FAIL: 2 inline scripts в `src/shell/index.html` (KI#16, found iter 9, CLOSED iter 19)** — `pnpm run qa:csp` падало: `index.html has 2 inline script(s)`. Pre-existing с iter 5 (commit 60d7abd): line 24 (`document.documentElement.classList.add('js')` — essential js flag) + lines 108-126 (`mermaid.initialize({...})` — Mermaid.js init с theme/colors config). Build pipeline (`build-shell-unified.mjs`) регенерирует `index.html` (root fallback) из `src/shell/index.html` на каждом `pnpm run build`. iter 8 worklog заявлял "qa без новых critical" но не упоминал qa:csp — был silent failing. Не блокировало Canon миграцию (CSP не enforced на GitHub Pages), но нарушало §6 pitfall #1 (no inline scripts). **Fix (iter 19, DONE):** (a) `mermaid.initialize({...})` → `src/shell/widgets/mermaid-init.js` (external, sync после mermaid CDN, sets `mermaid._initialized = true` для skip redundant init в `lazy-loader.js` line 689); (b) `document.documentElement.classList.add('js')` → `src/shell/widgets/js-flag.js` (external, sync в `<head>` для FOUC prevention). `qa:csp` PASS (0 inline scripts). Build hash `df283246` → `fd3d96d3`. **Правило:** все JS в `index.html` — `<script src="...">` (external). Inline scripts forbidden, даже если CSP `script-src 'unsafe-inline'` allows them — `qa:csp` stricter than actual CSP.
35. **Documentation drift: VS-EMBED list Part 7A (KI#17, found iter 10, CLOSED iter 20)** — AGENT_NAVIGATION.md §10 hint + worklog.md iter 9 record указывали 4 VS-EMBED в `src/master/part_07a.html` как «E07, E08, E16, E17». Фактически в файле — **E08, E16, E17, E02** (E02 = Assembly Pipeline, line 916; E07 = Voice Hierarchy — embedded в Part 3, в Part 7A только cross-referenced внутри E16 на lines 310+358 через badge «Влияние на голос: E07 (~2–5%)»). **Fixed in iter 10:** AGENT_NAVIGATION.md §10 hint + worklog.md iter 9 one-liner обновлены; Canon `part_07a.md` front-matter явно перечисляет embedded (E08/E16/E17/E02) vs cross-ref-only (E07). LOW severity — не влияет на build/runtime. **Closed iter 20** (LOW, already fixed). **Правило:** при ссылке на VS-EMBED list в конкретном master HTML — всегда grep `<!-- VS-EMBED:` в файле, не полагаться на hint'ы из документации.
36. **Inline styles → CSS classes (KI#13, found iter 5, ✅ CLOSED iter 24)** — было 123 inline `style=` в master HTML. iter 20 fixed Part 1+2 (57 inline styles → 28 CSS classes с `vs-ki13-*` prefix в vs-styles.css SECTION 6). iter 21 fixed Part 3+4 (23 inline styles → 18 новых селекторов: `vs-ki13-inset-text`, `vs-ki13-spine-chain-*`, `vs-ki13-ring-delay-*`, `vs-ki13-ring-title--*`). iter 22 fixed Part 5+6 (6 inline styles → 5 новых селекторов: `vs-ki13-context-limits-note`, `vs-ki13-cot-panel/heading/text/strong`). iter 23 fixed Part 7A (19 inline styles → 9 новых селекторов с `vs-ki13-p7a-*` sub-namespace, semantic grouping: 4 color overrides + 3 badge sizing/spacing + 1 template-hidden state + 1 border-cyan; JS toggle compatibility verified для `.vs-ki13-p7a-template-hidden` — vs-e16-author-note.js использует inline `element.style.display` assignment, которое overrides class). iter 24 fixed Part 9+10 (18 inline styles → 19 новых селекторов: 6 `vs-ki13-p9-*` для E14 Quality Scale + 13 `vs-ki13-p10-*` для E15 Annotated Blueprint — 1 shared `.vs-ki13-p10-callout-pos` base + 11 per-instance top modifiers + 1 card-block-accent; DRY pattern eliminating `right:20px` duplication). Total: **123/123 fixed (100%) — все master HTML 0 inline styles.** SECTION 6 vs-styles.css total: 60 селекторов. **KI#13 ✅ CLOSED iter 24.** **Правило:** при добавлении нового визуального элемента — сначала вынести стили в CSS классы, потом уже в HTML. Inline styles forbidden (same rule как pitfall #1 для scripts).
37. **Deployed Guide Duplication Audit (KI#18, found iter 26, ✅ CLOSED iter 31 — DGA COMPLETE: 9/9 resolved: 7 fixed A+B+C+D+E+I+F, 2 keep-by-design G+H)** — полный аудит 14 master HTML файлов выявил 8 duplication/inconsistency кейсов между VS-EMBED viz и adjacent text. Принцип: `viz > dry text` (iter 8+) — текст не должен пере-объяснять то, что уже показано в VS-EMBED. Sub-items: **A** (Part 9 Quality Scale) ✅ FIXED iter 26 — убран дублирующий столбец «Признаки» (повторял E14 zone criteria), добавлен недостающий tier «Отличный», исправлена naming inconsistency «Плохой» → «Слабый» (соответствие E14 viz). **B** (Part 1 p1_card_overview table «Функция» col duplicates E01) ✅ FIXED iter 28 — drop col, add intro p linking to E01. **C** (Part 2 p2_basic_anchors table «Описание» col duplicates E03) ✅ FIXED iter 28 — drop col, expand intro p linking to E03. **D** (Part 4 p4_spine_overview intro «фреймворк из 5 элементов» partial re-explanation of E05 viz hexagons) ✅ FIXED iter 30 — trimmed «фреймворк из 5 элементов» → «SPINE связывает прошлое персонажа с его поведением (структура показана в VS-EMBED E05 выше)»; panel «Причинно-следственная цепь» внутри VS-EMBED оставлена (canonical E05 source, добавляет русские переводы + causality verbs + dynamics insight). **E** (Part 5 p5_elena_profile OCEAN: viz «1 экстремум» vs text «3 экстремальных полюса» — semantic bug, rule definition unclear) ✅ FIXED iter 30 — aligned к strict rule (<30 или >70, most prevalent across codebase); L272+L273 «Экстремальный полюс» → «Cautious zone (30–40 / 60–70)»; L279 «3 экстремальных полюса» → «1 экстремальный полюс (O=72 > 70) + 2 cautious zone values (A=38, N=68)». **F** (Part 6 p6_cot_tiers table «Формат» col duplicate of E11 stair-step__name) ✅ FIXED iter 29 (partial — drop «Формат» col; «Для моделей» + «Пример» cols DEFERRED for accessibility, Russian translations). **G** (Part 8 per-AP sections repeat E12 cards structure — catalog vs detail) ✅ CLOSED iter 31 (keep-by-design — rationale documented в `docs/canon/part_08.md`: 7-dimension comparison table Purpose/Symptom/Cause/Fix/Examples/Callouts/Reader intent; viz = quick scan 15 APs на one screen с severity dots, per-AP sections = deep-dive with concrete thresholds + multi-step solutions + cross-ref links + diff examples + RULE callouts; different reader intents, не pure re-explanation). **H** (Part 10 E15 callouts token budgets duplicate E01 — intentional annotation) ✅ CLOSED iter 31 (keep-by-design — rationale documented в `docs/canon/part_10.md`: 6-dimension comparison table Purpose/Visualization/Annotation layers/Token budget display/Reader intent/Position in flow; E01 = pure block anatomy vertical card-stack, E15 = central card template с 4 ANNOTATION LAYERS structure/anchors/spine/directives — different visualization patterns; E15 callouts ≠ pure budget tables — annotation labels combining budget range с annotation context). **I** (Part 2 p2_embodiment table «Описание» col duplicates E04 depth-label — same pattern as C) ✅ FIXED iter 29 — drop col, expand intro p linking to E04. **Правило:** при аудите deployed guide — искать дублирование semantic/functional load между VS-EMBED и adjacent text; принцип `viz > dry text` — viz = замещение, не дополнение. Unique контент сохраняется даже при дублировании. См. `STATUS.md` §«Known Issues» KI#18.

38. **Chinese chars in master HTML (KI#19, found + fixed iter 30 — incidental)** — `src/master/part_05.html` L269 содержал «следует за**线索**ми» (вместо «за зацепками»). Chinese «线索» = «clue» — копипаст из Chinese-language tool/prompt. Fix iter 30: replaced per canon L56. Регрессионная проверка: `rg "[\\u4e00-\\u9fff]" src/master/`.

39. **Visual System Scroll-Animation Bug (KI#20, found + fixed iter 32)** — 5 из 18 VS-EMBED элементов (E06/E07/E08/E09/E15) отображались поломанно на собранном сайте: SVG-кольца GHOST, столбцы Voice Hierarchy, ноды Core Directives, OCEAN pentagon + профиль, annotation callouts Annotated Blueprint — были невидимы или частично видны. **Root cause:** CSS правила для animation classes (`.ring-anim`, `.bar-rect`, `.anim-group`, `.pentagon-anim`, `.callout` и др.) задают initial state `opacity:0` / `transform:scale(0)`, transition к visible state требует `.is-visible` class на том же элементе. Local `IntersectionObserver` в standalone element HTML файлах наблюдал эти классы напрямую, но при embedding в master HTML inline scripts вырезались (KI#16, CSP compliance, iter 19). Замена `vs-scroll-observer.js` наблюдала только `.scroll-enter, .enneagram-anim, .type-node` — не покрывая остальные animation classes. **Fix (iter 32, DONE):** single-file edit — расширение `SCROLL_ENTER_SELECTOR` в `src/shell/widgets/vs-scroll-observer.js` (+ root fallback `widgets/vs-scroll-observer.js` регенерируется build'ом). Добавлены: `.ring-anim, .ring-text-anim` (E06), `.bar-rect` (E07), `.anim-group, .center-pulse` (E08), `.pentagon-anim, .profile-anim` (E09), `.callout` (E15). 43 animation elements на 5 VS-EMBED теперь корректно наблюдаются. Build hash `fd3d96d3` unchanged (только JS widget edit, не master HTML). Audit script: `scripts/audit_vs_embeds.py` — проверяет, что все animation classes в `src/assets/vs-styles.css` покрыты либо JS observer selector'ом, либо `scroll-enter` class на каждом элементе. **Правило:** при добавлении нового VS-EMBED с animation classes — (a) либо добавить `scroll-enter` class на каждый animation element, (b) либо расширить `SCROLL_ENTER_SELECTOR` в `vs-scroll-observer.js`. После изменения — запустить `python3 scripts/audit_vs_embeds.py` для проверки regression. Interactive-only classes (показываются на hover/focus, не scroll) — добавить в `interactive_only_classes` set в audit script.

40. **Content Audit contradictions (KI#21, found iter 33, ✅ CLOSED iter 35-38)** — полный аудит канона `docs/canon/` (14 файлов, ~5 000 строк) выявил ~50 противоречий/проблем (A1-G5, ~50 пунктов + 3 NEW). **Fix plan (iter 35-38) — ✅ ALL CLOSED:** P0 (16 правок ✅ iter 35) → P1 (11 правок ✅ iter 36) → P2 (18 правок + ~1130 строк удалений ✅ iter 37) → P3 (10 правок + 2 SKIP + 2 новых файла ✅ iter 38). Полный план — `docs/AUDIT_VERIFICATION.md` §4. **iter 35 (P0) ✅ CLOSED:** 16 правок в 7 canon-файлах — A1 (глоссарий T→A→P «Pattern»→«Price»), A2 (Елена OCEAN 3→1 + cautious zone), A3 (Счётчик вырезаний 2→3 уровня в 4 местах), A4 (NEED Выщербленного синхронизирован), D2-partial (variant row удалена), A6 (AP-15 deferred Price→immediate), A9 (resume 3-level→4-zone), A10 (Quick Check rename), B1 (Омнис GHOST+FLAW rewrite как конкретные события/поведение, не прилагательные), NEW-1 («待» удалён, cross-refs заполнены 12 пунктами), NEW-3 (§5.1 RULE обновлён с контекстными лимитами). **iter 36 (P1) ✅ CLOSED:** 11 правок в 6 canon-файлах — A5 (AP-9 ❌ пример: критерий broken SPINE уточнён, снято противоречие с §4.1 о неявных GHOST/LIE), A7 (AN секция «Счётчик вырезаний» добавлен в таблицу), A8 (§8.1 orphan OCEAN Overload row удалён + footnote обновлён), B2 (Уолтер GHOST ярлык «Унижение»→конкретное наблюдение), B5 (3 Anchor type definitions: Psychological/At-rest/Growth), B6 (Tier 0 «12B»→«12B+» sync с E11 viz), D1 (Elena secondary GHOST+LIE rows удалены, note заменена на «один canonical GHOST»), D2 (Выщербленный variant LIE row удалён — dead code), D4+NEW-2 (Lorebook walkthrough Елены L667 пожар→предательство), D4 (part_07b §7B.3 Пример 1 пожар→предательство + secondary GHOST note + renumber). **iter 37 (P2) ✅ CLOSED:** 18 правок во всех 14 canon-файлах — P2-1 (inline defs Anchor/Voice/SPINE/OCEAN в part_01 §1.4), P2-2 (callout policy в _README.md §3.9), P2-3 (Bridge cleanup: оставлены 2 из 10), P2-4 (YAML front-matter конверсия во всех 13 файлах), P2-5 (delete Migration Notes / Compression results / Validation gates / DGA Phase 2 во всех 14 файлах), P2-6 (delete Cross-references ending), P2-7 (delete resume + add Synthesis в 4 Parts), P2-8 (orphan §1.3 в part_01 слит с §1.4), P2-9 (Pattern Matcher dedup: ссылки на Part 1 §1.4 в part_07a), P2-10 (клише «деликатно» удалено вместе с Migration Notes), P2-11 (22 stub «Canon planned iter X» удалено), P2-12 (Tier 1/2/3 → Quality Grade A/B/C в part_03 §3.4), P2-13 (F4 «Запрещённые слова» → «Запрещённые формулировки» в part_04 §4.2), P2-14 (F5 Cautious zone определение в part_05 §5.1), P2-15 (F6 `<br/>` → em-dash в part_07a L305), P2-16 (F7 Keirsey SP уточнено в part_07a §7A.1), P2-17 (F9 1-словные симптомы для AP-ссылок в part_09 §9.6 Decision Tree), P2-18 (F10 inline-комментарии Елены вынесены в Annotation callout в part_10 §10.1). Canon total: 5 035 → 3 905 строк (−1 130). **iter 38 (P3) ✅ CLOSED:** 10 правок + 2 SKIP + 2 новых файла — P3-1 (D3 Примечание перед обоими Greeting Елены в part_07b §7B.2 + part_10 §10.1), P3-2 (D5 Demonstrates callout перед TEMPLATE каждой из 4 карточек в part_10 §10.1-§10.4), P3-3 (D6 контекст Йоуёмы в part_03 §3.8), P3-4 (D7 cross-refs на Уолтера в part_01 §1.4 + part_04 §4.11 + part_09 §9.7), P3-5 (F2 4-я колонка «Пример (конкретный)» в part_02 §2.2 Price table), P3-6 (F3 Методология сноска к % таблице в part_03 §3.1), P3-7 (F8 SKIP — covered by P0-2), P3-8 (G1 новый файл part_00.md §0.1 «Как читать этот гайд»), P3-9 (G2 part_00.md §0.2 «TL;DR / Quick Start»), P3-10 (G3 SKIP — covered by P2-1), P3-11 (G4 новый файл appendix_character_map.md — карта 5 персонажей), P3-12 (G5 part_01 §1.8 «Pre-build checklist»). Canon total: 3 905 → 4 070 строк (+165 net). Build hash `69d9b813` unchanged. Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `check_english.py --scan-docs` 0 WH40k English terms in docs/. **Правило (iter 33+):** при обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, и т.д.) с пометкой P0-P3. **B3 — НЕ пытаться «укоротить Examples Омнис-Зета»** (KI#21-B3 INVALID, аудит переоценил, examples в пределах лимита 120 токенов).

41. **Callout CSS Scoping Bug (KI#22, found + fixed iter 34)** — все 56 документационных callouts (`.callout rule`, `.callout rec`, `.callout ex`) в 12 master HTML файлах отображались поломанно: наезжали на соседний контент (`position:absolute`), имели крошечный шрифт (11px), были невидимы (`opacity:0`) до добавления `.is-visible` класс от scroll observer. **Root cause:** `.callout` selector определён ДВАЖДЫ глобально — `src/shell/styles.css` line 419 (документационная taxonomy RULE/REC/EX, видимы по умолчанию, `padding:1em 1.2em; margin:1.2em 0; border-left:3px solid`) И line 6278 (внутри `=== E15 ELEMENT STYLES ===` section lines 6164-6339, но БЕЗ scope — `position:absolute; max-width:200px; font-size:11px; opacity:0; pointer-events:none`). Та же двойная дефиниция в `src/assets/vs-styles.css` line 2873 (внутри `--- E15 — Annotated Blueprint ---` section, без scope). E15 definition (позже в файле) OVERRIDES документационную — все `.callout` элементы получают E15 styles. **Aggravated by iter 32 KI#20 fix:** `vs-scroll-observer.js` `SCROLL_ENTER_SELECTOR` includes `.callout` для E15 annotation labels — добавлял `.is-visible` ко ВСЕМ callouts (включая документационные), делая их `opacity:1` (видимыми), но они оставались `absolute-positioned` (наезжали на контент). **Fix (iter 34, DONE):** scope E15 `.callout*` selectors к `.blueprint-area .callout*` в обоих CSS файлах — 7 selectors per file (`.callout`, `.callout.is-visible`, `.callout--structure/anchors/spine/directives`, `.callout-line`) = 14 selectors total. 56 документационных callouts теперь используют ТОЛЬКО line 419 definition (видимы по умолчанию, proper padding/border). 11 E15 annotation callouts (в `src/master/part_10.html` lines 34-119 внутри `<div class="blueprint-area scroll-enter">`) продолжают работать как абсолютно позиционированные annotation labels. `vs-scroll-observer.js` НЕ менялся — `.callout` в selector остаётся, harmless для документационных callouts (добавление `.is-visible` класса не имеет visual effect после CSS scope fix — documentation callouts не имеют `opacity:0` initial state). `audit_vs_embeds.py` regex `\.CLASS\.is-visible` всё ещё матчит `callout` после scope change — 0 regressions. Build hash `fd3d96d3` unchanged (CSS файлы не входят в hash computation — только `src/shell/index.html`). **Правило:** при добавлении новых VS-EMBED elements — scope их CSS selectors к element-specific parent (например, `.blueprint-area`, `.funnel-stack`, `.spine-flow`), НЕ использовать generic class names глобально. Если class name collision неизбежен — scope к parent, не rename (semantic role может быть разная).

42. **CSP worker-src missing (KI#23, found + fixed iter 34)** — console error в браузере: `Creating a worker from 'blob:...' violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline' cdn.jsdelivr.net". Note that 'worker-src' was not explicitly set, so 'script-src' is used as a fallback. The action has been blocked.` Mermaid v11 (loaded from `cdn.jsdelivr.net/npm/mermaid@11`) internally создаёт Web Worker из blob URL для parsing — блокировалось CSP. Mermaid деградировала в single-threaded mode (parsing на main thread, медленнее для complex diagrams), но НЕ ломалась. **Root cause:** CSP meta в `src/shell/index.html` не имела `worker-src` directive → fallback к `script-src`, который не содержал `blob:`. **Fix (iter 34, DONE):** добавлен `worker-src 'self' blob:;` к CSP meta в `src/shell/index.html` line 22. `blob:` позволяет только worker creation (не arbitrary script execution) — безопасно. Same-origin fallback сохранён (`'self'`). `qa:csp` PASS (csp_check.mjs проверяет только inline scripts и eval, не CSP meta content). Build hash **ИЗМЕНИЛСЯ** с `fd3d96d3` → `69d9b813` (hash computed из `src/shell/index.html`). **Правило:** при добавлении CDN library, которая может использовать Web Workers (Mermaid, pdf.js, etc.) — явно указать `worker-src 'self' blob:;` в CSP, не полагаться на fallback к `script-src`. `blob:` для worker-src безопасен (workers same-origin по умолчанию, не могут import external scripts без `importScripts` which is also CSP-controlled).

43. **Doc drift: bible vs canon (KI#25/#26/#27, found + fixed iter 39)** — при анализе исходников Йоуёмы/Выщербленного (предоставлены пользователем) и сверки с каноном `docs/canon/` обнаружено 3 doc drift бага в doc-файлах (bible + README), которые не были выявлены аудитом KI#21 (т.к. аудит охватывал только `docs/canon/`, не `docs/*.md` bible и root `README.md`). **Симптомы:** (1) `docs/elena_character_bible.md` L78-80 — A=38 и N=68 помечены `⚠️ EXTREME`, но per Part 5 §5.1 RULE (extreme = `<30` или `>70`) они cautious zone (30–40 / 60–70); bible не был обновлён при iter 35 P0 fix A2 (canon Part 7A §7A.13 был исправлен, bible — нет). (2) `docs/vyshcherblenny_character_bible.md` — Setting «Ministry of Closed Communications» (старый сеттинг МЗК), GHOST Layers G1 «Abandoned at archive as child» (childhood) vs Part 10 §10.4 Tier 1 «Был архивариусом — впрыснул себе документ» (adult), OCEAN count «три экстремума» (фактически 4: O=85/C=25/A=15/N=92), Lorebook `vysh_world_rules` keys «МЗК, Министерство, Закон» — всё противоречит Part 10 §10.4 (мир ТЕНЕБРИС). (3) `README.md` L40 — Part 10 указывает «6 cards: Elena, Geralt, Edward, Walter, Omnis-Zeta, Vysherblenny», но Geralt + Edward DELETED в v9.1 (FIX-07). **Fix (iter 39, DONE):** все 3 KI закрыты doc-only правками (canon Part 10 §10.4 не тронут). Принцип: **guide's role as example takes priority over character canon** — при рассинхроне bible vs canon Part 10 правится bible, не Part 10. (1) `elena_character_bible.md` L75-80 — OCEAN labels обновлены (`⚠️ EXTREME` для O=72, `⚠️ CAUTIOUS ZONE` для A=38/N=68), «Extreme poles: 3» → «1 (O=72) + 2 cautious zone», убрано «For 4K context, keep only 2». (2) `vyshcherblenny_character_bible.md` — L14 Setting (ТЕНЕБРИС), L26-28 GHOST Layers (Tier 1/2/3 matching Part 10 §10.4), L80-86 OCEAN (4 экстремума, не 3 + per-value markers), L95 Note (расширена — покрывает Part 7A §7A.9 + Part 10 §10.4 moderate values), L115 Lorebook (`vysh_world_rules` → Вентора/Архив/Ошметок/Сангвис/Вель), L173-180 Consistency Checklist (все [x] + Setting aligned). (3) `README.md` L40 — «6 cards» → «4 cards (Geralt + Edward DELETED в v9.1 — FIX-07)», L42 «92 секции» → «Итого: 10 Parts (см. AGENT_NAVIGATION.md для 98 секций)». Build hash `69d9b813` unchanged (docs не в hash computation). Все validation gates PASS. **Правило (iter 39+):** (a) при аудите проверять не только `docs/canon/` но и `docs/*.md` bible + root `README.md` — doc drift может накапливаться между итерациями. (b) при рассинхроне bible vs canon — правится bible (или README), не canon. Canon = source of truth, examples в canon (Part 10 §10.1-§10.4) не трогаются без явного аудита. (c) bible version bump после каждого fix (9.2.0 → 9.2.1 в iter 39).

---

## 7. Documentation Map

| File | When to Update |
|------|----------------|
| `AGENT_NAVIGATION.md` | Каждая итерация (этот файл) |
| `STATUS.md` | При изменении статуса (current iter + Known Issues + Open Proposals) |
| `worklog.md` | Каждая итерация — append новый Task ID section |
| `PLAN.md` | При пересмотре плана docs-restructure |
| `README.md` | При изменении возможностей / команд / структуры |
| `CHANGELOG.md` | При release (MAJOR.MINOR.PATCH) |
| `CONTRIBUTING.md` | При изменении workflow контрибьюторов |
| `docs/architecture.md` | При структурных изменениях |
| `docs/content_map.md` | При добавлении/удалении секций (canonical mapping) |
| `docs/components.md` | При добавлении новых CSS-компонентов |
| `docs/terminology_dictionary.md` | При добавлении новых терминов |
| `docs/character_bible.md` | При изменении canonical персонажей |
| `docs/elena_character_bible.md` | При изменении Elena |
| `docs/vyshcherblenny_character_bible.md` | При изменении Vysherblenny |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | При пересмотре стратегии переработки контента (iter 6+) |
| `docs/canon/_README.md` | При изменении правил Canon (что это, как писать, как мигрировать) |
| `docs/canon/part_NN.md` | При создании/обновлении Canonical Guide Spec — один файл на Part. Migration Status см. в `docs/canon/_README.md` §5. |
| `docs/AUDIT_VERIFICATION.md` | При обнаружении новых противоречий в каноне — добавлять в §2 таблицу с sub-ID. Фикс-план iter 35-38 (KI#21 P0 ✅ CLOSED, P1-P3 pending) — canonical source. |
| `visual-system/PLAN.md` | При изменении visual system roadmap |

### Удалено в iter 1+2+3+4 (docs restructure)

| File | Iter | Reason |
|------|------|--------|
| `docs/transition_guide.md` | iter 2 (KI#7) | Iter 1 commit `c6a58c8` в message заявлял удаление, но фактически не удалил. В iter 2 проверено — нет кодовых зависимостей, удалён. 179 строк. |
| `docs/ap_reference_inventory.md` | iter 2 (KI#7) | То же — iter 1 не удалил фактически. Одноразовый Phase 0 документ. 179 строк. |
| `docs/user_journeys.md` | iter 2 (KI#4) | Draft с 2026-05-14 (v8.0.0), содержал устаревшие CORE DIRECTIVES (pre-v8 naming) и Part 7 не разделённый на 7A/7B. 462 строки. Core linear-journey concept уже в §3 этого файла + `docs/architecture.md` Section Model. |
| `DELETIONS-iter1.txt` | iter 2 | Stale iter 1 cleanup instruction file (poe2-regex-ru convention), больше не нужен после iter 2. |
| `src/shell/assets/` | iter 2 (KI#2) | Stale duplicate of `src/assets/`. Не читался `build-shell-unified.mjs` (ASSETS_SRC = `src/assets/`, не `src/shell/assets/`). |
| `DELETIONS-iter2.txt` | iter 3 (KI#9) | Stale iter 2 cleanup instruction file. Iter 2 удалил `DELETIONS-iter1.txt` с пометкой "больше не нужен", но при этом создал `DELETIONS-iter2.txt` — противоречие. Удалён в iter 3. |
| `scripts/validate-migration.mjs` | iter 3 (KI#8) | Orphan (не в package.json, не в CI). Валидировал v5.12→v6 / v7→v8 migration — 4 major версии назад при v9.1.0. Зависел от `docs/migration_map.md`. 888 строк. |
| `scripts/gen-redirect-map.mjs` | iter 3 (KI#8) | Orphan. Генерировал `data/anchor-redirects.json` из `migration_map.md`. Output файл уже committed и стабилен. `lazy-loader.js` имеет hardcoded fallback. 257 строк. |
| `docs/migration_map.md` | iter 3 (KI#8) | Зависел только от 2 orphan-скриптов выше. v5.12→v6 migration guide. 586 строк. |
| `docs/cross_reference_sync.md` | iter 4 | Compact file (62 строки), 14 bidirectional cross-ref pairs. Слит в `AGENT_NAVIGATION.md` §9 "Cross-Reference Pairs". Экономия ~20 строк overhead на шапку/версию. |

### KEEP (runtime data, не удалять)

| File | Reason |
|------|--------|
| `data/anchor-redirects.json` | Runtime data. Загружается `src/shell/lazy-loader.js` строки 67-81 для backward compat со старыми v5.12/v6 section IDs. Hardcoded fallback в lazy-loader.js (строки 51-62) обеспечивает работу без JSON. После удаления `gen-redirect-map.mjs` в iter 3 — становится статическим maintained артефактом. |

---

## 8. Open Proposals

### OP-1 — Docs restructure по образцу poe2-regex-ru

**Статус:** iter 1+2+3 завершены. Полный анализ в `PLAN.md`.

**iter 1–19 (compressed — см. CHANGELOG [9.1.1]..[9.1.19], worklog.md one-liners, git history):** iter 1 — AGENT_NAVIGATION/STATUS/worklog/PLAN created. iter 2-3 — KI#1..#9 closed, stale docs/orphan scripts removed. iter 4-5 — KI#10..#12 (qa:* wiring, tokens.json, inline scripts → widget JS). iter 6 — CONTENT_RESTRUCTURE_PLAN.md (Canon strategy + iter 7..19 roadmap), KI#14 NEW. iter 7 — Canon scaffold + Part 4 pilot, KI#15 CLOSED. iter 8 — Part 4 migration (-13%). iter 9 — Part 4 validation, KI#16 NEW. iter 10 — Canon Part 7A, KI#17 NEW. iter 11 — Part 7A migration (-2.7%). iter 12 — Canon Part 8 + migrate. iter 13 — Canon Part 9 + migrate. iter 14 — Canon Part 1+2+3 + migrate. iter 16 — Canon Part 5+6+7B+10 + migrate (**Canon migration COMPLETE**). iter 18 — final cleanup (3 Appendix Canon files + content_map/terminology cleanup). iter 19 — KI#16 fix (qa:csp PASS, 2 inline scripts → external widget JS).

**Iter history (compressed — full detail в `worklog.md` + `CHANGELOG.md` + git log):**

| Iter | Что сделано | KI |
|------|-------------|----|
| 1-3 | AGENT_NAVIGATION/STATUS/worklog/PLAN created, KI#1..#9 closed, stale docs/orphan scripts removed | KI#1..#9 |
| 4-5 | qa:* wiring, tokens.json, inline scripts → widget JS | KI#10..#12 |
| 6-9 | Canon strategy + scaffold + Part 4 pilot/migration/validation | KI#14, KI#15, KI#16 NEW |
| 10-18 | Canon Part 7A/8/9/1+2+3/5+6+7B+10 + 3 Appendix → **Canon migration COMPLETE** | KI#17 NEW |
| 19 | KI#16 fix — 2 inline scripts → external widget JS, qa:csp PASS | KI#16 ✅ |
| 20-24 | KI#13 (123 inline styles → 60 CSS классов с `vs-ki13-*` prefix), KI#17 CLOSED | KI#13 ✅, KI#17 ✅ |
| 25 | Phase 4 SVG integration — E18 Greeting Algorithm, VS elements registry: 18 (E01-E18) | — |
| 26-31 | DGA Phase 1+2 — KI#18 9/9 resolved (7 fixed A+B+C+D+E+I+F, 2 keep-by-design G+H); KI#19 incidental | KI#18 ✅, KI#19 ✅ |
| 32 | **Visual System Scroll-Animation Bug — vs-scroll-observer.js selector extended for 8 animation classes** (E06/E07/E08/E09/E15 fixed). Audit script `scripts/audit_vs_embeds.py` added. Stale iter READMEs deleted (README_iter18.md, README_ITER8_MERGE.md, ITER9_PATCH_README.md, MERGE_INSTRUCTIONS.md). | KI#20 ✅ |
| 33 | **CONTENT AUDIT VERIFICATION (без правок кода)** — перепроверен аудит канона `docs/canon/` (~50 пунктов A1-G5). 1 INVALID (B3), 2 REFINED (B2/B5), 2 STRENGTHENED (B4/F1), 3 NEW (NEW-1/2/3). Финальный fix plan: 57 правок в 14 canon-файлах + 3 новые секции, распределены на iter 34-37 (P0→P1→P2→P3) — позже сдвинуты на iter 35-38 из-за iter 34. Главный deliverable: `docs/AUDIT_VERIFICATION.md` (~500 строк, exact file+line+before/after для каждой правки). | KI#21 🟡 |
| 34 | **CSS CALLOUT SCOPING + CSP WORKER-SRC FIX.** KI#22 ✅ CLOSED — scope E15 `.callout*` selectors к `.blueprint-area .callout*` в `src/shell/styles.css` + `src/assets/vs-styles.css` (14 selectors total, 56 документационных callouts fixed, 11 E15 annotation labels preserved). KI#23 ✅ CLOSED — `worker-src 'self' blob:;` added to CSP meta в `src/shell/index.html` (Mermaid v11 worker unblocked). KI#24 ✅ VERIFIED — FAB Glossary/TOC работают корректно, no bug. Build hash `fd3d96d3` → `69d9b813`. | KI#22 ✅, KI#23 ✅, KI#24 ✅ |
| 35 | **CANON AUDIT P0 ✅ CLOSED.** 16/57 правок KI#21 закрыты (A1, A2, A3×4, A4×2+D2-partial, A6, A9, A10, B1 GHOST+FLAW, NEW-1, NEW-3). 7 canon-файлов изменены (appendix_glossary, part_04, part_05, part_07a, part_08, part_09, part_10). Все validation gates PASS + `audit_vs_embeds.py` 0 regressions. Build hash `69d9b813` unchanged (canon не в hash computation). | KI#21 P0 ✅ |
| 36 | **CANON AUDIT P1 ✅ CLOSED.** 27/57 правок KI#21 закрыты (16 P0 + 11 P1). P1 fixes: A5 (AP-9 broken SPINE критерий уточнён), A7 (AN «Счётчик вырезаний» row), A8 (§8.1 orphan OCEAN Overload row удалён), B2 (Уолтер GHOST ярлык→конкретное наблюдение), B5 (3 Anchor type defs), B6 (Tier 0 «12B»→«12B+»), D1 (Elena secondary GHOST+LIE удалены), D2 (Выщербленный variant LIE удалён), D4+NEW-2 (Lorebook Елена пожар→предательство в part_07a+part_07b). 6 canon-файлов изменены (part_04, part_06, part_07a, part_07b, part_08, part_10). Все validation gates PASS + `audit_vs_embeds.py` 0 regressions. Build hash `69d9b813` unchanged. | KI#21 P1 ✅ |
| 37 | **CANON AUDIT P2 ✅ CLOSED.** 45/57 правок KI#21 закрыты (16 P0 + 11 P1 + 18 P2). P2 fixes: P2-1 C1 inline defs (Anchor/Voice/SPINE/OCEAN) в part_01 §1.4, P2-2 C2 callout policy в _README.md §3.9, P2-3 C5 Bridge cleanup (8 удалено, 2 оставлены), P2-4 E1 YAML front-matter во всех 13 файлах, P2-5 E2 delete Migration Notes/Compression results/Validation gates/DGA Phase 2, P2-6 E3 delete Cross-refs ending, P2-7 E4 resume shorten + add Synthesis в 4 Parts, P2-8 E5 orphan §1.3 merged с §1.4, P2-9 E6 Pattern Matcher dedup (ссылки на Part 1 §1.4), P2-10 E7 «деликатно» cliché removed, P2-11 F1 22 «Canon planned iter X» stubs removed, P2-12 B4 Tier 1/2/3 → Quality Grade A/B/C в part_03 §3.4, P2-13 F4 «Запрещённые слова» → «Запрещённые формулировки» в part_04 §4.2, P2-14 F5 Cautious zone определение в part_05 §5.1, P2-15 F6 `<br/>` → em-dash в part_07a L305, P2-16 F7 Keirsey SP уточнено в part_07a §7A.1, P2-17 F9 1-словные симптомы для AP-ссылок в part_09 §9.6, P2-18 F10 inline-комментарии Елены → Annotation callout в part_10 §10.1. Все 14 canon-файлов изменены. Canon total: 5 035 → 3 905 строк (−1 130). Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `check_english.py` 0 leaks в `docs/canon/`. Build hash `69d9b813` unchanged. | KI#21 P2 ✅ |
| 38 | **CANON AUDIT P3 ✅ CLOSED — KI#21 ✅ CLOSED полностью (57/57).** 10 правок + 2 SKIP + 2 новых файла. P3 fixes: P3-1 (D3 Примечание перед обоими Greeting Елены в part_07b §7B.2 + part_10 §10.1), P3-2 (D5 Demonstrates callout перед TEMPLATE каждой из 4 карточек в part_10 §10.1-§10.4), P3-3 (D6 контекст Йоуёмы в part_03 §3.8), P3-4 (D7 cross-refs на Уолтера в part_01 §1.4 + part_04 §4.11 + part_09 §9.7), P3-5 (F2 4-я колонка «Пример (конкретный)» в part_02 §2.2 Price table), P3-6 (F3 Методология сноска к % таблице в part_03 §3.1), P3-7 (F8 SKIP — covered by P0-2), P3-8 (G1 новый файл part_00.md §0.1 «Как читать этот гайд»), P3-9 (G2 part_00.md §0.2 «TL;DR / Quick Start»), P3-10 (G3 SKIP — covered by P2-1), P3-11 (G4 новый файл appendix_character_map.md — карта 5 персонажей), P3-12 (G5 part_01 §1.8 «Pre-build checklist»). 8 canon-файлов modified + 2 новых файла. Canon total: 3 905 → 4 070 строк (+165 net). Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `check_english.py --scan-docs` 0 WH40k English terms in docs/. Build hash `69d9b813` unchanged. | KI#21 ✅ CLOSED |
| 39 | **DOC DRIFT FIX ✅ CLOSED — KI#25/#26/#27 ✅ CLOSED.** 3 новых KI обнаружены при анализе исходников Йоуёмы/Выщербленного (предоставлены пользователем) и сверки с каноном. Все 3 — doc-only (canon не тронут, build hash `69d9b813` unchanged). Принцип: guide's role as example takes priority — canon Part 10 §10.4 НЕ правится, bible/README подтягиваются к канону. **KI#25** (`docs/elena_character_bible.md` L78-80): OCEAN A=38/N=68 помечены `⚠️ EXTREME` → `⚠️ CAUTIOUS ZONE`; «Extreme poles: 3» → «1 (O=72) + 2 cautious zone»; убрано «For 4K context, keep only 2» (профиль допустим для 4K+ целиком per Part 5 §5.1 L59). **KI#26** (`docs/vyshcherblenny_character_bible.md`): L14 Setting (Ministry of Closed Communications → ТЕНЕБРИС — Вель/Ошметок/Сангвис/Вентора/Архив), L26-28 GHOST Layers G1/G2/G3 (Abandoned at archive → Tier 1/2/3 matching Part 10 §10.4), L80-86 OCEAN count (3 → 4 экстремума: O=85/C=25/A=15/N=92), L95 Note (расширена — покрывает и Part 7A §7A.9, и Part 10 §10.4 moderate values), L115 Lorebook `vysh_world_rules` (МЗК/Министерство → Вентора/Архив/Ошметок/Сангвис/Вель), L173-180 Consistency Checklist (все пункты [x] + добавлена строка «Setting aligned»). **KI#27** (`README.md` L40): Part 10 «6 cards: Elena, Geralt, Edward, Walter, Omnis-Zeta, Vysherblenny» → «4 cards: Elena, Walter, Omnis-Zeta, Vysherblenny (Geralt + Edward DELETED в v9.1 — FIX-07)». Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `check_english.py --scan-docs` 0 WH40k terms in docs/. Build hash `69d9b813` unchanged. | KI#25 ✅, KI#26 ✅, KI#27 ✅ |
| 40 | **README + OCEAN LABELING FIX ✅ CLOSED — KI#28/#29 ✅ CLOSED.** 2 KI из iter 39 roadmap закрыты. Оба — doc/canon-only (build hash `69d9b813` unchanged). **KI#28** (`README.md` L31-38): section counts обновлены для Parts 1/5/7/8 (5→7, 6→8, 16→18, 17→16). Part 8 описание «16 анти-паттернов (AP-1–AP-16)» → «15 анти-паттернов (AP-1–AP-15) + overview» (AP-16 не существует — OCEAN Overload перенесён в Part 5 §5.3 в v9). Сумма: 95 Part секций + 3 appendix = 98 ✓ (matches AGENT_NAVIGATION.md). **KI#29** (OCEAN labeling): `docs/canon/part_10.md` L408 — «Экстремумы: Низкая E, Высокая N» → «Экстремумы: Низкая E (<30). Cautious zone: N=70 (граница 60–70, см. Part 5 §5.1 RULE)» — N=70 = cautious zone boundary, не extreme (extreme = строго >70). `docs/canon/appendix_character_map.md` — колонка «OCEAN экстремумы» → «OCEAN (extreme + cautious)» + footnote с per-character breakdown. **Values unchanged** (O:60/C:55/E:25/A:30/N:70 — moderate 4K-fallback example). Internal canon consistency fix (Part 5 RULE vs Part 10/appendix label), НЕ bible-vs-canon sync — iter 39 invariant не применяется. Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `check_english.py --scan-docs` 0 WH40k terms. Build hash `69d9b813` unchanged. | KI#28 ✅, KI#29 ✅ |
| 41 | **OCEAN LABELING LEFTOVER + BIBLE CROSS-REF ✅ CLOSED — KI#30/#31 ✅ CLOSED.** 2 KI закрыты. Оба — doc/canon-only (build hash `69d9b813` unchanged). **KI#30** (NEW BUG found during investigation — iter 40 KI#29 fix был неполным, остались 2 locations с stale OCEAN labels): `docs/canon/part_07a.md` L415 (Выщербленный XML template §7A.9) — «Экстремумы: Низкая E, Высокая N» → «Низкая E (<30). Cautious zone: N=70 (граница 60–70)» (mirror iter 40 KI#29 fix). `docs/canon/part_10.md` L51 (Елена OCEAN §10.1) — «Экстремумы: Высокая O, Низкая A, Высокая N» → «Высокая O (>70). Cautious zone: A=38 (30–40), N=68 (60–70)» (Part 5 §5.1 L59 явно говорит: 1 extreme + 2 cautious). **Values unchanged** (O:60/C:55/E:25/A:30/N:70 Выщербленный; O:72/C:65/E:41/A:38/N:68 Елена). **KI#31** (roadmap item #3 — Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to bible): Cross-ref Note добавлена в OCEAN section обеих canon locations — «**Cross-ref:** Moderate values (4K-fallback / pedagogical). For 16K+ canonical extreme values (O=85, C=25, A=15, N=92, E=60) — see `docs/vyshcherblenny_character_bible.md` §OCEAN.» Bible Note (iter 39 KI#26) уже указывала на canon, reverse отсутствовала. Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `check_english.py --scan-docs` 0 WH40k terms. Build hash `69d9b813` unchanged. | KI#30 ✅, KI#31 ✅ |
| 42 | **COMPONENT-EXTRACTS DRIFT AUDIT ✅ CLOSED — KI#32 ✅ CLOSED (doc-only).** Roadmap item #2 закрыт. Pairwise diff audit выявил drift: 18/18 `E##-visual.html` (KI#13 + KI#22 + structural changes), 16/18 `E##-styles.css` MATCH vs `vs-styles.css` SECTION 5 (только E15 +13/-8 KI#22, E18 +16/-8 iter 25 с drift), 18/18 `E##-script.js` (KI#20 + KI#16). Файлы НЕ синхронизировались (54 файла, high risk, low value — `component-extracts/` не используются в build pipeline / runtime). Fix: `component-extracts/README.md` переписан с HISTORICAL SNAPSHOT notice + canonical source pointers + drift table + regeneration instructions. 2 новых audit scripts: `scripts/audit_component_extracts.py` (211 строк, visual.html vs VS-EMBED) + `scripts/audit_component_extracts_css.py` (135 строк, styles.css vs SECTION 5). Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `audit_component_extracts*.py` (expected drift confirmed) + `check_english.py --scan-docs` 0 WH40k terms. Build hash `69d9b813` unchanged (component-extracts/ и scripts/*.py не в hash computation). | KI#32 ✅ |
| 43 | **DEPLOY PIPELINE DOC + KI#33 🟡 NEW (doc-only).** Ответ на вопрос пользователя «Все завершено? Канон готов? А каким образом эти изменения перейдут в основной проект? На сайт?» — добавлена §2a «Deployment Pipeline» в AGENT_NAVIGATION.md. **KI#33 DISCOVERED:** canon audit фиксы iter 35-41 НЕ синхронизированы с `src/master/*.html`. 3 spot-checks подтвердили drift. Build hash `69d9b813` unchanged. Fix deferred to iter 44+. | KI#33 🟡 |
| 44 | **CANON→MASTER HTML SYNC PHASE 1 ✅ PARTIAL — KI#33 🔵 PARTIAL (9/57 fixes applied).** 9 content fixes применены к `src/master/*.html` (4 spot-checked drifts iter 43 + 5 adjacent A3/A7 drifts в 3 файлах: part_04, part_07a, part_10): P0-2 (Елена OCEAN extreme poles 3→1), P0-3 (part_04 G3 row «после 7-го»), P0-4 (part_07a §7A.5 AN «Счётчик вырезаний»), P0-5 (part_07a §7A.9 XML template G3), P1-2/A7 (part_07a AN sections table row), KI#29 (part_10 §10.4 Выщербленный OCEAN labels), KI#30 (part_07a §7A.9 + part_10 §10.1 OCEAN labels ×2), KI#31 (Cross-ref Notes ×2 — part_07a L730 + part_10 L512), A3 collateral (part_10 §10.4 AN «Счётчик вырезаний»). **contentHash в `build/build-manifest.json` изменился впервые с iter 34: `58f4daa85c05e070` → `34c34a7d9839c11d`.** Shell hash `69d9b813` unchanged (вычисляется из `src/shell/index.html` ONLY — iter 44+ invariant clarification). Regression test `scripts/audit_canon_master_sync.py` (NEW, 11 checks, focused guard для iter 44 fixes). Все validation gates PASS + `audit_vs_embeds.py` 0 regressions + `audit_canon_master_sync.py` 11/11 PASS. Осталось 48 fixes для iter 45+. | KI#33 🔵 PARTIAL |

**iter 45+ — что осталось:**
- **KI#33 🔵 PARTIAL (iter 44) — canon→master HTML sync Phase 2 (iter 45+, MEDIUM).** 48 audit правок remain. Категории: P0-7..9 (A4 part_04 NEED + variant delete), P0-13..14 (B1 part_10 Vysh GHOST+FLAW), P0-15 (NEW-1 part_04 cross-refs), P0-16 (NEW-3 part_05 RULE), P0-1 (A1 appendix_glossary), P0-10..12 (A6/A9/A10 part_08/09), P1-1..11 (part_04/06/07a/07b/08/10), P2-* (terminology, skip P2-4/P2-15 metadata), P3-* (local + cross-refs, skip P3-8/11 — no master equivalent). После каждого Part: `pnpm run build` + `validate:master` + `audit_canon_master_sync.py`. Расширить `audit_canon_master_sync.py` до general-purpose drift detector.
- **KI#32 ✅ CLOSED (iter 42).** Component-extracts drift audit + HISTORICAL SNAPSHOT notice + audit scripts.
- **Принцип «guide's role as example takes priority over character canon» (iter 39+ invariant):** при рассинхроне bible vs canon Part 10 — правится bible, не Part 10. Canon = source of truth, examples в canon (Part 10 §10.1-§10.4) не трогаются без явного аудита.
- **OCEAN labeling consistency (iter 40+, расширен iter 41 invariant; master sync ✅ iter 44):** extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`. Label-only fixes допустимы для internal canon consistency (Part 5 RULE vs Part 7A/Part 10/appendix labels) — values примера не трогаются. **Все canon locations с OCEAN labels проверены (iter 41):** `part_07a.md` L415, `part_10.md` L51/L148/L254/L408, `appendix_character_map.md` — все consistent с Part 5 §5.1 RULE. **Master HTML sync ✅ CLOSED iter 44** для 4 locations (part_07a L729, part_10 L160/L511, part_04/P0-3 collateral).
- **Bible ↔ canon cross-ref symmetry (iter 41+ invariant; master sync ✅ iter 44):** bible (`vyshcherblenny_character_bible.md`) имеет Note → Part 10 §10.4 + Part 7A §7A.9 (iter 39 KI#26). Reverse: Part 10 §10.4 + Part 7A §7A.9 имеют Cross-ref Note → bible (iter 41 KI#31). Навигационная полнота. **Master HTML sync ✅ CLOSED iter 44** для 2 Cross-ref Notes (part_07a L730 + part_10 L512).
- **Component extracts drift (iter 42+ invariant):** `python3 scripts/audit_component_extracts.py` (18/18 visual.html — DRIFT expected, historical snapshots) + `python3 scripts/audit_component_extracts_css.py` (16/18 styles.css — MATCH expected, E15/E18 known drift). Если extracts нужны как актуальный reference — regenerate from master (см. KI#32 «НЕ в scope» и `component-extracts/README.md`).
- **Потенциальные minor задачи (не критично, не запланировано):**
  - **Glossary double-render inefficiency** (`data/glossary.json` 53 terms + `docs/canon/appendix_glossary.md` 30 entries + `parts/appendix_glossary.html` 30 entries — лёгкое дублирование между markdown canon и HTML rendering). LOW — structural, by design (canon = source of truth, HTML = render).
  - **Component extracts regeneration (опционально)** — если extracts потребуются как актуальный reference: regenerate 54 файла from master (см. KI#32 «НЕ в scope» и `component-extracts/README.md` инструкция). LOW — нет business value пока extracts не используются.
- **Принцип `viz > dry text` (iter 8+):** сохраняется. Unique контент не удаляется даже при дублировании. **Catalog vs Detail / Annotation Layer patterns** — NOT pure re-explanation, keep-by-design с documented rationale (см. KI#18-G/H).
- **VS scroll-animation invariant:** все animation classes в `src/assets/vs-styles.css` должны быть покрыты либо `SCROLL_ENTER_SELECTOR` в `vs-scroll-observer.js`, либо `scroll-enter` class на каждом элементе. Audit: `python3 scripts/audit_vs_embeds.py`.
- **CSS scoping invariant (iter 34+):** VS-EMBED element CSS selectors должны быть scoped к element-specific parent (`.blueprint-area`, `.funnel-stack`, `.spine-flow`, etc.), НЕ использовать generic class names глобально. Class name collision (как `.callout` для documentation + E15 annotation) — scope к parent, не rename.
- **YAML front-matter (iter 37+):** все canon-файлы (кроме `_README.md`) используют YAML front-matter (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`). Markdown quote-block front-matter — deprecated.
- **Callout labels English (iter 37+):** метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — на английском как semantic anchors. `Примечание` — Russian локальное уточнение. Тело callouts — на русском. См. `docs/canon/_README.md` §3.9.
- **Новые баги:** сначала документировать в `STATUS.md` как KI#N, потом фиксить. **Новые противоречия в каноне:** добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу с sub-ID (A11, B7, и т.д.) и пометкой P0-P3.

**Полная дорожная карта:** `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2. **Canon migration status:** `docs/canon/_README.md` §5 (все 10 Parts + 4 Appendix + Part 0 concept ✅ MIGRATED/ADDED, Canon COMPLETE).

### OP-2 — Дублирующие папки widgets/ и assets/ [CLOSED iter 2]

**Решение (iter 2):** После анализа `build-shell-unified.mjs` оказалось, что top-level `widgets/`, `assets/`, `event-bus.js` — это **intentional root fallbacks** (regenerated на каждом билде для GitHub Pages backward compat), а не дубликаты. Реальный stale duplicate был только `src/shell/assets/` (не читался build script) — удалён. См. KI#2 / KI#1 в `STATUS.md` iter 1 record (в git history) и pitfall #18.

### OP-3 — `parts/` папка в repo [CLOSED iter 2]

**Решение (iter 2):** `parts/` — intentional root fallback, НЕ gitignored by design (см. `.gitignore` строки 22-30). CI/CD деплоит из `dist/`, но fallbacks обеспечивают работу без CI/CD. См. KI#1 в `STATUS.md` iter 1 record (в git history) и pitfall #18.

---

## 9. Cross-Reference Pairs (synced from docs/cross_reference_sync.md, iter 4)

> Per IMP-48: when section A references section B, B MUST reference back to A. Unidirectional refs create orphan knowledge. Migrated from `docs/cross_reference_sync.md` (deleted in iter 4) — kept here as the canonical registry.

### v9.1 Restructure Changes

- `p1_assembly_pipeline` DELETED → replaced by `p1_pipeline_ref` (forward ref to Part 7A)
- `p1_token_budget` MOVED → now `p7a_token_budget` in Part 7A, replaced by `p1_token_budget_ref` in Part 1
- `p10_geralt` DELETED
- `p10_edward` DELETED
- New sections: `p1_value_proposition`, `p7a_token_budget`
- All cross-references to `#p1_token_budget` updated to `#p7a_token_budget`
- All cross-references to `#p1_assembly_pipeline` removed

### Known Cross-Reference Pairs

| # | Source | Target | Forward Link | Back Link Status |
|---|--------|--------|--------------|------------------|
| 1 | `p1_top3_problems` | `p9_basic_checklist` | `href="#p9_basic_checklist"` | ✅ p9_basic_checklist references p1_core_rules via back-link |
| 2 | `p7a_system_prompt` | `p7a_core_directives` | Internal `#p7a_core_directives` | ✅ sub-section |
| 3 | `p7a_system_prompt` | `p7a_tone_frame` | Internal `#p7a_tone_frame` | ✅ sub-section |
| 4 | `p7b_lorebook_basics` | `p7b_lorebook_mechanics` | `href="#p7b_lorebook_mechanics"` | ✅ callout link |
| 5 | `p7a_authors_note` | `p7b_lorebook_mechanics` | `href="#p7b_lorebook_mechanics"` | ✅ acceptable (AN is upstream) |
| 6 | `p7b_lorebook_advanced` | `p7a_authors_note` | `href="#p7a_authors_note"` in Кросс-ссылки | ✅ upstream link |
| 7 | `p7b_lorebook_advanced` | `p7b_structured_inject` | `href="#p7b_structured_inject"` | ✅ forward only — technique ref (acceptable) |
| 8 | `p4_spine_navigation` | `p7a_xml_tags` | Pipeline step 3 via href | ✅ downstream |
| 9 | `p10_omnis` | `p4_ghost_layers` | `href="#p4_ghost_layers"` | ✅ back-link added in TP-15 |
| 10 | `p9_additional_problems` | `p1_top3_problems` | `href="#p1_top3_problems"` | ✅ back-link |
| 11 | `p10_elena` | `p2_anchor_examples` | `href="#p2_anchor_examples"` | ✅ back-link |
| 12 | `p1_token_budget_ref` | `p7a_token_budget` | `href="#p7a_token_budget"` | ✅ forward ref — canonical content in Part 7A |
| 13 | `p1_pipeline_ref` | `p7a_assembly_pipeline` | `href="#p7a_assembly_pipeline"` | ✅ forward ref — pipeline in Part 7A |
| 14 | `p1_value_proposition` | — | Standalone section | ✅ top-level sibling before p1_card_overview |

### Validation Checklist

- [x] Every forward link has a corresponding back link (✅ or acceptable)
- [x] No ❌ items remain
- [x] All `href` targets resolve to existing sections
- [x] No `data-layer-switch` references remain (removed in v8)
- [x] No references to deleted sections (`p1_assembly_pipeline`, `p10_geralt`, `p10_edward`)

---

## 10. Полезные ссылки

| Ресурс | URL |
|--------|-----|
| Онлайн-гайд | https://vudirvp-sketch.github.io/live-char-guide/ |
| Repository | https://github.com/vudirvp-sketch/live-char-guide |
| Issues | https://github.com/vudirvp-sketch/live-char-guide/issues |
| Источник паттерна навигации | https://github.com/vudirvp-sketch/poe2-regex-ru (AGENT_NAVIGATION.md) |

---

**Подсказка следующему агенту:** Перед стартом iter 45+ прочитай `STATUS.md` (iter 44 — KI#33 🔵 PARTIAL 9/57 fixes, contentHash `34c34a7d` first change since iter 34; iter 43 one-paragraph — KI#33 🟡 NEW + §2a Deployment Pipeline doc; iter 42 one-paragraph — KI#32 ✅ CLOSED doc-only; iter 39-41 one-paragraphs — KI#25..#31 ✅ CLOSED canon + master sync ✅ iter 44 для OCEAN labels + Cross-ref Notes; iter 34-38 one-liners — CSS/CSP + KI#21 P0/P1/P2/P3 canon-only; все previous KI#1..#32 ✅ CLOSED/VERIFIED), `worklog.md` (iter 44 record — самый подробный; iter 43 one-liner), этот файл (AGENT_NAVIGATION §2a Deployment Pipeline iter 43+, §8 OP-1 iter 44 row + iter 45+ roadmap — KI#33 fix Phase 2 MEDIUM priority + minor задачи LOW), `docs/canon/_README.md` (§5 migration status — все 10 Parts + 4 Appendix + Part 0 concept ✅, Canon COMPLETE; §3.9 callout labels policy). **Приоритет iter 45: KI#33 fix Phase 2 — canon→master HTML sync (48 fixes remain, MEDIUM).** **Invariants (iter 44+):** (1) `viz > dry text` (iter 8+) — сохраняется. (2) VS scroll-animation — `python3 scripts/audit_vs_embeds.py` (0 regressions expected). (3) Component extracts drift (iter 42+) — `python3 scripts/audit_component_extracts.py` + `_css.py` (expected drift, historical snapshots). (4) CSS scoping (iter 34+) — VS-EMBED selectors scoped к element-specific parent. (5) YAML front-matter (iter 37+) — все canon-файлы используют YAML front-matter. (6) **Guide's role as example takes priority over character canon (iter 39+):** при рассинхроне bible vs canon Part 10 — правится bible, не Part 10. (7) **OCEAN labeling consistency (iter 40+, расширен iter 41; master sync ✅ iter 44 для 4 locations):** extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`. (8) **Bible ↔ canon cross-ref symmetry (iter 41+; master sync ✅ iter 44 для 2 Cross-ref Notes).** (9) **Canon → master HTML sync (iter 43+ invariant, iter 44 PARTIAL 9/57):** `docs/canon/*.md` = source of truth для content. `src/master/*.html` = production HTML, деплоится на сайт. Regression test `python3 scripts/audit_canon_master_sync.py` (11/11 PASS, focused guard для iter 44 fixes). Расширить до general-purpose drift detector — iter 45+. (10) **Build hash vs contentHash (iter 44+ clarification, НОВЫЙ):** Shell hash `69d9b813` (в `build.hash`) = SHA-256 of `src/shell/index.html` ONLY, НЕ включает master HTML. contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`, ИЗМЕНИЛСЯ в iter 44: `58f4daa85c05e070` → `34c34a7d9839c11d` (first change since iter 34). **Shell hash unchanged ≠ master HTML unchanged.** Если найден новый баг — сначала документируй в `STATUS.md` как Known Issue (KI#N), потом фиксий. Если найдено новое противоречие в каноне — добавляй в `docs/AUDIT_VERIFICATION.md` §2 таблицу с sub-ID (A11, B7, и т.д.) и пометкой P0-P3. **B3 — НЕ пытаться «укоротить Examples Омнис-Зета»** (KI#21-B3 INVALID, аудит переоценил, examples в пределах лимита 120 токенов).
