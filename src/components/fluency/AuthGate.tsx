import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useT } from "@/lib/i18n";
import { localPasswordIssueKey, signUpErrorKey } from "@/lib/auth-errors";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

/** Lightweight inline Google "G" brand mark (no runtime download). */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45c-.28 1.49-1.12 2.75-2.38 3.6v2.99h3.85c2.26-2.08 3.58-5.15 3.58-8.78z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.85-2.99c-1.07.72-2.44 1.14-4.09 1.14-3.14 0-5.8-2.12-6.75-4.97H1.28v3.09C3.26 21.31 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.25 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.64H1.28C.47 8.25 0 10.04 0 12s.47 3.75 1.28 5.36l3.97-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.76c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.64l3.97 3.09C6.2 6.88 8.86 4.76 12 4.76z"
      />
    </svg>
  );
}

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
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [recovery, setRecovery] = useState<"reset" | "resend" | null>(null);
  const [busy, setBusy] = useState(false);

  const withEmail = async () => {
    setBusy(true);
    setMessage(null);
    setRecovery(null);
    if (mode === "signup") {
      // Catch the obvious case before spending a round trip on it.
      const localIssue = localPasswordIssueKey(password);
      if (localIssue) {
        setMessage(t(localIssue));
        setBusy(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        const key = signUpErrorKey(error);
        setMessage(key ? t(key) : error.message);
        if (key === "account.emailInUse") setRecovery("reset");
      } else {
        setMessage(t("account.checkEmail"));
      }
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

  const inputClass =
    "w-full min-h-[52px] rounded-2xl border border-border bg-background px-4 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:border-primary";

  return (
    <section className="mx-auto w-full max-w-lg space-y-5 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
      {/* Brand + message */}
      <div className="flex flex-col items-center gap-3 text-center">
        <img
          src="/icon-192.png"
          alt="Fluency App"
          width={56}
          height={56}
          className="size-14 rounded-2xl shadow-sm"
        />
        <h2 className="text-[22px] font-extrabold leading-tight tracking-tight">
          {title ?? (blocking ? t("gate.practiceTitle") : t("gate.title"))}
        </h2>
        <p className="text-[14px] font-medium text-muted-foreground">{t("gate.subtitle")}</p>
        <ul className="space-y-1.5 text-left text-[13px] font-semibold text-foreground/90">
          <li className="flex items-start gap-2">
            <span className="text-primary" aria-hidden="true">✓</span>
            <span>{t("gate.b1")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary" aria-hidden="true">✓</span>
            <span>{t("gate.b2")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary" aria-hidden="true">✓</span>
            <span>{t("gate.b3")}</span>
          </li>
        </ul>
      </div>

      {/* Google — primary, visually Google */}
      <div className="space-y-1.5">
        <button
          type="button"
          onClick={() => void withGoogle()}
          className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-2xl border border-border bg-white px-5 text-[15px] font-bold tracking-wide text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <GoogleG className="size-5 shrink-0" />
          {t("account.continueGoogle")}
        </button>
        <p className="text-center text-[11px] font-medium text-muted-foreground">{t("gate.fast")}</p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[12px] font-semibold text-muted-foreground">{t("gate.or")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Email sign in / create account */}
      <div className="space-y-3">
        <div
          role="tablist"
          aria-label={t("account.modeLabel")}
          className="grid grid-cols-2 gap-1 rounded-2xl bg-muted p-1"
        >
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setMessage(null);
                setRecovery(null);
              }}
              className={cn(
                "min-h-[44px] rounded-xl text-[12px] font-bold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              {m === "signin" ? t("account.modeSignIn") : t("account.modeSignUp")}
            </button>
          ))}
        </div>

        <div className="space-y-1">
          <label htmlFor="authgate-email" className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
            {t("gate.email")}
          </label>
          <input
            id="authgate-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="authgate-password" className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
            {t("account.password")}
          </label>
          <div className="relative">
            <input
              id="authgate-password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("account.password")}
              className={cn(inputClass, "pr-12")}
            />
            <button
              type="button"
              aria-label={showPassword ? t("gate.hidePassword") : t("gate.showPassword")}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-r-2xl"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <button
          type="button"
          disabled={busy || !email || !password}
          onClick={() => void withEmail()}
          className="min-h-[52px] w-full rounded-2xl bg-primary px-5 text-[15px] font-bold tracking-wide text-primary-foreground active:scale-[0.98] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          {mode === "signin" ? t("account.modeSignIn") : t("account.modeSignUp")}
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
