# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-117-doc-hygiene
Agent: main
Task: Documentation hygiene — close PLAN observations obs-1/obs-2 (stale headers + content pass in `docs/content_map.md` and `docs/architecture.md`), fix factual errors found during the pass (NAV §5 CORE DIRECTIVE #7), record new findings (KI#67, obs-3, obs-4). Doc-only; no `src/`, `data/`, `scripts/`, `tests/` touched.

Work Log:
- 0: Preflight per `AGENTS.md`: `BASE_COMMIT = 01a4f9d1484075bb0d048b79a02bd949512fdef1`, clean worktree verified (fresh clone — DNS failure that blocked the previous session did not reproduce). Task selection: the analyzed report's P0 items were already closed by iter 116 (verified: PLAN is live backlog, README → STATUS pointer, STATUS at iter 116); the remaining actionable items = PLAN obs-1/obs-2 (stale doc headers) + the report's proposed machine orphan/reference audit. Baseline BEFORE edits: build PASS (hash `2ab607d6`) · validate 5/5 + SHELL-* PASS · validate:master 12/12 · version:check PASS (9.2.6) · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · qa:english 19 (baseline) · qa:syntax 247 (baseline) · qa:doc-versions "PASS" (blind — see step 5). pnpm via `npx -y pnpm@10.33.0` (no global pnpm in env).
- 1: Machine audit of the content map (three-way ID diff + §-column cross-check): canon declares 99 `data-section` IDs; master renders 96; the map listed 95. Canon-only by design (conceptual, `migration_status` in frontmatter): `p0_how_to_read`, `p0_tldr_quick_start` (Part 0), `appendix_character_map` (Appendix D, H1-level). Map gap: `p1_prebuild_checklist` (canon §1.8) had no row. §-column: 10 shifted Canon § in the map's Part 7A (Token Budget §7A.3→§7A.12 etc. — canon renumbered, map didn't) + stale §1.3 for structure_overview (canon: `###` subsection inside §1.2, no own H2). Verified PLAN/STATUS dupes-1 reference (§7A.12 plain-copy pre-block) is CORRECT against current canon — the map was wrong, not PLAN. Also: the "97/97" in canon-sync audit = 97 regression CHECKS, coincidentally equal to 97 canon H2 sections; master actually renders 96.
- 2: `docs/content_map.md` fixed: header → 9.2.6 / 2026-09-13 in gate-visible plain format; Part 0 conceptual table added (2 rows); Part 1: `p1_prebuild_checklist` row added, `p1_structure_overview` § fixed to "§1.2 (subsection)", card_overview note reworded to current canon reality; Part 7A: 10 § numbers corrected; Appendix D table added; Summary: Part 1 7→6, Total → **96 master sections** + explicit counting-convention note (96 master / 97 canon H2 / 99 declared IDs; Part 0 + Appendix D conceptual-only). Post-edit machine check: 97 rows, 0 mismatches, full canon↔map coverage.
- 3: `docs/architecture.md` fixed: header → 9.2.6 / 2026-09-13 (plain format); ownership table → "96 `data-section` sections" + added missing rows (`src/assets/`, `src/scripts/`, root fallbacks, `visual-system/`); shell stage → + `src/assets/` input + root-fallbacks output; section-markup example → + `id` attribute (fence #5 / pitfall #25); ID example `p7_core_directives` → `p7a_core_directives` (Part 7 split in v9.0.0); widget section → behavior in `src/shell/widgets/*.js` (12 widgets), lazy-loader loads on scroll-into-view; "Pre-commit Hooks" section REWRITTEN to reality (old list named QA scripts that are NOT in the hook; actual: `lint` + `build` + `validate`, `SKIP_ARTIFACT_BUILD=1` doc-only escape) + new QA gates/audits list; CI/CD → the three actual workflows (build-artifact / deploy-pages / validate, branch filter `[main]`); directory tree rebuilt from the actual repo (removed nonexistent `cross_reference_sync.md`, `user_journeys.md`, `validate-migration.mjs`; added `src/assets`, `src/scripts`, `visual-system/`, root fallbacks, agent docs, canon/, research/); version-history table → CHANGELOG pointer (NAV §10 one-fact-one-owner); footer updated.
- 4: `AGENT_NAVIGATION.md` §5: CORE DIRECTIVE #7 "Format Lock" → **"Pre-Generation Filter"** (verified 4 sources: canon `part_07a.md` §7A.2 block + master `part_07a.html` + architecture.md + STATUS invariant; Format Lock is a separate SP element, canon §7A.4) + disambiguation note. §7 doc map: + `docs/CONTENT_RESTRUCTURE_PLAN.md` row (historical iter-6 restructure strategy; referenced 2× by `docs/canon/_README.md` — NOT a deletion candidate).
- 5: NEW **KI#67** recorded (`STATUS.md`): `check-doc-versions.mjs` regex does not match the bold header format `**Last Updated:** YYYY-MM-DD` used across docs/*.md → every file skipped, gate always "passes". Both fixed files switched to plain format → now gate-visible. Root-cause proof: `python3` regex test (bold → no match, plain → match). `PLAN.md`: obs-1/obs-2 removed (closed), ki-67 backlog row added (script-regex fix preferred), obs-3 (CONTENT_RESTRUCTURE_PLAN self-describes "ANALYTICAL" though migration COMPLETE — owner decision) + obs-4 (components.md / terminology_dictionary.md stale headers, each needs its own content pass) recorded. Deletion audit conclusion: DELETE list empty — every tracked file either referenced, generated-by-build, or load-bearing; CONTENT_RESTRUCTURE_PLAN kept (live reference).

Stage Summary:
- **iter 117 COMPLETE — documentation hygiene, doc-only.** 7 files edited: `docs/content_map.md` · `docs/architecture.md` · `AGENT_NAVIGATION.md` · `STATUS.md` · `PLAN.md` · `worklog.md` (this entry; iter-116 collapsed to one-liner) · `CHANGELOG.md` (iter-117 entry; iter-114 collapsed per "latest 2–3 in detail" cap).
- **Scope note:** soft limit 3–5 files exceeded (7) — target work = 3 files (content_map, architecture, NAV §5/§7); the other 4 are state docs mandated by repo law (STATUS/worklog/PLAN/CHANGELOG update rules). No `src/`, `data/`, `scripts/`, `tests/`, workflows, root fallbacks touched. Build hash `2ab607d6` unchanged.
- **Verified after edits:** build re-run PASS (hash `2ab607d6` unchanged) · version:check PASS · canon sync 97/97 · drift exit 0 · content-map machine check 0 mismatches · `qa:doc-versions` now parses both fixed files (gate-visible, ✅ no drift) · qa:english 19 / qa:syntax 247 (baselines unchanged — no content files touched).
- **Deferred:** ki-67 fix (scripts/ change — backlog row ready) · obs-3, obs-4 (owner decision / separate content passes) · fork-d-2, dupes-1, fork-d-3-intent (owner-gated, unchanged).

---

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
