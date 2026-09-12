import { VALE_FIRST_DAY } from "./vale-first-day";
import { VALE_FIRST_CALL } from "./vale-first-call";
import type { StorybookEpisode } from "./types";

export const STORYBOOK_EPISODES: StorybookEpisode[] = [VALE_FIRST_DAY, VALE_FIRST_CALL];

export function getStorybookEpisode(id: string): StorybookEpisode | undefined {
  return STORYBOOK_EPISODES.find((episode) => episode.id === id);
}

export type { StorybookEpisode } from "./types";
export {
  STORYBOOK_SEASONS,
  getSeason,
  completedDaysInModule,
  unlockedWeek,
  unlockedDay,
  isDayUnlocked,
  type Season,
  type SeasonEpisodeSlot,
  type SeasonWeek,
} from "./seasons";
