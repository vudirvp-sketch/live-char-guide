# PROMOTION_PLAN — making the guide findable

> Scope: repository presentation, search visibility, distribution, and the language-switcher decision.
> This is a **roadmap + decision log**, not an implementation record. Detailed technical proposals live in:
> [`PROMOTION_SEO.md`](./PROMOTION_SEO.md) (indexing, metadata, search engines) ·
> [`promotion/repo-metadata.md`](./promotion/repo-metadata.md) (GitHub-side, **applied state**) ·
> [`promotion/README.proposed.md`](./promotion/README.proposed.md) (new README, not yet applied) ·
> [`I18N_PLAN.md`](./I18N_PLAN.md) (language switcher design).
>
> Date: 2026-10-26 · Base commit: `6605b876` · Guide version: 9.2.6
>
> **Status 2026-10-26:** A1–A5 and A7 are **implemented and verified** (see §3.1). B is applied
> except the web-UI-only items. C is applied (`README.md`). D not started. E deferred by the owner
> («пока только для ru аудитории»). D-1 was **executed and reverted the same day** — the root site cost the
> repository its project name, which the owner judged worse than the root `robots.txt`; the repo is back to
> `live-char-guide` and the site stays at `…/live-char-guide/`. Record and the remaining "Option 3"
> (host-root helper repo): [`promotion/root-site-migration.md`](./promotion/root-site-migration.md).
> D-3 Russian-first README — done, recorded in `AGENTS.md`; D-4 languages later.

---

## 1. Where the project actually stands

| Signal | State | Evidence |
|---|---|---|
| Repo description | ✅ set (was empty) | applied 2026-10-26, see `promotion/repo-metadata.md` §1 |
| Repo topics | ✅ 20/20 set (was empty) | applied 2026-10-26, §2 |
| Homepage URL | ✅ set | `gh api repos/...` |
| Releases | ❌ none | 0 releases; deploys tagged `deploy-YYYYmmdd-HHMMSS` |
| Social preview | ❌ unset | web UI only |
| Words visible to a crawler on the live home page | **249 characters** ("включите JavaScript") | fetched `https://vudirvp-sketch.github.io/live-char-guide/` → 6 815 bytes = the bare shell |
| Words in the actual guide | **≈27 200** (62 sections) | `dist/parts/*.html` |
| `<link rel="canonical">` | ❌ absent | 0 matches in `src/shell/index.html` |
| JSON-LD | ❌ absent | 0 matches |
| `og:url` / `og:site_name` / `og:locale` | ❌ absent | 0 matches |
| `og:image` | ⚠️ **relative** path — breaks every unfurl | `content="assets/preview-card.png"` |
| `<title>` / `<meta description>` | ⚠️ English on 100 % Russian content | `Live Character for LLM — Guide` |
| `hreflang` | ❌ absent (fine today — one language) | 0 matches |
| `robots.txt` | ⚠️ **dead where it sits** — crawlers read only `https://vudirvp-sketch.github.io/live-char-guide/robots.txt`, never `/live-char-guide/robots.txt` | Google robots.txt spec (cited in `PROMOTION_SEO.md` §4.1) |
| `sitemap.xml` | ⚠️ 1 URL, no `lastmod` | file is 4 lines |

**Reading of the situation.** The guide is not "under-optimised"; it is **structurally invisible**. Every one of its 27 200 words is fetched by `lazy-loader.js` at runtime, and the only always-present text is a request to enable JavaScript. Topics, descriptions and READMEs cannot compensate for that — they are cheap, and they were worth doing, but they are not the bottleneck.

---

## 2. The order that actually pays off

```
1. Content into the HTML response   ← 90 % of the value, 4–6 h
2. Head metadata + sitemap + gates  ← 3–5 h
3. Registration in the search engines ← 1–2 h owner, then waiting
4. Per-chapter landing pages        ← 12–20 h, the real ranking lever
5. Distribution (human-written)     ← the slow channel, cannot be automated
6. Language switcher                ← prerequisite for #5 in English, not for #1–#4
```

Anything done out of this order spends effort on surfaces that have no traffic to feed.

---

## 3. Workstream A — make the content indexable (P0)

Full analysis and alternatives in [`PROMOTION_SEO.md`](./PROMOTION_SEO.md) §2–§5. Summary of the decision:

| Step | What | Effort | Risk |
|---|---|---|---|
| **A1** | Build-time prerender of `<main>` in `dist/index.html` (concatenate `build/parts/*.html`), loader adopts existing DOM instead of re-fetching | 4–6 h + 2 h verify | Low-medium — two hazards: `content.innerHTML = ''` (`lazy-loader.js:792`) must not run; never keep both paths live |
| **A2** | Head rewrite in `src/shell/index.html`: Russian `<title>`, description, `canonical`, absolute `og:image` + `og:url`/`og:site_name`/`og:locale`, `twitter:*` | 1 h | Low — generated `dist/`+root fallbacks follow automatically |
| **A3** | JSON-LD `@graph` (`TechArticle` + `WebSite` + `BreadcrumbList`) | 1 h | Low — CSP allows it (`script-src 'unsafe-inline'`), but **our own `qa:csp` gate blocks it**; the gate must allowlist `type="application/ld+json"` only (fence #1 for master HTML stays untouched) |
| **A4** | 1200×630 social image (`src/assets/preview-card-1200x630.png`) | 0.5 h | Low — current asset is 1344×768, `summary_large_image` wants 1200×630 |
| **A5** | `scripts/generate-sitemap.mjs` → 14 `<loc>` (home + 13 chapters/appendices) with `lastmod` from build; keep `robots.txt` but document that it is inert until A6/domain | 2 h | Low |
| **A6** | Domain decision — see D-1. Until then `robots.txt` and host-level verification stay degraded | owner | — |
| **A7** | New gate `qa:seo` (`scripts/seo_check.mjs`): Cyrillic title, exactly one canonical, absolute `og:*`, valid JSON-LD whose `version` == `src/VERSION`, sitemap `<loc>` all resolve inside `dist/` | 2–3 h | Low, but it is what keeps A2/A3 from rotting on the next build |

**Acceptance for workstream A:** `curl https://vudirvp-sketch.github.io/live-char-guide/` returns HTML containing all 62 `<section>` elements; `view-source` shows a Russian `<title>`, one canonical, one valid JSON-LD block, absolute `og:image`; `qa:seo` and `qa:csp` both PASS; existing battery unchanged (build 62 sections, validate redirects, tests 68/68, sync 87/87, english 1 / syntax 224).

### 3.1 Implemented (2026-10-26) and how it was proved

**Deployed:** `d647c56b` (the whole track) + `54fd44d8` (404 CTA fix); Pages run green. Verified against the live
URL, not only locally: `https://vudirvp-sketch.github.io/live-char-guide/` now serves 62 `<section>` elements,
a Russian `<title>`, one absolute canonical, one JSON-LD block, absolute `og:image`, and **22 016 crawler-visible
words** (was 249 characters). `sitemap.xml` is regenerated with `<lastmod>`; `/does-not-exist` returns the custom
404 whose CTA now points at the guide instead of the GitHub org root.

| Step | Where | Evidence |
|---|---|---|
| A1 prerender | `src/scripts/build-shell-unified.mjs` (`prerenderIndex`), `src/shell/lazy-loader.js` (adoption guard) | build log `Prerendered 62 sections into dist/index.html (464 KB)`; crawler-visible text went **249 chars → 22 016 words**; browser check `tools/verify-prerender.mjs`: 62 sections rendered, **no fragment refetch**, TOC 62 items, deep link `#p4_spine_overview` scrolls, no double paint |
| A2 head | `src/shell/index.html` | Russian `<title>` (59 chars), description, canonical, `og:url`/`og:site_name`/`og:locale`, absolute `og:image` + `twitter:*` |
| A3 JSON-LD | `src/shell/index.html` + `scripts/csp_check.mjs` allowlist for `type="application/ld+json"` only | `qa:csp` PASS (inline scripts still rejected); `qa:seo` PASS on JSON parse + substituted URLs + `inLanguage: ru` |
| A4 social image | `src/assets/preview-card-1200x630.png` (1200×630, 30 KB) | `qa:seo` asserts the file exists in the build |
| A5 sitemap | `scripts/generate-sitemap.mjs` (wired into `pnpm run build`), `sitemap.xml` regenerated with `<lastmod>` | `qa:seo`: 1 absolute `<loc>`, no fragment URLs, `<lastmod>` present |
| A7 gate | `scripts/seo_check.mjs` + `qa:seo` in `package.json` | 24 assertions, all PASS |
| — | `scripts/site-config.mjs` | single origin; `{{SITE_URL}}` substitution fails the build gate if left unresolved — makes the D-1 move a one-line change |
| — | `scripts/bundle_check.mjs` | index.html budget 500 KB → 900 KB (the document now legitimately carries the corpus) |
| — | `tests/test-prerender.mjs` | 8 new assertions; suite 68 → **76/76** |
| — | `tools/verify-prerender.mjs` | real-browser proof, run against a local server |

Unchanged by the work: validate 12/12 + 132 redirects, `version:check` sync, `qa:english` **1**, `qa:syntax` **224** (baselines exact), `qa:doc-versions` 7 pre-existing warnings.

Still open in A: **A6 (domain)** — now D-1, prepared in [`promotion/root-site-migration.md`](./promotion/root-site-migration.md); and the IndexNow automation, which needs a workflow edit (AGENTS.md stop condition → owner approval) plus a committed key file.

**Not in scope for A:** chapters as separate pages. That is P1 (D-2).

## 4. Workstream B — GitHub presence (mostly done)

Applied: description, 20 topics. Remaining owner actions in `promotion/repo-metadata.md`:

| Item | Action | Who |
|---|---|---|
| Social preview upload | Settings → General → Social preview | owner (no API) |
| Discussions | enable, or explicitly decline (moderation cost) | owner |
| Wiki | disable (empty wiki = thin duplicate surface) | owner |
| First release | `gh release create v9.3.0` at the next milestone — a release page is an indexable URL on a high-authority domain | owner/agent |
| README | apply `promotion/README.proposed.md`, see D-3 | owner/agent |

## 5. Workstream C — README as a landing page

Draft: [`promotion/README.proposed.md`](./promotion/README.proposed.md). What changes against the current README and why:

| Change | Why |
|---|---|
| Hero line in Russian + one-sentence positioning («не сборник промптов, а конвейер») | the current first line is English and reads like internal documentation |
| Badges (deploy, version, license, last commit, language) | a dead project and a live one look identical without them; last-commit badge is the cheapest credibility signal |
| «Какую проблему это решает» — the three failure modes | that is the actual search intent behind «карточка персонажа плохо работает» |
| Full chapter table with **deep links** to the live site | turns the README into a second entry surface with 14 outbound links; GH READMEs are indexed |
| «С чего начать» (3 steps) and «Кому подойдёт / не подойдёт» | conversion; the current README sends a reader to `AGENTS.md` first, i.e. treats every visitor as a contributor |
| Screenshot | the repo currently shows no image at all |
| Keyword line + short English summary | long-tail coverage + a path for non-Russian visitors |
| The existing repo-structure / commands / pipeline sections | kept nearly verbatim — they are already good and factual |

## 6. Workstream D — distribution (P2, cannot be automated)

Honest framing: this is the channel that actually moves a guide, and it is the one that cannot be done by an agent.

| Channel | Fit | Constraint |
|---|---|---|
| Habr | high — the audience is exactly here | **Habr rules forbid fully or partially AI-generated publications** (cited in `PROMOTION_SEO.md` §7) and self-promo without a substantive article. Expensive, but the highest-ceiling channel |
| Reddit (r/SillyTavernAI, r/LocalLLaMA) | medium-high | self-promo tolerated only as a substantive writeup, not a link drop; check each sub's self-promo rule at post time |
| Telegram LLM/RP channels | high for RU | needs relationships, not posts; a link dropped cold is ignored or banned |
| awesome-lists | medium | each list has its own contribution rules; several are stale or unmaintained — verify before spending time |
| Character-card platforms | medium | only where a written guide is acceptable; most are card galleries, not guides |

Rule adopted: **one channel per week, human-written, no cross-posting the same text.** A cold link is worse than silence — it burns the channel.

## 7. Workstream E — language switcher

Full design and measurements: [`I18N_PLAN.md`](./I18N_PLAN.md). Decision needed before any code: **which problem is being solved** —

1. *Interface language* — 179 Cyrillic UI occurrences (159 unique, ≈1 050 words) across 8 shell files.
2. *Content language* — 14 master files, 62 sections, ≈16 400 Russian words, 45 `<pre>` blocks (58 KB, 12.5 %) that must stay byte-identical because they are the executable prompt content.

Costed: **≈235–275 person-hours ≈ 22–28 iterations** for a complete RU+EN guide, of which translation/review is 150–170 h. The code is not the expensive part.

Two findings from `I18N_PLAN.md` that constrain the design and are worth stating here:

- **EN content cannot live in `src/master/<lang>/`.** `scripts/build-unified.mjs`, `scripts/validate-master.mjs` and `tests/test-toc-coverage.mjs` read `src/master` **flat**, while `scripts/check_english.py:328` globs it **recursively** — a subdirectory there would be invisible to the build and visible to the English-leak gate at once (baseline 1 → thousands). Verified. The workable shape is a sibling tree (`src/master-en/`) with the same 62 section ids.
- **The switch has an honesty requirement.** A locale registry carries `complete | partial | chrome-only | pending`, so the UI cannot offer a language whose content it does not have. Without that field "переключатель языка" is a lie that ships once and is trusted never again.

**Recommendation (D-4):** Phase 1 only — the chrome mechanism (dictionary + pre-paint boot script + 7th FAB button + storage/URL precedence), ≈3 iterations. Do not translate content yet: it multiplies the maintenance surface (every future content iteration runs twice) and the audience that converts today is Russian-speaking. Translate when Workstream D has actually opened an English-language channel to send traffic to — that is the only thing that makes 150 h of translation pay back.

Cross-check needed before implementation: `I18N_PLAN.md` §5.4 (hreflang / per-language canonical / sitemap) and `PROMOTION_SEO.md` §4 (sitemap generator, canonical) must be implemented together, or the sitemap will be generated twice by two different scripts.

---

## 8. Proposed iteration breakdown

Fits the repo's own iteration protocol (`AGENTS.md`), 3–5 files each.

| Proposed iteration | Files | Acceptance |
|---|---|---|
| `iter-191-promo-p0` | `src/shell/index.html`, `scripts/generate-sitemap.mjs`, `scripts/csp_check.mjs`, `scripts/seo_check.mjs`, `package.json` (script entry) | A2+A3+A5+A7; full battery green; `curl` shows Russian title + canonical + JSON-LD |
| `iter-192-prerender` | `src/scripts/build-shell-unified.mjs`, `src/shell/lazy-loader.js`, 1 test, `src/assets/preview-card-1200x630.png` | A1+A4; prerendered `<main>`, loader adopts, no double paint, anchor navigation intact, `tests/` assertion on section count |
| `iter-193-readme` | `README.md`, `promotion/repo-metadata.md` | C applied; D-1/D-3 decided |
| `iter-194-landing-pages` | `scripts/build-pages.mjs`, sitemap generator, `qa:seo` | D-2 approved; 13 chapter pages, prev/next, canonical, gates green |
| `iter-19x-i18n` | per `I18N_PLAN.md` phase 1 | D-4 decided |

Two iterations (191, 192) are enough to see a real signal in Yandex Webmaster. Measure before building 194.

---

## 9. Decision log (owner calls)

| ID | Decision | Options | Recommendation |
|---|---|---|---|
| **D-1** | Domain | (a) stay on `…github.io/live-char-guide/`; (b) custom domain; (c) move to a `<user>.github.io` root repo | **DECIDED 2026-10-26 → (a), after trying (c).** (c) was executed and reverted the same day: it works technically but turns the repository name into a username, so the project name disappears from the URL. Lost benefit is small — the root `robots.txt` only advertises the sitemap, which is submitted by hand once anyway. Both runs documented in [`promotion/root-site-migration.md`](./promotion/root-site-migration.md); its "Option 3" (a two-file host-root helper repo) gives the `robots.txt` without the rename, if it ever matters |
| **D-2** | Per-chapter landing pages | accept / reject | **accept, but only after measuring option A for 4–6 weeks.** 13 URLs × 13 intents is the strongest available lever; it also introduces a second entry surface into the v4 «one place, on time» model, so it needs a conscious yes |
| **D-3** | README language | (a) English (per `AGENTS.md`); (b) Russian primary + English summary; (c) fully bilingual | **DECIDED 2026-10-26: (b), applied.** `README.md` is now Russian-first with an English summary; the exception is recorded in `AGENTS.md` so the next agent does not revert it |
| **D-4** | Language switcher scope | (a) UI strings only; (b) UI + navigation + widget data; (c) full content translation | **(a) now** — the chrome mechanism, ≈3 iterations. **(b)/(c) only after an English channel exists.** Full translation is ≈235–275 h / 22–28 iterations and doubles every future content iteration — see §7 |
| **D-5** | Discussions | enable / disable | **enable** (long-tail "как сделать X" threads are indexed), accept moderation cost |
| **D-6** | Releases | publish semantic releases / keep silent | **publish, starting at the next milestone.** Do not retro-publish |
| **D-7** | `datePublished` for JSON-LD | real first-publication date | owner must supply it; **do not guess** — a wrong date is worse than none |
| **D-8** | Search-engine accounts | Yandex Webmaster (priority), Google Search Console, Bing | owner registers; agent prepares the verification file/`meta` |

## 10. Measurement

Before P0, record a baseline so the result is provable, not felt:

| Metric | Where | Now |
|---|---|---|
| Pages in search (Yandex) | Yandex Webmaster → Индексирование | expect 0–1 |
| Pages in search (Google) | GSC → Pages | expect 0–1 |
| Indexable words in the HTML response | `curl` + strip tags | 249 |
| Impressions / queries | both consoles | none yet |
| Repo views / clones / referrers | Insights → Traffic | check before promoting |
| Deep-link entries | Yandex Metrica or a tiny counter on `#` navigation | none |

Review at +2 weeks (indexing) and +6 weeks (impressions). If after 6 weeks the single URL captures queries for several unrelated chapters, that is the trigger for D-2.

## 11. What not to do

- No purchased links, no link exchanges, no PBN — for a `github.io` subdomain this is the fastest route to a manual penalty.
- No keyword stuffing in the README, no `meta keywords` (ignored by every engine that matters).
- No AI-generated Habr/Reddit posts — Habr rules forbid it outright and it burns the highest-value channel permanently.
- No doorway pages: 13 chapter pages must be real documents with their own content, not thin redirect shells.
- No `hreflang` until a second language actually exists — wrong `hreflang` is worse than none.
- No mass-created topics on other repos to farm visibility.

---

## Appendix — pre-existing worktree state

`_tmp_measure.py` (1.2 KB, repo root) is untracked and predates this work. Not touched, not staged. Whoever owns it should delete or commit it — it is not part of this plan.
