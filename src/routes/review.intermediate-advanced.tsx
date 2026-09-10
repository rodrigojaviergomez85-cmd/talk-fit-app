import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { ReviewModuleList } from "@/components/review/ReviewModuleList";
import { useAppLang } from "@/lib/i18n";
import { listReviewModulesByCategory } from "@/services/review/review-registry";

export const Route = createFileRoute("/review/intermediate-advanced")({
  head: () => ({
    meta: [
      { title: "Intermediate + Advanced Review · Fluency App" },
      { name: "description", content: "Practice intermediate and advanced English structures after reaching Eagles." },
      { property: "og:title", content: "Intermediate + Advanced Review · Fluency App" },
      { property: "og:description", content: "Practice intermediate and advanced English structures after reaching Eagles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IntermediateAdvancedReviewPage,
});

function IntermediateAdvancedReviewPage() {
  const { lang } = useAppLang();
  const showEs = lang === "es";
  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <header>
          <p className="text-[11px] font-extrabold uppercase text-primary">Review</p>
          <h1 className="text-2xl font-extrabold text-foreground">Intermediate + Advanced</h1>
          <p className="text-sm text-muted-foreground">
            {showEs ? "Estos temas se desbloquean desde Eagles." : "These topics unlock from Eagles."}
          </p>
        </header>
        <Link
          to="/review/call-center"
          className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
        >
          <span className="min-w-0">
            <span className="block text-base font-extrabold text-foreground">
              {showEs ? "Frases para Call Center" : "Call Center Phrases"}
            </span>
            <span className="block text-xs text-muted-foreground">
              {showEs
                ? "48 frases útiles para llamadas, clientes molestos y trabajo diario."
                : "48 useful phrases for calls, upset customers and daily work."}
            </span>
          </span>
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
        </Link>

        <ReviewModuleList modules={listReviewModulesByCategory("intermediate-advanced")} showEs={showEs} />
      </div>
    </AppShell>
  );
}