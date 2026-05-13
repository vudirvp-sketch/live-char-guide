'use client';

import * as React from 'react';
import { useAuditState } from '@/hooks/useAuditState';
import { MEDIA_TYPE_LABELS, AUTHOR_QUESTIONS, AUDIT_MODE_DESCRIPTIONS } from '@/lib/audit/protocol-data';
import { classifyAuthorProfile } from '@/lib/audit/scoring-algorithm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Sparkles, BookOpen, Film, Gamepad2, Tv, Dices } from 'lucide-react';
import type { MediaType, AuditMode, AuthorProfileAnswers } from '@/lib/audit/types';
import { t } from '@/lib/i18n/ru';

const mediaIcons: Record<MediaType, React.ReactNode> = {
  game: <Gamepad2 className="h-4 w-4" />,
  novel: <BookOpen className="h-4 w-4" />,
  film: <Film className="h-4 w-4" />,
  anime: <Film className="h-4 w-4" />,
  series: <Tv className="h-4 w-4" />,
  ttrpg: <Dices className="h-4 w-4" />,
};

interface AuditFormProps {
  /** Callback to actually start the audit pipeline (calls runAuditPipeline). */
  onStartAudit?: () => void;
}

export function AuditForm({ onStartAudit }: AuditFormProps) {
  const {
    inputText,
    setInputText,
    mediaType,
    setMediaType,
    auditMode,
    setAuditMode,
    authorAnswers,
    setAuthorAnswers,
    setAuthorProfile,
    isLoading,
  } = useAuditState();

  const [authorQuizExpanded, setAuthorQuizExpanded] = React.useState(false);

  // Debounce text input to avoid excessive Zustand writes on every keystroke
  const [localInput, setLocalInput] = React.useState(inputText);
  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local input when external inputText changes (e.g. on reset)
  React.useEffect(() => {
    setLocalInput(inputText);
  }, [inputText]);

  const handleInputTextChange = (value: string) => {
    setLocalInput(value);
    // Debounce Zustand write: 300ms after last keystroke
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setInputText(value);
    }, 300);
  };

  // Cleanup debounce timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Handle author quiz answers
  const handleAuthorAnswer = (questionId: keyof AuthorProfileAnswers, checked: boolean) => {
    const newAnswers = {
      ...authorAnswers,
      [questionId]: checked,
    } as AuthorProfileAnswers;
    
    // If all questions answered, classify profile
    if (Object.keys(newAnswers).length === 7) {
      const profile = classifyAuthorProfile(newAnswers);
      setAuthorProfile(profile);
    }
    
    setAuthorAnswers(newAnswers);
  };

  // Check if all author questions are answered
  const allAuthorQuestionsAnswered = authorAnswers && Object.keys(authorAnswers).length === 7;

  const handleStartAudit = () => {
    if (!inputText.trim() || inputText.length < 50) return;
    // Call the real pipeline starter from page.tsx if provided.
    // This is the ONLY way to actually invoke runAuditPipeline().
    if (onStartAudit) {
      onStartAudit();
    }
  };

  return (
    <div className="space-y-6">
      {/* Narrative Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            {t.form.narrativeTitle}
          </CardTitle>
          <CardDescription>
            {t.form.narrativeDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="narrative">{t.form.narrativeLabel}</Label>
            <Textarea
              id="narrative"
              placeholder={t.form.narrativePlaceholder}
              value={localInput}
              onChange={(e) => handleInputTextChange(e.target.value)}
              className="min-h-[200px] resize-y"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              {t.form.characterCount.replace('{count}', String(localInput.length))}
            </p>
          </div>

          {/* Media Type Selection */}
          <div className="space-y-2">
            <Label>{t.form.mediaType}</Label>
            <Select value={mediaType} onValueChange={(v) => setMediaType(v as MediaType)} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder={t.form.mediaTypeSelect} />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(MEDIA_TYPE_LABELS) as [MediaType, string][]).map(([type, label]) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      {mediaIcons[type]}
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>{t.form.auditMode}</CardTitle>
          <CardDescription>
            {t.form.auditModeDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={auditMode || ''}
            onValueChange={(v) => setAuditMode(v as AuditMode)}
            className="grid gap-4"
            disabled={isLoading}
          >
            {(Object.entries(AUDIT_MODE_DESCRIPTIONS) as [AuditMode, typeof AUDIT_MODE_DESCRIPTIONS.conflict][]).map(([mode, info]) => (
              <div key={mode} className="flex items-start space-x-3 rounded-md border p-4 hover:bg-accent">
                <RadioGroupItem value={mode} id={mode} className="mt-1" />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={mode} className="font-medium cursor-pointer">
                      {info.name}
                    </Label>
                    <Badge variant="outline">{info.nameRu}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                  <p className="text-xs text-muted-foreground italic">
                    {t.form.detection.replace('{questions}', String(info.questions))}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Author Profile Quiz */}
      <Collapsible open={authorQuizExpanded} onOpenChange={setAuthorQuizExpanded}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.form.authorProfileTitle}</CardTitle>
                  <CardDescription>
                    {t.form.authorProfileDescription}
                  </CardDescription>
                </div>
                {authorQuizExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t.form.authorProfileHint}
              </p>
              
              <div className="space-y-3">
                {AUTHOR_QUESTIONS.map((q) => (
                  <div key={q.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <Checkbox
                      id={q.id}
                      checked={authorAnswers?.[q.id] || false}
                      onCheckedChange={(checked) => handleAuthorAnswer(q.id, checked as boolean)}
                      disabled={isLoading}
                      className="mt-0.5"
                    />
                    <div className="space-y-1">
                      <Label htmlFor={q.id} className="text-sm cursor-pointer">
                        {q.text}
                      </Label>
                      <div className="flex items-center gap-2">
                        {q.isKeySignal && (
                          <Badge variant="secondary" className="text-xs">
                            {t.form.keySignal.replace('{weight}', String(q.weight))}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {t.form.weight.replace('{weight}', String(q.weight))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {allAuthorQuestionsAnswered && (
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm font-medium">{t.form.profileDetermined}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.form.profileDeterminedHint}
                  </p>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Start Audit Button */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => {
            setLocalInput('');
            setInputText('');
            setAuditMode(null);
            setAuthorAnswers(null);
          }}
          disabled={isLoading}
        >
          {t.app.clear}
        </Button>
        <Button
          onClick={handleStartAudit}
          disabled={!localInput.trim() || localInput.length < 50 || isLoading}
          className="min-w-[150px]"
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              {t.app.analyzing}
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              {t.app.startAudit}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
