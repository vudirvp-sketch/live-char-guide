# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-57 + **iter 58: P3 glossary consolidation (7 CD entries → 1 сводная) + P2 progressive disclosure (102 `<!-- difficulty: ... -->`) + P2 canonical markers (60 `<!-- canonical: ... -->`). Synced canon→master HTML (14 файлов). Все validation gates PASS (96/96 sync + 12/12 master validation). Drift 92→170 (+78 — informational, HTML comments in canon detected as plain_text drift by v1.2 detector; real content sync unchanged). English leaks 24 UNCHANGED. Shell hash `69d9b813` UNCHANGED.**
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 58 — P2+P3 metadata enrichment.** Выполнено:

- **P3: Glossary consolidation** — 7 individual CORE DIRECTIVES glossary entries (Show Never Tell, Embodiment First, Spatial & Anatomical Lock, Environmental Reactivity, Influence Boundary, Consequence Driven, Pre-Generation Filter) объединены в одну сводную запись `CORE DIRECTIVES` с 7 номерными sub-определениями. 6 отдельных `###`-заголовков удалены из `appendix_glossary.md` (30→24 entries). Synced to `src/master/appendix_glossary.html` (8 `<div class="glossary-entry">` → 1 consolidated с `<ol>`).
- **P2: Progressive disclosure labels** — `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` HTML comments добавлены к 102 секциям в 16 canon files + 98 секциям в 14 master HTML files (part_00, appendix_character_map — no master HTML). **BASIC** = 43, **INTERMEDIATE** = 39, **EXPERT** = 20. Placement: сразу после `data-section:` в canon, сразу после `<section>` opening tag в master HTML.
- **P2: Canonical markers** — `<!-- canonical: ... -->` HTML comments добавлены к 60 definition sections в 15 canon files + 59 секциям в 14 master HTML files. Маркирует первичное определение концепции (canonical home), отличая от cross-ref/расширения/применения.
- **_README.md §3.10** — новый subsection документирует difficulty + canonical marker conventions.

Все validation gates PASS:
- `audit_canon_master_sync.py` → **96/96 PASS**.
- `validate-master.mjs` → **12/12 PASS** (22 baseline warnings).
- `audit_canon_master_drift.py` → 170 drifts (+78 vs iter 57 baseline 92; **all informational** — HTML comments `<!-- difficulty/canonical -->` in canon detected as plain_text/no_master_match drifts by v1.2 detector. Real content sync unchanged, no regressions).
- `check_duplicates.py` → ✅ no disallowed duplicates.
- `check_english.py` → 24 English leaks (baseline unchanged from iter 57).

---

## Known Issues

**Открытые KI: НЕТ. Все KI#1..KI#39 ✅ CLOSED.**

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

## Invariants (iter 58+)

- **Progressive disclosure labels (iter 58+ invariant):** `<!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->` для каждой секции (102 в canon, 98 в master HTML). BASIC = минимум для 12B/8K. INTERMEDIATE = 32B+/16K. EXPERT = API-level.
- **Canonical markers (iter 58+ invariant):** `<!-- canonical: ... -->` для 60 definition sections (59 в master HTML). Отличает canonical home от cross-ref/расширения.
- **Glossary CORE DIRECTIVES consolidated (iter 58+ invariant):** 7 individual CD glossary entries → 1 сводная с `<ol>` sub-definitions. 30→24 glossary entries total.
- **Annotation blocks для всех §10.X (iter 57+ invariant):** 4 карточки = 30 total Annotation bullets.
- **Scenario-метки для всех Part 9 checklist секций (iter 57+ invariant):** 5 секций с `**Сценарий:**` labels.
- **HTML comments `<!-- Demonstrates: ... -->` вне code-блоков (iter 57+ informational):** 23 cases в 9 master HTML files — parsing anchors для LLM, НЕ баг. Отличать от KI#39 (inside code blocks — removed).
- **Recap-чек-листы в `<details>` (iter 55+ invariant).**
- **Drift categorization (iter 58 baseline updated):** v1.2 detector. iter 58: 170 paragraph drifts (15 vs_embed_ref + 14 cross_ref + 7 callout_label + 32 no_master_match + 102 plain_text). +78 vs iter 57 (92) — all from `<!-- difficulty/canonical -->` HTML comments in canon detected as plain_text/no_master_match drifts. **Informational, not regressions.** Real content sync unchanged (96/96 PASS).
- **English leaks baseline (iter 57+ invariant):** 24 English leaks — by design (Tone Frame strings in Annotation blocks).
- **Canon → master HTML sync (iter 43+ invariant):** Regression test: `audit_canon_master_sync.py` (96/96 PASS).
- **Build hash vs contentHash:** Shell hash `69d9b813` UNCHANGED. contentHash = 9th change (appendix_glossary, all master HTML files modified — difficulty/canonical markers added).
- **Callout class policy (iter 45+):** `.callout.rule/.rec/.ex` and plain `.callout` only.
- **OCEAN labeling (iter 40+):** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Bible ↔ canon cross-ref symmetry (iter 41+).**
- **VS scroll-animation (KI#20 CLOSED).**
- **CSS scoping (iter 34+).**
- Принцип `viz > dry text`.
- Принцип «guide's role as example > character canon».

---

## iter 59+ Roadmap

iter 58 завершил 3 metadata-задачи (P3 glossary + P2 progressive disclosure + P2 canonical markers). **Все известные KI закрыты.**

**Опциональные задачи для будущих итераций:**

- **P2-remaining: canonical markers extension** — оставшиеся ~90 `[ref: ...]` cross-refs можно дополнить `[canonical: ...]` для секций без маркера (если cần). Current 60 covers all key definition sections.
- **Drift detector v1.3** — filter out `<!-- difficulty/canonical -->` HTML comments from drift computation (reduces informational drift from 170→~92, matching iter 57 baseline). LOW priority, cosmetic.
- **Canonical markers sync to remaining Part 0 + appendix_character_map** — these have no master HTML, markers only in canon.

**Что НЕ делать (предложения, которые навредят):**

- ❌ Не удалять метки `RULE:`/`RECOMMENDATION:`/`EXAMPLE:` — parsing anchors.
- ❌ Не удалять HTML-комментарии `<!-- Demonstrates: ... -->` вне code-блоков — parsing anchors (23 cases).
- ❌ Не удалять `<!-- difficulty: ... -->` / `<!-- canonical: ... -->` — new parsing anchors (iter 58+).
- ❌ Не схлопывать все чек-листы в один — разные сценарии.
- ❌ Не удалять Enneagram — отвечает на «почему», не дублирует OCEAN.
- ❌ Не переписывать таблицы нарративно — потеря сканируемости.

**LOW-priority / informational:**

- **Component extracts regeneration** (LOW) — 54 файла, no business value until used in build.
- **Dependabot merges** (LOW, GitHub-level) — 10 unmerged branches.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| Root fallbacks in git | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated, don't edit directly. |
| Linear single-pass | No layers/tiers/depth levels. Part 0 → Part 1 → Part 10. |
| CORE DIRECTIVES на English | SP directives = English. Guide prose = Russian. 24 English leaks by design. |
| Node >= 20, pnpm 10.x | Runtime + package manager. |
| Canon migration COMPLETE | All 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED. |
| Canon→master sync (96/96 PASS) | Regression test unchanged across iter 58. |
| Drift baseline (170, informational) | +78 vs iter 57 (92) — HTML comments in canon. Real sync unchanged. |
| English leaks (24, baseline) | By design — Tone Frame strings in Annotations. |
| Callout labels English | RULE/RECOMMENDATION/EXAMPLE/etc — parsing anchors, not localized. |
| Difficulty labels (102, iter 58+) | BASIC/INTERMEDIATE/EXPERT — section metadata. |
| Canonical markers (60, iter 58+) | Definition section markers — distinguish canonical from cross-ref. |
| Glossary entries (24, iter 58+) | 7 CD entries consolidated into 1. |
| 10 unmerged dependabot branches | GitHub-level, don't affect build/runtime. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
