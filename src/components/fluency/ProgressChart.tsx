import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

type ProgressChartProps = {
  data: { day: number; score: number; label: string }[];
  className?: string;
};

export function ProgressChart({ data, className }: ProgressChartProps) {
  return (
    <div className={cn("h-52 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -22 }}>
          <CartesianGrid strokeDasharray="3 6" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
          <YAxis domain={[40, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
          <Tooltip
            contentStyle={{
              borderRadius: 14,
              border: "1px solid var(--color-border)",
              background: "var(--color-card)",
              fontSize: 13,
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--color-primary)"
            strokeWidth={3}
            dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
