# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED + KI#22/#23 ✅ CLOSED + iter 34 (CSS/CSP) + **iter 35 — KI#21 P0 ✅ CLOSED (16/57 canon правок, build hash 69d9b813 unchanged)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 35 — CANON AUDIT P0 ✅ COMPLETE.** Применены 16 критических правок P0 из `docs/AUDIT_VERIFICATION.md` §4.1 (KI#21 Content Audit contradictions). Все правки — точечные текстовые замены в `docs/canon/*.md`, master HTML не тронут. Build hash остался `69d9b813` (canon-файлы не входят в hash computation). Осталось 41 правок (P1 11 + P2 18 + P3 12) на iter 36-38.

**iter 34 — CSS CALLOUT SCOPING + CSP WORKER-SRC FIX ✅ COMPLETE.** KI#22 ✅ CLOSED (Callout CSS Scoping Bug — scope E15 `.callout*` к `.blueprint-area .callout*`, 56 callouts fixed), KI#23 ✅ CLOSED (`worker-src 'self' blob:;` added), KI#24 ✅ VERIFIED (FAB works, no bug). Build hash `fd3d96d3` → `69d9b813`.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | 🟡 **P0 ✅ CLOSED** (16/57), P1-P3 pending iter 36-38 | iter 33-38 |
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

### KI#21 — Content Audit contradictions 🟡 P0 ✅ CLOSED (iter 35), P1-P3 pending iter 36-38

**Симптом:** Полный аудит канона `docs/canon/` (14 файлов, 5 008 строк) выявил ~50 противоречий/проблем: 10 критических (A1-A10), 6 «пример vs правило» (B1-B6), 8 категорий терминологии (C1-C8), 7 проблем примеров (D1-D7), 7 структурных (E1-E7), 10 локальных (F1-F10), 5 концептуальных упущений (G1-G5). Plus 3 NEW-пункта (NEW-1: «待» в part_04; NEW-2: Lorebook walkthrough Елены secondary GHOST; NEW-3: §5.1 vs §5.3 conflict).

**Fix plan** (`docs/AUDIT_VERIFICATION.md` §4) — 57 правок в 14 canon-файлах:

| Iter | Priority | Правок | Описание | Status |
|------|----------|--------|----------|--------|
| **iter 35** | P0 | 16 | Критические противоречия (A1-A10, NEW-1, NEW-3). | ✅ CLOSED |
| **iter 36** | P1 | 11 | Пример vs правило + dead code (B1, B2, B5, B6, D1, D2, D4, A5, A7, A8). | 🟡 pending |
| **iter 37** | P2 | 18 | Терминология + структурный cleanup (C1-C2, C5, E1-E7, F1, F4-F10, B4). ~1500 строк удалений. | 🟡 pending |
| **iter 38** | P3 | 12 | Локальные правки (D3, D5-D7, F2-F3, F8, F10) + 3 новые секции (G1, G2, G4, G5). | 🟡 pending |

**iter 35 — P0 fix details (16 правок):**

- **P0-1 (A1):** `appendix_glossary.md` L175 — `T→A→P (Trigger → Action → Pattern)` → `T→A→P (Trigger → Action → Price)`. Глоссарий теперь соответствует фактическому определению «Цена (физическая реакция)».
- **P0-2 (A2 + F8 + NEW-2 partial):** `part_07a.md` L666 — Елена OCEAN: «3 экстремума (для 8K+ — допустимо; для 4K оставьте N=68 и A=38)» → «1 экстремум (O=72 > 70), A=38/N=68 — cautious zone, связаны с FLAW и GHOST». Соответствует строгому правилу §5.1 (NEW-3 fix).
- **P0-3..P0-6 (A3):** Счётчик вырезаний 2 → 3 уровня (синхронизация в 4 местах): `part_04.md` L334, `part_07a.md` L244, `part_07a.md` L404-405, `part_10.md` L500. Добавлено «после 7-го — что такое "помощь"» везде.
- **P0-7..P0-9 (A4 + D2-partial):** NEED Выщербленного синхронизирован в `part_04.md`: L151 (table row) + L197 (full chain) — единая формулировка «Принять, что полноценности не существует. Выбрать, как растворяться — в функции или в диссонансе.». L152 (variant row) удалена полностью (dead code, P0-9).
- **P0-10 (A6):** `part_08.md` L313 — AP-15 ❌ пример: «замолкает на час» (отложенная Price) → «кричит: "Вон!"» (immediate Price).
- **P0-11 (A9):** `part_09.md` L282 — resume: «3-уровневая шкала (Critical/Bad/Good)» → «4-зонная шкала (Критический / Слабый / Хороший / Отличный)». Соответствует §9.1 4 зонам.
- **P0-12 (A10):** `part_09.md` L245 — Vyshcherblenny Quick Check переименован: «Quick Check (5 items)» → «Структурная проверка Выщербленного (5 items — отлична от universal Quick Check выше)» + 1-строчное пояснение. Теперь не путается с universal Quick Check L203.
- **P0-13 (B1 GHOST):** `part_10.md` L238 — Омнис GHOST: «Страх устаревания» (вывод-ярлык) → конкретное событие «Первая аугментация заменила левый глаз на линзу переменного фокуса. В тот день перестал различать оттенки боли — чужой и собственной.» + cross-ref к Tier 1/2 GHOST Layers.
- **P0-14 (B1 FLAW):** `part_10.md` L236 — Омнис FLAW: «Утрата человечности» (прилагательное) → конкретное поведение «Анализирует эмоции органиков как «сбои химической регуляции», предлагает «калибровку» вместо утешения».
- **P0-15 (NEW-1):** `part_04.md` L366 — удалён китайский символ «待» из заголовка Cross-refs; секция заполнена реальными cross-refs (12 пунктов: Part 1/2/3/5/6/7A/7B/8/9/10_vysherblenny/10_elena/10_omnis → Part 4 §4.X).
- **P0-16 (NEW-3):** `part_05.md` L23 — §5.1 RULE обновлено: «Только 1–2 экстремальных полюса» → «1–2 (recommended), 8K+ — до 3, 16K+ — до 4 (см. §5.3 контекстные лимиты)». Снимает противоречие §5.1 vs §5.3 vs context-table.

**Validation (iter 35):**
- `validate:master` — ✅ PASSED (12 checks, no regressions)
- `build` — ✅ hash `69d9b813` unchanged (canon-файлы не входят в hash computation)
- `validate` — ✅ 8 gates PASS, index.html 7.5KB
- `test:unit` — ✅ 43/43
- `test:integration` — ✅ 21/21
- `lint` — ✅ 0 errors, 12 warnings (same as baseline)
- `qa:csp` — ✅ PASS (0 inline scripts)
- `qa:bundle` — ✅ 7.5KB (max 500KB)
- `qa:doc-versions` — ✅ PASS
- `audit_vs_embeds.py` — ✅ 0 regressions (28 animation classes, 11 observed)

**Modified files (iter 35):** `docs/canon/appendix_glossary.md`, `docs/canon/part_04.md`, `docs/canon/part_05.md`, `docs/canon/part_07a.md`, `docs/canon/part_08.md`, `docs/canon/part_09.md`, `docs/canon/part_10.md`. (7 canon files, no src/ changes, no master HTML changes, no widget changes.)

**Что осталось (iter 36-38):**

- **iter 36 (P1):** 11 правок — пример vs правило + dead code. B1 (LIE Омнис), B2 (Уолтер GHOST ярлык), B5 (3 Anchor definitions), B6 (Tier 0 «12B» → «12B+»), D1 (dual-Elena secondary GHOST в part_04 L67/L91), D2 (variant Выщербленный LIE L93), D4+NEW-2 (Lorebook walkthrough Елены L667), A5 (AP-9 ❌ пример), A7 (Счётчик вырезаний секция AN в таблице), A8 (§8.1 AP-15 orphan row).
- **iter 37 (P2):** 18 правок — терминология + структурный cleanup ~1500 строк удалений (Migration Notes / Validation gates / Cross-refs ending / resume).
- **iter 38 (P3):** 12 правок + 3 новые секции — локальные правки + «Как читать», TL;DR, Character map, Pre-build checklist.

**Invariants (iter 35+):**
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Build hash `69d9b813` expected unchanged для iter 36-38 (только canon-контент правки).
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
| **Canon audit P0 (iter 35)** | 16/57 правок закрыты. Осталось 41 (P1 11 + P2 18 + P3 12) на iter 36-38. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
