# iter 52 — paragraph-level drift detection + documentation cleanup + root fallback regen

**Дата:** 2026-07-21
**Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
**Версия:** 9.1.0 (без version bump — iter 52 это LOW-priority roadmap item + doc cleanup)
**Shell hash:** `69d9b813` UNCHANGED
**contentHash:** UNCHANGED (только `scripts/*.py` + `*.md` изменены, не входят в contentHash)

---

## Что сделано в iter 52

### 1. Paragraph-level Jaccard drift detection (LOW priority roadmap item #1)

`scripts/audit_canon_master_drift.py` расширен с v1.0 до v1.1:
- New `ParagraphDrift` dataclass (section_id, canon_text_preview, best_master_text_preview, best_similarity, canon_length, master_length).
- 5 new functions: `split_canon_paragraphs()`, `split_master_paragraphs()`, `tokenize()`, `jaccard_similarity()`, `compute_paragraph_drift()`.
- 2 new CLI flags: `--no-paragraphs`, `--paragraph-threshold FLOAT`.
- **88 paragraph drifts detected** (informational — expected, т.к. master HTML имеет VS-EMBEDs вместо текста, canon имеет `[ref:...]` markers).
- Exit 0 всегда (informational script).

### 2. Documentation cleanup (per user request «файлы должны быть лёгкими для модели/агента»)

- `AGENT_NAVIGATION.md`: §6 Frequent Pitfalls compressed с 43 пунктов (FIX-N verbose) до 25 key pitfalls. OP-1 iter history table compressed с 30+ verbose rows (200+ слов каждая) до 16 milestone rows. Header iter line updated.
- `CHANGELOG.md`: iter 51 entry compressed с 50+ строк до 10 строк (только key facts). iter 52 entry added (brief, ~25 строк).
- `STATUS.md`: iter 51 verbose paragraph (250+ слов) заменён на iter 52 brief. Invariants updated. iter 52+ Roadmap → iter 53+ Roadmap.
- `worklog.md`: iter 51 → one-liner, iter 52 = detailed record.

### 3. Stale files deleted

- `ITER51_README.md` — stale per-iter README, дублирует info из worklog/STATUS/CHANGELOG.
- `_ITER51_DELETE_STALE.txt` — stale marker file from iter 51.

### 4. Root fallbacks regenerated (completes iter 51 commit)

После `pnpm run build` в iter 52, root fallbacks обновлены чтобы отразить iter 51 изменения (которые не были полностью закоммичены в iter 51 commit `f9839ad`):

- `index.html` — только `Generated:` timestamp обновлён (контент идентичен).
- `assets/lazy-loader.js` — KI#36 fixes (hashchange listener, `section[data-section]` selector, glossary auto-close) — regenerated из `src/shell/lazy-loader.js`.
- `parts/*.html` (14 файлов) — id attrs добавлены всем секциям — regenerated из `src/master/*.html`.

**Это НЕ iter 52 функциональные изменения** — это regenerated артефакты, которые синхронизируют root fallbacks с уже закоммиченными iter 51 исходниками.

---

## Структура архива

```
iter_52_archive/
├── README.md                                    # этот файл
├── STATUS.md                                    # iter 52 record
├── worklog.md                                   # iter 52 detailed record
├── CHANGELOG.md                                 # iter 52 entry + iter 51 compressed
├── AGENT_NAVIGATION.md                          # §6 + OP-1 cleanup
├── index.html                                   # regenerated (timestamp only)
├── scripts/
│   └── audit_canon_master_drift.py              # paragraph drift feature v1.1
├── assets/
│   └── lazy-loader.js                           # regenerated (KI#36 fixes from iter 51)
└── parts/
    ├── appendix_glossary.html                   # regenerated (+1 id attr)
    ├── appendix_mbti.html                       # regenerated (+1 id attr)
    ├── appendix_model_table.html                # regenerated (+1 id attr)
    ├── part_01.html                             # regenerated (+8 id attrs)
    ├── part_02.html                             # regenerated (+6 id attrs)
    ├── part_03.html                             # regenerated (+8 id attrs)
    ├── part_04.html                             # regenerated (+11 id attrs)
    ├── part_05.html                             # regenerated (+8 id attrs)
    ├── part_06.html                             # regenerated (+5 id attrs)
    ├── part_07a.html                            # regenerated (+13 id attrs)
    ├── part_07b.html                            # regenerated (+5 id attrs)
    ├── part_08.html                             # regenerated (+16 id attrs)
    ├── part_09.html                             # regenerated (+11 id attrs)
    └── part_10.html                             # regenerated (+4 id attrs)
```

**Всего файлов в архиве:** 21 modified + 1 README = 22 файла
**Файлов для удаления из локальной директории:** 2 (ITER51_README.md, _ITER51_DELETE_STALE.txt)

---

## Инструкции по слиянию с локальной директорией

```bash
# 1. Распакуйте архив в любую временную директорию
unzip iter_52_paragraph_drift_cleanup.zip -d /tmp/iter52

# 2. Перейдите в локальную директорию live-char-guide
cd /path/to/live-char-guide

# 3. Скопируйте все изменённые файлы с заменой (сохраняя структуру папок)
cp /tmp/iter52/iter_52_archive/scripts/audit_canon_master_drift.py scripts/
cp /tmp/iter52/iter_52_archive/assets/lazy-loader.js assets/
cp /tmp/iter52/iter_52_archive/parts/*.html parts/
cp /tmp/iter52/iter_52_archive/index.html .
cp /tmp/iter52/iter_52_archive/STATUS.md .
cp /tmp/iter52/iter_52_archive/worklog.md .
cp /tmp/iter52/iter_52_archive/CHANGELOG.md .
cp /tmp/iter52/iter_52_archive/AGENT_NAVIGATION.md .

# 4. Удалите устаревшие файлы (stale per-iter READMEs)
rm -f ITER51_README.md
rm -f _ITER51_DELETE_STALE.txt

# 5. Установите зависимости и запустите validation gates
pnpm install --frozen-lockfile
pnpm run build              # пересоберёт dist/ + root fallbacks (idempotent)
pnpm run validate:master
pnpm run validate
pnpm run test:unit
pnpm run test:integration
pnpm run qa:csp
pnpm run qa:bundle
pnpm run qa:doc-versions
pnpm run lint
python3 scripts/audit_canon_master_sync.py    # 96/96 PASS ожидается
python3 scripts/audit_canon_master_drift.py   # exit 0, 88 paragraph drifts (informational) ожидается
python3 scripts/check_english.py              # 20 baseline leaks ожидается

# 6. Если все validation gates PASS — commit + push (см. git-команды ниже)
```

---

## Ожидаемые результаты validation gates

| Gate | Expected | Actual iter 52 |
|------|----------|----------------|
| `pnpm run build` | SUCCESS, shell hash `69d9b813` | ✅ `69d9b813` unchanged |
| `pnpm run validate` | 8 gates PASS, 7.5KB | ✅ 8/8 PASS, 7.5KB |
| `pnpm run validate:master` | 12 checks PASS | ✅ 12/12 PASS |
| `pnpm run test:unit` | 43/43 PASS | ✅ 43/43 PASS |
| `pnpm run test:integration` | 21/21 PASS | ✅ 21/21 PASS |
| `pnpm run qa:csp` | 0 inline scripts | ✅ PASS |
| `pnpm run qa:bundle` | 7.5KB (max 500KB) | ✅ PASS |
| `pnpm run lint` | 0 errors, 12 baseline warnings | ✅ 0 errors, 12 warnings |
| `pnpm run qa:doc-versions` | PASS | ✅ PASS |
| `audit_canon_master_sync.py` | 96/96 PASS | ✅ 96/96 PASS |
| `audit_canon_master_drift.py` | exit 0, 88 paragraph drifts | ✅ exit 0, 88 drifts |
| `check_english.py` | 20 baseline leaks | ✅ 20 leaks (unchanged) |

---

## Git-команды для обновления репозитория

```bash
# Из локальной директории live-char-guide (после слияния файлов из архива):

# 1. Добавить все изменения (modified + deleted)
git add -A

# 2. Commit с описательным сообщением
git commit -m "iter 52: paragraph-level Jaccard drift detection added; documentation cleanup; root fallback regen

- scripts/audit_canon_master_drift.py: v1.0 → v1.1, paragraph-level drift detection added (5 new functions + 2 CLI flags + 88 drifts informational)
- AGENT_NAVIGATION.md: §6 Frequent Pitfalls compressed (43 → 25 key items), OP-1 iter history table compressed (30+ rows → 16 milestone rows)
- CHANGELOG.md: iter 51 entry compressed (50+ → 10 lines), iter 52 entry added
- STATUS.md: iter 52 record + Invariants update + iter 53+ Roadmap
- worklog.md: iter 52 detailed record + iter 51 → one-liner
- DELETED: ITER51_README.md (stale per-iter README), _ITER51_DELETE_STALE.txt (stale marker)
- Root fallbacks regenerated (completes iter 51 commit): parts/*.html (+98 id attrs), assets/lazy-loader.js (KI#36 fixes), index.html (timestamp only)
- Shell hash 69d9b813 UNCHANGED, contentHash UNCHANGED
- All validation gates PASS (96/96 sync, 88 paragraph drifts informational, 20 English leaks baseline)"

# 3. Push в main
git push origin main
```

---

## Точка остановки

**iter 52 COMPLETE.** LOW-priority roadmap item #1 (semantic paragraph-level drift detection) закрыт. Documentation cleanup выполнен per user request. Root fallbacks regenerated для завершения iter 51 commit.

**Next iter (iter 53+) — LOW priority only:**
- Glossary double-render inefficiency (by design)
- Component extracts regeneration (опционально, 54 файла)
- Dependabot merges (10 unmerged branches, GitHub-level)

**Все HIGH/MEDIUM priority KI закрыты (KI#36 ✅ iter 51 — последний HIGH). Проект STABLE.**

Если новых багов нет — следующая итерация может быть либо:
1. Продолжение LOW-priority roadmap (Glossary / Component extracts / Dependabot).
2. Разведка (reconnaissance) — поиск новых багов или audit-задач.
3. Patch iter 52 если найдены регрессии в paragraph drift detection (88 drifts — expected, но если кто-то найдёт false positives — можно tuning `PARAGRAPH_DRIFT_THRESHOLD` или `MIN_PARAGRAPH_LENGTH`).
