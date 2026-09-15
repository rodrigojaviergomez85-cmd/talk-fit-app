import { describe, expect, it } from "vitest";
import { existsSync, statSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { STORYBOOK_SEASONS } from "./seasons";
import { STORYBOOK_EPISODES } from "./index";
import { speakerSound } from "./voices";
import type { StorybookEpisode } from "./types";

/**
 * Automatic gate for Season 7 (Tigers): real artwork, stable voices, complete scenes.
 * MIN_BYTES exists so placeholder art (flat color ~6 KB) can never ship again.
 */
const ASSETS = resolve(process.cwd(), "src/assets/storybook");
const MAX_BYTES = 250 * 1024;
const MIN_BYTES = 40 * 1024;

function jpegDimensions(file: string): { width: number; height: number } | undefined {
  const bytes = readFileSync(file);
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) return undefined;
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (marker && marker >= 0xc0 && marker <= 0xc3) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return undefined;
}

const season7 = STORYBOOK_SEASONS.find((s) => s.moduleId === "tigers")!;
const registered: StorybookEpisode[] = season7.slots
  .map((slot) => STORYBOOK_EPISODES.find((e) => e.id === slot.episodeId))
  .filter((e): e is StorybookEpisode => Boolean(e));

describe("Season 7 (Tigers) consistency", () => {
  it("registers all 20 episodes", () => {
    expect(registered).toHaveLength(20);
  });

  it("every episode has a cover plus one image per scene", () => {
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

  it("every image is real artwork: 768×768, between 40 KB and 250 KB", () => {
    const invalid: string[] = [];
    for (const episode of registered) {
      const dir = resolve(ASSETS, episode.id);
      if (!existsSync(dir)) continue;
      for (const file of readdirSync(dir).filter((f) => f.endsWith(".jpg"))) {
        const path = resolve(dir, file);
        const size = statSync(path).size;
        const dimensions = jpegDimensions(path);
        if (
          size > MAX_BYTES ||
          size < MIN_BYTES ||
          dimensions?.width !== 768 ||
          dimensions.height !== 768
        ) {
          invalid.push(
            `${episode.id}/${file} = ${dimensions?.width}×${dimensions?.height}, ${Math.round(size / 1024)} KB`,
          );
        }
      }
    }
    expect(invalid, "imágenes de relleno o fuera de formato").toEqual([]);
  });

  it("every scene has dialogue, an alt text and no duplicated voices", () => {
    const problems: string[] = [];
    const voiceOwner = new Map<string, string>();
    for (const episode of registered) {
      if (episode.quizzes.length !== 3) problems.push(`${episode.id}: ${episode.quizzes.length} quizzes`);
      if (!episode.cliffhanger?.en) problems.push(`${episode.id}: sin cliffhanger`);
      for (const scene of episode.scenes) {
        if (!scene.imageAlt?.trim()) problems.push(`${episode.id}/${scene.id}: sin imageAlt`);
        const lines = scene.lines ?? [];
        if (lines.length < 2) problems.push(`${episode.id}/${scene.id}: sin diálogo`);
        for (const line of lines) {
          if (line.speaker === "narrator") continue;
          const sound = speakerSound(line.speaker);
          const owner = voiceOwner.get(sound);
          if (owner && owner !== line.speaker) {
            problems.push(`${episode.id}/${scene.id}: voz ${sound} compartida por ${owner} y ${line.speaker}`);
          }
          voiceOwner.set(sound, line.speaker);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("every tappable word appears in its scene text", () => {
    const missing: string[] = [];
    for (const episode of registered) {
      for (const scene of episode.scenes) {
        const haystack = [scene.text, ...(scene.lines ?? []).map((l) => l.text)].join(" ").toLowerCase();
        for (const word of scene.words ?? []) {
          if (!haystack.includes(word.word.toLowerCase())) {
            missing.push(`${episode.id}/${scene.id}: ${word.word}`);
          }
        }
      }
    }
    expect(missing).toEqual([]);
  });
});

/**
 * Mr. Herrera canon: older man, grey beard and mustache, dark grey suit.
 * Scene descriptions must never present him as a young man in a white shirt.
 */
describe("Tigers — Mr. Herrera", () => {
  const withHerrera = STORYBOOK_EPISODES.filter((episode) =>
    episode.scenes.some(
      (scene) => scene.speaker === "herrera" || (scene.lines ?? []).some((l) => l.speaker === "herrera"),
    ),
  );

  it("appears in the expected Tigers episodes", () => {
    expect(withHerrera.map((e) => e.id).sort()).toEqual([
      "tigers-ep13-the-best-of-the-city",
      "tigers-ep17-the-visit",
      "tigers-ep7-your-experience",
    ]);
  });

  it("is never described as a young man in a white shirt", () => {
    const problems: string[] = [];
    for (const episode of withHerrera) {
      for (const scene of episode.scenes) {
        const alt = (scene.imageAlt ?? "").toLowerCase();
        const isHerreraScene =
          scene.speaker === "herrera" || (scene.lines ?? []).some((l) => l.speaker === "herrera");
        if (!isHerreraScene) continue;
        if (alt.includes("camisa blanca") || alt.includes("hombre joven")) {
          problems.push(`${episode.id}/${scene.id}: ${scene.imageAlt}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });
});

/**
 * Dani canon: young adult Salvadoran man (19-20), short curly black hair,
 * medium-brown skin, light blue shirt. Never a child.
 */
describe("Tigers — Dani", () => {
  const withDani = STORYBOOK_EPISODES.filter(
    (episode) =>
      episode.id.startsWith("tigers-") &&
      episode.scenes.some(
        (scene) => scene.speaker === "dani" || (scene.lines ?? []).some((l) => l.speaker === "dani"),
      ),
  );

  it("appears in several Tigers episodes", () => {
    expect(withDani.length).toBeGreaterThan(5);
  });

  it("is never described as a child", () => {
    const problems: string[] = [];
    const childWords = ["niño", "nino", "niñito", "chiquito", "child", "kid"];
    for (const episode of withDani) {
      for (const scene of episode.scenes) {
        const alt = (scene.imageAlt ?? "").toLowerCase();
        const isDaniScene =
          scene.speaker === "dani" || (scene.lines ?? []).some((l) => l.speaker === "dani");
        if (!isDaniScene) continue;
        if (childWords.some((w) => alt.includes(w))) {
          problems.push(`${episode.id}/${scene.id}: ${scene.imageAlt}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });
});
