# Worklog

> Только последняя итерация подробно. Старые — одной строкой. Полная история — в git.

---

Task ID: 2
Agent: main
Task: iter 2 — Known Issues cleanup. Закрыть KI#1..KI#6 из iter 1 STATUS.md. Без правок кода/UI/тестов — только docs + удаление stale duplicate. Если найден новый баг — сначала документируй в STATUS.md, потом фиксий.

Work Log:
- 1: Контекст загружен из STATUS.md (6 Known Issues из iter 1), worklog.md (iter 1 record), AGENT_NAVIGATION.md (entry doc), PLAN.md (roadmap). Репозиторий live-char-guide клонирован с GitHub.
- 2: Прочитан `src/scripts/build-shell-unified.mjs` целиком (319 строк) для определения canonical paths. Ключевая находка:
  - `ASSETS_SRC = join(SRC_DIR, 'assets')` → canonical assets = `src/assets/`, НЕ `src/shell/assets/`.
  - Строки 237-293: root-level `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — это **regenerated root fallbacks** (build script сам их перезаписывает через `rm` + `copyDir`).
  - `.gitignore` строки 22-30 EXPLICITLY говорит "DO NOT gitignore: index.html, assets/, widgets/, parts/, event-bus.js, data/, build.hash".
- 3: Сравнение файлов (`diff -q`):
  - Top-level `widgets/*.js` vs `src/shell/widgets/*.js` — все 10 файлов IDENTICAL (no drift).
  - Top-level `event-bus.js` vs `src/shell/event-bus.js` — IDENTICAL.
  - Top-level `assets/vs-styles.css` vs `src/assets/vs-styles.css` vs `src/shell/assets/vs-styles.css` — все 3 IDENTICAL.
  - Top-level `assets/lazy-loader.js` vs `src/shell/lazy-loader.js` — IDENTICAL.
  - Top-level `assets/shell-styles.css` vs `src/shell/styles.css` — IDENTICAL.
- 4: Grep по `shell/assets` во всём repo (excluding .git): найдено только в iter 1 docs (AGENT_NAVIGATION, STATUS, worklog). Никакой код, тесты, CI workflows не ссылаются на `src/shell/assets/`. Подтверждено: `src/shell/assets/vs-styles.css` — orphan stale duplicate.
- 5: Прочитан `.github/workflows/deploy-pages.yml` — CI/CD деплоит из `dist/` (строка 94: `path: dist`). Root fallbacks НЕ нужны для CI/CD, но обеспечивают работу без CI/CD (per .gitignore comment).
- 6: **KI#1 — CLOSED "won't fix — by design".** Первоначальный диагноз iter 1 был неверным: `parts/` — это intentional root fallback, не gitignored by design. Не добавлен в .gitignore. Решение задокументировано в STATUS.md, AGENT_NAVIGATION.md (§1, pitfall #18), worklog.md.
- 7: **KI#2 — CLOSED.** Удалён `src/shell/assets/` (только `vs-styles.css`, IDENTICAL canonical'у в `src/assets/`, не читается build script). Top-level `widgets/`, `assets/`, `event-bus.js` — НЕ дубликаты, оставлены как root fallbacks. Задокументировано в STATUS.md, AGENT_NAVIGATION.md.
- 8: **KI#3 — CLOSED.** Добавлены 2 секции в `CHANGELOG.md`:
  - `[9.1.0]` — полный перечень FIX-01..FIX-31 по фазам (Phase 1: FIX-01..03, Phase 2: FIX-04..10 + FIX-28..29, Phase 3+4: FIX-11..19, Phase 5+6: FIX-20..31).
  - `[9.1.2]` — iter 2 changelog (KI resolution summary).
- 9: **KI#4 — CLOSED (deleted).** Прочитан `docs/user_journeys.md` (462 строки). Найдены устаревшие CORE DIRECTIVES (pre-v8 naming: BEHAVIORAL ANCHORING, VOICE ISOLATION, FORMAT LOCK, PRE-GEN FILTER — не соответствуют актуальным SHOW NEVER TELL, EMBODIMENT FIRST, SPATIAL & ANATOMICAL LOCK, PRE-GENERATION FILTER). Part 7 не разделён на 7A/7B (v9.0.0 change). Решено удалить (полная актуализация = большой объём, core linear-journey concept уже в AGENT_NAVIGATION.md §3 + architecture.md Section Model).
- 10: **KI#5 — CLOSED.** В `CONTRIBUTING.md` секция "Make Changes":
  - `src/parts/` → `src/master/`.
  - `src/assets/` для client-side scripts → `src/shell/` для client-side shell + `src/assets/` для static assets.
  - Добавлены `data/` для widget data и `src/scripts/` + `scripts/` для build logic.
  - Добавлена пометка: "top-level `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — generated root fallbacks, do NOT edit directly".
- 11: **KI#6 — CLOSED.** В `docs/architecture.md`:
  - Полностью удалена секция "v7 → v8 Migration (Archived)" (строки 331-351 + заголовок).
  - Заменена compact Version History таблицей (v9.1.x / v9.0.0 / v8.0.0 / v7 / v6 / v5.12 — по одной строке на версию).
  - В Directory Structure убраны stale-ссылки на `migration_map.md` и `transition_guide.md` (оба удалены в iter 1).
- 12: Обновлён `STATUS.md`:
  - Header: "iter 1" → "iter 2".
  - "Текущее состояние" — переписано: iter 2 закрыл все 6 KI, подробно описано каждое решение.
  - "Known Issues" — все 6 KI закрыты, новых нет.
  - "Подтверждённые ограничения" — добавлена первая строка про root fallbacks.
- 13: Обновлён `AGENT_NAVIGATION.md`:
  - Header: "iter 1" → "iter 2".
  - §1 "Where Things Are": убраны вводящие в заблуждение строки про `parts/` ("Gitignored в норме, но в repo сейчас лежит") и `widgets/`/`assets/`/`event-bus.js` ("Дубль"). Заменены одной строкой про root fallbacks. Добавлена `src/assets/` (canonical).
  - §6 pitfall #18: переписан с "Дублирующие папки виджетов/assets" на "Root fallbacks vs canonical sources" с пояснением дизайна.
  - §7 "Documentation Map": секция "Удалено в iter 1" → "Удалено в iter 1+2" с добавлением user_journeys.md и src/shell/assets/.
  - §8 "Open Proposals": OP-1 обновлён (iter 1+2 завершены, iter 3+ roadmap), OP-2 и OP-3 помечены [CLOSED iter 2] с пояснением решения.
  - Подсказка следующему агенту: "перед стартом iter 2" → "перед стартом iter 3".
- 14: iter 1 record в worklog.md сокращён до одной строки в секции "Предыдущие итерации" (per worklog convention: только последняя итерация подробно).
- 15: Верификация изменений:
  - Все 6 KI из iter 1 закрыты, решений задокументированы в STATUS.md / AGENT_NAVIGATION.md / CHANGELOG.md.
  - Удалено 5 stale элементов: `docs/user_journeys.md`, `docs/transition_guide.md`, `docs/ap_reference_inventory.md`, `DELETIONS-iter1.txt`, `src/shell/assets/`.
  - Изменено 7 файлов: CONTRIBUTING.md, CHANGELOG.md, docs/architecture.md, STATUS.md, worklog.md, AGENT_NAVIGATION.md, PLAN.md.
  - Без правок кода/UI/тестов/shell — только docs + cleanup.
- 16: **НОВЫЙ БАГ KI#7 (найден при верификации, документирован перед фиксом):** `git show --stat c6a58c8` показал, что iter 1 commit message CLAIMED удаление `migration_map.md`, `transition_guide.md`, `ap_reference_inventory.md`, но фактически файлы остались в repo. Причина: возможно, iter 1 agent подготовил архив с удалениями, но при `git add -A` + `git commit` удаления не были зафиксированы (возможно, файлы были восстановлены из .git или индекс не обновился). Iter 2 фикс: проверены кодовые зависимости (grep по `transition_guide|ap_reference_inventory` в коде — пусто), удалены `docs/transition_guide.md` (179 строк) и `docs/ap_reference_inventory.md` (179 строк). `migration_map.md` оставлен — см. KI#8.
- 17: **НОВЫЙ БАГ KI#8 (найден при анализе KI#7):** `scripts/validate-migration.mjs` парсит `docs/migration_map.md` (строка 36: `MIGRATION_MAP_PATH`). Без файла скрипт падает. `scripts/gen-redirect-map.mjs` тоже читает migration_map.md, но имеет fallback (строка 139: `console.log('⚠️ migration_map.md not found, using default redirects')`). Оба скрипта **orphan** — не вызываются из package.json (`pnpm run validate` вызывает только `validate-artifact.mjs`), не в pre-commit hook (`pnpm run lint && pnpm run build && pnpm run validate`), не в CI workflows. Решение отложено в iter 3 — варианты: (a) удалить оба orphan-скрипта + migration_map.md (предпочтительно — миграция v5.12→v6 уже не актуальна), либо (b) wire `validate-migration.mjs` в package.json и обновить под v9. Зафиксировано в STATUS.md KI#8, AGENT_NAVIGATION.md §7 "NOT удалено".
- 18: Дополнительно удалён `DELETIONS-iter1.txt` (stale iter 1 cleanup instruction file из poe2-regex-ru конвенции — больше не нужен после iter 2). iter 1 docs обновлены: AGENT_NAVIGATION.md §7 "Удалено в iter 1+2" — таблица переписана с указанием реальных iter'ов удаления (transition_guide и ap_reference_inventory перенесены из iter 1 → iter 2 с пометкой KI#7). CHANGELOG.md [9.1.2] секция — добавлены KI#7, KI#8, обновлён список Removed.
- 19: Финальная верификация:
  - `git status --short` показывает: 7 modified, 5 deleted (docs/user_journeys.md, docs/transition_guide.md, docs/ap_reference_inventory.md, DELETIONS-iter1.txt, src/shell/assets/vs-styles.css).
  - `docs/` теперь содержит: architecture.md, character_bible.md, components.md, content_map.md, cross_reference_sync.md, elena_character_bible.md, migration_map.md (kept for KI#8), terminology_dictionary.md, vyshcherblenny_character_bible.md, anchor-redirects.json. — 9 файлов + 1 JSON (было 12 + 1).
  - `src/shell/` теперь содержит: event-bus.js, index.html, lazy-loader.js, styles.css, widgets/. — без `assets/`.
  - Все 6 KI из iter 1 закрыты. 2 новых KI (KI#7, KI#8) документированы.

Stage Summary:
- **iter 2 COMPLETE.** Все 6 Known Issues из iter 1 закрыты. 2 новых KI (KI#7, KI#8) обнаружены и документированы в процессе. В двух случаях (KI#1, KI#2) первоначальный диагноз iter 1 был пересмотрен после анализа `build-shell-unified.mjs`: оказалось, что root-level `parts/`, `widgets/`, `assets/`, `event-bus.js`, `data/` — это **intentional root fallbacks** для GitHub Pages (regenerated на каждом билде), а не дубликаты.
- **Изменённые файлы (7):**
  - `CONTRIBUTING.md` — KI#5: src/parts/ → src/master/ + root fallbacks note.
  - `CHANGELOG.md` — KI#3: added [9.1.0] (FIX-01..31) + [9.1.2] (iter 2) sections.
  - `docs/architecture.md` — KI#6: removed v7→v8 archived section, fixed stale refs.
  - `STATUS.md` — iter 2 status + KI resolution (KI#1-8).
  - `worklog.md` — this iter 2 record (iter 1 → one-liner).
  - `AGENT_NAVIGATION.md` — clarified root fallback design (§1, §6 #18, §7, §8).
  - `PLAN.md` — marked iter 2 progress.
- **Удалённые файлы (5):**
  - `docs/user_journeys.md` (462 строки) — KI#4: Draft с устаревшим v8 контентом.
  - `docs/transition_guide.md` (179 строк) — KI#7: iter 1 заявлял, но не удалил.
  - `docs/ap_reference_inventory.md` (179 строк) — KI#7: iter 1 заявлял, но не удалил.
  - `DELETIONS-iter1.txt` — stale iter 1 cleanup instruction file.
  - `src/shell/assets/` (1 файл: `vs-styles.css`, 3317 строк) — KI#2: stale duplicate.
- **НЕ сделано (перенос в iter 3+):**
  1. **KI#8** — решить судьбу `scripts/validate-migration.mjs` + `gen-redirect-map.mjs` + `docs/migration_map.md` (orphan scripts). Варианты: удалить оба + migration_map.md, либо wire в package.json.
  2. Перенести pitfalls из FIX-N коммитов в `AGENT_NAVIGATION.md` §6 (расширить с 18 до ~30 пунктов).
  3. Review `docs/content_map.md` / `docs/terminology_dictionary.md` на устаревшие строки после v9.1.
  4. Объединить `docs/character_bible.md` + персональные bible'ы (Elena + Vysherblenny) — экономия ~300 строк.
  5. Слить `docs/cross_reference_sync.md` в `AGENT_NAVIGATION.md` (compact).
  6. Audit `visual-system/PLAN.md` (integration phase status, v1.4 от 2026-05-16).
  7. Audit AGENT_NAVIGATION.md §1 — список scripts/ в `scripts/` содержит несколько orphan скриптов (csp_check.mjs, bundle_check.mjs, contrast_checker.mjs, check_duplicates.py, validate_terms.py, check_english.py, check_syntax_mix.py), которые не wired в package.json. Уточнить, какие реально запускаются.
- **Точка остановки:** iter 2 done. All 6 KI from iter 1 closed. 2 new KI (KI#7, KI#8) discovered and documented. Без правок кода/UI/тестов/shell. В iter 3 можно:
  1. Решить KI#8 (orphan scripts + migration_map.md).
  2. Расширить pitfalls (18 → ~30) — собрать из git log FIX-01..31 commit messages.
  3. Review content_map / terminology_dictionary на v9.1 актуальность.
  4. Объединить character_bible'ы.
  5. Слить cross_reference_sync в AGENT_NAVIGATION.
  6. Audit visual-system/PLAN.md.
  7. Audit AGENT_NAVIGATION §1 scripts/ list (orphan scripts).
- **Подсказка следующему агенту:** iter 2 = Known Issues cleanup + 2 новых KI (KI#7 iter 1 commit discrepancy, KI#8 orphan scripts + migration_map.md). Перед стартом iter 3 прочитай STATUS.md (KI#1-7 closed, KI#8 active), worklog.md (этот iter 2 record), AGENT_NAVIGATION.md (entry doc, §6 pitfalls — основа для расширения в iter 3, §7 — список удалённых и NOT удалённых файлов), PLAN.md (roadmap iter 3+). Изменённые файлы в iter 2: 7 docs. Удалённые файлы: 5 (2 docs + DELETIONS-iter1.txt + 1 dir with 1 file + 1 doc). Код/тесты/UI/shell — без изменений. Если найден новый баг — сначала документируй в STATUS.md как Known Issue, потом фиксий.

---

## Предыдущие итерации (кратко)

- **iter 1 (2026-06-23)**: docs restructure по образцу `poe2-regex-ru`. Созданы AGENT_NAVIGATION / STATUS / worklog / PLAN. Удалены 3 устаревших docs (migration_map, transition_guide, ap_reference_inventory — суммарно ~944 строки). Обновлены README / CHANGELOG / architecture. Идентифицированы 6 Known Issues (KI#1..KI#6) — все закрыты в iter 2. См. git log `c6a58c8`.
- **v9.1.0 (2026-05-16)**: FIX-01..FIX-31 — executeInlineScripts module/return, persona-cross infinite loop, Clipboard API guard, dual assembly pipeline, token budget misplacement, CORE DIRECTIVES numbering conflict, content duplication ~25-30%, visual system elements repair, Mermaid.js integration, TOC translation, dead SPINE-validator removal, SVG CSS variables fix, inline styles → CSS migration, blueprint-viewer destroy(), CSP script-src cleanup, noscript in build artifact, heading hierarchy, code quality, destroy(), accessibility fixes. См. git log `0816ff1`..`2f57e8b`. Полный перечень по фазам — в CHANGELOG.md [9.1.0].
- **v9.0.0 (2026-05-15)**: Restructured (split Part 7 → 7A/7B, moved MBTI to Appendix A, moved AP-15 to Part 5 as Warning, renumbered AP-16 → AP-15). Deduplicated (canonical locations, trimmed non-canonical refs, consolidated MODEL_NOTE tags). Unified (terminology standardization, all 7 CORE DIRECTIVES, 3 callout types: RULE/RECOMMENDATION/EXAMPLE). Examples (Elena primary, Vysherblenny secondary, Йоуёма tertiary; Character Bibles). Navigation (cross-refs reduced ~50%, 3 ref types, transitional bridges, concept relationship diagram, TOC). Added Appendix A/B/C, CHANGELOG.md, character bibles, ap_reference_inventory. Fixed orphan references, glossary sync.
- **v8.0.0 (2026-05-14)**: Unified single-pass architecture — eliminated L1/L2/L3 layer system. All content visible to all readers. Section IDs without `_l2`/`_l3` suffixes. Widget activation always visible (no `data-layer` gating). SPINE unified (GHOST→LIE→FLAW→NEED→WANT). CORE DIRECTIVES unified (all 7). AP-15 merged. Quickstart deleted. Cross-refs backward-only. "Основы/Дополнительно" tables deleted.
- **v7 (pre-2026-05-14)**: Layered system (L1/L2/L3) with `data-layer` attributes. Layer extraction via `build-layers.mjs`. Section IDs with `_l2`/`_l3` suffixes. Widget visibility gated by `data-layer` on `<body>`.
- **v6 (pre-2026-04-27)**: Migration from v5.12. See git history (migration_map.md was deleted in iter 1).
- **v5.12 (pre-v6)**: Initial layered structure. See git history.
