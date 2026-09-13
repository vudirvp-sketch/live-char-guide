# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-118-editorial-research-intake
Agent: main
Task: Intake of the external textual/editorial research report (uploaded by the owner), verification of its claims against the actual repository, recording of all editorial tasks in repo documentation (PLAN/STATUS/research intake), and the first confirmed P0 fix (card-block counting). Content change: 2 words in canon + master.

Work Log:
- 0: Preflight per `AGENTS.md`: `BASE_COMMIT = 6d0029ae3d7891cc29062aa201042068f280e684` (iter 117), worktree clean (fresh clone). pnpm@10.33.0 installed (env had none). Task selection: owner bootstrap directive — "analyze the uploaded editorial research, record its tasks in documentation, start fixing".
- 1: Baseline BEFORE edits (full battery): build PASS (hash `2ab607d6`) · validate 5/5 + SHELL-* PASS · validate:master 12/12 PASS (pre-existing informational note: part_10.html content outside sections — non-fatal, untouched) · version:check PASS (9.2.6) · tests 64/64 · canon sync 97/97 (0 FAIL) · drift exit 0 · qa:csp/bundle/contrast PASS · qa:english 19 (baseline) · qa:syntax 247 (baseline) · qa:doc-versions "PASS" (blind — KI#67). Exploratory build produced expected timestamp-only churn in root `index.html` (kept — final iteration build regenerates it).
- 2: Research report read in full (33 numbered sections + verdict/risks/next steps; research-internal KI-1..KI-16; P0 1–6 / P1 7–14 / P2 15–19; 10-rule editorial rule set §27; editorial-matrix proposal §32). Key limitation preserved from the report itself: produced without a local clone — ALL claims unverified at delivery.
- 3: Claim verification (spot-checks, evidence-based): (a) card-block counting (research §3 / research-KI-3) — **CONFIRMED**: canon `part_01.md`:39 "состоит из четырёх блоков" vs :57 "стек из 5 блоков" + 5-row block table + Anchors RULE "отдельный структурный блок"; mirrored in master `part_01.html`:266/291; no other counting statements in canon/master/glossary/terminology (grep-audited); (b) reader/repo-metadata mixing (research §12 / KI-7) — **CONFIRMED**: master `part_07a.html`:30 "известный drift (KI#58)", :171 "D4, iter 93", `part_08.html`:220 "убрана в iter 55 … (KI#38 ✅ CLOSED)" in rendered prose (canon mirrors exist); sync-audit independence from these strings verified (0 grep hits in `audit_canon_master_sync.py`); (c) SP/S·P MBTI collision (research §17) — **PARTIALLY RESOLVED already**: `data/glossary.json` "Sensing-Perceiving … Не путать с System Prompt (SP)… обозначается как S·P" — remaining prose-consistency audit folded into ed-7.
- 4: **KI#68** opened + fixed + CLOSED (in scope — minimal confirmed defect): `docs/canon/part_01.md` §1.2 "Карточка состоит из четырёх блоков" → "из пяти блоков" + `src/master/part_01.html` "состоит из четырёх блоков, каждый из которых…" → "из пяти блоков…". Rationale: the section's own E01 viz (5-block stack), 5-row table (SP/Description/Examples/Anchors/Greeting) and the Anchors RULE establish the 5-block model; the "четырёх" sentence was the stale outlier. Research's deeper re-model (core fields / behavioral layer / lorebook layer) assessed as NOT needed — the 5-block model + Anchors-nuance RULE is already self-consistent; noted in PLAN ed-policy input instead.
- 5: Research intake: NEW `docs/research/editorial_research_en.md` (verbatim report body + provenance header: source, limitation, iter-118 verification verdicts, research-KI vs repo-KI numbering note, backlog pointers). Naming follows `docs/research/` conventions.
- 6: `PLAN.md`: owner-gated queue + **ed-policy** (adopt research §27 rule set as content-editing law; whitelist of useful repetitions per §20; conflicts vs IMP-48 / `viz > dry text` resolved by owner); backlog + **ed-matrix** (research §32 section-by-section matrix, read-only, prerequisite for content edits) + **ed-1** (Part 1 → foundation/orientation, P0-1/2) + **ed-2** (CORE DIRECTIVES canonical presentation, P0-3) + **ed-3** (Part 9 validate-not-re-teach, P0-5) + **ed-4** (Voice unified model, P1-7) + **ed-5** (Token Budget centralization audit, P1-8) + **ed-6** (reader/repo-metadata separation, P1-9, CONFIRMED) + **ed-7** (readability pass: density/timing/terminology/rule-strength, P1-10..13) + **ed-8** (P2 bundle: example coverage, reading modes, Part 10 commentary, master checklist, cross-ref quality). All rows carry Task · Scope · Acceptance · Verification · Owner gate per PLAN law; P0-6 (functional-load preservation) is embedded as acceptance criterion in ed-1/ed-7/ed-8 rather than a separate row (it is a rule, not a work item).
- 7: `STATUS.md`: iteration 118, Current State, KI#68 row (CLOSED iter-118), Next step re-pinned (ed-policy added to owner's choice; ed-matrix as non-gated candidate #3; ki-67/obs-4 unchanged). `AGENT_NAVIGATION.md` §7: + `docs/research/editorial_research_en.md` row. `CHANGELOG.md`: iter-118 entry (iter-115 collapsed to one-liner per "latest 2–3 in detail" cap).
- 8: Rebuild after content edit (`pnpm run build`) → root fallback `parts/part_01.html` regenerated with the fix; hash `2ab607d6` unchanged (shell untouched — expected: master edits don't enter the hash). Full verification battery re-run — see Stage Summary.
- 9: Delivery audit: `git status --short` (only intended files + regenerated fallbacks), `git diff --check` (whitespace clean), `git diff --stat 6d0029ae` (delta = 5 authored/edited + 3 state docs + 2 regenerated + 1 new research doc). Archive prepared with BASE_COMMIT.txt.

Stage Summary:
- **iter 118 COMPLETE — editorial research intake + KI#68 fix.** Files: `docs/research/editorial_research_en.md` (NEW, 1288 lines) · `docs/canon/part_01.md` (1 line) · `src/master/part_01.html` (1 line) · `PLAN.md` · `STATUS.md` · `worklog.md` (this entry; iter-117 collapsed) · `CHANGELOG.md` (iter-118 entry; iter-115 collapsed) · `AGENT_NAVIGATION.md` (§7 row) · regenerated: `parts/part_01.html` + `index.html` (build timestamp) + `parts/manifest.json` if changed.
- **Verified after edits:** build PASS (hash `2ab607d6` unchanged) · validate 5/5 + SHELL-* · validate:master 12/12 · version:check PASS (9.2.6) · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · qa:english 19 / qa:syntax 247 (baselines unchanged — "четырёх→пяти" adds no English/pattern leaks) · `git diff --check` clean.
- **Scope note:** 8 authored files + regenerated fallbacks — soft limit 3–5 exceeded; target work = 3 (research intake + canon + master), the rest are state docs mandated by repo law (STATUS/worklog/PLAN/CHANGELOG/NAV update rules) + build-mandated root fallbacks.
- **Deferred:** ed-policy (owner-gated editorial law adoption) · ed-matrix (next non-gated candidate — research §32 audit) · ed-1…ed-8 (gated on matrix + policy) · ki-67, obs-3, obs-4, fork-d-2, dupes-1, fork-d-3-intent (unchanged).

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
