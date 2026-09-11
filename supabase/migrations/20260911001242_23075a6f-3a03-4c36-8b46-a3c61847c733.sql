create or replace function public.admin_engagement_metrics()
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

  with u as (
    select id, created_at from auth.users
  ),
  act as (
    select user_id, min(first_recording_at) as first_at
    from public.practice_attempts
    where first_recording_at is not null
    group by user_id
  ),
  hab as (
    select user_id, practice_date from public.habit_practice_days
  ),
  hab_count as (
    select user_id, count(*)::int as days from hab group by user_id
  ),
  user_days as (
    select user_id, local_day_key, count(*)::int as sessions,
           sum(coalesce(speaking_seconds,0))::int as secs
    from public.practice_attempts
    where first_recording_at is not null
    group by user_id, local_day_key
  ),
  totals as (
    select
      (select count(*) from u)::int as total_users,
      (select count(*) from act)::int as activated_users,
      (select count(*) from u where created_at >= now() - interval '7 days')::int as signups_7d,
      (select count(*) from u where created_at >= now() - interval '30 days')::int as signups_30d
  )
  select jsonb_build_object(
    'generated_at', now(),

    'activation', jsonb_build_object(
      'total_users', t.total_users,
      'activated_users', t.activated_users,
      'day1_completed_users', (select count(distinct user_id) from public.day_progress where day = 1)::int,
      'median_minutes_to_first', (
        select round(percentile_cont(0.5) within group (
          order by extract(epoch from (a.first_at - u2.created_at)) / 60.0
        )::numeric, 1)
        from act a join u u2 on u2.id = a.user_id
        where a.first_at >= u2.created_at
      ),
      'signups_7d', t.signups_7d,
      'signups_30d', t.signups_30d
    ),

    'curriculum_funnel', (
      select coalesce(jsonb_agg(jsonb_build_object('day', d, 'users', c) order by d), '[]'::jsonb)
      from (
        select gs.d::int as d,
               (select count(distinct dp.user_id) from public.day_progress dp where dp.day = gs.d)::int as c
        from generate_series(1, 20) as gs(d)
      ) f
    ),

    'calendar_retention', (
      select coalesce(jsonb_agg(jsonb_build_object('day', n, 'eligible', e, 'returned', r) order by n), '[]'::jsonb)
      from (
        select n,
          (select count(*) from u where u.created_at <= now() - make_interval(days => n))::int as e,
          (select count(distinct u.id)
             from u join hab h on h.user_id = u.id
            where u.created_at <= now() - make_interval(days => n)
              and h.practice_date >= (u.created_at::date + n))::int as r
        from unnest(array[1,3,7,14,30]) as n
      ) q
    ),

    'consistency', jsonb_build_object(
      'avg_days_per_user', (select round(avg(days)::numeric, 1) from hab_count),
      'buckets', jsonb_build_object(
        'd1', (select count(*) from hab_count where days = 1)::int,
        'd2_3', (select count(*) from hab_count where days between 2 and 3)::int,
        'd4_7', (select count(*) from hab_count where days between 4 and 7)::int,
        'd8_plus', (select count(*) from hab_count where days >= 8)::int
      ),
      'weekly_goal_users', (
        select count(*) from (
          select user_id from hab
          where practice_date >= (current_date - 6)
          group by user_id having count(*) >= 5
        ) w
      )::int,
      'active_7d_users', (select count(distinct user_id) from hab where practice_date >= current_date - 6)::int,
      'active_30d_users', (select count(distinct user_id) from hab where practice_date >= current_date - 29)::int
    ),

    'intensity', jsonb_build_object(
      'avg_sessions_per_active_day', (select round(avg(sessions)::numeric, 2) from user_days),
      'session_distribution', jsonb_build_object(
        's1', (select count(*) from user_days where sessions = 1)::int,
        's2', (select count(*) from user_days where sessions = 2)::int,
        's3', (select count(*) from user_days where sessions = 3)::int,
        's4', (select count(*) from user_days where sessions = 4)::int,
        's5_plus', (select count(*) from user_days where sessions >= 5)::int
      ),
      'cap_hit_user_days', (select count(*) from user_days where sessions >= 5)::int,
      'total_user_days', (select count(*) from user_days)::int,
      'avg_minutes_per_session', (
        select round((avg(coalesce(speaking_seconds,0)) / 60.0)::numeric, 1)
        from public.practice_attempts where first_recording_at is not null
      ),
      'avg_minutes_per_user', (
        select round((avg(s) / 60.0)::numeric, 1) from (
          select sum(secs)::numeric as s from user_days group by user_id
        ) x
      )
    ),

    'signals', jsonb_build_object(
      'retake_users', (select count(distinct user_id) from public.final_audio_coach_retakes)::int,
      'coach_users', (select count(distinct user_id) from public.final_audio_coach_feedback)::int,
      'review_users', (select count(distinct user_id) from public.review_progress)::int,
      'bug_reports_7d', (select count(*) from public.bug_reports where created_at >= now() - interval '7 days')::int,
      'bug_reports_open', (select count(*) from public.bug_reports where status = 'new')::int
    )
  )
  into _res
  from totals t;

  return _res;
end;
$$;

revoke all on function public.admin_engagement_metrics() from public;
grant execute on function public.admin_engagement_metrics() to authenticated;
grant execute on function public.admin_engagement_metrics() to service_role;