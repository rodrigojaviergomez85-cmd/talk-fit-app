import { createFileRoute } from "@tanstack/react-router";
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
        <ReviewModuleList modules={listReviewModulesByCategory("intermediate-advanced")} showEs={showEs} />
      </div>
    </AppShell>
  );
}