# Changelog

> Only the latest iterations in detail. Older iterations = one-line summaries.
> Full history is in `git log`.
> Format: [Keep a Changelog](https://keepachangelog.com/).

## [9.2.6] — 2026-08-15

### iter 135 — mig-4-token-budget: third bounded area executed — single canonical value owner locked (§7A.12 ↔ E01/E15)

- **Scope (STATUS Next-step row 1, pinned iter 134):** execute the Token budget v2 build slice on the mig-2 pattern (Registry B row 5; foundation §5.5; PLAN row mig-4, LOW gate — values already canonical, presentation fix, no semantic decision, no fresh owner call). §7A.12 stays the canonical record (per-block min/std/max table + personality sub-budgets + Script Tax + calculator — **unchanged**, canon + master untouched).
- **Pre-edit verification finding (central discovery):** the foundation §4.4 claim «E01 embed SP ~100–200 = wrong-side copy of 50/100/200» **does not exist in the repository** — byte-verified at every E01/E15 layer (master embed, prototype, component extract, root fallback) at HEAD and at the iter-131 BASE `987e4f3`; every layer already carries the canonical values. «100–200» exists only as the E16/§7A.5 Author's Note length (canonical there). The living registry (map §5.3 intro + Registry A E01 + Registry B row 5) records the verified truth; the foundation doc stays the historical iter-131 artifact. The planned E01 «value fix» therefore became a verification + parity-lock (no master part_01 edit).
- **Real gaps closed:** (a) E15 embed «Examples: ~80-400 токенов» — the derived total had NO declared derivation → note added: «(итог: 40–80 на пример × 2–5 примеров — §7A.12)» (the only master content edit; `parts/part_10.html` regenerated); (b) canon `part_01.md` / `part_10.md` had no `[VS: E01/E15]` markers (embeds without canonical descriptions) → both added per `_README.md` §3.3, declaring §7A.12 value ownership (SHARED_REFERENCE), the Examples totals derivation, and the E01 Lorebook «Est.» estimate status; the derivation rule stated canonically in part_10.md (TEXTUAL_CANONICAL home per the map E15 disposition).
- **New acceptance gate `scripts/audit_token_budget_parity.py` PASS (10 checks + deferred-layer notes):** canon §7A.12 canonical table (5 rows exact + Script Tax + sub-budgets + calculator 400–800); master mirror + calculator; E01 embed (SP/Description/Greeting == canonical, Examples totals 80/180/400 with arithmetic verified = per-example × count, in-embed derivation declarations, anchors ~15–40, Lorebook «Est.» estimate, summary-table Источник column); E01/E15 canon markers; E15 embed (min–max == canonical, derivation note present); glossary C-21 (registry + generated JSON, values deferred); root fallbacks current; map §5.3 + Registry rows + matrix back-pointers ×4. Deferred layers reported, never failed (prototype/extract E01+E15 — §6.1-blocked; R11/R27 out-of-slice family — owner-gated ed-5/KI#77-e).
- **Map + matrix:** §5.3 Token budget slice seeded + executed (TB-1…TB-8); Registry A E01/E15 + Registry B row 5 → executed; §7 iteration log entry (incl. the §4.4 correction). Matrix: back-pointers `→ migration_map_v2 TB-<n>` on 4 rows; R11 registry row — new instance recorded: §7B.2 Greeting «Длина: 50–100 токенов» vs §7A.12 Greeting row 40/60/100 (found iter 135, feeds ed-5).
- **Verification (executed):** token-budget parity audit **PASS** · glossary + core-directives parity PASS · full build OK (hash `2ab607d6` unchanged — shell untouched) · validate ✓ · validate:master 12/12 · version:check 9.2.6 ✓ · tests 64/64 · qa:csp/bundle/contrast/doc-versions PASS · qa:english **18** / qa:syntax **247** (baselines exact) · canon sync **97/97 PASS** · drift informational (actionable 160 = 160 unchanged) · `git diff --check` clean · Build reader-path audit documented (every budget number met by the reader = canonical / derived-with-declared-derivation / matrix-dispositioned). pnpm absent in the sandbox — scripts invoked via `node`/`python3` exactly as package.json defines. 13 files vs `BASE_COMMIT 886a2c24`; no deletions.

### iter 134 — mig-2-core-directives: second bounded area executed — single canonical presentation locked (R02/DEC-08)

- **Scope (STATUS Next-step row 1, pinned iter 133; owner «продолжай работу по плану»):** execute the CORE DIRECTIVES v2 build slice on the mig-1 pattern (canonical record → re-point → parity audit). Content semantics inherited from the pre-approved ed-2 analysis (matrix R02 verdict — MEDIUM gate, no fresh owner call). Pattern instantiation: **no machine layer** — no `data/*.json` carries directive knowledge (map §2 L6 «remaining clusters per disposition»); §7A.2 stays the canonical record; the «generated layer» role is carried by the parity audit's derivation from §7A.2. Prototype/extract disposal stays gated on §6.1 (map D-7, deferred).
- **D-2 executed (R02, matrix `p7a_assembly_pipeline::05`, primary ed-2 target):** §7A.13 Шаг 3 «Результат Елены» — the byte-identical verbatim re-print of the 7-directive `<CORE_DIRECTIVES>` block (canon) + the divergent link-form (master) → DEC-08 shorthand `{{CORE_DIRECTIVES — канонический шаблон → §7A.2}}` in both layers (master linkified to `#p7a_core_directives`; «Что делаете» + ~70-токенов commentary kept; master heading aligned to canon «Шаг 3: Основные директивы (CORE DIRECTIVES)»). 5-point functional-load check: the removed block was byte-identical to §7A.2::05 — zero unique capability; navigation signals retained (×3).
- **D-6 executed (E08 = the one visual presentation, SHARED_REFERENCE):** new acceptance gate `scripts/audit_core_directives_parity.py` (10 checks + deferred-layer notes) — §7A.2 canonical block integrity (7 directives, #6 Consequence Driven, #7 Pre-Generation Filter, template names == h4 names); master §7A.2 mirror; §7A.13 shorthand (canon+master); §7A.1 template shorthand; Part 10 shorthand ×4; E08 embed parity (7 nodes, RU titles == canonical h4 titles verbatim, numbering, [Model ↗] on 6+7 only, value carriers); glossary C-5 entry (registry + generated JSON); no competing full definitions anywhere in the guide layer; root fallback current; map §5.2 + matrix back-pointers present. **Found & fixed by the audit:** E08 node-7 title «Пре-генерационный фильтр» diverged from the canonical h4 «Фильтр предгенерации» — aligned (master embed; prototype copy untouched, §6.1).
- **D-3/D-4/D-5/D-8 dispositions recorded (map §5.2 D-1…D-8):** §7A.1 + Part 10 ×4 verified DEC-08 shorthand (no expansion); frozen v1 appendix copy superseded by registry C-5 (rides the v2 switch, DEC-18); glossary side executed iter 133. Registry B row 1 + Registry A E08 → executed status; matrix back-pointers `→ migration_map_v2 D-<n>` on 5 affected rows + R02 execution note + candidates #10/#19 status + ed-2 pointer.
- **KI#80 (opened + CLOSED this iteration, fold):** master `part_07a.html` §7A.2 directive-5 paragraph «наппряжён» (double-п typo) vs canon «напряжён» — byte-verified; fixed by master→canon alignment (KI#78 fold precedent: master-touching iteration, 1-word fix).
- **Verification (executed):** parity audit **PASS** · full build OK (hash `2ab607d6` unchanged — shell untouched) · validate ✓ · validate:master 12/12 · version:check 9.2.6 ✓ · tests 64/64 · qa:csp/bundle/contrast/doc-versions PASS (1 pre-existing warning = obs-3) · qa:english **18** / qa:syntax **247** (baselines exact) · canon sync **97/97 PASS** · drift informational (actionable 160 = 160 unchanged) · `git diff --check` clean · root fallback `parts/part_07a.html` regenerated + `index.html` timestamp churn kept (real build). pnpm absent in the sandbox — scripts invoked via `node`/`python3` exactly as package.json defines. 7 files vs `BASE_COMMIT 306af0f7`; no deletions.

### iter 133 — mig-1-glossary-build: DEC-18 ratification + the DEC-17 chain implemented end-to-end (v2 build phase opened)
- **Scope (STATUS Next-step row 1, owner chat 2026-09-14):** record the §5.1 ratification + ⚑ resolution + v2-build-phase opening as **DEC-18**, then execute the mig-1 build slice — v2 registry location design → registry build (RU-first heads per DEC-16/17a) → generator (`registry → data/glossary.json`) → re-point runtime panel / no-JS page → parity audit vs the 3 v1 term sets. v1 canon/master content stays frozen; the only `data/` change is `glossary.json` becoming a generated artifact (DEC-17b + the owner's «реализуется именно по цепочке … runtime/no-JS» directive).
- **DEC-18:** (a) §5.1 ratified — 35 MERGED / 20 MOVED / 45 unified entries; the 6 ⚑ head-forms resolved as English identifier heads with adjacent Russian gloss (System Prompt / SP, Author's Note, Description, Examples, Format Lock, Tone Frame); the owner's control check (no ⚑ term violating "English only as technical identifier" in the v2 prose) is enforced by the parity audit's english-rule check; (b) v2 build phase open — documentation-loop alarm satisfied by the functional slice; (c) registry location = `docs/canon/glossary_registry.md` (canon-side structured source per DEC-02/L1), `data/glossary.json` becomes generated.
- **Registry (45 entries):** 25 merged canon entries (canon definitions as base; R01 placement-rule fold; R02 CORE DIRECTIVES compression → definition + 7-name index + §7A.2 ref; R11 budget framing → defers values to §7A.12; JSON fold-ins: aliases, prohibited/deprecated hygiene, disambiguations; canon wins on GHOST Layers / Identity Block) + 20 promoted machine-layer terms (JSON definitions cleaned). RU-first heads (28 ru / 17 en identifier heads); provenance C-1…C-26 + T-01…T-55 per entry; anchors re-derived from canonical homes (Anti-godmoding → §7A.1, GHOST → §4.2, LIE → §4.3, Behavioral Anchor/T→A→P → §2.1, Voice Bleed cross-char → §3.8, Nested Anchors → AP-15, годмодинг → AP-6, OOC → §7A.8).
- **Generator + build wiring:** `scripts/generate_glossary.mjs` — strict registry parser, deterministic output, version from `src/VERSION` (stale 9.2.0 fixed), dead layers not emitted (`core_rules`, `unified_definition` → REMOVED_WITH_REASON); new `build:glossary` script wired as the first stage of `pnpm run build`. `data/glossary.json` = 45 terms, 9.2.6, v1-compatible field shape; `parts/glossary.html` regenerated (45 dt/dd); runtime panel + no-JS page re-pointed via the data layer — **zero shell code changes** (hash `2ab607d6` unchanged).
- **Parity audit (`scripts/audit_glossary_parity.py`) PASS:** 81 provenance refs (26 C + 55 T, each exactly once); dispositions match map §5.1 (MERGED → target entries, MOVED standalone); registry heads == ratified map heads verbatim; 6 ⚑ present + ⚑-flagged in the map; head-form lang class consistent; english-rule check (= the owner's control check) — 3+ EN-word runs only from the identifier vocab, prescribed prompt content inside «» quotes; anchors + xrefs resolve against 96 master sections; JSON↔registry equality; findability 45/45. Found & fixed during the run: T-32/T-33 provenance swap (map sorts case-insensitively).
- **Map corrections:** T-45 basis §7B.6 → §7B.1 (canon has no §7B.6; home p7b_structured_inject); §4 Registry B row 2 — the glossary.json RepPen «1.00–1.10» 5th KI#72-family location **eliminated** (the registry defers values to §7A.6; 4 live locations remain); §5.1 → RATIFIED (DEC-18) + executed; §6.3 → executed; §7 iteration log.
- **Verification (executed):** generator + parity audit PASS · full build OK (hash unchanged `2ab607d6`) · validate ✓ · validate:master 12/12 (45 terms used) · version:check 9.2.6 ✓ · tests 64/64 · qa:csp/bundle/contrast/doc-versions PASS (1 pre-existing warning = obs-3) · qa:english **18** / qa:syntax **247** (baselines exact) · canon sync **97/97 PASS** · no-JS DOM check (45 dt/dd, link targets valid) · `git diff --check` clean. pnpm absent in the sandbox — scripts invoked via `node`/`python3` exactly as package.json defines them (pre-commit re-runs lint+build+validate for the owner). 16 files vs `BASE_COMMIT 4a7f94d4`; no deletions.

### iter 132 — mig-glossary-evidence: DEC-17 owner decisions + Registry C glossary slice + per-term review (doc-only) — one-line

- iter 132 — mig-glossary-evidence: DEC-17 recorded; Registry C seeded (26 C-rows + 55 T-rows, 35 MERGED / 20 MOVED, 45 unified entries); RepPen «1.00–1.10» = 5th KI#72-family location found. Doc-only. Detail: git `4a7f94d4`.

### iter 131 — v2 migration bootstrap: track switch + Phase-1 foundation + migration map (doc-only) — one-line

- iter 131 — migration bootstrap: track switch to v1→v2 architecture migration (v1 frozen); foundation doc (layer map L1–L11, visual-layer analysis: 63% embed strings without canonical home, 93% prototype identity) + migration map v2 (Registries A/B, decision points); glossary recommended as first bounded area. Doc-only. Detail: git `8f12c072`.

### iter 130 — ed-4-family: R06 Пояснение deletion (candidate #6) + KI#78 fold — one-line

- iter 130 — ed-4-family: matrix candidate #6 (R06 §3.2 Пояснение re-explainer deleted, canon + master mirror) + KI#78 CLOSED (fold); KI#79 opened (drift-tool `<pre>` regex absorption, informational); battery green, baselines exact, root fallbacks rebuilt. Detail: git (iter-130 commit).

### iter 129 — ed-7-family: readability batch #4/#5 + R29 terminology + R17 [B] fold

- **Scope (non-gated matrix-output execution under the Editorial Policy DEC-15; owner chat directive «продолжай работу последней итерации, что там дальше следует логично»):** PLAN row `dupes-2` third batch — STATUS Next-step row 5 "ed-7-family" small batch (candidates #4 + #5 + R29 terminology ×4) plus the R17 [B] remainder fold (sanctioned by the same row: "fold into any canon-touching iteration"). Canon-first with master mirrors for every rendered change; non-rendering strips canon-only.
- **Candidate #4 (R05 — Методология near-verbatim copy, §3.1 L37):** compressed to a 1-sentence pointer — «проценты — качественные ориентиры, не точные измерения; эмпирическая база и её ограничения — [ref: part_01.md §1.1]»; the unique §3.2 note («Аналогичные проценты … той же природы») kept locally. Functional load: trust-calibration reminder stays at the drift table; empirical detail (~50 cards, model list, 128K caveat) remains canonical in §1.1 L27. Master mirror L165 with the `#p1_value_proposition` anchor; sync-audit P3-6 substring updated (iter-127/P0-16 pattern).
- **Candidate #5 (R03 — Pattern Matcher re-teach, §3.1 L39):** compressed to 1 sentence + `[ref: part_01.md §1.4 — Три ключевых принципа]` with the applied outcome contrast kept compact («директива будет проигнорирована, паттерн — скопирован»). Functional load: the RULE's local why stays at the decision point; full principle + numbers remain §1.4 L90; applied form §1.7 L128; in-section demo §3.1 L25 bullet + Тест L28. Master mirror L168 with the `#p1_core_rules` anchor.
- **R29 terminology normalization ×4:** glossary G-GHOST «G2=Отрочество»→«G2=Юность» (canon + master, aligned to §4.11) · glossary C-CoT «Tier 0 (basic Anchor)»→«Tier 0 (без отдельного CoT-блока)» (canon, aligned to §6.3; master already carried the aligned long form) · §7B.5 checklist «призрак Anchors»→«якоря призрака (GHOST-якоря)» (canon + master, aligned to the L257 RULE wording) · appendix_mbti «**NOTE:**»→«**Примечание:**» (canon-only, DEC-16; master renders no label).
- **R17 [B] remainder (family complete):** part_00 L13 «Создан: iter 38 — KI#21» preamble deleted (non-rendering) · part_08 L27 «в v9 restructure» repo-meta phrase stripped, redirect substance kept (canon + master); sync-audit P1-3 substring updated.
- **New KI#78 (discovered, deferred):** master part_07b.html L407 «поведенческие якоря (поведенческие якоря)» paren-gloss duplication in the §7B.5 fatigue-emulation RULE — same RULE block as the R29 checklist fix, but not a matrix candidate → recorded (STATUS + PLAN `ki-78`), not fixed (scope discipline).
- **Verification (executed):** build PASS hash `2ab607d6` unchanged · validate ✓ · validate:master 12 checks ✓ · version:check sync 9.2.6 · tests 64/64 · canon sync **97/97 PASS** (2 substrings updated) · drift exit 0, actionable drift set unchanged (159 = 159, stash A/B) · qa:csp/bundle/contrast/doc-versions PASS (1 pre-existing warning = obs-3) · qa:english **18** / qa:syntax **247** (baselines exact) · `git diff --check` clean · root fallbacks regenerated (`parts/part_03|07b|08|appendix_glossary.html`) + index.html timestamp churn kept (real build — iter-121/127 precedent). 6 canon + 4 master + 1 script + 5 build outputs + 5 state/evidence docs vs `BASE_COMMIT bb4ed292`; no deletions.

### iter 128 — ed-8/R18 continuation: Phase A canon vague-ref repair + R17 canon-side strips — one-line

- iter 128 — ed-8/R18 Phase A remainder + R17 canon strips #14/#15/#17/#18: 16 refs + 1 paren + 4 strips, every target master-verified; battery green, hash `2ab607d6` unchanged. Detail: git `bb4ed292`.

### iter 127 — ed-8/R18: canon vague-ref repair batch (Phase B mechanical family) — one-line

- iter 127 — ed-8/R18 Phase B: 33 refs → specific targets + 6 part_08 parens + KI#77-a–d; part_05 L21 mirror + sync-audit P0-16 update; battery green, hash `2ab607d6` unchanged. Detail: git `8a365553`.

### iter 126 — ed-matrix Phase B: full-coverage editorial matrix (read-only research) — one-line

- iter 126 — ed-matrix Phase B: full-coverage editorial matrix (61 sections / 290 rows; 99 IDs / 500 rows script-verified; registry R01–R29; candidates #14–#20; KI#77 opened). Read-only. Detail: git `4a6c9a5e`.

### iter 125 — dupes-1: self-admitted dupes cleanup (R16 + R01, Editorial Policy) — one-line

- iter 125 — dupes-1: R16 §9.11 quick-check `<details>` dupe deleted + dangling-ref repair (→ §9.3 + E14); R01 §7A.1 Anchors-placement full copy → 1 sentence + refs + E01 viz pointer; battery green, headless-Chrome runtime smoke 12/12, obs-6 recorded. Detail: git `03f48fa3`.

### iter 124 — vs-fix: VS-EMBED E06/E10 defect fixes (KI#73–76) — one-line

- iter 124 — vs-fix: E06 two-column restructure + label dedup + theme-color removal; E10 hexad complete + JSON-canonical directions + arrowheads; `vs-e10-enneagram.js` → `data/enneagram.json` fetch + clamp; KI#73–76 CLOSED; battery green, runtime suite 30/30 + VLM. Detail: git `32bbfd63`.

### iter 123 — ru-policy: two-layer guide language policy (owner request, full russification) — one-line

- Two-layer language policy (DEC-16: Russian guide prose/labels; English only in executable prompt content, identifiers, proper names) + full russification (19 canon + 14 master + 15 root fallbacks); qa:english re-baselined 19→18; battery green, hash `2ab607d6` unchanged. Detail: git (iter-123 commit).

### iter 122 — ed-policy: Editorial Policy adopted as content-editing law (doc-only, owner decision) — one-line

- Editorial Policy adopted (owner-amended verbatim text → `AGENTS.md` + fence #13, `_README.md` §4.4, DEC-15); doc-only; content iterations (`ed-1`…`ed-8`, `dupes-1`, `ki-72`) bound to it. Detail: git (iter-122 commit).

### iter 121 — ed-6: reader/repo-metadata separation + KI#71 (content, canon-first) — one-line

- Rendered prose zero `KI#…`/`iter NN` (Part 1/7A/8 canon+master); KI#71 CLOSED; drift 134→133; battery green, hash `2ab607d6` unchanged.

### iter 120 — `qa:doc-versions` gate sighted (KI#67) + editorial matrix Phase A (ed-matrix)

- **Scope (non-gated backlog continuation, owner directive):** two paired rows per `backlog_audit_iter118.md` §4 pairing note — **ki-67** (fix the blind `qa:doc-versions` gate; one script file, functional change) + **ed-matrix Phase A** (read-only editorial audit of Parts 1/3/7A/9; avoids a doc-only iteration). Owner-gated rows untouched.
- **ki-67 FIXED:** `scripts/check-doc-versions.mjs` regex `(?:Last Updated|Date):\s*(…)` matched neither the bold format `**Last Updated:** YYYY-MM-DD` (6 of 8 docs skipped → false "All doc dates are current") nor the Russian `**Дата:**` header. New regex `\*{0,2}(?:Last Updated|Date|Дата):\*{0,2}\s*(\d{4}-\d{2}-\d{2})`; verified BEFORE (6 skips, false PASS) / unit-check 7/7 / AFTER: **8/8 docs parsed, 0 skips**, PASS rows preserved, `--strict` exit 1 works. The sighted gate now emits 1 genuine warning (`CONTENT_RESTRUCTURE_PLAN.md`, 15d drift — the obs-3 file).
- **ed-matrix Phase A delivered:** NEW `docs/research/editorial_matrix.md` (608 lines): block-level audit of Parts 1/3/7A/9 — 38 sections, **210 block rows** with machine-checkable IDs `<data-section>::<NN>` (derivation rule documented for future script validation; counts script-verified 210/210 unique). Columns per research §32/§24/§22: tag / decision / functional load / repeat class. Outcome: 190 KEEP / 10 COMPRESS / 4 CROSS-REFERENCE / 1 MOVE / 5 DELETE; **13 automatic compression candidates** (DUPLICATE-only per §32) + R04 pair; repeat registry **R01–R20**. Headline findings: §7A.13 step-3 re-prints the full CORE DIRECTIVES block verbatim (→ DEC-08 shorthand, primary ed-2 target); Anchors-placement RULE printed 4× (canonical §1.4); §9.11 self-admitted `<details>` dupe (dupes-1); 5 repo-meta locations in reader prose, 2 stale (ed-6); Part 1 does **not** block-level re-teach Parts 2–7A (ed-1 scope narrowed with evidence); Part 9 already validate-not-re-teach.
- **New KIs (found by the matrix, fixes deferred — read-only row):** **KI#71** canon `part_07a.md` L30–31 byte-identical duplicate RULE line (master has one copy) · **KI#72** sampling contradictions §7A.6 ↔ §7A.7 (32B+ Temperature 0.7–1.0 vs 0.85–1.1; 32B+ RepPen 1.05–1.10 vs 1.0–1.05). PLAN rows `ki-71`/`ki-72` added; ed-matrix row re-scoped to Phase B (Parts 0/2/4/5/6/7B/8/10 + appendices).
- **Files (5 + 2 state + 1 new = 7 authored, no build outputs):** `scripts/check-doc-versions.mjs` · `docs/research/editorial_matrix.md` (NEW) · `STATUS.md` · `worklog.md` · `CHANGELOG.md` · `PLAN.md` · `AGENT_NAVIGATION.md` (§7 matrix row). KI#68 deleted from STATUS per lifecycle (closed iter-118, 2+ iterations passed).
- **Validation (after edits):** build PASS hash `2ab607d6` unchanged (`src/` untouched) · validate 5/5 + SHELL-* · validate:master 12/12 · version:check 9.2.6 · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · qa:english 19 / qa:syntax 247 (baselines unchanged) · qa:doc-versions 8/8 parsed · lint 0 errors · `git diff --check` clean · exploratory-build timestamp churn in root `index.html` restored.

### iter 119 — Lazy-loader per-part fetch resilience (KI#69) + KI#70 discovery — one-line

- iter 119 — Lazy-loader per-part fetch resilience: KI#69 fixed (retry/backoff + in-place `role=alert` placeholders + surgical single-part retry + manifest retry + content-hidden fix, `src/shell/lazy-loader.js` + `styles.css`); KI#70 opened (appendices never runtime-loaded, owner-gated); iter-119 headless runtime suite 48/48 + full battery green, hash `2ab607d6` unchanged. Detail: git `bd2134f0`.

### iter 118 — Editorial research intake + KI#68 fix (card-block counting) — one-line

- iter 118 — Editorial research intake (`docs/research/editorial_research_en.md`, 1288 lines + verification verdicts) + KI#68 fixed («четырёх»→«пяти» §1.2, canon+master); editorial tasks recorded in PLAN (ed-policy owner-gated, ed-matrix, ed-1…ed-8). 8 authored + 2 regenerated, hash `2ab607d6` unchanged. Detail: git `bd06f8a1`.

### iter 117 — Documentation hygiene (obs-1/obs-2 closure, doc-only) — one-line

- iter 117 — Documentation hygiene: `content_map.md` + `architecture.md` full content pass (headers → 9.2.6, 96/97/99 counting convention, tree rebuilt from repo), NAV §5 CORE DIRECTIVE #7 → "Pre-Generation Filter"; KI#67 + obs-3/obs-4 recorded. 7 doc-only files, hash `2ab607d6` unchanged. Detail: git `6d0029ae`.

### iter 116 — Agent operating-system rework (meta-iteration, doc-only)

- iter 116 — Agent operating-system rework (meta, doc-only): `AGENTS.md` rewritten as operating law (authority order, preflight, anti-loop, scope discipline, DoD, delivery vs BASE_COMMIT) + NAV de-historized + §10 information ownership + STATUS → state snapshot with authoritative Next step + PLAN → live backlog + `DECISIONS.md` created. 7 files + 1 new, hash `2ab607d6` unchanged. Detail: git `01a4f9d1`.

### iter 115 — Dead CSS cleanup in `src/shell/styles.css` (V-pattern blocks + M3 dead subset)

- iter 115 — Dead CSS cleanup in `src/shell/styles.css`: V-02/V-06/V-15 V-pattern blocks (240 lines) + 6 specific dead M3 rules (8 lines) removed; 248 lines total, ~5.3 KB. M3 widget CSS confirmed LIVE via 4-axis grep (iter-114 claim disproved). 1 source + 4 docs + 2 auto-regen. Canon sync 97/97. Build hash `2ab607d6` unchanged. (Full detail: git commit `c212a024`.)

### iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css` (SECTION 3 + dead SECTION 4 utilities)

- iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css`: SECTION 3 (VS Shared Patterns P1–P6, 196 lines) + 12 dead SECTION 4 utility blocks (211 lines) removed; 407 lines / ~10.2 KB. Verified dead via 4-axis grep; preserved live utilities documented. 1 source + 3 docs + 2 auto-regen. Canon sync 97/97. Build hash `2ab607d6` unchanged. (Full detail: git commit `c5ac950c`.)

### iter 113 — Mermaid infrastructure removal (dead code since iter 14)

- Mermaid CDN `<script>` + `widgets/mermaid-init.js` (141 lines) + lazy-loader init/render block + `reRenderMermaid()` + `.mermaid` CSS removed; CSP tightened (script-src dropped CDN, worker-src directive dropped entirely). 3 source + 1 deleted + 4 docs + 6 auto-regen. Canon sync 97/97. Build hash `c5c429e2` → `2ab607d6`. Detail: git `ce8139ba`.

### iter 112 — Dead code cleanup: 4 dead widgets + .fi26 CSS utilities removed (601 lines)

- iter 112 — 4 dead widgets removed (`diagnostic-tree`, `blueprint-viewer`, `author-note-viewer`, `vs-e15-blueprint`, 339 lines JS) + 4 script tags + 3 initAll() calls + `.fi26-*` CSS utilities (262 lines). 601 lines total. 3 source + 4 deleted + 3 docs + 6 auto-regen. Canon sync 97/97. Build hash f70870c0 → c5c429e2. 0 new English leaks. (See git commit `bed5eded` for full detail.)

### iter 111 — Fork D (part 1/3): Voice Influence Hierarchy interactive widget + naming drift fix

- New widget `persona-voice-hierarchy` (16th widget): model-tier toggle (12B/32B+/API) + hover-sync with sibling table + Markdown export. Canon-embedded data (6×3 from §3.2 table) — exception to data/*.json rule. Fixed naming drift in `part_07a.md` (`p3_voice_hierarchy` → `p3_influence_hierarchy`). 7 source + 6 auto-regen. Canon sync 97/97. Build hash 8499b4e3 → f70870c0. 0 new English leaks. (See git commit `c3b7e478` for full detail.)

### iter 110 — Multilingual forks A+B+C: layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size

- **Fork A — SP language rule softened (layered by model capability):** §7A.2 RULE was universal "директивы SP и CORE DIRECTIVES пишутся на английском". Now 3-tier: (1) 12B with <64K vocab (early Llama 2, Qwen 1.x, early Mistral) → English — historically more stable; (2) 12B–14B current-gen with ≥128K vocab (Gemma 3 12B, Mistral Nemo, Qwen 2.5 14B) → English optimal, card language acceptable; (3) 32B+ and API → card language preferred — model is fully multilingual, unified SP+RP language improves consistency. Threshold rule: ≥128K vocab + native card-language support → use card language for entire SP. Mirrored to §7A.7 model checklist (SP Language cell + footnote ¹ expanded), §7A.1 inline `<small>` hint, §9.10 12B-specific scenario, §9.11 Quick Check item #8 (renamed "Директивы на английском" → "Язык SP"), glossary CORE DIRECTIVES entry, AGENT_NAVIGATION §5 CORE DIRECTIVES block + §6 pitfall #4.
- **Fork B — Identity Block name-language rule formalized:** §7A.1 new RULE — character name preserves canonical form (Cyrillic/Latin/CJK) across all card blocks: Identity Block, Description `<identity>` XML tag, Greeting, Examples. Transliteration forbidden — model processes name as token-anchor of identity, not as instruction. Latin variant allowed only if documented as canonical (e.g., `Omnis-Zeta`). Mirrored to glossary Identity Block entry.
- **Fork C — Script Tax + Vocabulary Size as new Model Table concepts:** Added 2 new rows to Appendix B Model Capability Table — `Vocabulary Size` (32K typical for early 12B; 128K for current 12B–14B Gemma 3/Qwen 2.5/Mistral Nemo; 32K–128K for 32B+; 100K+ for API) and `Script Tax (non-Latin)` (high on 32K vocab: Cyrillic ~1.5–2× Latin, CJK ~1–2×; medium on 32K 32B+; low on ≥128K / API). Added new RULE in §7A.12 Token Budget — Script Tax note: for non-Latin scripts, 1 Cyrillic char ≈ 1.5–2 tokens on 12B 32K vocab, ≈1 token on ≥128K / API; threshold ≥128K → Script Tax negligible. NOT a separate "Multilingual scenarios" section — integrated into existing Model Table + Token Budget to avoid scope creep / redundancy. Updated `12B следствие` bullet in `appendix_model_table.md` to reference new Script Tax + nuanced SP Language rule.
- **Fork D — DEFERRED:** iter-113 (voice hierarchy + sampling + persona widget) touches JS infrastructure (lazy-loader.js, widgets/, possibly new widget data schema). Risk > reward vs text-based forks A+B+C. Documented in STATUS roadmap + AGENT_NAVIGATION roadmap as deferred — pending bandwidth for thorough widget testing.
- **Files edited (9 source + 6 auto-regenerated):** 4 canon MD (`part_07a.md`, `part_09.md`, `appendix_model_table.md`, `appendix_glossary.md`) + 4 master HTML (same 4 names) + `AGENT_NAVIGATION.md`. Auto-regenerated via `pnpm run build`: 4 `parts/*.html` + `index.html` + `build.hash`.
- **Validation:** `pnpm run build` SUCCESS (hash 8499b4e3 unchanged — no shell/widget changes). `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` / `qa:bundle` / `qa:contrast` / `qa:doc-versions` PASS.
- **English leak baseline:** 19 → 19 (no regression). Verified via `git stash` + re-run. All new prose in Russian; only established tech terms kept (12B, 32B+, API, SP, SPINE, Latin, Cyrillic, CJK, Llama, Qwen, Mistral, Gemma, Claude, GPT, Gemini).
- **qa:syntax pre-existing FAIL:** 247 patterns in 11 files — pre-existing baseline (verified via `git stash` + re-run). NOT caused by iter-110.
- **Scope:** 9 source files (4 canon MD + 4 master HTML + 1 AGENT_NAVIGATION) + 6 auto-regenerated root fallbacks. Over 3–5 file soft limit, justified by coherent multilingual-forks-abc pass in one iteration (single theme = multilingual actualization v2). All edits text-only — no structural changes, no section ID changes, no widget/CSS/JS changes.
- **User constraints honored:** (1) No crutches — all 3 forks implemented as principled rules (layered model-dependent SP language; canonical name preservation; integrated Script Tax concept). (2) No garbage — no separate "Multilingual scenarios" section (would create redundancy with Model Table + Token Budget). (3) Fork D deferred explicitly — avoids JS infrastructure risk in this iteration.
- **No KI opened or closed.** No open KIs remain.

### iter 108 — Мультиязычная актуализация (safe text-only pass) + KI#65 CLOSED (canon→master directive drift fix)

- **KI#65 CLOSED (canon→master directive drift):** `src/master/appendix_model_table.html` had wrong CORE DIRECTIVE numbers — "Consequence Driven (Directive #4)" and "Pre-Generation Filter (Directive #5)" — while canon correctly had #6 and #7. Fixed master: `#4 → #6`, `#5 → #7`. `parts/appendix_model_table.html` regenerated by build. Canon sync 97/97 PASS maintained.
- **Removed unsupported empirical claims (#1, #25, #26):** The "~15–20% higher English instruction compliance" number appeared in 9 places across canon/master/AGENT_NAVIGATION — without a benchmark source. Replaced with qualitative formulation: "На 12B-моделях английские инструкции исторически соблюдаются стабильнее — обучающая выборка ранних моделей содержала больше английских инструкционных паттернов. Для 32B+ и API-моделей разрыв несущественен." Methodology disclaimer (§1.1, §3.1) extended with model generation context: "12B–32B моделях 2024–2025 годов (Llama 2, Qwen 1.x, ранний Mistral). Для современных моделей со словарём от 128K токенов (Llama 3, Qwen 3, Gemma 3) разрывы могут быть меньше указанных."
- **Replaced misleading "native-language" wording (#2):** `appendix_model_table.md` row "English Instruction Adherence" cell — `~15–20% higher than native-language instructions` → `Historically higher on 12B (English-dominant training); narrows on ≥128K vocabulary`. Removes both the unsupported number and the "native-language" generalization (which implied all non-English languages behave identically — contradicts Script Tax findings).
- **Updated 12B model examples (#4):** `part_09.md` §9.10 — "Qwen 12B, Llama 2 13B" (2 generations old) → "Gemma 3 12B, Mistral Nemo 12B, Qwen 2.5 14B и подобные модели класса 12–14B актуальных поколений".
- **Refined "training data has more English patterns" claim (#3):** §7A.2 RULE — was universal ("потому что обучающая выборка содержит больше английских паттернов инструкций"), now scoped to early models only. Removes false universality for modern multilingual models.
- **Files edited (13 source + 8 auto-regenerated):** 6 canon MD (`part_01.md`, `part_03.md`, `part_07a.md`, `part_09.md`, `appendix_glossary.md`, `appendix_model_table.md`) + 6 master HTML (same 6 names) + `AGENT_NAVIGATION.md`. Auto-regenerated via `pnpm run build`: 6 `parts/*.html` + `index.html` + `build.hash`.
- **Validation:** `pnpm run build` SUCCESS (hash 8499b4e3 unchanged — no shell/widget changes). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` / `qa:bundle` / `qa:doc-versions` / `qa:contrast` PASS.
- **English leak baseline:** 19 → 19 (no regression). Verified via `git stash` + re-run on baseline: 19 was the actual baseline before iter-108 (CHANGELOG iter-107 said "17 → 17" but that referred to a different leak category — actual `check_english.py` baseline is 19). All 19 leaks are by-design (Part 10 Elena example card content, Part 06 stair-step format, SP directives, Tone Frame strings). iter-108 added 0 new leaks — all rewritten text is Russian, no new English terms introduced.
- **qa:syntax pre-existing FAIL:** `check_syntax_mix.py` reports Markdown patterns in `part_01.html` — pre-existing baseline issue (verified via `git stash` + re-run). NOT caused by iter-108. Documented in STATUS.md for awareness; out of scope for this iteration (safe text-only pass).
- **Scope:** 13 source files (6 canon MD + 6 master HTML + 1 AGENT_NAVIGATION) + 8 auto-regenerated root fallbacks via `pnpm run build`. Over 3–5 file soft limit, justified by combined text-actualization + drift fix in one iteration. All edits text-only — no structural changes, no section ID changes, no widget/CSS/JS changes.
- **User constraints honored:** (1) No new English terms — all rewritten prose in Russian, only established tech terms kept (12B, 32B+, API, SP, SPINE, Llama, Qwen, Mistral, Gemma); (2) Max semantic density — each replacement more informative than original; (3) No contradictions — §7A.2 RULE, Model Table cell, glossary entry, key follow-up all use consistent qualitative formulation; (4) No verbatim repetitions — each location has slightly different phrasing appropriate to context.
- **KI#65 CLOSED iter-108.** No open KIs remain.

### iter 107 — Category B/C extended translation pass + KI#64 CLOSED (mermaid-init.js rollback)

- cautious zone → осторожная зона (8 occ in part_05) + Embodiment Protocol quad State/Body/Sensor/Speech → Состояние/Тело/Сенсор/Речь (part_02 E04) + KI#64 CLOSED (JSDoc rollback 9.3.0 → 9.2.6). 7 source files. Canon sync 97/97. Build hash 8499b4e3 unchanged. 64/64 tests PASS.

### iter 106 — Category B final polish: 3 heading translations + survey script fix + translation backlog CLOSED

- 3 heading translations (`Model Capability Table` → `Таблица возможностей моделей`, `Token Budget Check` → `Проверка бюджета токенов`, `Tier 3 CoT (API only)` → `Tier 3 CoT (только API)`) + `survey_english_terms.py` fix (14 tokens moved TRANSLATABLE_LEAKS → ALLOWED_SINGLE_WORDS, categorize_token bug fixed). English leaks 19 → 17. 7 source files. Canon sync 97/97.

### iter 105 — Category C borderline translation pass: Quick/Full Check + Grade A/B/C tier labels translated

- `Quick Check` → `Быстрая проверка`, `Full Check` → `Полная проверка`, `Grade A/B/C` → `класс A/B/C` (Quality Grade compound kept as proper noun). Translation policy decisions Q1–Q10 documented for iter-106+. 5 source files. English leaks 18 → 17. Canon sync 97/97.

### iter 104 — Category B translation pass: PLANNED but NOT COMMITTED

- iter-104 was documented in worklog/CHANGELOG but the commit was never made. iter-106 picks up the same 3 Category B heading translations (`Model Capability Table`, `Token Budget Check`, `Tier 3 CoT (API only)`) and completes them. See iter-106 entry above for the actual implementation.

### iter 103 — English terms audit + categorization (doc-only)

- Surveyed all 14 master HTML files (~6,600 lines, 3 238 Latin-token instances). New script `scripts/survey_english_terms.py`. Categorized into A (KEEP ENGLISH ~1 440), B (TRANSLATE ~470), C (BORDERLINE ~640), D (HTML ARTIFACTS ~120). 3 new artifacts: audit report + companion JSON + re-runnable survey script. 3-iteration translation plan proposed. No source HTML changes.

### iter 102 — VS-EMBED placement audit + reorder (6 misplaced visual elements fixed)

- 6 misplaced VS-EMBEDs (E14, E06, E09, E08, E16, E02) moved inside their sections after intro `<p>`. 4 master HTML + 1 audit script + 3 doc files. KI#65 CLOSED. 97/97 PASS. Build PASS. 64/64 tests PASS.

### iter 101 — Agent infrastructure English rewrite + actualization

- New `AGENTS.md` (short LLM-friendly entry point). `AGENT_NAVIGATION.md`, `STATUS.md`, `worklog.md`, `PLAN.md` rewritten in English. `README.md` updated with `AGENTS.md` reference. KI#64 documented (mermaid-init.js version drift).

### iter 100 — Mermaid dynamic theme re-render on toggle

- **`widgets/mermaid-init.js`:** Added `window.reRenderMermaid(theme)` — re-initializes mermaid with appropriate theme config (`dark` for OLED, `default` for Light), restores original diagram source from `data-original` attribute, removes `data-processed`, and calls `mermaid.run()` to re-render all diagrams.
- **Light theme config:** `theme: 'default'` with light-appropriate `themeVariables` (light bg/text colors).
- **Dark theme config:** `theme: 'dark'` with existing OLED brand colors (unchanged).
- **`assets/lazy-loader.js`:** `applyTheme()` now calls `reRenderMermaid(theme)` after CSS class toggle. Safe no-op if function unavailable.
- **`lazy-loader.js`:** Before initial `mermaid.run()`, saves diagram source text to `data-original` attribute (enables future re-render without losing source).
- **`assets/shell-styles.css`:** Added `body.theme-light .mermaid` and `body.theme-light .concept-diagram` overrides (light border/background).
- **Mirror files synced** (`assets/` ↔ `src/shell/`).
- ⚠️ Side effect (documented as KI#64 in iter 101): JSDoc `@version` in `mermaid-init.js` was bumped to `9.3.0` alone, breaking 4-place version sync.

### iter 99 — Theme chain simplified

- `body.theme-oled` removed. Default = OLED/dark (no class). Only `theme-light` is toggled. Simplifies theme logic across CSS and JS.

### iter 98 — Dark theme removed

- Dark theme removed. Only OLED + Light remain. Reduces theme matrix from 3 → 2.

### iter 97 — Annotation callout blocks removal

- **Annotation callout blocks removed:** All 4 "Annotation: Карточка ... демонстрирует:" blocks (Elena §10.1, Walter §10.2, Omnis-Zeta §10.3, Vyshcherblenny §10.4) removed from canon, master HTML, and parts fallback. Per author request — text nobody reads.
- **Cross-ref line removed:** "Подробно о Lorebook → Part 7B. CoT Anchors → Part 6. GHOST Layers → Part 4." removed from all 3 Part 10 sources.
- **Audit script updated:** P2-18 positive checks → negative checks. 97/97 PASS.
- **Build regeneration:** Root fallbacks regenerated. Version sync ✓.

### iter 96 — KI#63 version drift fix

- KI#63 closed. All 4 version sources synced at 9.2.6. Root fallbacks regenerated.

### iter 95 — E2/KI#58 Dead weight cleanup + Anchors parts/ sync

- **E2 — Dead weight cleanup:** 5 unused characters removed from `docs/character_bible.md` (Geralt, Joker, Jesse Pinkman, Edward Elric, Elliot Alderson — 0 mentions in any Part). Tyler Durden → 🟡 Marginal (1 mention in Part 5). Lorebook Entry 2 (пожар Елены) → ⚠️ NON-CANONICAL secondary GHOST.
- **KI#58 — Anchors parts/ sync:** Omnis-Zeta + Vyshcherblenny `[ANCHORS]` plain text in `parts/part_10.html` → `<anchors>` XML canonical + bodily/mechanical Prices from `src/master/part_10.html`. All 4 cards now use `<anchors>` XML in parts/.

### iter 94 — E1/KI#60/KI#61/KI#62 Voice leak + Walter sync + audit fix

- **E1/KI#60 — Elena Voice leak fixed:** "саркастичная" removed from `<identity>` across all 3 layers (master, parts, canon). §9.11 Quick Check Voice row: ✗ FAIL → ✓ PASS.
- **KI#61 — Walter parts/ sync:** Tone Frame expanded, OOC PROTECTION + Format Lock + `<identity>` wrapper + OCEAN compact format + `<anchors>` XML + Annotation bullets synced.
- **KI#62 — Audit script fix:** `audit_canon_master_sync.py` P2-18 check updated to current merged Anchors format. 96/96 PASS.

### iter 93 — D1–D4 Guide self-contradictions

- **D1:** §9.11 Elena Voice check false claim fixed (✗ FAIL instead of ✓ PASS).
- **D2:** OCEAN format unified to compact `O:72 C:65 E:41 A:38 N:68` (no pipes/commas) across 12 locations.
- **D3:** Anchors format convention documented — `<anchors>` XML canonical in src/master/, `[ANCHORS]` plain text in parts/ = KI#58 drift.
- **D4:** CORE_DIRECTIVES shorthand `{{CORE_DIRECTIVES — ...}}` accepted as convention.

---

## Older Iterations (iter 1–92)

Brief. Full history: `git log` and `docs/research/`.

- **iter 89–92:** C1–C4 Bible sync (Walter/Omnis/Vyshcherblenny/Elena) + Walter GHOST Anchor-trigger + OCEAN cautious zones + Vyshcherblenny Examples expand + V3 Anchor Prices bodily.
- **iter 86–88:** B1–B4 Examples enrichment — all 4 cards Examples expanded to 80–120 tok per `<START>` block.
- **iter 83–85:** A5–A8 — Omnis-Zeta 5/7 Anchor Prices bodily; Vyshcherblenny GHOST → concrete event; All cards `<anchors>` XML + Tone Frames expand.
- **iter 82:** A2–A4 — Walter SP Tone Frame + OOC + `<identity>` wrapper + LIE fix.
- **iter 81:** A1 — Elena SP Tone Frame + OOC Protection.
- **iter 80:** Exploratory audit of examples (research-only): 4 universal violations, 26 card-specific, 20 Bible-vs-card discrepancies, 4 self-contradictions.
- **iter 1–79:** Docs restructure + canon scaffold + migration + VS elements + CSS scoping. Key milestones: iter 79 (Voice Isolation refinement), iter 78 (Anchors placement P7A-R16), iter 77 (OCEAN cautious zones), iter 76 (CoT Tier 0), iter 75 (P1 Fixes), iter 70–74 (Recon V1–V9).
