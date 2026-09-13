import { useEffect, useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Check, Mic, Star } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";
import { CourseService } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import {
  getSeason,
  getStorybookEpisode,
  isDayUnlocked,
} from "@/services/storybook";
import { isEpisodeSeen } from "@/services/storybook/storybook-progress";
import type { JourneyState, ModuleId } from "@/lib/types";

/**
 * Day hub: one place, two choices. The optional story (natural method)
 * comes first as "recommended"; the daily 5-step audios are the required one.
 * Enabled only for modules/days that have a produced episode.
 */
export const Route = createFileRoute("/day/$moduleId/$day")({
  loader: ({ params }) => {
      const moduleId = params.moduleId as ModuleId;
    const day = Number(params.day);
    try {
      const module = CourseService.getModule(moduleId);
      const outline = CourseService.getDay(moduleId, day);
      const season = getSeason(moduleId);
      const slot = season?.slots.find((s) => s.day === day);
      const episode = slot?.episodeId ? getStorybookEpisode(slot.episodeId) : undefined;
      return {
        moduleId,
        day,
        moduleLabel: module.label,
        topic: outline.topic,
        topicEs: outline.topicEs,
        total: module.days.length,
        episode: episode
          ? { id: episode.id, title: episode.title, titleEs: episode.titleEs, cover: episode.cover }
          : null,
      };
    } catch {
      throw notFound();
    }
  },
  head: () => ({
    meta: [
      { title: "Tu práctica de hoy · Fluency App" },
      {
        name: "description",
        content: "Elige cómo practicar hoy: la historia del mundo de Vale o tus audios del día.",
      },
      { property: "og:title", content: "Tu práctica de hoy · Fluency App" },
      { property: "og:description", content: "Método natural con el mundo de Vale y tus audios del día." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DayHubPage,
  notFoundComponent: () => (
    <AppShell>
      <div className="p-6 text-center text-sm text-muted-foreground">Día no disponible.</div>
    </AppShell>
  ),
});

function DayHubPage() {
  const data = Route.useLoaderData();
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const [journey, setJourney] = useState<JourneyState | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    setJourney(JourneyService.load());
    if (data.episode) setSeen(isEpisodeSeen(data.episode.id));
  }, [data.episode]);

  const episodeUnlocked =
    data.episode && journey ? isDayUnlocked(journey, data.moduleId, data.day) : false;
  const showStory = Boolean(data.episode && episodeUnlocked);

  return (
    <AppShell>
      <div className="space-y-3 p-4 pb-6">
        <Link
          to="/"
          className="inline-flex h-9 items-center gap-1.5 rounded-2xl border border-border px-3 text-[11px] font-bold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("home.backHome")}
        </Link>

        <header>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {t("day.weekDay")
              .replace("{week}", String(Math.ceil(data.day / 5)))
              .replace("{day}", String(data.day))
              .replace("{total}", String(data.total))}
          </p>
          <h1 className="mt-0.5 text-lg font-extrabold leading-tight text-foreground">{data.topic}</h1>
          <p className="text-xs font-medium text-muted-foreground">{data.topicEs}</p>
        </header>

        {showStory && data.episode ? (
          <>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {t("day.step1Label")}
            </span>
            <Link
              to="/natural-method/cuento/$storyId"
              params={{ storyId: data.episode.id }}
              search={{ from: "day" }}
              className="flex items-center gap-3 rounded-2xl border-2 border-primary bg-card p-3 shadow-[var(--shadow-lift)] transition-transform active:scale-[0.99]"
            >
            <img
              src={data.episode.cover}
              alt={es ? data.episode.titleEs : data.episode.title}
              width={512}
              height={512}
              loading="lazy"
              className="size-20 shrink-0 rounded-xl object-cover object-top"
            />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-primary">
                <Star className="size-3 fill-primary" aria-hidden="true" />
                {t("day.recommended")} · {t("day.storyMinutes")}
              </span>
              <span className="mt-0.5 block truncate text-[15px] font-extrabold text-foreground">
                {es ? data.episode.titleEs : data.episode.title}
              </span>
              <span className="block text-xs font-medium leading-snug text-muted-foreground">
                {t("day.naturalTitle")}
                {seen ? (
                  <span className="ml-1 inline-flex items-center gap-0.5 font-bold text-primary">
                    <Check className="size-3" aria-hidden="true" /> {t("day.seen")}
                  </span>
                ) : null}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>
          </>
        ) : null}

        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {t("day.step2Label")}
        </span>
        <Link
          to="/practice"
          search={{ day: data.day, module: data.moduleId }}
          className="flex items-center gap-3 rounded-2xl bg-navy p-3.5 text-navy-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.99]"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Mic className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy-foreground/70">
              {t("day.required")}
            </span>
            <span className="block text-[15px] font-extrabold leading-tight">{t("day.audiosTitle")}</span>
            <span className="block truncate text-xs font-medium text-navy-foreground/70">
              {t("day.audiosBody")}
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </AppShell>
  );
}
