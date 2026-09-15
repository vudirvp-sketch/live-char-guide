# Changelog

> Only the latest iterations in detail. Older iterations = one-line summaries.
> Full history is in `git log`.
> Format: [Keep a Changelog](https://keepachangelog.com/).

## [9.2.6] — 2026-08-15

### iter 142 — voice-cluster-build: LAST bounded area executed — §3.2 canonical prose + full `[VS: E07]` marker (DEC-21); AN-12B re-framed per Option A; `audit_voice_parity.py` gate; KI#82 closed; E07 disposed

- **Scope (STATUS Next-step row 1, pinned iter 141):** the Voice influence % cluster build slice (Registry B row 7 — the last unexecuted bounded area; PLAN row voice-cluster stage 2) per the iter-141 package §5. Owner call received: chat 2026-09-15 «продолжай работу по плану!» — the go-ahead on the iter-141 recommended package (the only prepared plan pending a call; recorded with verbatim provenance, DEC-18/19/20 go-ahead precedent) → **DEC-21**: V-a/V-b/V-c/V-e as recommended; V-d = **Option A** (table wins — no numeric change).
- **Canon §3.2 gains the canonical textual home:** NEW prose block «Хранилище ≠ Влияние» after the table (Хранилище vs Влияние distinction + SP-primacy misconception correction with the drift implication + the 2 widget quantitative claims: модель копирует последние ~10–20 сообщений; влияние Greeting падает после ~5 реплик — previously embed/JS-only, invisible to canon, no-JS readers and every audit; Editorial 5-point check passed, the E07 inset keeps its visual function, `viz > dry text` preserved via the marker-declared relationship). The weak `[VS: E07]` marker upgraded to the full `_README.md` §3.3 format (values `SHARED_REFERENCE` — §3.2 owns; inset prose `TEXTUAL_CANONICAL`; parity audit named). `[INTERACTIVE WIDGET]` marker extended with the notes disposition (2 claims canonicalized; 4 rule-restatement notes stay widget-local, DEC-09; data/*.json extraction rejected per package §4.3). Table row-1 label «Recent chat» → «Недавний чат» (V-e, DEC-16; 18 values byte-unchanged).
- **V-d Option A re-frames (no numeric change):** canon §7A.5 note — «на 12B влияние AN на голос пренебрежимо мало (~2%), на API доходит до ~5%» + the range-derivation ref (the old «справедливо только для API-моделей» mis-framing corrected — ~2–5% is the whole-row min–max); canon §7A.7 РЕКОМЕНДАЦИЯ + master mirror — «влияние AN на голос пренебрежимо мало (~2%)»; widget note likewise. E16 gains the derivation note (E15 pattern): canon marker «диапазон = мин–макс строки AN по моделям, исходные значения — §3.2» + master position-indicator value «(диапазон = мин–макс строки AN — §3.2)». Zero «AN не влияет» statements remain (verified by the audit across canon + master + widget).
- **Master layer:** §3.2 mirror (label + prose `<p>`); E07 embed re-pointed — comment declares §3.2 ownership (DEC-21, values + inset prose, parity-locked); outer comment label corrected «Voice Isolation» → «Voice Influence Hierarchy» (the embed's own header mislabeled the element — disclosed); root fallbacks regenerated (`parts/part_03.html`, `parts/part_07a.html`, `widgets/persona-voice-hierarchy.js`, root `index.html` = delivery-build timestamp only).
- **Widget (DEC-09 preserved):** constants byte-unchanged (18 values == §3.2, audit-parsed); header gains the note-deference declaration; AN-12B note re-framed; row-1 label «Недавний чат» (canon + master + widget/export now aligned — the F4 divergence eliminated; E07's existing labels stay per V-e).
- **New MUST-PASS gate `scripts/audit_voice_parity.py` PASS** (9 check groups, `audit_diagnostics_parity.py` pattern): canonical record (6×3 + marker tokens + prose anchors + widget-marker disposition) · master mirror + RULE anchor · E07 embed (re-point comment, declared label set incl. compressed «SP», presentation markers, no stale «Recent chat») · widget 18-value parity + Option A note + header deference · V-d re-frames repo-wide · glossary defers (registry + generated JSON, §3.1 ref) · no competing sources (per-layer counts; declared name-pointers allowed) · root fallbacks current · map/matrix/content_map/AGENTS parity + disposal complete. Wired into `AGENTS.md` canon-audits (parity ×6 now).
- **KI#82 CLOSED + disposal:** content_map §3.2 Notes corrected (Недавний чат ≫ Examples > Greeting > AN > Description > SP — SP слабейший, ~0–2%; + canonical-owner note). **4 E07 files REMOVED_WITH_REASON** (DEC-19 at-slice-time disposal, iter-138 pattern): prototype `elements/E07-voice-hierarchy.html` + extracts `E07-{script,styles,visual}` (archive = git history).
- **Registries/state:** map — Registry A E07 + Registry B row 7 → DECIDED (DEC-21) + EXECUTED iter 142; §6 preamble + row 6; NEW §5.6 voice slice (VC-1..VC-10 + accounting + deferred notes: visual-system/PLAN.md table copy frozen; E16 prototype/extract frozen — family slice pending, derivation note embed-only by design); §7 entry. Matrix — back-pointers `p3_influence_hierarchy::01–::06` + `::08`; NEW `::09` seeded (the prose block). DECISIONS — DEC-21 (append-only verified; one mid-edit DEC-20 overwrite caught + restored in-iteration). STATUS (+1 invariant; Next step re-pinned: KI#72 sampling value decision = the last bounded area; v2 architecture phase opening — both owner-called; semantic extraction COMPLETE). PLAN (voice-cluster → Completed; rows sampling-cluster + v2-architecture added, owner-gated). NAV §1 (E07 disposal; disclosed stale-hero-phrase fix). 19 modified + 1 created + 4 deleted vs `BASE_COMMIT 9f4712bc`.
- **Verification (executed — full battery, canon + master + widget touched):** build ✓ (hash `2ab607d6` unchanged) · validate ✓ · validate:master 12/12 (pre-existing warnings) · version:check 9.2.6 ✓ · tests **64/64** · qa:csp/bundle/contrast PASS · qa:doc-versions 1 pre-existing warning · qa:english **18** / qa:syntax **247** (baselines exact) · sync **97/97** · drift actionable **159** (unchanged — the new prose is fully mirrored; re-frames match byte-for-byte) · parity **×6 PASS** · `git diff --check` clean.

### iter 141 — voice-cluster-evidence: Registry B row 7 owner-gate package prepared (doc-only) — one-line

- iter 141 — voice-cluster-evidence: verified evidence + recommended calls V-a…V-e for the Voice influence % cluster disposition (`docs/research/voice_cluster_iter141.md`; value parity green at every layer — widget 6/6 == canon; unique prose = 0 canon occurrences; AN-12B framing tension surfaced — Option A recommended); nothing DECIDED; KI#82 opened (content_map §3.2 stale Notes — fix rides the build slice). Doc-only. Detail: git (iter-141 commit).

### iter 140 — hero-disposal: §6.4 hero disposal slice executed — `visual-system/hero/` REMOVED_WITH_REASON + KI#81 dead CSS closed (DEC-19); all four map-§6 gates now executed

- **Scope (STATUS Next-step row 1, pinned iter 139):** the §6.4 hero disposal slice — the last map-§6 gate (DEC-19 recorded iter 138; ready mechanical candidate, gates nothing). PLAN row hero-disposal: `visual-system/hero/` git-rm + KI#81 `.vs-hero-placeholder` CSS cleanup + root fallback rebuild + map Registry A hero row → REMOVED_WITH_REASON executed + KI#81 CLOSED. Own iteration — production CSS touched → full battery + rebuild.
- **Disposal:** `visual-system/hero/architecture-skeleton.html` (1 file, 428 lines) → `REMOVED_WITH_REASON` — never integrated (no `hero` section in `src/shell/index.html`; INTEGRATION-MAP row unexecuted); runs on Three.js via `cdn.jsdelivr.net` importmap = the external-CDN dependency class iter-113 deliberately removed; zero consuming requirement. Archive = git history (DEC-19). Frozen `visual-system/` design docs (PLAN.md / QA-CHECKLIST.md / INTEGRATION-MAP.md) untouched — hero references resolve to git history (iter-138 precedent).
- **KI#81 CLOSED — dead CSS removed:** the 5 `.vs-hero-placeholder` selectors (zero consumers since the never-executed Phase-4 commit `0addf38d`) removed from `src/shell/styles.css` in 3 edit sites (L557 theme-light one-liner; the `/* === VS HERO PLACEHOLDER === */` section = base + `button` + `button:hover`; the multi-line theme-light override) — net −31 lines. Root fallback `assets/shell-styles.css` regenerated (mirror −31); root `index.html` = delivery-build `Generated:` timestamp churn only. Build hash `2ab607d6` unchanged (`src/shell/index.html` untouched).
- **Registries/state:** map Registry A hero row → EXECUTED iter 140 + §6 preamble (all four §6 gates executed) + §6.4 decision row + §7 iteration log; NAV §1 visual-system row (hero → REMOVED_WITH_REASON — structural change: directory gone); STATUS (iter 140, KI#81 CLOSED — row kept per lifecycle, delete after >2 iterations; Next step re-pinned: voice-cluster evidence package row 1, disposition owner-gated); PLAN (hero-disposal → Completed tracks; voice-cluster = the only ACTIVE TRACK row); worklog (iter-139 → one-liner, iter-130 dropped — ≤10 cap). 7 modified + 1 deleted = 8 paths.
- **Verification (executed):** build ✓ (hash unchanged) · validate ✓ · validate:master 12/12 (pre-existing warnings) · version:check 9.2.6 ✓ · tests **64/64** · qa:csp/bundle/contrast PASS · qa:doc-versions 1 pre-existing warning · qa:english **18** / qa:syntax **247** (baselines exact) · canon sync **97/97** · drift actionable **159** (unchanged — CSS-only delta) · parity ×5 **PASS** · acceptance: hero directory gone; zero `.vs-hero-placeholder` across `src/`/`parts/`/`assets/`/`widgets/` · `git diff --check` clean. vs `BASE_COMMIT 6348dd61`.

### iter 139 — mig-3-diagnostics-cluster: fifth bounded area executed — E13 mapping canonicalized in §9.6 (TEXTUAL_CANONICAL, DEC-20); Debug reader path wired

- **Scope (STATUS Next-step row 1, pinned iter 138):** execute the Diagnostics cluster v2 build slice (Registry B row 4; PLAN row mig-3; gate cleared by DEC-20 — `TEXTUAL_CANONICAL` → §9.6, E13 = visual presentation / decision aid). Pattern: mig-2 precedent (canonical record → master mirror → embed re-point → parity audit; no machine layer).
- **Canon §9.6 gains the canonical textual home:** NEW sub-heading «Три базовых симптома: полный маппинг (канонический источник дерева E13)» + intro paragraph (E13 relationship declared, TEXTUAL_CANONICAL; Debug-chain refs to §9.2 one-change + §9.7 test scenarios) + 6-row mapping table — 3 symptoms («Персонаж дрейфует после 5–10 сообщений» / «Голос звучит типично / неразличимо» / «Персонаж игнорирует действия пользователя»), 6 checks, 9 diagnoses, 7 AP refs (AP-2/3/5/6/8/9/11 — DEC-16 Russian labels matching Part 8 headings), 8 E-target refs (E01/E02/E03/E04/E07/E08 ×2/E16/E17) with canonical-home `[ref:]` links. The weak L139 «Ссылка» REPLACED by the full `[VS: E13]` marker (`_README.md` §3.3 format) — the «визуальная версия дерева» claim is now true. Canon §9.2 «Применение» extended with the §9.6 back-link (IMP-48 pair).
- **Master mirror (`src/master/part_09.html`):** h4 sub-heading + intro (links `#p9_one_change_rule` / `#p9_test_scenarios`) + mirrored table (10 anchor targets: Part 1 §1.2, Part 2 §2.1/§2.4, Part 3 §3.2, Part 7A §7A.2 ×2/§7A.5/§7A.6/§7A.13, Part 9 §9.2/§9.7); the missing «Формат:» sentence restored (pre-existing drift closed); §9.2 «Применение» paragraph added (was entirely absent in master — pre-existing no-master-match drift closed); E13 embed comment re-pointed (§9.6 canonical ownership declared, values parity-locked). The Walter P3-4c cross-ref paragraph kept byte-identical (sync-audit anchor; disclosed master-only drift).
- **New acceptance gate `scripts/audit_diagnostics_parity.py` PASS (7 checks + deferred-layer notes):** canon inventory (symptoms/checks/diagnoses/AP/E sets + full marker + chain refs); master mirror (+ P3-4c Walter + P2-17 anchors intact); E13 embed parity (roots/diagnoses/checks == canon; badge inventory == AP∪E; 6+6 branch labels; re-point comment); §9.2 back-link both sides; no competing sources (symptom strings: canon 1× part_09.md only; master 2× = table + embed; §9.5 clean); root fallback current; map/matrix parity. **Debug reader-path audit EXECUTED and PASS** (`scripts/debug_readerpath_audit_iter139.py`): symptom → cause (every anchor resolves in the built artifact) → test (§9.7) → one-change (§9.2, back-linked) → validation (§9.9/§9.11) — end-to-end on `parts/part_09.html`.
- **Registries:** map §5.5 Diagnostics slice seeded + executed (DT-1..DT-8); Registry A E13 + Registry B row 4 → executed iter 139; §7 iteration log. Matrix: row `p9_decision_tree::05` seeded + back-pointers on `::03`/`::04` + `p9_one_change_rule::02`. `docs/content_map.md` §9.6 row notes the canonical home. AGENTS.md canon-audits block += the new MUST-PASS gate. STATUS (+1 invariant; Next step re-pinned: hero-disposal row 1, voice-cluster disposition row 2 — owner call, §6.5 row 3); PLAN (mig-3 → completed; voice-cluster row added as owner-gated).
- **Verification (executed):** diagnostics parity **PASS** · Debug reader-path **PASS** · canon sync **97/97 PASS** · glossary + core-directives + token-budget + enneagram parity PASS · full build OK (hash `2ab607d6` unchanged) · validate ✓ · validate:master 12/12 (preamble-embed warnings pre-existing) · version:check 9.2.6 ✓ · tests 64/64 · qa:csp/bundle/contrast/doc-versions PASS · qa:english **18** / qa:syntax **247** (baselines exact) · drift informational — actionable **159** (160 − 1: the «Формат:» restoration + §9.2 mirror closed pre-existing entries; the [VS: E13] marker replaced the old L139 entry) · `git diff --check` clean. 9 modified + 2 created vs `BASE_COMMIT 3a667688`.

### iter 138 — owner-gates-ratified + §6.1 disposal: all four map-§6 gates DECIDED (DEC-19/DEC-20); visual-markup ownership locked; 16 stale prototype/extract files removed — one-line

- iter 138 — owner-gates-ratified-disposal: owner go-ahead «начинай работу по планам» → DEC-19 (master embed canonical / L4-L5 frozen; hero remove) + DEC-20 (E13 TEXTUAL_CANONICAL → §9.6; rule-strength classes ratified); §6.1 disposal executed — 16 prototype/extract files REMOVED_WITH_REASON (E08/E01/E15/E10); map/NAV/architecture/STATUS/PLAN truth-up; doc+disposal-only, battery green. Detail: git `3a667688`.

### iter 137 — owner-gates-recommendation: decision package for the four open map-§6 gates prepared, verified, recorded (doc-only) — one-line

- iter 137 — owner-gates-recommendation: verified evidence + recommended calls for map §6.1/§6.2/§6.4/§6.5 (+ call order); nothing DECIDED; KI#81 opened (dead `.vs-hero-placeholder` CSS); new evidence: hero Three.js CDN importmap. Doc-only. Detail: git `5de8fc9c`.

### iter 136 — mig-5-enneagram-data: fourth bounded area executed — single canonical value owner locked (§5.4 ↔ generated data layer ↔ E10) — one-line

- iter 136 — mig-5: §5.4 canonical → `scripts/generate_enneagram.mjs` (owns the machine-layer supplement) → generated `data/enneagram.json` v2.1.0 (LIE folded to one internal copy); builder + synthesis re-pointed; E10 mini-cards SHARED_REFERENCE; `audit_enneagram_parity.py` PASS (11 checks); battery green, hash unchanged, baselines exact. Detail: git `9b8d3138`.

### iter 135 — mig-4-token-budget: third bounded area executed — single canonical value owner locked (§7A.12 ↔ E01/E15) — one-line

- iter 135 — mig-4-token-budget: E01 verified canonical at every layer (foundation §4.4 wrong-side-copy claim corrected in the registry); E15 Examples derivation note + `[VS: E01/E15]` canon markers; `audit_token_budget_parity.py` PASS; battery green, hash unchanged. Detail: git `27de84b2`.

### iter 134 — mig-2-core-directives: second bounded area executed — single canonical presentation locked (R02/DEC-08) — one-line

- iter 134 — mig-2-core-directives: §7A.13 verbatim re-print → DEC-08 shorthand (canon+master); E08 = the one visual presentation, parity-locked by `audit_core_directives_parity.py`; node-7 title aligned to the canonical h4; KI#80 typo fold; battery green, hash unchanged. Detail: git `886a2c24`.

### iter 133 — mig-1-glossary-build: DEC-18 ratification + the DEC-17 chain implemented end-to-end (v2 build phase opened) — one-line

- iter 133 — mig-1-glossary-build: DEC-18 recorded; `docs/canon/glossary_registry.md` (45 entries) + `scripts/generate_glossary.mjs` (first `pnpm run build` stage) + generated `data/glossary.json` (9.2.6) + `scripts/audit_glossary_parity.py` PASS; RepPen 5th KI#72-family location eliminated; battery green, hash unchanged. Detail: git `306af0f7`.

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
