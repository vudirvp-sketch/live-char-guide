# I18N_PLAN — Interface & content language switching (RU default + EN, N-language ready)

> **Status:** PROPOSED (design only — no repository behaviour changes with this document).
> **Date:** 2026-10-26
> **Version context:** 9.2.6, iteration 190 (v4 restructure track closed).
> **Scope of this document:** architecture decision + UI contract + work estimate + phased plan.
> **Out of scope:** implementation. Every number below is measured from the repository at the
> stated iteration — the measurement commands are in [§11](#11-measurement-appendix).
> **Governing law:** `AGENTS.md` (hard fences, especially #1 CSP / #7 CSS classes / #10 canon sync /
> #12 two-layer language convention), `DECISIONS.md` DEC-16, `AGENT_NAVIGATION.md` §2–§4.

---

## 0. Recommendation (read this first)

**Ship a two-layer i18n model that mirrors the guide's existing two-layer language policy (DEC-16),
not a single mechanism for everything:**

1. **Chrome (UI) = small keyed dictionary** — `src/shell/i18n/<lang>.json` + a generated
   `assets/i18n/<lang>.js`, applied *before first paint* by a synchronous external boot script
   (the `lib/js-flag.js` precedent). 159 unique strings, 7,478 characters of unique text.
2. **Content = parallel document trees per language** — RU keeps `src/master/` byte-identical
   (zero migration, zero risk to the existing 68 tests / 8 must-pass audits); a new language gets a
   **sibling** tree `src/master-<lang>/` with the same 14 files, the same 62 `data-section` ids,
   the same 45 `<pre>` blocks. **Not** `src/master/<lang>/` and **not** `data-i18n` keys inside
   the Russian master files.
3. **Output = one shell, per-language content packs, one shared asset tree** —
   `dist/` (root = RU, unchanged, all existing URLs keep working) + `dist/en/index.html`
   (generated entry) with `dist/parts/en/` + `dist/data/en/`; `dist/assets/` is shared and **not**
   duplicated (it is 2,273,139 B of the 3,015,641 B deploy — fonts alone would double the site).
4. **Switch = one `.fab-btn` in the existing fab-group** (7th button, **zero new CSS**, fence #7
   satisfied), label = current locale code, click re-enters the target entry; persistence priority
   `?lang=` → `localStorage['lcg-lang']` → `navigator.languages` → `ru`; the chosen locale is
   resolved in a synchronous head script so nothing Russian ever paints on the EN entry (FOUC = 0
   by construction, not by hiding).
5. **Honesty gate (the "switch must not lie" requirement) = a locale registry state field** —
   `complete` / `partial` / `chrome-only` / `pending`. A locale whose *content* is not translated
   is either not offered or visibly badged ("UI in English — guide text in Russian"). No silent
   fallback that pretends to be a translation.

**Cost of the full EN edition: ~235–275 person-hours ≈ 22–28 iterations** (chrome 2, data layer 2,
infrastructure 3–4, full content 14–16, SEO 1–2). **One iteration can deliver** the mechanism end
to end for the chrome layer's plumbing (registry + boot + switch + persistence) — nothing more: it
cannot deliver a translated `src/master-en/` Part, nor the generated EN entry, in the same iteration.

---

## 1. Baseline: what actually exists today

| Fact | Value | Evidence |
|---|---|---|
| `<html lang>` | `ru` (single hardcoded value) | `src/shell/index.html:4` |
| Language of guide prose | Russian (DEC-16, fence #12) | `AGENTS.md` fence #12, `DECISIONS.md` DEC-16 |
| Head/SEO metadata language | **English already** | `src/shell/index.html:9-11,20` (`description`, `og:title`, `<title>`) |
| Locale-aware code in the shell | **none** — no `:lang()`, no `lang=` selector, no locale table | `grep 'lang\|:lang\|\[dir=' src/shell/styles.css` → 0 hits (5,851 lines) |
| UI strings (Cyrillic literals, comments excluded) | **179 occurrences / 159 unique / 7,478 chars** | §3 |
| Content corpus | 14 files · 62 sections · 464,720 B · 16,431 Russian words | §2.1 |
| Executable English content (not translatable) | 45 `<pre>` blocks, 58,237 B = **12.5 %** of master | §2.1 |
| Generated data with Russian values | 618 string values / 21,508 chars (glossary 45 terms, enneagram 9 types) | §2.2 |
| Canon | 18 `.md`, 406,520 B, 19,852 Russian words — **RU-only, single source of truth (fence #10)** | §2.1 |
| `audit_canon_master_sync.py` | 87 probes, hardcoded `MASTER_DIR = src/master` + Russian needles | `scripts/audit_canon_master_sync.py:85` |
| `qa:english` baseline | **1 leak** (executable content, by design) | `AGENTS.md` commands block, `STATUS.md` iter 190 |
| `qa:syntax` baseline | 224 findings | `AGENTS.md`, `STATUS.md` iter 190 |
| Deploy | `dist/` uploaded as-is by `deploy-pages.yml`; no per-file allow-list | `.github/workflows/deploy-pages.yml:86-91` |
| Existing URL surface | 1 page, 62 fragment anchors, 132 legacy redirects + 10 fallback | `data/anchor-redirects.json`, `STATUS.md` invariants |

### 1.1 The five scanners that decide where translated files may live

This is the single most important constraint found, and it rules out one of the four candidate
options on evidence rather than taste:

| Scanner | How it finds files | Consequence |
|---|---|---|
| `scripts/build-unified.mjs:236-237` | `readdir(src/master)` + `filter(part_*/appendix_*)` — **flat** | `src/master/en/` is **invisible to the build** (must be taught, not just dropped in) |
| `scripts/validate-master.mjs:62-65` | `readdir(src/master)` + same filter — **flat** | same: silently unvalidated |
| `tests/test-toc-coverage.mjs:39-44` | `readdir(src/master)` + `.endsWith('.html')` — **flat** | same |
| `scripts/check_english.py:325-328` | `src/master.glob('**/*.html')` — **recursive** | `src/master/en/` would be scanned and every English line counts as a leak (baseline 1 → thousands) |
| `scripts/audit_canon_master_sync.py:85` | `MASTER_DIR = REPO/"src"/"master"`, per-check filename + Russian substring | probes only address the RU tree; a second tree needs its own probe set or none |

⇒ A language subdirectory *inside* `src/master/` is the worst case: **invisible to the build and
visible to the English-leak gate**. A **sibling** tree (`src/master-en/`) is invisible to both,
i.e. it changes exactly one script (the build) instead of four.

---

## 2. Volume baseline

### 2.1 Content (`src/master/`, measured: `<file>\tbytes\tsections\tcyr chars\tcyr words\t<pre>\t<code>\tintra-links`)

| File | Bytes | Sections | Cyr chars | Cyr words | `<pre>` | `<code>` |
|---|---:|---:|---:|---:|---:|---:|
| `part_00.html` | 8,722 | 2 | 2,686 | 432 | 1 | 5 |
| `part_01.html` | 22,043 | 5 | 4,216 | 623 | 0 | 8 |
| `part_02.html` | 23,134 | 5 | 5,183 | 758 | 1 | 1 |
| `part_03.html` | 36,145 | 5 | 8,967 | 1,325 | 6 | 10 |
| `part_04.html` | 39,410 | 6 | 10,617 | 1,535 | 1 | 2 |
| `part_05.html` | 62,508 | 5 | 13,529 | 1,845 | 0 | 4 |
| `part_06.html` | 15,129 | 5 | 3,929 | 580 | 5 | 9 |
| `part_07a.html` | 64,677 | 12 | 13,747 | 2,040 | 14 | 32 |
| `part_07b.html` | 25,665 | 3 | 6,213 | 907 | 3 | 51 |
| `part_08.html` | 28,420 | 2 | 6,117 | 875 | 6 | 11 |
| `part_09.html` | 48,180 | 5 | 10,597 | 1,553 | 0 | 11 |
| `part_10.html` | 60,546 | 5 | 20,725 | 3,117 | 4 | 20 |
| `appendix_mbti.html` | 3,162 | 1 | 561 | 79 | 0 | 1 |
| `appendix_model_params.html` | 26,979 | 1 | 5,583 | 762 | 4 | 10 |
| **Total** | **464,720** | **62** | **112,670** | **16,431** | **45** | **175** |

- Total visible words with tags stripped: **25,301** (6,296 source lines); the difference from
  16,431 is identifiers, XML/code, English directives.
- **Untranslatable payload:** 45 `<pre>` blocks = 58,237 B (12.5 %) — these are the executable
  English prompt blocks DEC-16 keeps in English. They must be **byte-identical** in every
  language (this is what makes a cheap, strong parity gate possible — §9).
- Intra-document links in master: **10** `href="#…"` (v4 track). Section ids are therefore almost
  the only cross-language coupling, and they are language-neutral by rule.

### 2.2 Data layer with Russian values (`data/*.json`)

| File | Cyrillic string values | Cyrillic chars | Content |
|---|---:|---:|---|
| `glossary.json` (**generated** from `docs/canon/glossary_registry.md`) | 192 | 9,825 | 45 terms + definitions |
| `enneagram.json` (**generated** from canon §5.3) | 172 | 4,738 | 9 types × 8 prose fields |
| `mbti.json` | 160 | 4,554 | temperaments, types, axes, suggestions |
| `ocean.json` | 94 | 2,391 | traits (already carries `name_en` ×5), poles, thresholds |
| `anchor-redirects.json` | 0 | 0 | **language-neutral** — must stay shared |
| `character_schema.json` | 5 | 158 | schema titles — technical, stays RU/EN mixed by design |
| **Total translatable** | **618** | **21,508** | ≈ 3,000 Russian words |

Consequence: **two of the four data files are generated** (`glossary`, `enneagram`). Translating
them means translating their canon sources and parameterizing two generators — not editing JSON.
`ocean.json` already leads with `name_en`, i.e. the data layer is the cheapest part of the whole
programme (3,000 words vs 16,431).

### 2.3 Deploy size (why assets must not be duplicated)

`dist/` = 46 files / 3,015,641 B: `assets/` 2,273,139 B (7 files — fonts + CSS),
`parts/` 493,874 B (17 files), `data/` 114,380 B (6), `widgets/` 88,678 B,
`interactions/` 22,790 B, `lib/` 7,052 B.

A literal `dist/ru/` + `dist/en/` **duplication** costs +2.9 MB (fonts copied twice) and breaks
every existing inbound URL (62 anchors + 132 redirects are documented public entry points). A
per-language **content-pack** duplication costs +~610 KB (parts + data) and breaks nothing.

---

## 3. Q3 — UI-string inventory (the real count)

Measured over `src/shell/index.html`, `src/shell/widgets/*.js` (3), `src/shell/interactions/*.js` (5),
`src/shell/lib/*.js` (2), `src/shell/lazy-loader.js`; Cyrillic string literals **after stripping
comments**; for `index.html` both attribute values (`title`, `aria-label`, `placeholder`, `alt`)
and text nodes:

| File | Cyrillic strings | Nature |
|---|---:|---|
| `src/shell/index.html` | **34** (26 attrs + 8 text nodes) | pure chrome: `title`, `aria-label`, `placeholder`, «Загрузка…», `<noscript>` |
| `src/shell/lazy-loader.js` | **35** | chrome: notepad status/confirm/alert, load-error placeholders, TOC «Приложения», glossary search/labels, token-budget range labels |
| `src/shell/widgets/mbti-composer.js` | **42** (12 data-derived: 4 temperament names + 8 axis labels) | chrome + exported-Markdown labels |
| `src/shell/widgets/ocean-insight.js` | **29** (3 data-derived source labels) | chrome: legend, forecast, tooltips, notifications |
| `src/shell/lib/widget-utils.js` | **16** (all data-derived) | 5 `TRAIT_NAMES` + 10 pole descriptions + 1 validation message |
| `src/shell/widgets/persona-voice-hierarchy.js` | **13** (7 canon-derived: row label + 6 §3.2 notes) | chrome + canon prose |
| `src/shell/interactions/vs-e10-enneagram.js` | **5** | `«Тип N — <name>»` (names come from `enneagram.json`) |
| `src/shell/interactions/vs-mini-map.js` | **5** | visual-system group labels + aria |
| `vs-e13-diagnostic.js`, `vs-e16-author-note.js`, `vs-scroll-observer.js`, `js-flag.js` | **0** | no user-facing Russian |
| **Total** | **179 occurrences · 159 unique · 7,478 chars** | ≈ **1,050 words** of chrome |

Split that matters for the plan:

- **136 pure chrome strings** → the dictionary (`src/shell/i18n/<lang>.json`).
- **23 canon/data-derived strings** → move to the localized data layer (`data/<lang>/ocean.json`
  etc.), *not* the dictionary — otherwise the widget would carry a second copy of canon values
  (fence: one canonical presentation).
- Plus **618 data-layer values** (§2.2) and the generated no-JS glossary heading
  (`scripts/build-unified.mjs:174` hardcodes `Глоссарий`) and `src/404.html` (Russian only).

**Answer to "how many UI strings": 159 unique / 179 occurrences / 7,478 characters (≈1,050 words),
of which 136 are pure chrome.** That is one translator-day, not one translator-week — the
"chrome" bucket is genuinely small; the cost of the programme is entirely in content.

---

## 4. Q1 — Where localized content lives: options and verdict

Impact columns are relative to today's repository. "12 master files" = the 12 `part_*.html` files in
`src/master/` (`part_00` + `part_01…10` incl. `07a`/`07b`); with the 2 appendices the tree holds
**14 files / 62 sections**.

### Option A — `src/master/<lang>/part_NN.html` + per-language manifest

| Aspect | Impact |
|---|---|
| Existing 14 master files | untouched (RU stays in place) |
| `build-unified.mjs` | must learn a language pass **and** to skip the `en/` directory in the RU pass (flat `readdir`) |
| `validate-master.mjs` | flat `readdir` → EN tree silently unvalidated; must be parameterized |
| `test-toc-coverage.mjs` | flat `readdir` → EN tree silently untested |
| `audit_canon_master_sync.py` | probes hardcode `src/master` + Russian substrings; EN needs its own (or no) probe set |
| **`check_english.py`** | **`glob('**/*.html')` — every EN line becomes a leak; baseline 1 must become an exclusion rule** |
| `validate-artifact.mjs` | per-language run against `dist/<lang>/parts/manifest.json` |
| Build length | one extra full pass over ~465 KB per language (seconds) |
| RU/EN drift risk | high — RU is in the build root, EN in a subdir; nothing structurally prevents divergence |
| 3rd language marginal cost | low in source, but each scanner needs the exclusion/parameterization again |

Verdict: workable, but it forces edits to **four gates** and creates a false asymmetry
("RU is canonical because it sits at the root"). Use the sibling form instead (A′).

### Option A′ — `src/master-<lang>/` (sibling tree, same 14-file layout) ← part of the recommendation

| Aspect | Impact |
|---|---|
| Existing 14 master files | **byte-identical, zero diff** |
| `build-unified.mjs` | one new `LANG` input + `MASTER_DIR` per pass; the RU invocation is untouched |
| `validate-master.mjs` | parameterize `UNIFIED_DIR`; RU path unchanged (default) |
| `test-toc-coverage.mjs` | parameterize `MASTER`; RU default unchanged |
| `check_english.py` | **no change** — the glob never leaves `src/master` (baseline stays 1) |
| `audit_canon_master_sync.py` | **no change** (RU-only probes; EN is a translation of master, not of canon) |
| `validate-artifact.mjs` | one parameterized run per language |
| Build length | +1 unified pass +1 shell pass per language |
| RU/EN drift risk | **gateable** — ids and `<pre>` payloads must match exactly (§9) |
| 3rd language marginal cost | one directory + one registry entry + one dictionary file |

### Option B — one HTML + `data-i18n` keys + JSON dictionaries

| Aspect | Impact |
|---|---|
| Existing 14 master files | **rewritten**: every prose node replaced by a key across 6,296 lines / 25,301 words |
| `audit_canon_master_sync.py` | **unusable as written** — its 87 probes are Russian substrings of the rendered text; keys delete the needles |
| 7 parity gates (`glossary`, `core-directives`, `token-budget`, `enneagram`, `diagnostics`, `voice`, `sampling`) | all probe Russian/English phrases inside master HTML and widgets → all need DOM-level rewriting |
| `validate-master.mjs` | structural checks (heading hierarchy, callout labels `ПРАВИЛО`/`РЕКОМЕНДАЦИЯ`/`ПРИМЕР`/`НАБЛЮДЕНИЕ`, glossary usage, character-bible match) would have to run on *rendered* output |
| SEO | **EN is not crawlable**: the site is static, there is no server-side render; crawlers get empty `#content` (already true) plus a JSON fetch |
| Runtime | a full 25k-word DOM rewrite per locale switch |
| 3rd language marginal cost | cheapest in theory (one more JSON) — but only after the whole toolchain is rebuilt around keys |

Verdict: **REJECT for content.** It is, however, exactly the right mechanism for the *chrome*
layer (159 strings) — which is why the recommendation splits the two layers instead of picking
one mechanism for both.

### Option C — separate builds into `dist/ru/`, `dist/en/`

| Aspect | Impact |
|---|---|
| Existing URLs | **all break** unless `/` also serves RU — so in practice `dist/ru/` is dead weight |
| Deploy size | assets duplicated (+2,273,139 B), full site ≈ 5.8 MB |
| `build-shell-unified.mjs` | copy everything twice; root fallbacks ambiguous (`index.html` = which language?) |
| `validate-artifact.mjs` / `qa:csp` / `qa:bundle` | each reads exactly one `index.html` → every gate must become a loop |
| SEO | clean (`/en/`) — the only real advantage |
| 3rd language cost | +2.9 MB per language |

Verdict: adopt the **useful half** only — a generated non-default entry (`dist/en/`) that *shares*
`dist/assets` and adds only its own `parts/`+`data/` packs (Option C′). Do not move RU.

### Option D — translate only the chrome, content stays RU

| Aspect | Impact |
|---|---|
| Code | smallest: dictionary + switch + boot (§5) — 5–6 files |
| Truthfulness | the switch shows "EN" while the guide text is Russian → **this is the failure mode the task forbids**, unless the control is explicitly named "UI language" and the entry carries a persistent notice |
| Ceiling | does not satisfy "EN edition"; forever a half-state |

Verdict: **not a destination, but a legitimate Phase-1 state** if and only if it is labelled as
such and encoded in the locale registry (`content: "chrome-only"`), so the UI cannot over-promise.

### 4.1 Recommendation (Q1)

```
src/master/                 RU — canonical author content, UNCHANGED (14 files, 62 sections)
src/master-en/              EN — translation, sibling tree, same ids / same <pre> payloads
src/shell/i18n/locales.json locale registry (default, order, per-locale state + paths)
src/shell/i18n/<lang>.json  chrome dictionary (136 keys) — the only "keyed" surface
data/<lang>/*.json          localized data packs (ocean, mbti, enneagram, glossary are GENERATED)
data/anchor-redirects.json  SHARED, language-neutral (132 redirects + 10 fallback)
```

Build outputs:

```
dist/index.html             RU entry (today's file + data-locale / data-parts-dir attributes)
dist/parts/manifest.json    RU manifest (unchanged shape, + "locale": "ru")
dist/data/*.json            RU data (unchanged paths)
dist/en/index.html          EN entry (generated: lang="en", ../assets, ../parts/en, ../data/en)
dist/parts/en/*.html        EN content pack (14 parts + glossary.html + footer.html + manifest.json)
dist/data/en/*.json         EN data pack
dist/assets/                SHARED — one copy of fonts/CSS/lazy-loader/i18n/*.js
```

Rationale summary: **RU risk = 0** (no file moves, no URL changes, no gate changes for the RU
path); **EN cost = one content pack + one entry + one dictionary**; **third language = one
directory + one registry entry**; and the mechanism does not delete the 87 sync probes or the 7
parity gates, because master HTML stays static authored HTML in every language.

---

## 5. Q2 — The switch: placement, storage, URL, SEO, FOUC

### 5.1 Placement — fab-group, 7th button, zero new CSS

Current geometry (measured in `src/shell/styles.css:872-905`): `.fab-group` = fixed bottom-right
flex column, `gap: .5rem`, `.fab-btn` = 44×44 px. Today 6 buttons = 6×44 + 5×8 = **304 px**;
a 7th makes **356 px**. That still fits every viewport ≥ 480 px tall; on short landscape phones
(≈360 px) it would collide with `.glossary-tab`, so the switch must be the button closest to the
top of the group and the group must gain `max-height` + `overflow` handling in the same iteration
(one CSS block, `styles.css` — allowed; **no new class**, only the existing `.fab-group`).

Markup, using only registered components (`docs/components.md`; `.fab-btn` exists):

```html
<!-- 7th button in #fab-group, above the theme toggle -->
<button class="fab-btn" id="fab-lang" type="button"
        data-locale="ru"
        title="Язык: русский → English"
        aria-label="Язык интерфейса: русский. Переключить на English">RU</button>
```

- Label = **current** locale code (`RU` / `EN`), not the target — the control always shows state.
- Text label instead of an emoji: a language is not a pictogram, and `EN`/`RU` are universally
  legible inside 44 px.
- With **exactly two** `complete` locales: click = switch to the other. With **3+**: click opens a
  `Panel` (the existing `Panel` class in `lazy-loader.js:1400-1432` — `.panel` + `.panel-header`
  + `.panel-btn` are all registered components), because a cycle button does not scale.
- Rejected placements: TOC panel header only (invisible until the panel opens — a locale switch is
  a first-class control, not a panel option); a second side tab next to `.glossary-tab`
  (competes with the glossary, the one documented term surface — DEC-31); inside a panel
  (a language must be switchable *while* reading).

### 5.2 Storage and precedence

```js
// resolution order — first valid wins, every step guarded (localStorage may throw)
1. ?lang=<code>                      // explicit, shareable, wins over everything
2. localStorage['lcg-lang']          // explicit user choice, namespace matches 'lcg-notepad-v1'
3. navigator.languages ∩ available   // browser preference, only among content-complete locales
4. 'ru'                              // documented default (DEC-16)
```

- `localStorage['lcg-lang']` (not `guide-unified`, which is an unused legacy constant in
  `CONFIG.STORAGE_KEY`). Storage access must be wrapped in `try/catch` — the repo already does
  this for `theme`/`content-width` (`lazy-loader.js:1340-1373`) because private mode throws.
- Explicitly **not** used as a signal: `timezone`, `Accept-Language` server-side (no server),
  IP geolocation.

### 5.3 URL shape

| Shape | Verdict | Reason |
|---|---|---|
| `/en/` (path) | **Recommended for EN** | real URL, crawlable, `hreflang`-clean, shareable, no query-string caching traps |
| `?lang=en` | **Kept as an input shim only** | needed for links that cannot know the path; consumed by the boot script, then `location.replace()` to the path form |
| `#lang=en` | **REJECTED** | the fragment namespace is the anchor contract: 62 section ids + 132 legacy redirects + `handleLegacyAnchor()`; a fragment language loses the anchor and is invisible to crawlers |

Note that a redirect in a **synchronous head script is free of FOUC cost** in this project: the
shell renders *no content* before `parts/manifest.json` is fetched (`#content` is empty,
`lazy-loader.js:784-806`), so only the static chrome exists at that moment — and the entry that is
about to be left never paints its chrome if the redirect happens in `<head>`.

### 5.4 SEO

The guide is **one page per language** with 62 in-page anchors, so the sitemap stays tiny
(1 URL → 2), and there is nothing to localize per-section URL-wise.

```html
<!-- dist/index.html (RU) -->
<link rel="alternate" hreflang="ru" href="https://vudirvp-sketch.github.io/">
<link rel="alternate" hreflang="en" href="https://vudirvp-sketch.github.io/en/">
<link rel="alternate" hreflang="x-default" href="https://vudirvp-sketch.github.io/">
<link rel="canonical" href="https://vudirvp-sketch.github.io/">
<meta property="og:locale" content="ru_RU">
```

```html
<!-- dist/en/index.html (EN) — same alternates, self-referencing canonical -->
<link rel="canonical" href="https://vudirvp-sketch.github.io/en/">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="ru_RU">
```

```xml
<!-- sitemap.xml — add xmlns:xhtml; one <url> per language, each listing both alternates -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://vudirvp-sketch.github.io/</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="https://vudirvp-sketch.github.io/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://vudirvp-sketch.github.io/en/"/>
  </url>
  <url>
    <loc>https://vudirvp-sketch.github.io/en/</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="https://vudirvp-sketch.github.io/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://vudirvp-sketch.github.io/en/"/>
  </url>
</urlset>
```

Hreflang URLs must be **absolute** (GitHub Pages project-site base path `/live-char-guide/`), and
`x-default` must point at the default (RU). `robots.txt` needs no change (it already points at the
sitemap). `src/404.html` is served for both languages and stays RU in Phase 1–2; binding it to
`navigator.language` is a Phase-3 nicety, not a requirement.

### 5.5 FOUC: why this design has none

The repo already has the pattern: `lib/js-flag.js` is an **external, synchronous** head script
whose only job is to set a class before paint, and it exists precisely because inline scripts are
banned by `qa:csp` (`src/shell/lib/js-flag.js:9-23`). Same shape for i18n:

```js
// src/shell/lib/i18n-boot.js  — external, synchronous, in <head>, CSP-clean
// (assets/i18n/locales.js is generated from src/shell/i18n/locales.json and loaded just before
//  this file; it only defines window.__LCG_LOCALES__, so no fetch is needed before first paint)
(function () {
  'use strict';
  var REG = window.__LCG_LOCALES__;
  var meta = document.documentElement;
  var current = meta.getAttribute('data-locale') || REG.default;
  var pick;

  function ok(code) {
    // 'pending' locales are not offered at all; every declared state is selectable
    return !!(code && REG.locales[code] && REG.locales[code].content !== 'pending');
  }
  try {
    var q = new URLSearchParams(location.search).get('lang');
    if (ok(q)) pick = q;
    if (!pick) {
      var stored = localStorage.getItem('lcg-lang');
      if (ok(stored)) pick = stored;
    }
  } catch (_e) { /* private mode: fall through to navigator/default */ }

  if (!pick) {
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length && !pick; i++) {
      var base = String(langs[i]).slice(0, 2).toLowerCase();
      if (ok(base)) pick = base;
    }
  }
  if (!pick) pick = REG.default;

  if (pick !== current) {
    try { localStorage.setItem('lcg-lang', pick); } catch (_e) {}
    location.replace(REG.locales[pick].entry);    // '/' or '/en/' — before any paint
    return;
  }
  document.documentElement.lang = REG.locales[current].htmlLang;
})();
```

**No runtime string patching.** The non-default entry is **pre-rendered at build time** (the build
substitutes the dictionary into `src/shell/index.html`'s static chrome while emitting
`dist/en/index.html`), so there is no "Russian chrome flashes, then turns English" window — the
single most common i18n defect on static sites. Runtime-generated strings (toasts, TOC group
title «Приложения», export Markdown) read the same dictionary from
`assets/i18n/<lang>.js`, which the boot script's entry has already loaded synchronously.

### 5.6 Locale registry (single source of truth for the mechanism)

```json
// src/shell/i18n/locales.json
{
  "default": "ru",
  "order": ["ru", "en"],
  "locales": {
    "ru": {
      "name": "Русский", "htmlLang": "ru", "dir": "ltr",
      "entry": "/", "partsDir": "parts", "dataDir": "data",
      "masterDir": "src/master", "content": "complete"
    },
    "en": {
      "name": "English", "htmlLang": "en", "dir": "ltr",
      "entry": "/en/", "partsDir": "parts/en", "dataDir": "data/en",
      "masterDir": "src/master-en", "content": "pending"
    }
  }
}
```

`content` states and what the UI does with them:

| `content` | Meaning | Switch behaviour | In-content indication |
|---|---|---|---|
| `complete` | chrome + all 62 sections translated | offered, normal | none |
| `partial` | chrome + N sections translated | offered | per-Part badge "not yet translated — shown in Russian" on fallback Parts |
| `chrome-only` | chrome translated, content Russian by design | offered, labelled "UI language" | one persistent line in the entry: "Guide text: Russian" |
| `pending` | nothing shipped yet | **not offered** (button hidden/disabled with `title`) | — |

This is the mechanism that makes Phase 1 honest instead of a lie, and it lets a third language be
declared before any of its content exists.

---

## 6. Q4 — Work estimate

Assumption used throughout: technical RU→EN translation at **~310 finished words/hour**
(~2,500 words/day) with a **25–30 % review add-on**; engineering hours are for a careful agent
session with the full gate battery (build + validate + validate:master + tests + the 8 must-pass
audits: `audit_canon_master_sync.py` + the 7 parity gates).

| # | Bucket | Volume (measured) | Translation | Engineering | Iterations |
|---|---|---:|---:|---:|---:|
| i | **Chrome / UI strings** | 159 unique keys / 7,478 chars ≈ 1,050 words; 136 pure-chrome keys + 23 canon-derived labels to relocate | 4 h | 20–24 h | **2** |
| ii | **Nav / glossary / widget data** | 618 values / 21,508 chars ≈ 3,000 words; 2 of 4 files generated from canon (`glossary_registry.md` 1,650 RU words; §5.3) | 12 h | 16–20 h | **2** |
| iii | **Full content** | 62 sections / 14 files / 16,431 RU words / 112,670 chars; 45 `<pre>` (12.5 %) **not** translated | 85–105 h + 25 h review | 40 h (per-file validation ×14, drift/parity upkeep) | **15–16** |
| iv | **Build infrastructure** | 2 build scripts, 5 scanners, 2 CI workflows that need no edit but whose assumptions must hold | — | 32–40 h | **4–5** |
| v | **SEO + switch** | hreflang ×2, canonical ×2, sitemap 1→2 URLs, 404 policy, switch UI + a11y | 1 h | 10–14 h | **1–2** |
| | **Total (full EN edition)** | | **~127–147 h** | **~118–138 h** | **22–28 iterations** |

Per-iteration reality, stated honestly:

- **One iteration can deliver** the whole chrome *mechanism* (registry + `ru.json`/`en.json` +
  `i18n-boot.js` + `#fab-lang` + persistence) — 6 files, over the 3–5 soft limit (disclosed in
  `worklog.md`). The dictionary fill and the generated EN entry are the next two iterations.
- **One iteration cannot deliver**: any translated `src/master-en/` Part (a Part is 8–65 KB and
  3–12 sections; the realistic throughput is **~4 sections per session** once the gate battery is
  run per file), the per-language build split (2 iterations: unified then shell), or the SEO half
  (it depends on the per-language entry existing).
- The binding constraint is **translation throughput, not code**: 16,431 words at ~4 sections /
  session ≈ 14–16 content iterations. Code + infrastructure + SEO is ~8–12 of the 22–28.

---

## 7. Q5 — Phased plan

### Phase 1 — the mechanism, and it does not lie (3 iterations)

**Goal:** the switch exists, works, persists, is shareable, and cannot misrepresent what it offers.
**No guide content is translated** — the EN entry is honest about that (`content: "chrome-only"` +
one persistent notice line). No FOUC, because the EN entry is pre-rendered, not patched at runtime.

- **1a — mechanism (6 files, over the 3–5 soft limit, disclosed):**
  `src/shell/i18n/locales.json` (registry, §5.6), `src/shell/i18n/ru.json`,
  `src/shell/i18n/en.json` (skeletons), `src/shell/lib/i18n-boot.js` (§5.5),
  `src/shell/index.html` (7th `.fab-btn`, `data-locale`, `data-parts-dir`, `data-data-dir`,
  `<script src="lib/i18n-boot.js">` in `<head>` before the stylesheet links),
  `src/shell/lazy-loader.js` (read those attributes; **current constants stay the defaults**, so RU
  behaviour is byte-identical when the attributes are absent).
- **1b — generated EN entry (3 files):** `src/scripts/build-shell-unified.mjs` emits
  `dist/en/index.html` — chrome strings substituted from `en.json`, `<html lang="en">`,
  `../assets/…` + `../parts/` + `../data/` path rewrite, its own 8-hex cache hash
  (`build/en.hash`); `scripts/csp_check.mjs` + `scripts/bundle_check.mjs` loop over both entries
  (today each reads a single hardcoded `index.html` — an unchecked second entry is a real CSP hole).
- **1c — dictionary fill + honesty + gate (5 files):** extract the 34 `index.html` and 35
  `lazy-loader.js` strings into `ru.json`/`en.json` (136 pure-chrome keys; the 23 canon-derived
  widget labels stay where they are until Phase 2); the persistent `chrome-only` notice in the EN
  entry; `tests/test-i18n-coverage.mjs` (every key in every locale · no Cyrillic left in EN chrome ·
  `content` states from the allowed set · every locale has an `entry`); `AGENT_NAVIGATION.md` §1 row
  for `src/shell/i18n/`.
- **Acceptance:** RU behaviour unchanged (the new `data-*` attributes are additive and the code
  defaults keep today's `parts/`/`data/` paths) and the full battery green; the EN
  entry renders EN chrome over the RU content pack with the notice; switch round-trip RU↔EN;
  `?lang=en` → `/en/`; reload keeps the choice; first visit with `navigator.language=en` lands on
  `/en/`; `qa:csp` and `qa:bundle` cover both entries.

### Phase 2 — data layer + real per-language build (3 iterations)

- **2a — per-language unified build (3 files):** `scripts/build-unified.mjs --lang <code>`
  (`MASTER_DIR` per pass, output `build/<lang>/parts/`, manifest gains `"locale"` and
  `parts[].translated: true|false`); **per-file fallback at build time** — an untranslated Part is
  copied from `src/master/` and flagged `translated: false`, so a partial edition renders as one
  coherent pack and the shell can badge the Russian Parts (no runtime fallback logic);
  `src/scripts/build-shell-unified.mjs` reproduces the same rule for the packs.
- **2b — localized data packs (4–5 files):** `data/<lang>/ocean.json`, `mbti.json`;
  `scripts/generate_glossary.mjs --lang`, `scripts/generate_enneagram.mjs --lang` reading
  **translated canon sources** (the glossary is generated from `glossary_registry.md` — never
  hand-edited; same for `enneagram.json` ← §5.3); `WidgetUtils.dataPath(name)` replacing the 6
  hardcoded `'data/*.json'` fetch call sites (5 in the 3 widgets + 1 in
  `interactions/vs-e10-enneagram.js:35`); the generated no-JS glossary heading becomes a
  dictionary key (`scripts/build-unified.mjs:174` today hardcodes `Глоссарий`).
- **2c — per-locale gates (3 files):** parameterize `validate-artifact.mjs` (`SHELL-PARTS` ≥10 files
  + `glossary.html`/`footer.html`, `SHELL-REDIRECTS` 132 live targets) and run
  `validate-master.mjs` + the 7 parity gates once per locale; translate the 23 canon-derived widget
  labels out of the JS into the data layer.
- **Acceptance:** EN entry renders EN navigation/TOC/glossary/widget labels; `content: "partial"`
  reachable with per-Part badges; RU battery untouched; deploy size ≤ +700 KB.

### Phase 3 — the content edition (+ SEO, 16–18 iterations)

- **3a — structural parity gate (1 iteration, new script `scripts/audit_i18n_parity.py`):**
  same `data-section` id set and order, same `<h2>`-per-section count, **byte-identical `<pre>`
  payloads**, same widget containers, same callout-label *classes* → drift becomes mechanically
  detectable before the first translated file lands.
- **3b — translation slices (14–15 iterations):** one iteration = 3–5 master files
  (~4 sections), Part order 0 → 10, appendices last; each slice: translate → `validate:master`
  (EN profile) → parity gate → battery.
- **3c — SEO + polish (1–2 iterations):** hreflang/canonical/og:locale per entry, sitemap 1→2 URLs
  with `xhtml:link`, language-aware 404, `content: "complete"`, third-language runbook in
  `AGENTS.md`/`AGENT_NAVIGATION.md`/`docs/components.md`.
- **Acceptance:** both entries pass the full battery independently; the 87 sync probes and 7 parity
  gates still run RU-only and stay green; `qa:english` baseline still **1** (EN prose is not in
  `src/master/**`); `qa:syntax` baseline still 224 unless the EN tree is added to it deliberately.

---

## 8. Q6 — Risks and constraints

| Risk | Concrete mechanism | Mitigation in this plan |
|---|---|---|
| **RU/EN drift** — 62 sections × 2 trees, every future content edit doubled | content iterations currently touch 3–5 files with 5 audits re-pointed per slice (v4 track); a second tree doubles the surface | EN is a **derived** tree (`canon(RU) → master(RU) → master(EN)`); `audit_i18n_parity.py` gates ids, section counts and `<pre>` hashes; translate only *after* a chapter is stable (v4 closed at iter 190 — good timing) |
| **Duplicated support burden** | measured from the v4 track: ~4 files + 5 gates per content slice | budget **+40–60 %** per content iteration while any locale lags; declared `partial` state makes the lag visible instead of silent |
| **`qa:english` baseline (now 1)** | `check_english.py:325-328` globs `src/master/**/*.html` **recursively** | keep EN out of `src/master/` (sibling tree) → baseline stays **1**; adding EN to the scan deliberately would push it well over a thousand and destroy the baseline, so it must be an explicit decision, not an accident |
| **`qa:syntax` baseline (224)** | `check_syntax_mix.py` scans master HTML | adding `src/master-en/` to its scope would re-baseline the gate; keep it RU-only, disclose in the runbook |
| **CSP** (fence #1) | `qa:csp` forbids inline `<script>`; `csp_check.mjs` reads **only** the root `index.html` | boot script = external synchronous file (js-flag precedent); **extend `csp_check.mjs` to `dist/en/index.html`** or the EN entry ships unchecked |
| **Cache** | `build.hash` = `sha256(src/shell/index.html)[:8]` — not a content digest, and a per-language entry needs its own cache-buster | one hash per entry (`build.hash` for RU, `build/en.hash`), and `assets/i18n/*.js` carries the version so a dictionary edit busts it |
| **`anchor-redirects.json`** (owner stop-condition) | 132 redirects + 10 fallback, validated by `SHELL-REDIRECTS` against `dist/index.html` + `dist/parts/manifest.json` | keep it **shared and language-neutral**; language never changes fragment ids; `SHELL-REDIRECTS` must run per language (parameterize the two input paths) |
| **Canon authority** | fence #10: `docs/canon/*.md` is the single source of truth; DEC-16: Russian is the language of prose | EN master is a **translation of master**, never a canon; canon stays RU-only (a translated canon would be a second canon = the exact drift class DEC-31 abolished) |
| **Callout labels** | DEC-32 / F-20: exactly four labels, Russian; `validate-master` Check 8 rejects deviations; Check 7 rejects four specific Russian "prohibited translations" | an EN tree needs an **EN label vocabulary** (`RULE`/`RECOMMENDATION`/`EXAMPLE`/`OBSERVATION`) and an EN profile of Check 7/8 → **owner decision** (§10) |
| **Deploy** | `deploy-pages.yml` uploads `dist/`; `build-artifact.yml` uploads artifacts + root `index.html`/`build.hash`/`assets/` | **no workflow edit required**; keep root fallbacks RU-only so the fallback contract does not fork |
| **Test coverage of a second entry** | 68 tests assume one `build/parts/manifest.json` | add a locale parameter to the 4 build-reading tests, or assert the EN pack through the new parity gate only |
| **RTL / future scripts** | registry carries `dir`, but `styles.css` has zero logical-property usage | a third language with RTL is a *separate* CSS project; declare it out of scope now (registry field reserved) |

---

## 9. Gates to add (concrete, cheap, and the reason this design is auditable)

1. **`tests/test-i18n-coverage.mjs`** — every key present in every locale; no key missing/extra;
   no Cyrillic literal left in shell chrome when `data-locale="en"`; `content` values from the
   allowed set; `locales.json` default/order consistent.
2. **`scripts/audit_i18n_parity.py`** — per locale pair: identical `data-section` id list and
   order, identical section count per file, identical `<h2>` count, **identical `<pre>` payload
   hashes** (the executable English blocks must not be "translated"), identical widget container
   ids, identical callout-label classes. This is the drift gate; it is cheap because the payload is
   byte-identical by rule.
3. **`validate-artifact.mjs` per locale** — parameterize `DIST_DIR`/manifest path so `SHELL-PARTS`
   (≥10 HTML files, `glossary.html` + `footer.html` present) and `SHELL-REDIRECTS` (132 live,
   non-chained targets) run for the EN pack too.
4. **`qa:csp` per entry** — currently one hardcoded `index.html` read.
5. **`scripts/check_english.py`** — **no change**, but its scope must be documented as
   "RU master only"; a deliberate widening is an owner decision (re-baselines the gate).

---

## 10. Open decisions (need an owner call, i.e. a `DEC-NN`)

1. **Language authority:** confirm `canon(RU) → master(RU) → master(EN)`, i.e. the EN tree is a
   derived translation that may never introduce a fact, and canon stays RU-only (supersedes nothing,
   clarifies fence #10 + DEC-16 for a second language).
2. **EN label vocabulary:** `RULE` / `RECOMMENDATION` / `EXAMPLE` / `OBSERVATION` for the EN tree
   (needed before any EN `validate-master` profile can exist; `DEC-32` today is Russian-only).
3. **SEO commitment:** do we publish `/en/` as an indexable URL (requires the generated entry,
   hreflang, sitemap 2 URLs) or ship it as a non-indexed convenience (`<meta name="robots"
   content="noindex">` until content is `complete`)? Recommendation: `noindex` in Phase 1–2,
   indexable at `content: "complete"`.
4. **`qa:english` scope:** keep RU-only (recommended) or intentionally add an EN profile.
5. **Deployment weight ceiling:** accept ≤ +700 KB per language (packs only) — or constrain further
   by gating EN to a subset of Parts.

---

## 11. Measurement appendix (how every number above was obtained)

```bash
# 1. Content volume, sections, <pre>/<code>, intra-links (Node; strips no markup for chars)
node -e "const fs=require('fs');for(const f of fs.readdirSync('src/master').filter(x=>x.endsWith('.html')).sort()){const s=fs.readFileSync('src/master/'+f,'utf8');console.log([f,Buffer.byteLength(s),(s.match(/<section\s/g)||[]).length,(s.match(/[\u0400-\u04FF]/g)||[]).length,(s.match(/[\u0400-\u04FF]{2,}/g)||[]).length,(s.match(/<pre[\s>]/g)||[]).length,(s.match(/<code[\s>]/g)||[]).length,(s.match(/href=\"#/g)||[]).length].join('\t'))}"
# → 14 files, 464,720 B, 62 sections, 112,670 Cyrillic chars, 16,431 Cyrillic words,
#   45 <pre>, 175 <code>, 10 href="#…"

# 2. Visible words with tags stripped: 25,301; source lines: 6,296 (same loop, s.replace(/<[^>]+>/g,' '))

# 3. UI strings — Cyrillic literals, comments stripped, per file
#    src/shell/index.html 34 (26 attrs + 8 text nodes) · lazy-loader.js 35 ·
#    widgets/mbti-composer.js 42 · widgets/ocean-insight.js 29 · lib/widget-utils.js 16 ·
#    widgets/persona-voice-hierarchy.js 13 · interactions/vs-e10-enneagram.js 5 ·
#    interactions/vs-mini-map.js 5 · others 0
#    → 179 occurrences · 159 unique · 7,478 chars of unique text
#    (script: state-machine comment stripper + literal regex; same method as the table in §3)

# 4. Data layer
node -e "const fs=require('fs');for(const f of ['glossary','enneagram','mbti','ocean','anchor-redirects','character_schema']){const s=fs.readFileSync('data/'+f+'.json','utf8');console.log(f,(s.match(/\"(?:[^\"\\\\]|\\\\.)*\"/g)||[]).filter(x=>/[\u0400-\u04FF]/.test(x)).length,(s.match(/[\u0400-\u04FF]/g)||[]).length)}"
# → glossary 192/9,825 · enneagram 172/4,738 · mbti 160/4,554 · ocean 94/2,391

# 5. Deploy weight
#    dist/ 46 files / 3,015,641 B; assets/ 2,273,139 B; parts/ 493,874 B; data/ 114,380 B

# 6. Scanner scopes (the decisive constraint)
#    scripts/build-unified.mjs:236-237          flat readdir(src/master)
#    scripts/validate-master.mjs:62-65          flat readdir(src/master)
#    tests/test-toc-coverage.mjs:39-44          flat readdir(src/master)
#    scripts/check_english.py:325-328           recursive glob src/master/**/*.html
#    scripts/audit_canon_master_sync.py:85      MASTER_DIR = src/master (87 probes, Russian needles)

# 7. Launcher / pipeline facts
#    src/shell/index.html:4                     <html lang="ru">
#    src/shell/index.html:16                    CSP meta (script-src 'self' 'unsafe-inline')
#    src/shell/index.html:44-57                 .glossary-tab + 6 × .fab-btn
#    src/shell/lazy-loader.js:35-42             CONFIG (PARTS_DIR 'parts', STORAGE_KEY unused)
#    src/shell/lazy-loader.js:784-806           loadContent(): fetch parts/manifest.json
#    src/shell/styles.css:872-905               .fab-group geometry (44 px, gap .5rem)
#    src/scripts/build-shell-unified.mjs:97-101 buildHash = sha256(src/shell/index.html)[:8]
#    .github/workflows/deploy-pages.yml:86-91   dist/ uploaded as-is (no per-file list)
```

---

## 12. One-screen summary

| Question | Answer |
|---|---|
| Where does EN content live? | `src/master-en/` (sibling tree) + `src/shell/i18n/en.json` + `data/en/*.json`; RU tree untouched |
| Where does EN ship? | `dist/en/` entry + `dist/parts/en/` + `dist/data/en/`; `dist/assets` shared |
| Switch | 7th `.fab-btn` in `#fab-group`, label = current code, zero new CSS |
| Priority | `?lang=` → `localStorage['lcg-lang']` → `navigator.languages` → `ru` |
| URL | path (`/en/`) for real; `?lang=` only as an input shim; `#` rejected |
| FOUC | impossible by construction: pre-rendered entry + synchronous head redirect before any content fetch |
| SEO | hreflang + canonical per entry, sitemap 1→2 URLs, `noindex` until `complete` |
| Chrome size | 159 keys / 7,478 chars (≈1,050 words) — 1 translator-day |
| Data size | 618 values / 21,508 chars (≈3,000 words) — 2 of 4 files generated from canon |
| Content size | 62 sections / 16,431 RU words / 112,670 chars; 12.5 % is `<pre>` and must stay byte-identical |
| Full programme | ~235–275 h ≈ 22–28 iterations (translation is the bottleneck: ~14–15 of them) |
| One iteration can do | the chrome mechanism (registry + boot + switch + persistence), 6 files disclosed |
| Hard constraint found | `check_english.py` recursively globs `src/master/**` → a language subdirectory there is the worst possible placement |
| Most valuable new gate | `audit_i18n_parity.py` — ids + section counts + **`<pre>` hashes** identical across locales |
