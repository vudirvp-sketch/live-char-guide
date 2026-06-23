# iter 14 — Merge Instructions

> **Archive:** live-char-guide-iter14.zip
> **Date:** 2026-06-24
> **Author:** main agent (iter 14)
> **Status:** iter 14 COMPLETE — Canon Part 1+2+3 ✅ MIGRATED
> **Base commit:** last commit on `main` branch of https://github.com/vudirvp-sketch/live-char-guide

---

## Что в архиве

15 файлов (12 modified + 3 new), сохранена структура папок репозитория:

### New files (3)
- `docs/canon/part_01.md` — Canon Part 1 (186 строк, 7 секций, 1 VS-маркер E01)
- `docs/canon/part_02.md` — Canon Part 2 (238 строк, 6 секций, 2 VS-маркера E03+E04)
- `docs/canon/part_03.md` — Canon Part 3 (315 строк, 8 секций, 1 VS-маркер E07)

### Modified files (12)
- `src/master/part_01.html` — 390 → 365 строк (-6.4%, mermaid удалён как auto-TOC duplicate)
- `src/master/part_02.html` — 443 → 415 строк (-6.3%, 2 infographic + 1 plain-copy удалены как дубликаты VS-EMBED E03/E04)
- `parts/part_01.html` — regenerated root fallback
- `parts/part_02.html` — regenerated root fallback
- `index.html` — regenerated root fallback (build hash updated)
- `docs/canon/_README.md` — §5 migration status (Part 1+2+3 → ✅), §9 iter 14 history entry
- `docs/CONTENT_RESTRUCTURE_PLAN.md` — §5.2 iter 14 row → ✅ DONE, §8 stop point iter 16, §9.1 metric updates
- `STATUS.md` — rewritten: iter 14 status
- `worklog.md` — iter 13 → one-liner, iter 14 = full record
- `AGENT_NAVIGATION.md` — header iter 13 → iter 14, §8 iter 14 record + iter 15+ roadmap
- `CHANGELOG.md` — [9.1.14] entry
- `PLAN.md` — §5 iter 14 → ✅ DONE, iter 15+ roadmap

### NOT modified (но упоминается в логах)
- `src/master/part_03.html` — 452 → 452 строк (0%, контент плотный, дубликатов не найдено, 0 compression candidates applied)
- `parts/part_03.html` — root fallback (не менялся, т.к. src/master не менялся)

---

## Как смержить с локальной директорией

### Вариант 1: Распаковать поверх (простой)

```bash
# Из корня локального клона репозитория
cd /path/to/live-char-guide
unzip -o live-char-guide-iter14.zip
```

Файлы в архиве имеют правильную относительную структуру — распакуется поверх существующих файлов с заменой.

### Вариант 2: Git-комманды (рекомендуется)

```bash
cd /path/to/live-char-guide

# 1. Распаковать архив во временную директорию
mkdir -p /tmp/iter14
unzip live-char-guide-iter14.zip -d /tmp/iter14

# 2. Скопировать файлы поверх локальной директории
cp -r /tmp/iter14/* .

# 3. Проверить статус
git status

# 4. Запустить валидаторы для подтверждения целостности
pnpm install --frozen-lockfile
pnpm run validate:master   # должно PASSED (0 errors)
pnpm run build              # должно SUCCESS (hash df283246)
pnpm run validate           # все 8 gates passed
pnpm run test:unit          # 43/43 pass
pnpm run lint               # 0 errors

# 5. Commit и push
git add -A
git commit -m "iter 14: Canon Part 1+2+3 creation + migrate (end-to-end)

- Canon docs/canon/part_01.md created (186 строк, 7 секций, 1 VS-маркер E01)
- Canon docs/canon/part_02.md created (238 строк, 6 секций, 2 VS-маркера E03+E04)
- Canon docs/canon/part_03.md created (315 строк, 8 секций, 1 VS-маркер E07)
- src/master/part_01.html мигрирован: 390 → 365 строк (-6.4%)
  - #14 mermaid dependency graph удалён (дубликат auto-TOC)
- src/master/part_02.html мигрирован: 443 → 415 строк (-6.3%)
  - #15 infographic T→A→P удалён (дубликат VS-EMBED E03)
  - #16 plain-copy T→A→P удалён (text-дубликат #15)
  - #17 infographic Embodiment удалён (дубликат VS-EMBED E04)
- src/master/part_03.html не менялся: 452 → 452 строк (0%, контент плотный)
- 4 compression candidates applied total
- validate:master/build/validate/test:unit/lint/qa:bundle/qa:doc-versions PASS
- Canon front-matter MIGRATED для всех 3 files
- 10 docs updated

KI#13+KI#14+KI#16+KI#17 ACTIVE. iter 15 reserved (не нужен). iter 16 = Canon Part 5+6+7B+10."

git push origin main
```

---

## Validation gates (iter 14 — PASSED)

- [x] `pnpm run validate:master` — ✅ PASSED (0 errors, baseline warnings = KI#13 baseline, no regression)
- [x] `pnpm run build` — ✅ SUCCESS (hash df283246, same as iter 8–13)
- [x] `pnpm run validate` — ✅ All 8 gates passed
- [x] `pnpm run test:unit` — ✅ 43/43 pass
- [x] `pnpm run lint` — ✅ 0 errors (10 pre-existing warnings)
- [x] `pnpm run qa:bundle` — ✅ PASS (index.html 7.5KB, max 500KB)
- [x] `pnpm run qa:doc-versions` — ✅ PASS (all doc dates current)

---

## Точка остановки для следующего агента

**iter 14 done.** Part 1+2+3 ✅ MIGRATED. KI#13 + KI#14 + KI#16 + KI#17 ACTIVE.

**Следующий шаг — iter 15 (reserved, не нужен) или iter 16:** Canon creation + migrate для Part 5+6+7B+10 (Psychology, CoT, Lorebook, Examples). По образцу iter 12/13/14 (end-to-end за один iter на Part, либо все 4 за один iter если помещаются). Перед стартом: `rg "VS-EMBED:" src/master/part_05.html src/master/part_06.html src/master/part_07b.html src/master/part_10.html` для inventory.

**Что НЕ сделано (намеренно):**
- Part 5/6/7B/10 (iter 16–17)
- Final cleanup (устаревшие infographic + mermaid → 0, iter 18)
- KI#13/KI#16 fix (iter 19+)
- Phase 4 SVG integration (iter 19+)

**Рекомендация перед iter 16:** визуальная проверка `parts/part_01.html`, `parts/part_02.html` в браузере (на случай regression, не пойманных валидаторами) — `pnpm run dev` → http://localhost:3000 → Part 1 и Part 2.
