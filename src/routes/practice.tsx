import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { toneForTurn, type ModelTone } from "@/lib/model-tone";
import { rep2Chunks, rep4Items, rep2ChunkText, REP4_MAX } from "@/lib/rep-structure";
export { REP4_MAX };
import { RecordingPlayback } from "@/components/fluency/RecordingPlayback";
import { RepProgress } from "@/components/fluency/RepProgress";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { PowerChunks } from "@/components/fluency/PowerChunks";
import { ShadowKaraoke } from "@/components/fluency/ShadowKaraoke";
import { TakeBoard, isPressureRound, requiredTakes, takeSlots } from "@/components/fluency/TakeBoard";
import { PastVerbCards } from "@/components/fluency/PastVerbCards";
import { StoryStrip } from "@/components/fluency/StoryStrip";
import { TodaysPastVerbs } from "@/components/fluency/TodaysPastVerbs";
import { MicTest, isMicChecked } from "@/components/fluency/MicTest";

import { DayCompleteScreen } from "@/components/fluency/DayCompleteScreen";
import {
  SpanishProvider,
  SpanishToggle,
  TranslatableText,
  useEsSupportPref,
  useSpanishAll,
} from "@/components/fluency/TranslatableText";
import { CollapsibleHelp, TextToggle } from "@/components/fluency/CollapsibleHelp";
import { supportLevel, prefersChunks, showsFullTextByDefault } from "@/lib/support-level";
import { rep5Tier, primaryVisual, introTier, introExampleLimit, introImageIsEssential } from "@/lib/rep5-support";
import { CourseService, DEFAULT_MODULE, isModuleId, type LoadedModule } from "@/services/course-service";
import { ModuleLoadError } from "@/components/fluency/ModuleLoadState";
import { useModuleContent } from "@/hooks/use-module-content";
import { JourneyService } from "@/services/journey-service";
import { habitDays, lastHabitDate } from "@/lib/habit";
import { AudioService } from "@/services/audio-service";
import {
  PracticeSessionService,
  setSessionScope,
  itemKey,
  migrateLegacyRep2,
  type PracticeSession,
} from "@/services/practice-session";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { AuthGate } from "@/components/fluency/AuthGate";
import { CloudSync } from "@/services/cloud-sync";
import type { CourseDay, JourneyState, ModelLine, ModuleId, Recording, RepLabel } from "@/lib/types";
import type { FinalRepSaveState } from "@/components/fluency/DayCompleteScreen";
import { cn } from "@/lib/utils";
import { useAppLang, useT, tPair, type TKey } from "@/lib/i18n";
import { setPreferencesScope } from "@/services/preferences";
import { VerbBank, setVerbBankScope } from "@/services/verb-bank";

export const Route = createFileRoute("/practice")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = search["module"];
    // Missing param → default module. A present-but-unknown id is a not-found (never a silent fallback).
    const module: ModuleId = isModuleId(raw) ? raw : DEFAULT_MODULE;
    return {
      module,
      day: Math.min(CourseService.totalDays(module), Math.max(1, Number(search["day"]) || 1)),
      ...(raw !== undefined && !isModuleId(raw) ? { unknownModule: true as const } : {}),
    };
  },
  beforeLoad: ({ search }) => {
    if (search.unknownModule) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Daily Practice — Fluency App" },
      { name: "description", content: "Five speaking reps a day: listen, copy, shadow, personalize and record your final rep in English." },
      { property: "og:title", content: "Daily Practice — Fluency App" },
      { property: "og:description", content: "Five speaking reps a day to make your English automatic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticePage,
});

const REP_TITLES = [
  { en: "INTRO", es: "INTRO" },
  { en: "REP 1 OF 5 · LISTEN", es: "REP 1 DE 5 · ESCUCHA" },
  { en: "REP 2 OF 5 · COPY", es: "REP 2 DE 5 · COPIA" },
  { en: "REP 3 OF 5 · SHADOW", es: "REP 3 DE 5 · SHADOWING" },
  { en: "REP 4 OF 5 · MAKE IT YOURS", es: "REP 4 DE 5 · HAZLO TUYO" },
  { en: "REP 5 OF 5 · YOUR TURN", es: "REP 5 DE 5 · TU TURNO" },
];

/** Server accepts at most 3 MB; skip the call locally for anything larger. */
const SENTENCE_COUNT_MAX_BYTES = 3 * 1024 * 1024;

/**
 * Estimated complete spoken ideas for one take. Returns null when unavailable
 * (no session, oversized, rate-limited, or any server/AI error) — never throws.
 */
async function countSentences(blob: Blob | null): Promise<number | null> {
  if (!blob || blob.size < 2048 || blob.size > SENTENCE_COUNT_MAX_BYTES) return null;
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return null;
    const form = new FormData();
    form.append("file", blob, "take");
    const res = await fetch("/api/sentence-count", {
      method: "POST",
      body: form,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { sentences?: unknown };
    return typeof body.sentences === "number" ? body.sentences : null;
  } catch {
    return null;
  }
}


/**
 * Thin shell: resolves the module's full content (dynamic import, session-cached)
 * before mounting the practice flow, so every state initializer sees real data.
 */
function PracticePage() {
  const { module: moduleId } = Route.useSearch();
  const { lang } = useAppLang();
  const content = useModuleContent(moduleId);
  const navigate = useNavigate();
  // Ladder guard: a locked module never opens in Practice — send the learner to its locked screen.
  const locked = useMemo(() => !JourneyService.isModuleUnlocked(JourneyService.load(), moduleId), [moduleId]);
  useEffect(() => {
    if (locked) void navigate({ to: "/module/$moduleId", params: { moduleId }, replace: true });
  }, [locked, moduleId, navigate]);

  if (locked || content.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {lang === "es" ? "CARGANDO…" : "LOADING…"}
        </p>
      </div>
    );
  }

  if (content.status === "error") {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <ModuleLoadError onRetry={content.retry} />
      </div>
    );
  }

  return <PracticeFlow module={content.module} />;
}

function PracticeFlow({ module }: { module: LoadedModule }) {
  const { day: dayNumber, module: moduleId } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading: authLoading, sync } = useAuth();
  const tt = useT();
  const baseDay = useMemo(() => CourseService.dayOf(module, dayNumber), [module, dayNumber]);
  /** TIGERS FINAL: one prewritten scenario, chosen once per day and kept across resumes. */
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const day = useMemo(() => CourseService.withScenario(baseDay, scenarioId), [baseDay, scenarioId]);

  const [showEs, setShowEs] = useEsSupportPref();
  const { lang } = useAppLang();
  // App chrome follows the interface language; showEs is learning support only.
  const esUi = lang === "es";
  const [stage, setStage] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [takes, setTakes] = useState<(Recording | null)[]>(() => Array(takeSlots(day.rep5Turns)).fill(null));
  const [finalIndex, setFinalIndex] = useState<number | null>(null);
  const [finalRecording, setFinalRecording] = useState<Recording | null>(null);
  const [saveState, setSaveState] = useState<FinalRepSaveState>("idle");
  const [journeyAfterFinish, setJourneyAfterFinish] = useState<JourneyState | null>(null);
  /** Habit snapshot taken right before completeDay, so milestones are crossed exactly once. */
  const [habitBefore, setHabitBefore] = useState<{ days: number; lastCompletedDate?: string } | null>(null);
  const saveRef = useRef(false);
  const practiceSeconds = useRef(0);

  const [takeErrors, setTakeErrors] = useState<number[]>([]);
  const [attempted, setAttempted] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [resume, setResume] = useState<PracticeSession | null>(null);
  const [confirmExit, setConfirmExit] = useState(false);
  const [micChecked, setMicChecked] = useState(true);
  const startedAt = useRef(new Date().toISOString());

  // Restore the saved position for this module + day from the account.
  useEffect(() => {
    if (!user) {
      setReady(false);
      return;
    }
    setSessionScope(user.id);
    setPreferencesScope(user.id);
    setVerbBankScope(user.id);
    const bank = baseDay.rep5Scenarios?.map((s) => s.id) ?? [];
    setScenarioId(bank.length ? PracticeSessionService.scenarioFor(moduleId, dayNumber, bank) : null);
    const saved = PracticeSessionService.load(moduleId, dayNumber);
    if (PracticeSessionService.isResumable(saved) && saved) {
      // Sessions saved with the old sentence-by-sentence Rep 2 map to the closest chunk.
      setResume(migrateLegacyRep2(saved, rep2Chunks(baseDay), rep4Items(baseDay).length));
    }
    setReady(true);
  }, [moduleId, dayNumber, user?.id, sync]);

  // Persist the position on every meaningful change.
  useEffect(() => {
    if (!ready || resume || done) return;
    PracticeSessionService.save({
      moduleId,
      day: dayNumber,
      week: day.week ?? null,
      stage,
      subIndex,
      attempted,
      skipped,
      startedAt: startedAt.current,
    });
  }, [ready, resume, done, moduleId, dayNumber, day.week, stage, subIndex, attempted, skipped]);

  useEffect(() => setMicChecked(isMicChecked()), []);

  // Verbs used in today's lesson become "discovered" in the Past Verb Bank.
  const todaysVerbs = useMemo(() => (ready ? VerbBank.todaysVerbs(day) : []), [ready, day]);
  useEffect(() => {
    if (!ready || todaysVerbs.length === 0) return;
    VerbBank.discover(todaysVerbs.map((verb) => verb.id));
  }, [ready, todaysVerbs]);

  useEffect(() => () => AudioService.stop(), []);
  useEffect(() => {
    AudioService.stop();
    window.scrollTo({ top: 0 });
  }, [stage, subIndex]);

  // Lightweight per-rep wall-clock timing (pilot analytics, never shown).
  const repDurations = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const stageEnteredAt = useRef(Date.now());
  useEffect(() => {
    stageEnteredAt.current = Date.now();
    return () => {
      const spent = (Date.now() - stageEnteredAt.current) / 1000;
      repDurations.current[stage] = (repDurations.current[stage] ?? 0) + spent;
    };
  }, [stage]);

  const chunks2 = useMemo(() => rep2Chunks(day), [day]);
  const items4 = useMemo(() => rep4Items(day), [day]);
  const subTotal = stage === 2 ? chunks2.length : stage === 4 ? items4.length : 1;

  const currentItemKey =
    stage === 2
      ? itemKey("2c", chunks2[subIndex]?.id ?? String(subIndex))
      : stage === 4
        ? itemKey(4, items4[subIndex]?.id ?? String(subIndex))
        : null;

  const markAttempted = (key: string) =>
    setAttempted((list) => (list.includes(key) ? list : [...list, key]));

  const goBack = () => {
    if (subIndex > 0) return setSubIndex(subIndex - 1);
    if (stage > 0) {
      setStage(stage - 1);
      setSubIndex(0);
      return;
    }
    setConfirmExit(true);
  };

  const goForward = () => {
    if (subIndex < subTotal - 1) return setSubIndex(subIndex + 1);
    if (stage < 5) {
      setStage(stage + 1);
      setSubIndex(0);
    }
  };

  const skipCurrent = () => {
    if (currentItemKey) setSkipped((list) => (list.includes(currentItemKey) ? list : [...list, currentItemKey]));
    goForward();
  };

  const trackSeconds = (recording: Recording) => {
    practiceSeconds.current += recording.durationSeconds;
  };

  const recorded = takes.filter((take): take is Recording => Boolean(take));

  /**
   * Every Rep 5 take is stored in the learner's account. A failed upload keeps
   * the audio in memory and stays retryable for the whole session.
   */
  const uploadTake = (index: number, rec: Recording) => {
    setTakeErrors((list) => list.filter((i) => i !== index));
    CloudSync.uploadTake({
      moduleId,
      day: day.day,
      takeNumber: index + 1,
      recording: rec,
      isFinalRep: false,
    })
      .then((result) => {
        if (!result.ok) setTakeErrors((list) => (list.includes(index) ? list : [...list, index]));
      })
      .catch(() => setTakeErrors((list) => (list.includes(index) ? list : [...list, index])));
  };


  /**
   * Saves the Final Rep to the cloud. The blob stays in memory until the
   * upload result is known, so a failure is always retryable in this session.
   */
  const cloudSave = (final: Recording, state: JourneyState) => {
    if (saveRef.current) return;
    saveRef.current = true;
    setSaveState("saving");
    JourneyService.syncDay(moduleId, day.day, state, final.blob ?? null)
      .then((result) => {
        setSaveState(result === "failed" ? "failed" : result === "skipped" ? "local" : "saved");
      })
      .catch((error: unknown) => {
        console.error("[practice] final rep sync failed", error);
        setSaveState("failed");
      })
      .finally(() => {
        saveRef.current = false;
      });
  };

  const finish = () => {
    if (done || saveRef.current) return;
    const final = (finalIndex !== null ? takes[finalIndex] : null) ?? recorded[recorded.length - 1];
    if (!final) return;
    const first = recorded[0] ?? final;
    // Close the timer for the current rep before snapshotting durations.
    const d = [...repDurations.current];
    d[stage] = (d[stage] ?? 0) + (Date.now() - stageEnteredAt.current) / 1000;
    const r = (i: number) => Math.round(d[i] ?? 0);
    const before = JourneyService.load();
    const lastDate = lastHabitDate(before);
    setHabitBefore({
      days: habitDays(before),
      ...(lastDate ? { lastCompletedDate: lastDate } : {}),
    });
    const next = JourneyService.completeDay({
      moduleId,
      day: day.day,
      sentenceCount: final.sentenceCount ?? null,
      finalSeconds: final.durationSeconds,
      firstSeconds: first.durationSeconds,
      practiceSeconds: Math.round(practiceSeconds.current),
      recordingsCount: Math.max(1, recorded.length),
      finalUrl: final.url,
      firstUrl: first.url,
      repDurations: {
        rep1: r(1),
        rep2: r(2),
        rep3: r(3),
        rep4: r(4),
        rep5: r(5),
        total: r(0) + r(1) + r(2) + r(3) + r(4) + r(5),
      },
    });
    setFinalRecording(final);
    setJourneyAfterFinish(next);
    setDone(true);
    PracticeSessionService.clear(moduleId, day.day);
    const finalTake = (finalIndex ?? takes.findIndex((take) => take?.id === final.id)) + 1;
    if (finalTake > 0) void CloudSync.markFinalTake(moduleId, day.day, finalTake).catch(() => undefined);
    void CloudSync.completeSession(moduleId, day.day).catch(() => undefined);
    cloudSave(final, next);
  };

  const countFor = (rep: "2c" | 4, ids: string[]) => {
    const keys = ids.map((id) => itemKey(rep, id));
    return {
      total: keys.length,
      attempted: keys.filter((key) => attempted.includes(key)).length,
      skipped: keys.filter((key) => skipped.includes(key) && !attempted.includes(key)).length,
    };
  };

  // The pilot requires an account: no practice data may live only on a phone.
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {esUi ? "CARGANDO…" : "LOADING…"}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <AuthGate blocking />
        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="mx-auto mt-4 block min-h-[44px] rounded-2xl px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          {esUi ? "VOLVER AL INICIO" : "BACK TO HOME"}
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <SpanishProvider value={showEs}>
        <DayCompleteScreen
          moduleId={moduleId}
          day={day}
          finalRecording={finalRecording}
          firstRecording={recorded[0] ?? null}
          showEs={esUi}
          summary={{
            rep2: countFor("2c", chunks2.map((chunk) => chunk.id)),
            rep4: countFor(4, items4.map((item) => item.id)),
          }}
          saveState={saveState}
          habitBefore={habitBefore}
          onRetrySave={() => {
            if (finalRecording && journeyAfterFinish) cloudSave(finalRecording, journeyAfterFinish);
          }}
        />
      </SpanishProvider>
    );
  }

  if (resume) {
    return (
      <SpanishProvider value={showEs}>
        <ResumeScreen
          session={resume}
          day={day}
          showEs={esUi}
          onContinue={() => {
            setStage(resume.stage);
            setSubIndex(resume.subIndex);
            setAttempted(resume.attempted);
            setSkipped(resume.skipped);
            startedAt.current = resume.startedAt;
            setResume(null);
          }}
          onRestart={() => {
            PracticeSessionService.clear(moduleId, dayNumber);
            startedAt.current = new Date().toISOString();
            setResume(null);
          }}
        />
      </SpanishProvider>
    );
  }

  const title = REP_TITLES[stage] ?? REP_TITLES[0]!;

  return (
    <SpanishProvider value={showEs}>
      <div className="min-h-screen bg-background pb-16">
        <RepProgress
          current={stage}
          total={6}
          title={`${esUi ? "DÍA" : "DAY"} ${day.day} · ${esUi ? title.es : title.en}`}
          onBack={goBack}
          {...(stage < 5 ? { onNext: goForward } : {})}
          onExit={() => setConfirmExit(true)}
        />

        {confirmExit ? (
          <ExitDialog
            showEs={esUi}
            onCancel={() => setConfirmExit(false)}
            onExit={() => {
              AudioService.stop();
              void navigate({ to: "/" });
            }}
          />
        ) : null}

        <main className="mx-auto w-full max-w-lg space-y-5 px-4 py-5">
          <div className="flex justify-end">
            <SpanishToggle value={showEs} onChange={setShowEs} />
          </div>

          {stage === 0 ? (
            <>
              <IntroStep moduleId={moduleId} day={day} onNext={goForward} />
              <TodaysPastVerbs verbs={todaysVerbs} />
            </>
          ) : null}
          {stage === 1 ? <Rep1Listen day={day} showEs={esUi} onNext={goForward} /> : null}
          {stage === 2 && !micChecked ? (
            <MicTest onPass={() => setMicChecked(true)} onSkip={() => setMicChecked(true)} />
          ) : null}
          {stage === 2 && micChecked ? (
            <Rep2Copy
              day={day}
              index={subIndex}
              showEs={esUi}
              attempted={Boolean(currentItemKey && attempted.includes(currentItemKey))}
              onRecorded={(rec) => {
                trackSeconds(rec);
                if (currentItemKey) markAttempted(currentItemKey);
              }}
              onSkip={skipCurrent}
              onNext={goForward}
            />
          ) : null}
          {stage === 3 ? <Rep3Shadow day={day} onNext={goForward} /> : null}
          {stage === 4 ? (
            <Rep4MakeItYours
              day={day}
              index={subIndex}
              showEs={esUi}
              attempted={Boolean(currentItemKey && attempted.includes(currentItemKey))}
              onRecorded={(rec) => {
                trackSeconds(rec);
                if (currentItemKey) markAttempted(currentItemKey);
              }}
              onSkip={skipCurrent}
              onNext={goForward}
              hideVisuals={moduleId === "past-stories"}
              promptTone={moduleId === "advanced-1" ? "neutral" : "coach"}
            />

          ) : null}
          {stage === 5 && takeErrors.length > 0 ? (
            <div className="space-y-2 rounded-2xl border border-destructive/30 bg-card p-4 text-center">
              <p className="text-[13px] font-semibold">{tt("sync.takeFailed")}</p>
              <button
                type="button"
                onClick={() => {
                  takeErrors.forEach((index) => {
                    const rec = takes[index];
                    if (rec) uploadTake(index, rec);
                  });
                }}
                className="min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
              >
                {tt("sync.retry")}
              </button>
            </div>
          ) : null}
          {stage === 5 ? (
            <Rep5FinalRep
              moduleId={moduleId}
              day={day}
              takes={takes}
              finalIndex={finalIndex}
              onRecorded={(index, rec) => {
                trackSeconds(rec);
                const pending: Recording = { ...rec, countStatus: "pending", sentenceCount: null };
                setTakes((list) => list.map((item, i) => (i === index ? pending : item)));
                // Pressure Round (ADVANCED): the Final Rep defaults to Round 1 ("Tell me about yourself").
                setFinalIndex((current) => (isPressureRound(day.rep5Turns) ? (current ?? index) : index));
                uploadTake(index, rec);
                void countSentences(rec.blob ?? null).then((count) => {
                  void CloudSync.updateTakeIdeas(moduleId, day.day, index + 1, count).catch(() => undefined);
                  setTakes((list) =>
                    list.map((item, i) =>
                      i === index && item?.id === rec.id
                        ? count === null
                          ? { ...item, countStatus: "failed", sentenceCount: null }
                          : { ...item, countStatus: "done", sentenceCount: count }
                        : item,
                    ),
                  );
                });
              }}
              onDelete={(index) => {
                setTakes((list) => list.map((item, i) => (i === index ? null : item)));
                setFinalIndex((current) => (current === index ? null : current));
              }}
              onSelectFinal={setFinalIndex}
              onFinish={finish}
            />
          ) : null}
        </main>
      </div>
    </SpanishProvider>
  );
}

/* ------------------------------- Shared UI ------------------------------- */

function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
    >
      {children}
    </button>
  );
}

/**
 * Standard rep header: one large action title + one short instruction.
 * App language = Spanish → Spanish is primary, English small secondary.
 * App language = English → English primary; Spanish appears only with ES SUPPORT on.
 */
function RepHeader({
  titleKey,
  instrKey,
  cueKey,
  label,
  dark = false,
  copy,
}: {
  titleKey: TKey;
  instrKey: TKey;
  cueKey?: TKey;
  /** TIGERS reasoning label (EXPLICA · JUSTIFICA · DEFIENDE) shown as a small chip. */
  label?: RepLabel | undefined;
  dark?: boolean;
  /** ADVANCED: day-level Spanish-first copy override ([title, instruction] per language). */
  copy?: { es: [string, string]; en: [string, string] } | undefined;
}) {
  const { lang } = useAppLang();
  const esAll = useSpanishAll();
  const esPrimary = lang === "es";
  const [titleEs, titleEn] = copy ? [copy.es[0], copy.en[0]] : tPair(titleKey);
  const [instrEs, instrEn] = copy ? [copy.es[1], copy.en[1]] : tPair(instrKey);
  const secondary = esPrimary ? instrEn : esAll ? instrEs : null;
  const cue = cueKey ? tPair(cueKey)[esPrimary ? 0 : 1] : null;
  const labelText = label ? tPair(`rep.label.${label}` as TKey)[esPrimary ? 0 : 1] : null;

  return (
    <div className="text-center">
      {labelText ? (
        <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary-foreground">
          {labelText}
        </span>
      ) : null}
      <p className={cn("text-[20px] font-extrabold uppercase tracking-[0.18em]", dark ? "text-navy-foreground" : "text-foreground")}>
        {esPrimary ? titleEs : titleEn}
      </p>
      <p className={cn("mt-1 text-[16px] font-bold leading-snug", dark ? "text-navy-foreground" : "text-foreground")}>
        {esPrimary ? instrEs : instrEn}
      </p>
      {secondary ? (
        <p className={cn("mt-0.5 text-[12px] leading-snug", dark ? "text-navy-foreground/60" : "text-muted-foreground")}>{secondary}</p>
      ) : null}
      {cue ? (
        <p className={cn("mt-2 text-[12px] font-bold uppercase tracking-[0.14em]", dark ? "text-navy-foreground/80" : "text-muted-foreground")}>{cue}</p>
      ) : null}
    </div>
  );
}

/**
 * Compact banner with the day's question (the one the model answers).
 * Shown in the intro and Reps 1–3 so the learner knows what is being asked
 * before Rep 5. Only reuses the first turn's role label — never its text.
 */
function QuestionBanner({ day }: { day: CourseDay }) {
  const t = useT();
  const { lang } = useAppLang();
  const firstTurn = day.rep5Turns?.[0];
  const role = firstTurn ? (lang === "es" ? firstTurn.labelEs : firstTurn.label) : null;

  return (
    <div className="space-y-1.5 rounded-2xl border border-primary/25 bg-accent px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-foreground">{t("practice.todayYouAnswer")}</p>
        {role ? (
          <span className="rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy-foreground">
            {role}
          </span>
        ) : null}
      </div>
      <TranslatableText es={day.rep5Prompt.questionEs}>
        <p className="text-[16px] font-extrabold leading-snug">{day.rep5Prompt.question}</p>
      </TranslatableText>
      <AudioPlayer text={day.rep5Prompt.question} label={t("practice.hearQuestion")} variant="ghost" size="sm" voice={day.speakerVoice} />
    </div>
  );
}

/** Small goal chips: seconds + ideas. */
function GoalChips({ day }: { day: CourseDay }) {
  return (
    <div className="flex justify-center gap-2">
      <span className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {day.goalSeconds[0]}+ sec
      </span>
      <span className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {day.goalSentences ?? 5}+ ideas
      </span>
    </div>
  );
}

function LineCard({ line, chunked = false }: { line: ModelLine; chunked?: boolean }) {
  return (
    <TranslatableText es={line.es}>
      <p className="text-[22px] font-extrabold leading-tight tracking-tight">
        {chunked
          ? line.chunks.map((chunk, index) => (
              <span key={index} className="mr-1.5 inline-block rounded-lg bg-secondary px-1.5">
                {chunk}
              </span>
            ))
          : line.text}
      </p>
    </TranslatableText>
  );
}

function CueRow({ cues }: { cues: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {cues.map((cue) => (
        <span key={cue} className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {cue}
        </span>
      ))}
    </div>
  );
}

/** The day's instructional picture (Present Progressive days only). */
function SceneImage({ day }: { day: CourseDay }) {
  const scene = day.sceneImage;
  if (!scene) return null;
  return (
    <figure className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
      <img src={scene.src} alt={scene.alt} width={1280} height={896} loading="lazy" className="w-full" />
    </figure>
  );
}

/** Choice cards: who or what the learner wants to talk about. */
function VariantPicker({ day }: { day: CourseDay }) {
  const variants = day.variants;
  const [picked, setPicked] = useState<string | null>(null);
  if (!variants?.length) return null;
  return (
    <div className="space-y-2 rounded-3xl border border-border bg-card p-4">
      <TranslatableText es="Elige de quién o de qué vas a hablar" align="center">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Choose what you want to talk about
        </p>
      </TranslatableText>
      <div className="flex flex-wrap justify-center gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => setPicked(variant.id)}
            className={cn(
              "rounded-2xl border px-3.5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
              picked === variant.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground",
            )}
          >
            {variant.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Step 0 intro ----------------------------- */

function IntroStep({ moduleId, day, onNext }: { moduleId: ModuleId; day: CourseDay; onNext: () => void }) {
  const t = useT();
  const { lang } = useAppLang();
  const intro = day.intro;
  const tier = introTier(moduleId);
  const isBasic = tier === "basic-low" || tier === "basic-high";
  const limit = introExampleLimit(tier);
  const shown = intro.examples.slice(0, limit);
  const rest = intro.examples.slice(limit);
  const essentialImage = introImageIsEssential(day, tier);
  // One goal line: the authored goal, plus the seconds range only when it isn't already in the text.
  const mentionsSeconds = /\d+\s*(–|-|to)\s*\d+|\bsec|segundo/i.test(`${intro.goal} ${intro.goalEs}`);
  const range = `${day.goalSeconds[0]}–${day.goalSeconds[1]} ${lang === "es" ? "seg" : "sec"}`;

  return (
    <div className="space-y-5">
      <div className="space-y-4 rounded-3xl bg-navy p-6 text-navy-foreground">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            DAY {day.day} OF {CourseService.totalDays(moduleId)}
          </p>
          <TranslatableText es={intro.titleEs} esClassName="text-navy-foreground/70" supportOnly>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{intro.title}</h2>
          </TranslatableText>
        </div>

        {/* BASIC: the 20–30 second explanation. Lower basics see Spanish first. */}
        {tier === "basic-low" ? (
          <div className="space-y-1">
            <p className="text-[16px] font-semibold leading-snug">{intro.leadEs}</p>
            <p className="text-[14px] leading-snug text-navy-foreground/75">{intro.lead}</p>
          </div>
        ) : tier === "basic-high" ? (
          <TranslatableText es={intro.leadEs} esClassName="text-navy-foreground/70" supportOnly>
            <p className="text-[15px] font-semibold leading-snug">{intro.lead}</p>
          </TranslatableText>
        ) : null}

        {shown.length ? (
          <div className="space-y-1.5 rounded-2xl bg-navy-foreground/10 p-3">
            {shown.map((example) => (
              <p key={example} className="text-[17px] font-extrabold leading-tight tracking-tight">
                {example}
              </p>
            ))}
          </div>
        ) : null}

        {/* EAGLES: remember the structure. TIGERS/SHARKS: framework cues only. */}
        {tier === "eagles" && day.powerChunks ? <PowerChunks chunks={day.powerChunks} size="mini" audio={false} className="bg-navy-foreground/10" /> : null}
        {tier === "spontaneous" && day.cues.length ? (
          <div className="flex flex-wrap gap-1.5">
            {day.cues.map((cue) => (
              <span key={cue} className="rounded-full border border-navy-foreground/25 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.12em]">
                {cue}
              </span>
            ))}
          </div>
        ) : null}

        <div className="border-t border-navy-foreground/15 pt-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            {t("intro.today")}
            {mentionsSeconds ? "" : ` · ${range}`}
          </p>
          <TranslatableText es={intro.goalEs} className="mt-1" esClassName="text-navy-foreground/70" supportOnly>
            <p className="text-[15px] font-semibold leading-snug text-navy-foreground/90">{intro.goal}</p>
          </TranslatableText>
        </div>
      </div>

      {essentialImage ? <SceneImage day={day} /> : null}

      <PrimaryButton onClick={onNext}>
        {(intro.cta === "START REP 1"
          ? t("intro.startRep1")
          : intro.cta === "START CHALLENGE"
            ? t("intro.startChallenge")
            : intro.cta)}{" "}
        <ArrowRight className="size-5" />
      </PrimaryButton>

      <CollapsibleHelp label="More help" labelEs="Más ayuda">
        {!isBasic ? (
          <TranslatableText es={intro.leadEs} supportOnly>
            <p className="text-[15px] leading-relaxed text-foreground">{intro.lead}</p>
          </TranslatableText>
        ) : null}
        {rest.length ? (
          <div className="space-y-1.5">
            {rest.map((example) => (
              <p key={example} className="text-[16px] font-bold tracking-tight">
                {example}
              </p>
            ))}
          </div>
        ) : null}
        <QuestionBanner day={day} />
        {!essentialImage ? <SceneImage day={day} /> : null}
        <StoryStrip day={day} showCaptions={false} />
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {day.focus} · {day.topic}
        </p>
      </CollapsibleHelp>
    </div>
  );
}

/* --------------------------- Resume / exit UI ---------------------------- */

const RESUME_LABELS = [
  { en: "INTRO", es: "INTRO" },
  { en: "REP 1", es: "REP 1" },
  { en: "REP 2", es: "REP 2" },
  { en: "REP 3", es: "REP 3" },
  { en: "REP 4", es: "REP 4" },
  { en: "REP 5", es: "REP 5" },
];

function ResumeScreen({
  session,
  day,
  showEs,
  onContinue,
  onRestart,
}: {
  session: PracticeSession;
  day: CourseDay;
  showEs: boolean;
  onContinue: () => void;
  onRestart: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const label = RESUME_LABELS[session.stage] ?? RESUME_LABELS[0]!;
  const total = session.stage === 2 ? rep2Chunks(day).length : session.stage === 4 ? rep4Items(day).length : 1;
  const unit = session.stage === 2 ? "CHUNK" : showEs ? "PREGUNTA" : "QUESTION";
  const position =
    total > 1
      ? `${showEs ? label.es : label.en} · ${unit} ${Math.min(session.subIndex, total - 1) + 1} ${showEs ? "DE" : "OF"} ${total}`
      : showEs
        ? label.es
        : label.en;

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="mx-auto w-full max-w-lg space-y-5">
        <div className="rounded-3xl bg-navy p-7 text-center text-navy-foreground">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            {showEs ? "QUÉ BUENO VERTE" : "WELCOME BACK"}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
            {showEs ? `Día ${day.day}` : `Day ${day.day}`}
          </h1>
          <p className="mt-3 text-[14px] font-semibold text-navy-foreground/80">
            {showEs ? "Estabas practicando" : "You were practicing"}
          </p>
          <p className="mt-1 text-[17px] font-extrabold tracking-tight">{position}</p>
        </div>

        <PrimaryButton onClick={onContinue}>
          {showEs ? "CONTINUAR DONDE ME QUEDÉ" : "CONTINUE WHERE I LEFT OFF"} <ArrowRight className="size-5" />
        </PrimaryButton>

        {confirming ? (
          <div className="space-y-3 rounded-3xl border border-border bg-card p-5 text-center">
            <p className="text-[14px] font-semibold">
              {showEs
                ? "Tu avance dentro de esta práctica se borrará."
                : "Your progress inside this practice will be reset."}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-2xl border border-border px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em]"
              >
                {showEs ? "CANCELAR" : "CANCEL"}
              </button>
              <button
                type="button"
                onClick={onRestart}
                className="flex-1 rounded-2xl bg-destructive px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-destructive-foreground"
              >
                {showEs ? "EMPEZAR DE NUEVO" : "START OVER"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="w-full text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4"
          >
            {showEs ? "Empezar este día de nuevo" : "Start this day over"}
          </button>
        )}
      </div>
    </div>
  );
}

function ExitDialog({ showEs, onCancel, onExit }: { showEs: boolean; onCancel: () => void; onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-sm space-y-4 rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-lift)]">
        <p className="text-[18px] font-extrabold tracking-tight">
          {showEs ? "¿SALIR DE LA PRÁCTICA?" : "EXIT PRACTICE?"}
        </p>
        <p className="text-[14px] text-muted-foreground">
          {showEs ? "Tu avance de hoy se guardará." : "Your progress today will be saved."}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onExit}
            className="flex-1 rounded-2xl border border-border px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em]"
          >
            {showEs ? "SALIR" : "EXIT"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-2xl bg-primary px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
          >
            {showEs ? "SEGUIR PRACTICANDO" : "KEEP PRACTICING"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Tiny hint under a disabled primary action. */
function HelperText({ text }: { text: string }) {
  return <p className="text-center text-[12px] font-semibold text-muted-foreground">{text}</p>;
}

/** Tertiary text link: move on without a recording. */
function SkipLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex min-h-[44px] w-full items-center justify-center text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {label}
    </button>
  );
}

/* -------------------------------- Rep 1 ---------------------------------- */


function Rep1Listen({ day, showEs, onNext }: { day: CourseDay; showEs: boolean; onNext: () => void }) {
  const t = useT();
  const [heard, setHeard] = useState(false);
  const [showText, setShowText] = useState(false);

  return (
    <div className="space-y-5">
      <RepHeader titleKey="rep1.title" instrKey="rep1.instr" copy={day.repCopy?.rep1} />

      <QuestionBanner day={day} />

      <PowerChunks chunks={day.powerChunks} voice={day.speakerVoice} audio={false} />

      <SceneImage day={day} />
      <PastVerbCards day={day} />
      <StoryStrip day={day} showCaptions={false} />

      <AudioPlayer
        text={CourseService.getModelText(day)}
        label={t("practice.listenModel")}
        voice={day.speakerVoice}
        size="lg"
        onEnd={() => setHeard(true)}
      />

      <TextToggle open={showText} onToggle={() => setShowText((v) => !v)} />

      {showText ? (
        <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          {day.lines.map((line) => (
            <LineCard key={line.id} line={line} />
          ))}
        </div>
      ) : null}


      {heard ? (
        <PrimaryButton onClick={onNext}>
          {showEs ? "SIGUIENTE REP" : "NEXT REP"} <ArrowRight className="size-5" />
        </PrimaryButton>
      ) : (
        <SkipLink
          label={t("practice.skipNow")}
          onClick={() => {
            AudioService.stop();
            onNext();
          }}
        />
      )}
    </div>
  );
}

/* -------------------------------- Rep 2 ---------------------------------- */

function Rep2Copy({
  day,
  index,
  attempted,
  onRecorded,
  onSkip,
  onNext,
}: {
  day: CourseDay;
  index: number;
  showEs: boolean;
  attempted: boolean;
  onRecorded: (rec: Recording) => void;
  onSkip: () => void;
  onNext: () => void;
}) {
  const t = useT();
  const chunks = rep2Chunks(day);
  const chunk = chunks[index] ?? chunks[0]!;
  const [mine, setMine] = useState<Recording | null>(null);

  useEffect(() => setMine(null), [index]);

  const level = supportLevel(day);
  const chunkText = rep2ChunkText(chunk);
  const isLast = index >= chunks.length - 1;

  return (
    <div className="space-y-5">
      <RepHeader titleKey="rep2.title" instrKey="rep2.instr" copy={day.repCopy?.rep2} />

      <QuestionBanner day={day} />

      <PowerChunks chunks={day.powerChunks} voice={day.speakerVoice} />

      <SceneImage day={day} />
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {t("practice.chunk")} {index + 1} {t("practice.of")} {chunks.length}
      </p>

      <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        {chunk.lines.map((line) => (
          <LineCard key={line.id} line={line} chunked={prefersChunks(level)} />
        ))}
      </div>

      <AudioPlayer text={chunkText} label={t("practice.listen")} rate={0.9} voice={day.speakerVoice} />

      <VoiceRecorder
        label={mine ? t("practice.repeat") : t("practice.record")}
        maxSeconds={30}
        showTimer
        onComplete={(rec) => {
          setMine(rec);
          onRecorded(rec);
        }}
      />

      {mine ? <RecordingPlayback url={mine.url} label={t("practice.listenToMe")} /> : null}

      <PrimaryButton onClick={onNext} disabled={!attempted}>
        {isLast ? t("practice.nextRep") : t("practice.nextChunk")} <ArrowRight className="size-5" />
      </PrimaryButton>

      {attempted ? null : (
        <>
          <HelperText text={t("practice.recordOnce")} />
          <SkipLink label={t("practice.skipChunk")} onClick={onSkip} />
        </>
      )}
    </div>
  );
}

/* -------------------------------- Rep 3 ---------------------------------- */

/**
 * Live shadowing only: continuous model audio + chunk highlight, the learner
 * speaks WITH the model. No recording, no images — deliberately unlike Rep 2.
 */
function Rep3Shadow({ day, onNext }: { day: CourseDay; onNext: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-navy p-5">
        <RepHeader titleKey="rep3.title" instrKey="rep3.instr" cueKey="rep3.cue" dark />
      </div>

      <ShadowKaraoke lines={day.lines} text={CourseService.getModelText(day)} voice={day.speakerVoice} onNext={onNext} />
    </div>
  );
}

/* -------------------------------- Rep 4 ---------------------------------- */

function Rep4MakeItYours({
  day,
  index,
  attempted,
  onRecorded,
  onSkip,
  onNext,
  hideVisuals = false,
  promptTone = "coach",
}: {
  day: CourseDay;
  index: number;
  showEs: boolean;
  attempted: boolean;
  onRecorded: (rec: Recording) => void;
  onSkip: () => void;
  onNext: () => void;
  hideVisuals?: boolean;
  /** Interview questions (ADVANCED) are read in a neutral recruiter tone. */
  promptTone?: ModelTone;
}) {
  const t = useT();
  const items = rep4Items(day);
  const item = items[index] ?? items[items.length - 1]!;
  const isLast = index >= items.length - 1;
  const [mine, setMine] = useState<Recording | null>(null);

  useEffect(() => setMine(null), [index]);

  const hasSupport = Boolean(item.cues?.length) || Boolean(day.powerChunks);
  // After recording the final prompt, celebrate before sending the learner to Rep 5.
  const showDone = isLast && Boolean(mine);

  return (
    <div className="space-y-5">
      <RepHeader titleKey="rep4.title" instrKey="rep4.instr" label={item.label} copy={day.repCopy?.rep4} />

      {!hideVisuals ? (
        <>
          <SceneImage day={day} />
          <PastVerbCards day={day} />
          <StoryStrip day={day} showCaptions={false} />
          <VariantPicker day={day} />
        </>
      ) : null}
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {t("practice.question")} {index + 1} {t("practice.of")} {items.length}
      </p>

      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        {item.cue ? (
          <span className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            {item.cue}?
          </span>
        ) : null}
        <TranslatableText es={item.questionEs}>
          <p className="text-[20px] font-extrabold leading-tight tracking-tight">{item.question}</p>
        </TranslatableText>
        <div className="mt-4 rounded-2xl bg-secondary p-4">
          <TranslatableText es={item.starterEs} supportOnly>
            <p className="text-[17px] font-bold text-foreground">{item.starter}</p>
          </TranslatableText>
        </div>
      </div>

      <AudioPlayer text={item.question} label={t("practice.hearQuestion")} variant="ghost" size="sm" voice={day.speakerVoice} tone={promptTone} />

      {hasSupport ? (
        <CollapsibleHelp label={t("rep4.help")} labelEs={t("rep4.help")}>
          {item.cues ? <CueRow cues={item.cues} /> : null}
          <PowerChunks chunks={day.powerChunks} size="mini" />
        </CollapsibleHelp>
      ) : null}

      <VoiceRecorder
        label={mine ? t("practice.reRecord") : t("practice.answer")}
        maxSeconds={30}
        onComplete={(rec) => {
          setMine(rec);
          onRecorded(rec);
        }}
      />
      {mine ? <RecordingPlayback url={mine.url} label={t("practice.listenToMe")} /> : null}

      {showDone ? (
        <div className="space-y-4 rounded-3xl border-2 border-primary/40 bg-primary/5 p-5 text-center">
          <p className="text-[22px] font-extrabold tracking-tight text-primary">{t("rep4.done")}</p>
          <p className="text-[14px] font-semibold text-muted-foreground">{t("rep4.doneSub")}</p>
          <PrimaryButton onClick={onNext}>
            {t("rep4.continueRep5")} <ArrowRight className="size-5" />
          </PrimaryButton>
        </div>
      ) : (
        <PrimaryButton onClick={onNext} disabled={!attempted}>
          {isLast ? t("practice.nextRep") : t("practice.nextQuestion")} <ArrowRight className="size-5" />
        </PrimaryButton>
      )}

      {attempted ? null : (
        <>
          <HelperText text={t("practice.recordOnce")} />
          <SkipLink label={t("practice.skipPrompt")} onClick={onSkip} />
        </>
      )}
    </div>
  );
}

/* -------------------------------- Rep 5 ---------------------------------- */

function Rep5FinalRep({
  moduleId,
  day,
  takes,
  finalIndex,
  onRecorded,
  onDelete,
  onSelectFinal,
  onFinish,
}: {
  moduleId: ModuleId;
  day: CourseDay;
  takes: (Recording | null)[];
  finalIndex: number | null;
  onRecorded: (index: number, rec: Recording) => void;
  onDelete: (index: number) => void;
  onSelectFinal: (index: number) => void;
  onFinish: () => void;
}) {
  const t = useT();
  const { lang } = useAppLang();
  const completed = takes.filter(Boolean).length;
  const pressure = isPressureRound(day.rep5Turns);
  const required = requiredTakes(day.rep5Turns);
  const requiredDone = completed >= required;
  const slotsLeft = takes.some((take) => !take);
  const [showExampleText, setShowExampleText] = useState(false);

  const hasTurns = Boolean(day.rep5Turns?.length);
  const tier = rep5Tier(moduleId);
  const visual = primaryVisual(day, tier);
  const goalLine = hasTurns
    ? t("rep5.turnsGoal")
        .replace("{turns}", String(day.rep5Turns!.length))
        .replace("{min}", String(day.goalSeconds[0]))
        .replace("{max}", String(day.goalSeconds[1]))
    : t("rep5.goalLine")
        .replace("{sec}", String(day.goalSeconds[0]))
        .replace("{ideas}", String(day.goalSentences ?? 5));

  // What stays visible above the microphone, per tier. Everything else goes into Help (never deleted).
  const cuesAbove = !hasTurns && tier === "eagles" && !day.powerChunks ? day.cues.slice(0, 3) : [];
  const chunksAbove = !hasTurns && tier === "eagles" && Boolean(day.powerChunks);
  const cuesInHelp = cuesAbove.length ? day.cues.slice(cuesAbove.length) : day.cues;
  const skeletonSteps = day.rep5Skeleton ?? ["DECISION", "WHY", "EXAMPLE", "OTHER SIDE", "WHAT IF?", "CONCLUSION"];

  const toolbox = day.rep5Toolbox ? (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("power.toolbox")}</p>
      <div className="flex flex-wrap gap-1.5">
        {day.rep5Toolbox.map((phrase) => (
          <span key={phrase} className="rounded-full bg-secondary px-2.5 py-1 text-[12px] font-semibold text-foreground">
            {phrase}
          </span>
        ))}
      </div>
    </div>
  ) : null;

  const supportContent = (
    <>
      {hasTurns && day.rep5Scenario ? (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("rep5.scenario")}</p>
          <TranslatableText es={day.rep5Scenario.situationEs} supportOnly>
            <p className="text-[14px] font-semibold leading-relaxed text-foreground">{day.rep5Scenario.situation}</p>
          </TranslatableText>
        </div>
      ) : null}
      {day.rep5Scenario ? (
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("rep5.skeleton")}</p>
          <div className="flex flex-wrap gap-1.5">
            {skeletonSteps.map((step) => (
              <span key={step} className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-extrabold tracking-[0.12em] text-muted-foreground">
                {step}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {cuesInHelp.length ? <CueRow cues={cuesInHelp} /> : null}
      {chunksAbove ? (
        day.powerChunks ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="rounded-full border border-dashed border-primary/40 px-2.5 py-1 text-[12px] font-semibold text-muted-foreground">
              {day.powerChunks.stretch}
            </span>
          </div>
        ) : null
      ) : (
        <PowerChunks chunks={day.powerChunks} size="mini" />
      )}
      {toolbox}
      {visual !== "scene" ? <SceneImage day={day} /> : null}
      {visual !== "story" ? <StoryStrip day={day} showCaptions={false} /> : null}
      {day.rep5Tips ? (
        <TranslatableText es={day.rep5Tips.es} supportOnly>
          <p className="text-[14px] leading-relaxed text-foreground">{day.rep5Tips.en}</p>
        </TranslatableText>
      ) : (
        <TranslatableText es="Usa conectores como after, later y then. Si puedes, agrega un because." supportOnly>
          <p className="text-[14px] leading-relaxed text-foreground">
            Use connectors like <strong>after</strong>, <strong>later</strong> and <strong>then</strong>. If you can, add a <strong>because</strong>.
          </p>
        </TranslatableText>
      )}
      {day.modelExample ? (
        <>
          <AudioPlayer text={day.modelExample.text} label={t("practice.listenExample")} rate={1} variant="navy" voice={day.speakerVoice} />
          <button
            type="button"
            onClick={() => setShowExampleText((v) => !v)}
            className="inline-flex min-h-[44px] w-full items-center justify-center text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-primary"
          >
            {showExampleText ? t("practice.hideExampleText") : t("practice.showExampleText")}
          </button>
          {showExampleText ? (
            <TranslatableText es={day.modelExample.es}>
              <p className="text-[14px] leading-relaxed text-foreground">{day.modelExample.text}</p>
            </TranslatableText>
          ) : null}
        </>
      ) : null}
    </>
  );

  const board = (
    <TakeBoard
      takes={takes}
      finalIndex={finalIndex}
      goalSeconds={day.goalSeconds}
      goalSentences={day.goalSentences ?? 5}
      turns={day.rep5Turns}
      onRecorded={onRecorded}
      onDelete={onDelete}
      onSelectFinal={onSelectFinal}
    />
  );

  return (
    <div className="space-y-5">
      <RepHeader titleKey="rep5.title" instrKey="rep5.instr" label={day.rep5Label} copy={day.repCopy?.rep5} />

      {/* PROMPT / SITUATION — hidden on role-play days: Turn 1 audio delivers the question. */}
      {!hasTurns ? (
        <>
          {day.rep5Audio ? (
            <div className="space-y-3 rounded-3xl bg-navy p-5 text-navy-foreground">
              <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                {lang === "es" ? day.rep5Audio.labelEs : day.rep5Audio.label}
              </p>
              <AudioPlayer
                text={day.rep5Audio.text}
                label={t("practice.listen")}
                rate={1}
                variant="navy"
                voice={day.rep5Audio.voice}
                tone={toneForTurn({ id: "rep5-audio", ...day.rep5Audio }, day.rep5Turns)}
              />
              <TranslatableText es={day.rep5Audio.es} esClassName="text-navy-foreground/70" supportOnly>
                <p className="text-[14px] font-semibold italic leading-relaxed text-navy-foreground/90">"{day.rep5Audio.text}"</p>
              </TranslatableText>
            </div>
          ) : null}

          {day.rep5Scenario ? (
            <div className="space-y-2 rounded-3xl bg-navy p-5 text-navy-foreground">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{t("rep5.scenario")}</p>
                <span className="rounded-full bg-navy-foreground/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.16em]">
                  {lang === "es" ? day.rep5Scenario.labelEs : day.rep5Scenario.label}
                </span>
              </div>
              <TranslatableText es={day.rep5Scenario.situationEs} esClassName="text-navy-foreground/70">
                <p className="text-[15px] font-semibold leading-relaxed">{day.rep5Scenario.situation}</p>
              </TranslatableText>
            </div>
          ) : null}

          <div className="space-y-3 rounded-3xl border border-primary/25 bg-accent p-5">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">
              {t("practice.answer")}
            </p>
            <TranslatableText es={day.rep5Prompt.questionEs}>
              <p className="text-[19px] font-extrabold leading-snug">{day.rep5Prompt.question}</p>
            </TranslatableText>
          </div>
        </>
      ) : null}

      {/* GOAL — stated exactly once before the first speaking action. */}
      <p className="text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">{goalLine}</p>

      {/* MINIMAL SUPPORT — tiered. */}
      {cuesAbove.length ? <CueRow cues={cuesAbove} /> : null}
      {chunksAbove ? <PowerChunks chunks={day.powerChunks} size="mini" coreOnly /> : null}
      {visual === "story" ? <StoryStrip day={day} showCaptions={false} /> : null}
      {visual === "scene" ? <SceneImage day={day} /> : null}
      <VariantPicker day={day} />

      {/* SPEAK */}
      {board}

      <CollapsibleHelp label="Need help?" labelEs="¿Necesitas ayuda?">
        {supportContent}
      </CollapsibleHelp>

      {requiredDone ? (
        <div className="space-y-3">
          <div className="rounded-3xl border border-success/25 bg-success/8 p-4 text-center">
            <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-success">
              <Sparkles className="size-4" /> {t("practice.requiredDone")}
            </p>
            {finalIndex !== null ? (
              <p className="mt-1 text-[13px] font-semibold">{t("practice.finalSelected")} {finalIndex + 1}</p>
            ) : (
              <p className="mt-1 text-[13px] text-muted-foreground">{t("practice.pickFinal")}</p>
            )}
          </div>

          <PrimaryButton onClick={onFinish} disabled={finalIndex === null}>
            <Check className="size-5" /> {t("practice.complete")}
          </PrimaryButton>

          {slotsLeft ? (
            <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t("practice.recordAnother")}
            </p>
          ) : null}
        </div>
      ) : (
        <TranslatableText supportOnly es={`Faltan ${required - completed} ${pressure ? "respuestas" : "tomas obligatorias"}.`} align="center">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {required - completed} {pressure ? `response${required - completed === 1 ? "" : "s"}` : `required take${required - completed === 1 ? "" : "s"}`} left
          </p>
        </TranslatableText>
      )}
    </div>
  );
}
