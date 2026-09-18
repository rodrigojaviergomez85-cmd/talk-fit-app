import { describe, expect, it, vi } from "vitest";
import { LiveSessionLifecycle } from "./live-session-lifecycle";

describe("LiveSessionLifecycle", () => {
  it("blocks duplicate starts before the first await", () => {
    const life = new LiveSessionLifecycle();
    const first = life.begin();
    expect(first).not.toBeNull();
    expect(life.begin()).toBeNull();
  });

  it("cancelling while connecting invalidates the attempt", async () => {
    const life = new LiveSessionLifecycle();
    const id = life.begin()!;
    await life.releaseAll();
    expect(life.isCurrent(id)).toBe(false);
    expect(life.busy).toBe(false);
  });

  it("releases a microphone that resolves after the user left", async () => {
    const life = new LiveSessionLifecycle();
    const id = life.begin()!;
    await life.releaseAll(); // learner tapped X while permission was pending
    const stopMic = vi.fn();
    const accepted = life.register(id, stopMic);
    expect(accepted).toBe(false);
    expect(stopMic).toHaveBeenCalledTimes(1);
  });

  it("releases every resource in reverse order on error after the mic opened", async () => {
    const life = new LiveSessionLifecycle();
    const id = life.begin()!;
    const order: string[] = [];
    life.register(id, () => void order.push("audio"));
    life.register(id, () => void order.push("mic"));
    life.register(id, () => void order.push("socket"));
    await life.releaseAll();
    expect(order).toEqual(["socket", "mic", "audio"]);
  });

  it("keeps cleaning up when one release throws", async () => {
    const life = new LiveSessionLifecycle();
    const id = life.begin()!;
    const last = vi.fn();
    life.register(id, last);
    life.register(id, () => {
      throw new Error("close failed");
    });
    await expect(life.releaseAll()).resolves.toBeUndefined();
    expect(last).toHaveBeenCalledTimes(1);
  });

  it("allows starting again after cancelling, with a new identity", async () => {
    const life = new LiveSessionLifecycle();
    const first = life.begin()!;
    await life.releaseAll();
    const second = life.begin();
    expect(second).not.toBeNull();
    expect(second).not.toBe(first);
    expect(life.isCurrent(second!)).toBe(true);
    expect(life.isCurrent(first)).toBe(false);
  });

  it("never releases the same resource twice", async () => {
    const life = new LiveSessionLifecycle();
    const id = life.begin()!;
    const release = vi.fn();
    life.register(id, release);
    await life.releaseAll();
    await life.releaseAll();
    expect(release).toHaveBeenCalledTimes(1);
  });
});
