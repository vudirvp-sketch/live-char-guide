# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.3
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 83 — A5 Omnis-Zeta Anchors: 5 non-physical Prices → bodily/mechanical.** Заменены 5 из 7 non-physical Anchor Prices в карточке Омнис-Зета (3 Базовых + 2 FLAW-linked) на bodily/mechanical equivalents: сервоприводы, термальные клапаны, аудиовывод, манипуляторы, теплообменник. GHOST-linked Anchors (2) оставлены для iter 85 — они требуют более аккуратной обработки при `<anchors>` XML конверсии. Annotation updated в обоих файлах. Canon sync: docs/canon/part_10.md — те же правки.

**Closed:** O1 частично — 5/7 non-physical Anchor Prices заменены (базовые + FLAW-linked). Оставшиеся 2/7 (GHOST-linked: «раскрывает уязвимость», «рассеивание внимания») → iter 85.

**Still open for Omnis-Zeta:** O2 (Tone Frame ~8 tok), O3 (OCEAN cautious zones not linked), O4 (NEED/WANT tension weak), O5 (GHOST lacks Anchor-trigger), O6 (Greeting не показывает FLAW), O7 (SP structure order), O1-partial (2 GHOST-linked Anchor Prices still non-physical).

### Remaining universal violations (2 of 4 still open)

| # | Проблема | Серьёзность |
|---|----------|-------------|
| U1 | Tone Frame недомер — Elena DONE, Walter DONE; Omnis/Vyshcher still ~8 tok | HIGH |
| U2 | CORE_DIRECTIVES не inline (shorthand reference) | DECISION |
| U3 | Examples недомер (25–70 tok вместо 80–120) | HIGH |
| U4 | Anchors `[ANCHORS]` plain text вместо `<anchors>` XML | MEDIUM |

### Key remaining card-specific violations

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in Description; Examples недомер; §9.11 claims Voice check PASS but it FAILS |
| **Walter** | GHOST without Anchor-trigger; 1 Anchor Price temporal (non-physical); OCEAN cautious zones not linked |
| **Omnis-Zeta** | 2/7 GHOST-linked Anchor Prices still non-physical; Tone Frame ~8 tok; NEED/WANT tension weak; OCEAN cautious zones not linked |
| **Vyshcherblenny** | GHOST in `<spine>` over-length; 3 Anchor Prices non-physical |

---

## Known Issues

| KI# | Описание | Статус |
|-----|----------|--------|
| KI#57 | Omnis-Zeta GHOST-linked Anchor Prices (2) still non-physical: «раскрывает уязвимость», «рассеивание внимания» — deferred to iter 85 (requires `<anchors>` XML + GHOST-CoT alignment) | ⏳ OPEN |

> KI#1–KI#56: ранее closed (история — в `worklog.md` Предыдущие итерации + git log).

---

## Decision items (требуют обсуждения с автором)

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline.
- **V9:** OCEAN×Enneagram Matrix — нужен disclaimer (авторская модель, не научная).

---

## Invariants

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID.
- **No-repeat principle:** Гайд — единый последовательный документ. `[ref:]` только для навигации.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` — 96/96 секций покрыты.
- **English leaks baseline:** 27 — by design (Tone Frame + OOC + Format Lock strings in SP, all Cat A English per language policy). Iter 81 drift (+2 from Elena Tone Frame + OOC) and iter 82 drift (+1 from Walter OOC) — both accounted for.
- **Canon → master sync:** 96/96 PASS.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/`.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **Anchors placement:** Anchors = отдельный структурный блок внутри Examples-зоны.
- **Voice Isolation:** Лингвистический голос — только Examples/Greeting. Физическая характеристика — Embodiment/Description.
- **SP structure order:** Identity → Anti-godmoding → CORE_DIRECTIVES → Character-specific rules → Tone Frame → OOC Protection → Format Lock (P7A-R2).

---

## iter 84+ Roadmap (updated iter 83)

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 84** | A6 — Vyshcherblenny GHOST: сократить до concrete event, cycle → `<ghost_layers>` | LOW |
| **iter 85** | A7–A8 — All cards: `<anchors>` XML + Tone Frames expand (Omnis/Vyshcher до ~25 tok) + Omnis-Zeta GHOST-linked Anchors bodily/mechanical | MEDIUM |
| **iter 86** | B1 — Elena Examples expand + embodiment | MEDIUM |
| **iter 87–88** | B2–B4 — Walter/Omnis/Vysherblenny Examples expand | LOW |
| **iter 89** | C1–C2 — Walter/Omnis Bible backfill + align | MEDIUM |
| **iter 90** | C3–C4 — Vyshcherblenny/Elena Bible backfill + align | HIGH |
| **iter 91** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 92+** | E1–E2 — Dead weight cleanup (unused characters, non-canonical Lorebook) | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

**Рекомендация для следующего чата:** iter 84 — Vyshcherblenny GHOST: сократить до concrete event, cycle → `<ghost_layers>` (A6). Детали: `docs/research/examples_audit_iter80.md` §6.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |
| `src/master/VERSION` orphan | KI#46 — файл не используется build pipeline. Sync не требуется. |
