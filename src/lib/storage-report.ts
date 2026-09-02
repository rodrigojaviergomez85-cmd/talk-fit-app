/**
 * Storage cleanup report — PURE classification, no I/O.
 *
 * Decides, for every Rep 5 take, whether it is a purge CANDIDATE or why it is
 * protected. The later deletion step MUST reuse `classifyRecordings` so the
 * guardrails can never diverge from what the report shows.
 *
 * Hard rules (first matching reason wins, in this exact order):
 *   1. already purged        → audio_purged_at IS NOT NULL
 *   2. final by is_final_rep → recordings.is_final_rep = true
 *   3. final by day_progress → storage_path referenced by ANY day_progress.recording_path
 *   4. newer than 14 days
 *   5. day not completed     → no day_progress row for learner + module + day
 *   6. otherwise             → candidate
 */

export const PURGE_MIN_AGE_DAYS = 14;

/** Capture bitrate is 32 kbps → ~4 KB per second of audio. */
const BYTES_PER_SECOND = 32_000 / 8;

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

export type ExclusionReason =
  | "alreadyPurged"
  | "finalByFlag"
  | "finalByDayProgress"
  | "newerThan14Days"
  | "dayNotCompleted";

export type Classification = { kind: "candidate" } | { kind: "excluded"; reason: ExclusionReason };

export type StorageReport = {
  generatedAt: string;
  minAgeDays: number;
  candidates: {
    files: number;
    estimatedMb: number;
    learners: number;
    oldest: string | null;
    newest: string | null;
    byModule: { moduleId: string; files: number; estimatedMb: number }[];
    samplePaths: string[];
  };
  excluded: Record<ExclusionReason, number>;
  totals: {
    recordings: number;
    dayProgressWithPath: number;
    /** Finals that both sources of truth agree on. */
    protectedByBoth: number;
  };
};

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
  if (rec.is_final_rep) return { kind: "excluded", reason: "finalByFlag" };
  if (lookups.finalPaths.has(rec.storage_path)) return { kind: "excluded", reason: "finalByDayProgress" };
  const ageMs = now.getTime() - new Date(rec.created_at).getTime();
  if (!(ageMs >= PURGE_MIN_AGE_DAYS * 86_400_000)) return { kind: "excluded", reason: "newerThan14Days" };
  if (!lookups.completed.has(completionKey(rec.user_id, rec.module_id, rec.day))) {
    return { kind: "excluded", reason: "dayNotCompleted" };
  }
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
    newerThan14Days: 0,
    dayNotCompleted: 0,
  };
  const candidates: RecordingRow[] = [];
  let protectedByBoth = 0;

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
    },
  };
}
