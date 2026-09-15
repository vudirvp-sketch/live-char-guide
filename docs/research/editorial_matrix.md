# Editorial Matrix — Live Character Guide

> **Phases A + B: full guide coverage (Parts 0–10 + 4 appendices).** Block-level editorial audit per
> `PLAN.md` row `ed-matrix` and `docs/research/editorial_research_en.md` §32 (matrix spec), §24
> (repeat classification), §22 (functional-load test), §20 (useful-repetition whitelist).
> **Phase A (iter 120, BASE `bd2134f0`):** Parts 1 / 3 / 7A / 9 — 38 sections, 210 rows.
> **Phase B (iter 126, BASE `03f48fa3`, worktree clean at start):** Part 0, 2, 4, 5, 6, 7B, 8, 10 +
> appendices (character_map / glossary / mbti / model_table) — 61 sections, 290 rows.
> Combined: **99 canon-declared section IDs (96 rendering + Part 0 ×2 + Appendix D ×1 conceptual-only,
> per the `content_map.md` counting convention), 500 block rows.**
> **Read-only analysis (both phases):** no content files (`docs/canon/`, `src/master/`) were edited.
> **Phase decision:** A = the four highest-conflict zones per research §26 (`backlog_audit_iter118.md`
> §2/§4); B = the remainder. Non-rendering sections audited canon-side only.
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
| `presentation` | `open / collapsible / reference-relocate / delete-candidate / canonical-link` | F2 presentation disposition (v2 architecture spec §4.1, ratified DEC-24): seeded at the Part's build-slice evidence step and executed in the same slice. `open` = stays in the page flow; `collapsible` = wraps in `<details class="interactive">`; `reference-relocate` = moves to the Reference layer (glossary/appendix); `delete-candidate` = redundant presentation (Editorial Policy 5-point check); `canonical-link` = 1-sentence + link to the canonical owner. Column exists only on the Parts already sliced (Parts 1–2: iters 147–148); other Parts get it at their own slice time |

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

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p1_value_proposition::01 | L18 | intro: classic vs systematic approach | DEFINITION | KEEP | YES | — | open | Orientation thesis; unique |
| p1_value_proposition::02 | L20–25 | table: value-prop evidence (4 rows) | APPLICATION | KEEP | YES | DUPLICATE | open | Row «Дрейф голоса … ~40% → ~10%» duplicates §3.1 drift table (R04). Other 3 rows unique. Owner decision in ed-1/ed-4: keep one occurrence of the drift row |
| p1_value_proposition::03 | L27 | Методология disclaimer | METADATA | KEEP | YES | DUPLICATE | open | Canonical owner of the empirical-evidence caveat (research §19 pattern). Near-verbatim copy in §3.1 (R05) is the compression side. Collapsible considered and rejected at the iter-147 slice (registered Collapsible criteria: short content <100 words; retrieval: qualifies the adjacent evidence table) |
| p1_value_proposition::04 | L29 | closing: «поведенческий движок» | DEFINITION | KEEP | YES | — | open | One-line thesis |

### p1_card_overview (§1.2)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p1_card_overview::01 | L39 | card definition: 5 blocks, behavioral engine | DEFINITION | KEEP | YES | — | open | Canonical anatomy (KI#68 fixed here, iter 118). E01 stack + block table agree on 5 |
| p1_card_overview::02 | L41 | сквозной пример (Елена) | NAVIGATION | KEEP | YES | — | open | Running-example announcement |
| p1_card_overview::03 | L43 | RULE: examples and style contract | DEFINITION | KEEP | YES | — | open | Unique style-scoping rule |

### p1_structure_overview (§1.2 subsection)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p1_structure_overview::01 | L51 | concept flow + Mermaid history | NAVIGATION | COMPRESS | YES | — | open | Function = reading order (keep); carries repo history «Mermaid удалён в iter 14» → ed-6 strip (R17) — executed (history mention absent from the current canon) |
| p1_structure_overview::02 | L53 | Cross-ref: AUTO_TOC | NAVIGATION | COMPRESS | YES | — | open | Reader job = "TOC exists"; build internals (`AUTO_TOC_PLACEHOLDER`, build-скрипт) → ed-6 strip (R17) — executed canon-side (internals live in master only, by design) |
| p1_structure_overview::03 | L55 | порядок чтения (①–⑤) | NAVIGATION | KEEP | YES | — | open | Compliant orientation |
| p1_structure_overview::04 | L57 | E01 note: Anchors visually nested, structurally separate | APPLICATION | KEEP | YES | RELATED BUT DISTINCT | open | Feeds R01 (Anchors-placement); clarifies viz, not re-teach; → migration_map_v2 TB-3 ([VS: E01] canon marker added iter 135 — budget semantics declared: §7A.12 SHARED_REFERENCE) |
| p1_structure_overview::05 | L59–65 | table: 5 blocks influence/budget share | DEFINITION | KEEP | YES | — | open | Structural properties not visible in E01 — declared complement, not dupe |
| p1_structure_overview::06 | L67 | RULE 1-sentence: voice rule → §1.4 | NAVIGATION | KEEP | YES | — | open | Compliant pointer form |
| p1_structure_overview::07 | L69–71 | Token Budget + assembly refs | NAVIGATION | KEEP | YES | — | open | 1-sentence refs to §7A.12/§7A.13 — ed-5 already verified compliant |

### p1_core_rules (§1.4)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p1_core_rules::01 | L82 | intro: principles mandatory | DEFINITION | KEEP | YES | — | open | |
| p1_core_rules::02 | L84–88 | key terms list (Anchor/Voice/SPINE/OCEAN) | DEFINITION | KEEP | YES | — | open | «используются далее без повторного объяснения» — compliant introduce-once pattern (ed-7 anchor) |
| p1_core_rules::03 | L90 | RULE: LLM = Pattern Matcher | DEFINITION | KEEP | YES | REINFORCEMENT | open | **Canonical owner** of the principle. Re-teach in §3.1 (R03) is the compression side; §1.7/§7A.4 usages are compliant applications |
| p1_core_rules::04 | L92–94 | the 3 key principles (numbered) | DEFINITION | KEEP | YES | — | open | Canonical mental model; NAV §5 mirrors it |
| p1_core_rules::05 | L96 | RULE: Anchors placement (separate block in Examples-zone) | DEFINITION | KEEP | YES | REINFORCEMENT | open | **Canonical owner** of R01. Full copy in §7A.1 is the compression side; §7A.9/§7A.11 short+ref forms compliant |
| p1_core_rules::06 | L98–106 | callout EXAMPLE: OCEAN right vs wrong | EXAMPLE | KEEP | YES | — | open | Unique demonstration (§21 protection). F4 tier: worked (labelled ПРИМЕР) — compliant |
| p1_core_rules::07 | L110 | Ссылка: Уолтер — realistic modern character | NAVIGATION | KEEP | YES | — | open | NEW row (iter 147): F5 Reference branch — canonicalized from the master-only P3-4 line (canon catches up to the deployed master rendering; master byte-unchanged); → migration_map_v2 §5.8 P1-4 |

### p1_top3_problems (§1.7)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p1_top3_problems::01 | L117 | intro + ref §9.4 | NAVIGATION | KEEP | YES | — | open | |
| p1_top3_problems::02 | L119–123 | Ошибка 1: godmoding (симптом/причина/исправление) | APPLICATION | KEEP | YES | REINFORCEMENT | open | Anti-godmoding string reuse = changed function (fix usage), R07 |
| p1_top3_problems::03 | L125–129 | Ошибка 2: voice mismatch | APPLICATION | KEEP | YES | REINFORCEMENT | open | Applies §3.1 + refs it — compliant application, not re-teach |
| p1_top3_problems::04 | L131–135 | Ошибка 3: ideal character / missing Price | APPLICATION | KEEP | YES | REINFORCEMENT | open | Price is whitelisted useful repetition (§20) |
| p1_top3_problems::05 | L137 | Synthesis | DEFINITION | KEEP | YES | — | open | |
| p1_top3_problems::06 | L139 | Cross-ref: ready cards | NAVIGATION | KEEP | YES | — | open | Master mirror restored iter 147 (F5 Reference branch; 4 Part-10 anchors + Appendix D mention); → migration_map_v2 §5.8 P1-5 |

### p1_prebuild_checklist (§1.8)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p1_prebuild_checklist::01 | L150 | intro: 6 questions | NAVIGATION | KEEP | YES | — | open | F3 reframe executed iter 147: «**Профиль сборки** — входной инструмент режима сборки (Build)» + build-path refs (§7A.13 / §7A.12) — the original sentence pair preserved inside the reframe; → migration_map_v2 §5.8 P1-1 |
| p1_prebuild_checklist::02 | L152–159 | table: 6 pre-build questions | APPLICATION | KEEP | YES | UNCLEAR | open | Q2 budget numbers («4K — Description ≤200 … 8K — ≤400») vs §7A.12 table (150/300/700 min/std/max) — different framings of one budget; R11, feeds ed-5 (owner-gated defer — unchanged by the iter-147 slice) |
| p1_prebuild_checklist::03 | L161 | RECOMMENDATION: first config | APPLICATION | KEEP | YES | — | open | |

**Part 1 verdict:** structurally compliant with the orientation role already — token-budget/pipeline
subsections are 1-sentence refs (verified iter 118, re-confirmed here). The block-level findings are:
2 repo-meta strips (R17), 1 duplicate evidence row (R04), 1 framing tension (R11). The aggressive
"Part 1 re-teaches Parts 2–7A" expectation from research §2 is **not confirmed at block level**;
§1.4/§1.7/§1.8 are canonical owners or compliant applications. This refines ed-1's scope.

**v2 build slice executed iter 147** (DEC-24 — first Part of the v2 build phase; Registry C map
[`migration_map_v2.md`](./migration_map_v2.md) §5.8): the `presentation` column seeded on all Part 1
rows (29 existing re-verified + 1 new `p1_core_rules::07` = 30) — **all `open`**: Part 1 is the
Learn-mode entry Part (full-narrative default visibility per the spec §3) and already compressed
(ed-1 executed), and no block meets the registered Collapsible criteria (`docs/components.md` #5 —
e.g. the §1.1 Методология disclaimer ~70 words: considered, rejected); F3 reframe of §1.8 =
Build-mode entry instrument («Профиль сборки», P1-1); F5 Reference branches regularized (§1.4 canon
P1-4, §1.7 master P1-5); master §1.8 drift closing line disposed (P1-3). Line refs on pre-existing
rows = audit-time anchors (iter 120), not re-based — iter-142/145 slice precedent.

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
| p3_influence_hierarchy::01 | L50 | intro: influence differs by model size | DEFINITION | KEEP | YES | — | — → migration_map_v2 VC-6 (verified unchanged — voice-cluster iter 142) |
| p3_influence_hierarchy::02 | L52 | `[VS: E07]` marker | METADATA | KEEP | YES | — | Viz replacement (DEC-03); canon = source for E07 — weak marker upgraded to the full format (SHARED_REFERENCE + TEXTUAL_CANONICAL + audit name, DEC-21) — → migration_map_v2 VC-1 (voice-cluster executed iter 142) |
| p3_influence_hierarchy::03 | L54 | `[INTERACTIVE WIDGET: persona-voice-hierarchy]` marker | METADATA | KEEP | YES | — | Canon-embedded data exception (NAV §4); complements E07 — notes disposition added (2 quantitative claims canonicalized in §3.2; 4 restatements stay DEC-09) — → migration_map_v2 VC-4 (voice-cluster executed iter 142) |
| p3_influence_hierarchy::04 | L56–63 | table: 6 sources × 3 tiers | DEFINITION | KEEP | YES | — | Canonical data (also feeds the widget) — row-1 label russified «Недавний чат» (V-e); 18 values unchanged — → migration_map_v2 VC-3 (voice-cluster executed iter 142) |
| p3_influence_hierarchy::05 | L65 | RULE: 12B Description = 0% voice influence | DEFINITION | KEEP | YES | REINFORCEMENT | Applies §3.1 rule to the 12B case; refs §3.1 — compliant — → migration_map_v2 VC-5 (audit anchor, unchanged — voice-cluster iter 142) |
| p3_influence_hierarchy::06 | L67–80 | EXAMPLE: WRONG vs CORRECT card text | EXAMPLE | KEEP | YES | REINFORCEMENT | Unique worked demo of R06 (card-level, not classifier-level) — → migration_map_v2 VC-6 (verified unchanged — voice-cluster iter 142) |
| p3_influence_hierarchy::07 | L82 | Пояснение to the example | DUPLICATE | DELETE | YES | DUPLICATE | Re-explains the §3.1::04 Тест classification a third time (R06); the example is self-demonstrating — **✅ executed iter 130 (ed-4 family)** |
| p3_influence_hierarchy::08 | L84 | transition to Examples rules | NAVIGATION | KEEP | YES | — | — → migration_map_v2 VC-6 (verified unchanged — voice-cluster iter 142) |
| p3_influence_hierarchy::09 | L65 (seeded iter 142) | prose block «Хранилище ≠ Влияние»: storage-vs-influence distinction + SP-primacy misconception + drift implication + 2 widget quantitative claims (~10–20 сообщений; ~5 реплик) | DEFINITION | KEEP | YES | — | Canonical textual home of the E07 inset payload + widget claims (DEC-21 V-b/V-c; DEC-20/E13 precedent); E07 inset = visual presentation; parity-locked by `scripts/audit_voice_parity.py` — → migration_map_v2 VC-2 (voice-cluster executed iter 142) |

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
| p7a_system_prompt::08 | L37–55 | канонический шаблон SP (code) | DEFINITION | KEEP | YES | — | Canonical template; uses `{{CORE_DIRECTIVES 1-7 — …}}` shorthand ✓ (DEC-08); → migration_map_v2 D-3 (verified iter 134) |
| p7a_system_prompt::09 | L57 | позитивная формулировка explanation | APPLICATION | KEEP | YES | — | Why positive form beats prohibition |
| p7a_system_prompt::10 | L59 | RULE: SP structure order | DEFINITION | KEEP | YES | REINFORCEMENT | Compact restatement of the template order — navigational, compliant |

### p7a_core_directives (§7A.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_core_directives::01 | L70 | CORE DIRECTIVES definition | DEFINITION | KEEP | YES | — | Canonical (single full definition per ed-2) |
| p7a_core_directives::02 | L72 | `[VS: E08]` marker | METADATA | KEEP | YES | — | Viz replacement |
| p7a_core_directives::03 | L74–80 | RULE: SP language (3-tier) | DEFINITION | KEEP | YES | — | Canonical SP-language rule (NAV invariant); §7A.7 footnote + §9.10 summary are compliant refs |
| p7a_core_directives::04 | L82 | Convention: CORE_DIRECTIVES shorthand | DEFINITION | COMPRESS | YES | — | Substance is the DEC-08 shorthand convention (keep); «(D4, iter 93)» repo-meta → ed-6 strip (R17) |
| p7a_core_directives::05 | L84–96 | full 7-directive code block | DEFINITION | KEEP | YES | — | **THE canonical list.** Verbatim re-print in §7A.13 (R02) is the compression side; → migration_map_v2 D-1 (canonical owner, unchanged) |
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
| p7a_sampling_params::02 | L300 | `[VS: E17]` marker | METADATA | KEEP | YES | — | Declared replacement: params description + comparative table. **iter 145:** upgraded to the full `_README.md` §3.3 format (SHARED_REFERENCE + declared 12B–32B omission + audit name) → migration_map_v2 SP-1 |
| p7a_sampling_params::03 | L302–311 | base params table | DEFINITION | KEEP | YES | CONTRADICTORY | **Canonical** sampling table. Contradicts §7A.7 rows (KI#72, new): 32B+ Temperature 0.7–1.0 vs 0.85–1.1; 32B+ RepPen 1.05–1.10 vs 1.0–1.05. **iter 145:** KI#72 resolved — DEC-22 S-a (§7A.6 = the single value owner, table byte-unchanged, audit-locked); the §7A.7 side dropped → migration_map_v2 SP-2 |
| p7a_sampling_params::04 | L313 | RULE: PP = 0.0 always | DEFINITION | KEEP | YES | — | Canonical |
| p7a_sampling_params::05 | L315 | RULE: Ollama/LM Studio hardcode | DEFINITION | KEEP | YES | — | Canonical; KoboldCPP/TabbyAPI/vLLM list |
| p7a_sampling_params::06 | L317–324 | model-specific recommendations table | DEFINITION | KEEP | YES | RELATED BUT DISTINCT | Per-model rows consistent with ::03; §7A.7 conflicts (KI#72) |

### p7a_model_checklist (§7A.7)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7a_model_checklist::01 | L334 | intro: «дополняет §7A.6 и §7A.11» | NAVIGATION | KEEP | YES | — | **iter 145:** intro + new defer line carry the §7A.6 param defer (DEC-22 S-b) → migration_map_v2 SP-3 |
| p7a_model_checklist::02 | L336–345 | summary table (params + capabilities) | APPLICATION | COMPRESS | YES | DUPLICATE | Param rows (Temperature/PP/RepPen) duplicate §7A.6 **with contradictions** (KI#72 — R12); capability rows (Voice Placement/XML/CoT/SP-language/Anti-godmoding) are unique summary. Recommendation: drop param rows, defer to §7A.6, keep capability rows. **iter 145:** EXECUTED (DEC-22 S-b — param rows dropped, header «Возможность», defer line added) → migration_map_v2 SP-3 |
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
| p7a_token_budget::03 | L586–593 | budget table (min/std/max) | DEFINITION | KEEP | YES | — | **Canonical** budget table (R11); → migration_map_v2 TB-1 (canonical owner, unchanged — mig-4 verified iter 135) |
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
| p7a_assembly_pipeline::05 | L651–667 | Шаг 3: CORE DIRECTIVES — full verbatim re-print of the 7-directive block | APPLICATION | CROSS-REFERENCE | YES | DUPLICATE | **R02:** byte-identical to p7a_core_directives::05. DEC-08 shorthand exists exactly for this: replace the code block with `{{CORE_DIRECTIVES — канонический шаблон → §7A.2}}`. Primary ed-2 target — **EXECUTED iter 134 (mig-2); → migration_map_v2 D-2** |
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
| p9_one_change_rule::02 | L46 | Применение scope | APPLICATION | KEEP | YES | — | Tree back-link added (§9.2↔§9.6 IMP-48 pair, master mirror restored) — → migration_map_v2 DT-6 (mig-3 executed iter 139) |

### p9_basic_checklist (§9.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_basic_checklist::01 | L57 | Сценарий router para | NAVIGATION | KEEP | YES | UNCLEAR | R14: one of 7 diagnostic-mode routers repeating the same destination set; aggregate compression candidate pending ed-policy |
| p9_basic_checklist::02 | L59 | «начните с этого чек-листа» | NAVIGATION | COMPRESS | YES | — | Overlaps ::01 — merge |
| p9_basic_checklist::03 | L61–67 | checklist table (per block) | VALIDATION | KEEP | YES | REINFORCEMENT | Canonical per-block diagnosis; check-form of Parts 2/3/7A rules = changed function (R07 occurrences inside are checks, not re-teach). **iter 145:** Parameters-row RepPen hint 12B-qualified (DEC-22 S-d) → migration_map_v2 SP-5 |
| p9_basic_checklist::04 | L69 | Cross-ref §9.11 | NAVIGATION | KEEP | YES | — | Repeats ::01 pointer — fold into router (R14) |

### p9_additional_problems (§9.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p9_additional_problems::01 | L79 | intro: top-3 live in Part 1 | NAVIGATION | KEEP | YES | — | |
| p9_additional_problems::02 | L81–84 | table: problems #4/#5 | DEFINITION | MOVE | YES | DUPLICATE | Both rows are symptom→fix pairs already carried by §9.5 rows («Повторяющиеся фразы», «Персонаж теряет характер») — fold into the symptom table, keep the #4/#5 numbering as row labels. **iter 145:** #4 RepPen fix re-framed to the model-range defer (DEC-22 S-d); the fold candidate stays open → migration_map_v2 SP-6 |
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
| p9_decision_tree::03 | L128–137 | decision tree table | VALIDATION | KEEP | YES | SPECIAL CASE | Canonical branching form — different diagnostic mode than §9.5 (§24: same family, different condition) — → migration_map_v2 DT-1 (canonical owner, unchanged — mig-3 verified iter 139) |
| p9_decision_tree::04 | L139 | Cross-ref E13 | NAVIGATION | KEEP | YES | — | Weak «Ссылка» upgraded to the full `[VS: E13]` marker (TEXTUAL_CANONICAL declared; claim now true) — → migration_map_v2 DT-3 (mig-3 executed iter 139) |
| p9_decision_tree::05 | L143–150 (seeded iter 139) | E13 mapping sub-table «Три базовых симптома: полный маппинг» (6 rows: 3 symptoms, 6 checks, 9 diagnoses, AP/E refs) | VALIDATION | KEEP | YES | — | Canonical textual home of the E13 payload (DEC-20; values parity-locked by `scripts/audit_diagnostics_parity.py`) — → migration_map_v2 DT-2 (mig-3 executed iter 139) |

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
| p9_12b_issues::03 | L217–225 | 12B symptoms table | VALIDATION | KEEP | YES | SPECIAL CASE | §24: same family as §9.5 rows, materially different condition (12B architecture). **iter 145:** «Повторы фраз» row qualified (12B-диапазон — §7A.6, DEC-22 S-d) → migration_map_v2 SP-7 |
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

## 6. Part 0 — Before You Start (`docs/canon/part_00.md`, 2 sections — **non-rendering**)

> Non-rendering by design: Part 0 has no master HTML artifact (`migration_status: NEW iter 38` in
> front-matter; verified — zero `p0_*` sections in `src/master/`). Audited canon-side only; editorial
> findings here are canon hygiene, not reader-facing.

### p0_how_to_read (§0.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p0_how_to_read::01 | L23 | linear flow + 2 declared Bridges (6→7A, 9→10) | NAVIGATION | KEEP | YES | — | Matches the two-bridge invariant («Переход» labels, §0.1 list) |
| p0_how_to_read::02 | L25–39 | «Что такое Part» + module map table (12 rows) | NAVIGATION | KEEP | YES | — | Canon-side orientation; unique (no TOC equivalent in canon) |
| p0_how_to_read::03 | L41 | VS-EMBED notation (`[VS: E0X — …]`, `viz > dry text`) | METADATA | KEEP | YES | — | Notation documentation |
| p0_how_to_read::04 | L43 | `[ref: …]` notation | METADATA | KEEP | YES | — | Notation documentation |
| p0_how_to_read::05 | L45–56 | callout labels list (10 labels) | METADATA | COMPRESS | YES | DUPLICATE | **R17:** carries history «английские метки отменены iter 123, DEC-16» inside a current-state list — strip the history clause, keep the label inventory |
| p0_how_to_read::06 | L58 | English placement note | METADATA | COMPRESS | YES | DUPLICATE | **R17:** repo pointers «(DEC-16, `docs/canon/_README.md` §3.9)»; substance (English only in executable containers/identifiers/proper names) stays |

### p0_tldr_quick_start (§0.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p0_tldr_quick_start::01 | L68 | minimal card = 4 blocks | DEFINITION | KEEP | YES | — | |
| p0_tldr_quick_start::02 | L70–77 | 6-step assembly list | APPLICATION | KEEP | YES | REINFORCEMENT | R07 (step-1 anti-godmoding line, apply-layer) + R16-family (step-6 five-checks — quick-start recall of the §9.3+E14 canonical pair; 1-line form) |
| p0_tldr_quick_start::03 | L79 | 3 principles short-form + «подробно в Part 1» | NAVIGATION | KEEP | YES | — | Compliant introduce-once pointer |
| p0_tldr_quick_start::04 | L81 | «С чего начать» (Elena first, not Omnis) | APPLICATION | KEEP | YES | — | Unique guidance |
| p0_tldr_quick_start::05 | L83 | Ссылка (§1.8, §9.11, §10.1) | NAVIGATION | KEEP | YES | — | |

**Part 0 verdict:** low editorial load. Two history strips (R17 — non-rendering, canon hygiene only);
everything else is compliant orientation/quick-start. The preamble line L13 «Создан: iter 38 — закрытие
KI#21 G1+G2» sits outside section blocks — recorded in the R17 registry (non-rendering preamble).

---

## 7. Part 2 — Behavioral Anchors (`docs/canon/part_02.md`, 6 sections)

### p2_basic_anchors (§2.1)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p2_basic_anchors::01 | L19 | Anchor definition (T→A→P) | DEFINITION | KEEP | YES | — | open | Canonical |
| p2_basic_anchors::02 | L21 | `[VS: E03]` marker | METADATA | KEEP | YES | — | open | Declared replacement (inf-pipeline + plain-copy dupe) |
| p2_basic_anchors::03 | L23 | E03 complement note | METADATA | KEEP | YES | — | open | Declared complement: table = concrete per-stage examples |
| p2_basic_anchors::04 | L25–29 | stage example table | APPLICATION | KEEP | YES | — | open | |

### p2_anchor_rules (§2.2)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p2_anchor_rules::01 | L40–46 | recommended anchor count table (3-5 / 5-7 / 7-12) | DEFINITION | KEEP | YES | — | open | Consistent with §0.2 step-5 «3–5» |
| p2_anchor_rules::02 | L48–53 | quality criteria (4 bullets) | DEFINITION | KEEP | YES | — | open | |
| p2_anchor_rules::03 | L55 | RULE: anchors/FLAW = concrete actions («Он неуверенный» ≠ якорь) → §4.4 | DEFINITION | KEEP | YES | REINFORCEMENT | open | R24 (formulation principle, anchor-side; §4.4 = FLAW-side; ref correct) |
| p2_anchor_rules::04 | L57 | RULE: delayed price invalid («потом будет жалеть») | DEFINITION | KEEP | YES | REINFORCEMENT | open | Price = whitelisted recurrence (§20) |
| p2_anchor_rules::05 | L59–63 | delayed vs immediate price table | EXAMPLE | KEEP | YES | — | open | |
| p2_anchor_rules::06 | L65–70 | Price types table (2 types; Walter ref §10.2 ✓) | DEFINITION | KEEP | YES | — | open | |
| p2_anchor_rules::07 | L72 | RULE: influence boundary → §7A.2 CD#5 | DEFINITION | KEEP | YES | REINFORCEMENT | open | Apply-layer of Influence Boundary, correct ref |

### p2_anchor_examples (§2.3)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p2_anchor_examples::01 | L82 | intro | NAVIGATION | KEEP | YES | — | open | |
| p2_anchor_examples::02 | L84–91 | ready anchors by trigger table (6 rows) | EXAMPLE | KEEP | YES | — | open | Canonical examples; Part 10 cards reuse rows as protected card content |

### p2_embodiment (§2.4)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p2_embodiment::01 | L102 | Embodiment definition | DEFINITION | KEEP | YES | — | open | Canonical |
| p2_embodiment::02 | L104 | `[VS: E04]` marker | METADATA | KEEP | YES | — | open | Declared replacement |
| p2_embodiment::03 | L106 | E04 complement note | METADATA | KEEP | YES | — | open | Declared complement |
| p2_embodiment::04 | L108–113 | 4-layer example categories table | APPLICATION | KEEP | YES | — | open | |
| p2_embodiment::05 | L115 | sensory layer note (texture THROUGH action) | DEFINITION | KEEP | YES | — | open | |
| p2_embodiment::06 | L117–123 | embodiment examples table (3 rows) | EXAMPLE | KEEP | YES | — | open | |
| p2_embodiment::07 | L125 | RECOMMENDATION: every Example ≥1 physical reaction | APPLICATION | KEEP | YES | REINFORCEMENT | open | CD#2 apply-layer |

### p2_env_reactivity (§2.5)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p2_env_reactivity::01 | L136 | definition (environment through action) | DEFINITION | KEEP | YES | REINFORCEMENT | open | CD#4 teaching site (canonical; §7A.2 and glossary apply it) |
| p2_env_reactivity::02 | L138–141 | ПРИМЕР: декорация vs действие | EXAMPLE | KEEP | YES | — | open | |

### p2_sensory_anchors (§2.6)

| id | lines | block | tag | decision | load | repeat | presentation | notes |
|---|---|---|---|---|---|---|---|---|
| p2_sensory_anchors::01 | L152 | intro | NAVIGATION | KEEP | YES | — | open | |
| p2_sensory_anchors::02 | L154 | Sensory Anchor definition | DEFINITION | KEEP | YES | — | open | |
| p2_sensory_anchors::03 | L156–164 | 5 sensory channels table | DEFINITION | KEEP | YES | — | open | Canonical |
| p2_sensory_anchors::04 | L166–173 | Пример: Выщербленный (3 sensory anchors, code) | EXAMPLE | KEEP | YES | REINFORCEMENT | open | **R22:** re-used near-verbatim in the §10.4 production card (teach vs card = changed function, §21 protection) |

**Part 2 verdict:** canonical teaching part, near-clean. Zero compression candidates; repeats are
compliant applications (R24, R07-family, Price whitelist) or protected example re-use (R22).

**v2 build slice executed iter 148** (DEC-24 — second Part of the v2 build phase; Registry C map
[`migration_map_v2.md`](./migration_map_v2.md) §5.9): the `presentation` column seeded on all 26
Part 2 rows — **all `open`**: Part 2 is the Learn-mode core teaching Part (BASIC difficulty §2.1–§2.4,
INTERMEDIATE §2.5–§2.6; full-narrative default visibility per the spec §3), every block is core
teaching content under 100 words, and no block meets the registered Collapsible criteria
(`docs/components.md` #5: nothing supplementary, nothing >200 words, no technical-reference
material). F3: the §2.2 «Критерии качества якорей» list = teaching class (stays prose/list; zero
checkbox affordances — reserved for §9.3/§9.11); no decision-input checklist lives in Part 2 (the
Build-mode entry instrument = §1.8, executed iter 147). F4: §2.2 antipattern-card and §2.6
Выщербленный = worked tier (labelled ИЛЛЮСТРАЦИЯ, recognition function); §2.1/§2.3 tables =
inline tier — compliant. F5/F6: canon verified F5-approximate as-is (zero content edits); master
§2.3 closing transition — a master-only v7-era leftover (never canonized; «Следующая часть»
premature — §2.4–§2.6 follow) — disposed REMOVED_WITH_REASON (map §5.9 P2-4). Line refs on
pre-existing rows = audit-time anchors (iter 126), not re-based — iter-147 slice precedent.

---

## 8. Part 4 — SPINE (`docs/canon/part_04.md`, 11 sections)

### p4_spine_overview (§4.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_spine_overview::01 | L19 | SPINE definition | DEFINITION | KEEP | YES | — | Canonical |
| p4_spine_overview::02 | L21 | causal chain line `GHOST → LIE → FLAW → NEED → WANT` | DEFINITION | KEEP | YES | — | |
| p4_spine_overview::03 | L23–27 | chain bullets (5) | DEFINITION | KEEP | YES | REINFORCEMENT | SPINE causality = whitelisted recurrence (§20) |
| p4_spine_overview::04 | L29 | `[VS: E05]` marker | METADATA | KEEP | YES | — | Declared replacement |
| p4_spine_overview::05 | L31–41 | observable-units rule + ❌/✅ table | DEFINITION | KEEP | YES | REINFORCEMENT | R24-family (observable-unit formulation); canonical table |
| p4_spine_overview::06 | L43–45 | Упрощение для простых персонажей | DEFINITION | KEEP | YES | — | **Canonical owner of R21** (implicit GHOST/LIE + full-chain-must-be-linked; refs §4.9) |

### p4_ghost (§4.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_ghost::01 | L56 | GHOST definition | DEFINITION | KEEP | YES | — | Canonical |
| p4_ghost::02 | L58–62 | правила призрака (3 bullets) | DEFINITION | KEEP | YES | — | |
| p4_ghost::03 | L64 | запрещённые формулировки | DEFINITION | KEEP | YES | — | Canonical forbidden-words list |
| p4_ghost::04 | L66–69 | Anti-pattern / Solution | EXAMPLE | KEEP | YES | — | §21-protected demo |
| p4_ghost::05 | L71–76 | канонические примеры призрака table | EXAMPLE | KEEP | YES | — | |
| p4_ghost::06 | L78 | Примечание: один призрак на учебного персонажа | DEFINITION | KEEP | YES | — | Canonical rule; mirrored by the §7B.3 пример-2 «ВНЕ КАНОНА» warning ✓ |

### p4_lie (§4.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_lie::01 | L89 | LIE definition | DEFINITION | KEEP | YES | — | Canonical |
| p4_lie::02 | L91–95 | правила лжи | DEFINITION | KEEP | YES | — | |
| p4_lie::03 | L97–102 | канонические примеры лжи table | EXAMPLE | KEEP | YES | — | |

### p4_flaw (§4.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_flaw::01 | L113 | FLAW definition | DEFINITION | KEEP | YES | — | Canonical |
| p4_flaw::02 | L115–120 | правила дефекта | DEFINITION | KEEP | YES | — | |
| p4_flaw::03 | L122–134 | Anti-pattern/Solution tables (прилагательное vs поведение; плохой/хороший FLAW) | EXAMPLE | KEEP | YES | REINFORCEMENT | R24 (FLAW-side of the formulation principle) |
| p4_flaw::04 | L136–141 | канонические примеры дефекта table | EXAMPLE | KEEP | YES | — | |

### p4_need (§4.5)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_need::01 | L152 | NEED definition | DEFINITION | KEEP | YES | — | Canonical |
| p4_need::02 | L154–158 | правила потребности | DEFINITION | KEEP | YES | — | |
| p4_need::03 | L160–166 | канонические примеры (WANT↔NEED tension table) | EXAMPLE | KEEP | YES | — | |

### p4_want (§4.6)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_want::01 | L177 | WANT definition | DEFINITION | KEEP | YES | — | Canonical |
| p4_want::02 | L179–184 | правила желания | DEFINITION | KEEP | YES | — | |
| p4_want::03 | L186–193 | канонические примеры желания table | EXAMPLE | KEEP | YES | — | |

### p4_spine_full_chain (§4.7)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_spine_full_chain::01 | L204 | full-chain prose walkthrough | DEFINITION | KEEP | YES | REINFORCEMENT | Chain restated in prose — walkthrough function (whitelist: SPINE causality) |
| p4_spine_full_chain::02 | L206 | `[VS: E05]` second marker («повторное обращение») | METADATA | KEEP | YES | — | Declared repeat-appeal |
| p4_spine_full_chain::03 | L208–221 | канонический пример полной цепочки: Выщербленный (code) | EXAMPLE | KEEP | YES | — | Canonical worked example |
| p4_spine_full_chain::04 | L223 | Правило: implicit GHOST/LIE for simple characters | DUPLICATE | CROSS-REFERENCE | YES | DUPLICATE | **R21:** near-verbatim of §4.1::06 (~180 lines apart, same part); fold to pointer (§4.1 + чек-лист §4.9 — the check-questions variant lives in §4.9) |
| p4_spine_full_chain::05 | L225 | Ссылка (Part 10; §4.2–§4.6 поэлементно) | NAVIGATION | KEEP | YES | — | |

### p4_spine_mapping (§4.8)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_spine_mapping::01 | L236 | intro | NAVIGATION | KEEP | YES | — | |
| p4_spine_mapping::02 | L238–246 | SPINE → тип якоря table (5 rows) | DEFINITION | KEEP | YES | — | Canonical mapping |
| p4_spine_mapping::03 | L248 | Правило: каждый дефект ≥1 якорь FLAW-linked | DEFINITION | KEEP | YES | — | Canonical (mirrored by AP-8 ✓) |
| p4_spine_mapping::04 | L250–254 | определения типов якорей (3) | DEFINITION | KEEP | YES | — | |
| p4_spine_mapping::05 | L256–260 | Якоря FLAW-linked (детально) + пример intro | DEFINITION | KEEP | YES | — | |
| p4_spine_mapping::06 | L262–267 | алгоритм создания якорей FLAW-linked (4 шага) | APPLICATION | KEEP | YES | — | |
| p4_spine_mapping::07 | L269–277 | канонический пример: Елена (якоря FLAW-linked table) | EXAMPLE | KEEP | YES | — | |
| p4_spine_mapping::08 | L279–281 | Динамика SPINE (РЕКОМЕНДАЦИЯ, Consequence Driven) | APPLICATION | KEEP | YES | — | **KI#77-a:** canon ref `[part_07a.md §7A.6 — Consequence Driven]` points to Sampling Params; directive #6 = §7A.2. Master link already resolves to `#p7a_core_directives` (canon-side repair only) |

### p4_spine_check (§4.9)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_spine_check::01 | L292 | intro | NAVIGATION | KEEP | YES | — | |
| p4_spine_check::02 | L294–302 | чек-лист проверки SPINE (7 ☐) | VALIDATION | KEEP | YES | REINFORCEMENT | Check-form of the chain definitions — changed function (§24); mirrored apply-side in §10.4 ✓ |
| p4_spine_check::03 | L304 | применение чек-листа | NAVIGATION | KEEP | YES | — | |

### p4_spine_navigation (§4.10)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_spine_navigation::01 | L314 | next-steps pointer | NAVIGATION | KEEP | YES | — | |

### p4_ghost_layers (§4.11)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p4_ghost_layers::01 | L325 | intro (one GHOST vs layers) | DEFINITION | KEEP | YES | REINFORCEMENT | R21 expert-side dual of §4.1::06 — different decision (when to USE layers), keep both |
| p4_ghost_layers::02 | L327 | `[VS: E06]` marker | METADATA | KEEP | YES | — | E06 = two-column embed (fixed iter 124, KI#73/74) |
| p4_ghost_layers::03 | L329–335 | архитектура слоёв table (G1/G2/G3) | DEFINITION | KEEP | YES | — | Canonical; «G2 — Юность (13–25)» vs glossary «Отрочество» → R29 |
| p4_ghost_layers::04 | L337–343 | канонический пример: Выщербленный (3-tier table) | EXAMPLE | KEEP | YES | — | |
| p4_ghost_layers::05 | L345 | Ссылка | NAVIGATION | KEEP | YES | — | |
| p4_ghost_layers::06 | L347–352 | когда использовать слои | APPLICATION | KEEP | YES | — | |
| p4_ghost_layers::07 | L354–359 | когда достаточно одного | APPLICATION | KEEP | YES | REINFORCEMENT | R21 mirror (expert-side) |
| p4_ghost_layers::08 | L361 | РЕКОМЕНДАЦИЯ: 3 слоя не всем (Walter §10.2 ✓) | APPLICATION | KEEP | YES | — | |
| p4_ghost_layers::09 | L363 | Синтез | DEFINITION | KEEP | YES | — | Part-level synthesis (label convention ✓) |

**Part 4 verdict:** canonical SPINE part. One intra-part duplicate (R21 §4.7::04 — fold to pointer),
one wrong canon ref (KI#77-a §4.8::08). Everything else canonical or compliant.

---

## 9. Part 5 — Psychology (`docs/canon/part_05.md`, 7 sections)

### p5_ocean_basics (§5.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p5_ocean_basics::01 | L19 | OCEAN definition | DEFINITION | KEEP | YES | — | Canonical |
| p5_ocean_basics::02 | L21 | ПРАВИЛО: золотое правило профиля (1–2 extremes) | DEFINITION | KEEP | YES | REINFORCEMENT | **R25 canonical owner.** Internal ref «(см. §5.3 контекстные лимиты)» imprecise — the limits table is §5.1 L80–87; §5.3 carries only a partial restatement (reader-visible, feeds ed-8) |
| p5_ocean_basics::03 | L23 | ПРАВИЛО: `<ocean>` tag format (compact) | DEFINITION | KEEP | YES | — | Canonical (NAV invariant) |
| p5_ocean_basics::04 | L25 | осторожная зона definition | DEFINITION | KEEP | YES | — | Canonical (NAV invariant) |
| p5_ocean_basics::05 | L27–35 | 5 измерений table | DEFINITION | KEEP | YES | — | |
| p5_ocean_basics::06 | L37–39 | тип стресса intro | DEFINITION | KEEP | YES | — | |
| p5_ocean_basics::07 | L41–46 | stress-type table (4 rows) | DEFINITION | KEEP | YES | — | Canonical |
| p5_ocean_basics::08 | L48 | РЕКОМЕНДАЦИЯ: определяйте тип стресса | APPLICATION | KEEP | YES | — | |
| p5_ocean_basics::09 | L50–56 | Trigger → Stress Type → FLAW chain (intro + formula + linkage) | APPLICATION | KEEP | YES | — | Unique cross-part synthesis; refs §2.1/§4.4/§4.8 all correct |
| p5_ocean_basics::10 | L58–65 | канонический пример: Елена (anxious-reactive table) | EXAMPLE | KEEP | YES | — | |
| p5_ocean_basics::11 | L67 | ПРАВИЛО: каждый тип стресса ≥1 цепочку | DEFINITION | KEEP | YES | — | |
| p5_ocean_basics::12 | L69 | РЕКОМЕНДАЦИЯ: 2–3 категории триггеров | APPLICATION | KEEP | YES | — | |
| p5_ocean_basics::13 | L71–78 | категории триггеров по типу стресса table | DEFINITION | KEEP | YES | — | |
| p5_ocean_basics::14 | L80–87 | контекстные лимиты полюсов table (4K/8K/16K/32K) | DEFINITION | KEEP | YES | REINFORCEMENT | R25 2nd statement (values consistent with ::02 + §5.3) |
| p5_ocean_basics::15 | L89 | Ссылка: OCEAN при сборке → `[ref: part_07a.md §7A.X — Assembly Pipeline]` | NAVIGATION | KEEP | YES | — | R18: `§7A.X` vague (target §7A.13; master resolves to `#p7a_assembly_pipeline` — canon-side hygiene) |
| p5_ocean_basics::16 | L91–100 | decision tree: какой фреймворк (intro + table) | APPLICATION | KEEP | YES | — | Canonical framework chooser |
| p5_ocean_basics::17 | L102 | ПРАВИЛО: не собирайте SPINE снизу вверх | DEFINITION | KEEP | YES | — | Canonical |
| p5_ocean_basics::18 | L104 | РЕКОМЕНДАЦИЯ: 90% карточек = SPINE + OCEAN | APPLICATION | KEEP | YES | — | **R26 statement #1** (decision-tree site) |

### p5_elena_profile (§5.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p5_elena_profile::01 | L114 | intro | DEFINITION | KEEP | YES | — | |
| p5_elena_profile::02 | L116–122 | OCEAN-профиль Елены table | EXAMPLE | KEEP | YES | — | Protected worked example; A=38/N=68 cautious + O=72 extreme — consistent with character_map L30 ✓ |
| p5_elena_profile::03 | L124 | ПРАВИЛО: 1 экстремум + 2 осторожных зоны | DEFINITION | KEEP | YES | REINFORCEMENT | Apply of the golden rule — consistent ✓ |
| p5_elena_profile::04 | L126–134 | Enneagram 6w5 table (стресс 6→3, рост 6→9) | EXAMPLE | KEEP | YES | — | Directions consistent with `data/enneagram.json` (E10 fixed iter 124) ✓; parity-locked vs the generated layer (§5.2 ↔ type-6 directions) — → migration_map_v2 EN-8 (mig-5 executed iter 136) |
| p5_elena_profile::05 | L136 | Валидация | DEFINITION | KEEP | YES | — | |

### p5_ocean_warning (§5.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p5_ocean_warning::01 | L147 | ПРАВИЛО: OCEAN Overload | DEFINITION | KEEP | YES | — | Canonical |
| p5_ocean_warning::02 | L149–155 | сценарий 1 (Низкая A + Высокая E + Высокий N) | EXAMPLE | KEEP | YES | — | |
| p5_ocean_warning::03 | L157–161 | сценарий 2 (Высокая O + Низкая C + Высокий N) | EXAMPLE | KEEP | YES | — | |
| p5_ocean_warning::04 | L163–167 | сценарий 3 (Высокая E + Низкая A + Низкий N) | EXAMPLE | KEEP | YES | REINFORCEMENT | R25 3rd statement («максимум 3 для 8K+, 2 для 4K» — consistent) |
| p5_ocean_warning::05 | L169–171 | OCEAN×Enneagram: проверка через тип | DEFINITION | KEEP | YES | — | |

### p5_enneagram_basics (§5.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p5_enneagram_basics::01 | L182 | OCEAN «сколько» vs Enneagram «почему» | DEFINITION | KEEP | YES | — | Canonical framing |
| p5_enneagram_basics::02 | L184 | `[VS: E10]` marker | METADATA | KEEP | YES | — | Declared replacement (9-type enumeration); ownership declaration added (SHARED_REFERENCE: mini-card values = §5.4 via the generated data layer) — → migration_map_v2 EN-2 (mig-5 executed iter 136) |
| p5_enneagram_basics::03 | L186 | Enneagram definition | DEFINITION | KEEP | YES | — | |
| p5_enneagram_basics::04 | L188–200 | 9 типов Enneagram table (7 columns) | DEFINITION | KEEP | YES | — | Canonical; data-layer source for `data/enneagram.json` + E10 — duplication now DERIVED, not copied (generator, fence #8 compliant) — → migration_map_v2 EN-1 (mig-5 executed iter 136) |
| p5_enneagram_basics::05 | L202 | РЕКОМЕНДАЦИЯ: столбец LIE — справочный (ref §4.3 ✓) | APPLICATION | KEEP | YES | — | |

### p5_cross_instrument_map (§5.5)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p5_cross_instrument_map::01 | L213 | intro (валидация описана §5.1) | NAVIGATION | KEEP | YES | — | |
| p5_cross_instrument_map::02 | L215–217 | MBTI (справочная роль) | DEFINITION | KEEP | YES | REINFORCEMENT | **R26 statement #2** (cross-map site; ref appendix ✓) |
| p5_cross_instrument_map::03 | L219–228 | Enneagram → SPINE table (4 rows) | DEFINITION | KEEP | YES | — | Canonical |
| p5_cross_instrument_map::04 | L230–240 | OCEAN → SPINE validation table (5 rows) | DEFINITION | KEEP | YES | — | Canonical |
| p5_cross_instrument_map::05 | L242–244 | Enneagram ↔ MBTI (widgets M2+) | METADATA | KEEP | YES | — | Widget-behavior note |

### p5_enneagram_wings (§5.6)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p5_enneagram_wings::01 | L254 | Wing definition | DEFINITION | KEEP | YES | — | |
| p5_enneagram_wings::02 | L256–265 | алгоритм выбора крыла (критерии table + closing para) | APPLICATION | KEEP | YES | — | |
| p5_enneagram_wings::03 | L267–274 | примеры крыльев table | EXAMPLE | KEEP | YES | — | |

### p5_cross_matrix (§5.7)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p5_cross_matrix::01 | L284 | матрица OCEAN×Enneagram (widget description) | METADATA | KEEP | YES | — | Interactive matrix description |
| p5_cross_matrix::02 | L286 | Persona Synthesis definition | METADATA | KEEP | YES | — | Widget definition |

**Part 5 verdict:** canonical psychology part, near-clean. Findings: R25 pole-limits stated 3× (all
values consistent; one imprecise internal ref), R26 MBTI-role stated 4× (compliant layering), one
R18 vague ref. Zero compression candidates.

---

## 10. Part 6 — CoT (`docs/canon/part_06.md`, 6 sections)

### p6_cot_bridge (§6.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p6_cot_bridge::01 | L18 | CoT definition + Model ref (Appendix B) | DEFINITION | KEEP | YES | — | Canonical bridge definition |
| p6_cot_bridge::02 | L20–25 | «Что добавляет CoT» list (4 bullets) | NAVIGATION | KEEP | YES | — | Part-6 feature map |

### p6_cot_basics (§6.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p6_cot_basics::01 | L36 | CoT definition (техника) + Model ref | DEFINITION | KEEP | YES | REINFORCEMENT | Complementary framing to §6.1::01 (mechanism vs technique), not a copy |
| p6_cot_basics::02 | L38 | foundation para (Part 2 + Part 4 + CoT principles) | DEFINITION | KEEP | YES | — | |
| p6_cot_basics::03 | L40 | ПРАВИЛО: 2–3 CoT-якоря max (AP-10 ref ✓) | DEFINITION | KEEP | YES | — | Canonical |
| p6_cot_basics::04 | L42–47 | почему ограничение (4 bullets) | DEFINITION | KEEP | YES | — | |
| p6_cot_basics::05 | L49–53 | как выбрать 2–3 якоря (3 bullets) | APPLICATION | KEEP | YES | — | |
| p6_cot_basics::06 | L55–59 | зачем нужен CoT (3 bullets; Tier gating) | DEFINITION | KEEP | YES | — | Tier gating consistent with Appendix B ✓ |

### p6_cot_tiers (§6.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p6_cot_tiers::01 | L70 | intro: 4 Tiers; Tier 0 = Embodiment baseline | DEFINITION | KEEP | YES | — | Canonical (Tier 0 ≠ «модель не думает») |
| p6_cot_tiers::02 | L72 | E11 note (staircase; table complements) | METADATA | KEEP | YES | — | Declared complement |
| p6_cot_tiers::03 | L74–79 | tier table (Tier / модели / пример) | DEFINITION | KEEP | YES | — | Consistent with Appendix B CoT row ✓ |
| p6_cot_tiers::04 | L81 | Ссылка: E11 в preamble | NAVIGATION | KEEP | YES | — | |
| p6_cot_tiers::05 | L83 | Примечание (iter 29, KI#18-F partial fix) — rus/eng overlap rationale | METADATA | COMPRESS | YES | DUPLICATE | **R17:** canon-only note (verified — absent in master `part_06.html`); strip the iter/KI history label, keep the accessibility rationale («сохранены для accessibility — русские переводы примеров») as a plain current-state note |

### p6_cot_tier2 (§6.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p6_cot_tier2::01 | L93 | intro | DEFINITION | KEEP | YES | — | |
| p6_cot_tier2::02 | L95–105 | Синтаксис + ШАБЛОН (code) | DEFINITION | KEEP | YES | — | Canonical Tier 2 template |
| p6_cot_tier2::03 | L107–122 | Пример: Елена (ILLUSTRATION + code) | EXAMPLE | KEEP | YES | — | Canon carries the EN label `**ILLUSTRATION** — Demonstrates:`; master renders the RU label + EN list in an HTML comment (verified) — presentation variance only |

### p6_cot_tier3 (§6.5)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p6_cot_tier3::01 | L132 | intro | DEFINITION | KEEP | YES | — | |
| p6_cot_tier3::02 | L134–152 | Синтаксис + ШАБЛОН (code) | DEFINITION | KEEP | YES | — | Canonical Tier 3 template |
| p6_cot_tier3::03 | L154 | processus_analysium naming rationale | DEFINITION | KEEP | YES | — | Canonical (why this tag name) |
| p6_cot_tier3::04 | L156–173 | Пример: Выщербленный (code) | EXAMPLE | KEEP | YES | — | **R23 source** — re-used in §6.6 (table) + §10.4 (card, verbatim) |

### p6_cot_anchors (§6.6)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p6_cot_anchors::01 | L184 | CoT-якорь definition | DEFINITION | KEEP | YES | — | Canonical |
| p6_cot_anchors::02 | L186–190 | Структура (formula code) | DEFINITION | KEEP | YES | — | |
| p6_cot_anchors::03 | L192–199 | Примеры table (2 Выщербленный rows) | EXAMPLE | KEEP | YES | REINFORCEMENT | R23 compressed-table form of §6.5 example |
| p6_cot_anchors::04 | L201 | ПРАВИЛО: CoT Overload AP-10 (ref §8.11 ✓) | DEFINITION | KEEP | YES | REINFORCEMENT | Catalog-site of §6.2::03 (changed function, correct ref) |
| p6_cot_anchors::05 | L203 | Переход → Part 7A | NAVIGATION | KEEP | YES | — | 1 of the 2 declared bridges ✓ |

**Part 6 verdict:** clean. One canon-only repo-meta note (R17, §6.3::05); the CoT example family
(R23) = 3 compliant functions (teach / summary table / production card).

---

## 11. Part 7B — Greeting & Lorebook (`docs/canon/part_07b.md`, 5 sections)

### p7b_structured_inject (§7B.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7b_structured_inject::01 | L19 | Structured Inject definition | DEFINITION | KEEP | YES | — | Canonical |
| p7b_structured_inject::02 | L21–25 | правила Structured Inject (3 bullets) | DEFINITION | KEEP | YES | — | |
| p7b_structured_inject::03 | L27–37 | пример Structured Inject (code) | EXAMPLE | KEEP | YES | — | |

### p7b_greeting (§7B.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7b_greeting::01 | L48 | Greeting definition | DEFINITION | KEEP | YES | — | Canonical |
| p7b_greeting::02 | L50–57 | Алгоритм Greeting (4 шага table) | DEFINITION | KEEP | YES | — | Canonical |
| p7b_greeting::03 | L59 | Сенсорный якорь definition | DEFINITION | KEEP | YES | — | |
| p7b_greeting::04 | L61–72 | Разобранный пример: Greeting Елены (учебный) + Примечание учебный-vs-canonical | EXAMPLE | KEEP | YES | REINFORCEMENT | **R28:** dual presentation with §10.1 — both sides carry explicit disambiguation Примечания (IMP-48-compliant pair) |
| p7b_greeting::05 | L74–79 | правила Greeting (50–100 токенов) | DEFINITION | KEEP | YES | — | Consistent with §0.2 step-4 + glossary entry ✓ |

### p7b_lorebook_basics (§7B.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7b_lorebook_basics::01 | L90 | Lorebook definition | DEFINITION | KEEP | YES | — | Canonical |
| p7b_lorebook_basics::02 | L92–99 | структура записи table | DEFINITION | KEEP | YES | — | Canonical |
| p7b_lorebook_basics::03 | L101–107 | рекомендованные параметры table | DEFINITION | KEEP | YES | — | Canonical |
| p7b_lorebook_basics::04 | L109 | РЕКОМЕНДАЦИЯ: сенсорные активации + контекстные факты | APPLICATION | KEEP | YES | — | |
| p7b_lorebook_basics::05 | L111–115 | правила Lorebook (3 bullets) | DEFINITION | KEEP | YES | — | |
| p7b_lorebook_basics::06 | L117–128 | Примеры записей для Елены: пример 1 (GHOST предательство) | EXAMPLE | KEEP | YES | — | |
| p7b_lorebook_basics::07 | L130–141 | пример 2: secondary GHOST + «⚠️ ВНЕ КАНОНА» warning | EXAMPLE | KEEP | YES | — | Unique pedagogical value (out-of-canon discipline; back-refs §4.2 + bible ✓) |
| p7b_lorebook_basics::08 | L143–152 | пример 3: Контакт Елены | EXAMPLE | KEEP | YES | — | |
| p7b_lorebook_basics::09 | L154–163 | пример 4: Город Елены | EXAMPLE | KEEP | YES | — | |
| p7b_lorebook_basics::10 | L165–175 | Совместимость EVENT: по фронтендам table | APPLICATION | KEEP | YES | — | Unique (frontend support matrix) |
| p7b_lorebook_basics::11 | L177 | Ссылка → §7B.4 | NAVIGATION | KEEP | YES | — | |

### p7b_lorebook_mechanics (§7B.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7b_lorebook_mechanics::01 | L188 | intro: запись = поведенческий триггер; 2–3 механики на сессию | DEFINITION | KEEP | YES | — | Canonical |
| p7b_lorebook_mechanics::02 | L190 | РЕКОМЕНДАЦИЯ (область применения, ref §7B.3 ✓) | NAVIGATION | KEEP | YES | — | |
| p7b_lorebook_mechanics::03 | L192 | ПРАВИЛО: никогда не вставляйте действия/мысли `{{user}}` в content | DEFINITION | KEEP | YES | REINFORCEMENT | R07-family (anti-godmoding principle, lorebook-site) |
| p7b_lorebook_mechanics::04 | L194–200 | таблица механик (3 механики) | DEFINITION | KEEP | YES | — | Canonical |
| p7b_lorebook_mechanics::05 | L202–211 | практика — быстрая таблица (6 задач) | APPLICATION | KEEP | YES | — | |
| p7b_lorebook_mechanics::06 | L213–232 | пример: структурированная инъекция в content (+ XML альтернатива) | EXAMPLE | KEEP | YES | — | |
| p7b_lorebook_mechanics::07 | L234 | Ссылка → §7B.5 | NAVIGATION | KEEP | YES | — | |
| p7b_lorebook_mechanics::08 | L236 | РЕКОМЕНДАЦИЯ: механики для GHOST-триггеров | APPLICATION | KEEP | YES | — | |

### p7b_lorebook_advanced (§7B.5)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p7b_lorebook_advanced::01 | L247 | intro («Продвинуто. Опционально.») | NAVIGATION | KEEP | YES | — | |
| p7b_lorebook_advanced::02 | L249–255 | таблица продвинутых механик (3) | DEFINITION | KEEP | YES | — | Canonical |
| p7b_lorebook_advanced::03 | L257 | ПРАВИЛО: эмуляция усталости — GHOST-якоря пересказаны в content | DEFINITION | KEEP | YES | — | Canonical warning; ref «§4.2 — GHOST» should target §4.8/§4.11 for anchor coverage (R18-minor) |
| p7b_lorebook_advanced::04 | L259 | ПРАВИЛО: ложная память — только для экспертов | DEFINITION | KEEP | YES | — | |
| p7b_lorebook_advanced::05 | L261–267 | контекстные бюджеты table (4K/8K/16K+) | DEFINITION | KEEP | YES | — | |
| p7b_lorebook_advanced::06 | L269–276 | чеклист интеграции Lorebook (6 ☐) | VALIDATION | KEEP | YES | — | «призрак Anchors» word-order slip → R29 cosmetic |

**Part 7B verdict:** clean; zero compression candidates. R28 (Elena Greeting dual presentation)
documented as a compliant IMP-48 pattern — the model pair for future dual-presentation decisions.

---

## 12. Part 8 — Anti-patterns (`docs/canon/part_08.md`, 16 sections)

> Design note: E12 (viz) = quick-scan catalog («Canonical location для сводного обзора», §8.1 marker);
> per-AP subsections = detail layer with before/after demos. Keep-by-design rationale documented
> iter 31 (KI#18-G, canon front-matter). The matrix treats the per-AP sections as catalog-application
> rows, not E12 duplicates.

### p8_antipatterns_overview (§8.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_antipatterns_overview::01 | L19 | Анти-паттерн definition | DEFINITION | KEEP | YES | — | Canonical |
| p8_antipatterns_overview::02 | L21 | `[VS: E12]` marker (canonical location) | METADATA | KEEP | YES | — | Declared replacement for the 15-AP enumeration |
| p8_antipatterns_overview::03 | L23 | ПРАВИЛО: проверяйте карточку по списку | DEFINITION | KEEP | YES | — | |
| p8_antipatterns_overview::04 | L25 | catalog pointer (E12 above; детали в §8.2–§8.16) | NAVIGATION | KEEP | YES | — | |
| p8_antipatterns_overview::05 | L27 | Ссылка: OCEAN Overload ранее AP-15 → Part 5 §5.3 | NAVIGATION | KEEP | YES | — | R17-lite: «в v9 restructure» version-history phrase (reader-visible, master L222); navigational substance stays — optional history strip |

### p8_ap1_token_bloat (§8.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap1_token_bloat::01 | L37–46 | AP-1 card (симптом/причина/решение/пример) | APPLICATION | KEEP | YES | REINFORCEMENT | **R11-family:** «Description > 800 токенов» symptom vs §7A.12 max 700 (same numeric tension as §9.11 «≤800»); ref `§3.X` vague + unbalanced paren (R18) |
| p8_ap1_token_bloat::02 | L48–52 | До/После: раздувание токенов — Елена | EXAMPLE | KEEP | YES | — | §21-protected demo |
| p8_ap1_token_bloat::03 | L54 | Ссылка: полная карточка Елены (`p10_elena`) | NAVIGATION | KEEP | YES | — | |

### p8_ap2_missing_price (§8.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap2_missing_price::01 | L64–66 | AP-2 card | APPLICATION | KEEP | YES | REINFORCEMENT | Anchor-format apply (ref `§2.X` vague R18 + unbalanced paren) |

### p8_ap3_voice_in_description (§8.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap3_voice_in_description::01 | L76–78 | AP-3 card | APPLICATION | KEEP | YES | REINFORCEMENT | R06-family (Voice Isolation violation, catalog-site; ref `§3.X` vague R18 + unbalanced paren) |
| p8_ap3_voice_in_description::02 | L80–84 | До/После: голос в Description — Елена | EXAMPLE | KEEP | YES | — | |

### p8_ap4_ghost_in_sp (§8.5)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap4_ghost_in_sp::01 | L94–98 | AP-4 card | APPLICATION | KEEP | YES | REINFORCEMENT | 3rd key principle, catalog-site (ref §7A.1 ✓ + unbalanced paren) |
| p8_ap4_ghost_in_sp::02 | L100 | ПРАВИЛО: модель не следует инструкциям о психологии | DEFINITION | KEEP | YES | — | Canonical statement |

### p8_ap5_reppen_high (§8.6)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap5_reppen_high::01 | L110–112 | AP-5 card | APPLICATION | KEEP | YES | RELATED BUT DISTINCT | R12-family: RepPen ≤ 1.10 boundary — consistent with §7A.6 32B+/API 1.05–1.10 (ref ✓ + unbalanced paren); stays valid under either KI#72 reconciliation (both candidate ranges ≤ 1.10). **iter 145:** E12 AP-5 fix card re-framed to the model-qualified defer (DEC-22 S-d; §8.6 prose unchanged) → migration_map_v2 SP-4 |

### p8_ap6_no_anti_godmoding (§8.7)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap6_no_anti_godmoding::01 | L122–130 | AP-6 card + code («Never speak or act for {{user}}.») | APPLICATION | KEEP | YES | REINFORCEMENT | R07 (exact line, fix-site) |
| p8_ap6_no_anti_godmoding::02 | L132–136 | До/После: годмодинг vs anti-godmoding | EXAMPLE | KEEP | YES | — | |
| p8_ap6_no_anti_godmoding::03 | L138 | позитивная формулировка работает лучше запрета | APPLICATION | KEEP | YES | REINFORCEMENT | R07-subfamily: rationale — canonical explanation = §7A.1::09; 3rd statement (glossary A-entry carries the 4th) |

### p8_ap7_presence_penalty (§8.8)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap7_presence_penalty::01 | L148–150 | AP-7 card | APPLICATION | KEEP | YES | — | PP = 0.0 (§7A.6 canonical ✓; unbalanced paren R18-cosmetic) |

### p8_ap8_ghost_no_anchors (§8.9)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap8_ghost_no_anchors::01 | L160–166 | AP-8 card + Elena пример | APPLICATION | KEEP | YES | REINFORCEMENT | §4.8/§4.11 GHOST-anchor requirement, catalog-site |
| p8_ap8_ghost_no_anchors::02 | L168 | Ссылка: §4.8 (FLAW-linked обязательны) | NAVIGATION | KEEP | YES | — | Correct ref ✓ |

### p8_ap9_spine_broken (§8.10)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap9_spine_broken::01 | L178–182 | AP-9 card (симптом/причина/решение; refs §4.7 + §4.9 ✓) | APPLICATION | KEEP | YES | REINFORCEMENT | Broken-SPINE diagnostics, catalog-site |
| p8_ap9_spine_broken::02 | L184–191 | ❌ Сломанный SPINE (code + explanation) | EXAMPLE | KEEP | YES | — | |
| p8_ap9_spine_broken::03 | L193 | Критерий сломанной SPINE (диагностика) | DEFINITION | KEEP | YES | — | Unique diagnostic nuance — reconciles the AP-9 symptom with §4.1 implicit-GHOST rule; **must survive any R21 compression** |
| p8_ap9_spine_broken::04 | L195–209 | ✅ Цельный SPINE (code + closing) | EXAMPLE | KEEP | YES | — | |
| p8_ap9_spine_broken::05 | L211 | Ссылка: пример Елены — §4.9 | NAVIGATION | KEEP | YES | — | Correct ref ✓ («canonical location = Part 4») |

### p8_ap10_cot_overload (§8.11)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap10_cot_overload::01 | L221–227 | AP-10 card + ПРАВИЛО | APPLICATION | KEEP | YES | REINFORCEMENT | §6.2::03 catalog-site |
| p8_ap10_cot_overload::02 | L229–231 | ❌ Перегрузка CoT | EXAMPLE | KEEP | YES | — | |
| p8_ap10_cot_overload::03 | L233–235 | ✅ Максимум 2–3 CoT-якоря | EXAMPLE | KEEP | YES | — | |
| p8_ap10_cot_overload::04 | L237 | Ссылка: `[ref: part_06.md §6.X — CoT-якоря]` | NAVIGATION | KEEP | YES | — | R18: `§6.X` vague (target §6.6) |

### p8_ap11_voice_bleed (§8.12)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap11_voice_bleed::01 | L247–251 | AP-11 card | APPLICATION | KEEP | YES | REINFORCEMENT | §3.8 catalog-site (ref `§3.X` vague R18); teach(§3.8)/catalog(AP-11)/viz(E12) triple — all needed |

### p8_ap12_xml_malformed (§8.13)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap12_xml_malformed::01 | L261–265 | AP-12 card | APPLICATION | KEEP | YES | — | Refs §7A.9 + §7A.4 ✓ |
| p8_ap12_xml_malformed::02 | L267–273 | ❌ Неправильно (code) | EXAMPLE | KEEP | YES | — | |
| p8_ap12_xml_malformed::03 | L275–281 | ✅ Правильно (code) | EXAMPLE | KEEP | YES | — | |
| p8_ap12_xml_malformed::04 | L283 | Ссылка: §7A.9 + §7A.4 | NAVIGATION | KEEP | YES | — | Correct refs ✓ |

### p8_ap13_lorebook_conflict (§8.14)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap13_lorebook_conflict::01 | L293–297 | AP-13 card | APPLICATION | KEEP | YES | — | Ref `§7B.X` vague R18 |

### p8_ap14_context_violation (§8.15)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap14_context_violation::01 | L307–311 | AP-14 card | APPLICATION | KEEP | YES | — | Refs §7A.11 + §7A.12 ✓ |

### p8_ap15_nested_anchors (§8.16)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p8_ap15_nested_anchors::01 | L321–325 | AP-15 card (принцип атомарности) | APPLICATION | KEEP | YES | — | Canonical atomicity principle (ref `§2.X` vague R18) |
| p8_ap15_nested_anchors::02 | L327–331 | ❌ Вложенный якорь (code) | EXAMPLE | KEEP | YES | — | |
| p8_ap15_nested_anchors::03 | L333–338 | ✅ Атомарные якоря (code) | EXAMPLE | KEEP | YES | — | |
| p8_ap15_nested_anchors::04 | L340 | Синтез (part-level) | DEFINITION | KEEP | YES | — | |

**Part 8 verdict:** deliberate two-layer design (E12 catalog + per-AP teach), zero compression
candidates. The defect load is navigation hygiene: **7 vague refs** (`§3.X`×3, `§2.X`×3, `§6.X`,
`§7B.X` — see rows) + **6 unbalanced parentheses** (L44, L66, L78, L98, L112, L150 — every
`(см. [ref: …]` opener unclosed) + AP-1 «>800» R11-family + one version-history phrase (R17-lite).
All canon-side: master resolves every ref to a proper anchor and carries no `§X.X` strings (verified).

---

## 13. Part 10 — Examples (`docs/canon/part_10.md`, 4 sections)

> All four sections are protected example cards (research §21 / Editorial Policy Rule 5): copy-paste
> production artifacts. In-card re-use of teaching material (R22/R23) is the card's function.

### p10_elena (§10.1)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p10_elena::01 | L19 | budget intro (~540 / ~1000) | DEFINITION | KEEP | YES | — | R27 inputs; → migration_map_v2 TB-4/TB-5 (E15 embed + canon marker — mig-4 executed iter 135: derivation note on the Examples total) |
| p10_elena::02 | L21 | Демонстрирует (9 principles) | METADATA | KEEP | YES | — | EN list = executable-adjacent metadata (qa:english baseline class) |
| p10_elena::03 | L23 | Примечание: canonical vs учебный Greeting | NAVIGATION | KEEP | YES | REINFORCEMENT | R28 back-ref to §7B.2 ✓ (IMP-48 pair) |
| p10_elena::04 | L25–101 | ШАБЛОН: полная карточка Елены (code) | EXAMPLE | KEEP | YES | REINFORCEMENT | `{{CORE_DIRECTIVES — …}}` shorthand ✓ (R02-compliant); OCEAN annotations consistent with §5.1/§5.2 ✓; → migration_map_v2 D-4 (verified iter 134, shorthand ×4 across the four cards) |
| p10_elena::05 | L103 | Бюджет токенов + `[ref: §7A.X — Token Budget]` | NAVIGATION | KEEP | YES | — | R18: `§7A.X` vague (target §7A.12; master resolves ✓) |

### p10_walter (§10.2)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p10_walter::01 | L114 | intro (реалистичный современный персонаж) | DEFINITION | KEEP | YES | — | |
| p10_walter::02 | L116 | Демонстрирует (6 principles) | METADATA | KEEP | YES | — | |
| p10_walter::03 | L118–214 | ШАБЛОН: полная карточка Уолтера (code) | EXAMPLE | KEEP | YES | — | OCEAN cautious-zone «SPINE explicit» annotations — unique pedagogy (no other card carries it) |
| p10_walter::04 | L216 | Бюджет токенов (~1100) + `[ref: §7A.X]` | NAVIGATION | KEEP | YES | — | R18 vague; R27: ~1100 outside the character-map «~440–890» base range |

### p10_omnis (§10.3)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p10_omnis::01 | L227 | intro (~1800, все инструменты) | DEFINITION | KEEP | YES | — | |
| p10_omnis::02 | L229 | Демонстрирует (9 principles) | METADATA | KEEP | YES | — | |
| p10_omnis::03 | L231–366 | ШАБЛОН: полная карточка Омнис-Зета (code) | EXAMPLE | KEEP | YES | — | GHOST Layers + CoT×2 + no `<enneagram>` tag = character_map «—» ✓ |
| p10_omnis::04 | L368–376 | Lorebook (5 записей table) | EXAMPLE | KEEP | YES | — | |
| p10_omnis::05 | L378 | Бюджет токенов (~2150) + `[ref: §7A.X]` | NAVIGATION | KEEP | YES | — | R18 vague; R27: ~2150 outside «~1500–1800» expert range |

### p10_vysherblenny (§10.4)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| p10_vysherblenny::01 | L389 | intro (~1500+, expert) | DEFINITION | KEEP | YES | — | |
| p10_vysherblenny::02 | L391 | Демонстрирует (8 principles) | METADATA | KEEP | YES | — | |
| p10_vysherblenny::03 | L393–534 | ШАБЛОН: полная карточка Выщербленного (code) | EXAMPLE | KEEP | YES | REINFORCEMENT | R22 (sensory anchors ← §2.6) + R23 (CoT anchors ← §6.5 verbatim — production-card function); **obs-6:** «Выщебленного» misspelling in the card heading L395 (pre-existing, recorded iter 125) |
| p10_vysherblenny::04 | L536 | бюджет токенов (~1500+) + `[ref: §7A.X]` | NAVIGATION | KEEP | YES | — | R18 vague |
| p10_vysherblenny::05 | L538–546 | Lorebook записи (5 шт table) | EXAMPLE | KEEP | YES | — | |
| p10_vysherblenny::06 | L548–558 | Проверка консистентности SPINE table (7 ✅) | VALIDATION | KEEP | YES | REINFORCEMENT | §4.9 checklist in applied form — changed function ✓ |

**Part 10 verdict:** protected example layer; zero compression candidates. Card-level repeats
(R22/R23) = teach-vs-production dual function. All four budget refs are vague `§7A.X` (R18 — master
resolves each to `#p7a_token_budget`, canon-side hygiene).

---

## 14. Appendices (`docs/canon/appendix_*.md`, 4 sections)

> Glossary / MBTI / Model Table render in master (`appendix_*.html`) but are runtime-blocked by
> KI#70 (never loaded by `lazy-loader.js`). Appendix D (character_map) is canon-only, non-rendering.

### appendix_character_map (Appendix D — **non-rendering**)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| appendix_character_map::01 | L17 | intro: 5 канонических персонажей | DEFINITION | KEEP | YES | — | |
| appendix_character_map::02 | L19–25 | карта персонажей table (9 columns) | DEFINITION | KEEP | YES | UNCLEAR | **KI#77-b/c:** stale usage refs — Omnis «Part 5 §5.2 (OCEAN extreme)»: no «Омнис» in `part_05.md` (byte-verified); Omnis «Part 8 §8.X (AP-15 OCEAN Overload)»: stale — concept moved to Part 5 §5.3 per §8.1, AP-15 is now Nested Anchors; Выщербленный «Part 5 (эннеаграмма)»: no occurrence in part_05 (5w4 lives in §10.4); + «Part 6 §6.X» vague R18 |
| appendix_character_map::03 | L27 | Ссылка (карточки, библии, примеры) | NAVIGATION | KEEP | YES | — | |
| appendix_character_map::04 | L29–33 | Метки OCEAN note | METADATA | COMPRESS | YES | DUPLICATE | **R17:** «(фикс iter 40 — KI#29)» history in a non-rendering note; substance (extreme/cautious labeling) = R25-family restatement — strip the history label, keep the labeling statement |
| appendix_character_map::05 | L35–39 | РЕКОМЕНДАЦИЯ: выбирайте персонажа по сложности | APPLICATION | KEEP | YES | UNCLEAR | **R27:** budget ranges «~440–890» (Elena 540 ✓ / Walter ~1100 ✗) and «~1500–1800» (Omnis ~2150 ✗ / Выщербленный ~1500+ boundary) vs the Part 10 stated budgets — framing drift, feeds ed-5 (→ KI#77-e) |
| appendix_character_map::06 | L41 | Правило: персонаж задаётся ровно один раз | DEFINITION | KEEP | YES | — | Canonical (governs the R22/R23/R28 «keep both sides» classifications) |

### appendix_glossary (Appendix C)

> **iter 132:** all 26 rows seeded into `migration_map_v2.md` §5.1 (glossary slice, DEC-17) —
> back-pointers `→ migration_map_v2 C-<n>` appended per row; editorial verdicts below stand
> (v1 audit record).

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| appendix_glossary::01 | L19 | intro (definition + ref pattern) | NAVIGATION | KEEP | YES | — | Declares the glossary's own entry pattern; → migration_map_v2 C-1 |
| appendix_glossary::02 | L21–25 | A — Anti-godmoding | DEFINITION | KEEP | YES | REINFORCEMENT | R07-family (2-line form + positive-formulation rationale echo of §7A.1::09); ref `§7A.X` vague R18; → migration_map_v2 C-2 |
| appendix_glossary::03 | L27–31 | B — Behavioral Anchor | DEFINITION | COMPRESS | YES | DUPLICATE | **R01 reference-layer occurrence:** carries the placement ПРАВИЛО (2-sentence statement of the §1.4 rule); fold to 1 sentence + ref §1.4 per the glossary's own pattern; the `§2.1` ref itself is correct; → migration_map_v2 C-3 |
| appendix_glossary::04 | L33–37 | C — CoT | DEFINITION | KEEP | YES | — | R29: «Tier 0 (basic Anchor)» vs §6.3 «Tier 0 — без отдельного CoT-блока»; ref §6.2 ✓; → migration_map_v2 C-4 |
| appendix_glossary::05 | L39–51 | C — CORE DIRECTIVES (full annotated 7-item list) | DEFINITION | COMPRESS | YES | DUPLICATE | **R02 verdict (ed-2 input, required by the ed-matrix PLAN row):** full annotated copy exceeds the glossary's own 1-sentence+ref pattern — the annotations restate §7A.2::06–::12; compress to definition + 7-name index + fixed ref §7A.2; **KI#70 dependency:** master renders the full list but the appendix never runtime-loads — the compression should ride the KI#70 wire/drop decision; ref `§7A.X` vague R18; → migration_map_v2 C-5; v2 file disposition → migration_map_v2 D-5 (deferred to v2 switch) |
| appendix_glossary::06 | L53–57 | E — Embodiment Protocol | DEFINITION | KEEP | YES | — | Protocol-vs-Directive distinction preserved ✓; ref `§2.X` vague; → migration_map_v2 C-6 |
| appendix_glossary::07 | L59–63 | E — Enneagram | DEFINITION | KEEP | YES | — | Ref §5.4 ✓; → migration_map_v2 C-7 |
| appendix_glossary::08 | L65–69 | F — FLAW | DEFINITION | KEEP | YES | REINFORCEMENT | R24 reference-side; ref `§4.X` vague; → migration_map_v2 C-8 |
| appendix_glossary::09 | L71–75 | G — GHOST | DEFINITION | KEEP | YES | — | Ref `§4.X` vague; → migration_map_v2 C-9 |
| appendix_glossary::10 | L77–81 | G — GHOST Layers | DEFINITION | KEEP | YES | — | R29: «G2=Отрочество» vs §4.11 «Юность»; ref `§4.X` vague; → migration_map_v2 C-10 |
| appendix_glossary::11 | L83–87 | G — Greeting Message | DEFINITION | KEEP | YES | — | Ref `§7B.X` vague; → migration_map_v2 C-11 |
| appendix_glossary::12 | L89–93 | I — Identity Block | DEFINITION | KEEP | YES | — | Name-language rule echo of §7A.1::04 (reference layer); ref `§7A.X` vague; → migration_map_v2 C-12 |
| appendix_glossary::13 | L95–99 | L — LIE | DEFINITION | KEEP | YES | — | Ref `§4.X` vague; → migration_map_v2 C-13 |
| appendix_glossary::14 | L101–105 | L — Lorebook | DEFINITION | KEEP | YES | — | Ref `§7B.X` vague; → migration_map_v2 C-14 |
| appendix_glossary::15 | L107–111 | M — MBTI | DEFINITION | KEEP | YES | REINFORCEMENT | **R26 statement #4**; ref appendix ✓; → migration_map_v2 C-15 |
| appendix_glossary::16 | L113–117 | N — NEED | DEFINITION | KEEP | YES | — | Ref `§4.X` vague; → migration_map_v2 C-16 |
| appendix_glossary::17 | L119–123 | O — OCEAN | DEFINITION | KEEP | YES | REINFORCEMENT | R25 reference-side restatement (golden rule); refs §5.1 + §1.4 ✓; → migration_map_v2 C-17 |
| appendix_glossary::18 | L125–129 | S — SPINE | DEFINITION | KEEP | YES | REINFORCEMENT | R21 clause (implicit GHOST/LIE); ref §4.1 ✓; → migration_map_v2 C-18 |
| appendix_glossary::19 | L131–135 | S — System Prompt / SP | DEFINITION | KEEP | YES | — | Container-vs-content distinction ✓; ref `§7A.X` vague; → migration_map_v2 C-19 |
| appendix_glossary::20 | L137–141 | T — T→A→P | DEFINITION | KEEP | YES | — | Ref §2.1 ✓; → migration_map_v2 C-20 |
| appendix_glossary::21 | L143–147 | T — Token Budget | DEFINITION | KEEP | YES | — | R11-family («4K ~430–580 на карточку» — card-total framing vs §7A.12 per-block); ref `§7A.X` vague; → migration_map_v2 C-21; → migration_map_v2 TB-6 (verified iter 135) |
| appendix_glossary::22 | L149–153 | V — Voice | DEFINITION | KEEP | YES | REINFORCEMENT | R03 clause («Модель — копировщик паттернов») + R06 two-level rule (reference echo); ref `§3.X` vague; → migration_map_v2 C-22 |
| appendix_glossary::23 | L155–159 | V — Voice Bleed (cross-character) | DEFINITION | KEEP | YES | — | Ref `§3.X` vague; → migration_map_v2 C-23 |
| appendix_glossary::24 | L161–165 | V — Voice Bleed (degradation) | DEFINITION | KEEP | YES | — | Ref `§3.X` vague; → migration_map_v2 C-24 |
| appendix_glossary::25 | L167–171 | V — Voice Isolation | DEFINITION | KEEP | YES | — | Ref `§3.X` vague; → migration_map_v2 C-25 |
| appendix_glossary::26 | L173–177 | W — WANT | DEFINITION | KEEP | YES | — | Ref `§4.X` vague; → migration_map_v2 C-26 |

### appendix_mbti (Appendix A)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| appendix_mbti::01 | L19 | MBTI definition | DEFINITION | KEEP | YES | — | |
| appendix_mbti::02 | L21–28 | 4 оси MBTI table | DEFINITION | KEEP | YES | — | |
| appendix_mbti::03 | L30–37 | Темпераменты (Keirsey) table | DEFINITION | KEEP | YES | — | |
| appendix_mbti::04 | L39 | NOTE: S·P ≠ SP disambiguation | DEFINITION | KEEP | YES | — | Canonical disambiguation (glossary-consistent ✓); EN label «NOTE» — DEC-16 cosmetic; ref `§7A.X` vague R18 |
| appendix_mbti::05 | L41–43 | MBTI Composer (interactive) container note | METADATA | KEEP | YES | — | **KI#70 dependency:** documents a container that never runtime-renders (mbti-composer path never exercised) |
| appendix_mbti::06 | L45–47 | РЕКОМЕНДАЦИЯ: MBTI — справочный инструмент | APPLICATION | KEEP | YES | REINFORCEMENT | **R26 statement #3** (appendix site) |

### appendix_model_table (Appendix B)

| id | lines | block | tag | decision | load | repeat | notes |
|---|---|---|---|---|---|---|---|
| appendix_model_table::01 | L19 | intro (объединяет MODEL_NOTE-заметки) | NAVIGATION | KEEP | YES | — | Declares its replacement function (referenced by `[Model: see Appendix B]` markers ×2 in Part 6) |
| appendix_model_table::02 | L21–31 | таблица возможностей моделей (9 rows) | DEFINITION | KEEP | YES | — | Canonical; values consistent with §6.3 tiers / §7A.2 SP-language / §7A.12 Script Tax ✓ |
| appendix_model_table::03 | L33–37 | ключевые следствия для сборки (3 bullets) | APPLICATION | KEEP | YES | REINFORCEMENT | Apply-layer summary of the table (SP-language ref §7A.2 ✓; Script Tax 1.5–2× consistent ✓) |

**Appendices verdict:** reference layer healthy. Two entries over-carry canonical material (glossary
CORE DIRECTIVES — the R02/ed-2 input; Behavioral Anchor placement ПРАВИЛО — R01 reference-layer
side). 18 vague glossary refs (mechanical R18: 5× `§7A.X`, 6× `§4.X`, 4× `§3.X`, 2× `§7B.X`, 1× `§2.X`).
KI#77-b/c/d stale refs + R27 budget-range drift in character_map; KI#70 dependencies noted where
appendix content describes never-loaded containers.

---

## 15. Repeat registry — second pass (research §24 classification)

> Cross-cutting repeated concepts found in Phases A + B. `Canonical` = the KEEP-side owner; the other
> occurrences carry the classification. Only `DUPLICATE` rows are automatic compression candidates.
> Phase B extensions are marked **[B]**; unmarked occurrence lists are Phase A scope.

| # | Concept | Canonical owner | Other occurrences | Classification | Feeds |
|---|---|---|---|---|---|
| R01 | Anchors-placement rule (separate block in Examples-zone) | `p1_core_rules::05` (§1.4) | §7A.1 L33 full copy — **compressed iter 125 (dupes-1)** · §7A.9 L394 short+ref · §7A.11 L567 short+ref · §7A.13 L732 footnote · §1.2 L57 clarification · **[B]** glossary «B — Behavioral Anchor» entry (reference-layer ПРАВИЛО statement — compress to 1 sentence + ref §1.4) | DUPLICATE (glossary entry; §7A.1 fixed) | ed-2-style compress, canon-first |
| R02 | CORE DIRECTIVES full 7-line block | `p7a_core_directives::05` (§7A.2) | §7A.13 L657–665 **verbatim** · **[B]** glossary «C — CORE DIRECTIVES» full annotated copy — **verdict: DUPLICATE → COMPRESS** (definition + 7-name index + fixed ref §7A.2; the annotations restate §7A.2::06–::12; KI#70 dependency: appendix never runtime-loads — compression should ride the KI#70 wire/drop decision) · Part 10 uses shorthand ✓ — **EXECUTED: §7A.13 → shorthand iter 134 (migration_map_v2 D-2); glossary side iter 133 via registry C-5/D-8** | DUPLICATE (§7A.13 primary; glossary classified) | ed-2 |
| R03 | Pattern Matcher principle | `p1_core_rules::03` (§1.4) | §3.1 L39 — **compressed iter 129 (ed-7 family): 1 sentence + ref §1.4, applied outcome contrast kept** · §1.7 L128 application · §7A.4 L189/L199 applications+ref · **[B]** glossary «V — Voice» entry (1-sentence reference clause — acceptable) | DUPLICATE (§3.1 fixed iter 129); rest compliant | ed-1/ed-4 ✅ §3.1 iter 129 |
| R04 | Voice drift numbers (~40% vs ~10% at 20–30 msgs) | §3.1 table (granular) | §1.1 table row | DUPLICATE (same data, same persuasive purpose) | ed-1/ed-4 |
| R05 | Методология empirical-evidence disclaimer | `p1_value_proposition::03` (§1.1) | §3.1 L37 — **compressed iter 129 (ed-7 family): 1-sentence pointer to §1.1 + §3.2 note kept locally; sync-audit P3-6 updated** | DUPLICATE (§3.1 fixed iter 129) | ed-7 ✅ iter 129 |
| R06 | Linguistic vs physical voice (Тест family) | `p3_voice_isolation::03–04` (§3.1) | §3.2 L67–80 example (unique demo) · §3.2 L82 Пояснение — **deleted iter 130 (ed-4 family, candidate #6)** · **[B]** AP-3 catalog-site (compliant apply) · **[B]** glossary Voice/Voice Isolation entries (reference echo) | DUPLICATE (Пояснение fixed iter 130) | ed-4 ✅ iter 130 |
| R07 | Anti-godmoding exact line «Never speak or act for {{user}}.» | §7A.1 template | §1.7 fix · §9.3 check · §9.11 examples · §7A.13 step 2 · **[B]** §0.2 step-1 (quick-start apply) · **[B]** AP-6 code + До/После (fix-site) · **[B]** §7B.4 ПРАВИЛО (content no-user-actions principle) · **[B]** glossary A-entry (2-line form + positive-formulation rationale — rationale stated 3×: §7A.1::09 canonical / AP-6 / glossary) | REINFORCEMENT (each = changed function: teach/fix/check/example/reference) | — |
| R08 | OOC Protection template | §7A.8 | §7A.13 step 3 partial re-print | REINFORCEMENT (assembled-SP view) — ed-2 audit item | ed-2 |
| R09 | Format Lock template | §7A.4 | §7A.1 template tail · §7A.13 step 3 · **[B]** all four Part 10 cards (Format Lock block inside each SP — production-artifact function) | REINFORCEMENT (template/apply/assemble/card) | ed-2 |
| R10 | Tone Frame example string | §7A.3 table | §7A.13 step 3 · **[B]** Part 10 cards carry character-specific Tone Frame strings (unique per card, not re-prints) | REINFORCEMENT (apply-layer) | ed-2 |
| R11 | Token budget numbers (per-block) | `p7a_token_budget::03` (§7A.12) | §7A.11 4K table (RELATED BUT DISTINCT ✓) · §1.8 Q2 (UNCLEAR framing: ≤200/≤400 vs 150/300/700) · §7A.13 step 6 ✓ · §9.11 «Description ≤ 800» vs max 700 (CONTRADICTORY) · **[B]** AP-1 symptom «Description > 800» (same ≥800-vs-700 tension) · **[B]** glossary Token Budget entry («4K ~430–580 на карточку» — card-total framing) · §7B.2 Greeting «Длина: 50–100 токенов» vs §7A.12 Greeting row 40/60/100 (**instance found iter 135, mig-4 TB-8**) | MIXED — see per-row | ed-5; E01/E15 embed side dispositioned+locked by mig-4 (map §5.3, iter 135) |
| R12 | Sampling parameter values | `p7a_sampling_params::03` (§7A.6) | §7A.7 rows — **CONTRADICTORY** (KI#72) · §9.3 Parameters row = compliance check ✓ · §9.10 refs ✓ · **[B]** AP-5 RepPen ≤ 1.10 boundary (consistent with §7A.6 under either KI#72 outcome) · **[B]** AP-7 PP = 0.0 (consistent ✓) | CONTRADICTORY (§7A.7) | KI#72 fix — **EXECUTED iter 145 (DEC-22): §7A.6 canonical, §7A.7 param rows dropped, E17/E12/§9.x re-pointed; audit_sampling_parity.py locks the set** |
| R13 | SP language rule | §7A.2 | §7A.7 footnote ✓ · §9.10 summary ✓ · **[B]** Appendix B следствия (ref ✓) · **[B]** glossary CORE DIRECTIVES entry (full 3-tier restatement — folds into the R02 compression) | Compliant refs + glossary full copy (folds into R02) | — |
| R14 | Diagnostic-mode routers («Сценарий:» paras) | — (7 near-identical: §9.3/9.5/9.6/9.7/9.9/9.10/9.11) | — | UNCLEAR — navigation-debt (research §15); candidate: one canonical routing block | ed-8/ed-policy |
| R15 | §9.4 problems #4/#5 vs §9.5 rows | §9.5 | §9.4 (pending candidate #11) | DUPLICATE | ed-3 execution |
| R16 | §9.11 quick-check `<details>` vs §9.3 | §9.3 + E14 | §9.11 (self-admitted) — **deleted iter 125 (dupes-1)** · **[B]** §0.2 step-6 «5 быстрых проверок» (1-line quick-start recall — REINFORCEMENT, keep) | DUPLICATE (§9.11 fixed; TL;DR = compliant recall) | dupes-1 ✅ iter 125 |
| R17 | Repo-meta in reader prose — **rendered-prose locations stripped iter 121 (ed-6; Part 1 ×2, §7A.1, §7A.2, §7A.12, Part 8 + the KI#71 duplicate RULE line)**. **[B] non-rendering + canon-only strips #14/#15/#17/#18 EXECUTED iter 128 (ed-8 continuation): `part_00.md` §0.1 L45 history clause + L58 repo pointers · `part_06.md` §6.3 L83 iter/KI label · `appendix_character_map.md` L29 fix label — substance kept in all four.** **[B] remainder EXECUTED iter 129 (ed-7 fold): `part_00.md` L13 preamble («Создан: iter 38 — KI#21») deleted · `part_08.md` §8.1 L27 «v9 restructure» stripped (canon + master mirror + sync-audit P1-3 update) — R17 family now COMPLETE** | — | Phase A locations (5, all executed iter 121) | DUPLICATE class (ed-6) | ed-6 ✅ A+B complete iter 129 |
| R18 | Vague `§X.X` placeholder refs — **canon-only debt: master resolves every occurrence to a proper anchor (verified iter 126: zero `§X.X` strings in master `part_05/08/09/10.html`; part_04 L281 resolves correctly)** — **Phase B batch repaired iter 127 (ed-8/R18: 33 refs + 6 part_08 parens + KI#77-a–d; part_05 L21 → limits-table pointer with master mirror + sync-audit P0-16 update). Phase A remainder REPAIRED iter 128 (ed-8/R18 continuation): 16 refs (grep recount — the ~13 estimate was undercounted again): part_09 ×12 (L64/65/66/86/103/104/105/106/113/134/137/227 — L64 + L134 were matrix-unflagged), part_07a ×3 (L109/L340/L699 + L699 paren closed), part_03 ×1 (L165) — every target verified against the existing master anchor; 2 labels aligned to the master target (L65 → §3.3 «Правила Examples», L66 → §7B.2 «Greeting»)** | — | Remaining vague forms (out-of-scope by design): `_README.md` L103 (ref-notation format example) · character_map L41 «Part 10 §10.X» (generic form, matrix-unflagged) | Navigation debt (mechanical, canon-first) | ed-8 ✅ Phase A+B complete |
| R19 | Voice Leak causes | §3.6 | §9.5 voice rows | REINFORCEMENT (lookup form) | — |
| R20 | 12B symptoms | §9.10 | §9.5 general rows | SPECIAL CASE | — |
| R21 | Simple-characters implicit GHOST/LIE rule («для простых персонажей призрак и ложь могут быть неявными; полная цепочка должна быть логически связана») | `p4_spine_overview::06` (§4.1) | §4.7 L223 **near-verbatim re-statement** (candidate #16 — fold to pointer) · §4.11 L354–359 expert-side mirror (compliant — different decision) · §8.10 L193 «критерий сломанной SPINE» (reconciliation nuance — must survive) · **[B]** glossary SPINE entry (clause, acceptable) | DUPLICATE (§4.7 only) | candidate #16 / ed-7 |
| R22 | Выщербленный sensory anchors (тактильный/обонятельный/проприоцептивный) | §2.6 L166–173 (teaching example) | §10.4 L491–493 (production card — near-verbatim) | REINFORCEMENT (teach vs production artifact; §21 protection; governed by the character-map «one place per character, elsewhere = ref» rule for definitions, not card content) | — |
| R23 | CoT Tier-3 Выщербленный example (`processus_analysium` block) | §6.5 L156–173 (teach, full) | §6.6 L192–199 (summary table, compressed) · §10.4 L496–517 (production card, verbatim) | REINFORCEMENT (3 functions: teach / summary / production) | — |
| R24 | Adjective-vs-behavior formulation principle («не прилагательное, а наблюдаемое поведение») | §4.4 anti-pattern tables (FLAW-side) | §2.2 L55 RULE (anchor-side, ref §4.4 ✓) · **[B]** glossary F-FLAW + B-Anchor entries (reference-side) · §4.1::05 observable-units (family) | REINFORCEMENT (different objects: anchor / FLAW / reference) | — |
| R25 | OCEAN pole-limits numbers (1–2 extremes; 8K→3, 16K→4) | `p5_ocean_basics::02` RULE + ::14 limits table (§5.1) | §5.3 L167 scenario-3 solution (partial, consistent) · **[B]** glossary O-OCEAN entry (restatement) · **[B]** character_map ::04 labels note (R17-decorated) | REINFORCEMENT (values consistent everywhere); §5.1::02's internal ref «см. §5.3» imprecise — **fixed iter 127** (points to the §5.1 limits table now) | ed-7/ed-8 ref fix |
| R26 | MBTI reference-role statement («справочный инструмент, без прямого маппинга на SPINE») | §5.1 L104 РЕКОМЕНДАЦИЯ (decision site) | §5.5 L215–217 (cross-map site) · **[B]** appendix_mbti L45–47 (appendix site) · **[B]** glossary M-MBTI entry | REINFORCEMENT ×4 (decision/validation/reference layers — all consistent) | — |
| R27 | Card-level budget totals framing | Part 10 per-card budgets (~540/1000, ~1100, ~2150, ~1500+) | **[B]** character_map L37–38 ranges «~440–890» (Walter ~1100 outside) and «~1500–1800» (Omnis ~2150 outside) | UNCLEAR (framing drift, card-total layer of the R11 family) | ed-5 / KI#77 |
| R28 | Elena Greeting dual presentation | §10.1 L97–100 (canonical production greeting) | §7B.2 L61–72 (учебный разбор по алгоритму) | REINFORCEMENT — **compliant pattern:** both sides carry explicit disambiguation Примечания (IMP-48); the model pair for dual-presentation decisions | — |
| R29 | Terminology drift in the reference layer | §4.11 «G2 — Юность (13–25)» · §6.3 «Tier 0 — без отдельного CoT-блока» · §7B.5 RULE «якоря призрака (GHOST-якоря)» | **[B] all 4 drift sites FIXED iter 129 (ed-7 normalization):** glossary G-GHOST Layers «G2=Отрочество»→«G2=Юность» (canon + master mirror) · glossary C-CoT «Tier 0 (basic Anchor)»→«Tier 0 (без отдельного CoT-блока)» (canon; master already carried the aligned long form) · §7B.5 checklist «призрак Anchors»→«якоря призрака (GHOST-якоря)» (canon + master mirror, aligned to the L257 RULE wording) · appendix_mbti EN label «NOTE»→«Примечание» (canon-only, DEC-16) | DUPLICATE class (wording-level, not semantic) — resolved | ed-7 normalization ✅ iter 129 |

---

## 16. Summary statistics

> Counts verified by script against the `id` column (Phase A: iter 120 sandbox tooling; Phase B:
> iter 126 — unique IDs, per-part counts, column vocabularies; see `worklog.md` iter-126).

### 16.1 Phase A (Parts 1 / 3 / 7A / 9 — iter 120)

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

### 16.2 Phase B (Part 0, 2, 4, 5, 6, 7B, 8, 10 + appendices — iter 126)

| Metric | Part 0* | Part 2 | Part 4 | Part 5 | Part 6 | Part 7B | Part 8 | Part 10 | Appx* | Total |
|---|---|---|---|---|---|---|---|---|---|---|
| Sections covered | 2 | 6 | 11 | 7 | 6 | 5 | 16 | 4 | 4 | 61 |
| Blocks (rows) | 11 | 26 | 51 | 43 | 25 | 33 | 40 | 20 | 41 | 290 |
| KEEP | 9 | 26 | 50 | 43 | 24 | 33 | 40 | 20 | 38 | 283 |
| COMPRESS | 2 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 3 | 6 |
| CROSS-REFERENCE | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| MOVE | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| DELETE | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Blocks with `repeat = DUPLICATE` | 2 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 3 | 7 |

\* Part 0 (2 sections) and Appendix D character_map (1 section) are non-rendering — canon-side
hygiene rows. Appendix totals = character_map (6) + glossary (26) + mbti (6) + model_table (3).

### 16.3 Combined (A + B)

| Metric | Total |
|---|---|
| Canon-declared section IDs audited | **99** (96 rendering + 3 conceptual-only) |
| Block rows | **500** (210 + 290), all IDs unique |
| KEEP | 473 (94.6%) |
| COMPRESS | 16 |
| CROSS-REFERENCE | 5 |
| MOVE | 1 |
| DELETE | 5 |
| Blocks with `repeat = DUPLICATE` | 23 |
| Blocks with `repeat = CONTRADICTORY` | 1 (KI#72) + R11 numeric tensions noted in rows |
| Repeat registry | R01–R29 |

**Automatic compression candidates (decision ≠ KEEP **and** `repeat = DUPLICATE`, research §32) —
cumulative list with execution status:**

1. `p7a_system_prompt::05` — verbatim duplicate RULE line (KI#71) → DELETE — **✅ executed iter 121 (ed-6)**
2. `p7a_system_prompt::06` — Anchors-placement full copy (R01) → CROSS-REFERENCE — **✅ executed iter 125 (dupes-1)**
3. `p7a_system_prompt::07` — stale `[ANCHORS]`/KI#58 repo-meta note (R17) → DELETE — **✅ executed iter 121 (ed-6)**
4. `p3_voice_isolation::06` — methodology copy (R05) → CROSS-REFERENCE — **✅ executed iter 129 (ed-7 family; sync-audit P3-6 updated)**
5. `p3_voice_isolation::07` — Pattern Matcher re-teach (R03) → COMPRESS — **✅ executed iter 129 (ed-7 family)**
6. `p3_influence_hierarchy::07` — Пояснение re-explainer (R06) → DELETE — **✅ executed iter 130 (ed-4 family)**
7. `p7a_model_checklist::02` — param rows with contradictory values (R12, KI#72) → COMPRESS — **EXECUTED iter 145** (DEC-22 S-b; map §5.7 SP-3)
8. `p7a_4k_fallback::05` — Anchors-placement 4th occurrence (R01) → CROSS-REFERENCE — open
9. `p7a_token_budget::11` — stale migration note (R17) → DELETE — **✅ executed iter 121 (ed-6)**
10. `p7a_assembly_pipeline::05` — CORE DIRECTIVES verbatim (R02) → CROSS-REFERENCE — **executed iter 134 (migration_map_v2 D-2: DEC-08 shorthand)**
11. `p9_additional_problems::02` — #4/#5 symptom pairs (R15) → MOVE into §9.5 — open (ed-3)
12. `p9_pre_deploy::03` — self-admitted quick-check dupe (R16) → DELETE — **✅ executed iter 125 (dupes-1)**
13. `p9_test_requirements::02` — «минимум 6 сценариев» restatement → COMPRESS — open
14. `p0_how_to_read::05` — callout-labels history clause (R17, non-rendering) → COMPRESS — **✅ executed iter 128 (ed-8 continuation)**
15. `p0_how_to_read::06` — DEC-16 repo pointers (R17, non-rendering) → COMPRESS — **✅ executed iter 128 (ed-8 continuation)**
16. `p4_spine_full_chain::04` — implicit-GHOST/LIE near-verbatim re-statement (R21) → CROSS-REFERENCE — open (Phase B)
17. `p6_cot_tiers::05` — iter-29/KI#18-F canon-only note (R17) → COMPRESS — **✅ executed iter 128 (ed-8 continuation)**
18. `appendix_character_map::04` — iter-40/KI#29 history label (R17, non-rendering) → COMPRESS — **✅ executed iter 128 (ed-8 continuation)**
19. `appendix_glossary::05` (C — CORE DIRECTIVES) — full annotated copy (R02) → COMPRESS — compression executed iter 133 in the v2 registry (C-5); the frozen v1 file rides the v2 switch (migration_map_v2 D-5)
20. `appendix_glossary::03` (B — Behavioral Anchor) — placement ПРАВИЛО clause (R01, reference layer) → COMPRESS — open (Phase B)

Execution status: 13 of 20 combined candidates executed (iters 121/125/128/129/130/134); 7 open overall
(#8, #11, #13 from Phase A + #16, #20 from Phase B). #7 (KI#72) carries an owner decision; #19's
registry-side compression landed iter 133 (file rides the v2 switch); the rest are ready for ed-* execution
under the Editorial Policy.

Plus one **pair-level** candidate: R04 drift-numbers — one of the two occurrences
(`p1_value_proposition::02` table row vs `p3_voice_isolation::05` table) becomes a cross-reference;
the owner picks the surviving side in ed-1/ed-4 (both marked KEEP at block level here).

**Phase B confirms the research verdict at guide scale:** 283 of 290 blocks (97.6%) KEEP — the
remaining parts carry no new teaching-layer duplication load. The Phase B defect surface is
*navigation hygiene* (R18 vague refs — canon-only, master already resolves), *reference-layer
over-carry* (2 glossary entries), *repo-meta history labels* (R17, mostly non-rendering), and
*numeric framing drift* (R11/R27). Functional load is preserved (load = YES) for every recommended
action; no Phase B deletion carries unique information (research §22 category 1).

---

## 17. Re-scope notes for the executing iterations (ed-1…ed-8)

- **ed-1 (Part 1):** evidence narrows the scope — Part 1 does **not** block-level re-teach
  Parts 2–7A (refs already 1-sentence; §1.4/§1.7/§1.8 are canonical owners). Remaining ed-1 work:
  R04 drift-row decision, R17 Part-1 meta strips, R11 §1.8 framing. Expect a much smaller edit set
  than research §2/§4 assumed. Phase B adds: nothing (Part 1 untouched by B).
- **ed-2 (CORE DIRECTIVES):** primary target = §7A.13 step 3 verbatim block → DEC-08 shorthand — executed iter 134 (migration_map_v2 §5.2, D-2).
  Secondary audit: R08/R09/R10 re-prints in the assembled-SP view (R09/R10 now include the four
  Part 10 card-side Format Lock / Tone Frame blocks — production-artifact function, likely KEEP).
  **Glossary copy classified (Phase B):** compress to definition + 7-name index + fixed ref §7A.2
  (candidate #19); rides the KI#70 wire/drop decision. Part 10 shorthand usage verified compliant.
- **ed-3 (Part 9):** already check-form; remaining = R15 fold + R14 router decision.
- **ed-4 (Voice):** hierarchy framing only; the R06 family (Тест/example/Пояснение) is the single
  in-part consolidation candidate — **Пояснение deleted iter 130 (candidate #6; canon + master
  mirror); Тест (§3.1::04) and the §3.2 example are KEEP, so the family is now consolidated.**
  Hierarchy framing itself: the §3.1 → §3.8 section sequence already forms the concept-family
  hierarchy — no further ed-4 edits evidenced (no framing text invented). No merges (§24 protects
  RELATED BUT DISTINCT). Phase B adds: AP-3/AP-11 catalog-sites and the glossary voice entries are
  compliant — out of ed-4 scope.
- **ed-5 (Token budget):** R11 — resolve §1.8 Q2 framing + §9.11 «≤800» vs §7A.12 max 700 +
  **[B]** AP-1 «>800» (same tension) + **[B]** glossary «4K ~430–580» card-total framing;
  §7A.11 4K table is legitimately distinct. **[B] R27:** character_map card-total ranges
  (~440–890 / ~1500–1800) vs Part 10 budgets — decide whether the ranges re-frame to match the
  cards or the cards' feature-sets get stated as the range condition.
- **ed-6 (repo-meta):** rendered-prose strips done (iter 121); canon-side strips #14/#15/#17/#18
  **executed iter 128**. **[B] remainder (`part_00.md` L13 preamble + the optional part_08
  «v9 restructure» phrase) — executed iter 129 (ed-7 fold).** R17 family complete.
- **ed-7 (readability):** R05 methodology pair — **compressed iter 129 (§3.1 → §1.1 pointer)**; §7A.5 unbalanced paren; rule-strength classes for
  numeric claims (incl. KI#72 values once reconciled); **[B] R25** pole-limits triple statement +
  its imprecise §5.1→§5.3 ref (**ref fixed iter 127** — triple statement remains); **[B] R29** terminology drift pairs — **all 4 fixed iter 129
  («Юность/Отрочество», «Tier 0 basic Anchor», «призрак Anchors», EN label «NOTE»)**.
- **ed-8 (cross-ref quality):** R18 vague-ref list is now the **largest mechanical family**:
  ~32 Phase B vague refs (part_08 ×7 + glossary ×18 + part_10 ×4 + part_05 + appendix_mbti +
  character_map) + 6 unbalanced parens (part_08) + Phase A's §3.5/§9.3/§9.5 set + KI#77-a wrong
  ref. Canon-first mechanical pass; master needs no link changes (already resolves correctly) —
  but canon text changes require the usual master mirror edits for changed paragraphs.
  **Phase B batch EXECUTED iter 127 (33 refs + parens + KI#77-a–d + part_05 L21 imprecise ref →
  «Контекстные лимиты полюсов» table pointer, master mirror + sync-audit P0-16 update).**
  **Phase A batch EXECUTED iter 128 (16 refs + part_07a L699 paren — R18 registry row for the
  recount; every target verified against master anchors).** Remaining: KI#77-e (ed-5 framing
  decision) + the 2 out-of-scope generic forms (R18 row).
- **dupes-N (self-admitted dupes):** Phase B found none beyond the R21 §4.7 re-statement — the
  «self-admitted duplicate» class is exhausted; remaining work is the matrix candidate list.

## 18. New defects recorded (fixes deferred — read-only scope)

**Phase A (iter 120):**

- **KI#71** — canon `part_07a.md` L30–L31: identity-name RULE duplicated byte-identical (master
  carries it once). Fix = delete one canon line; fold into the next canon-touching iteration
  (dupes-1/ed-6 family). Recorded in `STATUS.md`. **CLOSED iter 121 (ed-6).**
- **KI#72** — sampling contradictions §7A.6 ↔ §7A.7: 32B+ Temperature 0.7–1.0 (and 0.7–0.9 in the
  model-specific table) vs 0.85–1.1; 32B+ RepPen 1.05–1.10 vs 1.0–1.05. Reconciliation needs a
  content decision (which range is canonical) — `PLAN.md` row `ki-72`. Recorded in `STATUS.md`.

**Phase B (iter 126):**

- **KI#77** — canon-side wrong/stale cross-references in Phase B parts (master resolves every
  affected link correctly — reader impact is canon navigability only):
  - **(a)** `part_04.md` L281: `[ref: part_07a.md §7A.6 — Consequence Driven]` → directive #6
    lives in §7A.2; §7A.6 = Sampling Params. Master link already points to `#p7a_core_directives`
    (verified) — canon-side ref text repair.
  - **(b)** `appendix_character_map.md` L23 (Omnis row): «Part 5 §5.2 (OCEAN extreme)» — no
    «Омнис» occurrence in `part_05.md` (byte-verified); «Part 8 §8.X (AP-15 OCEAN Overload)» —
    stale: the concept moved to Part 5 §5.3 (per §8.1's own pointer) and AP-15 is now Nested
    Anchors.
  - **(c)** `appendix_character_map.md` L24 (Выщербленный row): «Part 5 (эннеаграмма)» — no
    occurrence in part_05; the 5w4 mapping lives in `part_10.md` §10.4 (`<enneagram>` tag).
  - **(d)** `appendix_character_map.md` L24: «Part 6 §6.X (CoT)» — vague form (target §6.5/§6.6).
  - **(e)** `appendix_character_map.md` L37–38: budget ranges «~440–890» / «~1500–1800» vs Part 10
    stated budgets (Elena ~540/1000 ✓; Walter ~1100 ✗; Omnis ~2150 ✗; Выщербленный ~1500+ boundary)
    — framing drift (R27), needs an explicit re-frame decision (ed-5 input).
  Character_map is non-rendering (no master artifact) — (b)–(e) have zero reader impact; (a)
  renders through a correct master link. Fix = targeted canon ref repair, fold into ed-8 or any
  canon-touching iteration. Recorded in `STATUS.md`.

**Observations (not KIs):**

- NAV/AGENTS «97 sections» phrasing: the sync audit's 97 = its check count; actual = 96 rendered
  master sections + 99 canon-declared IDs (the `content_map.md` counting convention, verified
  iter 117 and re-verified iter 126). Doc-precision nit for a future NAV touch — no action required.
- KI#70 dependency noted twice in Phase B rows: the glossary CORE DIRECTIVES compression
  (candidate #19) and the appendix_mbti container note both describe appendix content that never
  runtime-loads — their editorial fate should ride the KI#70 wire/drop decision.



