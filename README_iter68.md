# iter 68 — Archive Manifest

**Дата:** 2026-07-25
**Iter:** 68 (Recon + KI#44 fix + cleanup)
**Base commit:** d0969c4 (iter 67)

## Что в архиве

### Modified (7 файлов, merge с локальной директорией)

| Файл | Что изменилось |
|------|----------------|
| `STATUS.md` | iter 68 record, KI#44 ✅ CLOSED, KI#45 OPEN (LOW, deferred), iter 69+ roadmap |
| `worklog.md` | iter 68 record (полный), iter 67 → краткая история |
| `CHANGELOG.md` | iter 68 entry добавлен в начало |
| `AGENT_NAVIGATION.md` | header (iter 68 milestone + version note 9.2.0/9.1.0), §6 pitfall #14 (KI#44 closed, убран symlink workaround note), footer (iter 69+ roadmap) |
| `scripts/audit_vs_embeds.py` | **KI#44 fix:** `parents[2]` → `parents[1]`, hardcoded fallback removed |
| `scripts/audit_component_extracts.py` | Cleanup: hardcoded fallback removed (primary path уже работал) |
| `scripts/audit_component_extracts_css.py` | Cleanup: hardcoded fallback removed (primary path уже работал) |

### Deleted (1 файл, удалить локально)

| Файл | Причина |
|------|---------|
| `_DELETED_FILES.txt` | Stale iter 67 leftover — все 6 перечисленных файлов уже удалены. Нарушает convention "не создавать файлов с git bash командами в репо". |

### Не включено в архив (regenerated локально)

| Файл | Причина |
|------|---------|
| `index.html` | Build artifact — regenerated на каждом `pnpm run build`. Изменился только timestamp `Generated:`. |

## Что было сделано в iter 68

### Recon — поиск новых багов

Запущены все validation gates:
- `check_english.py` → 24 English leaks ✅ (baseline unchanged)
- `validate_terms.py` → ✅ All terminology valid
- `check_duplicates.py` → ✅ no disallowed duplicates
- `audit_canon_master_sync.py` → 96/96 PASS
- `audit_canon_master_drift.py` → 170 drifts / 131 actionable (by design iter 64+)
- `audit_component_extracts.py` → 18 elements, drift EXPECTED per KI#32
- `audit_component_extracts_css.py` → 16 MATCH, E15+E18 drift EXPECTED per KI#22/iter 25

### Найденные баги

**KI#44 (FIXED в iter 68):** `scripts/audit_vs_embeds.py` — path bug.
- Symptom: `python3 scripts/audit_vs_embeds.py` падал с "ERROR: required files not found"
- Root cause: line 30 `REPO = Path(__file__).resolve().parents[2] / "work" / "live-char-guide"` — `parents[2]` это parent репозитория, не сам репозиторий. Fallback `/home/z/my-project/work/live-char-guide` — hardcoded sandbox path.
- Workaround (ранее задокументирован в AGENT_NAVIGATION.md §6 pitfall #14): `ln -sfn /path/to/repo /home/z/my-project/work/live-char-guide`
- Fix: `parents[2]` → `parents[1]` (matches pattern в `audit_canon_master_sync.py`), fallback removed. Тот же cleanup применён к `audit_component_extracts.py` и `audit_component_extracts_css.py` (primary path уже работал, fallback удалён для consistency).

**KI#45 (OPEN, LOW, deferred to iter 69):** Version drift.
- Docs (STATUS.md, README.md, AGENT_NAVIGATION.md, terminology_dictionary.md, glossary.json) говорят 9.2.0.
- Code (package.json, src/VERSION, data/character_schema.json) на 9.1.0 с iter 60.
- CHANGELOG использует `[9.2.NN]` формат (NN = iter) начиная с iter 60.
- `version-sync.mjs` PASS (проверяет только src/VERSION + package.json + dist/index.html).
- Не фиксится в iter 68 — bump кодовой версии требует координированного обновления 4 файлов + build manifest verification.

### Cleanup

- Удалён stale `_DELETED_FILES.txt` (iter 67 leftover — все 6 перечисленных файлов уже удалены).

### Validation gates (post-iter 68)

- `check_english.py` → 24 English leaks ✅ (baseline unchanged)
- `validate_terms.py` → ✅ All terminology valid
- `check_duplicates.py` → ✅ no disallowed duplicates
- `audit_canon_master_sync.py` → 96/96 PASS
- `audit_vs_embeds.py` → ✅ PASS (no symlink workaround needed)
- `pnpm run build` → SUCCESS, shell hash `69d9b813` unchanged

## Как применить

1. Распаковать архив поверх локальной копии `live-char-guide/` (merge с заменой существующих файлов).
2. Удалить `_DELETED_FILES.txt` (если ещё не удалён): `rm -f _DELETED_FILES.txt`
3. Выполнить `pnpm run build` для регенерации `index.html` (timestamp обновится).
4. Выполнить git-команды (см. chat).
