import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { nextModuleAfter } from "@/lib/progress-moments";
import type { ModuleId } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";

/**
 * NEXT UP — what comes after a completed module. Published modules get a real
 * CTA; unpublished levels render as PRÓXIMAMENTE without a route.
 */
export function NextUp({ afterModuleId }: { afterModuleId: ModuleId }) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const next = nextModuleAfter(afterModuleId);
  if (!next) return null;

  const label = next.kind === "module" ? next.module.label : next.copy.label;
  const title = next.kind === "module" ? next.module.title : next.copy.title;

  return (
    <section className="rounded-3xl border-2 border-primary/40 bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        {next.kind === "module" ? (es ? "LO QUE VIENE" : "NEXT UP") : es ? "PRÓXIMO NIVEL" : "NEXT LEVEL"}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          {next.copy.emoji}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{label}</p>
          <p className="text-[26px] font-extrabold leading-none tracking-tight">{title}</p>
        </div>
      </div>
      <p className="mt-3 text-[16px] font-extrabold leading-snug tracking-tight">
        {es ? next.copy.promise.es : next.copy.promise.en}
      </p>

      {next.kind === "module" ? (
        <>
          <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {es ? `En ${title} vas a practicar cómo:` : `In ${title} you will practice how to:`}
          </p>
          <ul className="mt-1.5 space-y-1 text-[14px] font-semibold">
            {next.copy.items.map((item) => (
              <li key={item.en}>✓ {es ? item.es : item.en}</li>
            ))}
          </ul>
          <Link
            to="/module/$moduleId"
            params={{ moduleId: next.module.id }}
            className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[14px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
          >
            {es ? `EMPEZAR ${title}` : `START ${title}`} <ArrowRight className="size-4" />
          </Link>
        </>
      ) : (
        <>
          <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.16em] text-primary">
            {es ? "PRÓXIMAMENTE" : "COMING SOON"}
          </p>
          <ul className="mt-1.5 space-y-1 text-[14px] font-semibold text-muted-foreground">
            {next.copy.items.map((item) => (
              <li key={item.en}>✓ {es ? item.es : item.en}</li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] font-semibold text-muted-foreground">
            {es
              ? "Mientras tanto, sigue practicando tus grabaciones y repasa tus mejores Reps."
              : "In the meantime, keep practicing your recordings and revisit your best Reps."}
          </p>
        </>
      )}
    </section>
  );
}
