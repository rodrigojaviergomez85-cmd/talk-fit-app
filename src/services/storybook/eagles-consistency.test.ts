import { describe, expect, it } from "vitest";
import { existsSync, statSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { STORYBOOK_SEASONS } from "./seasons";
import { STORYBOOK_EPISODES } from "./index";
import { speakerVoice, speakerTone } from "./voices";
import type { StorybookEpisode, StorybookSpeaker } from "./types";

/**
 * Triple consistency check for Season 6 (Eagles): artwork and voices.
 * Layer 1 (generation) happens when the art is produced; this file is layer 2,
 * the automatic gate that runs on every change.
 */
const ASSETS = resolve(process.cwd(), "src/assets/storybook");
const MAX_BYTES = 250 * 1024;

const season6 = STORYBOOK_SEASONS.find((s) => s.moduleId === "eagles-week-1")!;
const registered: StorybookEpisode[] = season6.slots
  .map((slot) => STORYBOOK_EPISODES.find((e) => e.id === slot.episodeId))
  .filter((e): e is StorybookEpisode => Boolean(e));

describe("Season 6 artwork consistency", () => {
  it("every registered episode has a cover plus one image per scene", () => {
    for (const episode of registered) {
      const dir = resolve(ASSETS, episode.id);
      expect(existsSync(dir), `missing art folder for ${episode.id}`).toBe(true);
      const files = readdirSync(dir).filter((f) => f.endsWith(".jpg"));
      expect(files, `${episode.id} must ship a cover`).toContain("cover.jpg");
      for (const scene of episode.scenes) {
        expect(files, `${episode.id} missing ${scene.id}.jpg`).toContain(`${scene.id}.jpg`);
      }
    }
  });

  it("every image stays under 250 KB so phones load it fast", () => {
    const heavy: string[] = [];
    for (const episode of registered) {
      const dir = resolve(ASSETS, episode.id);
      if (!existsSync(dir)) continue;
      for (const file of readdirSync(dir).filter((f) => f.endsWith(".jpg"))) {
        const size = statSync(resolve(dir, file)).size;
        if (size > MAX_BYTES) heavy.push(`${episode.id}/${file} = ${Math.round(size / 1024)} KB`);
      }
    }
    expect(heavy).toEqual([]);
  });

  it("every scene declares alt text", () => {
    for (const episode of registered) {
      for (const scene of episode.scenes) {
        expect(scene.imageAlt?.trim().length, `${episode.id}:${scene.id}`).toBeGreaterThan(0);
      }
    }
  });
});

describe("Season 6 voice consistency", () => {
  function speakersOf(episode: StorybookEpisode): Set<StorybookSpeaker> {
    const set = new Set<StorybookSpeaker>();
    for (const scene of episode.scenes) {
      if (scene.speaker) set.add(scene.speaker);
      for (const line of scene.lines ?? []) set.add(line.speaker);
    }
    return set;
  }

  it("every speaking character resolves to a voice and a tone", () => {
    for (const episode of registered) {
      for (const speaker of speakersOf(episode)) {
        expect(speakerVoice(speaker), `${episode.id}: ${speaker} has no voice`).toBeTruthy();
        expect(speakerTone(speaker), `${episode.id}: ${speaker} has no tone`).toBeTruthy();
      }
    }
  });

  it("a character keeps the same voice in every episode of the season", () => {
    const byCharacter = new Map<StorybookSpeaker, string>();
    for (const episode of registered) {
      for (const speaker of speakersOf(episode)) {
        const voice = String(speakerVoice(speaker));
        const seen = byCharacter.get(speaker);
        if (seen) expect(voice, `${speaker} changed voice in ${episode.id}`).toBe(seen);
        else byCharacter.set(speaker, voice);
      }
    }
  });

  it("two different characters never share the same voice", () => {
    const used = new Map<string, StorybookSpeaker>();
    for (const episode of registered) {
      for (const speaker of speakersOf(episode)) {
        if (speaker === "narrator") continue;
        const voice = String(speakerVoice(speaker));
        const owner = used.get(voice);
        if (owner && owner !== speaker) {
          throw new Error(`${speaker} and ${owner} share the voice ${voice}`);
        }
        used.set(voice, speaker);
      }
    }
  });
});

describe("Season 6 keeps the sitcom dialogue format", () => {
  it("almost every scene is a conversation, with at most one narrator-only scene", () => {
    for (const episode of registered) {
      const narratorOnly = episode.scenes.filter((scene) => {
        const lines = scene.lines ?? [];
        return lines.length > 0 && lines.every((l) => l.speaker === "narrator");
      });
      expect(narratorOnly.length, `${episode.id} has too much narration`).toBeLessThanOrEqual(1);
      for (const scene of episode.scenes) {
        expect((scene.lines ?? []).length, `${episode.id}:${scene.id} needs dialogue`).toBeGreaterThanOrEqual(2);
      }
    }
  });
});
