---
canonical_for: —
vs_embedded: none
vs_cross_ref: part_01.md, part_07a.md, part_07b.md, part_09.md, part_10.md, appendix_character_map.md
sections: 2 (p0_how_to_read, p0_tldr_quick_start)
last_synced: 2026-07-08 (iter 38 — NEW)
migration_status: ✅ NEW (iter 38) — концептуальная секция, не имеет master HTML артефакта
---

# Part 0: Перед стартом — Как читать этот гайд и TL;DR

> **Что это:** Входная секция для нового читателя. Объясняет структуру гайда и даёт минимальный quick-start. Не содержит master HTML — это концептуальный ориентир.
> **Создан:** iter 38 (2026-07-08) — закрытие KI#21 G1+G2.

---

## 0.1 Как читать этот гайд

`data-section: p0_how_to_read`

<!-- difficulty: BASIC -->

Гайд — единый линейный поток от Part 1 до Part 10. Каждый Part — отдельный модуль, который строит на предыдущем. Читать последовательно; значимые нарративные переходы между Parts обозначены меткой **Bridge** (только 2 в гайде: Part 6→7A «от психологии к сборке», Part 9→10 «от диагностики к примерам»).

**Что такое Part:** концептуальный модуль. Карта модулей:

| Part | Тема | Что даёт |
|------|------|----------|
| Part 1 | Foundations | Зачем системный подход, базовые блоки, 3 ключевых правила, pre-build checklist |
| Part 2 | Anchors | Поведенческие якоря: Trigger → Action → Price |
| Part 3 | Voice | Изоляция голоса, Examples, мульти-персонажность |
| Part 4 | SPINE | Психологический каркас: GHOST → LIE → FLAW → NEED → WANT |
| Part 5 | Psychology | OCEAN, Enneagram, MBTI — валидация SPINE |
| Part 6 | CoT | Chain of Thought для внутренних конфликтов в моменте |
| Part 7A | System Prompt | Сборка SP, CORE DIRECTIVES, XML-теги, Token Budget |
| Part 7B | Lorebook | База знаний с триггерами |
| Part 8 | Anti-patterns | 15 типовых ошибок и их фиксы |
| Part 9 | Diagnostics | Дерево решений, тестовые сценарии, пред-деплой валидация |
| Part 10 | Examples | 4 готовые карточки разной сложности |

**Что такое VS-EMBED:** визуализация, замещающая длинное текстовое описание. В canon-файлах помечена маркером `[VS: E0X — описание. Что замещает.]`. В master HTML рендерится как `<div class="vs-embed" data-vs-element="E0X">`. 18 VS-элементов (E01–E18) в `visual-system/elements/`. Принцип `viz > dry text` — визуализация замещает, а не дублирует текст.

**Нотация `[ref: ...]`:** навигационный указатель между canon-файлами. Форматы: `[ref: part_XX.md §X.Y — Topic]` (между файлами) или `[ref: §X.Y]` (внутри файла). Используется только для навигации между Parts (указание, где находится конкретный блок), не для повторного объяснения уже введённых концепций.

**Метки callouts** (английские — semantic anchors, не русифицируются; тело callouts — на русском):

- `**RULE:**` — каноническое правило (нарушение = регрессия качества).
- `**RECOMMENDATION:**` — мягкая рекомендация.
- `**EXAMPLE:**` — пример выполнения.
- `**ILLUSTRATION:**` — визуальная демонстрация (diff-view, multi-char scene).
- `**TEMPLATE:**` — шаблон для копирования.
- `**Bridge:**` — нарративный переход между Parts (только 2 в гайде).
- `**Synthesis:**` — 1–2 предложения summary в конце Part.
- `**Cross-ref:**` — навигационный указатель на секцию в другом Part.
- `**Demonstrates:**` — список принципов, которые карточка демонстрирует.
- `**Annotation:**` — детальный разбор блока карточки.
- `**Примечание:**` — уточняющий комментарий.

---

## 0.2 TL;DR / Quick Start

`data-section: p0_tldr_quick_start`

<!-- difficulty: BASIC -->

Минимальная карточка за 30 минут. Карточка = 4 блока: System Prompt (SP), Description, Examples, Greeting.

**6 шагов сборки:**

1. **System Prompt (SP):** «You are [имя], [роль]. Never speak or act for {{user}}.» + Tone Frame + Format Lock. ~50 токенов.
2. **Description:** `<identity>` + `<spine>` (WANT/NEED/FLAW/LIE/GHOST — 1 строка на каждый элемент). ~150 токенов.
3. **Examples (2–3 блока `<START>`):** каждый 80–120 токенов, демонстрирует голос + минимум один embodiment (физическая реакция). Голос задаётся ТОЛЬКО здесь.
4. **Greeting:** 50–100 токенов, 4 шага (Sensory Anchor → тело FLAW → реплика → крючок).
5. **Anchors (3–5):** Trigger → Action → Price (Price = наблюдаемый физический маркер в той же сцене).
6. **Pre-deploy check:** 5 быстрых проверок (PP=0, Voice в Examples, Price в Anchors, Format Lock, Anti-godmoding).

Гайд строится на трёх обязательных принципах, которые подробно разбираются в Part 1: Anchor = T→A→P (без Price якорь = инструкция без паттерна), голос задаётся только в Examples и Greeting (Voice в Description = потеря токенов), психология размещается только в Description (никогда в System Prompt).

**С чего начать:** если вы делаете карточку впервые — начните с Елены, скопируйте структуру, замените содержимое. Не пытайтесь сразу строить Омнис-Зета (~1800 токенов, GHOST Layers, CoT, Lorebook) — это ведёт к перегрузке и Voice Leak.

**Cross-ref:** Pre-build checklist (6 вопросов перед стартом) → `[ref: part_01.md §1.8 — Pre-build checklist]`. Pre-deploy валидация (5+14 проверок) → `[ref: part_09.md §9.11]`. Готовые карточки → `[ref: part_10.md §10.1]`.
