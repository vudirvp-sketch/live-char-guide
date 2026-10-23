# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-10-24
> **Iteration:** 181
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog) · `docs/RESTRUCTURE_V3_PLAN.md` (**active v3 track: stages + findings registry + handoff**)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 181 — audit-181: full viz/tables/rules defect sweep (37 findings, owner-mandated fixes).** The owner commissioned an audit of all visualizations, tables and rule blocks (14 master files, 86 tables, 79 callouts, 17 VS-embeds) and mandated fixes. Closed in one pass, canon-first (every `docs/canon/*.md` mirror edited in pair with master): **visual honesty** — E07 axis relabeled (two scales, grid = lower 10%; was: one axis lying for both sections), E09 legend + cautious-band colors (60–70 added, symmetric «экстремум», C/N amber like A), E17 Top K 40–80 → 40–100 (= «32B+/API» canon; parity needle re-pointed), E05 hex nodes → canonical Elena LIE/NEED/WANT + panel «двигает→блокирует» + grammar, E08 `[Model ↗]` badge unclipped (`text-anchor=end`); **numeric drift** — Examples budget unified to §7A.12 40/60/80 (part_00 «80–120», part_03 «80–120», part_09 «≤120» swept), token calculator re-aligned (slider 80–400, default 180, static total 510, range 400–900 = §7A.13; JS bands + canon desc synced), Omnis note names all 4 extremes + SPINE grounding, Appendix E 4K table re-based inside §7A.12 limits (Examples 2×65–80), stress-type table disjoint bands (N 60–70 vs N>70) with in-band examples; **canon consistency** — Vyshcherblenny LIE unified (full form everywhere incl. ghost-table + chain), «одиночный призрак» label fixed, anchor-price pairs unified (Искренняя забота → вздрагивает/кулаки; Момент близости → руки дрожат — canon L269/285 too), §5.2 OCEAN RULE restatement → §5.1 link, §5.1 inner duplicate → cross-ref, §5.4 pole numerics stripped, type-6 stress example → «тревожное ожидание» (§5.3/JSON), part_02 ready-anchors: concrete triggers + observable prices, AP-8 fix-example gained its Price, false «мульти-персонажность» label corrected (part_01 + part_10 comment + canon); **garbage** — «Продвинуто Опционально», «§4.6, §4.6» ×3, `{{user}}` braces, «(canonical location примера)», AP-10 callout → НАБЛЮДЕНИЕ, AP-2/5/7 gained distinguishing checks (contract §8.2), variant rows labeled with purpose, pseudo-heading → h4, inverted echo fixed, «Елена | Выщербленный» → two links, «якоре» → «якорь» ×2; **a11y** — `scope="col"` on all 302 `<th>`, 3 bare part_09 tables wrapped in `.table-wrap`; **tooling** — `qa:english`/`qa:syntax` wrappers now cross-platform (node spawns `python`/`python3` + `PYTHONIOENCODING`; both gates RUN on Windows now, baselines exact 1/224), `version:check` covers all 4 fence-#9 places (`data/character_schema.json` added), integration test `stdio:'pipe'` → `'inherit'` (EPERM fix — `pnpm test` 68/68 green again through the runner file set), vs-mini-map registry + E18. Sync needles re-pointed to the FIXED state (P0-9, P2-7-syn-04, P3-5, P2-12b, KI#34-table, E17 40–100, token-budget 400–900). Battery after: build 68 / hash `6f563edc` · validate 126 redirects · validate:master 12/12, 0 warn · tests **68/68** · lint · sync **87/87** · 7 cluster gates + audit_vs_embeds PASS · qa:csp/bundle/contrast/doc-versions PASS · baselines english **1** / syntax **224**.

**iter 180 — §3.2 «Иерархия влияния на голос»: ONE numeric surface (owner-caught duplication).** The section rendered the same 6×3 matrix twice — the canonical table and the interactive widget re-drawing its 6 rows — plus two prose echoes (the widget's warning = the RULE callout; the E07 inset = the canonical «Хранилище ≠ Влияние» paragraph). Fixed: the widget is now the table's **control strip** (model toggle → column highlight, Markdown export, one hint line; 6 duplicated rows + bars + warning + hover-sync + the «~100%» sum removed), the inset is gone (the split-axis note stays), the canonical prose is stated once. **Measured:** widget 558 → 149 px · `.vh-row` 6 → 0 · section text 2 669 → 1 882 chars (−29 %) · «~85%» ×2 → ×1 · **CSS debt closed:** `styles.css` 6028 → 5851 (incl. the 87-line E07 style block that was byte-identical to `vs-styles.css` and shipped twice), `vs-styles.css` 3245 → 3212. Guards in `audit_voice_parity.py`: row/bar markup, inset markup and the «Хранилище vs Влияние» title cannot come back. Tooling added: `tools/audit-dom-dup.mjs` (rendered-DOM duplication audit — the source scan could not see widget output).

**iter 179 — post-v3 seam audit (quality pass on the FINISHED corpus): one statement per site.** Measured the whole 68-section master (1 933 sentences): 42 exact cross-section duplicates (36 = printable card payload by design, 4 = per-artifact wayfinding, **2 = real defects**), 75 near-duplicate pairs, **1 duplicate heading**. Closed: **§7A.6 stopped re-printing Appendix E** (pointer + exactly the two hard constraints, retitled «Параметры генерации: две жёсткие константы»); **Appendix E's SP-language ladder de-duplicated** (verbatim rule sentence + restated `<64K/≥128K` ladder removed). Re-measured: duplicates **42 → 39**, duplicate headings **1 → 0**.

**iter 171–177 — v3 S1–S4b:** navigation/entry · guide boundary (Appendix E) · diagnostics/anti-patterns/Part-10 · teaching modules 38 → 26 · F-17 (17 VS-embeds inside sections) · F-18 (3 widgets) · F-19 (one glossary surface, DEC-31).

---

## Invariants

- **Version sync:** canonical 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` + build manifest (`pnpm run version:check`).
- **Navigation contract (iter 171):** ONE navigation surface (the shell TOC panel) — no inline TOC may return. Every section carries `data-toc-nav`; every `data-section` id matches `^p(\d+[ab]?)_` or `^appendix_`; every Part carries exactly one authored `data-part-title`; the TOC Tier-2 label is the section's own first `h2|h3`. Runtime corpus = **68 sections** (appendices A/E render; Appendix D canon-only; Appendix C deleted iter 177, F-19/DEC-31). Guards: `tests/test-toc-coverage.mjs`.
- **Teaching-module de-dup (v3 S4a, iter 174):** Parts 2/3/4/5/6 = 26 sections, one reader job each. Survivors keep their ids; the 12 absorbed ids (`p2_anchor_examples`, `p3_examples_quality`, `p3_joker_case`, `p3_multi_char`, `p4_spine_navigation`, `p4_ghost_layers`, `p4_want`, `p4_spine_mapping`, `p4_spine_check`, `p5_ocean_warning`, `p5_enneagram_wings`, `p6_cot_bridge`) are **redirects to their survivors** — no chains, no reuse. Part 1 heading numbers are consecutive 1.1–1.6 (§1.3 = the block-properties section).
- **OCEAN pole limit single owner (F-01, iter 174):** **§5.1** states the only ladder — recommended **1–2** extreme poles in any context; context ceilings **4K = 2 · 8K = 3 · 16K+ = 4 · 32K+ = 5**; every extreme beyond two needs a SPINE bridge; **4+ unjustified = «Критический»** (§9.5 item 12). §7A.13 / §9.2 / §9.5 / `appendix_character_map` reference it and never restate a threshold.
- **Guide boundary (DEC-27, iter 172):** the model/runtime layer lives in **Appendix E** (`appendix_model_params`); §7A.6 (two hard constraints) / §7A.7 / §7A.10 (collapsed) / §7A.11 are pointers with frozen ids; runtime appendices = **A/C/E** (B absorbed into E; D canon-only). §7A.13 = the payoff and the **single per-card budget calculation**; §7A.12 remains the block-budget owner. Copy-paste templates must not contain markup, repo paths or English maintainer notes.
- **Tests:** **68/68** (`node --test tests/test-*.mjs tests/integration/*.mjs`).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** absent by design (iter 113) — content diagrams = VS-EMBEDs only; no CDN script dependency.
- **CSS:** `src/assets/vs-styles.css` **3212 lines** · `src/shell/styles.css` **5851 lines** (iter 178 removed the retired-widget + chip CSS 7019 → 6028; iter 180 removed the `.vh-row`/`.vh-bar`/`.vh-value`/`.vh-warning` families and the 87-line E07 element-style block that was byte-identical to `vs-styles.css` and shipped twice). The E07/`.chart-*` styles live in `vs-styles.css` only.
- **Canon → master sync:** **87/87** PASS (`scripts/audit_canon_master_sync.py` MUST pass; the two Appendix-C probes retired with F-19).
- **Voice Isolation:** linguistic voice = Examples/Greeting only; physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **Legacy anchor redirects:** every key in `data/anchor-redirects.json` + `ANCHOR_REDIRECTS_FALLBACK` (`src/shell/lazy-loader.js`) MUST resolve to a live manifest anchor — no dead targets, no chains, no self-maps, no key shadowing a live id (`SHELL-REDIRECTS` in `scripts/validate-artifact.mjs` MUST pass; **126 redirects** + 10 fallback after S3/S4a).
- **CORE_DIRECTIVES:** shorthand `{{CORE_DIRECTIVES — ...}}` accepted; #6 = Consequence Driven, #7 = Pre-Generation Filter.
- **SP Language rule:** layered — 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language. **One statement per site (iter 179):** the rule and the ladder live in **§7A.2 RULE**; the threshold detail + model rationale in Appendix E «Язык системного промпта»; the deploy check in §9.5 row 8. E never re-states the rule itself, §7A.2 never re-prints E's rationale.
- **Identity name-language:** canonical form preserved across all card blocks — transliteration forbidden (§7A.1 RULE).
- **Script Tax:** non-Latin scripts ~1.5–2× tokens on 32K vocab; ≥128K → negligible (§7A.12 RULE).
- **Apparatus = 3 widgets (F-18, iter 176):** `src/shell/widgets/` holds **3 content widgets** — `ocean-insight` (`data/ocean.json`), `mbti-composer` (`data/mbti.json`), `persona-voice-hierarchy` (canon §3.2 constants, DEC-21). The 5 VS behaviour scripts live in `src/shell/interactions/` (`vs-e10-enneagram`, `vs-e13-diagnostic`, `vs-e16-author-note`, `vs-scroll-observer`, `vs-mini-map`); shared libs in `src/shell/lib/` (`widget-utils`, `js-flag`). `vs-e10-enneagram` consumes `data/enneagram.json` (fence #8). Root fallbacks `widgets/`, `interactions/`, `lib/` are generated by the build.
- **Apparatus placement (F-17 closed iter 175):** every VS-embed renders **inside its own `<section data-section>`** — zero content outside a section (`validate:master` outside-section check = 0 warnings); each embed carries a canon `[VS: EXX — …]` marker. E01 = §1.2 `p1_card_overview`; E03 = §2.1; E04 = §2.3; E07 = §3.2; E05 = §4.1; E11 = §6.2; E09 = §5.1; E18 = §7B.2. The `<!-- REPLACED BY VISUAL SYSTEM: EXX -->` terminator must stay directly after its embed (the parity gates' embed-region boundary).
- **VS-EMBED E06/E10 (iter 124):** E06 = two-column layout, SVG geometry-only; E10 graph directions = `data/enneagram.json`, hexad complete, arrowheads encode direction; E09/E10 render inside their sections (iter 174).
- **Editorial Policy (DEC-15, iter 122):** all `docs/canon/` + `src/master/` content edits — compress redundant presentation, never unique capability; 5-point functional-load check; UNCLEAR ≠ delete; success ≠ word count.
- **Language policy (DEC-16, iter 123):** two-layer — guide prose/labels/headings Russian (ordinary terminology translated); English only in executable prompt content (with adjacent Russian explanation), technical identifiers, proper names. `qa:english` baseline **1** (must not increase).
- **Glossary single surface (F-19, iter 177/DEC-31):** the DEC-17/18 chain is the ONLY term surface — `docs/canon/glossary_registry.md` (45 entries) → generated `data/glossary.json` → runtime panel + its no-JS twin (`parts/glossary.html`, same 45 terms/order/anchors). Appendix C (25 frozen-v1 entries) is deleted; Part 0 §0.1 carries the one prose pointer; legacy anchors `05_glossary`/`glossary` → `p0_how_to_read`. `scripts/audit_glossary_parity.py` MUST PASS; `data/glossary.json` is generated — never hand-edit.
- **CORE DIRECTIVES single presentation (DEC-08/mig-2):** §7A.2 = the only full definition; E08 = the one visual presentation (SHARED_REFERENCE); everywhere else = `{{CORE_DIRECTIVES — …}}` shorthand; glossary = 1 sentence + link. `audit_core_directives_parity.py` MUST PASS.
- **Token budget single value owner (mig-4; E15 retired iter 172):** §7A.12 = the only canonical budget table + the single per-card calculation (§7A.13 step 6); E01 = the only SHARED_REFERENCE card presentation; Script Tax detail = Appendix E. `audit_token_budget_parity.py` MUST PASS.
- **Enneagram single value owner (mig-5):** **§5.3** = the only canonical 9-type record (renumbered from §5.4 in iter 174; the generator, the parity gate and the E10 embed comment were re-pointed with it); `data/enneagram.json` = **GENERATED** (`scripts/generate_enneagram.mjs` — never hand-edit); LIE lives once (`types[].lie_template`); E10 = SHARED_REFERENCE. `audit_enneagram_parity.py` MUST PASS.
- **Diagnostics single canonical home (mig-3; renumbered by S3):** **§9.3** = the canonical owner of the E13 mapping (E13 embed inside the section); **ONE deploy checklist** (§9.5: 14 numbered items, 5 quick + 9 full, guarded). §9.1 = the single entry route; §9.2 = the flat lookup. `audit_diagnostics_parity.py` MUST PASS.
- **Anti-patterns in one place (v3 S3):** `p8_antipatterns_overview` = the E12 catalog inside the section; `p8_worked_examples` = the 15 `<details>` worked examples; the 15 per-AP ids → redirects. AP-1…AP-15 labels frozen.
- **Voice cluster single value owner (DEC-21; one numeric surface since iter 180):** §3.2 = the canonical owner of the 6×3 influence table (**the only place the matrix is printed**) + the «Хранилище ≠ Влияние» prose block (single statement); **E07** = the one *visual* presentation (bars + split-axis note, no prose inset); **`persona-voice-hierarchy`** = the table's **control strip** (model toggle → `.vh-active-model` column highlight, Markdown export, one hint line) and must never re-render the rows; row-1 label «Недавний чат»; AN-12B framing «пренебрежимо мало (~2%)». `audit_voice_parity.py` MUST PASS (it bans `.vh-row`/`.vh-bar-track`/`inset-box` and the «Хранилище vs Влияние» title from returning).
- **Part 10 payoff index (v3 S3):** `p10_index` is the Part's entry; §10.1–§10.4 numbers/ids frozen; cards stay collapsed; no card template carries teaching prose; no token totals in cards.
- **Sampling values single owner (DEC-22; home = Appendix E by DEC-27):** Appendix E «Параметры генерации» = the only canonical sampling table **and the owner of its rationale + interface caveats**; **§7A.6 «Параметры генерации: две жёсткие константы»** (retitled iter 179 — the TOC title no longer collides with E's subsection) = a pointer line + the two hard constraints, one callout each (PP = 0.0 with the Ollama/LM-Studio blocker · RepPen ≤ 1.10); §7A.7 = pointer; E17 = the one visual presentation (inside Appendix E); E12/§9.x hints model-qualified. `audit_sampling_parity.py` MUST PASS (it also locks the two-callout shape).
- **Callout vocabulary — FOUR labels, ONE treatment (F-20, iter 178/DEC-32):** the only labels are `ПРАВИЛО` (`.callout.rule`), `РЕКОМЕНДАЦИЯ` (`.callout.rec`), `ПРИМЕР` (`.callout.ex`), `НАБЛЮДЕНИЕ` (base `.callout`); every labelled block opens with `<p><strong>LABEL:</strong> …</p>`; nav markers (`Ссылка`/`Синтез`/`Переход`/`Демонстрирует`/`Соглашение`/`Примечание`) and chips (`ШАБЛОН`/`ИЛЛЮСТРАЦИЯ`, class `example-label`) are prose/retired. Guard: `validate-master.mjs` Check 8 (also bans the chip class). Rule-strength mapping (DEC-20): RULE ↔ `.rule`, GUIDELINE ↔ `.rec`, OBSERVATION ↔ base.
- **Visual-markup ownership (DEC-19):** master embed (L2) = the canonical visual markup; `visual-system/` L4/L5 = frozen design artifacts (archive = git history; E01/E07/E08/E10/E12/E15/E17 disposed).
- **v2 architecture (DEC-24/DEC-25):** the ratified spec is law — reader modes Learn/Build/Debug/Reference are structural overlays on one canonical corpus; F6 `<details class="interactive">` = the sanctioned disclosure; the v1→v2 migration, the audits and the switch are COMPLETE (history: `worklog.md`, `docs/research/migration_map_v2.md`). **D-5** (v2 canon format) remains an open owner call and no stage pre-empts it.

Full rules and fences: `AGENTS.md` → Hard fences. Content semantics: `docs/canon/`.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| KI#79 | `scripts/audit_canon_master_drift.py` `P_TAG_RE = <p[^>]*>(.*?)</p>` also matches `<pre>` (and `<path>`/`<picture>` — any `p`-prefixed tag): a `<p>`-match can open on `<pre>` and run to the next literal `</p>`, absorbing code blocks + following paragraphs into one blob. Informational-only tool (exit 0 always) — no reader impact; fix = regex tighten + actionable re-baseline (`PLAN.md` ki-79). | OPEN | 2026-09-14 (iter 130) |
| KI#85 | The v3 findings registry (`F-01`…`F-24`) lives in **`docs/RESTRUCTURE_V3_PLAN.md` §6**, each row with severity + owning stage. **CLOSED iter 178 — every finding is burnt down:** S2 → F-02…F-05; S3 → F-07, F-08, F-11, F-15; S4a (iter 174) → F-01, F-06, F-09, F-10, F-12, F-13, F-14, F-21, F-22, F-23; S4b (iters 175–178) → F-17, F-18, F-19, F-20, F-24. Row retained for 2 iterations per the KI lifecycle, then deleted; the durable trace is plan §6 + DEC-26…DEC-32. | CLOSED iter 178 | 2026-10-22 (iter 171) |
| KI#86 | The v3 research registries (`docs/research/migration_map_v2.md`, `editorial_matrix.md`) still describe pre-v3 ownership/locations and the old § numbers (S2/S3/S4a superseded them). Historical audit record, not reader-facing and not a gate input (the live gates are re-pointed in-step). Section-level notes were added at the v3 slices; full re-keying rides the next registry touch. | OPEN (informational) | 2026-10-22 (iter 172) |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-148 record (durable):** KI#72 (CLOSED iter-145) row deleted per lifecycle — the DEC-22 record + git history (iter-145 commit `0ed3d787`) are the durable trace.
> **iter-145…iter-173 notes (condensed):** KI#72/77/81/82/83/84 and their deletions — see git history; KI#77 deleted per lifecycle at iter 173 (CLOSED iter-168).
> **iter-174 note:** **no new KI** — S4a closed with every gate green and 11 findings burnt down per their records; the S4a decisions are recorded in **DEC-29**. KI#85 updated (S4a items done; the S4b set named). KI#86 broadened (the registries also predate the S4a renumbering). KI#79 unchanged (informational; the merges move the drift boundary family only: actionable 137 → 117).
> **iter-176 note:** no new KI — F-18/F-24 closed. Slot rule applied: deleting a widget
> also removed it from `validate-master` Check 12, from `audit_enneagram_parity` (builder/
> synthesis readers), from `index.html`, and the root fallbacks of the retired scripts; the
> VS scripts moved to `src/shell/interactions/` (paths updated in `build-shell-unified.mjs`,
> `audit_vs_embeds.py`, `audit_enneagram_parity.py`). Dead CSS for the three retired widgets
> is left in place (disclosed; no opportunistic cleanup). Hash changed because the shell
> `index.html` script paths changed — the only source change. KI#85 updated (F-18/F-24 done;
> F-19 owner-gated, F-20 remains).
> **iter-175 note:** **no new KI** — S4b slice 1 closed (F-17: 6 embeds moved inside their sections, `[VS: E09]`/`[VS: E11]`/`[VS: E18]` markers added, the weak `[VS: E03]` completed, E01 §1.1→§1.2 / E11 "preamble" re-pointed). `validate:master` now reports **12/12, 0 warnings**; every parity gate stayed PASS because each moved embed kept its `<!-- REPLACED BY VISUAL SYSTEM: EXX -->` terminator. KI#85 updated (F-17 done; F-18/F-19/F-20/F-24 remain).
> **iter-177 note:** **no new KI** — F-19 closed on the owner-delegated call (DEC-31). Slot
> rule applied: deleting Appendix C also removed its manifest/appendix entry (build
> auto-discovery), its two sync probes (89→87), its drift registry entry (16→15 canon
> files), its `APPENDIX_GUIDE_ORDER` entry (A→E), and its readerpath expectations
> (APPENDIX_ORDER + corpus 69→68). The two legacy glossary anchors re-point to
> `p0_how_to_read`; `data/anchor-redirects.json` was touched — an AGENTS stop-condition,
> executed on the owner's explicit delegation and disclosed in DEC-31 (all 126 targets
> verified live). `data/glossary.json` byte-stable. KI#85 updated (only F-20 remains).
> **iter-178 note:** **no new KI** — F-20 closed; **KI#85 CLOSED** (the v3 findings registry is
> fully burnt down). Slot rule applied: the label change re-pointed 14 sync needles (probe count
> still 87), the readerpath `ШАБЛОН`/`Демонстрирует` checks (now the `<pre><code>` template
> surface + «Карточка демонстрирует:» ×4), and `validate-master` Check 8 (new 4-label guard,
> negative-tested). Dead CSS (F-18 disclosed debt + the chips) removed in the same iteration:
> `styles.css` 7019 → 6028, braces balanced. `build.hash` unchanged (`6f563edc`) — it hashes
> `src/shell/index.html` only (DEC-05).
> **iter-179 note:** **no new KI** — post-v3 seam audit, zero gate changes needed. Slot rule
> applied: §7A.6's heading text changed (id `p7a_sampling_params` frozen; no redirect, no
> inbound-link change), its two-callout shape kept because `audit_sampling_parity.py` locks it
> (one constraint per block — Editorial Policy's one-reader-job rule); Appendix E lost one
> duplicated rule sentence and one restated ladder, so its language subsection is now
> thresholds + rationale only. `docs/canon/*.md` + `src/master/*.md` mirrors edited in pairs;
> no parity/sync/drift needle changed (sync **87/87**, drift actionable **116**, both unchanged),
> `build.hash` unchanged (`6f563edc`, DEC-05). Baseline re-measured: exact cross-section
> sentence duplicates **42 → 39**, duplicate section headings **1 → 0**; the remaining 39 are
> printable card payload (36) + per-artifact wayfinding (3) — classified, not silently dropped.
> **iter-180 note:** **no new KI** — owner-reported duplication in §3.2 (table + widget).
> Slot rule applied: the widget keeps its container id and its 18 parity-locked constants, so
> no anchor/gate/route changed; `audit_voice_parity.py` was re-pointed from "inset present" to
> "inset banned" + "no row/bar re-render" (both guards verified by construction). Two CSS
> files lost 210 lines between them (one of the 87-line E07 blocks was a byte-identical copy
> shipped in both); `.chart-*`/`.split-axis-note` now live only in `vs-styles.css`.
> `build.hash` unchanged (`6f563edc`); syntax baseline **226 → 224** (down, not up).

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

**The v3 RESTRUCTURE (owner-approved, DEC-26) is COMPLETE.** Plan, stages and the 24-finding registry: **`docs/RESTRUCTURE_V3_PLAN.md`** (every finding burnt down; KI#85 CLOSED). v2/v3 is the live site (runtime **68 sections**, hash `6f563edc`).

- **Stage 1–3 DONE** (iters 171–173): navigation + reader entry · guide boundary (Appendix E, §7A pointers, §7A.13 payoff, E15 deleted; DEC-27) · diagnostics + anti-patterns + Part 10 payoff (plan §5.2).
- **Stage 4a DONE** (iter 174): teaching modules 2/3/4/5/6 de-duplicated 38 → 26 sections, F-01 OCEAN single owner, Part 1 numbering (plan §5.3; DEC-29).
- **Stage 4b DONE** (iters 175–178): F-17 (all 17 VS-embeds inside their sections) · F-18 + F-24 (3 widgets; Appendix A promise fulfilled) · F-19 (Appendix C deleted, one glossary surface, DEC-31) · F-20 (4 labels, one treatment, dead CSS removed, validator guard, DEC-32).
- **Post-v3 quality pass DONE** (iter 179): the corpus measured for reader-facing duplication (42 exact / 75 near / 1 heading → 39 / — / 0); the §7A.6 ↔ Appendix E sampling seam and the SP-language family reduced to one statement per site; §7A.6 retitled.
- **Owner-reported duplication closed** (iter 180): §3.2 printed its 6×3 matrix twice — the widget is now the table's control strip, the E07 prose inset is gone, one numeric surface; CSS −210 lines across two files (an 87-line E07 block was shipped in both). Tooling: `tools/audit-dom-dup.mjs` (rendered-DOM audit) — the source-level scan cannot see widget output.
1. **Owner read-through of the delivered HTML** — the current worktree is the review candidate; nothing is committed yet.
2. **D-5 — the v2 canon-format decision — open OWNER CALL** (map §5.24; untouched by the v3 track).
3. **DECISIONS.md is over its ~20-row cap** (32 rows). Every row is cited by ID across `AGENTS.md`/STATUS/code comments, so compaction is an owner call (merge related rows into compound IDs, keep citations resolving) — recorded here, not silently trimmed.
4. **Post-v3 steady state:** content edits resume under the Editorial Policy (DEC-15) + the standing fences; the four-label vocabulary is enforced by `validate-master` Check 8; the "one statement per site" rule (iter 179) applies to pointer sections, and **one numeric surface per table** (iter 180) to any widget that accompanies one. **Superseded (per owner directive — do not auto-resume):** `Fork D 2/3` (sampling widget), `Fork D 3/3`, `dupes-2`; `ki-79`, `cache-bust-1`, `vs-e09-hex`, `obs-3/4/5/6`.

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start. Windows notes: `pnpm` only via `cmd /c "pnpm …"`; python audits need `$env:PYTHONIOENCODING='utf-8'`, and `python3` is not on PATH (use `python`); **never use PowerShell `Get-Content`/`Set-Content` on UTF-8 content files** (it double-encodes — use the editor tools or python with explicit encoding). Every slice must leave the full battery green (iter-180 baseline: the 7 cluster gates ×7 PASS · sync **87/87** · drift actionable **116** (informational) · validate (**126 redirects**) · validate:master **12/12, 0 warnings** · version:check 9.2.6 · tests **68/68** · lint · qa:csp/bundle/contrast PASS · qa:doc-versions exit 0 (1 pre-existing warning) · baselines exact english **1** / syntax **224** · both reader-path tools PASS · runtime **68 sections** · hash **`6f563edc`** · `audit_vs_embeds.py` PASS · callout vocabulary: 4 labels / one treatment). Seven cluster audits MUST PASS: `python scripts/audit_glossary_parity.py`, `audit_core_directives_parity.py`, `audit_token_budget_parity.py`, `audit_enneagram_parity.py`, `audit_diagnostics_parity.py`, `audit_voice_parity.py`, `audit_sampling_parity.py`. `data/glossary.json` and `data/enneagram.json` are **generated** — never hand-edit; term changes go through `docs/canon/glossary_registry.md`, enneagram canonical values through `docs/canon/part_05.md` §5.3.
