/**
 * Natural Method audiobooks — external story/video links grouped by level.
 * Audio is hosted externally (shared links); the app only lists them.
 */

import tobyTheTurtle from "@/assets/audiobooks/toby-the-turtle.jpg";
import luluTheLadybug from "@/assets/audiobooks/lulu-the-ladybug.jpg";
import bennyTheBunny from "@/assets/audiobooks/benny-the-bunny.jpg";
import theMagicalPencil from "@/assets/audiobooks/the-magical-pencil.jpg";
import theQuietStar from "@/assets/audiobooks/the-quiet-star.jpg";
import nicoTheMouse from "@/assets/audiobooks/nico-the-mouse.jpg";
import leoTheRobot from "@/assets/audiobooks/leo-the-robot.jpg";
import pacoThePenguin from "@/assets/audiobooks/paco-the-penguin.jpg";
import miloTheCat from "@/assets/audiobooks/milo-the-cat.jpg";
import sparkyTheDragon from "@/assets/audiobooks/sparky-the-dragon.jpg";
import theLensOfPeace from "@/assets/audiobooks/the-lens-of-peace.jpg";
import theHeartOfADoctor from "@/assets/audiobooks/the-heart-of-a-doctor.jpg";
import theBlueCrystalDrone from "@/assets/audiobooks/the-blue-crystal-drone.jpg";
import arloAndTheSecretInTheWoods from "@/assets/audiobooks/arlo-and-the-secret-in-the-woods.jpg";
import theYellowCircle from "@/assets/audiobooks/the-yellow-circle.jpg";
import theSecretOfTheGrayWall from "@/assets/audiobooks/the-secret-of-the-gray-wall.jpg";
import theMountainPath from "@/assets/audiobooks/the-mountain-path.jpg";
import theSoulOfTheString from "@/assets/audiobooks/the-soul-of-the-string.jpg";
import theSecretOfTheSilverKey from "@/assets/audiobooks/the-secret-of-the-silver-key.jpg";
import beyondTheBrightScreens from "@/assets/audiobooks/beyond-the-bright-screens.jpg";
import theEssenceOfYesterday from "@/assets/audiobooks/the-essence-of-yesterday.jpg";
import theSeedOfAeon from "@/assets/audiobooks/the-seed-of-aeon.jpg";
import theFlourOfOakhaven from "@/assets/audiobooks/the-flour-of-oakhaven.jpg";
import theWeightOfThePeak from "@/assets/audiobooks/the-weight-of-the-peak.jpg";
import theMidnightLens from "@/assets/audiobooks/the-midnight-lens.jpg";
import theArchitectsSilence from "@/assets/audiobooks/the-architects-silence.jpg";
import theGardenOfTomorrow from "@/assets/audiobooks/the-garden-of-tomorrow.jpg";
import goldInTheCracks from "@/assets/audiobooks/gold-in-the-cracks.jpg";
import theUnwrittenChapter from "@/assets/audiobooks/the-unwritten-chapter.jpg";
import theResonantRoom from "@/assets/audiobooks/the-resonant-room.jpg";
import silasAndTheNeoHunt from "@/assets/audiobooks/silas-and-the-neo-hunt.jpg";
import theSecretOfAquaria from "@/assets/audiobooks/the-secret-of-aquaria.jpg";

export type AudiobookLevel = "basic" | "intermediate" | "advanced";
export type AudiobookGrammar = "simple-present" | "simple-future";

export type NaturalMethodAudiobook = {
  id: string;
  title: string;
  level: AudiobookLevel;
  /** External story/video link, opened in a new tab. */
  url: string;
  image: string;
  imageAlt: string;
  /** Grammar focus shown under the title. Basic stories default to simple present. */
  grammar?: AudiobookGrammar;
};

/** Grammar chip label for a story; every basic story is simple present unless overridden. */
export function audiobookGrammar(book: NaturalMethodAudiobook): AudiobookGrammar | null {
  if (book.grammar) return book.grammar;
  return book.level === "basic" ? "simple-present" : null;
}

export const NATURAL_METHOD_AUDIOBOOKS: NaturalMethodAudiobook[] = [
  {
    id: "toby-the-turtle",
    title: "Toby the Turtle",
    level: "basic",
    url: "https://gemini.google.com/share/7dc298050dd1",
    image: tobyTheTurtle,
    imageAlt: "Toby the Turtle — a friendly green turtle on a sunny path",
  },
  {
    id: "lulu-the-ladybug",
    title: "Lulu the Ladybug",
    level: "basic",
    url: "https://gemini.google.com/share/ef9f15eaa746",
    image: luluTheLadybug,
    imageAlt: "Lulu the Ladybug — a happy red ladybug on a green leaf",
  },
  {
    id: "benny-the-bunny",
    title: "Benny the Bunny",
    level: "basic",
    url: "https://gemini.google.com/share/5e737ee4ab59",
    image: bennyTheBunny,
    imageAlt: "Benny the Bunny — a cheerful white bunny in a garden",
  },
  {
    id: "the-magical-pencil",
    title: "The Magical Pencil",
    level: "basic",
    url: "https://gemini.google.com/share/1beeef38de6e",
    image: theMagicalPencil,
    imageAlt: "The Magical Pencil — a glowing pencil drawing sparkling stars",
  },
  {
    id: "the-quiet-star",
    title: "The Quiet Star",
    level: "basic",
    url: "https://gemini.google.com/share/8b04d85a4123",
    image: theQuietStar,
    imageAlt: "The Quiet Star — a small shy star in the night sky",
  },
  {
    id: "nico-the-mouse",
    title: "Nico the Mouse",
    level: "basic",
    url: "https://gemini.google.com/share/88f60f5ca392",
    image: nicoTheMouse,
    imageAlt: "Nico the Mouse — a tiny gray mouse with a piece of cheese",
  },
  {
    id: "leo-the-robot",
    title: "Leo the Robot",
    level: "basic",
    url: "https://gemini.google.com/share/cae3394debed",
    image: leoTheRobot,
    imageAlt: "Leo the Robot — a small friendly robot with big curious eyes",
  },
  {
    id: "paco-the-penguin",
    title: "Paco the Penguin",
    level: "basic",
    url: "https://gemini.google.com/share/7b13d951c5cb",
    image: pacoThePenguin,
    imageAlt: "Paco the Penguin — a small penguin waddling on ice",
  },
  {
    id: "milo-the-cat",
    title: "Milo the Cat",
    level: "basic",
    url: "https://gemini.google.com/share/ea90296b1f96",
    image: miloTheCat,
    imageAlt: "Milo the Cat — a playful orange tabby cat with a ball of yarn",
  },
  {
    id: "sparky-the-dragon",
    title: "Sparky the Dragon",
    level: "basic",
    url: "https://gemini.google.com/share/0977de459037",
    image: sparkyTheDragon,
    imageAlt: "Sparky the Dragon — a small friendly green baby dragon",
  },
  {
    id: "silas-and-the-neo-hunt",
    title: "Silas and the Neo Hunt",
    level: "basic",
    grammar: "simple-future",
    url: "https://gemini.google.com/share/ta1ICIIK35rY",
    image: silasAndTheNeoHunt,
    imageAlt: "Silas and the Neo Hunt — a boy with a flashlight finding a glowing creature in a night forest",
  },
  {
    id: "the-secret-of-aquaria",
    title: "The Secret of Aquaria",
    level: "basic",
    grammar: "simple-future",
    url: "https://gemini.google.com/share/UPChF44yLUlR",
    image: theSecretOfAquaria,
    imageAlt: "The Secret of Aquaria — a glowing shell treasure in an underwater kingdom with fish",
  },
  {
    id: "the-lens-of-peace",
    title: "The Lens of Peace",
    level: "intermediate",
    url: "https://gemini.google.com/share/469fa995e551",
    image: theLensOfPeace,
    imageAlt: "The Lens of Peace — a camera lens catching golden light",
  },
  {
    id: "the-heart-of-a-doctor",
    title: "The Heart of a Doctor",
    level: "intermediate",
    url: "https://gemini.google.com/share/eef5bf6ce746",
    image: theHeartOfADoctor,
    imageAlt: "The Heart of a Doctor — a kind doctor with a stethoscope",
  },
  {
    id: "the-blue-crystal-drone",
    title: "The Blue Crystal Drone",
    level: "intermediate",
    url: "https://gemini.google.com/share/10631498bde2",
    image: theBlueCrystalDrone,
    imageAlt: "The Blue Crystal Drone — a drone carrying a glowing blue crystal over a forest",
  },
  {
    id: "arlo-and-the-secret-in-the-woods",
    title: "Arlo and the Secret in the Woods",
    level: "intermediate",
    url: "https://gemini.google.com/share/12884d76ae06",
    image: arloAndTheSecretInTheWoods,
    imageAlt: "Arlo and the Secret in the Woods — a boy with a flashlight in a dark forest",
  },
  {
    id: "the-yellow-circle",
    title: "The Yellow Circle",
    level: "intermediate",
    url: "https://gemini.google.com/share/56a722d93f59",
    image: theYellowCircle,
    imageAlt: "The Yellow Circle — a glowing yellow circle painted on a stone wall",
  },
  {
    id: "the-secret-of-the-gray-wall",
    title: "The Secret of the Gray Wall",
    level: "intermediate",
    url: "https://gemini.google.com/share/1c5bba2dfd78",
    image: theSecretOfTheGrayWall,
    imageAlt: "The Secret of the Gray Wall — a hidden door in a gray wall with warm light",
  },
  {
    id: "the-mountain-path",
    title: "The Mountain Path",
    level: "intermediate",
    url: "https://gemini.google.com/share/fbd9c90157df",
    image: theMountainPath,
    imageAlt: "The Mountain Path — a winding path leading to sunlit peaks",
  },
  {
    id: "the-soul-of-the-string",
    title: "The Soul of the String",
    level: "intermediate",
    url: "https://gemini.google.com/share/7f21bd52bab4",
    image: theSoulOfTheString,
    imageAlt: "The Soul of the String — a violin with glowing strings and music notes",
  },
  {
    id: "the-secret-of-the-silver-key",
    title: "The Secret of the Silver Key",
    level: "intermediate",
    url: "https://gemini.google.com/share/0a66526c3f7f",
    image: theSecretOfTheSilverKey,
    imageAlt: "The Secret of the Silver Key — an ornate silver key beside a locked box",
  },
  {
    id: "beyond-the-bright-screens",
    title: "Beyond the Bright Screens",
    level: "intermediate",
    url: "https://gemini.google.com/share/a08a6850a020",
    image: beyondTheBrightScreens,
    imageAlt: "Beyond the Bright Screens — a person turning from screens toward a bright window",
  },
  {
    id: "the-essence-of-yesterday",
    title: "The Essence of Yesterday",
    level: "advanced",
    url: "https://gemini.google.com/share/0dedb439a19a",
    image: theEssenceOfYesterday,
    imageAlt: "The Essence of Yesterday — a child holding a faded photograph in golden light",
  },
  {
    id: "the-seed-of-aeon",
    title: "The Seed of Aeon",
    level: "advanced",
    url: "https://gemini.google.com/share/e772bb4efeeb",
    image: theSeedOfAeon,
    imageAlt: "The Seed of Aeon — a glowing magical seed sprouting under a starry sky",
  },
  {
    id: "the-flour-of-oakhaven",
    title: "The Flour of Oakhaven",
    level: "advanced",
    url: "https://gemini.google.com/share/d4eb03ac7f4d",
    image: theFlourOfOakhaven,
    imageAlt: "The Flour of Oakhaven — a village bakery at dawn with sacks of flour",
  },
  {
    id: "the-weight-of-the-peak",
    title: "The Weight of the Peak",
    level: "advanced",
    url: "https://gemini.google.com/share/3dc6d304d6b2",
    image: theWeightOfThePeak,
    imageAlt: "The Weight of the Peak — a small climber before a massive snowy mountain",
  },
  {
    id: "the-midnight-lens",
    title: "The Midnight Lens",
    level: "advanced",
    url: "https://gemini.google.com/share/477162aca750",
    image: theMidnightLens,
    imageAlt: "The Midnight Lens — a brass telescope under a starry midnight sky",
  },
  {
    id: "the-architects-silence",
    title: "The Architect's Silence",
    level: "advanced",
    url: "https://gemini.google.com/share/6feab4410835",
    image: theArchitectsSilence,
    imageAlt: "The Architect's Silence — blueprints and a building model in a quiet studio",
  },
  {
    id: "the-garden-of-tomorrow",
    title: "The Garden of Tomorrow",
    level: "advanced",
    url: "https://gemini.google.com/share/55bccb8b785c",
    image: theGardenOfTomorrow,
    imageAlt: "The Garden of Tomorrow — a lush garden with a glowing glass dome",
  },
  {
    id: "gold-in-the-cracks",
    title: "Gold in the Cracks",
    level: "advanced",
    url: "https://gemini.google.com/share/0eeb40618df2",
    image: goldInTheCracks,
    imageAlt: "Gold in the Cracks — a ceramic bowl repaired with glowing golden seams",
  },
  {
    id: "the-unwritten-chapter",
    title: "The Unwritten Chapter",
    level: "advanced",
    url: "https://gemini.google.com/share/709a8dda593b",
    image: theUnwrittenChapter,
    imageAlt: "The Unwritten Chapter — an open blank book with light rising from its pages",
  },
  {
    id: "the-resonant-room",
    title: "The Resonant Room",
    level: "advanced",
    url: "https://gemini.google.com/share/1589e6eb918f",
    image: theResonantRoom,
    imageAlt: "The Resonant Room — a child playing guitar surrounded by glowing sound waves",
  },
];
