import { formatShortDate, recentDayKeys } from "@/lib/coach-check";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Last 7 calendar days, oldest first. Tapping a row selects that date. */
export function SevenDayHistory({
  counts,
  selected,
  onSelect,
  now = new Date(),
}: {
  counts: Map<string, number>;
  selected: string;
  onSelect: (key: string) => void;
  now?: Date;
}) {
  const { t, lang } = useAppLang();
  const keys = recentDayKeys(7, now).reverse();

  return (
    <section className="space-y-2">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("coach.last7")}</h2>
      <ul className="overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)]">
        {keys.map((key) => {
          const n = counts.get(key) ?? 0;
          const active = key === selected;
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onSelect(key)}
                aria-pressed={active}
                className={cn(
                  "flex min-h-[48px] w-full items-center justify-between border-b border-border px-4 text-[13px] font-bold uppercase tracking-[0.1em] last:border-b-0",
                  active ? "bg-accent text-accent-foreground" : "hover:bg-secondary",
                )}
              >
                <span>{formatShortDate(key, lang)}</span>
                <span className={cn("tabular-nums", n === 0 && "text-muted-foreground")}>
                  {n === 0 ? "—" : n === 1 ? "✅" : `✅ ${n}`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
