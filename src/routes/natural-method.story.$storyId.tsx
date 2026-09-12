import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Check, Ear, Mic, Sparkles } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { SpeakButton } from "@/components/fluency/NaturalMethodPager";
import { TappableSentence } from "@/components/fluency/TappableSentence";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { StoryKaraoke } from "@/components/story/StoryKaraoke";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getInteractiveStory } from "@/services/stories";
import { storyText, type InteractiveStory } from "@/services/stories/types";

type Stage = "listen" | "understand" | "read" | "tprs";

const STAGES: Stage[] = ["listen", "understand", "read", "tprs"];

const STAGE_LABELS: Record<Stage, { en: string; es: string }> = {
  listen: { en: "Listen", es: "Escucha" },
  understand: { en: "Understand", es: "Entiende" },
  read: { en: "Read aloud", es: "Lee en voz alta" },
  tprs: { en: "Speak", es: "Habla" },
};

export const Route = createFileRoute("/natural-method/story/$storyId")({
  loader: ({ params }) => {
    const story = getInteractiveStory(params.storyId);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.story ? `${loaderData.story.title} · Historia interactiva` : "Historia interactiva";
    const description =
      "Escucha la historia con karaoke, toca cada frase para ver su significado, practica las palabras y cuenta tu propia versión en voz alta.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { story } = Route.useLoaderData();
  const es = useAppLang().lang === "es";
  const [stage, setStage] = useState<Stage>("listen");
  const text = storyText(story);

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/natural-method/audiobooks"
          className="inline-flex h-10 items-center gap-1.5 rounded-2xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {es ? "Audiolibros" : "Audiobooks"}
        </Link>

        <header>
          <h1 className="text-2xl font-extrabold text-foreground">{story.title}</h1>
          <p className="text-sm text-muted-foreground">{es ? story.blurb.es : story.blurb.en}</p>
        </header>

        <nav className="grid grid-cols-4 gap-1.5" aria-label={es ? "Pasos de la historia" : "Story steps"}>
          {STAGES.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setStage(item)}
              aria-current={stage === item ? "step" : undefined}
              className={cn(
                "min-h-[44px] rounded-2xl border px-1 text-[10px] font-bold uppercase leading-tight tracking-[0.08em] transition-colors",
                stage === item ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground",
              )}
            >
              {index + 1}. {es ? STAGE_LABELS[item].es : STAGE_LABELS[item].en}
            </button>
          ))}
        </nav>

        {stage === "listen" ? <ListenStage story={story} text={text} onDone={() => setStage("understand")} /> : null}
        {stage === "understand" ? <UnderstandStage story={story} onDone={() => setStage("read")} /> : null}
        {stage === "read" ? <ReadStage story={story} text={text} onDone={() => setStage("tprs")} /> : null}
        {stage === "tprs" ? <TprsStage story={story} /> : null}
      </div>
    </AppShell>
  );
}

function StageHeading({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3">
      <p className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.12em] text-foreground">
        {icon}
        {title}
      </p>
      <p className="mt-1 text-[13px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function NextButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
    >
      {label}
    </button>
  );
}

function ListenStage({ story, text, onDone }: { story: InteractiveStory; text: string; onDone: () => void }) {
  const es = useAppLang().lang === "es";
  return (
    <section className="space-y-4">
      <StageHeading
        icon={<Ear className="size-4" aria-hidden="true" />}
        title={es ? "1. Escucha la historia" : "1. Listen to the story"}
        hint={
          es
            ? "Sigue la frase resaltada. Baja la velocidad si vas rápido."
            : "Follow the highlighted sentence. Slow it down if it goes too fast."
        }
      />
      <StoryKaraoke lines={story.lines} text={text} voice={story.voice} />
      <NextButton label={es ? "ENTENDER LA HISTORIA →" : "UNDERSTAND THE STORY →"} onClick={onDone} />
    </section>
  );
}

function UnderstandStage({ story, onDone }: { story: InteractiveStory; onDone: () => void }) {
  const es = useAppLang().lang === "es";
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="space-y-4">
      <StageHeading
        icon={<BookOpen className="size-4" aria-hidden="true" />}
        title={es ? "2. Entiende cada frase" : "2. Understand every sentence"}
        hint={
          es
            ? "Toca una frase para ver su significado y tocar palabra por palabra."
            : "Tap a sentence to see its meaning and tap it word by word."
        }
      />

      <ul className="space-y-2">
        {story.lines.map((line) => {
          const isOpen = open === line.id;
          return (
            <li key={line.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : line.id)}
                aria-expanded={isOpen}
                className="w-full px-4 py-3 text-left text-[17px] font-bold leading-snug text-foreground"
              >
                {line.text}
              </button>
              {isOpen ? (
                <div className="space-y-3 border-t border-border bg-secondary/40 px-4 py-3">
                  <p className="text-[14px] font-semibold text-muted-foreground">{line.es}</p>
                  <TappableSentence text={line.text} voice={story.voice} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 rounded-3xl border border-border bg-card p-4">
        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-foreground">
          {es ? "Mi cuaderno de vocabulario" : "My vocabulary notebook"}
        </h2>
        <ul className="space-y-2">
          {story.vocab.map((entry) => (
            <li key={entry.word} className="flex items-start gap-3 rounded-2xl bg-secondary/50 p-3">
              <SpeakButton text={entry.word} showEs={es} />
              <div className="min-w-0">
                <p className="text-[16px] font-extrabold text-foreground">{entry.word}</p>
                <p className="text-[13px] font-semibold text-muted-foreground">{entry.es}</p>
                <p className="mt-1 text-[12px] italic text-muted-foreground">{entry.from}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <NextButton label={es ? "LEER EN VOZ ALTA →" : "READ ALOUD →"} onClick={onDone} />
    </section>
  );
}

function ReadStage({ story, text, onDone }: { story: InteractiveStory; text: string; onDone: () => void }) {
  const es = useAppLang().lang === "es";
  const [recorded, setRecorded] = useState(false);

  return (
    <section className="space-y-4">
      <StageHeading
        icon={<Mic className="size-4" aria-hidden="true" />}
        title={es ? "3. Lee en voz alta" : "3. Read aloud"}
        hint={
          es
            ? "Primero lee junto al audio. Luego grábate leyendo la historia completa."
            : "First read along with the audio. Then record yourself reading the whole story."
        }
      />
      <StoryKaraoke lines={story.lines} text={text} voice={story.voice} />
      <div className="space-y-3 rounded-3xl border border-border bg-card p-4">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {es ? "Grábate leyendo (máx. 90 s)" : "Record your reading (max 90 s)"}
        </p>
        <VoiceRecorder
          label={es ? "GRABAR" : "RECORD"}
          stopLabel={es ? "PARAR" : "STOP"}
          maxSeconds={90}
          countdown
          onComplete={() => setRecorded(true)}
        />
        {recorded ? (
          <p className="flex items-center justify-center gap-2 text-[13px] font-bold text-primary">
            <Check className="size-4" /> {es ? "¡Listo! Puedes repetir o continuar." : "Done! Repeat or continue."}
          </p>
        ) : null}
      </div>
      <NextButton label={es ? "PREGUNTAS Y TU VERSIÓN →" : "QUESTIONS AND YOUR VERSION →"} onClick={onDone} />
    </section>
  );
}

function TprsStage({ story }: { story: InteractiveStory }) {
  const es = useAppLang().lang === "es";
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <section className="space-y-4">
      <StageHeading
        icon={<Sparkles className="size-4" aria-hidden="true" />}
        title={es ? "4. Habla sobre la historia" : "4. Speak about the story"}
        hint={
          es
            ? "Responde en voz alta. Después continúa la historia con tus propias palabras."
            : "Answer out loud. Then continue the story in your own words."
        }
      />

      {story.questions.map((question, index) => (
        <div key={question.id} className="space-y-3 rounded-3xl border border-border bg-card p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {es ? `Pregunta ${index + 1}` : `Question ${index + 1}`}
          </p>
          <p className="text-[18px] font-extrabold leading-snug text-foreground">{question.en}</p>
          <p className="text-[13px] font-semibold text-muted-foreground">{question.es}</p>
          <AudioPlayer text={question.en} label={es ? "ESCUCHAR" : "LISTEN"} size="sm" variant="ghost" voice={story.voice} />
          <VoiceRecorder
            label={es ? "RESPONDER" : "ANSWER"}
            stopLabel={es ? "PARAR" : "STOP"}
            maxSeconds={30}
            countdown
            size="md"
            onComplete={() => setDone((prev) => ({ ...prev, [question.id]: true }))}
          />
          {done[question.id] ? (
            <p className="flex items-center justify-center gap-2 text-[13px] font-bold text-primary">
              <Check className="size-4" /> {es ? "Respondida" : "Answered"}
            </p>
          ) : null}
        </div>
      ))}

      <div className="space-y-3 rounded-3xl bg-navy p-4 text-navy-foreground">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.12em]">
          {es ? "Continúa la historia" : "Continue the story"}
        </p>
        <p className="text-[14px] opacity-90">
          {es
            ? "¿Qué pasa al día siguiente? Cuéntalo en voz alta usando al menos 3 palabras nuevas."
            : "What happens the next day? Tell it out loud using at least 3 new words."}
        </p>
        <ul className="flex flex-wrap gap-2">
          {story.continueWith.map((word) => (
            <li
              key={word}
              className="rounded-full border border-navy-foreground/30 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em]"
            >
              {word}
            </li>
          ))}
        </ul>
        <VoiceRecorder
          label={es ? "GRABAR MI VERSIÓN" : "RECORD MY VERSION"}
          stopLabel={es ? "PARAR" : "STOP"}
          maxSeconds={60}
          countdown
          onComplete={() => setDone((prev) => ({ ...prev, continue: true }))}
        />
        {done["continue"] ? (
          <p className="flex items-center justify-center gap-2 text-[13px] font-bold">
            <Check className="size-4" /> {es ? "¡Excelente trabajo!" : "Great job!"}
          </p>
        ) : null}
      </div>
    </section>
  );
}
