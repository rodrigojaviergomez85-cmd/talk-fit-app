import { describe, expect, it } from "vitest";

import { REP2_MAX_ATTEMPTS, canRep2Attempt } from "./rep2-attempts";

describe("rep2 attempt cap", () => {
  it("allows exactly 3 recordings per chunk", () => {
    expect(REP2_MAX_ATTEMPTS).toBe(3);
    expect(canRep2Attempt(0)).toBe(true);
    expect(canRep2Attempt(1)).toBe(true);
    expect(canRep2Attempt(2)).toBe(true);
    expect(canRep2Attempt(3)).toBe(false);
    expect(canRep2Attempt(4)).toBe(false);
  });
});
