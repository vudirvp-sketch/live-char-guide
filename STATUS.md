# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.5
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 92 — W6/W8/O3/O4 COMPLETE.** Walter GHOST Anchor-trigger + OCEAN cautious zones → SPINE; Omnis OCEAN cautious zones + NEED/WANT tension:

- **Walter (W6+W8):** Added GHOST-linked Anchors (2 entries — Упоминание Gray Matter / Эллиотта + Видит Pontiac Aztek) с bodily Prices (белые костяшки, челюсть, рука на руле, дыхание). OCEAN cautious zones E=30 (LIE «ради семьи» causal chain) и N=60 (GHOST-реактивность Gray Matter causal chain) → explicit SPINE с shift potential. Updated в docs/canon/part_10.md §10.2, src/master/part_10.html (`<anchors>` XML), parts/part_10.html ([ANCHORS] plain text per KI#58), docs/character_bible.md.
- **Omnis (O3+O4):** OCEAN cautious zone N=65 → explicit SPINE causal chain (GHOST fear of obsolescence + LIE «эмоция — слабость плоти» → system warnings → diagnostic cycle, shift potential). NEED/WANT tension explicit annotation — WANT (слияние с Омниссией) требует растворения индивидуального когнитивного аппарата, NEED (понимание) требует его сохранения. LIE bridges (любопытство = data acquisition). GHOST activates (довоенные фрагменты реактивируют human wonder). Tragic structure. Updated в docs/canon/part_10.md §10.3, src/master/part_10.html, parts/part_10.html, docs/character_bible.md.

**Closed:** W6 (Walter GHOST Anchor-trigger), W8 (Walter OCEAN cautious zones → SPINE), O3 (Omnis OCEAN cautious zones → SPINE), O4 (Omnis NEED/WANT tension explicit).

### Remaining card-specific issues

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in `<identity>` (E1); §9.11 claims Voice check PASS but FAILS (E8) |
| **Walter** | ✅ W6/W8 closed iter 92 |
| **Omnis-Zeta** | ✅ O3/O4 closed iter 92 |

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
- **Canon → master sync:** 95/96 PASS (KI#62 — P2-18-item-anchors-flaw audit check устарел после iter 85 `<anchors>` XML migration, контент корректен, audit script needs update).
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Anchors placement:** `<anchors>` XML wrapper inside Examples-zone (P7A-R16).
- **Voice Isolation:** Linguistic voice = Examples/Greeting. Physical = Embodiment/Description.
- **Anchor Price rule:** All Anchor Prices must be bodily/mechanical (P2-R1/P2-R3).

---

## iter 93+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 93** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 94** | E1/E8 — Elena Voice leak + §9.11; KI#61 — parts/ Walter sync с src/master/; KI#62 — audit script P2-18 check update | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

---

## Known Issues

| ID | Описание | Status |
|----|----------|--------|
| KI#58 | `parts/part_10.html` Vyshcherblenny [ANCHORS] plain text vs `<anchors>` XML in canon/master — drift from iter 85. Not in scope. | OPEN |
| KI#60 | Elena Voice leak «саркастичная» in `<identity>` (E1) — adjective leaks voice into Description, should be shown through Examples only. | OPEN |
| KI#61 | `parts/part_10.html` Walter section drift from iter 82 — Tone Frame shorter (no OOC Protection, no Format Lock), no `<identity>` wrapper (prose outside `<spine>`), LIE has appended explanation «но правда в том, что ему нужно чувствовать контроль». Needs sync with `src/master/part_10.html`. Discovered iter 92. | OPEN |
| KI#62 | `scripts/audit_canon_master_sync.py` check `P2-18-item-anchors-flaw` ожидает old format `ANCHORS — FLAW-linked:` но src/master/part_10.html Elena Annotation теперь использует `ANCHORS — Базовые + FLAW-linked` (iter 85 `<anchors>` XML migration). Контент корректен — audit script needs update. Pre-existing since iter 85, discovered iter 92. | OPEN |
