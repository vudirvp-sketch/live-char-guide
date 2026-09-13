# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-116-agent-ops-rework
Agent: main
Task: Meta-iteration — rework the agent operational layer (authority order, preflight, anti-loop, scope discipline, DoD, reproducible delivery) on canonsim principles, without touching product/content/build code.

Work Log:
- 0: Preflight per the new law: `BASE_COMMIT = c212a02410e866af9cb7c6855764900ef02c993c`, clean worktree verified. Baseline BEFORE any edit: `pnpm run build` PASS (hash `2ab607d6`) · tests 64/64 (after build — fresh clones lack `dist/`, documented in AGENTS.md commands) · version:check PASS · canon sync 97/97 · drift exit 0 · qa:csp / qa:bundle / qa:contrast / qa:doc-versions PASS · qa:english 19 (baseline) · qa:syntax 247 (baseline).
- 1: Diagnostic pass over both repos (live-char-guide + canonsim): mapped task selection, reading gradient, SoT, state fixation, iteration loop, scope control, KIs, verification, delivery, decision history. Doc-vs-reality audit findings: (a) README status line stale (iter 101); (b) PLAN.md §5 stale (KI#64 "OPEN", iter-102 roadmap — 13 iterations behind); (c) NAV §2 hash wording read as self-contradiction; (d) iteration number duplicated across 4 files; roadmap table duplicated in STATUS + NAV §8; iter-115 detail triplicated (STATUS/worklog/CHANGELOG). **False positive withdrawn same-iteration:** workflow branch filters initially LOOKED corrupted (`branches: ain]` in terminal output) — byte-level verification (`python3 str.count('[main]')` per file: 2/2/1, equal to 'main' count → every 'main' sits inside `[main]`) proved the filters intact; the terminal display eats the `[m` sequence in OUTPUT. Recorded as pitfall #27 (AGENT_NAVIGATION §6); the initially drafted KI#66 was withdrawn before commit — no false claim entered history.
- 2: `AGENTS.md` rewritten as operating law: authority order (repo > state > task > navigation > prompt > inference; repo wins over prompt) · preflight (7 steps, BASE_COMMIT, never assume clean worktree, preserve pre-existing changes) · anti-loop rules (2 failures → KI + stop; 3rd blind retry forbidden; doc-loop alarm) · scope discipline (observe→record→defer→continue) · task-type reading gradient (content/widget/CSS/build/data/refactor/meta) · honest QA semantics (aggregate qa exits 1 by design; baselines 19/247) · Definition of Done (5 conditions) · delivery vs BASE_COMMIT · doc caps (moved out of the retired PLAN) · language law (docs EN, owner chat RU).
- 3: `AGENT_NAVIGATION.md` → current-state map: header law added ("what IS, not what happened"), iteration number removed; §2 hash block reworded (scope verified in code — DEC-05); §1 widget row de-historized; §8 roadmap table (iter 81–115 history) REMOVED and §9 "v9.1 Restructure Changes" narrative REMOVED (history → worklog/CHANGELOG/git); §7 doc map updated (PLAN/DECISIONS rows); NEW §10 information ownership (anti-drift map, one fact — one owner); NEW pitfall #27 (display artifacts vs byte-level verification); final hint → preflight pointer.
- 4: `STATUS.md` → state snapshot: Current State ≤ 15 lines (detail → worklog); Invariants kept as one-liners (de-historized); no open KIs (suspected KI#66 withdrawn — see step 1); NEW authoritative "Next step" section (owner-gated rows not auto-candidates); roadmap table REMOVED (→ PLAN.md).
- 5: `PLAN.md` repurposed: dead docs-restructure plan (COMPLETE since iter 101, stale §5) → live backlog. Every row now carries Task · Scope · Acceptance criteria · Required verification · Owner gate. Owner-gated queue: fork-d-3-intent (persona widget intent definition). Backlog: fork-d-2 (sampling widget), dupes-1. Observations: obs-1/obs-2 (content_map.md + architecture.md stale version headers — deferred, content pass out of meta-scope).
- 6: `DECISIONS.md` created (append-only, `DEC-NN` IDs to avoid the research-doc D1–D20 namespace): 13 seed decisions previously scattered across PLAN §5 "principles", NAV pitfalls, worklog notes, git.
- 7: `README.md` stale "Status: iter 101 COMPLETE" line → pointer to STATUS.md (state lives in one place). `CHANGELOG.md` iter-116 entry added; iter-113 collapsed to one-liner per the "latest 2–3 detailed" cap.

Stage Summary:
- **iter 116 COMPLETE — agent operating system reworked, doc-only.** 7 files edited, 1 created: `AGENTS.md` (rewrite) · `AGENT_NAVIGATION.md` (de-historized + §10 ownership + pitfall #27) · `STATUS.md` (snapshot + Next step) · `PLAN.md` (backlog with acceptance criteria) · `DECISIONS.md` (NEW) · `README.md` (status line) · `CHANGELOG.md` (+worklog.md this entry).
- **False-positive discipline applied:** the suspected workflow corruption was verified at byte level and withdrawn BEFORE commit — no false KI entered history; lesson preserved as pitfall #27.
- **Nothing outside the meta-scope touched:** no `src/`, no `data/`, no `scripts/`, no `tests/`, no workflows. Build hash `2ab607d6` unchanged; root fallbacks untouched (exploratory build's timestamp churn in `index.html` restored).
- **New contour live:** AGENTS.md (law) → NAVIGATION (map) → STATUS (state + Next step) → PLAN (backlog) → scoped change → verification → delivery vs BASE_COMMIT → worklog/DECISIONS/STATUS update.
- **Deferred:** obs-1/obs-2 stale doc headers (content pass) · fork-d-2/dupes-1 (owner's choice) · fork-d-3-intent (owner gate).

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
