import { useEffect, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import {
  getAdminSettings,
  updateAdminSettings,
  type AdminSectionRow,
  type AdminSettings,
} from "@/lib/admin-settings.functions";

/**
 * /admin/limites — interruptores de límites y cobro. Solo admins: el candado
 * real está en la base de datos (RLS + is_admin) y aquí en beforeLoad.
 */
export const Route = createFileRoute("/admin/limites")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/onboarding" });
    const { data: admin } = await supabase.rpc("is_admin", { p_user_id: data.user.id });
    if (admin !== true) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Administración de límites · Fluency App" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Panel interno para ajustar límites diarios y cobro." },
      { property: "og:title", content: "Administración de límites · Fluency App" },
      { property: "og:description", content: "Panel interno para ajustar límites diarios y cobro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLimitsPage,
});

function AdminLimitsPage() {
  const queryClient = useQueryClient();
  const load = useServerFn(getAdminSettings);
  const save = useServerFn(updateAdminSettings);

  const query = useQuery({
    queryKey: ["admin-settings"],
    queryFn: (): Promise<AdminSettings> => load({}),
    staleTime: 5_000,
  });

  const [limitsEnabled, setLimitsEnabled] = useState(true);
  const [billingEnabled, setBillingEnabled] = useState(true);
  const [multiplier, setMultiplier] = useState(4);
  const [sections, setSections] = useState<AdminSectionRow[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!query.data) return;
    setLimitsEnabled(query.data.limitsEnabled);
    setBillingEnabled(query.data.billingEnabled);
    setMultiplier(query.data.proMultiplier);
    setSections(query.data.sections);
  }, [query.data]);

  async function apply() {
    setSaving(true);
    try {
      await save({
        data: {
          limitsEnabled,
          billingEnabled,
          proMultiplier: multiplier,
          sections: sections.map((s) => ({ sectionKey: s.sectionKey, freeLimit: s.freeLimit, enabled: s.enabled })),
        },
      });
      toast.success("Cambios guardados. Ya aplican a todos los usuarios.");
      setConfirming(false);
      // Ajustes, topes y consumo se recalculan sin recargar.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-settings"] }),
        queryClient.invalidateQueries({ queryKey: ["daily-usage"] }),
        queryClient.invalidateQueries({ queryKey: ["section-limits"] }),
        queryClient.invalidateQueries({ queryKey: ["account-overview"] }),
      ]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  if (query.isLoading || !query.data) {
    return (
      <AppShell title="Administración">
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </AppShell>
    );
  }

  const preview = sections.map((s) => `${s.freeLimit} → ${s.freeLimit * multiplier}`).join(" · ");

  return (
    <AppShell title="Administración">
      <div className="space-y-4">
        <section className="space-y-3 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-[13px] font-extrabold">
            <ShieldCheck className="size-4 text-primary" /> Interruptores globales
          </div>

          <label className="flex items-start justify-between gap-3">
            <span>
              <span className="block text-[14px] font-bold">Sistema de límites diarios</span>
              <span className="block text-[12px] text-muted-foreground">Apagado: ningún usuario tiene tope.</span>
            </span>
            <Switch checked={limitsEnabled} onCheckedChange={setLimitsEnabled} />
          </label>

          <label className="flex items-start justify-between gap-3">
            <span>
              <span className="block text-[14px] font-bold">Cobro con Stripe</span>
              <span className="block text-[12px] text-muted-foreground">
                Apagado: se oculta la venta. Quienes ya pagaron conservan sus beneficios.
              </span>
            </span>
            <Switch checked={billingEnabled} onCheckedChange={setBillingEnabled} />
          </label>

          <div className="space-y-1">
            <span className="block text-[14px] font-bold">Multiplicador del plan Pro</span>
            <input
              type="number"
              min={1}
              max={100}
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
              className="w-24 rounded-xl border border-border bg-background px-3 py-2 text-[14px] font-semibold"
            />
            <p className="text-[12px] text-muted-foreground">{preview}</p>
          </div>
        </section>

        <section className="space-y-3 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Secciones</h2>
          {sections.map((s, i) => (
            <div key={s.sectionKey} className="space-y-2 rounded-2xl bg-secondary/50 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] font-bold">{s.label}</span>
                <Switch
                  checked={s.enabled}
                  onCheckedChange={(v) =>
                    setSections((prev) => prev.map((row, idx) => (idx === i ? { ...row, enabled: v } : row)))
                  }
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[12px] font-semibold text-muted-foreground">
                  Gratis
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    value={s.freeLimit}
                    onChange={(e) =>
                      setSections((prev) =>
                        prev.map((row, idx) => (idx === i ? { ...row, freeLimit: Number(e.target.value) } : row)),
                      )
                    }
                    className="ml-2 w-20 rounded-xl border border-border bg-background px-2 py-1 text-[14px] font-semibold text-foreground"
                  />
                </label>
                <span className="text-[12px] font-semibold text-muted-foreground">
                  Pro: {s.freeLimit * multiplier}
                </span>
              </div>
            </div>
          ))}
        </section>

        {confirming ? (
          <section className="space-y-3 rounded-3xl border border-destructive/40 bg-card p-4">
            <p className="text-[13px] font-semibold">
              Este cambio afecta a todos los usuarios de inmediato. ¿Confirmas?
            </p>
            <Button className="w-full" onClick={() => void apply()} disabled={saving}>
              {saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              Sí, aplicar cambios
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => setConfirming(false)} disabled={saving}>
              Cancelar
            </Button>
          </section>
        ) : (
          <Button className="w-full" onClick={() => setConfirming(true)}>
            Guardar cambios
          </Button>
        )}

        <p className="text-center text-[12px] text-muted-foreground">
          Último cambio:{" "}
          {query.data.updatedAt
            ? `${new Date(query.data.updatedAt).toLocaleString("es-ES")}${
                query.data.updatedByEmail ? ` · ${query.data.updatedByEmail}` : ""
              }`
            : "sin cambios registrados"}
        </p>

        {query.data.audit.length > 0 ? (
          <section className="space-y-2 rounded-3xl border border-border bg-card p-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Historial</h2>
            {query.data.audit.map((a, i) => (
              <p key={i} className="text-[12px] text-muted-foreground">
                {new Date(a.at).toLocaleString("es-ES")} · {a.scope}.{a.field}: {a.oldValue ?? "—"} → {a.newValue ?? "—"}
                {a.email ? ` · ${a.email}` : ""}
              </p>
            ))}
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
