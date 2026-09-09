CREATE OR REPLACE FUNCTION public.is_unlimited_test_user(_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = _user_id
      AND lower(email) IN ('english4callcenters@gmail.com', 'auxialeman@gmail.com')
  );
$function$;