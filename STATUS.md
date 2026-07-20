# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-50 + **iter 51 — KI#36 ✅ CLOSED (anchor navigation: статичный TOC в `guide-toc` + FAB TOC + Glossary panel — все ссылки невалидны из-за отсутствия `id` атрибутов на `<section>`. Fix: добавлены `id` атрибуты 95 секциям в `src/master/*.html`, lazy-loader.js селектор `section[id]` → `section[data-section]`, вычищены 4 английских лека "see Appendix B / Model Capability Table" → "см. Приложение B / Таблица возможностей моделей". Regression test extended 92→96 checks.)**
> **Дата:** 2026-07-21

---

## Текущее состояние

**iter 51 — KI#36 ✅ CLOSED.** HIGH-priority UX fix: все внутренние якорные ссылки в гайде невалидны. Статичный TOC (`<div class="guide-toc">` в `src/master/part_01.html`) и Glossary panel (`data/glossary.json` → `term.anchor_id`) ссылаются на `#p1_card_overview` etc., но секции имеют только `data-section="p1_card_overview"` без `id`. Браузер ищет `id` (или `name`), не `data-section` — поэтому все 130+ ссылок молча скроллируют наверх. FAB TOC (кнопка `📑`) отображает только 1 пункт из-за селектора `$$('section[id]')` в `assets/lazy-loader.js` — только 1 секция имела `id`. Fix: (1) добавлены `id` атрибуты всем 95 секциям в `src/master/*.html` (= значению `data-section`); (2) селектор в `generateTOC()` изменён на `$$('section[data-section]')` для надёжности; (3) "see Appendix B" → "см. Приложение B" + "Model Capability Table" → "Таблица возможностей моделей" в 4 местах. contentHash `cc130a527480e61b` → новый. sectionCount 99 → 99 (без изменений). Regression test `audit_canon_master_sync.py` расширен 92 → 96 checks (4 новых positive checks для KI#36: id на p1_card_overview + p4_spine_overview + p7a_system_prompt + appendix_glossary). Все validation gates PASS.

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
| KI#1..KI#19, KI#23..#31, KI#34, KI#35 | various | ✅ CLOSED | iter 1-7, 20-50 |

### Все открытые KI — CLOSED. Проект STABLE.

---

## Invariants (iter 51+)

- **Anchor navigation (iter 51+ invariant, KI#36 ✅ CLOSED):** Все `<section data-section="X">` в `src/master/*.html` имеют `id="X"` (=data-section). Браузерный anchor mechanism (`<a href="#X">`) работает нативно. `lazy-loader.js` селектор `$$('section[data-section]')` (was `section[id]`). `hashchange` event listener добавлен для надёжного smooth scroll. Glossary panel auto-close on anchor click. Regression test: `audit_canon_master_sync.py` (96/96 PASS — +4 KI#36 id checks). verify_anchors.py — 96/96 anchors resolve to id attributes.
- **Canon → master HTML sync (iter 43+ invariant, iter 50 ✅ COMPLETE 58/58):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. iter 44+45+46+47: 57/57 fixes применены. iter 50: +1 section added (p1_prebuild_checklist) = 58/58 cumulative. iter 51: 0 sync changes (только id attrs + русификация). Regression test: `audit_canon_master_sync.py` (96/96 PASS — 78 positive + 18 negative).
- **Drift detector (iter 48+ invariant, iter 51 ✅ actionable clean):** `python3 scripts/audit_canon_master_drift.py` — informational. iter 51: 0 master-only sections, 3 canon-only by design. Heading mismatches (15) + content hash diffs (98, +5 от русификации) — expected.
- **Build hash vs contentHash (iter 44+):** Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY (UNCHANGED iter 51 — lazy-loader.js не входит в shell hash). contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`: → `cc130a527480e61b` (iter 50) → новый hash (iter 51, 6th change — 98 id attrs + русификация). **Shell hash unchanged ≠ master HTML unchanged.**
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

## iter 52+ Roadmap

Все MEDIUM/HIGH priority KI закрыты (включая KI#36 anchor nav iter 51). Проект STABLE. Оставшиеся задачи — LOW priority / informational:

- **Semantic paragraph-level drift detection** (LOW) — расширить `scripts/audit_canon_master_drift.py` до paragraph-level Jaccard similarity.
- **Glossary double-render inefficiency** (LOW, structural) — by design (canon = source of truth, HTML = render).
- **Component extracts regeneration** (LOW, опционально) — regenerate 54 файла from master.
- **Dependabot merges** (LOW, informational, GitHub-level) — 10 unmerged branches. Не влияет на runtime/build.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated при `pnpm run build`. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. Единственное изменение после `pnpm run build` — `Generated:` timestamp в `index.html`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. (20 baseline English leaks в `src/master/*.html` — by design, `check_english.py`; iter 51 сократил с 29 до 20: 5×«see Appendix B» + 4×«Model Capability Table» + «universal Quick Check»/«universal parameter checklist» + 2×«see → Part X» переведены.) |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED/ADDED. См. `docs/canon/_README.md` §5. |
| **Canon → master HTML sync (iter 47 ✅ COMPLETE 57/57, iter 50 ✅ +1 section = 58/58, iter 51 ✅ +98 id attrs; KI#33 + KI#34 + KI#36 ✅ CLOSED)** | 57/57 fixes iter 44-47 + 1 new section iter 50 + 98 id attrs iter 51. Regression test: `audit_canon_master_sync.py` (96/96 PASS — 78 positive + 18 negative). |
| **Drift detector (iter 48+ invariant, iter 51 ✅ actionable clean)** | `python3 scripts/audit_canon_master_drift.py` — informational. iter 51: 0 master-only sections, 3 canon-only by design. Heading mismatches (15) + content hash diffs (98) — expected. |
| **Build hash vs contentHash (iter 44+)** | Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY (unchanged iter 51 — lazy-loader.js не входит в shell hash). contentHash = SHA-256 of combined `src/master/*.html`: → новый (iter 51, 6th change — 98 id attrs + русификация). |
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
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение (как plain `<p>`, не callout). См. `docs/canon/_README.md` §3.9. |
| **Baseline warnings (not bugs)** | `check_syntax_mix.py`: 246 Markdown patterns в 11 HTML файлах (baseline). `lint`: 12 warnings (0 errors, baseline — mermaid global, unused var). `validate:master`: warnings о content outside `<section>` blocks (part_07a/07b/08/09/10, baseline). |
| **10 unmerged dependabot branches (informational)** | 5 GitHub Actions bumps (deploy-pages-5, github-script-9, setup-python-6, upload-pages-artifact-5, pnpm/action-setup-6) + 5 npm/yarn bumps (axe-core/cli-4.12.1, eslint-10.7.0, lint-staged-17.0.8, node-html-parser-9.0.0, prettier-3.9.5). GitHub-level maintenance PRs, не влияют на build/runtime. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
