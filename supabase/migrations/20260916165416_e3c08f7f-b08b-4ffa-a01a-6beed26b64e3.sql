-- 1. Profile photo fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_photo_path text,
  ADD COLUMN IF NOT EXISTS avatar_status text NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS avatar_reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS avatar_reject_reason text,
  ADD COLUMN IF NOT EXISTS avatar_upload_day date,
  ADD COLUMN IF NOT EXISTS avatar_uploads_today integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS avatar_prompt_seen_at timestamptz;

-- 2. Reports table
CREATE TABLE IF NOT EXISTS public.avatar_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason text,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (reporter_id, owner_id)
);

GRANT SELECT, INSERT ON public.avatar_reports TO authenticated;
GRANT ALL ON public.avatar_reports TO service_role;

ALTER TABLE public.avatar_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can report a photo once" ON public.avatar_reports;
CREATE POLICY "Users can report a photo once"
  ON public.avatar_reports FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reporter_id AND reporter_id <> owner_id);

DROP POLICY IF EXISTS "Admins can read reports" ON public.avatar_reports;
CREATE POLICY "Admins can read reports"
  ON public.avatar_reports FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS set_avatar_reports_updated_at ON public.avatar_reports;
CREATE TRIGGER set_avatar_reports_updated_at
  BEFORE UPDATE ON public.avatar_reports
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS avatar_reports_owner_open_idx
  ON public.avatar_reports (owner_id) WHERE status = 'open';

-- 3. Storage policies: each learner owns their folder
DROP POLICY IF EXISTS "Avatar owners can read their files" ON storage.objects;
CREATE POLICY "Avatar owners can read their files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Avatar owners can upload their files" ON storage.objects;
CREATE POLICY "Avatar owners can upload their files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Avatar owners can update their files" ON storage.objects;
CREATE POLICY "Avatar owners can update their files"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Avatar owners can delete their files" ON storage.objects;
CREATE POLICY "Avatar owners can delete their files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- 4. Profile name/avatar sanitizer keeps working; add status guard
CREATE OR REPLACE FUNCTION public.sanitize_profile_avatar_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.avatar_status IS NULL OR NEW.avatar_status NOT IN ('none','pending','approved','rejected','hidden') THEN
    NEW.avatar_status := 'none';
  END IF;
  IF NEW.avatar_photo_path IS NOT NULL
     AND NEW.avatar_photo_path !~ ('^' || NEW.id::text || '/[A-Za-z0-9._-]{1,80}$') THEN
    RAISE EXCEPTION 'invalid avatar path';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sanitize_profile_avatar_status_trg ON public.profiles;
CREATE TRIGGER sanitize_profile_avatar_status_trg
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.sanitize_profile_avatar_status();

-- 5. Leaderboard: expose approved photos only
CREATE OR REPLACE FUNCTION public.league_board_preview(_competition_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _rows jsonb;
BEGIN
  SELECT coalesce(jsonb_agg(r ORDER BY (r->>'rank')::int), '[]'::jsonb)
  INTO _rows
  FROM (
    SELECT jsonb_build_object(
      'rank', row_number() OVER (ORDER BY m.points DESC, m.created_at ASC),
      'name', split_part(coalesce(nullif(btrim(p.display_name), ''), 'Estudiante'), ' ', 1),
      'points', m.points,
      'avatar', p.avatar_id,
      'photo', CASE WHEN p.avatar_status = 'approved' THEN p.avatar_photo_path ELSE NULL END,
      'isMe', m.user_id = auth.uid()
    ) AS r
    FROM public.league_memberships m
    JOIN public.profiles p ON p.id = m.user_id
    WHERE m.competition_id = _competition_id
      AND m.hidden = false
      AND m.points > 0
    ORDER BY m.points DESC, m.created_at ASC
    LIMIT 5
  ) s;

  RETURN _rows;
END;
$$;

CREATE OR REPLACE FUNCTION public.league_board(_competition_id uuid, _offset integer DEFAULT 0, _limit integer DEFAULT 25)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _rows jsonb;
  _total integer;
BEGIN
  SELECT count(*) INTO _total
  FROM public.league_memberships m
  WHERE m.competition_id = _competition_id
    AND m.hidden = false
    AND m.points > 0;

  SELECT coalesce(jsonb_agg(r ORDER BY (r->>'rank')::int), '[]'::jsonb)
  INTO _rows
  FROM (
    SELECT jsonb_build_object(
      'rank', rn,
      'name', split_part(coalesce(nullif(btrim(display_name), ''), 'Estudiante'), ' ', 1),
      'points', points,
      'avatar', avatar_id,
      'photo', CASE WHEN avatar_status = 'approved' THEN avatar_photo_path ELSE NULL END,
      'isMe', user_id = auth.uid()
    ) AS r
    FROM (
      SELECT
        row_number() OVER (ORDER BY m.points DESC, m.created_at ASC) AS rn,
        m.user_id,
        m.points,
        p.display_name,
        p.avatar_id,
        p.avatar_status,
        p.avatar_photo_path
      FROM public.league_memberships m
      JOIN public.profiles p ON p.id = m.user_id
      WHERE m.competition_id = _competition_id
        AND m.hidden = false
        AND m.points > 0
    ) ranked
    WHERE rn > _offset AND rn <= _offset + greatest(_limit, 1)
  ) s;

  RETURN jsonb_build_object('rows', _rows, 'total', _total);
END;
$$;