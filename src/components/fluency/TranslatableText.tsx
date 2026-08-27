import { createContext, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Session-level "show everything in Spanish" toggle. */
const SpanishContext = createContext(false);

export function SpanishProvider({ value, children }: { value: boolean; children: ReactNode }) {
  return <SpanishContext.Provider value={value}>{children}</SpanishContext.Provider>;
}

export function useSpanishAll() {
  return useContext(SpanishContext);
}

type Props = {
  /** English text (already rendered by the caller as `children` when provided). */
  es?: string | undefined;
  children: ReactNode;
  /** Extra classes for the wrapper. */
  className?: string;
  /** Extra classes for the Spanish line. */
  esClassName?: string;
  /** Render the ES button inline next to the text instead of below. */
  align?: "left" | "center";
};

/**
 * Wraps any English text with a small "ES" button that reveals a hand-written
 * Spanish translation. A global toggle (SpanishProvider) can force it open.
 */
export function TranslatableText({ es, children, className, esClassName, align = "left" }: Props) {
  const forced = useSpanishAll();
  const [open, setOpen] = useState(false);
  const visible = forced || open;

  return (
    <div className={cn("w-full", className)}>
      {children}
      {es ? (
        <div className={cn("mt-1.5 flex items-center gap-2", align === "center" && "justify-center")}>
          {!forced ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={visible}
              className={cn(
                "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors",
                visible
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground active:bg-secondary",
              )}
            >
              ES
            </button>
          ) : null}
          {visible ? (
            <p className={cn("text-[13px] leading-snug text-muted-foreground", esClassName)}>{es}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function SpanishToggle({ value, onChange, className }: { value: boolean; onChange: (v: boolean) => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors",
        value ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground",
        className,
      )}
    >
      {value ? "Ocultar español" : "Mostrar todo en español"}
    </button>
  );
}
