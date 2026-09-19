-- Server helpers for the scheduled practice-reminder job.

CREATE OR REPLACE FUNCTION public.reminder_activation_candidates(_hours integer, _kind text)
RETURNS TABLE(user_id uuid, local_date date, module_id text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.id,
         (now() AT TIME ZONE coalesce(ps.timezone, 'America/El_Salvador'))::date,
         coalesce(up.current_module_id, up.initial_placement_module_id)
  FROM auth.users u
  LEFT JOIN public.user_preferences up ON up.user_id = u.id
  LEFT JOIN public.practice_schedules ps ON ps.user_id = u.id
  WHERE u.created_at <= now() - make_interval(hours => _hours)
    AND u.created_at > now() - make_interval(hours => _hours) - interval '5 minutes'
    AND NOT EXISTS (
      SELECT 1 FROM public.practice_attempts pa
      WHERE pa.user_id = u.id AND pa.first_recording_at IS NOT NULL
    )
    AND NOT EXISTS (
      SELECT 1 FROM public.reminder_log rl
      WHERE rl.user_id = u.id AND rl.kind = _kind
    );
$$;

REVOKE ALL ON FUNCTION public.reminder_activation_candidates(integer, text) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reminder_activation_candidates(integer, text) TO service_role;

-- Read-only admin card: reach of the reminder system and whether it works.
CREATE OR REPLACE FUNCTION public.admin_reminder_stats()
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
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT jsonb_build_object(
    'generated_at', now(),
    'scheduled_users', (SELECT count(*) FROM public.practice_schedules WHERE enabled),
    'push_users', (SELECT count(DISTINCT user_id) FROM public.push_subscriptions WHERE failed_at IS NULL),
    'email_users', (SELECT count(*) FROM public.practice_schedules WHERE enabled AND channel = 'email'),
    'sent_today_first', (SELECT count(*) FROM public.reminder_log WHERE local_date = _today AND kind = 'first'),
    'sent_today_second', (SELECT count(*) FROM public.reminder_log WHERE local_date = _today AND kind = 'second'),
    'sent_today_activation', (SELECT count(*) FROM public.reminder_log WHERE local_date = _today AND kind LIKE 'activation%'),
    'followup', (
      SELECT jsonb_build_object(
        'reminded', count(*),
        'practiced', count(*) FILTER (WHERE EXISTS (
          SELECT 1 FROM public.habit_practice_days hp
          WHERE hp.user_id = r.user_id AND hp.practice_date = r.local_date
        ))
      )
      FROM (
        SELECT DISTINCT user_id, local_date
        FROM public.reminder_log
        WHERE local_date >= _today - 7 AND local_date < _today
      ) r
    )
  ) INTO _result;

  RETURN _result;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_reminder_stats() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.admin_reminder_stats() TO authenticated, service_role;