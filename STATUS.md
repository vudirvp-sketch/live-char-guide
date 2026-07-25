# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 73 — Research: консолидация guide_analysis.md.** Выполнено:

- **Recon:** пользователь прислал `guide_analysis.md` (1774 строк, 7 разнородных анализов от разных агентов) с задачей консолидировать информацию без потери, для последующей верификации и правок в будущих итерациях.
- **Дедупликация:** 7 анализов → 1 консолидированный документ `docs/research/guide_analysis_consolidated.md`. Дубликат секции (analysis #3) отсечён. Analysis #7 (анализ **другого** гайда — общего руководства по созданию персонажей, не live-char-guide) отсечён как нерелевантный.
- **Структура консолидированного документа:** 12 разделов — контекст, структура Parts, смыслы, противоречия (15 шт.), дубли (20 шт.), бесполезная информация (15 шт.), чек-листы (14 шт.), приоритизированные предложения (P1/P2/P3), критические пробелы, методологический референс, итоговые оценки, что требует верификации (9 шт. V1–V9), резюме.
- **План следующих итераций:** `docs/research/research_plan.md` — Фаза 1 (Recon & Verification, 9 проверок), Фаза 2 (критичные исправления iter 75–82), Фаза 3 (улучшение структуры iter 83–90), Фаза 4 (опциональные улучшения iter 91+), Фаза 5 (спорные/отложенные решения).
- **Никаких правок контента гайда в этой итерации** — чисто исследовательская, подготовительная.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 73):
- Все gates PASS (без изменений — iter 73 не трогал src/ или data/).
- `pnpm run build` → SUCCESS, shell hash `4074bac5` (unchanged).

---

## Known Issues

| KI | Статус | Описание | Iter |
|----|--------|----------|------|
| No open KI. | | | |

**Закрытые KI:** KI#49 (iter 72), KI#48 (iter 71), KI#47 (iter 70), KI#46 (iter 70), KI#45 (iter 69), KI#44 (iter 68), KI#41–43 (iter 65–66), KI#40 (iter 61), KI#33–39 (iter 44–56), KI#20–32 (iter 25–42), KI#1–19 (iter 1–24).

При обнаружении новых багов — сначала документировать в STATUS.md §«Known Issues» как KI#N, потом фиксить.

---

## Pending Verification (из guide_analysis.md, iter 74 задача)

9 утверждений из консолидированного анализа требуют верификации в актуальном репозитории перед правками. Анализы могли делаться на устаревшей версии или на неверном контенте.

| # | Утверждение | Файл | Если подтверждено → KI |
|---|-------------|------|------------------------|
| V1 | `docs/canon/part_07a.md` обрезан (нет §7A.1–§7A.9) | `docs/canon/part_07a.md` | KI#50 |
| V2 | Голос в Description карточек Part 10 | `src/master/part_10.html` | KI#51 |
| V3 | Нефизический Price «Какая из историй?» в §2 | `src/master/part_02.html` | KI#52 |
| V4 | Inline changelog / dev notes в рендеримом контенте | `src/master/*.html` | KI#53 |
| V5 | Мёртвые ссылки на `docs/canon/` в reader-facing контенте | `src/master/*.html` | KI#54 |
| V6 | «Отсутствие правил» vs «обязательный чек-лист» | `src/master/part_01.html` | контент-решение |
| V7 | N>70 указан дважды в таблице типов стресса §5.1 | `src/master/part_05.html` | KI#55 |
| V8 | GHOST «видел, как дом сгорел» — перцептивный вывод | `src/master/part_05.html` | контент-решение |
| V9 | OCEAN×Enneagram Matrix без обоснования §5.7 | `src/master/part_05.html` | контент-решение |

**План верификации:** `docs/research/research_plan.md` §Фаза 1.

---

## Invariants (iter 61+)

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID. Cat B prose mentions = «Russian (English)» (iter 67+).
- **Heading format:** Cat B/C headings = «Русский (English Canonical)». Cat A headings stay English.
- **No-repeat principle:** Гайд — единый последовательный документ. Концепции не повторяются, `[ref:]` только для навигации между Parts.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции. **iter 71: 96/96 секций покрыты.**
- **Scenario labels (iter 55/57/72):** `<strong>Сценарий:</strong>` маркер для check-list секций Part 9 — покрывает §9.3, §9.5, §9.6, §9.7, §9.9, §9.10, §9.11 (7 секций). Reference/overview секции (§9.1, §9.2, §9.4, §9.8) без маркера — by design.
- **Annotation blocks (iter 57):** Все 3 карточки §10.2-10.4 (Walter, Omnis, Vysherblenny) имеют `<strong>Annotation:</strong>` блок с `<ul>` списком Demonstrates-ссылок.
- **Canonical markers:** `<!-- canonical: ... -->` для definition sections.
- **VS-EMBED CSS variables (iter 65–66):** E09 + E10 embeds используют CSS variables (not hardcoded colors). Static fallback regions не затронуты.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/` (verified: `grep -cE '<section[^>]*data-section' src/master/*.html` = 96).
- **Version sync (iter 71+):** все 9.1.0 references устранены, включая master HTML top comments.

---

## iter 74+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 74** | Recon & Verification — проверить 9 утверждений V1–V9 (см. §Pending Verification) | LOW (~30 мин) |
| **iter 75–82** | P1 — критичные исправления (по результатам iter 74) | MEDIUM |
| **iter 83–90** | P2 — улучшение структуры (унификация терминов, дедупликация, Master Checklist) | HIGH |
| **iter 91+** | P3 — опциональные улучшения (карта зависимостей, схемы, замена процентов) | LOW–MEDIUM |
| **GitHub-level** | Dependabot merges (10 branches — требует web access к GitHub PR UI) | LOW |
| **by design** | Glossary double-render inefficiency — не фиксить | — |
| **by design** | Paragraph drift tuning (170 drifts / 131 actionable, false positives нет) — не фиксить | — |
| **DONE (iter 73)** | ~~Research: консолидация guide_analysis.md~~ — completed in iter 73 | — |
| **DONE (iter 57)** | ~~P3: Annotation blocks §10.2-10.4~~ | — |
| **DONE (iter 57+72)** | ~~P3: Расширение scenario-меток~~ | — |

**Рекомендация для следующего чата:** начать с iter 74 — Recon & Verification (9 проверок, ~30 мин). План в `docs/research/research_plan.md` §Фаза 1. По результатам — обновить STATUS.md с новыми KI (если баги подтверждены). Только потом переходить к iter 75+ (критичные исправления P1).

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом `pnpm run build` |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
