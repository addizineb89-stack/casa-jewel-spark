import { useState } from "react";
import { motion } from "framer-motion";
import { Diamond, ArrowLeft, Gem, Search, Bell, History, Calculator, BarChart3, MessageSquare, MapPin, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import PaymentDialog from "@/components/PaymentDialog";

const Subscription = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"client" | "pro">("client");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "", price: 0 });

  const openPayment = (name: string, price: number) => {
    setSelectedPlan({ name, price });
    setPaymentOpen(true);
  };

  const clientFreeFeatures = [
    { icon: Search, label: t("sub.feat.visualFree") },
    { icon: BarChart3, label: t("sub.feat.livePrice") },
    { icon: Globe, label: t("sub.feat.basicTrends") },
  ];

  const clientPremiumFeatures = [
    { icon: Search, label: t("sub.feat.visualUnlimited") },
    { icon: Bell, label: t("sub.feat.whatsappAlerts") },
    { icon: Calculator, label: t("sub.feat.zakatCalc") },
    { icon: History, label: t("sub.feat.scanHistory") },
  ];

  const proFeatures = [
    { icon: BarChart3, label: t("sub.feat.fullInsights") },
    { icon: MessageSquare, label: t("sub.feat.whatsappLogo") },
    { icon: MapPin, label: t("sub.feat.priorityListing") },
    { icon: Globe, label: t("sub.feat.trendScraping") },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Back button */}
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 text-muted-foreground gap-2">
          <ArrowLeft className="w-4 h-4" /> {t("sub.back")}
        </Button>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold gold-text mb-2">{t("sub.title")}</h1>
          <p className="text-muted-foreground font-body">{t("sub.subtitle")}</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-card border border-border rounded-full p-1 flex gap-1">
            <button
              onClick={() => setMode("client")}
              className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all ${
                mode === "client" ? "gold-gradient text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Diamond className="w-4 h-4 inline-block me-2" />
              {t("sub.toggleClient")}
            </button>
            <button
              onClick={() => setMode("pro")}
              className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all ${
                mode === "pro" ? "gold-gradient text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Gem className="w-4 h-4 inline-block me-2" />
              {t("sub.togglePro")}
            </button>
          </div>
        </div>

        {/* Plans */}
        {mode === "client" ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
              <Card className="relative overflow-hidden border-border h-full">
                <div className="zellige-card" />
                <CardHeader className="relative">
                  <CardTitle className="font-display text-xl text-foreground">{t("sub.clientFree.name")}</CardTitle>
                  <CardDescription className="font-body">{t("sub.clientFree.desc")}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-display font-bold text-foreground">0 DH</span>
                    <span className="text-muted-foreground font-body text-sm"> / {t("sub.month")}</span>
                  </div>
                </CardHeader>
                <CardContent className="relative space-y-3">
                  {clientFreeFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 font-body text-sm text-foreground">
                      <f.icon className="w-4 h-4 text-gold shrink-0" />
                      <span>{f.label}</span>
                    </div>
                  ))}
                  <Button variant="outline" disabled className="w-full mt-4 border-border opacity-60">
                    Plan actuel ✓
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Premium */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
              <Card className="relative overflow-hidden border-gold/30 gold-glow h-full">
                <div className="zellige-card" />
                <CardHeader className="relative">
                  <div className="flex gap-2 mb-2">
                    <Badge className="w-fit gold-gradient text-primary-foreground border-0">{t("sub.recommended")}</Badge>
                    <Badge variant="outline" className="w-fit border-gold/40 text-gold text-xs">Essai gratuit 7 jours</Badge>
                  </div>
                  <CardTitle className="font-display text-xl gold-text">{t("sub.clientPremium.name")}</CardTitle>
                  <CardDescription className="font-body">{t("sub.clientPremium.desc")}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-display font-bold gold-text">99 DH</span>
                    <span className="text-muted-foreground font-body text-sm"> / {t("sub.month")}</span>
                  </div>
                </CardHeader>
                <CardContent className="relative space-y-3">
                  {clientPremiumFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 font-body text-sm text-foreground">
                      <f.icon className="w-4 h-4 text-gold shrink-0" />
                      <span>{f.label}</span>
                    </div>
                  ))}
                  <button
                    onClick={() => openPayment("L'Expérience Aura", 99)}
                    className="block w-full mt-4 gold-gradient text-primary-foreground py-2.5 rounded-lg font-body font-medium hover:opacity-90 transition-opacity gold-glow text-center"
                  >
                    {t("sub.choosePlan")}
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
              <Card className="relative overflow-hidden border-gold/30 gold-glow">
                <div className="zellige-card" />
                <CardHeader className="relative text-center">
                  <Badge className="w-fit mx-auto gold-gradient text-primary-foreground border-0 mb-2">{t("sub.pro")}</Badge>
                  <CardTitle className="font-display text-2xl gold-text">{t("sub.proplan.name")}</CardTitle>
                  <CardDescription className="font-body">{t("sub.proplan.tagline")}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-display font-bold gold-text">499 DH</span>
                    <span className="text-muted-foreground font-body text-sm"> / {t("sub.month")}</span>
                  </div>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  {proFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 font-body text-sm text-foreground">
                      <f.icon className="w-5 h-5 text-gold shrink-0" />
                      <span>{f.label}</span>
                    </div>
                  ))}
                  <button
                    onClick={() => openPayment("Pro Partner", 499)}
                    className="block w-full mt-4 gold-gradient text-primary-foreground py-3 rounded-lg font-body font-semibold hover:opacity-90 transition-opacity gold-glow text-base text-center"
                  >
                    {t("sub.choosePlan")}
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Badge variant="secondary" className="px-4 py-2 text-sm font-body bg-card border border-border">
            <Heart className="w-4 h-4 me-2 text-gold inline-block" />
            Lancé avec ❤️ à Casablanca pour les bijoutiers marocains
          </Badge>
        </motion.div>
      </main>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        planName={selectedPlan.name}
        planPrice={selectedPlan.price}
      />
    </div>
  );
};

export default Subscription;
