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
 * SCALE: the candidate selection happens IN THE DATABASE
 * (`purge_candidates` / `purge_day_final_candidates`), which apply the very
 * same policy constants exported from `storage-report.ts`. The job then walks
 * bounded batches until it hits `maxFiles` or its time budget, so memory and
 * round-trips stay constant no matter how many learners there are. The pure
 * classifier still re-checks every row in memory as a second safety net.
 */
import {
  buildLookups,
  classifyDayFinal,
  classifyRecording,
  FINAL_RETENTION_DAYS,
  MODULE_LAST_DAY,
  TAKE_MIN_AGE_HOURS,
  type DayFinalRow,
  type RecordingRow,
} from "./storage-report";

const BUCKET = "recordings";
const DELETE_BATCH = 100;
/** Hard ceiling per run; the rest is picked up by the next run. */
const DEFAULT_MAX_FILES = 5000;
/** Stop asking for more work when the run has been going this long. */
const DEFAULT_BUDGET_MS = 60_000;

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
  /** True when the run stopped on its own limits and work remains. */
  truncated: boolean;
  errors: string[];
};

export type PurgeOptions = {
  dryRun?: boolean;
  /** Maximum files touched in this run (recordings + day finals). */
  maxFiles?: number;
  /** Wall-clock budget in milliseconds. */
  budgetMs?: number;
  /** Injectable clock, used by tests. */
  now?: Date;
};

type Admin = {
  rpc: (name: string, args: Record<string, unknown>) => Promise<{ data: unknown; error: { message: string } | null }>;
  from: (table: string) => {
    update: (values: Record<string, unknown>) => {
      in: (col: string, values: unknown[]) => Promise<{ error: { message: string } | null }>;
      eq: (col: string, value: unknown) => {
        eq: (col: string, value: unknown) => {
          eq: (col: string, value: unknown) => Promise<{ error: { message: string } | null }>;
        };
      };
    };
  };
  storage: {
    from: (bucket: string) => { remove: (paths: string[]) => Promise<{ error: { message: string } | null }> };
  };
};

const RPC_ARGS = {
  _take_min_age_hours: TAKE_MIN_AGE_HOURS,
  _final_retention_days: FINAL_RETENTION_DAYS,
  _module_last_day: MODULE_LAST_DAY,
};

/** Exported for tests: one bounded pass over the candidates the database picked. */
export async function runPurge(admin: Admin, options: PurgeOptions = {}): Promise<PurgeResult> {
  const dryRun = options.dryRun === true;
  const maxFiles = options.maxFiles ?? DEFAULT_MAX_FILES;
  const budgetMs = options.budgetMs ?? DEFAULT_BUDGET_MS;
  const now = options.now ?? new Date();
  const startedAt = Date.now();
  const errors: string[] = [];

  const result: PurgeResult = {
    ranAt: now.toISOString(),
    dryRun,
    scanned: 0,
    candidates: 0,
    deletedFiles: 0,
    markedRows: 0,
    dayFinalCandidates: 0,
    dayFinalDeletedFiles: 0,
    dayFinalMarkedRows: 0,
    truncated: false,
    errors,
  };

  const outOfBudget = () => Date.now() - startedAt >= budgetMs;
  let handled = 0;

  // --- recordings ---------------------------------------------------------
  while (handled < maxFiles) {
    if (outOfBudget()) {
      result.truncated = true;
      break;
    }
    const batchSize = Math.min(DELETE_BATCH, maxFiles - handled);
    const { data, error } = await admin.rpc("purge_candidates", { _limit: batchSize, ...RPC_ARGS });
    if (error) throw new Error(`Could not read purge candidates: ${error.message}`);
    const rows = (data ?? []) as RecordingRow[];
    if (rows.length === 0) break;

    result.scanned += rows.length;
    // Second safety net: the pure classifier must also call every row a
    // candidate. Finals matched through `day_progress.recording_path` are the
    // database's job, so the in-memory pass runs with empty lookups.
    const noLookups = buildLookups([]);
    const batch = rows.filter((rec) => classifyRecording(rec, noLookups, now).kind === "candidate");
    result.candidates += batch.length;
    if (dryRun || batch.length === 0) {
      handled += rows.length;
      if (dryRun) break;
      continue;
    }

    const paths = batch.map((r) => r.storage_path);
    const { error: removeError } = await admin.storage.from(BUCKET).remove(paths);
    if (removeError) {
      // A missing object is fine (already gone); anything else is reported and
      // the rows stay unmarked so the next run retries them.
      errors.push(`storage remove failed: ${removeError.message}`);
      break;
    }
    result.deletedFiles += paths.length;

    const { error: markError } = await admin
      .from("recordings")
      .update({ audio_purged_at: now.toISOString() })
      .in(
        "id",
        batch.map((r) => r.id),
      );
    if (markError) {
      errors.push(`mark failed: ${markError.message}`);
      break;
    }
    result.markedRows += batch.length;
    handled += rows.length;
    if (rows.length < batchSize) break;
  }

  // --- journey final audio (`uid/module-day-N.webm`, no recordings row) ----
  while (handled < maxFiles) {
    if (outOfBudget()) {
      result.truncated = true;
      break;
    }
    const batchSize = Math.min(DELETE_BATCH, maxFiles - handled);
    const { data, error } = await admin.rpc("purge_day_final_candidates", {
      _limit: batchSize,
      _final_retention_days: FINAL_RETENTION_DAYS,
      _module_last_day: MODULE_LAST_DAY,
    });
    if (error) throw new Error(`Could not read day-final candidates: ${error.message}`);
    const rows = ((data ?? []) as DayFinalRow[]).filter((row) => classifyDayFinal(row, now).kind === "candidate");
    if (rows.length === 0) break;
    result.dayFinalCandidates += rows.length;
    if (dryRun) break;

    let progressed = false;
    for (const row of rows) {
      const base = row.recording_path!;
      const latest = base.replace(/\.([a-z0-9]+)$/i, "-latest.$1");
      const { error: removeError } = await admin.storage.from(BUCKET).remove([base, latest]);
      if (removeError) {
        errors.push(`day final remove failed: ${removeError.message}`);
        continue;
      }
      result.dayFinalDeletedFiles += 1;

      const { error: markError } = await admin
        .from("day_progress")
        .update({ recording_purged_at: now.toISOString() })
        .eq("user_id", row.user_id)
        .eq("module_id", row.module_id)
        .eq("day", row.day);
      if (markError) {
        errors.push(`day final mark failed: ${markError.message}`);
        continue;
      }
      result.dayFinalMarkedRows += 1;
      progressed = true;
      handled += 1;
    }
    // Nothing could be marked: stop instead of asking for the same rows again.
    if (!progressed) break;
    if (rows.length < batchSize) break;
  }

  if (handled >= maxFiles) result.truncated = true;
  return result;
}

export async function purgeExpiredTakes(options: PurgeOptions = {}): Promise<PurgeResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return runPurge(supabaseAdmin as unknown as Admin, options);
}
