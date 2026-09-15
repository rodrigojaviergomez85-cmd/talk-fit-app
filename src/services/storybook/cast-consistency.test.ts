import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { STORYBOOK_EPISODES } from "./index";
import { STORYBOOK_SEASONS } from "./seasons";
import { CHARACTER_CANON, appearsInSeason, characterCanon, buildCharacterPrompt } from "./character-canon";
import { canonicalSpeaker, speakerSound } from "./voices";
import type { StorybookEpisode, StorybookSpeaker } from "./types";

/**
 * Cross-season safety net. Catches the three mistakes that reached students:
 * a line given to the wrong character, a character speaking in a season where
 * they do not exist, and artwork that never got produced.
 */

const ASSETS = resolve(process.cwd(), "src/assets/storybook");
const MAX_BYTES = 250 * 1024;
/** Placeholder art (flat color) is tiny; real illustrations never are. */
const MIN_BYTES = 10 * 1024;

const REGISTERED_IDS = new Set(
  STORYBOOK_SEASONS.flatMap((season) => season.slots.map((slot) => slot.episodeId).filter(Boolean)),
);
const EPISODES: StorybookEpisode[] = STORYBOOK_EPISODES.filter((e) => REGISTERED_IDS.has(e.id));

function sceneSpeakers(scene: StorybookEpisode["scenes"][number]): StorybookSpeaker[] {
  const speakers = new Set<StorybookSpeaker>();
  if (scene.speaker) speakers.add(scene.speaker);
  for (const line of scene.lines ?? []) speakers.add(line.speaker);
  return [...speakers];
}

describe("storybook cast consistency", () => {
  it("has a registered episode set to check", () => {
    expect(EPISODES.length).toBeGreaterThan(100);
  });

  it("only lets characters speak in the seasons their canon allows", () => {
    const offenders: string[] = [];
    for (const episode of EPISODES) {
      for (const scene of episode.scenes) {
        for (const speaker of sceneSpeakers(scene)) {
          if (!appearsInSeason(speaker, episode.moduleId)) {
            offenders.push(`${episode.id} ${scene.id}: ${speaker} not in ${episode.moduleId}`);
          }
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("never names a character that does not exist in that season", () => {
    const offenders: string[] = [];
    for (const episode of EPISODES) {
      const text = episode.scenes
        .map((scene) => [scene.text, ...(scene.lines ?? []).map((l) => l.text)].join(" "))
        .join(" ");
      for (const canon of Object.values(CHARACTER_CANON)) {
        if (canon.name === "Candidate") continue;
        if (appearsInSeason(canon.id, episode.moduleId)) continue;
        for (const name of [canon.name, ...(canon.aka ?? [])]) {
          if (new RegExp(`\\b${name}\\b`).test(text)) {
            offenders.push(`${episode.id}: names ${name} but ${canon.id} is not in ${episode.moduleId}`);
          }
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("draws everyone who speaks in a scene that declares its cast", () => {
    const offenders: string[] = [];
    for (const episode of EPISODES) {
      for (const scene of episode.scenes) {
        if (!scene.cast) continue;
        const drawn = new Set(scene.cast);
        for (const speaker of sceneSpeakers(scene)) {
          if (speaker === "narrator") continue;
          if (!drawn.has(speaker)) offenders.push(`${episode.id} ${scene.id}: ${speaker} speaks but is not drawn`);
        }
        for (const member of scene.cast) {
          if (!appearsInSeason(member, episode.moduleId)) {
            offenders.push(`${episode.id} ${scene.id}: ${member} drawn outside their seasons`);
          }
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("gives every canonical character one stable voice and a usable art prompt", () => {
    for (const canon of Object.values(CHARACTER_CANON)) {
      expect(speakerSound(canon.id), `${canon.id} has no voice`).not.toBe("neutral::story");
      const prompt = buildCharacterPrompt(canon.id);
      expect(prompt).toContain(canon.look);
      expect(prompt).toContain(canon.outfit);
    }
  });

  it("never gives two characters of the same season the same voice", () => {
    const offenders: string[] = [];
    for (const season of STORYBOOK_SEASONS) {
      const sounds = new Map<string, StorybookSpeaker>();
      for (const canon of Object.values(CHARACTER_CANON)) {
        if (!appearsInSeason(canon.id, season.moduleId)) continue;
        const id = canonicalSpeaker(canon.id);
        const sound = speakerSound(id);
        const taken = sounds.get(sound);
        if (taken && taken !== id) {
          offenders.push(`${season.moduleId}: ${taken} and ${id} share ${sound}`);
        } else {
          sounds.set(sound, id);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("ships real artwork for every registered scene", () => {
    const offenders: string[] = [];
    for (const episode of EPISODES) {
      const dir = resolve(ASSETS, episode.id);
      for (const scene of episode.scenes) {
        const file = resolve(dir, `${scene.id}.jpg`);
        if (!existsSync(file)) {
          offenders.push(`${episode.id}/${scene.id}.jpg missing`);
          continue;
        }
        const size = statSync(file).size;
        if (size > MAX_BYTES) offenders.push(`${episode.id}/${scene.id}.jpg too heavy (${size})`);
        if (size < MIN_BYTES) offenders.push(`${episode.id}/${scene.id}.jpg looks like a placeholder (${size})`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("keeps every speaker used in the app described in the character bible", () => {
    const used = new Set<StorybookSpeaker>();
    for (const episode of EPISODES) {
      for (const scene of episode.scenes) for (const s of sceneSpeakers(scene)) used.add(s);
    }
    for (const speaker of used) {
      if (speaker === "narrator") continue;
      expect(characterCanon(speaker), `${speaker} is missing from character-canon.ts`).toBeTruthy();
    }
  });
});
