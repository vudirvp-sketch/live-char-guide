# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Текущая версия:** 9.1.0 + docs restructure iter 3
> **Дата:** 2026-06-23

---

## Текущее состояние

**iter 3 (orphan scripts cleanup + pitfalls expansion): KI#8 и KI#9 закрыты.**

iter 1 создал docs-инфраструктуру. iter 2 закрыл 6 KI из iter 1 и обнаружил 2 новых (KI#7 закрыт, KI#8 отложен в iter 3). iter 3 разобрал KI#8 (orphan migration-validation trio), обнаружил и закрыл KI#9 (stale `DELETIONS-iter2.txt`), расширил §6 pitfalls с 18 до ~30, уточнил §1 scripts/ list с orphan-маркировкой.

### Что сделано в iter 3

**KI#8 — `scripts/validate-migration.mjs` + `gen-redirect-map.mjs` + `docs/migration_map.md` (orphan)** → CLOSED (option a — delete).
Анализ:
- `validate-migration.mjs` (888 строк, v2.0.0) — валидирует v7→v8 / v5.12→v6 migration. При текущей v9.1.0 — миграция 4 major версий назад. Не в `package.json`, не в CI workflows, не в pre-commit hook.
- `gen-redirect-map.mjs` (257 строк, v1.0.0) — генерирует `data/anchor-redirects.json` из `docs/migration_map.md`. Orphan аналогично.
- `docs/migration_map.md` (586 строк) — depended on только двумя orphan-скриптами выше.
- `data/anchor-redirects.json` — KEEP. Runtime data, загружается `src/shell/lazy-loader.js` строки 67-81. Hardcoded fallback в lazy-loader.js (строки 51-62) обеспечивает работу без JSON.

Решение: удалить все 3 orphan-файла. `data/anchor-redirects.json` остаётся committed статическим артефактом. Все 3 файла сохранятся в git history (commit `f97057d` и ранее).

**KI#9 (NEW, найден в iter 3) — `DELETIONS-iter2.txt` создан в iter 2, но не удалён** → CLOSED.
Iter 2 commit `f97057d` добавил `DELETIONS-iter2.txt` (13 строк) — cleanup-instruction file из poe2-regex-ru конвенции. Это stale-конвенция: iter 2 уже удалил `DELETIONS-iter1.txt` (KI#7) с пометкой "больше не нужен после iter 2", но при этом создал `DELETIONS-iter2.txt` для собственных удалений. Противоречие. В iter 3 удалён.

**AGENT_NAVIGATION §6 pitfalls расширены с 18 до 30 пунктов.** Добавлены pitfalls из FIX-04..31 commit messages:
- #19 dual assembly pipeline consolidation (FIX-04)
- #20 token budget misplacement (FIX-05)
- #21 CORE DIRECTIVES numbering conflict (FIX-06)
- #22 content duplication 25-30% (FIX-07)
- #23 dead SPINE-validator removal (FIX-09)
- #24 SVG CSS variables fix (FIX-10)
- #25 WCAG contrast / hardcoded rgba → CSS variables (FIX-11..19)
- #26 responsive breakpoints / aria-label quotes / E07 invisible bars (FIX-11..19)
- #27 Mermaid CDN dependency (дополнение к #9, FIX-25 + FIX-26)
- #28 code quality pass (FIX-27)
- #29 final a11y pass (FIX-31)
- #30 orphan scripts audit (new meta-pitfall из iter 3 findings)

**AGENT_NAVIGATION §1 scripts/ list уточнён.** Скрипты классифицированы:
- **package.json-wired (5):** `build-unified.mjs`, `src/scripts/build-shell-unified.mjs`, `validate-artifact.mjs`, `validate-master.mjs`, `version-sync.mjs`.
- **CI-wired (2 Python):** `check_duplicates.py`, `validate_terms.py` — в `.github/workflows/validate.yml` + `build-artifact.yml`, но НЕ в `package.json`.
- **Orphan QA tools (5, KEEP):** `csp_check.mjs`, `bundle_check.mjs`, `contrast_checker.mjs`, `check_english.py`, `check_syntax_mix.py`, `check-doc-versions.mjs`, `test-interactive.mjs` — не wired, но могут запускаться вручную для ad-hoc QA.
- **Removed in iter 3 (2):** `validate-migration.mjs`, `gen-redirect-map.mjs` — orphan + depended on deleted `migration_map.md`.

**terminology_dictionary.md:** Stale ref `p7_core_directives` → `p7a_core_directives` (v9.1 Part 7 split). Header version 9.0.0 → 9.1.0.

**visual-system/PLAN.md:** Appendix E §2 + Appendix F §2 "Recommended Follow-up Actions" §2 содержали рекомендацию "Clean up root fallback files: gitignore root-level index.html, assets/, widgets/, parts/, data/, event-bus.js". Это противоречит iter 2 KI#1/KI#2 resolution (root fallbacks — by design per `.gitignore` строки 22-30). Добавлены пометки [OBSOLETE per iter 2 KI#1/KI#2] без переписывания файла.

### Изменённые файлы в iter 3

| File | Action | Reason |
|------|--------|--------|
| `STATUS.md` | Updated | This file — iter 3 status + KI#8/KI#9 resolution |
| `worklog.md` | Updated | Appended iter 3 Task ID section, iter 2 → one-liner |
| `AGENT_NAVIGATION.md` | Updated | Header iter 3, §1 scripts classification, §6 pitfalls 18→30, §7 deletions iter 3, §8 OP-1 progress, hint iter 4 |
| `CHANGELOG.md` | Updated | Added [9.1.3] (iter 3) section |
| `PLAN.md` | Updated | §5 iter 3 status + iter 4+ remaining |
| `docs/terminology_dictionary.md` | Updated | Stale `p7_core_directives` → `p7a_core_directives`; version 9.0.0 → 9.1.0 |
| `visual-system/PLAN.md` | Updated | Appendix E §2 + F §2 marked [OBSOLETE per iter 2 KI#1/KI#2] |
| `DELETIONS-iter2.txt` | **Deleted** | KI#9: stale cleanup-instruction file, iter 2 противоречие |
| `scripts/validate-migration.mjs` | **Deleted** | KI#8: orphan, validates 4-major-versions-old migration |
| `scripts/gen-redirect-map.mjs` | **Deleted** | KI#8: orphan, generator for already-committed `data/anchor-redirects.json` |
| `docs/migration_map.md` | **Deleted** | KI#8: only depended on by 2 orphan scripts above |

---

## Known Issues

KI#1..KI#9 — все закрыты. Активных Known Issues нет.

**История KI (все CLOSED):**
- KI#1..KI#6 (iter 1) — закрыты в iter 2.
- KI#7 (iter 2) — закрыт в iter 2.
- KI#8 (iter 2, deferred to iter 3) — закрыт в iter 3 (option a: delete orphan trio).
- KI#9 (iter 3) — закрыт в iter 3.

---

## Подтверждённые ограничения

| Ограничение | Описание |
|-------------|----------|
| **Root fallbacks committed to git** | `index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash` в корне repo — это regenerated root fallbacks для GitHub Pages backward compat. Не gitignored (см. `.gitignore` строки 22-30). CI/CD деплоит из `dist/`, но fallbacks обеспечивают работу без CI/CD. **Не редактировать напрямую** — regenerated на каждом `pnpm run build`. |
| **Только linear single-pass** | Нет слоёв, тиров, уровней глубины. Каждый читатель видит все секции. |
| **Model capability через `[MODEL_NOTE: text]`** | Не через layer separation, а inline-метки. |
| **CORE DIRECTIVES на English** | Directives в System Prompt — English. Guide prose — Russian. |
| **Bracket format для примеров** | `[SYSTEM]/[DESCRIPTION]/[EXAMPLES]/[ANCHORS]`. XML-теги только внутри Description. |
| **English technical terms в Russian prose** | SP, Description, Examples, Greeting, Lorebook, SPINE, GHOST, OCEAN, Enneagram, LIE, FLAW, NEED, WANT, T→A→P, CoT, Embodiment, CORE DIRECTIVES, Sampling params, 12B/32B/API, Part N, AP-N. |
| **Node >= 20, pnpm 10.x** | JavaScript runtime + package manager. |
| **Python 3.10+** | Для CI-wired скриптов (`check_duplicates.py`, `validate_terms.py`) и orphan QA tools (`check_english.py`, `check_syntax_mix.py`). |
| **GitHub Pages deploy** | Через GitHub Actions на push в main. Деплой из `dist/`. |
| **Orphan QA scripts not wired** | `csp_check.mjs`, `bundle_check.mjs`, `contrast_checker.mjs`, `check_english.py`, `check_syntax_mix.py`, `check-doc-versions.mjs`, `test-interactive.mjs` — не в `package.json`, не в CI. Запускаются вручную. Wire в package.json — iter 4+ decision. |

---

## Контакты

- Issues/PR: [github.com/vudirvp-sketch/live-char-guide/issues](https://github.com/vudirvp-sketch/live-char-guide/issues)
- Автор: TITAN FUSE Team
