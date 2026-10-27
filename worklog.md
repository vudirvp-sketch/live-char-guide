# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-206-leftover-findings
Agent: lead
Task: the reader-facing findings left after iterations A–E — vocabulary vs context, the three meanings of «пять блоков», the CoT ceiling, the bilingual executable blocks and the Marina contradiction.

BASE: 3cbbe7e0

Work Log:
- 0: Preflight — worktree clean, HEAD `3cbbe7e0`; re-read the audit's §4.9/§4.10 leftovers against the published text.
- 1: **Appendix E category error:** the «Размер словаря» row listed Claude 200K / GPT-4 128K / Gemini 1M+ — context windows, not vocabularies. Row renamed «Размер словаря (не контекст)»; API cell = «Не публикуется вендорами; модели мультиязычны — Script Tax низкий». Canon mirror updated.
- 2: **«Пять блоков» disambiguated:** Part 0 = «четыре обязательных блока и один надстраиваемый»; Part 1 = four required + anchors-tag-inside-Description + optional Lorebook; §7A.12 = five TABLE ROWS (four blocks + the anchors row, which rides the Description budget). Canon mirrors updated.
- 3: **CoT ceiling:** §6 rule «не более 2–3 CoT-якорей» → «1–2, максимум 2»; §9 symptom row «2–3» → «1–2»; checklist item 14 «не более 2–3» → «не более 2» (master + canon). The cards already used 2.
- 4: **Bilingual executable blocks:** OOC Protection and Immersion Boundary had English + Russian inside one `<pre><code>`; now English-only inside the block with the Russian translation as `<small>` beside it (DEC-16), and the OOC cost claim corrected ~15 → ~25 tokens (the old number counted the English half only).
- 5: **Marina:** the third Lorebook example («контакт Елены») described a person Elena «почти доверяла» under the name of the editor who stole her story; renamed to Ольга (key + content, master + canon) — the guide now has exactly one Marina.
- 6: **Verification:** build 61 sections · hash `8b3a917d` · tests **91/91** · validate 12 + 133 redirects · validate:master **13/13** · sync 87/87 · 8 parity gates PASS · reader-path PASS · english **1** / syntax **224** · lint 0.

Verification: green. Remaining audit item = S6 (§7A.7 deletion) — owner-gated redirect change.

Task ID: iter-205-support-and-notation
Agent: lead
Task: audit v2 iteration E — the no-JS glossary page, the OCEAN widget's boundary/copy defects, and the last section-glyph debt in comments.

BASE: b26ded80

Work Log:
- 0: Preflight — worktree clean, HEAD `b26ded80`. Read `generateGlossaryHTML()` (fragment-only), the OCEAN widget's state/copy functions, and counted the remaining § glyphs (25 master + 30 shell/widget, all inside comments).
- 1: **Glossary page** (`scripts/build-unified.mjs`): emits `<!DOCTYPE html>` with `<head>` (charset, viewport, title, description), palette styles matching the guide's soft dark, «← Live Character Guide» back link, measured term count, and `href="../index.html#<anchor>"` per term (was `#<anchor>` — dead on a standalone page). The `no-js-only` marker is kept (reader-path gate anchor). Browser: 48 terms, 48 refs, styled page, working back link.
- 2: **OCEAN widget** (`ocean-insight.js`): `<= 30`/`>= 70` → `< 30`/`> 70` in `getState`, `getTraitLabel`, `countExtrema`, the forecast and the extrema summary; `generateCopyText` returns the canonical compact `<ocean>…</ocean>` tag instead of a narrative list. Browser-proofs: 30/70 = «Умеренная», 29 = low label, 71 = high label; captured copy = `<ocean>O:72 C:65 E:41 A:38 N:68</ocean>`.
- 3: **Notation debt**: removed the remaining 55 `§` glyphs from master HTML comments and shell/widget JS comments (comments only — visible text was already at zero since iter 201); `audit_enneagram_parity.py` accepts the glyph-free E10 derivation reference.
- 4: **Verify:** build 61 sections · hash `8b3a917d` · tests **91/91** · validate 12 gates + 133 redirects · validate:master **13/13** · sync 87/87 · 8 parity gates PASS · reader-path PASS · lint 0.
- 5: **Deliberately not done:** regenerating the six missing E-prototypes (E01/E07/E08/E10/E12/E17) — DEC-19 freezes `visual-system/` as design artifacts, every embed is live with no 404, and the audit classes it maintenance; the OCEAN widget's Enneagram forecast declaration and static `high/low` labels stay recorded in `PLAN.md` a2-E.

Verification: green. S6 (§7A.7 deletion) remains an owner-gated redirect call.

Task ID: iter-204-visuals-glossary
Agent: lead
Task: audit v2 iteration D2 — the three visual defects the v1/v2 audit measured (E04 funnel widths, E07 clipped strip, E08 badge) and the glossary rendering defect (markdown backticks + a live `<anchors>` tag on both reader surfaces).

BASE: e3d36281

Work Log:
- 0: Preflight — worktree clean, HEAD `e3d36281`. Located the embeds: E04 in `part_02` (`.funnel-stack`), E07 SVG in `part_03`, E08 SVG in `part_07a`; the funnel rules ship TWICE (`vs-styles.css` + `shell/styles.css`), so both were patched.
- 1: **E04.** `nth-of-type` counts all `div` siblings of the stack (link-back = 1, bar = 2, arrow = 3, …), and the rules targeted `1/3/5/7` — the link-back and arrows, never a bar. Re-pointed to `2/4/6/8` for widths and transition delays in both files. Browser: bar widths 600/510/420/330 px = **100/85/70/55 %**.
- 2: **E07.** The last `rect.bar-rect` was `y=410 h=12` → bottom 422 inside `viewBox="0 0 780 420"`; moved to `y=408`. Browser: all 16 strip rects end ≤ 420, last one exactly 420.
- 3: **E08.** Directive 7's `<text class="model-badge">[Model ↗]</text>` lacked `text-anchor` (directive 6's had `end`), so it overflowed the node frame; added `text-anchor="end"`. Browser `getBBox`: text right 625, frame right 630.
- 4: **Glossary rendering.** `data/glossary.json` definitions are plain text with markdown backticks; the panel (`loadGlossaryContent`) and the no-JS generator (`build-unified.mjs` → `parts/glossary.html`) both interpolated them as HTML — hence literal backticks and a real `<anchors>` element. Both now escape (`& < > " '`) and then convert `` `x` `` → `<code>x</code>`. Browser-proved on the panel and on `/parts/glossary.html`: `&lt;anchors&gt;` in the DOM, zero `anchors` elements, `<code>` present, no backticks in text.
- 5: **Verification:** build 61 sections · hash `8b3a917d` · tests **91/91** · validate 12 gates + 133 redirects · validate:master **13/13** · sync 87/87 · 8 parity gates PASS · reader-path PASS · lint 0.

Verification: green. Remaining: iteration E (no-JS glossary page styling, OCEAN widget, prototypes).

Task ID: iter-203-part9-numbers
Agent: lead
Task: audit v2 iteration D1 — Part 9 becomes one diagnostic instrument, and the numeric contradictions close: one checklist, an honest scenario map, AP-11 out of E13, one Temperature model, the card-level number truths.

BASE: 4acbcdb7

Work Log:
- 0: Preflight — worktree clean, HEAD `4acbcdb7`. Read §4.8/§4.9 of the audit next to the live Part 9/10/Appendix E text; located every number the audit names (algorithm counts, AP-11, Temperature, Lorebook rows, WANT, type-5 fear).
- 1: **One checklist (§9.5).** Deleted the «Быстрая проверка (1–5) для Елены» `<details>` block: it was a strict subset of the 18-item checklist directly above (5-point Editorial check: capability = none unique, coverage = checklist + Vysh full pass, retrieval = same screen, context = none lost, dependency = none). Added the plain-language split («первые пять пунктов — быстрые»). The reader-path gate used to count the deleted block's ☐ boxes; it now counts the **18 numbered rows** + the «Единый чек-лист (18 пунктов)» heading — stronger, and it caught the risk in the same run.
- 2: **Scenario map (§9.6).** The old «Что ожидаем / Что наблюдаем / Диагноз» table recorded confirmation, not diagnosis (expected = defect, observed = «reacts correctly», verdict constant). Replaced by a two-signal map: «Признак, что работает» vs «Признак дефекта — что чинить» for SPINE / anchors / voice isolation / AN / Lorebook / OCEAN.
- 3: **AP-11.** Removed from both E13 branches and from the §9.6 mapping (voice mixing is multi-character, not single-character drift). Diagnostics gate's `AP_SET` re-pointed with a comment (AP-11 still lives in the Part 8 catalog); sync probe P2-17 re-pointed to the AP-3-only cell.
- 4: **Temperature.** E17's API column prints the canonical 32B+/API range 0.7–1.0 (was 0.8–1.0); the «Модель-специфичные рекомендации» table is retitled «Стартовые значения (внутри диапазона модели)», its cells use en dashes and a note states every start value lies inside the range; §9.5 item 16 = 12B 0.6–0.8, 32B+/API 0.7–1.0, start values in Appendix E. Sampling gate re-pointed (API needle 0.8→0.7).
- 5: **Card truths.** Elena's WANT aligned to the §4 owner in the card, the §0.2 skeleton and §7A.13 («Доказать правоту — опубликовать историю, которую от неё требуют замолчать»); Vysh's type-5 fear aligned to the canonical Enneagram record («некомпетентным, истощённым» + its own continuation); Omnis's three Lorebook rows moved into §7B.2 ranges (Depth 5/5/7 → 4/4/3; Probability 80/80/60 → 90/90/85 %).
- 6: **Counts.** Vysh checklist item 3: 6 → **9** anchors (the card has 3 base + 3 FLAW + 1 mirror + 2 sensory); the «проходит все 18 проверок» sentence now enumerates all 18; Part 5's trigger categories match its own table (no «провал/критика»).
- 7: **Verification:** build 61 sections · hash `8b3a917d` · tests **91/91** · validate 12 gates + 133 redirects · validate:master **13/13, 0 warnings** · sync **87/87** · 8 parity gates PASS · reader-path PASS · english **1** / syntax **224** · lint 0.

Verification: green. Remaining audit work: D2 (E04/E07/E08 + glossary rendering) and E (support surfaces).

Task ID: iter-202-budget-widget
Agent: lead
Task: audit v2 iteration C — the budget widget must compute the model the text prints: profile selector, per-block status, Greeting counted, anchors inside Description, class scale from §7A.12.

BASE: 4454b5c5

Work Log:
- 0: Preflight — worktree clean, HEAD `4454b5c5`. Read the old widget end to end: markup in `part_07a.html` (§7A.12), behaviour `initTokenCalc()` in `src/shell/lazy-loader.js`, styles `.token-calc*` in `src/shell/styles.css`, and the parity gate's calculator checks (canon description must name the 400–900 band; master div must exist).
- 1: **Markup** (master §7A.12): a lead-in paragraph that says what the tool does and that Description includes anchors; a profile `<select id="calc-profile">` (4K-Fallback / 8K+ / 16K+); four sliders — System Prompt · Description (с якорями) · Examples (всего) · **Greeting** (the old Anchors slider is DELETED, the double-counting the audit found); a status row (`#calc-status`, `aria-live`); the result keeps the total and adds the size-class tag. Every label now has a `for`.
- 2: **Behaviour** (`initTokenCalc`): `PROFILES` holds the windows (4K = 4K-Fallback spec 80–100 / 150–200 / 130–160 / 50–80; 8K/16K+ = the §7A.12 Min/Max windows) and each profile's total band (410–540 / 400–900 / 740–1140). Each block gets ✓ / ⚠ / ▲ against its window with the limit in the tooltip; the total gets the printed size class; the profile band is written to the result's `title` and the status row's `data-band` — a hint, not a verdict. `select` fires `change`, sliders fire `input`.
- 3: **CSS** (`styles.css`, next to the existing calculator chrome): `.token-calc-select`, `.token-calc-status`, `.token-calc-chip` + `--ok/--high/--low` — no new design language, same tokens and radii as the rest of the block.
- 4: **Canon mirror** (`docs/canon/part_07a.md`): the calculator description now names the selector, the four sliders, the per-block status, the band-in-title and the "Description includes anchors" rule.
- 5: **Browser proof** (local `pnpm run serve`): initial 8K = 640 / «Базовый (400–900)» / 4×✓ · 4K = 640 with Description ⚠ and Examples ⚠, band `out` · Greeting 60→80 moves the total to 660 (proves it is summed) · 16K+ at 880 is `in` · restore returns 640. Screenshot: `_scratch/lcg-audit/shot-calc.png`.
- 6: **Verification:** build 61 sections · hash `8b3a917d` · tests **91/91** · validate 12 gates + 133 redirects · validate:master **13/13** · sync 87/87 · 8 parity gates PASS · drift informational exit 0 · lint 0.

Verification: green. No card, table or rule touched — the widget now reads the model iter 201 printed.

Task ID: iters 196–199 (one-line summaries, condensed)
Agent: lead
Task: the audit package closure before iter 200 — 196 the truth pass over the first screen and the budget claims; 197 the deferred half (budget self-claims, the 4K label, single-fact divergences); 198 the last seven audit items (unmeasured claims, one Greeting range, English labels); 199 the glossary grows to 48 entries with honest native provenance (DEC-38). Detail: `git` + `STATUS.md`.

Task ID: iters 201–202 (one-line summaries, condensed)
Agent: lead
Task: 201 the v2-audit truth pass (anchors in Description, anchor count, Elena stress type, Format Lock glyph, profile budgets, §-notation to zero, h2/h3, fence #11 amended, DEC-39); 202 the profile-aware budget widget (selector, per-block status, Greeting, anchors inside Description). Detail: git + STATUS.

Task ID: iter-200-cleanup-and-ki-close
Agent: lead
Task: owner: «давай от мусора избавимся, чтобы он не путал агента и тебя. и почини что нужно. главное уяснить что актуально а что уже нет.» — delete junk, fix the four open KIs (gate gaps + tool defects), and write down the authoritative/historical split.

BASE: 35d1d0a1

Work Log:
- 0: Preflight — worktree clean. Inventoried before touching anything: scanned every script for references (no true orphans), counted references for every doc under docs/ (two zero-reference files, both historical), and read the four open KI rows plus KI#86 in full.
- 1: **Junk deleted (2 files, both untracked):** `_tmp_measure.py` (ad-hoc part_08 word counter from an earlier iteration) and `live-char-guide-preview-iter194.html` (1 MB single-file review snapshot — «a REVIEW artifact, not the deliverable», regenerable from `dist/`). Confirmed unreferenced first.
- 2: **KI#79 fixed** — `audit_canon_master_drift.py` `P_TAG_RE`: `<p[^>]*>` → `<p\b[^>]*>`, so `<pre>`/`<path>`/`<picture>` no longer open a paragraph match. Actionable drift **91 → 87**; the four absorbed code-block blobs are gone.
- 3: **KI#90 fixed** — `validate_terms.py` now matches `prohibited` variants on word boundaries (`(?<!\w)…(?!\w)`), and the ordinary verb «Хочет» left the WANT entry's prohibited list in `glossary_registry.md` (regenerated `data/glossary.json`). `validate_terms.py` green; a prose «хочет» can no longer redden CI.
- 4: **KI#87 fixed** — new **Check 13** in `validate-master.mjs`: per-file container-tag balance (comments stripped, self-closing + SVG excluded, one PASS line per file, error names the file and the delta). **First run found three real defects no gate had caught:** `part_02` one extra `</td>` (Price table), `part_03` and `part_06` a doubled `</li>` each. Fixed all three; Check 13 green; summary now «all 13 checks».
- 5: **KI#92 fixed** — new `scripts/audit_ocean_parity.py` (10 checks): §5.1 rule/pole-table thresholds ↔ ceilings ladder ↔ ceilings table ↔ §5.1's own НАБЛЮДЕНИЕ 8K figure ↔ `data/ocean.json` (`extremum_thresholds`, five trait thresholds, the `(extreme)` numbers in four forecast triggers) ↔ `ocean-insight` fallback + state/label literals, plus "the widget reads `extremum_thresholds`". **Negative-tested** by drifting `high` to 75 (FAIL with a precise message) and restoring the file. Added to the mandated list in `AGENTS.md` → **8 cluster gates**.
- 6: **«Что актуально, а что нет» written down** — `AGENT_NAVIGATION.md` **§11 Authoritative vs Historical**: the two classes, the rule («a count, a § number or a path in a historical document is a measurement at a commit, not an instruction — never align the guide, a gate or a value to it»), and a table mapping each live value to where it is computed. Six documents that carry frozen numbers got a banner pointing at §11 (`I18N_PLAN`, `PROMOTION_PLAN`, `PROMOTION_SEO`, `CONTENT_RESTRUCTURE_PLAN`, `research/migration_map_v2.md`, `research/editorial_matrix.md`). This is also KI#86's disposition: label the ratified research, do not rewrite it.
- 7: **KI lifecycle enforced** — deleted KI#85/#88/#89/#91 (closed >2 iterations ago per the rule); closed KI#79/#86/#87/#90/#92 with their evidence. **Zero open KIs.** `PLAN.md`'s `ki-79` backlog row removed with the fix.
- 8: **Invariants re-pinned:** `validate:master` **13/13** in the new-agent paragraph; «8 cluster gates ×8 PASS»; the mandated-gates sentence lists `audit_ocean_parity.py`; glossary counts 45 → 48 in `AGENT_NAVIGATION` §1/§7 and the STATUS invariant.
- 9: **Verification (full battery after the last edit):** build **61 sections** · hash `8b3a917d` · tests **91/91** · validate 12 gates + **133 redirects** · validate:master **13/13, 0 warnings** · sync **87/87** · **8** parity gates PASS (incl. the new OCEAN gate) · reader-path PASS (59/59, 48-term) · browser proofs `verify-prerender` 6/6 + `verify-reading-rail` 15/15 · qa csp/bundle/contrast/seo PASS · doc-versions exit 0 · english **1** / syntax **224** (baselines exact) · lint 0 · version:check 9.2.6 · drift informational exit 0 at **87** actionable.

Verification: green (step 9). Zero open KIs; zero deferred items.

Task ID: iters 193–195 (one-line summaries, condensed)
Agent: lead
Task: the reading layout and its corrections, then the Part 5 rebuild — 193: `.layout-grid` TOC rail + reading bar + three themes + scrollspy + the browser proofs; 194: centred composition, the dead ↔ and E01–E18 mini-map controls retired, soft dark becomes the default; 195: Part 5 rebuilt as four sections with one reader job each (DEC-37), OCEAN ladder in ONE rule, 6 RULE → 3.
Detail: `git` + `STATUS.md` invariants.

Task ID: iters 179–185 (one-line summaries)
- iter 185 — v4-4, chapter 2 (Part 5) anchor-free: §5.1 opener states the job, stress table loses the hypothetical hedge, trigger chain loses the «источник в гайде» column, ceilings/overload de-meta'd, pentagon retitled «Интерактивный OCEAN-профиль», §5.2–§5.5 de-linked textually (tables untouched, `data/enneagram.json` byte-identical); Part 5 2 601 → 2 488 words, anchors **19 → 0**. Detail: git + STATUS iter-185.
- iter 184 — v4-3, chapter 2 core (Part 4, SPINE) as one self-contained place: GHOST table loses its LIE column (the pair lives in §4.3), §4.4 two ❌/✅ tables merged, §4.5 WANT↔NEED merged, §4.6 infographic + duplicate Elena anchor table + Lorebook checklist row dropped; Part 4 2 104 → 1 848 words, anchors **9 → 0**; **KI#87** opened (validate-master has no tag-balance check). Detail: git + STATUS iter-184.
- iter 183 — v4-2, chapter 0 (Part 0 + Part 1) as one self-contained place: the module map → a 5-block anatomy table, TL;DR → the six build steps, the term list with its four «см. Part N» deleted (the glossary panel is the single term surface), the anchors-placement callout and the top-3 routing gone; chapter 0 2 341 → 1 542 words, anchors **19 → 0**; 3 probes → `ABSENT_CHECKS`; one duplicated `</section>` fixed (validate:master → 0 warnings). Detail: git + STATUS iter-183.
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

