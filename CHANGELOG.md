# Changelog

> Только последние итерации подробно. Старые — одной строкой. Полная история — в `git log`.

## [9.2.6] - 2026-07-27

### iter 96 — KI#63 version drift fix + build regeneration

- **KI#63 — Version drift fixed:** `package.json` 9.2.5 → 9.2.6, `data/character_schema.json` 9.2.3 → 9.2.6 (synchronized with canonical `src/VERSION` = 9.2.6). `parts/manifest.json` regenerated → 9.2.6 by build. All 4 version sources (`src/VERSION`, `package.json`, `data/character_schema.json`, `parts/manifest.json`) now in sync at 9.2.6.
- **Build regeneration:** `pnpm run build` executed (build hash `4074bac5` — `src/shell/index.html` content stable, only version meta updated). All root fallbacks regenerated: `index.html`, `event-bus.js`, `build.hash`, `assets/`, `widgets/` (17 files), `parts/` (17 files), `data/` (7 files).
- **Propagation:** All iter 81–95 changes (Voice Isolation rule clarification, OCEAN compact format, Tone Frames + OOC Protection + Format Lock for 4 cards, `<anchors>` XML canonical format, dead weight cleanup, KI#58 Anchors parts/ sync) now reflected in root fallbacks → GitHub Pages deploy.
- **Validation:** 96/96 canon→master sync PASS, 64/64 tests PASS, 12/12 master validation PASS, 8/8 artifact gates PASS, version sync ✓.
- **Closed:** KI#63. **All Known Issues now closed.**

### iter 95 — E2/KI#58 Dead weight cleanup + Anchors parts/ sync

- **E2 — Dead weight cleanup:** 5 unused characters removed from `docs/character_bible.md` (Geralt, Joker, Jesse Pinkman, Edward Elric, Elliot Alderson — 0 mentions in any Part). Tyler Durden → 🟡 Marginal (1 mention in Part 5). Lorebook Entry 2 (пожар Елены) → ⚠️ NON-CANONICAL secondary GHOST.
- **KI#58 — Anchors parts/ sync:** Omnis-Zeta + Vyshcherblenny `[ANCHORS]` plain text in `parts/part_10.html` → `<anchors>` XML canonical + bodily/mechanical Prices from `src/master/part_10.html`. All 4 cards now use `<anchors>` XML in parts/.

### iter 94 — E1/KI#60/KI#61/KI#62 Voice leak + Walter sync + audit fix

- **E1/KI#60 — Elena Voice leak fixed:** «саркастичная» removed from `<identity>` across all 3 layers (master, parts, canon). §9.11 Quick Check Voice row: ✗ FAIL → ✓ PASS.
- **KI#61 — Walter parts/ sync:** Tone Frame expanded, OOC PROTECTION + Format Lock + `<identity>` wrapper + OCEAN compact format + `<anchors>` XML + Annotation bullets synced.
- **KI#62 — Audit script fix:** `audit_canon_master_sync.py` P2-18 check updated to current merged Anchors format. 96/96 PASS.

### iter 93 — D1–D4 Guide self-contradictions

- **D1:** §9.11 Elena Voice check false claim fixed (✗ FAIL instead of ✓ PASS).
- **D2:** OCEAN format unified to compact `O:72 C:65 E:41 A:38 N:68` (no pipes/commas) across 12 locations.
- **D3:** Anchors format convention documented — `<anchors>` XML canonical in src/master/, `[ANCHORS]` plain text in parts/ = KI#58 drift.
- **D4:** CORE_DIRECTIVES shorthand `{{CORE_DIRECTIVES — ...}}` accepted as convention.

---

## Старые итерации (iter 1–92)

Кратко. Полная история — `git log` и `docs/research/`.

- **iter 89–92:** C1–C4 Bible sync (Walter/Omnis/Vyshcherblenny/Elena) + Walter GHOST Anchor-trigger + OCEAN cautious zones + Vyshcherblenny Examples expand + V3 Anchor Prices bodily.
- **iter 86–88:** B1–B4 Examples enrichment — все 4 cards Examples expanded to 80–120 tok per `<START>` block.
- **iter 83–85:** A5–A8 — Omnis-Zeta 5/7 Anchor Prices bodily; Vyshcherblenny GHOST → concrete event; All cards `<anchors>` XML + Tone Frames expand.
- **iter 82:** A2–A4 — Walter SP Tone Frame + OOC + `<identity>` wrapper + LIE fix.
- **iter 81:** A1 — Elena SP Tone Frame + OOC Protection.
- **iter 80:** Разведочный аудит примеров (research-only): 4 universal violations, 26 card-specific, 20 Bible-vs-card discrepancies, 4 self-contradictions.
- **iter 1–79:** Docs restructure + canon scaffold + migration + VS elements + CSS scoping. Ключевые вехи: iter 79 (Voice Isolation уточнение), iter 78 (Anchors placement P7A-R16), iter 77 (OCEAN cautious zones), iter 76 (CoT Tier 0), iter 75 (P1 Fixes), iter 70–74 (Recon V1–V9).
