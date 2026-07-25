# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 74 — Recon & Verification V1–V9.** Выполнено:

9 утверждений из консолидированного анализа проверены на живом репозитории. Результаты:

| # | Утверждение | Результат | KI / Action |
|---|-------------|-----------|-------------|
| V1 | `docs/canon/part_07a.md` обрезан | **FALSE** — все 13 секций §7A.1–§7A.13 на месте (740 строк) | — |
| V2 | Голос в Description карточек Part 10 | **CONFIRMED** — Омнис-Зета Description содержит Embodiment-блок с «Голос: синтезированный, металлический резонанс» (стр. 383) | **KI#51** |
| V3 | Нефизический Price «Какая из историй?» в §2 | **CONFIRMED** — строка 220: риторический вопрос, не физическая реакция | **KI#52** |
| V4 | Inline changelog в рендеримом контенте | **FALSE** — все changelog внутри HTML-комментариев `<!-- ... -->`, не рендерятся | — |
| V5 | Мёртвые ссылки `docs/canon/` в reader-facing | **CONFIRMED** — part_01.html строка 398: `<code>docs/canon/part_00.md §0.2</code>` видимый в рендере | **KI#54** |
| V6 | «Отсутствие правил» vs «обязательный чек-лист» | **FALSE** — тонального конфликта нет. Гайд формулирует: «Эти принципы обязательны» (стр. 321). Анализ был некорректен. | — |
| V7 | N>70 дважды в таблице стресса §5.1 | **CONFIRMED** — строки 184–185: два типа стресса при N>70 (тревожно-реактивный и взрывной-враждебный). By design, но заголовок «N-полюс» одинаков — может путать читателя. | **KI#55** |
| V8 | GHOST «видел, как дом сгорел» — перцептивный вывод | **Borderline** — «видел, как дом сгорел» = наблюдение объективного события + перцептивный фильтр «видел». По spirit правила корректно, но граница тонкая. | Decision item |
| V9 | OCEAN×Enneagram Matrix без обоснования §5.7 | **CONFIRMED** — нет disclaimer/обоснования, что матрица — авторская модель, не научный факт. | Decision item |

Никаких правок контента гайда — чисто верификационная итерация.

Validation gates (post-iter 74): unchanged — iter 74 не трогал src/ или data/.
Build hash `4074bac5` unchanged.

---

## Known Issues

| KI | Статус | Описание | Файл | Iter |
|----|--------|----------|------|------|
| KI#51 | OPEN | Voice (голос) в Description блоке — Омнис-Зета Embodiment содержит «Голос: синтезированный, металлический резонанс» — нарушение Voice Isolation rule | `src/master/part_10.html` стр. 378–383 | 74 |
| KI#52 | OPEN | Нефизический Price «Какая из историй?» — риторический вопрос вместо физической реакции | `src/master/part_02.html` стр. 220 | 74 |
| KI#54 | OPEN | Видимые ссылки на `docs/canon/` в reader-facing контенте — внутренние пути, не для читателя | `src/master/part_01.html` стр. 398 | 74 |
| KI#55 | OPEN | N>70 дважды в таблице стресса — два типа при одном условии, заголовок не различает | `src/master/part_05.html` стр. 184–185 | 74 |

**Decision items (не KI, требуют обсуждения с автором):**
- V8: GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline.
- V9: OCEAN×Enneagram Matrix — нужен disclaimer (авторская модель, не научная).

**Закрытые KI:** KI#49 (iter 72), KI#48 (iter 71), KI#47 (iter 70), KI#46 (iter 70), KI#45 (iter 69), KI#44 (iter 68), KI#41–43 (iter 65–66), KI#40 (iter 61), KI#33–39 (iter 44–56), KI#20–32 (iter 25–42), KI#1–19 (iter 1–24).

**Устаревшие KI-номера (не созданы, утверждения FALSE):** KI#50 (V1 — FALSE), KI#53 (V4 — FALSE).

---

## Invariants (iter 61+)

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID.
- **No-repeat principle:** Гайд — единый последовательный документ. `[ref:]` только для навигации.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` — 96/96 секций покрыты.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/`.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.

---

## iter 75+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 75** | KI#54 — убрать `docs/canon/` ссылки из reader-facing контента (part_01.html стр. 398) | LOW |
| **iter 76** | KI#55 — уточнить таблицу стресса §5.1 (раздести N>70 на два подтипа) | LOW |
| **iter 77** | KI#51 — Voice в Description Омнис-Зета (перенести «Голос» в Examples/Greeting или добавить disclaimer) | LOW–MEDIUM |
| **iter 78** | KI#52 — заменить Price «Какая из историй?» на физическую реакцию | LOW |
| **iter 79+** | Decision items: V8 (GHOST перцептивный фильтр), V9 (Matrix disclaimer) — после обсуждения | MEDIUM |
| **iter 83–90** | P2 — улучшение структуры | HIGH |
| **iter 91+** | P3 — опциональные улучшения | LOW–MEDIUM |

**Рекомендация для следующего чата:** начать с iter 75 — KI#54 (мёртвые ссылки docs/canon/). Потом KI#55, KI#51, KI#52 по порядку.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
