# Changelog

> Only the latest iterations in detail. Older iterations = one-line summaries.
> Full history is in `git log`.
> Format: [Keep a Changelog](https://keepachangelog.com/).

## [9.2.6] — 2026-08-15

### iter 115 — Dead CSS cleanup in `src/shell/styles.css` (V-pattern blocks + M3 dead subset)

- **Scope:** Single-purpose iteration — remove dead CSS from `src/shell/styles.css` only. Symmetric to iter-114 (which targeted `src/assets/vs-styles.css`); separate file per iter-112 clean-diff convention. Closes out the "dead CSS" debt — both CSS files now trimmed to in-use rules only.
- **V-pattern blocks removed (3 blocks, 240 lines, 4518 bytes):** All verified dead via 4-axis grep (0 usages in `src/master/` + `parts/` + 0 descendant selectors in CSS + 0 `className`/`classList` injections in `src/shell/widgets/*.js`):
  - **V-02 inf-pipeline-vertical (31 lines):** `.inf-pipeline-vertical` + 3 descendant rules (`.inf-pipeline-step`, `::before`, `:last-child::before`). Zero usages.
  - **V-06 spine-stack (28 lines):** `.spine-stack`, `.spine-stack-item`, `.spine-stack-item + .spine-stack-item`, `.spine-stack-label`, `.spine-stack-desc`. Zero usages.
  - **V-15 spine-validator (181 lines):** Whole family — `.spine-validator`, `.spine-validator-intro` (+ `p`), `.spine-inputs`, `.spine-input-group` (+ `label`, `label::before`, `:nth-child(N) label::before`, `textarea`, `textarea:focus`, `textarea::placeholder`), `.spine-validator-actions`, `.spine-validate-btn` (+ `:hover`), `.spine-clear-btn` (+ `:hover`), `.spine-validator-result` (+ `.hidden`), `.spine-result-item` (+ `:last-child`), `.spine-result-icon` (+ `.pass/.warn/.fail`), `.spine-result-text`, `.spine-result-label`, `.spine-result-desc`, `.spine-result-summary` (+ `.valid/.invalid/.needs-work`). Verified: `enneagram-spine-input` (different class, with prefix) is the only `spine-input` substring match — used by `enneagram-builder.js:530`, NOT affected.
- **M3 dead subset removed (8 lines, 794 bytes):** The M3 region (lines 3536–3732) is MOSTLY alive — used by active widgets via dynamic `className` injection. 4-axis grep identified only specific dead rules:
  - `body.theme-light .ocean-comfort-tooltip` rule + comment (orphaned theme-light override — JS never creates a `.ocean-comfort-tooltip` element).
  - `.ocean-conflict-marker-marker-orange` (variant never injected — JS only sets base `.ocean-conflict-marker` class at `ocean-insight.js:788`).
  - `.ocean-conflict-marker-marker-red` (same — variant never injected).
  - `.ocean-comfort-tooltip` (never created by JS — only `.ocean-comfort-zone` and `.ocean-conflict-marker` are appended to wrapper).
  - `.ocean-slider-track-wrapper:hover .ocean-comfort-tooltip` (orphaned — no `.ocean-comfort-tooltip` exists to hover-trigger).
  - `.ocean-highlight-notification.fadeout` (dead — JS uses `removeChild` to dismiss notifications, never adds `.fadeout` class).
- **PRESERVED (verified live, do NOT touch):** `.ocean-slider-track-wrapper` (`ocean-insight.js:775`), `.ocean-comfort-zone` (`:781`), `.ocean-conflict-marker` (`:788`), `.ocean-comment-row`/`-input` (`:795,798`), `.ocean-highlight-notification` (`:330`), `@keyframes ocean-notification-fadein` (used by `.ocean-highlight-notification` animation), `.enneagram-conflict-warnings` (`enneagram-builder.js:380`), `.conflict-warning`/`.warning-icon`/`.warning-question` (`:383-386`), `.enneagram-mbti-live*`/`-compat` (`:319-324`), `.mbti-match-highlight` (`:311`), `.mbti-enneagram-*` (`mbti-composer.js:225,238-267`), `.mbti-ocean-compat*` (`:287-311`), `.compat-trait-letter`/`-arrow` (`:309,311`), `.mbti-export-section`/`-btn` (`:357-358`).
- **Discovery (recorded for future agents):** iter-114 worklog claimed "M3 widget CSS" was dead and deferred to iter-115. iter-115 4-axis grep showed this was WRONG — most M3 widget CSS is alive (used by `ocean-insight.js`, `enneagram-builder.js`, `mbti-composer.js` via `className =` injection). Only the specific 6 rules above are actually dead. Lesson: always run 4-axis grep before claiming a CSS region is dead; "M3" is a phase label, not a liveness indicator.
- **Files edited (1 source + 4 docs + 2 auto-regenerated):** EDITED `src/shell/styles.css` (7273 → 7025 lines, 248 lines / 5312 bytes / ~5.3 KB removed, ~3.4% reduction) + `STATUS.md` + `worklog.md` + `AGENT_NAVIGATION.md` (§8 roadmap + top header iter 114 → 115) + `CHANGELOG.md` (this entry, iter-112 collapsed to one-liner per "latest 2–3 in detail" rule). Auto-regenerated via `pnpm run build`: `assets/shell-styles.css` (root fallback — matches canonical, 7025 lines) + `index.html` (root — only "Generated:" timestamp comment changed, hash unchanged).
- **Validation:** `pnpm run build` SUCCESS (hash 2ab607d6 UNCHANGED — expected per AGENT_NAVIGATION §2 invariant: hash computed only from `src/shell/index.html`; `src/shell/styles.css` changes don't enter the hash). `validate` 5/5 + SHELL-STYLES PASS. `validate:master` 12/12 PASS (pre-existing warnings unchanged). `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `audit_canon_master_drift.py` informational exit 0. `audit_vs_embeds.py` no regressions. `audit_component_extracts.py` exit 0. `qa:csp` PASS. `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — no `src/master/` edits). `qa:syntax` 247 baseline (pre-existing, no regression). `qa:doc-versions` PASS. CSS brace integrity verified (1352/1352 balanced — was 1376/1376 before removal, delta -24 matches removed block count).
- **Scope:** 1 source file edited = within 3–5 soft limit. Coherent single-purpose iteration (dead CSS removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via 4-axis grep + build + 64 tests + 5 QA gates + 4 canon audits + brace integrity check.
- **No KI opened.** No open KIs remain.

### iter 114 — Dead CSS cleanup in `src/assets/vs-styles.css` (SECTION 3 + dead SECTION 4 utilities)

- **Scope:** Single-purpose iteration — remove dead CSS from `src/assets/vs-styles.css` only. Separate file from `src/shell/styles.css` (V-pattern + M3 cleanup deferred to iter-115 per iter-112 clean-diff convention).
- **SECTION 3 (entire, 196 lines) — VS Shared Patterns P1–P6 removed:** `.p-stack*`, `.p-flow*`, `.p-tree*`, `.p-radial*`, `.p-compare*`, `.p-blueprint*` + adaptive `@media (max-width: 768px)` block. Zero production usages. Visual-system prototype HTML keeps its own copy via `visual-system/shared/patterns.css` `<link>` tag — not deployed, not affected.
- **SECTION 4 dead utilities (211 lines) removed:** `.glow-cyan/violet/danger/amber`, `.panel--raised`, `.accent-strip--cyan/violet/amber/danger`, `.label-mono`, `.label-micro`, `.badge--danger`, `.badge--success`, `.scroll-enter--right`, `.scroll-enter--scale`, `.element-number`, `.element-title`, `.element-subtitle`, `.element-links` (+ descendant `.badge` rules), `.mini-map*` (bare — `vs-mini-map*` with prefix is the live class, defined in `src/shell/styles.css` L7021+), `.mono-block`, `.border-dashed`, `.token-annotation`, `.hover-lift` (+ `:hover`). Zero production usages, zero descendant selectors.
- **Preserved (used in production):** `.panel` (14×), `.label` (202×), `.badge` + `.badge--cyan/violet/amber/muted` (72×+44+14+2+2), `.severity-dot` + `--high/--medium` (30+16+14), `.scroll-enter` + `--left` + `.is-visible` (212+10 — required by `vs-scroll-observer.js` SCROLL_ENTER_SELECTOR per §6 pitfall #13).
- **Audit methodology (4-axis grep):** (a) `class="...<class>"` in `src/master/` + `parts/` → 0; (b) `.<class>` descendant selector refs in `vs-styles.css` + `src/shell/styles.css` → 0; (c) `className`/`classList`/`class=` injection in `src/shell/` JS → 0; (d) confirmed `vs-mini-map.js` widget uses `vs-mini-map*` class names (not bare `mini-map*`), and `.vs-mini-map*` CSS lives in `src/shell/styles.css` L7021+ — so bare `.mini-map*` rules in vs-styles.css SECTION 4 are dead.
- **Build script verification:** `src/assets/vs-styles.css` is canonical — `build-shell-unified.mjs` step 5 just `copyFile`s it to `dist/assets/`; no consolidation from `visual-system/shared/*.css`. Edits will NOT be overwritten on next build.
- **Files edited (1 source + 4 docs + 2 auto-regenerated):** EDITED `src/assets/vs-styles.css` (3649 → 3242 lines, 407 lines / ~10.2 KB removed, ~11% reduction) + `STATUS.md` + `worklog.md` + `AGENT_NAVIGATION.md` (§8 roadmap + top header iter 113 → 114) + `CHANGELOG.md` (this entry). Auto-regenerated via `pnpm run build`: `assets/vs-styles.css` (root fallback — matches canonical, 3242 lines) + `index.html` (root — only "Generated:" timestamp comment changed, hash unchanged).
- **Validation:** `pnpm run build` SUCCESS (hash 2ab607d6 UNCHANGED — expected per AGENT_NAVIGATION §2 invariant: hash computed only from `src/shell/index.html`; vs-styles.css changes don't enter the hash). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync (no version bump). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `audit_canon_master_drift.py` informational exit 0. `audit_vs_embeds.py` no regressions. `qa:csp` PASS. `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — no `src/master/` edits). `qa:syntax` 247 baseline (pre-existing, no regression). `qa:doc-versions` PASS. CSS brace integrity verified (572/572 balanced).
- **Scope:** 1 source file edited = within 3–5 soft limit. Coherent single-purpose iteration (dead CSS removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via 4-axis grep + build + 64 tests + 5 QA gates + 3 canon audits + brace integrity check.
- **No KI opened.** No open KIs remain.

### iter 113 — Mermaid infrastructure removal (dead code since iter 14)

- **Mermaid.js CDN dependency removed.** Mermaid content diagrams were replaced by VS-EMBEDs in iter 14 (`docs/canon/part_01.md` line 51: "Mermaid удалён в iter 14 (дублировал TOC)"); only the CDN script + init widget + lazy-loader logic + `.mermaid` CSS block remained as dead infrastructure. Verified pre-deletion: 0 occurrences of `class="mermaid"` or `.mermaid` selector in `src/master/` + `parts/` (content was already clean). 0 references in `tests/`.
- **`src/shell/widgets/mermaid-init.js` DELETED (141 lines):** Theme configs (`DARK_CONFIG` / `LIGHT_CONFIG`) + `mermaid.initialize()` initial init + `window.reRenderMermaid(theme)` dynamic re-render function. All dead — no `.mermaid` containers in DOM to initialize or re-render. Iter-100 work fully reverted.
- **`src/shell/index.html` (130 → 121 lines):** Removed Mermaid CDN `<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js">` + `<script src="widgets/mermaid-init.js">` + 5 comment lines (FIX-26 + KI#23 fix). CSP tightened: `script-src 'self' 'unsafe-inline' cdn.jsdelivr.net` → `script-src 'self' 'unsafe-inline'` (Mermaid was the only CDN script consumer); `worker-src 'self' blob:;` directive dropped entirely (was Mermaid v11 Web Worker only — verified no other Worker blob: usages in `src/`; existing `URL.createObjectURL(blob)` calls in `persona-synthesis.js` L490 + `lazy-loader.js` L548 are download/export blobs, not Worker blobs). `cdn.jsdelivr.net` retained in `style-src` + `font-src` for Geist font CSS.
- **`src/shell/lazy-loader.js` (1666 → 1613 lines):** Removed Mermaid init/render block at L682–726 (45 lines: `requestAnimationFrame` wrapper + `document.querySelectorAll('.mermaid')` source save + `mermaid.initialize()` fallback init + `mermaid.run()`/`mermaid.init()` render with API fallback). Removed `reRenderMermaid()` call in `applyTheme()` at L1165–1170 (6 lines).
- **`src/shell/styles.css` (7295 → 7273 lines):** Removed `.mermaid` + `.mermaid svg` + `body.theme-light .mermaid` blocks (22 lines). PRESERVED `body.theme-light .concept-diagram` + `.concept-diagram` + `.concept-diagram pre` + `.concept-diagram svg` (separate class, may still be referenced — out of iter-113 scope).
- **Files edited (3 source + 1 deleted + 4 docs + 6 auto-regenerated):** DELETED `mermaid-init.js` + EDITED `src/shell/index.html` + `src/shell/lazy-loader.js` + `src/shell/styles.css` + `AGENT_NAVIGATION.md` (§1 widget list note + §6 pitfall #8/#9 rewritten + §8 roadmap iter-113 + top header iter 111→113) + `STATUS.md` (this entry) + `worklog.md` (iter-113 entry, iter-112 collapsed to one-line summary) + `CHANGELOG.md` (this entry + iter-112 catch-up entry). Auto-regenerated via `pnpm run build`: `index.html` (root) + `widgets/` (root mirror, 14 → 13 files — `mermaid-init.js` deleted) + `build.hash` + `assets/` (root — `shell-styles.css` + `lazy-loader.js` regenerated) + `event-bus.js` (root) + `data/` (root mirror).
- **Validation:** `pnpm run build` SUCCESS (hash c5c429e2 → 2ab607d6 — third hash change since iter 96). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync (no version bump — version sync back to canonical 4 places; `mermaid-init.js` JSDoc 5th tracking point is gone). `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` PASS (no inline scripts). `qa:bundle` PASS (6.7 KB). `qa:contrast` PASS. `qa:english` 19 → 19 (no regression — baseline preserved). `qa:syntax` baseline (pre-existing, no regression). `qa:doc-versions` PASS.
- **Scope:** 3 source files edited + 1 deleted = within 3–5 soft limit accounting for the deletion. Coherent single-purpose iteration (Mermaid removal only, no logic change, no content change, no schema change, no version bump). All edits verified zero functional impact via grep (0 `.mermaid` usages in content) + build + 64 tests + 5 QA gates. CSP tightened (script-src dropped CDN, worker-src directive dropped entirely).
- **No KI opened.** No open KIs remain. KI#64 (closed iter-107) is now permanently resolved — `mermaid-init.js` no longer exists, version drift cannot recur.

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
