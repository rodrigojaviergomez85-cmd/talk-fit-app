import { describe, expect, it } from "vitest";
import { STORYBOOK_EPISODES } from "./index";
import {
  ACTIVE_BASELINE,
  ACTIVE_GOAL,
  EPISODE_VOCAB_BUDGET,
  MIN_NEW_UNITS_PER_EPISODE,
  corpusContainsUnit,
  episodeEnglishCorpus,
} from "./vocabulary-targets";

describe("B2 vocabulary budget", () => {
  const budgeted = Object.keys(EPISODE_VOCAB_BUDGET);

  it("assigns at least 15 target units to every budgeted episode", () => {
    for (const id of budgeted) {
      expect(EPISODE_VOCAB_BUDGET[id]!.length, `${id} budget`).toBeGreaterThanOrEqual(
        MIN_NEW_UNITS_PER_EPISODE,
      );
      expect(new Set(EPISODE_VOCAB_BUDGET[id]).size).toBe(EPISODE_VOCAB_BUDGET[id]!.length);
    }
  });

  it("speaks every budgeted unit inside its episode", () => {
    for (const id of budgeted) {
      const episode = STORYBOOK_EPISODES.find((entry) => entry.id === id);
      expect(episode, `${id} must be published`).toBeDefined();
      const corpus = episodeEnglishCorpus(episode!);
      for (const unit of EPISODE_VOCAB_BUDGET[id]!) {
        expect(corpusContainsUnit(corpus, unit), `${id}: "${unit}" must be spoken`).toBe(true);
      }
    }
  });

  it("keeps the plan on track for 3,500 active words", () => {
    const delivered = budgeted.length * MIN_NEW_UNITS_PER_EPISODE;
    const remainingEpisodes = 70 - budgeted.length;
    const projected = ACTIVE_BASELINE + delivered + remainingEpisodes * MIN_NEW_UNITS_PER_EPISODE;
    expect(projected).toBeGreaterThanOrEqual(ACTIVE_GOAL);
  });
});
