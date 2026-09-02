import { useT } from "@/lib/i18n";

/** The existing pulse skeleton, shown while a module's content chunk downloads. */
export function ModuleSkeleton({ rows = 4, tall = false }: { rows?: number; tall?: boolean }) {
  return (
    <div className="space-y-3" aria-busy="true">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={tall && i === 0 ? "h-40 animate-pulse rounded-3xl bg-secondary" : "h-20 animate-pulse rounded-3xl bg-secondary"} />
      ))}
    </div>
  );
}

/** Recoverable error for a valid module whose chunk failed to download (e.g. offline). */
export function ModuleLoadError({ onRetry }: { onRetry: () => void }) {
  const t = useT();
  return (
    <div className="rounded-2xl border border-border bg-card p-4" role="alert">
      <p className="text-[13px] font-extrabold uppercase tracking-[0.14em]">{t("module.loadFailed")}</p>
      <p className="mt-1 text-[13px] font-semibold text-muted-foreground">{t("module.loadFailedBody")}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
      >
        {t("module.retry")}
      </button>
    </div>
  );
}
