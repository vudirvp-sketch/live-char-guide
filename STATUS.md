# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 66 — KI#42 + KI#43.** Выполнено:

- **KI#42 fixed:** E09 VS-EMBED в `src/master/part_05.html` + `parts/part_05.html` (строки 27–143) — заменены 9 hardcoded dark-theme colors + 3 font-family на CSS variables, matching canonical `visual-system/integration/component-extracts/E09-visual.html`. Mapping: `#1e2430`→`var(--border)`, `#3cc8ff`→`var(--accent-cyan)`, `rgba(60,200,255,0.12)`→`var(--cyan-12)`, `#e2e6ed`→`var(--text-primary)`, `#6b7590`→`var(--text-muted)`, `#f0a040`→`var(--accent-amber)`, `#8b95a8`→`var(--text-secondary)`, `#d9455a`→`var(--danger)`, `#3fb68b`→`var(--success)`, `'DM Sans', sans-serif`→`var(--font-heading)`, `'JetBrains Mono', monospace`→`var(--font-mono)`, `'Inter', sans-serif`→`var(--font-micro)`. Total: 90 replacements (45 per file). Scoped fix — static fallback region не затронут.
- **KI#43 fixed:** `pnpm run build` → все `parts/*.html` + root fallbacks regenerated из `src/master/`. Build hash unchanged (69d9b813). 15 stale files обновлены (difficulty labels, glossary sorting, §5 refs drift). 17 files changed total.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 66):
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS (regression test unchanged).
- `build-unified.mjs` → 96 sections, 0 errors. Hash: 69d9b813.

---

## Known Issues

**Нет открытых KI.** KI#41 (iter 65) и KI#42/KI#43 (iter 66) — все FIXED.

При обнаружении новых багов — сначала документировать в STATUS.md §«Known Issues» как KI#N, потом фиксить.

---

## Invariants (iter 61+)

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID.
- **Heading format:** Cat B/C headings = «Русский (English Canonical)». Cat A headings stay English.
- **No-repeat principle:** Гайд — единый последовательный документ. Концепции не повторяются, `[ref:]` только для навигации между Parts.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции.
- **Canonical markers:** `<!-- canonical: ... -->` для definition sections.
- **VS-EMBED CSS variables (iter 65–66):** E09 + E10 embeds используют CSS variables (not hardcoded colors). Static fallback regions не затронуты — theme-aware только в VS scope.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Neuroticism stress types:** High N → 3 stress types, Low N → stable-resilient.
- **Trigger→Stress→FLAW chain:** Каждый тип стресса требует минимум 1 trigger→FLAW→Anchor chain.

---

## iter 67+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 67** | P2-remaining (R1 repetitions cleanup) + A59-4 + A59-6 (optional) | MEDIUM |
| **deferred** | Prose mentions Cat B: invert «English (Russian)» → «Russian (English)» в master HTML (part_02/03/04/07a/07b/09) | LOW |

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Prose mentions Cat B | «English (Russian)» форма ещё не inverted → deferred |
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
