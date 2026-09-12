import { describe, it, expect } from "vitest";
import type { JourneyState } from "@/lib/types";
import { STORYBOOK_EPISODES } from "./index";
import { STORYBOOK_SEASONS, unlockedWeek, unlockedDay, getNextEpisodeSlot } from "./seasons";

/** Structures the learner has NOT seen yet in Basic Zero weeks 1-2. */
const OUT_OF_SCOPE = [
  /\bwill\b/i,
  /\bwas\b|\bwere\b/i,
  /\bhave been\b|\bhas been\b/i,
  /\bwould\b|\bshould\b|\bcould\b/i,
  /\bdidn't\b|\bdid not\b/i,
  /\bgoing to\b/i,
];

describe("storybook seasons", () => {
  it("unlocks one episode per completed day", () => {
    expect(unlockedDay(0)).toBe(1);
    expect(unlockedDay(1)).toBe(2);
    expect(unlockedDay(7)).toBe(8);
  });

  it("unlocks one week per 5 completed days, capped at week 4", () => {
    expect(unlockedWeek(0)).toBe(1);
    expect(unlockedWeek(4)).toBe(1);
    expect(unlockedWeek(5)).toBe(2);
    expect(unlockedWeek(12)).toBe(3);
    expect(unlockedWeek(15)).toBe(4);
    expect(unlockedWeek(40)).toBe(4);
  });

  it("every season slot with an episode id resolves to a real episode in the same week", () => {
    for (const season of STORYBOOK_SEASONS) {
      for (const slot of season.slots) {
        if (!slot.episodeId) continue;
        const episode = STORYBOOK_EPISODES.find((e) => e.id === slot.episodeId);
        expect(episode, `missing episode ${slot.episodeId}`).toBeTruthy();
        expect(episode!.moduleId).toBe(season.moduleId);

      }
    }
  });

  it("basic-zero episodes stay inside the cumulative language scope", () => {
    const episodes = STORYBOOK_EPISODES.filter((e) => e.moduleId === "basic-zero");
    expect(episodes.length).toBeGreaterThan(0);
    for (const episode of episodes) {
      for (const scene of episode.scenes) {
        for (const pattern of OUT_OF_SCOPE) {
          expect(pattern.test(scene.text), `${episode.id}/${scene.id}: "${scene.text}"`).toBe(false);
        }
      }
    }
  });

  it("every tappable word actually appears in its scene text", () => {
    for (const episode of STORYBOOK_EPISODES) {
      for (const scene of episode.scenes) {
        for (const word of scene.words) {
          expect(
            scene.text.toLowerCase().includes(word.word.toLowerCase()),
            `${episode.id}/${scene.id} missing "${word.word}"`,
          ).toBe(true);
        }
      }
    }
  });

  it("returns a locked Season 2 teaser after the Season 1 finale", () => {
    const state: JourneyState = {
      days: {},
      streakDays: 0,
      totalRepsCompleted: 0,
      totalSpeakingSeconds: 0,
      weekSeconds: {},
    };
    const next = getNextEpisodeSlot("vale-graduation", state);
    expect(next).toBeTruthy();
    expect(next!.teaser.en).toBe("She is ready");
    expect(next!.episodeId).toBeNull();
  });
});
