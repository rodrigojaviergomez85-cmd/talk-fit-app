import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { ModuleId } from "@/lib/types";
import { CourseService, type LoadedModule } from "@/services/course-service";

export type ModuleContentState =
  | { status: "ready"; module: LoadedModule; retry: () => void }
  | { status: "loading"; module: null; retry: () => void }
  | { status: "error"; module: null; retry: () => void };

/**
 * Resolves a module's full content (dynamic import, session-cached).
 * Already-loaded modules resolve synchronously on first render — no skeleton flash.
 */
export function useModuleContent(moduleId: ModuleId): ModuleContentState {
  const cached = useSyncExternalStore(
    CourseService.subscribe,
    () => CourseService.peekModule(moduleId),
    () => CourseService.peekModule(moduleId),
  );
  const [failed, setFailed] = useState<ModuleId | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (cached) return;
    let active = true;
    CourseService.loadModule(moduleId).catch(() => {
      if (active) setFailed(moduleId);
    });
    return () => {
      active = false;
    };
  }, [moduleId, cached, attempt]);

  const retry = useCallback(() => {
    setFailed(null);
    setAttempt((n) => n + 1);
  }, []);

  if (cached) return { status: "ready", module: cached, retry };
  if (failed === moduleId) return { status: "error", module: null, retry };
  return { status: "loading", module: null, retry };
}
