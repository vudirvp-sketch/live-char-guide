# Owner Gates — Recommendation Package (iter 144)

> **Status: AGENT RECOMMENDATION — not a decision.** Both gates stay owner-called
> (STATUS Next step rows 1–2; owner-gated rows are not auto-candidates). This
> package prepares the owner's call: verified evidence, options with
> consequences, a recommended call per gate, and a call order. Nothing here
> executes a gate, flips a Registry status to DECIDED, assigns a DEC-NN
> (`DECISIONS.md` entries appear only after the owner answers; next free =
> DEC-22), or opens the v2 architecture phase.
> Task: `iter-144-owner-gates-recommendation` (doc-only; v1 frozen, no
> production file touched — iter-137/141 precedent). BASE_COMMIT `ab0f3932`
> (iter 143).
> Verified against: `STATUS.md`, `PLAN.md` (rows sampling-cluster /
> v2-architecture / ki-72), `docs/research/migration_map_v2.md` (§2/§4 Registry
> A rows E12/E17 / Registry B sampling row), `docs/research/migration_foundation_iter131.md`
> (§3 layer model, §5.2, §8), `docs/research/presentation_intake_iter143.md`
> (§5 F1–F6), `docs/research/editorial_matrix.md` (R12; `p7a_model_checklist::02`;
> `p8_ap5_reppen_high::01`; `p9_additional_problems::02`; `p9_symptom_table::03`),
> `docs/canon/part_07a.md` (§7A.6/§7A.7), `docs/canon/part_08.md` (§8.6 AP-5),
> `docs/canon/part_09.md` (§9.3/§9.4/§9.5/§9.6/§9.10), `docs/canon/glossary_registry.md`
> (RepPen entry), `src/master/part_07a.html` (§7A.6/§7A.7 sections + E17 embed),
> `src/master/part_08.html` (E12 AP-5 card), `src/master/part_09.html` (§9.3/§9.4/§9.5
> mirrors), `DECISIONS.md` (DEC-09/15/16/17/18/19/20/21).

---

## 1. Situation

Two owner decision points remain open; the whole migration track waits on them:

| Gate | Blocks |
|---|---|
| **G1 — KI#72 sampling value decision** | the sampling-cluster build slice — the LAST bounded area of semantic extraction (Registry B row 2; PLAN row sampling-cluster); KI#72 = a reader-visible value contradiction open since iter 120 |
| **G2 — v2 architecture phase opening** | the next migration stage per the pinned order (`semantic extraction COMPLETE → v2 architecture → v2 build → parity audit → canonical audit → reader-path audit → switch`) |

Everything else executable without owner calls has been executed: six bounded
areas with MUST-PASS parity gates (glossary 133 · CORE DIRECTIVES 134 · token
budget 135 · enneagram 136 · diagnostics 139 · voice 142), all four map-§6
gates (DEC-19/20, iters 138–140), and every open question from the migration
foundation §8 is resolved (§8.1 → DEC-19; §8.2 → iter 140 disposal; §8.3 →
DEC-17/18; §8.4 → DEC-20).

**Documentation-loop alarm (AGENTS.md anti-loop), acknowledged:** iter 143 and
this iteration are both doc-only. The alarm's prescribed remedy — stop and ask
the owner — is exactly this package's terminal action: no further iteration
happens without the owner's answer, and the answer itself unblocks a functional
build slice (the DEC-18 precedent: the alarm was satisfied by the next
functional slice, not by more documentation).

## 2. Gate 1 — KI#72: canonical sampling values (32B+ Temperature / RepPen)

### 2.1 The verified live-location inventory

Every row was verified by direct read/grep this iteration (line numbers at
HEAD `ab0f3932`). The documented count («4 live locations: §7A.6 / §7A.7 /
E17 / E12») is CONFIRMED as the canonical-range locations — plus **three
hint-side spots verified NEW this iteration** (§2.3), all carrying the
«1.0–1.05» family as quick-fix hints.

| # | Layer | Location | Carries | State |
|---|-------|----------|---------|-------|
| 1 | L1 canon | `part_07a.md` §7A.6 «Базовые параметры» (L303–310) | Temperature 12B 0.6–0.8 · 12B–32B 0.7–0.9 · **32B+/API 0.7–1.0**; RepPen 12B 1.0–1.05 · 12B–32B 1.05–1.10 · **32B+/API 1.05–1.10**; PP 0.0 rule; «Никогда > 1.10» (AP-5) | **recommended canonical owner** (matrix R12; PLAN; Registry B) |
| 2 | L1 canon | `part_07a.md` §7A.6 «Модель-специфичные рекомендации» (L317–323) | 32B+ Temperature 0.7–0.9 · RepPen 1.05 (point recs); 12B (4K) 0.6–0.7 / 1.0; Claude/GPT 0.8–1.0 / — | consistent with #1 (point values inside the ranges) |
| 3 | L1 canon | `part_07a.md` §7A.7 checklist table (L331–345) | Temperature **32B+ 0.85–1.1** · RepPen **32B+ 1.0–1.05** (the contradicting rows); 12B–14B RepPen 1.05; API Temperature 0.9–1.0 | the KI#72 contradiction (canon-only — see #4) |
| 4 | L2 master | `src/master/part_07a.html` §7A.6 section (L620–661) | value table REPLACED by the E17 pointer + qualitative notes; «Модель-специфичные» kept in `<details>` (mirror of #2) | sync-audited; the E17 marker declares the replacement |
| 5 | L2 master | `src/master/part_07a.html` §7A.7 section (L664–692) | param table REPLACED by an E17 pointer + capability bullets | **the §7A.7 param rows are canon-only** — master already defers to E17 |
| 6 | L2 master | **E17 embed** (`part_07a.html` L475–616; root fallback mirror `parts/part_07a.html` L521+) | 32B+ column: Temperature «0.7–1.1*» split «**0.7–0.9 базовая** \| **0.85–1.1 чеклист**»; RepPen «1.0–1.10» split «**1.0–1.05 рекомендуется** \| **1.05–1.10 с осторожностью**»; 12B-14B column RepPen 1.0–1.05; API column Temperature 0.8–1.0, RepPen N/A | carries **BOTH sides, unresolved**, in production |
| 7 | L2 master | **E12 embed** (`src/master/part_08.html` L82, AP-5 fix card) | «Держите RepPen 1.0–1.05. Используйте MinP вместо этого.» | sides with §7A.7 (unqualified) |
| 8 | L1+L2 | §8.6 AP-5 prose (canon `part_08.md` L104–112; master L311–313) | «RepPen ≤ 1.10 для character cards» + §7A.6 ref | the boundary — consistent with §7A.6 under either outcome (Phase B) |
| 9 | L1+L2 | §9.3 express-checklist row (canon `part_09.md` L67; master L325) | «☐ RepPen ≤ 1.10? **(рекомендация 1.0–1.05)** ☐ PP = 0? ☐ Temperature в диапазоне? (0.6–0.8 для 12B)» + §7A.6 ref | compliant check (R12) with a 12B-context hint — see §2.3 |
| 10 | L1+L2 | §9.4 problems #4 (canon L83; master L344) | «Установите **RepPen 1.0–1.05**; проверьте PP = 0.0» | NEW hint spot — unqualified |
| 11 | L1+L2 | §9.5 symptom table row «Повторы фраз» (canon L237; master L523) | «**RepPen 1.02-1.05**, разнообразьте Examples» | NEW hint spot — point-range, unqualified |
| 12 | L1→L6 | glossary RepPen entry (registry L111 → generated `glossary.json`) | «Канонический диапазон — таблица §7A.6; превышение 1.10 — AP-5» | **defers to §7A.6** (5th location eliminated iter 133) |

**Verified NOT carrying sampling values:** all 12 widgets (`src/shell/widgets/`
grep clean), `data/*.json` (schema only), `tests/` (no sampling assertions),
§7A.11 4K-Fallback (no values), Appendix B (capability percentages, no
Temperature/RepPen values — but see §2.6: it rides the slice as the first
OBSERVATION-strength application). No parity audit covers this cluster yet
(`scripts/` has no `audit_sampling_parity.py`).

**The compliant-defer mesh already points at §7A.6** (verified): §9.3 · §9.5
(E17 ref) · §9.6 router (L226) · §9.10 (L228) · glossary (L111) · §8.6 (L112) —
six deferring references vs zero that defer to §7A.7.

### 2.2 What exactly contradicts what

- **32B+ Temperature:** §7A.6 says 0.7–1.0 (col. «32B+ / API») · §7A.7 says
  0.85–1.1. Ranges overlap only on 0.85–1.0; each contains values the other
  forbids (0.7–0.85 vs 1.0–1.1).
- **32B+ RepPen:** §7A.6 says 1.05–1.10 · §7A.7 says 1.0–1.05. Adjacent,
  non-overlapping ranges split exactly at 1.05.
- **Reader-visible surface:** E17's 32B+ column displays both sides labeled
  «базовая»/«чеклист» with a merged envelope and an asterisk — the production
  visual *documents the contradiction instead of resolving it*; E12's AP-5 fix
  card says «1.0–1.05» unqualified, which for 32B+ contradicts §7A.6's
  1.05–1.10 and §8.6's own «≤ 1.10» prose framing.
- **Adjacent minor drifts in the same family (verified, ride the same call):**
  §7A.7 12B–14B RepPen **1.05** vs §7A.6 12B **1.0–1.05**; §7A.7 API
  Temperature **0.9–1.0** vs §7A.6 model-specific / E17 **0.8–1.0**; §7A.7's
  tier labels («12B–14B») vs §7A.6's («12B», «12B–32B») — the two tables don't
  even share a column model.

### 2.3 New findings this iteration (beyond the documented 4 locations)

1. **Three additional hint-side spots** (#9/#10/#11 above): §9.3's
   parenthetical, §9.4 problem #4, §9.5's «1.02-1.05» row. All side with the
   «1.0–1.05» family; §9.3's is 12B-framed (consistent with §7A.6's 12B
   column), §9.4/§9.5 are unqualified (ambiguous for 32B+). The matrix already
   classifies §9.4::02 as DUPLICATE (fold into §9.5 — open editorial candidate,
   NOT this slice's scope) and §9.5::03 as the canonical KEEP lookup; the
   value re-frames ride the sampling slice either way so the family closes
   completely.
2. **E17's 32B+ column carries NEITHER canonical candidate as such:** the
   «базовая» sub-range 0.7–0.9 equals §7A.6's **12B–32B** middle column —
   §7A.6's actual 32B+/API value (0.7–1.0) appears nowhere in the embed, and
   the middle tier itself has no embed representation. Under any call, E17
   needs a re-point, not just a label swap.
3. **The «0.7–1.1*» asterisk has no footnote** (verified: no footnote block in
   or after the embed) — a small reader-facing blemish born of the same
   unresolved merge; it goes away with the re-point.

### 2.4 Invariants that hold under ANY call (Phase B, re-verified)

- **AP-5 boundary:** «RepPen ≤ 1.10» (§8.6 canon+master; E12 symptom card;
  §9.3 check) — both candidate 32B+ ranges sit inside it. No cross-part
  constraint appears (matrix R12 + `p8_ap5_reppen_high::01`).
- **AP-7 / PP = 0.0:** consistent everywhere (§7A.6 rule ×2 · §7A.7 · E17 all
  three columns · §9.3 · §9.4; matrix R12 «consistent ✓»).
- **The 12B column is consistent everywhere** (0.6–0.8 / 1.0–1.05) — the
  contradiction is 32B+-only; the 12B hints in §9.3–§9.5 stay valid.

### 2.5 Options

**Option A — §7A.6 = canonical (RECOMMENDED).** The repo's own recorded
recommendation (matrix R12: canonical owner = `p7a_sampling_params::03`;
PLAN row sampling-cluster; Registry B «§7A.6 recommended by matrix»).

Sub-calls the owner ratifies as one package (S = sampling):

- **S-a — canonical values:** the §7A.6 «Базовые параметры» table stays the
  single value owner: 32B+/API Temperature **0.7–1.0**, RepPen **1.05–1.10**
  (point recs via «Модель-специфичные»: 0.7–0.9 / 1.05; AP-5 boundary ≤ 1.10
  unchanged).
- **S-b — §7A.7 param rows:** drop the three param rows (Temperature / PP /
  RepPen) from the §7A.7 canon table, keep the five capability rows
  (Размещение голоса / XML / CoT / язык SP / Anti-godmoding) + a defer line to
  §7A.6 — the matrix `p7a_model_checklist::02` recommendation, and master
  §7A.7 already defers to E17 (canon catches up to the deployed shape).
- **S-c — E17 re-point (`SHARED_REFERENCE`):** the 32B+ column shows the
  canonical values (no «базовая/чеклист» split, no asterisk); the 12B–32B
  middle tier gets a disposition (representation or declared omission);
  `[VS: E17]` canon marker upgraded to the full `_README.md` §3.3 format.
- **S-d — hint re-frames:** E12 AP-5 fix card → defer/qualify («по типу
  модели — §7A.6»; the unqualified «1.0–1.05» is wrong for 32B+ under S-a);
  §9.3 parenthetical → 12B-qualified or defer; §9.4 #4 + §9.5 row →
  model-qualified or deferred to §7A.6. Glossary already defers (verified).

*Why A:* (1) §7A.6 is internally coherent — both its tables, the PP rules and
the AP-5 note orbit the same values, while §7A.7's table is a summary that
drifted; (2) the repo's cross-reference mesh already treats §7A.6 as canonical
(§2.1: six deferring refs, zero for §7A.7); (3) it is the recorded matrix/PLAN
recommendation; (4) cheapest correct edit — §7A.7's param rows are canon-only
(master already points to E17), so S-b touches canon, and the E17/E12/hint
re-frames are the rehearsed mig-2/mig-3/voice pattern.

*Costs/consequences (stated honestly):* the «0.85–1.1» Temperature side
disappears from the live site — readers who ran 1.0–1.1 on 32B+ lose the
displayed sanction for it (the canonical top becomes 1.0; AP-5's ≤ 1.10
boundary and the «с осторожностью» framing are unaffected); E17 gets a real
value change (envelope 0.7–1.1 → canonical display), the largest single edit
of the slice.

**Option B — §7A.7 = canonical (32B+ 0.85–1.1 / 1.0–1.05).** *Rejected:* it
contradicts the repo's recorded recommendation; it would force re-derivation of
§7A.6's internally-linked structure (model-specific table, 12B–32B tier, the
AP-5 note's anchoring at a range that touches the 1.10 boundary); more
reader-visible hints side with it, but hints are not canonical tables; and six
compliant cross-refs would need re-pointing vs zero today.

**Option C — union envelope (Temperature 0.7–1.1, RepPen 1.0–1.10), matching
E17's current merged display.** *Rejected:* it enshrines the contradiction as
policy — weaker guidance (a wider range is less of a recommendation), it
legitimizes both sides instead of reconciling them, and DEC-15's direction
(one canonical definition per concept, everywhere else defer) argues exactly
against keeping two sanctioned ranges. E17's merged display exists *because*
KI#72 is unresolved, not because a union is the intended semantics.

### 2.6 The build slice after the call (scope sketch — PLAN row sampling-cluster)

mig-2/mig-3/voice-cluster pattern, canon-first: canon §7A.6 confirmation +
§7A.7 param-row drop (S-b) → `[VS: E17]` full marker → §9.3/§9.4/§9.5/E12
re-frames (S-d) → master mirrors + E17/E12 re-points (S-c) → NEW
`scripts/audit_sampling_parity.py` (checks: canonical record + marker; §7A.7
defer; E17 re-point + no dual-side display + no orphan asterisk; E12/§9.x
hint defer; glossary defer; no competing range anywhere; root fallbacks
current) → E17/E12 prototype+extract disposal (`REMOVED_WITH_REASON`, DEC-19
at-slice-time; files verified present) → §6.5 rule-strength first application
(model-capability percentages in `appendix_model_table.md` = OBSERVATION) →
map/matrix/state files → full battery (canon + master touched). KI#72 CLOSED.

### 2.7 Cost / risk

One bounded slice, pattern rehearsed six times; no widget/data/schema change;
no version bump; battery expected green with the drift count unchanged or −1
(the dropped §7A.7 rows are canon-only). Residual risk: E17's visual re-point
is the first *value* change inside an executed-family embed (previous slices
re-pointed ownership, not numbers) — mitigated by the new parity audit + the
existing `audit_vs_embeds.py`.

## 3. Gate 2 — v2 architecture phase opening

### 3.1 What the phase is (verified inputs, all in-repo)

- **Position in the migration order:** semantic extraction is COMPLETE except
  Gate 1; the pinned order makes v2 architecture the next stage, before v2
  build / parity / canonical / reader-path audits / switch.
- **Reader modes:** Learn → Build → Debug → Reference (owner directive,
  chat 2026-09-14; foundation §2 maps `editorial_research_en.md` §23's
  reading-mode model onto them).
- **Layer model:** map §2 target (`L1 canon = truth → L2 master = production
  embeds referencing canonical values → L3 generated → L4/L5 frozen (DEC-19)
  → L6 generated data → L7 sanctioned widget constants → L8–L11 unchanged`).
- **The semantic inventory:** Registry A/B fully dispositioned except sampling
  (Gate 1) — six clusters parity-locked, one pending.
- **Presentation-layer input:** intake F1–F6 (reader-mode spec ·
  presentation-disposition column · checklist triage · example tiering · Part
  micro-template · `<details class="interactive">` disclosure policy).
- **Resolved foundations:** foundation §8 open questions all closed
  (DEC-19/20, iters 140); KI#70 appendix wire/drop = Reference-mode input
  (superseded as standalone, STATUS row 3); rule-strength convention ratified
  (DEC-20) with the sampling slice carrying its first application.
- **Precedent:** DEC-18 already opened the *v2 build phase* for bounded-area
  chains (glossary) — the architecture phase is the design stage that
  formalizes what those slices demonstrated locally.

### 3.2 What "opening" actually decides

Not a scope dump — two calls: **(a) WHEN to open** (now vs after the sampling
slice — §3.3) and **(b) the FIRST bounded slice of the phase.** Options for
(b), all owner-called (PLAN: «no scope defined before the call»):

- **P-a — consolidated v2 architecture specification (RECOMMENDED):** one
  design document (`docs/research/v2_architecture.md`, working name)
  consolidating: the layer model (map §2 as target), the **reader-mode
  specification** (F1: per mode — entry point, default visibility, on-demand
  disclosure), the presentation-disposition policy (F2 vocabulary on the
  matrix / Registry C), the disclosure-component policy (F6), the
  rule-strength markup convention (DEC-20 application), the cluster/parity
  inventory (7 clusters + gates), and the switch plan (audit stages → switch
  criteria). Acceptance: owner ratifies the spec → DEC-NN → v2 build slices
  execute per mode/Part.
- **P-b — reader-mode spec only (F1):** the narrowest opening; every other
  architecture decision rides a later slice.
- **P-c — vertical pilot:** one reader mode end-to-end on one Part (e.g.
  Learn on Part 1) as a walking skeleton before any spec.

*Why P-a:* every input is already verified and sitting in the repo (foundation
+ map + F1–F6 + DEC-17..21) — the spec is consolidation, not new research;
P-b defers decisions the phase exists to make; P-c risks building on an
unspecified architecture, against the track's own bounded-area discipline
(design → ratify → build). P-a also gives the owner ONE ratifiable artifact
for the whole stage, the iter-137-package → DEC-19+20 shape that has worked
four times.

### 3.3 Recommended order: Gate 1 first, phase second

1. **Decide Gate 1 now** (one line: «S-a…S-d» or your amendment) → the
   sampling build slice executes as the next iteration → semantic extraction
   closes 100% + KI#72 (reader-visible since iter 120) closes.
2. **Open the phase next** («P-a», or your amendment) → the architecture spec
   slice starts from a *complete* semantic inventory — no sampling-shaped hole
   in the target model, no live contradiction carried through the design stage.

*Why not the reverse order:* opening the phase first means the spec either
embeds the unresolved sampling values (bad input to a canonical design) or
blocks on Gate 1 anyway; and the live site keeps showing both sides of a
contradiction for the entire design stage. *Both calls can be answered in one
reply* — the iter-137 precedent produced DEC-19+20 from a single owner
message; this package is structured the same way.

### 3.4 What this package deliberately does NOT do

- No phase is opened; no phase scope is defined as decided; no DEC-NN
  assigned; no v1 content touched (frozen migration source); no Registry
  status flipped; no KI status changed (KI#72 stays OPEN until its slice).

## 4. The package for the owner (summary)

> **G1 (KI#72): §7A.6 = canonical — S-a values (32B+/API: T 0.7–1.0, RepPen 1.05–1.10) · S-b §7A.7 param rows → defer · S-c E17 re-point · S-d hint re-frames → then the sampling build slice (new parity gate, KI#72 CLOSED).**
> **G2 (v2 architecture): open AFTER the sampling slice — first slice P-a, the consolidated v2 architecture specification (reader modes + layer model + disposition policies + switch plan), owner-ratified before any v2 build slice.**
> One reply decides both (iter-137 → DEC-19+20 single-reply precedent).

## 5. Verification (executed this iteration)

- Preflight: `BASE_COMMIT = ab0f393261edbab8ba191fa38defc871fd89a50b`;
  `git status --short` empty at start (fresh clone).
- Fact checks (byte-level greps / direct reads, line numbers cited in §2):
  §7A.6 both tables (canon L303–310, L317–323) + master section L620–661
  (value table absent, E17 pointer + `<details>` mirror present); §7A.7 canon
  table L331–345 (incl. the contradicting rows L337/L339) + master section
  L664–692 (param table absent); E17 embed L475–616 (sub-range lines L521/L536;
  asterisk L518; no footnote found in L546–620); E12 fix card L82; §8.6 AP-5
  canon L104–112 + master L311–313; §9.3 row canon L67 + master L325; §9.4 #4
  canon L83 + master L344; §9.5 row canon L237 + master L523; glossary registry
  L111 deferring; root fallback mirror `parts/part_07a.html` L521; widgets/
  data/tests greps clean (no sampling values); `scripts/` listing (no
  `audit_sampling_parity.py`); visual-system E17/E12 prototype+extract files
  present (disposal rides the slice); matrix rows R12 / L316 / L980 / L434 /
  L443 read; foundation §2/§3/§5.2/§6/§8 read; intake §5 F1–F6 read; DECISIONS
  DEC-18/19/20/21 go-ahead provenance read (next free DEC-22).
- Doc-only battery (executed, no production file touched — iter-131/143
  precedent): `audit_canon_master_sync.py` **97/97 PASS** ·
  `audit_canon_master_drift.py --actionable-only` **159** actionable (baseline
  exact) · parity **×6 PASS** (glossary / core-directives / token-budget /
  enneagram / diagnostics / voice) · `git diff --check` clean. No
  `pnpm build`/`test` run — nothing in `src/`, `data/`, or root fallbacks
  changed.
