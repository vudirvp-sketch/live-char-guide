# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-190-v4-chapters9-10-appendices-final
Agent: lead
Task: v4-9 + v4-10 + the v4 tail — chapter 9 (Parts 8 + 9: one reference, Part 9 7 → 5 sections, one master checklist + RepPen/Temperature/budget/Embodiment), chapter 10 (Part 10 link-free + KI#89), appendices A/B, then the gate re-pointing and the full battery.

Work Log:
- 0: Preflight — drift from HEAD `d6e26ec8`, all v4 work uncommitted (as designed); baseline battery green at 65 sections / 145 anchors / sync 87/87 / tests 68/68 / english 1 / syntax 226. Inventory: Part 8 = 24 anchors (2 sections), Part 9 = 70 (7 sections), Part 1 §1.5 = the top-3 errors (plan says chapter 9 absorbs it), Part 10 = 31, Appendix E = 12, Appendix A = 1.
- 1: **Part 9 7 → 5.** `p9_symptom_table` absorbed into `p9_basic_checklist` (ONE "find it" section: 4-step route → the five most common errors → per-block scan → flat symptom→check→fix lookup); `p9_one_change_rule` absorbed into `p9_test_scenarios`, which became «Правка и проверка» (one-change RULE + Применение + 6 scenarios + element map + 6 metrics). Both ids → live redirects; canon mirrored as 5 sections (9.1 / 9.3 / 9.5 / 9.6 / 9.7 — gaps kept, the §7A.11 precedent, so no § renumbering ripple).
- 2: **`p1_top3_problems` absorbed** (Part 1 6 → 5 sections): the three worst errors are now rows 1–3 of «Пять самых частых ошибок», rows 4–5 are the ex-symptom-table #4/#5 rows — the "строки #4/#5" cross-section numbering retired with the merge; id → redirect `p9_basic_checklist`; the §1.4 synthesis paragraph (sync probe P2-7-syn-01) moved to the end of `p1_core_rules`.
- 3: **The ONE checklist 14 → 18 items** (v4-4's mandate): + RepPen ≤ 1.10 (12B 1.0–1.05), + Temperature by model (12B 0.6–0.8 / 32B+ 0.7–0.9 / API 0.7–1.0), + block budget (SP ≤200 · Description ≤700 · Example ≤80 · Greeting ≤100; ~610 до якорей), + Embodiment in every Example and anchor; the "Владелец" column deleted (pure routing), the Vysh worked example extended to 18 rows, E14's «все 14 проверок» → 18.
- 4: **Part 8 stays a two-section reference but stops routing**: 24 → 0 anchors; the «Как читать каталог» meta and the OCEAN-Overload footnote (pure guide-meta, probe P1-3 → `P1-3-del`) deleted; each of the 15 details keeps ONLY its unique payload (check · distinguishing signal · before/after · criterion) — the symptom/cause/fix triple repeated from the card above was cut under DEC-15 point 1–5 (the card carries the triple; the demonstration has no other home); 2 049 → 1 392 words. The E12 embed is untouched (DEC-19 locked visual markup).
- 5: **Chapter 9 de-linked 94 → 1**: every owner pointer, § number and the intra-chapter routing in Part 9/Part 8 is gone; the ONE surviving link is the Part 10 bridge, moved to the chapter end (§9.7).
- 6: **Chapter 10: 31 → 0 anchors, KI#89 EXECUTED.** Index table 7 → 6 columns (the «Объём» column was only a §7A.13 link farm), the four «Бюджет токенов» blocks → one index line + one fact line per card («Бюджет токенов» ×4 → one line), every OCEAN/CoT/Lorebook/App-E pointer replaced by the fact in place; the placeholder is now the directive list itself — `{{CORE_DIRECTIVES: Show Never Tell, Embodiment First, Spatial & Anatomical Lock, Environmental Reactivity, Influence Boundary, Consequence Driven, Pre-Generation Filter}}` — in the 4 card templates, the §7A.1 template and the §7A.2 shorthand rule (the «канонический шаблон → Part 7A» repo tail is gone from executable content).
- 7: **Appendices A/B: 13 → 2 anchors** — Appendix E's budget/assembly/language/Lorebook pointers became local statements (kept the two capability-table owner refs — CoT tier, voice placement), Appendix A's §7A.1 collision pointer dropped; Appendix E 1 533 → 1 507 words.
- 8: **Ids → redirects (plan-mandated merges, the DEC-33 rule):** +3 (`p9_symptom_table` → `p9_basic_checklist`, `p9_one_change_rule` → `p9_test_scenarios`, `p1_top3_problems` → `p9_basic_checklist`) and 3 legacy keys re-pointed off the new redirects (`p9_additional_problems`, `p9_top5_problems`, `token-budget`) — 129 → 132, all live, no chains (`SHELL-REDIRECTS` PASS). Glossary: the «Правило одного изменения» entry re-homed to `p9_test_scenarios` + its ref re-pointed; the §9.6 heading «Правило одного изменения» restored so the term stays findable in master.
- 9: **Gates re-pointed the honest way, never weakened:** `audit_diagnostics_parity` — new canon locators (§9.1 / §9.3 / §9.5 / §9.6), the 18-item ONE-checklist guard + an 18/18 heading assertion, the one-change rule asserted inside §9.6, and a NEW negative gate that bans the retired routing links; `audit_sampling_parity` — the five-error rows replace the #4/#5 fold guards, §9.7 states its range in place (no §7A.6 ref); `audit_core_directives_parity` — the shorthand constant + the Part-10 form check moved to the new placeholder; `audit_canon_master_sync` — P0-12 needle → «Единый чек-лист (18 пунктов)», P1-3 → `P1-3-del`, still **87**; `readerpath_audit_iter164` — corpus 65 → 62. No gate was relaxed to make a defect pass.
- 10: **Verification (full battery after the last edit):** build **62 sections** · hash `6f563edc` · validate **132 redirects** · validate:master **12/12, 0 warnings** · tests **68/68** · sync **87/87** · 7 cluster parity gates + `audit_vs_embeds` PASS · both reader-path tools PASS · qa csp/bundle/contrast/doc-versions PASS · english **1** / syntax **224** (226 → 224) · version:check 9.2.6 · lint PASS · drift actionable 109 (informational) · tag-balance scan clean on every edited master file.

Stage Summary:
- Chapter 9: Part 9 2 427 → 2 575 words / **70 → 1 anchor**; Part 8 2 049 → 1 392 / **24 → 0**; Part 1 1 177 → 989 / 0.
- Chapter 10: 4 771 → 4 706 words / **31 → 0 anchors**. Appendices: 13 → 2 anchors.
- Whole guide: **145 → 10** internal links, **65 → 62** sections, 132 redirects, runtime hash unchanged (`6f563edc`).
- **The v4 content track is complete.** Next: the owner's read-through of the uncommitted review candidate; the open owner calls (D-5 v2 canon format; DECISIONS.md over its cap) are unchanged.

---

Task ID: iter-189-v4-chapters7-8-budget-assembly
Agent: lead
Task: v4-8 — chapters 7 (what the card costs) + 8 (assembly end-to-end): the 4K profile absorbed into the budget section, the assembly chapter reduced to its six-step table + the one per-card budget, both link-free.

Work Log:
- 0: Preflight — §7A.12 carried 2 anchors (both to Appendix E), §7A.13 carried 22 (a routing hub into Parts 1–10), §7A.11 was a 43-word pointer with 2 links and no reader job of its own. Gate-locked surfaces: the §7A.12 table rows/values, the Script Tax RULE, the sub-budget table, the «400–900» calculator, the E01 embed, and E02's embed terminator.
- 1: **§7A.11 absorbed:** one paragraph «Что помещается в 4K» inside §7A.12 (System Prompt 50 · Description 150 · два Examples по 40 · Greeting 40 ≈ 320 токенов до якорей + «отключать, а не сжимать»); the id → redirect `p7a_token_budget`, the legacy key `4k-fallback` re-pointed (its old target had become a redirect), the glossary entry's home/ref re-pointed, AP-14's owner label + link in Part 8 re-pointed to §7A.12.
- 2: **§7A.12 de-linked:** the model-limits and Script-Tax appendix pointers replaced by the facts themselves — the Script Tax coefficient is now stated in place (~1.5–2× на 32K-словаре, пренебрежимо на ≥128K). The canonical table, the sub-budgets, the calculator and both RULEs are untouched (token-budget parity green).
- 3: **§7A.13 rebuilt as the six-step table** (step → what you do → Elena's result) + the one per-card budget table. Cut as repeats: the assembled-SP copy (§7A.1 owns it), the SPINE copy (Part 4), the CoT copy (Part 6), the «Дополнительные шаги» list (Parts 4/5/6/7B), the closing checklist (its own summary said it duplicated §1.4/§4.6/§5.1/§6.1/§7A.12 — the ONE master checklist is §9.5), and the two transitions. Fixed a stale cell: the Examples row read «7 директив» → ~120 under the 80–240 envelope; the ~610 total is unchanged and arithmetic-consistent.
- 4: **Gates re-pointed the honest way — negative gates + content assertions, never weakened:** reader-path BUILD — retired link sets for the prebuild profile and both Build chapters, the six step rows + «~610» + «400–900» + the budget-table/4K tokens asserted, and the ONE master checklist now asserted in §9.5; core-directives — the §7A.13 *format mention* asserted and re-linking §7A.2 banned; sync — P0-2 and P2-7-syn-07a moved to ABSENT_CHECKS, P1-10 re-pointed to `part_07b.html` (the Lorebook example's new home), still **87 checks**; reader-path corpus count 66 → 65.
- 5: **Verification (full battery after the last edit):** build 65 sections · hash `6f563edc` · validate **129 redirects** · validate:master **12/12, 0 warnings** · tests 68/68 · sync **87/87** · 7 cluster parity gates + `audit_vs_embeds` PASS · both reader-path tools PASS · qa csp/bundle/contrast/doc-versions PASS · english **1** / syntax **224** · lint PASS · drift actionable 112 → 109 · tag-balance scan clean on the three edited master files.

Stage Summary:
- §7A.12 380 → 404 words (the 4K paragraph lands here), §7A.13 1 081 → 384; their anchors 4 + 22 → 0.
- Corpus: 66 → 65 sections, anchors 172 → 145, words 26 664 → 25 943.
- Next: chapter 9 (Part 8 + Part 9 — 94 anchors; one master checklist + 7 → 5 sections), then chapter 10 (Part 10 + KI#89), appendices A/B.

---

Task ID: iter-188-v4-chapters5-6-lorebook-greeting
Agent: lead
Task: v4-7 — chapters 5 (Greeting) + 6 (Lorebook, AN, injections): greeting as a single site, lorebook 3 → 2 sections, structured inject absorbed into the AN section.

Work Log:
- 0: Preflight — Part 7B held 5 sections / 8 anchors: three lorebook sections carried 6, the greeting 1 (to the Part-10 canonical greeting), the structured-inject stub none. Plan §2 requires 3 lorebook sections → 2 and the injection absorbed; the glossary registry homes two of the retired ids and legacy anchors resolve into them, so **the owner was asked (AGENTS stop-condition on `data/anchor-redirects.json`) and called it in this iteration: merges retire the absorbed ids to legacy redirects, glossary re-pointed, disclosed.**
- 1: **Chapter 5 — greeting:** the intro stopped narrating the guide («алгоритм показан ниже… пример ниже») and now states the job — four fixed steps, and why the order cannot be rearranged (the hook works only after the scene is seen). The НАБЛЮДЕНИЕ callout lost its Part-10 routing sentence and now says locally that this is a teaching scene, not a ready card block; the probe prefix P3-1-7b is kept verbatim. The E18 embed and the worked example are untouched. 290 words, anchors **1 → 0**.
- 2: **Chapter 6 — lorebook 3 → 2:** `p7b_lorebook_basics` = «структура записи» (record table, parameter table, rules, the four worked examples, and the `EVENT:` support fact stated in place instead of the appendix pointer); `p7b_lorebook_mechanics` = «механики и бюджет», absorbing the advanced table (fatigue / meta-lore / false memory), the context-budget table and the integration checklist, plus the content-injection example; `p7b_lorebook_advanced` → redirect. The two cross-section transitions and the closing «→ Part 8» hop are gone; the РЕКОМЕНДАЦИЯ that routed to mechanics now states the Description boundary the reader needs before writing a record.
- 3: **Structured inject absorbed (chapter 6's AN half):** the 54-word stub section became one `<h4>` inside `p7a_authors_note` — definition, the three constraints, the XML example — and its id → redirect `p7a_authors_note`. The AN section also lost two plain-text pointers (`см. → Part 4`, `см. Выщербленный §10.4`). Probe-locked strings kept verbatim: P0-4 «после седьмого…», P1-2 «Счётчик вырезаний» row, P1-11 «Пример 1».
- 4: **Ids → redirects (owner-approved):** `data/anchor-redirects.json` +2 (`p7b_structured_inject` → `p7a_authors_note`, `p7b_lorebook_advanced` → `p7b_lorebook_mechanics`); the legacy key `structured-inject` was re-pointed to the live target (it had become a chain once its old target retired). 126 → **128 redirects**, every target live (`SHELL-REDIRECTS` PASS, no chains / no shadowing).
- 5: **Glossary re-pointed:** registry `home` for Structured Inject → `p7a_authors_note`, AN's `xrefs` dropped, Lorebook `xrefs` → mechanics only; the canon § numbers in the three ref lines corrected; `data/glossary.json` + the no-JS page regenerated by the build (45 terms, parity gate PASS). Stale §7B references re-pointed in the same slot-rule pass: `src/master/part_08/09/10` + `appendix_model_params`, `docs/canon/part_08/09/10` + `appendix_model_params` + `appendix_character_map`, `docs/elena_character_bible.md`, `docs/content_map.md`, `AGENT_NAVIGATION.md` (§8 pairs retired, section count 66).
- 6: **Corpus:** 66 sections (Part 7B 5 → 3); the reader-path expectation moved 68 → 66; `p7b_greeting` now carries the Part's `data-part-title` (the absorbed stub used to).
- 7: **Defect caught by the battery, not by a reader:** the reader-path audit's BUILD B2 still expected the chapter-0 profile to link §7A.13 / §7A.12 / Part 10 / the appendix — v4-2 (iter 183) had de-linked it by design, so that gate had been red for iters 183–187 while STATUS claimed both reader-path tools PASS. Fixed the honest way: the link-set expectation became a **negative** gate (the retired routing must not come back) and the three decision axes are asserted as text. Recorded as KI#88 (opened + closed in this iteration).
- 8: **Verification (full battery after the last edit):** build 66 sections · hash `6f563edc` · validate **128 redirects** · validate:master **12/12, 0 warnings** · tests **68/68** · sync **87/87** · 7 cluster parity gates + `audit_vs_embeds` PASS · both reader-path tools PASS · qa csp/bundle/contrast/doc-versions PASS · english **1** / syntax **224** (baselines exact) · version:check 9.2.6 · lint PASS · drift actionable 116 → 112 (informational).

Stage Summary:
- Greeting 290 words / 0 anchors · lorebook basics 401 / 0 · lorebook mechanics 608 / 0 (the advanced section's 303 absorbed) · AN 471 → 530 (holds the injection technique now), 0 anchors.
- Part 7B: 1 364 → 1 299 words, anchors **8 → 0**; corpus anchors **180 → 172**.
- Next: chapters 7–8 (`p7a_token_budget` + `p7a_assembly_pipeline`, both in Part 7A — 2 + 22 anchors), then chapter 9 (Parts 8 + 9), 10 (Part 10), appendices A/B.

---

Task ID: iter-187-v4-chapter4-voice
Agent: lead
Task: v4-6 — chapter 4 (Examples: voice): Part 3 anchor-free; the pure-redirect section replaced by a local check.

Work Log:
- 0: Preflight — Part 3 held 8 anchors over 5 sections; `p3_greeting_ref` was a 35-word pure redirect to Part 7B (flagged by the reader audit as a section with no job of its own); the voice-parity gate locks the §3.2 table + prose + widget + a 12B RULE phrase.
- 1: **§3.1:** the physical-voice bullet lost its Part-2 pointer (the sensor layer is named in place); the methodology caveat lost its Part-1 pointer (probe P3-6 re-pointed); the Pattern-Matcher rule became a local statement.
- 2: **§3.2:** the 12B RULE lost its self-part link; its audited phrase «Description = 0% влияния на лингвистический голос» was preserved — **the voice-parity gate failed the first draft of that sentence and the text was re-worded around the anchor rather than weakening the gate**.
- 3: **§3.3:** Examples length bullet dropped its §7A.12 parenthetical; quality-grade disambiguation left intact (probe-locked and still useful).
- 4: **§3.4 repurposed:** «Приветствие (Greeting Message)» (a redirect) → «Проверка голоса», a 7-point local gate (voice audible without description, `<START>` in every block, a physical reaction per block, no two identical blocks, markup matches Format Lock, no narrator bleed, three non-overlapping markers per character in a multi-character scene). Id unchanged → no redirect needed; the chapter now ends with a check instead of a hop.
- 5: **§3.5:** Voice Bleed states the error and the cure locally (AP-11 link gone); the cross-cutting-characters paragraph lost the Part-10 link and the «в остальных Parts гайда» guide-meta (probe prefix kept verbatim).
- 6: **Canon mirror:** `docs/canon/part_03.md` §3.4 rebuilt as the check, six lines patched (the physical-voice line needed a second pass — first prefix missed the leading list dash).
- 7: **Tag hygiene:** 5 unmatched `</p>` from the splices caught by the iter-184 scanner.
- 8: **Verification:** build 68 sections · hash `6f563edc` · validate 126 redirects · validate:master 12/12, 0 warnings · tests 68/68 · sync **87/87** · 8 parity gates PASS · english **1** / syntax **224** · lint PASS.

Stage Summary:
- Part 3: 1 584 → 1 644 words (the new 7-point check adds ~70), anchors **8 → 0**.
- Corpus: 23 261 → 23 305 words; anchors **188 → 180** (`part_09` = 70, `part_07a` = 33, `part_10` = 31 remain).
- Next: chapters 5–6 (Greeting + Lorebook/AN) — both in Part 7B.

---

Task ID: iter-186-v4-chapter3-behaviour
Agent: lead
Task: v4-5 — chapter 3 (Examples: behaviour): Part 2 (anchors) + Part 6 (CoT) anchor-free.

Work Log:
- 0: Preflight — Part 2 held 3 anchors over 5 sections, Part 6 held 5 over 5; the probes require the price-table header, the Tier-0 row and the bridge paragraph to survive.
- 1: **§2.1:** the E03-meta intro («показан выше… дополняет E03, не дублирует») replaced by the actual rule: three steps are rigid, a deferred/abstract price kills the anchor.
- 2: **§2.2:** FLAW rule de-linked (the statement is self-contained); the deferred-price rule lost its §2.1 self-reference; the price-type table's Walter cell lost the Part-10 reference; the influence-boundary rule kept its one-sentence reminder without the CORE-#5 link.
- 3: **§2.3:** E04-meta intro replaced by the layer logic; the duplicate sensor-layer paragraph below the table deleted.
- 4: **§2.5:** the sensory-anchor definition stopped forward-referencing GHOST Layers (they appear later in the reading order) and now explains why sensory anchors exist (a trigger reaches the past before the character can think).
- 5: **§6.1:** CoT intro lost the model-note chip and the «three systems» map; the limit rule dropped the AP-10 label and kept the operational reason; the tiers link became «в таблице ниже».
- 6: **§6.2:** the tiers intro states Tier 0 locally (no Part-2 link); the table intro lost the E11-meta sentence; the duplicate «визуальная версия» line deleted; the E11 panel's parenthetical reduced to «State → Body → Sensor → Speech» (embed markup untouched, marker intact, `audit_vs_embeds` PASS).
- 7: **§6.4/§6.5:** Tier 3 etymology removed (the practical note kept); the overload rule de-linked from AP-10; the bridge paragraph kept its probed wording and lost the trailing Part-7A link.
- 8: **Canon mirror:** `docs/canon/part_02.md` + `part_06.md` patched line-for-line in pair.
- 9: **Tag hygiene:** 11 unmatched `</p>` from the splices caught by the iter-184 scanner and removed before the battery.
- 10: **Verification:** build 68 sections · hash `6f563edc` · validate 126 redirects · validate:master 12/12, 0 warnings · tests 68/68 · sync **87/87** · 8 parity gates PASS · english **1** / syntax **224** · lint PASS.

Stage Summary:
- Part 2: 903 → 873 words, anchors **3 → 0**. Part 6: 817 → 738 words, anchors **5 → 0**.
- Corpus: 23 370 → 23 261 words; anchors **196 → 188** (`part_09` = 70, `part_07a` = 33, `part_10` = 31 remain).
- Next: chapter 4 (Examples: voice) — Part 3 (8 anchors), then chapter 5 (Greeting).

---

Task ID: iter-185-v4-chapter2-ocean
Agent: lead
Task: v4-4 — finish chapter 2: Part 5 (OCEAN + typology) anchor-free.

Work Log:
- 0: Preflight — Part 5 held 19 anchors over 5 sections; §5.1 alone carried five reader jobs (dimensions / stress type / pole ceilings / overload / framework choice) plus a second pentagon.
- 1: **§5.1 opener** now states the job («проверяет SPINE числами; SPINE уже построен — OCEAN ничего не генерирует») and the «90% карточек» line without § pointers; the two RULE callouts keep the probed pole ladder verbatim and drop «см. §9.5 пункт 12» / self-references.
- 2: **Stress-type table:** the «Елена при усилении N до экстремальной зоны (проекция её cautious-зоны)» hedge (a hypothetical stacked on a hypothetical) replaced with an in-band example; row 3 keeps the canonical Elena reading.
- 3: **Trigger chain:** the «источник в гайде» column (three § cells) and the «каждый этап уже определён в гайде» paragraph removed; the Elena chain table now carries content only.
- 4: **Ceilings / overload:** the «единственная шкала лимита» guide-meta replaced by a reader-facing sentence; the self-link rule rewritten as a usable test («если не можете назвать элемент SPINE — черта лишняя»); the 16K+ row and scenario 3 lost their Part-10 links.
- 5: **Widget:** the pentagon kept (required container) but stopped posing as an «OCEAN×Enneagram check» — retitled «Интерактивный OCEAN-профиль», with a one-sentence description.
- 6: **Decision tree** retitled «Когда нужен OCEAN, а когда Enneagram» and de-referenced (4 rows, no § numbers); the `§7A.13` build link after the widget deleted.
- 7: **§5.2:** three self-links removed — zone labels (30–40 / 60–70) and the pole rule are stated in place.
- 8: **§5.3–§5.5:** textual de-linking only (`[ref:]`/§ → local phrasing); all tables untouched, including the generated Enneagram record — `data/enneagram.json` came out byte-identical.
- 9: **Canon mirror:** `docs/canon/part_05.md` §5.1–§5.2 rebuilt in pair, §5.3–§5.5 text-patched; E09/E10 markers preserved; `generate_enneagram.mjs` still parses the same table (build green, no data change).
- 10: **Tag hygiene:** the iter-184 stack scanner caught 7 unmatched `</p>` + 1 `</div>` from the splices; removed before the battery.
- 11: **Verification:** build 68 sections · hash `6f563edc` · validate 126 redirects · validate:master 12/12, 0 warnings · tests 68/68 · sync **87/87** · 8 parity gates PASS · english **1** / syntax **224** · lint PASS.

Stage Summary:
- Part 5: 2 601 → 2 488 words, anchors **19 → 0**.
- Corpus: 23 436 → 23 370 words; anchors **215 → 196** (`part_09` = 70, `part_07a` = 33, `part_10` = 31 are the remaining pools).
- Next: chapter 3 (Examples: behaviour) — Part 2 (anchors) + Part 6 (CoT).

---

Task ID: iter-184-v4-chapter2-spine
Agent: lead
Task: v4-3 — chapter 2 core: Part 4 (SPINE) as one self-contained place, zero cross-chapter anchors.

Work Log:
- 0: Preflight — worktree carried iters 182–183; measured Part 4 (2 104 words, 9 anchors, 6 sections) and its 11 sync probes.
- 1: **§4.1:** the anchors-comparison and «структура — VS-EMBED E05 выше» meta dropped; the «поэлементно §4.2–§4.5» routing sentence deleted; the roadmap paragraph (Part 5/6/7A/7B/10) replaced by one line about the OCEAN numeric check; the simplification recommendation states its own check instead of a § reference.
- 2: **§4.2 GHOST:** the LIE column removed from the canonical table (the GHOST↔LIE pair now lives once, in §4.3); the four Elena/one-GHOST repetitions collapsed to one sentence; the Walter cross-ref deleted (probe → `ABSENT_CHECKS`); the layers-example intro de-meta'd («показаны в VS-EMBED E06 выше» gone).
- 3: **§4.3 LIE** gained the derivation rule the old table implied: LIE sounds like the character speaking about himself; «люди плохие» is an evaluation, not a lie.
- 4: **§4.4 FLAW:** two ❌/✅ tables merged into one (both probed rows kept); the FLAW-linked rule states the requirement and points to the algorithm at the end of the part (no §-link).
- 5: **§4.5 NEED:** the WANT-only table and the paired table merged into one WANT↔NEED table; the probed variant row kept verbatim.
- 6: **§4.6 full chain:** the infographic mnemonic deleted (the map table below carries the same five mappings, richer); «см. VS-EMBED E05 в §4.1» and both Part-10 links dropped; anchor-type definitions compressed to one paragraph; the duplicate Elena anchor table deleted (the map's FLAW row already carries that anchor); the Consequence-Driven model note rewritten without links; the SPINE checklist lost its Lorebook row (7 → 6; Lorebook facts are Part 7B's domain).
- 7: **Canon mirror:** `docs/canon/part_04.md` 4.1–4.6 rebuilt in pair (E05/E06 `[VS:]` markers preserved); probe P3-4b moved to `ABSENT_CHECKS` (87 total kept).
- 8: **Verification:** build 68 sections · hash `6f563edc` · validate 126 redirects · validate:master 12/12, 0 warnings · tests 68/68 · sync **87/87** · 8 parity gates PASS · english **1** / syntax **224** · lint PASS.
- 9: **Defect class caught by a self-check (KI#87 opened):** the span-splice edits left 7 unmatched `</div>` + 4 unmatched `</p>` in part_01/part_04/part_07a, and every gate stayed green because `validate-master.mjs` does not check tag balance. Found with a stack scanner, removed only the unmatched closers, rebuilt, full battery re-run green. KI#87 records the missing guard (add a balance check to Check 4).

Stage Summary:
- Part 4: 2 104 → 1 848 words, anchors **9 → 0**.
- Corpus: 23 713 → 23 436 words; anchors **224 → 215** (`part_09` = 70, `part_07a` = 33, `part_10` = 31 remain the pools).
- Next: finish chapter 2 — Part 5 (OCEAN, `p5_cross_*` collapse, Enneagram/MBTI collapsed).

---

Task ID: iter-183-v4-chapter0
Agent: lead
Task: v4-2 — chapter 0 «Что строим» (Part 0 + Part 1) as one self-contained place, zero cross-chapter anchors.

Work Log:
- 0: Preflight — worktree carried the iter-182 pilot; BASE_COMMIT `d6e26ec8`. Read the Part 0/1 corpus, the 10 sync probes for `part_01`, and the canon mirrors.
- 1: **Part 0:** 11-row module map (a duplicate of the TOC panel) → 5-block anatomy table; three routes → one linear route + one escape; TL;DR → the six build steps only (token numbers and the budget link removed); the «примеры намеренно сухие» note moved here from Part 1 and cut to one paragraph; glossary sentence kept with its no-JS page link.
- 2: **Part 1:** the «Ключевые термины» list (4 definitions + 4 «см. Part N») deleted by design — each term is defined where it is used, the glossary panel is the single term surface; the anchors-placement RULE callout (third copy) deleted; all three top-3 fixes now carry the fix instead of routing to Part 2/3/8/9; the profile table lost every link and every number not owned by §7A.12 (4K/8K/16K+ → minimal/standard/max budget vocabulary); the recommendation kept its canonical wording minus the four § refs.
- 3: **Probes:** P2-1a / P2-1b / P3-4a moved CHECKS → ABSENT_CHECKS (the retired sites must not return); total stayed **87** (84 positive + 3 negative).
- 4: **Canon mirror:** `docs/canon/part_00.md` + `part_01.md` rewritten in pair; header `last_synced` updated.
- 5: **Defect caught by a gate:** the card-overview splice left a duplicated `</section>` → validate:master Check 4 warning; fixed at the source (12/12, 0 warnings).
- 6: **Verification:** build 68 sections · hash `6f563edc` · validate 126 redirects · validate:master 12/12, 0 warnings · tests 68/68 · sync **87/87** · 8 parity gates PASS · english **1** / syntax **224** · lint PASS.

Stage Summary:
- Chapter 0: 2 341 → 1 542 words (−34 %), internal anchors **19 → 0**.
- Corpus: 24 046 → 23 713 words; anchors **270 → 224** (`part_09` = 70, `part_07a` = 33, `part_10` = 31 are the next pools).
- Next: chapter 2 (Description: SPINE + OCEAN) — Part 4 + §5.1/§5.2, `p5_cross_*` collapse.

---

Task ID: iters 179–182 (one-line summaries)
- iter 182 — v4 pilot, chapter 1 (System Prompt): §7A.1 rewritten as six elements + order, CORE DIRECTIVES/Tone Frame/Format Lock de-meta'd, cluster 5 → 0 links (1 631 → 1 357 words); 3 sync probes re-pointed. Detail: git + STATUS iter-182.
- iter 181 — owner-mandated audit fix sweep (37 findings: 16 P1 / 18 P2 / 3 tooling — visual honesty E07/E09/E17/E08, numeric drift unified to the §7A.12/§7A.13 owners, canon consistency, garbage; `scope="col"` ×302; `qa:english`/`qa:syntax` made runnable on Windows, `version:check` 4th place, integration-test EPERM fix; parity needles re-pointed to the FIXED state). Detail: git + this worklog’s previous revision.
- iter 180 — §3.2 «Иерархия влияния на голос»: one numeric surface (widget → control strip + export; E07 prose inset removed; CSS −210 across two files; `tools/audit-dom-dup.mjs` added). Detail: git + DEC-15/DEC-21.
- iter 179 — post-v3 seam audit: measured the finished corpus (42 exact / 75 near cross-section duplicates → 39 / —; 1 duplicate heading → 0); §7A.6 stopped re-printing Appendix E (pointer + the two hard constraints, retitled «Параметры генерации: две жёсткие константы»), Appendix E's SP-language ladder reduced to one statement per site. Detail: git + this worklog's previous revision.

---

Task ID: iters 165–178 (one-line summaries, condensed)
- iter 175 — v3 S4b slice 1: **F-17 closed** — six VS-embeds (E01/E03/E04/E05/E07/E11) moved inside their canonical sections (E01 → §1.2, E11 → §6.2), canon markers completed (`[VS: E09]`/`[VS: E11]`/`[VS: E18]`, `[VS: E03]` fixed), `validate:master` warnings 6 → 0; browser proof 17/17 embeds inside sections. Detail: git + plan §5.4.
- iter 176 — v3 S4b slice 2: **F-18 + F-24 closed** — the apparatus is 3 content widgets (`ocean-insight`, `mbti-composer`, `persona-voice-hierarchy`), the 5 VS scripts moved to `src/shell/interactions/`, `widget-utils`/`js-flag` to `src/shell/lib/`; `persona-cross`/`persona-synthesis` replaced by the static 5×9 §5.5 matrix + the «сверка трёх систем» protocol; `enneagram-builder` SPINE autofill removed and the §5.3 contradiction fixed; hash `c1518874` → `6f563edc`. Detail: git + plan §5.4.
- iter 177 — v3 S4b slice 3: **F-19 closed** — Appendix C (25 frozen-v1 terms) deleted; the registry → generated `glossary.json` → panel/no-JS chain is the only glossary surface; Part 0 prose pointer added; legacy anchors → `p0_how_to_read`; corpus 69 → 68; sync 89 → 87. Detail: git + DEC-31.
- iter 178 — v3 S4b slice 4: **F-20 closed** (four labels, one treatment; 44 chips retired; `styles.css` 7019 → 6028; validator Check 8 guard) — the v3 track COMPLETE, KI#85 CLOSED. Detail: git + DEC-32.
- iter 174 — v3 S4a: teaching modules 2/3/4/5/6 de-duplicated 38 → 26 sections, one owner per rule (F-01 OCEAN ladder in §5.1; DEC-29).
- iter 173 — v3 S3: Part 9 11 → 7 (one troubleshooting instrument), Part 8 16 → 2 (catalog + worked examples), Part 10 4 → 5 (index + cards); 20 redirects + `audit_diagnostics_parity.py` ONE-checklist guard; build 81 sections, sync 89 probes. Detail: git + plan §5.2.
- iter 172 — v3 S2: guide boundary drawn — Appendix E «Параметры генерации» created (absorbs Appendix B, sampling values move there), E15 deleted, §7A.13 = the single per-card budget calculation, copy-paste templates cleaned (F-02…F-05), §7A.6/§7A.7/§7A.10/§7A.11 → pointers with frozen ids; sync 97 → 95 probes; build 98 → 97 sections. Detail: git + DEC-27.
- iter 171 — v3 S1: one navigation surface (TOC contract + `data-part-title` ×12 + `data-toc-nav` ×50, inline TOC deleted), Part 0 rewritten as a reader on-ramp, `tests/test-toc-coverage.mjs`; build 98 sections. Detail: git + `docs/RESTRUCTURE_V3_PLAN.md` §4 / DEC-26.
- iter 165 — doc-only: the switch-time owner-call package `docs/research/owner_gates_iter165.md` (G1–G4, nothing DECIDED).
- iter 166–169 — the owner-called reconciliations: the §7A.7 capability alignment + the 27-item enrichment batch; KI#77-e closed (Appendix D ranges illustrative, §7A.12 the sole normative budget owner); Part 0 wired into the runtime corpus (96→98) + the noscript glossary link (hash `c1518874`). Detail: git `0b1429fd`.

