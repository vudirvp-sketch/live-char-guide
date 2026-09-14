# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-132-mig-glossary-evidence
Agent: main
Task: execute STATUS Next-step rows after the owner's chat decisions (2026-09-14): record the glossary-cluster owner decisions (§6.3 a–c) as DEC-17 + execute the non-gated Registry C seeding (glossary slice) with per-term merged-with-review evidence. Doc-only; v1 frozen (no `docs/canon/`, `src/master/`, `data/` edits).

Work Log:
- 0: Preflight: `BASE_COMMIT = 8f12c0725838989934002c754d8a270978e2a958` (iter 131), worktree clean at start. Laws read: AGENTS.md, STATUS.md (iter 131 Next step), AGENT_NAVIGATION.md, PLAN.md (mig-1 / mig-registry rows), DECISIONS.md (DEC-01…16), `migration_map_v2.md`, `migration_foundation_iter131.md` (§5.3 glossary cluster), `editorial_matrix.md` §14 (appendix rows), `docs/canon/appendix_glossary.md`, `data/glossary.json`.
- 1: **Owner decisions recorded (DEC-17):** (a) merged-with-review term-set + Russian-first heads (DEC-16 applied to the registry: `lie → ложь` immediately, `token → токен`; EN only as technical identifiers; boundary cases flagged); (b) chain = canonical term record → generated `glossary.json` → runtime panel / no-JS glossary; (c) glossary = v2 Reference-layer representation of the unified registry (KI#70 wire/drop deferred). Recorded in DECISIONS.md (DEC-17), map §2 L6 + §4 glossary row + §6.3 → DECIDED.
- 2: **Term-set partition re-derived by script** (read-only, script kept outside the repo): canon 25 / JSON 55 / overlap 21 / canon-only 4 / JSON-only 34 — matches foundation §5.3 exactly. Canon-only receivers: System Prompt / SP, T→A→P, Voice Bleed (cross-character), Voice Bleed (degradation) — all four receive JSON fold-ins.
- 3: **Registry C glossary slice seeded (map §5.1a):** 26 matrix rows `appendix_glossary::01–::26` copied as C-1…C-26 with OLD → NEW + status (C-1 MOVED intro pattern; C-2…C-26 MERGED — every canon entry receives JSON material); matrix verdicts carried (R01/R02 COMPRESS execute at merge); back-pointers `→ migration_map_v2 C-<n>` appended to all 26 matrix rows + section note (matrix §14).
- 4: **Per-term merged-with-review evidence (map §5.1b):** all 55 JSON terms dispositioned T-01…T-55 — 35 MERGED (21 overlap + 14 fold-ins: Action/Price/Trigger → T→A→P; 7 CORE DIRECTIVE names → 7-name index per R02; Lorebook Entry → Lorebook; System Prompt → System Prompt / SP; Voice Bleed → cross-character; Narrator Bleed → degradation) + 20 MOVED (promoted, canonical homes verified by grep: §7A.11 4K-Fallback, §7A.5 Author's Note, §1.2 Character Card/Description, §3.2 Examples, §7A.4 Format Lock, §7A.8 Immersion Boundary, §8 AP-15 Nested Anchors, §9.2 One Change Rule, §7A.8+§9 OOC, §5.7 Persona Synthesis, §7A.6 Presence Penalty/RepPen, §6 Tier 3 processus_analysium, §2 Sensory Anchors, appendix_mbti S·P, §7B.6 Structured Inject, §7A.3 Tone Frame, §3 Voice Contamination, §8.7 AP-6 годмодинг). Unified registry = 45 entries. RU-first head-forms proposed; 6 flagged ⚑ (identifier-vs-prose boundary: Author's Note, Description, Examples, Format Lock, System Prompt, Tone Frame).
- 5: **New finding (recorded, not fixed):** `glossary.json` RepPen entry carries «Рекомендуемый диапазон: 1.00–1.10» — a 5th KI#72-family value location (besides §7A.6 / §7A.7 / E17 / E12); noted in map Registry B row 2 (family already open as KI#72 — no new KI). Also: JSON GHOST Layers definition diverges from canon (stale pre-canon layer framing) — canon wins at merge (C-10); Identity Block JSON overcarries — canon wins (C-12).
- 6: **State docs:** STATUS.md (iter 132 Current State + Next step re-pinned: owner call to open v2 build phase + ratify §5.1) · PLAN.md (mig-1 gate → RESOLVED DEC-17 with phase-gate note; mig-registry → Completed tracks; reuse-note updated) · DECISIONS.md (DEC-17) · CHANGELOG.md (iter-132 entry) · this entry (iter-122 one-liner dropped per ≤10 cap). 7 files touched — above the 3–5 soft limit, noted: map + matrix are the deliverable + 5 state docs mandated by law (DEC-10 owners / Next-step re-pin / decision log / worklog / changelog convention).
- 7: **Verification (executed):** term-set partition script counts (25/55/21/34/4) · grep count of matrix back-pointers = 26 rows + section note · map table counts: 26 C-rows / 55 T-rows (script-checked) · coverage: every one of the 55 JSON terms appears exactly once in 5.1b (script cross-check) · `git diff --check` clean · `git status --short` = only the 7 intended files. **No build/test battery: no production file modified (doc-only; SKIP_ARTIFACT_BUILD path applies to the owner's commit).**

Stage Summary:
- **iter 132 COMPLETE — glossary evidence phase done; v1 untouched (frozen migration source).** The map now answers, for every glossary term in v1 (25 canon + 55 JSON), where it goes in v2 (C-1…C-26 + T-01…T-55, 45 unified entries) — PROPOSED, awaiting owner ratification.
- **Files (7 changed, 0 deleted):** `docs/research/migration_map_v2.md` (§2 L6, §4 rows 2+3, §5+§5.1a/b, §6.3, §7) · `docs/research/editorial_matrix.md` (26 back-pointers + section note) · `DECISIONS.md` (DEC-17) · `STATUS.md` · `PLAN.md` · `worklog.md` · `CHANGELOG.md`.
- **Open KIs:** KI#70 (deferred, superseded by v2 Reference design) · KI#72 (value decision resurfaces in sampling cluster; RepPen glossary.json = 5th location recorded) · KI#77 (e-only) · KI#79 (deferred). Next: owner call — open the v2 build phase (mig-1) + ratify map §5.1 dispositions and the 6 ⚑ head-forms.

---

Task ID: iter-131-migration-bootstrap (one-line summary)
- iter 131 — migration bootstrap: track switch to v1→v2 architecture migration (v1 frozen); foundation doc (layer map L1–L11, visual-layer analysis: 63% embed strings without canonical home, 93% prototype identity) + migration map v2 (Registries A/B, decision points); glossary recommended as first bounded area. Doc-only. Detail: git `8f12c072`.

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
