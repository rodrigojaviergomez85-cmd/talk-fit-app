import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Play, RotateCcw, SkipForward } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { useRecordingPlayback } from "@/hooks/use-recording-playback";
import { AudioService } from "@/services/audio-service";
import { useAppLang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import type { Recording } from "@/lib/types";
import { cn } from "@/lib/utils";
import welcomeClip from "@/assets/interview/mike-welcome.mp4.asset.json";
import questionClip from "@/assets/interview/mike-question-1.mp4.asset.json";
import waitingClip from "@/assets/interview/mike-waiting.mp4.asset.json";
import tellMeMoreClip from "@/assets/interview/mike-tell-me-more.mp4.asset.json";
import routineClip from "@/assets/interview/mike-routine.mp4.asset.json";
import presentProgressiveClip from "@/assets/interview/mike-present-progressive.mp4.asset.json";
import lastJobClip from "@/assets/interview/mike-last-job.mp4.asset.json";
import explainWhyClip from "@/assets/interview/mike-explain-why.mp4.asset.json";
import favoriteMovieClip from "@/assets/interview/mike-favorite-movie.mp4.asset.json";
import opinionClip from "@/assets/interview/mike-opinion.mp4.asset.json";
import pastProgressiveClip from "@/assets/interview/mike-past-progressive.mp4.asset.json";
import twoYearsClip from "@/assets/interview/mike-two-years.mp4.asset.json";
import afterCourseClip from "@/assets/interview/mike-after-course.mp4.asset.json";
import goodbyeClip from "@/assets/interview/mike-goodbye.mp4.asset.json";
import mikeCartoon from "@/assets/interview/mike-cartoon.jpg";

export const Route = createFileRoute("/review/interview")({
  head: () => ({
    meta: [
      { title: "B4 Interview Simulator · Fluency App" },
      {
        name: "description",
        content:
          "Simulador de entrevista en inglés: practica pasado, presente y futuro respondiendo en voz alta a Mike.",
      },
      { property: "og:title", content: "B4 Interview Simulator · Fluency App" },
      {
        property: "og:description",
        content:
          "Simulador de entrevista en inglés: practica pasado, presente y futuro respondiendo en voz alta a Mike.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InterviewSimulator,
});

const MAIN_SECONDS = 30;
const FOLLOWUP_SECONDS = 20;
/** Same sentence goal as the course modules (Rep 5). */
const GOAL_MIN = 5;
const GOAL_MAX = 8;
/** Server accepts at most 3 MB; skip the call locally for anything larger. */
const SENTENCE_COUNT_MAX_BYTES = 3 * 1024 * 1024;

/**
 * Estimated complete spoken ideas for one answer — the same counter the
 * course modules use. Returns null when unavailable; never throws.
 */
async function countSentences(blob: Blob | null): Promise<number | null> {
  if (!blob || blob.size < 2048 || blob.size > SENTENCE_COUNT_MAX_BYTES) return null;
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return null;
    const form = new FormData();
    form.append("file", blob, "answer");
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

type Tense = "present" | "past" | "future" | null;

type Prompt = {
  id: string;
  en: string;
  es: string;
  /** Pre-produced Mike clip; absent prompts play the app voice over the waiting loop. */
  video?: { src: string; speechEnd: number };
  seconds: number;
  followUp: boolean;
  tense: Tense;
};

const PROMPTS: Prompt[] = [
  {
    id: "welcome",
    en: "Hi! Welcome to the interview. I'm Mike, your recruiter today. How's it going?",
    es: "¡Hola! Bienvenido a la entrevista. Soy Mike, tu reclutador de hoy. ¿Cómo vas?",
    // Mike's voice ends ~6.4s in; stop before the clip's glitchy tail.
    video: { src: welcomeClip.url, speechEnd: 6.4 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "present",
  },
  {
    id: "tell-me",
    en: "Let's get started. Tell me about yourself.",
    es: "Empecemos. Háblame de ti.",
    video: { src: questionClip.url, speechEnd: 3.7 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "present",
  },
  {
    id: "tell-me-more",
    en: "Give me more details, please.",
    es: "Dame más detalles, por favor.",
    video: { src: tellMeMoreClip.url, speechEnd: 2.6 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    tense: "present",
  },
  {
    id: "routine",
    en: "What do you do every day at work or at school?",
    es: "¿Qué haces todos los días en el trabajo o en la escuela?",
    video: { src: routineClip.url, speechEnd: 3.5 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "present",
  },
  {
    id: "present-progressive",
    en: "What is your mom doing right now?",
    es: "¿Qué está haciendo tu mamá ahora mismo?",
    video: { src: presentProgressiveClip.url, speechEnd: 2.7 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "present",
  },
  {
    id: "last-job",
    en: "Tell me about your last job or your last vacation. What happened?",
    es: "Háblame de tu último trabajo o de tus últimas vacaciones. ¿Qué pasó?",
    video: { src: lastJobClip.url, speechEnd: 5.3 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "past",
  },
  {
    id: "explain-why",
    en: "Explain why. Why was that important for you?",
    es: "Explícame por qué. ¿Por qué fue importante para ti?",
    video: { src: explainWhyClip.url, speechEnd: 3.8 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    tense: "past",
  },
  {
    id: "favorite-movie",
    en: "Tell me about your favorite movie or book. What was it about?",
    es: "Háblame de tu película o libro favorito. ¿De qué trataba?",
    video: { src: favoriteMovieClip.url, speechEnd: 5.4 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "past",
  },
  {
    id: "opinion",
    en: "What do you think about that? Would you recommend it?",
    es: "¿Qué opinas de eso? ¿Lo recomendarías?",
    video: { src: opinionClip.url, speechEnd: 4.1 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    tense: "past",
  },
  {
    id: "past-progressive",
    en: "What were you doing at 1 p.m. yesterday?",
    es: "¿Qué estabas haciendo ayer a la 1 p.m.?",
    video: { src: pastProgressiveClip.url, speechEnd: 2.5 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "past",
  },
  {
    id: "two-years",
    en: "Where do you see yourself in two years?",
    es: "¿Dónde te ves en dos años?",
    video: { src: twoYearsClip.url, speechEnd: 3.2 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "future",
  },
  {
    id: "after-course",
    en: "What are you going to do after this course?",
    es: "¿Qué vas a hacer después de este curso?",
    video: { src: afterCourseClip.url, speechEnd: 2.7 },
    seconds: MAIN_SECONDS,
    followUp: false,
    tense: "future",
  },
  {
    id: "goodbye",
    en: "Thank you for applying. It was a pleasure talking with you today. We'll be in touch soon. I wish you the best in the real interview. You can do it, champion!",
    es: "Gracias por aplicar. Fue un placer hablar contigo hoy. Estaremos en contacto pronto. Te deseo lo mejor en la entrevista real. You can do it, champion!",
    video: { src: goodbyeClip.url, speechEnd: 8 },
    seconds: 0,
    followUp: false,
    tense: null,
  },
];

const TENSE_LABEL: Record<Exclude<Tense, null>, { en: string; es: string }> = {
  present: { en: "Present", es: "Presente" },
  past: { en: "Past", es: "Pasado" },
  future: { en: "Future", es: "Futuro" },
};

/** Secondary grey skip button used across the practice modules. */
function SkipButton({ es, onClick, className }: { es: boolean; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mx-auto inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      <SkipForward className="size-3" aria-hidden="true" />
      {es ? "Saltar pregunta" : "Skip question"}
    </button>
  );
}

type Phase = "intro" | "speaking" | "ready" | "recording" | "answered";

function InterviewSimulator() {
  const { lang } = useAppLang();
  const es = lang === "es";
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [recording, setRecording] = useState<Recording | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stopSpeechRef = useRef<(() => void) | null>(null);
  const current = PROMPTS[step]!;
  const waiting = phase === "recording" || !current.video;
  const playback = useRecordingPlayback(recording?.id ?? "none");

  // Mike's voice never overlaps the microphone: the talking clip is stopped
  // before recording, and the waiting loop is always muted.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (waiting) {
      el.muted = true;
      void el.play().catch(() => undefined);
    }
  }, [waiting]);

  useEffect(() => {
    return () => {
      stopSpeechRef.current?.();
      stopSpeechRef.current = null;
    };
  }, []);

  const playMike = useCallback(() => {
    setPhase("speaking");
    playback.stop();
    stopSpeechRef.current?.();
    if (current.video) {
      const el = videoRef.current;
      if (el) {
        el.muted = false;
        el.currentTime = 0;
        void el.play().catch(() => setPhase("ready"));
      }
      return;
    }
    // No pre-produced clip: Mike stays on the silent waiting loop while the
    // app voice reads the prompt aloud.
    stopSpeechRef.current = AudioService.speak(current.en, {
      voice: "male",
      onEnd: () => setPhase("ready"),
      onError: () => setPhase("ready"),
    });
  }, [current, playback]);

  const onComplete = (rec: Recording) => {
    const pending: Recording = { ...rec, countStatus: "pending", sentenceCount: null };
    const promptId = current.id;
    setRecording(pending);
    setPhase("answered");
    void countSentences(rec.blob ?? null).then((count) => {
      if (count !== null) setCounts((prev) => ({ ...prev, [promptId]: count }));
      setRecording((value) =>
        value && value.id === pending.id
          ? count === null
            ? { ...value, countStatus: "failed", sentenceCount: null }
            : { ...value, countStatus: "done", sentenceCount: count }
          : value,
      );
    });
  };

  const goNext = () => {
    playback.stop();
    stopSpeechRef.current?.();
    setRecording(null);
    setStep((value) => value + 1);
    setPhase("intro");
    const el = videoRef.current;
    if (el) el.pause();
  };

  const goBack = () => {
    playback.stop();
    stopSpeechRef.current?.();
    setRecording(null);
    setStep((value) => Math.max(0, value - 1));
    setPhase("intro");
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  const goalMin = current.followUp ? 2 : GOAL_MIN;
  const goalMax = current.followUp ? 4 : GOAL_MAX;
  const timeLabel = current.seconds === 30 ? "00:30" : "00:20";

  const finishInterview = () => {
    playback.stop();
    stopSpeechRef.current?.();
    const el = videoRef.current;
    if (el) el.pause();
    setFinished(true);
  };

  const countValues = Object.values(counts);
  const average =
    countValues.length > 0
      ? countValues.reduce((sum, value) => sum + value, 0) / countValues.length
      : null;
  const averageOk = average !== null && average >= GOAL_MIN;

  if (finished) {
    return (
      <AppShell>
        <div className="space-y-4 p-4">
          <Link to="/review" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <ArrowLeft className="size-4" aria-hidden="true" /> Review
          </Link>

          <div className="overflow-hidden rounded-2xl border border-border bg-navy">
            <img src={mikeCartoon} alt="Mike" className="aspect-video w-full object-cover" />
          </div>

          <h1 className="text-center text-2xl font-extrabold text-foreground">
            {es ? "¡Gracias por aplicar!" : "Thanks for applying!"}
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            {es
              ? "“Thank you for applying. It was a pleasure talking with you today. We'll be in touch soon. I wish you the best in the real interview. You can do it, champion!” — Mike"
              : "“Thank you for applying. It was a pleasure talking with you today. We'll be in touch soon. I wish you the best in the real interview. You can do it, champion!” — Mike"}
          </p>

          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {es ? "Promedio final · conteo de oraciones" : "Final average · sentence count"}
            </p>
            {average === null ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {es ? "Sin respuestas contadas" : "No answers counted"}
              </p>
            ) : (
              <>
                <p
                  className={cn(
                    "mt-1 text-3xl font-extrabold tabular-nums",
                    averageOk ? "text-success" : "text-destructive",
                  )}
                >
                  {averageOk ? "🟢" : "🔴"} {average.toFixed(1)}
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  {es
                    ? `Meta ${GOAL_MIN}–${GOAL_MAX} oraciones · ${countValues.length} respuestas contadas`
                    : `Goal ${GOAL_MIN}–${GOAL_MAX} sentences · ${countValues.length} answers counted`}
                </p>
              </>
            )}
          </div>

          <div className="space-y-2 rounded-2xl border border-border bg-secondary/40 p-4 text-sm text-foreground">
            <p className="font-semibold">
              {es
                ? `Asegúrate de llegar al mínimo de ${GOAL_MIN}–${GOAL_MAX} oraciones para sonar fluido.`
                : `Reach at least ${GOAL_MIN}–${GOAL_MAX} sentences to sound fluent.`}
            </p>
            <p>
              {es
                ? "Usa diferentes verbos, frases y conectores (and, because, so, but, then, also)."
                : "Use different verbs, phrases and connectors (and, because, so, but, then, also)."}
            </p>
            <p>
              {es
                ? "Repasa en Review los temas gramaticales y en Método Natural aprende nuevas palabras para sonar más fluido."
                : "Go over grammar topics in Review, and learn new words in Natural Method to sound more fluent."}
            </p>
            <p className="font-extrabold text-primary">
              {es
                ? "Te deseo lo mejor en la entrevista real. You can do it, champion!"
                : "I wish you the best in the real interview. You can do it, champion!"}
            </p>
          </div>

          <div className="grid gap-2">
            <Link
              to="/review"
              className="w-full rounded-2xl bg-primary p-4 text-center text-base font-extrabold uppercase tracking-wide text-primary-foreground"
            >
              {es ? "Ir a Review" : "Go to Review"}
            </Link>
            <Link
              to="/natural-method"
              className="w-full rounded-2xl border border-border p-4 text-center text-sm font-bold uppercase tracking-wide text-foreground"
            >
              {es ? "Método Natural" : "Natural Method"}
            </Link>
            <button
              type="button"
              onClick={() => {
                setCounts({});
                setRecording(null);
                setStep(0);
                setPhase("intro");
                setFinished(false);
              }}
              className="w-full rounded-2xl border border-border p-3 text-sm font-bold uppercase tracking-wide text-muted-foreground"
            >
              {es ? "Repetir entrevista" : "Restart interview"}
            </button>
          </div>
        </div>
      </AppShell>
    );
  }


  return (
    <AppShell>
      <div className="space-y-4 p-4">
        {step === 0 ? (
          <Link
            to="/review"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Review
          </Link>
        ) : (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> {es ? "Atrás" : "Back"}
          </button>
        )}

        <header>
          <h1 className="text-2xl font-extrabold text-foreground">B4 Interview Simulator</h1>
          <p className="text-sm text-muted-foreground">
            {es
              ? "Entrevista con Mike en pasado, presente y futuro. Escúchalo, responde en voz alta y escúchate."
              : "Interview with Mike in past, present and future. Listen, answer out loud and play it back."}
          </p>
        </header>

        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          <span>
            {step + 1} / {PROMPTS.length}
          </span>
          {current.tense ? (
            <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
              {es ? TENSE_LABEL[current.tense].es : TENSE_LABEL[current.tense].en}
            </span>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-navy">
          <video
            key={waiting ? "waiting" : current.id}
            ref={videoRef}
            src={waiting ? waitingClip.url : current.video?.src}
            className="aspect-video w-full object-cover"
            playsInline
            muted={waiting}
            loop={waiting}
            preload="auto"
            onTimeUpdate={(e) => {
              const end = current.video?.speechEnd;
              if (!waiting && end && e.currentTarget.currentTime >= end) {
                const el = e.currentTarget;
                el.pause();
                el.muted = true;
                setPhase("ready");
              }
            }}
            onEnded={() => {
              if (!waiting) setPhase("ready");
            }}
            onError={() => {
              if (!waiting) setPhase("ready");
            }}
          />
        </div>

        {current.followUp ? (
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            {es ? "Repregunta" : "Follow-up"}
          </p>
        ) : null}
        <p className="text-center text-base font-semibold text-foreground">{current.en}</p>
        <p className="text-center text-sm text-muted-foreground">{current.es}</p>

        {phase === "intro" ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={playMike}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary p-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground"
            >
              <Play className="size-5" aria-hidden="true" />
              {step === 0 ? (es ? "Empezar" : "Start") : es ? "Escuchar a Mike" : "Listen to Mike"}
            </button>
            {step < PROMPTS.length - 1 ? <SkipButton es={es} onClick={goNext} /> : null}
          </div>
        ) : null}

        {phase === "speaking" ? (
          <div className="space-y-3">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {es ? "Mike está hablando…" : "Mike is speaking…"}
            </p>
            {step < PROMPTS.length - 1 ? <SkipButton es={es} onClick={goNext} /> : null}
          </div>
        ) : null}

        {phase === "ready" && current.seconds > 0 ? (
          <div className="space-y-2 rounded-2xl border border-dashed border-border bg-secondary/40 p-3">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {es ? "¿No entendiste? Dilo en inglés" : "Didn't catch it? Say it in English"}
            </p>
            <p className="text-center text-sm font-semibold text-foreground">
              “Could you please repeat that?” · “Could you speak slower, please?”
            </p>
            <button
              type="button"
              onClick={playMike}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-extrabold uppercase tracking-wide text-foreground"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              {es ? "Repetir pregunta" : "Repeat question"}
            </button>
          </div>
        ) : null}

        {current.seconds > 0 && (phase === "ready" || phase === "recording") ? (
          <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {es ? `Grabar respuesta · máx ${timeLabel}` : `Record answer · max ${timeLabel}`}
            </p>
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {es ? `Meta · ${goalMin}–${goalMax} oraciones` : `Goal · ${goalMin}–${goalMax} sentences`}
            </p>
            <VoiceRecorder
              key={current.id}
              label={es ? "GRABAR" : "RECORD"}
              stopLabel="STOP"
              maxSeconds={current.seconds}
              onStart={() => setPhase("recording")}
              onComplete={onComplete}
            />
            {step < PROMPTS.length - 1 ? <SkipButton es={es} onClick={goNext} /> : null}
          </div>
        ) : null}

        {phase === "ready" && current.seconds === 0 ? (
          <button
            type="button"
            onClick={finishInterview}
            className="w-full rounded-2xl bg-primary p-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground"
          >
            {es ? "Terminar entrevista" : "Finish interview"}
          </button>
        ) : null}

        {phase === "answered" && recording ? (
          <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
            <div className="rounded-2xl bg-secondary p-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {es ? "Oraciones" : "Sentences"} · {es ? "meta" : "goal"} {goalMin}–{goalMax}
              </p>
              {recording.countStatus === "pending" ? (
                <p className="mt-1 text-[13px] font-semibold text-muted-foreground">
                  {es ? "Contando…" : "Counting…"}
                </p>
              ) : recording.countStatus === "done" && typeof recording.sentenceCount === "number" ? (
                <p
                  className={cn(
                    "mt-1 text-[16px] font-extrabold tabular-nums",
                    recording.sentenceCount >= goalMin ? "text-success" : "text-destructive",
                  )}
                >
                  {recording.sentenceCount >= goalMin ? "🟢" : "🔴"} {recording.sentenceCount} / {goalMin}
                  {recording.sentenceCount >= goalMin
                    ? es
                      ? " · ¡Meta lograda!"
                      : " · Goal reached!"
                    : es
                      ? " · intenta decir un poco más"
                      : " · try to say a little more"}
                </p>
              ) : (
                <p className="mt-1 text-[12px] text-muted-foreground">
                  {es ? "Conteo no disponible" : "Count unavailable"}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => playback.toggle(() => recording.url)}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl border border-border p-3 text-sm font-extrabold uppercase tracking-wide",
                playback.playing ? "bg-navy text-navy-foreground" : "text-foreground",
              )}
            >
              <Play className="size-4" aria-hidden="true" />
              {playback.playing ? (es ? "Detener" : "Stop") : es ? "Escuchar mi respuesta" : "Play my answer"}
            </button>

            <button
              type="button"
              onClick={() => {
                playback.stop();
                setRecording(null);
                setPhase("ready");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border p-3 text-sm font-bold uppercase tracking-wide text-muted-foreground"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              {es ? "Grabar otra vez" : "Record again"}
            </button>

            {step < PROMPTS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="w-full rounded-2xl bg-primary p-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground"
              >
                {es ? "Continuar" : "Continue"}
              </button>
            ) : (
              <button
                type="button"
                onClick={finishInterview}
                className="w-full rounded-2xl bg-primary p-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground"
              >
                {es ? "Terminar entrevista" : "Finish interview"}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
