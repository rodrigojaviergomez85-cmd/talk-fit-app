import type { ModuleId } from "@/lib/types";

/**
 * PracticeSession — where the learner is *inside* one day of practice.
 * Local only, position + item state, never audio. Cleared when the day is done.
 */

export type PracticeSession = {
  moduleId: ModuleId;
  day: number;
  week: number | null;
  stage: number;
  subIndex: number;
  attempted: string[];
  skipped: string[];
  startedAt: string;
  updatedAt: string;
};

const PREFIX = "fluency-reps:session:v1";

let scope = "guest";

/** Scope sessions to the signed-in learner (or "guest"). */
export function setSessionScope(userId: string | null) {
  scope = userId ?? "guest";
}

export function sessionScope(): string {
  return scope;
}

function keyFor(moduleId: ModuleId, day: number): string {
  return `${PREFIX}:${scope}:${moduleId}:${day}`;
}

/**
 * Cloud writes are debounced so saving on every rep/prompt change does not
 * turn into network noise; the last position always wins.
 */
let cloudTimer: ReturnType<typeof setTimeout> | null = null;
let pending: PracticeSession | null = null;

function queueCloudSave(session: PracticeSession) {
  if (typeof window === "undefined") return;
  pending = session;
  if (cloudTimer) clearTimeout(cloudTimer);
  cloudTimer = setTimeout(() => {
    const value = pending;
    pending = null;
    cloudTimer = null;
    if (!value) return;
    void import("./cloud-sync")
      .then(({ CloudSync }) => CloudSync.saveSession(value))
      .catch(() => undefined);
  }, 1200);
}


export const PracticeSessionService = {
  load(moduleId: ModuleId, day: number): PracticeSession | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(keyFor(moduleId, day));
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<PracticeSession>;
      if (typeof parsed.stage !== "number") return null;
      return {
        moduleId,
        day,
        week: typeof parsed.week === "number" ? parsed.week : null,
        stage: parsed.stage,
        subIndex: typeof parsed.subIndex === "number" ? parsed.subIndex : 0,
        attempted: Array.isArray(parsed.attempted) ? parsed.attempted.filter((v) => typeof v === "string") : [],
        skipped: Array.isArray(parsed.skipped) ? parsed.skipped.filter((v) => typeof v === "string") : [],
        startedAt: typeof parsed.startedAt === "string" ? parsed.startedAt : new Date().toISOString(),
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
      };
    } catch {
      return null;
    }
  },

  save(session: Omit<PracticeSession, "updatedAt">) {
    if (typeof window === "undefined") return;
    const value: PracticeSession = { ...session, updatedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(keyFor(session.moduleId, session.day), JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
    queueCloudSave(value);
  },

  clear(moduleId: ModuleId, day: number) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(keyFor(moduleId, day));
    } catch {
      /* storage unavailable */
    }
    void import("./cloud-sync").then(({ CloudSync }) => CloudSync.completeSession(moduleId, day)).catch(() => undefined);
  },

  /** Every saved position for the current learner (used by the migration). */
  snapshotAll(): PracticeSession[] {
    if (typeof window === "undefined") return [];
    const prefix = `${PREFIX}:${scope}:`;
    const out: PracticeSession[] = [];
    try {
      for (let i = 0; i < window.localStorage.length; i += 1) {
        const key = window.localStorage.key(i);
        if (!key?.startsWith(prefix)) continue;
        const raw = window.localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw) as PracticeSession;
        if (typeof parsed?.stage === "number") out.push(parsed);
      }
    } catch {
      return out;
    }
    return out;
  },

  /** Writes backend positions into the local cache (cloud wins when newer). */
  hydrate(sessions: PracticeSession[]) {
    if (typeof window === "undefined") return;
    for (const session of sessions) {
      const local = PracticeSessionService.load(session.moduleId, session.day);
      const localNewer =
        local && new Date(local.updatedAt).getTime() > new Date(session.updatedAt).getTime();
      if (localNewer) continue;
      try {
        window.localStorage.setItem(
          keyFor(session.moduleId, session.day),
          JSON.stringify(session),
        );
      } catch {
        /* storage unavailable */
      }
    }
  },


  /** Removes every stored practice position for the current scope. */
  clearAll() {
    if (typeof window === "undefined") return;
    try {
      const prefix = `${PREFIX}:${scope}:`;
      const keys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i += 1) {
        const key = window.localStorage.key(i);
        if (key?.startsWith(prefix)) keys.push(key);
      }
      keys.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      /* storage unavailable */
    }
  },

  /** True when the learner actually got somewhere worth resuming. */
  isResumable(session: PracticeSession | null): boolean {
    if (!session) return false;
    return session.stage > 0 || session.subIndex > 0 || session.attempted.length > 0 || session.skipped.length > 0;
  },
};

export function itemKey(rep: 2 | 4, id: string): string {
  return `r${rep}:${id}`;
}
