/**
 * Season map for "El mundo de Vale".
 * A season = a curriculum module. An episode = a week inside that module.
 * Unlocking is derived from the existing journey progress: no new tables.
 */
import type { JourneyState } from "@/lib/types";

export type SeasonWeek = 1 | 2 | 3 | 4;

export type SeasonEpisodeSlot = {
  week: SeasonWeek;
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
        week: 1,
        episodeId: "vale-first-day",
        teaser: { en: "Vale's first day", es: "El primer día de Vale" },
      },
      {
        week: 2,
        episodeId: "vale-first-call",
        teaser: { en: "The first call", es: "La primera llamada" },
      },
      {
        week: 3,
        episodeId: null,
        teaser: { en: "Who is she?", es: "¿Quién es ella?" },
      },
      {
        week: 4,
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
 * Highest story week the learner has reached.
 * Week 1 is always open; each block of 5 completed days opens the next week.
 */
export function unlockedWeek(completedDays: number): SeasonWeek {
  const week = Math.floor(Math.max(0, completedDays) / 5) + 1;
  return (week > 4 ? 4 : week) as SeasonWeek;
}

export function isWeekUnlocked(state: JourneyState, moduleId: string, week: SeasonWeek): boolean {
  return week <= unlockedWeek(completedDaysInModule(state, moduleId));
}
