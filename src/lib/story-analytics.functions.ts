import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { StoryMetrics } from "./story-analytics";

type ViewInput = {
  episodeId: string;
  season?: number | null;
  episodeNumber?: number | null;
  sceneIndex?: number | null;
  completed?: boolean;
};

/**
 * Records that the signed-in learner opened (or advanced inside) a storybook
 * episode. Idempotent: the database function only moves progress forward.
 * Never blocks the reader — callers fire and forget.
 */
export const recordStoryEpisodeView = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: ViewInput) => {
    const episodeId = String(input.episodeId ?? "").slice(0, 120);
    if (!episodeId) throw new Error("episodeId required");
    return {
      episodeId,
      season: Number.isFinite(input.season) ? Number(input.season) : 0,
      episodeNumber: Number.isFinite(input.episodeNumber) ? Number(input.episodeNumber) : 0,
      sceneIndex: Number.isFinite(input.sceneIndex) ? Math.max(0, Number(input.sceneIndex)) : 0,
      completed: Boolean(input.completed),
    };
  })
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("record_story_view", {
      _episode_id: data.episodeId,
      _season: data.season,
      _episode_number: data.episodeNumber,
      _scene_index: data.sceneIndex,
      _completed: data.completed,
    });
    if (error) return { ok: false };
    return { ok: true };
  });

/** One-time upload of episodes already finished on the device (localStorage). */
export const backfillStoryProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { episodeIds: string[] }) => ({
    episodeIds: (input.episodeIds ?? []).filter((id) => typeof id === "string" && id).slice(0, 200),
  }))
  .handler(async ({ data, context }) => {
    for (const episodeId of data.episodeIds) {
      await context.supabase.rpc("record_story_view", {
        _episode_id: episodeId.slice(0, 120),
        _season: 0,
        _episode_number: 0,
        _scene_index: 0,
        _completed: true,
      });
    }
    return { ok: true, count: data.episodeIds.length };
  });

/** Admin-only storybook metrics; the database function re-checks the role. */
export const getStoryMetrics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<StoryMetrics> => {
    const { data, error } = await context.supabase.rpc("admin_story_metrics");
    if (error) throw new Error("Forbidden");
    return data as unknown as StoryMetrics;
  });
