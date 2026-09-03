import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";

/**
 * Public password-reset landing page. The recovery email links here with a
 * `type=recovery` token in the URL hash; once the recovery session exists we
 * let the learner choose a new password.
 */
export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Fluency Reps" },
      { name: "description", content: "Choose a new password for your Fluency Reps account." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Reset Password — Fluency Reps" },
      { property: "og:description", content: "Choose a new password for your Fluency Reps account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const t = useT();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const isRecovery = window.location.hash.includes("type=recovery");
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    // If the hash was already consumed before this listener attached, a
    // session may already exist.
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session && isRecovery) setReady(true);
      else if (!isRecovery && !data.session) setInvalid(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async () => {
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setBusy(false);
      return;
    }
    setMessage(t("reset.done"));
    setBusy(false);
    window.setTimeout(() => void navigate({ to: "/profile" }), 1200);
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg items-center p-5">
      <section className="w-full space-y-4 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="size-7" />
        </div>
        <h1 className="text-center text-[22px] font-extrabold leading-tight tracking-tight">{t("reset.title")}</h1>
        {invalid ? (
          <p className="text-center text-[13px] text-muted-foreground">{t("reset.invalid")}</p>
        ) : (
          <>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("reset.newPassword")}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px]"
            />
            <button
              type="button"
              disabled={busy || !ready || password.length < 6}
              onClick={() => void submit()}
              className="min-h-[52px] w-full rounded-2xl bg-primary px-5 text-[15px] font-bold tracking-wide text-primary-foreground disabled:opacity-40"
            >
              {t("reset.submit")}
            </button>
          </>
        )}
        {message ? <p className="text-center text-[13px] text-muted-foreground">{message}</p> : null}
      </section>
    </main>
  );
}
