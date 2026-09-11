/**
 * AUDIO RETENTION — automatic deletion of non-final practice takes.
 *
 * Policy (decided with the product owner):
 *   • Final Rep audio (is_final_rep = true, or referenced by any
 *     day_progress.recording_path) is NEVER deleted.
 *   • Every other take is deleted 7 days after it was recorded, and only when
 *     the day it belongs to is already completed.
 *
 * The candidate set is produced by the SAME pure classifier the read-only
 * admin report uses (`classifyRecording`), so the report and the deletion can
 * never diverge. Rows are kept (progress history intact) and stamped with
 * `audio_purged_at`; only the storage object goes away, and `CloudSync.listTakes`
 * already hides purged takes from the UI.
 */
import { buildLookups, classifyRecording, type DayProgressRow, type RecordingRow } from "./storage-report";

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
      .eq("is_final_rep", false)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`Could not read recordings: ${error.message}`);
    recordings.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }

  const progress: DayProgressRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabaseAdmin
      .from("day_progress")
      .select("user_id, module_id, day, recording_path")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`Could not read day progress: ${error.message}`);
    progress.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }

  const lookups = buildLookups(progress);
  const candidates = recordings
    .filter((rec) => classifyRecording(rec, lookups, now).kind === "candidate")
    .slice(0, limit);

  const result: PurgeResult = {
    ranAt: now.toISOString(),
    dryRun,
    scanned: recordings.length,
    candidates: candidates.length,
    deletedFiles: 0,
    markedRows: 0,
    errors,
  };
  if (dryRun || candidates.length === 0) return result;

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

  return result;
}
