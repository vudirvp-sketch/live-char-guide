# Live Character Guide

> **Инженерный пайплайн для RP-карточек персонажей. От SPINE до деплоя. Для моделей 12B–32B+.**

![Version](https://img.shields.io/badge/version-8.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)

## Ссылки

| Ресурс | Ссылка |
|--------|--------|
| **Онлайн-гайд** | [vudirvp-sketch.github.io/live-char-guide](https://vudirvp-sketch.github.io/live-char-guide/) |
| **Changelog** | [CHANGELOG.md](./CHANGELOG.md) |
| **Contributing** | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| **Transition Guide (v7→v8)** | [docs/transition_guide.md](./docs/transition_guide.md) |

---

## Единый линейный гайд

v8 — единый гайд без слоёв. Весь контент читается последовательно от Part 1 до Part 10. Нет деления на «базовый»/«продвинутый» — все инструменты обязательны к изучению. Различия в возможностях моделей отмечены inline через `[MODEL_NOTE: text]`.

### Структура гайда

| Part | Название | Секций | Содержание |
|------|----------|--------|------------|
| 1 | Базовые блоки карточки | 5 | Card Anatomy, 3 Key Principles, Token Budget, Assembly Overview, Top-3 Errors |
| 2 | Поведенческие якоря | 6 | T→A→P, Anchor Rules, Anchor Examples, Embodiment, Env. Reactivity, Sensory Anchors |
| 3 | Голос и изоляция | 8 | Voice Isolation, Influence Hierarchy, Examples Rules, Examples Quality, Greeting, Voice Leak, Joker Case, Multi-char |
| 4 | SPINE Framework | 11 | 5 элементов (GHOST→LIE→FLAW→NEED→WANT), Ghost Layers, Full Chain, SPINE→Anchor Mapping, SPINE Check, Navigation |
| 5 | Психологический инструментарий | 6 | OCEAN, Enneagram, MBTI, Cross-instrument Map, Wings, OCEAN×Enneagram |
| 6 | Цепочка рассуждений (CoT) | 6 | Bridge (reframed), Basics, Tiers, Tier 2, Tier 3, CoT-anchors |
| 7 | Техническая реализация | 16 | SP, CORE DIRECTIVES (все 7), Tone Frame, Format Lock, AN, Structured Inject, Lorebook, Params, XML/API/4K, Assembly Pipeline |
| 8 | Анти-паттерны | 17 | 16 анти-паттернов (AP-1–AP-16), последовательная нумерация |
| 9 | Диагностика и тестирование | 11 | Quality Scale, One Change Rule, Checklist, Problems, Symptom Table, Decision Tree, Test Scenarios, Pre-Deploy |
| 10 | Полные примеры карточек | 6 | Elena, Geralt, Edward, Walter, Omnis-Zeta, Vysherblenny |

**Итого: 92 секций, 10 Parts.**

---

## Ключевые концепции

### SPINE Framework

Фреймворк глубинной мотивации персонажа — 5 элементов в причинно-следственной цепочке:

| Элемент | Описание |
|---------|----------|
| **GHOST** | Событие прошлого, сформировавшее LIE и FLAW |
| **LIE** | Ложная установка о себе/мире, возникшая из GHOST |
| **FLAW** | Поведенческий дефект, блокирующий NEED (возникает из LIE) |
| **NEED** | Истинная потребность (часто противоречит WANT) |
| **WANT** | Осознанное желание персонажа (маскирует NEED) |

Для простых персонажей GHOST и LIE могут быть неявными — цепочка работает и без них.

### 3 ключевых принципа

| # | Принцип | Почему важно |
|---|---------|--------------|
| 1 | **Якорь = Trigger → Action → Price** — поведение задаётся якорями | Каждый якорь обязан иметь Цена — без неё модель не показывает уязвимость |
| 2 | **Голос — только в Examples и Greeting** | Модель считывает характер из примеров диалога, а не из описания |
| 3 | **Психология — только в Description** | SPINE, OCEAN и другие элементы размещаются исключительно в блоке Description |

---

## Архитектура проекта

### Как работает билд

```
src/master/part_*.html (авторский контент)
        │
        ▼
┌─────────────────────────────────────┐
│  build-unified.mjs                   │
│  Парсит HTML, извлекает все секции   │
│  Генерирует parts/ (unified)         │
└─────────────────────────────────────┘
        │
        ▼
build/parts/*.html + manifest.json
        │
        ▼
┌─────────────────────────────────────┐
│  build-shell-unified.mjs             │
│  Копирует shell + parts + data       │
│  → dist/ для GitHub Pages            │
└─────────────────────────────────────┘
```

### Структура репозитория

```
live-char-guide/
├── src/
│   ├── master/              # ← АВТОРЫ: редактируют тут
│   │   └── part_*.html      # Unified HTML-файлы
│   ├── shell/               # ← ИНФРАСТРУКТУРА: не трогать
│   │   ├── index.html       # Shell (auto-load)
│   │   ├── styles.css       # Стили
│   │   └── lazy-loader.js   # Динамическая загрузка контента
│   ├── scripts/             # Build-скрипты
│   └── VERSION              # Источник версии
│
├── data/                    # Данные виджетов
│   ├── glossary.json        # Глоссарий
│   ├── ocean.json           # OCEAN пентагон
│   ├── enneagram.json       # Эннеаграмма
│   ├── mbti.json            # MBTI типы
│   ├── character_schema.json # JSON-схема карточки
│   ├── anchor-redirects.json # Редиректы для старых ID
│   └── test_scenarios.json  # Сценарии тестирования
│
├── build/                   # Сгенерированные части (gitignored)
│   ├── parts/               # Unified parts
│   ├── build-manifest.json
│   └── section-registry.json
│
├── dist/                    # Деплой на GitHub Pages (gitignored)
│
├── scripts/                 # Скрипты валидации
│   ├── build-unified.mjs
│   ├── validate-artifact.mjs
│   ├── validate-migration.mjs
│   └── *.py                 # Python-валидаторы
│
├── tests/                   # Тесты
├── docs/                    # Документация (не входит в билд)
│   ├── architecture.md
│   ├── content_map.md
│   ├── transition_guide.md  # v7 → v8 миграция
│   └── ...
│
└── package.json
```

### Владение директориями

| Директория | Владелец | Кто редактирует |
|------------|----------|-----------------|
| `src/master/` | Автор | Авторы контента |
| `src/shell/` | Инфраструктура | Только через request |
| `data/` | Shared | Авторы (данные), Инфраструктура (схемы) |
| `docs/` | Автор | Авторы |
| `build/` | Generated | Авто-генерация |
| `dist/` | Generated | Авто-генерация |
| `scripts/` | Инфраструктура | Инфраструктура |

---

## Авторский workflow

### Разметка мастер-файлов

Каждый `src/master/part_*.html` содержит секции с атрибутами:

```html
<section data-section="p2_basic_anchors" data-toc-nav>
  <h2>Заголовок секции</h2>
  <!-- Контент виден всем читателям -->
</section>
```

### Атрибуты секций

| Атрибут | Обязателен | Формат | Пример |
|---------|------------|--------|--------|
| `data-section` | Да | `p{N}_{topic}` | `data-section="p4_spine_overview"` |
| `data-toc-nav` | Нет | boolean | `data-toc-nav` |

### Запрещено в мастер-файлах

- `<style>` блоки → все стили в `src/shell/styles.css`
- `<script>` блоки → все скрипты в `src/shell/lazy-loader.js`
- `<link>` элементы
- `<meta>` элементы
- Контент вне `<section data-section>`
- `data-layer` атрибуты (удалены в v8)
- `data-layer-switch` атрибуты (удалены в v8)

### Пошаговый workflow

```bash
# 1. Редактируете мастер-файл
vim src/master/part_01.html

# 2. Запускаете билд
pnpm run build

# 3. Проверяете валидацию
pnpm run validate

# 4. Запускаете локально для проверки
pnpm run dev
# Откроется http://localhost:3000

# 5. Коммитите изменения
git add src/master/part_01.html
git commit -m "feat: update Part 1 content"
git push
```

---

## Разработка

### Требования

- Node.js >= 20
- pnpm 10.x
- Python 3.10+ (для скриптов валидации)

### Установка

```bash
git clone https://github.com/vudirvp-sketch/live-char-guide.git
cd live-char-guide
pnpm install
```

### Команды

```bash
# Билд
pnpm run build          # Полный билд (unified + shell)
pnpm run build:unified  # Только unified билд
pnpm run build:shell    # Только shell билд
pnpm run build:watch    # Watch-режим

# Валидация
pnpm run validate       # Валидация билда
pnpm run validate:master # Валидация мастер-файлов
pnpm run version:check  # Проверка синхронизации версий

# Тесты
pnpm test               # Все тесты
pnpm run test:unit      # Unit-тесты
pnpm run test:integration  # Интеграционные тесты

# Разработка
pnpm run dev            # Билд + локальный сервер (port 3000)
pnpm run serve          # Только сервер
pnpm run lint           # ESLint
```

### Чек-лист перед PR

- [ ] `pnpm run build` завершается без ошибок
- [ ] `pnpm run validate` проходит
- [ ] `pnpm test` проходит
- [ ] Все секции имеют `data-section` (без `data-layer`)
- [ ] Нет запрещённых элементов в мастер-файлах
- [ ] Версии синхронизированы (`src/VERSION` = `package.json`)

---

## Деплой

Проект использует GitHub Pages с автоматическим деплоем:

1. Push в `main` ветку
2. GitHub Actions собирает и деплоит автоматически
3. Доступно на: https://vudirvp-sketch.github.io/live-char-guide/

---

## Версия

**Текущая версия:** 8.0.0

См. [CHANGELOG.md](./CHANGELOG.md) для истории изменений.

Версия синхронизируется в 4 местах:
1. `package.json` — поле `version`
2. `src/VERSION` — plain text файл
3. `data/character_schema.json` — поле `version`
4. Build output (`build-manifest.json`, `manifest.json`)

---

## Лицензия

MIT License — см. [LICENSE](LICENSE) для деталей.

---

**Автор:** TITAN FUSE Team
