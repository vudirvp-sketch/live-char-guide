# Voice Influence % Cluster — Owner-Gate Recommendation Package (iter 141)

> **Status: AGENT RECOMMENDATION — not a decision.** The voice-cluster disposition
> stays owner-called (STATUS Next step row 1; `migration_map_v2.md` Registry B
> row 7 — owner-gated rows are not auto-candidates). This package prepares the
> owner's call: verified evidence, a recommended call per sub-question,
> consequences, and what the build slice becomes after the call. Nothing here
> executes a disposition, flips a Registry status to DECIDED/EXECUTED, or assigns
> a DEC-NN (`DECISIONS.md` entries appear only after the owner answers; next
> free = DEC-21).
> Task: `iter-141-voice-cluster-evidence` (doc-only; v1 frozen, no production
> file touched — iter-137 precedent). BASE_COMMIT `e5a387ae` (iter 140).
> Verified against: `migration_map_v2.md` (§2/§3/§4/§6/§7),
> `migration_foundation_iter131.md` (§4.2–§4.4, §5.7), `STATUS.md`, `PLAN.md`
> (voice-cluster row), `DECISIONS.md` (DEC-09/15/16/17/19/20),
> `docs/canon/part_03.md` (§3.1/§3.2), `docs/canon/part_07a.md` (§7A.5/§7A.7),
> `docs/canon/glossary_registry.md`, `src/master/part_03.html`,
> `src/master/part_07a.html`, `src/shell/widgets/persona-voice-hierarchy.js`,
> `visual-system/elements/E07-voice-hierarchy.html`,
> `visual-system/integration/component-extracts/E07-visual.html`,
> `visual-system/PLAN.md`, `docs/content_map.md`,
> `docs/research/editorial_matrix.md` (§ Part 3).

---

## 1. Situation

The voice influence % cluster (Registry B row 7) is the **last unexecuted bounded
area** of the v1 → v2 migration active track. Its competing copies are already
inventoried (foundation §5.7): canon §3.2 table · E07 embed ·
`persona-voice-hierarchy.js` constants. The pinned Next-step row splits the work
exactly as the iter-137 §6-gate pattern prescribes: the agent prepares the
verified evidence + recommendation package (this document); the disposition
decision itself and the build slice stay owner-called.

Unlike the four §6 gates packaged iter 137 (all executed by iter 140), this gate
has **one decision with five sub-questions** (V-a…V-e below), of which only one
touches values (V-d, the AN-12B framing). The cluster's numeric core is already
in green parity at every layer — the open questions are about unique prose, widget
notes, and one framing tension.

## 2. The verified evidence inventory

Every row below was verified by execution this iteration (script
`verify_voice_cluster_iter141.py` — text-string extraction + value comparison;
plus targeted greps). Line numbers are at HEAD `e5a387ae`.

### 2.1 Value-carrying locations (the 6×3 percentage set + derived claims)

| # | Layer | Location | Carries | State today |
|---|-------|----------|---------|-------------|
| 1 | L1 canon | `docs/canon/part_03.md` §3.2 L56–63 | the exact 6×3 table | **canonical owner** (Registry B row 7) |
| 2 | L2 master | `src/master/part_03.html` L186–191 | table mirror | sync-audited (97/97) |
| 3 | L2 master | `src/master/part_03.html` L8–131 | **E07 embed**: compressed-scale label «~75-85% (сжатая шкала)» ×1 + inset «доминирует на ~75-85%» ×1 + «0% ЗАПРЕЩЕНО» + «~0%» + bar geometry (78 px = 5%) | deployed visual |
| 4 | L7 widget | `src/shell/widgets/persona-voice-hierarchy.js` L38–45 | `VOICE_SOURCES` — 18 values + 6 note strings | DEC-09 sanctioned (provenance header L34–37) |
| 5 | L2 master | `src/master/part_07a.html` L345 + L393 | **E16 embed**: «~2–5% → E07» + «Влияние на голос: E07 (~2–5%)» | derived range (min–max of the §3.2 AN row — verified: 2,3,5 → 2–5) |
| 6 | L1 canon | `docs/canon/part_07a.md` L222 + L224 | `[VS: E16]` marker prose («AN влияет на голос ~2–5%») + model-gating note («справедливо только для API-моделей; на 12B AN не влияет») | cross-presentation |
| 7 | L1 canon | `docs/canon/glossary_registry.md` L230 → generated `data/glossary.json` → `parts/glossary.html` | «для 12B моделей Description = 0% влияния» restatement | value == canonical (0%); entry carries `[ref: part_03.md §3.1]`; DEC-17/18 chain, glossary parity PASS |
| 8 | L4/L5 frozen | `visual-system/elements/E07-voice-hierarchy.html` · `integration/component-extracts/E07-visual.html` · `visual-system/PLAN.md` L605 | prototype (text-identical to embed — verified P/I 23/23) · extract · design-doc table copy | frozen design artifacts (DEC-19) |
| 9 | L3 | `parts/part_03.html` | root fallback (regenerated) | generated |

**Value parity (verified):** the widget's 18 constants equal the canon §3.2 table
**6/6 rows, 0 mismatches**; the master mirror is byte-identical to the canon
table modulo HTML encoding. There is **no KI#72-style live value contradiction**
in the 6×3 set. The E07 compressed presentation «~75-85%» is a declared
range-of-row («Recent chat» = 75/80/85 by model), not a divergent value.

### 2.2 Prose/knowledge payload without a textual canonical home (verified absent from `docs/canon/**`)

| Payload | Lives in | Count in canon |
|---|---|---|
| «Хранилище vs Влияние» conceptual distinction (storage = where patterns are *written* ≠ influence = what *forms* behavior) | E07 inset (`part_03.html` L113–126; prototype identical) | **0** |
| Misconception correction: «Пользователи часто предполагают, что SP = наибольшее влияние…» + drift implication («Недавний чат … основной источник дрейфа голоса с течением времени») | E07 inset | **0** |
| Quantitative claim: «модель копирует последние ~10–20 сообщений» (recent-chat window) | widget note L39 | **0** |
| Quantitative claim: «Задаёт стартовый тон; влияние падает после ~5 реплик» (greeting decay) | widget note L41 | **0** |
| Presentational strings: «сжатая шкала», «разделённую ось», split-axis notes, «→ E16» | E07 embed | 0 (presentation artifacts — geometry conventions, no independent knowledge) |

The embed's text payload splits **11 in-canon / 12 not-in-canon** of 23 extracted
strings (my method: SVG `<text>` + inset/note divs; foundation §4.2's method
counted 6/20 of 26 — different string-set boundaries, same conclusion: roughly
half of E07's text has no textual home). The 4 remaining widget notes are
rule-restatements (Description 0% · AN-12B · SP-12B · Examples quality) —
operational reminders, DEC-09-compliant as prose values.

### 2.3 Structural state around §3.2 (verified)

- **Weak canon marker:** §3.2's `[VS: E07]` marker (L52) is the pre-migration
  style — «См. маркер в preamble» while the front-matter says `vs_embedded: none`
  (broken pointer), no ownership/disposition declaration. Executed slices carry
  full markers (E01/E10/E15 declare SHARED_REFERENCE + audit; E13 declares
  TEXTUAL_CANONICAL + audit — `_README.md` §3.3 format, iter-139 precedent).
- **Repo-wide observation (not E07-specific):** every canon front-matter still
  says `vs_embedded: none` (part_01/03/05/09/10 verified) — pre-existing
  staleness, no reader impact (front-matter is not rendered), rides the v2
  canon format. Not a KI; recorded here so it is not re-discovered.
- **No parity audit covers this cluster:** the widget's values are locked only by
  the DEC-09 convention header; `tests/` covers the widget only via the
  visual-parity selector check. Every executed bounded area ended with a
  dedicated parity gate (glossary / core-directives / token-budget / enneagram /
  diagnostics) — the voice slice would add `audit_voice_parity.py`.
- **OBSERVATION-strength anchor already exists:** §3.1 L37 «Методология»
  explicitly covers §3.2 («Аналогичные проценты в §3.2 … — той же природы» —
  qualitative orientations, not measurements). Under DEC-20 the whole table is
  OBSERVATION-strength by declaration; no new rule-strength markup is needed.

## 3. Findings that shape the call

**F1 — the numeric core needs no value decision.** All 18 values are in green
parity across canon/master/widget (§2.1). The disposition is architectural
(ownership declaration + prose canonicalization), not a KI#72-style
reconciliation. This makes the gate lower-risk than §6.2 was.

**F2 — the unique prose is real knowledge, not decoration.** The «Хранилище vs
Влияние» distinction explains *why* the hierarchy looks the way it does and
corrects the single most common reader misconception (SP primacy); the two widget
quantitative claims (~10–20 messages; ~5 replies) give the reader operational
windows the table itself does not carry. None of it exists in canon (§2.2). A
no-JS reader never sees the widget notes; canon↔master sync never sees them
either (JS layer) — they are invisible to every existing audit.

**F3 — AN-12B framing tension (the only value-adjacent question).** The §3.2
table gives AN 12B = **~2%**, while three live statements say 12B AN has **no**
voice influence: canon §7A.5 L224 note («на 12B AN не влияет на голос») · canon
§7A.7 L348 РЕКОМЕНДАЦИЯ («На 12B — нет, AN не влияет на голос») · widget note L42
(«На 12B AN не влияет на лингвистический голос»). ~2% vs 0% is
rounding-level, but the cluster internally disagrees about where the
negligible-influence boundary sits (and E16's «~2–5%» range builds on the same
row: it is the min–max of the AN values (verified) and is already model-gated
in canon §7A.5 L224).

**F4 — row-label language divergence.** Row 1 is labeled «Recent chat» in the
canon table, master table, and widget, but «Недавний чат» in the E07 embed (+
prototype). The other five row labels are card-field names (identifier class,
DEC-16 — stay English); «Recent chat» is an ordinary concept, already russified
in the visual. The SHARED_REFERENCE lock must declare which label form is
canonical per row.

**F5 — KI#82 (NEW, doc-side, opened this iteration).** `docs/content_map.md` L60
(§3.2 row, Notes column) carries «SP > Description > Examples > Greeting» —
reads as an influence ordering with SP first; the actual hierarchy is Recent
chat ≫ Examples > Greeting > AN > Description > SP (SP weakest, ~0–2%), and the
note omits Recent chat and AN entirely. Misleading navigability summary in the
concept-ownership registry (the map's own header calls it the single source of
truth for "where does concept X live"). Same defect family as KI#77 (wrong/stale
references; reader impact = navigability only). Fix = one-line Notes correction;
rides the voice-cluster build slice (KI#81 precedent: recorded during the
evidence package, closed in the build slice).

**F6 — glossary restatement is compliant.** The registry's «Description = 0%»
clause matches the canonical value exactly, sits in the ratified entry with a
`[ref: part_03.md §3.1]`, and flows through the generated chain (DEC-17/18,
parity PASS). No action needed; noted so the inventory is complete. (Entry
length is a mig-1 domain question, not this cluster's.)

**F7 — prototype/extract are safe under the freeze.** E07 prototype text is
100% identical to the embed (P/I 23/23 — no E10-style stale-copy risk); the
extract and the design-doc table copy are frozen (DEC-19) and resolve to git
history at the slice's disposal step, exactly as E08/E01/E15/E10 did iter 138.

## 4. Recommendations

> One gate, five sub-calls. V-a/V-b mirror the already-ratified map §2 defaults
> and DEC-20 precedent; V-c and V-e are slice-shaping details surfaced by this
> package; V-d is the only one that touches framing/values.

### 4.1 V-a — E07 scale + table → `SHARED_REFERENCE` (§3.2 table stays the value owner)

**Recommendation.** Confirm the map's own proposal: the §3.2 table remains the
single canonical value owner; E07 is the visual presentation of that table
(compressed scale + split axis + red 0% marker are *visual encodings*, not
values); the widget constants keep the DEC-09 provenance header.

**Evidence.** Green parity at every layer (§2.1); nothing competes with the
table; E09/E04/E14 are the same disposition class; the E13 (iter 139) and E15
(iter 135) slices are the direct precedents for the marker/re-point mechanics.

**Why this call.** It changes nothing semantically — it *declares* what already
holds, and locks it with a parity gate so it cannot silently break (§2.3: no
parity audit covers this cluster's values today).

### 4.2 V-b — E07 unique prose → `TEXTUAL_CANONICAL` in §3.2

**Recommendation.** Canon §3.2 gains one short prose block canonicalizing:
(i) the «Хранилище vs Влияние» distinction, (ii) the SP-primacy misconception
correction with the drift implication, and (iii) the two widget quantitative
claims (V-c). The E07 inset becomes the visual presentation of that block; the
canon `[VS: E07]` marker is upgraded to the full format declaring the
relationship (values SHARED_REFERENCE · prose TEXTUAL_CANONICAL · parity audit
name). Do **not** declare E07 VISUAL_CANONICAL.

**Evidence.** The prose is unique knowledge with zero textual home (§2.2); it
corrects the most common misconception about the whole §3.2 table; it is
invisible to no-JS readers and to every existing audit. DEC-20 settled the
identical question for E13: knowledge locked inside a visual embed is worse for
search, testing, and authority. `viz > dry text` is preserved — the E13 pattern:
canon owns the knowledge, the visual demonstrates it, the marker declares the
relationship («Замещает отдельное текстовое описание … даёт визуальный способ
…», `part_09.md` L152).

**What this call does NOT decide.** The exact wording of the canonical block
(Editorial Policy 5-point check applies at slice time; the inset keeps its
visual function — compress presentation, never capability, DEC-15).

### 4.3 V-c — widget notes: split disposition (values stay DEC-09; two claims canonicalize)

**Recommendation.** Split the six notes: the **two unique quantitative claims**
(~10–20 messages; ~5 replies) canonicalize into §3.2 prose under V-b (they are
reader knowledge currently visible only through JS); the **four rule
restatements** (Description 0% · AN-12B · SP-12B · Examples-quality) stay
widget-local operational reminders — DEC-09 unchanged, values untouched, header
gains a one-line note-deference declaration.

**Alternative considered and rejected:** extracting the notes into
`data/*.json`. It contradicts DEC-09's own rationale (these are canonical prose
values, not user-editable widget data), adds a machine layer for six strings,
and would make the widget read its own explanations through a data file — a new
convention, not an existing pattern.

### 4.4 V-d — AN-12B framing reconciliation (the only value-adjacent call)

**Recommendation — Option A (table wins, two prose statements re-frame).** Keep
§3.2 AN 12B = ~2%; re-frame the two «не влияет» statements (§7A.5 L224 note,
§7A.7 L348) to «влияние пренебрежимо мало (~2%)»-class wording at slice time; the
widget note follows the same wording. No numeric change anywhere; the table's
2→3→5 gradient is preserved; E16's «~2–5%» stays valid as the min–max.

**Why A.** The table is the declared value owner (V-a); fence #11
(one-canonical-definition) makes the prose defer to it, not vice versa; the
percentages are OBSERVATION-strength (§3.1 Методология, DEC-20), so an honest
«≈ negligible, ~2%» is more accurate than a hard 0; and 0% already carries RULE
semantics in this table (Description «0% ЗАПРЕЩЕНО» — a hard prohibition), which
AN-12B would dilute.

**Option B (prose wins, three-layer numeric change).** §3.2 AN 12B cell → 0%,
widget constant 2 → 0, E07 AN-row 12B bar → zero-width marker, E16 range → 0–5%.
Consequence: a value change across canon + JS + visual geometry on an
OBSERVATION-strength claim, and the AN row loses its model gradient (0/3/5).
Defensible only if the owner reads the 12B AN effect as strictly zero — the repo
carries no measurement that distinguishes ~2% from 0 (the numbers are declared
qualitative orientations), which is itself the argument for the cheaper Option A.

### 4.5 V-e — row-label canonicalization (minor, rides the slice)

**Recommendation.** Canonical row labels = the current canon-table forms for the
five card-field names (Examples · Greeting · Author's Note · Description ·
System Prompt — identifier class, DEC-16); row 1 russifies to «Недавний чат» in
the canon table (aligning with the already-russified visual; DEC-16 ordinary
concept), with the widget/export labels following the canonical set. One-word
canon+master edit inside the slice; E07's existing label stays as-is.

If the owner prefers zero label churn, keeping all six English forms in the
table is acceptable too — the requirement is only that the parity audit locks
*one* declared label set (the divergence itself, F4, is what must not survive
the slice).

## 5. What the build slice becomes after the call (sketch)

Pattern = mig-2/mig-3 (canonical record → master mirror → embed re-point →
parity audit; **no machine layer** — DEC-09 already covers the widget side):

1. **Canon §3.2:** full `[VS: E07]` marker (ownership + both dispositions + audit
   name); the canonical prose block (V-b/V-c); optional V-a label alignment
   (V-e); `[INTERACTIVE WIDGET]` marker note extended with the notes disposition.
2. **Canon §7A.5/§7A.7 (only under V-d Option A):** the two re-framed statements.
3. **Master mirrors:** §3.2 prose block mirror; E07 embed comment re-point
   (canonical ownership declared); E16 badge gains a one-line derivation note
   («диапазон = мин–макс строки AN, §3.2» — E15 derivation-note pattern).
4. **Widget:** DEC-09 header note extension only (no value change under A).
5. **New gate `scripts/audit_voice_parity.py`** (checklist sketch: canon
   inventory 6×3 + prose block + full marker; master mirror; E07 embed parity
   (scale labels, 0% markers, row labels vs declared set); widget constants ==
   canon 18 values; E16 badge derivation; glossary entry defers; no competing
   sources; root fallback current; map/matrix parity).
6. **Registries/state:** map Registry A E07 + Registry B row 7 → EXECUTED; §6
   row 6 → DECIDED (DEC-21); §5.x voice slice seeded (matrix rows
   `p3_influence_hierarchy::01–::08` back-pointers); content_map §3.2 Notes fix
   (**KI#82 CLOSED**); STATUS invariant + AGENTS.md canon-audits block += the
   new MUST-PASS gate; prototype/extract disposal rides DEC-19 at slice time
   (F7).
7. **Battery:** full (canon + master + widget touched): build · validate ·
   validate:master · version:check · tests · qa baselines (english 18 / syntax
   247 must not increase) · sync 97/97 · drift (expected to move with the §3.2
   canon additions — informational) · parity ×6.

## 6. What this package deliberately does NOT do

- No disposition is DECIDED; no Registry status flips; no DEC-NN assigned
  (DEC-21 reserved for the owner's answer).
- No canon/master/widget/`src/`/`data/` file touched — v1 frozen (iter-137
  doc-only precedent).
- No KI#82 fix (out of scope — recorded in STATUS, deferred to the build slice).
- No parity audit script created (build-slice item); no matrix/Registry C
  seeding (build-slice item); no canon marker edit (build-slice item).
- No prototype/extract disposal (DEC-19 freeze; rides the slice, like
  E08/E01/E15/E10 iter 138).

## 7. Verification (executed this iteration)

- **Battery (Python, doc-only scope — iter-138 precedent):**
  `audit_canon_master_sync.py` **97/97 PASS** (exit 0) · glossary /
  core-directives / token-budget / enneagram / diagnostics parity **×5 PASS** ·
  `audit_canon_master_drift.py` informational — actionable **159** (matches the
  iter-140 record at the same content; unchanged — no source file touched).
- **Cluster verification script** (read-only, run against the repo):
  widget constants vs canon §3.2 — **6/6 rows, 0 mismatches**; E07 prototype vs
  embed text identity — **23/23**; embed strings vs canon — 11 in / 12 not-in
  (of 23); unique-prose phrase counts in `docs/canon/**` — «Хранилище» 0 ·
  «Пользователи часто предполагают» 0 · «сжатая шкала» 0 · «разделённую ось» 0 ·
  «10–20 сообщений» 0 · «после ~5 реплик» 0; E16 «~2–5%» = min–max of the §3.2
  AN row (2,3,5), 2 occurrences in master + 2 in canon; AN-12B «не влияет»
  statements — 2 in canon part_07a + 1 in widget; «~75-85%» — 2 in master embed +
  2 in root fallback; «Description = 0%» — glossary registry 1 → generated JSON
  1 → no-JS page 1; E07 extract exists (frozen); content_map §3.2 stale Notes
  confirmed present.
- **Doc-only git checks:** `git status --short` empty before edits; `git
  diff --check` clean after; diff vs BASE_COMMIT = only the intended files.
- No node battery — no `src/`/`data/`/build-path file modified (iter-131
  doc-only precedent).
