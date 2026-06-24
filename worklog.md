# Worklog

> Только последняя итерация подробно. Старые — одной строкой. Полная история — в git.

---

Task ID: 19
Agent: main
Task: iter 19 — KI#16 fix. Externalize 2 inline `<script>` блока из `src/shell/index.html` в external widget JS files для `qa:csp` compliance. Validation gates: qa:csp + validate:master + build + validate + test:unit + lint + qa:bundle + qa:doc-versions. Обновить документацию.

Work Log:
- 1: Контекст загружен из STATUS.md (iter 18 COMPLETE, все 10 Parts + 3 Appendix ✅ MIGRATED, KI#13+KI#16+KI#17 ACTIVE), AGENT_NAVIGATION.md (§6 pitfall #34 KI#16 ACTIVE, §8 iter 18 record + iter 19+ roadmap), docs/canon/_README.md (§5 Canon COMPLETE), docs/CONTENT_RESTRUCTURE_PLAN.md (§8 iter 18 stop point + iter 19 priorities: KI#13 + KI#16 + Phase 4 SVG integration), src/shell/index.html (line 24 `document.documentElement.classList.add('js')` + lines 108-126 `mermaid.initialize({...})` = 2 inline scripts), scripts/csp_check.mjs (regex `<script(?![^>]*\bsrc\b)[^>]*>[\s\S]*?<\/script>` — strict 0 inline scripts in root index.html), src/shell/lazy-loader.js lines 685-705 (existing mermaid fallback init with `mermaid._initialized` flag check — redundant init skip mechanism), src/scripts/build-shell-unified.mjs (copies `src/shell/index.html` → `dist/index.html` → root `index.html` + copies `src/shell/widgets/` → `dist/widgets/` → root `widgets/`).
- 2: **Setup environment:** `pnpm install --prefer-offline` OK (deps already cached from iter 18).
- 3: **Baseline `pnpm run qa:csp`** ❌ FAIL — "index.html has 2 inline script(s)" (expected, KI#16).
- 4: **Baseline `pnpm run validate:master`** ✅ PASSED (0 errors, KI#13 baseline = 123 inline styles + 1 orphan section).
- 5: **Created `src/shell/widgets/js-flag.js`** (32 строки incl. JSDoc): tiny external script `document.documentElement.classList.add('js')`. JSDoc объясняет rationale (KI#16 fix, FOUC prevention, sync load in `<head>`).
- 6: **Created `src/shell/widgets/mermaid-init.js`** (45 строк incl. JSDoc): external `mermaid.initialize({...})` с safety guard `if (typeof mermaid !== 'undefined' && typeof mermaid.initialize === 'function')`. Sets `mermaid._initialized = true` — lazy-loader.js line 689 skip redundant init. JSDoc объясняет loading order + safety + reference to AGENT_NAVIGATION §6 pitfall #34.
- 7: **Edited `src/shell/index.html`:** (a) line 24 `<script>document.documentElement.classList.add('js')</script>` → `<script src="widgets/js-flag.js"></script>` с KI#16 fix comment; (b) lines 108-124 inline `<script>mermaid.initialize({...})</script>` → `<script src="widgets/mermaid-init.js"></script>` с KI#16 fix comment. Loading order preserved: mermaid CDN → mermaid-init.js → event-bus.js → widgets → lazy-loader.js.
- 8: **`pnpm run build`** ✅ SUCCESS. Hash `df283246` → `fd3d96d3`. Root `index.html` regenerated (7.2 KB, 0 inline scripts). Root `widgets/` regenerated (15 → 17 files, +2 для js-flag.js + mermaid-init.js). Root `build.hash` regenerated. `dist/` artifact обновлён.
- 9: **`pnpm run qa:csp`** ✅ PASS — "index.html has no inline scripts" + "No eval() usage". KI#16 CLOSED.
- 10: **`pnpm run validate:master`** ✅ PASSED (0 errors, KI#13 baseline, no regression).
- 11: **`pnpm run validate`** ✅ All 8 gates passed (GATE-1..5 + SHELL-PARTS + SHELL-LOADER + SHELL-STYLES).
- 12: **`pnpm run test:unit`** ✅ 43/43 pass.
- 13: **`pnpm run lint`** ✅ 0 errors (13 warnings — 10 pre-existing + 3 new из `mermaid-init.js` `no-undef` для `mermaid` global, matches existing `lazy-loader.js` pattern).
- 14: **`pnpm run qa:bundle`** ✅ PASS (7.2KB, max 500KB).
- 15: **`pnpm run qa:doc-versions`** ✅ PASS.
- 16: **Documentation updates** (clean, no garbage):
  - STATUS.md — rewritten: iter 19 status, KI#16 CLOSED, iter 19 changes table.
  - worklog.md — iter 18 → one-liner, iter 19 = этот record.
  - AGENT_NAVIGATION.md — header iter 18 → iter 19, §6 pitfall #34 → CLOSED (iter 19), §8 iter 19 record + iter 20+ roadmap.
  - CHANGELOG.md — [9.1.19] entry.
  - PLAN.md — §5 iter 19 → ✅ DONE, iter 20+ roadmap.
  - docs/CONTENT_RESTRUCTURE_PLAN.md — §5.2 iter 19 row → ✅ DONE, §8 iter 19 stop point + iter 20 priorities.
  - docs/canon/_README.md — §9 iter 19 entry (KI#16 fix, no Canon changes).

Stage Summary:
- **iter 19 COMPLETE.** KI#16 fixed: 2 inline `<script>` в `src/shell/index.html` → external widget JS (`js-flag.js` + `mermaid-init.js`). `qa:csp` PASS (0 inline scripts). Build hash `df283246` → `fd3d96d3`. Все validation gates PASS.
- **Modified files (14):** src/shell/widgets/js-flag.js (created), src/shell/widgets/mermaid-init.js (created), src/shell/index.html (edited), index.html (regenerated root fallback), widgets/js-flag.js (regenerated root fallback), widgets/mermaid-init.js (regenerated root fallback), build.hash (regenerated), STATUS.md (rewritten), worklog.md (updated), AGENT_NAVIGATION.md (updated), CHANGELOG.md (updated), PLAN.md (updated), docs/CONTENT_RESTRUCTURE_PLAN.md (updated), docs/canon/_README.md (updated).
- **KI#16 CLOSED.** Active KIs: KI#13 (MEDIUM, 123 inline styles) + KI#17 (LOW, fixed iter 10).
- **НЕ сделано (намеренно, iter 20+ задача):**
  1. KI#13 (123 inline styles) — iter 20+
  2. Phase 4 actual SVG integration — iter 20+
- **Точка остановки:** iter 19 done (KI#16 CLOSED, qa:csp PASS). KI#13 + KI#17 ACTIVE. В iter 20+: KI#13 (123 inline styles → external CSS classes) + Phase 4 actual SVG integration — см. `docs/canon/_README.md` §5, `docs/CONTENT_RESTRUCTURE_PLAN.md` §8.

---

## Предыдущие итерации (кратко)

- **iter 18 (2026-06-24)**: Final cleanup — Canon migration COMPLETE. 3 Appendix Canon files (367 строк) + content_map.md cleanup (277→256) + terminology_dictionary.md cleanup (338→206). Все 10 Parts + 3 Appendix ✅ MIGRATED. 12 docs updated.
- **iter 16 (2026-06-24)**: Canon Part 5+6+7B+10 created (1434 строки, 23 секций, 4 VS-маркера) + 4 master HTML мигрированы. 3 compression candidates (#18, #19, #20). validate:master/build/validate/test:unit/lint/qa:bundle/qa:doc-versions PASS. **Все 10 Parts мигрированы — Canon migration complete.**
- **iter 14 (2026-06-24)**: Canon Part 1+2+3 created (739 строк, 21 секций, 4 VS-маркера) + 3 master HTML мигрированы. 4 compression candidates (#14-#17). validate:master PASS. 10 docs updated.
- **iter 13 (2026-06-24)**: Canon Part 9 created (351 строка, 11 секций, E13+E14) + master HTML мигрирован (596 → 582, -2.3%). 1 compression candidate (#13). 10 docs updated.
- **iter 12 (2026-06-24)**: Canon Part 8 created (411 строк, 16 секций, E12) + master HTML мигрирован (521 → 507, -2.7%). 2 compression candidates (#3, #21). 9 docs updated.
- **iter 11 (2026-06-24)**: Part 7A master HTML migrated (1168 → 1137, -2.7%). 4 compression candidates (#22, #26, #42, #46). 9 docs updated.
- **iter 10 (2026-06-24)**: Canon Part 7A created (802 строки, 13 секций, E08/E16/E17/E02). KI#17 NEW. 8 docs updated.
- **iter 9 (2026-06-24)**: Validation pass Part 4. KI#16 NEW (qa:csp). 6 docs updated.
- **iter 8 (2026-06-23)**: Pilot migration Part 4 (777 → 676, -13%). 4 dup viz удалены.
- **iter 7 (2026-06-23)**: Canon scaffold + part_04.md pilot. KI#15 CLOSED.
- **iter 1-6 (2026-06-23)**: docs restructure + KI cleanup. См. CHANGELOG.md.
- **v9.1.0 (2026-05-16)**: FIX-01..FIX-31. См. CHANGELOG.md.
