# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-43 (KI#1..#32 ✅ CLOSED) + **iter 44 — KI#33 🔵 PARTIAL (9/57 canon→master HTML sync fixes applied, contentHash `34c34a7d` first change since iter 34)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 44 — CANON→MASTER HTML SYNC (PHASE 1) ✅ PARTIAL.** Применены 9 content fixes из 57 audit правок KI#21 + KI#25-31 к `src/master/*.html`. Все 4 spot-checked drifts (iter 43) закрыты + 5 смежных A3/A7 drifts в тех же 3 файлах. contentHash в `build/build-manifest.json` изменился впервые с iter 34: `58f4daa85c05e070` → `34c34a7d9839c11d`. Shell hash `69d9b813` unchanged (вычисляется ТОЛЬКО из `src/shell/index.html`, не из master HTML — см. § Invariants). Создан regression test `scripts/audit_canon_master_sync.py` (11 checks, focused guard на iter 44 fixes). iter 44 = 9/57 fixes. Осталось 48 fixes (iter 45+).

**iter 43 — DEPLOY PIPELINE DOC + KI#33 DISCOVERED.** iter 42 COMPLETE (commit `0d2534e`, KI#32 ✅ CLOSED doc-only). Канон ГОТОВ (4 070 строк, все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED). Deployment Pipeline documented в AGENT_NAVIGATION.md §2a. KI#33 🟡 NEW: canon audit фиксы iter 35-41 НЕ синхронизированы с `src/master/*.html` — 3 spot-checks подтвердили drift.

**iter 34-42 — CSS/CSP + CANON AUDIT + DOC DRIFT FIX ✅ COMPLETE.** KI#22/#23/#24 (iter 34), KI#21 P0/P1/P2/P3 (iter 35-38, 57/57 правок), KI#25/#26/#27 (iter 39 doc drift), KI#28/#29 (iter 40 README + OCEAN), KI#30/#31 (iter 41 OCEAN leftover + cross-ref), KI#32 (iter 42 component-extracts drift, doc-only).

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#33 (canon→master HTML sync gap: iter 35-41 audit fixes не синхронизированы с `src/master/*.html`)** | **MEDIUM** — сайт не отражает canon audit фиксы iter 35-41 | 🔵 **PARTIAL (iter 44: 9/57 fixes applied, 48 remaining)** | iter 43-44 |
| KI#32 (component-extracts/ drift: 54 historical snapshot files vs canonical source) | LOW — historical reference files, NOT used in build/runtime | ✅ CLOSED (doc-only) | iter 42 |
| KI#30 (OCEAN labeling leftover: part_07a L415 + part_10 L51) | LOW-MEDIUM | ✅ CLOSED (canon iter 41 + **master iter 44**) | iter 41+44 |
| KI#31 (Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to bible) | LOW — cosmetic | ✅ CLOSED (canon iter 41 + **master iter 44**) | iter 41+44 |
| KI#28 (README.md section counts stale) | LOW | ✅ CLOSED | iter 40 |
| KI#29 (OCEAN labeling: N=70 marked as «extreme» vs Part 5 §5.1 RULE) | LOW-MEDIUM | ✅ CLOSED (canon iter 40 + **master iter 44**) | iter 40+44 |
| KI#25 (elena_character_bible.md OCEAN labels stale) | LOW | ✅ CLOSED (canon iter 39 + **master iter 44 — part_07a L1107 P0-2 fix**) | iter 39+44 |
| KI#26 (vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift) | MEDIUM | ✅ CLOSED (bible only — не входит в build, не требует sync) | iter 39 |
| KI#27 (README.md stale Part 10 structure entry) | LOW | ✅ CLOSED | iter 39 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ **CLOSED** canon (57/57 iter 35-38) + **9/57 master sync (iter 44)** | iter 33-38, 44 |
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

### KI#33 — canon→master HTML sync gap 🔵 PARTIAL (iter 44: 9/57 fixes applied)

**Симптом:** canon audit фиксы iter 35-41 находятся в `docs/canon/*.md`, но НЕ синхронизированы с `src/master/*.html` (который деплоится на сайт через build → GitHub Pages).

**iter 44 PROGRESS (9/57 fixes applied):**

| # | Fix ID | File | Location | Sync Status |
|---|--------|------|----------|-------------|
| 1 | P0-2 (KI#21-A2) | `src/master/part_07a.html` | L1107 (Елена OCEAN extreme poles 3→1) | ✅ iter 44 |
| 2 | P0-3 (KI#21-A3) | `src/master/part_04.html` | L633 (G3 row «после 7-го») | ✅ iter 44 |
| 3 | P0-4 (KI#21-A3) | `src/master/part_07a.html` | L417 (§7A.5 AN «Счётчик вырезаний») | ✅ iter 44 |
| 4 | P0-5 (KI#21-A3) | `src/master/part_07a.html` | L719 (§7A.9 XML template G3) | ✅ iter 44 |
| 5 | P1-2 (KI#21-A7) | `src/master/part_07a.html` | L426 (AN sections table row) | ✅ iter 44 |
| 6 | KI#29 (iter 40) | `src/master/part_10.html` | L511 (§10.4 Выщербленный OCEAN) | ✅ iter 44 |
| 7 | KI#30 (iter 41) | `src/master/part_07a.html` | L729 (§7A.9 Выщербленный OCEAN) | ✅ iter 44 |
| 8 | KI#30 (iter 41) | `src/master/part_10.html` | L160 (§10.1 Елена OCEAN) | ✅ iter 44 |
| 9 | KI#31 (iter 41) | `src/master/part_07a.html` + `part_10.html` | L730 + L512 (Cross-ref Notes ×2) | ✅ iter 44 |
| — | A3 collateral | `src/master/part_10.html` | L611 (§10.4 AN «Счётчик вырезаний») | ✅ iter 44 (bonus) |

**iter 44 verification:** regression test `scripts/audit_canon_master_sync.py` — 11/11 checks PASS. contentHash changed `58f4daa85c05e070` → `34c34a7d9839c11d` (first change since iter 34). All validation gates PASS.

**iter 45+ REMAINING (48 fixes):**

| Category | Count | Files | Examples |
|----------|-------|-------|----------|
| P0-1 (A1) | 1 | appendix_glossary | T→A→P (Pattern → Price) |
| P0-7..9 (A4) | 3 | part_04 | NEED text + variant row delete |
| P0-10 (A6) | 1 | part_08 | AP-9 immediate Price |
| P0-11 (A9) | 1 | part_09 | 3-level → 4-zone scale |
| P0-12 (A10) | 1 | part_09 | Quick Check heading rename |
| P0-13..14 (B1) | 2 | part_10 | Vysherblenny GHOST + FLAW rewrites |
| P0-15 (NEW-1) | 1 | part_04 | Chinese char + cross-refs fill |
| P0-16 (NEW-3) | 1 | part_05 | §5.1 RULE expansion |
| P1-1 (A5) | 1 | part_08 | AP-9 broken SPINE criterion |
| P1-3 (A8) | 1 | part_08 | Orphan OCEAN Overload row delete |
| P1-4 (B2) | 1 | part_10 | Walter GHOST rewrite |
| P1-5 (B5) | 1 | part_04 | 3 Anchor type definitions |
| P1-6 (B6) | 1 | part_06 | Tier 0 → Tier 0+ |
| P1-7..9 (D1/D2) | 3 | part_04 | Secondary/variant rows delete |
| P1-10 (D4) | 1 | part_07a | §7A.13 Елена Lorebook (предательство instead of пожар) |
| P1-11 (D4) | 1 | part_07b | §7B.3 Example 1 rewrite |
| P2-* (terminology) | ~10 | multiple | Bridge paragraphs, Pattern Matcher refs, etc. |
| P3-* (local + new sections) | ~10 | multiple | D3/D5/D6/D7, F2/F3, G1-G5 (где применимо к master) |
| Skip (canon-only metadata) | ~9 | — | YAML front-matter (P2-4), callout labels (P2-2), `[ref: ...]` notation (P2-6), `<br/>` tags (P2-15), part_00/appendix_character_map (P3-8/11 — no master equivalent) |

**Причины gap (iter 43 documented):**
- `_README.md` §4 workflow описывает «Canon creation iter N → Master HTML migration iter N+1», но после первоначальной миграции (iter 18) canon audit фиксы iter 35-41 НЕ сопровождались re-migration в master HTML.
- Shell build hash `69d9b813` вычисляется ТОЛЬКО из `src/shell/index.html` — НЕ из master HTML. Content hash в `build/build-manifest.json` вычисляется из `src/master/*.html` и ИЗМЕНИЛСЯ в iter 44 (см. § Invariants).
- Regression test `scripts/audit_canon_master_sync.py` создан в iter 44 (focused guard для iter 44 fixes). General-purpose drift detector — iter 45+.

**Fix plan (iter 45+, deferred):**
1. По одной категории (P0-7..9, P0-10..16, P1-*, P2-*, P3-*) — применять fixes к `src/master/*.html`.
2. После каждого Part: `pnpm run build` + `validate:master` + `python3 scripts/audit_canon_master_sync.py` + visual diff.
3. После полного sync — contentHash стабилизируется на новом baseline. Shell hash останется `69d9b813` (только если shell/index.html не трогается).
4. Расширить `scripts/audit_canon_master_sync.py` до general-purpose drift detector (сравнение canon §X.Y semantic content vs master HTML).

### KI#32 — component-extracts/ drift ✅ CLOSED (iter 42, doc-only)

Pairwise diff audit выявил drift в 54 historical snapshot files vs canonical source. Файлы НЕ синхронизировались (high risk, low value — `component-extracts/` не используются в build/runtime). Fix: `component-extracts/README.md` переписан с HISTORICAL SNAPSHOT notice. 2 audit scripts: `scripts/audit_component_extracts*.py`.

### KI#28 — README.md section counts stale ✅ CLOSED (iter 40)

README L31-38: Part 1 5→7, Part 5 6→8, Part 7 16→18, Part 8 17→16. Сумма 98 секций ✓.

### KI#29-31 — OCEAN labeling + cross-ref fixes ✅ CLOSED (iter 40-41 canon, iter 44 master)

Label-only fixes в `docs/canon/part_07a.md` L415, `part_10.md` L51/L408, `appendix_character_map.md`. Values unchanged. Reverse cross-ref Note в part_10 §10.4 + part_07a §7A.9 → bible. **iter 44: master HTML sync ✅ CLOSED** для всех 4 locations (part_07a L729, part_10 L160/L511, Cross-ref Notes ×2).

### KI#25-27 — Bible + README doc drift ✅ CLOSED (iter 39, canon only — KI#25 part_07a L1107 master sync в iter 44)

`elena_character_bible.md` OCEAN labels, `vyshcherblenny_character_bible.md` (Setting → ТЕНЕБРИС, GHOST → Tier 1/2/3, OCEAN 3 → 4 extreme), `README.md` Part 10 structure (6 → 4 cards). v9.2.1. **iter 44: master HTML sync ✅ CLOSED** для P0-2 fix (part_07a L1107 — iter 39 KI#25 spot-checked location).

### KI#21 — Content Audit contradictions ✅ CLOSED canon (iter 35-38) + 🔵 PARTIAL master sync (iter 44: 9/57)

57/57 правок в 14 canon-файлах. iter 44: 9/57 fixes синхронизированы с `src/master/*.html` (4 spot-checked drifts + 5 adjacent A3/A7 fixes в 3 файлах). Осталось 48 fixes для iter 45+. Build contentHash `34c34a7d9839c11d` (first change since iter 34).

---

## Invariants (iter 44+)

- **Canon → master HTML sync (iter 43+ invariant, iter 44 PARTIAL):** `docs/canon/*.md` = source of truth для content. `src/master/*.html` = production HTML, деплоится на сайт. iter 44: 9/57 fixes применены. Осталось 48 fixes (iter 45+). Regression test: `python3 scripts/audit_canon_master_sync.py` (11/11 checks PASS).
- **Build hash vs contentHash (iter 44+ clarification):** Shell hash `69d9b813` (в `build.hash`) = SHA-256 of `src/shell/index.html` ONLY, НЕ включает master HTML. contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`, ИЗМЕНИЛСЯ в iter 44: `58f4daa85c05e070` → `34c34a7d9839c11d` (first change since iter 34). **Shell hash unchanged ≠ master HTML unchanged**.
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- Component extracts drift (iter 42+): `python3 scripts/audit_component_extracts.py` (18/18 visual.html — DRIFT expected) + `python3 scripts/audit_component_extracts_css.py` (16/18 styles.css — MATCH expected, E15/E18 known drift). Historical snapshots, NOT used in build/runtime.
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible, не Part 10.
- OCEAN labeling consistency (iter 40+, расширен iter 41): extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`. **iter 44: master HTML sync ✅ CLOSED** для 4 locations (part_07a L729, part_10 L160/L511).
- Bible ↔ canon cross-ref symmetry (iter 41+): bible Note → Part 10 §10.4 + Part 7A §7A.9; reverse Cross-ref Note → bible. **iter 44: master HTML sync ✅ CLOSED** для 2 locations (Cross-ref Notes ×2).
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 45+ Roadmap (deferred from iter 44)

**MEDIUM priority (KI#33 continue):**

- **KI#33 fix Phase 2 — canon→master HTML sync (iter 45+).** 48 audit правок remain. Категории (по priority):
  - **P0-7..9 (A4)** — `part_04` NEED text + variant row delete (3 fixes, medium risk — touches canonical NEED)
  - **P0-13..14 (B1)** — `part_10` Vysherblenny GHOST + FLAW rewrites (2 fixes, medium risk — character canon)
  - **P0-15 (NEW-1)** — `part_04` Chinese char + cross-refs fill (1 fix, low risk)
  - **P0-16 (NEW-3)** — `part_05` §5.1 RULE expansion (1 fix, low risk — RULE clarification)
  - **P0-1 (A1)** — `appendix_glossary` T→A→P (Pattern → Price) (1 fix, low risk)
  - **P0-10..12 (A6/A9/A10)** — `part_08`, `part_09` (3 fixes, low risk)
  - **P1-1..11** — `part_04/06/07a/07b/08/10` (11 fixes, low-medium risk)
  - **P2-*** — terminology cleanup (only content fixes, skip P2-4/P2-15 metadata)
  - **P3-*** — local fixes + cross-refs (skip P3-8/11 — no master equivalent)
- **General-purpose drift detector** — расширить `scripts/audit_canon_master_sync.py` до сравнения canon §X.Y vs master HTML `<section data-section>` semantic content.

**LOW priority (deferred from iter 42):**

- **Glossary double-render inefficiency** (`data/glossary.json` 53 terms + `docs/canon/appendix_glossary.md` 30 entries + `parts/appendix_glossary.html` 30 entries). Structural, by design (canon = source of truth, HTML = render).
- **Component extracts regeneration (опционально)** — regenerate 54 файла from master (см. KI#32 «НЕ в scope»). Нет business value пока extracts не используются.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED/ADDED. См. `docs/canon/_README.md` §5. |
| **Canon → master HTML sync (iter 44 PARTIAL, KI#33)** | 9/57 canon audit fixes синхронизированы с `src/master/*.html` (iter 44). Осталось 48 (iter 45+). contentHash `34c34a7d9839c11d` (first change since iter 34). Regression test: `scripts/audit_canon_master_sync.py`. |
| **Build hash vs contentHash (iter 44+ clarification)** | Shell hash `69d9b813` (in `build.hash`) = SHA-256 of `src/shell/index.html` ONLY. contentHash (in `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`, CHANGED in iter 44: `58f4daa85c05e070` → `34c34a7d9839c11d`. **Shell hash unchanged ≠ master HTML unchanged.** |
| **CSP compliance (KI#16 CLOSED, KI#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED (iter 35-38, canon only) + 9/57 master sync (iter 44)** | 57/57 правок закрыты в canon. 9/57 синхронизированы с master HTML (iter 44). 48 master sync pending — KI#33 PARTIAL. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. Audit scripts: `scripts/audit_component_extracts*.py`. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
