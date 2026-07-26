# Live Character Guide — Статус проекта

> **Версия:** 9.2.6 | **Дата:** 2026-07-27

---

## Текущее состояние

**iter 98 — Theme system overhaul: Dark removed, OLED+Light only.**

- Dark theme removed. Only 2 themes remain: **OLED** (default, true black) и **Light**.
- Default для новых пользователей = OLED (тёмная тема, луна 🌙).
- OLED icon changed from ⬛ → 🌙 (moon).
- Light theme: VS raw tokens overridden (`--bg-deep`, `--bg-panel`, `--bg-raised`, `--text-primary`, `--text-secondary`, `--border-active`, all tint/glow tokens) → VS components now properly adapt.
- Light theme: Hardcoded pastel colors fixed (code, tags, OCEAN legend/tags/SVG fills, MBTI spine labels, enneagram labels, violet accent elements, shadows).
- OLED theme: VS raw tokens overridden to true black (`--bg-deep: #000000`, `--bg-panel: #060709`, `--bg-raised: #0c0e12`).
- Panel shadow overridden for light theme (lighter: `0 4px 16px rgba(0,0,0,0.10)`).
- JS cycling: `oled → light` (2-step). `data-theme="oled"` set on button by default.
- Noscript fallback: `color:#e2e8f0` → `var(--text,#E8E8E8)`.

**No Known Issues open.**

---

## Invariants

- **Version sync:** All 4 sources = 9.2.6.
- **Themes:** OLED (default) + Light only. Dark theme removed.
- **Canon → master sync:** 97/97 PASS
- **Voice Isolation:** Linguistic voice = Examples/Greeting only. Physical = Embodiment/Description.
- **OCEAN format:** compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE). No pipes, no commas.
- **Anchors format:** `<anchors>` XML canonical (src/master/ + parts/).
- **CORE_DIRECTIVES convention:** Shorthand `{{CORE_DIRECTIVES — ...}}` accepted (D4).

---

## Roadmap

| Итерация | Задача | Статус |
|----------|--------|--------|
| **deferred** | V8/V9 Decision items — после обсуждения с автором | — |

Все технические баги закрыты. Дальнейшие итерации — по мере новых баг-репортов или решений автора по V8/V9.
