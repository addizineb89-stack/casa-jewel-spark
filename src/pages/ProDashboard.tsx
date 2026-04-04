import { useState } from "react";
import {
  ArrowLeft, TrendingUp, Eye, MessageSquare,
  Flame, Settings, FileText, Globe, Search, Crown, Send, Phone, BarChart3
} from "lucide-react";
import ShopSettingsForm from "@/components/ShopSettingsForm";
import QuotationGenerator from "@/components/QuotationGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import { useGoldPrices } from "@/hooks/useGoldPrices";
import SocialContentGenerator from "@/components/SocialContentGenerator";

const ProDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { prices: GOLD_PRICES } = useGoldPrices();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Back + Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-bold gold-text">{t("pro.title")}</h1>
                <Badge className="gold-gradient text-primary-foreground border-0">
                  <Crown className="w-3 h-3 me-1" /> {t("pro.badge")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-body">{t("pro.subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Market Pulse Bar — REAL prices from API */}
        <Card className="mb-6 relative overflow-hidden">
          <div className="zellige-card" />
          <CardContent className="relative flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-gold" />
              <span className="font-display font-semibold text-foreground">{t("pro.marketPulse")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-muted-foreground">{t("pro.gold18k")}</span>
              <span className="font-display font-bold text-foreground">{GOLD_PRICES["18k"]}</span>
              <span className="text-xs text-muted-foreground">{t("pro.perGram")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-muted-foreground">{t("pro.gold21k")}</span>
              <span className="font-display font-bold text-foreground">{GOLD_PRICES["21k"]}</span>
              <span className="text-xs text-muted-foreground">{t("pro.perGram")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-muted-foreground">{t("pro.gold24k")}</span>
              <span className="font-display font-bold text-foreground">{GOLD_PRICES["24k"]}</span>
              <span className="text-xs text-muted-foreground">{t("pro.perGram")}</span>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="overview" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Eye className="w-4 h-4" /> {t("pro.tab.overview")}
            </TabsTrigger>
            <TabsTrigger value="global" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Globe className="w-4 h-4" /> {t("pro.tab.globalTrends")}
            </TabsTrigger>
            <TabsTrigger value="quotes" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <FileText className="w-4 h-4" /> {t("pro.tab.myQuotes")}
            </TabsTrigger>
            <TabsTrigger value="social" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Send className="w-4 h-4" /> Social AI
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Settings className="w-4 h-4" /> {t("pro.tab.shopSettings")}
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Gold Price Today — REAL data */}
            <Card className="relative overflow-hidden">
              <div className="zellige-card" />
              <CardHeader className="relative">
                <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  {t("pro.priceEvolution")}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground font-body mb-1">Or 18K aujourd'hui</p>
                    <p className="font-display font-bold text-2xl gold-text">{GOLD_PRICES["18k"]} <span className="text-sm">MAD/g</span></p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground font-body mb-1">Or 21K aujourd'hui</p>
                    <p className="font-display font-bold text-2xl gold-text">{GOLD_PRICES["21k"]} <span className="text-sm">MAD/g</span></p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground font-body mb-1">Or 24K aujourd'hui</p>
                    <p className="font-display font-bold text-2xl gold-text">{GOLD_PRICES["24k"]} <span className="text-sm">MAD/g</span></p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-body text-center">
                  Données historiques (variation 24h et 7 jours) bientôt disponibles
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Statistics placeholder */}
              <Card className="relative overflow-hidden h-full">
                <div className="zellige-card" />
                <CardHeader className="relative">
                  <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gold" /> 📊 Statistiques
                  </CardTitle>
                  <CardDescription className="font-body">Vos performances de vente</CardDescription>
                </CardHeader>
                <CardContent className="relative flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground font-body text-sm mb-4">
                    Quand vous aurez envoyé vos premiers devis, vos statistiques apparaîtront ici.
                  </p>
                  <Button
                    onClick={() => setActiveTab("quotes")}
                    className="gold-gradient text-primary-foreground border-0 gap-2 hover:opacity-90"
                  >
                    <FileText className="w-4 h-4" /> Créer mon premier devis →
                  </Button>
                </CardContent>
              </Card>

              {/* Social trends placeholder */}
              <Card className="relative overflow-hidden h-full">
                <div className="zellige-card" />
                <CardHeader className="relative">
                  <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                    <Flame className="w-5 h-5 text-gold" /> 🔥 Tendances du marché
                  </CardTitle>
                  <CardDescription className="font-body">Styles en vogue au Maroc</CardDescription>
                </CardHeader>
                <CardContent className="relative flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground font-body text-sm mb-4">
                    Les tendances seront alimentées par les données réelles du marché marocain.
                  </p>
                  <Badge variant="secondary" className="text-xs">Bientôt disponible</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Customer Requests placeholder */}
            <Card className="relative overflow-hidden">
              <div className="zellige-card" />
              <CardHeader className="relative">
                <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gold" /> 💬 Demandes de clients
                </CardTitle>
                <CardDescription className="font-body">Demandes de bijoux dans votre région</CardDescription>
              </CardHeader>
              <CardContent className="relative flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground font-body text-sm mb-4">
                  Quand des clients chercheront un bijoutier dans votre ville, leurs demandes apparaîtront ici.
                </p>
                <Button
                  onClick={() => setActiveTab("settings")}
                  variant="outline"
                  className="border-border gap-2"
                >
                  <Settings className="w-4 h-4" /> Compléter mon profil boutique →
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GLOBAL TRENDS TAB */}
          <TabsContent value="global">
            <Card className="relative overflow-hidden">
              <div className="zellige-card" />
              <CardContent className="relative flex flex-col items-center justify-center py-20">
                <Globe className="w-16 h-16 text-gold mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t("pro.globalTrendsTitle")}</h3>
                <p className="text-muted-foreground font-body text-center max-w-md">{t("pro.globalTrendsSub")}</p>
                <Badge variant="secondary" className="mt-4">{t("pro.comingSoon")}</Badge>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MY QUOTES TAB */}
          <TabsContent value="quotes">
            <QuotationGenerator />
          </TabsContent>

          {/* SOCIAL AI TAB */}
          <TabsContent value="social" className="space-y-6">
            <SocialContentGenerator />
          </TabsContent>

          {/* SHOP SETTINGS TAB */}
          <TabsContent value="settings">
            <ShopSettingsForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProDashboard;
