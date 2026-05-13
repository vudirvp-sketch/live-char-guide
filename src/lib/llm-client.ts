// Universal LLM API client supporting multiple providers
// Routes all requests through a CORS proxy (Cloudflare Worker) for browser compatibility
// No process.env references — all config comes from client-side settings

// ============================================================================
// TYPES
// ============================================================================

export type LLMProvider =
  | 'zai'
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'mistral'
  | 'deepseek'
  | 'qwen'
  | 'kimi'
  | 'groq'
  | 'openrouter'
  | 'huggingface'
  | 'together'
  | 'xai'
  | 'custom';

export interface LLMProviderConfig {
  name: string;
  baseUrl: string;
  apiKeyPrefix?: string;
  defaultModel: string;
  headers?: Record<string, string>;
  /** URL of the provider's model documentation / pricing page */
  modelDocsUrl?: string;
}

export interface ProxyRequest {
  provider: LLMProvider;
  apiKey: string;
  targetUrl: string;
  headers?: Record<string, string>;
  payload: string; // JSON stringified request body for the provider
}

export interface LLMClientConfig {
  provider: LLMProvider;
  apiKey: string;
  model?: string;
  baseUrl?: string; // For custom providers
  proxyUrl?: string; // CORS proxy URL (Cloudflare Worker)
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  /** Maximum number of 429 rate-limit retries before giving up. Default: 3 */
  maxRateLimitRetries?: number;
  /** AbortSignal to cancel the request (e.g. for timeout). Passed to fetch(). */
  signal?: AbortSignal;
  /** If true, tells the proxy to skip server-side 429 retries (for test connections). */
  skipProxyRetry?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ============================================================================
// PROVIDER URL MAPPING
// ============================================================================

/**
 * Get the target API URL for a given provider and model.
 * The proxy uses this URL to forward the request.
 */
export function getProviderUrl(provider: LLMProvider, model: string): string {
  switch (provider) {
    case 'openai':      return 'https://api.openai.com/v1/chat/completions';
    case 'anthropic':   return 'https://api.anthropic.com/v1/messages';
    case 'google':      return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    case 'deepseek':    return 'https://api.deepseek.com/v1/chat/completions';
    case 'groq':        return 'https://api.groq.com/openai/v1/chat/completions';
    case 'openrouter':  return 'https://openrouter.ai/api/v1/chat/completions';
    case 'mistral':     return 'https://api.mistral.ai/v1/chat/completions';
    case 'qwen':        return 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
    case 'kimi':        return 'https://api.moonshot.cn/v1/chat/completions';
    case 'xai':         return 'https://api.x.ai/v1/chat/completions';
    case 'together':    return 'https://api.together.xyz/v1/chat/completions';
    case 'huggingface': return `https://api-inference.huggingface.co/models/${model}`;
    case 'zai':         return 'https://api.z.ai/v1/chat/completions';
    default:            return ''; // Custom provider URL entered by user
  }
}

// ============================================================================
// PROVIDER CONFIGURATIONS (display info only — request transformation is in the proxy)
// ============================================================================

export const LLM_PROVIDERS: Record<LLMProvider, LLMProviderConfig> = {
  zai: {
    name: 'Z.AI',
    baseUrl: 'https://api.z.ai/v1',
    defaultModel: 'default',
    headers: { 'X-Z-AI-From': 'Z' },
    modelDocsUrl: 'https://z.ai/docs',
  },

  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    apiKeyPrefix: 'sk-',
    defaultModel: 'gpt-4.1-mini',
    modelDocsUrl: 'https://platform.openai.com/docs/models',
  },

  anthropic: {
    name: 'Anthropic (Claude)',
    baseUrl: 'https://api.anthropic.com/v1',
    apiKeyPrefix: 'sk-ant-',
    defaultModel: 'claude-sonnet-4-20250514',
    modelDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },

  google: {
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    defaultModel: 'gemini-2.5-flash',
    modelDocsUrl: 'https://ai.google.dev/gemini-api/docs/models',
  },

  mistral: {
    name: 'Mistral AI',
    baseUrl: 'https://api.mistral.ai/v1',
    apiKeyPrefix: 'sk-',
    defaultModel: 'mistral-large-latest',
    modelDocsUrl: 'https://docs.mistral.ai/getting-started/models/models_overview/',
  },

  deepseek: {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    apiKeyPrefix: 'sk-',
    defaultModel: 'deepseek-chat',
    modelDocsUrl: 'https://api-docs.deepseek.com/quick_start/pricing',
  },

  qwen: {
    name: 'Alibaba Qwen (通义千问)',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKeyPrefix: 'sk-',
    defaultModel: 'qwen-turbo',
    modelDocsUrl: 'https://help.aliyun.com/zh/model-studio/getting-started/models',
  },

  kimi: {
    name: 'Moonshot Kimi',
    baseUrl: 'https://api.moonshot.cn/v1',
    apiKeyPrefix: 'sk-',
    defaultModel: 'moonshot-v1-8k',
    modelDocsUrl: 'https://platform.moonshot.cn/docs/intro',
  },

  groq: {
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    apiKeyPrefix: 'gsk_',
    defaultModel: 'llama-3.3-70b-versatile',
    modelDocsUrl: 'https://console.groq.com/docs/models',
  },

  openrouter: {
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'anthropic/claude-sonnet-4',
    modelDocsUrl: 'https://openrouter.ai/models',
    headers: {
      'HTTP-Referer': 'https://universe-audit-protocol.pages.dev',
      'X-Title': 'Universe Audit Protocol',
    },
  },

  huggingface: {
    name: 'Hugging Face',
    baseUrl: 'https://api-inference.huggingface.co/models',
    defaultModel: 'meta-llama/Llama-3.2-3B-Instruct',
    modelDocsUrl: 'https://huggingface.co/docs/api-inference/index',
  },

  together: {
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    defaultModel: 'meta-llama/Llama-3.2-3B-Instruct-Turbo',
    modelDocsUrl: 'https://docs.together.ai/docs/inference-models',
  },

  xai: {
    name: 'xAI (Grok)',
    baseUrl: 'https://api.x.ai/v1',
    defaultModel: 'grok-3-mini-fast',
    modelDocsUrl: 'https://docs.x.ai/docs/models',
  },

  custom: {
    name: 'Custom Endpoint',
    baseUrl: '',
    defaultModel: 'default',
  },
};

// ============================================================================
// PROVIDER-SPECIFIC REQUEST BUILDERS
// ============================================================================

/**
 * Build the request body for a given provider.
 * The client always builds the body in the provider's native format.
 * The proxy only handles auth header injection.
 */
function buildProviderRequestBody(
  provider: LLMProvider,
  options: ChatCompletionOptions,
  effectiveModel: string
): string {
  switch (provider) {
    case 'anthropic': {
      // Anthropic Messages API format
      const systemMessage = options.messages.find(m => m.role === 'system');
      const nonSystemMessages = options.messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        }));
      return JSON.stringify({
        model: effectiveModel,
        max_tokens: options.max_tokens || 4096,
        messages: nonSystemMessages,
        system: systemMessage?.content,
      });
    }

    case 'google': {
      // Google Gemini API format
      const systemContent = options.messages.find(m => m.role === 'system')?.content;
      return JSON.stringify({
        contents: options.messages
          .filter(m => m.role !== 'system')
          .map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
        ...(systemContent
          ? { systemInstruction: { parts: [{ text: systemContent }] } }
          : {}),
        generationConfig: {
          temperature: options.temperature ?? 0.7,
          maxOutputTokens: options.max_tokens || 2048,
        },
      });
    }

    case 'huggingface': {
      // HuggingFace Inference API format
      return JSON.stringify({
        inputs: options.messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        parameters: {
          temperature: options.temperature ?? 0.7,
          max_new_tokens: options.max_tokens || 2048,
          return_full_text: false,
        },
      });
    }

    default: {
      // OpenAI-compatible format (openai, deepseek, groq, openrouter, mistral, zai, etc.)
      return JSON.stringify({
        model: effectiveModel,
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens,
        stream: false,
      });
    }
  }
}

/**
 * Transform provider-specific response into the standard ChatCompletionResponse format.
 * This runs client-side after receiving the raw response from the proxy.
 */
function normalizeProviderResponse(
  provider: LLMProvider,
  responseData: unknown
): ChatCompletionResponse {
  switch (provider) {
    case 'anthropic': {
      const r = responseData as Record<string, unknown>;
      return {
        id: String(r.id || 'unknown'),
        object: 'chat.completion',
        created: Date.now(),
        model: String(r.model || 'claude'),
        choices: [{
          index: 0,
          message: {
            role: 'assistant',
            content: String((r.content as Array<Record<string, unknown>>)?.[0]?.text || ''),
          },
          finish_reason: r.stop_reason === 'end_turn' ? 'stop' : String(r.stop_reason || 'stop'),
        }],
      };
    }

    case 'google': {
      const r = responseData as Record<string, unknown>;
      const candidates = (r.candidates as Array<Record<string, unknown>>) || [];
      const content = candidates[0]?.content as Record<string, unknown> | undefined;
      const parts = content?.parts as Array<Record<string, unknown>> | undefined;
      const text = parts?.[0]?.text as string | undefined;
      const finishReason = candidates[0]?.finishReason as string | undefined;
      return {
        id: 'gemini-' + Date.now(),
        object: 'chat.completion',
        created: Date.now(),
        model: 'gemini',
        choices: [{
          index: 0,
          message: {
            role: 'assistant',
            content: text || '',
          },
          finish_reason: finishReason === 'STOP' ? 'stop' : (finishReason || 'stop'),
        }],
      };
    }

    case 'huggingface': {
      const r = responseData as Array<Record<string, unknown>>;
      return {
        id: 'hf-' + Date.now(),
        object: 'chat.completion',
        created: Date.now(),
        model: 'huggingface',
        choices: [{
          index: 0,
          message: {
            role: 'assistant',
            content: String(r?.[0]?.generated_text || ''),
          },
          finish_reason: 'stop',
        }],
      };
    }

    default: {
      // OpenAI-compatible response — return as-is
      return responseData as ChatCompletionResponse;
    }
  }
}

// ============================================================================
// CLIENT FACTORY
// ============================================================================

/**
 * Creates an LLM API client that routes requests through the CORS proxy.
 * All requests go through the proxy — no direct browser-to-provider calls.
 */
export function createLLMClient(config: LLMClientConfig) {
  const providerConfig = LLM_PROVIDERS[config.provider];
  const model = config.model || providerConfig.defaultModel;

  /**
   * Make a chat completion request via the CORS proxy
   */
  async function chatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    const effectiveModel = options.model || model;
    const max429Retries = options.maxRateLimitRetries ?? 3;

    // Determine target URL
    let targetUrl: string;
    if (config.provider === 'custom' && config.baseUrl) {
      targetUrl = `${config.baseUrl}/chat/completions`;
    } else {
      targetUrl = getProviderUrl(config.provider, effectiveModel);
    }

    if (!targetUrl) {
      throw new Error(`URL провайдера не задан для «${config.provider}». Укажите baseUrl в настройках.`);
    }

    // Build the request body in the provider's native format
    const payload = buildProviderRequestBody(config.provider, options, effectiveModel);

    // Build the proxy request
    const proxyRequest: ProxyRequest = {
      provider: config.provider,
      apiKey: config.apiKey,
      targetUrl,
      payload,
    };

    // Determine proxy URL
    const proxyUrl = config.proxyUrl || '';

    if (!proxyUrl) {
      throw new Error(
        'URL CORS-прокси не настроен. Укажите его в Настройки → Расширенные настройки → URL прокси.'
      );
    }

    // Build fetch headers — include X-No-Retry if test connection wants to skip proxy retries
    const fetchHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
    if (options.skipProxyRetry) {
      fetchHeaders['X-No-Retry'] = 'true';
    }

    // 429 Rate Limit auto-retry with exponential backoff + countdown
    // The Worker proxy already retries 429s 2 times server-side,
    // so client retries here are a second line of defense.
    let last429Error: Error | null = null;
    for (let retryAttempt = 0; retryAttempt <= max429Retries; retryAttempt++) {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify(proxyRequest),
        signal: options.signal, // AbortSignal — enables real timeout cancellation
      });

      // Handle 429 Rate Limit with auto-retry and countdown
      if (response.status === 429) {
        // Check if the proxy already retried (X-Proxy-Retried header)
        const proxyRetries = response.headers.get('X-Proxy-Retried');
        const proxyRetryInfo = proxyRetries ? ` (прокси уже пытался ${proxyRetries} раз)` : '';

        const retryAfterHeader = response.headers.get('retry-after');
        let waitSeconds: number;

        if (retryAfterHeader) {
          // retry-after can be seconds or an HTTP date
          const parsed = parseInt(retryAfterHeader, 10);
          if (!isNaN(parsed) && parsed > 0) {
            waitSeconds = parsed;
          } else {
            const retryDate = new Date(retryAfterHeader).getTime();
            waitSeconds = Math.max(1, Math.ceil((retryDate - Date.now()) / 1000));
          }
        } else {
          // Exponential backoff: 10s, 30s, 60s — longer waits than before
          // because the proxy already did short retries
          waitSeconds = 10 * Math.pow(3, retryAttempt);
        }

        // Cap at 90 seconds to avoid excessively long waits
        waitSeconds = Math.min(waitSeconds, 90);

        if (retryAttempt < max429Retries) {
          console.warn(
            `[429 Rate Limit] Retry ${retryAttempt + 1}/${max429Retries}${proxyRetryInfo} — waiting ${waitSeconds}s before retry...`
          );
          // Wait with countdown — allows UI to show progress if needed
          await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
          continue;
        }

        // Final 429 after all retries — throw with clear Russian message
        last429Error = new Error(
          `Превышен лимит запросов к провайдеру «${providerConfig.name}»${proxyRetryInfo}. ` +
          `Все попытки повтора исчерпаны (${max429Retries}). ` +
          `Рекомендации:
` +
          `1. Подождите 1-2 минуты и попробуйте снова
` +
          `2. Уменьшите RPM-лимит в Настройках (например, до 3)
` +
          `3. Смените провайдера на того, у кого выше лимиты (Google Gemini, Groq)
` +
          `4. Используйте платный API-ключ для более высоких лимитов`
        );
        throw last429Error;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${providerConfig.name} ошибка прокси (${response.status}): ${errorText}`);
      }

      // Successful response — parse and normalize
      const responseData = await response.json();
      return normalizeProviderResponse(config.provider, responseData);
    }

    // Should not reach here, but just in case
    throw last429Error || new Error('Неожиданная ошибка при обработке запроса к LLM.');
  }

  return {
    chatCompletion,
    provider: config.provider,
    model,
    /**
     * OpenAI-compatible interface
     */
    chat: {
      completions: {
        create: chatCompletion,
      },
    },
  };
}

// ============================================================================
// API KEY VALIDATION (client-side only, no server calls)
// ============================================================================

/**
 * Validate API key format for a provider.
 * Pure client-side validation — checks prefix, length, non-empty.
 * Returns an object with validation result and optional error message.
 */
export function validateApiKey(provider: LLMProvider, apiKey: string): { valid: boolean; error?: string } {
  if (!apiKey || apiKey.trim().length === 0) {
    return { valid: false, error: 'API ключ не указан' };
  }

  if (apiKey.length < 10) {
    return { valid: false, error: 'API ключ слишком короткий' };
  }

  const config = LLM_PROVIDERS[provider];
  if (config.apiKeyPrefix && !apiKey.startsWith(config.apiKeyPrefix)) {
    // Warning but not blocking — some providers accept multiple key formats
    return {
      valid: true,
      error: `Ключ для ${config.name} обычно начинается с "${config.apiKeyPrefix}"`,
    };
  }

  return { valid: true };
}

// ============================================================================
// PROVIDER INFO HELPERS
// ============================================================================

/**
 * Get provider display info
 */
export function getProviderInfo(provider: LLMProvider) {
  const config = LLM_PROVIDERS[provider];
  return {
    id: provider,
    name: config.name,
    defaultModel: config.defaultModel,
    apiKeyPrefix: config.apiKeyPrefix,
    hasFreeTier: ['google', 'groq', 'huggingface', 'openrouter', 'together'].includes(provider),
    modelDocsUrl: config.modelDocsUrl,
  };
}

/**
 * List of all available providers
 */
export const AVAILABLE_PROVIDERS = Object.entries(LLM_PROVIDERS)
  .filter(([id]) => id !== 'custom')
  .map(([id, config]) => ({
    id: id as LLMProvider,
    name: config.name,
    defaultModel: config.defaultModel,
    hasFreeTier: ['google', 'groq', 'huggingface', 'openrouter', 'together'].includes(id),
  }));

export type LLMClient = ReturnType<typeof createLLMClient>;
