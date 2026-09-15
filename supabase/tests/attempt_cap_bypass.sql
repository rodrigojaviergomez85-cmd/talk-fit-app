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

  -- 4. Whatever key the client sends, the server stores its own day.
  DECLARE
    _srv text := public.practice_day_key();
    _probe uuid := gen_random_uuid();
    _stored text;
    _n integer;
  BEGIN
    FOREACH _stored IN ARRAY ARRAY[_yesterday, _tomorrow, _far] LOOP
      _probe := gen_random_uuid();
      INSERT INTO public.practice_attempts (id, user_id, module_id, day, local_day_key, started_at, first_recording_at)
      VALUES (_probe, _uid, 'basic-zero', 1, _stored, now(), NULL);
      IF (SELECT local_day_key FROM public.practice_attempts WHERE id = _probe) <> _srv THEN
        RAISE EXCEPTION 'FAIL: client key % was stored as sent', _stored;
      END IF;
    END LOOP;
    RAISE NOTICE 'OK: yesterday, tomorrow and a far date all stored as %', _srv;

    -- Six counted inserts with three different client keys, cap 5: only the 6th fails.
    DELETE FROM public.practice_attempts WHERE user_id = _uid;
    _n := 0;
    FOR i IN 1..6 LOOP
      BEGIN
        INSERT INTO public.practice_attempts (id, user_id, module_id, day, local_day_key, started_at, first_recording_at)
        VALUES (gen_random_uuid(), _uid, 'basic-zero', 1,
                (ARRAY[_yesterday, _today, _tomorrow])[1 + (i % 3)], now(), now());
      EXCEPTION WHEN raise_exception THEN
        GET STACKED DIAGNOSTICS _msg = MESSAGE_TEXT;
        IF _msg NOT LIKE 'DAILY_PRACTICE_CAP%' THEN RAISE; END IF;
        _n := _n + 1;
      END;
    END LOOP;
    IF _n <> 1 THEN RAISE EXCEPTION 'FAIL: expected exactly 1 practice cap error, got %', _n; END IF;
    RAISE NOTICE 'OK: three client keys still share one allowance of 5';

    -- Same for interviews with a cap of 2: the 3rd fails.
    DELETE FROM public.interview_attempts WHERE user_id = _uid;
    _n := 0;
    FOR i IN 1..3 LOOP
      BEGIN
        INSERT INTO public.interview_attempts (id, user_id, simulator, local_day_key, started_at, first_recording_at)
        VALUES (gen_random_uuid(), _uid, 'b4', (ARRAY[_yesterday, _today, _tomorrow])[1 + (i % 3)], now(), now());
      EXCEPTION WHEN raise_exception THEN
        GET STACKED DIAGNOSTICS _msg = MESSAGE_TEXT;
        IF _msg NOT LIKE 'DAILY_INTERVIEW_CAP%' THEN RAISE; END IF;
        _n := _n + 1;
      END;
    END LOOP;
    IF _n <> 1 THEN RAISE EXCEPTION 'FAIL: expected exactly 1 interview cap error, got %', _n; END IF;
    RAISE NOTICE 'OK: interview cap of 2 holds across client keys';
  END;

  RESET ROLE;
  DELETE FROM auth.users WHERE id = _uid; -- cascades to both attempt tables
  RAISE NOTICE 'ALL CHECKS PASSED';
END
$outer$;

ROLLBACK; -- nothing from this script is kept
