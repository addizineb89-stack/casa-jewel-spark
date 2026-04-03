import { Bell, Search, User, Crown, BarChart3, Menu, LogOut, LogIn, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const DashboardHeader = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navTo = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
      <div>
        <h1 className="text-xl md:text-2xl font-display font-bold gold-text">{t("app.title")}</h1>
        <p className="text-xs md:text-sm text-muted-foreground font-body hidden sm:block">{t("app.subtitle")}</p>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-3">
        <LanguageSwitcher />
        <Button variant="ghost" size="sm" onClick={() => navigate("/plans")} className="text-gold font-body gap-1.5 hover:bg-secondary">
          <Crown className="w-4 h-4" /> {t("nav.plans")}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => navigate("/pro")} className="text-gold font-body gap-1.5 hover:bg-secondary">
          <BarChart3 className="w-4 h-4" /> {t("nav.proDash")}
        </Button>
        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t("header.search")} className="ps-10 w-64 bg-background border-border" />
        </div>
        <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
          <Bell className="w-5 h-5" />
        </Button>

        {isAuthenticated ? (
          <>
            <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-primary-foreground font-display">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="font-body gap-1.5">
              <LogIn className="w-4 h-4" /> Connexion
            </Button>
            <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-card">
            <SheetHeader>
              <SheetTitle className="font-display gold-text">Aura Gold</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2">
              {isAuthenticated && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary mb-4">
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-primary-foreground font-display">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground text-sm">{user?.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              )}
              <button onClick={() => navTo("/")} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-foreground">
                <Home className="w-4 h-4 text-gold" /> Accueil
              </button>
              <button onClick={() => navTo("/plans")} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-foreground">
                <Crown className="w-4 h-4 text-gold" /> Forfaits
              </button>
              <button onClick={() => navTo("/pro")} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-foreground">
                <BarChart3 className="w-4 h-4 text-gold" /> Espace Pro
              </button>
              <div className="p-3">
                <LanguageSwitcher />
              </div>
              <div className="border-t border-border pt-2 mt-2">
                {isAuthenticated ? (
                  <button onClick={() => { handleLogout(); setOpen(false); }} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-destructive">
                    <LogOut className="w-4 h-4" /> Déconnexion
                  </button>
                ) : (
                  <button onClick={() => navTo("/login")} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors font-body text-gold">
                    <LogIn className="w-4 h-4" /> Connexion
                  </button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default DashboardHeader;
