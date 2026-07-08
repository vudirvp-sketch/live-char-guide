# iter 48 — General-purpose drift detector added (KI#34/KI#35 🟡 NEW, found by drift detector)

**Дата:** 2026-07-08
**Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
**commit (после push):** iter 48 — general-purpose drift detector added + KI#34/KI#35 NEW

---

## Что сделано в iter 48

Создан **новый informational скрипт** `scripts/audit_canon_master_drift.py` (~440 строк, stdlib only) для структурного сравнения canon ↔ master HTML. Это первый шаг на roadmap iter 48+ «general-purpose drift detector».

**Принцип «better to underdo than to break»:** скрипт НЕ модифицирует рабочий `audit_canon_master_sync.py` (89/89 PASS) — это separate informational tool (exit 0 всегда, не ломает build).

### Архитектура скрипта

1. **Canon parser** — extract H2 headings + collect ALL `` `data-section: <id>` `` declarations (включая под H3 subheadings) для complete coverage.
2. **Master HTML parser** — extract `<section data-section="...">` blocks с поддержкой nested sections (depth tracking). Strip VS-EMBED blocks + HTML comments + tags + decode entities.
3. **Text normalization** — strip markdown syntax (`[ref:...]`, `**bold**`, table pipes, code fences, etc.) для canon; strip HTML для master; lowercase + whitespace collapse.
4. **Comparison:**
   - Section IDs presence drift (canon-only / master-only) — **actionable signal**
   - Heading text mismatch — informational (14 by-design mismatches: `## X.Y Title` vs `<h2>Title</h2>`)
   - MD5 content hash diff — informational (96 expected diffs: VS-EMBEDs vs `[ref:...]` markers)
5. **Output:** human-readable console + optional JSON (`--json PATH`). Exit 0 всегда.

### Найденные actionable KI

| KI | Severity | Description | Status |
|----|----------|-------------|--------|
| **KI#34** | MEDIUM | `p1_prebuild_checklist` §1.8 Pre-build checklist — canon `docs/canon/part_01.md` L128 содержит секцию, master HTML `src/master/part_01.html` НЕ содержит соответствующий `<section data-section="p1_prebuild_checklist">`. Canon имеет 8 data-section IDs vs master 7. | 🟡 NEW (fix deferred to iter 49) |
| **KI#35** | LOW | `p4_spine_overview` — master HTML `src/master/part_04.html` L140 имеет `<section data-section="p4_spine_overview">`, но canon `docs/canon/part_04.md` L12 `## 4.1 SPINE Overview` не имеет `` `data-section: p4_spine_overview` `` декларации. Canon metadata drift, cosmetic. | 🟡 NEW (fix optional) |

### Прочие findings (by design, NOT bugs)

- **3 canon-only sections в canon-only files** (part_00: `p0_how_to_read`, `p0_tldr_quick_start`; appendix_character_map: `appendix_character_map`) — нет master HTML counterpart by design.
- **14 heading mismatches** — все вида `## X.Y Title` (canon) vs `<h2>Title</h2>` (master) — section number prefix рендерится отдельно в master HTML.
- **96 content hash diffs** — informational, expected (master has VS-EMBEDs, expanded HTML, callouts; canon has `[ref:...]` markers, markdown formatting, code fences).

### JSON baseline

`build/drift-report-iter48.json` (29 KB, 1014 строк) сохранён как baseline для future regression comparison.

---

## Validation gates (ALL PASS)

```bash
pnpm run build              # ✅ SUCCESS, shell Hash: 69d9b813 unchanged
                            #    contentHash: 84d69ecffca28cbf UNCHANGED (скрипт не модифицирует master HTML)
pnpm run validate:master    # ✅ 12 checks PASS
pnpm run validate           # ✅ 8 gates PASS, index.html 7.5KB
pnpm run test:unit          # ✅ 43/43 PASS
pnpm run qa:csp             # ✅ 0 inline scripts
pnpm run qa:bundle          # ✅ 7.5KB (max 500KB)
pnpm run qa:doc-versions    # ✅ PASS
python3 scripts/audit_vs_embeds.py             # ✅ 0 regressions (через symlink workaround)
python3 scripts/audit_canon_master_sync.py     # ✅ 89/89 PASS (unchanged)
python3 scripts/audit_canon_master_drift.py    # ✅ informational report (4 canon-only, 1 master-only, 14 heading mismatches by design, 96 content hash diffs informational)
```

---

## Baselines

- **contentHash baseline (iter 47):** `84d69ecffca28cbf`
- **contentHash после iter 48:** `84d69ecffca28cbf` ✅ UNCHANGED (скрипт не модифицирует master HTML)
- **Shell hash baseline (iter 34+):** `69d9b813` ✅ UNCHANGED

---

## Git-команды для обновления репозитория

```bash
cd /path/to/live-char-guide

# Распаковать архив с изменениями (сохраняя структуру папок)
unzip -o iter_48_drift_detector.zip -d /tmp/iter48
# Скопировать изменённые файлы в локальную директорию
cp -r /tmp/iter48/* .

# Установить зависимости (если ещё не установлены)
pnpm install --frozen-lockfile

# Верифицировать baselines
pnpm run build              # Должно вывести: Hash: 69d9b813 (shell hash unchanged)
cat build/build-manifest.json  # contentHash должен быть: sha256:84d69ecffca28cbf

# Прогнать validation gates
pnpm run validate:master    # 12 checks
pnpm run validate           # 8 gates
pnpm run test:unit          # 43/43
pnpm run qa:csp
pnpm run qa:bundle
pnpm run qa:doc-versions
python3 scripts/audit_vs_embeds.py             # 0 regressions (через symlink workaround: ln -sfn $(pwd) /home/z/my-project/work/live-char-guide)
python3 scripts/audit_canon_master_sync.py     # 89/89 PASS
python3 scripts/audit_canon_master_drift.py    # informational report

# Commit + push
git add -A
git status   # проверить, что изменились только ожидаемые файлы
git commit -m "iter 48: general-purpose drift detector added + KI#34/KI#35 NEW (found by drift detector)"
git push origin main
```

---

## Точка остановки

**iter 48 COMPLETE.** General-purpose drift detector `scripts/audit_canon_master_drift.py` deployed (~440 строк, stdlib only, informational only). KI#34 (MEDIUM) + KI#35 (LOW) 🟡 документированы, fix deferred. contentHash UNCHANGED (скрипт не трогает master HTML).

**iter 49+ roadmap:**

| Priority | Task | Notes |
|----------|------|-------|
| **MEDIUM** | **KI#34 fix** | Add `<section data-section="p1_prebuild_checklist">` block в `src/master/part_01.html` (content из canon `docs/canon/part_01.md` L128-145). MEDIUM risk — careful HTML edit + visual verification. После fix: contentHash изменится (5th change since iter 34). Regression test `audit_canon_master_sync.py` расширить с positive check. |
| LOW | KI#35 fix (optional, trivial) | Add `` `data-section: p4_spine_overview` `` line в `docs/canon/part_04.md` после `## 4.1 SPINE Overview`. Cosmetic canon metadata fix. |
| LOW | Semantic paragraph-level drift detection | Расширить `audit_canon_master_drift.py` до paragraph-level Jaccard similarity для matching sections (сейчас только content hash diff). |
| LOW | Glossary double-render inefficiency | Structural, by design (canon = source of truth, HTML = render). |
| LOW | Component extracts regeneration (опционально) | Regenerate 54 файла from master. Нет business value пока extracts не используются. |

**Для старта iter 49+:**
1. Прочитай `STATUS.md` (iter 48 record — drift detector added, KI#34/KI#35 🟡 NEW; iter 47 one-paragraph — KI#33 ✅ CLOSED 57/57).
2. Прочитай `worklog.md` (iter 48 = самый подробный; iter 47 one-liner).
3. Прочитай `AGENT_NAVIGATION.md` (§8 OP-1 iter 48 row + iter 49+ roadmap + «Подсказка следующему агенту»).
4. **contentHash baseline:** `84d69ecffca28cbf` (iter 48 UNCHANGED)
5. **Shell hash baseline:** `69d9b813` (unchanged)
6. **Приоритет iter 49:** MEDIUM priority — fix KI#34 (add missing §1.8 Pre-build checklist section to master HTML). LOW priority — KI#35 fix, semantic drift detection, glossary, component extracts.

**Принцип:** «better to underdo than to break» — если найден новый баг, сначала документируй в `STATUS.md` как KI#N, потом фиксий.
