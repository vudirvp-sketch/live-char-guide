# Iter 10 — Merge Instructions

## How to merge with local repository

These files are the iter 10 deliverable for `https://github.com/vudirvp-sketch/live-char-guide`.

To merge with your local clone of the repository, copy the files preserving the folder structure:

```bash
# From the repository root (where you cloned live-char-guide):
cp -f STATUS.md /path/to/live-char-guide/STATUS.md
cp -f worklog.md /path/to/live-char-guide/worklog.md
cp -f AGENT_NAVIGATION.md /path/to/live-char-guide/AGENT_NAVIGATION.md
cp -f CHANGELOG.md /path/to/live-char-guide/CHANGELOG.md
cp -f PLAN.md /path/to/live-char-guide/PLAN.md
cp -f docs/CONTENT_RESTRUCTURE_PLAN.md /path/to/live-char-guide/docs/CONTENT_RESTRUCTURE_PLAN.md
cp -f docs/canon/_README.md /path/to/live-char-guide/docs/canon/_README.md
cp -f docs/canon/part_07a.md /path/to/live-char-guide/docs/canon/part_07a.md
```

Or simply unzip this archive over the repository root (it will overwrite the 7 modified files and add the 1 new file `docs/canon/part_07a.md`).

## Files changed (8 total — 1 new, 7 modified)

| File | Action | Description |
|------|--------|-------------|
| `docs/canon/part_07a.md` | NEW | Canon Part 7A — 802 lines, 13 H2 sections, 4 VS-markers (E08/E16/E17/E02), Migration Notes table for iter 11 |
| `STATUS.md` | MODIFIED | iter 10 status, KI#17 NEW (documentation drift) |
| `worklog.md` | MODIFIED | iter 9 → one-liner, iter 10 = full record |
| `AGENT_NAVIGATION.md` | MODIFIED | Header iter 9 → iter 10. §6 pitfall #35 (KI#17). §8 iter 10 record + iter 11+ roadmap. §10 hint for iter 11. |
| `CHANGELOG.md` | MODIFIED | [9.1.10] entry — Canon Part 7A created |
| `PLAN.md` | MODIFIED | §5 iter 10 → ✅ DONE, iter 11+ roadmap |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | MODIFIED | §5.2 iter 10 row → ✅ DONE. §8 iter 10 stop point + iter 11 priorities. |
| `docs/canon/_README.md` | MODIFIED | §5 Part 7A row → ✅ iter 10 (Canon created). §9 iter 10 entry. |

## What was NOT touched (intentionally)

- `src/master/part_07a.html` — iter 11 task (master HTML migration against Canon §7A)
- `src/master/*.html` (all other Parts) — iter 12+ task
- `src/shell/*` — no changes
- `src/assets/*` — no changes
- `visual-system/*` — no changes
- `widgets/*`, `parts/*`, `assets/*`, `index.html`, `event-bus.js`, `data/*`, `build.hash` — root fallbacks, regenerated on next `pnpm run build`, not modified directly
- `tests/*` — no changes
- `scripts/*` — no changes

## Validation

- `pnpm run validate:master` ✅ PASSED (all 12 checks, 0 errors, KI#13 baseline warnings: 123 inline `style=` + 22 "content outside section")
- Master HTML untouched → validation identical to iter 9 baseline

## Stopping point

**Iter 10 COMPLETE.** Canon Part 7A created. Master HTML untouched. KI#13 + KI#14 + KI#16 + KI#17 — ACTIVE.

**Iter 11 priorities (Migrate Part 7A master HTML):**
1. Migrate `src/master/part_07a.html` against Canon §7A — recommended split into:
   - iter 11a — §7A.1–§7A.7 (~660 lines, 3 VS-EMBED: E08+E16+E17)
   - iter 11b — §7A.8–§7A.13 (~510 lines, 1 VS-EMBED: E02)
2. Apply 4 "Compress" candidates from Canon Migration Notes table (#22 sampling table, #26 model checklist, #42 plain-copy, #46 CORE DIRECTIVES example in Elena walkthrough)
3. `pnpm run validate:master` + `build` + `validate` + `test:unit` + `lint` + visual diff PASS
4. Update Canon front-matter `Migration status: ✅ MIGRATED (iter 11)` + Migration Notes table (TODO → DONE/DEVIATED)

