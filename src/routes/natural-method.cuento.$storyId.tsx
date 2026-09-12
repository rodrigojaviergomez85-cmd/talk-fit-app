import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/fluency/AppShell";
import { StorybookPlayer } from "@/components/storybook/StorybookPlayer";
import { getStorybookEpisode } from "@/services/storybook";

export const Route = createFileRoute("/natural-method/cuento/$storyId")({
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
  return (
    <AppShell>
      <div className="p-4 pb-8">
        <StorybookPlayer key={episode.id} episode={episode} />
      </div>
    </AppShell>
  );
}
