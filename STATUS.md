# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 61 — Canon→master sync (KI#40 closed) + Heading unification.** Выполнено:

- **KI#40 CLOSED — Canon→master sync для iter 60 changes:**
  - `src/master/part_01.html` + `parts/part_01.html`: §1.5 (`p1_token_budget_ref`) + §1.6 (`p1_pipeline_ref`) мержированы как `<h4>` subsection «Token Budget и конвейер сборки» в `p1_card_overview`. Удалены 2 отдельные `<section>` обёртки. `data-section` IDs сохранены в manifest.
  - `src/master/part_04.html` + `parts/part_04.html`: §4.9 убран Elena chain example (pre/code block + ILLUSTRATION label), сохранён чек-лист + добавлена ссылка на §4.2–§4.6 и §4.7. §4.10 сокращён: удалён `infographic inf-pipeline` (4-step), оставлены 2 параграфа навигации.
  - `parts/manifest.json`: удалены `p1_token_budget_ref` и `p1_pipeline_ref` из anchors part_01 (sections: 99→97). Titles updated: part_02 → «Поведенческие якоря (Behavioral Anchors)», part_03 → «Изоляция голоса (Voice Isolation)».
  - `parts/part_01.html` TOC: обновлены entries для part_02 (Embodiment, Sensory Anchors), part_03 (Greeting, Voice Leak), part_07b (Greeting), part_08 (AP-11 Voice Bleed).
  - Part 0 §0.2 canon-only — master HTML не требуется (by design).
- **Heading unification (iter 61):** 11 заголовков Cat B инвертированы к формату «Русский (English Canonical)» в 5 canon файлах + 5 master HTML:
  - part_02: 2.1, 2.4, 2.6 (Behavioral Anchors, Embodiment, Sensory Anchors)
  - part_03: 3.1, 3.5, 3.6 (Voice Isolation, Greeting Message, Voice Leak)
  - part_05: 5.3, 5.8 (OCEAN Value Conflicts, Persona Synthesis)
  - part_07b: 7B.1, 7B.2 (Structured Inject, Greeting Message)
  - part_08: 8.12 (Voice Bleed)
- **Doc cleanup:** AGENT_NAVIGATION.md и docs/content_map.md актуализированы — удалены stale references на `p1_token_budget_ref`/`p1_pipeline_ref`.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять и не добавлять кросс-референс. Просто использовать.

Validation gates:
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS (regression test unchanged).
- `audit_canon_master_drift.py` → 15 heading mismatches (pre-existing, mostly section number differences by design).

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
- **Heading format (iter 61+ invariant):** Cat B/C headings = «Русский (English Canonical)». Cat A headings stay English (SPINE, GHOST, LIE, FLAW, NEED, WANT, OCEAN, CoT, SP, MBTI, Enneagram, CORE DIRECTIVES, Tone Frame, Format Lock, Author's Note, OOC Protection, Anti-godmoding, Lorebook, Token Budget).
- **No-repeat principle (iter 60+ invariant):** Гайд — единый последовательный документ. Концепции, объяснённые выше, не повторяются и не получают `[ref:]` на каждом упоминании. `[ref:]` только для навигации между Parts.
- **Progressive disclosure labels (iter 58+ invariant):** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции.
- **Canonical markers (iter 58+ invariant):** `<!-- canonical: ... -->` для definition sections.
- **Glossary CORE DIRECTIVES consolidated (iter 58+ invariant):** 1 сводная с `<ol>` sub-definitions. 24 glossary entries total.
- **Annotation blocks для всех §10.X (iter 57+ invariant):** 4 карточки = 30 total Annotation bullets.
- **English leaks baseline (iter 57+ invariant):** 24 English leaks — by design (Tone Frame strings in Annotation blocks).
- **Canon → master HTML sync (iter 61+ invariant):** Regression test: 96/96 PASS.
- **Callout class policy (iter 45+):** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling (iter 40+):** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Bible ↔ canon cross-ref symmetry (iter 41+).**

---

## iter 62+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 62** | R1 repetitions cleanup (§2.2, §5.1, §5.6) + §5.5 MBTI stub merge в §5.6 | MEDIUM |
| **iter 63** | A59-1 + A59-3 (psychology) | LOW |
| **iter 64** | A59-2 + P2-remaining + drift v1.3 | MEDIUM |
| **iter 65** | A59-4 + A59-6 (optional) | LOW |

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
