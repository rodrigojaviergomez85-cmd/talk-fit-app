import { Target, RotateCcw, Heart, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { TranslatableText } from "@/components/fluency/TranslatableText";

/**
 * Step 0 — Simple Present intro & objective.
 * Rendered both as its own route and as the first step of the practice flow.
 */
export function IntroStep({
  showSpanish,
  onStart,
}: {
  showSpanish: boolean;
  onStart: () => void;
}) {
  return (
    <>
      <section className="mb-8 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-primary">
          {showSpanish ? "MÓDULO 1" : "MODULE 1"}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight">
          {showSpanish ? "PASO 0 — PRESENTE SIMPLE" : "STEP 0 — SIMPLE PRESENT"}
        </h1>
        <p className="mt-2 text-base font-semibold text-muted-foreground">
          {showSpanish
            ? 'Habla de tu día a día usando "I".'
            : 'Talk about your daily life using "I".'}
        </p>
      </section>

      <ObjectiveCard />

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
          {showSpanish ? "Ejemplos" : "Examples"}
        </h2>
        <div className="space-y-3">
          <ExampleCard
            en={{ before: "", subject: "I", mid: " ", verb: "work", after: " every day." }}
            es="Yo trabajo todos los días."
          />
          <ExampleCard
            en={{
              before: "",
              subject: "I",
              mid: " ",
              verb: "play",
              after: " soccer every weekend.",
            }}
            es="Yo juego fútbol todos los fines de semana."
          />
          <ExampleCard
            en={{
              before: "",
              subject: "I",
              mid: " ",
              verb: "study",
              after: " English at night.",
            }}
            es="Yo estudio inglés por la noche."
          />
          <ExampleCard
            en={{
              before: "",
              subject: "I",
              mid: " ",
              verb: "drink",
              after: " coffee in the morning.",
            }}
            es="Yo tomo café por la mañana."
          />
        </div>
      </section>

      <EasyRuleCard />

      <MissionCard />

      <button
        type="button"
        onClick={onStart}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-5 text-lg font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
      >
        {showSpanish ? "VAMOS A PRACTICAR" : "LET'S PRACTICE"}
        <ArrowRight className="size-5" />
      </button>
    </>
  );
}

function ObjectiveCard() {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Target className="size-5" />
        </span>
        <h2 className="text-lg font-extrabold">
          <TranslatableText es="Tu objetivo">Your Goal</TranslatableText>
        </h2>
      </div>

      <p className="mt-3 text-[15px] leading-relaxed">
        <TranslatableText es="En este módulo aprenderás a usar el Presente Simple con 'I'.">
          In this module, you will learn how to use the Simple Present with "I".
        </TranslatableText>
      </p>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        <TranslatableText es="Usa el Presente Simple para hablar de:">
          Use Simple Present to talk about:
        </TranslatableText>
      </p>

      <div className="mt-3 space-y-3">
        <GoalItem
          icon={<RotateCcw className="size-5" />}
          title={<TranslatableText es="Rutinas">Routines</TranslatableText>}
          description={
            <TranslatableText es="Cosas que haces normalmente.">Things you normally do.</TranslatableText>
          }
        />
        <GoalItem
          icon={<Heart className="size-5" />}
          title={<TranslatableText es="Hábitos">Habits</TranslatableText>}
          description={
            <TranslatableText es="Cosas que haces frecuentemente.">
              Things you do frequently.
            </TranslatableText>
          }
        />
        <GoalItem
          icon={<Sparkles className="size-5" />}
          title={<TranslatableText es="Tu día a día">Your daily life</TranslatableText>}
          description={
            <TranslatableText es="Cosas que haces, te gustan, comes, estudias o juegas.">
              Things you do, like, eat, study, or play.
            </TranslatableText>
          }
        />
      </div>
    </section>
  );
}

function GoalItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-accent-foreground">
        {icon}
      </span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

type ExampleParts = {
  before: string;
  subject: string;
  mid: string;
  verb: string;
  after: string;
};

function ExampleCard({ en, es }: { en: ExampleParts; es: string }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
      <p className="text-lg font-bold leading-snug">
        {en.before}
        <span className="text-primary">{en.subject}</span>
        {en.mid}
        <span className="text-accent-foreground">{en.verb}</span>
        {en.after}
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground">{es}</p>
    </div>
  );
}

function EasyRuleCard() {
  const pairs = [
    { en: "I work.", es: "Yo trabajo." },
    { en: "I study.", es: "Yo estudio." },
    { en: "I play.", es: "Yo juego." },
    { en: "I eat.", es: "Yo como." },
  ];

  return (
    <section className="mt-6 rounded-3xl bg-navy p-5 text-navy-foreground">
      <h2 className="text-center text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
        <TranslatableText es="Regla fácil">Easy Rule</TranslatableText>
      </h2>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white/10 py-5 text-center">
        <span className="text-2xl font-black text-primary">I</span>
        <span className="text-2xl font-black text-navy-foreground/70">+</span>
        <span className="text-2xl font-black text-accent-foreground">VERB</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {pairs.map((pair) => (
          <div key={pair.en} className="rounded-xl bg-white/8 p-3 text-center">
            <p className="text-[15px] font-bold">{pair.en}</p>
            <p className="mt-1 text-[13px] text-navy-foreground/70">{pair.es}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[15px] font-semibold leading-snug">
        <TranslatableText es="Con 'I', usa el verbo en su forma normal.">
          With "I", use the verb in its normal form.
        </TranslatableText>
      </p>
    </section>
  );
}

function MissionCard() {
  return (
    <section className="mt-6 rounded-3xl border-2 border-primary/20 bg-primary/8 p-5">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Rocket className="size-5" />
        </span>
        <h2 className="text-lg font-extrabold">
          <TranslatableText es="Tu misión">Your Mission</TranslatableText>
        </h2>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed">
        <TranslatableText es="Al final de este módulo, podrás hablar durante 35–45 segundos sobre tu rutina usando 7–10 oraciones en inglés.">
          By the end of this module, you will be able to speak for 35–45 seconds about your
          routine using 7–10 sentences in English.
        </TranslatableText>
      </p>
    </section>
  );
}
