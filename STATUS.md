# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-45 + **iter 46 — KI#33 🔵 PARTIAL (41/57 fixes applied cumulatively, contentHash `d2fdafea` 3rd change since iter 34)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 46 — CANON→MASTER HTML SYNC (PHASE 3) ✅ PARTIAL.** Применены 8 content fixes к `src/master/*.html` (P2-1, P2-9, P2-12, P2-13, P2-14, P2-16, P2-17, P3-4 ×3 locations). Кумулятивно 41/57 fixes (iter 44: 9 + iter 45: 24 + iter 46: 8). Затронуты 6 файлов: `part_01`, `part_03`, `part_04`, `part_05`, `part_07a`, `part_09`. contentHash в `build/build-manifest.json`: `665cede798c34fc0` → `d2fdafeaf093dd80` (3rd change since iter 34). Shell hash `69d9b813` unchanged. Regression test `scripts/audit_canon_master_sync.py` расширен с 34 до 57 checks (iter 44+45+46 fixes). P1-8/9 SKIP — secondary/variant LIE rows уже отсутствуют в master HTML (canon-only fix). Осталось 16 fixes (iter 47+).

**iter 44-45 — Phase 1+2 ✅ COMPLETE (33/57 fixes).** iter 44: 9 fixes (Phase 1) + iter 45: 24 fixes (Phase 2). contentHash `58f4daa85c05e070` → `34c34a7d9839c11d` → `665cede798c34fc0`.

**iter 34-43 — CSS/CSP + CANON AUDIT + DOC DRIFT FIX ✅ COMPLETE.** KI#21 (canon 57/57) + KI#22/#23/#24 (CSS/CSP) + KI#25-32 (doc drift). Canon ГОТОВ (4 070 строк).

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#33 (canon→master HTML sync gap)** | **MEDIUM** — сайт не отражает canon audit фиксы iter 35-41 | 🔵 **PARTIAL (iter 44+45+46: 41/57 fixes applied, 16 remaining)** | iter 43-46 |
| KI#32 (component-extracts/ drift: 54 historical snapshot files) | LOW — historical reference files, NOT used in build/runtime | ✅ CLOSED (doc-only) | iter 42 |
| KI#30 (OCEAN labeling leftover: part_07a L415 + part_10 L51) | LOW-MEDIUM | ✅ CLOSED (canon iter 41 + master iter 44) | iter 41+44 |
| KI#31 (Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to bible) | LOW — cosmetic | ✅ CLOSED (canon iter 41 + master iter 44) | iter 41+44 |
| KI#28 (README.md section counts stale) | LOW | ✅ CLOSED | iter 40 |
| KI#29 (OCEAN labeling: N=70 marked as «extreme») | LOW-MEDIUM | ✅ CLOSED (canon iter 40 + master iter 44) | iter 40+44 |
| KI#25 (elena_character_bible.md OCEAN labels stale) | LOW | ✅ CLOSED (canon iter 39 + master iter 44) | iter 39+44 |
| KI#26 (vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift) | MEDIUM | ✅ CLOSED (bible only — не входит в build) | iter 39 |
| KI#27 (README.md stale Part 10 structure entry) | LOW | ✅ CLOSED | iter 39 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ **CLOSED** canon (57/57 iter 35-38) + **41/57 master sync (iter 44+45+46)** | iter 33-38, 44-46 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#23 (CSP worker-src missing) | MEDIUM | ✅ CLOSED | iter 34 |
| KI#24 (FAB Glossary/TOC verification) | LOW | ✅ VERIFIED — no bug | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED — 5/5 sub-items fixed | iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 | iter 26-31 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#1..KI#12, KI#14..#19 | various | ✅ CLOSED | iter 1-7 |

### KI#33 — canon→master HTML sync gap 🔵 PARTIAL (iter 44+45+46: 41/57 fixes applied)

**Симптом:** canon audit фиксы iter 35-41 находятся в `docs/canon/*.md`, но НЕ синхронизированы с `src/master/*.html` (деплоится на сайт).

**iter 46 PROGRESS (8 fixes applied):**

| # | Fix ID | File | Description | Status |
|---|--------|------|-------------|--------|
| 1 | P2-1 (C1) | `part_01.html` §1.4 | Ключевые термины block (Anchor/Voice/SPINE/OCEAN) + bold **Pattern Matcher** | ✅ iter 46 |
| 2 | P2-9 (E6) | `part_07a.html` Format Lock | Pattern Matcher ref: «Модель — Pattern Matcher (см. Part 1 §1.4)» | ✅ iter 46 |
| 3 | P2-9 (E6) | `part_07a.html` Format Lock RULE | Pattern Matcher ref: «модель выступает как Pattern Matcher (см. §1.4 Part 1)» | ✅ iter 46 |
| 4 | P2-12 (B4) | `part_03.html` §3.4 | Tier 1/2/3 → Quality Grade A/B/C + disambiguation block | ✅ iter 46 |
| 5 | P2-13 (F4) | `part_04.html` §4.2 | «Запрещённые слова» → «Запрещённые формулировки — это выводы-ярлыки...» | ✅ iter 46 |
| 6 | P2-14 (F5) | `part_05.html` §5.1 | Cautious zone (30–40 / 60–70) определение после RULE | ✅ iter 46 |
| 7 | P2-16 (F7) | `part_07a.html` §7A.1 | Keirsey SP (Artisan/Ремесленник) → Sensing-Perceiving | ✅ iter 46 |
| 8 | P2-17 (F9) | `part_09.html` §9.6 | 1-словные симптомы для AP-refs (×7: AP-3/5/6/7/9/10/15) | ✅ iter 46 |
| 9 | P3-4 (D7) | `part_01.html` §1.4 | Cross-ref на Уолтера §10.2 (реалистичный современный персонаж) | ✅ iter 46 |
| 10 | P3-4 (D7) | `part_04.html` §4.11 | Cross-ref на Уолтера §10.2 (SPINE без GHOST Layers) | ✅ iter 46 |
| 11 | P3-4 (D7) | `part_09.html` §9.6 | Cross-ref на Уолтера §10.2 (тестирование карточки с OCEAN) | ✅ iter 46 |
| — | P1-8 (D1) | — | SKIP — secondary-LIE Елена row отсутствует в master HTML (canon-only fix) | ⏭️ SKIP |
| — | P1-9 (D2) | — | SKIP — variant-LIE Выщербленный row отсутствует в master HTML (canon-only fix) | ⏭️ SKIP |

**iter 46 verification:** regression test `scripts/audit_canon_master_sync.py` — 57/57 checks PASS (11 iter 44 + 23 iter 45 + 23 iter 46). contentHash `665cede7` → `d2fdafea` (3rd change since iter 34). All validation gates PASS.

**iter 44-45 PROGRESS (33 fixes applied):** iter 44 (9 fixes) + iter 45 (24 fixes). См. ниже «Предыдущие итерации (кратко)».

**iter 47+ REMAINING (16 fixes):**

| Category | Count | Files | Risk | Notes |
|----------|-------|-------|------|-------|
| P2-3 (C5) | ~8 | multiple | MEDIUM | Bridge paragraphs cleanup (8 delete, 2 keep). Risk: может нарушить narrative flow |
| P2-7 (E4) | multiple | multiple | MEDIUM | «Что вы теперь умеете» resume sections removal. Risk: structural delete |
| P2-18 (F10) | 1 | part_10 | MEDIUM | Elena inline annotations → Annotation callout. Risk: structural transformation |
| P3-2 (D5) | multiple | part_10 | HIGH | HTML comments `<!-- Demonstrates: -->` → visible callouts (5 cards). Risk: structural, добавить 5 новых callout blocks перед карточками |
| Skip (metadata) | ~5 | — | — | YAML front-matter (P2-4), callout labels policy (P2-2), `[ref: ...]` notation (P2-6), `<br/>` → em-dash (P2-15) — canon-only, no master equivalent. P3-7 covered by P0-2. P3-8/11 — part_00/appendix_character_map (no master equivalent). |

**Fix plan (iter 47+, deferred):**
1. **MEDIUM risk first** — P2-3 (Bridge paragraphs), P2-7 (resume sections), P2-18 (Elena annotations). Каждый Part: `pnpm run build` + `validate:master` + `audit_canon_master_sync.py` + visual diff.
2. **HIGH risk last** — P3-2 (HTML comments → visible callouts, 5 cards в part_10). Может потребовать добавления 5 новых `<div class="callout rule">` или `<div class="callout rec">` блоков перед карточками. Тестировать визуально.
3. Расширить `scripts/audit_canon_master_sync.py` до general-purpose drift detector (сравнение canon §X.Y vs master HTML semantic content).

---

## Invariants (iter 46+)

- **Canon → master HTML sync (iter 43+ invariant, iter 46 PARTIAL 41/57):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. iter 44+45+46: 41/57 fixes применены. Осталось 16 (iter 47+). Regression test: `python3 scripts/audit_canon_master_sync.py` (57/57 PASS).
- **Build hash vs contentHash (iter 44+):** Shell hash `69d9b813` (в `build.hash`) = SHA-256 of `src/shell/index.html` ONLY. contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` (iter 34-43) → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45) → `d2fdafeaf093dd80` (iter 46). **Shell hash unchanged ≠ master HTML unchanged.**
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- Component extracts drift (iter 42+): `python3 scripts/audit_component_extracts.py` + `_css.py` (drift expected, historical snapshots).
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible.
- OCEAN labeling consistency (iter 40+): extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`.
- Bible ↔ canon cross-ref symmetry (iter 41+).
- Callout class policy (iter 45+): разрешены только `.callout.rule/.rec/.ex` (and plain `.callout`). Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463).
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 47+ Roadmap (deferred from iter 46)

**MEDIUM priority (KI#33 continue):**

- **KI#33 fix Phase 4 — canon→master HTML sync (iter 47+, 16 fixes remain).** Категории:
  - **P2-3 (C5)** — multiple files Bridge paragraphs cleanup (~8 delete, 2 keep). Risk: narrative flow.
  - **P2-7 (E4)** — multiple files «Что вы теперь умеете» resume sections removal. Risk: structural delete.
  - **P2-18 (F10)** — `part_10` Elena inline annotations → Annotation callout. Risk: structural transformation.
  - **P3-2 (D5)** — `part_10` HTML comments → visible callouts (5 cards, structural — HIGH risk). Может потребовать добавления 5 новых `<div class="callout rule">` или `<div class="callout rec">` блоков перед карточками.
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
| **Canon → master HTML sync (iter 46 PARTIAL 41/57, KI#33)** | 41/57 fixes синхронизированы с `src/master/*.html`. Осталось 16 (iter 47+). contentHash `d2fdafeaf093dd80` (3rd change since iter 34). Regression test: `scripts/audit_canon_master_sync.py` (57/57 PASS). |
| **Build hash vs contentHash (iter 44+)** | Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45) → `d2fdafeaf093dd80` (iter 46). |
| **CSP compliance (KI#16/#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **Callout class policy (iter 45+ invariant)** | Разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED canon (iter 35-38) + 41/57 master sync (iter 44+45+46)** | 57/57 в canon. 41/57 синхронизированы с master. 16 pending — KI#33 PARTIAL. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение (как plain `<p>`, не callout). См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
