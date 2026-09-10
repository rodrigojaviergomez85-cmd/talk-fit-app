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

export type AudiobookLevel = "basic" | "intermediate";

export type NaturalMethodAudiobook = {
  id: string;
  title: string;
  level: AudiobookLevel;
  /** External story/video link, opened in a new tab. */
  url: string;
  image: string;
  imageAlt: string;
};

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
];
