# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 60 — Языковая политика revision + canon deduplication (partial).** Выполнено:

- **terminology_dictionary.md revision:** §1 разделён на Category A (❌ Forbidden in code/ID/SP) и Category B (⚠️ Restricted — English mandatory only in code/ID, Russian primary in headings/prose). 10 Category B терминов (Behavioral Anchor, Voice, Voice Isolation, Voice Bleed, Embodiment Protocol, Identity Block, Greeting Message, Structured Inject, Persona Synthesis, Sensory Anchors) получили русский primary в заголовках. §6 инвертирован: первое упоминание = русский + English canonical в скобках (не English + русский). Добавлено правило 6: «гайд — единый последовательный документ, не википедия».
- **glossary.json update:** Category B терминов — Russian equivalents moved from deprecated to aliases (fully acceptable). Added Sensory Anchors + Persona Synthesis entries. Added language_category field (A/B). Version → 9.2.0.
- **Canon deduplication (no-repeat principle):**
  - Part 0 §0.2: убрано дословное повторение 3 правил. Заменено на краткое упоминание с объяснением каждого правила в 1 строку (без полного повторного формулирования).
  - Part 1 §1.5 + §1.6: мержированы как subsection «Token Budget и конвейер сборки» в §1.2. Устранены пустые H2 stub-секции.
  - Part 4 §4.9: убран Elena chain example (читатель уже знает элементы из §4.2–4.6). Чек-лист сохранён.
  - Part 4 §4.10: сокращён до 2 абзацев навигации (без повторения принципов).
- **iter60_analysis_plan.md:** ревизия плана — заменён подход `[ref:]` cross-references на «не повторять, trust sequential reader». R1/R2 рекомендации обновлены.

**Ключевой принцип iter 60:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять и не добавлять кросс-референс. Просто использовать.

Validation gates:
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 97/97 PASS (regression test unchanged).

⚠️ **Canon→master sync NOT yet updated for iter 60 changes.** Master HTML files still reflect pre-iter-60 canon. Sync deferred to iter 61 (requires all canon changes first, then batch sync to avoid drift).

---

## Known Issues

**Открытые KI:**

| KI | Severity | Description | Status |
|----|----------|-------------|--------|
| KI#40 | MEDIUM | Canon→master sync pending for iter 60 changes (Part 0, Part 1, Part 4 canon updated; master HTML not yet synced) | OPEN |

Last 5 closed KI for reference:
| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#37-39 | LOW | ✅ CLOSED | iter 54-55 |
| KI#36 | HIGH | ✅ CLOSED | iter 51 |
| KI#34-35 | MEDIUM/LOW | ✅ CLOSED | iter 48-50 |
| KI#33 | MEDIUM | ✅ CLOSED | iter 43-47 |
| KI#1-32 | various | ✅ CLOSED | iter 1-7, 20-42 |

При обнаружении новых багов — сначала документировать в STATUS.md §«Known Issues» как KI#N, потом фиксить.

---

## Invariants (iter 60+)

- **Language policy (iter 60+ invariant):** Category A = English mandatory in code/ID/SP + headings. Category B = Russian primary in headings/prose, English only in code/ID. First mention = RU + EN canonical in brackets. Sequential reader principle: don't repeat, don't cross-ref clutter.
- **No-repeat principle (iter 60+ invariant):** Гайд — единый последовательный документ. Концепции, объяснённые выше, не повторяются и не получают `[ref:]` на каждом упоминании. `[ref:]` только для навигации между Parts (указание, где находится конкретный блок).
- **Progressive disclosure labels (iter 58+ invariant):** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции (102 в canon, 98 в master HTML).
- **Canonical markers (iter 58+ invariant):** `<!-- canonical: ... -->` для 60 definition sections (59 в master HTML).
- **Glossary CORE DIRECTIVES consolidated (iter 58+ invariant):** 1 сводная с `<ol>` sub-definitions. 24 glossary entries total.
- **Annotation blocks для всех §10.X (iter 57+ invariant):** 4 карточки = 30 total Annotation bullets.
- **English leaks baseline (iter 57+ invariant):** 24 English leaks — by design (Tone Frame strings in Annotation blocks).
- **Canon → master HTML sync (iter 43+ invariant):** Regression test: 97/97 PASS.
- **Callout class policy (iter 45+):** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling (iter 40+):** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Bible ↔ canon cross-ref symmetry (iter 41+).**

---

## iter 60+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 61** | Заголовки унификация + canon→master sync (close KI#40) | MEDIUM |
| **iter 62** | R1 repetitions cleanup (don't-repeat) + §5.5 мерж | MEDIUM |
| **iter 63** | A59-1 + A59-3 (psychology) | LOW |
| **iter 64** | A59-2 + P2-remaining + drift v1.3 | MEDIUM |
| **iter 65** | A59-4 + A59-6 (optional) | LOW |

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Canon→master sync pending | Part 0, 1, 4 canon updated; master HTML NOT synced (KI#40) |
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
