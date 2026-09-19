import { describe, expect, it } from "vitest";
import { buildIcs, daysSince, decidePrompt, type PromptContext } from "./practice-reminders";

const base: PromptContext = {
  promptedAt: null,
  schedule: null,
  gapDays: 0,
  pushSupport: "push",
  permission: "default",
  newDeviceAllowed: true,
};

describe("decidePrompt", () => {
  it("muestra la tarjeta la primera vez", () => {
    expect(decidePrompt(base)).toBe("first");
  });

  it("no la repite si ya se mostró y no hay pausa larga", () => {
    expect(decidePrompt({ ...base, promptedAt: "2026-01-01T00:00:00Z", gapDays: 1 })).toBe("none");
  });

  it("da una segunda oportunidad tras 3 días sin practicar", () => {
    expect(decidePrompt({ ...base, promptedAt: "2026-01-01T00:00:00Z", gapDays: 3 })).toBe(
      "second-chance",
    );
  });

  it("ofrece activar en un teléfono nuevo", () => {
    const schedule = {
      enabled: true,
      timeLocal: "19:00",
      days: [1, 2, 3, 4, 5],
      timezone: "America/El_Salvador",
      channel: "push" as const,
    };
    expect(decidePrompt({ ...base, promptedAt: "2026-01-01T00:00:00Z", schedule })).toBe("new-device");
    expect(
      decidePrompt({ ...base, promptedAt: "2026-01-01T00:00:00Z", schedule, permission: "granted" }),
    ).toBe("none");
    expect(
      decidePrompt({ ...base, promptedAt: "2026-01-01T00:00:00Z", schedule, newDeviceAllowed: false }),
    ).toBe("none");
  });
});

describe("daysSince", () => {
  it("cuenta días naturales", () => {
    expect(daysSince("2026-01-01", "2026-01-04")).toBe(3);
    expect(daysSince("2026-01-04", "2026-01-04")).toBe(0);
    expect(daysSince(null, "2026-01-04")).toBe(Number.POSITIVE_INFINITY);
  });
});

describe("buildIcs", () => {
  it("genera un evento semanal con alarma", () => {
    const ics = buildIcs(
      {
        enabled: true,
        timeLocal: "19:00",
        days: [1, 3, 5],
        timezone: "America/El_Salvador",
        channel: "push",
      },
      "https://example.app",
      "es",
    );
    expect(ics).toContain("RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR");
    expect(ics).toContain("SUMMARY:Fluency App · práctica de hoy");
    expect(ics).toContain("TRIGGER:-PT0M");
    expect(ics).toMatch(/DTSTART;TZID=America\/El_Salvador:\d{8}T190000/);
    expect(ics).toMatch(/DTEND;TZID=America\/El_Salvador:\d{8}T191500/);
  });
});
