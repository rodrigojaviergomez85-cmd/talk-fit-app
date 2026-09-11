import { useCallback, useEffect, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { AuthGate } from "@/components/fluency/AuthGate";
import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";
import { isAdmin } from "@/lib/storage-report.functions";
import { getAdminMetrics } from "@/lib/admin-metrics.functions";
import { fmtNum, fmtPct, pct, type AdminMetrics } from "@/lib/admin-metrics";
import { getAdminCostCenter } from "@/lib/admin-cost-center.functions";
import { estimateCosts, fmtUsd, type AdminCostCenter } from "@/lib/admin-cost-center";

/** Admin-only engagement dashboard. Not linked from learner navigation. */
export const Route = createFileRoute("/admin/metrics")({
  head: () => ({
    meta: [
      { title: "Metrics — Fluency App" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Admin-only engagement and retention metrics." },
      { property: "og:title", content: "Metrics — Fluency App" },
      { property: "og:description", content: "Admin-only engagement and retention metrics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MetricsPage,
});

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <p className="text-[22px] font-black leading-tight text-foreground">{value}</p>
      {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function Bar({ label, value, total, right }: { label: string; value: number; total: number; right: string }) {
  const width = total > 0 ? Math.max(2, Math.round((value / total) * 100)) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-2 text-[12px] font-semibold">
        <span>{label}</span>
        <span className="text-muted-foreground">{right}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function MetricsPage() {
  const { user, loading } = useAuth();
  const { lang } = useAppLang();
  const es = lang === "es";
  const checkAdmin = useServerFn(isAdmin);
  const load = useServerFn(getAdminMetrics);

  const [admin, setAdmin] = useState<boolean | null>(null);
  const [data, setData] = useState<AdminMetrics | null>(null);
  const [busy, setBusy] = useState(false);
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

  const refresh = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      setData(await load());
    } catch {
      setError(es ? "No se pudieron cargar las métricas." : "Could not load metrics.");
    } finally {
      setBusy(false);
    }
  }, [load, es]);

  useEffect(() => {
    if (admin === true) void refresh();
  }, [admin, refresh]);

  if (user && admin === false) throw notFound();

  const title = es ? "Métricas" : "Metrics";

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

  const a = data?.activation;
  const c = data?.consistency;
  const i = data?.intensity;
  const s = data?.signals;
  const total = a?.total_users ?? 0;
  const activated = a?.activated_users ?? 0;
  const habitUsers = c ? c.buckets.d1 + c.buckets.d2_3 + c.buckets.d4_7 + c.buckets.d8_plus : 0;

  return (
    <AppShell title={title}>
      <div className="space-y-4 pb-8">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            <ShieldCheck className="size-3.5" aria-hidden /> {es ? "Solo admin" : "Admin only"}
          </p>
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={busy}
            className="flex min-h-[40px] items-center gap-1.5 rounded-2xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.12em] disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${busy ? "animate-spin" : ""}`} aria-hidden />
            {es ? "Actualizar" : "Refresh"}
          </button>
        </div>

        {error ? <p className="text-[13px] font-semibold text-primary">{error}</p> : null}

        {!data ? (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="h-32 animate-pulse rounded-3xl bg-secondary" />
            ))}
          </div>
        ) : (
          <>
            {/* 1. Activación */}
            <Card title={es ? "1. Activación" : "1. Activation"}>
              <div className="grid grid-cols-2 gap-2">
                <Stat label={es ? "Registrados" : "Signed up"} value={fmtNum(total)} />
                <Stat
                  label={es ? "Activados (1ª grabación)" : "Activated (1st recording)"}
                  value={fmtPct(pct(activated, total))}
                  hint={`${activated} / ${total}`}
                />
                <Stat
                  label={es ? "Completaron Día 1" : "Completed Day 1"}
                  value={fmtPct(pct(a?.day1_completed_users ?? 0, total))}
                  hint={`${fmtNum(a?.day1_completed_users)} ${es ? "usuarios" : "users"}`}
                />
                <Stat
                  label={es ? "Registro → 1ª práctica" : "Signup → 1st practice"}
                  value={a?.median_minutes_to_first === null || a?.median_minutes_to_first === undefined
                    ? "—"
                    : `${a.median_minutes_to_first} min`}
                  hint={es ? "mediana" : "median"}
                />
                <Stat label={es ? "Nuevos (7 días)" : "New (7 days)"} value={fmtNum(a?.signups_7d)} />
                <Stat label={es ? "Nuevos (30 días)" : "New (30 days)"} value={fmtNum(a?.signups_30d)} />
              </div>
            </Card>

            {/* 2. Embudo por día del curso */}
            <Card title={es ? "2. Avance por día del curso" : "2. Progress by course day"}>
              <div className="space-y-2">
                {data.curriculum_funnel.map((row) => (
                  <Bar
                    key={row.day}
                    label={`${es ? "Día" : "Day"} ${row.day}`}
                    value={row.users}
                    total={activated || total}
                    right={`${row.users} · ${fmtPct(pct(row.users, activated || total))}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                {es
                  ? "% sobre usuarios activados. Muestra en qué día se caen."
                  : "% of activated users. Shows where they drop off."}
              </p>
            </Card>

            {/* 3. Retención por calendario */}
            <Card title={es ? "3. Regresan después de registrarse" : "3. Return after signing up"}>
              <div className="space-y-2">
                {data.calendar_retention.map((row) => (
                  <Bar
                    key={row.day}
                    label={`${es ? "Día" : "Day"} +${row.day}`}
                    value={row.returned}
                    total={row.eligible}
                    right={`${row.returned} / ${row.eligible} · ${fmtPct(pct(row.returned, row.eligible))}`}
                  />
                ))}
              </div>
            </Card>

            {/* 4. Constancia */}
            <Card title={es ? "4. Constancia por usuario" : "4. Consistency per user"}>
              <div className="mb-3 grid grid-cols-2 gap-2">
                <Stat
                  label={es ? "Días practicados (prom.)" : "Days practiced (avg)"}
                  value={fmtNum(c?.avg_days_per_user)}
                />
                <Stat
                  label={es ? "Meta 5 días/semana" : "5 days/week goal"}
                  value={fmtNum(c?.weekly_goal_users)}
                  hint={es ? "últimos 7 días" : "last 7 days"}
                />
                <Stat label={es ? "Activos 7 días" : "Active 7 days"} value={fmtNum(c?.active_7d_users)} />
                <Stat label={es ? "Activos 30 días" : "Active 30 days"} value={fmtNum(c?.active_30d_users)} />
              </div>
              <div className="space-y-2">
                <Bar label={es ? "1 día" : "1 day"} value={c?.buckets.d1 ?? 0} total={habitUsers} right={`${fmtNum(c?.buckets.d1)} · ${fmtPct(pct(c?.buckets.d1 ?? 0, habitUsers))}`} />
                <Bar label={es ? "2–3 días" : "2–3 days"} value={c?.buckets.d2_3 ?? 0} total={habitUsers} right={`${fmtNum(c?.buckets.d2_3)} · ${fmtPct(pct(c?.buckets.d2_3 ?? 0, habitUsers))}`} />
                <Bar label={es ? "4–7 días" : "4–7 days"} value={c?.buckets.d4_7 ?? 0} total={habitUsers} right={`${fmtNum(c?.buckets.d4_7)} · ${fmtPct(pct(c?.buckets.d4_7 ?? 0, habitUsers))}`} />
                <Bar label={es ? "8+ días" : "8+ days"} value={c?.buckets.d8_plus ?? 0} total={habitUsers} right={`${fmtNum(c?.buckets.d8_plus)} · ${fmtPct(pct(c?.buckets.d8_plus ?? 0, habitUsers))}`} />
              </div>
            </Card>

            {/* 5. Intensidad diaria */}
            <Card title={es ? "5. Prácticas por día" : "5. Practices per day"}>
              <div className="mb-3 grid grid-cols-2 gap-2">
                <Stat
                  label={es ? "Prácticas por día activo" : "Practices per active day"}
                  value={fmtNum(i?.avg_sessions_per_active_day)}
                />
                <Stat
                  label={es ? "Llegan al tope de 5" : "Hit the 5 cap"}
                  value={fmtPct(pct(i?.cap_hit_user_days ?? 0, i?.total_user_days ?? 0))}
                  hint={`${fmtNum(i?.cap_hit_user_days)} / ${fmtNum(i?.total_user_days)} ${es ? "días" : "days"}`}
                />
                <Stat
                  label={es ? "Minutos por sesión" : "Minutes per session"}
                  value={fmtNum(i?.avg_minutes_per_session)}
                />
                <Stat
                  label={es ? "Minutos por usuario" : "Minutes per user"}
                  value={fmtNum(i?.avg_minutes_per_user)}
                />
              </div>
              <div className="space-y-2">
                {([
                  ["1", i?.session_distribution.s1 ?? 0],
                  ["2", i?.session_distribution.s2 ?? 0],
                  ["3", i?.session_distribution.s3 ?? 0],
                  ["4", i?.session_distribution.s4 ?? 0],
                  ["5", i?.session_distribution.s5_plus ?? 0],
                ] as const).map(([label, value]) => (
                  <Bar
                    key={label}
                    label={`${label} ${es ? "práctica(s)" : "practice(s)"}`}
                    value={value}
                    total={i?.total_user_days ?? 0}
                    right={`${value} · ${fmtPct(pct(value, i?.total_user_days ?? 0))}`}
                  />
                ))}
              </div>
            </Card>

            {/* 6. Señales de interés */}
            <Card title={es ? "6. Señales de que les gusta" : "6. Signals they enjoy it"}>
              <div className="grid grid-cols-2 gap-2">
                <Stat
                  label={es ? "Usan el Coach" : "Use the Coach"}
                  value={fmtPct(pct(s?.coach_users ?? 0, activated))}
                  hint={`${fmtNum(s?.coach_users)} ${es ? "usuarios" : "users"}`}
                />
                <Stat
                  label={es ? "Repiten con el Coach" : "Do Coach retakes"}
                  value={fmtPct(pct(s?.retake_users ?? 0, activated))}
                  hint={`${fmtNum(s?.retake_users)} ${es ? "usuarios" : "users"}`}
                />
                <Stat
                  label={es ? "Usan Review" : "Use Review"}
                  value={fmtPct(pct(s?.review_users ?? 0, activated))}
                  hint={`${fmtNum(s?.review_users)} ${es ? "usuarios" : "users"}`}
                />
                <Stat
                  label={es ? "Reportes (7 días)" : "Reports (7 days)"}
                  value={fmtNum(s?.bug_reports_7d)}
                  hint={`${fmtNum(s?.bug_reports_open)} ${es ? "sin revisar" : "unreviewed"}`}
                />
              </div>
            </Card>

            <p className="text-center text-[11px] text-muted-foreground">
              {es ? "Actualizado: " : "Updated: "}
              {new Date(data.generated_at).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </AppShell>
  );
}
