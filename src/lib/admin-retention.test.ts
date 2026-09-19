import { describe, expect, it } from "vitest";
import { cellIntensity, northStarPct, windowPct } from "./admin-retention";

describe("admin retention helpers", () => {
  it("windowPct returns null when the window has not closed", () => {
    expect(windowPct({ eligible: 0, returned: null })).toBeNull();
    expect(windowPct(undefined)).toBeNull();
  });

  it("windowPct rounds to one decimal", () => {
    expect(windowPct({ eligible: 3, returned: 1 })).toBe(33.3);
    expect(windowPct({ eligible: 4, returned: 4 })).toBe(100);
  });

  it("northStarPct guards a zero base", () => {
    expect(northStarPct(0, 0)).toBeNull();
    expect(northStarPct(25, 100)).toBe(25);
  });

  it("cellIntensity grows with the percentage", () => {
    expect(cellIntensity(null)).toBe(0);
    expect(cellIntensity(0)).toBeLessThan(cellIntensity(50));
    expect(cellIntensity(50)).toBeLessThan(cellIntensity(100));
    expect(cellIntensity(100)).toBeLessThanOrEqual(1);
  });
});
