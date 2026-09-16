import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { checkName, sanitizeName } from "./profile-name";
import { AVATARS, AVATAR_IDS, isAvatarId } from "./avatars";

describe("display name rules", () => {
  it("trims and collapses spaces", () => {
    expect(sanitizeName("  Ana   María  ")).toBe("Ana María");
  });

  it("accepts a normal name", () => {
    expect(checkName(" Rodrigo ")).toEqual({ ok: true, value: "Rodrigo" });
  });

  it("rejects too short, too long, links and offensive words", () => {
    expect(checkName("a")).toEqual({ ok: false, reason: "short" });
    expect(checkName("x".repeat(25))).toEqual({ ok: false, reason: "long" });
    expect(checkName("visita www.algo.co")).toEqual({ ok: false, reason: "blocked" });
    expect(checkName("puta madre")).toEqual({ ok: false, reason: "blocked" });
  });
});

describe("avatar catalogue", () => {
  it("has 20 unique ids", () => {
    expect(AVATARS).toHaveLength(20);
    expect(new Set(AVATAR_IDS).size).toBe(20);
  });

  it("only accepts catalogue ids", () => {
    expect(isAvatarId("a01")).toBe(true);
    expect(isAvatarId("../hack")).toBe(false);
    expect(isAvatarId("a99")).toBe(false);
  });

  it("every id has an image under 60 KB", () => {
    for (const id of AVATAR_IDS) {
      const path = `src/assets/avatars/${id}.jpg`;
      expect(readFileSync(path).length).toBeGreaterThan(0);
      expect(statSync(path).size).toBeLessThan(60 * 1024);
    }
  });
});
