# Search-engine verification files

Anything dropped into this directory is copied to the **site root** (`dist/<name>`) by the build, so the
verification files that search engines insist on serving from the root actually resolve:

| Service | File it asks for | Ends up at |
|---|---|---|
| Yandex Webmaster | `yandex_<hash>.html` | `https://vudirvp-sketch.github.io/live-char-guide/yandex_<hash>.html` |
| Google Search Console (URL-prefix property) | `google<hash>.html` | `…/live-char-guide/google<hash>.html` |
| Bing Webmaster | same as Google (import) | — |
| IndexNow | `<key>.txt` (the key itself) | `…/live-char-guide/<key>.txt` |

Rules:

- Flat files only, exact names as issued — do not rename them. A renamed verification file simply fails.
- Keep them committed: Yandex and Google re-check periodically and revoke a property when the file disappears.
- Never put secrets here. This directory is published verbatim.
- `robots.txt` and `sitemap.xml` deliberately do NOT live here: they are generated at the repo root and copied
  by the shell build (`scripts/generate-sitemap.mjs`).
