# Plan: Vector-cartoon Vale coach avatar with smooth mouth animation

## Goal
Replace the current photo-realistic mouth-overlay avatar in the AI Coach with a clean, illustrated vector-style Vale character. The mouth should move smoothly and naturally with the coach's voice, avoiding uncanny cuts and keeping the component lightweight on mid-range phones.

## Deliverables
1. **Avatar assets**
   - One stable base portrait of Vale in a friendly, simple illustrated style (warm flat colors, clean lines, optimized WebP/PNG at 512x512).
   - Four separate mouth shapes (closed, small, medium, open) as transparent PNG/WebP overlays designed to fit the base portrait.
   - Optional: two blink frames and one thinking-expression overlay for idle/thinking states.
   - All assets optimized to stay under ~40 KB each for fast mobile load.

2. **Component update: `src/components/fluency/CoachAvatar.tsx`**
   - Render the base portrait as a fixed image.
   - Layer mouth shapes using absolute positioning over the same mouth region.
   - Drive mouth selection by the existing audio `level` prop using thresholds and a brief hold to prevent flicker.
   - Preserve idle, listening, thinking, and speaking states.
   - Keep `prefers-reduced-motion` support and a subtle listening ring/thinking pulse.

3. **No logic changes to `LiveCoach.tsx`**
   - Continue passing the audio level from the existing `AnalyserNode` output.
   - Coach state transitions (idle/listening/thinking/speaking) remain unchanged.

4. **Verification**
   - TypeScript check passes.
   - App route `/ai-coach` loads without errors.
   - Authenticated preview check confirms the avatar renders and mouth frames switch smoothly during simulated speech.
   - Visual check on a 440x807 mobile viewport.

## Out of scope
- Changing the Gemini Live integration, session limits, or billing logic.
- Adding full body animation, video, or 3D.
- Generating a full comic strip or background scenes.

## Approval needed
- Confirm the illustrated style direction (simple flat vector, friendly teacher look, warm palette matching Fluency Reps brand) before generating artwork.