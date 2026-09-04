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

/** How much pre-teaching the Step 0 intro shows before START REP 1. Layout only. */
export type IntroTier = "basic-low" | "basic-high" | "eagles" | "spontaneous" | "advanced";

export function introTier(moduleId: ModuleId): IntroTier {
  switch (moduleId) {
    case "basic-zero":
    case "simple-future":
    case "simple-present":
      return "basic-low";
    case "past-stories":
    case "mixed-tenses":
      return "basic-high";
    case "eagles-week-1":
      return "eagles";
    case "tigers":
    case "sharks":
      return "spontaneous";
    case "advanced-1":
      return "advanced";
  }
}

/** Max intro examples visible above the START button. */
export function introExampleLimit(tier: IntroTier): number {
  return tier === "basic-low" ? 3 : tier === "basic-high" ? 2 : 0;
}

/** The picture is the task (describe what's happening) — keep it above the button. */
export function introImageIsEssential(day: CourseDay, tier: IntroTier): boolean {
  if (!day.sceneImage) return false;
  if (tier !== "basic-low" && tier !== "basic-high") return false;
  return /progressive/i.test(`${day.focus} ${day.weekTitle ?? ""}`);
}
