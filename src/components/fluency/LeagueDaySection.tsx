import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { claimDayRewards } from "@/lib/league.functions";
import {
  
  dailyGoal,
  formatPoints,
  hasReward,
  pointsForDay,
  progressPercent,
  type LeagueSummary,
} from "@/lib/league";
import { getStorySlot, isLeagueCohort } from "@/lib/league-manifest";
import { hasGrammarQuiz } from "@/lib/grammar-quiz-manifest";
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
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
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
  moduleId,
}: {
  summary: LeagueSummary | null;
  day: number;
  es: boolean;
  moduleLabel: string;
  /** Origin day so the league screen can send the learner back here. */
  moduleId?: string;
}) {
  const rewards = summary?.rewards ?? [];
  const dayPoints = pointsForDay(rewards, day);
  const points = summary?.points ?? 0;
  const week = summary?.curriculumWeek ?? curriculumWeekForDay(day);
  const rank = summary?.rank ?? null;
  const participants = summary?.participants ?? 0;
  // Audio-only days (no published story) are worth 150, not 300.
  const hasStory = Boolean(moduleId && getStorySlot(moduleId, day));
  const hasGrammar = Boolean(moduleId && hasGrammarQuiz(moduleId, day));
  const dayGoal = dailyGoal(hasStory, hasGrammar);
  const allDone =
    hasReward(rewards, day, "practice") &&
    (!hasStory || hasReward(rewards, day, "story")) &&
    (!hasGrammar || hasReward(rewards, day, "grammar"));


  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-card p-3">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[11px] font-bold text-muted-foreground">
            {es ? "Tus puntos de hoy" : "Your points today"}
          </p>
          <p className="text-[11px] font-extrabold text-foreground">
            {dayPoints} / {dayGoal}
          </p>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${progressPercent(dayPoints, dayGoal)}%` }}
          />
        </div>
        {allDone ? (
          <p className="mt-1.5 text-[11px] font-bold text-primary">
            {hasStory
              ? es
                ? "¡Completaste ambas actividades!"
                : "You finished both activities!"
              : es
                ? "¡Completaste la actividad del día!"
                : "You finished today's activity!"}
          </p>
        ) : null}
      </div>

      <Link
        to="/liga"
        search={{ from: moduleId, day: moduleId ? day : undefined }}
        className="block rounded-2xl border border-border bg-card p-3.5 shadow-[var(--shadow-lift)] transition-transform active:scale-[0.99]"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <Trophy className="size-5 text-primary" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-extrabold text-foreground">
              {es ? "Tu liga semanal" : "Your weekly league"}
            </span>
            <span className="block text-[11px] font-medium text-muted-foreground">
              {moduleLabel} · {es ? "Semana " : "Week "}
              {week}
            </span>
          </span>
        </span>

        <span className="mt-2.5 flex items-baseline justify-between gap-2">
          <span className="text-lg font-extrabold text-foreground">
            {rank ? (
              <>
                #{rank}{" "}
                <span className="text-[12px] font-bold text-muted-foreground">
                  {es ? `de ${participants} estudiantes` : `of ${participants} students`}
                </span>
              </>
            ) : (
              <span className="text-[13px] font-bold text-muted-foreground">
                {es ? "Sin puesto todavía" : "No rank yet"}
                {participants > 0 ? (
                  <span className="block text-[11px] font-medium">
                    {es ? `${participants} estudiantes compitiendo` : `${participants} students competing`}
                  </span>
                ) : null}
              </span>
            )}
          </span>
          <span className="shrink-0 text-lg font-extrabold text-foreground">
            {formatPoints(points)} <span className="text-[12px] font-bold">pts</span>
          </span>
        </span>

        <span className="mt-2.5 block border-t border-border pt-2.5">
          <span className="flex items-center justify-between text-[13px] font-extrabold text-primary">
            {es ? "Ver mi liga" : "See my league"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
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
