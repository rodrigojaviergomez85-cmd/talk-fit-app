import { useT } from "@/lib/i18n";

/**
 * Compact legend explaining the -ed color code. Rendered only in the
 * Simple Past day-2 pilot where highlightEd is active.
 */
export function EdLegend() {
  const t = useT();
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {t("ed.legendTitle")}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-bold leading-snug">
        <span className="text-ed-t">/t/ · watchT</span>
        <span className="text-ed-d">/d/ · callD</span>
        <span className="text-ed-id">/-ed/ · wan-TED</span>
      </div>
      <p className="mt-1 text-[10px] leading-snug text-muted-foreground">{t("ed.legendNote")}</p>
    </div>
  );
}
