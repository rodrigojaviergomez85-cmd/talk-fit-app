import { useState } from "react";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

/**
 * AuthGate — the pilot requires an account before any practice.
 * Same two sign-in paths everywhere: Google (primary) and email.
 * Email has an explicit SIGN IN / CREATE ACCOUNT choice; sign-in never
 * silently falls back to sign-up, and failure states offer recovery
 * (password reset, resend confirmation).
 */
export function AuthGate({ title, blocking = false }: { title?: string; blocking?: boolean }) {
  const t = useT();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [recovery, setRecovery] = useState<"reset" | "resend" | null>(null);
  const [busy, setBusy] = useState(false);

  const withEmail = async () => {
    setBusy(true);
    setMessage(null);
    setRecovery(null);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setMessage(error ? error.message : t("account.checkEmail"));
      setBusy(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.code === "invalid_credentials") {
        setMessage(t("account.wrongCredentials"));
        setRecovery("reset");
      } else if (error.code === "email_not_confirmed") {
        setMessage(t("account.emailNotConfirmed"));
        setRecovery("resend");
      } else {
        setMessage(error.message);
      }
    }
    setBusy(false);
  };

  const sendReset = async () => {
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setMessage(error ? error.message : t("account.resetSent"));
    setBusy(false);
  };

  const resendConfirmation = async () => {
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setMessage(error ? error.message : t("account.checkEmail"));
    setBusy(false);
  };

  const withGoogle = async () => {
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setMessage(t("account.googleFailed"));
  };

  return (
    <section className="mx-auto w-full max-w-lg space-y-4 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Lock className="size-7" />
      </div>
      <h2 className="text-center text-[22px] font-extrabold leading-tight tracking-tight">
        {title ?? (blocking ? t("gate.practiceTitle") : t("gate.title"))}
      </h2>
      <ul className="space-y-1.5 text-[14px] font-semibold">
        <li>✓ {t("gate.b1")}</li>
        <li>✓ {t("gate.b2")}</li>
        <li>✓ {t("gate.b3")}</li>
      </ul>

      <button
        type="button"
        onClick={() => void withGoogle()}
        className="min-h-[52px] w-full rounded-2xl bg-primary px-5 text-[15px] font-bold tracking-wide text-primary-foreground active:scale-[0.98]"
      >
        {t("account.continueGoogle")}
      </button>

      <div className="space-y-2 pt-1">
        <div className="grid grid-cols-2 gap-2" role="group" aria-label={t("account.modeLabel")}>
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => {
                setMode(m);
                setMessage(null);
                setRecovery(null);
              }}
              className={cn(
                "min-h-[44px] rounded-2xl border text-[12px] font-bold uppercase tracking-wide",
                mode === m ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
              )}
            >
              {m === "signin" ? t("account.modeSignIn") : t("account.modeSignUp")}
            </button>
          ))}
        </div>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px]"
        />
        <input
          type="password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={t("account.password")}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px]"
        />
        <button
          type="button"
          disabled={busy || !email || !password}
          onClick={() => void withEmail()}
          className="min-h-[52px] w-full rounded-2xl border border-border px-5 text-[15px] font-bold tracking-wide disabled:opacity-40"
        >
          {mode === "signin" ? t("account.continueEmail") : t("account.signUpEmail")}
        </button>
        {mode === "signin" ? (
          <button
            type="button"
            disabled={busy || !email}
            onClick={() => void sendReset()}
            className="min-h-[44px] w-full text-center text-[12px] font-semibold text-muted-foreground underline underline-offset-2 disabled:opacity-40"
          >
            {t("account.forgotPassword")}
          </button>
        ) : null}
      </div>

      <p className="text-center text-[12px] text-muted-foreground">{t("gate.haveAccount")}</p>
      {message ? <p className="text-center text-[13px] text-muted-foreground">{message}</p> : null}
      {recovery === "resend" ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => void resendConfirmation()}
          className="min-h-[44px] w-full rounded-2xl border border-primary px-5 text-[13px] font-bold text-primary disabled:opacity-40"
        >
          {t("account.resendConfirmation")}
        </button>
      ) : null}
    </section>
  );
}
