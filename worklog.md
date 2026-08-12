# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in git.

---

Task ID: iter-105-category-c-translation
Agent: main
Task: Execute Category C borderline translation pass from iter-103 audit plan. User approved with "пограничные случаи одобряю, переводи!". Translated the clearest borderline cases: Quick Check/Full Check labels + Grade A/B/C tier labels. Kept compound proper nouns (Quality Grade, System Prompt/SP) and format-notation terms (Trigger → Action → Price) in English per glossary convention.

Work Log:
- 1: Committed iter-104 first (clean iteration boundary). Re-read iter-103 audit §4.3 Category C + §9 open questions. Established per-question translation policy: Q1 (Trigger/Action/Price) → keep English (all occurrences are format-notation); Q2 (Embodiment quad) → keep English 4-tuple + add glosses; Q3 (SP) → keep Latin (glossary backs `SP (системный промпт)`); Q4 (AP-N) → keep (matches section IDs); Q5 (Quick/Full Check) → translate; Q6 (cautious zone) → keep as jargon + gloss; Q9 (Grade A/B/C prose) → translate to `класс A/B/C`, keep `Quality Grade` compound; Q10 → leave baseline.
- 2: Surveyed occurrences. `Quick Check`/`Full Check` only in `part_09.html` (12 instances). `Grade A/B/C` (non-compound) only in `part_03.html` (8 instances). No cross-file consistency risk — clean 4-file scope (2 master + 2 canon).
- 3: `src/master/part_03.html` — 6 edits via MultiEdit: `Quality Grade A / B / C` → `Quality Grade (класс A / B / C)` (separated compound from tiers); tier labels in list `Grade A/B/C (✓/⚠/✗)` → `класс A/B/C (✓/⚠/✗)`; table headers; diff-view labels `Grade C (плохо)` / `Grade A (хорошо)` → `класс C` / `класс A`; `<pre>` block tier refs.
- 4: `src/master/part_09.html` — 11 edits via MultiEdit: all `Quick Check` → `Быстрая проверка` (nominative) / `Быструю проверку` (accusative) per Russian grammar; all `Full Check` → `Полная проверка` / `Полная проверка`; HTML comment canonical tag; `<h4>` / `<h5>` headings; `<summary>` labels; prose references with correct case (Елена проходит Быструю проверку; см. Быструю проверку выше; отлична от универсальной Быстрой проверки).
- 5: Canon sync — same translations applied to `docs/canon/part_03.md` (4 edits) + `docs/canon/part_09.md` (10 edits). Canon is source of truth.
- 6: `scripts/audit_canon_master_sync.py` — 6 check substrings updated: P0-12 (part_09 Vysh heading), P2-12a (Quality Grade disambiguation), P2-12b (table headers), P2-12d (diff-label Grade C), P2-12e (diff-label Grade A). Descriptions amended with iter-105 notes. 97/97 PASS maintained.
- 7: Build + validate + tests: `pnpm run build` SUCCESS (hash 8499b4e3). `validate` 5/5 + SHELL-* PASS. `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. CSP/bundle/doc-versions/VS-embeds all PASS.
- 8: English leak count: 18 → 17 (-1). The removed leak was `Quality Grade A` at part_03 (now `Quality Grade (класс A / B / C)` — separated compound from tier, no longer 3+ English words). Remaining 17 are by-design (Part 10 Elena example card content + Part 06 stair-step format).

Stage Summary:
- **iter 105 COMPLETE — Category C borderline translation pass (Quick/Full Check + Grade A/B/C tier labels).**
- **5 files edited:** 2 `src/master/*.html` (part_03, part_09) + 2 `docs/canon/*.md` (part_03, part_09) + 1 `scripts/audit_canon_master_sync.py` (6 check substrings updated). Plus 3 auto-regenerated root fallbacks (`parts/part_03.html`, `parts/part_09.html`, `parts/manifest.json`, `index.html`) via `pnpm run build`.
- **Scope:** Within 3–5 file soft limit (5 source files). ~21 individual edits across 4 content files + 6 audit-script check updates.
- **English leak baseline:** 18 → 17. Cumulative iter-104+105: 21 → 17 (-4).
- **Translation policy decisions (documented for future iterations):**
  - Q1 `Trigger → Action → Price` → KEEP English (all occurrences are format-notation, not pedagogical prose).
  - Q2 `Embodiment Protocol` quad → KEEP English 4-tuple (matches protocol notation).
  - Q3 `SP` → KEEP Latin (glossary establishes `SP (системный промпт)`; `СП` would break convention).
  - Q4 `AP-N` → KEEP (matches section IDs, no drift risk).
  - Q5 `Quick Check` / `Full Check` → TRANSLATED to `Быстрая проверка` / `Полная проверка`.
  - Q6 `cautious zone` → KEEP as OCEAN jargon (already explained in prose).
  - Q9 `Grade A/B/C` tier labels → TRANSLATED to `класс A/B/C`; `Quality Grade` compound → KEEP as proper noun.
  - Q10 baseline leaks → LEAVE (by-design: Part 10 example card + Part 06 stair-step).
- **KI#65 DELETED from STATUS.md** (closed iter-102, now 2 iterations old — mandatory deletion per AGENTS.md §3 KI lifecycle rule).
- **KI#64 still OPEN** (version drift on mermaid-init.js — untouched this iteration).
- **Next iteration (iter 106)** = polish pass — re-run `survey_english_terms.py` to confirm TRANSLATABLE count dropped; update `KEEP_ENGLISH_TERMS` whitelist if needed; final canon drift check.

---

## Previous Iterations (brief)

- iter 104: Category B translation pass — 4 clear English heading leaks translated (Model Capability Table, Grade A vs C, Tier 3 CoT API only, Token Budget Check) + canon sync + audit script P2-12c update. English leaks: 21 → 18. COMPLETE.
- iter 103: English terms audit + categorization (doc-only). 3 238 token instances surveyed. 4 categories: A (KEEP ENGLISH ~1 440), B (TRANSLATE ~470), C (BORDERLINE ~640), D (HTML ARTIFACTS ~120). 3-iteration translation plan proposed. COMPLETE.
- iter 102: VS-EMBED placement audit + reorder. 6 misplaced visual elements moved inside their sections after intro `<p>`. KI#65 CLOSED. COMPLETE.
- iter 101: Agent infrastructure English rewrite + actualization. New `AGENTS.md`, nav/status/worklog/plan rewritten in English. KI#64 documented. COMPLETE.
- iter 100: Mermaid dynamic theme re-render on toggle. COMPLETE.
- iter 99: Theme chain simplified — `body.theme-oled` removed. COMPLETE.
- iter 98: Dark theme removed, OLED + Light only. COMPLETE.
- iter 97: Annotation callout blocks removed (4 cards). 97/97 PASS. COMPLETE.
- iter 96: KI#63 version drift fix + build regeneration. COMPLETE.
