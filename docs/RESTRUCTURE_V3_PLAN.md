# Restructure v3 — staged plan and handoff

> **Status:** Stage 1 EXECUTED (iter 171) · **Stage 2 EXECUTED (iter 172)** — see §5.1 ·
> **Stage 3 EXECUTED (iter 173)** — see §5.2.
> **Stage 4a EXECUTED (iter 174)** — teaching modules 2/3/4/5/6, see §5.3.
> **Stage 4b EXECUTED** — slice 1 (F-17, iter 175), slice 2 (F-18 + F-24, iter 176),
> slice 3 (F-19, iter 177) and slice 4 (F-20, iter 178) — see §5.4. **The whole v3 track
> is complete: all 24 findings burnt down.**
> **Owner-approved direction:** 2026-10-22 (chat) — see §2.
> **Companion audit:** the full findings registry lives in §6; the analysis that
> produced it was delivered in chat (2026-10-22) and is summarised in §1/§6.
> **Read this file first** in any fresh context that continues the work.

---

## 1. Why this track exists

Reader complaint (owner-verified): the guide is *перегруженный*, confusing, and
forces mode-switching (guide → reference → glossary → instruction → back).

Diagnosis (3 root causes, measured — not "too many words"):

1. **Navigation was broken.** The shell TOC showed 35 of 98 sections; Parts 7A/7B
   were absent entirely (`^p(\d+)_` never matched `p7a_*`); Part 8 showed 1 of 16
   sections; a second inline TOC (removed in S1) used English/slug labels.
2. **Every section was self-sufficient**, so one rule is stated 3–8 times
   (voice-in-Examples 34×, Anchor=T→A→P 7×, OCEAN pole limit 5× *with
   contradictions*). 10 callout labels, 127 labelled blocks, 97 styled boxes vs
   ~110 plain-bold ones.
3. **The topic boundary was undefined**: model choice, context windows, sampling,
   API wrappers, frontend compatibility live inside the card-building flow
   (§7A.6/7A.7/7A.10/7A.11, Appendix B, §9.10, §7B.3) — the owner flagged exactly
   this ("выбор языковых моделей… настройку и наладку оных").

**Success metric (per DEC-15):** reduced redundant semantic load + improved
navigability. Never word count alone; no unique capability may be lost.

---

## 2. Owner decisions (2026-10-22)

| # | Question | Owner answer |
|---|----------|--------------|
| 1 | Guide boundary: move model/context/params to an appendix? | **Yes**, "если оно будет к месту" |
| 2 | Psychology (Enneagram/wings/matrix/MBTI cross): keep? | **Move to reference**, "лучше не выкидывать… переработать и сделать более наглядным и юзабельным" |
| 3 | Anti-patterns: index + 5 worked examples, or all 15? | **Do not fragment meanings** — if AP is used, keep it in one place, all of it ("в 1 месте и все сразу а не огрызок подавать") |
| 4 | Part 10 cards: expand `<details>`? | **No** — keep collapsed; put **Elena in the start** as the target/demonstration |
| 5 | E15 blueprint (contradicts §10.1) | Agent's call — "делай как будет качественнее" |
| 6 | Work shape | Iterations in **clean contexts** are better than one long run |

---

## 3. Stage map

| Stage | Name | Goal | Status |
|-------|------|------|--------|
| **S1** | Navigation + entry | The reader can see the whole guide and understand where to start | ✅ DONE (iter 171) |
| **S2** | Guide boundary + Part 7A/7B | Move the model/runtime layer out; make SP assembly one linear job | ✅ DONE (iter 172) |
| **S3** | Diagnostics & anti-patterns (8+9) + Part 10 payoff | One troubleshooting instrument; AP in one place; cards usable | ✅ DONE (iter 173) |
| **S4a** | Teaching modules (2/3/4/5/6) | De-duplicate the teaching flow; one owner per rule (38 → 26 sections) | ✅ DONE (iter 174) |
| **S4b** | Apparatus (VS/widgets/glossary/labels) | One visual language: embeds inside sections, 3 widgets, one glossary surface, 4 labels | ✅ **DONE (iters 175–178)** — F-17, F-18, F-19, F-20, F-24 |

Each stage is self-contained: build → gates → docs → handoff note, so a fresh
context can stop after any stage with a green tree.

---

## 4. Stage 1 — what was executed (iter 171)

### Changed behaviour

1. **TOC covers the whole guide.** `src/shell/lazy-loader.js`:
   - Part-grouping regex `^p(\d+)_` → `^p(\d+[ab]?)_` (TOC build **and** active-Part
     highlighting);
   - Tier-1 label = authored `data-part-title` (fallback: first `<h2>`, then `Part N`);
   - Tier-2 label = the section's **own** first `h2|h3` (previously "first `<h3>`",
     which mislabelled every section whose title itself is an `<h2>`);
   - the "no `<h2>` → drop the Part" bail removed (it hid Part 7B).
2. **Authored Part titles.** `data-part-title` on the first section of each Part
   (`src/master/part_00…part_10`), e.g. `part_04` → "SPINE: психологический
   каркас". `scripts/build-unified.mjs` now emits it into `parts/manifest.json`
   (fixes the `"title": "Part 07b"` placeholder).
3. **Every section is in the TOC** — `data-toc-nav` added to 50 sections that
   lacked it (95/95 Parts + 3 appendices visible; regression test in
   `tests/test-toc-coverage.mjs`).
4. **One navigation artifact.** The inline auto-TOC (built into Part 1 §1.2 by
   `AUTO_TOC_PLACEHOLDER`, with its hardcoded English `titleMap`) is gone: the
   content block, the build injection and the dead `anchorToTitle`/`generateTOC`
   functions were deleted. §1.2 subsection is now «Структурные свойства блоков»
   (table + budget/pipeline pointers, no route duplication).
5. **Part 0 rewritten as a reader on-ramp** (`docs/canon/part_00.md` +
   `src/master/part_00.html`): what the reader gets, three reading routes, the
   module map, an **Elena card skeleton as the target**, and a 4-row label legend.
   Removed from the reader path: `[VS: …]` / `[ref: …]` notation, `visual-system/`
   paths, the 10-label legend, the runtime/iteration note.
6. **Block-model contradiction fixed**: "карточка = 4 блока" → **5 blocks**
   (4 mandatory + Lorebook when needed) in Part 0; Part 1 already said five.
7. **§9.9 heading restored** (`<h3>Минимум сценариев и метрики успеха`) — it had
   no section-level heading, so the TOC fell back to the slug "test requirements".

### Verification (all green at the end of S1)

```
node scripts/build-unified.mjs            # 98 sections, 0 errors
pnpm run build                            # hash c1518874
node scripts/validate-artifact.mjs        # PASS
node scripts/validate-master.mjs          # 12/12 PASS
node scripts/version-sync.mjs             # 9.2.6 in sync
node scripts/csp_check.mjs                # PASS (no inline scripts)
node scripts/bundle_check.mjs             # PASS
node scripts/contrast_checker.mjs visual-system/tokens.json  # PASS
node --test tests/test-*.mjs tests/integration/*.mjs         # 68/68
node scripts/check-doc-versions.mjs       # 1 warning (pre-existing)
python scripts/audit_canon_master_sync.py # PASS 87/87
python scripts/audit_canon_master_drift.py# informational (actionable 116 at iter 178)
python scripts/audit_{glossary,core_directives,token_budget,enneagram,diagnostics,voice,sampling}_parity.py  # all PASS
python scripts/readerpath_audit_iter164.py# PASS (68 sections; appendices A/E)
python scripts/debug_readerpath_audit_iter139.py  # PASS
python scripts/check_english.py           # 1 leak (baseline)
python scripts/check_syntax_mix.py        # 226 patterns (baseline)
```

Windows shell notes: `pnpm` must be invoked as `cmd /c "pnpm …"` (the `.ps1`
shim is blocked by the execution policy); python audits need
`$env:PYTHONIOENCODING='utf-8'` or they die with a `UnicodeEncodeError` on stdout.

**Browser proof (headless Chrome against `dist/`, iter 171):** the runtime TOC
renders **98 entries** — Parts 7A = 13 sections, 7B = 5, Part 8 = 16, plus the
«Приложения» group (A/B/C); Part titles come from `data-part-title`; zero page
errors (the only 404 is the browser's automatic `/favicon.ico` probe, which the
site does not declare).

---

## 5. Stage 2 — guide boundary + Part 7A/7B (EXECUTED iter 172)

### Scope

1. **New appendix E — «Модель, контекст и параметры генерации»**
   (canon `docs/canon/appendix_model_params.md` + master
   `src/master/appendix_model_params.html`, id `appendix_model_params`,
   `data-toc-nav`, its own TOC group entry).
   Content moved there, with the *core* kept in the guide:
   | From | What moves | What stays in the linear flow |
   |---|---|---|
   | §7A.6 | sampling tables, per-model recs, Ollama/LM Studio/KoboldCPP/vLLM notes | one check line: `PP = 0.0`, `RepPen ≤ 1.10` |
   | §7A.7 | model capability checklist | — (duplicates Appendix B) |
   | §7A.10 | API wrappers (`<claude_info>`, `[SYSTEM NOTE]`) | a collapsed "если вы на API" block at the end of 7A |
   | §7A.11 | 4K-Fallback protocol | the 4K/8K/16K scale as a budget column in §7A.12 |
   | §7A.12 | Script Tax detail | one line: "русская карточка → нижняя граница бюджета" |
   | §7A.2 | SP-language thresholds (64K/128K) | one line |
   | Appendix B | whole table | — (appendix removed; its `НАБЛЮДЕНИЕ` disclaimer moves to appendix E) |
   | §9.10 | 12B specifics | 5 rows inside diagnostics (S3) |
   | §7B.3 | `EVENT:` frontend compatibility list | one footnote line |
2. **§7A.13 becomes the payoff**: one assembled SP block + budget calculation, no
   re-printing of §7A.1/7A.3/7A.4/7A.8 fragments.
3. **Template defects (blockers):**
   - `<a href>` inside `<pre><code>` (`part_07a.html` §7A.13 step 3) → plain text;
   - `**Cross-ref:** … docs/vyshcherblenny_character_bible.md` inside the `<ocean>`
     template (`part_07a.html`, `part_10.html`) → deleted;
   - `[processus_analysium]…[/INTERNAL]` mismatched pair → `[INTERNAL]…[/INTERNAL]`;
   - §7B.3 "⚠️ ВНЕ КАНОНА … `docs/elena_character_bible.md`" → plain "вариант:
     вторичный призрак (не для канонической Елены)" or delete;
   - §7B.3 example vs its own parameter table (Depth 5 / Prob 70% vs
     "Depth 2–4 / 30–50%") → align;
   - E18/E17 placement: move each embed inside its own section.
4. **One budget owner**: §7A.12 is the only place with numbers; §7A.13 and Part 10
   reference it. Kill the 4 conflicting Elena budgets (~440 / ~540–1000 / ~610 /
   ~1500+).
5. **E15 decision (owner delegated):** rebuild from §10.1 **or** delete. Preferred:
   delete — it duplicates §10.1 and drifts (its Elena has a different GHOST/WANT and
   English SP). If kept, add an E15↔§10.1 parity check.

### §5.1 Execution record (iter 172)

| # | Planned | Executed |
|---|---------|----------|
| 1 | New Appendix E | **DONE** — `docs/canon/appendix_model_params.md` + `src/master/appendix_model_params.html`, 1 section `appendix_model_params`, `data-toc-nav`, TOC group entry; `APPENDIX_GUIDE_ORDER` = A→C→E. Merged capability table (13 rows — Appendix B's 9 + §7A.7's 5, duplicate XML/CoT rows united), 4K-Fallback profile, sampling tables + E17 embed, Script Tax, SP-language thresholds, API wrappers, `EVENT:` compat |
| 2 | §7A.13 payoff | **DONE** — one assembled SP Елены (identical blocks to §10.1), steps 1–3 no longer re-print §7A.1/7A.3/7A.4/7A.8, step 6 = the single per-card budget calculation |
| 3 | Template blockers | **DONE** — `<a>` out of `<pre>`; `**Cross-ref:**` + bible path out of both `<ocean>` templates (16K+ OCEAN values kept in a Russian note outside); `[processus_analysium]` pair normalized; §7B.3 «⚠️ ВНЕ КАНОНА» + bible path → plain «вариант: вторичный призрак»; §7B.3 example 4 → Depth 1 / 40% (a world record); E18 → §7B.2 |
| 4 | One budget owner | **DONE** — §7A.12 block-budget owner unchanged; the 440 / 540–1000 / 610 / 1500+ Elena numbers all replaced by references to §7A.13 step 6 |
| 5 | E15 decision | **DELETED** (the preferred option) — the 105-line un-sectioned blueprint carried a contradictory Elena card; `[VS: E15]` marker + `vs-mini-map` entry removed; no inbound anchor existed |
| — | Gates in the same iteration | `audit_sampling_parity.py` (owner → Appendix E), `audit_token_budget_parity.py` (E15 checks retired), `audit_core_directives_parity.py` (plain-text master shorthand), `audit_voice_parity.py` (§7A.7 mirror → Appendix E), `audit_canon_master_sync.py` (97→95 probes), `readerpath_audit_iter164.py` (A/C/E), `audit_canon_master_drift.py`, `audit_component_extracts.py`, glossary defers |

**Verified (iter 172):** build 98 sections · hash `c1518874` (shell source untouched) · validate · validate:master 12/12 · version 9.2.6 · tests 68/68 · lint · csp/bundle/contrast · doc-versions 1 pre-existing warning · sync **95/95** · 7 parity gates PASS · both reader-path tools PASS · baselines **english 1** (was 18) / **syntax 230** (was 238) · drift 144 · browser proof (headless Chrome over `dist/`): TOC 98 entries with appendices A/C/E, Appendix E renders 5 tables + 7 h3 + E17, §7A.6/§7A.7 = 0 tables + working pointer, Part 10 opens on Elena (no E15), zero broken in-page anchors, zero page errors.

### Constraints / gates

- **Section ids must not change** (`p7a_*`, `p7b_*`): 44 inbound links + 20 entries in
  `data/anchor-redirects.json`. Move *content*, keep the section and re-point its
  body to "см. Приложение E" (2–3 lines + link).
- Parity locks that MUST be updated in the same commit as the move:
  `scripts/audit_sampling_parity.py` (§7A.6 canonical), `audit_token_budget_parity.py`
  (§7A.12 canonical), `audit_core_directives_parity.py` (§7A.2).
- Appendix B removal touches: `parts/manifest.json` (generated), `docs/content_map.md`,
  `docs/canon/_README.md`, `STATUS.md` invariants, `scripts/readerpath_audit_iter164.py`
  (its Reference-mode assertions list appendices A/B/C and count 98 sections).
- Full battery from §4 plus `python scripts/audit_canon_master_sync.py`.

> **Outcome (iter 172):** all §7A/§7B ids stayed frozen (13 `p7a_*` + 5 `p7b_*`); the three named parity gates + four more were re-pointed in the same iteration; the readerpath Reference assertions updated.

### Acceptance

- A reader building a card never leaves the card-building flow to read model advice.
- All three moved sections still answer "what do I set?" — in appendix E.
- No template a reader copies contains repo paths, English maintainer notes or links.
- Section count drops by appendix B (98 → 97 unless E adds one section: 98 → 98).

---

## 5.2 Stage 3 — diagnostics & anti-patterns + Part 10 payoff (EXECUTED iter 173)

### Scope (as executed)

1. **One troubleshooting instrument — Part 9: 11 → 7 sections** (ids frozen where inbound links exist):
   §9.1 `p9_basic_checklist` = the ENTRY (4-step route + the per-block localization scan; `data-part-title`
   moves here), §9.2 `p9_symptom_table` = flat lookup (13 rows; absorbed the pointer-only §9.4), §9.3
   `p9_decision_tree` = the single decision instrument (E13 mapping + the E13 embed moved INSIDE the
   section), §9.4 `p9_one_change_rule` (unchanged), §9.5 `p9_pre_deploy` = **ONE numbered checklist 1–14**
   (5 quick + 9 full; absorbed the quality scale + E14 + both worked examples), §9.6 `p9_test_scenarios`
   (absorbed the element→scenario map + the minimum/metrics section), §9.7 `p9_12b_issues`.
   Absorbed → redirects: `p9_quality_scale`, `p9_additional_problems`, `p9_element_scenario_map`,
   `p9_test_requirements`. F-07 (no items 1–5 existed; two incompatible full checks) and F-08 (the
   9.3⇄9.5⇄9.6⇄9.11 circle; no entry point) are closed.
2. **Anti-patterns in one place — Part 8: 16 → 2 sections.** `p8_antipatterns_overview` survives
   (the E12 embed moved INSIDE it — the outside-section warning is gone; the catalog cards corrected:
   AP-8 anchors placed in Description, AP-10 count rule, AP-14 4K-Fallback, AP-15 atomicity, AP-11
   inter-character Voice Bleed, AP-4 SP = instructions, AP-1 budget defer; a11y restored) + new
   `p8_worked_examples` (15 `<details>`, symptom/cause/fix → owner + the unique demo payload; the five
   payload-free duplicates are 3 lines). F-11 closed; the 15 absorbed ids → redirects.
3. **Part 10 payoff: 4 → 5 sections.** New `p10_index` «Какую карточку взять» (`data-part-title`
   moves there; Elena's duplicate `<h2>` removed) with the difficulty / what-it-shows / model-context /
   what-to-copy / what-NOT-to-copy / size table (size = «§7A.13 шаг 6», no digits). F-15 closed: the 13
   lecture/annotation sites moved OUT of the copy-paste templates into notes; the 5 remaining token
   totals in three cards → §7A.13 шаг 6 references; cards stay collapsed, §10.1–§10.4 numbers frozen.
4. **Gates re-pointed in the same iteration:** `audit_diagnostics_parity.py` (§9.3/§9.4/§9.6 numbering +
   the new ONE-checklist guard; the retired 5-group tree table's P2-17 probes and P0-12 retired),
   `audit_sampling_parity.py` (§9.1/§9.2/§9.7 probes), `audit_canon_master_sync.py` (95 → 89 probes:
   P0-12 re-pointed, the seven P2-17 probes → one), `readerpath_audit_iter164.py` (81 sections;
   `PART_10_BLUEPRINTS` = index + 4 cards), `debug_readerpath_audit_iter139.py` (§9.3/§9.4/§9.6 chain).
   `data/anchor-redirects.json` +20 entries (15 AP ids + 4 P9 ids; `p9_top5_problems` re-pointed);
   glossary homes/xrefs → `p8_worked_examples`; `docs/content_map.md` Part 8/9/10 tables rebuilt.

### Verified (iter 173)

build **81 sections** / 3 appendices / 0 errors · hash `c1518874` (source `src/shell/index.html`, unchanged)
· validate PASS (114 redirects, all targets live) · validate:master **12/12** (the Part-8 outside-section
warning is gone) · version 9.2.6 · **tests 68/68** · lint · csp/bundle/contrast · doc-versions (1
pre-existing warning) · **sync 89/89** · **7 parity gates PASS** · both reader-path tools PASS
(81/81 difficulty metadata) · baselines **english 1** (unchanged) / **syntax 229** (was 230 — down) ·
drift informational.

### Constraints / acceptance (met)

- **No symptom without an owner**: every row of §9.2 links the rule owner; the E13 mapping keeps the AP set.
- **One checklist**: 14 real numbered items in canon + master, guarded by `audit_diagnostics_parity.py`
  (the «Пункты 1–5» displacement can never return).
- **AP not split**: catalog + worked examples in one place; no per-AP stub sections.
- **Ids**: `p9_decision_tree` / `p9_one_change_rule` / `p9_test_scenarios` / `p9_pre_deploy` / `p9_12b_issues`
  unchanged; absorbed ids carry redirects; no live id is shadowed.

---



## 5.3 Stage 4a — teaching modules 2/3/4/5/6 (EXECUTED iter 174)

### Scope (as executed)

1. **Part 2: 6 → 5.** `p2_anchor_examples` → `p2_anchor_rules`; **F-21** fixed (the «Разговор» example row now carries an immediate physical Price, matching §2.2's mandatory-Price rule).
2. **Part 3: 8 → 5.** `p3_examples_quality` → `p3_examples_rules`; `p3_joker_case` + `p3_multi_char` → `p3_voice_leak` (Voice Bleed keeps its own subsection). **F-13**: §3.2 reduced from 7 representations of the influence idea to 4 (canonical 6×3 table · E07 · interactive widget · one RULE); the parity-locked table/prose/«Недавний чат»/`[VS: E07]` payload is byte-identical (`audit_voice_parity.py` PASS). **F-22**: §3.1 methodology re-framed generation-neutrally.
3. **Part 4: 11 → 6.** `p4_spine_navigation` → `p4_spine_overview` (**F-14**: the nav stub is gone, the chain is stated once, the Part exits moved into the §4.1 closing pointer); `p4_ghost_layers` → `p4_ghost` (3-tier advanced case as a subsection, E06 inside the section); `p4_want` → `p4_need`; `p4_spine_mapping` + `p4_spine_check` → `p4_spine_full_chain` (chain → anchor map → 7-item consistency check).
4. **Part 5: 7 → 5, F-01 closed.** `p5_ocean_warning` → `p5_ocean_basics`: §5.1 is the **single owner** of the pole limit — recommended 1–2 extremes in any context; context ceilings 4K = 2 / 8K = 3 / 16K+ = 4 / 32K+ = 5; every extreme beyond two needs a SPINE bridge; **4+ unjustified = the «Критический» level** (§9.5 item 12). §9.5, §9.2, §7A.13 and `appendix_character_map` reference it and never restate a threshold. `p5_enneagram_wings` → `p5_enneagram_basics`. **F-12**: «90% карточек = SPINE+OCEAN» moved to the Part opening. E10 moved INSIDE §5.3; the conflicting master-only `context-limits-box` scale deleted.
5. **Part 6: 6 → 5.** `p6_cot_bridge` → `p6_cot_basics` — **F-10** (the dead «Quickstart (CoT) — 60-минутный конвейер» promise) deleted; **F-23** (one tier-owner statement instead of a second model mapping).
6. **Part 1 findings:** **F-09** (headings consecutive 1.1–1.6; the block-properties block promoted to §1.3, §1.4 kept probe-safe), **F-06** (Elena = the Simple card; §1.6 wording reconciled to §10.0/§10.1), **F-22** (era-correct vocabulary framing in §1.1).
7. **Gates re-pointed in the same iteration:** `audit_canon_master_sync.py` (P0-16 = the new ladder; P1-3 §5.3→§5.1; P1-7 §4.11→the live pointer — still **89 probes**), `audit_enneagram_parity.py` + `scripts/generate_enneagram.mjs` (§5.4→§5.3 section search, marker tokens, embed comment), `audit_sampling_parity.py` (Appendix E CoT row §6.3→§6.2), `readerpath_audit_iter164.py` (69 sections; prebuild/pipeline id sets). `data/anchor-redirects.json` +12 entries and 6 chain re-points (114 → 126); glossary homes/xrefs re-pointed + `data/glossary.json` regenerated; `content_map` Parts 2/3/4/5/6 rebuilt.

### Verified (iter 174)

build **69 sections** / 3 appendices / 0 errors · hash `c1518874` (source `src/shell/index.html`, unchanged) · validate PASS (**126 redirects**, all targets live) · validate:master **12/12** (0 errors; the part_05 warning disappears with E10 inside the section) · version 9.2.6 · **tests 68/68** · lint · csp/bundle/contrast · doc-versions (1 pre-existing warning) · **sync 89/89** · **7 parity gates PASS** · both reader-path tools PASS (69/69 difficulty metadata) · baselines **english 1** (unchanged) / **syntax 226** (was 229 — down) · drift actionable 137 → 117 (informational) · browser proof (headless Chrome over `dist/`): 69 rendered sections with the planned per-Part split (2 = 5 · 3 = 5 · 4 = 6 · 5 = 5 · 6 = 5), TOC 69 entries, 12 Part titles, zero broken in-page anchors, E09/E10 inside their sections, §5.1 carrying exactly one «Потолок экстремумов» table, one page error = the external Geist-font CSS request (network, pre-existing).

### Constraints / acceptance (met)

- Rule owners keep their ids; every absorbed id is a redirect to its survivor; no chain, no shadowed id.
- No rule, example, table or diagnostic capability lost — the DEC-15 5-point check was applied per merge (recorded in the iteration worklog).
- Section count and difficulty metadata agree canon↔master; every Part keeps exactly one `data-part-title`.

---

## 5.4 Stage 4b — apparatus (IN PROGRESS; slice 1 = F-17, iter 175)

### Scope (planned, from the F-17…F-20/F-24 registry rows)

> **Decision-ready inventory:** `docs/research/s4b_apparatus_inventory_iter175.md` — the
> F-18 widget topology (6 content widgets + 5 VS scripts), the confirmed 3 survivors
> (`ocean-insight`, `persona-voice-hierarchy`, `mbti-composer`), the disposal order with
> every gate/test/doc touchpoint, the `enneagram-builder` autofill evidence, and the
> F-19/F-20/F-24 starting notes.

1. **F-17 — embeds inside sections (DONE iter 175).** No VS-embed renders outside a
   `<section data-section>`; every embed carries a canonical `[VS: EXX — …]` marker.
2. **F-18 — widgets 11 → 3.** Keep the three that add a capability no table carries
   (E10 enneagram graph, E13 diagnostic aid, `persona-voice-hierarchy` — the last one
   is parity-locked by DEC-21); drop the prose-embedding duplicates (`ocean-insight`,
   `enneagram-builder`, `mbti-composer`, `persona-cross`, `persona-synthesis`,
   `vs-e16-author-note`, `vs-mini-map`); `vs-scroll-observer` + `widget-utils` are
   infrastructure, not widgets. The `enneagram-builder` SPINE autofill is banned by
   §5.1's «не собирать SPINE снизу вверх».
3. **F-19 — one glossary surface (DONE iter 177).** 4 surfaces measured: runtime panel +
   generated no-JS page (both 45, same generated source/order/anchors), Appendix C (25,
   frozen v1, zero inbound links), registry (45, not reader-facing). Executed: keep the
   panel + its no-JS twin as ONE surface, delete Appendix C, add one prose pointer,
   re-point the two legacy anchors (DEC-31).
4. **F-20 — 4 callout labels, one treatment (DONE iter 178).** Executed: the label set is
   `ПРАВИЛО` / `РЕКОМЕНДАЦИЯ` / `ПРИМЕР` / `НАБЛЮДЕНИЕ`; every labelled block is a `.callout`
   opening with `<p><strong>LABEL:</strong>`; the chips (`ШАБЛОН`/`ИЛЛЮСТРАЦИЯ`), the nav
   labels and the plain/boxed split are retired (DEC-32).
5. **F-24 — Appendix A.** The resume promises «16 типов MBTI», the section carries
   4 temperaments; the promise and the content must agree.

### §5.4 Execution record — slice 1 (iter 175, F-17)

| # | Planned | Executed |
|---|---------|----------|
| 1 | Locate every embed outside a section | **DONE** — depth-0 parse of `src/master/*.html`: 6 chunks, exactly F-17's set (E01, E03, E04, E07, E05, E11) |
| 2 | Move each inside its canonical section | **DONE** — E01 → §1.2 `p1_card_overview`, E03 → §2.1 `p2_basic_anchors`, E04 → §2.3 `p2_embodiment`, E07 → §3.2 `p3_influence_hierarchy`, E05 → §4.1 `p4_spine_overview`, E11 → §6.2 `p6_cot_tiers` |
| 3 | Keep the parity-gate boundaries intact | **DONE** — each embed keeps its `<!-- REPLACED BY VISUAL SYSTEM: EXX -->` terminator adjacent; the E01/E07 regions are byte-identical for `audit_token_budget_parity.py` / `audit_voice_parity.py` |
| 4 | Complete the canon markers | **DONE** — `[VS: E09]` (§5.1), `[VS: E11]` (§6.2), `[VS: E18]` (§7B.2) added; `[VS: E03]` weak marker completed; the E01 marker moved §1.3 → §1.2 |
| 5 | Re-point stale placement refs | **DONE** — §7A.1 (canon + master) E01 §1.1 → §1.2 + link `#p1_card_overview`; `appendix_model_params` `vs_cross_ref` → §1.2; E11 «preamble Part 6» → «выше в этом разделе» |
| 6 | Gates in the same iteration | **DONE** — `validate-master.mjs` outside-section check is the guard (6 warnings → 0); no parity gate needed a change because the payload/region boundaries stayed identical |

**Verified (iter 175):** build **69 sections** / 3 appendices / 0 errors · hash `c1518874`
· validate PASS (**126 redirects**) · validate:master **12/12, 0 warnings** (was 6)
· version 9.2.6 · **tests 68/68** · lint · csp/bundle/contrast · doc-versions (1
pre-existing warning) · **sync 89/89** · **7 parity gates PASS** · both reader-path
tools PASS · baselines **english 1** / **syntax 226** (unchanged) · drift actionable
**117** (unchanged; markers are not drift) · browser proof (headless Chrome over
`dist/`): 69 sections, **17/17 embeds inside sections**, TOC 69 section links +
12 part titles, 69/69 difficulty metadata, 0 broken in-page anchors, 0 page errors.

### §5.4 Execution record — slice 2 (iter 176, F-18 + F-24)

| # | Planned | Executed |
|---|---------|----------|
| 1 | Widgets 11 → 3 without capability loss | **DONE** — retired `persona-cross` + `persona-synthesis`: §5.5 now carries a **static 5×9 OCEAN×Enneagram matrix** (9 rows generated from `data/enneagram.json`, O/C/E/A/N columns, |r| ≥ 0.5 bold) + a 4-step «сверка трёх систем» protocol; the section id `p5_cross_matrix` stays alive for the `cross-matrix` redirect |
| 2 | Kill the SPINE autofill §5.1 forbids | **DONE** — `enneagram-builder` retired; the §5.4 sentence «Интерактивный выбор типа с автозаполнением SPINE» replaced with the §5.1 rule pointer; canon §5.3 «используется для выведения SPINE из типа» corrected to validation-only |
| 3 | The 3-widget split | **DONE** — `src/shell/widgets/` = `ocean-insight` · `mbti-composer` · `persona-voice-hierarchy`; 5 VS scripts → `src/shell/interactions/`, 2 shared scripts → `src/shell/lib/`; `index.html`, `build-shell-unified.mjs` (dist + root copies), `audit_vs_embeds.py`, `audit_enneagram_parity.py` updated in the same iteration |
| 4 | F-24 | **DONE** — Appendix A's bullet now promises «4 оси, 4 темперамента и 16 типов (разбор — в интерактивном справочнике выше)» — the kept `mbti-composer` fulfils it |
| 5 | Gates in the same iteration | **DONE** — `validate-master.mjs` Check 12 keeps only the surviving containers; `audit_enneagram_parity.py` drops the builder/synthesis readers (E10 reader remains); no other gate changed |

**Verified (iter 176):** build **69 sections** / 0 errors · hash **`6f563edc`** (was
`c1518874`; the shell `index.html` script paths are the only source change) · validate
PASS (**126 redirects**) · validate:master **12/12, 0 warnings** · version 9.2.6 · **tests
68/68** · lint · csp/bundle/contrast · doc-versions (1 pre-existing warning) · **sync
89/89** · **7 parity gates + `audit_vs_embeds` PASS** · both reader-path tools PASS ·
baselines **english 1** / **syntax 226** · drift actionable **117** · browser proof
(headless Chrome over `dist/`): 69 sections, TOC 69, all 12 script srcs resolve,
3 widgets render (ocean 17 / mbti 28 / voice 29 injected nodes), no retired containers,
§5.5 static matrix 9 rows, 0 broken in-page anchors.

**Disclosed:** dead CSS for the three retired widgets is left in place (no opportunistic
cleanup, `src/shell/styles.css`); `data/enneagram.json` still feeds the E10 mini-card and
`data/mbti.json` the kept composer.

### §5.4 Execution record — slice 3 (iter 177, F-19)

| # | Planned | Executed |
|---|---------|----------|
| 1 | One glossary surface | **DONE** — Appendix C deleted (`docs/canon/appendix_glossary.md`, `src/master/appendix_glossary.html`); the DEC-17/18 chain (registry → generated `data/glossary.json` → panel + its no-JS twin) is the only term surface |
| 2 | Close the «zero links from prose» half | **DONE** — Part 0 §0.1 «Термины» pointer (canon + master), links the no-JS page |
| 3 | Keep every legacy anchor alive | **DONE** — `05_glossary` / `glossary` → `p0_how_to_read`; 126 redirects, all targets live; the two Appendix-C sync probes retired (89 → 87) |
| 4 | Re-point the appendix layer | **DONE** — `APPENDIX_GUIDE_ORDER` A → E; readerpath APPENDIX_ORDER + corpus count 69 → 68; drift CANON_FILES 16 → 15; the core-directives deferred note updated |
| 5 | Docs in the same iteration | **DONE** — DEC-31; `docs/canon/_README.md`, `glossary_registry.md`, `terminology_dictionary.md`, `content_map.md` (counts re-based), `AGENT_NAVIGATION.md`, `AGENTS.md`, `docs/architecture.md`, plan, STATUS/worklog/CHANGELOG |

**Verified (iter 177):** build **68 sections** / 0 errors · hash `6f563edc` (unchanged —
`build.hash` = `sha256(src/shell/index.html)` only; DEC-05) · validate PASS (**126
redirects**) · validate:master **12/12, 0 warnings** · version 9.2.6 · tests **68/68** ·
lint · csp/bundle/contrast · doc-versions · **sync 87/87** · **7 parity gates +
`audit_vs_embeds` PASS** · both reader-path tools PASS · baselines **english 1** /
**syntax 226** · drift actionable re-baselined (Appendix C rows gone) · browser proof:
68 sections, appendices A/E render, no `appendix_glossary` in the DOM, 0 broken anchors.

**Disclosed:** `data/anchor-redirects.json` was edited (AGENTS stop-condition) on the
owner's delegated call («сам реши… не нужно дублирование»); all 126 targets verified
live by SHELL-REDIRECTS; `data/glossary.json` byte-stable.

### §5.4 Execution record — slice 4 (iter 178, F-20)

| # | Planned | Executed |
|---|---------|----------|
| 1 | Four labels, one treatment | **DONE** — `ПРАВИЛО` / `РЕКОМЕНДАЦИЯ` / `ПРИМЕР` / `НАБЛЮДЕНИЕ`; every labelled block = `.callout` + `<p><strong>LABEL:</strong> …</p>` (79 callouts in 14 master files) |
| 2 | Retire the chips | **DONE** — 44 `example-label` chips (`ШАБЛОН` ×17, `ИЛЛЮСТРАЦИЯ` ×27) deleted; headings/lead-ins already identify the blocks; `.example-block` strips lose their bold label and keep a prose «Пример:» lead |
| 3 | Retire the nav labels | **DONE** — `Ссылка` ×16, `Ссылка (далее)` ×1, `Синтез` ×5, `Соглашение` ×1, `Переход` (legend), `Демонстрирует` ×4 → prose; `Примечание` ×5 → 4 `НАБЛЮДЕНИЕ` callouts + 1 plain definitional sentence |
| 4 | Normalise the rest | **DONE** — 21 long/whole-sentence labels, 2 English labels (`RULE —`, `EXAMPLE —`), 2 lowercase `Правило:`; Part 0 legend 10 → 4; canon mirrors updated in the same iteration |
| 5 | Dead CSS (disclosed debt from F-18) | **DONE** — retired-widget families (`persona-cross`, `persona-synthesis`, `enneagram-builder`, legacy `.ennea-*`) + `.example-label` removed: `styles.css` 7019 → 6028 lines (braces balanced, no dangling selectors) |
| 6 | Gates in the same iteration | **DONE** — `validate-master.mjs` Check 8 enforces the 4-label set + opener + chip ban (negative-tested); sync needles re-pointed (87 probes unchanged); readerpath checks the `<pre><code>` template surface + 4 «Карточка демонстрирует:» annotations; `docs/components.md` rewritten to the 4-label registry |

**Verified (iter 178):** build **68 sections** / 0 errors · hash `6f563edc` (unchanged:
`build.hash` is the shell-index hash, DEC-05; `styles.css` is copied, not hashed) · validate
PASS (**126 redirects**) · validate:master **12/12, 0 warnings** (with the new label guard) ·
version 9.2.6 · tests **68/68** · lint · csp/bundle/contrast · doc-versions · **sync 87/87** ·
**7 parity gates + `audit_vs_embeds` PASS** · both reader-path tools PASS · baselines
**english 1** / **syntax 226** · browser proof: 68 sections, **79 callouts, labels exactly 4**
(ПРАВИЛО 50 · РЕКОМЕНДАЦИЯ 19 · ПРИМЕР 5 · НАБЛЮДЕНИЕ 5), **0 `example-label` chips**, all 79
callouts styled, Part 0 legend = 4 labels, 0 broken anchors, 0 page errors; the three widgets
render (ocean inputs/svg, mbti 16 cells, voice 6 rows), E13 toggles (3) and the AN template
buttons (2) still work.

**Disclosed:** `.ennea-*` legacy alias CSS (≈80 lines) was dead too (E10 uses
`.enneagram-container`/`.type-node`, retained); `docs/components.md` was stale (documented the
validator-rejected `.warn/.tip/.important` variants) and is rewritten.

### Acceptance for the whole stage (all met)

- No VS-embed outside a section; `validate:master` outside-section warnings = 0. ✅
- Widget count = 3 (5 interaction scripts + 2 libs are not widgets). ✅
- One glossary surface. ✅ (F-19, iter 177)
- Label set = 4, one rendering treatment. ✅ (F-20, iter 178)
- Appendix A's promise matches its content (F-24). ✅

---

## 6. Findings registry

Severity: **B** = blocker (breaks a copy-paste template, a rule, or navigation),
**M** = major, **m** = minor. Stage column = where it should be fixed.

| ID | Sev | Where | Defect | Stage |
|----|-----|-------|--------|-------|
| F-01 | B | §5.1 / §5.3 / §9 #12 / §9.1 / §7A.12 / §7A.13 | OCEAN pole limit contradicts itself (1–2 / up to 3 / up to 4 / ≤2 / "4+ = critical"). Reader following the 16K+ table fails the Part 9 check | S4a ✅ (one ladder in §5.1 + conditional critical, iter 174) |
| F-02 | B | E15 vs §10.1 | Two different Elena cards (different GHOST/WANT/NEED, English SP) | S2 ✅ (E15 deleted, iter 172) |
| F-03 | B | E15 vs §7A.1 | Anchor placement: "inside Examples" vs "`<anchors>` in Description" | S2 ✅ (E15 deleted, iter 172) |
| F-04 | B | Part 1 §1.8 / §10.1 / §7A.13 | 4 different token budgets for one card | S2 ✅ (one calculation = §7A.13 step 6; Part 10/§1.8 reference it) |
| F-05 | B | copy-paste templates | `<a>` inside `<pre>`, `**Cross-ref:**` + repo path, `[/INTERNAL]` mismatch | S2 ✅ (fixed; §7B.3 «ВНЕ КАНОНА» + example-4 params too) |
| F-06 | B | Part 1 §1.8 | "Простая — Уолтер Уайт. Средняя — Елена" vs "это конфигурация Елены (Простая)" | S4a ✅ (Elena = Simple, iter 174) |
| F-07 | B | Part 9 | 5 competing checklists; "14 пунктов" whose 1–5 do not exist; two incompatible full checks | S3 ✅ (one 14-item checklist, iter 173) |
| F-08 | B | Part 9 | No entry point: §9.3 → §9.5 → §9.6 → §9.11 send the reader in a circle | S3 ✅ (4-step entry route, iter 173) |
| F-09 | B | Part 1 §1.2 grouping | numbering holes 1.1 / 1.2 / **1.4** / **1.7** / 1.8 | S4a ✅ (1.1…1.6, iter 174) |
| F-10 | B | §6.1 | dead promise: "Quickstart (CoT) — 60-минутный конвейер" (exists nowhere) | S4a ✅ (deleted, iter 174) |
| F-11 | M | Part 8 | 16 sections, 10 of them 40–90-word restatements of rules owned elsewhere; E12 catalog and the sections diverge (AP-14/15/10/8 fixes) | S3 ✅ (2 sections: catalog + worked examples, iter 173) |
| F-12 | M | Part 5 | 60% of the part is beyond its own "90% of cards need only SPINE+OCEAN" | S4a ✅ (claim up front, cross-instrument apparatus last, iter 174) |
| F-13 | M | Part 3 §3.2 | one idea in 7 representations (table + E07 + widget + prose + rule + example + transition) | S4a ✅ (4 representations, iter 174) |
| F-14 | M | Part 4 | chain restated 6× before new information; §4.10 nav stub (44 words) before the last real section | S4a ✅ (chain once, stub gone, iter 174) |
| F-15 | M | Part 10 | 4 cards behind `<details>` (owner: keep), but no index and no "which one to take"; lectures inside `<spine>`/`<ocean>` templates | S3 ✅ (`p10_index`; 13 lecture sites moved out of templates, iter 173) |
| F-16 | M | Part 0 map | Part titles were 4 different names per Part (map / manifest / h2 / sidebar) — **S1 fixed the sidebar+manifest half**; the map now matches `data-part-title` | — |
| F-17 | M | apparatus | 18 VS-embeds, 7 of them outside any section (no anchor, no TOC); E01 in a foreign section; E17/E18 in the wrong section | S2 ✅ (E17/E18 placed, iter 172); S4a ✅ (E09/E10 inside sections, iter 174); **S4b ✅ (all 17 inside sections + canon markers complete, iter 175)** |
| F-18 | M | apparatus | 11 widgets, ≥4 duplicate prose; `enneagram-builder` autofills SPINE, which §5.1 forbids | **S4b ✅ (iter 176 — 3 content widgets · 5 interactions · 2 libs; autofill removed)** |
| F-19 | M | glossary | 4 inconsistent surfaces (25/45/45/45), different headwords/order; zero links from prose | **S4b ✅ (iter 177 — Appendix C deleted, one registry→panel surface, Part 0 prose pointer, DEC-31)** |
| F-20 | M | global | 10 callout labels, two rendering treatments (97 boxed vs ~110 plain) | **S4b ✅ (iter 178 — 4 labels, one treatment, chips retired, Part 0 legend 4, validator guard, DEC-32)** |
| F-21 | m | §2.3 | example row violates §2.2's mandatory Price | S4a ✅ (Price added, iter 174) |
| F-22 | m | §3.1/§1.1 | stale empirics ("2024–2025: Llama 2, Qwen 1.x") | S4a ✅ (era-correct framing, iter 174) |
| F-23 | m | §6.2 vs §6.3 | Tier-1 model support stated two ways | S4a ✅ (one tier-owner statement, iter 174) |
| F-24 | m | appendix A | "Что вы теперь умеете" promises 16 MBTI types; only 4 temperaments present | **S4b ✅ (iter 176 — the bullet points at the kept `mbti-composer` reference)** |

**Do not touch** (capability, not repetition): §7A.2 full directives + Russian
explanations; §7A.12 limits table; §5.4 nine-type table + `data/enneagram.json`
(parity-locked); §9.2 one-change rule; §9.7/§9.9 protocol; §7B.4–7B.5 lorebook
mechanics; the four Part 10 card bodies; §4.7/§6.5 worked examples (inbound-linked);
`docs/canon/glossary_registry.md` + `data/glossary.json` (the only consistent pair).

---

## 7. Standing constraints (violating these breaks the repo, not just the guide)

1. **Canon first**: `docs/canon/*.md` → `src/master/*.html`; `audit_canon_master_sync.py` must pass (89 probes).
2. **Section ids are stable**: `data/anchor-redirects.json` + external inbound links + glossary `home` fields. When merging: the surviving id stays, the absorbed id becomes a redirect.
3. **Hard fences**: content only inside `<section data-section>`; no `<style>`/`<script>`/`<link>`/`<meta>`/inline styles/inline handlers; no Markdown patterns in HTML (`qa:syntax` baseline 229 must not grow); one `<h1>` per page, section headings styled per fence #6.
4. **One navigation surface** — the shell TOC; `tests/test-toc-coverage.mjs` enforces `data-toc-nav` + `data-part-title` + no inline TOC returning.
5. **Baselines**: `qa:english` 1 and `qa:syntax` 226 must not increase.
6. **Version**: 9.2.6 across `package.json` · `src/VERSION` · `data/character_schema.json` · build manifest.
7. **Scope discipline**: `git add <paths>` only, never `-A`; disclose every regenerated artifact (`parts/`, `assets/`, `widgets/`, `data/`, `index.html`, `build.hash`).

---

## 8. Handoff protocol for a fresh context

1. Read this file, then `STATUS.md` (Next step), then `AGENTS.md` (fences).
2. `git status --short` — the worktree carries pre-existing modifications from
   2026-10-21/22 (validate-artifact redirect gate, anchor-redirects, deleted
   lighthouse/test-scenario files). **Preserve them; do not revert.**
3. Establish the baseline first: run the battery from §4 and record the numbers.
4. Execute the next stage's scope; keep every id; update the parity scripts that
   own what you moved, in the same commit.
5. End with: gate results, `git diff --stat <BASE_COMMIT>`, the disclosed artifacts,
   and a STATUS/worklog update naming the next stage.

---

*Created iter 171 (2026-10-22). Owner-approved direction; findings evidence-backed
by a six-pass audit (5 cluster readers + a load-bearing verification pass).*
