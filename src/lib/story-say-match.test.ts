import { describe, expect, it } from "vitest";
import { compareStorySay } from "./story-say-match";

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
});
