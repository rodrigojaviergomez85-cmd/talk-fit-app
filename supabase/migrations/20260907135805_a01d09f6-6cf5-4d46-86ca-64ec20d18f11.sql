CREATE OR REPLACE FUNCTION public.is_unlimited_test_user(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = _user_id AND lower(email) = 'english4callcenters@gmail.com'
  );
$$;

REVOKE ALL ON FUNCTION public.is_unlimited_test_user(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_unlimited_test_user(UUID) FROM anon;
REVOKE ALL ON FUNCTION public.is_unlimited_test_user(UUID) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.is_unlimited_test_user(UUID) TO service_role;

CREATE OR REPLACE FUNCTION public.consume_ai_quota(_user_id uuid, _endpoint text, _limit integer, _window_seconds integer)
 RETURNS TABLE(allowed boolean, used_count integer, window_started timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _ws TIMESTAMPTZ;
  _count INTEGER;
BEGIN
  IF public.is_unlimited_test_user(_user_id) THEN
    RETURN QUERY SELECT true, 0, now();
    RETURN;
  END IF;

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
$function$;

-- Pacing, not cost: repeating a day is free (cached) and one day of AI costs
-- about $0.006. Spaced practice teaches better than cramming, and burning
-- through 180 days of curriculum in 90 days leaves 10,000 students with
-- nothing to do in month 3.
CREATE OR REPLACE FUNCTION public.enforce_daily_completion_cap()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _is_new_day BOOLEAN;
  _recent_days INTEGER;
BEGIN
  IF public.is_unlimited_test_user(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  -- Re-completing a day you already finished (the upsert ON CONFLICT path)
  -- must NEVER be capped. Only a genuinely new (module_id, day) counts.
  SELECT NOT EXISTS (
    SELECT 1 FROM public.day_progress
    WHERE user_id = NEW.user_id AND module_id = NEW.module_id AND day = NEW.day
  ) INTO _is_new_day;

  IF _is_new_day THEN
    SELECT count(*) INTO _recent_days
    FROM public.day_progress
    WHERE user_id = NEW.user_id
      AND completed_at > now() - interval '24 hours';

    IF _recent_days >= 2 THEN
      RAISE EXCEPTION 'DAILY_COMPLETION_CAP: max 2 new curriculum days per rolling 24 hours'
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS day_progress_completion_cap ON public.day_progress;
CREATE TRIGGER day_progress_completion_cap
  BEFORE INSERT ON public.day_progress
  FOR EACH ROW EXECUTE FUNCTION public.enforce_daily_completion_cap();