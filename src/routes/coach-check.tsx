import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/fluency/AppShell";
import { AuthGate } from "@/components/fluency/AuthGate";
import { DateChips } from "@/components/fluency/coach/DateChips";
import { PracticeCard } from "@/components/fluency/coach/PracticeCard";
import { SevenDayHistory } from "@/components/fluency/coach/SevenDayHistory";
import { stopPlayback } from "@/hooks/use-recording-playback";
import { useAuth } from "@/lib/auth";
import { formatLongDate, formatSentenceDate, groupByDayKey, recentDayKeys } from "@/lib/coach-check";
import { useAppLang } from "@/lib/i18n";
import type { JourneyState } from "@/lib/types";
import { JourneyService } from "@/services/journey-service";

export const Route = createFileRoute("/coach-check")({
  head: () => ({
    meta: [
      { title: "Coach Check — Fluency App" },
      {
        name: "description",
        content: "Show your coach exactly which Fluency App practice you completed on any calendar date.",
      },
      { property: "og:title", content: "Coach Check — Fluency App" },
      { property: "og:description", content: "Proof of practice by calendar date, with your saved Final Rep." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CoachCheckPage,
});

type Status = "checking" | "fresh" | "offline";

function CoachCheckPage() {
  const { t, lang } = useAppLang();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState<JourneyState | null>(null);
  const [status, setStatus] = useState<Status>("checking");
  // Default: yesterday. Computed on the client so it uses the device's local day.
  const [selected, setSelected] = useState<string>(() => recentDayKeys(2)[1] ?? "");

  const refresh = useCallback(() => {
    setStatus("checking");
    setState(JourneyService.load());
    // Authoritative backend read — bypasses the short pull cache on purpose.
    JourneyService.fetchRemote()
      .then((remote) => {
        setState(remote);
        setStatus("fresh");
      })
      .catch(() => setStatus("offline"));
  }, []);

  useEffect(() => {
    if (!user) return;
    refresh();
    return () => stopPlayback();
  }, [user, refresh]);

  const groups = useMemo(() => groupByDayKey(Object.values(state?.days ?? {})), [state]);
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const [key, list] of groups) map.set(key, list.length);
    return map;
  }, [groups]);
  const practices = groups.get(selected) ?? [];

  const select = (key: string) => {
    stopPlayback();
    setSelected(key);
  };

  if (authLoading) {
    return (
      <AppShell title={t("coach.title")}>
        <div className="h-40 animate-pulse rounded-3xl bg-secondary" aria-busy="true" />
      </AppShell>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <AuthGate blocking />
        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="mx-auto mt-4 block min-h-[44px] rounded-2xl px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          {t("action.back")}
        </button>
      </div>
    );
  }

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const metaName = [meta["display_name"], meta["full_name"]].find((v): v is string => typeof v === "string" && v.length > 0);
  const learner = metaName ?? user.email ?? null;

  return (
    <AppShell title={t("coach.title")}>
      <div className="space-y-5">
        {learner ? (
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {t("coach.learner")} · <span className="text-foreground normal-case tracking-normal">{learner}</span>
          </p>
        ) : null}

        <section className="space-y-3">
          <h2 className="text-[15px] font-extrabold uppercase tracking-tight">{t("coach.whichDate")}</h2>
          <DateChips selected={selected} onSelect={select} />
          <p className="text-[18px] font-extrabold tracking-tight">{formatLongDate(selected, lang)}</p>
        </section>

        <StatusLine status={status} />

        {practices.length === 0 ? (
          <section className="rounded-3xl border border-destructive/30 bg-card p-5 text-center shadow-[var(--shadow-card)]">
            <p className="text-[18px] font-extrabold uppercase tracking-tight">🔴 {t("coach.none")}</p>
            <p className="mt-2 text-[14px] font-semibold text-muted-foreground">
              {t("coach.noneBody")} {formatSentenceDate(selected, lang)}.
            </p>
          </section>
        ) : (
          <section className="space-y-3">
            <p className="text-[18px] font-extrabold uppercase tracking-tight">
              ✅ {practices.length > 1 ? `${practices.length} ${t("coach.recordedMany")}` : t("coach.recorded")}
            </p>
            {practices.map((record, i) => (
              <PracticeCard
                key={`${record.moduleId}:${record.day}`}
                record={record}
                {...(practices.length > 1 ? { index: i } : {})}
              />
            ))}
          </section>
        )}

        <SevenDayHistory counts={counts} selected={selected} onSelect={select} />
      </div>
    </AppShell>
  );
}

function StatusLine({ status }: { status: Status }) {
  const { t } = useAppLang();
  if (status === "offline") {
    return (
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-destructive" aria-live="polite">
        {t("coach.offline")}
        <span className="block font-semibold normal-case tracking-normal text-muted-foreground">{t("coach.offlineBody")}</span>
      </p>
    );
  }
  return (
    <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground" aria-live="polite">
      {status === "checking" ? t("coach.checking") : t("coach.fresh")}
    </p>
  );
}
