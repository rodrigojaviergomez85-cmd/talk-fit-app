/**
 * Server-side view of which story belongs to which curriculum day, and how
 * far the learner must really get inside it.
 *
 * Asset-free on purpose: the season map imports episode artwork and
 * localStorage-backed progress helpers, so it cannot be used inside server
 * functions. `league-manifest.test.ts` keeps this table in sync with the real
 * episodes (ids and scene counts).
 */

export type LeagueStorySlot = {
  day: number;
  episodeId: string;
  /** Furthest slide index the learner must have reached (cover + all scenes). */
  minSceneIndex: number;
};

export type LeagueCohort = {
  moduleId: string;
  curriculumWeek: number;
  stories: LeagueStorySlot[];
};

/** Pilot: Basic Zero, curriculum week 1 (days 1–5). Mirrored in `league_pilot_cohorts`. */
export const LEAGUE_COHORTS: LeagueCohort[] = [
  {
    moduleId: "basic-zero",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "vale-first-day", minSceneIndex: 11 },
      { day: 2, episodeId: "vale-first-call", minSceneIndex: 10 },
      { day: 3, episodeId: "vale-who-is-he", minSceneIndex: 11 },
      { day: 4, episodeId: "vale-who-is-d", minSceneIndex: 10 },
      { day: 5, episodeId: "vale-support-team", minSceneIndex: 10 },
    ],
  },
];

export function getLeagueCohort(moduleId: string, curriculumWeek: number): LeagueCohort | undefined {
  return LEAGUE_COHORTS.find((c) => c.moduleId === moduleId && c.curriculumWeek === curriculumWeek);
}

export function isLeagueCohort(moduleId: string, curriculumWeek: number): boolean {
  return Boolean(getLeagueCohort(moduleId, curriculumWeek));
}

export function getStorySlot(moduleId: string, day: number): LeagueStorySlot | undefined {
  const week = Math.max(1, Math.ceil(day / 5));
  return getLeagueCohort(moduleId, week)?.stories.find((s) => s.day === day);
}
