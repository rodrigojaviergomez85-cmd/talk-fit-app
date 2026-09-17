import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getLeagueCohort, getStorySlot, isLeagueCohort } from "./league-manifest";
import {
  attainableWeeklyGoal,
  curriculumWeekForDay,
  WEEKLY_GOAL,
  type LeagueActivityType,
  type LeagueBoardRow,
  type LeagueReward,
  type LeagueSummary,
  type LeagueWeekRef,
} from "./league";

/**
 * LIGA SEMANAL — server side.
 *
 * The browser never sends points, dates, user ids or "I finished it" flags.
 * It sends at most a module and a curriculum day; everything else (identity,
 * eligibility, real completion, competition window, ranking) is resolved by
 * the database functions created for this feature.
 */

const EMPTY: LeagueSummary = {
  enrolled: false,
  observer: false,
  points: 0,
  hidden: false,
  rank: null,
  participants: 0,
  rewards: [],
  attainableGoal: WEEKLY_GOAL,
  goalAttainable: true,
};

type RawSummary = {
  enrolled?: boolean;
  competitionId?: string;
  moduleId?: string;
  curriculumWeek?: number;
  weekStart?: string;
  weekEnd?: string;
  closed?: boolean;
  points?: number;
  hidden?: boolean;
  rank?: number | null;
  participants?: number;
  rewards?: LeagueReward[];
  observer?: boolean;
};

function shapeSummary(raw: RawSummary | null, moduleId: string, week: number): LeagueSummary {
  if (!raw?.enrolled && !raw?.observer) return EMPTY;
  const cohort = getLeagueCohort(raw.moduleId ?? moduleId, raw.curriculumWeek ?? week);
  const attainableGoal = attainableWeeklyGoal(cohort?.stories.length ?? 0);
  return {
    enrolled: Boolean(raw.enrolled),
    observer: Boolean(raw.observer),
    competitionId: raw.competitionId,
    moduleId: raw.moduleId,
    curriculumWeek: raw.curriculumWeek,
    weekStart: raw.weekStart,
    weekEnd: raw.weekEnd,
    closed: Boolean(raw.closed),
    points: Number(raw.points ?? 0),
    hidden: Boolean(raw.hidden),
    rank: raw.rank ?? null,
    participants: Number(raw.participants ?? 0),
    rewards: Array.isArray(raw.rewards) ? raw.rewards : [],
    attainableGoal,
    goalAttainable: attainableGoal >= WEEKLY_GOAL,
  };
}

function parseCohortInput(input: { moduleId?: string; day?: number; competitionId?: string }) {
  const moduleId = String(input.moduleId ?? "").slice(0, 60);
  const day = Math.max(1, Math.min(200, Number(input.day ?? 1)));
  const competitionId = input.competitionId ? String(input.competitionId).slice(0, 60) : "";
  return { moduleId, day, week: curriculumWeekForDay(day), competitionId };
}

/**
 * Card data: assignment, points, rank and that week's confirmed rewards.
 * With `competitionId` it reads one specific week (current or already closed);
 * without it, the learner's cohort for the given module/day.
 */
export const getMyLeagueSummary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(parseCohortInput)
  .handler(async ({ data, context }): Promise<LeagueSummary> => {
    if (data.competitionId) {
      const { data: raw, error } = await context.supabase.rpc("league_summary_by_competition", {
        _competition_id: data.competitionId,
      });
      if (error) return EMPTY;
      return shapeSummary(raw as RawSummary | null, data.moduleId, data.week);
    }
    if (!isLeagueCohort(data.moduleId, data.week)) return EMPTY;
    const { data: raw, error } = await context.supabase.rpc("league_my_summary", {
      _module_id: data.moduleId,
      _curriculum_week: data.week,
    });
    if (error) return EMPTY;
    let summary = shapeSummary(raw as RawSummary | null, data.moduleId, data.week);
    // Self-healing: one membership exists per calendar week, so a learner who
    // changed level mid-week (or whose switch call failed) stays stuck in the
    // old cohort. When the requested cohort is the level actually saved on
    // their account, move them now: the running week of the old cohort is
    // dropped, exactly like "Cambiar mi nivel" does.
    const mismatch =
      summary.enrolled &&
      (summary.moduleId !== data.moduleId || summary.curriculumWeek !== data.week);
    if (mismatch) {
      const { data: prefs } = await context.supabase
        .from("user_preferences")
        .select("current_module_id")
        .eq("user_id", context.userId)
        .maybeSingle();
      if (prefs?.current_module_id === data.moduleId) {
        const { error: switchError } = await context.supabase.rpc("league_switch_level", {
          _module_id: data.moduleId,
          _curriculum_week: data.week,
        });
        if (!switchError) {
          const { data: fresh } = await context.supabase.rpc("league_my_summary", {
            _module_id: data.moduleId,
            _curriculum_week: data.week,
          });
          summary = shapeSummary(fresh as RawSummary | null, data.moduleId, data.week);
        }
      }
    }
    return summary;
  });

/**
 * Read-only summary for one cohort (module + curriculum day), never enrolling.
 * Members get their real card; admin / unlimited accounts get observer mode;
 * anybody else gets nothing so the UI keeps showing their own league.
 */
export const getCohortLeagueSummary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(parseCohortInput)
  .handler(async ({ data, context }): Promise<LeagueSummary> => {
    if (!isLeagueCohort(data.moduleId, data.week)) return EMPTY;
    const { data: raw, error } = await context.supabase.rpc("league_summary_for_cohort", {
      _module_id: data.moduleId,
      _curriculum_week: data.week,
    });
    if (error) return EMPTY;
    return shapeSummary(raw as RawSummary | null, data.moduleId, data.week);
  });

/**
 * "Cambiar mi nivel": leaves the running week of the previous cohort (those
 * points are intentionally dropped) and enrols the learner right away in the
 * chosen module + curriculum week, so the board shows them with 0 points.
 */
export const switchLeagueLevel = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { moduleId: string; curriculumWeek: number }) => ({
    moduleId: String(input.moduleId ?? "").slice(0, 60),
    curriculumWeek: Math.max(1, Math.min(4, Number(input.curriculumWeek ?? 1))),
  }))
  .handler(async ({ data, context }): Promise<{ ok: boolean; competitionId: string | null }> => {
    if (!isLeagueCohort(data.moduleId, data.curriculumWeek)) return { ok: false, competitionId: null };
    const { data: raw, error } = await context.supabase.rpc("league_switch_level", {
      _module_id: data.moduleId,
      _curriculum_week: data.curriculumWeek,
    });
    if (error) return { ok: false, competitionId: null };
    return { ok: true, competitionId: (raw as string | null) ?? null };
  });

/** Every weekly competition the learner belongs to, newest first. */
export const getMyLeagueHistory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<LeagueWeekRef[]> => {
    const { data: raw, error } = await context.supabase.rpc("league_my_competitions");
    if (error || !Array.isArray(raw)) return [];
    return (raw as Record<string, unknown>[]).map((r) => ({
      competitionId: String(r["competitionId"] ?? ""),
      moduleId: String(r["moduleId"] ?? ""),
      curriculumWeek: Number(r["curriculumWeek"] ?? 1),
      weekStart: String(r["weekStart"] ?? ""),
      weekEnd: String(r["weekEnd"] ?? ""),
      closed: Boolean(r["closed"]),
      isCurrent: Boolean(r["isCurrent"]),
      points: Number(r["points"] ?? 0),
      rank: r["rank"] == null ? null : Number(r["rank"]),
      participants: Number(r["participants"] ?? 0),
    }));
  });

/**
 * Claims whatever the learner really earned on one curriculum day.
 * Idempotent and safe to call on every visit: the database refuses a second
 * reward for the same activity and re-checks completion itself.
 */
export const claimDayRewards = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(parseCohortInput)
  .handler(async ({ data, context }) => {
    const empty = { awarded: [] as LeagueActivityType[], summary: EMPTY };
    if (!isLeagueCohort(data.moduleId, data.week)) return empty;

    const { data: rawBefore } = await context.supabase.rpc("league_my_summary", {
      _module_id: data.moduleId,
      _curriculum_week: data.week,
    });
    const before = shapeSummary(rawBefore as RawSummary | null, data.moduleId, data.week);
    // Observers (admin / unlimited) can see the league but never score.
    if (!before.enrolled) return { awarded: [] as LeagueActivityType[], summary: before };

    const awarded: LeagueActivityType[] = [];

    const story = getStorySlot(data.moduleId, data.day);
    if (story) {
      const { data: res } = await context.supabase.rpc("league_award", {
        _activity_type: "story",
        _module_id: data.moduleId,
        _day: data.day,
        _activity_key: story.episodeId,
        _min_scene_index: story.minSceneIndex,
      });
      if ((res as { status?: string } | null)?.status === "awarded") awarded.push("story");
    }

    const { data: practiceRes } = await context.supabase.rpc("league_award", {
      _activity_type: "practice",
      _module_id: data.moduleId,
      _day: data.day,
      _activity_key: `${data.moduleId}:day-${data.day}`,
      _min_scene_index: 0,
    });
    if ((practiceRes as { status?: string } | null)?.status === "awarded") awarded.push("practice");

    if (!awarded.length) return { awarded, summary: before };

    const { data: rawAfter } = await context.supabase.rpc("league_my_summary", {
      _module_id: data.moduleId,
      _curriculum_week: data.week,
    });
    return { awarded, summary: shapeSummary(rawAfter as RawSummary | null, data.moduleId, data.week) };
  });

type BoardPayload = {
  total: number;
  listed: number;
  myPosition: number | null;
  offset: number;
  limit: number;
  rows: LeagueBoardRow[];
};

/** Top 3 + the learner and immediate neighbours, no duplicates. */
export const getLeaguePreview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { competitionId: string }) => ({
    competitionId: String(input.competitionId ?? "").slice(0, 60),
  }))
  .handler(async ({ data, context }): Promise<{ rows: LeagueBoardRow[]; myPosition: number | null }> => {
    const { data: raw, error } = await context.supabase.rpc("league_board_preview", {
      _competition_id: data.competitionId,
    });
    if (error) return { rows: [], myPosition: null };
    const payload = (raw ?? {}) as { rows?: LeagueBoardRow[]; myPosition?: number | null };
    return { rows: payload.rows ?? [], myPosition: payload.myPosition ?? null };
  });

/** Server-paginated full board, 25 rows per page. */
export const getLeagueBoard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { competitionId: string; offset?: number; limit?: number }) => ({
    competitionId: String(input.competitionId ?? "").slice(0, 60),
    offset: Math.max(0, Number(input.offset ?? 0)),
    limit: Math.max(1, Math.min(100, Number(input.limit ?? 25))),
  }))
  .handler(async ({ data, context }): Promise<BoardPayload> => {
    const fallback: BoardPayload = {
      total: 0,
      listed: 0,
      myPosition: null,
      offset: data.offset,
      limit: data.limit,
      rows: [],
    };
    const { data: raw, error } = await context.supabase.rpc("league_board", {
      _competition_id: data.competitionId,
      _offset: data.offset,
      _limit: data.limit,
    });
    if (error) return fallback;
    const payload = (raw ?? {}) as Partial<BoardPayload>;
    return {
      total: Number(payload.total ?? 0),
      listed: Number(payload.listed ?? 0),
      myPosition: payload.myPosition ?? null,
      offset: Number(payload.offset ?? data.offset),
      limit: Number(payload.limit ?? data.limit),
      rows: payload.rows ?? [],
    };
  });

/** Hide/show the learner in the public board (points are kept either way). */
export const setLeagueHidden = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { hidden: boolean }) => ({ hidden: Boolean(input.hidden) }))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("league_set_hidden", { _hidden: data.hidden });
    return { ok: !error };
  });
