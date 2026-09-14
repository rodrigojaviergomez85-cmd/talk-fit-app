import { beforeEach, describe, expect, it } from "vitest";
import { isAllowedTtsText, resetTtsAllowlistForTests, ttsAllowlist } from "./tts-allowlist.server";

beforeEach(() => resetTtsAllowlistForTests());

describe("tts allowlist", () => {
  it("allows an authored sentence", async () => {
    const set = await ttsAllowlist();
    const sample = [...set].find((t) => t.split(" ").length > 3);
    expect(sample).toBeTruthy();
    expect(await isAllowedTtsText(sample!)).toBe(true);
  }, 30000);

  it("allows a single word taken from an authored sentence", async () => {
    const set = await ttsAllowlist();
    const sentence = [...set].find((t) => t.split(" ").length > 3)!;
    const word = sentence.split(" ")[0]!.replace(/[^a-z']/g, "");
    expect(await isAllowedTtsText(word)).toBe(true);
  }, 30000);

  it("ignores casing and extra whitespace", async () => {
    const set = await ttsAllowlist();
    const sentence = [...set].find((t) => t.split(" ").length > 3)!;
    const noisy = `  ${sentence.toUpperCase().split(" ").join("   ")}  `;
    expect(await isAllowedTtsText(noisy)).toBe(true);
  }, 30000);

  it("covers the storybook and idiom sources", async () => {
    expect(await isAllowedTtsText("break the ice")).toBe(true);
    // A storybook affirmation every season repeats out loud.
    expect(await isAllowedTtsText("I can do it")).toBe(true);
  }, 30000);

  it("rejects a text nobody authored", async () => {
    expect(await isAllowedTtsText("Please read my entire personal diary out loud now.")).toBe(false);
    expect(await isAllowedTtsText("   ")).toBe(false);
  }, 30000);

  it("builds the set once across repeated calls", async () => {
    const a = await ttsAllowlist();
    const b = await ttsAllowlist();
    await isAllowedTtsText("hello");
    expect(await ttsAllowlist()).toBe(a);
    expect(b).toBe(a);
  }, 30000);
});
