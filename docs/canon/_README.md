# Canonical Guide Spec (Canon) — README

> **Что это:** Single source of truth для контента Live Character Guide.
> **Где живёт:** `docs/canon/part_NN.md` (один файл на Part master HTML) + `docs/canon/appendix_*.md`.
> **Связанные документы:** `docs/CONTENT_RESTRUCTURE_PLAN.md` (стратегия, iter 6), `STATUS.md` (KI#14 — мотивация Canon).
> **Создан:** iter 7 (2026-06-23).

---

## 1. Зачем нужен Canon

Гайд разросся до ~15 000 строк контента (6 600 master HTML + 6 000 visual-system + 2 500 docs). Одна и та же семантика дублируется 3–5 раз в разных формах: VS-EMBED + текст + таблица + mermaid + example + rule callout. Визуализации **дублируют** текст вместо **замещения** (KI#14).

**Canon решает эту проблему.** Это Markdown-документ, в котором каждая концепция изложена **ровно один раз**. Master HTML = генерируемый артефакт, который выводится из Canon. Визуализации становятся замещающими, а не параллельными.

**Принцип:** агент следующей итерации читает только `docs/canon/part_N.md` + `AGENT_NAVIGATION.md` и понимает **всю** семантику Part N. Master HTML открывается только для редактирования, не для понимания.

---

## 2. Структура Canon

```
docs/canon/
├── _README.md            ← этот файл (правила Canon)
├── part_00.md            ← Part 0: Как читать + TL;DR (iter 38)
├── part_01.md            ← Canon для Part 1 (Foundations)
├── part_02.md            ← Part 2 (Anchors)
├── part_03.md            ← Part 3 (Voice)
├── part_04.md            ← Part 4 (SPINE) — пилот, iter 7
├── part_05.md            ← Part 5 (Psychology)
├── part_06.md            ← Part 6 (CoT)
├── part_07a.md           ← Part 7A (System Prompt)
├── part_07b.md           ← Part 7B (Lorebook)
├── part_08.md            ← Part 8 (Anti-patterns)
├── part_09.md            ← Part 9 (Diagnostics)
├── part_10.md            ← Part 10 (Examples)
├── appendix_mbti.md      ← Appendix A: MBTI
├── appendix_model_table.md ← Appendix B: Model Capability Table
├── appendix_glossary.md  ← Appendix C: Glossary
└── appendix_character_map.md ← Appendix D: Character map (iter 38)
```

**Один файл = один Part master HTML.** Это позволяет агенту загружать в контекст только нужный Part, а не весь гайд.

---

## 3. Markdown Conventions

### 3.1 Заголовки

| Уровень | Назначение | Пример |
|---------|-----------|--------|
| `# H1` | Название Part + brief | `# Part 4: SPINE Framework` |
| `## H2` | Секция (одна на `data-section` в master HTML) | `## 4.1 SPINE Overview` |
| `### H3` | Подсекция | `### GHOST (Призрак)` |
| `#### H4` | Детали (правила, примеры) | `#### Правила GHOST` |

**Принцип:** H2 в Canon ↔ `<section data-section>` в master HTML. Каждый `data-section` ID = одна H2 секция Canon.

### 3.2 Front-matter (метаданные Part)

В начале каждого файла — блок цитаты с метаданными:

```markdown
# Part 4: SPINE Framework

> **Canonical source for:** `src/master/part_04.html`
> **VS elements:** E05 (SPINE chain), E06 (GHOST Layers)
> **Sections:** 11 (p4_spine_overview, p4_ghost, p4_lie, p4_flaw, p4_need, p4_want, p4_spine_full_chain, p4_spine_mapping, p4_spine_check, p4_spine_navigation, p4_ghost_layers)
> **Last synced:** 2026-06-23 (iter 7 — Canon created, master HTML NOT yet migrated)
> **Migration status:** ❌ NOT MIGRATED (iter 8 task)
```

### 3.3 VS-маркеры (вместо встроенных визуализаций)

Вместо SVG/HTML/CSS-разметки используем маркер:

```
[VS: E05 — SPINE Framework. Hex-chain GHOST→LIE→FLAW→NEED→WANT с примерами. Замещает текстовое объяснение цепочки.]
```

**Формат:** `[VS: E0X — краткое описание. Что замещает.]`

- `E0X` — ID visual-system element (см. `visual-system/elements/E0X-*.html`).
- Описание — 1-2 предложения: что визуализация показывает + что она замещает (какой текст удаляем при миграции).
- VS-маркер = указатель, что здесь в master HTML будет `<div class="vs-embed" data-vs-element="E0X">`. Не дублирует контент.

### 3.4 Таблицы

Таблицы остаются — но **только если они содержат уникальные данные**, не продублированные в VS-EMBED или соседних секциях.

**Легитимные таблицы:**
- Mapping SPINE → Anchor type (уникальная информация)
- Примеры персонажей (если они — единственный источник)
- Чек-листы и comparison-таблицы

**Запрещённые таблицы** (дублирование):
- Таблица "наблюдаемые единицы" если VS-EMBED уже показывает те же 5 элементов
- Таблица-описание элементов, если они уже определены в H3-секциях ниже

### 3.5 Примеры — единственный источник

**Принцип:** каждый пример персонажа (Елена, Выщербленный) даётся **ровно один раз** в Canon. В остальных местах — ссылка `[ref: §4.X — пример Елены]`.

**Пример:** цепочка Елены (GHOST = "Предательство редактора") описана в §4.2 GHOST. В §4.5 consistency check — ссылка, не повтор.

### 3.6 Cross-references

Между Canon-файлами — `[ref: part_07a.md §7A.6 — Consequence Driven]`.
Внутри одного Canon-файла — `[ref: §4.2]` или просто `§4.2`.

### 3.7 Запрещено в Canon

- ❌ HTML-теги (`<div>`, `<section>`, `<a>`, `<pre>`, `<code>`)
- ❌ Inline styles (`style="..."`)
- ❌ SVG, CSS, JS-вставки
- ❌ `<div class="callout rule">`, `<div class="infographic">`, `<div class="mermaid">`
- ❌ Дублирование примеров между секциями
- ❌ Дублирование определений (каждая концепция = одно место)

### 3.8 Что остаётся в Canon

- ✅ Определения концепций (по одному на концепцию)
- ✅ Правила (RULE:, RECOMMENDATION:) — как `**RULE:**` выделение
- ✅ Anti-pattern / Solution пары (как `❌` / `✅` списки)
- ✅ Уникальные таблицы (mapping, чек-листы)
- ✅ Один канонический пример на персонажа
- ✅ VS-маркеры вместо визуализаций
- ❌ Устаревшие `infographic`, `mermaid` — не переносим (они подлежат удалению в iter 8+)

### 3.9 Callout labels — English by design

Метки callouts остаются на английском намеренно — это semantic anchors для модели при генерации карточек. Они не русифицируются:

- `**RULE:**` — каноническое правило (нарушение = регрессия качества)
- `**RECOMMENDATION:**` — мягкая рекомендация
- `**EXAMPLE:**` — пример выполнения
- `**ILLUSTRATION:**` — визуальная демонстрация (diff-view, multi-char scene)
- `**TEMPLATE:**` — шаблон для копирования
- `**Bridge:**` — narративный переход между Parts (только 1-2 на гайд, не во всех Parts)
- `**Synthesis:**` — 1-2 предложение summary в конце Part (только для Parts с major conceptual shift)
- `**Cross-ref:**` — pointer на связанную секцию в другом Part
- `**Demonstrates:**` — список принципов, которые карточка демонстрирует (iter 38+)
- `**Annotation:**` — детальный разбор блока карточки (iter 37+)

Тело callouts — на русском (это контент для читателя). Метки — на английском (это parsing anchors для модели).

Уточняющие комментарии внутри секций — на русском с меткой `**Примечание:**` (не semantic anchor, локальное уточнение).

---

## 4. Workflow: Canon-first миграция

Миграция идёт в 2 итерации на Part:

### 4.1 Итерация N (Canon creation)

1. Открыть `src/master/part_N.html` и `visual-system/elements/E0X-*.html` (для используемых VS-элементов).
2. Извлечь семантику: определения, правила, примеры, таблицы с уникальными данными.
3. Дедуплицировать: если концепция повторяется в нескольких секциях — оставить в одной (canonical location), в остальных — cross-ref.
4. Заменить все VS-EMBED / infographic / mermaid на `[VS: E0X — ...]` маркеры.
5. Сохранить как `docs/canon/part_N.md`.
6. Обновить front-matter: `Migration status: ❌ NOT MIGRATED`.
7. **НЕ править master HTML.** Это задача следующей итерации.

### 4.2 Итерация N+1 (Master HTML migration)

1. Прочитать `docs/canon/part_N.md` как источник правды.
2. Открыть `src/master/part_N.html`.
3. Для каждой секции:
   - **Оставить:** `<section data-section>` обёртку, VS-EMBED, уникальные таблицы, правила/чек-листы, примеры (если не в VS-EMBED).
   - **Удалить:** дублирующие `infographic`, `mermaid`, пере-объясняющие абзацы, таблицы с данными из VS-EMBED.
   - **Заменить** пере-объяснения концепций на cross-ref: `<a href="#pX_Y">см. §X.Y</a>`.
4. Запустить `pnpm run validate:master` (0 errors).
5. Запустить `pnpm run qa` (0 critical findings).
6. Visual diff в браузере (`pnpm run dev` → http://localhost:3000).
7. Если регрессия — откатить через `git checkout src/master/part_N.html`.
8. Обновить front-matter Canon: `Migration status: ✅ MIGRATED (iter N+1)`.

### 4.3 Принципы миграции

1. **One Part per iteration.** Не мигрировать несколько Parts за раз.
2. **Canon-first.** Сначала Canon, потом HTML. Не наоборот.
3. **Validate после каждого Part.** `validate:master` + `qa` + visual diff.
4. **Visualizations = замещение.** После миграции VS-EMBED = основная подача, текст = только то, что нельзя визуализировать.
5. **Cross-refs вместо re-explanation.** Концепция определена в одном месте, в остальных — ссылка.
6. **Git-коммит после каждого Part.** Не накапливать изменения.

---

## 5. Migration Status (canonical registry)

| Part | Canon file | Created | Migrated | Iter |
|------|-----------|---------|----------|------|
| Part 0 (concept) | `part_00.md` | ✅ iter 38 | n/a (no master HTML) | iter 38 (NEW) |
| Part 1 | `part_01.md` | ✅ iter 14 | ✅ iter 14 | iter 14 (DONE) |
| Part 2 | `part_02.md` | ✅ iter 14 | ✅ iter 14 | iter 14 (DONE) |
| Part 3 | `part_03.md` | ✅ iter 14 | ✅ iter 14 | iter 14 (DONE) |
| Part 4 | `part_04.md` | ✅ iter 7 | ✅ iter 8 | iter 7–8 (DONE) |
| Part 5 | `part_05.md` | ✅ iter 16 | ✅ iter 16 | iter 16 (DONE) |
| Part 6 | `part_06.md` | ✅ iter 16 | ✅ iter 16 | iter 16 (DONE) |
| Part 7A | `part_07a.md` | ✅ iter 10 | ✅ iter 11 | iter 10–11 (DONE) |
| Part 7B | `part_07b.md` | ✅ iter 16 | ✅ iter 16 | iter 16 (DONE) |
| Part 8 | `part_08.md` | ✅ iter 12 | ✅ iter 12 | iter 12 (DONE) |
| Part 9 | `part_09.md` | ✅ iter 13 | ✅ iter 13 | iter 13 (DONE) |
| Part 10 | `part_10.md` | ✅ iter 16 | ✅ iter 16 | iter 16 (DONE) |
| Appendix A MBTI | `appendix_mbti.md` | ✅ iter 18 | ✅ iter 18 | iter 18 (DONE) |
| Appendix B Model Table | `appendix_model_table.md` | ✅ iter 18 | ✅ iter 18 | iter 18 (DONE) |
| Appendix C Glossary | `appendix_glossary.md` | ✅ iter 18 | ✅ iter 18 | iter 18 (DONE) |
| Appendix D Character Map | `appendix_character_map.md` | ✅ iter 38 | n/a (no master HTML) | iter 38 (NEW) |

**Обновлять эту таблицу при каждом изменении статуса Canon-файла.**

**Все 10 Parts + 4 Appendix + Part 0 (concept) — Canon COMPLETE (iter 18 + iter 38 concept additions).**

---

## 6. Связь с другими документами

| Документ | Роль | Взаимодействие с Canon |
|----------|------|------------------------|
| `src/master/part_N.html` | Production HTML | Выводится из Canon. После миграции — единственный артефакт для рендера. |
| `visual-system/elements/E0X-*.html` | Standalone VS-прототипы | Источник визуализаций. Canon ссылается на E0X через `[VS: E0X — ...]`. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Стратегия миграции | Дорожная карта iter 7..19. Canon — реализация стратегии. |
| `docs/content_map.md` | Concept → section ID mapping | После миграции должен стать mirror Canon (concept → Canon §X.Y). |
| `docs/terminology_dictionary.md` | Term definitions | Canon ссылается на terms; dictionary = flat index, Canon = deep definition. |
| `docs/character_bible.md` | Персонажи | После миграции — bible = данные, Canon = правило вывода данных в карточку. |
| `AGENT_NAVIGATION.md` | Entry document | §7 ссылается на Canon как на "source of truth для контента". |

---

## 7. Anti-patterns (что НЕ делать в Canon)

| # | Anti-pattern | Правильно |
|---|--------------|-----------|
| 1 | Скопировать весь master HTML в Markdown, включая `<div class="callout">` | Извлечь семантику, отбросить разметку |
| 2 | Оставить `infographic` как Markdown-список | Заменить на `[VS: E0X — ...]` маркер |
| 3 | Повторить пример Елены в каждой секции | Один canonical location + `[ref: §4.2]` |
| 4 | Написать "см. master HTML для подробностей" | Canon = источник правды, не ссылка на HTML |
| 5 | Включить устаревший контент "для истории" | Удалить. Git history = для истории. |
| 6 | Смешать Canon creation и HTML migration в одной итерации | Раздельно: iter N = Canon, iter N+1 = HTML |
| 7 | Править Canon без правки STATUS.md (migration status) | Обновлять `_README.md` §5 + STATUS.md |

---

## 8. Validation Checklist (для каждого нового Canon-файла)

- [ ] Front-matter заполнен (Canonical source for, VS elements, Sections, Last synced, Migration status)
- [ ] Каждый `data-section` ID из master HTML имеет соответствующую H2 секцию в Canon
- [ ] Каждый VS-EMBED из master HTML отмечен `[VS: E0X — ...]` маркером
- [ ] Ни одного HTML-тега, inline style, SVG, CSS, JS
- [ ] Ни одного устаревшего `infographic`/`mermaid` (заменены VS-маркерами)
- [ ] Примеры персонажей — каждый в одном canonical location, в остальных cross-ref
- [ ] Определения концепций — каждое в одном месте, не дублируются между секциями
- [ ] Cross-refs на другие Canon-файлы — формат `[ref: part_XX.md §X.Y]`
- [ ] Таблицы — только с уникальными данными, не продублированными в VS-EMBED
- [ ] `_README.md` §5 Migration Status обновлён
- [ ] `STATUS.md` обновлён (Canon created)
- [ ] `worklog.md` — запись итерации

---

## 9. История изменений

> Подробно — последние 3 итерации (54, 55-56). Старые — одной строкой. Полная история — в git.

- **iter 55-56 (2026-07-21):** Все 3 LOW KI закрыты (KI#37/38/39 ✅ CLOSED). KI#37: methodology disclaimer добавлен в `part_01.md §1.1` (canon + master HTML). KI#38: таблица AP в `part_08.md §8.1` сокращена до 4-строчного intro + cross-ref (canonical = VS-EMBED E12). KI#39: 23 HTML-комментария `<!-- Demonstrates: ... -->` удалены из code-блоков `part_10.md §10.1-10.4` (canon + master HTML, 46 удалений суммарно). Decision tree для фреймворков добавлен в `part_05.md §5.1` (4-шаговое дерево: SPINE → Enneagram → OCEAN → MBTI). Recap-чек-листы свёрнуты в `<details>` (§7A.13 Чек-лист перед тестированием + §9.11 Quick Check) — recap-дубликаты правил скрыты, диагностические оставлены. Scenario-метка для §9.3 добавлена (явная формулировка сценария применения). iter 56 deep audit подтвердил отсутствие дальнейших critical дублирований. Все validation gates PASS (96/96 sync). Drift: 89 paragraph drifts (+1 vs iter 53 baseline = disclaimer параграф в §1.1). contentHash CHANGED (7th change — 6 master HTML файлов модифицированы). Shell hash `69d9b813` UNCHANGED.
- **iter 54 (2026-07-21):** Исследовательская итерация — разбор сводного аудита (~22 утверждения) в `docs/AUDIT_REVIEW_ITER54.md`. Итог: 0% верны, 59% частично верны, 18% неверны, 23% субъективны. Найдены 3 LOW-бага (KI#37/38/39, OPEN). Никаких правок гайда — только анализ. contentHash UNCHANGED.
- **iter 53 (2026-07-21):** drift categorization added в `audit_canon_master_drift.py` v1.1→v1.2 (5 categories). Documentation cleanup. contentHash UNCHANGED.
- **iter 52 (2026-07-21):** paragraph-level Jaccard drift detection added в `audit_canon_master_drift.py` v1.0→v1.1. Documentation cleanup. contentHash UNCHANGED.
- **iter 7-51 (2026-06-23..2026-07-21):** Canon scaffold → Part-by-Part migration → KI#13/#16/#20/#21/#22/#23/#28-36 fixes. См. git log для деталей.

---

**Canon = единственный источник правды для контента.** Если в master HTML и Canon расхождение — Canon прав. Если в `docs/character_bible.md` и Canon расхождение — Canon прав (после проверки с пользователем).
