import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { RepProgress } from "@/components/fluency/RepProgress";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { RecordingPlayback } from "@/components/fluency/RecordingPlayback";
import { RecordingComparison } from "@/components/fluency/RecordingComparison";
import { WaveformPlayer } from "@/components/fluency/WaveformPlayer";
import { AIAnalysisCard } from "@/components/fluency/AIAnalysisCard";
import { QuickFixCard } from "@/components/fluency/QuickFixCard";
import { PronunciationCard } from "@/components/fluency/PronunciationCard";
import { FluencyScore } from "@/components/fluency/FluencyScore";
import { LessonService } from "@/services/lesson-service";
import { AudioService } from "@/services/audio-service";
import { SpeechAnalysisService } from "@/services/speech-analysis-service";
import { FeedbackService } from "@/services/feedback-service";
import { ProfileService } from "@/services/profile-service";
import { RepFeedback } from "@/components/fluency/RepFeedback";
import { SpanishProvider, SpanishToggle, TranslatableText, useSpanishAll } from "@/components/fluency/TranslatableText";

import { checkRepetition, type RepCheck } from "@/lib/pronunciation-check";
import type { QuickFix, Recording, SpeechAnalysis } from "@/lib/types";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Today's 10 Fluency Reps — Simple Present" },
      {
        name: "description",
        content:
          "Listen, notice, echo, shadow, record and personalize: ten guided speaking reps that make Simple Present automatic.",
      },
      { property: "og:title", content: "Today's 10 Fluency Reps — Simple Present" },
      { property: "og:description", content: "Seven guided speaking reps with instant feedback on your recording." },
    ],
  }),
  component: PracticePage,
});

type Stage =
  | { kind: "rep"; index: number }
  | { kind: "analysis" }
  | { kind: "quickfix" }
  | { kind: "final-analysis" }
  | { kind: "summary" };

const REP_TITLES = [
  "REP 1 OF 7",
  "REP 2 OF 7",
  "REP 3 OF 7",
  "REP 4 OF 7",
  "REP 5 OF 7",
  "REP 6 OF 7",
  "FINAL REP",
];

function PracticePage() {
  const navigate = useNavigate();
  const lesson = LessonService.getTodayLesson();
  const modelText = useMemo(() => LessonService.getModelText(lesson), [lesson]);
  const [stage, setStage] = useState<Stage>({ kind: "rep", index: 0 });
  const [showSpanish, setShowSpanish] = useState(false);


  const [rep7Recording, setRep7Recording] = useState<Recording | null>(null);
  const [rep9Recording, setRep9Recording] = useState<Recording | null>(null);
  const [rep10Recording, setRep10Recording] = useState<Recording | null>(null);
  const [analysis, setAnalysis] = useState<SpeechAnalysis | null>(null);
  const [finalAnalysis, setFinalAnalysis] = useState<SpeechAnalysis | null>(null);
  const [quickFix, setQuickFix] = useState<QuickFix | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => () => AudioService.stop(), []);
  useEffect(() => {
    AudioService.stop();
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, [stage]);

  const repIndex = stage.kind === "rep" ? stage.index : stage.kind === "summary" ? 7 : 6;
  const title = stage.kind === "summary" ? "SESSION COMPLETE" : (REP_TITLES[repIndex] ?? "PRACTICE");

  const goToRep = (index: number) => setStage({ kind: "rep", index });

  const runAnalysis = async (recording: Recording, transcript: string, isFinal: boolean) => {
    setAnalyzing(true);
    const result = await SpeechAnalysisService.analyze({
      transcript,
      durationSeconds: recording.durationSeconds || 38,
      isFinalRep: isFinal,
      targetStructure: `${lesson.grammar} — ${lesson.topic}`,
    });

    setAnalyzing(false);
    if (isFinal) {
      setFinalAnalysis(result);
      setStage({ kind: "final-analysis" });
    } else {
      setAnalysis(result);
      setQuickFix(FeedbackService.buildQuickFix(result));
      setStage({ kind: "analysis" });
    }
    return result;
  };

  const finishSession = () => {
    if (!finalAnalysis) return;
    const comparison = analysis ? FeedbackService.compare(analysis, finalAnalysis) : null;
    const profile = ProfileService.load();
    ProfileService.recordSession(profile, {
      lessonId: lesson.id,
      score: finalAnalysis.score,
      breakdown: finalAnalysis.breakdown,
      finalSeconds: finalAnalysis.fluency.seconds,
      fixed: comparison?.fixed.map((issue) => issue.correct) ?? [],
      transcript: finalAnalysis.transcript,
      remainingIssues: finalAnalysis.grammarIssues,
    });
    setStage({ kind: "summary" });
  };

  return (
    <div className="min-h-screen bg-background">
      <RepProgress
        current={repIndex}
        total={7}
        title={title}
        {...(stage.kind === "rep" && stage.index > 0
          ? { onBack: () => setStage({ kind: "rep", index: (stage as { index: number }).index - 1 }) }
          : {})}
        onExit={() => {
          void navigate({ to: "/" });
        }}
      />

      <main className="mx-auto w-full max-w-lg px-4 pb-16 pt-6">
        <SpanishProvider value={showSpanish}>
        {stage.kind === "rep" && !analyzing ? (
          <div className="mb-4">
            <SpanishToggle value={showSpanish} onChange={setShowSpanish} />
          </div>
        ) : null}
        {analyzing ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-lg font-bold">Checking your recording…</p>
            <p className="text-sm text-muted-foreground">Grammar, fluency, pronunciation, rhythm and structure.</p>
            <p className="text-[13px] italic text-muted-foreground/80">Revisando tu grabación… gramática, fluidez, pronunciación, ritmo y estructura.</p>
          </div>
        ) : stage.kind === "rep" ? (

          <RepBody
            index={stage.index}
            lesson={lesson}
            modelText={modelText}
            rep7Recording={rep7Recording}
            rep9Recording={rep9Recording}
            finalFocus={analysis?.focusLabel ?? lesson.focus}
            onNext={() => goToRep(stage.index + 1)}
            onRep7Recorded={setRep7Recording}
            onRep9Recorded={(recording, transcript) => {
              setRep9Recording(recording);
              void runAnalysis(recording, transcript, false);
            }}
            onRep10Recorded={(recording, transcript) => {
              setRep10Recording(recording);
              void runAnalysis(recording, transcript, true);
            }}
          />
        ) : stage.kind === "analysis" && analysis ? (
          <AnalysisStage
            analysis={analysis}
            onPractice={() => setStage(quickFix ? { kind: "quickfix" } : { kind: "rep", index: 6 })}
          />
        ) : stage.kind === "quickfix" && quickFix ? (
          <QuickFixCard quickFix={quickFix} onDone={() => goToRep(6)} />
        ) : stage.kind === "final-analysis" && finalAnalysis ? (
          <FinalAnalysisStage
            before={analysis}
            after={finalAnalysis}
            modelText={modelText}
            rep9Url={rep9Recording?.url ?? null}
            rep10Url={rep10Recording?.url ?? null}
            onDone={finishSession}
          />
        ) : stage.kind === "summary" && finalAnalysis ? (
          <SummaryStage
            analysis={finalAnalysis}
            fixed={analysis ? FeedbackService.compare(analysis, finalAnalysis).fixed.map((i) => i.correct) : []}
            recordingUrl={rep10Recording?.url ?? null}
            onViewProgress={() => navigate({ to: "/progress" })}
            onDone={() => navigate({ to: "/" })}
          />
        ) : null}
        </SpanishProvider>
      </main>

    </div>
  );
}

/* ---------------------------------- Reps ---------------------------------- */

type RepBodyProps = {
  index: number;
  lesson: ReturnType<typeof LessonService.getTodayLesson>;
  modelText: string;
  rep7Recording: Recording | null;
  rep9Recording: Recording | null;
  finalFocus: string;
  onNext: () => void;
  onRep7Recorded: (recording: Recording) => void;
  onRep9Recorded: (recording: Recording, transcript: string) => void;
  onRep10Recorded: (recording: Recording, transcript: string) => void;
};

function RepBody(props: RepBodyProps) {
  switch (props.index) {
    case 0:
      return <Rep2 {...props} />;
    case 1:
      return <Rep3 {...props} />;
    case 2:
      return <Shadowing {...props} rate={0.85} instruction="Speak WITH the model." instructionEs="Habla CON el modelo." heading="Slow shadowing" note="Copy the speaker's rhythm, stress and pronunciation." noteEs="Copia el ritmo, el énfasis y la pronunciación del hablante." />;
    case 3:
      return <Shadowing {...props} rate={1} speeds={[0.75, 1, 1.25, 1.5]} instruction="Now match natural English." instructionEs="Ahora iguala el inglés natural." heading="Natural speed" note="Tap a speed to make it slower or faster." noteEs="Toca una velocidad para ponerlo más lento o más rápido. Empieza en 1x y súbelo cuando te sientas cómodo." />;
    case 4:
      return <Rep7 {...props} />;
    case 5:
      return <RepSeries {...props} />;
    case 6:
      return <Rep10 {...props} />;
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

function Rep3({ lesson, onNext }: RepBodyProps) {
  const [index, setIndex] = useState(0);
  const [myVoice, setMyVoice] = useState<Recording | null>(null);
  const [check, setCheck] = useState<RepCheck | null>(null);
  const sentence = lesson.sentences[index]!;
  const isLast = index === lesson.sentences.length - 1;

  const reset = () => {
    setMyVoice(null);
    setCheck(null);
  };

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
          captureTranscript
          liveTranscriptOnly
          onComplete={(recording, transcript) => {
            setMyVoice(recording);
            setCheck(checkRepetition(sentence.text, transcript));
          }}
        />
      </div>

      {check ? <RepFeedback check={check} onRetry={reset} className="mt-5" /> : null}

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
  instruction,
  instructionEs,
  heading,
  note,
  noteEs,
}: RepBodyProps & { rate: number; instruction: string; instructionEs?: string; heading: string; note: string; noteEs?: string }) {
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  const start = () => {
    if (playing) {
      stopRef.current?.();
      AudioService.stop();
      setPlaying(false);
      return;
    }
    stopRef.current = AudioService.speak(modelText, {
      rate,
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
    });
  };

  return (
    <>
      <Instruction text={instruction} sub={`${heading} · ${rate}x speed`} es={instructionEs} />
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

function RepSeries({ lesson, rep9Recording, onRep9Recorded }: RepBodyProps) {
  const [repNumber, setRepNumber] = useState(1);
  const [recording, setRecording] = useState<Recording | null>(rep9Recording);
  const [transcript, setTranscript] = useState("");
  const isLast = repNumber === SERIES_TOTAL;

  return (
    <>
      <Instruction text="Talk about YOUR life." sub={`${lesson.goalSeconds[0]}–${lesson.goalSeconds[1]} seconds. 7–10 sentences.`} es="Habla de TU vida. Usa la lista de abajo como guía." />

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
      </div>

      <CueRow cues={lesson.cues} />

      <div className="mt-5 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <ul className="space-y-2">
          {lesson.checklist.map((item, i) => (
            <li key={item} className="flex items-center gap-2 text-[15px] text-muted-foreground">
              <span className="size-4 shrink-0 rounded border border-border" />
              <TranslatableText es={lesson.checklistEs?.[i]}>
                <span>{item}</span>
              </TranslatableText>
            </li>
          ))}

        </ul>
      </div>

      <div className="mt-8">
        <VoiceRecorder
          key={repNumber}
          label="START"
          stopLabel="STOP"
          targetSeconds={lesson.goalSeconds}
          captureTranscript
          onComplete={(rec, text) => {
            setRecording(rec);
            setTranscript(text);
          }}
        />
      </div>

      {recording ? (
        <div className="mt-6 space-y-3">
          <RecordingPlayback url={recording.url} label="▶ LISTEN" />
          <button
            type="button"
            onClick={() => setRecording(null)}
            className="w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-[15px] font-semibold"
          >
            TRY AGAIN
          </button>
          <button
            type="button"
            onClick={() => {
              if (isLast) {
                onRep9Recorded(recording, transcript);
                return;
              }
              setRecording(null);
              setTranscript("");
              setRepNumber((n) => n + 1);
            }}
            className="w-full rounded-2xl bg-primary px-6 py-5 text-base font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
          >
            {isLast ? "GET MY FEEDBACK" : `NEXT REP (${repNumber + 1} / ${SERIES_TOTAL})`}
          </button>
        </div>
      ) : null}
    </>
  );
}


function Rep10({ lesson, finalFocus, onRep10Recorded }: RepBodyProps) {
  return (
    <>
      <Instruction text="Now do it again." sub="Focus on your ONE improvement." es="Ahora hazlo otra vez. Enfócate en tu UNA mejora." />
      <div className="rounded-3xl bg-navy p-5 text-navy-foreground">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Today's focus</p>
        <p className="mt-1.5 text-2xl font-extrabold uppercase">{finalFocus}</p>
      </div>
      <div className="mt-5">
        <CueRow cues={lesson.cues} />
      </div>
      <div className="mt-10">
        <VoiceRecorder
          label="START"
          stopLabel="STOP"
          targetSeconds={lesson.goalSeconds}
          captureTranscript
          onComplete={(recording, transcript) => onRep10Recorded(recording, transcript)}
        />
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">Almost no support this time. You've got the pattern.</p>
      <EsLine text="Casi sin ayuda esta vez. Ya tienes el patrón." className="mt-1 text-center" />
    </>
  );
}

/* ------------------------------ Result stages ----------------------------- */

function CorrectnessBanner({ analysis }: { analysis: SpeechAnalysis }) {
  const clean = analysis.grammarIssues.length === 0;
  return (
    <div className="space-y-2">
      <div
        className={cn(
          "rounded-3xl border p-5",
          clean ? "border-success/30 bg-success/10" : "border-primary/30 bg-accent",
        )}
      >
        <p className="text-[13px] font-extrabold uppercase tracking-[0.16em]">
          {clean ? "LO DIJISTE BIEN" : `${analysis.grammarIssues.length} COSAS PARA CORREGIR`}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {clean
            ? "No encontramos errores de gramática en lo que dijiste."
            : "Revisa abajo lo que dijiste y cómo se dice correctamente."}
        </p>
      </div>
    </div>
  );
}

function CorrectionList({ analysis }: { analysis: SpeechAnalysis }) {
  if (analysis.grammarIssues.length === 0) return null;
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Correcciones</p>
      <ul className="mt-3 space-y-4">
        {analysis.grammarIssues.map((issue) => (
          <li key={issue.id} className="space-y-1">
            <p className="text-[15px] text-destructive line-through">{issue.said}</p>
            <p className="text-[16px] font-semibold text-success">{issue.correct}</p>
            <p className="text-[13px] text-muted-foreground">{issue.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}



function AnalysisStage({ analysis, onPractice }: { analysis: SpeechAnalysis; onPractice: () => void }) {
  return (
    <div className="space-y-4">
      <Instruction text="Your feedback" sub="One win. One fix. Then we train it." es="Tu retroalimentación. Un acierto. Una corrección. Luego lo entrenamos." />
      <CorrectnessBanner analysis={analysis} />
      <AIAnalysisCard analysis={analysis} onPracticeThis={onPractice} />
      <CorrectionList analysis={analysis} />


      <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Fluency</p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Metric label="Speaking time" value={`${analysis.fluency.seconds}s`} />
          <Metric label="Words per minute" value={String(analysis.fluency.wordsPerMinute)} />
          <Metric label="Long pauses" value={String(analysis.fluency.longPauses)} />
          <Metric label="Filler words" value={String(analysis.fluency.fillerWords)} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{analysis.fluency.continuityNote}</p>
      </section>

      <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Structure</p>
        <ul className="mt-3 space-y-2">
          {analysis.structure.map((check) => (
            <li key={check.label} className="flex items-center justify-between text-[15px]">
              <span className={check.passed ? "font-semibold" : "text-muted-foreground"}>{check.label}</span>
              <span className={check.passed ? "text-success" : "text-muted-foreground"}>{check.passed ? "✓" : check.detail ?? "—"}</span>
            </li>
          ))}
        </ul>
      </section>

      <PronunciationCard targets={analysis.pronunciation} />

      <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Rhythm &amp; pauses</p>
        {analysis.rhythm.map((target) => (
          <div key={target.chunked} className="mt-3 rounded-2xl bg-secondary/60 p-4">
            <p className="text-sm text-muted-foreground line-through">{target.wordByWord}</p>
            <p className="mt-1 text-[16px] font-bold">{target.chunked}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <AudioPlayer text={target.chunked.replace(/\//g, " ")} label="HEAR IT" size="sm" variant="ghost" />
              <VoiceRecorder label="SAY IT" stopLabel="DONE" showTimer={false} onComplete={() => undefined} className="[&>button]:size-11 [&>button]:text-[9px]" />
            </div>
          </div>
        ))}
      </section>

      <button
        type="button"
        onClick={onPractice}
        className="w-full rounded-2xl bg-primary px-6 py-5 text-base font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
      >
        PRACTICE THIS
      </button>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-extrabold tabular-nums">{value}</p>
    </div>
  );
}

function FinalAnalysisStage({
  before,
  after,
  modelText,
  rep9Url,
  rep10Url,
  onDone,
}: {
  before: SpeechAnalysis | null;
  after: SpeechAnalysis;
  modelText: string;
  rep9Url: string | null;
  rep10Url: string | null;
  onDone: () => void;
}) {
  const comparison = before ? FeedbackService.compare(before, after) : null;
  const fixed = comparison?.fixed ?? [];

  return (
    <div className="space-y-4">
      <Instruction text="You improved" sub="Same pattern, better result." es="Mejoraste. Mismo patrón, mejor resultado." />

      {fixed.length > 0 ? (
        <section className="rounded-3xl border border-success/25 bg-success/8 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-success">Fixed today</p>
          {fixed.map((issue) => (
            <div key={issue.id} className="mt-3">
              <p className="text-sm text-muted-foreground line-through">Before: {issue.said}</p>
              <p className="mt-1 text-[16px] font-bold">Final: {issue.correct}</p>
              <p className="mt-1 text-sm font-bold text-success">✓ FIXED</p>
            </div>
          ))}
        </section>
      ) : (
        <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[15px] font-semibold">{after.didWell}</p>
          <p className="mt-1 text-sm text-muted-foreground">Keep training the same pattern tomorrow.</p>
        </section>
      )}

      <FluencyScore score={after.score} breakdown={after.breakdown} caption="Today's fluency score" />

      <RecordingComparison
        leftLabel="▶ FIRST TRY"
        rightLabel="▶ FINAL REP"
        leftUrl={rep9Url}
        rightUrl={rep10Url ?? null}
        caption="Before vs after"
      />
      <RecordingComparison leftLabel="▶ MODEL" rightLabel="▶ MY FINAL" modelText={modelText} rightUrl={rep10Url} caption="Model vs you" />

      <button
        type="button"
        onClick={onDone}
        className="w-full rounded-2xl bg-primary px-6 py-5 text-base font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
      >
        FINISH SESSION
      </button>
    </div>
  );
}

function SummaryStage({
  analysis,
  fixed,
  recordingUrl,
  onViewProgress,
  onDone,
}: {
  analysis: SpeechAnalysis;
  fixed: string[];
  recordingUrl: string | null;
  onViewProgress: () => void;
  onDone: () => void;
}) {
  return (
    <div className="space-y-4 pb-8">
      <div className="rounded-3xl bg-navy p-6 text-center text-navy-foreground">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Today's fluency training complete</p>
        <p className="mt-3 text-3xl font-extrabold">7 / 7 REPS ✓</p>
        <p className="mt-2 text-sm text-navy-foreground/70">Final speaking time: {analysis.fluency.seconds} seconds</p>
      </div>

      <FluencyScore score={analysis.score} breakdown={analysis.breakdown} />

      {fixed.length > 0 ? (
        <section className="rounded-3xl border border-success/25 bg-success/8 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-success">Today you improved</p>
          <ul className="mt-2 space-y-1">
            {fixed.map((item) => (
              <li key={item} className="text-[15px] font-semibold">✓ {item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Today's best moment</p>
        <p className="mt-2 text-[16px] font-semibold">{analysis.didWell}</p>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Next target</p>
        <p className="mt-2 text-[16px] font-semibold">{FeedbackService.nextTarget(analysis)}</p>
      </section>

      <RecordingPlayback url={recordingUrl} label="▶ HEAR FINAL RECORDING" />
      <button
        type="button"
        onClick={onViewProgress}
        className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-[15px] font-semibold"
      >
        VIEW PROGRESS
      </button>
      <button
        type="button"
        onClick={onDone}
        className="w-full rounded-2xl bg-primary px-6 py-5 text-base font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
      >
        DONE
      </button>

      <p className="pt-4 text-center text-lg font-extrabold uppercase tracking-[0.2em] text-primary">Small reps. Big fluency.</p>
    </div>
  );
}
