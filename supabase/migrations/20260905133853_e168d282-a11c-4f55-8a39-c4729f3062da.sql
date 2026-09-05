CREATE TABLE public.ai_usage_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, endpoint, window_start)
);

CREATE INDEX ai_usage_limits_window_idx ON public.ai_usage_limits (window_start);

-- Trusted server code only. Learners get no direct access to their counters.
REVOKE ALL ON public.ai_usage_limits FROM anon, authenticated;
GRANT ALL ON public.ai_usage_limits TO service_role;
ALTER TABLE public.ai_usage_limits ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: with RLS enabled and no grants, anon/authenticated cannot touch rows.

-- Atomically increments the counter for the current window and returns whether the call is allowed.
CREATE OR REPLACE FUNCTION public.consume_ai_quota(
  _user_id UUID,
  _endpoint TEXT,
  _limit INTEGER,
  _window_seconds INTEGER
)
RETURNS TABLE (allowed BOOLEAN, request_count INTEGER, window_start TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _window_start TIMESTAMPTZ;
  _count INTEGER;
BEGIN
  _window_start := to_timestamp(floor(extract(epoch FROM now()) / _window_seconds) * _window_seconds);

  INSERT INTO public.ai_usage_limits AS l (user_id, endpoint, window_start, request_count)
  VALUES (_user_id, _endpoint, _window_start, 1)
  ON CONFLICT (user_id, endpoint, window_start)
  DO UPDATE SET request_count = l.request_count + 1, updated_at = now()
  RETURNING l.request_count INTO _count;

  -- Opportunistic cleanup of old windows for this user/endpoint.
  DELETE FROM public.ai_usage_limits
  WHERE user_id = _user_id AND endpoint = _endpoint AND window_start < now() - interval '2 days';

  RETURN QUERY SELECT _count <= _limit, _count, _window_start;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_ai_quota(UUID, TEXT, INTEGER, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_quota(UUID, TEXT, INTEGER, INTEGER) TO service_role;