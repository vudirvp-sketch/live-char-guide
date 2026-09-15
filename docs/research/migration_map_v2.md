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
`editorial_matrix.md`** (99 IDs / 500 rows, repeat registry R01–R29 — full
coverage, iter 126; 12 of 20 candidates executed iters 125–130). This registry
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

## 6. Owner decision points (blocking, in recommended order)

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
