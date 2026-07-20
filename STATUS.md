# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-49 + **iter 50 — KI#34 ✅ CLOSED + KI#35 ✅ CLOSED (§1.8 Pre-build checklist section added to `src/master/part_01.html`; `p4_spine_overview` canon metadata added; regression test extended 89→92 checks)**
> **Дата:** 2026-07-20

---

## Текущее состояние

**iter 50 — KI#34 + KI#35 ✅ CLOSED.** MEDIUM-priority KI#34 fix: добавлен `<section data-section="p1_prebuild_checklist" data-toc-nav>` block в `src/master/part_01.html` после p1_top3_problems (L366) с контентом из canon `docs/canon/part_01.md` L128-145 (6-row table + RECOMMENDATION callout + Cross-ref). contentHash `84d69ecffca28cbf` → `cc130a527480e61b` (5th change since iter 34). sectionCount 98 → 99. Regression test `audit_canon_master_sync.py` расширен с 89 → 92 checks (3 new positive checks for KI#34: section block, table header, RECOMMENDATION callout). LOW-priority KI#35 fix: `` `data-section: p4_spine_overview` `` line added в `docs/canon/part_04.md` после `## 4.1 SPINE Overview` (cosmetic canon metadata). Все validation gates PASS. Drift detector: Master-only sections 1 → 0 (KI#35 resolved), canon-only sections 4 → 3 (KI#34 resolved — остался только part_00/appendix_character_map by design).

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#34 (§1.8 Pre-build checklist missing from master HTML)** | MEDIUM | ✅ CLOSED (iter 50: section added to `src/master/part_01.html` + 3 regression checks) | iter 48-50 |
| **KI#35 (p4_spine_overview canon metadata drift)** | LOW | ✅ CLOSED (iter 50: `` `data-section: p4_spine_overview` `` line added to `docs/canon/part_04.md`) | iter 48-50 |
| KI#33 (canon→master HTML sync gap) | MEDIUM | ✅ CLOSED (iter 44-47: 57/57 fixes) | iter 43-47 |
| KI#32 (component-extracts/ drift: 54 historical snapshots) | LOW | ✅ CLOSED (doc-only) | iter 42 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ CLOSED canon (57/57 iter 35-38) + master sync (57/57 iter 44-47) | iter 33-38, 44-47 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED — 5/5 sub-items fixed | iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 | iter 26-31 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#1..KI#12, KI#14..#19, KI#23..#31 | various | ✅ CLOSED | iter 1-7, 32-41 |

### Все открытые KI — CLOSED. Проект STABLE.

---

## Invariants (iter 50+)

- **Canon → master HTML sync (iter 43+ invariant, iter 50 ✅ COMPLETE 58/58):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. iter 44+45+46+47: 57/57 fixes применены. iter 50: +1 section added (p1_prebuild_checklist) = 58/58 cumulative. Regression test: `python3 scripts/audit_canon_master_sync.py` (92/92 PASS — 74 positive + 18 negative).
- **Drift detector (iter 48+ invariant, iter 50 ✅ actionable clean):** `python3 scripts/audit_canon_master_drift.py` — informational structural comparison canon ↔ master HTML. Exit 0 всегда. JSON baseline: `build/drift-report-iter48.json`. iter 50: 0 master-only sections (KI#35 resolved), 3 canon-only sections в canon-only files (part_00, appendix_character_map — by design). Heading mismatches (15, by design) + content hash diffs (98, informational) — expected.
- **Build hash vs contentHash (iter 44+):** Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` (iter 34-43) → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45) → `d2fdafeaf093dd80` (iter 46) → `84d69ecffca28cbf` (iter 47-49) → `cc130a527480e61b` (iter 50, 5th change since iter 34). **Shell hash unchanged ≠ master HTML unchanged.**
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected; pre-existing path issue: hardcoded `parents[2] / "work" / "live-char-guide"` — запустить через symlink `ln -sfn /path/to/repo /home/z/my-project/work/live-char-guide`).
- Component extracts drift (iter 42+): `python3 scripts/audit_component_extracts.py` + `_css.py` (drift expected, historical snapshots).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible.
- OCEAN labeling consistency (iter 40+): extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`.
- Bible ↔ canon cross-ref symmetry (iter 41+).
- Callout class policy (iter 45+): разрешены только `.callout.rule/.rec/.ex` (and plain `.callout`). Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463).
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 51+ Roadmap

Все MEDIUM/HIGH priority KI закрыты. Проект STABLE. Оставшиеся задачи — LOW priority / informational:

- **Semantic paragraph-level drift detection** (LOW) — расширить `scripts/audit_canon_master_drift.py` до paragraph-level Jaccard similarity для matching sections (сейчас только content hash diff).
- **Glossary double-render inefficiency** (LOW, structural) — by design (canon = source of truth, HTML = render).
- **Component extracts regeneration** (LOW, опционально) — regenerate 54 файла from master. Нет business value пока extracts не используются.
- **Dependabot merges** (LOW, informational, GitHub-level) — 10 unmerged branches (5 GitHub Actions + 5 npm/yarn bumps). Слияние через GitHub UI или `git merge origin/dependabot/...`. Не влияет на runtime/build.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated при `pnpm run build`. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. Единственное изменение после `pnpm run build` — `Generated:` timestamp в `index.html`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. (29 baseline English leaks в `src/master/*.html` — by design, `check_english.py`.) |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED/ADDED. См. `docs/canon/_README.md` §5. |
| **Canon → master HTML sync (iter 47 ✅ COMPLETE 57/57, iter 50 ✅ +1 section = 58/58; KI#33 + KI#34 ✅ CLOSED)** | 57/57 fixes iter 44-47 + 1 new section iter 50 (p1_prebuild_checklist). contentHash `cc130a527480e61b` (5th change since iter 34). Regression test: `audit_canon_master_sync.py` (92/92 PASS). |
| **Drift detector (iter 48+ invariant, iter 50 ✅ actionable clean)** | `python3 scripts/audit_canon_master_drift.py` — informational structural comparison canon ↔ master HTML. Exit 0 всегда. JSON baseline: `build/drift-report-iter48.json`. iter 50: 0 master-only sections, 3 canon-only by design. Heading mismatches (15, by design) + content hash diffs (98, informational) — expected. |
| **Build hash vs contentHash (iter 44+)** | Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash = SHA-256 of combined `src/master/*.html`: → `cc130a527480e61b` (iter 50). |
| **CSP compliance (KI#16/#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **Callout class policy (iter 45+ invariant)** | Разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED (iter 35-38 canon, iter 44-47 master sync, iter 50 KI#34)** | 57/57 в canon + 57/57 синхронизированы с master + 1 new section (p1_prebuild_checklist) added iter 50. KI#21 ✅, KI#33 ✅, KI#34 ✅ CLOSED. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение (как plain `<p>`, не callout). См. `docs/canon/_README.md` §3.9. |
| **Baseline warnings (not bugs)** | `check_syntax_mix.py`: 246 Markdown patterns в 11 HTML файлах (baseline). `lint`: 12 warnings (0 errors, baseline — mermaid global, unused var). `validate:master`: warnings о content outside `<section>` blocks (part_07a/07b/08/09/10, baseline). |
| **10 unmerged dependabot branches (informational)** | 5 GitHub Actions bumps (deploy-pages-5, github-script-9, setup-python-6, upload-pages-artifact-5, pnpm/action-setup-6) + 5 npm/yarn bumps (axe-core/cli-4.12.1, eslint-10.7.0, lint-staged-17.0.8, node-html-parser-9.0.0, prettier-3.9.5). GitHub-level maintenance PRs, не влияют на build/runtime. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
