'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Eye, EyeOff, Key, Check, Trash2, Sparkles, Zap, Globe, ChevronDown, ChevronRight, Server } from 'lucide-react';
import { useSettings, isProxyUrlPlaceholder } from '@/hooks/useSettings';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  LLM_PROVIDERS,
  AVAILABLE_PROVIDERS,
  type LLMProvider,
  createLLMClient,
} from '@/lib/llm-client';
import { t } from '@/lib/i18n/ru';

interface SettingsDialogProps {
  onSettingsChange?: (settings: { provider: LLMProvider; apiKey: string | null; model: string | null }) => void;
}

export function SettingsDialog({ onSettingsChange }: SettingsDialogProps) {
  const provider = useSettings((s) => s.provider);
  const apiKey = useSettings((s) => s.apiKey);
  const model = useSettings((s) => s.model);
  const proxyUrl = useSettings((s) => s.proxyUrl);
  const rpmLimit = useSettings((s) => s.rpmLimit);
  const isLoaded = useSettings((s) => s.isLoaded);
  const setProvider = useSettings((s) => s.setProvider);
  const setApiKey = useSettings((s) => s.setApiKey);
  const setModel = useSettings((s) => s.setModel);
  const setProxyUrl = useSettings((s) => s.setProxyUrl);
  const setRpmLimit = useSettings((s) => s.setRpmLimit);
  const loadSettings = useSettings((s) => s.loadSettings);
  const clearSettings = useSettings((s) => s.clearSettings);

  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const [inputKey, setInputKey] = React.useState('');
  const [inputModel, setInputModel] = React.useState('');
  const [inputProxyUrl, setInputProxyUrl] = React.useState('');
  const [inputRpmLimit, setInputRpmLimit] = React.useState('');
  const [showKey, setShowKey] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [testConnection, setTestConnection] = React.useState<{ loading: boolean; success: boolean; error: string | null }>({
    loading: false,
    success: false,
    error: null,
  });

  // Load settings on mount
  React.useEffect(() => {
    if (!isLoaded) {
      loadSettings();
    }
  }, [isLoaded, loadSettings]);

  // Sync inputs with stored settings when dialog opens
  React.useEffect(() => {
    if (open) {
      setInputKey(apiKey || '');
      setInputModel(model || '');
      setInputProxyUrl(proxyUrl || '');
      setInputRpmLimit(String(rpmLimit));
      setSaved(false);
    }
  }, [open, apiKey, model, proxyUrl, rpmLimit]);

  // Update model input when provider changes
  React.useEffect(() => {
    if (open) {
      const defaultModel = LLM_PROVIDERS[provider]?.defaultModel || '';
      setInputModel(model || defaultModel);
    }
  }, [provider, open, model]);

  const handleProviderChange = (newProvider: LLMProvider) => {
    setProvider(newProvider);
    const defaultModel = LLM_PROVIDERS[newProvider]?.defaultModel || '';
    setInputModel(defaultModel);
    setModel(null);
  };

  const handleSave = () => {
    const trimmedKey = inputKey.trim();
    const trimmedModel = inputModel.trim();
    const trimmedProxyUrl = inputProxyUrl.trim();

    if (trimmedKey) {
      setApiKey(trimmedKey);
    } else {
      setApiKey(null);
    }

    if (trimmedModel) {
      setModel(trimmedModel);
    } else {
      setModel(null);
    }

    if (trimmedProxyUrl) {
      setProxyUrl(trimmedProxyUrl);
    }

    const parsedRpm = parseInt(inputRpmLimit, 10);
    if (!isNaN(parsedRpm) && parsedRpm > 0) {
      setRpmLimit(parsedRpm);
    }

    onSettingsChange?.({
      provider,
      apiKey: trimmedKey || null,
      model: trimmedModel || null,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setInputKey('');
    setInputModel('');
    setInputProxyUrl('');
    setInputRpmLimit('');
    clearSettings();
    onSettingsChange?.({ provider: 'zai', apiKey: null, model: null });
    setSaved(false);
    setTestConnection({ loading: false, success: false, error: null });
  };

  const handleTestConnection = async () => {
    const trimmedKey = inputKey.trim();
    const trimmedProxy = inputProxyUrl.trim();
    const trimmedModel = inputModel.trim() || LLM_PROVIDERS[provider]?.defaultModel || '';
    if (!trimmedKey || !trimmedProxy) return;

    setTestConnection({ loading: true, success: false, error: null });

    // FIX: Use AbortController with signal passed to fetch() for REAL timeout.
    // Also use skipProxyRetry to tell the worker not to retry 429s server-side
    // (prevents 12+ seconds of hidden retries before the client gets a response).
    // maxRateLimitRetries: 0 means the client also doesn't retry on 429.
    // Combined: the test connection fails fast with a clear error message.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const client = createLLMClient({
        provider,
        apiKey: trimmedKey,
        model: trimmedModel,
        proxyUrl: trimmedProxy,
      });
      await client.chatCompletion({
        messages: [
          { role: 'user', content: 'Ответь одним словом: работает' },
        ],
        max_tokens: 10,
        maxRateLimitRetries: 0, // No client-side retries — fail fast
        signal: controller.signal, // Real fetch cancellation on timeout
        skipProxyRetry: true, // Tell proxy to skip server-side 429 retries
      });
      clearTimeout(timeoutId);
      setTestConnection({ loading: false, success: true, error: null });
    } catch (err) {
      clearTimeout(timeoutId);
      let msg = err instanceof Error ? err.message : String(err);

      // Handle AbortError (timeout)
      if (err instanceof DOMException && err.name === 'AbortError') {
        msg = 'Таймаут — сервер не ответил за 15 секунд. Проверьте URL прокси и доступность API.';
      } else if (controller.signal.aborted) {
        msg = 'Таймаут — сервер не ответил за 15 секунд. Проверьте URL прокси и доступность API.';
      }

      // Make 429 error more user-friendly
      if (msg.includes('429') || msg.includes('лимит запросов')) {
        msg = 'Лимит запросов (429). Провайдер временно отклоняет запросы. Подождите 1-2 минуты и попробуйте снова. Если проблема повторяется — проверьте лимиты вашего API-ключа в консоли провайдера.';
      }

      // Make proxy errors more user-friendly
      if (msg.includes('ошибка прокси') && !msg.includes('429')) {
        msg = 'Прокси вернул ошибку. Проверьте URL прокси в расширенных настройках и попробуйте снова.';
      }

      setTestConnection({ loading: false, success: false, error: msg });
    }
  };

  const hasKey = !!apiKey;
  const currentProvider = LLM_PROVIDERS[provider];
  const hasFreeTier = ['google', 'groq', 'huggingface', 'openrouter', 'together'].includes(provider);

  // The settings form body — shared between Dialog (desktop) and Sheet (mobile)
  const settingsForm = (
    <>
      <div className="space-y-5 py-4">
          {/* Provider Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {t.settings.provider}
            </Label>
            <Select value={provider} onValueChange={(v) => handleProviderChange(v as LLMProvider)}>
              <SelectTrigger>
                <SelectValue placeholder={t.settings.providerSelect} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {AVAILABLE_PROVIDERS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <div className="flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.hasFreeTier && (
                        <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-1.5 py-0.5 rounded">
                          {t.settings.freeTier}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasFreeTier && (
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {t.settings.freeTierAvailable}
              </p>
            )}
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {t.settings.model}
            </Label>
            <Input
              placeholder={currentProvider?.defaultModel || 'model-name'}
              value={inputModel}
              onChange={(e) => setInputModel(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {t.settings.modelDefault.replace('{model}', currentProvider?.defaultModel || '')}
            </p>
            {currentProvider?.modelDocsUrl && (
              <p className="text-xs">
                <a
                  href={currentProvider.modelDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {t.settings.modelDocsLink}
                </a>
              </p>
            )}
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="api-key" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              {t.settings.apiKey}
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                placeholder={
                  currentProvider?.apiKeyPrefix
                    ? `${currentProvider.apiKeyPrefix}...`
                    : t.settings.apiKeyPlaceholder
                }
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Settings (collapsible) */}
          <div className="border rounded-lg">
            <button
              type="button"
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>{t.settings.advancedSettings}</span>
              {showAdvanced ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {showAdvanced && (
              <div className="px-3 pb-3 space-y-4">
                {/* Proxy URL */}
                <div className="space-y-2">
                  <Label htmlFor="proxy-url" className="flex items-center gap-2 text-xs">
                    <Server className="h-3 w-3" />
                    {t.settings.proxyUrl}
                  </Label>
                  <Input
                    id="proxy-url"
                    type="url"
                    placeholder="https://audit-proxy.your-subdomain.workers.dev"
                    value={inputProxyUrl}
                    onChange={(e) => setInputProxyUrl(e.target.value)}
                    className="text-xs h-8"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t.settings.proxyUrlHintAdvanced}
                  </p>
                  {inputProxyUrl && isProxyUrlPlaceholder(inputProxyUrl) && (
                    <Alert className="bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900">
                      <AlertDescription className="text-yellow-700 dark:text-yellow-300 text-xs">
                        {t.settings.proxyUrlPlaceholder}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* RPM Limit */}
                <div className="space-y-2">
                  <Label htmlFor="rpm-limit" className="flex items-center gap-2 text-xs">
                    <Zap className="h-3 w-3" />
                    {t.settings.rpmLimit}
                  </Label>
                  <Input
                    id="rpm-limit"
                    type="number"
                    min={1}
                    max={120}
                    placeholder={String(rpmLimit || 10)}
                    value={inputRpmLimit}
                    onChange={(e) => setInputRpmLimit(e.target.value)}
                    className="text-xs h-8"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t.settings.rpmLimitHint}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Test Connection Button — fails fast (15s timeout, no retries) */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleTestConnection}
              disabled={!inputKey.trim() || testConnection.loading}
            >
              {testConnection.loading ? (
                <>
                  <span className="animate-spin mr-2">&#9203;</span>
                  {t.settings.testing}
                </>
              ) : testConnection.success ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {t.settings.testSuccess}
                </>
              ) : testConnection.error ? (
                <>
                  {t.settings.testFailed}
                </>
              ) : (
                t.settings.testConnection
              )}
            </Button>
            {testConnection.loading && (
              <p className="text-xs text-muted-foreground text-center">
                Проверяем подключение (таймаут 15 сек)...
              </p>
            )}
            {testConnection.error && (
              <p className="text-xs text-red-500">{testConnection.error}</p>
            )}
          </div>

          {/* Status indicator */}
          {hasKey && !testConnection.loading && (
            <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-700 dark:text-green-300 text-sm">
                {t.settings.apiKeyConfigured.replace('{provider}', currentProvider?.name || '')}
              </AlertDescription>
            </Alert>
          )}

          {/* Instructions */}
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <h4 className="text-sm font-medium">{t.settings.howToGetKey}</h4>

            <div className="text-sm text-muted-foreground space-y-2">
              {(() => {
                const instructions = t.settings.providerInstructions[provider as keyof typeof t.settings.providerInstructions];
                if (!instructions) return null;
                return (
                  <ol className="list-decimal list-inside space-y-1">
                    <li dangerouslySetInnerHTML={{ __html: instructions.step1 }} />
                    <li>{instructions.step2}</li>
                    {instructions.step3 && <li>{instructions.step3}</li>}
                  </ol>
                );
              })()}
            </div>

            <p className="text-xs text-muted-foreground pt-2 border-t">
              {t.settings.keySecurityNote}
            </p>
          </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={!inputKey && !hasKey}
          className="w-full sm:w-auto"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {t.app.clear}
        </Button>
        <Button
          onClick={handleSave}
          disabled={saved}
          className="w-full sm:w-auto"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              {t.app.saved}
            </>
          ) : (
            t.app.save
          )}
        </Button>
      </div>
    </>
  );

  // Desktop: Dialog (modal), Mobile: Sheet (fullscreen side panel)
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" title={t.app.settings}>
            <Settings className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[95vh] rounded-t-xl p-0">
          <SheetHeader className="px-4 pt-4 pb-0">
            <SheetTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {t.settings.title}
            </SheetTitle>
            <SheetDescription>
              {t.settings.description}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 overflow-y-auto px-4">
            {settingsForm}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title={t.app.settings}>
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto max-w-[95vw] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t.settings.title}
          </DialogTitle>
          <DialogDescription>
            {t.settings.description}
          </DialogDescription>
        </DialogHeader>
        {settingsForm}
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!inputKey && !hasKey}
            className="w-full sm:w-auto"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {t.app.clear}
          </Button>
          <Button
            onClick={handleSave}
            disabled={saved}
            className="w-full sm:w-auto"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                {t.app.saved}
              </>
            ) : (
              t.app.save
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
