import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Flame, Calculator, Camera, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoldTicker from "@/components/GoldTicker";
import DashboardHeader from "@/components/DashboardHeader";
import PricingCalculator from "@/components/PricingCalculator";
import TrendGrid from "@/components/TrendGrid";
import MarketInsights from "@/components/MarketInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GoldTicker />
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="trends" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Flame className="w-4 h-4" /> Tendances
            </TabsTrigger>
            <TabsTrigger value="pricing" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Calculator className="w-4 h-4" /> Calculateur
            </TabsTrigger>
            <TabsTrigger value="insights" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <BarChart3 className="w-4 h-4" /> Market Insights
            </TabsTrigger>
            <TabsTrigger value="visual" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Camera className="w-4 h-4" /> Recherche Visuelle
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground">Trend Hunter</h2>
                  <p className="text-sm text-muted-foreground font-body">Modèles les plus viraux sur Instagram & TikTok au Maroc</p>
                </div>
              </div>
              <TrendGrid />
            </motion.div>
          </TabsContent>

          <TabsContent value="pricing">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="max-w-lg mx-auto">
                <PricingCalculator />
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="insights">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-4">
                <h2 className="text-xl font-display font-bold text-foreground">Market Insights</h2>
                <p className="text-sm text-muted-foreground font-body">Analyse des tendances du marché bijoutier marocain</p>
              </div>
              <MarketInsights />
            </motion.div>
          </TabsContent>

          <TabsContent value="visual">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full bg-card border-2 border-dashed border-gold flex items-center justify-center mb-6">
                  <Camera className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">Recherche Visuelle</h3>
                <p className="text-muted-foreground font-body text-center max-w-md mb-6">
                  Prenez une photo d'un bijou et trouvez des modèles similaires avec leur popularité sur le marché.
                </p>
                <button className="gold-gradient text-primary-foreground px-6 py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Search className="w-4 h-4" /> Activer la Caméra
                </button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
