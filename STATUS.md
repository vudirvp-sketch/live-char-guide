# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + все 10 Parts ✅ MIGRATED (iter 16)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 16 COMPLETE.** Canon Part 5+6+7B+10 созданы (`docs/canon/part_05.md` 285 строк + `part_06.md` 247 строк + `part_07b.md` 309 строк + `part_10.md` 593 строк, всего 1434 строки, 23 H2 секций, 4 VS-маркера E09+E10+E11+E15) + 4 master HTML мигрированы end-to-end за один iter (`part_05.html` 619 → 615 строк -0.6%, `part_06.html` 261 → 259 строк -0.8%, `part_07b.html` 371 → 371 строк 0%, `part_10.html` 666 → 666 строк 0%). 3 «Сжать» кандидата обработано (#18 orphan paragraph duplicates p5_elena_profile RULE, #19 orphan paragraph duplicates p5_enneagram_basics intro, #20 p6_cot_basics duplicate definition of CoT). `pnpm run validate:master` ✅ PASS (0 errors, baseline warnings, no regression). KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE. **Все 10 Parts мигрированы — Canon complete.**

### Что сделано в iter 16

**Canon creation + migrate Part 5+6+7B+10 (Psychology, CoT, Lorebook, Examples) — end-to-end за один iter (по образцу iter 12/13/14).**

- **Canon `docs/canon/part_05.md` создан:** 285 строк, 8 H2 секций (p5_ocean_basics, p5_elena_profile, p5_ocean_warning, p5_enneagram_basics, p5_mbti_ref, p5_cross_instrument_map, p5_enneagram_wings, p5_cross_matrix), 2 VS-маркера E09+E10 в preamble. Front-matter `Migration status: ✅ MIGRATED (iter 16)`. Migration Notes таблица (13 элементов: 11 «Оставить» + 2 «Сжать» кандидата #18, #19).
- **Canon `docs/canon/part_06.md` создан:** 247 строк, 6 H2 секций (p6_cot_bridge, p6_cot_basics, p6_cot_tiers, p6_cot_tier2, p6_cot_tier3, p6_cot_anchors), 1 VS-маркер E11 в preamble. Front-matter `Migration status: ✅ MIGRATED (iter 16)`. Migration Notes таблица (7 элементов: 6 «Оставить» + 1 «Сжать» кандидат #20).
- **Canon `docs/canon/part_07b.md` создан:** 309 строк, 5 H2 секций (p7b_structured_inject, p7b_greeting, p7b_lorebook_basics, p7b_lorebook_mechanics, p7b_lorebook_advanced), 0 VS-маркеров (Part 7B использует inline infographic + widgets). Front-matter `Migration status: ✅ MIGRATED (iter 16)`. Migration Notes таблица (5 элементов: все «Оставить», 0 «Сжать» — контент плотный, дубликатов не найдено).
- **Canon `docs/canon/part_10.md` создан:** 593 строки, 4 H2 секции (p10_elena, p10_walter, p10_omnis, p10_vysherblenny), 1 VS-маркер E15 в preamble. Front-matter `Migration status: ✅ MIGRATED (iter 16)`. Migration Notes таблица (5 элементов: все «Оставить», 0 «Сжать» — все 4 карточки уникальные TEMPLATEs).
- **#18 Сжать:** Orphan paragraph «У Елены три экстремальных полюса...» (lines 303 в part_05.html, между `</section>` и `<section>`, вне любого `<section data-section>`). Дублировал RULE callout внутри p5_elena_profile (тот же вывод про 3 экстремума). Удалён полностью (-2 строки).
- **#19 Сжать:** Orphan paragraph «OCEAN показывает «сколько»...» (lines 331 в part_05.html, между `</section>` и `<!-- VS-EMBED: E10 -->`, вне любого `<section data-section>`). Дублировал p5_enneagram_basics intro (тот же тезис «OCEAN = сколько, Enneagram = почему»). Удалён полностью (-2 строки).
- **#20 Сжать:** `p6_cot_basics` L96 `<p>CoT добавляет карточке пошаговые рассуждения...</p>` — дублировал `p6_cot_bridge` L81 definition («CoT (цепочка рассуждений) — механизм пошаговых рассуждений...»). KI#14 principle — одно canonical location для определения концепта. Удалён полностью (-2 строки). L98 сохранён (уникальный Model Note).
- **Part 7B (0% compression):** контент плотный, infographic «Алгоритм Greeting» = visualization of algorithm, example ниже = concrete application (complement, не duplicate). 5 секций содержат уникальный контент: Structured Inject technique, Greeting algorithm + 4 rules + Elena example, Lorebook basics + 3 Elena examples (пожар/Марина/город) + EVENT compatibility table, 3 mechanics + practice table + Structured Inject in content example, 3 advanced mechanics + 2 critical RULE callouts + integration checklist.
- **Part 10 (0% compression):** контент плотный, все 4 карточки — уникальные TEMPLATEs. Елена (~440/900 токенов), Уолтер (~890), Омнис-Зета (~1800, GHOST Layers + CoT + Lorebook), Выщербленный (~1250+, GHOST Layers + Enneagram 5w4 + CoT + Sensory Anchors + Author's Note + Lorebook + SPINE consistency check).
- **Validation gates:** `validate:master` ✅ (0 errors, baseline warnings, no regression), `build` ✅ (hash df283246, same as iter 8–14), `validate` ✅ (8/8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 10 pre-existing warnings), `qa:bundle` ✅, `qa:doc-versions` ✅.

### Изменённые файлы в iter 16

| File | Action | Reason |
|------|--------|--------|
| `docs/canon/part_05.md` | Created | Canon Part 5 (285 строк, 8 секций, 2 VS-маркера E09+E10). |
| `docs/canon/part_06.md` | Created | Canon Part 6 (247 строк, 6 секций, 1 VS-маркер E11). |
| `docs/canon/part_07b.md` | Created | Canon Part 7B (309 строк, 5 секций, 0 VS-маркеров). |
| `docs/canon/part_10.md` | Created | Canon Part 10 (593 строки, 4 секции, 1 VS-маркер E15). |
| `src/master/part_05.html` | Edited | 619 → 615 строк. 2 compression candidates applied (#18, #19 — orphan paragraphs removed). |
| `src/master/part_06.html` | Edited | 261 → 259 строк. 1 compression candidate applied (#20 — duplicate CoT definition removed). |
| `src/master/part_07b.html` | Not edited | 371 → 371 строк. 0 compression candidates — контент плотный. |
| `src/master/part_10.html` | Not edited | 666 → 666 строк. 0 compression candidates — все 4 карточки уникальные TEMPLATEs. |
| `parts/part_05.html`, `parts/part_06.html`, `parts/part_07b.html`, `parts/part_10.html` | Regenerated | Root fallbacks, regenerated by `pnpm run build`. |
| `docs/canon/_README.md` | Updated | §5 Part 5+6+7B+10 rows → ✅ iter 16. §9 iter 16 entry. |
| `STATUS.md` | Rewritten | iter 16 status. |
| `worklog.md` | Updated | iter 14 → one-liner, iter 16 = этот record. |
| `AGENT_NAVIGATION.md` | Updated | Header iter 14 → iter 16. §8 iter 16 record + iter 18+ roadmap. |
| `CHANGELOG.md` | Updated | [9.1.16] entry. |
| `PLAN.md` | Updated | §5 iter 16 → ✅ DONE, iter 18+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 16 row → ✅ DONE. §8 iter 16 stop point + iter 18 priorities. |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 123 inline `style=` + 1 "content outside section" warning в master HTML. Defer до post-Canon миграции (iter 19+). **Canon migration complete в iter 16 — KI#13 fix можно планировать.**

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6)** — Content duplication VS-EMBED ↔ текст. **ВСЕ 10 PARTS ✅ MIGRATED** (iter 7–16). Part 1+2+3 ✅ iter 14. Part 4 ✅ iter 8–9. Part 5+6+7B+10 ✅ iter 16. Part 7A ✅ iter 11. Part 8 ✅ iter 12. Part 9 ✅ iter 13. Canon migration complete.

**KI#16 (ACTIVE, MEDIUM, found iter 9)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fix plan (iter 19+).

**KI#17 (ACTIVE, LOW, found iter 10)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity.

**Fix plan (iter 17..19+):** iter 17 (reserved — не нужен, iter 16 покрыл все Parts) → iter 18 (final cleanup — устаревшие infographic + mermaid → 0, content_map sync с Canon, Appendix Canon) → iter 19+ (KI#13 + KI#16 + Phase 4 SVG integration). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

---

**История KI (все CLOSED):** KI#1..KI#12 (iter 1–5), KI#15 (iter 6–7). См. CHANGELOG.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` — regenerated root fallbacks. Не редактировать напрямую. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Canonical Guide Spec (iter 7–16) — COMPLETE** | Part 1 ✅ DONE (iter 14). Part 2 ✅ DONE (iter 14). Part 3 ✅ DONE (iter 14). Part 4 ✅ DONE (iter 7–9). Part 5 ✅ DONE (iter 16). Part 6 ✅ DONE (iter 16). Part 7A ✅ DONE (iter 10–11). Part 7B ✅ DONE (iter 16). Part 8 ✅ DONE (iter 12). Part 9 ✅ DONE (iter 13). Part 10 ✅ DONE (iter 16). Appendix MBTI/Model Table/Glossary — iter 18 (planned). |
| **Migration principle: viz > dry text (iter 8)** | Визуализация = замещение, dry-дублирующий текст удаляется. Применяется «очень деликатно». |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
