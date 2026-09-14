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
/**
 * Independent ceilings per queue. They must NOT share one counter: a large
 * backlog of practice takes would otherwise starve the journey-finals queue
 * forever, so expired finals would never be deleted.
 */
const DEFAULT_MAX_TAKES = 4000;
const DEFAULT_MAX_FINALS = 1000;
/**
 * Wall-clock budget for one run. Kept well under the platform's request
 * timeout so the run always finishes and can stamp its `job_runs` row instead
 * of being killed mid-flight.
 */
const DEFAULT_BUDGET_MS = 45_000;
/** No single storage/database call may hang the whole run. */
const DEFAULT_CALL_TIMEOUT_MS = 10_000;

/** Races a call against a timer; rejects with a `TIMEOUT …` error. */
export function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`TIMEOUT ${label} after ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

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
  /** True when the takes queue stopped on its own limits and work remains. */
  takesTruncated: boolean;
  /** True when the finals queue stopped on its own limits and work remains. */
  finalsTruncated: boolean;
  errors: string[];
};

export type PurgeOptions = {
  dryRun?: boolean;
  /** Maximum practice-take files touched in this run. */
  maxTakes?: number;
  /** Maximum journey-final files touched in this run. */
  maxFinals?: number;
  /** Wall-clock budget in milliseconds. */
  budgetMs?: number;
  /** Per-call timeout in milliseconds. */
  callTimeoutMs?: number;
  /** Injectable clock, used by tests. */
  now?: Date;
  /** Injectable monotonic clock (milliseconds), used by tests. */
  monotonic?: () => number;
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
  const maxTakes = options.maxTakes ?? DEFAULT_MAX_TAKES;
  const maxFinals = options.maxFinals ?? DEFAULT_MAX_FINALS;
  const budgetMs = options.budgetMs ?? DEFAULT_BUDGET_MS;
  const callTimeoutMs = options.callTimeoutMs ?? DEFAULT_CALL_TIMEOUT_MS;
  const clock = options.monotonic ?? (() => Date.now());
  const now = options.now ?? new Date();
  const startedAt = clock();
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
    takesTruncated: false,
    finalsTruncated: false,
    errors,
  };

  const outOfBudget = () => clock() - startedAt >= budgetMs;
  const timed = <T>(promise: Promise<T>, label: string) => withTimeout(promise, callTimeoutMs, label);
  const message = (err: unknown) => (err instanceof Error ? err.message : String(err));

  // --- recordings ---------------------------------------------------------
  let takesHandled = 0;
  while (takesHandled < maxTakes) {
    if (outOfBudget()) {
      result.takesTruncated = true;
      break;
    }
    const batchSize = Math.min(DELETE_BATCH, maxTakes - takesHandled);
    let data: unknown;
    try {
      const res = await timed(
        admin.rpc("purge_candidates", { _limit: batchSize, ...RPC_ARGS }),
        "purge_candidates",
      );
      if (res.error) throw new Error(`Could not read purge candidates: ${res.error.message}`);
      data = res.data;
    } catch (err) {
      const msg = message(err);
      // A timeout on the candidates lookup only ends this queue; a real
      // database error still fails the run as before.
      if (!msg.startsWith("TIMEOUT")) throw err instanceof Error ? err : new Error(msg);
      errors.push(msg);
      result.takesTruncated = true;
      break;
    }
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
      takesHandled += rows.length;
      if (dryRun) break;
      continue;
    }

    if (outOfBudget()) {
      result.takesTruncated = true;
      break;
    }
    const paths = batch.map((r) => r.storage_path);
    try {
      const { error: removeError } = await timed(admin.storage.from(BUCKET).remove(paths), "storage.remove");
      if (removeError) throw new Error(removeError.message);
    } catch (err) {
      // A missing object is fine (already gone); anything else is reported and
      // the rows stay unmarked so the next run retries them.
      errors.push(`storage remove failed: ${message(err)}`);
      break;
    }
    result.deletedFiles += paths.length;

    if (outOfBudget()) {
      result.takesTruncated = true;
      break;
    }
    try {
      const { error: markError } = await timed(
        admin
          .from("recordings")
          .update({ audio_purged_at: now.toISOString() })
          .in(
            "id",
            batch.map((r) => r.id),
          ),
        "recordings.update",
      );
      if (markError) throw new Error(markError.message);
    } catch (err) {
      errors.push(`mark failed: ${message(err)}`);
      break;
    }
    result.markedRows += batch.length;
    takesHandled += rows.length;
    if (rows.length < batchSize) break;
  }
  if (takesHandled >= maxTakes) result.takesTruncated = true;

  // --- journey final audio (`uid/module-day-N.webm`, no recordings row) ----
  // Runs on its own ceiling, so a full takes queue never starves it.
  let finalsHandled = 0;
  finals: while (finalsHandled < maxFinals) {
    if (outOfBudget()) {
      result.finalsTruncated = true;
      break;
    }
    const batchSize = Math.min(DELETE_BATCH, maxFinals - finalsHandled);
    let data: unknown;
    try {
      const res = await timed(
        admin.rpc("purge_day_final_candidates", {
          _limit: batchSize,
          _final_retention_days: FINAL_RETENTION_DAYS,
          _module_last_day: MODULE_LAST_DAY,
        }),
        "purge_day_final_candidates",
      );
      if (res.error) throw new Error(`Could not read day-final candidates: ${res.error.message}`);
      data = res.data;
    } catch (err) {
      const msg = message(err);
      if (!msg.startsWith("TIMEOUT")) throw err instanceof Error ? err : new Error(msg);
      errors.push(msg);
      result.finalsTruncated = true;
      break;
    }
    const rows = ((data ?? []) as DayFinalRow[]).filter((row) => classifyDayFinal(row, now).kind === "candidate");
    if (rows.length === 0) break;
    result.dayFinalCandidates += rows.length;
    if (dryRun) break;

    let progressed = false;
    for (const row of rows) {
      if (outOfBudget()) {
        result.finalsTruncated = true;
        break finals;
      }
      const base = row.recording_path!;
      const latest = base.replace(/\.([a-z0-9]+)$/i, "-latest.$1");
      try {
        const { error: removeError } = await timed(admin.storage.from(BUCKET).remove([base, latest]), "storage.remove");
        if (removeError) throw new Error(removeError.message);
      } catch (err) {
        errors.push(`day final remove failed: ${message(err)}`);
        continue;
      }
      result.dayFinalDeletedFiles += 1;

      if (outOfBudget()) {
        result.finalsTruncated = true;
        break finals;
      }
      try {
        const { error: markError } = await timed(
          admin
            .from("day_progress")
            .update({ recording_purged_at: now.toISOString() })
            .eq("user_id", row.user_id)
            .eq("module_id", row.module_id)
            .eq("day", row.day),
          "day_progress.update",
        );
        if (markError) throw new Error(markError.message);
      } catch (err) {
        errors.push(`day final mark failed: ${message(err)}`);
        continue;
      }
      result.dayFinalMarkedRows += 1;
      progressed = true;
      finalsHandled += 1;
    }
    // Nothing could be marked: stop instead of asking for the same rows again.
    if (!progressed) break;
    if (rows.length < batchSize) break;
  }
  if (finalsHandled >= maxFinals) result.finalsTruncated = true;

  return result;
}

export async function purgeExpiredTakes(options: PurgeOptions = {}): Promise<PurgeResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return runPurge(supabaseAdmin as unknown as Admin, options);
}
