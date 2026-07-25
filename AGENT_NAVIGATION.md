# Live Character Guide — Agent Navigation

> **Entry document.** Read this first. Текущая версия: **9.2.0** (docs + code + source-side fully synced) + все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED + **iter 71: KI#48 ✅ CLOSED (6 master HTML files `v9.1 Master HTML` → `v9.2` в top comment — part_01/02/05/06/07a/10; `docs/architecture.md` "95 sections in v9.1" → "96 sections in v9.2") + Progressive disclosure gap closure (p6_cot_bridge — последняя секция без `<!-- difficulty: BASIC -->` маркера, теперь 96/96 секций покрыты). Все validation gates PASS (version-sync ✅, 96/96 sync, 24 English leaks baseline, terms ✅, duplicates ✅, audit_vs_embeds ✅, validate:master 12/12 ✅, drift 170/131 baseline, build hash `4074bac5` unchanged)**. Live-char-guide — инженерный пайплайн для RP-карточек персонажей (от SPINE до деплоя, для моделей 12B–32B+). Единый линейный гайд. Актуальный статус — в `STATUS.md`, история итераций — в `worklog.md`, Canon (источник правды) — в `docs/canon/`.

---

## 1. Where Things Are

| Directory | Purpose | Rules |
|-----------|---------|-------|
| `src/master/` | Author content — 10 Parts (`part_01..10.html`) + 3 appendix (`mbti/model_table/glossary`). 97 секций, ~6 600 строк HTML. | **АВТОРЫ редактируют тут.** Все секции в `<section data-section>`. Запрещены `<style>` / `<script>` / `<link>` / `<meta>`. |
| `src/shell/` | Infrastructure shell — `index.html` (auto-load), `styles.css`, `lazy-loader.js`, `event-bus.js`, `widgets/` (15 виджетов). | **НЕ ТРОГАТЬ при написании Parts.** Изменения — через request к infrastructure. |
| `src/shell/widgets/` | 15 виджетов: `ocean-insight`, `enneagram-builder`, `mbti-composer`, `persona-cross`, `persona-synthesis`, `blueprint-viewer`, `diagnostic-tree`, `vs-mini-map`, `author-note-viewer`, `widget-utils`, `vs-scroll-observer`, `vs-e10-enneagram`, `vs-e13-diagnostic`, `vs-e15-blueprint`, `vs-e16-author-note`. | Markup в HTML, data в `data/*.json`, behavior в `lazy-loader.js`. |
| `src/assets/` | Static assets — `favicon.svg`, `preview-card.png`, `vs-styles.css`, `fonts/`. | Читается `build-shell-unified.mjs` (ASSETS_SRC = `src/assets/`). |
| `src/scripts/` | Build-скрипт `build-shell-unified.mjs` (копирует shell + parts + data → `dist/`). | Запускается через `pnpm run build:shell`. |
| `src/VERSION` | Plain text файл с версией (9.2.0). | Синхронизирован с `package.json` + `data/character_schema.json` + build manifest. |
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

> Read before touching master HTML / shell / build scripts. Compressed iter 52 — оставлены только key pitfalls, актуальные для текущего состояния. Исторические FIX-N детали — в git log.

### Базовые правила master HTML

1. **`<style>` / `<script>` forbidden в мастер-файлах** — все стили в `src/shell/styles.css` или `src/assets/vs-styles.css`, скрипты в `src/shell/lazy-loader.js` или `src/shell/widgets/*.js`. Inline styles forbidden (KI#13 ✅ CLOSED iter 24, 123/123 → 60 CSS классов `vs-ki13-*`). Inline scripts forbidden (KI#16 ✅ CLOSED iter 19, `qa:csp` PASS).
2. **`data-layer` / `data-layer-switch` атрибуты** — удалены в v8. Не использовать.
3. **Контент вне `<section data-section>`** — весь контент в master HTML должен быть внутри section с `data-section` атрибутом.
4. **Heading hierarchy** — `<h1>` один на страницу, `<h2>` для секций, `<h3>` для подсекций. Не прыгать через уровни.
5. **Английские термины в Russian prose** — 3+ слова English вне allowed contexts триггерят `check_english.py` (20 baseline by design: SP directives, part_10 examples, Quality Grade, Token Budget Check). Allowed: SP, Description, Examples, Greeting, Lorebook, SPINE, GHOST, OCEAN, Enneagram, LIE, FLAW, NEED, WANT, T→A→P, CoT, Embodiment, CORE DIRECTIVES, Temperature, Top P, Min P, RepPen, Top K, PP, 12B, 32B, API, Part N, AP-N.
6. **CSS class creation без approval** — авторы используют только компоненты из `docs/components.md`. Новые классы — через infrastructure approval.
7. **Hardcoded widget data в JS** — все данные в `data/*.json`. JS только читает.

### Build и деплой

8. **Root fallbacks vs canonical sources** — top-level `widgets/`, `assets/`, `parts/`, `event-bus.js`, `data/`, `index.html`, `build.hash` это **regenerated root fallbacks** (см. `build-shell-unified.mjs` строки 237-293), НЕ дубликаты. **Все правки — в canonical sources** (`src/master/`, `src/shell/`, `src/assets/`, `data/`). После `pnpm run build` fallbacks регенерируются. Единственное изменение после build — `Generated:` timestamp в `index.html`.
9. **Версии в 4 местах** — `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest. `pnpm run version:check` проверяет sync.
10. **Mermaid CDN dependency** — Mermaid.js грузится с `cdn.jsdelivr.net`. CSP `style-src` / `font-src` + `worker-src 'self' blob:;` (KI#23 ✅ CLOSED iter 34) для Mermaid v11 worker. Не заменять CDN на локальный bundle без одобрения.
11. **`noscript` в build artifact** — должен присутствовать. Не удалять.
12. **`blueprint-viewer` destroy()** / **`persona-cross` infinite loop guard** / **Clipboard API guard** (`if (navigator.clipboard)`) — не удалять существующие guards.

### Visual System (iter 25+)

13. **`viz > dry text` principle (iter 8+)** — визуализация = **замещение**, не **дополнение**. Если VS-EMBED показывает концепцию — текст не должен её пере-объяснять. Unique визуализации не удаляются даже при дублировании (KI#18-G/H keep-by-design).
14. **VS scroll-animation invariant (iter 32+, KI#20 ✅ CLOSED, KI#44 ✅ CLOSED iter 68)** — все animation classes в `src/assets/vs-styles.css` должны быть покрыты либо `SCROLL_ENTER_SELECTOR` в `vs-scroll-observer.js` (11 classes), либо `scroll-enter` class на каждом элементе. Audit: `python3 scripts/audit_vs_embeds.py`.
15. **CSS scoping invariant (iter 34+, KI#22 ✅ CLOSED)** — VS-EMBED element CSS selectors должны быть scoped к element-specific parent (`.blueprint-area`, `.funnel-stack`, `.spine-flow`, etc.), НЕ использовать generic class names глобально. Class name collision (как `.callout` для documentation + E15 annotation) — scope к parent, не rename.
16. **VS elements registry** — 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5.

### Canon sync и drift detection

17. **Canon → master HTML sync (iter 47 ✅ COMPLETE 58/58, iter 51 ✅ +98 id attrs)** — `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. Regression test: `python3 scripts/audit_canon_master_sync.py` (96/96 PASS). Workflow: `docs/canon/_README.md` §4.2 (manual sync per Part + `validate:master` + visual diff).
18. **Drift detector (iter 48+, iter 52 ✅ paragraph-level, iter 53 ✅ categories)** — `python3 scripts/audit_canon_master_drift.py` v1.2 — informational, exit 0. Проверяет: section presence drift + heading text mismatch + content hash diff + paragraph-level Jaccard similarity (iter 52+) + drift categorization (iter 53+). **88 paragraph drifts expected** (VS-EMBEDs replace text). Categories: vs_embed_ref=15, cross_ref=14, callout_label=4, no_master_match=2, plain_text=53. CLI: `--no-paragraphs`, `--paragraph-threshold FLOAT`, `--json PATH`.
19. **Callout class policy (iter 45+)** — разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463).
20. **Callout labels English (iter 37+)** — метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. Тело callouts — на русском. См. `docs/canon/_README.md` §3.9.
21. **YAML front-matter (iter 37+)** — все canon-файлы (кроме `_README.md`) используют YAML front-matter (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`).
22. **OCEAN labeling consistency (iter 40+)** — extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`. При рассинхроне bible vs canon Part 10 — правится bible (principle: guide's role as example takes priority).

### Anchor navigation (iter 51+, KI#36 ✅ CLOSED)

23. **Все `<section data-section="X">` в `src/master/*.html` имеют `id="X"`** — браузерный anchor mechanism (`<a href="#X">`) работает нативно. `lazy-loader.js` селектор `$$('section[data-section]')`. При добавлении новой секции — ВСЕГДА добавлять `id` атрибут (=data-section). Regression test: `audit_canon_master_sync.py` (96/96 PASS, +4 KI#36 id checks).

### Новые баги и противоречия

24. **При обнаружении новых багов** — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

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
| `docs/canon/iter60_analysis_plan.md` | iter 60–67 план (завершён). Историческая справка. |
| `visual-system/PLAN.md` | При изменении visual system roadmap |

### Удалено в iter 67 (cleanup устаревших файлов)

| File | Reason |
|------|--------|
| `ITER51_README.md` | iter 51 README, дублирует info из worklog/STATUS/CHANGELOG. |
| `_ITER51_DELETE_STALE.txt` | iter 51 cleanup marker, выполнен. |
| `AUDIT_VERIFICATION.md` (root) | Дубликат `docs/AUDIT_VERIFICATION.md`, устаревший. |
| `docs/AUDIT_VERIFICATION.md` | iter 33-45 audit verification. KI#21 ✅ CLOSED полностью. |
| `docs/AUDIT_REVIEW_ITER54.md` | iter 54-56 research. KI#37/38/39 ✅ CLOSED. |
| `docs/cross_reference_sync.md.DELETED` | Marker для файла, удалённого в iter 4 (контент слит в `AGENT_NAVIGATION.md` §9). |

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

**Статус:** iter 1-67 завершены. iter 60–67 plan (`docs/canon/iter60_analysis_plan.md`) — COMPLETE.

**Iter milestones (compressed — full detail в `worklog.md` + `CHANGELOG.md` + git log):**

| Iter | Milestone | KI |
|------|-----------|----|
| 1-3 | AGENT_NAVIGATION/STATUS/worklog/PLAN created, KI#1..#9 closed, stale docs/orphan scripts removed | KI#1..#9 ✅ |
| 4-5 | qa:* wiring, tokens.json, inline scripts → widget JS | KI#10..#12 ✅ |
| 6-18 | Canon strategy + Part-by-Part migration → **Canon migration COMPLETE** | KI#14..#17 ✅ |
| 19 | KI#16 fix — 2 inline scripts → external widget JS, qa:csp PASS | KI#16 ✅ |
| 20-24 | KI#13 (123 inline styles → 60 CSS классов `vs-ki13-*`) | KI#13 ✅ |
| 25 | Phase 4 SVG integration — E18, VS elements registry: 18 (E01-E18) | — |
| 26-31 | DGA Phase 1+2 — KI#18 9/9 resolved, KI#19 FIXED | KI#18 ✅, KI#19 ✅ |
| 32 | VS Scroll-Animation Bug — vs-scroll-observer.js selector extended (8 animation classes) | KI#20 ✅ |
| 33-38 | Canon Audit P0-P3 — 57/57 правок KI#21 в canon (P0+P1+P2+P3 ✅ CLOSED) | KI#21 ✅ |
| 39-42 | Doc drift + OCEAN labeling + bible cross-ref + component-extracts audit | KI#25..#32 ✅ |
| 43-47 | Canon→master HTML sync Phase 1-4 — 57/57 content fixes applied | KI#33 ✅ |
| 48 | General-purpose drift detector `audit_canon_master_drift.py` added (informational, exit 0) | KI#34 🟡, KI#35 🟡 |
| 50-51 | KI#34/35/36 ✅ CLOSED — anchor navigation: 98 id attrs added; lazy-loader.js selector fix | KI#34/35/36 ✅ |
| 52-53 | Paragraph-level Jaccard drift detection v1.1 + drift categorization v1.2 (5 категорий) | — |
| 54-56 | Audit review → KI#37/38/39 ✅ CLOSED + Decision tree + recap-spoilers | KI#37/38/39 ✅ |
| 57-58 | Annotation blocks §10.2-10.4 + scenario labels + metadata enrichment (glossary consolidation, progressive disclosure, canonical markers) | — |
| 60 | Language policy revision (Cat A/B split, RU primary in headings) + canon dedup (no-repeat principle, Part 0/1/4) | — |
| 61 | KI#40 closed (canon→master sync) + 11 Cat B headings unified | KI#40 ✅ |
| 62 | R1 repetitions cleanup §2.2/§5.1→§5.6 + §5.5 MBTI stub merge | — |
| 63 | A59-1 Neuroticism→stress type taxonomy + A59-3 Personality sub-budget | — |
| 64 | A59-2 Trigger→Stress→FLAW chain + drift v1.3 | — |
| 65 | KI#41 fixed — E10 VS-EMBED hardcoded colors → CSS variables | KI#41 ✅ |
| 66 | KI#42 (E09 embed CSS vars) + KI#43 (parts/ rebuild) | KI#42/43 ✅ |
| 67 | P2-remaining (R1 cleanup §4.10) + Cat B prose inversion (6 mentions) + cleanup 6 stale files | — |
| 70 | KI#46 (`src/master/VERSION` orphan) + KI#47 (`src/shell/styles.css` header) + Docs version bump (5 stale docs) | KI#46/47 ✅ |
| 71 | KI#48 (6 master HTML `v9.1 Master HTML` → `v9.2` top comment) + Progressive disclosure gap closure (p6_cot_bridge — теперь 96/96 секций покрыты) | KI#48 ✅ |

**iter 72+ — что осталось (LOW priority only, проект STABLE):**
- **Разведка (recon):** поиск новых багов или audit-задач.
- **LOW priority — Glossary double-render inefficiency:** structural, by design.
- **LOW priority — Component extracts regeneration (опционально):** regenerate 54 файла from master. Нет business value пока extracts не используются в build/runtime.
- **LOW priority — Dependabot merges (informational, GitHub-level).**
- **LOW priority — Paragraph drift tuning (опционально):** iter 64 baseline: 170 drifts / 131 actionable. Real semantic differences, false positives нет.
- **P2 (опционально) — canonical-location-маркер:** ввести `[canonical: ...]` vs `[ref: ...]` для различения определений и cross-refs (~150 правок). Отложен — требует контент-ревью.
- **P3 (опционально) — Annotation blocks для §10.2-§10.4:** добавить детальные Annotation (как в §10.1) для карточек Уолтера, Омнис-Зета, Выщербленного.
- **P3 (опционально) — Расширение scenario-меток:** применить iter 55 pattern к остальным чек-листам Part 9.
- **Опционально — `src/master/VERSION` orphan file deletion:** KI#46 follow-up, risk-free (не используется build-скриптами).
- **Принцип `viz > dry text` (iter 8+):** сохраняется. Unique контент не удаляется даже при дублировании. **Catalog vs Detail / Annotation Layer patterns** — NOT pure re-explanation, keep-by-design.
- **Recap-чек-листы в `<details>` (iter 55+ invariant):** recap-чек-листы сворачиваются в `<details>` с cross-refs. Диагностические чек-листы НЕ сворачиваются.
- **VS scroll-animation invariant:** все animation classes должны быть покрыты либо `SCROLL_ENTER_SELECTOR`, либо `scroll-enter` class.
- **CSS scoping invariant (iter 34+):** VS-EMBED element CSS selectors scoped к element-specific parent.
- **YAML front-matter (iter 37+):** все canon-файлы используют YAML front-matter.
- **Callout labels English (iter 37+):** метки `RULE`, `RECOMMENDATION`, `EXAMPLE` и др. — English semantic anchors.
- **Новые баги:** сначала документировать в `STATUS.md` как KI#N, потом фиксить.

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
| 12 | `p1_card_overview` (Token Budget subsection) | `p7a_token_budget` | `href="#p7a_token_budget"` | ✅ forward ref — canonical content in Part 7A (iter 61: merged as subsection of §1.2) |
| 13 | `p1_card_overview` (Конвейер сборки subsection) | `p7a_assembly_pipeline` | `href="#p7a_assembly_pipeline"` | ✅ forward ref — pipeline in Part 7A (iter 61: merged as subsection of §1.2) |
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

**Подсказка следующему агенту:** Перед стартом iter 72+ прочитай `STATUS.md` (iter 71 — KI#48 ✅ CLOSED, Progressive disclosure gap closure done, проект STABLE), `worklog.md` (iter 71 record — самый подробный), этот файл (§8 OP-1 iter milestones + iter 72+ roadmap), `docs/canon/_README.md` (§5 migration status, §3.9 callout labels policy). **Приоритет iter 72+:** P2/P3 опционально — canonical-location-маркер (~150 правок, P2 MEDIUM — отложен, требует контент-ревью), Annotation blocks для §10.2-10.4 (P3 LOW — 3 карточки: Уолтер, Омнис-Зета, Выщербленный), Расширение scenario-меток (P3 LOW). Recon — поиск новых багов или audit-задач. Component extracts regeneration (опционально), `src/master/VERSION` orphan deletion (KI#46 follow-up, опционально, risk-free), Dependabot merges (GitHub-level), Glossary double-render (by design), Paragraph drift tuning (170 drifts, false positives нет). Если новых багов нет — проект STABLE. **Invariants (iter 71+):** (1) `viz > dry text` (iter 8+). (2) VS scroll-animation — `python3 scripts/audit_vs_embeds.py` (KI#44 ✅ CLOSED iter 68, работает без symlink workaround). (3) Component extracts drift (iter 42+). (4) CSS scoping (iter 34+). (5) YAML front-matter (iter 37+). (6) Guide's role as example takes priority over character canon (iter 39+). (7) OCEAN labeling consistency (iter 40+). (8) Bible ↔ canon cross-ref symmetry (iter 41+). (9) **Anchor navigation (iter 51+, KI#36 ✅ CLOSED):** все `<section data-section="X">` имеют `id="X"`. (10) **Canon → master HTML sync (iter 43+, 96/96 PASS):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. (11) **Drift detector (iter 48+, v1.3):** `audit_canon_master_drift.py` — informational, exit 0. (12) **Build hash `4074bac5` (unchanged iter 71 — master HTML comment edits не влияют на hash, hash computed only from `src/shell/index.html`)**. (13) **Callout class policy (iter 45+):** разрешены `.callout.rule/.rec/.ex` и plain `.callout`. (14) **Recap-чек-листы в `<details>` (iter 55+ invariant).** (15) **Cat B prose mentions (iter 67+):** «Russian (English)» форма, не «English (Russian)». (16) **Version sync (iter 71+):** все 9.1.0 references устранены — `src/VERSION`, `src/master/VERSION`, `package.json`, `data/*.json`, `src/shell/*`, `scripts/*`, `docs/*.md`, `src/master/*.html` top comments все говорят 9.2.0. (17) **Progressive disclosure (iter 71+):** 96/96 секций покрыты `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` маркерами. Если найден новый баг — сначала документируй в `STATUS.md` как KI#N, потом фиксий.
