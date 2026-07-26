# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.5
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 93 — D1/D2/D3/D4 COMPLETE.** Guide self-contradictions resolved:

- **D1 (§9.11):** Elena Quick Check Voice row changed from ✓ PASS to ✗ FAIL — «саркастичная» в `<identity>` = voice leak, not a factual descriptor. Conclusion updated: «Елена НЕ проходит Quick Check — voice leak (KI#60, fix planned iter 94)». Updated в src/master/part_09.html + docs/canon/part_09.md.
- **D2 (OCEAN format):** All pipe (`O: 72 | C: 65`) and comma (`O:72, C:65`) formats unified to canonical compact format (`O:72 C:65`) per §5.1 RULE. Updated в src/master/part_10.html (4 cards), src/master/part_07a.html (2 locations), docs/canon/part_10.md (4 cards), docs/canon/part_07a.md (2 locations).
- **D3 (Anchors convention):** Added explicit Примечание to §7A.1 Anchors RULE: `<anchors>` XML is canonical format in src/master/; `[ANCHORS]` plain text in parts/ = known drift (KI#58), not authoring format. Updated в src/master/part_07a.html + docs/canon/part_07a.md.
- **D4 (CORE_DIRECTIVES convention):** DECISION resolved — shorthand `{{CORE_DIRECTIVES — канонический шаблон → Part 7A}}` accepted as convention per «одно определение — одно место» principle. Added Convention callout in §7A.2 language RULE. Updated в src/master/part_07a.html + docs/canon/part_07a.md.

**Closed:** D1 (§9.11 Voice check false claim), D2 (OCEAN format inconsistency), D3 (Anchors convention undocumented), D4 (CORE_DIRECTIVES shorthand — DECISION resolved).

### Remaining card-specific issues

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in `<identity>` (E1/KI#60, fix planned iter 94) |
| **Walter** | ✅ W6/W8 closed iter 92 |
| **Omnis-Zeta** | ✅ O3/O4 closed iter 92 |

---

## Decision items

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр в примере. Borderline.
- **V9:** OCEAN×Enneagram Matrix — disclaimer needed (авторская модель, не научная).
- **D4:** RESOLVED iter 93 — shorthand `{{CORE_DIRECTIVES — ...}}` accepted as convention.

---

## Invariants

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary, English only in code/ID.
- **No-repeat principle:** `[ref:]` only for navigation.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` — 96/96.
- **English leaks baseline:** 27 — by design.
- **Canon → master sync:** 95/96 PASS (KI#62 — P2-18-item-anchors-flaw audit check устарел после iter 85 `<anchors>` XML migration, контент корректен, audit script needs update).
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE). No pipes, no commas.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Anchors format:** `<anchors>` XML canonical (src/master/); `[ANCHORS]` plain text in parts/ = KI#58 drift.
- **Voice Isolation:** Linguistic voice = Examples/Greeting. Physical = Embodiment/Description.
- **Anchor Price rule:** All Anchor Prices must be bodily/mechanical (P2-R1/P2-R3).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4, iter 93).

---

## iter 94+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 94** | E1/KI#60 — Elena Voice leak fix (саркастичная → remove from `<identity>`); KI#61 — parts/ Walter sync с src/master/; KI#62 — audit script P2-18 check update | LOW–MEDIUM |
| **iter 95** | E2 — Dead weight cleanup (unused characters in Bible, Lorebook Entry 2 canonical vs non-canonical) | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

---

## Known Issues

| ID | Описание | Status |
|----|----------|--------|
| KI#58 | `parts/part_10.html` Vyshcherblenny [ANCHORS] plain text vs `<anchors>` XML in canon/master — drift from iter 85. Documented in §7A.1 Примечание (D3 fix iter 93). Build artifact, not authoring format. | OPEN (documented) |
| KI#60 | Elena Voice leak «саркастичная» in `<identity>` (E1) — adjective leaks voice into Description, should be shown through Examples only. §9.11 now correctly marks ✗ FAIL. | OPEN (fix planned iter 94) |
| KI#61 | `parts/part_10.html` Walter section drift from iter 82 — Tone Frame shorter (no OOC Protection, no Format Lock), no `<identity>` wrapper (prose outside `<spine>`), LIE has appended explanation. Needs sync with `src/master/part_10.html`. | OPEN (fix planned iter 94) |
| KI#62 | `scripts/audit_canon_master_sync.py` check `P2-18-item-anchors-flaw` ожидает old format. Контент корректен — audit script needs update. | OPEN (fix planned iter 94) |
