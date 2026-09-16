import a01 from "@/assets/avatars/a01.jpg";
import a02 from "@/assets/avatars/a02.jpg";
import a03 from "@/assets/avatars/a03.jpg";
import a04 from "@/assets/avatars/a04.jpg";
import a05 from "@/assets/avatars/a05.jpg";
import a06 from "@/assets/avatars/a06.jpg";
import a07 from "@/assets/avatars/a07.jpg";
import a08 from "@/assets/avatars/a08.jpg";
import a09 from "@/assets/avatars/a09.jpg";
import a10 from "@/assets/avatars/a10.jpg";
import a11 from "@/assets/avatars/a11.jpg";
import a12 from "@/assets/avatars/a12.jpg";
import a13 from "@/assets/avatars/a13.jpg";
import a14 from "@/assets/avatars/a14.jpg";
import a15 from "@/assets/avatars/a15.jpg";
import a16 from "@/assets/avatars/a16.jpg";
import a17 from "@/assets/avatars/a17.jpg";
import a18 from "@/assets/avatars/a18.jpg";
import a19 from "@/assets/avatars/a19.jpg";
import a20 from "@/assets/avatars/a20.jpg";

export type AvatarOption = { id: string; src: string };

/** The only avatars a learner may pick. Server validates against these ids. */
export const AVATARS: AvatarOption[] = [
  { id: "a01", src: a01 },
  { id: "a02", src: a02 },
  { id: "a03", src: a03 },
  { id: "a04", src: a04 },
  { id: "a05", src: a05 },
  { id: "a06", src: a06 },
  { id: "a07", src: a07 },
  { id: "a08", src: a08 },
  { id: "a09", src: a09 },
  { id: "a10", src: a10 },
  { id: "a11", src: a11 },
  { id: "a12", src: a12 },
  { id: "a13", src: a13 },
  { id: "a14", src: a14 },
  { id: "a15", src: a15 },
  { id: "a16", src: a16 },
  { id: "a17", src: a17 },
  { id: "a18", src: a18 },
  { id: "a19", src: a19 },
  { id: "a20", src: a20 },
];

export const AVATAR_IDS: readonly string[] = AVATARS.map((a) => a.id);

export function isAvatarId(value: unknown): value is string {
  return typeof value === "string" && AVATAR_IDS.includes(value);
}

export function avatarSrc(id: string | null | undefined): string | null {
  if (!id) return null;
  return AVATARS.find((a) => a.id === id)?.src ?? null;
}
