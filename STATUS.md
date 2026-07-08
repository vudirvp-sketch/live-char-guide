# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED + KI#22/#23 ✅ CLOSED + iter 34 (CSS/CSP) + iter 35 (KI#21 P0) + iter 36 (KI#21 P1) + **iter 37 — KI#21 P2 ✅ CLOSED (45/57 canon правок, ~1130 строк удалено, build hash 69d9b813 unchanged)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 37 — CANON AUDIT P2 ✅ COMPLETE.** Применены 18 правок P2 из `docs/AUDIT_VERIFICATION.md` §4.3 (KI#21 Terminology + structural cleanup). Canon-файлы: 5 035 → 3 905 строк (−1 130). Build hash остался `69d9b813` (canon-файлы не входят в hash computation). Осталось 12 правок (P3) на iter 38.

**iter 36 — CANON AUDIT P1 ✅ COMPLETE.** 11 правок P1 (KI#21 Example vs rule + dead code) применены.

**iter 35 — CANON AUDIT P0 ✅ COMPLETE.** 16 критических правок P0 (KI#21 Critical contradictions) применены.

**iter 34 — CSS CALLOUT SCOPING + CSP WORKER-SRC FIX ✅ COMPLETE.** KI#22 ✅ CLOSED, KI#23 ✅ CLOSED, KI#24 ✅ VERIFIED.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | 🟡 **P0+P1+P2 ✅ CLOSED** (45/57), P3 pending iter 38 | iter 33-38 |
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

### KI#21 — Content Audit contradictions 🟡 P0+P1+P2 ✅ CLOSED (iter 35-37), P3 pending iter 38

**Симптом:** Полный аудит канона `docs/canon/` (14 файлов, ~5 000 строк) выявил ~50 противоречий/проблем (A1-A10, B1-B6, C1-C8, D1-D7, E1-E7, F1-F10, G1-G5). Plus 3 NEW-пункта.

**Fix plan** (`docs/AUDIT_VERIFICATION.md` §4) — 57 правок в 14 canon-файлах + 3 новые секции:

| Iter | Priority | Правок | Описание | Status |
|------|----------|--------|----------|--------|
| **iter 35** | P0 | 16 | Критические противоречия (A1-A10, NEW-1, NEW-3). | ✅ CLOSED |
| **iter 36** | P1 | 11 | Пример vs правило + dead code (B5, B6, B2, D1, D2, D4, A5, A7, A8). | ✅ CLOSED |
| **iter 37** | P2 | 18 | Терминология + структурный cleanup (C1/C2/C5, E1-E7, F1, F4-F10, B4). ~1130 строк удалений. | ✅ CLOSED |
| **iter 38** | P3 | 12 | Локальные правки (D3, D5-D7, F2, F3, F8, F10) + 3 новые секции (G1, G2, G4, G5). | 🟡 pending |

**iter 37 — P2 fix details (18 правок):**

- **P2-1 (C1):** `part_01.md` §1.4 — добавлены 1-предложные определения Anchor/Voice/SPINE/OCEAN inline.
- **P2-2 (C2):** `docs/canon/_README.md` §3.9 — добавлена explicit policy: метки callouts (`RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`) остаются на английском как semantic anchors.
- **P2-3 (C5):** Все canon-файлы — оставлены 2 Bridge (Part 6→7A, Part 9→10), удалены 8 остальных.
- **P2-4 (E1):** Все canon-файлы — front-matter конвертирован из markdown quote-block в YAML.
- **P2-5 (E2):** Все canon-файлы — удалены секции Migration Notes / Compression results / Validation gates / DGA Phase 2 fix.
- **P2-6 (E3):** Все canon-файлы — удалены секции «Cross-references из других Parts» (reverse-index, дублирует inline refs).
- **P2-7 (E4):** Все canon-файлы — «Что вы теперь умеете» resume удалены; в 4 Parts (01, 04, 07A, 08) добавлены 1-2-предложные **Synthesis:** вместо них.
- **P2-8 (E5):** `part_01.md` §1.3 orphan секция слита с §1.4.
- **P2-9 (E6):** `part_07a.md` — Pattern Matcher ссылки обновлены: «Pattern Matcher (см. Part 1 §1.4)».
- **P2-10 (E7):** Все canon-файлы — клише «Применяется «очень деликатно»» удалено (вместе с Migration Notes).
- **P2-11 (F1):** Все canon-файлы — 22 stub «Canon planned iter 13/14/16» удалены (Parts уже MIGRATED).
- **P2-12 (B4 partial):** `part_03.md` §3.4 — Tier 1/2/3 переименованы в Quality Grade A/B/C (устранена коллизия с CoT Tier 0-3 из Part 6 и GHOST Layers Tier 1-3 из Part 10).
- **P2-13 (F4):** `part_04.md` §4.2 — «Запрещённые слова» → «Запрещённые формулировки» (выводы-ярлыки, не события) + 2 новых примера запрещённых.
- **P2-14 (F5):** `part_05.md` §5.1 — добавлено определение **Cautious zone (30–40 / 60–70)** с примером Елены.
- **P2-15 (F6):** `part_07a.md` L305 — `<br/>` заменён на em-dash в markdown table cell (HTML-теги запрещены в Canon per `_README.md` §3.7).
- **P2-16 (F7):** `part_07a.md` §7A.1 — Keirsey SP уточнено: «Sensing-Perceiving (см. Appendix A — MBTI)» (Keirsey ≠ MBTI).
- **P2-17 (F9):** `part_09.md` §9.6 Decision Tree — добавлены 1-словные симптомы для каждой AP-ссылки (AP-3 Voice-in-Desc, AP-6 No-Anti-Godmoding, AP-15 OCEAN-Overload, AP-5 RepPen-High, AP-7 PP-Leak, AP-10 CoT-Overload, AP-9 SPINE-Broken).
- **P2-18 (F10):** `part_10.md` §10.1 — inline-комментарии `<!-- ↑ ... -->` вынесены в отдельный **Annotation:** callout после карточки Елены.

**Validation (iter 37):**
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
- `check_english.py` — ✅ 0 leaks in `docs/canon/` (29 baseline leaks in `src/master/` HTML — unchanged)

**Modified files (iter 37):** Все 14 canon-файлов изменены (`docs/canon/*.md`) + `index.html` (root fallback regenerated, только timestamp). ~1130 строк удалено, ~50 строк добавлено (определения, Synthesis, Annotation, Quality Grade rename).

**Что осталось (iter 38):**

- **iter 38 (P3):** 12 правок + 3 новые секции — локальные правки (D3, D5-D7, F2, F3, F8, F10) + новые секции G1 «Как читать», G2 TL;DR, G4 Character map, G5 Pre-build checklist. Fix plan ready в `docs/AUDIT_VERIFICATION.md` §4.4.

**Invariants (iter 37+):**
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Build hash `69d9b813` expected unchanged для iter 38 (только canon-контент правки + новые файлы).
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
| **Canon audit P0+P1+P2 (iter 35-37)** | 45/57 правок закрыты. Осталось 12 (P3) на iter 38. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`). |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
