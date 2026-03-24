import { motion } from "framer-motion";
import { Flame, Heart, Bookmark, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import jewelry1 from "@/assets/jewelry-1.jpg";
import jewelry2 from "@/assets/jewelry-2.jpg";
import jewelry3 from "@/assets/jewelry-3.jpg";
import jewelry4 from "@/assets/jewelry-4.jpg";
import jewelry5 from "@/assets/jewelry-5.jpg";
import jewelry6 from "@/assets/jewelry-6.jpg";

const trendingItems = [
  { id: 1, image: jewelry1, name: "Bracelet Beldi Royal", viralScore: 94, likes: "12.4K", platform: "Instagram", style: "Beldi" },
  { id: 2, image: jewelry2, name: "Collier Pendentif Moderne", viralScore: 87, likes: "8.9K", platform: "TikTok", style: "Moderne" },
  { id: 3, image: jewelry3, name: "Bague Filigrane Fès", viralScore: 82, likes: "6.2K", platform: "Instagram", style: "Beldi" },
  { id: 4, image: jewelry4, name: "Boucles Zellige Or", viralScore: 79, likes: "5.8K", platform: "TikTok", style: "Beldi" },
  { id: 5, image: jewelry5, name: "Gourmette Cuban Link", viralScore: 91, likes: "11.1K", platform: "Instagram", style: "Moderne" },
  { id: 6, image: jewelry6, name: "Manchette Arabesque", viralScore: 76, likes: "4.5K", platform: "Instagram", style: "Beldi" },
];

const TrendGrid = () => {
  const { toast } = useToast();
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const toggleSave = (id: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    toast({ title: saved.has(id) ? "Retiré du catalogue" : "Ajouté au catalogue ✨" });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {trendingItems.map((item, i) => (
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
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="gold-gradient text-primary-foreground text-xs border-0 font-body">
                <Flame className="w-3 h-3 mr-1" />
                {item.viralScore}%
              </Badge>
              <Badge variant="secondary" className="text-xs font-body bg-card/90 backdrop-blur-sm text-foreground">
                {item.platform}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <button
                onClick={() => toggleSave(item.id)}
                className="w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${saved.has(item.id) ? 'fill-gold text-gold' : 'text-foreground'}`} />
              </button>
            </div>
            <div className="absolute bottom-3 left-3">
              <Badge variant="outline" className="text-xs font-body bg-card/90 backdrop-blur-sm border-0 text-foreground">
                {item.style}
              </Badge>
            </div>
          </div>
          <div className="p-4 relative z-10">
            <h4 className="font-display font-semibold text-foreground">{item.name}</h4>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground font-body">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-gold" /> {item.likes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Tendance
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrendGrid;
