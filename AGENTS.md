# AGENTS.md — Live Character Guide

> **Read this first.** Operating law for any LLM agent working in this repo.
> Full system map: [`AGENT_NAVIGATION.md`](./AGENT_NAVIGATION.md). Current state: [`STATUS.md`](./STATUS.md).
> Repo language: English for docs/code/commits. Chat with the owner: Russian.

## What this project is

**Live Character Guide** is an engineering pipeline for building RP character cards
for LLMs (12B–32B+). Single linear guide: Part 0 → Part 10 + 4 appendices.
Stack: static HTML + CSS + vanilla JS ES modules. **No build framework, no TypeScript,
no React/Vue/Svelte.**

- **Live site:** https://vudirvp-sketch.github.io/live-char-guide/
- **Canonical version:** `9.2.6` (see `package.json` / `src/VERSION` / `data/character_schema.json`)
- **Current iteration / task / next step:** [`STATUS.md`](./STATUS.md) — the only state owner

---

## Authority order (how conflicts resolve)

When two instructions disagree, the higher one wins:

```
repository files (this contract)
  > current repository state (STATUS.md, git, worktree)
  > current task / plan (STATUS.md Next step, PLAN.md)
  > navigation (AGENT_NAVIGATION.md)
  > bootstrap prompt
  > agent inference
```

- If the bootstrap prompt and the repository disagree, **the repository wins**.
- Never change the repository just to eliminate a prompt/repo divergence.
- Ask the owner **only** when the repository itself is underspecified — not because
  two external instructions differ slightly.

---

## Preflight (before any non-trivial work)

1. Read `STATUS.md` (current iteration, KIs, **Next step** — the authoritative task).
2. Read the minimum required context for your task type (see Reading gradient below).
3. State the exact task and its acceptance criteria before editing.
4. Record `BASE_COMMIT = git rev-parse HEAD`.
5. Run `git status --short`. **Never assume a clean worktree.**
6. Pre-existing uncommitted changes: preserve them, report them, never overwrite or
   discard them. If they collide with your task — stop and ask the owner.
7. Define the allowed scope (files you may touch). Everything else is out of scope.

---

## Iteration protocol

- **Plan first, then code.** Better to underdeliver than to break things — remainder goes into the next iteration.
- **Task ID format:** `iter-<N>-<short-desc>`.
- **Soft limit:** 3–5 files per iteration. If more are objectively needed, continue and note the scope in `worklog.md`.
- **Stop** when scope creep is detected — remainder → next iteration / `PLAN.md` backlog.

### Anti-loop rules

- Same failed approach attempted **twice** → stop, record a `KI#<N>` in `STATUS.md`, diagnose; ask the owner if the cause is unclear.
- A **third blind retry is forbidden.**
- Patch files in place (targeted edit); never regenerate a whole file to fix a small bug.
- Two consecutive iterations producing **only documentation edits** with no functional progress → stop and ask the owner (documentation-loop alarm).
- A discovered unrelated issue → record (`KI#` / `PLAN.md`), defer, continue the current task. Never silently absorb it.

---

## Scope discipline

Every iteration carries: **Task · Scope · Acceptance criteria · Required verification**.

> Discovering a problem does not grant permission to fix it.

For an issue outside scope:

```
observe → record (KI# or PLAN.md backlog) → defer → continue current task
```

No opportunistic cleanup, mass renames, reformatting, or drive-by refactors unless
the current task requires them.

---

## Reading gradient (by task type — minimum required reading)

| Task type | Read before starting |
|-----------|----------------------|
| Trivial (typo, single value) | `STATUS.md` |
| Content / canon change | `STATUS.md` → Editorial Policy (this file, below the hard fences) → `docs/canon/part_NN.md` (source of truth) → open `src/master/part_NN.html` only to edit |
| Widget / component | `STATUS.md` → `AGENT_NAVIGATION.md` §4 (widget architecture) → `docs/components.md` → the target widget's JS |
| CSS / visual system | `STATUS.md` → `AGENT_NAVIGATION.md` §5–§6 → `docs/components.md` |
| Build / deploy / CI | `STATUS.md` → `AGENT_NAVIGATION.md` §2 (pipeline) → relevant `scripts/` + `.github/workflows/` |
| Data / schema | `STATUS.md` → `AGENT_NAVIGATION.md` §1 (`data/` rows) → the schema file → version-sync rule (fence #9) |
| Refactor / architecture | `STATUS.md` → `AGENT_NAVIGATION.md` (full) → `docs/architecture.md` → relevant tests |
| Agent docs / meta | `STATUS.md` → `AGENTS.md` (this file) → `AGENT_NAVIGATION.md` §7 + §10 |

**Huge files — grep first, do NOT open entirely:** `src/master/part_07a.html`, `part_10.html`, `part_04.html`, `src/shell/lazy-loader.js`, `src/assets/vs-styles.css`, `src/shell/styles.css`.

For content edits: open `docs/canon/part_NN.md` **FIRST** (source of truth), then `src/master/part_NN.html`.

---

## Where things live (condensed — full map in AGENT_NAVIGATION.md §1)

| Path | Role |
|------|------|
| `docs/canon/part_NN.md` | **Source of truth for content** |
| `src/master/*.html` | Author content, derived from canon |
| `src/shell/`, `src/assets/`, `data/*.json` | Infrastructure / assets / widget data (ownership rules: NAV §1) |
| `parts/`, `widgets/`, `assets/`, `event-bus.js`, `index.html`, `build.hash` (root) | **Root fallbacks — regenerated, NEVER hand-edit** |
| `scripts/`, `tests/` | Build + validation (infrastructure only) |

---

## Common commands

```bash
pnpm install                              # only if package.json or pnpm-lock.yaml changed
pnpm run build                            # full build (unified + shell + root fallbacks)
pnpm run validate                         # validate build artifact
pnpm run validate:master                  # validate master HTML invariants
pnpm run version:check                    # 4-place version sync (MUST pass)
pnpm test                                 # all tests — run AFTER pnpm run build (tests read dist/)
pnpm run qa:csp | qa:bundle | qa:contrast | qa:doc-versions   # PASS/FAIL gates
pnpm run qa:english                       # exit 1 expected: 18 leaks by design — count must not increase
pnpm run qa:syntax                        # exit 1 expected: 247 baseline findings — count must not increase
pnpm run dev                              # build + serve on http://localhost:3000

# Canon audits (run after touching src/master/ or docs/canon/):
python3 scripts/audit_canon_master_sync.py    # MUST PASS (97/97 or current count)
python3 scripts/audit_canon_master_drift.py   # informational, exit 0
python3 scripts/audit_glossary_parity.py      # MUST PASS (glossary registry ↔ migration map ↔ generated JSON — DEC-17/18)
python3 scripts/audit_core_directives_parity.py  # MUST PASS (CORE DIRECTIVES single-canonical-presentation parity — DEC-08/mig-2)
python3 scripts/audit_token_budget_parity.py  # MUST PASS (Token budget §7A.12 canonical ↔ E01/E15 SHARED_REFERENCE parity — mig-4)
python3 scripts/audit_enneagram_parity.py     # MUST PASS (Enneagram §5.4 canonical ↔ generated data layer ↔ E10 SHARED_REFERENCE parity — mig-5)
python3 scripts/audit_diagnostics_parity.py   # MUST PASS (Diagnostics §9.6 canonical ↔ E13 visual presentation parity — DEC-20/mig-3)
python3 scripts/audit_voice_parity.py        # MUST PASS (Voice §3.2 canonical ↔ E07 ↔ widget constants parity — DEC-21/voice-cluster)
python3 scripts/audit_sampling_parity.py     # MUST PASS (Sampling §7A.6 canonical ↔ E17 ↔ E12/§9.x hints parity — DEC-22/sampling-cluster)
```

> The aggregate `pnpm run qa` exits 1 by design (english/syntax baselines). Judge gates
> individually: PASS/FAIL for csp/bundle/contrast/doc-versions; **baseline counts must not
> increase** for english (18) and syntax (247).

---

## Hard fences (do not break)

1. **Master HTML is restricted.** Content MUST live inside `<section data-section="p{N}_{topic}" id="p{N}_{topic}">`. FORBIDDEN inside master HTML: `<style>`, `<script>`, `<link>`, `<meta>`, inline `style="..."`, inline `on*=` handlers (CSP compliance is enforced).
2. **FORBIDDEN attributes:** `data-layer`, `data-layer-switch`, `class="layer-remark"` (removed in v8, validator rejects).
3. **FORBIDDEN:** Markdown patterns inside HTML (use real tags).
4. **Section IDs:** pattern `p{N}_{topic}` (e.g. `p4_spine_overview`, `p7a_core_directives`, `p8_ap15_ocean_overload`). MUST be unique across the entire guide.
5. **When adding a new section:** ALWAYS add both `data-section` AND `id` attributes (browsers need `id` for `#anchor` navigation).
6. **Heading hierarchy:** one `<h1>` per page (auto-injected by shell), `<h2>` for sections, `<h3>` for subsections. Do not skip levels.
7. **CSS classes:** use ONLY components from [`docs/components.md`](./docs/components.md). NEVER invent new classes without infrastructure approval.
8. **Widget architecture:** Markup → `src/master/*.html` via `<div data-widget="...">`. Data → `data/*.json` (NEVER hardcode widget data in JS). Behavior → `src/shell/widgets/*.js`.
9. **Version sync (4 places, ALL must match):** `package.json` · `src/VERSION` · `data/character_schema.json` · build manifest. Verify with `pnpm run version:check`. When bumping: update `src/VERSION` + `package.json` + `data/character_schema.json` MANUALLY in the same commit; `parts/manifest.json` regenerates on build.
10. **Canon sync:** `docs/canon/part_NN.md` = single source of truth. `src/master/part_NN.html` = production HTML derived from canon. Audit: `python3 scripts/audit_canon_master_sync.py` (MUST PASS). Drift detector: `python3 scripts/audit_canon_master_drift.py` (informational).
11. **Cross-references (IMP-48):** when section A references section B, B MUST back-link to A. One canonical definition per concept; everywhere else = 1-sentence link.
12. **Language convention (two-layer, DEC-16):** Russian is the default language of the guide — all explanatory, normative, instructional, and descriptive prose (including callout labels `ПРАВИЛО`, `РЕКОМЕНДАЦИЯ`, `ПРИМЕР`, `ИЛЛЮСТРАЦИЯ`, `ШАБЛОН`, `Переход`, `Синтез`, `Ссылка`, `Демонстрирует`) is Russian; ordinary English terminology is translated whenever a natural Russian equivalent exists (`token → токен`, `lie → ложь`, `rule → правило`). English is preserved only where its exact form is technically significant: (a) executable/recommended prompt content the guide prescribes writing in English (SP blocks, `<CORE_DIRECTIVES>` wording, Tone Frame strings, card examples, copy-paste templates) — every such English block MUST carry a Russian explanation/translation next to it; (b) technical identifiers (section IDs, XML tags, `{{placeholders}}`, class names, filenames, machine-readable values, API/parameter names, card field names); (c) proper names. `CORE DIRECTIVES` English wording is canonical inside the executable SP form; in prose use «основные директивы» / «директива» — each directive keeps a Russian explanation (§7A.2). Local clarifications: `**Примечание:**`. Baseline `qa:english` leaks (18, DEC-16 — was 19 before iter-123 russification) are executable-content leaks by design.
13. **Editorial Policy (content-editing law, DEC-15):** gates every content edit in `docs/canon/` + `src/master/` (extends fence #11's one-canonical-definition rule). Core principle: **compress redundant presentation, never unique capability** — no editorial change may reduce semantic or functional load. Every deletion/merge/move/cross-ref replacement passes the 5-point functional-load check (capability · coverage · retrieval · context · dependency — full text: [Editorial Policy](#editorial-policy-content-editing-law) below). Uncertain cases are classified **UNCLEAR**, never deleted by assumption. Success metric: reduced redundant semantic load + improved navigability — never word count.

---

## Editorial Policy (content-editing law)

> Adopted iter 122 (`ed-policy`, owner decision — [`DECISIONS.md`](./DECISIONS.md) DEC-15). Gates **all** content edits in
> `docs/canon/` + `src/master/` (hard fence #13); content iterations (`ed-1`…`ed-8`, `dupes-1`) execute under it.
> Source: owner-amended editorial rule set — research intake
> [`docs/research/editorial_research_en.md`](./docs/research/editorial_research_en.md) §27 + §20/§22/§24/§32
> (classification vocabulary: duplicate / reinforcement / special case / related / contradictory / unclear —
> research §24, in use in [`docs/research/editorial_matrix.md`](./docs/research/editorial_matrix.md)).
> Canon-side application notes: [`docs/canon/_README.md`](./docs/canon/_README.md) §4.4.
> The text below is the owner's verbatim wording — amend only by owner decision.

**Core principle: compress redundant presentation, never unique capability.**

The guide may be made shorter, clearer, and easier to navigate, but no editorial change may reduce its semantic or functional load.

Maintain **one canonical teaching explanation per major concept**. Other appearances are not duplicates merely because they cover similar content. Preserve them when they serve a distinct function, including application, decision-making, exception handling, demonstration, diagnostics, navigation, or memory reinforcement.

Before deleting, merging, moving, or replacing content with a cross-reference, verify:

1. **Capability preservation** — what semantic or functional capability would disappear from this location?
2. **Coverage preservation** — where does every required rule, nuance, exception, boundary condition, example, or diagnostic signal remain?
3. **Retrieval** — can the reader find and use that information at the moment it is needed?
4. **Context** — would removing the local wording make the surrounding rule harder to understand or apply correctly?
5. **Dependency** — does another section, table, example, checklist, or diagnostic procedure rely on this specific presentation?

A cross-reference may replace repeated explanation only when it leads directly to the canonical material and preserves correct use. Keep a local reminder when the reader needs it to make the current decision, apply the rule, recognize an exception, or perform a check.

Use **progressive disclosure** to control cognitive load, but do not defer information whose absence could cause an incorrect implementation, invalid inference, unsafe assumption, or loss of an important exception.

Prefer **one primary reader job per paragraph or block**, while allowing tightly coupled rules, constraints, and exceptions to remain together when separating them would increase ambiguity or retrieval cost.

Repeated wording may be compressed when it is genuinely redundant. Do not compress content solely because the same idea appears elsewhere. Classify uncertain cases as **UNCLEAR** rather than deleting by assumption.

Preserve examples, tables, decision trees, diagnostics, checklists, and other structured representations when they provide a distinct retrieval, application, validation, or recognition function, even when their underlying concept is explained elsewhere.

**Editorial success is measured by reduced redundant semantic load and improved navigability — never by word count alone.**

---

## Git safety & delivery

- **NEVER** use `git add -A` / `git add .` / `git add -u` — ONLY `git add <specific paths>`.
- Before EVERY commit, verify nothing from the forbidden list is staged (see `.gitignore`).
- When you edit `src/` content, run `pnpm run build` BEFORE committing — regenerated root fallbacks must be staged together with the `src/` changes in the same commit.
- Pre-commit hook (`.husky/pre-commit`) auto-runs: `pnpm run lint` + `pnpm run build` + `pnpm run validate`. To skip the build/validate (NOT lint) set `SKIP_ARTIFACT_BUILD=1` — use ONLY for doc-only commits that don't touch `src/` or `data/`.
- **Delivery discipline (reproducible against BASE_COMMIT):**
  - After the work, review `git diff --stat <BASE_COMMIT>` — only intentionally changed files may appear.
  - List deletions explicitly; never mix artifacts, caches, logs, or temp files into the delivery.
  - Unintended changes must be disclosed, never hidden or "tidied away".
  - Root fallbacks regenerated by an exploratory build (timestamp-only churn in `index.html`) — restore with `git restore <path>` unless the iteration actually built deliverables.

---

## Stop conditions (ask the owner before proceeding)

- `package.json` version field or `src/VERSION` (version bump requires 4-place sync)
- `.github/workflows/*.yml` (deploy pipeline)
- `data/character_schema.json` or any widget data file schema (data migration)
- `data/anchor-redirects.json` (renaming/deleting section IDs breaks inbound links)
- `eslint.config.js`, `.gitignore`, `.husky/pre-commit`, `.nvmrc`
- Disabling or modifying the pre-commit hook
- A CSP violation (inline script/style leaked into master HTML) → stop, treat as security KI, fix at source
- A canon→master drift that `audit_canon_master_sync.py` reports as FAIL → stop, reconcile against canon (canon wins)
- Same failed approach twice, or a repo-level ambiguity the repository cannot resolve itself

---

## Bug → doc → fix (KI lifecycle)

Found a bug → **first record it in `STATUS.md` as `KI#<N>`** → then decide:

- In scope of the current task → fix now.
- Out of scope → record + defer (`PLAN.md` backlog row), continue the current task.

Lifecycle (mandatory, not optional):
- **On open:** one line — `KI#<N>` · short description · date opened.
- **On close:** mark `CLOSED iter-<N>`, do not delete immediately.
- Any KI marked CLOSED for more than 2 iterations MUST be deleted from `STATUS.md` at the start of the next iteration touching that file.

---

## Definition of Done

Green tests alone do NOT mean Done. An iteration is Done when ALL hold:

```
task acceptance criteria satisfied
+ required verification passed (gates relevant to the task type)
+ required docs/state updated (STATUS, worklog, NAV §1 if structure changed)
+ scope respected (diff vs BASE_COMMIT contains only intended files)
+ delivery state is explicit (files list, deletions, regeneration disclosed)
```

---

## Output format (every iteration)

End your iteration with these fields:

```
Done:         <what was completed>
Not done:     <what was deferred, with reason>
Next step:    <what the next iteration should pick up>
Active KIs:   <list of open KIs>
BASE_COMMIT:  <commit the delta is measured against>
Files:        <exact files changed/created/deleted>
```

Then output the exact Git Bash commands:

```bash
git add <specific files>     # NEVER use '.', '-A', or wildcards
git commit -m "<message>"
git push origin main
```

---

## Document caps (enforced every iteration)

| File | Cap |
|------|-----|
| `STATUS.md` | ≤15 active KIs; Current State ≤ ~15 lines (detail lives in `worklog.md`) |
| `worklog.md` | ≤10 entries; latest iteration in detail, older = one-line summaries |
| `CHANGELOG.md` | Latest 2–3 iterations in detail, older collapsed to one-line |
| `AGENT_NAVIGATION.md` | Current-state map only — never history or narrative |
| `DECISIONS.md` | Append-only; supersede, never delete; collapse by merging when over ~20 rows |

Check the current size before writing; the trim is part of the task, not future work.

---

## Pointers

| Document | When to read |
|----------|--------------|
| [`AGENT_NAVIGATION.md`](./AGENT_NAVIGATION.md) | System map: directories, build pipeline, section model, widgets, pitfalls, information ownership |
| [`STATUS.md`](./STATUS.md) | Current state: iteration, KIs, authoritative **Next step** |
| [`PLAN.md`](./PLAN.md) | Backlog: what is pending, in what order, with scope + acceptance criteria |
| [`DECISIONS.md`](./DECISIONS.md) | Standing decisions: the "why" (append-only) |
| [`worklog.md`](./worklog.md) | Latest iteration detail (older = one-line summaries) |
| [`CHANGELOG.md`](./CHANGELOG.md) | Release history |
| [`docs/architecture.md`](./docs/architecture.md) | Deep architecture: build stages, ownership, section model, validation |
| [`docs/canon/_README.md`](./docs/canon/_README.md) | Canon rules: how `docs/canon/*.md` relates to `src/master/*.html` |
| [`docs/components.md`](./docs/components.md) | CSS component registry — use ONLY classes defined here |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Human contributor workflow (PRs, branches, conventions) |
