# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.3
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 86 — B1 COMPLETE.** Elena Examples expanded from ~25–50 tok → ~85–95 tok each (P3-R7 compliance, 80–120 tok per block). All 3 blocks now include: scene context (1-2 sentences), embodied Anchor reactions (neck rubbing + jaw clench, glass grip + headache spread, fists + stepping back), environmental reactivity (rain, bar, waterfront), SPINE causality visible. Example 1: `*пауза*` (tempo marker) → embodied reactions (neck rubbing, jaw clench). Example 2: added full bodily Anchor chain (palms → glass grip → headache from neck to temples). Example 3: added FLAW-FLAW cycle (vulnerability → «О, чувак» deflection → wall up → «плохо кончается»). Updated in docs/canon/part_10.md, src/master/part_10.html, parts/part_10.html, docs/elena_character_bible.md.

**Closed:** E5 (Elena Examples недомер), E6 (Elena Example 1 без Embodiment).

### Remaining universal violations (1 of 4 still open)

| # | Проблема | Серьёзность |
|---|----------|-------------|
| U1 | Tone Frame недомер — ALL 4 cards DONE | ✅ CLOSED |
| U2 | CORE_DIRECTIVES не inline (shorthand reference) | DECISION |
| U3 | Examples недомер — **Elena DONE**, Walter/Omnis/Vyshcher still under 80 tok | HIGH |

### Key remaining card-specific violations

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in `<identity>` (E1); §9.11 claims Voice check PASS but FAILS (E8) |
| **Walter** | GHOST without Anchor-trigger (W6); 1 Anchor Price temporal (W7); OCEAN cautious zones (W8); Examples under 80 tok |
| **Omnis-Zeta** | NEED/WANT tension weak (O4); OCEAN cautious zones (O3); Examples shorter blocks under 80 tok |
| **Vyshcherblenny** | 3 Anchor Prices non-physical (V3); OCEAN cautious zones (V4); 2 Examples under 80 tok (V5) |

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

## iter 87+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 87–88** | B2–B4 — Walter/Omnis/Vyshcherblenny Examples expand + Vyshcherblenny V3 (Anchor Prices → bodily) | LOW |
| **iter 89** | C1–C2 — Walter/Omnis Bible backfill + align | MEDIUM |
| **iter 90** | C3–C4 — Vyshcherblenny/Elena Bible backfill + align + Vyshcherblenny V4 (OCEAN cautious zones) | HIGH |
| **iter 91** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 92+** | E1–E2 — Dead weight cleanup (unused characters, non-canonical Lorebook) | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

**Рекомендация для следующего чата:** iter 87 — B2: Walter Examples expand + embodiment (P3-R7 compliance, 80–120 tok per block).

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
