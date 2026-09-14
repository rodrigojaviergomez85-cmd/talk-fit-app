import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { JourneyService } from "@/services/journey-service";
import { CloudSync } from "@/services/cloud-sync";
import { PracticeSessionService, setSessionScope } from "@/services/practice-session";
import { PracticeAttempts, setPracticeAttemptScope } from "@/services/practice-attempts";
import { InterviewAttempts, setInterviewAttemptScope } from "@/services/interview-attempts";
import { setPreferencesScope } from "@/services/preferences";
import { setVerbBankScope, VerbBank } from "@/services/verb-bank";
import { setUnlimitedAccess } from "@/lib/unlimited-access";
import { ensureFreshSession, isSessionInvalidError } from "@/lib/session-keeper";

/**
 * One auth listener for the whole app. It scopes local caches to the signed-in
 * learner, restores their data from the backend, and clears everything on
 * sign-out so a shared phone never leaks the previous learner's practice.
 */

export type SyncState = "idle" | "syncing" | "ready" | "failed";

type AuthValue = {
  user: User | null;
  loading: boolean;
  sync: SyncState;
  retrySync: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue>({
  user: null,
  loading: true,
  sync: "idle",
  retrySync: () => undefined,
  signOut: async () => undefined,
});

function scopeTo(userId: string | null) {
  setSessionScope(userId);
  setPracticeAttemptScope(userId);
  setInterviewAttemptScope(userId);
  setPreferencesScope(userId);
  setVerbBankScope(userId);
  JourneyService.invalidatePull();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sync, setSync] = useState<SyncState>("idle");
  const [syncNonce, setSyncNonce] = useState(0);

  useEffect(() => {
    let hydrated: User | null = null;
    let disposed = false;

    const apply = (next: User | null) => {
      hydrated = next;
      setUser(next);
      scopeTo(next?.id ?? null);
      setUnlimitedAccess(next?.email ?? null);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      const next = session?.user ?? null;
      // A missing session on INITIAL_SESSION (or a transient token refresh
      // failure) must never log out a learner who has a stored session.
      if (!next && hydrated && event !== "SIGNED_OUT" && event !== "USER_UPDATED") {
        setLoading(false);
        return;
      }
      apply(next);
      setLoading(false);
      if (event === "SIGNED_OUT") {
        JourneyService.clearLocalCache();
        PracticeSessionService.clearAll();
        PracticeAttempts.clearLocalCache();
        InterviewAttempts.clearLocalCache();
        VerbBank.hydrate({});
        setSync("idle");
      }
    });

    // 1. Trust the session stored on the device first, so a slow or offline
    //    network never shows the sign-in screen to a signed-in learner.
    void supabase.auth
      .getSession()
      .then(({ data }) => {
        if (disposed) return;
        if (data.session?.user) apply(data.session.user);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!disposed) setLoading(false);
      });

    // 2. Validate in the background. Only an explicit "this session is not
    //    valid" answer signs the learner out; network errors keep them in.
    void (async () => {
      const { data, error } = await supabase.auth.getUser().catch(() => ({
        data: { user: null },
        error: { message: "network" } as { message: string },
      }));
      if (disposed) return;
      if (data?.user) {
        apply(data.user);
        return;
      }
      if (error && isSessionInvalidError(error)) apply(null);
    })();

    return () => {
      disposed = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Keep the access token fresh when the app comes back from the background
  // or regains connectivity, before any request can fail with a 401.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const keepAlive = () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      void ensureFreshSession();
    };
    window.addEventListener("visibilitychange", keepAlive);
    document.addEventListener("visibilitychange", keepAlive);
    window.addEventListener("online", keepAlive);
    window.addEventListener("focus", keepAlive);
    return () => {
      window.removeEventListener("visibilitychange", keepAlive);
      document.removeEventListener("visibilitychange", keepAlive);
      window.removeEventListener("online", keepAlive);
      window.removeEventListener("focus", keepAlive);
    };
  }, []);

  // Restore the account's data from the backend once, per sign-in.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setSync("syncing");
    CloudSync.restoreAll()
      .then(() => {
        if (!cancelled) setSync("ready");
      })
      .catch((error: unknown) => {
        console.error("[auth] cloud restore failed", error);
        if (!cancelled) setSync("failed");
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, syncNonce]);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      loading,
      sync,
      retrySync: () => setSyncNonce((n) => n + 1),
      signOut: async () => {
        await supabase.auth.signOut();
        JourneyService.clearLocalCache();
        PracticeSessionService.clearAll();
        PracticeAttempts.clearLocalCache();
        InterviewAttempts.clearLocalCache();
        VerbBank.hydrate({});
        scopeTo(null);
        setUnlimitedAccess(null);
      },
    }),
    [user, loading, sync],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  return useContext(AuthContext);
}
