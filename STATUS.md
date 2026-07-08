# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.1.0 + все 10 Parts + 4 Appendix + Part 0 (concept) ✅ MIGRATED + iter 34-42 (KI#1..#32 ✅ CLOSED) + **iter 43 — KI#33 🟡 NEW (canon→master HTML sync gap, deploy pipeline doc, build hash `69d9b813` unchanged)**
> **Дата:** 2026-07-08

---

## Текущее состояние

**iter 43 — DEPLOY PIPELINE DOC + KI#33 DISCOVERED.** Ответ на вопрос пользователя «Все завершено? Канон готов? А каким образом эти изменения перейдут в основной проект? На сайт?»:

1. **iter 42 COMPLETE** — commit `0d2534e` в `main`, build hash `69d9b813` unchanged. KI#32 ✅ CLOSED (doc-only: component-extracts drift audit + HISTORICAL SNAPSHOT notice).
2. **Канон ГОТОВ** — 4 070 строк, все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED (iter 18 + iter 38), 57/57 audit правок KI#21 ✅ CLOSED (iter 35-38), OCEAN labels consistent (iter 40-41), bible ↔ canon cross-ref symmetry (iter 41).
3. **КАК изменения переходят на сайт — описано в AGENT_NAVIGATION.md §2a «Deployment Pipeline»** (новая секция iter 43). Кратко: авторы правят `src/master/*.html` → `pnpm run build` генерирует `dist/` + root fallbacks → push в `main` → GitHub Actions деплоит `dist/` на GitHub Pages → https://vudirvp-sketch.github.io/live-char-guide/.
4. **🟡 KI#33 DISCOVERED — canon audit фиксы iter 35-41 НЕ синхронизированы с `src/master/*.html`.** 3 spot-checks подтвердили drift: KI#25, KI#29, KI#30, KI#31 fixes есть в `docs/canon/*.md`, но отсутствуют в `src/master/*.html`. Build hash `69d9b813` unchanged с iter 34 = master HTML не менялся 9 итераций. **Сайт НЕ отражает canon audit фиксы iter 35-41.** Подробности — § KI#33 ниже.

**iter 42 — COMPONENT-EXTRACTS DRIFT AUDIT ✅ COMPLETE (commit `0d2534e` в main).** KI#32 ✅ CLOSED doc-only. Pairwise diff audit выявил drift в 54 historical snapshot files (18/18 visual.html + 18/18 script.js + 2/18 styles.css). Файлы НЕ синхронизировались (high risk, low value — extracts не используются в build/runtime). `component-extracts/README.md` обновлён с HISTORICAL SNAPSHOT notice. 2 новых audit scripts. Build hash `69d9b813` unchanged.

**iter 34-41 — CSS/CSP + CANON AUDIT + DOC DRIFT FIX ✅ COMPLETE.** KI#22/#23/#24 (iter 34), KI#21 P0/P1/P2/P3 (iter 35-38, 57/57 правок), KI#25/#26/#27 (iter 39 doc drift), KI#28/#29 (iter 40 README + OCEAN), KI#30/#31 (iter 41 OCEAN leftover + cross-ref).

---

## Known Issues

| KI | Severity | Status | Iter |
|----|----------|--------|------|
| **KI#33 (canon→master HTML sync gap: iter 35-41 audit fixes не синхронизированы с `src/master/*.html`, 3 spot-checks подтвердили drift)** | **MEDIUM** — сайт не отражает canon audit фиксы iter 35-41 | 🟡 **NEW (iter 43)** — documented, fix deferred to iter 44+ | iter 43 |
| KI#32 (component-extracts/ drift: 18/18 visual.html + 2/18 styles.css + all script.js stale vs src/master + src/assets/vs-styles.css) | LOW — historical reference files, NOT used in build/runtime | ✅ CLOSED (doc-only) | iter 42 |
| KI#30 (OCEAN labeling leftover: part_07a L415 + part_10 L51) | LOW-MEDIUM | ✅ CLOSED (canon only — см. KI#33, master HTML не синхронизирован) | iter 41 |
| KI#31 (Part 10 §10.4 + Part 7A §7A.9 missing reverse cross-ref to bible) | LOW — cosmetic | ✅ CLOSED (canon only — см. KI#33, master HTML не синхронизирован) | iter 41 |
| KI#28 (README.md section counts stale) | LOW | ✅ CLOSED | iter 40 |
| KI#29 (OCEAN labeling: N=70 marked as «extreme» vs Part 5 §5.1 RULE) | LOW-MEDIUM | ✅ CLOSED (canon only — см. KI#33, master HTML не синхронизирован) | iter 40 |
| KI#25 (elena_character_bible.md OCEAN labels stale) | LOW | ✅ CLOSED (canon only — см. KI#33, master HTML не синхронизирован) | iter 39 |
| KI#26 (vyshcherblenny_character_bible.md stale world setting + GHOST Layers drift) | MEDIUM | ✅ CLOSED (bible only — не входит в build, не требует sync) | iter 39 |
| KI#27 (README.md stale Part 10 structure entry) | LOW | ✅ CLOSED | iter 39 |
| KI#21 (Content Audit contradictions) | MEDIUM-HIGH | ✅ **CLOSED** (57/57 — P0+P1+P2+P3, canon only — см. KI#33) | iter 33-38 |
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

### KI#33 — canon→master HTML sync gap (iter 35-41 audit fixes не синхронизированы) 🟡 NEW (iter 43)

**Симптом:** При ответе на вопрос пользователя «А каким образом эти изменения перейдут в основной проект? На сайт?» обнаружено: canon audit фиксы iter 35-41 находятся только в `docs/canon/*.md`, но НЕ синхронизированы с `src/master/*.html` (который реально деплоится на сайт через build → GitHub Pages). Build hash `69d9b813` unchanged с iter 34 (KI#23 fix) = master HTML не менялся 9 итераций.

**3 spot-checks подтвердили drift:**

| Fix | Canon location | Canon content (актуальный) | Master HTML location | Master HTML content (STALE) |
|-----|----------------|---------------------------|----------------------|-----------------------------|
| iter 39 KI#25 | `docs/canon/part_07a.md` L668 | «Экстремальных полюса: 1 (O=72 > 70). A=38 и N=68 — cautious zone (30-40 / 60-70)» | `src/master/part_07a.html` L1107 | «Экстремальных полюса: 3 (для 8K+ контекста — допустимо; для 4K оставьте только N=68 и A=38)» |
| iter 40 KI#29 | `docs/canon/part_10.md` L408 | «Экстремумы: Низкая E (<30, интроверт). Cautious zone: N=70 (граница 60–70, см. Part 5 §5.1 RULE)» | `src/master/part_10.html` L511 | «Экстремумы: Низкая E (интроверт), Высокая N (невротизм)» |
| iter 41 KI#30 | `docs/canon/part_10.md` L51 | «Экстремумы: Высокая O (>70, любопытство). Cautious zone: A=38 (30–40), N=68 (60–70)» | `src/master/part_10.html` L160 | «Экстремумы: Высокая O (любопытство), Низкая A (конфликтность), Высокая N (тревожность)» |
| iter 41 KI#30 | `docs/canon/part_07a.md` L416 | «Cross-ref: Moderate values (4K-fallback / pedagogical). For 16K+ canonical extreme values — see `docs/vyshcherblenny_character_bible.md` §OCEAN» | `src/master/part_07a.html` L728 | «Экстремумы: Низкая E (интроверт), Высокая N (невротизм)» (no cross-ref) |

**Причины gap:**
- `_README.md` §4 workflow описывает «Canon creation iter N → Master HTML migration iter N+1», но после первоначальной миграции (iter 18, все Parts ✅ MIGRATED) canon audit фиксы iter 35-41 НЕ сопровождались re-migration в master HTML.
- Build hash computation НЕ включает `docs/canon/*.md` (только `src/master/`, `src/shell/`, `src/assets/`, `data/`, `parts/` root fallbacks) — поэтому hash unchanged не сигнализировал о gap.
- Нет regression test, который бы сравнивал canon ↔ master HTML на semantic drift.

**Fix plan (iter 44+, deferred):**
1. Для каждого из 57 audit правок KI#21 + KI#25-31 fixes — проверить, есть ли соответствующая semantic правка в `src/master/*.html`. Многие fixes (YAML front-matter, callout labels) — canon-only metadata, не требуют sync. Content fixes (OCEAN labels, cross-refs, A1-A10, B1-B6, D1-D7) — требуют sync.
2. Применить sync правки в `src/master/*.html` (только content, не metadata).
3. После каждого Part — `pnpm run build` + `validate:master` + visual diff в браузере.
4. После полного sync — build hash изменится (впервые с iter 34). Зафиксировать новый baseline.
5. Добавить regression test `scripts/audit_canon_master_sync.py` (NEW) — сравнивает canon §X.Y semantic content vs master HTML `<section data-section>` content, flagging drift.

**НЕ в scope iter 43:** сам sync. iter 43 = только документирование gap + deploy pipeline explanation. Это large effort (57 fixes × verification × master edit × build test × visual diff per Part), лучше выполнять отдельной итерацией.

**Build hash `69d9b813` unchanged** — iter 43 doc-only (STATUS.md, AGENT_NAVIGATION.md, worklog.md, ITER42_README.md → ITER43_README.md).

### KI#32 — component-extracts/ drift ✅ CLOSED (iter 42, doc-only)

Pairwise diff audit выявил drift в 54 historical snapshot files (18/18 visual.html + 18/18 script.js + 2/18 styles.css) vs canonical source (`src/master/*.html`, `src/assets/vs-styles.css` SECTION 5, `src/shell/widgets/vs-*.js`). Файлы НЕ синхронизировались (high risk, low value — `component-extracts/` не используются в build/runtime). Fix: `component-extracts/README.md` переписан с HISTORICAL SNAPSHOT notice + canonical source pointers + drift table + regeneration instructions. 2 новых audit scripts: `scripts/audit_component_extracts.py` + `scripts/audit_component_extracts_css.py`.

### KI#28 — README.md section counts stale ✅ CLOSED (iter 40)

README L31-38: Part 1 5→7, Part 5 6→8, Part 7 16→18, Part 8 17→16. Сумма 98 секций ✓.

### KI#29-31 — OCEAN labeling + cross-ref fixes ✅ CLOSED (iter 40-41, canon only)

Label-only fixes в `docs/canon/part_07a.md` L415, `part_10.md` L51/L408, `appendix_character_map.md`. Values unchanged. Reverse cross-ref Note в part_10 §10.4 + part_07a §7A.9 → bible. **Внимание: master HTML не синхронизирован — см. KI#33.**

### KI#25-27 — Bible + README doc drift ✅ CLOSED (iter 39)

`elena_character_bible.md` OCEAN labels (A=38/N=68 → cautious zone), `vyshcherblenny_character_bible.md` (Setting → ТЕНЕБРИС, GHOST → Tier 1/2/3, OCEAN 3 → 4 extreme), `README.md` Part 10 structure (6 → 4 cards). v9.2.1.

### KI#21 — Content Audit contradictions ✅ CLOSED полностью (iter 35-38, canon only)

57/57 правок в 14 canon-файлах. Детали — в `docs/AUDIT_VERIFICATION.md` §4.1–§4.4. iter 38 P3 создал 2 новых canon-файла: `part_00.md`, `appendix_character_map.md`. Canon total: 4 070 строк. Build hash `69d9b813` unchanged. **Внимание: master HTML не синхронизирован — см. KI#33.**

---

## Invariants (iter 43+)

- **Canon → master HTML sync (iter 43+ invariant, НОВЫЙ):** `docs/canon/*.md` = source of truth для content. `src/master/*.html` = production HTML, деплоится на сайт. При canon fixes, требующих sync в master HTML — применяется workflow `docs/canon/_README.md` §4.2 (manual sync per Part + `validate:master` + visual diff). Build hash computation НЕ включает canon — unchanged hash НЕ гарантирует sync. Regression test planned: `scripts/audit_canon_master_sync.py` (iter 44+).
- VS scroll-animation: `python3 scripts/audit_vs_embeds.py` (0 regressions expected).
- Component extracts drift (iter 42+): `python3 scripts/audit_component_extracts.py` (18/18 visual.html — DRIFT expected) + `python3 scripts/audit_component_extracts_css.py` (16/18 styles.css — MATCH expected, E15/E18 known drift). Historical snapshots, NOT used in build/runtime.
- CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent.
- Принцип `viz > dry text` сохраняется.
- Build hash `69d9b813` — baseline. Canon-файлы + doc-файлы (`docs/*.md`, `*.md` в root) + `visual-system/integration/component-extracts/` НЕ входят в hash computation — только `src/master/`, `src/shell/`, `src/assets/`, `data/`, `parts/` root fallbacks. **Hash unchanged ≠ canon fixes deployed — см. KI#33.**
- Принцип «guide's role as example takes priority over character canon»: при рассинхроне bible vs canon Part 10 — правится bible, не Part 10.
- OCEAN labeling consistency (iter 40+, расширен iter 41): extreme = строго `<30` или `>70` per Part 5 §5.1 RULE; cautious zone = `30–40` / `60–70`. Label-only fixes допустимы для internal canon consistency — values примера не трогаются. **Все canon locations с OCEAN labels проверены (iter 41).** Master HTML sync pending — см. KI#33.
- Bible ↔ canon cross-ref symmetry (iter 41+): bible Note → Part 10 §10.4 + Part 7A §7A.9; reverse Cross-ref Note → bible. **Master HTML sync pending — см. KI#33.**
- При обнаружении новых противоречий в каноне — добавлять в `docs/AUDIT_VERIFICATION.md` §2 таблицу + sub-ID (A11, B7, etc.).
- При обнаружении новых багов — сначала документировать в `STATUS.md` §«Known Issues» как KI#N, потом фиксить.

---

## iter 44+ Roadmap (deferred from iter 43)

**MEDIUM priority (новое, iter 43 обнаружено):**

- **KI#33 fix — canon→master HTML sync (iter 44+).** 57 audit правок KI#21 + KI#25-31 fixes проверить на применимость к master HTML. Content fixes (OCEAN labels, cross-refs, A1-A10, B1-B6, D1-D7) — sync в `src/master/*.html`. Metadata fixes (YAML front-matter, callout labels) — skip. После каждого Part: `pnpm run build` + `validate:master` + visual diff. Regression test `scripts/audit_canon_master_sync.py` (NEW, planned). Build hash изменится (впервые с iter 34).

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
| **Canon → master HTML sync GAP (iter 43 discovered, KI#33)** | Canon audit фиксы iter 35-41 (57 правок KI#21 + KI#25-31) НЕ синхронизированы с `src/master/*.html`. Сайт НЕ отражает эти правки. Fix — iter 44+. |
| **CSP compliance (KI#16 CLOSED, KI#23 CLOSED)** | `qa:csp` PASS. Все scripts в `index.html` — external. `worker-src 'self' blob:;` для Mermaid v11 worker. |
| **Inline styles forbidden (KI#13 CLOSED)** | 123/123 inline `style=` → 60 external CSS classes (`vs-ki13-*`). |
| **VS elements registry (iter 25)** | 18 VS elements: E01–E18. Styles в `src/assets/vs-styles.css` SECTION 5. |
| **VS scroll-animation observer (KI#20 CLOSED)** | `vs-scroll-observer.js` наблюдает 11 animation classes. Audit: `scripts/audit_vs_embeds.py`. |
| **Callout taxonomy scope (KI#22 CLOSED)** | Документационные `.callout rule/rec/ex` (line 419) и E15 `.blueprint-area .callout*` (line 6278) — scoped, не конфликтуют. |
| **DGA COMPLETE (KI#18 CLOSED)** | 9/9 sub-items resolved. Принцип `viz > dry text`. |
| **Canon audit P0+P1+P2+P3 ✅ CLOSED (iter 35-38, canon only)** | 57/57 правок закрыты в canon. Master HTML sync pending — KI#33. |
| **Component-extracts drift audit ✅ CLOSED (iter 42)** | KI#32 ✅ CLOSED (doc-only). `component-extracts/README.md` HISTORICAL SNAPSHOT notice. Audit scripts: `scripts/audit_component_extracts*.py`. |
| **YAML front-matter (iter 37)** | Все canon-файлы (кроме `_README.md`) используют YAML front-matter. |
| **Callout labels English (iter 37+)** | Метки `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates`, `Annotation` — English semantic anchors. `Примечание` — Russian локальное уточнение. См. `docs/canon/_README.md` §3.9. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
