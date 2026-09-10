import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { ReviewModuleList } from "@/components/review/ReviewModuleList";
import { useAppLang } from "@/lib/i18n";
import { listReviewModulesByCategory } from "@/services/review/review-registry";

export const Route = createFileRoute("/review/basic")({
  head: () => ({
    meta: [
      { title: "Basic Review · Fluency App" },
      { name: "description", content: "Practice essential English structures available for your current Basic level." },
      { property: "og:title", content: "Basic Review · Fluency App" },
      { property: "og:description", content: "Practice essential English structures available for your current Basic level." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BasicReviewPage,
});

function BasicReviewPage() {
  const { lang } = useAppLang();
  const showEs = lang === "es";
  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <header>
          <p className="text-[11px] font-extrabold uppercase text-primary">Review</p>
          <h1 className="text-2xl font-extrabold text-foreground">Basic</h1>
          <p className="text-sm text-muted-foreground">
            {showEs ? "Repasa los temas disponibles según tu nivel actual." : "Review the topics available for your current level."}
          </p>
        </header>
        <Link
          to="/review/pictionary"
          className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
        >
          <span className="min-w-0">
            <span className="block text-base font-extrabold text-foreground">Pictionary</span>
            <span className="block text-xs text-muted-foreground">
              {showEs
                ? "100 palabras por categoría, con imagen y pronunciación."
                : "100 words by category, with pictures and pronunciation."}
            </span>
          </span>
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
        </Link>

        <ReviewModuleList modules={listReviewModulesByCategory("basic")} showEs={showEs} />
      </div>
    </AppShell>
  );
}