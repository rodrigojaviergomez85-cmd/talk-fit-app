import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { AdminNav } from "@/components/fluency/AdminNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { getHealthSnapshot, saveThreshold } from "@/lib/admin-alerts.functions";
import {
  countBy,
  evaluateAlerts,
  overallLevel,
  type AlertLevel,
  type Signal,
} from "@/lib/admin-alerts";

/**
 * /admin/alertas — alertas internas de gasto y salud. Solo lectura salvo los
 * umbrales, que se guardan en alert_thresholds (RLS de admin en la base).
 */
export const Route = createFileRoute("/admin/alertas")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/onboarding" });
    const { data: admin } = await supabase.rpc("is_admin", { p_user_id: data.user.id });
    if (admin !== true) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Alertas de gasto y salud · Fluency App" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Panel interno de alertas de gasto de IA, archivos, picos de uso y salud de la base." },
      { property: "og:title", content: "Alertas de gasto y salud · Fluency App" },
      { property: "og:description", content: "Panel interno de alertas de gasto de IA, archivos, picos de uso y salud de la base." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminAlertsPage,
});

const toneFor: Record<AlertLevel, string> = {
  ok: "border-emerald-500/30 bg-emerald-500/5",
  warn: "border-amber-500/40 bg-amber-500/10",
  critical: "border-destructive/40 bg-destructive/10",
};

const badgeFor: Record<AlertLevel, string> = {
  ok: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  warn: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
  critical: "bg-destructive/15 text-destructive",
};

const labelFor: Record<AlertLevel, string> = { ok: "OK", warn: "Atención", critical: "Urgente" };

function SignalRow({
  signal,
  onSave,
  saving,
}: {
  signal: Signal;
  onSave: (key: string, warn: number, critical: number) => void;
  saving: boolean;
}) {
  const editable = signal.warn > 0 || signal.critical > 0;
  const [warn, setWarn] = useState(String(signal.warn));
  const [critical, setCritical] = useState(String(signal.critical));

  return (
    <div className="rounded-2xl bg-background/70 p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{signal.label.es}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeFor[signal.level]}`}>
          {signal.display}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{signal.hint.es}</p>
      {editable ? (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <label className="text-xs text-muted-foreground">Amarillo</label>
          <Input
            className="h-8 w-20"
            inputMode="decimal"
            value={warn}
            onChange={(e) => setWarn(e.target.value)}
            aria-label={`Umbral amarillo de ${signal.label.es}`}
          />
          <label className="text-xs text-muted-foreground">Rojo</label>
          <Input
            className="h-8 w-20"
            inputMode="decimal"
            value={critical}
            onChange={(e) => setCritical(e.target.value)}
            aria-label={`Umbral rojo de ${signal.label.es}`}
          />
          <Button
            size="sm"
            variant="secondary"
            disabled={saving}
            onClick={() => onSave(signal.key, Number(warn), Number(critical))}
          >
            Guardar
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function AdminAlertsPage() {
  const queryClient = useQueryClient();
  const load = useServerFn(getHealthSnapshot);
  const save = useServerFn(saveThreshold);

  const query = useQuery({
    queryKey: ["admin-health-snapshot"],
    queryFn: () => load({}),
    staleTime: 60_000,
  });

  const mutation = useMutation({
    mutationFn: (input: { key: string; warn: number; critical: number }) => save({ data: input }),
    onSuccess: async () => {
      toast.success("Umbral guardado");
      await queryClient.invalidateQueries({ queryKey: ["admin-health-snapshot"] });
    },
    onError: () => toast.error("No se pudo guardar el umbral"),
  });

  const handleSave = (key: string, warn: number, critical: number) => {
    if (!Number.isFinite(warn) || !Number.isFinite(critical) || warn < 0 || critical < 0) {
      toast.error("Usa números válidos");
      return;
    }
    mutation.mutate({ key, warn, critical });
  };

  const groups = query.data ? evaluateAlerts(query.data) : [];
  const level = groups.length ? overallLevel(groups) : "ok";

  return (
    <AppShell title="Alertas">
      <AdminNav />
      <div className="space-y-3 pb-6">
        <div className="flex items-center justify-between gap-3">
          <div className={`flex flex-1 items-center gap-2 rounded-2xl border px-4 py-3 ${toneFor[level]}`}>
            {level === "ok" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <span className="text-sm font-semibold">
              {level === "ok"
                ? "Todo en orden / All clear"
                : `${countBy(groups, "critical")} en rojo · ${countBy(groups, "warn")} en amarillo`}
            </span>
          </div>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Actualizar"
            onClick={() => void query.refetch()}
            disabled={query.isFetching}
          >
            {query.isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>

        {query.isLoading ? (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-3xl bg-secondary" />
            ))}
          </div>
        ) : query.isError ? (
          <p className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            No se pudieron cargar las alertas. / Could not load alerts.
          </p>
        ) : (
          groups.map((group) => (
            <section key={group.key} className={`rounded-3xl border p-4 ${toneFor[group.level]}`}>
              <header className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-base font-semibold">{group.title.es}</h2>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeFor[group.level]}`}>
                  {labelFor[group.level]}
                </span>
              </header>
              <p className="mb-2 text-xs text-muted-foreground">{group.title.en}</p>
              <div className="space-y-2">
                {group.signals.map((signal) => (
                  <SignalRow
                    key={signal.key}
                    signal={signal}
                    onSave={handleSave}
                    saving={mutation.isPending}
                  />
                ))}
              </div>
            </section>
          ))
        )}

        {query.data ? (
          <p className="pt-1 text-center text-xs text-muted-foreground">
            Datos de {new Date(query.data.generated_at).toLocaleString()}
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}
