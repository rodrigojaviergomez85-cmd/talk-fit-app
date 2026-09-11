-- 1) Serialize the per-user/day cap check so concurrent inserts cannot both pass.
CREATE OR REPLACE FUNCTION public.enforce_daily_practice_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _used INTEGER;
  _cap INTEGER;
BEGIN
  IF NEW.first_recording_at IS NULL THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND OLD.first_recording_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  IF public.is_unlimited_test_user(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  -- Only one transaction at a time may evaluate this user's day.
  PERFORM pg_advisory_xact_lock(hashtext('practice:' || NEW.user_id::text || ':' || coalesce(NEW.local_day_key, '')));

  _cap := coalesce(public.get_daily_limit(NEW.user_id, 'practice'), 5);

  SELECT count(*) INTO _used
  FROM public.practice_attempts
  WHERE user_id = NEW.user_id
    AND local_day_key = NEW.local_day_key
    AND first_recording_at IS NOT NULL
    AND id <> NEW.id;

  IF _used >= _cap THEN
    RAISE EXCEPTION 'DAILY_PRACTICE_CAP: max % practice sessions per local calendar day', _cap
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.enforce_daily_interview_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _used INTEGER;
  _cap INTEGER;
BEGIN
  IF NEW.first_recording_at IS NULL THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND OLD.first_recording_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  IF public.is_unlimited_test_user(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext('interview:' || NEW.user_id::text || ':' || coalesce(NEW.local_day_key, '')));

  _cap := coalesce(public.get_daily_limit(NEW.user_id, 'interview'), 2);

  SELECT count(*) INTO _used
  FROM public.interview_attempts
  WHERE user_id = NEW.user_id
    AND local_day_key = NEW.local_day_key
    AND first_recording_at IS NOT NULL
    AND id <> NEW.id;

  IF _used >= _cap THEN
    RAISE EXCEPTION 'DAILY_INTERVIEW_CAP: max % interview simulations per local calendar day', _cap
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

-- 2) All-or-nothing admin settings write (settings + sections + audit trail).
CREATE OR REPLACE FUNCTION public.apply_admin_settings(
  _admin_id uuid,
  _admin_email text,
  _limits_enabled boolean,
  _billing_enabled boolean,
  _pro_multiplier integer,
  _sections jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _before public.app_settings%ROWTYPE;
  _sec jsonb;
  _key text;
  _free integer;
  _on boolean;
  _prev public.section_limits%ROWTYPE;
BEGIN
  IF NOT public.is_admin(_admin_id) THEN
    RAISE EXCEPTION 'FORBIDDEN: admin role required' USING ERRCODE = 'P0001';
  END IF;
  IF _pro_multiplier IS NULL OR _pro_multiplier < 1 OR _pro_multiplier > 100 THEN
    RAISE EXCEPTION 'INVALID_MULTIPLIER' USING ERRCODE = 'P0001';
  END IF;

  SELECT * INTO _before FROM public.app_settings WHERE id = 'global' FOR UPDATE;

  IF _before.limits_enabled IS DISTINCT FROM _limits_enabled THEN
    INSERT INTO public.settings_audit_log (changed_by, changed_by_email, scope, field, old_value, new_value)
    VALUES (_admin_id, _admin_email, 'app_settings', 'limits_enabled', _before.limits_enabled::text, _limits_enabled::text);
  END IF;
  IF _before.billing_enabled IS DISTINCT FROM _billing_enabled THEN
    INSERT INTO public.settings_audit_log (changed_by, changed_by_email, scope, field, old_value, new_value)
    VALUES (_admin_id, _admin_email, 'app_settings', 'billing_enabled', _before.billing_enabled::text, _billing_enabled::text);
  END IF;
  IF _before.pro_multiplier IS DISTINCT FROM _pro_multiplier THEN
    INSERT INTO public.settings_audit_log (changed_by, changed_by_email, scope, field, old_value, new_value)
    VALUES (_admin_id, _admin_email, 'app_settings', 'pro_multiplier', _before.pro_multiplier::text, _pro_multiplier::text);
  END IF;

  UPDATE public.app_settings
     SET limits_enabled = _limits_enabled,
         billing_enabled = _billing_enabled,
         pro_multiplier = _pro_multiplier,
         updated_by = _admin_id,
         updated_at = now()
   WHERE id = 'global';

  FOR _sec IN SELECT * FROM jsonb_array_elements(coalesce(_sections, '[]'::jsonb))
  LOOP
    _key := _sec->>'sectionKey';
    _free := (_sec->>'freeLimit')::integer;
    _on := (_sec->>'enabled')::boolean;
    IF _key IS NULL OR _free IS NULL OR _on IS NULL THEN
      RAISE EXCEPTION 'INVALID_SECTION' USING ERRCODE = 'P0001';
    END IF;
    IF _free < 0 OR _free > 10000 THEN
      RAISE EXCEPTION 'INVALID_SECTION_LIMIT' USING ERRCODE = 'P0001';
    END IF;

    SELECT * INTO _prev FROM public.section_limits WHERE section_key = _key FOR UPDATE;
    IF NOT FOUND THEN CONTINUE; END IF;

    IF _prev.free_limit IS DISTINCT FROM _free THEN
      INSERT INTO public.settings_audit_log (changed_by, changed_by_email, scope, field, old_value, new_value)
      VALUES (_admin_id, _admin_email, _key, 'free_limit', _prev.free_limit::text, _free::text);
    END IF;
    IF _prev.enabled IS DISTINCT FROM _on THEN
      INSERT INTO public.settings_audit_log (changed_by, changed_by_email, scope, field, old_value, new_value)
      VALUES (_admin_id, _admin_email, _key, 'enabled', _prev.enabled::text, _on::text);
    END IF;

    UPDATE public.section_limits
       SET free_limit = _free, enabled = _on, updated_at = now()
     WHERE section_key = _key;
  END LOOP;
END;
$$;

REVOKE ALL ON FUNCTION public.apply_admin_settings(uuid, text, boolean, boolean, integer, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.apply_admin_settings(uuid, text, boolean, boolean, integer, jsonb) TO service_role;