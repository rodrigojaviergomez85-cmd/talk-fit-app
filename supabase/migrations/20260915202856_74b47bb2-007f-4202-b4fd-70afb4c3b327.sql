CREATE TABLE public.story_episode_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  episode_id text NOT NULL,
  season smallint,
  episode_number smallint,
  first_opened_at timestamptz NOT NULL DEFAULT now(),
  last_opened_at timestamptz NOT NULL DEFAULT now(),
  scenes_reached integer NOT NULL DEFAULT 0,
  max_scene_index integer NOT NULL DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, episode_id)
);

GRANT SELECT, INSERT, UPDATE ON public.story_episode_views TO authenticated;
GRANT ALL ON public.story_episode_views TO service_role;

ALTER TABLE public.story_episode_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own story views"
  ON public.story_episode_views FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own story views"
  ON public.story_episode_views FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own story views"
  ON public.story_episode_views FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_story_views_last_opened ON public.story_episode_views (last_opened_at DESC);
CREATE INDEX idx_story_views_episode ON public.story_episode_views (episode_id);

CREATE TRIGGER story_episode_views_set_updated_at
  BEFORE UPDATE ON public.story_episode_views
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.admin_story_metrics()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _today date := (now() AT TIME ZONE 'America/El_Salvador')::date;
  _result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  SELECT jsonb_build_object(
    'readers_today', (
      SELECT count(DISTINCT user_id) FROM public.story_episode_views
      WHERE (last_opened_at AT TIME ZONE 'America/El_Salvador')::date = _today
    ),
    'readers_7d', (
      SELECT count(DISTINCT user_id) FROM public.story_episode_views
      WHERE last_opened_at >= now() - interval '7 days'
    ),
    'readers_30d', (
      SELECT count(DISTINCT user_id) FROM public.story_episode_views
      WHERE last_opened_at >= now() - interval '30 days'
    ),
    'readers_total', (SELECT count(DISTINCT user_id) FROM public.story_episode_views),
    'opens_today', (
      SELECT count(*) FROM public.story_episode_views
      WHERE (last_opened_at AT TIME ZONE 'America/El_Salvador')::date = _today
    ),
    'completed_today', (
      SELECT count(*) FROM public.story_episode_views
      WHERE completed_at IS NOT NULL
        AND (completed_at AT TIME ZONE 'America/El_Salvador')::date = _today
    ),
    'completed_total', (
      SELECT count(*) FROM public.story_episode_views WHERE completed_at IS NOT NULL
    ),
    'top_episodes', COALESCE((
      SELECT jsonb_agg(row_to_json(t)) FROM (
        SELECT episode_id,
               season,
               count(DISTINCT user_id) AS readers,
               count(*) FILTER (WHERE completed_at IS NOT NULL) AS completions,
               round(avg(max_scene_index)::numeric, 1) AS avg_scene
        FROM public.story_episode_views
        GROUP BY episode_id, season
        ORDER BY count(DISTINCT user_id) DESC
        LIMIT 20
      ) t
    ), '[]'::jsonb),
    'daily', COALESCE((
      SELECT jsonb_agg(row_to_json(d) ORDER BY d.day) FROM (
        SELECT (last_opened_at AT TIME ZONE 'America/El_Salvador')::date AS day,
               count(DISTINCT user_id) AS readers,
               count(*) AS opens
        FROM public.story_episode_views
        WHERE last_opened_at >= now() - interval '30 days'
        GROUP BY 1
      ) d
    ), '[]'::jsonb)
  ) INTO _result;

  RETURN _result;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_story_metrics() FROM public;
GRANT EXECUTE ON FUNCTION public.admin_story_metrics() TO authenticated;