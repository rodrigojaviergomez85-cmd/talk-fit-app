/**
 * Identifier of the currently running build.
 *
 * `__APP_BUILD_ID__` is replaced at build time (see vite.config.ts), so the
 * server bundle and the browser bundle of the same deploy share one value.
 * When a new version is published the browser's copy no longer matches what
 * `/api/public/version` returns, which is how the app notices an update.
 */
declare const __APP_BUILD_ID__: string | undefined;

export const APP_BUILD_ID: string =
  typeof __APP_BUILD_ID__ === "string" ? __APP_BUILD_ID__ : "dev";
