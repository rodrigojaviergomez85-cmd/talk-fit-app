import { describe, expect, it } from "vitest";
import { MODULE_TEASERS } from "@/lib/module-teasers";
import { CourseService } from "@/services/course-service";

describe("MODULE_TEASERS", () => {
  it("covers every curriculum module with ES/EN teasers", () => {
    const modules = CourseService.modules();
    expect(modules).toHaveLength(11);
    for (const m of modules) {
      const teaser = MODULE_TEASERS[m.id];
      expect(teaser, m.id).toBeDefined();
      expect(teaser.es.trim().length).toBeGreaterThan(0);
      expect(teaser.en.trim().length).toBeGreaterThan(0);
    }
  });
});
