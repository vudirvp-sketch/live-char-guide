# GitHub repo presence — applied & proposed

Status: **applied 2026-10-26** via `gh api` (reversible). Everything here is owner-editable from the repo's About panel.

## 1. Description (APPLIED)

> Инженерный гайд по карточкам персонажей для LLM: SPINE → якоря поведения → голос → системный промпт. Конвейер сборки карточки, а не сборник промптов: 10 частей, 62 раздела, 4 полные карточки-примера. SillyTavern-совместимо, 12B–32B+.

233 / 350 chars. Structure on purpose: (1) what it is, (2) what makes it different, (3) concrete size signal, (4) compatibility keywords that people actually type.

Why Russian: the guide is Russian (DEC-16), so the description should match the audience's query language. GitHub search matches the description text.

Revert:

```bash
gh api -X PATCH repos/vudirvp-sketch/live-char-guide -F description=""
```

## 2. Topics (APPLIED — 20/20)

```
ai-character-card  ai-roleplay  character-card  character-cards  character-design
github-pages  guide  llm  local-llm  persona
prompt-engineering  roleplay  rp  russian  sillytavern
static-site  storytelling  system-prompt  tutorial  worldbuilding
```

Selection logic:

| Group | Topics | Why |
|---|---|---|
| Product category | `character-card`, `character-cards`, `ai-character-card` | The literal thing being built; highest intent |
| Ecosystem | `sillytavern`, `roleplay`, `ai-roleplay`, `rp` | Where the audience lives; `sillytavern` is browsable |
| Craft | `prompt-engineering`, `system-prompt`, `persona`, `character-design`, `worldbuilding`, `storytelling` | What people search when they don't know the product category |
| Technical | `llm`, `local-llm`, `static-site`, `github-pages` | Model-side and dev-side discovery |
| Language/format | `russian`, `guide`, `tutorial` | Filters + format intent |

Rules respected: lowercase, hyphens, ≤50 chars each, ≤20 total.

Revert / replace:

```bash
gh api -X PUT repos/vudirvp-sketch/live-char-guide/topics \
  -H "Accept: application/vnd.github+json" \
  --input topics.json    # {"names":[...]}
```

Caveat, stated honestly: topics are a **discovery surface inside GitHub and for GitHub search**, not a Google ranking factor. Their cost is ~2 minutes; their ceiling is low. Real search traffic comes from §A in `../PROMOTION_PLAN.md` (indexable content).

## 3. Social preview — OWNER ACTION (web UI only)

GitHub has no API for the social preview image; it must be uploaded in **Settings → General → Social preview**.

- Candidate asset already in the repo: `src/assets/preview-card.png` — 1344×768, 47 KB.
- GitHub requires ≥1280×640, <1 MB. This one qualifies.
- Recommendation: keep it, but the image should contain the words «Live Character Guide» + «гайд по карточкам персонажей» rendered as text, because the preview is seen in Telegram/Twitter/Habr link unfurls where an unlabelled UI screenshot reads as noise.
- Also fix `og:image` on the site to an **absolute** URL — currently `assets/preview-card.png` (relative), which breaks unfurls on every social platform. See `../PROMOTION_PLAN.md` §A2.

## 4. Releases — proposed, not applied

The repo has **0 releases**; it ships through branch deploys and `deploy-YYYYMMDD-HHMMSS` tags created by the workflow (`.github/workflows/deploy-pages.yml`, last step "Create Deploy Tag").

Why releases are worth it:
- A release page is an indexable URL with a title and a date, on a domain (github.com) with enormous authority.
- Release tags are what awesome-lists and changelog aggregators scrape.
- `deploy-*` tags are noise for humans; semantic tags are not.

Proposal: publish one release per meaningful guide milestone (`v9.3.0 — «одно место, вовремя»`, etc.), notes in Russian + 1-line English, and link the live site. Do not retro-publish 9 releases — start at the next milestone so the list stays readable.

```bash
gh release create v9.3.0 --title "v9.3.0 — ..." --notes-file notes.md --target main
```

## 5. Repository settings — owner decisions

| Setting | Current | Recommendation | Why |
|---|---|---|---|
| Description | ✅ set now | keep | — |
| Topics | ✅ 20 set | keep | — |
| Homepage | set (`…github.io/live-char-guide/`) | keep | Already correct |
| Social preview | unset | **upload** | Unfurl quality on every share |
| Discussions | disabled | **enable** | Gives a place for "как сделать X?" — those threads get indexed and pull long-tail queries. Cost: moderation load on the owner |
| Wiki | enabled | disable | Empty wiki = thin duplicate surface; the guide is the docs |
| Issues | enabled | keep, add `question` label | Support funnel |
| Custom domain | none | **decide** — see plan §A5 | `*.github.io` is a shared-domain subdomain; a real domain is the single biggest long-term SEO asset, but costs money + DNS |

## 6. Badges (go into the new README)

| Badge | Source |
|---|---|
| Deploy status | `actions/workflows/deploy-pages.yml` — real signal that the site is alive |
| Version | shields.io `github/package-json/v/...` — auto-updates with `package.json` |
| License | shields.io `github/license/...` |
| Last commit | shields.io `github/last-commit/...` — shows the guide is maintained |
| Language | static shields badge «гайд: русский» |

Do **not** add: stars/downloads/custom vanity badges. They add noise and, at 2 stars, actively hurt.
