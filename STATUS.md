# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + Part 1 ✅ + Part 2 ✅ + Part 3 ✅ + Part 4 ✅ + Part 7A ✅ + Part 8 ✅ + Part 9 ✅ migrated (iter 14)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 14 COMPLETE.** Canon Part 1+2+3 созданы (`docs/canon/part_01.md` 186 строк + `part_02.md` 238 строк + `part_03.md` 315 строк, всего 739 строк, 21 H2 секций, 4 VS-маркера E01+E03+E04+E07) + 3 master HTML мигрированы end-to-end за один iter (`part_01.html` 390 → 365 строк -6.4%, `part_02.html` 443 → 415 строк -6.3%, `part_03.html` 452 → 452 строк 0%). 4 «Сжать» кандидата обработано (#14 mermaid → auto-TOC duplicate, #15 infographic T→A→P → duplicate of E03, #16 plain-copy T→A→P → duplicate of E03, #17 infographic Embodiment → duplicate of E04). `pnpm run validate:master` ✅ PASS (0 errors, baseline warnings, no regression). KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE.

### Что сделано в iter 14

**Canon creation + migrate Part 1+2+3 (Foundations, Anchors, Voice) — end-to-end за один iter (по образцу iter 12/13).**

- **Canon `docs/canon/part_01.md` создан:** 186 строк, 7 H2 секций (p1_value_proposition, p1_card_overview, p1_structure_overview, p1_core_rules, p1_token_budget_ref, p1_pipeline_ref, p1_top3_problems), 1 VS-маркер E01 в preamble. Front-matter `Migration status: ✅ MIGRATED (iter 14)`. Migration Notes таблица (10 элементов: 9 «Оставить» + 1 «Сжать» кандидат #14).
- **Canon `docs/canon/part_02.md` создан:** 238 строк, 6 H2 секций (p2_basic_anchors, p2_anchor_rules, p2_anchor_examples, p2_embodiment, p2_env_reactivity, p2_sensory_anchors), 2 VS-маркера E03+E04 в preamble. Front-matter `Migration status: ✅ MIGRATED (iter 14)`. Migration Notes таблица (20 элементов: 17 «Оставить» + 3 «Сжать» кандидата #15, #16, #17).
- **Canon `docs/canon/part_03.md` создан:** 315 строк, 8 H2 секций (p3_voice_isolation, p3_influence_hierarchy, p3_examples_rules, p3_examples_quality, p3_greeting_ref, p3_voice_leak, p3_joker_case, p3_multi_char), 1 VS-маркер E07 в preamble. Front-matter `Migration status: ✅ MIGRATED (iter 14)`. Migration Notes таблица (9 элементов: все «Оставить», 0 «Сжать» — контент плотный, дубликатов не найдено).
- **#14 Сжать:** `p1_structure_overview` `<div class="mermaid">` dependency graph (25 строк + intro paragraph «Диаграмма ниже показывает…»). Дублировал auto-TOC (placeholder `AUTO_TOC_PLACEHOLDER` ниже по файлу). Mermaid + intro paragraph удалены (-25 строк); auto-TOC остаётся единственным навигационным артефактом. Снижает «2 mermaid blocks» из плана iter 6 до «1 mermaid block» (оставшийся в part_04).
- **#15 Сжать:** `p2_basic_anchors` `<div class="infographic">` «Формат Anchors: Trigger → Action → Price» (3-step `inf-pipeline-vertical`, 23 строки). Дублировал VS-EMBED E03 (T→A→P split-view) выше по файлу. Удалён полностью; заменён на компактную 3-row table (TRIGGER/ACTION/PRICE + описание + пример).
- **#16 Сжать:** `p2_basic_anchors` `<pre class="plain-copy">` «Формат Anchors: Trigger → Action → Price» (text duplicate, 4 строки). Был текстовым fallback для infographic #15 для accessibility. После удаления infographic — fallback тоже не нужен. Удалён полностью.
- **#17 Сжать:** `p2_embodiment` `<div class="infographic">` «Embodiment Protocol (протокол телесности)» (4-step `inf-pipeline`, 29 строк). Дублировал VS-EMBED E04 (funnel-stack 4 layers State→Body→Sensor→Speech) выше по файлу. Удалён полностью; заменён на компактную 4-row table.
- **Part 3 (0% compression):** контент плотный, все секции содержат уникальный контент (5 таблиц, 4 RULE callouts, 2 RECOMMENDATION/EXAMPLE callouts, 2 diff-view, 2 ILLUSTRATION `<pre><code>` blocks, 1 TEMPLATE pre). `<pre class="plain-copy">` блоки (2 шт.) — accessibility-fallback для diff-view визуализаций (не для VS-EMBED), сохранены.
- **Validation gates:** `validate:master` ✅ (0 errors, baseline warnings, no regression), `build` ✅ (hash df283246, same as iter 8–13), `validate` ✅ (8/8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors, 10 pre-existing warnings), `qa:bundle` ✅, `qa:doc-versions` ✅.

### Изменённые файлы в iter 14

| File | Action | Reason |
|------|--------|--------|
| `docs/canon/part_01.md` | Created | Canon Part 1 (186 строк, 7 секций, 1 VS-маркер E01). |
| `docs/canon/part_02.md` | Created | Canon Part 2 (238 строк, 6 секций, 2 VS-маркера E03+E04). |
| `docs/canon/part_03.md` | Created | Canon Part 3 (315 строк, 8 секций, 1 VS-маркер E07). |
| `src/master/part_01.html` | Edited | 390 → 365 строк. 1 compression candidate applied (#14 mermaid → auto-TOC duplicate). |
| `src/master/part_02.html` | Edited | 443 → 415 строк. 3 compression candidates applied (#15, #16, #17 — 2 infographic + 1 plain-copy удалены как дубликаты VS-EMBED E03/E04). |
| `src/master/part_03.html` | Not edited | 452 → 452 строк. 0 compression candidates — контент плотный. |
| `parts/part_01.html`, `parts/part_02.html`, `parts/part_03.html` | Regenerated | Root fallbacks, regenerated by `pnpm run build`. |
| `docs/canon/_README.md` | Updated | §5 Part 1+2+3 rows → ✅ iter 14. §9 iter 14 entry. |
| `STATUS.md` | Rewritten | iter 14 status. |
| `worklog.md` | Updated | iter 13 → one-liner, iter 14 = этот record. |
| `AGENT_NAVIGATION.md` | Updated | Header iter 13 → iter 14. §8 iter 14 record + iter 15+ roadmap. |
| `CHANGELOG.md` | Updated | [9.1.14] entry. |
| `PLAN.md` | Updated | §5 iter 14 → ✅ DONE, iter 15+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 14 row → ✅ DONE. §8 iter 14 stop point + iter 16 priorities. |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 123 inline `style=` + 1 "content outside section" warning в master HTML. Defer до post-Canon миграции (iter 19+).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6)** — Content duplication VS-EMBED ↔ текст. Part 1 ✅ мигрирован (iter 14). Part 2 ✅ мигрирован (iter 14). Part 3 ✅ мигрирован (iter 14). Part 4 ✅ мигрирован (iter 8–9). Part 7A ✅ мигрирован (iter 11). Part 8 ✅ мигрирован (iter 12). Part 9 ✅ мигрирован (iter 13). Остальные Parts (5, 6, 7B, 10) в очереди (iter 16–17).

**KI#16 (ACTIVE, MEDIUM, found iter 9)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fix plan (iter 19+).

**KI#17 (ACTIVE, LOW, found iter 10)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity.

**Fix plan (iter 15..19):** iter 15 (reserved — не нужен) → iter 16 (Canon + migrate Part 5, 6, 7B, 10) → iter 17 (migrate Part 5, 6, 7B, 10 если не помещаются в iter 16) → iter 18 (final cleanup) → iter 19+ (KI#13 + KI#16 + Phase 4 SVG integration). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

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
| **Canonical Guide Spec (iter 7–14)** | Part 1 ✅ DONE (iter 14). Part 2 ✅ DONE (iter 14). Part 3 ✅ DONE (iter 14). Part 4 ✅ DONE (iter 7–9). Part 7A ✅ DONE (iter 10–11). Part 8 ✅ DONE (iter 12). Part 9 ✅ DONE (iter 13). Остальные Parts (5, 6, 7B, 10) — iter 16+. |
| **Migration principle: viz > dry text (iter 8)** | Визуализация = замещение, dry-дублирующий текст удаляется. Применяется «очень деликатно». |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
