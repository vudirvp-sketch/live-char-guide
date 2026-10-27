# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

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

Task ID: iter-201-truth-pass
Agent: lead
Task: owner: «какие решения? делай как качественно и правильно ало. продолжай работу.» — the v2-audit decisions are delegated, so they are taken and executed: four reader-visible contradictions, the budget model, and the dead `§`-notation (source: `_scratch/lcg-audit/AUDIT-REPORT-v2.md` §4–§5).

BASE: 82f92d4d

Work Log:
- 0: Preflight — worktree clean, HEAD `82f92d4d` (iter 200). Re-read the audit's verified inventory (`AUDIT-REPORT-v2.md`, `verify-*.md`) and measured the current state first-hand: 57 reader-visible `§` labels (41 master + 5 widget + 11 glossary), 15 `h2` / 69 `h3` / 108 `h4` / 6 `h5`, 10 internal links.
- 1: **Anchors — one truth (commit `b28efc98`).** Appendix E's РУЛЕ is the norm; the §0.2 skeleton and all four cards now place `<anchors>` at the end of `[DESCRIPTION]` (text moved verbatim), and 9 sync points follow: §10.0 index cell, Part 1 caption/sub-panel/table (E01 keeps its Examples-zone *drawing*), §7A.9 + the "separate Anchors field" sentence, §7A.1 "not part of SP" line, §7A.12 anchors-row note, glossary article (wrong "§1.4" target deleted), §0.2 "Examples" table cell. Counter and FLAW-linked wording fixed: 3–5 **base** anchors, six for Elena.
- 2: **Elena + Format Lock (same commit).** Stress table row split on E (N 60–70: E<30 avoidant / E≥30 reactive), the cautious-zone sentence added, the «2 значения в осторожной зоне» observation corrected to 3 (A=38, C=65, N=68) in master+canon. Format Lock: the glyph paragraph (free, uniform inside a card), Omnis's `[ВНУТРЕННИЙ_МОНОЛОГ]` → `[INTERNAL]` (5 lines, master+canon), the §9.5 checklist row re-quoted in ASCII.
- 3: **Budget model (commit `64a66f97`).** §7A.12: «Мин» = block floor, separate 4K profile; 4K-Fallback = the single 4K spec with its total (410–540); CoT-anchor row 50/60/80; the five size classes (<400 · 400–900 · 900–1500 · 1500–2500 · >2500) printed; the profile bands (4K 410–540 / 8K 400–900 / 16K+ 740–1140 / ceiling 1400–2060); Script Tax stated in two units in §7A.12 and Appendix E; sub-budget rule says anchors ride inside Description (floor on 8K). Consumers re-said honestly: part_01 8K-profile line, §7A.13 step 6, the Elena budget table, §9.5 item 17, the Vysh result («17 из 18 — п.17 заявленное исключение»), the §10.0 declaration (Examples *and* CoT anchors). No card shortened.
- 4: **`§`-notation retired + sequence fixes + headings.** A scan script (`_scratch/lcg-audit/scan_sections_targets.py`) inventories every visible label; 57 removed via an exact replacement map (`fix_sections_iter201c.py`, no regex guessing — a miss aborts the run), canon mirrors applied in two rounds. Sequence: §0.2 gets the five SPINE glosses + «Presence Penalty (PP)» + «одна система разметки — действия и речь записаны одинаково» (S1); §2.2's anchor-count table speaks plain language (S2); §3.4 stops requiring Format Lock before it is defined (S3); §9.5 item 13 gets its own numbers (S4); the wrong "Tier 1–3 из Part 10" address dies (S7). Headings: 46 section titles h3→h2, their 100 h4→h3, 6 h5→h4 — **61/123/14, zero skipped levels** (`fix_headings_iter201e.py`). Appendix E's opening no longer claims to be read "once before assembly".
- 5: **Law + decision.** Fence #11 rewritten (navigation = TOC/rail; local reminder beats a back-link; a link only to a reference surface, text = visible name, never a number; `§` banned on every reader surface). **DEC-39** records the four truths, the budget model, the `§` retirement, and the two deferred audit items (S5 contradicts DEC-27's boundary and the local six-question table; S6 is an owner-gated `data/anchor-redirects.json` change).
- 6: **Gates re-pointed, never weakened.** Six literal anchors moved to the new content: 5 sync probes (`KI#30-7a`, `P0-12`, `P1-5`, `P2-12a`, `P2-12c` — heading level and the removed `§`-pointer) and 6 parity anchors (`core_directives` per-directive headings h4→h3; `token_budget` glossary deferral by name now that `§` is banned from the glossary; `diagnostics` E13 sub-heading; `voice` E16 badge note; `sampling` AP-5 fix line). Same invariants, each re-point disclosed in the script comment.
- 7: **Verification (full battery after the last edit):** build **61 sections** · hash `8b3a917d` (shell untouched) · tests **91/91** · validate 12 gates + **133 redirects** · validate:master **13/13, 0 warnings** · sync **87/87** · **8 parity gates PASS** · reader-path PASS · qa csp/bundle/contrast/seo PASS · doc-versions exit 0 · english **1** / syntax **224** (baselines exact) · lint 0 · version:check 9.2.6.

Verification: green (step 7). Deferred with reasons: audit S5, S6; the remaining audit work is iterations C–E (budget widget, Part 9/numbers, support), listed in `STATUS.md` Next step.

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

