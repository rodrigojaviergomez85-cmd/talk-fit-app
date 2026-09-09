import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import { ComparisonPlayerCard } from "@/components/fluency/ComparisonPlayerCard";
import { firstVsLatest } from "@/lib/progress-moments";
import { recordHeading } from "@/lib/recordings";
import type { JourneyState } from "@/lib/types";
import { useT } from "@/lib/i18n";

/**
 * "Escucha tus intentos": first attempt vs latest — ONLY when both audios
 * belong to the same module and day. Otherwise a short honest state with
 * access to the full recordings tab. One audio plays at a time (shared
 * playback bus).
 */
export function ListenAttemptsCard({ state }: { state: JourneyState }) {
  const t = useT();
  const pair = useMemo(() => firstVsLatest(state), [state]);
  const samePractice =
    pair && pair.first.moduleId === pair.latest.moduleId && pair.first.day === pair.latest.day;

  return (
    <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <Headphones className="size-5 shrink-0 text-primary" aria-hidden />
        <h2 className="text-[16px] font-extrabold tracking-tight">{t("prog.listenAttempts")}</h2>
      </div>

      {samePractice && pair ? (
        <>
          <p className="mt-1 text-[13px] font-semibold text-muted-foreground">
            {t("prog.compareSame")}
          </p>
          <div className="mt-3 space-y-3">
            <ComparisonPlayerCard
              caption={t("prog.firstAttempt")}
              side={{ day: pair.first.day, record: pair.first, playable: true }}
              subtitle={recordHeading(pair.first)}
              missingText=""
            />
            <ComparisonPlayerCard
              caption={t("prog.latestAttempt")}
              side={{ day: pair.latest.day, record: pair.latest, playable: true }}
              subtitle={recordHeading(pair.latest)}
              missingText=""
            />
          </div>
        </>
      ) : (
        <div className="mt-2">
          <p className="text-[13px] font-semibold text-muted-foreground">{t("prog.compareAlt")}</p>
          <Link
            to="/progress"
            search={{ tab: "audio" }}
            className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-secondary"
          >
            {t("prog.viewAudios")}
          </Link>
        </div>
      )}
    </section>
  );
}
