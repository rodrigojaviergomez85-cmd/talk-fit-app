import { beforeEach, describe, expect, it, vi } from "vitest";

const toastError = vi.fn();
vi.mock("sonner", () => ({ toast: { error: (...args: unknown[]) => toastError(...args) } }));

import { notifyIfClockMismatch } from "./clock-mismatch";

describe("notifyIfClockMismatch", () => {
  beforeEach(() => toastError.mockClear());

  it("shows exactly one toast when the server rejects the device date", () => {
    const shown = notifyIfClockMismatch(
      'INVALID_LOCAL_DAY_KEY: 2030-01-01 is not within one day of the server date',
    );
    expect(shown).toBe(true);
    expect(toastError).toHaveBeenCalledTimes(1);
    const [title, opts] = toastError.mock.calls[0] as [string, { description: string }];
    expect(title).toBe("La fecha de tu teléfono no coincide");
    expect(opts.description).toBe(
      "Activá la fecha y hora automáticas en tu teléfono y volvé a intentar.",
    );
  });

  it("stays silent for every other write error", () => {
    expect(notifyIfClockMismatch("DAILY_PRACTICE_CAP: max 5 practice sessions")).toBe(false);
    expect(notifyIfClockMismatch("network error")).toBe(false);
    expect(notifyIfClockMismatch(null)).toBe(false);
    expect(notifyIfClockMismatch(undefined)).toBe(false);
    expect(toastError).not.toHaveBeenCalled();
  });
});
