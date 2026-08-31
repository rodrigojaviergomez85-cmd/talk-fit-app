import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpanishAll } from "./TranslatableText";

type Props = {
  /** English label, defaults to HOW IT WORKS. */
  label?: string;
  labelEs?: string;
  children: ReactNode;
  className?: string;
};

/** Optional grammar / extra explanation. Always collapsed by default. */
export function CollapsibleHelp({ label = "How it works", labelEs = "Cómo funciona", children, className }: Props) {
  const [open, setOpen] = useState(false);
  const es = useSpanishAll();
  return (
    <div className={cn("overflow-hidden rounded-3xl border border-border bg-card", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left"
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {es ? labelEs : label}
        </span>
        <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open ? <div className="space-y-3 border-t border-border px-4 py-4">{children}</div> : null}
    </div>
  );
}

/** Compact "show / hide text" switch used to keep reps visual-first. */
export function TextToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const es = useSpanishAll();
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
    >
      {open ? (es ? "Ocultar texto" : "Hide text") : es ? "Ver texto" : "Show text"}
    </button>
  );
}
