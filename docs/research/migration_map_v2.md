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
| L4 `visual-system/elements/` prototypes | **none, drifted** | frozen design artifacts (archive) — or re-established as canonical visual source; **decision §6.1** |
| L5 `component-extracts/` | **none, stale** | superseded by whatever owns visual markup (L4 or L2); disposition §6.1 |
| L6 `data/*.json` | version field only | **derived** from the canonical source wherever it carries knowledge (glossary cluster first) |
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
| E01 | `part_01.html` p1_card_overview | 38/44 | 27 | russification lag | block roles + derived budget ranges: budget numbers → `TEXTUAL_CANONICAL` (§7A.12 owns values; E01 SP ~100–200 is a wrong-side copy → fix in v2 slice); anchors-placement rule prose → `TEXTUAL_CANONICAL` (extend §1.4 rule text); labels → `REFERENCE_ONLY` |
| E02 | `part_07a.html` p7a_assembly_pipeline | 29/30 | 19 | none detected | assembly step names → `SHARED_REFERENCE` (canonical pipeline = §7A.13) |
| E03 | `part_02.html` p2_anchor_examples | 21/22 | 19 | none detected | T→A→P example rows → `VISUAL_CANONICAL` (demonstration; examples stay visual) |
| E04 | `part_02.html` p2_embodiment | 15/19 | 10 | minor | State→Body→Sensor→Speech stages → `SHARED_REFERENCE` (§2.4 owns) |
| E05 | `part_04.html` p4_spine_overview | 16/28 | 16 | russification lag | SPINE element names/glosses → `SHARED_REFERENCE` (§4.1 owns; «WANT сходится к NEED…» causal caption → `TEXTUAL_CANONICAL`, unique rule statement) |
| E06 | `part_04.html` p4_ghost_layers | 12/13 | 10 | russification lag | G1/G2/G3 layer labels + example quotes → `SHARED_REFERENCE` (§4.11 owns); layer quotes («Отец ушёл, когда мне было 5») → `VISUAL_CANONICAL` example |
| E07 | `part_03.html` p3_influence_hierarchy | 33/33 | 20 | none detected | compressed ~75–85% scale → `SHARED_REFERENCE` (§3.2 owns exact table); «Пользователи часто предполагают…» prose + «Хранилище vs Влияние» distinction → `TEXTUAL_CANONICAL` candidate (unique explanation, needs §3.2 home decision) |
| E08 | `part_07a.html` p7a_core_directives | 17/17 | 7 | none detected | 7 directive titles+one-liners → `SHARED_REFERENCE` (§7A.2 owns); visual = canonical presentation of the list (ed-2 mechanism, DEC-08) |
| E09 | `part_05.html` p5_ocean_basics | 17/17 | 9 | hex literals (KI#41/42 class) | pentagon axis labels → `REFERENCE_ONLY`; extreme-zone labels → `SHARED_REFERENCE` (§5.1 owns) |
| E10 | `part_05.html` p5_enneagram_basics | 13/17 | 12 | **value drift** (proto stale, §4.3) | type mini-cards (fear/desire/LIE) → `SHARED_REFERENCE` (canonical = §5.4 table; data layer `enneagram.json` must derive from it); hexad graph → `VISUAL_CANONICAL` |
| E11 | `part_06.html` p6_cot_tiers | 35/37 | 24 | none detected | tier definitions + model applicability (12B+/32B+/API) + template snippets → `SHARED_REFERENCE` (§6.3–§6.5 own); «Tier 0 работает для всех…» explanatory lines → `TEXTUAL_CANONICAL` candidates |
| E12 | `part_08.html` p8_antipatterns_overview | 59/61 | 38 | none detected | AP names/symptoms → `SHARED_REFERENCE` (Part 8 owns); per-AP fix imperatives with numbers («Держите RepPen 1.0–1.05…») → `TEXTUAL_CANONICAL` (numeric recommendation must have one canonical home — currently sides with §7A.7 against §7A.6, KI#72 family) |
| E13 | `part_09.html` p9_decision_tree | 40/40 | 37 | none detected | **unique diagnostic tree** (3 symptoms, checks, AP/E mappings absent from §9.5/§9.6) → `TEXTUAL_CANONICAL` decision required: canonicalize mappings in §9.6 (visual demonstrates) or declare `VISUAL_CANONICAL` (tree owns Debug knowledge); §6.2 |
| E14 | `part_09.html` p9_quality_scale | 17/18 | 9 | none detected | quality grade names → `SHARED_REFERENCE` (§9.1 owns) |
| E15 | `part_10.html` p10_annotated_blueprint | 42/45 | 42 | none detected | per-block budget ranges (min–max, derived totals) → `TEXTUAL_CANONICAL` derivation note needed (§7A.12 owns raw values; E15 shows totals — derivation rule must be stated once); block roles → `SHARED_REFERENCE` (§1.2) |
| E16 | `part_07a.html` p7a_authors_note | 31/31 | 20 | none detected | AN template A/B labels → `SHARED_REFERENCE` (§7A.5 owns) |
| E17 | `part_07a.html` p7a_sampling_params | 43/44 | 13 | none detected | 3-tier param table → `SHARED_REFERENCE` — **blocked on KI#72 value decision** (embed carries both sides labeled «базовая»/«чеклист»); annotations («Только Examples» etc.) → `REFERENCE_ONLY` |
| E18 | `part_07b.html` p7b_greeting | 16/16 | 5 | none detected | greeting algorithm steps → `SHARED_REFERENCE` (§7B.2 owns) |
| hero | — (unintegrated) | n/a | n/a | never integrated | `UNKNOWN` — §6.4 |

## 4. Registry B — concept clusters → canonical ownership (v2 dispositions PROPOSED)

| Cluster | Canonical owner (v1→v2) | Competing copies found (v1) | Proposed v2 disposition |
|---|---|---|---|
| CORE DIRECTIVES (7) | §7A.2 (prose + template) | E08 embed (titles+one-liners) · prototype E08 · extract E08 · fallback copy · glossary (canon app. + glossary.json) · Part 10 shorthand (sanctioned DEC-08) | E08 = the one visual presentation (`SHARED_REFERENCE`); Part 10/assembly keep `{{CORE_DIRECTIVES — …}}` shorthand; glossary entry = 1-sentence + link; **prototype/extract copies → `REMOVED_WITH_REASON` (stale derived copies) once visual-markup ownership decided (§6.1)** — second bounded area (ed-2 evidence reused) |
| Sampling values (KI#72 family) | **owner decision** (§7A.6 recommended by matrix) | §7A.7 checklist · E17 (both sides) · E12 AP-5 fix («1.0–1.05») | one canonical table; §7A.7/E17/E12 → `REPLACED_BY_CANONICAL` (defer/reference); **blocked on value decision** |
| Glossary | **owner decision** (§6.3) | canon appendix 25 terms · `glossary.json` 55 terms (21 overlap, divergent definitions, version 9.2.0, dead `core_rules`) · generated no-JS `glossary.html` · never-loaded master appendix (KI#70) · runtime panel | single canonical term registry; machine layer (JSON/no-JS/panel) becomes **derived**; dead `core_rules` → `REMOVED_WITH_REASON` (stale locations `01_core_principles.html#…`, unconsumed); appendix layer rides the v2 Reference-mode design — **first bounded area** |
| Diagnostics (symptom→fix) | §9.5 + §9.6 (prose tables) | E13 unique tree (3 symptoms, mappings not in canon) | E13 mappings → owner decision: canonicalize into §9.6 (`TEXTUAL_CANONICAL`) or declare tree `VISUAL_CANONICAL`; §9.3/§9.11 stay checklists — third bounded area (Debug mode) |
| Token budget | §7A.12 (tables + rules) | E01 (~100–200 SP — wrong-side copy) · E15 (min–max + derived totals) | E01/E15 → `SHARED_REFERENCE` with derivation note («totals = per-example × count»); E01 SP range corrected to canonical 50–200 in the v2 slice |
| Enneagram data | §5.4 table | `enneagram.json` (LIE duplicated ×2) · E10 embed mini-cards · stale prototype E10 | JSON becomes derived from §5.4 (single internal copy of each value); prototype copy → `REMOVED_WITH_REASON` (stale, «Я фундаментально ущербен» 3-way drift) |
| Voice influence % | §3.2 table | E07 compressed scale + unique prose · `persona-voice-hierarchy.js` constants (sanctioned DEC-09) | E07 scale → `SHARED_REFERENCE`; E07 unique prose → `TEXTUAL_CANONICAL` candidate (§3.2 home decision); widget constants keep DEC-09 provenance header |

## 5. Registry C — block-level rows (mechanism)

The block-level semantic audit of the prose layer is **owned by
`editorial_matrix.md`** (99 IDs / 500 rows, repeat registry R01–R29 — full
coverage, iter 126; 12 of 20 candidates executed iters 125–130). This registry
does **not duplicate** those rows (one fact — one owner, DEC-10). Mechanism:
when a v2 build slice touches a Part, its affected matrix rows are copied here
with `OLD LOCATION → NEW LOCATION` + status; the matrix row gets a back-pointer
`→ migration_map_v2 C-<n>`. Seed rows will appear starting with the first
bounded-area iteration (expected: glossary cluster).

## 6. Owner decision points (blocking, in recommended order)

1. **Visual-markup ownership** (Registry A/L4-L5): master embed = canonical and
   prototypes/extracts become frozen design artifacts (default), or
   visual-system/ is re-established as the canonical visual source with a sync
   mechanism. Evidence: 93% identity, drift in E10/E01/E05/E06, no sync tooling
   (foundation §4.3).
2. **E13 diagnostic mappings**: canonicalize in §9.6 vs visual-canonical
   (Registry B row 4).
3. **Glossary cluster (first bounded area)**: (a) canonical term-set
   composition — 25 canon / 55 JSON / merged-with-review (34 JSON-only terms
   need per-term disposition); (b) source-of-truth direction for the machine
   layer (canon MD → generated JSON vs JSON → generated MD); (c) disposition of
   the never-loaded appendix layer (input: KI#70 wire/drop analysis).
4. **Hero prototype** (`visual-system/hero/`): integrate, archive, or remove
   (unintegrated since VS phase 1; carries its own labels).
5. **Rule-strength convention** for v2 (RULE/GUIDELINE/OBSERVATION/EXPERIMENTAL/
   UNKNOWN markup) — needed before the Part 7A/8 v2 slices (model-capability
   percentages are OBSERVATION-strength; research §19 vocabulary).

---

## 7. Iteration log (registry changes)

- **iter 131 (seed, BASE_COMMIT `987e4f3`):** registry created; layer model (§2), 18 element
  dispositions (§3, all PROPOSED), 7 cluster rows (§4), decision points (§6).
  Evidence base: `migration_foundation_iter131.md`.
