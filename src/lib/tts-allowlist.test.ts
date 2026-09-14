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
    expect(await isAllowedTtsText("I can do it.")).toBe(true);
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

describe("tts allowlist — review, interviews and speak-time variants", () => {
  it("allows the model line and a Power Chunk from a review practice", async () => {
    const { listReviewModules, reviewPracticeToCourseDay } = await import("@/services/review/review-registry");
    const { daySpecs } = await import("@/lib/course-audio-inventory");
    const module = listReviewModules()[0]!;
    const practice = module.practices[0]!;
    const specs = daySpecs(module.id as never, reviewPracticeToCourseDay(practice));
    const model = specs.find((s) => s.source.endsWith("/rep1"))!;
    expect(await isAllowedTtsText(model.text)).toBe(true);
    const power = specs.find((s) => s.source.endsWith("/power")) ?? specs.find((s) => s.source.endsWith("/rep2"))!;
    expect(await isAllowedTtsText(power.text)).toBe(true);
  }, 30000);

  it("allows a prompt from each interview simulator", async () => {
    const { BASIC_INTERVIEW_PROMPTS, INTERMEDIATE_INTERVIEW_PROMPTS, ADVANCED_INTERVIEW_PROMPTS } = await import(
      "@/services/interview-prompts"
    );
    expect(await isAllowedTtsText(BASIC_INTERVIEW_PROMPTS[1]!.en)).toBe(true);
    expect(await isAllowedTtsText(INTERMEDIATE_INTERVIEW_PROMPTS[4]!.en)).toBe(true);
    expect(await isAllowedTtsText(ADVANCED_INTERVIEW_PROMPTS[10]!.en)).toBe(true);
  }, 30000);

  it("stores the ', ' variant of any ' / ' text the pager would speak", async () => {
    const set = await ttsAllowlist();
    const withSlash = [...set].filter((t) => t.includes(" / "));
    for (const text of withSlash) expect(set.has(text.replaceAll(" / ", ", "))).toBe(true);
    // Authored English currently has no " / "; the guard stays for new content.
    expect(await isAllowedTtsText("break the ice")).toBe(true);
  }, 30000);

  it("allows a word cleaned the Rep2Feedback way", async () => {
    const set = await ttsAllowlist();
    const sentence = [...set].find((t) => t.includes(",") && t.split(" ").length > 4)!;
    const word = sentence.split(/\s+/)[1]!.replace(/^[^\p{L}\p{N}'-]+/gu, "").replace(/[^\p{L}\p{N}'-]+$/gu, "");
    expect(word).toBeTruthy();
    expect(await isAllowedTtsText(word)).toBe(true);
  }, 30000);
});
