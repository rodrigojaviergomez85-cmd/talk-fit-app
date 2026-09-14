import { describe, it } from "vitest";
import { STORYBOOK_SEASONS, currentEpisodeIndex } from "@/services/storybook/seasons";
describe("dbg", () => { it("x", () => {
  console.log(STORYBOOK_SEASONS.map(s => [s.moduleId, s.slots.length]));
}); });
