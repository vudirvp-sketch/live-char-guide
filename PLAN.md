# Live Character Guide — План docs-restructure (по образцу poe2-regex-ru)

> **Версия плана:** 1.1 (актуализировано iter 37)
> **Дата:** 2026-07-08
> **Автор:** main agent
> **Источник паттерна:** https://github.com/vudirvp-sketch/poe2-regex-ru
> **Статус:** iter 1-37 COMPLETE. Документ хранит исторический контекст docs-restructure плана (§1-4) и текущую точку остановки (§5). Подробная iter-by-iter история — в `worklog.md` + `CHANGELOG.md` + git log.

---

## 1. Анализ паттерна poe2-regex-ru

Паттерн организации документации AI-агента:

| Файл | Роль |
|------|------|
| `AGENT_NAVIGATION.md` | Entry document. Где что лежит, aliases, dependency rules, pitfalls, dialect spec, doc map. |
| `STATUS.md` | Текущая итерация (iter N), Known Issues, Open Proposals, ограничения. |
| `worklog.md` | Только последняя итерация подробно. Остальные — одной строкой. |
| `README.md` | User-facing: что это, возможности, технологии, запуск, deploy. |
| `docs/*.md` | Детальные технические документы. |

Принципы: entry document first, iter-based status, compact worklog, documentation map, FAQ-style pitfalls, open proposals.

---

## 2. План iter 1 (исторический, COMPLETE)

Создать `AGENT_NAVIGATION.md` / `STATUS.md` / `worklog.md`, удалить устаревшие `docs/migration_map.md` / `transition_guide.md` / `ap_reference_inventory.md`, обновить `README.md` / `CHANGELOG.md` / `docs/architecture.md`.

✅ **DONE iter 1-4.** Подробности — в `worklog.md` (Предыдущие итерации) + git log.

---

## 3. План iter 6+ — Canon migration (исторический, COMPLETE)

Strategy:Canonical Guide Spec в `docs/canon/part_NN.md` как источник правды для контента каждого Part. Master HTML мигрируется против Canon.

✅ **DONE iter 7-18.** Все 10 Parts + 3 Appendix ✅ MIGRATED. См. `docs/canon/_README.md` §5.

---

## 4. Файловые шаблоны (reference)

### `AGENT_NAVIGATION.md`

```markdown
# Live Character Guide — Agent Navigation

> Entry document. Read this first.

## 1. Where Things Are (directory map + ownership + rules)
## 2. Build Pipeline (master → unified → shell → dist)
## 3. Section Model (data-section, naming convention)
## 4. Widget Architecture (markup in HTML, data in JSON, behavior in JS)
## 5. Core Rules (3 principles, 7 CORE DIRECTIVES)
## 6. Frequent Pitfalls (numbered list with symptom + fix)
## 7. Documentation Map (when to update what)
## 8. Open Proposals (roadmap)
## 9. Cross-Reference Pairs (synced registry)
```

### `STATUS.md`

```markdown
# Live Character Guide — Статус проекта

> Текущая версия: ...

## Текущее состояние (iter N — что сделано)
## Known Issues (KI#N с статусом)
## Подтверждённые ограничения
```

### `worklog.md`

```markdown
# Worklog

> Только последняя итерация подробно. Старые — одной строкой.

---
Task ID: N
Agent: main
Task: ...

Work Log:
- шаги

Stage Summary:
- результаты

---
## Предыдущие итерации (кратко)
- iter N-1: ...
- iter N-2: ...
```

---

## 5. Точка остановки

**iter 32 ✅ DONE — Visual System Scroll-Animation Bug (KI#20) ✅ CLOSED.** Все 5 sub-items (A-E) fixed single-file edit'ом `vs-scroll-observer.js` (расширен selector для 8 animation classes). 43 элемента на 5 VS-EMBED (E06/E07/E08/E09/E15) теперь корректно отображаются на собранном сайте. Все validation gates PASS, build hash `fd3d96d3` unchanged.

**iter 33+ roadmap:** none planned. Все Known Issues (KI#1..KI#20) ✅ CLOSED.

**Принципы сохраняются:**
- `viz > dry text` (iter 8+) — viz = замещение, не дополнение. Catalog vs Detail / Annotation Layer patterns — keep-by-design с documented rationale (KI#18-G/H).
- Inline scripts forbidden (KI#16, CSP compliance).
- Inline styles forbidden (KI#13, 123/123 → CSS classes).
- VS-EMBED animation classes — покрываются `vs-scroll-observer.js` selector или `scroll-enter` class на элементе. Audit: `scripts/audit_vs_embeds.py`.

**Новые баги:** сначала документировать в `STATUS.md` как KI#N, потом фиксить.

**Полная дорожная карта:** `docs/CONTENT_RESTRUCTURE_PLAN.md` §5.2. **Canon migration status:** `docs/canon/_README.md` §5.
