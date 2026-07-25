# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 71 — Recon + KI#48 + Progressive disclosure gap closure.** Выполнено:

- **Recon:** пройдены все validation gates (version-sync ✅, 96/96 canon sync ✅, 24 English leaks baseline ✅, terms ✅, duplicates ✅, audit_vs_embeds ✅, build hash `4074bac5` unchanged ✅, drift 170/131 baseline ✅). Найден 1 новый баг — KI#48.
- **KI#48 ✅ CLOSED:** 6 master HTML files имели stale `v9.1 Master HTML` в top-of-file comment (part_01, part_02, part_05, part_06, part_07a, part_10) — пропущено в iter 70 (тогда обновили `src/shell/styles.css` header, но не master HTML comments). Fix: `v9.1` → `v9.2` в 6 файлах. Root fallbacks `parts/part_*.html` regenerated via `pnpm run build`.
- **KI#48 — docs follow-up:** `docs/architecture.md:59` содержал stale "95 sections in v9.1" → актуализировано на "96 sections in v9.2" (section count и версия).
- **Progressive disclosure gap closure:** `p6_cot_bridge` — единственная секция без `<!-- difficulty: ... -->` маркера (95/96 покрыты). Добавлен `<!-- difficulty: BASIC -->` (соответствует паттерну других intro-секций: p1_value_proposition, p2_basic_anchors, p4_spine_overview и т.д. — все BASIC). Теперь 96/96 секций покрыты progressive disclosure метками.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 71):
- `version-sync.mjs` → ✅ All versions 9.2.0 in sync.
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS.
- `audit_vs_embeds.py` → ✅ no regressions.
- `validate:master` → ✅ 12/12 checks PASS.
- `audit_canon_master_drift.py` → 170/131 baseline unchanged.
- `pnpm run build` → SUCCESS, shell hash `4074bac5` (unchanged — hash computed only from `src/shell/index.html`).

---

## Known Issues

| KI | Статус | Описание | Iter |
|----|--------|----------|------|
| No open KI. | | | |

**Закрытые KI:** KI#48 (iter 71), KI#47 (iter 70), KI#46 (iter 70), KI#45 (iter 69), KI#44 (iter 68), KI#41–43 (iter 65–66), KI#40 (iter 61), KI#33–39 (iter 44–56), KI#20–32 (iter 25–42), KI#1–19 (iter 1–24).

При обнаружении новых багов — сначала документировать в STATUS.md §«Known Issues» как KI#N, потом фиксить.

---

## Invariants (iter 61+)

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID. Cat B prose mentions = «Russian (English)» (iter 67+).
- **Heading format:** Cat B/C headings = «Русский (English Canonical)». Cat A headings stay English.
- **No-repeat principle:** Гайд — единый последовательный документ. Концепции не повторяются, `[ref:]` только для навигации между Parts.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции. **iter 71: 96/96 секций покрыты.**
- **Canonical markers:** `<!-- canonical: ... -->` для definition sections.
- **VS-EMBED CSS variables (iter 65–66):** E09 + E10 embeds используют CSS variables (not hardcoded colors). Static fallback regions не затронуты.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Neuroticism stress types:** High N → 3 stress types, Low N → stable-resilient.
- **Trigger→Stress→FLAW chain:** Каждый тип стресса требует минимум 1 trigger→FLAW→Anchor chain.
- **Version sync (iter 70+):** все 9.1.0 references устранены. **iter 71: v9.1 Master HTML comments в 6 master files тоже устранены (KI#48).**

---

## iter 72+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 72+** | P2 опционально: canonical-location-маркер (~150 правок в src/master) | MEDIUM |
| **iter 72+** | P3: Annotation blocks §10.2-10.4 | LOW |
| **iter 72+** | P3: Расширение scenario-меток | LOW |
| **iter 72+** | Recon — поиск новых багов или audit-задач | LOW |
| **iter 72+** | Опционально: Component extracts regeneration (54 файла) | LOW |
| **iter 72+** | Опционально: `src/master/VERSION` orphan file deletion (KI#46 follow-up — risk-free) | LOW |
| GitHub-level | Dependabot merges (10 branches — требует web access к GitHub PR UI) | LOW |
| by design | Glossary double-render inefficiency — не фиксить | — |
| by design | Paragraph drift tuning (170 drifts / 131 actionable, false positives нет) — не фиксить | — |

**Рекомендация для следующего чата:** начать с Recon (LOW, ~5 мин) — проверить, не появилось ли новых багов после iter 71. Если чисто — перейти к P3 Annotation blocks §10.2-10.4 (LOW effort, ~3 карточки: Уолтер, Омнис-Зета, Выщербленный). canonical-location-маркер отложить (MEDIUM, ~150 правок, требует контент-ревью).

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом `pnpm run build` |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits в `src/master/*.html` НЕ влияют на hash (iter 71 confirmed). |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
