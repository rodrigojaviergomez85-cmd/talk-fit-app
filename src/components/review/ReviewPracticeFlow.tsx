import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";
import { SpanishProvider, SpanishToggle } from "@/components/fluency/TranslatableText";
import { takeSlots } from "@/components/fluency/TakeBoard";
import { Button } from "@/components/ui/button";
import { ReviewGuide } from "./ReviewGuide";
// STEP 2–5 reuse the SAME components as the course: identical logic, no fork.
import { Rep2Copy, Rep3Shadow, Rep4MakeItYours, Rep5FinalRep } from "@/routes/practice";
import { rep2Chunks, rep4Items } from "@/lib/rep-structure";
import { isFeedbackId, type FinalCoachRetakeState, type FinalCoachState } from "@/lib/final-audio-coach";
import { objectiveResultInputFor } from "@/lib/final-coach-result";
import { getReviewModule, reviewPracticeToCourseDay } from "@/services/review/review-registry";
import type { ReviewGuideCard, ReviewModuleId, ReviewPractice } from "@/lib/review-types";
import type { ModuleId, Recording } from "@/lib/types";
import { PracticeAttempts } from "@/services/practice-attempts";
import { runReviewCoach, runReviewRetake, uploadReviewTake } from "@/services/review/review-coach-client";
import { ReviewProgress } from "@/services/review/review-progress";
import { AudioService } from "@/services/audio-service";

const SENTENCE_COUNT_MAX_BYTES = 3 * 1024 * 1024;

/** Same conservative client call used in the course: never throws, null when unavailable. */
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

const STEP_LABELS: { es: string; en: string }[] = [
  { es: "PASO 1 DE 5 · ENTIÉNDELO", en: "STEP 1 OF 5 · UNDERSTAND" },
  { es: "PASO 2 DE 5 · COPIA", en: "STEP 2 OF 5 · COPY" },
  { es: "PASO 3 DE 5 · SHADOWING", en: "STEP 3 OF 5 · SHADOW" },
  { es: "PASO 4 DE 5 · HAZLO TUYO", en: "STEP 4 OF 5 · MAKE IT YOURS" },
  { es: "PASO 5 DE 5 · TU TURNO", en: "STEP 5 OF 5 · YOUR TURN" },
];

type Props = { moduleId: ReviewModuleId; practice: ReviewPractice; guide: ReviewGuideCard[]; showEs: boolean };

export function ReviewPracticeFlow({ moduleId, practice, guide, showEs: showEsInitial }: Props) {
  const navigate = useNavigate();
  const day = useMemo(() => reviewPracticeToCourseDay(practice), [practice]);
  /** Review ids travel through curriculum-typed props; the server validates them explicitly. */
  const transportId = moduleId as unknown as ModuleId;
  const reviewModule = getReviewModule(moduleId);

  const [showEs, setShowEs] = useState(showEsInitial);
  const [step, setStep] = useState(1);
  const [subIndex, setSubIndex] = useState(0);
  const [attempted, setAttempted] = useState<string[]>([]);

  const chunks2 = useMemo(() => rep2Chunks(day), [day]);
  const items4 = useMemo(() => rep4Items(day), [day]);
  const subTotal = step === 2 ? chunks2.length : step === 4 ? items4.length : 1;

  // STEP 5: same take board as the course (3 required, optional extras, pick your final).
  const [takes, setTakes] = useState<(Recording | null)[]>(() => Array(takeSlots(day.rep5Turns)).fill(null));
  const [finalIndex, setFinalIndex] = useState<number | null>(null);
  const [finalManual, setFinalManual] = useState(false);
  const [finalRecording, setFinalRecording] = useState<Recording | null>(null);
  const [coach, setCoach] = useState<FinalCoachState | null>(null);
  const [retake, setRetake] = useState<FinalCoachRetakeState>({ status: "idle" });
  const [retakeRecording, setRetakeRecording] = useState<Recording | null>(null);
  const retakeStartedRef = useRef(false);
  const retakeFeedbackIdRef = useRef<string | null>(null);
  const finishedRef = useRef(false);
  const [capBlocked, setCapBlocked] = useState(false);

  const attemptId = useRef<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  useEffect(() => () => AudioService.stop(), []);
  useEffect(() => {
    AudioService.stop();
    window.scrollTo({ top: 0 });
  }, [step, subIndex]);

  const capStatus = useMemo(() => PracticeAttempts.status(attemptId.current), []);

  /**
   * DAILY PRACTICE CAP: the FIRST real recording of this Review practice spends
   * one of today's 5 slots. Later recordings in the same session never spend another.
   */
  function trackRecording(options?: { consumesSlot?: boolean }) {
    if (options?.consumesSlot === false) return;
    if (!attemptId.current) {
      attemptId.current = PracticeAttempts.ensure(transportId, practice.number, null).id;
    }
    if (!PracticeAttempts.consumeSlot(attemptId.current)) setCapBlocked(true);
  }

  const markAttempted = (key: string) => setAttempted((list) => (list.includes(key) ? list : [...list, key]));
  const currentKey =
    step === 2 ? `2c:${chunks2[subIndex]?.id ?? subIndex}` : step === 4 ? `4:${items4[subIndex]?.id ?? subIndex}` : null;

  const goForward = () => {
    if (subIndex < subTotal - 1) return setSubIndex(subIndex + 1);
    if (step < 5) {
      setStep(step + 1);
      setSubIndex(0);
    }
  };
  const goBack = () => {
    if (coach) return; // review is locked once the coach has the final audio
    if (subIndex > 0) return setSubIndex(subIndex - 1);
    if (step > 1) {
      setStep(step - 1);
      setSubIndex(0);
      return;
    }
    void navigate({ to: "/review/$moduleId", params: { moduleId } });
  };

  const recorded = takes.filter((t): t is Recording => Boolean(t));

  /** STEP 5 confirmation: save the practice, then run the coach on the chosen final audio. */
  function finish() {
    if (finishedRef.current) return;
    const index = finalIndex ?? takes.findIndex((t) => t?.id === recorded[recorded.length - 1]?.id);
    const final = index >= 0 ? takes[index] : null;
    if (!final) return;
    finishedRef.current = true;
    setFinalRecording(final);
    setCoach({ status: "preparing" });

    void ReviewProgress.complete({
      moduleId,
      practiceNumber: practice.number,
      speakingSeconds: final.durationSeconds,
      ideaCount: final.sentenceCount ?? null,
    });
    if (attemptId.current) {
      PracticeAttempts.complete(attemptId.current, {
        isFirstCompletion: false,
        speakingSeconds: Math.round(recorded.reduce((sum, r) => sum + r.durationSeconds, 0)),
        sentenceCount: final.sentenceCount ?? null,
      });
    }

    abort.current?.abort();
    abort.current = new AbortController();
    void runReviewCoach(
      { moduleId, practiceNumber: practice.number, recording: final, takeNumber: index + 1 },
      (s) => setCoach(s),
      abort.current.signal,
    ).then((state) => setCoach(state));
  }

  const coachResultInput = finalRecording ? objectiveResultInputFor(moduleId, day, finalRecording, null) : null;
  const retakeReady =
    (coach?.status === "ready" && isFeedbackId(coach.feedbackId)) || isFeedbackId(retakeFeedbackIdRef.current);

  function startRetake() {
    if (retakeStartedRef.current || coach?.status !== "ready" || !isFeedbackId(coach.feedbackId)) return;
    retakeFeedbackIdRef.current = coach.feedbackId ?? null;
    retakeStartedRef.current = true;
    setRetake({ status: "recording" });
  }
  function onRetakeRecorded(rec: Recording) {
    if (retake.status !== "recording" || !rec.blob) return;
    trackRecording({ consumesSlot: false }); // the bonus round never spends a second slot
    setRetakeRecording({ ...rec, countStatus: "pending", sentenceCount: null });
    setRetake({ status: "analyzing" });
    void sendRetake(rec.blob);
  }
  async function sendRetake(blob: Blob) {
    const feedbackId = retakeFeedbackIdRef.current;
    if (!isFeedbackId(feedbackId)) return setRetake({ status: "unavailable" });
    const result = await runReviewRetake({ moduleId, practiceNumber: practice.number, blob, feedbackId });
    setRetake(result);
    const ideas = await countSentences(blob);
    setRetakeRecording((prev) =>
      prev ? { ...prev, sentenceCount: ideas, countStatus: ideas === null ? "failed" : "done" } : prev,
    );
  }

  const label = STEP_LABELS[step - 1] ?? STEP_LABELS[0]!;

  return (
    <SpanishProvider value={showEs}>
      <div className="space-y-4">
        <header className="rounded-3xl bg-navy p-4 text-navy-foreground">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">
            {showEs ? label.es : label.en}
          </p>
          <h2 className="mt-1 text-xl font-extrabold">{practice.title}</h2>
          <p className="text-sm text-navy-foreground/80">{practice.titleEs}</p>
          <p className="mt-2 text-xs text-navy-foreground/70">{showEs ? practice.focusEs : practice.focus}</p>
        </header>

        <div className="flex justify-end">
          <SpanishToggle value={showEs} onChange={setShowEs} />
        </div>

        {capBlocked ? (
          <p className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
            {showEs
              ? "Ya usaste tus 5 prácticas de hoy. Vuelve mañana para seguir con Review."
              : "You've used your 5 practices for today. Come back tomorrow to continue Review."}
          </p>
        ) : null}
        {!capStatus.allowed && !capBlocked ? (
          <p className="rounded-2xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            {showEs
              ? "Puedes leer y escuchar esta práctica, pero hoy ya usaste tus 5 sesiones con grabación."
              : "You can read and listen to this practice, but you've used today's 5 recording sessions."}
          </p>
        ) : null}

        {/* Reference scene: what the learner is describing (3rd person only). */}
        {practice.sceneImage && step >= 2 ? (
          <figure className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={practice.sceneImage.src}
              alt={showEs ? practice.sceneImage.altEs : practice.sceneImage.alt}
              loading="lazy"
              width={1024}
              height={768}
              className="w-full object-cover"
            />
            <figcaption className="p-3 text-xs text-muted-foreground">
              {showEs ? practice.sceneImage.altEs : practice.sceneImage.alt}
            </figcaption>
          </figure>
        ) : null}

        {/* ------------------------------ STEP 1 ------------------------------ */}
        {step === 1 ? (
          <section className="space-y-4">
            <p className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground">
              {showEs ? practice.reminder.es : practice.reminder.en}
            </p>
            <ReviewGuide cards={guide} showEs={showEs} defaultOpen={practice.showFullGuide} errors={reviewModule?.commonErrors ?? []} heading={reviewModule?.title} headingEs={reviewModule?.titleEs} />
            <p className="rounded-2xl bg-muted/50 p-3 text-xs text-muted-foreground">
              {showEs ? practice.instructions.es : practice.instructions.en}
            </p>
            <p className="text-center text-xs text-muted-foreground">
              {showEs ? "📖 Paso sin IA · No hay evaluación automática." : "📖 Step without AI · No automatic evaluation."}
            </p>
          </section>
        ) : null}

        {/* -------------------- STEPS 2–5 · SAME COURSE LOGIC ------------------ */}
        {step === 2 ? (
          <Rep2Copy
            moduleId={transportId}
            day={day}
            index={subIndex}
            showEs={showEs}
            attempted={Boolean(currentKey && attempted.includes(currentKey))}
            onRecorded={() => {
              trackRecording();
              if (currentKey) markAttempted(currentKey);
            }}
            onSkip={goForward}
            onNext={goForward}
          />
        ) : null}

        {step === 3 ? <Rep3Shadow day={day} onNext={goForward} onSkip={goForward} /> : null}

        {step === 4 ? (
          <Rep4MakeItYours
            day={day}
            index={subIndex}
            showEs={showEs}
            attempted={Boolean(currentKey && attempted.includes(currentKey))}
            onRecorded={() => {
              trackRecording();
              if (currentKey) markAttempted(currentKey);
            }}
            onSkip={goForward}
            onNext={goForward}
          />
        ) : null}

        {step === 5 && !coach ? (
          <Rep5FinalRep
            moduleId={transportId}
            day={day}
            takes={takes}
            finalIndex={finalIndex}
            onRecorded={(index, rec) => {
              trackRecording();
              const pending: Recording = { ...rec, countStatus: "pending", sentenceCount: null };
              setTakes((list) => list.map((item, i) => (i === index ? pending : item)));
              setFinalIndex((current) => (finalManual ? current : index));
              void uploadReviewTake({ moduleId, practiceNumber: practice.number, takeNumber: index + 1, recording: rec });
              void countSentences(rec.blob ?? null).then((count) => {
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
            onSelectFinal={(index) => {
              setFinalManual(true);
              setFinalIndex(index);
            }}
            onFinish={finish}
          />
        ) : null}

        {step === 5 && coach ? (
          <FinalCoachReview
            state={coach}
            showEs={showEs}
            result={coachResultInput}
            moduleId={moduleId}
            onContinue={() => void navigate({ to: "/review/$moduleId", params: { moduleId } })}
            retake={
              coachResultInput && finalRecording && retakeReady
                ? {
                    state: retake,
                    before: {
                      seconds: Math.round(finalRecording.durationSeconds),
                      ideas:
                        typeof coachResultInput.sentenceCount === "number" ? coachResultInput.sentenceCount : null,
                    },
                    after: retakeRecording
                      ? {
                          seconds: Math.round(retakeRecording.durationSeconds),
                          ideas:
                            typeof retakeRecording.sentenceCount === "number" ? retakeRecording.sentenceCount : null,
                        }
                      : null,
                    maxSeconds: Math.max(60, day.goalSeconds[1] + 15),
                    targetSeconds: day.goalSeconds,
                    onStart: startRetake,
                    onRecorded: onRetakeRecorded,
                    onRetry: () => {
                      const blob = retakeRecording?.blob;
                      if (blob) void sendRetake(blob);
                    },
                  }
                : null
            }
          />
        ) : null}

        {!coach ? (
          <nav className="flex items-center justify-between gap-3 pt-2">
            {step > 1 ? (
              <Button variant="outline" className="min-h-[48px] flex-1" onClick={goBack}>
                <ArrowLeft className="mr-1 size-4" /> {showEs ? "ATRÁS" : "BACK"}
              </Button>
            ) : (
              <Button asChild variant="outline" className="min-h-[48px] flex-1">
                <Link to="/review/$moduleId" params={{ moduleId }}>
                  <ArrowLeft className="mr-1 size-4" /> {showEs ? "SALIR" : "EXIT"}
                </Link>
              </Button>
            )}
            {step === 1 ? (
              <Button className="min-h-[48px] flex-1" onClick={goForward}>
                {showEs ? "CONTINUAR" : "CONTINUE"} <ArrowRight className="ml-1 size-4" />
              </Button>
            ) : null}
          </nav>
        ) : null}
      </div>
    </SpanishProvider>
  );
}
