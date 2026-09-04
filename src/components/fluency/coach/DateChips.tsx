import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatShortDate, fromDayKey, recentDayKeys, toDayKey } from "@/lib/coach-check";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Quick calendar-date chips: TODAY · YESTERDAY · 5 previous dates · OTHER DATE.
 * Only today and past dates can be picked.
 */
export function DateChips({
  selected,
  onSelect,
  now = new Date(),
}: {
  selected: string;
  onSelect: (key: string) => void;
  now?: Date;
}) {
  const { t, lang } = useAppLang();
  const [open, setOpen] = useState(false);
  const keys = recentDayKeys(7, now);
  const todayKey = keys[0] ?? toDayKey(now);
  const inChips = keys.includes(selected);

  const chip = (key: string, label: string) => (
    <button
      key={key}
      type="button"
      onClick={() => onSelect(key)}
      aria-pressed={selected === key}
      className={cn(
        "min-h-[44px] shrink-0 rounded-2xl border px-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
        selected === key
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-secondary",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {keys.map((key, i) =>
        chip(key, i === 0 ? t("coach.today") : i === 1 ? t("coach.yesterday") : formatShortDate(key, lang)),
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-pressed={!inChips}
            className={cn(
              "inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl border px-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
              !inChips
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary",
            )}
          >
            <CalendarDays className="size-4" />
            {inChips ? t("coach.otherDate") : formatShortDate(selected, lang)}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={fromDayKey(selected)}
            defaultMonth={fromDayKey(selected)}
            disabled={{ after: fromDayKey(todayKey) }}
            onSelect={(date) => {
              if (!date) return;
              onSelect(toDayKey(date));
              setOpen(false);
            }}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
