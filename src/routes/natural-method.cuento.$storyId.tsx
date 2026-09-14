import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { StorybookPlayer } from "@/components/storybook/StorybookPlayer";
import { getStorybookEpisode, isDayUnlocked } from "@/services/storybook";
import { getEpisodeSlot } from "@/services/storybook/seasons";
import { JourneyService } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/natural-method/cuento/$storyId")({
  validateSearch: (search: Record<string, unknown>) =>
    (search["from"] === "day" ? { from: "day" as const } : {}) as { from?: "day" },
  loader: ({ params }) => {
    const episode = getStorybookEpisode(params.storyId);
    if (!episode) throw notFound();
    return { episode };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.episode
      ? `${loaderData.episode.titleEs} · Cuento animado`
      : "Cuento animado";
    const description =
      "Cuento animado interactivo: pasa la página, escucha cada escena, toca las palabras para ver su significado y responde preguntas en voz alta.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: StorybookPage,
});

function StorybookPage() {
  const { episode } = Route.useLoaderData();
  const { from } = Route.useSearch();
  const navigate = useNavigate();
  const showEs = useAppLang().lang === "es";
  const slot = getEpisodeSlot(episode.id);
  const [journey, setJourney] = useState<JourneyState | null>(null);

  useEffect(() => {
    setJourney(JourneyService.load());
    void JourneyService.pull().then(setJourney).catch(() => {});
  }, []);

  const locked = Boolean(slot && journey && !isDayUnlocked(journey, slot.moduleId, slot.day));

  const onCoverBack =
    from === "day" && slot
      ? () => navigate({ to: "/day/$moduleId/$day", params: { moduleId: slot.moduleId, day: String(slot.day) } })
      : undefined;

  if (locked) {
    return (
      <AppShell>
        <div className="space-y-4 p-6 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-border bg-muted">
            <Lock className="size-7 text-muted-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-extrabold text-foreground">
            {showEs ? "Este episodio todavía está cerrado" : "This episode is still locked"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "La historia de Vale avanza junto a tu ruta oficial. Sigue con tu práctica del día y este episodio se abrirá cuando llegues ahí. Los episodios que ya viste siguen abiertos para repasar."
              : "Vale's story follows your official route. Keep going with your daily practice and this episode will open when you get there. Episodes you already saw stay open for review."}
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/natural-method/audiobooks"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-4 text-[13px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              {showEs ? "Ver mis episodios" : "See my episodes"}
            </Link>
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-border px-4 text-[13px] font-bold uppercase tracking-[0.12em]"
            >
              {showEs ? "Ir a mi práctica" : "Go to my practice"}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell hideNav hideHeader hideSync>
      <div className="pb-2">
        <StorybookPlayer key={episode.id} episode={episode} onCoverBack={onCoverBack} />
      </div>
    </AppShell>
  );
}
