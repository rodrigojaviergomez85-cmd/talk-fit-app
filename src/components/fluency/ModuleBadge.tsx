import type { ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import basicZero from "@/assets/badges/basic-zero.png";
import simpleFuture from "@/assets/badges/simple-future.png";
import simplePresent from "@/assets/badges/simple-present.png";
import pastStories from "@/assets/badges/past-stories.png";
import mixedTenses from "@/assets/badges/mixed-tenses.png";
import eagles from "@/assets/badges/eagles-week-1.png";
import tigers from "@/assets/badges/tigers.png";
import sharks from "@/assets/badges/sharks.png";
import advanced1 from "@/assets/badges/advanced-1.png";
import advanced2 from "@/assets/badges/advanced-2.png";
import advanced3 from "@/assets/badges/advanced-3.png";

/**
 * One animal emblem per module (flat modern badge). Presentation only:
 * nothing here affects progress, unlocks or saved data.
 */
export const MODULE_BADGE: Record<ModuleId, { src: string; es: string; en: string }> = {
  "basic-zero": { src: basicZero, es: "Emblema pollito", en: "Chick emblem" },
  "simple-future": { src: simpleFuture, es: "Emblema conejo", en: "Rabbit emblem" },
  "simple-present": { src: simplePresent, es: "Emblema abeja", en: "Bee emblem" },
  "past-stories": { src: pastStories, es: "Emblema elefante", en: "Elephant emblem" },
  "mixed-tenses": { src: mixedTenses, es: "Emblema zorro", en: "Fox emblem" },
  "eagles-week-1": { src: eagles, es: "Emblema águila", en: "Eagle emblem" },
  tigers: { src: tigers, es: "Emblema tigre", en: "Tiger emblem" },
  sharks: { src: sharks, es: "Emblema tiburón", en: "Shark emblem" },
  "advanced-1": { src: advanced1, es: "Emblema león", en: "Lion emblem" },
  "advanced-2": { src: advanced2, es: "Emblema lobo", en: "Wolf emblem" },
  "advanced-3": { src: advanced3, es: "Emblema fénix", en: "Phoenix emblem" },
};

const SIZES = { sm: "size-9", md: "size-12", lg: "size-16", xl: "size-14" } as const;

export function ModuleBadge({
  moduleId,
  size = "md",
  locked = false,
  es = true,
  className,
}: {
  moduleId: ModuleId;
  size?: keyof typeof SIZES;
  /** Not earned yet: shown in grey. */
  locked?: boolean;
  es?: boolean;
  className?: string;
}) {
  const badge = MODULE_BADGE[moduleId];
  if (!badge) return null;
  return (
    <img
      src={badge.src}
      alt={es ? badge.es : badge.en}
      loading="lazy"
      width={512}
      height={512}
      className={cn("shrink-0 object-contain", SIZES[size], locked && "opacity-40 grayscale", className)}
    />
  );
}
