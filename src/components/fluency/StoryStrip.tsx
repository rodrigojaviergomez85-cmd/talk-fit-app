import { VisualSequence } from "./VisualSequence";
import type { CourseDay } from "@/lib/types";

/** Ordered story illustrations with sequencing cues (Module 3, Week 4). */
export function StoryStrip({ day, showCaptions = true }: { day: CourseDay; showCaptions?: boolean }) {
  const panels = day.storyPanels;
  if (!panels?.length) return null;
  return (
    <VisualSequence
      steps={panels.map((panel) => ({
        id: panel.id,
        cue: panel.cue,
        src: panel.src,
        alt: panel.alt,
        caption: panel.caption,
        captionEs: panel.captionEs,
      }))}
      showCaptions={showCaptions}
    />
  );
}
