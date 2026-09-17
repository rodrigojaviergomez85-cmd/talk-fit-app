/**
 * Server-side view of which story belongs to which curriculum day, and how
 * far the learner must really get inside it.
 *
 * Asset-free on purpose: the season map imports episode artwork and
 * localStorage-backed progress helpers, so it cannot be used inside server
 * functions. `league.test.ts` keeps this table in sync with the real
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
  /**
   * Published story episodes of this week. Empty when the module has no
   * season yet (Advanced 2 and 3): those weeks compete with the daily audios
   * only, and the weekly goal drops accordingly.
   */
  stories: LeagueStorySlot[];
};

/** Every module and curriculum week competes. Mirrored in `league_pilot_cohorts`. */
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
  {
    moduleId: "basic-zero",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "vale-where-are-you-from", minSceneIndex: 10 },
      { day: 7, episodeId: "vale-favorite-color", minSceneIndex: 10 },
      { day: 8, episodeId: "vale-favorite-food", minSceneIndex: 10 },
      { day: 9, episodeId: "vale-hobbies", minSceneIndex: 10 },
      { day: 10, episodeId: "vale-complete-introduction", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "basic-zero",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "vale-meet-luis", minSceneIndex: 10 },
      { day: 12, episodeId: "vale-best-friend", minSceneIndex: 10 },
      { day: 13, episodeId: "vale-new-supervisor", minSceneIndex: 10 },
      { day: 14, episodeId: "vale-dylan-needs-help", minSceneIndex: 10 },
      { day: 15, episodeId: "vale-we-are-a-team", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "basic-zero",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "vale-luis-big-day", minSceneIndex: 10 },
      { day: 17, episodeId: "vale-good-news", minSceneIndex: 10 },
      { day: 18, episodeId: "vale-first-month", minSceneIndex: 10 },
      { day: 19, episodeId: "vale-celebration", minSceneIndex: 10 },
      { day: 20, episodeId: "vale-graduation", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "simple-future",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "vale-s2-ready", minSceneIndex: 10 },
      { day: 2, episodeId: "vale-s2-tomorrow", minSceneIndex: 10 },
      { day: 3, episodeId: "vale-s2-weekend", minSceneIndex: 10 },
      { day: 4, episodeId: "vale-s2-bigger-dream", minSceneIndex: 10 },
      { day: 5, episodeId: "vale-s2-my-voice", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "simple-future",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "vale-s2-mateo-weekend", minSceneIndex: 10 },
      { day: 7, episodeId: "vale-s2-his-mom", minSceneIndex: 10 },
      { day: 8, episodeId: "vale-s2-busiest", minSceneIndex: 10 },
      { day: 9, episodeId: "vale-s2-two-plans", minSceneIndex: 10 },
      { day: 10, episodeId: "vale-s2-their-plans", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "simple-future",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "vale-s2-instant-decision", minSceneIndex: 10 },
      { day: 12, episodeId: "vale-s2-promise", minSceneIndex: 10 },
      { day: 13, episodeId: "vale-s2-prediction", minSceneIndex: 10 },
      { day: 14, episodeId: "vale-s2-their-future", minSceneIndex: 10 },
      { day: 15, episodeId: "vale-s2-will-challenge", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "simple-future",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "vale-s2-plan-vs-decision", minSceneIndex: 10 },
      { day: 17, episodeId: "vale-s2-weekend-changes", minSceneIndex: 10 },
      { day: 18, episodeId: "vale-s2-camila-future", minSceneIndex: 10 },
      { day: 19, episodeId: "vale-s2-visible-predictions", minSceneIndex: 10 },
      { day: 20, episodeId: "vale-s2-final-fluency", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "simple-present",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "vale-s3-new-schedule", minSceneIndex: 10 },
      { day: 2, episodeId: "vale-s3-kats-routine", minSceneIndex: 10 },
      { day: 3, episodeId: "vale-s3-team-rules", minSceneIndex: 10 },
      { day: 4, episodeId: "vale-s3-angry-customer", minSceneIndex: 10 },
      { day: 5, episodeId: "vale-s3-team-challenge", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "simple-present",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "vale-s3-moms-routine", minSceneIndex: 10 },
      { day: 7, episodeId: "vale-s3-mateo-trains", minSceneIndex: 10 },
      { day: 8, episodeId: "vale-s3-neighborhood-hero", minSceneIndex: 10 },
      { day: 9, episodeId: "vale-s3-ana-rehearses", minSceneIndex: 10 },
      { day: 10, episodeId: "vale-s3-routine-challenge", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "simple-present",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "vale-s3-new-app", minSceneIndex: 10 },
      { day: 12, episodeId: "vale-s3-pizza-day", minSceneIndex: 10 },
      { day: 13, episodeId: "vale-s3-order-food", minSceneIndex: 10 },
      { day: 14, episodeId: "vale-s3-mateos-sandwich", minSceneIndex: 10 },
      { day: 15, episodeId: "vale-s3-process-challenge", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "simple-present",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "vale-s3-free-saturday", minSceneIndex: 10 },
      { day: 17, episodeId: "vale-s3-beach-day", minSceneIndex: 10 },
      { day: 18, episodeId: "vale-s3-office-now", minSceneIndex: 10 },
      { day: 19, episodeId: "vale-s3-home-tonight", minSceneIndex: 10 },
      { day: 20, episodeId: "vale-s3-first-class", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "past-stories",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "vale-s4-yesterday-morning", minSceneIndex: 10 },
      { day: 2, episodeId: "vale-s4-work-yesterday", minSceneIndex: 10 },
      { day: 3, episodeId: "vale-s4-after-work", minSceneIndex: 10 },
      { day: 4, episodeId: "vale-s4-how-was-your-day", minSceneIndex: 10 },
      { day: 5, episodeId: "vale-s4-yesterday-challenge", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "past-stories",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "vale-s4-first-saturday", minSceneIndex: 12 },
      { day: 7, episodeId: "vale-s4-kats-day-off", minSceneIndex: 12 },
      { day: 8, episodeId: "vale-s4-mateo-forgot", minSceneIndex: 12 },
      { day: 9, episodeId: "vale-s4-luis-questions", minSceneIndex: 12 },
      { day: 10, episodeId: "vale-s4-week2-challenge", minSceneIndex: 12 },
    ],
  },
  {
    moduleId: "past-stories",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "vale-s4-what-was-happening", minSceneIndex: 12 },
      { day: 12, episodeId: "vale-s4-eight-last-night", minSceneIndex: 12 },
      { day: 13, episodeId: "vale-s4-while-teaching", minSceneIndex: 12 },
      { day: 14, episodeId: "vale-s4-interrupted-plan", minSceneIndex: 12 },
      { day: 15, episodeId: "vale-s4-progressive-challenge", minSceneIndex: 12 },
    ],
  },
  {
    moduleId: "past-stories",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "vale-s4-once-upon-a-time", minSceneIndex: 12 },
      { day: 17, episodeId: "vale-s4-forest-wolf", minSceneIndex: 12 },
      { day: 18, episodeId: "vale-s4-red-riding-hood", minSceneIndex: 12 },
      { day: 19, episodeId: "vale-s4-vale-story", minSceneIndex: 12 },
      { day: 20, episodeId: "vale-s4-storyteller", minSceneIndex: 12 },
    ],
  },
  {
    moduleId: "mixed-tenses",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "vale-s5-first-students", minSceneIndex: 10 },
      { day: 2, episodeId: "vale-s5-tired-teacher", minSceneIndex: 10 },
      { day: 3, episodeId: "vale-s5-early-morning", minSceneIndex: 10 },
      { day: 4, episodeId: "vale-s5-win-tomorrow", minSceneIndex: 10 },
      { day: 5, episodeId: "vale-s5-healthy-snacks", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "mixed-tenses",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "vale-s5-mateo-runs", minSceneIndex: 10 },
      { day: 7, episodeId: "vale-s5-water-bottle", minSceneIndex: 10 },
      { day: 8, episodeId: "vale-s5-sleepy-student", minSceneIndex: 10 },
      { day: 9, episodeId: "vale-s5-real-lunch", minSceneIndex: 10 },
      { day: 10, episodeId: "vale-s5-mentor-book", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "mixed-tenses",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "vale-s5-ai-helper", minSceneIndex: 10 },
      { day: 12, episodeId: "vale-s5-missing-student", minSceneIndex: 10 },
      { day: 13, episodeId: "vale-s5-five-quiet-minutes", minSceneIndex: 10 },
      { day: 14, episodeId: "vale-s5-hard-month", minSceneIndex: 10 },
      { day: 15, episodeId: "vale-s5-knock-on-the-door", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "mixed-tenses",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "vale-s5-danis-interview", minSceneIndex: 10 },
      { day: 17, episodeId: "vale-s5-try-again", minSceneIndex: 10 },
      { day: 18, episodeId: "vale-s5-first-employee", minSceneIndex: 10 },
      { day: 19, episodeId: "vale-s5-the-company-call", minSceneIndex: 10 },
      { day: 20, episodeId: "vale-s5-the-promise", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "eagles-week-1",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "eagles-ep1-the-offer", minSceneIndex: 11 },
      { day: 2, episodeId: "eagles-ep2-the-proposal", minSceneIndex: 10 },
      { day: 3, episodeId: "eagles-ep3-the-competitor", minSceneIndex: 10 },
      { day: 4, episodeId: "eagles-ep4-the-objection", minSceneIndex: 10 },
      { day: 5, episodeId: "eagles-ep5-what-would-you-do", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "eagles-week-1",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "eagles-ep6-then-and-now", minSceneIndex: 10 },
      { day: 7, episodeId: "eagles-ep7-have-you-ever", minSceneIndex: 10 },
      { day: 8, episodeId: "eagles-ep8-how-long", minSceneIndex: 10 },
      { day: 9, episodeId: "eagles-ep9-the-complaint", minSceneIndex: 10 },
      { day: 10, episodeId: "eagles-ep10-two-hours", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "eagles-week-1",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "eagles-ep11-i-used-to", minSceneIndex: 10 },
      { day: 12, episodeId: "eagles-ep12-which-is-better", minSceneIndex: 10 },
      { day: 13, episodeId: "eagles-ep13-online-or-in-person", minSceneIndex: 10 },
      { day: 14, episodeId: "eagles-ep14-the-best-plan", minSceneIndex: 10 },
      { day: 15, episodeId: "eagles-ep15-a-great-teacher", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "eagles-week-1",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "eagles-ep16-another-country", minSceneIndex: 10 },
      { day: 17, episodeId: "eagles-ep17-so-far-so-good", minSceneIndex: 10 },
      { day: 18, episodeId: "eagles-ep18-danis-long-road", minSceneIndex: 10 },
      { day: 19, episodeId: "eagles-ep19-the-angry-director", minSceneIndex: 10 },
      { day: 20, episodeId: "eagles-ep20-the-contract", minSceneIndex: 10 },
    ],
  },
  {
    moduleId: "tigers",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "tigers-ep1-a-decision-i-made", minSceneIndex: 11 },
      { day: 2, episodeId: "tigers-ep2-what-could-happen", minSceneIndex: 11 },
      { day: 3, episodeId: "tigers-ep3-give-advice", minSceneIndex: 11 },
      { day: 4, episodeId: "tigers-ep4-what-needs-to-change", minSceneIndex: 11 },
      { day: 5, episodeId: "tigers-ep5-what-would-you-do", minSceneIndex: 11 },
    ],
  },
  {
    moduleId: "tigers",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "tigers-ep6-then-vs-now", minSceneIndex: 11 },
      { day: 7, episodeId: "tigers-ep7-your-experience", minSceneIndex: 11 },
      { day: 8, episodeId: "tigers-ep8-working-on", minSceneIndex: 11 },
      { day: 9, episodeId: "tigers-ep9-why-are-you-ready", minSceneIndex: 11 },
      { day: 10, episodeId: "tigers-ep10-interview-challenge", minSceneIndex: 11 },
    ],
  },
  {
    moduleId: "tigers",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "tigers-ep11-the-old-days", minSceneIndex: 11 },
      { day: 12, episodeId: "tigers-ep12-smaller-but-better", minSceneIndex: 11 },
      { day: 13, episodeId: "tigers-ep13-the-best-of-the-city", minSceneIndex: 11 },
      { day: 14, episodeId: "tigers-ep14-the-phone-never-stops", minSceneIndex: 11 },
      { day: 15, episodeId: "tigers-ep15-last-offer", minSceneIndex: 11 },
    ],
  },
  {
    moduleId: "tigers",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "tigers-ep16-what-we-have-achieved", minSceneIndex: 11 },
      { day: 17, episodeId: "tigers-ep17-the-visit", minSceneIndex: 11 },
      { day: 18, episodeId: "tigers-ep18-the-vote", minSceneIndex: 11 },
      { day: 19, episodeId: "tigers-ep19-new-leaders", minSceneIndex: 11 },
      { day: 20, episodeId: "tigers-ep20-defend-your-decision", minSceneIndex: 11 },
    ],
  },
  {
    moduleId: "sharks",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "sharks-ep1-tell-the-story", minSceneIndex: 11 },
      { day: 2, episodeId: "sharks-ep2-guatemala-seven-am", minSceneIndex: 11 },
      { day: 3, episodeId: "sharks-ep3-first-dollar-contract", minSceneIndex: 11 },
      { day: 4, episodeId: "sharks-ep4-three-offices-one-team", minSceneIndex: 11 },
      { day: 5, episodeId: "sharks-ep5-counter-offer", minSceneIndex: 11 },
    ],
  },
  {
    moduleId: "sharks",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "sharks-ep6-hiring-across-borders", minSceneIndex: 11 },
      { day: 7, episodeId: "sharks-ep7-quality-at-scale", minSceneIndex: 11 },
      { day: 8, episodeId: "sharks-ep8-vale-kids", minSceneIndex: 11 },
      { day: 9, episodeId: "sharks-ep9-mexico-call", minSceneIndex: 11 },
      { day: 10, episodeId: "sharks-ep10-partner-or-rival", minSceneIndex: 11 },
    ],
  },
  {
    moduleId: "sharks",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "sharks-ep11-what-went-wrong", minSceneIndex: 11 },
      { day: 12, episodeId: "sharks-ep12-say-it-in-numbers", minSceneIndex: 11 },
      { day: 13, episodeId: "sharks-ep13-the-hard-negotiation", minSceneIndex: 11 },
      { day: 14, episodeId: "sharks-ep14-losing-a-client", minSceneIndex: 11 },
      { day: 15, episodeId: "sharks-ep15-winning-it-back", minSceneIndex: 11 },
    ],
  },
  {
    moduleId: "sharks",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "sharks-ep16-a-team-in-three-countries", minSceneIndex: 11 },
      { day: 17, episodeId: "sharks-ep17-the-investor", minSceneIndex: 11 },
      { day: 18, episodeId: "sharks-ep18-say-no-with-respect", minSceneIndex: 11 },
      { day: 19, episodeId: "sharks-ep19-the-regional-deal", minSceneIndex: 11 },
      { day: 20, episodeId: "sharks-ep20-sharks-close-deals", minSceneIndex: 11 },
    ],
  },
  {
    moduleId: "advanced-1",
    curriculumWeek: 1,
    stories: [
      { day: 1, episodeId: "advanced1-ep1-rules-of-the-game", minSceneIndex: 9 },
      { day: 2, episodeId: "advanced1-ep2-the-night-northline-almost-left", minSceneIndex: 9 },
      { day: 3, episodeId: "advanced1-ep3-why-us", minSceneIndex: 9 },
      { day: 4, episodeId: "advanced1-ep4-my-honest-weakness", minSceneIndex: 9 },
      { day: 5, episodeId: "advanced1-ep5-pressure-round", minSceneIndex: 9 },
    ],
  },
  {
    moduleId: "advanced-1",
    curriculumWeek: 2,
    stories: [
      { day: 6, episodeId: "advanced1-ep6-a-heartbeat-for-the-proposal", minSceneIndex: 9 },
      { day: 7, episodeId: "advanced1-ep7-the-numbers-do-not-lie", minSceneIndex: 9 },
      { day: 8, episodeId: "advanced1-ep8-two-right-answers", minSceneIndex: 9 },
      { day: 9, episodeId: "advanced1-ep9-in-their-own-words", minSceneIndex: 9 },
      { day: 10, episodeId: "advanced1-ep10-the-behavioural-round", minSceneIndex: 9 },
    ],
  },
  {
    moduleId: "advanced-1",
    curriculumWeek: 3,
    stories: [
      { day: 11, episodeId: "advanced1-ep11-why-i-left", minSceneIndex: 9 },
      { day: 12, episodeId: "advanced1-ep12-the-course-i-closed", minSceneIndex: 9 },
      { day: 13, episodeId: "advanced1-ep13-why-here", minSceneIndex: 9 },
      { day: 14, episodeId: "advanced1-ep14-the-hour-about-money", minSceneIndex: 9 },
      { day: 15, episodeId: "advanced1-ep15-the-room-that-interrupts", minSceneIndex: 9 },
    ],
  },
  {
    moduleId: "advanced-1",
    curriculumWeek: 4,
    stories: [
      { day: 16, episodeId: "advanced1-ep16-the-ninety-days", minSceneIndex: 9 },
      { day: 17, episodeId: "advanced1-ep17-show-me-dont-tell-me", minSceneIndex: 9 },
      { day: 18, episodeId: "advanced1-ep18-the-question-nobody-prepares-for", minSceneIndex: 9 },
      { day: 19, episodeId: "advanced1-ep19-now-you-ask", minSceneIndex: 9 },
      { day: 20, episodeId: "advanced1-ep20-the-last-room", minSceneIndex: 9 },
    ],
  },
  {
    moduleId: "advanced-2",
    curriculumWeek: 1,
    stories: [],
  },
  {
    moduleId: "advanced-2",
    curriculumWeek: 2,
    stories: [],
  },
  {
    moduleId: "advanced-2",
    curriculumWeek: 3,
    stories: [],
  },
  {
    moduleId: "advanced-2",
    curriculumWeek: 4,
    stories: [],
  },
  {
    moduleId: "advanced-3",
    curriculumWeek: 1,
    stories: [],
  },
  {
    moduleId: "advanced-3",
    curriculumWeek: 2,
    stories: [],
  },
  {
    moduleId: "advanced-3",
    curriculumWeek: 3,
    stories: [],
  },
  {
    moduleId: "advanced-3",
    curriculumWeek: 4,
    stories: [],
  },
];

export function getLeagueCohort(moduleId: string, curriculumWeek: number): LeagueCohort | undefined {
  return LEAGUE_COHORTS.find((c) => c.moduleId === moduleId && c.curriculumWeek === curriculumWeek);
}

export function isLeagueCohort(moduleId: string, curriculumWeek: number): boolean {
  return Boolean(getLeagueCohort(moduleId, curriculumWeek));
}

/** Latest curriculum week that has a league cohort for this module (0 = none). */
export function maxCohortWeekForModule(moduleId: string): number {
  return LEAGUE_COHORTS.filter((c) => c.moduleId === moduleId).reduce(
    (max, c) => Math.max(max, c.curriculumWeek),
    0,
  );
}

export function getStorySlot(moduleId: string, day: number): LeagueStorySlot | undefined {
  const week = Math.max(1, Math.ceil(day / 5));
  return getLeagueCohort(moduleId, week)?.stories.find((s) => s.day === day);
}

/** Activities that can be scored on one curriculum day (1 without story). */
export function activitiesForDay(moduleId: string, day: number): number {
  return getStorySlot(moduleId, day) ? 2 : 1;
}
