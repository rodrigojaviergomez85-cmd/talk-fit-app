import { useEffect, useState } from "react";
import { JourneyService } from "@/services/journey-service";
import { loadPreferences, savePreferences } from "@/services/preferences";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useT } from "@/lib/i18n";
import type { ModuleId } from "@/lib/types";

/**
 * One-time, non-blocking invitation for guests to keep their progress after
 * their first completed day. Dismissing it stops it from coming back until
 * several more practices later.
 */
export function SaveProgressPrompt({ moduleId }: { moduleId: ModuleId }) {
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getUser().then(({ data }) => {
      if (cancelled || data.user) return;
      const completed = JourneyService.completedCount(JourneyService.load());
      const prefs = loadPreferences();
      const dismissed = prefs.accountPromptDismissedAt !== null;
      // Show after the first completed day, and again only after 3 more days.
      const due = dismissed ? completed >= prefs.accountPromptDismissedDays + 3 : completed >= 1;
      if (due) setVisible(true);
    });
    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  if (!visible) return null;

  const dismiss = () => {
    const completed = JourneyService.completedCount(JourneyService.load());
    savePreferences({
      accountPromptDismissedAt: new Date().toISOString(),
      accountPromptDismissedDays: completed,
    });
    setVisible(false);
  };

  const signUp = async () => {
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setMessage(error ? error.message : t("account.checkEmail"));
    setBusy(false);
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setMessage(t("account.googleFailed"));
  };

  return (
    <section className="space-y-3 rounded-3xl border border-primary/30 bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-[17px] font-extrabold tracking-tight">{t("save.title")}</p>
      <p className="text-[13px] text-muted-foreground">{t("save.body")}</p>
      <ul className="space-y-1 text-[14px] font-semibold">
        <li>✓ {t("save.item1")}</li>
        <li>✓ {t("save.item2")}</li>
        <li>✓ {t("save.item3")}</li>
      </ul>
      <p className="text-[13px] text-muted-foreground">{t("save.footer")}</p>

      <button
        type="button"
        onClick={() => void google()}
        className="min-h-[52px] w-full rounded-2xl bg-primary px-5 text-[15px] font-bold tracking-wide text-primary-foreground"
      >
        {t("account.continueGoogle")}
      </button>

      {showEmail ? (
        <div className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px]"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t("account.password")}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px]"
          />
          <button
            type="button"
            disabled={busy || !email || !password}
            onClick={() => void signUp()}
            className="min-h-[52px] w-full rounded-2xl border border-border px-5 text-[14px] font-bold tracking-wide disabled:opacity-40"
          >
            {t("account.signUpEmail")}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowEmail(true)}
          className="min-h-[52px] w-full rounded-2xl border border-border px-5 text-[14px] font-bold tracking-wide"
        >
          {t("account.signUpEmail")}
        </button>
      )}

      {message ? <p className="text-[13px] text-muted-foreground">{message}</p> : null}

      <button
        type="button"
        onClick={dismiss}
        className="min-h-[44px] w-full text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
      >
        {t("account.continueGuest")}
      </button>
    </section>
  );
}
