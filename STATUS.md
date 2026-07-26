# Live Character Guide — Статус проекта

> **Версия:** 9.2.7 | **Дата:** 2026-07-27

---

## Текущее состояние

**iter 99 — Theme simplification: `body.theme-oled` removed, default = OLED via :root.**

- `body.theme-oled` CSS class removed entirely — redundant with `:root` defaults.
- `:root` values already define OLED true-black (`--bg: #000000`, `--bg-surface: #0a0a0a`, `--bg-elevated: #111111`).
- VS raw tokens in `:root` updated to OLED true-black (`--bg-deep: #000000`, `--bg-panel: #060709`, `--bg-raised: #0c0e12`, `--border-active: #1a1e28`).
- DESIGN-TOKENS.css `:root` synced to same OLED true-black values.
- `-oled` token variables (`--bg-oled`, `--bg-surface-oled`, etc.) removed — no longer needed.
- JS theme toggle simplified: only `theme-light` class toggled. Default = no class = OLED/dark.
- localStorage backward-compatible: 'oled' stored value works (no class applied = default).
- Theme button title updated: "Тема (Тёмная ↔ Светлая)".
- token-migration.css: `body.theme-oled` block removed, 3-theme comment → 2-theme (default/light).
- visual-parity.mjs tests updated for new architecture.
- Mirror files synced (assets/shell-styles.css, assets/lazy-loader.js).

**Known Issues:**

- **Mermaid diagrams**: statically initialized with `theme: 'dark'`. Does not dynamically re-render when switching to Light theme. Deferred to future iteration (requires `mermaid.run()` re-call on theme change).

---

## Invariants

- **Version sync:** All 4 sources = 9.2.6 (shell VERSION not bumped yet).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Canon → master sync:** 97/97 PASS
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE). No pipes, no commas.
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).

---

## Roadmap

| Итерация | Задача | Статус |
|----------|--------|--------|
| **iter 100** | Mermaid dynamic theme re-render on toggle | planned |
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |
