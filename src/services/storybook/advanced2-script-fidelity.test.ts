import { describe, expect, it } from "vitest";
import { STORYBOOK_EPISODES } from "./index";

/**
 * Guardrail: Advanced 2 week 1 episodes must keep the dialogue that was approved
 * in the script documents. These lines can never be rewritten.
 */
const APPROVED_LINES: Record<string, string[]> = {
  "advanced2-ep1-headset-on": [
    "She never said what broke. You filled it in.",
    "My mom calls people like me all the time. She hangs up when they guess.",
  ],
  "advanced2-ep2-three-changes-of-mind": [
    "Stop writing what they say. Write what they need.",
    "TikTok, honestly. A girl in Manila who does hotel calls.",
  ],
  "advanced2-ep3-ninety-days": [
    "Then Northline doesn't keep you on the pilot. I'm not going to soften that.",
    "Nobody finds out on day ninety what they could have known on day nine.",
  ],
  "advanced2-ep4-the-line-item": [
    "Don't apologize for the language. Finish the sentence you started.",
    "I flag everything. It's the job.",
  ],
  "advanced2-ep5-the-remittance": [
    "You didn't need me to. That's the whole point of the chair.",
    "It's not magic. It's about six hours.",
  ],
};

/** Characters must never name the course machinery inside the story. */
const FORBIDDEN_IN_DIALOGUE = ["B2", "Advanced 2", "Advanced 3", "Your turn", "framework"];

describe("Advanced 2 — fidelity to the approved scripts", () => {
  for (const [episodeId, lines] of Object.entries(APPROVED_LINES)) {
    const episode = STORYBOOK_EPISODES.find((e) => e.id === episodeId);

    it(`${episodeId} exists`, () => {
      expect(episode).toBeDefined();
    });

    it(`${episodeId} keeps every approved line`, () => {
      const spoken = (episode?.scenes ?? []).flatMap((s) => (s.lines ?? []).map((l) => l.text));
      for (const line of lines) {
        expect(
          spoken.some((text) => text.includes(line)),
          `missing approved line: ${line}`,
        ).toBe(true);
      }
    });
  }

  it("no Advanced 2 week 1 character talks about the course from inside the story", () => {
    const ids = Object.keys(APPROVED_LINES);
    const episodes = STORYBOOK_EPISODES.filter((e) => ids.includes(e.id));
    expect(episodes.length).toBe(ids.length);
    for (const episode of episodes) {
      const spoken = episode.scenes.flatMap((s) => (s.lines ?? []).map((l) => l.text));
      for (const text of spoken) {
        for (const banned of FORBIDDEN_IN_DIALOGUE) {
          expect(text.includes(banned), `${episode.id}: "${banned}" in "${text}"`).toBe(false);
        }
      }
    }
  });
});
