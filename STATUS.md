# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.4
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 91 — C3+C4 COMPLETE.** Vyshcherblenny/Elena Bible backfill + V4 fix:

- **Vyshcherblenny (C3):** Anchors — flat T→A→P table заменён на `<anchors>` XML (Базовые 3 + FLAW-linked 3 + Зеркало-linked 1 + Sensory 2), все Prices bodily/mechanical (тремор, онемение, хрип, потеря чувствительности, желудок, тошнота, дрожь). Examples — добавлены 4 expanded `<START>` блока (~80–100 tok each) с SPINE CAUSALITY annotations: Ex1 (GHOST residue), Ex2 (LIE→FLAW), Ex3 (Зеркало confrontation), Ex4 (GHOST+LIE crack). Greeting + Author's Note (expanded format) добавлены из `part_10.md` §10.4. CoT Anchors (2 максимума) synced с part_10. AP-8 references обновлены к новым anchor IDs. V4: E=60 cautious zone → explicit SPINE causal chain (LIE→formality→distance control + shift potential → E↑/E↓).
- **Elena (C4):** Anchors — flat T→A→P table заменён на `<anchors>` XML (Базовые 3 + FLAW-linked 3), все Prices bodily/mechanical (челюсть, головная боль, кулаки, дрожь, голос тише). SPINE CAUSALITY annotations added на existing 3 `<START>` blocks. Greeting section added explicit из `part_10.md` §10.1. OCEAN cautious zones (A=38, N=68) → explicit SPINE causal chains with shift potential.

**Closed:** C3 (Vyshcherblenny Bible backfill), C4 (Elena Bible backfill), V4 (OCEAN cautious zones → SPINE), KI#59 (Vyshcherblenny/Elena Примеры — fully synced).

### Remaining card-specific issues

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in `<identity>` (E1); §9.11 claims Voice check PASS but FAILS (E8) |
| **Walter** | GHOST without Anchor-trigger (W6); OCEAN cautious zones (W8) |
| **Omnis-Zeta** | NEED/WANT tension weak (O4); OCEAN cautious zones (O3) |

---

## Decision items

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline.
- **V9:** OCEAN×Enneagram Matrix — disclaimer needed (авторская модель, не научная).

---

## Invariants

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary, English only in code/ID.
- **No-repeat principle:** `[ref:]` only for navigation.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` — 96/96.
- **English leaks baseline:** 27 — by design.
- **Canon → master sync:** 96/96 PASS.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Anchors placement:** `<anchors>` XML wrapper inside Examples-zone (P7A-R16).
- **Voice Isolation:** Linguistic voice = Examples/Greeting. Physical = Embodiment/Description.
- **Anchor Price rule:** All Anchor Prices must be bodily/mechanical (P2-R1/P2-R3).

---

## iter 92+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 92** | W6/W8 — Walter GHOST Anchor-trigger + OCEAN cautious zones; O3/O4 — Omnis OCEAN cautious zones + NEED/WANT tension | MEDIUM |
| **iter 93** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 94** | E1/E8 — Elena Voice leak + §9.11 | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

---

## Known Issues

| ID | Описание | Status |
|----|----------|--------|
| KI#58 | `parts/part_10.html` Vyshcherblenny [ANCHORS] plain text vs `<anchors>` XML in canon/master — drift from iter 85. Not in scope. | OPEN |
| KI#60 | Elena Voice leak «саркастичная» in `<identity>` (E1) — adjective leaks voice into Description, should be shown through Examples only. | OPEN |
