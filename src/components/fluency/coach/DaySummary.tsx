import { useAppLang } from "@/lib/i18n";
import { formatSentenceDate, summarizeDay, toDayKey, type CoachCheckDayPayload } from "@/lib/coach-check";

export type { CoachCheckDayPayload };

/**
 * The counted part of Coach Check for one calendar date.
 *
 * Every number here comes from the SERVER, never from the list of playable
 * audio, so it stays identical before and after the audio is deleted.
 */
export function DaySummary({ payload, children }: { payload: CoachCheckDayPayload; children?: React.ReactNode }) {
  const { t, lang } = useAppLang();
  const view = summarizeDay(payload);

  return (
    <section className="space-y-3">
      <p className="text-[18px] font-extrabold uppercase tracking-tight">
        ✅ {view.practices > 1 ? `${view.practices} ${t("coach.recordedMany")}` : t("coach.recorded")}
      </p>
      <p className="text-[14px] font-semibold text-muted-foreground">
        {view.recordings} {t("coach.recordingsMade")}
      </p>

      {view.state === "available" ? (
        <>
          {children}
          {view.availableUntil ? (
            <p className="text-[12px] font-semibold text-muted-foreground">
              {t("coach.availableUntil")} {formatSentenceDate(toDayKey(new Date(view.availableUntil)), lang)}
            </p>
          ) : null}
        </>
      ) : (
        <p className="text-[13px] font-semibold text-muted-foreground">{t("coach.audiosExpired")}</p>
      )}
    </section>
  );
}
