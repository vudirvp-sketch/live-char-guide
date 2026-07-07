# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18) + KI#13 ✅ CLOSED (iter 24) + Phase 4 SVG: E18 ✅ INTEGRATED (iter 25) + Deployed Guide Audit (DGA) Phase 1 — STARTED (iter 26, KI#18 🟡 ACTIVE: 1/8 fixed) + iter 27 — status check (no code changes)
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 27 — STATUS CHECK (без правок кода).** Запрошен краткий отчёт о стадии работ. Никаких изменений в master HTML / canon / build artifacts не производилось. Документация актуализирована: дата → 2026-07-08, добавлена iter 27 запись в worklog/CHANGELOG/PLAN/AGENT_NAVIGATION (status check). Точка остановки — DGA Phase 2 (iter 28+).

**iter 26 COMPLETE. Deployed Guide Audit (DGA) Phase 1 — STARTED.** Новый цикл работы: пошаговая проверка собранного при деплое гайда на дублирование смысловой и функциональной нагрузки между текстом и визуализациями (VS-EMBED E01–E18). Цель — сделать гайд читаемым, ясным и понятным, шаг за шагом.

**iter 26 result:** Полный аудит 14 master HTML файлов (Part 1–10 + 3 Appendix) выполнен — выявлено 8 duplication/inconsistency кейсов (KI#18 sub-items A–H). Применён **1 safe fix**: Part 9 Quality Scale table — убран дублирующий столбец «Признаки» (повторял E14 zone criteria), добавлен недостающий tier «Отличный», исправлена naming inconsistency «Плохой» → «Слабый» (в соответствии с E14 viz). Остальные 7 кейсов (KI#18 B–H) задокументированы для iter 28+ — применяются по принципу «лучше недоделать, чем сломать».

### Что сделано в iter 27 (status check)

| # | Задача | Результат |
|---|--------|-----------|
| a | Status report запрошен user | Концептуальный обзор: iter 26 complete (DGA Phase 1 started), KI#18 🟡 ACTIVE (1/8 fixed, 7 pending), iter 28+ = DGA Phase 2. Никаких правок кода не производилось — только документация. |
| b | Документация актуализирована | Дата → 2026-07-08. iter 27 запись добавлена в worklog/CHANGELOG/PLAN/AGENT_NAVIGATION. iter 26 → one-liner в worklog. Cleanup: KEEP last 3 detailed: 25, 26, 27. |

### Что сделано в iter 26

| # | Задача | Результат |
|---|--------|-----------|
| a | Audit 14 master HTML файлов | Полный инвентарь дублирований: VS-EMBED ↔ adjacent text, cross-Part duplication, naming inconsistencies. 8 кейсов KI#18 sub-items A–H. См. §«Known Issues» ниже. |
| b | Fix KI#18-A (Part 9 Quality Scale) | `src/master/part_09.html` (lines 263–282): 3-row table (Critical/Плохой/Хороший + Признаки + Примеры) → 4-row table (Critical/Слабый/Хороший/Отличный + Типичные паттерны ошибок) + intro paragraph linking to E14 viz. Дублирующий столбец «Признаки» удалён (E14 zone criteria уже показывает те же данные). Naming «Плохой» → «Слабый» (соответствие E14 tier label). Добавлен недостающий tier «Отличный» (85–100%). Recommendation callout обновлён. |
| c | Canon part_09.md update | `docs/canon/part_09.md`: §9.1 таблица переписана (4 уровня + Типичные паттерны ошибок). Front-matter Last synced → iter 26, Migration status + iter 26 DGA fix. Migration history row 4 обновлена. |
| d | Validation gates PASS | `validate:master` ✅ (0 errors, 0 inline styles, expected content-outside-section warnings), `build` ✅ (hash `fd3d96d3` unchanged), `validate` ✅ (8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 13 warnings pre-existing), `qa:csp` ✅, `qa:bundle` ✅ (7.2KB), `qa:doc-versions` ✅. |
| e | Root fallbacks verified | `parts/part_09.html` identical to `src/master/part_09.html` (fix propagated). `index.html` unchanged (hash unchanged). |

### Изменённые файлы в iter 26

| File | Action | Reason |
|------|--------|--------|
| `src/master/part_09.html` | Edited | Quality Scale table deduplicated: drop «Признаки» column, rename «Плохой» → «Слабый», add «Отличный» row, add intro paragraph linking to E14. part_09: 582 → 583 строк (+1). |
| `docs/canon/part_09.md` | Edited | §9.1 таблица + front-matter (Last synced, Migration status) + migration history row 4 updated. |
| `parts/part_09.html` | Regenerated | Root fallback (build artifact, timestamp updated, hash unchanged). |
| `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`, `docs/CONTENT_RESTRUCTURE_PLAN.md`, `docs/canon/_README.md` | Updated | iter 26 record + KI#18 documented. Cleanup: iter 23 → one-liner (KEEP last 3 detailed: 24, 25, 26). |

---

## Known Issues

**KI#18 NEW (iter 26).** Активный. Deployed Guide Duplication Audit (DGA) — Phase 1 audit complete, 8 sub-items identified, 1 fixed (A), 7 pending (B–H).

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#18 (Deployed Guide Duplication Audit)** | MEDIUM | **🟡 ACTIVE — Phase 1 audit done, 1/8 fixed** | found iter 26, A fixed iter 26, B–H pending iter 28+ |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED | iter 20–24 (123/123 = 100%) |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 (Canon migration complete) |
| KI#16 (qa:csp FAIL — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1–7 |

### KI#18 — Deployed Guide Duplication Audit (DGA) — Detailed

**Принцип (iter 8+):** `viz > dry text` — визуализация = замещение, не дополнение. Если VS-EMBED показывает концепцию — текст не должен её пере-объяснять. Unique контент не удаляется.

**Audit scope:** 14 master HTML файлов (Part 1–10 + 3 Appendix). Inventory: 16 VS-EMBED elements embedded across 11 Parts.

| Sub | Part | Описание дублирования / inconsistency | Severity | Status |
|-----|------|---------------------------------------|----------|--------|
| **A** | Part 9 | E14 Quality Scale viz (4 zones: Критический/Слабый/Хороший/Отличный) ↔ p9_quality_scale table (3 rows: Критический/«Плохой»/Хороший + «Признаки» column duplicating E14 criteria). Naming inconsistency «Плохой» vs viz «Слабый». Missing tier «Отличный». | MEDIUM | ✅ FIXED iter 26 |
| **B** | Part 1 | E01 Card Anatomy viz (5 blocks with descriptions + token budgets + summary table) ↔ p1_card_overview table (4 rows: Блок/Функция/Влияние/Доля). «Функция» column duplicates E01 block-content text. | LOW-MEDIUM | ⏳ pending iter 28+ |
| **C** | Part 2 | E03 Behavioral Anchors viz (T→A→P with descriptions + correct/incorrect comparison) ↔ p2_basic_anchors table (3 rows: #/Этап/Описание/Пример). «Описание» column duplicates E03 flow-node__desc text. | LOW-MEDIUM | ⏳ pending iter 28+ |
| **D** | Part 4 | E05 SPINE Framework viz (5 nodes with example text) + panel «Причинно-следственная цепь» (lines 122–136) ↔ p4_spine_overview h2 + intro paragraphs partially re-explain SPINE chain shown in viz. | LOW | ⏳ pending iter 28+ |
| **E** | Part 5 | E09 OCEAN viz inset «Context Limits» (4K/8K/16K/32K → max extrema) ↔ p5_ocean_basics «Контекстные лимиты полюсов» table (4 rows with same data). Cross-viz/text semantic inconsistency: viz says «Елена имеет 1 экстремум» (per rule <30 or >70: only O=72), text says «3 экстремальных полюса (O=72, A=38, N=68)». Rule definition unclear — strict vs broad interpretation. | MEDIUM (semantic bug) | ⏳ pending iter 28+ (needs careful rule alignment, NOT trivial fix) |
| **F** | Part 6 | E11 CoT viz (4 tiers with format + model pill) ↔ p6_cot_tiers table (4 rows: Tier/Формат/Для моделей/Пример). «Формат» + «Пример» columns largely duplicate E11 stair-step__format content. | LOW-MEDIUM | ⏳ pending iter 28+ |
| **G** | Part 8 | E12 Antipatterns viz (15 AP cards with Симптом/Причина/Исправление) ↔ per-AP sections repeat «Симптом/Причина/Решение» structure with same content. Design pattern (catalog vs detail) — partially intentional. | LOW (by design — catalog vs detail) | ⏳ pending iter 28+ (may keep by design, document rationale) |
| **H** | Part 10 | E15 Annotated Blueprint callouts (SP/Description/Examples/Greeting token budgets) duplicate E01 token budgets in Part 1. Cross-Part duplication, but integrated into annotation layer (contextually relevant). | LOW (intentional annotation) | ⏳ pending iter 28+ (likely keep, document rationale) |

**iter 28+ roadmap (DGA Phase 2):** Fix KI#18-B and KI#18-C first (clearest duplication patterns, lowest risk). KI#18-E needs careful rule alignment (strict vs broad extremum definition). KI#18-G and KI#18-H likely keep-by-design with documented rationale.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated root fallbacks. Не редактировать напрямую. Все правки — в `src/`. После `pnpm run build` fallbacks регенерируются. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canonical Guide Spec (iter 7–18) — COMPLETE** | Все 10 Parts + 3 Appendix ✅ MIGRATED. См. `docs/canon/_README.md` §5. |
| **CSP compliance (iter 19)** | `qa:csp` PASS. Все scripts в `index.html` — `<script src="...">` (external). Inline scripts forbidden. |
| **Inline styles forbidden (iter 24, KI#13 CLOSED)** | Все 123 inline `style=` → external CSS classes с `vs-ki13-*` prefix (60 селекторов). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. E18 (Greeting Algorithm) — iter 25, Part 7B. Все 18 embeded в master HTML, styles в `src/assets/vs-styles.css` SECTION 5, extracts в `visual-system/integration/component-extracts/`. |
| **Deployed Guide Audit (iter 26+) — ONGOING** | KI#18 NEW. Phase 1 audit done (8 sub-items A–H), 1 fixed (A), 7 pending (B–H). Принцип: `viz > dry text` — текст не должен пере-объяснять то, что уже показано в VS-EMBED. См. §«Known Issues» KI#18 above. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
