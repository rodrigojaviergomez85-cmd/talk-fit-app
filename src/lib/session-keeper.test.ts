import { describe, expect, it } from "vitest";
import { isSessionInvalidError } from "./session-keeper";

describe("isSessionInvalidError", () => {
  it("treats network failures as transient", () => {
    expect(isSessionInvalidError({ message: "Failed to fetch" })).toBe(false);
    expect(isSessionInvalidError({ message: "network request timeout" })).toBe(false);
    expect(isSessionInvalidError({ name: "AuthRetryableFetchError", status: 503 })).toBe(false);
    expect(isSessionInvalidError(null)).toBe(false);
    expect(isSessionInvalidError({})).toBe(false);
  });

  it("treats explicit session rejections as invalid", () => {
    expect(isSessionInvalidError({ message: "Invalid Refresh Token: Already Used" })).toBe(true);
    expect(isSessionInvalidError({ message: "Session not found" })).toBe(true);
    expect(isSessionInvalidError({ message: "bad jwt", status: 401 })).toBe(true);
  });
});
