import { supabase } from "@/integrations/supabase/client";
import { earnedBadgeIds } from "@/lib/habit";
import type { JourneyState } from "@/lib/types";

/**
 * AchievementsService — one row per learner + achievement, so a badge unlocks
 * exactly once. Backfill for existing learners is silent (already celebrated);
 * only milestones crossed by a live completion are claimed for a celebration.
 */

type Listener = () => void;
const listeners = new Set<Listener>();
let cache: Set<string> | null = null;
let testReadyCache: number | null = null;

function emit() {
  for (const fn of listeners) fn();
}

async function userId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export const AchievementsService = {
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  earned(): Set<string> {
    return cache ?? new Set();
  },

  testReadyCount(): number {
    return testReadyCache ?? 0;
  },

  invalidate() {
    cache = null;
    testReadyCache = null;
  },

  /** Lightweight count-only query (no rows transferred). */
  async fetchTestReadyCount(): Promise<number> {
    if (testReadyCache !== null) return testReadyCache;
    const uid = await userId();
    if (!uid) return 0;
    const { count } = await supabase
      .from("test_ready_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", uid);
    testReadyCache = count ?? 0;
    emit();
    return testReadyCache;
  },

  /** Loads the learner's earned achievement ids. */
  async load(): Promise<Set<string>> {
    if (cache) return cache;
    const uid = await userId();
    if (!uid) return new Set();
    const { data } = await supabase.from("achievements").select("achievement_id").eq("user_id", uid);
    cache = new Set((data ?? []).map((r) => r.achievement_id));
    emit();
    return cache;
  },

  /**
   * Silent backfill: every badge currently earned gets a row marked as already
   * celebrated. Existing rows are left untouched (ignoreDuplicates).
   */
  async sync(state: JourneyState, testReadyCount?: number): Promise<Set<string>> {
    const uid = await userId();
    if (!uid) return new Set();
    const known = await AchievementsService.load();
    const ids = earnedBadgeIds(state, testReadyCount ?? testReadyCache ?? 0);
    const missing = ids.filter((id) => !known.has(id));
    if (missing.length === 0) return known;
    const now = new Date().toISOString();
    const { error } = await supabase.from("achievements").upsert(
      missing.map((id) => ({ user_id: uid, achievement_id: id, earned_at: now, celebrated_at: now })),
      { onConflict: "user_id,achievement_id", ignoreDuplicates: true },
    );
    if (!error) {
      cache = new Set([...known, ...missing]);
      emit();
    }
    return cache ?? known;
  },

  /**
   * Called from the completion flow with the milestones crossed by THAT
   * completion. Returns the ids that were genuinely new (never celebrated
   * before) so the caller shows the celebration only for those.
   */
  async claimCelebration(ids: string[]): Promise<string[]> {
    if (ids.length === 0) return [];
    const uid = await userId();
    if (!uid) return ids;
    const known = await AchievementsService.load();
    const fresh = ids.filter((id) => !known.has(id));
    if (fresh.length === 0) return [];
    const now = new Date().toISOString();
    const { error } = await supabase.from("achievements").upsert(
      fresh.map((id) => ({ user_id: uid, achievement_id: id, earned_at: now, celebrated_at: now })),
      { onConflict: "user_id,achievement_id", ignoreDuplicates: true },
    );
    if (error) return [];
    cache = new Set([...known, ...fresh]);
    emit();
    return fresh;
  },
};
