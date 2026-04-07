import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MarketStats {
  total_comments: number;
  total_likes: number;
  top_model: string;
  dominant_style: string;
  item_count: number;
}

interface StyleDistribution {
  name: string;
  value: number;
}

interface CommentsByType {
  name: string;
  comments: number;
  trend: number;
}

interface TopModel {
  model: string;
  comments: number;
  platform: string;
  trend: string;
}

export function useMarketInsights() {
  const stats = useQuery({
    queryKey: ["market-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_market_stats");
      if (error) throw error;
      return data as unknown as MarketStats;
    },
  });

  const styles = useQuery({
    queryKey: ["style-distribution"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_style_distribution");
      if (error) throw error;
      return (data as unknown as StyleDistribution[]) || [];
    },
  });

  const comments = useQuery({
    queryKey: ["comments-by-type"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_comments_by_type");
      if (error) throw error;
      return (data as unknown as CommentsByType[]) || [];
    },
  });

  const models = useQuery({
    queryKey: ["top-models"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_top_models");
      if (error) throw error;
      return (data as unknown as TopModel[]) || [];
    },
  });

  const loading = stats.isLoading || styles.isLoading || comments.isLoading || models.isLoading;

  return {
    stats: stats.data,
    styles: styles.data || [],
    comments: comments.data || [],
    models: models.data || [],
    loading,
  };
}
