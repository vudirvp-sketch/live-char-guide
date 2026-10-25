<!--
  PROPOSED README — not deployed. Copy to /README.md to apply.
  Rationale and the owner decisions behind it: docs/PROMOTION_PLAN.md §3.
  Deviates from AGENTS.md "repo language: English" on purpose (public landing page for a
  Russian-language guide). Owner call — see PROMOTION_PLAN.md D-1.
-->

# Live Character Guide

**Инженерный конвейер для карточек персонажей LLM.** Не сборник промптов, а процесс: SPINE (психологический каркас) → якоря поведения → изоляция голоса → системный промпт → готовая карточка. Для моделей 12B–32B+, совместимо с SillyTavern.

[**→ Открыть гайд**](https://vudirvp-sketch.github.io/) · 10 частей · 62 раздела · 4 полные карточки-примера · v9.2.6

[![Deploy](https://github.com/vudirvp-sketch/vudirvp-sketch.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/vudirvp-sketch/vudirvp-sketch.github.io/actions/workflows/deploy-pages.yml)
[![Version](https://img.shields.io/github/package-json/v/vudirvp-sketch/vudirvp-sketch.github.io)](package.json)
[![License](https://img.shields.io/github/license/vudirvp-sketch/vudirvp-sketch.github.io)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/vudirvp-sketch/vudirvp-sketch.github.io)](https://github.com/vudirvp-sketch/vudirvp-sketch.github.io/commits/main)
![Язык](https://img.shields.io/badge/%D0%B3%D0%B0%D0%B9%D0%B4-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-blue)

![Live Character Guide](https://raw.githubusercontent.com/vudirvp-sketch/vudirvp-sketch.github.io/main/src/assets/preview-card.png)

---

## Какую проблему это решает

Три типовые поломки RP-карточки — и все три лечатся не «улучшением промпта», а конструкцией:

- **Голос сползает к дефолту модели.** Персонаж говорит «как ассистент» на третьем сообщении. Лечится изоляцией голоса, а не добавлением прилагательных.
- **Поведение без причины.** Персонаж добрый «потому что в описании написано добрый». Лечится SPINE: у каждого проявления есть источник, которого персонаж сам не осознаёт.
- **Ошибку не видно.** Карточка вроде работает, но непонятно, где именно ломается. Лечится диагностикой: симп­том → причина → правка.

Гайд ведёт по этим трём уровням последовательно, от пустого файла до готовой карточки и проверки перед деплоем.

## Что внутри

| # | Часть | О чём |
|---|-------|-------|
| 0 | [Перед стартом](https://vudirvp-sketch.github.io/#p0_how_to_read) | Как читать гайд, TL;DR, маршрут |
| 1 | [Основы: анатомия карточки](https://vudirvp-sketch.github.io/#p1_value_proposition) | Из чего состоит карточка и что чем управляет |
| 2 | [Якоря: поведение в три шага](https://vudirvp-sketch.github.io/#p2_basic_anchors) | Поведение, воплощение, реактивность, сенсорика |
| 3 | [Голос и изоляция](https://vudirvp-sketch.github.io/#p3_voice_isolation) | Почему голос течёт и как его запереть |
| 4 | [SPINE: психологический каркас](https://vudirvp-sketch.github.io/#p4_spine_overview) | GHOST / LIE / FLAW / NEED / WANT |
| 5 | [Психология: OCEAN и типология](https://vudirvp-sketch.github.io/#p5_ocean_basics) | Числовые оси, эннеаграмма, кросс-матрица |
| 6 | [CoT: внутренний монолог](https://vudirvp-sketch.github.io/#p6_cot_basics) | Уровни внутренней речи и их бюджет |
| 7A | [Системный промпт и сборка](https://vudirvp-sketch.github.io/#p7a_system_prompt) | CORE DIRECTIVES, Tone Frame, сборка, бюджет токенов |
| 7B | [Lorebook, приветствие и инъекции](https://vudirvp-sketch.github.io/#p7b_greeting) | Первое сообщение, записи лора, структурные инъекции |
| 8 | [Анти-паттерны](https://vudirvp-sketch.github.io/#p8_antipatterns_overview) | 15 разобранных способов сломать карточку |
| 9 | [Диагностика и тестирование](https://vudirvp-sketch.github.io/#p9_basic_checklist) | Чек-лист деплоя, дерево решений, тест-сценарии |
| 10 | [Полные карточки](https://vudirvp-sketch.github.io/#p10_index) | 4 готовых карточки целиком, с разбором |

Приложения: [MBTI](https://vudirvp-sketch.github.io/#appendix_mbti) · [Модель, контекст и параметры генерации](https://vudirvp-sketch.github.io/#appendix_model_params)

## С чего начать

1. **[Перед стартом](https://vudirvp-sketch.github.io/#p0_how_to_read)** — 10 минут, понять маршрут.
2. **Идти по частям 1 → 10 подряд.** Гайд линейный: каждая часть опирается на предыдущую.
3. **Карточка не работает** — сразу в [Диагностику](https://vudirvp-sketch.github.io/#p9_basic_checklist), не перечитывать всё.

## Кому подойдёт

- Тем, кто собирает персонажей для SillyTavern / RP-фронтендов и хочет предсказуемого поведения, а не «повезёт/не повезёт».
- Тем, кто работает с локальными моделями 12B–32B+, где цена лишнего токена заметна.
- Тем, кто хочет разобрать готовую карточку по частям и понять, почему она работает.

**Не подойдёт**, если нужен список готовых промптов для копирования без разбора — это гайд про конструкцию, а не коллекция сниппетов.

---

## Репозиторий

| Если вы... | Начните здесь |
|---|---|
| Читатель | [Сайт](https://vudirvp-sketch.github.io/) |
| Контрибьютор | [`CONTRIBUTING.md`](CONTRIBUTING.md) |
| LLM-агент (Cursor, Aider, Continue…) | [`AGENTS.md`](AGENTS.md) — короткая точка входа |
| Агент, нужен полный справочник | [`AGENT_NAVIGATION.md`](AGENT_NAVIGATION.md) |
| Нужно текущее состояние проекта | [`STATUS.md`](STATUS.md) |

### Стек

Статический HTML + CSS + ванильный JS (ES-модули). Без фреймворков, без сборщика фронтенда, без TypeScript. Сайт собирается скриптами Node и деплоится на GitHub Pages.

### Структура

| Путь | Назначение |
|---|---|
| `docs/canon/` | Канон — источник правды для контента |
| `src/master/` | Авторский контент (12 файлов частей + приложения) |
| `src/shell/` | Оболочка: HTML, стили, загрузчик, виджеты |
| `data/` | JSON-данные виджетов (глоссарий, OCEAN, эннеаграмма, MBTI, схема) |
| `scripts/` | Сборка и валидация |
| `parts/`, `widgets/`, `assets/`, `index.html`, `build.hash` | Корневые fallback-и — генерируются сборкой, руками не правятся |

### Команды

```bash
pnpm install              # Node >= 20, pnpm 10.x
pnpm run build            # полная сборка
pnpm run validate         # проверка артефакта сборки
pnpm run version:check    # синхронизация версии в 4 местах
pnpm test                 # тесты
pnpm run qa               # агрегированные QA-гейты
pnpm run dev              # сборка + локальный сервер на :3000
```

### Как устроена сборка

```
docs/canon/*.md            → генераторы            → data/*.json
src/master/*.html          → scripts/build-unified.mjs → parts/ + manifest.json
                                                     ↓
                              src/scripts/build-shell-unified.mjs → dist/ → GitHub Pages
```

Подробно: [`docs/architecture.md`](docs/architecture.md) · [`AGENT_NAVIGATION.md` §2](AGENT_NAVIGATION.md).

---

## Участие

Issues и PR — приветствуются: [issues](https://github.com/vudirvp-sketch/vudirvp-sketch.github.io/issues). Перед PR прочитайте [`CONTRIBUTING.md`](CONTRIBUTING.md) и [`AGENTS.md`](AGENTS.md) — в проекте жёсткие правила по секциям, CSS-классам, CSP и синхронизации канона.

## Лицензия

[MIT](LICENSE) — можно использовать, форкать, брать куски в свои проекты.

## Ключевые слова

карточка персонажа · карточки персонажей для LLM · SillyTavern · RP · roleplay · промпт-инжиниринг · системный промпт · SPINE · OCEAN · эннеаграмма · CoT · внутренний монолог · лорбук · lorebook · бюджет токенов · локальные модели · 12B · 32B

---

## English summary

**Live Character Guide** is a Russian-language engineering guide for building LLM roleplay character cards (SillyTavern-compatible, 12B–32B+ models). It treats the card as a behavioural engine: SPINE (psychological skeleton) → behavioural anchors → voice isolation → system prompt → finished card. 10 parts, 62 sections, 4 complete worked cards, plus a diagnostics track. Static HTML/CSS/vanilla JS, built by Node scripts, deployed to GitHub Pages.

→ <https://vudirvp-sketch.github.io/>

Questions, issues and PRs in English are welcome.
