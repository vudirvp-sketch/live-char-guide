# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 70 — Docs version bump + Recon (KI#46, KI#47).** Выполнено:

- **Recon:** найдены 2 пропущенных в iter 69 source-side 9.1.0 references → KI#46 (`src/master/VERSION` orphan) + KI#47 (`src/shell/styles.css` header comment).
- **KI#46 ✅ CLOSED:** `src/master/VERSION` orphan file обновлён 9.1.0 → 9.2.0 (synced с `src/VERSION`). Файл не используется build-скриптами — orphan, deletion deferred.
- **KI#47 ✅ CLOSED:** `src/shell/styles.css` header comment `v9.1.0` → `v9.2.0`. Root fallback `assets/shell-styles.css` regenerated via `pnpm run build`.
- **Docs version bump (LOW):** 9.1.0 → 9.2.0 в 5 stale docs — `docs/content_map.md`, `docs/character_bible.md`, `docs/architecture.md`, `docs/components.md`, `docs/canon/iter60_analysis_plan.md`. Titles `v9.1` → `v9.2` (4 файла). Last Updated даты bumped где применимо.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 70):
- `version-sync.mjs` → ✅ All versions 9.2.0 in sync.
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS.
- `audit_vs_embeds.py` → ✅ no regressions.
- `pnpm run build` → SUCCESS, shell hash `4074bac5` (unchanged — hash computed from `index.html`, CSS comment edit doesn't affect hash).

---

## Known Issues

| KI | Статус | Описание | Iter |
|----|--------|----------|------|
| No open KI. | | | |

**Закрытые KI:** KI#47 (iter 70), KI#46 (iter 70), KI#45 (iter 69), KI#44 (iter 68), KI#41–43 (iter 65–66), KI#40 (iter 61), KI#33–39 (iter 44–56), KI#20–32 (iter 25–42), KI#1–19 (iter 1–24).

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

## iter 71+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 71+** | P2 опционально: canonical-location-маркер (~150 правок) | MEDIUM |
| **iter 71+** | P2 опционально: Progressive disclosure метки (~50 секций) | LOW |
| **iter 71+** | P3: Annotation blocks §10.2-10.4 | LOW |
| **iter 71+** | P3: Расширение scenario-меток | LOW |
| **iter 71+** | Recon — поиск новых багов или audit-задач | LOW |
| **iter 71+** | Опционально: Component extracts regeneration (54 файла) | LOW |
| **iter 71+** | Опционально: `src/master/VERSION` orphan file deletion (KI#46 follow-up) | LOW |
| GitHub-level | Dependabot merges (10 branches) | LOW |
| by design | Glossary double-render inefficiency | — |
| by design | Paragraph drift tuning (170 drifts / 131 actionable, false positives нет) | — |

iter 60–69 plan (`docs/canon/iter60_analysis_plan.md`) — полностью выполнен. iter 70 — docs version sync + KI#46/47 cleanup.

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
