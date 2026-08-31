import { useAuth } from "@/lib/auth";
import { useT } from "@/lib/i18n";

/**
 * Honest sync status: nothing is called "saved" before the backend confirms it.
 */
export function SyncBanner() {
  const { user, sync, retrySync } = useAuth();
  const t = useT();
  if (!user || sync === "idle") return null;

  if (sync === "failed") {
    return (
      <div className="mb-3 space-y-2 rounded-2xl border border-destructive/30 bg-card p-3 text-center">
        <p className="text-[13px] font-semibold">{t("sync.failed")}</p>
        <button
          type="button"
          onClick={retrySync}
          className="min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
        >
          {t("sync.retry")}
        </button>
      </div>
    );
  }

  return (
    <p
      className="mb-3 rounded-2xl bg-secondary px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
      aria-live="polite"
    >
      {sync === "syncing" ? t("sync.syncing") : t("sync.ready")}
    </p>
  );
}
