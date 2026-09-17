# Migration Map v2 — Live Character Guide (living registry)

> **Owner of the question "куда попал каждый существенный смысл v1 и почему?"**
> This registry is the Phase-3 artifact of the v1 → v2 migration
> (owner directive, chat 2026-09-14; track context:
> `migration_foundation_iter131.md`).
> **Status:** seeded iter 131 (Phase 1). Extended every migration iteration;
> never rewritten. v1 is **immutable migration source** until the switch.
> Notation: `OLD LOCATION → NEW LOCATION` with a status and, for visual
> material, a semantic disposition.

---

## 1. Status vocabulary

Migration statuses (block/section level):

| Status | Meaning |
|---|---|
| `MOVED` | relocated verbatim to a new v2 location |
| `MERGED` | combined with another unit into one canonical unit |
| `CONDENSED` | shortened without semantic loss |
| `COLLAPSED` | multiple parallel presentations collapsed into one canonical form |
| `REPLACED_BY_CANONICAL` | replaced by a link/summary pointing at the canonical owner |
| `REFERENCE_ONLY` | kept only as a navigational/lookup entry |
| `REMOVED_WITH_REASON` | deleted; reason recorded |
| `UNKNOWN` | disposition not yet determined — never delete while UNKNOWN |

Visual-material semantic dispositions (embedded text inside visual elements):

| Disposition | Meaning |
|---|---|
| `TEXTUAL_CANONICAL` | meaning must live in canonical text; visual shows/links it |
| `VISUAL_CANONICAL` | knowledge lives once, in the visual; text does not restate it |
| `SHARED_REFERENCE` | value shared by text and visual from one declared source |
| `REFERENCE_ONLY` | visual label/navigation, no independent payload |
| `REMOVED_WITH_REASON` | renderer leakage / redundant presentation, safe to drop |
| `UNKNOWN` | not yet classified |

Rule (owner directive): repetition is not automatically duplication — classify
each occurrence as duplicate / context / operational reminder / example /
exception / evidence / presentation artifact / independent meaning **before**
assigning a disposition. Uncertain cases stay `UNKNOWN`, never deleted.

## 2. V1 layer model → v2 target model

| V1 layer (status quo) | Sync today | V2 target (PROPOSED) |
|---|---|---|
| L1 canon MD | source of truth | stays single source of truth for prose rules |
| L2 master HTML (incl. 18 embeds) | sync-audited (prose) | production; embeds reference canonical values instead of re-encoding them |
| L3 root fallbacks | build-generated | unchanged (DEC-04) |
| L4 `visual-system/elements/` prototypes | **none, drifted** | **DECIDED (DEC-19, iter 138):** frozen design artifacts (archive = git history + recorded reasons); master embed (L2) = canonical visual markup; E01/E08/E10/E15 copies → `REMOVED_WITH_REASON` iter 138; remaining families ride the freeze at their slice time |
| L5 `component-extracts/` | **none, stale** | **DECIDED (DEC-19, iter 138):** superseded by the master embed (L2); E01/E08/E10/E15 extract copies → `REMOVED_WITH_REASON` iter 138 |
| L6 `data/*.json` | version field only | **derived** from the canonical source wherever it carries knowledge (glossary: **DECIDED DEC-17** — canonical record → generated `glossary.json`; enneagram: **executed iter 136** — §5.4 → generated `enneagram.json`; remaining clusters per disposition) |
| L7 widget-embedded constants | manual (DEC-09) | keep only with declared canon provenance in header |
| L8 shell runtime | tests | unchanged |
| L9–L11 research / registries / bibles | manual | unchanged (registries updated by the same iterations that change facts) |

## 3. Registry A — visual-system layer dispositions (18 elements)

Columns: `P/I` = prototype/embed text strings identical (of embed total);
`E∖C` = embed strings not found in the part canon (semantic payload without
textual canonical home); drift = known prototype↔embed divergence
(foundation §4.3). All dispositions PROPOSED (iter 131) — statuses stay
`UNKNOWN` until the v2 build slice that touches the element executes.

| El | Master home | P/I | E∖C | Drift | Embedded payload (disposition PROPOSED) |
|----|-------------|-----|-----|-------|------------------------------------------|
| E01 | `part_01.html` p1_card_overview | 38/44 | 27 | russification lag | block roles + derived budget ranges: budget numbers → `TEXTUAL_CANONICAL` (§7A.12 owns values); anchors-placement rule prose → `TEXTUAL_CANONICAL` (extend §1.4 rule text); labels → `REFERENCE_ONLY`. **Executed iter 135 (mig-4, slice §5.3):** budget values verified == §7A.12 at every layer — the §4.4 «SP ~100–200 wrong-side copy» claim found absent (registry corrected); values parity-locked by `scripts/audit_token_budget_parity.py`; canon `[VS: E01]` marker added (TB-3); Lorebook row = declared estimate; prototype/extract copies → `REMOVED_WITH_REASON` executed iter 138 (DEC-19) |
| E02 | `part_07a.html` p7a_assembly_pipeline | 29/30 | 19 | none detected | assembly step names → `SHARED_REFERENCE` (canonical pipeline = §7A.13) |
| E03 | `part_02.html` p2_anchor_examples | 21/22 | 19 | none detected | T→A→P example rows → `VISUAL_CANONICAL` (demonstration; examples stay visual) |
| E04 | `part_02.html` p2_embodiment | 15/19 | 10 | minor | State→Body→Sensor→Speech stages → `SHARED_REFERENCE` (§2.4 owns) |
| E05 | `part_04.html` p4_spine_overview | 16/28 | 16 | russification lag | SPINE element names/glosses → `SHARED_REFERENCE` (§4.1 owns; «WANT сходится к NEED…» causal caption → `TEXTUAL_CANONICAL`, unique rule statement) |
| E06 | `part_04.html` p4_ghost_layers | 12/13 | 10 | russification lag | G1/G2/G3 layer labels + example quotes → `SHARED_REFERENCE` (§4.11 owns); layer quotes («Отец ушёл, когда мне было 5») → `VISUAL_CANONICAL` example |
| E07 | `part_03.html` p3_influence_hierarchy | 33/33 | 20 | none detected | compressed ~75–85% scale → `SHARED_REFERENCE` (§3.2 owns exact table); «Пользователи часто предполагают…» prose + «Хранилище vs Влияние» distinction → `TEXTUAL_CANONICAL` candidate (unique explanation, needs §3.2 home decision). **Recommendation iter 141:** V-a SHARED_REFERENCE + V-b TEXTUAL_CANONICAL (unique prose + 2 widget quantitative claims → §3.2) — package [`voice_cluster_iter141.md`](./voice_cluster_iter141.md) §4. **DECIDED (DEC-21, owner chat 2026-09-15 «продолжай работу по плану!») and EXECUTED iter 142 (voice-cluster build slice, map §5.6):** values SHARED_REFERENCE + inset prose TEXTUAL_CANONICAL — canonicalized in §3.2 («Хранилище ≠ Влияние» block); full `[VS: E07]` marker; row-label set locked (row 1 «Недавний чат», embed keeps «SP»); parity-locked by `scripts/audit_voice_parity.py`; prototype/extract copies → `REMOVED_WITH_REASON` executed iter 142 (DEC-19) |
| E08 | `part_07a.html` p7a_core_directives | 17/17 | 7 | none detected | 7 directive titles+one-liners → `SHARED_REFERENCE` (§7A.2 owns); visual = canonical presentation of the list (ed-2 mechanism, DEC-08). **Executed iter 134 (mig-2):** titles/numbering/#6–#7 model-gating parity-locked by `scripts/audit_core_directives_parity.py`; node-7 title aligned to the canonical h4 («Фильтр предгенерации»); prototype/extract copies → `REMOVED_WITH_REASON` executed iter 138 (DEC-19) |
| E09 | `part_05.html` p5_ocean_basics | 17/17 | 9 | hex literals (KI#41/42 class) | pentagon axis labels → `REFERENCE_ONLY`; extreme-zone labels → `SHARED_REFERENCE` (§5.1 owns) |
| E10 | `part_05.html` p5_enneagram_basics | 13/17 | 12 | **value drift** (proto stale, §4.3) | type mini-cards (fear/desire/LIE) → `SHARED_REFERENCE` (canonical = §5.4 table; data layer `enneagram.json` must derive from it); hexad graph → `VISUAL_CANONICAL`. **Executed iter 136 (mig-5, slice §5.4):** mini-card values = §5.4 via the generated data layer (`scripts/generate_enneagram.mjs` → `data/enneagram.json`, LIE folded to one internal copy) — parity-locked by `scripts/audit_enneagram_parity.py`; canon `[VS: E10]` marker declares ownership; static defaults aligned to §5.4; prototype/extract copies → `REMOVED_WITH_REASON` executed iter 138 (DEC-19) |
| E11 | `part_06.html` p6_cot_tiers | 35/37 | 24 | none detected | tier definitions + model applicability (12B+/32B+/API) + template snippets → `SHARED_REFERENCE` (§6.3–§6.5 own); «Tier 0 работает для всех…» explanatory lines → `TEXTUAL_CANONICAL` candidates |
| E12 | `part_08.html` p8_antipatterns_overview | 59/61 | 38 | none detected | AP names/symptoms → `SHARED_REFERENCE` (Part 8 owns); per-AP fix imperatives with numbers («Держите RepPen 1.0–1.05…») → `TEXTUAL_CANONICAL` (numeric recommendation must have one canonical home — currently sides with §7A.7 against §7A.6, KI#72 family). **DECIDED (DEC-22, owner chat 2026-09-15) and EXECUTED iter 145 (sampling-cluster build slice, map §5.7):** AP-5 fix card re-framed to the model-qualified defer («в диапазоне своей модели — §7A.6; никогда > 1.10») — numeric recommendations now defer to §7A.6 via §8.6; `[VS: E12]` marker declares the numeric-fix defer; parity-locked by `scripts/audit_sampling_parity.py`; prototype/extract copies → `REMOVED_WITH_REASON` executed iter 145 (DEC-19) |
| E13 | `part_09.html` p9_decision_tree | 40/40 | 37 | none detected | **unique diagnostic tree** (3 symptoms, checks, AP/E mappings absent from §9.5/§9.6) → `TEXTUAL_CANONICAL` decision required: canonicalize mappings in §9.6 (visual demonstrates) or declare `VISUAL_CANONICAL` (tree owns Debug knowledge); §6.2. **Recommendation iter 137:** `TEXTUAL_CANONICAL` → §9.6 (`owner_gates_iter137.md` §3.2). **DECIDED (DEC-20, iter 138) and EXECUTED iter 139 (mig-3):** `TEXTUAL_CANONICAL` — mappings canonicalized in §9.6 (sub-table + full `[VS: E13]` marker), embed re-pointed as the visual presentation / decision aid, values parity-locked by `scripts/audit_diagnostics_parity.py` (map §5.5 DT-1..DT-8) |
| E14 | `part_09.html` p9_quality_scale | 17/18 | 9 | none detected | quality grade names → `SHARED_REFERENCE` (§9.1 owns) |
| E15 | `part_10.html` p10_annotated_blueprint | 42/45 | 42 | none detected | per-block budget ranges (min–max, derived totals) → `TEXTUAL_CANONICAL` derivation note needed (§7A.12 owns raw values; E15 shows totals — derivation rule must be stated once); block roles → `SHARED_REFERENCE` (§1.2). **Executed iter 135 (mig-4, slice §5.3):** min–max values verified == canonical; Examples total now carries the derivation note «(итог: 40–80 на пример × 2–5 примеров — §7A.12)»; canon `[VS: E15]` marker added with the derivation rule (TB-4/TB-5); parity-locked; prototype/extract copies → `REMOVED_WITH_REASON` executed iter 138 (DEC-19) |
| E16 | `part_07a.html` p7a_authors_note | 31/31 | 20 | none detected | AN template A/B labels → `SHARED_REFERENCE` (§7A.5 owns) |
| E17 | `part_07a.html` p7a_sampling_params | 43/44 | 13 | none detected | 3-tier param table → `SHARED_REFERENCE` — **blocked on KI#72 value decision** (embed carries both sides labeled «базовая»/«чеклист»); annotations («Только Examples» etc.) → `REFERENCE_ONLY`. **DECIDED (DEC-22, owner chat 2026-09-15 «я согласен с рекомендациями, сделай как лучше и качественнее») and EXECUTED iter 145 (sampling-cluster build slice, map §5.7):** values SHARED_REFERENCE — 32B+ column re-pointed to the canonical «32B+/API» values (Temperature **0.7–1.0**, RepPen **1.05–1.10**), dual-side display + orphan asterisk removed; 12B–32B middle tier = **declared omission**; parity-locked by `scripts/audit_sampling_parity.py`; prototype/extract copies → `REMOVED_WITH_REASON` executed iter 145 (DEC-19) |
| E18 | `part_07b.html` p7b_greeting | 16/16 | 5 | none detected | greeting algorithm steps → `SHARED_REFERENCE` (§7B.2 owns) |
| hero | — (unintegrated) | n/a | n/a | never integrated | **EXECUTED iter 140 (§6.4 disposal, DEC-19):** `REMOVED_WITH_REASON` — `visual-system/hero/` deleted (never integrated: no hero section in the shell, INTEGRATION-MAP row unexecuted; Three.js via `cdn.jsdelivr.net` importmap = the external-CDN dependency class iter-113 removed; archive = git history); KI#81 dead `.vs-hero-placeholder` CSS (5 selectors, zero consumers) removed from `src/shell/styles.css` + root fallback regenerated; zero occurrences verified across `src/`/`parts/`/`assets/`/`widgets/` |

## 4. Registry B — concept clusters → canonical ownership (v2 dispositions PROPOSED)

| Cluster | Canonical owner (v1→v2) | Competing copies found (v1) | Proposed v2 disposition |
|---|---|---|---|
| CORE DIRECTIVES (7) | §7A.2 (prose + template) | E08 embed (titles+one-liners) · prototype E08 · extract E08 · fallback copy · glossary (canon app. + glossary.json) · Part 10 shorthand (sanctioned DEC-08) | E08 = the one visual presentation (`SHARED_REFERENCE`); Part 10/assembly keep `{{CORE_DIRECTIVES — …}}` shorthand; glossary entry = 1-sentence + link; **prototype/extract copies → `REMOVED_WITH_REASON` (stale derived copies) once visual-markup ownership decided (§6.1)** — second bounded area (ed-2 evidence reused). **EXECUTED iter 134 (mig-2, slice §5.2 D-1…D-8):** §7A.13 full copy → DEC-08 shorthand (canon + master mirror); E08 parity-locked; §7A.1/Part 10 verified shorthand ×4; prototype/extract copies → `REMOVED_WITH_REASON` executed iter 138 (DEC-19) |
| Sampling values (KI#72 family) | **owner decision** (§7A.6 recommended by matrix) | §7A.7 checklist · E17 (both sides) · E12 AP-5 fix («1.0–1.05») · ~~`glossary.json` RepPen entry («1.00–1.10» — 5th location, found iter 132)~~ **eliminated iter 133: the generated registry defers values to §7A.6** | one canonical table; §7A.7/E17/E12 → `REPLACED_BY_CANONICAL` (defer/reference); **blocked on value decision**. **DECIDED (DEC-22, owner chat 2026-09-15 «я согласен с рекомендациями, сделай как лучше и качественнее») and EXECUTED iter 145 (map §5.7 SP-1..SP-12):** §7A.6 = the single value owner (S-a); §7A.7 param rows → defer (S-b); E17 → SHARED_REFERENCE re-point (S-c); E12/§9.x hints → model-qualified defers (S-d); Appendix B percentages = first OBSERVATION application (DEC-20); parity gate `scripts/audit_sampling_parity.py`; **KI#72 CLOSED** — semantic extraction COMPLETE (7/7) |
| Glossary | **v2 canonical term registry** (DEC-17: merged-with-review, 45 entries; canonical term record = source) | canon appendix 25 terms · `glossary.json` 55 terms (21 overlap, divergent definitions, version 9.2.0, dead `core_rules`) · generated no-JS `glossary.html` · never-loaded master appendix (KI#70) · runtime panel | **DECIDED (DEC-17):** single canonical term registry — per-term evidence §5.1 (25 canon entries MERGED + 20 machine-layer terms MOVED/promoted, 35 JSON terms folded in); chain = canonical term record → generated `glossary.json` → runtime panel / no-JS page; glossary stays the Reference-layer v2 representation of the registry; dead `core_rules` → `REMOVED_WITH_REASON`; KI#70 v1 wire/drop stays deferred (superseded by the v2 Reference-mode design) — **executed iter 133 (mig-1): registry + generator + generated machine layer + parity audit, all PASS** |
| Diagnostics (symptom→fix) | §9.5 + §9.6 (prose tables) | E13 unique tree (3 symptoms, mappings not in canon) | E13 mappings → owner decision: canonicalize into §9.6 (`TEXTUAL_CANONICAL`) or declare tree `VISUAL_CANONICAL`; §9.3/§9.11 stay checklists — third bounded area (Debug mode). **DECIDED (DEC-20, iter 138):** `TEXTUAL_CANONICAL` — mappings → §9.6, E13 = visual presentation. **EXECUTED iter 139 (mig-3, slice §5.5 DT-1..DT-8):** §9.6 = the canonical home (E13 mapping sub-table + `[VS: E13]` marker), E13 re-pointed (parity audit), §9.2↔§9.6 Debug chain wired, §9.3/§9.11 verified checklists |
| Token budget | §7A.12 (tables + rules) | E01 (~100–200 SP — wrong-side copy) · E15 (min–max + derived totals) | E01/E15 → `SHARED_REFERENCE` with derivation note («totals = per-example × count»); E01 SP range corrected to canonical 50–200 in the v2 slice. **EXECUTED iter 135 (mig-4, slice §5.3 TB-1…TB-8):** E01 values verified canonical at every layer (the wrong-side-copy claim corrected — not found in the repo); E15 derivation note added (master + canon marker); `[VS: E01/E15]` canon markers added; glossary already deferred (iter 133); no value decision needed |
| Enneagram data | §5.4 table | `enneagram.json` (LIE duplicated ×2) · E10 embed mini-cards · stale prototype E10 | JSON becomes derived from §5.4 (single internal copy of each value); prototype copy → `REMOVED_WITH_REASON` (stale, «Я фундаментально ущербен» 3-way drift). **EXECUTED iter 136 (mig-5, slice §5.4):** chain implemented §5.4 → `scripts/generate_enneagram.mjs` (owns the machine-layer supplement) → generated `data/enneagram.json` (v2.1.0) → widgets (builder + synthesis re-pointed to `types[].lie_template`; vs-e10 unchanged); E10 mini-cards SHARED_REFERENCE; prototype/extract copy → `REMOVED_WITH_REASON` executed iter 138 (DEC-19) |
| Voice influence % | §3.2 table | E07 compressed scale + unique prose · `persona-voice-hierarchy.js` constants (sanctioned DEC-09) | E07 scale → `SHARED_REFERENCE`; E07 unique prose → `TEXTUAL_CANONICAL` candidate (§3.2 home decision); widget constants keep DEC-09 provenance header. **iter 141:** evidence/recommendation package prepared ([`voice_cluster_iter141.md`](./voice_cluster_iter141.md)) — value parity verified green at every layer (widget 6/6 rows == canon; no KI#72-style contradiction); sub-calls surfaced: widget-notes split (V-c), AN-12B framing (V-d, the only value-adjacent question), row-label set (V-e). **DECIDED (DEC-21, owner chat 2026-09-15 «продолжай работу по плану!») and EXECUTED iter 142 (voice-cluster build slice, §5.6):** V-a/V-b/V-c/V-e as recommended; V-d = Option A (table wins — AN 12B stays ~2%, «не влияет» statements re-framed to «пренебрежимо мало (~2%)», no numeric change); §3.2 = canonical owner of table + prose block; widget DEC-09 header declares note deference; parity gate `scripts/audit_voice_parity.py`; KI#82 CLOSED |

## 5. Registry C — block-level rows (mechanism)

The block-level semantic audit of the prose layer is **owned by
`editorial_matrix.md`** (99 IDs / 500 rows at the iter-126 audit — **504 current**: +4 post-audit row additions (iter
139 p9_decision_tree::05, iter 142 p3_influence_hierarchy::09, iter 147 p1_core_rules::07 — each
disclosed at its slice — + the iter-159 appendix_model_table::03 НАБЛЮДЕНИЕ row); repeat registry
R01–R29 — full coverage, iter 126; 12 of 20 candidates executed iters 125–130). This registry
does **not duplicate** those rows (one fact — one owner, DEC-10). Mechanism:
when a v2 build slice touches a Part, its affected matrix rows are copied here
with `OLD LOCATION → NEW LOCATION` + status; the matrix row gets a back-pointer
`→ migration_map_v2 C-<n>`. First slice seeded iter 132 (glossary, §5.1);
subsequent Parts seed at their own build-slice time.

### 5.1 Glossary slice (seeded iter 132; **executed iter 133 — mig-1 build slice**)

Scope: the glossary cluster — first bounded area, decisions **DEC-17**.
Canon-side blocks = matrix rows `appendix_glossary::01–::26` (matrix §14);
machine-layer terms = `data/glossary.json` `canonical_terms` (55). The v1
term-set partition (re-derived by script iter 132, matches foundation §5.3):
**25 canon / 55 JSON / 21 overlap / 4 canon-only / 34 JSON-only**. Statuses
and head-forms below were seeded **PROPOSED** (per-term evidence, DEC-17a:
canonicality is decided per term; JSON-only terms do not become canonical
merely by existing in the machine layer) — **RATIFIED by the owner (chat
2026-09-14, DEC-18)**: 35 MERGED / 20 MOVED / 45 unified entries confirmed,
6 ⚑ head-forms resolved as identifier heads. **Executed iter 133**:
registry = `docs/canon/glossary_registry.md` (45 entries) · generator =
`scripts/generate_glossary.mjs` (first stage of `pnpm run build`) · machine
layer = generated `data/glossary.json` (version 9.2.6; no `core_rules`, no
`unified_definition`) · parity audit = `scripts/audit_glossary_parity.py`
(PASS: 81 provenance refs, dispositions vs map, anchors, ⚑ verbatim,
english-rule check, JSON↔registry equality).

Head-form policy (DEC-16 applied to the registry, owner directive iter 132):
Russian head where a natural direct translation exists (`Ложь (LIE)`,
`Бюджет токенов (Token Budget)`); English survives only as technical
identifiers (XML/API/parameter names, SP-element names, protocol names,
framework acronyms); ⚑ = identifier-vs-prose boundary case — **resolved at
ratification (DEC-18): all 6 kept as English identifier heads with adjacent
Russian gloss** (System Prompt / SP, Author's Note, Description, Examples,
Format Lock, Tone Frame); the owner's control check (no ⚑ term violating
"English only as technical identifier" in the v2 prose) is enforced by the
parity audit's english-rule check. The 18 vague glossary refs (matrix R18 —
repaired in canon iter 127) are re-derived in the registry from each entry's
canonical home.

**5.1a Canon appendix blocks → registry entries (26 matrix rows)**

| C# | Matrix row | OLD (v1 canon) | NEW (v2 entry, head — ratified DEC-18) | Status | Basis / fold-ins |
|---|---|---|---|---|---|
| C-1 | `appendix_glossary::01` | L19 intro (entry pattern) | registry pattern declaration | MOVED | entry pattern relocates with the registry (DEC-17c) |
| C-2 | `::02` | L21–25 «A — Anti-godmoding» | «Анти-годмодинг (Anti-godmoding)» | MERGED | +T-03 (aliases; disambiguation vs «Годмодинг» T-55); R07 2-line form kept; ref → §7A.1 |
| C-3 | `::03` | L27–31 «B — Behavioral Anchor» | «Поведенческий якорь (Behavioral Anchor)» | MERGED | +T-05; **matrix verdict COMPRESS (R01)**: placement ПРАВИЛО folds to 1 sentence + ref §1.4; ref → §2.1 |
| C-4 | `::04` | L33–37 «C — CoT» | «CoT (цепочка рассуждений)» | MERGED | +T-09; R29-aligned Tier framing; ref → §6.2 |
| C-5 | `::05` | L39–51 «C — CORE DIRECTIVES» | «Основные директивы (CORE DIRECTIVES)» | MERGED | +T-08 + the 7 per-directive entries fold into the 7-name index (T-07/11/14/23/35/41/43); **matrix verdict COMPRESS (R02)**: definition + 7-name index + fixed ref §7A.2; R13 SP-language rule folds; ref → §7A.2 |
| C-6 | `::06` | L53–57 «E — Embodiment Protocol» | «Протокол телесности (Embodiment Protocol)» | MERGED | +T-12 (protocol-vs-directive distinction kept); ref → §2.4 |
| C-7 | `::07` | L59–63 «E — Enneagram» | «Эннеаграмма (Enneagram)» | MERGED | +T-13; ref → §5.4 |
| C-8 | `::08` | L65–69 «F — FLAW» | «Дефект (FLAW)» | MERGED | +T-16; R24 reference-side; ref → §4.4 |
| C-9 | `::09` | L71–75 «G — GHOST» | «Призрак (GHOST)» | MERGED | +T-18; ref → §4.2 |
| C-10 | `::10` | L77–81 «G — GHOST Layers» | «Слои призрака (GHOST Layers)» | MERGED | +T-19 — **canon definition wins** (JSON carries stale pre-canon layer framing: «поверхностный/промежуточный/глубинный» vs canonical G1/G2/G3); ref → §4.11 |
| C-11 | `::11` | L83–87 «G — Greeting Message» | «Приветственное сообщение (Greeting Message)» | MERGED | +T-20; ref → §7B.2 |
| C-12 | `::12` | L89–93 «I — Identity Block» | «Блок идентичности (Identity Block)» | MERGED | +T-21 — canon definition wins (JSON overcarries: «внешность, предысторию, тип личности» vs canonical «имя, роль, ключевые черты» + ~10 токенов); ref → §7A.1 |
| C-13 | `::13` | L95–99 «L — LIE» | «Ложь (LIE)» | MERGED | +T-24; owner's explicit example (lie → ложь — translated immediately, EN form not kept as head); ref → §4.3 |
| C-14 | `::14` | L101–105 «L — Lorebook» | «База знаний (Lorebook)» | MERGED | +T-25 +T-26 (entry fields Key/Content/Position/Depth/Probability/Cooldown = §7B.3 canonical); ref → §7B.3 |
| C-15 | `::15` | L107–111 «M — MBTI» | «MBTI (типология Майерс-Бриггс)» | MERGED | +T-27; R26 reference-role statement; ref → appendix_mbti |
| C-16 | `::16` | L113–117 «N — NEED» | «Потребность (NEED)» | MERGED | +T-29; ref → §4.5 |
| C-17 | `::17` | L119–123 «O — OCEAN» | «OCEAN (Большая пятёрка)» | MERGED | +T-31; R25 golden-rule clause; ref → §5.1 |
| C-18 | `::18` | L125–129 «S — SPINE» | «SPINE (позвоночник)» | MERGED | +T-44; R21 implicit-GHOST/LIE clause; ref → §4.1 |
| C-19 | `::19` | L131–135 «S — System Prompt / SP» | «System Prompt / SP (системный промпт)» ⚑ | MERGED | +T-46; container-vs-content distinction kept; head-form = identifier boundary case (guide prose uses «System Prompt» as the container name throughout); ref → §7A.1 |
| C-20 | `::20` | L137–141 «T — T→A→P» | «T→A→P (Триггер → Действие → Цена)» | MERGED | +T-02 Action + T-37 Price + T-49 Trigger fold in as components; ref → §2.1 |
| C-21 | `::21` | L143–147 «T — Token Budget» | «Бюджет токенов (Token Budget)» | MERGED | +T-47; R11 card-total framing («4K ~430–580») aligns to §7A.12 per-block at merge; ref → §7A.12 |
| C-22 | `::22` | L149–153 «V — Voice» | «Голос (Voice)» | MERGED | +T-50; R03/R06 reference clauses; ref → §3.1 |
| C-23 | `::23` | L155–159 «V — Voice Bleed (cross-character)» | «Переплетение голосов (Voice Bleed, между персонажами)» | MERGED | +T-51 (JSON single «Voice Bleed» = cross-character sense); ref → §3.8 |
| C-24 | `::24` | L161–165 «V — Voice Bleed (degradation)» | «Утечка голоса (Voice Bleed, деградация)» | MERGED | +T-28 Narrator Bleed (narrator-side leak); ref → §3.6 |
| C-25 | `::25` | L167–171 «V — Voice Isolation» | «Изоляция голоса (Voice Isolation)» | MERGED | +T-53; two-level rule; ref → §3.1 |
| C-26 | `::26` | L173–177 «W — WANT» | «Желание (WANT)» | MERGED | +T-54; ref → §4.6 |

**5.1b Machine-layer terms → per-term review (55 JSON terms, DEC-17a evidence)**

| T# | v1 term (JSON) | Status | Target | Basis |
|---|---|---|---|---|
| T-01 | 4K-Fallback | MOVED | new entry «4K-Fallback (протокол адаптации для 4K)» | canonical home §7A.11; protocol name (identifier-like head, EN kept) |
| T-02 | Action | MERGED | C-20 | T→A→P component («Действие»); §2.1 canonical |
| T-03 | Anti-godmoding | MERGED | C-2 | overlap term; R07 |
| T-04 | Author's Note | MOVED | new entry «Author's Note (AN)» ⚑ | §7A.5; SP-element name = identifier boundary case |
| T-05 | Behavioral Anchor | MERGED | C-3 | overlap term |
| T-06 | Character Card | MOVED | new entry «Карточка персонажа (Character Card)» | §1.2 |
| T-07 | Consequence Driven | MERGED | C-5 | directive #6 → 7-name index; definition stays §7A.2 |
| T-08 | CORE DIRECTIVES | MERGED | C-5 | overlap term; R02 |
| T-09 | CoT | MERGED | C-4 | overlap term |
| T-10 | Description | MOVED | new entry «Description (блок описания)» ⚑ | §1.2; card field name = identifier boundary case |
| T-11 | Embodiment First | MERGED | C-5 | directive #2 → index |
| T-12 | Embodiment Protocol | MERGED | C-6 | overlap term |
| T-13 | Enneagram | MERGED | C-7 | overlap term |
| T-14 | Environmental Reactivity | MERGED | C-5 | directive #4 → index (v1 anchor `p2_anchor_rules` is a wrong-home artifact; registry re-derives refs) |
| T-15 | Examples | MOVED | new entry «Examples (примеры диалогов)» ⚑ | §3.2 + §1.2; card field name = identifier boundary case |
| T-16 | FLAW | MERGED | C-8 | overlap term |
| T-17 | Format Lock | MOVED | new entry «Format Lock (фиксация формата)» ⚑ | §7A.4; SP-element name |
| T-18 | GHOST | MERGED | C-9 | overlap term |
| T-19 | GHOST Layers | MERGED | C-10 | overlap term; canon definition wins (JSON stale) |
| T-20 | Greeting Message | MERGED | C-11 | overlap term |
| T-21 | Identity Block | MERGED | C-12 | overlap term; canon definition wins |
| T-22 | Immersion Boundary | MOVED | new entry «Иммерсионная граница (Immersion Boundary)» | §7A.8 advanced OOC variant (canon L370 heads Russian first) |
| T-23 | Influence Boundary | MERGED | C-5 | directive #5 → index |
| T-24 | LIE | MERGED | C-13 | overlap term |
| T-25 | Lorebook | MERGED | C-14 | overlap term |
| T-26 | Lorebook Entry | MERGED | C-14 | entry fields = §7B.3 canonical |
| T-27 | MBTI | MERGED | C-15 | overlap term |
| T-28 | Narrator Bleed | MERGED | C-24 | narrator-side leak = degradation sense; §3.6 |
| T-29 | NEED | MERGED | C-16 | overlap term |
| T-30 | Nested Anchors | MOVED | new entry «Вложенные якоря (Nested Anchors)» | §8 AP-15 |
| T-31 | OCEAN | MERGED | C-17 | overlap term |
| T-32 | One Change Rule | MOVED | new entry «Правило одного изменения» | §9.2 |
| T-33 | OOC | MOVED | new entry «OOC (вне образа)» | §7A.8 OOC Protection + §9 |
| T-34 | Persona Synthesis | MOVED | new entry «Синтез личности (Persona Synthesis)» | §5.7 |
| T-35 | Pre-Generation Filter | MERGED | C-5 | directive #7 → index; JSON numbers (~40–60% / ~85–95%) stay §7A.2-side (OBSERVATION-strength; rule-strength convention §6.5 pending) |
| T-36 | Presence Penalty | MOVED | new entry «Presence Penalty (PP)» | §7A.6; PP = 0 stable (AP-7); API-parameter identifier head |
| T-37 | Price | MERGED | C-20 | T→A→P component («Цена»); §2.1 |
| T-38 | processus_analysium | MOVED | new entry «processus_analysium» | §6 Tier 3 XML tag = identifier (name stays verbatim) |
| T-39 | RepPen | MOVED | new entry «RepPen (Repetition Penalty)» | §7A.6; ⚠ JSON value «1.00–1.10» = 5th KI#72-family location (Registry B row 2) — registry entry defers values to the canonical table |
| T-40 | Sensory Anchors | MOVED | new entry «Сенсорные якоря (Sensory Anchors)» | §2 (p2_sensory_anchors) |
| T-41 | Show Never Tell | MERGED | C-5 | directive #1 → index |
| T-42 | SP (MBTI temperament) | MOVED | new entry «S·P (MBTI-темперамент)» | appendix_mbti S·P ≠ SP disambiguation (canonical per matrix `appendix_mbti::04`) |
| T-43 | Spatial & Anatomical Lock | MERGED | C-5 | directive #3 → index |
| T-44 | SPINE | MERGED | C-18 | overlap term |
| T-45 | Structured Inject | MOVED | new entry «Структурированная инъекция (Structured Inject)» | §7B.1 (iter-133 correction: seed said «§7B.6» — canon has no §7B.6; canonical home p7b_structured_inject) |
| T-46 | System Prompt | MERGED | C-19 | overlap term (single container term) |
| T-47 | Token Budget | MERGED | C-21 | overlap term |
| T-48 | Tone Frame | MOVED | new entry «Tone Frame (тональный фрейм)» ⚑ | §7A.3; SP-element name |
| T-49 | Trigger | MERGED | C-20 | T→A→P component («Триггер»); §2.1 |
| T-50 | Voice | MERGED | C-22 | overlap term |
| T-51 | Voice Bleed | MERGED | C-23 | JSON definition = cross-character sense |
| T-52 | Voice Contamination | MOVED | new entry «Заражение голоса (Voice Contamination)» | §3 RULE (canon L95 heads Russian first) |
| T-53 | Voice Isolation | MERGED | C-25 | overlap term |
| T-54 | WANT | MERGED | C-26 | overlap term |
| T-55 | годмодинг | MOVED | new entry «Годмодинг» | §8.7 AP-6; diagnostic term (the violation) — disambiguation vs C-2 (the directive) kept |

Accounting: 55 JSON terms = **35 MERGED** (21 overlap + 14 fold-ins: Action /
Price / Trigger → C-20; 7 CORE DIRECTIVE names → C-5 index; Lorebook Entry →
C-14; System Prompt → C-19; Voice Bleed → C-23; Narrator Bleed → C-24) +
**20 MOVED** (new entries, canonical homes verified iter 132). Canon side:
25 entries MERGED (21 overlap + 4 fold-in receivers: System Prompt / SP,
T→A→P, both Voice Bleed senses), intro MOVED. **Unified registry = 45
entries** (25 merged canon entries + 20 promoted). Dead layers: `core_rules`
(5 rows, pre-restructure `01_core_principles.html` targets, consumed by
nothing — verified iter 131) → `REMOVED_WITH_REASON` (generator does not emit
it); `version` field (9.2.0 stale) → generated from the guide version.

### 5.2 CORE DIRECTIVES slice (seeded + executed iter 134 — mig-2 build slice)

Scope: the CORE DIRECTIVES cluster — second bounded area. Mechanism pre-approved:
DEC-08 shorthand convention + matrix R02 verdict (ed-2 evidence; PLAN row mig-2,
MEDIUM gate — content semantics inherited). v1 presentation inventory
(foundation §5.1): ~6 parallel presentations, 3 outside the deployed page.
Canonical owner unchanged: §7A.2 (prose + `<CORE_DIRECTIVES>` template +
per-directive explanations). Affected matrix rows copied per the §5 mechanism
(back-pointers added in `editorial_matrix.md`); acceptance gate =
`scripts/audit_core_directives_parity.py` (MUST PASS).

| D# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| D-1 | `p7a_core_directives::05` | §7A.2 full 7-directive `<CORE_DIRECTIVES>` block | unchanged — THE canonical definition (prose + template + per-directive explanations) | UNCHANGED — canonical owner (disposition target for D-2/D-5) | one definition — one place (ed-2, DEC-08) |
| D-2 | `p7a_assembly_pipeline::05` | §7A.13 Шаг 3: byte-identical verbatim re-print (canon) + divergent link-form (master) | DEC-08 shorthand `{{CORE_DIRECTIVES — канонический шаблон → §7A.2}}` (canon + master mirror; «Результат Елены» block + ~70-токенов commentary kept) | REPLACED_BY_CANONICAL **— executed iter 134** | R02 DUPLICATE verdict; matrix CROSS-REFERENCE (primary ed-2 target) |
| D-3 | `p7a_system_prompt::08` | §7A.1 canonical SP template | unchanged — `{{CORE_DIRECTIVES 1-7 — полный текст → §7A.2}}` shorthand | REFERENCE_ONLY (verified iter 134) | DEC-08 sanctioned |
| D-4 | `p10_elena::04` (+ Walter / Омнис-Зета / Выщербленный cards) | Part 10 card SP blocks | unchanged — shorthand ×4 (canon + master) | REFERENCE_ONLY (verified iter 134) | DEC-08 sanctioned |
| D-5 | `appendix_glossary::05` | appendix «C — CORE DIRECTIVES» full annotated copy (canon + master; never runtime-loaded, KI#70) | superseded by registry entry C-5 (1-sentence + 7-name index + §7A.2 ref, executed iter 133); the frozen v1 file is disposed at the v2 switch | REPLACED_BY_CANONICAL (deferred to v2 switch) | R02 [B]; DEC-18 freeze |
| D-6 | E08 embed (`part_07a.html` p7a_core_directives) | 7 directive titles + one-liners (hub-spoke SVG) | the ONE visual presentation — `SHARED_REFERENCE`: §7A.2 owns; titles/numbering/#6–#7 model-gating parity-locked by `scripts/audit_core_directives_parity.py`; node-7 title aligned to canonical h4 | SHARED_REFERENCE **— executed iter 134 (audit-locked)** | Registry A E08; ed-2 |
| D-7 | prototype E08 + extract E08 (`visual-system/`) | stale derived copies (prototype = `var(--token)` markup; extract = same) | `REMOVED_WITH_REASON` (stale derived copies) | PROPOSED — **blocked on §6.1** (visual-markup ownership) | map §6.1 |
| D-8 | glossary entry | v1: canon appendix full annotated copy + 55-term JSON set | registry C-5 «Основные директивы (CORE DIRECTIVES)» = 1-sentence + 7-name index + §7A.2 ref (generated `glossary.json`) | MERGED **— executed iter 133 (C-5)** | R02; C-5 |

Accounting: 1 canonical owner unchanged (D-1) + 1 re-point executed (D-2) + 2
verified references (D-3/D-4) + 1 deferred-to-switch (D-5) + 1 visual
SHARED_REFERENCE audit-locked (D-6) + 1 blocked on §6.1 (D-7) + 1 already
executed via the glossary slice (D-8). Directive count (7) and numbering
(#6 Consequence Driven, #7 Pre-Generation Filter) unchanged — enforced by the
parity audit. Root fallbacks (`parts/part_07a.html`, `parts/glossary.html`,
`parts/appendix_glossary.html`) = build outputs, regenerated with the slice.
Non-guide reference layers (not presentations, no action): agent-doc condensed
references (`AGENT_NAVIGATION.md` §5, `docs/architecture.md` CORE DIRECTIVES
table), `data/character_schema.json` L319 directive-name schema description
(technical identifiers, no definitions) — REFERENCE_ONLY.

### 5.3 Token budget slice (seeded + executed iter 135 — mig-4 build slice)

Scope: the Token budget cluster — third bounded area (Registry B row 5;
foundation §5.5 evidence; PLAN row mig-4, LOW gate — values already canonical,
presentation fix, no semantic decision). Mechanism: mig-2 pattern (canonical
record → embed re-point/fix → parity audit). Canonical owner unchanged:
§7A.12 (per-block min/std/max table + personality sub-budgets + Script Tax
RULE + calculator). **Pre-edit verification finding (iter 135):** the
foundation §4.4 claim «E01 embed SP ~100–200 = wrong-side copy of 50/100/200»
does **not exist in the repository** — every E01/E15 layer (master embed,
prototype, extract, root fallback; verified at HEAD `886a2c24` and at the
iter-131 BASE `987e4f3`) already carries the canonical values; «100–200»
exists only as the E16/§7A.5 Author's Note length (canonical there). The
registry records the verified truth; the foundation doc stays the historical
iter-131 artifact. Affected matrix rows copied per the §5 mechanism;
acceptance gate = `scripts/audit_token_budget_parity.py` (MUST PASS).

| TB# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| TB-1 | `p7a_token_budget::03` (+ ::04/::05 RULEs, ::07 sub-budgets, ::10 calculator) | §7A.12 canonical budget table + rules + sub-budgets + calculator | unchanged — THE canonical owner (raw per-block values + example counts; calculator slider bounds = its own UI, canon-declared 400–800 result range) | UNCHANGED — canonical owner | Registry B row 5; verified iter 118 |
| TB-2 | E01 embed (`part_01.html`, between §1.1/§1.2) | token annotations мин/стд/макс + summary table: SP 50/100/200, Description 150/300/700, Greeting 40/60/100 (== canonical); Examples totals 80/180/400 + source column «Part 7A (40/60/80 per)» + «2–5 примеров, каждый ~40–80 токенов»; Anchors ~15–40; Lorebook «Est.» row | verified `SHARED_REFERENCE` — values parity-locked by `scripts/audit_token_budget_parity.py` (arithmetic: totals = per-example × count per level); foundation §4.4 wrong-side-copy claim corrected (see slice intro); Lorebook row = declared estimate, §7B-side canonicalization = future material | SHARED_REFERENCE **— executed iter 135 (verification; no value edit needed)** | Registry A E01; foundation §4.4 correction |
| TB-3 | `p1_structure_overview::04` | canon prose reference to E01 (L57) — no `[VS: E01]` marker | `[VS: E01]` marker added: budget values = §7A.12 (SHARED_REFERENCE); Examples totals derivation declared; Lorebook = declared estimate | ADDED **— executed iter 135** | PLAN mig-4 scope; `_README.md` §3.3 marker format |
| TB-4 | E15 embed (`part_10.html`, before §10.1) | structure annotations: SP ~50-200, Description ~150-700, Greeting ~40-100 (== canonical min–max); Examples ~80-400 (derived total, derivation NOT declared) | Examples annotation now carries the derivation note «(итог: 40–80 на пример × 2–5 примеров — §7A.12)»; min–max values parity-locked | SHARED_REFERENCE + derivation note **— executed iter 135** | Registry A E15; map row 5 disposition |
| TB-5 | `p10_elena::01` | no E15 marker in canon `part_10.md` (embed without canonical description) | `[VS: E15]` marker added before §10.1: min–max ranges shared with §7A.12; the derivation rule stated canonically («итог = бюджет на один пример × количество примеров») | ADDED **— executed iter 135** | PLAN mig-4 scope; TEXTUAL_CANONICAL derivation note |
| TB-6 | `appendix_glossary::21` | glossary C-21 «Бюджет токенов (Token Budget)» — values deferred to §7A.12 | unchanged — verified (registry + generated JSON) | MERGED **— executed iter 133 (C-21), verified iter 135** | C-21; T-47 |
| TB-7 | prototype E01/E15 + extracts (`visual-system/`) | stale derived copies (values == embed at HEAD; russification lag on E01) | `REMOVED_WITH_REASON` (stale derived copies) | PROPOSED — **blocked on §6.1** (visual-markup ownership) | map §6.1; E08/D-7 precedent |
| TB-8 | — (aggregate observation, non-slice) | budget-adjacent prose layers outside the slice: §7A.11 4K table («Полный» column + Итого 850–1450/~430–580) · §1.8 prebuild Q2 (≤200/≤400) · §7A.13 Шаг 6 (consistent ✓) · §9.11 «Description ≤ 800» · §8.2 AP-1 «> 800» · Part 10 card totals (~540…~2150+) · §7B.2 Greeting «50–100» vs §7A.12 Greeting row 40/60/100 (**R11-family instance found iter 135**) | out of mig-4 slice — R11/R27 framing family, owner-gated (ed-5 / KI#77-e); untouched by the slice | OBSERVED — deferred to owner gates | matrix R11 row; scope discipline |

Accounting: 1 canonical owner unchanged (TB-1) + 2 SHARED_REFERENCE
verifications/locks (TB-2 value-verified, TB-4 derivation-note edit) + 2 canon
markers added (TB-3/TB-5) + 1 already-executed glossary verified (TB-6) + 1
blocked on §6.1 (TB-7) + 1 aggregate observation (TB-8). Budget values (SP
50/100/200, Description 150/300/700, Examples 40/60/80 per, Greeting
40/60/100, Anchors 15/25/40 per) unchanged everywhere — enforced by the parity
audit. Root fallbacks (`parts/part_01.html` byte-identical — master part_01
untouched; `parts/part_10.html` regenerated with the derivation note).
Non-guide reference layers (not presentations, no action): agent-doc condensed
references — REFERENCE_ONLY.

### 5.4 Enneagram data slice (seeded + executed iter 136 — mig-5 build slice)

Scope: the Enneagram data cluster — fourth bounded area (Registry B row 6;
foundation §5.6 evidence; PLAN row mig-5, LOW-MEDIUM gate — derivation direction
pre-set by DEC-17/DEC-18 (map §2 L6); LIE fold mechanical). Mechanism: mig-1
generator pattern (canonical record → generator → generated JSON → widget
re-point → parity audit). Canonical owner unchanged: the §5.4 9-type table
(7 columns: Тип / Название / Альт-название / Ключевой страх / Ключевое желание /
Ложь (LIE) / Дефект из стресса). Design decision inside the slice (PLAN
sanctioned): no new canon-side registry file — §5.4 already IS the canonical
record; the machine-layer supplement (widget data §5.4 does not carry: SPINE
WANT/NEED/GHOST templates, stress/growth directions, wings, ocean_correlation,
ocean_defaults, flaw_anchors, mbti_suggestions) lives in the generator
(`scripts/generate_enneagram.mjs`), the single hand-edited source for every
non-canonical field. Acceptance gate = `scripts/audit_enneagram_parity.py`
(MUST PASS).

| EN# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| EN-1 | `p5_enneagram_basics::04` | §5.4 9-type table — canonical record; data layer copied its values with extended variants | unchanged — THE canonical owner + the generator's parse source (7 canonical fields per type; schema-version 2.1.0 emitted) | UNCHANGED — canonical owner + generator source | Registry B row 6; matrix verdict KEEP (fence #8 duplication now derived, not copied) |
| EN-2 | `p5_enneagram_basics::02` | `[VS: E10]` marker — replacement declaration only, no value ownership | marker declares SHARED_REFERENCE: mini-card values (страх/желание/LIE/дефект) = §5.4 table via the generated `data/enneagram.json`; hexad graph = visual canonical (direction data in the generated layer) | ADDED **— executed iter 136** | PLAN mig-5 scope; `_README.md` §3.3 marker format; E01/E15 marker precedent (TB-3/TB-5) |
| EN-3 | — (`data/enneagram.json`, machine layer) | hand-edited v1 file: canonical fields carried extended non-canonical variants («, дефектным», «Работоголизм, поверхностность…»); LIE duplicated ×2 (`lie_template` + `spine_templates.LIE`, divergent wording) | **generated** by `scripts/generate_enneagram.mjs` (wired into `pnpm run build` after the glossary stage): canonical fields = §5.4 verbatim; LIE folded to ONE internal copy (`types[].lie_template`); `spine_templates` = WANT/NEED/FLAW/GHOST (FLAW from the §5.4 cell — single parsed source emitted to both keys; NEED == `need_direction` — single supplement source); machine-layer supplement lives in the generator | GENERATED **— executed iter 136** | Registry B row 6 disposition; DEC-17 chain; E15 derived-value lock pattern |
| EN-4 | — (widget code) | `enneagram-builder.js` + `persona-synthesis.js` read the second LIE copy (`template.LIE`) | re-pointed to `types[].lie_template` (§5.4 canonical value); headers declare the v2.1.0 generated contract | RE_POINTed **— executed iter 136** | PLAN mig-5 "widget re-point"; LIE fold consequence |
| EN-5 | E10 embed (`part_05.html`, between §5.3/§5.4) | mini-card static defaults carried the pre-mig-5 extended JSON variants (type-4 wording) | static defaults = §5.4 type-4 canonical values; embed comment declares the §5.4 derivation (SHARED_REFERENCE); runtime fill (`vs-e10-enneagram.js`) reads the same generated layer | SHARED_REFERENCE **— executed iter 136** | Registry A E10 disposition; KI#76 fetch chain |
| EN-6 | — (`vs-e10-enneagram.js`) | consumes `data/enneagram.json` (name/core_fear/core_desire/lie_template/flaw_pattern) | unchanged — field shape preserved by the generated layer; parity audit locks the read-path | VERIFIED **— executed iter 136** | PLAN mig-5 "consumes the generated file unchanged" |
| EN-7 | prototype E10 + extract (`visual-system/`) | stale derived copies («Я фундаментально ущербен» 3-way drift, foundation §4.3) | `REMOVED_WITH_REASON` (stale derived copies) | PROPOSED — **blocked on §6.1** (visual-markup ownership) | map §6.1; E08/D-7 + TB-7 precedent |
| EN-8 | `p5_elena_profile::04` + aggregate observation | §5.2 Elena 6w5 directions (6→3 stress / 6→9 growth) — consistent with the JSON (noted iter 124, unchecked); machine fields `wings`/`wing_pairs`/`need_direction`/`stress_direction`/`growth_direction` carry no direct runtime reader (builder computes wings itself; directions drawn statically + builder constants) | directions consistency parity-locked (§5.2 ↔ generated type-6); unconsumed fields kept for data-shape compatibility (informational — no removal in slice scope) | OBSERVED — locked/deferred | scope discipline; widget constants = DEC-09-adjacent observation |

Accounting: 1 canonical owner unchanged + generator source (EN-1) + 1 marker
ownership declaration (EN-2) + 1 generated machine layer with the LIE fold (EN-3)
+ 2 widgets re-pointed (EN-4) + 1 embed SHARED_REFERENCE alignment (EN-5) + 1
verified consumer (EN-6) + 1 blocked prototype disposal (EN-7) + 1 aggregate
observation (EN-8). The v1 extended canonical-field variants are dropped from
the data layer as non-canonical drift (map Registry B row 6: "JSON becomes
derived from §5.4 — single internal copy of each value"); §5.4 canon + master
table untouched (canonical). Root fallback `parts/part_05.html` regenerated
(mini-card defaults). Non-guide reference layers: agent-doc condensed references
— REFERENCE_ONLY.

### 5.5 Diagnostics slice (seeded + executed iter 139 — mig-3 build slice)

Scope: the Diagnostics cluster — fifth bounded area (Registry B row 4; PLAN row
mig-3; gate **cleared by DEC-20**: `TEXTUAL_CANONICAL` → §9.6, E13 = visual
presentation / decision aid). Mechanism: mig-2 pattern (canonical record →
re-point → parity audit; no machine layer — no data file carries diagnostic
knowledge). Canonical owner: **§9.6** (existing 5-group tree table unchanged +
NEW E13 mapping sub-table — the canonical textual home of the E13 payload).
Editorial Policy 5-point check applied at edit time: capability (diagnostic
knowledge gains search/testing/authority in text), coverage (every E13 row —
symptom, check, both branches, diagnosis, AP/E refs — preserved in §9.6),
retrieval (Debug-mode lookup without the visual), context (§9.6 router/intro
extended, existing table untouched), dependency (E13 keeps its visual function;
L139 claim becomes true). Acceptance gate =
`scripts/audit_diagnostics_parity.py` (MUST PASS).

| DT# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| DT-1 | `p9_decision_tree::03` | §9.6 existing tree table (5 symptom groups) | unchanged — canonical branching form (§9.5 = flat lookup, different diagnostic mode) | UNCHANGED — canonical owner | matrix SPECIAL CASE verdict (§24) |
| DT-2 | `p9_decision_tree::05` (seeded iter 139) | E13 embed-only payload: 3 symptoms × (2 checks + 2 branches) × diagnosis + AP/E refs — not present in any canon text (foundation §4.4: competing diagnostic source) | §9.6 NEW sub-table «Три базовых симптома: полный маппинг» (6 rows, 9 diagnoses, 7 APs, 8 E-targets) — the canonical textual home; matrix row seeded | MOVED **— executed iter 139** | DEC-20; PLAN mig-3 |
| DT-3 | `p9_decision_tree::04` | canon L139 weak «Ссылка» («визуальная версия дерева… — [VS: E13]» — the claim was false: mapping ⊄ §9.6) | full `[VS: E13]` marker in the `_README.md` §3.3 format declaring TEXTUAL_CANONICAL (§9.6 canonical source; E13 = visual presentation / decision aid; parity audit named) — the claim is now true | REPLACED_BY_CANONICAL **— executed iter 139** | DEC-20; marker precedents E01/E10/E15 |
| DT-4 | — (master mirror) | master §9.6: no E13 mapping; intro missing the «Формат:» sentence (pre-existing drift); Walter P3-4c cross-ref | h4 sub-heading + intro (§9.2/§9.7 Debug-chain links) + mirrored 6-row table; «Формат:» sentence restored (drift closed); Walter cross-ref kept byte-identical (sync-audit P3-4c anchor) | MOVED **— executed iter 139** | PLAN mig-3 scope; sync-audit anchor |
| DT-5 | E13 embed (`part_09.html` preamble) | embed owns the only copy of the diagnostic mapping (visual-canonical de facto) | re-pointed: comment declares §9.6 canonical ownership (TEXTUAL_CANONICAL, DEC-20); values parity-locked by `audit_diagnostics_parity.py`; visual function kept (decision aid) | SHARED_REFERENCE **— executed iter 139 (audit-locked)** | Registry A E13; DEC-20 |
| DT-6 | `p9_one_change_rule::02` (+ master §9.2) | §9.2 Применение had no tree link; master §9.2 lacked the Применение paragraph entirely (pre-existing no-master-match drift) | canon Применение + master mirror carry the §9.6 tree back-link (IMP-48 pair §9.2↔§9.6) — the Debug reader path (symptom → cause → test → one-change → validation) is wired end-to-end | MOVED **— executed iter 139** | PLAN mig-3 (Debug reader-path audit); IMP-48 |
| DT-7 | `p9_basic_checklist` / `p9_pre_deploy` (§9.3/§9.11) | checklist / pre-deploy validation layers | unchanged — stay checklists (structural block scan / pre-deploy gate); asserted by the parity audit's no-competing-sources check (no E13 symptoms there) | REFERENCE_ONLY (verified iter 139) | Registry B row 4 disposition |
| DT-8 | prototype E13 (`visual-system/elements/E13-diagnostic-tree.html`) | design prototype, P/I 40/40 identical to the embed (owner_gates §3.2) | frozen design artifact (DEC-19: master embed = canonical visual markup; archive = git history) — no action in this slice | FROZEN (DEC-19) | map §2 L4/L5; §6.1 |

Accounting: 1 canonical owner unchanged (DT-1) + 1 MOVED canonical home created
(DT-2, matrix row seeded) + 1 marker upgrade (DT-3) + 1 master mirror (DT-4) +
1 embed re-point audit-locked (DT-5) + 1 Debug-chain wiring with the master
mirror restored (DT-6) + 2 verified dispositions (DT-7/DT-8). E13 payload
values (3 symptoms, 6 checks, 9 diagnoses, AP set, E-target set) unchanged
everywhere — enforced by the parity audit. Root fallback `parts/part_09.html`
regenerated with the slice. Non-guide reference layers (agent docs):
REFERENCE_ONLY. Deferred (informational): drift-tool [ref:]↔<a>
normalization asymmetry — new §9.6 paragraphs may appear as plain_text drift
entries (exit 0 by design); the §9.2 master mirror CLOSES a pre-existing
no-master-match entry.

### 5.6 Voice influence % slice (seeded + executed iter 142 — voice-cluster build slice)

Scope: the Voice influence % cluster — the LAST bounded area (Registry B row 7;
PLAN row voice-cluster; gate **cleared by DEC-21**: V-a `SHARED_REFERENCE` /
V-b `TEXTUAL_CANONICAL` → §3.2 / V-c widget-notes split / V-d **Option A** /
V-e row-label set; owner chat 2026-09-15 «продолжай работу по плану!» — the
go-ahead on the iter-141 package). Mechanism: mig-2/mig-3 pattern (canonical
record → re-point → parity audit; **no machine layer** — DEC-09 already covers
the widget side). Canonical owner: **§3.2** (6×3 table = the value owner, new
«Хранилище ≠ Влияние» prose block = the textual home of the E07 inset payload
+ the two widget quantitative claims). Editorial Policy 5-point check applied
at edit time: capability (the misconception correction + operational windows
gain a textual home — searchable, no-JS-visible, testable), coverage (every
inset sentence and both widget claims preserved in the block; the inset keeps
its visual function), retrieval (Learn-mode lookup without the visual),
context (the block interprets the table it follows), dependency (E07 keeps its
visual function; the `[VS: E07]` marker declares the relationship). Acceptance
gate = `scripts/audit_voice_parity.py` (MUST PASS).

| VC# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| VC-1 | `p3_influence_hierarchy::02` | weak `[VS: E07]` marker («См. маркер в preamble», no ownership declaration) | full `[VS: E07]` marker in the `_README.md` §3.3 format declaring both dispositions (values SHARED_REFERENCE · inset prose TEXTUAL_CANONICAL) + the audit name | REPLACED_BY_CANONICAL **— executed iter 142** | DEC-21 V-a/V-b; marker precedents E01/E10/E13/E15 |
| VC-2 | `p3_influence_hierarchy::09` (seeded iter 142) | E07 inset + widget JS: «Хранилище vs Влияние» distinction, SP-primacy misconception + drift implication, ~10–20 messages, ~5 replies — embed/JS-only (invisible to canon, no-JS readers, every audit) | §3.2 NEW prose block «Хранилище ≠ Влияние» — the canonical textual home; E07 inset = visual presentation; widget notes = DEC-09 restatements | MOVED **— executed iter 142** | DEC-21 V-b/V-c; DEC-20/E13 precedent |
| VC-3 | `p3_influence_hierarchy::04` | table row-1 label «Recent chat» (English; E07 already russified) | «Недавний чат» (canon + master + widget/export; DEC-16 ordinary concept; embed label unchanged); 18 values byte-unchanged | MOVED **— executed iter 142** | DEC-21 V-e; F4 divergence eliminated |
| VC-4 | `p3_influence_hierarchy::03` | `[INTERACTIVE WIDGET]` marker (no notes disposition) | extended: the 2 quantitative claims declared canonicalized in §3.2; the 4 rule-restatement notes stay widget-local (DEC-09); data/*.json extraction rejected (package §4.3) | MOVED **— executed iter 142** | DEC-21 V-c |
| VC-5 | `p3_influence_hierarchy::05` | RULE: 12B Description = 0% | unchanged — audit anchor (byte-identical canon↔master; «0% ЗАПРЕЩЕНО» keeps RULE semantics — the argument for V-d Option A) | UNCHANGED (verified iter 142) | DEC-21 V-d Option A |
| VC-6 | `p3_influence_hierarchy::01` + `::06` + `::08` | intro / EXAMPLE block / transition to §3.3 | unchanged — verified (no overlap with the new prose block; 5-point check passed at insertion) | UNCHANGED (verified iter 142) | Editorial Policy (DEC-15) |
| VC-7 | — (Part 7A; no matrix seeding — that Part's v2 slice is future, KI#72-dependent) | AN-12B framing tension: §3.2 ~2% vs «AN не влияет на голос» ×2 canon (§7A.5 L224, §7A.7 L348) + ×1 widget | re-framed per **V-d Option A**: «влияние AN на голос пренебрежимо мало (~2%)» (§7A.5 + §7A.7 canon; §7A.7 master mirror; widget note); E16 canon marker + master badge gain the derivation «диапазон = мин–макс строки AN — §3.2» (E15 pattern); zero numeric change | MOVED **— executed iter 142** | DEC-21 V-d; fence #11 (table = value owner) |
| VC-8 | — (master layer) | E07 embed = de-facto only copy of the inset prose; outer comment mislabeled «Voice Isolation»; E16 badge carried an underived «~2–5%» | E07 embed re-pointed (comment declares §3.2 ownership, DEC-21; outer comment label corrected → «Voice Influence Hierarchy»); E16 position-indicator value carries the derivation note | SHARED_REFERENCE **— executed iter 142 (audit-locked)** | Registry A E07/E16; DEC-19 |
| VC-9 | — (widget layer) | DEC-09 sanctioned constants; AN-12B note contradicted the table framing; row-1 label «Recent chat» | constants unchanged (18 values == §3.2, parity-locked); header gains the note-deference declaration; AN-12B note re-framed; label «Недавний чат»; root fallback regenerated | DEC-09 + **executed iter 142** | DEC-21 V-c/V-d/V-e |
| VC-10 | — (gate/registries/disposal) | no parity audit covered the cluster; KI#82 (content_map §3.2 stale Notes); E07 prototype + 3 extracts frozen | `scripts/audit_voice_parity.py` (9 check groups; MUST-PASS gate wired into AGENTS.md); map Registries A/B + §6 row 6 → DECIDED/EXECUTED; content_map Notes corrected (**KI#82 CLOSED**); E07 prototype + E07-script/styles/visual extracts → `REMOVED_WITH_REASON` (4 files, DEC-19 — archive = git history) | EXECUTED **— iter 142** | DEC-19; KI#81 disposal precedent |

Accounting: 1 marker upgrade (VC-1) + 1 canonical home created (VC-2, matrix
row seeded) + 1 one-word label edit (VC-3) + 1 widget-marker extension (VC-4) +
3 verified-unchanged rows (VC-5/VC-6) + 3 cross-layer executions (VC-7/VC-8/VC-9)
+ 1 gate/registry/disposal package (VC-10). The 18 table values and the E07
geometry are byte-unchanged everywhere — enforced by the parity audit. Root
fallbacks `parts/part_03.html` + `parts/part_07a.html` +
`widgets/persona-voice-hierarchy.js` regenerated with the slice. Deferred
(informational): visual-system/PLAN.md L605 table copy (frozen design doc,
DEC-19); E16 prototype/extract (frozen — E16 family slice pending; the
derivation note intentionally lives only in the embed); canon front-matter
`vs_embedded` staleness (repo-wide, rides the v2 canon format). Glossary entry
verified deferring (value restatement in the ratified Voice Isolation entry,
§3.1 ref — DEC-17/18 chain, no action per package F6).

### 5.7 Sampling values slice (seeded + executed iter 145 — sampling-cluster build slice)

Scope: the Sampling values cluster (KI#72 family) — the LAST bounded area
(Registry B row 2; PLAN row sampling-cluster; gate **cleared by DEC-22**:
S-a §7A.6 canonical / S-b §7A.7 param rows → defer / S-c E17 SHARED_REFERENCE
re-point / S-d hint re-frames; owner chat 2026-09-15 «я согласен с
рекомендациями, сделай как лучше и качественнее» — the go-ahead on the
iter-144 package §2, Option A + S-a…S-d; Options B/C rejected in the package).
Mechanism: mig-2/mig-3/voice pattern (canonical record → re-point → parity
audit; no machine layer — widgets/data/tests verified value-clean iter 144).
Canonical owner: **§7A.6** («Базовые параметры» 3-tier table + «Модель-
специфичные рекомендации» point recs + PP = 0.0 rules; AP-5 boundary ≤ 1.10
unchanged — Phase B verified). Editorial Policy 5-point check applied at edit
time: capability (one canonical value set, machine-checkable by the new
audit), coverage (§7A.7 param rows → defer line names every dropped parameter;
PP rule stays double-homed §7A.6 table + ПРАВИЛО callouts), retrieval (values
findable at §7A.6 / E17 / model-specific details; every hint now names its
model class or defers), context (§7A.7 table keeps the capability rows it
summarizes; E17 checklist untouched), dependency (§8.6/§9.3/§9.5 refs to §7A.6
stay valid; E17 embed ↔ canon marker declare each other). Acceptance gate =
`scripts/audit_sampling_parity.py` (MUST PASS). KI#72 CLOSED (reader-visible
contradiction open since iter 120 resolved). Semantic extraction is now
**100% COMPLETE** (all seven bounded areas executed).

| SP# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| SP-1 | `p7a_sampling_params::02` | weak `[VS: E17]` marker (no ownership declaration) | full `[VS: E17]` marker in the `_README.md` §3.3 format: values SHARED_REFERENCE (§7A.6 owns both tables), E17 = the one visual presentation, 12B–32B middle tier = declared omission, audit named | REPLACED_BY_CANONICAL **— executed iter 145** | DEC-22 S-c; marker precedents E01/E07/E10/E13/E15 |
| SP-2 | `p7a_sampling_params::03` | canonical «Базовые параметры» table (the KI#72 «Option A» side) | unchanged — THE canonical value owner (S-a); 6×3 values byte-identical; audit-locked | UNCHANGED (verified iter 145) | DEC-22 S-a; matrix R12 |
| SP-3 | `p7a_model_checklist::02` | summary table: 3 param rows (Temperature **0.85–1.1**, RepPen **1.0–1.05** — the contradicting side) + 5 capability rows | param rows dropped; header «Параметр» → «Возможность»; defer line added (canon + master mirror: «Числовые параметры сэмплирования … — §7A.6») — canon catches up to the deployed master shape | REPLACED_BY_CANONICAL **— executed iter 145** | DEC-22 S-b; matrix `p7a_model_checklist::02` recommendation |
| SP-4 | `p8_ap5_reppen_high::01` | E12 AP-5 fix card «Держите RepPen 1.0–1.05» (unqualified — wrong for 32B+ under S-a); canon §8.6 prose already defers | E12 card re-framed: «Держите RepPen в диапазоне своей модели — §7A.6 (никогда > 1.10). Используйте MinP вместо повышения RepPen.»; `[VS: E12]` canon marker declares the numeric-fix defer | MOVED **— executed iter 145** | DEC-22 S-d; Registry A E12 «numeric recommendation must have one canonical home» |
| SP-5 | `p9_basic_checklist::03` | §9.3 Parameters row «(рекомендация 1.0–1.05)» (unqualified) | «(1.0–1.05 для 12B; диапазоны по типам моделей — §7A.6)» — 12B-qualified like the adjacent Temperature check (canon + master) | MOVED **— executed iter 145** | DEC-22 S-d |
| SP-6 | `p9_additional_problems::02` | §9.4 problem #4 «Установите RepPen 1.0–1.05» (unqualified) | «Установите RepPen в диапазоне своей модели (для 12B — 1.0–1.05; [ref: §7A.6])» (canon + master) | MOVED **— executed iter 145** | DEC-22 S-d; fold-into-§9.5 stays an open editorial candidate (out of scope) |
| SP-7 | `p9_12b_issues::03` | §9.10 12B row «RepPen 1.02-1.05» (12B-consistent, unqualified in-cell) | «RepPen 1.02–1.05 (12B-диапазон — [ref: §7A.6])» (canon + master) — the §9.5 «Повторяющиеся фразы» row already defers via AP-5, verified unchanged | MOVED **— executed iter 145** | DEC-22 S-d; §2.4 «12B hints stay valid» |
| SP-8 | — (master layer) | E17 32B+ column: Temperature «0.7–1.1*» split «0.7–0.9 базовая \| 0.85–1.1 чеклист», RepPen «1.0–1.10» split «1.0–1.05 рекомендуется \| 1.05–1.10 с осторожностью» — the production display of BOTH sides, orphan asterisk, no footnote | 32B+ column = the canonical «32B+ / API» values (Temperature **0.7–1.0**, RepPen **1.05–1.10**); both sub-range splits + the asterisk removed; 12B column + sanctioned 12B sub-range + API column untouched; re-point comment (iter 145 / DEC-22 / declared omission / audit); 12B–32B middle tier = **declared omission** (no embed representation pre- or post-slice — now declared in the embed comment + canon marker) | SHARED_REFERENCE **— executed iter 145 (audit-locked)** | Registry A E17; DEC-22 S-c |
| SP-9 | — (master layer) | E12 embed = 59/61 prototype-identical catalog incl. the contradicting AP-5 fix | AP-5 card re-framed (SP-4) + re-point comment declares the numeric-fix defer chain | SHARED_REFERENCE **— executed iter 145 (audit-locked)** | Registry A E12; DEC-22 S-d |
| SP-10 | — (rule-strength, §6.5/DEC-20) | Appendix B model-capability percentages (~60–80% / ~85–95% / ~90–98%) carried no strength class | **first OBSERVATION-strength application**: «НАБЛЮДЕНИЕ» callout (base `.callout` — registered component, fence #7 clean; ПРАВИЛО↔RULE / РЕКОМЕНДАЦИЯ↔GUIDELINE mapping untouched) in canon `appendix_model_table.md` + master + root fallback | EXECUTED **— iter 145** | DEC-20 «first consuming slice»; PLAN row sampling-cluster |
| SP-11 | — (gate) | no parity audit covered the cluster (verified iter 144) | `scripts/audit_sampling_parity.py` (12 check groups; MUST-PASS gate wired into `AGENTS.md` canon-audits — parity ×7) | EXECUTED **— iter 145** | mig-2/mig-3/voice gate pattern |
| SP-12 | — (disposal/state) | E17/E12 prototype+extract frozen (DEC-19 at-slice-time); KI#72 OPEN since iter 120; semantic extraction 6/7 | 8 files → `REMOVED_WITH_REASON` (E17 prototype + 3 extracts + E12 prototype + 3 extracts; archive = git history); **KI#72 CLOSED**; map Registries A/B + §6 + §7 → DECIDED/EXECUTED; matrix back-pointers; STATUS/PLAN/worklog/CHANGELOG/NAV updated; semantic extraction **COMPLETE (7/7)** | EXECUTED **— iter 145** | DEC-19; KI#81 disposal precedent |

Accounting: 1 marker upgrade (SP-1) + 1 canonical-owner verification (SP-2,
byte-unchanged) + 1 param-row drop with defer (SP-3) + 4 hint re-frames
(SP-4…SP-7) + 3 cross-layer executions (SP-8/SP-9/SP-10) + 1 gate + 1
disposal/state package (SP-11/SP-12). The §7A.6 canonical table, the 12B and
API columns of E17, the E17 checklist, §8.6 AP-5 prose and the glossary RepPen
entry are byte-unchanged — enforced by the parity audit. Root fallbacks
`parts/part_07a.html` + `parts/part_08.html` + `parts/part_09.html` +
`parts/appendix_model_table.html` regenerated with the slice. Deferred
(informational): visual-system/PLAN.md E17/E12 table copies (frozen design
doc, DEC-19); canon front-matter `vs_embedded` staleness (repo-wide, rides
the v2 canon format); the §9.4↔§9.5 fold candidate (matrix `::02`, open
editorial candidate — not this slice's scope). Consequence of S-a (stated in
the ratified package): the «0.85–1.1» Temperature side disappears from the
live site — the canonical top for 32B+ becomes 1.0; AP-5's ≤ 1.10 boundary
framing is unaffected.

### 5.8 Part 1 v2 build slice (seeded + executed iter 147 — v2 build phase, first Part)

Scope: **Part 1 — Foundations** (6 sections, 30 block rows; DEC-24 Q6 guide
order — Part 1 first; the ratification gate cleared by the same owner reply,
chat 2026-09-15 «продолжай работы по планам!»). Mechanism: the ratified spec
§7 per-Part slice shape (evidence → canon restructure → master mirror → full
battery) — **first application**. Primary reader mode: **Learn** (entry Part —
full-narrative default visibility per the spec §3; the Build-mode entry
instrument lives here as §1.8). Editorial Policy 5-point check applied per
edit (documented per row below). Acceptance gate: the full battery (sync
97/97 + parity ×7 + build + validate + tests + qa baselines) — **no new
cluster parity gate**: Part 1 owns no cluster values (verified: §7A.12/§7A.6
owners untouched; §1.1 carries the canonical Методология caveat whose §3.1
copy already defers — B10's verified exemplar, unchanged).

**F2 presentation map (spec §4.1 mechanism, first application):** the Part 1
matrix tables now carry the `presentation` column (29 existing rows
re-verified + 1 new row = 30; matrix §1.2 documents the mechanism).
Disposition: **all `open`** — Part 1 is the Learn-mode entry Part and its
blocks are already compressed (ed-1 executed iters 125/129); no block meets
the registered Collapsible criteria (`docs/components.md` #5: short content
<100 words — the §1.1 Методология disclaimer ~70 words considered and
rejected; retrieval: it qualifies the adjacent evidence table). The other F2
values go live at the Parts carrying matching blocks (e.g. the §7A.1 anchors
full copy = `canonical-link` candidate at Part 7A's slice; long worked
scenarios = `collapsible` candidates at Parts 9/10). F3: §1.8 =
decision-input checklist → reframed as the Build-mode entry instrument
(P1-1); zero checkbox affordances in Part 1 (compliant — reserved for §9.3 /
§9.11 validation). F4: the §1.4 OCEAN callout = worked tier (labelled
ПРИМЕР) — compliant; no unlabelled standalone examples found. F5: the
micro-template regularized — §1.4 gains its Reference branch (P1-4), §1.7's
Reference branch restored to master (P1-5). F6: **zero new
`<details class="interactive">`** — no qualifying block (honest application
of the component criteria, not forced).

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P1-1 | `p1_prebuild_checklist::01` | intro: «6 вопросов перед началом сборки карточки. Каждый ответ определяет…» (matrix row, KEEP) | **F3 reframe:** «**Профиль сборки** — входной инструмент режима сборки (Build). 6 вопросов перед началом работы; каждый ответ определяет… Путь сборки по готовому профилю: конвейер — [ref: part_07a.md §7A.13], бюджеты блоков — [ref: part_07a.md §7A.12]» + canonical marker extended «— Build-mode entry instrument (build profile)» (canon + master mirror; section ID/title/table/РЕКОМЕНДАЦИЯ byte-unchanged) | MOVED **— executed iter 147** | DEC-24 Q3 (F3 decision-input / Build-mode entry instrument); intake B2; the original sentence pair preserved inside the reframe (capability/coverage); 5-point check documented in worklog |
| P1-2 | `p1_prebuild_checklist::02` | 6-question table (Q2 budget numbers vs §7A.12 = R11 framing tension, UNCLEAR) | unchanged — the instrument's content stays; R11 remains the recorded open candidate (owner-gated ed-5 family) | UNCHANGED (verified iter 147) | Editorial Policy: UNCLEAR ≠ change; out of scope |
| P1-3 | — (master layer) | master §1.8 closing line: self-link «Быстрый старт и 6 шагов сборки — §1.8 Чек-лист перед сборкой» + character-complexity map (content duplicating canon §1.7::06); no canon counterpart | line removed: the self-link = zero navigation capability (§1.8 links to itself); the character-map pointers render at their canon home §1.7 (P1-5); the build path is carried by the P1-1 intro | REMOVED_WITH_REASON **— executed iter 147** | 5-point check: capability (nothing lost — dead self-link; map content re-homed), coverage (§1.7), retrieval (build path at P1-1), context (§1.8 closes on the РЕКОМЕНДАЦИЯ), dependency (no audit probe/test/link depends on the line — grep verified: «Быстрый старт» absent from scripts/tests) |
| P1-4 | `p1_core_rules::07` (NEW matrix row) | master-only line «Ссылка: Пример реалистичного современного персонажа… — Уолтер Уайт, §10.2» (sync probe P3-4; no canon block = master-side drift) | canon §1.4 gains the **Reference branch** (F5): «**Ссылка:** Пример реалистичного современного персонажа (без фэнтези-элементов, простая SPINE) — Уолтер Уайт, [ref: part_10.md §10.2]» — canon catches up to the deployed master line; master byte-unchanged | MOVED **— executed iter 147** | DEC-24 Q4 (F5 Reference branch); drift closure (master-only block canonicalized) |
| P1-5 | `p1_top3_problems::06` | canon «Ссылка: Готовые карточки разной сложности — … → [ref: part_10.md], [ref: appendix_character_map.md]» (matrix row exists; master paragraph missing = canon-side drift) | master §1.7 mirror added: 4 Part-10 anchors (#p10_elena/#p10_walter/#p10_omnis/#p10_vysherblenny) + «Карта всех персонажей — Appendix D» as plain text (no link — Appendix D has no master HTML; DEC-24 Q7 WIRE covers the 3 manifest appendices only) | MOVED **— executed iter 147** | F5 Reference branch restored canon→master; drift closure |
| P1-6 | — (evidence) | matrix Part 1 tables: 8 columns, no presentation axis (the missing piece B-final/F2 flagged iter 143) | `presentation` column seeded (30 rows, all `open`); matrix §1.2 documents the mechanism + scope (Part-sliced, not global) | EXECUTED **— iter 147** | DEC-24 Q2 (F2 matrix-column mechanism) |
| P1-7 | — (state) | spec PROPOSED; STATUS Next step = the ratification call; PLAN row v2-ratify owner-gated | spec header → RATIFIED (DEC-24; content untouched); DEC-24 recorded; STATUS/PLAN/worklog/CHANGELOG updated; Next step re-pinned to the Part 2 slice | EXECUTED **— iter 147** | DEC-24; iter-142/145 DEC-plus-slice pattern |

Accounting: 1 F3 reframe (P1-1) + 1 verified-unchanged with recorded defers
(P1-2) + 1 master-side drift disposal (P1-3) + 2 Reference-branch
regularizations (P1-4/P1-5) + 1 presentation-column seeding (P1-6) + 1 state
package (P1-7). Byte-unchanged: §1.1 entirely (incl. the Методология
canonical caveat + the R04-flagged evidence row — owner-gated ed-1/ed-4),
§1.2/p1_structure_overview (all 7 rows), §1.4 ::01–::06 (rules, terms, the
OCEAN example), §1.7 ::01–::05 + Синтез, the §1.8 6-question table +
РЕКОМЕНДАЦИЯ. Deferred (recorded, out of scope): R04 drift-row owner decision
(ed-1/ed-4); R11 Q2 budget framing (ed-5); KI#79 drift-tool regex (tooling);
canon front-matter `vs_embedded` staleness (repo-wide, rides the v2 canon
format). Root fallback `parts/part_01.html` regenerated with the slice (+
root `index.html` timestamp). Drift actionable 159 → **158** (−1: the §1.8
canonical-marker/intro pairing resolved by the reframe + matching markers).
Next Part: **Part 2** (guide order; its own slice reuses this shape).

### 5.9 Part 2 v2 build slice (seeded + executed iter 148 — v2 build phase, second Part)

Scope: **Part 2 — Behavioral Anchors** (6 sections, 26 block rows; DEC-24 Q6 guide order — Part 2
second; the per-Part track pinned by STATUS Next-step row 1, **not owner-gated** — the
ratification gate cleared by DEC-24). Mechanism: the ratified spec §7 per-Part slice shape
(evidence → canon restructure → master mirror → full battery) — second application, reusing the
§5.8 pattern. Primary reader mode: **Learn** (the core teaching Part — full-narrative default
visibility per the spec §3). Editorial Policy 5-point check applied per edit (documented per row
below). Acceptance gate: the full battery (sync 97/97 + parity ×7 + build + validate + tests +
qa baselines) — **no new cluster parity gate**: Part 2 owns no cluster values (verified: the
seven cluster owners — §7A.2 / §7A.12 / §7A.6 / §5.4 / §9.6 / §3.2 / glossary registry —
untouched; Part 2's RULEs are compliant apply-layers, matrix R24 / R07-family / Price whitelist).

**F2 presentation map (spec §4.1 mechanism, second application):** the Part 2 matrix tables now
carry the `presentation` column (26 rows; matrix §1.2 scope note extended to Parts 1–2).
Disposition: **all `open`** — Part 2 is the Learn-mode core teaching Part (BASIC §2.1–§2.4,
INTERMEDIATE §2.5–§2.6) and its blocks are core teaching content (canonical definitions, rules,
tables, protected examples — every block under 100 words); no block meets the registered
Collapsible criteria (`docs/components.md` #5: nothing supplementary, nothing >200 words, no
technical-reference material). F3: the §2.2 «Критерии качества якорей» list = teaching class
(stays prose/list; checkbox affordances reserved for §9.3/§9.11); zero decision-input checklists
in Part 2 (the Build-mode entry instrument = §1.8, executed iter 147). F4: the §2.2
antipattern-card + §2.6 Выщербленный = worked tier (labelled ИЛЛЮСТРАЦИЯ, recognition function);
the §2.1/§2.3 tables = inline tier — compliant. F5: canon verified F5-approximate as-is —
§2.1+§2.2 form the Concept→Rule→Core-example pair (failure-mode demo = ::04 RULE + ::05 table;
edge cases = §2.6; Reference = live inline refs ::03/::06/::07) — **zero canon content edits**.
F6: **zero new `<details class="interactive">`** — no qualifying block (honest application of
the component criteria, not forced).

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P2-1 | — (evidence) | matrix Part 2 tables: 8 columns, no presentation axis | `presentation` column seeded (26 rows, all `open`); matrix §1.2 scope note extended to Parts 1–2; Part 2 verdict + iter-148 slice note appended | EXECUTED **— iter 148** | DEC-24 Q2 (F2 matrix-column mechanism) |
| P2-2 | `p2_anchor_rules::02` | quality-criteria 4-bullet list (matrix row, KEEP) | unchanged — F3 teaching class (walks anchor-quality concepts; stays prose/list); zero checkbox affordances (reserved §9.3/§9.11); zero decision-input checklists in Part 2 | UNCHANGED (verified iter 148) | DEC-24 Q3 (F3 triage); Editorial Policy: no edit = no load change |
| P2-3 | `p2_anchor_rules::05`, `p2_sensory_anchors::04` | worked examples (antipattern-card + Выщербленный code, ИЛЛЮСТРАЦИЯ-labelled) | unchanged — F4 compliant: worked tier where labelled + recognition function (anti-pattern «потом будет жалеть» / sensory-anchor format); §2.1/§2.3 tables = inline tier | UNCHANGED (verified iter 148) | DEC-24 Q3 (F4); research §21 example protection (R22) |
| P2-4 | — (master layer) | master §2.3 closing transition «Якоря определяют, **что** делает персонаж. Но поведение — это не только действие, но и **голос**. Следующая часть — о том, где голос живёт в карточке и как его изолировать от описания.» — master-only since the v7 unified migration (`eb4b91bd`, 2026-05-14), never canonized; «Следующая часть» factually premature at §2.3 (§2.4–§2.6 follow); no `bridge-paragraph` class; escaped the iter-47 bridge cleanup (probe P2-3-del-02 targeted the other, older bridge text) | paragraph removed: §2.3 closes on the anchors table; the E04 embed's link-back («Embodiment = механизм внутри Anchor Action → См. E03») carries the §2.3→§2.4 flow; Part-3 navigation stays at §1.7 Ошибка 2 (`[ref: part_03.md §3.1]`) + TOC + linear order | REMOVED_WITH_REASON **— executed iter 148** | 5-point check: capability (premature Part-3 pointer — nothing unique; the action/voice split is owned by §1.4 principle 2 + Part 3), coverage (§1.4 / §2.1 / Part 3), retrieval (mid-Part reader does not need Part-3 anticipation), context (§2.3 closes on the table; the E04 embed follows naturally), dependency (grep-verified: «Якоря определяют» / «где голос живёт» absent from scripts/tests/docs); corpus law: «Переход» budget «только 1–2 на гайд» (canon `_README.md` §3.9) already spent by the two sanctioned canon-synced bridges (part_06 `p6_cot_bridge`, part_09) |
| P2-5 | — (canon F5/F6) | canon `part_02.md` vs the F5 micro-template | verified F5-approximate as-is (Concept→Rule→Core example per section pair; ▸Failure modes = §2.2 ::04/::05; ▸Edge cases = §2.6; Reference = live inline refs ::03/::06/::07); F6 = zero qualifying blocks; **zero canon content edits** — the matrix verdict «canonical teaching part, near-clean» holds at v2 | VERIFIED **— iter 148** | DEC-24 Q4 (F5/F6); Editorial Policy (no redundant presentation found) |
| P2-6 | — (state) | STATUS iter-147 / PLAN row v2-build-part-2 open / no map §5.9 | map §5.9 + STATUS iter-148 (KI#72 row deleted per lifecycle) + PLAN v2-build-part-3 + worklog + CHANGELOG + NAV §7 de-stale (v2_architecture + editorial_matrix rows — current-state mandate) + `audit_sampling_parity.py` check 12 KI#72 sub-check extended to accept the lifecycle-deleted state (row deleted per AGENTS.md KI lifecycle ⇔ the audit still required the live CLOSED row — stale against the law; the check now accepts EITHER the live row OR the recorded lifecycle-deletion note; protective intent preserved); Next step re-pinned to the Part 3 slice | EXECUTED **— iter 148** | iter-147 state-package pattern; authority order (AGENTS.md law > tool snapshot) |

Accounting: 1 presentation-column seeding (26 rows, all `open`) + 3 F-policy verifications with
zero content edits (F3 / F4 / F5-F6) + 1 master-side drift disposal (P2-4) + 1 state package
(P2-6, incl. the `audit_sampling_parity.py` KI#72 lifecycle-check extension — the only
infrastructure touch, forced by the AGENTS.md-mandated row deletion). Byte-unchanged: canon `part_02.md` entirely (front-matter staleness deferred,
repo-wide); master §2.1/§2.2/§2.4/§2.5/§2.6 entirely; matrix tag/decision/load/repeat columns
unchanged. Deferred (recorded, out of scope): canon front-matter `vs_embedded` staleness (rides
the v2 canon format); KI#79 drift-tool regex (tooling); the §9.4↔§9.5 fold candidate (rides the
Part 9 slice). Root fallback `parts/part_02.html` regenerated with the slice (+ root
`index.html` timestamp). Drift actionable **158 → 158** (the disposed paragraph was master-side
— not a canon-side actionable class; verified by tool-mechanism analysis pre-edit and by the
post-edit run). Next Part: **Part 3** (guide order; its own slice reuses this shape).

### 5.10 Part 3 v2 build slice (seeded + executed iter 149 — v2 build phase, third Part)

Scope: **Part 3 — Voice** (8 sections, 46 block rows; DEC-24 Q6 guide order — Part 3 third; the
per-Part track pinned by STATUS Next-step row 1, **not owner-gated** — the ratification gate
cleared by DEC-24). Mechanism: the ratified spec §7 per-Part slice shape (evidence → canon
restructure → master mirror → full battery) — third application, reusing the §5.8/§5.9 pattern.
Primary reader mode: **Learn** (the core teaching Part for voice — full-narrative default
visibility per the spec §3). Editorial Policy 5-point check applied per edit (documented per row
below). Acceptance gate: the full battery (sync 97/97 + parity ×7 + build + validate + tests +
qa baselines) — **no new cluster parity gate**: Part 3 hosts one cluster owner (§3.2 voice
influence, DEC-21) and the slice keeps `audit_voice_parity.py` green (verified: the §3.2
canonical record — 6×3 table, «Хранилище ≠ Влияние» prose, both `[VS: E07]` / widget markers,
the 12B RULE — byte-unchanged; every master edit sits outside the parity-locked inventory).

**F2 presentation map (spec §4.1 mechanism, third application):** the Part 3 matrix tables now
carry the `presentation` column (46 rows; matrix §1.2 scope note extended to Parts 1–3).
Disposition: **all `open`** — Part 3 is the Learn-mode core teaching Part for voice (BASIC
§3.1/§3.3/§3.5, INTERMEDIATE §3.2/§3.4/§3.6/§3.7, EXPERT §3.8) and every block is canonical
teaching content (definitions, rules, tables, protected examples — all under the registered
Collapsible thresholds; the longest block, the §3.8 full scene ~100 words, is the section's core
demonstration = required reading for the technique); zero supplementary / technical-reference /
>200-word material → zero qualifying F6 blocks (honest application, not forced). F3: the §3.3
structure list + §3.4 class list + §3.6 causes list = teaching class (stay prose/list; zero
checkbox affordances — reserved §9.3/§9.11; zero decision-input checklists — the Build entry
instrument = §1.8, executed iter 147). F4: worked tier = §3.2 ПРИМЕР (labelled), §3.4/§3.6
diff-views + §3.8 scene (chip ИЛЛЮСТРАЦИЯ), §3.8 ПРИМЕР pair (labelled); the §3.6 Narrator
Bleed antipattern-card = worked tier via the card form (НЕВЕРНО/ВЕРНО labels — the part_04/
part_08 unchipped variant; both registered components, the chip+card combination is not
mandated — no chip invented). F5: canon verified as-is, **zero content edits** (Concept→Rule→
Core example per section; Reference branches live: §3.1::06→§1.1, §3.5→§7B.2, §3.6::06→§8.12,
§3.7::04→§3.8, §3.8::02→§10.4 — the matrix verdict «near-clean» holds at v2).

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P3-1 | — (evidence) | matrix Part 3 tables: 8 columns, no presentation axis | `presentation` column seeded (46 rows, all `open`); matrix §1.2 scope note extended to Parts 1–3; Part 3 verdict + iter-149 slice note appended; the stale R18 note on `p3_greeting_ref::01` refreshed (the `§7B.X` vague placeholder was repaired to `§7B.2` iter 128, ed-8 Phase A — the note described the pre-repair state; the master link text «Part 7B: приветствие» recorded as the deliberate iter-123 DEC-16 translation, compliant) | EXECUTED **— iter 149** | DEC-24 Q2 (F2 matrix-column mechanism) |
| P3-2 | — (canon F5/F6) | canon `part_03.md` vs the F5 micro-template | verified F5-approximate as-is (Concept→Rule→Core example per section pair; ▸Failure modes = §3.6 variants + causes; ▸Edge cases = §3.7; Reference = live inline refs); F6 = zero qualifying blocks; **zero canon content edits** — the §3.2 voice-cluster canonical record byte-unchanged (DEC-21 parity lock) | VERIFIED **— iter 149** | DEC-24 Q4 (F5/F6); Editorial Policy (no redundant presentation found) |
| P3-3 | — (master layer) | master §3.6 heading pair: `<h4>Пример: Выщербленный</h4>` + (zero content) + `<h4>До/После: утечка голоса</h4>` — the first heading master-only since the v9 Phase 3.2 rename (git pickaxe `66605363` 2026-05-15, renamed from «Пример: Джесси Пинкман»), never canonized, degenerate (empty scope); canon merged the pair into one heading `### До/После: утечка голоса (Выщербленный)` (iter 123) | stray heading removed; the surviving heading restored to the canon form `<h4>До/После: утечка голоса (Выщербленный)</h4>` | REMOVED_WITH_REASON **— executed iter 149** | 5-point check: capability (empty heading — nothing unique; the character qualifier lives in the canon heading), coverage (canon heading form), retrieval (unchanged — same position, same anchor flow), context (the diff-view follows the heading directly), dependency (grep-verified: «Пример: Выщербленный» absent from scripts/tests/audits); fence #10 (canon wins) |
| P3-4 | — (master layer) | master §3.4 + §3.6 trailing `<pre class="plain-copy">` blocks (Quality Grade / Voice Leak До/После textual re-statements) — master-only since the v7 unified migration (`eb4b91bd`), never canonized; the `plain-copy` class is undefined in both stylesheets + unregistered in `docs/components.md` (fence #7 legacy violation); the E03 marker in Part 2 documents this exact family as replaced («Замещает… сопутствующий `<pre class="plain-copy">` текстовый дубликат») | both blocks removed: the adjacent diff-view cards carry the full canon table content; the pre blocks were lossy compressed re-statements of the cards directly above them | REMOVED_WITH_REASON **— executed iter 149** | 5-point check: capability (nothing — pure re-statement), coverage (diff-view cards + canon tables), retrieval (cards directly above), context (sections close on the diff-views per canon), dependency (grep-verified: no script/test/audit probes the plain-copy text; NAV §5 pitfall #12 «viz > dry text» — replacement, not addition); the only `plain-copy` usages in the corpus were these two (post-disposal grep = 0 in src/) |
| P3-5 | `p3_influence_hierarchy::06`, `p3_voice_leak::06`, `p3_joker_case::04` | (a) master §3.2 callout label `EXAMPLE — …` (canon `**ПРИМЕР — …**` since iter 123 — the russification pass missed the `EXAMPLE — ` variant, pickaxe-verified); (b) master §3.6::06 paragraph without the `**Ссылка:**` label, pre-iter-123 wording («возникает Voice Bleed» vs canon «возникает межперсонажная утечка голоса (Voice Bleed)»), link text «Part 8: AP-11» (no §8.12); (c) master §3.7::04 paragraph without the label, plain-text «Мульти-персонажные примеры (ниже)» instead of the canon ref `[ref: §3.8 — Мульти-персонажные примеры]` | (a) label → `ПРИМЕР —`; (b) full canon form restored: `<strong>Ссылка:</strong>` + canon wording + link `Part 8: §8.12 — AP-11 Voice Bleed`; (c) label + anchor `<a href="#p3_multi_char">§3.8 — Мульти-персонажные примеры</a>` | MOVED **— executed iter 149** | the P1-5 mirror-restoration family (canon blocks without master mirrors — the labels/refs never existed in master, pickaxe-verified `--all`); DEC-16 label law («Ссылка» = Russian guide label); F5 Reference-branch mirror duty |
| P3-6 | — (state) | STATUS iter-148 / PLAN row v2-build-part-3 open / no map §5.10 | map §5.10 + STATUS iter-149 (KI#83 recorded + CLOSED; Next step re-pinned to the Part 4 slice) + PLAN v2-build-part-4 + worklog + CHANGELOG + NAV §7 de-stale (v2_architecture + editorial_matrix rows: Parts 1–3) + AGENTS.md syntax-baseline sync (247→238 — stale against the iter-145 245 and the iter-149 238) + `check_syntax_mix.py` italic regex line-bounded (KI#83 — the only infrastructure touch, forced by the slice's baseline gate: the plain-copy disposal changed the asterisk topology and tripped 2 cross-line false positives 245→247; fix verified — both corpora 238, the 7 eliminated BASE findings all cross-context artifacts, zero legitimate findings lost; the bold-pattern re-bounding deferred inside the KI) | EXECUTED **— iter 149** | iter-147/148 state-package pattern; authority order (AGENTS.md law > tool snapshot); the iter-148 audit-check precedent |

Accounting: 1 presentation-column seeding (46 rows, all `open`) + 1 canon F5 verification with
zero content edits + 1 stray-heading disposal with canon-heading restoration (P3-3) + 1
plain-copy disposal ×2 blocks (P3-4) + 1 mirror-completion package ×3 blocks (P3-5) + 1 state
package (P3-6, incl. the `check_syntax_mix.py` KI#83 italic-regex line-bounding — the only
infrastructure touch, forced by the slice's baseline gate, the iter-148 audit-check precedent;
the syntax baseline re-based 245 → **238**, both corpora equal — the content delta contributes
0). Byte-unchanged: canon `part_03.md` entirely (front-matter staleness deferred,
repo-wide); master §3.1/§3.3/§3.5/§3.8 entirely + §3.2/§3.4/§3.6/§3.7 outside the edited
blocks; the §3.2 parity-locked inventory (table / prose / markers / widget container / E07
embed); matrix tag/decision/load/repeat columns unchanged. Deferred (recorded, out of scope):
canon front-matter `vs_embedded` staleness (rides the v2 canon format); KI#79 drift-tool regex
(tooling); KI#83's bold-pattern re-bounding (215 pre-existing `__` BEM artifacts — separate
baseline re-derivation); typography-level variances (straight vs guillemet quotes in §3.6 —
formatting churn, not F-policy); the §3.5 master link text (deliberate iter-123 translation —
recorded in the matrix note, not a deficit). Root fallback `parts/part_03.html` regenerated
with the slice (+ root `index.html` timestamp). Drift actionable **158 → 157** (−1: the
§3.6::06 canon paragraph matched by the P3-5(b) mirror restoration — canon-side actionable
class, verified by the post-edit run; the disposals were master-side and did not affect the
count). Next Part: **Part 4** (guide order; its own slice reuses this shape).

### 5.11 Part 4 v2 build slice (seeded + executed iter 150 — v2 build phase, fourth Part)

Scope: **Part 4 — SPINE** (11 sections, 51 block rows; DEC-24 Q6 guide order — Part 4 fourth; the
per-Part track pinned by STATUS Next-step row 1, **not owner-gated** — the ratification gate cleared
by DEC-24). Mechanism: the ratified spec §7 per-Part slice shape (evidence → canon restructure →
master mirror → full battery) — fourth application, reusing the §5.8/§5.9/§5.10 pattern. Primary
reader mode: **Learn** (the core teaching Part for SPINE — full-narrative default visibility per the
spec §3). Editorial Policy 5-point check applied per edit (documented per row below). Acceptance
gate: the full battery (sync 97/97 + parity ×7 + build + validate + tests + qa baselines) —
**no new cluster parity gate**: Part 4 owns no cluster values (verified: the seven cluster owners —
§7A.2 / §7A.12 / §7A.6 / §5.4 / §9.6 / §3.2 / glossary registry — sit outside Part 4; the §4.8::08
Consequence-Driven hint defers to §7A.2, the §4.8::03 FLAW-linked rule mirrors AP-8 compliantly);
SPINE causality recurrence = whitelisted useful repetition (matrix §1.3 rule 3).

**F2 presentation map (spec §4.1 mechanism, fourth application):** the Part 4 matrix tables now
carry the `presentation` column (51 rows; matrix §1.2 scope note extended to Parts 1–4).
Disposition: **50 `open` + 1 `canonical-link`** — Part 4 is the Learn-mode core teaching Part for
SPINE (BASIC §4.1–§4.8, INTERMEDIATE §4.9–§4.10, EXPERT §4.11 per the canon difficulty markers) and
every other block is canonical teaching content (definitions, rules, mapping tables, protected
examples — all under the registered Collapsible thresholds; the longest, the §4.7 full-chain code
block ~100 words, is the section's core demonstration = required reading) → zero qualifying F6
blocks (honest application, not forced). The one `canonical-link` = `p4_spine_full_chain::04` (the
R21 near-verbatim re-statement — executed as P4-2 below). F3: the §4.9 checklist = validation class
(the pre-existing ☐ affordance at a true pass/fail verification moment — compliant; checkboxes
otherwise reserved §9.3/§9.11); the §4.8 algorithm + the §4.11 when-lists = teaching/application
lists, zero checkbox affordances; zero decision-input checklists (the Build entry instrument =
§1.8, executed iter 147). F4: worked tier = the §4.7 full-chain code + the §4.8 Елена table (chipped
ИЛЛЮСТРАЦИЯ) + the §4.2 anti-pattern card (the registered unchipped variant — no chip invented);
the per-element canonical value tables (§4.2/§4.3/§4.4/§4.5/§4.6) = inline tier. F5: verified
(Concept→Rule→Core example per section; Reference branches live: §4.1::06→§4.9, §4.7::05→Part 10 +
§4.2–§4.6, §4.8::08→§7A.2, §4.11::05→§4.7 + Part 10, §4.11::08→§10.2); the fold tightens §4.7's
Rule branch to the fence-#11 form. F6: zero new `<details class="interactive">`.

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P4-1 | — (evidence) | matrix Part 4 tables: 8 columns, no presentation axis | `presentation` column seeded (51 rows: 50 `open` + 1 `canonical-link`); matrix §1.2 scope note extended to Parts 1–4; the Part 4 verdict re-labeled audit-time + the iter-150 slice note appended; two stale notes refreshed — `p4_spine_mapping::08` (the KI#77-a §7A.6→§7A.2 repair was executed iter 127, ed-8 Phase B; the note described the pre-repair state) and `p4_ghost_layers::03` (the R29 «Отрочество»→«Юность» glossary normalization executed iter 129); R21 registry row + §16.3 candidate #16 marked executed (14/20, 6 open) | EXECUTED **— iter 150** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149 stale-note-refresh precedent |
| P4-2 | `p4_spine_full_chain::04` | «**Правило:** для простых персонажей призрак и ложь могут быть неявными. Но если используется полная цепочка — она должна быть логически связана. Проверьте: призрак объясняет ложь? Ложь защищает от боли призрака? Дефект — прямое поведение из лжи?» — near-verbatim re-statement of §4.1::06 (R21, matrix DUPLICATE/CROSS-REFERENCE since iter 126; candidate #16, owner gate NONE) | folded to the canonical-link form: «**Правило:** полная цепочка должна быть логически связана (для простых персонажей призрак и ложь могут быть неявными — правило упрощения: §4.1; проверка связности: чек-лист §4.9).» — 1-sentence local reminder + pointers to the canonical owner (§4.1::06) and the §4.9 checklist (the check-questions variant lives there); the §4.11 expert-side dual, the §8.10 L193 nuance and the glossary clause untouched | MOVED **— executed iter 150** | R21/candidate #16 (matrix-evidenced, DEC-15); DEC-24 Q2 (canonical-link); the §9.4↔§9.5-fold precedent (fold candidates ride the v2 build slices); 5-point check: capability (the rule stays locally; the check-questions = §4.9 checklist items 1–3 verbatim-equivalent), coverage (§4.1::06 owner + §4.9), retrieval (local reminder kept; the procedure one hop), context (§4.7 closes on the Ссылка branch — flow intact), dependency (grep-verified: the folded wording absent from scripts/tests/audits; no sync-audit probe locks this callout — the part_04 probe list verified: P0-3/P0-7/P0-8/P0-9/P1-5/P1-7/P2-13/P3-4b/P2-7) |
| P4-3 | `p4_want::01`/`::02`/`::03` | master §4.6 definition mangled («<strong>желание</strong> — осознанное Желание… желание совместим с LIE» — a partial russification that left broken casing + the pre-DEC-16 «LIE» wording); the rules list missing the 4th bullet «Совместимо с ложью (WANT ↔ LIE — персонаж не видит противоречия)» (never present in master in any form, pickaxe-verified `--all`); the examples table dropping «опубликовать» + the variant labels + the canon row order | the full canon iter-123 form restored: definition «**Желание (WANT)** — осознанное желание персонажа… Желание совместимо с ложью…»; the 4th bullet added; the table rows restored to the canon form (Елена / Елена (variant) / Выщербленный / Выщербленный (variant), «опубликовать историю» wording) | MOVED **— executed iter 150** | the P3-5 mirror-restoration family (the iter-123 DEC-16 russification that never reached master; pickaxe-verified: «Совместимо с ложью» never in master pre-slice); fence #10 (canon wins); the §4.5 table already carries the variant labels (master-internal consistency restored) |
| P4-4 | `p4_spine_full_chain::05`, `p4_ghost_layers::05` | (a) master §4.7 Ссылка without the «Ссылка:» label and without the canon Elena half («Полная цепочка Елены (другой канонический пример) — §4.2–§4.6 (поэлементно)» — never in master, pickaxe-verified); (b) canon §4.11::05 «Ссылка» (Полная цепочка Выщербленного — §4.7. Полная карточка — Part 10) with NO master counterpart at all | (a) the full canon form restored (bold label + `<a href="#p4_ghost">§4.2–§4.6</a>` anchor); (b) the missing «Ссылка» block added after the §4.11 3-tier example table (canon position; `<a href="#p4_spine_full_chain">§4.7</a>` + `<a href="#p10_vysherblenny">Part 10</a>`) | MOVED **— executed iter 150** | the P1-5/P3-5 Reference-branch mirror family (F5 Reference branch duty; DEC-16 «Ссылка» label law); the P3-4b Walter-line probe untouched (different block) |
| P4-5 | — (master layer, observed) | three master-only §4.8/§4.4 enrichments, never canonized: the `inf-pipeline` infographic «SPINE → Anchors: мнемоническая связь» (v7-era `eb4b91bd`; registered components; a *distinct* anchor-anatomy mnemonic — призрак→ТРИГГЕР / дефект→ЦЕНА — not covered by the canon type table), the mapping table's 4th «Пример (Елена)» column, the §4.4 nav callout «ПРАВИЛО: FLAW-linked Anchors → SPINE → Карта Anchors: FLAW-Anchors (ниже)» | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (both directions change reader-visible knowledge: disposal loses unique capability, canonicalization adds canon content — an editorial value decision outside this slice's forced scope) | RECORDED **— deferred (iter 150)** | AGENTS.md scope discipline (discovering ≠ permission to fix); Editorial Policy (compress redundant presentation, never unique capability); rides the canonical-audit stage (spec §8.3) or an ed-* batch |
| P4-6 | — (state) | STATUS iter-149 / PLAN row v2-build-part-4 open / no map §5.11 | map §5.11 + STATUS iter-150 (Next step re-pinned to the Part 5 slice) + PLAN v2-build-part-5 + worklog + CHANGELOG + NAV §7 de-stale (v2_architecture + editorial_matrix rows: Parts 1–4) | EXECUTED **— iter 150** | iter-147/148/149 state-package pattern |

Accounting: 1 presentation-column seeding (51 rows: 50 `open` + 1 `canonical-link`) + 1 canon R21
fold (P4-2 — the only canon content edit; the §4.7 chain code block, the §4.11 tables, every
canonical value table byte-unchanged) + 1 §4.6 mirror completion (P4-3) + 2 Reference-branch
mirrors (P4-4) + 1 observation package deferred (P4-5) + 1 state package (P4-6). Byte-unchanged:
canon `part_04.md` outside the §4.7::04 line (front-matter staleness deferred, repo-wide); master
§4.1/§4.2/§4.3/§4.4/§4.5/§4.8/§4.9/§4.10 entirely + §4.6/§4.7/§4.11 outside the edited blocks (the
E05/E06 embeds, the §4.8 infographic + 4th column + §4.4 nav callout — recorded P4-5, untouched);
matrix tag/decision/load/repeat columns unchanged. Deferred (recorded, out of scope): the P4-5
master-only enrichments (canonical-audit stage / ed-* batch); canon front-matter `vs_embedded`
staleness (rides the v2 canon format); KI#79 drift-tool regex (tooling); §4.2/§4.9 wording-level
variances (v7-era master compressions — «НЕ период» drop, mixed-identifier checklist item 4 —
formatting churn, not F-policy); quote-style variances (straight vs guillemet). Root fallback
`parts/part_04.html` regenerated with the slice (+ root `index.html` timestamp). Drift actionable
**157 → 155** (−2, both canon-side matches gained: the §4.6 restoration resolved the mangled
definition's no_master_match entry + the rules-list pairing, the §4.11::05 «Ссылка» canon paragraph
gained its master mirror — verified by the JSON pre/post diff; the §4.7 fold kept its pairing).
Next Part: **Part 5** (guide order; its own slice reuses this shape).

### 5.12 Part 5 v2 build slice (seeded + executed iter 151 — v2 build phase, fifth Part)

Scope: **Part 5 — Psychology** (7 sections, 43 block rows; DEC-24 Q6 guide order — Part 5 fifth; the
per-Part track pinned by STATUS Next-step row 1, **not owner-gated** — the ratification gate cleared
by DEC-24). Mechanism: the ratified spec §7 per-Part slice shape (evidence → canon restructure →
master mirror → full battery) — fifth application, reusing the §5.8–§5.11 pattern. Primary reader
mode: **Learn** (the core teaching Part for psychology — full-narrative default visibility per the
spec §3). Editorial Policy 5-point check applied per edit (documented per row below). Acceptance
gate: the full battery (sync 97/97 + parity ×7 + build + validate + tests + qa baselines) —
**no new cluster parity gate**: Part 5 **hosts** the enneagram cluster owner (§5.4, mig-5) — the
§5.4 canonical 9-type record + the E10 embed + the generated `data/enneagram.json` chain stay
**byte-stable** through the slice (`audit_enneagram_parity.py` PASS — the iter-149 §3.2 voice
precedent); the §5.2 Elena 6w5 directions stay byte-stable (the audit's cross-layer check); the
other six cluster owners (§7A.2 / §7A.12 / §7A.6 / §9.6 / §3.2 / glossary registry) sit outside
Part 5 entirely.

**F2 presentation map (spec §4.1 mechanism, fifth application):** the Part 5 matrix tables now
carry the `presentation` column (43 rows; matrix §1.2 scope note extended to Parts 1–5).
Disposition: **43 × `open`** — Part 5 is the Learn-mode core teaching Part for psychology (BASIC
§5.1–§5.2, INTERMEDIATE §5.3–§5.4, EXPERT §5.5–§5.7 per the canon difficulty markers) and every
block is canonical teaching content (definitions, RULE/РЕКОМЕНДАЦИЯ callouts, canonical value
tables — the §5.1 dimensions/stress-type/trigger-categories/limits tables, the §5.4 9-type record,
the §5.5 validation tables — and the protected §5.2 worked example; all under the registered
Collapsible thresholds; the longest prose blocks, the §5.3 scenarios, are ~60–70 words each and
ARE the section's failure-mode demonstration = required reading) → zero qualifying F6 blocks
(honest application, not forced). F3: zero checklists — the §5.1 decision tree + the §5.6
wing-selection algorithm = teaching/application tables, zero checkbox affordances; zero
decision-input checklists (the Build entry instrument = §1.8, executed iter 147). F4: worked tier =
the §5.2 Elena OCEAN-profile + 6w5 tables (the section is chipped ИЛЛЮСТРАЦИЯ in master); the
§5.1::10 canonical chain example, the §5.3 conflict scenarios and the §5.6::03 wings-examples
table = inline tier (h4-labelled demonstrations — the registered unchipped variant; no chip
invented). F5: verified per section (Concept → Rule → Core example → Reference; ▸Failure modes =
the §5.3 scenarios; Reference branches live: §5.1::15→§7A.13, §5.4::05→§4.3, §5.5::01→§5.1,
§5.2::05 Валидация). F6: zero new `<details class="interactive">` (the one existing §5.1 usage =
the pre-existing interactive-pentagon widget container, untouched).

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P5-1 | — (evidence) | matrix Part 5 tables: 8 columns, no presentation axis | `presentation` column seeded (43 rows, all `open`); matrix §1.2 scope note extended to Parts 1–5; the Part 5 verdict re-labeled audit-time + the iter-151 slice note appended; **two stale notes refreshed** — `p5_ocean_basics::02` (the §5.1::02 internal-ref imprecision was repaired iter 127, ed-8 Phase B — the note described the pre-repair state; the R25 registry row already records the fix) and `p5_ocean_basics::15` (the R18 `§7A.X` vague placeholder was repaired iter 127, ed-8 Phase B, commit `8a365553` — byte-verified this slice at HEAD: the canon carries the precise §7A.13 target; the note described the pre-repair state) | EXECUTED **— iter 151** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149/150 stale-note-refresh precedent; NAV pitfall #27 discipline (byte-level verification before treating a display as ground truth — the audit-time note refreshed, not re-repaired) |
| P5-2 | `p5_ocean_basics::15` (canon) | canon L89 «**Ссылка:** Как применить OCEAN при сборке карточки → `[ref: part_07a.md §7A.13 — Assembly Pipeline]`» — already precise (the iter-127 ed-8 Phase B repair; this slice's preflight initially mis-read the line as still `§7A.X` from the stale matrix note — byte-verification + pickaxe disproved it) | **unchanged — verified byte-stable** (canon `part_05.md` byte-unchanged through the slice: zero canon content edits; the §5.4 enneagram record + the §5.2 Elena tables byte-stable per the mig-5 lock — the iter-149 §3.2 voice precedent) | VERIFIED **— unchanged (iter 151)** | fence #10 (canon = source of truth, already correct); Editorial Policy (no edit without functional load); pitfall #27 (display artifacts ≠ file content) |
| P5-3 | `p5_ocean_basics::15` (master side) | master §5.1 Ссылка paragraph without the «Ссылка:» label: `<p>Как применить OCEAN при сборке карточки → <a href="#p7a_assembly_pipeline">Part 7A: Конвейер сборки</a>.</p>` (pickaxe-verified: `<strong>Ссылка:</strong>` never present in master part_05 — `git log -S` empty) | the bold label added: `<p><strong>Ссылка:</strong> Как применить OCEAN при сборке карточки → …</p>` — the canon `**Ссылка:**` form | MOVED **— executed iter 151** | the P4-4/P3-5(b) Reference-branch mirror family (F5 Reference branch duty; DEC-16 «Ссылка» label law); the «Ссылка:» bold-label convention verified in master part_01/part_03 |
| P5-4 | `p5_cross_instrument_map::05` | master §5.5 «Enneagram ↔ MBTI» paragraph carrying only the canon tail («Каждый Enneagram-тип имеет вероятные MBTI-типы (и наоборот). Enneagram Builder и MBTI Composer показывают эти подсказки при M2+.»); the canon head missing («OCEAN-полюса коррелируют с MBTI-осями. MBTI Composer (M2+) показывает рекомендованные OCEAN-значения для выбранного типа; OCEAN Insight (M2+) прогнозирует вероятные MBTI-типы на основе профиля.») — git-verified: the iter-62 «R1 repetitions cleanup + §5.5 MBTI stub merge» removed the two sentences from MASTER while canon kept them (a fence-#10 divergence, not a dual-side disposal) | the full canon paragraph restored to master (head + tail as one `<p>`) | MOVED **— executed iter 151** | fence #10 (canon wins); the P4-3 mirror-completion family (canon block exists, master counterpart incomplete); matrix ::05 KEEP/YES (widget-behavior note — the MBTI Composer / OCEAN Insight capabilities the sentence pair declares) |
| P5-5 | — (master layer, observed) | master-only enrichments, never canonized: (a) the §5.1 E09 VS-EMBED (pentagon + context-limits inset) with NO canon `[VS: E09]` declaration (canon front-matter `vs_embedded: none` — stale, repo-wide family); (b) the §5.1 stress-type table rows 1–2 master-only suffixes «/ тревожный тип», «/ агрессивный тип»; (c) the §5.2 A-row «дефект» vs canon «FLAW» (v7-era wording variance); (d) the §5.4 master-only «Интерактивный Builder» heading + «Дополнительный контент:» callout prefix + noscript/embed/nav lines; (e) the §5.5 master-only nav line «Интерактивный выбор типа с автозаполнением SPINE — Enneagram Builder (выше)»; (f) the §5.5 OCEAN→SPINE table lowercase-start compressions (v7-era) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (both directions change reader-visible knowledge; the E09 canon-declaration gap rides the front-matter/v2-canon-format deferral) | RECORDED **— deferred (iter 151)** | AGENTS.md scope discipline (discovering ≠ permission to fix); Editorial Policy (compress redundant presentation, never unique capability); rides the canonical-audit stage (spec §8.3) or an ed-* batch |
| P5-6 | — (state) | STATUS iter-150 / PLAN row v2-build-part-5 open / no map §5.12 | map §5.12 + STATUS iter-151 (Next step re-pinned to the Part 6 slice) + PLAN v2-build-part-6 + worklog + CHANGELOG + NAV §7 de-stale (Parts 1–5) | EXECUTED **— iter 151** | iter-147…150 state-package pattern |

Accounting: 1 presentation-column seeding (43 rows, all `open`) + 1 verified-unchanged canon with
recorded stale-note refreshes (P5-2 — **zero canon content edits**; `part_05.md` byte-unchanged:
the §5.4 9-type record, the §5.2 Elena tables, every canonical value table byte-stable; front-matter
staleness deferred, repo-wide) + 1 «Ссылка» label mirror (P5-3) + 1 §5.5::05 mirror completion
(P5-4) + 1 observation package deferred (P5-5) + 1 state package (P5-6). Byte-unchanged: master
§5.2/§5.3/§5.4/§5.6/§5.7 entirely + §5.1/§5.5 outside the edited blocks (the E09/E10 embeds, the
interactive pentagon, the §5.4 builder widget containers — recorded P5-5, untouched); matrix
tag/decision/load/repeat columns unchanged. Deferred (recorded, out of scope): the P5-5
master-only enrichments (canonical-audit stage / ed-* batch); canon front-matter staleness (rides
the v2 canon format); KI#79 drift-tool regex (tooling); the §5.2 «дефект»/«FLAW» and §5.5 casing
wording variances (formatting churn, not F-policy). Root fallback `parts/part_05.html` regenerated
with the slice (+ root `index.html` timestamp). Drift actionable **155 → 155** (unchanged — the
two repaired master paragraphs already matched their canon counterparts above the paragraph
threshold; the P5-4 restoration raises the §5.5::05 pair's similarity, no count effect; verified
by the JSON pre/post diff). Next Part: **Part 6** (guide order; its own slice reuses this shape).

### 5.13 Part 6 v2 build slice (seeded + executed iter 152 — v2 build phase, sixth Part)

Scope: **Part 6 — CoT** (6 sections, 25 block rows; DEC-24 Q6 guide order — Part 6 sixth; the
per-Part track pinned by STATUS Next-step row 1, **not owner-gated** — the ratification gate cleared
by DEC-24). Mechanism: the ratified spec §7 per-Part slice shape (evidence → canon restructure →
master mirror → full battery) — sixth application, reusing the §5.8–§5.12 pattern. Primary reader
mode: **Learn** (the core teaching Part for CoT — full-narrative default visibility per the spec
§3). Editorial Policy 5-point check applied per edit (documented per row below). Acceptance gate:
the full battery (sync 97/97 + parity ×7 + build + validate + tests + qa baselines) — **no new
cluster parity gate**: Part 6 hosts no cluster owner (verified: the seven cluster owners — §7A.2 /
§7A.12 / §7A.6 / §5.4 / §9.6 / §3.2 / glossary registry — sit outside Part 6; Part 6 references
Appendix B / CoT mechanics only); the E11 embed (the Part's one VS-EMBED; Registry A disposition
still PROPOSED) stays untouched — the E09/E05/E06 precedent (non-cluster embeds ride their own
audit time; the canon-declaration gap recorded P6-4(d)).

**F2 presentation map (spec §4.1 mechanism, sixth application):** the Part 6 matrix tables now
carry the `presentation` column (25 rows; matrix §1.2 scope note extended to Parts 1–6).
Disposition: **25 × `open`** — Part 6 is the Learn-mode core teaching Part for CoT (INTERMEDIATE
§6.1–§6.3, EXPERT §6.4–§6.6 per the canon difficulty markers) and every block is canonical teaching
content (definitions, RULE callouts, the canonical Tier 0–3 table, the Tier 2/Tier 3 templates and
their protected worked examples — the code blocks ~60–90 words each are the sections' core
demonstrations = required reading; the R23 CoT example family = whitelisted useful repetition,
matrix §1.3 rule 5) → zero qualifying F6 blocks (honest application, not forced). F3: zero
checklists — the §6.2 «как выбрать 2–3 якоря» list + the §6.1 «Что добавляет CoT» map =
teaching/application lists, zero checkbox affordances; zero decision-input checklists (the Build
entry instrument = §1.8, executed iter 147). F4: worked tier = the §6.4 Елена + §6.5 Выщербленный
code examples + the §6.6 examples table (all chipped ИЛЛЮСТРАЦИЯ in master, with the Demonstrates
lists as HTML comments); the §6.3 tier-table «Пример» column = inline tier (woven into the
canonical table; no chip invented). F5: verified per section (Concept → Rule → Core example →
Reference; ▸Why = the §6.2 «почему ограничение» bullets; Reference branches live: §6.3::04→E11 —
the master mirror completed this slice (P6-3), §6.6::05 Переход→Part 7A). F6: zero new
`<details class="interactive">` (zero existing in part_06 master).

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P6-1 | — (evidence) | matrix Part 6 tables: 8 columns, no presentation axis | `presentation` column seeded (25 rows, all `open`); matrix §1.2 scope note extended to Parts 1–6; the Part 6 verdict re-labeled audit-time + the iter-152 slice note appended; **one stale note refreshed** — `p6_cot_tiers::05` (the R17 iter/KI-history-label strip was executed iter 128, ed-8 Phase B continuation — the note described the pre-strip state with the «iter 29, KI#18-F partial fix» descriptor; the current canon form keeps only the accessibility rationale + the deferred rus/eng-overlap decision); the ::04 note extended with the P6-3 mirror record; the ::03/::04 EN-label variances re-pointed to the P6-4(f) deferral | EXECUTED **— iter 152** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149/150/151 stale-note-refresh precedent |
| P6-2 | — (canon) | canon `part_06.md` (203 lines) — preflight full read: F5-approximate per section (Concept → Rule → Core example → Reference; ▸Why = the §6.2 bullets); zero unexecuted COMPRESS/DELETE rows (the one R17 candidate #17 executed iter 128) | **unchanged — verified byte-stable** (zero canon content edits: `part_06.md` byte-unchanged through the slice; the Tier 0–3 canonical table, the Tier 2/Tier 3 templates, the §6.5 naming rationale byte-stable; front-matter staleness `vs_embedded: none` deferred, repo-wide — recorded P6-4(d)) | VERIFIED **— unchanged (iter 152)** | fence #10 (canon = source of truth); Editorial Policy (no edit without functional load); the iter-148/149/151 zero-canon-edit precedents |
| P6-3 | `p6_cot_tiers::04` | canon §6.3 «**Ссылка:** Визуальная версия staircase — `[VS: E11]` в preamble Part 6.» with NO master counterpart at all (pickaxe-verified: «Ссылка» never present in master part_06 — `git log -S` empty; the «Примечание» ::05 sibling stays canon-only per the executed R17 verdict) | the missing «Ссылка» block added after the §6.3 tier table (canon position): `<p><strong>Ссылка:</strong> Визуальная версия staircase — VS-EMBED E11 в начале Part 6.</p>` — the canon ref-notation rendered reader-facing (the P5-3 notation-render precedent: `[ref: …]` → anchor/label text; DEC-16 fence #12 for the new master prose: «в preamble» → «в начале»); no anchor — the E11 embed carries no id (plain-text reference, no dead links) | MOVED **— executed iter 152** | the P4-4(b)/`p4_ghost_layers::05` Reference-branch mirror family (F5 Reference branch duty; DEC-16 «Ссылка» label law); the «Ссылка:» bold-label convention verified in master part_01/part_03/part_05 |
| P6-4 | — (observed) | master-only enrichments + variances, never canonized/resolved: (a) the §6.1 closing sentence «В этой части — от базового CoT до продвинутых техник интеграции с якорями.» (pickaxe-verified: never in canon); (b) the §6.1 difficulty-comment divergence (canon `INTERMEDIATE` vs master `BASIC` — pre-existing since the iter-71 progressive-disclosure gap closure; comments non-rendering, no runtime consumer — grep-verified); (c) the §6.2::06 bullet wording (canon «призрак (GHOST) связь» vs master «Связь с призраком (GHOST)» — v7-era variance); (d) the E11 canon-declaration gap (canon front-matter `vs_embedded: none` stale; no `[VS: E11]` marker in §6.3; Registry A disposition still PROPOSED — the E09 family, map §5.12 P5-5(a)); (e) the ::05 canon-only note's English residue («cols», «accessibility» — pre-DEC-16 form, non-rendering); (f) the canon EN `**ILLUSTRATION** — Demonstrates:` labels (§6.4::03 + §6.5::04 + the part_07b sibling) vs master RU chips + comment lists — presentation variance (matrix-noted) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (both directions change reader-visible knowledge or non-rendering metadata; the E11 gap rides the front-matter/v2-canon-format deferral) | RECORDED **— deferred (iter 152)** | AGENTS.md scope discipline (discovering ≠ permission to fix); Editorial Policy (compress redundant presentation, never unique capability); rides the canonical-audit stage (spec §8.3) or an ed-* batch |
| P6-5 | — (state) | STATUS iter-151 / PLAN row v2-build-part-6 open / no map §5.13 | map §5.13 + STATUS iter-152 (KI#83 row lifecycle-deleted — closed iter-149, 3 iterations elapsed; Next step re-pinned to the Part 7A slice) + PLAN v2-build-part-7a + worklog + CHANGELOG + NAV §7 de-stale (Parts 1–6) | EXECUTED **— iter 152** | iter-147…151 state-package pattern |

Accounting: 1 presentation-column seeding (25 rows, all `open`) + 1 verified-unchanged canon (P6-2 —
**zero canon content edits**; `part_06.md` byte-unchanged) + 1 «Ссылка» mirror (P6-3) + 1
observation package deferred (P6-4) + 1 state package (P6-5). Byte-unchanged: master §6.1/§6.2/
§6.4/§6.5/§6.6 entirely + §6.3 outside the added block (the E11 embed, the tier table — untouched);
matrix tag/decision/load/repeat columns unchanged. Deferred (recorded, out of scope): the P6-4
master-only enrichments + variances (canonical-audit stage / ed-* batch); canon front-matter
staleness (rides the v2 canon format); KI#79 drift-tool regex (tooling); the §6.2::06 wording
variance (formatting churn, not F-policy). Root fallback `parts/part_06.html` regenerated with the
slice (+ root `index.html` timestamp). Drift actionable **155 → 155** (unchanged — the canon
«Ссылка» paragraph left the informational vs_embed_ref paragraph-drift list (14→13) by gaining its
master mirror; the actionable categories (no_master_match 28 + plain_text 127) unchanged — verified
by the JSON pre/post diff).
Next Part: **Part 7A** (guide order; its own slice reuses this shape — the largest so far: 13
sections, 94 matrix rows; `src/master/part_07a.html` is a grep-first huge file per AGENTS.md).

### 5.14 Part 7A v2 build slice (seeded + executed iter 153 — v2 build phase, seventh Part)

Scope: **Part 7A — System Prompt & Assembly** (13 sections, 94 block rows — the largest slice so far;
DEC-24 Q6 guide order — Part 7A seventh; the per-Part track pinned by STATUS Next-step row 1, **not
owner-gated** — the ratification gate cleared by DEC-24). Mechanism: the ratified spec §7 per-Part
slice shape (evidence → canon restructure → master mirror → full battery) — seventh application,
reusing the §5.8–§5.13 pattern; the full Part executed in one slice (the sub-slicing option recorded
in STATUS/PLAN was not needed — the slice's canon/master surface proved bounded: one fold + one
mirror). Primary reader mode: **Build** (spec §3: the Build-mode entry = §7A.13 assembly pipeline +
§7A.12 budgets; the Part also carries the Learn-mode core teaching for SP elements §7A.1–§7A.5 —
honest F2 application kept both flows `open`; only the two technical-reference blocks stay behind
the existing F6 wraps). Editorial Policy 5-point check applied per edit (documented per row below).
Acceptance gate: the full battery (sync 97/97 + parity ×7 + build + validate + tests + qa baselines)
— **no new cluster parity gate**: Part 7A *hosts* three of the seven cluster owners (§7A.2 CORE
DIRECTIVES mig-2, §7A.6 sampling DEC-22, §7A.12 token budget mig-4) — the STATUS-declared
byte-stability locks honored (their canonical records + the E08/E17 presentation chains untouched;
the three existing audits PASS — the iter-149 §3.2 / iter-151 §5.4 precedents). The E02/E16 embeds
(non-cluster, Registry A dispositions PROPOSED) untouched — they ride their own audit time.

**F2 presentation map (spec §4.1 mechanism, seventh application):** the Part 7A matrix tables now
carry the `presentation` column (94 rows; matrix §1.2 scope note extended to Parts 1–7A + the `—`
historical-row rule documented). Disposition: **86 × `open`** (canonical definitions, RULE/REC
callouts, templates, canonical tables, the §7A.13 walkthrough steps — Build+Learn required reading;
the §7A.13::10 optional extensions considered for `collapsible` and rejected: the text list is the
accessible-text counterpart of the E02 embed's optional-branch section, each bullet short) **+ 4 ×
`canonical-link`** (three already-deployed forms re-verified: §7A.1::06 — the iter-125 dupes-1 fold;
§7A.9::01 — the R01 compliant short+refs intro; §7A.13::05 — the iter-134 R02/mig-2 shorthand; plus
§7A.11::05 — the R01 #8 fold executed this slice, P7A-2) **+ 2 × `collapsible`** (both pre-existing
deployed F6 usages documented as the v2 presentation: §7A.6::06 the model-specific recommendations
table — technical reference per `components.md` #5 — and §7A.13::11 the recap checklist — F3
validation class) **+ 2 × `—`** (blocks disposed pre-slice by executed decisions, historical audit
rows: `p7a_system_prompt::05` — the KI#71 duplicate line, disposed ed-6 iter 121; and
`p7a_token_budget::11` — the stale migration note, stripped ed-6 iter 121). F3: §7A.7 = decision-input
class (the iter-145 capability table; zero checkbox affordances — correct, reserved for §9.3/§9.11);
the §7A.13 checklist = validation class (the existing `<details>`); zero teaching checklists needing
affordance work. F4: worked tier = the §7A.5 AN examples + §7A.9 Выщербленный + the §7A.8 comparison +
the §7A.13 step results (Elena blocks); inline tier = the §7A.3 settings table + the §7A.4 markup
systems table (woven, no chips invented). F5: verified per section — every §7A.NN already carries
Concept → Rule → Core example → Reference branches (`[ref:]` + `[VS: E##]` markers); zero
restructure forced (honest application: the Part is F5-approximate as-is). F6: **zero new
`<details class="interactive">`** (the two existing usages documented; no new qualifying block).

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P7A-1 | — (evidence) | matrix Part 7A tables: 8 columns, no presentation axis | `presentation` column seeded (94 rows: 86 `open` + 4 `canonical-link` + 2 `collapsible` + 2 `—`); matrix §1.2 scope note extended to Parts 1–7A + the `—` historical-row rule; the Part 7A verdict appended with the iter-153 slice note; **seven stale notes refreshed** — `p7a_system_prompt::05` (KI#71 disposed iter 121, ed-6 — the note described the pre-fix duplicate), `::06` (the iter-125 dupes-1 execution — the note described the pre-fold full copy), `::07` (the stale `[ANCHORS]`-drift claim stripped iter 121 — the note described the pre-strip state; the surviving canonical-format note dispositioned `open`), `p7a_core_directives::04` (the «(D4, iter 93)» repo-meta stripped iter 121), `p7a_authors_note::07` (the R18 ref normalization executed iter 128 — parens balanced at HEAD), `p7a_token_budget::11` (the migration note stripped iter 121 — the note described the pre-strip state) + the ::03/::05 byte-stability re-verification notes | EXECUTED **— iter 153** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…152 stale-note-refresh precedent |
| P7A-2 | `p7a_4k_fallback::05` | canon §7A.11 L565 full RULE: «Якоря в 4K-fallback размещаются в Description (как `<anchors>`-тег или список), поскольку фронтенд не имеет отдельного поля. **Концептуально якоря — отдельный блок в Examples-зоне (см. правило §1.4 и правило §7A.1).** При 8K+ и API…» — the R01 family 4th occurrence (the conceptual sentence = the §1.4 canonical rule restated; matrix decision CROSS-REFERENCE «fold to pointer») | the R01 #8 fold executed (the Part-4 R21-#16 iter-150 precedent): the conceptual sentence → inline pointer «— концепция и полное правило размещения: `[ref: part_01.md §1.4 — правило]`»; the 4K substance kept verbatim (list form allowed in fallback; the 8K+ `<anchors>`-tag tail). 5-point check: capability — the concept lives at §1.4 (canonical) + the §7A.9/§7A.13 compliant short forms (verified by grep, nothing lost); coverage — every 4K nuance kept in place; retrieval — the local placement rule survives compressed; context — sits right after the minimal-Description code block showing the list form; dependency — no sync probe touches the paragraph (verified), no cross-ref targets it (grep: only section-level §7A.11 refs) | MOVED **— executed iter 153** | Editorial Policy (compress redundant presentation, never unique capability); fence #11 (one canonical definition — everywhere else 1-sentence + link); the matrix R01 verdict (dupes-2 candidate #8, picked up by its Part slice per the R21-#16 precedent) |
| P7A-3 | `p7a_4k_fallback::05` (master layer) | master §7A.11 callout — the same full RULE paragraph (verbatim mirror incl. the conceptual sentence) | the fold mirror: the conceptual sentence → `<a href="#p1_core_rules">§1.4 правило</a>` (the master §7A.1::06 anchor convention; `[ref: …]` → link render per the P5-3 notation-render precedent); the 4K substance byte-stable | MOVED **— executed iter 153** | fence #10 (canon = source of truth, master mirrors); the master §7A.1::06 mirror form |
| P7A-4 | — (observed) | master-only enrichments + variances, never canonized/resolved: (a) the §7A.13 master-only intro sentences («Ниже — единственный…» prefix + «Токен-бюджет по блокам — в бюджете токенов (выше). Полная карточка Елены без аннотаций — в Part 10.» — pickaxe-verified never in canon); (b) the §7A.7 presentation+value variances: master renders the capability table as a by-model-tier `<ul>` (canon = the `Возможность` table) with CoT-tier drift (master «Tier 0–1 / Tier 1–2» vs canon «✗ / Tier 1 / Tier 2–3») + the E17 embed's checklist section (CoT «0–1 / 1–2 / 3»; Anti-godmoding API «2 строки» vs canon «1 строка») — pre-existing family variance, not gated by `audit_sampling_parity.py` (which locks the params tables); (c) the §7A.13 recap-checklist summary label variance (canon «Сводный чек-лист» vs master «Recap-чек-лист» — the P6-4(f) EN-label family); (d) the §7A.5 «Пояснение секций» render variance (canon table vs master `<ul>` — content equivalent); (e) the E02/E16 canon-declaration gaps (front-matter `vs_embedded` lists E08/E16/E17/E02 — E02/E16 Registry A dispositions still PROPOSED; the `[VS: …]` markers carry the full `_README.md` §3.3 format for E16/E17/E02, E08 the short form) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (both directions change reader-visible knowledge or non-rendering metadata; the §7A.7 value variances need the reconciliation owner call — they pre-date the slice and touch no gate) | RECORDED **— deferred (iter 153)** | AGENTS.md scope discipline (discovering ≠ permission to fix); Editorial Policy (compress redundant presentation, never unique capability); rides the canonical-audit stage (spec §8.3) or an ed-* batch |
| P7A-5 | — (state) | STATUS iter-152 / PLAN row v2-build-part-7a open / no map §5.14 | map §5.14 + STATUS iter-153 (Next step re-pinned to the Part 7B slice; the v2-architecture invariant extended to Parts 1–7A / maps §5.8–§5.14) + PLAN v2-build-part-7b + worklog + CHANGELOG + NAV §7 de-stale (Parts 1–7A) | EXECUTED **— iter 153** | iter-147…152 state-package pattern |

Accounting: 1 presentation-column seeding (94 rows) + 1 canon content edit (P7A-2 — the R01 #8 fold;
`part_07a.md` 1 line changed, everything else byte-stable — the §7A.2/§7A.6/§7A.12 cluster-owner
records verified untouched by the diff) + 1 master mirror (P7A-3; `part_07a.html` 1 line changed) + 1
observation package deferred (P7A-4) + 1 state package (P7A-5). Byte-unchanged: §7A.1–§7A.10, §7A.12,
§7A.13 canon entirely (outside the §7A.11 fold) + the E08/E16/E17/E02 embeds + the master §7A.7
`<ul>`/E17 checklist (recorded P7A-4, not touched); matrix tag/decision/load/repeat columns unchanged.
Deferred (recorded, out of scope): the P7A-4 master-only enrichments + §7A.7 family variances
(canonical-audit stage / owner call); the R01 family is now COMPLETE on the canon side (§7A.11 was
the last full-form non-owner occurrence); the appendix_glossary R01/R02 reference-layer folds ride
the appendix/Reference slice (KI#70 WIRE). Root fallback `parts/part_07a.html` regenerated with the
slice (+ root `index.html` timestamp). Drift actionable **155 → 155** (expected unchanged — the folded
paragraph keeps its canon↔master match; verified by the JSON pre/post diff).
Next Part: **Part 7B** (guide order; its own slice reuses this shape; the appendix/Reference slice
after Part 10 carries the KI#70 WIRE implementation per DEC-24 Q7).

### 5.15 Part 7B v2 build slice (seeded + executed iter 154 — v2 build phase, eighth Part)

Scope: **Part 7B — Greeting & Lorebook** (5 sections, 33 block rows; DEC-24 Q6 guide order — Part 7B
eighth; the per-Part track pinned by STATUS Next-step row 1, **not owner-gated** — the ratification
gate cleared by DEC-24). Mechanism: the ratified spec §7 per-Part slice shape (evidence → canon
restructure → master mirror → full battery) — eighth application, reusing the §5.8–§5.14 pattern.
Primary reader mode: **Learn** (the teaching Part for Greeting / Lorebook / Structured Inject —
full-narrative default visibility; the EXPERT §7B.4/§7B.5 depth stays behind the eight already-
deployed F6 wraps). Editorial Policy 5-point check applied per edit (documented per row below).
Acceptance gate: the full battery (sync 97/97 + parity ×7 + build + validate + tests + qa baselines)
— **no new cluster parity gate**: Part 7B hosts no cluster owner (verified: the seven cluster owners
— §7A.2 / §7A.6 / §7A.12 / §5.4 / §9.6 / §3.2 / glossary registry — sit outside Part 7B). The E18
embed (the Part's one VS-EMBED; Registry A disposition still PROPOSED) stays untouched — the
E09/E05/E06/E11/E02/E16 precedent (non-cluster embeds ride their own audit time; the canon-
declaration gap recorded P7B-4(b)).

**F2 presentation map (spec §4.1 mechanism, eighth application):** the Part 7B matrix tables now
carry the `presentation` column (33 rows; matrix §1.2 scope note extended to Parts 1–7B).
Disposition: **25 × `open`** (canonical definitions, RULE/REC callouts, the canonical structure/
params/mechanics/budgets tables, the teaching rule-lists — Learn-mode required reading; the
«Ссылка» navigation rows stay `open` per the Part 1–6 precedent) **+ 8 × `collapsible`** (all eight
pre-existing deployed F6 usages documented as the v2 presentation: §7B.2::04 the Elena Greeting
worked example; §7B.3::06–::10 the four Lorebook entry examples + the EVENT frontend-compatibility
table (technical reference behind disclosure — the §7A.6::06 precedent); §7B.4::06 the content-
injection example; §7B.5::06 the integration checklist — F3 validation class with checkbox
affordances) **+ 0 `canonical-link` + 0 `—`** (zero full-form cluster-owner restatements — the
R07-family §7B.4::03 is the compliant application form, not the template line; zero disposed
blocks — the matrix verdict «clean; zero compression candidates» held). F3: §7B.5::06 = the one
validation-class checklist (checkboxes correct — the reserved class); §7B.1::02 / §7B.2::05 /
§7B.3::05 = teaching rule-lists, zero checkbox affordances; zero decision-input checklists (the
Build entry instrument = §1.8, executed iter 147). F4: worked tier = §7B.1::03 + §7B.2::04 +
§7B.3::06–::09 + §7B.4::06 (all chipped ИЛЛЮСТРАЦИЯ in master); inline tier = the «Пример» column
inside the §7B.3::02 structure table (woven, no chip invented). F5: verified per section —
Concept → Rule → Core example → Reference holds for §7B.2 (the R28 Примечание → §10.1), §7B.3
(::04 + ::11 → §7B.4), §7B.4 (::02 → §7B.3, ::07 → §7B.5, ::08 GHOST), §7B.5 (::03 → §4.2);
§7B.1 is F5-approximate without a Reference branch — honest state recorded, not forced (the
self-contained 3-block section; a new link = an invented requirement). F6: **zero new
`<details class="interactive">`** (the eight existing usages documented; no new qualifying block).

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P7B-1 | — (evidence) | matrix Part 7B tables: 8 columns, no presentation axis | `presentation` column seeded (33 rows: 25 `open` + 8 `collapsible`); matrix §1.2 scope note extended to Parts 1–7B; the Part 7B verdict appended with the iter-154 slice note; **one stale note refreshed** — `p7b_lorebook_advanced::06` (the «призрак Anchors» word-order slip was FIXED iter 129 — ed-7 R29 normalization: «якоря призрака (GHOST-якоря)» canon + master mirror; the note described the pre-fix state) + the ::02 E18 VS-shadow note + the ::03 §4.2-target re-verification note added | EXECUTED **— iter 154** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…153 stale-note-refresh precedent |
| P7B-2 | — (canon) | canon `part_07b.md` (276 lines) — preflight full read: F5-approximate per section; the matrix verdict «clean; zero compression candidates»; zero unexecuted COMPRESS/DELETE rows | **unchanged — verified byte-stable** (zero canon content edits: `part_07b.md` byte-unchanged through the slice; the Greeting algorithm table = the E18 SHARED_REFERENCE source; front-matter staleness `vs_embedded: none` deferred, repo-wide — recorded P7B-4(b)) | VERIFIED **— unchanged (iter 154)** | fence #10 (canon = source of truth); Editorial Policy (no edit without functional load); the iter-148/149/151/152 zero-canon-edit precedents |
| P7B-3 | `p7b_lorebook_basics::04` + `::11` + `p7b_lorebook_mechanics::07` (master layer) | three master render gaps vs canon: (a) the §7B.3 РЕКОМЕНДАЦИЯ callout linked `#p7b_lorebook_advanced` while canon carries `[ref: §7B.4 — Lorebook механики]` (v9-era divergence — pickaxe: master `7957a9be` Phases 2–3 vs canon `49a17ab8` iter 16; the GHOST-activation statement lives §7B.4::08, not §7B.5); (b) the §7B.3::11 «Ссылка» line rendered without the `<strong>Ссылка:</strong>` label; (c) the §7B.4::07 «Ссылка» line rendered as plain text «Продвинутые механики Lorebook (ниже)» — no label, no anchor | three mirror completions: (a) the link re-pointed to `<a href="#p7b_lorebook_mechanics">механиках Lorebook</a>` (fence #10 — canon wins; «продвинутых» dropped with the wrong target); (b) the «Ссылка:» label + trailing period added (the iter-150 §4.7::05 label family); (c) the «Ссылка:» label + the `<a href="#p7b_lorebook_advanced">Продвинутые механики Lorebook</a>` anchor (the P6-3 missing-link family; «(ниже)» plain-text pointer → the link). 5-point check (a): capability — the callout now sends the reader to the §7B.4 РЕКОМЕНДАЦИЯ that actually states GHOST-activation (nothing moved, the canon ref was already the authority); coverage — §7B.5 stays reachable via the ::07 link; retrieval — the stated content and the target now coincide; context — the sentence substance unchanged; dependency — no sync probe targets the line (the 3 part_07b probes verified: P1-11 / P3-1-7b / P2-7-del-07b), no other section refs this callout (grep-verified) | MOVED **— executed iter 154** | fence #10 (canon = source of truth, master mirrors); DEC-16 «Ссылка» label law; the P5-3/P6-3/P7A-3 mirror-completion precedents |
| P7B-4 | — (observed) | master-only enrichments + variances, never canonized/resolved: (a) the §7B.2 master-only intro enrichment («Алгоритм из 4 шагов … показан выше (VS-EMBED E18); разобранный пример на Елене — ниже.» — pickaxe-verified never in canon); (b) the E18 canon-declaration gap (canon front-matter `vs_embedded: none` stale; no `[VS: E18]` marker in §7B.2; Registry A disposition still PROPOSED — the E11/E02/E16 family); (c) the §7B.5 master-only closing transition → Part 8 (canon ends at the checklist); (d) the EN-label presentation variance (canon «**ИЛЛЮСТРАЦИЯ:**» / «ILLUSTRATION — Demonstrates:» labels vs master RU chips + HTML-comment lists — the P6-4(f) family; its part_07b sibling was noted there); (e) trivial punctuation variances (::02 bullet periods, the §7B.5 intro periods, «50-100» vs «50–100» — formatting churn, not F-policy); (f) the §7B.5::03 `[ref: §4.2 — GHOST]` target nuance (§4.8/§4.11 anchor-coverage R18-minor — current observation, not stale) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (both directions change reader-visible knowledge or non-rendering metadata) | RECORDED **— deferred (iter 154)** | AGENTS.md scope discipline (discovering ≠ permission to fix); Editorial Policy (compress redundant presentation, never unique capability); rides the canonical-audit stage (spec §8.3) or an ed-* batch |
| P7B-5 | — (state) | STATUS iter-153 / PLAN row v2-build-part-7b open / no map §5.15 | map §5.15 + STATUS iter-154 (Next step re-pinned to the Part 8 slice; the v2-architecture invariant extended to Parts 1–7B / maps §5.8–§5.15) + PLAN v2-build-part-8 + worklog + CHANGELOG + NAV §7 de-stale (Parts 1–7B) | EXECUTED **— iter 154** | iter-147…153 state-package pattern |

Accounting: 1 presentation-column seeding (33 rows: 25 `open` + 8 `collapsible`) + 1 verified-unchanged
canon (P7B-2 — **zero canon content edits**; `part_07b.md` byte-unchanged) + 3 master mirror
completions (P7B-3; `part_07b.html` 3 lines changed) + 1 observation package deferred (P7B-4) + 1
state package (P7B-5). Byte-unchanged: canon `part_07b.md` entirely + master outside the 3 mirrored
lines (the E18 embed, all eight `<details>` wraps, the tables — untouched); matrix
tag/decision/load/repeat columns unchanged. Deferred (recorded, out of scope): the P7B-4 master-only
enrichments + variances (canonical-audit stage / ed-* batch); the E18 canon-declaration gap (rides
the front-matter/v2-canon-format deferral); KI#79 drift-tool regex (tooling). Root fallback
`parts/part_07b.html` regenerated with the slice (+ root `index.html` timestamp). Drift actionable
**155 → 154** (one canon-side match gained: the §7B.4::07 «Ссылка» paragraph left the plain_text
list (127→126) by gaining its full master mirror — the label + the anchor; verified by the JSON
pre/post diff). Next Part: **Part 8 (Anti-patterns)** (guide order; 16 sections — the second-largest
Part; its own slice reuses this shape; the appendix/Reference slice after Part 10 carries the KI#70
WIRE implementation per DEC-24 Q7).

### 5.16 Part 8 v2 build slice (seeded + executed iter 155 — v2 build phase, ninth Part)

Scope: **Part 8 — Anti-patterns** (16 sections, 40 block rows — the second-largest Part by section
count; DEC-24 Q6 guide order — Part 8 ninth; the per-Part track pinned by STATUS Next-step row 1,
**not owner-gated** — the ratification gate cleared by DEC-24). Mechanism: the ratified spec §7
per-Part slice shape (evidence → canon restructure → master mirror → full battery) — ninth
application, reusing the §5.8–§5.15 pattern. Primary reader mode: **Debug** (the AP-catalog Part —
the spec §3 Debug row: E12 = the quick-scan entry, the per-AP subsections = the detail layer the
reader navigates to deliberately; the two-layer design = the iter-31 keep-by-design rationale,
canon front-matter). Editorial Policy 5-point check applied per edit (documented per row below).
Acceptance gate: the full battery (sync 97/97 + parity ×7 + build + validate + tests + qa baselines)
— **no new cluster parity gate**: Part 8 hosts no cluster owner (verified: the seven cluster owners
— §7A.2 / §7A.6 / §7A.12 / §5.4 / §9.6 / §3.2 / glossary registry — sit outside Part 8). The E12
embed (the Part's one VS-EMBED; `vs_embedded: E12` front-matter correct; Registry A disposition
disposed iter 145 with the DEC-19 freeze) carries the AP-5 model-qualified defer (DEC-22 S-d, SP-4)
— the slice documents, does not re-decide.

**F2 presentation map (spec §4.1 mechanism, ninth application):** the Part 8 matrix tables now
carry the `presentation` column (40 rows; matrix §1.2 scope note extended to Parts 1–8).
Disposition: **40 × `open`** (the Debug-mode catalog Part: the per-AP cards + the before/after
demos = the recognition core; zero blocks meet the registered Collapsible criteria
(`docs/components.md` #5 — every demo is short with a distinct recognition function; the «Ссылка»
navigation rows stay `open` per the Part 1–7B precedent)) **+ 0 `collapsible` + 0 `canonical-link`
+ 0 `—`** (the AP cards = catalog-application forms, not full-form cluster-owner restatements —
the deliberate two-layer design; zero disposed rows — the matrix verdict «deliberate two-layer
design, zero compression candidates» held). F3: zero checklists in the Part (the §8.1::03 ПРАВИЛО
points to the E12 catalog — a catalog pointer, not a checkbox instrument; zero checkbox
affordances — nothing to triage). F4: worked tier = the chipped Before/After + ❌/✅ demos; inline
tier = the «Пример:» blocks woven into the AP cards (::01 rows — §8.2, §8.9). F5: verified per
section — the AP-card pattern (Симптом → Причина → Решение → demo → «Ссылка»/inline ref) =
F5-approximate (Concept → Why → Rule → Core example → Reference); §8.1 and §8.16 (the part-level
Синтез) hold. F6: **zero new `<details class="interactive">`** (zero existing usages in
`part_08.html` — verified; no qualifying block).

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P8-1 | — (evidence) | matrix Part 8 tables: 8 columns, no presentation axis; notes carrying pre-iter-127/129/145 defect states (7 vague refs + 6 unbalanced parens + the R17-lite phrase + the KI#72 conditional — all long-repaired) | `presentation` column seeded (40 rows: 40 `open`); matrix §1.2 scope note extended to Parts 1–8; the Part 8 verdict appended with the stale-claims refresh + the iter-155 slice note; **eleven stale row notes refreshed** — overview::05 (the «в v9 restructure» phrase stripped iter 129, R17 [B]), ap1::01 / ap2::01 / ap3::01 / ap4::01 / ap5::01 / ap7::01 / ap10::04 / ap11::01 / ap13::01 / ap15::01 (the vague-ref + unbalanced-paren defects repaired iter 127, ed-8/R18 Phase B — pickaxe `8a365553`; the KI#72 conditional superseded by DEC-22 iter 145) — the notes described pre-fix states | EXECUTED **— iter 155** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…154 stale-note-refresh precedent |
| P8-2 | — (canon) | canon `part_08.md` (341 lines) — preflight full read: the AP-card pattern F5-approximate per section; the matrix verdict «zero compression candidates»; zero unexecuted COMPRESS/DELETE rows; all refs specific post-iter-127; parens balanced | **unchanged — verified byte-stable** (zero canon content edits: `part_08.md` byte-unchanged through the slice — sha256 `8f4a4e02…` pre = post; the Part hosts no cluster owner) | VERIFIED **— unchanged (iter 155)** | fence #10 (canon = source of truth); Editorial Policy (no edit without functional load); the iter-148/149/151/152/154 zero-canon-edit precedents |
| P8-3 | `p8_antipatterns_overview::03` + `::05` + `p8_ap1_token_bloat::01`+`::03` + `p8_ap2_missing_price::01` + `p8_ap3_voice_in_description::01` + `p8_ap4_ghost_in_sp::01` + `p8_ap5_reppen_high::01` + `p8_ap6_no_anti_godmoding::03` + `p8_ap7_presence_penalty::01` + `p8_ap8_ghost_no_anchors::02` + `p8_ap10_cot_overload::04` + `p8_ap12_xml_malformed::01`+`::04` + `p8_ap14_context_violation::01` + `p8_ap15_nested_anchors::01` (master layer) | sixteen master render gaps vs canon (the v9 «Phase 6: Reduced content duplication» slimming dropped canon-declared reader-visible content): the §8.1 ПРАВИЛО tail («выявляемая на этапе валидации»), the §8.1 «Примечание» label vs canon «Ссылка», the §8.2 «Голос → Examples» bullet imperative + the ::03 «Ссылка» row, the §8.3 WHY-clause («Каждый якорь обязан иметь Цену…»), the §8.4 mechanism sentence («Модель считывает характер…»), the §8.5 missing §7A.1 link (the section carried no link at all), the §8.6 suppression clause («Превышение 1.10 подавляет…»), the §8.7 rationale sentence («Позитивная формулировка…»), the §8.8 explanation clause («PP > 0 нарушает согласованность…»), the §8.9::02 «Ссылка» row, the §8.11::04 «Ссылка» row, the §8.13 Format Lock sentence + the ::04 «Ссылка» row, the §8.15 §7A.12 link, the §8.16 «Причина» line | sixteen mirror completions in `src/master/part_08.html` (16 edit sites — 16 insertions + 11 deletions): every dropped clause/sentence/«Ссылка»-row/link restored per canon (fence #10 — canon wins; the canon text rendered with refs as anchors, the part_04/05/06 «Ссылка» mirror forms); the §8.1 label re-pointed «Примечание» → «Ссылка» (the P7B-3(b) label family) **with the sync P1-3 probe substring updated in step** (2 lines in `scripts/audit_canon_master_sync.py` — the expected substring + the probe description note — the probe's documented purpose, the orphan-row deletion + footnote, unchanged; the iter-148 sampling-audit-extension precedent for in-slice probe adjustments); 5-point check per edit: capability — the reader-visible substance canon declares now renders (nothing moved, canon was already the authority); coverage — every restored clause lives at its canon-declared location; retrieval — the «Ссылка» rows now navigate (four new anchors: `#p10_elena`, `#p4_spine_mapping`, `#p6_cot_anchors`, `#p7a_xml_tags` + `#p7a_format_lock` + `#p7a_token_budget`); context — the surrounding Симптом/Причина/Решение lines unchanged; dependency — the five part_08 probes verified untouched by the diff (P0-10 / P1-1 / P1-3 updated-in-step / P2-7-syn-08 / P2-3-del-08), the E12 embed untouched (the sampling parity SP-4 anchors intact), no inbound refs target the edited lines (grep-verified) | MOVED **— executed iter 155** | fence #10 (canon = source of truth, master mirrors); DEC-16 «Ссылка» label law; the P5-3/P6-3/P7A-3/P7B-3 mirror-completion precedents; the iter-148 probe-extension precedent |
| P8-4 | — (observed) | master-only enrichments + variances, never canonized/resolved: (a) four master-only inter-section transitions (L335/L393/L426/L450 — outside `<section>` wrappers, the v9-era «reduced duplication» glide text; the P7B-4(c) family); (b) stray/vacant `example-label illustration` chips with no following worked content (§8.5/§8.7/§8.13/§8.14 — the F4-label placement quirk; §8.4's chip precedes the ПРАВИЛО callout); (c) the §8.7 До/После table rendered as an inline paragraph (table→paragraph variance); (d) EN-terminology variances (canon «дефект»/«призрак» vs master «FLAW»/«GHOST» in §8.5; canon «(Елена, Выщербленный)» gloss dropped in §8.9); (e) the §8.1 definition parenthetical glosses («что наблюдается» etc.) + trailing-period variances — formatting churn, not F-policy; (f) the §8.16 h3 outside the antipattern-card wrapper + the «Симптом» label-less problem-block (structural quirks); (g) the §8.8 «Симптом: Presence Penalty > 0» master paragraph below the drift tool's MIN_PARAGRAPH_LENGTH (29 < 30 chars) → the informational plain_text flag (KI#79-adjacent tool-boundary artifact, pre-existing, exit 0) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (both directions change reader-visible knowledge or non-rendering metadata; the disposals ride the canonical-audit stage per the P4-5/P5-5/P6-4/P7A-4/P7B-4 chain) | RECORDED **— deferred (iter 155)** | AGENTS.md scope discipline (discovering ≠ permission to fix); Editorial Policy (compress redundant presentation, never unique capability); rides the canonical-audit stage (spec §8.3) or an ed-* batch |
| P8-5 | — (state) | STATUS iter-154 / PLAN row v2-build-part-8 open / no map §5.16 | map §5.16 + STATUS iter-155 (Next step re-pinned to the Part 9 slice; the v2-architecture invariant extended to Parts 1–8 / maps §5.8–§5.16) + PLAN v2-build-part-9 + worklog + CHANGELOG + NAV §7 de-stale (Parts 1–8) | EXECUTED **— iter 155** | iter-147…154 state-package pattern |

Accounting: 1 presentation-column seeding (40 rows: 40 `open`) + 1 verified-unchanged canon
(P8-2 — **zero canon content edits**; `part_08.md` byte-unchanged) + 16 master mirror completions
(P8-3; `part_08.html` 16 edit sites — 16 insertions + 11 deletions) + 1 sync-probe substring update (P1-3, disclosed — 2 lines
in `scripts/audit_canon_master_sync.py`: the expected substring + the description note) + 1 observation package deferred (P8-4) + 1 state package
(P8-5). Byte-unchanged: canon `part_08.md` entirely + master outside the 16 mirrored lines (the E12
embed, the ❌/✅ pre blocks, the tables — untouched); matrix tag/decision/load/repeat columns
unchanged. Deferred (recorded, out of scope): the P8-4 master-only enrichments + variances
(canonical-audit stage / ed-* batch); KI#77-e + KI#79 (open, untouched); KI#70 rides the
appendix/Reference slice per DEC-24 Q7. Root fallback `parts/part_08.html` regenerated with the
slice (+ root `index.html` timestamp). Drift actionable **154 → 148** (six canon-side matches
gained: §8.2::03 + §8.6 + §8.7 + §8.8 + §8.9::02 + §8.16 left the actionable lists by gaining
their full master mirrors — verified by the JSON pre/post diff; zero new rows). Next Part:
**Part 9 (Diagnostics)** (guide order; 11 sections; its own slice reuses this shape — the Debug
reader-path backbone Part; the appendix/Reference slice after Part 10 carries the KI#70 WIRE
implementation per DEC-24 Q7).

### 5.17 Part 9 v2 build slice (seeded + executed iter 156 — v2 build phase, tenth Part)

Scope: **Part 9 — Diagnostics** (11 sections, 43 block rows; DEC-24 Q6 guide order — Part 9 tenth;
the per-Part track pinned by STATUS Next-step row 1, **not owner-gated** — the ratification gate
cleared by DEC-24). Mechanism: the ratified spec §7 per-Part slice shape (evidence → canon
restructure → master mirror → full battery) — tenth application, reusing the §5.8–§5.16 pattern.
Primary reader mode: **Debug** (§9.5 symptom table / §9.6 decision tree (E13) / §9.3 block
checklist = the wired Debug chain, mig-3 iter 139 — the spec §3 Debug row's backbone Part).
Editorial Policy 5-point check applied per edit (documented per row below). Acceptance gate: the
full battery (sync 97/97 + parity ×7 + build + validate + tests + qa baselines) — **no new cluster
parity gate**: Part 9 *hosts* the diagnostics cluster owner §9.6 (mig-3/DEC-20) — the slice's
special duty was the **byte-stability lock** (the §9.6 record untouched; sha-verified pre/post;
`audit_diagnostics_parity.py` PASS) rather than a new gate. The E12/§9.x sampling hints (DEC-22
SP-5/SP-6/SP-7) and the §9.11 OBSERVATION family (TB-8 «Description ≤ 800» — R11/ed-5) are
deployed — the slice documents, does not re-decide.

**F2 presentation map (spec §4.1 mechanism, tenth application):** the Part 9 matrix tables now
carry the `presentation` column (43 rows; matrix §1.2 scope note extended to Parts 1–9).
Disposition: **38 `open` + 3 `collapsible` + 1 `canonical-link` + 1 `—`**. The 38 `open` = the
Debug-mode decision aids (the §9.5 lookup / §9.6 tree / §9.3 block checklist / §9.8 element map /
§9.9 metrics — the recognition-and-decision core; the R14 router paras + the ::02 merge
COMPRESS rows stay `open` — the aggregate navigation-debt decision is owner-gated ed-policy, the
Part 1–8 precedent). The 3 `collapsible` = §9.11::05 (the pre-existing `<details>` around the
14-item «рекомендуется»-tier full check — documented, the Part 7B precedent) + §9.11::06/::07 (the
Выщербленный worked example — the long-worked-scenario family the Part 1 slice flagged as
«collapsible candidates at Parts 9/10»; >200 words, supplementary demo of the recommended-tier
check on the EXPERT card — honest qualification, not forced). The 1 `canonical-link` =
`p9_additional_problems::02` — **the §9.4↔§9.5 fold EXECUTED** (P9-2; the standing candidate the
STATUS Next-step note pinned to this slice). The 1 `—` = `p9_pre_deploy::03` (disposed iter 125,
dupes-1 — the historical-row rule). F3: §9.3 + §9.11 = the validation class (the pre-existing ☐
affordances — the F3 reserved class, compliant); zero teaching/decision-input checklists in the
Part. F4: worked tier = the §9.11 Elena + Выщербленный examples (chipped ИЛЛЮСТРАЦИЯ — deployed);
inline tier = the §9.7 scenario table + the woven AP/demo fragments. F5: verified per section
(Сценарий → table/RULE → «Ссылка» — F5-approximate; the §9.4 fold tightened the Part's weakest
Reference branch). F6: **two new `<details class="interactive">`** (the ::06/::07 wrap — one
block; 16 → 17 master usages) + the pre-existing ::05 documented.

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P9-1 | — (evidence) | matrix Part 9 tables: 8 columns, no presentation axis; notes carrying pre-execution defect states (the R18 vague-ref claim — repaired iter 128; the §9.11 `<details>` dupe — deleted iter 125; the §9.4 fold — open) | `presentation` column seeded (43 rows: 38 `open` + 3 `collapsible` + 1 `canonical-link` + 1 `—`); matrix §1.2 scope note extended to Parts 1–9; the Part 9 verdict appended with the iter-156 slice note (the §9.11-duplicate exception marked executed iter 125; the §9.4 fold marked executed; R14 = the one open exception); **three stale row notes refreshed** — `p9_symptom_table::03` (the R18 `§3.X` placeholder refs normalized iter 128, ed-8/r18-phase-a `bb4ed292` — pickaxe-verified; the note described the pre-repair state), `p9_pre_deploy::03` (the dupes-1 execution + the L271 re-point repair — both in place at HEAD; the note described the pre-execution state), `p9_additional_problems::02` (the fold executed — see P9-2) + four slice notes appended (the ::03/::05/::06/::07 dispositions) | EXECUTED **— iter 156** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…155 stale-note-refresh precedent |
| P9-2 | `p9_additional_problems::02` (canon) + `p9_symptom_table::03` rows #4/#5 (canon) | §9.4 carried the #4/#5 symptom→fix table («Повторы фраз» → RepPen range + PP=0.0; «Персонаж теряет характер» → 2–3 Examples) — matrix DUPLICATE/MOVE since iter 126, the standing fold candidate the STATUS Next-step note pinned to this slice (the P4-2 precedent: fold candidates ride the v2 build slices); §9.5's two carrying rows unlabeled | **the §9.4↔§9.5 fold EXECUTED** (canon `part_09.md`): the §9.4 table folded into §9.5 — the carrying rows relabeled «**#4:** Повторяющиеся фразы» / «**#5:** Модель игнорирует характер» (the #4/#5 numbering kept as row labels — the Part 1 Top-3→#4/#5 continuity); §9.4 keeps the canonical-link form (intro sentence 2 re-pointed: «Проблемы #4 («Повторы фраз») и #5 («Персонаж теряет характер») — строки #4/#5 в таблице симптомов» + the «Ссылка» re-pointed, «также» dropped); **the sampling-audit check 7 re-pointed in step** (`scripts/audit_sampling_parity.py` — the §9.4 S-d re-frame substring guards became the fold-form guards + new §9.5 row-label guards, canon + master; the DEC-22 invariant preserved: every «1.0–1.05» line still requires a 12B qualifier — §9.4 now carries none; the iter-148/155 in-step probe-adjustment precedent, disclosed). 5-point check: capability — the #4/#5 symptom→fix lookup + the numbering continuity preserved (§9.5 rows #4/#5 + the §9.4 pointer; the fix text dispersed to its canonical owners: #4 → AP-5/§7A.6 + PP=0 at §9.3/§9.6/AP-7; #5 → §9.6 tree («Добавить 2–3 Examples») + §3.1/§3.3); coverage — every fix instruction reachable within one hop from the symptom row; retrieval — the `#p9_additional_problems` anchor + TOC entry keep the pointer (part_01 L362 inbound link verified live); context — §9.5's checks/refs byte-unchanged (labels only), §9.4 still opens on the Top-3 sentence; dependency — no sync probe pins §9.4/§9.5 (the part_09 probe list verified: P0-11/P0-12/P2-17a–g/P3-4c/P2-3-keep-09); the diagnostics-parity no-competing-sources check unaffected (the E13 3 symptoms ≠ these rows); the §9.6 record byte-stable (sha `2b33049e5fdf` pre = post) | MOVED **— executed iter 156** | matrix `p9_additional_problems::02` (MOVE/DUPLICATE — the ed-matrix's deliberate classification); DEC-24 Q2 (canonical-link); the P4-2 R21-fold precedent; DEC-15 Editorial Policy (compress redundant presentation, never unique capability) |
| P9-3 | `p9_quality_scale::05` + `p9_basic_checklist::04` + `p9_additional_problems::03` + `p9_test_scenarios::04` + `p9_12b_issues::04` (master layer) | five canon «Ссылка» rows with no master mirror (the v9-era slimming gaps; drift actionable entries): §9.1::05 (the pre-deploy validation pointer), §9.3::04 (the расширенная-версия pointer), §9.4::03 (folded form — P9-2), §9.7::04 (12B set + metrics + the Walter testing example — master carried only a mangled v9-era fragment «Расширенный 12B-специфика → текущая часть»), §9.10::04 (4K-Fallback + CoT Tiers) | five mirror completions in `src/master/part_09.html` (the canon text rendered with refs as anchors — the part_04…08 «Ссылка» mirror forms; the §9.7 mangled fragment replaced by the canon row verbatim); new anchors navigating: `#p9_pre_deploy` ×2, `#p1_top3_problems` ×2, `#p9_symptom_table` ×2, `#p9_12b_issues`, `#p9_test_requirements`, `#p10_walter`, `#p7a_4k_fallback`, `#p6_cot_tiers`; 5-point check per mirror: capability — the canon-declared navigation now renders (nothing moved, canon was already the authority); coverage — every restored row lives at its canon-declared location; retrieval — ten new live anchors; context — the surrounding blocks byte-unchanged; dependency — no probe pins these lines (grep-verified); the drift effect: 148 → 143 (five canon-side matches gained — verified by the JSON pre/post diff) | MOVED **— executed iter 156** | fence #10 (canon = source of truth, master mirrors); DEC-16 «Ссылка» label law; the P5-3/P6-3/P7A-3/P7B-3/P8-3 mirror-completion precedents |
| P9-4 | `p9_pre_deploy::06` + `::07` (master layer) | the Выщербленный worked example rendered fully open (h4 «Пример: Pre-Deploy для Выщебленного (полная карточка)» + ИЛЛЮСТРАЦИЯ chip + the structural-check h5/em/table + the full-check h5/table — ~300 words of EXPERT-card demo tables in a BASIC section); the h4 carried the typo «Выщебленного» vs canon «Выщербленного» | F6-wrapped (master layer): one `<details class="interactive">` with summary «📝 Пример: Pre-Deploy для Выщербленного (полная карточка)» (the typo repaired — fence #10); the chip + h5s + tables inside; the «Итог» line + the bridge stay open (the section synthesis); the canon blocks unchanged (the F2 disposition records the presentation — the Part 7B precedent); 5-point check: capability — the worked example fully preserved on demand (disclosure, not deletion; the registered Collapsible criteria honestly met: >200 words, supplementary, optional advanced); coverage — nothing removed; retrieval — the mandatory quick check + the Elena demo + the 14-item list stay open above (the Debug-mode default visibility); context — the section closes on «Итог» + the bridge unchanged; dependency — the P0-12 probe substring (the structural-check h5) preserved inside the details (grep-verified), the drift tool un-affected (summaries untracked) | MOVED **— executed iter 156** | DEC-24 Q4 (F5/F6); `docs/components.md` #5 Collapsible criteria; the Part 1 slice's standing note («long worked scenarios = collapsible candidates at Parts 9/10»); fence #10 (the typo repair) |
| P9-5 | — (observed) | master-only enrichments + variances, never canonized/resolved: (a) **KI#84** (see P9-6); (b) the canon §9.7::04 Walter-line framing «(C=85, A=25, E=30 — выраженные экстремумы)» — E=30 is a cautious-zone boundary per §10.2's own list («Экстремумы: Высокая C (85), Низкая A (25); Cautious zones: E=30, N=60») + §5.1 RULE (extreme = строго <30) — wording-level imprecision, R11-adjacent; (c) the canon §9.11::06 EN blockquote («This is structural check…») vs the master RU em-paraphrase — the DEC-16 canon catch-up pending (the SP-3 family); (d) master §9.3 EN leftovers «☐ Person defined?» / «☐ Narrative tense?» vs canon «Персона определена?» / «Нарративное время?» (DEC-16 master-side); (e) canon `part_10.md` L397 «Выщебленного» typo (cross-Part — rides the Part 10 slice); (f) formatting churn — Greeting «50-100» dash, quote-style variances («speech» vs «speech»), canon §9.5 «CoT-якорь?» vs master «CoT-якоря?»; (g) the 10 comment-noise no_master_match drift entries (KI#79-adjacent tool boundary, pre-existing, exit 0) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (both directions change reader-visible knowledge or non-rendering metadata; the disposals ride the canonical-audit stage per the P4-5…P8-4 chain) | RECORDED **— deferred (iter 156)** | AGENTS.md scope discipline (discovering ≠ permission to fix); Editorial Policy; rides the canonical-audit stage (spec §8.3) or an ed-* batch |
| P9-6 | — (KI) | the master §9.6 P3-4c Walter cross-ref line («Пример тестирования карточки с OCEAN-профилем (A=38, N=68 — осторожная зона, без экстремальных полюсов кроме O=72) — Уолтер Уайт, §10.2») carries **Елена's OCEAN values attributed to Walter** — §10.2's actual profile: O:65 C:85 E:30 A:25 N:60 (экстремумы C=85/A=25); born wrong iter 38 (pickaxe: Walter carried C=85/A=25 at the P3-4 fix commit); never flagged by any prior iteration or matrix row; the slice's §9.7::04 mirror (canon verbatim) makes the latent contradiction reader-visible | **KI#84 OPENED** (STATUS.md) — not fixed in-slice: the line is pinned byte-identical by TWO tool anchors (the sync probe P3-4c + the diagnostics-parity `WALTER_ANCHOR`) + the §9.6 byte-stability lock (the slice's explicit duty) — the fix requires moving both anchors together = an owner call / the canonical-audit stage | RECORDED **— deferred (iter 156)** | AGENTS.md Bug→doc→fix (record first; fix only if in scope); the §9.6 lock (mig-3/DEC-20); scope discipline |
| P9-7 | — (state) | STATUS iter-155 / PLAN row v2-build-part-9 open / no map §5.17 | map §5.17 + STATUS iter-156 (Next step re-pinned to the Part 10 slice; the v2-architecture invariant extended to Parts 1–9 / maps §5.8–§5.17; KI#84 opened; iter-156 KI-note) + PLAN v2-build-part-10 + worklog + CHANGELOG + NAV §7 de-stale (Parts 1–9) | EXECUTED **— iter 156** | iter-147…155 state-package pattern |

Accounting: 1 presentation-column seeding (43 rows: 38 `open` + 3 `collapsible` + 1
`canonical-link` + 1 `—`) + 1 canon fold (P9-2 — the only canon content edit: §9.4's table
removed + §9.5's two row labels; the §9.6 record byte-stable — sha `2b33049e5fdf` pre = post;
every other canon block byte-unchanged) + 1 in-step sampling-audit re-point (P9-2, disclosed —
check 7's §9.4 substring guards → fold-form guards + new §9.5 row-label guards) + 5 master
«Ссылка» mirror completions (P9-3; the §9.7 mangled fragment replaced) + 1 F6 wrap with the typo
repair (P9-4; `<details>` count 16 → 17) + 1 observation package deferred (P9-5) + 1 KI opened
(P9-6) + 1 state package (P9-7). Byte-unchanged: canon `part_09.md` outside §9.4/§9.5 (the §9.6
cluster record + the E13/E14 markers verified); master outside the seven edit sites (the E13/E14
embeds, the §9.6 tree + Walter line, the §9.3/§9.5/§9.6/§9.7/§9.8/§9.9/§9.10/§9.11 tables);
matrix tag/decision/load/repeat columns unchanged. Deferred (recorded, out of scope): the P9-5
observation package (canonical-audit stage / ed-* batch); KI#84 (owner call / canonical audit);
KI#77-e + KI#79 (open, untouched); KI#70 rides the appendix/Reference slice per DEC-24 Q7; the
R14 router aggregate (owner-gated ed-policy). Root fallback `parts/part_09.html` regenerated with
the slice (+ root `index.html` timestamp). Drift actionable **148 → 143** (five canon-side
«Ссылка» matches gained — verified by the JSON pre/post diff; zero new rows). Next Part:
**Part 10 (Examples)** (guide order; its own slice reuses this shape — the Learn-mode worked-
examples Part; the appendix/Reference slice after Part 10 carries the KI#70 WIRE implementation
per DEC-24 Q7).


### 5.18 Part 10 v2 build slice + the owner-called KI#84 reconciliation (seeded + executed iter 157 — v2 build phase, eleventh Part)

Scope: **Part 10 — Examples** (4 sections, 20 block rows; DEC-24 Q6 guide order — Part 10 eleventh;
the per-Part track pinned by STATUS Next-step row 1, **not owner-gated** — the ratification gate
cleared by DEC-24) **+ the owner-called KI#84 canonical-audit reconciliation** (the owner's session
directive 2026-09-16: «продолжай работы по планам! + KI#84: DELETE the §9.6 Walter OCEAN
cross-reference line; keep §9.7 as the sole Part-9 reference to Walter's OCEAN example. Execute the
deletion during canonical-audit reconciliation, updating both affected audit anchors accordingly» —
the KI#84 row's deferred "owner call / canonical-audit stage" precondition answered; executed in the
same iteration per the DEC-24+Part-1 combined-iteration precedent). Mechanism: the ratified spec §7
per-Part slice shape (evidence → canon restructure → master mirror → full battery) — eleventh
application, reusing the §5.8–§5.17 pattern. Primary reader mode: **Learn** (the worked-examples
Part — the F4 worked tier's canonical home per spec §4.3). Editorial Policy 5-point check applied
per edit (documented per row below). Acceptance gate: the full battery (sync 97/97 + parity ×7 +
build + validate + tests + qa baselines) — **no new cluster parity gate**: Part 10 hosts no cluster
owner (verified: the seven cluster owners — §7A.2 / §7A.6 / §7A.12 / §5.4 / §9.6 / §3.2 / glossary
registry — sit outside Part 10); KI#84's two tool anchors were re-pointed in step (P10-5,
disclosed). The R11/KI#77-e budget-framing family stays owner-gated (ed-5) — the slice documents,
does not re-decide.

**F2 presentation map (spec §4.1 mechanism, eleventh application):** the Part 10 matrix tables now
carry the `presentation` column (20 rows; matrix §1.2 scope note extended to Parts 1–10).
Disposition: **9 `open` + 11 `collapsible`** (count script-verified). The 9 `open` = the four
section intros + the four «Демонстрирует» metadata lines + Elena's «Примечание» (Greeting
canonical-vs-учебный pointer — IMP-48 pair with §7B.2). The 11 `collapsible` = all four cards +
their attached budget rows (×4) + the Omnis/Выщербленный Lorebook tables (×2) + the §10.4
SPINE-consistency table — **all render inside the pre-existing v7-era F6 wraps** (`eb4b91bd`, one
`<details class="interactive">` per card, 4 usages; master total stays 17): the Part-1-slice standing
note («long worked scenarios = `collapsible` candidates at Parts 9/10») has been satisfied since the
v7 migration — documented, not re-wrapped (the Part 7B pre-existing-F6 precedent). Zero
`canonical-link` / `reference-relocate` / `delete-candidate` / `—` (the verdict «protected example
layer; zero compression candidates» held). F3: zero checklists in the Part (the §10.4
SPINE-consistency table = the §4.9 checklist in applied demo form inside the card — no ☐
affordances; not an F3 checkbox moment). F4: the four cards = the worked tier's canonical home
(spec §4.3, EXAMPLE-139 family); the «Демонстрирует» lines + «ШАБЛОН» chips = the deployed labelling;
E15 = the Elena-card visual walkthrough (SHARED_REFERENCE, mig-4). F5: verified F5-approximate —
intro (Concept+budget) → «Демонстрирует» (metadata) → card (Core example) → budget `[ref: §7A.12]`
(Reference); the Parts 5/6/7B/8 zero-restructure precedent. F6: zero new wraps.

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P10-1 | — (evidence) | matrix Part 10 tables: 8 columns, no presentation axis; the four budget-row notes carrying the pre-iter-127 R18 «`§7A.X` vague» state; the verdict line asserting «all four budget refs are vague» (stale — repaired ed-8/R18 iter 127 `8a365553`, pickaxe-verified); the `p10_vysherblenny::03` note carrying the iter-125 obs-6 typo state | `presentation` column seeded (20 rows: 9 `open` + 11 `collapsible` — count script-verified); matrix §1.2 scope note extended to Parts 1–10; the Part 10 verdict refreshed with the iter-157 slice note (the R18 repair disclosed; the R27/KI#77-e framing family stays owner-gated ed-5); **four stale budget-row notes refreshed** (`p10_elena::05` / `p10_walter::04` / `p10_omnis::05` / `p10_vysherblenny::04` — the refs repaired iter 127; master resolves to `#p7a_token_budget`) + the obs-6 typo note marked EXECUTED this slice | EXECUTED **— iter 157** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…156 stale-note-refresh precedent |
| P10-2 | `p10_vysherblenny::03` (canon, L397) | the card heading carried the «Выщебленного» misspelling (recorded iter 125 as obs-6; re-flagged P9-5(e) iter 156; pinned to this slice by the PLAN row note) | **the typo repaired**: canon `part_10.md` L397 `### Полная карточка Выщебленного` → `### Полная карточка Выщербленного` — the only canon edit of the slice. 5-point check: capability — a heading spelling fix, zero semantic change (the correct form already lives in the §10.4 heading, `data-section: p10_vysherblenny`, master h3); coverage — the card content byte-unchanged; retrieval — no anchor/ID touched (fence #4/#5 clean); context — the heading opens the same ШАБЛОН block; dependency — no sync probe pins the heading (grep-verified); F5 verified F5-approximate — zero restructure (the Parts 5/6/7B/8 precedent) | MOVED **— executed iter 157** | fence #10 (correctness); the iter-156 §9.11 typo-repair precedent; the PLAN v2-build-part-10 note (P9-5(e) rides this slice) |
| P10-3 | `p10_vysherblenny::03` (master, the F6 summary) | the master `<summary>Полная карточка Выщебленного</summary>` carried the same misspelling | **the mirror repair**: master `part_10.html` L521 summary → «Полная карточка Выщербленного». Zero mirror gaps found: the drift pre-capture classifies all 7 part_10 actionable entries as 4 comment-noise + 3 KI#79-boundary budget-`<p>` absorptions (the «Итого» lines inside `<details>` swallowed by pre-blobs — informational; no «Ссылка»-family gap; the v9 Phase-6 slimming never hit Part 10 — the master retains the full cards). Zero new F6 wraps (the 4 pre-existing v7 wraps documented — P10-1) | MOVED **— executed iter 157** | fence #10 (canon = source of truth, master mirrors); the iter-156 typo-repair precedent |
| P10-4 | — (observed) | master-only enrichments + variances, never canonized/resolved: (a) the Omnis Embodiment 5th-item variance — master «Звук: тихий гул электромоторов, щелчки манипуляторов (голос задаётся только в Examples — см. Voice Isolation rule §3.X)» vs canon «Голос: синтезированный, металлический резонанс, фраза → пауза-обработка → фраза»: the iter-75 KI#51 master-only fix (pickaxe `6b5ab1e0` — «Voice в Description Омнис-Зета… Embodiment „Голос:“ заменён на „Звук:“») never synced to canon; carries the R18 vague-ref («§3.X») + DEC-16 EN-label («Voice Isolation rule») families; the DEC-21-era physical/linguistic voice split (STATUS invariant: physical = Embodiment/Description) makes the canon form legal again — both directions change reader-visible card content → the canonical-audit stage; (b) Elena's master-only card lines — «Tone Frame: Tone: grounded, understated…» + «OOC PROTECTION: …» (canon's Elena card carries neither; the E15-embed alignment family — the E15 card-template shows the same strings); (c) the master-only top-of-part «ПРАВИЛО: Правило голоса…» callout (v8 Task 2.2 addition; the «никогда в Description» framing predates the §3.1 physical/linguistic split — the P9-5-family tension); (d) the canon front-matter staleness (`vs_embedded: none` vs the file-level `[VS: E15]` marker — the iter-152 repo-wide family); (e) the 7 part_10 drift entries (4 comment-noise + 3 KI#79-boundary — informational, pre-existing); (f) the STATUS iter-156 Next-step row said «5 sections» — the verified count is 4 (corrected in this registry; no reader impact) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (both directions change reader-visible knowledge or non-rendering metadata; the disposals ride the canonical-audit stage per the P4-5…P9-5 chain) | RECORDED **— deferred (iter 157)** | AGENTS.md scope discipline (discovering ≠ permission to fix); Editorial Policy; rides the canonical-audit stage (spec §8.3) or an ed-* batch |
| P10-5 | — (KI — the owner-called canonical-audit reconciliation) | **KI#84** (opened iter 156): the master §9.6 P3-4c Walter cross-ref line «Пример тестирования карточки с OCEAN-профилем (A=38, N=68 — осторожная зона, без экстремальных полюсов кроме O=72) — Уолтер Уайт, §10.2» carried **Елена's OCEAN values attributed to Walter** (born wrong iter 38 — the P3-4 fix commit itself; §10.2 actual: O:65 C:85 E:30 A:25 N:60); pinned byte-identical by TWO tool anchors (the sync probe P3-4c + the diagnostics-parity WALTER_ANCHOR) + the §9.6 byte-stability lock — deferred to the owner call / canonical-audit stage | **the owner-called DELETE executed**: the master §9.6 Walter line removed (`src/master/part_09.html` — one `<p>` + its blank line; canon §9.6 carried no Walter line → **canon `part_09.md` byte-stable through the reconciliation**, the §9.6 sha pre = post — the mig-3 record untouched); **§9.7 stays the sole Part-9 reference** to Walter's OCEAN example (the canon+master line with Walter's actual extremes C=85/A=25/E=30 — verified present both sides). **Both tool anchors moved together**: (1) the sync probe P3-4c → `ABSENT_CHECKS` as **P3-4c-del** (a negative check — the line must stay absent; total count 97 preserved: 73 positive + 24 negative; the iter-148/155 in-step probe-adjustment precedent, disclosed in the script docstring); (2) the diagnostics-parity `WALTER_ANCHOR` → `WALTER_DELETED` (the absence guard) + a NEW check **2b** (the §9.7 sole-reference guarantee — canon §9.7 + master §9.7 must both carry the Walter OCEAN example line with the actual extremes; `audit_diagnostics_parity.py` PASS). 5-point check: capability — the §9.6→§10.2 navigation pointer removed from §9.6 (a 1-sentence cross-ref link, not a teaching block — fence #11's "everywhere else = 1-sentence link" pattern loses one redundant pointer whose VALUES were wrong); coverage — the Walter OCEAN testing example remains fully reachable via §9.7 (the same `#p10_walter` link + the correct values); retrieval — §9.6's diagnostic core (the E13 mapping table + the 5-group table) unchanged, §9.7 carries the testing-example pointer where the testing scenario table lives; context — the §9.6 decision-tree flow unchanged (the line sat after the closing table); dependency — both dependent tool anchors re-pointed in step; grep-verified no other consumer («Уолтер» in master part_09 = the §9.7 line only) | MOVED **— executed iter 157 (KI#84 CLOSED)** | the owner's session directive (2026-09-16, quoted above); Editorial Policy 5-point check; fence #10; the KI lifecycle (AGENTS.md Bug→doc→fix) |
| P10-6 | — (state) | STATUS iter-156 / PLAN row v2-build-part-10 open / no map §5.18 | map §5.18 + STATUS iter-157 (Current State; the v2-architecture invariant + Next-step preamble extended to Parts 1–10 / iters 147–157 / maps §5.8–§5.18; KI#84 → CLOSED iter-157; iter-157 KI-note; Next step re-pinned to the appendix/Reference slice carrying the KI#70 WIRE per DEC-24 Q7) + PLAN v2-build-part-10 → COMPLETE + the appendix-slice row + iter-157 history note + worklog + CHANGELOG + NAV §7 de-stale (Parts 1–10) | EXECUTED **— iter 157** | iter-147…156 state-package pattern |

Accounting: 1 presentation-column seeding (20 rows: 9 `open` + 11 `collapsible`, count
script-verified) + 1 canon typo repair (P10-2 — the only canon content edit; zero F5 restructure) +
1 master summary typo repair (P10-3) + **1 owner-called master deletion (P10-5 — the KI#84 §9.6
Walter line; canon part_09.md byte-stable, git-diff-verified)** + 2 tool-anchor re-points in step
(P10-5, disclosed: the sync P3-4c → P3-4c-del negative check — count 97 preserved; the
diagnostics-parity WALTER_DELETED absence guard + the new check 2b §9.7 sole-reference guarantee) +
1 observation package deferred (P10-4) + 1 state package (P10-6). Byte-unchanged: canon
`part_10.md` outside L397; master `part_10.html` outside L521; canon `part_09.md` entirely; master
`part_09.html` outside the §9.6 deletion (the E13 embed, the §9.7 tables, the §9.11 F6 wrap
verified); matrix tag/decision/load/repeat columns unchanged. Deferred (recorded, out of scope):
the P10-4 observation package (canonical-audit stage / ed-* batch); KI#77-e + KI#79 (open,
untouched); KI#70 rides the appendix/Reference slice per DEC-24 Q7. Root fallbacks
`parts/part_10.html` + `parts/part_09.html` regenerated with the slice (+ root `index.html`
timestamp). Drift actionable **143 → 143** (unchanged, expected: the deleted master-only `<p>` had
no canon counterpart; the typo repairs touch a canon heading + a master summary — both
drift-untracked; verified by the JSON pre/post diff; zero new rows). Next: **the appendix/Reference
slices** (guide order A → B → C, each its own bounded slice per the spec §7 / STATUS row-2 wording;
the first appendix slice carries the **KI#70 WIRE implementation per DEC-24 Q7** + its runtime-suite
verification — 93→96 sections, the `mbti-composer` init check, the `#appendix_*` TOC links;
Appendix D (character_map) = canon-only, rides its own slice) → parity audit → canonical audit (the
P4-5 + P5-5 + P6-4 + P7A-4 + P7B-4 + P8-4 + P9-5 + **P10-4** master-only enrichment observations
ride this stage) → reader-path audit → switch.

### 5.19 Appendix A v2 build slice + the KI#70 WIRE (seeded + executed iter 158 — v2 build phase, first appendix/Reference slice)

Scope: **Appendix A — MBTI Reference** (`docs/canon/appendix_mbti.md` + `src/master/appendix_mbti.html`,
1 section / 6 matrix rows; DEC-24 Q6 guide order — first appendix; the pinned STATUS Next-step row 1,
**not owner-gated** — Q7 decided WIRE, the appendix slices are the pinned track continuation)
**+ the KI#70 WIRE implementation (DEC-24 Q7)** — the ki-70 row's WIRE scope riding this slice per
the recorded PLAN recommendation ("append `manifest.appendices` to the load list after
`manifest.parts` — they inherit KI#69 retry/placeholder machinery for free"). Mechanism: the
ratified spec §7 slice shape (evidence → canon restructure → master mirror → full battery) — twelfth
application, reusing the §5.8–§5.18 pattern. Primary reader mode: **Reference** (spec §3: compact
term/rule entries with canonical-home links; the appendices = the Reference-mode backbone whose
runtime presence is the Q7 question the WIRE answers). Editorial Policy 5-point check applied per
edit (documented per row below). Acceptance gate: the full battery **+ the ki-70 WIRE acceptance**
(the iter-119 headless-suite extension: appendix sections 93→96, the `#appendix_mbti` link-target
check, the `mbti-composer` page-error/init check). **No new cluster parity gate** (Appendix A hosts
no cluster owner; the seven cluster owners sit in the Parts — verified §5.18 P10-1's list). The
KI#77-e/R27 budget-framing family stays owner-gated (ed-5) — the slice documents, does not re-decide.

**F2 presentation map (spec §4.1 mechanism, twelfth application):** the appendix_mbti matrix table
now carries the `presentation` column (**6 rows: 6 `open`** — count script-verified); matrix §1.2
scope note extended to Parts 1–10 + Appendix A; the §14 header note de-staled (the appendices render
at runtime since the WIRE); two stale row notes refreshed (::04 — the pre-iter-123 «EN label „NOTE"»
state + the pre-iter-127 «`§7A.X` vague» state; ::05 — the KI#70 dependency resolved) + the
appendices verdict refreshed (the pre-iter-127 «18 vague glossary refs» line corrected — the per-row
glossary notes stay stale for that appendix's own slice; the «never-loaded» dependency resolved).
Zero `collapsible` / `canonical-link` / `reference-relocate` / `delete-candidate` / `—` — the
Reference-layer verdict holds (compact lookup payload: intro → 2 reference tables → 1-line
disambiguation → the interactive tool → the РЕКОМЕНДАЦИЯ decision statement). F5: verified
F5-approximate — the Reference-layer shape is the target form (Concept → reference payload →
decision); zero restructure (the Parts 5/6/7B/8 zero-restructure precedent). F6: zero wraps. F3/F4:
no checklists / no example tiering in the appendix.

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P-app-1 | — (evidence) | matrix appendix_mbti table: 8 columns, no presentation axis; the §14 header note asserting the appendices are runtime-blocked by KI#70; ::04's note carrying the pre-iter-123 «EN label „NOTE"» + pre-iter-127 «`§7A.X` vague» states; ::05's note carrying the open KI#70 dependency; the verdict's «18 vague glossary refs» + «never-loaded containers» claims (both stale) | `presentation` column seeded (6 rows: 6 `open` — count script-verified); matrix §1.2 scope note extended to Parts 1–10 + Appendix A; the §14 header note refreshed (runtime render since iter 158, the WIRE pointer); ::04 + ::05 stale notes refreshed; the appendices verdict refreshed (stale claims corrected with pickaxe disclosures — the R18 repair `8a365553`, the WIRE) | EXECUTED **— iter 158** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…157 stale-note-refresh precedent |
| P-app-2 | — (canon) | `appendix_mbti.md` 47 lines: intro → 4-оси table → Keirsey table → Примечание → container note → РЕКОМЕНДАЦИЯ | **verified F5-approximate — zero restructure, canon byte-stable** (the Reference-layer shape is the target form; the Parts 5/6/7B/8 zero-restructure precedent). Section ID `appendix_mbti` preserved (fences #4/#5 clean). The canon ref forms verified full (`[ref: part_07a.md §7A.1 — System Prompt]`) | VERIFIED **— byte-stable iter 158** | spec §3 Reference row; Editorial Policy (nothing to compress: zero redundant presentation) |
| P-app-3 | `appendix_mbti::03/::04/::06` (master) | the master's v9-Phase-6-slimmed mirror gaps: (a) the S·P note carried only sentence 1 in em-parenthetical form — the canon's sentence 2 (the `S·P`-dot convention) + the `§7A.1` ref dropped; (b) the table header «Цвет» vs canon «Цвет (в виджете)»; (c) the РЕКОМЕНДАЦИЯ body «полюса → якоря» vs canon «полюса → Anchors (поведенческие якоря)» — the gloss dropped; (d) the master-only stale v9-era transition «Следующие секции: Enneagram Wings, OCEAN×Enneagram Matrix» (the v9 Part-5-move leftover pointing back into Part 5 from a post-Part-10 appendix) | **three mirror completions executed** (fence #10 canon wins, the iter-155 v9-slimming-gap precedent): (a) the S·P note restored to the canon form («Примечание:» label + sentence 2 + the `#p7a_system_prompt` link); (b) the header restored to «Цвет (в виджете)»; (c) the «(поведенческие якоря)» gloss restored (the guide's own «полюса → Anchors» phrase-form, part_05 §5.5 L330-consistent). **The transition disposed REMOVED_WITH_REASON** — 5-point check: capability — a stale forward pointer whose targets (§5.6/§5.7) sit 5 Parts back from the appendix's real position, zero navigation capability lost; coverage — §5.6/§5.7 stay reachable via the sidebar TOC + Part-5 context; retrieval — no reader at the guide's tail needs a pointer into mid-Part-5; context — the appendix closes on the РЕКОМЕНДАЦИЯ + resume; dependency — grep-verified zero tool probes / zero back-link registry entries (the iter-148 §2.3 disposal precedent) | MOVED **— executed iter 158** | fence #10; Editorial Policy 5-point check; the iter-148 §2.3 + iter-155 mirror-completion precedents |
| P-app-4 | — (observed) | master-only / metadata variances, never canonized: (a) the `part-resume` block «Что вы теперь умеете» (v7-era closing block; all three appendix masters carry the same family — A/B/C co-travelers; benign Learn-mode framing in a Reference-layer appendix); (b) the canon container-note drift entry (canon metadata describing the embedded interactive element — the master renders the container itself; informational); (c) the canon front-matter staleness (`canonical_for: —` etc. — the repo-wide iter-152 family); (d) the manifest `appendices` array order = alphabetical (a build-unified.mjs `.sort()` artifact) — NOT the guide lettering; (e) the appendix_glossary + character_map matrix tables' per-row «`§X.X` vague» notes remain stale (repaired iter 127) — deferred to their own slices; (f) the part_05 §5.5 row «MBTI (Appendix A) — supplementary» (text mention, no link) vs the L641 linked form — link-vs-text variance family | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (the B/C/D slices own their families; the manifest-order refinement = a supersedeable future DEC if the owner prefers the manifest to carry guide order; the canonical-audit stage owns the cross-family reconciliations) | RECORDED **— deferred (iter 158)** | AGENTS.md scope discipline; the P4-5…P10-4 observation-package chain |
| P-app-5 | — (KI#70 — the DEC-24 Q7 WIRE) | **KI#70** (opened iter 119): `parts/manifest.json`'s `appendices` array (3 entries) never read by `src/shell/lazy-loader.js` (it iterated only `manifest.parts`) — Appendix A (MBTI Reference + the `mbti-composer` container), B (Model Capability Table), C (Glossary) never rendered; the auto-injected TOC's `#appendix_*` links (built `part_01.html:414+`) dead; the `mbti-composer` init path never exercised | **the WIRE executed** in `src/shell/lazy-loader.js` (`loadContent()`): the load list = `(manifest.parts \|\| []).concat(appendices)` where `appendices` = `manifest.appendices` re-ordered by `APPENDIX_GUIDE_ORDER` (guide lettering A→B→C — the manifest array is an alphabetical build artifact; unknown files sort last, stable) — the appendices inherit the KI#69 retry/placeholder machinery for free (same `fetchPartHtml` pipeline + `partErrorHtml` placeholders + surgical retry). **TOC-grouping sub-decision** (the ki-70 row's recorded open point): `generateTOC()` gains an «Приложения» group after the Part groups — the same convention the auto-injected part-01 TOC uses; entry text = each appendix section's own h2; DOM order = load order (A→B→C); Part-number active highlighting intentionally does not apply (its regex is Part-scoped by design). **Runtime verification executed** (the iter-119 headless-suite extension, sandbox): pre-WIRE probe — 93 sections, zero appendix sections, the TOC link present-but-dead, no `#mbti-embed`; post-WIRE probe — **96 sections** (93→96), appendix order `appendix_mbti → appendix_model_table → appendix_glossary` (A→B→C verified), the `#appendix_mbti` TOC link target rendered **and anchor navigation scrolls into view** (scrollY 142112 → top 80), the `#mbti-embed` container present, **the mbti-composer widget built (initialized) with zero page errors / zero console errors**; the sidebar TOC «Приложения» group carries the 3 entries in guide order. **KI#70 CLOSED** | MOVED **— executed iter 158 (KI#70 CLOSED)** | DEC-24 Q7 (WIRE); the PLAN ki-70 row's recorded recommendation + WIRE acceptance; the iter-119 headless-suite pattern |
| P-app-6 | — (state) | STATUS iter-157 / PLAN row v2-build-appendix-a open / no map §5.19 | map §5.19 + STATUS iter-158 (Current State; the v2-architecture invariant + Next-step preamble extended to the appendix-slice stage; KI#70 → CLOSED iter-158; iter-158 KI-note; Next step re-pinned to the Appendix B slice) + PLAN v2-build-appendix-a → COMPLETE + the appendix-b row + iter-158 history note + worklog + CHANGELOG + NAV §7 de-stale (the appendix slices) | EXECUTED **— iter 158** | iter-147…157 state-package pattern |

Accounting: 1 presentation-column seeding (6 rows: 6 `open`, count script-verified) + 0 canon edits
(**canon `appendix_mbti.md` byte-stable — git-diff-verified**) + 3 master mirror completions
(P-app-3: the S·P note, the table header, the gloss) + 1 master disposal (P-app-3: the stale v9-era
transition, REMOVED_WITH_REASON) + **1 infrastructure WIRE** (P-app-5: the lazy-loader load list +
the «Приложения» TOC group + the guide-order map; `src/shell/` touched under the DEC-24 Q7
authorization — NAV §1's infrastructure-request path satisfied by the recorded decision) + 1
observation package deferred (P-app-4) + 1 state package (P-app-6). Byte-unchanged: canon
`appendix_mbti.md` entirely; master `appendix_mbti.html` outside the four P-app-3 edits; all other
master/canon files; matrix tag/decision/load/repeat columns unchanged. Deferred (recorded, out of
scope): the P-app-4 observation package (the B/C/D slices + the canonical-audit stage); KI#77-e
(open, untouched); KI#79 (open, untouched); the R02/R01 glossary compression candidates (ed-2
family — the Appendix C slice's scope, riding the KI#70-wire dependency note recorded in the matrix
§14 ::05-era notes). Root fallbacks regenerated with the slice (`assets/lazy-loader.js` + root
`index.html` timestamp; hash `2ab607d6` unchanged — `src/shell/index.html` untouched). Drift: see
the iter-158 worklog for the pre/post capture (the S·P-note mirror completion is expected to clear
the appendix_mbti plain-text drift entry — attribution there). Next: **the Appendix B (Model
Capability Table) v2 build slice** (the OBSERVATION-strength percentages, DEC-20; PLAN row
v2-build-appendix-b) → Appendix C (the v2 Reference-layer representation, DEC-17c — the R01/R02
compression candidates ride it) → Appendix D (character_map, canon-only; the KI#77-b/c/d + R27
notes) → parity audit → canonical audit (the P4-5…P10-4 + P-app-4 master-only enrichment
observations ride this stage) → reader-path audit → switch.

### 5.20 Appendix B v2 build slice (seeded + executed iter 159 — v2 build phase, second appendix/Reference slice)

Scope: **Appendix B — Model Capability Table** (`docs/canon/appendix_model_table.md` +
`src/master/appendix_model_table.html`, 1 section / 4 matrix rows — 3 re-derived + the НАБЛЮДЕНИЕ
row added this slice; DEC-24 Q6 guide order — second appendix; the pinned STATUS Next-step row 1,
**not owner-gated** — the appendix slices are the pinned track continuation). Mechanism: the ratified
spec §7 slice shape (evidence → canon restructure → master mirror → full battery) — thirteenth
application, reusing the §5.8–§5.19 pattern. Primary reader mode: **Reference** (spec §3: compact
term/rule entries with canonical-home links; the appendix runtime-renders since the iter-158 WIRE —
no infrastructure work remains in this slice). Editorial Policy 5-point check applied per edit
(documented per row below). Acceptance gate: the full battery **+ the sampling-parity OBSERVATION
anchor** (check 8 references the Appendix B framing — any master restructure must keep the gate
green; verified PASS). **No new cluster parity gate** (Appendix B hosts no cluster owner; the seven
cluster owners sit in the Parts — verified §5.18 P10-1's list).

**F2 presentation map (spec §4.1 mechanism, thirteenth application):** the appendix_model_table
matrix table now carries the `presentation` column (**4 rows: 4 `open`** — count script-verified);
matrix §1.2 scope note extended to Parts 1–10 + Appendices A/B; the audit-total header note
discloses the row-count reality (**500 → 504** — the iter-159 script-examined count found +4
post-audit row additions never folded into the header: iter 139/142/147's rows (each disclosed at
its own slice) + the НАБЛЮДЕНИЕ row added this slice — the block post-dated the iter-126 audit
(added iter 145 as DEC-20's first OBSERVATION application, no matrix row at the time); the slice
repairs the coverage gap per the matrix's own §1.1 re-derivation convention); the ::01 stale marker
inventory refreshed (was «markers ×2 in Part 6» — the current inbound links = canon ×4 + master
`model-note` spans ×5, all live since the WIRE); the ::04 (ex-::03) L-refs refreshed (the iter-145
insertion had shifted the block); the appendices verdict extended with the B-sliced line. Zero
`collapsible` / `canonical-link` / `reference-relocate` / `delete-candidate` / `—` — the
Reference-layer verdict holds (compact lookup payload: intro → the reference table → the
OBSERVATION strength framing → the apply-layer следствия). F5: verified F5-approximate — the
Reference-layer shape is the target form; zero restructure (the Parts 5/6/7B/8 + Appendix A
zero-restructure precedent). F6: zero wraps. F3/F4: no checklists / no example tiering in the
appendix.

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P-B-1 | — (evidence) | matrix appendix_model_table table: 8 columns, no presentation axis; 3 rows with pre-iter-145 L-refs (::03 «L33–37») and the stale «markers ×2 in Part 6» inventory; the iter-145 НАБЛЮДЕНИЕ block carrying no row (audit-coverage gap); the audit-total «500 block rows» header claim | `presentation` column seeded (4 rows: 4 `open` — count script-verified); the НАБЛЮДЕНИЕ row added (::03, METADATA — the §1.1 document-order re-derivation; ex-::03 следствия → ::04 with L35–39); §1.2 scope note extended to Parts 1–10 + Appendices A/B; the header audit-total disclosed (500 → **504** — the script-examined count: +4 post-audit additions attributed (iter 139/142/147's rows + the iter-159 НАБЛЮДЕНИЕ row)); the ::01 marker inventory refreshed (canon ×4 + master ×5, WIRE-live); the appendices verdict extended | EXECUTED **— iter 159** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…158 stale-note-refresh precedent; the matrix's own §1.1 re-derivation convention |
| P-B-2 | — (canon) | `appendix_model_table.md` 39 lines: intro → 9-row capability table → НАБЛЮДЕНИЕ → Ключевые следствия (3 bullets) | **verified F5-approximate — zero restructure, canon byte-stable** (the Reference-layer shape is the target form: Concept → reference payload → strength framing → apply summary; the zero-restructure precedent chain). Section ID `appendix_model_table` preserved (fences #4/#5 clean). The OBSERVATION anchor intact (the sampling gate's check-8 canon probe — verified PASS). The front-matter staleness recorded as an observation (P-B-4c — the repo-wide iter-152 family, not this slice's scope) | VERIFIED **— byte-stable iter 159** | spec §3 Reference row; Editorial Policy (nothing to compress: zero redundant presentation) |
| P-B-3 | `appendix_model_table::02/::04` (master) | the master's v9-Phase-6-slimmed state: (a) the entire «Ключевые следствия для сборки карточки» block (h3 + 3 bullets — canon ::04) absent from master; (b) the Script Tax API-column word order «200K+ словарь покрывает…» vs canon «словарь 200K+ покрывает…»; (c) the master-only v7-era `part-resume` block «Что вы теперь умеете» whose bullet 2 («Учитывать MODEL_NOTE при выборе техник…») directs the reader at markers that no longer exist anywhere (grep-verified: the only MODEL_NOTE mentions repo-wide = this appendix's own intro + header comment + the stale bullet itself — the v9 Phase 3.3 consolidation replaced them with this very table) | **two mirror completions executed** (fence #10 canon wins, the iter-155/158 v9-slimming-gap precedent): (a) the следствия block restored (h3 + 3 `<li>` + the `#p7a_core_directives` link on «см. §7A.2 ПРАВИЛО» — the part_07a §7A.12-row link pattern); (b) the Script Tax cell restored to the canon word order. **The `part-resume` block disposed REMOVED_WITH_REASON** — the iter-158-recorded «B/C slices co-decide» sub-decision executed at B. 5-point check: capability — a Learn-mode recap («Что вы теперь умеете») in a Reference-layer appendix adds zero lookup capability, and its bullet 2 is a live factual misdirection since the WIRE made the appendix render; coverage — bullet 1 restates the table payload (::02), bullet 2 = stale, no unique rule/nuance/example lost; retrieval — the Reference reader arrives via the `[Model: see Appendix B]` markers / TOC and needs the table + OBSERVATION + следствия (all retained, open); context — the section closes on the restored следствия apply summary (the Appendix A close-on-decision precedent); dependency — grep-verified zero tool probes (the sync audit carries no appendix_model_table checks; the sampling gate probes only the НАБЛЮДЕНИЕ callout — untouched; zero tests reference the block) + zero back-link registry entries. Family precedent: the iter-47 P2-7 cleanup already deleted the part-resume blocks from the Parts (11 deletes — the sync audit's `P2-7-del-*` negative checks) with the appendices explicitly out of that KI's scope; A's benign instance remains recorded (P-app-4a), C's slice follows the B precedent, the `.part-resume` component stays registered (components.md) with 2 live usages | MOVED **— executed iter 159** | fence #10; Editorial Policy 5-point check; the iter-47 P2-7 + iter-148 §2.3 + iter-158 P-app-3 disposal precedents; the iter-158 «B/C slices co-decide» record |
| P-B-4 | — (observed) | master-only / metadata variances, never canonized: (a) the remaining appendix `part-resume` co-travelers — A (benign bullets; P-app-4a) and C (the glossary instance — its slice follows the B precedent); (b) the heading-mismatch informational family (canon «B.1 Таблица…» vs master h2 «Таблица…» — the repo-wide non-numbered-master-h2 convention, 15 drift WARNs, informational by design); (c) the canon front-matter staleness (`canonical_for: —` etc. — the repo-wide iter-152 family); (d) the master part_04 `model-note` span = the master-side form of the canon's inline model qualification (P4-4 enrichment family — canon part_04 L281 carries «≥32B и API; 12B — ограниченно» inline); (e) the comment-noise drift entry stays (canon HTML comments vs master — informational; canon byte-stable) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (the C/D slices + the canonical-audit stage own their families; the heading-mismatch family = the drift tool's informational WARN layer, no reader impact) | RECORDED **— deferred (iter 159)** | AGENTS.md scope discipline; the P4-5…P10-4 + P-app-4 observation-package chain |
| P-B-5 | — (state) | STATUS iter-158 / PLAN row v2-build-appendix-b open / no map §5.20 | map §5.20 + STATUS iter-159 (Current State; the v2-architecture invariant extended to Appendices A/B; KI#84 row deleted per lifecycle — 2 iterations elapsed 158/159; iter-159 KI-note; Next step re-pinned to the Appendix C slice) + PLAN v2-build-appendix-b → COMPLETE + the appendix-c row + iter-159 history note + worklog + CHANGELOG + NAV §7 de-stale (the appendix slices: A/B) | EXECUTED **— iter 159** | iter-147…158 state-package pattern |

Accounting: 1 presentation-column seeding (4 rows: 4 `open`, count script-verified; +1 row added —
the НАБЛЮДЕНИЕ audit-coverage repair, total 500→**504** disclosed in the matrix header + this
registry's §5 preamble — the script-examined count surfaced 3 pre-existing undisclosed post-audit
additions (iter 139/142/147), now attributed) + 0 canon edits (**canon `appendix_model_table.md` byte-stable —
git-diff-verified**) + 2 master mirror completions (P-B-3: the следствия block, the Script Tax
cell) + 1 master disposal (P-B-3: the v7-era `part-resume`, REMOVED_WITH_REASON — the
«B/C slices co-decide» sub-decision executed at B) + 1 observation package deferred (P-B-4) + 1
state package (P-B-5). Byte-unchanged: canon `appendix_model_table.md` entirely; master
`appendix_model_table.html` outside the three P-B-3 edits; all other master/canon files; matrix
tag/decision/load/repeat columns unchanged. Deferred (recorded, out of scope): the P-B-4
observation package (the C/D slices + the canonical-audit stage); KI#77-e (open, untouched);
KI#79 (open, untouched); the R02/R01 glossary compression candidates (ed-2 family — the
Appendix C slice's scope). Root fallbacks regenerated with the slice (`parts/appendix_model_table.html`;
root `index.html` timestamp; hash `2ab607d6` unchanged — `src/shell/index.html` untouched).
Drift: **142 → 141 expected** (the следствия mirror completion clears the appendix_model_table
plain-text entry — simulation pre-verified with the drift tool's own tokenizer: best-Jaccard
0.660 ≥ threshold 0.3; the remaining entry = comment-noise, informational). Next: **the Appendix C
(Glossary) v2 build slice** (the v2 Reference-layer representation, DEC-17c — the R01/R02
compression candidates ride it; PLAN row v2-build-appendix-c) → Appendix D (character_map,
canon-only; the KI#77-b/c/d + R27 notes) → parity audit → canonical audit (the P4-5…P10-4 +
P-app-4 + P-B-4 master-only enrichment observations ride this stage) → reader-path audit → switch.

### 5.21 Appendix C v2 build slice (seeded + executed iter 160 — v2 build phase, third appendix/Reference slice)

Scope: **Appendix C — Glossary** (`docs/canon/appendix_glossary.md` + `src/master/appendix_glossary.html`,
1 section / 26 matrix rows; DEC-24 Q6 guide order — third appendix; the pinned STATUS Next-step row 1,
**not owner-gated** — the appendix slices are the pinned track continuation). Mechanism: the ratified
spec §7 slice shape (evidence → canon restructure → master mirror → full battery) — fourteenth
application, reusing the §5.8–§5.20 pattern. Primary reader mode: **Reference** (spec §3: compact
term/rule entries with canonical-home links; the appendix runtime-renders since the iter-158 WIRE —
no infrastructure work remains in this slice). **The R01/R02 compression candidates ride this slice**
(the pinned track's recorded scope; the KI#70-wire dependency recorded in the matrix §14 R02-era
notes resolved since iter 158 — the appendix renders, so the full annotated copy is a live competing
presentation of §7A.2). Editorial Policy 5-point check applied per edit (documented per row below).
Acceptance gate: the full battery **+ the glossary-parity chain** (`audit_glossary_parity.py` MUST
PASS — the registry ↔ generated `data/glossary.json` ↔ map §5.1 dispositions chain stays intact;
the appendix edit touches no registry row) **+ the core-directives parity gate**
(`audit_core_directives_parity.py` MUST PASS — check 8's numbered-template scan covers
`appendix_glossary.html`; the compressed index form carries no template lines; check 7 anchors the
registry C-5 entry, untouched).

**F2 presentation map (spec §4.1 mechanism, fourteenth application):** the appendix_glossary
matrix table now carries the `presentation` column (**26 rows: 26 `open`** — count script-verified);
matrix §1.2 scope note extended to Parts 1–10 + Appendices A/B/C; the stale-note family refreshed
(every pre-slice «ref `§X.X` vague» claim predates the iter-127 R18 repair — the canon refs
verified as the full `[ref: part_NN.md §X.Y — Label]` forms; the two R29 mismatch quotes (::04
«Tier 0 (basic Anchor)», ::10 «G2=Отрочество») likewise stale — the canon aligns with §6.3 and
§4.11); the L-refs re-derived per §1.1 (the ::05 compression shifted the tail blocks L45–L169);
the appendices verdict extended with the C-sliced line; §16's execution-status summary re-counted
(18 of 20 — #8's iter-153 fold de-staled with it). Zero `collapsible` / `canonical-link` /
`reference-relocate` / `delete-candidate` / `—` — the Reference-layer verdict holds (compact term
entries with canonical-home links; spec §3). The two DUPLICATE-classified rows (::03 R01 / ::05
R02+R13) are the appendix's only compression candidates — both executed **inside** their blocks
(the entries keep their definition payload; the F2 disposition of every block stays `open`). F5:
verified F5-approximate — the Reference-layer shape is the target form (term → definition → ref);
zero restructure beyond the two compressions. F6: zero wraps. F3/F4: no checklists / no example
tiering in the appendix.

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P-C-1 | — (evidence) | matrix appendix_glossary table: 8 columns, no presentation axis; 26 rows carrying pre-iter-127 «ref `§X.X` vague» claims + two stale R29 mismatch quotes (::04/::10) + pre-compression L-refs; §16's execution-status summary carrying the pre-iter-153/160 open statuses (#8/#19/#20) | `presentation` column seeded (26 rows: 26 `open` — count script-verified); the stale-note family refreshed (the R18 refs verified full; the R29 quotes de-staled — the canon aligns with §6.3 «без отдельного CoT-блока» / §4.11 «Юность»); the L-refs re-derived per §1.1; the appendices verdict extended (the C-sliced line + the «two entries over-carry» claim marked compressed); the R01/R02 §15 rows marked COMPLETE iter 160; §16 items #19/#20 marked executed + #8 de-staled + the summary re-counted (18 of 20) | EXECUTED **— iter 160** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…159 stale-note-refresh precedent; the matrix's own §1.1 re-derivation convention |
| P-C-2 | `appendix_glossary::03` + `::05` (canon) | ::03 carried the placement ПРАВИЛО as a bolded 2-sentence standalone statement (**ПРАВИЛО:** «Якоря — отдельный структурный блок… не часть диалоговых примеров. В большинстве фронтендов… Anchors = behavioural patterns, Examples = voice patterns»); ::05 carried the full annotated 7-item numbered list (the annotations restating §7A.2::06–::12) + the R13 full 3-tier SP-language restatement («12B с <64K словарём → английский; … 32B+ и API → язык карточки предпочтителен») | **R01 EXECUTED (::03):** the ПРАВИЛО folded to 1 sentence + the §1.4 parenthetical ref — the registry C-3 deployed form («…не часть диалоговых примеров (правило размещения — §1.4); в большинстве фронтендов размещаются как `<anchors>`-тег в Description; концептуально якоря задают поведенческие паттерны, Examples — голосовые»); the bolded marker dropped (rule-strength markup belongs to the canonical owner §1.4 — DEC-20); the «behavioural patterns» EN tail russified (DEC-16; the registry's ratified form). **R02 + R13 EXECUTED (::05):** the full annotated copy → definition + 7-name index («Состав: (1) Show Never Tell; … (7) Pre-Generation Filter») + the fixed §7A.2 pointer («Определение каждой директивы и многоуровневое правило языка (по модели) — §7A.2») — the registry C-5 deployed form (DEC-17c = the v2 Reference-layer representation); the entry keeps its own definitional sentences («Формируют „операционную систему“…» — связную логику, the appendix's grammatical form). 5-point check (R02): capability — the directive semantics remain one hop away at §7A.2 (the DEC-08 single-presentation invariant: glossary entry = definition + link); coverage — every rule/nuance of the annotations lives in §7A.2 (byte-stable), the 7 names stay (index); retrieval — the glossary's own declared pattern (definition + canonical-home ref) now honored; context — the entry remains a self-contained definition; dependency — grep-verified zero tool probes on the list (the sync audit probes only the T→A→P heading + the section id; the core-directives gate's check-8 template-line regex never matched the `<li>` form and matches nothing in the index form; the drift tool's CORE-DIRECTIVES plain-text entry clears — see the drift note below). Section ID `appendix_glossary` preserved (fences #4/#5 clean); canon −10/+2 lines | MOVED **— executed iter 160** | the matrix COMPRESS/ed-2 verdicts (R01/R02); DEC-17c; DEC-08/mig-2 (D-5/D-8); the registry C-3/C-5 deployed forms (iter 133); Editorial Policy 5-point check; the iter-125/134/153 R01/R02 fold precedents |
| P-C-3 | `appendix_glossary::03/::05` (master) + the v7-era `part-resume` | the master mirrored both v1 full forms (the `<strong>ПРАВИЛО:</strong>` block; the `<ol>` with 7 annotated `<li>` — the #3 `<li>` carrying a pre-existing Russian-gloss gap vs canon «(#3, «пространственная и анатомическая фиксация»)»); the v7-era `part-resume` block «Что вы теперь умеете» (2 bullets — «Находить определения всех технических терминов гайда» / «Использовать кросс-ссылки…») | **two mirror completions executed** (fence #10 canon wins): ::03 → the folded sentence with the linked parenthetical `(<a href="#p1_core_rules">правило размещения — §1.4</a>)`; ::05 → the compressed paragraph with the `#p7a_core_directives` link on the §7A.2 pointer (the entry's established inline-link pattern). **The `part-resume` block disposed REMOVED_WITH_REASON** — the iter-158-recorded «B/C slices co-decide» sub-decision executed at C (the B precedent, map §5.20 P-B-3): 5-point check — capability — a Learn-mode recap in a Reference-layer lookup appendix adds zero retrieval capability (the reader arrives for a term, not a curriculum); coverage — bullet 1 restates the intro's own declaration (::01), bullet 2 restates the entry pattern (the `→` ref lines themselves), no unique rule/nuance/example lost; retrieval — the glossary's retrieval instrument = the alphabetical entries + the refs, all retained; context — the section closes on the W—WANT entry (the natural alphabetical end); dependency — grep-verified zero tool probes (the sync audit's P2-7 absence checks cover only the Parts; `check_duplicates.py` excludes the family) + zero back-link registry entries. Family precedent: the iter-47 P2-7 cleanup (Parts) + iter-159 B disposal; A's benign instance remains the family's sole survivor (the `.part-resume` component keeps 1 live usage, stays registered in components.md) | MOVED **— executed iter 160** | fence #10; Editorial Policy 5-point check; the iter-47 P2-7 + iter-159 P-B-3 disposal precedents; the iter-158 «B/C slices co-decide» record |
| P-C-4 | — (observed) | master-only / metadata variances, never canonized: (a) the master CoT entry's Tier-0 enrichment (the master over-carries the §6.3 Embodiment-as-micro-CoT framing + the «CoT = дополнительный внутренний монолог сверх Embodiment, не замена ему» sentence vs the canon's compact «Tier 0 (без отдельного CoT-блока)» — the P4-4 enrichment family); (b) the intro's «всех технических терминов» coverage claim (the appendix carries 26 of the registry's 45 entries — the 20 promoted machine-layer terms absent; the appendix↔registry relationship rides D-5's switch-time disposition); (c) the canon front-matter staleness (`canonical_for: —` etc. — the repo-wide iter-152 family); (d) the heading-mismatch informational family (canon «C.1 Глоссарий» vs master h2 «Глоссарий» — the repo-wide non-numbered-master-h2 convention, informational by design); (e) the comment-noise drift entry stays (canon HTML comments vs master — informational); (f) components.md's `.part-resume` «Location: End of each Part» note now describes zero Part usages (the family's 1 live usage = Appendix A) — doc-accuracy staleness, no reader impact | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (the D slice + the canonical-audit + switch stages own their families; the appendix↔registry coverage question is D-5's recorded switch-time decision, not re-decided here; the CoT enrichment = the canonical-audit stage's master-side reconciliation family) | RECORDED **— deferred (iter 160)** | AGENTS.md scope discipline; the P4-5…P10-4 + P-app-4 + P-B-4 observation-package chain |
| P-C-5 | — (state) | STATUS iter-159 / PLAN row v2-build-appendix-c open / no map §5.21 | map §5.21 + STATUS iter-160 (Current State; the v2-architecture invariant extended to Appendices A/B/C; KI#70 row deleted per lifecycle — closed iter-158, 2 iterations elapsed 159/160; iter-160 KI-note; Next step re-pinned to the Appendix D slice) + PLAN v2-build-appendix-c → COMPLETE + the appendix-d row + iter-160 history note + worklog + CHANGELOG + NAV §7 de-stale (the appendix slices: A/B/C) | EXECUTED **— iter 160** | iter-147…159 state-package pattern |

Accounting: 1 presentation-column seeding (26 rows: 26 `open`, count script-verified; zero rows
added — the total stays 504) + 2 canon compressions (P-C-2: ::03 R01 −0 net lines [1 line rewritten];
::05 R02+R13 −10/+2 lines — the git diff `2 insertions(+), 10 deletions(-)`) + 2 master mirror
completions (P-C-3: the ::03 fold + the ::05 compression) + 1 master disposal (P-C-3: the v7-era
`part-resume`, REMOVED_WITH_REASON — the iter-158 «B/C slices co-decide» sub-decision executed at
C) + 1 observation package deferred (P-C-4) + 1 state package (P-C-5). Byte-unchanged: canon
`appendix_glossary.md` outside the two entry rewrites; master `appendix_glossary.html` outside the
three P-C-3 edits; `docs/canon/glossary_registry.md` + `data/glossary.json` byte-stable (the
appendix edit touches no registry row — the glossary-parity chain re-verified); all other
master/canon files; matrix tag/decision/load/repeat columns unchanged. Deferred (recorded, out of
scope): the P-C-4 observation package (the D slice + the canonical-audit/switch stages); KI#77-e
(open, untouched — the ::21 R11 card-total framing documented, not re-decided); KI#79 (open,
untouched). Root fallbacks regenerated with the slice (`parts/appendix_glossary.html`; root
`index.html` timestamp; hash `2ab607d6` unchanged — `src/shell/index.html` untouched). Drift: see
the iter-160 worklog for the pre/post capture (141 → expected ≤141 — the CORE-DIRECTIVES
plain-text entry clears: the canon paragraph and the master paragraph now match on the compressed
form; the comment-noise entry stays). Next: **the Appendix D (character_map) v2 build slice**
(canon-only appendix; the KI#77-b/c/d stale-ref family + the R27 budget-range framing ride the
owner-gated ed-5 gate — the slice documents, does not re-decide; PLAN row v2-build-appendix-d) →
parity audit → canonical audit (the P4-5…P10-4 + P-app-4 + P-B-4 + **P-C-4** master-only
enrichment observations ride this stage) → reader-path audit → switch.

### 5.22 Appendix D v2 build slice (seeded + executed iter 161 — v2 build phase, fourth appendix/Reference slice; **the appendix-slice stage COMPLETE**)

Scope: **Appendix D — Character Map** (`docs/canon/appendix_character_map.md` — **canon-only**:
no master HTML artifact, never runtime-rendered — the iter-158 WIRE loads Appendices A/B/C only,
per the `APPENDIX_GUIDE_ORDER` map; the appendix's conceptual-only section-ID status = the
`content_map.md` counting convention: **96 rendering + Part 0 ×2 + Appendix D ×1 = 99 declared
IDs**; 1 section / 6 matrix rows; DEC-24 Q6 guide order — fourth appendix; the pinned STATUS
Next-step row 1, **not owner-gated** — the appendix slices are the pinned track continuation).
Mechanism: the ratified spec §7 slice shape (evidence → canon restructure → full battery) —
fifteenth application, reusing the §5.8–§5.21 pattern with the canon-only adaptation (the master
step N/A — zero mirror work, zero root fallbacks; the build-side expectation = the `index.html`
timestamp churn only, restored per AGENTS.md delivery discipline). Primary reader mode:
**Reference** (spec §3: compact rule/lookup entries with canonical-home links — the comparison
table IS the lookup payload). Editorial Policy 5-point check applied per candidate evaluation
(zero edits qualified — documented below). Acceptance gate: the full battery (sync 97/97 ·
parity ×7 · tests · baselines · build/validate/validate:master/version:check · runtime unchanged
— 96 sections) **+ the PLAN row's canon-only scope clauses** (KI#77-e/R27 documented, not
re-decided; the conceptual-only section-ID status documented). No cluster parity gate extends
this slice (Appendix D hosts no cluster owner — the seven cluster owners sit in the Parts,
verified §5.18 P10-1's list).

**F2 presentation map (spec §4.1 mechanism, fifteenth application):** the appendix_character_map
matrix table now carries the `presentation` column (**6 rows: 6 `open`** — count
script-verified); the stale-note family refreshed (the ::02 KI#77-b/c stale-ref claims described
the pre-iter-127 state — repaired ed-8/R18, pickaxe `8a365553`, verified at this slice: the Omnis
row carries «Part 5 §5.1/§5.3 (концепты полюсов и перегрузки OCEAN)», zero Part-8 refs, zero
«Part 5 (эннеаграмма)», the full «§6.5–§6.6» form; the ::04 R17 note described the pre-strip
state — executed iter 128, pickaxe `bb4ed292`, verified: the history label gone, the labeling
substance kept); the L-refs verified unchanged per §1.1 (all six block line-ranges verified
against HEAD); the appendices verdict extended with the D-sliced line + **the appendix-slice
stage COMPLETE** (the F2 column now covers the full guide — Parts 1–10 + Appendices A/B/C/D,
iters 147–161); matrix §1.2 scope note extended to full coverage. Zero `collapsible` /
`canonical-link` / `reference-relocate` / `delete-candidate` / `—` — the Reference-layer verdict
holds (the comparison table + the labeling note + the apply-layer recommendation + the one-place
rule = compact lookup payload; spec §3). F5: verified F5-approximate — the Reference-layer shape
is the target form (intro → the lookup table → canonical-home links → the labeling note → the
apply recommendation → the governing rule); zero restructure. F6: zero wraps (non-rendering — no
master HTML carries the blocks). F3/F4: no checklists / no example tiering in the appendix.

| P# | Matrix row | OLD (v1) | NEW (v2) | Status | Basis |
|---|---|---|---|---|---|
| P-D-1 | — (evidence) | matrix appendix_character_map table: 8 columns, no presentation axis; 6 rows carrying the pre-iter-127 KI#77-b/c stale-ref claims (::02) + the pre-strip R17 note (::04) | `presentation` column seeded (6 rows: 6 `open` — count script-verified); the stale-note family refreshed (the KI#77-b/c claims marked REPAIRED iter 127 — the fixed forms verified at HEAD, the historical audit record kept; the R17 verdict marked EXECUTED iter 128 — the strip verified); the ::05 R27 note kept + the owner-gate line made explicit (ed-5/KI#77-e — documented, not re-decided); the L-refs verified unchanged per §1.1; the §14 preamble note added; the appendices verdict extended (the D-sliced line + the stage-COMPLETE line); §1.2 extended to full-guide coverage | EXECUTED **— iter 161** | DEC-24 Q2 (F2 matrix-column mechanism); the iter-149…160 stale-note-refresh precedent; the matrix's own §1.1 re-derivation convention |
| P-D-2 | `appendix_character_map::01–::06` (canon) | the 41-line canon file — verified at HEAD: the intro (::01), the 5-row comparison table (::02 — all usage refs the post-iter-127 fixed forms; the OCEAN values consistent with §5.1/§9.7/§10.1–§10.4/the bible), the Ссылка row (::03 — full `[ref: …]` forms), the Метки OCEAN note (::04 — the post-iter-128 stripped form), the РЕКОМЕНДАЦИЯ (::05 — the R27 budget ranges present), the one-place Правило (::06) | **zero edits — byte-stable** (sha256-verified pre/post: `9947569b92b2dc4a…`; the Appendix A/B zero-restructure precedent). F5-approximate verified: the Reference-layer shape is the target form; the only COMPRESS verdict (::04 R17) executed iter 128 pre-slice; zero open compression candidates (the ::05 R27 ranges + the KI#77-e framing stay **owner-gated ed-5** — the slice documents, does not re-decide); the ::06 «Part 10 §10.X» generic form = R18's declared out-of-scope remainder (matrix-unflagged by design — kept); section ID `appendix_character_map` preserved (fences #4/#5 clean; the conceptual-only convention intact); zero tool probes on the file's content (the sync audit carries no appendix_character_map probes; the drift tool's CANON_ONLY_FILES listing = informational by design) | VERIFIED **— zero edits (iter 161)** | Editorial Policy (compress redundant presentation, never unique capability — zero qualifying edits); the iter-158/159 A/B canon-byte-stable precedents; the R27/KI#77-e owner-gate record |
| P-D-3 | — (master) | N/A — canon-only appendix: no `src/master/appendix_character_map.html` exists (verified); never runtime-rendered (the iter-158 WIRE's `APPENDIX_GUIDE_ORDER` = A/B/C) | N/A — zero mirror work, zero root fallbacks (the PLAN row's canon-only clause); the verification build regenerates only the root `index.html` timestamp churn — restored per AGENTS.md delivery discipline; runtime unchanged (96 sections — structural probe on `dist/`) | N/A **— by design** | the content_map counting convention (iter 117/126); DEC-24 Q7 (the WIRE scope = the manifest's three appendix files) |
| P-D-4 | — (observed) | canon-side variances, never rendered: (a) the front-matter staleness (`last_synced: 2026-07-08 (iter 40 — KI#29 OCEAN labeling fix)` + the `migration_status` history tail — the repo-wide iter-152 family, rides the v2 canon-format decision); (b) the ::06 «Part 10 §10.X» generic ref form (R18's declared out-of-scope remainder — matrix-unflagged by design); (c) the drift tool's canon-only file listing (appendix_character_map: 1 canon-only section, 0 master — informational by design, `CANON_ONLY_FILES`) | recorded as OBSERVATIONS, deferred — no disposal, no canonicalization (the front-matter family rides the v2 canon-format decision; the generic form rides R18's out-of-scope design; the drift listing is the tool's by-design classification) | RECORDED **— deferred (iter 161)** | AGENTS.md scope discipline; the P4-5…P10-4 + P-app-4 + P-B-4 + P-C-4 observation-package chain |
| P-D-5 | — (state) | STATUS iter-160 / PLAN row v2-build-appendix-d open / no map §5.22 | map §5.22 + STATUS iter-161 (Current State; the v2-architecture invariant extended — **the appendix-slice stage COMPLETE** (A + the KI#70 WIRE iter 158, B 159, C 160, D 161); iter-161 KI-note — no lifecycle deletions due, no new KI; Next step re-pinned to **the parity-audit stage**) + PLAN v2-build-appendix-d → COMPLETE + the v2-parity-audit row + iter-161 history note + worklog + CHANGELOG + NAV §7 de-stale (the appendix slices: A/B/C/D — stage COMPLETE) | EXECUTED **— iter 161** | iter-147…160 state-package pattern |

Accounting: 1 presentation-column seeding (6 rows: 6 `open`, count script-verified; zero rows
added — the total stays 504) + 0 canon edits (P-D-2: byte-stable, sha256-verified) + 0 master
edits (P-D-3: canon-only by design) + 1 observation package deferred (P-D-4) + 1 state package
(P-D-5). Byte-unchanged: canon `appendix_character_map.md` (sha256 `9947569b92b2dc4a…` pre/post);
all master/canon files; `data/*.json`; matrix tag/decision/load/repeat columns unchanged. Deferred
(recorded, out of scope): the P-D-4 observation package (the front-matter family / the R18
out-of-scope generic form / the drift canon-only listing — the audit/switch stages own their
families); **KI#77-e (open — the R27 budget-range framing owner-gated ed-5, documented, not
re-decided)**; KI#79 (open, untouched). No root fallbacks regenerate with this slice
(non-rendering; the `index.html` timestamp churn restored — the PLAN row's clause). Drift: 140
pre/post — zero canon/master content edits, zero drift-mover entries expected (verified by JSON
pre/post diff). Next: **the parity-audit stage** (spec §8 stage 2: the 7 cluster gates + sync +
drift must pass on the completed v2 corpus; any new cluster discovered during the build gets its
own gate before the stage closes; PLAN row v2-parity-audit) → canonical audit (the P4-5…P10-4 +
P-app-4 + P-B-4 + P-C-4 + **P-D-4** observations ride this stage) → reader-path audit → switch.


### 5.23 Parity audit stage record (executed iter 162 — the migration tail's first stage, spec §8 stage 2)

Scope: **the completed v2 corpus** (Parts 1–10 + Appendices A/B/C/D post-slicing — the F2
full-coverage matrix state, iters 147–161; the pinned STATUS Next-step row 1, **not owner-gated**
— the migration tail's first stage, PLAN row v2-parity-audit). Mechanism: **a full-corpus
re-verification pass, not the per-slice green batteries** — the existing audits re-run as one
stage battery at HEAD `b8e61adf` (fresh clone, clean worktree) + the corpus-snapshot verification
(the 96-section runtime + the F2 full-coverage matrix state — both script-verified) + the
discovered-cluster sweep + the deferred observation packages' disposition-ownership sweep.
Acceptance gate (the PLAN row): all gates PASS on the completed corpus; any FAIL = a KI +
reconciliation before the stage closes — **zero FAILed, zero content edits, zero reconciliation**
(canon stays untouched; fence #10 unexercised); runtime unchanged (96 sections).

**Stage gate battery (executed on the corpus, zero edits — all commands run in the sandbox;
pnpm via `npx pnpm@10`):**

| PA# | Gate | Verified result | Status | Basis |
|---|---|---|---|---|
| PA-1 | the seven cluster parity gates | `audit_glossary_parity.py` PASS (DEC-17/18 chain intact) · `audit_core_directives_parity.py` PASS (§7A.2 canonical, E08 the one visual) · `audit_token_budget_parity.py` PASS (§7A.12 owner, E01/E15 SHARED_REFERENCE) · `audit_enneagram_parity.py` PASS (§5.4 → generated `data/enneagram.json`) · `audit_diagnostics_parity.py` PASS (§9.6 canonical, E13 re-pointed) · `audit_voice_parity.py` PASS (§3.2 owner, widget constants parity-locked) · `audit_sampling_parity.py` PASS (§7A.6 owner, E17 re-pointed, OBSERVATION intact) | VERIFIED **— iter 162 (×7 PASS)** | spec §8 stage 2 + the cluster inventory (spec §6); AGENTS.md canon-audits |
| PA-2 | canon→master sync + drift | sync **97/97 PASS** (`audit_canon_master_sync.py`); drift **140 actionable** (`audit_canon_master_drift.py --actionable-only`, informational exit 0 — the JSON pre/post capture **identical**, zero drift-mover entries: the stage made zero content edits; the 140 baseline attributed to the v9-era paragraph families + the comment-noise/KI#79-boundary entries per the slice records) | VERIFIED **— iter 162** | fence #10; the PLAN row's drift clause (KI#79's regex family stays OPEN — informational tool, no reader impact) |
| PA-3 | the full battery | build ✓ (unified + shell + root fallbacks; hash `2ab607d6` unchanged — shell untouched) · validate ✓ · validate:master ✓ (12 checks) · version:check ✓ 9.2.6 (4-place sync) · tests **64/64** · lint ✓ (eslint `src/` clean) · qa:csp PASS · qa:bundle PASS · qa:contrast PASS · qa:doc-versions exit 0 (1 pre-existing warning — CONTENT_RESTRUCTURE_PLAN.md, not this stage's file) · qa:english **18** / qa:syntax **238** (baselines exact, counts not increased) | VERIFIED **— iter 162** | AGENTS.md common commands + DEC-13 (gates judged individually) |
| PA-4 | the corpus snapshot | **runtime:** 96 sections on `dist/` (structural probe: every `<section data-section>` of the 11 parts + 3 appendices == the manifest anchors, exact order; the loader's `APPENDIX_GUIDE_ORDER` sorts A→B→C — Appendix D absent by design; the content_map convention: 96 rendering + Part 0 ×2 + Appendix D ×1 = 99 declared IDs). **matrix:** F2 full coverage — **15/15 slice targets** (Parts 1–10 + A/B/C/D) carry the `presentation` column, zero missing, zero values outside the ratified vocabulary (count script: `/home/z/my-project/scripts/iter162_f2_coverage.py` — the in-sandbox stage tool, the iter-147…161 per-Part count precedent): Part 1 = 30 · Part 2 = 26 · Part 3 = 46 · Part 4 = 51 (50 `open` + 1 `canonical-link`) · Part 5 = 43 · Part 6 = 25 · Part 7A = 94 (86/4/2/2) · Part 7B = 33 (25/8) · Part 8 = 40 · Part 9 = 43 (38/3/1/1) · Part 10 = 20 (9/11) · A = 6 · B = 4 · C = 26 · D = 6 — **every count == its slice record**; total 493 presentation rows + 11 Part 0 pre-F2 rows = **504 = the disclosed living total** | VERIFIED **— iter 162 (corpus snapshot recorded)** | the PLAN row's acceptance clause (the corpus snapshot = the 96-section runtime + the F2 matrix state) |
| PA-5 | the discovered-cluster sweep (spec §8 stage 2: «any cluster discovered during the build gets its own gate before the stage closes») | **zero new clusters** — every build slice's record carries the explicit `no new cluster parity gate` verification (Parts 1–10 + the appendices: the seven cluster owners — §7A.2 / §7A.6 / §7A.12 / §5.4 / §9.6 / §3.2 / the glossary registry — cover the corpus; KI#84 was a single-value defect, not a cluster — CLOSED iter 157); the seven existing gates re-verified green as one corpus pass (PA-1) | VERIFIED **— zero (no new gate needed)** | spec §8 stage 2; the per-slice no-new-cluster records (maps §5.8–§5.22) |
| PA-6 | the deferred observation packages' disposition-ownership sweep | **12/12 packages recorded deferred** (P4-5 / P5-5 / P6-4 / P7A-4 / P7B-4 / P8-4 / P9-5 / P10-4 / P-app-4 / P-B-4 / P-C-4 / P-D-4 — each one map row, grep-verified; every record's disposition = deferred, ownership = **the canonical-audit stage**); nothing moves at this stage — the parity audit verifies the gates, not the observations (the PLAN row's clause) | VERIFIED **— ownership confirmed, nothing moved** | the PLAN row's sweep clause; the observation-package chain (maps §5.11–§5.22) |
| PA-7 | — (state) | STATUS iter-162 (Current State; the v2-architecture invariant extended — **the parity-audit stage COMPLETE**; iter-162 KI-note — no lifecycle deletions due, no new KI; Next step re-pinned to **the canonical-audit stage**) + PLAN v2-parity-audit → COMPLETE + the v2-canonical-audit row + the iter-162 history note + worklog (iter-161 → one-liner; the ≤10 cap trim) + CHANGELOG (iter-162 entry; iter-160 collapsed) + NAV §7 de-stale (the migration tail: parity audit COMPLETE) | EXECUTED **— iter 162** | the iter-147…161 state-package pattern |

Accounting: **zero content edits** — canon byte-stable, master byte-stable, `data/*.json`
byte-stable, matrix rows unchanged (the §5 preamble count stays 504; no presentation value
touched); zero root fallbacks regenerate (the verification build's only worktree effect = the
root `index.html` timestamp churn — **restored** per AGENTS.md delivery discipline; hash
`2ab607d6` unchanged); drift 140 pre/post **identical** (JSON pre/post diff). KI state: zero
new KI (all gates green); **KI#77-e stays OPEN (owner-gated ed-5 — the R27 budget-range framing
family, rides the canonical-audit/ed-5 owner call)**; KI#79 stays OPEN (the drift-tool regex
family — informational, the PLAN ki-79 row deferred unless a migration slice requires it). The
stage closes with the existing seven cluster gates — no new gate, no reconciliation. Next: **the
canonical-audit stage** (spec §8 stage 3: one canonical home per concept across the whole guide —
the machine-checkable content-map ↔ canon ↔ glossary-registry pass + the master-only enrichment
observation packages P4-5…P-D-4 ride this stage; PLAN row v2-canonical-audit) → reader-path
audit → switch (Q8 criteria: stages 2–4 green in two consecutive full-battery runs + no OPEN KI
in the affected families + owner call; Q9: v1 freezes/archives at switch).


### 5.24 Canonical audit stage record (executed iter 163 — the migration tail's second stage, spec §8 stage 3)

Scope: **the machine-checkable cross-pass on the full corpus** — `docs/content_map.md` ↔
`docs/canon/*.md` ↔ `docs/canon/glossary_registry.md` ↔ `src/master/*.html` — every concept
checked for a single canonical home (fence #11 / one definition — one place; the KI#82-style
Notes checks extended repo-wide) + the 12 observation packages' dispositions (the pinned STATUS
Next-step row 1, **not owner-gated** — the migration tail's continuation, PLAN row
v2-canonical-audit; the owner's session go-ahead «продолжай работы по планам!»). Semantic
dispositions follow the scope discipline: fix only when the canonical owner is unambiguous
(canon wins, fence #10); owner-gate where semantics are involved; the front-matter/E-declaration
families ride the v2 canon-format decision (switch-time D-5). Content edits only as disclosed
dispositions (5-point check, Editorial Policy). Acceptance: every concept verified single-homed
(or the variance recorded + dispositioned); the stage report records the corpus state + the
package dispositions.

**Stage gate battery (executed at HEAD `cf329734`; the in-sandbox stage tool
`/home/z/my-project/scripts/iter163_canonical_audit.py` — the iter162_f2_coverage.py precedent;
all commands run in the sandbox; pnpm via `npx pnpm@10`):**

| CA# | Gate | Verified result | Status | Basis |
|---|---|---|---|---|
| CA-1 | content_map → canon (structural) | **99/99 map rows resolve**: every row's Canon § matches an actual `## §num` header in the named canon file + the row's `data-section` ID is declared via `` `data-section: …` `` inside that § block (the §1.2 subsection + the Appendix D H1-level conventions verified as declared) | VERIFIED **— iter 163 (99/99)** | fence #11; the map's Validation Checklist; PLAN row scope |
| CA-2 | canon → content_map (orphan check) | **99 canon-declared IDs, zero orphans** — every `data-section` declaration across the 16 canon files has a map row (96 rendering + Part 0 ×2 + Appendix D ×1 = 99, the counting convention verified) | VERIFIED **— iter 163 (99/99)** | the map's Purpose rules («no row = orphan») |
| CA-3 | content_map ↔ master (rendering) | **96 == 96 both directions**: every rendering map ID exists as `data-section="…"` in `src/master/*.html` and vice versa; zero duplicate IDs; the conceptual-only IDs (Part 0 ×2, Appendix D ×1) do **not** render — by design | VERIFIED **— iter 163 (96/96)** | fences #4/#5; the iter-158 WIRE corpus state |
| CA-4 | glossary registry ↔ map/canon | **45 entries, heads unique; 45/45 `home=` targets are declared canon section IDs with map rows; 45/45 `[ref: file §num — Title]` targets resolve** to actual canon headers (the DEC-17/18 chain's pointer layer fully wired) | VERIFIED **— iter 163 (45/45/45)** | DEC-17/18; the registry pattern |
| CA-5 | concept single-home | **zero duplicate concepts, zero duplicate IDs** across the whole map; the seven cluster owners' homes verified consistent with the invariants (§7A.2 / §7A.6 / §7A.12 / §5.4 / §9.6 / §3.2 / the glossary registry — each re-verified green by its parity gate, CA-7 below) | VERIFIED **— iter 163 (0 violations)** | fence #11 (one definition — one place) |
| CA-6 | KI#82-style Notes checks (repo-wide extension) | **4 stale Notes found + repaired** (doc-layer, the audit's own surface): (1) `p1_card_overview` — «4 блока карточки: SP, Description, Examples, Greeting» → the canon §1.2/E01 form «5 блоков: System Prompt / Description / Examples + Anchors / Greeting / Lorebook» + the subsection title «Token Budget и конвейер сборки» → the DEC-16 canon form «Бюджет токенов и конвейер сборки»; (2) `appendix_model_table` — «7-row table» → the actual **9-row** capability table (+ НАБЛЮДЕНИЕ + «Ключевые следствия»); (3) `appendix_glossary` — «27 терминов» → **25 статей** v1-источника + the registry relationship recorded (45 = 25 merged-canonical + 20 machine-layer, DEC-17/18); (4) the map header/footer stamps (iter 117 → iter 163). Counter-claims verified correct: §9.5 «10 строк» (12 table lines = 10 data rows), Appendix D «5 канонических персонажей», §1.8 «6 вопросов», Part 8 «15 анти-паттернов», AUTO_TOC mechanism | EXECUTED **— iter 163 (4 repaired, 5 verified correct)** | the KI#82 precedent (iter 142: §3.2 stale Notes repaired at the slice); the map's mirror role |
| CA-7 | the full gate battery (post-disposition re-run) | the 7 cluster parity gates **×7 PASS** · sync **97/97 PASS** · drift **140 actionable, pre/post JSON identical** (zero drift-mover entries — the §9.7 canon+master pair edited in lockstep, the §9.3 mirror completion sits inside a table row the paragraph tool does not blob) · build ✓ (hash `2ab607d6` unchanged) · validate ✓ · validate:master ✓ · version:check ✓ 9.2.6 · tests **64/64** · lint ✓ · qa:csp/bundle/contrast PASS · qa:doc-versions exit 0 (1 pre-existing warning) · qa:english **18** / qa:syntax **238** (baselines exact — the EN-leftover repair touched no baseline-counted leak) | VERIFIED **— iter 163 (all green)** | AGENTS.md common commands; DEC-13 |
| CA-8 | — (the observation-package dispositions) | see the disposition table below | EXECUTED **— iter 163** | the PLAN row's disposition clause |

**The executed dispositions (content edits — each passes the 5-point check, Editorial Policy):**

1. **P9-5(b) — the §9.7 Walter-line E=30 mislabel — EXECUTED (canon wins):** the canon
   `part_09.md` §9.7::04 line + the master mirror re-labeled — «Уолтер Уайт (C=85, A=25, E=30 —
   выраженные экстремумы)» → «(C=85, A=25 — выраженные экстремумы; E=30 — осторожная зона)».
   Rationale: a fence-#11 single-canonical-definition violation with an unambiguous canonical
   owner — §5.1 RULE (extreme = строго <30 или >70) + §10.2's own list («Экстремумы: Высокая C
   (85), Низкая A (25); Cautious zones: E=30, N=60») classify E=30 as a cautious zone; §9.7
   contradicted both. No value decision involved (the classification is already canonical
   elsewhere; all three values kept, only the labels aligned). 5-point check: capability — the
   Walter test-example reference retained with correct classification; coverage — §10.2's full
   analysis untouched; retrieval — same position/ref-target; context — reads naturally;
   dependency — one tool anchor pinned the old wording (`audit_diagnostics_parity.py`
   `WALTER_97_ANCHOR`) — re-pointed in step (the iter-148/155/156 disclosed tooling-alignment
   precedent); zero sync-audit probes (grep-verified).
2. **P9-5(d) — the master §9.3 EN leftovers — EXECUTED (fence #10 mirror completion):**
   «☐ Person defined?<br/>☐ Narrative tense?» → «☐ Персона определена?<br/>☐ Нарративное
   время?» — the canon §9.3 row already carries the Russian forms (DEC-16); master lagged
   (pre-DEC-16 residue). The iter-155/158 mirror-completion precedent. qa:english baseline
   unaffected (the strings were not counted among the 18 leaks — verified pre/post = 18).
3. **P-C-4(f) — the components.md `.part-resume` Location note — EXECUTED (doc de-stale):**
   «End of each Part (Part 1 through Part 10)» → the actual state: 1 live usage (Appendix A,
   `src/master/appendix_mbti.html`); the Part 1–10 instances removed iter 47 (P2-7); the
   Appendix B/C instances disposed iters 159/160; the class stays registered. The doc's
   Last-Updated stamp aligned (2026-09-16) per the qa:doc-versions convention.
4. **P-C-4(b) — the count record corrected:** the iter-160 observation recorded «the appendix
   carries 26 of the registry's 45 entries» — the verified count is **25** (25 canon `###`
   articles + 25 master `glossary-entry` divs; the registry's own split: 25 merged-canonical +
   20 machine-layer = 45 — the arithmetic now fits exactly). The matrix row corrected in step.
   The coverage question itself (the «всех технических терминов» claim vs the 25/45 reality)
   stays **D-5's switch-time disposition** per its record.
5. **The 4 map-layer stale Notes (CA-6) — EXECUTED** (the audit's own surface — see CA-6).

**The recorded dispositions (deferred — the scope discipline: discovering ≠ permission to fix):**

- **OWNER-GATE (the master-only enrichment / variance families — both directions change
  reader-visible knowledge; editorial value decisions):** P4-5 (all three §4.8/§4.4
  enrichments) · P5-5(b)(c)(e)(f) · P6-4(a)(c) · P7A-4(a)(c)(d) — **incl. the §7A.7
  presentation+value variances (the recorded «needs the reconciliation owner call»)** ·
  P7B-4(a)(c)(d) · P8-4(a)–(d)(f) · P9-5(c) (the §9.11 EN blockquote — the DEC-16 canon
  catch-up, semantic) · P10-4(a)(b)(c) (the Omnis «Звук/Голос» variance, Elena's card lines,
  the top-of-part ПРАВИЛО callout) · P-app-4(f) (the link-vs-text variance family) ·
  P-B-4(d) (the part_04 model-note span, the P4-4 family) · P-C-4(a) (the master CoT Tier-0
  enrichment). These ride the owner's ed-* / reconciliation calls (the KI#77-e/ed-5 family
  shape) — the stage documents, the owner decides.
- **KI#77-e / R27 (ed-5) — stays owner-gated** per the PLAN row's explicit clause: the stage
  documents (the Part 10 budgets ~540/1000, ~1100, ~2150, ~1500+ vs the ::05 ranges
  ~440–890 / ~1500–1800 — re-verified unchanged at this stage), the owner decides.
- **V2-CANON-FORMAT DEFERRAL (switch-time, D-5):** the front-matter staleness family
  (P5-5(a), P6-4(d)(e), P7A-4(e), P7B-4(b), P10-4(d), P-app-4(c), P-B-4(c), P-C-4(c),
  P-D-4(a) — the repo-wide iter-152 family) + the E-declaration gaps (E09/E11/E02/E16/E18 —
  the Registry A dispositions stay PROPOSED until the v2 canon-format decision).
- **NO ACTION (recorded, by design):** the formatting-churn items (P7B-4(e), P8-4(e),
  P9-5(f)) — not F-policy material; the drift-tool boundary artifacts (P8-4(g), P9-5(g),
  P10-4(e), P-B-4(b)(e), P-C-4(d)(e), P-D-4(c)) — informational by design (KI#79-adjacent);
  the heading-mismatch family (P-B-4(b), P-C-4(d)) — the non-numbered-master-h2 convention;
  P-D-4(b) — R18's declared out-of-scope generic form; P-app-4(d) — the manifest alphabetical
  order (a supersedeable future DEC if the owner prefers guide order in the manifest);
  P6-4(b) — the difficulty-comment divergence (non-rendering, no runtime consumer).
- **RESOLVED (verified at HEAD — no action needed):** P9-5(a) = KI#84 (CLOSED iter 157, the
  WALTER_DELETED absence guard green) · P9-5(e) = the L397 typo (EXECUTED iter 157, P10-2) ·
  P10-4(f) = the iter-156 «5 sections» miscount (corrected in the registry iter 157) ·
  P-app-4(e) = the stale matrix vague-notes (the B/C/D slices refreshed them, verified at
  HEAD) · P-B-4(a) = the part-resume co-travelers (B disposed iter 159, C iter 160; **A's
  benign instance KEPT** per the iter-159 5-point record — the family's 1 live usage,
  documented in components.md by this stage's disposition 3).

Accounting: **7 files changed** — `docs/content_map.md` (4 stale Notes + stamps) ·
`docs/canon/part_09.md` (the §9.7 re-label) · `src/master/part_09.html` (the §9.7 mirror + the
§9.3 RU mirror completion) · `parts/part_09.html` (the regenerated root fallback — staged
together with the master edit per AGENTS.md git safety) · `scripts/audit_diagnostics_parity.py`
(the WALTER_97_ANCHOR re-point) · `docs/components.md` (the .part-resume Location de-stale +
stamp) · `docs/research/editorial_matrix.md` (the P-C-4(b) count correction). Runtime unchanged
(**96 sections** — zero structural edits; the content edits are in-place wording/label repairs).
Drift **140 pre/post identical** (no re-baseline needed — the PLAN row's clause satisfied with
zero delta). KI state: **zero new KI** (the executed items were all pre-recorded observations
dispositioned per their records; no new defect discovered — the 4 stale Notes = the audit's own
doc surface, repaired in place; the map-layer findings carry no reader impact); **KI#77-e stays
OPEN (owner-gated ed-5)**; KI#79 stays OPEN (the drift-tool regex family — informational).
Next: **the reader-path audit** (spec §8 stage 4: per mode Learn/Build/Debug/Reference — entry
point → task completion without leaving the mode's backbone; the iter-139 Debug precedent
`debug_readerpath_audit_iter139.py` replicated for the other three modes) → switch (Q8
criteria: stages 2–4 green in two consecutive full-battery runs + no OPEN KI in the affected
families + owner call; Q9: v1 freezes/archives at switch).


### 5.25 Reader-path audit stage record (executed iter 164 — the migration tail's third stage, spec §8 stage 4)

Scope: **the per-mode reader-path verification on the completed v2 corpus** — the reader-mode
spec §3 (Learn/Build/Debug/Reference — the structural overlays on the same canonical content):
each mode's entry point → its backbone sections → task completion, without requiring the reader
to leave the mode's path (the pinned STATUS Next-step row 1, **not owner-gated** — the
migration tail's continuation, PLAN row v2-readerpath-audit; the owner's session go-ahead
«продолжай работы по планам!»). Mechanism: the iter-139 Debug precedent re-run for the Debug
mode + **the committed per-mode stage tool `scripts/readerpath_audit_iter164.py`** (the iter-139
replication for the other three modes — one-shot verification on the built artifact:
parts/*.html + the manifest + data/glossary.json + the shell; hard checks fail the run, recorded
findings print with their dispositions). Discovered path gaps = record + disposition (fix only
if in scope — structural/navigation wiring, not content semantics; semantic/owner-gated
families stay owner-gated per §5.24). Acceptance: every mode verified entry→completion on its
backbone (or the gap recorded + dispositioned); the stage report records the per-mode path
state. **Content edits: zero** (the two discovered gaps are owner-gated structural decisions —
see the findings table below).

**Stage gate battery (executed at HEAD `5a30f610`; all commands run in the sandbox; pnpm via
`npx pnpm@10`):**

| RP# | Mode / gate | Verified result | Status | Basis |
|---|---|---|---|---|
| RP-1 | DEBUG — the iter-139 precedent re-run | `debug_readerpath_audit_iter139.py` **PASS** — the chain symptom → cause → test → one-change → validation green on the built artifact (3 symptoms reachable in §9.6 master+built + the E13 embed; every diagnosis anchor resolves; §9.7 test + §9.2 one-change back-linked + §9.9/§9.11 validation wired) — the mig-3 chain unbroken by the post-iter-139 corpus work | VERIFIED **— iter 164** | PLAN row (the Debug re-verification clause); map §5.5 |
| RP-2 | LEARN — entry + the linear backbone | **entry:** the shell TOC panel + FAB present; the lazy-loader manifest auto-load starts at `part_01.html` → `p1_value_proposition` (the first content section) · **the linear order:** the manifest parts == the guide order (part_01…part_10, 7A before 7B); every part renders its manifest anchors in **exact order** (the PA-4 structural probe re-verified per part); **96 rendering sections** · **the visibility model:** difficulty metadata **96/96** (one comment per master section) + F6 `<details class="interactive">` = 17 live usages · **completion:** the manifest tail = Part 10's 4 worked blueprints, the appendices follow (the Reference tail) | VERIFIED **— iter 164 (the mode's linear task completes in-backbone)** | spec §3 (Learn row); F1/F5/F6 (DEC-24) |
| RP-3 | BUILD — entry + the assembly backbone | **entry:** `p1_prebuild_checklist` (the F3 decision-input instrument, iter 147) + `p7a_assembly_pipeline` (§7A.13) + `p7a_token_budget` (§7A.12) + the Part 10 blueprints — all present master+built · **the wiring:** every link target in the three entry blocks resolves in the built artifact (prebuild → 11 targets incl. all 4 blueprints + the model table; pipeline → 10 targets; §7A.12 → `appendix_model_table`, the Build→Reference value hop); the expected target sets verified · **default visibility:** §7A.6 + §7A.7 + §7A.12 + 9 ШАБЛОН callouts in 7A/7B + the §7A.13 budget table with the «Итого» row · **completion:** the §7A.13 final assembly checklist (6 ☐ items) + 4 «Демонстрирует» blueprint annotations. NOTE (by design, recorded): the validation handoff (§9.3 block checklist / §9.11 pre-deploy) lives in the **Debug** backbone per spec §3 — F3's validation class = §9's territory; the Build path completes at the assembly checklist | VERIFIED **— iter 164 (the mode's construction task completes in-backbone)** | spec §3 (Build row); F3 (DEC-24); map §5.8 (the iter-147 prebuild reframe) |
| RP-4 | REFERENCE — entry + the lookup hop + the appendix layer | **entry (JS-on):** the shell glossary side-tab + panel + content div; the lazy-loader `loadGlossaryContent` + the `glossary-link` anchor mechanism; `data/glossary.json` = 45 generated terms (DEC-17/18) · **entry (no-JS):** `parts/glossary.html` present (the `no-js-only` generated page, required by the artifact contract — `validate-artifact.mjs` special files) · **the lookup hop:** the 45 entries' `anchor_id`/`cross_refs` = **48 distinct targets, 48/48 resolve** in the built artifact — zero broken canonical-home links; the no-JS page's `glossary-ref` links all resolve · **the appendix layer:** the manifest appendices == A/B/C; `APPENDIX_GUIDE_ORDER` = A→B→C; the «Приложения» TOC group; Appendix D canon-only — zero master file, zero runtime links, the content_map record verified | VERIFIED **— iter 164 (the mode's lookup task completes in-backbone; Appendix D stays the declared canon-only exception)** | spec §3 (Reference row); DEC-17/18; the iter-158 WIRE (DEC-24 Q7) |
| RP-5 | the findings sweep (the PLAN row's gap clause) | **2 gaps discovered → recorded + dispositioned (both owner-gated structural decisions; zero in-scope structural/navigation wiring fixes were executable without owner calls):** **LEARN-1** — the spec §3 Learn entry names Part 0 (how to read) — Part 0 is canon-only since iter 38 (no master file, no manifest entry, never rendered; the content_map convention) → the runtime Learn entry = the TOC + the Part 1 auto-load (verified working, RP-2); **REFERENCE-1** — the no-JS Reference entry (`parts/glossary.html`) is not navigable from the site root: the shell `<noscript>` block carries an enable-JS notice with no link, no built page links `parts/glossary`, the page is reachable only by direct URL (the JS-on entry is fully wired, RP-4). Both ride the owner's switch-time call — see the findings dispositions below | RECORDED **— iter 164 (2 findings, 2 owner-gates)** | the PLAN row's disposition clause; AGENTS.md scope discipline; spec §7 (the shell-change exclusion) |
| RP-6 | the full battery + diff discipline | the 7 cluster parity gates **×7 PASS** · sync **97/97 PASS** · drift **140 actionable, pre/post JSON identical** (zero content edits) · build ✓ (hash `2ab607d6` unchanged — shell untouched) · validate ✓ · validate:master ✓ (12 checks) · version:check ✓ 9.2.6 · tests **64/64** · lint ✓ · qa:csp/bundle/contrast PASS · qa:doc-versions exit 0 (1 pre-existing warning) · qa:english **18** / qa:syntax **238** (baselines exact) · the stage tool **PASS** · the iter-139 tool **PASS** · `git diff --check` clean · runtime **96 sections** unchanged | VERIFIED **— iter 164 (all green)** | AGENTS.md common commands; DEC-13; the PLAN row's verification clause |
| RP-7 | — (state) | STATUS iter-164 (Current State; the v2-architecture invariant extended — **the reader-path audit stage COMPLETE**; iter-164 KI-note — no lifecycle deletions due, no new KI; Next step re-pinned to **the switch — the owner call**) + PLAN v2-readerpath-audit → COMPLETE + the iter-164 history note + worklog (iter-163 → one-liner; the ≤10 cap trim) + CHANGELOG (iter-164 entry; iter-162 collapsed) + NAV §7 de-stale (the migration tail: reader-path audit COMPLETE) + **the committed stage tool** `scripts/readerpath_audit_iter164.py` (the iter-139 replication precedent — re-runnable for the Q8 second-run verification) | EXECUTED **— iter 164** | the iter-147…163 state-package pattern |

**The recorded findings (gaps + dispositions — the PLAN row's clause; both change the ratified
spec/corpus state, neither is a navigation-wiring repair executable in-scope):**

1. **LEARN-1 — the spec §3 Learn entry (Part 0) is canon-only, not runtime-visible.** Part 0
   («Как читать этот гайд» + TL;DR; `p0_how_to_read` / `p0_tldr_quick_start`) is canon-only
   since iter 38 — no master file, no manifest entry, never rendered (the content_map
   convention: 96 rendering + Part 0 ×2 + Appendix D ×1 = 99 declared IDs). The ratified spec
   §3 names it the Learn entry point; the runtime Learn entry = the TOC panel + the Part 1
   auto-load (verified working, RP-2). Disposition: **OWNER-GATE** — two resolutions: (a) wire
   Part 0 into the runtime corpus (+2 sections, manifest/TOC/corpus-snapshot changes, a build
   slice) or (b) re-spec the §3 entry to the TOC/Part-1 form (a ratified-spec edit, doc-only).
   The linear backbone itself is complete either way.
2. **REFERENCE-1 — the no-JS Reference entry is not navigable from the site root.**
   `parts/glossary.html` (the generated no-JS page, DEC-17/18; the artifact contract requires
   it — `validate-artifact.mjs` special files) is linked from nowhere: the shell `<noscript>`
   block carries an enable-JS notice with no link, and no built page links `parts/glossary` —
   reachable only by direct URL. The JS-on Reference entry (the runtime panel) is fully wired
   (RP-4). Disposition: **OWNER-GATE** — the fix = a shell-infrastructure change (a
   `<noscript>` link/notice rework in `src/shell/index.html`), explicitly excluded from the
   v2 build scope without an owner call (spec §7: «any CSP/shell-infrastructure change»);
   `build.hash` would change (the shell file is the hash source).

Accounting: **1 file added** (`scripts/readerpath_audit_iter164.py`) + the state package (map
§5.25 + the §7 log; STATUS; PLAN; worklog; CHANGELOG; NAV §7 de-stale). **Zero content edits** —
canon byte-stable, master byte-stable, `data/*.json` byte-stable, matrix rows unchanged (the §5
preamble count stays 504); zero root fallbacks regenerate (the verification build's only
worktree effect = the root `index.html` timestamp churn — **restored** per AGENTS.md delivery
discipline; hash `2ab607d6` unchanged); drift 140 pre/post **identical** (JSON pre/post diff).
Runtime 96 sections unchanged. KI state: **zero new KI** (the 2 findings = recorded owner-gated
dispositions per the §5.24 owner-gate-candidates pattern, not defects — the stage documents,
the owner decides); **KI#77-e stays OPEN (owner-gated ed-5)**; KI#79 stays OPEN (the drift-tool
regex family — informational). The migration tail is now complete: parity audit ✓ (iter 162) →
canonical audit ✓ (iter 163) → reader-path audit ✓ (iter 164). Next: **the switch — the owner
call** (Q8 criteria: stages 2–4 green in two consecutive full-battery runs — the stage batteries
162/163/164 each green; a one-pass re-run at switch time completes the pair + no OPEN KI in the
affected families (the KI#77-e disposition) + the owner call; Q9: v1 freezes/archives at switch).
The owner-gate candidates: map §5.24 (the §7A.7 variances, the master-only enrichment families,
KI#77-e/ed-5, the v2 canon-format decision D-5) **+ map §5.25 (LEARN-1, REFERENCE-1)** ride
their recorded owner calls before/at the switch.

## 6. Owner decision points (blocking, in recommended order)

> **Switch-time call package PREPARED (iter 165, doc-only — the iter-137/141/144 precedent):
> [`owner_gates_iter165.md`](./owner_gates_iter165.md)** — the verified evidence + options +
> recommendations for the migration tail's owner-gated set: **G1** the §7A.7
> capability-checklist reconciliation (canon wins / the §6.3-aligned CoT values / the E17
> re-point + gate) · **G2** the master-only enrichment families (the per-item rule:
> unique→canonize · duplicate→align · presentation→keep · unclear→UNKNOWN) · **G3**
> KI#77-e/ed-5 (the Appendix D ranges → illustrative, §7A.12 the sole normative owner,
> recommended) · **G4** the two §5.25 structural calls (LEARN-1 wire Part 0 / REFERENCE-1 the
> noscript glossary link). **Nothing DECIDED — every gate stays owner-called; awaiting the
> owner's reply per the package's §7 format.** After the calls: each called reconciliation
> executes as its own bounded slice, then the switch (Q8/Q9).

> **Owner calls received (chat 2026-09-14 «начинай работу по планам») — all four gates DECIDED (iter 138):**
> §6.1/§6.4 → **DEC-19** (master embed = canonical visual markup / L4-L5 frozen; hero
> remove/archive); §6.2/§6.5 → **DEC-20** (`TEXTUAL_CANONICAL` → §9.6; rule-strength
> ratified). The called plan = the iter-137 recommendation package
> ([`owner_gates_iter137.md`](./owner_gates_iter137.md) — verified evidence per gate
> §3.1–§3.4). Execution order: §6.1 disposal slice = **iter 138** (E08/E01/E15/E10
> prototype+extract copies → `REMOVED_WITH_REASON`); §6.2 → **mig-3 iter 139**; §6.5 applied
> incrementally by consuming slices; §6.4 disposal slice = **iter 140** (hero
> removed; KI#81 closed).
> **Fifth gate (row 6): owner call received (chat 2026-09-15 «продолжай работу по плану!»)
> — DECIDED (DEC-21, iter 142), build slice executed iter 142** (map §5.6).
> **Sixth gate (Registry B row 2 — the KI#72 sampling values): owner call received
> (chat 2026-09-15 «я согласен с рекомендациями, сделай как лучше и качественнее»)
> — DECIDED (DEC-22, iter 145), build slice executed iter 145** (map §5.7; KI#72 CLOSED).
> **v2 architecture phase opening (STATUS Next-step row 2): owner call received (same
> chat) — DECIDED (DEC-23, iter 145): phase OPEN, first slice = P-a consolidated v2
> architecture specification; no v2 build slice before the owner ratifies the spec.**
> **Spec ratification (the P-a §9 question list Q1–Q9): owner call received (chat
> 2026-09-15 «продолжай работы по планам!») — DECIDED (DEC-24, iter 147): the spec
> RATIFIED as tabled (Q1–Q4/Q6/Q8) + recorded recommendations/conservative defaults
> (Q5 defer / Q7 WIRE / Q9 freeze); the v2 build phase starts — Part 1 slice executed
> iter 147** (map §5.8; all §6 gates now closed — remaining owner calls live at their
> owning slices: KI#70 WIRE implementation at the Reference/appendix slice, switch
> criteria verification at the switch).

1. **Visual-markup ownership** (Registry A/L4-L5): master embed = canonical and
   prototypes/extracts become frozen design artifacts (default), or
   visual-system/ is re-established as the canonical visual source with a sync
   mechanism. Evidence: 93% identity, drift in E10/E01/E05/E06, no sync tooling
   (foundation §4.3).
   **DECIDED (DEC-19, owner chat 2026-09-14 «начинай работу по планам»):** master
   embed = canonical; L4/L5 frozen design artifacts; the four executed families'
   stale copies → `REMOVED_WITH_REASON` — **disposal slice executed iter 138** (16
   files: 4 prototypes + 12 extracts; parity-audit deferred-layer notes updated;
   NAV §1 visual-system row → frozen). Detail: `owner_gates_iter137.md` §3.1.
2. **E13 diagnostic mappings**: canonicalize in §9.6 vs visual-canonical
   (Registry B row 4).
   **DECIDED (DEC-20, owner chat 2026-09-14):** `TEXTUAL_CANONICAL` —
   canonicalize the unique mappings in §9.6 (canon §9.6 L139 already claims E13 is
   its visual version — the claim is currently false); E13 = visual presentation /
   decision aid; **mig-3 unblocked** on the established slice pattern.
   Detail: `owner_gates_iter137.md` §3.2.
3. **Glossary cluster (first bounded area) — DECIDED (DEC-17, owner chat 2026-09-14):**
   (a) canonical term-set = **merged-with-review** (per-term evidence: §5.1;
   canonicality decided per term — JSON-only terms do not become canonical
   merely by existing in the machine layer; Russian-first head-forms per
   DEC-16: `lie → ложь`, `token → токен`, English only as technical
   identifiers); (b) source-of-truth chain = **canonical term record →
   generated `glossary.json` → runtime panel / no-JS glossary**; (c) glossary
   stays the **v2 Reference-layer** representation of the unified registry
   (appendix layer rides the v2 Reference-mode design; the v1 KI#70
   wire/drop question stays deferred/superseded). Gate cleared — §5.1
   **ratified + phase call received (owner chat 2026-09-14, DEC-18)** —
   **executed iter 133 (mig-1)**.
4. **Hero prototype** (`visual-system/hero/`): integrate, archive, or remove
   (unintegrated since VS phase 1; carries its own labels).
   **DECIDED (DEC-19, owner chat 2026-09-14):** remove/archive — never
   integrated (INTEGRATION-MAP row unexecuted); runs on Three.js via
   `cdn.jsdelivr.net` importmap (the dependency class iter-113 removed); dead
   `.vs-hero-placeholder` CSS stub in shell styles (KI#81) is the only
   production-side residue — **disposal slice EXECUTED iter 140**:
   `visual-system/hero/` → `REMOVED_WITH_REASON` (archive = git history) +
   KI#81 CLOSED (5 dead rules removed from `src/shell/styles.css`; root
   fallback regenerated; full battery green — map Registry A hero row).
   Detail: `owner_gates_iter137.md` §3.4.
5. **Rule-strength convention** for v2 (RULE/GUIDELINE/OBSERVATION/EXPERIMENTAL/
   UNKNOWN markup) — needed before the Part 7A/8 v2 slices (model-capability
   percentages are OBSERVATION-strength; research §19 vocabulary).
   **DECIDED (DEC-20, owner chat 2026-09-14):** ratified — the four classes +
   UNKNOWN-as-temporary-only; applied incrementally per slice (no mass annotation);
   ПРАВИЛО/РЕКОМЕНДАЦИЯ map to RULE/GUIDELINE (existing callout classes);
   OBSERVATION/EXPERIMENTAL markup representation = first consuming slice. Note:
   the sampling cluster additionally needs the KI#72 value decision.
   Detail: `owner_gates_iter137.md` §3.3.
6. **Voice influence % cluster disposition** (Registry B row 7 — the last
   unexecuted bounded area): E07 scale → `SHARED_REFERENCE`; E07 unique prose →
   `TEXTUAL_CANONICAL` (§3.2 home); widget-notes split; AN-12B framing
   (~2% vs «не влияет»); row-label set.
   **Package prepared iter 141** ([`voice_cluster_iter141.md`](./voice_cluster_iter141.md)):
   verified evidence + recommended calls V-a…V-e (V-a/V-b = the map's own
   proposals; V-d Option A recommended — table wins, two prose statements
   re-frame); value parity verified green at every layer.
   **DECIDED (DEC-21, owner chat 2026-09-15 «продолжай работу по плану!»):**
   V-a/V-b/V-c/V-e as recommended; V-d = **Option A** — table wins (AN 12B
   stays ~2%; «не влияет» statements re-frame to «пренебрежимо мало (~2%)»;
   no numeric change). **Build slice EXECUTED iter 142** (map §5.6 VC-1..VC-10):
   §3.2 canonicalization (prose block + full marker + label set) → §7A
   re-frames → master mirrors + E07/E16 re-point → widget header/notes →
   `audit_voice_parity.py` (new MUST-PASS) → KI#82 CLOSED → E07 prototype/extract
   disposal (DEC-19). Detail: `voice_cluster_iter141.md` §4–§5.

---

## 7. Iteration log (registry changes)

- **iter 165 — Switch-time owner-call package prepared (doc-only — the iter-137/141/144
  precedent):** [`owner_gates_iter165.md`](./owner_gates_iter165.md) tables the migration
  tail's owner-gated set with verified evidence + options + consequences + recommendations +
  the exact owner-call format: **G1** the §7A.7 capability-checklist reconciliation (the
  three-form value variance — canon «✗ / Tier 1 / Tier 2–3» vs master «Tier 0–1 / Tier 1–2 /
  Tier 2–3» vs E17 «0–1 / 1–2 / 3» for CoT, canon 2/2/1 vs E17 2/2/2 for Anti-godmoding; the
  §6.3 tier-definition owner reconciles the values; recommended: canon wins with the
  §6.3-aligned CoT row + the E17 re-point + a parity gate) · **G2** the master-only
  enrichment families (the per-item rule unique→canonize / duplicate→align /
  presentation→keep / unclear→UNKNOWN — the 27-item table with per-item recommendations) ·
  **G3** KI#77-e/ed-5 (the Part 10 factual totals ~540/1000, ~1100, ~1800/~2150, ~1500+ vs
  the Appendix D ::05 ranges ~440–890 / ~1500–1800; recommended: **B** — the ranges
  illustrative/НАБЛЮДЕНИЕ-framed, §7A.12 the sole normative budget owner, the KI closes) ·
  **G4** the two §5.25 structural calls (LEARN-1: recommended (a) wire Part 0 — corpus
  96→98 disclosed; REFERENCE-1: recommended (a) the noscript glossary link — a
  shell-infrastructure change, `build.hash` changes, disclosed) + the explicit out-of-scope
  records (D-5 stays switch-time per its own record; KI#79 informational). **Nothing
  DECIDED — every gate stays owner-called.** Doc-only battery: the 7 cluster gates ×7 PASS ·
  sync 97/97 · `git diff --check` clean; no production file touched (the owner commit may use
  `SKIP_ARTIFACT_BUILD=1`). Awaiting the owner's reply (the package §7 format); then: each
  called reconciliation as its own bounded slice → the switch (Q8/Q9). Detail: git (iter-165
  commit).
- **iter 164 — Reader-path audit stage (map §5.25 RP-1..RP-7; the migration tail's third
  stage, spec §8 stage 4 — the stage COMPLETE):** the per-mode reader-path verification on the
  completed v2 corpus — **RP-1** the Debug re-verification (`debug_readerpath_audit_iter139.py`
  **PASS** — the mig-3 chain unbroken) + **the committed stage tool
  `scripts/readerpath_audit_iter164.py`** (the iter-139 replication for
  Learn/Build/Reference): **RP-2** LEARN green (the TOC/Part-1 entry; the manifest == the guide
  order == the per-part render order; 96 sections; 96/96 difficulty metadata; 17 F6 usages;
  Part 10 completion) · **RP-3** BUILD green (the §1.6 prebuild profile → §7A.13/§7A.12 + the
  Part 10 blueprints; every wiring target resolves; the value/checklist/template surfaces; the
  assembly checklist + «Итого» + 4 «Демонстрирует»; the validation handoff = the Debug
  backbone per spec §3/F3, by design) · **RP-4** REFERENCE green (the runtime panel + the
  no-JS page + the 45-term chain; **48/48 anchor targets resolve** — zero broken
  canonical-home links; the appendices A/B/C wired A→B→C; Appendix D canon-only, zero runtime
  links). **RP-5 — 2 gaps discovered → recorded + dispositioned (both OWNER-GATE):** **LEARN-1**
  (the spec §3 Learn entry Part 0 is canon-only since iter 38 — not runtime-visible; the
  runtime entry = the TOC + Part 1; resolutions: wire Part 0 / re-spec the entry) ·
  **REFERENCE-1** (the no-JS glossary entry is not navigable from the site root — the shell
  noscript block carries no link; the fix = a shell-infrastructure change, out of build scope
  per spec §7). **RP-6** the full battery green (the 7 cluster gates ×7 PASS · sync 97/97 ·
  drift 140 pre/post identical · build/validate/validate:master/version:check 9.2.6 · tests
  64/64 · lint · qa gates PASS · baselines exact english 18 / syntax 238 · hash `2ab607d6`
  unchanged · runtime 96 sections). **Zero content edits; zero new KI** (the 2 findings =
  owner-gated dispositions, the §5.24 candidates pattern); KI#77-e/KI#79 unchanged. **The
  migration tail COMPLETE: parity ✓ canonical ✓ reader-path ✓ — the switch (owner call)
  next; the owner-gate candidates = map §5.24 + §5.25.** Detail: git (iter-164 commit).
- **iter 163 — Canonical audit stage (map §5.24 CA-1..CA-8; the migration tail's second
  stage, spec §8 stage 3 — the stage COMPLETE):** the machine-checkable cross-pass
  content_map ↔ canon ↔ glossary-registry ↔ master on the full corpus — **CA-1 99/99 map
  rows resolve · CA-2 99 canon IDs, zero orphans · CA-3 96 == 96 rendering both directions ·
  CA-4 45/45/45 registry heads/home=/[ref:] targets · CA-5 zero duplicate concepts/IDs · CA-6
  the KI#82-style Notes checks repo-wide: 4 stale Notes repaired** (the §1.2 «4 блока» → the
  canon «5 блоков» + the DEC-16 subsection title; Appendix B «7-row» → 9-row; Appendix C
  «27 терминов» → 25 статей + the registry relationship; the map stamps) + 5 counter-claims
  verified correct. **The 12 observation packages dispositioned:** 3 executed as disclosed
  content dispositions (**P9-5(b)** — the §9.7 Walter E=30 re-label to its canonical
  classification, canon+master in lockstep, the `WALTER_97_ANCHOR` tool anchor re-pointed in
  step; **P9-5(d)** — the master §9.3 EN leftovers → the canon RU forms, fence #10 mirror
  completion; **P-C-4(f)** — the components.md `.part-resume` Location de-stale) + 1 record
  correction (**P-C-4(b)**: 26 → 25 of 45) + the rest classified: owner-gate (the
  master-only enrichment/variance families, incl. §7A.7 — the stage documents, the owner
  decides) / v2-canon-format deferral (the front-matter + E-declaration families, D-5
  switch-time) / no-action (formatting churn, drift-tool boundaries, by-design conventions) /
  resolved-verified (KI#84, the L397 typo, the iter-156 miscount, the matrix vague-notes,
  the part-resume co-travelers — A's benign instance kept). **KI#77-e/R27 (ed-5) stays
  owner-gated — documented, not re-decided.** Post-disposition battery: the 7 cluster gates
  ×7 PASS · sync 97/97 · drift **140 pre/post identical** · build/validate/validate:master/
  version:check 9.2.6 green · tests 64/64 · lint · qa gates PASS · baselines exact
  english 18 / syntax 238 · hash `2ab607d6` unchanged · runtime 96 sections unchanged.
  Zero new KI. Detail: git (iter-163 commit).
- **iter 162 — Parity audit stage (map §5.23 PA-1..PA-7; the migration tail's first stage,
  spec §8 stage 2 — the stage COMPLETE):** a full-corpus re-verification pass on the completed
  v2 corpus (Parts 1–10 + Appendices A/B/C/D post-slicing), zero content edits — the seven
  cluster parity gates **×7 PASS** (glossary / core-directives / token-budget / enneagram /
  diagnostics / voice / sampling) · canon→master sync **97/97 PASS** · drift **140 actionable
  unchanged** (JSON pre/post identical — informational; KI#79 stays OPEN) · the full battery
  green (build hash `2ab607d6` unchanged · validate · validate:master 12 checks ·
  version:check 9.2.6 · tests 64/64 · lint · qa:csp/bundle/contrast PASS · qa:doc-versions
  exit 0 · baselines exact english 18 / syntax 238); the corpus snapshot recorded (runtime
  **96 sections** — all == the manifest anchors in exact order, the WIRE order A→B→C, D absent
  by design; the F2 matrix full coverage **15/15 targets / 493 presentation rows + 11 Part 0
  pre-F2 rows = 504**, every per-Part count == its slice record — count script-verified); the
  discovered-cluster sweep — **zero new clusters** (the per-slice no-new-cluster-gate records
  147–161; the seven owners cover the corpus; no new gate needed); the observation-package
  ownership sweep — **12/12 deferred packages ride the canonical-audit stage** (nothing moved);
  zero new KI; KI#77-e (owner-gated ed-5) + KI#79 unchanged; the `index.html` timestamp churn
  restored. **The stage closes green — the canonical-audit stage next (spec §8 stage 3).**
- **iter 161 — Appendix D v2 build slice (map §5.22 P-D-1..P-D-5; the appendix-slice stage
  COMPLETE):** F2 presentation column 6 rows (**all `open`** — the Reference-layer verdict holds;
  count script-verified; zero rows added — the total stays 504); matrix §1.2 extended to
  full-guide coverage (Parts 1–10 + Appendices A/B/C/D, iters 147–161); the stale-note family
  refreshed (the ::02 KI#77-b/c claims describe the pre-iter-127 state — repaired ed-8/R18,
  pickaxe-verified + verified at HEAD; the ::04 R17 note described the pre-strip state — executed
  iter 128, verified; the ::05 R27 note kept — **KI#77-e owner-gated ed-5, documented, not
  re-decided**); the L-refs verified unchanged per §1.1; the appendices verdict extended (the
  D-sliced line + the stage-COMPLETE line); canon — **zero edits** (`appendix_character_map.md`
  byte-stable, sha256-verified pre/post — F5-approximate; the A/B zero-restructure precedent;
  zero open compression candidates); master — **N/A by design** (canon-only appendix: no master
  file, never runtime-rendered — the WIRE's `APPENDIX_GUIDE_ORDER` = A/B/C; zero root fallbacks;
  the index.html timestamp churn restored per AGENTS.md delivery discipline); the conceptual-only
  section-ID status documented (the content_map convention: 96 rendering + Part 0 ×2 + Appendix
  D ×1 = 99 declared IDs); the P-D-4 observation package deferred (the front-matter staleness,
  the R18 out-of-scope generic form, the drift canon-only listing); drift 140 unchanged (zero
  canon/master content edits — JSON pre/post diff); full battery green (sync 97/97 · parity ×7 ·
  tests 64/64 · baselines exact english 18 / syntax 238 · hash `2ab607d6` unchanged · runtime
  unchanged — 96 sections).
- **iter 160 — Appendix C v2 build slice (map §5.21 P-C-1..P-C-5):** F2
  presentation column 26 rows (**all `open`** — the Reference-layer verdict holds; count
  script-verified; zero rows added — the total stays 504); matrix §1.2 extended to Parts 1–10 +
  Appendices A/B/C; the stale-note family refreshed (the pre-iter-127 «`§X.X` vague» claims + the
  two R29 quotes — the canon aligns with §6.3/§4.11); the L-refs re-derived per §1.1; the
  appendices verdict extended; the R01/R02 §15 rows marked COMPLETE; §16 re-counted (18 of 20 —
  #8's iter-153 status de-staled); canon — **the R01/R02 compressions EXECUTED** (::03 the
  placement ПРАВИЛО → 1 sentence + the §1.4 parenthetical ref; ::05 the full annotated 7-item copy
  + the R13 3-tier restatement → definition + 7-name index + the fixed §7A.2 pointer — the
  registry C-3/C-5 deployed forms, DEC-17c; 5-point checks documented); master — **two mirror
  completions** (the linked §1.4 parenthetical + the compressed ::05 paragraph with the
  `#p7a_core_directives` link — fence #10) + **the v7-era `part-resume` disposed
  REMOVED_WITH_REASON** (the iter-158 «B/C slices co-decide» sub-decision executed at C — the B
  precedent; 5-point check + grep-verified zero tool deps; A's benign instance remains the family's
  sole survivor); the P-C-4 observation package deferred (the master CoT Tier-0 enrichment, the
  intro's coverage claim, the front-matter staleness, the heading-mismatch family, the
  components.md location note); root fallback `parts/appendix_glossary.html` regenerated (+ the
  index.html timestamp; hash `2ab607d6` unchanged); drift 141 → post-capture in the iter-160
  worklog (the CORE-DIRECTIVES plain-text entry expected to clear); full battery green.
- **iter 159 — Appendix B v2 build slice (map §5.20 P-B-1..P-B-5):** F2
  presentation column 4 rows (**all `open`** — the Reference-layer verdict holds; count
  script-verified; +1 row — the iter-145 НАБЛЮДЕНИЕ audit-coverage repair, total 500→**504** disclosed
  in the matrix header + the §5 preamble); matrix §1.2 extended to Parts 1–10 + Appendices A/B;
  the ::01 marker inventory + the ::04 L-refs refreshed + the appendices verdict extended; canon —
  **zero edits** (`appendix_model_table.md` byte-stable — F5-approximate verified; the OBSERVATION
  anchor intact); master — **two mirror completions** (the «Ключевые следствия для сборки карточки»
  block restored with the `#p7a_core_directives` link + the Script Tax API-cell word order —
  fence #10) + **the v7-era `part-resume` disposed REMOVED_WITH_REASON** (the iter-158 «B/C slices
  co-decide» sub-decision executed at B; the iter-47 P2-7 family precedent; 5-point check +
  grep-verified zero tool deps; the stale MODEL_NOTE bullet disclosed); the P-B-4 observation
  package deferred (the A/C part-resume co-travelers, the heading-mismatch family, the front-matter
  staleness, the part_04 master-side span).
- **iter 158 — Appendix A v2 build slice + the KI#70 WIRE (map §5.19 P-app-1..P-app-6):** F2
  presentation column 6 rows (**all `open`** — the Reference-layer verdict holds; count
  script-verified); matrix §1.2 extended to Parts 1–10 + Appendix A; the §14 header + two stale
  row notes + the appendices verdict refreshed (the pre-iter-127 vague-refs line corrected; the
  KI#70 never-loaded dependency resolved); canon — **zero edits** (`appendix_mbti.md` byte-stable —
  F5-approximate verified); master — **three mirror completions** (the S·P note sentence 2 + the
  `#p7a_system_prompt` link; the «Цвет (в виджете)» header; the «(поведенческие якоря)» gloss —
  fence #10) + **the stale v9-era transition disposed** (REMOVED_WITH_REASON, the iter-148 §2.3
  precedent); **KI#70 EXECUTED per DEC-24 Q7** (the lazy-loader WIRE: `manifest.appendices` appended
  to the load list after `manifest.parts` in guide order A→B→C + the «Приложения» sidebar-TOC group;
  runtime-verified headless — 93→96 sections, the `#appendix_mbti` TOC link scrolls, the
  `mbti-composer` initializes with zero page errors; KI#70 CLOSED); the P-app-4 observation package
  deferred (the part-resume family, the manifest-order artifact, the B/C/D stale matrix notes).
- **iter 157 — Part 10 v2 build slice + the owner-called KI#84 reconciliation (map §5.18
  P10-1..P10-6):** F2 presentation column 20 rows (**9 `open` + 11 `collapsible`** — all
  pre-existing v7-era F6 wraps documented, zero new wraps); canon — the L397 «Выщебленного»→
  «Выщербленного» typo repair (the only canon edit; zero F5 restructure); master — the F6-summary
  mirror repair; zero mirror gaps (drift pre-capture: 4 comment-noise + 3 KI#79-boundary entries);
  **KI#84 EXECUTED per the owner's session directive** (the master §9.6 Walter OCEAN cross-ref line
  DELETED — Elena's values had been attributed to Walter since iter 38; §9.7 = the sole Part-9
  Walter reference; canon `part_09.md` byte-stable; BOTH tool anchors moved together: the sync
  probe P3-4c → `P3-4c-del` negative check — count 97 preserved — + the diagnostics-parity
  `WALTER_DELETED` absence guard + the new check 2b §9.7 sole-reference guarantee; KI#84 CLOSED);
  the P10-4 observation package deferred (the Omnis «Звук»/«Голос» iter-75 KI#51 variance incl.);
  drift 143 unchanged.
- **iter 156 — Part 9 v2 build slice (map §5.17 P9-1..P9-7):** F2 presentation column 43 rows
  (38 `open` + 3 `collapsible` — the §9.11 worked-example F6 wraps — + 1 `canonical-link` — the
  §9.4↔§9.5 fold EXECUTED, canon + master + the sampling-audit check-7 re-point in step — + 1 `—`);
  the §9.6 diagnostics cluster owner byte-stable (sha-verified, `audit_diagnostics_parity.py`
  PASS); five «Ссылка» mirror completions; KI#84 opened (the master §9.6 Walter line value
  defect — deferred); drift 148→143.
- **iter 155 (Part 8 v2 build slice, BASE_COMMIT `9891433f`):** the pinned STATUS Next-step
  row 1 (PLAN row v2-build-part-8, **not owner-gated** — the DEC-24 ratification gate cleared)
  executed per map **§5.16 (P8-1..P8-5)** on the spec §7 shape (ninth application, reusing the
  §5.8–§5.15 pattern): evidence — the matrix Part 8 tables gain the F2 `presentation` column
  (**40 rows: 40 `open`** — the Debug-mode catalog Part, zero qualifying Collapsible blocks; zero
  `canonical-link` / `—`); matrix §1.2 extended to Parts 1–8; **eleven stale row notes + the verdict
  defect-load line refreshed** (the vague-ref/paren defects repaired iter 127 ed-8/R18 — pickaxe
  `8a365553`; the R17-lite phrase stripped iter 129; the KI#72 conditional superseded by DEC-22);
  canon — **zero content edits** (`part_08.md` byte-unchanged — the Part hosts no cluster owner);
  master — **sixteen mirror completions** (P8-3: the dropped canon clauses / sentences /
  «Ссылка» rows / links restored — the v9 Phase-6 slimming gaps; the §8.1 label re-point
  «Примечание»→«Ссылка» with the sync P1-3 probe substring updated in step, disclosed); the
  master-only enrichments + variances recorded as deferred observations (P8-4); drift
  154 → **148** (six canon-side matches gained — verified by the JSON pre/post diff; zero new
  rows); full battery green (sync 97/97, parity ×7, tests 64/64, english 18, syntax 238, hash
  unchanged); Next step re-pinned to the Part 9 slice.
- **iter 154 (Part 7B v2 build slice, BASE_COMMIT `c16a9354`):** the pinned STATUS Next-step
  row 1 (PLAN row v2-build-part-7b, **not owner-gated** — the DEC-24 ratification gate cleared)
  executed per map **§5.15 (P7B-1..P7B-5)** on the spec §7 shape (eighth application, reusing the
  §5.8–§5.14 pattern): evidence — the matrix Part 7B tables gain the F2 `presentation` column
  (33 rows: 25 `open` + 8 `collapsible` — all eight pre-existing deployed F6 usages documented;
  zero `canonical-link` / `—`); matrix §1.2 extended to Parts 1–7B; one stale note refreshed
  (`p7b_lorebook_advanced::06` — the R29 fix executed iter 129; the note described the pre-fix
  state) + the E18 VS-shadow + §4.2-target re-verification notes added; canon — **zero content
  edits** (`part_07b.md` byte-unchanged — the Part hosts no cluster owner, no fold candidate;
  the iter-148/149/151/152 zero-canon-edit precedent); master — **three mirror completions**
  (P7B-3: the §7B.3::04 ref-target fix — canon `[ref: §7B.4]` vs the v9-era `#p7b_lorebook_advanced`
  link, pickaxe-verified, fence #10 canon wins; the §7B.3::11 + §7B.4::07 «Ссылка» label/anchor
  completions — the P5-3/P6-3 families); the master-only enrichments + variances (the E18
  canon-declaration gap, the EN-label family sibling, the closing transition) recorded as deferred
  observations (P7B-4); drift 155 → **154** (the §7B.4::07 «Ссылка» paragraph gained its master
  mirror — verified by the JSON pre/post diff); full battery green (sync 97/97, parity ×7, tests
  64/64, english 18, syntax 238, hash unchanged); Next step re-pinned to the Part 8 slice.
- **iter 153 (Part 7A v2 build slice, BASE_COMMIT `2822c818`):** the pinned STATUS Next-step
  row 1 (PLAN row v2-build-part-7a, **not owner-gated** — the DEC-24 ratification gate cleared)
  executed per map **§5.14 (P7A-1..P7A-5)** on the spec §7 shape (seventh application, reusing the
  §5.8–§5.13 pattern; the largest slice — 13 sections / 94 rows, executed whole — the sub-slicing
  option not needed): evidence — the matrix Part 7A tables gain the F2 `presentation` column
  (94 rows: 86 `open` + 4 `canonical-link` + 2 `collapsible` — both pre-existing F6 usages
  documented — + 2 `—` historical rows; matrix §1.2 extended to Parts 1–7A + the `—` rule; seven
  stale notes refreshed — the KI#71/ed-6/iter-125/iter-128 pre-fix states) + this §5.14 registry;
  canon — **one content edit**: the R01 #8 §7A.11 fold (the matrix CROSS-REFERENCE verdict, the
  Part-4 R21-#16 precedent; 5-point check passed; the §7A.2/§7A.6/§7A.12 cluster-owner records
  byte-stable — the three cluster parity audits PASS); master — the fold mirror (§7A.11 callout,
  the `[ref:]` rendered as the §1.4 anchor); the master-only enrichments + §7A.7 family variances
  (CoT-tier drift, the E17 checklist values, the Recap label, the `<ul>` render variances, the
  E02/E16 declaration gaps) recorded as deferred observations (P7A-4); drift 155 → **155**
  (expected unchanged — verified by the JSON pre/post diff); full battery green (sync 97/97,
  parity ×7, tests 64/64, english 18, syntax 238, hash unchanged); Next step re-pinned to the
  Part 7B slice.
- **iter 152 (Part 6 v2 build slice, BASE_COMMIT `f5087a8c`):** the pinned STATUS Next-step
  row 1 (PLAN row v2-build-part-6, **not owner-gated** — the DEC-24 ratification gate cleared)
  executed per map **§5.13 (P6-1..P6-5)** on the spec §7 shape (sixth application, reusing the
  §5.8–§5.12 pattern): evidence — the matrix Part 6 tables gain the F2 `presentation` column
  (25 rows, all `open`; the Collapsible criteria honestly applied: zero qualifying blocks; one
  stale note refreshed — `p6_cot_tiers::05`, the R17 strip executed iter 128, the note described
  the pre-strip state) + this §5.13 registry; canon — **zero content edits**
  (`part_06.md` byte-unchanged; the Tier 0–3 canonical table + the Tier 2/Tier 3 templates
  byte-stable; the front-matter `vs_embedded: none` staleness deferred, repo-wide); master —
  the §6.3::04 «Ссылка» mirror (the missing Reference-branch block, pickaxe-verified never
  present; the P4-4(b) family; ref-notation rendered reader-facing per the P5-3 precedent);
  the six master-only enrichments + variances (the §6.1 closing sentence, the difficulty-comment
  divergence, the §6.2::06 wording, the E11 canon-declaration gap, the ::05 English residue,
  the EN ILLUSTRATION labels) recorded as deferred observations (P6-4); drift 155 → **155**
  (unchanged — verified by the JSON pre/post diff); full battery green (sync 97/97, parity ×7,
  tests 64/64, english 18, syntax 238, hash unchanged); Next step re-pinned to the Part 7A
  slice.
- **iter 151 (Part 5 v2 build slice, BASE_COMMIT `ebdfe412`):** the pinned STATUS Next-step
  row 1 (PLAN row v2-build-part-5, **not owner-gated** — the DEC-24 ratification gate cleared)
  executed per map **§5.12 (P5-1..P5-6)** on the spec §7 shape (fifth application, reusing the
  §5.8–§5.11 pattern): evidence — the matrix Part 5 tables gain the F2 `presentation` column
  (43 rows, all `open`; the Collapsible criteria honestly applied: zero qualifying blocks; two
  stale notes refreshed — both describe pre-iter-127 states: the ::02 internal-ref imprecision
  and the ::15 R18 `§7A.X` placeholder, both repaired by ed-8 Phase B `8a365553`; the ::15
  refresh byte-verified at HEAD per pitfall #27) + this §5.12 registry; canon — **zero content
  edits** (`part_05.md` byte-unchanged; the §5.4 enneagram record + the §5.2 Elena tables
  byte-stable per the mig-5 lock — the iter-149 §3.2 voice precedent; `audit_enneagram_parity.py`
  PASS); master — the §5.1::15 «Ссылка:» label mirror (P3-5/P4-4 family) + the §5.5::05 mirror
  completion restoring the two canon sentences (MBTI Composer / OCEAN Insight) the iter-62
  master-side cleanup dropped while canon kept them (P5-4); the six master-only enrichments
  (E09 canon-declaration gap, stress-type suffixes, «дефект»/«FLAW» variance, §5.4 builder
  chrome, §5.5 nav line, table casing) recorded as deferred observations (P5-5); drift 155 →
  **155** (unchanged — verified by the JSON pre/post diff); full battery green (sync 97/97,
  parity ×7, tests 64/64, english 18, syntax 238, hash unchanged); Next step re-pinned to the
  Part 6 slice.
- **iter 150 (Part 4 v2 build slice, BASE_COMMIT `b0c21c3b`):** the pinned STATUS Next-step
  row 1 (PLAN row v2-build-part-4, **not owner-gated** — the DEC-24 ratification gate cleared)
  executed per map **§5.11 (P4-1..P4-6)** on the spec §7 shape (fourth application, reusing the
  §5.8/§5.9/§5.10 pattern): evidence — the matrix Part 4 tables gain the F2 `presentation`
  column (51 rows: 50 `open` + 1 `canonical-link`; the Collapsible criteria honestly applied:
  zero qualifying blocks; two stale notes refreshed — the KI#77-a repair iter 127 on
  `p4_spine_mapping::08`, the R29 normalization iter 129 on `p4_ghost_layers::03`; the R21
  registry row + §16.3 candidate #16 marked executed, 14/20 / 6 open) + this §5.11 registry;
  canon — the single content edit = the **R21 §4.7::04 fold** to the canonical-link form
  (1-sentence local reminder + §4.1/§4.9 pointers; Editorial Policy 5-point check passed; the
  §4.1 owner, the §4.11 expert-side dual, the §8.10 nuance, the glossary clause untouched);
  master — the §4.7 rule-callout fold mirror + the §4.6 mirror completion (the iter-123
  russification miss: definition + the never-present 4th rule bullet + the examples-table canon
  form) + the §4.7::05/§4.11::05 «Ссылка» Reference-branch mirrors; the three master-only
  §4.8/§4.4 enrichments (infographic + 4th table column + nav callout) recorded as deferred
  observations (P4-5); drift 157 → **155** (−2, canon-side matches gained); full battery green
  (sync 97/97, parity ×7, tests 64/64, english 18, syntax 238, hash unchanged); Next step
  re-pinned to the Part 5 slice.
- **iter 131 (seed, BASE_COMMIT `987e4f3`):** registry created; layer model (§2), 18 element
  dispositions (§3, all PROPOSED), 7 cluster rows (§4), decision points (§6).
  Evidence base: `migration_foundation_iter131.md`.
- **iter 132 (glossary slice, BASE_COMMIT `8f12c07`):** owner decisions recorded as DEC-17
  (§4 glossary row + §6.3 → DECIDED; §2 L6 updated). Registry C seeded with the glossary
  slice (§5.1): 26 matrix rows copied as C-1…C-26 (back-pointers added in the matrix), 55 JSON
  terms dispositioned as T-01…T-55 (35 MERGED / 20 MOVED, canonical homes verified), 6
  head-forms flagged ⚑ (identifier-vs-prose boundary). New finding: `glossary.json` RepPen
  «1.00–1.10» = 5th KI#72-family value location (§4 row 2). Term-set partition re-derived by
  script (25/55/21/34/4 — matches foundation). Doc-only; v1 untouched.
- **iter 133 (mig-1 execution, BASE_COMMIT `4a7f94d`):** owner ratified §5.1 + opened the v2 build
  phase (chat 2026-09-14 → DEC-18): 6 ⚑ resolved as identifier heads. Chain implemented:
  `docs/canon/glossary_registry.md` (45 entries; entry pattern relocated per C-1/DEC-17c) →
  `scripts/generate_glossary.mjs` (wired as the first `pnpm run build` stage) → generated
  `data/glossary.json` (9.2.6; `core_rules`/`unified_definition` → REMOVED_WITH_REASON) →
  runtime panel + `parts/glossary.html` (re-pointed via the data layer; shell code untouched).
  Parity audit `scripts/audit_glossary_parity.py` PASS (81 provenance refs; anchors resolve;
  ⚑ verbatim; english-rule = the owner's control check; JSON↔registry equality).
  T-45 basis corrected (§7B.6 → §7B.1). RepPen value dropped from the machine layer
  (KI#72-family: 5th location eliminated). v1 canon/master content untouched.
- **iter 134 (mig-2 execution, BASE_COMMIT `306af0f7`):** CORE DIRECTIVES slice executed on the
  mig-1 pattern (canonical record → re-point → parity audit; no machine layer — no data file
  carries directive knowledge, map §2 L6 "remaining clusters per disposition"). §7A.13 Шаг 3
  full verbatim copy → DEC-08 shorthand `{{CORE_DIRECTIVES — канонический шаблон → §7A.2}}`
  (canon + master mirror, R02/matrix `p7a_assembly_pipeline::05`, D-2). E08 = the one visual
  presentation, SHARED_REFERENCE parity-locked (`scripts/audit_core_directives_parity.py`,
  10 checks + deferred-layer notes); node-7 title aligned to the canonical h4 («Фильтр
  предгенерации»). §7A.1 template + Part 10 ×4 verified shorthand (D-3/D-4). Glossary side
  already executed iter 133 (C-5, D-8). Prototype/extract copies stay PROPOSED/blocked (D-7,
  §6.1). KI#80 (master «наппряжён» typo, §7A.2 directive-5 paragraph) recorded + folded
  (master → canon alignment, KI#78 fold precedent). Battery: sync 97/97, build hash
  `2ab607d6` unchanged, tests/qa green, baselines exact (english 18 / syntax 247).
- **iter 135 (mig-4 execution, BASE_COMMIT `886a2c24`):** Token budget slice executed on the
  mig-2 pattern (Registry B row 5; §7A.12 stays canonical — unchanged). **Pre-edit verification:
  the foundation §4.4 «E01 SP ~100–200 wrong-side copy» claim is absent from the repo** (every
  E01/E15 layer verified at HEAD and the iter-131 BASE; «100–200» = E16/§7A.5 AN length,
  canonical there) — registry corrected, foundation stays the historical artifact. Real gaps
  closed: E15 Examples total now carries the derivation note (master + regenerated
  `parts/part_10.html`); canon `[VS: E01]` + `[VS: E15]` markers added (embeds previously had
  no canonical description); E01 verified SHARED_REFERENCE (totals arithmetic + in-embed
  derivation declarations + Lorebook «Est.» estimate). Acceptance gate
  `scripts/audit_token_budget_parity.py` PASS (10 checks + deferred-layer notes: prototype/
  extract §6.1; R11/R27 out-of-slice family owner-gated). New R11-family instance recorded:
  §7B.2 Greeting «50–100» vs §7A.12 Greeting row (TB-8). Battery: sync 97/97, build hash
  `2ab607d6` unchanged, tests/qa green, baselines exact (english 18 / syntax 247).
- **iter 136 (mig-5 execution, BASE_COMMIT `27de84b2`):** Enneagram data slice executed on the
  mig-1 generator pattern (Registry B row 6; §5.4 stays canonical — unchanged). Chain
  implemented: §5.4 table → `scripts/generate_enneagram.mjs` (new; wired into `pnpm run build`
  after the glossary stage; owns the machine-layer supplement — the in-slice design decision,
  no parallel canon registry created) → generated `data/enneagram.json` (schema 2.1.0:
  canonical fields = §5.4 verbatim, v1 extended variants dropped as non-canonical drift;
  LIE folded to ONE internal copy — `types[].lie_template`, `spine_templates.LIE` removed;
  spine FLAW from the §5.4 cell, NEED == need_direction) → consumers: `enneagram-builder.js` +
  `persona-synthesis.js` re-pointed to `types[].lie_template`; `vs-e10-enneagram.js`
  unchanged (shape preserved). E10 mini-cards → SHARED_REFERENCE: master static defaults
  aligned to §5.4 (type-4 wording; `parts/part_05.html` regenerated) + canon `[VS: E10]`
  marker declares §5.4 ownership + the generated layer. §5.2 Elena 6w5 directions
  parity-locked. Acceptance gate `scripts/audit_enneagram_parity.py` PASS (11 checks +
  deferred-layer notes: prototype/extract §6.1; hexad geometry VISUAL_CANONICAL;
  unconsumed machine fields informational). Battery: sync 97/97, tests/qa green, baselines
  exact (english 18 / syntax 247).
- **iter 137 (owner-gates recommendation, BASE_COMMIT `9b8d3138`):** doc-only — agent
  recommendation package prepared for the four open §6 gates (nothing DECIDED, no gate
  passed, no DEC-NN assigned): §6.1 master-embed-canonical / L4-L5 frozen · §6.2
  `TEXTUAL_CANONICAL` (mappings → §9.6) · §6.5 ratify RULE/GUIDELINE/OBSERVATION/
  EXPERIMENTAL + UNKNOWN-as-temporary-only, incremental application · §6.4 hero
  remove/archive; recommended call order §6.1 → §6.2 → §6.5 → §6.4. New verified evidence:
  hero Three.js CDN importmap; dead `.vs-hero-placeholder` CSS in `src/shell/styles.css`
  (5 rules, zero consumers — KI#81 opened, cleanup deferred to the §6.4 slice).
  Full package: `owner_gates_iter137.md`; §6 preamble + per-item recommendation lines +
  Registry A hero/E13 notes updated (this entry). v1 untouched; no battery (doc-only,
  iter-131 precedent).
- **iter 138 (owner-gates-ratified + §6.1 disposal, BASE_COMMIT `5de8fc9c`):** owner chat
  2026-09-14 «начинай работу по планам» = the go-ahead on the iter-137 package — all four
  gates recorded: §6.1+§6.4 → DEC-19, §6.2+§6.5 → DEC-20 (§6 preamble + rows 1/2/4/5 →
  DECIDED; §2 L4/L5 → frozen; Registry A hero/E13 + Registry B rows 1/4/6 notes). §6.1
  disposal slice executed: **16 files REMOVED_WITH_REASON** (`visual-system/elements/`
  E01/E08/E10/E15 prototypes + `integration/component-extracts/` E01/E08/E10/E15 ×3 —
  stale second copies of parity-locked embeds; archive = git history; Registry A/B →
  executed). Verification: the three family parity audits' deferred-layer notes updated
  (E08 / E01+E15 / E10 — recommendation §3.1 wording said "four parity audits": three
  scripts cover the four families; `audit_glossary_parity.py` carries no prototype
  notes — verified); `audit_component_extracts.py` + `_css.py` degrade gracefully to
  MISSING (pre-existing `exists()` guards — no edit needed); production `Source:
  elements/E##-*.html` provenance comments in `src/master/` + stylesheets left untouched
  (frozen v1 — resolve to git history, DEC-19). NAV §1 visual-system row → frozen;
  architecture.md role row updated. Doc+disposal-only: no `src/` or `data/` file touched —
  Python audit battery re-run green (sync 97/97; glossary/core-directives/token-budget/
  enneagram parity PASS; drift actionable 160 unchanged); no node battery (no build input
  touched — iter-131 doc-only precedent). mig-3 unblocked = next (DEC-20); §6.4 hero
  disposal slice pending (DEC-19; KI#81 cleanup rides it).
- **iter 139 (mig-3 execution, BASE_COMMIT `3a667688`):** Diagnostics cluster (Debug mode)
  executed on the mig-2 pattern (Registry B row 4; DEC-20 `TEXTUAL_CANONICAL` → §9.6).
  Chain implemented: canon §9.6 gains the E13 mapping sub-table «Три базовых симптома:
  полный маппинг» (6 rows: 3 symptoms, 6 checks, 9 diagnoses, 7 APs, 8 E-targets — the
  canonical textual home; the L139 claim becomes true) + the full `[VS: E13]` marker
  (weak «Ссылка» upgraded, `_README.md` §3.3 format, TEXTUAL_CANONICAL declared);
  master §9.6 mirrored (h4 + intro with §9.2/§9.7 Debug-chain links + table; «Формат:»
  sentence restored — pre-existing drift closed; Walter P3-4c cross-ref kept
  byte-identical); E13 embed re-pointed (comment declares §9.6 canonical ownership;
  values parity-locked); §9.2↔§9.6 wired (IMP-48 pair; master Применение mirror added —
  pre-existing no-master-match drift closed). §9.3/§9.11 verified as checklists
  (no E13 symptoms there — no competing sources). Acceptance gate
  `scripts/audit_diagnostics_parity.py` PASS (7 checks + deferred-layer notes;
  prototype E13 = frozen DEC-19). Matrix row `p9_decision_tree::05` seeded +
  back-pointers on ::03/::04 + `p9_one_change_rule::02` (DT-1..DT-8). Battery: sync
  97/97, tests 64/64, qa baselines exact (english 18 / syntax 247); build hash
  unchanged (`2ab607d6` — `src/shell/index.html` untouched); root fallback
  `parts/part_09.html` regenerated. Remaining Registry B rows: sampling values
  (KI#72 owner call) + voice influence % (E07/§3.2 disposition).
- **iter 140 (§6.4 hero disposal, BASE_COMMIT `6348dd61`):** hero disposal slice
  executed (STATUS Next-step row 1, pinned iter 139; DEC-19 recorded iter 138 —
  ready mechanical candidate, gates nothing). `visual-system/hero/` →
  `REMOVED_WITH_REASON` (1 file, `architecture-skeleton.html` — never integrated:
  no hero section in the shell, INTEGRATION-MAP row unexecuted; Three.js via
  `cdn.jsdelivr.net` importmap = the external-CDN dependency class iter-113
  removed; archive = git history). **KI#81 CLOSED:** the 5 dead
  `.vs-hero-placeholder` selectors removed from `src/shell/styles.css` in 3 edit
  sites (`/* === VS HERO PLACEHOLDER === */` section = 3 rule blocks + 2
  `body.theme-light` overrides; −31 lines) — zero consumers verified pre-edit
  (repo-wide grep) and post-edit (0 across `src/`/`parts/`/`assets/`/`widgets/`);
  root fallback `assets/shell-styles.css` regenerated (mirror −31); root
  `index.html` = delivery-build timestamp churn only. Build hash `2ab607d6`
  unchanged (`src/shell/index.html` untouched). Frozen `visual-system/` design
  docs (PLAN.md / QA-CHECKLIST.md / INTEGRATION-MAP.md) left untouched
  (iter-138 precedent — design artifacts frozen; hero references resolve to git
  history). Registry A hero row → EXECUTED; §6 preamble + §6.4 row → executed
  iter 140. Verification (executed): build + validate ✓ + validate:master 12/12
  + version:check 9.2.6 ✓ + tests 64/64 + qa:csp/bundle/contrast PASS +
  qa:doc-versions 1 pre-existing warning + qa:english **18** / qa:syntax
  **247** (baselines exact) + sync **97/97** + drift actionable **159**
  (unchanged — CSS-only delta, canon↔master untouched) + parity ×5 PASS +
  `git diff --check` clean. Remaining bounded areas: voice influence %
  (E07/§3.2 — owner call) + sampling values (KI#72 owner call).
- **iter 141 (voice-cluster evidence package, BASE_COMMIT `e5a387ae`):** doc-only —
  the Registry B row 7 owner-gate recommendation package prepared
  ([`voice_cluster_iter141.md`](./voice_cluster_iter141.md)) on the iter-137
  §6-gate pattern; nothing DECIDED, no DEC-NN assigned (next free DEC-21).
  Verified evidence: value parity green at every layer (widget `VOICE_SOURCES`
  == canon §3.2 6/6 rows, 0 mismatches — no KI#72-style contradiction; E07
  prototype↔embed text identity 23/23); unique prose confirmed absent from
  `docs/canon/**` (Хранилище vs Влияние · SP-primacy misconception · 2 widget
  quantitative claims ~10–20 сообщений / ~5 реплик); AN-12B framing tension
  surfaced (§3.2 ~2% vs «не влияет» ×2 canon + ×1 widget); E16 «~2–5%» verified
  = min–max of the §3.2 AN row. Recommended calls V-a…V-e (§6 row 6):
  V-a SHARED_REFERENCE · V-b TEXTUAL_CANONICAL → §3.2 · V-c widget-notes split ·
  V-d Option A (table wins, two prose statements re-frame) · V-e row-label set.
  KI#82 opened (content_map §3.2 stale Notes «SP > Description > Examples >
  Greeting» — misleading ordering; fix rides the build slice). State: Registry A
  E07 + Registry B row 7 recommendation notes + §6 row 6 + this entry. v1
  untouched; Python battery re-run green (sync 97/97; parity ×5 PASS; drift
  actionable 159 unchanged); no node battery (doc-only, iter-131 precedent).
- **iter 142 (voice-cluster build slice, BASE_COMMIT `9f4712bc`):** owner call
  received (chat 2026-09-15 «продолжай работу по плану!» — DEC-18/19/20
  go-ahead precedent) = the go-ahead on the iter-141 package → **DEC-21
  recorded** (V-a/V-b/V-c/V-e as recommended; V-d Option A). Registry B row 7 —
  the LAST bounded area — executed on the mig-2/mig-3 pattern (§5.6 VC-1..VC-10):
  canon §3.2 gains the «Хранилище ≠ Влияние» prose block (canonical home of the
  E07 inset payload + the 2 widget quantitative claims) + the full `[VS: E07]`
  marker (SHARED_REFERENCE + TEXTUAL_CANONICAL + audit name) + row-1 label
  «Недавний чат» (V-e) + the widget-marker notes disposition (V-c); §7A.5 +
  §7A.7 AN-12B statements re-framed per Option A («пренебрежимо мало (~2%)» —
  no numeric change); master mirrors (§3.2 prose + label; §7A.7; E07 embed
  re-pointed + outer comment label fix; E16 badge derivation note — E15
  pattern); widget: DEC-09 header deference line + AN-12B note + label;
  **KI#82 CLOSED** (content_map §3.2 Notes corrected); **4 E07 prototype/extract
  files REMOVED_WITH_REASON** (DEC-19; archive = git history). Acceptance gate
  `scripts/audit_voice_parity.py` PASS (9 check groups). Remaining Registry B
  row: sampling values only (KI#72 owner call — the last bounded area left).
  Battery: full (canon + master + widget touched) — see STATUS/worklog for the
  executed list.
- **iter 145 (sampling-cluster execution, BASE_COMMIT `28367020`):** owner go-ahead on
  the iter-144 package (chat 2026-09-15 «я согласен с рекомендациями, сделай как
  лучше и качественнее») → **DEC-22** (S-a…S-d: §7A.6 = the single canonical sampling
  value owner; §7A.7 param rows → defer; E17 → SHARED_REFERENCE re-point with the
  12B–32B middle tier as a declared omission; E12/§9.x hints → model-qualified
  defers) + **DEC-23** (v2 architecture phase OPEN; first slice = P-a consolidated
  specification). Slice executed per map §5.7 (SP-1..SP-12): canon §7A.6 full
  `[VS: E17]` marker + §7A.7 capability-only table + defer line; canon §9.3/§9.4/§9.10
  hint re-frames; Appendix B «НАБЛЮДЕНИЕ» callout = the first OBSERVATION-strength
  application (DEC-20, base `.callout`); master mirrors (E17 32B+ column →
  canonical 0.7–1.0 / 1.05–1.10, dual-side splits + orphan asterisk removed; E12
  AP-5 card re-frame; §7A.7 intro defer); `[VS: E12]` marker declares the numeric-fix
  defer; **KI#72 CLOSED** (reader-visible contradiction since iter 120 resolved);
  **8 E17/E12 prototype/extract files REMOVED_WITH_REASON** (DEC-19; archive = git
  history). Acceptance gate `scripts/audit_sampling_parity.py` PASS (12 check
  groups; parity ×7 now). **Semantic extraction COMPLETE (7/7 bounded areas).**
  Battery: full (canon + master + root fallbacks touched) — see STATUS/worklog for
  the executed list.
- **iter 146 (v2 architecture spec, BASE_COMMIT `0ed3d787`):** the DEC-23 phase's first slice
  (P-a) executed — NEW `docs/research/v2_architecture.md`, the consolidated v2 architecture
  specification, **PROPOSED for owner ratification** (nothing DECIDED inside; ratification →
  DEC-NN → v2 build slices unblocked). Consolidates: the layer model (§2 above, post-extraction
  state), the reader-mode specification (F1 — Learn/Build/Debug/Reference as structural overlays:
  entry point / default visibility / on-demand disclosure per mode), the presentation policy
  (F2 five-value disposition vocabulary on the matrix · F3 checklist triage · F4 example tiering
  · F5 Part micro-template · F6 `<details class="interactive">` disclosure), the rule-strength
  convention (DEC-20 + the iter-145 OBSERVATION first application; EXPERIMENTAL = open
  question), the complete 7/7 cluster+gate inventory (§4 above), the v2 build plan (one Part per
  iteration; guide order proposed — Part 1 first), and the audit & switch plan (parity →
  canonical → reader-path audits → switch criteria). Collects **9 ratification questions
  (Q1–Q9)** incl. KI#70 wire/drop (Reference backbone) and the v1 fate at switch. Doc-only
  battery green (sync 97/97 · drift 159 · parity ×7 · `git diff --check` clean).
- **iter 147 (Part 1 v2 build slice + spec ratification, BASE_COMMIT `01999852`):** owner
  go-ahead on the iter-146 ratification package (chat 2026-09-15 «продолжай работы по планам!»)
  → **DEC-24** (spec Q1–Q9 ratified; Q5 EXPERIMENTAL representation deferred to its first
  consuming slice; Q7 KI#70 = WIRE, rides the Reference/appendix slice; Q9 v1 = freeze at
  switch) — the v2 build phase starts. First Part slice executed per map **§5.8 (P1-1..P1-7)**
  on the spec §7 shape (first application): evidence — the matrix Part 1 tables gain the F2
  `presentation` column (30 rows, all `open` — Learn-mode entry Part; the Collapsible criteria
  honestly applied: zero qualifying blocks) + this §5.8 registry; canon — §1.8 F3 reframe
  («**Профиль сборки** — входной инструмент режима сборки (Build)» + build-path refs) + §1.4
  Reference branch (Уолтер Ссылка canonicalized from the master-only P3-4 line); master —
  mirrors + §1.7 Ссылка paragraph restored + §1.8 drift closing line (dead self-link) disposed
  REMOVED_WITH_REASON; root fallback `parts/part_01.html` regenerated. Drift actionable
  159 → 158. Battery: full — see STATUS/worklog. Next: Part 2 slice (guide order).
- **iter 148 (Part 2 v2 build slice, BASE_COMMIT `8e988916`):** the pinned STATUS Next-step
  row 1 (PLAN row v2-build-part-2, **not owner-gated** — the DEC-24 ratification gate cleared)
  executed per map **§5.9 (P2-1..P2-6)** on the spec §7 shape (second application, reusing the
  §5.8 pattern): evidence — the matrix Part 2 tables gain the F2 `presentation` column
  (26 rows, all `open` — Learn-mode core teaching Part; the Collapsible criteria honestly
  applied: zero qualifying blocks) + this §5.9 registry; canon — verified F5-approximate as-is,
  **zero content edits** (the matrix verdict «canonical teaching part, near-clean» holds at v2);
  master — the §2.3 master-only v7-era closing transition (never canonized; «Следующая часть»
  premature — §2.4–§2.6 follow) disposed REMOVED_WITH_REASON (5-point check + grep-verified
  zero dependencies; the «Переход» budget 1–2 per guide already spent by part_06/part_09);
  KI#72 row deleted from STATUS (lifecycle — closed iter-145, iterations 146/147 elapsed), with
  `audit_sampling_parity.py` check 12's KI#72 sub-check extended to accept the lifecycle-deleted
  state (the audit still required the live CLOSED row — stale against the AGENTS.md KI lifecycle;
  accepts the live row OR the recorded deletion note);
  NAV §7 de-staled (v2_architecture RATIFIED + editorial_matrix Phases A+B rows — current-state
  mandate); root fallback `parts/part_02.html` regenerated. Drift actionable 158 → 158
  (master-side disposal — the canon-side actionable classes untouched). Battery: full — see
  STATUS/worklog. Next: Part 3 slice (guide order).
- **iter 149 (Part 3 v2 build slice, BASE_COMMIT `767c3d23`):** the pinned STATUS Next-step
  row 1 (PLAN row v2-build-part-3, **not owner-gated** — the DEC-24 ratification gate cleared)
  executed per map **§5.10 (P3-1..P3-6)** on the spec §7 shape (third application, reusing the
  §5.8/§5.9 pattern): evidence — the matrix Part 3 tables gain the F2 `presentation` column
  (46 rows, all `open` — Learn-mode core teaching Part for voice; the Collapsible criteria
  honestly applied: zero qualifying blocks; the stale R18 note on `p3_greeting_ref::01`
  refreshed — the `§7B.X` repair executed iter 128) + this §5.10 registry; canon — verified
  F5-approximate as-is, **zero content edits** (the §3.2 voice-cluster canonical record
  byte-unchanged; `audit_voice_parity.py` stays green); master — the §3.6 stray v9-era heading
  («Пример: Выщербленный», degenerate, never canonized) disposed with the canon heading form
  restored + the two unregistered `plain-copy` pre-duplicates (§3.4/§3.6, v7-era, class
  undefined in CSS + unregistered per fence #7) disposed REMOVED_WITH_REASON + three
  mirror completions (§3.2 `EXAMPLE —` → `ПРИМЕР —` label russification miss; §3.6::06 +
  §3.7::04 «Ссылка» Reference-branch mirrors restored to the canon forms); NAV §7 de-staled
  (Parts 1–3); root fallback `parts/part_03.html` regenerated. **KI#83** (opened + CLOSED
  in-slice, forced by the baseline gate — the iter-148 audit-check precedent):
  `check_syntax_mix.py`'s italic regex matched across lines; the plain-copy disposal's changed
  asterisk topology tripped 2 cross-context false positives (qa:syntax 245→247); the class
  line-bounded (`[^*\n]*`) and verified (both corpora 238; the 7 eliminated BASE findings all
  cross-context artifacts; zero legitimate findings lost; the bold-pattern re-bounding
  deferred inside the KI); the syntax baseline re-based 245 → **238** (AGENTS.md synced).
  Drift actionable 158 → **157** (−1: the §3.6::06 canon paragraph matched by the mirror
  restoration — canon-side actionable class). Battery: full — see STATUS/worklog. Next:
  Part 4 slice (guide order).
