import { describe, expect, it } from "vitest";
import { tokenizeWordsForDisplay } from "./syllables";

describe("tokenizeWordsForDisplay", () => {
  it("keeps sentence punctuation with the preceding word", () => {
    const tokens = tokenizeWordsForDisplay("The team claps. One surprise!");

    expect(tokens.filter((token) => token.isWord)).toEqual([
      { value: "The", isWord: true },
      { value: "team", isWord: true },
      { value: "claps", isWord: true, suffix: "." },
      { value: "One", isWord: true },
      { value: "surprise", isWord: true, suffix: "!" },
    ]);
  });

  it("keeps closing punctuation and quotes together", () => {
    const tokens = tokenizeWordsForDisplay('"You are awesome, Vale!" says Kat.');

    expect(tokens.find((token) => token.value === "awesome")?.suffix).toBe(",");
    expect(tokens.find((token) => token.value === "Vale")?.suffix).toBe('!"');
    expect(tokens.find((token) => token.value === "Kat")?.suffix).toBe(".");
  });

  it("preserves opening punctuation and spaces", () => {
    const text = "(Are you ready?) Yes.";
    const rebuilt = tokenizeWordsForDisplay(text)
      .map((token) => `${token.value}${token.suffix ?? ""}`)
      .join("");

    expect(rebuilt).toBe(text);
  });
});