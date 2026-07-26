# Live Character Guide — Agent Navigation

> **Entry document.** Read this first. Текущая версия: **9.2.6**. Live-char-guide — инженерный пайплайн для RP-карточек персонажей (от SPINE до деплоя, для моделей 12B–32B+). Единый линейный гайд. Актуальный статус — в `STATUS.md`, история итераций — в `worklog.md`, Canon (источник правды) — в `docs/canon/`, Research — в `docs/research/`. Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED, 96 секций, 96/96 canon→master sync PASS.

---

## 1. Where Things Are

| Directory | Purpose | Rules |
|-----------|---------|-------|
| `src/master/` | Author content — 10 Parts (`part_01..10.html`) + 3 appendix (`mbti/model_table/glossary`). 96 секций, ~6 600 строк HTML. | **АВТОРЫ редактируют тут.** Все секции в `<section data-section>`. Запрещены `<style>` / `<script>` / `<link>` / `<meta>`. |
| `src/shell/` | Infrastructure shell — `index.html` (auto-load), `styles.css`, `lazy-loader.js`, `event-bus.js`, `widgets/` (15 виджетов). | **НЕ ТРОГАТЬ при написании Parts.** Изменения — через request к infrastructure. |
| `src/shell/widgets/` | 15 виджетов: `ocean-insight`, `enneagram-builder`, `mbti-composer`, `persona-cross`, `persona-synthesis`, `blueprint-viewer`, `diagnostic-tree`, `vs-mini-map`, `author-note-viewer`, `widget-utils`, `vs-scroll-observer`, `vs-e10-enneagram`, `vs-e13-diagnostic`, `vs-e15-blueprint`, `vs-e16-author-note`. | Markup в HTML, data в `data/*.json`, behavior в `lazy-loader.js`. |
| `src/assets/` | Static assets — `favicon.svg`, `preview-card.png`, `vs-styles.css`, `fonts/`. | Читается `build-shell-unified.mjs` (ASSETS_SRC = `src/assets/`). |
| `src/scripts/` | Build-скрипт `build-shell-unified.mjs` (копирует shell + parts + data → `dist/`). | Запускается через `pnpm run build:shell`. |
| `src/VERSION` | Plain text файл с версией. | Синхронизирован с `package.json` + `data/character_schema.json` + build manifest. |
| `data/` | JSON-данные виджетов: `glossary.json`, `ocean.json`, `enneagram.json`, `mbti.json`, `character_schema.json`, `anchor-redirects.json`, `test_scenarios.json`. | Авторы — данные. Инфраструктура — схемы. **Не хардкодить widget data в JS.** |
| `scripts/` | Build + validation скрипты. **package.json-wired:** `build-unified.mjs`, `validate-artifact.mjs`, `validate-master.mjs`, `version-sync.mjs`. **QA scripts:** `csp_check.mjs`, `bundle_check.mjs`, `contrast_checker.mjs`, `check_english.py`, `check_syntax_mix.py`, `check-doc-versions.mjs`, `test-interactive.mjs`. | `pnpm run <script>` для wired. `pnpm run qa:*` для ad-hoc QA. |
| `tests/` | Node test runner: `test-build.mjs`, `test-validate-artifact.mjs`, `test-version-sync.mjs`, `widget-smoke.mjs`, `visual-parity.mjs`, `tests/integration/test-full-build.mjs`. | `pnpm test` запускает все. |
| `docs/` | Техническая документация (не входит в билд). | Update при структурных изменениях. См. §7. |
| `visual-system/` | Visual system prototype: `PLAN.md`, `DESIGN-TOKENS.css`, `shared/`, `elements/` (E01-E18), `integration/` (component-extracts). | Isolated-first development strategy. |
| `parts/`, `widgets/`, `assets/`, `event-bus.js`, `data/`, `index.html`, `build.hash` | **Root fallbacks** — regenerated на каждом `pnpm run build` из `dist/`. Committed to git для GitHub Pages backward compat. | **НЕ РЕДАКТИРОВАТЬ напрямую.** Все правки — в `src/master/`, `src/shell/`, `src/assets/`, `data/`. |
| `dist/` | Deployment output (gitignored). | Авто-генерация → GitHub Pages. |

---

## 2. Build Pipeline

```
src/master/part_*.html (авторский контент)
        ↓
scripts/build-unified.mjs → parts/*.html (unified) + manifest.json
        ↓
src/scripts/build-shell-unified.mjs → dist/ для GitHub Pages + root fallbacks
        ↓
dist/ (deployed to GitHub Pages)
```

### Команды

```bash
pnpm install              # Установка зависимостей (Node >= 20, pnpm 10.x)
pnpm run build            # Полный билд (unified + shell)
pnpm run validate         # Валидация билда
pnpm run validate:master  # Валидация мастер-файлов
pnpm run version:check    # Проверка синхронизации версий
pnpm test                 # Все тесты
pnpm run qa               # Aggregate QA (csp + bundle + english + syntax + doc-versions)
```

### Деплой

```bash
pnpm run build              # Пересобрать dist/ + root fallbacks
pnpm run validate           # Валидация билда
pnpm run validate:master    # Валидация мастер-файлов
git add -A                  # Включая regenerated root fallbacks
git commit -m "iter N: <description>"
git push origin main        # Триггер GitHub Actions → GitHub Pages
# Онлайн через ~30-60 сек: https://vudirvp-sketch.github.io/live-char-guide/
```

**Что входит в build hash (функционально деплоится):** `src/master/*.html`, `src/shell/`, `src/assets/`, `data/*.json`, `parts/` (root fallbacks).

**Что НЕ входит в build hash (doc-only, НЕ деплоится):** `docs/canon/*.md`, `docs/*.md`, root `*.md`, `visual-system/`, `scripts/`, `tests/`.

**Критичный invariant:** Build hash computed only from `src/shell/index.html`. Comment edits + content additions в `src/master/*.html` НЕ влияют на hash.

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
  <!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->
  <!-- canonical: <canonical section name> -->
</section>
```

| Атрибут | Обязателен | Формат | Пример |
|---------|------------|--------|--------|
| `data-section` | Да | `p{N}_{topic}` | `data-section="p4_spine_overview"` |
| `id` | Да (= data-section) | `p{N}_{topic}` | `id="p4_spine_overview"` |
| `data-toc-nav` | Нет | boolean | `data-toc-nav` |

### Naming Convention

Pattern: `p{part_number}_{topic}` (например `p1_card_overview`, `p7a_core_directives`, `p8_ap15_ocean_overload`). Каждый `data-section` ID должен быть уникален во всём master guide.

### Запрещено в мастер-файлах

- `<style>` блоки → все стили в `src/shell/styles.css`.
- `<script>` блоки → все скрипты в `src/shell/lazy-loader.js`.
- `<link>` / `<meta>` элементы.
- Контент вне `<section data-section>`.
- `data-layer` / `data-layer-switch` атрибуты (удалены в v8).
- Markdown patterns в HTML (используй HTML-теги).

---

## 4. Widget Architecture

### Markup в HTML, Data в JSON, Behavior в JS

15 виджетов. Markup — в `src/master/*.html` (через `<div data-widget="...">`), data — в `data/*.json`, behavior — в `src/shell/widgets/*.js`. JS только читает данные, не хардкодит.

### Widget Data Files

| Widget | Data File |
|--------|-----------|
| `ocean-insight` | `data/ocean.json` |
| `enneagram-builder` / `vs-e10-enneagram` | `data/enneagram.json` |
| `mbti-composer` | `data/mbti.json` |
| `persona-cross` / `persona-synthesis` | `data/character_schema.json` |
| Glossary | `data/glossary.json` |
| Anchor redirects | `data/anchor-redirects.json` |
| Test scenarios | `data/test_scenarios.json` |

### Widget Lifecycle

1. `lazy-loader.js` сканирует DOM при scroll-into-view.
2. Загружает соответствующий `src/shell/widgets/<widget>.js` динамически.
3. Widget инициализируется, читает `data/*.json` через `fetch()`.
4. `event-bus.js` координирует inter-widget events.

---

## 5. Core Rules

### 3 ключевых принципа (§1.4)

1. **Anchor = Trigger → Action → Price** — каждый Anchor имеет физическую Цену в той же сцене.
2. **Голос — только в Examples и Greeting** — лингвистический голос (слова, синтаксис) = только Examples; физическая характеристика голоса (тембр, хрип) = Description как часть Embodiment.
3. **Психология — в Description компактно, в тегах, не нарративом** — SPINE/OCEAN/Enneagram как `<spine>`/`<ocean>`/`<enneagram>` теги, не нарратив. Никогда в System Prompt.

### SPINE Framework

5 элементов: GHOST (прошлая травма) → LIE (ложная установка) → FLAW (поведенческий дефект) → NEED (истинная потребность) → WANT (осознанное желание).

### CORE DIRECTIVES (7 шт, в System Prompt)

На английском (на 12B моделях английские инструкции соблюдаются стабильнее ~15–20%):
1. Show Never Tell
2. Embodiment First
3. Spatial & Anatomical Lock
4. Environmental Reactivity
5. Influence Boundary
6. Consequence Driven
7. Format Lock

### Version Control

Версии синхронизированы в 4 местах: `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest. `pnpm run version:check` проверяет sync.

---

## 6. Frequent Pitfalls

### Базовые правила master HTML

1. **`<style>` / `<script>` forbidden в мастер-файлах** — все стили в `src/shell/styles.css` или `src/assets/vs-styles.css`, скрипты в `src/shell/lazy-loader.js` или `src/shell/widgets/*.js`. Inline styles forbidden. Inline scripts forbidden (CSP compliance).
2. **Контент вне `<section data-section>`** — весь контент в master HTML должен быть внутри section с `data-section` атрибутом.
3. **Heading hierarchy** — `<h1>` один на страницу, `<h2>` для секций, `<h3>` для подсекций. Не прыгать через уровни.
4. **Английские термины в Russian prose** — 3+ слова English вне allowed contexts триггерят `check_english.py`. Baseline: 24 English leaks by design (Tone Frame strings, SP directives, part_10 examples, Quality Grade, Token Budget Check).
5. **CSS class creation без approval** — авторы используют только компоненты из `docs/components.md`. Новые классы — через infrastructure approval.
6. **Hardcoded widget data в JS** — все данные в `data/*.json`. JS только читает.

### Build и деплой

7. **Root fallbacks vs canonical sources** — top-level `widgets/`, `assets/`, `parts/`, `event-bus.js`, `data/`, `index.html`, `build.hash` это **regenerated root fallbacks**, НЕ дубликаты. Все правки — в canonical sources (`src/master/`, `src/shell/`, `src/assets/`, `data/`).
8. **Версии в 4 местах** — `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest. `pnpm run version:check` проверяет sync.
9. **Mermaid CDN dependency** — Mermaid.js грузится с `cdn.jsdelivr.net`. CSP для Mermaid v11 worker: `worker-src 'self' blob:;`.
10. **`noscript` в build artifact** — должен присутствовать. Не удалять.
11. **Widget guards** — `blueprint-viewer destroy()`, `persona-cross infinite loop guard`, `Clipboard API guard` (`if (navigator.clipboard)`) — не удалять.

### Visual System

12. **`viz > dry text` principle** — визуализация = **замещение**, не **дополнение**. Если VS-EMBED показывает концепцию — текст не должен её пере-объяснять. Unique визуализации не удаляются даже при дублировании.
13. **VS scroll-animation invariant** — все animation classes в `src/assets/vs-styles.css` должны быть покрыты либо `SCROLL_ENTER_SELECTOR` в `vs-scroll-observer.js` (11 classes), либо `scroll-enter` class. Audit: `python3 scripts/audit_vs_embeds.py`.
14. **CSS scoping invariant** — VS-EMBED element CSS selectors должны быть scoped к element-specific parent (`.blueprint-area`, `.funnel-stack`, `.spine-flow`, etc.).
15. **VS elements registry** — 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5.

### Canon sync и drift detection

16. **Canon → master HTML sync** — `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. Regression test: `python3 scripts/audit_canon_master_sync.py` (96/96 PASS).
17. **Drift detector** — `python3 scripts/audit_canon_master_drift.py` — informational, exit 0. ~88 paragraph drifts expected (VS-EMBEDs replace text).
18. **Callout class policy** — разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important`.
19. **Callout labels English** — метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. Тело callouts — на русском.
20. **YAML front-matter** — все canon-файлы (кроме `_README.md`) используют YAML front-matter.
21. **OCEAN labeling consistency** — extreme = строго `<30` или `>70`; cautious zone = `30–40` / `60–70`. При рассинхроне bible vs canon Part 10 — правится bible (principle: guide's role as example takes priority).
22. **OCEAN format consistency** — канонический формат: compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE). Pipes и commas запрещены в `<ocean>` тегах. Bible-формат (per-dimension с объяснениями) — допустим как documentation, не card content.
23. **Anchors format convention** — `<anchors>` XML = canonical format across src/master/ and parts/. KI#58 closed (iter 95): all 4 cards now use `<anchors>` XML in parts/. Все правки Anchors — в src/master/ в `<anchors>` XML.
24. **CORE_DIRECTIVES shorthand convention** — `{{CORE_DIRECTIVES — канонический шаблон → Part 7A}}` accepted as convention (D4, iter 93). Shorthand = navigational reference per «одно определение — одно место».

### Anchor navigation

22. **Все `<section data-section="X">` в `src/master/*.html` имеют `id="X"`** — браузерный anchor mechanism (`<a href="#X">`) работает нативно. При добавлении новой секции — ВСЕГДА добавлять `id` атрибут.

### Новые баги и противоречия

23. **При обнаружении новых багов** — сначала документировать в `STATUS.md` как KI#N, потом фиксить.

---

## 7. Documentation Map

| File | When to Update |
|------|----------------|
| `AGENT_NAVIGATION.md` | При структурных изменениях (этот файл) |
| `STATUS.md` | При изменении статуса (current iter + Known Issues + Roadmap) |
| `worklog.md` | Каждая итерация — append новый Task ID section |
| `PLAN.md` | При пересмотре docs-restructure плана |
| `README.md` | При изменении возможностей / команд / структуры |
| `CHANGELOG.md` | При release (MAJOR.MINOR.PATCH) |
| `CONTRIBUTING.md` | При изменении workflow контрибьюторов |
| `docs/architecture.md` | При структурных изменениях |
| `docs/content_map.md` | При добавлении/удалении секций |
| `docs/components.md` | При добавлении новых CSS-компонентов |
| `docs/terminology_dictionary.md` | При добавлении новых терминов |
| `docs/character_bible.md` | При изменении canonical персонажей |
| `docs/canon/_README.md` | При изменении правил Canon |
| `docs/canon/part_NN.md` | При создании/обновлении Canonical Guide Spec для Part |
| `docs/research/guide_analysis_consolidated.md` | Консолидированный анализ гайда (iter 73+). 12 разделов: противоречия C1–C15, дубли D1–D20, чек-листы, приоритизированные предложения P1/P2/P3. |
| `docs/research/research_plan.md` | План верификации и правок iter 74+ (Фазы 1–5). |

---

## 8. Roadmap (iter 80+)

Текущее состояние: **iter 95 COMPLETE — E2 dead weight cleanup + KI#58 Anchors sync.** All Phases A–E closed. All KIs closed. Next: build regeneration (iter 96+).

| Итерация | Задача | Статус |
|----------|--------|--------|
| iter 81 | A1 — Elena SP: Tone Frame + OOC | ✅ COMPLETE |
| iter 82 | A2–A4 — Walter SP + `<identity>` + LIE fix | ✅ COMPLETE |
| iter 83 | A5 — Omnis-Zeta Anchors: physical Prices | ✅ COMPLETE |
| iter 84 | A6 — Vyshcherblenny GHOST: shorten to concrete event | ✅ COMPLETE |
| iter 85 | A7–A8 — All cards: `<anchors>` XML + Tone Frames expand | ✅ COMPLETE |
| iter 86–88 | B1–B4 — Examples enrichment (4 cards) | ✅ COMPLETE |
| iter 89–90 | C1–C4 — Bible sync (Walter / Omnis / Vyshcherblenny / Elena) | ✅ COMPLETE |
| iter 91 | D1–D4 — Guide self-contradictions | ✅ COMPLETE (iter 93) |
| iter 94 | E1/KI#60/KI#61/KI#62 — Elena Voice leak + Walter sync + audit script | ✅ COMPLETE |
| **iter 95** | **E2/KI#58 — Dead weight cleanup + Anchors parts/ sync** | **✅ COMPLETE** |
| iter 96+ | Build regeneration (`pnpm run build`) + V8/V9 decisions | LOW |
| deferred | V8/V9 Decision items — после обсуждения с автором | — |

Полная дорожная карта: `docs/research/examples_audit_iter80.md` §10 (Phases A–E). Canon migration status: `docs/canon/_README.md` §5.

---

## 9. Cross-Reference Pairs

> Per IMP-48: when section A references section B, B MUST reference back to A.

### v9.1 Restructure Changes

- `p1_assembly_pipeline` DELETED → replaced by `p1_pipeline_ref` (forward ref to Part 7A)
- `p1_token_budget` MOVED → now `p7a_token_budget` in Part 7A
- `p10_geralt` / `p10_edward` DELETED
- New sections: `p1_value_proposition`, `p7a_token_budget`

### Known Cross-Reference Pairs

| # | Source | Target | Status |
|---|--------|--------|--------|
| 1 | `p1_top3_problems` | `p9_basic_checklist` | ✅ back-link |
| 2 | `p7a_system_prompt` | `p7a_core_directives` | ✅ sub-section |
| 3 | `p7a_system_prompt` | `p7a_tone_frame` | ✅ sub-section |
| 4 | `p7b_lorebook_basics` | `p7b_lorebook_mechanics` | ✅ callout link |
| 5 | `p7a_authors_note` | `p7b_lorebook_mechanics` | ✅ upstream |
| 6 | `p7b_lorebook_advanced` | `p7a_authors_note` | ✅ upstream |
| 7 | `p7b_lorebook_advanced` | `p7b_structured_inject` | ✅ forward only |
| 8 | `p4_spine_navigation` | `p7a_xml_tags` | ✅ downstream |
| 9 | `p10_omnis` | `p4_ghost_layers` | ✅ back-link (TP-15) |
| 10 | `p9_additional_problems` | `p1_top3_problems` | ✅ back-link |
| 11 | `p10_elena` | `p2_anchor_examples` | ✅ back-link |
| 12 | `p1_card_overview` | `p7a_token_budget` | ✅ forward ref |
| 13 | `p1_card_overview` | `p7a_assembly_pipeline` | ✅ forward ref |
| 14 | `p1_value_proposition` | — | ✅ standalone |

---

## 10. Полезные ссылки

| Ресурс | URL |
|--------|-----|
| Онлайн-гайд | https://vudirvp-sketch.github.io/live-char-guide/ |
| Repository | https://github.com/vudirvp-sketch/live-char-guide |
| Issues | https://github.com/vudirvp-sketch/live-char-guide/issues |
| Источник паттерна навигации | https://github.com/vudirvp-sketch/poe2-regex-ru |

---

**Подсказка следующему агенту:** Перед стартом новой итерации прочитай `STATUS.md` (актуальный статус, Known Issues, Roadmap), `worklog.md` (последняя итерация подробно), этот файл (§5 Core Rules, §6 Frequent Pitfalls), `docs/research/examples_audit_iter80.md` §10 (Phases A–E, iter 81–92), `docs/canon/_README.md` (Canon rules). **Принцип:** «Лучше недоделать, чем сломать». Одна правка = одна итерация. Если найден новый баг — сначала документируй в `STATUS.md` как KI#N, потом фиксий.
