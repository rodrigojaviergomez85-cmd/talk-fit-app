import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  acquireActivityLock,
  isActivityBusy,
  resetActivityLocks,
  subscribeActivity,
} from "./activity-lock";

describe("activity lock", () => {
  beforeEach(() => resetActivityLocks());

  it("is free by default", () => {
    expect(isActivityBusy()).toBe(false);
  });

  it("stays busy until every holder releases", () => {
    const a = acquireActivityLock();
    const b = acquireActivityLock();
    expect(isActivityBusy()).toBe(true);
    a();
    expect(isActivityBusy()).toBe(true);
    b();
    expect(isActivityBusy()).toBe(false);
  });

  it("ignores a double release", () => {
    const release = acquireActivityLock();
    release();
    release();
    expect(isActivityBusy()).toBe(false);
  });

  it("tells listeners when the learner is free again", () => {
    const seen = vi.fn();
    const stop = subscribeActivity(seen);
    const release = acquireActivityLock();
    release();
    expect(seen).toHaveBeenCalledWith(true);
    expect(seen).toHaveBeenLastCalledWith(false);
    stop();
  });
});
