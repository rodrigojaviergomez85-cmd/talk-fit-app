ALTER TABLE public.user_preferences
  ADD COLUMN IF NOT EXISTS current_module_id text,
  ADD COLUMN IF NOT EXISTS initial_placement_module_id text,
  ADD COLUMN IF NOT EXISTS placement_source text,
  ADD COLUMN IF NOT EXISTS placement_selected_at timestamptz,
  ADD COLUMN IF NOT EXISTS placement_changed_at timestamptz,
  ADD COLUMN IF NOT EXISTS placement_change_count integer NOT NULL DEFAULT 0;

-- One-time backfill for existing learners: current module = module of most recent activity.
WITH activity AS (
  SELECT user_id, module_id, completed_at AS at FROM public.day_progress
  UNION ALL
  SELECT user_id, module_id, updated_at AS at FROM public.practice_sessions
),
latest AS (
  SELECT DISTINCT ON (user_id) user_id, module_id
  FROM activity
  ORDER BY user_id, at DESC
)
INSERT INTO public.user_preferences (user_id, current_module_id)
SELECT user_id, module_id FROM latest
ON CONFLICT (user_id) DO UPDATE
  SET current_module_id = COALESCE(public.user_preferences.current_module_id, EXCLUDED.current_module_id);