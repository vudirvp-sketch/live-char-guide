# Moving the site to `vudirvp-sketch.github.io` — ready-to-run, NOT executed

Owner decision (2026-10-26): no custom domain, everything stays on GitHub, the `<user>.github.io` root site is acceptable.

## Why bother at all

| Problem today (project site) | After the move (root site) |
|---|---|
| `robots.txt` sits at `/live-char-guide/robots.txt` — **crawlers never read it** (they only read the host root) | `robots.txt` is at `/robots.txt` — read by Google, Yandex, Bing |
| `sitemap.xml` is discovered only by manual submission | same file, now discoverable through `robots.txt` |
| Yandex host-level verification on a shared subdomain is awkward (the host `vudirvp-sketch.github.io` belongs to GitHub, not to the project) | the host is still GitHub's, but the site is the host root — verification by HTML file works cleanly |
| URL is longer: `…/live-char-guide/#p4_spine_overview` | short: `…/#p4_spine_overview` |

Honest ceiling: this is a **small** gain, not a ranking breakthrough. The content is already in the HTML (that was the real fix). Do the move when it is convenient, not urgently.

## What it costs after the work already done

**One line.** `scripts/site-config.mjs`:

```js
url: 'https://vudirvp-sketch.github.io/live-char-guide/',
   ↓
url: 'https://vudirvp-sketch.github.io/',
```

Everything else derives from it: canonical, `og:url`, `og:image`, JSON-LD `@id`s, sitemap `<loc>`, and `qa:seo` fails loudly if any of it disagrees. That indirection was the point of the config file.

## Two ways to do it

### Option 1 — rename the repository (recommended)

GitHub lets a repository be renamed, and keeps redirects from the old name. Renaming `live-char-guide` → `vudirvp-sketch.github.io` turns the project site into the user site: Pages then serves the same `dist/` at the host root.

```bash
# 1. change the origin (after renaming in Settings → General → Repository name)
git remote set-url origin https://github.com/vudirvp-sketch/vudirvp-sketch.github.io.git

# 2. point the site at its new home
#    edit scripts/site-config.mjs → url: 'https://vudirvp-sketch.github.io/'

# 3. rebuild and verify
pnpm run build && pnpm run qa:seo && pnpm test

# 4. update the URLs that live outside site-config
#    README.md (5 badge/link URLs), package.json homepage, CONTRIBUTING/AGENTS/STATUS mentions
#    .github/workflows/deploy-pages.yml — no change needed (still main → Pages)

git add scripts/site-config.mjs README.md package.json sitemap.xml index.html
git commit -m "seo: serve the guide from the host root (project site → user site)"
git push origin main
```

**Risks, stated plainly:**

- The repo name becomes a hostname, which is worse for the *repository's own* SEO (people search "live character guide", not "vudirvp-sketch.github.io"). The project name stays in the README, description and topics, so this is a minor cost.
- Old `…/live-char-guide/` links rely on GitHub's rename redirect. That redirect is reliable for the repository web UI; for **Pages** it is not guaranteed forever.
- Any external link already published to the project URL would need updating. Today there are effectively none — which is exactly why now is the cheapest moment this will ever be.

### Option 2 — a tiny host-root helper repo (no rename)

Create an empty `vudirvp-sketch.github.io` repo whose only job is `robots.txt` + a redirect page to `/live-char-guide/`. Keeps the existing URL and repo name.

Not recommended: it creates a second thing to maintain, and the host root then hosts a redirect page rather than the guide — worse for the user and no better for indexing than Option 1.

## Recommendation

Do **Option 1**, after the current changes are live and indexed for ~2–3 weeks. Measure first: if `#anchor` deep links and the current URL are already circulating (check Yandex Webmaster "Страницы в поиске" + Metrica referrers), prefer to stay and keep the URL stable. If nothing has been indexed or shared yet, move immediately — the cost only grows.
