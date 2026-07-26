# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.4
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 89 — B4 + V3 COMPLETE.** Vyshcherblenny Examples expanded from ~25–35 tok → ~85–110 tok each (P3-R7 compliance, 80–120 tok per block). Все 4 `<START>` блока теперь включают: SPATIAL & ANATOMICAL LOCK (Ошметок Веля, края стены, трещины, мерцание, расстояние до собеседника + конкретные части тела: пальцы/запястье/горло/лицо/челюсть), EMBODIMENT FIRST (тремор, онемение, тошнота, хрип, потеря чувствительности), SPINE CAUSALITY visible (GHOST residue «Привычка. Не моя» + холод лица в Ex1, LIE→FLAW cycle вырезание→потеря в Ex2, GHOST+FLAW через Зеркало+тошнота в Ex3, GHOST+LIE crack через имя+онемение в Ex4). V3 fixed: 3 Anchor Prices converted to bodily (Базовый 3 — хрип+пересыхание+рука вычерчивает; FLAW-linked 1 — ноет+потеря чувствительности; FLAW-linked 3 — желудок+рука к виску). Token Budget updated ~1250+→~1500+. Annotation lines дополнены SPINE CAUSALITY mention per example + bodily Price list во всех 3 файлах.

**Closed:** V3 (Vyshcherblenny Anchor Prices bodily), V5 (Vyshcherblenny Examples недомер), U3 (Examples недомер — ALL 4 cards DONE), B4.

### Remaining universal violations (1 of 4 still open)

| # | Проблема | Серьёзность |
|---|----------|-------------|
| U1 | Tone Frame недомер — ALL 4 cards DONE | ✅ CLOSED |
| U2 | CORE_DIRECTIVES не inline (shorthand reference) | DECISION |
| U3 | Examples недомер — **ALL 4 cards DONE (Elena iter 86, Walter iter 87, Omnis iter 88, Vyshcher iter 89)** | ✅ CLOSED |

### Key remaining card-specific violations

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in `<identity>` (E1); §9.11 claims Voice check PASS but FAILS (E8) |
| **Walter** | GHOST without Anchor-trigger (W6); 1 Anchor Price temporal (W7); OCEAN cautious zones (W8) |
| **Omnis-Zeta** | NEED/WANT tension weak (O4); OCEAN cautious zones (O3) |
| **Vyshcherblenny** | OCEAN cautious zones not linked to SPINE (V4) |

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

## iter 90+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 90** | C1–C2 — Walter/Omnis Bible backfill + align | MEDIUM |
| **iter 91** | C3–C4 — Vyshcherblenny/Elena Bible backfill + align + Vyshcherblenny V4 (OCEAN cautious zones) | HIGH |
| **iter 92** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 93+** | E1–E2 — Dead weight cleanup (unused characters, non-canonical Lorebook) | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

**Рекомендация для следующего чата:** iter 90 — C1–C2: Walter/Omnis Bible backfill + align. Bible (docs/character_bible.md) для Walter/Omnis ещё в shorter version — Примеры сообщений не обновлялись после iter 87/88. Нужно синхронизировать Bible Examples с canon/master Examples (expanded 80–120 tok). Также V8/V9 Decision items можно поднять с автором.

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

---

## Known Issues (active drift)

| ID | Описание | Origin |
|----|----------|--------|
| KI#58 | `parts/part_10.html` Vyshcherblenny [ANCHORS] plain text vs `<anchors>` XML in canon/master — known drift из iter 85. V3 fix applied in [ANCHORS] format preserving the drift. | iter 85 |
| KI#59 | `docs/character_bible.md` Примеры сообщений (Omnis/Walter/Vyshcher/Elena) still in shorter version — не обновлялся после iter 86-89 Examples expansion. Will be fixed in iter 90-91 (C1-C4 Bible backfill). | iter 86 |
