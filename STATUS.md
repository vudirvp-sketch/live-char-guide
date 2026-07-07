# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED + KI#13/#18/#20 ✅ CLOSED + **iter 33 — Content Audit Verified (KI#21 documented, fix plan ready)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 33 — CONTENT AUDIT VERIFICATION ✅ COMPLETE (без правок кода).** Перепроверен весь аудит канона из предыдущего чата. Найдено ~50 пунктов (A1-G5), из них 1 INVALID (B3 — Examples Омнис в пределах лимита), 2 REFINED (B2, B5), 2 STRENGTHENED (B4, F1), 3 NEW (NEW-1: китайский «待» в `part_04.md` L366; NEW-2: Lorebook walkthrough Елены в `part_07a.md` L667 даёт secondary GHOST; NEW-3: §5.1 vs §5.3 vs §5.3 context-table — три формулировки правила OCEAN). Финальный план работ зафиксирован в `docs/AUDIT_VERIFICATION.md`: 16 P0 + 11 P1 + 18 P2 + 12 P3 = 57 правок, распределены на iter 34-37.

**iter 32 — KI#20 ✅ CLOSED.** Visual System Scroll-Animation Bug: 5 VS-EMBED (E06/E07/E08/E09/E15) имели invisible animation elements. Single-file fix в `src/shell/widgets/vs-scroll-observer.js` — selector extended для 8 animation classes (43 элемента теперь наблюдаются). Audit script `scripts/audit_vs_embeds.py` добавлен.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#21 (Content Audit contradictions)** | MEDIUM-HIGH | 🟡 **DOCUMENTED** — fix plan ready (iter 34-37) | found iter 33 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED — 5/5 sub-items fixed | iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 | iter 26-31 |
| KI#19 (Chinese chars in part_05 L269) | LOW | ✅ CLOSED | iter 30 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#14 (content duplication VS-EMBED ↔ текст) | MEDIUM-HIGH | ✅ CLOSED | iter 16 |
| KI#16 (qa:csp — inline scripts) | MEDIUM | ✅ CLOSED | iter 19 |
| KI#17 (documentation drift E07 vs E02) | LOW | ✅ CLOSED | iter 20 |
| KI#1..KI#12, KI#15 | various | ✅ CLOSED | iter 1-7 |

### KI#21 — Content Audit contradictions 🟡 DOCUMENTED (iter 33, fix plan iter 34-37)

**Symptom:** Полный аудит канона `docs/canon/` (14 файлов, 5 008 строк) выявил ~50 противоречий/проблем: 10 критических (A1-A10), 6 «пример vs правило» (B1-B6), 8 категорий терминологии (C1-C8), 7 проблем примеров (D1-D7), 7 структурных (E1-E7), 10 локальных (F1-F10), 5 концептуальных упущений (G1-G5). Plus 3 NEW-пункта найдены при верификации.

**Categories:**
- **A (Critical contradictions):** A1 (T→A→P «Price» vs «Pattern» в Glossary), A2 (Елена OCEAN 3 vs 1+2 в §7A.13), A3 (Счётчик вырезаний 2 vs 3 уровня в 4 местах), A4 (NEED Выщербленного 3 разные формулировки), A5 (AP-9 ❌ conflates absent GHOST/LIE с WANT/NEED conflict), A6 (AP-15 ❌ «замолкает на час» = deferred Price), A7 («Счётчик вырезаний» секция AN не описана), A8 (§8.1 15 APs + 1 без номера), A9 (§9.11 resume 3-level vs 4-zones), A10 (§9.11 два разных Quick Check набора).
- **B (Example vs rule):** B1 (Омнис GHOST=страх, FLAW=абстракция), B2 (Уолтер GHOST «Унижение»=ярлык), B3 ❌ **INVALID** (Examples в пределах 120 токенов), B4 (Tier 1/2/3 overloaded — 3 значения в Part 3/6/10), B5 (3 из 5 типов Anchors без определений), B6 (Tier 0 «12B» vs viz «12B+»).
- **C (Terminology):** C1-C8 — англицизмы, метки callouts, кавычки, тире. Субъективные — P2-2 решает через explicit policy.
- **D (Examples):** D1 (dual-Elena GHOST), D2 (variant'ы Выщербленного — мёртвый код), D3 (Greeting Елены 2 сцены), D4 (Lorebook Елены = secondary GHOST), D5 (English `<!-- Demonstrates: -->` в русском), D6 (Йоуёма без контекста), D7 (Уолтер изолирован).
- **E (Structural):** E1 (front-matter 5-line block во всех файлах), E2 (Migration Notes/Validation gates ~1500 строк), E3 (Cross-refs ending = duplicate reverse-index), E4 (resume пересказывает TOC), E5 (§1.3 orphan), E6 (Pattern Matcher 3 формулировки), E7 («Применяется «очень деликатно»» копипаста).
- **F (Local):** F1 (30+ «Canon planned iter 13/14/16» заглушек — Parts уже MIGRATED), F2-F10 (типы Price без примеров, % без источника, cautious zone без определения, `<br/>` в markdown, Keirsey vs MBTI, и т.д.).
- **G (Conceptual omissions):** G1 (нет «Как читать»), G2 (нет TL;DR), G3 (нет glossary-on-first-use), G4 (нет карты персонажей), G5 (нет pre-build checklist).
- **NEW (found in iter 33 verification):** NEW-1 (китайский «待» в `part_04.md` L366), NEW-2 (Lorebook walkthrough Елены в `part_07a.md` L667 = secondary GHOST, усиливает D4), NEW-3 (§5.1 vs §5.3 vs §5.3 context-table — 3 формулировки правила OCEAN).

**Fix plan** (`docs/AUDIT_VERIFICATION.md` §4):

| Iter | Priority | Правок | Описание |
|------|----------|--------|----------|
| **iter 34** | P0 | 16 | Критические противоречия (A1-A10, NEW-1, NEW-3). Точечные правки 1-10 строк каждая. |
| **iter 35** | P1 | 11 | Пример vs правило + dead code (B1, B2, B5, B6, D1, D2, D4, A5, A7, A8). |
| **iter 36** | P2 | 18 | Терминология + структурный cleanup (C1-C2, C5, E1-E7, F1, F4-F10, B4). ~1500 строк удалений. |
| **iter 37** | P3 | 12 | Локальные правки (D3, D5-D7, F2-F3, F8, F10) + 3 новые секции (G1, G2, G4, G5). |

**После каждой итерации:** validation gates + `audit_vs_embeds.py` + git commit/push. Build hash `fd3d96d3` expected unchanged (только canon-контент правки).

**Правило (iter 33+):** при обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + присваивать sub-ID (A11, B7, и т.д.) с пометкой P0-P3.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated. Не редактировать напрямую. Все правки — в `src/`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18)** | Все 10 Parts + 3 Appendix ✅ MIGRATED. См. `docs/canon/_README.md` §5. |
| **CSP compliance (iter 19, KI#16 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. |
| **Inline styles forbidden (iter 24, KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (iter 32, KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **DGA COMPLETE (iter 26-31, KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
