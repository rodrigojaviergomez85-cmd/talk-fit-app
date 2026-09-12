import { VALE_FIRST_DAY } from "./vale-first-day";
import { VALE_FIRST_CALL } from "./vale-first-call";
import { VALE_WHO_IS_HE } from "./vale-who-is-he";
import { VALE_WHO_IS_D } from "./vale-who-is-d";
import { VALE_SUPPORT_TEAM } from "./vale-support-team";
import { VALE_WHERE_ARE_YOU_FROM } from "./vale-where-are-you-from";
import { VALE_FAVORITE_COLOR } from "./vale-favorite-color";
import { VALE_FAVORITE_FOOD } from "./vale-favorite-food";
import { VALE_HOBBIES } from "./vale-hobbies";
import { VALE_COMPLETE_INTRODUCTION } from "./vale-complete-introduction";
import { VALE_MEET_LUIS } from "./vale-meet-luis";
import { VALE_BEST_FRIEND } from "./vale-best-friend";
import { VALE_NEW_SUPERVISOR } from "./vale-new-supervisor";
import { VALE_DYLAN_NEEDS_HELP } from "./vale-dylan-needs-help";
import { VALE_WE_ARE_A_TEAM } from "./vale-we-are-a-team";
import { VALE_LUIS_BIG_DAY } from "./vale-luis-big-day";
import { VALE_GOOD_NEWS } from "./vale-good-news";
import { VALE_FIRST_MONTH } from "./vale-first-month";
import { VALE_CELEBRATION } from "./vale-celebration";
import { VALE_GRADUATION } from "./vale-graduation";
import { VALE_S2_READY } from "./vale-s2-ready";
import { VALE_S2_TOMORROW } from "./vale-s2-tomorrow";
import { VALE_S2_WEEKEND } from "./vale-s2-weekend";
import { VALE_S2_BIGGER_DREAM } from "./vale-s2-bigger-dream";
import { VALE_S2_MY_VOICE } from "./vale-s2-my-voice";
import type { StorybookEpisode } from "./types";

export const STORYBOOK_EPISODES: StorybookEpisode[] = [
  VALE_FIRST_DAY,
  VALE_FIRST_CALL,
  VALE_WHO_IS_HE,
  VALE_WHO_IS_D,
  VALE_SUPPORT_TEAM,
  VALE_WHERE_ARE_YOU_FROM,
  VALE_FAVORITE_COLOR,
  VALE_FAVORITE_FOOD,
  VALE_HOBBIES,
  VALE_COMPLETE_INTRODUCTION,
  VALE_MEET_LUIS,
  VALE_BEST_FRIEND,
  VALE_NEW_SUPERVISOR,
  VALE_DYLAN_NEEDS_HELP,
  VALE_WE_ARE_A_TEAM,
  VALE_LUIS_BIG_DAY,
  VALE_GOOD_NEWS,
  VALE_FIRST_MONTH,
  VALE_CELEBRATION,
  VALE_GRADUATION,
  VALE_S2_READY,
  VALE_S2_TOMORROW,
  VALE_S2_WEEKEND,
  VALE_S2_BIGGER_DREAM,
  VALE_S2_MY_VOICE,
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
