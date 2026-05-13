// Universe Audit Protocol v10.0 - State Management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  AuditState, 
  AuditPhase,
  MediaType,
  AuditMode,
  AuthorProfileAnswers,
  AuthorProfile,
  Skeleton,
  ScreeningResult,
  GateResult,
  ChecklistItem,
  GriefArchitectureMatrix,
  AuditReport,
  Issue,
  ChainResult,
  GenerativeOutput,
  NextAction
} from '@/lib/audit/types';
import { MASTER_CHECKLIST } from '@/lib/audit/protocol-data';
import { filterByMediaType } from '@/lib/audit/scoring-algorithm';

// Initial state values
const initialState = {
  phase: 'idle' as AuditPhase,
  inputText: '',
  mediaType: 'game' as MediaType,
  auditMode: null as AuditMode | null,
  authorAnswers: null as AuthorProfileAnswers | null,
  authorProfile: null as AuthorProfile | null,
  skeleton: null as Skeleton | null,
  screeningResult: null as ScreeningResult | null,
  gateResults: {
    L1: null as GateResult | null,
    L2: null as GateResult | null,
    L3: null as GateResult | null,
    L4: null as GateResult | null,
  },
  checklist: [...MASTER_CHECKLIST] as ChecklistItem[],
  griefMatrix: null as GriefArchitectureMatrix | null,
  report: null as AuditReport | null,
  // New state for v10.0 integration
  issues: [] as Issue[],
  whatForChains: [] as ChainResult[],
  generativeOutput: null as GenerativeOutput | null,
  nextActions: [] as NextAction[],
  finalScore: null as { total: string; percentage: number; by_level: Record<string, number> } | null,
  isLoading: false,
  error: null as string | null,
  // Timing & resume fields
  blockedAt: null as string | null,
  elapsedMs: 0,
  stepTimings: {} as Partial<Record<import('@/lib/audit/types').AuditPhase, number>>,
};

const AUDIT_STATE_STORAGE_KEY = 'universe-audit-state';

export const useAuditState = create<AuditState>()(
  persist(
    (set, get) => ({
  ...initialState,

  // Setters
  setPhase: (phase: AuditPhase) => set({ phase }),
  
  setInputText: (inputText: string) => set({ inputText }),
  
  setMediaType: (mediaType: MediaType) => {
    // Re-filter checklist when media type changes
    const checklist = filterByMediaType([...MASTER_CHECKLIST], mediaType);
    set({ mediaType, checklist });
  },
  
  setAuditMode: (auditMode: AuditMode | null) => set({ auditMode }),
  
  setAuthorAnswers: (authorAnswers: AuthorProfileAnswers | null) => set({ authorAnswers }),
  
  setAuthorProfile: (authorProfile: AuthorProfile | null) => set({ authorProfile }),
  
  setSkeleton: (skeleton: Skeleton | null) => set({ skeleton }),
  
  setScreeningResult: (screeningResult: ScreeningResult | null) => set({ screeningResult }),
  
  setGateResult: (level: 'L1' | 'L2' | 'L3' | 'L4', result: GateResult) => {
    set(state => ({
      gateResults: {
        ...state.gateResults,
        [level]: result,
      },
    }));
  },
  
  setChecklist: (checklist: ChecklistItem[]) => set({ checklist }),
  
  updateChecklistItem: (id: string, updates: Partial<ChecklistItem>) => {
    set(state => ({
      checklist: state.checklist.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },
  
  setGriefMatrix: (griefMatrix: GriefArchitectureMatrix | null) => set({ griefMatrix }),
  
  setReport: (report: AuditReport | null) => set({ report }),
  
  // New setters for v10.0 integration
  setIssues: (issues: Issue[]) => set({ issues }),
  
  addIssue: (issue: Issue) => set(state => ({
    issues: [...state.issues, issue]
  })),
  
  setWhatForChains: (whatForChains: ChainResult[]) => set({ whatForChains }),
  
  setGenerativeOutput: (generativeOutput: GenerativeOutput | null) => set({ generativeOutput }),
  
  setNextActions: (nextActions: NextAction[]) => set({ nextActions }),
  
  setFinalScore: (finalScore: { total: string; percentage: number; by_level: Record<string, number> } | null) => set({ finalScore }),
  
  setLoading: (isLoading: boolean) => set({ isLoading }),
  
  setError: (error: string | null) => set({ error }),
  
  setBlockedAt: (blockedAt: string | null) => set({ blockedAt }),
  
  setElapsedMs: (elapsedMs: number) => set({ elapsedMs }),
  
  setStepTimings: (stepTimings: Partial<Record<import('@/lib/audit/types').AuditPhase, number>>) => set({ stepTimings }),
  
  reset: () => {
    set({
      ...initialState,
      checklist: filterByMediaType([...MASTER_CHECKLIST], initialState.mediaType),
    });
  },
}),
    {
      name: AUDIT_STATE_STORAGE_KEY,
      // CRITICAL: skipHydration prevents React Error #185 (hydration mismatch).
      // In a static-export Next.js app (output: 'export'), the server renders
      // HTML with default state at build time. Without skipHydration, Zustand's
      // persist middleware rehydrates from localStorage DURING the initial render,
      // causing the client's first render to differ from the server HTML.
      // By skipping auto-hydration and calling rehydrate() in useEffect (see page.tsx),
      // we ensure the server HTML and client's first render are identical.
      skipHydration: true,
      // Only persist these fields — exclude isLoading and setter functions
      partialize: (state) => ({
        phase: state.phase,
        inputText: state.inputText,
        mediaType: state.mediaType,
        auditMode: state.auditMode,
        authorAnswers: state.authorAnswers,
        authorProfile: state.authorProfile,
        skeleton: state.skeleton,
        screeningResult: state.screeningResult,
        gateResults: state.gateResults,
        checklist: state.checklist,
        griefMatrix: state.griefMatrix,
        report: state.report,
        issues: state.issues,
        whatForChains: state.whatForChains,
        generativeOutput: state.generativeOutput,
        nextActions: state.nextActions,
        finalScore: state.finalScore,
        error: state.error,
        blockedAt: state.blockedAt,
        elapsedMs: state.elapsedMs,
        stepTimings: state.stepTimings,
      }),
      // On hydration, reset non-idle states to prevent stale UI.
      // Previously only terminal states (failed/blocked/cancelled) were reset,
      // but mid-pipeline phases (mode_detection, screening, etc.) left from
      // a crashed/abandoned session would show a frozen progress bar with no
      // actual pipeline running behind it.
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            // Only 'idle' and 'complete' are safe states to restore.
            // Everything else means the pipeline was interrupted.
            const safePhases: AuditPhase[] = ['idle', 'complete'];
            if (!safePhases.includes(state.phase)) {
              queueMicrotask(() => {
                useAuditState.setState({
                  phase: 'idle',
                  error: null,
                  isLoading: false,
                  blockedAt: null,
                });
              });
            }
          }
        };
      },
    }
  )
);

// Selectors for derived state
export const selectCurrentPhase = (state: AuditState) => state.phase;

export const selectHasPassedGate = (level: 'L1' | 'L2' | 'L3' | 'L4') => (state: AuditState) => {
  const result = state.gateResults[level];
  return result?.passed ?? false;
};

export const selectOverallProgress = (state: AuditState) => {
  const phases: AuditPhase[] = [
    'idle',
    'input_validation',
    'mode_detection',
    'author_profile',
    'skeleton_extraction',
    'screening',
    'L1_evaluation',
    'L2_evaluation',
    'L3_evaluation',
    'L4_evaluation',
    'issue_generation',
    'generative_modules',
    'final_output',
    'complete',
    'failed',
  ];
  
  const currentIndex = phases.indexOf(state.phase);
  // Exclude terminal states (idle, failed, blocked, cancelled) from progress
  const terminalStates = ['idle', 'failed', 'blocked', 'cancelled'];
  const total = phases.filter(p => !terminalStates.includes(p)).length;
  
  // If in terminal state, find the effective progress position
  const effectiveIndex = terminalStates.includes(state.phase) 
    ? currentIndex > 0 ? currentIndex - 1 : 0 
    : currentIndex;
  
  return {
    current: effectiveIndex,
    total,
    percentage: Math.round((effectiveIndex / total) * 100),
  };
};

export const selectChecklistStats = (state: AuditState) => {
  const applicable = state.checklist.filter(i => i.applicable);
  const passed = applicable.filter(i => i.status === 'PASS').length;
  const failed = applicable.filter(i => i.status === 'FAIL').length;
  const insufficient = applicable.filter(i => i.status === 'INSUFFICIENT_DATA').length;
  const pending = applicable.filter(i => i.status === 'PENDING').length;
  
  return {
    total: applicable.length,
    passed,
    failed,
    insufficient,
    pending,
    score: applicable.length > 0 ? Math.round((passed / applicable.length) * 100) : 0,
  };
};

export const selectGateStatus = (state: AuditState) => {
  return {
    L1: state.gateResults.L1 ? {
      score: state.gateResults.L1.score,
      passed: state.gateResults.L1.passed,
      evaluated: true,
    } : { score: 0, passed: false, evaluated: false },
    L2: state.gateResults.L2 ? {
      score: state.gateResults.L2.score,
      passed: state.gateResults.L2.passed,
      evaluated: true,
    } : { score: 0, passed: false, evaluated: false },
    L3: state.gateResults.L3 ? {
      score: state.gateResults.L3.score,
      passed: state.gateResults.L3.passed,
      evaluated: true,
    } : { score: 0, passed: false, evaluated: false },
    L4: state.gateResults.L4 ? {
      score: state.gateResults.L4.score,
      passed: state.gateResults.L4.passed,
      evaluated: true,
    } : { score: 0, passed: false, evaluated: false },
  };
};

// Hook for getting applicable checklist for current media type
export const useApplicableChecklist = () => {
  const checklist = useAuditState(state => state.checklist);
  return checklist.filter(item => item.applicable);
};

// Hook for getting checklist grouped by block
export const useChecklistByBlock = () => {
  const checklist = useApplicableChecklist();
  
  const grouped = checklist.reduce((acc, item) => {
    if (!acc[item.block]) {
      acc[item.block] = [];
    }
    acc[item.block].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);
  
  return grouped;
};

// Hook for gate failures
export const useGateFailures = () => {
  const gateResults = useAuditState(state => state.gateResults);
  
  const failures: Array<{ level: 'L1' | 'L2' | 'L3' | 'L4'; result: GateResult }> = [];
  
  (['L1', 'L2', 'L3', 'L4'] as const).forEach(level => {
    const result = gateResults[level];
    if (result && !result.passed) {
      failures.push({ level, result });
    }
  });
  
  return failures;
};
