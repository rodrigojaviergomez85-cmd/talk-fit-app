import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { classifyRecordings, type DayProgressRow, type RecordingRow, type StorageReport } from "./storage-report";

/**
 * Admin-only, READ-ONLY storage cleanup report.
 * Nothing here writes: no update, no delete, no storage call.
 */

async function assertAdmin(context: { supabase: SupabaseClient<Database>; userId: string }): Promise<void> {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || data !== true) throw new Error("Forbidden");
}

export const isAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    return { admin: data === true };
  });

export const runStorageReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<StorageReport> => {
    await assertAdmin(context);

    // Cross-learner read: only after the caller is verified as admin.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const recordings: RecordingRow[] = [];
    const progress: DayProgressRow[] = [];
    const PAGE = 1000;

    for (let from = 0; ; from += PAGE) {
      const { data, error } = await supabaseAdmin
        .from("recordings")
        .select("id, user_id, module_id, day, take_number, is_final_rep, storage_path, created_at, audio_purged_at, duration_seconds, mime_type")
        .order("created_at", { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) throw new Error("Could not read recordings");
      recordings.push(...(data ?? []));
      if (!data || data.length < PAGE) break;
    }

    for (let from = 0; ; from += PAGE) {
      const { data, error } = await supabaseAdmin
        .from("day_progress")
        .select("user_id, module_id, day, recording_path")
        .order("completed_at", { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) throw new Error("Could not read day progress");
      progress.push(...(data ?? []));
      if (!data || data.length < PAGE) break;
    }

    return classifyRecordings(recordings, progress, new Date());
  });
