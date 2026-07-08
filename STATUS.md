# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + KI#22/#23 ✅ CLOSED + iter 34 (CSS/CSP) + iter 35 (KI#21 P0) + iter 36 (KI#21 P1) + iter 37 (KI#21 P2) + iter 38 (KI#21 P3 ✅ CLOSED) + iter 39 (KI#25/#26/#27 ✅ CLOSED) + iter 40 (KI#28/#29 ✅ CLOSED) + **iter 41 — KI#30/#31 ✅ CLOSED (OCEAN labeling leftover + Part 10/7A ↔ bible cross-ref, build hash 69d9b813 unchanged)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 41 — OCEAN LABELING LEFTOVER + BIBLE CROSS-REF ✅ COMPLETE.** 2 KI закрыты: KI#30 (OCEAN labeling leftover — iter 40 KI#29 fix был неполным, остались 2 locations: `part_07a.md` L415 N=70 + `part_10.md` L51 Елена A=38/N=68 помечены как extreme, но per Part 5 §5.1 RULE = cautious zone; label-only fix, values unchanged), KI#31 (roadmap item #3 — Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to `docs/vyshcherblenny_character_bible.md`; added Note в обе canon locations, bible Note уже был iter 39). Оба — doc/canon-only, build hash `69d9b813` unchanged. Validation gates ALL PASS.

**iter 40 — README + OCEAN LABELING FIX ✅ COMPLETE.** KI#28 (README section counts) + KI#29 (OCEAN labeling в part_10.md §10.4 + appendix_character_map.md). Build hash unchanged.

**iter 38 — CANON AUDIT P3 ✅ COMPLETE.** 10 правок P3 из `docs/AUDIT_VERIFICATION.md` §4.4. Создано 2 новых canon-файла: `part_00.md` (Как читать + TL;DR), `appendix_character_map.md` (карта 5 персонажей). Canon total: 3 905 → 4 070 строк (+165 net). **KI#21 ✅ CLOSED полностью (57/57 правок).**

**iter 34-37 — CSS/CSP + CANON AUDIT P0/P1/P2 ✅ COMPLETE.** KI#22/#23/#24 + 45/57 KI#21 правок.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#30 (OCEAN labeling leftover: part_07a L415 N=70 + part_10 L51 Елена A=38/N=68 marked as extreme) | LOW-MEDIUM | ✅ CLOSED | iter 41 |
| KI#31 (Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to bible) | LOW — cosmetic | ✅ CLOSED | iter 41 |
| KI#28 (README.md section counts stale — Parts 1/5/7/8) | LOW | ✅ CLOSED | iter 40 |
| KI#29 (OCEAN labeling: N=70 marked as «extreme» vs Part 5 §5.1 RULE) | LOW-MEDIUM | ✅ CLOSED | iter 40 |
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

### KI#30 — OCEAN labeling leftover (part_07a L415 + part_10 L51) ✅ CLOSED (iter 41)

**Симптом:** iter 40 KI#29 fix был неполным — закрыты только `part_10.md` L408 (Выщербленный N=70) и `appendix_character_map.md`, но остались 2 locations с той же противоречивостью (cautions zone values помечены как extreme):
- `docs/canon/part_07a.md` L415 (Выщербленный XML template example, §7A.9): `Экстремумы: Низкая E (интроверт), Высокая N (невротизм)` — N=70 labeled as extreme, но per Part 5 §5.1 RULE = cautious zone boundary (60–70), НЕ экстремум (>70).
- `docs/canon/part_10.md` L51 (Елена OCEAN, §10.1): `Экстремумы: Высокая O (любопытство), Низкая A (конфликтность), Высокая N (тревожность)` — A=38 (cautious zone 30–40) и N=68 (cautious zone 60–70) labeled as extreme, но Part 5 §5.1 L59 явно говорит: «У Елены 1 экстремальный полюс (O=72 > 70) + 2 значения в cautious zone (A=38, N=68)».

**Fix (iter 41):** label-only fix, значения OCEAN НЕ менялись.
- `part_07a.md` L415: `Экстремумы: Низкая E (интроверт), Высокая N (невротизм)` → `Экстремумы: Низкая E (<30, интроверт). Cautious zone: N=70 (граница 60–70, см. Part 5 §5.1 RULE: extreme = строго <30 или >70).` (mirror iter 40 KI#29 fix в part_10.md L408). Значения `O: 60 | C: 55 | E: 25 | A: 30 | N: 70` unchanged.
- `part_10.md` L51: `Экстремумы: Высокая O (любопытство), Низкая A (конфликтность), Высокая N (тревожность)` → `Экстремумы: Высокая O (>70, любопытство). Cautious zone: A=38 (граница 30–40, конфликтность), N=68 (граница 60–70, тревожность) — см. Part 5 §5.1 RULE: extreme = строго <30 или >70.` Значения `O: 72 | C: 65 | E: 41 | A: 38 | N: 68` unchanged.

**НЕ в scope:** values OCEAN в обоих locations — unchanged. Это internal canon consistency fix (Part 5 RULE vs Part 7A/Part 10 labels), НЕ bible-vs-canon sync — iter 39 invariant не применяется. iter 40+ invariant (OCEAN labeling consistency) расширен на все canon locations.

### KI#31 — Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to bible ✅ CLOSED (iter 41)

**Симптом:** Roadmap item #3 (iter 40 leftover). Bible (`docs/vyshcherblenny_character_bible.md` L95-99, iter 39 KI#26 fix) уже имеет Note, объясняющую различие moderate (Part 10 §10.4 + Part 7A §7A.9: O:60 C:55 E:25 A:30 N:70) vs extreme (bible: O=85 C=25 A=15 N=92 E=60) values, и явно cross-references Part 10 §10.4 и Part 7A §7A.9. Однако **reverse cross-ref отсутствует**: ни `part_10.md` §10.4, ни `part_07a.md` §7A.9 не ссылаются обратно на bible для extreme 16K+ values. Cosmetic — формальной противоречивости нет (Note в bible достаточна для понимания), но для навигационной полноты reverse cross-ref нужна.

**Fix (iter 41):** добавлен Note в OCEAN section обеих canon locations:
- `docs/canon/part_10.md` §10.4 OCEAN (после L408): `**Cross-ref:** Moderate values (4K-fallback / pedagogical). For 16K+ canonical extreme values (O=85, C=25, A=15, N=92, E=60) — see `docs/vyshcherblenny_character_bible.md` §OCEAN.`
- `docs/canon/part_07a.md` §7A.9 OCEAN (после L415): `**Cross-ref:** Moderate values (4K-fallback / pedagogical). For 16K+ canonical extreme values (O=85, C=25, A=15, N=92, E=60) — see `docs/vyshcherblenny_character_bible.md` §OCEAN.`

**НЕ в scope:** values OCEAN в обеих canon locations — unchanged (moderate 4K-fallback). Cross-ref — навигационная правка, не content sync. iter 39 invariant («guide's role as example takes priority») не применяется — values не трогаются.

### KI#28 — README.md section counts stale (Parts 1/5/7/8) ✅ CLOSED (iter 40)

**Симптом:** `README.md` L31-40 (таблица «Структура гайда») содержал устаревшие counts секций для 4 Parts (Part 1: 5 вместо 7, Part 5: 6 вместо 8, Part 7: 16 вместо 18, Part 8: 17 вместо 16). Part 8 описание «16 анти-паттернов (AP-1–AP-16)» также устарело — AP-16 не существует (OCEAN Overload перенесён в Part 5 §5.3 в v9 restructure).

**Fix (iter 40):** README L31 (Part 1: 5 → 7, описание расширено), L35 (Part 5: 6 → 8, описание расширено), L37 (Part 7: 16 → 18, описание расширено с 7A/7B breakdown), L38 (Part 8: 17 → 16, описание «16 анти-паттернов (AP-1–AP-16)» → «15 анти-паттернов (AP-1–AP-15) + overview» с пояснением про AP-16). Сумма: 7+6+8+11+8+6+18+16+11+4 = 95 Part секций + 3 appendix = 98 ✓ (matches AGENT_NAVIGATION.md). Pure docs, build hash unaffected.

### KI#29 — OCEAN labeling: N=70 marked as «extreme» vs Part 5 §5.1 RULE ✅ CLOSED (iter 40)

**Симптом:** Внутренняя противоречивость канона — Part 10 §10.4 L408 и `appendix_character_map.md` L16 помечали N=70 как «экстремум»/«Высокая N», но Part 5 §5.1 RULE определяет экстремум как строго `<30` или `>70`. N=70 = upper boundary cautious zone (60–70), НЕ экстремум.

**Fix (iter 40):** label-only fix, значения OCEAN НЕ менялись.
- `docs/canon/part_10.md` L408: «Экстремумы: Низкая E (интроверт), Высокая N (невротизм)» → «Экстремумы: Низкая E (<30, интроверт). Cautious zone: N=70 (граница 60–70, невротизм — на границе с экстремальной зоной, см. Part 5 §5.1 RULE: extreme = строго <30 или >70).» Значения (O:60, C:55, E:25, A:30, N:70) unchanged — moderate 4K-fallback example.
- `docs/canon/appendix_character_map.md`: колонка «OCEAN экстремумы» → «OCEAN (extreme + cautious)» + footnote с per-character breakdown (Елена: 1 extreme + 2 cautious; Уолтер: 2 extreme + 1 cautious boundary; Омнис: 3 extreme; Выщербленный: 1 extreme + 1 cautious boundary, bible = 16K+ extreme values). YAML `last_synced` updated to iter 40.

**НЕ в scope (principle preserved):** values O:60/C:55/E:25/A:30/N:70 в Part 10 §10.4 — unchanged. Это internal canon consistency fix (Part 5 RULE vs Part 10/appendix label), НЕ bible-vs-canon sync — iter 39 invariant не применяется.

### KI#25 — elena_character_bible.md OCEAN labels stale ✅ CLOSED (iter 39)

`docs/elena_character_bible.md` L78-80: A=38 и N=68 помечены `⚠️ EXTREME`, «Extreme poles: 3». Fix: relabel как `⚠️ CAUTIOUS ZONE`, «Extreme poles: 1 (O=72) + 2 cautious zone (A=38, N=68)». Version bumped to 9.2.1.

### KI#26 — vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift ✅ CLOSED (iter 39)

`docs/vyshcherblenny_character_bible.md` выровнен с canon Part 10 §10.4: Setting → ТЕНЕБРИС (Вель/Ошметок/Сангвис/Вентора/Архив), GHOST Layers G1/G2/G3 → Tier 1/2/3, OCEAN count «три экстремума» → «4 экстремума (O=85, C=25, A=15, N=92)», Note расширена (Part 7A §7A.9 + Part 10 §10.4 moderate values), Lorebook keys → ТЕНЕБРИС. Version bumped to 9.2.1.

### KI#27 — README.md stale Part 10 structure entry ✅ CLOSED (iter 39)

`README.md` L40: «10 | 6 | Elena, Geralt, Edward, Walter, Omnis-Zeta, Vysherblenny» → «4 | Elena, Walter, Omnis-Zeta, Vysherblenny (Geralt + Edward DELETED в v9.1 — FIX-07)».

### KI#21 — Content Audit contradictions ✅ CLOSED полностью (iter 35-38)

57/57 правок в 14 canon-файлах. Детали — в `docs/AUDIT_VERIFICATION.md` §4.1–§4.4. iter 38 P3 создал 2 новых canon-файла: `part_00.md`, `appendix_character_map.md`. Canon total: 4 070 строк. Build hash `69d9b813` unchanged.

---

## Invariants (iter 41+)

- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Build hash `69d9b813` — unchanged после iter 34 (KI#23 fix). Canon-файлы + doc-файлы (`docs/*.md`, `*.md` в root) НЕ входят в hash computation — только `src/master/`, `src/shell/`, `src/assets/`, `data/`, `parts/` root fallbacks.
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible, не Part 10.
- **OCEAN labeling consistency (iter 40+, расширен iter 41):** extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`. Label-only fixes допустимы для internal canon consistency (Part 5 RULE vs Part 7A/Part 10/appendix labels) — values примера не трогаются. **Все canon locations с OCEAN labels проверены (iter 41):** `part_07a.md` L415, `part_10.md` L51/L148/L254/L408, `appendix_character_map.md` — все consistent с Part 5 §5.1 RULE.
- **Bible ↔ canon cross-ref symmetry (iter 41+):** bible (`vyshcherblenny_character_bible.md`) имеет Note → Part 10 §10.4 + Part 7A §7A.9 (iter 39 KI#26). Reverse: Part 10 §10.4 + Part 7A §7A.9 имеют Cross-ref Note → bible (iter 41 KI#31). Навигационная полнота.
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 42+ Roadmap (deferred from iter 41)

Не критично, не запланировано строго:

- **Glossary double-render inefficiency** (`data/glossary.json` 53 terms + `docs/canon/appendix_glossary.md` 30 entries + `parts/appendix_glossary.html` 30 entries — лёгкое дублирование между markdown canon и HTML rendering). LOW — structural, by design (canon = source of truth, HTML = render).
- **Component extracts sync** (`visual-system/integration/component-extracts/` — 54 файла: 18 elements × 3 files: visual.html + styles.css + script.js) — documentation drift vs actual `src/shell/widgets/`. MEDIUM — много файлов, требует pairwise diff audit.

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
| **Doc drift fix ✅ CLOSED (iter 39)** | KI#25/#26/#27 ✅ CLOSED. Bible + README выровнены с canon Part 10 §10.4 (ТЕНЕБРИС) + Part 5 §5.1 (OCEAN). Принцип: при рассинхроне bible vs canon — правится bible, не canon. |
| **README + OCEAN labeling fix ✅ CLOSED (iter 40)** | KI#28/#29 ✅ CLOSED. README section counts обновлены (Parts 1/5/7/8: 7/8/18/16, сумма 98 ✓). OCEAN labeling в part_10.md §10.4 + appendix_character_map.md — N=70 relabeled как cautious zone boundary. Values unchanged. |
| **OCEAN labeling leftover + bible cross-ref ✅ CLOSED (iter 41)** | KI#30/#31 ✅ CLOSED. KI#30: OCEAN labels в part_07a.md L415 + part_10.md L51 (Елена) — A=38/N=68/N=70 relabeled как cautious zone (iter 40 KI#29 fix был неполным). KI#31: reverse cross-ref Note добавлена в part_10.md §10.4 + part_07a.md §7A.9 → bible. Build hash `69d9b813` unchanged. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`). |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
