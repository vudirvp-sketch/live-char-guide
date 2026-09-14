# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-131-migration-bootstrap
Agent: main
Task: v2 migration bootstrap (owner track-switch directive, chat 2026-09-14) — stop the incremental cleanup/research track, start the strategic v1 → v2 architecture migration track. First-iteration directive: record v1 state, inventory existing semantic artifacts, investigate `visual-system/elements/` as embedded-knowledge source, map canonical sources vs competing copies, create the migration map, define the first bounded area. v1 frozen as immutable migration source — no content edits.

Work Log:
- 0: Preflight: `BASE_COMMIT = 987e4f3147dd3efbf9ead546de7560ba949c13cd` (iter 130), worktree clean. Laws read: AGENTS.md (incl. Editorial Policy + fences), STATUS.md (iter 130 complete), AGENT_NAVIGATION.md (full — refactor/architecture gradient), PLAN.md, DECISIONS.md (DEC-01…16), `docs/canon/_README.md`, `docs/content_map.md`, `docs/architecture.md` (headers). Track switch sanctioned by owner directive (supersedes old Next-step rows; old research = input only).
- 1: **Existing-artifact inventory:** `editorial_matrix.md` (99 IDs / 500 rows, R01–R29 — full prose-layer block audit, Phase-1 input ~80% reusable), `editorial_research_en.md` (§23 reading modes ≈ v2 Learn/Build/Debug/Reference; §19 rule-strength classes; §27 rule set), `guide_analysis_consolidated.md` (C1–C15/D1–D20), examples/backlog/english audits. Gap identified: visual layer + data layer never semantically audited; no disposition registry existed.
- 2: **Visual-layer analysis (scripted, read-only; script kept OUTSIDE the repo at `~/my-project/scripts/vs_text_extract.py`):** extracted 529 prototype / 532 master-embed text strings across E01–E18; 494 identical (93%) — prototypes are a drifted second copy of production embeds. **337 embed strings (63%) have NO canonical textual home** — visual system is a real knowledge carrier. Byte-verified drift: E10 prototype stale LIE «Я фундаментально ущербен» vs canon/JSON/master «Что-то фундаментально отсутствует во мне» (3-way); DEC-16 russification lag in E01/E05/E06 prototypes; master embeds bake literal hex (KI#41/42 class).
- 3: **Unique-payload findings (FACT, file:line in foundation doc):** E13 diagnostic tree = 3 symptom→check→AP/E mappings absent from §9.5/§9.6 (competing diagnostic source, not a §9.6 subset); E07 unique prose («Пользователи часто предполагают…» + Хранилище/Влияние distinction) only in embed; E01 SP budget range ~100–200 diverges from canonical §7A.12 (50/100/200); E12 AP-5 fix text «Держите RepPen 1.0–1.05» — 4th location of the KI#72 family (sides with §7A.7 against §7A.6); E17 carries both contradiction sides labeled.
- 4: **Data-layer audit:** `data/glossary.json` = 55 terms (vs canon appendix 25; 21 name-overlap with divergent definitions; 34 JSON-only; version 9.2.0 stale), `core_rules` (5) → dead data pointing to pre-restructure `01_core_principles.html` (unconsumed by anything, verified by grep); all 55 anchor_ids resolve to live master sections (panel healthy). Glossary = 3 competing term sets + 2 dead layers.
- 5: **Deliverables created:** `docs/research/migration_foundation_iter131.md` (v1 baseline, layer map L1–L11, visual analysis, 7 competing-knowledge clusters, first-bounded-area proposal + alternatives tested) and `docs/research/migration_map_v2.md` (living registry: status vocabulary + visual dispositions, 18 element dispositions PROPOSED, cluster registry B, Registry C mechanism via editorial_matrix back-pointers — no row duplication per DEC-10, 5 owner decision points). **First bounded area recommended: Glossary cluster** (Reference-mode backbone; self-contained; no numeric value decision needed — only term-set composition + source direction, both packaged as explicit owner decisions).
- 6: **State docs:** STATUS.md (iter 131 Current State + Next step re-pinned to migration track, superseded rows listed) · this entry (iter-121 one-liner dropped per ≤10 cap) · PLAN.md (migration track section + superseded marking) · AGENT_NAVIGATION.md §7 (two new research-doc rows) · CHANGELOG.md (iter-131 entry). 7 files touched total — above the 3–5 soft limit, noted here: 2 new research artifacts are the iteration's deliverable + 5 state docs, 4 of them mandated by the track switch (Next-step re-pin, backlog switch, doc-map law for new research docs, changelog convention).
- 7: **Verification (executed):** script re-derivation of all claimed counts (96 master sections, 18 VS-EMBEDs, one per element with closing markers) · drift findings byte-verified by direct reads · glossary anchor_id resolution 55/55 · canon §7A.12/§7A.6/§8.6/§9.5/§9.6/§3.2/§5.4 cross-checks for every cluster claim · `git diff --check` clean · `git status --short` = only the 7 intended files. **No build/test battery: no production file modified (doc-only iteration; SKIP_ARTIFACT_BUILD path applies to the owner's commit).**

Stage Summary:
- **iter 131 COMPLETE — Phase-1 foundation + migration map delivered; v1 untouched (frozen migration source).** The repo can now answer «какой смысл живёт в visual/data слоях, где его canonical home, и какие копии конкурируют» with file:line evidence.
- **Files (7 changed, 0 deleted):** 2 new research docs (`docs/research/migration_foundation_iter131.md`, `docs/research/migration_map_v2.md`) · 5 state docs (`STATUS.md`, `worklog.md`, `PLAN.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`).
- **Open KIs:** KI#70 (input to v2 Reference design, superseded as standalone) · KI#72 (value decision resurfaces in sampling-cluster disposition) · KI#77 (e-only, deferred) · KI#79 (deferred). Next: owner decisions on the first bounded area (glossary cluster, migration_map_v2 §6.3) + non-gated Registry C seeding from the matrix.

---

Task ID: iter-130-ed4-family (one-line summary)
- iter 130 — ed-4-family: matrix candidate #6 (R06 §3.2 Пояснение re-explainer deleted, canon + master mirror) + KI#78 CLOSED (fold); KI#79 opened (drift-tool `<pre>` regex absorption, informational); battery green, baselines exact, root fallbacks rebuilt. Detail: git (iter-130 commit).

---

Task ID: iter-129-ed7-family (one-line summary)
- iter 129 — ed-7-family: #4 R05 + #5 R03 §3.1 compressions + R29 terminology ×4 + R17 [B] fold; sync P3-6/P1-3 updated; KI#78 opened; battery green, hash unchanged. Detail: git `daf68dc0`.

---

Task ID: iter-128-ed8-r18-phase-a (one-line summary)
- iter 128 — ed-8/R18 Phase A remainder + R17 canon-side strips #14/#15/#17/#18: 16 refs + 1 paren + 4 strips, every target master-verified; battery green, hash `2ab607d6` unchanged. Detail: git `bb4ed292`.

---

Task ID: iter-127-ed8-r18 (one-line summary)
- iter 127 — ed-8/R18 Phase B: canon vague-ref repair batch — 33 refs + 6 part_08 parens + KI#77-a–d; part_05 L21 mirror + sync-audit P0-16 update; battery green, hash `2ab607d6` unchanged. Detail: git `8a365553`.

---

Task ID: iter-126-ed-matrix-phase-b (one-line summary)
- iter 126 — ed-matrix Phase B: full-coverage editorial matrix (61 sections / 290 rows; 99 IDs / 500 rows script-verified; registry R01–R29; candidates #14–#20; KI#77 opened). Read-only. Detail: git `4a6c9a5e`.

---

Task ID: iter-125-dupes-1 (one-line summary)
- iter 125 — dupes-1: R16 §9.11 quick-check dupe deleted + dangling-ref repair (→ §9.3 + E14); R01 §7A.1 full copy → 1-sentence + refs + E01 viz pointer; battery green, runtime smoke 12/12, obs-6 recorded. Detail: git `03f48fa3`.

---

Task ID: iter-124-vs-fix (one-line summary)
- iter 124 — vs-fix: E06/E10 VS-EMBED defect fixes (KI#73–76 recorded & CLOSED): E06 two-column restructure + label dedup + theme literals removed; E10 hexad complete + JSON-canonical directions + arrowheads; `vs-e10-enneagram.js` → `data/enneagram.json` fetch + clamp. Battery green, runtime suite 30/30 + VLM. Detail: git `32bbfd63`.

---

Task ID: iter-123-ru-policy-russification (one-line summary)
- iter 123 — ru-policy: two-layer guide language policy (DEC-16) + full russification (19 canon + 14 master + 15 root fallbacks); qa:english re-baselined 19→18; battery green, hash `2ab607d6` unchanged. Detail: git (iter-123 commit).

---

Task ID: iter-122-ed-policy-adoption (one-line summary)
- iter 122 — ed-policy: Editorial Policy adopted as content-editing law (owner-amended verbatim text → `AGENTS.md` + fence #13, `_README.md` §4.4, DEC-15); doc-only. Detail: git (iter-122 commit).
