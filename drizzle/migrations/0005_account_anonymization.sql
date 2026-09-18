CREATE SEQUENCE IF NOT EXISTS public.deleted_account_seq START 1501;

CREATE TABLE IF NOT EXISTS public.deletion_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_sha256 text NOT NULL,
  deleted_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.deletion_log TO service_role;
ALTER TABLE public.deletion_log ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.anonymize_account(_user_id uuid, _email_sha256 text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _n bigint;
  _label text;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'user id required';
  END IF;

  _n := nextval('public.deleted_account_seq');
  _label := 'usuario-eliminado-' || _n;

  -- Auth identity: the account can never be used again.
  UPDATE auth.users SET
    email = _label || '@deleted.invalid',
    phone = NULL,
    encrypted_password = crypt(gen_random_uuid()::text || gen_random_uuid()::text, gen_salt('bf')),
    raw_user_meta_data = '{}'::jsonb,
    raw_app_meta_data = '{}'::jsonb,
    email_confirmed_at = NULL,
    phone_confirmed_at = NULL,
    email_change = NULL,
    email_change_token_new = '',
    confirmation_token = '',
    recovery_token = '',
    banned_until = timestamptz '2999-01-01',
    updated_at = now()
  WHERE id = _user_id;

  -- Without this, "Continue with Google" would hand the deleted account back.
  DELETE FROM auth.identities WHERE user_id = _user_id;
  DELETE FROM auth.sessions WHERE user_id = _user_id;
  DELETE FROM auth.refresh_tokens WHERE user_id = _user_id::text;

  UPDATE public.profiles SET
    display_name = 'Usuario eliminado ' || _n,
    email = NULL,
    avatar_id = NULL,
    avatar_photo_path = NULL,
    avatar_status = 'none',
    avatar_reject_reason = NULL,
    avatar_reviewed_at = NULL
  WHERE id = _user_id;

  -- Free text spoken or written by the learner. Rows stay, metrics stay.
  UPDATE public.final_audio_coach_feedback SET
    said = NULL, better_version = NULL, practice_phrase = NULL, answered_task = NULL,
    why_en = NULL, why_es = NULL, strength_en = NULL, strength_es = NULL,
    next_step_en = NULL, next_step_es = NULL, corrections = NULL, fluency_upgrade = NULL
  WHERE user_id = _user_id;

  UPDATE public.final_audio_coach_retakes SET result = NULL WHERE user_id = _user_id;
  UPDATE public.progress_moments SET selected_reflections = '{}'::text[] WHERE user_id = _user_id;

  UPDATE public.support_tickets SET
    nombre = 'Usuario eliminado ' || _n,
    email = _label || '@deleted.invalid',
    mensaje = '',
    user_agent = NULL,
    user_id = NULL
  WHERE user_id = _user_id;

  UPDATE public.bug_reports SET
    email = NULL, message = '', expected = NULL, context = '{}'::jsonb, screenshot_path = NULL
  WHERE user_id = _user_id;

  -- Audio is gone from storage: mark it so the app shows "no longer available".
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