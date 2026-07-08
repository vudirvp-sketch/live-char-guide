# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + KI#22/#23 ✅ CLOSED + iter 34 (CSS/CSP) + iter 35 (KI#21 P0) + iter 36 (KI#21 P1) + iter 37 (KI#21 P2) + **iter 38 — KI#21 P3 ✅ CLOSED (57/57 canon правок, +2 новых файла, build hash 69d9b813 unchanged)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 38 — CANON AUDIT P3 ✅ COMPLETE.** Применены 10 правок P3 из `docs/AUDIT_VERIFICATION.md` §4.4 (P3-1..P3-6, P3-8, P3-11, P3-12; P3-7 и P3-10 SKIP — covered by P0-2 и P2-1). Создано 2 новых canon-файла: `part_00.md` (Как читать + TL;DR), `appendix_character_map.md` (карта 5 персонажей). Canon total: 3 905 → 4 070 строк (+165 net). Build hash `69d9b813` unchanged (canon-файлы не входят в hash computation). **KI#21 ✅ CLOSED полностью (57/57 правок).**

**iter 37 — CANON AUDIT P2 ✅ COMPLETE.** 18 правок P2 (KI#21 Terminology + structural cleanup). Canon: 5 035 → 3 905 строк.

**iter 36 — CANON AUDIT P1 ✅ COMPLETE.** 11 правок P1 (KI#21 Example vs rule + dead code).

**iter 35 — CANON AUDIT P0 ✅ COMPLETE.** 16 правок P0 (KI#21 Critical contradictions).

**iter 34 — CSS CALLOUT SCOPING + CSP WORKER-SRC FIX ✅ COMPLETE.** KI#22 ✅ CLOSED, KI#23 ✅ CLOSED, KI#24 ✅ VERIFIED.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ **CLOSED** (57/57 — P0+P1+P2+P3) | iter 33-38 |
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

### KI#21 — Content Audit contradictions ✅ CLOSED полностью (iter 35-38)

**Симптом:** Полный аудит канона `docs/canon/` (14 файлов, ~5 000 строк) выявил ~50 противоречий/проблем (A1-A10, B1-B6, C1-C8, D1-D7, E1-E7, F1-F10, G1-G5). Plus 3 NEW-пункта.

**Fix plan** (`docs/AUDIT_VERIFICATION.md` §4) — 57 правок в 14 canon-файлах + 3 новые секции:

| Iter | Priority | Правок | Описание | Status |
|------|----------|--------|----------|--------|
| **iter 35** | P0 | 16 | Критические противоречия (A1-A10, NEW-1, NEW-3). | ✅ CLOSED |
| **iter 36** | P1 | 11 | Пример vs правило + dead code (B5, B6, B2, D1, D2, D4, A5, A7, A8). | ✅ CLOSED |
| **iter 37** | P2 | 18 | Терминология + структурный cleanup (C1/C2/C5, E1-E7, F1, F4-F10, B4). ~1130 строк удалений. | ✅ CLOSED |
| **iter 38** | P3 | 12 | Локальные правки (D3, D5-D7, F2, F3, F8 skip) + 4 новые секции (G1, G2, G4, G5; G3 skip). 2 новых файла. | ✅ CLOSED |

**iter 38 — P3 fix details (10 правок + 2 новых файла):**

- **P3-1 (D3):** `part_07b.md` §7B.2 + `part_10.md` §10.1 — добавлено 1-строчное **Примечание:** перед обоими Greeting Елены с пояснением: §7B.2 — учебный пример (бар, ночь); §10.1 — canonical для production-карточки (кабинет редакции, 2 часа ночи). Cross-ref между двумя локациями.
- **P3-2 (D5):** `part_10.md` §10.1–§10.4 — добавлены **Demonstrates:** callout'ы перед TEMPLATE каждой карточки (4 карточки: Елена, Уолтер, Омнис-Зета, Выщербленный) со списком принципов, которые карточка демонстрирует. Inline `<!-- Demonstrates: ... -->` комментарии внутри code blocks сохранены (per-example аннотации, code block context).
- **P3-3 (D6):** `part_03.md` §3.8 — добавлен контекст перед таблицей маркеров персонажа: Йоуёма — дополнительный персонаж сеттинга «Ошметок Веля», вводится только в этом разделе для демонстрации Voice Bleed между двумя нестандартными голосами. Cross-ref на §10.4 (Выщербленный).
- **P3-4 (D7):** 3 файла — `part_01.md` §1.4 Synthesis (Cross-ref на 4 карточки разной сложности + карта персонажей), `part_04.md` §4.11 RECOMMENDATION (Уолтер как canonical пример одиночного GHOST без Layers), `part_09.md` §9.7 Cross-ref (Уолтер как пример тестирования карточки с OCEAN-полюсами).
- **P3-5 (F2):** `part_02.md` §2.2 Типы Price table — добавлена 4-я колонка «Пример (конкретный)» с конкретными Trigger → Action → Price для каждого типа (Елена: ложь → прищуривается → напряжение в челюсти; Уолтер: сарказм → пауза → обрывание фразы). Существующая колонка «Пример» переименована в «Категории реакций».
- **P3-6 (F3):** `part_03.md` §3.1 — добавлена **Методология:** сноска после таблицы % отклонений: проценты — эмпирические оценки авторов гайда на основе тестирования ~50 карточек на 12B-32B моделях. Не точные измерения; качественные ориентиры. Применима и к §3.2.
- **P3-7 (F8):** SKIP — covered by P0-2 (A2 cautious zone).
- **P3-8 (G1):** Новый файл `docs/canon/part_00.md` §0.1 «Как читать этот гайд» — что такое Part, карта 10 модулей, VS-EMBED, нотация `[ref: ...]`, метки callouts (английские semantic anchors). ~40 строк.
- **P3-9 (G2):** `docs/canon/part_00.md` §0.2 «TL;DR / Quick Start» — минимальная карточка за 30 минут: 6 шагов сборки + 3 правила + готовый пример (Елена). ~30 строк.
- **P3-10 (G3):** SKIP — covered by P2-1 (inline defs Anchor/Voice/SPINE/OCEAN в part_01 §1.4).
- **P3-11 (G4):** Новый файл `docs/canon/appendix_character_map.md` — Appendix D: Карта 5 персонажей (Елена, Уолтер, Омнис-Зета, Выщербленный, Йоуёма). Таблица: где используется / сложность / GHOST / SPINE / Enneagram / OCEAN экстремумы / CoT / Lorebook. + RECOMMENDATION по выбору персонажа. ~32 строки.
- **P3-12 (G5):** `part_01.md` §1.8 «Pre-build checklist» — 6 вопросов перед сборкой (размер модели, контекстное окно, сложность, GHOST один или Layers, CoT нужен, Lorebook нужен). Таблица с вариантами ответов и что каждый определяет. + RECOMMENDATION для первой карточки. ~20 строк.

**Validation (iter 38):**
- `validate:master` — ✅ PASSED (12 checks, no regressions)
- `build` — ✅ hash `69d9b813` unchanged
- `validate` — ✅ 8 gates PASS, index.html 7.5KB
- `test:unit` — ✅ 43/43
- `test:integration` — ✅ 21/21
- `lint` — ✅ 0 errors, 12 warnings (baseline)
- `qa:csp` — ✅ PASS
- `qa:bundle` — ✅ 7.5KB (max 500KB)
- `qa:doc-versions` — ✅ PASS
- `audit_vs_embeds.py` — ✅ 0 regressions
- `check_english.py --scan-docs` — ✅ 0 WH40k English terms in docs/ (29 baseline leaks в `src/master/` HTML — unchanged)

**Modified files (iter 38):** 8 canon-файлов modified (`_README.md`, `part_01.md`, `part_02.md`, `part_03.md`, `part_04.md`, `part_07b.md`, `part_09.md`, `part_10.md`) + 2 новых файла (`part_00.md`, `appendix_character_map.md`). Canon total: 3 905 → 4 070 строк (+165 net: 2 новых файла ~118 строк + ~50 строк добавлено в существующие файлы, ~3 строки удалено/изменено). `index.html` root fallback — не тронут (canon не входит в hash computation).

**Что осталось:** KI#21 ✅ CLOSED полностью (57/57). iter 39+ roadmap — none planned (только потенциальные minor задачи: Glossary double-render inefficiency, Component extracts sync drift — не критично).

**Invariants (iter 38+):**
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Build hash `69d9b813` — unchanged после iter 34 (KI#23 fix). Canon-файлы не входят в hash computation.
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix ✅ MIGRATED. Part 0 (concept) + Appendix D (character map) ✅ ADDED iter 38. См. `docs/canon/_README.md` §5. |
| **CSP compliance (KI#16 CLOSED, KI#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED (iter 35-38)** | 57/57 правок закрыты. KI#21 ✅ CLOSED полностью. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`). |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
