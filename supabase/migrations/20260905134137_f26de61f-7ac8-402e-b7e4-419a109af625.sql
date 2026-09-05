DROP FUNCTION IF EXISTS public.consume_ai_quota(UUID, TEXT, INTEGER, INTEGER);

CREATE FUNCTION public.consume_ai_quota(
  _user_id UUID,
  _endpoint TEXT,
  _limit INTEGER,
  _window_seconds INTEGER
)
RETURNS TABLE (allowed BOOLEAN, used_count INTEGER, window_started TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _ws TIMESTAMPTZ;
  _count INTEGER;
BEGIN
  _ws := to_timestamp(floor(extract(epoch FROM now()) / _window_seconds) * _window_seconds);

  INSERT INTO public.ai_usage_limits AS l (user_id, endpoint, window_start, request_count)
  VALUES (_user_id, _endpoint, _ws, 1)
  ON CONFLICT (user_id, endpoint, window_start)
  DO UPDATE SET request_count = l.request_count + 1, updated_at = now()
  RETURNING l.request_count INTO _count;

  DELETE FROM public.ai_usage_limits l
  WHERE l.user_id = _user_id AND l.endpoint = _endpoint AND l.window_start < now() - interval '2 days';

  RETURN QUERY SELECT _count <= _limit, _count, _ws;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_ai_quota(UUID, TEXT, INTEGER, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_quota(UUID, TEXT, INTEGER, INTEGER) TO service_role;