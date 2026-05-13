'use client';

import * as React from 'react';
import { useAuditState } from '@/hooks/useAuditState';
import { AuditForm } from '@/components/audit/AuditForm';
import { AuditProgress } from '@/components/audit/AuditProgress';
import { ChecklistDisplay } from '@/components/audit/ChecklistDisplay';
// Lazy-load heavy components for performance (plan §5.3)
const GriefArchitectureMatrix = React.lazy(() =>
  import('@/components/audit/GriefArchitectureMatrix').then(m => ({ default: m.GriefArchitectureMatrix }))
);
const ReportDisplay = React.lazy(() =>
  import('@/components/audit/ReportDisplay').then(m => ({ default: m.ReportDisplay }))
);
import { GateResults } from '@/components/audit/GateResult';
import { IssueList } from '@/components/audit/IssueList';
import { WhatForChains } from '@/components/audit/WhatForChains';
import { GenerativeOutputDisplay } from '@/components/audit/GenerativeOutput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import {
  BookOpen,
  Moon,
  Sun,
  Sparkles,
  FileText,
  ListChecks,
  Heart,
  BarChart3,
  RotateCcw,
  AlertTriangle,
  Link2,
} from 'lucide-react';
import type { AuditPhase } from '@/lib/audit/types';
import { runAuditPipeline, resumeAuditFromStep, type PipelineState } from '@/lib/audit/pipeline';
import { SettingsDialog } from '@/components/audit/SettingsDialog';
import { BlockedState } from '@/components/audit/BlockedState';
import { useSettings } from '@/hooks/useSettings';
import { t } from '@/lib/i18n/ru';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  // =========================================================================
  // HYDRATION GUARD: Prevents React Error #185 (hydration mismatch)
  //
  // In a static-export Next.js app, the server HTML is rendered at build time
  // with default Zustand state. On the client, Zustand's persist middleware
  // would rehydrate from localStorage during the initial render, causing a
  // mismatch with the server HTML. We prevent this by:
  //   1. Using skipHydration: true in useAuditState (see useAuditState.ts)
  //   2. Calling rehydrate() in useEffect (AFTER hydration completes)
  //   3. Showing a minimal shell until rehydration finishes
  //
  // This ensures the server HTML and client's first render are identical.
  // =========================================================================
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    // Rehydrate Zustand persisted state AFTER initial render
    useAuditState.persist.rehydrate();
  }, []);

  React.useEffect(() => {
    // Wait for Zustand persist to finish rehydration
    const unsubFinishHydration = useAuditState.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // If already hydrated (e.g. rehydrate was synchronous), set immediately
    if (useAuditState.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsubFinishHydration;
  }, []);

  // =========================================================================
  // Zustand: select specific state slices to minimize re-renders
  // =========================================================================
  const phase = useAuditState(s => s.phase);
  const inputText = useAuditState(s => s.inputText);
  const mediaType = useAuditState(s => s.mediaType);
  const auditMode = useAuditState(s => s.auditMode);
  const authorAnswers = useAuditState(s => s.authorAnswers);
  const isLoading = useAuditState(s => s.isLoading);
  const error = useAuditState(s => s.error);
  const issues = useAuditState(s => s.issues);
  const whatForChains = useAuditState(s => s.whatForChains);
  const generativeOutput = useAuditState(s => s.generativeOutput);

  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
  const [abortController, setAbortController] = React.useState<AbortController | null>(null);
  const { provider, apiKey, model, proxyUrl, rpmLimit, loadSettings, isLoaded } = useSettings();

  // Load settings on mount
  React.useEffect(() => {
    if (!isLoaded) {
      loadSettings();
    }
  }, [isLoaded, loadSettings]);

  // Toggle theme
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Run full audit analysis via client-side pipeline
  const startAudit = async () => {
    if (!inputText.trim()) return;

    if (!apiKey) {
      useAuditState.getState().setError(t.errors.noApiKey);
      useAuditState.getState().setPhase('failed');
      return;
    }

    if (!proxyUrl) {
      useAuditState.getState().setError(t.errors.proxy);
      useAuditState.getState().setPhase('failed');
      return;
    }

    // Create abort controller for cancellation support
    const controller = new AbortController();
    setAbortController(controller);

    const store = useAuditState.getState();
    store.setLoading(true);
    store.setError(null);
    store.setPhase('input_validation');

    // Capture controller in local variable to avoid stale closure in catch
    const currentController = controller;

    try {
      const result = await runAuditPipeline(
        {
          narrative: inputText,
          mediaType,
          authorAnswers: authorAnswers ?? undefined,
          rpmLimit,
        },
        {
          provider,
          apiKey,
          model,
          proxyUrl,
        },
        (phase: AuditPhase, state: PipelineState) => {
          // Per-step progress callback — update Zustand store in real time
          // so the user sees intermediate results (skeleton, gates, etc.)
          // as each pipeline step completes, not only after the entire run.
          // Use getState() to avoid stale closures over the store
          const s = useAuditState.getState();
          s.setPhase(phase);

          // Preserve original inputText in Zustand for correct resume
          if (state.inputText) {
            const currentInputText = s.inputText;
            if (!currentInputText && state.inputText) {
              s.setInputText(state.inputText);
            }
          }

          if (state.auditMode) s.setAuditMode(state.auditMode);
          if (state.authorProfile) s.setAuthorProfile(state.authorProfile);
          if (state.skeleton) s.setSkeleton(state.skeleton);
          if (state.screeningResult) s.setScreeningResult(state.screeningResult);
          if (state.gateResults) {
            if (state.gateResults.L1) s.setGateResult('L1', state.gateResults.L1);
            if (state.gateResults.L2) s.setGateResult('L2', state.gateResults.L2);
            if (state.gateResults.L3) s.setGateResult('L3', state.gateResults.L3);
            if (state.gateResults.L4) s.setGateResult('L4', state.gateResults.L4);
          }
          if (state.griefMatrix) s.setGriefMatrix(state.griefMatrix);
          if (state.issues && state.issues.length > 0) s.setIssues(state.issues);
          if (state.whatForChains && state.whatForChains.length > 0) s.setWhatForChains(state.whatForChains);
          if (state.generativeOutput) s.setGenerativeOutput(state.generativeOutput);
          if (state.nextActions && state.nextActions.length > 0) s.setNextActions(state.nextActions);
          if (state.finalScore) s.setFinalScore(state.finalScore);
          if (state.checklist && state.checklist.length > 0) s.setChecklist(state.checklist);
          // Timing & blocked info
          if (state.blockedAt) s.setBlockedAt(state.blockedAt);
          if (state.elapsedMs) s.setElapsedMs(state.elapsedMs);
          if (state.stepTimings && Object.keys(state.stepTimings).length > 0) s.setStepTimings(state.stepTimings);
        },
        controller.signal,
      );

      // Update state with pipeline results
      const s = useAuditState.getState();
      if (result.authorProfile) s.setAuthorProfile(result.authorProfile);
      if (result.skeleton) s.setSkeleton(result.skeleton);
      if (result.screeningResult) s.setScreeningResult(result.screeningResult);
      if (result.gateResults) {
        if (result.gateResults.L1) s.setGateResult('L1', result.gateResults.L1);
        if (result.gateResults.L2) s.setGateResult('L2', result.gateResults.L2);
        if (result.gateResults.L3) s.setGateResult('L3', result.gateResults.L3);
        if (result.gateResults.L4) s.setGateResult('L4', result.gateResults.L4);
      }
      if (result.issues && result.issues.length > 0) s.setIssues(result.issues);
      if (result.whatForChains && result.whatForChains.length > 0) s.setWhatForChains(result.whatForChains);
      if (result.generativeOutput) s.setGenerativeOutput(result.generativeOutput);
      if (result.nextActions && result.nextActions.length > 0) s.setNextActions(result.nextActions);
      if (result.finalScore) s.setFinalScore(result.finalScore);

      // Set phase based on result
      if (result.error) {
        s.setPhase(result.phase === 'blocked' ? 'blocked' : 'failed');
        s.setError(result.error);
      } else {
        s.setPhase('complete');
      }

    } catch (err) {
      // Check if cancelled — use local variable to avoid stale closure
      if (currentController.signal.aborted) {
        // Defer state updates to avoid React Error #185
        // (state update during render of a different component)
        queueMicrotask(() => {
          useAuditState.getState().setPhase('cancelled');
          useAuditState.getState().setError(null);
        });
      } else {
        const errorMessage = err instanceof Error ? err.message : t.errors.unknown;
        // Defer state updates to avoid React Error #185
        queueMicrotask(() => {
          useAuditState.getState().setError(errorMessage);
          useAuditState.getState().setPhase('failed');
        });
      }
    } finally {
      // Defer loading state update as well for consistency
      queueMicrotask(() => {
        useAuditState.getState().setLoading(false);
      });
      setAbortController(null);
    }
  };

  // Cancel running audit
  const cancelAudit = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
  };

  // Resume audit from a blocked step
  const resumeAudit = async (fromStep: AuditPhase) => {
    if (!apiKey) {
      useAuditState.getState().setError(t.errors.noApiKey);
      return;
    }
    if (!proxyUrl) {
      useAuditState.getState().setError(t.errors.proxy);
      return;
    }

    const controller = new AbortController();
    setAbortController(controller);

    const store = useAuditState.getState();
    store.setLoading(true);
    store.setError(null);
    store.setBlockedAt(null);
    store.setPhase(fromStep);

    try {
      // Build current state from Zustand store for resume
      // Include original inputText so resumeAuditFromStep can reconstruct
      // the correct PipelineRunState without falling back to skeleton recovery
      const fullState = store;
      const currentState: PipelineState = {
        inputText: fullState.inputText,
        auditMode,
        authorProfile: fullState.authorProfile,
        skeleton: fullState.skeleton,
        screeningResult: fullState.screeningResult,
        gateResults: fullState.gateResults,
        checklist: fullState.checklist,
        griefMatrix: fullState.griefMatrix,
        report: fullState.report,
        issues,
        whatForChains,
        generativeOutput,
        nextActions: fullState.nextActions,
        finalScore: fullState.finalScore,
        phase: fromStep,
        blockedAt: null,
        error: null,
        elapsedMs: 0,
        stepTimings: fullState.stepTimings,
      };

      const result = await resumeAuditFromStep(
        currentState,
        fromStep,
        { provider, apiKey, model, proxyUrl },
        (phase: AuditPhase, state: PipelineState) => {
          const s = useAuditState.getState();
          s.setPhase(phase);
          if (state.auditMode) s.setAuditMode(state.auditMode);
          if (state.authorProfile) s.setAuthorProfile(state.authorProfile);
          if (state.skeleton) s.setSkeleton(state.skeleton);
          if (state.screeningResult) s.setScreeningResult(state.screeningResult);
          if (state.gateResults) {
            if (state.gateResults.L1) s.setGateResult('L1', state.gateResults.L1);
            if (state.gateResults.L2) s.setGateResult('L2', state.gateResults.L2);
            if (state.gateResults.L3) s.setGateResult('L3', state.gateResults.L3);
            if (state.gateResults.L4) s.setGateResult('L4', state.gateResults.L4);
          }
          if (state.griefMatrix) s.setGriefMatrix(state.griefMatrix);
          if (state.issues && state.issues.length > 0) s.setIssues(state.issues);
          if (state.whatForChains && state.whatForChains.length > 0) s.setWhatForChains(state.whatForChains);
          if (state.generativeOutput) s.setGenerativeOutput(state.generativeOutput);
          if (state.nextActions && state.nextActions.length > 0) s.setNextActions(state.nextActions);
          if (state.finalScore) s.setFinalScore(state.finalScore);
          if (state.checklist && state.checklist.length > 0) s.setChecklist(state.checklist);
          if (state.blockedAt) s.setBlockedAt(state.blockedAt);
          if (state.elapsedMs) s.setElapsedMs(state.elapsedMs);
          if (state.stepTimings && Object.keys(state.stepTimings).length > 0) s.setStepTimings(state.stepTimings);
        },
        controller.signal,
        rpmLimit,
      );

      // Update with final results
      const s = useAuditState.getState();
      if (result.authorProfile) s.setAuthorProfile(result.authorProfile);
      if (result.skeleton) s.setSkeleton(result.skeleton);
      if (result.screeningResult) s.setScreeningResult(result.screeningResult);
      if (result.gateResults) {
        if (result.gateResults.L1) s.setGateResult('L1', result.gateResults.L1);
        if (result.gateResults.L2) s.setGateResult('L2', result.gateResults.L2);
        if (result.gateResults.L3) s.setGateResult('L3', result.gateResults.L3);
        if (result.gateResults.L4) s.setGateResult('L4', result.gateResults.L4);
      }
      if (result.issues && result.issues.length > 0) s.setIssues(result.issues);
      if (result.whatForChains && result.whatForChains.length > 0) s.setWhatForChains(result.whatForChains);
      if (result.generativeOutput) s.setGenerativeOutput(result.generativeOutput);
      if (result.nextActions && result.nextActions.length > 0) s.setNextActions(result.nextActions);
      if (result.finalScore) s.setFinalScore(result.finalScore);
      if (result.blockedAt) s.setBlockedAt(result.blockedAt);
      if (result.elapsedMs) s.setElapsedMs(result.elapsedMs);
      if (result.stepTimings && Object.keys(result.stepTimings).length > 0) s.setStepTimings(result.stepTimings);

      if (result.error) {
        s.setPhase(result.phase === 'blocked' ? 'blocked' : 'failed');
        s.setError(result.error);
      } else {
        s.setPhase('complete');
      }
    } catch (err) {
      if (controller.signal.aborted) {
        // Defer state updates to avoid React Error #185
        queueMicrotask(() => {
          useAuditState.getState().setPhase('cancelled');
          useAuditState.getState().setError(null);
        });
      } else {
        const errorMessage = err instanceof Error ? err.message : t.errors.unknown;
        queueMicrotask(() => {
          useAuditState.getState().setError(errorMessage);
          useAuditState.getState().setPhase('failed');
        });
      }
    } finally {
      queueMicrotask(() => {
        useAuditState.getState().setLoading(false);
      });
      setAbortController(null);
    }
  };

  // Hydration guard: show minimal shell until Zustand persist rehydrates
  // This prevents both React Error #185 and flash of incorrect content
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <Sparkles className="h-8 w-8 text-amber-500 mx-auto animate-pulse" />
          <p className="text-sm text-muted-foreground">{t.progress.processing}</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <div>
              <h1 className="text-xl font-bold">{t.app.title}</h1>
              <p className="text-xs text-muted-foreground">{t.app.version}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:flex">
              <BookOpen className="h-3 w-3 mr-1" />
              {t.app.criteriaCount}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <SettingsDialog />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => useAuditState.getState().reset()}
              disabled={isLoading}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {phase === 'idle' ? (
          /* Input Form Phase */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">{t.app.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.homeDescription}
              </p>
            </div>

            {/* Protocol Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { level: 'L1', name: t.levels.L1.name, question: t.levels.L1.question, icon: '\u2699\uFE0F' },
                { level: 'L2', name: t.levels.L2.name, question: t.levels.L2.question, icon: '\uD83E\uDEC0' },
                { level: 'L3', name: t.levels.L3.name, question: t.levels.L3.question, icon: '\uD83E\uDDE0' },
                { level: 'L4', name: t.levels.L4.name, question: t.levels.L4.question, icon: '\uD83E\uDE9E' },
              ].map((item) => (
                <Card key={item.level} className="text-center">
                  <CardHeader className="pb-2">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <CardTitle className="text-sm">{item.level}: {item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground">{item.question}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <AuditForm onStartAudit={startAudit} />
          </div>
        ) : (
          /* Analysis Phase — responsive layout */
          <>
            {/* Mobile: stacked single column. Desktop: resizable panels. */}

            {/* --- Mobile layout (≤640px): stacked --- */}
            <div className="block sm:hidden space-y-4">
              {/* Compact progress bar for mobile */}
              <AuditProgress />

              {/* Quick Stats — compact */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t.config.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.config.media}:</span>
                    <Badge variant="outline">{mediaType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.config.mode}:</span>
                    <Badge variant="outline">{auditMode || t.config.modeDetecting}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.config.input}:</span>
                    <span>{t.config.characters.replace('{count}', String(inputText.length))}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Cancel / Reset */}
              <div className="flex gap-2">
                {isLoading && (
                  <Button variant="destructive" className="flex-1" onClick={cancelAudit}>
                    {t.app.cancelAudit}
                  </Button>
                )}
                <Button variant="outline" className="flex-1" onClick={() => useAuditState.getState().reset()} disabled={isLoading}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {t.app.newAudit}
                </Button>
              </div>

              {/* Blocked state */}
              {phase === 'blocked' && <BlockedState onResume={resumeAudit} />}

              {/* Results tabs — scrollable on mobile */}
              <Tabs defaultValue="report">
                <TabsList className="w-full flex-wrap h-auto gap-1">
                  <TabsTrigger value="report" className="flex items-center gap-1 text-xs">
                    <FileText className="h-3 w-3" />
                    {t.tabs.report}
                  </TabsTrigger>
                  <TabsTrigger value="gates" className="flex items-center gap-1 text-xs">
                    <BarChart3 className="h-3 w-3" />
                    {t.tabs.gates}
                  </TabsTrigger>
                  <TabsTrigger value="issues" className="flex items-center gap-1 text-xs">
                    <AlertTriangle className="h-3 w-3" />
                    {t.tabs.issues}
                    {issues.length > 0 && (
                      <Badge variant="destructive" className="ml-1 h-4 px-1 text-xs">
                        {issues.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="chains" className="flex items-center gap-1 text-xs">
                    <Link2 className="h-3 w-3" />
                    {t.tabs.chains}
                  </TabsTrigger>
                  <TabsTrigger value="generative" className="flex items-center gap-1 text-xs">
                    <Sparkles className="h-3 w-3" />
                    {t.tabs.generative}
                  </TabsTrigger>
                  <TabsTrigger value="checklist" className="flex items-center gap-1 text-xs">
                    <ListChecks className="h-3 w-3" />
                    {t.tabs.checklist}
                  </TabsTrigger>
                  <TabsTrigger value="grief" className="flex items-center gap-1 text-xs">
                    <Heart className="h-3 w-3" />
                    {t.tabs.grief}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="report"><React.Suspense fallback={<div className="p-8 text-center text-muted-foreground">{t.progress.processing}</div>}><ReportDisplay /></React.Suspense></TabsContent>
                <TabsContent value="gates"><GateResults /></TabsContent>
                <TabsContent value="issues"><IssueList issues={issues} /></TabsContent>
                <TabsContent value="chains"><WhatForChains chains={whatForChains} /></TabsContent>
                <TabsContent value="generative"><GenerativeOutputDisplay output={generativeOutput} /></TabsContent>
                <TabsContent value="checklist"><ChecklistDisplay /></TabsContent>
                <TabsContent value="grief"><React.Suspense fallback={<div className="p-8 text-center text-muted-foreground">{t.progress.processing}</div>}><GriefArchitectureMatrix /></React.Suspense></TabsContent>
              </Tabs>
            </div>

            {/* --- Desktop layout (≥640px): resizable panels --- */}
            <div className="hidden sm:block">
              <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-8rem)]">
                {/* Left Panel - Progress & Input Summary */}
                <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                  <div className="p-4 space-y-4 h-full overflow-auto">
                    <AuditProgress />

                    {/* Quick Stats */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{t.config.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.config.media}:</span>
                          <Badge variant="outline">{mediaType}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.config.mode}:</span>
                          <Badge variant="outline">{auditMode || t.config.modeDetecting}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.config.input}:</span>
                          <span>{t.config.characters.replace('{count}', String(inputText.length))}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Cancel / Reset Buttons */}
                    <div className="space-y-2">
                      {isLoading && (
                        <Button variant="destructive" className="w-full" onClick={cancelAudit}>
                          {t.app.cancelAudit}
                        </Button>
                      )}
                      <Button variant="outline" className="w-full" onClick={() => useAuditState.getState().reset()} disabled={isLoading}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {t.app.newAudit}
                      </Button>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Right Panel - Results */}
                <ResizablePanel defaultSize={75}>
                  <div className="p-4 h-full overflow-auto">
                    {/* Show blocked state prominently when blocked */}
                    {phase === 'blocked' && <div className="mb-4"><BlockedState onResume={resumeAudit} /></div>}

                    <Tabs defaultValue="report" className="h-full">
                      <TabsList className="mb-4 flex-wrap h-auto gap-1">
                        <TabsTrigger value="report" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {t.tabs.report}
                        </TabsTrigger>
                        <TabsTrigger value="gates" className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4" />
                          {t.tabs.gates}
                        </TabsTrigger>
                        <TabsTrigger value="issues" className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          {t.tabs.issues}
                          {issues.length > 0 && (
                            <Badge variant="destructive" className="ml-1 h-4 px-1 text-xs">
                              {issues.length}
                            </Badge>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="chains" className="flex items-center gap-1">
                          <Link2 className="h-4 w-4" />
                          {t.tabs.chains}
                        </TabsTrigger>
                        <TabsTrigger value="generative" className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4" />
                          {t.tabs.generative}
                        </TabsTrigger>
                        <TabsTrigger value="checklist" className="flex items-center gap-1">
                          <ListChecks className="h-4 w-4" />
                          {t.tabs.checklist}
                        </TabsTrigger>
                        <TabsTrigger value="grief" className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {t.tabs.grief}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="report" className="h-full">
                        <React.Suspense fallback={<div className="p-8 text-center text-muted-foreground">{t.progress.processing}</div>}><ReportDisplay /></React.Suspense>
                      </TabsContent>

                      <TabsContent value="gates" className="h-full">
                        <GateResults />
                      </TabsContent>

                      <TabsContent value="issues" className="h-full">
                        <IssueList issues={issues} />
                      </TabsContent>

                      <TabsContent value="chains" className="h-full">
                        <WhatForChains chains={whatForChains} />
                      </TabsContent>

                      <TabsContent value="generative" className="h-full">
                        <GenerativeOutputDisplay output={generativeOutput} />
                      </TabsContent>

                      <TabsContent value="checklist" className="h-full">
                        <ChecklistDisplay />
                      </TabsContent>

                      <TabsContent value="grief" className="h-full">
                        <React.Suspense fallback={<div className="p-8 text-center text-muted-foreground">{t.progress.processing}</div>}><GriefArchitectureMatrix /></React.Suspense>
                      </TabsContent>
                    </Tabs>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <p>{t.app.footer}</p>
          <div className="flex items-center gap-4">
            <span>{t.app.footerStats}</span>
          </div>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}
