# Changelog

> Only the latest iterations in detail. Older iterations = one-line summaries.
> Full history is in `git log`.
> Format: [Keep a Changelog](https://keepachangelog.com/).

## [9.2.6] — 2026-08-15

### iter 119 — Lazy-loader per-part fetch resilience (KI#69) + KI#70 discovery

- **Scope:** fix the root cause of the owner-reported "unstable tables/visualizations/widgets on the published site". Previous research session (BASE `bd06f8a1`) structurally confirmed the mechanism in `src/shell/lazy-loader.js:659-668` — per-part `fetch()` with a silent `.catch(() => '<!-- Failed to load … -->')`: no retry, no console signal, no user-visible indication; `Promise.all` still resolved and the loading overlay hid normally, so the page "looked loaded" while every table, VS-visualization and widget container of the failed part vanished together (network-dependent → "unstable", not systematically broken). Owner directive: resolve, choosing the variant that maximizes benefits while neutralizing drawbacks.
- **Solution selection:** A log-only / B retry-only / C visible-banner-only each leave one failure class untreated (persistent failures invisible, or transient blips force manual user action); E architectural bundling was rejected (research scoped the fix as non-architectural). Chosen **D — combined**: automatic retry (transient failures self-heal) + in-place visible placeholder at the exact document position of the gap (persistent failures become visible and actionable) + one-click surgical re-fetch (recovers a single part in place — scroll preserved, other parts untouched) + `console.warn` diagnostics (devs see file + HTTP status + attempt count).
- **Fix (`src/shell/lazy-loader.js`, +~130 lines):** new `PART FETCH RESILIENCE (KI#69)` section — `fetchPartHtml()` (2 retries, backoff 300/900 ms via `CONFIG.PARTS_RETRY_DELAYS_MS`; network-level errors, 5xx and 429 are retried; other 4xx fail fast — a genuinely missing file must not burn 1.2 s of retries); `escapeHtml()`; `partErrorHtml()` (in-place `role="alert"` callout, Russian, `data-part-file` hook); `wirePartRetryButtons()` (idempotent); `retryFailedPart()` (surgical re-fetch → splice children in place → re-run the standard post-injection sequence: `executeInlineScripts` (no-op — parts carry zero `<script>`), `initInteractiveElements` (idempotent), `generateTOC`, `initActivePartHighlighting`, `handleAnchor`); `loadContent()` fetch block → per-part result objects + failure-summary `console.warn` + placeholder wiring; manifest-error branch → visible callout + retry button wired to `loadContent()` **+ pre-existing `content-hidden` invisibility fixed** (`#content.content-hidden{display:none}` was never lifted in the catch — the old manifest error was invisible too; found by the runtime suite).
- **Fix (`src/shell/styles.css`, +24 lines):** `.load-error` + `.load-retry-btn` (runtime-UI classes in shell CSS — same domain as `.copy-btn`/`.pre-wrapper`, not `docs/components.md` content components) with error accent mirroring `.callout.rule`, focus-visible outline, disabled state, light-theme overrides.
- **KI#70 (OPEN, deferred — owner-gated):** during verification prep: `parts/manifest.json`'s `appendices` array (appendix_mbti / appendix_model_table / appendix_glossary) is never read by `lazy-loader.js` (only `manifest.parts`; git `-S` finds no consumer ever) → Appendix A (MBTI Reference + `mbti-composer` container), B (Model Capability Table), C (Glossary appendix) never render; the auto-injected TOC's `#appendix_*` links are dead. Same symptom family as KI#69 but systematic. Deferred per scope discipline (1-line wiring activates never-exercised widget paths → own verification iteration; `PLAN.md` ki-70).
- **Runtime verification (new capability this iteration, closing the gap the previous research could not):** headless Chrome (repo's own `puppeteer` devDependency + cached Chrome 152) driven through a fault-injecting HTTP server (per-path 503/404/flaky/connection-drop rules with request counters). **48/48 checks:** clean load (93 sections, no placeholders, no page errors) · persistent 503 (placeholder between p6/p7b sections, `role=alert`, 3 attempts, healthy parts fetched once, warn names file+status, subsequent part intact) · transient 503 ×2 (auto-recovery, no false warnings) · connection drop (network-error path, 3 attempts) · 404 (fail-fast, exactly 1 attempt) · manual retry (surgical recovery, TOC regenerated, scroll preserved, part live in DOM) · manifest 500 (visible error + full-reload retry). BASE control (worktree at `3a28a5dc`) reproduced the silent failure byte-for-byte (HTML comment, 80 sections, zero console signal) — before/after causality proven. VLM screenshot check: correct callout rendering in both themes' palette, Russian text, visible button.
- **Files (7 + 3 regenerated):** `src/shell/lazy-loader.js` · `src/shell/styles.css` · `STATUS.md` · `worklog.md` · `CHANGELOG.md` · `PLAN.md` (+ki-70, +cache-bust-1) · `DECISIONS.md` (DEC-14) · auto-regenerated via `pnpm run build`: `assets/lazy-loader.js` + `assets/shell-styles.css` + `index.html` (build timestamp).
- **Validation:** baseline BEFORE edits at `BASE_COMMIT 3a28a5dc` (build PASS hash `2ab607d6` · validate 5/5 · validate:master 12/12 · version:check 9.2.6 · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · english 19 / syntax 247 baselines). After edits: same battery + runtime suite — all green, hash `2ab607d6` unchanged (`src/shell/index.html` untouched), baselines unchanged, `git diff --check` clean.

### iter 118 — Editorial research intake + KI#68 fix (card-block counting)

- **Scope:** intake of the external textual/editorial research report (owner-delivered, produced WITHOUT a local clone — all claims unverified at delivery), evidence-based verification of its key claims against the actual repository, recording of every editorial task in repo documentation, and the fix of the one confirmed minimal defect. Content delta: 2 words (canon + master).
- **Research intake:** NEW `docs/research/editorial_research_en.md` (verbatim report body, 1288 lines + provenance header: source, stated limitation, iter-118 verification verdicts, research-KI vs repo-KI numbering note). Report covers 33 sections: semantic duplication as the main editorial problem, Part 1 overload, card anatomy ambiguity, CORE DIRECTIVES layering, Token Budget spread, diagnostics re-teaching, cognitive density, information timing, navigation debt, terminology hierarchy, rule strength, reading modes, editorial rule set proposal (§27), section-by-section editorial matrix proposal (§32).
- **Claim verification (spot-checks):** card-block counting — **CONFIRMED** → KI#68; reader-facing prose mixed with repo metadata (master `part_07a` "drift (KI#58)", "D4, iter 93"; `part_08` "iter 55 … KI#38 ✅ CLOSED") — **CONFIRMED** → backlog ed-6; SP/S·P MBTI collision — **PARTIALLY RESOLVED** already (glossary S·P disambiguation) → folded into ed-7.
- **KI#68 (CLOSED iter-118):** §1.2 `p1_card_overview` said "состоит из четырёх блоков" while the same section's E01 viz ("стек из 5 блоков"), 5-row block table and the Anchors RULE establish 5 blocks. Fixed: `docs/canon/part_01.md` + `src/master/part_01.html` "четырёх" → "пяти". The deeper re-model (core fields / behavioral layer / lorebook) assessed as unnecessary — the 5-block model + Anchors RULE is self-consistent.
- **Task recording:** `PLAN.md` — owner-gated **ed-policy** (adopt the §27 editorial rule set as content-editing law; useful-repetition whitelist: Price / SPINE causality / Show Never Tell / Embodiment) + backlog **ed-matrix** (§32 audit, prerequisite for edits) + **ed-1…ed-8** (P0-1/2/3/5, P1-7/8/9/10..13, P2 bundle — every row carries Task · Scope · Acceptance · Verification · Owner gate). P0-6 (functional-load preservation) embedded as acceptance criterion in ed-1/ed-7/ed-8. `STATUS.md` — iter 118, KI#68, Next step re-pinned (ed-policy → owner's choice; ed-matrix → non-gated candidate). `AGENT_NAVIGATION.md` §7 + research doc row.
- **Files (7 + 1 new + 2 regenerated):** `docs/research/editorial_research_en.md` (NEW) · `docs/canon/part_01.md` (1 line) · `src/master/part_01.html` (1 line) · `PLAN.md` · `STATUS.md` · `worklog.md` (this entry; iter-117 collapsed) · `CHANGELOG.md` (iter-118 entry; iter-115 collapsed) · `AGENT_NAVIGATION.md` (§7 row) · auto-regenerated via `pnpm run build`: `parts/part_01.html` + `index.html` (build timestamp).
- **Validation:** baseline BEFORE edits at `BASE_COMMIT 6d0029ae` (build PASS hash `2ab607d6` · validate 5/5 · validate:master 12/12 · version:check PASS · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · english 19 / syntax 247 baselines). After edits: same battery re-run — all green, hash `2ab607d6` unchanged (shell untouched), baselines 19/247 unchanged.

### iter 117 — Documentation hygiene (obs-1/obs-2 closure, doc-only)

- **Scope:** closed PLAN.md observations obs-1/obs-2 — the two stale-header docs (`docs/content_map.md`, `docs/architecture.md`) got a full content pass, not a header-only bump; plus factual fixes discovered during the pass (NAV §5) and new findings recorded (KI#67, obs-3, obs-4). No `src/`, `data/`, `scripts/`, `tests/`, workflows, root fallbacks touched — build hash `2ab607d6` unchanged.
- **`docs/content_map.md`:** header 9.2.0/2026-06-24 → 9.2.6/2026-09-13 (gate-visible plain format). Machine-verified content pass: three-way ID diff (canon 99 declared IDs · master 96 · map was 95) + §-column cross-check. Added missing `p1_prebuild_checklist` row (canon §1.8) + conceptual Part 0 table (2 §) + Appendix D table (1 §, H1-level, canon-only by design). Fixed 10 shifted Canon § in Part 7A (Token Budget §7A.3→§7A.12, etc. — canon renumbered, map didn't). Fixed `p1_structure_overview` §1.3 → §1.2 (subsection; auto-TOC, no own H2). Summary: Part 1 7→6, Total → 96 master sections + explicit counting-convention note (96 master / 97 canon H2 / 99 declared IDs; "97/97" in the sync audit = 97 regression checks). Post-edit machine check: 97 rows, 0 mismatches, full canon↔map coverage.
- **`docs/architecture.md`:** header 9.2.0/2026-07-25 → 9.2.6/2026-09-13. "Pre-commit Hooks" section rewritten to reality (was listing QA scripts that are NOT in the hook; actual `.husky/pre-commit` = lint + build + validate, `SKIP_ARTIFACT_BUILD=1` doc-only escape) + new QA gates/audits list. CI/CD section → the three actual workflows. Directory tree rebuilt from the actual repo (removed nonexistent `cross_reference_sync.md`/`user_journeys.md`/`validate-migration.mjs`; added `src/assets/`, `src/scripts/`, `visual-system/`, root fallbacks, agent docs, `canon/`, `research/`). Section-markup example now carries `id` (fence #5); `p7_core_directives` → `p7a_core_directives`; widget behavior location fixed (`src/shell/widgets/*.js`, 12 widgets); shell stage inputs/outputs completed (+ `src/assets/`, root fallbacks); version-history table → CHANGELOG pointer (information ownership §10).
- **`AGENT_NAVIGATION.md`:** §5 CORE DIRECTIVE #7 corrected "Format Lock" → **"Pre-Generation Filter"** (verified vs canon `part_07a.md` §7A.2, master HTML, architecture.md, STATUS invariant; Format Lock = separate SP element §7A.4). §7 doc map: + `docs/CONTENT_RESTRUCTURE_PLAN.md` row (historical iter-6 strategy, referenced by `docs/canon/_README.md` — not a deletion candidate).
- **New KI#67 (OPEN):** `qa:doc-versions` gate blind — `check-doc-versions.mjs` regex does not match the bold header format `**Last Updated:**` used across `docs/*.md`; every file skipped, gate always passes. Both fixed files now use the gate-visible plain format; script-regex fix queued as PLAN backlog row ki-67. Observations obs-3 (CONTENT_RESTRUCTURE_PLAN status marking — owner decision) and obs-4 (components.md/terminology_dictionary.md stale headers, each needs a content pass) recorded.
- **Files (7, all doc-only):** `docs/content_map.md` · `docs/architecture.md` · `AGENT_NAVIGATION.md` · `STATUS.md` · `PLAN.md` · `worklog.md` · `CHANGELOG.md` (this entry; iter-114 collapsed to one-liner per "latest 2–3 in detail" cap).
- **Validation:** baseline BEFORE edits at `BASE_COMMIT 01a4f9d1`: build PASS (hash `2ab607d6`) · validate 5/5 · validate:master 12/12 · version:check PASS · tests 64/64 · canon sync 97/97 · drift exit 0 · qa:csp/bundle/contrast PASS · english 19 / syntax 247 (baselines). After edits: build re-run PASS (hash unchanged) · version:check PASS · canon sync 97/97 · drift exit 0 · content-map machine check 0 mismatches · `qa:doc-versions` parses both fixed files ✅ · build timestamp churn in root `index.html` restored (doc-only convention).

### iter 116 — Agent operating-system rework (meta-iteration, doc-only)

- iter 116 — Agent operating-system rework (meta, doc-only): `AGENTS.md` rewritten as operating law (authority order, preflight, anti-loop, scope discipline, DoD, delivery vs BASE_COMMIT) + NAV de-historized + §10 information ownership + STATUS → state snapshot with authoritative Next step + PLAN → live backlog + `DECISIONS.md` created. 7 files + 1 new, hash `2ab607d6` unchanged. Detail: git `01a4f9d1`.

### iter 115 — Dead CSS cleanup in `src/shell/styles.css` (V-pattern blocks + M3 dead subset)

- iter 115 — Dead CSS cleanup in `src/shell/styles.css`: V-02/V-06/V-15 V-pattern blocks (240 lines) + 6 specific dead M3 rules (8 lines) removed; 248 lines total, ~5.3 KB. M3 widget CSS confirmed LIVE via 4-axis grep (iter-114 claim disproved). 1 source + 4 docs + 2 auto-regen. Canon sync 97/97. Build hash `2ab607d6` unchanged. (Full detail: git commit `c212a024`.)

### iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css` (SECTION 3 + dead SECTION 4 utilities)

- iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css`: SECTION 3 (VS Shared Patterns P1–P6, 196 lines) + 12 dead SECTION 4 utility blocks (211 lines) removed; 407 lines / ~10.2 KB. Verified dead via 4-axis grep; preserved live utilities documented. 1 source + 3 docs + 2 auto-regen. Canon sync 97/97. Build hash `2ab607d6` unchanged. (Full detail: git commit `c5ac950c`.)

### iter 113 — Mermaid infrastructure removal (dead code since iter 14)

- Mermaid CDN `<script>` + `widgets/mermaid-init.js` (141 lines) + lazy-loader init/render block + `reRenderMermaid()` + `.mermaid` CSS removed; CSP tightened (script-src dropped CDN, worker-src directive dropped entirely). 3 source + 1 deleted + 4 docs + 6 auto-regen. Canon sync 97/97. Build hash `c5c429e2` → `2ab607d6`. Detail: git `ce8139ba`.

### iter 112 — Dead code cleanup: 4 dead widgets + .fi26 CSS utilities removed (601 lines)

- iter 112 — 4 dead widgets removed (`diagnostic-tree`, `blueprint-viewer`, `author-note-viewer`, `vs-e15-blueprint`, 339 lines JS) + 4 script tags + 3 initAll() calls + `.fi26-*` CSS utilities (262 lines). 601 lines total. 3 source + 4 deleted + 3 docs + 6 auto-regen. Canon sync 97/97. Build hash f70870c0 → c5c429e2. 0 new English leaks. (See git commit `bed5eded` for full detail.)

### iter 111 — Fork D (part 1/3): Voice Influence Hierarchy interactive widget + naming drift fix

- New widget `persona-voice-hierarchy` (16th widget): model-tier toggle (12B/32B+/API) + hover-sync with sibling table + Markdown export. Canon-embedded data (6×3 from §3.2 table) — exception to data/*.json rule. Fixed naming drift in `part_07a.md` (`p3_voice_hierarchy` → `p3_influence_hierarchy`). 7 source + 6 auto-regen. Canon sync 97/97. Build hash 8499b4e3 → f70870c0. 0 new English leaks. (See git commit `c3b7e478` for full detail.)

### iter 110 — Multilingual forks A+B+C: layered SP language rule + Identity name-language rule + Script Tax / Vocabulary Size

- **Fork A — SP language rule softened (layered by model capability):** §7A.2 RULE was universal "директивы SP и CORE DIRECTIVES пишутся на английском". Now 3-tier: (1) 12B with <64K vocab (early Llama 2, Qwen 1.x, early Mistral) → English — historically more stable; (2) 12B–14B current-gen with ≥128K vocab (Gemma 3 12B, Mistral Nemo, Qwen 2.5 14B) → English optimal, card language acceptable; (3) 32B+ and API → card language preferred — model is fully multilingual, unified SP+RP language improves consistency. Threshold rule: ≥128K vocab + native card-language support → use card language for entire SP. Mirrored to §7A.7 model checklist (SP Language cell + footnote ¹ expanded), §7A.1 inline `<small>` hint, §9.10 12B-specific scenario, §9.11 Quick Check item #8 (renamed "Директивы на английском" → "Язык SP"), glossary CORE DIRECTIVES entry, AGENT_NAVIGATION §5 CORE DIRECTIVES block + §6 pitfall #4.
- **Fork B — Identity Block name-language rule formalized:** §7A.1 new RULE — character name preserves canonical form (Cyrillic/Latin/CJK) across all card blocks: Identity Block, Description `<identity>` XML tag, Greeting, Examples. Transliteration forbidden — model processes name as token-anchor of identity, not as instruction. Latin variant allowed only if documented as canonical (e.g., `Omnis-Zeta`). Mirrored to glossary Identity Block entry.
- **Fork C — Script Tax + Vocabulary Size as new Model Table concepts:** Added 2 new rows to Appendix B Model Capability Table — `Vocabulary Size` (32K typical for early 12B; 128K for current 12B–14B Gemma 3/Qwen 2.5/Mistral Nemo; 32K–128K for 32B+; 100K+ for API) and `Script Tax (non-Latin)` (high on 32K vocab: Cyrillic ~1.5–2× Latin, CJK ~1–2×; medium on 32K 32B+; low on ≥128K / API). Added new RULE in §7A.12 Token Budget — Script Tax note: for non-Latin scripts, 1 Cyrillic char ≈ 1.5–2 tokens on 12B 32K vocab, ≈1 token on ≥128K / API; threshold ≥128K → Script Tax negligible. NOT a separate "Multilingual scenarios" section — integrated into existing Model Table + Token Budget to avoid scope creep / redundancy. Updated `12B следствие` bullet in `appendix_model_table.md` to reference new Script Tax + nuanced SP Language rule.
- **Fork D — DEFERRED:** iter-113 (voice hierarchy + sampling + persona widget) touches JS infrastructure (lazy-loader.js, widgets/, possibly new widget data schema). Risk > reward vs text-based forks A+B+C. Documented in STATUS roadmap + AGENT_NAVIGATION roadmap as deferred — pending bandwidth for thorough widget testing.
- **Files edited (9 source + 6 auto-regenerated):** 4 canon MD (`part_07a.md`, `part_09.md`, `appendix_model_table.md`, `appendix_glossary.md`) + 4 master HTML (same 4 names) + `AGENT_NAVIGATION.md`. Auto-regenerated via `pnpm run build`: 4 `parts/*.html` + `index.html` + `build.hash`.
- **Validation:** `pnpm run build` SUCCESS (hash 8499b4e3 unchanged — no shell/widget changes). `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` / `qa:bundle` / `qa:contrast` / `qa:doc-versions` PASS.
- **English leak baseline:** 19 → 19 (no regression). Verified via `git stash` + re-run. All new prose in Russian; only established tech terms kept (12B, 32B+, API, SP, SPINE, Latin, Cyrillic, CJK, Llama, Qwen, Mistral, Gemma, Claude, GPT, Gemini).
- **qa:syntax pre-existing FAIL:** 247 patterns in 11 files — pre-existing baseline (verified via `git stash` + re-run). NOT caused by iter-110.
- **Scope:** 9 source files (4 canon MD + 4 master HTML + 1 AGENT_NAVIGATION) + 6 auto-regenerated root fallbacks. Over 3–5 file soft limit, justified by coherent multilingual-forks-abc pass in one iteration (single theme = multilingual actualization v2). All edits text-only — no structural changes, no section ID changes, no widget/CSS/JS changes.
- **User constraints honored:** (1) No crutches — all 3 forks implemented as principled rules (layered model-dependent SP language; canonical name preservation; integrated Script Tax concept). (2) No garbage — no separate "Multilingual scenarios" section (would create redundancy with Model Table + Token Budget). (3) Fork D deferred explicitly — avoids JS infrastructure risk in this iteration.
- **No KI opened or closed.** No open KIs remain.

### iter 108 — Мультиязычная актуализация (safe text-only pass) + KI#65 CLOSED (canon→master directive drift fix)

- **KI#65 CLOSED (canon→master directive drift):** `src/master/appendix_model_table.html` had wrong CORE DIRECTIVE numbers — "Consequence Driven (Directive #4)" and "Pre-Generation Filter (Directive #5)" — while canon correctly had #6 and #7. Fixed master: `#4 → #6`, `#5 → #7`. `parts/appendix_model_table.html` regenerated by build. Canon sync 97/97 PASS maintained.
- **Removed unsupported empirical claims (#1, #25, #26):** The "~15–20% higher English instruction compliance" number appeared in 9 places across canon/master/AGENT_NAVIGATION — without a benchmark source. Replaced with qualitative formulation: "На 12B-моделях английские инструкции исторически соблюдаются стабильнее — обучающая выборка ранних моделей содержала больше английских инструкционных паттернов. Для 32B+ и API-моделей разрыв несущественен." Methodology disclaimer (§1.1, §3.1) extended with model generation context: "12B–32B моделях 2024–2025 годов (Llama 2, Qwen 1.x, ранний Mistral). Для современных моделей со словарём от 128K токенов (Llama 3, Qwen 3, Gemma 3) разрывы могут быть меньше указанных."
- **Replaced misleading "native-language" wording (#2):** `appendix_model_table.md` row "English Instruction Adherence" cell — `~15–20% higher than native-language instructions` → `Historically higher on 12B (English-dominant training); narrows on ≥128K vocabulary`. Removes both the unsupported number and the "native-language" generalization (which implied all non-English languages behave identically — contradicts Script Tax findings).
- **Updated 12B model examples (#4):** `part_09.md` §9.10 — "Qwen 12B, Llama 2 13B" (2 generations old) → "Gemma 3 12B, Mistral Nemo 12B, Qwen 2.5 14B и подобные модели класса 12–14B актуальных поколений".
- **Refined "training data has more English patterns" claim (#3):** §7A.2 RULE — was universal ("потому что обучающая выборка содержит больше английских паттернов инструкций"), now scoped to early models only. Removes false universality for modern multilingual models.
- **Files edited (13 source + 8 auto-regenerated):** 6 canon MD (`part_01.md`, `part_03.md`, `part_07a.md`, `part_09.md`, `appendix_glossary.md`, `appendix_model_table.md`) + 6 master HTML (same 6 names) + `AGENT_NAVIGATION.md`. Auto-regenerated via `pnpm run build`: 6 `parts/*.html` + `index.html` + `build.hash`.
- **Validation:** `pnpm run build` SUCCESS (hash 8499b4e3 unchanged — no shell/widget changes). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` / `qa:bundle` / `qa:doc-versions` / `qa:contrast` PASS.
- **English leak baseline:** 19 → 19 (no regression). Verified via `git stash` + re-run on baseline: 19 was the actual baseline before iter-108 (CHANGELOG iter-107 said "17 → 17" but that referred to a different leak category — actual `check_english.py` baseline is 19). All 19 leaks are by-design (Part 10 Elena example card content, Part 06 stair-step format, SP directives, Tone Frame strings). iter-108 added 0 new leaks — all rewritten text is Russian, no new English terms introduced.
- **qa:syntax pre-existing FAIL:** `check_syntax_mix.py` reports Markdown patterns in `part_01.html` — pre-existing baseline issue (verified via `git stash` + re-run). NOT caused by iter-108. Documented in STATUS.md for awareness; out of scope for this iteration (safe text-only pass).
- **Scope:** 13 source files (6 canon MD + 6 master HTML + 1 AGENT_NAVIGATION) + 8 auto-regenerated root fallbacks via `pnpm run build`. Over 3–5 file soft limit, justified by combined text-actualization + drift fix in one iteration. All edits text-only — no structural changes, no section ID changes, no widget/CSS/JS changes.
- **User constraints honored:** (1) No new English terms — all rewritten prose in Russian, only established tech terms kept (12B, 32B+, API, SP, SPINE, Llama, Qwen, Mistral, Gemma); (2) Max semantic density — each replacement more informative than original; (3) No contradictions — §7A.2 RULE, Model Table cell, glossary entry, key follow-up all use consistent qualitative formulation; (4) No verbatim repetitions — each location has slightly different phrasing appropriate to context.
- **KI#65 CLOSED iter-108.** No open KIs remain.

### iter 107 — Category B/C extended translation pass + KI#64 CLOSED (mermaid-init.js rollback)

- cautious zone → осторожная зона (8 occ in part_05) + Embodiment Protocol quad State/Body/Sensor/Speech → Состояние/Тело/Сенсор/Речь (part_02 E04) + KI#64 CLOSED (JSDoc rollback 9.3.0 → 9.2.6). 7 source files. Canon sync 97/97. Build hash 8499b4e3 unchanged. 64/64 tests PASS.

### iter 106 — Category B final polish: 3 heading translations + survey script fix + translation backlog CLOSED

- 3 heading translations (`Model Capability Table` → `Таблица возможностей моделей`, `Token Budget Check` → `Проверка бюджета токенов`, `Tier 3 CoT (API only)` → `Tier 3 CoT (только API)`) + `survey_english_terms.py` fix (14 tokens moved TRANSLATABLE_LEAKS → ALLOWED_SINGLE_WORDS, categorize_token bug fixed). English leaks 19 → 17. 7 source files. Canon sync 97/97.

### iter 105 — Category C borderline translation pass: Quick/Full Check + Grade A/B/C tier labels translated

- `Quick Check` → `Быстрая проверка`, `Full Check` → `Полная проверка`, `Grade A/B/C` → `класс A/B/C` (Quality Grade compound kept as proper noun). Translation policy decisions Q1–Q10 documented for iter-106+. 5 source files. English leaks 18 → 17. Canon sync 97/97.

### iter 104 — Category B translation pass: PLANNED but NOT COMMITTED

- iter-104 was documented in worklog/CHANGELOG but the commit was never made. iter-106 picks up the same 3 Category B heading translations (`Model Capability Table`, `Token Budget Check`, `Tier 3 CoT (API only)`) and completes them. See iter-106 entry above for the actual implementation.

### iter 103 — English terms audit + categorization (doc-only)

- Surveyed all 14 master HTML files (~6,600 lines, 3 238 Latin-token instances). New script `scripts/survey_english_terms.py`. Categorized into A (KEEP ENGLISH ~1 440), B (TRANSLATE ~470), C (BORDERLINE ~640), D (HTML ARTIFACTS ~120). 3 new artifacts: audit report + companion JSON + re-runnable survey script. 3-iteration translation plan proposed. No source HTML changes.

### iter 102 — VS-EMBED placement audit + reorder (6 misplaced visual elements fixed)

- 6 misplaced VS-EMBEDs (E14, E06, E09, E08, E16, E02) moved inside their sections after intro `<p>`. 4 master HTML + 1 audit script + 3 doc files. KI#65 CLOSED. 97/97 PASS. Build PASS. 64/64 tests PASS.

### iter 101 — Agent infrastructure English rewrite + actualization

- New `AGENTS.md` (short LLM-friendly entry point). `AGENT_NAVIGATION.md`, `STATUS.md`, `worklog.md`, `PLAN.md` rewritten in English. `README.md` updated with `AGENTS.md` reference. KI#64 documented (mermaid-init.js version drift).

### iter 100 — Mermaid dynamic theme re-render on toggle

- **`widgets/mermaid-init.js`:** Added `window.reRenderMermaid(theme)` — re-initializes mermaid with appropriate theme config (`dark` for OLED, `default` for Light), restores original diagram source from `data-original` attribute, removes `data-processed`, and calls `mermaid.run()` to re-render all diagrams.
- **Light theme config:** `theme: 'default'` with light-appropriate `themeVariables` (light bg/text colors).
- **Dark theme config:** `theme: 'dark'` with existing OLED brand colors (unchanged).
- **`assets/lazy-loader.js`:** `applyTheme()` now calls `reRenderMermaid(theme)` after CSS class toggle. Safe no-op if function unavailable.
- **`lazy-loader.js`:** Before initial `mermaid.run()`, saves diagram source text to `data-original` attribute (enables future re-render without losing source).
- **`assets/shell-styles.css`:** Added `body.theme-light .mermaid` and `body.theme-light .concept-diagram` overrides (light border/background).
- **Mirror files synced** (`assets/` ↔ `src/shell/`).
- ⚠️ Side effect (documented as KI#64 in iter 101): JSDoc `@version` in `mermaid-init.js` was bumped to `9.3.0` alone, breaking 4-place version sync.

### iter 99 — Theme chain simplified

- `body.theme-oled` removed. Default = OLED/dark (no class). Only `theme-light` is toggled. Simplifies theme logic across CSS and JS.

### iter 98 — Dark theme removed

- Dark theme removed. Only OLED + Light remain. Reduces theme matrix from 3 → 2.

### iter 97 — Annotation callout blocks removal

- **Annotation callout blocks removed:** All 4 "Annotation: Карточка ... демонстрирует:" blocks (Elena §10.1, Walter §10.2, Omnis-Zeta §10.3, Vyshcherblenny §10.4) removed from canon, master HTML, and parts fallback. Per author request — text nobody reads.
- **Cross-ref line removed:** "Подробно о Lorebook → Part 7B. CoT Anchors → Part 6. GHOST Layers → Part 4." removed from all 3 Part 10 sources.
- **Audit script updated:** P2-18 positive checks → negative checks. 97/97 PASS.
- **Build regeneration:** Root fallbacks regenerated. Version sync ✓.

### iter 96 — KI#63 version drift fix

- KI#63 closed. All 4 version sources synced at 9.2.6. Root fallbacks regenerated.

### iter 95 — E2/KI#58 Dead weight cleanup + Anchors parts/ sync

- **E2 — Dead weight cleanup:** 5 unused characters removed from `docs/character_bible.md` (Geralt, Joker, Jesse Pinkman, Edward Elric, Elliot Alderson — 0 mentions in any Part). Tyler Durden → 🟡 Marginal (1 mention in Part 5). Lorebook Entry 2 (пожар Елены) → ⚠️ NON-CANONICAL secondary GHOST.
- **KI#58 — Anchors parts/ sync:** Omnis-Zeta + Vyshcherblenny `[ANCHORS]` plain text in `parts/part_10.html` → `<anchors>` XML canonical + bodily/mechanical Prices from `src/master/part_10.html`. All 4 cards now use `<anchors>` XML in parts/.

### iter 94 — E1/KI#60/KI#61/KI#62 Voice leak + Walter sync + audit fix

- **E1/KI#60 — Elena Voice leak fixed:** "саркастичная" removed from `<identity>` across all 3 layers (master, parts, canon). §9.11 Quick Check Voice row: ✗ FAIL → ✓ PASS.
- **KI#61 — Walter parts/ sync:** Tone Frame expanded, OOC PROTECTION + Format Lock + `<identity>` wrapper + OCEAN compact format + `<anchors>` XML + Annotation bullets synced.
- **KI#62 — Audit script fix:** `audit_canon_master_sync.py` P2-18 check updated to current merged Anchors format. 96/96 PASS.

### iter 93 — D1–D4 Guide self-contradictions

- **D1:** §9.11 Elena Voice check false claim fixed (✗ FAIL instead of ✓ PASS).
- **D2:** OCEAN format unified to compact `O:72 C:65 E:41 A:38 N:68` (no pipes/commas) across 12 locations.
- **D3:** Anchors format convention documented — `<anchors>` XML canonical in src/master/, `[ANCHORS]` plain text in parts/ = KI#58 drift.
- **D4:** CORE_DIRECTIVES shorthand `{{CORE_DIRECTIVES — ...}}` accepted as convention.

---

## Older Iterations (iter 1–92)

Brief. Full history: `git log` and `docs/research/`.

- **iter 89–92:** C1–C4 Bible sync (Walter/Omnis/Vyshcherblenny/Elena) + Walter GHOST Anchor-trigger + OCEAN cautious zones + Vyshcherblenny Examples expand + V3 Anchor Prices bodily.
- **iter 86–88:** B1–B4 Examples enrichment — all 4 cards Examples expanded to 80–120 tok per `<START>` block.
- **iter 83–85:** A5–A8 — Omnis-Zeta 5/7 Anchor Prices bodily; Vyshcherblenny GHOST → concrete event; All cards `<anchors>` XML + Tone Frames expand.
- **iter 82:** A2–A4 — Walter SP Tone Frame + OOC + `<identity>` wrapper + LIE fix.
- **iter 81:** A1 — Elena SP Tone Frame + OOC Protection.
- **iter 80:** Exploratory audit of examples (research-only): 4 universal violations, 26 card-specific, 20 Bible-vs-card discrepancies, 4 self-contradictions.
- **iter 1–79:** Docs restructure + canon scaffold + migration + VS elements + CSS scoping. Key milestones: iter 79 (Voice Isolation refinement), iter 78 (Anchors placement P7A-R16), iter 77 (OCEAN cautious zones), iter 76 (CoT Tier 0), iter 75 (P1 Fixes), iter 70–74 (Recon V1–V9).
