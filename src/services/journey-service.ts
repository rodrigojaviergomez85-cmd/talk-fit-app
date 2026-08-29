import { supabase } from "@/integrations/supabase/client";
import type { DayRecord, JourneyState, SelfAssessment } from "@/lib/types";
import { CourseService } from "./course-service";

/**
 * JourneyService — progress for the 5-day Simple Present journey.
 * Local-first (works offline and signed out); mirrors to Lovable Cloud when a
 * student is signed in, so final recordings survive across devices.
 */

const STORAGE_KEY = "fluency-reps:journey:v1";

export const emptyJourney: JourneyState = {
  days: {},
  streakDays: 0,
  totalRepsCompleted: 0,
  totalSpeakingSeconds: 0,
  weekSeconds: {},
};

function dayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function read(): JourneyState {
  if (typeof window === "undefined") return emptyJourney;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyJourney;
    return { ...emptyJourney, ...(JSON.parse(raw) as Partial<JourneyState>) };
  } catch {
    return emptyJourney;
  }
}

function write(state: JourneyState) {
  if (typeof window === "undefined") return;
  try {
    // Object URLs are session-scoped: never persist them.
    const days: Record<number, DayRecord> = {};
    for (const [key, record] of Object.entries(state.days)) {
      days[Number(key)] = { ...record, finalUrl: null, firstUrl: null };
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, days }));
  } catch {
    /* storage unavailable */
  }
}

/** Session-scoped playback URLs, kept out of localStorage. */
const sessionUrls = new Map<number, { finalUrl: string | null; firstUrl: string | null }>();

export const JourneyService = {
  dayKey,

  load(): JourneyState {
    const state = read();
    for (const [day, urls] of sessionUrls) {
      const record = state.days[day];
      if (record) state.days[day] = { ...record, ...urls };
    }
    return state;
  },

  save(state: JourneyState) {
    write(state);
  },

  /** The day the learner should practice next (sequential unlock, no waiting). */
  currentDay(state: JourneyState): number {
    for (let day = 1; day <= CourseService.totalDays; day += 1) {
      if (!state.days[day]) return day;
    }
    return CourseService.totalDays;
  },

  isDayCompleted(state: JourneyState, day: number): boolean {
    return Boolean(state.days[day]);
  },

  isDayUnlocked(state: JourneyState, day: number): boolean {
    return day === 1 || Boolean(state.days[day - 1]) || Boolean(state.days[day]);
  },

  journeyComplete(state: JourneyState): boolean {
    return Object.keys(state.days).length >= CourseService.totalDays;
  },

  completedCount(state: JourneyState): number {
    return Object.keys(state.days).length;
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

  /**
   * Saves a finished day. Idempotent per day: re-completing the same day
   * updates its recording without inflating the streak or the totals.
   */
  completeDay(
    input: {
      day: number;
      finalSeconds: number;
      firstSeconds: number;
      practiceSeconds: number;
      recordingsCount: number;
      finalUrl?: string | null;
      firstUrl?: string | null;
    },
  ): JourneyState {
    const state = read();
    const today = dayKey();
    const existing = state.days[input.day];

    let streakDays = state.streakDays;
    if (!existing) {
      const yesterday = dayKey(new Date(Date.now() - 86400000));
      if (state.lastCompletedDate === today) streakDays = Math.max(1, state.streakDays);
      else if (state.lastCompletedDate === yesterday) streakDays = state.streakDays + 1;
      else streakDays = 1;
    }

    const record: DayRecord = {
      day: input.day,
      dayKey: existing?.dayKey ?? today,
      completedAt: new Date().toISOString(),
      finalSeconds: input.finalSeconds,
      firstSeconds: input.firstSeconds,
      practiceSeconds: input.practiceSeconds,
      recordingsCount: input.recordingsCount,
      finalUrl: input.finalUrl ?? null,
      firstUrl: input.firstUrl ?? null,
      ...(existing?.recordingPath ? { recordingPath: existing.recordingPath } : {}),
      ...(existing?.selfAssessment ? { selfAssessment: existing.selfAssessment } : {}),
    };

    sessionUrls.set(input.day, { finalUrl: input.finalUrl ?? null, firstUrl: input.firstUrl ?? null });

    const weekSeconds = { ...state.weekSeconds };
    if (!existing) weekSeconds[today] = (weekSeconds[today] ?? 0) + input.practiceSeconds;

    const next: JourneyState = {
      ...state,
      days: { ...state.days, [input.day]: record },
      streakDays,
      lastCompletedDate: existing ? state.lastCompletedDate : today,
      totalRepsCompleted: existing ? state.totalRepsCompleted : state.totalRepsCompleted + 5,
      totalSpeakingSeconds: existing ? state.totalSpeakingSeconds : state.totalSpeakingSeconds + input.practiceSeconds,
      weekSeconds,
    };
    write(next);
    return next;
  },

  saveSelfAssessment(answer: SelfAssessment): JourneyState {
    const state = read();
    const last = CourseService.totalDays;
    const record = state.days[last];
    const next: JourneyState = {
      ...state,
      selfAssessment: answer,
      days: record ? { ...state.days, [last]: { ...record, selfAssessment: answer } } : state.days,
    };
    write(next);
    void JourneyService.syncDay(last, next).catch(() => undefined);
    return next;
  },

  reset(): JourneyState {
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
    sessionUrls.clear();
    return emptyJourney;
  },

  /* ------------------------------ Cloud sync ------------------------------ */

  /** Uploads the final recording and upserts the day row (signed-in only). */
  async syncDay(day: number, state: JourneyState, blob?: Blob | null): Promise<void> {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    const record = state.days[day];
    if (!user || !record) return;

    let recordingPath = record.recordingPath ?? null;
    if (blob) {
      const extension = blob.type.includes("mp4") ? "m4a" : blob.type.includes("webm") ? "webm" : "audio";
      const path = `${user.id}/day-${day}.${extension}`;
      const upload = await supabase.storage
        .from("recordings")
        .upload(path, blob, { upsert: true, contentType: blob.type || "audio/webm" });
      if (!upload.error) recordingPath = path;
    }

    await supabase.from("day_progress").upsert(
      {
        user_id: user.id,
        day,
        local_day_key: record.dayKey,
        completed_at: record.completedAt,
        final_seconds: Math.round(record.finalSeconds),
        practice_seconds: Math.round(record.practiceSeconds),
        recordings_count: record.recordingsCount,
        recording_path: recordingPath,
        self_assessment: record.selfAssessment ?? null,
      },
      { onConflict: "user_id,day" },
    );

    if (recordingPath && recordingPath !== record.recordingPath) {
      const current = read();
      const stored = current.days[day];
      if (stored) {
        write({ ...current, days: { ...current.days, [day]: { ...stored, recordingPath } } });
      }
    }
  },

  /** Pulls cloud progress into local state after sign-in. */
  async pull(): Promise<JourneyState> {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    const local = JourneyService.load();
    if (!user) return local;

    const { data: rows } = await supabase
      .from("day_progress")
      .select("day, completed_at, local_day_key, final_seconds, practice_seconds, recordings_count, recording_path, self_assessment")
      .order("day");
    if (!rows) return local;

    const days = { ...local.days };
    let totalSeconds = local.totalSpeakingSeconds;
    for (const row of rows) {
      if (days[row.day]) continue;
      days[row.day] = {
        day: row.day,
        dayKey: row.local_day_key ?? dayKey(new Date(row.completed_at)),
        completedAt: row.completed_at,
        finalSeconds: row.final_seconds,
        firstSeconds: 0,
        practiceSeconds: row.practice_seconds,
        recordingsCount: row.recordings_count,
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
