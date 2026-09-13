# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-120-doc-gate-and-editorial-matrix
Agent: main
Task: Continue the non-gated backlog per `STATUS.md` Next step (owner directive: continue work per the plans — owner-gated rows 1–3 untouched): **ki-67** (`qa:doc-versions` gate blindness) + **ed-matrix Phase A** (Parts 1/3/7A/9) — the pairing explicitly recommended by `docs/research/backlog_audit_iter118.md` §4 pairing note (avoids a doc-only iteration).

Work Log:
- 0: Preflight per `AGENTS.md`: `BASE_COMMIT = bd2134f06c5116113b9c9f180c13d151c51b4302` (iter 119), worktree clean. pnpm 10.33.0 installed (npm -g; corepack symlink EACCES in sandbox).
- 1: **ki-67 reproduced BEFORE the fix:** `node scripts/check-doc-versions.mjs` → 6 of 8 `docs/*.md` skipped ("no date header found"), gate prints false "All doc dates are current", exit 0. Headers verified: `**Last Updated:**` ×3, `**Date:**` ×1, `**Дата:**` ×1, plain ×2 — regex `(?:Last Updated|Date):\s*…` cannot match `**` between `:` and the date, and does not know `Дата`.
- 2: **Fix** (`scripts/check-doc-versions.mjs`): regex → `\*{0,2}(?:Last Updated|Date|Дата):\*{0,2}\s*(\d{4}-\d{2}-\d{2})` + docblock + extraction-comment updates (KI#67 note). **Unit-check 7/7** (plain / bold / Russian bold / bold + trailing annotation / no-header / non-date string). **AFTER:** 8/8 docs parsed, 0 skips; existing ✅ rows preserved (architecture.md / content_map.md drift 0d); exit 0 non-strict; `--strict` exit 1 verified. Gate now sighted — surfaces **1 genuine warning**: `CONTENT_RESTRUCTURE_PLAN.md` declared 2026-06-23 vs last commit 2026-07-08 (15d) — the obs-3 file; recorded, not fixed (owner-gated fate).
- 3: **ed-matrix Phase A:** read canon `part_01.md`, `part_03.md`, `part_07a.md`, `part_09.md` fully + `docs/content_map.md` (concept ownership) + research §20/§22/§24/§26/§32/§33. Designed the block-ID scheme `<data-section-id>::<NN>` with a deterministic derivation rule documented inside the artifact (script-re-derivable: split at `data-section:` markers, blank-line blocks, fenced code / callout div = one unit).
- 4: Built **NEW `docs/research/editorial_matrix.md`** (608 lines): method + column semantics + interpretation rules (only DUPLICATE = automatic candidate; whitelist §20; VS-shadowing rule) + 4 part matrices (Part 1: 29 rows · Part 3: 45 · Part 7A: 94 · Part 9: 42 = **210 block rows, 38 sections**) + repeat registry **R01–R20** (§24 classes) + script-verified statistics + ed-1…ed-8 re-scope notes. Row counts verified by sandbox script: 210 rows, 210 unique IDs, 0 duplicates.
- 5: **Key matrix findings:** 13 automatic compression candidates (decision ≠ KEEP ∧ repeat = DUPLICATE) + 1 pair-level (R04 drift numbers). Primary ed-2 target: §7A.13 step-3 verbatim CORE DIRECTIVES block → DEC-08 shorthand (R02). dupes-1 evidence: §9.11 self-admitted `<details>` dupe (R16) + stale §7A.12 migration note (verified: described plain-copy block no longer exists). R01: Anchors-placement RULE printed 4× (canonical §1.4; full copy §7A.1). R17: 5 repo-meta locations in Phase A, **2 of them stale** (§7A.1 `[ANCHORS]`/KI#58 note — parts/ actually carries `<anchors>` XML, only hit is the note itself; §7A.12 iter-11 note). **ed-1 scope narrowed with evidence:** Part 1 does not block-level re-teach Parts 2–7A (refs already 1-sentence; §1.4/§1.7/§1.8 canonical). **Part 9 verdict:** already validate-not-re-teach; residual = R15 fold + R16 delete + R14 router-para decision (7 near-identical «Сценарий:» routers).
- 6: **New KIs opened (read-only row — fixes deferred per scope discipline):** **KI#71** — canon `part_07a.md` L30–31 byte-identical duplicate of the identity-name RULE (master carries it once; verified by grep canon/master/parts). **KI#72** — §7A.7 vs §7A.6 sampling contradictions (32B+ Temperature 0.85–1.1 vs 0.7–1.0; 32B+ RepPen 1.0–1.05 vs 1.05–1.10; verified at canon L306/L322/L338/L340). R11 also records §9.11 «Description ≤ 800» vs §7A.12 max 700 (numeric tension → ed-5).
- 7: **Verification battery (after edits):** `pnpm run build` PASS (hash `2ab607d6` unchanged — `src/` untouched) · validate 5/5 + SHELL-LOADER/STYLES PASS · validate:master 12/12 · version:check 9.2.6 in sync · tests **64/64** · canon sync **97/97 PASS** · drift exit 0 · qa:csp PASS · qa:bundle PASS (index.html 6.7KB) · qa:contrast PASS · qa:english **19** / qa:syntax **247** (baselines unchanged) · qa:doc-versions 8/8 parsed, 1 warning, exit 0 · lint 0 errors (1 pre-existing warning `vs-e10-enneagram.js`, untouched) · `git diff --check` clean.
- 8: Delivery audit: exploratory-build timestamp churn in root `index.html` restored (`git restore index.html` — no deliverables built this iteration). `git status --short` = 1 modified script + 1 new research doc + 5 state docs. Archive: changed files + `BASE_COMMIT.txt` + `DELETED_PATHS.txt` (none), no `.git`/caches.

Stage Summary:
- **iter 120 COMPLETE — KI#67 fixed (qa:doc-versions gate sighted, 8/8 parsed) + ed-matrix Phase A delivered (210-row editorial matrix for Parts 1/3/7A/9).** Files: `scripts/check-doc-versions.mjs` (regex fix) · `docs/research/editorial_matrix.md` (NEW, 608 lines) · `STATUS.md` (iter 120, KI#67 CLOSED, KI#68 deleted per lifecycle, KI#71/KI#72 OPEN, Next step re-pinned) · `worklog.md` (this entry; iter-110 dropped per ≤10 cap) · `CHANGELOG.md` (iter-120 entry; iter-117 collapsed) · `PLAN.md` (ki-67 → Completed, ed-matrix Phase A/B re-scope, +ki-71 +ki-72 rows) · `AGENT_NAVIGATION.md` (§7 row for the matrix).
- **Verified:** gate before/after + 7/7 regex unit-checks; battery green (step 7); matrix row-count script check 210/210 unique; all claims traceable to canon line refs in the artifact.
- **Scope note:** 7 authored files (1 script + 1 new research doc + 5 state docs mandated by repo law); target work = 2 files. No content/canon/master edits (read-only row).
- **Deferred:** KI#71 + KI#72 fixes (PLAN rows), ed-matrix Phase B, ed-6 (now evidence-complete for Phase A parts), obs-3/obs-4, owner-gated rows unchanged.

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

---

Task ID: iter-111-voice-hierarchy-widget (one-line summary)
- iter 111 — Fork D (part 1/3): `persona-voice-hierarchy` interactive widget (16th) for §3.2 — model-tier toggle + hover-sync + MD export. Combined design in ~290 lines JS. Canon-embedded data (6×3 from §3.2 table) — exception to data/*.json rule. Fixed naming drift in `part_07a.md` (p3_voice_hierarchy → p3_influence_hierarchy). 7 source + 6 auto-regen. Canon sync 97/97. Build hash 8499b4e3 → f70870c0. 0 new English leaks.
