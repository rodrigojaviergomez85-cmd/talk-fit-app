import type { Comparison } from "@/lib/progress-moments";
import { useAppLang } from "@/lib/i18n";
import { ComparisonPlayerCard } from "./ComparisonPlayerCard";

type Props = {
  comparison: Comparison;
  startCaption: string;
  endCaption: string;
  tone?: "card" | "navy";
};

/** Start vs end — stacked on mobile, side by side from 640px. Each side degrades independently. */
export function ComparisonPair({ comparison, startCaption, endCaption, tone = "card" }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const scope =
    comparison.type === "week"
      ? es
        ? "de esta semana"
        : "from this week"
      : es
        ? "de este módulo"
        : "from this module";

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <ComparisonPlayerCard
        caption={startCaption}
        side={comparison.start}
        tone={tone}
        missingText={
          es
            ? `Tu primera grabación ${scope} no está disponible. Sigue guardando tus Final Reps para escuchar tu progreso en las próximas semanas.`
            : `Your first recording ${scope} isn't available. Keep saving your Final Reps to hear your progress in the coming weeks.`
        }
      />
      <ComparisonPlayerCard
        caption={endCaption}
        side={comparison.end}
        tone={tone}
        missingText={
          es
            ? "No tenemos una grabación final para comparar esta vez."
            : "We don't have a final recording to compare this time."
        }
      />
    </div>
  );
}
