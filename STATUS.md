# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-26

---

## Текущее состояние

**iter 72 — Recon + KI#49 + Scenario labels §9.9/§9.10.** Выполнено:

- **Recon:** все validation gates PASS (version-sync ✅, 96/96 canon sync ✅, 24 English leaks baseline ✅, terms ✅, duplicates ✅, audit_vs_embeds ✅, validate:master 12/12 ✅, drift 170/131 baseline ✅, build hash `4074bac5` unchanged ✅). Найден 1 новый баг — KI#49.
- **KI#49 ✅ CLOSED:** `AGENT_NAVIGATION.md:11` говорил "97 секций" — фактически 96 секций. Off-by-one после iter 62 MBTI stub merge (commit message правильно говорил "97→96 sections", но AGENT_NAVIGATION.md остался "97"). Fix: "97 секций" → "96 секций". Verified: `grep -cE '<section[^>]*data-section' src/master/*.html` = 96.
- **Scenario labels §9.9/§9.10:** iter 71 roadmap упоминал "P3: Annotation blocks §10.2-10.4 + Расширение scenario-меток" как pending. Recon показал что **Annotation blocks §10.2-10.4 уже сделаны в iter 57** (Walter, Omnis, Vysherblenny — все 3 карточки имеют `<strong>Annotation:</strong>` блоки с `<ul>` списками). Scenario-метки iter 57 покрыли §9.3/§9.5/§9.6/§9.7/§9.11. iter 72 расширил паттерн до §9.9 (test_requirements) и §9.10 (12b_issues) — последние чек-листы Part 9 без scenario-меток. Остальные 4 секции Part 9 (§9.1 quality_scale, §9.2 one_change_rule, §9.4 additional_problems, §9.8 element_scenario_map) — reference/overview, не чек-листы, scenario-метки не нужны.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 72):
- `version-sync.mjs` → ✅ All versions 9.2.0 in sync.
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS.
- `audit_vs_embeds.py` → ✅ no regressions.
- `validate:master` → ✅ 12/12 checks PASS.
- `audit_canon_master_drift.py` → 170/131 baseline unchanged.
- `pnpm run build` → SUCCESS, shell hash `4074bac5` (unchanged).

---

## Known Issues

| KI | Статус | Описание | Iter |
|----|--------|----------|------|
| No open KI. | | | |

**Закрытые KI:** KI#49 (iter 72), KI#48 (iter 71), KI#47 (iter 70), KI#46 (iter 70), KI#45 (iter 69), KI#44 (iter 68), KI#41–43 (iter 65–66), KI#40 (iter 61), KI#33–39 (iter 44–56), KI#20–32 (iter 25–42), KI#1–19 (iter 1–24).

При обнаружении новых багов — сначала документировать в STATUS.md §«Known Issues» как KI#N, потом фиксить.

---

## Invariants (iter 61+)

- **Language policy:** Cat A = English mandatory in code/ID/SP + headings. Cat B = Russian primary in headings/prose, English only in code/ID. Cat B prose mentions = «Russian (English)» (iter 67+).
- **Heading format:** Cat B/C headings = «Русский (English Canonical)». Cat A headings stay English.
- **No-repeat principle:** Гайд — единый последовательный документ. Концепции не повторяются, `[ref:]` только для навигации между Parts.
- **Progressive disclosure labels:** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции. **iter 71: 96/96 секций покрыты.**
- **Scenario labels (iter 55/57/72):** `<strong>Сценарий:</strong>` маркер для check-list секций Part 9 — покрывает §9.3, §9.5, §9.6, §9.7, §9.9, §9.10, §9.11 (7 секций). Reference/overview секции (§9.1, §9.2, §9.4, §9.8) без маркера — by design.
- **Annotation blocks (iter 57):** Все 3 карточки §10.2-10.4 (Walter, Omnis, Vysherblenny) имеют `<strong>Annotation:</strong>` блок с `<ul>` списком Demonstrates-ссылок.
- **Canonical markers:** `<!-- canonical: ... -->` для definition sections.
- **VS-EMBED CSS variables (iter 65–66):** E09 + E10 embeds используют CSS variables (not hardcoded colors). Static fallback regions не затронуты.
- **English leaks baseline:** 24 — by design (Tone Frame strings).
- **Canon → master sync:** 96/96 PASS.
- **Callout class policy:** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Section count:** 96 секций в `src/master/` (verified: `grep -cE '<section[^>]*data-section' src/master/*.html` = 96).
- **Version sync (iter 71+):** все 9.1.0 references устранены, включая master HTML top comments.

---

## iter 73+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 73+** | P2 опционально: canonical-location-маркер (~150 правок в src/master) — отложен, требует контент-ревью | MEDIUM |
| **iter 73+** | Опционально: Component extracts regeneration (54 файла в visual-system/integration/component-extracts/) | LOW |
| **iter 73+** | Опционально: `src/master/VERSION` orphan file deletion (KI#46 follow-up — risk-free) | LOW |
| **iter 73+** | Recon — поиск новых багов или audit-задач | LOW |
| GitHub-level | Dependabot merges (10 branches — требует web access к GitHub PR UI) | LOW |
| by design | Glossary double-render inefficiency — не фиксить | — |
| by design | Paragraph drift tuning (170 drifts / 131 actionable, false positives нет) — не фиксить | — |
| DONE (iter 57) | ~~P3: Annotation blocks §10.2-10.4~~ — completed in iter 57 | — |
| DONE (iter 57+72) | ~~P3: Расширение scenario-меток~~ — iter 57 covered §9.3/5/6/7/11, iter 72 covered §9.9/10 | — |

**Рекомендация для следующего чата:** начать с Recon (LOW, ~5 мин) — проверить, не появилось ли новых багов после iter 72. Если чисто — перейти к `src/master/VERSION` orphan deletion (LOW, risk-free, KI#46 follow-up) или Component extracts regeneration (LOW). canonical-location-маркер отложить (MEDIUM, ~150 правок, требует контент-ревью).

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated на каждом `pnpm run build` |
| CORE DIRECTIVES на English | SP directives = English, prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Build hash computed only from `src/shell/index.html` | Comment edits + content additions в `src/master/*.html` НЕ влияют на hash. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
