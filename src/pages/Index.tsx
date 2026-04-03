import { motion } from "framer-motion";
import { BarChart3, Flame, Calculator, Camera, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoldTicker from "@/components/GoldTicker";
import DashboardHeader from "@/components/DashboardHeader";
import PricingCalculator from "@/components/PricingCalculator";
import TrendGrid from "@/components/TrendGrid";
import MarketInsights from "@/components/MarketInsights";
import SocialContentGenerator from "@/components/SocialContentGenerator";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <GoldTicker />
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="trends" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Flame className="w-4 h-4" /> {t("tab.trends")}
            </TabsTrigger>
            <TabsTrigger value="pricing" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Calculator className="w-4 h-4" /> {t("tab.pricing")}
            </TabsTrigger>
            <TabsTrigger value="insights" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <BarChart3 className="w-4 h-4" /> {t("tab.insights")}
            </TabsTrigger>
            <TabsTrigger value="post" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Camera className="w-4 h-4" /> Mon Post
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground">{t("trends.title")}</h2>
                  <p className="text-sm text-muted-foreground font-body">{t("trends.subtitle")}</p>
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
                <h2 className="text-xl font-display font-bold text-foreground">{t("insights.title")}</h2>
                <p className="text-sm text-muted-foreground font-body">{t("insights.subtitle")}</p>
              </div>
              <MarketInsights />
            </motion.div>
          </TabsContent>

          <TabsContent value="post">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SocialContentGenerator />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Bottom padding for mobile nav */}
        <div className="h-16 md:hidden" />
      </main>
    </div>
  );
};

export default Index;
