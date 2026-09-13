# Backlog Audit — Live Character Guide (post-iter-118 research session)

> **Provenance:** research session (bootstrap research-mode, no iteration number assigned, agent
> does not commit/push). BASE: `bd06f8a1` (iter 118), worktree clean at session start.
> **Question:** are the 16 open `PLAN.md` entries (2 owner-gated + 12 backlog + 2 observations)
> accurate, current, and worth doing? Secondary: verify the claims of the external backlog
> review delivered in owner chat (not intaken as a repo document).
> **Method:** targeted inspection per the reading gradient (no wholesale reads of huge files),
> one runtime gate execution, git-history checks. Nothing was edited in `src/`, `data/`, `scripts/`.

---

## 1. Overall verdict

**PARTIALLY CONFIRMED (backlog as a whole).** Of 16 entries: 4 are confirmed defects/audits
ready to execute (`ki-67`, `ed-6`, `ed-5` audit, `ed-matrix`); 1 (`dupes-1`) is real but
**half-stale** and needs re-scoping; 6 are sound-but-premature editorial tasks correctly gated
behind `ed-matrix` + `ed-policy`; 2 require owner decisions by design; 2 are minor observations
verified accurate. No entry is fabricated, but one entry's scope describes content that no
longer exists (see §3).

**Repository state consistency: CONFIRMED.** `STATUS.md` (iter 118, KI#67 OPEN, KI#68 CLOSED
iter-118), `PLAN.md` (16 rows), `worklog.md`, `CHANGELOG.md`, `AGENT_NAVIGATION.md` all describe
the same iter-118 state. Git history shows no commit where STATUS said "iter 116" while PLAN
carried the 14-row backlog: at iter-116 (`01a4f9d1`) PLAN had 5 rows; the 14-row backlog and the
iter-118 STATUS appeared together in `bd06f8a1`.

---

## 2. Per-entry verdicts (evidence-based)

| ID | Verdict | Key evidence (this session) | Recommendation |
|----|---------|------------------------------|----------------|
| ki-67 | **CONFIRMED** | Runtime run of `scripts/check-doc-versions.mjs`: 6 of 8 `docs/*.md` skipped (`components.md`, `terminology_dictionary.md`, `character_bible.md`, `elena_character_bible.md`, `vyshcherblenny_character_bible.md`, `CONTENT_RESTRUCTURE_PLAN.md`) — all use `**Last Updated:**` / `**Дата:**` / `**Date:**` bold format; regex `(?:Last Updated\|Date):\s*YYYY-MM-DD` cannot match `:` followed by `**`. Gate prints "All doc dates are current" — false PASS. | **DO.** Non-gated, one-file script fix (accept optional `**` and the `**Дата:**` Russian header). Top priority. |
| dupes-1 | **PARTIALLY CONFIRMED — needs re-scope** | §9.11 half is REAL: master `part_09.html:516–534` carries a `<details>` table self-labeled "дубликат §9.3 в формате «ожидаемый результат»" (canon `part_09.md` same). §7A.12 half is **STALE**: the `<pre class="plain-copy">` example block documented in the iter-10 canon block-inventory no longer exists in master (`p7a_token_budget` section, lines 880–971, contains tables + `token-calc` + a noscript that now says only "включите JavaScript"); 0 grep hits for "пример расчёта" in `src/master/part_07a.html` and `parts/part_07a.html`. The canon §7A.12 migration note still describes the removed block AND a noscript example that no longer exists. | **DO, re-scoped:** (a) remove/point-away the §9.11 details-table dupe (must re-point "Пункты 1–5: см. Быструю проверку выше" in the 14-item list, else a dangling ref); (b) fix the stale §7A.12 canon note (also repo-meta — overlaps ed-6). Content change, canon-first. |
| ed-6 | **CONFIRMED** | Verified in master: `part_07a.html:30` "известный drift (KI#58)", `:171` "(D4, iter 93)", `part_08.html:220` "убрана в iter 55 … (KI#38 ✅ CLOSED)" + canon mirrors. Scope check: no `KI#`/`iter NN` strings in master part_01/03/04/10 — contamination is limited to Part 7A + Part 8, exactly as the PLAN row scopes. | **DO.** Small, well-bounded, 2 parts. Keep the reader-useful format/convention substance, strip repo history. |
| ed-matrix | **CONFIRMED as correct prerequisite** | Research §32 (matrix spec) and §33 (final recommendation) are internally sound; PLAN row well-formed (read-only, non-gated). Open design issue: "machine-checkable one row per block, stable IDs" — block-level stable IDs do not exist yet (sections have IDs; blocks don't), so the matrix iteration must define a block-addressing scheme (e.g. `section-ID + ordinal`). Full Parts 1–10 + appendices in one pass is heavy vs the 3–5-file soft limit (output doc would be very large). | **DO, consider phasing:** Phase A = Parts 1 / 3 / 7A / 9 (the four highest-conflict zones per research §26); Phase B = remainder. Phasing requires a PLAN scope note (owner-visible), not silent narrowing. |
| ed-1 | PARTIALLY CONFIRMED | Phenomenon real: Part 1 canon carries 12+ responsibilities (§1.2 blocks table, §1.4 three principles, §1.7 top-3 errors, §1.8 pre-build checklist); but §1.2's Token-Budget/pipeline subsections are already 1-sentence refs to §7A.12/§7A.13 (verified). Orientation vs re-teach per block is exactly what the matrix must decide. | DO after `ed-matrix`, as scoped (matrix-flagged blocks only, functional-load test). |
| ed-2 | **CONFIRMED as small audit (not a content bug)** | Full 7-directive lists found in exactly two places: canon §7A.2 (canonical) and `appendix_glossary.md` "C — CORE DIRECTIVES" (reference layer, full annotated list, ends with vague `→ [ref: part_07a.md §7A.X]`). Everywhere else verified as DEC-08 shorthand: SP template (`part_07a.html:35` `{{CORE_DIRECTIVES 1-7 — …}}`), master prose `:171`, Part 10 (0 hits for "Show Never Tell"). | Audit only: classify the glossary list (functional reference vs competing copy — an ed-policy Rule 2/6 question) and fix the vague `§7A.X` ref → `§7A.2`. Likely near-no-op beyond the ref fix. |
| ed-3 | PARTIALLY CONFIRMED | Part 9 structure is genuinely diagnostic (§9.1 scale, §9.3 checklist, §9.5 symptoms, §9.6 decision tree, §9.7 scenarios, §9.9 metrics, §9.11 pre-deploy). Which items re-teach instead of validate is a per-block question (matrix). | DO after `ed-matrix`, targeted. |
| ed-4 | PARTIALLY CONFIRMED | Fragmentation observable in canon Part 3 section list: 3.1 Isolation / 3.2 Hierarchy / 3.6 Voice Leak / 3.7 "крайний случай" / 3.8 multi-character (Voice Bleed) + Narrator Bleed also in Part 3. PLAN row already scopes it as hierarchy-framing with terminology preserved — the correct treatment (not a merge). | DO as hierarchy pass (after or together with matrix Phase A on Part 3). |
| ed-5 | **CONFIRMED as audit need** | Part 1 §1.2 ref to §7A.12 verified in place (1-sentence, no table). Found one numeric tension for the audit to resolve: Part 1 §1.8 pre-build checklist gives "4K — Description ≤200 … 8K — ≤400" vs §7A.12 table "Description 150/300/700 (min/std/max)" — different framings of the same budget (guideline vs table), needs an explicit consistency check. | DO as grep-audit early (LOW risk, non-gated). Likely minimal edits. |
| ed-6 (see above) | CONFIRMED | — | DO (P0). |
| ed-7 | PARTIALLY CONFIRMED | Rule-strength classes genuinely useful for numeric claims ("минимум 6 сценариев", "~40%"); Part 1 §1.1 already carries a methodology disclaimer ("эмпирические ориентиры… не как точные измерения") — a good existing pattern to extend. | DO after `ed-matrix`. |
| ed-8 | PARTIALLY CONFIRMED | P2 bundle, includes research §18 Master Checklist idea. Audit-first framing is correct. | DEFER until P0/P1 editorial work lands. |
| fork-d-2 | **UNRESOLVED** | §7A.6 already answers "what params for my model": E17 3-tier comparative VS-EMBED + key-notes list + PP rules + a `<details>` model-specific table (master `part_07a.html:620–663`). Interactive-widget precedent exists (`token-calc`), but DEC-03 (`viz > dry text`: visualization = replacement) means a configurator must REPLACE E17 or prove a new user job — neither shown. STATUS Next step puts this row in the owner's-choice list. | NOT NOW. Owner decision + UX evidence required. |
| fork-d-3-intent | DEFERRED (by design) | Row is literally "owner defines intent"; scope TBD. | NOT NOW. Owner must define the user job-to-be-done first. |
| ed-policy | **CONFIRMED as sound, owner-gated** | §27 rule set verified: 10 rules, consistent with existing law (Rule 1/8 ≈ IMP-48; Rule 2 ≈ DEC-03 changed-function; Rule 8 ≈ DEC-08 shorthand). PLAN row already specifies the useful-repetition whitelist (Price / SPINE causality / Show Never Tell / Embodiment) and conflict resolution by owner. | Owner decision. Recommend ADOPT — cheap, doc-only, gates all editorial edits. |
| obs-3 | CONFIRMED (minor) | `CONTENT_RESTRUCTURE_PLAN.md` header verified: "Status: ANALYTICAL" while its migration is COMPLETE (iter 7–18). | Owner decision, trivial; fold into any doc iteration. |
| obs-4 | CONFIRMED (minor) | Headers verified: `components.md` 9.2.0/2026-07-25, `terminology_dictionary.md` 9.2.0/2026-07-25, both in gate-invisible bold format. | Do after ki-67 fix (gate becomes sighted); each file needs its own content pass — not a header-only bump. |

---

## 3. Corrections to the external backlog review (chat-delivered)

The review's per-task verdicts largely match the evidence (ki-67 CONFIRMED, ed-6 CONFIRMED,
ed-2 mostly-stale, ed-4 hierarchy-not-merge, fork gating). Three material corrections:

1. **"STATUS/PLAN рассинхрон (STATUS says iter 116, no open KIs)" — REJECTED.** The claimed
   state never existed in git (see §1). The review apparently mixed a stale `STATUS.md` blob
   (iter-116 state) with the current `PLAN.md` (iter-118 state) — a raw-file caching artifact,
   the same failure class as pitfall #27 (display artifacts vs file content). Consequence: its
   recommendation "first normalize the repo state" is unnecessary; the actual current blocker
   is only the owner decisions.
2. **"Active KIs: none" — WRONG for the current state.** KI#67 is OPEN in `STATUS.md` (iter 117).
   The review's own ki-67 analysis is correct, but its KI-state report was stale.
3. **dupes-1 "особенно хорошо доказана" for Token Budget — OVERSTATED.** The canon note does say
   the plain-copy block is a compression candidate, but the block was already removed from
   master (this audit verified master + root fallback). The remaining §7A.12 work is fixing the
   stale canon note, not removing a dupe. The review could not see this without a clone.

GitHub Issues state: **UNVERIFIED** (API rate-limited from this sandbox; not material — `PLAN.md`
is the authoritative backlog per NAV §10).

---

## 4. Recommended execution plan (logical order)

Track A — non-gated, confirmed, ready now (no owner input needed):

1. **ki-67** — fix the gate regex (accept optional `**`, accept `**Дата:**`); verify the gate
   output lists all 8 docs parsed. One file. Functional change → also breaks any doc-only streak.
2. **ed-6** — strip repo history from Part 7A/Part 8 reader prose (canon-first, then master);
   fold in the stale §7A.12 calculator-note fix (dupes-1's second half) since it is the same
   class of defect in the same Part.
3. **ed-matrix Phase A** — Parts 1/3/7A/9, read-only, define the block-ID scheme; record the
   phasing decision in PLAN (visible re-scope, not silent narrowing).
4. **ed-5 audit** — grep-audit budget numbers; resolve the Part 1 §1.8 vs §7A.12 framing tension.

Track B — owner decisions (cheap, unlock the rest):

5. **ed-policy** — adopt §27 + whitelist (strongly recommended).
6. **dupes-1 (re-scoped)** — first policy application: §9.11 dupe removal + dangling-ref repair.
7. **fork-d-2 / fork-d-3-intent** — owner defines intent/user-job; not agent work yet.

Track C — after matrix + policy, in matrix-priority order: ed-1 → ed-3 → ed-4 → ed-7 →
ed-2 (audit + ref fix) → ed-8 (last, P2 bundle).

Pairing note (anti-loop law): an ed-matrix-only iteration is doc-only; pair it with ki-67
(scripts/, functional) or run it right after a content iteration to avoid two consecutive
doc-only iterations (AGENTS.md documentation-loop alarm).

---

## 5. Remaining uncertainty

- Whether Part 1's non-ref blocks (§1.4, §1.7, §1.8) actually compete with canonical Parts —
  decidable only by the matrix (UNKNOWN until then).
- Whether the glossary CORE DIRECTIVES list is functional reference or competing copy — an
  ed-policy classification question (UNCLEAR by design until policy exists).
- GitHub Issues state (UNVERIFIED — rate-limited; PLAN.md remains the authority).
- Block-level ID scheme for the machine-checkable matrix — design decision, not yet made.

---

## 6. Session delta

- NEW: this document (`docs/research/backlog_audit_iter118.md`).
- EDIT: `AGENT_NAVIGATION.md` §7 — one row for this document.
- No `src/`, `data/`, `scripts/`, `tests/`, workflows, or root fallbacks touched. No build run
  (docs are not in the build input). Commit for the owner: doc-only → `SKIP_ARTIFACT_BUILD=1`.
