/**
 * Cost and health alerts — PURE evaluation, no I/O.
 *
 * Raw numbers come from the `admin_health_snapshot()` database function; the
 * thresholds live in the `alert_thresholds` table so the team can change them
 * from the admin screen without a code change. Everything here is read-only:
 * nothing in this file affects learners, limits or billing.
 */
import { estimateCosts, type AdminCostCenter } from "./admin-cost-center";

export type AlertLevel = "ok" | "warn" | "critical";

export type Threshold = {
  key: string;
  label: string;
  warn: number;
  critical: number;
  unit: string;
  sort_order: number;
};

export type HealthSnapshot = {
  generated_at: string;
  ai: {
    by_day: { day_key: string; endpoint: string; requests: number }[];
    coach_today: number;
  };
  storage: {
    by_day: { day_key: string; files: number; mb: number }[];
    files_total: number;
    mb_total: number;
    purged_total: number;
    disk_gb: number;
  };
  activity: {
    by_day: { day_key: string; users: number }[];
    by_hour: { hour_key: string; sessions: number }[];
    users_total: number;
  };
  database: { size_gb: number; connections: number; max_connections: number };
  thresholds: Threshold[];
};

export type Signal = {
  key: string;
  label: { es: string; en: string };
  value: number;
  display: string;
  level: AlertLevel;
  warn: number;
  critical: number;
  hint: { es: string; en: string };
};

export type AlertGroup = {
  key: "ai" | "storage" | "activity" | "database";
  title: { es: string; en: string };
  level: AlertLevel;
  signals: Signal[];
};

/** Higher value = worse. */
export function levelFor(value: number, warn: number, critical: number): AlertLevel {
  if (value >= critical) return "critical";
  if (value >= warn) return "warn";
  return "ok";
}

export function worstLevel(levels: AlertLevel[]): AlertLevel {
  if (levels.includes("critical")) return "critical";
  if (levels.includes("warn")) return "warn";
  return "ok";
}

function threshold(list: Threshold[], key: string): Threshold {
  return (
    list.find((t) => t.key === key) ?? { key, label: key, warn: Number.MAX_SAFE_INTEGER, critical: Number.MAX_SAFE_INTEGER, unit: "", sort_order: 99 }
  );
}

function dayKey(offsetDays: number, now: Date): string {
  const d = new Date(now.getTime() - offsetDays * 86_400_000);
  return d.toISOString().slice(0, 10);
}

/** Estimated USD for one day of AI usage, reusing the cost-center unit prices. */
export function aiCostForDay(snapshot: HealthSnapshot, key: string): number {
  const endpoints = new Map<string, number>();
  for (const row of snapshot.ai.by_day) {
    if (row.day_key !== key) continue;
    endpoints.set(row.endpoint, (endpoints.get(row.endpoint) ?? 0) + row.requests);
  }
  const asCostCenter: AdminCostCenter = {
    generated_at: snapshot.generated_at,
    endpoints: [...endpoints.entries()].map(([endpoint, requests]) => ({
      endpoint,
      requests_30d: requests,
      requests_total: requests,
      users_30d: 0,
    })),
    recordings: { count_30d: 0, count_total: 0, minutes_30d: 0, minutes_total: 0, avg_seconds: null },
    coach: { analyses_30d: 0, analyses_total: 0 },
    attempts: { sessions_30d: 0, sessions_total: 0 },
    users: { total: 0, active_30d: 0 },
  };
  return estimateCosts(asCostCenter).totalUsd;
}

function round(value: number, decimals = 1): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

/** Everything the Alerts screen shows, already evaluated against the thresholds. */
export function evaluateAlerts(snapshot: HealthSnapshot, now: Date = new Date()): AlertGroup[] {
  const t = snapshot.thresholds;
  const today = dayKey(0, now);

  // --- AI spend -----------------------------------------------------------
  const todayUsd = aiCostForDay(snapshot, today);
  const yesterdayUsd = aiCostForDay(snapshot, dayKey(1, now));
  const past = [1, 2, 3, 4, 5, 6, 7].map((n) => aiCostForDay(snapshot, dayKey(n, now)));
  const avg7 = past.length ? past.reduce((a, b) => a + b, 0) / past.length : 0;
  const ratio = avg7 > 0 ? todayUsd / avg7 : 0;
  const usdT = threshold(t, "ai_daily_usd");
  const ratioT = threshold(t, "ai_spike_ratio");

  const aiSignals: Signal[] = [
    {
      key: "ai_daily_usd",
      label: { es: "Gasto de IA hoy", en: "AI spend today" },
      value: round(todayUsd, 2),
      display: `$${round(todayUsd, 2)}`,
      level: levelFor(todayUsd, usdT.warn, usdT.critical),
      warn: usdT.warn,
      critical: usdT.critical,
      hint: {
        es: `Ayer $${round(yesterdayUsd, 2)} · promedio 7 días $${round(avg7, 2)}`,
        en: `Yesterday $${round(yesterdayUsd, 2)} · 7-day average $${round(avg7, 2)}`,
      },
    },
    {
      key: "ai_spike_ratio",
      label: { es: "Salto vs promedio", en: "Spike vs average" },
      value: round(ratio, 2),
      display: `${round(ratio, 2)}x`,
      level: levelFor(ratio, ratioT.warn, ratioT.critical),
      warn: ratioT.warn,
      critical: ratioT.critical,
      hint: {
        es: `${snapshot.ai.coach_today} análisis del coach hoy`,
        en: `${snapshot.ai.coach_today} coach analyses today`,
      },
    },
  ];

  // --- Storage ------------------------------------------------------------
  const mbToday = snapshot.storage.by_day.find((d) => d.day_key === today)?.mb ?? 0;
  const mb7 = snapshot.storage.by_day.reduce((sum, d) => sum + d.mb, 0);
  const diskPct = snapshot.storage.disk_gb > 0 ? ((snapshot.storage.mb_total / 1024) / snapshot.storage.disk_gb) * 100 : 0;
  const diskT = threshold(t, "storage_disk_pct");
  const mbT = threshold(t, "storage_daily_mb");

  const storageSignals: Signal[] = [
    {
      key: "storage_disk_pct",
      label: { es: "Disco usado", en: "Disk used" },
      value: round(diskPct),
      display: `${round(diskPct)}%`,
      level: levelFor(diskPct, diskT.warn, diskT.critical),
      warn: diskT.warn,
      critical: diskT.critical,
      hint: {
        es: `${round(snapshot.storage.mb_total / 1024, 2)} GB de ${snapshot.storage.disk_gb} GB · ${snapshot.storage.purged_total} audios ya liberados`,
        en: `${round(snapshot.storage.mb_total / 1024, 2)} GB of ${snapshot.storage.disk_gb} GB · ${snapshot.storage.purged_total} audio files already freed`,
      },
    },
    {
      key: "storage_daily_mb",
      label: { es: "MB nuevos hoy", en: "New MB today" },
      value: round(mbToday),
      display: `${round(mbToday)} MB`,
      level: levelFor(mbToday, mbT.warn, mbT.critical),
      warn: mbT.warn,
      critical: mbT.critical,
      hint: {
        es: `${round(mb7)} MB en 7 días · ${snapshot.storage.files_total} grabaciones`,
        en: `${round(mb7)} MB in 7 days · ${snapshot.storage.files_total} recordings`,
      },
    },
  ];

  // --- Activity and peak --------------------------------------------------
  const peak = snapshot.activity.by_hour.reduce(
    (best, h) => (h.sessions > best.sessions ? h : best),
    { hour_key: "", sessions: 0 },
  );
  const activeToday = snapshot.activity.by_day.find((d) => d.day_key === today)?.users ?? 0;
  const active7 = snapshot.activity.by_day.reduce((sum, d) => Math.max(sum, d.users), 0);
  const peakT = threshold(t, "peak_hour_sessions");

  const activitySignals: Signal[] = [
    {
      key: "peak_hour_sessions",
      label: { es: "Hora pico", en: "Peak hour" },
      value: peak.sessions,
      display: `${peak.sessions}`,
      level: levelFor(peak.sessions, peakT.warn, peakT.critical),
      warn: peakT.warn,
      critical: peakT.critical,
      hint: {
        es: peak.hour_key ? `Prácticas entre ${peak.hour_key} UTC y la hora siguiente` : "Sin prácticas en 24 horas",
        en: peak.hour_key ? `Sessions between ${peak.hour_key} UTC and the next hour` : "No sessions in 24 hours",
      },
    },
    {
      key: "active_today",
      label: { es: "Activos hoy", en: "Active today" },
      value: activeToday,
      display: `${activeToday}`,
      level: "ok",
      warn: 0,
      critical: 0,
      hint: {
        es: `Máximo diario en 7 días: ${active7} · ${snapshot.activity.users_total} cuentas`,
        en: `Best day in 7 days: ${active7} · ${snapshot.activity.users_total} accounts`,
      },
    },
  ];

  // --- Database -----------------------------------------------------------
  const connPct =
    snapshot.database.max_connections > 0
      ? (snapshot.database.connections / snapshot.database.max_connections) * 100
      : 0;
  const connT = threshold(t, "db_connections_pct");
  const sizeT = threshold(t, "db_size_gb");

  const dbSignals: Signal[] = [
    {
      key: "db_connections_pct",
      label: { es: "Conexiones", en: "Connections" },
      value: round(connPct),
      display: `${round(connPct)}%`,
      level: levelFor(connPct, connT.warn, connT.critical),
      warn: connT.warn,
      critical: connT.critical,
      hint: {
        es: `${snapshot.database.connections} de ${snapshot.database.max_connections}`,
        en: `${snapshot.database.connections} of ${snapshot.database.max_connections}`,
      },
    },
    {
      key: "db_size_gb",
      label: { es: "Tamaño de la base", en: "Database size" },
      value: snapshot.database.size_gb,
      display: `${snapshot.database.size_gb} GB`,
      level: levelFor(snapshot.database.size_gb, sizeT.warn, sizeT.critical),
      warn: sizeT.warn,
      critical: sizeT.critical,
      hint: { es: "Solo datos, sin archivos de audio", en: "Data only, audio files excluded" },
    },
  ];

  const groups: AlertGroup[] = [
    { key: "ai", title: { es: "Gasto diario de IA", en: "Daily AI spend" }, level: "ok", signals: aiSignals },
    { key: "storage", title: { es: "Crecimiento de archivos", en: "File growth" }, level: "ok", signals: storageSignals },
    { key: "activity", title: { es: "Estudiantes y picos", en: "Learners and peaks" }, level: "ok", signals: activitySignals },
    { key: "database", title: { es: "Salud de la base", en: "Database health" }, level: "ok", signals: dbSignals },
  ];
  for (const group of groups) group.level = worstLevel(group.signals.map((s) => s.level));
  return groups;
}

/** Worst level across every group — drives the banner on the admin screens. */
export function overallLevel(groups: AlertGroup[]): AlertLevel {
  return worstLevel(groups.map((g) => g.level));
}

export function countBy(groups: AlertGroup[], level: AlertLevel): number {
  return groups.flatMap((g) => g.signals).filter((s) => s.level === level).length;
}
