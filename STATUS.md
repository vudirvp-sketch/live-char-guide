# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.3
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 85 — A7/A8/KI#57 COMPLETE.** All 4 cards: `[ANCHORS]` → `<anchors>` XML wrapper (P7A-R16/P1-R6 compliance). Tone Frames expanded: Omnis-Zeta ~8→~25 tok, Vyshcherblenny ~8→~25 tok. KI#57 closed: Omnis-Zeta 2 GHOST-linked Anchor Prices converted from non-physical («раскрывает уязвимость», «рассеивание внимания») to bodily/mechanical (оптика мерцает жёлтым + сервоприводы дрожат; оптика гаснет 0.8 сек + периферийные сенсоры теряют calibration). Bullet list `-` prefixes added to all anchor items per `<anchors>` XML template §7A.9. Annotations updated in both docs/canon/part_10.md and src/master/part_10.html.

**Closed:** U4 (Anchors `<anchors>` XML), KI#57 (Omnis-Zeta GHOST-linked Anchors non-physical), V2 (Vyshcherblenny Tone Frame ~8 tok).

**Still open for Vyshcherblenny:** V3 (3 Anchor Prices non-physical → iter 87/88), V4 (OCEAN cautious zones → iter 90), V5 (2 Examples under 80 tok → iter 88).

### Remaining universal violations (1 of 4 still open)

| # | Проблема | Серьёзность |
|---|----------|-------------|
| U1 | Tone Frame недомер — ALL 4 cards DONE (Omnis/Vyshcher expanded to ~25 tok in iter 85) | ✅ CLOSED |
| U2 | CORE_DIRECTIVES не inline (shorthand reference) | DECISION |
| U3 | Examples недомер (25–70 tok вместо 80–120) | HIGH |

### Key remaining card-specific violations

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in Description; Examples недомер; §9.11 claims Voice check PASS but it FAILS |
| **Walter** | GHOST without Anchor-trigger; 1 Anchor Price temporal (non-physical); OCEAN cautious zones not linked |
| **Omnis-Zeta** | NEED/WANT tension weak; OCEAN cautious zones not linked |
| **Vyshcherblenny** | 3 Anchor Prices non-physical; OCEAN cautious zones not linked; 2 Examples under 80 tok |

---

## Known Issues

> KI#1–KI#57: all closed (история — в git log). No open KI.

---

## Decision items (требуют обсуждения с автором)

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline.
- **V9:** OCEAN×Enneagram Matrix — нужен disclaimer (авторская модель, не научная).

---

## Invariants

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID.
- **No-repeat principle:** Гайд — единый последовательный документ. `[ref:]` только для навигации.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` — 96/96 секции покрыты.
- **English leaks baseline:** 27 — by design (Tone Frame + OOC + Format Lock strings in SP, all Cat A English per language policy).
- **Canon → master sync:** 96/96 PASS.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/`.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **Anchors placement:** Anchors = `<anchors>` XML wrapper inside Examples-зона (P7A-R16). Template §7A.9.
- **Voice Isolation:** Лингвистический голос — только Examples/Greeting. Физическая характеристика — Embodiment/Description.
- **SP structure order:** Identity → Anti-godmoding → CORE_DIRECTIVES → Character-specific rules → Tone Frame → OOC Protection → Format Lock (P7A-R2).
- **Anchor Price rule:** All Anchor Prices must be bodily/mechanical (P2-R1/P2-R3). Non-physical = violation.

---

## iter 86+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 86** | B1 — Elena Examples expand + embodiment | MEDIUM |
| **iter 87–88** | B2–B4 — Walter/Omnis/Vyshcherblenny Examples expand + Vyshcherblenny V3 (Anchor Prices → bodily) | LOW |
| **iter 89** | C1–C2 — Walter/Omnis Bible backfill + align | MEDIUM |
| **iter 90** | C3–C4 — Vyshcherblenny/Elena Bible backfill + align + Vyshcherblenny V4 (OCEAN cautious zones) | HIGH |
| **iter 91** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 92+** | E1–E2 — Dead weight cleanup (unused characters, non-canonical Lorebook) | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

**Рекомендация для следующего чата:** iter 86 — B1: Elena Examples expand + embodiment (P3-R7 compliance, 80–120 tok per block).

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 27 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |
| `src/master/VERSION` orphan | KI#46 — файл не используется build pipeline. Sync не требуется. |
