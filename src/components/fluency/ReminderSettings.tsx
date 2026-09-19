import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarPlus } from "lucide-react";
import { useAppLang } from "@/lib/i18n";
import { getPushSupport, notificationPermission, subscribeToPush } from "@/lib/push";
import {
  DEFAULT_DAYS,
  TIME_CHIPS,
  currentTimezone,
  downloadIcs,
  loadSchedule,
  saveSchedule,
  type PracticeSchedule,
} from "@/services/practice-reminders";
import { cn } from "@/lib/utils";
import { DayChips, TimeChips } from "./ReminderChips";

/** "Mi horario" — reminders section inside the profile screen. */
export function ReminderSettings({ email }: { email: string | null }) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const [schedule, setSchedule] = useState<PracticeSchedule | null>(null);
  const [ready, setReady] = useState(false);
  const [permission, setPermission] = useState<string>("unsupported");

  useEffect(() => {
    setPermission(notificationPermission());
    void loadSchedule()
      .then((s) => setSchedule(s))
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  const current: PracticeSchedule = schedule ?? {
    enabled: false,
    timeLocal: "19:00",
    days: DEFAULT_DAYS,
    timezone: currentTimezone(),
    channel: "email",
  };

  function patch(next: Partial<PracticeSchedule>) {
    const merged = { ...current, ...next, timezone: currentTimezone() };
    setSchedule(merged);
    void saveSchedule(merged).catch(() => undefined);
  }

  async function activateHere() {
    const support = getPushSupport();
    if (support !== "push") return;
    const ok = await subscribeToPush();
    setPermission(notificationPermission());
    if (ok) patch({ channel: "push", enabled: true });
  }

  const support = getPushSupport();
  const pushHere = current.channel === "push" && permission === "granted";

  return (
    <section className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {t("rem.section")}
      </p>

      <div className="flex items-center justify-between gap-3">
        <span className="text-[14px] font-bold">{t("rem.toggle")}</span>
        <button
          type="button"
          role="switch"
          aria-checked={current.enabled}
          aria-label={t("rem.toggle")}
          disabled={!ready}
          onClick={() => patch({ enabled: !current.enabled })}
          className={cn(
            "relative h-7 w-12 shrink-0 rounded-full transition-colors",
            current.enabled ? "bg-primary" : "bg-muted",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-6 rounded-full bg-background transition-all",
              current.enabled ? "left-[1.375rem]" : "left-0.5",
            )}
          />
        </button>
      </div>

      {current.enabled ? (
        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {t("rem.time")}
            </p>
            <TimeChips
              options={TIME_CHIPS}
              value={current.timeLocal}
              onChange={(timeLocal) => patch({ timeLocal })}
              otherLabel={t("rem.otherTime")}
            />
          </div>

          <div>
            <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {t("rem.days")}
            </p>
            <DayChips value={current.days} onChange={(days) => patch({ days })} es={es} />
          </div>

          {pushHere ? (
            <p className="text-[13px] font-semibold text-muted-foreground">{t("rem.onPhone")}</p>
          ) : (
            <div className="space-y-2">
              <p className="text-[13px] text-muted-foreground">
                {t("rem.byEmail")} {email ?? "—"}.
              </p>
              {support === "ios-not-installed" ? (
                <Link
                  to="/install"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
                >
                  {t("rem.installCta")}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => void activateHere()}
                  disabled={support !== "push"}
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em] disabled:opacity-50"
                >
                  {t("rem.activateHere")}
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => downloadIcs(current, es ? "es" : "en")}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
          >
            <CalendarPlus className="size-4" aria-hidden /> {t("rem.addCalendar")}
          </button>
        </div>
      ) : null}
    </section>
  );
}
