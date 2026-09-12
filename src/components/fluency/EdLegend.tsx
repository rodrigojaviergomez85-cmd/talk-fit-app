import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Compact legend explaining the -ed color code. Rendered only in the
 * Simple Past day-2 pilot where highlightEd is active.
 */
export function EdLegend({ collapsible = false }: { collapsible?: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  const legend = (
    <div className={cn("rounded-2xl border border-border bg-secondary/40 px-3 py-2", collapsible && "mt-1.5")}>
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

  if (!collapsible) return legend;

  return (
    <div>
      <Button
        type="button"
        variant="link"
        size="sm"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="h-auto min-h-[36px] px-0 py-1 text-[11px] font-bold"
      >
        {t("ed.colorHelp")}
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </Button>
      {open ? legend : null}
    </div>
  );
}
