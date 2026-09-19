import { cn } from "@/lib/utils";

export const DAY_LABELS_ES = ["L", "M", "M", "J", "V", "S", "D"];
export const DAY_LABELS_EN = ["M", "T", "W", "T", "F", "S", "S"];
export const DAY_FULL_ES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
export const DAY_FULL_EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function DayChips({
  value,
  onChange,
  es,
}: {
  value: number[];
  onChange: (days: number[]) => void;
  es: boolean;
}) {
  const labels = es ? DAY_LABELS_ES : DAY_LABELS_EN;
  const full = es ? DAY_FULL_ES : DAY_FULL_EN;
  return (
    <div className="flex flex-wrap gap-1.5">
      {labels.map((label, i) => {
        const iso = i + 1;
        const active = value.includes(iso);
        return (
          <button
            key={iso}
            type="button"
            aria-pressed={active}
            aria-label={full[i]}
            onClick={() =>
              onChange(
                active ? value.filter((d) => d !== iso) : [...value, iso].sort((a, b) => a - b),
              )
            }
            className={cn(
              "size-10 rounded-full border text-[13px] font-bold transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function TimeChips({
  options,
  value,
  onChange,
  otherLabel,
}: {
  options: string[];
  value: string;
  onChange: (time: string) => void;
  otherLabel: string;
}) {
  const isCustom = !options.includes(value);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((time) => (
        <button
          key={time}
          type="button"
          aria-pressed={value === time}
          onClick={() => onChange(time)}
          className={cn(
            "min-h-[40px] rounded-full border px-4 text-[14px] font-bold tabular-nums transition-colors",
            value === time
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground",
          )}
        >
          {time}
        </button>
      ))}
      <label
        className={cn(
          "inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full border px-4 text-[14px] font-bold",
          isCustom ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background",
        )}
      >
        <span>{isCustom ? value : otherLabel}</span>
        <input
          type="time"
          aria-label={otherLabel}
          value={value}
          onChange={(e) => e.target.value && onChange(e.target.value)}
          className="sr-only"
        />
      </label>
    </div>
  );
}
