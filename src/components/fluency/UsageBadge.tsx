import { useDailyUsage } from "@/hooks/use-daily-usage";

/**
 * "3 / 5 intentos hoy" — always the server-decided cap for that section,
 * with a Pro tag when the multiplier is active.
 */
export function UsageBadge({ sectionKey, className }: { sectionKey: string; className?: string }) {
  const { used, limit, isPro, unlimited, isLoading } = useDailyUsage(sectionKey);
  if (isLoading || unlimited || limit <= 0) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground ${className ?? ""}`}
    >
      {used} / {limit} intentos hoy
      {isPro ? (
        <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
          Pro
        </span>
      ) : null}
    </span>
  );
}
