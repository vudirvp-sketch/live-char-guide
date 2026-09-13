# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-125-dupes-1
Agent: main
Task: dupes-1 (reduced scope, PLAN row; matrix candidates #2 + #12) — self-admitted dupes cleanup under the Editorial Policy (DEC-15). Owner session directive: bootstrap «Research & Guide Refactor», guide language stays maximal-Russian (DEC-16 two-layer), use visual-system/elements to replace text where timely.

Work Log:
- 0: Preflight: `BASE_COMMIT = 32bbfd637686df1da7fb5c976e32d9e55b0070de` (iter 124), worktree clean at start (no pre-existing sandbox changes). Laws read (`AGENTS.md` incl. Editorial Policy, `STATUS.md`, `AGENT_NAVIGATION.md`, `PLAN.md` dupes-1 row, `editorial_matrix.md` rows ::02/::03/::06 + R01/R16 registry). Session task selection: Next-step row 1 «Owner's choice between Fork D 2/3 (sampling widget) · dupes-1» — the bootstrap title «Research & Guide Refactor» + the owner's visual-replacement directive select **dupes-1** (guide refactor under Editorial Policy); Fork D 2/3 is a widget build, not a refactor.
- 1: **Evidence re-verified in-repo before editing:** R16 — the §9.11 `<details>` table's 5 items + expected results all covered by §9.3 checklist rows (PP=0.0, Voice, T→A→P, Format Lock, Anti-godmoding) + E14 embed `.quick-check-item` block (all 5, master L240–266) + «+ Greeting»/«neg+pos» nuances live in the Elena example (§9.11) and §7A.1 mandatory-elements list → zero unique payload (research §22 category 1). R01 — §7A.1 L32 = full copy of §1.4 L96 canonical (both read; §7A.9/§7A.11/§7A.13 use the compliant short+ref form; unique §7A.1-local payload = «не часть SP»). VS element registry checked: E01 embedded in Part 1 (between p1_value_proposition and p1_card_overview, master L36+), E14 inside p9_quality_scale (master L187+) — both usable as replacement pointers.
- 2: **R16 fix (canon `part_09.md` + master `part_09.html`):** `<details>` block deleted; intro rewritten as pointer («Базовая версия (таблица по блокам) — §9.3; визуальная версия — блок «5 быстрых проверок перед развёртыванием» в VS-EMBED E14 (§9.1). Ниже — применение к карточке Елены.»); 14-item list «Пункты 1–5» re-pointed to §9.3 + E14 (old text self-linked `#p9_pre_deploy` «Вышстрой проверку выше» — dangling after deletion, and a self-link by construction).
- 3: **R01 fix (canon `part_07a.md` + master `part_07a.html`):** full copy → 1 sentence + refs: «Якоря (Anchors) — не часть SP: отдельный структурный блок Examples-зоны, размещаемый в Description как `<anchors>`-тег либо в отдельное поле. Полное правило размещения — §1.4; правила якорей — §2.2; визуальная схема (якоря внутри Examples-зоны) — VS-EMBED E01 (§1.1).» — unique local payload kept; viz pointer added per `viz > dry text` + owner session directive (visual replaces text at the right time). Master mirrors use `<a href>` to `#p1_core_rules` / `#p2_anchor_rules` / `#p1_value_proposition` / `#p9_basic_checklist` / `#p9_quality_scale` (all exist — validate:master cross-ref check + runtime DOM check).
- 4: **Verification (all actually executed):** `pnpm run build` PASS (hash `2ab607d6` unchanged) · `pnpm run validate` 5/5 + SHELL-* · `pnpm run validate:master` 12/12, 17 warnings = BASE count · `pnpm run version:check` 9.2.6 · `pnpm test` 64/64 · `python3 scripts/audit_canon_master_sync.py` 97/97 PASS (P0-11/P0-12 substrings untouched) · `audit_canon_master_drift.py` actionable 159 = BASE (verified by stash-compare at `32bbfd63`) · qa:csp / qa:bundle / qa:contrast PASS · qa:english 18 / qa:syntax 247 (both = baseline) · qa:doc-versions 8/8 parsed, 1 pre-existing warning (obs-3) · `npx eslint src/` exit 0 · `git diff --check` clean · **headless-Chrome runtime smoke 12/12** (served dist/; §9.11 has exactly 1 `<details>` = the 14-item full check; no «дубликат» text; §9.3/§9.1 links present, no self-link; link targets exist; E14 quick-checks = 5 items; tables render; §7A.1 compressed rule present + old full copy gone + E01 ref present; zero page errors). Root fallback deltas byte-identical to src/master deltas (diff-of-diffs verified); `index.html` timestamp-only churn, staged with the set per DEC-11 (src/ touched).
- 5: **Out-of-scope discovered → recorded, deferred:** «Выщебленного» misspelling ×3 (canon part_10 L395, master part_10 L521, master part_09 §9.11 h4; pre-existing at BASE, byte-verified via count «Выщербл»/«Выщебл») → PLAN obs-6. Not fixed (scope discipline: dupes-1 authorized R16+R01 only).
- 6: **State docs:** STATUS.md (iter 125, Current State + Next step re-pinned: dupes-1 COMPLETE, row 1 narrows to Fork D 2/3) · this entry (iter-115 dropped per ≤10 cap) · CHANGELOG.md iter-125 entry (iter-122 collapsed to one-line per 2–3-detail cap) · PLAN.md (dupes-1 → Completed tracks; obs-6 added).

Stage Summary:
- **iter 125 COMPLETE — dupes-1 acceptance met:** dupes removed as replacement (§9.3 + E14 / §1.4 + E01 carry the load); IMP-48 cross-refs valid; 14-item list re-points correctly; battery green with unchanged baselines; drift 159 = BASE.
- **Files (4 content + 3 regenerated + 4 state = 11):** `docs/canon/part_09.md` · `docs/canon/part_07a.md` · `src/master/part_09.html` · `src/master/part_07a.html` + regenerated `parts/part_09.html` · `parts/part_07a.html` · `index.html` (timestamp) + docs `STATUS.md` · `worklog.md` · `CHANGELOG.md` · `PLAN.md`. No deletions of files (content block removal only).
- **Open KIs:** KI#70 (appendices, owner-gated) · KI#72 (sampling values). Next: owner choice Fork D 2/3 vs new row; non-gated ed-matrix Phase B / ki-72 / vs-audit / vs-e09-hex.

---

Task ID: iter-124-vs-fix (one-line summary)
- iter 124 — vs-fix: E06/E10 VS-EMBED defect fixes (KI#73–76 recorded & CLOSED): E06 two-column restructure + label dedup + theme literals removed; E10 hexad complete + JSON-canonical directions + arrowheads; `vs-e10-enneagram.js` → `data/enneagram.json` fetch + clamp. Battery green, runtime suite 30/30 + VLM. Detail: git `32bbfd63`.

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
