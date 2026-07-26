# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.6
> **Дата:** 2026-07-27

---

## Текущее состояние

**iter 94 — E1/KI#60/KI#61/KI#62 COMPLETE.**

- **E1/KI#60:** Elena Voice leak fixed — «саркастичная» removed from `<identity>` across all 3 layers (src/master, parts, docs/canon). Voice descriptors shown only through Examples (§3.1 Voice Isolation). §9.11 Quick Check Voice row updated from ✗ FAIL → ✓ PASS. Conclusion: Елена проходит Quick Check.
- **KI#61:** `parts/part_10.html` Walter section synced with `src/master/part_10.html` — Tone Frame expanded (full text), OOC PROTECTION added, Format Lock added, `<identity>` wrapper added, LIE appended explanation removed, OCEAN format fixed to compact, Anchors updated to `<anchors>` XML, Annotation bullets synced.
- **KI#62:** `scripts/audit_canon_master_sync.py` P2-18-item-anchors-flaw check updated — expected substring changed from old format (separate FLAW-linked item) to current merged format (Базовые + FLAW-linked in `<anchors>` XML wrapper). Audit: 96/96 PASS.

**Closed:** E1/KI#60 (Elena Voice leak), KI#61 (Walter parts/ sync), KI#62 (audit script P2-18).

### Card status

| Card | Status |
|------|--------|
| **Elena** | ✅ Voice leak fixed (iter 94) |
| **Walter** | ✅ parts/ synced (iter 94) |
| **Omnis-Zeta** | ✅ O3/O4 closed iter 92 |
| **Vyshcherblenny** | ✅ V1-V4 closed iter 89-91 |

---

## Decision items

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр. Borderline. Deferred.
- **V9:** OCEAN×Enneagram Matrix — disclaimer needed (авторская модель). Deferred.

---

## Invariants

- **Canon → master sync:** 96/96 PASS
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description. «саркастичная» → Examples, not `<identity>`.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE). No pipes, no commas.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/). KI#58 Vyshcherblenny drift resolved.
- **Anchor Price rule:** All Anchor Prices must be bodily/mechanical (P2-R1/P2-R3).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4, iter 93).

---

## iter 95+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 95** | E2 — Dead weight cleanup (unused characters in Bible, Lorebook Entry 2 canonical vs non-canonical) | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

---

## Known Issues

| ID | Описание | Status |
|----|----------|--------|
| KI#58 | `parts/part_10.html` Omnis-Zeta + Vyshcherblenny `[ANCHORS]` plain text vs `<anchors>` XML in src/master/ — drift from iter 85. Elena + Walter now synced (iter 94). Omnis-Zeta/Vyshcherblenny still use `[ANCHORS]` in parts/. | OPEN |
