# Research Plan — iter 73+ (исследовательская итерация)

> **Цель:** Преобразовать консолидированный анализ `guide_analysis_consolidated.md` в конкретный план верификации и правок для последующих итераций.
> **Принцип:** «Лучше недоделать, чем сломать». Каждая правка — отдельная итерация с validation gates.
> **Дата:** 2026-07-26.

---

## Фаза 1 — Recon & Verification (iter 74) ✅ COMPLETED

**Цель:** Проверить 9 утверждений V1–V9. **Результат:** 4 CONFIRMED (KI#51, KI#52, KI#54, KI#55), 3 FALSE (V1, V4, V6), 2 Decision items (V8, V9).

| # | Результат | KI |
|---|-----------|----|
| V1 | FALSE — canon полный, 740 строк, все §7A.1–§7A.13 | — |
| V2 | CONFIRMED → FIXED iter 75 — Embodiment «Голос:» → «Звук:» (Voice Isolation rule) | KI#51 CLOSED |
| V3 | CONFIRMED → FIXED iter 75 — заменено на «Дрожь в руках, взгляд теряет фокус» | KI#52 CLOSED |
| V4 | FALSE — changelog только в HTML-комментариях | — |
| V5 | CONFIRMED → FIXED iter 75 — заменены на <a href> ссылки на существующие секции гайда | KI#54 CLOSED |
| V6 | FALSE — тонального конфликта нет | — |
| V7 | CONFIRMED → FIXED iter 75 — заголовки разделены на подтипы «тревожный»/«агрессивный» | KI#55 CLOSED |
| V8 | Borderline — перцептивный фильтр в GHOST примере | Decision |
| V9 | CONFIRMED — Matrix без disclaimer | Decision |

Детали — в STATUS.md §Known Issues и guide_analysis_consolidated.md §11.

---

## Фаза 2 — Критичные исправления (iter 75+, после Recon)

**Принцип:** одна правка = одна итерация. После каждой — validation gates + commit.

### iter 75 — KI#54, KI#55, KI#51, KI#52 ✅ COMPLETED

Все 4 открытых KI закрыты в одной итерации (low effort каждый):

- **KI#54 CLOSED:** docs/canon/ мёртвые ссылки → заменены на `<a href>` ссылки на существующие секции гайда (#p1_prebuild_checklist, #p10_elena, #p10_walter, #p10_omnis, #p10_vysherblenny).
- **KI#55 CLOSED:** N>70 дважды → заголовки разделены на подтипы «N > 70 / тревожный тип» и «N > 70 / агрессивный тип».
- **KI#51 CLOSED:** Омнис-Зета Embodiment «Голос:» → «Звук:» (физические звуки машины), голос перенесён в Examples по Voice Isolation rule.
- **KI#52 CLOSED:** Price «Какая из историй?» → «Дрожь в руках, взгляд теряет фокус» (физический Price). Sync: canon + character_bible.

### iter 76 — Уточнение CoT Tier 0 (P1.7) ✅ COMPLETED

- Добавлено явное примечание: «Tier 0 = нет отдельного CoT-блока, Embodiment Protocol действует всегда. CoT — дополнительный внутренний монолог сверх Embodiment».
- Локация: §6.3 (canon + master) + E11 visual + §1.8 Pre-build checklist стр. 5 + Glossary (CoT entry).
- **Modified:** `src/master/part_06.html`, `docs/canon/part_06.md`, `visual-system/elements/E11-cot-tiers.html`, `visual-system/integration/component-extracts/E11-visual.html`, `src/master/part_01.html`, `docs/canon/part_01.md`, `src/master/appendix_glossary.html`, `scripts/audit_canon_master_sync.py`.
- **Validation:** 96/96 canon→master sync PASS. 0 new English leaks (baseline 24).

### iter 77 — Уточнение OCEAN-in-Description (P1.8) ✅ COMPLETED

- Переформулировать принцип #3: «Психология (SPINE, OCEAN, Enneagram) размещается в блоке Description — компактно, в тегах, не нарративом. Никогда в System Prompt».
- Добавлен пример верной/неверной формулировки OCEAN (callout ex в §1.4).
- Добавлен RULE в §5.1: «OCEAN-профиль размещается в Description как `<ocean>`-тег с числовыми значениями».
- Локация: §1.4 (принципы) + §5.1 (OCEAN basics) + §9.3 (checklist) + §8.5 (AP-4) + Glossary.
- **Modified:** `src/master/part_01.html`, `src/master/part_05.html`, `src/master/part_09.html`, `src/master/part_08.html`, `src/master/appendix_glossary.html`, `docs/canon/part_01.md`, `docs/canon/part_05.md`, `docs/canon/part_09.md`, `docs/canon/part_08.md`, `docs/canon/appendix_glossary.md`.
- **Validation:** 96/96 canon→master sync PASS. 0 new English leaks (baseline 24).

### iter 78 — Уточнение Anchors placement (P1.9) ✅ COMPLETED

- Чётко определить: «Anchors = отдельный блок внутри Examples-зоны карточки (после `<START>`-блоков, до Greeting)».
- Локация: Card Anatomy (Part 01) + Part 07A (Assembly Pipeline).

### iter 79 — Уточнение Voice Isolation (P1.5) ✅ COMPLETED

- Уточнить правило: «Лингвистический паттерн (слова, синтаксис) = только Examples. Физическая характеристика (тембр, хрип, механический гул) = Description/Embodiment».
- Локация: §3.1 (Voice Isolation) + §1.4 (принципы).
- **Modified:** `src/master/part_03.html`, `src/master/part_01.html`, `src/master/appendix_glossary.html`, `docs/canon/part_03.md`, `docs/canon/part_01.md`, `docs/canon/appendix_glossary.md`.
- **Validation:** 96/96 canon→master sync PASS. 0 new English leaks (baseline 24).
- Формализует практику iter 75 (fix Омнис-Зета Embodiment «Голос:» → «Звук:»).

### iter 80 — Удаление/обоснование OCEAN×Enneagram Matrix (P1.2)

- Если V9 подтверждено: либо убрать таблицу (§5.7), либо добавить дисклеймер.
- Решение принять после обсуждения с автором.

---

## Фаза 3 — Улучшение структуры (iter 83+, после P1)

### iter 83 — Унификация терминологии Anchors (P2.2)

- Ввести иерархию:
  ```
  Anchors (общее)
  ├── Базовые (T→A→P)
  ├── Sensory (сенсорный триггер)
  ├── CoT (с внутренним процессом)
  └── По происхождению: GHOST/LIE/FLAW/WANT/NEED-linked
  ```
- Локация: §2.1 + Glossary.

### iter 84 — Объединение Voice разделов (P2.3)

- Voice Isolation (§3.1) + Voice Leak (§3.4/§3.6) + Voice Bleed (§3.7/§3.8) → один раздел «Voice: правила и ошибки» с подразделами.
- Sync canon → master.

### iter 85 — Token Budget single source of truth (P2.4)

- Полная таблица только в Part 07A.
- Part 01 — упрощённая 5-строчная сводка.
- Остальные локации — cross-ref.

### iter 86 — Устранение дублей Anti-godmoding (P2.9)

- 4 локации (Part 01 + Part 07A + Part 08 + Glossary) → 1 canonical + 3 cross-ref.
- Canonical: Part 08 (AP-6).

### iter 87 — Устранение дублей Price (P2.10)

- 4 локации → 1 canonical + 3 cross-ref.
- Canonical: Part 02 (Anchor rules).

### iter 88 — Добавить Assembly Pipeline Checklist (P2.12)

- В Part 07A добавить checkbox-формат Assembly Pipeline.
- «☐ Я сделал SP / ☐ Я сделал Description / ☐ Я добавил Anchors» и т.д.

### iter 89 — Добавить Master Checklist-навигацию (P2.13)

- В Part 0 или Part 9 добавить таблицу «Этап работы → Какой чек-лист использовать».

### iter 90 — Merge Diagnostic + Pre-Deploy (P2.11)

- Объединить в Master Checklist с двумя секциями:
  - «If card is broken → start here»
  - «Before deploying → verify all»

---

## Фаза 4 — Опциональные улучшения (iter 91+)

| # | Задача | Итерация |
|---|--------|----------|
| P3.1 | Карта зависимостей в Part 01 | iter 91 |
| P3.5 | Замена процентов на шкалу «высокий/средний/низкий» | iter 92 |
| P3.6 | Схемы Mermaid для SPINE, T→A→P, Embodiment | iter 93 |
| P3.10 | `SP` → `SysPrompt` для System Prompt | iter 94 |
| P3.11 | API blocks → Appendix B | iter 95 |
| P3.12 | Lorebook compatibility → обновляемый Appendix | iter 96 |
| P3.16 | Сократить Full Check §9.11 с 14 до 10 пунктов | iter 97 |
| P3.17 | Убрать градацию B/C в Quality Grade §3.4 | iter 98 |
| P3.20 | Девальвировать MBTI | iter 99 |

---

## Фаза 5 — Спорные/отложенные решения

Следующие предложения из `guide_analysis.md` **отложены** до обсуждения с автором:

| # | Предложение | Причина откладывания |
|---|-------------|----------------------|
| W10 | Перенос Part 07A между Part 04 и Part 05 | Нарушит зависимости (Part 7A зависит от Parts 2–6) |
| W11 | Перенос Part 09 после Part 10 | Нарушит Annotation-блоки Part 10 (ссылаются на Part 9) |
| P2.1 | Перенос Part 07B перед Part 07A | Сложно, требует анализа всех cross-ref |
| P2.5 | Перенос Greeting алгоритма в Part 03 §3.5 | Требует анализа Lorebook-нюансов |
| P2.6 | Перенос Sensory Anchors в конец Part 04 | Требует анализа cross-ref |
| P2.7 | Перенос Environmental Reactivity в Part 07A | Требует анализа связей с Anchors |
| U1 | Удаление MBTI Appendix | Может быть полезен для MBTI-культуры |
| U5 | Удаление Enneagram Wings | Требует развития с примерами |

---

## Контрольные точки

После каждой итерации:

1. ✅ Validation gates PASS (version-sync, canon sync, validate:master, drift baseline, build hash unchanged если только docs).
2. ✅ STATUS.md обновлён (KI открыт → закрыт, или новая запись в Roadmap).
3. ✅ CHANGELOG.md обновлён.
4. ✅ AGENT_NAVIGATION.md актуален (если изменилась структура).
5. ✅ worklog.md — запись итерации.
6. ✅ Git commit + push.

---

## Принципы работы

- **Не делать массовых правок без верификации.**
- **Одна правка = одна итерация.**
- **Если найден новый баг — сначала документируй в STATUS.md как KI, потом фиксись.**
- **Документация должна быть чистой и актуальной.**
- **Убирай длинную историю изменений, мусор, устаревшие секции.**
- **Оставляй только ключевые баги и частые проблемы.**
