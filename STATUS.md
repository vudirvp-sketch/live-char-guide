# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.6
> **Дата:** 2026-07-27

---

## Текущее состояние

**iter 95 — E2/KI#58 COMPLETE.**

- **E2:** Dead weight cleanup — 5 unused characters removed from Bible (Geralt, Joker, Jesse Pinkman, Edward Elric, Elliot Alderson — 0 mentions in any Part). Tyler Durden status updated to 🟡 Marginal (1 passing mention in Part 5). Lorebook Entry 2 (пожар Елены) clarified as ⚠️ NON-CANONICAL secondary GHOST in `docs/elena_character_bible.md`, `docs/canon/part_07b.md`, `src/master/part_07b.html`, `parts/part_07b.html`.
- **KI#58:** Omnis-Zeta + Vyshcherblenny `[ANCHORS]` plain text in `parts/part_10.html` → synced to `<anchors>` XML canonical format + bodily/mechanical Prices from `src/master/part_10.html`. Annotation bullets updated. All 4 cards now use `<anchors>` XML in parts/.

**Closed:** E2 (dead weight cleanup), KI#58 (parts/ Anchors drift).

### Card status

| Card | Status |
|------|--------|
| **Elena** | ✅ Voice leak fixed (iter 94) |
| **Walter** | ✅ parts/ synced (iter 94) |
| **Omnis-Zeta** | ✅ Anchors parts/ synced (iter 95) |
| **Vyshcherblenny** | ✅ Anchors parts/ synced (iter 95) |

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
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/). KI#58 closed — all 4 cards synced.
- **Anchor Price rule:** All Anchor Prices must be bodily/mechanical (P2-R1/P2-R3).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4, iter 93).
- **Lorebook Entry 2 (пожар Елены):** ⚠️ NON-CANONICAL secondary GHOST. Canonical Елена = 1 GHOST (предательство). «Пожар» only for secondary GHOST scenario.

---

## Known Issues

None open. All previous KIs closed.

---

## iter 95+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 96+** | Build regeneration (`pnpm run build`) to propagate all parts/ + root fallback changes | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |
