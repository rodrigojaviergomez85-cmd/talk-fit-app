import { useCallback, useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ChevronDown, Crosshair, Trophy } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { JourneyService } from "@/services/journey-service";
import { CourseService } from "@/services/course-service";
import {
  getLeagueBoard,
  getLeaguePreview,
  getMyLeagueSummary,
  setLeagueHidden,
} from "@/lib/league.functions";
import {
  WEEKLY_GOAL,
  curriculumWeekForDay,
  formatPoints,
  formatWeekRange,
  progressPercent,
  type LeagueBoardRow,
  type LeagueSummary,
} from "@/lib/league";

/** Weekly league board: personal progress first, then the ranking. */
export const Route = createFileRoute("/liga")({
  head: () => ({
    meta: [
      { title: "Tu liga semanal · Fluency App" },
      {
        name: "description",
        content:
          "Compite cada semana con estudiantes de tu mismo nivel completando la historia y los audios de cada jornada.",
      },
      { property: "og:title", content: "Tu liga semanal · Fluency App" },
      {
        property: "og:description",
        content: "Puntos por constancia: historia del día y práctica de audios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LeaguePage,
});

const PAGE_SIZE = 25;

function LeaguePage() {
  const { lang } = useAppLang();
  const es = lang === "es";
  const { user } = useAuth();
  const loadSummary = useServerFn(getMyLeagueSummary);
  const loadPreview = useServerFn(getLeaguePreview);
  const loadBoard = useServerFn(getLeagueBoard);
  const toggleHidden = useServerFn(setLeagueHidden);

  const [summary, setSummary] = useState<LeagueSummary | null>(null);
  const [preview, setPreview] = useState<LeagueBoardRow[]>([]);
  const [full, setFull] = useState(false);
  const [offset, setOffset] = useState(0);
  const [rows, setRows] = useState<LeagueBoardRow[]>([]);
  const [listed, setListed] = useState(0);
  const [myPosition, setMyPosition] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [openRules, setOpenRules] = useState(false);

  const load = useCallback(async () => {
    try {
      const journey = JourneyService.load();
      const next = JourneyService.nextPractice(journey);
      const moduleId = next?.moduleId ?? "basic-zero";
      const day = next?.day ?? 1;
      const res = await loadSummary({ data: { moduleId, day } });
      setSummary(res);
      if (res.enrolled && res.competitionId) {
        const p = await loadPreview({ data: { competitionId: res.competitionId } });
        setPreview(p.rows);
        setMyPosition(p.myPosition);
      }
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [loadPreview, loadSummary]);

  useEffect(() => {
    void load();
  }, [load]);

  const openPage = useCallback(
    async (nextOffset: number) => {
      if (!summary?.competitionId) return;
      const res = await loadBoard({
        data: { competitionId: summary.competitionId, offset: nextOffset, limit: PAGE_SIZE },
      });
      setRows(res.rows);
      setListed(res.listed);
      setOffset(res.offset);
      setMyPosition(res.myPosition);
      setFull(true);
    },
    [loadBoard, summary?.competitionId],
  );

  const goToMe = useCallback(() => {
    if (myPosition === null) return;
    void openPage(Math.floor(myPosition / PAGE_SIZE) * PAGE_SIZE);
  }, [myPosition, openPage]);

  const moduleLabel = summary?.moduleId
    ? (() => {
        try {
          return CourseService.getModule(summary.moduleId as never).label;
        } catch {
          return summary.moduleId;
        }
      })()
    : "";

  return (
    <AppShell>
      <div className="space-y-3 p-4 pb-8">
        <Link
          to="/"
          className="inline-flex h-9 items-center gap-1.5 rounded-2xl border border-border px-3 text-[11px] font-bold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {es ? "Volver a mi día" : "Back to my day"}
        </Link>

        {status === "loading" ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{es ? "Cargando…" : "Loading…"}</p>
        ) : null}

        {status === "error" ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {es ? "No pudimos cargar tu liga. Intenta de nuevo." : "We could not load your league. Try again."}
          </p>
        ) : null}

        {status === "ready" && summary && !summary.enrolled && !summary.observer ? (
          <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
            {es
              ? "La liga semanal todavía no está disponible para tu nivel y semana."
              : "The weekly league is not available for your level and week yet."}
          </div>
        ) : null}

        {status === "ready" && summary && (summary.enrolled || summary.observer) ? (
          <>
            {summary.observer ? (
              <div className="rounded-2xl border border-border bg-card p-3 text-xs font-medium text-muted-foreground">
                {es
                  ? "Estás viendo la liga como observador (cuenta sin límites o administrador): no sumas puntos ni apareces en la clasificación."
                  : "You are viewing the league as an observer (unlimited or admin account): you do not earn points and do not appear in the leaderboard."}
              </div>
            ) : null}
            <header className="rounded-2xl bg-navy p-4 text-navy-foreground shadow-[var(--shadow-lift)]">
              <p className="flex items-center gap-2 text-[15px] font-extrabold">
                <Trophy className="size-5 text-primary" aria-hidden="true" />
                {es ? "Tu liga semanal" : "Your weekly league"}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-navy-foreground/70">
                {moduleLabel} · {es ? "Semana " : "Week "}
                {summary.curriculumWeek}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-navy-foreground/70">
                {summary.weekStart && summary.weekEnd
                  ? `${formatWeekRange(summary.weekStart, summary.weekEnd, es)} · ${
                      es ? "cierra el domingo" : "closes Sunday"
                    }`
                  : null}
              </p>
              <p className="mt-2 text-2xl font-extrabold">
                {formatPoints(summary.points)} / {formatPoints(summary.attainableGoal)} pts
              </p>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-navy-foreground/20">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${progressPercent(summary.points, summary.attainableGoal)}%` }}
                />
              </div>
              <p className="mt-2 text-[12px] font-bold">
                {summary.rank
                  ? es
                    ? `Puesto ${summary.rank} de ${summary.participants}`
                    : `Rank ${summary.rank} of ${summary.participants}`
                  : es
                    ? "Sin puesto todavía"
                    : "No rank yet"}
              </p>
              {!summary.goalAttainable ? (
                <p className="mt-2 text-[11px] font-medium text-navy-foreground/70">
                  {es
                    ? `Esta semana el máximo real es ${formatPoints(summary.attainableGoal)} pts porque aún faltan historias publicadas.`
                    : `The real maximum this week is ${formatPoints(summary.attainableGoal)} pts because some stories are not published yet.`}
                </p>
              ) : null}
            </header>

            <section className="rounded-2xl border border-border bg-card p-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {es ? "Clasificación" : "Leaderboard"}
              </h2>
              <ul className="mt-2 space-y-1">
                {(full ? rows : preview).map((row, i) => (
                  <li
                    key={`${row.rank}-${row.name}-${i}`}
                    className={`flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm ${
                      row.isMe ? "bg-primary/10 font-extrabold text-foreground" : "text-foreground"
                    }`}
                  >
                    <span className="w-8 shrink-0 text-[12px] font-bold text-muted-foreground">{row.rank}</span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-extrabold uppercase">
                      {row.name.slice(0, 2)}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{row.name}</span>
                    <span className="shrink-0 text-[12px] font-bold">{formatPoints(row.points)}</span>
                  </li>
                ))}
                {!(full ? rows : preview).length ? (
                  <li className="py-4 text-center text-xs text-muted-foreground">
                    {es ? "Aún no hay participantes con puntos." : "No participants with points yet."}
                  </li>
                ) : null}
              </ul>

              {!full ? (
                <button
                  type="button"
                  onClick={() => void openPage(0)}
                  className="mt-2 h-10 w-full rounded-2xl border border-border text-[12px] font-bold uppercase tracking-[0.1em]"
                >
                  {es ? "Ver clasificación completa" : "See full leaderboard"}
                </button>
              ) : (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    disabled={offset === 0}
                    onClick={() => void openPage(Math.max(0, offset - PAGE_SIZE))}
                    className="h-10 flex-1 rounded-2xl border border-border text-[12px] font-bold disabled:opacity-40"
                  >
                    {es ? "Anterior" : "Previous"}
                  </button>
                  <button
                    type="button"
                    onClick={goToMe}
                    className="inline-flex h-10 items-center gap-1 rounded-2xl border border-border px-3 text-[12px] font-bold"
                  >
                    <Crosshair className="size-4" aria-hidden="true" />
                    {es ? "Ir a mi posición" : "Go to my position"}
                  </button>
                  <button
                    type="button"
                    disabled={offset + PAGE_SIZE >= listed}
                    onClick={() => void openPage(offset + PAGE_SIZE)}
                    className="h-10 flex-1 rounded-2xl border border-border text-[12px] font-bold disabled:opacity-40"
                  >
                    {es ? "Siguiente" : "Next"}
                  </button>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-border bg-card p-3">
              <button
                type="button"
                onClick={() => setOpenRules((v) => !v)}
                className="flex w-full items-center justify-between text-left text-[13px] font-extrabold text-foreground"
              >
                {es ? "¿Cómo sumo puntos?" : "How do I earn points?"}
                <ChevronDown className={`size-4 transition-transform ${openRules ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {openRules ? (
                <div className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                  <p>
                    {es
                      ? "150 puntos por la historia del día y 150 por la práctica de audios completa."
                      : "150 points for the day's story and 150 for the complete audio practice."}
                  </p>
                  <p>
                    {es
                      ? `Cinco jornadas por semana: meta de ${formatPoints(WEEKLY_GOAL)} puntos.`
                      : `Five sessions per week: a goal of ${formatPoints(WEEKLY_GOAL)} points.`}
                  </p>
                  <p>
                    {es
                      ? "Puedes recuperar jornadas pendientes durante la semana. Cada actividad da puntos una sola vez."
                      : "You can catch up on pending sessions during the week. Each activity pays once."}
                  </p>
                  <p className="font-bold text-foreground">
                    {es
                      ? "Los puntos reconocen tu práctica y constancia. No son una calificación de tu inglés."
                      : "Points reward your practice and consistency. They are not a grade of your English."}
                  </p>
                </div>
              ) : null}
            </section>

            <label
              hidden={!summary.enrolled}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-3 text-xs font-medium text-foreground"
            >
              <span>
                {es ? "Ocultarme de la clasificación pública" : "Hide me from the public leaderboard"}
                <span className="block text-[11px] text-muted-foreground">
                  {es ? "Conservas tus puntos y tu progreso." : "You keep your points and progress."}
                </span>
              </span>
              <input
                type="checkbox"
                checked={summary.hidden}
                onChange={async (e) => {
                  const hidden = e.target.checked;
                  setSummary({ ...summary, hidden });
                  await toggleHidden({ data: { hidden } });
                  void load();
                }}
                className="size-5 accent-[hsl(var(--primary))]"
              />
            </label>

            {!user ? null : null}
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
