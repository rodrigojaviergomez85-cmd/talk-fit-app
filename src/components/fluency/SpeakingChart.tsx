import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/** Final rep duration by practice date — how much the learner is speaking. */
export function SpeakingChart({ data }: { data: { label: string; seconds: number }[] }) {
  if (data.length < 3) return null;

  return (
    <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Speaking output over time
      </h2>
      <p className="mt-1 text-[12px] font-semibold text-muted-foreground">Final rep seconds per practice</p>
      <div className="mt-3 h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={40} />
            <Tooltip
              cursor={{ fill: "hsl(var(--secondary))" }}
              formatter={(value: number) => [`${value} sec`, "Final rep"]}
            />
            <Bar dataKey="seconds" radius={[6, 6, 0, 0]} fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
