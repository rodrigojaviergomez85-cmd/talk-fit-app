/** Shapes and helpers for El Mundo de Vale reading analytics. */

export type StoryMetrics = {
  readers_today: number;
  readers_7d: number;
  readers_30d: number;
  readers_total: number;
  opens_today: number;
  completed_today: number;
  completed_total: number;
  top_episodes: {
    episode_id: string;
    season: number | null;
    readers: number;
    completions: number;
    avg_scene: number | null;
  }[];
  daily: { day: string; readers: number; opens: number }[];
};

/** Episode ids look like `sharks-ep12-...`; the number is the episode index. */
export function parseEpisodeNumber(episodeId: string): number | null {
  const match = /-ep(\d+)/.exec(episodeId);
  return match ? Number(match[1]) : null;
}
