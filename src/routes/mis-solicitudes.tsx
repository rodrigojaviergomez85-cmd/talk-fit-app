import { useCallback, useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/fluency/AppShell";
import { AuthGate } from "@/components/fluency/AuthGate";
import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";
import { listMySupportTickets } from "@/lib/support-tickets.functions";
import {
  SUPPORT_CATEGORY_LABEL,
  SUPPORT_STATUS_LABEL,
  shortTicketId,
  type SupportTicket,
} from "@/lib/support-tickets";

/** Learner view: the status of the support requests I sent from /contacto. */
export const Route = createFileRoute("/mis-solicitudes")({
  head: () => ({
    meta: [
      { title: "Mis solicitudes de soporte — Fluency App" },
      {
        name: "description",
        content: "Consulta el estado y las respuestas de las solicitudes de soporte que enviaste.",
      },
      { property: "og:title", content: "Mis solicitudes de soporte — Fluency App" },
      {
        property: "og:description",
        content: "Consulta el estado y las respuestas de las solicitudes de soporte que enviaste.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyRequestsPage,
});

function MyRequestsPage() {
  const { user, loading } = useAuth();
  const { lang } = useAppLang();
  const es = lang === "es";
  const list = useServerFn(listMySupportTickets);

  const [rows, setRows] = useState<SupportTicket[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setRows(await list());
    } catch {
      setError(es ? "No se pudieron cargar tus solicitudes." : "Could not load your requests.");
    }
  }, [list, es]);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  const title = es ? "Mis solicitudes" : "My requests";

  if (loading) {
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

  return (
    <AppShell title={title}>
      <div className="space-y-4">
        <p className="text-[13px] text-muted-foreground">
          {es
            ? "Aquí ves el estado de las solicitudes que enviaste desde el formulario de contacto y las respuestas de nuestro equipo."
            : "Here you can see the status of the requests you sent from the contact form and our team's replies."}
        </p>

        {error ? <p className="text-[13px] font-semibold text-primary">{error}</p> : null}

        {rows && rows.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-4 text-[13px] shadow-[var(--shadow-card)]">
            <p>{es ? "Todavía no has enviado ninguna solicitud." : "You haven't sent any requests yet."}</p>
            <Link
              to="/contacto"
              className="mt-3 inline-flex min-h-[44px] items-center rounded-2xl bg-primary px-5 text-[12px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              {es ? "Enviar una solicitud" : "Send a request"}
            </Link>
          </div>
        ) : null}

        {(rows ?? []).map((t) => (
          <section key={t.id} className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                #{shortTicketId(t.id)} · {new Date(t.createdAt).toLocaleDateString()}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                {es ? SUPPORT_STATUS_LABEL[t.estado].es : SUPPORT_STATUS_LABEL[t.estado].en}
              </span>
            </div>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {es
                ? (SUPPORT_CATEGORY_LABEL[t.categoria]?.es ?? t.categoria)
                : (SUPPORT_CATEGORY_LABEL[t.categoria]?.en ?? t.categoria)}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-[14px] font-semibold">{t.mensaje}</p>

            {t.comments.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {t.comments.map((c) => (
                  <li key={c.id} className="rounded-2xl border border-border bg-background p-3 text-[13px]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {es ? "Soporte" : "Support"} · {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap">{c.body}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[12px] text-muted-foreground">
                {es ? "Sin respuestas todavía." : "No replies yet."}
              </p>
            )}
          </section>
        ))}
      </div>
    </AppShell>
  );
}
