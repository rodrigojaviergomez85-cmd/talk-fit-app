CREATE OR REPLACE FUNCTION public.anonymize_account(_user_id uuid, _email_sha256 text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  _label text;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'user id required';
  END IF;

  -- Random opaque identifier (no sequence, no guessable order).
  LOOP
    _label := 'usuario-eliminado-' || encode(extensions.gen_random_bytes(8), 'hex');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM auth.users WHERE email = _label || '@deleted.invalid');
  END LOOP;

  UPDATE auth.users SET
    email = _label || '@deleted.invalid',
    phone = NULL,
    encrypted_password = extensions.crypt(gen_random_uuid()::text || gen_random_uuid()::text, extensions.gen_salt('bf')),
    raw_user_meta_data = '{}'::jsonb,
    raw_app_meta_data = '{}'::jsonb,
    email_confirmed_at = NULL,
    phone_confirmed_at = NULL,
    email_change = '',
    email_change_token_new = '',
    email_change_token_current = '',
    phone_change = '',
    phone_change_token = '',
    reauthentication_token = '',
    confirmation_token = '',
    recovery_token = '',
    banned_until = timestamptz '2999-01-01',
    updated_at = now()
  WHERE id = _user_id;

  DELETE FROM auth.identities WHERE user_id = _user_id;
  DELETE FROM auth.sessions WHERE user_id = _user_id;
  DELETE FROM auth.refresh_tokens WHERE user_id = _user_id::text;

  UPDATE public.profiles SET
    display_name = 'Usuario eliminado',
    email = NULL,
    avatar_id = NULL,
    avatar_photo_path = NULL,
    avatar_status = 'none',
    avatar_reject_reason = NULL,
    avatar_reviewed_at = NULL
  WHERE id = _user_id;

  UPDATE public.final_audio_coach_feedback SET
    said = NULL, better_version = NULL, practice_phrase = NULL, answered_task = NULL,
    why_en = NULL, why_es = NULL, strength_en = NULL, strength_es = NULL,
    next_step_en = NULL, next_step_es = NULL, corrections = NULL, fluency_upgrade = NULL
  WHERE user_id = _user_id;

  UPDATE public.final_audio_coach_retakes SET result = NULL WHERE user_id = _user_id;
  UPDATE public.progress_moments SET selected_reflections = '{}'::text[] WHERE user_id = _user_id;

  UPDATE public.support_tickets SET
    nombre = 'Usuario eliminado',
    email = _label || '@deleted.invalid',
    mensaje = '',
    user_agent = NULL,
    user_id = NULL
  WHERE user_id = _user_id;

  UPDATE public.bug_reports SET
    email = NULL, message = '', expected = NULL, context = '{}'::jsonb, screenshot_path = NULL
  WHERE user_id = _user_id;

  UPDATE public.recordings SET audio_purged_at = COALESCE(audio_purged_at, now())
  WHERE user_id = _user_id;

  UPDATE public.day_progress SET
    recording_path = NULL,
    recording_purged_at = COALESCE(recording_purged_at, now()),
    latest_purged_at = COALESCE(latest_purged_at, now())
  WHERE user_id = _user_id;

  INSERT INTO public.deletion_log (email_sha256) VALUES (_email_sha256);

  RETURN _label;
END;
$$;

REVOKE ALL ON FUNCTION public.anonymize_account(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.anonymize_account(uuid, text) TO service_role;