# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 62 — R1 repetitions cleanup + §5.5 MBTI stub merge.** Выполнено:

- **R1 cleanup §2.2:** Удалена дословная рестатировка T→A→P формата из bullet «Цена в той же сцене» (оставлено «немедленная, не отложенная», формат уже определён в §2.1). RULE о отложенном Price упрощён: «Price должен быть немедленным (см. §2.1)» вместо полного переопределения.
- **R1 cleanup §5.1→§5.6:** §5.1 RULE «не собирать SPINE снизу вверх» — оставлен (первое объяснение). §5.6 preamble + closing RULE — удалены (дословное повторение §5.1 RULE). Preamble заменён на: «Валидация SPINE описана выше (§5.1 RULE).»
- **§5.5 MBTI stub → merged в §5.6:** §5.5 (1-line stub `p5_mbti_ref`) удалён как standalone section, content merged как `<h4>` subsection «MBTI (справочная роль)» внутри §5.6 (`p5_cross_instrument_map`). §5.6 → §5.5 (renumbered). §5.7 → §5.6, §5.8 → §5.7.
- **manifest.json:** Удалён `p5_mbti_ref` из anchors part_05 (8→7 anchors, total sections 97→96).
- **content_map.md:** Part 5 entries обновлены (MBTI stub merged, renumbered §5.5/6/7), total 97→96 sections.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates:
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS (regression test unchanged).
- `build-unified.mjs` → 96 sections, 0 errors.
- `audit_canon_master_drift.py` → 15 heading mismatches (pre-existing, informational).

---

## Known Issues

**Открытые KI:** нет.

Last 5 closed KI for reference:
| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#40 | MEDIUM | ✅ CLOSED | iter 61 |
| KI#37-39 | LOW | ✅ CLOSED | iter 54-55 |
| KI#36 | HIGH | ✅ CLOSED | iter 51 |
| KI#34-35 | MEDIUM/LOW | ✅ CLOSED | iter 48-50 |
| KI#33 | MEDIUM | ✅ CLOSED | iter 43-47 |

При обнаружении новых багов — сначала документировать в STATUS.md §«Known Issues» как KI#N, потом фиксить.

---

## Invariants (iter 61+)

- **Language policy (iter 60+ invariant):** Category A = English mandatory in code/ID/SP + headings. Category B = Russian primary in headings/prose, English only in code/ID. First mention = RU + EN canonical in brackets. Sequential reader principle: don't repeat, don't cross-ref clutter.
- **Heading format (iter 61+ invariant):** Cat B/C headings = «Русский (English Canonical)». Cat A headings stay English.
- **No-repeat principle (iter 60+ invariant):** Гайд — единый последовательный документ. Концепции, объяснённые выше, не повторяются и не получают `[ref:]` на каждом упоминании. `[ref:]` только для навигации между Parts.
- **Progressive disclosure labels (iter 58+ invariant):** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции.
- **Canonical markers (iter 58+ invariant):** `<!-- canonical: ... -->` для definition sections.
- **Glossary CORE DIRECTIVES consolidated (iter 58+ invariant):** 1 сводная с `<ol>` sub-definitions.
- **Annotation blocks для всех §10.X (iter 57+ invariant):** 4 карточки = 30 total Annotation bullets.
- **English leaks baseline (iter 57+ invariant):** 24 English leaks — by design (Tone Frame strings in Annotation blocks).
- **Canon → master HTML sync (iter 61+ invariant):** Regression test: 96/96 PASS.
- **Callout class policy (iter 45+):** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling (iter 40+):** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.

---

## iter 63+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 63** | A59-1 + A59-3 (psychology) | LOW |
| **iter 64** | A59-2 + P2-remaining + drift v1.3 | MEDIUM |
| **iter 65** | A59-4 + A59-6 (optional) | LOW |
| **deferred** | Prose mentions Cat B in master HTML: invert «English (Russian)» → «Russian (English)» for full consistency with language policy iter 60 | LOW |

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Prose mentions Cat B (iter 60 language policy) | Master HTML prose всё ещё содержит «English (Russian)» форма (part_02/03/04/07a/07b/09) — not yet inverted to «Russian (English)». Sync deferred. |
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated |
| Linear single-pass | No layers/tiers/depth levels. Part 0 → Part 1 → Part 10. |
| CORE DIRECTIVES на English | SP directives = English. Guide prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| English leaks (24, baseline) | By design — Tone Frame strings in Annotations. |
| Category A/B language split | A = English mandatory; B = Russian primary in headings/prose |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
