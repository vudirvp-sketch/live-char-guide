# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0 (docs) / 9.1.0 (code) — см. KI#45
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 68 — Recon + KI#44 fix + cleanup.** Выполнено:

- **Recon:** запущены все validation gates (96/96 sync ✅, 24 English leaks ✅ baseline, terms ✅, duplicates ✅, build hash `69d9b813` unchanged). Audit-скрипты проверены. Найдены 2 новых KI + 1 stale файл для cleanup.
- **KI#44 ✅ CLOSED:** `scripts/audit_vs_embeds.py` — сломанный path (`parents[2]` вместо `parents[1]` + hardcoded fallback `/home/z/my-project/work/live-char-guide`). Скрипт падал с "ERROR: required files not found" без symlink workaround. Fix: `parents[1]` + удаление fallback (по образцу `audit_canon_master_sync.py`). Убраны hardcoded fallbackи в `audit_component_extracts.py` и `audit_component_extracts_css.py` (там же pattern). AGENT_NAVIGATION.md §6 pitfall #14 — убран note про symlink workaround.
- **KI#45 OPEN (LOW, deferred):** Version drift — docs (STATUS/README/AGENT_NAVIGATION/terminology_dictionary/glossary.json) говорят 9.2.0, code files (package.json/src/VERSION/character_schema.json) остались на 9.1.0 с iter 60. CHANGELOG использует `[9.2.NN]` формат. Не фикшу в iter 68 — bump кодовой версии требует координированного обновления 4 файлов + build manifest verification, лучше отдельной итерацией.
- **Cleanup:** удалён stale `_DELETED_FILES.txt` (iter 67 leftover — все перечисленные файлы уже удалены, не нужен).

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 68):
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS.
- `audit_vs_embeds.py` → ✅ runs without symlink workaround (KI#44 fixed).
- `pnpm run build` → SUCCESS, shell hash `69d9b813` unchanged.

---

## Known Issues

| KI | Статус | Описание | Iter |
|----|--------|----------|------|
| **KI#45** | OPEN (LOW) | Version drift: docs = 9.2.0, code (package.json/VERSION/character_schema.json) = 9.1.0. Bump кодовой версии отложен — требует координированного обновления 4 файлов + build manifest verification. Fix в отдельной итерации. | iter 68 |

**Закрытые KI:** KI#44 (iter 68), KI#41–43 (iter 65–66), KI#40 (iter 61), KI#33–39 (iter 44–56), KI#20–32 (iter 25–42), KI#1–19 (iter 1–24).

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

## iter 69+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 69** | KI#45 fix — version bump 9.1.0 → 9.2.0 в package.json + src/VERSION + data/character_schema.json + build manifest verification | LOW |
| **iter 69+** | P2/P3 опциональные задачи: canonical-location-маркер (~150 правок, MEDIUM), Progressive disclosure метки (~50 секций, LOW), Annotation blocks §10.2-10.4 (P3), Расширение scenario-меток (P3) | LOW-MEDIUM |
| **iter 69+** | Recon — поиск новых багов или audit-задач | LOW |
| by design | Glossary double-render inefficiency | — |
| опционально | Component extracts regeneration (54 файла) | LOW |
| GitHub-level | Dependabot merges (10 branches) | LOW |
| by design | Paragraph drift tuning (170 drifts / 131 actionable, false positives нет) | — |

iter 60–68 plan (`docs/canon/iter60_analysis_plan.md`) — полностью выполнен.

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
