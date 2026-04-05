import { motion } from "framer-motion";
import { Flame, Heart, Bookmark, Eye, MapPin, ExternalLink, RefreshCw, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function formatLikes(n: number | null): string {
  if (!n) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "< 1h";
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}j`;
}

const PLACEHOLDER_IMG = "/placeholder.svg";

const SkeletonCard = () => (
  <div className="bg-card rounded-lg overflow-hidden shadow-[var(--shadow-card)]">
    <Skeleton className="aspect-square w-full" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

const TrendGrid = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const { data: items, isLoading, error, refetch } = useQuery({
    queryKey: ["trending-jewelry"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jewelry_items")
        .select("id, image_url, source_url, platform, style, type, description, estimated_price_mad, likes, comments, viral_score, scraped_at, thumbnail, content, shares, username")
        .order("likes", { ascending: false })
        .limit(24);
      if (error) throw error;
      return data;
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    toast({ title: saved.has(id) ? t("trends.removedFromCatalog") : t("trends.savedToCatalog") });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-destructive font-body mb-4">Erreur de chargement des tendances</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" /> Réessayer
        </Button>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Flame className="w-12 h-12 text-gold mb-4" />
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">🔥 Les tendances bijoutières arrivent bientôt</h3>
        <p className="text-muted-foreground font-body text-sm max-w-md">
          Nous collectons les dernières données Instagram & TikTok du Maroc
        </p>
      </div>
    );
  }

  const latestScrape = items.reduce((latest, item) =>
    item.scraped_at > latest ? item.scraped_at : latest, items[0].scraped_at
  );

  return (
    <div>
      <p className="text-xs text-muted-foreground font-body mb-3">
        {items.length} tendances • Dernière mise à jour il y a {timeAgo(latestScrape)}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group bg-card rounded-lg overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow relative"
          >
            <div className="zellige-card" />
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.image_url || (item as any).thumbnail || PLACEHOLDER_IMG}
                alt={item.description || (item as any).content || "Bijou tendance"}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
              />
              <div className="absolute top-3 start-3 flex gap-2">
                {item.viral_score != null && (
                  <Badge className="gold-gradient text-primary-foreground text-xs border-0 font-body">
                    <Flame className="w-3 h-3 me-1" />
                    {item.viral_score ?? Math.min(99, Math.round(((item.likes ?? 0) + (item.comments ?? 0) * 2) / 100))}%
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs font-body bg-card/90 backdrop-blur-sm text-foreground">
                  {item.platform}
                </Badge>
              </div>
              <div className="absolute top-3 end-3 flex gap-1">
                {item.source_url && (
                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-foreground" />
                  </a>
                )}
                <button
                  onClick={() => toggleSave(item.id)}
                  className="w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                >
                  <Bookmark className={`w-4 h-4 ${saved.has(item.id) ? 'fill-gold text-gold' : 'text-foreground'}`} />
                </button>
              </div>
              <div className="absolute bottom-3 start-3 flex gap-2">
                {item.style && (
                  <Badge variant="outline" className="text-xs font-body bg-card/90 backdrop-blur-sm border-0 text-foreground">
                    {item.style}
                  </Badge>
                )}
                {item.type && (
                  <Badge variant="outline" className="text-xs font-body bg-card/90 backdrop-blur-sm border-0 text-foreground gap-1">
                    <Tag className="w-3 h-3" /> {item.type}
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-4 relative z-10">
              <h4 className="font-display font-semibold text-foreground line-clamp-2 text-sm">
                {item.description || (item as any).content || "Bijou tendance"}
              </h4>
              {(item as any).username && (
                <p className="text-xs text-muted-foreground font-body mt-1">@{(item as any).username}</p>
              )}
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground font-body">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-gold" /> {formatLikes(item.likes)}
                </span>
                {item.estimated_price_mad != null && (
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    ~{Number(item.estimated_price_mad).toLocaleString()} MAD
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {t("trends.trending")}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendGrid;
