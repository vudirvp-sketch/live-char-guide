# Changelog

> Только последние итерации подробно. Старые — одной строкой. Полная история — в `git log`.

## [9.2.6] - 2026-07-27

### iter 95 — E2/KI#58 Dead weight cleanup + Anchors parts/ sync

- **E2 — Dead weight cleanup:** 5 unused characters removed from `docs/character_bible.md` (Geralt §2, Joker §4, Jesse Pinkman §5, Edward Elric §6, Elliot Alderson §9) — all had 0 mentions in any guide Part. Список персонажей reduced from 11 → 6 entries. Tyler Durden status updated from ✅ Active → 🟡 Marginal (1 passing mention in Part 5). "Character Replacement Migration Notes" section removed (referenced obsolete characters). Bible version bumped to 9.2.6.
- **E2 — Lorebook Entry 2 clarified:** «Пожар Елены» Lorebook entry explicitly marked ⚠️ NON-CANONICAL secondary GHOST in `docs/elena_character_bible.md`, `docs/canon/part_07b.md`, `src/master/part_07b.html`, `parts/part_07b.html`. Canonical Елена = 1 GHOST (предательство). «Пожар» only for secondary GHOST scenario.
- **KI#58 — Omnis-Zeta Anchors parts/ sync:** `parts/part_10.html` Omnis-Zeta `[ANCHORS]` plain text + abstract Prices (теряет situational awareness, нарушает субординацию, отчуждает) → replaced with `<anchors>` XML + bodily/mechanical Prices (сервоприводы блокируются, манипуляторы выдвигаются, аудиовывод транслирует ноосферный белый шум, оптика мерцает жёлтым) from `src/master/part_10.html`. Annotation bullet updated to mention `<anchors>` XML + bodily/mechanical Prices.
- **KI#58 — Vyshcherblenny Anchors parts/ sync:** `parts/part_10.html` Vyshcherblenny `[ANCHORS]` plain text → replaced with `<anchors>` XML + hyphen list format from `src/master/part_10.html`. Annotation bullet updated to add `<anchors>` XML label.
- **Closed:** E2, KI#58. **All Known Issues now closed.**

### iter 94 — E1/KI#60/KI#61/KI#62 Voice leak + Walter sync + audit fix

- **E1/KI#60 — Elena Voice leak fixed:** «саркастичная» removed from `<identity>` across all 3 layers (src/master/part_10.html, parts/part_10.html, docs/canon/part_10.md). Voice descriptors shown only through Examples (§3.1 Voice Isolation). §9.11 Quick Check Voice row updated from ✗ FAIL → ✓ PASS. Conclusion: «Елена проходит Quick Check». §7A.1 walkthrough text updated. Token Bloat ✅ example updated. 9 file changes total.
- **KI#61 — Walter parts/ sync:** `parts/part_10.html` Walter section synced with `src/master/part_10.html` — Tone Frame expanded to full text, OOC PROTECTION added, Format Lock added, `<identity>` wrapper added (prose before `<spine>`), LIE appended explanation removed, OCEAN format fixed to compact (`O:65 C:85 E:30 A:25 N:60`), Anchors updated to `<anchors>` XML, Annotation bullets synced.
- **KI#62 — Audit script P2-18 fix:** `scripts/audit_canon_master_sync.py` P2-18-item-anchors-flaw check updated — expected substring changed from old separate-item format (`ANCHORS — FLAW-linked:...`) to current merged format (`ANCHORS — Базовые + FLAW-linked в <anchors> XML:...`). Audit: 96/96 PASS.
- **Closed:** E1, KI#60, KI#61, KI#62.

## [9.2.5] - 2026-07-26

### iter 93 — D1/D2/D3/D4 Guide self-contradictions resolved

- **D1 — §9.11 Elena Voice check false claim fixed:** Quick Check example row «Voice только в Examples» changed from ✓ PASS to ✗ FAIL — «саркастичная» в `<identity>` = voice leak. Conclusion updated: «Елена НЕ проходит Quick Check — voice leak (KI#60, fix planned iter 94)». Other 4 checks remain ✓. Updated в src/master/part_09.html + docs/canon/part_09.md.
- **D2 — OCEAN format unified to compact:** All pipe (`O: 72 | C: 65`) and comma (`O:72, C:65`) formats replaced with canonical compact format (`O:72 C:65`) per §5.1 RULE. 12 locations across 4 files:
  - src/master/part_10.html: Elena (line 169), Walter (line 285), Omnis (line 412), Vyshcherblenny (line 590) — pipes → compact.
  - src/master/part_07a.html: Vyshcherblenny walkthrough (line 749) — pipes → compact; Elena profile (line 1164) — comma → compact.
  - docs/canon/part_10.md: 4 card OCEAN values — pipes → compact.
  - docs/canon/part_07a.md: Vyshcherblenny walkthrough (line 442) — pipes → compact; Elena profile (line 725) — comma → compact.
  - Bible formats (per-dimension with explanations) unchanged — not `<ocean>` tag format.
- **D3 — Anchors format convention documented:** Added Примечание to §7A.1 Anchors RULE: `<anchors>` XML is canonical format in src/master/; `[ANCHORS]` plain text in parts/ = known KI#58 drift, not authoring format. All Anchors edits → src/master/ in `<anchors>` XML. Updated в src/master/part_07a.html + docs/canon/part_07a.md.
- **D4 — CORE_DIRECTIVES shorthand convention resolved (DECISION):** Shorthand `{{CORE_DIRECTIVES — канонический шаблон → Part 7A}}` accepted as convention per «одно определение — одно место» principle. Shorthand = navigational reference, not standalone content. Added Convention paragraph in §7A.2 language RULE callout. Updated в src/master/part_07a.html + docs/canon/part_07a.md.
- **Closed:** D1, D2, D3, D4 (all Phase D self-contradictions resolved).
- **Invariants added:** OCEAN format (compact), Anchors format (XML canonical), CORE_DIRECTIVES convention (shorthand accepted).

### iter 92 — W6/W8/O3/O4

- Walter GHOST Anchor-trigger + OCEAN cautious zones → SPINE; Omnis OCEAN cautious zones + NEED/WANT tension. See iter 92 changelog for details.

---

## [9.2.4] - 2026-07-26

### iter 89 — B4 + V3 — Vyshcherblenny Examples expand + Anchor Prices bodily

- **B4 — Vyshcherblenny Examples expanded:** Все 4 `<START>` блока расширены с ~25–35 tok → ~85–110 tok (P3-R7 compliance, 80–120 tok per block). Каждый блок теперь включает: SPATIAL & ANATOMICAL LOCK (Ошметок Веля, края стены, трещины, мерцание + пальцы/запястье/горло/лицо/челюсть), EMBODIMENT FIRST (тремор, онемение, тошнота, хрип), SPINE CAUSALITY visible per example.
  - Ex1 (Neutral): GHOST residue через «Привычка. Не моя» + холод левой стороны лица.
  - Ex2 (Stress/Вентора): LIE→FLAW cycle «вырезание → потеря фрагмента себя» + ноющая левая рука.
  - Ex3 (Зеркало): GHOST+FLAW через Зеркало + тошнота + желудок.
  - Ex4 (имя): GHOST+LIE crack «Не моё. Уже не моё.» + онемение лица до виска.
- **V3 — 3 Anchor Prices converted to bodily:**
  - Базовый 3 (был hearing voices only): добавлен «голос срывается на хрип, горло пересыхает, левая рука непроизвольно вычерчивает паттерн вырезания».
  - FLAW-linked 1 (был memory loss only): добавлен «левая рука ноет остаток дня, пальцы теряют чувствительность».
  - FLAW-linked 3 (был temporal «несколько дней не может спать»): добавлен «желудок сжимается, рука непроизвольно тянется к виску».
- **Token Budget updated:** ~1250+ → ~1500+.
- **Annotation lines updated:** SPINE CAUSALITY mention per example + bodily Price list.
- **Локации правок:** docs/canon/part_10.md, src/master/part_10.html, parts/part_10.html (V3 fix applied в `[ANCHORS]` plain text — known drift KI#58).
- **Closed:** V3, V5, U3 (ALL 4 cards Examples 80-120 tok DONE), B4.

---

### iter 88 — B3 — Omnis-Zeta Examples expand

- 5 `<START>` блоков расширены с ~25–35 tok → ~90–110 tok + embodiment + SPINE causality. Token Budget ~1800→~2150.
- **Closed:** O-Examples.

### iter 87 — B2 — Walter Examples expand

- 3 `<START>` блока расширены до ~95–105 tok + embodiment + SPINE causality.
- **Closed:** W-Examples.

### iter 86 — B1 — Elena Examples expand

- 3 `<START>` блока расширены до ~85–95 tok + embodiment.
- **Closed:** E5, E6.

### iter 85 — A7/A8/KI#57 — All cards `<anchors>` XML + Tone Frames expand

- All cards: `<anchors>` XML wrapper (P7A-R16). Tone Frames Omnis/Vyshcher expanded to ~25 tok. Omnis-Zeta GHOST-linked Anchors → bodily/mechanical.
- **Closed:** U4, KI#57, V2.

### iter 84 — A6 — Vyshcherblenny GHOST: concrete event, cycle → `<ghost_layers>`

- Vyshcherblenny GHOST в `<spine>` сокращён с 5 предложений + cycle до 3 предложений concrete event. Cycle → `<ghost_layers>` Tier 2/3.
- **Closed:** V1.

### iter 83 — A5 — Omnis-Zeta 5/7 Anchor Prices bodily/mechanical

- 5 из 7 Anchor Prices (3 Базовых + 2 FLAW-linked) → bodily/mechanical. 2 GHOST-linked deferred iter 85.
- **Closed:** O1 (частично).

### iter 82 — A2–A4 — Walter SP + Description `<identity>` + LIE fix

- Walter SP Tone Frame + OOC Protection + Format Lock. Description `<identity>` wrapper. LIE «ради семьи» crack через GHOST Gray Matter leak.
- **Closed:** W1–W5.

### iter 81 — A1 — Elena SP Tone Frame + OOC Protection

- Elena SP Tone Frame ~25 tok + OOC Protection (irritation/ignore) + Format Lock.
- **Closed:** E2, E3, E4.

### iter 80 — Разведочный аудит примеров (research-only)

- Audit: 4 universal violations, 26 card-specific, 20 Bible-vs-card discrepancies, 4 self-contradictions. No code changes.

---

## Старые итерации (iter 1–79)

Полная история — `git log` и `docs/research/`. Ключевые вехи:
- **iter 79:** Voice Isolation уточнение (лингвистический vs физический).
- **iter 78:** Anchors placement (`<anchors>` XML inside Examples-зона, P7A-R16).
- **iter 77:** OCEAN-in-Description (extreme vs cautious zone labeling).
- **iter 76:** CoT Tier 0 уточнение.
- **iter 75:** P1 Fixes (KI#54, KI#55, KI#51, KI#52).
- **iter 70–74:** Recon & verification V1–V9, KI#46–49, scenario labels.
- **iter 1–69:** Docs restructure + canon scaffold + migration + VS elements + CSS scoping.
