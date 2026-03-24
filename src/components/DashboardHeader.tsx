import { Bell, Search, User, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
      <div>
        <h1 className="text-2xl font-display font-bold gold-text">{t("app.title")}</h1>
        <p className="text-sm text-muted-foreground font-body">{t("app.subtitle")}</p>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Button variant="ghost" size="sm" onClick={() => navigate("/plans")} className="text-gold font-body gap-1.5 hover:bg-secondary">
          <Crown className="w-4 h-4" /> {t("nav.plans")}
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t("header.search")} className="ps-10 w-64 bg-background border-border" />
        </div>
        <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
