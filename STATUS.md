# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-56 + **iter 57: расширение 2 установленных pattern — Annotation blocks для §10.2-§10.4 (по pattern §10.1) + scenario-метки для §9.5/§9.6/§9.7/§9.11 (по pattern §9.3). Все validation gates PASS (96/96 sync + 12/12 master validation). Drift 89→92 (+3 callout_label — ожидаемо, добавлены 3 Annotation блока). Shell hash `69d9b813` UNCHANGED.**
> **Дата:** 2026-07-25

---

## Текущее состояние

**iter 57 — расширение pattern (P3).** Выполнено:

- **Annotation blocks для §10.2-§10.4** — добавлены 3 детальных Annotation блока (canon + master HTML) по образцу §10.1 (только §10.1 имел Annotation — несоответствие устранено):
  - **§10.2 (Уолтер Уайт):** 6 bullets — SYSTEM (Character-specific rules + Tone Frame), DESCRIPTION (spine, ocean), EXAMPLES, ANCHORS, GREETING.
  - **§10.3 (Омнис-Зета 7-Квин):** 8 bullets — SYSTEM (+OOC PROTECTION + двойной Format Lock), DESCRIPTION (identity + spine + ghost_layers + ocean + Embodiment), EXAMPLES, ANCHORS (3 типа), CoT (2 Anchors), GREETING, Lorebook.
  - **§10.4 (Выщербленный):** 10 bullets — SYSTEM (Tone + OOC + Format Lock), DESCRIPTION (identity + spine + ghost_layers + enneagram + ocean), EXAMPLES, ANCHORS (4 типа + Sensory), CoT, GREETING, AUTHOR'S NOTE, Lorebook + SPINE consistency check.
- **Scenario-метки для §9.5/§9.6/§9.7/§9.11** — добавлены 4 явные формулировки сценария применения (canon + master HTML) по образцу §9.3 (только §9.3 имел scenario label — несоответствие устранено):
  - **§9.5 (Таблица симптомов):** плоский lookup «симптом → проверка → Fix». Cross-refs на §9.3 (структурная), §9.6 (decision tree), §9.11 (pre-deploy).
  - **§9.6 (Дерево решений):** пошаговый поиск с ветвлением «Если да → / Если нет →» когда §9.5 не помогла. Cross-refs на §9.3, §9.11.
  - **§9.7 (Тестовые сценарии):** эмпирическое тестирование 6 базовых сценариев после деплоя. Cross-refs на §9.11 (пред-деплой), §9.9 (метрики), §9.5/§9.6 (диагностика).
  - **§9.11 (Пред-деплой валидация):** формальная валидация перед деплоем (Quick Check 5 + Full Check 14). Cross-refs на §9.3 (пост-деплой диагностика), §9.7 (эмпирическое тестирование).
- **Информационный baseline bump English leaks:** 20 → 24 (+4). Причина: в новых Annotation блоках English-цитаты из существующих Tone Frame строк шаблонов (Pride is a quiet weapon, Flesh is weakness, Memory is currency, Never show weakness) — служат cross-ref якорями для точной локализации строки в шаблоне. By design, согласуется с existing pattern (20 baseline leaks в `src/master/*.html` — все English content внутри template code blocks).

Все validation gates PASS:
- `audit_canon_master_sync.py` → **96/96 PASS**.
- `validate-master.mjs` → **12/12 PASS** (исправлены 2 несуществующих anchor ID: `#p7a_author_note` → `#p7a_authors_note`, `#p7b_lorebook` → `#p7b_lorebook_basics`).
- `audit_canon_master_drift.py` → 92 drifts (+3 vs iter 55 baseline 89; ожидаемо — 3 новых Annotation блока добавили callout_label категорию 4→7).
- `check_duplicates.py` → ✅ no disallowed duplicates.
- Tag balance: 6/6 `<details>`/`</details>`, 15/15 `<section>`/`</section>` в изменённых файлах.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#37 (methodology disclaimer missing in `part_01.md §1.1`)** | LOW | ✅ CLOSED (iter 55) | iter 54-55 |
| **KI#38 (AP table in `part_08.md §8.1` duplicates VS-EMBED E12)** | LOW | ✅ CLOSED (iter 55) | iter 54-55 |
| **KI#39 (HTML comments `<!-- Demonstrates: ... -->` inside code blocks in `part_10.md §10.1-10.4`)** | LOW | ✅ CLOSED (iter 55) | iter 54-55 |
| **KI#36 (anchor navigation: TOC/Glossary links broken)** | HIGH | ✅ CLOSED (iter 51) | iter 51 |
| **KI#34 (§1.8 Pre-build checklist missing from master HTML)** | MEDIUM | ✅ CLOSED (iter 50) | iter 48-50 |
| **KI#35 (p4_spine_overview canon metadata drift)** | LOW | ✅ CLOSED (iter 50) | iter 48-50 |
| KI#33 (canon→master HTML sync gap) | MEDIUM | ✅ CLOSED (iter 47) | iter 43-47 |
| KI#32 (component-extracts/ drift: 54 historical snapshots) | LOW | ✅ CLOSED (doc-only) | iter 42 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ CLOSED | iter 33-38, 44-47 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED | iter 32 |
| KI#1..KI#19, KI#23..#31 | various | ✅ CLOSED | iter 1-7, 20-50 |

### Открытые KI: НЕТ. Все KI#1..KI#39 ✅ CLOSED. Все HIGH/MEDIUM/LOW — CLOSED.

---

## Invariants (iter 57+)

- **Annotation blocks для всех §10.X (iter 57+ invariant):** Все 4 карточки в `part_10.md §10.1-§10.4` имеют детальный `**Annotation:**` блок после `</details>` (снаружи спойлера), перечисляющий какие блоки карточки какие инструменты демонстрируют + cross-refs. Pattern: §10.1 (Елена, 6 bullets, iter ~33 baseline) → §10.2 (Уолтер, 6 bullets, iter 57) → §10.3 (Омнис-Зета, 8 bullets, iter 57) → §10.4 (Выщербленный, 10 bullets, iter 57).
- **Scenario-метки для всех Part 9 checklist секций (iter 57+ invariant):** Все 5 чек-листов/таблиц в Part 9 (`§9.3`, `§9.5`, `§9.6`, `§9.7`, `§9.11`) имеют явную `**Сценарий:**` формулировку в начале секции (когда применять, чем отличается от соседних секций, cross-refs). Pattern: §9.3 (iter 55) → §9.5/§9.6/§9.7/§9.11 (iter 57).
- **HTML comments `<!-- Demonstrates: ... -->` вне code-блоков — intentional metadata (iter 57+ informational note):** 23 HTML-комментария `<!-- Demonstrates: ... -->` в master HTML (part_02: 2, part_03: 4, part_04: 3, part_05: 1, part_06: 2, part_07a: 3, part_07b: 5, part_08: 1, part_09: 2) — НЕ баг, трогать НЕ надо. Это document-level parsing anchors для LLM (не внутри code-блоков, не в каноне). Отличать от KI#39 (который был про такие же комментарии ВНУТРИ code-блоков `part_10.md §10.1-10.4` — там они загрязняли copy-paste шаблоны и были удалены).
- **Recap-чек-листы в `<details>` (iter 55+ invariant):** Recap-чек-листы (дублирующие уже изложенные правила) сворачиваются в `<details class="interactive">` спойлеры. Диагностические чек-листы (с разным сценарием применения) НЕ сворачиваются.
- **Drift categorization (iter 53+ invariant, iter 57 baseline updated):** `python3 scripts/audit_canon_master_drift.py` v1.2. iter 57 baseline: 15 vs_embed_ref + 14 cross_ref + **7** callout_label (was 4; +3 — добавлены 3 Annotation блока) + 3 no_master_match + 53 plain_text = **92 total** (+3 vs iter 55 baseline 89).
- **Paragraph-level drift detection (iter 52+ invariant).**
- **Anchor navigation (iter 51+ invariant, KI#36 ✅ CLOSED).**
- **Canon → master HTML sync (iter 43+ invariant, iter 57 ✅ +7 edits):** 57/57 fixes iter 44-47 + 1 new section iter 50 + 98 id attrs iter 51 + iter 55 edits + iter 57 edits (3 Annotation blocks + 4 scenario labels + 2 anchor ID fixes). Regression test: `audit_canon_master_sync.py` (96/96 PASS).
- **Build hash vs contentHash (iter 44+, iter 57 ✅ CHANGED):** Shell hash `69d9b813` UNCHANGED (shell not modified). contentHash = SHA-256 of combined `src/master/*.html`: iter 57 = **8th change** since iter 34 (part_09, part_10 master HTML modified).
- **English leaks baseline bump (iter 57+ invariant):** 20 → 24 English leaks в `src/master/*.html`. +4 — quoted Tone Frame / Character rule strings в новых Annotation блоках (Pride is a quiet weapon, Flesh is weakness, Memory is currency, Never show weakness). By design, cross-ref anchors.
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected; symlink workaround).
- Component extracts drift (iter 42+): `python3 scripts/audit_component_extracts.py` + `_css.py` (drift expected, historical snapshots).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Принцип «guide's role as example takes priority over character canon».
- OCEAN labeling consistency (iter 40+): extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`.
- Bible ↔ canon cross-ref symmetry (iter 41+).
- Callout class policy (iter 45+): разрешены только `.callout.rule/.rec/.ex` (and plain `.callout`). Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important`.
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID.
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 58+ Roadmap

iter 57 расширил 2 установленных pattern (Annotation blocks + scenario-метки). **Все известные KI закрыты.**

**Опциональные задачи для будущих итераций (если пользователь запросит):**

- **P2: canonical-location-маркер** — ввести `[canonical: ...]` vs `[ref: ...]` для различения определений и cross-refs (~150 правок). Поможет читателю отличить «тут полное определение» от «тут ссылка».
- **P2: Progressive disclosure метки** — `[BASIC]` / `[INTERMEDIATE]` / `[EXPERT]` к секциям (~50 секций).
- **P3: Сокращение глоссария** — объединить 7 CORE DIRECTIVES-записей в одну сводную (только если readability страдает; lookup convenience сейчас выше).

**Что НЕ делать (предложения аудита, которые навредят — см. AUDIT_REVIEW_ITER54.md §11.1):**

- ❌ Не удалять метки `RULE:`/`RECOMMENDATION:`/`EXAMPLE:` — парсинговые якоря для LLM (`docs/canon/_README.md` §3.9).
- ❌ Не удалять HTML-комментарии `<!-- Demonstrates: ... -->` вне code-блоков в master HTML — parsing anchors для LLM (23 случая в 9 файлах, iter 57 informational note).
- ❌ Не схлопывать все чек-листы в один — разные сценарии использования.
- ❌ Не удалять Enneagram — отвечает на «почему», не дублирует OCEAN.
- ❌ Не переносить Part 10 в «приложение» — это уже отдельный Part, rename ничего не даст.
- ❌ Не переписывать таблицы нарративно как принцип — потеря сканируемости.

**LOW-priority / informational:**

- **Glossary double-render inefficiency** (LOW, structural) — by design.
- **Component extracts regeneration** (LOW, опционально) — regenerate 54 файла from master. Нет business value пока extracts не используются в build/runtime.
- **Dependabot merges** (LOW, informational, GitHub-level) — 10 unmerged branches.
- **Paragraph drift tuning** (опционально) — iter 57 baseline: 92 drifts (was 89; +3 = 3 новых Annotation блока, ожидаемо). Real semantic differences, false positives нет.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated при `pnpm run build`. Не редактировать напрямую. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. (24 baseline English leaks в `src/master/*.html` — by design, `check_english.py`; iter 51 сократил с 29 до 20, iter 57 bump 20→24 — quoted Tone Frame strings в Annotation блоках.) |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED/ADDED. |
| **Canon → master HTML sync (iter 47 ✅ 57/57, iter 50 ✅ +1, iter 51 ✅ +98 id attrs; iter 55 ✅ +5 edits; iter 57 ✅ +7 edits)** | 57/57 fixes iter 44-47 + 1 new section iter 50 + 98 id attrs iter 51 + iter 55 edits + iter 57 edits (3 Annotation blocks + 4 scenario labels + 2 anchor ID fixes). Regression test: `audit_canon_master_sync.py` (96/96 PASS). |
| **Drift detector (iter 48+, iter 52 ✅ paragraph-level, iter 53 ✅ categories, iter 57 baseline updated)** | `python3 scripts/audit_canon_master_drift.py` v1.2 — informational. iter 57: 0 master-only sections, 3 canon-only by design. 92 paragraph drifts (15 vs_embed_ref + 14 cross_ref + **7** callout_label (was 4, +3 = Annotation blocks) + 3 no_master_match + 53 plain_text) — all expected/informational. |
| **Build hash vs contentHash (iter 44+, iter 57 ✅ CHANGED)** | Shell hash `69d9b813` UNCHANGED. contentHash = SHA-256 of combined `src/master/*.html`: iter 57 = 8th change (part_09, part_10 modified). |
| **Annotation blocks for all §10.X (iter 57+ invariant)** | §10.1 (6 bullets, baseline) + §10.2 (6 bullets, iter 57) + §10.3 (8 bullets, iter 57) + §10.4 (10 bullets, iter 57) = 30 total bullets. |
| **Scenario labels for all Part 9 checklists (iter 57+ invariant)** | §9.3 (iter 55) + §9.5/§9.6/§9.7/§9.11 (iter 57) = 5 sections with `**Сценарий:**` labels. |
| **CSP compliance (KI#16/#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **Callout class policy (iter 45+ invariant)** | Разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important`. |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED (iter 35-38 canon, iter 44-47 master sync, iter 50 KI#34, iter 51 KI#36, iter 55 KI#37/38/39, iter 57 pattern extension)** | 57/57 в canon + 57/57 синхронизированы с master + 1 new section (p1_prebuild_checklist) + 98 id attrs added iter 51 + iter 55 KI#37-39 fixes + Decision tree + recap-spoilers + iter 57 Annotation blocks + scenario labels. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation`, `Сценарий` — English semantic anchors (Сценарий — Russian локальное уточнение для Part 9). `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |
| **Baseline warnings (not bugs)** | `check_syntax_mix.py`: 246 Markdown patterns в 11 HTML файлах (baseline). `lint`: 12 warnings (0 errors, baseline — mermaid global, unused var). `validate:master`: warnings о content outside `<section>` blocks (baseline). |
| **10 unmerged dependabot branches (informational)** | 5 GitHub Actions bumps + 5 npm/yarn bumps. GitHub-level maintenance PRs, не влияют на build/runtime. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
