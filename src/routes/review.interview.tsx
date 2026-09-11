import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { useRecordingPlayback } from "@/hooks/use-recording-playback";
import { useAppLang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import type { Recording } from "@/lib/types";
import { cn } from "@/lib/utils";
import welcomeClip from "@/assets/interview/mike-welcome.mp4.asset.json";
import questionClip from "@/assets/interview/mike-question-1.mp4.asset.json";
import waitingClip from "@/assets/interview/mike-waiting.mp4.asset.json";

export const Route = createFileRoute("/review/interview")({
  head: () => ({
    meta: [
      { title: "Interview Simulator · Fluency App" },
      {
        name: "description",
        content: "Prueba del simulador de entrevistas con Mike: escucha, responde en voz alta y escúchate.",
      },
      { property: "og:title", content: "Interview Simulator · Fluency App" },
      {
        property: "og:description",
        content: "Prueba del simulador de entrevistas con Mike: escucha, responde en voz alta y escúchate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InterviewSimulator,
});

const MAX_SECONDS = 30;

const TURNS = [
  {
    id: "welcome",
    src: welcomeClip.url,
    // Mike's voice ends ~6.5s in; the clip keeps playing to 8s.
    speechEnd: 6.6,
    en: "Hi! Welcome to the interview. I'm Mike, your recruiter today. How's it going?",
    es: "¡Hola! Bienvenido a la entrevista. Soy Mike, tu reclutador de hoy. ¿Cómo vas?",
  },
  {
    id: "tell-me",
    src: questionClip.url,
    // Voice ends ~3.6s in; enable recording right after he stops talking.
    speechEnd: 3.7,
    en: "Let's get started. Tell me about yourself.",
    es: "Empecemos. Háblame de ti.",
  },
] as const;

type Phase = "intro" | "speaking" | "ready" | "recording" | "answered";

function InterviewSimulator() {
  const { lang } = useAppLang();
  const es = lang === "es";
  const [turn, setTurn] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [recording, setRecording] = useState<Recording | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const current = TURNS[turn]!;
  const waiting = phase === "recording";
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

  const playMike = useCallback(() => {
    setPhase("speaking");
    playback.stop();
    const el = videoRef.current;
    if (el) {
      el.muted = false;
      el.currentTime = 0;
      void el.play().catch(() => setPhase("ready"));
    }
  }, [playback]);

  const onComplete = (rec: Recording) => {
    setRecording(rec);
    setPhase("answered");
  };

  const goNext = () => {
    setRecording(null);
    setTurn((value) => value + 1);
    setPhase("intro");
    const el = videoRef.current;
    if (el) el.pause();
  };

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link to="/review" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <ArrowLeft className="size-4" aria-hidden="true" /> Review
        </Link>

        <header>
          <h1 className="text-2xl font-extrabold text-foreground">Interview Simulator</h1>
          <p className="text-sm text-muted-foreground">
            {es
              ? "Prueba con Mike. Escúchalo, graba tu respuesta y escúchate."
              : "Test run with Mike. Listen, record your answer and play it back."}
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl border border-border bg-navy">
          <video
            key={waiting ? "waiting" : current.id}
            ref={videoRef}
            src={waiting ? waitingClip.url : current.src}
            className="aspect-video w-full object-cover"
            playsInline
            muted={waiting}
            loop={waiting}
            preload="auto"
            onTimeUpdate={(e) => {
              if (!waiting && e.currentTarget.currentTime >= current.speechEnd) setPhase("ready");
            }}
            onEnded={() => {
              if (!waiting) setPhase("ready");
            }}
            onError={() => {
              if (!waiting) setPhase("ready");
            }}
          />
        </div>

        <p className="text-center text-base font-semibold text-foreground">{current.en}</p>
        <p className="text-center text-sm text-muted-foreground">{current.es}</p>

        {phase === "intro" ? (
          <button
            type="button"
            onClick={playMike}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary p-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground"
          >
            <Play className="size-5" aria-hidden="true" />
            {es ? "Empezar" : "Start"}
          </button>
        ) : null}

        {phase === "speaking" ? (
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {es ? "Mike está hablando…" : "Mike is speaking…"}
          </p>
        ) : null}

        {phase === "ready" || phase === "recording" ? (
          <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {es ? "Grabar respuesta · máx 00:30" : "Record answer · max 00:30"}
            </p>
            <VoiceRecorder
              key={current.id}
              label={es ? "GRABAR" : "RECORD"}
              stopLabel="STOP"
              maxSeconds={MAX_SECONDS}
              onStart={() => setPhase("recording")}
              onComplete={onComplete}
            />
          </div>
        ) : null}

        {phase === "answered" && recording ? (
          <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
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

            {turn < TURNS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="w-full rounded-2xl bg-primary p-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground"
              >
                {es ? "Continuar" : "Continue"}
              </button>
            ) : (
              <p className="text-center text-sm font-semibold text-success">
                {es ? "Fin de la prueba. ¡Bien hecho!" : "End of the test. Well done!"}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
