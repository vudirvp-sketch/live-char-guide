# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 63 — A59-1 (Neuroticism→stress type) + A59-3 (Personality sub-budget).** Выполнено:

- **A59-1: Neuroticism→Stress Type taxonomy (§5.1):** Добавлена subsection «Тип стресса (Neuroticism → Stress Type)» после таблицы 5 измерений OCEAN. 4 типа: тревожно-реактивный (N>70), взрывной-враждебный (N>70+E↑), избегающ-замкнутый (N>60+E↓), стабильно-устойчивый (N<30). Каждый тип → конкретный SPINE-паттерн (FLAW) + пример персонажа.
- **A59-1: §5.2 Elena profile:** N=68 row обновлен — добавлен «Тип стресса: тревожно-реактивный» и объяснение связи с FLAW. RULE paragraph обновлен — добавлено объяснение, почему FLAW = defensive сарказм.
- **A59-1: §5.5 OCEAN→SPINE validation:** High Neuroticism row обновлен — ссылка на §5.1 stress types вместо generic «тревога, гнев, избегание». Признак противоречия расширен: проверка E и A при несогласованности типа стресса.
- **A59-1: ocean.json:** Добавлен `stress_types` объект в N trait (4 типа с id, label, trigger, behavior, spine_pattern, example).
- **A59-3: Personality Sub-Budget (§7A.12):** Добавлена subsection «Personality Sub-Budget (внутри Description)» после RULE paragraph. Таблица: SPINE core (80/150/350), OCEAN profile (30/50/80), Enneagram type (20/40/60), MBTI optional (—/20/40). RULE: personality sub-budgets ≤ Description budget. RECOMMENDATION: 4K = SPINE core + OCEAN numbers, 8K+ = Enneagram, 16K+ = все три.
- **A59-3: character_schema.json:** Добавлен `personality_sub_budgets` объект в `token_budgets` (4 sub_blocks с min/standard/max/priority/notes).
- **Canon→master HTML sync:** Все изменения synced в `src/master/part_05.html` + `parts/part_05.html` + `src/master/part_07a.html` + `parts/part_07a.html`.

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

---

## iter 64+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
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
