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
  "advanced2-ep6-keller-at-the-door": [
    "That's what fighting for her looks like when the other side didn't ask any.",
    "Crown's offer is twenty percent more money to not go to university. She didn't ask me either.",
  ],
  "advanced2-ep7-value-first": [
    "Price first sounds like a trick. Value first sounds like help. Watch one and then take one.",
    "Two breakfasts is more than fifteen dollars where I live. Give me the balcony.",
  ],
  "advanced2-ep8-crown-or-here": [
    "Nico said it first. I'm just repeating it to Bogotá.",
    "He said Crown twice in one answer. Is that allowed?",
  ],
  "advanced2-ep9-too-expensive": [
    "You don't win a price argument. Nobody does. You move the conversation to what the price buys.",
    "Then you didn't win anything yet. Go eat.",
  ],
  "advanced2-ep10-dont-make-it-weird": [
    "Don't. Make it. Weird. I'm staying. I told Keller this morning.",
    "A summary is not a next step. I need the files. In Bogotá we don't grade summaries.",
  ],
  "advanced2-ep11-bogota-is-waiting": [
    "One apology. Good. Now the facts.",
    "That last part is not a fact. That's a reason for me to feel sorry for you. Take it out.",
  ],
  "advanced2-ep12-one-step-at-a-time": [
    "You said one. Then you waited. Waiting is the part. One step at a time. You know this.",
    "The other guy did all the steps at once. I only did one.",
  ],
  "advanced2-ep13-no-phones-on-the-floor": [
    "The rule is about the screens. It says 'phones' because it can't tell the difference.",
    "That's a not yet.",
  ],
  "advanced2-ep14-the-lobby": [
    "That's the point of counting. If she sees it, it's waiting. If she doesn't, it's listening.",
    "Then she's been waiting a long time for somebody to.",
  ],
  "advanced2-ep15-not-this-thursday": [
    "Not this Thursday.",
    "She's said no to you every week for two years. You just called it homework.",
  ],
  "advanced2-ep16-nico-hung-up": [
    "You left out what you think.",
    "Two paragraphs. Facts first. Opinion second, marked as opinion. That's how it goes upstairs.",
  ],
  "advanced2-ep17-one-to-one": [
    "It's my one-to-one, jefe. Let me say my numbers.",
    "My goal for next month is four. One more sentence. The one after I'm right.",
  ],
  "advanced2-ep18-mia-teaches": [
    "That's the part I'm going to write in your file. Not the mistake. The three seconds after.",
    "You got step three wrong and fifteen people learned it anyway. Friday's fine.",
  ],
  "advanced2-ep19-the-audit": [
    "That was day one. Show me day eighty-nine.",
    "Don't take those calls for them. Not tomorrow. That's the only note I have for you, and it's not on the sheet.",
  ],
  "advanced2-ep20-day-ninety": [
    "The pilot audits. The club doesn't. Tuesday at seven, the room is still empty and the chair is still yours. Bring your cousin. In three months you take this audit again, and I don't take the call for you then either.",
    "Not the floor one. This one. Him, in an office, saying the kid did the right thing. No screens. Just a jefe.",
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
          spoken.some((text) => text.toLowerCase().includes(line.toLowerCase())),
          `missing approved line: ${line}`,
        ).toBe(true);
      }
    });
  }

  it("no Advanced 2 character talks about the course from inside the story", () => {
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
