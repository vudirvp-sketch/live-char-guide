# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + KI#22/#23 ✅ CLOSED + iter 34 (CSS/CSP) + iter 35-38 (KI#21 ✅ CLOSED) + iter 39 (KI#25/#26/#27 ✅ CLOSED) + iter 40 (KI#28/#29 ✅ CLOSED) + iter 41 (KI#30/#31 ✅ CLOSED) + **iter 42 — KI#32 ✅ CLOSED (component-extracts drift audit + README historical snapshot notice, build hash 69d9b813 unchanged)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 42 — COMPONENT-EXTRACTS DRIFT AUDIT ✅ COMPLETE.** Roadmap item #2 закрыт doc-only фиксой. Pairwise diff audit (`scripts/audit_component_extracts.py` + `scripts/audit_component_extracts_css.py`, оба новые) выявил: 18/18 `E##-visual.html` DRIFT vs VS-EMBED в master (KI#13 + KI#22 + structural), 16/18 `E##-styles.css` MATCH vs `vs-styles.css` SECTION 5 (только E15 + E18 с drift), 18/18 `E##-script.js` DRIFT vs `src/shell/widgets/vs-*.js` (KI#20 + KI#16). Файлы НЕ синхронизировались (54 файла, высокий риск, low value — extracts не используются в build/runtime). Вместо sync: `component-extracts/README.md` обновлён с HISTORICAL SNAPSHOT notice + canonical source pointer. Build hash `69d9b813` unchanged (component-extracts/ не в hash computation). Validation gates ALL PASS.

**iter 41 — OCEAN LABELING LEFTOVER + BIBLE CROSS-REF ✅ COMPLETE.** 2 KI закрыты: KI#30 (OCEAN labeling leftover), KI#31 (Part 10 §10.4 + Part 7A §7A.9 reverse cross-ref to bible). Build hash unchanged.

**iter 40 — README + OCEAN LABELING FIX ✅ COMPLETE.** KI#28 (README section counts) + KI#29 (OCEAN labeling). Build hash unchanged.

**iter 38 — CANON AUDIT P3 ✅ COMPLETE.** 10 правок P3 из `docs/AUDIT_VERIFICATION.md` §4.4. Создано 2 новых canon-файла: `part_00.md` (Как читать + TL;DR), `appendix_character_map.md` (карта 5 персонажей). Canon total: 3 905 → 4 070 строк (+165 net). **KI#21 ✅ CLOSED полностью (57/57 правок).**

**iter 34-37 — CSS/CSP + CANON AUDIT P0/P1/P2 ✅ COMPLETE.** KI#22/#23/#24 + 45/57 KI#21 правок.

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| KI#32 (component-extracts/ drift: 18/18 visual.html + 2/18 styles.css + all script.js stale vs src/master + src/assets/vs-styles.css) | LOW — historical reference files, NOT used in build/runtime | ✅ CLOSED (doc-only) | iter 42 |
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

Roadmap item #3. Cross-ref Note добавлена в OCEAN section обеих canon locations — указывает на `docs/vyshcherblenny_character_bible.md` §OCEAN для 16K+ extreme values. Bible Note (iter 39 KI#26) уже указывала на canon, reverse отсутствовала. Cosmetic, doc-only, build hash unchanged.

### KI#32 — component-extracts/ drift vs src/master + src/assets/vs-styles.css ✅ CLOSED (iter 42, doc-only)

**Симптом:** Roadmap item #2 (iter 41 leftover). `visual-system/integration/component-extracts/` содержит 54 файла (18 elements × 3: `E##-visual.html` + `E##-styles.css` + `E##-script.js`) + `README.md`. Pairwise diff audit (новые скрипты `scripts/audit_component_extracts.py` + `scripts/audit_component_extracts_css.py`) выявил:

- **18/18 `E##-visual.html` — DRIFT** vs VS-EMBED blocks в `src/master/*.html`. Причины: (a) KI#13 fix (iter 20-24, inline `style="..."` → `vs-ki13-*` CSS classes в master, extracts не обновлены); (b) KI#22 fix (iter 34, callout CSS scoping для E15); (c) структурные правки (annotation-layer `data-layer` attribute removed; wrapper `<div class="vs-embed">` closing + `<!-- REPLACED BY VISUAL SYSTEM: E## -->` marker в master).
- **16/18 `E##-styles.css` — MATCH** vs `src/assets/vs-styles.css` SECTION 5 (extracts ARE the source для SECTION 5). Только E15 (+13/-8, KI#22 callout scoping) и E18 (+16/-8, iter 25 post-creation changes) с drift.
- **18/18 `E##-script.js` — DRIFT** vs `src/shell/widgets/vs-*.js`. Причины: (a) KI#20 fix (iter 32, per-element IntersectionObserver → shared `vs-scroll-observer.js`); (b) iter 19 KI#16 fix (inline `<script>` → external ES module widgets); (c) `document.querySelectorAll` → scoped search внутри контейнера.

**Fix (iter 42):** doc-only — файлы НЕ синхронизировались (54 файла, высокий риск, low value). Вместо этого:
- `visual-system/integration/component-extracts/README.md` обновлён: добавлен HISTORICAL SNAPSHOT notice — файлы являются снимками Phase 4 integration (iter 7-25), НЕ используются в build pipeline (`scripts/build-unified.mjs`, `src/scripts/build-shell-unified.mjs` не ссылаются на `component-extracts/`) и НЕ используются в runtime. Canonical source для VS-EMBED content — `src/master/*.html`, для CSS — `src/assets/vs-styles.css`, для JS — `src/shell/widgets/vs-*.js`.
- `scripts/audit_component_extracts.py` (новый) — regression test: 18 элементов, diff visual.html vs VS-EMBED block в master.
- `scripts/audit_component_extracts_css.py` (новый) — regression test: 18 элементов, diff styles.css vs SECTION 5 в vs-styles.css.

**НЕ в scope:** синхронизация 54 файлов extracts с текущим состоянием master/vs-styles.css/widgets — отложено (нет business value: extracts не используются). Если в будущем extracts потребуются как актуальный reference — regenerate from master: для каждого E## извлечь VS-EMBED block, strip wrapper, записать в `E##-visual.html`. Скрипты аудита уже готовы для верификации.

**Build hash `69d9b813` unchanged** — `component-extracts/` не входит в hash computation (только `src/master/`, `src/shell/`, `src/assets/`, `data/`, `parts/` root fallbacks).

### KI#28 — README.md section counts stale (Parts 1/5/7/8) ✅ CLOSED (iter 40)

README L31-38: Part 1 5→7, Part 5 6→8, Part 7 16→18, Part 8 17→16 (AP-16 не существует). Сумма 98 секций ✓.

### KI#29 — OCEAN labeling: N=70 marked as «extreme» vs Part 5 §5.1 RULE ✅ CLOSED (iter 40)

Label-only fix: `part_10.md` L408 + `appendix_character_map.md` — N=70 relabeled как cautious zone boundary (60–70), НЕ extreme (>70). Values unchanged (O:60/C:55/E:25/A:30/N:70 — moderate 4K-fallback).

### KI#25 — elena_character_bible.md OCEAN labels stale ✅ CLOSED (iter 39)

L78-80: A=38/N=68 `⚠️ EXTREME` → `⚠️ CAUTIOUS ZONE`; «Extreme poles: 3» → «1 (O=72) + 2 cautious zone». v9.2.1.

### KI#26 — vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift ✅ CLOSED (iter 39)

Выровнен с canon Part 10 §10.4: Setting → ТЕНЕБРИС, GHOST Layers → Tier 1/2/3, OCEAN 3 → 4 экстремума (O=85/C=25/A=15/N=92), Note расширена, Lorebook keys → ТЕНЕБРИС. v9.2.1.

### KI#27 — README.md stale Part 10 structure entry ✅ CLOSED (iter 39)

L40: «6 cards» → «4 cards: Elena, Walter, Omnis-Zeta, Vysherblenny (Geralt + Edward DELETED v9.1 — FIX-07)».

### KI#21 — Content Audit contradictions ✅ CLOSED полностью (iter 35-38)

57/57 правок в 14 canon-файлах. Детали — в `docs/AUDIT_VERIFICATION.md` §4.1–§4.4. iter 38 P3 создал 2 новых canon-файла: `part_00.md`, `appendix_character_map.md`. Canon total: 4 070 строк. Build hash `69d9b813` unchanged.

---

## Invariants (iter 42+)

- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- **Component extracts drift (iter 42+):** `python3 scripts/audit_component_extracts.py` (18/18 visual.html — DRIFT expected, historical snapshots) + `python3 scripts/audit_component_extracts_css.py` (16/18 styles.css — MATCH expected, E15/E18 known drift). Если extracts нужны как актуальный reference — regenerate from master (см. KI#32 «НЕ в scope»).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Build hash `69d9b813` — unchanged после iter 34 (KI#23 fix). Canon-файлы + doc-файлы (`docs/*.md`, `*.md` в root) + `visual-system/integration/component-extracts/` НЕ входят в hash computation — только `src/master/`, `src/shell/`, `src/assets/`, `data/`, `parts/` root fallbacks.
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible, не Part 10.
- **OCEAN labeling consistency (iter 40+, расширен iter 41):** extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`. Label-only fixes допустимы для internal canon consistency (Part 5 RULE vs Part 7A/Part 10/appendix labels) — values примера не трогаются. **Все canon locations с OCEAN labels проверены (iter 41):** `part_07a.md` L415, `part_10.md` L51/L148/L254/L408, `appendix_character_map.md` — все consistent с Part 5 §5.1 RULE.
- **Bible ↔ canon cross-ref symmetry (iter 41+):** bible (`vyshcherblenny_character_bible.md`) имеет Note → Part 10 §10.4 + Part 7A §7A.9 (iter 39 KI#26). Reverse: Part 10 §10.4 + Part 7A §7A.9 имеют Cross-ref Note → bible (iter 41 KI#31). Навигационная полнота.
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 43+ Roadmap (deferred from iter 42)

Не критично, не запланировано строго:

- **Glossary double-render inefficiency** (`data/glossary.json` 53 terms + `docs/canon/appendix_glossary.md` 30 entries + `parts/appendix_glossary.html` 30 entries — лёгкое дублирование между markdown canon и HTML rendering). LOW — structural, by design (canon = source of truth, HTML = render).
- **Component extracts regeneration (опционально)** — если extracts потребуются как актуальный reference: regenerate 54 файла from master (см. KI#32 «НЕ в scope»). Скрипты аудита уже готовы для верификации после регенерации. LOW — нет business value пока extracts не используются.

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
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). Pairwise diff audit выявил drift в 18/18 visual.html + 18/18 script.js + 2/18 styles.css (E15 KI#22, E18 iter 25). Файлы НЕ синхронизировались (54 файла, high risk, low value — extracts не используются в build/runtime). `component-extracts/README.md` обновлён с HISTORICAL SNAPSHOT notice. Audit scripts: `scripts/audit_component_extracts.py` + `scripts/audit_component_extracts_css.py`. Build hash `69d9b813` unchanged. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter (`--- canonical_for / vs_embedded / vs_cross_ref / sections / last_synced / migration_status ---`). |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
