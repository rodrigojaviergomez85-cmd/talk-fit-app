import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { CourseService } from "@/services/course-service";
import type { JourneyState } from "@/lib/types";
import { JourneyService } from "@/services/journey-service";
import { PracticeSessionService } from "@/services/practice-session";
import { ModuleBadge } from "@/components/fluency/ModuleBadge";
import { useAppLang } from "@/lib/i18n";

/**
 * The one dominant card on Home: the learner's CURRENT module and its next day.
 * Everything is derived from saved progress — nothing is hard-coded.
 */
export function CurrentModuleCard({ state }: { state: JourneyState }) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const next = JourneyService.nextPractice(state);
  const [resumeStage, setResumeStage] = useState<number | null>(null);

  useEffect(() => {
    if (!next) {
      setResumeStage(null);
      return;
    }
    const session = PracticeSessionService.load(next.moduleId, next.day);
    setResumeStage(PracticeSessionService.isResumable(session) && session ? session.stage : null);
  }, [next?.moduleId, next?.day]);

  if (!next) {
    return (
      <section className="rounded-3xl bg-navy p-6 text-navy-foreground">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{t("home.journey")}</p>
        <h2 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
          {t("home.journeyComplete")} <Check className="inline size-6 align-[-2px]" />
        </h2>
        <p className="mt-2 text-[14px] font-semibold text-navy-foreground/80">{t("home.journeyCompleteBody")}</p>
        <Link
          to="/progress"
          className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-navy-foreground/25 px-6 py-4 text-[15px] font-bold tracking-wide"
        >
          {t("home.reviewProgress")}
        </Link>
      </section>
    );
  }

  const module = CourseService.getModule(next.moduleId);
  const day = CourseService.getDay(next.moduleId, next.day);
  const total = module.days.length;
  const completed = JourneyService.completedCount(state, next.moduleId);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const fresh = completed === 0 && resumeStage === null;

  const cta =
    resumeStage !== null
      ? `${t("home.continueDay")} ${day.day}${resumeStage > 0 ? ` · ${t("home.rep")} ${Math.min(resumeStage, 5)}` : ""}`
      : fresh
        ? `${t("home.startDay")} ${day.day}`
        : t("action.continuePractice");

  return (
    <section className="rounded-3xl bg-navy p-6 text-navy-foreground shadow-[var(--shadow-lift)]">
      <div className="flex items-center gap-3">
        <ModuleBadge moduleId={module.id} size="lg" es={es} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <h2 className="text-[22px] font-extrabold leading-none tracking-tight">{module.title}</h2>
          <p className="mt-1 text-[13px] font-semibold text-navy-foreground/70">{module.label}</p>
        </div>
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{t("home.todaysChallenge")}</p>
      <h3 className="mt-1 text-[27px] font-extrabold leading-[1.1] tracking-tight">{day.topic}</h3>
      <p className="mt-1 text-[13px] font-medium leading-snug text-navy-foreground/60">{day.topicEs}</p>
      <p className="mt-3 text-[14px] font-semibold text-navy-foreground/80">{module.subtitle}</p>
      <p className="mt-1 text-[13px] font-medium leading-snug text-navy-foreground/60">{module.subtitleEs}</p>

      <div className="mt-5 flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-extrabold tabular-nums">
          <span className="font-extrabold">
            {t("home.day")} {day.day}
          </span>{" "}
          <span className="font-semibold text-navy-foreground/70">
            {es ? "de" : "of"} {total}
          </span>
        </p>
        <Link
          to="/module/$moduleId"
          params={{ moduleId: module.id }}
          className="flex items-center gap-1 text-[13px] font-bold text-navy-foreground/80"
        >
          {t("home.seeDays")} <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-navy-foreground/15">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
      </div>


      <Link
        to="/practice"
        search={{ day: day.day, module: module.id }}
        className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground transition-transform active:scale-[0.98]"
      >
        {cta} <ArrowRight className="size-4" />
      </Link>
      <Link
        to="/module/$moduleId"
        params={{ moduleId: module.id }}
        className="mt-2 flex min-h-[44px] w-full items-center justify-center text-[11px] font-bold uppercase tracking-[0.16em] text-navy-foreground/70"
      >
        {t("home.seeAllDays")}
      </Link>
    </section>
  );
}
