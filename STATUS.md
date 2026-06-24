# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts + 3 Appendix ✅ MIGRATED (iter 18)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 18 COMPLETE.** Final cleanup: визуальная проверка Part 5+6 (no regression), infographic+mermaid audit (0 mermaid, 3 infographic retained как unique), созданы 3 Appendix Canon (`appendix_mbti.md` 74 + `appendix_model_table.md` 63 + `appendix_glossary.md` 230 строк = 367 строк, 3 секции), cleanup `content_map.md` (277 → 256, mirror Canon) + `terminology_dictionary.md` (338 → 206, dedup). `validate:master`/`build`/`validate`/`test:unit`/`lint` PASS. **Все 10 Parts + 3 Appendix — Canon COMPLETE.**

### Что сделано в iter 18

| # | Задача | Результат |
|---|--------|-----------|
| a | Visual check Part 5+6 (pre-iter 18 regression) | Static validation: 8/6 sections balanced, 2/1 VS-EMBEDs well-formed, no orphan infographics/mermaid, HTTP 200 OK. No regression. |
| b | Infographic + mermaid audit | 0 mermaid в master HTML. 3 infographic retained (2 part_04: SPINE→Anchors mnemonic + Assembly pipeline; 1 part_07b: Greeting algorithm) + 1 part_05 static SVG fallback (ocean-static, accessibility fallback для E09). Все unique visualizations, iter 8/16 retention confirmed. Deletions не требуются. |
| c | Appendix Canon creation | `docs/canon/appendix_mbti.md` (74 строки, 1 секция) + `appendix_model_table.md` (63 строки, 1 секция) + `appendix_glossary.md` (230 строк, 27 entries) созданы. Master HTML уже минимален, Canon = mirror. |
| d | `docs/content_map.md` cleanup | 277 → 256 строк (-8%). Добавлен Canon § column для каждого concept. Обновлены Appendix rows (3 новых). Summary table расширена с iter + status columns. |
| e | `docs/terminology_dictionary.md` cleanup | 338 → 206 строк (-39%). Deduplicated tables, merged «Запрещённые переводы» into §1, removed stale v9.0 history, consolidated MBTI/Enneagram/OCEAN references. |

### Изменённые файлы в iter 18

| File | Action | Reason |
|------|--------|--------|
| `docs/canon/appendix_mbti.md` | Created | Canon Appendix A (74 строки, 1 секция). |
| `docs/canon/appendix_model_table.md` | Created | Canon Appendix B (63 строки, 1 секция). |
| `docs/canon/appendix_glossary.md` | Created | Canon Appendix C (230 строк, 27 entries). |
| `docs/content_map.md` | Rewritten | Mirror Canon (277 → 256 строк). |
| `docs/terminology_dictionary.md` | Rewritten | Cleanup + dedup (338 → 206 строк). |
| `docs/canon/_README.md` | Updated | §5 Appendix rows → ✅ iter 18. §9 iter 18 entry + history compressed. |
| `STATUS.md` | Rewritten | iter 18 status. |
| `worklog.md` | Updated | iter 18 record. |
| `AGENT_NAVIGATION.md` | Updated | Header iter 16 → iter 18. §8 iter 18 record + iter 19+ roadmap. |
| `CHANGELOG.md` | Updated | [9.1.18] entry. |
| `PLAN.md` | Updated | §5 iter 18 → ✅ DONE, iter 19+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 18 row → ✅ DONE. §8 iter 18 stop point + iter 19 priorities. |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 123 inline `style=` + 1 "content outside section" warning в master HTML. Defer до iter 19+.

**KI#14 (CLOSED, iter 16)** — Content duplication VS-EMBED ↔ текст. **ВСЕ 10 PARTS ✅ MIGRATED** (iter 7–16). Canon migration complete.

**KI#16 (ACTIVE, MEDIUM, found iter 9)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fix plan (iter 19+).

**KI#17 (ACTIVE, LOW, found iter 10)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity.

**Fix plan (iter 19+):** KI#13 (inline styles) + KI#16 (qa:csp inline scripts) + Phase 4 actual SVG integration. См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated root fallbacks. Не редактировать напрямую. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canonical Guide Spec (iter 7–18) — COMPLETE** | Part 1 ✅ iter 14. Part 2 ✅ iter 14. Part 3 ✅ iter 14. Part 4 ✅ iter 7–9. Part 5 ✅ iter 16. Part 6 ✅ iter 16. Part 7A ✅ iter 10–11. Part 7B ✅ iter 16. Part 8 ✅ iter 12. Part 9 ✅ iter 13. Part 10 ✅ iter 16. Appendix A/B/C ✅ iter 18. |
| **Migration principle: viz > dry text (iter 8)** | Визуализация = замещение, dry-дублирующий текст удаляется. Применяется «очень деликатно». |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
