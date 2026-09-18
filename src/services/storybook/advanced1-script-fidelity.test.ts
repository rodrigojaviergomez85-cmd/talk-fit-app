import { describe, expect, it } from "vitest";
import { STORYBOOK_EPISODES } from "./index";

/**
 * Guardrail: Advanced 1 episodes must keep the dialogue that was approved in the
 * script documents. Each entry lists lines that were signed off and must appear
 * verbatim in the shipped episode, plus the line/word budget of the format.
 */
const APPROVED_LINES: Record<string, string[]> = {
  "advanced1-ep11-why-i-left": [
    "Size is easy to buy, Barrett. A reason isn't.",
    "They sent an offer — to Lidia.",
  ],
  "advanced1-ep12-the-course-i-closed": [
    "Retention went from forty-one per cent to eighty-eight. Elena was in the course that failed and she's still here.",
    "I'm not going to talk you out of money, Lidia.",
  ],
  "advanced1-ep13-why-here": [
    "Same question, two rooms. Northline wanted to know why them; Lidia wanted to know why here.",
  ],
  "advanced1-ep14-the-hour-about-money": [
    "The panel is Barrett plus two people who were not impressed by you, and they'll interrupt on purpose.",
  ],
  "advanced1-ep15-the-room-that-interrupts": [
    "They'll interrupt in the first twenty seconds. Don't restart your sentence; finish the idea and then take their question.",
    "Then I say what I do know, say what I'd need to check, and keep talking. Silence is the only answer that loses the room.",
    "Why this contract, in thirty seconds, and I will interrupt you.",
    "Then the problem isn't English, and I'd tell you that in month two rather than bill you for a year finding out.",
    "Because the course I closed is the reason this one is measured. Had I never closed it, I'd still be selling vocabulary lists, and you'd be right to worry.",
    "What would a former colleague criticise about you? And it has to be true.",
    "Give me the honest reason not to hire you.",
    "She just argued our side of the table better than we did.",
    "Monday you tell them your whole professional story — past, present and future — in ninety seconds, with no questions and no help.",
  ],
  "advanced1-ep17-show-me-dont-tell-me": [
    "Don't tell me you're good under pressure. Show me a Tuesday.",
    "Sixty people called. Thirty-one enrolled, and the other twenty-nine got a call back within a day. I checked the list myself.",
  ],
  "advanced1-ep18-the-question-nobody-prepares-for": [
    "This is the part of the interview nobody prepares for.",
    "Lidia's the better teacher. Everyone knows that. He's the one who'd notice if I stopped coming.",
  ],
  "advanced1-ep19-now-you-ask": [
    "You've called three times and you're talking to the fourth person. That ends now.",
    "Then I'd be selling you a voice instead of a result, and you'd notice in month two.",
  ],
  "advanced1-ep20-the-last-room": [
    "It's where I learned English out loud with strangers staring at me.",
    "You built a teacher who can lose you. That's the whole job, Vale.",
  ],
};

/** Characters must never name the course machinery inside the story. */
const FORBIDDEN_IN_DIALOGUE = ["B2", "Advanced 2", "Advanced 3", "Your turn", "framework"];

/** Episodes written under the "no course talk inside the story" rule (week 4 closing arc). */
const NO_COURSE_TALK_EPISODES = [
  "advanced1-ep17-show-me-dont-tell-me",
  "advanced1-ep18-the-question-nobody-prepares-for",
  "advanced1-ep19-now-you-ask",
  "advanced1-ep20-the-last-room",
];

/**
 * Highlighted-expression budget. Default is 2 phrasal verbs + 2 idioms; the
 * season finale ships 1 phrasal + 3 idioms by script design, same total of 4.
 */
const EXPRESSION_BUDGET: Record<string, { phrasal: number; idiom: number }> = {
  "advanced1-ep20-the-last-room": { phrasal: 1, idiom: 3 },
};

describe("Advanced 1 — fidelity to the approved scripts", () => {
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

    it(`${episodeId} keeps the format budget`, () => {
      const spoken = (episode?.scenes ?? []).flatMap((s) => (s.lines ?? []).map((l) => l.text));
      const words = spoken.join(" ").split(/\s+/).filter(Boolean).length;
      expect(spoken.length).toBeGreaterThanOrEqual(23);
      expect(words).toBeGreaterThanOrEqual(440);
      expect(words).toBeLessThanOrEqual(680);
    });

    it(`${episodeId} ships its four highlighted expressions`, () => {
      const expressions = episode?.expressions ?? [];
      const budget = EXPRESSION_BUDGET[episodeId] ?? { phrasal: 2, idiom: 2 };
      expect(expressions.filter((e) => e.kind === "phrasal").length).toBeGreaterThanOrEqual(budget.phrasal);
      expect(expressions.filter((e) => e.kind === "idiom").length).toBeGreaterThanOrEqual(budget.idiom);
      expect(expressions.length).toBeGreaterThanOrEqual(4);
    });
  }

  it("no Advanced 1 character talks about the course from inside the story", () => {
    const episodes = STORYBOOK_EPISODES.filter((e) => NO_COURSE_TALK_EPISODES.includes(e.id));
    expect(episodes.length).toBe(NO_COURSE_TALK_EPISODES.length);
    expect(episodes.length).toBeGreaterThan(0);
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
