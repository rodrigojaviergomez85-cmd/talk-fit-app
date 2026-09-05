import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { buildInventory, type AudioSpec } from "@/lib/course-audio-inventory";
import { CourseService, type LoadedModule } from "@/services/course-service";
import { PAST_VERBS } from "@/services/verb-bank";

/**
 * ADMIN-ONLY course audio cache tools.
 *  - scanCourseAudio: dry run. Discovers every runtime TTS spec from the
 *    current curriculum and checks storage. ZERO AI calls.
 *  - warmCourseAudio: generates ONE batch of confirmed-missing clips with
 *    controlled concurrency, then returns fresh counts. The admin page calls
 *    it repeatedly until nothing is missing; storage is the source of truth,
 *    so a stopped run simply resumes on the next call.
 */

async function assertAdmin(context: { supabase: SupabaseClient<Database>; userId: string }): Promise<void> {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || data !== true) throw new Error("Forbidden");
}

export type AudioInventoryReport = {
  discovered: number;
  unique: number;
  cached: number;
  missing: number;
  invalid: number;
  invalidSamples: { source: string; reason: string; preview: string }[];
  missingSamples: { source: string; voice: string; tone: string; preview: string }[];
  /** Per-source-kind counts of unique clips (for a sanity check, not analytics). */
  bySource: Record<string, number>;
  modules: string[];
};

export type WarmBatchReport = AudioInventoryReport & {
  attempted: number;
  generated: number;
  skippedAlreadyCached: number;
  failed: { source: string; preview: string; reason: string }[];
  /** True when storage state was uncertain: nothing was generated. */
  storageUnavailable: boolean;
  /** Set when the batch stopped early on an AI billing/policy/rate-limit status (402/403/429). */
  haltedOn: number | null;
};

/** AI statuses that stop the batch: more attempts only repeat the same denial. */
const HALT_STATUSES = new Set([402, 403, 429]);

const BATCH_SIZE = 12;
const CONCURRENCY = 3;

type Keyed = { spec: AudioSpec; key: string; clip: import("@/lib/course-audio.server").ClipSpec };

async function loadAllModules(): Promise<LoadedModule[]> {
  return Promise.all(CourseService.modules().map((m) => CourseService.loadModule(m.id)));
}

/** Inventory + keys, from the current curriculum. Pure except for the dynamic module imports. */
async function keyedInventory() {
  const audio = await import("@/lib/course-audio.server");
  const modules = await loadAllModules();
  const inventory = buildInventory(modules, PAST_VERBS);
  const keyed: Keyed[] = [];
  for (const spec of inventory.unique) {
    const normalized = audio.normalizeSpec(spec);
    if (!normalized.ok) continue; // already counted as invalid by buildInventory (defensive)
    keyed.push({ spec, key: await audio.clipKey(normalized.spec), clip: normalized.spec });
  }
  return { inventory, keyed, modules: modules.map((m) => m.id) };
}

const preview = (text: string) => (text.length > 70 ? `${text.slice(0, 67)}…` : text);
const kindOf = (source: string) => source.split("/").pop() ?? source;

function report(
  inv: Awaited<ReturnType<typeof keyedInventory>>,
  stored: Set<string> | null,
): { base: AudioInventoryReport; missing: Keyed[] } {
  const missing = stored ? inv.keyed.filter((k) => !stored.has(k.key)) : [];
  const bySource: Record<string, number> = {};
  for (const k of inv.keyed) bySource[kindOf(k.spec.source)] = (bySource[kindOf(k.spec.source)] ?? 0) + 1;
  return {
    base: {
      discovered: inv.inventory.discovered,
      unique: inv.keyed.length,
      cached: stored ? inv.keyed.length - missing.length : 0,
      missing: stored ? missing.length : inv.keyed.length,
      invalid: inv.inventory.invalid.length,
      invalidSamples: inv.inventory.invalid.slice(0, 10).map((i) => ({ source: i.spec.source, reason: i.reason, preview: preview(i.spec.text) })),
      missingSamples: missing.slice(0, 10).map((m) => ({ source: m.spec.source, voice: m.spec.voice, tone: m.spec.tone, preview: preview(m.spec.text) })),
      bySource,
      modules: inv.modules,
    },
    missing,
  };
}

/** DRY RUN — never calls AI. Throws "Storage unavailable" when cache state is unknown. */
export const scanCourseAudio = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AudioInventoryReport> => {
    await assertAdmin(context);
    const audio = await import("@/lib/course-audio.server");
    const inv = await keyedInventory();
    const stored = await audio.listStoredKeys();
    if (!stored) throw new Error("Storage unavailable — inventory cannot tell cached from missing right now.");
    return report(inv, stored).base;
  });

/** WARM ONE BATCH — only confirmed-missing clips, 3 at a time, single-flight locked. Idempotent. */
export const warmCourseAudio = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WarmBatchReport> => {
    await assertAdmin(context);
    const audio = await import("@/lib/course-audio.server");
    const inv = await keyedInventory();

    const stored = await audio.listStoredKeys();
    if (!stored) {
      // Storage error / unknown state → generate NOTHING.
      return { ...report(inv, null).base, attempted: 0, generated: 0, skippedAlreadyCached: 0, failed: [], storageUnavailable: true, haltedOn: null };
    }

    const { missing } = report(inv, stored);
    const batch = missing.slice(0, BATCH_SIZE);
    let generated = 0;
    let skipped = 0;
    let haltedOn: number | null = null;
    const failed: WarmBatchReport["failed"] = [];

    // Bounded worker pool: CONCURRENCY clips in flight, never Promise.all over everything.
    let cursor = 0;
    const worker = async () => {
      while (cursor < batch.length && haltedOn === null) {
        const item = batch[cursor++]!;
        // Per-clip confirmation right before work (list may be stale). Storage error → skip, no AI.
        const result = await audio.resolveClip(item.clip, item.key, { waitForOther: false });
        switch (result.status) {
          case "hit":
            skipped += 1;
            break;
          case "generated":
            if (result.stored) generated += 1;
            else failed.push({ source: item.spec.source, preview: preview(item.spec.text), reason: "generated but could not be stored" });
            break;
          case "busy":
            skipped += 1; // another process is generating it; next run will see it cached
            break;
          case "storage-error":
            failed.push({ source: item.spec.source, preview: preview(item.spec.text), reason: "storage unavailable (not generated)" });
            break;
          case "not-configured":
            failed.push({ source: item.spec.source, preview: preview(item.spec.text), reason: "voice service not configured" });
            break;
          case "not-eligible":
            failed.push({ source: item.spec.source, preview: preview(item.spec.text), reason: "not eligible" });
            break;
          case "ai-error":
            failed.push({ source: item.spec.source, preview: preview(item.spec.text), reason: `AI error ${result.httpStatus}` });
            break;
        }
        // Stop the whole batch (all workers) on billing / policy / rate-limit errors —
        // starting more clips only repeats the same gateway failure.
        if (result.status === "ai-error" && HALT_STATUSES.has(result.httpStatus)) {
          haltedOn ??= result.httpStatus;
          cursor = batch.length;
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, batch.length) }, worker));

    // Fresh counts for the admin view (storage remains the source of truth).
    const after = await audio.listStoredKeys();
    const base = report(inv, after).base;
    return {
      ...base,
      attempted: batch.length,
      generated,
      skippedAlreadyCached: skipped,
      failed,
      storageUnavailable: after === null,
      haltedOn,
    };
  });
