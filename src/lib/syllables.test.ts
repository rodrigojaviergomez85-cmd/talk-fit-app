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

  it("keeps phrasal verbs and idioms as single tappable units", () => {
    const tokens = tokenizeWordsForDisplay(
      "Executives back out, but the bottom line matters.",
      ["back out", "the bottom line"],
    );

    expect(tokens.filter((token) => token.isExpression)).toEqual([
      { value: "back out", isWord: true, isExpression: true, suffix: "," },
      { value: "the bottom line", isWord: true, isExpression: true },
    ]);
    expect(tokens.some((token) => token.value === "back")).toBe(false);
    expect(tokens.some((token) => token.value === "out")).toBe(false);
  });

  it("matches expression variants without changing case or punctuation", () => {
    const text = "Either way, you Showed Up. They did not back out.";
    const tokens = tokenizeWordsForDisplay(text, ["showed up", "back out"]);
    const rebuilt = tokens.map((token) => `${token.value}${token.suffix ?? ""}`).join("");

    expect(rebuilt).toBe(text);
    expect(tokens.filter((token) => token.isExpression).map((token) => token.value)).toEqual([
      "Showed Up",
      "back out",
    ]);
  });
});