import { supabase } from "@/integrations/supabase/client";
import type { DayRecord, JourneyState, ModuleId, SelfAssessment } from "@/lib/types";
import { CourseService, isModuleId } from "./course-service";

/**
 * JourneyService — progress across learning modules (Basic Zero, Simple Present).
 * Local-first (works offline and signed out); mirrors to Lovable Cloud when a
 * student is signed in, so final recordings survive across devices.
 */

const STORAGE_KEY = "fluency-reps:journey:v2";
const LEGACY_KEY = "fluency-reps:journey:v1";

export const emptyJourney: JourneyState = {
  days: {},
  streakDays: 0,
  totalRepsCompleted: 0,
  totalSpeakingSeconds: 0,
  weekSeconds: {},
};

/** Storage key for one module day. */
export function recordKey(moduleId: ModuleId, day: number): string {
  return `${moduleId}:${day}`;
}

function dayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** v1 stored days keyed by number and had no moduleId — those were Simple Present. */
function migrate(state: JourneyState): JourneyState {
  const days: Record<string, DayRecord> = {};
  for (const [key, record] of Object.entries(state.days)) {
    if (key.includes(":")) {
      days[key] = record;
      continue;
    }
    const day = Number(key);
    days[recordKey("simple-present", day)] = { ...record, moduleId: "simple-present", day };
  }
  return { ...state, days };
}

function read(): JourneyState {
  if (typeof window === "undefined") return emptyJourney;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_KEY);
    if (!raw) return emptyJourney;
    return migrate({ ...emptyJourney, ...(JSON.parse(raw) as Partial<JourneyState>) });
  } catch {
    return emptyJourney;
  }
}

function write(state: JourneyState) {
  if (typeof window === "undefined") return;
  try {
    // Object URLs are session-scoped: never persist them.
    const days: Record<string, DayRecord> = {};
    for (const [key, record] of Object.entries(state.days)) {
      days[key] = { ...record, finalUrl: null, firstUrl: null };
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, days }));
  } catch {
    /* storage unavailable */
  }
}

/** Session-scoped playback URLs, kept out of localStorage. */
const sessionUrls = new Map<string, { finalUrl: string | null; firstUrl: string | null }>();

/** Shared in-flight/recent cloud pull, so screens don't each re-query. */
const PULL_TTL_MS = 30_000;
let pullCache: { at: number; promise: Promise<JourneyState> } | null = null;

export const JourneyService = {
  dayKey,
  recordKey,

  load(): JourneyState {
    const state = read();
    for (const [key, urls] of sessionUrls) {
      const record = state.days[key];
      if (record) state.days[key] = { ...record, ...urls };
    }
    return state;
  },

  save(state: JourneyState) {
    write(state);
  },

  getRecord(state: JourneyState, moduleId: ModuleId, day: number): DayRecord | undefined {
    return state.days[recordKey(moduleId, day)];
  },

  moduleRecords(state: JourneyState, moduleId: ModuleId): DayRecord[] {
    return Object.values(state.days)
      .filter((record) => record.moduleId === moduleId)
      .sort((a, b) => a.day - b.day);
  },

  /** The day the learner should practice next (sequential unlock, no waiting). */
  currentDay(state: JourneyState, moduleId: ModuleId): number {
    const total = CourseService.totalDays(moduleId);
    for (let day = 1; day <= total; day += 1) {
      if (!state.days[recordKey(moduleId, day)]) return day;
    }
    return total;
  },

  isDayCompleted(state: JourneyState, moduleId: ModuleId, day: number): boolean {
    return Boolean(state.days[recordKey(moduleId, day)]);
  },

  /** All days are open: the learner can practice any day at any time. */
  isDayUnlocked(_state: JourneyState, _moduleId: ModuleId, _day: number): boolean {
    return true;
  },

  moduleComplete(state: JourneyState, moduleId: ModuleId): boolean {
    return JourneyService.completedCount(state, moduleId) >= CourseService.totalDays(moduleId);
  },

  /**
   * The single next practice across all modules, in learning order.
   * Returns null only when every existing module is complete.
   */
  nextPractice(state: JourneyState): { moduleId: ModuleId; day: number; started: boolean } | null {
    const modules = [...CourseService.modules()].sort((a, b) => a.order - b.order);
    for (const module of modules) {
      if (JourneyService.moduleComplete(state, module.id)) continue;
      const day = JourneyService.currentDay(state, module.id);
      return {
        moduleId: module.id,
        day,
        started: JourneyService.completedCount(state, module.id) > 0,
      };
    }
    return null;
  },

  /** Completed day records inside one week of a module, in day order. */
  weekRecords(state: JourneyState, moduleId: ModuleId, week: number): DayRecord[] {
    return CourseService.getDays(moduleId)
      .filter((d) => d.week === week)
      .map((d) => state.days[recordKey(moduleId, d.day)])
      .filter((record): record is DayRecord => Boolean(record));
  },

  weekTotalDays(moduleId: ModuleId, week: number): number {
    return CourseService.getDays(moduleId).filter((d) => d.week === week).length;
  },

  weekComplete(state: JourneyState, moduleId: ModuleId, week: number): boolean {
    const total = JourneyService.weekTotalDays(moduleId, week);
    return total > 0 && JourneyService.weekRecords(state, moduleId, week).length >= total;
  },

  completedCount(state: JourneyState, moduleId?: ModuleId): number {
    if (!moduleId) return Object.keys(state.days).length;
    return JourneyService.moduleRecords(state, moduleId).length;
  },

  /** Total recorded speaking seconds inside one module. */
  moduleSeconds(state: JourneyState, moduleId: ModuleId): number {
    return JourneyService.moduleRecords(state, moduleId).reduce((total, r) => total + r.practiceSeconds, 0);
  },

  /** Speaking minutes recorded in the last 7 local days. */
  speakingMinutesThisWeek(state: JourneyState): number {
    const now = new Date();
    let seconds = 0;
    for (let i = 0; i < 7; i += 1) {
      const key = dayKey(new Date(now.getTime() - i * 86400000));
      seconds += state.weekSeconds[key] ?? 0;
    }
    return Math.round(seconds / 60);
  },

  totalSpeakingMinutes(state: JourneyState): number {
    return Math.round(state.totalSpeakingSeconds / 60);
  },

  /** Every completed day record in learning order (module order, then day). */
  allRecords(state: JourneyState): DayRecord[] {
    const order = new Map(CourseService.modules().map((m) => [m.id, m.order]));
    return Object.values(state.days).sort((a, b) => {
      const diff = (order.get(a.moduleId) ?? 0) - (order.get(b.moduleId) ?? 0);
      return diff !== 0 ? diff : a.day - b.day;
    });
  },

  /** Completed days ordered by when they were finished (oldest first). */
  recordsByDate(state: JourneyState): DayRecord[] {
    return Object.values(state.days).sort(
      (a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime(),
    );
  },

  /** Saved final reps that actually have audio behind them. */
  playableRecords(state: JourneyState): DayRecord[] {
    return JourneyService.recordsByDate(state).filter((r) => Boolean(r.recordingPath || r.finalUrl));
  },

  /** Earliest and latest saved final rep — null unless there are at least two. */
  thenVsNow(state: JourneyState): { then: DayRecord; now: DayRecord } | null {
    const records = JourneyService.recordsByDate(state);
    if (records.length < 2) return null;
    const then = records[0]!;
    const now = records[records.length - 1]!;
    if (then === now) return null;
    return { then, now };
  },

  /** Objective personal bests, computed only from saved data. */
  personalBests(state: JourneyState): {
    longestSeconds: number | null;
    mostIdeas: number | null;
    totalMinutes: number;
  } {
    const records = Object.values(state.days);
    const seconds = records.map((r) => r.finalSeconds).filter((n) => n > 0);
    const ideas = records
      .map((r) => r.sentenceCount)
      .filter((n): n is number => typeof n === "number" && n > 0);
    return {
      longestSeconds: seconds.length ? Math.max(...seconds) : null,
      mostIdeas: ideas.length ? Math.max(...ideas) : null,
      totalMinutes: JourneyService.totalSpeakingMinutes(state),
    };
  },

  /** Practice done in the last 7 local days. */
  weekStats(state: JourneyState): { days: number; reps: number; minutes: number } {
    const now = new Date();
    const keys = new Set<string>();
    for (let i = 0; i < 7; i += 1) keys.add(dayKey(new Date(now.getTime() - i * 86400000)));
    const days = Object.values(state.days).filter((r) => keys.has(r.dayKey)).length;
    return { days, reps: days * 5, minutes: JourneyService.speakingMinutesThisWeek(state) };
  },

  /** Final rep duration by practice date, for the speaking-output chart. */
  speakingSeries(state: JourneyState): { label: string; seconds: number; ideas: number }[] {
    return JourneyService.recordsByDate(state).map((record) => ({
      label: `D${record.day}`,
      seconds: Math.round(record.finalSeconds),
      ideas: record.sentenceCount ?? 0,
    }));
  },


  /**
   * Saves a finished day. Idempotent per module day: re-completing the same day
   * updates its recording without inflating the streak or the totals.
   */
  completeDay(input: {
    moduleId: ModuleId;
    day: number;
    finalSeconds: number;
    firstSeconds: number;
    practiceSeconds: number;
    recordingsCount: number;
    sentenceCount?: number | null;
    finalUrl?: string | null;
    firstUrl?: string | null;
  }): JourneyState {
    const state = read();
    const today = dayKey();
    const key = recordKey(input.moduleId, input.day);
    const existing = state.days[key];

    let streakDays = state.streakDays;
    if (!existing) {
      const yesterday = dayKey(new Date(Date.now() - 86400000));
      if (state.lastCompletedDate === today) streakDays = Math.max(1, state.streakDays);
      else if (state.lastCompletedDate === yesterday) streakDays = state.streakDays + 1;
      else streakDays = 1;
    }

    const record: DayRecord = {
      day: input.day,
      moduleId: input.moduleId,
      dayKey: existing?.dayKey ?? today,
      completedAt: new Date().toISOString(),
      finalSeconds: input.finalSeconds,
      firstSeconds: input.firstSeconds,
      practiceSeconds: input.practiceSeconds,
      recordingsCount: input.recordingsCount,
      sentenceCount: input.sentenceCount ?? null,
      finalUrl: input.finalUrl ?? null,
      firstUrl: input.firstUrl ?? null,
      ...(existing?.recordingPath ? { recordingPath: existing.recordingPath } : {}),
      ...(existing?.selfAssessment ? { selfAssessment: existing.selfAssessment } : {}),
    };

    sessionUrls.set(key, { finalUrl: input.finalUrl ?? null, firstUrl: input.firstUrl ?? null });

    const weekSeconds = { ...state.weekSeconds };
    if (!existing) weekSeconds[today] = (weekSeconds[today] ?? 0) + input.practiceSeconds;

    const next: JourneyState = {
      ...state,
      days: { ...state.days, [key]: record },
      streakDays,
      lastCompletedDate: existing ? state.lastCompletedDate : today,
      totalRepsCompleted: existing ? state.totalRepsCompleted : state.totalRepsCompleted + 5,
      totalSpeakingSeconds: existing
        ? state.totalSpeakingSeconds
        : state.totalSpeakingSeconds + input.practiceSeconds,
      weekSeconds,
    };
    write(next);
    return next;
  },

  saveSelfAssessment(moduleId: ModuleId, answer: SelfAssessment): JourneyState {
    const state = read();
    const last = CourseService.totalDays(moduleId);
    const key = recordKey(moduleId, last);
    const record = state.days[key];
    const next: JourneyState = {
      ...state,
      selfAssessment: answer,
      days: record ? { ...state.days, [key]: { ...record, selfAssessment: answer } } : state.days,
    };
    write(next);
    void JourneyService.syncDay(moduleId, last, next).catch(() => undefined);
    return next;
  },

  reset(): JourneyState {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_KEY);
    }
    sessionUrls.clear();
    pullCache = null;
    return emptyJourney;
  },

  /* ------------------------------ Cloud sync ------------------------------ */

  /**
   * Uploads the final recording and upserts the day row (signed-in only).
   * Returns "saved" on success, "skipped" when there is nothing to sync
   * (guest / offline-only), and "failed" when the learner should retry.
   */
  async syncDay(
    moduleId: ModuleId,
    day: number,
    state: JourneyState,
    blob?: Blob | null,
  ): Promise<"saved" | "skipped" | "failed"> {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    const key = recordKey(moduleId, day);
    const record = state.days[key];
    if (!user || !record) return "skipped";

    let recordingPath = record.recordingPath ?? null;
    if (blob) {
      const extension = blob.type.includes("mp4") ? "m4a" : blob.type.includes("webm") ? "webm" : "audio";
      const path = `${user.id}/${moduleId}-day-${day}.${extension}`;
      const upload = await supabase.storage
        .from("recordings")
        .upload(path, blob, { upsert: true, contentType: blob.type || "audio/webm" });
      if (upload.error) {
        console.error("[journey] final rep upload failed", upload.error.message);
        return "failed";
      }
      recordingPath = path;
    }

    const { error } = await supabase.from("day_progress").upsert(
      {
        user_id: user.id,
        module_id: moduleId,
        day,
        local_day_key: record.dayKey,
        completed_at: record.completedAt,
        final_seconds: Math.round(record.finalSeconds),
        practice_seconds: Math.round(record.practiceSeconds),
        recordings_count: record.recordingsCount,
        sentence_count: record.sentenceCount ?? null,
        recording_path: recordingPath,
        self_assessment: record.selfAssessment ?? null,
      },
      { onConflict: "user_id,module_id,day" },
    );

    if (recordingPath && recordingPath !== record.recordingPath) {
      const current = read();
      const stored = current.days[key];
      if (stored) {
        write({ ...current, days: { ...current.days, [key]: { ...stored, recordingPath } } });
      }
    }

    if (error) {
      console.error("[journey] day progress save failed", error.message);
      return "failed";
    }
    pullCache = null;
    return "saved";
  },

  /**
   * Pulls cloud progress into local state after sign-in.
   * Shared for a short window so several screens mounting at once make a
   * single request instead of one each.
   */
  /** Drops the shared pull cache (sign-in / sign-out / after a write). */
  invalidatePull() {
    pullCache = null;
  },

  async pull(): Promise<JourneyState> {
    const now = Date.now();
    if (pullCache && now - pullCache.at < PULL_TTL_MS) return pullCache.promise;
    const promise = JourneyService.fetchRemote().catch((err) => {
      pullCache = null;
      throw err;
    });
    pullCache = { at: now, promise };
    return promise;
  },

  async fetchRemote(): Promise<JourneyState> {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    const local = JourneyService.load();
    if (!user) return local;

    const { data: rows } = await supabase
      .from("day_progress")
      .select(
        "day, module_id, completed_at, local_day_key, final_seconds, practice_seconds, recordings_count, sentence_count, recording_path, self_assessment",
      )
      .order("day");
    if (!rows) return local;

    const days = { ...local.days };
    let totalSeconds = local.totalSpeakingSeconds;
    for (const row of rows) {
      const moduleId: ModuleId = isModuleId(row.module_id) ? row.module_id : "simple-present";
      const key = recordKey(moduleId, row.day);
      if (days[key]) continue;
      days[key] = {
        day: row.day,
        moduleId,
        dayKey: row.local_day_key ?? dayKey(new Date(row.completed_at)),
        completedAt: row.completed_at,
        finalSeconds: row.final_seconds,
        firstSeconds: 0,
        practiceSeconds: row.practice_seconds,
        recordingsCount: row.recordings_count,
        sentenceCount: row.sentence_count ?? null,
        finalUrl: null,
        firstUrl: null,
        recordingPath: row.recording_path,
        ...(row.self_assessment ? { selfAssessment: row.self_assessment as SelfAssessment } : {}),
      };
      totalSeconds += row.practice_seconds;
    }

    const merged: JourneyState = {
      ...local,
      days,
      totalSpeakingSeconds: totalSeconds,
      totalRepsCompleted: Math.max(local.totalRepsCompleted, Object.keys(days).length * 5),
    };
    write(merged);
    return merged;
  },

  /** Signed URL for a stored final recording, when available. */
  async signedRecordingUrl(path: string): Promise<string | null> {
    const { data } = await supabase.storage.from("recordings").createSignedUrl(path, 60 * 60);
    return data?.signedUrl ?? null;
  },
};
