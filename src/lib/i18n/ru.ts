/**
 * Centralized Russian strings for the Universe Audit Protocol.
 * All user-facing text is defined here as a flat const object.
 * Based on COMPLETION_PLAN Section 3.1 (expanded).
 *
 * Language Contract (Section 0.5):
 * - UI text: Russian
 * - JSON keys in LLM output: English
 * - JSON values in LLM output: Russian
 * - Enum values: English (displayed as-is in badges)
 */

export const t = {
  app: {
    title: 'Протокол Аудита Вселенной',
    version: 'v10.0',
    subtitle: 'Анализ вымышленных миров через 4 иерархических уровня',
    description:
      'Протокол Аудита Вселенной оценивает вымышленные миры через 4 иерархических уровня: Механизм, Тело, Психика и Мета. Каждый уровень требует порогового балла для прохождения (60% для конфликтного режима, 50% для кирё, 55% для гибридного).',
    footer:
      'Протокол Аудита Вселенной v10.0 — На основе протокола \u00ABАУДИТ_ВСЕЛЕННОЙ_v10.0.md\u00BB',
    footerStats: '4 уровня \u2022 52 критерия \u2022 Порог зависит от режима',
    newAudit: 'Новый аудит',
    cancelAudit: 'Отменить аудит',
    startAudit: 'Начать аудит',
    analyzing: 'Анализируем...',
    clear: 'Очистить',
    save: 'Сохранить',
    saved: 'Сохранено!',
    settings: 'Настройки',
    criteriaCount: '52 критерия',
  },

  form: {
    narrativeTitle: 'Ввод нарратива',
    narrativeDescription:
      'Введите концепт, структуру истории или описание мира для анализа',
    narrativeLabel: 'Нарратив / Текст концепта',
    narrativePlaceholder:
      'Введите концепт вашего нарратива, структуру истории или описание мира здесь...\n\nПример: Постапокалиптический мир, где воспоминания можно извлекать и продавать. Протагонист — торговец памятью — обнаруживает, что его собственные воспоминания были систематически стёрты, что ведёт его в путешествие за восстановлением прошлого, пока он раскрывает заговор, угрожающий тому, что осталось от общества...',
    characterCount: '{count} символов | Минимум 100 символов рекомендуется',
    mediaType: 'Тип медиа',
    mediaTypeSelect: 'Выберите тип медиа',
    auditMode: 'Режим аудита',
    auditModeDescription:
      'Выберите режим структуры нарратива, который лучше всего подходит вашей истории',
    detection: 'Определение: {questions}',
    authorProfileTitle: 'Опрос профиля автора',
    authorProfileDescription:
      'Опционально: ответьте на 7 вопросов для определения вашего авторского профиля',
    authorProfileHint:
      'Эти вопросы помогают определить, кто вы: \u00ABСадовник\u00BB (писатель-исследователь) или \u00ABАрхитектор\u00BB (планировщик). Это влияет на типы проблем, которые аудит будет приоритизировать.',
    keySignal: 'Ключевой сигнал (\u00D7{weight})',
    weight: 'Вес: {weight}',
    profileDetermined: 'Профиль определён!',
    profileDeterminedHint:
      'Ваш авторский профиль будет рассчитан при запуске аудита.',
    minCharsWarning: 'Минимум 50 символов для запуска аудита',
  },

  phases: {
    idle: 'Готов',
    input_validation: 'Валидация ввода',
    mode_detection: 'Определение режима',
    author_profile: 'Профиль автора',
    skeleton_extraction: 'Извлечение скелета',
    screening: 'Быстрый скрининг',
    L1_evaluation: 'Гейт L1: Механизм',
    L2_evaluation: 'Гейт L2: Тело',
    L3_evaluation: 'Гейт L3: Психика',
    L4_evaluation: 'Гейт L4: Мета',
    issue_generation: 'Проблемы и цепочки',
    generative_modules: 'Генеративные модули',
    final_output: 'Диагностика и итог',
    complete: 'Завершено',
    failed: 'Ошибка',
    blocked: 'Заблокировано',
    cancelled: 'Отменено',
  },

  phaseDescriptions: {
    idle: 'Введите нарратив для начала',
    input_validation: 'Проверка ввода',
    mode_detection: 'Определение режима аудита',
    author_profile: 'Анализ профиля автора',
    skeleton_extraction: 'Извлечение скелета нарратива',
    screening: 'Быстрый 7-вопросный скрининг',
    L1_evaluation: 'Проверка системной связности',
    L2_evaluation: 'Воплощённость и последствия',
    L3_evaluation: 'Проверка психологической глубины',
    L4_evaluation: 'Мета-нарративный уровень',
    issue_generation: 'Генерация проблем и цепочек',
    generative_modules: 'Генеративные модули',
    final_output: 'Финальная диагностика',
    complete: 'Аудит завершён',
    failed: 'Гейт не пройден — требуется исправление',
    blocked: 'Аудит остановлен',
    cancelled: 'Аудит отменён пользователем',
  },

  gates: {
    blockedTitle: 'Аудит остановлен на уровне {level}',
    blockedDescription:
      'Концепт не прошёл порог {threshold}% на уровне {level}',
    fixAndContinue: 'Исправить и продолжить',
    status: 'Статус гейтов',
    requirement: 'Порог зависит от режима аудита',
    score: 'Балл',
    // GateResult.tsx
    title: 'Результаты гейтов',
    pending: 'Ожидание',
    notEvaluated: 'Этот уровень ещё не оценивался.',
    passed: 'ПРОЙДЕН',
    failed: 'НЕ ПРОЙДЕН',
    scoreLabel: 'Балл',
    threshold: 'порог: {value}%',
    total: 'Всего',
    passedItems: 'Пройдено',
    failedItems: 'Не пройдено',
    noData: 'Нет данных',
    blockBreakdown: 'Разбивка по блокам',
    conditions: 'Условия',
    moreConditions: '+{count} условий...',
    fixList: 'Список исправлений ({count} пунктов)',
    fixRecommended: 'Рекомендуемый подход: {approach}',
    proceedTo: 'Перейти к {target}',
    proceedL2: 'L2 (Тело)',
    proceedL3: 'L3 (Психика)',
    proceedL4: 'L4 (Мета)',
    proceedFinal: 'Итоговому отчёту',
    gatesFailed: '{count} гейт(а) не пройдено',
    auditStopped: 'Аудит остановлен',
    auditStoppedDesc:
      'Аудит остановлен из-за непройденных гейтов. Исправьте указанные проблемы перед переходом на следующий уровень.',
    gateFailureDetected: 'Обнаружен непройденный гейт',
    gateFailureDesc:
      'Гейт <strong>{level}</strong> не пройден с баллом <strong>{score}%</strong>.<br/><br/>Согласно Протоколу Аудита Вселенной v10.0, каждый уровень требует прохождения порога для продолжения. Аудит остановлен, чтобы предотвратить анализ на нестабильной основе.<br/><br/>Ознакомьтесь со списком исправлений и устраните выявленные проблемы перед продолжением.',
    viewFixList: 'Смотреть список исправлений',
    // Gate executor output strings
    gateFailedHeading: '## ГЕЙТ НЕ ПРОЙДЕН: {name}',
    statusLabel: 'Статус',
    scoreLabelShort: 'Балл',
    conditionBreakdown: '### Разбивка по условиям:',
    requiredFixes: '### Необходимые исправления:',
    executionHalted: '**ВЫПОЛНЕНИЕ ОСТАНОВЛЕНО** — Устраните проблемы выше перед продолжением',
    // Fix type labels (Russian per Language Contract)
    fixTypeMotivation: 'Мотивация',
    fixTypeCompetence: 'Компетентность',
    fixTypeScale: 'Масштаб',
    fixTypeResources: 'Ресурсы',
    fixTypeMemory: 'Память',
    fixTypeIdeology: 'Идеология',
    fixTypeTime: 'Время',
  },

  levels: {
    L1: {
      name: 'Механизм',
      question: 'Работает ли мир как система?',
      description: 'Работает ли мир как система?',
      focus: 'Базовая связность, логика, экономика',
    },
    L2: {
      name: 'Тело',
      question: 'Есть ли воплощённость?',
      description: 'Есть ли воплощённость и последствия?',
      focus: 'Доверие, рутина, пространственная память',
    },
    L3: {
      name: 'Психика',
      question: 'Работает ли как симптом?',
      description: 'Работает ли мир как симптом?',
      focus: 'Архитектура горя, глубина персонажей',
    },
    L4: {
      name: 'Мета',
      question: 'Спрашивает ли о реальной жизни?',
      description: 'Спрашивает ли о реальной жизни?',
      focus: 'Зеркало, культовый статус, этика авторства',
    },
  },

  blocked: {
    failedCriteria: 'Проваленные критерии:',
    noDescription: 'Нет описания',
    impact: 'Влияние:',
    whyImportant: 'Почему это важно:',
    whyImportantExplanation:
      'Каждый гейт — это иерархический фильтр. Если уровень не пройден, исправление более глубоких уровней бессмысленно — их результаты будут ненадёжными. Сначала устраните проблемы текущего уровня, затем перезапустите аудит с этого этапа.',
    editAndRestart: 'Редактировать концепт и перезапустить',
    downloadResults: 'Скачать текущие результаты (JSON)',
    copyRecommendations: 'Скопировать рекомендации',
    copied: 'Скопировано!',
    patchConservative: 'Осторожный',
    patchCompromise: 'Компромиссный',
    patchRadical: 'Радикальный',
    // Resume from blocked stage (Phase 3.3 / 4.5)
    resumeFromStep: 'Возобновить с этого этапа',
    resuming: 'Возобновление...',
    resumeHint: 'Исправьте текст нарратива, затем нажмите эту кнопку, чтобы перезапустить аудит с заблокированного этапа, сохранив результаты предыдущих шагов.',
  },

  errors: {
    timeout: 'LLM не ответила за 30 секунд. Попробуйте ещё раз.',
    invalid_json: 'LLM вернула невалидный JSON. Перезапускаем шаг...',
    rate_limit:
      'Превышен лимит запросов. Подождите минуту и попробуйте снова.',
    truncated:
      'Ответ LLM был обрезан. Перезапускаем с увеличенным лимитом токенов...',
    network: 'Нет подключения к интернету',
    auth: 'Неверный API ключ. Проверьте ключ в настройках.',
    cors: 'Ошибка прокси. Проверьте URL прокси в настройках.',
    proxy: 'URL прокси не указан. Откройте настройки и введите URL вашего Cloudflare Worker.',
    provider: 'Ошибка на стороне провайдера: {message}',
    noApiKey:
      'API ключ не указан. Откройте настройки и введите API ключ.',
    unknown: 'Неизвестная ошибка',
    error: 'Ошибка',
  },

  progress: {
    stepLabel: 'Шаг {current} из {total}: {name}',
    elapsed: 'Прошло: {time}',
    estimatedRemaining: 'Ориентировочно осталось: {time}',
    processing: 'Обработка...',
    percentComplete: '{percent}% выполнено',
    progress: 'Прогресс',
    auditStopped: 'Аудит остановлен',
  },

  settings: {
    title: 'Настройки LLM',
    description: 'Выберите AI-провайдера и настройте API ключ.',
    provider: 'AI Провайдер',
    providerSelect: 'Выберите провайдера',
    freeTier: 'БЕСПЛАТНО',
    freeTierAvailable: 'У этого провайдера есть бесплатный тариф!',
    model: 'Модель',
    modelDefault: 'По умолчанию: {model}',
    modelDocsLink: 'Список актуальных моделей →',
    apiKey: 'API Ключ',
    apiKeyPlaceholder: 'Введите ваш API ключ...',
    proxyUrl: 'URL Прокси',
    proxyUrlHint:
      'URL CORS-прокси для запросов к LLM. Преднастроено, изменяйте только при самостоятельном хостинге.',
    proxyUrlHintAdvanced:
      'URL CORS-прокси. Преднастроено для этого приложения. Изменяйте только если вы развёртываете собственный прокси.',
    proxyUrlPlaceholder: 'URL прокси ещё не настроен! Замените <your-subdomain> на ваш реальный поддомен.',
    advancedSettings: 'Расширенные настройки',
    rpmLimit: 'Лимит запросов/мин',
    rpmLimitHint: 'Максимальное количество запросов к API в минуту. Автозаполняется по провайдеру, но можно изменить.',
    rpmLimitLabel: 'Лимит: {rpm} запросов/мин',
    testConnection: 'Проверить подключение',
    testing: 'Проверяем...',
    testSuccess: 'Подключение успешно!',
    testFailed: 'Ошибка подключения',
    apiKeyConfigured: 'API ключ {provider} настроен',
    howToGetKey: 'Как получить API ключ:',
    keySecurityNote:
      'Ваш API ключ хранится локально в браузере и не передаётся третьим лицам.',
    // Provider-specific instructions (Russian per Language Contract)
    providerInstructions: {
      google: {
        step1: 'Перейдите в <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Google AI Studio</a>',
        step2: 'Создайте новый API ключ',
        step3: 'Бесплатный тариф: 15 запросов/мин, 1М токенов/день',
      },
      groq: {
        step1: 'Перейдите в <a href="https://console.groq.com/keys" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Консоль Groq</a>',
        step2: 'Создайте API ключ (начинается с gsk_)',
        step3: 'Очень быстрый вывод, щедрый бесплатный тариф',
      },
      openrouter: {
        step1: 'Перейдите в <a href="https://openrouter.ai/keys" target="_blank" rel="noopener" class="text-blue-500 hover:underline">OpenRouter</a>',
        step2: 'Создайте API ключ',
        step3: 'Доступ ко многим моделям, некоторые бесплатные',
      },
      huggingface: {
        step1: 'Перейдите в <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Настройки Hugging Face</a>',
        step2: 'Создайте Токен Доступа',
        step3: 'Бесплатный API вывода (с ограничением скорости)',
      },
      together: {
        step1: 'Перейдите в <a href="https://api.together.xyz/settings/api-keys" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Together AI</a>',
        step2: 'Создайте API ключ',
        step3: '1$ бесплатного кредита при регистрации',
      },
      openai: {
        step1: 'Перейдите на <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Платформу OpenAI</a>',
        step2: 'Создайте API ключ (начинается с sk-)',
        step3: 'Оплата по факту использования',
      },
      anthropic: {
        step1: 'Перейдите в <a href="https://console.anthropic.com/" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Консоль Anthropic</a>',
        step2: 'Создайте API ключ (начинается с sk-ant-)',
        step3: 'Оплата по факту использования',
      },
      mistral: {
        step1: 'Перейдите в <a href="https://console.mistral.ai/" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Консоль Mistral</a>',
        step2: 'Создайте API ключ',
        step3: '',
      },
      deepseek: {
        step1: 'Перейдите на <a href="https://platform.deepseek.com/" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Платформу DeepSeek</a>',
        step2: 'Создайте API ключ',
        step3: 'Очень конкурентные цены',
      },
      qwen: {
        step1: 'Перейдите в <a href="https://dashscope.console.aliyun.com/" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Alibaba DashScope</a>',
        step2: 'Создайте API ключ',
        step3: '',
      },
      kimi: {
        step1: 'Перейдите на <a href="https://platform.moonshot.cn/" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Платформу Moonshot</a>',
        step2: 'Создайте API ключ',
        step3: '',
      },
      xai: {
        step1: 'Перейдите в <a href="https://console.x.ai/" target="_blank" rel="noopener" class="text-blue-500 hover:underline">Консоль xAI</a>',
        step2: 'Создайте API ключ',
        step3: '',
      },
      zai: {
        step1: 'Обратитесь в Z.AI для получения доступа к API',
        step2: 'Введите ваш API ключ здесь',
        step3: '',
      },
    },
  },

  tabs: {
    report: 'Отчёт',
    gates: 'Гейты',
    issues: 'Проблемы',
    chains: 'Цепочки',
    generative: 'Генерация',
    checklist: 'Чеклист',
    grief: 'Горе-матрица',
  },

  config: {
    title: 'Конфигурация',
    media: 'Медиа',
    mode: 'Режим',
    input: 'Ввод',
    characters: '{count} символов',
    modeDetecting: 'определение...',
  },

  // ─── IssueList.tsx ────────────────────────────────────────────────
  issues: {
    title: 'Проблемы',
    noIssues: 'Проблем не обнаружено',
    noIssuesDesc: 'Аудит не выявил проблем, требующих внимания.',
    countIssues: '{count} проблем',
    criticalCount: '{count} критических',
    majorCount: '{count} значительных',
    minorCount: '{count} мелких',
    criticalIssues: 'Критические проблемы',
    majorIssues: 'Значительные проблемы',
    minorIssues: 'Мелкие проблемы',
    // Axes
    criticality: 'Критичность',
    risk: 'Риск',
    timeCost: 'Затраты времени',
    // Patch types
    conservative: 'Осторожный',
    compromise: 'Компромиссный',
    radical: 'Радикальный',
    recommendedApproach: 'Рекомендуемый подход',
    impact: 'Влияние:',
    risks: 'Риски:',
    verificationTests: 'Проверки:',
    sideEffects: 'Побочные эффекты:',
    // Severity labels (Russian per Language Contract)
    severityCritical: 'Критический',
    severityMajor: 'Значительный',
    severityMinor: 'Мелкий',
    severityCosmetic: 'Косметический',
  },

  // ─── WhatForChains.tsx ────────────────────────────────────────────
  chains: {
    chainTitle: 'Цепочка {index}',
    validChain: 'Валидная цепочка',
    unclassifiedTerminal: 'Неклассифицированный терминал — требуется повтор',
    terminatedAtStep: 'Завершена на шаге {step}',
    iterations: 'Итерации',
    recommendedAction: 'Рекомендуемое действие',
    bindToLaw: 'Привязать этот элемент к тематическому закону мира',
    keepElement: 'Элемент создаёт осмысленную дилемму — оставить как есть',
    removeElement: 'Рассмотрите возможность удаления этого элемента',
    bindOrRemove: 'Либо привязать к закону, либо полностью удалить',
    retryAnalysis: 'Цепочка не достигла чёткого терминала — повторный анализ',
    noChains: 'Анализ цепочек отсутствует',
    noChainsDesc: 'Цепочки \u00ABА чтобы что?\u00BB не были сгенерированы для этого нарратива.',
    countChains: '{count} цепочек',
    criticalBreakChains: 'Критические цепочки BREAK (\u22644 шага)',
    otherBreakChains: 'Прочие цепочки BREAK',
    dilemmaChains: 'Цепочки DILEMMA',
    unclassifiedChains: 'Неклассифицированные цепочки (нужен повтор)',
    criticalBreak: 'Критическое: BREAK на шаге {step}',
    criticalBreakDesc:
      'Элемент нарушает логику нарратива на раннем этапе цепочки. Рассмотрите привязку к закону мира или удаление.',
    // Badge labels (Russian per Language Contract)
    breakCount: '{count} РАЗРЫВ',
    dilemmaCount: '{count} ДИЛЕММА',
    unclassifiedCount: '{count} Неклассиф.',
    criticalCount: '{count} Критич.',
    // Action badge labels (Russian per Language Contract)
    actionLabels: {
      bind_to_law: 'Привязать к закону',
      keep: 'Оставить',
      remove: 'Удалить',
      bind_to_law_or_remove: 'Закон или удаление',
      retry_analysis: 'Повтор анализа',
    } as const,
  },

  // ─── GenerativeOutput.tsx ─────────────────────────────────────────
  generative: {
    title: 'Генеративный вывод',
    noOutput: 'Генеративный вывод отсутствует',
    noOutputDesc:
      'Генеративные модули активируются автоматически, когда обязательные входные данные отсутствуют.',
    noOutputHint9: '\u00A79 активируется, когда dominant_stage не предоставлен.',
    noOutputHint12: '\u00A712 активируется, когда final_dilemma не предоставлен.',
    griefMapping: 'Отображение горя',
    dilemma: 'Дилемма',
    autoGenerated: 'Автоматически сгенерированные значения',
    autoGeneratedDesc:
      'Эти значения были автоматически выведены, так как соответствующие входные данные не были предоставлены. Вы можете переопределить их, указав явные значения во входных данных аудита.',
    // GriefMappingCard
    lawGriefTitle: '\u00A79 — Вывод стадии горя из закона',
    lawGriefDesc: 'Автоматически выведено из тематического закона, когда dominant_stage не предоставлен',
    sourceLaw: 'Исходный закон',
    derivedStage: 'Выведенная стадия:',
    justificationChain: 'Цепочка обоснования',
    // DilemmaCard
    themeDilemmaTitle: '\u00A712 — Вывод дилеммы из темы',
    themeDilemmaDesc: 'Автоматически выведено из тематического закона, когда final_dilemma не предоставлен',
    valueA: 'Ценность А',
    valueB: 'Ценность Б',
    conflict: 'Конфликт',
    dilemmaCriteria: 'Критерии дилеммы',
    allMet: 'Все выполнены',
    incomplete: 'Не все выполнены',
    typeChoice: 'Выбор типа',
    irreversibility: 'Необратимость',
    identityImpact: 'Влияние на идентичность',
    victoryPrice: 'Цена победы',
    postFinalWorld: 'Постфинальный мир',
    // Grief stage descriptions
    denial: 'Отказ принять реальность',
    anger: 'Фрустрация и эмоциональный взрыв',
    bargaining: 'Попытка договориться или отсрочить',
    depression: 'Глубокая грусть и замкнутость',
    acceptance: 'Примирение с реальностью',
  },

  // ─── ChecklistDisplay.tsx ─────────────────────────────────────────
  checklist: {
    title: 'Чеклист',
    description: '52 пункта в 13 блоках',
    passedCount: '{passed} / {total} пройдено',
    blockNames: {
      A: 'Структура',
      B: 'Связность',
      C: 'Живость',
      D: 'Персонажи',
      E: 'Системы и логика',
      F: 'Новые элементы',
      G: 'Культовый статус',
      H: 'Сцены',
      I: 'Тематическая физика',
      J: 'Архитектура горя',
      K: 'Мета-интеграция',
      L: 'Нарративная инфраструктура',
      M: 'Финал и авторство',
    },
    fail: 'провал',
    evidence: 'Обоснование',
    evidenceRequired: 'Обоснование (обязательно)',
    evidencePlaceholder: 'Укажите конкретный текст или опишите обоснование...',
    functionalRole: 'Функциональная роль',
    functionalRolePlaceholder: 'Объясните, как это служит критерию функционально...',
    insufficientDataMsg: 'Невозможно определить по доступному тексту. Требуется дополнительная информация.',
    // Status labels (Russian per Language Contract)
    statusPass: 'ПРОЙДЕН',
    statusFail: 'НЕ ПРОЙДЕН',
    statusInsufficient: 'НЕДОСТАТОЧНО ДАННЫХ',
    statusPending: 'ОЖИДАНИЕ',
  },

  // ─── GriefArchitectureMatrix.tsx ──────────────────────────────────
  grief: {
    title: 'Матрица архитектуры горя',
    description: '5 стадий \u00D7 4 уровня материализации',
    dominantStage: 'Доминантная стадия горя',
    dominantStagePlaceholder: 'Выберите доминантную стадию...',
    dominantStageHint: 'Доминантная стадия должна быть заполнена на всех 4 уровнях',
    dominant: 'ДОМИНАНТНАЯ',
    materialization: 'Материализация:',
    verification: 'Проверка:',
    levelLabels: {
      character: 'Персонаж',
      location: 'Локация',
      mechanic: 'Механика/Действие',
      act: 'Нарративный акт',
      world: 'Мир',
      society: 'Общество',
      scene: 'Сцена',
    },
    cellPlaceholder: 'Кто/что воплощает {stage} на этом уровне?',
    evidencePlaceholder: 'Доказательства из нарратива...',
    confidence: 'Уверенность:',
    // Confidence level labels (Russian)
    confidenceLabels: {
      high: 'высокая',
      medium: 'средняя',
      low: 'низкая',
      absent: 'отсутствует',
    },
  },

  // ─── ReportDisplay.tsx ────────────────────────────────────────────
  report: {
    title: 'Отчёт аудита',
    protocolVersion: 'Протокол Аудита Вселенной v10.0',
    notGenerated: 'Отчёт ещё не сгенерирован',
    notGeneratedHint: 'Завершите аудит для просмотра полного отчёта',
    humanReadable: 'Читаемый отчёт',
    jsonView: 'JSON',
    // Classifications
    cult_masterpiece: 'Культовый шедевр',
    powerful: 'Мощный нарратив',
    living_weak_soul: 'Живой мир, слабая душа',
    decoration: 'Декорация',
    // Report sections
    auditMode: '1. Режим аудита',
    authorProfile: '2. Профиль автора',
    skeleton: '3. Извлечённый скелет',
    screening: '4. Быстрый скрининг',
    gateResults: '5. Результаты гейтов',
    scores: '6. Оценки по измерениям',
    criticalHoles: '7. Критические проблемы',
    characters: '8. Персонажи и хамартия',
    griefArchitecture: '9. Архитектура горя',
    finale: '10. Финал и дилемма',
    fixes: '11. Исправления',
    cultPotential: '12. Культовый потенциал',
    contrastive: '13. Контрастивный анализ',
    finalScore: '14. Итоговый балл',
    priorityActions: '15. Приоритетные действия',
    // Audit mode descriptions
    conflictModeDesc: 'Западная структура, Путешествие Героя, конфликт как драйвер',
    kishoModeDesc: 'Структура без конфликта, смена перспективы как драйвер',
    hybridModeDesc: 'Архитектура Горя как основа, антагонист как симптом',
    // Author profile
    confidenceHigh: 'высокая',
    confidenceMedium: 'средняя',
    confidenceLow: 'низкая',
    confidenceLabel: 'уверенность',
    mainRisks: 'Главные риски:',
    // Skeleton
    notExtracted: 'Не извлечено',
    skeletonLabels: {
      thematicLaw: 'Тематический закон',
      rootTrauma: 'Корневая травма',
      hamartia: 'Хамартия',
      pillars: '3 Столпа',
      emotionalEngine: 'Эмоциональный двигатель',
      authorProhibition: 'Авторский запрет',
      targetExperience: 'Целевой опыт',
      centralQuestion: 'Центральный вопрос',
    },
    // Screening
    screeningQuestions: {
      q1: 'Закон как правило?',
      q2: 'Мир без героя?',
      q3: 'Воплощённость?',
      q4: 'Хамартия определена?',
      q5: 'Болезненный выбор?',
      q6: 'Логика антагониста?',
      q7: 'Финал необратим?',
    },
    // JSON report
    copy: 'Копировать',
    copied: 'Скопировано!',
    downloadJson: 'Скачать JSON',
    downloadMarkdown: 'Скачать Markdown',
    copyPrompt: 'Скопировать промпт',
    copyPromptHint: 'Скопируйте итоговый промпт для продолжения в чате с LLM',
  },

  // Home page description — referenced in page.tsx as t.homeDescription
  homeDescription:
    'Протокол Аудита Вселенной оценивает вымышленные миры через 4 иерархических уровня: Механизм, Тело, Психика и Мета. Каждый уровень требует порогового балла для прохождения (60% для конфликтного режима, 50% для кирё, 55% для гибридного). Введите описание вашего мира — и протокол выявит слабости, предложит исправления и оценит культовый потенциал.',
} as const;
