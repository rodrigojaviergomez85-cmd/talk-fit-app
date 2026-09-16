import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { claimDayRewards } from "@/lib/league.functions";
import {
  DAY_GOAL,
  WEEKLY_GOAL,
  formatPoints,
  hasReward,
  pointsForDay,
  progressPercent,
  type LeagueSummary,
} from "@/lib/league";
import { isLeagueCohort } from "@/lib/league-manifest";
import { curriculumWeekForDay } from "@/lib/league";

/**
 * Weekly league block on the day screen: this day's points, the weekly card
 * and the celebration. Points are only ever shown as earned AFTER the server
 * confirms them; the claim call is idempotent and safe to repeat.
 */
export function useLeagueDay(moduleId: string, day: number) {
  const claim = useServerFn(claimDayRewards);
  const [summary, setSummary] = useState<LeagueSummary | null>(null);
  const [awarded, setAwarded] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  const busy = useRef(false);

  const eligible = isLeagueCohort(moduleId, curriculumWeekForDay(day));

  const refresh = useCallback(async () => {
    if (!eligible || busy.current) return;
    busy.current = true;
    try {
      const res = await claim({ data: { moduleId, day } });
      setSummary(res.summary);
      setFailed(false);
      if (res.awarded.length) setAwarded(res.awarded);
    } catch {
      // A league failure must never affect the practice itself; we simply retry later.
      setFailed(true);
    } finally {
      busy.current = false;
    }
  }, [claim, eligible, moduleId, day]);

  useEffect(() => {
    void refresh();
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refresh]);

  return { summary, awarded, failed, eligible, refresh, clearAwarded: () => setAwarded([]) };
}

export function LeaguePointsBadge({ earned, es }: { earned: boolean; es: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.1em] ${
        earned ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
      }`}
    >
      {earned ? `✓ 150 ${es ? "pts" : "pts"}` : "+150 pts"}
    </span>
  );
}

export function LeagueDaySection({
  summary,
  day,
  es,
  moduleLabel,
}: {
  summary: LeagueSummary;
  day: number;
  es: boolean;
  moduleLabel: string;
}) {
  const dayPoints = pointsForDay(summary.rewards, day);
  const goal = summary.attainableGoal || WEEKLY_GOAL;
  const bothDone = hasReward(summary.rewards, day, "story") && hasReward(summary.rewards, day, "practice");

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-card p-3">
        <p className="text-[11px] font-bold text-foreground">
          {es ? "Puntos de esta jornada" : "Points for this session"}: {dayPoints} / {DAY_GOAL}
        </p>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${progressPercent(dayPoints, DAY_GOAL)}%` }}
          />
        </div>
        {bothDone ? (
          <p className="mt-1.5 text-[11px] font-bold text-primary">
            {es ? "¡Completaste ambas actividades!" : "You finished both activities!"}
          </p>
        ) : null}
      </div>

      <Link
        to="/liga"
        className="block rounded-2xl bg-navy p-3.5 text-navy-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.99]"
      >
        <span className="flex items-center gap-2">
          <Trophy className="size-5 text-primary" aria-hidden="true" />
          <span className="text-[15px] font-extrabold">{es ? "Tu liga semanal" : "Your weekly league"}</span>
        </span>
        <span className="mt-0.5 block text-[11px] font-medium text-navy-foreground/70">
          {moduleLabel} · {es ? "Semana " : "Week "}
          {summary.curriculumWeek}
        </span>
        <span className="mt-2 block text-lg font-extrabold">
          {formatPoints(summary.points)} / {formatPoints(goal)} pts
        </span>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-navy-foreground/20">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${progressPercent(summary.points, goal)}%` }}
          />
        </div>
        <span className="mt-2 flex items-center justify-between text-[12px] font-bold">
          <span>
            {summary.rank
              ? es
                ? `Puesto ${summary.rank} de ${summary.participants}`
                : `Rank ${summary.rank} of ${summary.participants}`
              : es
                ? "Sin puesto todavía"
                : "No rank yet"}
          </span>
          <span className="inline-flex items-center gap-1 text-primary">
            {es ? "Ver mi liga" : "See my league"} <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </span>
        <span className="mt-2 block text-[11px] font-medium text-navy-foreground/70">
          {es
            ? "¡Todavía estás a tiempo! Completa tus actividades pendientes antes del domingo."
            : "There is still time! Finish your pending activities before Sunday."}
        </span>
      </Link>
    </div>
  );
}

/** Brief, reduced-motion friendly celebration after a confirmed reward. */
export function LeagueRewardToast({
  count,
  es,
  onDone,
}: {
  count: number;
  es: boolean;
  onDone: () => void;
}) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 2600);
    return () => window.clearTimeout(t);
  }, [onDone]);

  if (count <= 0) return null;
  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
    >
      <p className="rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground shadow-[var(--shadow-lift)]">
        +{count * 150} {es ? "puntos" : "points"}
      </p>
    </div>
  );
}
