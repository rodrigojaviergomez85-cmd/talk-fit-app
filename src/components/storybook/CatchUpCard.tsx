import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PlayCircle, Rocket } from "lucide-react";
import { getStorybookEpisode } from "@/services/storybook";
import {
  CATCH_UP_DAILY_GOAL,
  readCatchUpPlan,
  setCatchUpActive,
  type CatchUpPlan,
} from "@/services/storybook/catch-up";

/**
 * Optional "catch up from Basic 1" plan: two episodes a day, in story order.
 * Suggestion only — nothing is locked.
 */
export function CatchUpCard({ showEs }: { showEs: boolean }) {
  const [plan, setPlan] = useState<CatchUpPlan | null>(null);

  useEffect(() => {
    setPlan(readCatchUpPlan());
  }, []);

  if (!plan) return null;

  if (!plan.active) {
    return (
      <section className="rounded-2xl border border-primary/40 bg-primary/5 p-4">
        <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-foreground">
          <Rocket className="size-4 text-primary" aria-hidden="true" />
          {showEs ? "Ponerme al día desde Básico 1" : "Catch up from Basic 1"}
        </h2>
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
          {showEs
            ? `Te armamos la ruta completa de la historia: ${CATCH_UP_DAILY_GOAL} episodios por día, desde el primero.`
            : `We build the full story route for you: ${CATCH_UP_DAILY_GOAL} episodes a day, starting from episode one.`}
        </p>
        <button
          type="button"
          onClick={() => {
            setCatchUpActive(true);
            setPlan(readCatchUpPlan());
          }}
          className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-primary px-4 text-[13px] font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
        >
          {showEs ? "Activar mi plan" : "Start my plan"}
        </button>
      </section>
    );
  }

  const episode = plan.nextEpisodeId ? getStorybookEpisode(plan.nextEpisodeId) : undefined;
  const position = Math.min(plan.completedCount + 1, plan.totalCount);
  const goalDone = plan.todayRemaining === 0;
  const finished = !plan.nextEpisodeId;

  return (
    <section className="rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-foreground">
        <Rocket className="size-4 text-primary" aria-hidden="true" />
        {showEs ? "Tu plan de hoy" : "Your plan for today"}
      </h2>

      {finished ? (
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
          {showEs
            ? "¡Terminaste todos los episodios publicados! Te avisamos cuando salga uno nuevo."
            : "You finished every published episode! We'll tell you when a new one lands."}
        </p>
      ) : (
        <>
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
            {goalDone
              ? showEs
                ? `¡Meta de hoy cumplida! Llevas ${plan.doneTodayCount} episodios hoy. Puedes seguir si quieres.`
                : `Today's goal is done! ${plan.doneTodayCount} episodes today. Keep going if you want.`
              : plan.doneTodayCount === 0
                ? showEs
                  ? `Hoy te tocan ${CATCH_UP_DAILY_GOAL} episodios.`
                  : `${CATCH_UP_DAILY_GOAL} episodes for today.`
                : showEs
                  ? `Te falta ${plan.todayRemaining} de ${CATCH_UP_DAILY_GOAL} episodios hoy.`
                  : `${plan.todayRemaining} of ${CATCH_UP_DAILY_GOAL} episodes left today.`}
          </p>
          <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
            {showEs
              ? `Episodio ${position} de ${plan.totalCount}`
              : `Episode ${position} of ${plan.totalCount}`}
          </p>

          <Link
            to="/natural-method/cuento/$storyId"
            params={{ storyId: plan.nextEpisodeId! }}
            className="mt-3 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-center text-[13px] font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
          >
            <PlayCircle className="size-4" aria-hidden="true" />
            {showEs ? "Continuar la historia" : "Continue the story"}
          </Link>
          {episode ? (
            <p className="mt-2 text-center text-[12px] text-muted-foreground">
              {showEs ? episode.titleEs : episode.title}
            </p>
          ) : null}
        </>
      )}

      <button
        type="button"
        onClick={() => {
          setCatchUpActive(false);
          setPlan(readCatchUpPlan());
        }}
        className="mt-3 block w-full text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground underline"
      >
        {showEs ? "Ya no quiero el plan" : "Turn off the plan"}
      </button>
    </section>
  );
}
