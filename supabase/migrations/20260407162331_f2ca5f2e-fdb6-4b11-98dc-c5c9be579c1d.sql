
-- Get overall market stats
CREATE OR REPLACE FUNCTION public.get_market_stats()
RETURNS JSON
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'total_comments', COALESCE(SUM(comments), 0),
    'total_likes', COALESCE(SUM(likes), 0),
    'top_model', (
      SELECT COALESCE(type, style, 'Bijou')
      FROM jewelry_items
      WHERE likes IS NOT NULL
      ORDER BY likes DESC
      LIMIT 1
    ),
    'dominant_style', (
      SELECT style
      FROM jewelry_items
      GROUP BY style
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ),
    'item_count', COUNT(*)
  )
  FROM jewelry_items;
$$;

-- Get style distribution (Beldi vs Moderne)
CREATE OR REPLACE FUNCTION public.get_style_distribution()
RETURNS JSON
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
  FROM (
    SELECT 
      style AS name,
      ROUND(COUNT(*)::numeric * 100.0 / NULLIF((SELECT COUNT(*) FROM jewelry_items), 0), 1) AS value
    FROM jewelry_items
    GROUP BY style
    ORDER BY COUNT(*) DESC
  ) t;
$$;

-- Get comments by type/category
CREATE OR REPLACE FUNCTION public.get_comments_by_type()
RETURNS JSON
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
  FROM (
    SELECT 
      COALESCE(type, style, 'Autre') AS name,
      COALESCE(SUM(comments), 0) AS comments,
      ROUND(
        CASE 
          WHEN LAG(SUM(comments)) OVER (ORDER BY SUM(comments)) = 0 THEN 0
          ELSE ((SUM(comments)::numeric - COALESCE(LAG(SUM(comments)) OVER (ORDER BY SUM(comments)), SUM(comments))) / NULLIF(LAG(SUM(comments)) OVER (ORDER BY SUM(comments)), 1) * 100)
        END, 0
      ) AS trend
    FROM jewelry_items
    GROUP BY COALESCE(type, style, 'Autre')
    ORDER BY SUM(comments) DESC
    LIMIT 8
  ) t;
$$;

-- Get top commented models
CREATE OR REPLACE FUNCTION public.get_top_models()
RETURNS JSON
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
  FROM (
    SELECT 
      COALESCE(description, content, 'Bijou tendance') AS model,
      COALESCE(comments, 0) AS comments,
      platform,
      CASE WHEN COALESCE(likes, 0) > 100 THEN 'up' ELSE 'down' END AS trend
    FROM jewelry_items
    WHERE comments IS NOT NULL AND comments > 0
    ORDER BY comments DESC
    LIMIT 5
  ) t;
$$;
