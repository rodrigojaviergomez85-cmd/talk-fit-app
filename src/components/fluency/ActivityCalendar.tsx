import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getAdminDailyActivity } from "@/lib/admin-daily-activity.functions";
import {
  addDays,
  addMonths,
  dateToKey,
  keyToDate,
  longDayLabel,
  monthLabel,
  normalizeCustomRange,
  rangeLabel,
  resolveRange,
  shortDayLabel,
  summarize,
  todayKey,
  type DailyActivity,
  type DailyActivityDay,
  type RangeKey,
} from "@/lib/admin-daily-activity";

const RANGES: { key: RangeKey; en: string; es: string }[] = [
  { key: "7", en: "7 days", es: "7 días" },
  { key: "15", en: "15 days", es: "15 días" },
  { key: "30", en: "30 days", es: "30 días" },
  { key: "month", en: "By month", es: "Mes por mes" },
];

function emptyDay(day: string): DailyActivityDay {
  const zero = { users: 0, count: 0 };
  return { day, active_users: 0, new_users: 0, practice: zero, story: zero, interview: zero, review: zero, coach: zero };
}

function Square({
  day,
  selected,
  max,
  es,
  onSelect,
}: {
  day: DailyActivityDay;
  selected: boolean;
  max: number;
  es: boolean;
  onSelect: () => void;
}) {
  const intensity = max > 0 ? Math.min(1, day.active_users / max) : 0;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-h-[64px] flex-1 flex-col items-center justify-center rounded-2xl border px-1 py-2 transition ${
        selected ? "border-primary ring-2 ring-primary/40" : "border-border"
      }`}
      style={{ backgroundColor: `color-mix(in srgb, var(--color-primary) ${Math.round(intensity * 55)}%, transparent)` }}
    >
      <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
        {shortDayLabel(day.day, es ? "es" : "en")}
      </span>
      <span className="text-[17px] font-black leading-tight text-foreground">{day.active_users}</span>
      <span className="text-[9px] font-semibold leading-tight text-muted-foreground">
        {es ? "+" : "+"}
        {day.new_users} {es ? "nuevos" : "new"}
      </span>
    </button>
  );
}

function DetailRow({ label, source }: { label: string; source: { users: number; count: number } }) {
  return (
    <div className="flex items-baseline justify-between gap-2 rounded-2xl bg-secondary/60 px-3 py-2">
      <span className="text-[12px] font-semibold text-foreground">{label}</span>
      <span className="text-[12px] font-bold text-muted-foreground">
        {source.users} · {source.count}
      </span>
    </div>
  );
}

/** Admin-only daily activity calendar: last 7 days + range chart + day detail. */
export function ActivityCalendar({ es }: { es: boolean }) {
  const load = useServerFn(getAdminDailyActivity);
  const today = todayKey();

  const [range, setRange] = useState<RangeKey>("7");
  const [monthAnchor, setMonthAnchor] = useState<string>(today.slice(0, 7));
  const [rangeData, setRangeData] = useState<DailyActivity | null>(null);
  const [weekData, setWeekData] = useState<DailyActivity | null>(null);
  const [selected, setSelected] = useState<string>(today);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<DateRange | undefined>(undefined);
  const [customBounds, setCustomBounds] = useState<{ from: string; to: string } | null>(null);
  const [customData, setCustomData] = useState<DailyActivity | null>(null);
  const [customBusy, setCustomBusy] = useState(false);

  const bounds = useMemo(() => resolveRange(range, monthAnchor, today), [range, monthAnchor, today]);

  const fetchAll = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const [week, rangeRes] = await Promise.all([
        load({ data: { from: addDays(today, -6), to: today } }),
        load({ data: { from: bounds.from, to: bounds.to } }),
      ]);
      setWeekData(week);
      setRangeData(rangeRes);
    } catch {
      setError(es ? "No se pudo cargar la actividad." : "Could not load activity.");
    } finally {
      setBusy(false);
    }
  }, [load, today, bounds.from, bounds.to, es]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (!customBounds) {
      setCustomData(null);
      return;
    }
    let active = true;
    setCustomBusy(true);
    void load({ data: { from: customBounds.from, to: customBounds.to } })
      .then((res) => {
        if (active) setCustomData(res);
      })
      .catch(() => {
        if (active) setError(es ? "No se pudo cargar el periodo." : "Could not load the period.");
      })
      .finally(() => {
        if (active) setCustomBusy(false);
      });
    return () => {
      active = false;
    };
  }, [load, customBounds, es]);

  const onPick = (next: DateRange | undefined) => {
    setPicked(next);
    if (next?.from && next.to) {
      setCustomBounds(normalizeCustomRange(dateToKey(next.from), dateToKey(next.to)));
    }
  };

  const weekDays = weekData?.days ?? [];
  const rangeDays = rangeData?.days ?? [];
  const customDays = customData?.days ?? [];
  const maxWeek = weekDays.reduce((m, d) => Math.max(m, d.active_users), 0);
  const maxCustom = customDays.reduce((m, d) => Math.max(m, d.active_users), 0);
  const summary = summarize(rangeDays);
  const customSummary = summarize(customDays);

  const detail =
    weekDays.find((d) => d.day === selected) ??
    customDays.find((d) => d.day === selected) ??
    rangeDays.find((d) => d.day === selected) ??
    emptyDay(selected);

  const chartData = rangeDays.map((d) => ({
    day: d.day,
    label: shortDayLabel(d.day, es ? "es" : "en"),
    active: d.active_users,
  }));

  const canGoNext = monthAnchor < today.slice(0, 7);

  return (
    <section className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {es ? "Calendario de actividad" : "Activity calendar"}
      </h2>

      {error ? <p className="mb-2 text-[13px] font-semibold text-primary">{error}</p> : null}

      {/* 1. Last 7 days */}
      <div className="flex gap-1.5" aria-busy={busy}>
        {(weekDays.length > 0
          ? weekDays
          : Array.from({ length: 7 }, (_, i) => emptyDay(addDays(today, -(6 - i))))
        ).map((d) => (
          <Square
            key={d.day}
            day={d}
            selected={d.day === selected}
            max={maxWeek}
            es={es}
            onSelect={() => setSelected(d.day)}
          />
        ))}
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {es ? "Estudiantes activos por día (últimos 7 días)" : "Active students per day (last 7 days)"}
      </p>

      {/* 2. Range chart */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {RANGES.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setRange(r.key)}
            className={`min-h-[36px] rounded-2xl border px-3 text-[11px] font-bold uppercase tracking-[0.1em] ${
              range === r.key ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {es ? r.es : r.en}
          </button>
        ))}
      </div>

      {range === "month" ? (
        <div className="mt-2 flex items-center justify-between gap-2">
          <button
            type="button"
            aria-label={es ? "Mes anterior" : "Previous month"}
            onClick={() => setMonthAnchor((m) => addMonths(m, -1))}
            className="flex size-9 items-center justify-center rounded-2xl border border-border"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <span className="text-[13px] font-bold capitalize text-foreground">{monthLabel(monthAnchor, es ? "es" : "en")}</span>
          <button
            type="button"
            aria-label={es ? "Mes siguiente" : "Next month"}
            disabled={!canGoNext}
            onClick={() => setMonthAnchor((m) => addMonths(m, 1))}
            className="flex size-9 items-center justify-center rounded-2xl border border-border disabled:opacity-40"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      ) : null}

      <div className="mt-3 h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 8, bottom: 0, left: -18 }}
            onClick={(state: { activeLabel?: string | number }) => {
              const idx = chartData.findIndex((p) => p.label === String(state?.activeLabel ?? ""));
              if (idx >= 0) setSelected(chartData[idx]!.day);
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 10 }} allowDecimals={false} width={34} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 12 }}
              labelFormatter={(l) => String(l)}
              formatter={(v) => [String(v), es ? "Activos" : "Active"]}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-secondary/60 p-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {es ? "Promedio/día" : "Avg/day"}
          </p>
          <p className="text-[16px] font-black">{summary.avgActive ?? "—"}</p>
        </div>
        <div className="rounded-2xl bg-secondary/60 p-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {es ? "Mejor día" : "Best day"}
          </p>
          <p className="text-[16px] font-black">{summary.bestDay?.active_users ?? "—"}</p>
        </div>
        <div className="rounded-2xl bg-secondary/60 p-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {es ? "Días con actividad" : "Active days"}
          </p>
          <p className="text-[16px] font-black">{summary.daysWithActivity}</p>
        </div>
      </div>

      {/* 3. Custom period picker */}
      <div className="mt-5 border-t border-border pt-4">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {es ? "Elegir periodo" : "Pick a period"}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex min-h-[40px] items-center gap-2 rounded-2xl border border-border px-3 text-[12px] font-bold text-foreground"
              >
                <CalendarDays className="size-4 text-primary" aria-hidden />
                {customBounds
                  ? rangeLabel(customBounds.from, customBounds.to, es ? "es" : "en")
                  : es
                    ? "Seleccionar fechas"
                    : "Select dates"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={customBounds ? keyToDate(customBounds.from) : keyToDate(today)}
                selected={picked}
                onSelect={onPick}
                disabled={{ after: keyToDate(today) }}
                initialFocus
                className="pointer-events-auto p-3"
              />
            </PopoverContent>
          </Popover>
          {customBounds ? (
            <button
              type="button"
              onClick={() => {
                setCustomBounds(null);
                setPicked(undefined);
              }}
              className="min-h-[40px] rounded-2xl border border-border px-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
            >
              {es ? "Limpiar" : "Clear"}
            </button>
          ) : null}
        </div>

        {customBounds ? (
          <div aria-busy={customBusy}>
            <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
              {customDays.map((d) => (
                <Square
                  key={`c-${d.day}`}
                  day={d}
                  selected={d.day === selected}
                  max={maxCustom}
                  es={es}
                  onSelect={() => setSelected(d.day)}
                />
              ))}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {es ? "Usuarios únicos por día en el periodo" : "Unique users per day in the period"}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-secondary/60 p-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {es ? "Promedio/día" : "Avg/day"}
                </p>
                <p className="text-[16px] font-black">{customSummary.avgActive ?? "—"}</p>
              </div>
              <div className="rounded-2xl bg-secondary/60 p-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {es ? "Mejor día" : "Best day"}
                </p>
                <p className="text-[16px] font-black">{customSummary.bestDay?.active_users ?? "—"}</p>
              </div>
              <div className="rounded-2xl bg-secondary/60 p-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {es ? "Días con actividad" : "Active days"}
                </p>
                <p className="text-[16px] font-black">{customSummary.daysWithActivity}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>



      {/* 3. Day detail */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[13px] font-black capitalize text-foreground">{longDayLabel(detail.day, es ? "es" : "en")}</h3>
          <span className="text-[12px] font-bold text-primary">
            {detail.active_users} {es ? "estudiantes activos" : "active students"}
          </span>
        </div>
        <p className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          {es ? "estudiantes · total" : "students · total"}
        </p>
        <DetailRow label={es ? "Prácticas de módulos" : "Module practices"} source={detail.practice} />
        <DetailRow label={es ? "El Mundo de Vale" : "Vale's World"} source={detail.story} />
        <DetailRow label={es ? "Simulador de entrevistas" : "Interview simulator"} source={detail.interview} />
        <DetailRow label="Review" source={detail.review} />
        <DetailRow label={es ? "Coach IA" : "AI Coach"} source={detail.coach} />
      </div>
    </section>
  );
}
