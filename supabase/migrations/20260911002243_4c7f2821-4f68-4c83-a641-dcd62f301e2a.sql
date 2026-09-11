create or replace function public.admin_cost_center()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  _res jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Forbidden';
  end if;

  with ep as (
    select endpoint,
           sum(request_count) filter (where window_start >= now() - interval '30 days')::int as requests_30d,
           sum(request_count)::int as requests_total,
           count(distinct user_id) filter (where window_start >= now() - interval '30 days')::int as users_30d
    from public.ai_usage_limits
    group by endpoint
  ),
  rec as (
    select count(*)::int as count_total,
           count(*) filter (where created_at >= now() - interval '30 days')::int as count_30d,
           round(coalesce(sum(duration_seconds), 0) / 60.0, 1) as minutes_total,
           round(coalesce(sum(duration_seconds) filter (where created_at >= now() - interval '30 days'), 0) / 60.0, 1) as minutes_30d,
           round(avg(duration_seconds), 1) as avg_seconds
    from public.recordings
  ),
  coach as (
    select count(*)::int as total,
           count(*) filter (where created_at >= now() - interval '30 days')::int as d30
    from public.final_audio_coach_feedback
    where status <> 'pending'
  ),
  attempts as (
    select count(*)::int as total,
           count(*) filter (where first_recording_at >= now() - interval '30 days')::int as d30
    from public.practice_attempts
    where first_recording_at is not null
  ),
  users as (
    select count(*)::int as total,
           (select count(distinct user_id) from public.practice_attempts
             where first_recording_at >= now() - interval '30 days')::int as active_30d
    from auth.users
  )
  select jsonb_build_object(
    'generated_at', now(),
    'endpoints', coalesce((select jsonb_agg(jsonb_build_object(
        'endpoint', ep.endpoint,
        'requests_30d', ep.requests_30d,
        'requests_total', ep.requests_total,
        'users_30d', ep.users_30d
      ) order by ep.requests_30d desc) from ep), '[]'::jsonb),
    'recordings', (select jsonb_build_object(
        'count_30d', count_30d, 'count_total', count_total,
        'minutes_30d', minutes_30d, 'minutes_total', minutes_total,
        'avg_seconds', avg_seconds) from rec),
    'coach', (select jsonb_build_object('analyses_30d', d30, 'analyses_total', total) from coach),
    'attempts', (select jsonb_build_object('sessions_30d', d30, 'sessions_total', total) from attempts),
    'users', (select jsonb_build_object('total', total, 'active_30d', active_30d) from users)
  ) into _res;
  return _res;
end
$$;

revoke all on function public.admin_cost_center() from anon, authenticated;
grant execute on function public.admin_cost_center() to authenticated;