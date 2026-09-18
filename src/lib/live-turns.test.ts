import { describe, expect, it } from "vitest";
import { appendFragment, emptyTranscript, type LiveTranscript } from "./live-turns";

function feed(state: LiveTranscript, fragments: Parameters<typeof appendFragment>[1][]): LiveTranscript {
  return fragments.reduce(appendFragment, state);
}

describe("live transcript turns", () => {
  it("joins fragments of the same turn", () => {
    const state = feed(emptyTranscript, [
      { id: "coach-1", role: "coach", text: "What did you " },
      { id: "coach-1", role: "coach", text: "do yesterday?" },
    ]);
    expect(state.turns).toHaveLength(1);
    expect(state.question).toBe("What did you do yesterday?");
  });

  it("keeps two coach turns separate without the learner speaking in between", () => {
    const state = feed(emptyTranscript, [
      { id: "coach-1", role: "coach", text: "What did you do yesterday?" },
      { id: "coach-2", role: "coach", kind: "spanish", text: "¿Qué hiciste ayer?" },
      { id: "coach-3", role: "coach", kind: "idea", text: "Try: Yesterday I…" },
    ]);
    expect(state.turns.map((t) => t.kind)).toEqual(["question", "spanish", "idea"]);
    expect(state.question).toBe("What did you do yesterday?");
    expect(state.spanish).toBe("¿Qué hiciste ayer?");
    expect(state.idea).toBe("Try: Yesterday I…");
  });

  it("runs the full sequence without turning the card into a paragraph", () => {
    const state = feed(emptyTranscript, [
      { id: "coach-1", role: "coach", text: "What did you do yesterday?" },
      { id: "coach-2", role: "coach", kind: "spanish", text: "¿Qué hiciste ayer?" },
      { id: "coach-3", role: "coach", kind: "idea", text: "Try: Yesterday I…" },
      { id: "coach-4", role: "coach", kind: "slow", text: "What did you do yesterday?" },
      { id: "you-1", role: "you", text: "Yesterday I worked." },
      { id: "coach-5", role: "coach", text: "Nice! Where do you work?" },
    ]);
    expect(state.question).toBe("Nice! Where do you work?");
    expect(state.spanish).toBe("");
    expect(state.idea).toBe("");
    expect(state.turns).toHaveLength(6);
    expect(state.turns.map((t) => t.role)).toEqual([
      "coach",
      "coach",
      "coach",
      "coach",
      "you",
      "coach",
    ]);
  });

  it("slower repetition does not change the visible question", () => {
    const first = appendFragment(emptyTranscript, { id: "c1", role: "coach", text: "Where do you live?" });
    const after = appendFragment(first, { id: "c2", role: "coach", kind: "slow", text: "Where… do… you… live?" });
    expect(after.question).toBe("Where do you live?");
    expect(after.turns).toHaveLength(2);
  });

  it("does not assume speakers alternate", () => {
    const state = feed(emptyTranscript, [
      { id: "you-1", role: "you", text: "Hello" },
      { id: "you-2", role: "you", text: "I am ready" },
    ]);
    expect(state.turns).toHaveLength(2);
    expect(state.question).toBe("");
  });

  it("ignores empty fragments", () => {
    const state = appendFragment(emptyTranscript, { id: "c1", role: "coach", text: "" });
    expect(state.turns).toHaveLength(0);
  });
});
