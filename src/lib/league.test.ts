import { describe, expect, it } from "vitest";
import {
  DAY_GOAL,
  WEEKLY_GOAL,
  attainableWeeklyGoal,
  curriculumWeekForDay,
  dailyGoal,
  daysForWeek,
  formatWeekRange,
  hasReward,
  isDayInWeek,
  leagueWeekEnd,
  leagueWeekStart,
  pointsForDay,
  progressPercent,
  type LeagueReward,
} from "./league";
import { LEAGUE_COHORTS, getLeagueCohort, getStorySlot, isLeagueCohort } from "./league-manifest";
import { getStorybookEpisode } from "@/services/storybook";

const reward = (day: number, activityType: "story" | "practice"): LeagueReward => ({
  day,
  activityType,
  points: 150,
});

describe("liga semanal — reglas", () => {
  it("maps curriculum days to weeks of five", () => {
    expect(curriculumWeekForDay(1)).toBe(1);
    expect(curriculumWeekForDay(5)).toBe(1);
    expect(curriculumWeekForDay(6)).toBe(2);
    expect(daysForWeek(2)).toEqual([6, 7, 8, 9, 10]);
    expect(isDayInWeek(7, 2)).toBe(true);
    expect(isDayInWeek(11, 2)).toBe(false);
  });

  it("pays 150 per activity, 300 per day and 1500 per week", () => {
    expect(DAY_GOAL).toBe(300);
    expect(WEEKLY_GOAL).toBe(1500);
    const rewards = [reward(1, "story"), reward(1, "practice")];
    expect(pointsForDay(rewards, 1)).toBe(300);
    expect(pointsForDay(rewards, 2)).toBe(0);
    expect(hasReward(rewards, 1, "story")).toBe(true);
    expect(hasReward(rewards, 2, "story")).toBe(false);
  });

  it("allows catching up two sessions on the same date (600 points)", () => {
    const rewards = [reward(1, "story"), reward(1, "practice"), reward(2, "story"), reward(2, "practice")];
    const total = rewards.reduce((s, r) => s + r.points, 0);
    expect(total).toBe(600);
    expect(total).toBeLessThanOrEqual(WEEKLY_GOAL);
  });

  it("caps the weekly maximum at the five eligible sessions", () => {
    const rewards = [1, 2, 3, 4, 5].flatMap((d) => [reward(d, "story"), reward(d, "practice")]);
    expect(rewards.reduce((s, r) => s + r.points, 0)).toBe(WEEKLY_GOAL);
  });

  it("lowers the goal when some stories are not published", () => {
    expect(attainableWeeklyGoal(5)).toBe(1500);
    expect(attainableWeeklyGoal(3)).toBe(1200);
    expect(attainableWeeklyGoal(0)).toBe(750);
  });

  it("clamps progress percentages", () => {
    expect(progressPercent(0, 1500)).toBe(0);
    expect(progressPercent(750, 1500)).toBe(50);
    expect(progressPercent(9000, 1500)).toBe(100);
    expect(progressPercent(100, 0)).toBe(0);
  });

  it("uses Monday–Sunday weeks in the institutional timezone", () => {
    // 2026-09-16 is a Wednesday in America/El_Salvador.
    const start = leagueWeekStart(new Date("2026-09-16T18:00:00Z"));
    expect(start).toBe("2026-09-14");
    expect(leagueWeekEnd(start)).toBe("2026-09-20");
    // Late Sunday local time still belongs to the same week.
    expect(leagueWeekStart(new Date("2026-09-21T05:00:00Z"))).toBe("2026-09-14");
    // Monday local time opens the next week.
    expect(leagueWeekStart(new Date("2026-09-21T18:00:00Z"))).toBe("2026-09-21");
    expect(formatWeekRange("2026-09-14", "2026-09-20", true)).toContain("–");
  });
});

describe("liga semanal — cohortes de todo el curso", () => {
  const MODULES = [
    "basic-zero",
    "simple-future",
    "simple-present",
    "past-stories",
    "mixed-tenses",
    "eagles-week-1",
    "tigers",
    "sharks",
    "advanced-1",
    "advanced-2",
    "advanced-3",
  ];

  it("enables every module and the four curriculum weeks", () => {
    expect(LEAGUE_COHORTS).toHaveLength(MODULES.length * 4);
    for (const moduleId of MODULES) {
      for (let week = 1; week <= 4; week += 1) {
        expect(isLeagueCohort(moduleId, week), `${moduleId} w${week}`).toBe(true);
      }
    }
    expect(isLeagueCohort("basic-two", 1)).toBe(false);
    expect(isLeagueCohort("basic-zero", 5)).toBe(false);
  });

  it("matches the real episodes and their scene counts", () => {
    for (const cohort of LEAGUE_COHORTS) {
      for (const slot of cohort.stories) {
        const episode = getStorybookEpisode(slot.episodeId);
        expect(episode, `missing episode ${slot.episodeId}`).toBeTruthy();
        expect(slot.minSceneIndex).toBe(episode!.scenes.length);
      }
    }
  });

  it("leaves modules without a season as audio-only weeks", () => {
    for (const moduleId of ["advanced-2", "advanced-3"]) {
      for (let week = 1; week <= 4; week += 1) {
        expect(getLeagueCohort(moduleId, week)?.stories).toEqual([]);
      }
    }
    // Audio-only weeks aim at five sessions × 150 points.
    expect(attainableWeeklyGoal(0)).toBe(750);
  });

  it("resolves the story slot from a curriculum day", () => {
    expect(getStorySlot("basic-zero", 3)?.episodeId).toBe("vale-who-is-he");
    expect(getStorySlot("basic-zero", 7)?.episodeId).toBe("vale-favorite-color");
    expect(getStorySlot("tigers", 20)?.episodeId).toBe("tigers-ep20-defend-your-decision");
    // Advanced 1 is fully published (days 1-20).
    expect(getStorySlot("advanced-1", 11)?.episodeId).toBeTruthy();
    expect(getStorySlot("advanced-1", 16)?.episodeId).toBe("advanced1-ep16-the-ninety-days");
    expect(getStorySlot("advanced-1", 20)?.episodeId).toBe("advanced1-ep20-the-last-room");
    expect(getLeagueCohort("advanced-1", 4)?.stories).toHaveLength(5);
    expect(getStorySlot("advanced-2", 1)).toBeUndefined();
  });

  it("scores audio-only days as 150 and story days as 300", () => {
    expect(dailyGoal(false)).toBe(150);
    expect(dailyGoal(true)).toBe(300);
  });
});
