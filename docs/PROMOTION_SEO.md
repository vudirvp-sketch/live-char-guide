# PROMOTION_SEO — Practical Discoverability Plan

> **Status:** plan (no code changed by this document). Owner: repository owner. Agent-executable parts marked `agent`.
> **Site:** https://vudirvp-sketch.github.io/ · **Repo:** https://github.com/vudirvp-sketch/vudirvp-sketch.github.io
> **Measured against:** `HEAD 6605b87`, version `9.2.6`, 62 sections, 13 part fragments + 2 appendix fragments,
> **27 230 words** in `dist/parts/*.html` (includes the generated 1 731-word glossary).
> **Audience:** Russian-speaking RP / local-LLM practitioners → **Yandex is the priority engine, Google second.**
> Every fact below was read out of the repository or fetched from a cited URL. Effort is in hours of focused work, no padding.

---

## 1. Diagnosis — what actually blocks indexing today

### 1.1 Confirmed facts (repo evidence)

| # | Fact | Evidence |
|---|------|----------|
| D1 | `<main id="content">` is **empty in the HTTP response**. All 27 230 words are fetched at runtime: `fetch('parts/manifest.json')` → `Promise.all(fetch('parts/part_NN.html'))` → `content.innerHTML = chunks.join('\n')`. | `src/shell/index.html` (`<main id="content" class="content-hidden"></main>`), `src/shell/lazy-loader.js:796`, `:816`, `:824` |
| D2 | `loadContent()` starts with `content.innerHTML = ''` — any prerendered markup would be **wiped** unless the loader is taught to skip the fetch path. | `src/shell/lazy-loader.js:792` |
| D3 | No `<link rel="canonical">` anywhere in the head. | `src/shell/index.html` head (full read) |
| D4 | No JSON-LD / microdata / RDFa of any kind. | same |
| D5 | `<html lang="ru">` and 100 % Russian content, but `<title>` = `Live Character for LLM — Guide` and `meta description` = `Engineering pipeline for RP character cards: Spine to deploy. For 12B–32B+ models.` — English-only, so the SERP snippet does not match a single Russian query. | `src/shell/index.html`; `dist/index.html`; root `index.html` |
| D6 | `og:image` is **relative** (`assets/preview-card.png`). The Open Graph protocol requires an absolute URL; most scrapers drop relative ones. | `src/shell/index.html`; [ogp.me](https://ogp.me/) |
| D7 | The only OG image asset is **1344×768** (1.75:1) while `twitter:card` is `summary_large_image` (≈1.91:1, 1200×630) → the card gets cropped. | `src/assets/preview-card.png` (measured) |
| D8 | `sitemap.xml` contains **one URL**, no `lastmod`, no `priority`. | root `sitemap.xml`, `dist/sitemap.xml` |
| D9 | `robots.txt` sits at `/live-char-guide/robots.txt`. Google fetches robots.txt **only from the host top-level directory** (`https://vudirvp-sketch.github.io/robots.txt`) and explicitly does not look in subdirectories — so this file **and its `Sitemap:` line are never read**. Yandex reads `https://<host>/robots.txt` for the same reason. | root `robots.txt`; [Google robots.txt spec](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) ("You must place the robots.txt file in the top-level directory of a site… Crawlers don't check for robots.txt files in subdirectories") |
| D10 | `<noscript>` contains **only** a "JavaScript required" sentence + one link to `parts/glossary.html`. No prerendered content for any crawler that does not execute JS. | `src/shell/index.html`, `dist/index.html` |
| D11 | `parts/*.html` are **fragments**, not documents: `part_00.html` begins with an HTML comment and `<section …>`, no `<!DOCTYPE>`, no `<html>`, no `<head>`, no styles. Serving them as URLs yields unstyled heading-less pages. | `src/master/part_00.html` (first line), `dist/parts/*` |
| D12 | All 62 sections are addressable only as `#p{N}_{topic}` on **one URL**. Anchor fragments are not separate URLs and Google's own JS-SEO guide warns against loading content via fragments. | `parts/manifest.json`; `src/shell/lazy-loader.js:1772` (`history.replaceState`); [Google JS SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) |
| D13 | No `hreflang` (correct as-is: there is exactly one language version) and no `<meta name="keywords">` (correct as-is: Google's supported-tags list does not include it and unsupported tags are ignored). | `src/shell/index.html`; [Google special tags](https://developers.google.com/search/docs/crawling-indexing/special-tags) |
| D14 | `dist/404.html` exists (good for Pages), but its CTA is `href="/"` → resolves to `https://vudirvp-sketch.github.io/` (the org root), not to the project — a wrong exit door for a user arriving from a dead link. | `src/404.html` |
| D15 | The deploy workflow creates a **git tag on every deploy** (`deploy-YYYYmmdd-HHMMSS`), which will crowd out real release tags; no IndexNow / sitemap ping step exists. | `.github/workflows/deploy-pages.yml` (`Create Deploy Tag`) |
| D16 | `validate.yml` runs terminology + duplicate checks only. **No gate checks head metadata, canonical, or sitemap.** | `.github/workflows/validate.yml` |

### 1.2 The CSP / JSON-LD trap (important, and it is not a browser problem)

Current policy in `src/shell/index.html`:

```
script-src 'self' 'unsafe-inline'
```

So an inline `<script type="application/ld+json">` **would execute fine in the browser** — and JSON-LD is the only structured-data format Google accepts for most features (the markup must be in-page; [intro to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)). But:

* `pnpm run qa:csp` runs `scripts/csp_check.mjs`, whose regex is `/<script(?![^>]*\bsrc\b)[^>]*>[\s\S]*?<\/script>/gi` applied to the built `index.html` — it matches **any** script without `src`, including `type="application/ld+json"`, and exits 1.
* This constraint is already documented in-repo: `src/shell/lib/js-flag.js` explains that the inline `classList.add('js')` was extracted precisely because "`pnpm run qa:csp` … requires ZERO inline `<script>` tags in the built index.html — even though CSP allows `'unsafe-inline'`".
* Note also that `'unsafe-inline'` in `script-src` means the CSP itself provides **no** XSS protection for scripts; the gate is the real safety net. So the gate must be narrowed, not removed.

**Verdict:** JSON-LD is allowed by the CSP but **blocked by our own CI gate**. Either (a) amend `scripts/csp_check.mjs` to ignore scripts whose `type` is `application/ld+json` (and keep failing on all other inline scripts), or (b) ship no JSON-LD. (a) is required for Priority-1 metadata anyway; it is a 30-line diff plus a test. Fence #1 in `AGENTS.md` forbids `<script>` **inside `src/master/*.html`** — the shell head is a different file and is not covered by that fence, so the change belongs in `src/shell/index.html` + `scripts/csp_check.mjs`, never in master content.

### 1.3 What this means in practice

* Googlebot *can* render the page (it runs an evergreen Chromium), so content **is** indexable in principle — but it lands in the render queue, which costs time and budget, and a 27 k-word SPA is not a cheap render ([JS SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)). Yandex's renderer is weaker on heavy client-side shells, and the Russian audience is the one that matters here.
* With one indexable URL and 62 sections, at most one page can rank, for one intent, with one title. That is the actual ceiling of the current architecture — not the missing tags.
* Missing canonical + missing absolute `og:url` is harmless today (one URL) but becomes a duplicate-content hazard the moment option (c) below creates per-Chapter URLs.

---

## 2. Priority 1 — get the content into the HTML response

Three options, honestly costed. Recommended order: **B first** (unblocks indexing cheaply, keeps the architecture), **C after** (what actually wins multiple queries).

### Option A — serve `parts/*.html` directly with `#anchor` + canonical

| Aspect | Assessment |
|--------|-----------|
| What it is | Add URLs of the form `/live-char-guide/parts/part_07a.html` to the sitemap; rely on the anchors for section targeting. |
| Pros | Zero new build logic; the HTML **already contains** the text in the response; one commit. |
| Cons (fatal-ish) | D11: these are fragments. A crawler that indexes them reports a page with **no title, no description, no `<html lang>`, no CSS** — the search result looks broken and a human who clicks it sees raw unstyled HTML. It also creates 15 duplicate/thin documents competing with the main page. |
| Risk | Medium-high. Fixing the thinness means wrapping each fragment in a full document → that is Option B, done 15×. |
| Work | 4–6 h, and it is throwaway work. |
| Verdict | **Do not ship.** Keep the fragments private to the loader (`robots.txt` cannot help — see D9; a `noindex` meta cannot be injected into fragments either). |

### Option B — build-time prerender of `<main>` in `dist/index.html` (RECOMMENDED, P0/P1)

| Aspect | Assessment |
|--------|-----------|
| What it is | `build-shell-unified.mjs` concatenates `build/parts/*.html` (in manifest order, appendices last) into `<main id="content">` before writing `dist/index.html`; the client loader detects existing content, skips all fetches, and runs only the post-injection sequence it already has (`initInteractiveElements(); generateTOC(); initActivePartHighlighting(); handleAnchor(); loadGlossaryContent()` — `lazy-loader.js:838-843`). |
| Pros | Content in the first byte; one URL; no router, no new pages; reuses the exact markup that already ships; the retry/error machinery stays for the fetch fallback path. |
| Cons | `dist/index.html` (and the committed root fallback) grows from **6.8 KB to ≈470 KB** (sum of `dist/parts/*.html`); every build rewrites a committed file; the `content-hidden` class and the loading overlay have to be reconciled with pre-existing DOM. |
| Risk | Low-medium. Two real hazards: (1) `content.innerHTML = ''` at `lazy-loader.js:792` must not run when prerendered content exists; (2) do **not** keep both paths live — a half-wired loader paints content twice. |
| What to change | `src/scripts/build-shell-unified.mjs` (new step: read `build/parts/manifest.json`, inject `<main>` inner HTML, drop `content-hidden`); `src/shell/lazy-loader.js` (guard at the top of `loadContent()`: `if (content.children.length > 0) { <post-injection sequence>; return; }`); `tests/` — one assertion that `dist/index.html` contains ≥ N section elements and that `parts/` is still emitted. |
| Work | 4–6 h implementation + 2 h verification (build, validate, browser check, JS-off check, hash/anchor navigation, widget init). |

### Option C — per-Chapter landing pages (P1, what actually ranks)

| Aspect | Assessment |
|--------|-----------|
| What it is | 13 static pages, one per Part (`/live-char-guide/ch/07a/` or `/guide/spine/`), each a real document with its own `<title>`, description, canonical, breadcrumbs, JSON-LD, and internal links to the neighbouring chapters. Generated by the same build from `build/parts/*.html`. |
| Pros | 13 URLs = 13 chances to rank for distinct intents («SPINE карточка персонажа», «изоляция голоса LLM», «лorebook бюджет токенов», «анти-паттерны карточки»); real breadcrumbs; each page has a coherent topical focus — the single strongest SEO move available to this project. |
| Cons | Duplicates the shell (styles/JS load per page — fine, cached); navigation model must stay "one linear guide" (each landing page needs prev/next + the shell TOC); 13 canonical decisions; per-page metadata must be generated, not hand-written, or it drifts. |
| Risk | Medium. It touches the navigation contract the v4 restructure just consolidated (`docs/RESTRUCTURE_V4_PLAN.md`: "one place, on time"). Needs an explicit owner decision that landing pages are *entry points*, not a second navigation surface. |
| What to change | New `scripts/build-pages.mjs` (templates + manifest → `dist/ch/*/index.html`), sitemap generator, internal `<link rel="prev/next">` + visible chapter links, `qa:seo` gate over all generated heads. |
| Work | 12–20 h implementation + 4 h verification; genuinely a separate iteration. |

**Decision rule:** ship B, measure for 4–6 weeks in Yandex Webmaster/Google Search Console ("Страницы в поиске", impressions per query). If one URL captures queries across several unrelated chapters (it will), start C with the five highest-intent Parts: 4 (SPINE), 3 (voice), 7A (system prompt), 8 (anti-patterns), 9 (diagnostics).

---

## 3. Metadata — exact tag set

Rules that apply to everything below:

* Edit **`src/shell/index.html` only**. `dist/index.html` and the root `index.html` are generated by `build-shell-unified.mjs:104-115` — hand edits are lost on the next build.
* Version substitution is already done by the build; keep the `<!-- Live Character Guide - Shell v… -->` comment verbatim.
* Value language: Russian (matches `lang="ru"` and the audience). Keep proper nouns and technical identifiers (SPINE, CoT, OCEAN, SillyTavern, Lorebook) in Latin — the guide's own terminology policy (fence #12, DEC-16).

### 3.1 The head block to insert (ready to paste)

Insert after `<meta name="viewport" …>` and **replace** the existing `description`/`og:*`/`twitter:card` block:

```html
  <!-- SEO (see docs/PROMOTION_SEO.md §3) -->
  <title>Гайд по карточкам персонажей для LLM 12B–32B+ — SPINE, голос, CoT, диагностика</title>
  <meta name="description" content="Инженерный гайд по сборке RP-карточек персонажей (SillyTavern): SPINE, поведенческие якоря, изоляция голоса, CoT, системный промпт, анти-паттерны, диагностика. 10 частей и приложения.">
  <link rel="canonical" href="https://vudirvp-sketch.github.io/">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Live Character Guide">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:url" content="https://vudirvp-sketch.github.io/">
  <meta property="og:title" content="Гайд по карточкам персонажей для LLM 12B–32B+">
  <meta property="og:description" content="SPINE, поведенческие якоря, изоляция голоса, CoT, системный промпт, анти-паттерны и диагностика — инженерный пайплайн сборки RP-карточки.">
  <meta property="og:image" content="https://vudirvp-sketch.github.io/assets/preview-card-1200x630.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Live Character Guide — схема сборки RP-карточки персонажа">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Гайд по карточкам персонажей для LLM 12B–32B+">
  <meta name="twitter:description" content="SPINE, якоря, изоляция голоса, CoT, системный промпт, анти-паттерны, диагностика.">
  <meta name="twitter:image" content="https://vudirvp-sketch.github.io/assets/preview-card-1200x630.png">
```

Notes: (1) `og:image` **must be absolute** (D6) and must exist as a real 1200×630 asset — add `src/assets/preview-card-1200x630.png` (current asset is 1344×768, D7); (2) do **not** add `hreflang` (one language) and do **not** add `meta keywords` (ignored, D13); (3) keep `name="livechar-version"` and the CSP meta untouched — `version:check` and `qa:csp` read them.

### 3.2 JSON-LD — one `@graph` block

`Article`/`TechArticle` describes the guide; `WebSite` + `BreadcrumbList` give the site/breadcrumb signals; `HowTo` is a stretch goal (only after option C gives each chapter its own URL — a `HowTo` on a 62-section page is not specific enough to be useful).

```html
  <!-- JSON-LD: allowed by CSP ('unsafe-inline' in script-src); requires the
       qa:csp amendment in scripts/csp_check.mjs (see PROMOTION_SEO §1.2) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://vudirvp-sketch.github.io/#article",
        "headline": "Гайд по карточкам персонажей для LLM 12B–32B+",
        "description": "Инженерный пайплайн сборки RP-карточек персонажей: SPINE, поведенческие якоря, изоляция голоса, CoT, системный промпт, анти-паттерны, диагностика.",
        "inLanguage": "ru",
        "url": "https://vudirvp-sketch.github.io/",
        "mainEntityOfPage": "https://vudirvp-sketch.github.io/",
        "image": "https://vudirvp-sketch.github.io/assets/preview-card-1200x630.png",
        "datePublished": "2025-01-01",
        "dateModified": "2026-10-25",
        "version": "9.2.6",
        "author": { "@type": "Organization", "name": "TITAN FUSE Team" },
        "publisher": { "@type": "Organization", "name": "TITAN FUSE Team" },
        "isAccessibleForFree": true,
        "license": "https://opensource.org/licenses/MIT"
      },
      {
        "@type": "WebSite",
        "@id": "https://vudirvp-sketch.github.io/#website",
        "url": "https://vudirvp-sketch.github.io/",
        "name": "Live Character Guide",
        "inLanguage": "ru",
        "publisher": { "@id": "https://vudirvp-sketch.github.io/#article" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Live Character Guide",
            "item": "https://vudirvp-sketch.github.io/" }
        ]
      }
    ]
  }
  </script>
```

`datePublished` must be the real first-publication date (owner knows it; **do not guess** — a wrong date is worse than an omitted one). `dateModified` should be bumped when the guide version changes; keep it in sync with `package.json`/`src/VERSION` and let `qa:seo` (below) fail if `version` in JSON-LD ≠ `src/VERSION`.

### 3.3 Gates to add (agent)

| Gate | File | What it asserts |
|------|------|-----------------|
| `qa:csp` amendment | `scripts/csp_check.mjs` | still exits 1 on any inline `<script>` whose `type` is not `application/ld+json`; new test asserts an `ld+json` block passes and a bare inline script fails |
| `qa:seo` (new) | `scripts/seo_check.mjs` + `npm script` | `dist/index.html` has: `<title>` in Cyrillic (regex `[А-Яа-я]`), exactly one `<link rel=canonical>`, `og:url`/`og:image` absolute (`^https://`), `og:image` file exists in `dist/`, valid JSON in every `ld+json`, JSON-LD `version` = `src/VERSION`; `dist/sitemap.xml` parses, every `<loc>` returns that file path exists in `dist/` |

Estimated: **2–3 h** for both gates + tests.

---

## 4. `sitemap.xml` / `robots.txt`

### 4.1 The robots.txt reality

`robots.txt` at the project path is dead weight (D9). Two honest consequences:

1. **Today:** do not rely on it. Submit the sitemap manually in Yandex Webmaster and Google Search Console instead.
2. **It becomes useful only if** the site moves to a custom domain (`https://<domain>/robots.txt` is then the host root) **or** the owner creates the `<user>.github.io` root repository that can serve `https://vudirvp-sketch.github.io/robots.txt`. Until then, keep the file (harmless, and correct if either of the above happens) but stop expecting crawler behavior from it.

### 4.2 Sitemap

Current file lists one URL with no `lastmod`. After option B the sitemap still has one URL; after option C it has 14+. Generate it, never hand-maintain it.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vudirvp-sketch.github.io/</loc>
    <lastmod>2026-10-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- one <url> per generated chapter landing page after option C, priority 0.8 -->
</urlset>
```

Rules to encode in the generator (`scripts/generate-seo.mjs`, agent):

| Element | Rule | Why |
|---------|------|-----|
| `<loc>` | Absolute, trailing-slash form for directory pages; built from `build/parts/manifest.json` (+ chapter routes after C) | Wrong `loc` = silent rejection |
| `<lastmod>` | **Content-change date, not build date.** Read from `CHANGELOG.md`'s latest release date or a `SEO_LASTMOD` constant bumped in the same commit as a content release | Builds run on every push; build-time `lastmod` is a lie Google learns to ignore |
| `<changefreq>` | `monthly` for the index, `yearly` for chapter pages | Google ignores it, Yandex still reads hints; do not fake `daily` |
| `<priority>` | `1.0` index, `0.8` chapters, never below `0.5` | Relative within the site only |

Hook: `build-shell-unified.mjs:243-253` already copies `sitemap.xml`/`robots.txt` from the repo root into `dist/`. Change that step to run the generator first (or better: have the generator write `dist/sitemap.xml` directly and drop the copy). **Work: 2–3 h including the `qa:seo` cross-check.**

---

## 5. Search engines — concrete steps

### 5.1 Yandex Webmaster (priority: this is the Russian audience)

Facts from [Яндекс Вебмастер — подтверждение прав](https://yandex.ru/support/webmaster/ru/service/rights.html): verification is by an HTML file in the **root directory of the site**, a `<meta name='yandex-verification' …>` **in the `<head>` of the main page**, a DNS TXT record, or Yandex Metrica/Tag Manager; the check can take up to 24 h and is re-verified periodically.

The obstacle is structural, and must be stated plainly: Webmaster verifies a **host**. `vudirvp-sketch.github.io` is a shared host whose root serves the user's root site, not this project. Therefore:

| Route | What it needs | Effort / risk |
|-------|---------------|---------------|
| **A. Custom domain** (recommended long-term) | Buy a domain, `CNAME` in the repo + Pages setting, then DNS TXT verification | 1–3 h + annual cost. Also fixes D9 (real `robots.txt` at host root), makes `og:url`/canonical stable, and gives the project a memorable address. This is the single highest-leverage non-code change |
| **B. Create `<user>.github.io` root repo** | A repo named `vudirvp-sketch.github.io` whose root can host the verification file / meta tag; then add the host in Webmaster | 1–2 h, free. Downside: the host now has two unrelated sites; the project page remains a subdirectory |
| **C. Try adding the project path as a site** | Depends on what the current Webmaster wizard offers for `*.github.io` targets — **verify in the wizard, do not assume** | 15 min to test |

Do **not** spend time on option C first; test it only because it is cheap.

After verification: **Индексирование → Файлы Sitemap** → add `https://vudirvp-sketch.github.io/sitemap.xml`; **Индексирование → Переобход страниц** for the index URL after each content release.

### 5.2 Google Search Console

Per [Search Console verification](https://support.google.com/webmasters/answer/9008080): an **HTML file upload works for URL-prefix properties**, and "if you verified ownership … any child properties you add will be auto-verified". Steps:

1. Add property → **URL prefix**: `https://vudirvp-sketch.github.io/`.
2. Choose **HTML file** → download `google<token>.html` → commit it to the **repo root of the deployed tree** and copy it into `dist/` in `build-shell-unified.mjs` (same pattern as `sitemap.xml`), so it is served at `https://vudirvp-sketch.github.io/google<token>.html`.
   - **Caution:** it must survive every build. A file placed only in `dist/` is deleted (`build-shell-unified.mjs` does `rm -rf dist`), which silently unverifies the property.
3. Verify; then **Sitemaps → add sitemap**; then **URL Inspection → Request indexing** once after the prerender lands.
4. Add the `<meta name="google-site-verification" …>` variant as a second method in the head — cheap insurance against the file being lost in a refactor.

**Work: 1 h owner (account) + 1 h agent (build step + file).**

### 5.3 Bing Webmaster Tools

Add the site and prefer **import from Google Search Console** (offered in the Bing wizard; confirm the current wording there) — it skips a second verification round. If importing is unavailable, use the XML-file/meta-tag methods from the wizard. Bing also feeds Copilot/ChatGPT-style surfaces, so it is worth the 15 minutes even at small share.

### 5.4 IndexNow

Facts from [indexnow.org/documentation](https://www.indexnow.org/documentation) and [indexnow.org/searchengines](https://www.indexnow.org/searchengines):

* Key: 8–128 chars, `a-z A-Z 0-9 -`; the key file must be a UTF-8 text file containing the key; ownership is proven by hosting it.
* Endpoint: `https://api.indexnow.org/indexnow?url=<url>&key=<key>` (GET) or a JSON POST batch; a `keyLocation` parameter points at a key file **not** at the host root.
* Participating engines propagate notifications to each other, so **one** submission reaches Bing, Yandex (a listed participant), Seznam, etc.

For this project the key file cannot live at `https://vudirvp-sketch.github.io/<key>.txt` (host root is not ours), so use `keyLocation`:

```
https://api.indexnow.org/indexnow
  ?url=https%3A%2F%2Fvudirvp-sketch.github.io%2Flive-char-guide%2F
  &key=<32-hex-key>
  &keyLocation=https%3A%2F%2Fvudirvp-sketch.github.io%2Flive-char-guide%2F<key>.txt
```

The key file `<key>.txt` must be **committed at the repo root** and copied into `dist/` by the build (same pattern as `sitemap.xml`) — a file written only into `dist/` disappears on the next build and breaks verification.

Automation sketch (a new step **after** `Deploy to GitHub Pages` in `.github/workflows/deploy-pages.yml`):

```yaml
      - name: IndexNow — notify search engines
        continue-on-error: true
        run: |
          curl -sS -X POST "https://api.indexnow.org/indexnow" \
            -H "Content-Type: application/json; charset=utf-8" \
            -d '{
              "host": "vudirvp-sketch.github.io",
              "key": "${{ secrets.INDEXNOW_KEY }}",
              "keyLocation": "https://vudirvp-sketch.github.io/${{ secrets.INDEXNOW_KEY }}.txt",
              "urlList": ["https://vudirvp-sketch.github.io/"]
            }'
```

**Blocker:** `.github/workflows/*.yml` is an `AGENTS.md` **stop condition** — the workflow change requires explicit owner approval, and the key must be stored as a repository secret. Do not submit more often than content actually changes; a notification per deploy of an unchanged page trains the engines to discount the signal.

**Work: 2–3 h (agent) + owner approval + secret.**

### 5.5 Sequencing

1. Yandex + Google properties verified, sitemap submitted → **today, do this first; it is free**.
2. Option B (prerender) shipped → request re-index in both.
3. Chapter pages (C) → their URLs go into the sitemap → IndexNow on each content release.

---

## 6. GitHub-specific visibility

> **Coordination note (checked 2026-10-26):** repo description and all 20 topics have already been **applied** via `gh api` and are documented in [`docs/promotion/repo-metadata.md`](./promotion/repo-metadata.md). That file is the applied state; the texts below are an **alternative** kept here only for completeness. If both documents stay, collapse them to one source of truth — two competing `description`/`topics` lists will drift. Everything else in this section (social preview, website field, releases, discussions, badges) matches what `repo-metadata.md` proposes.

| Item | Action | Notes |
|------|--------|-------|
| **Description** (≤350 chars) | Set in the About panel | Ready text (RU, keywords, 230 chars): `Инженерный гайд по RP-карточкам персонажей для LLM 12B–32B+ (SillyTavern): SPINE, поведенческие якоря, изоляция голоса, CoT, системный промпт, Lorebook, анти-паттерны, диагностика. 10 частей + приложения, 62 раздела, версия 9.2.6.` |
| **Topics** | 20 max in the picker; format is `lowercase`, digits, hyphens ([GitHub docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)) | `llm` · `roleplay` · `character-card` · `sillytavern` · `prompt-engineering` · `system-prompt` · `ai-roleplay` · `persona-design` · `character-design` · `local-llm` · `chain-of-thought` · `ocean-model` · `enneagram` · `mbti` · `lorebook` · `russian` · `static-site` · `engineering-guide` · `ai-writing` · `tavern` |
| **Social preview** | Settings → Social preview → upload 1280×640 PNG | Current asset is 1344×768 (D7) — render a proper 1280×640 crop with the title text; it is the first thing shown when the repo is linked anywhere |
| **About → Website** | Set to `https://vudirvp-sketch.github.io/` | Free internal-link equity from a high-authority domain (github.com → your page) |
| **Releases** | Publish one Release per meaningful version (`9.2.6`), notes from `CHANGELOG.md` | Releases get indexed, appear in `/releases`, and are what awesome-lists/reviews link to. **Conflict to resolve:** the deploy workflow tags every deploy (`deploy-YYYYmmdd-HHMMSS`, D15) — that noise should stop (owner approval: workflow change) or the deploy tags should be excluded from the release narrative |
| **Discussions** | Enable, seed 1–2 threads ("Покажите свою карточку", "Вопросы по SPINE") | Adds indexable UGC to the repo and gives the Reddit/Telegram audience a home that is not an issue tracker |
| **README badges** | Version + license + Pages only | Static shields: `version-9.2.6`, `license-MIT`, `pages-live`. No vanity counters; a broken/fake badge costs more trust than it buys |
| **Custom domain** | Discuss before buying (see 5.1-A) | Pros: real `robots.txt`, DNS verification for both engines, a stable canonical not tied to a username, a shorter URL for print/Telegram. Cons: cost, one more failure mode, GitHub Pages still terminates TLS. `*.github.io` is a shared host, so its "domain weight" is not yours — a custom domain is the only way to earn and keep that weight |

---

## 7. External links and distribution (real channels, honest risk)

| Channel | Format that works | Risk | Effort |
|---------|-------------------|------|--------|
| **Habr** (RU, primary) | A *narrative technical article* by a human author: e.g. "Как собрать карточку персонажа для 12B-модели: SPINE, якоря, изоляция голоса" — with the guide linked once, in context, as the full reference | **High, read the rules** ([habr.com/ru/docs/help/rules](https://habr.com/ru/docs/help/rules/)): §1 forbids unsanctioned advertising/self-promo (exception: corporate blog or one post in the «Я пиарюсь» hub); §1 **explicitly** allows "полезные ссылки … существенно дополняющие материал"; §2 forbids "публикации, ориентированные на поисковые системы, а не на живых читателей"; §4 forbids texts "частично или полностью сгенерированные нейросетями". → The article must be **written by the owner**, not generated, and the link must be a genuine addition, not the point of the post | 6–10 h owner writing; one post |
| **Reddit r/SillyTavernAI** | A short, self-contained finding (e.g. "the five checks that fixed my 12B card") + link in the body or a comment | Medium. Subreddit-specific self-promo and topicality rules apply — read the current sidebar/wiki before posting; link-dumps are removed | 1–2 h |
| **Reddit r/LocalLLaMA** | Technical, model-behaviour angle (token budget, CoT tiers on 12B) — not "here is my site" | Medium-high: strictly technical audience, low tolerance for promotion. Only post content that stands alone without the link | 1–2 h |
| **Telegram LLM/RP channels** | Ask the channel owner for a mention; provide a one-paragraph RU description + the 1200×630 image | Medium: unknown channel policies, and paid placement is possible — do not invent channel names, pick them manually and ask | 1–2 h per channel |
| **Awesome lists** | PR adding one line under the right heading | Rules matter: `Hannibal046/Awesome-LLM` states "contributions are always welcome … I will keep some pull requests open if I'm not sure if they are awesome for LLM" ([repo](https://github.com/Hannibal046/Awesome-LLM)) — it curates papers/frameworks/tutorials, so a *guide* fits best under tutorials/courses, and a marketing-toned entry will be rejected. Look for lists on prompt engineering / roleplay / SillyTavern specifically, and follow each list's `CONTRIBUTING.md` | 1–2 h per list |
| **Show HN** | Only if there is something to *run*; a static guide is usually flagged as not-show-HN material | High risk of being ignored or flagged — skip unless a tool appears | 0 |
| **chub.ai / character-hub-style platforms** | These host **character cards**, not guides. A link belongs in a card's description/creator profile only if the owner also publishes a card there | Relevance **low** for a guide; do not spend time unless a card is published. No claim is made here about their article/guide policies — verify before posting | 0–1 h |
| **SillyTavern docs / community wiki** | Upstream docs link external guides only by maintainer decision — do not assume; open an issue/PR and ask | Low effort, uncertain outcome | 0.5 h |
| **Wikipedia / ru Wikipedia** | Not eligible (no independent coverage yet) | Ban risk for self-promotion | skip |

Cross-cutting rule: **distribution produces backlinks.** One genuine technical post that people cite beats twenty directory entries. Budget the owner's writing time before anything else in this section.

---

## 8. What NOT to do

| Technique | Why not |
|-----------|---------|
| Keyword-stuffed `<title>`/`description` per section, doorway pages ("карточка персонажа 12b", "карточка персонажа 32b" …) as separate near-identical pages | Doorway-page pattern; manual action risk; and Habr §2 bans SEO-oriented publications, so it also burns the main distribution channel |
| Adding `<meta name="keywords">` | Ignored by Google (D13) and Yandex treats it weakly; pure noise |
| Faking `lastmod` on every build / `changefreq=daily` | Engines learn to discount the sitemap; you lose the one signal that is cheap to keep honest |
| Mass IndexNow submissions per deploy / per anchor | Anchor fragments are not URLs (D12); repeated identical notifications devalue the signal |
| Serving `parts/*.html` as thin pages, or indexing them as-is | D11 — no head, no styles; looks broken and duplicates the main page (§2 Option A) |
| Cloaking (prerendered text for bots, different for users) | The honest approach here is the same markup for both — prerender literally the same fragments |
| Buying links / link exchanges / PBNs | Penalty risk on a domain that currently has no history to lose but also none to spend |
| Posting AI-written text to Habr | Habr rule §4; removal + account restriction risk, and it is the single best RU channel — never spend it cheaply |
| Spamming r/LocalLLaMA or Telegram with the link | Removed posts and burnt channels; these are the audience, not traffic |
| Turning the repo into a marketing page (badges wall, GIF hero, "stars" begging) | The repo's credibility is its engineering discipline (AGENTS.md, gates, canon); a hype layer contradicts the product |
| CN/EN translation as an "SEO multiplier" right now | Second language = real first-class work (translation + hreflang + separate canon); it halves quality of both. Defer until the RU site has traction |

---

## 9. Checklist and effort table

| # | Step | Effect | Effort | Who |
|---|------|--------|--------|-----|
| **P0-1** | Rewrite head: RU `<title>`, `description`, `canonical`, absolute `og:url`/`og:image`, `og:locale`, `twitter:*` (§3.1) | SERP snippet in the audience's language; social cards render | 1.5–2 h | agent |
| **P0-2** | Add `src/assets/preview-card-1200x630.png`; keep the old asset if still referenced | Correct `summary_large_image` / GitHub social preview crop | 1 h | agent + owner (visual) |
| **P0-3** | Amend `scripts/csp_check.mjs` to allow only `type="application/ld+json"`; add JSON-LD `@graph` to the head (§3.2) | Rich-result eligibility; Article/WebSite/Breadcrumb signals | 2–3 h | agent |
| **P0-4** | `qa:seo` gate (§3.3) + tests | Metadata can never silently regress | 1.5–2 h | agent |
| **P0-5** | Sitemap/robots generator wired into the build (§4.2) | Correct sitemap, honest `lastmod` | 2–3 h | agent |
| **P0-6** | Verify Yandex Webmaster + Google Search Console (URL-prefix), submit sitemap (§5.1, §5.2) | Both engines learn the site exists; the fastest real win | 1–2 h | **owner** (accounts) + 1 h agent (verification file in build) |
| **P0-7** | Bing Webmaster via GSC import (§5.3) | Second engine, 15 minutes | 0.5 h | **owner** |
| **P1-1** | Build-time prerender of `<main>` (§2B) + loader guard | Content becomes indexable without JS render; the core fix | 4–6 h + 2 h verify | agent |
| **P1-2** | Repo About: description + 20 topics + website + social preview (§6) | GitHub-internal discovery, backlink from github.com | 1–1.5 h | **owner** |
| **P1-3** | First Release `9.2.6` from `CHANGELOG.md`; decide the fate of per-deploy tags | Citable, indexable version artifact | 1 h | **owner** (+ workflow change if tags stop) |
| **P1-4** | Enable Discussions + 2 seed threads | Indexable UGC, a home for the audience | 0.5 h | **owner** |
| **P1-5** | IndexNow: key file in repo root + build copy + CI step (§5.4) | Fast re-crawl on release | 2–3 h | agent, **workflow change needs owner approval** + secret |
| **P1-6** | Chapter landing pages (§2C), start with Parts 4/3/7A/8/9 | 5–14 URLs, one intent each — the real ranking lever | 12–20 h + 4 h verify | agent, **owner decision** (navigation contract) |
| **P2-1** | Fix `src/404.html` CTA: `/` → `https://vudirvp-sketch.github.io/` | No dead exit for inbound dead links | 0.5 h | agent |
| **P2-2** | Habr article (human-written, one in-context link) | Best RU backlink + qualified traffic | 6–10 h | **owner** |
| **P2-3** | Reddit r/SillyTavernAI + r/LocalLLaMA posts (content-first) | Targeted traffic, backlinks | 2–4 h | **owner** |
| **P2-4** | 1–2 awesome-list PRs after reading their `CONTRIBUTING.md` | Durable backlink from a curated list | 2–3 h | agent draft, owner submits |
| **P2-5** | Custom domain decision (§5.1-A, §6) | Fixes robots.txt, DNS verification, stable canonical | 1–3 h + annual cost | **owner** |
| **P2-6** | Weekly check: Yandex Webmaster "Страницы в поиске" + GSC Performance; log queries in `worklog.md` | Data instead of guesses for the C decision | 0.5 h/week | owner/agent |

**Totals:** P0 ≈ 8–13 h agent + 1.5–3 h owner — the whole P0 block fits one or two iterations. P1 ≈ 20–32 h (dominated by chapter pages). P2 is optional and mostly owner writing time.

### What requires an owner decision (not an agent action)

1. **Accounts:** Yandex Webmaster, Google Search Console, Bing Webmaster — owner must own them; the agent can prepare files, not verify.
2. **Domain:** buy a custom domain, or create the `<user>.github.io` root repository — otherwise `robots.txt` stays dead and Yandex verification needs a workaround (§5.1).
3. **Workflow changes:** the IndexNow step and any deploy-tag change touch `.github/workflows/*.yml` — an `AGENTS.md` stop condition; needs approval and a repository secret.
4. **Navigation contract:** chapter landing pages (§2C) add entry surfaces on top of the v4 "one place, on time" model — explicit owner call before implementation.
5. **Publication:** Habr/Reddit/Telegram posts must be human-authored (Habr §4) and channel rules must be checked at posting time; no agent writes or posts them.
6. **First-publication date** for JSON-LD `datePublished`, and the repo `description`/topics/social-preview uploads.

---

## Appendix — order of work if only one iteration is available

`P0-1 + P0-3 + P0-4` (head metadata, JSON-LD, gate) → `P0-5` (sitemap) → `P0-6/7` (owner verifies) → then `P1-1` (prerender) in the next iteration. Do not start `P1-6` (chapter pages) before the owner accepts §2C and before the search consoles show which queries the single URL actually attracts.
