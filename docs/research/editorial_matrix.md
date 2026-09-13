# Editorial Matrix — Live Character Guide

> **Phase A: Parts 1 / 3 / 7A / 9** — block-level editorial audit per `PLAN.md` row `ed-matrix`
> and `docs/research/editorial_research_en.md` §32 (matrix spec), §24 (repeat classification),
> §22 (functional-load test), §20 (useful-repetition whitelist).
> **Provenance:** iter 120, BASE `bd2134f06c5116113b9c9f180c13d151c51b4302`, worktree clean at start.
> **Read-only analysis:** no content files (`docs/canon/`, `src/master/`) were edited in this iteration.
> **Phase decision:** Parts 1/3/7A/9 selected per `docs/research/backlog_audit_iter118.md` §2/§4
> (the four highest-conflict zones per research §26). Phase B (Part 0, 2, 4, 5, 6, 7B, 8, 10 +
> appendices) remains pending in `PLAN.md` — visible re-scope, not silent narrowing.
> Language: English (repo law). Russian snippets quote the audited canon verbatim.

---

## 1. Method

### 1.1 Block unit and block-ID scheme (machine-checkable)

- **Audited object:** `docs/canon/part_NN.md` — the source of truth (fence #10). Master HTML is not
  re-audited; the canon→master sync (97/97) already guarantees content equivalence.
- **Block unit** = one canon markdown block: a paragraph, a list, a table, a callout
  (`<div class="callout">`), a fenced code block, a `[VS: …]` / `[INTERACTIVE WIDGET: …]` marker,
  or a `**RULE:**` / `**RECOMMENDATION:**` paragraph. `##`/`###`/`####` headings are not rows;
  each heading is folded into the descriptor of the first block that follows it. A directive
  description with its own code block and cross-refs counts as ONE compact block.
- **Block ID** = `<data-section-id>::<NN>` — the section ID (fence #4: stable, unique across the
  guide) + a 2-digit ordinal of the block within its section, in document order.
- **Derivation is deterministic and re-derivable by script:** split the canon file at each
  `` `data-section: …` `` marker line; within a section, split the remainder on blank lines; count
  non-empty units (a fenced code block containing blank lines counts as ONE unit; an HTML callout
  div counts as ONE unit). A future validator can diff derived IDs against the `id` column of this
  document (infrastructure task, not required by the PLAN row).
- **Line references** (`L…`) point into the canon file of the part named in the section header.

### 1.2 Columns

| Column | Values | Meaning |
|---|---|---|
| `tag` | `DEFINITION / APPLICATION / EXAMPLE / VALIDATION / NAVIGATION / METADATA / DUPLICATE / REMOVE` | Primary function of the block (research §32) |
| `decision` | `KEEP / COMPRESS / MOVE / CROSS-REFERENCE / DELETE` | Recommended treatment (research §32) |
| `load` | `YES / NO / UNCERTAIN` | Functional load preserved **if the decision is applied** — "what capability disappears?" (research §22) |
| `repeat` | `DUPLICATE / REINFORCEMENT / SPECIAL CASE / RELATED BUT DISTINCT / CONTRADICTORY / UNCLEAR / —` | Second-pass classification of repeated semantics (research §24); `—` = single occurrence |

### 1.3 Interpretation rules

1. **Decisions are recommendations** feeding ed-1…ed-8 execution iterations, not edits. Nothing in
   this document changes canon or master content.
2. **Only `DUPLICATE` is an automatic compression candidate** (research §32). Every other repeat
   class requires deliberate review; `CONTRADICTORY` requires reconciliation, not compression.
3. **Useful-repetition whitelist respected** (research §20): Price, SPINE causality, Show Never Tell,
   Embodiment recur legitimately when the recurrence changes function (definition → application →
   verification, not definition → same definition).
4. **VS-shadowing:** where a VS-EMBED replaces the master-side text (DEC-03, `viz > dry text`), the
   canon block is the *source for the viz*, not redundancy — tagged `METADATA`, decision `KEEP`.
5. **Examples are protected** (research §21 / Rule 5): an example is never `DELETE` merely because
   prose states the same principle; its demonstration function is distinct.
6. **Functional-load categories** for deletions (research §22): no unique information / repetition
   only / navigation / unique operational instruction / unique example / unique diagnostic
   condition / unresolved distinction. Safe compression starts with the first two.

---

## 2. Part 1 — Foundations (`docs/canon/part_01.md`, 6 sections)

### p1_value_proposition (§1.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p1_value_proposition::01 | L18 | intro: classic vs systematic approach | DEFINITION | KEEP | YES | — | Orientation thesis; unique |
| p1_value_proposition::02 | L20–25 | table: value-prop evidence (4 rows) | APPLICATION | KEEP | YES | DUPLICATE | Row «Дрейф голоса … ~40% → ~10%» duplicates §3.1 drift table (R04). Other 3 rows unique. Owner decision in ed-1/ed-4: keep one occurrence of the drift row |
| p1_value_proposition::03 | L27 | Методология disclaimer | METADATA | KEEP | YES | DUPLICATE | Canonical owner of the empirical-evidence caveat (research §19 pattern). Near-verbatim copy in §3.1 (R05) is the compression side |
| p1_value_proposition::04 | L29 | closing: «поведенческий движок» | DEFINITION | KEEP | YES | — | One-line thesis |

### p1_card_overview (§1.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p1_card_overview::01 | L39 | card definition: 5 blocks, behavioral engine | DEFINITION | KEEP | YES | — | Canonical anatomy (KI#68 fixed here, iter 118). E01 stack + block table agree on 5 |
| p1_card_overview::02 | L41 | сквозной пример (Елена) | NAVIGATION | KEEP | YES | — | Running-example announcement |
| p1_card_overview::03 | L43 | RULE: examples and style contract | DEFINITION | KEEP | YES | — | Unique style-scoping rule |

### p1_structure_overview (§1.2 subsection)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p1_structure_overview::01 | L51 | concept flow + Mermaid history | NAVIGATION | COMPRESS | YES | — | Function = reading order (keep); carries repo history «Mermaid удалён в iter 14» → ed-6 strip (R17) |
| p1_structure_overview::02 | L53 | Cross-ref: AUTO_TOC | NAVIGATION | COMPRESS | YES | — | Reader job = "TOC exists"; build internals (`AUTO_TOC_PLACEHOLDER`, build-скрипт) → ed-6 strip (R17) |
| p1_structure_overview::03 | L55 | порядок чтения (①–⑤) | NAVIGATION | KEEP | YES | — | Compliant orientation |
| p1_structure_overview::04 | L57 | E01 note: Anchors visually nested, structurally separate | APPLICATION | KEEP | YES | RELATED BUT DISTINCT | Feeds R01 (Anchors-placement); clarifies viz, not re-teach |
| p1_structure_overview::05 | L59–65 | table: 5 blocks influence/budget share | DEFINITION | KEEP | YES | — | Structural properties not visible in E01 — declared complement, not dupe |
| p1_structure_overview::06 | L67 | RULE 1-sentence: voice rule → §1.4 | NAVIGATION | KEEP | YES | — | Compliant pointer form |
| p1_structure_overview::07 | L69–71 | Token Budget + assembly refs | NAVIGATION | KEEP | YES | — | 1-sentence refs to §7A.12/§7A.13 — ed-5 already verified compliant |

### p1_core_rules (§1.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p1_core_rules::01 | L82 | intro: principles mandatory | DEFINITION | KEEP | YES | — | |
| p1_core_rules::02 | L84–88 | key terms list (Anchor/Voice/SPINE/OCEAN) | DEFINITION | KEEP | YES | — | «используются далее без повторного объяснения» — compliant introduce-once pattern (ed-7 anchor) |
| p1_core_rules::03 | L90 | RULE: LLM = Pattern Matcher | DEFINITION | KEEP | YES | REINFORCEMENT | **Canonical owner** of the principle. Re-teach in §3.1 (R03) is the compression side; §1.7/§7A.4 usages are compliant applications |
| p1_core_rules::04 | L92–94 | the 3 key principles (numbered) | DEFINITION | KEEP | YES | — | Canonical mental model; NAV §5 mirrors it |
| p1_core_rules::05 | L96 | RULE: Anchors placement (separate block in Examples-zone) | DEFINITION | KEEP | YES | REINFORCEMENT | **Canonical owner** of R01. Full copy in §7A.1 is the compression side; §7A.9/§7A.11 short+ref forms compliant |
| p1_core_rules::06 | L98–106 | callout EXAMPLE: OCEAN right vs wrong | EXAMPLE | KEEP | YES | — | Unique demonstration (§21 protection) |

### p1_top3_problems (§1.7)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p1_top3_problems::01 | L117 | intro + ref §9.4 | NAVIGATION | KEEP | YES | — | |
| p1_top3_problems::02 | L119–123 | Ошибка 1: godmoding (симптом/причина/исправление) | APPLICATION | KEEP | YES | REINFORCEMENT | Anti-godmoding string reuse = changed function (fix usage), R07 |
| p1_top3_problems::03 | L125–129 | Ошибка 2: voice mismatch | APPLICATION | KEEP | YES | REINFORCEMENT | Applies §3.1 + refs it — compliant application, not re-teach |
| p1_top3_problems::04 | L131–135 | Ошибка 3: ideal character / missing Price | APPLICATION | KEEP | YES | REINFORCEMENT | Price is whitelisted useful repetition (§20) |
| p1_top3_problems::05 | L137 | Synthesis | DEFINITION | KEEP | YES | — | |
| p1_top3_problems::06 | L139 | Cross-ref: ready cards | NAVIGATION | KEEP | YES | — | |

### p1_prebuild_checklist (§1.8)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p1_prebuild_checklist::01 | L150 | intro: 6 questions | NAVIGATION | KEEP | YES | — | |
| p1_prebuild_checklist::02 | L152–159 | table: 6 pre-build questions | APPLICATION | KEEP | YES | UNCLEAR | Q2 budget numbers («4K — Description ≤200 … 8K — ≤400») vs §7A.12 table (150/300/700 min/std/max) — different framings of one budget; R11, feeds ed-5 |
| p1_prebuild_checklist::03 | L161 | RECOMMENDATION: first config | APPLICATION | KEEP | YES | — | |

**Part 1 verdict:** structurally compliant with the orientation role already — token-budget/pipeline
subsections are 1-sentence refs (verified iter 118, re-confirmed here). The block-level findings are:
2 repo-meta strips (R17), 1 duplicate evidence row (R04), 1 framing tension (R11). The aggressive
"Part 1 re-teaches Parts 2–7A" expectation from research §2 is **not confirmed at block level**;
§1.4/§1.7/§1.8 are canonical owners or compliant applications. This refines ed-1's scope.

---

## 3. Part 3 — Voice (`docs/canon/part_03.md`, 8 sections)

### p3_voice_isolation (§3.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p3_voice_isolation::01 | L19 | Voice Isolation definition | DEFINITION | KEEP | YES | — | Canonical |
| p3_voice_isolation::02 | L21 | «Не объясняй голос — покажи его» | DEFINITION | KEEP | YES | — | Voice = ритм + лексика + синтаксис + парадоксы |
| p3_voice_isolation::03 | L23–26 | RULE: linguistic vs physical voice | DEFINITION | KEEP | YES | — | **Canonical owner** of the two-level voice rule (R06) |
| p3_voice_isolation::04 | L28 | Тест: classifier examples | VALIDATION | KEEP | YES | — | Observable test — research §9 approved form |
| p3_voice_isolation::05 | L30–35 | table: voice drift by message count | APPLICATION | KEEP | YES | DUPLICATE | Granular canonical occurrence of R04 (drift numbers); §1.1 row is the compression side |
| p3_voice_isolation::06 | L37 | Методология disclaimer | METADATA | CROSS-REFERENCE | YES | DUPLICATE | Near-verbatim copy of §1.1::03 (R05); replace with 1-sentence pointer to §1.1 |
| p3_voice_isolation::07 | L39 | RULE: модель — копировщик паттернов | DUPLICATE | COMPRESS | YES | DUPLICATE | Full re-teach of p1_core_rules::03 (R03); compress to 1 sentence + ref |

### p3_influence_hierarchy (§3.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p3_influence_hierarchy::01 | L50 | intro: influence differs by model size | DEFINITION | KEEP | YES | — | |
| p3_influence_hierarchy::02 | L52 | `[VS: E07]` marker | METADATA | KEEP | YES | — | Viz replacement (DEC-03); canon = source for E07 |
| p3_influence_hierarchy::03 | L54 | `[INTERACTIVE WIDGET: persona-voice-hierarchy]` marker | METADATA | KEEP | YES | — | Canon-embedded data exception (NAV §4); complements E07 |
| p3_influence_hierarchy::04 | L56–63 | table: 6 sources × 3 tiers | DEFINITION | KEEP | YES | — | Canonical data (also feeds the widget) |
| p3_influence_hierarchy::05 | L65 | RULE: 12B Description = 0% voice influence | DEFINITION | KEEP | YES | REINFORCEMENT | Applies §3.1 rule to the 12B case; refs §3.1 — compliant |
| p3_influence_hierarchy::06 | L67–80 | EXAMPLE: WRONG vs CORRECT card text | EXAMPLE | KEEP | YES | REINFORCEMENT | Unique worked demo of R06 (card-level, not classifier-level) |
| p3_influence_hierarchy::07 | L82 | Пояснение to the example | DUPLICATE | DELETE | YES | DUPLICATE | Re-explains the §3.1::04 Тест classification a third time (R06); the example is self-demonstrating |
| p3_influence_hierarchy::08 | L84 | transition to Examples rules | NAVIGATION | KEEP | YES | — | |

### p3_examples_rules (§3.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p3_examples_rules::01 | L95 | intro | DEFINITION | KEEP | YES | — | |
| p3_examples_rules::02 | L97 | RULE: Voice Contamination | DEFINITION | KEEP | YES | — | Canonical |
| p3_examples_rules::03 | L99–105 | table: recommended example count | DEFINITION | KEEP | YES | — | |
| p3_examples_rules::04 | L107–112 | list: example structure (4 bullets) | DEFINITION | KEEP | YES | REINFORCEMENT | «Стиль: совпадать с Greeting» applies Format Lock (R09) |
| p3_examples_rules::05 | L114 | RULE: `<START>` mandatory | DEFINITION | KEEP | YES | — | Canonical |
| p3_examples_rules::06 | L116–123 | TEMPLATE: example format | DEFINITION | KEEP | YES | — | |

### p3_examples_quality (§3.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p3_examples_quality::01 | L134 | intro: 6 criteria, A/B/C grades | DEFINITION | KEEP | YES | — | Canonical Quality Grade; disambiguation vs CoT Tier / GHOST Tier |
| p3_examples_quality::02 | L136–138 | class list A/B/C | DEFINITION | KEEP | YES | — | |
| p3_examples_quality::03 | L140–147 | table: 6 criteria × 3 grades | DEFINITION | KEEP | YES | — | |
| p3_examples_quality::04 | L149 | RECOMMENDATION: card-wide vs example criteria | DEFINITION | KEEP | YES | — | |
| p3_examples_quality::05 | L151–155 | До/После: A vs C | EXAMPLE | KEEP | YES | — | Unique contrast demo |

### p3_greeting_ref (§3.5)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p3_greeting_ref::01 | L165 | Greeting definition + forward ref | NAVIGATION | KEEP | YES | — | Compliant reference stub. Ref target reads `§7B.X` — vague placeholder form (R18, ed-8); actual target §7B.2 |

### p3_voice_leak (§3.6)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p3_voice_leak::01 | L176 | Voice Leak definition | DEFINITION | KEEP | YES | — | Canonical |
| p3_voice_leak::02 | L178–183 | table: Voice Leak vs Narrator Bleed | DEFINITION | KEEP | YES | — | |
| p3_voice_leak::03 | L185–189 | table: Narrator Bleed vs Voice example | EXAMPLE | KEEP | YES | — | |
| p3_voice_leak::04 | L191–195 | До/После: Выщербленный | EXAMPLE | KEEP | YES | — | Unique worked example |
| p3_voice_leak::05 | L197–202 | причины Voice Leak (list) | VALIDATION | KEEP | YES | REINFORCEMENT | §9.5 carries the lookup form of the same diagnostics — changed function |
| p3_voice_leak::06 | L204 | Cross-ref AP-11 | NAVIGATION | KEEP | YES | — | |

### p3_joker_case (§3.7)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p3_joker_case::01 | L214 | intro: archetypes resisting description | DEFINITION | KEEP | YES | — | |
| p3_joker_case::02 | L216 | RULE: 3–4 markers or pure demonstration | DEFINITION | KEEP | YES | — | Canonical |
| p3_joker_case::03 | L218 | practical test (3 attempts) | VALIDATION | KEEP | YES | — | |
| p3_joker_case::04 | L220 | Cross-ref §3.8 | NAVIGATION | KEEP | YES | — | |

### p3_multi_char (§3.8)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p3_multi_char::01 | L230 | мульти-персонажность definition | DEFINITION | KEEP | YES | — | |
| p3_multi_char::02 | L232 | сквозные персонажи (Выщербленный, Йоуёма) | METADATA | KEEP | YES | — | Reader-useful scope note (Йоуёма local to §3.8) |
| p3_multi_char::03 | L234–236 | маркеры персонажа definition | DEFINITION | KEEP | YES | — | |
| p3_multi_char::04 | L238–241 | table: markers per character | DEFINITION | KEEP | YES | — | |
| p3_multi_char::05 | L243–245 | Voice Bleed definition | DEFINITION | KEEP | YES | REINFORCEMENT | §3.8 = teaching site; Part 8 AP-11 = catalog site — different function, both needed |
| p3_multi_char::06 | L247–257 | EXAMPLE (ошибка) | EXAMPLE | KEEP | YES | — | |
| p3_multi_char::07 | L259–271 | EXAMPLE (правильно) | EXAMPLE | KEEP | YES | — | |
| p3_multi_char::08 | L273–289 | full multi-character scene | EXAMPLE | KEEP | YES | — | Unique scene demo |

**Part 3 verdict:** near-clean. The consolidation candidates are all inside the R06 family
(linguistic-vs-physical voice: §3.1 canonical Тест → §3.2 example → §3.2 Пояснение re-explainer)
plus two cross-part duplicates (R03 Pattern Matcher re-teach, R05 methodology copy). The section
sequence 3.1 → 3.8 already forms the concept-family hierarchy ed-4 wants to make explicit
(isolation → hierarchy → rules → quality → leak → extreme → multi-char); ed-4 is a framing pass,
not a merge.

---

## 4. Part 7A — System Prompt & Assembly (`docs/canon/part_07a.md`, 13 sections)

### p7a_system_prompt (§7A.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_system_prompt::01 | L19 | SP definition + contents | DEFINITION | KEEP | YES | — | Canonical |
| p7a_system_prompt::02 | L21 | term disambiguation: SP vs Keirsey S·P | DEFINITION | KEEP | YES | RELATED BUT DISTINCT | Glossary carries the S·P disambiguation too — reference-layer repetition, fine |
| p7a_system_prompt::03 | L23–28 | обязательные элементы SP (list) | DEFINITION | KEEP | YES | — | |
| p7a_system_prompt::04 | L30 | RULE: identity name-language | DEFINITION | KEEP | YES | — | Canonical (NAV invariant «Identity name-language») |
| p7a_system_prompt::05 | L31 | RULE: identity name-language — **second verbatim copy** | DUPLICATE | DELETE | YES | DUPLICATE | **KI#71 (new):** canon L30 and L31 are byte-identical; master carries the paragraph once. Pure intra-canon duplication defect |
| p7a_system_prompt::06 | L33 | RULE: Anchors placement | DUPLICATE | CROSS-REFERENCE | YES | DUPLICATE | Full copy of p1_core_rules::05 (R01); compress to 1 sentence + ref (§7A.9/§7A.11 already use the short+ref form) |
| p7a_system_prompt::07 | L35 | Примечание: `[ANCHORS]` drift | METADATA | DELETE | YES | DUPLICATE | **Stale + repo-meta.** Claim «в parts/ используется [ANCHORS] plain text — известный drift (KI#58)» is stale: KI#58 CLOSED iter 95; the only `[ANCHORS]` occurrence in `parts/part_07a.html` is this note itself, actual content is `<anchors>` XML. Reader-facing repo internals → ed-6 (R17) |
| p7a_system_prompt::08 | L37–55 | канонический шаблон SP (code) | DEFINITION | KEEP | YES | — | Canonical template; uses `{{CORE_DIRECTIVES 1-7 — …}}` shorthand ✓ (DEC-08) |
| p7a_system_prompt::09 | L57 | позитивная формулировка explanation | APPLICATION | KEEP | YES | — | Why positive form beats prohibition |
| p7a_system_prompt::10 | L59 | RULE: SP structure order | DEFINITION | KEEP | YES | REINFORCEMENT | Compact restatement of the template order — navigational, compliant |

### p7a_core_directives (§7A.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_core_directives::01 | L70 | CORE DIRECTIVES definition | DEFINITION | KEEP | YES | — | Canonical (single full definition per ed-2) |
| p7a_core_directives::02 | L72 | `[VS: E08]` marker | METADATA | KEEP | YES | — | Viz replacement |
| p7a_core_directives::03 | L74–80 | RULE: SP language (3-tier) | DEFINITION | KEEP | YES | — | Canonical SP-language rule (NAV invariant); §7A.7 footnote + §9.10 summary are compliant refs |
| p7a_core_directives::04 | L82 | Convention: CORE_DIRECTIVES shorthand | DEFINITION | COMPRESS | YES | — | Substance is the DEC-08 shorthand convention (keep); «(D4, iter 93)» repo-meta → ed-6 strip (R17) |
| p7a_core_directives::05 | L84–96 | full 7-directive code block | DEFINITION | KEEP | YES | — | **THE canonical list.** Verbatim re-print in §7A.13 (R02) is the compression side |
| p7a_core_directives::06 | L100–102 | directive 1 Show Never Tell (desc) | DEFINITION | KEEP | YES | — | Whitelisted recurrence (§20) |
| p7a_core_directives::07 | L104–110 | directive 2 Embodiment First (desc + Cross-ref) | DEFINITION | KEEP | YES | — | Directive-vs-Protocol distinction preserved |
| p7a_core_directives::08 | L112–118 | directive 3 Spatial & Anatomical Lock (desc + table) | DEFINITION | KEEP | YES | — | |
| p7a_core_directives::09 | L120–122 | directive 4 Environmental Reactivity | DEFINITION | KEEP | YES | — | |
| p7a_core_directives::10 | L124–126 | directive 5 Influence Boundary | DEFINITION | KEEP | YES | — | |
| p7a_core_directives::11 | L128–139 | directive 6 Consequence Driven (+ Track code) | DEFINITION | KEEP | YES | — | Model-gating note + Appendix B ref |
| p7a_core_directives::12 | L141–150 | directive 7 Pre-Generation Filter (+ checklist) | DEFINITION | KEEP | YES | — | |
| p7a_core_directives::13 | L152 | RECOMMENDATION: bidirectional sync | NAVIGATION | KEEP | YES | — | IMP-48 statement at directive level |

### p7a_tone_frame (§7A.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_tone_frame::01 | L163 | Tone Frame definition (dual function) | DEFINITION | KEEP | YES | — | Canonical |
| p7a_tone_frame::02 | L165–167 | format template | DEFINITION | KEEP | YES | — | |
| p7a_tone_frame::03 | L169–176 | table: 4 setting examples | EXAMPLE | KEEP | YES | REINFORCEMENT | «grounded, understated…» string reused §7A.13 step 3 (R10) — apply-layer reuse |
| p7a_tone_frame::04 | L178 | RECOMMENDATION: dual function explained | DEFINITION | KEEP | YES | — | |

### p7a_format_lock (§7A.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_format_lock::01 | L189 | Format Lock definition | DEFINITION | KEEP | YES | REINFORCEMENT | Pattern Matcher applied to markup (R03) with ref — compliant |
| p7a_format_lock::02 | L191–197 | table: 3 markup systems | DEFINITION | KEEP | YES | — | |
| p7a_format_lock::03 | L199 | RULE: почему нельзя смешивать | DEFINITION | KEEP | YES | REINFORCEMENT | R03 application |
| p7a_format_lock::04 | L201 | RULE: conflict resolution (example wins) | DEFINITION | KEEP | YES | — | Canonical |
| p7a_format_lock::05 | L203–210 | Format Lock инструкция (code) | DEFINITION | KEEP | YES | REINFORCEMENT | Template appears also in §7A.1 SP template tail + §7A.13 step 3 (R09) — template/apply/assemble functions |

### p7a_authors_note (§7A.5)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_authors_note::01 | L221 | AN definition | DEFINITION | KEEP | YES | — | Canonical |
| p7a_authors_note::02 | L223 | `[VS: E16]` marker | METADATA | KEEP | YES | — | Declared replacement: mechanics + params |
| p7a_authors_note::03 | L225 | note on E07 reference | NAVIGATION | KEEP | YES | — | Prevents false expectation of an E07 embed in Part 7A |
| p7a_authors_note::04 | L227–233 | параметры AN (table) | DEFINITION | KEEP | YES | — | Canon source shadowed by E16 master-side (method rule 4) |
| p7a_authors_note::05 | L235–243 | Template A (code) | DEFINITION | KEEP | YES | — | |
| p7a_authors_note::06 | L245–253 | EXAMPLE: Elena AN (Template A) | EXAMPLE | KEEP | YES | — | |
| p7a_authors_note::07 | L255–264 | Template B (code) | DEFINITION | KEEP | YES | — | Ref target `§4.2` valid; unbalanced paren in source (cosmetic, ed-7 class) |
| p7a_authors_note::08 | L266–276 | EXAMPLE: Vyshcherblenny AN (Template B) | EXAMPLE | KEEP | YES | — | |
| p7a_authors_note::09 | L278–287 | Пояснение секций AN (table) | DEFINITION | KEEP | YES | — | Canon source shadowed by E16 |

### p7a_sampling_params (§7A.6)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_sampling_params::01 | L298 | intro | DEFINITION | KEEP | YES | — | |
| p7a_sampling_params::02 | L300 | `[VS: E17]` marker | METADATA | KEEP | YES | — | Declared replacement: params description + comparative table |
| p7a_sampling_params::03 | L302–311 | base params table | DEFINITION | KEEP | YES | CONTRADICTORY | **Canonical** sampling table. Contradicts §7A.7 rows (KI#72, new): 32B+ Temperature 0.7–1.0 vs 0.85–1.1; 32B+ RepPen 1.05–1.10 vs 1.0–1.05 |
| p7a_sampling_params::04 | L313 | RULE: PP = 0.0 always | DEFINITION | KEEP | YES | — | Canonical |
| p7a_sampling_params::05 | L315 | RULE: Ollama/LM Studio hardcode | DEFINITION | KEEP | YES | — | Canonical; KoboldCPP/TabbyAPI/vLLM list |
| p7a_sampling_params::06 | L317–324 | model-specific recommendations table | DEFINITION | KEEP | YES | RELATED BUT DISTINCT | Per-model rows consistent with ::03; §7A.7 conflicts (KI#72) |

### p7a_model_checklist (§7A.7)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_model_checklist::01 | L334 | intro: «дополняет §7A.6 и §7A.11» | NAVIGATION | KEEP | YES | — | |
| p7a_model_checklist::02 | L336–345 | summary table (params + capabilities) | APPLICATION | COMPRESS | YES | DUPLICATE | Param rows (Temperature/PP/RepPen) duplicate §7A.6 **with contradictions** (KI#72 — R12); capability rows (Voice Placement/XML/CoT/SP-language/Anti-godmoding) are unique summary. Recommendation: drop param rows, defer to §7A.6, keep capability rows |
| p7a_model_checklist::03 | L347 | footnote ¹: SP language | NAVIGATION | KEEP | YES | — | Compliant short + ref |
| p7a_model_checklist::04 | L349 | RECOMMENDATION: AN and voice per model | DEFINITION | KEEP | YES | — | Unique |

### p7a_ooc_protection (§7A.8)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_ooc_protection::01 | L360 | OOC Protection definition | DEFINITION | KEEP | YES | — | Canonical |
| p7a_ooc_protection::02 | L362–367 | OOC template (code) | DEFINITION | KEEP | YES | — | Partial re-print in §7A.13 step 3 (R08) — apply-layer |
| p7a_ooc_protection::03 | L369 | когда использовать | APPLICATION | KEEP | YES | — | |
| p7a_ooc_protection::04 | L371–373 | Immersion Boundary intro | DEFINITION | KEEP | YES | — | |
| p7a_ooc_protection::05 | L375–379 | Immersion Boundary template | DEFINITION | KEEP | YES | — | |
| p7a_ooc_protection::06 | L381–383 | table: without vs with Immersion Boundary | EXAMPLE | KEEP | YES | — | |

### p7a_xml_tags (§7A.9)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_xml_tags::01 | L394 | intro: XML structuring + Anchors placement | DEFINITION | KEEP | YES | REINFORCEMENT | R01 short + refs form — compliant |
| p7a_xml_tags::02 | L396–423 | XML structure (code) | DEFINITION | KEEP | YES | — | Canonical |
| p7a_xml_tags::03 | L425–480 | полный пример XML Description (Выщербленный) | EXAMPLE | KEEP | YES | — | Unique worked example; OCEAN note carries bible cross-ref |
| p7a_xml_tags::04 | L482 | примечание: SP and Examples separate | NAVIGATION | KEEP | YES | — | |

### p7a_api_blocks (§7A.10)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_api_blocks::01 | L492–496 | intro + placement list | DEFINITION | KEEP | YES | — | |
| p7a_api_blocks::02 | L498–514 | Claude `<claude_info>` template | DEFINITION | KEEP | YES | — | |
| p7a_api_blocks::03 | L517–523 | GPT `[SYSTEM NOTE]` template | DEFINITION | KEEP | YES | — | |

### p7a_4k_fallback (§7A.11)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_4k_fallback::01 | L535 | 4K-Fallback definition | DEFINITION | KEEP | YES | — | Canonical |
| p7a_4k_fallback::02 | L537–545 | токен-лимиты 4K (table) | DEFINITION | KEEP | YES | RELATED BUT DISTINCT | R11: full vs 4K configs — different framing than §7A.12 min/std/max, feeds ed-5 |
| p7a_4k_fallback::03 | L547–553 | минимальный SP 4K (code) | DEFINITION | KEEP | YES | — | |
| p7a_4k_fallback::04 | L555–565 | минимальный Description 4K (code) | DEFINITION | KEEP | YES | — | |
| p7a_4k_fallback::05 | L567 | RULE: Anchors in 4K fallback | DUPLICATE | CROSS-REFERENCE | YES | DUPLICATE | R01 short + refs; fold to pointer (4th occurrence of the family) |
| p7a_4k_fallback::06 | L569 | RECOMMENDATION: 4K vs standard profile | APPLICATION | KEEP | YES | — | |

### p7a_token_budget (§7A.12)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_token_budget::01 | L580 | intro: budget pipeline | DEFINITION | KEEP | YES | — | |
| p7a_token_budget::02 | L584 | intro to limits (3 levels, color semantics) | DEFINITION | KEEP | YES | — | Describes master-side table coloring |
| p7a_token_budget::03 | L586–593 | budget table (min/std/max) | DEFINITION | KEEP | YES | — | **Canonical** budget table (R11) |
| p7a_token_budget::04 | L594 | RULE: превышение бюджета | DEFINITION | KEEP | YES | — | |
| p7a_token_budget::05 | L596 | RULE: Script Tax | DEFINITION | KEEP | YES | — | Canonical (NAV invariant) |
| p7a_token_budget::06 | L597–599 | Personality Sub-Budget intro | DEFINITION | KEEP | YES | — | |
| p7a_token_budget::07 | L601–607 | sub-budget table | DEFINITION | KEEP | YES | — | |
| p7a_token_budget::08 | L608 | RULE: sub-budgets fit Description budget | DEFINITION | KEEP | YES | — | |
| p7a_token_budget::09 | L610 | RECOMMENDATION: 4K/8K/16K profiles | APPLICATION | KEEP | YES | — | |
| p7a_token_budget::10 | L612–614 | калькулятор description | METADATA | KEEP | YES | — | Describes the reader-visible interactive calculator |
| p7a_token_budget::11 | L616 | «При миграции (iter 11)» note | METADATA | DELETE | YES | DUPLICATE | **Stale + repo-meta** (dupes-1 §7A.12 half, confirmed by backlog audit): describes a plain-copy pre-block that no longer exists in master; noscript now says only «включите JavaScript». Nothing reader-useful remains |

### p7a_assembly_pipeline (§7A.13)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_assembly_pipeline::01 | L626 | intro: единственный полный конвейер | DEFINITION | KEEP | YES | — | Canonical walkthrough role |
| p7a_assembly_pipeline::02 | L628 | `[VS: E02]` marker | METADATA | KEEP | YES | — | Declared replacement: pipeline description |
| p7a_assembly_pipeline::03 | L630–638 | Шаг 1: Identity Block (+ Elena result) | APPLICATION | KEEP | YES | — | |
| p7a_assembly_pipeline::04 | L640–649 | Шаг 2: Anti-godmoding (+ Elena result) | APPLICATION | KEEP | YES | REINFORCEMENT | R07 apply-layer reuse of the canonical lines |
| p7a_assembly_pipeline::05 | L651–667 | Шаг 3: CORE DIRECTIVES — full verbatim re-print of the 7-directive block | APPLICATION | CROSS-REFERENCE | YES | DUPLICATE | **R02:** byte-identical to p7a_core_directives::05. DEC-08 shorthand exists exactly for this: replace the code block with `{{CORE_DIRECTIVES — канонический шаблон → §7A.2}}`. Primary ed-2 target |
| p7a_assembly_pipeline::06 | L669–681 | Шаг 3 дополнительно: Tone Frame + OOC + Format Lock Елены | APPLICATION | KEEP | YES | REINFORCEMENT | R08/R09/R10 re-prints inside the assembled-SP view — walkthrough function (ed-2 audit decides whether these also become shorthand) |
| p7a_assembly_pipeline::07 | L683–698 | Шаг 4: SPINE (+ Elena result + consistency check) | APPLICATION | KEEP | YES | — | SPINE causality = whitelisted recurrence |
| p7a_assembly_pipeline::08 | L700–715 | Шаг 5: CoT (+ Elena Tier 2 result) | APPLICATION | KEEP | YES | — | |
| p7a_assembly_pipeline::09 | L717–732 | Шаг 6: Budget check (+ Elena budget table) | VALIDATION | KEEP | YES | RELATED BUT DISTINCT | R11 apply-layer; Elena numbers consistent with §7A.12 ✓ |
| p7a_assembly_pipeline::10 | L734–741 | дополнительные шаги (optional extensions) | APPLICATION | KEEP | YES | — | |
| p7a_assembly_pipeline::11 | L743–755 | recap checklist (`<details>`, self-labeled «дублирует правила») | VALIDATION | KEEP | YES | REINFORCEMENT | Research §20/§33: checklists preserved; changed function (pre-test verification) |
| p7a_assembly_pipeline::12 | L757 | pointer to Part 10 | NAVIGATION | KEEP | YES | — | |
| p7a_assembly_pipeline::13 | L759 | Synthesis: SP = container | DEFINITION | KEEP | YES | — | |

**Part 7A verdict:** the assembly half is healthy (walkthrough = apply layer, uses refs correctly
except the §7A.13 CORE DIRECTIVES verbatim block — the one clear R02 compression target). The
defect load concentrates in: R01 family (Anchors-placement rule printed 4×), 3 stale/repo-meta
notes (L35, L82 partial, L616), KI#71 (verbatim duplicate line), KI#72 (sampling contradictions
§7A.6 ↔ §7A.7).

---

## 5. Part 9 — Diagnostics (`docs/canon/part_09.md`, 11 sections)

### p9_quality_scale (§9.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_quality_scale::01 | L19 | `[VS: E14]` marker | METADATA | KEEP | YES | — | Declared replacement: quality levels + 5 quick checks |
| p9_quality_scale::02 | L21–23 | шкала intro + E14 note | NAVIGATION | KEEP | YES | — | Declares table = error patterns (complements E14 criteria, non-duplicate) |
| p9_quality_scale::03 | L25–30 | table: error patterns per zone | DEFINITION | KEEP | YES | — | |
| p9_quality_scale::04 | L32 | RECOMMENDATION: target zone | APPLICATION | KEEP | YES | — | |
| p9_quality_scale::05 | L34 | Cross-ref §9.11 | NAVIGATION | KEEP | YES | — | |

### p9_one_change_rule (§9.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_one_change_rule::01 | L44 | RULE: one change at a time | DEFINITION | KEEP | YES | — | Canonical; unique to Part 9 |
| p9_one_change_rule::02 | L46 | Применение scope | APPLICATION | KEEP | YES | — | |

### p9_basic_checklist (§9.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_basic_checklist::01 | L57 | Сценарий router para | NAVIGATION | KEEP | YES | UNCLEAR | R14: one of 7 diagnostic-mode routers repeating the same destination set; aggregate compression candidate pending ed-policy |
| p9_basic_checklist::02 | L59 | «начните с этого чек-листа» | NAVIGATION | COMPRESS | YES | — | Overlaps ::01 — merge |
| p9_basic_checklist::03 | L61–67 | checklist table (per block) | VALIDATION | KEEP | YES | REINFORCEMENT | Canonical per-block diagnosis; check-form of Parts 2/3/7A rules = changed function (R07 occurrences inside are checks, not re-teach) |
| p9_basic_checklist::04 | L69 | Cross-ref §9.11 | NAVIGATION | KEEP | YES | — | Repeats ::01 pointer — fold into router (R14) |

### p9_additional_problems (§9.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_additional_problems::01 | L79 | intro: top-3 live in Part 1 | NAVIGATION | KEEP | YES | — | |
| p9_additional_problems::02 | L81–84 | table: problems #4/#5 | DEFINITION | MOVE | YES | DUPLICATE | Both rows are symptom→fix pairs already carried by §9.5 rows («Повторяющиеся фразы», «Персонаж теряет характер») — fold into the symptom table, keep the #4/#5 numbering as row labels |
| p9_additional_problems::03 | L86 | Cross-ref | NAVIGATION | KEEP | YES | — | |

### p9_symptom_table (§9.5)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_symptom_table::01 | L97 | Сценарий router para | NAVIGATION | KEEP | YES | UNCLEAR | R14 |
| p9_symptom_table::02 | L99 | «Каждый симптом связан…» | NAVIGATION | COMPRESS | YES | — | Merge into ::01 |
| p9_symptom_table::03 | L101–113 | symptom table (11 rows) | VALIDATION | KEEP | YES | — | **Canonical** flat lookup; absorbs §9.4 #4/#5 if MOVE applied. Table refs use `§3.X`/`§4.X`/`§2.X`/`§6.X` placeholder forms — R18 vague refs, ed-8 fix, mechanical |

### p9_decision_tree (§9.6)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_decision_tree::01 | L124 | Сценарий router para | NAVIGATION | KEEP | YES | UNCLEAR | R14 |
| p9_decision_tree::02 | L126 | format explanation | NAVIGATION | COMPRESS | YES | — | Merge into ::01 |
| p9_decision_tree::03 | L128–137 | decision tree table | VALIDATION | KEEP | YES | SPECIAL CASE | Canonical branching form — different diagnostic mode than §9.5 (§24: same family, different condition) |
| p9_decision_tree::04 | L139 | Cross-ref E13 | NAVIGATION | KEEP | YES | — | |

### p9_test_scenarios (§9.7)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_test_scenarios::01 | L150 | Сценарий router para | NAVIGATION | KEEP | YES | UNCLEAR | R14 |
| p9_test_scenarios::02 | L152 | «Протестируйте карточку…» | NAVIGATION | COMPRESS | YES | — | Merge into ::01 |
| p9_test_scenarios::03 | L154–161 | 6 scenarios table | VALIDATION | KEEP | YES | — | Canonical |
| p9_test_scenarios::04 | L163 | Cross-ref (12B set, metrics, WW example) | NAVIGATION | KEEP | YES | — | |

### p9_element_scenario_map (§9.8)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_element_scenario_map::01 | L173–181 | element → scenario table | VALIDATION | KEEP | YES | — | Unique map; no router para (only Part 9 section without one) |

### p9_test_requirements (§9.9)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_test_requirements::01 | L190 | Сценарий router para (4 refs) | NAVIGATION | KEEP | YES | UNCLEAR | R14 — heaviest router |
| p9_test_requirements::02 | L192 | «Минимум 6 тестовых сценариев» | DEFINITION | COMPRESS | YES | DUPLICATE | Restates §9.7's requirement + points back to it; 1 sentence + ref already exists in ::01 |
| p9_test_requirements::03 | L194–203 | 6 success metrics table | VALIDATION | KEEP | YES | — | Canonical |

### p9_12b_issues (§9.10)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_12b_issues::01 | L213 | Сценарий router para | NAVIGATION | KEEP | YES | UNCLEAR | R14 |
| p9_12b_issues::02 | L215 | 12B intro + SP-language summary | APPLICATION | KEEP | YES | REINFORCEMENT | Summary + refs to §7A.6/§7A.2 — compliant |
| p9_12b_issues::03 | L217–225 | 12B symptoms table | VALIDATION | KEEP | YES | SPECIAL CASE | §24: same family as §9.5 rows, materially different condition (12B architecture) |
| p9_12b_issues::04 | L227 | Cross-ref (4K-Fallback, CoT Tiers) | NAVIGATION | KEEP | YES | — | |

### p9_pre_deploy (§9.11)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_pre_deploy::01 | L238 | Сценарий router para | NAVIGATION | KEEP | YES | UNCLEAR | R14 |
| p9_pre_deploy::02 | L240–242 | Быстрая проверка intro | NAVIGATION | KEEP | YES | — | |
| p9_pre_deploy::03 | L244–255 | `<details>`: «дубликат §9.3 в формате ожидаемый результат» | DUPLICATE | DELETE | YES | DUPLICATE | **Self-admitted duplicate (dupes-1 §9.11 half).** All 5 items preserved in §9.3 table + E14 «5 быстрых проверок» block. Repair required on deletion: 14-item list L271 «Пункты 1–5: см. Быструю проверку выше» must re-point to §9.3 |
| p9_pre_deploy::04 | L257–267 | EXAMPLE: Elena quick check | EXAMPLE | KEEP | YES | — | Unique worked example |
| p9_pre_deploy::05 | L269–283 | 14-item full check table | VALIDATION | KEEP | YES | — | Canonical pre-deploy list |
| p9_pre_deploy::06 | L285–297 | EXAMPLE: Vyshcherblenny structural check | EXAMPLE | KEEP | YES | — | «Description ≤ 800 токенов» vs §7A.12 max 700 — numeric tension, R11, feeds ed-5/ed-7 |
| p9_pre_deploy::07 | L299–313 | EXAMPLE: Vyshcherblenny full check | EXAMPLE | KEEP | YES | — | |
| p9_pre_deploy::08 | L314 | Итог | APPLICATION | KEEP | YES | — | |
| p9_pre_deploy::09 | L316–318 | Bridge to Part 10 | NAVIGATION | KEEP | YES | — | |

**Part 9 verdict:** strongly compliant with "validate, not re-teach" (research §10) — every table is
check/lookup/decision form with refs. The exceptions: §9.4 #4/#5 (problem-list form → fold into
§9.5), §9.11 `<details>` self-admitted duplicate (dupes-1), and the R14 router-para repetition
(7 sections open with near-identical routing paragraphs — aggregate compression candidate, needs
ed-policy Rule 3/§15 navigation-debt decision).

---

## 6. Repeat registry — second pass (research §24 classification)

> Cross-cutting repeated concepts found in Phase A. `Canonical` = the KEEP-side owner; the other
> occurrences carry the classification. Only `DUPLICATE` rows are automatic compression candidates.

| # | Concept | Canonical owner | Other occurrences (Phase A) | Classification | Feeds |
|---|---|---|---|---|---|
| R01 | Anchors-placement rule (separate block in Examples-zone) | `p1_core_rules::05` (§1.4) | §7A.1 L33 **full copy** · §7A.9 L394 short+ref · §7A.11 L567 short+ref · §7A.13 L732 footnote · §1.2 L57 clarification | DUPLICATE (§7A.1 full copy); rest = compliant refs | ed-2-style compress, canon-first |
| R02 | CORE DIRECTIVES full 7-line block | `p7a_core_directives::05` (§7A.2) | §7A.13 L657–665 **verbatim** · appendix_glossary full annotated copy (Phase B — backlog audit §2) · Part 10 uses shorthand ✓ | DUPLICATE (§7A.13; glossary pending Phase B verdict) | ed-2 |
| R03 | Pattern Matcher principle | `p1_core_rules::03` (§1.4) | §3.1 L39 **full re-teach** · §1.7 L128 application · §7A.4 L189/L199 applications+ref | DUPLICATE (§3.1); rest compliant | ed-1/ed-4 |
| R04 | Voice drift numbers (~40% vs ~10% at 20–30 msgs) | §3.1 table (granular) | §1.1 table row | DUPLICATE (same data, same persuasive purpose) | ed-1/ed-4 |
| R05 | Методология empirical-evidence disclaimer | `p1_value_proposition::03` (§1.1) | §3.1 L37 near-verbatim | DUPLICATE | ed-7 |
| R06 | Linguistic vs physical voice (Тест family) | `p3_voice_isolation::03–04` (§3.1) | §3.2 L67–80 example (unique demo) · §3.2 L82 Пояснение (re-explainer) | DUPLICATE (Пояснение only) | ed-4 |
| R07 | Anti-godmoding exact line «Never speak or act for {{user}}.» | §7A.1 template | §1.7 fix · §9.3 check · §9.11 examples · §7A.13 step 2 | REINFORCEMENT (each = changed function: teach/fix/check/example) | — |
| R08 | OOC Protection template | §7A.8 | §7A.13 step 3 partial re-print | REINFORCEMENT (assembled-SP view) — ed-2 audit item | ed-2 |
| R09 | Format Lock template | §7A.4 | §7A.1 template tail · §7A.13 step 3 | REINFORCEMENT (template/apply/assemble) — ed-2 audit item | ed-2 |
| R10 | Tone Frame example string | §7A.3 table | §7A.13 step 3 | REINFORCEMENT (apply-layer) | ed-2 |
| R11 | Token budget numbers | `p7a_token_budget::03` (§7A.12) | §7A.11 4K table (RELATED BUT DISTINCT ✓) · §1.8 Q2 (UNCLEAR framing: ≤200/≤400 vs 150/300/700) · §7A.13 step 6 ✓ · §9.11 «Description ≤ 800» vs max 700 (CONTRADICTORY) | MIXED — see per-row | ed-5 |
| R12 | Sampling parameter values | `p7a_sampling_params::03` (§7A.6) | §7A.7 rows — **CONTRADICTORY** (KI#72) · §9.3 Parameters row = compliance check ✓ · §9.10 refs ✓ | CONTRADICTORY (§7A.7) | KI#72 fix |
| R13 | SP language rule | §7A.2 | §7A.7 footnote ✓ · §9.10 summary ✓ | Compliant refs | — |
| R14 | Diagnostic-mode routers («Сценарий:» paras) | — (7 near-identical: §9.3/9.5/9.6/9.7/9.9/9.10/9.11) | — | UNCLEAR — navigation-debt (research §15); candidate: one canonical routing block | ed-8/ed-policy |
| R15 | §9.4 problems #4/#5 vs §9.5 rows | §9.5 | §9.4 | DUPLICATE | ed-3 execution |
| R16 | §9.11 quick-check `<details>` vs §9.3 | §9.3 | §9.11 (self-admitted) | DUPLICATE | dupes-1 |
| R17 | Repo-meta in reader prose | — | §1.2 L51 (Mermaid iter 14) · §1.2 L53 (build internals) · §7A.1 L35 (**stale** [ANCHORS] claim) · §7A.2 L82 (D4 iter 93) · §7A.12 L616 (**stale** migration note) · + Part 8 (out of Phase A, confirmed by backlog audit) | DUPLICATE class (ed-6) | ed-6 |
| R18 | Vague `§X.X` placeholder refs | — | §3.5 (`§7B.X`) · §9.3 (`§7B.X`, `§4.X`, `§3.X`) · §9.5 (`§3.X`, `§4.X`, `§2.X`, `§6.X`) · §7A.5 unbalanced paren | Navigation debt | ed-8 |
| R19 | Voice Leak causes | §3.6 | §9.5 voice rows | REINFORCEMENT (lookup form) | — |
| R20 | 12B symptoms | §9.10 | §9.5 general rows | SPECIAL CASE | — |

---

## 7. Summary statistics

> Counts verified by script against the `id` column (sandbox tooling, iter 120): 210 rows,
> 210 unique IDs, 0 duplicates.

| Metric | Part 1 | Part 3 | Part 7A | Part 9 | Total |
|---|---|---|---|---|---|
| Sections covered | 6 | 8 | 13 | 11 | 38 |
| Blocks (rows) | 29 | 45 | 94 | 42 | 210 |
| KEEP | 27 | 42 | 86 | 35 | 190 |
| COMPRESS | 2 | 1 | 2 | 5 | 10 |
| CROSS-REFERENCE | 0 | 1 | 3 | 0 | 4 |
| MOVE | 0 | 0 | 0 | 1 | 1 |
| DELETE | 0 | 1 | 3 | 1 | 5 |
| Blocks with `repeat = DUPLICATE` | 2 | 4 | 7 | 3 | 16 |
| Blocks with `repeat = CONTRADICTORY` | 0 | 0 | 1 (KI#72) | 0 | 1 (+ R11 §9.11 numeric tension noted in row) |

**Automatic compression candidates (decision ≠ KEEP **and** `repeat = DUPLICATE`, research §32):**

1. `p7a_system_prompt::05` — verbatim duplicate RULE line (KI#71) → DELETE
2. `p7a_system_prompt::06` — Anchors-placement full copy (R01) → CROSS-REFERENCE
3. `p7a_system_prompt::07` — stale `[ANCHORS]`/KI#58 repo-meta note (R17) → DELETE
4. `p3_voice_isolation::06` — methodology copy (R05) → CROSS-REFERENCE
5. `p3_voice_isolation::07` — Pattern Matcher re-teach (R03) → COMPRESS
6. `p3_influence_hierarchy::07` — Пояснение re-explainer (R06) → DELETE
7. `p7a_model_checklist::02` — param rows with contradictory values (R12, KI#72) → COMPRESS
8. `p7a_4k_fallback::05` — Anchors-placement 4th occurrence (R01) → CROSS-REFERENCE
9. `p7a_token_budget::11` — stale migration note (R17) → DELETE
10. `p7a_assembly_pipeline::05` — CORE DIRECTIVES verbatim (R02) → CROSS-REFERENCE
11. `p9_additional_problems::02` — #4/#5 symptom pairs (R15) → MOVE into §9.5
12. `p9_pre_deploy::03` — self-admitted quick-check dupe (R16) → DELETE (+ dangling-ref repair)
13. `p9_test_requirements::02` — «минимум 6 сценариев» restatement → COMPRESS

Plus one **pair-level** candidate: R04 drift-numbers — one of the two occurrences
(`p1_value_proposition::02` table row vs `p3_voice_isolation::05` table) becomes a cross-reference;
the owner picks the surviving side in ed-1/ed-4 (both marked KEEP at block level here).

Everything else flagged KEEP (190 of 210 blocks, 90%) — consistent with the research verdict
"semantic consolidation, not aggressive shortening" (§33). Functional load is preserved (load = YES)
for every recommended action; the deletions carry no unique information (research §22 category 1).

---

## 8. Re-scope notes for the executing iterations (ed-1…ed-8)

- **ed-1 (Part 1):** evidence narrows the scope — Part 1 does **not** block-level re-teach
  Parts 2–7A (refs already 1-sentence; §1.4/§1.7/§1.8 are canonical owners). Remaining ed-1 work:
  R04 drift-row decision, R17 Part-1 meta strips, R11 §1.8 framing. Expect a much smaller edit set
  than research §2/§4 assumed.
- **ed-2 (CORE DIRECTIVES):** primary target = §7A.13 step 3 verbatim block → DEC-08 shorthand.
  Secondary audit: R08/R09/R10 re-prints in the assembled-SP view. Glossary copy = Phase B.
- **ed-3 (Part 9):** already check-form; remaining = R15 fold + R16 delete + R14 router decision.
- **ed-4 (Voice):** hierarchy framing only; the R06 family (Тест/example/Пояснение) is the single
  in-part consolidation candidate. No merges (§24 protects RELATED BUT DISTINCT).
- **ed-5 (Token budget):** R11 — resolve §1.8 Q2 framing + §9.11 «≤800» vs §7A.12 max 700;
  §7A.11 4K table is legitimately distinct.
- **ed-6 (repo-meta):** R17 registry now itemizes 5 Phase-A locations (2 stale, 3 live repo-meta)
  + Part 8 (confirmed by backlog audit).
- **ed-7 (readability):** R05 methodology pair; §7A.5 unbalanced paren; rule-strength classes for
  numeric claims (incl. KI#72 values once reconciled).
- **ed-8 (cross-ref quality):** R18 vague-ref list + R14 router decision.

## 9. New defects recorded this iteration (fixes deferred — read-only scope)

- **KI#71** — canon `part_07a.md` L30–L31: identity-name RULE duplicated byte-identical (master
  carries it once). Fix = delete one canon line; fold into the next canon-touching iteration
  (dupes-1/ed-6 family). Recorded in `STATUS.md`.
- **KI#72** — sampling contradictions §7A.6 ↔ §7A.7: 32B+ Temperature 0.7–1.0 (and 0.7–0.9 in the
  model-specific table) vs 0.85–1.1; 32B+ RepPen 1.05–1.10 vs 1.0–1.05. Reconciliation needs a
  content decision (which range is canonical) — `PLAN.md` row `ki-72`. Recorded in `STATUS.md`.

Phase B (remaining parts + appendices) will extend this document per the same block-ID scheme.



