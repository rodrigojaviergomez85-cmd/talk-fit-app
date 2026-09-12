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

export type NextEpisodeInfo = {
  /** Next produced episode id, or null when the slot is still in production. */
  episodeId: string | null;
  /** Day of the module that unlocks the next slot. */
  day: number;
  /** Preview text for the coming episode. */
  teaser: { en: string; es: string };
  /** Whether the learner can open it now. */
  unlocked: boolean;
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
        episodeId: "vale-who-is-he",
        teaser: { en: "Who is he?", es: "¿Quién es él?" },
      },
      {
        day: 4,
        episodeId: "vale-who-is-d",
        teaser: { en: "Who is D?", es: "¿Quién es D?" },
      },
      {
        day: 5,
        episodeId: "vale-support-team",
        teaser: { en: "The support team", es: "El equipo de soporte" },
      },
      {
        day: 6,
        episodeId: "vale-where-are-you-from",
        teaser: { en: "Where are you from?", es: "¿De dónde eres?" },
      },
      {
        day: 7,
        episodeId: "vale-favorite-color",
        teaser: { en: "My favorite color", es: "Mi color favorito" },
      },
      {
        day: 8,
        episodeId: null,
        teaser: { en: "My favorite food", es: "Mi comida favorita" },
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

/** The slot that follows the current episode, including unlock status. */
export function getNextEpisodeSlot(currentEpisodeId: string, state: JourneyState): NextEpisodeInfo | null {
  const season = STORYBOOK_SEASONS.find((s) => s.slots.some((slot) => slot.episodeId === currentEpisodeId));
  if (!season) return null;
  const idx = season.slots.findIndex((slot) => slot.episodeId === currentEpisodeId);
  if (idx < 0 || idx === season.slots.length - 1) return null;
  const next = season.slots[idx + 1]!;
  return {
    episodeId: next.episodeId,
    day: next.day,
    teaser: next.teaser,
    unlocked: isDayUnlocked(state, season.moduleId, next.day),
  };
}
