# Live Character Guide

> Инженерный пайплайн для RP-карточек персонажей (от SPINE до деплоя, для моделей 12B–32B+). Единый линейный гайд.

- **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
- **Версия:** 9.2.0
- **Статус:** iter 71 COMPLETE. Нет открытых KI. См. `STATUS.md`.

---

## Что это

Гайд по созданию карточек персонажей для AI-ролевых игр (SillyTavern-совместимых). Строит карточку как поведенческий движок: SPINE (психологический каркас) → Behavioral Anchors (поведенческие якоря) → Voice Isolation (изоляция голоса) → System Prompt → готовая карточка.

10 Parts + 4 Appendix + Part 0 (Quick orientation) — единый последовательный поток, не википедия.

## Структура репозитория

| Directory | Purpose |
|-----------|---------|
| `src/master/` | Авторский контент — 10 Parts + 3 appendix HTML. **АВТОРЫ редактируют тут.** |
| `src/shell/` | Infrastructure shell (index.html, styles.css, lazy-loader.js, widgets/). **НЕ ТРОГАТЬ при написании Parts.** |
| `docs/canon/` | Canon markdown — source of truth для контента (в build не входит). |
| `data/` | JSON-данные виджетов (glossary, ocean, enneagram, mbti, character_schema). |
| `scripts/` | Build + validation скрипты. |
| `parts/`, `widgets/`, `assets/`, `index.html`, `event-bus.js`, `build.hash` | Root fallbacks — regenerated на каждом `pnpm run build`. НЕ редактировать напрямую. |

## Команды

```bash
pnpm install              # Установка зависимостей (Node >= 20, pnpm 10.x)
pnpm run build            # Полный билд (unified + shell + root fallbacks)
pnpm run validate         # Валидация билда
pnpm run validate:master  # Валидация мастер-файлов
pnpm test                 # Все тесты
pnpm run qa               # Aggregate QA (csp + bundle + english + syntax + doc-versions)
```

## Build Pipeline

```
src/master/*.html (авторский контент)
        ↓
scripts/build-unified.mjs  →  parts/*.html (unified) + manifest.json
        ↓
src/scripts/build-shell-unified.mjs  →  dist/ (deployed to GitHub Pages)
        ↓
root fallbacks (index.html, parts/, widgets/, assets/, data/) — committed to git
```

Полная схема: `AGENT_NAVIGATION.md` §2.

## Документация

- `STATUS.md` — актуальный статус, Known Issues, iter N+ roadmap.
- `worklog.md` — последняя итерация подробно, предыдущие — одной строкой.
- `AGENT_NAVIGATION.md` — entry document для агентов. Читать первым.
- `CHANGELOG.md` — история версий.
- `docs/canon/_README.md` — Canon Spec (правила canon-файлов).
- `docs/canon/iter60_analysis_plan.md` — iter 60–69 план (завершён; iter 70+ roadmap в `STATUS.md`).

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
