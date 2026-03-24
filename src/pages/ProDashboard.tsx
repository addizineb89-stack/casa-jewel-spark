import { useState } from "react";
import {
  ArrowLeft, TrendingUp, TrendingDown, Eye, MessageSquare,
  Flame, Settings, FileText, Globe, Search, Crown, Send, Phone
} from "lucide-react";
import ShopSettingsForm from "@/components/ShopSettingsForm";
import QuotationGenerator from "@/components/QuotationGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";

const GOLD_PRICES: Record<string, number> = { "18k": 523, "21k": 610, "24k": 697 };
const GOLD_TRENDS: Record<string, number> = { "18k": 1.2, "21k": 0.8, "24k": 1.5 };

const TOP_SCANNED = [
  { name: "Bague Beldi Fassi", scans: 342, trend: 18 },
  { name: "Chaîne Cartier-Style", scans: 287, trend: 12 },
  { name: "Bracelet Torsadé 21K", scans: 231, trend: -3 },
  { name: "Boucles Créoles Or", scans: 198, trend: 25 },
  { name: "Collier Ras-de-cou", scans: 176, trend: 9 },
];

const SOCIAL_HEATMAP = [
  { style: "Chaîne de cheville", mentions: 4200 },
  { style: "Bague Beldi", mentions: 3800 },
  { style: "Bracelet Cartier", mentions: 3100 },
  { style: "Collier Layering", mentions: 2700 },
  { style: "Créoles XL", mentions: 2400 },
];

const CUSTOMER_REQUESTS = [
  { user: "Fatima Z.", location: "Maârif", request: "Bague Beldi 18K, taille 54", time: "2h" },
  { user: "Youssef M.", location: "Derb Sultan", request: "Chaîne 60cm Cartier-style 21K", time: "4h" },
  { user: "Salma R.", location: "Ain Diab", request: "Bracelet torsadé pour mariage", time: "6h" },
];

const PRICE_HISTORY = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  gold18k: Math.round(510 + Math.sin(i / 4) * 15 + i * 0.4),
  gold24k: Math.round(680 + Math.sin(i / 3) * 20 + i * 0.6),
}));

const maxPrice = Math.max(...PRICE_HISTORY.map((d) => d.gold24k));

const ProDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [quoteWeight, setQuoteWeight] = useState("");
  const [quoteLabor, setQuoteLabor] = useState("");
  const [quoteProfit, setQuoteProfit] = useState("");
  const [quoteKarat, setQuoteKarat] = useState("18k");

  const weight = parseFloat(quoteWeight) || 0;
  const labor = parseFloat(quoteLabor) || 0;
  const profitPct = parseFloat(quoteProfit) || 0;
  const goldCost = weight * (GOLD_PRICES[quoteKarat] || 523);
  const profitAmount = (goldCost + labor) * (profitPct / 100);
  const totalQuote = goldCost + labor + profitAmount;

  const handleWhatsApp = () => {
    const lines = [
      shopName || "Casa Gold",
      "━━━━━━━━━━━━",
      t("quote.karat") + ": " + quoteKarat.toUpperCase(),
      t("quote.weight") + ": " + weight + "g",
      t("quote.gold") + ": " + goldCost.toFixed(0) + " MAD",
      t("quote.labor") + ": " + labor.toFixed(0) + " MAD",
      t("pro.profitLabel") + ": " + profitAmount.toFixed(0) + " MAD",
      "━━━━━━━━━━━━",
      t("quote.totalPrice") + ": " + totalQuote.toFixed(0) + " MAD",
    ];
    window.open("https://wa.me/?text=" + encodeURIComponent(lines.join("\n")), "_blank");
  };

  const maxMentions = Math.max(...SOCIAL_HEATMAP.map((s) => s.mentions));

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

        {/* Market Pulse Bar */}
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
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs font-body text-accent">+{GOLD_TRENDS["18k"]}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-muted-foreground">{t("pro.gold21k")}</span>
              <span className="font-display font-bold text-foreground">{GOLD_PRICES["21k"]}</span>
              <span className="text-xs text-muted-foreground">{t("pro.perGram")}</span>
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs font-body text-accent">+{GOLD_TRENDS["21k"]}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-muted-foreground">{t("pro.gold24k")}</span>
              <span className="font-display font-bold text-foreground">{GOLD_PRICES["24k"]}</span>
              <span className="text-xs text-muted-foreground">{t("pro.perGram")}</span>
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs font-body text-accent">+{GOLD_TRENDS["24k"]}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
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
            <TabsTrigger value="settings" className="font-body data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground gap-2">
              <Settings className="w-4 h-4" /> {t("pro.tab.shopSettings")}
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Gold Price Mini Chart (CSS bars) */}
            <Card className="relative overflow-hidden">
              <div className="zellige-card" />
              <CardHeader className="relative">
                <CardTitle className="font-display text-lg text-foreground">{t("pro.priceEvolution")}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-end gap-0.5 h-40">
                  {PRICE_HISTORY.map((d) => (
                    <div
                      key={d.day}
                      className="flex-1 gold-gradient rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: (d.gold24k / maxPrice) * 100 + "%" }}
                      title={"J" + d.day + ": " + d.gold24k + " MAD/g (24K)"}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground font-body">
                  <span>J1</span>
                  <span>J15</span>
                  <span>J30</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Scanned */}
              <Card className="relative overflow-hidden h-full">
                <div className="zellige-card" />
                <CardHeader className="relative">
                  <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                    <Search className="w-5 h-5 text-gold" /> {t("pro.topScanned")}
                  </CardTitle>
                  <CardDescription className="font-body">{t("pro.topScannedSub")}</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-3">
                  {TOP_SCANNED.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="font-body text-sm text-foreground">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-body">{item.scans} {t("pro.scans")}</span>
                        {item.trend >= 0 ? (
                          <Badge variant="secondary" className="text-xs gap-1 border-0">
                            <TrendingUp className="w-3 h-3" /> +{item.trend}%
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-destructive text-xs gap-1 border-0">
                            <TrendingDown className="w-3 h-3" /> {item.trend}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Heatmap (CSS bars) */}
              <Card className="relative overflow-hidden h-full">
                <div className="zellige-card" />
                <CardHeader className="relative">
                  <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                    <Flame className="w-5 h-5 text-gold" /> {t("pro.socialHeatmap")}
                  </CardTitle>
                  <CardDescription className="font-body">{t("pro.socialHeatmapSub")}</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-3">
                  {SOCIAL_HEATMAP.map((item) => (
                    <div key={item.style}>
                      <div className="flex justify-between text-xs font-body mb-1">
                        <span className="text-foreground">{item.style}</span>
                        <span className="text-muted-foreground">{item.mentions.toLocaleString()} {t("pro.mentions")}</span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full gold-gradient rounded-full transition-all"
                          style={{ width: (item.mentions / maxMentions) * 100 + "%" }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Quotation Maker */}
              <Card className="relative overflow-hidden h-full">
                <div className="zellige-card" />
                <CardHeader className="relative">
                  <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold" /> {t("pro.quotationMaker")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <div>
                    <Label className="font-body text-sm">{t("pro.shopName")}</Label>
                    <Input
                      placeholder={t("pro.shopNamePlaceholder")}
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["18k", "21k", "24k"].map((k) => (
                      <button
                        key={k}
                        onClick={() => setQuoteKarat(k)}
                        className={
                          "py-2 rounded-lg text-sm font-body font-medium transition-all " +
                          (quoteKarat === k
                            ? "gold-gradient text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-accent")
                        }
                      >
                        {k.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="font-body text-xs">{t("pricing.weight")}</Label>
                      <Input
                        type="number" placeholder={t("pricing.weightPlaceholder")}
                        value={quoteWeight} onChange={(e) => setQuoteWeight(e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label className="font-body text-xs">{t("pricing.labor")}</Label>
                      <Input
                        type="number" placeholder={t("pricing.laborPlaceholder")}
                        value={quoteLabor} onChange={(e) => setQuoteLabor(e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label className="font-body text-xs">{t("pro.profitMargin")}</Label>
                      <Input
                        type="number" placeholder={t("pro.profitPlaceholder")}
                        value={quoteProfit} onChange={(e) => setQuoteProfit(e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  {weight > 0 && (
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                      <p className="text-xs text-muted-foreground font-body">{t("pro.quotePreview")}</p>
                      <p className="font-display font-bold text-lg gold-text">{shopName || "Casa Gold"}</p>
                      <div className="grid grid-cols-2 gap-1 text-sm font-body">
                        <span className="text-muted-foreground">{t("pricing.goldCost")}:</span>
                        <span className="text-foreground font-medium">{goldCost.toFixed(0)} MAD</span>
                        <span className="text-muted-foreground">{t("pricing.laborCost")}:</span>
                        <span className="text-foreground font-medium">{labor.toFixed(0)} MAD</span>
                        <span className="text-muted-foreground">{t("pro.profitLabel")}:</span>
                        <span className="text-foreground font-medium">{profitAmount.toFixed(0)} MAD</span>
                      </div>
                      <div className="border-t border-border pt-2 flex items-center justify-between">
                        <span className="font-display font-bold text-foreground">{t("pricing.total")}</span>
                        <span className="font-display font-bold text-lg gold-text">{totalQuote.toFixed(0)} MAD</span>
                      </div>
                      <Button onClick={handleWhatsApp} className="w-full gold-gradient text-primary-foreground border-0 gap-2 hover:opacity-90">
                        <Send className="w-4 h-4" /> {t("pro.shareWhatsapp")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customer Requests */}
              <Card className="relative overflow-hidden h-full">
                <div className="zellige-card" />
                <CardHeader className="relative">
                  <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gold" /> {t("pro.customerRequests")}
                  </CardTitle>
                  <CardDescription className="font-body">{t("pro.customerRequestsSub")}</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  {CUSTOMER_REQUESTS.map((req, i) => (
                    <div key={i} className="bg-secondary/30 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm font-medium text-foreground">{req.user}</span>
                        <span className="text-xs text-muted-foreground font-body">{req.location} · {req.time}</span>
                      </div>
                      <p className="text-sm font-body text-muted-foreground">
                        <span className="text-gold font-medium">{t("pro.lookingFor")}:</span> {req.request}
                      </p>
                      <Button variant="outline" size="sm" className="text-xs gap-1.5 border-border text-gold">
                        <Phone className="w-3 h-3" /> {t("pro.contact")}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
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
