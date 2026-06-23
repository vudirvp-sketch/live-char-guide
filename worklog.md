# Worklog

> Только последняя итерация подробно. Старые — одной строкой. Полная история — в git.

---

Task ID: 3
Agent: main
Task: iter 3 — orphan scripts cleanup + pitfalls expansion. Закрыть KI#8 (orphan migration-validation trio) из iter 2, обнаружить новые баги (если есть), расширить §6 pitfalls с 18 до ~30, уточнить §1 scripts/ list, review docs/terminology_dictionary.md и visual-system/PLAN.md. Без правок кода/UI/тестов/shell — только docs + удаление orphan scripts. Если найден новый баг — сначала документируй в STATUS.md, потом фиксий.

Work Log:
- 1: Контекст загружен из STATUS.md (iter 2 record: 6 KI закрыты, KI#8 deferred to iter 3), worklog.md (iter 2 record), AGENT_NAVIGATION.md (entry doc, §6 pitfalls 18 шт, §7 deletion list), PLAN.md (roadmap iter 3+). Репозиторий live-char-guide клонирован с GitHub (commit `f97057d` = iter 2 HEAD).
- 2: Прочитан `package.json` — wired scripts: `build:unified`, `build:shell`, `build`, `validate` (validate-artifact.mjs), `validate:master` (validate-master.mjs), `version:check` (version-sync.mjs), `test`, `precommit`. Никаких `csp_check` / `bundle_check` / `contrast_checker` / `check_english` / `check_syntax_mix` / `check-doc-versions` / `test-interactive` / `validate-migration` / `gen-redirect-map` в package.json нет.
- 3: Прочитаны CI workflows (`.github/workflows/{validate,build-artifact,deploy-pages}.yml`). Найдено: `check_duplicates.py` + `validate_terms.py` — wired в `validate.yml` + `build-artifact.yml` (continue-on-error для PR). Остальные скрипты — orphan.
- 4: Прочитан `scripts/validate-migration.mjs` (888 строк, v2.0.0) — header говорит "v7→v8 migration", но body парсит v5.12→v6 mappings из `docs/migration_map.md` (строка 36 `MIGRATION_MAP_PATH`). Внутренняя несогласованность + 4 major версии назад при v9.1.0.
- 5: Прочитан `scripts/gen-redirect-map.mjs` (257 строк, v1.0.0) — генерирует `data/anchor-redirects.json` + `build/anchor-redirects.json` из `migration_map.md`. Имеет fallback `DEFAULT_REDIRECTS` (строка 39-131) если migration_map.md не существует.
- 6: Прочитан `src/shell/lazy-loader.js` строки 1-90 — `data/anchor-redirects.json` загружается в runtime через `fetch('data/anchor-redirects.json')` (строка 70). Hardcoded fallback `ANCHOR_REDIRECTS_FALLBACK` (строки 51-62) — работает без JSON. Подтверждено: `data/anchor-redirects.json` — REQUIRED runtime data, generation script + source markdown — НЕ required.
- 7: Grep по tests/ — нет упоминаний `migration|validate-migration|gen-redirect`. Tests не зависят от orphan scripts.
- 8: Прочитан `docs/migration_map.md` (586 строк) — v5.12→v6 migration guide. Зависит только от 2 orphan scripts.
- 9: **Решение KI#8 — Option (a): delete orphan trio.** Удалены: `scripts/validate-migration.mjs` (888 строк), `scripts/gen-redirect-map.mjs` (257 строк), `docs/migration_map.md` (586 строк). Total: 1731 строк удалено. KEEP: `data/anchor-redirects.json` (runtime data). Все 3 файла сохранятся в git history.
- 10: **НОВЫЙ БАГ KI#9 (найден при git show --stat f97057d):** iter 2 commit создал `DELETIONS-iter2.txt` (13 строк, cleanup-instruction file). Это противоречит iter 2 worklog: "Удалён `DELETIONS-iter1.txt` (stale cleanup instruction file, больше не нужен после iter 2)". Если iter 1 cleanup file признан stale — iter 2 cleanup file тоже stale. Зафиксировано в STATUS.md как KI#9, затем удалён `DELETIONS-iter2.txt`.
- 11: Прочитан `docs/content_map.md` (277 строк) — актуален для v9.1.0 (Last Updated 2026-05-16). Stale entries не найдены.
- 12: Прочитан `docs/terminology_dictionary.md` (338 строк) — найдена stale reference: line 122 `See \`p7_core_directives\`` — должно быть `p7a_core_directives` (Part 7 split в v9.0 в 7A/7B). Header version 9.0.0 (Phase 1.1, 2026-03-04) — устарел. Пофикшено: version → 9.1.0, date → 2026-06-23, ref → `p7a_core_directives` (Part 7A, split в v9.0).
- 13: Прочитан `docs/cross_reference_sync.md` (62 строки) — компактный, актуален для v9.1.0. Решено НЕ сливать в AGENT_NAVIGATION (LOW priority, текущее состояние OK). Defer в iter 4+.
- 14: Прочитан `visual-system/PLAN.md` (1460 строк, v1.4 от 2026-05-16). Найдены 2 устаревшие рекомендации:
  - Appendix E §2 "Content duplication" — рекомендует clean up root fallbacks. Противоречит iter 2 KI#1/KI#2 (root fallbacks — by design).
  - Appendix F §2 "Recommended Follow-up Actions" §2 "Clean up root fallback files" — рекомендует gitignore root-level index.html/assets/widgets/parts/data/event-bus.js. Противоречит `.gitignore` строки 22-30 "DO NOT gitignore".
  Решение: добавить `[OBSOLETE per iter 2 KI#1/KI#2]` пометки без переписывания файла (сохранить исторический контекст).
- 15: Прочитан `CHANGELOG.md` — iter 1 [9.1.1] секция всё ещё содержит "Removed: docs/migration_map.md (586 строк)". Это историческая запись — iter 1 commit message CLAIMED удаление, но фактически не удалил (KI#7 в iter 2). История сохранена как есть — iter 2 [9.1.2] уже документирует расхождение.
- 16: AGENT_NAVIGATION.md обновлён через MultiEdit (5 правок):
  - Header: "iter 2" → "iter 3".
  - §1 `scripts/` row переписана: классификация (package.json-wired 5 / CI-wired 2 Python / orphan QA tools 5+ KEEP / removed in iter 3 2).
  - §6 pitfalls расширены с 18 до 30: добавлены подзаголовки "Базовые (iter 1-2)" и "Расширение из FIX-N коммитов (iter 3)". Новые пункты 19-30: dual assembly pipeline (FIX-04), token budget misplacement (FIX-05), CORE DIRECTIVES numbering (FIX-06), content duplication (FIX-07), dead SPINE-validator (FIX-09), SVG CSS vars (FIX-10), WCAG contrast (FIX-11..19), responsive/aria/E07 (FIX-11..19), Mermaid CDN (FIX-25+26), code quality (FIX-27), final a11y (FIX-31), orphan scripts audit (meta-pitfall).
  - §7 "Удалено в iter 1+2" → "Удалено в iter 1+2+3" — добавлены 4 строки (DELETIONS-iter2.txt, validate-migration.mjs, gen-redirect-map.mjs, migration_map.md). "NOT удалено" секция → "KEEP (runtime data)" с одной строкой про data/anchor-redirects.json.
  - §8 OP-1 — добавлен iter 3 параграф, iter 4+ roadmap обновлён (character_bibles merge, cross_reference_sync merge, wire orphan QA scripts, audit Phase 4 integration).
  - Hint: "перед стартом iter 3" → "перед стартом iter 4".
- 17: STATUS.md переписан полностью: header iter 2 → iter 3. "Текущее состояние" — iter 3 описание. "Изменённые файлы в iter 3" — таблица из 11 строк (6 updated + 4 deleted + 1 STATUS.md self). "Known Issues" — все 9 KI закрыты, активных нет. "Подтверждённые ограничения" — добавлена последняя строка про orphan QA scripts not wired.
- 18: CHANGELOG.md — добавлена [9.1.3] секция в начало: Fixed (KI#8, KI#9, terminology_dictionary, visual-system/PLAN.md), Added (pitfalls 18→30, scripts classification), Removed (4 файла), Notes.
- 19: worklog.md — этот iter 3 record. Iter 2 record сокращён до one-liner в секции "Предыдущие итерации".
- 20: PLAN.md §5 — обновлены iter 3 статус (KI#8/KI#9 закрыты) + iter 4+ remaining.
- 21: Финальная верификация:
  - `git status --short` показывает: 6 modified (STATUS, worklog, AGENT_NAVIGATION, CHANGELOG, PLAN, terminology_dictionary, visual-system/PLAN) + 4 deleted (DELETIONS-iter2.txt, validate-migration.mjs, gen-redirect-map.mjs, migration_map.md).
  - `docs/` теперь содержит: architecture.md, character_bible.md, components.md, content_map.md, cross_reference_sync.md, elena_character_bible.md, terminology_dictionary.md, vyshcherblenny_character_bible.md, anchor-redirects.json — 8 файлов + 1 JSON (было 9 + 1 в iter 2).
  - `scripts/` теперь содержит: build-unified.mjs, validate-artifact.mjs, validate-master.mjs, version-sync.mjs, csp_check.mjs, bundle_check.mjs, contrast_checker.mjs, check_duplicates.py, validate_terms.py, check_english.py, check_syntax_mix.py, check-doc-versions.mjs, test-interactive.mjs — 13 файлов (было 15 в iter 2, удалены 2 orphan).
  - Все 9 KI (KI#1..KI#9) закрыты. Активных Known Issues нет.

Stage Summary:
- **iter 3 COMPLETE.** KI#8 закрыт (orphan migration-validation trio удалён, 1731 строк). KI#9 закрыт (stale `DELETIONS-iter2.txt` удалён). §6 pitfalls расширены с 18 до 30. §1 scripts/ list классифицирован. `terminology_dictionary.md` пофикшен (stale ref). `visual-system/PLAN.md` устаревшие рекомендации помечены [OBSOLETE].
- **Изменённые файлы (7):**
  - `STATUS.md` — iter 3 status + KI#8/KI#9 resolution.
  - `worklog.md` — this iter 3 record (iter 2 → one-liner).
  - `AGENT_NAVIGATION.md` — header iter 3, §1 scripts classification, §6 pitfalls 18→30, §7 deletions iter 3, §8 OP-1 progress, hint iter 4.
  - `CHANGELOG.md` — added [9.1.3] (iter 3) section.
  - `PLAN.md` — §5 iter 3 status + iter 4+ remaining.
  - `docs/terminology_dictionary.md` — stale `p7_core_directives` → `p7a_core_directives`; version 9.0.0 → 9.1.0.
  - `visual-system/PLAN.md` — Appendix E §2 + F §2 marked [OBSOLETE per iter 2 KI#1/KI#2].
- **Удалённые файлы (4):**
  - `DELETIONS-iter2.txt` (13 строк) — KI#9: stale cleanup-instruction file.
  - `scripts/validate-migration.mjs` (888 строк) — KI#8: orphan, v5.12→v6 migration validator.
  - `scripts/gen-redirect-map.mjs` (257 строк) — KI#8: orphan, redirect map generator.
  - `docs/migration_map.md` (586 строк) — KI#8: only depended on by 2 orphan scripts above.
- **НЕ сделано (перенос в iter 4+):**
  1. Объединить `docs/character_bible.md` + персональные bible'ы (Elena + Vysherblenny) — экономия ~300 строк. LOW priority, требует тщательного чтения 3 больших файлов.
  2. Слить `docs/cross_reference_sync.md` в `AGENT_NAVIGATION.md` (compact). LOW priority, текущее состояние OK.
  3. Wire orphan QA scripts в `package.json` (csp_check, bundle_check, contrast_checker, check_english, check_syntax_mix, check-doc-versions, test-interactive). Infrastructure decision — нужно решить, какие реально нужны в CI/pre-commit.
  4. Audit `visual-system/PLAN.md` Phase 4 (integration) — фактически ли E01-E17 уже интегрированы в `src/master/part_*.html`? Интеграция может быть уже завершена (см. `visual-system/integration/component-extracts/`).
- **Точка остановки:** iter 3 done. KI#8 и KI#9 закрыты. §6 pitfalls 18→30. §1 scripts classification. Все 9 KI закрыты, активных Known Issues нет. Без правок кода/UI/тестов/shell — только docs + удаление orphan scripts. В iter 4 можно: (1) merge character_bibles, (2) merge cross_reference_sync в AGENT_NAVIGATION, (3) wire orphan QA scripts, (4) audit Phase 4 integration.
- **Подсказка следующему агенту:** iter 3 = orphan scripts cleanup + pitfalls expansion. Перед стартом iter 4 прочитай STATUS.md (все 9 KI закрыты, активных KI нет), worklog.md (этот iter 3 record), AGENT_NAVIGATION.md (entry doc, §6 pitfalls 30 шт — основа для будущего расширения, §7 — список удалённых в iter 1+2+3 и KEEP файлов, §8 — iter 4+ roadmap), PLAN.md (§5 iter 4+ remaining). Изменённые файлы в iter 3: 7 docs. Удалённые файлы: 4 (DELETIONS-iter2.txt + 2 orphan scripts + migration_map.md). Код/тесты/UI/shell — без изменений. Если найден новый баг — сначала документируй в STATUS.md как Known Issue, потом фиксий.

---

## Предыдущие итерации (кратко)

- **iter 2 (2026-06-23)**: Known Issues cleanup. Закрыты все 6 KI из iter 1. Удалены user_journeys.md, transition_guide.md, ap_reference_inventory.md, DELETIONS-iter1.txt, src/shell/assets/. Обнаружены KI#7 (закрыт) + KI#8 (deferred to iter 3). См. git log `f97057d`.
- **iter 1 (2026-06-23)**: docs restructure по образцу `poe2-regex-ru`. Созданы AGENT_NAVIGATION / STATUS / worklog / PLAN. Удалены 3 устаревших docs (фактически только заявлено — см. KI#7). Обновлены README / CHANGELOG / architecture. Идентифицированы 6 Known Issues (KI#1..KI#6) — все закрыты в iter 2. См. git log `c6a58c8`.
- **v9.1.0 (2026-05-16)**: FIX-01..FIX-31 — executeInlineScripts module/return, persona-cross infinite loop, Clipboard API guard, dual assembly pipeline, token budget misplacement, CORE DIRECTIVES numbering conflict, content duplication ~25-30%, visual system elements repair, Mermaid.js integration, TOC translation, dead SPINE-validator removal, SVG CSS variables fix, inline styles → CSS migration, blueprint-viewer destroy(), CSP script-src cleanup, noscript in build artifact, heading hierarchy, code quality, destroy(), accessibility fixes. См. git log `0816ff1`..`2f57e8b`. Полный перечень по фазам — в CHANGELOG.md [9.1.0].
- **v9.0.0 (2026-05-15)**: Restructured (split Part 7 → 7A/7B, moved MBTI to Appendix A, moved AP-15 to Part 5 as Warning, renumbered AP-16 → AP-15). Deduplicated (canonical locations, trimmed non-canonical refs, consolidated MODEL_NOTE tags). Unified (terminology standardization, all 7 CORE DIRECTIVES, 3 callout types: RULE/RECOMMENDATION/EXAMPLE). Examples (Elena primary, Vysherblenny secondary, Йоуёма tertiary; Character Bibles). Navigation (cross-refs reduced ~50%, 3 ref types, transitional bridges, concept relationship diagram, TOC). Added Appendix A/B/C, CHANGELOG.md, character bibles, ap_reference_inventory. Fixed orphan references, glossary sync.
- **v8.0.0 (2026-05-14)**: Unified single-pass architecture — eliminated L1/L2/L3 layer system. All content visible to all readers. Section IDs without `_l2`/`_l3` suffixes. Widget activation always visible (no `data-layer` gating). SPINE unified (GHOST→LIE→FLAW→NEED→WANT). CORE DIRECTIVES unified (all 7). AP-15 merged. Quickstart deleted. Cross-refs backward-only. "Основы/Дополнительно" tables deleted.
- **v7 (pre-2026-05-14)**: Layered system (L1/L2/L3) with `data-layer` attributes. Layer extraction via `build-layers.mjs`. Section IDs with `_l2`/`_l3` suffixes. Widget visibility gated by `data-layer` on `<body>`.
- **v6 (pre-2026-04-27)**: Migration from v5.12. See git history.
- **v5.12 (pre-v6)**: Initial layered structure. See git history.
