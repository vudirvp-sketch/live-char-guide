# Live Character Guide

> **Инженерный пайплайн для RP-карточек персонажей. От SPINE до деплоя. Для моделей 12B–32B+.**

![Version](https://img.shields.io/badge/version-6.2.2-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)

## Ссылки

| Ресурс | Ссылка |
|--------|--------|
| **Онлайн-гайд** | [vudirvp-sketch.github.io/live-char-guide](https://vudirvp-sketch.github.io/live-char-guide/) |
| **Changelog** | [CHANGELOG.md](./CHANGELOG.md) |
| **Contributing** | [CONTRIBUTING.md](./CONTRIBUTING.md) |

---

## Система слоёв

Гайд поддерживает три уровня глубины с **кумулятивной видимостью**:

```
L1 ⊂ L2 ⊂ L3
```

| Слой | Название | Токены | Время | Для кого | Что добавляет |
|------|----------|--------|-------|----------|---------------|
| **L1** | Минимальный | 400-800 | ~15 мин | Новички, 4K контекст, 12B модели | Базовые блоки, 3-5 якорей, 2 примера |
| **L2** | Глубокий | 800-1500 | ~30 мин | Опытные, 8K+ контекст, 12B-32B | +SPINE (WANT/NEED/FLAW), OCEAN/Enneagram, FLAW-якоря, 5-7 якорей |
| **L3** | Экспертный | 1500+ | ~60 мин | Эксперты, 32K+ контекст, API | +LIE/GHOST/GHOST Layers, CoT, XML/API, 7-12 якорей |

### Принцип кумулятивности

- **L3** показывает контент L1 + L2 + L3
- **L2** показывает контент L1 + L2
- **L1** показывает только контент L1

### Прямые ссылки на слои

```
https://vudirvp-sketch.github.io/live-char-guide/?layer=2
```

---

## Ключевые концепции

### SPINE Framework

Фреймворк глубинной мотивации персонажа:

| Элемент | Описание | Слой |
|---------|----------|------|
| **WANT** | Осознанное желание персонажа | L2+ |
| **NEED** | Истинная потребность (часто противоречит WANT) | L2+ |
| **FLAW** | Поведенческий дефект, блокирующий NEED | L2+ |
| **LIE** | Ложная установка о себе/мире | L3 |
| **GHOST** | Событие прошлого, сформировавшее LIE | L3 |

### 5 базовых правил

| # | Правило | Почему важно |
|---|---------|--------------|
| 1 | **OCEAN: 1-2 экстремальных полюса** — значения <30 или >70 | 3+ полюса = внутренняя противоречивость |
| 2 | **Цена обязательна** — каждый якорь имеет физическую реакцию | Без цены модель не показывает уязвимость |
| 3 | **Голос только в Examples** — никогда в Description | Модель копирует паттерны, не следует инструкциям |
| 4 | **GHOST только в Description** — никогда в System Prompt | Психология в SP ломает поведение |
| 5 | **Формат якоря: Триггер → Действие → Цена** | Каждый элемент обязателен |

---

## Архитектура проекта

### Как работает билд

```
src/master/part_*.html (авторский контент)
        │
        ▼
┌─────────────────────────────────────┐
│  Stage 1: build-layers.mjs          │
│  Парсит HTML, извлекает по data-layer│
│  Генерирует parts-l1/l2/l3          │
└─────────────────────────────────────┘
        │
        ▼
build/parts-l{1,2,3}/*.html + manifest.json
        │
        ▼
┌─────────────────────────────────────┐
│  Stage 2: build-shell.mjs           │
│  Копирует shell + parts + data      │
│  → dist/ для GitHub Pages           │
└─────────────────────────────────────┘
```

### Структура репозитория

```
live-char-guide/
├── src/
│   ├── master/              # ← АВТОРЫ: редактируют тут
│   │   └── part_*.html      # Master-файлы с data-layer разметкой
│   ├── shell/               # ← ИНФРАСТРУКТУРА: не трогать
│   │   ├── index.html       # Shell с layer selector
│   │   ├── styles.css       # Стили
│   │   └── lazy-loader.js   # Динамическая загрузка слоёв
│   ├── scripts/             # Build-скрипты
│   └── VERSION              # Источник версии
│
├── data/                    # Данные виджетов
│   ├── glossary.json        # Глоссарий
│   ├── ocean.json           # OCEAN пентагон
│   ├── enneagram.json       # Эннеаграмма
│   └── mbti.json            # MBTI типы
│
├── build/                   # Сгенерированные слои (gitignored)
│   ├── parts-l1/
│   ├── parts-l2/
│   ├── parts-l3/
│   ├── manifest.json
│   └── section-registry.json
│
├── dist/                    # Деплой на GitHub Pages (gitignored)
│
├── scripts/                 # Скрипты валидации
│   ├── validate-artifact.mjs
│   ├── version-sync.mjs
│   └── *.py                 # Python-валидаторы
│
├── tests/                   # Тесты
├── docs/                    # Документация (не входит в билд)
│   ├── architecture.md
│   ├── components.md
│   └── ...
│
└── layer-config.json        # Конфигурация слоёв
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
<section data-layer="l1" data-section="p1_card_overview">
  <h2>Заголовок секции</h2>
  <!-- Контент виден на L1, L2, L3 -->
</section>

<section data-layer="l2" data-section="p4_spine_overview">
  <!-- Контент виден только на L2 и L3 -->
</section>

<section data-layer="l3" data-section="p4_lie">
  <!-- Контент виден только на L3 -->
</section>
```

### Атрибуты секций

| Атрибут | Обязателен | Формат | Пример |
|---------|------------|--------|--------|
| `data-layer` | Да | `l1` \| `l2` \| `l3` | `data-layer="l2"` |
| `data-section` | Да | `p{N}_{topic}` | `data-section="p4_spine_overview"` |

### Запрещено в мастер-файлах

- `<style>` блоки → все стили в `src/shell/styles.css`
- `<script>` блоки → все скрипты в `src/shell/lazy-loader.js`
- `<link>` элементы
- `<meta>` элементы
- Контент вне `<section data-layer>`

### Пошаговый workflow

```bash
# 1. Редактируете мастер-файл
vim src/master/part_01_basic_blocks.html

# 2. Запускаете билд
pnpm run build

# 3. Проверяете валидацию
pnpm run validate

# 4. Запускаете локально для проверки
pnpm run dev
# Откроется http://localhost:3000

# 5. Коммитите изменения
git add src/master/part_01_basic_blocks.html
git commit -m "feat: update Part 1 content"
git push
```

---

## Разработка

### Требования

- Node.js >= 20 (см. `.nvmrc`)
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
pnpm run build          # Полный билд (layers + shell)
pnpm run build:layers   # Только Stage 1
pnpm run build:shell    # Только Stage 2
pnpm run build:watch    # Watch-режим

# Валидация
pnpm run validate       # Валидация билда
pnpm run validate:all   # Все проверки
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
- [ ] Все секции имеют `data-layer` и `data-section`
- [ ] Нет запрещённых элементов в мастер-файлах
- [ ] Версии синхронизированы (`src/VERSION` = `package.json`)

---

## Деплой

Проект использует GitHub Pages с автоматическим деплоем:

1. Push в `main` ветку
2. GitHub Actions собирает и деплоит автоматически
3. Доступно на: https://vudirvp-sketch.github.io/live-char-guide/

### CI/CD Pipeline

| Workflow | Триггер | Назначение |
|----------|---------|------------|
| `build-artifact.yml` | Push to main, PR | Билд, валидация, тесты |
| `deploy-pages.yml` | Push to main | Деплой на GitHub Pages |
| `validate.yml` | Push/PR | Скрипты валидации |

---

## Версия

**Текущая версия:** 6.2.0

См. [CHANGELOG.md](./CHANGELOG.md) для истории изменений.

Версия синхронизируется в 4 местах:
1. `package.json` — поле `version`
2. `src/VERSION` — plain text файл
3. `data/character_schema.json` — поле `version`
4. `src/shell/lazy-loader.js` — комментарий в шапке

---

## Лицензия

MIT License — см. [LICENSE](LICENSE) для деталей.

---

**Автор:** TITAN FUSE Team