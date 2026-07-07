# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED + KI#22/#23 ✅ CLOSED + iter 34 (CSS/CSP) + iter 35 (KI#21 P0) + **iter 36 — KI#21 P1 ✅ CLOSED (27/57 canon правок, build hash 69d9b813 unchanged)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 36 — CANON AUDIT P1 ✅ COMPLETE.** Применены 11 правок P1 из `docs/AUDIT_VERIFICATION.md` §4.2 (KI#21 Example vs rule + dead code). Все правки — точечные текстовые замены/добавления/удаления в `docs/canon/*.md`, master HTML не тронут. Build hash остался `69d9b813` (canon-файлы не входят в hash computation). Осталось 30 правок (P2 18 + P3 12) на iter 37-38.

**iter 35 — CANON AUDIT P0 ✅ COMPLETE.** 16 критических правок P0 (KI#21 Critical contradictions) применены.

**iter 34 — CSS CALLOUT SCOPING + CSP WORKER-SRC FIX ✅ COMPLETE.** KI#22 ✅ CLOSED, KI#23 ✅ CLOSED, KI#24 ✅ VERIFIED.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | 🟡 **P0+P1 ✅ CLOSED** (27/57), P2-P3 pending iter 37-38 | iter 33-38 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#23 (CSP worker-src missing) | MEDIUM | ✅ CLOSED | iter 34 |
| KI#24 (FAB Glossary/TOC verification) | LOW | ✅ VERIFIED — no bug, no fix needed | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED — 5/5 sub-items fixed | iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 | iter 26-31 |
| KI#19 (Chinese chars in part_05 L269) | LOW | ✅ CLOSED | iter 30 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 |
| KI#16 (qa:csp — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1-7 |

### KI#21 — Content Audit contradictions 🟡 P0+P1 ✅ CLOSED (iter 35-36), P2-P3 pending iter 37-38

**Симптом:** Полный аудит канона `docs/canon/` (14 файлов, 5 008 строк) выявил ~50 противоречий/проблем (A1-A10, B1-B6, C1-C8, D1-D7, E1-E7, F1-F10, G1-G5). Plus 3 NEW-пункта (NEW-1: «待» в part_04; NEW-2: Lorebook walkthrough Елены secondary GHOST; NEW-3: §5.1 vs §5.3 conflict).

**Fix plan** (`docs/AUDIT_VERIFICATION.md` §4) — 57 правок в 14 canon-файлах:

| Iter | Priority | Правок | Описание | Status |
|------|----------|--------|----------|--------|
| **iter 35** | P0 | 16 | Критические противоречия (A1-A10, NEW-1, NEW-3). | ✅ CLOSED |
| **iter 36** | P1 | 11 | Пример vs правило + dead code (B5, B6, B2, D1, D2, D4, A5, A7, A8). | ✅ CLOSED |
| **iter 37** | P2 | 18 | Терминология + структурный cleanup (C1-C2, C5, E1-E7, F1, F4-F10, B4). ~1500 строк удалений. | 🟡 pending |
| **iter 38** | P3 | 12 | Локальные правки (D3, D5-D7, F2-F3, F8, F10) + 3 новые секции (G1, G2, G4, G5). | 🟡 pending |

**iter 36 — P1 fix details (11 правок):**

- **P1-1 (A5):** `part_08.md` §8.10 AP-9 ❌ пример — добавлен явный критерий broken SPINE: «WANT совместим с NEED — нет конфликта» + FLAW не объяснён через LIE/GHOST. Снято противоречие с §4.1 (GHOST/LIE могут быть неявными — diagnose по разрыву каузальной цепи, не по текстовому отсутствию).
- **P1-2 (A7):** `part_07a.md` §7A.5 таблица «Пояснение секций AN» — добавлена строка «Счётчик вырезаний (Template B+, опционально)».
- **P1-3 (A8):** `part_08.md` §8.1 сводная таблица APs — удалена orphan-строка «— OCEAN Overload» (без номера). Footnote обновлён: «В таблице не отображается — см. Part 5 §5.3 (`p5_ocean_warning`)».
- **P1-4 (B2):** `part_10.md` §10.2 Уолтер GHOST — убран ярлык «Унижение от того, что он сам ушёл, а его оставили позади» → конкретное наблюдение «Сам работаю учителем химии в подержанном Pontiac Aztek.».
- **P1-5 (B5):** `part_04.md` §4.8 — добавлены определения 3 типов Anchors (Psychological, At-rest, Growth) после mapping-таблицы.
- **P1-6 (B6):** `part_06.md` §6.3 L73 — Tier 0 «12B» → «12B+» (синхронизация с E11 viz).
- **P1-7 (D1):** `part_04.md` §4.2 — удалена Elena secondary GHOST row (пожар). Note заменена: «В учебном гайде каждый персонаж имеет ОДИН canonical GHOST. У Елены — предательство редактора. Множественная травма (GHOST Layers) — см. Выщербленный §4.11.».
- **P1-8 (D1):** `part_04.md` §4.3 — удалена Elena secondary LIE row.
- **P1-9 (D2):** `part_04.md` §4.3 — удалена Выщербленный variant LIE row (dead code).
- **P1-10 (D4+NEW-2):** `part_07a.md` §7A.13 L667 — Lorebook walkthrough Елены: Key «пожар, огонь» → «предательство, редактор, Марина, украденная история» (primary GHOST, не secondary).
- **P1-11 (D4):** `part_07b.md` §7B.3 — Пример 1 GHOST-факт: «пожар» → «предательство» (primary GHOST). Старый пожар-пример переименован в «Пример 2: secondary GHOST (пожар)» с пометкой «используется только если в карточке выбран secondary GHOST-сценарий». Примеры 2 (Марина) и 3 (Город) перенумерованы в 3 и 4.

**Validation (iter 36):**
- `validate:master` — ✅ PASSED (12 checks, no regressions)
- `build` — ✅ hash `69d9b813` unchanged (canon-файлы не входят в hash computation; index.html root fallback регенерирован — только `Generated:` timestamp обновлён, content identical)
- `validate` — ✅ 8 gates PASS, index.html 7.5KB
- `test:unit` — ✅ 43/43
- `test:integration` — ✅ 21/21
- `lint` — ✅ 0 errors, 12 warnings (same as baseline)
- `qa:csp` — ✅ PASS (0 inline scripts)
- `qa:bundle` — ✅ 7.5KB (max 500KB)
- `qa:doc-versions` — ✅ PASS
- `audit_vs_embeds.py` — ✅ 0 regressions (28 animation classes, 11 observed, 16 covered by `scroll-enter`)

**Modified files (iter 36):** `docs/canon/part_04.md` (4 правки — P1-5, P1-7, P1-8, P1-9), `docs/canon/part_06.md` (1 — P1-6), `docs/canon/part_07a.md` (2 — P1-2, P1-10), `docs/canon/part_07b.md` (1 — P1-11), `docs/canon/part_08.md` (2 — P1-1, P1-3), `docs/canon/part_10.md` (1 — P1-4). (6 canon files, 11 edits, no src/ changes, no master HTML changes, no widget changes.)

**Что осталось (iter 37-38):**

- **iter 37 (P2):** 18 правок — терминология + структурный cleanup ~1500 строк удалений (YAML front-matter конверсия, удаление Migration Notes / Validation gates / Cross-refs ending / resume, замена 30+ «Canon planned iter X» заглушек, B4 Tier rename, F4-F10 local fixes).
- **iter 38 (P3):** 12 правок + 3 новые секции — локальные правки (D3/D5-D7, F2/F3/F8/F10) + «Как читать», TL;DR, Character map, Pre-build checklist (G1, G2, G4, G5).

**Invariants (iter 36+):**
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Build hash `69d9b813` expected unchanged для iter 37-38 (только canon-контент правки).
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18)** | Все 10 Parts + 3 Appendix ✅ MIGRATED. См. `docs/canon/_README.md` §5. |
| **CSP compliance (KI#16 CLOSED, KI#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1 (iter 35-36)** | 27/57 правок закрыты. Осталось 30 (P2 18 + P3 12) на iter 37-38. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
