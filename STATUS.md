# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 64 — A59-2 (Trigger→Stress→FLAW chain) + drift v1.3.** Выполнено:

- **A59-2: Trigger → Stress Type → FLAW chain (§5.1 canon + master HTML):** Добавлена subsection «Trigger → Stress Type → FLAW chain» после таблицы stress types. Формализует 4-этапную цепочку: Trigger (§2.1) → Stress Type (таблица выше) → FLAW (§4.4) → Anchor T→A→P (§4.8). Канонический пример Елена (anxious-reactive) с поэтапной таблицей. RULE: каждый тип стресса требует минимум 1 trigger→FLAW→Anchor chain. RECOMMENDATION: 2–3 категории триггеров на тип. Таблица «Категории триггеров по типу стресса» с примерами Anchor для всех 4 типов.
- **A59-2: ocean.json:** В `stress_types` добавлены `chain_formula`, `chain_rule`. В каждый из 4 типов добавлены `trigger_categories` (массив) и `anchor_template` (строка).
- **A59-2: Canon→master HTML sync:** Все изменения synced в `src/master/part_05.html` + `parts/part_05.html` (H3 + 2 таблицы + RULE/RECOMMENDATION callouts).
- **drift v1.3 (audit_canon_master_drift.py):** Добавлен `--actionable-only` flag — подавляет EXPECTED категории (vs_embed_ref, cross_ref, callout_label), оставляет только ACTIONABLE (plain_text, no_master_match) + все structural signals (canon-only sections, master-only sections, heading mismatches). В SUMMARY добавлена строка «Actionable drifts (plain_text + no_master_match, iter 64+): N». Категории в summary помечены `[actionable]` / `[expected]`. JSON report обновлён до version 1.3 с полями `expected_drift_categories`, `actionable_drift_categories`, `actionable_drift_count`, `actionable_only_mode`.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates:
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS (regression test unchanged).
- `build-unified.mjs` → 96 sections, 0 errors.
- `audit_canon_master_drift.py` → 170 paragraph drifts total (131 actionable, 39 expected). v1.3 features: `--actionable-only`, JSON v1.3.

---

## Known Issues

**Открытые KI:** нет.

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
- **Neuroticism stress types (iter 63+ invariant):** High N → 3 stress types (anxious-reactive / explosive-hostile / withdrawn-avoidant), Low N → stable-resilient. Each → specific SPINE FLAW pattern.
- **Personality sub-budget (iter 63+ invariant):** Description budget splits into SPINE core (priority) + OCEAN + Enneagram + MBTI (optional). 4K = SPINE + OCEAN numbers only.
- **Trigger→Stress→FLAW chain (iter 64+ invariant):** Каждый тип стресса требует минимум 1 trigger→FLAW→Anchor chain. Trigger categories: близость, конфликт, неопределённость, провал. Без explicit trigger тип стресса — абстракция.
- **drift v1.3 (iter 64+ invariant):** `audit_canon_master_drift.py` поддерживает `--actionable-only` (подавляет EXPECTED категории). JSON report version 1.3.

---

## iter 65+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 65** | P2-remaining (R1 repetitions cleanup) + A59-4 + A59-6 (optional) | MEDIUM |
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
