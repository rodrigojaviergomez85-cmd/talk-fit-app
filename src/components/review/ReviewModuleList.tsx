import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import type { ModuleId } from "@/lib/types";
import type { ReviewModule } from "@/lib/review-types";
import {
  getReviewAccessSnapshot,
  isReviewModuleAccessible,
  reviewModuleRequirement,
} from "@/services/review/review-access";

type AccessSnapshot = { currentModuleId: ModuleId; unlimited: boolean };

export function ReviewModuleList({
  modules,
  showEs,
}: {
  modules: ReviewModule[];
  showEs: boolean;
}) {
  const [access, setAccess] = useState<AccessSnapshot | null>(null);
  const { loading, sync, user } = useAuth();

  useEffect(() => {
    if (loading) return;
    setAccess(getReviewAccessSnapshot());
  }, [loading, sync, user?.email]);

  return (
    <>
      <div className="space-y-3">
        {modules.map((mod) => {
          const allowed = access
            ? isReviewModuleAccessible(mod, access.currentModuleId, access.unlimited)
            : false;
          const requirement = reviewModuleRequirement(mod.id);
          const content = (
            <>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-extrabold text-foreground">{mod.title}</span>
                <span className="block text-sm text-muted-foreground">{mod.titleEs}</span>
                <span className="mt-2 block text-xs text-muted-foreground">
                  {allowed ? (showEs ? mod.subtitleEs : mod.subtitle) : (showEs ? requirement.es : requirement.en)}
                </span>
              </span>
              {allowed ? (
                <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <Lock className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
            </>
          );

          if (!allowed) {
            return (
              <div
                key={mod.id}
                aria-disabled="true"
                className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-border bg-card p-5 opacity-60"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={mod.id}
              to="/review/$moduleId"
              params={{ moduleId: mod.id }}
              className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
            >
              {content}
            </Link>
          );
        })}
      </div>

      <Button asChild variant="outline" className="min-h-[48px] w-full text-base font-bold">
        <Link to="/review">
          <ArrowLeft className="mr-2 size-4" /> {showEs ? "ATRÁS A REVIEW" : "BACK TO REVIEW"}
        </Link>
      </Button>
    </>
  );
}