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
      <div className="space-y-4 p-4 pb-8">
        <Link
          to="/"
          className="inline-flex h-10 items-center gap-1.5 rounded-2xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("home.backHome")}
        </Link>

        <header>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {t("home.dayOfTotal")
              .replace("{day}", String(data.day))
              .replace("{total}", String(data.total))}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight text-foreground">{data.topic}</h1>
          <p className="mt-0.5 text-[14px] font-medium text-muted-foreground">{data.topicEs}</p>
        </header>

        {showStory && data.episode ? (
          <Link
            to="/natural-method/cuento/$storyId"
            params={{ storyId: data.episode.id }}
            className="block overflow-hidden rounded-3xl border-2 border-primary bg-card shadow-[var(--shadow-lift)] transition-transform active:scale-[0.99]"
          >
            <div className="relative">
              <img
                src={data.episode.cover}
                alt={es ? data.episode.titleEs : data.episode.title}
                width={512}
                height={512}
                className="aspect-[16/9] w-full object-cover"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary-foreground">
                <Star className="size-3.5 fill-primary-foreground" aria-hidden="true" />
                {t("day.recommended")} · {t("day.storyMinutes")}
              </span>
            </div>
            <div className="flex items-center gap-3 p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-extrabold text-foreground">
                  {t("day.naturalTitle")}
                </span>
                <span className="mt-0.5 block text-[13px] font-medium leading-snug text-muted-foreground">
                  {t("day.naturalBody")} · {es ? data.episode.titleEs : data.episode.title}
                </span>
                {seen ? (
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-bold text-primary">
                    <Check className="size-3.5" aria-hidden="true" /> {t("day.seen")}
                  </span>
                ) : null}
              </span>
              <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
            </div>
          </Link>
        ) : null}

        <Link
          to="/practice"
          search={{ day: data.day, module: data.moduleId }}
          className="flex items-center gap-3 rounded-3xl bg-navy p-5 text-navy-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.99]"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Mic className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="inline-block rounded-full bg-navy-foreground/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]">
              {t("day.required")}
            </span>
            <span className="mt-1.5 block text-[16px] font-extrabold">{t("day.audiosTitle")}</span>
            <span className="mt-0.5 block text-[13px] font-medium text-navy-foreground/70">
              {t("day.audiosBody")}
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </AppShell>
  );
}
