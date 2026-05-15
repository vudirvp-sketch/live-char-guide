# Интеграционная карта — Визуальная система → Сборка руководства

**Версия:** 1.0
**Дата:** 2026-05-16
**Цель:** Маппинг standalone HTML-прототипов → целевые файлы в существующей сборке руководства

## Принцип миграции

1. **Токены первичны.** Все CSS-переменные из `DESIGN-TOKENS.css` сливаются с существующими токенами руководства. Дубликаты — удаляются, конфликтующие — переименовываются с префиксом `--vs-` (visual system).
2. **SVG инлайнится.** Каждый SVG из прототипа становится встроенным компонентом внутри соответствующего `<section>` master-страницы.
3. **JS модуляризуется.** Inline-скрипты прототипов превращаются в ES-модули и подключаются через `type="module"` или динамический import.
4. **Паттерны как shared-стили.** Классы `.p-stack`, `.p-flow`, `.p-tree`, `.p-radial`, `.p-compare`, `.p-blueprint` из `patterns.css` подключаются глобально к оболочке руководства.

---

## Маппинг элементов → части руководства

| Элемент | Прототип | Целевая страница | Контейнер в целевой | Тип встраивания |
|---------|----------|-------------------|---------------------|-----------------|
| Hero | hero/architecture-skeleton.html | index.html (вступительная секция) | `<section id="hero">` | Three.js canvas + HTML labels |
| E01 | E01-card-anatomy.html | part_01.html | `<section id="card-anatomy">` | SVG + CSS panels |
| E02 | E02-assembly-pipeline.html | part_07a.html | `<section id="assembly-pipeline">` | SVG flow + CSS nodes |
| E03 | E03-behavioral-anchor.html | part_02.html | `<section id="behavioral-anchor">` | SVG comparison + CSS panels |
| E04 | E04-embodiment-protocol.html | part_02.html | `<section id="embodiment-protocol">` | CSS depth bars + SVG arrows |
| E05 | E05-spine-framework.html | part_04.html | `<section id="spine-framework">` | SVG cascade nodes |
| E06 | E06-ghost-layers.html | part_04.html | `<section id="ghost-layers">` | SVG concentric rings |
| E07 | E07-voice-hierarchy.html | part_03.html | `<section id="voice-hierarchy">` | SVG bar chart |
| E08 | E08-core-directives.html | part_07a.html | `<section id="core-directives">` | SVG hub-spoke |
| E09 | E09-ocean-pentagon.html | part_05.html | `<section id="ocean-pentagon">` | SVG radar chart |
| E10 | E10-enneagram-spine.html | part_05.html | `<section id="enneagram-spine">` | SVG circle + JS hover |
| E11 | E11-cot-tiers.html | part_06.html | `<section id="cot-tiers">` | CSS staircase |
| E12 | E12-antipattern-catalog.html | part_08.html | `<section id="antipattern-catalog">` | CSS card grid |
| E13 | E13-diagnostic-tree.html | part_09.html | `<section id="diagnostic-tree">` | CSS tree + JS toggle |
| E14 | E14-quality-scale.html | part_09.html | `<section id="quality-scale">` | CSS thermometer |
| E15 | E15-annotated-blueprint.html | part_10.html | `<section id="annotated-blueprint">` | CSS blueprint + JS layer toggle |
| E16 | E16-author-note.html | part_07a.html | `<section id="author-note">` | CSS template cards + JS toggle |
| E17 | E17-sampling-params.html | part_07a.html | `<section id="sampling-params">` | CSS params grid |

---

## Порядок интеграции (рекомендуемый)

### Шаг 1: Общие стили
1. Слить `DESIGN-TOKENS.css` → существующий `src/assets/css/` (или аналогичный)
2. Подключить `shared/patterns.css` и `shared/utilities.css` глобально
3. Подключить `shared/fonts.css` (добавить Geist через Vercel CDN или self-host)
4. Подключить `shared/base.css` (минимальный reset, скроллбар, reduced-motion)

### Шаг 2: Компонентные извлечения
Для каждого элемента:
1. Извлечь SVG из прототипа → `component-extracts/E##-name.svg`
2. Извлечь элементо-специфичный CSS → `component-extracts/E##-name.css`
3. Извлечь JS → `component-extracts/E##-name.js`
4. Создать обёртку-виджет в `widgets/` по существующей архитектуре виджетов

### Шаг 3: Встраивание в master-страницы
Для каждой целевой страницы:
1. Добавить `<section id="...">` с контейнером
2. Встроить SVG + подключить CSS/JS
3. Настроить IntersectionObserver для scroll-анимаций (уже есть в прототипах)
4. Проверить перекрёстные ссылки (badges → другие элементы)

### Шаг 4: Мини-карта навигация
1. Создать глобальный компонент мини-карты (вместо 17 копий)
2. Подключить к оболочке руководства через widget system
3. Синхронизировать активный элемент с текущей страницей

---

## Дедупликация токенов

Следующие токены из `DESIGN-TOKENS.css` могут дублировать существующие в руководстве:

| Токен VS | Возможный дубликат | Действие |
|----------|-------------------|----------|
| `--bg-deep` | `--color-bg-primary` | Слить, оставить `--bg-deep` |
| `--bg-panel` | `--color-bg-secondary` | Слить, оставить `--bg-panel` |
| `--text-primary` | `--color-text-primary` | Слить, оставить `--text-primary` |
| `--text-secondary` | `--color-text-secondary` | Слить, оставить `--text-secondary` |
| `--accent-cyan` | уникальный | Добавить без изменений |
| `--accent-violet` | уникальный | Добавить без изменений |
| `--font-display` | уникальный | Добавить без изменений |
| `--font-heading` | уникальный | Добавить без изменений |
| `--font-body` | может дублировать | Проверить, заменить если совпадает |
| `--font-mono` | уникальный | Добавить без изменений |

Полная карта миграции — в `token-migration.css`.

---

## Файлы компонентных извлечений (component-extracts/)

Каждый файл содержит извлечённый и очищенный фрагмент из прототипа, готовый к встраиванию:

```
component-extracts/
├── E01-card-anatomy.svg          # SVG панели анатомии карточки
├── E01-card-anatomy.css          # Элементо-специфичные стили
├── E02-assembly-pipeline.svg     # SVG конвейера
├── E02-assembly-pipeline.css
├── E03-behavioral-anchor.svg     # SVG сравнения
├── E03-behavioral-anchor.css
├── E04-embodiment-protocol.svg   # SVG стрелки + глубинные бары
├── E04-embodiment-protocol.css
├── E05-spine-framework.svg       # SVG каскад
├── E05-spine-framework.css
├── E05-spine-framework.js        # GHOST expand tooltip
├── E06-ghost-layers.svg          # SVG концентрические кольца
├── E06-ghost-layers.css
├── E07-voice-hierarchy.svg       # SVG bar chart
├── E07-voice-hierarchy.css
├── E08-core-directives.svg       # SVG hub-spoke
├── E08-core-directives.css
├── E09-ocean-pentagon.svg        # SVG radar
├── E09-ocean-pentagon.css
├── E10-enneagram-spine.svg       # SVG эннеаграмма
├── E10-enneagram-spine.css
├── E10-enneagram-spine.js        # Hover mini-cards + keyboard
├── E11-cot-tiers.css             # CSS staircase (no SVG)
├── E12-antipattern-catalog.css   # CSS card grid (no SVG)
├── E13-diagnostic-tree.css       # CSS tree
├── E13-diagnostic-tree.js        # Toggle tree
├── E14-quality-scale.css         # CSS thermometer
├── E15-annotated-blueprint.css   # CSS blueprint
├── E15-annotated-blueprint.js    # Layer toggle
├── E16-author-note.css           # CSS template cards
├── E16-author-note.js            # Template A/B toggle
├── E17-sampling-params.css       # CSS params grid
└── README.md                     # Описание структуры
```

**Примечание:** Файлы в component-extracts/ будут созданы при фактической интеграции (Phase 4 execution). Данная карта описывает планируемую структуру.
