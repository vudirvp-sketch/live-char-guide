# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.0
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 67 — P2-remaining (R1 cleanup) + Cat B prose inversion.** Выполнено:

- **P2-remaining R1 cleanup:** §4.10 (canon `part_04.md` + master `part_04.html`) — убрано повторение принципа «OCEAN и Enneagram валидируют SPINE, не генерируют его» (canonical home — §4.1 и §5.1). Секция сокращена до чистой навигации.
- **Cat B prose inversion (deferred → iter 67):** 6 prose mentions «Behavioral Anchors (поведенческие якоря)» → «поведенческие якоря (Behavioral Anchors)» в `src/master/part_02.html` (HTML comment), `part_03.html` (table cell), `part_04.html` (paragraph), `part_07a.html` (link text), `part_07b.html` (callout body), `part_09.html` (table cell).
- **A59-4 + A59-6 (optional):** SKIP — не описаны в репозитории (упоминания только в roadmap STATUS.md / iter60_analysis_plan.md, без спецификации).
- **Cleanup:** удалены устаревшие файлы `ITER51_README.md`, `_ITER51_DELETE_STALE.txt`, `AUDIT_VERIFICATION.md` (root duplicate), `docs/AUDIT_VERIFICATION.md` (iter 33-45, KI#21 CLOSED), `docs/AUDIT_REVIEW_ITER54.md` (iter 54-56 research, KI#37/38/39 CLOSED), `docs/cross_reference_sync.md.DELETED` (marker). Ссылки на удалённые файлы убраны из `AGENT_NAVIGATION.md`/`README.md`/`CHANGELOG.md`.

**Ключевой принцип iter 60+:** Гайд — единый последовательный документ. Читатель идёт сверху вниз. Если концепция объяснена выше — не повторять. Просто использовать.

Validation gates (post-iter 67):
- `check_english.py` → 24 English leaks (baseline unchanged).
- `validate_terms.py` → ✅ All terminology valid.
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `audit_canon_master_sync.py` → 96/96 PASS.
- `pnpm run build` → SUCCESS, shell hash `69d9b813` unchanged.

---

## Known Issues

**Нет открытых KI.** Все KI закрыты: KI#41 (iter 65), KI#42/KI#43 (iter 66).

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

## iter 68+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **iter 68+** | Разведка (recon) — поиск новых багов или P3 опциональные задачи (canonical-location-маркер, Progressive disclosure метки, Annotation blocks §10.2-10.4, Расширение scenario-меток) | LOW |

iter 60–67 plan (`docs/canon/iter60_analysis_plan.md`) — полностью выполнен.

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
