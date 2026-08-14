# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-111-voice-hierarchy-widget
Agent: main
Task: Fork D (part 1/3) — implement `persona-voice-hierarchy` interactive widget for §3.2 Voice Influence Hierarchy. User: "хватит спрашивать, действуй так как релевантнее, качественнее".

Work Log:
- 1: Created `src/shell/widgets/persona-voice-hierarchy.js` (~290 lines) — combined design: (a) model-tier toggle 12B/32B+/API rewrites active column in widget bars + sibling static `<table>` via `data-vh-model` attribute; (b) hover-sync between widget rows and source-table rows via `data-vh-source` IDs injected at init; (c) Markdown export of `# Voice Sources — model: <X>` block, copied via `WidgetUtils.fallbackCopy()`, dispatched as `persona-voice-hierarchy://export` CustomEvent. Public API: `init`/`destroy`/`exportMarkdown`/`generateMarkdown`/`activeModel`/`sources`. Auto-init via `EventBus.whenReady` + 500ms fallback. Data canon-embedded (6 sources × 3 models from §3.2 table) — exception to data/*.json rule, documented in widget header + AGENT_NAVIGATION §4.
- 2: Added widget container `<div id="persona-voice-hierarchy" class="persona-voice-hierarchy-embed" data-model="12B" data-source-table="p3_influence_hierarchy">` to `src/master/part_03.html` inside `p3_influence_hierarchy` section, between source table and RULE callout. Added `[INTERACTIVE WIDGET: ...]` marker to `docs/canon/part_03.md` §3.2 documenting the widget.
- 3: Registered widget in `src/shell/index.html` (script tag after `persona-cross.js`) + `src/shell/lazy-loader.js` (re-init block in `initInteractiveElements()` near line 1078). Added CSS for `.persona-voice-hierarchy-embed` + `.vh-*` classes + source-table column highlight (`table[data-vh-model="X"] tbody td:nth-child(N)`) to `src/shell/styles.css` (~190 lines of CSS).
- 4: Fixed naming drift in `docs/canon/part_07a.md` — frontmatter line 4 + body line 225 referenced `p3_voice_hierarchy` (never existed). Corrected to canonical `p3_influence_hierarchy` (verified via part_03.md §3.2 + build-unified.mjs line 182 + parts/manifest.json). Found+fixed same iteration per §3 rule.
- 5: Updated `tests/visual-parity.mjs` selector list (line 399) — added `.persona-voice-hierarchy-embed` so the "Widgets are interactive" check covers the new widget. Updated `AGENT_NAVIGATION.md` §1 + §4: widget count 15 → 16, added `persona-voice-hierarchy` to widget list, added table row, added exception note for canon-embedded data.
- 6: Validation: `pnpm run build` SUCCESS (hash 8499b4e3 → f70870c0 — first hash change since iter 96). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` / `qa:bundle` / `qa:doc-versions` PASS. `qa:english` 19 → 19 (no regression). `qa:syntax` 247/11 — pre-existing baseline.
- 7: Ad-hoc widget smoke test (not committed, temp script): 20/20 PASS via Puppeteer + local HTTP server. Verified: widget container populated, default model 12B, source table annotated (6/6 rows tagged), toggle buttons switch active model + table column, export dispatches event + copies MD + shows "Скопировано" feedback, public API all exposed.

Stage Summary:
- **iter 111 COMPLETE — Fork D (part 1/3).** First new widget since iter 89.
- **7 source files edited:** NEW `persona-voice-hierarchy.js` + 4 shell/master (part_03.html, index.html, lazy-loader.js, styles.css) + 2 canon (part_03.md, part_07a.md) + 2 infra (tests/visual-parity.mjs, AGENT_NAVIGATION.md). Plus 6 auto-regenerated root fallbacks via `pnpm run build` (parts/part_03.html + index.html + build.hash + 3 root mirror files).
- **Scope:** 7 source files (over 3–5 soft limit) — justified by coherent single-feature iteration (one new widget = JS + HTML + CSS + registration + canon marker + drift fix + test selector + nav doc). All JS additive — no existing widget modified, no schema change, no section ID change.
- **Fork D roadmap updated:** iter-111 = voice hierarchy (DONE). iter-112 = sampling widget (DEFERRED). iter-113 = persona widget (DEFERRED).
- **Next iteration** = iter-112 (if requested) — sampling slider configurator for `p7a_sampling_params`, MEDIUM risk (PP=0.0 + RepPen ≤1.10 validation).

---

Task ID: iter-110-multilingual-forks-abc (one-line summary)
- iter 110 — Multilingual forks A+B+C: layered SP language rule (12B<64K→EN, ≥128K 12B-14B→either, 32B+/API→card lang) + Identity name-language rule (canonical form preserved) + Script Tax/Vocabulary Size as new Model Table concepts + Token Budget Script Tax RULE. Fork D deferred. 9 source + 6 auto-regenerated. Canon sync 97/97. Build hash 8499b4e3 unchanged. 0 new English leaks.

---

Task ID: iter-108-multilingual-actualization-safe-pass (one-line summary)
- iter 108 — Removed ~15-20% empirical claims (9 places), replaced native-language wording, updated 12B model examples (Gemma 3 12B/Mistral Nemo 12B/Qwen 2.5 14B), refined methodology disclaimer with model generations + KI#65 CLOSED (canon→master directive drift #4/#5 → #6/#7). 13 source + 8 auto-regenerated. Canon sync 97/97. Build hash 8499b4e3 unchanged. 0 new English leaks.
