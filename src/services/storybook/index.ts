import { VALE_FIRST_DAY } from "./vale-first-day";
import { VALE_FIRST_CALL } from "./vale-first-call";
import { VALE_WHO_IS_HE } from "./vale-who-is-he";
import type { StorybookEpisode } from "./types";

export const STORYBOOK_EPISODES: StorybookEpisode[] = [VALE_FIRST_DAY, VALE_FIRST_CALL, VALE_WHO_IS_HE];

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
  getNextEpisodeSlot,
  type Season,
  type SeasonEpisodeSlot,
  type SeasonWeek,
  type NextEpisodeInfo,
} from "./seasons";
