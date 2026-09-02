import type { CourseDay, ModuleId } from "@/lib/types";
import { MODULE_INDEX, isModuleId, type LearningModule, type DayOutline } from "./course-index";

export {
  DEFAULT_MODULE,
  UPCOMING_LEVELS,
  isModuleId,
  type LearningModule,
  type UpcomingLevel,
  type DayOutline,
  type WeekOutline,
} from "./course-index";

/**
 * CourseService
 *
 * Two layers:
 *  - SYNC metadata (modules, order, totals, week structure, per-day outline)
 *    backed by the small static course index — always loaded.
 *  - ASYNC full content (`loadModule`) — one dynamic import per module, cached
 *    in memory for the session so revisiting a module is instant.
 *
 * Nothing in this file imports a curriculum file statically.
 */

/** A module with its full day content (lines, prompts, role plays, images). */
export type LoadedModule = Omit<LearningModule, "days"> & { days: CourseDay[] };

export class ModuleNotFoundError extends Error {
  constructor(readonly moduleId: string) {
    super(`Unknown module: ${moduleId}`);
    this.name = "ModuleNotFoundError";
  }
}

/* ------------------------------------------------------------------ */
/* Dynamic content loading                                             */
/* ------------------------------------------------------------------ */

async function importDays(moduleId: ModuleId): Promise<CourseDay[]> {
  switch (moduleId) {
    case "basic-zero":
      return (await import("./basic-zero-course")).BASIC_ZERO_DAYS;
    case "simple-future":
      return (await import("./simple-future-course")).SIMPLE_FUTURE_DAYS;
    case "simple-present":
      return (await import("./simple-present-course")).SIMPLE_PRESENT_DAYS;
    case "past-stories":
      return (await import("./past-stories-course")).PAST_STORIES_DAYS;
    case "mixed-tenses":
      return (await import("./mixed-tenses-course")).MIXED_TENSES_DAYS;
    case "eagles-week-1": {
      const [w1, w24] = await Promise.all([import("./eagles-week-1-course"), import("./eagles-weeks-2-4-course")]);
      return [...w1.EAGLES_WEEK_1_DAYS, ...w24.EAGLES_WEEKS_2_4_DAYS];
    }
    case "tigers": {
      const [w1, w24] = await Promise.all([import("./tigers-week-1-course"), import("./tigers-weeks-2-4-course")]);
      return [...w1.TIGERS_WEEK_1_DAYS, ...w24.TIGERS_WEEKS_2_4_DAYS];
    }
    case "sharks": {
      const [w1, w24] = await Promise.all([import("./sharks-week-1-course"), import("./sharks-weeks-2-4-course")]);
      return [...w1.SHARKS_WEEK_1_DAYS, ...w24.SHARKS_WEEKS_2_4_DAYS];
    }
    case "advanced-1": {
      const [w1, w24] = await Promise.all([import("./advanced-1-course"), import("./advanced-1-weeks-2-4-course")]);
      return [...w1.ADVANCED_1_WEEK_1_DAYS, ...w24.ADVANCED_1_WEEKS_2_4_DAYS];
    }
    default: {
      const never: never = moduleId;
      throw new ModuleNotFoundError(String(never));
    }
  }
}

/** Session cache. The in-flight promise is cached so concurrent callers share one import. */
const cache = new Map<ModuleId, Promise<LoadedModule>>();
const loaded = new Map<ModuleId, LoadedModule>();
const listeners = new Set<() => void>();

function notify() {
  for (const fn of listeners) fn();
}

function findModule(moduleId: ModuleId): LearningModule {
  const module = MODULE_INDEX.find((m) => m.id === moduleId);
  if (!module) throw new ModuleNotFoundError(moduleId);
  return module;
}

export const CourseService = {
  /* ---------------- SYNC metadata (static index) ---------------- */

  /** Modules in visual journey order (presentation only). */
  modules(): LearningModule[] {
    return [...MODULE_INDEX].sort((a, b) => a.order - b.order);
  },

  /** Visual position of a module in the journey (1-based). */
  displayIndex(moduleId: ModuleId): number {
    return findModule(moduleId).order;
  },

  /** Module metadata + day outline. Throws for unknown ids — never falls back silently. */
  getModule(moduleId: ModuleId): LearningModule {
    return findModule(moduleId);
  },

  totalDays(moduleId: ModuleId): number {
    return findModule(moduleId).days.length;
  },

  /**
   * Total days across every published module (Home / Account / Progress).
   * Computed dynamically; upcoming preview levels have no days and never count.
   */
  totalDaysAll(): number {
    return MODULE_INDEX.reduce((sum, m) => sum + m.days.length, 0);
  },

  /** Day outlines (metadata only). */
  getDays(moduleId: ModuleId): DayOutline[] {
    return findModule(moduleId).days;
  },

  /** Day outline (metadata only). Out-of-range day numbers clamp to Day 1, as before. */
  getDay(moduleId: ModuleId, day: number): DayOutline {
    const days = CourseService.getDays(moduleId);
    return days.find((d) => d.day === day) ?? days[0]!;
  },

  /* ---------------- ASYNC full content (dynamic import) ---------------- */

  /**
   * Loads a module's full content. First call fetches that module's chunk;
   * later calls (and concurrent calls) reuse the same promise. A failed load is
   * evicted so a retry imports again.
   */
  loadModule(moduleId: ModuleId): Promise<LoadedModule> {
    if (!isModuleId(moduleId)) return Promise.reject(new ModuleNotFoundError(String(moduleId)));
    const hit = cache.get(moduleId);
    if (hit) return hit;
    const meta = findModule(moduleId);
    const promise = importDays(moduleId)
      .then((days) => {
        const full: LoadedModule = { ...meta, days };
        loaded.set(moduleId, full);
        notify();
        return full;
      })
      .catch((error: unknown) => {
        cache.delete(moduleId);
        throw error;
      });
    cache.set(moduleId, promise);
    return promise;
  },

  /** Cached full module, or null when it has not finished loading in this session. */
  peekModule(moduleId: ModuleId): LoadedModule | null {
    return loaded.get(moduleId) ?? null;
  },

  /** Subscribe to cache changes (for useSyncExternalStore). */
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  /** Full day from a loaded module. Out-of-range day numbers clamp to Day 1, as before. */
  dayOf(module: LoadedModule, day: number): CourseDay {
    return module.days.find((d) => d.day === day) ?? module.days[0]!;
  },

  /* ---------------- Pure helpers ---------------- */

  /** Full model text for the day (used by the model voice). */
  getModelText(day: CourseDay): string {
    return day.lines.map((l) => l.text).join(" ");
  },

  /**
   * Applies one prewritten scenario from the day's bank (TIGERS FINAL) to the
   * Rep 5 fields. Days without a bank are returned untouched.
   */
  withScenario(day: CourseDay, scenarioId: string | null): CourseDay {
    const scenario = day.rep5Scenarios?.find((s) => s.id === scenarioId) ?? day.rep5Scenarios?.[0];
    if (!scenario) return day;
    return { ...day, rep5Prompt: scenario.rep5Prompt, rep5Turns: scenario.rep5Turns, rep5Scenario: scenario };
  },
};
