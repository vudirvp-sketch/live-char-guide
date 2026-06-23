# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + Part 4 ✅ + Part 7A ✅ + Part 8 ✅ migrated (iter 12)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 12 COMPLETE.** Canon Part 8 создан (`docs/canon/part_08.md`, 411 строк, 16 H2 секций, 1 VS-маркер для E12) + master HTML мигрирован (`src/master/part_08.html`, 521 → 507 строк, -2.7%). 2 «Сжать» кандидата обработаны (#3 intro paragraph merge, #21 AP-9 Elena SPINE check → cross-ref Part 4). `pnpm run validate:master` ✅ PASS (0 errors, 123 warnings = KI#13 baseline). KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE.

### Что сделано в iter 12

**Canon creation + migrate Part 8 (anti-patterns) — end-to-end за один iter.**

- **Canon `docs/canon/part_08.md` создан:** 411 строк, 16 H2 секций (по одной на каждый `data-section`), 1 VS-маркер для E12, front-matter `Migration status: ✅ MIGRATED (iter 12)`, Migration Notes таблица (31 элемент: 29 «Оставить» + 2 «Сжать»).
- **#3 Сжать:** Overview intro paragraph #2 («**Анти-паттерн** — распространённая ошибка...») — объединён с intro #1 в один параграф. Дублировал определение «анти-паттерн».
- **#21 Сжать:** AP-9 «Пример: Елена — проверка SPINE» `<pre><code>` блок (13 строк) — удалён, заменён на 1-строчный cross-ref на Part 4 §4.9 (canonical location Elena SPINE check).
- **29 «Оставить» элементов** — без изменений. VS-EMBED E12, summary table (16 rows), все diff examples (AP-1/AP-3/AP-12/AP-15), все RULE callouts, все cross-refs, все anti-pattern pairs сохранены.
- **Validation gates:** `validate:master` ✅ (0 errors, 123 warnings = KI#13 baseline), `build` ✅ (hash df283246), `validate` ✅ (8/8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors).

### Изменённые файлы в iter 12

| File | Action | Reason |
|------|--------|--------|
| `docs/canon/part_08.md` | Created | Canon Part 8 (411 строк, 16 секций, 1 VS-маркер). |
| `src/master/part_08.html` | Edited | 521 → 507 строк. 2 compression candidates applied (#3, #21). |
| `docs/canon/_README.md` | Updated | §5 Part 8 row → ✅ iter 12. §9 iter 12 entry. |
| `STATUS.md` | Rewritten | iter 12 status. |
| `worklog.md` | Updated | iter 11 → one-liner, iter 12 = этот record. |
| `AGENT_NAVIGATION.md` | Updated | Header iter 11 → iter 12. §8 iter 12 record. |
| `CHANGELOG.md` | Updated | [9.1.12] entry. |
| `PLAN.md` | Updated | §5 iter 12 → ✅ DONE, iter 13+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 12 row → ✅ DONE. §8 iter 12 stop point + iter 13 priorities. |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 123 inline `style=` + 1 "content outside section" warning в master HTML. Defer до post-Canon миграции (iter 19+).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6)** — Content duplication VS-EMBED ↔ текст. Part 4 ✅ мигрирован + валидирован (iter 8–9). Part 7A ✅ мигрирован (iter 11). Part 8 ✅ мигрирован (iter 12). Остальные Parts в очереди (iter 13..17).

**KI#16 (ACTIVE, MEDIUM, found iter 9)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fix plan (iter 19+).

**KI#17 (ACTIVE, LOW, found iter 10)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity.

**Fix plan (iter 13..19):** iter 13 (Canon + migrate Part 9) → iter 14–15 (Canon + migrate Part 1, 2, 3) → iter 16–17 (Canon + migrate Part 5, 6, 7B, 10) → iter 18 (final cleanup) → iter 19+ (KI#13 + KI#16 + Phase 4 SVG integration). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

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
| **Canonical Guide Spec (iter 7–12)** | Part 4 ✅ DONE (iter 7–9). Part 7A ✅ DONE (iter 10–11). Part 8 ✅ DONE (iter 12). Остальные Parts — iter 13+. |
| **Migration principle: viz > dry text (iter 8)** | Визуализация = замещение, dry-дублирующий текст удаляется. Применяется «очень деликатно». |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
