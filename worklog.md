# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-124-vs-fix
Agent: main
Task: Owner-commissioned (chat, 2026-09-14: «приступай к исправлению проблем по файлу vs-investigation-brief-v2.md») — fix the confirmed VS-EMBED defects documented in the uploaded investigation brief `vs-investigation-brief-v2.md` (E06/E10 + widget), run as its own iteration (not the pinned Next-step row), under the Bug→doc→fix lifecycle.

Work Log:
- 0: Preflight: `BASE_COMMIT = 8b632e9130a2d13c50fdd6eb4293ccf42f18e2b3` (iter 123, ru-policy — same base the brief was fact-checked against), worktree clean. Laws read (`AGENTS.md`, `STATUS.md`, `AGENT_NAVIGATION.md` §1/§4/§5/§6/§10). Reading gradient honored: huge files grepped, never opened entirely.
- 1: **Brief verification (every FACT re-derived in-repo before editing):** E06 master architecture `part_04.html:521+` (absolute `.ring-label` overlays, tops 8/38/65%, rings cx=260/600, full-canvas gradient rect, SVG `<text>` byte-duplicating HTML labels, literal hex `#8b95a8/#6b7590/#e2e6ed` + hardcoded fonts, gradient stop `#08090d`) · E06 CSS `vs-styles.css` SECTION 5 · E10 master `part_05.html:423+` (hexad 3/6: 1→4, 4→2, 2→8 only; stress 9→6 ✓ + 6→1 ✗(JSON: 6→3); growth 6→9 ✓ + 9→1 ✗(JSON: 9→3); no markers) · `data/enneagram.json` directions verified (6 stress→3, 9 growth→3, names Перфекционист/Достигатель/Челленджер) · widget `vs-e10-enneagram.js:21-31` hardcoded data + no clamp/guards (prototype `E10-enneagram-spine.html:355+` has them) · `vs-scroll-observer.js` 11-class selector + `audit_vs_embeds.py` logic reviewed (no new animation classes → no regression path) · canon part_04 §4.11 / part_05 §5.4–5.5 semantics checked (canon prescribes rings + type→SPINE mapping; no dual-label requirement).
- 2: **KIs recorded first** (STATUS.md): KI#73 E06 layout, KI#74 E06 duplication+literal colors, KI#75 E10 graph, KI#76 widget data+clamp — then fixed in scope.
- 3: **E06 fix (`src/master/part_04.html` + `src/assets/vs-styles.css`):** restructured to `.ghost-rings-visual` (geometry-only SVG; rings re-centered cx=300; 6 duplicated `<text>` labels removed; gradient stop → rgba(8,9,13,0)) + `.ghost-rings-annotations` (3 HTML labels, static flow); CSS: flex two-column (desktop), column stack ≤768px with `flex: 0 0 auto` reset (first draft missed the column-direction flex-basis=height trap — caught by runtime check, fixed); dead `ring-text-anim` rules + `vs-ki13-ring-delay-600…850` removed; KI#13 circle delays 0/200/400/500 and title color overrides kept. Class names kebab-case (not BEM `__`) — avoids a `check_syntax_mix.py` `__text__` false positive that briefly bumped the 247 baseline (247→248→restored after rename; verified by per-file counts).
- 4: **E10 fix (`src/master/part_05.html`):** hexad completed (8-5, 5-7, 7-1 added); stress 6→1 → 6→3, growth 9→1 → 9→3; `<defs>` arrow markers (userSpaceOnUse 12u, `var(--danger)/var(--success)` fills — KI#41 convention, verified resolving in computed styles both themes); direction lines trimmed to node edges (r=22+gap) — first draft put arrowheads at node centers where they were hidden UNDER the node circles (caught by pixel probe + VLM on 2x screenshot); legibility: stroke 0.5→1.25, opacity 0.2→0.6, dash 3 3→5 3; shared 9-6 segment (carries stress 9→6 + growth 6→9) offset ±3.5u perpendicular so both render as distinct parallel dashed lines; static mini-card defaults aligned to `data/enneagram.json` type-4 wording.
- 5: **Widget fix (`src/shell/widgets/vs-e10-enneagram.js`):** hardcoded `enneagramData` removed → `WidgetUtils.fetchJson('data/enneagram.json')` (same pattern as `enneagram-builder.js`; field map name/core_fear/core_desire/lie_template/flaw_pattern; failures return null → retried on next hover); prototype-parity right-edge clamp (cardWidth 220, maxLeft = wrap − 230) + ctm/hidden guards; aria-labels applied from canonical names after load; hover/focus/blur/mouseleave + MutationObserver architecture preserved. Bonus: pre-existing eslint warning (unused `e`) eliminated — lint now 0/0.
- 6: **Verification (all actually executed):** `pnpm run build` PASS (hash `2ab607d6` unchanged) · `pnpm run validate` 5/5 + SHELL-* · `pnpm run validate:master` 12/12, 17 warnings = byte-identical count at BASE (stash-diff verified) · `pnpm run version:check` 9.2.6 · `pnpm test` 64/64 (after keeping the regenerated root `index.html` per DEC-11 — src/ touched, so restore rule N/A; the root==dist test initially failed against the restored timestamp, resolved by re-staging the regenerated file) · `python3 scripts/audit_canon_master_sync.py` 97/97 · `audit_vs_embeds.py` no regressions · qa:csp/bundle/contrast PASS · qa:english 18 / qa:syntax 247 (both = baseline; syntax briefly 248 from BEM `__` false positive — fixed by rename) · `npx eslint src/` 0 errors 0 warnings · `git diff --check` clean · **headless-Chrome runtime suite 30/30** (served `dist/`, cached Chrome 152 via puppeteer executablePath; deterministic themes via `emulateMediaFeatures` — headless defaults to prefers-color-scheme:light which auto-applies `body.theme-light`): E06 flex two-column/no overlap/no SVG texts/cx=300/labels is-visible/rings scale(1)/mobile stack+auto-basis/embed fits 375px; E10 6 hexad endpoints 1-4-2-8-5-7-1/stress+growth = JSON/markers/markers resolve var()/hover shows «Тип 1 — Перфекционист» (canonical, not «Реформатор»)/clamp keeps card inside/aria «Тип 7 — Энтузиаст»; dark tokens rgb(30,36,48) + light rgb(229,231,235) both resolve · **VLM screenshot review**: E06 dark+light = "clean two-column composition, no overlap, readable"; E10 = "arrowheads visible near nodes 3, 6, 9; red/green distinct; excellent legibility" (after the two caught-and-fixed draft defects).
- 7: **Out-of-scope findings → recorded, deferred (scope discipline):** page-wide mobile horizontal overflow 616px@375px viewport (pre-existing — byte-identical at BASE via stash+rebuild comparison; some content table extends past `.table-wrap`; obs-5) · E09 master literal-hex strokes (`#1e2430` pentagon outlines + vivid node fills; KI#41/42 class; PLAN vs-e09-hex) · prototype mini-maps list only E01–E17 (E18 missing; prototype-only, not deployed; recorded in vs-audit row) · `.vs-embed` frame reads as a "dark rectangle" near node 1 in VLM review (pre-existing component chrome, DOM stack verified clean) · owner-supplied embeds = runtime DOM snapshots (`is-visible`, inline mini-card coords) — no repo serializer exists; nothing depends on them (owner question recorded in Next step 7).
- 8: **State docs:** STATUS.md (iter 124, KI#73–76 CLOSED, KI#67/KI#71 deleted per 2+-iteration lifecycle rule, invariants updated vs-styles 3245 lines + widget data source, Next step row 7 added) · this entry (iter-123/122 collapsed to one-liners; iter-114/113 dropped per ≤10 cap) · CHANGELOG.md iter-124 entry (iter-121 collapsed) · PLAN.md (vs-audit + vs-e09-hex backlog rows, obs-5, completed track vs-fix-1).

Stage Summary:
- **iter 124 COMPLETE — E06/E10 confirmed defects fixed and runtime-verified; all four KIs closed same iteration.** Acceptance: E06 desktop = real annotation column, no overlap (runtime + VLM) ✓; E06 mobile reflow preserved ✓; E06 Light-theme text defect class eliminated ✓; E10 graph = `data/enneagram.json` truth (6/6 hexad, 4/4 directions correct, arrows visible) ✓; fence #8 restored for `vs-e10-enneagram` ✓; clamp + guards ported ✓; battery green with unchanged baselines ✓.
- **Files (9 + 4 docs = 13):** `src/master/part_04.html` · `src/master/part_05.html` · `src/assets/vs-styles.css` · `src/shell/widgets/vs-e10-enneagram.js` + regenerated root fallbacks `index.html` · `parts/part_04.html` · `parts/part_05.html` · `assets/vs-styles.css` · `widgets/vs-e10-enneagram.js` + docs `STATUS.md` · `worklog.md` · `CHANGELOG.md` · `PLAN.md`. No deletions. Prototype/extract files untouched (KI#32 drift family — accepted; regeneration owner-gated).
- **Open KIs:** KI#70 (appendices, owner-gated) · KI#72 (sampling values). Next: unchanged backlog + vs follow-ups (vs-audit, vs-e09-hex, embed-provenance owner question).

---

Task ID: iter-123-ru-policy-russification (one-line summary)
- iter 123 — ru-policy: two-layer guide language policy (DEC-16) + full russification (19 canon + 14 master + 15 root fallbacks); qa:english re-baselined 19→18; battery green, hash `2ab607d6` unchanged. Detail: git (iter-123 commit).

---

Task ID: iter-122-ed-policy-adoption (one-line summary)
- iter 122 — ed-policy: Editorial Policy adopted as content-editing law (owner-amended verbatim text → `AGENTS.md` + fence #13, `_README.md` §4.4, DEC-15); doc-only. Detail: git (iter-122 commit).

---

Task ID: iter-121-ed6-repo-meta-strip (one-line summary)
- iter 121 — ed-6 reader/repo-metadata separation (rendered prose zero `KI#…`/`iter NN`) + KI#71 CLOSED; canon-first Part 1/7A/8 edits + master mirrors, deliverables rebuilt, drift actionable 134→133. Full battery green, hash `2ab607d6` unchanged. Detail: git (iter-121 commit).

---

Task ID: iter-120-doc-gate-and-editorial-matrix (one-line summary)
- iter 120 — KI#67 fixed (`qa:doc-versions` gate sighted, 8/8 parsed, bold/`**Дата:**` headers) + ed-matrix Phase A delivered (210-row editorial matrix, Parts 1/3/7A/9, R01–R20 registry, 13 compression candidates); KI#71/KI#72 opened. 7 authored files, hash `2ab607d6` unchanged. Detail: git `6fe532b6`.

---

Task ID: iter-119-lazy-loader-resilience (one-line summary)
- iter 119 — Lazy-loader per-part fetch resilience: KI#69 fixed (retry/backoff + in-place `role=alert` placeholders + surgical single-part retry + manifest retry + content-hidden fix), KI#70 opened (appendices never runtime-loaded, owner-gated). Runtime suite 48/48 + battery green, hash `2ab607d6` unchanged. Detail: git `bd2134f0`.


---

Task ID: iter-118-editorial-research-intake (one-line summary)
- iter 118 — Editorial research intake + KI#68 fix ("четырёх" → "пяти" blocks in §1.2, canon+master): research report intaken to `docs/research/` with verification verdicts; editorial tasks recorded in PLAN (ed-policy owner-gated, ed-matrix, ed-1…ed-8); STATUS/worklog/CHANGELOG/NAV updated. 8 authored + 2 regenerated files, hash `2ab607d6` unchanged. Detail: git `bd06f8a1`.

---

Task ID: iter-117-doc-hygiene (one-line summary)
- iter 117 — Documentation hygiene (obs-1/obs-2 closure, doc-only): content_map.md + architecture.md full content pass (headers → 9.2.6, 10 shifted Canon § fixed, tree rebuilt from actual repo), NAV §5 CORE DIRECTIVE #7 → "Pre-Generation Filter", KI#67 + obs-3/obs-4 recorded. 7 files, hash `2ab607d6` unchanged. Detail: git `6d0029ae`.


Task ID: iter-116-agent-ops-rework (one-line summary)
- iter 116 — Agent operating-system rework (meta, doc-only): `AGENTS.md` rewritten as operating law (authority order · preflight · anti-loop · scope discipline · DoD · delivery vs BASE_COMMIT · doc caps); NAV de-historized + §10 information ownership; STATUS → snapshot + authoritative Next step; PLAN → live backlog; `DECISIONS.md` created; README stale "iter 101" line fixed. 7 files + 1 new, hash `2ab607d6` unchanged. Detail: git `01a4f9d1`.

---

Task ID: iter-115-dead-css-shell-styles-cleanup (one-line summary)
- iter 115 — Dead CSS cleanup in `src/shell/styles.css`: V-02/V-06/V-15 V-pattern blocks (240 lines) + 6 specific dead M3 rules (8 lines) removed; 248 lines total, ~5.3 KB. M3 widget CSS confirmed LIVE via 4-axis grep (iter-114 claim disproved). 1 source + 4 docs + 2 auto-regen. Canon sync 97/97. Build hash `2ab607d6` unchanged.

---
