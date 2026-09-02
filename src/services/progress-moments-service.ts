import { supabase } from "@/integrations/supabase/client";
import type { ComparisonType } from "@/lib/progress-moments";
import type { ModuleId } from "@/lib/types";

/**
 * Self-reflection choices for a progress moment. One row per
 * user + module + week + type — upserted, so reopening a moment never
 * creates duplicates and never touches day_progress / recordings.
 */

type Key = { moduleId: ModuleId; week: number; type: ComparisonType };

const memory = new Map<string, string[]>();

function memKey({ moduleId, week, type }: Key): string {
  return `${type}:${moduleId}:${week}`;
}

async function userId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export const ProgressMomentsService = {
  /** Previously saved selections (cloud when signed in, memory otherwise). */
  async load(key: Key): Promise<string[]> {
    const local = memory.get(memKey(key));
    if (local) return local;
    const uid = await userId();
    if (!uid) return [];
    const { data } = await supabase
      .from("progress_moments")
      .select("selected_reflections")
      .eq("user_id", uid)
      .eq("module_id", key.moduleId)
      .eq("week", key.week)
      .eq("comparison_type", key.type)
      .maybeSingle();
    const list = data?.selected_reflections ?? [];
    memory.set(memKey(key), list);
    return list;
  },

  /** Idempotent save: same key → same row. */
  async save(key: Key, selected: string[]): Promise<void> {
    memory.set(memKey(key), selected);
    const uid = await userId();
    if (!uid) return;
    await supabase.from("progress_moments").upsert(
      {
        user_id: uid,
        module_id: key.moduleId,
        week: key.week,
        comparison_type: key.type,
        selected_reflections: selected,
        comparison_completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_id,week,comparison_type" },
    );
  },
};
