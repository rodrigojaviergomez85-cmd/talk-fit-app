import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";
import { Button } from "@/components/ui/button";
import { ReviewGuide } from "./ReviewGuide";
import {
  REVIEW_EVALUATED_TAKE,
  REVIEW_GOAL_SECONDS,
  REVIEW_GOAL_SENTENCES,
  REVIEW_REHEARSAL_SLOTS,
  type ReviewGuideCard,
  type ReviewModuleId,
  type ReviewPractice,
} from "@/lib/review-types";
import type { FinalCoachRetakeState, FinalCoachState } from "@/lib/final-audio-coach";
import type { Recording } from "@/lib/types";
import { PracticeAttempts } from "@/services/practice-attempts";
import type { ModuleId } from "@/lib/types";
import { runReviewCoach, runReviewRetake, uploadReviewTake } from "@/services/review/review-coach-client";
import { ReviewProgress } from "@/services/review/review-progress";

const MAX_ANSWER_SECONDS = 90;
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
    const res = await fetch("/api/sentence-count", { method: "POST", body: form, headers: { Authorization: `Bearer ${token}` } });
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

export function ReviewPracticeFlow({ moduleId, practice, guide, showEs }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [hideEnglish, setHideEnglish] = useState(false);
  const [rate, setRate] = useState(1);
  const [answered, setAnswered] = useState<Record<string, boolean>>({});

  // STEP 5: positions 1–3 rehearsals · 4 evaluated · 5 retake.
  const [rehearsals, setRehearsals] = useState<(Recording | null)[]>([null, null, null]);
  const [finalTake, setFinalTake] = useState<Recording | null>(null);
  const [coach, setCoach] = useState<FinalCoachState | null>(null);
  const [retake, setRetake] = useState<FinalCoachRetakeState | null>(null);
  const [retakeAudio, setRetakeAudio] = useState<{ blob: Blob; seconds: number; ideas: number | null } | null>(null);
  const [saved, setSaved] = useState(false);
  const [capBlocked, setCapBlocked] = useState(false);

  const attemptId = useRef<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);

  const capStatus = useMemo(() => PracticeAttempts.status(attemptId.current), []);

  /** One shared daily slot, consumed by the FIRST real recording of this Review practice. */
  function claimSlot(): boolean {
    if (!attemptId.current) {
      const attempt = PracticeAttempts.ensure(moduleId as unknown as ModuleId, practice.number, null);
      attemptId.current = attempt.id;
    }
    const ok = PracticeAttempts.consumeSlot(attemptId.current);
    if (!ok) setCapBlocked(true);
    return ok;
  }

  function onRehearsal(index: number, recording: Recording) {
    if (!claimSlot()) return;
    setRehearsals((prev) => prev.map((r, i) => (i === index ? recording : r)));
    void uploadReviewTake({ moduleId, practiceNumber: practice.number, takeNumber: index + 1, recording });
  }

  async function onFinalRecorded(recording: Recording) {
    if (!claimSlot()) return;
    const withStatus: Recording = { ...recording, countStatus: "pending" };
    setFinalTake(withStatus);
    setCoach({ status: "preparing" });

    const ideas = await countSentences(recording.blob ?? null);
    const counted: Recording = { ...withStatus, sentenceCount: ideas, countStatus: ideas === null ? "failed" : "done" };
    setFinalTake(counted);

    abort.current?.abort();
    abort.current = new AbortController();
    const state = await runReviewCoach(
      { moduleId, practiceNumber: practice.number, recording: counted },
      (s) => setCoach(s),
      abort.current.signal,
    );
    setCoach(state);
    if (!saved) {
      setSaved(true);
      void ReviewProgress.complete({
        moduleId,
        practiceNumber: practice.number,
        speakingSeconds: counted.durationSeconds,
        ideaCount: ideas,
      });
      if (attemptId.current) {
        PracticeAttempts.complete(attemptId.current, {
          isFirstCompletion: false,
          speakingSeconds: counted.durationSeconds,
          sentenceCount: ideas,
        });
      }
    }
  }

  async function sendRetake(blob: Blob, seconds: number) {
    const feedbackId = coach && coach.status === "ready" ? coach.feedbackId : null;
    if (!feedbackId) return;
    setRetake({ status: "analyzing" });
    const ideas = await countSentences(blob);
    setRetakeAudio({ blob, seconds, ideas });
    const result = await runReviewRetake({ moduleId, practiceNumber: practice.number, blob, feedbackId });
    setRetake(result);
  }

  const label = STEP_LABELS[step - 1] ?? STEP_LABELS[0]!;
  const canContinue = step < 5;

  return (
    <div className="space-y-4">
      <header className="rounded-3xl bg-navy p-4 text-navy-foreground">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">
          {showEs ? label.es : label.en}
        </p>
        <h2 className="mt-1 text-xl font-extrabold">{practice.title}</h2>
        <p className="text-sm text-navy-foreground/80">{practice.titleEs}</p>
        <p className="mt-2 text-xs text-navy-foreground/70">{showEs ? practice.focusEs : practice.focus}</p>
      </header>

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

      {/* ------------------------------ STEP 1 ------------------------------ */}
      {step === 1 ? (
        <section className="space-y-4">
          <p className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground">
            {showEs ? practice.reminder.es : practice.reminder.en}
          </p>
          <ReviewGuide cards={guide} showEs={showEs} defaultOpen={practice.showFullGuide} />
          <p className="rounded-2xl bg-muted/50 p-3 text-xs text-muted-foreground">
            {showEs ? practice.instructions.es : practice.instructions.en}
          </p>
          <p className="text-center text-xs text-muted-foreground">
            {showEs ? "📖 Paso sin IA · No hay evaluación automática." : "📖 Step without AI · No automatic evaluation."}
          </p>
        </section>
      ) : null}

      {/* ------------------------------ STEP 2 ------------------------------ */}
      {step === 2 ? (
        <section className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {showEs ? "Escucha cada parte y cópiala en voz alta." : "Listen to each chunk and copy it out loud."}
          </p>
          {practice.lines.map((line) => (
            <article key={line.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-base font-bold text-foreground">{line.text}</p>
                <AudioPlayer text={line.text} size="sm" label="" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{line.es}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {line.chunks.map((chunk) => (
                  <li key={chunk} className="rounded-xl bg-muted px-3 py-2 text-sm font-semibold text-foreground">
                    {chunk}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <p className="text-center text-xs text-muted-foreground">
            {showEs ? "🎧 Paso sin IA · No hay evaluación automática." : "🎧 Step without AI · No automatic evaluation."}
          </p>
        </section>
      ) : null}

      {/* ------------------------------ STEP 3 ------------------------------ */}
      {step === 3 ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2 rounded-2xl border border-border bg-card p-3">
            <div className="flex gap-2">
              {[0.5, 0.75, 1].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRate(r)}
                  className={`min-h-[44px] rounded-xl px-3 text-sm font-bold ${rate === r ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
                >
                  {r}x
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setHideEnglish((v) => !v)}
              className="flex min-h-[44px] items-center gap-2 rounded-xl bg-muted px-3 text-xs font-bold text-foreground"
            >
              {hideEnglish ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              {showEs ? "TEXTO" : "TEXT"}
            </button>
          </div>
          {practice.lines.map((line) => (
            <article key={line.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <p className={`text-base font-bold text-foreground ${hideEnglish ? "blur-sm" : ""}`}>{line.text}</p>
                <AudioPlayer text={line.text} rate={rate} size="sm" label="" />
              </div>
            </article>
          ))}
          <p className="text-center text-xs text-muted-foreground">
            {showEs ? "🎧 Paso sin IA · Habla al mismo tiempo que el audio." : "🎧 Step without AI · Speak along with the audio."}
          </p>
        </section>
      ) : null}

      {/* ------------------------------ STEP 4 ------------------------------ */}
      {step === 4 ? (
        <section className="space-y-3">
          {practice.factSheet ? (
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">
                {showEs ? "Datos" : "Facts"}
              </p>
              <ul className="mt-2 space-y-1">
                {practice.factSheet.map((f) => (
                  <li key={f.en} className="text-sm text-foreground">
                    {showEs ? f.es : f.en}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {practice.questions.map((q) => (
            <article key={q.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-base font-bold text-foreground">{q.question}</p>
                <AudioPlayer text={q.question} size="sm" label="" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{q.questionEs}</p>
              <p className="mt-2 rounded-xl bg-muted px-3 py-2 text-xs text-foreground">
                {q.hint} · <span className="text-muted-foreground">{q.hintEs}</span>
              </p>
              <div className="mt-3">
                <VoiceRecorder
                  size="md"
                  targetSeconds={[8, 20]}
                  maxSeconds={45}
                  label={answered[q.id] ? (showEs ? "GRABAR OTRA VEZ" : "RECORD AGAIN") : showEs ? "GRABAR" : "RECORD"}
                  onComplete={(recording) => {
                    if (!claimSlot()) return;
                    setAnswered((prev) => ({ ...prev, [q.id]: true }));
                    void recording;
                  }}
                />
              </div>
              {answered[q.id] ? (
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary">
                  <Check className="size-4" /> {showEs ? "Respondida" : "Answered"}
                </p>
              ) : null}
            </article>
          ))}
          <p className="text-center text-xs text-muted-foreground">
            {showEs ? "🎙️ Paso sin IA · No hay evaluación automática." : "🎙️ Step without AI · No automatic evaluation."}
          </p>
        </section>
      ) : null}

      {/* ------------------------------ STEP 5 ------------------------------ */}
      {step === 5 ? (
        <section className="space-y-4">
          <article className="rounded-2xl border border-border bg-card p-4">
            <p className="text-base font-bold text-foreground">{practice.finalPrompt.question}</p>
            <p className="mt-1 text-xs text-muted-foreground">{practice.finalPrompt.questionEs}</p>
            <p className="mt-3 rounded-xl bg-muted px-3 py-2 text-xs text-foreground">
              {showEs ? practice.finalPrompt.tips.es : practice.finalPrompt.tips.en}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {showEs
                ? `Meta: ${REVIEW_GOAL_SENTENCES} ideas completas · ${REVIEW_GOAL_SECONDS[0]}–${REVIEW_GOAL_SECONDS[1]} segundos.`
                : `Goal: ${REVIEW_GOAL_SENTENCES} complete ideas · ${REVIEW_GOAL_SECONDS[0]}–${REVIEW_GOAL_SECONDS[1]} seconds.`}
            </p>
          </article>

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">
              {showEs ? "Ensayos 1–3 · sin IA" : "Rehearsals 1–3 · no AI"}
            </p>
            <div className="mt-3 space-y-3">
              {rehearsals.map((rec, index) => (
                <div key={index} className="rounded-xl bg-muted/50 p-3">
                  <p className="mb-2 text-xs font-bold text-muted-foreground">
                    {showEs ? "AUDIO" : "AUDIO"} {index + 1} / {REVIEW_REHEARSAL_SLOTS}
                  </p>
                  <VoiceRecorder
                    size="md"
                    targetSeconds={REVIEW_GOAL_SECONDS}
                    maxSeconds={MAX_ANSWER_SECONDS}
                    label={rec ? (showEs ? "GRABAR OTRA VEZ" : "RECORD AGAIN") : showEs ? "GRABAR" : "RECORD"}
                    onComplete={(recording) => onRehearsal(index, recording)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-primary bg-card p-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">
              {showEs ? `AUDIO ${REVIEW_EVALUATED_TAKE} · EVALUADO POR LA IA` : `AUDIO ${REVIEW_EVALUATED_TAKE} · EVALUATED BY AI`}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {showEs
                ? "Esta es tu respuesta final. La IA analizará este audio y puede cometer errores; úsala como guía."
                : "This is your final answer. AI analyzes this audio and may make mistakes; use it as a guide."}
            </p>
            {!finalTake ? (
              <div className="mt-3">
                <VoiceRecorder
                  size="lg"
                  targetSeconds={REVIEW_GOAL_SECONDS}
                  maxSeconds={MAX_ANSWER_SECONDS}
                  label={showEs ? "GRABAR RESPUESTA FINAL" : "RECORD FINAL ANSWER"}
                  onComplete={(recording) => void onFinalRecorded(recording)}
                />
              </div>
            ) : null}
          </div>

          {coach && finalTake ? (
            <FinalCoachReview
              state={coach}
              showEs={showEs}
              moduleId={moduleId}
              result={{
                moduleId,
                sentenceCount: finalTake.sentenceCount,
                countStatus: finalTake.countStatus,
                durationSeconds: finalTake.durationSeconds,
                goalSentences: REVIEW_GOAL_SENTENCES,
                goalSeconds: REVIEW_GOAL_SECONDS,
                rolePlay: false,
              }}
              onContinue={() => void navigate({ to: "/review/$moduleId", params: { moduleId } })}
              retake={
                coach.status === "ready" && coach.feedbackId
                  ? {
                      state: retake ?? { status: "idle" },
                      before: { seconds: finalTake.durationSeconds, ideas: finalTake.sentenceCount ?? null },
                      after: retakeAudio ? { seconds: retakeAudio.seconds, ideas: retakeAudio.ideas } : null,
                      maxSeconds: MAX_ANSWER_SECONDS,
                      targetSeconds: REVIEW_GOAL_SECONDS,
                      question: practice.finalPrompt.question,
                      onStart: () => setRetake({ status: "recording" }),
                      onRecorded: (recording) => {
                        if (recording.blob) void sendRetake(recording.blob, recording.durationSeconds);
                      },
                      onRetry: retakeAudio ? () => void sendRetake(retakeAudio.blob, retakeAudio.seconds) : undefined,
                    }
                  : null
              }
            />
          ) : null}
        </section>
      ) : null}

      <nav className="flex items-center justify-between gap-3 pt-2">
        {step > 1 ? (
          <Button variant="outline" className="min-h-[48px] flex-1" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft className="mr-1 size-4" /> {showEs ? "ATRÁS" : "BACK"}
          </Button>
        ) : (
          <Button asChild variant="outline" className="min-h-[48px] flex-1">
            <Link to="/review/$moduleId" params={{ moduleId }}>
              <ArrowLeft className="mr-1 size-4" /> {showEs ? "SALIR" : "EXIT"}
            </Link>
          </Button>
        )}
        {canContinue ? (
          <Button className="min-h-[48px] flex-1" onClick={() => setStep((s) => s + 1)}>
            {showEs ? "CONTINUAR" : "CONTINUE"} <ArrowRight className="ml-1 size-4" />
          </Button>
        ) : null}
      </nav>
    </div>
  );
}
