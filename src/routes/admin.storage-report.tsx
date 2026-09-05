import { useEffect, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Database, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { AuthGate } from "@/components/fluency/AuthGate";
import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";
import { isAdmin, runStorageReport } from "@/lib/storage-report.functions";
import type { ExclusionReason, StorageReport } from "@/lib/storage-report";

/**
 * Admin-only storage cleanup report. READ-ONLY: this page never deletes or
 * modifies anything. Not linked from any navigation.
 */
export const Route = createFileRoute("/admin/storage-report")({
  head: () => ({
    meta: [
      { title: "Storage Report — Fluency App" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Admin-only read-only storage cleanup report." },
      { property: "og:title", content: "Storage Report — Fluency App" },
      { property: "og:description", content: "Admin-only read-only storage cleanup report." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StorageReportPage,
});

const REASONS: { key: ExclusionReason; es: string; en: string }[] = [
  { key: "finalByFlag", es: "Final Rep (is_final_rep)", en: "Final Rep (is_final_rep)" },
  { key: "finalByDayProgress", es: "Final Rep (day_progress.recording_path)", en: "Final Rep (day_progress.recording_path)" },
  { key: "newerThan14Days", es: "Menos de 14 días", en: "Newer than 14 days" },
  { key: "dayNotCompleted", es: "Día no completado", en: "Day not completed" },
  { key: "alreadyPurged", es: "Ya purgado", en: "Already purged" },
];

function StorageReportPage() {
  const { user, loading } = useAuth();
  const { lang } = useAppLang();
  const es = lang === "es";
  const checkAdmin = useServerFn(isAdmin);
  const run = useServerFn(runStorageReport);
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [report, setReport] = useState<StorageReport | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      setAdmin(null);
      return;
    }
    let active = true;
    checkAdmin()
      .then((r) => active && setAdmin(r.admin))
      .catch(() => active && setAdmin(false));
    return () => {
      active = false;
    };
  }, [user, checkAdmin]);

  // Non-admins get the app's normal 404 — the page does not exist for them.
  if (user && admin === false) throw notFound();

  const title = es ? "Reporte de almacenamiento" : "Storage report";

  if (loading || (user && admin === null)) {
    return (
      <AppShell title={title}>
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-3xl bg-secondary" />
          ))}
        </div>
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell title={title}>
        <AuthGate blocking />
      </AppShell>
    );
  }

  const execute = async () => {
    setBusy(true);
    setError(null);
    try {
      setReport(await run());
    } catch {
      setError(es ? "No se pudo generar el reporte." : "Could not generate the report.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!report) return;
    await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const excludedTotal = report ? Object.values(report.excluded).reduce((s, n) => s + n, 0) : 0;

  return (
    <AppShell title={title}>
      <div className="space-y-5">
        <section className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            <ShieldCheck className="size-3.5" aria-hidden /> {es ? "Solo lectura · admin" : "Read-only · admin"}
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight">
            {es ? "Candidatos a limpieza de tomas no finales" : "Non-final take cleanup candidates"}
          </h2>
          <p className="mt-1 text-[13px] font-semibold text-navy-foreground/80">
            {es
              ? "Este reporte no borra ni modifica nada. Solo identifica y explica."
              : "This report deletes and modifies nothing. It only identifies and explains."}
          </p>
          <button
            type="button"
            onClick={execute}
            disabled={busy}
            className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[14px] font-bold tracking-wide text-primary-foreground disabled:opacity-60"
          >
            <Database className="size-4" aria-hidden />
            {busy ? (es ? "GENERANDO…" : "RUNNING…") : es ? "GENERAR REPORTE" : "RUN REPORT"}
          </button>
          {error ? <p className="mt-2 text-[13px] font-semibold text-primary">{error}</p> : null}
        </section>

        {report ? (
          <>
            <Card title={es ? "Candidatos" : "Candidates"}>
              <Stat label={es ? "Archivos" : "Files"} value={String(report.candidates.files)} />
              <Stat label={es ? "MB estimados" : "Estimated MB"} value={String(report.candidates.estimatedMb)} />
              <Stat label={es ? "Estudiantes afectados" : "Learners affected"} value={String(report.candidates.learners)} />
              <Stat label={es ? "Más antiguo" : "Oldest"} value={fmt(report.candidates.oldest)} />
              <Stat label={es ? "Más reciente" : "Newest"} value={fmt(report.candidates.newest)} />
              <p className="pt-2 text-[11px] text-muted-foreground">
                {es
                  ? `MB estimados a partir de la duración (32 kbps). Regla de edad: ${report.minAgeDays} días.`
                  : `MB estimated from duration (32 kbps). Age rule: ${report.minAgeDays} days.`}
              </p>
            </Card>

            <Card title={es ? "Por módulo" : "By module"}>
              {report.candidates.byModule.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">{es ? "Sin candidatos." : "No candidates."}</p>
              ) : (
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      <th className="py-1">{es ? "Módulo" : "Module"}</th>
                      <th className="py-1 text-right">{es ? "Archivos" : "Files"}</th>
                      <th className="py-1 text-right">MB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.candidates.byModule.map((m) => (
                      <tr key={m.moduleId} className="border-t border-border">
                        <td className="py-1.5 font-semibold">{m.moduleId}</td>
                        <td className="py-1.5 text-right tabular-nums">{m.files}</td>
                        <td className="py-1.5 text-right tabular-nums">{m.estimatedMb}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>

            <Card title={es ? "Excluidos (protecciones activas)" : "Excluded (guardrails at work)"}>
              {REASONS.map((r) => (
                <Stat key={r.key} label={es ? r.es : r.en} value={String(report.excluded[r.key])} />
              ))}
              <div className="mt-2 border-t border-border pt-2">
                <Stat label={es ? "Total excluidos" : "Total excluded"} value={String(excludedTotal)} />
                <Stat label={es ? "Total grabaciones" : "Total recordings"} value={String(report.totals.recordings)} />
                <Stat
                  label={es ? "Finales que coinciden en ambas fuentes" : "Finals agreed by both sources"}
                  value={String(report.totals.protectedByBoth)}
                />
                <Stat
                  label={es ? "Rutas en day_progress" : "Paths in day_progress"}
                  value={String(report.totals.dayProgressWithPath)}
                />
                <Stat
                  label={es ? "…que también tienen fila en recordings" : "…that also have a recordings row"}
                  value={String(report.totals.dayProgressPathsMatchingRecordings)}
                />
                {report.totals.dayProgressPathsMatchingRecordings === 0 && report.totals.dayProgressWithPath > 0 ? (
                  <p className="pt-2 text-[11px] text-muted-foreground">
                    {es
                      ? "Los Final Reps de la comparación de progreso viven en archivos separados (uid/módulo-day-N). Un borrado que solo recorra la tabla recordings nunca puede tocarlos."
                      : "The Final Reps used by the progress comparison live in separate files (uid/module-day-N). A purge that only walks the recordings table can never reach them."}
                  </p>
                ) : null}
              </div>
            </Card>

            <Card title={es ? "Muestra (hasta 20 rutas)" : "Sample (up to 20 paths)"}>
              {report.candidates.samplePaths.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">{es ? "Sin candidatos." : "No candidates."}</p>
              ) : (
                <ul className="space-y-1 break-all font-mono text-[11px]">
                  {report.candidates.samplePaths.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </Card>

            <button
              type="button"
              onClick={copy}
              className="min-h-[48px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              {copied ? (es ? "COPIADO" : "COPIED") : es ? "COPIAR JSON" : "COPY JSON"}
            </button>
            <p className="text-center text-[11px] text-muted-foreground">
              {es ? "Generado" : "Generated"} {fmt(report.generatedAt)}
            </p>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{title}</h3>
      <div className="mt-2 space-y-1">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[13px]">
      <span className="font-semibold text-muted-foreground">{label}</span>
      <span className="font-extrabold tabular-nums">{value}</span>
    </div>
  );
}

function fmt(iso: string | null): string {
  if (!iso) return "—";
  return iso.slice(0, 10);
}
