import { TrendingUp, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useGoldPrices } from "@/hooks/useGoldPrices";

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)}h`;
  return `il y a ${Math.floor(diff / 86400)}j`;
}

const GoldTicker = () => {
  const { t } = useLanguage();
  const { prices, loading } = useGoldPrices();

  const PriceItem = ({ label, price, mobileOnly = false }: { label: string; price: number; mobileOnly?: boolean }) => (
    <div className={`flex items-center gap-3 px-6 ${mobileOnly ? "" : "hidden md:flex"}`}>
      <span className="text-primary-foreground/70 text-sm font-body font-medium">{label}</span>
      <span className="text-primary-foreground font-display font-bold text-lg">
        {price.toFixed(2)} MAD/g
      </span>
      <span className="flex items-center gap-1 text-sm font-medium text-green-300">
        <TrendingUp className="w-3 h-3" />
        Live
      </span>
    </div>
  );

  const Dot = ({ className = "" }: { className?: string }) => (
    <span className={`text-primary-foreground/30 mx-2 ${className}`}>•</span>
  );

  return (
    <div className="gold-gradient-dark overflow-hidden">
      <div className="flex items-center h-12">
        {/* Live label - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 px-4 border-e border-primary-foreground/20">
          <div className="w-2 h-2 rounded-full bg-green-400 pulse-gold" />
          <span className="text-primary-foreground/80 text-xs font-body font-semibold uppercase tracking-wider">{t("ticker.live")}</span>
          {prices.updatedAt && (
            <span className="flex items-center gap-1 text-primary-foreground/50 text-xs font-body">
              <Clock className="w-3 h-3" />
              {timeAgo(prices.updatedAt)}
            </span>
          )}
        </div>
        {/* Gold price label - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 px-4 border-e border-primary-foreground/20">
          <span className="text-primary-foreground/60 text-xs font-body">{t("ticker.goldPrice")}</span>
        </div>

        {/* Mobile: green dot + only 18K & 24K */}
        <div className="flex md:hidden items-center gap-2 px-3 border-e border-primary-foreground/20">
          <div className="w-2 h-2 rounded-full bg-green-400 pulse-gold" />
        </div>

        {loading ? (
          <div className="flex items-center px-6">
            <span className="text-primary-foreground/60 text-sm font-body animate-pulse">Chargement...</span>
          </div>
        ) : null}

        {/* Mobile: only 18K and 24K */}
        <div className={`flex md:hidden items-center whitespace-nowrap ${loading ? "opacity-50" : ""}`}>
          <PriceItem label="18K" price={prices["18k"]} mobileOnly />
          <Dot />
          <PriceItem label="24K" price={prices["24k"]} mobileOnly />
        </div>

        {/* Desktop: all karats */}
        <div className={`ticker-scroll hidden md:flex items-center whitespace-nowrap ${loading ? "opacity-50" : ""}`}>
          <PriceItem label="Or 9K" price={prices["9k"]} />
          <Dot className="hidden md:inline" />
          <PriceItem label="Or 14K" price={prices["14k"]} />
          <Dot className="hidden md:inline" />
          <PriceItem label="Or 18K" price={prices["18k"]} />
          <Dot className="hidden md:inline" />
          <PriceItem label="Or 21K" price={prices["21k"]} />
          <Dot className="hidden md:inline" />
          <PriceItem label="Or 22K" price={prices["22k"]} />
          <Dot className="hidden md:inline" />
          <PriceItem label="Or 24K" price={prices["24k"]} />
        </div>
      </div>
    </div>
  );
};

export default GoldTicker;
