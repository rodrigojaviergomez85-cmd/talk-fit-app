import { describe, expect, it } from "vitest";
import { STORYBOOK_EPISODES } from "./index";
import { STORYBOOK_SEASONS } from "./seasons";

const APPROVED_LINES: Record<string, string[]> = {
  "advanced3-ep1-two-million": [
    "I'm a what.",
    "That's the first honest sentence anyone said to you today. Looking back, nobody asked you that on day one either. Take the week.",
  ],
  "advanced3-ep2-the-comments": [
    "The one looking at his phone. That's Nico. The one who never smiles and never loses a customer. It looks like he's between calls; he might be reading the comments about himself, because he's not moving.",
    "I want you to describe me right. You did, the second time. I'm fine.",
  ],
  "advanced3-ep3-miami-six-months": [
    "That's not a reason. That's a schedule with a hole in it. The difficult part won't be Bogotá or Monterrey; it'll be month four, when you're tired and nobody's watching. A plan without a why doesn't survive month four.",
    "I'm not telling you no. I'm telling you to know why before the plane knows.",
  ],
  "advanced3-ep4-mias-night": [
    "It was your choice. That's the only kind that counts on a Thursday. You gave a reason, an example, the other side and a close. I gave Barrett a plan with your name in it and no reason. Guess which one she wrote down.",
    "Then it's the wrong question mark. The plan isn't who runs the floor. It's who does the Thursdays.",
  ],
  "advanced3-ep5-the-livestream": [
    "...That's not me. That's a page. Let me put this down.",
    "The way I see it, an app is for the repetitions and a room is for the fear. You can practice a phrase two hundred times alone. You can't practice being afraid alone. I'll say more about that next week, when someone asks me on purpose.",
  ],
  "advanced3-ep6-the-accent-question": [
    "Personally, I think an accent is proof that you learned.",
    "Yes. Ask next time. And Dani: the sentence about the work. That one you can keep.",
  ],
  "advanced3-ep7-app-or-room": [
    "Personally, I think the best answer is somewhere in the middle. The app for the repetitions, the room for the fear.",
    "I'm telling you now. That's the part of the room the app can't do either.",
  ],
  "advanced3-ep8-nico-wants-to-quit": [
    "That's not what a boss says.",
    "If you do that, by March you'll know if it's a job or a hobby, and you'll know it with rent paid.",
  ],
  "advanced3-ep9-miami-or-here": [
    "Which one lets you keep taking calls?",
    "So the real trade-off is reach now versus contact every day. Twenty floors I visit, or one floor I'm on.",
  ],
  "advanced3-ep10-a-meme-not-a-director": [
    "I'd rather be corrected in this room than trusted with the wrong number in three.",
    "I didn't need to.",
  ],
};

const FORBIDDEN_IN_DIALOGUE = ["B2", "C1", "Advanced 2", "Advanced 3", "Your turn", "framework"];

const season11 = STORYBOOK_SEASONS.find((season) => season.moduleId === "advanced-3");
const registeredIds = (season11?.slots ?? [])
  .map((slot) => slot.episodeId)
  .filter((episodeId): episodeId is string => Boolean(episodeId));

describe("Advanced 3 — fidelity to the approved scripts", () => {
  for (const [episodeId, lines] of Object.entries(APPROVED_LINES)) {
    const episode = STORYBOOK_EPISODES.find((entry) => entry.id === episodeId);

    it(`${episodeId} exists`, () => {
      expect(episode).toBeDefined();
      expect(registeredIds).toContain(episodeId);
    });

    it(`${episodeId} keeps every approved line`, () => {
      const spoken = (episode?.scenes ?? []).flatMap((scene) => (scene.lines ?? []).map((line) => line.text));
      for (const line of lines) {
        expect(
          spoken.some((text) => text.toLowerCase().includes(line.toLowerCase())),
          `missing approved line: ${line}`,
        ).toBe(true);
      }
    });
  }

  it("checks every registered Advanced 3 episode", () => {
    expect(Object.keys(APPROVED_LINES).sort()).toEqual([...registeredIds].sort());
  });

  it("no Advanced 3 character talks about the course from inside the story", () => {
    const episodes = STORYBOOK_EPISODES.filter((episode) => registeredIds.includes(episode.id));
    expect(episodes.length).toBe(registeredIds.length);
    for (const episode of episodes) {
      const spoken = episode.scenes.flatMap((scene) => (scene.lines ?? []).map((line) => line.text));
      for (const text of spoken) {
        for (const banned of FORBIDDEN_IN_DIALOGUE) {
          expect(text.includes(banned), `${episode.id}: "${banned}" in "${text}"`).toBe(false);
        }
      }
    }
  });
});