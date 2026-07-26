# Changelog

> Только последние итерации подробно. Старые — одной строкой. Полная история — в `git log`.

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
