# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-51 + **iter 52 — paragraph-level Jaccard drift detection added в `scripts/audit_canon_master_drift.py` (1.0→1.1): новый `ParagraphDrift` dataclass + 5 new functions + 2 CLI flags + 88 paragraph drifts detected (informational). Documentation cleanup: AGENT_NAVIGATION.md -23%, CHANGELOG.md iter 51 entry compressed, STATUS.md iter 51 verbose paragraph заменён на iter 52 brief. Все validation gates PASS. contentHash UNCHANGED.**
> **Дата:** 2026-07-21

---

## Текущее состояние

**iter 52 — paragraph-level drift detection added.** LOW-priority roadmap item #1 closed. `scripts/audit_canon_master_drift.py` расширен с 1.0 до 1.1: новый `ParagraphDrift` dataclass + 5 new functions (`split_canon_paragraphs`, `split_master_paragraphs`, `tokenize`, `jaccard_similarity`, `compute_paragraph_drift`) + 2 CLI flags (`--no-paragraphs`, `--paragraph-threshold FLOAT`). **88 paragraph drifts detected** (informational — expected, т.к. master HTML имеет VS-EMBEDs вместо текста, canon имеет `[ref:...]` markers). Все validation gates PASS. contentHash UNCHANGED (скрипт не в build). Shell hash `69d9b813` UNCHANGED. Дополнительно: documentation cleanup per user request — AGENT_NAVIGATION.md OP-1 iter history table compressed с 30+ verbose rows до 9 milestone rows, §6 Frequent Pitfalls compressed с 39 пунктов до 18 key pitfalls.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#36 (anchor navigation: TOC/Glossary links broken — missing `id` on `<section>`)** | HIGH | ✅ CLOSED (iter 51: 95 `id` attributes added; lazy-loader.js selector fixed; 4 English leaks translated) | iter 51 |
| **KI#34 (§1.8 Pre-build checklist missing from master HTML)** | MEDIUM | ✅ CLOSED (iter 50) | iter 48-50 |
| **KI#35 (p4_spine_overview canon metadata drift)** | LOW | ✅ CLOSED (iter 50) | iter 48-50 |
| KI#33 (canon→master HTML sync gap) | MEDIUM | ✅ CLOSED (iter 44-47: 57/57 fixes) | iter 43-47 |
| KI#32 (component-extracts/ drift: 54 historical snapshots) | LOW | ✅ CLOSED (doc-only) | iter 42 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ CLOSED | iter 33-38, 44-47 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED | iter 32 |
| KI#1..KI#19, KI#23..#31 | various | ✅ CLOSED | iter 1-7, 20-50 |

### Все открытые KI — CLOSED. Проект STABLE.

---

## Invariants (iter 52+)

- **Paragraph-level drift detection (iter 52+ invariant):** `python3 scripts/audit_canon_master_drift.py` — informational script v1.1 с paragraph-level Jaccard similarity detection. Для каждого canon paragraph находит best matching master paragraph (tokens = `\w{3,}` minus Russian/English stopwords, Jaccard = |A∩B|/|A∪B|). Paragraphs с similarity < 0.3 reported as drift. **88 drifts expected** (VS-EMBEDs replace text, canon has `[ref:...]` markers). CLI: `--no-paragraphs` (skip), `--paragraph-threshold FLOAT` (custom), `--json PATH` (JSON report). Exit 0 always.
- **Anchor navigation (iter 51+ invariant, KI#36 ✅ CLOSED):** Все `<section data-section="X">` в `src/master/*.html` имеют `id="X"` (=data-section). Браузерный anchor mechanism (`<a href="#X">`) работает нативно. `lazy-loader.js` селектор `$$('section[data-section]')`. `hashchange` event listener для smooth scroll. Glossary panel auto-close on anchor click. Regression test: `audit_canon_master_sync.py` (96/96 PASS — +4 KI#36 id checks).
- **Canon → master HTML sync (iter 43+ invariant, iter 50 ✅ COMPLETE 58/58, iter 51 ✅ +98 id attrs):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. 57/57 fixes iter 44-47 + 1 new section iter 50 + 98 id attrs iter 51. Regression test: `audit_canon_master_sync.py` (96/96 PASS — 78 positive + 18 negative).
- **Drift detector (iter 48+ invariant, iter 52 ✅ paragraph-level added):** `python3 scripts/audit_canon_master_drift.py` — informational. iter 52: 0 master-only sections, 3 canon-only by design. Heading mismatches (15) + content hash diffs (98) + paragraph drifts (88) — all expected/informational.
- **Build hash vs contentHash (iter 44+):** Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`: iter 51 = 6th change since iter 34 (98 id attrs + русификация). iter 52 = UNCHANGED (только scripts/*.py + docs изменены). **Shell hash unchanged ≠ master HTML unchanged.**
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected; symlink workaround).
- Component extracts drift (iter 42+): `python3 scripts/audit_component_extracts.py` + `_css.py` (drift expected, historical snapshots).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible.
- OCEAN labeling consistency (iter 40+): extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`.
- Bible ↔ canon cross-ref symmetry (iter 41+).
- Callout class policy (iter 45+): разрешены только `.callout.rule/.rec/.ex` (and plain `.callout`). Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important`.
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID.
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 53+ Roadmap

Все MEDIUM/HIGH priority KI закрыты (KI#36 iter 51 — последний HIGH). iter 52 закрыл первый LOW-priority пункт (paragraph drift detection). Проект STABLE. Оставшиеся задачи — LOW priority / informational:

- **Glossary double-render inefficiency** (LOW, structural) — by design (canon = source of truth, HTML = render).
- **Component extracts regeneration** (LOW, опционально) — regenerate 54 файла from master. Нет business value пока extracts не используются в build/runtime.
- **Dependabot merges** (LOW, informational, GitHub-level) — 10 unmerged branches (5 GitHub Actions + 5 npm/yarn bumps). Не влияет на runtime/build. Слияние через GitHub UI или `git merge origin/dependabot/...`.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated при `pnpm run build`. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. Единственное изменение после `pnpm run build` — `Generated:` timestamp в `index.html`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. (20 baseline English leaks в `src/master/*.html` — by design, `check_english.py`; iter 51 сократил с 29 до 20.) |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED/ADDED. См. `docs/canon/_README.md` §5. |
| **Canon → master HTML sync (iter 47 ✅ 57/57, iter 50 ✅ +1 = 58/58, iter 51 ✅ +98 id attrs; KI#33 + KI#34 + KI#36 ✅ CLOSED)** | 57/57 fixes iter 44-47 + 1 new section iter 50 + 98 id attrs iter 51. Regression test: `audit_canon_master_sync.py` (96/96 PASS). |
| **Drift detector (iter 48+, iter 52 ✅ paragraph-level added)** | `python3 scripts/audit_canon_master_drift.py` v1.1 — informational. iter 52: 0 master-only sections, 3 canon-only by design. Heading mismatches (15) + content hash diffs (98) + paragraph drifts (88) — all expected/informational. |
| **Build hash vs contentHash (iter 44+)** | Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash = SHA-256 of combined `src/master/*.html`: iter 51 = 6th change, iter 52 = UNCHANGED (только scripts/*.py + docs). |
| **CSP compliance (KI#16/#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **Callout class policy (iter 45+ invariant)** | Разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED (iter 35-38 canon, iter 44-47 master sync, iter 50 KI#34, iter 51 KI#36)** | 57/57 в canon + 57/57 синхронизированы с master + 1 new section (p1_prebuild_checklist) + 98 id attrs added iter 51. KI#21 ✅, KI#33 ✅, KI#34 ✅, KI#36 ✅ CLOSED. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |
| **Baseline warnings (not bugs)** | `check_syntax_mix.py`: 246 Markdown patterns в 11 HTML файлах (baseline). `lint`: 12 warnings (0 errors, baseline — mermaid global, unused var). `validate:master`: warnings о content outside `<section>` blocks (part_07a/07b/08/09/10, baseline). |
| **10 unmerged dependabot branches (informational)** | 5 GitHub Actions bumps + 5 npm/yarn bumps. GitHub-level maintenance PRs, не влияют на build/runtime. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
