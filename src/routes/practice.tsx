import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect, type RefObject } from "react";
import { RepProgress } from "@/components/fluency/RepProgress";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { RecordingPlayback } from "@/components/fluency/RecordingPlayback";
import { RecordingComparison } from "@/components/fluency/RecordingComparison";
import { WaveformPlayer } from "@/components/fluency/WaveformPlayer";
import { LessonService } from "@/services/lesson-service";
import { AudioService } from "@/services/audio-service";
import { RepFeedback } from "@/components/fluency/RepFeedback";
import { RepSeriesRow, type SeriesRep } from "@/components/fluency/RepSeriesRow";
import { DailyCompleteScreen } from "@/components/fluency/DailyCompleteScreen";
import { IntroStep } from "@/components/fluency/IntroStep";
import { SpanishProvider, SpanishToggle, TranslatableText, useSpanishAll } from "@/components/fluency/TranslatableText";

import { checkRepetition, type RepCheck } from "@/lib/pronunciation-check";
import type { Recording } from "@/lib/types";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Today's 5 Fluency Reps — Simple Present" },
      {
        name: "description",
        content:
          "Listen, notice, echo, shadow and record: guided speaking reps that make Simple Present automatic.",
      },
      { property: "og:title", content: "Today's 5 Fluency Reps — Simple Present" },
      { property: "og:description", content: "Guided speaking reps ending in your daily 5/5 completion." },
    ],
  }),
  component: PracticePage,
});

type Stage = { kind: "intro" } | { kind: "rep"; index: number } | { kind: "complete" };

const REP_TITLES = [
  "REP 1 OF 6",
  "REP 2 OF 6",
  "REP 3 OF 6",
  "REP 4 OF 6",
  "REP 5 OF 6",
  "REP 6 OF 6",
];

function PracticePage() {
  const navigate = useNavigate();
  const lesson = LessonService.getTodayLesson();
  const modelText = useMemo(() => LessonService.getModelText(lesson), [lesson]);
  const [stage, setStage] = useState<Stage>({ kind: "intro" });
  const [showSpanish, setShowSpanish] = useState(false);

  const [rep7Recording, setRep7Recording] = useState<Recording | null>(null);
  const [rep9Recording, setRep9Recording] = useState<Recording | null>(null);

  useEffect(() => () => AudioService.stop(), []);
  useEffect(() => {
    AudioService.stop();
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, [stage]);

  const progressIndex =
    stage.kind === "intro" ? 0 : stage.kind === "rep" ? stage.index + 1 : 7;
  const title =
    stage.kind === "intro"
      ? showSpanish
        ? "PASO 0 — PRESENTE SIMPLE"
        : "STEP 0 — SIMPLE PRESENT"
      : stage.kind === "complete"
        ? "DAY COMPLETE"
        : (REP_TITLES[stage.index] ?? "PRACTICE");

  /** Set by the current rep when it has an internal sub-step to go back to. */
  const backRef = useRef<(() => boolean) | null>(null);
  /** Set by the current rep when it has an internal sub-step to go forward to. */
  const forwardRef = useRef<(() => boolean) | null>(null);

  const goToRep = (index: number) => setStage({ kind: "rep", index });

  const handleBack = () => {
    if (backRef.current?.()) return;
    if (stage.kind === "rep") {
      if (stage.index > 0) goToRep(stage.index - 1);
      else setStage({ kind: "intro" });
    }
  };

  const handleForward = () => {
    if (stage.kind === "intro") {
      goToRep(0);
      return;
    }
    if (forwardRef.current?.()) return;
    if (stage.kind === "rep" && stage.index < REP_TITLES.length - 1) goToRep(stage.index + 1);
  };

  const canGoBack = stage.kind === "rep";
  const canGoForward =
    stage.kind === "intro" ||
    (stage.kind === "rep" && (stage.index < REP_TITLES.length - 1 || forwardRef.current !== null));

  backRef.current = null;
  forwardRef.current = null;

  return (
    <div className="min-h-screen bg-background">
      <RepProgress
        current={progressIndex}
        total={7}
        title={title}
        {...(canGoBack ? { onBack: handleBack } : {})}
        {...(canGoForward ? { onNext: handleForward } : {})}
        onExit={() => {
          void navigate({ to: "/" });
        }}
      />

      <main className="mx-auto w-full max-w-lg px-4 pb-16 pt-6">
        <SpanishProvider value={showSpanish}>
        {stage.kind !== "complete" ? (
          <div className="mb-4">
            <SpanishToggle value={showSpanish} onChange={setShowSpanish} />
          </div>
        ) : null}
        {stage.kind === "intro" ? (
          <IntroStep showSpanish={showSpanish} onStart={() => goToRep(0)} />
        ) : stage.kind === "rep" ? (
          <RepBody
            backRef={backRef}
            forwardRef={forwardRef}
            index={stage.index}
            lesson={lesson}
            modelText={modelText}
            rep7Recording={rep7Recording}
            rep9Recording={rep9Recording}
            finalFocus={lesson.focus}
            onNext={() => goToRep(stage.index + 1)}
            onRep7Recorded={setRep7Recording}
            onSeriesComplete={(recording) => {
              setRep9Recording(recording);
              setStage({ kind: "complete" });
            }}
          />
        ) : (
          <DailyCompleteScreen
            onComplete={() => {
              void navigate({ to: "/" });
            }}
          />
        )}
        </SpanishProvider>
      </main>

    </div>
  );
}


/* ---------------------------------- Reps ---------------------------------- */

type RepBodyProps = {
  backRef: RefObject<(() => boolean) | null>;
  forwardRef: RefObject<(() => boolean) | null>;
  index: number;

  lesson: ReturnType<typeof LessonService.getTodayLesson>;
  modelText: string;
  rep7Recording: Recording | null;
  rep9Recording: Recording | null;
  finalFocus: string;
  onNext: () => void;
  onRep7Recorded: (recording: Recording) => void;
  onSeriesComplete: (recording: Recording) => void;
};

function RepBody(props: RepBodyProps) {
  switch (props.index) {
    case 0:
      return <Rep2 {...props} />;
    case 1:
      return <Rep3 {...props} />;
    case 2:
      return <Shadowing {...props} rate={0.75} speeds={[0.5, 0.75]} instruction="Read along with the model" instructionEs="Lee a la par del modelo" heading="Slow shadowing" note="Tap 0.5× or 0.75× to slow the model." noteEs="Toca 0.5× o 0.75× para poner el modelo más lento." />;
    case 3:
      return <Shadowing {...props} rate={1} instruction="Now match natural English." instructionEs="Ahora iguala el inglés natural." heading="Natural speed" note="Match the model's natural rhythm and flow." noteEs="Iguala el ritmo y fluidez naturales del modelo." />;
    case 4:
      return <Rep7 {...props} />;
    case 5:
      return <RepSeries {...props} />;
    default:
      return null;
  }
}

function Instruction({ text, sub, es }: { text: string; sub?: string; es?: string | undefined }) {
  return (
    <div className="mb-6 animate-[var(--animate-rise)]">
      <TranslatableText es={es}>
        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-balance-tight">{text}</h1>
        {sub ? <p className="mt-2 text-[15px] text-muted-foreground">{sub}</p> : null}
      </TranslatableText>
    </div>
  );
}

/** Spanish hint line, only visible when "Mostrar todo en español" is on. */
function EsLine({ text, className }: { text: string; className?: string }) {
  const show = useSpanishAll();
  if (!show) return null;
  return <p className={cn("text-[13px] italic leading-snug text-muted-foreground", className)}>{text}</p>;
}

function NextButton({ onClick, label = "NEXT REP" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 w-full rounded-2xl bg-primary px-6 py-5 text-base font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
    >
      {label}
    </button>
  );
}

function Rep2({ lesson, modelText, onNext }: RepBodyProps) {
  const [activeChunk, setActiveChunk] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const allChunks = useMemo(() => lesson.sentences.flatMap((s) => s.chunks), [lesson]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const play = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    let elapsed = 0;
    allChunks.forEach((chunk, index) => {
      const duration = AudioService.estimateSeconds(chunk) * 1000 + 120;
      timers.current.push(setTimeout(() => setActiveChunk(index), elapsed));
      elapsed += duration;
    });
    timers.current.push(setTimeout(() => setActiveChunk(-1), elapsed));
  };

  let chunkCounter = -1;

  return (
    <>
      <Instruction text="Listen and notice the rhythm." sub="English moves in chunks, not single words." es="Escucha y nota el ritmo. El inglés se mueve en bloques, no en palabras sueltas." />
      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        {lesson.sentences.map((sentence) => (
          <TranslatableText key={sentence.id} es={sentence.es} className="mb-3">
            <p className="text-[17px] leading-relaxed">
              {sentence.chunks.map((chunk, i) => {
                chunkCounter += 1;
                const isActive = chunkCounter === activeChunk;
                return (
                  <span key={`${sentence.id}-${i}`}>
                    <span
                      className={cn(
                        "rounded-lg px-1 py-0.5 transition-colors duration-200",
                        isActive ? "bg-primary/20 font-semibold text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {chunk}
                    </span>
                    {i < sentence.chunks.length - 1 ? <span className="px-1 text-primary/60">/</span> : null}
                  </span>
                );
              })}
            </p>
          </TranslatableText>
        ))}

      </div>
      <div className="mt-6">
        <AudioPlayer text={modelText} label="LISTEN WITH TRANSCRIPT" size="lg" onEnd={() => setActiveChunk(-1)} />
      </div>
      <button type="button" onClick={play} className="sr-only" aria-hidden />
      <NextButton onClick={onNext} />
    </>
  );
}

function Rep3({ lesson, onNext, backRef, forwardRef }: RepBodyProps) {
  const [index, setIndex] = useState(0);
  const [myVoice, setMyVoice] = useState<Recording | null>(null);
  const sentence = lesson.sentences[index]!;
  const isLast = index === lesson.sentences.length - 1;

  const reset = () => {
    setMyVoice(null);
  };

  backRef.current =
    index > 0
      ? () => {
          reset();
          setIndex(index - 1);
          return true;
        }
      : null;

  forwardRef.current = !isLast
    ? () => {
        reset();
        setIndex(index + 1);
        return true;
      }
    : null;

  return (
    <>
      <Instruction text="Listen. Then copy." sub={`Chunk ${index + 1} of ${lesson.sentences.length}`} es="Escucha. Luego repite exactamente igual." />
      <div className="rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-card)]">
        <TranslatableText es={sentence.es} align="center" esClassName="text-center text-[14px]">
          <p className="text-2xl font-bold leading-snug text-balance-tight">{sentence.text}</p>
        </TranslatableText>
      </div>


      <div className="mt-5 space-y-3">
        <AudioPlayer text={sentence.text} label="LISTEN" variant="navy" />
        <p className="pt-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Your turn</p>
        <VoiceRecorder
          label="RECORD"
          stopLabel="STOP"
          showTimer={false}
          onComplete={(recording) => {
            setMyVoice(recording);
          }}
        />
      </div>

      {myVoice ? (
        <div className="mt-5 space-y-3">
          <RecordingComparison leftLabel="▶ MODEL" rightLabel="▶ MY VOICE" modelText={sentence.text} rightUrl={myVoice.url} caption="Compare" />
        </div>
      ) : null}

      <NextButton
        onClick={() => {
          if (isLast) {
            onNext();
          } else {
            reset();
            setIndex(index + 1);
          }
        }}
        label={isLast ? "NEXT REP" : "NEXT"}
      />

    </>
  );
}

function Shadowing({
  lesson,
  modelText,
  onNext,
  rate,
  speeds,
  instruction,
  instructionEs,
  heading,
  note,
  noteEs,
}: RepBodyProps & { rate: number; speeds?: number[]; instruction: string; instructionEs?: string; heading: string; note: string; noteEs?: string }) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(rate);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);
  useEffect(() => {
    setSpeed(rate);
  }, [rate]);

  const start = () => {
    if (playing) {
      stopRef.current?.();
      AudioService.stop();
      setPlaying(false);
      return;
    }
    stopRef.current = AudioService.speak(modelText, {
      rate: speed,
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
    });
  };

  const pickSpeed = (value: number) => {
    stopRef.current?.();
    AudioService.stop();
    setPlaying(false);
    setSpeed(value);
  };

  return (
    <>
      <Instruction text={instruction} sub={`${heading} · ${speed}x speed`} es={instructionEs} />
      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <WaveformPlayer active={playing} />
        <div className="mt-4 space-y-2">
          {lesson.sentences.map((sentence) => (
            <TranslatableText key={sentence.id} es={sentence.es}>
              <p className="text-[16px] leading-relaxed text-muted-foreground">{sentence.chunks.join(" / ")}</p>
            </TranslatableText>
          ))}

        </div>
      </div>
      {speeds ? (
        <div className="mt-4">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Velocidad</p>
          <div className="flex gap-2">
            {speeds.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => pickSpeed(value)}
                aria-pressed={speed === value}
                className={cn(
                  "flex-1 rounded-2xl border px-2 py-3 text-sm font-extrabold tabular-nums transition-colors",
                  speed === value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground active:bg-secondary",
                )}
              >
                {value}x
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <p className="mt-4 text-center text-sm text-muted-foreground">{note}</p>
      {noteEs ? <EsLine text={noteEs} className="mt-1 text-center" /> : null}
      <div className="mt-5">
        <button
          type="button"
          onClick={start}
          className="w-full rounded-2xl bg-primary px-6 py-5 text-base font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
        >
          {playing ? "STOP" : "▶ START SHADOWING"}
        </button>
      </div>
      <NextButton onClick={onNext} />
    </>
  );
}


function Rep7({ lesson, modelText, rep7Recording, onRep7Recorded, onNext }: RepBodyProps) {
  const [check, setCheck] = useState<RepCheck | null>(null);
  return (
    <>
      <Instruction text="Now do it without the speaker." sub={`Target ${lesson.goalSeconds[0]}–${lesson.goalSeconds[1]} seconds.`} es="Ahora hazlo sin el hablante. Di las frases por tu cuenta." />
      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        {lesson.sentences.map((sentence) => (
          <TranslatableText key={sentence.id} es={sentence.es} className="mb-2">
            <p className="text-[16px] leading-relaxed text-muted-foreground">{sentence.text}</p>
          </TranslatableText>
        ))}

      </div>
      <div className="mt-6">
        <VoiceRecorder
          label="RECORD"
          stopLabel="STOP"
          targetSeconds={lesson.goalSeconds}
          captureTranscript
          liveTranscriptOnly
          onComplete={(recording, transcript) => {
            onRep7Recorded(recording);
            setCheck(checkRepetition(modelText, transcript));
          }}
        />
      </div>
      {check ? <RepFeedback check={check} onRetry={() => setCheck(null)} className="mt-6" /> : null}
      {rep7Recording ? (
        <div className="mt-6">
          <RecordingComparison leftLabel="▶ MODEL" rightLabel="▶ MY VOICE" modelText={modelText} rightUrl={rep7Recording.url} caption="Model vs my voice" />
        </div>
      ) : null}
      <NextButton onClick={onNext} />
    </>
  );
}


function CueRow({ cues }: { cues: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {cues.map((cue) => (
        <span key={cue} className="rounded-full bg-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-foreground">
          {cue}
        </span>
      ))}
    </div>
  );
}

const SERIES_TOTAL = 5;

function RepSeries({ lesson, rep9Recording, onSeriesComplete, backRef, forwardRef }: RepBodyProps) {
  const [repNumber, setRepNumber] = useState(1);
  const [recording, setRecording] = useState<Recording | null>(rep9Recording);
  const [completedReps, setCompletedReps] = useState<SeriesRep[]>([]);
  const [recordings, setRecordings] = useState<Record<number, Recording>>({});
  const isLast = repNumber === SERIES_TOTAL;

  const goToRep = (n: number) => {
    setRepNumber(n);
    setRecording(recordings[n] ?? null);
  };

  backRef.current =
    repNumber > 1
      ? () => {
          goToRep(repNumber - 1);
          return true;
        }
      : null;

  // Forward only to completed reps or the next pending one (no skipping recordings).
  const maxDone = completedReps.reduce((max, r) => (r.status === "done" ? Math.max(max, r.number) : max), 0);
  const nextAllowed = Math.min(maxDone + 1, SERIES_TOTAL);
  forwardRef.current =
    repNumber < nextAllowed
      ? () => {
          goToRep(repNumber + 1);
          return true;
        }
      : null;

  const markRep = (number: number, duration: number | null, status: SeriesRep["status"], url?: string) => {
    setCompletedReps((prev) => {
      const next = prev.filter((r) => r.number !== number);
      if (status === "done" && duration != null) {
        next.push({ number, duration, status, url });
      }
      return next.sort((a, b) => a.number - b.number);
    });
  };

  const deleteRep = (number: number) => {
    markRep(number, null, "pending");
    setRecordings((prev) => {
      const next = { ...prev };
      delete next[number];
      return next;
    });
    if (number === repNumber) setRecording(null);
  };


  return (
    <>
      <Instruction text="Talk about YOUR life." sub={`${lesson.goalSeconds[0]}–${lesson.goalSeconds[1]} seconds. 7–10 sentences.`} es="Habla de TU vida. 7–10 oraciones." />

      <div className="mb-5 rounded-3xl bg-navy p-4 text-navy-foreground">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          REP {repNumber} DE {SERIES_TOTAL}
        </p>
        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: SERIES_TOTAL }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                i < repNumber - 1 ? "bg-primary" : i === repNumber - 1 ? "bg-primary/50" : "bg-white/15",
              )}
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-navy-foreground/70">Say the whole thing again, a little better each time.</p>
        <EsLine text="Repite todo otra vez, un poco mejor cada vez." className="mt-1 text-navy-foreground/60" />
        <p className="mt-2 text-sm font-semibold text-navy-foreground/80">Max 30 seconds per rep. It stops on its own.</p>
        <EsLine text="Máximo 30 segundos por rep. Se detiene solo." className="mt-1 text-navy-foreground/60" />

      </div>

      <RepSeriesRow total={SERIES_TOTAL} reps={completedReps} onDelete={deleteRep} current={repNumber} onSelect={goToRep} />

      <CueRow cues={lesson.cues} />

      <div className="mt-8">
        <VoiceRecorder
          key={repNumber}
          label="START"
          stopLabel="STOP"
          targetSeconds={[Math.min(lesson.goalSeconds[0], 30), Math.min(lesson.goalSeconds[1], 30)]}
          maxSeconds={30}

          onComplete={(rec) => {
            setRecording(rec);
            setRecordings((prev) => ({ ...prev, [repNumber]: rec }));
            markRep(repNumber, rec.durationSeconds, "done", rec.url ?? undefined);
          }}
        />
      </div>

      {recording ? (
        <div className="mt-6 space-y-3">
          <RecordingPlayback url={recording.url} label="▶ LISTEN" />
          <button
            type="button"
            onClick={() => deleteRep(repNumber)}
            className="w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-[15px] font-semibold"
          >
            TRY AGAIN
          </button>
          <button
            type="button"
            onClick={() => {
              if (isLast) {
                onSeriesComplete(recording);
                return;
              }
              goToRep(repNumber + 1);
            }}

            className="w-full rounded-2xl bg-primary px-6 py-5 text-base font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
          >
            {isLast ? "FINISH 5 REPS ✓" : `NEXT REP (${repNumber + 1} / ${SERIES_TOTAL})`}
          </button>
        </div>
      ) : null}
    </>
  );
}
