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
| L6 `data/*.json` | version field only | **derived** from the canonical source wherever it carries knowledge (glossary: **DECIDED DEC-17** — canonical record → generated `glossary.json`; remaining clusters per disposition) |
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
| E01 | `part_01.html` p1_card_overview | 38/44 | 27 | russification lag | block roles + derived budget ranges: budget numbers → `TEXTUAL_CANONICAL` (§7A.12 owns values); anchors-placement rule prose → `TEXTUAL_CANONICAL` (extend §1.4 rule text); labels → `REFERENCE_ONLY`. **Executed iter 135 (mig-4, slice §5.3):** budget values verified == §7A.12 at every layer — the §4.4 «SP ~100–200 wrong-side copy» claim found absent (registry corrected); values parity-locked by `scripts/audit_token_budget_parity.py`; canon `[VS: E01]` marker added (TB-3); Lorebook row = declared estimate; prototype/extract deferred → §6.1 |
| E02 | `part_07a.html` p7a_assembly_pipeline | 29/30 | 19 | none detected | assembly step names → `SHARED_REFERENCE` (canonical pipeline = §7A.13) |
| E03 | `part_02.html` p2_anchor_examples | 21/22 | 19 | none detected | T→A→P example rows → `VISUAL_CANONICAL` (demonstration; examples stay visual) |
| E04 | `part_02.html` p2_embodiment | 15/19 | 10 | minor | State→Body→Sensor→Speech stages → `SHARED_REFERENCE` (§2.4 owns) |
| E05 | `part_04.html` p4_spine_overview | 16/28 | 16 | russification lag | SPINE element names/glosses → `SHARED_REFERENCE` (§4.1 owns; «WANT сходится к NEED…» causal caption → `TEXTUAL_CANONICAL`, unique rule statement) |
| E06 | `part_04.html` p4_ghost_layers | 12/13 | 10 | russification lag | G1/G2/G3 layer labels + example quotes → `SHARED_REFERENCE` (§4.11 owns); layer quotes («Отец ушёл, когда мне было 5») → `VISUAL_CANONICAL` example |
| E07 | `part_03.html` p3_influence_hierarchy | 33/33 | 20 | none detected | compressed ~75–85% scale → `SHARED_REFERENCE` (§3.2 owns exact table); «Пользователи часто предполагают…» prose + «Хранилище vs Влияние» distinction → `TEXTUAL_CANONICAL` candidate (unique explanation, needs §3.2 home decision) |
| E08 | `part_07a.html` p7a_core_directives | 17/17 | 7 | none detected | 7 directive titles+one-liners → `SHARED_REFERENCE` (§7A.2 owns); visual = canonical presentation of the list (ed-2 mechanism, DEC-08). **Executed iter 134 (mig-2):** titles/numbering/#6–#7 model-gating parity-locked by `scripts/audit_core_directives_parity.py`; node-7 title aligned to the canonical h4 («Фильтр предгенерации»); prototype/extract copies deferred → §6.1 |
| E09 | `part_05.html` p5_ocean_basics | 17/17 | 9 | hex literals (KI#41/42 class) | pentagon axis labels → `REFERENCE_ONLY`; extreme-zone labels → `SHARED_REFERENCE` (§5.1 owns) |
| E10 | `part_05.html` p5_enneagram_basics | 13/17 | 12 | **value drift** (proto stale, §4.3) | type mini-cards (fear/desire/LIE) → `SHARED_REFERENCE` (canonical = §5.4 table; data layer `enneagram.json` must derive from it); hexad graph → `VISUAL_CANONICAL` |
| E11 | `part_06.html` p6_cot_tiers | 35/37 | 24 | none detected | tier definitions + model applicability (12B+/32B+/API) + template snippets → `SHARED_REFERENCE` (§6.3–§6.5 own); «Tier 0 работает для всех…» explanatory lines → `TEXTUAL_CANONICAL` candidates |
| E12 | `part_08.html` p8_antipatterns_overview | 59/61 | 38 | none detected | AP names/symptoms → `SHARED_REFERENCE` (Part 8 owns); per-AP fix imperatives with numbers («Держите RepPen 1.0–1.05…») → `TEXTUAL_CANONICAL` (numeric recommendation must have one canonical home — currently sides with §7A.7 against §7A.6, KI#72 family) |
| E13 | `part_09.html` p9_decision_tree | 40/40 | 37 | none detected | **unique diagnostic tree** (3 symptoms, checks, AP/E mappings absent from §9.5/§9.6) → `TEXTUAL_CANONICAL` decision required: canonicalize mappings in §9.6 (visual demonstrates) or declare `VISUAL_CANONICAL` (tree owns Debug knowledge); §6.2 |
| E14 | `part_09.html` p9_quality_scale | 17/18 | 9 | none detected | quality grade names → `SHARED_REFERENCE` (§9.1 owns) |
| E15 | `part_10.html` p10_annotated_blueprint | 42/45 | 42 | none detected | per-block budget ranges (min–max, derived totals) → `TEXTUAL_CANONICAL` derivation note needed (§7A.12 owns raw values; E15 shows totals — derivation rule must be stated once); block roles → `SHARED_REFERENCE` (§1.2). **Executed iter 135 (mig-4, slice §5.3):** min–max values verified == canonical; Examples total now carries the derivation note «(итог: 40–80 на пример × 2–5 примеров — §7A.12)»; canon `[VS: E15]` marker added with the derivation rule (TB-4/TB-5); parity-locked; prototype/extract deferred → §6.1 |
| E16 | `part_07a.html` p7a_authors_note | 31/31 | 20 | none detected | AN template A/B labels → `SHARED_REFERENCE` (§7A.5 owns) |
| E17 | `part_07a.html` p7a_sampling_params | 43/44 | 13 | none detected | 3-tier param table → `SHARED_REFERENCE` — **blocked on KI#72 value decision** (embed carries both sides labeled «базовая»/«чеклист»); annotations («Только Examples» etc.) → `REFERENCE_ONLY` |
| E18 | `part_07b.html` p7b_greeting | 16/16 | 5 | none detected | greeting algorithm steps → `SHARED_REFERENCE` (§7B.2 owns) |
| hero | — (unintegrated) | n/a | n/a | never integrated | `UNKNOWN` — §6.4 |

## 4. Registry B — concept clusters → canonical ownership (v2 dispositions PROPOSED)

| Cluster | Canonical owner (v1→v2) | Competing copies found (v1) | Proposed v2 disposition |
|---|---|---|---|
| CORE DIRECTIVES (7) | §7A.2 (prose + template) | E08 embed (titles+one-liners) · prototype E08 · extract E08 · fallback copy · glossary (canon app. + glossary.json) · Part 10 shorthand (sanctioned DEC-08) | E08 = the one visual presentation (`SHARED_REFERENCE`); Part 10/assembly keep `{{CORE_DIRECTIVES — …}}` shorthand; glossary entry = 1-sentence + link; **prototype/extract copies → `REMOVED_WITH_REASON` (stale derived copies) once visual-markup ownership decided (§6.1)** — second bounded area (ed-2 evidence reused). **EXECUTED iter 134 (mig-2, slice §5.2 D-1…D-8):** §7A.13 full copy → DEC-08 shorthand (canon + master mirror); E08 parity-locked; §7A.1/Part 10 verified shorthand ×4; prototype/extract still gated on §6.1 |
| Sampling values (KI#72 family) | **owner decision** (§7A.6 recommended by matrix) | §7A.7 checklist · E17 (both sides) · E12 AP-5 fix («1.0–1.05») · ~~`glossary.json` RepPen entry («1.00–1.10» — 5th location, found iter 132)~~ **eliminated iter 133: the generated registry defers values to §7A.6** | one canonical table; §7A.7/E17/E12 → `REPLACED_BY_CANONICAL` (defer/reference); **blocked on value decision** |
| Glossary | **v2 canonical term registry** (DEC-17: merged-with-review, 45 entries; canonical term record = source) | canon appendix 25 terms · `glossary.json` 55 terms (21 overlap, divergent definitions, version 9.2.0, dead `core_rules`) · generated no-JS `glossary.html` · never-loaded master appendix (KI#70) · runtime panel | **DECIDED (DEC-17):** single canonical term registry — per-term evidence §5.1 (25 canon entries MERGED + 20 machine-layer terms MOVED/promoted, 35 JSON terms folded in); chain = canonical term record → generated `glossary.json` → runtime panel / no-JS page; glossary stays the Reference-layer v2 representation of the registry; dead `core_rules` → `REMOVED_WITH_REASON`; KI#70 v1 wire/drop stays deferred (superseded by the v2 Reference-mode design) — **executed iter 133 (mig-1): registry + generator + generated machine layer + parity audit, all PASS** |
| Diagnostics (symptom→fix) | §9.5 + §9.6 (prose tables) | E13 unique tree (3 symptoms, mappings not in canon) | E13 mappings → owner decision: canonicalize into §9.6 (`TEXTUAL_CANONICAL`) or declare tree `VISUAL_CANONICAL`; §9.3/§9.11 stay checklists — third bounded area (Debug mode) |
| Token budget | §7A.12 (tables + rules) | E01 (~100–200 SP — wrong-side copy) · E15 (min–max + derived totals) | E01/E15 → `SHARED_REFERENCE` with derivation note («totals = per-example × count»); E01 SP range corrected to canonical 50–200 in the v2 slice. **EXECUTED iter 135 (mig-4, slice §5.3 TB-1…TB-8):** E01 values verified canonical at every layer (the wrong-side-copy claim corrected — not found in the repo); E15 derivation note added (master + canon marker); `[VS: E01/E15]` canon markers added; glossary already deferred (iter 133); no value decision needed |
| Enneagram data | §5.4 table | `enneagram.json` (LIE duplicated ×2) · E10 embed mini-cards · stale prototype E10 | JSON becomes derived from §5.4 (single internal copy of each value); prototype copy → `REMOVED_WITH_REASON` (stale, «Я фундаментально ущербен» 3-way drift) |
| Voice influence % | §3.2 table | E07 compressed scale + unique prose · `persona-voice-hierarchy.js` constants (sanctioned DEC-09) | E07 scale → `SHARED_REFERENCE`; E07 unique prose → `TEXTUAL_CANONICAL` candidate (§3.2 home decision); widget constants keep DEC-09 provenance header |

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

## 6. Owner decision points (blocking, in recommended order)

1. **Visual-markup ownership** (Registry A/L4-L5): master embed = canonical and
   prototypes/extracts become frozen design artifacts (default), or
   visual-system/ is re-established as the canonical visual source with a sync
   mechanism. Evidence: 93% identity, drift in E10/E01/E05/E06, no sync tooling
   (foundation §4.3).
2. **E13 diagnostic mappings**: canonicalize in §9.6 vs visual-canonical
   (Registry B row 4).
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
5. **Rule-strength convention** for v2 (RULE/GUIDELINE/OBSERVATION/EXPERIMENTAL/
   UNKNOWN markup) — needed before the Part 7A/8 v2 slices (model-capability
   percentages are OBSERVATION-strength; research §19 vocabulary).

---

## 7. Iteration log (registry changes)

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
