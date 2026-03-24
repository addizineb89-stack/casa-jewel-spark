import { useState, useRef } from "react";
import { Store, Phone, MapPin, Coins, Upload, ImageIcon, Save, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const ShopSettingsForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [storeName, setStoreName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [defaultLabor, setDefaultLabor] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaved(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast({ title: t("pro.settings.saved") });
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Store Profile Section */}
      <Card className="relative overflow-hidden border-border">
        <div className="zellige-card" />
        <CardHeader className="relative">
          <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
            <Store className="w-5 h-5 text-gold" />
            {t("pro.settings.profileSection")}
          </CardTitle>
          <CardDescription className="font-body">{t("pro.settingsSub")}</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-5">
          {/* Store Name */}
          <div className="space-y-2">
            <Label className="font-body text-sm flex items-center gap-2">
              <Store className="w-4 h-4 text-muted-foreground" />
              {t("pro.settings.storeName")}
            </Label>
            <Input
              placeholder={t("pro.settings.storeNamePlaceholder")}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="bg-background border-border"
              maxLength={100}
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label className="font-body text-sm flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              {t("pro.settings.whatsapp")}
            </Label>
            <Input
              placeholder={t("pro.settings.whatsappPlaceholder")}
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="bg-background border-border"
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground font-body">{t("pro.settings.whatsappDesc")}</p>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label className="font-body text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {t("pro.settings.address")}
            </Label>
            <Textarea
              placeholder={t("pro.settings.addressPlaceholder")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-background border-border min-h-[80px] resize-none"
              maxLength={255}
            />
          </div>

          {/* Logo */}
          <div className="space-y-2">
            <Label className="font-body text-sm flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              {t("pro.settings.logo")}
            </Label>
            <p className="text-xs text-muted-foreground font-body">{t("pro.settings.logoDesc")}</p>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-secondary/30 flex items-center justify-center overflow-hidden cursor-pointer hover:border-gold/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <Upload className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-border text-sm font-body gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                {logoPreview ? t("pro.settings.logoChange") : t("pro.settings.logoUpload")}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quote Settings Section */}
      <Card className="relative overflow-hidden border-border">
        <div className="zellige-card" />
        <CardHeader className="relative">
          <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
            <Coins className="w-5 h-5 text-gold" />
            {t("pro.settings.quotesSection")}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-5">
          {/* Default Labor */}
          <div className="space-y-2">
            <Label className="font-body text-sm flex items-center gap-2">
              <Coins className="w-4 h-4 text-muted-foreground" />
              {t("pro.settings.defaultLabor")}
            </Label>
            <div className="relative">
              <Input
                type="number"
                placeholder={t("pro.settings.defaultLaborPlaceholder")}
                value={defaultLabor}
                onChange={(e) => setDefaultLabor(e.target.value)}
                className="bg-background border-border pe-16"
                min={0}
                max={99999}
              />
              <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-body">MAD</span>
            </div>
            <p className="text-xs text-muted-foreground font-body">{t("pro.settings.defaultLaborDesc")}</p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full gold-gradient text-primary-foreground border-0 gap-2 hover:opacity-90 h-12 text-base font-display font-semibold"
      >
        {saved ? (
          <>
            <Check className="w-5 h-5" /> {t("pro.settings.saved")}
          </>
        ) : (
          <>
            <Save className="w-5 h-5" /> {t("pro.settings.save")}
          </>
        )}
      </Button>
    </div>
  );
};

export default ShopSettingsForm;
