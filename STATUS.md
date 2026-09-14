# Live Character Guide — Project Status

> **Version:** 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> **Date:** 2026-09-14
> **Iteration:** 135
> Full rules: `AGENTS.md` (operating law) · `AGENT_NAVIGATION.md` (system map) · `PLAN.md` (backlog)
> Iteration detail: `worklog.md` · History: `CHANGELOG.md` + git

---

## Current State

**iter 135 — mig-4-token-budget (third bounded area executed, Registry B row 5).** The Token budget cluster now has one canonical value owner end-to-end: §7A.12 = the canonical record (per-block min/std/max table + personality sub-budgets + Script Tax + calculator — **unchanged**); E01 embed = verified `SHARED_REFERENCE` (SP 50/100/200, Description 150/300/700, Greeting 40/60/100; Examples totals 80/180/400 = per-example × count, derivation declared in-embed; Lorebook row = declared estimate «Est.»); E15 embed = `SHARED_REFERENCE` with the derivation note now on the Examples total («итог: 40–80 на пример × 2–5 примеров — §7A.12», master + regenerated fallback); canon `[VS: E01]` / `[VS: E15]` markers added (embeds previously had no canonical description; the derivation rule stated canonically in part_10.md). **Pre-edit verification finding:** the foundation §4.4 claim «E01 SP ~100–200 wrong-side copy» does NOT exist in the repo (every E01/E15 layer verified at HEAD + iter-131 BASE; «100–200» = E16/§7A.5 AN length, canonical there) — registry corrected (map §5.3 intro), foundation stays the historical artifact. Acceptance gate `scripts/audit_token_budget_parity.py` PASS (10 checks). New R11-family instance recorded: §7B.2 Greeting «50–100» vs §7A.12 Greeting row (map TB-8, owner-gated ed-5). Verification (executed): parity audit PASS + full battery — build hash `2ab607d6` unchanged (shell untouched) + validate + validate:master 12/12 + version:check + tests 64/64 + qa gates (english 18 / syntax 247 — baselines exact; csp/bundle/contrast/doc-versions PASS) + canon sync 97/97 + actionable drift 160 = 160 + `git diff --check` clean. pnpm absent in the sandbox — scripts invoked via `node`/`python3` directly (identical commands); the owner's pre-commit hook re-runs the battery.

---

## Invariants

- **Version sync:** canonical 9.2.6 across `package.json` + `src/VERSION` + `data/character_schema.json` + build manifest (`pnpm run version:check`).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** absent by design (removed iter-113) — content diagrams = VS-EMBEDs only; no CDN script dependency.
- **CSS:** `src/assets/vs-styles.css` 3245 lines · `src/shell/styles.css` 7025 lines (both trimmed to in-use rules, iter 114/115).
- **Canon → master sync:** 97/97 PASS (`scripts/audit_canon_master_sync.py` MUST pass).
- **Voice Isolation:** linguistic voice = Examples/Greeting only; physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES:** shorthand `{{CORE_DIRECTIVES — ...}}` accepted; #6 = Consequence Driven, #7 = Pre-Generation Filter.
- **SP Language rule:** layered — 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language (§7A.2 RULE).
- **Identity name-language:** canonical form preserved across all card blocks — transliteration forbidden (§7A.1 RULE).
- **Script Tax:** non-Latin scripts ~1.5–2× tokens on 32K vocab; ≥128K → negligible (§7A.12 RULE).
- **Widgets:** 12 in `src/shell/widgets/`. `vs-e10-enneagram` consumes `data/enneagram.json` (fence #8, fixed iter 124).
- **VS-EMBED E06/E10 (iter 124):** E06 = two-column layout (`.ghost-rings-visual` + `.ghost-rings-annotations`), SVG geometry-only; E10 graph directions = `data/enneagram.json`, hexad complete, arrowheads encode direction (KI#73–76).
- **Editorial Policy (DEC-15, iter 122):** all `docs/canon/` + `src/master/` content edits — compress redundant presentation, never unique capability; 5-point functional-load check; UNCLEAR ≠ delete; success ≠ word count.
- **Language policy (DEC-16, iter 123):** two-layer — guide prose/labels/headings Russian (ordinary terminology translated); English only in executable prompt content (with adjacent Russian explanation), technical identifiers, proper names. `qa:english` baseline 18 (executable-content leaks by design; must not increase).
- **Glossary chain (DEC-17/18, iter 133):** `docs/canon/glossary_registry.md` = canonical term record (45 entries) → `data/glossary.json` **generated** by `scripts/generate_glossary.mjs` (first `pnpm run build` stage) → runtime panel / no-JS page. `glossary.json` never hand-edited; term changes go through the registry. `scripts/audit_glossary_parity.py` MUST PASS.
- **CORE DIRECTIVES single presentation (DEC-08/mig-2, iter 134):** §7A.2 = the only full definition; E08 = the one visual presentation (SHARED_REFERENCE); every other layer (§7A.1 template, §7A.13, Part 10) = `{{CORE_DIRECTIVES — …}}` shorthand; glossary entry = 1-sentence + link. `scripts/audit_core_directives_parity.py` MUST PASS.
- **Token budget single value owner (mig-4, iter 135):** §7A.12 = the only canonical budget table (SP 50/100/200 · Description 150/300/700 · Examples 40/60/80 per · Greeting 40/60/100 · Anchors 15/25/40 per); E01/E15 embeds = SHARED_REFERENCE presentations (Examples totals derived: per-example × count — derivation declared); E01 Lorebook row = declared estimate («Est.»). `scripts/audit_token_budget_parity.py` MUST PASS.

Full rules and fences: `AGENTS.md` → Hard fences. Content semantics: `docs/canon/`.

---

## Known Issues

| KI# | Description | Status | Opened |
|-----|-------------|--------|--------|
| KI#70 | Appendices never runtime-loaded: `parts/manifest.json` has an `appendices` array (appendix_mbti / appendix_model_table / appendix_glossary) that `src/shell/lazy-loader.js` never reads — it iterates only `manifest.parts`. Appendix A (MBTI Reference + `mbti-composer` container), B (Model Capability Table), C (Glossary appendix) never render; the auto-injected TOC's `#appendix_*` links (built `part_01.html:414+`) are dead. Pre-existing across lazy-loader history (git `-S` finds no "appendices" consumer ever). Systematic, same symptom family as KI#69. Deferred: 1-line wiring activates never-exercised widget/content paths → own iteration + verification (`PLAN.md` ki-70, owner-gated). | OPEN | 2026-09-14 (iter 119) |
| KI#72 | Sampling parameter contradictions inside Part 7A: §7A.7 (`p7a_model_checklist`) table says 32B+ Temperature **0.85–1.1** and 32B+ RepPen **1.0–1.05**, while canonical §7A.6 (`p7a_sampling_params`) says 32B+/API Temperature **0.7–1.0** and 32B+/API RepPen **1.05–1.10**. Reader-visible inconsistency; found by the iter-120 editorial matrix (R12). Fix requires a content decision on the canonical values + master mirror (`PLAN.md` ki-72). Phase B: AP-5 (RepPen ≤ 1.10) and AP-7 (PP = 0) stay valid under either reconciliation — no new constraint. **iter 133:** the 5th value location (`glossary.json` RepPen «1.00–1.10», found iter 132) is eliminated — the generated registry defers values to §7A.6; 4 live locations remain (§7A.6 / §7A.7 / E17 / E12). | OPEN | 2026-09-14 (iter 120) |
| KI#77 | Canon-side wrong/stale cross-references (Phase B matrix findings; master resolves every affected link correctly — reader impact = canon navigability only). **(a)–(d) FIXED iter 127 (ed-8/R18):** (a) `part_04.md` L281 §7A.6 → §7A.2 (Consequence Driven home); (b)–(d) `appendix_character_map.md` — Omnis stale refs («Part 5 §5.2» false + «Part 8 §8.X AP-15» stale) → «Part 5 §5.1/§5.3 (концепты полюсов и перегрузки OCEAN)»; Выщербленный «Part 5 (эннеаграмма)» dropped (5w4 lives in §10.4, already listed); «Part 6 §6.X» → §6.5–§6.6. **(e) REMAINS OPEN:** character_map L37–38 budget ranges (~440–890 / ~1500–1800) vs Part 10 budgets (Walter ~1100, Omnis ~2150 outside) — R27 framing drift, needs the ed-5 re-frame decision (owner value decision). Evidence: `editorial_matrix.md` §18. | OPEN (e only) | 2026-09-14 (iter 126) |
| KI#79 | `scripts/audit_canon_master_drift.py` `P_TAG_RE = <p[^>]*>(.*?)</p>` also matches `<pre>` (and `<path>`/`<picture>` — any `p`-prefixed tag): a `<p>`-match can open on `<pre>` and run to the next literal `</p>`, absorbing code blocks + following paragraphs into one blob "paragraph". Surfaced iter 130: deleting the §3.2 Пояснение (last `<p>` before `</div>` after two `<pre>` blocks) shifted the absorption boundary — the master transition `<p>` was swallowed into the 499-char blob; informational actionable drift rose 159→160 with zero content drift (transition byte-identical canon↔master, sync 97/97 PASS). Informational-only tool (exit 0 always) — no reader impact; fix = regex tighten + actionable re-baseline (`PLAN.md` ki-79). | OPEN | 2026-09-14 (iter 130) |
| KI#80 | Master `part_07a.html` §7A.2 directive-5 paragraph (L213): «…вы НЕ можете заявить, что {{user}} наппряжён» — double-п typo («наппряжён»); canon carries the correct «напряжён» (L125). Reader-visible master-side typo, pre-existing (root fallback carried it too); byte-verified iter 134 during the mig-2 audit work. | **CLOSED iter 134** — fixed by master→canon alignment (fold into the master-touching mig-2 slice, KI#78 precedent); root fallback rebuilt | 2026-09-14 (iter 134) |

> **KI lifecycle:** record → fix only if in scope → close as `CLOSED iter-<N>` → delete after 2+ iterations closed. Full rules: `AGENTS.md` → Bug → doc → fix.
> **iter-116 note (historical):** a suspected KI#66 ("workflow branch filters corrupted") was WITHDRAWN in the same iteration — byte-level verification proved the filters intact; the "corruption" was a terminal display artifact (pitfall #27).
> **iter-124/127/129/130/134 notes:** KI#67 (CLOSED iter-120) + KI#71 (CLOSED iter-121) deleted iter 124; KI#73–76 (all CLOSED iter-124) deleted iter 127; KI#78 (CLOSED iter 130) deleted iter 134 (closed >2 iterations); KI#79 opened iter 130 (drift-tool regex, informational); KI#80 opened + closed iter 134 (typo fold).

---

## Next step (authoritative)

Re-pinned every iteration. **Owner-gated rows are not auto-candidates — the owner decides.**

**Active track since iter 131: v1 → v2 architecture migration** (owner directive, chat 2026-09-14). Migration order: `v1 (frozen) → semantic extraction → v2 architecture → v2 build → parity audit → canonical audit → reader-path audit → switch`. Reader modes: **Learn → Build → Debug → Reference**. Old incremental-cleanup rows below are **superseded** (not auto-candidates); reuse as input only where a direct migration dependency exists.

1. **mig-5 — Enneagram data cluster (fourth bounded area, ready to execute on the mig-1 generator pattern):** map Registry B row 6 — `data/enneagram.json` becomes derived from the §5.4 table (DEC-17 direction precedent — generator pattern per mig-1: registry/canon record → generator → generated JSON → widget re-point); the per-type LIE duplication (`lie_template` + `LIE`) folds to one internal copy; E10 embed mini-cards → `SHARED_REFERENCE`; the stale prototype E10 copy stays §6.1-gated. Pattern: canonical record (§5.4) → generator → generated data layer → parity audit.
2. **Owner decision points remaining (map §6, recommended order):** visual-markup ownership (§6.1 — gates the prototype/extract disposals: E08 + E01 + E10 + E15 families after mig-2/mig-4/mig-5), E13 diagnostic mappings (§6.2 — gates mig-3), hero prototype disposition (§6.4), rule-strength convention (§6.5 — needed before Part 7A/8 v2 slices; the sampling-cluster presentation waits on it + the KI#72 value decision).
3. **mig-3 — Diagnostics cluster (Debug mode):** blocked on the E13 decision (§6.2).
4. **Superseded (per owner directive — do not auto-resume):** `Fork D 2/3` (sampling widget), `ki-70` (standalone; v1 wire/drop superseded by the v2 Reference design — the glossary slice already serves the Reference mode via panel/no-JS), `Fork D 3/3`, `ki-72` (as content decision — the KI#72 *value* decision resurfaces inside the migration's sampling-cluster disposition; 4 live locations after iter 133), `dupes-2` and equivalent sequential cleanup batches. `ki-79`, `cache-bust-1`, `vs-e09-hex`, obs-3/4/5/6: deferred unless a migration slice requires them.

A new agent: run the preflight in `AGENTS.md`, confirm this Next step against the worktree (`git log` vs iteration above), then start. iter-135 (mig-4 Token budget build slice) is complete and verified — three bounded areas now live (glossary Reference chain + CORE DIRECTIVES single presentation + Token budget single value owner). Three cluster audits MUST PASS: `python3 scripts/audit_glossary_parity.py`, `python3 scripts/audit_core_directives_parity.py`, `python3 scripts/audit_token_budget_parity.py` (all wired into `AGENTS.md` canon-audits). `data/glossary.json` is **generated** (`pnpm run build:glossary` / inside `pnpm run build`) — never hand-edit; term changes go through `docs/canon/glossary_registry.md` only. v1 remains frozen as migration source — do not edit `docs/canon/part_*.md`/`appendix_*.md` or `src/master/` content without an explicit migration-slice scope.
