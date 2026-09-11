import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";
import { PRONUNCIATION_VIDEOS } from "@/services/natural-method-pronunciation";

export const Route = createFileRoute("/natural-method/pronunciation")({
  head: () => ({
    meta: [
      { title: "Perfecciona Tu Pronunciación · Natural Method" },
      {
        name: "description",
        content:
          "Videos de American Accent Secrets para perfeccionar cada sonido del inglés: mira, escucha y repite en voz alta.",
      },
      { property: "og:title", content: "Perfecciona Tu Pronunciación · Natural Method" },
      {
        property: "og:description",
        content: "Domina los sonidos del inglés americano con videos cortos, uno por sonido.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PronunciationPage,
});

function PronunciationPage() {
  const showEs = useAppLang().lang === "es";

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/natural-method"
          className="inline-flex h-10 items-center gap-1.5 rounded-2xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Natural Method
        </Link>

        <header>
          <h1 className="text-2xl font-extrabold text-foreground">
            {showEs ? "Perfecciona tu pronunciación" : "Perfect Your Pronunciation"}
          </h1>
          <p className="text-sm font-semibold text-primary">
            {showEs ? "Con American Accent Secrets" : "With American Accent Secrets"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {showEs
              ? "Un video por sonido. Mira, escucha y repite en voz alta hasta que salga natural."
              : "One video per sound. Watch, listen, and repeat out loud until it comes out naturally."}
          </p>
        </header>

        <ul className="space-y-3">
          {PRONUNCIATION_VIDEOS.map((video) => (
            <li key={video.id}>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-3 transition hover:border-primary"
              >
                <img
                  src={video.image}
                  alt={video.imageAlt}
                  width={480}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-24 shrink-0 rounded-xl border border-border object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[16px] font-extrabold text-foreground">{video.title}</span>
                  <span className="mt-0.5 block text-[12px] text-muted-foreground">
                    {showEs ? "Toca para ver el video en YouTube" : "Tap to watch the video on YouTube"}
                  </span>
                </span>
                <PlayCircle className="size-7 shrink-0 text-primary" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
