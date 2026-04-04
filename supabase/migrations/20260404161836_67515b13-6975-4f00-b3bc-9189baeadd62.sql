
CREATE TABLE public.jewelry_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  source_url TEXT,
  platform TEXT NOT NULL DEFAULT 'instagram',
  style TEXT NOT NULL DEFAULT 'Moderne',
  type TEXT,
  description TEXT,
  estimated_price_mad NUMERIC,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  viral_score INTEGER DEFAULT 0,
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.jewelry_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jewelry public read"
  ON public.jewelry_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage jewelry_items"
  ON public.jewelry_items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
