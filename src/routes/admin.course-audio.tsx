import { useEffect, useRef, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AudioLines, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { AuthGate } from "@/components/fluency/AuthGate";
import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";
import { isAdmin } from "@/lib/storage-report.functions";
import { scanCourseAudio, warmCourseAudio, type AudioInventoryReport, type WarmBatchReport } from "@/lib/course-audio.functions";

/**
 * Admin-only COURSE AUDIO CACHE tool. Scan = dry run (no AI). Warm = generates
 * only confirmed-missing clips, one small batch per call, until none remain.
 * Not linked from any navigation.
 */
export const Route = createFileRoute("/admin/course-audio")({
  head: () => ({
    meta: [
      { title: "Course Audio Cache — Fluency App" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Admin-only course audio pre-generation tool." },
      { property: "og:title", content: "Course Audio Cache — Fluency App" },
      { property: "og:description", content: "Admin-only course audio pre-generation tool." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CourseAudioPage,
});

function CourseAudioPage() {
  const { user, loading } = useAuth();
  const { lang } = useAppLang();
  const es = lang === "es";
  const checkAdmin = useServerFn(isAdmin);
  const scan = useServerFn(scanCourseAudio);
  const warm = useServerFn(warmCourseAudio);
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [report, setReport] = useState<AudioInventoryReport | null>(null);
  const [run, setRun] = useState<{ generated: number; failed: WarmBatchReport["failed"]; startMissing: number; batches: number } | null>(null);
  const [busy, setBusy] = useState<"scan" | "warm" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stopRef = useRef(false);

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

  if (user && admin === false) throw notFound();

  const title = es ? "Caché de audio del curso" : "Course audio cache";

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

  const doScan = async () => {
    setBusy("scan");
    setError(null);
    setRun(null);
    try {
      setReport(await scan());
    } catch (e) {
      setError(e instanceof Error && /Storage unavailable/.test(e.message) ? (es ? "Almacenamiento no disponible. Nada se generó." : "Storage unavailable. Nothing was generated.") : es ? "No se pudo escanear." : "Could not scan.");
    } finally {
      setBusy(null);
    }
  };

  const doWarm = async () => {
    if (!report) return;
    setBusy("warm");
    setError(null);
    stopRef.current = false;
    const state = { generated: 0, failed: [] as WarmBatchReport["failed"], startMissing: report.missing, batches: 0 };
    setRun({ ...state });
    try {
      // Batch by batch; each call re-checks storage, so stopping and restarting is safe.
      for (;;) {
        if (stopRef.current) break;
        const batch = await warm();
        state.generated += batch.generated;
        state.failed = [...state.failed, ...batch.failed].slice(-50);
        state.batches += 1;
        setRun({ ...state });
        setReport(batch);
        if (batch.storageUnavailable) {
          setError(es ? "Almacenamiento no disponible. Se detuvo sin generar." : "Storage unavailable. Stopped without generating.");
          break;
        }
        if (batch.missing === 0 || batch.attempted === 0) break;
        // Nothing progressed in this batch (all failed) → stop instead of looping forever.
        if (batch.generated === 0 && batch.skippedAlreadyCached === 0) {
          setError(es ? "El lote no avanzó. Revisa los errores y vuelve a intentar." : "Batch made no progress. Check the failures and retry.");
          break;
        }
        if (state.batches >= 400) break;
      }
    } catch {
      setError(es ? "El calentamiento falló. Vuelve a ejecutar para continuar donde quedó." : "Warm-up failed. Run again to resume where it stopped.");
    } finally {
      setBusy(null);
    }
  };

  const btn = "flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-6 text-[14px] font-bold tracking-wide disabled:opacity-60";

  return (
    <AppShell title={title}>
      <div className="space-y-5">
        <section className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            <ShieldCheck className="size-3.5" aria-hidden /> {es ? "Solo admin" : "Admin only"}
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight">COURSE AUDIO CACHE</h2>
          <p className="mt-1 text-[13px] font-semibold text-navy-foreground/80">
            {es
              ? "Escanear no genera nada. Calentar genera solo los clips que faltan, 3 a la vez, y se puede detener y reanudar."
              : "Scan generates nothing. Warm generates only missing clips, 3 at a time, and can be stopped and resumed."}
          </p>
          <button type="button" onClick={doScan} disabled={busy !== null} className={`${btn} mt-4 bg-primary text-primary-foreground`}>
            <AudioLines className="size-4" aria-hidden />
            {busy === "scan" ? (es ? "ESCANEANDO…" : "SCANNING…") : "SCAN / DRY RUN"}
          </button>
          {report ? (
            busy === "warm" ? (
              <button type="button" onClick={() => (stopRef.current = true)} className={`${btn} mt-2 border border-navy-foreground/30 text-navy-foreground`}>
                {es ? "DETENER DESPUÉS DE ESTE LOTE" : "STOP AFTER THIS BATCH"}
              </button>
            ) : (
              <button type="button" onClick={doWarm} disabled={busy !== null || report.missing === 0} className={`${btn} mt-2 border border-primary text-primary`}>
                {report.missing === 0 ? (es ? "NADA QUE GENERAR" : "NOTHING TO WARM") : `WARM MISSING AUDIO (${report.missing})`}
              </button>
            )
          ) : null}
          {error ? <p className="mt-2 text-[13px] font-semibold text-primary">{error}</p> : null}
        </section>

        {report ? (
          <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">COURSE AUDIO INVENTORY</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-[13px] font-semibold">
              <Stat label={es ? "Specs descubiertos" : "Specs discovered"} value={report.discovered} />
              <Stat label={es ? "Clips únicos" : "Unique clips"} value={report.unique} />
              <Stat label={es ? "En caché" : "Cached"} value={report.cached} />
              <Stat label={es ? "Faltan" : "Missing"} value={report.missing} accent />
              <Stat label={es ? "Inválidos / omitidos" : "Invalid / skipped"} value={report.invalid} />
              <Stat label={es ? "Módulos" : "Modules"} value={report.modules.length} />
            </dl>
            {run ? (
              <div className="mt-4 rounded-2xl bg-secondary p-3 text-[13px] font-semibold">
                <p>
                  {es ? "Generados en esta corrida" : "Generated this run"}: {run.generated} / {run.startMissing} · {es ? "lotes" : "batches"}: {run.batches}
                </p>
                <p className="text-muted-foreground">
                  {es ? "Fallidos" : "Failed"}: {run.failed.length}
                </p>
                {run.failed.slice(0, 8).map((f, i) => (
                  <p key={i} className="mt-1 text-[12px] text-muted-foreground">
                    {f.source} · {f.reason} · “{f.preview}”
                  </p>
                ))}
              </div>
            ) : null}
            <details className="mt-4 text-[12px]">
              <summary className="cursor-pointer font-bold uppercase tracking-[0.14em] text-muted-foreground">{es ? "Detalle" : "Details"}</summary>
              <p className="mt-2 font-semibold">{es ? "Por tipo" : "By source"}</p>
              <ul className="mt-1 grid grid-cols-2 gap-x-3 text-muted-foreground">
                {Object.entries(report.bySource).map(([k, v]) => (
                  <li key={k}>
                    {k}: {v}
                  </li>
                ))}
              </ul>
              {report.missingSamples.length ? (
                <>
                  <p className="mt-3 font-semibold">{es ? "Ejemplos faltantes" : "Missing samples"}</p>
                  {report.missingSamples.map((m, i) => (
                    <p key={i} className="text-muted-foreground">
                      {m.source} · {m.voice}/{m.tone} · “{m.preview}”
                    </p>
                  ))}
                </>
              ) : null}
              {report.invalidSamples.length ? (
                <>
                  <p className="mt-3 font-semibold">{es ? "Inválidos" : "Invalid"}</p>
                  {report.invalidSamples.map((m, i) => (
                    <p key={i} className="text-muted-foreground">
                      {m.source} · {m.reason} · “{m.preview}”
                    </p>
                  ))}
                </>
              ) : null}
            </details>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl bg-secondary p-3">
      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className={`text-xl font-extrabold ${accent ? "text-primary" : ""}`}>{value.toLocaleString()}</dd>
    </div>
  );
}
