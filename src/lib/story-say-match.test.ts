import { describe, expect, it } from "vitest";
import { compareStorySay, buildSayItHint, buildSayItStartHint } from "./story-say-match";


describe("compareStorySay", () => {
  describe("exact targets", () => {
    it("passes a clean exact phrase", () => {
      expect(compareStorySay("What is your name?", "What is your name").status).toBe("good");
    });

    it("ignores surrounding filler words", () => {
      expect(compareStorySay("What is your name?", "Well, what is your name?").status).toBe("good");
    });

    it("rejects a totally different phrase", () => {
      expect(compareStorySay("What is your name?", "My name is Rodrigo").status).toBe("tryAgain");
    });

    it("rejects only the slot content without the frame", () => {
      // "Rodrigo" alone should never pass for "My name is *"
      expect(compareStorySay("My name is *", "Rodrigo").status).toBe("tryAgain");
    });
  });

  describe("wildcard targets", () => {
    it("passes a name in the slot", () => {
      expect(compareStorySay("My name is *", "My name is Rodrigo").status).toBe("good");
    });

    it("passes multiple words in the slot", () => {
      expect(compareStorySay("My hobbies are *", "My hobbies are music and soccer").status).toBe("good");
    });

    it("requires the fixed frame", () => {
      expect(compareStorySay("My hobbies are *", "I like music and soccer").status).toBe("tryAgain");
    });

    it("requires at least one word per slot", () => {
      expect(compareStorySay("I am * years old", "I am years old").status).toBe("tryAgain");
    });

    it("accepts a number in the age slot", () => {
      expect(compareStorySay("I am * years old", "I am nineteen years old").status).toBe("good");
    });

    it("tolerates leading filler before the fixed frame", () => {
      expect(compareStorySay("My favorite food is *", "Well, my favorite food is pupusas").status).toBe("good");
    });

    it("handles multiple fixed words after the slot", () => {
      expect(compareStorySay("He is from *", "He is from Canada").status).toBe("good");
    });
  });

  describe("empty input", () => {
    it("rejects empty transcripts", () => {
      expect(compareStorySay("What is your name?", "").status).toBe("tryAgain");
    });

    it("rejects empty targets", () => {
      expect(compareStorySay("", "What is your name").status).toBe("tryAgain");
    });
  });

  describe("short answers (allowShortAnswer)", () => {
    it("accepts a full natural answer", () => {
      expect(
        compareStorySay("My name is *", "My name is Rodrigo", { allowShortAnswer: true }).status,
      ).toBe("good");
    });

    it("accepts a bare one-word answer", () => {
      expect(compareStorySay("My name is *", "Rodrigo", { allowShortAnswer: true }).status).toBe(
        "good",
      );
    });

    it("accepts a two-word place name", () => {
      expect(
        compareStorySay("I am from *", "El Salvador", { allowShortAnswer: true }).status,
      ).toBe("good");
    });

    it("rejects repeating the question", () => {
      expect(
        compareStorySay("My name is *", "What is your name?", { allowShortAnswer: true }).status,
      ).toBe("tryAgain");
    });

    it("rejects short answers when allowShortAnswer is not set", () => {
      expect(compareStorySay("My name is *", "Rodrigo").status).toBe("tryAgain");
    });

    it("accepts a bare age", () => {
      expect(
        compareStorySay("I am * years old", "Twenty", { allowShortAnswer: true }).status,
      ).toBe("good");
    });
  });

  describe("buildSayItHint", () => {
    it("replaces a wildcard with ellipsis", () => {
      const result = buildSayItHint("My name is *", false);
      expect(result.label).toBe("Try say:");
      expect(result.hint).toBe("My name is ...");
    });

    it("uses the Spanish label", () => {
      const result = buildSayItHint("My favorite food is *", true);
      expect(result.label).toBe("Dilo así:");
      expect(result.hint).toBe("My favorite food is ...");
    });

    it("shows the full phrase when there is no wildcard", () => {
      const result = buildSayItHint("I can do it", false);
      expect(result.hint).toBe("I can do it");
    });

    it("normalizes extra whitespace", () => {
      const result = buildSayItHint("  I am  from  *  ", false);
      expect(result.hint).toBe("I am from ...");
    });
  });
});

describe("question cards accept the natural answer", () => {
  it("accepts an answer for a name prompt", () => {
    expect(
      compareStorySay("My name is *", "My name is Rodrigo.", {
        allowShortAnswer: true,
        altTargets: ["What is your name?"],
      }).status,
    ).toBe("good");
  });

  it("accepts a bare name", () => {
    expect(
      compareStorySay("My name is *", "Rodrigo", {
        allowShortAnswer: true,
        altTargets: ["What is your name?"],
      }).status,
    ).toBe("good");
  });

  it("still accepts the question itself", () => {
    expect(
      compareStorySay("My name is *", "What is your name?", {
        allowShortAnswer: true,
        altTargets: ["What is your name?"],
      }).status,
    ).toBe("good");
  });

  it("rejects an unrelated sentence", () => {
    expect(
      compareStorySay("My name is *", "I like pizza very much today", {
        allowShortAnswer: true,
        altTargets: ["What is your name?"],
      }).status,
    ).toBe("tryAgain");
  });
});

describe("buildSayItStartHint", () => {
  const cases: Array<[string, string, string]> = [
    ["I *", "What good news did you receive this year?", "I received…"],
    ["with *", "Who did you spend time with yesterday?", "I spent time with…"],
    ["I bought *", "What did you buy this week?", "I bought…"],
    ["I *", "Where did you go yesterday?", "I went to…"],
    ["I am going to *", "What are you going to study?", "I am going to study…"],
    ["Because *", "Why do you study English?", "Because I study English…"],
    ["my *", "Who did YOU take care of, or who took care of you?", "I took care of my…"],
  ];
  it.each(cases)("target %s + question %s", (target, question, expected) => {
    expect(buildSayItStartHint(target, true, question).hint).toBe(expected);
  });

  it("never contradicts the grading frame", () => {
    // "My day was…" would fail a frame that requires "I", so fall back.
    expect(buildSayItStartHint("I *", true, "How was your day yesterday?").hint).toBe("I…");
  });

  it("falls back to the grading frame without a question", () => {
    expect(buildSayItStartHint("I bought *", true).hint).toBe("I bought…");
  });

  it("uses a Spanish label in Spanish mode", () => {
    expect(buildSayItStartHint("I *", true, "What did you buy?").label).toBe("Empieza así:");
    expect(buildSayItStartHint("I *", false, "What did you buy?").label).toBe("Start like this:");
  });
});
