import { useEffect, useRef, useState } from "react";

import { APP_BUILD_ID } from "@/lib/build-id";
import { isActivityBusy, subscribeActivity } from "@/lib/activity-lock";

const CHECK_MS = 120_000;
const RELOAD_FLAG = "app-update-reloaded";
/** Screens where a refresh would interrupt listening, recording or answering. */
const BUSY_PATHS = /^\/(day\/|practice|review\/[^/]+\/|ai-coach|coach-check|simulador|interview|natural-method\/cuento\/|onboarding)/;

function busyNow(): boolean {
  return isActivityBusy() || BUSY_PATHS.test(window.location.pathname);
}

async function fetchBuild(): Promise<string | null> {
  try {
    const res = await fetch("/api/public/version", { cache: "no-store" });
    if (!res.ok) return null;
    const body = (await res.json()) as { build?: unknown };
    return typeof body.build === "string" ? body.build : null;
  } catch {
    return null;
  }
}

function reloadOnce() {
  try {
    // A broken deploy must never loop: one rescue reload per browser session.
    if (window.sessionStorage.getItem(RELOAD_FLAG)) return;
    window.sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    /* storage blocked — still reload once */
  }
  window.location.reload();
}

/**
 * Notices new published versions and refreshes the app by itself, but only
 * while the learner is not recording, listening or answering. Returns whether
 * an update is waiting so the UI can offer a manual "update now".
 */
export function useAppUpdate(): { updateReady: boolean; applyUpdate: () => void } {
  const [updateReady, setUpdateReady] = useState(false);
  const ready = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let alive = true;

    const applyIfFree = () => {
      if (!ready.current || busyNow()) return;
      window.location.reload();
    };

    const check = async () => {
      if (!alive || ready.current) return;
      const build = await fetchBuild();
      if (!alive || !build || build === APP_BUILD_ID) return;
      ready.current = true;
      setUpdateReady(true);
      applyIfFree();
    };

    void check();
    const timer = window.setInterval(() => {
      void check();
      applyIfFree();
    }, CHECK_MS);
    const onWake = () => {
      if (document.visibilityState === "visible") void check();
      applyIfFree();
    };
    window.addEventListener("visibilitychange", onWake);
    window.addEventListener("focus", onWake);
    // As soon as the learner finishes the activity, the pending update lands.
    const unsubscribe = subscribeActivity((busy) => {
      if (!busy) applyIfFree();
    });

    // Old page asking for chunks the new deploy no longer has.
    const onPreloadError = (event: Event) => {
      event.preventDefault();
      reloadOnce();
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      const message = String((event.reason as Error | undefined)?.message ?? event.reason ?? "");
      if (/dynamically imported module|Importing a module script failed/i.test(message)) {
        reloadOnce();
      }
    };
    window.addEventListener("vite:preloadError", onPreloadError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      alive = false;
      window.clearInterval(timer);
      window.removeEventListener("visibilitychange", onWake);
      window.removeEventListener("focus", onWake);
      window.removeEventListener("vite:preloadError", onPreloadError);
      window.removeEventListener("unhandledrejection", onRejection);
      unsubscribe();
    };
  }, []);

  return {
    updateReady,
    applyUpdate: () => window.location.reload(),
  };
}
