import type { ModuleId } from "@/lib/types";
import type { ReviewModule, ReviewModuleId } from "@/lib/review-types";
import { hasUnlimitedAccess } from "@/lib/unlimited-access";
import { CourseService } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";

export type ReviewCategory = "basic" | "intermediate-advanced";

export function isReviewModuleAccessible(
  reviewModule: Pick<ReviewModule, "minimumModuleId">,
  currentModuleId: ModuleId,
  unlimited = false,
): boolean {
  if (unlimited) return true;
  return CourseService.displayIndex(currentModuleId) >= CourseService.displayIndex(reviewModule.minimumModuleId);
}

export function getReviewAccessSnapshot(): { currentModuleId: ModuleId; unlimited: boolean } {
  const state = JourneyService.load();
  return {
    currentModuleId: JourneyService.currentModule(state),
    unlimited: hasUnlimitedAccess(),
  };
}

export function reviewCategoryPath(category: ReviewCategory): "/review/basic" | "/review/intermediate-advanced" {
  return category === "basic" ? "/review/basic" : "/review/intermediate-advanced";
}

export function reviewModuleRequirement(moduleId: ReviewModuleId): { en: string; es: string } {
  switch (moduleId) {
    case "review-simple-future":
      return { en: "Available from Basic 1", es: "Disponible desde Basic 1" };
    case "review-simple-present":
    case "review-present-progressive":
      return { en: "Available from Basic 2", es: "Disponible desde Basic 2" };
    case "review-simple-past":
    case "review-past-progressive":
      return { en: "Available from Basic 3", es: "Disponible desde Basic 3" };
    default:
      return { en: "Available from Eagles", es: "Disponible desde Eagles" };
  }
}