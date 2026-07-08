# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + KI#22/#23 ✅ CLOSED + iter 34 (CSS/CSP) + iter 35 (KI#21 P0) + iter 36 (KI#21 P1) + iter 37 (KI#21 P2) + iter 38 (KI#21 P3 ✅ CLOSED) + **iter 39 — KI#25/#26/#27 ✅ CLOSED (doc drift fix, build hash 69d9b813 unchanged)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 39 — DOC DRIFT FIX ✅ COMPLETE.** 3 новых KI обнаружены при анализе исходников Йоуёмы/Выщербленного и сверки с каноном `docs/canon/`. Все 3 KI — doc-only (canon не тронут, build hash unchanged): KI#25 (`elena_character_bible.md` OCEAN labels stale), KI#26 (`vyshcherblenny_character_bible.md` stale world setting + GHOST Layers drift + OCEAN count + Lorebook), KI#27 (`README.md` stale Part 10 structure entry). Принцип: guide's role as example takes priority — canon Part 10 §10.4 не правится, bible/README подтягиваются к канону. Validation gates ALL PASS.

**iter 38 — CANON AUDIT P3 ✅ COMPLETE.** 10 правок P3 из `docs/AUDIT_VERIFICATION.md` §4.4. Создано 2 новых canon-файла: `part_00.md` (Как читать + TL;DR), `appendix_character_map.md` (карта 5 персонажей). Canon total: 3 905 → 4 070 строк (+165 net). **KI#21 ✅ CLOSED полностью (57/57 правок).**

**iter 34-37 — CSS/CSP + CANON AUDIT P0/P1/P2 ✅ COMPLETE.** KI#22/#23/#24 + 45/57 KI#21 правок.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#25 (elena_character_bible.md OCEAN labels stale) | LOW | ✅ CLOSED | iter 39 |
| KI#26 (vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift) | MEDIUM | ✅ CLOSED | iter 39 |
| KI#27 (README.md stale Part 10 structure entry) | LOW | ✅ CLOSED | iter 39 |
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

### KI#25 — elena_character_bible.md OCEAN labels stale ✅ CLOSED (iter 39)

**Симптом:** `docs/elena_character_bible.md` L78-80: A=38 и N=68 помечены `⚠️ EXTREME`, «Extreme poles: 3 (O=72, A=38, N=68)». Противоречит канону: `part_05.md` §5.1 RULE (extreme = `<30` или `>70`; cautious zone = `30–40` / `60–70`), `part_07a.md` §7A.13 (iter 35 fix): «1 экстремальный полюс (O=72 > 70). A=38 и N=68 — cautious zone».

**Fix (iter 39):** L78-80 обновлены — A=38 и N=68 помечены `⚠️ CAUTIOUS ZONE`, «Extreme poles: 3» → «Extreme poles: 1 (O=72 > 70) + 2 cautious zone (A=38, N=68)». L80 «For 4K context, keep only 2» убрано (профиль допустим для 4K+ целиком per Part 5 §5.1 L59). Version bumped to 9.2.1.

### KI#26 — vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift ✅ CLOSED (iter 39)

**Симптом:** `docs/vyshcherblenny_character_bible.md` содержал несколько устаревших ссылок, противоречащих канону `part_10.md` §10.4 (мир ТЕНЕБРИС):

- **L14 Setting:** «Ministry of Closed Communications» — старый сеттинг (МЗК), противоречит Part 10 §10.4 («Oshmetok of Vel»).
- **L26-28 GHOST Layers G1:** «Abandoned at archive, raised by documents not people» (childhood) — не совпадает с Tier 1 «Был архивариусом — впрыснул себе документ» (adult self-injection).
- **L86 OCEAN count:** «три экстремума» — фактических 4 (O=85, C=25, A=15, N=92).
- **L95 Note:** авторизует только Part 7A moderate values, но Part 10 §10.4 тоже использует moderate — note нужно расширить.
- **L115 Lorebook `vysh_world_rules`:** keys «МЗК, Министерство, Закон» — старый сеттинг.

**Fix (iter 39):**
- L14: Setting → «ТЕНЕБРИС — Вель, Ошметок, Сангвис, Вентора, Архив» (matches Part 10 §10.4).
- L26-28: GHOST Layers G1/G2/G3 → Tier 1/2/3 (matches Part 10 §10.4).
- L80-86: OCEAN — добавлены `⚠️ EXTREME`/`⚠️ CAUTIOUS ZONE` маркеры; «три экстремума» → «4 экстремума (O=85, C=25, A=15, N=92) — допустимо для 16K+».
- L95: Note расширена — покрывает и Part 7A §7A.9, и Part 10 §10.4 (both use moderate values for pedagogical simplification; bible's extreme = canonical 16K+ values).
- L115: Lorebook `vysh_world_rules` → keys «Вентора, Архив, Ошметок, Сангвис, Вель», content описывает мир ТЕНЕБРИС (см. Part 10 §10.4 Lorebook entries).
- L173-180: Consistency Checklist — все пункты [x], добавлена строка «Setting aligned с part_10.md §10.4».
- Version bumped to 9.2.1.

**НЕ в scope iter 39 (deferred to iter 40+):** OCEAN moderate values в `part_10.md` §10.4 + `appendix_character_map.md` (N=70 помечен как «экстремум», но N=70 = cautious zone boundary per Part 5 §5.1 RULE «<30 или >70»). Это потенциальная регрессия примера, требует отдельного аудита.

### KI#27 — README.md stale Part 10 structure entry ✅ CLOSED (iter 39)

**Симптом:** `README.md` L40: «10 | Полные примеры карточек | 6 | Elena, Geralt, Edward, Walter, Omnis-Zeta, Vysherblenny». Фактически в `part_10.md` 4 карточки. `p10_geralt` и `p10_edward` DELETED в v9.1 (FIX-07).

**Fix (iter 39):** L40 обновлён — «6 | Elena, Geralt, Edward, Walter, Omnis-Zeta, Vysherblenny» → «4 | Elena, Walter, Omnis-Zeta, Vysherblenny (Geralt + Edward DELETED в v9.1 — FIX-07)». L42 «Итого: 92 секций» → «Итого: 10 Parts. Актуальный count секций — в `AGENT_NAVIGATION.md` (98 секций)».

**НЕ в scope iter 39 (deferred to iter 40+):** counts секций в README L31-40 (Parts 1/5/7/8 также устарели). Cosmetic.

### KI#21 — Content Audit contradictions ✅ CLOSED полностью (iter 35-38)

**Симптом:** Полный аудит канона `docs/canon/` (14 файлов, ~5 000 строк) выявил ~50 противоречий/проблем (A1-A10, B1-B6, C1-C8, D1-D7, E1-E7, F1-F10, G1-G5). Plus 3 NEW-пункта.

**Fix plan** (`docs/AUDIT_VERIFICATION.md` §4) — 57 правок в 14 canon-файлах + 3 новые секции. Все 57/57 ✅ CLOSED (16 P0 в iter 35 + 11 P1 в iter 36 + 18 P2 в iter 37 + 10 P3 + 2 SKIP в iter 38). Детали каждой правки — в `docs/AUDIT_VERIFICATION.md` §4.1–§4.4.

**iter 38 P3 создал 2 новых canon-файла:** `part_00.md` (Как читать + TL;DR), `appendix_character_map.md` (карта 5 персонажей). Canon total: 3 905 → 4 070 строк (+165 net). Build hash `69d9b813` unchanged.

---

## Invariants (iter 39+)

- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Build hash `69d9b813` — unchanged после iter 34 (KI#23 fix). Canon-файлы + doc-файлы (`docs/*.md`, `*.md` в root) НЕ входят в hash computation — только `src/master/`, `src/shell/`, `src/assets/`, `data/`, `parts/` root fallbacks.
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible, не Part 10.
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 40+ Roadmap (deferred from iter 39)

Не критично, не запланировано строго:

- **README.md section counts** (KI#27 leftover) — Parts 1/5/7/8 также устарели (README говорит 92 секции, фактически 98). Cosmetic.
- **OCEAN moderate values labeling** в `part_10.md` §10.4 + `appendix_character_map.md` — N=70 помечен как «экстремум», но N=70 = cautious zone boundary per Part 5 §5.1 RULE «<30 или >70». Требует аудита: либо изменить labels (но это трогает пример), либо уточнить RULE.
- **Glossary double-render inefficiency** (glossary.json + appendix_glossary.md — лёгкое дублирование).
- **Component extracts sync** (visual-system/integration/component-extracts/) — documentation drift.

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
| **Doc drift fix ✅ CLOSED (iter 39)** | KI#25/#26/#27 ✅ CLOSED. Bible (`elena_character_bible.md`, `vyshcherblenny_character_bible.md`) + README.md выровнены с canon Part 10 §10.4 (мир ТЕНЕБРИС) и Part 5 §5.1 (OCEAN labeling). Принцип: при рассинхроне bible vs canon — правится bible, не canon. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`). |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
