import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { getHealthSnapshot } from "@/lib/admin-alerts.functions";
import { countBy, evaluateAlerts, overallLevel } from "@/lib/admin-alerts";

/**
 * Small status strip shown at the top of the admin screens.
 * Read-only: it never changes limits, billing or learner data.
 */
export function AdminAlertsBanner({ es = true }: { es?: boolean }) {
  const load = useServerFn(getHealthSnapshot);
  const query = useQuery({
    queryKey: ["admin-health-snapshot"],
    queryFn: () => load({}),
    staleTime: 60_000,
    retry: false,
  });

  if (!query.data) return null;
  const groups = evaluateAlerts(query.data);
  const level = overallLevel(groups);
  const warns = countBy(groups, "warn");
  const criticals = countBy(groups, "critical");

  const tone =
    level === "critical"
      ? "border-destructive/40 bg-destructive/10 text-destructive"
      : level === "warn"
        ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400"
        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";

  const text =
    level === "ok"
      ? es
        ? "Todo en orden"
        : "All clear"
      : es
        ? `${criticals} en rojo · ${warns} en amarillo`
        : `${criticals} critical · ${warns} warning`;

  return (
    <Link
      to="/admin/alertas"
      className={`mb-3 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${tone}`}
    >
      <span className="flex items-center gap-2">
        {level === "ok" ? <ShieldCheck className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
        {text}
      </span>
      <span className="text-xs underline">{es ? "Ver alertas" : "View alerts"}</span>
    </Link>
  );
}
