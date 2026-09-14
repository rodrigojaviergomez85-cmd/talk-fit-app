import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

import { useAppUpdate } from "@/hooks/use-app-update";
import { useAppLang } from "@/lib/i18n";

/**
 * Mounted once at the app root. Refreshes the app by itself after a new
 * version is published, and only nudges the learner when they have been busy
 * for a while.
 */
export function AppUpdateWatcher() {
  const { updateReady, applyUpdate } = useAppUpdate();
  const es = useAppLang().lang === "es";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Leaving an activity screen is a safe moment to pick up the new version.
  useEffect(() => {
    if (updateReady) applyUpdate();
  }, [pathname, updateReady, applyUpdate]);

  useEffect(() => {
    if (!updateReady) return;
    const timer = window.setTimeout(() => {
      toast(es ? "Nueva versión disponible" : "New version available", {
        duration: Infinity,
        action: {
          label: es ? "Actualizar" : "Update",
          onClick: () => applyUpdate(),
        },
      });
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [updateReady, es, applyUpdate]);

  return null;
}
