import { useState, useRef, useEffect } from "react";
import {
  Camera, Upload, Send, FileText, ImageIcon, Eye,
  Gem, Scale, Coins, Phone, Clock, X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useGoldPrices } from "@/hooks/useGoldPrices";

const TREND_MODELS = [
  { name: "Bague Beldi Fassi", img: "💍" },
  { name: "Chaîne Cartier-Style", img: "📿" },
  { name: "Bracelet Torsadé 21K", img: "⌚" },
  { name: "Boucles Créoles Or", img: "✨" },
  { name: "Collier Ras-de-cou", img: "💎" },
];

const RECENT_NUMBERS_KEY = "aura_recent_wa_numbers";

function getRecentNumbers(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_NUMBERS_KEY) || "[]").slice(0, 5);
  } catch { return []; }
}

function saveRecentNumber(num: string) {
  const recent = getRecentNumbers().filter(n => n !== num);
  recent.unshift(num);
  localStorage.setItem(RECENT_NUMBERS_KEY, JSON.stringify(recent.slice(0, 5)));
}

function formatPhoneForWA(phone: string): string {
  return phone.replace(/[\s\-\+\(\)]/g, "");
}

function isValidPhone(phone: string): boolean {
  const cleaned = formatPhoneForWA(phone);
  return /^\d{10,15}$/.test(cleaned);
}

const QuotationGenerator = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { prices: GOLD_PRICES } = useGoldPrices();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");
  const [karat, setKarat] = useState("18k");
  const [weight, setWeight] = useState("");
  const [labor, setLabor] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [recentNumbers, setRecentNumbers] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    setRecentNumbers(getRecentNumbers());
  }, []);

  const shopName = "Aura Gold";
  const shopLogo: string | null = null;

  const weightNum = parseFloat(weight) || 0;
  const laborNum = parseFloat(labor) || 0;
  const goldPrice = Number(GOLD_PRICES[karat as keyof typeof GOLD_PRICES]);
  const goldCost = weightNum * goldPrice;
  const totalPrice = goldCost + laborNum;
  const isValid = weightNum > 0;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Photo trop volumineuse (max 5 Mo)", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const selectTrendModel = (model: { name: string; img: string }) => {
    setPhotoPreview(null);
    setPhotoName(model.name);
  };

  const buildMessage = () => {
    const today = new Date().toLocaleDateString("fr-MA");
    return [
      `السلام عليكم، معكم ${shopName}.`,
      `إليكم تفاصيل عرض السعر:`,
      `━━━━━━━━━━━━━━━`,
      `📅 ${today}`,
      photoName ? `💎 ${photoName}` : "",
      `🏅 ${karat.toUpperCase()} — ${goldPrice} MAD/g`,
      `⚖️ ${t("quote.weight")}: ${weightNum}g`,
      `🔨 ${t("quote.labor")}: ${laborNum} MAD`,
      `━━━━━━━━━━━━━━━`,
      `💰 ${t("quote.totalPrice")}: ${totalPrice.toFixed(0)} MAD`,
      ``,
      `شكرا لثقتكم. 🙏`,
    ].filter(Boolean).join("\n");
  };

  const handleWhatsAppShare = (withNumber: boolean) => {
    const msg = buildMessage();
    if (withNumber) {
      if (!clientPhone.trim()) {
        toast({ title: "Entrez le numéro du client", variant: "destructive" });
        return;
      }
      if (!isValidPhone(clientPhone)) {
        toast({ title: "Numéro invalide (format: +212 6XX XXX XXX)", variant: "destructive" });
        return;
      }
      const cleaned = formatPhoneForWA(clientPhone);
      saveRecentNumber(clientPhone.trim());
      setRecentNumbers(getRecentNumbers());
      window.open(`https://wa.me/${cleaned}?text=${encodeURIComponent(msg)}`, "_blank");
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    }
  };

  const selectRecentNumber = (num: string) => {
    setClientPhone(num);
    setShowRecent(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Quotation Form */}
      <Card className="relative overflow-hidden border-border">
        <div className="zellige-card" />
        <CardHeader className="relative">
          <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold" />
            {t("quotes.formTitle")}
          </CardTitle>
          <CardDescription className="font-body">{t("quotes.formSub")}</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-5">
          {/* Jewelry Photo */}
          <div className="space-y-2">
            <Label className="font-body text-sm flex items-center gap-2">
              <Camera className="w-4 h-4 text-muted-foreground" />
              {t("quotes.photo")}
            </Label>
            <div className="flex items-start gap-4">
              <div
                className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-secondary/30 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary/50 transition-colors flex-shrink-0"
                onClick={() => photoInputRef.current?.click()}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Jewelry" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <Upload className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-sm font-body gap-2 w-full"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" /> {t("quotes.uploadPhoto")}
                </Button>
                <p className="text-xs text-muted-foreground font-body">{t("quotes.orSelectTrend")}</p>
                <div className="flex flex-wrap gap-1.5">
                  {TREND_MODELS.map((m) => (
                    <button
                      key={m.name}
                      onClick={() => selectTrendModel(m)}
                      className={
                        "text-xs px-2.5 py-1.5 rounded-lg font-body transition-all " +
                        (photoName === m.name
                          ? "gold-gradient text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent")
                      }
                    >
                      {m.img} {m.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          <Separator className="bg-border" />

          {/* Gold Karat */}
          <div className="space-y-2">
            <Label className="font-body text-sm flex items-center gap-2">
              <Gem className="w-4 h-4 text-muted-foreground" />
              {t("quotes.karat")}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {(["18k", "21k", "24k"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setKarat(k)}
                  className={
                    "py-3 rounded-lg text-sm font-body font-semibold transition-all flex flex-col items-center gap-0.5 " +
                    (karat === k
                      ? "gold-gradient text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-accent")
                  }
                >
                  <span className="text-base">{k.toUpperCase()}</span>
                  <span className="text-xs opacity-80">{GOLD_PRICES[k]} MAD/g</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weight & Labor */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body text-sm flex items-center gap-2">
                <Scale className="w-4 h-4 text-muted-foreground" />
                {t("pricing.weight")}
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={t("pricing.weightPlaceholder")}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-background border-border pe-10"
                  min={0}
                  step={0.1}
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-body">g</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm flex items-center gap-2">
                <Coins className="w-4 h-4 text-muted-foreground" />
                {t("pricing.labor")}
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={t("pricing.laborPlaceholder")}
                  value={labor}
                  onChange={(e) => setLabor(e.target.value)}
                  className="bg-background border-border pe-16"
                  min={0}
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-body">MAD</span>
              </div>
            </div>
          </div>

          {/* Client WhatsApp Number */}
          <div className="space-y-2">
            <Label className="font-body text-sm flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              Numéro WhatsApp du client
            </Label>
            <div className="relative">
              <Input
                type="tel"
                placeholder="+212 6XX XXX XXX"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                onFocus={() => recentNumbers.length > 0 && setShowRecent(true)}
                onBlur={() => setTimeout(() => setShowRecent(false), 200)}
                className="bg-background border-border"
              />
              {clientPhone && (
                <button
                  onClick={() => setClientPhone("")}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {/* Recent numbers dropdown */}
            {showRecent && recentNumbers.length > 0 && (
              <div className="rounded-lg border border-border bg-card shadow-md overflow-hidden">
                <p className="px-3 py-1.5 text-xs text-muted-foreground font-body flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Numéros récents
                </p>
                {recentNumbers.map((num, i) => (
                  <button
                    key={i}
                    onMouseDown={() => selectRecentNumber(num)}
                    className="w-full px-3 py-2 text-sm font-body text-foreground hover:bg-secondary transition-colors text-left"
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground font-body">
              Optionnel — laissez vide pour choisir le contact dans WhatsApp
            </p>
          </div>

          {/* Live Calculation */}
          {isValid && (
            <div className="rounded-xl bg-secondary/50 border border-border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="font-body text-sm font-medium text-foreground">{t("quotes.liveCalc")}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm font-body">
                <span className="text-muted-foreground">{t("pricing.goldCost")}:</span>
                <span className="text-foreground font-medium text-end">
                  {weightNum}g × {goldPrice} = {goldCost.toFixed(0)} MAD
                </span>
                <span className="text-muted-foreground">{t("pricing.laborCost")}:</span>
                <span className="text-foreground font-medium text-end">{laborNum.toFixed(0)} MAD</span>
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-foreground text-lg">{t("pricing.total")}</span>
                <span className="font-display font-bold text-2xl gold-text">{totalPrice.toFixed(0)} MAD</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quote Preview Card */}
      {isValid && (
        <Card className="relative overflow-hidden border-primary/30 shadow-md">
          <div className="zellige-card" />
          <CardHeader className="relative pb-3">
            <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gold" />
              {t("quotes.previewTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4">
            {/* Receipt-style preview */}
            <div className="bg-background rounded-xl border border-border p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {shopLogo ? (
                    <img src={shopLogo} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                      <Gem className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-display font-bold text-foreground">{shopName}</p>
                    <p className="text-xs text-muted-foreground font-body">Maroc</p>
                  </div>
                </div>
                <Badge className="gold-gradient text-primary-foreground border-0 text-xs">
                  {t("quotes.receipt")}
                </Badge>
              </div>

              <Separator className="bg-border" />

              {/* Photo + Details */}
              <div className="flex gap-4">
                {photoPreview ? (
                  <img src={photoPreview} alt="Jewelry" className="w-20 h-20 rounded-lg object-cover border border-border" />
                ) : photoName ? (
                  <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center text-3xl">
                    {TREND_MODELS.find(m => m.name === photoName)?.img || "💎"}
                  </div>
                ) : null}
                <div className="flex-1 space-y-1.5 text-sm font-body">
                  {photoName && (
                    <p className="font-medium text-foreground">{photoName}</p>
                  )}
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">{karat.toUpperCase()}</span> — {goldPrice} MAD/g
                  </p>
                  <p className="text-muted-foreground">
                    {t("quote.weight")}: <span className="text-foreground font-medium">{weightNum}g</span>
                  </p>
                  <p className="text-muted-foreground">
                    {t("quote.labor")}: <span className="text-foreground font-medium">{laborNum.toFixed(0)} MAD</span>
                  </p>
                </div>
              </div>

              <Separator className="bg-border" />

              {/* Total */}
              <div className="flex items-center justify-between py-1">
                <span className="font-display font-bold text-lg text-foreground">{t("quote.totalPrice")}</span>
                <span className="font-display font-bold text-2xl gold-text">{totalPrice.toFixed(0)} MAD</span>
              </div>

              {/* Date */}
              <p className="text-xs text-muted-foreground font-body text-end">
                {new Date().toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>

            {/* Share Buttons */}
            <div className="space-y-2">
              <Button
                onClick={() => handleWhatsAppShare(true)}
                className="w-full gold-gradient text-primary-foreground border-0 gap-2 hover:opacity-90 h-12 text-base font-display font-semibold"
              >
                <Send className="w-5 h-5" />
                {clientPhone ? `Envoyer à ${clientPhone}` : t("quotes.generateShare")}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleWhatsAppShare(false)}
                className="w-full border-border gap-2 h-10 text-sm font-body text-muted-foreground hover:text-foreground"
              >
                <Send className="w-4 h-4" /> Partager sans destinataire
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuotationGenerator;
