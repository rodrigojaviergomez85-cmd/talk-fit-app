import { useState } from "react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { CreditCard, ExternalLink, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { localDayKey } from "@/services/practice-attempts";
import { getAccountOverview, customerPortal, type AccountOverview } from "@/lib/account.functions";
import { createCheckoutSession } from "@/lib/subscription.functions";
import { PRO_PRICE_LABEL } from "@/config/limits";

/**
 * /cuenta — consumo (todos) y facturación (solo con suscripción o pagos).
 * La protección vive en beforeLoad: nunca en el componente.
 */
export const Route = createFileRoute("/cuenta")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/onboarding" });
  },
  head: () => ({
    meta: [
      { title: "Mi cuenta · Fluency App" },
      { name: "description", content: "Revisa tu consumo diario por sección, tu plan y tu historial de pagos." },
      { property: "og:title", content: "Mi cuenta · Fluency App" },
      { property: "og:description", content: "Consumo diario, plan Pro y facturación de Fluency App." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CuentaPage,
});

const money = (cents: number, currency: string) =>
  `$${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;

const longDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : "—";

const shortDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) : "—";

const STATUS_LABEL: Record<string, string> = {
  active: "Activa",
  trialing: "En periodo de prueba",
  past_due: "Vencida",
  unpaid: "Vencida",
  canceled: "Cancelada",
  incomplete: "Pendiente",
  incomplete_expired: "Vencida",
};

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      {title ? (
        <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

function CuentaPage() {
  const queryClient = useQueryClient();
  const load = useServerFn(getAccountOverview);
  const openPortal = useServerFn(customerPortal);
  const startCheckout = useServerFn(createCheckoutSession);
  const [busy, setBusy] = useState<"portal" | "checkout" | null>(null);

  const query = useQuery({
    queryKey: ["account-overview", localDayKey()],
    queryFn: (): Promise<AccountOverview> => load({ data: { localDayKey: localDayKey() } }),
    staleTime: 15_000,
  });

  async function subscribe() {
    setBusy("checkout");
    try {
      const { url } = await startCheckout({});
      window.location.href = url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo iniciar el pago");
      setBusy(null);
    }
  }

  async function manage() {
    setBusy("portal");
    try {
      const { url } = await openPortal({});
      window.location.href = url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo abrir la facturación");
      setBusy(null);
    }
  }

  if (query.isError) {
    return (
      <AppShell title="Mi cuenta">
        <Card>
          <p className="text-sm text-foreground">
            No pudimos cargar tu consumo y tu facturación. Revisa tu conexión e inténtalo de nuevo.
          </p>
          <button
            type="button"
            onClick={() => void query.refetch()}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Reintentar
          </button>
        </Card>
      </AppShell>
    );
  }

  if (query.isLoading || !query.data) {
    return (
      <AppShell title="Mi cuenta">
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-3xl bg-secondary/60" />
          ))}
        </div>
      </AppShell>
    );
  }

  const { settings, subscription, sections, history, payments, isAdmin } = query.data;
  const isPro = subscription.subscribed;
  // Solo mostramos facturación cuando hay suscripción activa o pagos reales.
  const hasBilling = subscription.subscribed || payments.length > 0;

  // La tarjeta más cercana al tope lleva el botón de venta.
  const closest = sections
    .filter((s) => !s.unlimited && s.limit > 0)
    .sort((a, b) => b.used / b.limit - a.used / a.limit)[0];

  const days = Array.from(new Set(history.map((h) => h.dayKey))).sort();
  const totalByDay = days.map((d) => ({
    day: d,
    total: history.filter((h) => h.dayKey === d).reduce((sum, h) => sum + h.used, 0),
  }));
  const maxDay = Math.max(1, ...totalByDay.map((d) => d.total));

  return (
    <AppShell title="Mi cuenta">
      <div className="space-y-5">
        {/* ---------- PARTE A: Mi consumo ---------- */}
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-bold ${
                  isPro ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                {isPro ? <Sparkles className="size-3.5" /> : null}
                {isPro ? "Pro" : "Gratis"}
              </span>
              {isPro ? (
                <p className="mt-2 text-[13px] font-semibold text-foreground">
                  Tus límites están multiplicados x{settings.proMultiplier}
                </p>
              ) : null}
              <p className="mt-1 text-[12px] text-muted-foreground">
                {settings.limitsEnabled
                  ? "Los contadores se reinician a medianoche (tu hora local)."
                  : "Los límites diarios están desactivados por ahora."}
              </p>
            </div>
            {isAdmin ? (
              <Link
                to="/admin/limites"
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-[12px] font-bold"
              >
                <ShieldCheck className="size-3.5" /> Administración
              </Link>
            ) : null}
          </div>
        </Card>

        <div className="space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Mi consumo de hoy</h2>
          {sections.map((s) => {
            const ratio = s.unlimited || s.limit <= 0 ? 0 : Math.min(1, s.used / s.limit);
            const barColor = ratio >= 1 ? "bg-destructive" : ratio >= 0.7 ? "bg-amber-500" : "bg-primary";
            return (
              <Card key={s.sectionKey}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[14px] font-extrabold">{s.label}</p>
                  <p className="text-[13px] font-semibold text-muted-foreground">
                    {s.unlimited ? "Sin límite" : `${s.used} / ${s.limit}`}
                  </p>
                </div>
                {!s.unlimited ? (
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${Math.max(2, Math.round(ratio * 100))}%` }}
                    />
                  </div>
                ) : null}
                {!s.unlimited && s.used >= s.limit ? (
                  <p className="text-[12px] font-semibold text-destructive">Límite alcanzado, se reinicia mañana.</p>
                ) : null}
                {!isPro && !s.unlimited && settings.billingEnabled ? (
                  <>
                    <p className="text-[12px] text-muted-foreground">
                      Con Pro: {s.freeLimit * settings.proMultiplier} al día
                    </p>
                    {closest && closest.sectionKey === s.sectionKey ? (
                      <Button className="w-full" onClick={() => void subscribe()} disabled={busy !== null}>
                        {busy === "checkout" ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                        Suscribirme por ${PRO_PRICE_LABEL}/mes
                      </Button>
                    ) : null}
                  </>
                ) : null}
              </Card>
            );
          })}
        </div>

        <Card title="Últimos 7 días">
          {totalByDay.length === 0 || totalByDay.every((d) => d.total === 0) ? (
            <p className="text-[13px] text-muted-foreground">Aún no hay actividad registrada.</p>
          ) : (
            <div className="space-y-2">
              {totalByDay.map((d) => (
                <div key={d.day} className="space-y-1">
                  <div className="flex items-baseline justify-between text-[12px] font-semibold">
                    <span>{shortDate(d.day)}</span>
                    <span className="text-muted-foreground">{d.total} usos</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.max(2, Math.round((d.total / maxDay) * 100))}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {history
                      .filter((h) => h.dayKey === d.day && h.used > 0)
                      .map((h) => `${sections.find((s) => s.sectionKey === h.sectionKey)?.label ?? h.sectionKey}: ${h.used}`)
                      .join(" · ") || "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* ---------- PARTE B: Facturación ---------- */}
        {hasBilling ? (
          <>
            <Card title="Mi suscripción">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[12px] font-bold">
                {STATUS_LABEL[subscription.status ?? ""] ?? (subscription.subscribed ? "Activa" : "Cancelada")}
              </span>
              <p className="text-[14px] font-extrabold">
                Pro — ${PRO_PRICE_LABEL} / mes · límites x{settings.proMultiplier} en todas las secciones
              </p>
              <ul className="space-y-1 text-[13px] text-muted-foreground">
                {sections.map((s) => (
                  <li key={s.sectionKey}>
                    {s.label}: {s.freeLimit * settings.proMultiplier}
                  </li>
                ))}
              </ul>
              {subscription.cancelAtPeriodEnd ? (
                <p className="text-[13px] font-semibold text-foreground">
                  Tu suscripción termina el {longDate(subscription.currentPeriodEnd)} y no se renovará. Después volverás a
                  los límites del plan gratuito.
                </p>
              ) : (
                <p className="text-[13px] font-semibold text-foreground">
                  Próximo cobro: {longDate(subscription.currentPeriodEnd)}
                </p>
              )}
              <Button variant="secondary" className="w-full" onClick={() => void manage()} disabled={busy !== null}>
                {busy === "portal" ? <Loader2 className="mr-2 size-4 animate-spin" /> : <CreditCard className="mr-2 size-4" />}
                Administrar suscripción
              </Button>
            </Card>

            <Card title="Historial de pagos">
              {payments.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">Aún no hay pagos registrados.</p>
              ) : (
                <div className="space-y-3">
                  {payments.map((p) => (
                    <div key={p.id} className="space-y-1 rounded-2xl bg-secondary/50 p-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-extrabold">{longDate(p.paidAt)}</span>
                        <span className="text-[13px] font-semibold">{money(p.amount, p.currency)}</span>
                      </div>
                      <p className="text-[12px] text-muted-foreground">
                        Periodo: {shortDate(p.periodStart)} – {shortDate(p.periodEnd)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            p.status === "paid" ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          {p.status === "paid" ? "Pagado" : "Fallido"}
                        </span>
                        {p.hostedInvoiceUrl ? (
                          <a
                            href={p.hostedInvoiceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary"
                          >
                            Factura <ExternalLink className="size-3" />
                          </a>
                        ) : null}
                        {p.invoicePdf ? (
                          <a
                            href={p.invoicePdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary"
                          >
                            PDF <ExternalLink className="size-3" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        ) : settings.billingEnabled ? (
          <Card title="Plan Pro">
            <p className="text-[13px] text-muted-foreground">
              Con Pro multiplicas por {settings.proMultiplier} tus intentos en todas las secciones por ${PRO_PRICE_LABEL} al
              mes. Renovación automática y cancelas cuando quieras.
            </p>
            <Button className="w-full" onClick={() => void subscribe()} disabled={busy !== null}>
              {busy === "checkout" ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              Suscribirme por ${PRO_PRICE_LABEL}/mes
            </Button>
          </Card>
        ) : null}

        <button
          type="button"
          onClick={() => void queryClient.invalidateQueries({ queryKey: ["account-overview"] })}
          className="w-full rounded-2xl bg-secondary py-2 text-[12px] font-semibold text-muted-foreground"
        >
          Actualizar datos
        </button>
      </div>
    </AppShell>
  );
}
