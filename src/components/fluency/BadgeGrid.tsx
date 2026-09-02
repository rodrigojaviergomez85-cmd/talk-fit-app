import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";
import type { JourneyState } from "@/lib/types";
import { ALL_BADGES, earnedBadgeIds, habitDays, upcomingBadges, type BadgeDef } from "@/lib/habit";
import { MODULE_EMOJI } from "@/lib/progress-moments";
import { AchievementsService } from "@/services/achievements-service";
import { CourseService } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * MIS LOGROS — unlocked badges first (habit, skill, completed modules), then
 * only the next one or two habit milestones. No wall of locked badges.
 */
export function BadgeGrid({ state }: { state: JourneyState }) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const [testReady, setTestReady] = useState(AchievementsService.testReadyCount());

  useEffect(() => {
    let alive = true;
    void AchievementsService.fetchTestReadyCount()
      .then((n) => {
        if (!alive) return;
        setTestReady(n);
        return AchievementsService.sync(state, n);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [state]);

  const earned = new Set(earnedBadgeIds(state, testReady));
  const unlocked = ALL_BADGES.filter((b) => earned.has(b.id));
  const modules = CourseService.modules().filter((m) => JourneyService.moduleComplete(state, m.id));
  const count = habitDays(state);
  const upcoming = upcomingBadges(count);

  return (
    <section className="space-y-3">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {es ? "MIS LOGROS" : "MY ACHIEVEMENTS"}
      </h2>

      {unlocked.length === 0 && modules.length === 0 ? (
        <p className="rounded-3xl bg-card p-4 text-[13px] font-semibold text-muted-foreground shadow-[var(--shadow-card)]">
          {es
            ? "Tu primer logro llega a los 7 días de práctica."
            : "Your first achievement arrives at 7 practice days."}
        </p>
      ) : null}

      {unlocked.length > 0 || modules.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {unlocked.map((badge) => (
            <BadgeTile key={badge.id} badge={badge} es={es} unlocked />
          ))}
          {modules.map((module) => (
            <BadgeTile
              key={`module:${module.id}`}
              badge={{
                id: `module:${module.id}`,
                emoji: MODULE_EMOJI[module.id],
                name: `${module.title === "EAGLES" ? "EAGLES" : module.label} ${es ? "COMPLETO" : "COMPLETE"}`,
                detail: { es: `${module.days.length} días completados`, en: `${module.days.length} days completed` },
                kind: "module",
              }}
              es={es}
              unlocked
            />
          ))}
        </div>
      ) : null}

      {upcoming.length ? (
        <>
          <p className="pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {es ? "Próximos logros" : "Next milestones"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {upcoming.map(({ badge, days }) => (
              <BadgeTile key={badge.id} badge={badge} es={es} progress={`${count} / ${days} ${es ? "DÍAS" : "DAYS"}`} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}

function BadgeTile({
  badge,
  es,
  unlocked = false,
  progress,
}: {
  badge: BadgeDef;
  es: boolean;
  unlocked?: boolean;
  progress?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[88px] flex-col justify-between rounded-3xl p-4 shadow-[var(--shadow-card)]",
        unlocked ? "bg-card" : "border border-dashed border-border bg-secondary/40",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={cn("text-2xl", !unlocked && "opacity-50 grayscale")} aria-hidden>
          {badge.emoji}
        </span>
        {unlocked ? (
          <Check className="size-4 text-success" aria-label={es ? "Desbloqueado" : "Unlocked"} />
        ) : (
          <Lock className="size-4 text-muted-foreground" aria-label={es ? "Pendiente" : "Locked"} />
        )}
      </div>
      <div className="mt-2">
        <p className={cn("text-[12px] font-extrabold leading-tight tracking-tight", !unlocked && "text-muted-foreground")}>
          {badge.name}
        </p>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {progress ?? (es ? badge.detail.es : badge.detail.en)}
        </p>
      </div>
    </div>
  );
}
