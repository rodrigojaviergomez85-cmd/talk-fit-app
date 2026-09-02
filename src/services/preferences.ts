/**
 * App-level preferences (interface language, Spanish learning support,
 * onboarding, account prompt, placement). Stored locally, scoped per learner
 * so two accounts on one device never share preferences.
 */

import type { ModuleId } from "@/lib/types";

export type AppLang = "es" | "en";

export type Preferences = {
  appLanguage: AppLang;
  spanishSupport: boolean;
  onboardingCompleted: boolean;
  accountPromptDismissedAt: string | null;
  /** Completed days at the moment the guest dismissed the account prompt. */
  accountPromptDismissedDays: number;
  /** Where the learner is currently studying (internal module id). */
  currentModuleId: ModuleId | null;
  /** Where the learner originally chose to begin — never overwritten by level changes. */
  initialPlacementModuleId: ModuleId | null;
  placementSource: string | null;
  placementSelectedAt: string | null;
  placementChangedAt: string | null;
  placementChangeCount: number;
};

const PREFIX = "fluency-reps:prefs:v1";
const LEGACY_ES_KEY = "fluency-reps:es-support";
/** Unscoped on purpose: chosen before an account exists, must survive OAuth redirects. */
const PENDING_PLACEMENT_KEY = "fluency-reps:pending_starting_module_id";

export const defaultPreferences: Preferences = {
  appLanguage: "es",
  spanishSupport: false,
  onboardingCompleted: false,
  accountPromptDismissedAt: null,
  accountPromptDismissedDays: 0,
  currentModuleId: null,
  initialPlacementModuleId: null,
  placementSource: null,
  placementSelectedAt: null,
  placementChangedAt: null,
  placementChangeCount: 0,
};

const MODULE_IDS = new Set<string>([
  "basic-zero",
  "simple-present",
  "past-stories",
  "simple-future",
  "mixed-tenses",
  "eagles-week-1",
  "tigers",
  "sharks",
]);

function asModuleId(value: unknown): ModuleId | null {
  return typeof value === "string" && MODULE_IDS.has(value) ? (value as ModuleId) : null;
}

let scope = "guest";
const listeners = new Set<() => void>();

function keyFor(id: string): string {
  return `${PREFIX}:${id}`;
}

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribePreferences(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Scope preferences to the signed-in learner (or "guest"). */
export function setPreferencesScope(userId: string | null) {
  const next = userId ?? "guest";
  if (next === scope) return;
  scope = next;
  notify();
}

export function loadPreferences(): Preferences {
  if (typeof window === "undefined") return defaultPreferences;
  try {
    const raw = window.localStorage.getItem(keyFor(scope));
    const parsed = raw ? (JSON.parse(raw) as Partial<Preferences>) : {};
    const legacy = window.localStorage.getItem(LEGACY_ES_KEY);
    const str = (v: unknown) => (typeof v === "string" ? v : null);
    return {
      appLanguage: parsed.appLanguage === "en" ? "en" : "es",
      spanishSupport:
        typeof parsed.spanishSupport === "boolean" ? parsed.spanishSupport : legacy === "on",
      onboardingCompleted: parsed.onboardingCompleted === true,
      accountPromptDismissedAt: str(parsed.accountPromptDismissedAt),
      accountPromptDismissedDays:
        typeof parsed.accountPromptDismissedDays === "number" ? parsed.accountPromptDismissedDays : 0,
      currentModuleId: asModuleId(parsed.currentModuleId),
      initialPlacementModuleId: asModuleId(parsed.initialPlacementModuleId),
      placementSource: str(parsed.placementSource),
      placementSelectedAt: str(parsed.placementSelectedAt),
      placementChangedAt: str(parsed.placementChangedAt),
      placementChangeCount:
        typeof parsed.placementChangeCount === "number" ? parsed.placementChangeCount : 0,
    };
  } catch {
    return defaultPreferences;
  }
}

/** Local write only — no cloud push (used when hydrating FROM the cloud). */
export function writePreferencesLocal(patch: Partial<Preferences>): Preferences {
  const next = { ...loadPreferences(), ...patch };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(keyFor(scope), JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }
  notify();
  return next;
}

export function savePreferences(patch: Partial<Preferences>): Preferences {
  const next = writePreferencesLocal(patch);
  if (typeof window !== "undefined" && scope !== "guest") {
    void import("./cloud-sync")
      .then(({ CloudSync }) => CloudSync.pushPreferences())
      .catch(() => undefined);
  }
  return next;
}

/* ----------------------- Pending placement (pre-auth) ---------------------- */

export function setPendingPlacement(moduleId: ModuleId) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      PENDING_PLACEMENT_KEY,
      JSON.stringify({ moduleId, selectedAt: new Date().toISOString() }),
    );
  } catch {
    /* storage unavailable */
  }
}

export function getPendingPlacement(): { moduleId: ModuleId; selectedAt: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PENDING_PLACEMENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { moduleId?: unknown; selectedAt?: unknown };
    const moduleId = asModuleId(parsed.moduleId);
    if (!moduleId) return null;
    return { moduleId, selectedAt: typeof parsed.selectedAt === "string" ? parsed.selectedAt : new Date().toISOString() };
  } catch {
    return null;
  }
}

export function clearPendingPlacement() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PENDING_PLACEMENT_KEY);
  } catch {
    /* storage unavailable */
  }
}
