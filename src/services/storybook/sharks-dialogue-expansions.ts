import type { StorybookEpisode, StorybookLine, StorybookSpeaker, StorybookWord } from "./types";

type SceneExpansion = {
  lines: [StorybookLine, StorybookLine];
  words: StorybookWord[];
  imageAlt?: string;
};

type EpisodeExpansion = Record<string, SceneExpansion>;

export const SHARKS_DIALOGUE_EXPANSIONS: Record<string, EpisodeExpansion> = {};

/**
 * Adds the richer B2 conversation layer without changing episode order,
 * quiz anchors, artwork imports, or the original plot-defining line.
 */
export function expandSharksDialogue(episode: StorybookEpisode): StorybookEpisode {
  const expansion = SHARKS_DIALOGUE_EXPANSIONS[episode.id];
  if (!expansion) return episode;

  return {
    ...episode,
    scenes: episode.scenes.map((scene) => {
      const extra = expansion[scene.id];
      if (!extra) return scene;
      const original = scene.lines?.[0] ?? {
        speaker: scene.speaker ?? "narrator",
        text: scene.text,
        es: scene.es,
      };
      const lines = [extra.lines[0], original, extra.lines[1]];
      const speakingCast = lines
        .map((line) => line.speaker)
        .filter((speaker): speaker is StorybookSpeaker => speaker !== "narrator");

      return {
        ...scene,
        lines,
        cast: Array.from(new Set([...(scene.cast ?? []), ...speakingCast])),
        words: extra.words,
        imageAlt: extra.imageAlt ?? scene.imageAlt,
      };
    }),
  };
}