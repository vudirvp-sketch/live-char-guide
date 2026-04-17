# Downloadable Resources

Этот каталог содержит дополнительные ресурсы для работы с Live Character Guide.

## Доступные файлы

| Файл | Описание | Применение |
|------|----------|------------|
| `enneagram_spine_templates.json` | Соответствия Enneagram → Spine | Быстрая настройка персонажа |
| `wing_variants.yaml` | Варианты крыльев для Enneagram | Детализация личности |
| `character_test_suite.yaml` | Набор тест-сценариев для валидации | Контроль качества |
| `cot_tiers.md` | Определения уровней Chain-of-Thought | Продвинутый промптинг |
| `multi_char_voice_example.xml` | Пример настройки мультиперсонажа | Изоляция голосов |
| `model_capability_guide.yaml` | Рекомендации по моделям | Настройка параметров |
| `roadmap_with_user_testing.yaml` | Дорожная карта разработки | Планирование проекта |
| `metrics_clarification.yaml` | Определения метрик | Справочник |
| `consistency_methodology.yaml` | Методы проверки консистентности | Контроль качества |

## Как использовать

### enneagram_spine_templates.json
Загрузите JSON-файл для быстрого создания Spine на основе типа Enneagram:
```bash
# Пример использования
cat enneagram_spine_templates.json | jq '.type_4'
```

### character_test_suite.yaml
Используйте тест-сценарии для валидации карточки:
1. Загрузите файл
2. Запустите каждый тест из раздела "6 тест-сценариев"
3. Зафиксируйте результаты

### multi_char_voice_example.xml
Пример XML-структуры для изоляции голосов при мультиперсонаже:
- Содержит готовый шаблон
- Демонстрирует правильную структуру
- Показывает работу с тегами `<voice_isolation>`

### model_capability_guide.yaml
Рекомендации по настройке параметров для разных моделей:
- 12B модели (Gemma, Mistral)
- 32B+ модели (GPT-4, Claude)
- Специфические настройки для каждой модели

## Совместимость

Все файлы совместимы с:
- SillyTavern
- RisuAI
- Agnai
- Faraday.dev
- Oobabooga/text-gen-webui

---

*Сгенерировано для Live Character Guide v5.5.4*
