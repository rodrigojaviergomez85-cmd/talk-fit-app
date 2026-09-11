/**
 * Natural Method — "Perfecciona Tu Pronunciación" (American Accent Secrets).
 * External YouTube videos; titles and thumbnails come from YouTube itself.
 */

export type PronunciationVideo = {
  id: string;
  /** YouTube video id. */
  videoId: string;
  /** Real YouTube video title. */
  title: string;
  url: string;
  image: string;
  imageAlt: string;
};

const VIDEOS: Array<{ id: string; videoId: string; title: string }> = [
  { id: "r-sound", videoId: "Br__K4cM_C0", title: "R SOUND" },
  { id: "m-n-ng-sounds", videoId: "svNGlM890uU", title: "M, N, NG SOUNDS" },
  { id: "s-sound", videoId: "jcdITk2mQNc", title: "S & Z SOUNDS" },
  { id: "h-sound", videoId: "Z--2nelhngE", title: "H SOUND" },
  { id: "ch-sound", videoId: "sJvm6PToXgs", title: "CH SOUND" },
  { id: "sh-sound", videoId: "a23YI96Kfk8", title: "SH SOUND" },
  { id: "th-sound", videoId: "rDJ9qD1qMaw", title: "TH SOUND" },
  { id: "v-f-sounds", videoId: "9N6UHQ7DYHU", title: "V & F SOUNDS" },
  { id: "e-sound", videoId: "P6vKmv3P6o8", title: "E SOUND" },
  { id: "a-sound", videoId: "TyXOztSaXzg", title: "A SOUND" },
  { id: "u-sound", videoId: "x4QYjIjlYA4", title: "U SOUND" },
  { id: "i-sound", videoId: "z6WjDzWebjs", title: "I SOUND" },
  { id: "w-sound", videoId: "tqbSHZe2T3M", title: "W SOUND" },
  { id: "j-sound", videoId: "K4LUMRYebk4", title: "J SOUND" },
  { id: "l-sound", videoId: "9DLLrH6c_l4", title: "L SOUND" },
  { id: "ed-sound", videoId: "lBckqgOx0LM", title: "ED SOUNDS" },
  { id: "o-sound", videoId: "3BmWJdaiF1I", title: "O SOUND" },
  { id: "y-sound", videoId: "cQsIl5BrwLI", title: "Y SOUND" },
  { id: "final-sounds", videoId: "U7z4nHlOhoA", title: "FINAL SOUNDS" },
  { id: "intonation", videoId: "vBmzowYjak8", title: "INTONATION" },
  { id: "mispronounced-words", videoId: "Bj9dbTBgkh0", title: "MISPRONOUNCED WORDS" },
  { id: "final-tips", videoId: "AM_jPe0Z04I", title: "FINAL TIPS" },
];

export const PRONUNCIATION_VIDEOS: PronunciationVideo[] = VIDEOS.map((v) => ({
  ...v,
  url: `https://youtu.be/${v.videoId}`,
  image: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
  imageAlt: `${v.title} — American Accent Secrets`,
}));
