CREATE OR REPLACE FUNCTION public.record_story_view(
  _episode_id text,
  _season smallint,
  _episode_number smallint,
  _scene_index integer,
  _completed boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'unauthenticated';
  END IF;
  IF _episode_id IS NULL OR length(_episode_id) = 0 OR length(_episode_id) > 120 THEN
    RAISE EXCEPTION 'invalid episode';
  END IF;

  INSERT INTO public.story_episode_views AS v (
    user_id, episode_id, season, episode_number,
    scenes_reached, max_scene_index, completed_at
  )
  VALUES (
    _uid, _episode_id, nullif(_season, 0), nullif(_episode_number, 0),
    greatest(coalesce(_scene_index, 0), 0) + 1,
    greatest(coalesce(_scene_index, 0), 0),
    CASE WHEN _completed THEN now() ELSE NULL END
  )
  ON CONFLICT (user_id, episode_id) DO UPDATE
  SET last_opened_at = now(),
      season = coalesce(EXCLUDED.season, v.season),
      episode_number = coalesce(EXCLUDED.episode_number, v.episode_number),
      max_scene_index = greatest(v.max_scene_index, EXCLUDED.max_scene_index),
      scenes_reached = greatest(v.scenes_reached, EXCLUDED.scenes_reached),
      completed_at = coalesce(v.completed_at, EXCLUDED.completed_at);
END;
$$;