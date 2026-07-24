# Live Character Guide — Agent Navigation

> **Entry document.** Read this first. Текущая версия: **9.1.0** + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED/ADDED (iter 18 + iter 38) + iter 34-56 + **iter 57: расширение 2 установленных pattern — Annotation blocks для §10.2-§10.4 (по pattern §10.1, 3 блока: Уолтер 6 bullets, Омнис-Зета 8 bullets, Выщербленный 10 bullets) + scenario-метки для §9.5/§9.6/§9.7/§9.11 (по pattern §9.3). 2 несуществующих anchor ID исправлены (`#p7a_author_note` → `#p7a_authors_note`, `#p7b_lorebook` → `#p7b_lorebook_basics`). Все validation gates PASS (96/96 sync + 12/12 master validation). Drift 89→92 (+3 callout_label — ожидаемо, 3 новых Annotation блока). English leaks baseline 20→24 (+4 — quoted Tone Frame strings в Annotation блоках). Shell hash `69d9b813` UNCHANGED. contentHash CHANGED (8th change — part_09, part_10 modified)**. Live-char-guide — инженерный пайплайн для RP-карточек персонажей (от SPINE до деплоя, для моделей 12B–32B+). Единый линейный гайд без слоёв: весь контент читается последовательно Part 0 (concept) → Part 1 → Part 10. Актуальный статус — в `STATUS.md`, история итераций — в `worklog.md`, полный план docs-restructure — в `PLAN.md`, **Canon (источник правды для контента, iter 7+) — в `docs/canon/` (см. `_README.md`)**, **аудит канона (iter 33+) — в `docs/AUDIT_VERIFICATION.md` (P0+P1+P2+P3 ✅ CLOSED iter 35-38, KI#21 ✅ CLOSED; 57/57 master sync iter 44+45+46+47 + 1 new section iter 50 + 98 id attrs iter 51)**, **разбор сводного аудита (iter 54) + iter 55-56 fixes — в `docs/AUDIT_REVIEW_ITER54.md` (22 утверждения разобраны, 3 KI#37-39 ✅ CLOSED)**, техническая архитектура — в `docs/architecture.md`.

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
14. **VS scroll-animation invariant (iter 32+, KI#20 ✅ CLOSED)** — все animation classes в `src/assets/vs-styles.css` должны быть покрыты либо `SCROLL_ENTER_SELECTOR` в `vs-scroll-observer.js` (11 classes), либо `scroll-enter` class на каждом элементе. Audit: `python3 scripts/audit_vs_embeds.py` (symlink workaround: `ln -sfn /path/to/repo /home/z/my-project/work/live-char-guide`).
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
25. **При обнаружении новых противоречий в каноне** — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.) с пометкой P0-P3.

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

**Статус:** iter 1-53 завершены. Полный анализ в `PLAN.md`. Compressed iter 52 — оставлены только milestone iters.

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
| 50 | KI#34 + KI#35 ✅ CLOSED — p1_prebuild_checklist section; p4_spine_overview canon metadata | KI#34 ✅, KI#35 ✅ |
| 51 | KI#36 ✅ CLOSED — anchor navigation: 98 id attrs added; lazy-loader.js selector fix; 13 русификаций | KI#36 ✅ |
| 52 | Paragraph-level Jaccard drift detection added в `audit_canon_master_drift.py` v1.1; documentation cleanup | — |
| 53 | Drift categorization added в `audit_canon_master_drift.py` v1.2 (5 категорий: vs_embed_ref / cross_ref / callout_label / no_master_match / plain_text); recon 88 drifts подтвердил: false positives нет | — |
| 54 | Исследовательская итерация: разбор сводного аудита (~22 утверждения) в `docs/AUDIT_REVIEW_ITER54.md`. Найдены 3 LOW-бага (KI#37/38/39, OPEN). Никаких правок гайда. contentHash UNCHANGED. | — |
| 55-56 | **Все 3 LOW KI ✅ CLOSED** (KI#37 disclaimer в §1.1; KI#38 AP table → intro+cross-ref canonical=VS-EMBED E12; KI#39 23 HTML-комментария удалены из code-блоков Part 10). Decision tree для фреймворков добавлен в `part_05.md §5.1`. 2 recap-чек-листа свёрнуты в `<details>` (§7A.13 + §9.11 Quick Check). Scenario-метка для §9.3 добавлена. iter 56 deep audit подтвердил отсутствие дальнейших critical дублирований. contentHash CHANGED (7th change). | KI#37, KI#38, KI#39 |

**iter 57+ — что осталось (LOW priority only, проект STABLE):**
- **LOW priority — Glossary double-render inefficiency:** structural, by design (canon = source of truth, HTML = render).
- **LOW priority — Component extracts regeneration (опционально):** regenerate 54 файла from master. Нет business value пока extracts не используются в build/runtime.
- **LOW priority — Dependabot merges (informational, GitHub-level):** 10 unmerged branches (5 GitHub Actions + 5 npm/yarn bumps). Слияние через GitHub UI или `git merge origin/dependabot/...`.
- **LOW priority — Paragraph drift tuning (опционально):** iter 55 baseline: 89 drifts (was 88; +1 = disclaimer параграф в §1.1). Real semantic differences, false positives нет. Threshold 0.3 / MIN_PARAGRAPH_LENGTH 30 остаются без изменений.
- **P2 (опционально) — canonical-location-маркер:** ввести `[canonical: ...]` vs `[ref: ...]` для различения определений и cross-refs (~150 правок). Поможет читателю отличить «тут полное определение» от «тут ссылка».
- **P2 (опционально) — Progressive disclosure метки:** `[BASIC]` / `[INTERMEDIATE]` / `[EXPERT]` к секциям (~50 секций).
- **P3 (опционально) — Annotation blocks для §10.2-§10.4:** добавить детальные Annotation (как в §10.1) для карточек Уолтера, Омнис-Зета, Выщербленного. Несоответствие: только §10.1 имеет Annotation.
- **P3 (опционально) — Расширение scenario-меток:** применить iter 55 pattern (scenario label в §9.3) к остальным чек-листам Part 9 (§9.5/§9.6/§9.7/§9.11).
- **Принцип `viz > dry text` (iter 8+):** сохраняется. Unique контент не удаляется даже при дублировании. **Catalog vs Detail / Annotation Layer patterns** — NOT pure re-explanation, keep-by-design с documented rationale (см. KI#18-G/H).
- **Recap-чек-листы в `<details>` (iter 55+ invariant):** recap-чек-листы (дублирующие уже изложенные правила) сворачиваются в `<details class="interactive"><summary>📋 Recap-чек-лист (сворачивается — дублирует правила из §X.Y)</summary>...</details>` с cross-refs. Диагностические чек-листы (§9.3 structural, §9.5 symptom, §9.6 decision tree, §9.11 pre-deploy gate) НЕ сворачиваются.
- **VS scroll-animation invariant:** все animation classes в `src/assets/vs-styles.css` должны быть покрыты либо `SCROLL_ENTER_SELECTOR` в `vs-scroll-observer.js`, либо `scroll-enter` class на каждом элементе. Audit: `python3 scripts/audit_vs_embeds.py` (pre-existing path issue — symlink workaround `ln -sfn /path/to/repo /home/z/my-project/work/live-char-guide`).
- **CSS scoping invariant (iter 34+):** VS-EMBED element CSS selectors должны быть scoped к element-specific parent, НЕ использовать generic class names глобально.
- **YAML front-matter (iter 37+):** все canon-файлы (кроме `_README.md`) используют YAML front-matter.
- **Callout labels English (iter 37+):** метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors.
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

**Подсказка следующему агенту:** Перед стартом iter 57+ прочитай `STATUS.md` (iter 55-56 — все 3 LOW KI закрыты, проект STABLE), `worklog.md` (iter 55-56 record — самый подробный; iter 54 one-liner), этот файл (§8 OP-1 iter 55-56 row + iter 57+ roadmap — только LOW/P2/P3 опциональные задачи), `docs/canon/_README.md` (§5 migration status, §3.9 callout labels policy), `docs/AUDIT_REVIEW_ITER54.md` (разбор аудита + iter 55-56 fixes). **Приоритет iter 57+: только LOW/P2/P3 опционально** — Glossary double-render (by design), Component extracts regeneration (опционально, no business value), Dependabot merges (GitHub-level), Paragraph drift tuning (89 drifts, false positives нет), canonical-location-маркер (~150 правок, P2), Progressive disclosure метки (~50 секций, P2), Annotation blocks для §10.2-§10.4 (P3), Расширение scenario-меток (P3). Если новых багов нет — проект STABLE. **Invariants (iter 55+):** (1) `viz > dry text` (iter 8+). (2) VS scroll-animation — `python3 scripts/audit_vs_embeds.py` (symlink workaround). (3) Component extracts drift (iter 42+). (4) CSS scoping (iter 34+). (5) YAML front-matter (iter 37+). (6) Guide's role as example takes priority over character canon (iter 39+). (7) OCEAN labeling consistency (iter 40+). (8) Bible ↔ canon cross-ref symmetry (iter 41+). (9) **Anchor navigation (iter 51+, KI#36 ✅ CLOSED):** все `<section data-section="X">` имеют `id="X"`. (10) **Canon → master HTML sync (iter 43+, iter 50 ✅ 58/58, iter 51 ✅ +98 id attrs, iter 55 ✅ +5 edits):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. Regression test `audit_canon_master_sync.py` 96/96 PASS. (11) **Drift detector (iter 48+, iter 52 ✅ paragraph-level, iter 53 ✅ categories, iter 55 baseline = 89 drifts):** `audit_canon_master_drift.py` v1.2 — informational, exit 0. (12) **Build hash vs contentHash (iter 44+, iter 55 ✅ CHANGED):** Shell hash `69d9b813` UNCHANGED. contentHash = 7th change (6 master HTML файлов модифицированы iter 55). (13) **Callout class policy (iter 45+):** разрешены `.callout.rule/.rec/.ex` и plain `.callout`. (14) **Recap-чек-листы в `<details>` (iter 55+ invariant):** recap-дубликаты правил сворачиваются в `<details class="interactive"><summary>📋 Recap-чек-лист ...</summary>...</details>` с cross-refs. Диагностические чек-листы НЕ сворачиваются. Если найден новый баг — сначала документируй в `STATUS.md` как KI#N, потом фиксий. Если найдено новое противоречие в каноне — добавляй в `docs/AUDIT_VERIFICATION.md` §2 с sub-ID (A11, B7) и P0-P3. **B3 — НЕ пытаться «укоротить Examples Омнис-Зета»** (KI#21-B3 INVALID). **НЕ следовать радикальным предложениям аудита** (удаление фреймворков, схлопывание чек-листов, переписывание таблиц) — они неверны и приведут к деградации гайда (см. `docs/AUDIT_REVIEW_ITER54.md` §11.1).
