# S4b apparatus — decision-ready inventory (iter 175)

> Read-only analysis carried out in iter 175 while closing F-17. It is the input for the
> remaining S4b slices: **F-18** (widgets 11 → 3), **F-19** (one glossary surface),
> **F-20** (4 callout labels / one treatment), **F-24** (Appendix A 16-type promise).
> Nothing in this file is applied yet. Stage plan: `docs/RESTRUCTURE_V3_PLAN.md` §5.4.

---

## 1. F-18 — widget topology (as of iter 175)

`src/shell/widgets/` holds **13 files**. The F-18 count "11 widgets" = 13 −
`widget-utils.js` − `js-flag.js`. Of those 11, **6 are content widgets** and **5 are
VS interaction / navigation scripts**. Reaching a literal "3 widgets" therefore means
**moving the 5 VS scripts out of `widgets/`** (capability preserved) **and deleting 3
content widgets**, not deleting the VS scripts.

| file | lines | mount (`src/master/…` → section) | data | unique capability | duplicates | gates / tests | verdict |
|---|---|---|---|---|---|---|---|
| `ocean-insight.js` | 981 | `part_05.html:318` `#ocean-embed` → `p5_ocean_basics` | `ocean.json`, `mbti.json`, `enneagram.json` | 0–100 sliders → live pentagon, extremum counter (golden rule 1–2), conflict validator, export; sole `ocean:updated` emitter | §5.1 5-dim table, E09, `#ocean-static` | `validate-master.mjs:645`; manual `widget-smoke` | **KEEP** |
| `persona-voice-hierarchy.js` | 382 | `part_03.html:214` → `p3_influence_hierarchy` | none (canon §3.2 constants) | model-tier column override + hover-sync with E07 + `voice_sources` export | §3.2 table + E07 (counted in F-13's 7 representations) | `audit_voice_parity.py:83-84,254,283`; DEC-21/DEC-09 | **KEEP** (parity-locked) |
| `mbti-composer.js` | 874 | `appendix_mbti.html:47` → `appendix_mbti` | `mbti.json`, `enneagram.json` | 16-type grid + axis sliders — the only 16-type coverage in the appendix (F-24) | appendix temperament table | `validate-master.mjs:647` (optional); manual `widget-smoke` | **KEEP** |
| `enneagram-builder.js` | 1071 | `part_05.html:606` → `p5_enneagram_basics` | `enneagram.json`, `ocean.json` | type ring + **SPINE textareas autofilled from the type template** (banned by §5.1) | §5.3 9-type table, E10, §5.4 mapping | `validate-master.mjs:646`; `audit_enneagram_parity.py:90,344-353` | **DROP** |
| `persona-cross.js` | 228 | `part_05.html:704` → `p5_cross_matrix` | `ocean.json`, `enneagram.json` | clickable 5×9 correlation matrix | §5.4 cross tables; canon §5.5 | `validate-master.mjs:648` | **DROP** (replace with a static table) |
| `persona-synthesis.js` | 680 | `part_05.html:707` → `p5_cross_matrix` | 3 event streams | aggregates three emitters into one profile | canon §5.5 prose; Part 10 cards | `validate-master.mjs:649`; `audit_enneagram_parity.py:91,344-346` | **DROP** (all three emitters dropped) |
| `vs-e10-enneagram.js` | 203 | `.type-node` in E10 (`part_05.html:434`, `:542-547`) | `enneagram.json` | E10 hover/focus mini-card | — | `audit_enneagram_parity.py:89,338-342` | **INFRA** — move to `src/shell/interactions/` |
| `vs-e13-diagnostic.js` | 88 | `[data-toggle="tree"]` (`part_09.html:117,168,219`) | none | tree expand + aria | — | — | **INFRA** — move |
| `vs-e16-author-note.js` | 95 | `.template-btn` (`part_07a.html:345-346`) | none | template A/B swap | — | — | **INFRA** — move |
| `vs-scroll-observer.js` | 144 | none | none | IO/MO scroll driver for the embeds | — | `audit_vs_embeds.py:33,151-156` | **INFRA** — move |
| `vs-mini-map.js` | 125 | injects its own `<nav>` into `#content` | hardcoded E01–E17 | element-level navigation | shell TOC (constraint: one navigation surface) | none | **INFRA / disclose** — move; keep or retire as an owner call |
| `widget-utils.js` | 187 | — | — | `fetchJson` cache, `escapeHtml`, OCEAN constants | — | `csp_check.mjs` (indirect) | **LIB** |
| `js-flag.js` | 24 | `src/shell/index.html:24` | — | `.js` class pre-paint (FOUC) | — | `csp_check.mjs` | **LIB** |

**Result after the plan:** `src/shell/widgets/` = `ocean-insight.js`,
`persona-voice-hierarchy.js`, `mbti-composer.js` (**3 widgets**); a new
`src/shell/interactions/` holds the four VS behaviour scripts; `vs-mini-map` needs an
owner call (keep as shell nav vs retire). `widget-utils.js` moves next to the
interactions or stays with the widgets.

### Disposal order (each step keeps the battery green)

1. **`persona-cross` + `persona-synthesis`** — `part_05.html:704,707`; in the same
   commit: `validate-master.mjs:648-649`, `audit_enneagram_parity.py:91,344-346`,
   `index.html:109,114`, root copies, `styles.css:3760,4028`, NAV/architecture.
   §5.5 must keep a **static 5×9 matrix table** (DEC-15: no capability loss) so the
   section id `p5_cross_matrix` stays alive (`data/anchor-redirects.json:45` +
   `lazy-loader.js:69` SHELL-REDIRECTS target).
2. **`enneagram-builder`** — `part_05.html:606`; `validate-master.mjs:646`; rewrite
   `audit_enneagram_parity.py:337-354` to E10-only; `index.html:112`; delete the §5.4
   sentence «Интерактивный выбор типа с автозаполнением SPINE — Enneagram Builder»;
   reconcile canon `part_05.md:173` («используется для выведения SPINE из типа») with
   §5.1's rule (`:121/:126`: frameworks validate, they do not generate).
3. **Move the VS scripts** (`vs-e10`, `vs-e13`, `vs-e16`, `vs-scroll-observer`,
   `vs-mini-map`) → `src/shell/interactions/`; update `index.html`, the build copy
   lists, and `audit_enneagram_parity.py:89` (E10 path).
4. **F-24** — either keep `mbti-composer` and make the resume bullet link it, or add a
   static 16-type table (from `data/mbti.json`: code / name / temperament / hint) and
   drop the composer.
5. **Consolidation** — `AGENT_NAVIGATION.md:17,18,154,160-164`,
   `docs/architecture.md:60,186,307`, `STATUS.md` invariant, plan F-18 → done,
   `DECISIONS.md` entry.

**Known dead CSS after the drops (disclose, no opportunistic cleanup):**
`.enneagram-*` ≈166 lines (`styles.css:1553-1700`, `:4020` — keep
`.enneagram-container`/`.type-node`, used by E10), `.persona-cross-embed`
(`:3760`), `.persona-synthesis-embed` (`:4028`), `.mbti-*` ≈143 lines
(`:1711-1800`, `:4024` — only if the composer is dropped).

**Gate/test note:** `pnpm test` runs only `tests/test-*.mjs` +
`tests/integration/*.mjs`; `tests/widget-smoke.mjs` and `tests/visual-parity.mjs` are
manual — CI will not catch a widget removal, so the `validate-master` widget list and
the parity gates are the real guards.

### The autofill vs §5.1 (evidence for the `enneagram-builder` drop)

- `src/shell/widgets/enneagram-builder.js:122-124` `getSpineTemplate(typeId)` returns
  `enneagramDataCache.spine_templates[typeId]`;
  `:431-448` `buildSpineTab()` renders WANT/NEED/FLAW fields filled from that template;
  `:613-626` export falls back to `template[field]`; `:1014` fetches
  `data/enneagram.json`.
- `docs/canon/part_05.md` §5.1 `:121` — «Сначала постройте SPINE. Психологические
  фреймворки валидируют, не генерируют.»; `:126` — «Не пытайтесь собрать SPINE
  «снизу вверх» из OCEAN/Enneagram/MBTI».
- **Contradiction to fix regardless:** `docs/canon/part_05.md:173` (§5.3) says
  «Используется для выведения SPINE из типа», while §5.4 `:230-232` frames the same
  mapping as validation-only.

---

## 2. F-19 — glossary surfaces (measured)

Four surfaces exist; the F-19 counts are **25 / 45 / 45 / 45**:

| # | Surface | Files | Produced by | Terms | Order | Prose links |
|---|---|---|---|---|---|---|
| 1 | Runtime panel | `src/shell/index.html:44,54,93-101` + `lazy-loader.js:1441-1559` | `data/glossary.json` at runtime | 45 | grouped by first letter, JSON/registry order inside a group | 0 (UI chrome only) |
| 2 | no-JS page | `parts/glossary.html` | `scripts/build-unified.mjs:164-200` (from `data/glossary.json`) | 45 `<dt>` | flat, registry order | 1 (`noscript` in `index.html:39`) |
| 3 | Appendix C | `src/master/appendix_glossary.html` + `docs/canon/appendix_glossary.md` | hand-authored, **no generator** | **25** | alphabetical by English headword, letter-prefixed headings | **0** |
| 4 | Canonical registry | `docs/canon/glossary_registry.md` → `data/glossary.json` | `scripts/generate_glossary.mjs` | 45 | Latin block then Cyrillic, sorted by head | 0 (not reader-facing) |

Appendix C is declared "frozen v1" (`docs/canon/_README.md:38,46`; DEC-18;
`audit_core_directives_parity.py:440-444` presence note) and the registry header
declares it superseded (25 vs 45). `docs/terminology_dictionary.md:233` says "24
entries" — stale.

Gates/test reality:
- registry/JSON: `audit_glossary_parity.py:160-372` (45 entries, provenance refs,
  heads, machine-layer projection, findability in master), `:310-342` (exactly 45,
  version sync); `audit_token_budget_parity.py:360+`; `audit_sampling_parity.py:100,557`;
  `audit_voice_parity.py:85,386-388`; `validate-master.mjs:325-365` (warnings only);
  `readerpath_audit_iter164.py:244-247` (45).
- no-JS page: `validate-artifact.mjs:240-241` (required special file; `:348` — not
  routed by the loader), `readerpath_audit_iter164.py:234-243` (every href resolves),
  `:286-291` (the shell `noscript` link must exist).
- Appendix C: 2 exact sync probes (`audit_canon_master_sync.py:165-167,584-587`),
  `readerpath_audit_iter164.py:57-59,261-284` (appendix order + section/attr),
  `validate-artifact.mjs:316-403` SHELL-REDIRECTS (`data/anchor-redirects.json` has
  `05_glossary` and `glossary` → `appendix_glossary`; targets must be live).
- No `tests/test-*.mjs` asserts glossary. `tests/widget-smoke.mjs:196-214` expects
  `#glossary-panel dt` but the panel renders `<li>` — latent manual-test bug, outside
  the 68.

**Minimal consolidation → ONE reader-facing surface:** keep the registry → generated
JSON → runtime panel, and treat the generated no-JS page as the *same* surface in its
second delivery mode (identical 45 terms/order/anchors, identical source, zero
divergence). Delete Appendix C (the only 25-term outlier) and add ONE prose pointer
(the "zero links from prose" half of F-19).

Files that change: delete `docs/canon/appendix_glossary.md` +
`src/master/appendix_glossary.html` + generated `parts/appendix_glossary.html`; edit
`part_00` (canon + master) with the single prose pointer; `parts/manifest.json` 3→2
appendices; `lazy-loader.js:46-56` (`APPENDIX_GUIDE_ORDER`);
`data/anchor-redirects.json` 2 entries re-pointed; `audit_canon_master_sync.py` probes
89 → 87 (or re-pointed); `readerpath_audit_iter164.py:57-59,263`; `_README.md`,
`content_map.md`, `terminology_dictionary.md`, `AGENT_NAVIGATION.md`, `STATUS.md`,
`AGENTS.md`, plan §3/§6, `DECISIONS.md`, worklog/CHANGELOG.

> **OWNER GATE:** `data/anchor-redirects.json` is an AGENTS stop-condition and deleting
> a live section id contradicts plan standing constraint #2 → the Appendix C deletion
> needs an explicit owner call (or keep `id="appendix_glossary"` as a 1-line pointer,
> which preserves redirects but leaves a second surface — not recommended).

## 3. F-20 — callout labels (measured)

The plan's "10 labels / 97 boxed vs ~110 plain" is a pre-S4a measurement. Current
master (iter 175): **159 label markers + 3 bare-label boxes = 162 instances** in
**three** treatments:

| Treatment | Count | Notes |
|---|---|---|
| boxed `<div class="callout rule|rec|ex">` | 74 (49 rule · 19 rec · 5 ex · 1 base) | 71 carry one bold label, 1 carries two, `part_05` has 3 bare-text labels |
| `<p class="callout rec">` | 1 (`part_07a`) | parallel markup |
| plain bold, no wrapper | 42 | mostly `<p><strong>LABEL…</strong>`; 10 are the Part-0 legend rows |
| chip `<div class="example-label template|illustration">` | 44 (ШАБЛОН 17 · ИЛЛЮСТРАЦИЯ 27) | **undocumented in `docs/components.md`** (fence #7 gap) |

Per label (master total · canon) and the proposed mapping:

| label | total | canon | disposition |
|---|---|---|---|
| ПРАВИЛО | 49 | 50 | KEEP (5 form cleanups: 2 lowercase «Правило:», «ПРАВИЛО (предел)», 2 long label-lines) |
| РЕКОМЕНДАЦИЯ | 19 | 21 | KEEP (3 bare-label boxes + 2 long label-lines + 1 plain → boxed) |
| ПРИМЕР | 8 | 9 | KEEP (1 dash-form, 1 English «EXAMPLE —») |
| ПРИМЕЧАНИЕ | 7 | 10 | RELABEL → НАБЛЮДЕНИЕ |
| НАБЛЮДЕНИЕ | 1 | 2 | KEEP (base `.callout`; `audit_sampling_parity.py:546-552` pins the exact shape) |
| ИЛЛЮСТРАЦИЯ | 28 (27 chips) | 8 | Option A (recommended): DELETE chip + prose lead-in; Option B: RELABEL → ПРИМЕР |
| ШАБЛОН | 18 (17 chips) | 9 | DELETE label; keep a prose «Шаблон для копирования — ниже» caption |
| СИНТЕЗ | 6 | 7 | DELETE → prose |
| ПЕРЕХОД | 1 | 3 | DELETE → prose |
| ССЫЛКА | 18 | 22 | DELETE → prose sentence with the existing `<a href>` |
| ДЕМОНСТРИРУЕТ | 4 | 5 | DELETE label → prose («Карточка демонстрирует: …» — the word stays; readerpath counts it) |

Volume: Option A = 75 labels deleted, 7 relabelled; final **84 labels** (ПРАВИЛО 49 ·
РЕКОМЕНДАЦИЯ 19 · ПРИМЕР 8 · НАБЛЮДЕНИЕ 8). Option B = 47 deleted, 35 relabelled; final
112. Plus 43 plain → boxed, 3 bare labels → bold, 25 boxed label-lines cleaned
(2 English «RULE —»/«EXAMPLE —» russified), Part 0 legend rewritten 10 → 4 labels, and
one treatment = `.callout` + `<strong>LABEL:</strong>` (DEC-20 classes: rule/rec/ex/base).

Gates/baselines that move:
- `validate-master.mjs:452-463` (allowed callout classes) and `:601-629` (emoji ban).
- `audit_canon_master_sync.py` — **16 exact needles embed label text** (`:254,285,306,
  313,408,441,447,478,484,490,496,513,519,525,531,558`); every converted block breaks
  its needle, so needles must be updated in the same commit, probe count stays 89.
- `audit_sampling_parity.py:283-284,371-372,546-552`; `audit_voice_parity.py:285-288`
  (body text pinned, label safe); `audit_token_budget_parity.py:190`.
- `readerpath_audit_iter164.py:209-212` (requires «ШАБЛОН» ≥1 in 07a+07b → switch to
  the chip class or the prose caption), `:222-224` («Демонстрирует» ×4 in part_10).
- `qa:english` 1 and `qa:syntax` 226 must not grow; no `tests/test-*.mjs` asserts labels.
- Docs: `AGENTS.md:163` (fence #12 label list), `AGENT_NAVIGATION.md:240-241`,
  `DECISIONS.md` (DEC-16 + new superseding row + DEC-20 note), `docs/canon/_README.md
  §3.9`, `docs/components.md` (stale: documents English labels and validator-rejected
  classes, omits `.example-label`), plan §1.2/§6, `content_map`.

## 4. F-24 — Appendix A

`src/master/appendix_mbti.html:57` promises «Понимать 4 оси MBTI и 16 типов личности»,
but the section carries 4 axes + 4 temperament rows (the 16 type codes appear only as
names inside the temperament rows). The 16-type detail currently exists only in
`data/mbti.json` + the `mbti-composer` widget. If the composer is kept, the promise is
fulfilled interactively; if it is dropped (see F-18 §1.4), add the static 16-type table.

---

*Created iter 175 (2026-10-23). Evidence read-only; every claim carries file:line.*
