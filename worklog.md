# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-121-ed6-repo-meta-strip
Agent: main
Task: Continue the non-gated backlog per `STATUS.md` Next step #5 (owner directive: continue per the plans — owner-gated rows 1–3 untouched): **ed-6** (reader/repo-metadata separation, canon-first) as the natural carrier for the **KI#71** one-line fix and the stale §7A.12 canon note (dupes-1 second half).

Work Log:
- 0: Preflight per `AGENTS.md`: `BASE_COMMIT = 6fe532b613c8c009fa5deb8c46ddd459a4beb333` (iter 120), worktree clean. pnpm 10.33.0 + deps installed. Reading gradient: content/canon change → canon files first.
- 1: **Evidence base fixed:** R17 registry (`editorial_matrix.md` §24) = 5 Phase-A locations + Part 8 (backlog audit). Full repo-meta inventory re-derived by grep (`KI#|iter \d`) across canon + master: **8 prose locations** — Part 1 §1.2 ×2 (canon-only, master already clean — expected drift direction), Part 7A §7A.1 (stale `[ANCHORS]`/KI#58 note, mirrored), §7A.2 (`(D4, iter 93)`, mirrored), §7A.12 (stale iter-11 migration note, canon-only), Part 8 §8.1 (`iter 55 / KI#38`, mirrored) + KI#71 dup line (canon-only, master has 1 copy — byte-verified via count grep: canon 2 / master 1 / parts 1).
- 2: **Scope decision (scope discipline):** part_06.md L83 `Примечание (iter 29, KI#18-F partial fix)` discovered by the sweep but NOT in R17/PLAN row ed-6 and NOT rendered (no master mirror) → left as-is, recorded as Phase-B discovery (part_00 L13 + appendix_character_map L29 same category — non-rendering canon meta). Part 07b.html L39 `iter 25` — inside E18 VS-EMBED provenance HTML comment (byte-verified in-comment), not prose → left (comments don't render).
- 3: **Canon edits (canon-first):** `part_07a.md` — L31 dup RULE deleted (KI#71); L35 stale note rewritten to 1-sentence reader substance («Канонический формат Anchors — `<anchors>` XML с категориями…» — acceptance criterion requires keeping format-note substance; Part 2 doesn't define the categories, so §7A.1 remains the canonical format location); L82 `(D4, iter 93)` stripped; L616 stale migration note deleted (plain-copy block no longer exists — backlog-audit verified). `part_01.md` — L51 Mermaid/iter-14 history stripped, reader function kept («Оглавление — единственный навигационный артефакт»); L53 build internals (`AUTO_TOC_PLACEHOLDER`, build-скрипт) → «блок „Содержание“ в начале Part 1». `part_08.md` — L25 `iter 55 / KI#38` history sentence removed.
- 4: **Master mirrors (only where mirrors exist):** `src/master/part_07a.html` L30 + L171, `src/master/part_08.html` L220 — exact prose mirrors of the canon edits. Master part_01 untouched (no mirror of the stripped paragraphs).
- 5: **Verification battery (after edits):** `pnpm run build` PASS (hash `2ab607d6` unchanged — `src/shell/` untouched) · validate 5/5 + SHELL-* · validate:master 12/12 · version:check 9.2.6 · tests **64/64** · canon sync **97/97 PASS** · drift exit 0, actionable 134→**133** (before/after measured via stash), canon-only sections 3→3 unchanged · qa:csp/bundle/contrast PASS · qa:english **19** / qa:syntax **247** (baselines unchanged) · qa:doc-versions 8/8, 1 pre-existing warning (obs-3), exit 0 · lint 0 errors (1 pre-existing warning, untouched) · `git diff --check` clean.
- 6: **Acceptance check (ed-6 criterion "rendered prose carries zero KI#/iter NN"):** sweep over `src/master/` + `parts/` + `dist/` returns 1 hit — `part_07b.html:39`, byte-verified inside the E18 VS-EMBED `<!-- ... -->` provenance comment → non-rendering → criterion MET. Root fallbacks regenerated: `parts/part_07a.html` + `parts/part_08.html` (real deliverables — kept); `index.html` timestamp-only churn (kept — deliverable build); `parts/part_01.html` unchanged (master untouched).
- 7: Delivery audit: `git status --short` = 3 canon + 2 master + 3 regenerated + 5 state docs. Archive: changed files + `BASE_COMMIT.txt` + `DELETED_PATHS.txt` (none), no `.git`/caches.

Stage Summary:
- **iter 121 COMPLETE — ed-6 delivered (rendered prose zero repo-meta) + KI#71 CLOSED + dupes-1 §7A.12 half closed.** Files: `docs/canon/part_01.md` · `docs/canon/part_07a.md` · `docs/canon/part_08.md` · `src/master/part_07a.html` · `src/master/part_08.html` · regenerated `parts/part_07a.html` · `parts/part_08.html` · `index.html` (build timestamp) · state docs `STATUS.md` (iter 121, KI#71 CLOSED, KI#69 deleted per lifecycle, Next step re-pinned) · `worklog.md` (this entry; iter-110→111 dropped per ≤10 cap) · `CHANGELOG.md` (iter-121 entry; iter-118 collapsed) · `PLAN.md` (ed-6 + ki-71 → Completed, dupes-1 re-scoped, ed-matrix Phase B note) · `docs/research/editorial_matrix.md` (R17 registry updated: stripped iter-121 + 3 non-rendering discoveries for Phase B).
- **Verified:** battery green (step 5); acceptance sweep with byte-level comment verification (step 6); drift before/after measured — actionable 134→133, no new drift.
- **Scope note:** 5 content files (3 canon + 2 master; soft limit 3–5 — mirrored edits objectively needed) + 3 regenerated + 5 state docs mandated by repo law.
- **Deferred:** part_06 L83 / part_00 L13 / appendix_character_map L29 (non-rendering, Phase B rows) · ki-72 (value decision) · owner-gated rows unchanged.

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

Task ID: iter-114-dead-css-vs-styles-cleanup (one-line summary)
- iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css`: SECTION 3 (VS Shared Patterns P1–P6, 196 lines) + 12 dead SECTION 4 utility blocks (211 lines) removed. 407 lines total, ~10.2 KB. 1 source + 3 docs + 2 auto-regen. Canon sync 97/97. Build hash 2ab607d6 unchanged. 0 new English leaks.

---

Task ID: iter-113-mermaid-removal (one-line summary)
- iter 113 — Mermaid infrastructure removal: `mermaid-init.js` deleted (141 lines) + CDN script + lazy-loader init/render block + `reRenderMermaid()` + `.mermaid` CSS. CSP tightened (script-src dropped CDN, worker-src directive dropped). 3 source + 1 deleted + 4 docs + 6 auto-regen. Canon sync 97/97. Build hash c5c429e2 → 2ab607d6. 0 new English leaks.

---

Task ID: iter-112-dead-code-cleanup (one-line summary)
- iter 112 — Dead code cleanup: removed 4 dead widgets (`diagnostic-tree`, `blueprint-viewer`, `author-note-viewer`, `vs-e15-blueprint`, 339 lines JS) + 4 script tags + 3 initAll() calls + `.fi26-*` CSS utilities (262 lines). 601 lines total. 3 source + 4 deleted + 3 docs + 6 auto-regen. Canon sync 97/97. Build hash f70870c0 → c5c429e2. 0 new English leaks.
