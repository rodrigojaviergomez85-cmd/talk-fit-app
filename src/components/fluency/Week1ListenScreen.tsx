import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpenText, ChevronLeft, Languages, MoreHorizontal, Volume2 } from "lucide-react";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { PastVerbCards } from "@/components/fluency/PastVerbCards";
import { PowerChunks } from "@/components/fluency/PowerChunks";
import { StoryStrip } from "@/components/fluency/StoryStrip";
import { SpanishToggle, TranslatableText, useSpanishAll } from "@/components/fluency/TranslatableText";
import { Button } from "@/components/ui/button";
import type { CourseDay, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CourseService } from "@/services/course-service";
import { AudioService } from "@/services/audio-service";

type AudioStatus = "idle" | "loading" | "playing" | "paused" | "ended" | "error";

export function isWeek1ListenPilot(moduleId: ModuleId, day: CourseDay, stage: number): boolean {
  return moduleId === "basic-zero" && day.week === 1 && stage === 1;
}

function clock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "--:--";
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function initials(name: string | undefined): string {
  if (!name) return "♪";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Waveform() {
  const bars = [8, 14, 22, 12, 30, 20, 38, 16, 26, 11, 34, 21, 14, 28, 18, 10, 24, 36, 17, 29, 12, 22, 15, 9];
  return (
    <div aria-hidden="true" className="flex h-12 items-center justify-center gap-1 overflow-hidden text-listen-wave">
      {bars.map((height, index) => (
        <span key={index} className="w-1 shrink-0 rounded-full bg-current opacity-75" style={{ height }} />
      ))}
    </div>
  );
}

function CompactHeader({
  day,
  spanishSupport,
  onSpanishSupportChange,
  onBack,
  onNext,
  onExit,
}: {
  day: CourseDay;
  spanishSupport: boolean;
  onSpanishSupportChange: (value: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  onExit: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b border-border bg-listen-surface px-4 pb-4 pt-[max(0.65rem,env(safe-area-inset-top))]">
      <div className="relative mx-auto w-full max-w-[480px]">
        <div className="flex min-h-11 items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="Volver" className="size-11 rounded-full">
            <ChevronLeft className="size-6" />
          </Button>
          <span className="text-[24px] font-extrabold text-navy">fluency</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Más opciones"
            aria-expanded={menuOpen}
            className="size-11 rounded-full"
          >
            <MoreHorizontal className="size-6" />
          </Button>
        </div>
        {menuOpen ? (
          <div className="absolute right-0 top-12 z-30 w-52 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-[var(--shadow-card)]">
            <Button variant="ghost" className="h-11 w-full justify-start" onClick={onNext}>
              Siguiente paso <ArrowRight />
            </Button>
            <Button variant="ghost" className="h-11 w-full justify-start text-destructive" onClick={onExit}>
              Salir
            </Button>
          </div>
        ) : null}
        <div className="mt-2 flex items-center justify-between gap-3">
          <strong className="text-[16px] text-foreground">Día {day.day}</strong>
          <span className="text-right text-[14px] font-semibold text-muted-foreground">Paso 1 de 5 · Escucha</span>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2" aria-label="Paso 1 de 5">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className={cn("h-1.5 rounded-full", index === 0 ? "bg-primary" : "bg-muted")} />
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <SpanishToggle value={spanishSupport} onChange={onSpanishSupportChange} />
        </div>
      </div>
    </header>
  );
}

function ChallengeCard({ day }: { day: CourseDay }) {
  const spanishAll = useSpanishAll();
  const [translated, setTranslated] = useState(false);
  const translationVisible = spanishAll || translated;
  return (
    <section className="rounded-[22px] bg-navy p-5 text-navy-foreground shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">Tu reto</p>
      <h2 className="mt-3 text-[clamp(1.5rem,7vw,1.8rem)] font-extrabold leading-tight">{day.rep5Prompt.question}</h2>
      {translationVisible ? <p className="mt-2 text-[14px] text-navy-foreground/75">{day.rep5Prompt.questionEs}</p> : null}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {!spanishAll ? (
          <Button
            variant="ghost"
            onClick={() => setTranslated((open) => !open)}
            aria-expanded={translationVisible}
            className="min-h-11 justify-start text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
          >
            <Languages /> {translated ? "Ocultar" : "Traducir"}
          </Button>
        ) : <span />}
        <AudioPlayer
          text={day.rep5Prompt.question}
          label="OÍR PREGUNTA"
          variant="navy"
          size="sm"
          voice={day.speakerVoice}
          showProgress={false}
          className="[&_button]:bg-navy-soft [&_button]:text-navy-foreground"
        />
      </div>
    </section>
  );
}

export function Week1ListenScreen({
  day,
  spanishSupport,
  onSpanishSupportChange,
  onBack,
  onNext,
  onExit,
}: {
  day: CourseDay;
  spanishSupport: boolean;
  onSpanishSupportChange: (value: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  onExit: () => void;
}) {
  const [heard, setHeard] = useState(false);
  const [showText, setShowText] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>("idle");
  const speaker = day.speaker;
  const modelText = useMemo(() => CourseService.getModelText(day), [day]);
  const progress = duration > 0 ? Math.min(100, (position / duration) * 100) : 0;

  useEffect(() => {
    setHeard(false);
    setShowText(false);
    setPosition(0);
    setDuration(0);
    AudioService.stop();
  }, [day.day]);

  const skip = () => {
    AudioService.stop();
    onNext();
  };

  return (
    <div className="min-h-screen bg-listen-surface pb-[max(2rem,env(safe-area-inset-bottom))]">
      <CompactHeader
        day={day}
        spanishSupport={spanishSupport}
        onSpanishSupportChange={onSpanishSupportChange}
        onBack={onBack}
        onNext={onNext}
        onExit={onExit}
      />
      <main className="mx-auto w-full max-w-[480px] space-y-5 px-4 py-6 min-[380px]:px-5">
        <div>
          <h1 className="relative inline-block text-[clamp(2rem,9vw,2.45rem)] font-extrabold leading-[1.08] text-foreground">
            Tu día, en inglés.
            <span aria-hidden="true" className="absolute -bottom-1 right-0 h-1 w-2/5 rotate-[-2deg] rounded-full bg-primary" />
          </h1>
          <p className="mt-4 text-[17px] font-medium text-muted-foreground">Primero escucha. Después, tú.</p>
          <p className="mt-1 text-[12px] text-muted-foreground">Escucha el modelo. Todavía no hables.</p>
        </div>

        <ChallengeCard day={day} />

        <section className="rounded-[22px] border border-primary/10 bg-listen-player p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4">
            {speaker?.avatarSrc ? (
              <img
                src={speaker.avatarSrc}
                alt={speaker.avatarAlt ?? speaker.name}
                width={72}
                height={72}
                loading="lazy"
                className="size-[68px] shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-[68px] shrink-0 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground" aria-hidden="true">
                {initials(speaker?.name)}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-[20px] font-extrabold text-foreground">
                {speaker?.name ? `Escucha a ${speaker.name}` : "Escucha el ejemplo"}
              </h2>
              <p className="text-[14px] text-muted-foreground">Una respuesta de ejemplo</p>
            </div>
          </div>

          <div className="mt-4"><Waveform /></div>
          <div className="mt-2 flex items-center gap-3 text-[12px] font-bold tabular-nums text-muted-foreground">
            <span>{position > 0 ? clock(position) : "0:00"}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
              <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progress}%` }} />
            </div>
            <span>{clock(duration)}</span>
            <span className="rounded-md bg-card/70 px-2.5 py-1.5 text-foreground">1×</span>
          </div>

          <AudioPlayer
            text={modelText}
            label="ESCUCHAR EJEMPLO"
            voice={day.speakerVoice}
            size="lg"
            showProgress={false}
            onProgress={(current, total) => {
              setPosition(current);
              if (total > 0) setDuration(total);
            }}
            onStatusChange={setAudioStatus}
            onEnd={() => setHeard(true)}
            className="mt-4 [&_button]:text-[16px] [&_button]:font-extrabold"
          />
          <Button variant="ghost" onClick={() => setShowText((open) => !open)} aria-expanded={showText} className="mt-3 min-h-11 w-full text-muted-foreground">
            <BookOpenText /> {showText ? "Ocultar texto" : "Ver texto"}
          </Button>
        </section>

        {showText ? (
          <section className="space-y-3 rounded-[22px] border border-border bg-card p-5 shadow-[var(--shadow-card)]" aria-label="Texto del ejemplo">
            {day.lines.map((line) => (
              <TranslatableText key={line.id} es={line.es}>
                <p className="text-[18px] font-bold leading-snug text-foreground">{line.text}</p>
              </TranslatableText>
            ))}
          </section>
        ) : null}

        <PowerChunks chunks={day.powerChunks} voice={day.speakerVoice} audio={false} />
        {day.sceneImage ? <img src={day.sceneImage.src} alt={day.sceneImage.alt} className="w-full rounded-[22px] border border-border" /> : null}
        <PastVerbCards day={day} collapsed={heard} />
        <StoryStrip day={day} showCaptions={false} />

        <div className="space-y-2 pt-1">
          <Button
            onClick={onNext}
            disabled={!heard}
            className="min-h-14 w-full rounded-2xl text-[16px] font-extrabold"
          >
            Continuar <ArrowRight />
          </Button>
          {!heard ? <p className="text-center text-[12px] font-medium text-muted-foreground">Escucha el ejemplo o salta por ahora.</p> : null}
          <Button variant="link" onClick={skip} className="min-h-11 w-full text-muted-foreground">
            Saltar por ahora
          </Button>
          {audioStatus === "playing" ? <span className="sr-only" aria-live="polite">Reproduciendo ejemplo</span> : null}
        </div>
      </main>
    </div>
  );
}