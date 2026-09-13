# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-122-ed-policy-adoption
Agent: main
Task: Execute owner-gated backlog row **ed-policy** (PLAN.md): adopt the Editorial Rule Set as content-editing law. Owner decision received in chat 2026-09-14: policy accepted **with amendments** — the amended policy text is the law (verbatim), superseding research §27 as the operative wording.

Work Log:
- 0: Preflight per `AGENTS.md`: `BASE_COMMIT = b39b194ca32cb409874f12cfbd97c45e2ec5bfed` (iter 121), worktree clean. Reading gradient: agent docs / meta → `AGENTS.md` + `AGENT_NAVIGATION.md` §7 + §10. Input read: `docs/research/editorial_research_en.md` §27 (original rule set) + PLAN row ed-policy scope/acceptance.
- 1: **Placement design (information ownership, NAV §10):** full policy text lives exactly once — in `AGENTS.md` (owner doc of operating law) as a new section «Editorial Policy (content-editing law)» + compact hard **fence #13** pointing to it; `docs/canon/_README.md` cites it without restating (acceptance criterion "rule set cited once in owner doc"). Fence appended as #13 — no renumbering (external refs to #4/#5/#9/#10/#11 verified by grep). `_README.md` subsection placed as **§4.4** — no section renumbering (external refs to §3.9/§5/§8 verified: `CONTENT_RESTRUCTURE_PLAN.md`, research docs).
- 2: **AGENTS.md:** fence #13 (core principle + 5-point check + UNCLEAR + success metric, links to the section) · full section with the owner's **verbatim** amended policy (marked "amend only by owner decision") + provenance intro (research §27 + §20/§22/§24/§32, classification vocabulary, DEC-15, `_README.md` §4.4 pointer) · reading-gradient "Content / canon change" row now routes through the policy before opening canon/master.
- 3: **`docs/canon/_README.md`:** §4.4 «Editorial Policy — закон контент-редактирования» (canon-first application: 5 checks on canon text before master mirrors; compression = replacement per DEC-03; UNCLEAR ≠ DELETE; success metric) · anti-pattern #8 (compress "because duplicated" without functional checks → policy) · validation-checklist item (5 checks passed for every deletion/compression) · §9 history: iter-122 entry added, iter-57 collapsed into the iter-7–57 one-liner per the section's 2-detail format.
- 4: **DECISIONS.md:** DEC-15 appended — records the owner's explicit resolution of the conflicts vs existing law: functional repetition with distinct function preserved (subsumes the useful-repetition whitelist: Price / SPINE causality / Show Never Tell / Embodiment), consistency with `viz > dry text` (DEC-03) and IMP-48 (fence #11); `ed-1`…`ed-8` + `dupes-1` execute under the policy.
- 5: **PLAN.md:** ed-policy row removed from the owner-gated queue (decision received + executed) · preamble note binds every content row (`ed-1`…`ed-8`, `dupes-1`, `ki-72`) to the Editorial Policy (acceptance criterion "content iterations reference it") · Completed tracks one-liner added.
- 6: **STATE DOCS:** `STATUS.md` — iteration 122, Current State (doc-only summary), Invariants one-liner (Editorial Policy, DEC-15), Next step re-pinned: ed-policy removed from the owner-choice row 1 (remaining: Fork D part 2/3 · dupes-1, both marked as executing under the policy); ki-72 row likewise. KI table unchanged (no new KIs; KI#67 closed iter-120 = 2 iterations passed — deletion due next iteration touching STATUS per lifecycle, not yet "more than 2"). `worklog.md` (this entry; iter-112 dropped per ≤10 cap). `CHANGELOG.md` (iter-122 entry; iter-119 collapsed per 2–3-detail cap).
- 7: **Verification (doc-only battery per PLAN row):** BEFORE edits: `node scripts/version-sync.mjs` PASS (9.2.6; dist absent = gitignored, status sync) · `node scripts/check-doc-versions.mjs` exit 0 (1 pre-existing obs-3 warning). AFTER edits: same two — identical results (touched files are not date-header-scanned docs: AGENTS.md root, `docs/canon/` subdir, root state docs) · `git diff --check` clean · `git diff --stat` vs BASE_COMMIT = 7 intended files, no deletions, no `src/`+`data/`+build outputs (→ owner commits with `SKIP_ARTIFACT_BUILD=1`). pnpm absent in sandbox — both required checks run via the exact node commands the pnpm scripts wrap; lint/build/tests not applicable: `src/` untouched.
- 8: Delivery: archive = 7 changed files + `BASE_COMMIT.txt` + `DELETED_PATHS.txt` (empty — no deletions), no `.git`/caches/logs.

Stage Summary:
- **iter 122 COMPLETE — ed-policy delivered (Editorial Policy = law, owner-amended verbatim text).** Acceptance: (1) rule set cited once in owner doc — full text only in `AGENTS.md`, cited-not-restated elsewhere ✅; (2) content iterations reference it — PLAN preamble binds ed-1…ed-8/dupes-1/ki-72 ✅; (3) conflicts vs existing law resolved explicitly by the owner (amended text) and recorded in DEC-15 ✅. Required verification (doc-only): version:check PASS · qa:doc-versions exit 0 · git diff --check clean ✅.
- **Files (7, all docs — guide content untouched):** `AGENTS.md` · `docs/canon/_README.md` · `DECISIONS.md` · `PLAN.md` · `STATUS.md` · `worklog.md` · `CHANGELOG.md`.
- **Not done (deferred):** research §27 left verbatim in `docs/research/editorial_research_en.md` (intake artifact — historical record, not law; AGENTS.md section notes the policy supersedes it as operative wording). No content compression executed (ed-1…ed-8/dupes-1 remain backlog).
- **Open KIs:** KI#70 (appendices, owner-gated) · KI#72 (sampling values). Next: owner's choice — Fork D 2/3 · dupes-1 · ki-70; non-gated: ed-matrix Phase B · ki-72.

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

Task ID: iter-114-dead-css-vs-styles-cleanup (one-line summary)
- iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css`: SECTION 3 (VS Shared Patterns P1–P6, 196 lines) + 12 dead SECTION 4 utility blocks (211 lines) removed. 407 lines total, ~10.2 KB. 1 source + 3 docs + 2 auto-regen. Canon sync 97/97. Build hash 2ab607d6 unchanged. 0 new English leaks.

---

Task ID: iter-113-mermaid-removal (one-line summary)
- iter 113 — Mermaid infrastructure removal: `mermaid-init.js` deleted (141 lines) + CDN script + lazy-loader init/render block + `reRenderMermaid()` + `.mermaid` CSS. CSP tightened (script-src dropped CDN, worker-src directive dropped). 3 source + 1 deleted + 4 docs + 6 auto-regen. Canon sync 97/97. Build hash c5c429e2 → 2ab607d6. 0 new English leaks.
