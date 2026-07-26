# Live Character Guide — Статус проекта

> **Версия:** 9.3.0 | **Дата:** 2026-07-27

---

## Текущее состояние

**iter 100 — Mermaid dynamic theme re-render on toggle.**

- `widgets/mermaid-init.js`: Added `window.reRenderMermaid(theme)` — re-initializes mermaid with appropriate theme config (`dark` for OLED, `default` for Light), restores original diagram source from `data-original` attribute, removes `data-processed`, and calls `mermaid.run()` to re-render all diagrams.
- Light theme config: `theme: 'default'` with light-appropriate `themeVariables` (light bg/text colors).
- Dark theme config: `theme: 'dark'` with existing OLED brand colors (unchanged).
- `assets/lazy-loader.js`: `applyTheme()` now calls `reRenderMermaid(theme)` after CSS class toggle. Safe no-op if function unavailable.
- `lazy-loader.js`: Before initial `mermaid.run()`, saves diagram source text to `data-original` attribute (enables future re-render without losing source).
- `assets/shell-styles.css`: Added `body.theme-light .mermaid` and `body.theme-light .concept-diagram` overrides (light border/background).
- Mirror files synced (assets/ ↔ src/shell/).

---

## Invariants

- **Version sync:** All sources = 9.3.0 (mermaid-init version bumped; rest pending).
- **Themes:** Default (OLED/dark, no class) + Light (`body.theme-light`). No explicit dark class.
- **Mermaid:** Dynamic theme switching — diagrams re-render on toggle between dark and light.
- **Canon → master sync:** 97/97 PASS
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE).
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).

---

## Roadmap

| Итерация | Задача | Статус |
|----------|--------|--------|
| **iter 100** | Mermaid dynamic theme re-render on toggle | ✅ COMPLETE |
| **iter 101+** | V8/V9 Decision items — после обсуждения с автором | deferred |
