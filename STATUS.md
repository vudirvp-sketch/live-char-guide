# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-44 + **iter 45 — KI#33 🔵 PARTIAL (33/57 fixes applied, contentHash `665cede7` 2nd change since iter 34)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 45 — CANON→MASTER HTML SYNC (PHASE 2) ✅ PARTIAL.** Применены 24 content fixes из 48 оставшихся audit правок к `src/master/*.html`. Кумулятивно 33/57 fixes (iter 44: 9 + iter 45: 24). Затронуты 10 файлов: `appendix_glossary`, `part_02`, `part_03`, `part_04`, `part_05`, `part_06`, `part_07a`, `part_07b`, `part_08`, `part_09`, `part_10`. contentHash в `build/build-manifest.json`: `34c34a7d9839c11d` → `665cede798c34fc0` (2nd change since iter 34). Shell hash `69d9b813` unchanged. Regression test `scripts/audit_canon_master_sync.py` расширен с 11 до 34 checks (iter 44 + iter 45 fixes). Осталось 24 fixes (iter 46+).

**iter 44 — Phase 1 ✅ COMPLETE (9/57 fixes).** 4 spot-checked drifts (iter 43) + 5 смежных A3/A7 drifts в `part_04/part_07a/part_10`. contentHash `58f4daa85c05e070` → `34c34a7d9839c11d` (1st change since iter 34).

**iter 34-43 — CSS/CSP + CANON AUDIT + DOC DRIFT FIX ✅ COMPLETE.** KI#21 (canon 57/57) + KI#22/#23/#24 (CSS/CSP) + KI#25-32 (doc drift). Canon ГОТОВ (4 070 строк).

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#33 (canon→master HTML sync gap)** | **MEDIUM** — сайт не отражает canon audit фиксы iter 35-41 | 🔵 **PARTIAL (iter 44+45: 33/57 fixes applied, 24 remaining)** | iter 43-45 |
| KI#32 (component-extracts/ drift: 54 historical snapshot files) | LOW — historical reference files, NOT used in build/runtime | ✅ CLOSED (doc-only) | iter 42 |
| KI#30 (OCEAN labeling leftover: part_07a L415 + part_10 L51) | LOW-MEDIUM | ✅ CLOSED (canon iter 41 + master iter 44) | iter 41+44 |
| KI#31 (Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to bible) | LOW — cosmetic | ✅ CLOSED (canon iter 41 + master iter 44) | iter 41+44 |
| KI#28 (README.md section counts stale) | LOW | ✅ CLOSED | iter 40 |
| KI#29 (OCEAN labeling: N=70 marked as «extreme») | LOW-MEDIUM | ✅ CLOSED (canon iter 40 + master iter 44) | iter 40+44 |
| KI#25 (elena_character_bible.md OCEAN labels stale) | LOW | ✅ CLOSED (canon iter 39 + master iter 44) | iter 39+44 |
| KI#26 (vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift) | MEDIUM | ✅ CLOSED (bible only — не входит в build) | iter 39 |
| KI#27 (README.md stale Part 10 structure entry) | LOW | ✅ CLOSED | iter 39 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ **CLOSED** canon (57/57 iter 35-38) + **33/57 master sync (iter 44+45)** | iter 33-38, 44-45 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#23 (CSP worker-src missing) | MEDIUM | ✅ CLOSED | iter 34 |
| KI#24 (FAB Glossary/TOC verification) | LOW | ✅ VERIFIED — no bug | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED — 5/5 sub-items fixed | iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 | iter 26-31 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#1..KI#12, KI#14..#19 | various | ✅ CLOSED | iter 1-7 |

### KI#33 — canon→master HTML sync gap 🔵 PARTIAL (iter 44+45: 33/57 fixes applied)

**Симптом:** canon audit фиксы iter 35-41 находятся в `docs/canon/*.md`, но НЕ синхронизированы с `src/master/*.html` (деплоится на сайт).

**iter 45 PROGRESS (24 fixes applied):**

| # | Fix ID | File | Description | Status |
|---|--------|------|-------------|--------|
| 1 | P0-1 (A1) | `appendix_glossary.html` | T→A→P heading: Pattern → Price | ✅ iter 45 |
| 2 | P0-7 (A4) | `part_04.html` | Выщербленный canonical NEED text update | ✅ iter 45 |
| 3 | P0-8 (A4) | `part_04.html` | Full chain NEED text update | ✅ iter 45 |
| 4 | P0-9 (A4) | `part_04.html` | Выщербленный variant row delete + variant label | ✅ iter 45 |
| 5 | P0-10 (A6) | `part_08.html` | AP-15 immediate Price («кричит: Вон!») | ✅ iter 45 |
| 6 | P0-11 (A9) | `part_09.html` | 3-level → 4-zone scale (Критический/Слабый/Хороший/Отличный) | ✅ iter 45 |
| 7 | P0-12 (A10) | `part_09.html` | Vysh Quick Check rename + clarifier paragraph | ✅ iter 45 |
| 8 | P0-13 (B1) | `part_10.html` | Omnis GHOST: abstract fear → concrete event | ✅ iter 45 |
| 9 | P0-14 (B1) | `part_10.html` | Omnis FLAW: abstract adjective → concrete behavior | ✅ iter 45 |
| 10 | P0-16 (NEW-3) | `part_05.html` | §5.1 RULE expansion (8K+/16K+ context limits) | ✅ iter 45 |
| 11 | P1-1 (A5) | `part_08.html` | AP-9 broken SPINE criterion clarification | ✅ iter 45 |
| 12 | P1-3 (A8) | `part_08.html` | OCEAN Overload orphan row delete + footnote | ✅ iter 45 |
| 13 | P1-4 (B2) | `part_10.html` | Walter GHOST: «Унижение» label → concrete observation | ✅ iter 45 |
| 14 | P1-5 (B5) | `part_04.html` | 3 Anchor type definitions (Psychological/At-rest/Growth) | ✅ iter 45 |
| 15 | P1-6 (B6) | `part_06.html` | Tier 0 «12B» → «12B+» (sync with E11 viz) | ✅ iter 45 |
| 16 | P1-7 (D1) | `part_04.html` | Secondary GHOST row delete + Примечание | ✅ iter 45 |
| 17 | P1-10 (D4+NEW-2) | `part_07a.html` | Lorebook example: «пожар» → «предательство» (primary GHOST) | ✅ iter 45 |
| 18 | P1-11 (D4) | `part_07b.html` | Пример 1 (предательство) added + Пример 2/3/4 renumbered | ✅ iter 45 |
| 19 | P3-1 (D3) | `part_07b.html` | Greeting scene clarification note (бар, ночь vs кабинет редакции) | ✅ iter 45 |
| 20 | P3-1 (D3) | `part_10.html` | Greeting scene clarification note (reverse cross-ref) | ✅ iter 45 |
| 21 | P3-3 (D6) | `part_03.html` | Йоуёма character context paragraph (Сквозные персонажи) | ✅ iter 45 |
| 22 | P3-5 (F2) | `part_02.html` | Price table 4th column «Пример (конкретный)» added | ✅ iter 45 |
| 23 | P3-6 (F3) | `part_03.html` | Voice Isolation % methodology note added | ✅ iter 45 |
| — | P0-15 (NEW-1) | — | SKIP — «待» char + Cross-references секция уже удалены (P2-6 canon, master не имеет секции) | ⏭️ SKIP |

**iter 45 verification:** regression test `scripts/audit_canon_master_sync.py` — 34/34 checks PASS (11 iter 44 + 23 iter 45). contentHash `34c34a7d` → `665cede7` (2nd change since iter 34). All validation gates PASS.

**iter 44 PROGRESS (9 fixes applied):** P0-2/P0-3/P0-4/P0-5/P1-2 (KI#21-A2/A3/A7), KI#29/30/31 (iter 40/41 canon). См. ниже в таблице fixes iter 44.

**iter 46+ REMAINING (24 fixes):**

| Category | Count | Files | Notes |
|----------|-------|-------|-------|
| P1-8 (D1) | 1 | part_04 | Secondary-LIE Елена row delete |
| P1-9 (D2) | 1 | part_04 | Variant-LIE Выщербленный row delete |
| P2-1 (C1) | 1 | part_01 | Ключевые термины block (Anchor/Voice/SPINE/OCEAN) |
| P2-3 (C5) | ~8 | multiple | Bridge paragraphs cleanup (8 delete, 2 keep) |
| P2-7 (E4) | multiple | multiple | «Что вы теперь умеете» resume sections removal |
| P2-9 (E6) | 1 | part_07a | Pattern Matcher refs (×2) |
| P2-12 (B4 partial) | 1 | part_03 | Tier 1/2/3 → Quality Grade A/B/C |
| P2-13 (F4) | 1 | part_04 | «Запрещённые слова» → «Запрещённые формулировки» |
| P2-14 (F5) | 1 | part_05 | Cautious zone определение |
| P2-16 (F7) | 1 | part_07a | Keirsey SP → Sensing-Perceiving |
| P2-17 (F9) | 1 | part_09 | 1-словные симптомы для AP-ссылок |
| P2-18 (F10) | 1 | part_10 | Elena inline annotations → Annotation callout |
| P3-2 (D5) | multiple | part_10 | HTML comments `<!-- Demonstrates: -->` → visible callouts (5 cards) |
| P3-4 (D7) | multiple | part_01/04/09 | Уолтер cross-refs |
| P3-7 (F8) | — | — | SKIP — covered by P0-2 |
| Skip (metadata) | ~9 | — | YAML front-matter (P2-4), callout labels policy (P2-2), `[ref: ...]` notation (P2-6), `<br/>` → em-dash (P2-15), part_00/appendix_character_map (P3-8/11 — no master equivalent) |

**Fix plan (iter 46+, deferred):**
1. По одной категории (P1-8/9, P2-*, P3-2/4) — применять fixes к `src/master/*.html`.
2. После каждого Part: `pnpm run build` + `validate:master` + `audit_canon_master_sync.py` + visual diff.
3. Расширить `scripts/audit_canon_master_sync.py` до general-purpose drift detector (сравнение canon §X.Y vs master HTML semantic content).

---

## Invariants (iter 45+)

- **Canon → master HTML sync (iter 43+ invariant, iter 45 PARTIAL 33/57):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. iter 44+45: 33/57 fixes применены. Осталось 24 (iter 46+). Regression test: `python3 scripts/audit_canon_master_sync.py` (34/34 PASS).
- **Build hash vs contentHash (iter 44+):** Shell hash `69d9b813` (в `build.hash`) = SHA-256 of `src/shell/index.html` ONLY. contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` (iter 34-43) → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45). **Shell hash unchanged ≠ master HTML unchanged.**
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- Component extracts drift (iter 42+): `python3 scripts/audit_component_extracts.py` + `_css.py` (drift expected, historical snapshots).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible.
- OCEAN labeling consistency (iter 40+): extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`.
- Bible ↔ canon cross-ref symmetry (iter 41+).
- Callout class policy: разрешены только `.callout.rule/.rec/.ex` (and plain `.callout`). Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463).
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 46+ Roadmap (deferred from iter 45)

**MEDIUM priority (KI#33 continue):**

- **KI#33 fix Phase 3 — canon→master HTML sync (iter 46+, 24 fixes remain).** Категории:
  - **P1-8/P1-9 (D1/D2)** — `part_04` secondary-LIE Елена + variant-LIE Выщербленный row delete (2 fixes, low risk)
  - **P2-* content fixes** — terminology cleanup (skip P2-4 YAML, P2-15 `<br/>` metadata):
    - P2-1 (C1) — `part_01` Ключевые термины block
    - P2-3 (C5) — multiple files Bridge paragraphs cleanup
    - P2-7 (E4) — multiple files «Что вы теперь умеете» resume removal
    - P2-9 (E6) — `part_07a` Pattern Matcher refs
    - P2-12 (B4) — `part_03` Tier 1/2/3 → Quality Grade A/B/C
    - P2-13 (F4) — `part_04` «Запрещённые слова» → «Запрещённые формулировки»
    - P2-14 (F5) — `part_05` Cautious zone определение
    - P2-16 (F7) — `part_07a` Keirsey SP → Sensing-Perceiving
    - P2-17 (F9) — `part_09` 1-словные симптомы
    - P2-18 (F10) — `part_10` Elena inline annotations → Annotation callout
  - **P3-2 (D5)** — `part_10` HTML comments → visible callouts (5 cards, structural — high risk)
  - **P3-4 (D7)** — `part_01/04/09` Уолтер cross-refs
- **General-purpose drift detector** — расширить `scripts/audit_canon_master_sync.py` до сравнения canon §X.Y vs master HTML `<section data-section>` semantic content.

**LOW priority (deferred from iter 42):**

- **Glossary double-render inefficiency** — structural, by design (canon = source of truth, HTML = render).
- **Component extracts regeneration (опционально)** — regenerate 54 файла from master. Нет business value пока extracts не используются.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated. Не редактировать напрямую. Все правки — в `src/` или `docs/canon/`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Весь контент — Part 0 (concept) → Part 1 → Part 10. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canon migration COMPLETE (iter 7-18) + concept additions (iter 38)** | Все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED/ADDED. См. `docs/canon/_README.md` §5. |
| **Canon → master HTML sync (iter 45 PARTIAL 33/57, KI#33)** | 33/57 fixes синхронизированы с `src/master/*.html`. Осталось 24 (iter 46+). contentHash `665cede798c34fc0` (2nd change since iter 34). Regression test: `scripts/audit_canon_master_sync.py` (34/34 PASS). |
| **Build hash vs contentHash (iter 44+)** | Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45). |
| **CSP compliance (KI#16/#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **Callout class policy (iter 45+ invariant)** | Разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED canon (iter 35-38) + 33/57 master sync (iter 44+45)** | 57/57 в canon. 33/57 синхронизированы с master. 24 pending — KI#33 PARTIAL. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение (как plain `<p>`, не callout). См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
