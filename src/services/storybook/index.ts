import { VALE_FIRST_DAY } from "./vale-first-day";
import { VALE_FIRST_CALL } from "./vale-first-call";
import { VALE_WHO_IS_HE } from "./vale-who-is-he";
import { VALE_WHO_IS_D } from "./vale-who-is-d";
import { VALE_SUPPORT_TEAM } from "./vale-support-team";
import { VALE_WHERE_ARE_YOU_FROM } from "./vale-where-are-you-from";
import { VALE_FAVORITE_COLOR } from "./vale-favorite-color";
import type { StorybookEpisode } from "./types";

export const STORYBOOK_EPISODES: StorybookEpisode[] = [
  VALE_FIRST_DAY,
  VALE_FIRST_CALL,
  VALE_WHO_IS_HE,
  VALE_WHO_IS_D,
  VALE_SUPPORT_TEAM,
  VALE_WHERE_ARE_YOU_FROM,
  VALE_FAVORITE_COLOR,
];

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
