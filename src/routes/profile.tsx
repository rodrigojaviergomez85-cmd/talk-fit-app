import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { CourseService } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import { PracticeSessionService, setSessionScope } from "@/services/practice-session";

/** Never render NaN/undefined in a stat. */
const num = (value: unknown): number => (typeof value === "number" && Number.isFinite(value) ? value : 0);
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import type { JourneyState } from "@/lib/types";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Account — Fluency Reps" },
      { name: "description", content: "Sign in to save your speaking progress and recordings across devices." },
      { property: "og:title", content: "My Account — Fluency Reps" },
      { property: "og:description", content: "Save your Fluency Reps progress and recordings in the cloud." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [state, setState] = useState<JourneyState>(emptyJourney);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setState(JourneyService.load());
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
      setSessionScope(session?.user.id ?? null);
      // Never keep another session's numbers on screen.
      if (session) void JourneyService.pull().then(setState).catch(() => undefined);
      else setState(JourneyService.load());
    });
    void supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setSessionScope(data.user?.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const signUp = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setMessage(signUp.error ? signUp.error.message : "Check your email to confirm your account.");
    }
    setBusy(false);
  };

  const signInWithGoogle = async () => {
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setMessage("Google sign-in failed. Try again.");
  };

  return (
    <AppShell title="My Account">
      <div className="space-y-5">
        <section className="grid grid-cols-2 gap-3">
          <Stat
            label="Days completed"
            value={`${num(JourneyService.completedCount(state))} / ${num(CourseService.totalDaysAll())}`}
          />
          <Stat label="Speaking minutes" value={`${num(JourneyService.totalSpeakingMinutes(state))}`} />
        </section>


        {userEmail ? (
          <section className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Signed in</p>
            <p className="text-[16px] font-bold">{userEmail}</p>
            <p className="text-[13px] text-muted-foreground">Your progress and recordings sync automatically.</p>
            <button
              type="button"
              onClick={() => void supabase.auth.signOut()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </section>
        ) : (
          <section className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[17px] font-extrabold tracking-tight">Save your progress</p>
            <p className="text-[13px] text-muted-foreground">
              Optional. You can practice without an account, but signing in keeps your recordings safe.
            </p>
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
              placeholder="Password"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px]"
            />
            <button
              type="button"
              disabled={busy || !email || !password}
              onClick={() => void signIn()}
              className="w-full rounded-2xl bg-primary px-5 py-3.5 text-[15px] font-bold tracking-wide text-primary-foreground disabled:opacity-40"
            >
              CONTINUE WITH EMAIL
            </button>
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              className="w-full rounded-2xl border border-border px-5 py-3.5 text-[15px] font-bold tracking-wide"
            >
              CONTINUE WITH GOOGLE
            </button>
            {message ? <p className="text-[13px] text-muted-foreground">{message}</p> : null}
          </section>
        )}

        {confirmReset ? (
          <section className="space-y-3 rounded-3xl border border-destructive/30 bg-card p-5 text-center">
            <p className="text-[17px] font-extrabold tracking-tight">Reset my journey?</p>
            <p className="text-[13px] text-muted-foreground">
              This permanently erases your completed days, course progress, saved practice positions and your streak.
              This can't be undone.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmReset(false)}
                className="flex-1 rounded-2xl border border-border px-4 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setState(JourneyService.reset());
                  PracticeSessionService.clearAll();
                  setConfirmReset(false);
                }}
                className="flex-1 rounded-2xl bg-destructive px-4 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-destructive-foreground"
              >
                Reset everything
              </button>
            </div>
          </section>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="w-full rounded-2xl border border-border px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
          >
            Reset my journey
          </button>
        )}

      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-card p-4 text-center shadow-[var(--shadow-card)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-2xl font-extrabold tabular-nums tracking-tight">{value}</p>
    </div>
  );
}
