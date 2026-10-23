# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-181-audit-fix-sweep
Agent: main (lead), solo
Task: Owner-mandated fix sweep of the audit-181 findings — all visualizations, tables and rule blocks (37 findings: 16 P1 / 18 P2 / 3 tooling).

Work Log:
- 0: Preflight — BASE_COMMIT `3189699e` (iters 171-180 uncommitted, preserved as the review-candidate base). Full audit battery before edits: 18/18 gates green, baselines english 1 / syntax 226.
- 1: **Garbage cluster** (part_04/07b/08/09): «Продвинуто Опционально» deleted; «§4.6, §4.6» ×3 (checklist row 10, AP-9 fix, AP-9 summary) fixed; `{{user}}` braces restored; EN remnant removed; AP-9 problem-block annotation rewritten (lowercase + verbatim echo); AP-10 ПРАВИЛО→НАБЛЮДЕНИЕ (label semantics); AP-2/5/7 gained «Проверка»/«Различающий сигнал» lines (§8.2 contract: every block adds unique material); AP-8 example anchor gained its Price; part_04: inverted echo, РЕКОМЕНДАЦИЯ→НАБЛЮДЕНИЕ exposition, «одиночный призрак»→GHOST Layers label, dangling referent, pseudo-heading→h4, cross-ref label matched, variant rows labeled + full NEED restored, E06-duplicate architecture table compressed to a transition line (unique per-level data kept in the Выщербленный example), anchor-price pairs unified across the 3 sites (canon L269/285 + master L581/601/619), Vyshcherblenny LIE unified to the full form (4 sites incl. canon), E05 hex examples → canonical Elena (LIE/FLAW/NEED/WANT), E05 panel «двигает→блокирует» + agreement fixed; part_09: «якоре»→«якорь» ×2.
- 2: **Visual honesty cluster**: E07 — two-scale axis made honest (top labels = row-1 compressed scale 20/40/80%, lower labels 10/20/40% added under the split line, grid comment corrected + grid confined to the lower section, split-axis note states both scales); E09 — legend «<30 >70 экстремум · 30-40/60-70 осторожно · 40-60 безопасно» + value colors: N=68 cyan→amber, C=65 neutral→amber (band-consistent with A=38); E17 — Top K 40–80→40–100 (canonical «32B+/API»); E08 — badge `[Model ↗]` x=695 clips in viewBox 700 → `text-anchor="end" x="698"`.
- 3: **Numeric drift cluster**: Examples budget → §7A.12 40/60/80 everywhere (part_00 «80–120»→«~40–80», part_03 «80-120 (40-80 минимально)»→«~40–80», part_09 symptom «длиннее 120→80», «≤120→≤80»); token calculator → §7A.12/§7A.13 (Examples slider 80–400 default 180, static Итого 510 = 80+200+180+50, range 400–900; lazy-loader.js JS band thresholds + canon calculator description synced); Omnis §10.3 note → all 4 extremes named + SPINE grounding (16K+ ceiling legality); Appendix E 4K table → re-based inside §7A.12 (Examples 130–160 = 2×65–80; SP/Description/Greeting full-column = §7A.12 ranges); stress-type table → disjoint bands (N>70 vs N 60–70) + in-band examples (Елена N=68 row-3 + projected N>70 row-1; Интроверт N=72→N=65); §5.2 RULE restatement → §5.1 link (Elena verdict kept); §5.1 inner duplicate → cross-ref; §5.4 per-row pole numerics stripped (intro carries the §5.1 link once); type-6 stress example → «тревожное ожидание» (6→3, matches §5.3 + data/enneagram.json); part_02 ready-anchors → concrete triggers (похвала вслух / small talk) + observable prices (рука ноет остаток дня — instead of «теряет воспоминание», ручка до белизны — instead of «головная боль»); «мульти-персонажность» false label → «полная структура с GHOST Layers + CoT + Lorebook» (part_01 + part_10 comment + canon); «Елена | Выщербленный» one-link pair → two links.
- 4: **A11y cluster**: `scope="col"` added to all 302 `<th>` across 14 master files; 3 bare part_09 details-tables wrapped in `.table-wrap`.
- 5: **Tooling cluster**: `qa:english`/`qa:syntax` wrappers — node resolves `python`(win)/`python3`(unix) + `PYTHONIOENCODING=utf-8` env (both gates now RUN and report baselines 1/224 on Windows; before: crashed on `python3` before checking); `version:check` — `data/character_schema.json` added as the 4th fence-#9 place; integration test `execSync(stdio:'pipe')`→`'inherit'` (Windows EPERM — `node tests/integration/test-full-build.mjs` now 21/21 exit 0); vs-mini-map registry + E18 (Greeting Algorithm was unreachable from the mini-map nav).
- 6: **Parity needles re-pointed to the FIXED state** (a needle that locks the defect cannot catch regressions): audit_canon_master_sync (P0-9 variant labels, P2-7-syn-04 corrected synthesis, P3-5/P2-12b/KI#34-table scope="col" forms), audit_sampling_parity (E17 Top K 40–100), audit_token_budget_parity (400–900).
- 7: **Verification (full battery after the last edit):** build **68 sections / 0 errors** / hash `6f563edc` unchanged (DEC-05: index.html-only) · validate **126 redirects** · validate:master **12/12, 0 warnings** · tests **68/68** (47 unit + 21 integration, runner-green through direct files) · lint PASS · sync **87/87** · 7 cluster parity gates + `audit_vs_embeds` PASS · qa:csp/bundle/contrast/doc-versions PASS · **english 1 / syntax 224** (baselines exact, now actually running via pnpm on Windows) · version:check 9.2.6 **×4 places**.

Stage Summary:
- All 37 audit-181 findings closed: 16 P1 (reader-facing wrong data), 18 P2, 3 tooling. Canon-first discipline held: every master edit paired with its `docs/canon/*.md` mirror (part_00/02/03/04/05/07a/09/10 + appendix_model_params).
- Tooling hardened: qa gates runnable on Windows, version fence complete, integration test fixed at the source, mini-map knows E18.
- Next: owner review → commit (iters 171-181 uncommitted in worktree); optional follow-ups: KI#79 (drift regex), KI#86 (research registries re-keying) — both pre-existing, informational.

---

Task ID: iter-180-voice-one-surface (one-line summary)
- iter 180 — §3.2 «Иерархия влияния на голос»: one numeric surface (widget → control strip + export; E07 prose inset removed; CSS −210 across two files; `tools/audit-dom-dup.mjs` added). Detail: git + DEC-15/DEC-21.


---

Task ID: iter-179-post-v3-seam-audit (one-line summary)
- iter 179 — post-v3 seam audit: measured the finished corpus (42 exact / 75 near cross-section duplicates → 39 / —; 1 duplicate heading → 0); §7A.6 stopped re-printing Appendix E (pointer + the two hard constraints, retitled «Параметры генерации: две жёсткие константы»), Appendix E's SP-language ladder reduced to one statement per site. Detail: git + this worklog's previous revision.

---

Task ID: iter-178-v3-restructure-s4b-slice4 (one-line summary)
- iter 178 — v3 S4b slice 4: **F-20 closed** (four labels, one treatment; 44 chips retired; `styles.css` 7019 → 6028; validator Check 8 guard) — the v3 track COMPLETE, KI#85 CLOSED. Detail: git + DEC-32.


---

Task ID: iter-177-v3-restructure-s4b-slice3 (one-line summary)
- iter 177 — v3 S4b slice 3: **F-19 closed** — Appendix C (25 frozen-v1 terms) deleted; the registry → generated `glossary.json` → panel/no-JS chain is the only glossary surface; Part 0 prose pointer added; legacy anchors → `p0_how_to_read`; corpus 69 → 68; sync 89 → 87. Detail: git + DEC-31.

---

Task ID: iter-176-v3-restructure-s4b-slice2 (one-line summary)
- iter 176 — v3 S4b slice 2: **F-18 + F-24 closed** — the apparatus is 3 content widgets (`ocean-insight`, `mbti-composer`, `persona-voice-hierarchy`), the 5 VS scripts moved to `src/shell/interactions/`, `widget-utils`/`js-flag` to `src/shell/lib/`; `persona-cross`/`persona-synthesis` replaced by the static 5×9 §5.5 matrix + the «сверка трёх систем» protocol; `enneagram-builder` SPINE autofill removed and the §5.3 contradiction fixed; hash `c1518874` → `6f563edc`. Detail: git + plan §5.4.

---

Task ID: iter-175-v3-restructure-s4b-slice1 (one-line summary)
- iter 175 — v3 S4b slice 1: **F-17 closed** — six VS-embeds (E01/E03/E04/E05/E07/E11) moved inside their canonical sections (E01 → §1.2, E11 → §6.2), canon markers completed (`[VS: E09]`/`[VS: E11]`/`[VS: E18]`, `[VS: E03]` fixed), `validate:master` warnings 6 → 0; browser proof 17/17 embeds inside sections. Detail: git + plan §5.4.

---

Task ID: iter-174-v3-restructure-s4a (one-line summary)
- iter 174 — v3 S4a: teaching modules 2/3/4/5/6 de-duplicated 38 → 26 sections, one owner per rule (F-01 OCEAN ladder in §5.1, F-13/F-14 de-dup, Part 1 numbering), 11 findings burnt; redirects 114 → 126; sync 89 probes; battery green (tests 68/68, english 1, syntax 229 → 226). Detail: git + `docs/RESTRUCTURE_V3_PLAN.md` §5.3.

---

Task ID: iter-173-v3-restructure-s3 (one-line summary)
- iter 173 — v3 S3: Part 9 11 → 7 (one troubleshooting instrument), Part 8 16 → 2 (catalog + worked examples), Part 10 4 → 5 (index + cards); 20 redirects + `audit_diagnostics_parity.py` ONE-checklist guard; build 81 sections, sync 89 probes. Detail: git + plan §5.2.

---

Task ID: iter-172-v3-restructure-s2 (one-line summary)
- iter 172 — v3 S2: guide boundary drawn — Appendix E «Параметры генерации» created (absorbs Appendix B, sampling values move there), E15 deleted, §7A.13 = the single per-card budget calculation, copy-paste templates cleaned (F-02…F-05), §7A.6/§7A.7/§7A.10/§7A.11 → pointers with frozen ids; sync 97 → 95 probes; build 98 → 97 sections. Detail: git + DEC-27.

---

Task ID: iters 165–171 (one-line summaries, condensed)
- iter 171 — v3 S1: one navigation surface (TOC contract + `data-part-title` ×12 + `data-toc-nav` ×50, inline TOC deleted), Part 0 rewritten as a reader on-ramp, `tests/test-toc-coverage.mjs`; build 98 sections. Detail: git + `docs/RESTRUCTURE_V3_PLAN.md` §4 / DEC-26.
- iter 165 — doc-only: the switch-time owner-call package `docs/research/owner_gates_iter165.md` (G1–G4, nothing DECIDED).
- iter 166–169 — the owner-called reconciliations: the §7A.7 capability alignment + the 27-item enrichment batch; KI#77-e closed (Appendix D ranges illustrative, §7A.12 the sole normative budget owner); Part 0 wired into the runtime corpus (96→98) + the noscript glossary link (hash `c1518874`). Detail: git `0b1429fd`.

