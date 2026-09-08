import { describe, expect, it } from "vitest";
import { countCompleteIdeasLocal } from "./sentence-count-local";

describe("countCompleteIdeasLocal", () => {
  it("counts clear punctuated sentences", () => {
    const r = countCompleteIdeasLocal("I wake up at seven. I eat breakfast. I go to work.");
    expect(r).toEqual({ status: "confident", count: 3, reason: "clauses_classified" });
  });

  it("counts connected clauses with explicit subjects", () => {
    const r = countCompleteIdeasLocal("I wake up at seven and I eat breakfast and then I go to work.");
    expect(r.status).toBe("confident");
    expect(r.status === "confident" && r.count).toBe(3);
  });

  it("accepts beginner grammar mistakes", () => {
    const r = countCompleteIdeasLocal("My sister work from home. She start at seven.");
    expect(r.status).toBe("confident");
    expect(r.status === "confident" && r.count).toBe(2);
  });

  it("accepts beginner future forms", () => {
    const r = countCompleteIdeasLocal("Tomorrow I go to work. I'm going visit my family.");
    expect(r.status).toBe("confident");
    expect(r.status === "confident" && r.count).toBe(2);
  });

  it("counts past narration", () => {
    const r = countCompleteIdeasLocal("Yesterday I went to the mall. I bought shoes. I saw my friend.");
    expect(r.status === "confident" && r.count).toBe(3);
  });

  it("is uncertain about implicit subjects", () => {
    expect(countCompleteIdeasLocal("I wake up and eat breakfast and go to work.").status).toBe("uncertain");
  });

  it("is uncertain about subordinate connectors", () => {
    expect(countCompleteIdeasLocal("I like my job because I work with good people.").status).toBe("uncertain");
  });

  it("is uncertain about false starts", () => {
    expect(countCompleteIdeasLocal("I... um... yesterday... my friend... well... we went...").status).toBe("uncertain");
  });

  it("ignores a single filler", () => {
    const r = countCompleteIdeasLocal("Um... I went to the mall.");
    expect(r.status === "confident" && r.count).toBe(1);
  });

  it("collapses exact repetition", () => {
    const r = countCompleteIdeasLocal("I like pizza. I like pizza. I like pizza.");
    expect(r.status === "confident" && r.count).toBe(1);
  });

  it("returns zero for an empty transcript", () => {
    expect(countCompleteIdeasLocal("")).toEqual({ status: "confident", count: 0, reason: "empty" });
  });

  it("is uncertain for fragments without a known verb", () => {
    expect(countCompleteIdeasLocal("the mall. my friend. shoes.").status).toBe("uncertain");
  });

  it("is deterministic", () => {
    const a = countCompleteIdeasLocal("I eat breakfast. I go to work.");
    const b = countCompleteIdeasLocal("I eat breakfast. I go to work.");
    expect(a).toEqual(b);
  });
});

describe("implicit sentence boundaries (no punctuation)", () => {
  it("counts consecutive ideas without punctuation or connectors", () => {
    expect(countCompleteIdeasLocal("I work at a call center I like my job")).toEqual({
      status: "confident",
      count: 2,
      reason: "clauses_classified",
    });
    expect(
      countCompleteIdeasLocal("My name is Carlos I live in Managua I study English every day"),
    ).toMatchObject({ status: "confident", count: 3 });
  });

  it("stays uncertain when the pronoun may be an object or complement", () => {
    expect(countCompleteIdeasLocal("I told you I will go to the store").status).toBe("uncertain");
  });

  it("keeps single ideas as one", () => {
    expect(countCompleteIdeasLocal("I see you")).toMatchObject({ status: "confident", count: 1 });
  });
});
