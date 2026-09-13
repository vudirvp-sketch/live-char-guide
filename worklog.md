# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-119-lazy-loader-resilience
Agent: main
Task: Fix the owner-reported "unstable tables/visualizations/widgets on the published site" — the previous research session (BASE `bd06f8a1`, no commit) had structurally confirmed the mechanism in `src/shell/lazy-loader.js:659-668` (per-part fetch with silent `.catch()`) but could not runtime-verify it (no headless browser in that environment). Owner directive this session: study the problems and resolve them, choosing the variant that maximizes benefits while neutralizing drawbacks.

Work Log:
- 0: Preflight per `AGENTS.md`: `BASE_COMMIT = 3a28a5dc0a5ce7730f07cf5f1de8b24aa191136d` (post-iter-118 backlog-audit commit), worktree clean. pnpm@10.33.0 installed. Live deploy verified fresh: live `assets/lazy-loader.js` byte-identical to repo root fallback (sha256 match); live cache headers confirmed `cache-control: max-age=600` on HTML/JS/parts (deploy-window skew bounded to 10 min — informs the deferred cache-bust row).
- 1: Baseline BEFORE edits (full battery at BASE): build PASS (hash `2ab607d6`) · validate 5/5 + SHELL-* · validate:master 12/12 · version:check 9.2.6 · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · qa:english 19 / qa:syntax 247 (baselines) · qa:doc-versions "PASS" (blind, KI#67). Matches iter-118 records.
- 2: Research findings re-verified in code: silent `.catch()` at old lines 659-668 confirmed; 11 part files in manifest (~450 KB, largest part_07a 83 KB); parts carry ZERO `<script>` tags (grep over `parts/` + `src/master/`) → `executeInlineScripts` no-op on part content (re-run safe); no `#content > section` direct-child selectors anywhere (splicing safe); `.callout`/`.copy-btn`/`.panel-btn` CSS inspected for the placeholder/button design.
- 3: Solution selection (owner's multi-variant directive): A log-only — rejected (invisible to users, no recovery); B retry-only — rejected (persistent failures stay silent); C banner-only — rejected (transient blips demand manual user action); **D retry + in-place visible placeholder + surgical one-click re-fetch + console diagnostics — CHOSEN** (self-heals transient failures, surfaces persistent ones in place at the gap, gives one-click recovery preserving scroll, keeps devs informed; cons of A/B/C neutralized, con of D — code volume — kept ~120 lines + 24 CSS lines, no new dependencies); E architectural bundling — rejected (research explicitly scoped the fix as non-architectural). Cache-busting assessed as OPTIONAL (max-age=600 bounds the skew) → deferred to PLAN row `cache-bust-1` with design notes.
- 4: **KI#69** opened + fixed + CLOSED (in scope per owner directive): `src/shell/lazy-loader.js` — new `PART FETCH RESILIENCE` section: `fetchPartHtml()` (2 retries, backoff 300/900 ms from `CONFIG.PARTS_RETRY_DELAYS_MS`; network errors/5xx/429 retried; other 4xx fail fast — request-count-proven), `escapeHtml()` helper, `partErrorHtml()` (in-place `role=alert` callout, Russian, `data-part-file` hook), `wirePartRetryButtons()` (idempotent), `retryFailedPart()` (surgical single-part re-fetch → splice children → re-run `executeInlineScripts` + `initInteractiveElements` + `generateTOC` + `initActivePartHighlighting` + `handleAnchor`, all re-entrant); `loadContent()` fetch block replaced (per-part result objects, failure summary `console.warn`, placeholder wiring); manifest-error branch: visible callout + retry button wired to `loadContent()` + **pre-existing `content-hidden` invisibility fixed** (`#content.content-hidden { display:none }` was never lifted in the catch — the old error message was invisible too; found BY the runtime suite, not by inspection).
- 5: `src/shell/styles.css`: `/* === LOAD ERROR (runtime UI — injected by lazy-loader.js, KI#69; not a content component) === */` — `.load-error` (error accent, mirrors `.callout.rule` palette), `.load-retry-btn` (copy-btn/panel-btn recipe: `--bg-elevated`/`--border`/`--accent-soft` hover, focus-visible outline, disabled state), light-theme overrides. Runtime-UI classes live in shell CSS (same domain as `.copy-btn`/`.pre-wrapper`), NOT in the `docs/components.md` content registry (fence #7 governs master HTML classes).
- 6: **KI#70 opened (deferred, owner-gated):** discovered during verification prep — `parts/manifest.json` carries `appendices` (3 files) that `lazy-loader.js` never reads (only `manifest.parts`); appendices A/B/C never render; auto-injected TOC `#appendix_*` links dead (built `part_01.html:414+`); `git log -S "appendices"` on lazy-loader = zero commits ever. Systematic, same symptom family. Per scope discipline: record → defer → PLAN row `ki-70`. NOT fixed here (activating never-exercised `mbti-composer`+appendix paths is its own iteration).
- 7: **Runtime verification (the gap the previous research could not close):** headless Chrome (repo's own `puppeteer` devDependency + cached Chrome 152, `--no-sandbox`) + fault-injecting static server (status/flaky/drop rules, per-path request counters, `Connection: close` for deterministic socket-level faults). Suite at sandbox `/home/z/my-project/scripts/verify_ki69.mjs` (not a repo file — tooling). 48/48 checks: S1 clean (93 sections, 0 placeholders, no page errors) · S2 persistent 503 part_07a (placeholder in exact position between p6/p7b sections, role=alert, 3 attempts, healthy parts fetched once, warn names file+status, part_08 fully intact) · S3 transient 503 ×2 → auto-recovery, no placeholder, no false warnings · S4 connection drop → network-error path retried 3× · S5 404 → fail-fast exactly 1 attempt · S6 manual retry → surgical recovery, TOC regenerated, scroll preserved (site CSS `scroll-behavior:smooth` neutralized in-test for determinism), part_09 live (11 sections) · S7 manifest 500 → visible callout + full-reload retry. BASE control (git worktree at `3a28a5dc`): B2/B3 reproduce the SILENT failure exactly (HTML comment, 80 sections, zero console signal) — before/after causality proven. VLM visual check of screenshots: red-bordered callout, correct Russian text, visible button, clean inline flow.
- 8: Verification battery AFTER edits (final state, incl. the content-hidden fix): build PASS (hash `2ab607d6` unchanged — `src/shell/index.html` untouched) · validate 5/5 + SHELL-* · validate:master 12/12 · version:check 9.2.6 · tests 64/64 · qa:csp/bundle/contrast PASS · qa:english 19 / qa:syntax 247 (baselines unchanged — both scanners read `src/master/` only) · canon sync 97/97 · drift exit 0 · `pnpm run lint` 0 errors (1 pre-existing warning in `vs-e10-enneagram.js`, untouched) · `git diff --check` clean.
- 9: Delivery audit: `git status --short` = exactly 5 files (2 src + 3 regenerated root fallbacks: `assets/lazy-loader.js`, `assets/shell-styles.css`, `index.html` build timestamp); `git diff --stat 3a28a5dc` reviewed — only intended files; base worktree removed. Archive: changed files + `BASE_COMMIT.txt` + `DELETED_PATHS.txt` (none), no `.git`/caches.

Stage Summary:
- **iter 119 COMPLETE — KI#69 fixed (lazy-loader per-part fetch resilience), KI#70 opened+deferred (appendices never runtime-loaded).** Files: `src/shell/lazy-loader.js` (+~130 lines: retry/backoff, placeholders, surgical retry, manifest retry, content-hidden fix) · `src/shell/styles.css` (+24 lines: `.load-error` / `.load-retry-btn` + light theme) · `STATUS.md` (iter 119, KI#69 CLOSED, KI#70 OPEN, Next step re-pinned) · `worklog.md` (this entry) · `CHANGELOG.md` (iter-119 entry; iter-116 collapsed) · `PLAN.md` (+ki-70 owner-gated row, +cache-bust-1 row) · `DECISIONS.md` (DEC-14) · regenerated: `assets/lazy-loader.js` + `assets/shell-styles.css` + `index.html` (build timestamp).
- **Verified after edits:** runtime suite 48/48 (7 fault scenarios + 3 BASE controls) · full battery green (see step 8) · hash `2ab607d6` unchanged · baselines 19/247 unchanged.
- **Scope note:** 7 authored files (2 source + 5 state docs mandated by repo law) + 3 build-regenerated fallbacks — soft limit 3-5 exceeded by state docs + regen only, target work = 2 source files.
- **Deferred:** ki-70 (appendix runtime loading — owner-gated, PLAN row with runtime-verification plan) · cache-bust-1 (deploy-window skew, max-age=600-bounded, PLAN row with 3 design variants) · ki-67, obs-3, obs-4, ed-* (unchanged) · real-network confirmation on throttled mobile (optional — mechanism proven by fault injection; noted in PLAN cache-bust row).

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

Task ID: iter-114-dead-css-vs-styles-cleanup (one-line summary)
- iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css`: SECTION 3 (VS Shared Patterns P1–P6, 196 lines) + 12 dead SECTION 4 utility blocks (211 lines) removed. 407 lines total, ~10.2 KB. 1 source + 3 docs + 2 auto-regen. Canon sync 97/97. Build hash 2ab607d6 unchanged. 0 new English leaks.

---

Task ID: iter-113-mermaid-removal (one-line summary)
- iter 113 — Mermaid infrastructure removal: `mermaid-init.js` deleted (141 lines) + CDN script + lazy-loader init/render block + `reRenderMermaid()` + `.mermaid` CSS. CSP tightened (script-src dropped CDN, worker-src directive dropped). 3 source + 1 deleted + 4 docs + 6 auto-regen. Canon sync 97/97. Build hash c5c429e2 → 2ab607d6. 0 new English leaks.

---

Task ID: iter-112-dead-code-cleanup (one-line summary)
- iter 112 — Dead code cleanup: removed 4 dead widgets (`diagnostic-tree`, `blueprint-viewer`, `author-note-viewer`, `vs-e15-blueprint`, 339 lines JS) + 4 script tags + 3 initAll() calls + `.fi26-*` CSS utilities (262 lines). 601 lines total. 3 source + 4 deleted + 3 docs + 6 auto-regen. Canon sync 97/97. Build hash f70870c0 → c5c429e2. 0 new English leaks.

---

Task ID: iter-111-voice-hierarchy-widget (one-line summary)
- iter 111 — Fork D (part 1/3): `persona-voice-hierarchy` interactive widget (16th) for §3.2 — model-tier toggle + hover-sync + MD export. Combined design in ~290 lines JS. Canon-embedded data (6×3 from §3.2 table) — exception to data/*.json rule. Fixed naming drift in `part_07a.md` (p3_voice_hierarchy → p3_influence_hierarchy). 7 source + 6 auto-regen. Canon sync 97/97. Build hash 8499b4e3 → f70870c0. 0 new English leaks.

---

Task ID: iter-110-multilingual-forks-abc (one-line summary)
- iter 110 — Multilingual forks A+B+C: layered SP language rule (12B<64K→EN, ≥128K 12B-14B→either, 32B+/API→card lang) + Identity name-language rule (canonical form preserved) + Script Tax/Vocabulary Size as new Model Table concepts + Token Budget Script Tax RULE. Fork D deferred. 9 source + 6 auto-regenerated. Canon sync 97/97. Build hash 8499b4e3 unchanged. 0 new English leaks.
