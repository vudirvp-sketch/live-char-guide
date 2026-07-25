# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.1
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 80 — Разведочный аудит примеров карточек Part 10 + inline Parts 1–9 + Bible sync.** Исследовательская итерация: ~90 правил проверены против 4 полных карточек, 12 персонажей Bible, ~73 inline-примеров, ~19 шаблонов. **Никаких правок не сделано** — только документирование найденных проблем. Полный отчёт: `docs/research/examples_audit_iter80.md`.

**Found: 4 universal violations + 26 card-specific violations + 20 Bible-vs-card discrepancies + 4 self-contradictions.**

### Universal violations (ALL 4 cards)

| # | Проблема | Серьёзность |
|---|----------|-------------|
| U1 | Tone Frame недомер (0–8 tok вместо ~25–30) | HIGH |
| U2 | CORE_DIRECTIVES не inline (shorthand reference) | DECISION |
| U3 | Examples недомер (25–70 tok вместо 80–120) | HIGH |
| U4 | Anchors `[ANCHORS]` plain text вместо `<anchors>` XML | MEDIUM |

### Key card-specific violations

| Card | Key issues |
|------|------------|
| **Elena** | Voice leak «саркастичная» in Description; missing Tone Frame + OOC; §9.11 claims Voice check PASS but it FAILS |
| **Walter** | Missing `<identity>` tag; LIE = quote + explanatory clause (violates SPINE); no Format Lock + OOC; no GHOST-linked Anchor |
| **Omnis-Zeta** | 5/7 Anchor Prices are non-physical (social/cognitive, not bodily); NEED/WANT tension weak |
| **Vyshcherblenny** | GHOST in `<spine>` is 5-sentence narrative + cycle (should be concrete event); 3 Anchor Prices non-physical |

### Bible-vs-card discrepancies (20 total, 15 HIGH)

Most critical: Walter NEED fundamentally changed; Vyshcherblenny LIE/NEED/WANT all changed; Omnis-Zeta GHOST points to different tier; 7 unused supporting characters in Bible.

---

## Decision items (требуют обсуждения с автором)

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline. По spirit правила корректно, но граница тонкая.
- **V9:** OCEAN×Enneagram Matrix — нужен disclaimer (авторская модель, не научная).

---

## Invariants

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID.
- **No-repeat principle:** Гайд — единый последовательный документ. `[ref:]` только для навигации.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` — 96/96 секций покрыты.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/`.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **Anchors placement:** Anchors = отдельный структурный блок внутри Examples-зоны. В большинстве фронтендов — `<anchors>`-тег в Description; концептуально Anchors = behavioural patterns, Examples = voice patterns.
- **Voice Isolation (лингвистический vs физический):** Лингвистический голос (слова, синтаксис) — только Examples/Greeting. Физическая характеристика голоса (тембр, хрип, механический гул) — часть Embodiment, допустима в Description (сенсорный слой «Звук»).

---

## iter 81+ Roadmap (updated iter 80)

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 81** | A1 — Elena SP: Tone Frame + OOC | LOW |
| **iter 82** | A2–A4 — Walter SP + `<identity>` + LIE fix | MEDIUM |
| **iter 83** | A5 — Omnis-Zeta Anchors: physical Prices | MEDIUM |
| **iter 84** | A6 — Vyshcherblenny GHOST: shorten to concrete event | LOW |
| **iter 85** | A7–A8 — All cards: `<anchors>` XML + Tone Frames expand | MEDIUM |
| **iter 86** | B1 — Elena Examples expand + embodiment | MEDIUM |
| **iter 87–88** | B2–B4 — Walter/Omnis/Vysherblenny Examples expand | LOW |
| **iter 89** | C1–C2 — Walter/Omnis Bible backfill + align | MEDIUM |
| **iter 90** | C3–C4 — Vyshcherblenny Bible backfill + align | HIGH |
| **iter 91** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 92+** | E1–E2 — Dead weight cleanup (unused characters, non-canonical Lorebook) | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

**Рекомендация для следующего чата:** начать с iter 81 — Elena SP Tone Frame + OOC (самый простой fix, warm-up). Полный аудит: `docs/research/examples_audit_iter80.md`.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build (CI на push) |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |
