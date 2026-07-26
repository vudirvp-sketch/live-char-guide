# Live Character Guide — Статус проекта

> **Репозиторий:** https://github.com/vudirvp-sketch/live-char-guide
> **Онлайн:** https://vudirvp-sketch.github.io/live-char-guide/
> **Версия:** 9.2.6
> **Дата:** 2026-07-27

---

## Текущее состояние

**iter 96 — KI#63 fix + Build regeneration COMPLETE.**

- **KI#63 (closed):** Version drift fixed. `package.json` 9.2.5 → 9.2.6, `data/character_schema.json` 9.2.3 → 9.2.6, `parts/manifest.json` regenerated → 9.2.6. `pnpm run version:check` = sync. `src/VERSION` = 9.2.6 (canonical).
- **Build regeneration:** `pnpm run build` выполнен. Все root fallbacks (index.html, widgets/, assets/, event-bus.js, parts/, data/, build.hash) регенерированы из актуальных `src/master/` + `src/shell/` + `data/`. Изменения iter 81–95 (Voice Isolation rule, OCEAN compact format, Tone Frames, OOC Protection, Format Lock, `<anchors>` XML, dead weight cleanup, KI#58 Anchors parts/ sync) теперь пропагированы в root fallbacks → GitHub Pages деплой.
- **Validation:** 96/96 canon→master sync PASS. 64/64 tests PASS. All 12 master validation checks PASS. All 8 artifact validation gates PASS. Version sync: ✓ sync.

**Closed:** KI#63 (version drift).

### Card status

| Card | Status |
|------|--------|
| **Elena** | ✅ Voice leak fixed (iter 94) + propagated to root fallback (iter 96) |
| **Walter** | ✅ parts/ synced (iter 94) + propagated to root fallback (iter 96) |
| **Omnis-Zeta** | ✅ Anchors parts/ synced (iter 95) + propagated to root fallback (iter 96) |
| **Vyshcherblenny** | ✅ Anchors parts/ synced (iter 95) + propagated to root fallback (iter 96) |

---

## Decision items

- **V8:** GHOST «видел, как дом сгорел» — перцептивный фильтр. Borderline. Deferred.
- **V9:** OCEAN×Enneagram Matrix — disclaimer needed (авторская модель). Deferred.

---

## Invariants

- **Version sync:** All 4 sources (`src/VERSION`, `package.json`, `data/character_schema.json`, `parts/manifest.json`) = 9.2.6.
- **Canon → master sync:** 96/96 PASS
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description. «саркастичная» → Examples, not `<identity>`.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE). No pipes, no commas.
- **OCEAN labeling:** extreme = `<30` or `>70`; cautious = `30–40` / `60–70`.
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/). KI#58 closed — all 4 cards synced.
- **Anchor Price rule:** All Anchor Prices must be bodily/mechanical (P2-R1/P2-R3).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4, iter 93).
- **Lorebook Entry 2 (пожар Елены):** ⚠️ NON-CANONICAL secondary GHOST. Canonical Елена = 1 GHOST (предательство). «Пожар» only for secondary GHOST scenario.
- **Root fallbacks:** Regenerated ONLY через `pnpm run build`. Запрещено редактировать `parts/`, `widgets/`, `assets/`, `index.html`, `event-bus.js`, `build.hash` напрямую.

---

## Known Issues

None open. All previous KIs closed (incl. KI#63 — iter 96).

---

## iter 96+ Roadmap

| Итерация | Задача | Усилие |
|----------|--------|--------|
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

Все технические баги закрыты. Дальнейшие итерации — по мере новых баг-репортов или решений автора по V8/V9.
