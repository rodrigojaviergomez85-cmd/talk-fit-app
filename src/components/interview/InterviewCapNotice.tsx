import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { LimitDialog } from "@/components/fluency/LimitDialog";
import { useAppSettings } from "@/hooks/use-app-settings";
import { SECTION_KEYS } from "@/config/limits";
import { DAILY_INTERVIEW_CAP } from "@/services/interview-attempts";
import capMascot from "@/assets/interview/cap-mascot.jpg";

/** Shown instead of the interview when today's runs are already used. */
export function InterviewCapReached({ es, cap = DAILY_INTERVIEW_CAP }: { es: boolean; cap?: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const settings = useAppSettings();

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/review/interview-simulators"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Interview Simulator
        </Link>

        <div className="space-y-3 rounded-2xl border border-border bg-card p-5 text-center">
          <img
            src={capMascot}
            alt={es ? "Mascota animándote a seguir practicando" : "Friendly mascot cheering you on to keep practicing"}
            width={160}
            height={160}
            loading="lazy"
            className="mx-auto size-40 object-contain"
          />
          <h1 className="text-lg font-extrabold text-foreground">
            {es ? "Ya usaste tus entrevistas de hoy" : "You've used today's interviews"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {es
              ? `Puedes hacer ${cap} entrevistas por día en total, pero no te preocupes. Aún puedes seguir practicando.`
              : `You can do ${cap} interviews per day in total, but don't worry. You can still keep practicing.`}
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/review"
              className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              Review
            </Link>
            <Link
              to="/natural-method"
              className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              {es ? "Método Natural" : "Natural Method"}
            </Link>
            {settings.billingEnabled ? (
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="relative overflow-hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:brightness-110 active:scale-[0.98]"
              >
                <Sparkles className="mr-2 inline size-4 align-text-bottom" aria-hidden="true" />
                {es ? "Adquirir premium" : "Get Premium"}
                <span className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="shine-sweep absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <LimitDialog sectionKey={SECTION_KEYS.interview} open={dialogOpen} onOpenChange={setDialogOpen} />
    </AppShell>
  );
}

/** Small counter shown inside a running interview. */
export function InterviewCapCounter({
  es,
  used,
  unlimited,
  cap = DAILY_INTERVIEW_CAP,
  isPro = false,
}: {
  es: boolean;
  used: number;
  unlimited: boolean;
  cap?: number;
  isPro?: boolean;
}) {
  const settings = useAppSettings();
  if (unlimited || !settings.limitsEnabled) return null;
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary-foreground">
      {es ? "Entrevistas hoy" : "Interviews today"} {Math.min(used, cap)} / {cap}
      {isPro ? " · Pro" : ""}
    </span>
  );
}
