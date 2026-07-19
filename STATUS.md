# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-48 + **iter 49 — RECONNAISSANCE ONLY (no code changes; KI#34/KI#35 confirmed still open; DELETES.txt устаревший маркер удалён)**
> **Дата:** 2026-07-19

---

## Текущее состояние

**iter 49 — RECONNAISSANCE ONLY ✅ COMPLETE.** Пользователь запросил анализ репозитория на открытые/нерешённые проблемы. **Принцип: «ничего не правь и не обновляй === эта итерация чисто разведовательная»** — НИКАКИХ правок кода/master HTML/canon/data. Все validation gates прогнаны — ALL PASS (build hash `69d9b813` unchanged, contentHash `84d69ecffca28cbf` UNCHANGED). Открытые Known Issues подтверждены актуальными: **KI#34** (MEDIUM — `p1_prebuild_checklist` §1.8 Pre-build checklist missing from `src/master/part_01.html`, canon 8 IDs vs master 7) + **KI#35** (LOW — `p4_spine_overview` canon metadata drift). Дополнительные наблюдения (НЕ новые KI): `DELETES.txt` устаревший маркер удалён (trivial doc-cleanup); 10 unmerged dependabot branches (informational, GitHub-level maintenance); `audit_vs_embeds.py` pre-existing hardcoded path issue (документировано, не regression).

**iter 48 — GENERAL-PURPOSE DRIFT DETECTOR ADDED ✅ COMPLETE.** Создан informational скрипт `scripts/audit_canon_master_drift.py` (~440 строк, stdlib only) для структурного сравнения canon ↔ master HTML. Скрипт не модифицирует рабочий `audit_canon_master_sync.py` (89/89 PASS). Drift detector нашёл 2 actionable KI: KI#34 + KI#35.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#35 (p4_spine_overview canon metadata drift)** | **LOW** — cosmetic, canon missing `data-section:` declaration | 🟡 NEW (documented, fix optional) | iter 48 |
| **KI#34 (§1.8 Pre-build checklist missing from master HTML)** | **MEDIUM** — canon section exists, master HTML doesn't | 🟡 NEW (found by drift detector, fix deferred) | iter 48 |
| KI#33 (canon→master HTML sync gap) | MEDIUM | ✅ CLOSED (iter 44-47: 57/57 fixes) | iter 43-47 |
| KI#32 (component-extracts/ drift: 54 historical snapshots) | LOW | ✅ CLOSED (doc-only) | iter 42 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ CLOSED canon (57/57 iter 35-38) + master sync (57/57 iter 44-47) | iter 33-38, 44-47 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED — 5/5 sub-items fixed | iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 | iter 26-31 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#1..KI#12, KI#14..#19, KI#23..#31 | various | ✅ CLOSED | iter 1-7, 32-41 |

### KI#34 — §1.8 Pre-build checklist missing from master HTML 🟡 (iter 48, fix deferred)

**Симптом:** Canon `docs/canon/part_01.md` L130 содержит `## 1.8 Pre-build checklist` с `data-section: p1_prebuild_checklist` (added in iter 38 как P3-12/G5 fix). Однако в `src/master/part_01.html` соответствующий `<section data-section="p1_prebuild_checklist">` ОТСУТСТВУЕТ — 7 sections вместо 8 (canon 8 IDs vs master 7). iter 49 RECONFIRMED.

**Found by:** `scripts/audit_canon_master_drift.py` (iter 48).

**Fix (deferred to iter 50+):** Add `<section data-section="p1_prebuild_checklist" data-toc-nav>` block в `src/master/part_01.html` после последней секции (p1_top3_problems, L366 end-of-file). Content — перевод canon markdown в HTML (таблица 6 вопросов + RECOMMENDATION callout + Cross-ref). MEDIUM risk — требует visual verification.

### KI#35 — p4_spine_overview canon metadata drift 🟡 (iter 48, fix optional)

**Симптом:** `src/master/part_04.html` L140 содержит `<section data-section="p4_spine_overview">` с `<h2>SPINE Framework</h2>`. Однако canon `docs/canon/part_04.md` L12 `## 4.1 SPINE Overview` не имеет `` `data-section: p4_spine_overview` `` декларации. Canon metadata drift — секция рендерится корректно, но в canon не зафиксирован canonical ID.

**Found by:** `scripts/audit_canon_master_drift.py` (iter 48).

**Fix (optional):** Add одну строку `` `data-section: p4_spine_overview` `` после `## 4.1 SPINE Overview` в `docs/canon/part_04.md`. Trivial fix, cosmetic only.

---

## Invariants (iter 49+)

- **Drift detector (iter 48+ invariant):** `python3 scripts/audit_canon_master_drift.py` — informational structural comparison canon ↔ master HTML. Exit 0 всегда. JSON baseline: `build/drift-report-iter48.json`. Actionable findings: canon-only sections + master-only sections. Heading mismatches (14, by design) + content hash diffs (96, informational) — expected.
- **Canon → master HTML sync (iter 43+ invariant, iter 47 ✅ COMPLETE 57/57):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. iter 44+45+46+47: 57/57 fixes применены. Regression test: `python3 scripts/audit_canon_master_sync.py` (89/89 PASS — 71 positive + 18 negative).
- **Build hash vs contentHash (iter 44+):** Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` (iter 34-43) → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45) → `d2fdafeaf093dd80` (iter 46) → `84d69ecffca28cbf` (iter 47, iter 48+49 UNCHANGED). **Shell hash unchanged ≠ master HTML unchanged.**
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

## iter 50+ Roadmap

**MEDIUM priority (fix KI#34):**

- **KI#34 fix — §1.8 Pre-build checklist sync to master HTML.** Add `<section data-section="p1_prebuild_checklist">` block в `src/master/part_01.html` с контентом из canon `docs/canon/part_01.md` L128-145. MEDIUM risk — careful HTML edit + visual verification. После fix: contentHash изменится (5th change since iter 34). Regression test `audit_canon_master_sync.py` расширить с positive check для p1_prebuild_checklist.

**LOW priority (deferred):**

- **KI#35 fix (optional, trivial)** — add `` `data-section: p4_spine_overview` `` line в `docs/canon/part_04.md` после `## 4.1 SPINE Overview`. Cosmetic canon metadata fix.
- **Semantic paragraph-level drift detection** — расширить `scripts/audit_canon_master_drift.py` до paragraph-level Jaccard similarity для matching sections (сейчас только content hash diff).
- **Glossary double-render inefficiency** — structural, by design (canon = source of truth, HTML = render).
- **Component extracts regeneration (опционально)** — regenerate 54 файла from master. Нет business value пока extracts не используются.
- **Dependabot merges (informational, GitHub-level)** — 10 unmerged branches (5 GitHub Actions + 5 npm/yarn bumps). Слияние через GitHub UI или `git merge origin/dependabot/...`. Не влияет на runtime/build.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated при `pnpm run build`. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. Единственное изменение после `pnpm run build` — `Generated:` timestamp в `index.html`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. (29 baseline English leaks в `src/master/*.html` — by design, `check_english.py`.) |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED/ADDED. См. `docs/canon/_README.md` §5. |
| **Canon → master HTML sync (iter 47 ✅ COMPLETE 57/57, KI#33 ✅ CLOSED)** | 57/57 fixes синхронизированы с `src/master/*.html`. contentHash `84d69ecffca28cbf` (4th change since iter 34, iter 48+49 UNCHANGED). Regression test: `audit_canon_master_sync.py` (89/89 PASS). KI#34 (iter 48 NEW) — 1 section `p1_prebuild_checklist` всё ещё missing, fix deferred. |
| **Drift detector (iter 48+ invariant)** | `python3 scripts/audit_canon_master_drift.py` — informational structural comparison canon ↔ master HTML. Exit 0 всегда. JSON baseline: `build/drift-report-iter48.json`. Actionable: KI#34 + KI#35. |
| **Build hash vs contentHash (iter 44+)** | Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45) → `d2fdafeaf093dd80` (iter 46) → `84d69ecffca28cbf` (iter 47, iter 48+49 UNCHANGED). |
| **CSP compliance (KI#16/#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **Callout class policy (iter 45+ invariant)** | Разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED (iter 35-38 canon, iter 44-47 master sync)** | 57/57 в canon + 57/57 синхронизированы с master. KI#21 ✅ CLOSED, KI#33 ✅ CLOSED. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение (как plain `<p>`, не callout). См. `docs/canon/_README.md` §3.9. |
| **Baseline warnings (not bugs)** | `check_syntax_mix.py`: 246 Markdown patterns в 11 HTML файлах (baseline). `lint`: 12 warnings (0 errors, baseline — mermaid global, unused var). `validate:master`: warnings о content outside `<section>` blocks (part_07a/07b/08/09/10, baseline). |
| **10 unmerged dependabot branches (informational)** | 5 GitHub Actions bumps (deploy-pages-5, github-script-9, setup-python-6, upload-pages-artifact-5, pnpm/action-setup-6) + 5 npm/yarn bumps (axe-core/cli-4.12.1, eslint-10.7.0, lint-staged-17.0.8, node-html-parser-9.0.0, prettier-3.9.5). GitHub-level maintenance PRs, не влияют на build/runtime. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
