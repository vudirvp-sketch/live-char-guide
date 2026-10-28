# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-208-s6-retire-7a7
Agent: lead
Task: audit v2 S6 on the owner's explicit approval («разрешаю») — retire §7A.7 (`p7a_model_checklist`) to a legacy redirect, move its rule into §1.6, and bring the corpus to 60.

BASE: b79cc230

Work Log:
- 0: Preflight — worktree clean, HEAD `b79cc230`; owner approval received in chat («разрешаю короче») — the `data/anchor-redirects.json` stop-condition is satisfied.
- 1: **Rule moved** to §1.6 «Профиль сборки» as local prose («Решение по модели принимается здесь, один раз: строка таблицы возможностей в Приложении E выбирается по профилю сборки — в конвейере сборки она больше не повторяется»), deliberately without a link so reader-path B2's self-contained profile holds.
- 2: **Section deleted** from master + canon; canon's two stale «см. §7A.7» pointers now read «см. Приложение E»; canon front-matter section list drops the id.
- 3: **Legacy redirect** `p7a_model_checklist` → `p1_prebuild_checklist` in `data/anchor-redirects.json` (generated date bumped). SHELL-REDIRECTS: **134 redirects, all live, no chains**.
- 4: **Gates re-pointed, not weakened:** `audit_sampling_parity.py` — §7A.6 slice now ends at `## 7A.8`, the old §7A.7 pointer block became a negative guard, and the §1.6 check requires the moved rule + Appendix E mention; `audit_voice_parity.py` — the §7A.7 block became the same absence guard (the AN-claim check against Appendix E stays); `readerpath_audit_iter164.py` — corpus 61 → 60, wiring list drops the id.
- 5: **Counts where current-state:** meta description «60 разделов», README 60, AGENT_NAVIGATION 60 + link inventory corrected to 4 Appendix-E pointers; content_map marks the id RETIRED; PLAN row S6 = executed; DEC-40 records the owner approval and the hash move.
- 6: **Verification:** build **60 sections** · hash `8b3a917d` → **`336a4fc6`** (shell meta) · tests **91/91** · validate 12 gates + **134 redirects** · validate:master **13/13** · sync 87/87 · 8 parity gates PASS · reader-path PASS · csp/bundle/seo/doc-versions PASS · english **1** / syntax **224** · lint 0 · version 9.2.6.
- 7: **Browser proof:** `#p7a_model_checklist` → URL rewritten to `#p1_prebuild_checklist`; 60 sections; no retired section in the DOM; TOC has no «Чеклист по типу модели»; the §1.6 rule renders.

Verification: green. The v2 audit has no open item left; S5 rejected (DEC-39), S9 UNCLEAR in PLAN a2-E.

Task ID: iter-207-ocean-widget-cleanup
Agent: lead
Task: audit v2 support S7/S8 — the OCEAN widget's forecast was not named in prose and a dead `enneagram:ocean-suggest` branch promised a retired function.

BASE: 0a2877a7

Work Log:
- 0: Preflight — worktree clean, HEAD `0a2877a7`; read the widget's M2/M3 subscriptions, the generated button, the pending-suggestion state and the §5.4 prose.
- 1: **Dead branch removed** (`ocean-insight.js`): `enneagram:ocean-suggest` subscription (never emitted after the v3 retirement of the Enneagram Builder), the hidden «Применить предложение Enneagram» button markup, its click handler and `_pendingEnneagramSuggestion`. The live `mbti:ocean-apply` highlight path and the M3 `enneagram:selected` reader are untouched.
- 2: **Forecast named** (`part_05` prose, master + canon): the MBTI paragraph now says OCEAN Insight also forecasts probable Enneagram types from extreme poles; «Автоматической агрегации трёх систем нет» now adds «прогнозы виджетов остаются подсказками».
- 3: **S9 recorded, not silently changed:** the `enneagram_correlation.high/low` lists are the widget's strongest-correlation heuristic; re-deriving them from the §5.4 matrix changes the suggested type set (a product call), so it is logged in `PLAN.md` a2-E as UNCLEAR instead of being rewritten.
- 4: **Browser smoke:** 5 sliders, Copy → `<ocean>O:50 C:50 E:50 A:50 N:50</ocean>`, forecast renders, apply button absent, no JS errors.
- 5: **Verification:** build 61 sections · hash `8b3a917d` · tests **91/91** · validate 12 + 133 redirects · validate:master **13/13** · sync 87/87 · 8 parity gates PASS · reader-path PASS · lint 0.

Verification: green. Only S6 (owner-gated §7A.7 deletion) remains from the audit plan.

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

Task ID: iters 204–205 (one-line summaries, condensed)
Agent: lead
Task: 204 the last audit visuals (E04 funnel 100/85/70/55 %, E07 strip inside the viewBox, E08 badge anchor) + glossary escaping on both surfaces; 205 support (real no-JS glossary page, strict OCEAN 30/70 + `<ocean>` copy, notation debt to zero). Detail: git + STATUS.

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

Task ID: iters 196–202 (one-line summaries, condensed)
Agent: lead
Task: the audit-package closure before iter 200 (196–199: truth pass, deferred half, last seven items, glossary 48 with native provenance), then the v2-audit truth pass and the budget widget (201–202: anchors in Description, anchor count, Elena, Format Lock, profile budgets, §-notation to zero, h2/h3, fence #11 amended, DEC-39; widget = profile selector + per-block status + Greeting). Detail: git + STATUS.

Task ID: iters 193–195 (one-line summaries, condensed)
Agent: lead
Task: the reading layout and its corrections, then the Part 5 rebuild — 193: `.layout-grid` TOC rail + reading bar + three themes + scrollspy + the browser proofs; 194: centred composition, the dead ↔ and E01–E18 mini-map controls retired, soft dark becomes the default; 195: Part 5 rebuilt as four sections with one reader job each (DEC-37), OCEAN ladder in ONE rule, 6 RULE → 3.
Detail: `git` + `STATUS.md` invariants.

Task ID: iters 165–185 (one-line summaries, condensed)
Agent: lead
Task: post-v3 quality and the v4 prelude — 165–178 the owner-gated recon, v2 switch, S4b apparatus/glossary/labels, v3 findings closed; 179–185 the seam audit, the §3.2 single surface, the full viz/tables sweep and the v4 chapter re-cut start. Detail: git + `docs/RESTRUCTURE_V4_PLAN.md`.

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

