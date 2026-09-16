import { avatarSrc } from "@/lib/avatars";
import { cn } from "@/lib/utils";

/** Avatar image when the learner picked one, initials otherwise. */
export function LearnerAvatar({
  avatarId,
  name,
  className,
}: {
  avatarId?: string | null | undefined;
  name?: string | null | undefined;
  className?: string | undefined;
}) {
  const src = avatarSrc(avatarId);
  const initials = (name ?? "").trim().slice(0, 2) || "??";
  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        width={256}
        height={256}
        className={cn("shrink-0 rounded-full object-cover", className)}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-extrabold uppercase",
        className,
      )}
    >
      {initials}
    </span>
  );
}
