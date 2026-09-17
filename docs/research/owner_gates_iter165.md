# Owner-gates recommendation package — iter 165 (doc-only)

> **Status:** agent-prepared input for the switch-time owner calls — the iter-137 /
> iter-141 / iter-144 package precedent. **Nothing below is DECIDED.** Every gate stays
> owner-called; the recommendations carry evidence + consequences, not decisions. After the
> owner's reply, each called reconciliation executes as its own bounded slice (the DEC-21/22
> build-slice precedent) and the switch proceeds per Q8/Q9.
> **BASE:** `5a30f610` (iter 163) with the iter-164 stage on top (map §5.25 — the reader-path
> audit COMPLETE; the migration tail done, the switch pending).
> Sources verified by direct read this iteration: map §5.24 + §5.25 (the owner-gate
> candidate lists), the observation-package records (maps §5.11–§5.22), the v2 spec §3/§7/§8,
> `docs/canon/part_06.md` §6.3, `docs/canon/part_07a.md` §7A.7, `src/master/part_07a.html`
> (§7A.6 E17 + §7A.7), `docs/canon/part_10.md` + `src/master/part_10.html` (the §10.1/§10.3
> budget + card lines), `docs/canon/appendix_character_map.md` ::05, `src/shell/index.html`.

---

## 0. What this package covers

The five decision families the migration tail left **owner-gated** (map §5.24 + §5.25), in
the recommended call order:

| Gate | Family | Where recorded | Urgency |
|---|---|---|---|
| G1 | the §7A.7 capability-checklist reconciliation (representation + CoT-tier + Anti-godmoding values) | map §5.14 P7A-4(b) + §5.24 | high — a live cross-layer value variance, reader-visible in three forms |
| G2 | the master-only enrichment families (P4-5 … P-C-4) | map §5.24 (the owner-gate class) | high — the last reader-visible knowledge living only in master |
| G3 | KI#77-e / R27 / ed-5 — the Part 10 budgets vs the Appendix D ::05 ranges | STATUS KI#77(e) + map §5.24 | high — the only OPEN KI in an affected family (blocks the Q8 switch criteria) |
| G4 | the two reader-path structural calls — LEARN-1 (the Part 0 entry) + REFERENCE-1 (the no-JS glossary navigability) | map §5.25 | high — the stage-4 findings; both change the ratified spec/corpus state |
| — | D-5 (the v2 canon-format: front-matter + E-declarations) + KI#79 (the drift-tool regex) | map §5.24 | **out of this package's scope** — D-5 is switch-time per its own record; KI#79 informational, deferred (§6 below) |

---

## 1. The shared decision rule (applies to G2, quoted per item)

Both directions of every enrichment disposition change reader-visible knowledge, which is why
these families are owner-gated rather than slice-executed. The per-item rule:

```
UNIQUE + USEFUL      → canonize (raise to canon; master stays the mirror)
DUPLICATES CANON     → align master down (compress / mirror the canon form)
PRESENTATION-ONLY    → keep as presentation (no new semantics either direction)
UNCLEAR              → do not touch; record UNKNOWN (unclear ≠ delete)
```

This is the Editorial Policy (DEC-15) applied at the value level: compress redundant
presentation, never unique capability; uncertain cases are classified UNCLEAR, never deleted
by assumption. The 5-point functional-load check gates every executed edit at its slice.

---

## 2. G1 — the §7A.7 capability-checklist reconciliation

**Question.** §7A.7 («Чеклист по типу модели») exists in three reader-visible forms with
drifting values. Which form is canonical, which values win, and who locks them?

**Evidence (verified at HEAD this iteration).**

*CoT level per model class — three encodings, plus the tier-definition owner §6.3:*

| Presentation | 12B–14B | 32B+ | API |
|---|---|---|---|
| canon §7A.7 (the `Возможность` table) | **✗** | **Tier 1** | **Tier 2–3** |
| master §7A.7 (the by-model-tier `<ul>`) | Tier 0–1 | Tier 1–2 | Tier 2–3 |
| E17 embed checklist (§7A.6, SHARED_REFERENCE per DEC-22) | 0–1 | 1–2 | 3 |
| §6.3 (the canonical Tier definitions — `part_06.md` L59–L79) | Tier 0 = «12B+, только Embodiment… baseline, не „модель не думает“»; line 59: «Tier 0–1 (базовый, все модели)» | Tier 1 = «32B, базовый уровень»; Tier 2 = «32B+, рекомендован» | Tier 3 = «только API» |

*Anti-godmoding lines per model class:*

| Presentation | 12B–14B | 32B+ | API |
|---|---|---|---|
| canon §7A.7 | 2 строки (запрет + позитив) | 2 строки | **1 строка** |
| master §7A.7 | 2 строки (негатив + позитив) | (not stated) | 1 строка |
| E17 embed checklist | 2 строки | 2 строки | **2 строки** |

*Representation form:* canon = a 3-column capability table; master = a by-model-tier `<ul>`
(content-equivalent except the CoT/AG drift above); E17 = the visual checklist (sanctioned
visual presentation, DEC-22 — but its capability cells are **not** gated by
`audit_sampling_parity.py`, which locks only the sampling-params tables).

**Options.**

- **A. Canon wins (representation + values).** §7A.7 canon stays the single owner; master
  re-renders the canon table (the `<ul>` becomes a presentation choice with identical values);
  E17's capability cells re-point to the canon values; a parity check locks the family
  (extending `audit_sampling_parity.py` or a §7A.7-specific gate — the DEC-22 precedent).
  Sub-decision A-vals: the canon CoT row itself must reconcile with §6.3 — either (A1) canon
  §7A.7's row is **aligned up to §6.3** (12B–14B = Tier 0; 32B+ = Tier 1–2; API = Tier 2–3 —
  effectively adopting the master's §6.3-consistent values as the canon values), or (A2) canon
  keeps **✗ / Tier 1 / Tier 2–3** and master + E17 align down (the «Tier 0–1» and «0–1/1–2/3»
  forms disappear). Note: A2's «✗» is the coarser encoding — §6.3 explicitly frames Tier 0 as
  «baseline, не „модель не думает“», so «✗» reads as a contradiction of §6.3's nuance; A1 is
  the internally-consistent reading.
- **B. Canonize the master's encoding.** The by-model-tier `<ul>` + its «Tier 0–1 / 1–2 /
  2–3» values become canon (they are the §6.3-aligned ones); E17 re-points. Consequence: canon
  §7A.7 loses the table form; the ✗ shorthand disappears; effectively A1 with a `<ul>` canon
  form.
- **C. Leave as is.** Three encodings persist; the drift stays reader-visible; no gate ever
  locks it. Consequence: the single-canonical-home invariant (fence #11) keeps a known
  live exception — worst fit with the v2 architecture and the canonical-audit record.

**Consequence (A/A1, the recommended path).** One semantic point of truth, machine-locked;
master's presentation may keep the `<ul>` **shape** only if the values match canon (else the
table mirror); E17 becomes the sanctioned SHARED_REFERENCE with the capability cells re-pointed
(the same re-point pattern DEC-22 executed for the sampling values). Edits: canon §7A.7 (1 row
value alignment to §6.3 under A1 — a disclosed content disposition with the 5-point check),
master §7A.7 (the mirror), E17 (2 checklist cells), + the parity-check extension. The
Anti-godmoding row: canon's 2/2/1 wins (the API = 1 строка nuance is canonical — §7A.1's
general template says 2 lines, §7A.7 adds the API exception); E17's API cell re-points 2 → 1.

**Recommendation.** **A with A1 values** — canon wins; the canon CoT row aligns to §6.3 (the
tier-definition owner); master mirrors; E17 re-points; a parity check locks §7A.7's capability
values (three cells: CoT row, Anti-godmoding row, and the XML-stability row already matches).

**Exact owner call.**
`G1: A1 — canon §7A.7 stays the owner; CoT row → (Tier 0 / Tier 1–2 / Tier 2–3) per §6.3; Anti-godmoding stays 2/2/1; master mirrors the table (or keeps the ul shape with identical values); E17 capability cells re-point (0–1→Tier 0, 1–2→Tier 1–2, 3→Tier 2–3; API AG 2→1); extend the parity gate to §7A.7.`

---

## 3. G2 — the master-only enrichment families (per-item dispositions)

**Question.** ~20 recorded master-only enrichments/variances (the map §5.24 owner-gate class)
carry reader-visible knowledge absent from canon (or in a divergent form). Per item: canonize,
align-down, keep-as-presentation, or leave UNKNOWN?

**Evidence.** The per-family observation records (maps §5.11–§5.22, verified at HEAD by the
canonical-audit stage iter 163 + spot-verified this iteration). The rule: §1 above.

**The per-item recommendations** (family → item → verdict → recommendation):

| Item | Master-only content (verified) | Verdict | Recommended disposition |
|---|---|---|---|
| P4-5(1) | the §4.8 `inf-pipeline` mnemonic «SPINE → Anchors: призрак→ТРИГГЕР / дефект→ЦЕНА» | UNIQUE | **canonize** — one compact annotation/row in §4.8 (a distinct anchor-anatomy mnemonic, not covered by the canon type table) |
| P4-5(2) | the §4.8 mapping table's 4th «Пример (Елена)» column | UNIQUE | **canonize** — per-element worked-example mapping (retrieval value; Elena = the canonical worked example) |
| P4-5(3) | the §4.4 nav callout «ПРАВИЛО: FLAW-linked Anchors → SPINE → Карта Anchors (ниже)» | PRESENTATION | keep — navigation wiring; no new semantics (an `[ref:]` fold is optional at the next touching slice) |
| P5-5(b) | the §5.1 stress-type suffixes «/ тревожный тип», «/ агрессивный тип» | UNIQUE | **canonize** — the stress-type classification is semantic content |
| P5-5(c) | the §5.2 A-row «дефект» vs canon «FLAW» | DUPLICATE (DEC-16) | **align master** to the canon RU form (language-policy compliance, not enrichment) |
| P5-5(e) | the §5.5 nav line «Интерактивный выбор типа… Enneagram Builder (выше)» | PRESENTATION | keep — widget navigation |
| P5-5(f) | the §5.5 OCEAN→SPINE table lowercase-start compressions | PRESENTATION | no-action (formatting churn; optional alignment at the next touching slice) |
| P6-4(a) | the §6.1 closing sentence «В этой части — от базового CoT до…» | PRESENTATION | keep — Part-close orientation framing |
| P6-4(c) | the §6.2::06 bullet wording «Связь с призраком (GHOST)» vs canon «призрак (GHOST) связь» | PRESENTATION | keep — no semantic delta (v7-era variance) |
| P7A-4(a) | the §7A.13 intro pointers («Токен-бюджет по блокам — … (выше). Полная карточка Елены… — в Part 10.») | UNIQUE (nav) | **canonize as `[ref:]` lines** — the fence-#11 canonical-link pattern |
| P7A-4(c) | «Recap-чек-лист» vs canon «Сводный чек-лист» | DUPLICATE (DEC-16) | **align master** — the RU label |
| P7A-4(d) | the §7A.5 «Пояснение секций» render variance (canon table vs master `<ul>`, content equivalent) | PRESENTATION | keep — G1's representation principle applies |
| P7B-4(a) | the §7B.2 intro («Алгоритм из 4 шагов… показан выше (VS-EMBED E18); разобранный пример на Елене — ниже.») | PRESENTATION | keep (or canonize the refs with P7A-4(a) if the owner prefers uniformity) |
| P7B-4(c) | the §7B.5 closing transition → Part 8 | PRESENTATION | keep — the canon README's «Переход» convention (1–2 per guide, master-side) |
| P8-4(a) | the four inter-section glide transitions (L335/L393/L426/L450, outside `<section>` wrappers, v9-era) | PRESENTATION (structural quirk) | **dispose REMOVED_WITH_REASON** at the next touching slice (the Part-2 §2.3 v7-transition precedent) — or relocate inside sections; outside-wrapper content violates the section model's letter |
| P8-4(b) | the stray/vacant `example-label illustration` chips (§8.5/§8.7/§8.13/§8.14) | PRESENTATION | **dispose** — formatting churn (F4-label placement quirk) |
| P8-4(c) | the §8.7 До/После table rendered as an inline paragraph | PRESENTATION | keep — content equivalent (a table restore is optional polish) |
| P8-4(d) | the EN-terminology «FLAW»/«GHOST» vs canon «дефект»/«призрак» (§8.5; the §8.9 gloss dropped) | DUPLICATE (DEC-16) | **align master** to the canon RU forms |
| P8-4(f) | the §8.16 h3 outside the antipattern-card wrapper + the label-less «Симптом» block | PRESENTATION (structural) | **fix** at the next touching slice — move the h3 inside the wrapper |
| P9-5(c) | the §9.11::06 EN blockquote («This is structural check…») vs the master RU em-paraphrase | SEMANTIC (DEC-16 catch-up) | **owner sub-call:** if the blockquote is executable prompt content → canon keeps EN **and** gains the adjacent RU explanation (the fence-#12 pattern; master already paraphrases); if prose → canon moves to RU. Recommended: executable-adjacent (keep EN + add RU) |
| P10-4(a) | the Omnis Embodiment 5th item — canon «Голос: синтезированный, металлический резонанс…» (L292) vs master «Звук: тихий гул электромоторов… (голос задаётся только в Examples — см. Voice Isolation rule §3.X)» (L408) | SEMANTIC (value) | **canon wins** — the DEC-21 physical/linguistic split makes the canon form legal (physical voice in Embodiment); the master form is the iter-75 KI#51 workaround + the R18 vague-ref «§3.X»; mirror master to canon and repair the ref in step |
| P10-4(b) | Elena's master-only card lines — «Tone Frame: Tone: grounded, understated…» + «OOC PROTECTION: …» (canon's Elena card carries neither; the E15 template shows the same blocks) | UNIQUE | **canonize** — the Elena card is the canonical worked example; its demonstrated blocks should live in canon (2 lines) |
| P10-4(c) | the master-only top-of-part «ПРАВИЛО: Правило голоса…» callout (the «никогда в Description» framing predates the §3.1 physical/linguistic split) | SEMANTIC (stale rule-strength) | **re-frame** to the §3.1 split at the next touching slice (or dispose — the §3.1 rule is the canonical owner) |
| P-app-4(f) | the §5.5 row «MBTI (Appendix A)» as text vs the linked form | PRESENTATION | **make it a link** — trivial navigation wiring at the next touching slice |
| P-B-4(d) | the master part_04 `model-note` span (canon carries the qualification inline) | PRESENTATION | keep — the P4-4 family's master-side render form |
| P-C-4(a) | the Appendix C master CoT entry's Tier-0 enrichment («CoT = дополнительный внутренний монолог сверх Embodiment, не замена ему» + the Embodiment-as-micro-CoT framing) | UNIQUE | **canonize** — one sentence into §6.3 (the tier-definition owner); it is exactly the Tier-0 nuance §6.3 already half-carries |

**Consequence.** The executed set (if called as recommended): ~10 small canon additions (each
a 1–3-line disclosed disposition with the 5-point check), ~5 master alignments (DEC-16/sync
mirror completions), ~3 disposals/repairs riding the next touching slices, 2 sub-calls kept
owner-level (P9-5(c), P10-4(c) semantics). Nothing is lost from the reader-visible surface;
the «secret knowledge only in master» class disappears.

**Recommendation.** Execute the table above as the per-item disposition plan (one bounded
slice per Part-family or a compact ed-batch, the owner picks the batching).

**Exact owner call.**
`G2: approve the per-item table as printed (or mark exceptions per item-id).`

---

## 4. G3 — KI#77-e / R27 / ed-5: the budget-range framing

**Question.** Part 10's annotated blueprints carry factual card totals that sit outside
Appendix D ::05's guidance ranges. Are the ::05 ranges normative (a second budget owner) or
illustrative (with §7A.12 remaining the only normative budget owner)?

**Evidence (verified at HEAD).**

| Card (Part 10) | Factual total in canon | Appendix D ::05 range for its class |
|---|---|---|
| Елена (§10.1, base) | **~540** (базовые блоки) / **~1000** (с SPINE и FLAW-якорями) | «Базовая карточка» (Елена, Уолтер) — **~440–890** |
| Уолтер (§10.2, base) | **~1100** | «Базовая карточка» — **~440–890** (outside) |
| Омнис-Зета (§10.3, full) | **~1800** (the intro line) / **~2150** (the «Бюджет токенов» line) | «Полная карточка со всеми инструментами» — **~1500–1800** (outside on the budget line; the intro sits at the top edge) |
| Выщербленный (§10.4, expert) | **~1500+** | ~1500–1800 (borderline in-range) |

Plus the framing split: §7A.12 is the ratified single canonical budget owner (mig-4 — the
per-block SP/Description/Examples/Greeting/Anchors limits; E01/E15 = SHARED_REFERENCE); every
budget mention elsewhere must derive or defer, not re-own.

**Options.**

- **A. The ::05 ranges are normative.** Part 10 must conform (the cards re-balanced) or every
  exception must be explained in place. Consequence: the most expensive reading — it makes
  Appendix D a second normative budget owner, contradicting the mig-4 single-owner
  architecture, and it forces content edits inside the canonical worked examples (the
  EXAMPLE-139 family the guide explicitly preserves).
- **B. The ::05 ranges are illustrative selection guidance; §7A.12 stays the normative owner.**
  Part 10 remains a set of real examples (their totals are facts about the examples, not
  limits); Appendix D keeps its actual function — choosing which character complexity to
  attempt — with its ranges framed as orientation, derived from the real cards rather than
  governing them. Consequence: one-line framing re-labels in ::05 («ориентировочно» /
  НАБЛЮДЕНИЕ-class strength per DEC-20), KI#77-e closes; no Part 10 content edits; the Omnis
  intro-vs-budget-line spread (~1800 vs ~2150) optionally aligns to ~2150 as a disclosed
  one-line disposition.

**Recommendation.** **B** — it preserves the ratified single-owner architecture (§7A.12 owns
values; everyone else derives/defers), keeps the worked examples factual, and closes the only
OPEN KI that blocks the Q8 switch criteria. (This matches the standing note in the KI#77 row:
the repo deliberately did not force-reconcile this during the slices.)

**Exact owner call.**
`G3: B — Appendix D ::05 ranges become illustrative (НАБЛЮДЕНИЕ framing, §7A.12 the sole normative budget owner); KI#77-e closes; the Omnis intro line optionally aligns to ~2150.`

---

## 5. G4 — the two reader-path structural calls (map §5.25)

### 5.1 LEARN-1 — the spec §3 Learn entry (Part 0) is canon-only

**Question.** The ratified reader-mode spec names Part 0 («Как читать этот гайд» + TL;DR) as
the Learn entry; Part 0 has been canon-only since iter 38 (no master file, no manifest entry,
never rendered — the content_map convention; 96 rendering + Part 0 ×2 + Appendix D ×1 = 99
declared IDs). Wire it, or re-spec the entry?

**Evidence.** `docs/canon/part_00.md` carries §0.1 (how to read: the modular map, reading
order) + §0.2 (TL;DR / quick start) — both unique Learn-mode content (nothing equivalent
renders at runtime; the shell is a bare TOC + auto-load). The runtime Learn entry today = the
TOC panel + the Part 1 auto-load (verified green, map §5.25 RP-2).

**Options.**

- **(a) Wire Part 0 into the runtime corpus.** A bounded build slice: `src/master/part_00.html`
  (2 sections), the manifest entry, the TOC placement; the corpus snapshot 96 → 98 (+ the
  content_map/PA-4 conventions updated in step). Consequence: the spec is honored as
  ratified; the Learn reader gains the how-to-read + TL;DR entry; the corpus-snapshot change
  is disclosed at the switch (the Q8 re-run counts the new sections).
- **(b) Re-spec the §3 entry.** A doc-only edit to the ratified spec (Learn entry = «the TOC +
  Part 1»). Consequence: cheapest; the spec's intent (an orientation entry) is surrendered;
  Part 0 stays a docs-only artifact.

**Recommendation.** **(a)** — the content is unique Learn-mode value and the spec is the
ratified law; the slice is small and the corpus change is disclosed. (b) remains the
budget-minimal alternative if the owner prefers the frozen corpus snapshot.

**Exact owner call.**
`G4-LEARN: (a) wire Part 0 (2 sections, corpus 96→98, disclosed at the switch) / (b) re-spec the §3 entry to TOC+Part 1.`

### 5.2 REFERENCE-1 — the no-JS glossary entry is not navigable

**Question.** `parts/glossary.html` (the generated no-JS Reference page, DEC-17/18; required
by the artifact contract — `validate-artifact.mjs` special files) is linked from nowhere: the
shell `<noscript>` block carries an enable-JS notice with no link; no built page links it;
reachable only by direct URL. Wire the entry, or leave it URL-only?

**Evidence.** Grep-verified this iteration: zero inbound links repo-wide; the JS-on Reference
entry (the runtime panel) is fully wired and green (map §5.25 RP-4).

**Options.**

- **(a) Add the no-JS link.** One `<a href="parts/glossary.html">` line in the shell's
  `<noscript>` block (`src/shell/index.html`). Consequence: a shell-infrastructure change —
  the class spec §7 explicitly excludes from build scope without an owner call; `build.hash`
  **changes** (the shell file is the hash source — first hash change since iter 158); CSP
  unaffected (a plain link, no script/style).
- **(b) Leave as is.** The no-JS page remains an artifact-contract file reachable by URL only.
  Consequence: the DEC-17/18 chain's no-JS leg stays formally unreachable; no reader-visible
  change; no owner action needed.

**Recommendation.** **(a)** — one line, a real accessibility gain for the no-JS reader, and
it completes the Reference entry the spec §3 names. The hash change is a disclosed, expected
consequence (the hash is a cache-busting value, not a content digest — NAV §2).

**Exact owner call.**
`G4-REF: (a) add the noscript glossary link (hash change disclosed) / (b) leave URL-only.`

---

## 6. Out of this package's scope (recorded, not re-opened)

- **D-5 — the v2 canon-format decision** (the front-matter staleness family, 9 packages' items
  + the E-declaration gaps E09/E11/E02/E16/E18): stays switch-time per its own record (map
  §5.24). The recommended shape when its time comes: ratify the v2 canon-format → one bounded
  front-matter pass → the E-declarations closed in the same pass. **Not now** — folding it
  into the G2 batch would turn a value reconciliation into a format refactor.
- **KI#79** — the drift-tool `P_TAG_RE` regex family: informational, exit 0, no reader impact;
  deferred unless a migration slice requires it (PLAN row ki-79). No action recommended.
- **The P6-4(b) difficulty-comment divergence, the manifest alphabetical order
  (P-app-4(d)), the heading-mismatch family, the drift-tool boundary items** — already
  classified no-action at the canonical-audit stage (map §5.24); not re-opened here.

---

## 7. Call order + the reply format

Recommended order (each called item executes as its own bounded slice; the switch rides last):

```
G1 (§7A.7 values + gate)  →  G2 (the enrichment batch)  →  G3 (KI#77-e framing, closes the KI)
→  G4-LEARN (Part 0 wiring, if (a))  →  G4-REF (the noscript link, if (a))
→  the switch (Q8: the one-pass full-battery re-run — stages 2–4 gates in a single run,
   incl. both reader-path tools; Q9: v1 freeze/archive)
```

The owner replies per gate (chat, the DEC-21/22/24 reply precedent), e.g.:

```
G1: A1
G2: approve (exceptions: P9-5(c) = executable-adjacent, P10-4(c) = re-frame)
G3: B (+ align the Omnis intro line)
G4-LEARN: a
G4-REF: a
→ switch
```

---

## 8. Verification record (executed this iteration — doc-only)

- Preflight: `BASE_COMMIT = 5a30f610` (iter 163) + the iter-164 stage on top; worktree = the
  iter-164 delta only (6 state docs + the stage tool); the iter-164 battery green (map §5.25
  RP-6) — this package adds a research doc, no production file touched (the iter-131/137/143/144
  doc-only precedent).
- Doc-only battery: the 7 cluster parity gates ×7 PASS · sync 97/97 · drift 140 (informational)
  · `git diff --check` clean · `pnpm build`/`test` not re-run for this doc (nothing in `src/`,
  `data/`, or root fallbacks changed beyond the iter-164 stage's already-verified state; the
  owner commit may use `SKIP_ARTIFACT_BUILD=1` per AGENTS.md).
- Evidence fact-checks this iteration: the §7A.7 three-form table + the §6.3 tier rows
  (canon/master direct read); the Anti-godmoding cells (E17 `checklist-row` block, master
  L604–611); the Part 10 budget lines (canon L21/L105/L218/L229/L380/L391/L538, section-localized);
  the Appendix D ::05 ranges (canon L37–38); the Omnis/Elena card lines (canon L292 vs master
  L408; master L147/L149, zero canon matches); the no-JS link absence (grep-verified);
  Part 0 canon-only state (content_map L24/L215, no master file, no manifest entry).
