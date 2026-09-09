import { useCallback, useEffect, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { AuthGate } from "@/components/fluency/AuthGate";
import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";
import { isAdmin } from "@/lib/storage-report.functions";
import { listBugReports, setBugReportStatus } from "@/lib/bug-reports.functions";
import { BUG_REPORT_STATUSES, type AdminBugReport, type BugReportStatus } from "@/lib/bug-reports";

/** Admin-only triage list of learner bug reports. Not linked from navigation. */
export const Route = createFileRoute("/admin/bug-reports")({
  head: () => ({
    meta: [
      { title: "Bug Reports — Fluency App" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Admin-only list of learner bug reports." },
      { property: "og:title", content: "Bug Reports — Fluency App" },
      { property: "og:description", content: "Admin-only list of learner bug reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BugReportsPage,
});

const STATUS_LABEL: Record<BugReportStatus, { es: string; en: string }> = {
  new: { es: "Nuevo", en: "New" },
  reviewed: { es: "Revisado", en: "Reviewed" },
  resolved: { es: "Resuelto", en: "Resolved" },
};

function BugReportsPage() {
  const { user, loading } = useAuth();
  const { lang } = useAppLang();
  const es = lang === "es";
  const checkAdmin = useServerFn(isAdmin);
  const list = useServerFn(listBugReports);
  const setStatus = useServerFn(setBugReportStatus);

  const [admin, setAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<AdminBugReport[] | null>(null);
  const [filter, setFilter] = useState<BugReportStatus | "all">("all");
  const [error, setError] = useState<string | null>(null);

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

  const load = useCallback(async () => {
    setError(null);
    try {
      setRows(await list({ data: filter === "all" ? {} : { status: filter } }));
    } catch {
      setError(es ? "No se pudieron cargar los reportes." : "Could not load reports.");
    }
  }, [list, filter, es]);

  useEffect(() => {
    if (admin === true) void load();
  }, [admin, load]);

  if (user && admin === false) throw notFound();

  const title = es ? "Reportes de errores" : "Bug reports";

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

  const update = async (id: string, status: BugReportStatus) => {
    setRows((cur) => cur?.map((r) => (r.id === id ? { ...r, status } : r)) ?? cur);
    try {
      await setStatus({ data: { id, status } });
    } catch {
      void load();
    }
  };

  return (
    <AppShell title={title}>
      <div className="space-y-4">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          <ShieldCheck className="size-3.5" aria-hidden /> {es ? "Solo admin" : "Admin only"}
        </p>

        <div className="flex flex-wrap gap-2">
          {(["all", ...BUG_REPORT_STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`min-h-[44px] rounded-2xl border px-4 text-[12px] font-bold uppercase tracking-[0.12em] ${
                filter === s ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              {s === "all" ? (es ? "Todos" : "All") : es ? STATUS_LABEL[s].es : STATUS_LABEL[s].en}
            </button>
          ))}
        </div>

        {error ? <p className="text-[13px] font-semibold text-primary">{error}</p> : null}

        {rows && rows.length === 0 ? (
          <p className="text-[13px] text-muted-foreground">{es ? "Sin reportes." : "No reports."}</p>
        ) : null}

        {(rows ?? []).map((r) => (
          <section key={r.id} className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {new Date(r.createdAt).toLocaleString()}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{r.area}</span>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-[14px] font-semibold">{r.message}</p>
            {r.expected ? (
              <p className="mt-2 whitespace-pre-wrap text-[13px] text-muted-foreground">
                {es ? "Esperaba: " : "Expected: "}
                {r.expected}
              </p>
            ) : null}
            {r.screenshotUrl ? (
              <a href={r.screenshotUrl} target="_blank" rel="noreferrer" className="mt-3 block">
                <img
                  src={r.screenshotUrl}
                  alt={es ? "Captura del reporte" : "Report screenshot"}
                  className="max-h-56 w-full rounded-2xl border border-border object-contain"
                />
              </a>
            ) : null}
            <p className="mt-2 break-all text-[11px] text-muted-foreground">
              {r.email ?? "—"} · {r.context.route ?? "—"} · {r.context.viewport ?? "—"} ·{" "}
              {r.context.moduleId ? `${r.context.moduleId} d${r.context.day ?? "?"}` : "—"}
            </p>
            <p className="mt-1 break-all text-[10px] text-muted-foreground">{r.context.userAgent ?? ""}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {BUG_REPORT_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void update(r.id, s)}
                  className={`min-h-[44px] rounded-2xl border px-3 text-[11px] font-bold uppercase tracking-[0.12em] ${
                    r.status === s ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {es ? STATUS_LABEL[s].es : STATUS_LABEL[s].en}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
