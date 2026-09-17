import { useCallback, useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ChevronDown, Crosshair, Flag, Trophy } from "lucide-react";
import { reportAvatarPhoto, signAvatarPhotos } from "@/lib/avatar-photo.functions";
import { AppShell } from "@/components/fluency/AppShell";
import { LearnerAvatar } from "@/components/fluency/LearnerAvatar";
import { useAppLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { JourneyService } from "@/services/journey-service";
import { CourseService } from "@/services/course-service";
import {
  getCohortLeagueSummary,
  getLeagueBoard,
  getLeaguePreview,
  getMyLeagueHistory,
  getMyLeagueSummary,
  setLeagueHidden,
} from "@/lib/league.functions";
import {
  WEEKLY_GOAL,
  formatPoints,
  formatWeekRange,
  progressPercent,
  type LeagueBoardRow,
  type LeagueSummary,
  type LeagueWeekRef,
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
  validateSearch: (search: Record<string, unknown>) => {
    const from = typeof search["from"] === "string" ? (search["from"] as string) : undefined;
    const rawDay = Number(search["day"]);
    const day = Number.isFinite(rawDay) && rawDay > 0 ? Math.floor(rawDay) : undefined;
    return { from, day };
  },
  component: LeaguePage,
});

const PAGE_SIZE = 25;

function LeaguePage() {
  const { lang } = useAppLang();
  const es = lang === "es";
  const { from, day: fromDay } = Route.useSearch();
  // Where "Back to my day" goes: the day we came from, else the learner's
  // current day, else Home.
  const [fallbackDay, setFallbackDay] = useState<{ moduleId: string; day: number } | null>(null);
  useEffect(() => {
    if (from && fromDay) return;
    try {
      const state = JourneyService.load();
      const moduleId = JourneyService.currentModule(state);
      setFallbackDay({ moduleId, day: JourneyService.currentDay(state, moduleId) });
    } catch {
      setFallbackDay(null);
    }
  }, [from, fromDay]);
  const backTo = from && fromDay ? { moduleId: from, day: fromDay } : fallbackDay;
  const { user, loading: authLoading } = useAuth();
  const loadSummary = useServerFn(getMyLeagueSummary);
  const loadPreview = useServerFn(getLeaguePreview);
  const loadBoard = useServerFn(getLeagueBoard);
  const toggleHidden = useServerFn(setLeagueHidden);

  const loadHistory = useServerFn(getMyLeagueHistory);
  const loadCohortSummary = useServerFn(getCohortLeagueSummary);

  const [summary, setSummary] = useState<LeagueSummary | null>(null);
  const [history, setHistory] = useState<LeagueWeekRef[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<LeagueBoardRow[]>([]);
  const [full, setFull] = useState(false);
  const [offset, setOffset] = useState(0);
  const [rows, setRows] = useState<LeagueBoardRow[]>([]);
  const [listed, setListed] = useState(0);
  const [myPosition, setMyPosition] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [openRules, setOpenRules] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [reported, setReported] = useState<string[]>([]);
  const signPhotos = useServerFn(signAvatarPhotos);
  const sendReport = useServerFn(reportAvatarPhoto);

  const signRows = useCallback(
    async (list: LeagueBoardRow[]) => {
      const paths = list.map((r) => r.photo).filter((p): p is string => Boolean(p));
      if (!paths.length) return;
      try {
        const signed = await signPhotos({ data: { paths } });
        setPhotoUrls((prev) => ({ ...prev, ...signed }));
      } catch {
        /* photos simply fall back to avatar or initials */
      }
    },
    [signPhotos],
  );

  const report = useCallback(
    async (path: string) => {
      setReported((prev) => (prev.includes(path) ? prev : [...prev, path]));
      try {
        await sendReport({ data: { path } });
      } catch {
        /* ignore */
      }
    },
    [sendReport],
  );

  const loadFor = useCallback(
    async (competitionId: string | null) => {
      // The learner may already be ahead in the curriculum (day 6) while the
      // calendar week they competed in is still running, so the week is chosen
      // by competition, never by today's curriculum day. The cohort follows the
      // level the learner is actually enrolled in (saved module), never the
      // "next incomplete module" — that used to show Basic Zero to a learner
      // who had already switched to Tigers.
      const journey = JourneyService.load();
      const moduleId = from ?? JourneyService.currentModule(journey);
      const day = fromDay ?? JourneyService.currentDay(journey, moduleId as never);
      // Opened from a day screen: show that module's league (read-only for
      // admin / unlimited accounts that do not compete there).
      let res: LeagueSummary | null = null;
      if (!competitionId && from && fromDay && (from !== moduleId || fromDay !== day)) {
        const cohort = await loadCohortSummary({ data: { moduleId: from, day: fromDay } });
        if (cohort.enrolled || cohort.observer) res = cohort;
      }
      if (!res) {
        res = await loadSummary({
          data: competitionId ? { moduleId, day, competitionId } : { moduleId, day },
        });
      }
      setSummary(res);
      setFull(false);
      setRows([]);
      setOffset(0);
      setPreview([]);
      setMyPosition(null);
      if ((res.enrolled || res.observer) && res.competitionId) {
        const p = await loadPreview({ data: { competitionId: res.competitionId } });
        setPreview(p.rows);
        setMyPosition(p.myPosition);
        void signRows(p.rows);
      }
      return res;
    },
    [from, fromDay, loadCohortSummary, loadPreview, loadSummary, signRows],
  );

  const load = useCallback(async () => {
    try {
      const list = await loadHistory({ data: undefined });
      setHistory(list);
      const current = await loadFor(null);
      // Nothing for today's cohort: fall back to the running week, then to the
      // most recent finished week so the learner can still see how it ended.
      if (!current.enrolled && !current.observer && list.length) {
        const fallback = list.find((w) => w.isCurrent) ?? list[0]!;
        setSelected(fallback.competitionId);
        await loadFor(fallback.competitionId);
      } else {
        setSelected(current.competitionId ?? null);
      }
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [loadFor, loadHistory]);

  useEffect(() => {
    // These server functions require a signed-in session; without one the
    // bearer token is missing and the call fails with "Unauthorized".
    if (authLoading) return;
    if (!user) {
      setStatus("error");
      return;
    }
    void load();
  }, [authLoading, user, load]);

  const selectWeek = useCallback(
    async (competitionId: string) => {
      setSelected(competitionId);
      try {
        await loadFor(competitionId);
      } catch {
        setStatus("error");
      }
    },
    [loadFor],
  );

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
      void signRows(res.rows);
    },
    [loadBoard, signRows, summary?.competitionId],
  );

  const goToMe = useCallback(() => {
    if (myPosition === null) return;
    void openPage(Math.floor(myPosition / PAGE_SIZE) * PAGE_SIZE);
  }, [myPosition, openPage]);

  const activeId = selected ?? summary?.competitionId ?? null;
  const selectedWeek = history.find((w) => w.competitionId === activeId) ?? null;
  const isCurrentWeek = selectedWeek ? selectedWeek.isCurrent : !summary?.closed;

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
        {backTo ? (
          <Link
            to="/day/$moduleId/$day"
            params={{ moduleId: backTo.moduleId as never, day: String(backTo.day) }}
            className="inline-flex h-9 items-center gap-1.5 rounded-2xl border border-border px-3 text-[11px] font-bold uppercase tracking-[0.12em]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {es ? "Volver a mi día" : "Back to my day"}
          </Link>
        ) : (
          <Link
            to="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-2xl border border-border px-3 text-[11px] font-bold uppercase tracking-[0.12em]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {es ? "Volver a mi día" : "Back to my day"}
          </Link>
        )}

        {status === "loading" ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{es ? "Cargando…" : "Loading…"}</p>
        ) : null}

        {status === "error" ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {es ? "No pudimos cargar tu liga. Intenta de nuevo." : "We could not load your league. Try again."}
          </p>
        ) : null}

        {status === "ready" && history.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {history.map((w) => (
              <button
                key={w.competitionId}
                type="button"
                onClick={() => void selectWeek(w.competitionId)}
                className={`shrink-0 rounded-2xl border px-3 py-2 text-left text-[11px] font-bold ${
                  w.competitionId === activeId
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <span className="block">
                  {es ? "Semana " : "Week "}
                  {w.curriculumWeek}
                </span>
                <span className="block text-[10px] font-medium">
                  {formatWeekRange(w.weekStart, w.weekEnd, es)}
                </span>
              </button>
            ))}
          </div>
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
                      isCurrentWeek
                        ? es
                          ? "en curso, cierra el domingo"
                          : "in progress, closes Sunday"
                        : es
                          ? "semana cerrada · resultado final"
                          : "week closed · final result"
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
                    <LearnerAvatar
                      avatarId={row.avatar}
                      photoUrl={row.photo ? (photoUrls[row.photo] ?? null) : null}
                      name={row.name}
                      className="size-7"
                    />
                    <span className="min-w-0 flex-1 truncate">{row.name}</span>
                    <span className="shrink-0 text-[12px] font-bold">{formatPoints(row.points)}</span>
                    {row.photo && !row.isMe ? (
                      <button
                        type="button"
                        aria-label={es ? "Reportar foto" : "Report photo"}
                        disabled={reported.includes(row.photo)}
                        onClick={() => void report(row.photo as string)}
                        className="shrink-0 rounded-full p-1 text-muted-foreground disabled:opacity-40"
                      >
                        <Flag className="size-3.5" />
                      </button>
                    ) : null}
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
                      ? "150 puntos por la historia del día (si hay episodio) y 150 por la práctica de audios completa."
                      : "150 points for the day's story (when there is an episode) and 150 for the complete audio practice."}
                  </p>
                  <p>
                    {es
                      ? `Cinco jornadas por semana: meta de ${formatPoints(summary.attainableGoal || WEEKLY_GOAL)} puntos en esta semana.`
                      : `Five sessions per week: a goal of ${formatPoints(summary.attainableGoal || WEEKLY_GOAL)} points this week.`}
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
              hidden={!summary.enrolled || !isCurrentWeek}
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
