-- Manual verification of the storage-path ownership and timestamp rules.
-- NOT a migration. Run by hand in the SQL editor as an admin.
-- It creates a throwaway auth user, exercises every blocked path as that
-- learner, and cleans up after itself.

BEGIN;

DO $outer$
DECLARE
  _uid uuid := gen_random_uuid();
  _other uuid := gen_random_uuid();
  _rec uuid := gen_random_uuid();
  _msg text;
  _created timestamptz;
BEGIN
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, created_at, updated_at)
  VALUES (_uid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
          'pathowner-' || _uid || '@example.test', '', now(), now());

  PERFORM set_config('request.jwt.claims', json_build_object('sub', _uid, 'role', 'authenticated')::text, true);
  SET LOCAL ROLE authenticated;

  -- === day_progress =========================================================

  -- 1. A path owned by somebody else must fail.
  BEGIN
    INSERT INTO public.day_progress (user_id, module_id, day, completed_at, recording_path)
    VALUES (_uid, 'basic-zero', 5, now(), _other::text || '/basic-zero-day-5.webm');
    RAISE EXCEPTION 'FAIL: foreign recording_path accepted';
  EXCEPTION WHEN check_violation THEN
    RAISE NOTICE 'OK: foreign recording_path rejected';
  END;

  -- 2. Own id but a different module or day must fail.
  BEGIN
    INSERT INTO public.day_progress (user_id, module_id, day, completed_at, recording_path)
    VALUES (_uid, 'basic-zero', 5, now(), _uid::text || '/basic-one-day-9.webm');
    RAISE EXCEPTION 'FAIL: wrong module/day recording_path accepted';
  EXCEPTION WHEN check_violation THEN
    RAISE NOTICE 'OK: wrong module/day recording_path rejected';
  END;

  -- 3. The real path the app writes must succeed.
  INSERT INTO public.day_progress (user_id, module_id, day, completed_at, recording_path)
  VALUES (_uid, 'basic-zero', 5, now(), _uid::text || '/basic-zero-day-5.webm');
  RAISE NOTICE 'OK: valid recording_path accepted';

  -- 4. Backdating completed_at must fail.
  BEGIN
    UPDATE public.day_progress SET completed_at = now() - interval '3 years'
     WHERE user_id = _uid AND module_id = 'basic-zero' AND day = 5;
    RAISE EXCEPTION 'FAIL: backdated completed_at accepted';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS _msg = MESSAGE_TEXT;
    IF _msg NOT LIKE 'INVALID_COMPLETED_AT%' THEN RAISE; END IF;
    RAISE NOTICE 'OK: %', _msg;
  END;

  -- 5. created_at cannot be changed by an update.
  SELECT created_at INTO _created FROM public.day_progress
   WHERE user_id = _uid AND module_id = 'basic-zero' AND day = 5;
  UPDATE public.day_progress SET created_at = now() - interval '2 years'
   WHERE user_id = _uid AND module_id = 'basic-zero' AND day = 5;
  IF (SELECT created_at FROM public.day_progress
       WHERE user_id = _uid AND module_id = 'basic-zero' AND day = 5) <> _created THEN
    RAISE EXCEPTION 'FAIL: day_progress.created_at was changed';
  END IF;
  RAISE NOTICE 'OK: day_progress.created_at immutable';

  -- === recordings ===========================================================

  -- 6. A path owned by somebody else must fail.
  BEGIN
    INSERT INTO public.recordings (id, user_id, module_id, day, take_number, duration_seconds, storage_path)
    VALUES (gen_random_uuid(), _uid, 'basic-zero', 5, 1, 10, _other::text || '/basic-zero/5/take-1.webm');
    RAISE EXCEPTION 'FAIL: foreign storage_path accepted';
  EXCEPTION WHEN check_violation THEN
    RAISE NOTICE 'OK: foreign storage_path rejected';
  END;

  -- 7. Own id but a different module/day/take must fail.
  BEGIN
    INSERT INTO public.recordings (id, user_id, module_id, day, take_number, duration_seconds, storage_path)
    VALUES (gen_random_uuid(), _uid, 'basic-zero', 5, 1, 10, _uid::text || '/basic-one/9/take-1.webm');
    RAISE EXCEPTION 'FAIL: wrong module/day storage_path accepted';
  EXCEPTION WHEN check_violation THEN
    RAISE NOTICE 'OK: wrong module/day storage_path rejected';
  END;

  -- 8. The real path the app writes must succeed.
  INSERT INTO public.recordings (id, user_id, module_id, day, take_number, duration_seconds, storage_path)
  VALUES (_rec, _uid, 'basic-zero', 5, 1, 10, _uid::text || '/basic-zero/5/take-1.webm');
  RAISE NOTICE 'OK: valid storage_path accepted';

  -- 9. recordings.created_at cannot be changed by an update.
  SELECT created_at INTO _created FROM public.recordings WHERE id = _rec;
  UPDATE public.recordings SET created_at = now() - interval '2 years' WHERE id = _rec;
  IF (SELECT created_at FROM public.recordings WHERE id = _rec) <> _created THEN
    RAISE EXCEPTION 'FAIL: recordings.created_at was changed';
  END IF;
  RAISE NOTICE 'OK: recordings.created_at immutable';

  RESET ROLE;
  DELETE FROM auth.users WHERE id = _uid; -- cascades to both tables
  RAISE NOTICE 'ALL CHECKS PASSED';
END
$outer$;

ROLLBACK; -- nothing from this script is kept
