# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-46 + **iter 47 — KI#33 ✅ CLOSED (57/57 fixes applied cumulatively, contentHash `84d69ecf` 4th change since iter 34)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 47 — CANON→MASTER HTML SYNC (PHASE 4) ✅ COMPLETE.** Применены 4 audit fix IDs к `src/master/*.html` (P2-3, P2-7, P2-18, P3-2) + P0-11 sync completion. Кумулятивно **57/57 fixes** (iter 44: 9 + iter 45: 24 + iter 46: 8 + iter 47: 16 individual changes across 4 fix IDs). Затронуты 10 файлов: `part_01-10` + `part_07b`. contentHash в `build/build-manifest.json`: `d2fdafeaf093dd80` → `84d69ecffca28cbf` (4th change since iter 34). Shell hash `69d9b813` unchanged. Regression test `scripts/audit_canon_master_sync.py` расширен с 57 до **89 checks** (71 positive + 18 negative). **KI#33 ✅ CLOSED** — все content fixes синхронизированы, оставшиеся SKIPs (P2-2/4/5/6/8/10/11/15, P3-7/8/11, P1-8/9) — canon-only metadata, не имеют master equivalent.

**iter 34-46 — Phases 1-3 ✅ COMPLETE (41/57 fixes).** iter 44: 9 fixes (Phase 1) + iter 45: 24 fixes (Phase 2) + iter 46: 8 fixes (Phase 3). Canon audit ✅ CLOSED (iter 35-38).

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#33 (canon→master HTML sync gap)** | **MEDIUM** — сайт не отражал canon audit фиксы iter 35-41 | ✅ **CLOSED (iter 44+45+46+47: 57/57 fixes applied, 4 content fix IDs closed in iter 47)** | iter 43-47 |
| KI#32 (component-extracts/ drift: 54 historical snapshot files) | LOW — historical reference files, NOT used in build/runtime | ✅ CLOSED (doc-only) | iter 42 |
| KI#30 (OCEAN labeling leftover: part_07a L415 + part_10 L51) | LOW-MEDIUM | ✅ CLOSED (canon iter 41 + master iter 44) | iter 41+44 |
| KI#31 (Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to bible) | LOW — cosmetic | ✅ CLOSED (canon iter 41 + master iter 44) | iter 41+44 |
| KI#28 (README.md section counts stale) | LOW | ✅ CLOSED | iter 40 |
| KI#29 (OCEAN labeling: N=70 marked as «extreme») | LOW-MEDIUM | ✅ CLOSED (canon iter 40 + master iter 44) | iter 40+44 |
| KI#25 (elena_character_bible.md OCEAN labels stale) | LOW | ✅ CLOSED (canon iter 39 + master iter 44) | iter 39+44 |
| KI#26 (vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift) | MEDIUM | ✅ CLOSED (bible only — не входит в build) | iter 39 |
| KI#27 (README.md stale Part 10 structure entry) | LOW | ✅ CLOSED | iter 39 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ **CLOSED** canon (57/57 iter 35-38) + **57/57 master sync (iter 44+45+46+47)** | iter 33-38, 44-47 |
| KI#22 (Callout CSS Scoping Bug) | HIGH | ✅ CLOSED | iter 34 |
| KI#23 (CSP worker-src missing) | MEDIUM | ✅ CLOSED | iter 34 |
| KI#24 (FAB Glossary/TOC verification) | LOW | ✅ VERIFIED — no bug | iter 34 |
| KI#20 (Visual System Scroll-Animation Bug) | HIGH | ✅ CLOSED — 5/5 sub-items fixed | iter 32 |
| KI#18 (Deployed Guide Duplication Audit) | MEDIUM | ✅ CLOSED — 9/9 | iter 26-31 |
| KI#13 (inline styles → CSS) | MEDIUM | ✅ CLOSED (123/123) | iter 20-24 |
| KI#1..KI#12, KI#14..#19 | various | ✅ CLOSED | iter 1-7 |

### KI#33 — canon→master HTML sync gap ✅ CLOSED (iter 44+45+46+47: 57/57 fixes applied)

**Симптом:** canon audit фиксы iter 35-41 находятся в `docs/canon/*.md`, но НЕ синхронизированы с `src/master/*.html` (деплоится на сайт).

**iter 47 PROGRESS (4 content fix IDs closed + P0-11 sync completion):**

| # | Fix ID | File(s) | Description | Status |
|---|--------|---------|-------------|--------|
| 1 | P2-3 (C5) | `part_01, 02, 03, 04, 05, 07a, 08.html` | 7 bridge-paragraphs удалены; 2 keeps (`part_06` с добавлением `bridge-paragraph` CSS class, `part_09`) | ✅ iter 47 |
| 2 | P2-7 (E4) | `part_01-10, part_07b.html` | 11 part-resume секций удалены; 4 Synthesis paragraphs добавлены в `part_01, 04, 07a, 08` | ✅ iter 47 |
| 3 | P2-18 (F10) | `part_10.html` §10.1 | 4 inline `<!-- ↑ ... -->` annotations удалены; Annotation callout с 6 пунктами добавлен после карточки Елены | ✅ iter 47 |
| 4 | P3-2 (D5) | `part_10.html` (4 cards) | 4 `Demonstrates:` callouts добавлены перед карточками (Елена, Уолтер, Омнис-Зета, Выщербленный) | ✅ iter 47 |
| 5 | P0-11 (A9) sync completion | `part_09.html` §9.11 | «4 уровня качества» → «4 зоны качества» (iter 44 применил fix только к resume, iter 47 sync completion — к основному тексту) | ✅ iter 47 |

**iter 47 verification:** regression test `scripts/audit_canon_master_sync.py` — **89/89 checks PASS** (71 positive + 18 negative). contentHash `d2fdafea` → `84d69ecf` (4th change since iter 34). All validation gates PASS.

**iter 44-46 PROGRESS (41 fixes applied):** iter 44 (9 fixes) + iter 45 (24 fixes) + iter 46 (8 fixes). См. ниже «Предыдущие итерации (кратко)».

**SKIP (canon-only, no master equivalent):** P2-2 (callout labels policy), P2-4 (YAML front-matter), P2-5 (Migration Notes), P2-6 (`[ref: ...]` notation), P2-8 (orphan §1.3 — already absent), P2-10 (клише «деликатно»), P2-11 (22 stubs «Canon planned»), P2-15 (`<br/>` → em-dash — canon-only), P1-8/9 (secondary/variant LIE rows — already absent), P3-7 (covered by P0-2), P3-8/11 (part_00/appendix_character_map — no master equivalent).

---

## Invariants (iter 47+)

- **Canon → master HTML sync (iter 43+ invariant, iter 47 ✅ COMPLETE 57/57):** `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. iter 44+45+46+47: 57/57 fixes применены. Regression test: `python3 scripts/audit_canon_master_sync.py` (89/89 PASS — 71 positive + 18 negative).
- **Build hash vs contentHash (iter 44+):** Shell hash `69d9b813` (в `build.hash`) = SHA-256 of `src/shell/index.html` ONLY. contentHash (в `build/build-manifest.json`) = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` (iter 34-43) → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45) → `d2fdafeaf093dd80` (iter 46) → `84d69ecffca28cbf` (iter 47). **Shell hash unchanged ≠ master HTML unchanged.**
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

## iter 48+ Roadmap (KI#33 ✅ CLOSED — minor задачи remain)

**LOW priority (deferred):**

- **General-purpose drift detector** — расширить `scripts/audit_canon_master_sync.py` до сравнения canon §X.Y vs master HTML `<section data-section>` semantic content. Текущий regression test — focused substring checks. General-purpose detector требует semantic parsing.
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
| **Canon → master HTML sync (iter 47 ✅ COMPLETE 57/57, KI#33 ✅ CLOSED)** | 57/57 fixes синхронизированы с `src/master/*.html`. contentHash `84d69ecffca28cbf` (4th change since iter 34). Regression test: `scripts/audit_canon_master_sync.py` (89/89 PASS). |
| **Build hash vs contentHash (iter 44+)** | Shell hash `69d9b813` = SHA-256 of `src/shell/index.html` ONLY. contentHash = SHA-256 of combined `src/master/*.html`: `58f4daa85c05e070` → `34c34a7d9839c11d` (iter 44) → `665cede798c34fc0` (iter 45) → `d2fdafeaf093dd80` (iter 46) → `84d69ecffca28cbf` (iter 47). |
| **CSP compliance (KI#16/#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **Callout class policy (iter 45+ invariant)** | Разрешены `.callout.rule/.rec/.ex` и plain `.callout`. Запрещены `.callout.note/.info/.warn/.tip/.box/.sidebar/.custom/.important` (см. `scripts/validate-master.mjs` L452-463). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED canon (iter 35-38) + 57/57 master sync (iter 44+45+46+47)** | 57/57 в canon + 57/57 синхронизированы с master. KI#21 ✅ CLOSED, KI#33 ✅ CLOSED. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение (как plain `<p>`, не callout). См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
