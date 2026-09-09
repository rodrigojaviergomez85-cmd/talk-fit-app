import { useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, ImagePlus, Send, X } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";
import { submitBugReport } from "@/lib/bug-reports.functions";
import {
  BUG_REPORT_AREAS,
  MAX_MESSAGE_CHARS,
  MAX_SCREENSHOT_BYTES,
  isAllowedScreenshotType,
  type BugReportArea,
} from "@/lib/bug-reports";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Problem — Fluency App" },
      { name: "description", content: "Tell us what went wrong in Fluency App so we can fix it." },
      { property: "og:title", content: "Report a Problem — Fluency App" },
      { property: "og:description", content: "Tell us what went wrong in Fluency App so we can fix it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReportPage,
});

const AREA_KEYS = {
  home: "report.areaHome",
  practice: "report.areaPractice",
  coach: "report.areaCoach",
  progress: "report.areaProgress",
  recordings: "report.areaRecordings",
  account: "report.areaAccount",
  other: "report.areaOther",
} as const satisfies Record<BugReportArea, string>;

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(file);
  });
}

function ReportPage() {
  const { t, lang } = useAppLang();
  const { user } = useAuth();
  const send = useServerFn(submitBugReport);
  const fileInput = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [area, setArea] = useState<BugReportArea>("other");
  const [expected, setExpected] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const pick = (f: File | null) => {
    if (!f) return;
    if (!isAllowedScreenshotType(f.type)) {
      setError(t("report.screenshotBadType"));
      return;
    }
    if (f.size > MAX_SCREENSHOT_BYTES) {
      setError(t("report.screenshotTooBig"));
      return;
    }
    setError(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearFile = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const submit = async () => {
    if (!message.trim()) {
      setError(t("report.required"));
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const screenshot = file ? { type: file.type as "image/png", base64: await toBase64(file) } : null;
      await send({
        data: {
          message: message.trim().slice(0, MAX_MESSAGE_CHARS),
          area,
          expected: expected.trim() ? expected.trim().slice(0, MAX_MESSAGE_CHARS) : null,
          email: email.trim() ? email.trim() : null,
          context: {
            route: typeof window === "undefined" ? undefined : window.location.pathname,
            lang,
            userAgent: typeof navigator === "undefined" ? undefined : navigator.userAgent.slice(0, 400),
            viewport: typeof window === "undefined" ? undefined : `${window.innerWidth}x${window.innerHeight}`,
            standalone:
              typeof window === "undefined" ? undefined : window.matchMedia("(display-mode: standalone)").matches,
          },
          screenshot,
        },
      });
      setDone(true);
    } catch {
      setError(t("report.failed"));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <AppShell title={t("report.title")}>
        <section className="rounded-3xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]">
          <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden />
          <h2 className="mt-3 text-lg font-extrabold tracking-tight">{t("report.thanksTitle")}</h2>
          <p className="mt-2 text-[14px] font-semibold text-muted-foreground">{t("report.thanksBody")}</p>
          <Link
            to="/"
            className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-primary px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-primary-foreground"
          >
            {t("report.backHome")}
          </Link>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell title={t("report.title")}>
      <div className="space-y-4">
        <p className="text-[14px] font-semibold text-muted-foreground">{t("report.intro")}</p>

        <Field label={t("report.what")}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MAX_MESSAGE_CHARS}
            rows={5}
            placeholder={t("report.whatPlaceholder")}
            className="w-full rounded-2xl border border-border bg-background p-3 text-[15px] outline-none focus:border-primary"
          />
        </Field>

        <Field label={t("report.where")}>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as BugReportArea)}
            className="min-h-[48px] w-full rounded-2xl border border-border bg-background px-3 text-[15px] outline-none focus:border-primary"
          >
            {BUG_REPORT_AREAS.map((a) => (
              <option key={a} value={a}>
                {t(AREA_KEYS[a])}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("report.expected")}>
          <textarea
            value={expected}
            onChange={(e) => setExpected(e.target.value)}
            maxLength={MAX_MESSAGE_CHARS}
            rows={3}
            className="w-full rounded-2xl border border-border bg-background p-3 text-[15px] outline-none focus:border-primary"
          />
        </Field>

        <Field label={t("report.email")}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-[48px] w-full rounded-2xl border border-border bg-background px-3 text-[15px] outline-none focus:border-primary"
          />
        </Field>

        <Field label={t("report.screenshot")}>
          <input
            ref={fileInput}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => pick(e.target.files?.[0] ?? null)}
          />
          {preview ? (
            <div className="space-y-2">
              <img src={preview} alt="" className="max-h-64 w-full rounded-2xl border border-border object-contain" />
              <button
                type="button"
                onClick={clearFile}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
              >
                <X className="size-4" aria-hidden /> {t("report.screenshotRemove")}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              <ImagePlus className="size-4" aria-hidden /> {t("report.screenshot")}
            </button>
          )}
          <p className="mt-1 text-[11px] text-muted-foreground">{t("report.screenshotHint")}</p>
        </Field>

        {error ? <p className="text-[13px] font-semibold text-primary">{error}</p> : null}

        <button
          type="button"
          onClick={submit}
          disabled={busy}
          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[14px] font-bold tracking-wide text-primary-foreground disabled:opacity-60"
        >
          <Send className="size-4" aria-hidden />
          {busy ? t("report.sending") : t("report.send")}
        </button>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
