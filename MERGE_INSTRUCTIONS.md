# iter 22 — Merge Instructions

> **Архив:** `iter22-live-char-guide.tar.gz` (или `.zip`)
> **Дата:** 2026-06-30
> **Версия проекта:** 9.1.0 → 9.1.22 (iter 22 changelog entry)
> **Build hash:** `fd3d96d3` (unchanged — shell not modified, only CSS + HTML content)

---

## Содержание архива

14 файлов, сохранена полная структура папок для слияния с локальной директорией:

```
.
├── AGENT_NAVIGATION.md                (updated — header iter 22, §6 pitfall #36, §8 iter 22 record + iter 23+ roadmap, iter 1-19 history compressed)
├── CHANGELOG.md                       (updated — [9.1.22] entry, iter 1-19 compressed to brief summary section)
├── PLAN.md                            (updated — §5 iter 22 → ✅ DONE, iter 23+ roadmap)
├── STATUS.md                          (rewritten — iter 22 status, KI#13 86/123 fixed = 70%)
├── worklog.md                         (updated — iter 21 → one-liner, iter 22 = detailed record)
├── assets/
│   └── vs-styles.css                  (regenerated root fallback — build artifact, hash unchanged)
├── docs/
│   ├── CONTENT_RESTRUCTURE_PLAN.md    (updated — §5.2 iter 22 row → ✅ DONE, §8 iter 22 stop point + iter 23 priorities)
│   └── canon/
│       └── _README.md                 (updated — §9 iter 22 entry)
├── index.html                         (regenerated root fallback — only timestamp updated, hash unchanged)
├── parts/
│   ├── part_05.html                   (regenerated root fallback — build artifact)
│   └── part_06.html                   (regenerated root fallback — build artifact)
└── src/
    ├── assets/
    │   └── vs-styles.css              (edited — +30 строк SECTION 6, 5 новых селекторов vs-ki13-*)
    └── master/
        ├── part_05.html               (edited — 1 inline style → CSS class, 0 remaining)
        └── part_06.html               (edited — 5 inline styles → CSS classes, 0 remaining)
```

---

## Что было сделано в iter 22

**KI#13 Part 5+6: 6 inline `style=` → 5 CSS селекторов с `vs-ki13-*` prefix.**

### Part 5 (`src/master/part_05.html`) — 1→0 inline styles
- E09 OCEAN Pentagon context-limits footnote: `<span style="color:var(--text-muted); font-size:10px; margin-top:4px; display:block;">` → `<span class="vs-ki13-context-limits-note">` (Elena extreme example note inside `.context-limits-box__data`).

### Part 6 (`src/master/part_06.html`) — 5→0 inline styles
- E11 CoT Tiers progression explanation panel:
  - `<div class="panel" style="max-width:700px;...">` → `<div class="panel vs-ki13-cot-panel">`
  - heading div (cyan accent — distinct от funnel-panel violet) → `<div class="vs-ki13-cot-heading">`
  - `<p style="font-size:13px;...">` → `<p class="vs-ki13-cot-text">`
  - 2 `<strong style="color:var(--text-primary);">` → `<strong>` (covered by descendant selector `.vs-ki13-cot-text strong`)

### Новые CSS селекторы в `src/assets/vs-styles.css` SECTION 6 (+30 строк)

```css
/* --- E09 OCEAN Pentagon — Context limits footnote (iter 22) --- */
.vs-ki13-context-limits-note {
  color: var(--text-muted);
  font-size: 10px;
  margin-top: 4px;
  display: block;
}

/* --- E11 CoT Tiers — Progression explanation panel (iter 22) --- */
.vs-ki13-cot-panel {
  max-width: 700px;
  margin: var(--gap-xl) auto 0;
}

.vs-ki13-cot-heading {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 14px;
  margin-bottom: var(--gap-sm);
  color: var(--accent-cyan);
}

.vs-ki13-cot-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.vs-ki13-cot-text strong {
  color: var(--text-primary);
}
```

### Validation gates — ALL PASS

- `pnpm run validate:master` ✅ (0 errors, 37 inline styles remaining Part 7A+9+10)
- `pnpm run build` ✅ (hash `fd3d96d3` unchanged — shell not modified)
- `pnpm run validate` ✅ (8 gates)
- `pnpm run test:unit` ✅ (43/43)
- `pnpm run lint` ✅ (0 errors, 13 warnings pre-existing)
- `pnpm run qa:csp` ✅ (0 inline scripts)
- `pnpm run qa:bundle` ✅ (7.2KB, max 500KB)
- `pnpm run qa:doc-versions` ✅

### KI#13 progress

| | До iter 22 | После iter 22 |
|---|------------|---------------|
| Fixed | 80/123 (65%) | 86/123 (70%) |
| Remaining | 43 (Part 5+6+7A+9+10) | 37 (Part 7A+9+10) |
| Part 1-6 status | Part 1-4 ✅ DONE | Part 1-6 ✅ DONE |

---

## Как применить архив (merge instructions)

### Вариант A — Слияние через tar (Linux/macOS/Git Bash)

```bash
# Извлечь архив поверх локального репозитория (preserve folder structure)
cd /path/to/local/live-char-guide
tar -xzf /path/to/iter22-live-char-guide.tar.gz
```

### Вариант B — Слияние через unzip

```bash
cd /path/to/local/live-char-guide
unzip -o /path/to/iter22-live-char-guide.zip
```

### После слияния — проверить и закоммитить

```bash
cd /path/to/local/live-char-guide

# 1. Установить зависимости (если ещё не установлены)
pnpm install

# 2. Прогнать validation gates (опционально, для подтверждения)
pnpm run validate:master
pnpm run build
pnpm run validate
pnpm run test:unit
pnpm run lint
pnpm run qa:csp
pnpm run qa:bundle
pnpm run qa:doc-versions

# 3. Проверить diff
git status
git diff --stat

# 4. Закоммитить и запушить
git add -A
git commit -m "[9.1.22] KI#13 Part 5+6: 6 inline styles -> 5 CSS selectors (vs-ki13-*)"
git push origin main
```

---

## Точка остановки для следующего чата

**Iter 22 COMPLETE.** KI#13 Part 5+6 fixed (6 inline styles → 5 CSS селекторов). Part 1-6 ✅ DONE. KI#13 ACTIVE: 86/123 fixed (70%), 37 remaining.

**Iter 23+ priorities:**

1. **iter 23** — KI#13 Part 7A (19 inline styles → CSS classes). Largest remaining batch — Part 7A имеет 13 секций + 4 VS-EMBED (E08/E16/E17/E02). Inline styles в Part 7A:
   - `font-size:10px` ×2 (badge/meta text)
   - `display:none` ×1 (hidden state)
   - `color:var(--accent-violet)` ×3, `color:var(--text-muted)` ×3, `color:var(--danger)` ×1, `color:var(--success)` ×3 (color overrides)
   - `margin-top:4px` ×1, `margin-left:4px` ×4 (spacing)
   - `border-color:var(--accent-cyan)` ×1 (border override)
   - Рекомендация: группировать по semantic intent (см. `docs/CONTENT_RESTRUCTURE_PLAN.md` §8).
2. **iter 24** — KI#13 Part 9 (6) + Part 10 (12) = 18 inline styles. Part 10 имеет 11 positional `top:Npx; right:20px;` styles — кандидат на generic class + per-instance modifier или single selector per position.
3. **iter 25 (optional, low priority)** — Phase 4 SVG integration: Part 7B Greeting algorithm infographic → new VS element E18 (requires `visual-system/elements/` prototyping first).

**Контекст для следующего агента:**

- `STATUS.md` — iter 22 COMPLETE, KI#13 86/123 fixed = 70%, 37 remaining
- `worklog.md` — iter 22 record (detailed), iter 1-21 — one-liners
- `AGENT_NAVIGATION.md` — §6 pitfall #36 KI#13 ACTIVE, §8 iter 23+ roadmap
- `docs/canon/_README.md` — §5 migration status (Canon COMPLETE), §9 iter 22 entry
- `docs/CONTENT_RESTRUCTURE_PLAN.md` — §5.2 iter 23 priorities, §8 stop point + Phase 4 analysis

**Migration principle (iter 8+):** «viz > dry text» — при выборе «удалить текст или визуализацию» viz сохраняется, dry-дублирующий текст удаляется. Unique контент не удаляется.

**KI#13 strategy:** 123→37 remaining (70% fixed). Pattern established: `vs-ki13-*` CSS classes в `vs-styles.css` SECTION 6.

**Если найден новый баг:** сначала документируй в `STATUS.md` как Known Issue (KI#N), потом фиксий.
