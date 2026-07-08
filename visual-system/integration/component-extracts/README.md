# Component Extracts — HISTORICAL SNAPSHOT (iter 42+)

> **⚠️ HISTORICAL REFERENCE ONLY — NOT USED IN BUILD/RUNTIME**
>
> Эти файлы — снимки Phase 4 integration (iter 7-25), извлечённые из standalone
> HTML-прототипов `visual-system/elements/E##-*.html`. Они **НЕ используются**
> build pipeline (`scripts/build-unified.mjs`, `src/scripts/build-shell-unified.mjs`)
> и **НЕ используются** в runtime. Canonical source для VS-EMBED content:
> - **HTML:** `src/master/*.html` (искать `<!-- VS-EMBED: E## -->`)
> - **CSS:** `src/assets/vs-styles.css` SECTION 5 (Component Extracts E01–E18)
> - **JS:** `src/shell/widgets/vs-*.js` (shared `vs-scroll-observer.js` + element-specific widgets)

## Известный drift (KI#32, iter 42)

Pairwise diff audit (`scripts/audit_component_extracts.py` + `scripts/audit_component_extracts_css.py`)
выявил ожидаемый drift между extracts и текущим состоянием каноничных файлов:

| Тип файла | Drift | Причина |
|-----------|-------|---------|
| `E##-visual.html` (18 файлов) | **18/18 DRIFT** | KI#13 (iter 20-24, inline `style="..."` → `vs-ki13-*` CSS classes в master), KI#22 (iter 34, callout CSS scoping для E15), структурные правки (wrapper `<!-- REPLACED BY VISUAL SYSTEM -->` markers, annotation-layer attributes) |
| `E##-styles.css` (18 файлов) | **16/18 MATCH** / 2 DRIFT | 16 файлов 1:1 соответствуют SECTION 5 в `vs-styles.css`. E15 (+13/-8, KI#22 callout scoping) и E18 (+16/-8, iter 25 post-creation changes) с drift |
| `E##-script.js` (18 файлов) | **18/18 DRIFT** | KI#20 (iter 32, per-element IntersectionObserver → shared `vs-scroll-observer.js`), KI#16 (iter 19, inline `<script>` → external ES module widgets), `document.querySelectorAll` → scoped search |

Drift является **ОЖИДАННЫМ и ПРИЕМЛЕМЫМ** — extracts создавались как промежуточный
артефакт интеграции и не обновлялись при последующих правках каноничных файлов.

## Если extracts нужны как актуальный reference

Regenerate from master:

1. **`E##-visual.html`** — для каждого E## извлечь VS-EMBED block из `src/master/<target>.html`
   (между `<!-- VS-EMBED: E## -->` и `<!-- /VS-EMBED -->`), strip wrapper
   `<div class="vs-embed">` + leading HTML comment header, записать в extract
   с обновлённым comment header (Element/Source/Pattern/Dependencies/Notes).
2. **`E##-styles.css`** — copy соответствующего блока из `src/assets/vs-styles.css` SECTION 5.
3. **`E##-script.js`** — для элементов со специфическим widget (`vs-e10-enneagram.js`,
   `vs-e13-diagnostic.js`, `vs-e15-blueprint.js`, `vs-e16-author-note.js`) — copy
   widget content. Для остальных — extract noting, что анимации обрабатываются
   shared `vs-scroll-observer.js`.
4. Запустить `python3 scripts/audit_component_extracts.py` и
   `python3 scripts/audit_component_extracts_css.py` для верификации.

## Формат файлов (историческая справка)

Для каждого элемента (E01–E18):

- `E##-visual.html` — Self-contained HTML with inline CSS/JS (изначально)
- `E##-styles.css`  — Extracted CSS
- `E##-script.js`   — Extracted JS

## Правила извлечения (историческая справка)

1. SVG: Убрать inline style, оставить только structural markup. Стили через CSS-классы.
2. CSS: Убрать ссылки на DESIGN-TOKENS.css (используются глобально). Оставить только элементо-специфичные правила.
3. JS: Обернуть в ES-модуль. Заменить `document.querySelectorAll` на scoped-поиск внутри контейнера элемента.
4. Все тексты на русском. Технические термины остаются на английском (см. список в QA-CHECKLIST.md).
5. ARIA: Сохранять все ARIA-атрибуты (`tabindex`, `role`, `sr-only` spans) при извлечении. Не удалять атрибуты доступности.
