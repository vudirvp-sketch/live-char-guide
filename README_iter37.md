# iter 37 — Canon Audit P2 (KI#21 P2) ✅ CLOSED

> **Дата:** 2026-07-08
> **Build hash:** `69d9b813` (unchanged from iter 36)
> **Canon total:** 5 035 → 3 905 строк (−1 130 net deletion)
> **Validation:** ALL PASS — `validate:master` (12 checks) / `build` / `validate` (8 gates) / `test:unit` (43/43) / `test:integration` (21/21) / `lint` (0 errors, 12 warnings baseline) / `qa:csp` / `qa:bundle` (7.5KB) / `qa:doc-versions` / `audit_vs_embeds.py` (0 regressions) / `check_english.py` (0 leaks in `docs/canon/`)

## Содержимое архива (22 файла, структура сохранена)

- 14 canon-файлов в `docs/canon/`
- 4 root docs: `STATUS.md`, `worklog.md`, `AGENT_NAVIGATION.md`, `CHANGELOG.md`, `PLAN.md`
- 1 audit doc: `docs/AUDIT_VERIFICATION.md`
- 1 root fallback: `index.html` (только Generated: timestamp)

## Что сделано (iter 37 — 18 правок P2)

| # | Item | Файл | Описание |
|---|------|------|----------|
| P2-1 | C1 | `part_01.md` §1.4 | Inline defs Anchor/Voice/SPINE/OCEAN + bold Pattern Matcher |
| P2-2 | C2 | `_README.md` §3.9 (new) | Callout labels policy: English by design |
| P2-3 | C5 | All canon | Bridge cleanup: kept 2 (6→7A, 9→10), deleted 8 |
| P2-4 | E1 | All 13 files (кроме _README) | YAML front-matter conversion |
| P2-5 | E2 | All canon | Delete Migration Notes / Compression results / Validation gates / DGA Phase 2 |
| P2-6 | E3 | All canon | Delete Cross-references ending |
| P2-7 | E4 | All canon | Delete inline H3 resume + add Synthesis в 4 Parts |
| P2-8 | E5 | `part_01.md` §1.3 | Orphan §1.3 merged с §1.4 |
| P2-9 | E6 | `part_07a.md` | Pattern Matcher ссылки на Part 1 §1.4 |
| P2-10 | E7 | All canon | «Деликатно» cliché removed (with Migration Notes) |
| P2-11 | F1 | All canon | 22 «Canon planned iter X» stubs removed |
| P2-12 | B4 | `part_03.md` §3.4 | Tier 1/2/3 → Quality Grade A/B/C + disambiguation |
| P2-13 | F4 | `part_04.md` §4.2 | «Запрещённые слова» → «Запрещённые формулировки» |
| P2-14 | F5 | `part_05.md` §5.1 | Cautious zone definition + Elena example |
| P2-15 | F6 | `part_07a.md` L305 | `<br/>` → em-dash (HTML forbidden in Canon) |
| P2-16 | F7 | `part_07a.md` §7A.1 | Keirsey SP → «Sensing-Perceiving, см. Appendix A» |
| P2-17 | F9 | `part_09.md` §9.6 | 1-word symptoms for AP-references in Decision Tree |
| P2-18 | F10 | `part_10.md` §10.1 | Elena inline comments → Annotation callout |

## Invariants проверены

- ✅ VS scroll-animation: `python3 scripts/audit_vs_embeds.py` — 0 regressions
- ✅ CSS scoping (iter 34+): VS-EMBED selectors scoped к element-specific parent
- ✅ Принцип `viz > dry text` сохраняется
- ✅ Build hash `69d9b813` unchanged (canon-файлы не входят в hash computation)
- ✅ English leaks: 0 в `docs/canon/`

## Точка остановки

**iter 37 COMPLETE.** KI#21 P0+P1+P2 ✅ CLOSED (45/57 правок).

**iter 38+ roadmap (P3):**
- 12 правок + 3 новые секции, fix plan ready в `docs/AUDIT_VERIFICATION.md` §4.4.
- P3-1..P3-7: локальные правки (D3, D5, D6, D7, F2, F3, F8).
- P3-8..P3-12: новые секции G1 «Как читать», G2 TL;DR, G4 Character map, G5 Pre-build checklist.

## Слияние с локальной директорией

```bash
# Из корня локального репозитория live-char-guide:
unzip iter_37_p2_cleanup.zip -d /tmp/iter37_merge
cp -r /tmp/iter37_merge/. .
git status   # должно показать 22 modified files
```
