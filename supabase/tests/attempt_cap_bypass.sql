-- Manual verification of the daily-cap bypass fixes.
-- NOT a migration. Run by hand in the SQL editor as an admin.
-- It creates a throwaway auth user, exercises every blocked path as that
-- learner, and cleans up after itself.

BEGIN;

DO $outer$
DECLARE
  _uid uuid := gen_random_uuid();
  _id1 uuid := gen_random_uuid();
  _today text := to_char((now() AT TIME ZONE 'UTC')::date, 'YYYY-MM-DD');
  _yesterday text := to_char((now() AT TIME ZONE 'UTC')::date - 1, 'YYYY-MM-DD');
  _tomorrow text := to_char((now() AT TIME ZONE 'UTC')::date + 1, 'YYYY-MM-DD');
  _far text := to_char((now() AT TIME ZONE 'UTC')::date + 10, 'YYYY-MM-DD');
  _msg text;
BEGIN
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, created_at, updated_at)
  VALUES (_uid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
          'capbypass-' || _uid || '@example.test', '', now(), now());

  -- Act as this learner for the rest of the script.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', _uid, 'role', 'authenticated')::text, true);
  SET LOCAL ROLE authenticated;

  -- Baseline: a normal attempt for today that consumes a slot.
  INSERT INTO public.practice_attempts (id, user_id, module_id, day, local_day_key, started_at, first_recording_at)
  VALUES (_id1, _uid, 'basic-zero', 1, _today, now(), now());

  -- 1. DELETE must be impossible.
  BEGIN
    DELETE FROM public.practice_attempts WHERE id = _id1;
    RAISE EXCEPTION 'FAIL: delete was allowed';
  EXCEPTION WHEN insufficient_privilege THEN
    RAISE NOTICE 'OK: delete blocked';
  END;

  -- 2. Nulling a counted first_recording_at must fail.
  BEGIN
    UPDATE public.practice_attempts SET first_recording_at = NULL WHERE id = _id1;
    RAISE EXCEPTION 'FAIL: first_recording_at was cleared';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS _msg = MESSAGE_TEXT;
    IF _msg NOT LIKE 'IMMUTABLE_ATTEMPT_FIELD%' THEN RAISE; END IF;
    RAISE NOTICE 'OK: %', _msg;
  END;

  -- 3. Changing local_day_key must fail.
  BEGIN
    UPDATE public.practice_attempts SET local_day_key = _yesterday WHERE id = _id1;
    RAISE EXCEPTION 'FAIL: local_day_key was changed';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS _msg = MESSAGE_TEXT;
    IF _msg NOT LIKE 'IMMUTABLE_ATTEMPT_FIELD%' THEN RAISE; END IF;
    RAISE NOTICE 'OK: %', _msg;
  END;

  -- 4. A date far from server time must be rejected.
  BEGIN
    INSERT INTO public.practice_attempts (id, user_id, module_id, day, local_day_key, started_at, first_recording_at)
    VALUES (gen_random_uuid(), _uid, 'basic-zero', 1, _far, now(), now());
    RAISE EXCEPTION 'FAIL: far-future local_day_key was accepted';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS _msg = MESSAGE_TEXT;
    IF _msg NOT LIKE 'INVALID_LOCAL_DAY_KEY%' THEN RAISE; END IF;
    RAISE NOTICE 'OK: %', _msg;
  END;

  -- 5. Yesterday and tomorrow are legitimate timezones and must succeed.
  INSERT INTO public.practice_attempts (id, user_id, module_id, day, local_day_key, started_at, first_recording_at)
  VALUES (gen_random_uuid(), _uid, 'basic-zero', 1, _yesterday, now(), now());
  INSERT INTO public.practice_attempts (id, user_id, module_id, day, local_day_key, started_at, first_recording_at)
  VALUES (gen_random_uuid(), _uid, 'basic-zero', 1, _tomorrow, now(), now());
  RAISE NOTICE 'OK: yesterday and tomorrow accepted';

  -- Same rules on interviews.
  INSERT INTO public.interview_attempts (id, user_id, simulator, local_day_key, started_at, first_recording_at)
  VALUES (gen_random_uuid(), _uid, 'b4', _today, now(), now());
  BEGIN
    INSERT INTO public.interview_attempts (id, user_id, simulator, local_day_key, started_at, first_recording_at)
    VALUES (gen_random_uuid(), _uid, 'b4', _far, now(), now());
    RAISE EXCEPTION 'FAIL: interview far-future local_day_key was accepted';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS _msg = MESSAGE_TEXT;
    IF _msg NOT LIKE 'INVALID_LOCAL_DAY_KEY%' THEN RAISE; END IF;
    RAISE NOTICE 'OK: %', _msg;
  END;

  RESET ROLE;
  DELETE FROM auth.users WHERE id = _uid; -- cascades to both attempt tables
  RAISE NOTICE 'ALL CHECKS PASSED';
END
$outer$;

ROLLBACK; -- nothing from this script is kept
