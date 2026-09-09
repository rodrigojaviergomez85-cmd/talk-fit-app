import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Recordings merged into PROGRESS as the "audio" tab.
 * Kept as a permanent redirect so old links / bookmarks keep working.
 */
export const Route = createFileRoute("/recordings")({
  beforeLoad: () => {
    throw redirect({ to: "/progress", search: { tab: "audio" }, replace: true });
  },
  component: () => null,
});
