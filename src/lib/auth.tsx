import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { JourneyService } from "@/services/journey-service";
import { CloudSync } from "@/services/cloud-sync";
import { PracticeSessionService, setSessionScope } from "@/services/practice-session";
import { setPreferencesScope } from "@/services/preferences";
import { setVerbBankScope, VerbBank } from "@/services/verb-bank";

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
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      const next = session?.user ?? null;
      setUser(next);
      setLoading(false);
      scopeTo(next?.id ?? null);
      if (event === "SIGNED_OUT") {
        JourneyService.clearLocalCache();
        PracticeSessionService.clearAll();
        VerbBank.hydrate({});
        setSync("idle");
      }
    });
    void supabase.auth
      .getUser()
      .then(({ data }) => {
        setUser(data.user ?? null);
        scopeTo(data.user?.id ?? null);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
    return () => sub.subscription.unsubscribe();
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
        VerbBank.hydrate({});
        scopeTo(null);
      },
    }),
    [user, loading, sync],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  return useContext(AuthContext);
}
