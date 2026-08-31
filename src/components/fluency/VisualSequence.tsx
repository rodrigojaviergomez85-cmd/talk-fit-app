import { cn } from "@/lib/utils";
import { useSpanishAll } from "./TranslatableText";

export type SequenceStep = {
  id: string;
  /** Sequencing cue: FIRST, THEN, NEXT… */
  cue: string;
  src?: string | undefined;
  alt?: string | undefined;
  caption?: string | undefined;
  captionEs?: string | undefined;
};

type Props = {
  steps: SequenceStep[];
  /** Show the written caption under each step. */
  showCaptions?: boolean;
  title?: string;
  titleEs?: string;
  className?: string;
};

/**
 * Ordered, image-first sequence for process and story lessons.
 * Horizontally scrollable on mobile, grid on wider screens.
 */
export function VisualSequence({
  steps,
  showCaptions = true,
  title = "The story in order",
  titleEs = "La historia en orden",
  className,
}: Props) {
  const es = useSpanishAll();
  if (!steps.length) return null;

  return (
    <section className={cn("space-y-3", className)} aria-label={title}>
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {es ? titleEs : title}
      </p>
      <ol className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="w-[78vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] sm:w-auto sm:max-w-none"
          >
            {step.src ? (
              <img
                src={step.src}
                alt={step.alt ?? step.caption ?? step.cue}
                width={1024}
                height={768}
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            ) : null}
            <div className="space-y-1 p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                {index + 1}. {step.cue}
              </p>
              {showCaptions && step.caption ? (
                <>
                  <p className="text-[15px] font-extrabold leading-snug">{step.caption}</p>
                  {es && step.captionEs ? (
                    <p className="text-[12px] font-semibold text-muted-foreground">{step.captionEs}</p>
                  ) : null}
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
