import { useAppLang } from "@/lib/i18n";
import { formatSentenceDate, toDayKey } from "@/lib/coach-check";

/** One playable final audio as reported by the `coach_check_day` RPC. */
export type CoachAudio = {
  path: string;
  kind: "base" | "latest";
  recorded_at: string | null;
  available_until: string | null;
  expired: boolean;
};

/** Payload of the `coach_check_day` RPC — the server's own counts. */
export type CoachCheckDayPayload = {
  day_key: string;
  retention_days: number;
  practices: number;
  recordings: number;
  audios: CoachAudio[];
};

/**
 * The counted part of Coach Check for one calendar date.
 *
 * Every number here comes from the SERVER, never from the list of playable
 * audio, so it stays identical before and after the audio is deleted.
 */
export function DaySummary({ payload, children }: { payload: CoachCheckDayPayload; children?: React.ReactNode }) {
  const { t, lang } = useAppLang();
  const alive = payload.audios.filter((a) => !a.expired && a.available_until);
  const until = alive
    .map((a) => a.available_until as string)
    .sort()
    .at(-1);

  return (
    <section className="space-y-3">
      <p className="text-[18px] font-extrabold uppercase tracking-tight">
        ✅ {payload.practices > 1 ? `${payload.practices} ${t("coach.recordedMany")}` : t("coach.recorded")}
      </p>
      <p className="text-[14px] font-semibold text-muted-foreground">
        {payload.recordings} {t("coach.recordingsMade")}
      </p>

      {alive.length > 0 ? (
        <>
          {children}
          {until ? (
            <p className="text-[12px] font-semibold text-muted-foreground">
              {t("coach.availableUntil")} {formatSentenceDate(toDayKey(new Date(until)), lang)}
            </p>
          ) : null}
        </>
      ) : (
        <p className="text-[13px] font-semibold text-muted-foreground">{t("coach.audiosExpired")}</p>
      )}
    </section>
  );
}
