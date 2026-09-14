# Owner Gates — Recommendation Package (iter 137)

> **Status: AGENT RECOMMENDATION — not a decision.** All four gates stay owner-called
> (STATUS Next step; `migration_map_v2.md` §6 — owner-gated rows are not
> auto-candidates). This package prepares the owner's call: verified evidence, a
> recommended call per gate, consequences, and a call order. Nothing here executes a
> gate, flips a §6 status to DECIDED, or assigns a DEC-NN (`DECISIONS.md` entries
> appear only after the owner answers).
> Task: `iter-137-owner-gates-recommendation` (doc-only; v1 frozen, no production
> file touched). BASE_COMMIT `9b8d3138` (iter 136).
> Verified against: `migration_map_v2.md` (§2/§3/§4/§6/§7),
> `migration_foundation_iter131.md` (§4.2–§4.4, §5, §8), `STATUS.md`, `PLAN.md`
> (mig-3 row), `editorial_research_en.md` §19, `visual-system/hero/architecture-skeleton.html`,
> `visual-system/PLAN.md`, `visual-system/integration/INTEGRATION-MAP.md`,
> `src/master/part_09.html` (E13), `docs/canon/part_09.md`, `src/shell/styles.css`.

---

## 1. Situation

Four owner decision points remain open (map §6); the migration track waits on them:

| Gate | Blocks |
|---|---|
| §6.1 visual-markup ownership | prototype/extract disposals of the **four executed families** E08 + E01 + E15 + E10 (parity locks in place since iters 134–136); the general L4/L5 layer disposition |
| §6.2 E13 diagnostic mappings | **mig-3** (Diagnostics cluster / Debug mode — the last unexecuted Registry B bounded area with a ready plan) |
| §6.4 hero prototype | nothing downstream (dead-track cleanup) |
| §6.5 rule-strength convention | Part 7A/8 v2 slices (the sampling-cluster presentation ALSO waits on the separate KI#72 value decision) |

Four bounded areas are already live (glossary Reference chain, CORE DIRECTIVES single
presentation, Token budget single value owner, Enneagram single value owner) — the
track has consumed everything executable without owner calls.

## 2. Framing

These are not four independent taste calls. One is fundamental (ownership — §6.1),
two have strong evidence-backed recommended options (§6.2, §6.5), one is dead-track
hygiene (§6.4). The recommended package resolves uncertainty without opening new
architectural debt and unlocks the next real volume of work.

## 3. Recommendations

### 3.1 §6.1 Visual-markup ownership — CALL: master embed = canonical visual markup; L4/L5 frozen

**Recommendation.** Adopt the map §2 default: MASTER EMBED (L2) = the canonical
visual markup; `visual-system/elements/` prototypes (L4) +
`integration/component-extracts/` (L5) = frozen design artifacts. The archive is git
history + recorded reasons: per-family stale copies are disposed as
`REMOVED_WITH_REASON` (the repo's own prepared disposition — Registry B rows 1/6) at
their slice time, not kept as a second source of truth.

**Evidence (verified).**

- Prototype↔embed identity 93% (494/532 embed strings — foundation §4.2): the
  prototype layer is a near-verbatim second copy of production.
- No sync mechanism exists for L4/L5 (map §2: «none, drifted» / «none, stale»).
- Live drift: E10 three-way value drift («Я фундаментально ущербен» vs canonical
  «Что-то фундаментально отсутствует во мне»), E01/E05/E06 russification lag,
  extracts still on `var(--token)` (foundation §4.3).
- Foundation §4.3 INFERENCE: master embeds are the de-facto production canonical for
  visual markup; no layer currently owns visual-markup semantics.

**Why this call.** Production already works this way; keeping prototypes as a second
canon means consciously preserving a future-drift source. The resulting architecture
is the map §2 target model: **canon owns knowledge → master owns visual
implementation → root fallbacks are generated.**

**Consequence — what becomes runnable.** A mechanical disposal slice for the four
executed families (E08, E01, E15, E10): `git rm` the prototype + extract copies; map
Registry A/B statuses → `REMOVED_WITH_REASON` (executed); the four parity audits'
deferred-layer notes updated; `AGENT_NAVIGATION.md` §1 visual-system row → frozen.
Future slices stop needing per-slice prototype-sync decisions (E05/E06/E09… ride the
same freeze at their own slice time).

**What this call does NOT decide.** The hero directory (§6.4 — separate call,
§3.4); the v2 visual pipeline design (post-switch question).

### 3.2 §6.2 E13 diagnostic mappings — CALL: TEXTUAL_CANONICAL (mappings → §9.6; E13 = visual presentation)

**Recommendation.** Canonicalize the unique diagnostic mappings (symptom → check →
branch → AP/E) in canon §9.6; E13 stays the visual presentation / decision aid of
that tree. Do NOT declare E13 VISUAL_CANONICAL.

**Evidence (verified).**

- E13 carries a full symptom → check → branch → AP/E mapping for 3 symptoms
  («Персонаж дрейфует после 5–10 сообщений», «Голос звучит типично / неразличимо»,
  «Персонаж игнорирует действия пользователя»); none of these rows exist in §9.5
  (11-row symptom table) or §9.6 (5 symptom groups) — foundation §4.4: a competing
  diagnostic source, not a presentation of §9.6.
- Canon §9.6 already claims E13 is «визуальная версия дерева для 3 базовых
  симптомов» (`part_09.md` L139) — today the claim is false (the mapping content is
  not a subset of the §9.6 table). TEXTUAL_CANONICAL makes the existing canon
  statement true.
- The E13 prototype is identical to the embed (P/I 40/40) — unlike E10, no
  stale-copy risk; disposal under §6.1 is safe.

**Why text over visual.** Diagnostic knowledge locked inside a visual embed is
worse for search, testing, and authority; the Debug reader mode needs a textual
canonical home. VISUAL_CANONICAL is reserved for demonstration-only material (E03
example rows, E10 hexad geometry) — a tree that owns unique diagnostic mappings is
not demonstration. This matches the owner's v2 principle: knowledge lives once;
other forms expose, demonstrate, navigate to it.

**Consequence — what becomes runnable.** mig-3 unblocks (PLAN row, Registry B row 4)
on the established slice pattern: canon §9.6 mappings (Editorial Policy 5-point
check applies — E13 keeps its visual function) → master mirror → E13 re-pointed to
the canonical mapping → new `audit_diagnostics_parity.py` + Debug reader-path audit
(symptom → cause → test → one-change → validation).

### 3.3 §6.5 Rule-strength convention — CALL: ratify RULE / GUIDELINE / OBSERVATION / EXPERIMENTAL (+ UNKNOWN = temporary uncertainty only)

**Recommendation.** Ratify the four strength classes as the v2 convention, with
UNKNOWN strictly a temporary uncertainty marker (same semantics as map §1 UNKNOWN:
never a final class; never deleted while UNKNOWN). Apply incrementally — per slice,
as sections are touched. Do NOT mass-annotate v1 or v2 (documentation-loop alarm,
AGENTS.md anti-loop; scope discipline).

**Evidence / status (verified).**

- The vocabulary is already owner-directed (foundation §8.4; map §6.5 lists
  RULE/GUIDELINE/OBSERVATION/EXPERIMENTAL/UNKNOWN) — this call is a formal
  ratification + semantics + application scope, not a new invention.
- Research §19 (`editorial_research_en.md` §19 «Some Statements Are Too Normative»)
  proposes a four-class vocabulary; mapping to the owner tokens: Rule → RULE ·
  Recommended target → GUIDELINE · Observed heuristic → OBSERVATION · Diagnostic
  threshold → per case (hard limit → RULE, empirical tendency → OBSERVATION);
  EXPERIMENTAL is the owner-added token with no research counterpart.
- v1→v2 continuity: the guide already carries a 2-class system — ПРАВИЛО
  (`.callout.rule`) ↔ RULE, РЕКОМЕНДАЦИЯ (`.callout.rec`) ↔ GUIDELINE (fence #18,
  DEC-16 labels). OBSERVATION and EXPERIMENTAL are new; their markup representation
  (attribute vs callout class vs canon-side convention) is an implementation detail
  for the first consuming slice / the v2 architecture phase — new components need
  infrastructure approval (fence #7, `docs/components.md`).
- Known first applications: model-capability percentages (`appendix_model_table.md`)
  are OBSERVATION-strength claims, not hard guarantees (foundation §8.4, map §6.5).

**Dependency note.** The sampling-cluster v2 slice (Registry B row 2) waits on §6.5
AND on the separate KI#72 canonical-value decision (matrix recommends §7A.6) —
ratifying §6.5 alone does not unblock Part 7A content work.

### 3.4 §6.4 Hero prototype — CALL: remove / archive, do not integrate

**Recommendation.** Do not integrate. Under the §6.1 recommended call the hero rides
the frozen `visual-system/` directory; §6.4 then reduces to confirming no extraction
is needed + cleaning the one production-side residue (the dead CSS stub, KI#81).

**Evidence (verified this iteration — two NEW findings).**

- Never integrated: no `hero` section in `src/shell/index.html`; the INTEGRATION-MAP
  row (target `index.html` intro section, `<section id="hero">`) was never executed;
  the file carries its own label-overlay markup
  (`visual-system/hero/architecture-skeleton.html`, 428 lines).
- **NEW (a):** the hero runs on Three.js loaded from `cdn.jsdelivr.net` via
  importmap (`three@0.164.1` + EffectComposer/RenderPass/UnrealBloomPass addons,
  L85–95). Integration would reintroduce the external-CDN script dependency class
  that iter-113 deliberately removed (Mermaid; `script-src` tightened) — or require
  vendoring a large bundle (`visual-system/PLAN.md` itself budgets <300 KB and makes
  the scene optional with a static fallback for bandwidth-constrained users).
- **NEW (b):** dead CSS residue from the never-executed integration:
  `.vs-hero-placeholder` rules in `src/shell/styles.css`
  L557/L7006/L7015/L7027/L7043 (5 occurrences incl. theme-light) have ZERO
  consumers across `src/`, `parts/`, `widgets/` (introduced by the Phase-4
  integration commit `0addf38d`, never used; root fallback `assets/shell-styles.css`
  mirrors it). Recorded as **KI#81**; cleanup rides the §6.4 disposal slice.

**Why not integrate.** No evidence in the repo requires a hero: it never entered
production, has no section contract, and would need a new place + contract + CSP
decision in the production architecture. Integrating an unused prototype is an
investment with no consuming requirement — the opposite of the track's
bounded-area discipline.

## 4. Recommended call order: §6.1 → §6.2 → §6.5 → §6.4

Dependency/unblock value, not importance:

1. **§6.1** releases four already-prepared disposals (parity-locked families
   E08/E01/E15/E10) — the largest unblocked volume.
2. **§6.2** releases mig-3 — the last Registry B bounded area with a ready plan.
3. **§6.5** must precede the Part 7A/8 v2 slices (the sampling cluster additionally
   needs the KI#72 value call).
4. **§6.4** gates nothing — last.

This differs from the map §6 numbered order only by demoting §6.4 below §6.5.

## 5. The package for the owner (summary)

> **§6.1 = MASTER EMBED canonical / L4-L5 frozen (stale copies → REMOVED_WITH_REASON at slice time)**
> **§6.2 = TEXTUAL_CANONICAL / mappings → §9.6 / E13 = visual reference**
> **§6.5 = RULE / GUIDELINE / OBSERVATION / EXPERIMENTAL ratified (+ UNKNOWN = temporary uncertainty only; incremental application)**
> **§6.4 = REMOVE/ARCHIVE hero (rides the §6.1 freeze; KI#81 CSS cleanup)**

Minimal set: removes uncertainty, opens no new architectural debt, unblocks the next
real volume of work.

## 6. What this package deliberately does NOT do

- No gate is passed and no §6 status flips to DECIDED; no DEC-NN assigned
  (DECISIONS.md entries appear only after the owner answers).
- No prototype/extract file is deleted; no v1 content touched (frozen migration
  source); no KI#81 fix (out of scope — recorded, deferred to the §6.4 slice).
- No rule-strength markup or annotation is added anywhere.

## 7. Verification (executed this iteration)

- Doc-only: `git diff --check` clean; diff vs BASE_COMMIT = only the intended files.
- Fact checks (byte-level greps / direct reads): `vs-hero-placeholder` consumers
  (zero outside the two stylesheet copies — `src/shell/styles.css` + regenerated
  root fallback); hero Three.js importmap lines (L85–95); `hero` in
  `src/shell/index.html` (absent); INTEGRATION-MAP hero row; canon `part_09.md`
  L139 E13 claim; E13 embed at `part_09.html:9`; foundation §4.2/§4.3/§4.4 numbers;
  map §2/§3/§4/§6 cross-read; research §19 four-class table; PLAN mig-3 row;
  worklog/CHANGELOG/DECISIONS cross-read (DEC numbering intact — next free DEC-19).
- No build/test battery run — no production file modified (iter-131 doc-only
  precedent).
