import { createContext, useContext, useState, type ReactNode } from "react";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppLang } from "@/lib/i18n";
import { useAppLang } from "@/lib/i18n";

/** Session-level "show everything in Spanish" toggle. */
const SpanishContext = createContext(false);

export function SpanishProvider({ value, children }: { value: boolean; children: ReactNode }) {
  return <SpanishContext.Provider value={value}>{children}</SpanishContext.Provider>;
}

export function useSpanishAll() {
  return useContext(SpanishContext);
}

/**
 * Spanish LEARNING SUPPORT preference — independent from the app interface
 * language. Off by default so English stays dominant.
 */
export function useEsSupportPref(): [boolean, (value: boolean) => void] {
  const { prefs, setPrefs } = useAppLang();
  return [prefs.spanishSupport, (next: boolean) => setPrefs({ spanishSupport: next })];
}

type Props = {
  /** Spanish support text. */
  es?: string | undefined;
  children: ReactNode;
  /** Extra classes for the wrapper. */
  className?: string;
  /** Extra classes for the Spanish line. */
  esClassName?: string;
  /** Alignment of the Spanish line / ES button. */
  align?: "left" | "center";
  /**
   * Never render an individual ES button: the Spanish line only appears when
   * the global ES SUPPORT switch is on. Used for UI labels and instructions.
   */
  supportOnly?: boolean;
};

/**
 * Wraps English text with optional Spanish support. Key content (model
 * sentences, questions) keeps a small "ES" tap; everything else relies on the
 * single global ES SUPPORT control.
 */
export function TranslatableText({ es, children, className, esClassName, align = "left", supportOnly = false }: Props) {
  const forced = useSpanishAll();
  const uiEs = useAppLang().lang === "es";
  const [open, setOpen] = useState(false);
  const visible = forced || (!supportOnly && open);
  const showButton = !forced && !supportOnly;

  return (
    <div className={cn("w-full", className)}>
      {children}
      {es && (visible || showButton) ? (
        <div className={cn("mt-1.5 flex items-center gap-2", align === "center" && "justify-center")}>
          {showButton ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={visible}
              aria-label={visible ? "Ocultar la traducción al español" : "Ver la traducción al español"}
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                visible
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-secondary active:bg-secondary",
              )}
            >
              <Languages className="size-3" />
              ES · {visible ? (uiEs ? "OCULTAR" : "HIDE") : uiEs ? "TRADUCIR" : "TRANSLATE"}
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

/** Compact global ES SUPPORT switch shown once per lesson. */
export function SpanishToggle({
  value,
  onChange,
  className,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  className?: string;
}) {
  const { lang } = useAppLang();
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors",
        value ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground",
        className,
      )}
    >
      <Languages className="size-3.5" />
      {lang === "es" ? "Ayuda en español" : "Spanish support"} · {value ? (lang === "es" ? "sí" : "on") : "off"}
    </button>
  );
}
