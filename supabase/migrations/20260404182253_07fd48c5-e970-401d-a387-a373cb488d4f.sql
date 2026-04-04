CREATE POLICY "allow anon insert jewelry"
ON public.jewelry_items
FOR INSERT
TO anon
WITH CHECK (true);