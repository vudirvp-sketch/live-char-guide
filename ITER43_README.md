# iter 43 — DEPLOY PIPELINE DOC + KI#33 🟡 NEW

**Build hash:** `69d9b813` (unchanged с iter 34 — KI#23 fix; iter 43 doc-only, canon + doc файлы НЕ входят в hash computation)
**Дата:** 2026-07-08
**Task ID:** 43

## Контекст

Ответ на вопрос пользователя «Все завершено? Канон готов? А каким образом эти изменения перейдут в основной проект? На сайт?»:

1. **iter 42 COMPLETE** — commit `0d2534e` в `main`, build hash `69d9b813` unchanged. KI#32 ✅ CLOSED (doc-only: component-extracts drift audit + HISTORICAL SNAPSHOT notice).
2. **Канон ГОТОВ** — 4 070 строк, все 10 Parts + 4 Appendix + Part 0 ✅ MIGRATED (iter 18 + iter 38), 57/57 audit правок KI#21 ✅ CLOSED (iter 35-38), OCEAN labels consistent (iter 40-41), bible ↔ canon cross-ref symmetry (iter 41).
3. **КАК изменения переходят на сайт** — описано в `AGENT_NAVIGATION.md` §2a «Deployment Pipeline» (новая секция iter 43).
4. **🟡 KI#33 DISCOVERED** — canon audit фиксы iter 35-41 НЕ синхронизированы с `src/master/*.html`. Сайт НЕ отражает эти правки.

## Что сделано

**1 новая секция документации + 1 новый KI (документирован, fix deferred):**

- **§2a «Deployment Pipeline»** в `AGENT_NAVIGATION.md` — полный flow canon → master HTML → build → root fallbacks → GitHub Actions → GitHub Pages. Что входит в build hash vs что НЕ входит. Команды для деплоя.
- **KI#33 🟡 NEW** — canon→master HTML sync gap. 3 spot-checks подтвердили drift между `docs/canon/*.md` (iter 35-41 fixes applied) и `src/master/*.html` (stale). Fix deferred to iter 44+.

## Изменённые файлы (4 total)

**Modified doc files (3):**
- `STATUS.md` — iter 43 record + KI#33 section + Invariants (новый Canon → master HTML sync) + iter 44+ Roadmap (KI#33 fix MEDIUM priority) + cleanup (KI#25-31 trimmed to one-liners) + Подтверждённые ограничения (Canon → master HTML sync GAP)
- `AGENT_NAVIGATION.md` — header iter 43 line + §2a «Deployment Pipeline» (NEW, 75 строк) + §8 OP-1 iter 43 row + §8 iter 44+ roadmap (KI#33 fix MEDIUM) + «Подсказка следующему агенту» (iter 44+ starting point, новый invariant (9))
- `worklog.md` — iter 43 record (самый подробный), iter 42 → one-liner

**Renamed (1):**
- `ITER42_README.md` → `ITER43_README.md` (iter 43 stopping point + git commands + install instructions)

## Validation gates — ALL PASS

- `build` — hash `69d9b813` unchanged (iter 43 doc-only — STATUS.md, AGENT_NAVIGATION.md, worklog.md, ITER43_README.md не в hash computation)
- `git status` — только doc changes (3 modified + 1 new + 1 deleted), root fallbacks НЕ regenerated (no build needed)

## Установка

Распаковать поверх локальной копии репозитория с сохранением структуры папок:

```bash
# Из корня репозитория live-char-guide:
unzip -o iter43-live-char-guide.zip
```

## Git commands

```bash
cd /path/to/live-char-guide
git add -A
git commit -m "iter 43: KI#33 NEW - canon->master HTML sync gap discovered + Deployment Pipeline doc

Ответ на вопрос пользователя «Все завершено? Канон готов? А каким образом эти изменения перейдут в основной проект? На сайт?»:
1. iter 42 COMPLETE (commit 0d2534e, KI#32 CLOSED doc-only).
2. Канон ГОТОВ (4 070 строк, 57/57 audit правок KI#21, OCEAN consistent, bible<->canon cross-ref symmetry).
3. Deployment Pipeline documented в AGENT_NAVIGATION.md §2a (NEW): canon -> manual sync -> master HTML -> build -> root fallbacks -> push to main -> GitHub Actions -> GitHub Pages.
4. KI#33 DISCOVERED: canon audit фиксы iter 35-41 (57 правок KI#21 + KI#25-31) НЕ синхронизированы с src/master/*.html. 3 spot-checks подтвердили drift (KI#25 part_07a L668 vs master L1107, KI#29 part_10 L408 vs master L511, KI#30 part_10 L51 + part_07a L416 vs master L160 + L728). Build hash 69d9b813 unchanged с iter 34 = master HTML не менялся 9 итераций. Сайт НЕ отражает canon audit фиксы iter 35-41. Fix deferred to iter 44+ (large effort: 57 fixes x verification x master edit x build test x visual diff per Part).

Modified files (4): STATUS.md (iter 43 record + KI#33 section + Invariants + Roadmap + cleanup), AGENT_NAVIGATION.md (header + §2a Deployment Pipeline NEW + §8 OP-1 iter 43 row + roadmap + «Подсказка следующему агенту»), worklog.md (iter 43 record), ITER43_README.md (NEW — replaced ITER42_README.md, deleted).

Validation gates PASS: build (hash 69d9b813 unchanged — iter 43 doc-only)."
git push origin main
```

## Точка остановки

iter 43 полностью завершён. KI#33 🟡 NEW (documented, fix deferred to iter 44+). Архив загружен, git-команды подготовлены.

**iter 44+ Roadmap:**

**MEDIUM priority (новое, iter 43 обнаружено):**
- **KI#33 fix — canon→master HTML sync (iter 44+).** 57 audit правок KI#21 + KI#25-31 fixes проверить на применимость к master HTML. Content fixes (OCEAN labels, cross-refs, A1-A10, B1-B6, D1-D7) — sync в `src/master/*.html`. Metadata fixes (YAML front-matter, callout labels) — skip. После каждого Part: `pnpm run build` + `validate:master` + visual diff. Regression test `scripts/audit_canon_master_sync.py` (NEW, planned). Build hash изменится (впервые с iter 34).

**LOW priority (deferred from iter 42):**
- **Glossary double-render inefficiency** — LOW, structural by design
- **Component extracts regeneration (опционально)** — LOW, нет business value пока extracts не используются

**Invariants (iter 43+):** see STATUS.md § Invariants

**При обнаружении новых багов — сначала документировать в STATUS.md как KI#N, потом фиксить.**

**Для старта iter 44:** прочитай STATUS.md (iter 43 record), worklog.md (iter 43 = самый подробный), AGENT_NAVIGATION.md (§2a Deployment Pipeline iter 43+ + §8 OP-1 iter 43 row + iter 44+ roadmap + «Подсказка следующему агенту» в конце). Build hash baseline `69d9b813`. **Приоритет iter 44: KI#33 fix — canon→master HTML sync (MEDIUM).**
