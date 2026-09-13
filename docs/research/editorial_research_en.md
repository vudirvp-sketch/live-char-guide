# Live Character Guide — Textual Content Editorial Research (external intake)

> **Source:** file `live_character_guide_editorial_research_en.md`, delivered by the owner 2026-09-13 (session bootstrap artifact).
> **Analyzed object:** this repository, v9.2.6 / iter 117 state.
> **Method:** external editorial audit of the reader-facing textual layer. The report itself documents its limitation: no local clone existed at research time — no verified `BASE_COMMIT`, no local `git status`, no validation runs. All claims were UNVERIFIED at delivery.
> **Intake (iter 118):** report body preserved verbatim below; claims spot-checked against the actual repository:
> - §3 / research-KI-3 (card-block counting 4 vs 5) — **CONFIRMED**, fixed in iter 118 as **KI#68** (canon §1.2 + master `p1_card_overview`: "четырёх блоков" → "пяти блоков"; 5-block model = SP / Description / Examples / Anchors / Greeting, consistent with E01 stack + block table + Anchors RULE in the same section).
> - §12 / research-KI-7 (reader-facing prose mixed with repo metadata) — **CONFIRMED** (master `part_07a.html` carries "известный drift (KI#58)", "D4, iter 93"; `part_08.html` carries "убрана в iter 55 … (KI#38 ✅ CLOSED)" in rendered prose; canon mirrors exist). Fix queued as backlog row **ed-6**.
> - §17 (SP vs MBTI S–P collision) — **PARTIALLY RESOLVED already**: `data/glossary.json` defines S·P disambiguation ("Не путать с System Prompt (SP)… обозначается как S·P"). Remaining prose-consistency audit folded into **ed-7**.
> - All other findings (Part 1 overload, CORE DIRECTIVES layering, Voice fragmentation, Token Budget spread, diagnostics re-teaching, cognitive density, information timing, rule strength, reading modes) — recorded as backlog rows **ed-1…ed-8** + owner-gated **ed-policy** (editorial rule set adoption); execution gated on the **ed-matrix** audit (research §32).
> **Report numbering note:** the report's "KI-1…KI-16" are research-internal findings, NOT repository KIs. Repository KI numbering continues at KI#68.
> **Date of intake:** 2026-09-13 (iter 118).

---

# Live Character Guide — Textual Content Editorial Research

## Done / Not Done

**Done — the textual/editorial research has been consolidated and expanded.**

This report focuses on the reader-facing text of the Live Character Guide rather than implementation. It incorporates the original research findings and adds several further editorial dimensions: cognitive density, information timing, navigation debt, terminology hierarchy, normative ambiguity, example coverage, functional-load preservation, multiple reading modes, and the distinction between true duplication and merely related concepts.

The original repository investigation could not establish a local Git clone or local Git state in the sandbox. The conclusions below therefore preserve that limitation rather than implying a local `HEAD`, `git status`, or validation run that was not actually performed.

---

## Question

How overloaded is the Guide's textual layer, where does it repeat the same meaning unnecessarily, how readable are the formulations, and what can be simplified, reorganized, or rewritten without losing semantic or functional value?

A second objective is to determine **how to make the Guide easier to read without reducing the practical capability of the method**.

---

# Verdict

## PARTIALLY CONFIRMED

The Guide does **not** appear conceptually overdesigned. Its overall pedagogical architecture is strong:

> foundations → Anchors → Voice → SPINE → psychology → CoT → assembly → diagnostics → examples

The principal problem is editorial rather than conceptual.

The Guide repeatedly presents the same underlying concepts through several layers:

> definition → rule → explanation → table → example → reminder → checklist → anti-pattern

Some of these repetitions are useful because they serve different functions. Others are effectively the same explanation presented again.

The strongest overall conclusion is therefore:

> **The Guide does not primarily suffer from too much information. It suffers from too many presentations of the same information.**

The recommended direction is **semantic consolidation**, not aggressive shortening.

A concept should normally have:

1. one canonical place where it is actually taught;
2. later places where it is applied;
3. diagnostic places where it is verified;
4. cross-references where repetition is unnecessary.

The target is not a specific percentage reduction in word count. The target is a reduction in **redundant semantic load while preserving functional coverage**.

---

# 1. Core Finding: Semantic Duplication Is the Main Editorial Problem

### FACT

The repository's canon explicitly favors a single canonical definition for a concept and cross-reference rather than repeated explanations.

### FACT

The existing research identified multiple recurring concept groups, including:

- Pre-build;
- Voice;
- CORE DIRECTIVES;
- Token Budget;
- Anchors;
- Price;
- Embodiment;
- Anti-godmoding;
- SPINE checks;
- recurring examples.

### INFERENCE

The repetitions are not merely accidental local edits. The Guide sometimes behaves as though each stage must independently re-teach a concept to the reader.

This creates a recurring pattern:

> explain → remind → explain differently → demonstrate → remind again

That pattern increases reading cost without necessarily increasing understanding.

### Recommendation

Adopt a strict editorial rule:

> **First occurrence teaches.  
> Later occurrence applies.  
> Diagnostic occurrence verifies.  
> Additional re-explanation requires a clear new purpose.**

This does **not** mean that every repeated term should disappear.

It means that each repetition must answer:

> **What new job is this occurrence doing?**

If the answer is "none," remove or replace it with a cross-reference.

---

# 2. Part 1 Is the Strongest Candidate for Compression

Part 1 appears to carry too many responsibilities simultaneously:

- method philosophy;
- Card Anatomy;
- Guide structure;
- card blocks;
- token budgeting;
- foundational definitions;
- Pattern Matcher;
- Anchor rule;
- Voice rule;
- Psychology rule;
- OCEAN example;
- Anchor placement rules.

This turns the introduction/foundation into a compressed preview of later Parts.

The problem is not that these concepts are wrong to introduce.

The problem is that Part 1 often introduces them at a level that competes with their canonical explanations later.

## Recommendation

Make Part 1 a genuine **Foundation / Orientation** layer.

Keep:

1. what the card is;
2. the core mental model;
3. the fundamental rules;
4. a short pipeline map;
5. one compact example.

Move detailed rules into their canonical Parts and use references from Part 1.

The result should feel like:

> **"Here is how to understand the Guide."**

rather than:

> **"Here is a compressed copy of the entire Guide."**

---

# 3. Card Anatomy Contains a Structural Ambiguity

There is a concrete clarity issue around the number and role of card blocks.

One formulation presents the card as four blocks, while another presentation effectively exposes five:

- System Prompt;
- Description;
- Examples;
- Anchors;
- Greeting.

Lorebook is also treated as an optional additional context mechanism.

Anchors are at times treated as a structural layer, but elsewhere appear inside an Examples-related model.

## Why this matters

This is not merely stylistic.

A reader should not have to reconstruct the actual card model from several sections.

## Recommendation

Define one stable model.

For example:

> **Core card fields**
> - System Prompt
> - Description
> - Examples
> - Greeting
>
> **Behavioral layer**
> - Anchors
>
> **Optional external context layer**
> - Lorebook

The exact implementation terminology should follow repository authority. The important editorial requirement is consistency.

Do not describe the same anatomy using incompatible counting schemes.

---

# 4. Anchors Should Have One Full Explanation

Anchors are central enough that some reinforcement is desirable.

However, `Trigger → Action → Price` is currently encountered across multiple conceptual and operational layers.

Repeated exposure is useful only when the function changes.

## Recommended structure

### Part 2

Give the full conceptual explanation of Anchors.

### Part 1

Give only a compact orientation:

> Anchor = Trigger → Action → Price. See Part 2.

### Assembly

Use Anchors operationally without re-teaching them.

### Diagnostics

Check whether Anchors work rather than explaining what Anchors are.

### Examples

Demonstrate exceptional or subtle Anchor behavior without repeating the entire definition.

## Important exception

**Price should remain pedagogically visible.**

Price is one of the central failure points for Anchors and a recurring beginner mistake. Removing every reminder would sacrifice useful reinforcement.

The distinction should be:

> repeat the **signal**  
> not repeat the **lesson**

---

# 5. Voice Is Fragmented into Too Many Nearby Concepts

The Voice material contains closely related concepts such as:

- Voice Isolation;
- Voice Leak;
- Voice Bleed;
- Voice Examples;
- Voice Quality.

The terminology itself may be useful. The issue is that the reader can experience these as several separate rules instead of one system.

## Recommendation

Reframe Voice as one model:

> **Voice: how it works**
>
> 1. where voice lives;
> 2. what isolation means;
> 3. what leak / bleed look like;
> 4. how voice appears in Examples;
> 5. how voice is validated.

This preserves terminology while reducing conceptual fragmentation.

The terms should become **failure modes or dimensions of one model**, not five nearly independent lessons.

---

# 6. CORE DIRECTIVES Should Have One Canonical Definition

This is one of the clearest cases of over-presentation.

The same material currently appears through combinations of:

- visual representation;
- template;
- directive list;
- detailed directive explanations;
- assembly references;
- later manifestations in examples.

## Recommendation

Make the canonical definition live in one location, preferably Part 7A if that remains the repository's intended operational location.

Then:

- visuals should clarify, not duplicate;
- assembly should reference the definition;
- later parts should use the directive system without restating it.

Example:

> `Insert CORE DIRECTIVES → see Part 7A.`

The visual should answer:

> "What does this look like?"

The canonical section should answer:

> "What is it and how does it work?"

These are complementary functions.

---

# 7. Token Budget Is Fragmented

Token Budget information appears in several parts of the Guide.

This creates the appearance of multiple budgeting systems even when the underlying rule is one system.

## Recommendation

Create one authoritative budget reference.

### Part 1

State only:

> Each block has a budget. See Part 7A for the full budget model.

### Part 7A

Contain the authoritative table and operational explanation.

### Diagnostics

Check compliance with the budget rather than redefining it.

### Examples

Show how the budget was used in a concrete card.

This separates:

> **What the rule is**

from:

> **Whether this card followed the rule**

---

# 8. Anti-Godmoding Should Be Centralized

Anti-godmoding is another concept that appears across several layers.

The operational rule should have one canonical home.

## Recommended distribution

### Canonical definition

One full operational explanation.

### Diagnostics

Show the failure pattern and how to detect it.

### Elsewhere

Use one sentence or cross-reference.

There is no need to repeatedly explain that `{{user}}` should not be controlled if the surrounding section is doing another job.

---

# 9. Embodiment Should Separate Method from Instruction

Embodiment is a useful example of the right conceptual distinction.

The method belongs in its conceptual home:

> State → Body → Sensor → Speech

The assembly layer should tell the author to use the method.

It should not teach the method again.

A compact operational form is enough:

> `EMBODIMENT FIRST requires the Embodiment Protocol → Part 2.`

The important editorial boundary is:

> **method explanation ≠ assembly instruction**

---

# 10. Diagnostics Should Validate, Not Re-Teach

Part 9 legitimately needs repetition.

A diagnostic system must mention the features it is testing.

That is **functional repetition**, not necessarily redundancy.

The key distinction is:

### Useful

> "When triggered, does the response produce the expected physical Price?"

### Less useful

> "An Anchor consists of Trigger → Action → Price, where Price is..."

The first validates the output.

The second re-teaches the concept.

## Recommendation

Keep diagnostic repetitions when they are **observable tests**.

Reduce them when they become mini-lessons.

This preserves the useful distinction between:

- diagnosis after a known symptom;
- pre-deployment validation.

---

# 11. Part 10 Should Demonstrate More Than It Explains

Full examples are valuable and should not be removed merely to reduce word count.

However, some examples currently accumulate:

- explanation;
- "demonstrates" list;
- template;
- full card;
- Anchors;
- CoT;
- Greeting;
- commentary.

That can turn an example into a second tutorial.

## Recommendation

Use the example primarily as evidence.

A compact preface is often enough:

> **Demonstrates:** Embodiment, SPINE, Anchors, CoT.

Then show the card.

Add commentary only where the implementation contains something non-obvious or pedagogically important.

The goal is:

> **show the method in action**

rather than:

> **re-explain the method before and after showing it**

---

# 12. Reader-Facing Content Is Mixed with Repository/Authoring Metadata

Some sections contain information that is useful for maintaining the repository but not essential for learning or using the Guide.

Examples include material concerning:

- iteration metadata;
- KI references;
- drift;
- canon synchronization;
- build conventions;
- implementation-format caveats.

## Recommendation

Separate:

### Reader content

What a Guide user needs to know to create, assemble, test, or debug a character card.

### Author/repository metadata

What maintainers need to know to preserve the Guide itself.

A reader should not have to process repository maintenance concepts while learning character construction.

This is a major source of **non-semantic cognitive load**.

---

# 13. Cognitive Density Is a Separate Problem from Duplication

Not every heavy passage is repetitive.

Some passages are difficult because too many distinct ideas are packed into one sentence or paragraph.

A typical high-density construction looks like:

> definition + exception + category + historical rationale + convention + caveat + cross-reference

Even when every component is unique, the paragraph is hard to parse.

## Recommendation

Use:

> **one main semantic job per paragraph**

and, where practical:

> **one major claim per sentence**

For example:

> **System Prompt (SP)** — the instruction container at the start of context.  
> **CORE DIRECTIVES** — the directive set contained within the System Prompt.  
> **SP ≠ MBTI S–P** — these are unrelated uses of the abbreviation.

This is easier to scan than embedding all three distinctions into one sentence.

---

# 14. Information Timing Matters

Another editorial problem is not *what* is explained but *when* it is explained.

A concept can be correct and still be introduced too deeply before the reader has a reason to care about it.

The preferred progression is:

> **Why → What → How → Edge cases**

rather than:

> definition → caveat → exception → convention → implementation note → purpose

## Recommendation

When reviewing a section, ask:

> **Does the reader need this detail yet?**

If not, defer it until the point of application.

This is not deletion. It is **progressive disclosure**.

---

# 15. Navigation Can Become a New Form of Overload

Replacing every duplicate with `See Part X` is not automatically an improvement.

Too many cross-references can create navigation debt.

The reader may end up following:

> Part 1 → Part 2 → Part 7A → Appendix → Part 9

just to understand a single term.

## Recommendation

For every canonical concept, verify:

- there is one obvious home;
- the reference is descriptive;
- the destination is discoverable;
- the destination contains the required explanation;
- cross-references are not chaining through several intermediate locations.

A good cross-reference should reduce cognitive load, not merely move it elsewhere.

---

# 16. Terminology Needs a Clear Hierarchy

Some concepts are individually understandable but their relationship is harder to see.

Examples include:

> Anchor → Trigger → Action → Price

and:

> Voice → Isolation → Leak → Bleed

The issue is not necessarily terminology overload.

The issue can be **unclear hierarchy**.

## Recommendation

For major concept families, make the relationship explicit:

> **Parent concept**  
> → **component**  
> → **failure mode**  
> → **diagnostic signal**

This helps the reader understand why several terms exist without treating them as unrelated rules.

---

# 17. `SP` Creates Unnecessary Terminological Friction

`SP` is used for System Prompt while also potentially colliding with MBTI Sensing–Perceiving terminology.

A disclaimer helps but does not remove the cognitive collision.

## Recommendation

Prefer:

- `System Prompt` in headings;
- `SP` after first definition;
- `S–P` or `Sensing–Perceiving` for MBTI.

This is preferable to repeatedly saying "do not confuse these."

---

# 18. English/Russian/Technical Terminology Is Sometimes Excessive

Mixed technical terminology is not itself a problem.

The problem arises when several equivalent terms are introduced repeatedly:

> pattern / rule / block / workflow / shorthand / convention

or when an English term is translated, reintroduced, and translated again.

## Recommendation

Use:

> **English technical term → one concise explanation → term thereafter**

Do not repeatedly define an already established term unless its meaning has changed.

---

# 19. Some Statements Are Too Normative

Statements such as:

> "Violation of any of these leads to degraded generation quality."

or numerical targets such as:

> "~40–60%"  
> "80%"  
> "every 2–3 responses"  
> "minimum 6 scenarios"

can be interpreted as hard guarantees even when they are really heuristics.

## Recommendation

Clearly distinguish at least four classes:

| Class | Meaning |
|---|---|
| **Rule** | expected / required behavior |
| **Recommended target** | preferred but adjustable |
| **Observed heuristic** | empirically useful tendency |
| **Diagnostic threshold** | practical test threshold |

This prevents useful heuristics from becoming artificial laws.

---

# 20. Useful Repetition Must Be Preserved

The solution is not "remove repetition."

Some repetitions are structurally valuable.

Particularly important examples are:

### Price

Worth reinforcing because it is a central Anchor property and common failure point.

### SPINE causality

It acts as a backbone across concept, construction, and diagnostics.

### Show, Never Tell

Works as a cross-cutting principle.

### Embodiment

Connects psychology → behavior → prose.

These should recur when the recurrence changes function.

The preferred model is:

> **definition → application → verification**

not:

> **definition → same definition → slightly different definition**

---

# 21. Example Coverage Must Be Protected During Compression

A text-reduction pass can accidentally remove the only example that demonstrates a difficult concept.

Therefore, examples should be audited separately from prose.

For each major concept, ask:

| Concept | Definition | Good example | Failure example | Diagnostic example |
|---|---:|---:|---:|---:|
| Anchors | ✓ | ? | ? | ? |
| Voice | ✓ | ? | ? | ? |
| SPINE | ✓ | ? | ? | ? |
| Embodiment | ✓ | ? | ? | ? |

A missing cell does not automatically require adding content. It simply makes the compression decision safer.

**Do not remove examples merely because they repeat prose. Their functional role may be different.**

---

# 22. Functional Load Must Be Checked Before Deleting Anything

The central safety rule for editorial work should be:

> **Never ask only "Can this paragraph be removed?" Ask "What capability disappears if it is removed?"**

For every candidate deletion, classify the lost content as:

- no unique information;
- repetition only;
- navigation;
- unique operational instruction;
- unique example;
- unique diagnostic condition;
- unresolved distinction.

Safe compression usually starts with:

> **no unique information**

and cautiously includes:

> **repetition only**

The other categories require deliberate review.

This is the best guard against simplifying the Guide until it becomes incomplete.

---

# 23. The Guide Serves Multiple Reading Modes

The text appears to support at least four possible reader modes:

1. **Learning** — a new reader goes through the method.
2. **Building** — an experienced author constructs a card.
3. **Debugging** — a reader diagnoses a broken result.
4. **Lookup** — a reader needs one specific rule.

A structure optimized for linear learning is not automatically optimal for lookup.

Some current repetitions may exist because the Guide is implicitly trying to support all four modes at once.

## Recommendation

Do not force every section to serve every mode.

Instead make the modes explicit through structure:

> **Teach** → learning  
> **Apply** → building  
> **Verify** → debugging  
> **Reference** → lookup

This strengthens the existing architecture rather than replacing it.

---

# 24. Distinguish Duplicate Concepts from Related Concepts

Aggressive deduplication creates a new risk: merging things that are similar but intentionally distinct.

Every editorial finding should therefore use one of these classifications:

- **DUPLICATE** — same meaning, same purpose;
- **REINFORCEMENT** — same concept, different pedagogical purpose;
- **SPECIAL CASE** — same family, materially different condition;
- **RELATED BUT DISTINCT** — connected concepts that should remain separate;
- **CONTRADICTORY** — conflicting formulations;
- **UNCLEAR** — insufficient evidence to decide.

This is especially important for:

- Voice;
- Anchors;
- diagnostics;
- exceptions;
- assembly rules.

Do not consolidate two sections merely because they use similar vocabulary.

---

# 25. Proposed Editorial Architecture

The existing Part sequence should not be redesigned wholesale.

A safer architecture is to sharpen the roles already present.

## Layer 1 — Teach

Each major concept receives one canonical explanation.

Examples:

- Part 2 = Anchors
- Part 3 = Voice
- Part 4 = SPINE
- Part 5 = Psychology

## Layer 2 — Apply

Later sections use the concepts operationally.

Examples:

- Part 7A = assembly
- Part 10 = complete examples

These sections should assume the reader already knows the concept.

## Layer 3 — Verify

Diagnostics determine whether the implementation works.

Examples:

- Part 8 = failure analysis
- Part 9 = validation / pre-deploy checking

These sections should focus on observable outcomes.

## Layer 4 — Reference

Terminology, tables, compact rules, and navigation should support lookup without duplicating the full teaching layer.

---

# 26. Priority Changes

## P0 — Required

### 1. Reduce Part 1 to a true foundation/orientation layer

Keep the model, fundamental rules, pipeline, and one compact example.

### 2. Remove repeat definitions of Anchors, Price, Voice, Embodiment, and Anti-godmoding

Keep functional reminders where needed.

### 3. Make CORE DIRECTIVES canonical in one location

Use references elsewhere.

### 4. Resolve the card-block counting inconsistency

Define one stable anatomy.

### 5. Separate teaching, application, and diagnostics

Do not let assembly or diagnostic sections become second tutorials.

### 6. Preserve functional load during every deletion

Require a "what capability disappears?" check.

---

## P1 — Strongly Recommended

### 7. Consolidate Voice into one conceptual model

Keep the terminology but treat it as a unified system.

### 8. Centralize Token Budget information

One authoritative table, operational references elsewhere.

### 9. Separate reader content from repository-maintenance metadata

Move authoring/build concerns away from the main narrative where possible.

### 10. Reduce high-density sentences

Prefer short declarative statements.

### 11. Normalize technical terminology

Introduce terms once and use them consistently.

### 12. Clarify rule strength

Distinguish rules, recommendations, heuristics, and diagnostic thresholds.

### 13. Improve cross-reference quality

Reduce navigation debt rather than merely moving text elsewhere.

### 14. Explicitly clarify concept hierarchies

Especially for Anchors and Voice.

---

## P2 — Valuable but Non-Critical

### 15. Audit example coverage

Protect unique examples while removing redundant explanatory prose.

### 16. Make reading modes clearer

Support learning, building, debugging, and lookup intentionally.

### 17. Reduce Part 10 commentary

Prefer demonstration over re-teaching.

### 18. Consider a unified Master Checklist

Use it to expose where validation occurs across the pipeline.

### 19. Reduce redundant cross-reference prose

References should be useful, not ornamental.

---

# 27. Recommended Editorial Rule Set

For the eventual rewrite, the following rules should govern every section.

### Rule 1 — One canonical explanation

A major concept should have one place where it is fully defined.

### Rule 2 — Repetition requires a changed function

A repeated concept should teach, apply, demonstrate, diagnose, or navigate.

### Rule 3 — One paragraph, one primary job

Do not combine definition, exception, history, metadata, and implementation caveats unnecessarily.

### Rule 4 — Progressive disclosure

Present the minimum concept needed now and defer edge cases until they become relevant.

### Rule 5 — Preserve examples with unique functional value

Do not delete examples merely because prose elsewhere states the same principle.

### Rule 6 — Do not confuse similar concepts

Use the classification:

> duplicate / reinforcement / special case / related / contradictory / unclear.

### Rule 7 — Every deletion must pass the functional-load test

Ask what the reader can no longer do if the text is removed.

### Rule 8 — Cross-reference instead of re-teaching

But only when the reference leads directly to the required explanation.

### Rule 9 — Prefer observable diagnostics

A diagnostic should test output behavior rather than repeat theory.

### Rule 10 — Separate reader rules from repository rules

Maintenance information should not compete with the main learning path.

---

# 28. Evidence

### FACT

The repository's stated canon favors canonical definitions and cross-referencing rather than duplicated explanations.

### FACT

The existing research identified a substantial set of duplicate or overlapping concept groups across the Guide.

### FACT

The current structure is a linear Part-based pedagogical pipeline and already separates learning, assembly, diagnostics, and examples to a meaningful degree.

### INFERENCE

The principal issue is **editorial consolidation inside an otherwise viable architecture**, not a need for a complete redesign.

### INFERENCE

The highest-value changes are therefore local and structural:

> consolidate → clarify → defer → cross-reference → validate

rather than:

> rewrite everything.

---

# 29. Alternatives Tested

## A. "The Guide is simply too long."

**Rejected as too broad.**

Length alone is not the primary defect. A long document can still be efficient when every section performs a distinct job.

The stronger diagnosis is semantic repetition plus cognitive density.

## B. "The Guide needs more explanation for beginners."

**Partially rejected.**

Beginner support is necessary, but adding more prose to already repeated concepts is unlikely to solve the main problem.

The better solution is stronger first explanations, clearer terminology, and better navigation.

## C. "The whole structure should be redesigned."

**Rejected.**

The existing sequence has a strong pedagogical direction. The more defensible intervention is to sharpen role boundaries inside the current structure.

## D. "Everything repetitive should be deleted."

**Rejected.**

Some repetition is functional reinforcement, especially for Price, SPINE causality, Show, Never Tell, and Embodiment.

## E. "Everything should be compressed into one reference section."

**Rejected.**

That would optimize for lookup at the expense of learning and application.

The better model is:

> canonical teaching + operational use + verification + compact reference.

---

# 30. Remaining Risks and Uncertainty

The current research has several important limits.

### Local repository state

The original investigation did not successfully establish a local Git clone in the sandbox. Therefore:

- no verified local `BASE_COMMIT` can be claimed;
- no local `git status` can be claimed;
- no local validation scripts can be claimed as executed;
- no exact local canon/master synchronization can be asserted.

These limitations should remain explicit.

### User testing

Repository evidence can demonstrate structural duplication, but it cannot prove exactly how much the current wording impairs real readers.

The following remains **UNKNOWN** without reader testing:

> how much editorial compression improves actual completion, comprehension, and recall.

### Heuristic strength

Some numerical thresholds and quality claims remain empirical heuristics rather than universal laws.

They should not be strengthened into absolute guarantees without further validation.

---

# 31. Changes Made

**No repository files were changed as part of this research report.**

This is a research/editorial consolidation, not an implementation pass.

---

# 32. Recommended Next Verification Step

The safest next step is a **full section-by-section editorial matrix** for Parts 1–10.

For every paragraph or compact block, assign:

> `DEFINITION`  
> `APPLICATION`  
> `EXAMPLE`  
> `VALIDATION`  
> `NAVIGATION`  
> `METADATA`  
> `DUPLICATE`  
> `REMOVE`

Then add:

> `KEEP / COMPRESS / MOVE / CROSS-REFERENCE / DELETE`

and, critically:

> **Functional load preserved? YES / NO / UNCERTAIN**

This provides a controlled path to editing without accidentally removing capabilities.

A second useful pass should separately classify each repeated concept as:

> `DUPLICATE / REINFORCEMENT / SPECIAL CASE / RELATED BUT DISTINCT / CONTRADICTORY / UNCLEAR`

Only the first category is an automatic compression candidate.

---

# 33. Final Recommendation

Do **not** aim to make the Guide "short."

Aim to make it **dense with unique value**.

The strongest editorial target is:

> **Every important concept should have one place where it is taught, later places should use it rather than re-teach it, and diagnostic places should verify observable consequences.**

Preserve:

- rules;
- tables;
- checklists;
- unique examples;
- diagnostics;
- important failure modes;
- foundational terminology.

Compress primarily:

- repeated explanations;
- repeated caveats;
- duplicate definitions;
- narrative reminders that add no new function;
- repository-maintenance metadata embedded in reader-facing prose;
- long sentences carrying several independent qualifications.

The desired end state is not a shorter Guide for its own sake.

It is a Guide where the reader can more quickly answer:

> **What is this?**  
> **Why do I need it?**  
> **How do I use it?**  
> **How do I know it worked?**

without encountering the same answer multiple times.

---

# Active KIs

- **KI-1:** semantic duplication between Parts.
- **KI-2:** Part 1 overloaded.
- **KI-3:** inconsistent card-block model.
- **KI-4:** Voice terminology fragmented.
- **KI-5:** CORE DIRECTIVES represented too many times.
- **KI-6:** Token Budget / Price / Anti-godmoding repeated across workflow stages.
- **KI-7:** reader-facing prose mixed with repository/authoring metadata.
- **KI-8:** numerical heuristics risk reading as hard requirements.
- **KI-9:** high cognitive density even where content is not duplicated.
- **KI-10:** information sometimes appears before the reader needs it.
- **KI-11:** cross-reference debt may replace prose duplication with navigation burden.
- **KI-12:** rule strength is not always clearly distinguished from recommendation or heuristic.
- **KI-13:** the Guide implicitly serves multiple reading modes without always separating them.
- **KI-14:** similar concepts may be incorrectly merged if editorial deduplication is too aggressive.
- **KI-15:** unique example/diagnostic coverage must be protected during compression.
- **KI-16:** terminology hierarchy is sometimes less explicit than the underlying conceptual model.

---

# BASE_COMMIT

**UNKNOWN.**

The original research did not establish a trustworthy local Git commit.

Do not invent or infer a hash.

For a future local repository pass, record:

```bash
BASE_COMMIT="$(git rev-parse HEAD)"
git status --short
printf '%s\n' "$BASE_COMMIT" > BASE_COMMIT.txt
```

---

# Archive

**Not created.**

No repository implementation changes were made.

---

# Exact Git Bash Commands for the Next Local Editorial Pass

```bash
git clone https://github.com/vudirvp-sketch/live-char-guide.git live-char-guide
cd live-char-guide

BASE_COMMIT="$(git rev-parse HEAD)"
git status --short
printf '%s\n' "$BASE_COMMIT" > BASE_COMMIT.txt
```

For the editorial analysis itself, the preferred workflow is:

```text
Part / Section
→ identify primary function
→ identify canonical concept
→ identify repeated semantics
→ classify repetition
→ identify unique functional load
→ choose KEEP / COMPRESS / MOVE / CROSS-REFERENCE / DELETE
→ verify that no required behavior or example coverage was lost
```

---

## Bottom Line

**Do not perform a radical rewrite.**

The Guide's conceptual architecture is stronger than its current prose discipline.

The highest-value intervention is **editorial consolidation**:

> fewer repeated explanations, clearer concept ownership, lower cognitive density, better information timing, stronger navigation, explicit terminology hierarchy, clearer rule strength, and protected functional coverage.

That should make the Guide substantially easier to read **without reducing what it can teach, build, or diagnose**.
