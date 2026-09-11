# Plan: Hide install CTA when app is already installed

## Problem
On the onboarding flow, the bottom link "📲 Instala la app en tu celular — toca aquí" / "📲 Install the app on your phone — tap here" is shown on the welcome screen and the auth screen. When a learner who already has the PWA installed taps "reiniciar mi viaje" and lands back in onboarding, this CTA is confusing because the app is already on their home screen.

## Goal
Only show the install CTA when the app is **not** currently running as an installed PWA. Keep the standalone `/install` route reachable for learners who want to share the instructions or reinstall later.

## Proposed changes

### 1. Reuse the installed-app detection already used in `/install`
The `/install` route already computes installed state with:

```text
window.matchMedia("(display-mode: standalone)").matches
or
navigator.standalone === true
```

Extract this into a small client-safe helper, e.g. `isInstalledPwa()`, so both `/install` and `/onboarding` can share the same logic without duplicating platform checks.

### 2. Hide the CTA in `/onboarding`
In `src/routes/onboarding.tsx`, render the install link only when `isInstalledPwa()` is false. Because the check reads `window`/`navigator`, gate it behind a hydration-safe pattern (initially `false` during SSR, then read after mount) to avoid mismatches.

### 3. Keep the standalone `/install` route intact
Do not remove `/install` or change its behavior. It remains the place to send people who have not installed the app yet.

### 4. Optional: make the helper reusable for future CTAs
Place the helper in a client-only utilities file so other screens (e.g. future Home prompts) can use it without importing route code.

## Verification
- Open `/onboarding` in a normal browser tab: the install CTA is still visible.
- Open `/onboarding` in a simulated installed PWA context (e.g. Chrome DevTools "Emulate mobile devices" with display-mode standalone, or an already-installed home-screen icon): the install CTA is hidden.
- Run `bun run build:dev` and the test suite; no regressions.
- Confirm the `/install` page still shows the correct state for installed vs. not-installed users.

## Out of scope
- Removing the install CTA from `/install` itself.
- Adding a service worker or changing installability logic.
- Changing the onboarding flow beyond the install link visibility.
