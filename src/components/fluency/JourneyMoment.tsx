import { ComparisonPair } from "./ComparisonPair";
import { journeyComparison, journeyMetrics, INTERMEDIATE_JOURNEY } from "@/lib/progress-moments";
import { TestReadyService } from "@/services/test-ready-service";
import { useT } from "@/lib/i18n";
import type { JourneyState } from "@/lib/types";

/**
 * 60-day moment (end of SHARKS): the learner's first saved Intermediate Final Rep
 * next to their SHARKS final. Renders nothing when no real start recording exists.
 * Metrics are only the numbers already stored — never a score or a level claim.
 */
export function JourneyMoment({ state }: { state: JourneyState }) {
  const t = useT();
  const comparison = journeyComparison(state);
  if (!comparison || !comparison.end.playable) return null;
  const metrics = journeyMetrics(state);
  const sprints = Object.values(TestReadyService.snapshot()).filter((r) =>
    INTERMEDIATE_JOURNEY.includes(r.moduleId),
  ).length;

  return (
    <section className="space-y-4 rounded-3xl bg-navy p-5 text-navy-foreground">
      <div className="text-center">
        <p className="text-[18px] font-extrabold uppercase tracking-[0.14em]">{t("journey.title")}</p>
        <p className="mt-1 text-[13px] text-navy-foreground/75">{t("journey.sub")}</p>
      </div>

      <ComparisonPair comparison={comparison} startCaption={t("journey.start")} endCaption={t("journey.end")} tone="navy" />

      <div className="grid grid-cols-2 gap-2 text-center">
        <Metric value={`${metrics.days}`} label={t("journey.days")} />
        {metrics.reps ? <Metric value={`${metrics.reps}`} label="FLUENCY REPS" /> : null}
        {metrics.minutes > 0 ? <Metric value={`${metrics.minutes}`} label={t("journey.minutes")} /> : null}
        {metrics.finalReps > 0 ? <Metric value={`${metrics.finalReps}`} label={t("journey.finals")} /> : null}
        {sprints > 0 ? <Metric value={`${sprints}`} label={t("journey.sprints")} /> : null}
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-navy-foreground/10 p-3">
      <p className="text-2xl font-extrabold tabular-nums">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-navy-foreground/70">{label}</p>
    </div>
  );
}
