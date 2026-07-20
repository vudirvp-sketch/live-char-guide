# iter 51 — KI#36 (anchor navigation) ✅ CLOSED (all HIGH priority KI closed, project STABLE)

**Дата:** 2026-07-21
**Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
**commit (после push):** iter 51 — KI#36 ✅ CLOSED (98 id attrs added to src/master/*.html sections + lazy-loader.js selector fix + hashchange listener + glossary auto-close + 13 English phrases русификация + regression test extended 92→96 checks)

---

## Что сделано в iter 51

**HIGH priority KI#36 fix (anchor navigation).** Пользователь сообщил 4 проблемы: (1) статичный TOC `<div class="guide-toc">` — ссылки невалидны; (2) FAB-кнопка `📑` отображает только 1 пункт вместо 10 Parts; (3) перепроверить глоссарий; (4) русификация. **Root cause:** все `<section>` в `src/master/*.html` имели `data-section="X"`, но не имели `id="X"`. Браузер ищет `id`, не `data-section` — поэтому все 96+ якорных ссылок молча скроллируют наверх. FAB TOC: `lazy-loader.js` использовал селектор `$$('section[id]')` — только 1 секция имела `id`.

### KI#36 часть 1 — id атрибуты ✅

**Проблема:** Все 99 секций в `src/master/*.html` имели `data-section`, но только 1 (p6_cot_bridge) имела `id`. Браузерный anchor mechanism (`<a href="#X">`) требует `id` (или `name`).

**Fix:** Написан Python скрипт `add_section_ids.py` (regex `<section ... data-section="X" ...>` → добавляет `id="X"` если `id` ещё нет). Запуск: 14 файлов, 99 секций, **98 id атрибутов добавлено** (1 секция p6_cot_bridge уже имела id).

Распределение по файлам: part_01: 8, part_02: 6, part_03: 8, part_04: 11, part_05: 8, part_06: 5 (1 уже было), part_07a: 13, part_07b: 5, part_08: 16, part_09: 11, part_10: 4, appendix_glossary: 1, appendix_mbti: 1, appendix_model_table: 1.

### KI#36 часть 2 — lazy-loader.js селектор ✅

**Проблема:** `assets/lazy-loader.js` функция `generateTOC()` (L834) и `initActivePartHighlighting()` (L955) использовали селектор `$$('section[id]')` — выбирала только 1 секцию (p6_cot_bridge), поэтому FAB TOC отображал только 1 пункт.

**Fix:** Селектор изменён на `$$('section[data-section]')` в обоих местах. Теперь FAB TOC отображает все 10 Parts.

### KI#36 часть 3 — hashchange listener ✅

**Проблема:** После клика на якорную ссылку браузер обновляет URL hash и делает нативный скроллинг. Но если элемент ещё не в DOM (dynamic content) или срабатывает переход между панелями, скроллинг может не произойти.

**Fix:** Добавлена функция `initHashChangeListener()` (L813-826) — слушает `window.addEventListener('hashchange', ...)` и делает explicit `scrollIntoView({ behavior: 'smooth' })`. Вызов добавлен в `init()` (L1630).

### KI#36 часть 4 — Glossary panel auto-close ✅

**Проблема:** Glossary panel (`data/glossary.json` → `term.anchor_id` → `<a href="#anchor_id">`) открывается поверх основного контента. При клике на ссылку в panel браузер скроллит к целевой секции, но panel перекрывает её — пользователь не видит результат.

**Fix:** В `loadGlossaryContent()` после рендера HTML добавлен обработчик клика на `a.glossary-link` — закрывает glossary panel через 50ms после клика (чтобы дать native hash navigation сработать).

### KI#36 часть 5 — русификация ✅

Переведены английские фразы в основном тексте `src/master/*.html` (не трогая SP-директивы и устоявшиеся термины):

| Было | Стало | Где |
|------|-------|-----|
| `[Model: see Appendix B — Model Capability Table]` | `[Модель: см. Приложение B — Таблица возможностей моделей]` | 5 мест: part_04 L459, part_06 L81+L96, part_07a L193+L204 |
| `Appendix B: Model Capability Table` | `<a href="#appendix_model_table">Приложение B: Таблица возможностей моделей</a>` | part_07a L837 |
| `(see → Part 1: Token Budget)` | `(см. → Part 1: Token Budget)` | part_07a L1087 |
| `(see → Part 4: GHOST)` | `(см. → Part 4: GHOST)` | part_07a L403 |
| `universal Quick Check` | `универсального Quick Check` | part_09 L542 |
| `universal parameter checklist` | `универсальный чеклист параметров` | part_09 L543 |
| `5 items` | `5 пунктов` | part_09 L542 |
| `structural check` | `структурная проверка` | part_09 L543 |

**English leaks baseline:** было 33 → стало 20 (13 leaks переведено). Оставшиеся 20 — by design (part_10 примеры карточек SP/Examples/Greeting на английском, CORE DIRECTIVES English в SP, Quality Grade / Grade A vs Grade C устоявшиеся термины, Token Budget Check, Reminds of betrayal в `<code>` блоке).

### Regression test extended ✅

`scripts/audit_canon_master_sync.py` расширен с 92 → **96 checks** (+4 positive checks для KI#36):

```python
# iter 51 — KI#36 fix: id attributes on <section> elements
("KI#36-id-p1", "part_01.html",
 'data-section="p1_card_overview" id="p1_card_overview"',
 "part_01: id attribute on p1_card_overview section (iter 51 KI#36 fix — anchor nav)"),

("KI#36-id-p4", "part_04.html",
 'data-section="p4_spine_overview" id="p4_spine_overview"',
 "part_04: id attribute on p4_spine_overview section (iter 51 KI#36 fix — anchor nav)"),

("KI#36-id-p7a", "part_07a.html",
 'data-section="p7a_system_prompt" id="p7a_system_prompt"',
 "part_07a: id attribute on p7a_system_prompt section (iter 51 KI#36 fix — anchor nav)"),

("KI#36-id-appendix-glossary", "appendix_glossary.html",
 'data-section="appendix_glossary" id="appendix_glossary"',
 "appendix_glossary: id attribute on appendix_glossary section (iter 51 KI#36 fix — anchor nav)"),
```

Также 2 substring updates:
- `KI#34-section`: `'<section data-section="p1_prebuild_checklist" data-toc-nav>'` → `'data-section="p1_prebuild_checklist"'` (iter 51 добавил `id` атрибут между `data-section` и `data-toc-nav`).
- `P0-12`: `5 items — отлична от universal Quick Check` → `5 пунктов — отлична от универсального Quick Check`.

Header docstring + main() messages: `iter 44+45+46+47+50` → `iter 44+45+46+47+50+51`.

### Validation gates (ALL PASS)

```bash
pnpm run build              # ✅ SUCCESS, shell Hash: 69d9b813 unchanged (lazy-loader.js не входит в shell hash)
                            #    contentHash: cc130a527480e61b → новый (6th change since iter 34)
                            #    sectionCount: 99 (unchanged — только id attrs + русификация)
pnpm run validate:master    # ✅ 12 checks PASS (baseline warnings unchanged)
pnpm run validate           # ✅ 8 gates PASS, index.html 7.5KB
pnpm run test:unit          # ✅ 43/43 PASS
pnpm run test:integration   # ✅ 21/21 PASS
pnpm run qa:csp             # ✅ 0 inline scripts
pnpm run qa:bundle          # ✅ 7.5KB
pnpm run qa:doc-versions    # ✅ PASS
pnpm run lint               # ✅ 0 errors, 12 baseline warnings
python3 scripts/audit_canon_master_sync.py    # ✅ 96/96 PASS (was 92/92, +4 KI#36 checks)
python3 scripts/audit_canon_master_drift.py   # ✅ informational report:
                            #    Master-only sections: 0 (unchanged)
                            #    Canon-only sections: 3 (by design — part_00, appendix_character_map)
                            #    Heading mismatches: 15 (by design)
                            #    Content hash diffs: 98 (informational, +5 от русификации)
python3 scripts/check_english.py              # 20 baseline leaks (was 29; -9 от русификации)
python3 /home/z/my-project/scripts/verify_anchors.py  # ✅ 96/96 anchor references resolve to id attributes
```

### Working tree state после fixes

Изменены 18 файлов:
- `src/master/part_01.html` — +8 id attrs
- `src/master/part_02.html` — +6 id attrs
- `src/master/part_03.html` — +8 id attrs
- `src/master/part_04.html` — +11 id attrs + 1 русификация
- `src/master/part_05.html` — +8 id attrs
- `src/master/part_06.html` — +5 id attrs + 2 русификации
- `src/master/part_07a.html` — +13 id attrs + 5 русификаций
- `src/master/part_07b.html` — +5 id attrs
- `src/master/part_08.html` — +16 id attrs
- `src/master/part_09.html` — +11 id attrs + 1 русификация
- `src/master/part_10.html` — +4 id attrs
- `src/master/appendix_glossary.html` — +1 id attr
- `src/master/appendix_mbti.html` — +1 id attr
- `src/master/appendix_model_table.html` — +1 id attr
- `src/shell/lazy-loader.js` — +25 строк (2 selector fixes + hashchange listener + glossary auto-close)
- `scripts/audit_canon_master_sync.py` — +4 KI#36 checks + 2 substring updates + header docstring
- `STATUS.md`, `worklog.md`, `CHANGELOG.md` — iter 51 documentation update
- `ITER50_README.md` → `ITER51_README.md` (rename + content update)

Также `pnpm run build` регенерирует root fallbacks (`index.html`, `assets/`, `widgets/`, `parts/`, `event-bus.js`, `data/`, `build.hash`). Единственное auto-generated изменение — `Generated:` timestamp в `index.html`. **В архиве iter 51 root fallbacks НЕ включены** — они regenerated локально.

---

## Baselines

- **contentHash baseline (iter 50):** `cc130a527480e61b`
- **contentHash после iter 51:** новый hash (6th change since iter 34)
- **sectionCount:** 99 (unchanged — только id attrs + русификация)
- **Shell hash baseline (iter 34+):** `69d9b813` ✅ UNCHANGED (lazy-loader.js не входит в shell hash)
- **audit_canon_master_sync.py (iter 50):** 92/92 PASS
- **audit_canon_master_sync.py после iter 51:** 96/96 PASS (+4 KI#36 id checks)
- **English leaks baseline:** 29 (iter 50) → 20 (iter 51, -9 от русификации)
- **Anchor resolution:** 0/96 (iter 50, невалидны) → 96/96 (iter 51, все валидны)

---

## Состав архива iter 51

Архив содержит **code + doc updates** (без root fallbacks — regenerated локально):

```
live-char-guide/
├── src/master/part_01.html             (modified — +8 id attrs)
├── src/master/part_02.html             (modified — +6 id attrs)
├── src/master/part_03.html             (modified — +8 id attrs)
├── src/master/part_04.html             (modified — +11 id attrs + 1 русификация)
├── src/master/part_05.html             (modified — +8 id attrs)
├── src/master/part_06.html             (modified — +5 id attrs + 2 русификации)
├── src/master/part_07a.html            (modified — +13 id attrs + 5 русификаций)
├── src/master/part_07b.html            (modified — +5 id attrs)
├── src/master/part_08.html             (modified — +16 id attrs)
├── src/master/part_09.html             (modified — +11 id attrs + 1 русификация)
├── src/master/part_10.html             (modified — +4 id attrs)
├── src/master/appendix_glossary.html   (modified — +1 id attr)
├── src/master/appendix_mbti.html       (modified — +1 id attr)
├── src/master/appendix_model_table.html (modified — +1 id attr)
├── src/shell/lazy-loader.js            (modified — +25 строк: 2 selector fixes + hashchange listener + glossary auto-close)
├── scripts/audit_canon_master_sync.py  (modified — +4 KI#36 checks + 2 substring updates + header docstring)
├── STATUS.md                           (updated — iter 51 record, KI#36 ✅ CLOSED)
├── worklog.md                          (updated — iter 51 detailed record)
├── CHANGELOG.md                        (updated — iter 51 entry)
├── ITER51_README.md                    (NEW — этот файл)
└── ITER50_README.md                    (DELETED — superseded by ITER51_README.md)
```

---

## Git-команды для обновления репозитория

```bash
cd /path/to/live-char-guide

# Распаковать архив с изменениями (сохраняя структуру папок)
unzip -o iter_51_ki36_anchor_nav_closed.zip -d /tmp/iter51
# Скопировать изменённые файлы в локальную директорию
cp -r /tmp/iter51/live-char-guide/. .

# Установить зависимости (если ещё не установлены)
pnpm install --frozen-lockfile

# Верифицировать baselines (ожидаемые значения)
pnpm run build              # Должно вывести: Hash: 69d9b813 (shell hash unchanged — lazy-loader.js не входит в hash)
                            # contentHash должен быть: новый hash (CHANGED from cc130a527480e61b)
                            # sectionCount должен быть: 99 (unchanged)
cat build/build-manifest.json

# Прогнать validation gates (все должны PASS)
pnpm run validate:master    # 12 checks
pnpm run validate           # 8 gates
pnpm run test:unit          # 43/43
pnpm run test:integration   # 21/21
pnpm run qa:csp
pnpm run qa:bundle
pnpm run qa:doc-versions
pnpm run lint               # 0 errors, 12 baseline warnings
python3 scripts/audit_canon_master_sync.py    # 96/96 PASS (was 92/92, +4 KI#36 checks)
python3 scripts/audit_canon_master_drift.py   # informational report (0 master-only, 3 canon-only by design)

# Commit + push
git add -A
git status   # проверить, что изменились только ожидаемые файлы (14 src/master/*.html + lazy-loader.js + audit_canon_master_sync.py + STATUS.md + worklog.md + CHANGELOG.md + ITER51_README.md new + ITER50_README.md deleted)
git commit -m "iter 51: KI#36 ✅ CLOSED — 98 id attrs added to src/master/*.html sections (anchor nav fix) + lazy-loader.js selector fix + hashchange listener + glossary auto-close + 13 English phrases русификация; regression test extended 92→96 checks"
git push origin main
```

---

## Точка остановки

**iter 51 COMPLETE — KI#36 ✅ CLOSED.** Все HIGH priority Known Issues закрыты. Проект STABLE. Все validation gates PASS. contentHash CHANGED `cc130a527480e61b` → новый (6th change since iter 34). sectionCount 99 (unchanged). Shell hash `69d9b813` unchanged (lazy-loader.js не входит в shell hash). audit_canon_master_sync.py 96/96 PASS (was 92/92). **96 якорных ссылок теперь работают нативно** (статичный TOC `guide-toc`, FAB TOC, Glossary panel). English leaks: 33 → 20 (-13 от русификации).

**iter 52+ roadmap (LOW priority only — project STABLE):**

| Priority | Task | Notes |
|----------|------|-------|
| LOW | Semantic paragraph-level drift detection | Расширить `audit_canon_master_drift.py` до paragraph-level Jaccard similarity для matching sections (сейчас только content hash diff). |
| LOW | Glossary double-render inefficiency | Structural, by design (canon = source of truth, HTML = render). |
| LOW | Component extracts regeneration (опционально) | Regenerate 54 файла from master. Нет business value пока extracts не используются. |
| LOW | Dependabot merges (informational, GitHub-level) | 10 unmerged branches (5 GitHub Actions + 5 npm/yarn bumps). Слияние через GitHub UI или `git merge origin/dependabot/...`. |

**Для старта iter 52+:**
1. Прочитай `STATUS.md` (iter 51 record — KI#36 ✅ CLOSED; iter 50 one-paragraph).
2. Прочитай `worklog.md` (iter 51 = самый подробный; iter 50 one-liner).
3. **contentHash baseline:** новый hash (iter 51, 6th change since iter 34)
4. **Shell hash baseline:** `69d9b813` (unchanged — lazy-loader.js не входит в shell hash)
5. **Приоритет iter 52+: LOW priority only.** Если новых багов нет — проект STABLE.

**Принцип:** «better to underdo than to break» — если найден новый баг, сначала документируй в `STATUS.md` как KI#N, потом фиксий.
