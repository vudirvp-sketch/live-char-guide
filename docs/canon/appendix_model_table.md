---
canonical_for: —
vs_embedded: none
vs_cross_ref: none
sections: —
last_synced: —
migration_status: —
---

---

## B.1 Model Capability Table

`data-section: appendix_model_table`

<!-- difficulty: BASIC -->
<!-- canonical: Model capability table -->

Эта таблица объединяет всю информацию о зависимости методов от размера модели. Ссылки на эту таблицу заменяют отдельные `MODEL_NOTE`-заметки в тексте гайда.

| Feature | 12B Models | 32B+ Models | API Models |
|---------|------------|-------------|------------|
| CoT Effectiveness | Basic (Tier 0–1 only) | Full (Tier 0–3) | Full (Tier 0–3) |
| SPINE Adherence | Moderate | High | High |
| CORE DIRECTIVES Compliance | ~60–80% | ~85–95% | ~90–98% |
| Consequence Driven (Directive #6) | Limited effect — insufficient reasoning capacity | Significant effect | Full effect |
| Pre-Generation Filter (Directive #7) | ~40–60% compliance — often ignored | ~85–95% compliance | ~90–98% compliance |
| Structured Inject (XML) | Limited | Good | Good |
| English Instruction Adherence | Historically higher on 12B (English-dominant training); narrows on ≥128K vocabulary | Stable in both languages | Stable in both languages |
| Vocabulary Size | 32K (ранние 12B); 128K (актуальные 12B–14B: Gemma 3, Qwen 2.5, Mistral Nemo) | 32K–128K (зависит от поколения) | 100K+ (Claude 200K, GPT-4 128K, Gemini 1M+) |
| Script Tax (non-Latin) | Высокий на 32K словаре (Cyrillic ≈1.5–2× Latin; CJK ≈1–2×) | Средний на 32K; низкий на ≥128K | Низкий (200K+ словарь покрывает большинство письменностей) |

### Ключевые следствия для сборки карточки

- **12B модели:** Tier 0–1 CoT only, упрощённая SPINE, ожидать ~60–80% compliance с CORE DIRECTIVES. SP Language: для 12B с <64K словарём английский оптимален; для актуальных 12B–14B с ≥128K словарём язык карточки допустим — см. §7A.2 RULE. Script Tax на 32K-словаре увеличивает расход токенов для нелатинских письменностей в 1.5–2 раза.
- **32B+ модели:** полный Tier 0–3 CoT, высокая SPINE adherence, ~85–95% compliance с директивами. Pre-Generation Filter работает надёжно.
- **API модели:** максимальная стабильность, ~90–98% compliance. Structured Inject (XML) рекомендуется для сложных персонажей.
