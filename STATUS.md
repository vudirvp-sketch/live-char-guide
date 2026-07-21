# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-54 + **iter 55-56: закрыты все 3 LOW KI (KI#37/38/39 ✅ CLOSED) + Decision tree для фреймворков + 2 recap-чек-листа свёрнуты в `<details>` + scenario-метка для §9.3. Все validation gates PASS (96/96 sync). contentHash CHANGED (master HTML изменён).**
> **Дата:** 2026-07-21

---

## Текущее состояние

**iter 55-56 — закрытие KI + cleanup recap-чек-листов.** Выполнено:

- **KI#37 ✅ CLOSED** — добавлен methodology disclaimer в `part_01.md §1.1` (canon + master HTML) под таблицей «Классический vs Системный», аналогично `part_03.md §3.1`.
- **KI#38 ✅ CLOSED** — таблица AP в `part_08.md §8.1` сокращена до 4-строчного intro + cross-ref. Canonical = VS-EMBED E12. В каноне и master HTML удалена 15-строчная сводная таблица AP (дублировала визуализацию E12).
- **KI#39 ✅ CLOSED** — из code-блоков `part_10.md §10.1-10.4` удалены 23 HTML-комментария `<!-- Demonstrates: ... -->`. Сохранены только `**Annotation:**` блоки после code-блоков (детальный разбор). Применено к canon + master HTML (46 удалений суммарно).
- **Decision tree для фреймворков** — новая подсекция в `part_05.md §5.1` (4-шаговое дерево: SPINE → Enneagram → OCEAN → MBTI). Canon + master HTML.
- **Recap-чек-листы свёрнуты в `<details>`**:
  - `part_07a.md §7A.13` «Чек-лист перед тестированием» — 6 пунктов, дублирующих правила из §1.4/§4.9/§5.1/§6.2/§7A.12. Свёрнут в спойлер с cross-refs.
  - `part_09.md §9.11 Quick Check` (5 пунктов) — дубликат §9.3 в формате «ожидаемый результат». Свёрнут в спойлер.
- **Scenario-метка для §9.3** — добавлена явная формулировка сценария применения (после сборки, для локализации проблемы; для pre-deploy → §9.11; для симптома → §9.5).
- **iter 56 deep audit** — проведён повторный аудит на дублирования. Подтверждено: большинство «дублирований» — разные канонические роли (определение / анти-паттерн / диагностика / глоссарий), не подлежат удалению. Найдены 2 recap-чек-листа → свёрнуты в `<details>` (см. выше). Глоссарий (7 CORE DIRECTIVES entries) — оставлен как есть (lookup convenience > consolidation). `Дождь барабанил по стеклу` пример в 4 местах — разные функции (meta-rule / quality grade / before-after / canonical card) — оставлен.

Все validation gates PASS: `audit_canon_master_sync.py` 96/96 ✅. Drift informational: 89 drifts (was 88; +1 expected — добавлен новый параграф disclaimer в §1.1).

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#37 (methodology disclaimer missing in `part_01.md §1.1`)** | LOW | ✅ CLOSED (iter 55: disclaimer добавлен в canon + master HTML) | iter 54-55 |
| **KI#38 (AP table in `part_08.md §8.1` duplicates VS-EMBED E12)** | LOW | ✅ CLOSED (iter 55: canonical = VS-EMBED E12, таблица сокращена до intro + cross-ref) | iter 54-55 |
| **KI#39 (HTML comments `<!-- Demonstrates: ... -->` inside code blocks in `part_10.md §10.1-10.4`)** | LOW | ✅ CLOSED (iter 55: 23 комментария удалены из canon + master HTML) | iter 54-55 |
| **KI#36 (anchor navigation: TOC/Glossary links broken — missing `id` on `<section>`)** | HIGH | ✅ CLOSED (iter 51: 95 `id` attributes added; lazy-loader.js selector fixed; 4 English leaks translated) | iter 51 |
| **KI#34 (§1.8 Pre-build checklist missing from master HTML)** | MEDIUM | ✅ CLOSED (iter 50) | iter 48-50 |
| **KI#35 (p4_spine_overview canon metadata drift)** | LOW | ✅ CLOSED (iter 50) | iter 48-50 |
| KI#33 (canon→master HTML sync gap) | MEDIUM | ✅ CLOSED (iter 44-47: 57/57 fixes) | iter 43-47 |
| KI#32 (component-extracts/ drift: 54 historical snapshots) | LOW | ✅ CLOSED (doc-only) | iter 42 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ CLOSED | iter 33-38, 44-47 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED | iter 32 |
| KI#1..KI#19, KI#23..#31 | various | ✅ CLOSED | iter 1-7, 20-50 |

### Открытые KI: НЕТ. Все KI#1..KI#39 ✅ CLOSED. Все HIGH/MEDIUM/LOW — CLOSED.

---

## Invariants (iter 55+)

- **Recap-чек-листы в `<details>` (iter 55+ invariant):** Recap-чек-листы (дублирующие уже изложенные правила) сворачиваются в `<details class="interactive"><summary>...</summary>...</details>` спойлеры с явной пометкой «Recap-чек-лист (сворачивается — дублирует правила из §X.Y)». Диагностические чек-листы (с разным сценарием применения — §9.3 structural check, §9.5 symptom table, §9.6 decision tree, §9.11 pre-deploy gate) НЕ сворачиваются. Pattern: `part_07a.md §7A.13 Чек-лист перед тестированием` и `part_09.md §9.11 Quick Check`.
- **Drift categorization (iter 53+ invariant):** `python3 scripts/audit_canon_master_drift.py` — informational script v1.2 с paragraph drift categorization. iter 55 baseline: 15 vs_embed_ref + 14 cross_ref + 4 callout_label + 3 no_master_match + 53 plain_text = 89 total (+1 vs iter 53 — добавлен disclaimer параграф в part_01.md §1.1).
- **Paragraph-level drift detection (iter 52+ invariant):** `python3 scripts/audit_canon_master_drift.py` — informational script v1.2 с paragraph-level Jaccard similarity detection. **89 drifts expected** (VS-EMBEDs replace text, canon has `[ref:...]` markers).
- **Anchor navigation (iter 51+ invariant, KI#36 ✅ CLOSED):** Все `<section data-section="X">` в `src/master/*.html` имеют `id="X"`. Regression test: `audit_canon_master_sync.py` (96/96 PASS).
- **Canon → master HTML sync (iter 43+ invariant, iter 50 ✅ COMPLETE 58/58, iter 51 ✅ +98 id attrs, iter 55 ✅ +5 edits):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. 57/57 fixes iter 44-47 + 1 new section iter 50 + 98 id attrs iter 51 + iter 55 edits (KI#37 disclaimer, KI#38 table reduction, KI#39 Demonstrates removal, decision tree, recap-spoilers, scenario label). Regression test: `audit_canon_master_sync.py` (96/96 PASS — 78 positive + 18 negative).
- **Drift detector (iter 48+ invariant, iter 52 ✅ paragraph-level added, iter 53 ✅ categories added):** `python3 scripts/audit_canon_master_drift.py` — informational. iter 55: 0 master-only sections, 3 canon-only by design. Heading mismatches (15) + content hash diffs (98+) + paragraph drifts (89 = 15 vs_embed_ref + 14 cross_ref + 4 callout_label + 3 no_master_match + 53 plain_text) — all expected/informational.
- **Build hash vs contentHash (iter 44+, iter 55 ✅ CHANGED):** Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY (UNCHANGED — shell not modified). contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`: **iter 55 = 7th change since iter 34** (part_01, part_05, part_07a, part_08, part_09, part_10 master HTML modified).
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected; symlink workaround).
- Component extracts drift (iter 42+): `python3 scripts/audit_component_extracts.py` + `_css.py` (drift expected, historical snapshots).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется (KI#38: canonical = VS-EMBED E12, текстовая таблица AP убрана).
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible.
- OCEAN labeling consistency (iter 40+): extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`.
- Bible ↔ canon cross-ref symmetry (iter 41+).
- Callout class policy (iter 45+): разрешены только `.callout.rule/.rec/.ex` (and plain `.callout`). Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important`.
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID.
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 56+ Roadmap

iter 55-56 закрыли все 3 LOW KI (KI#37/38/39 ✅ CLOSED) + добавили Decision tree + свернули 2 recap-чек-листа. **Все известные KI закрыты.**

**Опциональные задачи для будущих итераций (если пользователь запросит):**

- **P2: canonical-location-маркер** — ввести `[canonical: ...]` vs `[ref: ...]` для различения определений и cross-refs (~150 правок). Поможет читателю отличить «тут полное определение» от «тут ссылка».
- **P2: Progressive disclosure метки** — `[BASIC]` / `[INTERMEDIATE]` / `[EXPERT]` к секциям (~50 секций).
- **P3: Разметка сценариев остальных чек-листов** в Part 9 — расширить iter 55 pattern (сценарий уже добавлен в §9.3) на §9.5/§9.6/§9.7/§9.11.
- **P3: Annotation blocks для §10.2-§10.4** — добавить детальные Annotation (как в §10.1) для карточек Уолтера, Омнис-Зета, Выщербленного. Несоответствие: только §10.1 имеет Annotation.
- **P3: Сокращение глоссария** — объединить 7 CORE DIRECTIVES-записей в одну сводную (только если readability страдает; lookup convenience сейчас выше).

**Что НЕ делать (предложения аудита, которые навредят — см. AUDIT_REVIEW_ITER54.md §11.1):**

- ❌ Не удалять метки `RULE:`/`RECOMMENDATION:`/`EXAMPLE:` — парсинговые якоря для LLM (`docs/canon/_README.md` §3.9).
- ❌ Не схлопывать все чек-листы в один — разные сценарии использования.
- ❌ Не удалять Enneagram — отвечает на «почему», не дублирует OCEAN.
- ❌ Не переносить Part 10 в «приложение» — это уже отдельный Part, rename ничего не даст.
- ❌ Не переписывать таблицы нарративно как принцип — потеря сканируемости.

**LOW-priority / informational (перенесено из iter 53):**

- **Glossary double-render inefficiency** (LOW, structural) — by design (canon = source of truth, HTML = render).
- **Component extracts regeneration** (LOW, опционально) — regenerate 54 файла from master. Нет business value пока extracts не используются в build/runtime.
- **Dependabot merges** (LOW, informational, GitHub-level) — 10 unmerged branches. GitHub-level maintenance, не влияет на build/runtime.
- **Paragraph drift tuning** (опционально) — iter 55 baseline: 89 drifts (was 88). +1 — добавлен disclaimer параграф в §1.1. Real semantic differences, false positives нет.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated при `pnpm run build`. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. Единственное изменение после `pnpm run build` — `Generated:` timestamp в `index.html`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. (20 baseline English leaks в `src/master/*.html` — by design, `check_english.py`; iter 51 сократил с 29 до 20.) |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED/ADDED. См. `docs/canon/_README.md` §5. |
| **Canon → master HTML sync (iter 47 ✅ 57/57, iter 50 ✅ +1 = 58/58, iter 51 ✅ +98 id attrs; iter 55 ✅ +5 edits; KI#33 + KI#34 + KI#36 + KI#37 + KI#38 + KI#39 ✅ CLOSED)** | 57/57 fixes iter 44-47 + 1 new section iter 50 + 98 id attrs iter 51 + iter 55 edits. Regression test: `audit_canon_master_sync.py` (96/96 PASS). |
| **Drift detector (iter 48+, iter 52 ✅ paragraph-level, iter 53 ✅ categories, iter 55 baseline updated)** | `python3 scripts/audit_canon_master_drift.py` v1.2 — informational. iter 55: 0 master-only sections, 3 canon-only by design. 89 paragraph drifts (15 vs_embed_ref + 14 cross_ref + 4 callout_label + 3 no_master_match + 53 plain_text) — all expected/informational. |
| **Build hash vs contentHash (iter 44+, iter 55 ✅ CHANGED)** | Shell hash `69d9b813` UNCHANGED (shell not modified). contentHash = SHA-256 of combined `src/master/*.html`: iter 55 = 7th change (6 master HTML files modified). |
| **CSP compliance (KI#16/#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **Callout class policy (iter 45+ invariant)** | Разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED (iter 35-38 canon, iter 44-47 master sync, iter 50 KI#34, iter 51 KI#36, iter 55 KI#37/38/39)** | 57/57 в canon + 57/57 синхронизированы с master + 1 new section (p1_prebuild_checklist) + 98 id attrs added iter 51 + iter 55 KI#37-39 fixes + Decision tree + recap-spoilers. KI#21 ✅, KI#33 ✅, KI#34 ✅, KI#36 ✅, KI#37 ✅, KI#38 ✅, KI#39 ✅ CLOSED. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |
| **Baseline warnings (not bugs)** | `check_syntax_mix.py`: 246 Markdown patterns в 11 HTML файлах (baseline). `lint`: 12 warnings (0 errors, baseline — mermaid global, unused var). `validate:master`: warnings о content outside `<section>` blocks (part_07a/07b/08/09/10, baseline). |
| **10 unmerged dependabot branches (informational)** | 5 GitHub Actions bumps + 5 npm/yarn bumps. GitHub-level maintenance PRs, не влияют на build/runtime. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
