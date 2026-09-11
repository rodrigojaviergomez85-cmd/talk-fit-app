import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Play, RotateCcw, SkipForward } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { useRecordingPlayback } from "@/hooks/use-recording-playback";
import { AudioService } from "@/services/audio-service";
import { useAppLang } from "@/lib/i18n";
import { useInterviewCap } from "@/hooks/use-interview-cap";
import { InterviewCapCounter, InterviewCapReached } from "@/components/interview/InterviewCapNotice";
import { supabase } from "@/integrations/supabase/client";
import type { Recording } from "@/lib/types";
import { cn } from "@/lib/utils";
import welcomeClip from "@/assets/interview/mike-welcome.mp4.asset.json";
import waitingClip from "@/assets/interview/mike-waiting.mp4.asset.json";
import questionClip from "@/assets/interview/mike-question-1.mp4.asset.json";
import readEdClip from "@/assets/interview/mike-read-ed.mp4.asset.json";
import workHomeClip from "@/assets/interview/mike-work-home.mp4.asset.json";
import goodbyeClip from "@/assets/interview/mike-goodbye.mp4.asset.json";
import whyEnglishClip from "@/assets/interview/mike-adv-why-english.mp4.asset.json";
import routineCompareClip from "@/assets/interview/mike-adv-routine-compare.mp4.asset.json";
import achievementClip from "@/assets/interview/mike-adv-achievement.mp4.asset.json";
import differentlyClip from "@/assets/interview/mike-adv-differently.mp4.asset.json";
import compareAppsClip from "@/assets/interview/mike-adv-compare-apps.mp4.asset.json";
import sixMonthsClip from "@/assets/interview/mike-adv-six-months.mp4.asset.json";
import moveCityClip from "@/assets/interview/mike-adv-move-city.mp4.asset.json";
import aliensClip from "@/assets/interview/mike-adv-aliens.mp4.asset.json";
import dinnerClip from "@/assets/interview/mike-adv-dinner.mp4.asset.json";
import tiktokClip from "@/assets/interview/mike-adv-tiktok.mp4.asset.json";
import timeTravelClip from "@/assets/interview/mike-adv-time-travel.mp4.asset.json";
import angryCustomerClip from "@/assets/interview/mike-adv-angry-customer.mp4.asset.json";
import sellPenClip from "@/assets/interview/mike-adv-sell-pen.mp4.asset.json";
import objectionClip from "@/assets/interview/mike-adv-objection.mp4.asset.json";
import hireClip from "@/assets/interview/mike-adv-hire.mp4.asset.json";
import availabilityClip from "@/assets/interview/mike-adv-availability.mp4.asset.json";
import convinceClip from "@/assets/interview/mike-adv-convince.mp4.asset.json";
import mikeCartoon from "@/assets/interview/mike-cartoon.jpg";

export const Route = createFileRoute("/review/interview-advanced")({
  head: () => ({
    meta: [
      { title: "Advanced Interview Simulator · Fluency App" },
      {
        name: "description",
        content:
          "Simulador de entrevista avanzado (B1 → B2): hipotéticos, customer service, ventas, persuasión y pronunciación -ed.",
      },
      { property: "og:title", content: "Advanced Interview Simulator · Fluency App" },
      {
        property: "og:description",
        content:
          "Simulador de entrevista avanzado (B1 → B2): hipotéticos, customer service, ventas, persuasión y pronunciación -ed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdvancedInterviewSimulator,
});

const MAIN_SECONDS = 40;
const FOLLOWUP_SECONDS = 25;
/** Advanced answers are longer than Intermediate (6–9). */
const GOAL_MIN = 7;
const GOAL_MAX = 10;
const FOLLOWUP_GOAL_MIN = 4;
const FOLLOWUP_GOAL_MAX = 6;
/** Server accepts at most 3 MB; skip the call locally for anything larger. */
const SENTENCE_COUNT_MAX_BYTES = 3 * 1024 * 1024;

/** Estimated complete spoken ideas for one answer. Returns null when unavailable. */
async function countSentences(blob: Blob | null, attemptId: string | null): Promise<number | null> {
  if (!blob || blob.size < 2048 || blob.size > SENTENCE_COUNT_MAX_BYTES) return null;
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return null;
    const form = new FormData();
    form.append("file", blob, "answer");
    // Server-side proof that this run paid for one of today's 2 interview slots.
    if (attemptId) form.append("interviewAttemptId", attemptId);
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
  | "past"
  | "future"
  | "comparatives"
  | "present-perfect"
  | "conditional"
  | "hypothetical"
  | "pronunciation"
  | "customer-service"
  | "sales"
  | "persuasion"
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
  "Last month our team launched a new service. We planned the schedule, we prepared the scripts, and we tested the system twice. A client called and complained because the app crashed, so I apologized, I checked her account, and I promised a solution. We fixed the issue, we updated the report, and the manager thanked us for the effort.";

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
    id: "tell-me-about-yourself",
    en: "Let's get started. Tell me about yourself.",
    es: "Empecemos. Háblame de ti.",
    video: { src: questionClip.url, speechEnd: 3.7 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "present",
  },
  {
    id: "why-english",
    en: "What made you choose to study English instead of another language or skill?",
    es: "¿Qué te hizo elegir estudiar inglés en lugar de otro idioma u otra habilidad?",
    video: { src: whyEnglishClip.url, speechEnd: 5.6 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "past",
  },
  {
    id: "routine-compare",
    en: "Describe your daily routine and compare it with someone you live or work with.",
    es: "Describe tu rutina diaria y compárala con la de alguien con quien vives o trabajas.",
    video: { src: routineCompareClip.url, speechEnd: 5.2 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "comparatives",
  },
  {
    id: "achievement",
    en: "Tell me about a difficult goal you achieved. What did you have to do?",
    es: "Cuéntame sobre una meta difícil que lograste. ¿Qué tuviste que hacer?",
    video: { src: achievementClip.url, speechEnd: 6.5 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "past",
  },
  {
    id: "differently",
    en: "Looking back, what would you do differently?",
    es: "Mirando atrás, ¿qué harías diferente?",
    video: { src: differentlyClip.url, speechEnd: 3.8 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    skill: "conditional",
  },
  {
    id: "compare-apps",
    en: "Compare two apps or services you use. Which one is better, and why?",
    es: "Compara dos apps o servicios que usas. ¿Cuál es mejor y por qué?",
    video: { src: compareAppsClip.url, speechEnd: 6.5 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "comparatives",
  },
  {
    id: "six-months",
    en: "What will you have achieved with your English in six months?",
    es: "¿Qué habrás logrado con tu inglés en seis meses?",
    video: { src: sixMonthsClip.url, speechEnd: 6.1 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "future",
  },
  {
    id: "move-city",
    en: "If you had to move to another city tomorrow, how would you handle it?",
    es: "Si tuvieras que mudarte a otra ciudad mañana, ¿cómo lo manejarías?",
    video: { src: moveCityClip.url, speechEnd: 4 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
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
    id: "aliens",
    en: "Here's a fun one. If aliens came to Earth, how would you explain to them what alcohol does to your body?",
    es: "Una divertida. Si los aliens llegaran a la Tierra, ¿cómo les explicarías qué le hace el alcohol al cuerpo?",
    video: { src: aliensClip.url, speechEnd: 6.9 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "dinner",
    en: "If you could have dinner with any historical figure, who would it be, and what would you ask?",
    es: "Si pudieras cenar con cualquier figura histórica, ¿quién sería y qué le preguntarías?",
    video: { src: dinnerClip.url, speechEnd: 7.5 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "tiktok",
    en: "If you had to explain TikTok to someone from the 1800s, how would you do it?",
    es: "Si tuvieras que explicarle TikTok a alguien de 1800, ¿cómo lo harías?",
    video: { src: tiktokClip.url, speechEnd: 7 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "time-travel",
    en: "If you could travel to the past or the future, which would you choose, and why?",
    es: "Si pudieras viajar al pasado o al futuro, ¿cuál elegirías y por qué?",
    video: { src: timeTravelClip.url, speechEnd: 5.9 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "angry-customer",
    en: "How would you calm down an angry customer on the phone?",
    es: "¿Cómo calmarías a un cliente enojado por teléfono?",
    video: { src: angryCustomerClip.url, speechEnd: 4.3 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "customer-service",
  },
  {
    id: "sell-pen",
    en: "Okay, sell this pen to me.",
    es: "Bien, véndeme este bolígrafo.",
    video: { src: sellPenClip.url, speechEnd: 2.9 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "sales",
  },
  {
    id: "objection",
    en: "Hmm, but I already have a pen. Why should I buy yours?",
    es: "Mmm, pero ya tengo un bolígrafo. ¿Por qué debería comprar el tuyo?",
    video: { src: objectionClip.url, speechEnd: 5.1 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    skill: "sales",
  },
  {
    id: "hire",
    en: "Why should I hire you instead of another candidate?",
    es: "¿Por qué debería contratarte a ti y no a otro candidato?",
    video: { src: hireClip.url, speechEnd: 4.7 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "persuasion",
  },
  {
    id: "availability",
    en: "What is your schedule availability? Can you work weekends or night shifts?",
    es: "¿Cuál es tu disponibilidad de horario? ¿Puedes trabajar fines de semana o turnos de noche?",
    video: { src: availabilityClip.url, speechEnd: 6.1 },
    seconds: MAIN_SECONDS,
    followUp: false,
    skill: "present",
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
    id: "convince",
    en: "Convince me. Give me one strong reason.",
    es: "Convénceme. Dame una razón fuerte.",
    video: { src: convinceClip.url, speechEnd: 5.7 },
    seconds: FOLLOWUP_SECONDS,
    followUp: true,
    skill: "persuasion",
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
  past: { en: "Simple past", es: "Pasado simple" },
  future: { en: "Future", es: "Futuro" },
  comparatives: { en: "Comparatives", es: "Comparativos" },
  "present-perfect": { en: "Present perfect", es: "Present perfect" },
  conditional: { en: "Would / could", es: "Would / could" },
  hypothetical: { en: "Hypothetical", es: "Hipotético" },
  pronunciation: { en: "-ed sounds", es: "Sonidos -ed" },
  "customer-service": { en: "Customer service", es: "Servicio al cliente" },
  sales: { en: "Sales", es: "Ventas" },
  persuasion: { en: "Persuasion", es: "Persuasión" },
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
  "Just to be sure, are you asking about my experience?",
  "Could you clarify that, please?",
  "Let me make sure I understood you correctly.",
  "Sorry, could you speak up a little?",
  "Could you give me a second to think?",
  "That's an interesting question, let me think.",
  "So, if I understood correctly, you want an example, right?",
  "Do you mean in a work situation or in general?",
  "Let me rephrase my answer to be clearer.",
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

function AdvancedInterviewSimulator() {
  const { lang } = useAppLang();
  const es = lang === "es";
  const cap = useInterviewCap("advanced");
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

  // After Continue/Skip, Mike starts talking on his own (step 0 keeps Start).
  useEffect(() => {
    if (step === 0 || finished || phase !== "intro") return;
    playMike();
  }, [step, finished, phase, playMike]);


  const onComplete = async (rec: Recording) => {
    // DAILY INTERVIEW CAP: the first recorded answer spends one of today's 2 runs.
    if (!(await cap.consume())) return;
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
    void countSentences(rec.blob ?? null, cap.currentAttemptId()).then((count) => {
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
  const timeLabel = current.seconds === MAIN_SECONDS ? "00:40" : "00:25";

  const finishInterview = () => {
    playback.stop();
    stopSpeechRef.current?.();
    const el = videoRef.current;
    if (el) el.pause();
    cap.finish();
    setFinished(true);
  };

  const countValues = Object.values(counts);
  const average =
    countValues.length > 0
      ? countValues.reduce((sum, value) => sum + value, 0) / countValues.length
      : null;
  const averageOk = average !== null && average >= GOAL_MIN;

  if (cap.capReached) return <InterviewCapReached es={es} />;

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

        <h1 className="text-xl font-extrabold text-foreground">Advanced Interview Simulator</h1>

        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          <span>
            {step + 1} / {PROMPTS.length}
          </span>
          <InterviewCapCounter es={es} used={cap.status?.used ?? 0} unlimited={cap.status?.unlimited ?? false} />
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
            {step < PROMPTS.length - 1 ? (
              <SkipButton es={es} onClick={goNext} />
            ) : (
              <SkipButton es={es} onClick={finishInterview} final />
            )}
          </div>
        ) : null}

        {phase === "speaking" ? (
          <div className="space-y-3">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {es ? "Mike está hablando…" : "Mike is speaking…"}
            </p>
            {step < PROMPTS.length - 1 ? (
              <SkipButton es={es} onClick={goNext} />
            ) : (
              <SkipButton es={es} onClick={finishInterview} final />
            )}
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
            {current.reading ? (
              <div className="rounded-2xl bg-secondary p-3 text-center">
                <p className="text-[12px] font-semibold text-foreground">
                  {es
                    ? "Escúchate: /t/ launched, worked, checked · /d/ planned, apologized, promised · /ɪd/ tested, updated"
                    : "Listen to yourself: /t/ launched, worked, checked · /d/ planned, apologized, promised · /ɪd/ tested, updated"}
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
