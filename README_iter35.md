# iter 35 — Canon Audit P0 Fixes

## Что в архиве

12 изменённых файлов (full folder structure preserved):

### Canon (16 P0 правок KI#21):
- `docs/canon/appendix_glossary.md` (1 edit — P0-1: T→A→P "Pattern"→"Price")
- `docs/canon/part_04.md` (4 edits — P0-3: счётчик 2→3 уровня; P0-7: NEED sync; P0-8: NEED full chain; P0-9: variant row deletion; P0-15: "待" removed + cross-refs filled)
- `docs/canon/part_05.md` (1 edit — P0-16: §5.1 RULE updated)
- `docs/canon/part_07a.md` (3 edits — P0-2: Елена OCEAN; P0-4: счётчик AN; P0-5: счётчик ghost_layers)
- `docs/canon/part_08.md` (1 edit — P0-10: AP-15 deferred Price→immediate)
- `docs/canon/part_09.md` (2 edits — P0-11: 3-level→4-zone; P0-12: Quick Check rename)
- `docs/canon/part_10.md` (3 edits — P0-6: счётчик Vyshcherblenny; P0-13: Омнис GHOST rewrite; P0-14: Омнис FLAW rewrite)

### Documentation:
- `STATUS.md` (iter 35 record, KI#21 P0 ✅ CLOSED)
- `worklog.md` (iter 35 = самый подробный)
- `AGENT_NAVIGATION.md` (§6 #40 KI#21 P0 ✅, §8 iter 35 row + iter 36+ roadmap)
- `docs/AUDIT_VERIFICATION.md` (§4.1 P0 ✅ CLOSED annotations, §5 iter 35 ✅, §7.1 stop point)

### Auto-regenerated (by `pnpm run build`):
- `index.html` (только timestamp change — content identical. Если у вас уже есть iter 34 deployed, можно не мерджить — `pnpm run build` регенерирует автоматически.)

## Как слить с локальной директорией

```bash
# Из корня вашего локального репозитория live-char-guide:
unzip iter_35_p0_fixes.zip -d /tmp/iter35
cp -r /tmp/iter35/* .

# Опционально: пересобрать для обновления index.html timestamp
pnpm run build

# Проверка
git status
pnpm run validate:master
python3 scripts/audit_vs_embeds.py
cat build.hash  # должно быть 69d9b813
```

## Validation gates (all PASS):
- `validate:master` — ✅ PASSED (12 checks)
- `build` — ✅ hash `69d9b813` unchanged (canon не в hash computation)
- `validate` — ✅ 8 gates PASS, index.html 7.5KB
- `test:unit` — ✅ 43/43
- `test:integration` — ✅ 21/21
- `lint` — ✅ 0 errors, 12 warnings
- `qa:csp` — ✅ PASS
- `qa:bundle` — ✅ 7.5KB
- `qa:doc-versions` — ✅ PASS
- `audit_vs_embeds.py` — ✅ 0 regressions

## Точка остановки

iter 35 — CANON AUDIT P0 ✅ COMPLETE. 16/57 правок KI#21 закрыты.
iter 36 (P1) — 11 правок ready to start (см. `docs/AUDIT_VERIFICATION.md` §4.2).
