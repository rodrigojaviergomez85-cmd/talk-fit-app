import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BellRing } from "lucide-react";
import { useAppLang } from "@/lib/i18n";
import { getPushSupport, subscribeToPush } from "@/lib/push";
import {
  DEFAULT_DAYS,
  TIME_CHIPS,
  currentTimezone,
  saveSchedule,
  type PracticeSchedule,
} from "@/services/practice-reminders";
import { DayChips, TimeChips } from "./ReminderChips";

type Variant = "first" | "second-chance" | "new-device";

type Props = {
  variant: Variant;
  /** Existing schedule — only used by the short "new device" version. */
  schedule?: PracticeSchedule | null;
  onDismiss: () => void;
};

/** One-time card after finishing a day: pick a time and get a phone reminder. */
export function ScheduleReminderCard({ variant, schedule, onDismiss }: Props) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const [time, setTime] = useState(schedule?.timeLocal ?? "19:00");
  const [days, setDays] = useState<number[]>(schedule?.days ?? DEFAULT_DAYS);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ message: string; showInstall: boolean } | null>(null);

  const fill = (key: "rem.donePush" | "rem.doneEmail" | "rem.newDevice", value: string) =>
    t(key).replace("{time}", value);

  async function activateOnThisDevice() {
    setBusy(true);
    const ok = await subscribeToPush();
    if (ok && schedule) {
      await saveSchedule({ ...schedule, channel: "push", enabled: true });
    }
    setBusy(false);
    onDismiss();
  }

  async function remindMe() {
    setBusy(true);
    const support = getPushSupport();
    const base: PracticeSchedule = {
      enabled: true,
      timeLocal: time,
      days: days.length ? days : DEFAULT_DAYS,
      timezone: currentTimezone(),
      channel: support === "push" ? "push" : "email",
    };

    if (support === "push") {
      const granted = await subscribeToPush();
      await saveSchedule({ ...base, channel: granted ? "push" : "email" });
      setResult({
        message: granted ? fill("rem.donePush", time) : fill("rem.doneEmail", time),
        showInstall: false,
      });
    } else if (support === "ios-not-installed") {
      await saveSchedule({ ...base, channel: "email" });
      setResult({ message: t("rem.doneIos"), showInstall: true });
    } else {
      await saveSchedule({ ...base, channel: "email" });
      setResult({ message: fill("rem.doneEmail", time), showInstall: false });
    }
    setBusy(false);
  }

  if (result) {
    return (
      <section className="space-y-3 rounded-3xl border border-primary/30 bg-accent p-4 text-center">
        <p className="text-[14px] font-bold text-accent-foreground">{result.message}</p>
        {result.showInstall ? (
          <Link
            to="/install"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-primary px-4 text-[13px] font-bold uppercase tracking-[0.14em] text-primary-foreground"
          >
            {t("rem.installCta")}
          </Link>
        ) : null}
        <button
          type="button"
          onClick={onDismiss}
          className="text-[13px] font-semibold text-muted-foreground underline"
        >
          {es ? "Cerrar" : "Close"}
        </button>
      </section>
    );
  }

  if (variant === "new-device") {
    return (
      <section className="space-y-3 rounded-3xl border border-primary/30 bg-card p-4 shadow-[var(--shadow-card)]">
        <p className="flex items-start gap-2 text-[14px] font-bold">
          <BellRing className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          {fill("rem.newDevice", schedule?.timeLocal ?? time)}
        </p>
        <button
          type="button"
          disabled={busy}
          onClick={() => void activateOnThisDevice()}
          className="min-h-[48px] w-full rounded-2xl bg-primary text-[13px] font-bold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-60"
        >
          {t("rem.activate")}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="w-full text-[13px] font-semibold text-muted-foreground underline"
        >
          {t("rem.notNow")}
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-3 rounded-3xl border border-primary/30 bg-card p-4 shadow-[var(--shadow-card)]">
      <div>
        <h2 className="text-[17px] font-extrabold tracking-tight">
          {variant === "second-chance" ? t("rem.cardTitleSecond") : t("rem.cardTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">{t("rem.cardSubtitle")}</p>
      </div>

      <TimeChips options={TIME_CHIPS} value={time} onChange={setTime} otherLabel={t("rem.otherTime")} />
      <DayChips value={days} onChange={setDays} es={es} />

      <button
        type="button"
        disabled={busy}
        onClick={() => void remindMe()}
        className="min-h-[48px] w-full rounded-2xl bg-primary text-[13px] font-bold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-60"
      >
        {t("rem.remindMe")}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        className="w-full text-[13px] font-semibold text-muted-foreground underline"
      >
        {t("rem.notNow")}
      </button>
    </section>
  );
}
