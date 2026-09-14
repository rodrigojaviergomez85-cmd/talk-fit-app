/**
 * AUDIO RETENTION — automatic deletion of expired audio files.
 *
 * Policy (decided with the product owner):
 *   • Practice takes (non-final) are deleted 48 hours after recording.
 *   • Final audio is deleted 90 days after recording.
 *   • Milestone finals (day 1 and the last day of a module) are NEVER deleted.
 *
 * NOTHING IS EVER ROW-DELETED. Progress, day completions, coach evaluations,
 * streaks, usage counters and cost history stay exactly as they are, so
 * removing audio can never hand back practice or AI quota. Rows are only
 * stamped (`recordings.audio_purged_at`, `day_progress.recording_purged_at`)
 * so the app can show "audio no longer available" instead of a dead player.
 *
 * The candidate set comes from the SAME pure classifiers the read-only admin
 * report uses, so the report and the deletion can never diverge.
 */
import {
  buildLookups,
  classifyDayFinal,
  classifyRecording,
  type DayFinalRow,
  type DayProgressRow,
  type RecordingRow,
} from "./storage-report";

const BUCKET = "recordings";
const PAGE = 1000;
const DELETE_BATCH = 100;

export type PurgeResult = {
  ranAt: string;
  dryRun: boolean;
  scanned: number;
  candidates: number;
  deletedFiles: number;
  markedRows: number;
  /** Journey final audio stored on day_progress (no recordings row). */
  dayFinalCandidates: number;
  dayFinalDeletedFiles: number;
  dayFinalMarkedRows: number;
  errors: string[];
};

export async function purgeExpiredTakes(options: { dryRun?: boolean; limit?: number } = {}): Promise<PurgeResult> {
  const dryRun = options.dryRun === true;
  const limit = options.limit ?? 5000;
  const now = new Date();
  const errors: string[] = [];

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const recordings: RecordingRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabaseAdmin
      .from("recordings")
      .select(
        "id, user_id, module_id, day, take_number, is_final_rep, storage_path, created_at, audio_purged_at, duration_seconds, mime_type",
      )
      .is("audio_purged_at", null)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`Could not read recordings: ${error.message}`);
    recordings.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }

  const dayRows: (DayProgressRow & DayFinalRow)[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabaseAdmin
      .from("day_progress")
      .select("user_id, module_id, day, completed_at, recording_path, recording_purged_at")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`Could not read day progress: ${error.message}`);
    dayRows.push(...((data ?? []) as (DayProgressRow & DayFinalRow)[]));
    if (!data || data.length < PAGE) break;
  }

  const lookups = buildLookups(dayRows);
  const candidates = recordings
    .filter((rec) => classifyRecording(rec, lookups, now).kind === "candidate")
    .slice(0, limit);
  const dayCandidates = dayRows.filter((row) => classifyDayFinal(row, now).kind === "candidate").slice(0, limit);

  const result: PurgeResult = {
    ranAt: now.toISOString(),
    dryRun,
    scanned: recordings.length,
    candidates: candidates.length,
    deletedFiles: 0,
    markedRows: 0,
    dayFinalCandidates: dayCandidates.length,
    dayFinalDeletedFiles: 0,
    dayFinalMarkedRows: 0,
    errors,
  };
  if (dryRun) return result;

  for (let i = 0; i < candidates.length; i += DELETE_BATCH) {
    const batch = candidates.slice(i, i + DELETE_BATCH);
    const paths = batch.map((r) => r.storage_path);
    const { error: removeError } = await supabaseAdmin.storage.from(BUCKET).remove(paths);
    if (removeError) {
      // A missing object is fine (already gone); anything else is reported and
      // the rows stay unmarked so the next run retries them.
      errors.push(`storage remove failed: ${removeError.message}`);
      continue;
    }
    result.deletedFiles += paths.length;

    const { error: markError } = await supabaseAdmin
      .from("recordings")
      .update({ audio_purged_at: now.toISOString() })
      .in(
        "id",
        batch.map((r) => r.id),
      );
    if (markError) errors.push(`mark failed: ${markError.message}`);
    else result.markedRows += batch.length;
  }

  // Journey final audio: `uid/module-day-N.webm` plus the optional
  // `uid/module-day-N-latest.webm` repeat, neither of which has a recordings row.
  for (const row of dayCandidates) {
    const base = row.recording_path!;
    const latest = base.replace(/\.([a-z0-9]+)$/i, "-latest.$1");
    const { error: removeError } = await supabaseAdmin.storage.from(BUCKET).remove([base, latest]);
    if (removeError) {
      errors.push(`day final remove failed: ${removeError.message}`);
      continue;
    }
    result.dayFinalDeletedFiles += 1;

    const { error: markError } = await supabaseAdmin
      .from("day_progress")
      .update({ recording_purged_at: now.toISOString() })
      .eq("user_id", row.user_id)
      .eq("module_id", row.module_id)
      .eq("day", row.day);
    if (markError) errors.push(`day final mark failed: ${markError.message}`);
    else result.dayFinalMarkedRows += 1;
  }

  return result;
}
