import { TranslatableText } from "./TranslatableText";
import type { CourseDay } from "@/lib/types";

/** Ordered story illustrations with sequencing cues (Module 3, Week 4). */
export function StoryStrip({ day, showCaptions = true }: { day: CourseDay; showCaptions?: boolean }) {
  const panels = day.storyPanels;
  if (!panels?.length) return null;
  return (
    <div className="space-y-3">
      <TranslatableText es="LA HISTORIA EN ORDEN" align="center">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          The story in order
        </p>
      </TranslatableText>
      <div className="grid gap-3 sm:grid-cols-2">
        {panels.map((panel, index) => (
          <figure
            key={panel.id}
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <img src={panel.src} alt={panel.alt} width={1024} height={768} loading="lazy" className="w-full" />
            <figcaption className="space-y-1 p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                {index + 1}. {panel.cue}
              </p>
              {showCaptions && panel.caption ? (
                <>
                  <p className="text-[15px] font-extrabold leading-snug">{panel.caption}</p>
                  {panel.captionEs ? (
                    <p className="text-[12px] font-semibold text-muted-foreground">{panel.captionEs}</p>
                  ) : null}
                </>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
