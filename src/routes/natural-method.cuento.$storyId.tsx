import { useEffect, useState } from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/fluency/AppShell";
import { StorybookPlayer } from "@/components/storybook/StorybookPlayer";
import { getStorybookEpisode } from "@/services/storybook";
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
  const slot = getEpisodeSlot(episode.id);

  const onCoverBack =
    from === "day" && slot
      ? () => navigate({ to: "/day/$moduleId/$day", params: { moduleId: slot.moduleId, day: String(slot.day) } })
      : undefined;

  return (
    <AppShell hideNav hideHeader hideSync>
      <div className="pb-2">
        <StorybookPlayer key={episode.id} episode={episode} onCoverBack={onCoverBack} />
      </div>
    </AppShell>
  );
}
