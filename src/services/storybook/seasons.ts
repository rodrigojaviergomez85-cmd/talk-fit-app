/**
 * Season map for "El mundo de Vale".
 * A season = a curriculum module. An episode = one day inside that module.
 * Unlocking is derived from the existing journey progress: no new tables.
 */
import type { JourneyState } from "@/lib/types";
import { hasUnlimitedAccess } from "@/lib/unlimited-access";

export type SeasonWeek = 1 | 2 | 3 | 4;

export type SeasonEpisodeSlot = {
  /** Day of the module this episode belongs to (1-based). */
  day: number;
  /** Episode id once produced; null while the episode is still in production. */
  episodeId: string | null;
  /** Shown while the slot has no episode yet. */
  teaser: { en: string; es: string };
};

export type Season = {
  moduleId: string;
  seasonNumber: number;
  title: { en: string; es: string };
  slots: SeasonEpisodeSlot[];
};

export const STORYBOOK_SEASONS: Season[] = [
  {
    moduleId: "basic-zero",
    seasonNumber: 1,
    title: { en: "Season 1 · Vale's world", es: "Temporada 1 · El mundo de Vale" },
    slots: [
      {
        day: 1,
        episodeId: "vale-first-day",
        teaser: { en: "Vale's first day", es: "El primer día de Vale" },
      },
      {
        day: 2,
        episodeId: "vale-first-call",
        teaser: { en: "The first call", es: "La primera llamada" },
      },
      {
        day: 3,
        episodeId: null,
        teaser: { en: "Who is she?", es: "¿Quién es ella?" },
      },
      {
        day: 4,
        episodeId: null,
        teaser: { en: "The photo on her phone", es: "La foto en el celular" },
      },
    ],
  },
];

export function getSeason(moduleId: string): Season | undefined {
  return STORYBOOK_SEASONS.find((season) => season.moduleId === moduleId);
}

/** Days of a module the learner already completed. */
export function completedDaysInModule(state: JourneyState, moduleId: string): number {
  const prefix = `${moduleId}:`;
  return Object.keys(state.days).filter((key) => key.startsWith(prefix)).length;
}

/**
 * Highest story day the learner can open.
 * Day 1 is always open; each completed module day opens the next episode.
 */
export function unlockedDay(completedDays: number): number {
  return Math.max(0, completedDays) + 1;
}

export function isDayUnlocked(state: JourneyState, moduleId: string, day: number): boolean {
  if (hasUnlimitedAccess()) return true;
  return day <= unlockedDay(completedDaysInModule(state, moduleId));
}

/** Week the learner has reached (kept for language-scope checks). */
export function unlockedWeek(completedDays: number): SeasonWeek {
  const week = Math.floor(Math.max(0, completedDays) / 5) + 1;
  return (week > 4 ? 4 : week) as SeasonWeek;
}
