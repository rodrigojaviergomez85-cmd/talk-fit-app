import { useCallback, useEffect, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { AuthGate } from "@/components/fluency/AuthGate";
import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";
import { isAdmin } from "@/lib/storage-report.functions";
import {
  addSupportTicketComment,
  listSupportTickets,
  setSupportTicketStatus,
} from "@/lib/support-tickets.functions";
import {
  SUPPORT_CATEGORY_LABEL,
  SUPPORT_STATUS_LABEL,
  SUPPORT_TICKET_STATUSES,
  shortTicketId,
  type SupportTicket,
  type SupportTicketStatus,
} from "@/lib/support-tickets";

/** Admin-only triage desk for /contacto support tickets. Not linked from navigation. */
export const Route = createFileRoute("/admin/soporte")({
  head: () => ({
    meta: [
      { title: "Mesa de soporte — Fluency App" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Admin-only support ticket desk." },
      { property: "og:title", content: "Mesa de soporte — Fluency App" },
      { property: "og:description", content: "Admin-only support ticket desk." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminSupportPage,
});

function AdminSupportPage() {
  const { user, loading } = useAuth();
  const { lang } = useAppLang();
  const es = lang === "es";
  const checkAdmin = useServerFn(isAdmin);
  const list = useServerFn(listSupportTickets);
  const setStatus = useServerFn(setSupportTicketStatus);
  const addComment = useServerFn(addSupportTicketComment);

  const [admin, setAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<SupportTicket[] | null>(null);
  const [filter, setFilter] = useState<SupportTicketStatus | "all">("all");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [internal, setInternal] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);
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
      setRows(await list({ data: filter === "all" ? {} : { estado: filter } }));
    } catch {
      setError(es ? "No se pudieron cargar los tickets." : "Could not load tickets.");
    }
  }, [list, filter, es]);

  useEffect(() => {
    if (admin === true) void load();
  }, [admin, load]);

  if (user && admin === false) throw notFound();

  const title = es ? "Mesa de soporte" : "Support desk";

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

  const update = async (id: string, estado: SupportTicketStatus) => {
    setRows((cur) => cur?.map((r) => (r.id === id ? { ...r, estado } : r)) ?? cur);
    try {
      await setStatus({ data: { id, estado } });
    } catch {
      void load();
    }
  };

  const submitComment = async (id: string) => {
    const body = (drafts[id] ?? "").trim();
    if (!body) return;
    setBusy(id);
    try {
      const comment = await addComment({ data: { id, body, isInternal: internal[id] ?? false } });
      setRows(
        (cur) =>
          cur?.map((r) =>
            r.id === id
              ? {
                  ...r,
                  comments: [...r.comments, comment],
                  estado: r.estado === "nuevo" ? "en_proceso" : r.estado,
                }
              : r,
          ) ?? cur,
      );
      setDrafts((d) => ({ ...d, [id]: "" }));
    } catch {
      setError(es ? "No se pudo guardar el comentario." : "Could not save the comment.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <AppShell title={title}>
      <div className="space-y-4">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          <ShieldCheck className="size-3.5" aria-hidden /> {es ? "Solo admin" : "Admin only"}
        </p>

        <div className="flex flex-wrap gap-2">
          {(["all", ...SUPPORT_TICKET_STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`min-h-[44px] rounded-2xl border px-4 text-[12px] font-bold uppercase tracking-[0.12em] ${
                filter === s ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              {s === "all" ? (es ? "Todos" : "All") : es ? SUPPORT_STATUS_LABEL[s].es : SUPPORT_STATUS_LABEL[s].en}
            </button>
          ))}
        </div>

        {error ? <p className="text-[13px] font-semibold text-primary">{error}</p> : null}

        {rows && rows.length === 0 ? (
          <p className="text-[13px] text-muted-foreground">{es ? "Sin tickets." : "No tickets."}</p>
        ) : null}

        {(rows ?? []).map((t) => (
          <section key={t.id} className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                #{shortTicketId(t.id)} · {new Date(t.createdAt).toLocaleString()}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                {es
                  ? (SUPPORT_CATEGORY_LABEL[t.categoria]?.es ?? t.categoria)
                  : (SUPPORT_CATEGORY_LABEL[t.categoria]?.en ?? t.categoria)}
              </span>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-[14px] font-semibold">{t.mensaje}</p>
            <p className="mt-2 break-all text-[11px] text-muted-foreground">
              {t.nombre} · {t.email} · {t.appVersion ?? "—"}
            </p>
            <p className="mt-1 break-all text-[10px] text-muted-foreground">{t.userAgent ?? ""}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {SUPPORT_TICKET_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void update(t.id, s)}
                  className={`min-h-[44px] rounded-2xl border px-3 text-[11px] font-bold uppercase tracking-[0.12em] ${
                    t.estado === s ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {es ? SUPPORT_STATUS_LABEL[s].es : SUPPORT_STATUS_LABEL[s].en}
                </button>
              ))}
            </div>

            {t.comments.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {t.comments.map((c) => (
                  <li
                    key={c.id}
                    className={`rounded-2xl border p-3 text-[13px] ${
                      c.isInternal ? "border-dashed border-border bg-secondary" : "border-border bg-background"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {new Date(c.createdAt).toLocaleString()} · {c.authorEmail ?? "admin"}
                      {c.isInternal ? (es ? " · nota interna" : " · internal note") : ""}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap">{c.body}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-3 space-y-2">
              <label className="sr-only" htmlFor={`c-${t.id}`}>
                {es ? "Comentario" : "Comment"}
              </label>
              <textarea
                id={`c-${t.id}`}
                value={drafts[t.id] ?? ""}
                onChange={(e) => setDrafts((d) => ({ ...d, [t.id]: e.target.value }))}
                rows={3}
                placeholder={es ? "Escribe una respuesta o nota…" : "Write a reply or note…"}
                className="w-full rounded-2xl border border-border bg-background p-3 text-[14px]"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={internal[t.id] ?? false}
                    onChange={(e) => setInternal((v) => ({ ...v, [t.id]: e.target.checked }))}
                  />
                  {es ? "Nota interna (no visible)" : "Internal note (hidden)"}
                </label>
                <button
                  type="button"
                  disabled={busy === t.id || !(drafts[t.id] ?? "").trim()}
                  onClick={() => void submitComment(t.id)}
                  className="min-h-[44px] rounded-2xl bg-primary px-5 text-[12px] font-bold uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-50"
                >
                  {es ? "Agregar comentario" : "Add comment"}
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
