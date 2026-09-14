/**
 * Storage cleanup report — PURE classification, no I/O.
 *
 * RETENTION POLICY (decided with the product owner):
 *   • Practice takes (non-final): deleted 48 hours after recording.
 *   • Final audio: deleted 90 days after recording.
 *   • Milestone finals (day 1 and the last day of a module) are kept FOREVER,
 *     so the learner can always hear their "before and after".
 *
 * WHAT IS NEVER TOUCHED: only the storage object goes away. Every row stays —
 * progress, day completions, coach evaluations, streaks, usage counters and
 * cost history are untouched, so deleting audio can never give back practice
 * or AI quota. The row is stamped (`recordings.audio_purged_at` /
 * `day_progress.recording_purged_at`) so the UI can say "audio no longer
 * available" instead of offering a player for a file that is gone.
 *
 * Hard rules for a recordings row (first matching reason wins):
 *   1. already purged       → audio_purged_at IS NOT NULL
 *   2. milestone final      → final AND day 1 or last day of the module
 *   3. final within 90 days → final AND younger than FINAL_RETENTION_DAYS
 *   4. take younger than 48 h
 *   5. otherwise            → candidate
 */

/** Practice takes live 48 hours. */
export const TAKE_MIN_AGE_HOURS = 48;
/** Final audio lives 90 days (milestones excepted). */
export const FINAL_RETENTION_DAYS = 90;
/** Every curriculum module is 20 days long. */
export const MODULE_LAST_DAY = 20;

/** Day 1 and the last day of a module are kept forever. */
export function isMilestoneDay(day: number): boolean {
  return day === 1 || day === MODULE_LAST_DAY;
}

/** Capture bitrate is 24 kbps → ~3 KB per second of audio. */
const BYTES_PER_SECOND = 24_000 / 8;

export type RecordingRow = {
  id: string;
  user_id: string;
  module_id: string;
  day: number;
  take_number: number;
  is_final_rep: boolean;
  storage_path: string;
  created_at: string;
  audio_purged_at: string | null;
  duration_seconds: number | string;
  mime_type: string | null;
};

export type DayProgressRow = {
  user_id: string;
  module_id: string;
  day: number;
  recording_path: string | null;
};

/** A day_progress row as seen by the final-audio retention pass. */
export type DayFinalRow = {
  user_id: string;
  module_id: string;
  day: number;
  completed_at: string;
  recording_path: string | null;
  recording_purged_at: string | null;
};

export type ExclusionReason =
  | "alreadyPurged"
  | "milestoneFinal"
  | "finalWithinRetention"
  | "tooRecent";

export type Classification = { kind: "candidate" } | { kind: "excluded"; reason: ExclusionReason };

function completionKey(userId: string, moduleId: string, day: number): string {
  return `${userId}|${moduleId}|${day}`;
}

export function buildLookups(progress: DayProgressRow[]) {
  const finalPaths = new Set<string>();
  const completed = new Set<string>();
  for (const row of progress) {
    completed.add(completionKey(row.user_id, row.module_id, row.day));
    if (row.recording_path) finalPaths.add(row.recording_path);
  }
  return { finalPaths, completed };
}

export function classifyRecording(
  rec: RecordingRow,
  lookups: ReturnType<typeof buildLookups>,
  now: Date,
): Classification {
  if (rec.audio_purged_at) return { kind: "excluded", reason: "alreadyPurged" };
  const ageMs = now.getTime() - new Date(rec.created_at).getTime();
  const isFinal = rec.is_final_rep || lookups.finalPaths.has(rec.storage_path);

  if (isFinal) {
    if (isMilestoneDay(rec.day)) return { kind: "excluded", reason: "milestoneFinal" };
    if (ageMs < FINAL_RETENTION_DAYS * 86_400_000) return { kind: "excluded", reason: "finalWithinRetention" };
    return { kind: "candidate" };
  }

  if (ageMs < TAKE_MIN_AGE_HOURS * 3_600_000) return { kind: "excluded", reason: "tooRecent" };
  return { kind: "candidate" };
}

/**
 * Final audio stored by the journey (`uid/module-day-N.webm`) has no
 * `recordings` row, so it needs its own pass over `day_progress`.
 */
export function classifyDayFinal(row: DayFinalRow, now: Date): Classification {
  if (row.recording_purged_at || !row.recording_path) return { kind: "excluded", reason: "alreadyPurged" };
  if (isMilestoneDay(row.day)) return { kind: "excluded", reason: "milestoneFinal" };
  const ageMs = now.getTime() - new Date(row.completed_at).getTime();
  if (ageMs < FINAL_RETENTION_DAYS * 86_400_000) return { kind: "excluded", reason: "finalWithinRetention" };
  return { kind: "candidate" };
}

function toMb(bytes: number): number {
  return Math.round((bytes / 1_048_576) * 100) / 100;
}

export function classifyRecordings(
  recordings: RecordingRow[],
  progress: DayProgressRow[],
  now: Date = new Date(),
): StorageReport {
  const lookups = buildLookups(progress);
  const excluded: Record<ExclusionReason, number> = {
    alreadyPurged: 0,
    finalByFlag: 0,
    finalByDayProgress: 0,
    tooRecent: 0,
    dayNotCompleted: 0,
  };
  const candidates: RecordingRow[] = [];
  let protectedByBoth = 0;
  const recordingPaths = new Set(recordings.map((r) => r.storage_path));
  let dayProgressPathsMatchingRecordings = 0;
  for (const path of lookups.finalPaths) if (recordingPaths.has(path)) dayProgressPathsMatchingRecordings += 1;

  for (const rec of recordings) {
    if (rec.is_final_rep && lookups.finalPaths.has(rec.storage_path)) protectedByBoth += 1;
    const result = classifyRecording(rec, lookups, now);
    if (result.kind === "candidate") candidates.push(rec);
    else excluded[result.reason] += 1;
  }

  const byModuleMap = new Map<string, { files: number; bytes: number }>();
  let bytes = 0;
  const learners = new Set<string>();
  let oldest: string | null = null;
  let newest: string | null = null;
  for (const rec of candidates) {
    const b = Number(rec.duration_seconds) * BYTES_PER_SECOND;
    bytes += b;
    learners.add(rec.user_id);
    const entry = byModuleMap.get(rec.module_id) ?? { files: 0, bytes: 0 };
    entry.files += 1;
    entry.bytes += b;
    byModuleMap.set(rec.module_id, entry);
    if (!oldest || rec.created_at < oldest) oldest = rec.created_at;
    if (!newest || rec.created_at > newest) newest = rec.created_at;
  }

  return {
    generatedAt: now.toISOString(),
    minAgeDays: PURGE_MIN_AGE_DAYS,
    candidates: {
      files: candidates.length,
      estimatedMb: toMb(bytes),
      learners: learners.size,
      oldest,
      newest,
      byModule: [...byModuleMap.entries()]
        .map(([moduleId, v]) => ({ moduleId, files: v.files, estimatedMb: toMb(v.bytes) }))
        .sort((a, b) => b.files - a.files),
      samplePaths: [...candidates]
        .sort((a, b) => a.created_at.localeCompare(b.created_at))
        .slice(0, 20)
        .map((r) => r.storage_path),
    },
    excluded,
    totals: {
      recordings: recordings.length,
      dayProgressWithPath: lookups.finalPaths.size,
      protectedByBoth,
      dayProgressPathsMatchingRecordings,
    },
  };
}
