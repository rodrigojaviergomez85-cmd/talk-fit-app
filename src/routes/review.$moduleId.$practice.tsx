import { createFileRoute, Navigate } from "@tanstack/react-router";
import { AppShell } from "@/components/fluency/AppShell";
import { ReviewPracticeFlow } from "@/components/review/ReviewPracticeFlow";
import { useAppLang } from "@/lib/i18n";
import { getReviewModule, getReviewPractice } from "@/services/review/review-registry";

export const Route = createFileRoute("/review/$moduleId/$practice")({
  head: () => ({
    meta: [
      { title: "Práctica de Review · Fluency App" },
      { name: "description", content: "Cinco pasos hablados: entiéndelo, copia, shadowing, hazlo tuyo y tu turno con feedback de IA." },
      { property: "og:title", content: "Práctica de Review · Fluency App" },
      { property: "og:description", content: "Cinco pasos hablados: entiéndelo, copia, shadowing, hazlo tuyo y tu turno con feedback de IA." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReviewPracticePage,
});

function ReviewPracticePage() {
  const { moduleId, practice } = Route.useParams();
  const { lang } = useAppLang();
  const mod = getReviewModule(moduleId);
  const found = getReviewPractice(moduleId, Number(practice));

  if (!mod || !found) return <Navigate to="/review" replace />;

  return (
    <AppShell>
      <div className="p-4">
        <ReviewPracticeFlow moduleId={mod.id} practice={found} guide={mod.guide} showEs={lang === "es"} />
      </div>
    </AppShell>
  );
}
