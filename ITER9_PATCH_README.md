# Iter 9 Patch — Live Character Guide

**Дата:** 2026-06-24
**Итерация:** iter 9 (Part 4 validation pass)
**Автор:** main agent

## Что в архиве

7 изменённых файлов документации (никаких правок кода / master HTML / visual-system / widget JS):

| File | Action |
|------|--------|
| `STATUS.md` | Rewritten: iter 9 status, KI#16 NEW ACTIVE. iter 8 details → опущены. |
| `worklog.md` | Updated: iter 8 → one-liner, iter 9 = новый record. |
| `AGENT_NAVIGATION.md` | Updated: header iter 8 → iter 9. §6 pitfall #34 (KI#16). §8 iter 8 compressed, iter 9 record + iter 10+ roadmap. §10 hint для iter 10 (Canon Part 7A). |
| `CHANGELOG.md` | Updated: [9.1.9] entry — iter 9 validation pass. |
| `PLAN.md` | Updated: §5 iter 9 → ✅ DONE, iter 10+ roadmap. iter 1-7 entries compressed. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Updated: §5.2 iter 9 row → ✅ DONE. §8 iter 9 stop point + iter 10 priorities. |
| `docs/canon/_README.md` | Updated: §9 iter 9 record added. |

## Применение патча

Скопировать файлы из архива в локальную директорию репозитория `live-char-guide/` с заменой существующих:

```bash
# Из корня репозитория live-char-guide:
unzip iter9-patch.zip -d /tmp/iter9-patch
cp -r /tmp/iter9-patch/* .
git add -A
git commit -m "iter 9: Part 4 validation pass — KI#16 NEW (qa:csp FAIL pre-existing с iter 5)"
git push origin main
```

## Результат iter 9

- **Static HTML sanity check:** 11 секций (open/close balanced), 2 VS-EMBED divs (E05 + E06 well-formed), 2 retained infographic divs present, все 11 expected `data-section` IDs присутствуют, no orphans, no mermaid, no broken refs ✅
- **Served `parts/part_04.html`:** 40 825 байт / 676 строк, all expected content present, all removed content absent ✅
- **`pnpm run validate:master`** ✅ PASSED (all 12 checks)
- **`pnpm run build`** ✅ SUCCESSFUL, hash `df283246` (same as iter 8, no drift)
- **`pnpm run validate`** ✅ All 8 validation gates passed
- **`pnpm run test:unit`** ✅ 43/43 pass
- **`pnpm run lint`** ✅ 0 errors, 10 warnings (pre-existing)
- **`pnpm run qa:bundle` / `qa:contrast` / `qa:doc-versions`** ✅ PASS
- **`pnpm run qa:english`** ❌ 29 issues (vs 29 в iter 7 — no regression)
- **`pnpm run qa:syntax`** ❌ 236 markdown false positives (vs 236 в iter 8 — no regression)
- **`pnpm run qa:csp`** ❌ FAIL — **KI#16 NEW** (pre-existing с iter 5, не задокументирован ранее)

## Known Issues после iter 9

- **KI#13** (ACTIVE, MEDIUM, found iter 5) — 123 inline `style=` + 22 "content outside section" warnings в master HTML. Defer до post-Canon миграции.
- **KI#14** (ACTIVE, MEDIUM-HIGH, found iter 6) — Content duplication VS-EMBED ↔ текст. 26 визуализаций параллельно (iter 8 убрал 5 из 31). Part 4 мигрирован (iter 8) + валидирован (iter 9). Остальные Parts в очереди.
- **KI#16** (NEW, ACTIVE, MEDIUM, found iter 9) — `pnpm run qa:csp` FAIL: `index.html has 2 inline script(s)`. Pre-existing с iter 5 (`src/shell/index.html` строки 24 + 108-126). Fix plan (iter 19+): вынести mermaid.initialize в `src/shell/widgets/mermaid-init.js` + CSP `unsafe-inline` exception для tiny js flag.

## Точка остановки

**iter 9 done.** Pilot Part 4 migration (iter 8) — валидирована. KI#13 + KI#14 + KI#16 — ACTIVE.

**iter 10 priorities:** Canon Part 7A — создать `docs/canon/part_07a.md` (13 H2 секций, 4 VS-маркера для E07/E08/E16/E17, Migration Notes таблица для iter 11). **НЕ править master HTML.**

**Подсказка следующему агенту:** прочитай STATUS.md → worklog.md (iter 9 record) → AGENT_NAVIGATION.md (§8 iter 10+ roadmap, §10 hint, §6 pitfall #34 KI#16) → docs/canon/_README.md (§4 workflow Canon creation, §5 Part 7A ❌ NOT MIGRATED) → docs/canon/part_04.md (reference pilot — структура Canon-файла) → src/master/part_07a.html (1168 строк, 13 секций, 4 VS-EMBED).
