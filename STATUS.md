# Live Character Guide — Статус проекта

> **Версия:** 9.2.6 | **Дата:** 2026-07-27

---

## Текущее состояние

**iter 97 — Annotation callout blocks removal COMPLETE.**

- All 4 Annotation blocks removed from Part 10 (Elena §10.1, Walter §10.2, Omnis-Zeta §10.3, Vyshcherblenny §10.4).
- Cross-ref line «Подробно о Lorebook → Part 7B...» removed.
- Audit script updated (5 new absent checks). 97/97 PASS.
- Build regenerated. Root fallbacks updated.

**No Known Issues open. All previous KIs closed (incl. KI#63 — iter 96).**

---

## Decision items

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр. Borderline. Deferred.
- **V9:** OCEAN×Enneagram Matrix — disclaimer needed (авторская модель). Deferred.

---

## Invariants

- **Version sync:** All 4 sources = 9.2.6.
- **Canon → master sync:** 97/97 PASS
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE). No pipes, no commas.
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).
- **Lorebook Entry 2 (пожар Елены):** ⚠️ NON-CANONICAL secondary GHOST.

---

## Roadmap

| Итерация | Задача | Статус |
|----------|--------|--------|
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

Все технические баги закрыты. Дальнейшие итерации — по мере новых баг-репортов или решений автора по V8/V9.
