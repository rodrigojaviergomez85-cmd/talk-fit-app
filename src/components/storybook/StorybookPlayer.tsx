import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, Lock, Play, Sparkles, Star, Volume2, X } from "lucide-react";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { SlowWordPanel } from "@/components/fluency/SlowWordPanel";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { useAppLang } from "@/lib/i18n";
import { tokenizeWords } from "@/lib/syllables";
import { AudioService } from "@/services/audio-service";
import type { ModelVoice } from "@/services/audio-service";
import { getNextEpisodeSlot } from "@/services/storybook";
import { buildEpisodeGlossary, lookupWord } from "@/services/storybook/glossary";
import type { StorybookEpisode, StorybookQuiz, StorybookScene, StorybookSpeaker } from "@/services/storybook/types";
import type { NextEpisodeInfo } from "@/services/storybook";
import { JourneyService } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";
import { cn } from "@/lib/utils";

type Slide =
  | { kind: "cover" }
  | { kind: "scene"; scene: StorybookScene }
  | { kind: "quiz"; quiz: StorybookQuiz }
  | { kind: "finale" };

function buildSlides(episode: StorybookEpisode): Slide[] {
  const slides: Slide[] = [{ kind: "cover" }];
  for (const scene of episode.scenes) {
    slides.push({ kind: "scene", scene });
    for (const quiz of episode.quizzes.filter((q) => q.afterScene === scene.id)) {
      slides.push({ kind: "quiz", quiz });
    }
  }
  slides.push({ kind: "finale" });
  return slides;
}

/** Per-character model voice; the narrator is the default warm neutral voice. */
function speakerVoice(speaker: StorybookSpeaker | undefined): ModelVoice {
  if (speaker === "vale") return "girl";
  if (speaker === "boss") return "boss";
  if (speaker === "kat") return "female";
  if (speaker === "dylan") return "male";
  return "neutral";
}

/** Vale speaks playful and a little shy; everyone else uses the default coach tone. */
function speakerTone(speaker: StorybookSpeaker | undefined): "playful" | undefined {
  return speaker === "vale" ? "playful" : undefined;
}

/** Keyframes local to the storybook (ken-burns, sparkle, shake). */
const STORYBOOK_CSS = `
@keyframes sb-kenburns-a { from { transform: scale(1) translate(0,0); } to { transform: scale(1.12) translate(-2%,-2%); } }
@keyframes sb-kenburns-b { from { transform: scale(1.12) translate(2%,1%); } to { transform: scale(1) translate(0,0); } }
@keyframes sb-sparkle { 0%,100% { opacity: .15; transform: translateY(0) scale(.8); } 50% { opacity: .9; transform: translateY(-8px) scale(1.15); } }
@keyframes sb-shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
@keyframes sb-pop { 0% { transform: scale(.4); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
@keyframes sb-slide-in { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
`;

export function StorybookPlayer({ episode }: { episode: StorybookEpisode }) {
  const es = useAppLang().lang === "es";
  const slides = useMemo(() => buildSlides(episode), [episode]);
  const episodeGlossary = useMemo(() => buildEpisodeGlossary(episode), [episode]);
  const [idx, setIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [notebook, setNotebook] = useState<Record<string, string>>({});
  const [saidIt, setSaidIt] = useState<Record<string, boolean>>({});
  const [quizDone, setQuizDone] = useState<Record<string, boolean>>({});
  const [journey, setJourney] = useState<JourneyState | null>(null);
  const touchX = useRef<number | null>(null);

  const nextEpisode = useMemo(() => {
    if (!journey) return null;
    return getNextEpisodeSlot(episode.id, journey);
  }, [episode.id, journey]);

  useEffect(() => {
    setJourney(JourneyService.load());
  }, []);

  const slide = slides[idx]!;
  const total = slides.length;

  const go = (next: number) => {
    setIdx(Math.min(total - 1, Math.max(0, next)));
  };

  // Auto-play the slide's audio when it becomes visible.
  useEffect(() => {
    AudioService.stop();
    if (slide.kind === "scene")
      AudioService.speak(slide.scene.text, { voice: speakerVoice(slide.scene.speaker), tone: speakerTone(slide.scene.speaker) });
    if (slide.kind === "quiz") AudioService.speak(slide.quiz.questionEn, { voice: episode.voice });
    return () => AudioService.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const learnWord = (word: string, meaning: string) => {
    setNotebook((prev) => (prev[word] ? prev : { ...prev, [word]: meaning }));
  };

  return (
    <div className="select-none">
      <style>{STORYBOOK_CSS}</style>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <Link
          to="/natural-method/audiobooks"
          aria-label={es ? "Volver a audiolibros" : "Back to audiobooks"}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[13px] font-extrabold text-amber-500">
          <Star className="size-4 fill-amber-500" /> {stars}
        </span>
      </div>

      <div
        className="mt-3"
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
          touchX.current = null;
          if (delta < -48) go(idx + 1);
          else if (delta > 48) go(idx - 1);
        }}
      >
        <div key={idx} style={{ animation: "sb-slide-in .35s ease-out" }}>
          {slide.kind === "cover" ? <CoverSlide episode={episode} es={es} onStart={() => go(1)} /> : null}
          {slide.kind === "scene" ? (
            <SceneSlide
              scene={slide.scene}
              episodeGlossary={episodeGlossary}
              voice={episode.voice}
              es={es}
              flip={idx % 2 === 0}
              onLearnWord={learnWord}
            />
          ) : null}
          {slide.kind === "quiz" ? (
            <QuizSlide
              quiz={slide.quiz}
              episodeGlossary={episodeGlossary}
              voice={episode.voice}
              es={es}
              done={Boolean(quizDone[slide.quiz.id])}
              said={Boolean(saidIt[slide.quiz.id])}
              onCorrect={() => {
                setQuizDone((p) => ({ ...p, [slide.kind === "quiz" ? slide.quiz.id : ""]: true }));
                setStars((s) => s + 1);
              }}
              onSaid={() => {
                setSaidIt((p) => ({ ...p, [slide.kind === "quiz" ? slide.quiz.id : ""]: true }));
                setStars((s) => s + 1);
              }}
            />
          ) : null}
          {slide.kind === "finale" ? (
            <FinaleSlide
              episode={episode}
              es={es}
              stars={stars}
              notebook={notebook}
              nextEpisode={nextEpisode}
            />
          ) : null}
        </div>

        {/* Prev / next */}
        {slide.kind !== "cover" ? (
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => go(idx - 1)}
              className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-2xl border border-border px-4 text-[13px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
            >
              <ChevronLeft className="size-4" /> {es ? "Atrás" : "Back"}
            </button>
            {slide.kind !== "finale" ? (
              <button
                type="button"
                onClick={() => go(idx + 1)}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[14px] font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
              >
                {es ? "Siguiente" : "Next"} <ArrowRight className="size-4" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------- Slides ------------------------------- */

function CoverSlide({ episode, es, onStart }: { episode: StorybookEpisode; es: boolean; onStart: () => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={episode.cover}
          alt={es ? `Portada de ${episode.titleEs}` : `${episode.title} cover`}
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
          style={{ animation: "sb-kenburns-a 14s ease-in-out infinite alternate" }}
        />
        <span className="absolute right-3 top-3" style={{ animation: "sb-sparkle 2.4s ease-in-out infinite" }}>
          <Sparkles className="size-6 text-amber-300" />
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
            {es ? episode.episodeLabel.es : episode.episodeLabel.en}
          </p>
          <h1 className="text-2xl font-extrabold text-white">{es ? episode.titleEs : episode.title}</h1>
        </div>
      </div>
      <div className="space-y-3 p-4">
        {episode.previously && episode.previously.length > 0 ? (
          <div className="rounded-2xl border border-border bg-muted/40 p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {es ? "Anteriormente…" : "Previously…"}
            </p>
            <ul className="mt-1.5 space-y-1">
              {episode.previously.map((line) => (
                <li key={line.en} className="text-[13px] leading-snug text-foreground">
                  • {es ? line.es : line.en}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="text-[14px] text-muted-foreground">{es ? episode.blurb.es : episode.blurb.en}</p>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[16px] font-extrabold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
        >
          <Play className="size-5 fill-current" /> {es ? "Empezar" : "Start"}
        </button>
        <p className="text-center text-[12px] text-muted-foreground">
          {es ? "Desliza o toca para pasar la página · toca cualquier palabra para ver su significado" : "Swipe or tap to turn the page · tap any word to see its meaning"}
        </p>
      </div>
    </div>
  );
}

/** Every English word is tappable: curated words are highlighted, the rest are subtle. */
function TappableText({
  text,
  scene,
  episodeGlossary,
  voice,
  es,
  className,
  onLearnWord,
}: {
  text: string;
  scene?: StorybookScene;
  episodeGlossary: Map<string, string>;
  voice: "female" | "male" | undefined;
  es: boolean;
  className?: string;
  onLearnWord?: (word: string, meaning: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const tokens = tokenizeWords(text);
  const result = open ? lookupWord(open, { scene, episodeGlossary }) : null;

  return (
    <div className="space-y-3">
      <p className={className}>
        {tokens.map((token, i) => {
          if (!token.isWord) {
            return (
              <span key={`sep-${i}`} style={{ whiteSpace: "pre-wrap" }}>
                {token.value}
              </span>
            );
          }
          const info = lookupWord(token.value, { scene, episodeGlossary });
          return (
            <button
              key={`w-${i}`}
              type="button"
              onClick={() => {
                if (info.curated && info.meaning) onLearnWord?.(token.value, info.meaning);
                setOpen(open === token.value ? null : token.value);
                AudioService.stop();
                AudioService.speak(token.value, { rate: 0.75, voice });
              }}
              aria-label={es ? `Significado de ${token.value}` : `Meaning of ${token.value}`}
              className={cn(
                "rounded-md px-0.5 underline decoration-2 underline-offset-4 transition-colors",
                info.curated ? "decoration-primary/60" : "decoration-border/70 decoration-dotted",
                open === token.value ? "bg-primary/15 text-primary" : "hover:bg-primary/10",
              )}
            >
              {token.value}
            </button>
          );
        })}
      </p>

      {open ? (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-3" style={{ animation: "sb-pop .25s ease-out" }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[18px] font-extrabold text-foreground">{open}</p>
              {result?.meaning ? (
                <p className="text-[14px] font-semibold text-primary">{result.meaning}</p>
              ) : (
                <p className="text-[13px] font-semibold text-muted-foreground">
                  {es ? "Escúchala despacio para practicarla." : "Listen to it slowly to practice it."}
                </p>
              )}
              {result?.curated ? (
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {es ? "Guardada en tu cuaderno ⭐" : "Saved to your notebook ⭐"}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={es ? "Cerrar" : "Close"}
              className="rounded-full p-1 text-muted-foreground hover:bg-card"
            >
              <X className="size-4" />
            </button>
          </div>
          <SlowWordPanel word={open} voice={voice} compact onClose={() => setOpen(null)} />
        </div>
      ) : null}
    </div>
  );
}

function SceneSlide({
  scene,
  episodeGlossary,
  voice,
  es,
  flip,
  onLearnWord,
}: {
  scene: StorybookScene;
  episodeGlossary: Map<string, string>;
  voice: "female" | "male" | undefined;
  es: boolean;
  flip: boolean;
  onLearnWord: (word: string, meaning: string) => void;
}) {
  const [showEs, setShowEs] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={scene.image}
          alt={scene.imageAlt}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ animation: `${flip ? "sb-kenburns-a" : "sb-kenburns-b"} 16s ease-in-out infinite alternate` }}
        />
        <span
          className="absolute left-3 top-3"
          style={{ animation: "sb-sparkle 2.8s ease-in-out infinite" }}
        >
          <Sparkles className="size-5 text-amber-300/90" />
        </span>
      </div>

      <div className="space-y-3 p-4">
        <TappableText
          text={scene.text}
          scene={scene}
          episodeGlossary={episodeGlossary}
          voice={voice}
          es={es}
          onLearnWord={onLearnWord}
          className="text-[21px] font-extrabold leading-snug tracking-tight text-foreground"
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              AudioService.stop();
              AudioService.speak(scene.text, { voice: speakerVoice(scene.speaker), tone: speakerTone(scene.speaker) });
            }}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.1em] text-foreground"
          >
            <Volume2 className="size-4" /> {es ? "Escuchar" : "Listen"}
          </button>
          <button
            type="button"
            onClick={() => setShowEs((v) => !v)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
          >
            {showEs ? "English" : "Español"}
          </button>
        </div>

        {showEs ? <p className="text-[14px] font-semibold text-muted-foreground">{scene.es}</p> : null}
      </div>
    </div>
  );
}

function QuizSlide({
  quiz,
  episodeGlossary,
  voice,
  es,
  done,
  said,
  onCorrect,
  onSaid,
}: {
  quiz: StorybookQuiz;
  episodeGlossary: Map<string, string>;
  voice: "female" | "male" | undefined;
  es: boolean;
  done: boolean;
  said: boolean;
  onCorrect: () => void;
  onSaid: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);

  const pick = (i: number) => {
    setPicked(i);
    if (i === quiz.answer) {
      if (!done) onCorrect();
      AudioService.stop();
      AudioService.speak(quiz.sayIt, { voice });
    } else {
      setWrong(i);
      setTimeout(() => setWrong(null), 500);
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border-2 border-primary/40 bg-card p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
        {es ? "Pregunta rápida" : "Quick question"}
      </p>
      <TappableText
        text={quiz.questionEn}
        episodeGlossary={episodeGlossary}
        voice={voice}
        es={es}
        className="text-[20px] font-extrabold leading-snug text-foreground"
      />
      <p className="text-[13px] font-semibold text-muted-foreground">{quiz.questionEs}</p>
      <AudioPlayer text={quiz.questionEn} label={es ? "ESCUCHAR" : "LISTEN"} size="sm" variant="ghost" voice={voice} />

      <div className="grid gap-2">
        {quiz.options.map((option, i) => {
          const isRight = done && i === quiz.answer;
          const isWrong = wrong === i;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => pick(i)}
              style={isWrong ? { animation: "sb-shake .4s ease" } : undefined}
              className={cn(
                "flex min-h-[52px] items-center gap-3 rounded-2xl border-2 px-4 text-left text-[16px] font-bold transition-colors",
                isRight
                  ? "border-primary bg-primary/10 text-primary"
                  : isWrong
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-background text-foreground",
              )}
            >
              <span className="text-xl" aria-hidden="true">{option.emoji}</span>
              {option.label}
              {isRight ? <Check className="ml-auto size-5" /> : null}
            </button>
          );
        })}
      </div>

      {done ? (
        <div className="space-y-3 rounded-2xl bg-secondary/60 p-3" style={{ animation: "sb-pop .3s ease-out" }}>
          <p className="flex items-center gap-2 text-[14px] font-extrabold text-primary">
            <Star className="size-4 fill-amber-500 text-amber-500" />
            {es ? "¡Correcto! Ahora dilo tú:" : "Correct! Now you say it:"}
          </p>
          <TappableText
            text={quiz.sayIt}
            episodeGlossary={episodeGlossary}
            voice={voice}
            es={es}
            className="text-[16px] font-extrabold text-foreground"
          />
          <p className="text-[12px] font-semibold text-muted-foreground">{quiz.sayItEs}</p>
          {said ? (
            <p className="flex items-center justify-center gap-2 text-[13px] font-bold text-primary">
              <Check className="size-4" /> {es ? "¡Lo dijiste! +1 ⭐" : "You said it! +1 ⭐"}
            </p>
          ) : (
            <VoiceRecorder
              label={es ? "DECIRLO" : "SAY IT"}
              stopLabel={es ? "PARAR" : "STOP"}
              maxSeconds={15}
              countdown
              size="md"
              onComplete={onSaid}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

function FinaleSlide({
  episode,
  es,
  stars,
  notebook,
  nextEpisode,
}: {
  episode: StorybookEpisode;
  es: boolean;
  stars: number;
  notebook: Record<string, string>;
  nextEpisode: NextEpisodeInfo | null;
}) {
  const [recorded, setRecorded] = useState(false);
  const words = Object.entries(notebook);

  const nextLabel = nextEpisode
    ? es
      ? `Episodio ${nextEpisode.day}: ${nextEpisode.teaser.es}`
      : `Episode ${nextEpisode.day}: ${nextEpisode.teaser.en}`
    : null;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-card p-5 text-center">
        <p className="text-4xl" style={{ animation: "sb-pop .4s ease-out" }} aria-hidden="true">
          🎉
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-foreground">
          {es ? "¡Terminaste el Episodio 1!" : "You finished Episode 1!"}
        </h2>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[15px] font-extrabold text-amber-500">
          <Star className="size-5 fill-amber-500" /> {stars} {es ? "estrellas" : "stars"}
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-4">
        <h3 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-foreground">
          {es ? "Mi cuaderno de vocabulario" : "My vocabulary notebook"}
        </h3>
        {words.length === 0 ? (
          <p className="mt-2 text-[13px] text-muted-foreground">
            {es
              ? "No tocaste palabras esta vez. Vuelve y toca las palabras subrayadas para guardarlas aquí."
              : "You didn't tap any words. Go back and tap the underlined words to save them here."}
          </p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-2">
            {words.map(([word, meaning]) => (
              <li key={word}>
                <button
                  type="button"
                  onClick={() => {
                    AudioService.stop();
                    AudioService.speak(word, { rate: 0.75, voice: episode.voice });
                  }}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 text-[13px] font-bold text-foreground"
                >
                  <Volume2 className="size-3.5 text-primary" /> {word} <span className="font-semibold text-muted-foreground">· {meaning}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-3 rounded-3xl bg-navy p-4 text-navy-foreground">
        <h3 className="text-[13px] font-extrabold uppercase tracking-[0.12em]">
          {es ? "Ahora te toca a ti" : "Now it's your turn"}
        </h3>
        <p className="text-[14px] opacity-90">{es ? episode.continuePrompt.es : episode.continuePrompt.en}</p>
        <ul className="flex flex-wrap gap-2">
          {episode.continueWith.map((chunk) => (
            <li
              key={chunk}
              className="rounded-full border border-navy-foreground/30 px-3 py-1 text-[12px] font-bold tracking-wide"
            >
              {chunk}
            </li>
          ))}
        </ul>
        <VoiceRecorder
          label={es ? "GRABAR MI PRESENTACIÓN" : "RECORD MY INTRO"}
          stopLabel={es ? "PARAR" : "STOP"}
          maxSeconds={45}
          countdown
          onComplete={() => setRecorded(true)}
        />
        {recorded ? (
          <p className="flex items-center justify-center gap-2 text-[13px] font-bold">
            <Check className="size-4" /> {es ? "¡Excelente! Sonaste como Vale." : "Great job! You sounded like Vale."}
          </p>
        ) : null}
      </div>

      <p className="rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-3 text-center text-[13px] font-bold text-primary">
        {es ? episode.cliffhanger.es : episode.cliffhanger.en}
      </p>

      {nextLabel ? (
        nextEpisode?.unlocked && nextEpisode.episodeId ? (
          <Link
            to="/natural-method/cuento/$storyId"
            params={{ storyId: nextEpisode.episodeId }}
            className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[16px] font-extrabold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
          >
            {es ? "Siguiente episodio" : "Next episode"} <ArrowRight className="size-5" />
          </Link>
        ) : (
          <div className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-muted-foreground/40 bg-muted/40 px-6 text-[14px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            <Lock className="size-4" /> {nextLabel}
          </div>
        )
      ) : null}
    </div>
  );
}
