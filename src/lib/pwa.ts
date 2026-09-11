import { useEffect, useState } from "react";

/**
 * True when the page is running as an installed PWA:
 * - Chrome/Android/Edge: display-mode: standalone
 * - iOS Safari: navigator.standalone
 *
 * Safe to call during SSR/hydration because it guards `window`.
 */
export function isInstalledPwa(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/** Hydration-safe hook version. Returns `false` on first render, then the real value after mount. */
export function useIsInstalledPwa(): boolean {
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    setInstalled(isInstalledPwa());
  }, []);
  return installed;
}
