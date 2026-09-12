import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Info, Sparkles } from "lucide-react";
import { isUnlimitedEmail } from "@/lib/unlimited-access";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { TappableSentence } from "@/components/fluency/TappableSentence";
import { toneForTurn, type ModelTone } from "@/lib/model-tone";
import { rep2Chunks, rep4Items, rep2ChunkText, REP4_MAX, isRep2CorrectionEnabled } from "@/lib/rep-structure";
export { REP4_MAX };
import { RecordingPlayback } from "@/components/fluency/RecordingPlayback";
import { Rep2Feedback, type Rep2CorrectionResult } from "@/components/fluency/Rep2Feedback";
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
import { ReviewGuide } from "@/components/review/ReviewGuide";
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
import { PracticeAttempts } from "@/services/practice-attempts";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { AuthGate } from "@/components/fluency/AuthGate";
import { CloudSync } from "@/services/cloud-sync";
import { isFeedbackId, isRetakePilot, sourceTurnNumberFor, type FinalCoachRetakeState, type FinalCoachState } from "@/lib/final-audio-coach";
import { objectiveResultInputFor } from "@/lib/final-coach-result";
import { runCoachWithDeadline, type CoachDeadlineHandle } from "@/lib/final-coach-deadline";
import { requestFinalCoachRetake, runFinalCoachPipeline } from "@/services/final-audio-coach-client";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";
import { createStep5CompletionController, type Step5CompletionController } from "@/lib/step5-completion";
import type { CourseDay, JourneyState, ModelLine, ModuleId, Recording, RepLabel } from "@/lib/types";
import type { FinalRepSaveState } from "@/components/fluency/DayCompleteScreen";
import { cn } from "@/lib/utils";
import { useAppLang, useT, tPair, type TKey } from "@/lib/i18n";
import { setPreferencesScope, loadPreferences } from "@/services/preferences";
import { playGoodFeedbackSound, playCorrectFeedbackSound, unlockFeedbackAudio } from "@/lib/feedback-sounds";
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
      { name: "description", content: "Five speaking steps a day: listen, copy, shadow, personalize and record your final step in English." },
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
  { en: "STEP 1 OF 5 · LISTEN", es: "PASO 1 DE 5 · ESCUCHA" },
  { en: "STEP 2 OF 5 · COPY", es: "PASO 2 DE 5 · COPIA" },
  { en: "STEP 3 OF 5 · SHADOW", es: "PASO 3 DE 5 · SHADOWING" },
  { en: "STEP 4 OF 5 · MAKE IT YOURS", es: "PASO 4 DE 5 · HAZLO TUYO" },
  { en: "STEP 5 OF 5 · YOUR TURN", es: "PASO 5 DE 5 · TU TURNO" },
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
  const { module: moduleId, day: dayNumber } = Route.useSearch();
  const { lang } = useAppLang();
  const t = useT();
  const content = useModuleContent(moduleId);
  const navigate = useNavigate();
  // Ladder guard: a locked module never opens in Practice — send the learner to its locked screen.
  const locked = useMemo(() => !JourneyService.isModuleUnlocked(JourneyService.load(), moduleId), [moduleId]);
  useEffect(() => {
    if (locked) void navigate({ to: "/module/$moduleId", params: { moduleId }, replace: true });
  }, [locked, moduleId, navigate]);

  const { user } = useAuth();
  // TEST ACCOUNT EXEMPTION — remove this line and its usage to drop the exemption.
  const isUnlimitedTestUser = isUnlimitedEmail(user?.email);

  // DAILY PRACTICE CAP — 5 real speaking sessions per LOCAL calendar day, any
  // mix of new days and repeats. The session already in progress here has
  // already paid for its slot, so refresh/resume is never blocked.
  const attemptId = useMemo(
    () => (typeof window === "undefined" ? null : PracticeAttempts.ensure(moduleId, dayNumber, user?.id ?? null).id),
    [moduleId, dayNumber, user?.id],
  );
  const [cap, setCap] = useState(() => PracticeAttempts.status(attemptId));
  useEffect(() => {
    setCap(PracticeAttempts.status(attemptId));
    // The account is authoritative: pull so 5 on the phone is not 10 across devices.
    if (!user) return;
    let cancelled = false;
    void PracticeAttempts.pull().then(() => {
      if (!cancelled) setCap(PracticeAttempts.status(attemptId));
    });
    return () => {
      cancelled = true;
    };
  }, [attemptId, user]);

  if (locked || content.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {lang === "es" ? "CARGANDO…" : "LOADING…"}
        </p>
      </div>
    );
  }

  if (!cap.allowed && !isUnlimitedTestUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-[12px] font-black uppercase tracking-[0.16em] text-success">
            {t("dailyCap.badge").replace("{cap}", String(cap.cap))}
          </p>
          <h1 className="mt-3 text-lg font-black tracking-tight text-foreground">{t("dailyCap.title")}</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            {t("dailyCap.body").replace("{cap}", String(cap.cap))}
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/", replace: true })}
            className="mt-6 min-h-[44px] w-full rounded-2xl bg-primary px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-primary-foreground"
          >
            {t("dailyCap.backHome")}
          </button>
        </div>
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

  // Remount on module/day change: navigating from Day Complete (e.g. "SEE NEXT WEEK")
  // must start the new day fresh, never keep the previous day's completed state.
  return <PracticeFlow key={`${moduleId}:${dayNumber}`} module={content.module} />;

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
  /** True once the learner explicitly taps USE AS FINAL; auto-defaults must not override it. */
  const [finalManual, setFinalManual] = useState(false);
  const [finalRecording, setFinalRecording] = useState<Recording | null>(null);
  const [saveState, setSaveState] = useState<FinalRepSaveState>("idle");
  /** Separate from saveState: the Final Step cloud save and the AI Coach are different responsibilities. */
  const [coachState, setCoachState] = useState<FinalCoachState>({ status: "idle" });
  const coachDeadline = useRef<CoachDeadlineHandle | null>(null);
  /** Post-Step-5 state: day already committed, learner reviews the AI Coach before Day Complete. */
  const [coachReviewActive, setCoachReviewActive] = useState(false);
  /**
   * Pilot-only optional retake (BONUS round). Session state only: the retake
   * never touches takes, Final Audio, completion, streak, habit or progression.
   */
  const [retakeState, setRetakeState] = useState<FinalCoachRetakeState>({ status: "idle" });
  const [retakeRecording, setRetakeRecording] = useState<Recording | null>(null);
  const retakeStartedRef = useRef(false);
  /** The exact coach review the retake belongs to, frozen when the retake starts. */
  const retakeFeedbackIdRef = useRef<string | null>(null);
  /** Idempotency guard: the selected Final Audio commits the day exactly once in this flow. */
  const completionCommittedRef = useRef<Step5CompletionController | null>(null);
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
    // Once the day is committed (review or Day Complete) the cleared session must never be re-saved.
    if (!ready || resume || done || coachReviewActive) return;
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
  }, [ready, resume, done, coachReviewActive, moduleId, dayNumber, day.week, stage, subIndex, attempted, skipped]);

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
    // Coach Review: the day is committed and Step 5 is locked — no way back to the TakeBoard.
    if (coachReviewActive) return;
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

  const trackSeconds = (recording: Recording, options?: { consumesSlot?: boolean }) => {
    practiceSeconds.current += recording.durationSeconds;
    // DAILY PRACTICE CAP: the learner's FIRST real recording of this session
    // spends one of today's 5 slots. Idempotent — later recordings and a page
    // refresh belong to the same session and never spend another.
    //
    // The optional retake happens AFTER the day was committed, so the session's
    // attempt is already closed: calling ensure() there would mint a brand-new
    // attempt and silently burn a second slot. The bonus round is part of the
    // same practice, so it never counts.
    if (options?.consumesSlot === false) return;
    PracticeAttempts.consumeSlot(PracticeAttempts.ensure(moduleId, dayNumber, user?.id ?? null).id);
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
      // Metadata only: which role-play turn this take answered (null for classic STEP 5).
      sourceTurnNumber: sourceTurnNumberFor(day, index, rec.label),
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

  /**
   * Confirming STEP 5 commits the day EXACTLY ONCE, then opens the AI Coach
   * Review inside Step 5. Day Complete only appears after CONTINUE. The
   * controller ref (not button state) is the idempotency guard.
   */
  const finish = () => {
    if (done || coachReviewActive || completionCommittedRef.current?.committed) return;
    const final = (finalIndex !== null ? takes[finalIndex] : null) ?? recorded[recorded.length - 1];
    if (!final) return;
    const first = recorded[0] ?? final;
    const finalTake = (finalIndex ?? takes.findIndex((take) => take?.id === final.id)) + 1;

    const controller = createStep5CompletionController<JourneyState>({
      commitDay: () => {
        // Close the timer for the current rep before snapshotting durations.
        const d = [...repDurations.current];
        d[stage] = (d[stage] ?? 0) + (Date.now() - stageEnteredAt.current) / 1000;
        const r = (i: number) => Math.round(d[i] ?? 0);
        const before = JourneyService.load();
        // First completion advances the course; a repeat only logs practice.
        const isFirstCompletion = !before.days[`${moduleId}:${day.day}`];
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
        // Practice activity log (drives the 5-a-day counter, not progress).
        PracticeAttempts.complete(PracticeAttempts.ensure(moduleId, day.day, user?.id ?? null).id, {
          isFirstCompletion,
          speakingSeconds: Math.round(practiceSeconds.current),
          sentenceCount: final.sentenceCount ?? null,
        });
        return next;
      },
      clearSession: () => PracticeSessionService.clear(moduleId, day.day),
      completeSession: () => void CloudSync.completeSession(moduleId, day.day).catch(() => undefined),
      cloudSave: (next) => cloudSave(final, next),
      // Stay visually inside STEP 5: the selected Final Audio is now authoritative.
      onReviewActive: () => setCoachReviewActive(true),
      startCoach: () => {
        // The pipeline itself uploads the Final Take (idempotent, preserving its
        // idea count) and marks it Final BEFORE the single analysis request.
        // Actual take number, never clamped (Pressure Round may exceed 5).
        if (finalTake <= 0) {
          setCoachState({ status: "unavailable" });
          return;
        }
        // 45s fail-open: UI only. The day was committed before this started, so a
        // hung provider/network can never trap the learner on "Analyzing…".
        coachDeadline.current = runCoachWithDeadline(
          (emit, signal) =>
            runFinalCoachPipeline(
              { moduleId, day, finalRecording: final, finalTakeNumber: finalTake },
              emit,
              undefined,
              signal,
            ),
          setCoachState,
        );
      },
      onDayComplete: () => setDone(true),
    });
    completionCommittedRef.current = controller;
    controller.confirm();
  };

  /** CONTINUE after the Coach Review: UI only — the day was committed before the review. */
  const continueToDayComplete = () => {
    completionCommittedRef.current?.continueToDayComplete();
  };

  // Leaving the flow while the coach is still working: clear the deadline, stop polling, no late setState.
  useEffect(() => () => coachDeadline.current?.cancel(), []);

  /**
   * The retake exists only against a review that carries a valid feedback id.
   * Once started, the frozen id keeps the panel alive through recording,
   * polling and technical retries.
   */
  const retakeIdentityReady =
    (coachState.status === "ready" && isFeedbackId(coachState.feedbackId)) || isFeedbackId(retakeFeedbackIdRef.current);

  /** ONE optional retake per coach review. Guarded by a ref: a second tap can never start another paid round. */
  const startRetake = () => {
    // No feedback identity → no retake: it could otherwise be bound to another review.
    if (!isRetakePilot(moduleId, day.day) || retakeStartedRef.current || coachState.status !== "ready" || !isFeedbackId(coachState.feedbackId)) return;
    retakeFeedbackIdRef.current = coachState.feedbackId ?? null;
    retakeStartedRef.current = true;
    setRetakeState({ status: "recording" });
  };
  const onRetakeRecorded = (rec: Recording) => {
    if (retakeState.status !== "recording") return;
    trackSeconds(rec, { consumesSlot: false });
    setRetakeRecording({ ...rec, countStatus: "pending", sentenceCount: null });
    setRetakeState({ status: "analyzing" });
    if (!rec.blob) {
      setRetakeState({ status: "unavailable" });
      return;
    }
    // ONE transcription for the whole retake: the comparison endpoint returns the
    // deterministic idea count from that same transcript (no second STT is ever paid for).
    void sendRetake(rec.blob, rec.id);
  };
  /**
   * RETRY COMPARISON after a TECHNICAL failure: re-sends the exact same
   * `retakeRecording.blob`. No VoiceRecorder, no new Recording, no day-level
   * side effects of any kind (the day was committed long before this point).
   */
  const retryRetakeComparison = () => {
    const blob = retakeRecording?.blob;
    const id = retakeRecording?.id;
    if (retakeState.status !== "retryable" || !blob || !id) return;
    setRetakeState({ status: "analyzing" });
    void sendRetake(blob, id);
  };

  /**
   * Objective result for the Coach Review (local data, 0 AI calls). Reads the
   * LIVE take so the async idea count (pending → done) updates in place.
   */
  const finalSourceTurn = (() => {
    if (!finalRecording) return null;
    const liveIndex = takes.findIndex((take) => take?.id === finalRecording.id);
    if (liveIndex < 0) return null;
    const live = takes[liveIndex] ?? finalRecording;
    return sourceTurnNumberFor(day, liveIndex, live.label);
  })();

  /**
   * The EXACT answer the retake repeats, taken from the trusted CourseDay:
   * classic STEP 5 → the day's question; role play / Pressure Round → that turn
   * (its label and situation). Never a generic or invented prompt.
   */
  const retakeContext = (() => {
    const turns = day.rep5Turns;
    if (finalSourceTurn && turns?.length) {
      const turn = turns[finalSourceTurn - 1];
      if (turn) {
        // The situation belongs to the round header, which sits on the round's first turn.
        let situation: string | undefined;
        for (let i = finalSourceTurn - 1; i >= 0; i -= 1) {
          const round = turns[i]?.round;
          if (round) {
            situation = (esUi ? (round.situationEs ?? round.titleEs) : (round.situation ?? round.title)) || undefined;
            break;
          }
        }
        return {
          question: esUi ? turn.es : turn.text,
          turnLabel: esUi ? turn.labelEs : turn.label,
          ...(situation ? { situation } : {}),
        };
      }
    }
    return { question: esUi ? day.rep5Prompt.questionEs : day.rep5Prompt.question };
  })();

  /** Compact reminder of the feedback just read — same data on screen, 0 extra AI calls. */
  const retakeReminders = (() => {
    if (coachState.status !== "ready") return [];
    const f = coachState.feedback;
    const list = (f.corrections ?? []).slice(0, 3).map((c) => `${c.said} → ${c.betterVersion}`);
    const next = esUi ? f.nextStepEs : f.nextStepEn;
    if (next) list.push(next);
    return list;
  })();

  /** Sends the retake audio for the EXACT answer that was reviewed (role-play turn included). */
  function sendRetake(blob: Blob, recordingId: string) {
    // Identity frozen when the retake started: recording, polling and technical
    // retries all target the SAME review the learner read.
    const feedbackId = retakeFeedbackIdRef.current;
    if (!feedbackId) {
      setRetakeState({ status: "unavailable" });
      return;
    }
    void requestFinalCoachRetake({ moduleId, day: day.day, blob, feedbackId, sourceTurnNumber: finalSourceTurn }).then((state) => {
      setRetakeState(state);
      const count = state.status === "ready" ? (state.ideaCount ?? null) : null;
      setRetakeRecording((current) =>
        current && current.id === recordingId
          ? count === null
            ? { ...current, countStatus: "failed", sentenceCount: null }
            : { ...current, countStatus: "done", sentenceCount: count }
          : current,
      );
    });
  }

  const coachResultInput = (() => {
    if (!finalRecording) return null;
    const liveIndex = takes.findIndex((take) => take?.id === finalRecording.id);
    const live = (liveIndex >= 0 ? takes[liveIndex] : null) ?? finalRecording;
    return objectiveResultInputFor(moduleId, day, live, finalSourceTurn);
  })();


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
              <IntroStep moduleId={moduleId} day={day} onNext={goForward} onExit={() => setConfirmExit(true)} />
              <TodaysPastVerbs verbs={todaysVerbs} returnTo={{ moduleId, day: dayNumber }} />
            </>
          ) : null}
          {stage === 1 ? <Rep1Listen day={day} showEs={esUi} onNext={goForward} /> : null}
          {stage === 2 && !micChecked ? (
            <MicTest onPass={() => setMicChecked(true)} onSkip={() => setMicChecked(true)} />
          ) : null}
          {stage === 2 && micChecked ? (
            <Rep2Copy
              moduleId={moduleId}
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
          {stage === 3 ? <Rep3Shadow day={day} onNext={goForward} onSkip={goForward} /> : null}
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
          {stage === 5 && !coachReviewActive && takeErrors.length > 0 ? (
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
          {stage === 5 && coachReviewActive ? (
            /* Day already committed. Step 5 is locked: no TakeBoard, no re-selection of Final. */
            <div className="space-y-5">
              <RepHeader titleKey="rep5.title" instrKey="rep5.instr" label={day.rep5Label} copy={day.repCopy?.rep5} />
              <FinalCoachReview
                state={coachState}
                showEs={esUi}
                result={coachResultInput}
                moduleId={moduleId}
                onContinue={continueToDayComplete}
                retake={
                  // No valid feedback identity → no retake panel at all: a legacy
                  // response must never show a button that cannot work.
                  isRetakePilot(moduleId, day.day) && coachResultInput && finalRecording && retakeIdentityReady
                    ? {
                        state: retakeState,
                        before: {
                          seconds: Math.round(finalRecording.durationSeconds),
                          ideas: typeof coachResultInput.sentenceCount === "number" ? coachResultInput.sentenceCount : null,
                        },
                        after: retakeRecording
                          ? {
                              seconds: Math.round(retakeRecording.durationSeconds),
                              ideas: typeof retakeRecording.sentenceCount === "number" ? retakeRecording.sentenceCount : null,
                            }
                          : null,
                        // A role-play turn is retaken alone: never impose the whole activity's length on it.
                        maxSeconds: Math.max(60, (coachResultInput.turnTargetSeconds ?? day.goalSeconds)[1] + 15),
                        targetSeconds: coachResultInput.turnTargetSeconds ?? day.goalSeconds,
                        ...retakeContext,
                        reminders: retakeReminders,

                        onStart: startRetake,
                        onRecorded: onRetakeRecorded,
                        onRetry: retryRetakeComparison,
                      }
                    : null
                }
              />
            </div>
          ) : null}
          {stage === 5 && !coachReviewActive ? (
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
                // Classic: auto-default to the newest take only until the learner picks one manually.
                setFinalIndex((current) =>
                  isPressureRound(day.rep5Turns) ? (current ?? index) : finalManual ? current : index,
                );
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
                setFinalIndex((current) => {
                  if (current !== index) return current;
                  // Deleted the selected Final Rep: clear it; auto-default resumes from remaining takes.
                  setFinalManual(false);
                  return null;
                });
              }}
              onSelectFinal={(index) => {
                setFinalIndex(index);
                setFinalManual(true);
              }}
              onFinish={finish}
            />
          ) : null}

          {!coachReviewActive && (stage > 0 || subIndex > 0) ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="size-4" aria-hidden /> {esUi ? "ATRÁS" : "BACK"}
            </button>
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

function IntroStep({
  moduleId,
  day,
  onNext,
  onExit,
}: {
  moduleId: ModuleId;
  day: CourseDay;
  onNext: () => void;
  onExit: () => void;
}) {
  const t = useT();
  const { lang } = useAppLang();
  const [showEs] = useEsSupportPref();
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

      {day.guideCards?.length ? (
        <ReviewGuide
          cards={day.guideCards}
          showEs={showEs}
          defaultOpen={false}
          heading={day.guideTitle ?? "grammar"}
          headingEs={day.guideTitleEs ?? "gramática"}
          errors={day.guideErrors ?? []}
        />
      ) : (
        <CollapsibleHelp label={t("intro.moreHelp")} labelEs={t("intro.moreHelp")}>
          {rest.length > 0 ? (
            <div className="space-y-1.5 rounded-2xl bg-secondary p-3">
              {rest.map((example) => (
                <p key={example} className="text-[16px] font-bold leading-snug text-foreground">
                  {example}
                </p>
              ))}
            </div>
          ) : null}
          <QuestionBanner day={day} />
          {day.storyPanels?.length ? <StoryStrip day={day} showCaptions={false} /> : null}
          {(day.focus || day.topic) ? (
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {lang === "es" ? day.focusEs : day.focus} {lang === "es" ? day.topicEs : day.topic}
            </p>
          ) : null}

        </CollapsibleHelp>
      )}


      <button
        type="button"
        onClick={onExit}
        className="min-h-[44px] w-full rounded-2xl border border-border text-sm font-extrabold uppercase tracking-[0.14em] text-muted-foreground"
      >
        {lang === "es" ? "SALIR" : "EXIT"}
      </button>
    </div>
  );
}

/* --------------------------- Resume / exit UI ---------------------------- */

const RESUME_LABELS = [
  { en: "INTRO", es: "INTRO" },
  { en: "STEP 1", es: "PASO 1" },
  { en: "STEP 2", es: "PASO 2" },
  { en: "STEP 3", es: "PASO 3" },
  { en: "STEP 4", es: "PASO 4" },
  { en: "STEP 5", es: "PASO 5" },
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
      <PastVerbCards day={day} collapsed={heard} />
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

/** Step 2 model-audio speeds: slow, medium, normal. */
const REP2_SPEEDS = [0.5, 0.75, 0.9] as const;

export function Rep2Copy({
  moduleId,
  day,
  index,
  chunkImage,
  showEs,
  attempted,
  onRecorded,
  onSkip,
  onNext,
}: {
  moduleId: ModuleId;
  day: CourseDay;
  index: number;
  chunkImage?: { src: string; alt: string; altEs: string } | undefined;
  showEs: boolean;
  attempted: boolean;
  onRecorded: (rec: Recording) => void;
  onSkip: () => void;
  onNext: () => void;
}) {
  const t = useT();
  const correctionEnabled = isRep2CorrectionEnabled(moduleId, day);
  const chunks = rep2Chunks(day);
  const chunk = chunks[index] ?? chunks[0]!;
  const [mine, setMine] = useState<Recording | null>(null);
  const [correction, setCorrection] = useState<Rep2CorrectionResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [retries, setRetries] = useState(0);
  /** True between TRY AGAIN and the next completed recording: NEXT stays hidden, only record or SKIP. */
  const [retryPending, setRetryPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  /** Model audio speed for Step 2 — slow options for learners who miss the pronunciation. */
  const [speed, setSpeed] = useState<number>(0.9);

  useEffect(() => {
    setMine(null);
    setCorrection(null);
    setChecking(false);
    setRetries(0);
    setRetryPending(false);
    setErrorMsg(null);
  }, [index, moduleId, day.day]);

  const level = supportLevel(day);
  const chunkText = rep2ChunkText(chunk);
  // Long higher-level chunks need a little more room so the learner is never cut off mid-model.
  const chunkWords = chunkText.trim().split(/\s+/).filter(Boolean).length;
  const recordSeconds = chunkWords > 24 ? 45 : 30;
  const isLast = index >= chunks.length - 1;
  const feedbackOwnsNav = correctionEnabled && (checking || correction !== null || retryPending);

  const playFeedbackSoundOnce = (status: Rep2CorrectionResult["status"]) => {
    try {
      if (!loadPreferences().feedbackSoundsEnabled) return;
      if (AudioService.isPlaying()) return; // learning audio always has priority
      if (status === "good") playGoodFeedbackSound();
      else if (status === "correct") playCorrectFeedbackSound();
    } catch {
      /* sound is enhancement only */
    }
  };

  const checkCorrection = async (blob: Blob) => {
    // Set checking BEFORE any async work so the feedback card owns navigation
    // immediately and the generic NEXT button cannot flash.
    setChecking(true);
    setErrorMsg(null);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setErrorMsg("Correction unavailable.");
        return;
      }
      const form = new FormData();
      form.append("file", blob, "take.webm");
      form.append("moduleId", moduleId);
      form.append("day", String(day.day));
      form.append("chunkId", chunk.id);
      const res = await fetch("/api/rep2-correction", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Correction unavailable." }));
        console.warn("[rep2-correction]", res.status, body.error);
        setErrorMsg(body.error as string);
        return;
      }
      const result = (await res.json()) as Rep2CorrectionResult;
      setCorrection(result);
      // Fires once per NEW result (never on rerender), only after recording
      // has stopped, and never over learning audio. UNCERTAIN stays silent.
      playFeedbackSoundOnce(result.status);
    } catch (err) {
      console.error("[rep2-correction]", err);
      setErrorMsg("Correction unavailable.");
    } finally {
      setChecking(false);
    }
  };

  const tryAgain = () => {
    setMine(null);
    setCorrection(null);
    setErrorMsg(null);
    setRetries((r) => r + 1);
    setRetryPending(true);
  };

  return (
    <div className="space-y-5">
      <RepHeader titleKey="rep2.title" instrKey="rep2.instr" copy={day.repCopy?.rep2} />

      <PowerChunks chunks={day.powerChunks} voice={day.speakerVoice} />

      {chunkImage ? (
        <figure className="overflow-hidden rounded-3xl border border-border bg-card">
          <img
            src={chunkImage.src}
            alt={showEs ? chunkImage.altEs : chunkImage.alt}
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="p-3 text-xs text-muted-foreground">
            {showEs ? chunkImage.altEs : chunkImage.alt}
          </figcaption>
        </figure>
      ) : (
        <SceneImage day={day} />
      )}
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {t("practice.chunk")} {index + 1} {t("practice.of")} {chunks.length}
      </p>

      <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        {chunk.lines.map((line) => (
          <TranslatableText key={line.id} es={line.es}>
            <TappableSentence text={line.text} voice={day.speakerVoice} />
          </TranslatableText>
        ))}
        <p className="text-[11px] font-semibold text-muted-foreground">
          {t("practice.tapWordHint")}
        </p>
      </div>

      {/* Model audio speed: slow options for learners who miss the pronunciation. */}
      <div className="flex gap-2" role="group" aria-label="Speed">
        {REP2_SPEEDS.map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => setSpeed(rate)}
            className={cn(
              "min-h-[40px] flex-1 rounded-2xl border px-3 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
              speed === rate ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground",
            )}
          >
            {rate}x
          </button>
        ))}
      </div>

      <AudioPlayer text={chunkText} label={t("practice.listen")} rate={speed} voice={day.speakerVoice} />

      {/* Genuine tap on the recorder unlocks Web Audio for iOS/Safari — no prompt, no blocking. */}
      <div onPointerDownCapture={correctionEnabled ? unlockFeedbackAudio : undefined}>
        <VoiceRecorder
          key={retries}
          label={mine ? t("practice.repeat") : t("practice.record")}
          maxSeconds={recordSeconds}
          showTimer
          onComplete={(rec) => {
            setMine(rec);
            setRetryPending(false);
            onRecorded(rec);
            if (correctionEnabled && rec.blob) {
              void checkCorrection(rec.blob);
            }
          }}
        />
        <Rep2AiDisclaimer />
      </div>

      {mine ? <RecordingPlayback url={mine.url} label={t("practice.listenToMe")} /> : null}

      {retryPending && !checking && !correction ? (
        <>
          <HelperText text={t("practice.recordOnce")} />
          <SkipLink label={t("practice.skipChunk")} onClick={onSkip} />
        </>
      ) : null}

      {checking ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-muted py-4 text-[13px] font-semibold text-muted-foreground">
          <span className="inline-block size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          {t("rep2.checking")}
        </div>
      ) : null}

      {errorMsg ? (
        <>
          <p className="text-center text-[12px] font-medium text-destructive">{errorMsg}</p>
          <SkipLink label={t("practice.skipChunk")} onClick={onSkip} />
        </>
      ) : null}

      {correction && !checking ? (
        <Rep2Feedback
          result={correction}
          voice={day.speakerVoice}
          onTryAgain={tryAgain}
          onSkip={onSkip}
          onNext={onNext}
          nextLabel={isLast ? t("practice.nextRep") : t("practice.nextChunk")}
          canRetry={retries < 2}
        />
      ) : null}

      {/* While a correction is in flight or on screen, the feedback card owns navigation. */}
      {feedbackOwnsNav ? null : (
        <>
          <PrimaryButton onClick={onNext} disabled={!attempted}>
            {isLast ? t("practice.nextRep") : t("practice.nextChunk")} <ArrowRight className="size-5" />
          </PrimaryButton>

          {attempted ? null : (
            <>
              <HelperText text={t("practice.recordOnce")} />
              <SkipLink label={t("practice.skipChunk")} onClick={onSkip} />
            </>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Subtle STEP 2-only AI correction disclaimer. Appears directly below the
 * recorder/timer so the learner knows the upcoming comparison is automated.
 */
function Rep2AiDisclaimer() {
  const tt = useT();
  return (
    <p className="mx-auto flex max-w-xs items-start justify-center gap-1.5 text-center text-[11px] leading-snug text-muted-foreground">
      <Info className="mt-0.5 size-3.5 shrink-0 opacity-80" aria-hidden="true" />
      <span>{tt("rep2.aiDisclaimer")}</span>
    </p>
  );
}

/**
 * Subtle STEP 5-only AI Coach disclaimer. Appears directly below the speaking
 * goal and before the Audio Take cards so the learner knows the final audio
 * analysis is automated.
 */
function Rep5AiDisclaimer() {
  const tt = useT();
  return (
    <p className="mx-auto flex max-w-xs items-start justify-center gap-1.5 text-center text-[11px] leading-snug text-muted-foreground">
      <Info className="mt-0.5 size-3.5 shrink-0 opacity-80" aria-hidden="true" />
      <span>{tt("rep5.aiDisclaimer")}</span>
    </p>
  );
}

/**
 * Subtle STEP 3 + STEP 4 status line. No AI evaluation happens in these steps,
 * so we reassure the learner that the practice is for rhythm/fluency only.
 */
function NoAiDisclaimer({ tKey }: { tKey: "rep3.noAi" | "rep4.noAi" }) {
  const tt = useT();
  return <p className="text-center text-[11px] leading-snug text-muted-foreground">{tt(tKey)}</p>;
}

/* -------------------------------- Rep 3 ---------------------------------- */

/**
 * Live shadowing only: continuous model audio + chunk highlight, the learner
 * speaks WITH the model. No recording, no images — deliberately unlike Rep 2.
 */
export function Rep3Shadow({ day, onNext, onSkip }: { day: CourseDay; onNext: () => void; onSkip: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-navy p-5 space-y-2">
        <RepHeader titleKey="rep3.title" instrKey="rep3.instr" cueKey="rep3.cue" dark />
        <NoAiDisclaimer tKey="rep3.noAi" />
      </div>

      <ShadowKaraoke
        lines={day.lines}
        text={CourseService.getModelText(day)}
        voice={day.speakerVoice}
        onNext={onNext}
        onSkip={onSkip}
      />
    </div>
  );
}

/* -------------------------------- Rep 4 ---------------------------------- */

export function Rep4MakeItYours({
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
      <NoAiDisclaimer tKey="rep4.noAi" />

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

export function Rep5FinalRep({
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

      <Rep5AiDisclaimer />

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
              <Sparkles className="size-4" />{" "}
              {lang === "es"
                ? `${required} ${pressure ? "respuestas obligatorias completas" : "pasos obligatorios completos"} ✓`
                : `${required} required ${pressure ? "responses" : "steps"} complete ✓`}
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
