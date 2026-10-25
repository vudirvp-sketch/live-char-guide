# Moving the site to `vudirvp-sketch.github.io` — **TRIED, THEN REVERTED (owner call)**

> **Outcome:** executed 2026-10-26 and reverted the same day. The rename works technically, but it costs
> something the technical case ignored: **the repository name becomes a username**, so github.com shows
> `vudirvp-sketch/vudirvp-sketch.github.io` and the project name disappears from the URL. Owner verdict:
> the project name matters more than the root `robots.txt`. Repository is back to `live-char-guide`,
> the site is back to `https://vudirvp-sketch.github.io/live-char-guide/`, all URLs were rewritten twice.
>
> **What was actually gained, and whether it matters:** the only hard gain of a host-root site is that
> crawlers read `robots.txt` (they never read a subdirectory copy). That file exists to advertise the
> sitemap — and the sitemap can be submitted by hand in Yandex Webmaster and Google Search Console, which
> you have to do once anyway. So the practical loss is close to zero. See "Option 3" below for the way to
> get both, if it ever matters.
>
> Kept as the record of the tradeoff, not as instructions.

Owner decision (2026-10-26): no custom domain, everything stays on GitHub.

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
url: 'https://vudirvp-sketch.github.io/live-char-guide/',
```

Everything else derives from it: canonical, `og:url`, `og:image`, JSON-LD `@id`s, sitemap `<loc>`, and `qa:seo` fails loudly if any of it disagrees. That indirection was the point of the config file.

## Two ways to do it

### Option 1 — rename the repository (recommended)

GitHub lets a repository be renamed, and keeps redirects from the old name. Renaming `live-char-guide` → `vudirvp-sketch.github.io` turns the project site into the user site: Pages then serves the same `dist/` at the host root.

```bash
# 1. change the origin (after renaming in Settings → General → Repository name)
git remote set-url origin https://github.com/vudirvp-sketch/live-char-guide.git

# 2. point the site at its new home
#    edit scripts/site-config.mjs → url: 'https://vudirvp-sketch.github.io/live-char-guide/'

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

### Option 3 — a tiny host-root helper repo (the way to get both)

Create a separate repo named exactly `vudirvp-sketch.github.io`, containing nothing but `robots.txt` (and a
one-line `index.html` that redirects to `/live-char-guide/`). The guide keeps its project name and its URL,
while the **host** root serves a real `robots.txt` — and `robots.txt` is host-wide, so it covers the project
site too:

```
User-agent: *
Allow: /live-char-guide/
Disallow: /
Sitemap: https://vudirvp-sketch.github.io/live-char-guide/sitemap.xml
```

Cost: one extra two-file repository on the profile. This is the only variant that gives the `robots.txt`
without paying the naming price, and it is worth doing only if hand-submitting the sitemap once is not enough.

## Outcome (2026-10-26)

Option 1 was executed and reverted the same day — the naming cost outweighed the root-`robots.txt` gain.
Current state: project site at `https://vudirvp-sketch.github.io/live-char-guide/`, repository named
`live-char-guide`. Option 3 remains available and unbuilt; it needs no rename and no URL change.
