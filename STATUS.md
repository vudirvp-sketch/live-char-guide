# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.4
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 90 — C1+C2 COMPLETE.** Walter/Omnis Bible backfill + align. `docs/character_bible.md` обновлен:
- **Walter (C1):** Добавлен «Примеры сообщений» с 3 expanded `<START>` блоками (~85–100 tok each) — Ex1 Neutral (кабинет химии), Ex2 Stress (кухня/Смит/деньги), Ex3 LIE crack (спальня/Pontiac Aztek). Anchors таблица разделена на Базовые + FLAW-linked, все Prices — bodily (капля пота, пальцы сжимаются, дыхание рвётся, секунда тишины дольше).
- **Omnis (C2):** Примеры сообщений заменены с short 3-block (~25–35 tok) → expanded 5-block (~80–100 tok each) — Ex1 Neutral (ксенотех-артефакт), Ex2 Stress (повреждение механизма), Ex3 GHOST leak (довоенное имя), Ex4 FLAW (эмоция=сбой), Ex5 GHOST+LIE (замена аугментации). Anchors таблица разделена на Базовые + FLAW-linked + GHOST-linked, все Prices — bodily/mechanical (сервоприводы, термальные клапаны, оптика, теплообменник, периферийные сенсоры). Annotation lines дополнены SPINE CAUSALITY per example.

**Closed:** C1 (Walter Bible backfill), C2 (Omnis Bible backfill), KI#59 Walter/Omnis partial.

### Remaining universal violations

| # | Проблема | Серьёзность |
|---|----------|-------------|
| U1 | Tone Frame недомер — ALL 4 cards DONE | ✅ CLOSED |
| U2 | CORE_DIRECTIVES не inline (shorthand reference) | DECISION |
| U3 | Examples недомер — ALL 4 cards DONE | ✅ CLOSED |

### Key remaining card-specific violations

| Card | Key remaining issues |
|------|---------------------|
| **Elena** | Voice leak «саркастичная» in `<identity>` (E1); §9.11 claims Voice check PASS but FAILS (E8) |
| **Walter** | GHOST without Anchor-trigger (W6); OCEAN cautious zones (W8) — W7 (Anchor Price temporal) FIXED in C1 |
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
- **English leaks baseline:** 27 — by design.
- **Canon → master sync:** 96/96 PASS.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/`.
- **Anchors placement:** Anchors = `<anchors>` XML wrapper inside Examples-зона (P7A-R16).
- **Voice Isolation:** Лингвистический голос — только Examples/Greeting. Физическая характеристика — Embodiment/Description.
- **Anchor Price rule:** All Anchor Prices must be bodily/mechanical (P2-R1/P2-R3). Non-physical = violation.

---

## iter 91+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 91** | C3–C4 — Vyshcherblenny/Elena Bible backfill + align + Vyshcherblenny V4 (OCEAN cautious zones) | HIGH |
| **iter 92** | D1–D4 — Guide self-contradictions (§9.11, OCEAN format, Anchors, CD convention) | LOW |
| **iter 93+** | E1–E2 — Dead weight cleanup | LOW |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

**Рекомендация для следующего чата:** iter 91 — C3+C4: Vyshcherblenny/Elena Bible backfill. Bible (docs/character_bible.md) Vyshcherblenny/Elena — pointer stubs, but per-character bibles (`docs/vyshcherblenny_character_bible.md`, `docs/elena_character_bible.md`) need Examples sync check. Also Vyshcherblenny V4 (OCEAN cautious zones). Plus V8/V9 Decision items можно поднять с автором.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом build |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 27 English leaks by design. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| `src/master/VERSION` orphan | KI#46 — не используется build pipeline. |

---

## Known Issues (active drift)

| ID | Описание | Origin |
|----|----------|--------|
| KI#58 | `parts/part_10.html` Vyshcherblenny [ANCHORS] plain text vs `<anchors>` XML in canon/master — drift из iter 85. Not in scope. | iter 85 |
| KI#59 | `docs/character_bible.md` Vyshcherblenny/Elena Примеры — pointer stubs, per-character bibles need sync check (C3+C4, iter 91). Walter/Omnis fixed in iter 90. | iter 86 |
