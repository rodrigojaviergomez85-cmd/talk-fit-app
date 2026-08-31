/**
 * App-level preferences (interface language, Spanish learning support,
 * onboarding, account prompt). Stored locally, scoped per learner so two
 * accounts on one device never share preferences.
 */

export type AppLang = "es" | "en";

export type Preferences = {
  appLanguage: AppLang;
  spanishSupport: boolean;
  onboardingCompleted: boolean;
  accountPromptDismissedAt: string | null;
  /** Completed days at the moment the guest dismissed the account prompt. */
  accountPromptDismissedDays: number;
};

const PREFIX = "fluency-reps:prefs:v1";
const LEGACY_ES_KEY = "fluency-reps:es-support";

export const defaultPreferences: Preferences = {
  appLanguage: "es",
  spanishSupport: false,
  onboardingCompleted: false,
  accountPromptDismissedAt: null,
  accountPromptDismissedDays: 0,
};

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
    return {
      appLanguage: parsed.appLanguage === "en" ? "en" : "es",
      spanishSupport:
        typeof parsed.spanishSupport === "boolean" ? parsed.spanishSupport : legacy === "on",
      onboardingCompleted: parsed.onboardingCompleted === true,
      accountPromptDismissedAt:
        typeof parsed.accountPromptDismissedAt === "string" ? parsed.accountPromptDismissedAt : null,
      accountPromptDismissedDays:
        typeof parsed.accountPromptDismissedDays === "number" ? parsed.accountPromptDismissedDays : 0,
    };
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(patch: Partial<Preferences>): Preferences {
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
