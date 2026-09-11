/**
 * Natural Method — "Perfecciona Tu Pronunciación" (American Accent Secrets).
 * External YouTube videos; the app only lists them and opens them in a new tab.
 */

import rSound from "@/assets/pronunciation/r-sound.jpg";
import mnngSounds from "@/assets/pronunciation/m-n-ng-sounds.jpg";
import sSound from "@/assets/pronunciation/s-sound.jpg";
import hSound from "@/assets/pronunciation/h-sound.jpg";
import chSound from "@/assets/pronunciation/ch-sound.jpg";
import shSound from "@/assets/pronunciation/sh-sound.jpg";
import thSound from "@/assets/pronunciation/th-sound.jpg";
import vfSounds from "@/assets/pronunciation/v-f-sounds.jpg";
import eSound from "@/assets/pronunciation/e-sound.jpg";
import aSound from "@/assets/pronunciation/a-sound.jpg";
import uSound from "@/assets/pronunciation/u-sound.jpg";
import iSound from "@/assets/pronunciation/i-sound.jpg";
import wSound from "@/assets/pronunciation/w-sound.jpg";
import jSound from "@/assets/pronunciation/j-sound.jpg";
import lSound from "@/assets/pronunciation/l-sound.jpg";
import edSound from "@/assets/pronunciation/ed-sound.jpg";
import oSound from "@/assets/pronunciation/o-sound.jpg";
import ySound from "@/assets/pronunciation/y-sound.jpg";
import finalSounds from "@/assets/pronunciation/final-sounds.jpg";
import intonation from "@/assets/pronunciation/intonation.jpg";
import mispronouncedWords from "@/assets/pronunciation/mispronounced-words.jpg";
import finalTips from "@/assets/pronunciation/final-tips.jpg";

export type PronunciationVideo = {
  id: string;
  /** Display title, e.g. "R Sound". */
  title: string;
  url: string;
  image: string;
  imageAlt: string;
};

export const PRONUNCIATION_VIDEOS: PronunciationVideo[] = [
  {
    id: "r-sound",
    title: "R Sound",
    url: "https://youtu.be/Br__K4cM_C0",
    image: rSound,
    imageAlt: "R Sound — mouth profile pronouncing the American R",
  },
  {
    id: "m-n-ng-sounds",
    title: "M, N, NG Sounds",
    url: "https://youtu.be/svNGlM890uU",
    image: mnngSounds,
    imageAlt: "M, N, NG Sounds — nasal consonant mouth positions",
  },
  {
    id: "s-sound",
    title: "S Sound",
    url: "https://youtu.be/jcdITk2mQNc",
    image: sSound,
    imageAlt: "S Sound — hissing S sound waves",
  },
  {
    id: "h-sound",
    title: "H Sound",
    url: "https://youtu.be/Z--2nelhngE",
    image: hSound,
    imageAlt: "H Sound — soft breath for the H sound",
  },
  {
    id: "ch-sound",
    title: "CH Sound",
    url: "https://youtu.be/sJvm6PToXgs",
    image: chSound,
    imageAlt: "CH Sound — mouth pronouncing CH",
  },
  {
    id: "sh-sound",
    title: "SH Sound",
    url: "https://youtu.be/a23YI96Kfk8",
    image: shSound,
    imageAlt: "SH Sound — quiet SH gesture",
  },
  {
    id: "th-sound",
    title: "TH Sound",
    url: "https://youtu.be/rDJ9qD1qMaw",
    image: thSound,
    imageAlt: "TH Sound — tongue between teeth for TH",
  },
  {
    id: "v-f-sounds",
    title: "V y F Sounds",
    url: "https://youtu.be/9N6UHQ7DYHU",
    image: vfSounds,
    imageAlt: "V and F Sounds — lip and teeth positions",
  },
  {
    id: "e-sound",
    title: "E Sound",
    url: "https://youtu.be/P6vKmv3P6o8",
    image: eSound,
    imageAlt: "E Sound — smiling E vowel",
  },
  {
    id: "a-sound",
    title: "A Sound",
    url: "https://youtu.be/TyXOztSaXzg",
    image: aSound,
    imageAlt: "A Sound — open A vowel",
  },
  {
    id: "u-sound",
    title: "U Sound",
    url: "https://youtu.be/x4QYjIjlYA4",
    image: uSound,
    imageAlt: "U Sound — rounded lips for the U vowel",
  },
  {
    id: "i-sound",
    title: "I Sound",
    url: "https://youtu.be/z6WjDzWebjs",
    image: iSound,
    imageAlt: "I Sound — relaxed I vowel",
  },
  {
    id: "w-sound",
    title: "W Sound",
    url: "https://youtu.be/tqbSHZe2T3M",
    image: wSound,
    imageAlt: "W Sound — rounded lips gliding into W",
  },
  {
    id: "j-sound",
    title: "J Sound",
    url: "https://youtu.be/K4LUMRYebk4",
    image: jSound,
    imageAlt: "J Sound — mouth pronouncing the J sound",
  },
  {
    id: "l-sound",
    title: "L Sound",
    url: "https://youtu.be/9DLLrH6c_l4",
    image: lSound,
    imageAlt: "L Sound — tongue up for the L sound",
  },
  {
    id: "ed-sound",
    title: "ED Sound",
    url: "https://youtu.be/teEXXsM5GL8",
    image: edSound,
    imageAlt: "ED Sound — past tense -ED endings",
  },
  {
    id: "o-sound",
    title: "O Sound",
    url: "https://youtu.be/3BmWJdaiF1I",
    image: oSound,
    imageAlt: "O Sound — round O vowel",
  },
  {
    id: "y-sound",
    title: "Y Sound",
    url: "https://youtu.be/cQsIl5BrwLI",
    image: ySound,
    imageAlt: "Y Sound — the Y glide",
  },
  {
    id: "final-sounds",
    title: "Final Sounds",
    url: "https://youtu.be/U7z4nHlOhoA",
    image: finalSounds,
    imageAlt: "Final Sounds — finishing word endings clearly",
  },
  {
    id: "intonation",
    title: "Intonation",
    url: "https://youtu.be/vBmzowYjak8",
    image: intonation,
    imageAlt: "Intonation — rising and falling melody of English",
  },
  {
    id: "mispronounced-words",
    title: "Mispronounced Words",
    url: "https://youtu.be/Bj9dbTBgkh0",
    image: mispronouncedWords,
    imageAlt: "Mispronounced Words — commonly mispronounced English words",
  },
  {
    id: "final-tips",
    title: "Final Tips",
    url: "https://youtu.be/AM_jPe0Z04I",
    image: finalTips,
    imageAlt: "Final Tips — last tips to perfect the American accent",
  },
];
