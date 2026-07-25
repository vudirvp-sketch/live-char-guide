# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 69 — KI#45 fix (version bump 9.1.0 → 9.2.0).** Выполнено:

- **KI#45 ✅ CLOSED:** Version drift устранён — bump 9.1.0 → 9.2.0 в 10 source files (package.json, src/VERSION, data/character_schema.json, data/test_scenarios.json, src/shell/index.html, src/shell/lazy-loader.js, src/shell/widgets/js-flag.js + mermaid-init.js, scripts/build-unified.mjs, src/scripts/build-shell-unified.mjs). Build manifest verification: `pnpm run build` → SUCCESS, version-sync ✅ all 9.2.0, build hash changed `69d9b813` → `4074bac5` (expected — shell version string changed).

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 69):
- `version-sync.mjs` → ✅ All versions 9.2.0 in sync.
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS.
- `audit_vs_embeds.py` → ✅ runs without symlink workaround.
- `pnpm run build` → SUCCESS, shell hash `4074bac5`.

---

## Known Issues

| KI | Статус | Описание | Iter |
|----|--------|----------|------|
No open KI.

**Закрытые KI:** KI#45 (iter 69), KI#44 (iter 68), KI#41–43 (iter 65–66), KI#40 (iter 61), KI#33–39 (iter 44–56), KI#20–32 (iter 25–42), KI#1–19 (iter 1–24).

При обнаружении новых багов — сначала документировать в STATUS.md §«Known Issues» как KI#N, потом фиксить.

---

## Invariants (iter 61+)

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID. Cat B prose mentions = «Russian (English)» (iter 67+).
- **Heading format:** Cat B/C headings = «Русский (English Canonical)». Cat A headings stay English.
- **No-repeat principle:** Гайд — единый последовательный документ. Концепции не повторяются, `[ref:]` только для навигации между Parts.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции.
- **Canonical markers:** `<!-- canonical: ... -->` для definition sections.
- **VS-EMBED CSS variables (iter 65–66):** E09 + E10 embeds используют CSS variables (not hardcoded colors). Static fallback regions не затронуты.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Neuroticism stress types:** High N → 3 stress types, Low N → stable-resilient.
- **Trigger→Stress→FLAW chain:** Каждый тип стресса требует минимум 1 trigger→FLAW→Anchor chain.

---

## iter 70+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 70+** | P2/P3 опциональные задачи: canonical-location-маркер (~150 правок, MEDIUM), Progressive disclosure метки (~50 секций, LOW), Annotation blocks §10.2-10.4 (P3), Расширение scenario-меток (P3) | LOW-MEDIUM |
| **iter 70+** | Recon — поиск новых багов или audit-задач | LOW |
| **iter 70+** | Docs version bump (5 stale docs still say 9.1.0: content_map, character_bible, architecture, components, iter60_analysis_plan) | LOW |
| by design | Glossary double-render inefficiency | — |
| опционально | Component extracts regeneration (54 файла) | LOW |
| GitHub-level | Dependabot merges (10 branches) | LOW |
| by design | Paragraph drift tuning (170 drifts / 131 actionable, false positives нет) | — |

iter 60–69 plan (`docs/canon/iter60_analysis_plan.md`) — полностью выполнен.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом `pnpm run build` |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
