import type { JourneyState, ModuleId } from "@/lib/types";
import { CourseService, UPCOMING_LEVELS, type LearningModule, type UpcomingLevel } from "./course-service";
import { JourneyService } from "./journey-service";

/**
 * The learner ladder: one active module at a time, strictly sequential.
 * Published modules in display order, followed by preview-only levels that
 * exist as locked "UP NEXT" cards until they are built.
 */
export type LadderEntry =
  | { kind: "module"; module: LearningModule }
  | { kind: "upcoming"; level: UpcomingLevel };

export const Progression = {
  ladder(): LadderEntry[] {
    return [
      ...CourseService.modules().map((module) => ({ kind: "module" as const, module })),
      ...UPCOMING_LEVELS.map((level) => ({ kind: "upcoming" as const, level })),
    ];
  },

  /** The module that must be completed before `moduleId` opens (null for the first rung). */
  prerequisiteOf(moduleId: ModuleId): ModuleId | null {
    const modules = CourseService.modules();
    const index = modules.findIndex((m) => m.id === moduleId);
    return index > 0 ? modules[index - 1]!.id : null;
  },

  /**
   * Unlock decision from saved completion data only:
   *  - first module of the ladder;
   *  - the previous module is actually complete;
   *  - at or before the learner's saved placement (existing learners are never moved back);
   *  - already has a completed day (records stay reachable).
   */
  isUnlocked(state: JourneyState, moduleId: ModuleId): boolean {
    return JourneyService.isModuleUnlocked(state, moduleId);
  },

  /** The one module the learner is working on right now (null when the ladder is done). */
  activeModuleId(state: JourneyState): ModuleId | null {
    return JourneyService.nextPractice(state)?.moduleId ?? null;
  },

  /** What comes after a module on the ladder — a real module or a preview level. */
  entryAfter(moduleId: ModuleId): LadderEntry | null {
    const ladder = Progression.ladder();
    const index = ladder.findIndex((e) => e.kind === "module" && e.module.id === moduleId);
    return index >= 0 ? (ladder[index + 1] ?? null) : null;
  },

  /** The locked "UP NEXT" rung directly after the active module. */
  nextInLadder(state: JourneyState): LadderEntry | null {
    const active = Progression.activeModuleId(state);
    return active ? Progression.entryAfter(active) : null;
  },
};
