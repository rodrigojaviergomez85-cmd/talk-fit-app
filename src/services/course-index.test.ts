import { describe, expect, it } from "vitest";
import { CourseService } from "./course-service";
import { MODULE_INDEX } from "./course-index";
import { outlineOf } from "./course-outline-shape";

/**
 * Guards the lightweight index against drifting from the full course content.
 * If this fails, run: bun scripts/gen-course-outline.ts
 */
describe("course index", () => {
  it("matches the full course content for every module", async () => {
    for (const meta of MODULE_INDEX) {
      const full = await CourseService.loadModule(meta.id);
      expect(full.days.length, meta.id).toBe(meta.days.length);
      expect(full.days.map(outlineOf), meta.id).toEqual(meta.days);
    }
  });

  it("caches loads and dedupes concurrent requests", async () => {
    const [a, b] = await Promise.all([CourseService.loadModule("basic-zero"), CourseService.loadModule("basic-zero")]);
    expect(a).toBe(b);
    expect(CourseService.peekModule("basic-zero")).toBe(a);
  });

  it("rejects unknown module ids without falling back", async () => {
    await expect(CourseService.loadModule("nope" as never)).rejects.toThrow(/Unknown module/);
    expect(() => CourseService.getModule("nope" as never)).toThrow(/Unknown module/);
  });
});
