
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS url text;
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS post_url text;
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS hashtags text;
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS shares integer DEFAULT 0;
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS username text;
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS media_type text;
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS thumbnail text;
ALTER TABLE public.jewelry_items ADD COLUMN IF NOT EXISTS "timestamp" timestamptz;
