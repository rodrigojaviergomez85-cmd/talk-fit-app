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
import waitingClip from "@/assets/interview/mike-waiting.mp4.asset.json";
import tellMeMoreClip from "@/assets/interview/mike-tell-me-more.mp4.asset.json";
import happyMomentClip from "@/assets/interview/mike-happy-moment.mp4.asset.json";
import whyHappyClip from "@/assets/interview/mike-why-happy.mp4.asset.json";

import opinionClip from "@/assets/interview/mike-opinion.mp4.asset.json";
import pastProgressiveClip from "@/assets/interview/mike-past-progressive.mp4.asset.json";
import goodbyeClip from "@/assets/interview/mike-goodbye.mp4.asset.json";
import improveEnglishClip from "@/assets/interview/mike-improve-english.mp4.asset.json";
import thirdPersonClip from "@/assets/interview/mike-third-person.mp4.asset.json";
import compareParentsClip from "@/assets/interview/mike-compare-parents.mp4.asset.json";
import bestWorstClip from "@/assets/interview/mike-best-worst.mp4.asset.json";
import lastWeekendClip from "@/assets/interview/mike-last-weekend.mp4.asset.json";
import howLongClip from "@/assets/interview/mike-how-long.mp4.asset.json";
import everDifficultClip from "@/assets/interview/mike-ever-difficult.mp4.asset.json";
import modalsClip from "@/assets/interview/mike-modals.mp4.asset.json";
import freeWeekClip from "@/assets/interview/mike-free-week.mp4.asset.json";
import nextWeekendClip from "@/assets/interview/mike-next-weekend.mp4.asset.json";
import readEdClip from "@/assets/interview/mike-read-ed.mp4.asset.json";
import workHomeClip from "@/assets/interview/mike-work-home.mp4.asset.json";
import mikeCartoon from "@/assets/interview/mike-cartoon.jpg";

export const Route = createFileRoute("/review/interview-intermediate")({
  head: () => ({
    meta: [
      { title: "Intermediate Interview Simulator · Fluency App" },
      {
        name: "description",
        content:
          "Simulador de entrevista intermedio (A2 → B1): comparativos, superlativos, modales, present perfect y pronunciación -ed.",
      },
      { property: "og:title", content: "Intermediate Interview Simulator · Fluency App" },
      {
        property: "og:description",
        content:
          "Simulador de entrevista intermedio (A2 → B1): comparativos, superlativos, modales, present perfect y pronunciación -ed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IntermediateInterviewSimulator,
});

const MAIN_SECONDS = 35;
const FOLLOWUP_SECONDS = 25;
/** Intermediate answers are longer than B4 (5–8). */
const GOAL_MIN = 6;
const GOAL_MAX = 9;
const FOLLOWUP_GOAL_MIN = 3;
const FOLLOWUP_GOAL_MAX = 5;
/** Server accepts at most 3 MB; skip the call locally for anything larger. */
const SENTENCE_COUNT_MAX_BYTES = 3 * 1024 * 1024;

/** Estimated complete spoken ideas for one answer. Returns null when unavailable. */
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

type Skill =
  | "present"
  | "present-continuous"
  | "third-person"
  | "comparatives"
  | "superlatives"
  | "past"
  | "past-continuous"
  | "present-perfect"
  | "modals"
  | "conditional"
  | "future"
  | "pronunciation"
  | "opinion"
  | null;

type Prompt = {
  id: string;
  en: string;
  es: string;
  /** Pre-produced Mike clip; absent prompts play the app voice over the waiting loop. */
  video?: { src: string; speechEnd: number };
  seconds: number;
  followUp: boolean;
  skill: Skill;
  /** Text the student reads out loud (no sentence goal). */
  reading?: string;
};

const ED_TEXT =
  "Yesterday I worked from home. I helped a customer, I asked for her order number, and I thanked her for waiting. Then I called my manager, I explained the problem, I listened to his advice, and I answered two more emails. At the end of the day, I decided to rest.";

const PROMPTS: Prompt[] = [
  {
    id: "welcome",
    en: "Hi! Welcome to the interview. I'm Mike, your recruiter today. How's it going?",
    es: "¡Hola! Bienvenido a la entrevista. Soy Mike, tu reclutador de hoy. ¿Cómo vas?",
    video: { src: welcomeClip.url, speechEnd: 6.4 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "present",
  },
  {
    id: "happy-moment",
    en: "Tell me about a happy moment. When was it, who was there, and what happened?",
    es: "Cuéntame sobre un momento feliz. ¿Cuándo fue, quién estaba ahí y qué pasó?",
    video: { src: happyMomentClip.url, speechEnd: 5.4 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "past",
  },
  {
    id: "why-happy",
    en: "Why was it a happy moment for you?",
    es: "¿Por qué fue un momento feliz para ti?",
    video: { src: whyHappyClip.url, speechEnd: 3.2 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    skill: "past",
  },
  {
    id: "improve-english",
    en: "What are you doing these days to improve your English?",
    es: "¿Qué estás haciendo estos días para mejorar tu inglés?",
    video: { src: improveEnglishClip.url, speechEnd: 7.7 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "present-continuous",
  },
  {
    id: "third-person",
    en: "Tell me about someone you live with. What does he or she do every day?",
    es: "Háblame de alguien con quien vives. ¿Qué hace él o ella todos los días?",
    video: { src: thirdPersonClip.url, speechEnd: 4.8 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "third-person",
  },
  {
    id: "compare-parents",
    en: "Compare your mom and dad. Who is taller, and who is more patient?",
    es: "Compara a tu mamá y a tu papá. ¿Quién es más alto y quién es más paciente?",
    video: { src: compareParentsClip.url, speechEnd: 8 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "comparatives",
  },
  {
    id: "best-worst",
    en: "What is the best day you have had this year, and the worst one?",
    es: "¿Cuál es el mejor día que has tenido este año y cuál el peor?",
    video: { src: bestWorstClip.url, speechEnd: 4.8 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "superlatives",
  },
  {
    id: "last-weekend",
    en: "Tell me about your last weekend. What did you do?",
    es: "Háblame de tu último fin de semana. ¿Qué hiciste?",
    video: { src: lastWeekendClip.url, speechEnd: 7.4 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "past",
  },
  {
    id: "more-details-past",
    en: "Give me more details, please.",
    es: "Dame más detalles, por favor.",
    video: { src: tellMeMoreClip.url, speechEnd: 2.6 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    skill: "past",
  },
  {
    id: "past-progressive",
    en: "What were you doing at 1 p.m. yesterday?",
    es: "¿Qué estabas haciendo ayer a la 1 p.m.?",
    video: { src: pastProgressiveClip.url, speechEnd: 2.5 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "past-continuous",
  },
  {
    id: "how-long",
    en: "How long have you studied English, and what have you learned so far?",
    es: "¿Cuánto tiempo has estudiado inglés y qué has aprendido hasta ahora?",
    video: { src: howLongClip.url, speechEnd: 3.6 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "present-perfect",
  },
  {
    id: "ever-difficult",
    en: "Have you ever had a difficult customer or a difficult classmate? Tell me what happened.",
    es: "¿Alguna vez has tenido un cliente difícil o un compañero difícil? Cuéntame qué pasó.",
    video: { src: everDifficultClip.url, speechEnd: 8 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "present-perfect",
  },
  {
    id: "modals",
    en: "Your friend is always late. What should he do, and what can you do to help?",
    es: "Tu amigo siempre llega tarde. ¿Qué debería hacer él y qué puedes hacer tú para ayudar?",
    video: { src: modalsClip.url, speechEnd: 4.9 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "modals",
  },
  {
    id: "free-week",
    en: "If you had one free week, what would you do?",
    es: "Si tuvieras una semana libre, ¿qué harías?",
    video: { src: freeWeekClip.url, speechEnd: 2.9 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "conditional",
  },
  {
    id: "next-weekend",
    en: "What are you going to do next weekend?",
    es: "¿Qué vas a hacer el próximo fin de semana?",
    video: { src: nextWeekendClip.url, speechEnd: 3 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "future",
  },
  {
    id: "read-ed",
    en: "Now, please read this short text out loud. Take your time with the -ed endings.",
    es: "Ahora, por favor lee este texto en voz alta. Cuida las terminaciones -ed.",
    video: { src: readEdClip.url, speechEnd: 4.6 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "pronunciation",
    reading: ED_TEXT,
  },
  {
    id: "work-home",
    en: "Do you think it is better to work from home or at the office? Why?",
    es: "¿Crees que es mejor trabajar desde casa o en la oficina? ¿Por qué?",
    video: { src: workHomeClip.url, speechEnd: 6.6 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "opinion",
  },
  {
    id: "opinion-more",
    en: "What do you think about that? Would you recommend it?",
    es: "¿Qué opinas de eso? ¿Lo recomendarías?",
    video: { src: opinionClip.url, speechEnd: 4.1 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    skill: "opinion",
  },
  {
    id: "goodbye",
    en: "Thank you for applying. It was a pleasure talking with you today. We'll be in touch soon. I wish you the best in the real interview. You can do it, champion!",
    es: "Gracias por aplicar. Fue un placer hablar contigo hoy. Estaremos en contacto pronto. Te deseo lo mejor en la entrevista real. You can do it, champion!",
    video: { src: goodbyeClip.url, speechEnd: 8 },
    seconds: 0,
    followUp: false,
    skill: null,
  },
];

const SKILL_LABEL: Record<Exclude<Skill, null>, { en: string; es: string }> = {
  present: { en: "Simple present", es: "Presente simple" },
  "present-continuous": { en: "Present continuous", es: "Presente continuo" },
  "third-person": { en: "3rd person -s", es: "Tercera persona -s" },
  comparatives: { en: "Comparatives", es: "Comparativos" },
  superlatives: { en: "Superlatives", es: "Superlativos" },
  past: { en: "Simple past", es: "Pasado simple" },
  "past-continuous": { en: "Past continuous", es: "Pasado continuo" },
  "present-perfect": { en: "Present perfect", es: "Present perfect" },
  modals: { en: "Modals", es: "Modales" },
  conditional: { en: "Would / could", es: "Would / could" },
  future: { en: "Future", es: "Futuro" },
  pronunciation: { en: "-ed sounds", es: "Sonidos -ed" },
  opinion: { en: "Opinion", es: "Opinión" },
};

/** One English clarification phrase per prompt so students practice different replies. */
const CLARIFICATION_PHRASES: readonly string[] = [
  "Could you please repeat that?",
  "Could you speak slower, please?",
  "Could you rephrase your question, please?",
  "Could you say that again?",
  "I'm sorry, I didn't catch that.",
  "Could you explain that in another way?",
  "Could you give me an example, please?",
  "What do you mean by that?",
  "I didn't understand the question.",
  "Could you repeat the last part, please?",
  "I'm not sure I follow.",
  
  "Sorry, can you say it one more time?",
  "Would you mind repeating the question?",
  "Just to be sure, are you asking about my routine?",
  "Could you clarify that, please?",
  "Let me make sure I understood you correctly.",
  "Sorry, could you speak up a little?",
  "Could you give me a second to think?",
  "That's an interesting question, let me think.",
];

/** Secondary grey skip button used across the practice modules. */
function SkipButton({
  es,
  onClick,
  className,
  final,
}: {
  es: boolean;
  onClick: () => void;
  className?: string;
  final?: boolean;
}) {
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
      {final ? (es ? "Saltar" : "Skip") : es ? "Saltar pregunta" : "Skip question"}
    </button>
  );
}

type Phase = "intro" | "speaking" | "ready" | "recording" | "answered";

function IntermediateInterviewSimulator() {
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
    stopSpeechRef.current = AudioService.speak(current.en, {
      voice: "male",
      onEnd: () => setPhase("ready"),
      onError: () => setPhase("ready"),
    });
  }, [current, playback]);

  const onComplete = (rec: Recording) => {
    const isReading = Boolean(current.reading);
    const pending: Recording = {
      ...rec,
      countStatus: isReading ? "done" : "pending",
      sentenceCount: null,
    };
    const promptId = current.id;
    setRecording(pending);
    setPhase("answered");
    if (isReading) return;
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

  const goalMin = current.followUp ? FOLLOWUP_GOAL_MIN : GOAL_MIN;
  const goalMax = current.followUp ? FOLLOWUP_GOAL_MAX : GOAL_MAX;
  const timeLabel = current.seconds === MAIN_SECONDS ? "00:35" : "00:25";

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
          <Link
            to="/review/interview-simulators"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Interview Simulator
          </Link>

          <div className="overflow-hidden rounded-2xl border border-border bg-navy">
            <img src={mikeCartoon} alt="Mike" className="aspect-video w-full object-cover" />
          </div>

          <h1 className="text-center text-2xl font-extrabold text-foreground">
            {es ? "¡Gracias por aplicar!" : "Thanks for applying!"}
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            “Thank you for applying. It was a pleasure talking with you today. We'll be in touch soon. I wish
            you the best in the real interview. You can do it, champion!” — Mike
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
                ? "Usa diferentes verbos, frases y conectores (however, because, so, although, then, also)."
                : "Use different verbs, phrases and connectors (however, because, so, although, then, also)."}
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
      <div className="space-y-1.5 p-2">
        {step === 0 ? (
          <Link
            to="/review/interview-simulators"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Interview Simulator
          </Link>
        ) : (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> {es ? "Atrás" : "Back"}
          </button>
        )}

        <h1 className="text-xl font-extrabold text-foreground">Intermediate Interview Simulator</h1>

        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          <span>
            {step + 1} / {PROMPTS.length}
          </span>
          {current.skill ? (
            <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
              {es ? SKILL_LABEL[current.skill].es : SKILL_LABEL[current.skill].en}
            </span>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-navy">
          <video
            key={waiting ? "waiting" : current.id}
            ref={videoRef}
            src={waiting ? waitingClip.url : current.video?.src}
            className="aspect-video w-full object-contain"
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
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
            {es ? "Repregunta" : "Follow-up"}
          </p>
        ) : null}
        <div className="space-y-0.5 text-center">
          <p className="text-sm font-semibold leading-snug text-foreground">{current.en}</p>
          {es ? <p className="text-xs text-muted-foreground">{current.es}</p> : null}
        </div>

        {current.reading ? (
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {es ? "Lee en voz alta" : "Read out loud"}
            </p>
            <p className="mt-1 text-sm leading-snug text-foreground">{current.reading}</p>
          </div>
        ) : null}

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
          <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-2">
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {es ? "¿No entendiste? Practica en voz alta" : "Didn't catch it? Practice out loud"}
              </p>
              <p className="text-xs font-semibold leading-tight text-foreground">
                “{CLARIFICATION_PHRASES[step % CLARIFICATION_PHRASES.length]}”
              </p>
              <button
                type="button"
                onClick={playMike}
                className="mt-0.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-1.5 text-xs font-semibold text-foreground"
              >
                <RotateCcw className="size-3" aria-hidden="true" />
                {es ? "Repetir pregunta" : "Repeat question"}
              </button>
            </div>
          </div>
        ) : null}

        {current.seconds > 0 && (phase === "ready" || phase === "recording") ? (
          <div className="space-y-2 rounded-2xl border border-border bg-card p-2">
            <p className="text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {current.reading
                ? es
                  ? `Leer en voz alta · máx ${timeLabel}`
                  : `Read out loud · max ${timeLabel}`
                : es
                  ? `Grabar respuesta · máx ${timeLabel} · meta ${goalMin}–${goalMax} oraciones`
                  : `Record answer · max ${timeLabel} · goal ${goalMin}–${goalMax} sentences`}
            </p>
            <VoiceRecorder
              key={current.id}
              label={es ? "GRABAR" : "RECORD"}
              stopLabel="STOP"
              maxSeconds={current.seconds}
              size="sm"
              className="gap-1"
              onStart={() => setPhase("recording")}
              onComplete={onComplete}
            />
            {step < PROMPTS.length - 1 ? <SkipButton es={es} onClick={goNext} /> : null}
          </div>
        ) : null}

        {phase === "ready" && current.seconds === 0 ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={finishInterview}
              className="w-full rounded-2xl bg-primary p-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground"
            >
              {es ? "Terminar entrevista" : "Finish interview"}
            </button>
            <SkipButton es={es} onClick={finishInterview} />
          </div>
        ) : null}

        {phase === "answered" && recording ? (
          <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
            {current.reading ? (
              <div className="rounded-2xl bg-secondary p-3 text-center">
                <p className="text-[12px] font-semibold text-foreground">
                  {es
                    ? "Escúchate: /t/ worked, helped, asked · /d/ called, explained, listened · /ɪd/ decided"
                    : "Listen to yourself: /t/ worked, helped, asked · /d/ called, explained, listened · /ɪd/ decided"}
                </p>
              </div>
            ) : (
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
            )}
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
