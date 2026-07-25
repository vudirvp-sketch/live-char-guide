# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 65 — KI#41 fix (E10 embed hardcoded colors → CSS variables).** Выполнено:

- **KI#41 fixed:** E10 VS-EMBED в `src/master/part_05.html` (строки 417–539) и `parts/part_05.html` (строки 411–534) — заменены 7 hardcoded dark-theme colors/font-family на CSS variables, matching canonical source `visual-system/integration/component-extracts/E10-visual.html`. Mapping: `#1e2430`→`var(--border)`, `#8b5cf6`→`var(--accent-violet)`, `#d9455a`→`var(--danger)`, `#3fb68b`→`var(--success)`, `#0e1117`→`var(--bg-panel)`, `#e2e6ed`→`var(--text-primary)`, `'DM Sans', sans-serif`→`var(--font-heading)`. Total: 90 replacements (45 per file). Scoped fix — E09 region в тех же файлах НЕ затронут (deferred as KI#42).
- **KI#42, KI#43 documented** как deferred (E09 similar drift; parts/ sync drift). См. § Known Issues.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 65):
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS (regression test unchanged).
- `build-unified.mjs` → 96 sections, 0 errors.
- `audit_canon_master_drift.py` → 170 paragraph drifts total (131 actionable, 39 expected). v1.3 features: `--actionable-only`, JSON v1.3.

---

## Known Issues

**Открытые KI:**

- **KI#41 (iter 65, ✅ FIXED)** — E10 VS-EMBED в `src/master/part_05.html` + `parts/part_05.html` — заменены 7 hardcoded dark-theme colors/font-family на CSS variables. Scoped fix через `/home/z/my-project/scripts/fix_e10_embed.py` (90 replacements total). E09 region не затронут. Validation gates PASS.
- **KI#42 (iter 65, deferred)** — E09 VS-EMBED в тех же файлах имеет аналогичный drift (hardcoded `#1e2430`, `#3cc8ff`, `#38bdf8`, `#0e1117`, `#e2e6ed`, и т.д.). Канон `visual-system/integration/component-extracts/E09-visual.html` использует CSS-переменные. **Не критично, отложено** до отдельной итерации чтобы не рисковать вместе с KI#41 (iter 65 = E10 only).
- **KI#43 (iter 65, deferred)** — `parts/*.html` (root fallbacks) не полностью regenerated из `src/master/` на iter 64. Запуск `pnpm run build` в iter 65 показал, что 15 parts/ файлов устарели (missing `<!-- difficulty: ... -->` labels, glossary sorting drift, §5.6→§5.5 refs в part_05, и т.д.). Reverted чтобы iter 65 остался focused на KI#41. **Fix plan:** в iter 66+ запустить `pnpm run build` и закоммитить все regenerated parts/. Build hash unchanged (69d9b813), т.е. это чисто sync-layer drift, не semantic изменения.

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

## iter 66+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 66** | KI#42 (E09 embed hardcoded colors → CSS vars, scoped) + KI#43 (parts/ rebuild: запустить `pnpm run build` и закоммитить regenerated fallbacks) | LOW–MEDIUM |
| **iter 67** | P2-remaining (R1 repetitions cleanup) + A59-4 + A59-6 (optional) | MEDIUM |
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
