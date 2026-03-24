import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

const GoldTicker = () => {
  const [prices, setPrices] = useState({
    gold24k: 742.50,
    gold18k: 556.88,
    change24k: 1.2,
    change18k: 0.9,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => ({
        gold24k: prev.gold24k + (Math.random() - 0.48) * 2,
        gold18k: prev.gold18k + (Math.random() - 0.48) * 1.5,
        change24k: prev.change24k + (Math.random() - 0.5) * 0.1,
        change18k: prev.change18k + (Math.random() - 0.5) * 0.08,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const PriceItem = ({ label, price, change }: { label: string; price: number; change: number }) => (
    <div className="flex items-center gap-3 px-6">
      <span className="text-primary-foreground/70 text-sm font-body font-medium">{label}</span>
      <span className="text-primary-foreground font-display font-bold text-lg">
        {price.toFixed(2)} MAD/g
      </span>
      <span className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
        {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {change >= 0 ? '+' : ''}{change.toFixed(2)}%
      </span>
    </div>
  );

  return (
    <div className="gold-gradient-dark overflow-hidden">
      <div className="flex items-center h-12">
        <div className="flex items-center gap-2 px-4 border-r border-primary-foreground/20">
          <div className="w-2 h-2 rounded-full bg-green-400 pulse-gold" />
          <span className="text-primary-foreground/80 text-xs font-body font-semibold uppercase tracking-wider">Live</span>
        </div>
        <div className="ticker-scroll flex items-center whitespace-nowrap">
          <PriceItem label="Or 24K" price={prices.gold24k} change={prices.change24k} />
          <span className="text-primary-foreground/30 mx-2">•</span>
          <PriceItem label="Or 18K" price={prices.gold18k} change={prices.change18k} />
          <span className="text-primary-foreground/30 mx-2">•</span>
          <PriceItem label="Or 24K" price={prices.gold24k} change={prices.change24k} />
          <span className="text-primary-foreground/30 mx-2">•</span>
          <PriceItem label="Or 18K" price={prices.gold18k} change={prices.change18k} />
        </div>
      </div>
    </div>
  );
};

export default GoldTicker;
