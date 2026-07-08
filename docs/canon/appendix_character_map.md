---
canonical_for: —
vs_embedded: none
vs_cross_ref: part_01.md, part_02.md, part_03.md, part_04.md, part_05.md, part_06.md, part_07a.md, part_07b.md, part_08.md, part_10.md
sections: 1 (appendix_character_map)
last_synced: 2026-07-08 (iter 40 — KI#29 OCEAN labeling fix)
migration_status: ✅ NEW (iter 38) — концептуальный reference, не имеет master HTML артефакта. iter 40: column header + footnote (KI#29).
---

# Appendix D: Карта персонажей

`data-section: appendix_character_map`

5 канонических персонажей гайда. Каждый следующий добавляет новые инструменты. Используйте таблицу, чтобы выбрать персонажа под вашу задачу.

| Персонаж | Где используется | Сложность | GHOST | SPINE | Enneagram | OCEAN (extreme + cautious) | CoT | Lorebook |
|----------|------------------|-----------|-------|-------|-----------|-------------------|-----|----------|
| **Елена** (журналистка) | Part 1 (сквозной), Part 2 §2.1, Part 2 §2.3, Part 2 §2.4, Part 3 §3.3, Part 4 §4.2, Part 5 §5.1, Part 7A §7A.13 walkthrough, Part 7B §7B.2 Greeting, Part 7B §7B.3 Lorebook, Part 10 §10.1 | Базовая (1 GHOST, без Layers) | 1 primary: предательство редактора | Полная (5/5) | — | A=38, N=68, O=72 | Tier 0 (без CoT) | 1 запись (предательство) |
| **Уолтер Уайт** | Part 2 §2.2 (FLAW-linked Price пример), Part 4 §4.11 (single GHOST пример), Part 9 §9.7 (OCEAN-тест пример), Part 10 §10.2 | Базовая современная (1 GHOST, без фэнтези) | 1: Gray Matter (продал долю за $5000) | Полная (5/5) | — | C=85, A=25, E=30 | Tier 0 | — |
| **Омнис-Зета 7-Квин** (Тех-Жрец) | Part 5 §5.2 (OCEAN extreme), Part 8 §8.X (AP-15 OCEAN Overload), Part 10 §10.3 | Экспертная (3-tier GHOST Layers + CoT + Lorebook) | 3-tier: детство → 1-я аугментация → устаревание | Полная (5/5) | — | O=92, E=12, C=78 | Tier 1+ | 5 записей |
| **Выщербленный** (паразит памяти) | Part 2 §2.6 Sensory, Part 3 §3.6 Voice Leak, Part 3 §3.8 Multi-char, Part 4 §4.11 GHOST Layers, Part 5 (Enneagram), Part 6 §6.X CoT, Part 10 §10.4 | Экспертная (3-tier GHOST Layers + CoT + мульти-персонажность) | 3-tier: архивариус → 1-е вырезание → цикл вырезаний | Полная (5/5) | 5w4 | N=70, E=25 | Tier 1+ | 5 записей |
| **Йоуёма** | Part 3 §3.8 Multi-char (только) | Дополнительная (multi-char контекст) | — | — | — | — | — | — |

**Cross-ref:** Детальные карточки — `[ref: part_10.md §10.1–§10.4]`. Character bible — `docs/character_bible.md`. Sensory Anchors пример — `[ref: part_02.md §2.6]`. Multi-char пример — `[ref: part_03.md §3.8]`. GHOST Layers — `[ref: part_04.md §4.11]`.

**OCEAN labeling (iter 40 fix — KI#29):** Extreme = строго `<30` или `>70` per Part 5 §5.1 RULE. Cautious zone = `30–40` / `60–70`. В таблице указаны notable values (extreme + cautious zone boundaries), не только экстремумы. Детально:
- **Елена** (A=38, N=68, O=72): 1 extreme (O=72 > 70) + 2 cautious zone (A=38, N=68).
- **Уолтер** (C=85, A=25, E=30): 2 extreme (C=85 > 70, A=25 < 30) + 1 cautious zone boundary (E=30).
- **Омнис-Зета** (O=92, E=12, C=78): 3 extreme (все 3).
- **Выщербленный** (N=70, E=25 в moderate 4K-fallback): 1 extreme (E=25 < 30) + 1 cautious zone boundary (N=70). В bible (`docs/vyshcherblenny_character_bible.md`) — canonical 16K+ extreme values (O=85, C=25, A=15, N=92, E=60).

**RECOMMENDATION:** Выбирайте персонажа по сложности задачи:

- **Базовая карточка** (1 GHOST, без Layers, без CoT, без Lorebook) — Елена, Уолтер Уайт. ~440–890 токенов. Конфигурация для первой карточки.
- **Полная карточка со всеми инструментами** (GHOST Layers + CoT + Lorebook) — Омнис-Зета, Выщербленный. ~1500–1800 токенов. Только после освоения базового уровня.
- **Мульти-персонажная сцена** — Выщербленный + Йоуёма. Требует явных маркеров персонажа (минимум 3 на каждого) и проверки Voice Bleed.

**Правило:** Персонаж задаётся ровно один раз в одном canonical location (Part 10 §10.X — для полной карточки, §4.2 — для GHOST Елены, §4.11 — для GHOST Layers). В остальных местах — cross-ref `[ref: ...]`, не повтор.
