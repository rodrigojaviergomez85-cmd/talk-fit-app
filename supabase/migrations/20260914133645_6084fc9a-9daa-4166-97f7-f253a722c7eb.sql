CREATE OR REPLACE FUNCTION public.is_unlimited_test_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = _user_id
      AND u.email_confirmed_at IS NOT NULL
      AND lower(u.email) IN (
        'english4callcenters@gmail.com',
        'auxialeman@gmail.com',
        'leticiamgth@gmail.com',
        'lauranvallejom@gmail.com'
      )
  );
$$;