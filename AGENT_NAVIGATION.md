# Live Character Guide — Agent Navigation

> **Entry document.** Read this first. Текущая версия: **9.1.0** + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#16 ✅ CLOSED (iter 19) + KI#17 ✅ CLOSED (iter 20). Live-char-guide — инженерный пайплайн для RP-карточек персонажей (от SPINE до деплоя, для моделей 12B–32B+). Единый линейный гайд без слоёв: весь контент читается последовательно Part 1 → Part 10. Актуальный статус — в `STATUS.md`, история итераций — в `worklog.md`, полный план docs-restructure — в `PLAN.md`, **план переработки контента (iter 6+) — в `docs/CONTENT_RESTRUCTURE_PLAN.md`**, **Canon (источник правды для контента, iter 7+) — в `docs/canon/` (см. `_README.md`)**, техническая архитектура — в `docs/architecture.md`.

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

### Деплой

GitHub Pages с автоматическим деплоем через GitHub Actions:
1. Push в `main` ветку.
2. GitHub Actions собирает и деплоит автоматически.
3. Доступно на: https://vudirvp-sketch.github.io/live-char-guide/

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
36. **Inline styles → CSS classes (KI#13, found iter 5, ACTIVE, MEDIUM)** — 123 inline `style=` в master HTML. iter 20 fixed Part 1+2 (57 inline styles → 28 CSS classes с `vs-ki13-*` prefix в vs-styles.css SECTION 6). 66 remaining в Part 3-10. **Правило:** при добавлении нового визуального элемента — сначала вынести стили в CSS классы, потом уже в HTML. Inline styles forbidden (same rule как pitfall #1 для scripts).

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

**iter 1–6 (compressed):** iter 1 — AGENT_NAVIGATION/STATUS/worklog/PLAN created, 6 KI identified. iter 2 — KI#1..#6 closed, stale docs removed. iter 3 — KI#8+#9 closed (orphan scripts), pitfalls 18→30. iter 4 — KI#10 closed, KI#11+#12 found (qa:* scripts wired). iter 5 — KI#11 closed (tokens.json), KI#12 partial (17 inline scripts → 5 widget JS modules), KI#13 NEW (123 inline styles + 23 outside). iter 6 — `docs/CONTENT_RESTRUCTURE_PLAN.md` created (7 dup patterns + Canon strategy + iter 7..19 roadmap), KI#14 NEW (content duplication), KI#15 NEW (anchor-redirects stale dup).

**iter 7 (Canon scaffold + Part 4 pilot + KI#15 fix):** Создан `docs/canon/` scaffold: `_README.md` (правила Canon) + `part_04.md` (пилот SPINE, 11 секций, 394 строки, Migration Notes таблица для iter 8). KI#15 CLOSED — удалён `docs/anchor-redirects.json`. 6 docs updated. Никаких правок master HTML.

**iter 8 (Part 4 pilot migration):** Мигрирован `src/master/part_04.html` против Canon §4. 777 → 676 строк (-13%). 4 дублирующих визуализации удалены (mermaid + 3 inf-pipeline), 1 orphan paragraph удалён, 2 re-explanation абзаца сжаты. **2 unique infographic сохранены** (deviation от Canon — p4_spine_mapping mnemonic + p4_spine_navigation pipeline) по предпочтению пользователя «viz > dry text». **LIE таблица сохранена полностью** (4 строки, deviation от Canon «сократить до 2» — все строки уникальны). Build PASS, validate:master PASS. Подробности: `docs/canon/part_04.md` Migration Notes, `worklog.md` iter 8 one-liner, CHANGELOG [9.1.8].

**iter 9 (Part 4 validation pass):** Validation pilot Part 4 migration (iter 8). Static HTML sanity check (11 sections balanced, 2 VS-EMBED well-formed, 2 retained infographic present, no orphans, no mermaid, no broken refs) + served `parts/part_04.html` через локальный сервер (40 825 bytes, all expected content present, all removed content absent) + `pnpm run validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:contrast`/`qa:doc-versions` PASS. `qa:english`/`qa:syntax` — same false positives as iter 7 (no regression). `qa:csp` FAIL → **KI#16 NEW** (pre-existing с iter 5, не задокументирован ранее). 6 docs updated. Никаких правок master HTML / visual-system / widget JS.

**iter 10 (Canon Part 7A creation):** Создан `docs/canon/part_07a.md` (802 строки, 13 H2 секций — по одной на каждый `data-section` из `src/master/part_07a.html`, 4 VS-маркера для E08/E16/E17/E02). Front-matter `Migration status: ❌ NOT MIGRATED (iter 11 task)`. Migration Notes таблица: 54 TODO строки + validation gates. Master HTML не тронут (iter 11 задача). `pnpm run validate:master` PASS (0 errors, KI#13 baseline). **KI#17 NEW** (documentation drift: AGENT_NAVIGATION §10 hint + worklog iter 9 record указывали 4 VS-EMBED как «E07, E08, E16, E17», но фактически в файле — E08, E16, E17, E02; E07 — Voice Hierarchy, cross-referenced внутри E16, embedded в Part 3). Fix applied in iter 10. **Decision:** iter 11 (migration, 1168 строк master HTML) — рекомендуется разбить на 2 под-итерации (iter 11a: §7A.1–§7A.7, ~660 строк, 3 VS-EMBED; iter 11b: §7A.8–§7A.13, ~510 строк, 1 VS-EMBED). 8 docs updated.

**iter 11 (Part 7A migration):** Мигрирован `src/master/part_07a.html` против Canon §7A. 1168 → 1137 строк (-2.7%). 4 compression candidates applied: #22 sampling table → notes-only list + cross-ref E17, #26 model checklist → bullet-list + cross-ref E17, #42 plain-copy pre-block → удалён, #46 CORE DIRECTIVES walkthrough → 1-line cross-ref. 50 "Оставить" элементов без изменений. `validate:master`/`build`/`validate`/`test:unit`/`lint` PASS. Canon front-matter MIGRATED. 9 docs updated.

**iter 12 (Canon Part 8 + migrate):** Canon `docs/canon/part_08.md` создан (411 строк, 16 H2 секций, 1 VS-маркер для E12) + `src/master/part_08.html` мигрирован (521 → 507 строк, -2.7%). 2 compression candidates applied: #3 overview intro paragraphs merge (дублировали определение «анти-паттерн»), #21 AP-9 «Пример: Елена — проверка SPINE» `<pre><code>` блок → 1-строчный cross-ref на Part 4 §4.9 (canonical location). 29 "Оставить" элементов без изменений (все diff examples AP-1/AP-3/AP-12/AP-15, RULE callouts, anti-pattern pairs, summary table). `validate:master`/`build`/`validate`/`test:unit`/`lint` PASS. Canon front-matter MIGRATED. 9 docs updated.

**iter 13 (Canon Part 9 + migrate):** Canon `docs/canon/part_09.md` создан (351 строка, 11 H2 секций, 2 VS-маркера E13+E14) + `src/master/part_09.html` мигрирован (596 → 582 строк, -2.3%). 1 compression candidate applied: #13 `p9_test_requirements` Table 1 → 1-строчный cross-ref. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. Canon front-matter MIGRATED. 10 docs updated.

**iter 14 (Canon Part 1+2+3 + migrate, end-to-end за один iter):** Canon `docs/canon/part_01.md` (186 строк, 7 H2 секций, 1 VS-маркер E01) + `docs/canon/part_02.md` (238 строк, 6 H2 секций, 2 VS-маркера E03+E04) + `docs/canon/part_03.md` (315 строк, 8 H2 секций, 1 VS-маркер E07) созданы. 3 master HTML мигрированы: `part_01.html` 390 → 365 строк (-6.4%, удалён mermaid как дубликат auto-TOC), `part_02.html` 443 → 415 строк (-6.3%, удалены 2 устаревших infographic + 1 plain-copy fallback как дубликаты VS-EMBED E03/E04), `part_03.html` 452 → 452 строк (0%, контент плотный, дубликатов не найдено). 4 compression candidates applied: #14 mermaid dependency graph, #15 infographic T→A→P, #16 plain-copy T→A→P, #17 infographic Embodiment Protocol. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. Canon front-matter MIGRATED. 10 docs updated.

**iter 16 (Canon Part 5+6+7B+10 + migrate, end-to-end за один iter):** Canon `docs/canon/part_05.md` (285 строк, 8 H2 секций, 2 VS-маркера E09+E10) + `docs/canon/part_06.md` (247 строк, 6 H2 секций, 1 VS-маркер E11) + `docs/canon/part_07b.md` (309 строк, 5 H2 секций, 0 VS-маркеров) + `docs/canon/part_10.md` (593 строки, 4 H2 секции, 1 VS-маркер E15) созданы. 4 master HTML мигрированы: `part_05.html` 619 → 615 строк (-0.6%, 2 orphan paragraphs removed как duplicates + orphans), `part_06.html` 261 → 259 строк (-0.8%, 1 duplicate CoT definition removed), `part_07b.html` 371 → 371 строк (0%, контент плотный), `part_10.html` 666 → 666 строк (0%, все 4 карточки уникальные TEMPLATEs). 3 compression candidates applied: #18 orphan paragraph (duplicate of p5_elena_profile RULE), #19 orphan paragraph (duplicate of p5_enneagram_basics intro), #20 p6_cot_basics duplicate CoT definition. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. Canon front-matter MIGRATED. **Все 10 Parts мигрированы — Canon migration complete.** 10 docs updated.

**iter 18 (Final cleanup — Canon migration COMPLETE):** (a) Visual check Part 5+6 via static validation — 8/6 sections balanced, 2/1 VS-EMBEDs well-formed, no orphan infographics/mermaid — only callout rule/rec, no regression. (b) Infographic + mermaid audit: 0 mermaid в master HTML (все удалены в iter 8/14); 3 infographic retained (2 part_04: SPINE→Anchors mnemonic + Assembly pipeline; 1 part_07b: Greeting algorithm) — все unique visualizations, iter 8/16 retention confirmed. 1 part_05 static SVG fallback (ocean-static, accessibility fallback для E09 widget) retained. (c) `docs/canon/appendix_mbti.md` (74 строки, 1 секция) + `appendix_model_table.md` (63 строки, 1 секция) + `appendix_glossary.md` (230 строк, 27 entries) созданы — master HTML уже минимален, Canon = mirror. (d) `docs/content_map.md` cleanup → mirror Canon (277 → 256 строк, -8%, добавлен Canon § column для каждого concept). (e) `docs/terminology_dictionary.md` cleanup (338 → 206 строк, -39%, deduplicated tables, merged «Запрещённые переводы» into §1, removed stale v9.0 history). `validate:master`/`build`/`validate`/`test:unit`/`lint` PASS. **Все 10 Parts + 3 Appendix — Canon COMPLETE.** 12 docs updated.

**iter 19 (KI#16 fix — qa:csp PASS):** 2 inline `<script>` блока в `src/shell/index.html` вынесены в external widget JS. (a) `src/shell/widgets/js-flag.js` created (early `js` class flag, sync в `<head>` для FOUC prevention). (b) `src/shell/widgets/mermaid-init.js` created (mermaid.initialize с dark theme + brand colors, sync после mermaid CDN, sets `mermaid._initialized = true` для skip redundant init в lazy-loader.js line 689). (c) `src/shell/index.html` edited: 2 inline `<script>` → 2 `<script src="widgets/...">` с KI#16 fix comments. (d) Build regenerated root `index.html` + `widgets/` (15→17 files) + `build.hash` (`df283246` → `fd3d96d3`). (e) `qa:csp` PASS (0 inline scripts). `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:bundle`/`qa:doc-versions` PASS. **KI#16 CLOSED.** 14 docs/files updated.

**iter 20 (KI#13 Part 1+2 + KI#17 closure + SVG audit):** (a) KI#13 Part 1: 48 inline styles в `part_01.html` → 15 CSS classes (`vs-ki13-anchor-header/title/desc` + `vs-ki13-token-panel/heading/table/thead/th-*/tbody/row/td-*`). (b) KI#13 Part 2: 9 inline styles в `part_02.html` → 9 CSS classes (`vs-ki13-flow-node--violet/cyan/amber` + `vs-ki13-compare-column--relative` + `vs-ki13-arrow-dim` + `vs-ki13-funnel-panel/panel-heading/panel-text`). Total: 57/123 inline styles fixed (46%). `src/assets/vs-styles.css` +137 строк (SECTION 6). (c) KI#17 CLOSED (doc drift fixed iter 10, LOW severity). (d) SVG extracts audit: все 17 elements embedded в master HTML, все 17 extract styles в vs-styles.css, scripts в vs-scroll-observer.js + 4 widget JS. 0 orphans. `validate:master`/`build`/`validate`/`test:unit`/`lint`/`qa:csp`/`qa:bundle`/`qa:doc-versions` PASS. 10 docs/files updated.

**iter 21+ — что осталось:**
- **iter 21:** KI#13 Part 3+4 (2+21=23 inline styles → CSS classes) + Phase 4 SVG integration start.
- **iter 22+:** KI#13 Part 5-10 remaining (43 inline styles). Phase 4 SVG integration.

**Полная дорожная карта:** `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2. **Canon migration status:** `docs/canon/_README.md` §5.

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

**Подсказка следующему агенту:** Перед стартом iter 21+ прочитай `STATUS.md` (iter 20 COMPLETE, KI#17 ✅ CLOSED, KI#13 57/123 fixed), `worklog.md` (iter 20 record), этот файл (AGENT_NAVIGATION §8 iter 21+ roadmap), `docs/canon/_README.md` (§5 migration status — все 10 Parts + 3 Appendix ✅, Canon COMPLETE), `docs/CONTENT_RESTRUCTURE_PLAN.md` (§5.2 iter 21 priorities). iter 21+ priorities: KI#13 Part 3+4 (66 remaining inline styles → CSS classes) + Phase 4 SVG integration start. Принцип «viz > dry text» (iter 8) — сохраняется. Если найден новый баг — сначала документируй в `STATUS.md` как Known Issue, потом фиксий.
