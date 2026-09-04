import type { CourseDay, ModuleId } from "@/lib/types";

/** How much Rep 5 support is visible before the first speaking action. Layout only. */
export type Rep5Tier = "basic" | "eagles" | "spontaneous" | "advanced";

export function rep5Tier(moduleId: ModuleId): Rep5Tier {
  switch (moduleId) {
    case "eagles-week-1":
      return "eagles";
    case "tigers":
    case "sharks":
      return "spontaneous";
    case "advanced-1":
      return "advanced";
    default:
      return "basic";
  }
}

/**
 * The single visual allowed above the microphone. Story sequences win because
 * they are needed to tell the story; a scene image is the fallback. Higher tiers
 * keep every visual inside Help.
 */
export function primaryVisual(day: CourseDay, tier: Rep5Tier): "story" | "scene" | null {
  if (tier !== "basic") return null;
  if (day.storyPanels?.length) return "story";
  if (day.sceneImage) return "scene";
  return null;
}
