import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { STORYBOOK_EPISODES } from "./index";
import { STORYBOOK_SEASONS } from "./seasons";
import { speakerGain, speakerSound, canonicalSpeaker } from "./voices";
import type { StorybookSpeaker } from "./types";

const ASSETS = path.resolve(process.cwd(), "src/assets/storybook");
const MAX_BYTES = 300_000;

describe("storybook character voices", () => {
  it("amplifies only Óscar and Mía", () => {
    expect(speakerGain("oscar")).toBeGreaterThan(1);
    expect(speakerGain("mia")).toBeGreaterThan(1);
    expect(speakerGain("beto")).toBe(1);
    expect(speakerGain("dylan")).toBe(1);
    expect(speakerGain("vale")).toBe(1);
  });

  it("no two characters inside the same season share the same voice", () => {
    for (const season of STORYBOOK_SEASONS) {
      const ids = season.slots.map((slot) => slot.episodeId).filter(Boolean) as string[];
      const speakers = new Set<StorybookSpeaker>();
      for (const id of ids) {
        const episode = STORYBOOK_EPISODES.find((e) => e.id === id);
        if (!episode) continue;
        for (const scene of episode.scenes) if (scene.speaker) speakers.add(scene.speaker);
      }
      const bySound = new Map<string, StorybookSpeaker>();
      for (const speaker of speakers) {
        if (speaker === "narrator") continue;
        const sound = speakerSound(speaker);
        const clash = bySound.get(sound);
        if (clash && canonicalSpeaker(clash) === canonicalSpeaker(speaker)) continue;
        expect(clash, `${season.moduleId}: ${speaker} and ${clash} share the voice ${sound}`).toBeUndefined();
        bySound.set(sound, speaker);
      }
    }
  });

  it("every speaker has a voice that is not the narrator default", () => {
    const speakers = new Set<StorybookSpeaker>();
    for (const episode of STORYBOOK_EPISODES) {
      for (const scene of episode.scenes) if (scene.speaker && scene.speaker !== "narrator") speakers.add(scene.speaker);
    }
    for (const speaker of speakers) {
      expect(speakerSound(speaker), `${speaker} falls back to the narrator voice`).not.toBe("neutral::story");
    }
  });
});

describe("storybook artwork", () => {
  it("every episode folder has a cover plus one image per scene, all under 300 KB", () => {
    for (const episode of STORYBOOK_EPISODES) {
      const dir = path.join(ASSETS, episode.id);
      if (!fs.existsSync(dir)) continue; // episodes may reuse shared art
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".jpg") || f.endsWith(".png"));
      expect(files, `${episode.id}: missing cover.jpg`).toContain("cover.jpg");
      expect(files.length, `${episode.id}: expected cover + ${episode.scenes.length} scenes`).toBe(episode.scenes.length + 1);
      for (const file of files) {
        const size = fs.statSync(path.join(dir, file)).size;
        expect(size, `${episode.id}/${file} is ${Math.round(size / 1024)} KB`).toBeLessThanOrEqual(MAX_BYTES);
      }
    }
  });
});
