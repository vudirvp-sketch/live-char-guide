# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.2
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 81 — A1 Elena SP: Tone Frame + OOC Protection.** Добавлены Tone Frame (~25 tok) и OOC Protection (~15 tok) в System Prompt Елены между CORE_DIRECTIVES и Format Lock. SP structure order теперь соответствует P7A-R2. Также обновлены: annotation list, visual blueprint (E15), Directives annotation layer, token budget (~440→~480 base, ~900→~940 full).

**Closed:** E2 (Tone Frame отсутствует), E3 (OOC Protection отсутствует), E4 (SP structure order нарушен).

**Still open for Elena:** E1 (voice leak «саркастичная»), E5 (Examples недомер), E6 (Example 1 без Embodiment), E7 (S&AL не демонстрируется), E8 (§9.11 self-contradiction), E9 (OCEAN format).

### Remaining universal violations (3 of 4 still open)

| # | Проблема | Серьёзность |
|---|----------|-------------|
| U1 | Tone Frame недомер — Elena DONE; Walter/Omnis/Vyshcher still 6–8 tok | HIGH |
| U2 | CORE_DIRECTIVES не inline (shorthand reference) | DECISION |
| U3 | Examples недомер (25–70 tok вместо 80–120) | HIGH |
| U4 | Anchors `[ANCHORS]` plain text вместо `<anchors>` XML | MEDIUM |

### Key remaining card-specific violations

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in Description; Examples недомер; §9.11 claims Voice check PASS but it FAILS |
| **Walter** | Missing `<identity>` tag; LIE = quote + explanatory clause; no Format Lock + OOC; no GHOST-linked Anchor |
| **Omnis-Zeta** | 5/7 Anchor Prices non-physical; NEED/WANT tension weak |
| **Vyshcherblenny** | GHOST in `<spine>` over-length; 3 Anchor Prices non-physical |

---

## Decision items (требуют обсуждения с автором)

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline.
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
- **Anchors placement:** Anchors = отдельный структурный блок внутри Examples-зоны.
- **Voice Isolation:** Лингвистический голос — только Examples/Greeting. Физическая характеристика — Embodiment/Description.

---

## iter 82+ Roadmap (updated iter 81)

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 82** | A2–A4 — Walter SP + `<identity>` + LIE fix | MEDIUM |
| **iter 83** | A5 — Omnis-Zeta Anchors: physical Prices | MEDIUM |
| **iter 84** | A6 — Vyshcherblenny GHOST: shorten to concrete event | LOW |
| **iter 85** | A7–A8 — All cards: `<anchors>` XML + Tone Frames expand (Walter/Omnis/Vyshcher) | MEDIUM |
| **iter 86** | B1 — Elena Examples expand + embodiment | MEDIUM |
| **iter 87–88** | B2–B4 — Walter/Omnis/Vysherblenny Examples expand | LOW |
| **iter 89** | C1–C2 — Walter/Omnis Bible backfill + align | MEDIUM |
| **iter 90** | C3–C4 — Vyshcherblenny/Elena Bible backfill + align | HIGH |
| **iter 91** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 92+** | E1–E2 — Dead weight cleanup (unused characters, non-canonical Lorebook) | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

**Рекомендация для следующего чата:** iter 82 — Walter SP `<identity>` + Format Lock + OOC + Tone Frame + LIE fix (A2–A4). Полный аудит: `docs/research/examples_audit_iter80.md`.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |
