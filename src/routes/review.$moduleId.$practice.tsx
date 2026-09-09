import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/fluency/AppShell";
import { ReviewPracticeFlow } from "@/components/review/ReviewPracticeFlow";
import { useAppLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { getReviewModule, getReviewPractice } from "@/services/review/review-registry";
import { ReviewProgress } from "@/services/review/review-progress";
import type { ReviewModuleId, ReviewPracticeNumber } from "@/lib/review-types";
import { hasUnlimitedAccess } from "@/lib/unlimited-access";
import { getReviewAccessSnapshot, isReviewModuleAccessible } from "@/services/review/review-access";

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
  const { loading, sync, user } = useAuth();
  const [access, setAccess] = useState<"checking" | "allowed" | "locked">("checking");

  useEffect(() => {
    if (!mod || !found || loading) return;
    const snapshot = getReviewAccessSnapshot();
    if (!isReviewModuleAccessible(mod, snapshot.currentModuleId, snapshot.unlimited)) {
      setAccess("locked");
      return;
    }
    if (found.number === 1 || hasUnlimitedAccess()) {
      setAccess("allowed");
      return;
    }
    let alive = true;
    void ReviewProgress.load(mod.id).then((rows) => {
      if (!alive) return;
      const prev = rows.find((r) => r.practiceNumber === ((found.number - 1) as ReviewPracticeNumber));
      setAccess((prev?.completedCount ?? 0) > 0 ? "allowed" : "locked");
    });
    return () => {
      alive = false;
    };
  }, [found, loading, mod, sync, user?.email]);

  if (!mod || !found) return <Navigate to="/review" replace />;
  if (access === "locked") {
    const snapshot = getReviewAccessSnapshot();
    if (!isReviewModuleAccessible(mod, snapshot.currentModuleId, snapshot.unlimited)) {
      return <Navigate to={mod.category === "basic" ? "/review/basic" : "/review/intermediate-advanced"} replace />;
    }
    return <Navigate to="/review/$moduleId" params={{ moduleId: mod.id as ReviewModuleId }} replace />;
  }
  if (access === "checking") return <AppShell><div className="p-4 text-sm text-muted-foreground">…</div></AppShell>;

  return <ReviewPracticeFlow moduleId={mod.id} practice={found} guide={mod.guide} showEs={lang === "es"} />;
}
