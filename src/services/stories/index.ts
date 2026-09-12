import { LUNA_AND_THE_LOST_PHONE } from "./luna-and-the-lost-phone";
import type { InteractiveStory } from "./types";

export const INTERACTIVE_STORIES: InteractiveStory[] = [LUNA_AND_THE_LOST_PHONE];

export function getInteractiveStory(id: string): InteractiveStory | undefined {
  return INTERACTIVE_STORIES.find((story) => story.id === id);
}

export type { InteractiveStory } from "./types";
