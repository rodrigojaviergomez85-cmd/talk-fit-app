import { describe, expect, it, beforeEach } from "vitest";
import { localDayKey } from "./practice-attempts";
import { serverDayKey, __setServerDayKey } from "./server-day";

describe("localDayKey", () => {
  it("uses the El Salvador day, not the device day", () => {
    // 2026-09-15T02:30:00Z is still Sep 14 at 20:30 in El Salvador.
    const instant = new Date("2026-09-15T02:30:00Z");
    expect(localDayKey(instant)).toBe("2026-09-14");
  });

  it("returns YYYY-MM-DD", () => {
    expect(localDayKey(new Date("2026-01-05T18:00:00Z"))).toBe("2026-01-05");
  });
});

describe("serverDayKey", () => {
  beforeEach(() => {
    __setServerDayKey(null);
  });

  it("falls back to localDayKey before the server answers", () => {
    expect(serverDayKey()).toBe(localDayKey());
  });

  it("prefers the cached server value", () => {
    __setServerDayKey("2030-04-01");
    expect(serverDayKey()).toBe("2030-04-01");
  });
});
