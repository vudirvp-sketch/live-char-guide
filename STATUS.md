# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + Part 4 ✅ migrated+validated + Part 7A ✅ migrated (iter 11)
> **Дата:** 2026-06-24

---

## Текущее состояние

**iter 11 COMPLETE.** Part 7A master HTML мигрирован против Canon §7A (`src/master/part_07a.html`, 1168 → 1137 строк, -2.7%). 4 «Сжать» кандидата обработаны (#22 sampling table, #26 model checklist, #42 plain-copy, #46 CORE DIRECTIVES walkthrough). `pnpm run validate:master` ✅ PASS (0 errors, KI#13 baseline). KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE.

### Что сделано в iter 11

**Migrate Part 7A master HTML против Canon §7A.**

- **#22 Сжать:** Базовые параметры sampling table (p7a_sampling_params) → заменён на notes-only `<ul>` список + cross-ref на E17. Дублировал VS-EMBED E17.
- **#26 Сжать:** Чеклист по типу модели table (p7a_model_checklist) → заменён на bullet-list ключевых distinctions + cross-ref на E17. Дублировал VS-EMBED E17 checklist-section.
- **#42 Сжать:** Plain-copy `<pre class="plain-copy">` пример расчёта Token Budget → удалён. Дублировал `<noscript>` fallback.
- **#46 Сжать:** CORE DIRECTIVES пример в walkthrough Елены → заменён на 1-строчный cross-ref `→ CORE DIRECTIVES (выше)`. Дублировал template в §7A.2.
- **50 «Оставить» элементов** — без изменений. Все RULE/RECOMMENDATION callouts, все templates, все уникальные таблицы, все anti-pattern pairs, все примеры Елены/Выщербленного сохранены.
- **Validation gates:** `validate:master` ✅ (0 errors), `build` ✅ (hash df283246), `validate` ✅ (8/8 gates), `test:unit` ✅ (43/43), `lint` ✅ (0 errors).
- **Canon front-matter** обновлён: `Migration status: ✅ MIGRATED (iter 11)`, `Last synced: 2026-06-24 (iter 11)`, строка обновлена 1168 → 1137.
- **Migration Notes таблица** обновлена: все 54 элемента → DONE.

### Изменённые файлы в iter 11

| File | Action | Reason |
|------|--------|--------|
| `src/master/part_07a.html` | Edited | 1168 → 1137 строк. 4 compression candidates applied. |
| `docs/canon/part_07a.md` | Updated | Front-matter MIGRATED, Migration Notes → DONE, Validation gates → PASSED. |
| `docs/canon/_README.md` | Updated | §5 Part 7A row → ✅ iter 11 (Migrated). |
| `STATUS.md` | Rewritten | iter 11 status. |
| `worklog.md` | Updated | iter 10 → one-liner, iter 11 = этот record. |
| `AGENT_NAVIGATION.md` | Updated | Header iter 10 → iter 11. §8 iter 10 compressed, iter 11 record. |
| `CHANGELOG.md` | Updated | [9.1.11] entry. |
| `PLAN.md` | Updated | §5 iter 11 → ✅ DONE, iter 12+ roadmap. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated | §5.2 iter 11 row → ✅ DONE. §8 iter 11 stop point + iter 12 priorities. |

---

## Known Issues

**KI#13 (ACTIVE, MEDIUM, found iter 5)** — 123 inline `style=` + 22 "content outside section" warnings в master HTML. Defer до post-Canon миграции (iter 19+).

**KI#14 (ACTIVE, MEDIUM-HIGH, found iter 6)** — Content duplication VS-EMBED ↔ текст. Part 4 ✅ мигрирован + валидирован (iter 8–9). Part 7A ✅ мигрирован (iter 11). Остальные Parts в очереди (iter 12..17).

**KI#16 (ACTIVE, MEDIUM, found iter 9)** — `pnpm run qa:csp` FAIL: 2 inline scripts в `src/shell/index.html`. Fix plan (iter 19+).

**KI#17 (ACTIVE, LOW, found iter 10)** — Documentation drift (E07 vs E02). Fixed in iter 10. LOW severity.

**Fix plan (iter 12..19):** iter 12–17 (остальные Parts Canon + migrate) → iter 18 (final cleanup) → iter 19+ (KI#13 + KI#16 + Phase 4 SVG integration). См. `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2 и `docs/canon/_README.md` §5.

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
| **Canonical Guide Spec (iter 7–11)** | Part 4 ✅ DONE (iter 7–9). Part 7A ✅ DONE (iter 10–11). Остальные Parts — iter 12+. |
| **Migration principle: viz > dry text (iter 8)** | Визуализация = замещение, dry-дублирующий текст удаляется. Применяется «очень деликатно». |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
