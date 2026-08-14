# Worklog

> Only the latest iteration in detail. Older iterations = one-line summaries.
> Full history is in `git`.

---

Task ID: iter-110-multilingual-forks-abc
Agent: main
Task: Resolve 4 multilingual forks (A: soften SP-English rule, B: formalize name-language rule, C: add Script Tax + Vocabulary Size, D: defer JS infrastructure). User: "делай как наиболее эффективно и качественно, без костылей и мусора".

Work Log:
- 1: Fork A — §7A.2 RULE rewritten from universal "директивы на английском" to 3-tier model-dependent rule: 12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language preferred. Threshold: ≥128K vocab + native card-language support → card language for entire SP. Mirrored to: §7A.7 model checklist (SP Language cell + footnote ¹), §9.10 12B guidance, §9.11 Quick Check item #8 (renamed "Директивы на английском" → "Язык SP"), glossary CORE DIRECTIVES entry, AGENT_NAVIGATION §5 + §6 pitfall #4.
- 2: Fork B — §7A.1 new RULE added: character name preserves canonical form (Cyrillic/Latin/CJK) across all card blocks. Transliteration forbidden — model processes name as token-anchor, not instruction. Latin variant allowed only if documented canonical (e.g., `Omnis-Zeta`). Mirrored to glossary Identity Block entry.
- 3: Fork C — Appendix B Model Table: 2 new rows added — `Vocabulary Size` (32K/128K/100K+ by class) + `Script Tax (non-Latin)` (high on 32K, low on ≥128K/API). §7A.12 Token Budget: new RULE — Script Tax for non-Latin scripts (~1.5–2× on 32K, ~1× on ≥128K); threshold ≥128K → negligible. NOT a separate "Multilingual scenarios" section — integrated into existing Model Table + Token Budget to avoid scope creep.
- 4: Fork D — DEFERRED. iter-113 (voice hierarchy + sampling + persona widget) touches JS infrastructure (lazy-loader, widgets/, possibly new widget data schema). Risk > reward vs text-based forks. Documented in STATUS roadmap + AGENT_NAVIGATION roadmap as deferred.
- 5: Build + validate + tests: `pnpm run build` SUCCESS (hash 8499b4e3 unchanged — no shell/widget changes). `validate:master` 12/12 PASS. `version:check` 9.2.6 sync. `pnpm test` 64/64 PASS. Canon sync 97/97 PASS. `qa:csp` / `qa:bundle` / `qa:contrast` / `qa:doc-versions` PASS.
- 6: English leak baseline 19 → 19 (no regression) — verified via `git stash` + re-run. qa:syntax 247 patterns in 11 files — pre-existing baseline (verified).

Stage Summary:
- **iter 110 COMPLETE — Multilingual forks A+B+C. Fork D deferred.**
- **9 source files edited:** 4 canon MD + 4 master HTML + 1 AGENT_NAVIGATION. Plus 6 auto-regenerated root fallbacks via `pnpm run build` (4 parts/*.html + index.html + build.hash). Plus 3 doc files (STATUS, worklog, CHANGELOG).
- **Scope:** Over 3–5 file soft limit (9 source files), justified by coherent multilingual-forks-abc pass in one iteration. All edits text-only — no structural changes, no section ID changes, no widget/CSS/JS changes.
- **User constraints honored:** (1) No crutches — all 3 forks implemented as principled rules (layered model-dependent SP language, canonical name preservation, integrated Script Tax concept). (2) No garbage — no separate "Multilingual scenarios" section (would create redundancy with Model Table + Token Budget). (3) Fork D deferred explicitly — avoids JS infrastructure risk in this iteration.
- **Next iteration (Fork D, if requested)** = iter-113 — voice hierarchy + sampling + persona widget (JS infrastructure). Requires bandwidth for thorough widget testing.

---

Task ID: iter-108-multilingual-actualization-safe-pass (one-line summary)
- iter 108 — Removed ~15-20% empirical claims (9 places), replaced native-language wording, updated 12B model examples (Gemma 3 12B/Mistral Nemo 12B/Qwen 2.5 14B), refined methodology disclaimer with model generations + KI#65 CLOSED (canon→master directive drift #4/#5 → #6/#7). 13 source + 8 auto-regenerated. Canon sync 97/97. Build hash 8499b4e3 unchanged. 0 new English leaks.
